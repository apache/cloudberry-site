---
title: 使用 GPORCA 的注意事项
---

# 使用 GPORCA 的注意事项

若要使用 GPORCA 以最佳方式执行查询，应仔细检查查询条件。

请确保满足以下条件：

- 表不包含多列分区键。
- 在查询仅针对协调器上的表（如系统表 *pg_attribute*）时，服务器参数 `optimizer_enable_coordinator_only_queries` 已设置为 `on`。

    :::note 注意
    启用该参数可能会降低执行时间较短的系统表查询的性能。为避免这一问题，建议只在当前会话或某个特定查询中设置该参数。
    :::

- 已收集分区表的根分区统计信息。

如果某个分区表的分区数量超过 20,000 个，建议重新设计表结构。

以下服务器配置参数会影响 GPORCA 的查询处理行为：

- `optimizer_cte_inlining_bound` 控制公共表表达式（CTE，即包含 `WITH` 子句的查询）的内联优化程度。
- `optimizer_force_comprehensive_join_implementation` 控制 GPORCA 是否同时考虑嵌套循环连接和哈希连接方案。默认值为 `false`，表示在可用哈希连接的情况下不考虑嵌套循环连接。
- `optimizer_force_multistage_agg` 强制 GPORCA 对带 `DISTINCT` 的标量聚合函数选择多阶段聚合执行计划。默认值为 `off`，表示根据成本在单阶段与双阶段计划中进行选择。
- `optimizer_force_three_stage_scalar_dqa` 若存在多阶段聚合的可选执行计划，则强制 GPORCA 选择该计划。
- `optimizer_join_order` 设置连接顺序优化的级别，用于指定需要评估哪些类型的连接顺序方案。
- `optimizer_join_order_threshold` 指定当连接子项数量不超过该阈值时，GPORCA 使用基于动态规划的连接顺序算法。
- `optimizer_nestloop_factor` 控制优化器对嵌套循环连接的成本估算系数。
- `optimizer_parallel_union` 控制查询中包含 `UNION` 或 `UNION ALL` 子句时的并行度。当设为 `on` 时，GPORCA 可生成这些子操作在各 segment 上并行执行的查询计划。
- `optimizer_sort_factor` 控制 GPORCA 在进行排序操作时应用的成本系数。当存在数据倾斜时，可通过此参数调整排序成本估算。
- `gp_enable_relsize_collection` 控制 GPORCA（以及 Postgres 优化器）在无统计信息时如何估算表大小。默认情况下，如果缺少统计信息，GPORCA 使用默认行数进行估算。若设置为 `on`，则在无统计信息时改为使用估算的表大小。

    对于根分区表，该参数不生效。如果根分区没有统计信息，GPORCA 始终使用默认估值。你可以使用 `ANALYZE ROOTPARTITION` 收集根分区统计信息。

以下服务器参数控制信息的显示和日志记录行为：

- `optimizer_print_missing_stats` 控制是否在查询执行计划中显示缺少统计信息的列信息（默认值为 `true`）。
- `optimizer_print_optimization_stats` 控制是否记录 GPORCA 查询优化的相关指标信息（默认值为 `off`）。

当使用 `EXPLAIN ANALYZE` 执行由 GPORCA 生成的查询计划时，输出中仅显示被裁剪掉的分区数量，并不会列出实际扫描的分区。如果希望在 segment 日志中记录被扫描的分区名称，可以将服务器参数 `gp_log_dynamic_partition_pruning` 设为 `on`。可以使用如下命令启用该参数：

```sql
SET gp_log_dynamic_partition_pruning = on;
```
