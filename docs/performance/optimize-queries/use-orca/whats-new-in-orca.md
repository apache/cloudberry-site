---
title: GPORCA Optimizer Update Notes
---

# GPORCA Optimizer Update Notes

This document describes feature enhancements and behavioral changes to the GPORCA optimizer in each version of Apache Cloudberry.

## v2.0.0

Starting from v2.0.0, the GPORCA optimizer includes the following new features and improvements:

- In addition to previously supported index-only scans on B-tree indexes, GPORCA now supports index-only scans on more index types. Specifically:

    - Index-only scans are now supported on AO tables and PAX tables.
    - PostgreSQL-style `INCLUDE` columns are supported, enabling the creation of covering indexes on AO and PAX tables to improve performance in repeated-read workloads.

- GPORCA can now automatically choose backward index scans based on the sort direction of a query. This applies to both regular and index-only scans. This optimization reduces the need for `Sort` nodes and can improve performance in certain top-N queries.

- Support has been added for pushing down `ScalarArrayOp` predicates (e.g., `col IN (...)` or `col = ANY(array)`) to index paths, including:

    - B-tree or hash indexes;
    - Index Scan or Bitmap Index Scan paths.

    The optimizer decides whether to use a Bitmap scan based on cost estimation. In low-selectivity cases, it may still fall back to sequential scan. Note that `ScalarArrayOp` pushdown only applies to the leading column of an index, and not to non-leading columns in composite indexes. 

    Example:

    ```sql
    CREATE INDEX idx ON t(col1, col2);
    SELECT * FROM t WHERE col1 = ANY('{1,2,3}');  -- Pushdown supported
    SELECT * FROM t WHERE col2 = ANY('{1,2,3}');  -- No pushdown, used as filter only
    ```

- Support for `FULL JOIN` has been added, using the `Hash Full Join` execution strategy. This implementation does not require sorting of join keys and is well-suited for large datasets, high-cardinality join keys, or mismatched distribution keys.

    `Merge Full Join` is not currently supported, so all `FULL JOIN` queries use `Hash Full Join`.

    Compared to traditional `Merge Join`, `Hash Full Join` offers the following advantages:

    - No sorting required on join keys;
    - Reduced data movement (Motion) overhead;
    - Potentially better performance when join keys are highly skewed or have high cardinality.

    Example:

    ```sql
    EXPLAIN SELECT * FROM t1 FULL JOIN t2 ON t1.id = t2.id;
    ```

    Might produce the following plan:

    ```sql
    Hash Full Join
    Hash Cond: t1.id = t2.id
    ...
    ```

- GPORCA introduces a query rewrite rule that pushes `JOIN` operations below each branch of a `UNION ALL`. When enabled, the optimizer may rewrite a `JOIN` over a `UNION ALL` into multiple smaller joins. This can significantly improve performance by:

    - Converting a large join over a `UNION ALL` into multiple smaller joins.
    - Allowing each sub-join to use indexes independently, reducing Motion and `Hash Join` overhead.
    - Pushing the `JOIN` to either the left or right side of the `UNION ALL`, enabling more flexible query structures.

    This optimization is disabled by default. You can enable it with the following GUC:

    ```sql
    SET optimizer_enable_push_join_below_union_all = on;
    ```

    The following example shows how the optimizer pushes the `JOIN` below each `UNION ALL` branch when the optimization is enabled:

    ```sql
    -- Creates test tables
    CREATE TABLE dist_small_1(c1 int);
    INSERT INTO dist_small_1 SELECT generate_series(1, 1000);
    CREATE INDEX dist_small_1_index ON dist_small_1 USING btree (c1);
    ANALYZE dist_small_1;

    CREATE TABLE dist_small_2(c1 int);
    INSERT INTO dist_small_2 SELECT generate_series(1, 1000);
    ANALYZE dist_small_2;

    CREATE TABLE inner_1(cc int);
    INSERT INTO inner_1 VALUES(1);
    ANALYZE inner_1;

    -- Creates a view
    CREATE VIEW dist_view_small AS
    SELECT c1 FROM dist_small_1
    UNION ALL
    SELECT c1 FROM dist_small_2;

    -- Enables the optimization and run the query
    SET optimizer_enable_push_join_below_union_all = on;
    EXPLAIN ANALYZE
    SELECT c1 FROM dist_view_small JOIN inner_1 ON c1 < cc;
    ```

    The optimizer might produce a plan like the following:

    ```sql
    ->  Append
        ->  Nested Loop
                ...
                ->  Index Scan using dist_small_1_index on dist_small_1
        ->  Nested Loop
                ...
                ->  Seq Scan on dist_small_2
    ```

    This optimization is especially useful for the following types of queries:

    - A `UNION ALL` over large tables joined with a small table.
    - Each branch has indexes that the optimizer can use.
    - The `JOIN` is applied to a view or subquery that contains a `UNION ALL`.

    :::info
    - This optimization does not support `FULL JOIN` or Common Table Expressions (CTEs).
    - It also does not support `JOIN of UNION ALL` or `UNION ALL of JOIN` structures.
    :::

