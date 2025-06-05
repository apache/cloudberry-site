---
title: GROUP BY 和 HAVING 子句
---

# GROUP BY 和 HAVING 子句

在通过 `WHERE` 子句过滤后，查询结果可能会通过 `GROUP BY` 子句进行分组，并通过 `HAVING` 子句进一步筛选分组行。

```sql
SELECT select_list
    FROM ...
    [WHERE ...]
    GROUP BY grouping_column_reference [, grouping_column_reference]...
```

`GROUP BY` 子句用于将表中在指定列上具有相同值的行分组。列的顺序不会影响分组结果。它的作用是将具有相同值的多行合并为一组，并以一行表示整个组。这常用于去除重复或对每个分组进行聚合计算。例如：

```sql
=> SELECT * FROM test1;
 x | y
---+---
 a | 3
 c | 2
 b | 5
 a | 1
(4 rows)

=> SELECT x FROM test1 GROUP BY x;
 x
---
 a
 b
 c
(3 rows)
```

在第二个查询中，不能写成 `SELECT * FROM test1 GROUP BY x`，因为 `y` 列在每个分组中没有唯一值，无法确定其结果。分组列可以出现在 `SELECT` 列表中，因为它们在每个分组中是唯一的。

一般来说，如果对表进行了分组，`GROUP BY` 中未列出的列不能直接引用，除非作为聚合表达式的一部分。以下是一个包含聚合表达式的示例：

```sql
=> SELECT x, sum(y) FROM test1 GROUP BY x;
 x | sum
---+-----
 a |   4
 b |   5
 c |   2
(3 rows)
```

这里的 `sum` 是一个聚合函数，它对每个分组内的所有值进行求和，返回单个结果。

:::tip 提示
如果在不使用聚合函数的情况下进行分组，其效果等同于对列求唯一值集合。这也可以通过 `DISTINCT` 子句实现。
:::

再来看一个示例，它统计每种产品的总销售额（而不是所有产品的总销售额）：

```sql
SELECT product_id, p.name, (sum(s.units) * p.price) AS sales
    FROM products p LEFT JOIN sales s USING (product_id)
    GROUP BY product_id, p.name, p.price;
```

在这个例子中，`product_id`、`p.name` 和 `p.price` 必须包含在 `GROUP BY` 子句中，因为它们出现在 `SELECT` 列表中（但见下文说明）。`s.units` 列不需要出现在 `GROUP BY` 中，因为它仅用于聚合函数 `sum(...)` 中，表示每种产品的销量。查询的返回结果是一张按产品分组的汇总表，每行表示一种产品的销售情况。

如果 `products` 表定义了 `product_id` 为主键，那么在上面的示例中，仅按 `product_id` 分组就足够了，因为 `name` 和 `price` 会函数式地依赖于 `product_id`，每个分组内的 `name` 和 `price` 都是唯一的，不存在歧义。

在标准 SQL 中，`GROUP BY` 只能按照原始表中的列分组，而 Apache Cloudberry 扩展了这一点，允许按 `SELECT` 列表中的列进行分组。也可以使用值表达式进行分组，而不必局限于简单的列名。

如果表已经通过 `GROUP BY` 子句完成了分组，但只关心其中一部分分组，可以使用 `HAVING` 子句进一步筛选分组，就像使用 `WHERE` 子句筛选行一样。语法如下：

```sql
SELECT select_list FROM ... [WHERE ...] GROUP BY ... HAVING boolean_expression
```

`HAVING` 子句中的表达式既可以引用分组列，也可以引用未分组列（通常是聚合表达式）。

示例：

```sql
=> SELECT x, sum(y) FROM test1 GROUP BY x HAVING sum(y) > 3;
 x | sum
---+-----
 a |   4
 b |   5
(2 rows)

=> SELECT x, sum(y) FROM test1 GROUP BY x HAVING x < 'c';
 x | sum
---+-----
 a |   4
 b |   5
(2 rows)
```

再来看一个更贴近实际场景的示例：

```sql
SELECT product_id, p.name, (sum(s.units) * (p.price - p.cost)) AS profit
    FROM products p LEFT JOIN sales s USING (product_id)
    WHERE s.date > CURRENT_DATE - INTERVAL '4 weeks'
    GROUP BY product_id, p.name, p.price, p.cost
    HAVING sum(p.price * s.units) > 5000;
```

在这个例子中，`WHERE` 子句按销售日期过滤了非最近四周的记录（这个列未参与分组），而 `HAVING` 子句则筛选总销售额大于 5000 的产品。注意：聚合表达式在不同位置不需要完全一致。

如果查询中包含聚合函数调用，但没有 `GROUP BY` 子句，系统仍会进行分组：其结果是一个单一分组行（或者如果该行被 `HAVING` 筛掉了，则无任何输出）。即使没有聚合函数，只要有 `HAVING` 子句，同样也会发生分组。
