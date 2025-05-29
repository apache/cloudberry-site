---
title: WHERE 子句
---

# WHERE 子句

`WHERE` 子句的语法如下：

```sql
WHERE search_condition
```

其中，`search_condition` 是任意返回布尔类型结果的值表达式。

在处理完 `FROM` 子句之后，系统会对派生虚拟表中的每一行评估 `search_condition`。如果条件结果为 `true`，该行将保留在输出表中；否则（即结果为 `false` 或 `null`），该行会被丢弃。通常情况下，`search_condition` 至少会引用 `FROM` 子句中生成的表的一列，虽然这不是强制要求，但如果完全不引用，将失去使用该子句的意义。

:::note 注意
内连接的连接条件既可以写在 `WHERE` 子句中，也可以写在 `JOIN` 子句中。例如，以下三个表表达式等效：

```sql
FROM a, b WHERE a.id = b.id AND b.val > 5
```

```sql
FROM a INNER JOIN b ON (a.id = b.id) WHERE b.val > 5
```

```sql
FROM a NATURAL JOIN b WHERE b.val > 5
```

选择哪种写法主要是风格问题。虽然 `JOIN` 写法符合 SQL 标准，但在不同数据库系统中的可移植性可能不如 `WHERE` 写法。对于外连接（outer join），则必须在 `FROM` 子句中使用 `JOIN`，不能用 `WHERE` 替代。因为 `ON` 或 `USING` 子句不仅决定了哪些行将合并，还决定了哪些行将被保留（例如保留没有匹配的行），这与 `WHERE` 子句仅起过滤作用不同。
:::

下面是一些 `WHERE` 子句的示例：

```sql
SELECT ... FROM fdt WHERE c1 > 5

SELECT ... FROM fdt WHERE c1 IN (1, 2, 3)

SELECT ... FROM fdt WHERE c1 IN (SELECT c1 FROM t2)

SELECT ... FROM fdt WHERE c1 IN (SELECT c3 FROM t2 WHERE c2 = fdt.c1 + 10)

SELECT ... FROM fdt WHERE c1 BETWEEN (SELECT c3 FROM t2 WHERE c2 = fdt.c1 + 10) AND 100

SELECT ... FROM fdt WHERE EXISTS (SELECT c1 FROM t2 WHERE c2 > fdt.c1)
```

这里的 `fdt` 是 `FROM` 子句中派生的表。所有不满足 `WHERE` 条件的行都会从 `fdt` 中被过滤掉。示例中使用了标量子查询作为值表达式。和普通查询一样，子查询可以包含复杂的表表达式。

注意子查询中如何引用外部查询的表 `fdt`。如果 `c1` 在子查询中对应的表中也有同名列，那么就必须写成 `fdt.c1`。即使不强制要求加表名前缀，显式加上通常也能提高可读性。这也说明外部查询的列命名作用域可以延伸至子查询中。
