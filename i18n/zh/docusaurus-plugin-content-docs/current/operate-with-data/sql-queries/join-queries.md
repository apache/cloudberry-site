---
title: 表连接查询
---

# 表连接查询

在 Apache Cloudberry 数据库中，`JOIN` 子句用于合并两个或多个表中的行，基于这些表之间相关列的值。`JOIN` 子句是 `SELECT` 语句中 `FROM` 子句的一部分。

`JOIN` 子句的语法如下：

```sql
table1_name join_type table2_name [join_condition]
```

其中：

- `table1_name`，`table2_name`：要连接的表的名称。
- `join_type`：连接类型，可以是以下之一：
    - `[INNER] JOIN`
    - `LEFT [OUTER] JOIN`
    - `RIGHT [OUTER] JOIN`
    - `FULL [OUTER] JOIN`
    - `CROSS JOIN`
    - `NATURAL JOIN`
- `join_condition`：可选的连接条件，用于指定如何匹配两个表中的行。可以是以下之一：
    - `ON <join_condition>`
    - `USING ( <join_column> [, ...] )`
    - `LATERAL`

:::info 提示
ORCA 优化器在 `FULL JOIN` 查询中自动选择 `Merge Join` 或 `Hash Join`，根据代价估算决定，用户无需手动指定 `JOIN` 类型。
:::

## 连接类型

Apache Cloudberry 数据库支持以下连接类型：

`INNER JOIN` 返回两个表中满足连接条件的行的交集。换句话说，它只返回两个表中匹配的行。如果省略 `JOIN` 关键字前的 `INNER`，则默认为 `INNER JOIN`。

```sql
SELECT *
FROM table1
INNER JOIN table2
ON table1.column_name = table2.column_name;
```

### LEFT OUTER JOIN

`LEFT OUTER JOIN` (或简写为 `LEFT JOIN`) 返回左表中的所有行，以及右表中与左表行匹配的行。如果右表中没有与左表行匹配的行，则右表中的列将填充 `NULL` 值。

```sql
SELECT *
FROM table1
LEFT OUTER JOIN table2
ON table1.column_name = table2.column_name;
```

### RIGHT OUTER JOIN

`RIGHT OUTER JOIN` (或简写为 `RIGHT JOIN`) 与 `LEFT OUTER JOIN` 相反。它返回右表中的所有行，以及左表中与右表行匹配的行。如果左表中没有与右表行匹配的行，则左表中的列将填充 NULL 值。

```sql
SELECT *
FROM table1
RIGHT OUTER JOIN table2
ON table1.column_name = table2.column_name;
```

:::info 提示
从 v2.0.0 起，`Hash Right Join` 查询在满足分区裁剪条件时也可以触发动态分区消除（DPE），进而减少分区扫描，提高性能。
:::

### FULL OUTER JOIN

`FULL OUTER JOIN` (或简写为 `FULL JOIN`) 返回左表和右表中的所有行。对于左表中没有匹配行的右表行，左表中的列将填充 NULL 值。对于右表中没有匹配行的左表行，右表中的列将填充 NULL 值。

```sql
SELECT *
FROM table1
FULL OUTER JOIN table2
ON table1.column_name = table2.column_name;
```

### CROSS JOIN

`CROSS JOIN` 返回两个表的笛卡尔积。它将左表中的每一行与右表中的每一行进行组合。如果没有 `WHERE` 子句来过滤结果，这将产生一个包含左表行数乘以右表行数的表。

```sql
SELECT *
FROM table1
CROSS JOIN table2;
```

### NATURAL JOIN

`NATURAL` 子句是 `USING` 子句的进一步简写形式。当两个表中所有同名的列都用于连接时，可以使用它。如果两个表没有同名的列，则 `NATURAL JOIN` 等同于 `CROSS JOIN`。应谨慎使用 `NATURAL JOIN`，因为它依赖于列名，这可能导致意外的结果。

```sql
SELECT *
FROM table1
NATURAL JOIN table2;
```

## 连接条件

