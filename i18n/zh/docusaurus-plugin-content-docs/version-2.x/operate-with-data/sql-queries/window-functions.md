---
title: 带有窗口函数的查询
---

# 带有窗口函数的查询

窗口表达式让应用开发者能够更轻松地使用标准 SQL 语句编写复杂的在线分析处理（OLAP）查询。例如，使用窗口表达式可以计算滑动平均值或区间总和，在特定列值发生变化时重置聚合和排名，以及用更简洁的方式表达复杂的比值计算逻辑。

窗口表达式表示将一个 `<窗口函数>` 应用于一个 `<窗口帧>`，窗口帧通过 `OVER()` 子句定义。这类似于配合 `GROUP BY` 子句使用聚合函数进行的计算。不过与聚合函数为每个分组返回一个结果值不同，窗口函数会为每一行返回一个结果值，这个结果是基于该行所属的窗口帧中所有行计算得出的。`OVER()` 子句可以将所有行划分为多个 *分区*，还可以进一步限制窗口帧的范围，指定当前行之前或之后哪些行应包含在计算中。

Apache Cloudberry 不支持将一个窗口函数作为另一个窗口函数的参数使用。

窗口表达式的语法如下：

```sql
<window_function> ( [<expression> [, ...]] ) [ FILTER ( WHERE <filter_clause> ) ] OVER ( <window_specification> )
```

其中 `<window_function>` 可以是用户定义的窗口函数，`<expression>` 是任意不包含窗口表达式的值表达式，`<window_specification>` 的结构如下：

```sql
[<window_name>]
[PARTITION BY <expression> [, ...]]
[[ORDER BY <expression> [ASC | DESC | USING operator] [NULLS {FIRST | LAST}] [, ...]
[ <frame_clause> ]
```

可选的 `<frame_clause>` 有以下两种形式：

```sql
{ RANGE | ROWS | GROUPS } <frame_start> [ <frame_exclusion> ]
{ RANGE | ROWS | GROUPS } BETWEEN <frame_start> AND <frame_end> [ <frame_exclusion> ]
```

其中 `<frame_start>` 和 `<frame_end>` 可以是以下选项之一：

```sql
UNBOUNDED PRECEDING
<offset> PRECEDING
CURRENT ROW
<offset> FOLLOWING
UNBOUNDED FOLLOWING
```

而 `<frame_exclusion>` 可以是以下选项之一：

```sql
EXCLUDE CURRENT ROW
EXCLUDE GROUP
EXCLUDE TIES
EXCLUDE NO OTHERS
```

窗口表达式只能出现在 `SELECT` 语句的查询列中。例如：

```sql
SELECT count(*) OVER(PARTITION BY customer_id), * FROM sales;
```

如果指定了 `FILTER`，那么只有满足 `<filter_clause>` 条件为 true 的输入行才会传递给窗口函数，其他行会被忽略。在窗口表达式中，`FILTER` 子句只能与聚合函数类型的 `<window_function>` 搭配使用。

窗口表达式中必须包含 `OVER` 子句。`OVER` 子句指定了窗口帧——即窗口函数要处理的行集合。这个语法结构将窗口函数与普通函数或聚合函数区分开来。

当窗口表达式中的窗口聚合函数有多个输入表达式时，Apache Cloudberry 不支持使用 `DISTINCT` 子句。

一个窗口定义具有以下特征：

- `PARTITION BY` 子句定义了窗口函数作用的分区。如果没有指定该子句，则整个结果集被视为一个分区。

- `ORDER BY` 子句定义了在每个窗口分区内的排序方式。窗口定义中的 `ORDER BY` 子句与普通查询中的 `ORDER BY` 是两个独立的概念。对于计算排名的窗口函数，`ORDER BY` 是必需的，它指定了排名值的计算依据。对于 OLAP 聚合，要使用窗口帧（如 `ROWS`、`RANGE` 或 `GROUPS`），也必须指定 `ORDER BY`。

:::note 注意
对于没有明确顺序的数据类型，例如 `time`，不建议在窗口定义的 `ORDER BY` 中使用。这类类型即使指定了时区，也缺乏明确的顺序性，因为加法和减法运算不会产生预期的效果。例如，下面这种写法通常不成立：`x::time < x::time + '2 hour'::interval`
:::

