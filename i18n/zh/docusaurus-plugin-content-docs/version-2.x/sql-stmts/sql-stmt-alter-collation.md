---
title: ALTER COLLATION
---

# ALTER AGGREGATE

更改排序规则的定义。

## 语法概要

```sql
ALTER COLLATION <name> REFRESH VERSION

ALTER COLLATION <name> RENAME TO <new_name>
ALTER COLLATION <name> OWNER TO { <new_owner> | CURRENT_USER | SESSION_USER }
ALTER COLLATION <name> SET SCHEMA <new_schema>
```

## 描述

`ALTER COLLATION` 更改排序规则的定义。

你必须拥有该排序规则才能使用 `ALTER COLLATION`。要更改所有者，你还必须是新所有者角色的直接或间接成员，并且该角色必须拥有排序规则所在schema的`CREATE` 权限。（这些限制确保更改所有者不会赋予你通过删除并重新创建排序规则所不能获得的权限。然而，超级用户可以更改任何排序规则的所有权。）

## 参数

**`name`**

现有的排序规则的名称（可以选择性地加上模式名）。

**`new_name`**

排序规则的新名称。

**`new_owner`**

排序规则的新所有者。

**`new_schema`**

排序规则新的schema。

**`REFRESH VERSION`**

更新排序规则的版本。请参阅下面的 [注意事项](/i18n/zh/docusaurus-plugin-content-docs/current/sql-stmts/sql-stmt-alter-collation#notes)

## 注意事项

当使用由 ICU 库提供的排序规则（collation）时，在创建排序规则对象时，系统目录会记录 ICU 专用的排序器版本。在使用该排序规则时，系统会将当前版本与记录的版本进行检查，如果存在不匹配的情况，例如下列情况，会发出警告。

```shell
WARNING: collation "xx-x-icu" has version mismatch
DETAIL: The collation in the database was created using version 1.2.3.4, but the operating system provides version 2.3.4.5.
HINT: Rebuild all objects affected by this collation and run ALTER COLLATION pg_catalog."xx-x-icu" REFRESH VERSION, or build PostgreSQL with the right library version.
```

排序规则定义的变更可能导致索引损坏等问题，因为数据库系统依赖于存储对象保持特定的排序顺序。通常，应该避免这种情况，但在某些合法情况下它可能发生，例如使用 `pg_upgrade` 升级到链接了较新 ICU 版本的服务器二进制文件时。当出现这种情况时，所有依赖于该排序规则的对象都应被重建，例如通过 REINDEX 命令。当对象重建完成后，可以使用 `ALTER COLLATION ... REFRESH VERSION` 命令刷新排序规则版本。这样会更新系统目录中记录的当前排序器版本，并消除相关警告。请注意，这个操作实际上并不会检查所有受影响的对象是否都已被正确重建。


以下查询可用于标识当前数据库中需要刷新的所有排序规则以及依赖于它们的对象：

```sql
SELECT pg_describe_object(refclassid, refobjid, refobjsubid) AS "Collation",
       pg_describe_object(classid, objid, objsubid) AS "Object"
  FROM pg_depend d JOIN pg_collation c
       ON refclassid = 'pg_collation'::regclass AND refobjid = c.oid
  WHERE c.collversion <> pg_collation_actual_version(c.oid)
  ORDER BY 1, 2;
```

## 示例

要将排序规则de_DE重命名为 `german`：

```sql
ALTER COLLATION "de_DE" RENAME TO german;
```

要将排序规则en_US的所有者更改为 `joe`：

```sql
ALTER COLLATION "en_US" OWNER TO joe;
```

## 兼容性

SQL 标准中没有 `ALTER COLLATION` 语句。

## 另见

[`CREATE COLLATION`](/i18n/zh/docusaurus-plugin-content-docs/current/sql-stmts/sql-stmt-create-collation.md), [`DROP COLLATION CREATE COLLATION`](/i18n/zh/docusaurus-plugin-content-docs/current/sql-stmts/sql-stmt-drop-collation.md)、[DROP COLLATION](/i18n/zh/docusaurus-plugin-content-docs/current/sql-stmts/sql-stmt-drop-collation.md)



