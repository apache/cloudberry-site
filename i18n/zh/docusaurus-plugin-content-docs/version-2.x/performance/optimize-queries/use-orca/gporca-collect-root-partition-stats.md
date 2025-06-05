---
title: 收集根分区统计信息
---

# 收集根分区统计信息

对于分区表，GPORCA 使用表的根分区统计信息来生成查询计划。这些统计信息用于确定连接顺序、拆分和合并聚合节点，以及评估查询各步骤的开销。相比之下，基于 Postgres 的优化器使用的是每个叶子分区的统计信息。

如果你要对分区表执行查询，应收集根分区的统计信息，并定期更新，以确保 GPORCA 能生成更优的查询计划。如果根分区统计信息过期或不存在，GPORCA 仍然会对查询执行动态分区裁剪，但生成的查询计划可能不是最优的。

## 执行 ANALYZE

默认情况下，在根分区表上执行 `ANALYZE` 命令时，会对表中叶子分区的数据进行采样，并将统计信息存储到根分区。`ANALYZE` 会同时收集根分区和叶子分区的统计信息，其中包括叶子分区的 HyperLogLog (HLL) 统计信息。`ANALYZE ROOTPARTITION` 只收集根分区的统计信息。服务器配置参数 `optimizer_analyze_root_partition` 用于控制是否必须显式指定 `ROOTPARTITION` 关键字才能收集根分区的统计信息。关于如何在分区表上收集统计信息，请参见 [`ANALYZE`](../../../sql-stmts/analyze.md) 命令文档。

注意，`ANALYZE` 会在更新根分区统计信息前扫描整张表。如果表很大，这个操作可能耗时较长。`ANALYZE ROOTPARTITION` 同样会使用 `ACCESS SHARE` 锁，在执行期间会阻止某些操作，例如 `TRUNCATE` 和 `VACUUM`。因此建议你定期安排 `ANALYZE` 操作，或者在叶子分区数据发生显著变化时执行。

在系统中对分区表运行 `ANALYZE` 或 `ANALYZE ROOTPARTITION` 时，建议遵循以下最佳实践：

- 在向新建的分区表插入初始数据后，执行 `ANALYZE <root_partition_table_name>`。对于新增的叶子分区，或数据已发生变化的叶子分区，执行 `ANALYZE <leaf_partition_table_name>`。默认情况下，在叶子分区上执行 `ANALYZE` 命令会在其他叶子分区已有统计信息的前提下更新根分区的统计信息。
- 如果在使用 `EXPLAIN` 查看某个分区表的执行计划时发现查询性能下降，或者叶子分区数据发生了显著变化，应更新根分区统计信息。例如，在生成根分区统计信息之后新增了叶子分区，建议运行 `ANALYZE` 或 `ANALYZE ROOTPARTITION`，以便将新分区中的数据纳入根分区统计信息中。
- 对于超大表，建议每周或更长间隔执行一次 `ANALYZE` 或 `ANALYZE ROOTPARTITION`，不需要每天执行。
- 避免直接运行不带参数的 `ANALYZE` 命令，因为这会对所有数据库表（包括分区表）执行统计信息收集操作。对于大型数据库，这种全库分析操作难以监控，且执行时间难以预测。
- 如果系统的 I/O 吞吐能力足够，可以并行运行多个 `ANALYZE <table_name>` 或 `ANALYZE ROOTPARTITION <table_name>` 命令，以加快统计信息收集速度。
- 你也可以使用 Apache Cloudberry 提供的工具 `analyzedb` 来更新表的统计信息。使用 `analyzedb` 可确保只有那些自上次分析后数据发生变化的叶子分区才会重新分析，从而避免不必要的分析操作。

## GPORCA 与叶子分区统计信息

虽然在分区表上使用 GPORCA 查询时，构建和维护根分区统计信息至关重要，但维护叶子分区的统计信息也同样重要。如果 GPORCA 无法为某个分区表查询生成执行计划，则会回退使用基于 Postgres 的优化器，而此时叶子分区的统计信息对于生成最优执行计划是必要的。

另外，当查询直接访问叶子分区（而不是通过根分区的谓词条件进行分区裁剪）时，GPORCA 本身也会使用叶子分区的统计信息。例如，如果你已知某个查询只涉及特定分区中的数据，可以直接查询这些叶子分区；此时，GPORCA 使用的就是这些分区的统计信息。

## 关闭自动收集根分区统计信息

如果你不打算使用 GPORCA 对分区表执行查询（即将服务器配置参数 `optimizer` 设置为 `off`），则可以关闭对分区表根分区统计信息的自动收集。服务器配置参数 `optimizer_analyze_root_partition` 用于控制是否必须使用 `ROOTPARTITION` 关键字来收集根分区的统计信息。该参数默认值为 `on`，表示在不指定 `ROOTPARTITION` 的情况下，`ANALYZE` 命令也会收集根分区统计信息。若将该参数设置为 `off`，则自动收集功能将被禁用，此时必须使用 `ANALYZE ROOTPARTITION` 才能收集根分区统计信息。

操作步骤如下：

1. 以 Apache Cloudberry 管理员 `gpadmin` 身份登录到 Coordinator 主机。
2. 设置服务器参数。以下 `gpconfig` 命令将参数值设为 `off`：

    ```shell
    $ gpconfig -c optimizer_analyze_root_partition -v off --coordinatoronly
    ```

3. 重启 Apache Cloudberry。以下 `gpstop` 命令将在不中断服务的情况下重新加载协调器和计算节点的 `postgresql.conf` 配置文件：

    ```shell
    gpstop -u
    ```