- `<frame_clause>` 用于指定 `<window frame>` 中的行集合，它是当前分区的一个子集，仅适用于那些基于窗口帧而非整个分区执行的窗口函数。帧中的行集合可能会随当前行而变化。帧可以用 `RANGE`、`ROWS` 或 `GROUPS` 模式定义，在每种模式下，帧的范围从 `<frame_start>` 到 `<frame_end>`。如果省略了 `<frame_end>`，则默认结束位置是 `CURRENT ROW`。

- 如果 `<frame_start>` 是 `UNBOUNDED PRECEDING`，表示帧从分区的第一行开始；如果 `<frame_end>` 是 `UNBOUNDED FOLLOWING`，表示帧直到分区的最后一行结束。

- 在 `RANGE` 或 `GROUPS` 模式中，`CURRENT ROW` 作为 `<frame_start>` 表示帧从当前行的首个“同行”（根据 `ORDER BY` 排序等价的行）开始；作为 `<frame_end>` 则表示帧结束于当前行的最后一个“同行”。在 `ROWS` 模式中，`CURRENT ROW` 仅表示当前这一行。

- 使用 `<offset> PRECEDING` 或 `<offset> FOLLOWING` 作为帧边界时，`<offset>` 必须是一个不包含变量、聚合函数或窗口函数的表达式。其含义因帧模式而异：

    - 在 `ROWS` 模式中，`<offset>` 必须是非空且非负的整数，表示帧从当前行的前或后指定行数开始或结束。

    - 在 `GROUPS` 模式中，`<offset>` 同样必须是非空且非负的整数，表示帧从当前行所在“同行组”之前或之后的若干个同行组开始或结束（同行组是指在 `ORDER BY` 中排序相同的一组行）。要使用 `GROUPS` 模式，窗口定义中必须有 `ORDER BY`。

    - 在 `RANGE` 模式中，这些选项要求 `ORDER BY` 子句只能指定一列。`<offset>` 表示当前行的该列值与帧中其他行的该列值之间的最大差值。`<offset>` 的数据类型取决于排序列的数据类型。对于数值类型，通常与排序列一致；对于日期时间类型，则是 `interval` 类型。例如，如果排序列是 `date` 或 `timestamp` 类型，可以写成：`RANGE BETWEEN '1 day' PRECEDING AND '10 days' FOLLOWING`。`<offset>` 仍然必须是非空且非负的，只不过“非负”的含义取决于数据类型。

    无论哪种情况，帧的结束位置不会超出分区的末尾，因此靠近分区边界的行，其帧可能包含的行会比其他位置少。

- 注意，在 `ROWS` 和 `GROUPS` 模式中，`0 PRECEDING` 和 `0 FOLLOWING` 与 `CURRENT ROW` 等效。在 `RANGE` 模式中也通常成立，但其“零”的含义取决于具体数据类型。

- `<frame_exclusion>` 选项允许排除当前行及其周围的部分行，即使这些行原本应包含在帧中。`EXCLUDE CURRENT ROW` 排除当前行；`EXCLUDE GROUP` 排除当前行及其所有“同行”；`EXCLUDE TIES` 排除所有同行，但保留当前行；`EXCLUDE NO OTHERS` 明确表示不排除任何行，是默认行为。

- 默认的帧选项是 `RANGE UNBOUNDED PRECEDING`，等价于 `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`。如果指定了 `ORDER BY`，这个设置表示帧包括从分区起始行到当前行最后一个“同行”为止的所有行。如果未指定 `ORDER BY`，则分区内的所有行都被视为当前行的同行，整个分区都会包含在窗口帧中。

- 有以下限制：`<frame_start>` 不能是 `UNBOUNDED FOLLOWING`，`<frame_end>` 不能是 `UNBOUNDED PRECEDING`，并且 `<frame_end>` 在上文所列的顺序中不能排在 `<frame_start>` 之前。例如：`RANGE BETWEEN CURRENT ROW AND value PRECEDING` 是不允许的。

## 窗口函数示例

以下示例演示了如何在分区和窗口帧中使用窗口函数。

### 示例 1 – 在分区上使用聚合窗口函数

`OVER` 子句中的 `PARTITION BY` 子句会将行按指定表达式的值分组（分区）。

下面的示例用于比较每位员工的薪资与其所在部门的平均薪资：

