# 使用 Resource Groups 管理资源

Resource Group（资源组）可用来管理和保护 Apache Cloudberry 中 CPU、内存、并发事务限制和磁盘 I/O 的资源分配。定义资源组后，可将该组分配给一个或多个 Apache Cloudberry 用户角色（Role），或分配给外部组件（如 PL/Container），以控制其使用的资源。

一个资源组所定义的限制条件适用于所有被分配该资源组的用户角色。例如，资源组定义的最大内存使用量限制会应用于所有该组用户所提交的运行事务上。

Apache Cloudberry 使用基于 Linux 的控制组来管理 CPU 资源，并使用 Runaway Detector 进行统计、跟踪和内存管理。

## 理解角色和组件资源组

Apache Cloudberry 支持两种类型的资源组：用于管理角色资源的组，及用于管理外部组件（如 PL/Container）资源的组。

资源组的最常见应用是管理不同角色在 Apache Cloudberry 集群中可以并发运行的活动查询数量。也可以用来管理 Apache Cloudberry 为每个查询分配的 CPU、内存资源和磁盘 I/O 的数量。

当用户运行查询时，Apache Cloudberry 会根据为资源组定义的一组限制评估该查询。如果该组的资源限制尚未达到，并且该查询不会导致该组超过并发事务限制，Apache Cloudberry 会立即运行该查询。如果这些条件不满足，Apache Cloudberry 会将查询进行队列排序。例如，如果资源组的最大并发事务数已经达到，后续查询将被排序等待，必须等待其他查询完成后才能运行。当资源组的并发性和内存限制调整到足够大的值时，Apache Cloudberry 也可能运行待处理的查询。

在角色的资源组内，事务是按照先进先出 （First-in-first-out） 原则进行评估的。Apache Cloudberry 定期评估系统的活动工作负载，根据需要重新分配资源，并启动作业或将其放入队列。

您还可以使用资源组来管理外部组件（如 PL/Container）的 CPU 和内存资源。外部组件的资源组使用 Linux cgroups 来管理该组件的总 CPU 资源。

## 资源组属性和限制

当创建资源组时，需提供一组参数，以确定该组可用的 CPU 和内存资源。下表列出了资源组的可用限制参数：

| 限制类型          | 描述                                                                               | 范围                      | 默认值                                                    |
|-------------------|------------------------------------------------------------------------------------|---------------------------|-----------------------------------------------------------|
| `CONCURRENCY`     | 资源组中允许的最大并发事务数，包括活动和空闲事务。                                 | \[0,max_connections\]     | 20                                                        |
| `CPU_MAX_PERCENT` | 组可使用的 CPU 资源的最大百分比。                                                  | \[1,100\]                 | -1（未设置）                                              |
| `CPU_WEIGHT`      | 资源组的调度优先级。                                                               | \[1,500\]                 | 100                                                       |
| `CPUSET`          | 为该资源组保留的特定 CPU 逻辑核（或超线程中的逻辑线程）。                          | 取决于系统核配置          | -1                                                        |
| `IO_LIMIT`        | 读取/写入磁盘 I/O 吞吐量的最大限制，以及每秒的最大读/写 I/O 操作。按表空间设置值。 | \[2,4294967295 或 `max`\] | -1                                                        |
| `MEMORY_QUOTA`    | 为资源组指定的内存限制值。                                                         | `Integar`（MB）           | -1（未设置，使用 `statement_mem` 作为单个查询的内存限制） |
| `MIN_COST`        | 查询计划被包含在资源组中的最小成本。                                               | `Integar`                 | 0                                                         |

:::note 注意
对于 `SET` 、 `RESET` 和 `SHOW` 命令，不强制执行资源限制。
:::

### 事务并发限制

`CONCURRENCY` 限制控制资源组允许的最大并发事务数。

每个资源组在逻辑上分为与 `CONCURRENCY` 限制相等的固定数量的 slot。Apache Cloudberry 为这些 slot 分配固定百分比的内存资源。

角色资源组的默认 `CONCURRENCY` 限制值为 `20`。值为 `0` 表示该资源组不允许运行任何查询。

Apache Cloudberry 将任何在资源组达到 `CONCURRENCY` 限制后提交的事务排队。当运行的事务完成时，如果存在足够的内存资源，Apache Cloudberry 会取消排队并运行排队中最早的事务。请注意，如果事务处于 `idle in transaction` 状态，即使没有语句在运行，并发 slot 仍然处于使用中。

您可以设置服务器配置参数 `gp_resource_group_queuing_timeout` 来指定事务在 Apache Cloudberry 取消之前在队列中保持的时间。默认超时值为 `0`，Apache Cloudberry 会无限期地排队事务。

### 绕过和解除资源组分配

通过设置服务器配置参数 `gp_resource_group_bypass`，可使查询不受资源组并发设置的限制。此参数将启用或禁用资源组的并发事务限制，因此查询可以立即运行。默认值为 `false`，这将强制执行 `CONCURRENCY` 限制。此参数只可在单个会话中设置，无法在事务或函数内设置。如将 `gp_resource_group_bypass` 设置为 `true`，查询不再强制执行分配给其资源组的 CPU 或内存限制。相反，该查询分配的内存限制为每个查询的 `statement_mem`。如果没有足够的内存满足内存分配请求，查询将失败。

