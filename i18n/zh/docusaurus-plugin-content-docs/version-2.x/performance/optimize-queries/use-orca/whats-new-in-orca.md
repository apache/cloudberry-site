---
title: GPORCA 优化器更新说明
---

# GPORCA 优化器更新说明

本文档介绍了 Apache Cloudberry 各版本中 GPORCA 优化器的功能增强与行为变更。

## v2.0.0

从 v2.0.0 起，GPORCA 优化器新增或改进了以下功能：

- 除了原本支持 B-tree 索引的仅索引扫描（Index-Only Scan），GPORCA 还扩展支持更多类型的索引，具体包括：

    - 支持在 AO 表和 PAX 表上执行仅索引扫描。
    - 支持 PostgreSQL 风格的 `INCLUDE` 列，可在 AO 表和 PAX 表上构建覆盖索引（covering index），以提升重复访问场景的查询性能。

- GPORCA 可以根据查询中的排序方向自动选择是否使用倒序索引扫描（Backward IndexScan），适用于普通索引扫描和仅索引扫描。这项优化减少了对 Sort 节点的依赖，有助于提升部分 top-N 查询的性能。

- 支持将 `ScalarArrayOp` 类型的谓词（例如 `col IN (...)` 或 `col = ANY(array)`）下推至索引路径，包括：

    - B-tree 索引或 Hash 索引；
    - Index Scan 或 Bitmap Index Scan 路径。

    优化器会根据代价评估自动决定是否使用 Bitmap 扫描。在某些低选择性的场景下，仍可能回退为顺序扫描（Seq Scan）。需要注意，`ScalarArrayOp` 只能下推到索引的第一列，不能用于复合索引的非首列。示例：

    ```sql
    CREATE INDEX idx ON t(col1, col2);
    SELECT * FROM t WHERE col1 = ANY('{1,2,3}');  -- 支持下推
    SELECT * FROM t WHERE col2 = ANY('{1,2,3}');  -- 不下推，仅作过滤条件
    ```

- 新增对 `FULL JOIN` 的支持，并使用 `Hash Full Join` 进行执行。该实现不依赖连接列的排序，适用于数据量大、连接列基数高或分布键不一致的情况。

    当前尚未支持 `Merge Full Join` 路径，因此所有 `FULL JOIN` 查询均使用 `Hash Full Join` 执行。

    与传统 `Merge Join` 相比，`Hash Full Join` 的优势包括：

    - 无需对连接列排序；
    - 可减少 Motion 的数据传输开销；
    - 在连接列分布不均或基数较高的情况下可能具备更好性能。

    示例：

    ```sql
    EXPLAIN SELECT * FROM t1 FULL JOIN t2 ON t1.id = t2.id;
    ```

    可能生成如下计划：

    ```sql
    Hash Full Join
    Hash Cond: t1.id = t2.id
    ...
    ```

    - GPORCA 引入一项查询重写规则，可将 `JOIN` 操作下推到 `UNION ALL` 的每个分支。启用该优化后，优化器可能将 `JOIN` 操作分解为多个子查询，从而带来以下性能提升：

    - 支持将 `UNION ALL` 产生的大表 join 转换为多个小表 join。
    - 每个子 join 可独立使用索引，减少 Motion 和 `Hash Join` 开销。
    - `JOIN` 可以下推到 `UNION ALL` 的左侧或右侧，适用于更多查询结构。

    默认该优化未启用。可通过以下 GUC 参数显式开启：

    ```sql
    SET optimizer_enable_push_join_below_union_all = on;
    ```

    以下示例展示了开启该优化后，优化器如何将 `JOIN` 下推到 `UNION ALL` 分支：

    ```sql
    -- 创建测试表
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

    -- 创建视图
    CREATE VIEW dist_view_small AS
    SELECT c1 FROM dist_small_1
    UNION ALL
    SELECT c1 FROM dist_small_2;

    -- 启用优化并执行查询
    SET optimizer_enable_push_join_below_union_all = on;
    EXPLAIN ANALYZE
    SELECT c1 FROM dist_view_small JOIN inner_1 ON c1 < cc;
    ```

    优化器可能生成如下执行计划：

    ```sql
    ->  Append
            ->  Nested Loop
                ...
                ->  Index Scan using dist_small_1_index on dist_small_1
            ->  Nested Loop
                ...
                ->  Seq Scan on dist_small_2
    ```

    该优化适用于以下类型的查询结构：

    - 多张大表通过 `UNION ALL` 聚合，并与小表 join。
    - 各分支具备索引可用。
    - 查询结构中 join 一侧为视图或 `UNION ALL` 子查询。

    :::info 注意
    - 当前该优化不支持 `FULL JOIN` 和公共表达式（CTE）。
    - 对于 `JOIN of UNION ALL` 与 `UNION ALL of JOIN` 的结构也暂不支持。
    :::