```sql
SELECT depname, empno, salary, avg(salary) OVER(PARTITION BY depname)
FROM empsalary;
  depname  | empno | salary |          avg          
-----------+-------+--------+-----------------------
 develop   |     9 |   4500 | 5020.0000000000000000
 develop   |    10 |   5200 | 5020.0000000000000000
 develop   |    11 |   5200 | 5020.0000000000000000
 develop   |     7 |   4200 | 5020.0000000000000000
 develop   |     8 |   6000 | 5020.0000000000000000
 personnel |     5 |   3500 | 3700.0000000000000000
 personnel |     2 |   3900 | 3700.0000000000000000
 sales     |     1 |   5000 | 4866.6666666666666667
 sales     |     3 |   4800 | 4866.6666666666666667
 sales     |     4 |   4800 | 4866.6666666666666667
(10 rows)
```

前三列来自 `empsalary` 表，每一行输出对应表中的一行数据。第四列是当前行所在部门中所有员工的薪资平均值。具有相同 `depname` 的行组成一个分区，这个例子中一共有三个分区。`avg` 函数本质上与普通的聚合函数相同，只不过由于加上了 `OVER` 子句，它被当作窗口函数执行。

你也可以使用 `WINDOW` 子句定义窗口，并在查询中引用它。下面这个例子与上面的查询等价：

```sql
SELECT depname, empno, salary, avg(salary) OVER(mywindow)
FROM empsalary
WINDOW mywindow AS (PARTITION BY depname);
```

当查询中有多个窗口函数共用同一个窗口定义时，使用命名窗口会更方便。

### 示例 2 – 使用 ORDER BY 的排名窗口函数

`OVER` 子句中的 `ORDER BY` 控制窗口函数处理行的顺序。窗口函数中的 `ORDER BY` 列表不必与查询结果的输出顺序一致。下面的示例使用 `rank()` 窗口函数，为每个部门内的员工按薪资从高到低排序并排名：

```sql
SELECT depname, empno, salary,
    rank() OVER (PARTITION BY depname ORDER BY salary DESC)
FROM empsalary;
  depname  | empno | salary | rank 
-----------+-------+--------+------
 develop   |     8 |   6000 |    1
 develop   |    11 |   5200 |    2
 develop   |    10 |   5200 |    2
 develop   |     9 |   4500 |    4
 develop   |     7 |   4200 |    5
 personnel |     2 |   3900 |    1
 personnel |     5 |   3500 |    2
 sales     |     1 |   5000 |    1
 sales     |     4 |   4800 |    2
 sales     |     3 |   4800 |    2
(10 rows)
```

### 示例 3 – 基于行窗口帧的聚合函数

`RANGE`、`ROWS` 或 `GROUPS` 子句定义了窗口帧，即当前分区中的一个行集合，窗口函数将在此集合上进行计算。`ROWS` 表示按物理行数来处理，例如从分区开头到当前行的所有行。

下面这个例子使用 `sum()` 函数，按部门对员工的薪资进行累计，统计从分区开头到当前行为止的总薪资：

```sql
SELECT depname, empno, salary,
    sum(salary) OVER (PARTITION BY depname ORDER BY salary
        ROWS between UNBOUNDED PRECEDING AND CURRENT ROW)
FROM empsalary ORDER BY depname, sum;
  depname  | empno | salary |  sum  
-----------+-------+--------+-------
 develop   |     7 |   4200 |  4200
 develop   |     9 |   4500 |  8700
 develop   |    11 |   5200 | 13900
 develop   |    10 |   5200 | 19100
 develop   |     8 |   6000 | 25100
 personnel |     5 |   3500 |  3500
 personnel |     2 |   3900 |  7400
 sales     |     4 |   4800 |  4800
 sales     |     3 |   4800 |  9600
 sales     |     1 |   5000 | 14600
(10 rows)
```

### 示例 4 – 基于值或分组窗口帧的聚合函数

`RANGE` 和 `GROUPS` 模式是基于 `OVER` 子句中 `ORDER BY` 表达式的逻辑值来定义窗口帧的。本例用于展示 `ROWS` 与 `RANGE` 或 `GROUPS` 模式的差异。窗口帧包含所有薪资小于或等于当前行薪资的行。与上一个例子不同的是，对于薪资相同的员工，计算出的总和相同，并且包含所有这些员工的薪资。

