---
title: 值表达式
---

# 值表达式

值表达式是查询中用于计算、转换和引用数据的核心组成部分。理解这些表达式的用法是编写灵活、高效 SQL 查询的关键。

本文介绍了多种表达式类型，包括列引用、位置参数、数组和行构造器、函数调用以及类型转换。每种表达式类型在查询结果中的数据处理和呈现方式中都扮演着特定角色。

## 列引用

列引用的语法如下：

```sql
<correlation>.<columnname>
```

其中 `<correlation>` 是表名（可以带有 schema 名）或在 `FROM` 子句中定义的表别名，也可以是关键字 `NEW` 或 `OLD`。`NEW` 和 `OLD` 只能出现在重写规则中，其他引用名可以在任意 SQL 语句中使用。如果列名在查询中是唯一的，可以省略 `<correlation>` 前缀。

## 位置参数

位置参数是 SQL 语句或函数的参数，通过参数在参数列表中的位置进行引用。例如，`$1` 表示第一个参数，`$2` 表示第二个参数，依此类推。位置参数的值来自 SQL 外部传入的参数，或是调用 SQL 函数时传入的实参。一些客户端库支持将数据值与 SQL 命令分开传入，这种情况下参数引用的是这些“脱离 SQL 文本”的数据值。参数引用的语法如下：

```sql
$number
```

例如：

```sql
CREATE FUNCTION dept(text) RETURNS dept
    AS $$ SELECT * FROM dept WHERE name = $1 $$
    LANGUAGE SQL;
```

这里的 `$1` 表示函数被调用时传入的第一个参数值。

## 下标引用（Subscripts）

如果某个表达式的结果是数组类型的值，可以通过以下方式获取数组中指定的元素：

```sql
<expression>[<subscript>]
```

也可以提取多个相邻的元素（称为数组切片）：

```sql
<expression>[<lower_subscript>:<upper_subscript>]
```

每个下标都是一个表达式，返回一个整数值。

数组表达式通常必须用括号括起来，但如果要下标引用的是列引用或位置参数，可以省略括号。对于多维数组，可以使用多个下标进行连续访问，例如（包括括号）：


```sql
mytable.arraycolumn[4]
```

```sql
mytable.two_d_column[17][34]
```

```sql
$1[10:42]
```

```sql
(arrayfunction(a,b))[42]
```

## 字段选择（Field selection）

如果一个表达式返回的是复合类型（行类型）的值，可以通过以下方式提取某个字段：

```sql
<expression>.<fieldname>
```

通常，行表达式需要用括号括起来。但如果要提取字段的是表引用或位置参数，则可以省略括号。例如：

```sql
mytable.mycolumn
```

```sql
$1.somecolumn
```

```sql
(rowfunction(a,b)).col3
```

带限定名的列引用其实就是字段选择语法的一种特殊形式。

## 运算符调用（Operator invocations）

运算符调用支持以下几种语法：

```sql
<expression operator expression>        -- 二元中缀运算符
```

```sql
<operator expression>                   -- 一元前缀运算符
```

```sql
<expression operator>                   -- 一元后缀运算符
```

其中 `operator` 可以是运算符符号、关键字 `AND`、`OR` 或 `NOT`，也可以是带 schema 限定的运算符名称，形式如下：

```sql
OPERATOR(<schema>.<operatorname>)
```

系统或用户定义的运算符决定了具体有哪些可用运算符，以及它们是单目还是双目。

## 函数调用（Function calls）

函数调用的语法是函数名（可带 schema 前缀）后跟一对圆括号，括号中列出实参：

```sql
function ([expression [, expression ... ]])
```

例如，以下函数调用用于计算 2 的平方根：

```sql
sqrt(2)
```

## 类型转换（Type casts）

类型转换用于将某种数据类型转换为另一种类型。如果对一个已知类型的值表达式进行类型转换，则会执行运行时类型转换。转换只有在定义了合适的转换路径时才会成功。类型转换与对常量的类型指定不同：后者是给字符串字面值赋予初始类型，只要该字符串符合目标类型的输入格式即可成功。

Apache Cloudberry 支持以下三种应用于值表达式的类型转换：

- **显式转换（Explicit cast）**：当用户明确指定两个类型之间的转换时，Apache Cloudberry 执行显式转换。以下是两种等价的显式转换语法：

    ```sql
    CAST ( expression AS type )
    expression::type
    ```

    `CAST` 是符合 SQL 标准的写法，`::` 是 PostgreSQL 的传统写法。

- **赋值转换（Assignment cast）**：在赋值场景中（如给某个表字段赋值），系统可以隐式调用赋值转换。例如，在执行 `CREATE CAST` 命令时使用 `AS ASSIGNMENT` 子句定义的转换，会在赋值上下文中自动生效。如下例所示，假设 `tbl1.f1` 是 `text` 类型的列，那么以下 `INSERT` 语句会隐式地将整数 `42` 转换为文本：

    ```sql
    INSERT INTO tbl1 (f1) VALUES (42);
    ```

- **隐式转换（Implicit cast）**：在赋值或表达式上下文中，系统可以自动调用隐式转换。使用 `CREATE CAST` 命令时加上 `AS IMPLICIT` 子句，可以定义这样的转换。如下例所示，假设 `tbl1.c1` 是 `int` 类型，`tbl1.c2` 是 `decimal` 类型，那么表达式 `(4.3 + tbl1.c1)` 中，`c1` 会被自动从 `int` 转换为 `decimal`：

    ```sql
    SELECT * FROM tbl1 WHERE tbl1.c2 = (4.3 + tbl1.c1) ;
    ```

