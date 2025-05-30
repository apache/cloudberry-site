---
title: 表别名和列别名
---

# 表别名和列别名

可以为表或复杂的表引用设置一个临时名称，用于在查询的其他部分引用这个派生表。这种临时名称称为表别名。

创建表别名的语法如下：

```sql
FROM table_reference AS alias
```

或

```sql
FROM table_reference alias
```

关键字 `AS` 是可选的，可省略。`alias` 可以是任意标识符。

使用表别名的常见场景是为较长的表名指定较短的标识符，从而提高 `JOIN` 子句的可读性。例如：

```sql
SELECT * FROM some_very_long_table_name s JOIN another_fairly_long_name a ON s.id = a.num;
```

在当前查询中，表别名会替代原表名。也就是说，在使用了别名后，不能再用原表名引用该表。例如，下面的写法是错误的：

```sql
SELECT * FROM my_table AS m WHERE my_table.a > 5;    -- 错误
```

虽然表别名主要是为了简化书写，但当一个表需要和自身进行连接时，就必须使用别名。例如：

```sql
SELECT * FROM people AS mother JOIN people AS child ON mother.id = child.mother_id;
```

另外，如果表引用是一个子查询，也必须使用别名。

括号用于消除歧义。如下示例中，第一条语句为第二个 `my_table` 实例设置了别名 b；而第二条语句是将整个 JOIN 结果赋予了别名 b：

```sql
SELECT * FROM my_table AS a CROSS JOIN my_table AS b ...
SELECT * FROM (my_table AS a CROSS JOIN my_table) AS b ...
```

还有一种表别名的语法形式，可以同时为表和其列指定临时名称：

```sql
FROM table_reference [AS] alias ( column1 [, column2 [, ...]] )
```

如果指定的列别名少于表中的实际列数，则剩余的列名保持不变。这种写法在处理自连接或子查询时特别有用。

如果为 `JOIN` 子句的结果指定了别名，该别名会隐藏 `JOIN` 内部的所有原始表名。例如，以下语句是合法的：

```sql
SELECT a.* FROM my_table AS a JOIN your_table AS b ON ...
```

但以下写法则不合法：

```sql
SELECT a.* FROM (my_table AS a JOIN your_table AS b ON ...) AS c
```

因为别名 a 被包含在别名 `c` 中，不再对外可见。