你可绕过仅 catalogue tables 的查询，例如数据库图形用户界面（GUI）客户端运行的获取元数据的 catalogue 查询。如果服务器配置参数 `gp_resource_group_bypass_catalog_query` 设置为 `true`（默认），Apache Cloudberry 的资源组调度器会绕过所有仅从系统目录读取的查询，或查询文本中仅包含 `pg_catalog` 模式表的查询。这些查询会自动解除分配其当前资源组；它们不强制执行资源组的限制，也不计算资源使用。查询资源会从资源组中分配并立即运行。内存限制为每个查询的 `statement_mem`。

可使用服务器配置参数 `gp_resource_group_bypass_direct_dispatch` 绕过直接调度查询。直接调度查询是一种特殊类型的查询，仅需要一个分段参与执行。为了提高效率，Apache Cloudberry 优化了此类型的查询，使用直接调度优化。系统将查询计划发送到需要执行该计划的单个分段，而不是将其发送到所有分段进行执行。如果将 `gp_resource_group_bypass_direct_dispatch` 设置为 `true`，该查询不再强制执行分配给其资源组的 CPU 或内存限制，因此立即运行。相反，该查询分配的内存限制为每个查询的 `statement_mem`。如果没有足够的内存满足内存分配请求，查询将失败。您只能在单个会话中设置此参数，而不能在事务或函数内。

计划成本低于限制 `MIN_COST` 的查询会自动解除分配其资源组，不强制执行其任何限制。查询使用的资源不会计算为资源组的资源。查询的内存限制为 `statement_mem`。 `MIN_COST` 的默认值为 `0`。

### CPU 限制

Apache Cloudberry 利用 Linux 控制组实现 CPU 资源管理。Apache Cloudberry 通过以下两种方式分配 CPU 资源：

- 通过将 CPU 资源的百分比分配给资源组
- 通过将特定的 core 分配给资源组

当为资源组设置其中一种分配模式时，Apache Cloudberry 会停用另一种分配模式。可同时为同一 Apache Cloudberry 集群的不同资源组使用两种 CPU 资源分配模式。还可以在运行时更改资源组的 CPU 资源分配模式。

Apache Cloudberry 使用服务器配置参数 `gp_resource_group_cpu_limit` 来识别要分配给每个 Apache Cloudberry 分段节点的资源组的最大系统 CPU 资源百分比。剩余未保留的 CPU 资源用于操作系统内核和 Apache Cloudberry 守护进程。每个主机上可用于 Apache Cloudberry 查询的 CPU 量随后平均分配给 Apache Cloudberry 节点上的每个分段。

:::note 注意
默认的 `gp_resource_group_cpu_limit` 值可能无法在 Apache Cloudberry 集群节点上留下足够的 CPU 资源，因此请确保相应地调整此服务器配置参数。
:::

:::warning 警告
应避免将 `gp_resource_group_cpu_limit` 设置为高于 0.9 的值。这样做可能导致高负载查询占用几乎所有 CPU 资源，导致数据库辅助进程的资源紧张。
:::

#### 按核心分配 CPU 资源

可通过 `CPUSET` 属性识别要为资源组保留的 CPU 核。指定的 CPU 核必须在系统中可用，并且不能与为其他资源组保留的任何 CPU 核重叠。尽管 Apache Cloudberry 数据库将分配给资源组的核专用于该组，但这些 CPU 核也可能被系统中的非 Apache Cloudberry 进程使用。当为资源组配置 `CPUSET` 时，Apache Cloudberry 数据库会停用该组的 `CPU_MAX_PERCENT` 和 `CPU_WEIGHT`，并将它们的值设置为 -1。

分别为 Coordinator 和 Segment 指定 CPU 核，用分号分隔。配置 `CPUSET` 的核时，使用以逗号分隔的单核数字或数字区间。必须用单引号括起核心数字/区间，例如，‘1;1,3-4’ 在 Coordinator 上使用核 1，在分段主机上使用核 1、3 和 4。

当将 CPU 核心分配给 `CPUSET` 组时，请考虑以下几点：

- 使用 `CPUSET` 创建的资源组将独占指定的核。如果组中没有正在运行的查询，则保留的核处于空闲状态，无法被其他资源组中的查询使用。考虑最小化 `CPUSET` 组的数量，以避免浪费系统 CPU 资源。
- 考虑保持 CPU 核 0 不分配。CPU 核 0 在以下情况下用作后备机制：
    - `admin_group` 和 `default_group` 至少需要一个 CPU 核。当所有 CPU 核都被保留时，Apache Cloudberry 数据库将 CPU 核 0 分配给这些默认组。在这种情况下，为其分配 CPU 核 0 的资源组与 `admin_group` 和 `default_group` 共享该核。
    - 如以替换节点的方式重启 Apache Cloudberry 数据库集群，并且该节点没有足够的核来服务所有 `CPUSET` 资源组，则这些组会自动分配 CPU 核 0，以避免系统启动失败。
- 在为资源组分配核时，请使用尽可能低的核数字。如果替换 Apache Cloudberry 数据库节点，而新节点的 CPU 核少于原始节点，或者备份数据库并希望在核较少的集群中恢复，操作可能会失败。例如，如果的 Apache Cloudberry 数据库集群有 16 个核，分配核 1-7 是最佳选择。如果创建一个资源组并将 CPU 核心 9 分配给该组，则恢复到 8 核节点的数据库将失败。

使用 `CPUSET` 配置的资源组在 CPU 资源上具有更高的优先级。在 Segment 主机上为所有配置了 `CPUSET` 的资源组设置的最大 CPU 资源使用百分比为保留的 CPU 核数除以所有 CPU 核数，再乘以 100。