连接条件用于指定如何匹配两个表中的行。可以使用以下三种类型的连接条件：

### ON 子句

`ON` 子句指定一个布尔表达式，该表达式确定两个表中的哪些行被认为是匹配的。它类似于 `WHERE` 子句，但仅应用于 `JOIN` 操作。

```sql
SELECT *
FROM table1
JOIN table2
ON table1.column_name = table2.column_name;
```

### USING 子句

`USING` 子句是 `ON` 子句的简写形式，用于当两个表具有一个或多个同名的列时。它指定要用于连接的公共列。`USING` 子句的结果是，输出中只包含每个等效列中的一个，而不是两个都包含。

```sql
SELECT *
FROM table1
JOIN table2
USING (column_name);
```

## LATERAL

`LATERAL` 关键字可以放在子查询 `FROM` 项之前。 这允许子查询引用出现在 `FROM` 列表中的它之前的 `FROM` 项的列。 （没有 `LATERAL`，Apache Cloudberry 数据库会独立计算每个子查询，因此无法交叉引用任何其他 `FROM` 项。）

## 示例

假设有两张表：`customers` 和 `orders`。

`customers` 表：

```sql
customer_id | customer_name
------------+---------------
1           | John Doe
2           | Jane Smith
3           | Bob Johnson
```

`orders` 表：

```sql
order_id | customer_id | order_date
---------+-------------+------------
1        | 1           | 2023-01-15
2        | 2           | 2023-02-20
3        | 1           | 2023-03-10
4        | 4           | 2024-05-01
```

以下是一些使用不同 `JOIN` 类型的示例：

### INNER JOIN 示例

此查询返回所有客户及其订单，仅包括具有匹配客户 ID 的行。

```sql
SELECT customers.customer_name, orders.order_id
FROM customers
INNER JOIN orders
ON customers.customer_id = orders.customer_id;
```

返回结果：

```sql
customer_name | order_id
--------------+----------
John Doe      | 1
Jane Smith      | 2
John Doe      | 3
```

### LEFT OUTER JOIN 示例

此查询返回所有客户及其订单。即使客户没有订单，也会返回客户信息。

```sql
SELECT customers.customer_name, orders.order_id
FROM customers
LEFT OUTER JOIN orders
ON customers.customer_id = orders.customer_id;
```

结果：

```sql
customer_name | order_id
--------------+----------
John Doe      | 1
Jane Smith      | 2
Bob Johnson     | NULL
John Doe      | 3
```

### RIGHT OUTER JOIN 示例

这个查询返回所有订单和下订单的客户。即使某个订单没有关联的客户，也会返回订单信息。在本例中，`order_id` 为 `4` 的订单没有关联的客户。

```sql
SELECT customers.customer_name, orders.order_id
FROM customers
RIGHT OUTER JOIN orders
ON customers.customer_id = orders.customer_id;
```

返回结果：

```sql
customer_name | order_id
--------------+----------
John Doe      | 1
Jane Smith      | 2
John Doe      | 3
NULL          | 4
```

### FULL OUTER JOIN 示例

此查询返回所有客户和订单。如果某个客户没有订单或某个订单没有客户，则结果中仍会包含该客户或订单的信息。

```sql
SELECT customers.customer_name, orders.order_id
FROM customers
FULL OUTER JOIN orders
ON customers.customer_id = orders.customer_id;
```

结果：

```sql
customer_name | order_id
--------------+----------
John Doe      | 1
Jane Smith      | 2
Bob Johnson     | NULL
John Doe      | 3
NULL          | 4
```

### CROSS JOIN 示例

此查询返回客户表和订单表的笛卡尔积。

```sql
SELECT customers.customer_name, orders.order_id
FROM customers
CROSS JOIN orders;
```

结果（部分显示，总共有 3 \* 4 = 12 行）：

```sql
customer_name | order_id
--------------+----------
John Doe      | 1
John Doe      | 2
John Doe      | 3
John Doe      | 4
Jane Smith      | 1
Jane Smith      | 2
...
```
