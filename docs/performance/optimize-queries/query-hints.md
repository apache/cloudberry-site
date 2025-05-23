---
title: Query Plan Hints
---

# Query Plan Hints

Apache Cloudberry uses two types of query optimizers: the Postgres-based optimizer and GPORCA. Each optimizer is tuned for specific types of workloads:

- Postgres-based optimizer: suitable for transactional workloads.
- GPORCA: suitable for analytical and hybrid transactional-analytical workloads.

When processing a query, the optimizer explores a large search space of equivalent execution plans. It estimates the number of rows for each operation using table statistics and a cardinality estimation model. Based on this, the optimizer assigns a cost to each plan and selects the one with the lowest cost as the final execution plan.

Query plan hints or optimizer hints are directives that users provide to influence the optimizer's execution strategy. These hints allow users to override default optimizer behavior to address issues such as inaccurate row estimates, suboptimal scan methods, inappropriate join types, or inefficient join orders. This document describes the different types of hints and their applicable scenarios.

:::info
Apache Cloudberry currently does not support hints for controlling Motion operators.
:::

## Quick example

:::info
To enable query plan hints, you must first load the relevant module in the psql session:

```sql
LOAD 'pg_hint_plan';
```

You can also configure the database or user to load the module automatically:

```sql
ALTER DATABASE a_database SET session_preload_libraries='pg_hint_plan';
ALTER USER a_user SET session_preload_libraries='pg_hint_plan';
```
:::

```sql
CREATE TABLE foo(a int);
CREATE INDEX ON foo(a);
INSERT INTO foo SELECT i FROM generate_series(1, 100000)i;

LOAD 'pg_hint_plan';
SHOW pg_hint_plan.enable_hint;
pg_hint_plan.enable_hint
--------------------------
on
(1 row)

EXPLAIN SELECT count(*) FROM foo WHERE a > 6;
                                    QUERY PLAN
--------------------------------------------------------------------------------------
Finalize Aggregate  (cost=537.05..537.06 rows=1 width=8)
   ->  Gather Motion 3:1  (slice1; segments: 3)  (cost=536.99..537.04 rows=3 width=8)
         ->  Partial Aggregate  (cost=536.99..537.00 rows=1 width=8)
               ->  Seq Scan on foo  (cost=0.00..453.67 rows=33330 width=0)
                     Filter: (a > 6)
Optimizer: Postgres-based planner
(6 rows)

/*+ IndexScan(foo foo_a_idx) */
EXPLAIN SELECT count(*) FROM foo WHERE a > 6;
                                       QUERY PLAN
---------------------------------------------------------------------------------------------
Finalize Aggregate  (cost=809.00..809.01 rows=1 width=8)
   ->  Gather Motion 3:1  (slice1; segments: 3)  (cost=808.94..808.99 rows=3 width=8)
         ->  Partial Aggregate  (cost=808.94..808.95 rows=1 width=8)
               ->  Index Scan using foo_a_idx on foo  (cost=0.17..725.61 rows=33330 width=0)
                     Index Cond: (a > 6)
Optimizer: Postgres-based planner
(6 rows)
```

You can also specify multiple hints at the same time, such as controlling scan methods and row estimates:

```sql
/*+ IndexScan(t1 my_index) Rows(t1 t2 #1000) */
SELECT * FROM t1 JOIN t2 ON t1.a = t2.a WHERE t1.a < 100;
```

## Cardinality hints

When the optimizer inaccurately estimates the number of rows for join operations, it may choose inefficient plans—such as using Broadcast instead of Redistribute, or preferring Merge Join over Hash Join incorrectly. Cardinality hints allow you to adjust the estimated number of rows for specific operations. This is especially useful when statistics are missing or outdated.

Examples:

```sql
/*+ Rows(t1 t2 t3 #42) */ SELECT * FROM t1, t2, t3;  -- set row estimate to 42
/*+ Rows(t1 t2 t3 +42) */ SELECT * FROM t1, t2, t3; -- increase original estimate by 42
/*+ Rows(t1 t2 t3 -42) */ SELECT * FROM t1, t2, t3; -- decrease original estimate by 42
/*+ Rows(t1 t2 t3 *42) */ SELECT * FROM t1, t2, t3; -- multiply original estimate by 42
```

