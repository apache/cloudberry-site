---
title: 执行计划提示
---

# 执行计划提示

Apache Cloudberry 使用两种查询优化器：基于 Postgres 的优化器和 GPORCA。每种优化器都针对特定类型的工作负载进行了优化：

- 基于 Postgres 的优化器：适用于事务型工作负载。
- GPORCA：适用于分析型和混合事务-分析型工作负载。

在处理查询时，优化器会遍历大量等价执行计划的搜索空间，并根据表统计信息和基数估算模型预测每个操作处理的行数。优化器使用成本模型为每个计划分配一个成本值，并选择成本最低的计划作为最终执行计划。

执行计划提示是用户提供给优化器的指令，用于影响查询的执行策略。通过提示，用户可以覆盖优化器的默认行为，从而应对以下问题：行数估算不准确、扫描方式不理想、连接类型选择不当或连接顺序低效。本文将介绍执行计划提示的不同类型及其适用场景。

:::info 提示
Apache Cloudberry 当前不支持控制 Motion 算子的提示。
:::

## 快速示例

:::info 提示
要启用执行计划提示功能，必须先在 psql 会话中加载相关模块：

```sql
LOAD 'pg_hint_plan';
```

也可以在数据库级别或用户级别配置自动加载：

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

也可以同时指定多个提示，例如控制扫描方式和行数估计：

```sql
/*+ IndexScan(t1 my_index) Rows(t1 t2 #1000) */
SELECT * FROM t1 JOIN t2 ON t1.a = t2.a WHERE t1.a < 100;
```

## 基数提示（Cardinality Hints）

当优化器对连接操作的行数估算不准确时，可能会选择效率较差的计划，例如使用 Broadcast 而非 Redistribute，或错误地偏好 Merge Join 而非 Hash Join。基数提示可用于调整特定操作的行数估计值，尤其适用于统计信息缺失或已过期的情况。

示例：

```sql
/*+ Rows(t1 t2 t3 #42) */ SELECT * FROM t1, t2, t3;  -- 设置估计行为 42
/*+ Rows(t1 t2 t3 +42) */ SELECT * FROM t1, t2, t3; -- 原估计值增加 42
/*+ Rows(t1 t2 t3 -42) */ SELECT * FROM t1, t2, t3; -- 原估计值减少 42
/*+ Rows(t1 t2 t3 *42) */ SELECT * FROM t1, t2, t3; -- 原估计值乘以 42
```

:::info 提示
基数提示目前仅在 ORCA 优化器中生效，Postgres 优化器不会识别此类提示。
:::

## 表访问提示（Table Access Hints）

由于统计信息不准或估算成本偏差，优化器可能选择不合理的扫描策略。与全局参数（GUC）相比，表访问提示可更精确地控制查询中各表的扫描方式，包括是否使用索引或强制指定特定索引。

示例：

```sql
/*+ SeqScan(t1) */ SELECT * FROM t1 WHERE t1.a > 42;  -- 强制使用顺序扫描
/*+ IndexScan(t1 my_index) */ SELECT * FROM t1 WHERE t1.a > 42;  -- 强制使用索引扫描
/*+ IndexOnlyScan(t1) */ SELECT * FROM t1 WHERE t1.a > 42;  -- 强制使用仅索引扫描
/*+ BitmapScan(t1 my_bitmap_index) */ SELECT * FROM t1 WHERE t1.a > 42;  -- 强制使用 Bitmap 索引扫描
```

:::info 提示
自 v2.0.0 起，ORCA 优化器支持解析扫描方式提示（如 `IndexScan`、`SeqScan`），并据此构建相应计划。该能力依赖 ORCA 优化器和 `pg_hint_plan` 扩展。
:::

## 连接类型提示（Join Type Hints）

在使用 Hash Join 时，部分中间结果可能被写入磁盘，影响性能。用户若了解特定查询更适合使用 Nested Loop Join，可通过提示明确连接方式和内外表顺序。

示例：

```sql
/*+ HashJoin(t1 t2) */ SELECT * FROM t1, t2;
/*+ NestLoop(t1 t2) */ SELECT * FROM t1, t2;
/*+ MergeJoin(t1 t2) */ SELECT * FROM t1 FULL JOIN t2 ON t1.a = t2.a;
```

## 连接顺序提示（Join Order Hints）

当优化器因统计信息不足或估算偏差选出低效连接顺序时，可使用 `Leading(...)` 提示指定表之间的连接顺序。

示例：

```sql
/*+ Leading(t1 t2 t3) */ SELECT * FROM t1, t2, t3;
/*+ Leading(t1 (t3 t2)) */ SELECT * FROM t1, t2, t3;
```

在涉及左外连接（`LEFT OUTER JOIN`）或右外连接（`RIGHT OUTER JOIN`）的查询中，也可使用 `Leading(...)` 指定连接顺序。使用时应注意以下限制：

- 提示顺序需与原 SQL 中连接结构一致。例如：

    ```sql
    SELECT * FROM t1 LEFT JOIN t2 ON t1.a = t2.a;
    ```

    使用 `/*+ Leading((t1 t2)) */` 表示保留左连接；使用 `/*+ Leading((t2 t1)) */` 则表示将其转换为右连接（语义等价，但计划不同）。

- 多层嵌套外连接时，必须按语义嵌套顺序指定提示；

- 不支持在非等值连接条件（如 `t1.a > t2.a`）下调整连接方向，否则会破坏查询语义。

    示例：以下提示会指示优化器优先将 `t3` 与 `t2-t1` 组合连接：

    ```sql
    /*+ Leading((t3 (t2 t1))) */
    SELECT * FROM t1 LEFT JOIN t2 ON t1.a = t2.a LEFT JOIN t3 ON t2.b = t3.b;
    ```

## 提示支持范围与限制

- 执行计划提示功能依赖 `pg_hint_plan` 扩展模块，需显式加载。
- 暂不支持控制数据重分布策略的提示。

## 执行计划提示的最佳实践

使用提示时建议遵循以下实践原则：

- 聚焦于解决具体问题：如基数估算不准、扫描方式不佳、连接类型或顺序不理想。
- 在上线前充分测试：确保提示确实提升了查询性能并降低了资源开销。
- 仅作为临时手段：提示应用于短期优化，随着数据变化需定期审查和调整。
- 避免与 GUC 冲突：如 GUC 设置与提示矛盾（例如禁用了 IndexScan），提示将被忽略。确保全局配置与提示保持一致。

:::info 提示

`pg_hint_plan` 允许你在提示中指定 GUC。例如：

```sql
/*+ SeqScan(mytable) optimizer_enable_seqscan=on *//*Set(enable_indexscan off)*/
EXPLAIN (COSTS false) SELECT * FROM t1, t2 WHERE t1.id = t2.id;
```
:::