- 默认情况下，GPORCA 会根据 GUC 参数 `optimizer_penalize_broadcast_threshold` 为广播路径（Broadcast Motion）设置较高代价，防止在数据量较大时选出代价过高的计划。

    从 v2.0.0 起，对于 `NOT IN` 类型的查询（即 Left Anti Semi Join, LASJ），不再对广播路径进行惩罚。该优化可避免优化器在某些情况下将大表集中到主节点（Coordinator）执行，从而引发严重的性能问题甚至内存溢出（OOM）。

    允许使用广播路径可以保留并行执行，显著提升 `NOT IN` 查询在大数据量下的执行效率。

    特性说明：

    - 仅影响 `NOT IN` 查询（LASJ）；
    - 忽略 `optimizer_penalize_broadcast_threshold` 的设置；
    - 对于其他类型的 Join（如 `IN` 或 `EXISTS`）仍保留惩罚策略。

    示例：

    ```sql
    SELECT * FROM foo WHERE a NOT IN (SELECT a FROM bar);
    ```

    查询计划示例：

    ```sql
    Gather Motion 2:1
    -> Hash Left Anti Semi (Not-In) Join
        -> Seq Scan on foo
        -> Broadcast Motion
                -> Seq Scan on bar
    ```

- GPORCA 现已支持在公用表达式（CTE）中执行仅索引扫描（Index-Only Scan）。以下示例中，CTE 查询可以触发仅索引扫描：

    ```sql
    CREATE TABLE t(a int, b int);
    CREATE INDEX i ON t(a);
    INSERT INTO t SELECT i, i+i FROM generate_series(1, 10)i;
    VACUUM ANALYZE t;

    EXPLAIN WITH cte AS (SELECT a FROM t WHERE a > 42) SELECT * FROM cte;
    ```

### 多层外连接的自连接优化

从 v2.0.0 起，GPORCA 可以识别某些特定模式的多层外连接，并跳过不必要的 Redistribute Motion，以提升执行效率：

- 查询结构中存在多个左外连接（LEFT OUTER JOIN）或右外连接（RIGHT OUTER JOIN）。
- 所有参与 Join 的表均为同一基表的别名。
- Join 条件为对称条件（如 `t1.a = t2.a`）。
- 所有表使用相同的分布键，且数据分布满足本地性要求。

示例：

```sql
CREATE TABLE o1 (a1 int, b1 int) DISTRIBUTED BY (a1);

EXPLAIN (COSTS OFF)
SELECT * FROM (SELECT DISTINCT a1 FROM o1) t1
             LEFT OUTER JOIN o1 t2 ON t1.a1 = t2.a1
             LEFT OUTER JOIN o1 t3 ON t2.a1 = t3.a1;
```

在早期版本中，该查询会在每层 Join 之间插入 Redistribute Motion。从 v2.0.0 起，GPORCA 可以识别这种多层自连接结构，并避免多余的数据重分布，从而提升整体查询性能。
