---
title: Join Queries
---

# Join Queries

In Apache Cloudberry, the `JOIN` clause combines rows from two or more tables based on related column values. The `JOIN` clause is part of the `FROM` clause in a `SELECT` statement.

The syntax for the `JOIN` clause is as follows:

```sql
table1_name join_type table2_name [join_condition]
```

Where:

- `table1_name`, `table2_name`: Names of the tables to be joined.

- `join_type`: The type of join, which can be one of the following:

    - `[INNER] JOIN`
    - `LEFT [OUTER] JOIN`
    - `RIGHT [OUTER] JOIN`
    - `FULL [OUTER] JOIN`
    - `NATURAL JOIN`

- `join_condition`: An optional condition that specifies how to match rows from the two tables. It can take one of the following forms:

    - `ON <join_condition>`
    - `USING ( <join_column> [, ...] )`
    - `LATERAL`

:::info
For `FULL JOIN` queries, the ORCA optimizer automatically chooses between `Merge Join` and `Hash Join` based on cost estimates, so users do not need to manually specify the join method.
:::

## Join types

Apache Cloudberry supports the following types of joins:

`INNER JOIN` returns the intersection of rows from both tables that satisfy the join condition. In other words, it returns only the rows with matching values in both tables. If `INNER` is omitted before `JOIN`, it defaults to `INNER JOIN`.

```sql
SELECT *
FROM table1
INNER JOIN table2
ON table1.column_name = table2.column_name;
```

### LEFT OUTER JOIN

`LEFT OUTER JOIN` (or simply `LEFT JOIN`) returns all rows from the left table and the matching rows from the right table. If there is no match in the right table, the result includes `NULL` values for columns from the right table.

```sql
SELECT *
FROM table1
LEFT OUTER JOIN table2
ON table1.column_name = table2.column_name;
```

### RIGHT OUTER JOIN

`RIGHT OUTER JOIN` (or simply `RIGHT JOIN`) is the opposite of `LEFT OUTER JOIN`. It returns all rows from the right table and the matching rows from the left table. If there is no match in the left table, the result includes `NULL` values for columns from the left table.

```sql
SELECT *
FROM table1
RIGHT OUTER JOIN table2
ON table1.column_name = table2.column_name;
```

:::info
Starting from v2.0.0, `Hash Right Join` queries can also trigger dynamic partition elimination (DPE) when partition pruning conditions are met, reducing partition scans and improving performance.
:::

### FULL OUTER JOIN

`FULL OUTER JOIN` (or simply `FULL JOIN`) returns all rows from both the left and right tables. For unmatched rows in the left table, the right table columns are filled with `NULL`. For unmatched rows in the right table, the left table columns are filled with `NULL`.

```sql
SELECT *
FROM table1
FULL OUTER JOIN table2
ON table1.column_name = table2.column_name;
```

### CROSS JOIN

`CROSS JOIN` returns the Cartesian product of two tables. It combines every row from the left table with every row from the right table. If there is no `WHERE` clause to filter the results, the output will contain the number of rows in the left table multiplied by the number of rows in the right table.

```sql
SELECT *
FROM table1
CROSS JOIN table2;
```

### NATURAL JOIN

The `NATURAL` clause is a further shorthand for the `USING` clause. It is used when all columns with the same names in both tables should be used for the join. If there are no columns with the same names, `NATURAL JOIN` behaves like a `CROSS JOIN`. Use `NATURAL JOIN` with caution, as it relies on column names and may produce unexpected results.

```sql
SELECT *
FROM table1
NATURAL JOIN table2;
```

## Join conditions

Join conditions define how to match rows between two tables. There are three types of join conditions:

### ON clause

The `ON` clause specifies a Boolean expression that determines which rows from the two tables should be considered a match. It works similarly to a `WHERE` clause but is applied specifically to the `JOIN`.

```sql
SELECT *
FROM table1
JOIN table2
ON table1.column_name = table2.column_name;
```

### USING clause

The `USING` clause is a shorthand for the `ON` clause when both tables have one or more columns with the same name. It specifies the common column(s) to be used for the join. The result includes only one instance of each matched column, instead of both.

```sql
SELECT *
FROM table1
JOIN table2
USING (column_name);
```

## LATERAL

The `LATERAL` keyword can be placed before a subquery in the `FROM` clause. It allows the subquery to reference columns from preceding items in the `FROM` list. Without `LATERAL`, Apache Cloudberry evaluates subqueries independently and does not allow references to other `FROM` items.

## Example

Assume there are two tables: `customers` and `orders`.

`customers` table:

```sql
customer_id | customer_name
------------+---------------
1           | John Doe
2           | Jane Smith
3           | Bob Johnson
```

`orders` table:

```sql
order_id | customer_id | order_date
---------+-------------+------------
1        | 1           | 2023-01-15
2        | 2           | 2023-02-20
3        | 1           | 2023-03-10
4        | 4           | 2024-05-01
```

Here are some examples using different `JOIN` types:

### INNER JOIN example

This query returns all customers and their orders, including only rows where the customer ID matches in both tables.

```sql
SELECT customers.customer_name, orders.order_id
FROM customers
INNER JOIN orders
ON customers.customer_id = orders.customer_id;
```

Result:

```sql
customer_name | order_id
--------------+----------
John Doe      | 1
Jane Smith    | 2
John Doe      | 3
```

### LEFT OUTER JOIN example

This query returns all customers along with their orders. Even if a customer has no orders, the customer information will still be included.

```sql
SELECT customers.customer_name, orders.order_id
FROM customers
LEFT OUTER JOIN orders
ON customers.customer_id = orders.customer_id;
```

Result:

```sql
customer_name | order_id
--------------+----------
John Doe      | 1
Jane Smith    | 2
Bob Johnson   | NULL
John Doe      | 3
```

### RIGHT OUTER JOIN example

This query returns all orders along with the customers who placed them. Even if an order has no associated customer, the order will still be included. In this example, the order with `order_id` 4 has no matching customer.

```sql
SELECT customers.customer_name, orders.order_id
FROM customers
RIGHT OUTER JOIN orders
ON customers.customer_id = orders.customer_id;
```

Result:

```sql
customer_name | order_id
--------------+----------
John Doe      | 1
Jane Smith    | 2
John Doe      | 3
NULL          | 4
```

### FULL OUTER JOIN example

This query returns all customers and all orders. If a customer has no orders or an order has no customer, the result will still include that customer or order.

```sql
SELECT customers.customer_name, orders.order_id
FROM customers
FULL OUTER JOIN orders
ON customers.customer_id = orders.customer_id;
```

Result:

```sql
customer_name | order_id
--------------+----------
John Doe      | 1
Jane Smith    | 2
Bob Johnson   | NULL
John Doe      | 3
NULL          | 4
```

### CROSS JOIN example

This query returns the Cartesian product of the customers and orders tables.

```sql
SELECT customers.customer_name, orders.order_id
FROM customers
CROSS JOIN orders;
```

Result (partial output; a total of 3 × 4 = 12 rows):

```sql
customer_name | order_id
--------------+----------
John Doe      | 1
John Doe      | 2
John Doe      | 3
John Doe      | 4
Jane Smith    | 1
Jane Smith    | 2
...
```
