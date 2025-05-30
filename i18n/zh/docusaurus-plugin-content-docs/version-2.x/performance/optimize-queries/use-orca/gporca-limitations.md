---
title: GPORCA 的限制
---

# GPORCA 的限制

在 Apache Cloudberry 中使用默认的 GPORCA 优化器时存在一些限制。由于 GPORCA 并不支持 Apache Cloudberry 的所有功能，因此当前与基于 Postgres 的优化器共存。

本节将介绍这些限制。

- [不支持的 SQL 查询功能](#不支持的-sql-查询功能)
- [性能回退](#性能回退)

## 不支持的 SQL 查询功能

默认的 GPORCA 优化器不支持某些查询功能。当运行不受支持的查询时，Cloudberry 会记录一条日志提示，并附带查询语句：

```
Falling back to Postgres-based planner because GPORCA does not support the following feature: UTILITY command
```

在启用 GPORCA（默认启用）时，以下功能不受支持：

- SP-GiST 索引方法。GPORCA 仅支持 B-tree、位图、GIN 和 GiST 索引。对于不受支持的方法创建的索引，GPORCA 会忽略。
- `SELECT` 语句中的 `TABLESAMPLE` 子句。
- 在 `SELECT` 语句的 `FROM` 子句中函数调用所使用的可选子句 `WITH ORDINALITY`。
- 多级分区表。
- 非等距分区表。
- SortMergeJoin（SMJ）连接。
- 有序聚合（Ordered aggregation）。
- 带多个参数的 `DISTINCT` 聚合函数，例如 `SELECT corr(DISTINCT a, b) FROM tbl1;`。
- 在产生 NULL 的分组集定义中使用重复别名的多分组集（grouping sets）。这类查询会回退到基于 Postgres 的优化器，除非你显式地将别名转换为独立的变量，如以下示例所示：

    ```sql
    CREATE TEMP TABLE tempt AS SELECT i AS ai1, i AS ai2 FROM generate_series(1, 3)i;
    SELECT ai1, ai2 FROM tempt GROUP BY ai2, ROLLUP(ai1) ORDER BY ai1, ai2;
    ```

- 以下标量运算符：
    - ROW
    - ROWCOMPARE
    - FIELDSELECT
- 以集合运算符作为输入参数的聚合函数。
- 多个带 `DISTINCT` 修饰的聚合函数（Multiple Distinct Qualified Aggregates），例如 `SELECT count(DISTINCT a), sum(DISTINCT b) FROM foo`，默认不受支持。可以通过配置参数 `optimizer_enable_multiple_distinct_aggs` 启用。
- `percentile_*` 窗口函数（有序集合聚合函数）。
- 反分布函数（Inverse distribution functions）。
- 执行定义了 `ON COORDINATOR` 或 `ON ALL SEGMENTS` 属性的函数的查询。
- 查询中包含元数据名称（如表名）中使用 UNICODE 字符，且该字符与主机系统的本地语言环境不兼容。
- 在表名前使用 `ONLY` 限定词的 `SELECT`、`UPDATE` 和 `DELETE` 语句。
- 按列排序规则（per-column collation）。GPORCA 仅在查询中的所有列使用相同排序规则时才支持排序规则。如果查询中使用了不同的排序规则，Cloudberry 会自动回退使用 Postgres 优化器。
- 针对外部表执行的 DML 操作以及 `COPY ... FROM` 操作。

## 性能回退

启用 GPORCA 时，以下特性已知可能会导致性能下降：

- 短查询：GPORCA 在执行计划优化上增加了额外处理，对于运行时间较短的查询，这种额外开销可能带来性能负担。
- ANALYZE：在 GPORCA 中，`ANALYZE` 命令会为分区表生成根分区统计信息；而使用 Postgres 优化器则不会生成这些统计信息。
- DML 操作：GPORCA 增强了对分区键和分布键更新操作的支持，这可能会引入额外开销。

此外，某些特性在新版本中功能增强，这也可能导致 GPORCA 执行这些 SQL 语句时耗时增加。