- By default, GPORCA assigns a higher cost to broadcast paths (Broadcast Motion) using the `optimizer_penalize_broadcast_threshold` GUC parameter, to avoid choosing expensive plans when data volumes are large.

    Starting from v2.0.0, for `NOT IN` queries (for example, Left Anti Semi Join, LASJ), broadcast paths are no longer penalized. This prevents the optimizer from concentrating large tables on the coordinator, which can otherwise lead to severe performance issues or even out-of-memory (OOM) errors.

    Allowing broadcast paths helps preserve parallel execution and significantly improves the performance of `NOT IN` queries on large datasets.

    Feature details:

    - Applies only to `NOT IN` queries (LASJ).
    - Ignores the setting of `optimizer_penalize_broadcast_threshold`.
    - The penalty strategy remains in place for other types of joins (such as `IN` or `EXISTS`).

    Example:

    ```sql
    SELECT * FROM foo WHERE a NOT IN (SELECT a FROM bar);
    ```

    Sample query plan:

    ```sql
    Gather Motion 2:1
    -> Hash Left Anti Semi (Not-In) Join
        -> Seq Scan on foo
        -> Broadcast Motion
                -> Seq Scan on bar
    ```

- GPORCA now supports index-only scans inside common table expressions (CTEs). In the example below, the CTE query can trigger an index-only scan:

    ```sql
    CREATE TABLE t(a int, b int);
    CREATE INDEX i ON t(a);
    INSERT INTO t SELECT i, i+i FROM generate_series(1, 10)i;
    VACUUM ANALYZE t;

    EXPLAIN WITH cte AS (SELECT a FROM t WHERE a > 42) SELECT * FROM cte;
    ```

### Optimization for self-joins with multiple outer joins

Starting from v2.0.0, GPORCA can identify specific patterns involving multiple outer joins and skip unnecessary Redistribute Motion operations to improve execution efficiency:

- The query contains multiple LEFT OUTER JOIN or RIGHT OUTER JOIN operations.
- All joined tables are aliases of the same base table.
- The join conditions are symmetric (e.g., `t1.a = t2.a`).
- All tables use the same distribution key and satisfy locality constraints.

Example:

```sql
CREATE TABLE o1 (a1 int, b1 int) DISTRIBUTED BY (a1);

EXPLAIN (COSTS OFF)
SELECT * FROM (SELECT DISTINCT a1 FROM o1) t1
             LEFT OUTER JOIN o1 t2 ON t1.a1 = t2.a1
             LEFT OUTER JOIN o1 t3 ON t2.a1 = t3.a1;
```

In earlier versions, this query would insert Redistribute Motion between each join level. Starting from v2.0.0, GPORCA can detect this multi-level self-join pattern and avoid unnecessary data redistribution, improving overall query performance.