通常情况下，如果值表达式的目标类型没有歧义（例如赋值给某个表字段时），可以省略显式类型转换，系统会自动应用类型转换。但 Apache Cloudberry 只会对系统目录中定义为“赋值”（assignment）或“显式”（explicit）上下文的转换执行隐式转换。其他类型转换必须使用显式转换语法，以避免在用户不知情的情况下发生意外的类型转换。

可以使用 psql 的元命令 `\dC` 查看类型转换信息。转换信息存储在系统目录表 `pg_cast` 中，类型信息存储在 `pg_type` 表中。

## 数组构造式（Array constructors）

数组构造式用于从多个元素值构建数组。最简单的构造方式是使用关键字 `ARRAY`，后接左中括号 `[`，以逗号分隔的多个元素值表达式，最后以右中括号 `]` 结束。例如：

```sql
SELECT ARRAY[1,2,3+4];
```

结果：

```sql
  array
---------
 {1,2,7}
```

数组元素的类型是所有成员表达式的公共类型，遵循与 `UNION` 或 `CASE` 构造相同的类型推导规则。

可以通过嵌套数组构造式来创建多维数组。在内部的构造式中可以省略 `ARRAY` 关键字。例如，以下两个语句产生相同的结果：

```sql
SELECT ARRAY[ARRAY[1,2], ARRAY[3,4]];
SELECT ARRAY[[1,2],[3,4]];
```

结果：

```sql
     array
---------------
 {{1,2},{3,4}}
```

由于多维数组必须是“矩形”的，因此同一层级的内部构造式必须构造出维度一致的子数组。

构造多维数组时，元素不一定要使用 `ARRAY[...]` 形式，只要表达式能返回对应的数组即可。例如：

```sql
CREATE TABLE arr(f1 int[], f2 int[]);
INSERT INTO arr VALUES (
  ARRAY[[1,2],[3,4]], 
  ARRAY[[5,6],[7,8]]
);
SELECT ARRAY[f1, f2, '{{9,10},{11,12}}'::int[]] FROM arr;
```

结果：

```sql
                     array
------------------------------------------------
 {{{1,2},{3,4}},{{5,6},{7,8}},{{9,10},{11,12}}}
```

还可以通过子查询的结果来构造数组。语法是使用 `ARRAY` 关键字后接圆括号括起的子查询。例如：

```sql
SELECT ARRAY(SELECT oid FROM pg_proc WHERE proname LIKE 'bytea%');
```

结果：

```
                          ?column?
-----------------------------------------------------------
 {2011,1954,1948,1952,1951,1244,1950,2005,1949,1953,2006,31}
```

子查询必须只返回一列。构造出的数组是一维数组，其元素类型与子查询输出列的类型一致。使用 `ARRAY(...)` 构造的数组下标总是从 1 开始。

## 行构造式（Row constructors）

行构造式是一种用于从多个字段值构造一个“行值”（也称为复合值）的表达式。例如：

```sql
SELECT ROW(1,2.5,'this is a test');
```

行构造式支持 `rowvalue.*` 语法，可将行值展开为各字段值，类似在 `SELECT` 子句中使用 `.*` 的效果。例如，假设表 `t` 有列 `f1` 和 `f2`，以下两个查询等价：

```sql
SELECT ROW(t.*, 42) FROM t;
SELECT ROW(t.f1, t.f2, 42) FROM t;
```

默认情况下，`ROW` 表达式生成的值具有匿名的记录类型（record type）。如有需要，可以将其强制转换为具名的复合类型，比如某个表的行类型，或通过 `CREATE TYPE AS` 创建的复合类型。为避免歧义，在有多个匹配函数的情况下，应显式指定类型。例如：

```sql
CREATE TABLE mytable(f1 int, f2 float, f3 text);
CREATE FUNCTION getf1(mytable) RETURNS int AS 'SELECT $1.f1' 
LANGUAGE SQL;
```

在下面的查询中，不需要显式类型转换，因为只有一个名为 `getf1()` 的函数，因此不会有歧义：

```sql
SELECT getf1(ROW(1,2.5,'this is a test'));
 getf1
-------
     1
```

现在我们再创建一个新的复合类型和函数：

```sql
CREATE TYPE myrowtype AS (f1 int, f2 text, f3 numeric);
CREATE FUNCTION getf1(myrowtype) RETURNS int AS 'SELECT 
$1.f1' LANGUAGE SQL;
```

这时再运行之前的查询会报错：

```sql
SELECT getf1(ROW(1,2.5,'this is a test'));
ERROR:  function getf1(record) is not unique
```

因为系统无法确定调用哪个函数。此时需显式转换类型，例如：

```sql
SELECT getf1(ROW(1,2.5,'this is a test')::mytable);
 getf1
-------
     1
```

或：

```sql
SELECT getf1(CAST(ROW(11,'this is a test',2.5) AS 
myrowtype));
 getf1
-------
    11
```

你可以使用行构造式创建复合类型值，用于插入复合类型表的字段，或传递给接收复合参数的函数。