:::info
Cardinality hints are currently only effective with the ORCA optimizer. The Postgres optimizer does not recognize them.
:::

## Table access hints

Due to inaccurate statistics or biased cost estimation, the optimizer might choose suboptimal scan strategies. Compared to global configuration parameters (GUCs), table access hints offer finer-grained control over how each table is scanned in a query. You can choose whether to use an index or force a specific index.

Examples:

```sql
/*+ SeqScan(t1) */ SELECT * FROM t1 WHERE t1.a > 42;  -- force sequential scan
/*+ IndexScan(t1 my_index) */ SELECT * FROM t1 WHERE t1.a > 42;  -- force index scan
/*+ IndexOnlyScan(t1) */ SELECT * FROM t1 WHERE t1.a > 42;  -- force index-only scan
/*+ BitmapScan(t1 my_bitmap_index) */ SELECT * FROM t1 WHERE t1.a > 42;  -- force bitmap index scan
```

:::info
Starting from v2.0.0, the ORCA optimizer supports scan method hints such as `IndexScan` and `SeqScan`, and generates plans accordingly. This feature depends on both the ORCA optimizer and the `pg_hint_plan` extension.
:::

## Join type hints

When using a Hash Join, some intermediate results may be spilled to disk, which can affect performance. If a user knows that a specific query would benefit from a Nested Loop Join, they can explicitly specify the join type and the order of inner and outer tables using hints.

Examples:

```sql
/*+ HashJoin(t1 t2) */ SELECT * FROM t1, t2;
/*+ NestLoop(t1 t2) */ SELECT * FROM t1, t2;
/*+ MergeJoin(t1 t2) */ SELECT * FROM t1 FULL JOIN t2 ON t1.a = t2.a;
```

## Join order hints

When the optimizer chooses a suboptimal join order due to missing statistics or inaccurate estimates, you can use the `Leading(...)` hint to specify the join order between tables.

Examples:

```sql
/*+ Leading(t1 t2 t3) */ SELECT * FROM t1, t2, t3;
/*+ Leading(t1 (t3 t2)) */ SELECT * FROM t1, t2, t3;
```

You can also use `Leading(...)` to control join order in queries involving `LEFT OUTER JOIN` or `RIGHT OUTER JOIN`. The following constraints apply:

- The join order in the hint must match the join structure in the original SQL. For example:

    ```sql
    SELECT * FROM t1 LEFT JOIN t2 ON t1.a = t2.a;
    ```

    The hint `/*+ Leading((t1 t2)) */` preserves the left join. The hint `/*+ Leading((t2 t1)) */` transforms it into a right join (semantically equivalent but generates a different plan).

- For nested outer joins, you must specify the hint in the same semantic nesting order;

- Changing join direction is not supported for non-equality join conditions (e.g. `t1.a > t2.a`), as it would break the query semantics.

    Example: The following hint instructs the optimizer to first join `t3` with the result of `t2` joined to `t1`:

    ```sql
    /*+ Leading((t3 (t2 t1))) */
    SELECT * FROM t1 LEFT JOIN t2 ON t1.a = t2.a LEFT JOIN t3 ON t2.b = t3.b;
    ```

## Supported scope and limitations

- Query plan hints rely on the `pg_hint_plan` extension, which must be explicitly loaded.
- Hints for controlling data redistribution strategies are not yet supported.

## Best practices for using query plan hints

When using hints, follow these best practices:

- Focus on solving specific issues, such as inaccurate row estimates, suboptimal scan methods, or inefficient join types or join orders.
- Test thoroughly before deployment to ensure that the hint improves performance and reduces resource usage.
- Use hints as a temporary measure. They are intended for short-term tuning and should be reviewed and adjusted as data changes.
- Avoid conflicts with GUC settings. If a GUC disables a feature (such as `IndexScan`) that a hint tries to enable, the hint will be ignored. Make sure global settings align with your hints.

:::info
`pg_hint_plan` allows you to include GUC settings directly in hints. For example:

```sql
/*+ SeqScan(mytable) optimizer_enable_seqscan=on *//*Set(enable_indexscan off)*/
EXPLAIN (COSTS false) SELECT * FROM t1, t2 WHERE t1.id = t2.id;
```
:::
