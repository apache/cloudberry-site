---
title: 内存概览
---

# 内存概览

内存是 Apache Cloudberry 系统的核心资源，合理配置内存能够确保系统的高性能和高吞吐量。本文介绍了 Segment 主机的内存分配方式，以及管理员可用的内存配置选项。

Apache Cloudberry 的 Segment 主机运行着多个 PostgreSQL 实例，它们共享主机的内存资源。这些 Segment 配置完全相同，在并行处理查询时会同时消耗相似的内存、CPU 和磁盘 IO 资源。

为了获得最佳的查询吞吐量，内存配置需要精心管理。Apache Cloudberry 在各个层面都提供了内存配置选项，从操作系统参数、资源队列和资源组的资源管理，到单个查询的内存分配。

## Segment 主机内存概览

在 Apache Cloudberry 的 Segment 主机上，可用内存被所有运行的进程共享，包括操作系统、Apache Cloudberry Segment 实例以及其他应用程序。管理员需要确定哪些 Apache Cloudberry 进程和非 Apache Cloudberry 进程共享主机内存，并配置系统高效使用内存。同样重要的是，需要定期监控内存使用情况，及时发现 Apache Cloudberry 或其他进程内存消耗方式的变化。

下图展示了启用资源队列管理时，Apache Cloudberry Segment 主机的内存使用分布。

![Apache Cloudberry Segment 主机内存](../media/memory-overview.png)

从图的底部开始，标记为 `A` 的线代表主机总内存。紧邻上方的线显示总内存由物理 RAM 和交换空间组成。

标记为 `B` 的线表明，可用总内存必须在 Apache Cloudberry 和主机上的所有其他进程间共享。非 Apache Cloudberry 进程包括操作系统和其他应用程序，例如系统监控代理。某些应用程序可能占用大量内存，因此你可能需要调整每台 Apache Cloudberry 主机的 Segment 数量或每个 Segment 的内存量。

在标记为 `C` 的线上，每个 Segment 平均分配 Apache Cloudberry 的可用内存。

在 Segment 内部，当前启用的资源管理方案（资源队列或资源组）决定了如何为 SQL 语句的执行分配内存。这些机制让你能够将业务需求转化为 Apache Cloudberry 系统中的执行策略，并防范可能影响性能的查询。有关资源组和资源队列的概述，请参考[资源管理](./manage-resources.md)。

## 配置 Segment 主机内存

主机内存是 Segment 主机上所有应用程序共享的总内存。你可以通过以下方法配置主机内存大小：

- 增加节点的 RAM 来扩大物理内存。
- 分配交换空间来增加虚拟内存大小。
- 调整内核参数 `vm.overcommit_ratio` 来配置操作系统处理大内存分配请求的方式。

物理 RAM 和操作系统配置通常由平台团队和系统管理员负责。推荐的内核参数和 `/etc/sysctl.conf` 文件参数设置，请参考 [Apache Cloudberry 软硬件准备](../cbdb-op-software-hardware.md)。

为操作系统和其他进程预留的内存量取决于工作负载特征。建议为操作系统预留至少 32GB 内存，但如果 Apache Cloudberry 并发度很高，可能需要预留 64GB 内存。操作系统内存的最大使用者是 SLAB，它会随着 Apache Cloudberry 并发度和使用的套接字数量增加而增长。

内核参数 `vm.overcommit_memory` 应始终设置为 2，这是 Apache Cloudberry 唯一安全的值。

内核参数 `vm.overcommit_ratio` 设置用于应用程序进程的 RAM 百分比，剩余部分为操作系统保留。Red Hat 的默认值是 50（50%）。设置过高可能导致为操作系统保留的内存不足，从而引起 Segment 主机故障或数据库故障。保持默认的 50 通常是安全且保守的选择。设置过低会减少 Apache Cloudberry 的可用内存，从而降低并发度和可同时运行的查询复杂度。增加 `vm.overcommit_ratio` 时，务必记住为操作系统活动保留一些内存。