:::note 注意
在为 Apache Cloudberry 数据库集群启用基于资源组的资源管理后，必须为资源组配置 `CPUSET`，该参数是 `gp_resource_manager` 服务器配置参数。
:::

#### 按百分比分配 CPU 资源

通过 `CPU_MAX_PERCENT` 配置资源组，以按百分比分配 CPU 资源。当为资源组配置 `CPU_MAX_PERCENT` 时，Apache Cloudberry 数据库会停用该组的 `CPUSET`。

参数 `CPU_MAX_PERCENT` 设置了资源管理中段 CPU 的百分比上限。可以为资源组指定的最小 `CPU_MAX_PERCENT` 百分比为 1，最大为 100。在定义的 Apache Cloudberry 数据库集群中，所有资源组指定的 `CPU_MAX_PERCENT` 的总和可以超过 100。它指定了资源组中所有任务在给定 CPU 时间段内可以运行的总时间比例。一旦资源组中的任务使用完所有由配额指定的时间，它们将在该时间段的剩余时间内受到限制，直到下一个时间段才允许运行。

当资源组中的任务处于空闲状态且未使用任何 CPU 时间时，剩余时间将被收集到未使用 CPU 周期的全局池中。其他资源组可以从这个池中借用 CPU 周期。可用于资源组的实际 CPU 时间可能会有所不同，具体取决于系统中存在的资源组数量。

参数 `CPU_MAX_PERCENT` 强制执行 CPU 使用的硬性上限。例如，如果设置为 40%，则表示尽管资源组可以临时使用其他组的一些空闲 CPU 资源，但它最多只能使用 Apache Cloudberry 可用的 40% CPU 资源。

你可以设置参数 `CPU_WEIGHT` 以分配当前组的调度优先级。默认值为 100，值的范围为 1 到 500。该值指定资源组中任务可用 CPU 时间的相对份额。例如，如果一个资源组的相对份额为 100，另两个组的相对份额为 50，则当所有资源组的进程尝试使用 100% 的 CPU（即，所有组的 `CPU_MAX_PERCENT` 的值设置为 100）时，第一个资源组将获得 50% 的所有 CPU 时间，另外两个各获得 25%。然而，如果添加另一个相对份额为 100 的组，第一个组只能使用 33% 的 CPU，其余组分别获得 16.5%、16.5% 和 33%。

例如，考虑以下组：

| 组名称        | CONCURRENCY | CPU_MAX_PERCENT | CPU_WEIGHT |
|---------------|-------------|-----------------|------------|
| default_group | 20          | 50              | 10         |
| admin_group   | 10          | 70              | 30         |
| system_group  | 10          | 30              | 10         |
| test          | 10          | 10              | 10         |

在 `default_group` 中的角色具有可用的 CPU 比率（由 `CPU_WEIGHT` 决定）为 10/(10+30+10+10)=16%。这意味着在系统工作负载较高时，它们至少可以使用 16% 的 CPU。当系统有空闲的 CPU 资源时，它们可以使用更多资源，因为硬限制（由 `CPU_MAX_PERCENT` 设置）为 50%。

在 `admin_group` 中的角色在系统工作负载较高时具有可用的 CPU 比率为 30/(10+30+10+10)=50%。当系统有空闲的 CPU 资源时，它们可以使用高达 70% 的硬限制的资源。

在 `test` 中的角色的 CPU 比率为 10/(10+30+10+10)=16%。但是，由于由 `CPU_MAX_PERCENT` 确定的硬限制为 10%，它们只能使用最多 10% 的资源，即使在系统空闲时也是如此。

### 内存限制

当启用资源组时，内存使用在 Apache Cloudberry 数据库 Segment 和资源组级别进行管理。还可以在事务级别管理内存。

分配给查询的内存量由以下参数确定：

资源组的 `MEMORY_QUOTA` 参数设置此资源组在段上的最大内存量。这决定了查询执行期间该段主机上所有工作进程可消耗的内存总量。分配给查询的内存量是组内存限制除以组并发限制： `MEMORY_QUOTA` / `CONCURRENCY`。

如果查询需要大量内存，您可以使用服务器配置参数 `gp_resgroup_memory_query_fixed_mem` 在会话级别为查询设置固定的内存量。该参数会覆盖并可以超出资源组的分配内存。

Apache Cloudberry 在处理传入查询时使用 `gp_resgroup_memory_query_fixed_mem` 的值（如果设置），以绕过资源组设置。否则，它使用 `MEMORY_QUOTA` / `CONCURRENCY` 作为查询的分配内存。如果 `MEMORY_QUOTA` 未设置，则查询内存分配的默认值为 `statement_mem`。

对于所有查询，如果系统内存不足，它们会溢出到磁盘。当达到限制 `gp_workfile_limit_files_per_query` 时，Apache Cloudberry 数据库会生成内存不足 (OOM) 错误。

例如，考虑一个名为 `adhoc` 的资源组，其 `MEMORY_QUOTA` 设置为 1.5 GB，`CONCURRENCY` 设置为 3。默认情况下，提交给该组的每个语句分配 500 MB 的内存。现在考虑以下一系列事件：

1. 用户 `ADHOC_1` 提交查询 `Q1`， 将 `gp_resgroup_memory_query_fixed_mem` 重写为 800MB。 `Q1` 语句被接纳到系统中。

2. 用户 `ADHOC_2` 提交查询 `Q2`， 使用默认的 500MB。

