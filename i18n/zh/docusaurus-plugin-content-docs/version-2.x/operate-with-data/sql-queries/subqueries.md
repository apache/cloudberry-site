---
title: 子查询
---

# 子查询

子查询允许在一个查询中嵌套另一个查询，使得在定义查询时可以实现更灵活的动态逻辑与条件逻辑。子查询常用于过滤、计算中间值或表达相关关系。

本文区分了标量子查询与相关子查询，并提供了有效使用它们的建议。

标量子查询是括号括起来的 `SELECT` 查询，必须返回**一行一列**。不能将返回多行或多列的查询用于标量子查询中。查询执行后会将结果值作为周围值表达式的一部分使用。相关标量子查询则包含对外层查询块的引用。

## 相关子查询

相关子查询（Correlated Subquery，简称 CSQ）是在 `SELECT` 查询的 `WHERE` 子句或目标列中引用外层查询字段的查询。它能根据外层查询结果动态生成内部查询结果，从而有效表达查询之间的关联逻辑。Apache Cloudberry 支持相关子查询，确保兼容多种应用程序的查询需求。CSQ 可以是标量子查询或表子查询，具体取决于返回的是一行还是多行。

Apache Cloudberry 不支持跨越多个层级的相关引用（skip-level correlation）。

## 相关子查询示例

### 示例 1 – 标量相关子查询

```sql
SELECT * FROM t1 WHERE t1.x 
            > (SELECT MAX(t2.x) FROM t2 WHERE t2.y = t1.y);
```

### 示例 2 – 使用 EXISTS 的相关子查询

```sql
SELECT * FROM t1 WHERE 
EXISTS (SELECT 1 FROM t2 WHERE t2.x = t1.x);
```

Apache Cloudberry 执行相关子查询时通常采用以下两种方式之一：

- **将相关子查询转换为连接操作（Unnest）**：这是最高效的方式，Apache Cloudberry 在大多数场景（例如 TPC-H 基准测试）中都使用此方式。
- **对外层查询的每一行执行一次子查询**：这种方式性能较差，适用于出现在 `SELECT` 列表中或被 `OR` 条件连接的相关子查询。

下列示例展示了如何重写部分相关子查询，以提升查询性能。

### 示例 3 - 出现在 SELECT 列表中的相关子查询

*原始查询*

```sql
SELECT T1.a,
      (SELECT COUNT(DISTINCT T2.z) FROM t2 WHERE t1.x = t2.y) dt2 
FROM t1;
```

可重写为：先将 `t1` 与 `t2` 执行等值连接，再进行左连接。此重写方法仅适用于相关条件为等值连接的场景。

*重写后的查询*

```sql
SELECT t1.a, dt2 FROM t1 
       LEFT JOIN 
        (SELECT t2.y AS csq_y, COUNT(DISTINCT t2.z) AS dt2 
              FROM t1, t2 WHERE t1.x = t2.y 
              GROUP BY t1.x) 
       ON (t1.x = csq_y);
```

### 示例 4 - 通过 OR 条件连接的相关子查询（CSQ）

*原始查询*

```sql
SELECT * FROM t1 
WHERE 
x > (SELECT COUNT(*) FROM t2 WHERE t1.x = t2.x) 
OR x < (SELECT COUNT(*) FROM t3 WHERE t1.y = t3.y)
```

可以将该查询重写为两个子查询的联合，以分别处理 `OR` 条件。

*重写后的查询*

```sql
SELECT * FROM t1 
WHERE x > (SELECT count(*) FROM t2 WHERE t1.x = t2.x) 
UNION 
SELECT * FROM t1 
WHERE x < (SELECT count(*) FROM t3 WHERE t1.y = t3.y)
```

如果需要查看查询执行计划，可以使用 `EXPLAIN SELECT` 或 `EXPLAIN ANALYZE SELECT`。执行计划中的 Subplan 节点表明该子查询会对外层查询的每一行都执行一次，这类查询就可以考虑重写。有关这些语句的详细说明，请参见[分析查询性能](../../performance/optimize-queries/analyze-query-performance.md)。
