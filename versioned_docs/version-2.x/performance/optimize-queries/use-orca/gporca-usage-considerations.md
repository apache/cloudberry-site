---
title: Considerations when using GPORCA
---

# Considerations when using GPORCA

To ensure optimal query performance with GPORCA, it is important to carefully review query conditions.

Make sure the following conditions are met:

- The table does not use multi-column partitioning keys.
- When querying tables that reside only on the coordinator (such as system tables like *pg_attribute*), the server parameter `optimizer_enable_coordinator_only_queries` should be set to `on`.

    :::note
    Enabling this parameter may reduce the performance of short-running system table queries. To avoid this, it's recommended to enable it only for the current session or a specific query.
    :::

- Statistics for the root partition of partitioned tables have been collected.

If a partitioned table contains more than 20,000 partitions, consider redesigning the table structure.

The following server configuration parameters affect GPORCA’s query planning behavior:

- `optimizer_cte_inlining_bound` controls how aggressively GPORCA inlines Common Table Expressions (CTEs), i.e., queries with `WITH` clauses.
- `optimizer_force_comprehensive_join_implementation` controls whether GPORCA evaluates both nested loop and hash join plans. The default is `false`, meaning nested loop joins are not considered when hash joins are available.
- `optimizer_force_multistage_agg` forces GPORCA to choose a multi-stage aggregation plan for scalar aggregates with `DISTINCT`. The default is `off`, meaning it chooses between single-stage and multi-stage plans based on cost.
- `optimizer_force_three_stage_scalar_dqa` forces GPORCA to select a three-stage plan when such an option is available for distinct qualified aggregates (DQA).
- `optimizer_join_order` sets the level of join order optimization, controlling which types of join sequences GPORCA will evaluate.
- `optimizer_join_order_threshold` defines the maximum number of join relations for which GPORCA will use a dynamic programming join order algorithm.
- `optimizer_nestloop_factor` adjusts the cost multiplier GPORCA uses when estimating nested loop joins.
- `optimizer_parallel_union` controls the degree of parallelism for queries that use `UNION` or `UNION ALL`. When set to `on`, GPORCA may generate plans that execute union operations in parallel across segments.
- `optimizer_sort_factor` adjusts the cost estimation factor for sort operations. You can tune this value to better reflect performance under data skew conditions.
- `gp_enable_relsize_collection` controls how GPORCA (and the Postgres planner) estimates table size in the absence of statistics. By default, GPORCA assumes a default row count when statistics are missing. When this parameter is set to `on`, estimated table size will be used instead.

    This parameter does not apply to root partitions. If the root partition lacks statistics, GPORCA will always use default estimates. You can collect statistics on the root partition using:

    ```sql
    ANALYZE ROOTPARTITION;
    ```

The following server parameters control logging and display behavior:

- `optimizer_print_missing_stats` controls whether the plan output includes information about columns missing statistics (default: `true`).
- `optimizer_print_optimization_stats` controls whether GPORCA logs internal optimization metrics (default: `off`).

When executing a GPORCA-generated plan with `EXPLAIN ANALYZE`, only the number of pruned partitions is shown — the list of scanned partitions is not included. To log the names of scanned partitions in the segment logs, set the server parameter `gp_log_dynamic_partition_pruning` to `on`. You can enable this with the following command:

```sql
SET gp_log_dynamic_partition_pruning = on;
```
