---
title: 使用资源队列管理资源
---

# 使用资源队列管理资源

使用 Apache Cloudberry 资源队列可以根据业务需求为查询分配资源、设定优先级，并在资源不足时阻止查询启动。

资源队列是管理 Apache Cloudberry 系统并发度的一种工具。资源队列是通过 `CREATE RESOURCE QUEUE` SQL 语句创建的数据库对象。你可以用它们来管理可同时运行的活跃查询数量、每类查询分配的内存量，以及查询的相对优先级。资源队列还能防范可能消耗过多资源、影响整体系统性能的查询。

每个数据库角色都关联一个资源队列；多个角色可以共享同一个资源队列。角色通过 `CREATE ROLE` 或 `ALTER ROLE` 语句的 `RESOURCE QUEUE` 子句分配到资源队列。如果未指定资源队列，该角色将关联到默认资源队列 `pg_default`。

用户提交查询执行时，系统会根据资源队列的限制来评估该查询。如果查询不会导致队列超出资源限制，则立即运行。如果查询会导致队列超限（例如，活跃语句槽位已全部占用），则查询必须等待队列资源释放后才能运行。查询按照先进先出的原则进行评估。如果启用了查询优先级功能，系统会定期评估当前工作负载，并根据查询优先级重新分配处理资源（参见[优先级工作原理](#优先级工作原理)）。具有 `SUPERUSER` 属性的角色不受资源队列限制。超级用户查询始终立即运行，不受其分配的资源队列限制影响。

![资源队列处理](../media/resource-queues-1.png)

资源队列定义了具有相似资源需求的查询类别。管理员应该为组织中的各种工作负载类型创建资源队列。例如，你可以为以下查询类别创建资源队列，对应不同的服务等级协议：

- ETL 查询
- 报表查询
- 高管查询

资源队列具有以下特性：

- `MEMORY_LIMIT`：队列中所有查询使用的内存量（每个 Segment）。例如，将 ETL 队列的 `MEMORY_LIMIT` 设置为 2GB，允许 ETL 查询在每个 Segment 中使用最多 2GB 内存。

- `ACTIVE_STATEMENTS`：队列的槽位数量；队列的最大并发级别。当所有槽位都被占用时，新查询必须等待。默认情况下，每个查询使用相等的内存量。

    例如，`pg_default` 资源队列的 `ACTIVE_STATEMENTS` = 20。

- `PRIORITY`：查询的相对 CPU 使用率。可以是以下级别之一：`LOW`、`MEDIUM`、`HIGH`、`MAX`。默认级别为 `MEDIUM`。查询优先级机制监控系统中所有运行查询的 CPU 使用情况，并调整每个查询的 CPU 使用率以符合其优先级别。例如，你可以将 `executive` 资源队列设置为 `MAX` 优先级，其他队列设置为 `MEDIUM`，以确保高管查询获得更多的 CPU 份额。

- `MAX_COST`：查询计划成本限制。Apache Cloudberry 优化器为每个查询分配一个数值成本。如果成本超过资源队列设置的 `MAX_COST` 值，查询将被拒绝为过于昂贵。

:::note 注意
GPORCA 和基于 Postgres 的规划器使用不同的查询成本模型，可能为同一查询计算出不同的成本。Apache Cloudberry 资源队列资源管理方案既不区分也不对齐 GPORCA 和基于 Postgres 的规划器之间的成本；它使用优化器返回的字面成本值来限制查询。
:::

当启用基于资源队列的资源管理时，使用资源队列的 `MEMORY_LIMIT` 和 `ACTIVE_STATEMENTS` 限制，而不是配置基于成本的限制。即使使用 GPORCA，Apache Cloudberry 也可能对某些查询回退到使用基于 Postgres 的规划器，因此使用基于成本的限制可能导致意外结果。

Apache Cloudberry 系统的默认配置有一个名为 `pg_default` 的单一默认资源队列。`pg_default` 资源队列的 `ACTIVE_STATEMENTS` 设置为 20，没有 `MEMORY_LIMIT`，优先级为中等，没有设置 `MAX_COST`。这意味着所有查询都被接受并立即运行，具有相同的优先级且没有内存限制；但是，只有二十个查询可以并发运行。

资源队列允许的并发查询数量取决于是否设置了 `MEMORY_LIMIT` 参数：

- 如果资源队列没有设置 `MEMORY_LIMIT`，每个查询分配的内存量是 `statement_mem` 服务器配置参数的值。资源队列可以使用的最大内存是 `statement_mem` 和 `ACTIVE_STATEMENTS` 的乘积。
- 当资源队列设置了 `MEMORY_LIMIT` 时，队列可以并发运行的查询数量受队列可用内存的限制。

被系统接受的查询会分配一定的内存量，并为其生成查询计划树。树的每个节点都是一个算子，如排序或哈希连接。每个算子是一个独立的执行线程，分配整体语句内存的一部分，最少 100KB。如果计划有大量算子，算子所需的最小内存可能超过可用内存，查询将因内存不足错误被拒绝。算子判断是否能在分配的内存中完成任务，或者是否必须将数据溢写到磁盘的工作文件中。分配和控制每个算子使用内存量的机制称为"内存配额"。

并非所有通过资源队列提交的 SQL 语句都会根据队列限制进行评估。默认情况下，只有 `SELECT`、`SELECT INTO`、`CREATE TABLE AS SELECT` 和 `DECLARE CURSOR` 语句会被评估。如果服务器配置参数 `resource_select_only` 设置为 `off`，那么 `INSERT`、`UPDATE` 和 `DELETE` 语句也会被评估。

另外，在执行 `EXPLAIN ANALYZE` 命令期间运行的 SQL 语句不受资源队列限制。

## 资源队列示例

默认资源队列 `pg_default` 允许最多 20 个活跃查询，并为每个查询分配相同的内存量。这对于生产系统来说通常不是足够的资源控制。为确保系统满足性能预期，你可以定义查询类别，并将它们分配到配置了最适合该类别查询的并发度、内存和 CPU 资源的资源队列中。

下图显示了一个 `gp_vmem_protect_limit` 设置为 8GB 的 Apache Cloudberry 系统的资源队列配置示例：

![资源队列配置示例](../media/resource-queues-2.png)

此示例有三类具有不同特征和服务等级协议（SLA）的查询。为它们配置了三个资源队列。一部分 Segment 内存被保留作为安全边际。

| 资源队列名称 | 活跃语句数 | 内存限制 | 每查询内存 |
|-------------|-----------|---------|-----------|
| ETL         | 3         | 2GB     | 667MB     |
| Reporting   | 7         | 3GB     | 429MB     |
| Executive   | 1         | 1.4GB   | 1.4GB     |

分配给队列的总内存为 6.4GB，即 `gp_vmem_protect_limit` 服务器配置参数定义的总 Segment 内存的 80%。预留 20% 的安全边际可以容纳一些已知会使用超过资源队列分配内存的算子和查询。

有关命令语法和详细参考信息的帮助，请参见 [`CREATE RESOURCE QUEUE`](../sql-stmts/create-resource-queue.md)、[`CREATE ROLE`](../sql-stmts/create-role.md) 和 [`ALTER ROLE`](../sql-stmts/alter-role.md) 语句。

## 内存限制工作原理

在资源队列上设置 `MEMORY_LIMIT` 会设定通过该队列提交的所有活跃查询在一个 Segment 实例上可以消耗的最大内存量。分配给查询的内存量是队列内存限制除以活跃语句限制。（将内存限制与基于语句的队列结合使用，而不是基于成本的队列。）例如，如果队列的内存限制为 2000MB，活跃语句限制为 10，那么通过该队列提交的每个查询默认分配 200MB 内存。可以使用 `statement_mem` 服务器配置参数按查询覆盖默认内存分配（不超过队列内存限制）。查询一旦开始运行，就会在队列中保持其分配的内存直到完成，即使在执行过程中实际消耗的内存少于分配的量。

你可以使用 `statement_mem` 服务器配置参数覆盖当前资源队列设置的内存限制。在会话级别，你可以将 `statement_mem` 增加到资源队列的 `MEMORY_LIMIT`。这将允许单个查询使用为整个队列分配的所有内存，而不影响其他资源队列。

`statement_mem` 的值通过 `max_statement_mem` 配置参数（超级用户参数）进行限制。对于设置了 `MEMORY_LIMIT` 的资源队列中的查询，`statement_mem` 的最大值是 `min(MEMORY_LIMIT, max_statement_mem)`。当查询被接受时，分配给它的内存从 `MEMORY_LIMIT` 中减去。如果 `MEMORY_LIMIT` 耗尽，同一资源队列中的新查询必须等待。即使尚未达到 `ACTIVE_STATEMENTS`，这种情况也会发生。注意，这只能在使用 `statement_mem` 覆盖资源队列分配的内存时发生。

例如，考虑一个名为 `adhoc` 的资源队列，具有以下设置：

- `MEMORY_LIMIT` 为 1.5GB
- `ACTIVE_STATEMENTS` 为 3

默认情况下，提交到队列的每个语句分配 500MB 内存。现在考虑以下一系列事件：

1. 用户 `ADHOC_1` 提交查询 `Q1`，将 `STATEMENT_MEM` 覆盖为 800MB。`Q1` 语句被系统接受。
2. 用户 `ADHOC_2` 提交查询 `Q2`，使用默认的 500MB。
3. 在 `Q1` 和 `Q2` 仍在运行时，用户 `ADHOC3` 提交查询 `Q3`，使用默认的 500MB。

查询 `Q1` 和 `Q2` 已使用队列 1500MB 中的 1300MB。因此，`Q3` 必须等待 `Q1` 或 `Q2` 完成后才能运行。

如果队列没有设置 `MEMORY_LIMIT`，查询会被接受直到所有 `ACTIVE_STATEMENTS` 槽位都被使用，每个查询可以设置任意高的 `statement_mem`。这可能导致资源队列使用无限制的内存量。

有关在资源队列上配置内存限制和其他内存利用控制的更多信息，请参见[创建具有内存限制的队列](#创建具有内存限制的队列)。

### `statement_mem` 和低内存查询

低 `statement_mem` 设置（例如，1-3MB 范围）已被证明可以提高低内存查询的性能。使用 `statement_mem` 服务器配置参数按查询覆盖此设置。例如：

```sql
SET statement_mem='2MB';
```

## 优先级工作原理

资源队列的 `PRIORITY` 设置与 `MEMORY_LIMIT` 和 `ACTIVE_STATEMENTS` 设置不同，这些设置决定了查询是否被接受进入队列并最终运行。`PRIORITY` 设置应用于查询激活后。激活查询共享可用 CPU 资源，由其资源队列的优先级设置决定。当高优先级队列中的语句进入活跃查询组时，它可能声称更多的可用 CPU，从而减少已运行查询在优先级较低队列中的分配份额。

查询的比较大小或复杂性不影响 CPU 分配。如果一个简单的低成本查询与一个大型复杂查询同时运行，且它们的优先级设置相同，它们将获得相同的可用 CPU 资源份额。当新查询激活时，CPU 份额将重新计算，但具有相同优先级的查询仍然具有相同的 CPU 份额。

例如，管理员创建了三个资源队列：`adhoc` 用于持续提交的查询，`reporting` 用于计划报告任务，`executive` 用于提交高管用户角色的查询。管理员希望确保计划报告任务不受不可预测的资源需求影响，并确保提交高管用户角色的查询获得显著的 CPU 份额。因此，资源队列的优先级设置如下：

- `adhoc` — 低优先级
- `reporting` — 高优先级
- `executive` — 最高优先级

在运行时，活跃查询的 CPU 份额由这些优先级设置决定。如果报告队列中的查询 1 和 2 同时运行，它们具有相同的 CPU 份额。当 ad-hoc 查询激活时，它声称较小的 CPU 份额。报告查询的精确份额被调整，但保持相同，因为它们的优先级设置相同：

![CPU 份额根据优先级调整](../media/resource-queues-3.png)

:::note 注意
这些插图中的百分比仅供参考。高、低和最高优先级队列之间的 CPU 使用率不一定精确计算为这些比例。
:::

当高管查询进入活跃查询组时，CPU 使用率会根据其最高优先级设置进行调整。它可能是一个简单的查询，与分析师和报告查询相比，但在完成之前，它将声称最大的 CPU 份额。

![CPU 份额根据最高优先级查询调整](../media/resource-queues-4.png)

有关设置优先级的命令，请参见[设置优先级级别](#设置优先级级别)。

## 启用资源队列

当你安装 Apache Cloudberry 时，默认情况下不会启用资源管理策略。要使用资源队列，请设置 `gp_resource_manager` 服务器配置参数：

1. 将 `gp_resource_manager` 服务器配置参数设置为 `"queue"` 值：

    ```shell
    gpconfig -c gp_resource_manager -v "queue"
    ```

2. 重启 Apache Cloudberry：

    ```shell
    gpstop
    gpstart 
    ```

## 配置资源队列

在创建任何资源组之前，请了解不同的资源队列服务器配置参数及其用途。

1. 一般配置。

    - `max_resource_queues` - 设置资源队列的最大数量。
    - `max_resource_portals_per_transaction` - 设置每个事务中允许的同时打开游标数量。注意，打开游标会占用资源队列中的一个活跃查询槽位。
    - `resource_select_only` - 如果设置为 *on*，则评估 `SELECT`、`SELECT INTO`、`CREATE TABLE AS``SELECT` 和 `DECLARE CURSOR` 命令。如果设置为 *off*，则评估 `INSERT`、`UPDATE` 和 `DELETE` 命令。
    - `resource_cleanup_gangs_on_wait` - 在资源队列中等待时清理空闲段工作进程。
    - `stats_queue_level` - 启用资源队列使用情况统计收集，然后可以通过查询 `pg_stat_resqueues` 系统视图查看。

2. 内存利用。

    - `gp_resqueue_memory_policy` - 启用 Apache Cloudberry 内存管理功能。

        Apache Cloudberry 的分布式算法 `eager_free` 利用了这样一个事实：并非所有算子同时运行。查询计划被划分为阶段，Apache Cloudberry 在每个阶段执行结束时立即释放分配给前一阶段的内存，然后分配释放的内存给新阶段。

        当设置为 `auto` 时，查询内存使用受 `statement_mem` 和资源队列内存限制控制。

    - `statement_mem` 和 `max_statement_mem` - 用于在运行时（覆盖资源队列分配的默认分配）为特定查询分配内存。`max_statement_mem` 由数据库超级用户设置，以防止常规数据库用户过度分配。
    - `gp_vmem_protect_limit` - 设置所有查询进程可以消耗的上限，不应超过段主机物理内存量。当段主机在查询执行期间达到此限制时，导致限制超出的查询将被取消。
    - `gp_vmem_idle_resource_timeout` 和 `gp_vmem_protect_segworker_cache_limit` - 用于释放段主机上由空闲数据库进程持有的内存。管理员可能希望在系统具有大量并发时调整这些设置。
    - `shared_buffers` - 设置 Cloudberry 服务器实例用于共享内存缓冲区的内存量。此设置必须至少为 128KB，且至少为 16KB 乘以 `max_connections`。值必须不超过操作系统共享内存最大分配请求大小，Linux 上的 `shmmax`。

3. 查询优先级。注意，以下参数均为*本地*参数，即必须在协调器和所有段落的 `postgresql.conf` 文件中设置：

    - `gp_resqueue_priority` - 查询优先级功能默认启用。
    - `gp_resqueue_priority_sweeper_interval` - 设置 CPU 使用率重新计算的间隔。此参数的默认值对于典型数据库操作来说应该足够。
    - `gp_resqueue_priority_cpucores_per_segment` - 指定每个段实例在段主机上分配的 CPU 核心数量。如果段配置为主镜像段实例对，则使用主机上主段实例的数量进行计算。默认值为 4 用于协调器和段主机。

        每个 Cloudberry 主机检查其自己的 `postgresql.conf` 文件以获取此参数的值。此参数也会影响协调器主机，其值应反映更高的 CPU 核心比例。例如，在具有 10 个 CPU 核心的段主机和 4 个主段实例的集群中，你将指定以下值：

        - 在协调器和备用协调器主机上设置为 `10`。通常，只有单个协调段实例运行在协调主机上。
        - 在每个段主机上设置为 `2.5`（10 核心除以 4 个主段实例）。

        如果参数值设置不正确，可能会导致 CPU 未完全利用，或者查询优先级可能无法按预期工作。例如，如果 Apache Cloudberry 集群的段实例数量少于每个 CPU 核心一个，请确保相应调整此值。

        实际 CPU 核心利用率基于 Apache Cloudberry 并行化查询的能力和运行查询所需的资源。

        :::note 注意
        在 CPU 核心数量中包含操作系统可用的所有 CPU 核心，包括虚拟 CPU 核心。
        :::

使用 `gpconfig` 工具查看或更改任何资源管理参数值。例如，要查看特定参数的设置：

```shell
gpconfig --show gp_vmem_protect_limit
```

要在所有段实例上设置一个值，在协调器上设置一个不同的值：

```shell
gpconfig -c gp_resqueue_priority_cpucores_per_segment -v 2 -m 8
```

重启 Apache Cloudberry 使配置更改生效：

```shell
gpstop -r
```

## 创建资源队列

当你为角色创建资源队列时，你需要提供一个名称、设置活跃查询限制，并可选地为资源队列设置查询优先级。使用 [`CREATE RESOURCE QUEUE`](../sql-stmts/create-resource-queue.md) 命令创建新的资源队列。

### 创建具有活跃查询限制的队列

资源队列的 `ACTIVE_STATEMENTS` 设置限制分配给该队列的角色可以运行的查询数量。例如，要创建一个名为 `adhoc` 的资源队列，并设置活跃查询限制为三个：

```sql
CREATE RESOURCE QUEUE adhoc WITH (ACTIVE_STATEMENTS=3);
```

这意味着对于分配给 `adhoc` 资源队列的所有角色，系统中任何时刻最多只能有三个活跃查询运行。如果此队列有三个查询运行，并且该队列中的角色提交了第四个查询，则该查询必须等待直到有空闲槽位才能运行。

### 创建具有内存限制的队列

资源队列的 `MEMORY_LIMIT` 设置控制通过该队列提交的所有查询的内存量。总内存不应超过每个段实例的物理内存。将 `MEMORY_LIMIT` 设置为每个段实例物理内存的 90%。例如，如果主机有 48 GB 物理内存和 6 个段实例，则每个段实例的内存可用量为 8 GB。你可以计算单个队列的推荐 `MEMORY_LIMIT` 为 0.90\*8=7.2 GB。如果系统中创建了多个队列，它们的总内存限制也必须加起来为 7.2 GB。

当与 `ACTIVE_STATEMENTS` 结合使用时，默认每查询分配的内存量为：`MEMORY_LIMIT / ACTIVE_STATEMENTS`。当与 `MAX_COST` 结合使用时，默认每查询分配的内存量为：`MEMORY_LIMIT * (query_cost / MAX_COST)`。使用 `MEMORY_LIMIT` 与 `ACTIVE_STATEMENTS` 结合，而不是与 `MAX_COST` 结合。

例如，要创建一个活跃查询限制为 10 且总内存限制为 2000MB（每个查询将在执行时分配 200MB 段主机内存）的资源队列：

```sql
CREATE RESOURCE QUEUE myqueue WITH (ACTIVE_STATEMENTS=20, 
MEMORY_LIMIT='2000MB');
```

可以使用 `statement_mem` 服务器配置参数按查询覆盖默认内存分配，前提是 `MEMORY_LIMIT` 或 `max_statement_mem` 未超出。例如，要为特定查询分配更多内存：

```sql
SET statement_mem='2GB';
SELECT * FROM my_big_table WHERE column='value' ORDER BY id;
RESET statement_mem;
```

作为一般指南，所有资源队列的 `MEMORY_LIMIT` 不应超过段主机物理内存量。如果工作负载分散在多个队列上，内存分配可能可以超额订阅，但请记住，如果段主机内存限制 (`gp_vmem_protect_limit`) 超出，查询在执行期间可能会被取消。

### 设置优先级级别

为了控制资源队列消耗可用 CPU 资源的程度，管理员可以分配适当的优先级级别。当高并发导致 CPU 资源竞争时，与高优先级资源队列关联的查询和语句将声称更大的可用 CPU 份额。

优先级设置通过 `CREATE RESOURCE QUEUE` 和 `ALTER RESOURCE QUEUE` 命令的 `WITH` 参数创建或修改。例如，要为 `adhoc` 和 `reporting` 队列指定优先级设置，管理员将使用以下命令：

```sql
ALTER RESOURCE QUEUE adhoc WITH (PRIORITY=LOW);
ALTER RESOURCE QUEUE reporting WITH (PRIORITY=HIGH);
```

要创建具有最高优先级的 `executive` 队列，管理员将使用以下命令：

```sql
CREATE RESOURCE QUEUE executive WITH (ACTIVE_STATEMENTS=3, PRIORITY=MAX);
```

当启用查询优先级功能时，资源队列默认获得 `MEDIUM` 优先级，如果未明确分配。有关优先级设置在运行时如何评估的更多信息，请参见[优先级工作原理](#优先级工作原理)。

:::tip 提示
为了使资源队列优先级在活动查询工作负载上得到执行，你必须启用查询优先级功能，并设置相关的服务器配置参数。请参见[配置资源队列](#配置资源队列)。
:::

## 分配角色到资源队列

一旦创建了资源队列，你必须将角色（用户）分配到相应的资源队列。如果角色未明确分配到资源队列，它们将进入默认资源队列 `pg_default`。默认资源队列具有活跃语句限制 `20`、无成本限制和中等优先级设置。

使用 `ALTER ROLE` 或 `CREATE ROLE` 命令将角色分配到资源队列。例如：

```sql
ALTER ROLE `name` RESOURCE QUEUE `queue_name`;
CREATE ROLE `name` WITH LOGIN RESOURCE QUEUE `queue_name`;
```

一个角色只能在一个时刻分配到一个资源队列，因此你可以使用 `ALTER ROLE` 命令来初始分配或更改角色的资源队列。

角色必须按用户分配。如果你有一个角色层次结构（例如，组级角色），则将资源队列分配给组不会向下传播到该组中的用户。

超级用户始终不受资源队列限制。超级用户查询将始终运行，不受其分配队列设置的限制。

### 从资源队列中移除角色

所有用户必须分配到资源队列。如果未明确分配到特定队列，用户将进入默认资源队列 `pg_default`。如果你希望从资源队列中移除角色并将其放入默认队列，请将角色的队列分配更改为 `none`。例如：

```sql
ALTER ROLE `role_name` RESOURCE QUEUE none;
```

## 修改资源队列

创建资源队列后，你可以使用 `ALTER RESOURCE QUEUE` 命令更改或重置队列限制。你可以使用 `DROP RESOURCE QUEUE` 命令删除资源队列。要更改分配给资源队列的角色（用户），请参见[分配角色到资源队列](#分配角色到资源队列)。

### 修改资源队列

`ALTER RESOURCE QUEUE` 命令更改资源队列的限制。要更改资源队列的限制，请指定你想要的队列新值。例如：

```sql
ALTER RESOURCE QUEUE <adhoc> WITH (ACTIVE_STATEMENTS=5);
ALTER RESOURCE QUEUE <exec> WITH (PRIORITY=MAX);
```

要重置活跃语句或内存限制为无限制，请输入 `-1`。要重置最大查询成本为无限制，请输入 `-1.0`。例如：

```sql
ALTER RESOURCE QUEUE <adhoc> WITH (MAX_COST=-1.0, MEMORY_LIMIT='2GB');
```

你可以使用 `ALTER RESOURCE QUEUE` 命令更改与资源队列关联的查询的优先级。例如，要将队列设置为最低优先级：

```sql
ALTER RESOURCE QUEUE <webuser> WITH (PRIORITY=MIN);
```

### 删除资源队列

`DROP RESOURCE QUEUE` 命令删除资源队列。要删除资源队列，该队列不能有任何角色分配给它，也不能有任何等待语句。请参见[从资源队列中移除角色](#从资源队列中移除角色)和[从资源队列中清除等待语句](#从资源队列中清除等待语句)以了解如何清空资源队列。要删除资源队列：

```sql
DROP RESOURCE QUEUE <name>;
```

## 监控资源队列状态

监控资源队列状态涉及以下任务：

### 查看排队语句和资源队列状态

[`gp_toolkit.gp_resqueue_status`](../sys-catalogs/gp_toolkit.md#gp_resqueue_status) 视图允许管理员查看资源队列的状态和活动。它显示从特定资源队列等待运行的查询数量以及系统中当前活动的查询数量。要查看系统中创建的资源队列、其限制属性以及当前状态：

```sql
SELECT * FROM gp_toolkit.gp_resqueue_status;
```

### 查看资源队列统计

如果你想跟踪资源队列的统计和性能随时间的变化，你可以启用资源队列的统计收集。这是通过在协调器 `postgresql.conf` 文件中设置以下服务器配置参数来完成的：

```sql
stats_queue_level = on
```

启用此功能后，你可以使用 `pg_stat_resqueue` 系统视图查看收集到的资源队列使用情况统计。请注意，启用此功能会带来轻微的性能开销，因为每个通过资源队列提交的查询都必须被跟踪。它可能对初始诊断和行政规划很有用，然后可以停用此功能以继续使用。

请参见 PostgreSQL 文档中的统计收集器部分了解更多关于在 Apache Cloudberry 中收集统计信息的信息。

### 查看分配给资源队列的角色

要查看分配给资源队列的角色，请执行以下查询：

```sql
SELECT rolname, rsqname FROM pg_roles, 
       gp_toolkit.gp_resqueue_status 
WHERE pg_roles.rolresqueue=gp_toolkit.gp_resqueue_status.queueid;
```

你可能希望创建此查询的视图以简化未来的查询。例如：

```sql
CREATE VIEW role2queue AS
SELECT rolname, rsqname FROM pg_roles, pg_resqueue 
WHERE pg_roles.rolresqueue=gp_toolkit.gp_resqueue_status.queueid;
```

然后你只需查询视图：

```sql
SELECT * FROM role2queue;
```

### 查看资源队列的等待查询

当资源队列中的槽位被占用时，它记录在 `pg_locks` 系统目录表中。这是你可以看到所有资源队列中当前活动和等待查询的地方。要检查语句是否正在排队（即使语句未等待），你也可以使用 [`gp_toolkit.gp_locks_on_resqueue`](../sys-catalogs/gp_toolkit.md#gp_locks_on_resqueue) 视图。例如：

```sql
SELECT * FROM gp_toolkit.gp_locks_on_resqueue WHERE lorwaiting='true';
```

如果此查询返回空结果，则意味着当前没有语句在资源队列中等待。

### 从资源队列中清除等待语句

在某些情况下，你可能希望从资源队列中清除等待语句。例如，你可能希望移除一个等待队列但尚未运行的查询，或者你可能希望停止一个已经启动但运行时间过长的查询，或者如果它在一个事务中处于空闲状态并占用资源队列槽位，而其他用户需要这些槽位。为此，你必须首先识别你想要清除的语句，确定其进程 ID (pid)，然后使用 `pg_cancel_backend` 并传递进程 ID 来结束该进程，如下所示。你可以传递一个可选消息作为第二个参数，以向用户指示为什么进程被取消。

例如，要查看所有当前活动或等待资源队列中的语句的进程信息，请运行以下查询：

```sql
SELECT rolname, rsqname, pg_locks.pid as pid, granted, state,
       query, datname 
FROM pg_roles, gp_toolkit.gp_resqueue_status, pg_locks,
     pg_stat_activity 
WHERE pg_roles.rolresqueue=pg_locks.objid 
AND pg_locks.objid=gp_toolkit.gp_resqueue_status.queueid
AND pg_stat_activity.pid=pg_locks.pid
AND pg_stat_activity.usename=pg_roles.rolname;
```

如果此查询返回空结果，则意味着当前没有语句在资源队列中。一个资源队列中有两个语句的示例如下：

```sql
rolname | rsqname |  pid  | granted | state  |         query          | datname 
--------+---------+-------+---------+--------+------------------------+--------- 
  sammy | webuser | 31861 | t       | idle   | SELECT * FROM testtbl; | namesdb
  daria | webuser | 31905 | f       | active | SELECT * FROM topten;  | namesdb
```

使用此输出识别你想要从资源队列中清除的语句的进程 ID (pid)。然后，你可以在协调器主机上打开一个终端窗口（作为 `gpadmin` 数据库超级用户或作为 root），并取消相应的进程。例如：

```sql
pg_cancel_backend(31905)
```

:::note 注意
不要使用操作系统 `KILL` 命令。
:::

### 查看活动语句的优先级

`gp_toolkit` 管理架构有一个名为 `gp_resq_priority_statement` 的视图，它列出了所有当前正在运行的语句并提供优先级、会话 ID 和其他信息。

此视图仅通过 `gp_toolkit` 管理架构提供。

### 重置活动语句的优先级

超级用户可以通过内置函数 `gp_adjust_priority(session_id, statement_count, priority)` 调整当前正在运行的语句的优先级。使用此函数，超级用户可以提高或降低任何查询的优先级。例如：

```sql
SELECT gp_adjust_priority(752, 24905, 'HIGH')`
```

要获取此函数所需的 `session_id` 和 `statement_count` 参数，超级用户可以使用 `gp_toolkit` 管理架构视图 `gp_resq_priority_statement`。从视图中，使用这些值作为函数参数。

- `rqpsession` 列的值作为 `session_id` 参数
- `rqpcommand` 列的值作为 `statement_count` 参数
- `rqppriority` 列的值是当前优先级。你可以指定一个字符串值 `MAX`、`HIGH`、`MEDIUM` 或 `LOW` 作为 `priority`。

:::note 注意
`gp_adjust_priority()` 函数仅影响指定的语句。同一资源队列中的后续语句使用队列分配的正常优先级运行。
:::