要计算 `vm.overcommit_ratio` 的安全值，首先需要确定 Apache Cloudberry 进程可用的总内存 `gp_vmem`。

- 如果系统总内存小于 256 GB，使用以下公式：

    ```shell
    gp_vmem = ((SWAP + RAM) – (7.5GB + 0.05 * RAM)) / 1.7
    ```

- 如果系统总内存大于等于 256 GB，使用以下公式：

    ```shell
    gp_vmem = ((SWAP + RAM) – (7.5GB + 0.05 * RAM)) / 1.17
    ```

其中 `SWAP` 是主机的交换空间（GB），`RAM` 是主机安装的 RAM 容量（GB）。

使用 `gp_vmem` 通过以下公式计算 `vm.overcommit_ratio` 值：

```sql
vm.overcommit_ratio = (RAM - 0.026 * gp_vmem) / RAM
```

## 配置 Apache Cloudberry 内存

Apache Cloudberry 内存是所有 Apache Cloudberry Segment 实例可用的内存总量。

设置 Apache Cloudberry 集群时，你需要确定每台主机运行的主 Segment 数量和每个 Segment 分配的内存量。根据 CPU 核心数、物理 RAM 容量和工作负载特征，Segment 数量通常在 4 到 8 之间。启用 Segment 镜像时，务必为故障期间主机上运行的最大主 Segment 数量分配内存。例如，使用默认的分组镜像配置时，Segment 主机故障会使拥有故障主机镜像的主机上活跃主 Segment 数量翻倍。将每台主机的镜像分散到多台其他主机的镜像配置可以降低最大值，从而为每个 Segment 分配更多内存。例如，使用每块 4 台主机、每台主机 8 个主 Segment 的块镜像配置时，单台主机故障会导致块内其他主机最多运行 11 个活跃主 Segment，而默认分组镜像配置则是 16 个。

服务器配置参数 `gp_vmem_protect_limit` 的值标识分配给每个 Segment 的内存量。该值通过计算所有 Apache Cloudberry 进程的可用内存并除以故障期间的最大主 Segment 数量来估算。如果 `gp_vmem_protect_limit` 设置过高，查询可能会失败。使用前面计算的 `gp_vmem` 值，通过以下公式计算 `gp_vmem_protect_limit` 的安全值。

```shell
gp_vmem_protect_limit = gp_vmem / max_acting_primary_segments
```

其中 `max_acting_primary_segments` 是主机或 Segment 故障导致镜像 Segment 激活时，主机上可能运行的最大主 Segment 数量。

资源队列和资源组提供了额外的配置参数，让你能够进一步控制和优化查询的内存分配。

## 内存配置计算示例

本节为一个具有以下规格的 Apache Cloudberry 系统提供资源队列和资源组的内存计算示例：

- 总 RAM = 256GB
- 交换空间 = 64GB
- 每台主机 8 个主 Segment 和 8 个镜像 Segment，以 4 台主机为一个块
- 故障时每台主机的最大主 Segment 数量为 11

该示例系统的 `vm.overcommit_ratio` 计算如下：

```shell
gp_vmem = ((SWAP + RAM) – (7.5GB + 0.05 * RAM)) / 1.7
        = ((64 + 256) - (7.5 + 0.05 * 256)) / 1.7
        = 176

vm.overcommit_ratio = (RAM - (0.026 * gp_vmem)) / RAM
                    = (256 - (0.026 * 176)) / 256
                    = .982
```

示例系统的 `vm.overcommit_ratio` 应设置为 98。

`gp_vmem_protect_limit` 的计算如下：

```shell
gp_vmem_protect_limit = gp_vmem / maximum_acting_primary_segments
                      = 176 / 11
                      = 16GB
                      = 16384MB
```

示例系统的 `gp_vmem_protect_limit` 服务器配置参数应设置为 `16384`。
