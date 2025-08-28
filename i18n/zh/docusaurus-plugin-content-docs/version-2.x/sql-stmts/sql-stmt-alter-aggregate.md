---
title: ALTER AGGREGATE
---

# ALTER AGGREGATE

更改聚合函数的定义。

## 语法概要

```sql
ALTER AGGREGATE <name> ( <aggregate_signature> )  RENAME TO <new_name>

ALTER AGGREGATE <name> ( <aggregate_signature> )
                 OWNER TO { <new_owner> | CURRENT_USER | SESSION_USER }

ALTER AGGREGATE <name> ( <aggregate_signature> ) SET SCHEMA <new_schema>

--  上面 <aggregate_signature> 可以是：

* |
[ <argmode> ] [ <argname> ] <argtype> [ , ... ] |
[ [ <argmode> ] [ <argname> ] <argtype> [ , ... ] ] ORDER BY [ <argmode> ] [ <argname> ] <argtype> [ , ... ]

```

## 描述

`ALTER AGGREGATE` 语句更改聚合函数的属性。

要使用 `ALTER AGGREGATE`，你必须是聚合函数的所有者。要更改聚合函数的模式，你还必须对新模式拥有 `CREATE` 权限。要更改所有者，你还必须是新所有者角色的直接或间接成员，并且该角色必须对聚合函数的模式拥有 `CREATE` 权限。（这些限制确保更改所有者不会执行你通过删除并重新创建聚合函数无法执行的任何操作。不过，超级用户可以随意更改任何聚合函数的所有权)。

## 参数

**`name`**

现有聚合函数的名称（可选 schema-qualified）。

**`argmode`**

参数的模式：`IN` 或 `VARIADIC`。如果省略，则默认值为`IN`。

**`argname`**

参数的名称。请注意，`ALTER AGGREGATE ` 实际上并不关注参数名称，因为只需要参数数据类型来确定聚合函数的标识。

**`argtype`**

聚合函数所操作的输入数据类型。要引用无参数聚合函数，在参数规范列表的位置写入`*`。要引用有序集聚合函数，在直接参数规范和聚合参数规范之间写入`ORDER BY`。

**`new_name`**

聚合函数的新名称。

**`new_owner`**

聚合函数的新所有者。

**`new_schema`**

聚合函数的新模式。

## 注意事项

引用有序集聚集的推荐语法是，在直接参数规范和聚集参数规范之间写上`ORDER BY`，风格与`CREATE AGGREGATE`中相同。不过，省略`ORDER BY`，将直接参数规范和聚集参数规范合并为一个列表也可以。在这种缩写形式中，如果`VARIADIC "any"`同时出现在直接参数列表和聚集参数列表中，只需写一次`VARIADIC "any"`。

## 示例

要将类型为 `integer` 的聚合函数 `myavg` 重命名为 `my_average`:

```sql
ALTER AGGREGATE myavg(integer) RENAME TO my_average;
```

要将类型为`integer` 的聚合函数`myavg` 的所有者更改为`joe`:
```sql
ALTER AGGREGATE myavg(integer) OWNER TO joe;
```

将参数类型为`float8`且聚合参数类型为`integer`的有序集聚合`mypercentile`移动到模式`myschema`中:

```sql
ALTER AGGREGATE mypercentile(float8 ORDER BY integer) SET SCHEMA myschema;
```

这样做也可行:

```sql
ALTER AGGREGATE mypercentile(float8, integer) SET SCHEMA myschema;
```

## 兼容性

SQL 标准中没有`ALTER AGGREGATE`语句。

## 另见

[`CREATE AGGREGATE`](/i18n/zh/docusaurus-plugin-content-docs/current/sql-stmts/create-aggregate.md)、[`DROP AGGREGATE`](/i18n/zh/docusaurus-plugin-content-docs/current/sql-stmts/drop-aggregate.md)