3. 在 `Q1` 和 `Q2` 仍在运行时，用户 `ADHOC3` 提交查询 `Q3`，使用默认的 500MB。

    查询 `Q1` 和 `Q2` 已使用 1300MB 的组内 1500MB。不过，如果在该时刻段内有足够的系统内存可供查询 `Q3` 使用，可正常运行。

4. 用户 `ADHOC4` 提交查询 `Q4`, 使用将 `gp_resgroup_memory_query_fixed_mem` 设置为 700MB。

    查询 `Q4` 立即运行，因为它绕过了资源组限制。

有关内存限制的一些特殊使用注意事项：

- 如果设置了配置参数 `gp_resource_group_bypass` 或 `gp_resource_group_bypass_catalog_query` 来绕过资源组限制，则查询的内存限制将取决于 `statement_mem` 的值。
- 当 (`MEMORY_QUOTA` / `CONCURRENCY`) 小于 `statement_mem` 时，系统会直接使用 `statement_mem` 作为该查询的固定内存分配值。
- `statement_mem` 的最大取值受 `max_statement_mem` 限制。
- 查询的计划成本如果低于设定的 `MIN_COST`，则该查询也将使用 `statement_mem` 所指定的内存作为限制。

### 磁盘 I/O 限制

Apache Cloudberry 利用 Linux 控制组实现磁盘 I/O 限制。参数 `IO_LIMIT` 限制分配给特定资源组的查询的最大读/写磁盘 I/O 吞吐量，以及最大读/写 I/O 操作数。它分配带宽，确保高优先级资源组的使用，避免过度使用磁盘带宽。该参数的值按表空间基础设置。


:::note 注意
仅在使用 Linux cgroup v2 时，磁盘 I/O 限制才可用。
:::

限制磁盘 I/O 时需要指定：

- 要设置限制的表空间名称或表空间对象 ID (OID)。使用 `*` 设置所有表空间的限制。
- `rbps` 和 `wbps` 的值以限制资源组内最大读取和写入磁盘 I/O 吞吐量，单位为 MB/sec。默认值为 `max`，意味着没有限制。
- `riops` 和 `wiops` 的值以限制资源组内最大读取和写入 I/O 操作数。默认值为 `max`，意味着没有限制。

如果未设置参数 `IO_LIMIT`，则 `rbps`、`wpbs`、`riops` 和 `wiops` 的默认值为 `max`，这意味着没有磁盘 I/O 限制。在这种情况下，`gp_toolkit.gp_resgroup_config` 系统视图的值显示为 `-1`。如果仅设置了 `IO_LIMIT` 的某些值（例如，`rbps`），则未设置的参数默认为 `max`（在此示例中，`wbps`、`riops` 和 `wiops`）。

## 配置和使用资源组

### 先决条件

Apache Cloudberry 资源组使用 Linux 控制组（cgroups）管理 CPU 资源和磁盘 I/O。cgroups 有两个版本： `cgroup v1` 和 `cgroup v2`。Apache Cloudberry 支持这两个版本，但仅对 cgroup v2 支持参数 `IO_LIMIT`。默认情况下随 Linux 发行版提供的 Linux 控制组版本取决于操作系统版本。对于 Enterprise Linux 8 及更早版本，默认版本为 v1；对于 Enterprise Linux 9 及更高版本，默认版本为 v2。有关 cgroups 的详细信息，请参考 Linux 发行版的控制组文档。

通过检查系统启动时默认挂载的文件系统，验证环境中配置的 cgroup 版本：

```bash
stat -fc %T /sys/fs/cgroup/
```

对于 cgroup v1，输出为 `tmpfs`。对于 cgroup v2，输出为 `cgroup2fs`。

:::note 注意
- Linux 控制组可被更改，但如果您使用较旧版本的操作系统，例如 Centos 7.x 或更早，将只能使用默认的 `cgroup v1` 控制组；如果你使用的是 Centos 8.x，可按照下方步骤，将控制组从 v1 切换到 v2。
- 从 v2.0.0 起，对于 `cpu.pressure`，即使 `gp_resource_manager` 设置为 `group-v2`，Apache Cloudberry 也不再检查 `/proc/pressure/cpu` 接口的权限或是否存在。因此，即使未启用 PSI（Pressure Stall Information），只要内核版本兼容，仍可正常使用 `group-v2` 模式。
:::

