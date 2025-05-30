---
title: 聚合表达式查询
---

# 聚合表达式查询

聚合表达式用于对查询返回的多行数据应用聚合函数。聚合函数对一组值进行计算，并返回一个单一结果，比如求和或平均值。聚合表达式的语法如下几种形式：

- `aggregate_name(expression [ , ... ] ) [ FILTER ( WHERE filter_clause ) ]` —— 对所有非 null 的输入行执行聚合运算。`ALL` 是默认行为。
- `aggregate_name(ALL expression [ , ... ] ) [ FILTER ( WHERE filter_clause ) ]` —— 与第一种形式等效，因为默认就是 `ALL`。
- `aggregate_name(DISTINCT expression [ , ... ] ) [ FILTER ( WHERE filter_clause ) ]` —— 只对所有不重复的非 null 输入值进行聚合运算。
- `aggregate_name(*) [ FILTER ( WHERE filter_clause ) ]` —— 对所有行（无论是否为 null）执行聚合，通常用于 `count(*)`。

其中，`aggregate_name` 是已定义的聚合函数（可带 schema 限定），`expression` 是任意非聚合的值表达式。

例如：

- `count(*)` 返回所有输入行的数量；
- `count(f1)` 返回 `f1` 不为 null 的行数；
- `count(distinct f1)` 返回 `f1` 中不重复的非 null 值数量。

如果指定了 `FILTER`，只有满足 `filter_clause` 条件的行才会参与聚合计算，其他行将被忽略。例如：

```sql
SELECT
    count(*) AS unfiltered,
    count(*) FILTER (WHERE i < 5) AS filtered
FROM generate_series(1,10) AS s(i);
 unfiltered | filtered
------------+----------
         10 |        4
(1 row)
```

你也可以定义自定义聚合函数。

Apache Cloudberry 提供了 `MEDIAN` 聚合函数，用于返回 `PERCENTILE_CONT` 的第 50 百分位结果，并支持如下逆分布函数聚合表达式：

```sql
PERCENTILE_CONT(<percentage>) WITHIN GROUP (ORDER BY <expression>)
```

```sql
PERCENTILE_DISC(<percentage>) WITHIN GROUP (ORDER BY <expression>)
```

目前，只有这两个表达式可以与 `WITHIN GROUP` 一起使用。

#### 聚合表达式的限制

目前聚合表达式存在以下限制：

- 不支持 `ALL`、`DISTINCT` 和 `OVER` 等关键字。
- 聚合表达式只能出现在 `SELECT` 语句的结果列或 `HAVING` 子句中，不能出现在 `WHERE` 等其他子句中，因为这些子句在逻辑上会早于聚合结果的生成进行求值。此限制适用于聚合所在的查询层级。
- 当聚合表达式出现在子查询中时，通常会对子查询的结果行执行聚合。如果聚合函数的参数（以及可选的 `filter_clause`）只引用外层查询的变量，那么该聚合属于最近的外层查询，并在该查询的所有结果行上计算。此时该聚合表达式在子查询中相当于一个外部引用，在子查询执行过程中表现为一个常量。无论聚合在哪个查询层级中，这条“只能出现在结果列或 HAVING 子句中”的限制依然有效。
- 不支持将一个聚合函数作为另一个聚合函数的参数。
- 不支持将窗口函数作为聚合函数的参数。