```sql
SELECT depname, empno, salary,
    sum(salary) OVER (PARTITION BY depname ORDER BY salary
        RANGE between UNBOUNDED PRECEDING AND CURRENT ROW)
FROM empsalary ORDER BY depname, sum;
  depname  | empno | salary |  sum  
-----------+-------+--------+-------
 develop   |     7 |   4200 |  4200
 develop   |     9 |   4500 |  8700
 develop   |    11 |   5200 | 19100
 develop   |    10 |   5200 | 19100
 develop   |     8 |   6000 | 25100
 personnel |     5 |   3500 |  3500
 personnel |     2 |   3900 |  7400
 sales     |     4 |   4800 |  9600
 sales     |     3 |   4800 |  9600
 sales     |     1 |   5000 | 14600
(10 rows)
```

在这个例子中，因为 `<frame_start>` 和 `<frame_end>` 没有使用 `<offset>`，所以 `RANGE` 和 `GROUPS` 模式得到的结果是相同的。

```sql
SELECT depname, empno, salary,
    sum(salary) OVER (PARTITION BY depname ORDER BY salary
        GROUPS between UNBOUNDED PRECEDING AND CURRENT ROW)
FROM empsalary ORDER BY depname, sum;
  depname  | empno | salary |  sum
-----------+-------+--------+-------
 develop   |     7 |   4200 |  4200
 develop   |     9 |   4500 |  8700
 develop   |    11 |   5200 | 19100
 develop   |    10 |   5200 | 19100
 develop   |     8 |   6000 | 25100
 personnel |     5 |   3500 |  3500
 personnel |     2 |   3900 |  7400
 sales     |     4 |   4800 |  9600
 sales     |     3 |   4800 |  9600
 sales     |     1 |   5000 | 14600
(10 rows)
```

### 示例 5 – 基于 range 与 groups 窗口帧的聚合函数

这个例子展示了 `RANGE` 和 `GROUPS` 模式之间的区别。表 `sales` 记录了一家公司两个门店在四天内的销售数据。

在 `GROUPS` 模式下，`<offset>` 表示从当前行所在的“同行组”向前数几个“同行组”。这些同行组由 `ORDER BY` 子句决定，这里是按日期分组。由于查询中没有显式指定 `<frame_end>`，默认帧结束位置是 `CURRENT ROW`。

```sql
SELECT date, shop, total, sum(total) OVER (PARTITION BY shop ORDER BY date asc GROUPS 2 PRECEDING) 
FROM sales ORDER BY shop, date;
    date    |  shop  |  total  |   sum    
------------+--------+---------+----------
 2022-01-07 | Shop 1 | 3000.00 |  3000.00
 2022-01-08 | Shop 1 | 1000.00 |  4000.00
 2022-01-09 | Shop 1 | 5000.00 | 11000.00
 2022-01-09 | Shop 1 | 2000.00 | 11000.00
 2022-01-07 | Shop 2 | 4000.00 | 10000.00
 2022-01-07 | Shop 2 | 6000.00 | 10000.00
 2022-01-09 | Shop 2 | 7000.00 | 21000.00
 2022-01-09 | Shop 2 | 4000.00 | 21000.00
 2022-01-10 | Shop 2 | 2000.00 | 23000.00
(9 rows)
```

如果要在 `RANGE` 模式中获得相同的结果，`<frame_clause>` 中的 `<offset>` 必须使用与排序列相同的数据类型，这里是 `date` 类型。如果使用数值类型的 `2`，则会报错。

```sql
SELECT date, shop, total, sum(total) OVER (PARTITION BY shop ORDER BY date asc RANGE '2 days' PRECEDING) 
FROM sales ORDER BY shop, date;
    date    |  shop  |  total  |   sum    
------------+--------+---------+----------
 2022-01-07 | Shop 1 | 3000.00 |  3000.00
 2022-01-08 | Shop 1 | 1000.00 |  4000.00
 2022-01-09 | Shop 1 | 5000.00 | 11000.00
 2022-01-09 | Shop 1 | 2000.00 | 11000.00
 2022-01-07 | Shop 2 | 4000.00 | 10000.00
 2022-01-07 | Shop 2 | 6000.00 | 10000.00
 2022-01-09 | Shop 2 | 7000.00 | 21000.00
 2022-01-09 | Shop 2 | 4000.00 | 21000.00
 2022-01-10 | Shop 2 | 2000.00 | 13000.00
(9 rows)
```

注意最后一行的结果不同，因为 `RANGE` 模式会考虑当前日期之前两天的记录，而 Shop 2 在 `2022-01-08` 没有数据；而 `GROUPS` 模式使用的是前两个“同行组”，即 `2022-01-07` 和 `2022-01-09`。