如无需更改 cgroup 版本，可以直接跳到[配置 cgroup v1](#配置-cgroup-v1) 或[配置 cgroup v2](#配置-cgroup-v2) 完成配置先决条件。

如希望从 cgroup v1 切换到 v2，可以以 root 身份运行以下命令：

- Red Hat 8/Rocky 8/Oracle 8 系统：

    ```bash
    grubby --update-kernel=/boot/vmlinuz-$(uname -r) --args="systemd.unified_cgroup_hierarchy=1"
    ```

- Ubuntu 系统：

    ```bash
    vim /etc/default/grub     # 添加或修改: GRUB_CMDLINE_LINUX="systemd.unified_cgroup_hierarchy=1"     
    update-grub
    ```

如果希望从 cgroup v2 切换到 v1，可以以 root 身份运行以下命令：

- Red Hat 8/Rocky 8/Oracle 8 系统：

    ```bash
    grubby --update-kernel=/boot/vmlinuz-$(uname -r) --args="systemd.unified_cgroup_hierarchy=0 systemd.legacy_systemd_cgroup_controller"
    ```

- Ubuntu 系统：

    ```bash
    vim /etc/default/grub     
    # 添加或修改: GRUB_CMDLINE_LINUX="systemd.unified_cgroup_hierarchy=0"     
    update-grub
    ```

完成后，重启主机以使更改生效。

#### 配置 cgroup v1

在每个 Apache Cloudberry 数据库节点上完成以下任务，以设置 cgroups v1 以用于资源组：

1. 安装 `libcgroup` 和 `libcgroup-tools`：

    ```bash
    sudo yum install libcgroup
    sudo yum install libcgroup-tools
    ```

2. 找到 cgroups 配置文件 `/etc/cgconfig.conf`。你必须是超级用户或具有 `sudo` 访问权限才能编辑此文件：

    ```bash
    vi /etc/cgconfig.conf
    ```

3. 将以下配置信息添加到文件中：

    ```
    group gpdb {
         perm {
             task {
                 uid = gpadmin;
                 gid = gpadmin;
             }
             admin {
                 uid = gpadmin;
                 gid = gpadmin;
             }
         }
         cpu {
         }
         cpuacct {
         }
         cpuset {
         }
         memory {
         }
    } 
    ```

    此内容配置由 `gpadmin` 用户管理的 CPU、CPU 计数、CPU 核集和内存控制组。Apache Cloudberry 数据库仅使用内存控制组监控内存使用情况。

4. 在每个 Apache Cloudberry 数据库节点上启动 cgroups 服务。对于 Redhat/Oracle/Rocky 8.x 及更早版本，以 root 身份运行以下命令：

    ```bash
    cgconfigparser -l /etc/cgconfig.conf 
    ```

5. 为确保在系统重启时自动重建 Apache Cloudberry 数据库所需的 cgroup 层次结构和参数，配置系统以在节点启动时启用 Linux cgroup 服务守护进程 `cgconfig.service`。为了确保配置在重启后持续有效，以 root 用户身份运行以下命令。对于 Redhat/Oracle/Rocky 8.x 及更早版本：

    ```bash
    systemctl enable cgconfig.service
    ```

    要立即启动服务（无需重启），请输入：

    ```bash
    systemctl start cgconfig.service
    ```

6. 确定节点的 `cgroup` 目录挂载点。对于 Redhat/Oracle/Rocky 8.x 及更早版本，以 root 身份运行以下命令：

    ```bash
    grep cgroup /proc/mounts
    ```

    输出的第一行标识 `cgroup` 挂载点。

7. 通过运行以下命令来验证您是否正确设置了 Apache Cloudberry 数据库 cgroups 配置。用前一步中识别的挂载点替换/ `<cgroup_mount_point>`：

    ```bash
    ls -l <cgroup_mount_point>/cpu/gpdb
    ls -l <cgroup_mount_point>/cpuset/gpdb
    ls -l <cgroup_mount_point>/memory/gpdb
    ```

    如果这些目录存在并且归 `gpadmin:gpadmin` 所有，则表明已成功为 Apache Cloudberry 数据库资源管理配置了 cgroups。

#### 配置 cgroup v2

1. 配置系统以在系统启动时默认挂载 `cgroups-v2`，由 `systemd` 系统和服务管理器以 root 用户身份执行。

    ```bash
    grubby --update-kernel=ALL --args="systemd.unified_cgroup_hierarchy=1"
    ```

2. 重启系统以使更改生效:`reboot now`。

3. 创建目录 `/sys/fs/cgroup/gpdb`，添加所有必要的控制器，并确保 `gpadmin` 用户具有读取和写入权限。

    ``` shell
    mkdir -p /sys/fs/cgroup/gpdb
    echo "+cpuset +io +cpu +memory" | tee -a /sys/fs/cgroup/cgroup.subtree_control
    chown -R gpadmin:gpadmin /sys/fs/cgroup/gpdb
    ```

如在运行上述命令后遇到错误 `Invalid argument`，原因为 cgroups v2 不支持对实时进程的控制，并且 `cpu` 控制器只能在所有实时进程都在根 cgroup 中时启用。在这种情况下，请查找所有实时进程并将它们移动到根 cgroup 中，然后重新启用控制器。

1. 确保 `gpadmin` 对 `/sys/fs/cgroup/cgroup.procs` 具有写权限。这是为了在集群启动后将 Apache Cloudberry 进程从用户切片移动到 `/sys/fs/cgroup/gpdb/`，以管理 postmaster 服务及其所有辅助进程。

    ``` bash
    chmod a+w /sys/fs/cgroup/cgroup.procs
    ```

    由于资源组手动管理 cgroup 文件，以上设置在系统重启后将变得无效。为 systemd 添加以下 bash 脚本，使其在系统启动期间自动运行。作为 root 用户执行以下步骤：

2. 创建 `gpdb.service`。

    ``` bash
    vim /etc/systemd/system/gpdb.service 
    ```

3. 将以下内容写入 `gpdb.service`，如果用户不是 `gpadmin`，请将其替换为适当的用户。

    ``` bash
    [Unit]
    Description=Apache Cloudberry Cgroup v2 Configuration Service
    [Service]
    Type=simple
    WorkingDirectory=/sys/fs/cgroup/gpdb.service
    Delegate=yes
    Slice=-.slice

    # 仅在挂载 cgroup v2 时设置层次结构
    ExecCondition=bash -c '[ xcgroup2fs = x$(stat -fc "%%T" /sys/fs/cgroup) ] || exit 1'
    ExecStartPre=bash -ec " \
    chown -R gpadmin:gpadmin .; \
    chmod a+w ../cgroup.procs; \
    mkdir -p helper.scope"
    ExecStart=sleep infinity
    ExecStartPost=bash -ec "echo $MAINPID > ./helper.scope/cgroup.procs;"
    [Install]
    WantedBy=basic.target
    ```

4. 重新加载 systemd 守护进程并启用服务：

    ``` bash
    systemctl daemon-reload
    systemctl enable gpdb.service
    ```

## 启用资源组

当安装 Apache Cloudberry 时，默认情况下未启用任何资源管理策略。要使用资源组，请设置 `gp_resource_manager` 服务器配置参数。

1. 将 `gp_resource_manager` 服务器配置参数设置为值 `"group"` 或 `"group-v2"` ，具体取决于您 Linux 发行版上配置的 cgroup 版本。例如：

    ``` bash
    gpconfig -c gp_resource_manager -v "group"
    gpconfig -c gp_resource_manager -v "group-v2"
    ```

2. 重启 Apache Cloudberry：

    ``` bash
    gpstop
    gpstart
    ```

启用后，由角色提交的任何事务将被指向分配给该角色的资源组，并受到该资源组的并发、内存、CPU 和磁盘 I/O 限制的管理。

Apache Cloudberry 为名为 `admin_group`、/ `default_group` 和 `system_group` 的角色创建三个默认资源组。当启用资源组时，任何未明确分配资源组的角色将被分配为角色能力的默认组。/ `SUPERUSER` 角色被分配到 `admin_group`，非管理员角色被分配到名为 `default_group` 的组。Apache Cloudberry 系统进程的资源被分配到 `system_group`。您不能手动将任何角色分配给 `system_group`。

可使用以下命令，查看包括默认资源组 `admin_group`、/ `default_group` 和 `system_group` 在内的所有资源组参数：

``` sql
SELECT * FROM gp_toolkit.gp_resgroup_config;
```

## 创建资源组

当为角色创建资源组时，需要提供名称和 CPU 资源分配模式（核或百分比）。还可以选择性地提供并发事务限制、内存限制、CPU 软优先级、磁盘 I/O 限制和最低成本。使用 `CREATE RESOURCE GROUP` 命令创建新的资源组。

为角色创建资源组时，必须提供 `CPU_MAX_PERCENT` 或 `CPUSET` 限制值。这些限制确定分配给该资源组的 Apache Cloudberry CPU 资源的百分比。可指定 `MEMORY_QUOTA` 来为资源组保留固定数量的内存。

例如，要创建一个名为 *rgroup1* 的资源组，其 CPU 限制为 20，内存限制为 25，CPU 软优先级为 500，最低成本为 50，以及 `pg_default` 表空间的磁盘 I/O 限制：

``` sql
CREATE RESOURCE GROUP rgroup1 WITH (CONCURRENCY=20, CPU_MAX_PERCENT=20, MEMORY_QUOTA=250, CPU_WEIGHT=500, MIN_COST=50, IO_LIMIT='pg_default: wbps=1000, rbps=1000, wiops=100, riops=100');
```

:::note 注意
使用 `cgroup v1` 并指定了 IO_LIMIT，仍可创建资源组。但会提示 IO_LIMIT 仅支持 v2 资源组。

CPU 限制 20 被分配给每个分配到 `rgroup1` 的角色。同样，内存限制 25 也被分配给每个分配到 `rgroup1` 的角色。/ `rgroup1` 使用默认的 `CONCURRENCY` 设置 20。
:::

`ALTER RESOURCE GROUP` 命令用于更新资源组的限制。要更改资源组的限制，请指定您想要的新值。例如：

``` sql
ALTER RESOURCE GROUP rg_role_light SET CONCURRENCY 7;
ALTER RESOURCE GROUP exec SET MEMORY_QUOTA 30;
ALTER RESOURCE GROUP rgroup1 SET CPUSET '1;2,4';
ALTER RESOURCE GROUP sales SET IO_LIMIT 'tablespace1:wbps=2000,wiops=2000;tablespace2:rbps=2024,riops=2024'; 
```
:::note 注意
不能将 `admin_group` 的 `CONCURRENCY` 值设置或更改为零 (0)。
:::

`DROP RESOURCE GROUP` 命令用于删除资源组。要删除某个角色的资源组，该组不能分配给任何角色，且不能有任何正在活动或等待的事务。

删除资源组：

``` sql
DROP RESOURCE GROUP exec; 
```

## 配置基于内存用量的自动查询终结

Apache Cloudberry 支持 Runaway 检测器，它根据查询使用的内存量自动终止查询。对于资源组管理的查询，Apache Cloudberry 根据查询使用的内存量终止正在运行的查询。相关的配置参数有：

- `gp_vmem_protect_limit` 设置活动段实例中所有 `postgres` 进程可以消耗的内存量。如果查询导致超过此限制，则不会分配内存，查询将失败。
- `runaway_detector_activation_percent` 当启用资源组时，如果使用的内存超过指定值 `gp_vmem_protect_limit` \* `runaway_detector_activation_percent`，Apache Cloudberry 将根据内存使用情况终止查询，从用户资源组管理的查询中选择查询（不包括 `system_group` 资源组中的查询）。Apache Cloudberry 将首先处理消耗内存最多的查询。查询将持续终止，直到使用的内存百分比降到指定百分比以下。

## 将资源组分配给用户角色

可使用 `CREATE ROLE` 或 `ALTER ROLE` 命令的 `RESOURCE GROUP` 子句将资源组分配给数据库角色。如果不为角色指定资源组，则该角色将被分配为角色能力的默认组。`SUPERUSER` 角色被分配到 `admin_group`，非管理员角色被分配到名为 `default_group` 的组。

使用 `ALTER ROLE` 或 `CREATE ROLE` 命令将资源组分配给角色。例如：

``` sql
ALTER ROLE bill RESOURCE GROUP rg_light;
CREATE ROLE mary RESOURCE GROUP exec;
```

可以将资源组分配给一个或多个角色。如果定义了角色层次结构，将资源组分配给父角色不会传播到该角色组的成员。

如希望从角色中移除资源组分配并将角色分配为默认组，请将角色的组名称分配更改为 `NONE`。例如：

```sql
ALTER ROLE mary RESOURCE GROUP NONE;
```

## 监控资源组状态

监视资源组和查询的状态可能涉及以下任务。

### 浏览资源组限制

`gp_toolkit.gp_resgroup_config` 系统视图显示资源组的当前限制。要查看所有资源组的限制：

``` sql
SELECT * FROM gp_toolkit.gp_resgroup_config;
```

### 浏览资源组查询状态

`gp_toolkit.gp_resgroup_status` 系统视图能够查看资源组的状态和活动。该视图显示正在运行和排队的事务数量。要查看此信息：

``` sql
SELECT * FROM gp_toolkit.gp_resgroup_status;
```

### 按主机浏览资源组内存使用

`gp_toolkit.gp_resgroup_status_per_host` 系统视图能按主机查看资源组的实时内存使用情况。要查看此信息：

``` sql
SELECT * FROM gp_toolkit.gp_resgroup_status_per_host;
```

### 浏览用户角色被分配的资源组

要查看资源组与角色的分配关系，请在 `pg_roles` 和 `pg_resgroup` 系统目录表上执行以下查询：

```sql
SELECT rolname, rsgname FROM pg_roles, pg_resgroup
WHERE pg_roles.rolresgroup=pg_resgroup.oid;
```

### 浏览资源组磁盘 I/O 使用情况

`gp_toolkit.gp_resgroup_iostats_per_host` 系统视图能按主机查看资源组的实时磁盘 I/O 使用情况。要查看此信息：

```sql
SELECT * FROM gp_toolkit.gp_resgroup_iostats_per_host;
```

### 浏览资源组运行中和等待中的查询

要查看资源组的运行查询、待处理查询及其排队时间，请检查 `pg_stat_activity` 系统目录表：

```sql
SELECT query, rsgname, wait_event_type, wait_event 
FROM pg_stat_activity;
```

`pg_stat_activity` 显示关于发起查询的用户/角色的信息。使用外部组件（如 PL/Container）的查询由两个部分组成：在 Apache Cloudberry 中运行的查询操作符和在 PL/Container 实例中运行的 UDF。Apache Cloudberry 在分配给发起查询的角色的资源组下处理查询操作符。运行在 PL/Container 实例中的 UDF 在分配给 PL/Container 运行时的资源组下运行。后者不在 `pg_stat_activity` 视图中表示；Apache Cloudberry 对外部组件（如 PL/Container）在运行实例中如何管理内存没有任何洞察。

### 取消资源组中正在运行或在队列中的查询

取消资源组中正在运行或排队的事务，例如，移除一个在资源组队列中等待但尚未运行的查询。或者，停止一个运行时间过长的查询，或一个在事务中处于空闲状态并占用其他用户所需的资源组事务槽的查询。

默认情况下，事务可以在资源组中无限期排队。如希望 Apache Cloudberry 在特定时间后取消排队事务，请设置服务器配置参数 `gp_resource_group_queuing_timeout`。当此参数设置为大于 0 的值（毫秒）时，Apache Cloudberry 会在排队事务等待超过配置超时后取消该事务。

要手动取消正在运行或排队的事务，须首先确定与该事务关联的进程 ID（pid）。获取进程 ID 后，可以调用 `pg_cancel_backend()` 来结束该进程，如下所示。

例如，要查看与当前在所有资源组中活动或等待的所有语句相关的进程信息，请运行以下查询。如果查询没有返回结果，则表示在任何资源组中没有正在运行或排队的事务。

```sql
SELECT rolname, g.rsgname, pid, waiting, state, query, datname 
FROM pg_roles, gp_toolkit.gp_resgroup_status g, pg_stat_activity 
WHERE pg_roles.rolresgroup=g.groupid
AND pg_stat_activity.usename=pg_roles.rolname;
```

示例部分查询输出：

```sql
rolname | rsgname  | pid     | waiting | state  |          query           | datname 
---------+----------+---------+---------+--------+------------------------ -+---------
 sammy  | rg_light |  31861  |    f    | idle   | SELECT * FROM mytesttbl; | testdb
 billy  | rg_light |  31905  |    t    | active | SELECT * FROM topten;    | testdb
```

使用此输出识别要取消的事务进程 ID（`pid`），然后取消该进程。例如，要取消上述示例输出中识别的待处理查询：

```sql
SELECT pg_cancel_backend(31905);
```

可在 `pg_cancel_backend()` 的第二个参数中提供可选消息，以向用户指示为何取消该进程。

:::note 注意
请勿使用操作系统的 `KILL` 命令来取消任何 Apache Cloudberry 进程。
:::

## 将查询移动至另一资源组

具有 Apache Cloudberry 超级用户权限的用户可以运行 `gp_toolkit.pg_resgroup_move_query()` 函数，将正在运行的查询从一个资源组移动到另一个资源组，而无需停止查询。使用此函数可以通过将查询移动到资源分配或可用性更高的资源组来加速长时间运行的查询。

:::note 注意
只能将活动或正在运行的查询移动到新的资源组。不能移动由于并发或内存限制而处于空闲状态的排队或待处理查询。
:::

`pg_resgroup_move_query()` 需要正在运行查询的进程 ID（pid），以及您要将查询移动到的资源组的名称。该函数的签名如下：

```sql
pg_resgroup_move_query( pid int4, group_name text );
```

可从 `pg_stat_activity` 系统视图获取正在运行的查询的 pid，如 `optimize-performance/manage-resources-using-resource-groups:取消资源组中正在运行或在队列中的查询` 中所述。使用 `gp_toolkit.gp_resgroup_status` 视图列出每个资源组的名称、ID 和状态。

调用 `pg_resgroup_move_query()` 时，查询将受到目标资源组配置的限制：

- 如该组已经达到并发任务限制，Apache Cloudberry 会将查询排队，直到有插槽打开或达到 `gp_resource_group_queuing_timeout` 毫秒（如设置）。
- 如该组有空闲插槽，`pg_resgroup_move_query()` 将尝试将插槽控制权交给目标进程，最长时间为 `gp_resource_group_move_timeout` 毫秒。如果目标进程无法处理移动请求直到 `gp_resource_group_queuing_timeout` 超过，Apache Cloudberry 将返回错误：“`target process failed to move to a new group`”。
- 如 `pg_resgroup_move_query()` 被取消，但目标进程已经获得了所有插槽控制权，则段的进程将不会被移动到新组，目标进程将保持插槽。这种不一致状态将通过事务结束或目标进程在同一事务内部调度的任何下一个命令来修复。
- 如目标资源组没有足够的内存来满足查询当前的内存要求，Apache Cloudberry 将返回错误：“/ `group <group_name> doesn't have enough memory ...`”。在这种情况下，您可以选择增加分配给目标资源组的共享内存，或等待一段时间让正在运行的查询完成，然后再次调用该函数。

在 Apache Cloudberry 移动查询后，无法保证当前在目标资源组中运行的查询不会超过组的内存限制。在这种情况下，目标组中的一个或多个正在运行的查询可能会失败，包括被移动的查询。请保留足够的资源组全局共享内存，以最小化这种情况发生的可能性。

`pg_resgroup_move_query()` 仅将指定的查询移动到目标资源组。Apache Cloudberry 会将在会话中提交的后续查询分配到原始资源组。

## 常见问题解答

**为什么 CPU 使用率低于为资源组配置的 CPU_MAX_PERCENT 值？**

当资源组中运行的查询和切片数量较少，并且这些进程没有利用系统上的所有核心时，可能会遇到这种情况。

**我的资源组有相当于 40% 的 CPU_WEIGHT。为什么 CPU 使用率从未达到这个限制？**

`CPU_MAX_PERCENT` 的值可能低于 40。因此即使有空闲资源，也可能限制 CPU 使用。

**为什么正在运行的事务数量低于为资源组配置的 CONCURRENCY 限制？**

Apache Cloudberry 在运行事务之前会考虑内存可用性，如果没有足够的内存可供服务，则会将事务排队。如使用 `ALTER RESOURCE GROUP` 增加资源组的 `CONCURRENCY` 限制，但没有同时调整内存限制，当前正在运行的事务可能会消耗掉该组的所有分配内存资源。在这种状态下，Apache Cloudberry 会将后续事务排队在资源组中。

**为什么资源组中的正在运行事务数量高于配置的 `CONCURRENCY` 限制？**

这种行为是预期的。可能出现这种情况的原因有几个：

- 资源组不会对 `SET`、/ `RESET` 和 `SHOW` 命令执行资源限制。
- 服务器配置参数 `gp_resource_group_bypass` 禁用资源组的并发事务限制，因此查询可以立即运行。
- 如果服务器配置参数 `gp_resource_group_bypass_catalog_query` 设置为/ `true`（默认值），则所有仅从系统目录读取的查询，或查询文本中仅包含 `pg_catalog` 模式表的查询将不执行资源组的限制。
- 计划成本低于限制 `MIN_COST` 的查询将自动从其资源组中取消分配，并不会执行设置的任何限制。

**为什么我的查询返回了“内存限制已达到”的错误？**

当使用 `ALTER RESOURCE GROUP` 更改资源组的内存和/或并发限制时，Apache Cloudberry 会自动调整事务和组内存到新设置。如最近更改了资源组属性，并且当前运行的查询没有足够的可用内存，则可能会出现“内存不足”错误。

**我的查询由于内存不足而无法运行，导致内存泄漏（OOM）。**

首先，确保资源组分配的内存足够满足查询的需求，通过调整资源组参数，如 `CONCURRENCY` 和 `MEMORY_QUOTA`。分析查询的类型，是否会产生大量的中间结果占用内存。如果确实存在，可设置合理的 `gp_resgroup_memory_query_fixed_mem`，以便在会话级别为该特定查询分配更多内存。

**在内存泄漏（OOM）后，系统的并发负载很高。**

当系统开始清理因内存泄漏而留下的会话时，此时系统的并发负载很高，OOM 错误消息可能会再次出现。由于当前设计，我们无法加快流浪会话的清理过程。解决此问题的方案是将 `runaway_detector_activation_percent` 调整为 0.85 或 0.8，甚至更低，以增加段主机的可用内存。

**某些事务请求仅在特定时间段内运行，其他时间不运行。**

可以动态更改资源组的配置，以定期匹配工作负载的需求，并在不同时间自定义资源分配，以实现更高的效率。例如，更改组内的资源配置，添加或删除资源组。
