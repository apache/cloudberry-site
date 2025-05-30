---
title: 表函数
---

# 表函数

表函数是返回一组行的函数，这些行可以由基本数据类型（标量类型）或复合数据类型（表行）组成。表函数的使用方式与查询中 `FROM` 子句中的表、视图或子查询类似。表函数返回的列可以像表或视图的列一样出现在 `SELECT`、`JOIN` 或 `WHERE` 子句中。

多个表函数也可以通过 `ROWS FROM` 语法组合在一起，结果按列并排返回；返回的行数取决于结果最多的那个函数，较短结果的空位将自动填充为 null。

```sql
function_call [WITH ORDINALITY] [[AS] table_alias [(column_alias [, ... ])]]
ROWS FROM( function_call [, ... ] ) [WITH ORDINALITY] [[AS] table_alias [(column_alias [, ... ])]]
```

如果指定了 `WITH ORDINALITY` 子句，函数结果中将额外增加一个类型为 bigint 的列，用于为每一行编号，从 1 开始计数。（这是对 SQL 标准中 `UNNEST ... WITH ORDINALITY` 语法的推广。）默认情况下，该列的列名为 `ordinality`，但也可以通过 `AS` 子句为其指定其他名称。

特殊的表函数 `UNNEST` 可以接受任意数量的数组参数，并返回相应数量的列，相当于对每个参数分别调用 `UNNEST` 并通过 `ROWS FROM` 组合在一起。

```sql
UNNEST( array_expression [, ... ] ) [WITH ORDINALITY] [[AS] table_alias [(column_alias [, ... ])]]
```

如果未指定表别名 `table_alias`，函数名将用作表名；对于 `ROWS FROM()` 语法，默认使用第一个函数的名称作为表名。

如果没有提供列别名：

- 对于返回基本数据类型的函数，列名默认与函数名相同；
- 对于返回复合类型的函数，列名将采用复合类型中各个属性的名称。

以下是一些示例：

```sql
CREATE TABLE foo (fooid int, foosubid int, fooname text);

CREATE FUNCTION getfoo(int) RETURNS SETOF foo AS $$
    SELECT * FROM foo WHERE fooid = $1;
$$ LANGUAGE SQL;

SELECT * FROM getfoo(1) AS t1;

SELECT * FROM foo
    WHERE foosubid IN (
                        SELECT foosubid
                        FROM getfoo(foo.fooid) z
                        WHERE z.fooid = foo.fooid
                      );

CREATE VIEW vw_getfoo AS SELECT * FROM getfoo(1);

SELECT * FROM vw_getfoo;
```

在某些场景下，我们希望表函数能够根据调用方式返回不同的列集。为支持这一需求，可以将表函数声明为返回伪类型 `record`，且不带 `OUT` 参数。当在查询中使用此类函数时，必须在查询中显式指定预期的行结构，以便系统能够正确解析和生成执行计划。语法如下：

```sql
function_call [AS] alias (column_definition [, ... ])
function_call AS [alias] (column_definition [, ... ])
ROWS FROM( ... function_call AS (column_definition [, ... ]) [, ... ] )
```

当不使用 `ROWS FROM()` 语法时，`column_definition` 列表将替代原本可以附加在 FROM 项上的列别名列表，定义中的名称即为列别名。当使用 `ROWS FROM()` 语法时，可以分别为每个函数指定 `column_definition` 列表；如果只有一个函数且未使用 `WITH ORDINALITY` 子句，也可以在 `ROWS FROM()` 后直接写出 `column_definition` 列表，替代列别名列表。

来看下面这个示例：

```sql
SELECT *
    FROM dblink('dbname=mydb', 'SELECT proname, prosrc FROM pg_proc')
      AS t1(proname name, prosrc text)
    WHERE proname LIKE 'bytea%';
```

这个 `dblink` 函数（来自 `dblink` 模块）用于执行远程查询。由于可能用于任意查询，因此声明为返回 `record` 类型。调用该函数时必须指定实际的列结构，以便解析器知道 `*` 展开为什么内容。

再来看一个使用 `ROWS FROM` 的示例：

```sql
SELECT *
FROM ROWS FROM
    (
        json_to_recordset('[{"a":40,"b":"foo"},{"a":"100","b":"bar"}]')
            AS (a INTEGER, b TEXT),
        generate_series(1, 3)
    ) AS x (p, q, s)
ORDER BY p;
```

这个查询将两个函数组合成一个 `FROM` 目标。`json_to_recordset()` 被指定返回两列，第一列为整数类型，第二列为文本类型。`generate_series()` 的结果直接使用。`ORDER BY` 子句按整数排序 `p` 列的值。

输出结果如下：

```sql
  p  |  q  | s
-----+-----+---
  40 | foo | 1
 100 | bar | 2
     |     | 3
```
