---
title: 表定义基础
---

# 表定义基础

关系型数据库中的表就像纸上的表格：由行和列组成。列的数量和顺序是固定的，每列都有名称；行数是可变的，表示当前存储了多少数据。SQL 不保证表中行的顺序，当读取表时，除非显式指定排序条件，行的顺序是未定义的。此外，SQL 不会自动为每行分配唯一标识符，因此一个表中可能包含多行完全相同的数据。

每一列都有对应的数据类型。数据类型限制了可以赋值给该列的内容范围，并赋予数据特定的语义，使其能用于计算。例如，声明为数值类型的列不能接受任意文本字符串，且存储的数据可以用于数学运算。相反，声明为字符串类型的列几乎可以存储任何数据，但不适用于数学计算（不过可以进行字符串拼接等操作）。

Apache Cloudberry 提供了大量内置数据类型，适用于各种应用场景，也支持用户自定义数据类型。大多数内置数据类型的名称和语义都很直观。常用的类型包括用于整数的 `integer`，用于小数的 `numeric`，用于字符文本的 `text`，用于日期的 `date`，用于一天中时间的 `time`，以及包含日期和时间的 `timestamp`。

创建表时使用 [`CREATE TABLE`](../../sql-stmts/create-table.md) 命令。在该命令中，至少需要指定表名、每一列的名称以及对应的数据类型。例如：

```sql
CREATE TABLE my_first_table (
    first_column text,
    second_column integer
);
```

这个命令会创建一个名为 `my_first_table` 的表，包含两列：第一列名为 `first_column`，类型为 `text`；第二列名为 `second_column`，类型为 `integer`。表名和列名遵循 PostgreSQL 文档中 [标识符和关键字](https://www.postgresql.org/docs/14/sql-syntax-lexical.html#SQL-SYNTAX-IDENTIFIERS) 所述的标识符语法。类型名通常也是标识符，但也有例外。列的定义以逗号分隔，并用圆括号括起来。

通常建议根据表和列中存储的数据选择有意义的名称，例如：

```sql
CREATE TABLE products (
    product_no integer,
    name text,
    price numeric
);
```

（`numeric` 类型支持小数，适合用于存储金额等字段。）

:::tip 提示
如果需要创建多个有关联的表，建议为表和列使用统一的命名风格。例如，可以统一使用单数或复数形式作为表名。
:::

Apache Cloudberry 限制了表中可包含的列数。根据列类型的不同，最大列数范围在 250 到 1600 之间。接近最大列数的设计通常不常见，且在大多数情况下不合理。

如果不再需要某个表，可以使用 [`DROP TABLE`](../../sql-stmts/drop-table.md) 命令将其删除。例如：

```sql
DROP TABLE my_first_table;
DROP TABLE products;
```

尝试删除不存在的表会导致错误。在 SQL 脚本文件中，通常会在创建表之前尝试删除同名表，即使表不存在也忽略错误，以保证脚本无论表是否存在都能顺利执行。可以使用 `DROP TABLE IF EXISTS` 语法来避免错误信息，但这不是标准 SQL 语法。

## 列的默认值

可以为列设置默认值。当插入新行时，如果某些列没有指定值，Apache Cloudberry 会自动为这些列填入各自的默认值。数据操作语句也可以显式要求某列使用默认值，而无需知道具体默认值是什么。

如果没有显式声明列的默认值，则该列的默认值为 null，表示数据未知。

在表定义中，可以在列的数据类型之后指定默认值，例如：

```sql
CREATE TABLE products (
    product_no integer,
    name text,
    price numeric DEFAULT 9.99
);
```

默认值可以是一个表达式，Apache Cloudberry 会在插入默认值时计算该表达式（不是在创建表时计算）。常见示例包括：为时间戳列设置默认值 `CURRENT_TIMESTAMP`，让该列自动记录插入时间；或者为每一行生成一个“序列号”，例如：

```sql
CREATE TABLE products (
    product_no integer DEFAULT nextval('products_product_no_seq'),
    ...
);
```

这里的 `nextval()` 函数会从指定的序列对象中依次取值。这种用法非常常见，因此提供了简化语法：

```sql
CREATE TABLE products (
    product_no SERIAL,
    ...
);
```

## 生成列

生成列是一种特殊的列，它的值总是由其他列计算得出。生成列之于列，就像视图之于表。生成列有两种类型：存储列（stored）和虚拟列（virtual）。存储生成列会在插入或更新时计算并存入磁盘，就像普通列一样；虚拟生成列不会占用存储空间，读取时动态计算。

虚拟列类似于视图，存储列类似于物化视图（但系统会自动更新）。Apache Cloudberry 当前只支持存储类型的生成列。

创建生成列时，需要在 `CREATE TABLE` 中使用 `GENERATED ALWAYS AS` 子句，例如：

```sql
CREATE TABLE people (
    ...,
    height_cm numeric,
    height_in numeric GENERATED ALWAYS AS (height_cm / 2.54) STORED
);
```

关键字 `STORED` 必须明确指定，用于声明该列为存储类型的生成列。详细说明参见 [`CREATE TABLE`](../../sql-stmts/create-table.md)。

生成列不能被直接写入。在 `INSERT` 或 `UPDATE` 中不应为其赋值，但可以使用关键字 `DEFAULT`。

生成列与默认值列之间有以下不同：

- 默认值只在插入行时（未显式指定列值时）计算一次；生成列在每次行变更时更新，且不能被覆盖。
- 默认值不能引用其他列；生成列的表达式通常需要引用其他列。
- 默认值可以使用 `random()` 或获取当前时间等不稳定函数；生成列不允许使用这些函数。

定义生成列以及包含生成列的表时有以下限制：

- 生成表达式只能使用 immutable 函数，不能使用子查询，也不能以任何方式引用当前行以外的内容。
- 生成表达式不能引用其他生成列。
- 生成表达式不能引用系统列，除了 `tableoid`。
- 生成列不能定义默认值或标识列（identity）。
- 生成列不能作为分布键。
- 生成列不能作为分区键。
- 可以在根分区表中定义生成列，但不能在子分区表中定义。

- 关于继承关系：

    - 如果父表中的列是生成列，子表中的对应列也必须是生成列，并使用相同的表达式。子列定义中可以省略 `GENERATED` 子句，系统会自动从父表复制。
    - 在多重继承的情况下，如果某个父表中的列是生成列，则所有父表中该列都必须是生成列，且表达式必须相同。
    - 如果父表中的列不是生成列，子表中的列可以是生成列，也可以不是。

使用生成列时还需要注意以下几点：

- 外部表可以包含生成列。详见 [`CREATE FOREIGN TABLE`](../../sql-stmts/create-foreign-table.md)。
- 生成列的访问权限与其依赖的基础列是独立管理的。因此，可以为某个角色授予读取生成列的权限，而不授予读取基础列的权限。
- 在概念上，生成列是在 `BEFORE` 触发器执行之后更新的。如果在 `BEFORE` 触发器中修改了基础列，生成列会反映这些更改。但反过来，Apache Cloudberry 不允许在 `BEFORE` 触发器中访问生成列。
