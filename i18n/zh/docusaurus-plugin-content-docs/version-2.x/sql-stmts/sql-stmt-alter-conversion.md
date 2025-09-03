---
title: ALTER CONVERSION
---

# ALTER CONVERSION

修改转换的定义。

## 语法概要

```sql
ALTER CONVERSION <name> RENAME TO <new_name>

ALTER CONVERSION <name> OWNER TO { <new_owner> | CURRENT_USER | SESSION_USER }

ALTER CONVERSION <name> SET SCHEMA <new_schema>
```

## 描述

`ALTER CONVERSION` 用于修改转换的定义。

您必须拥有该转换才能使用 `ALTER CONVERSION` 。要更改所有者，您还必须是新拥有角色的直接或间接成员，并且该角色必须对转换的模式拥有 `CREATE` 权限。（这些限制确保更改所有者不会执行任何您通过删除并重新创建转换无法执行的操作。不过，超级用户仍然可以更改任何转换的所有权。）

## 参数

**`name`**

现有转换的名称（可选模式限定）。

**`new_name`**

转换的新名称。

**`new_owner`**

转换的新所有者。

**`new_schema`**

转换的新模式。

## 示例

要将转换 `iso_8859_1_to_utf8` 重命名为 `latin1_to_unicode` :

```sql
ALTER CONVERSION iso_8859_1_to_utf8 RENAME TO latin1_to_unicode;
```

要将转换 `iso_8859_1_to_utf8` 的所有者更改为 `joe` :

```sql
ALTER CONVERSION iso_8859_1_to_utf8 OWNER TO joe;
```

## 兼容性

SQL 标准中没有 `ALTER CONVERSION` 语句。

## 另见

[`CREATE CONVERSION`](/i18n/zh/docusaurus-plugin-content-docs/current/sql-stmts/sql-stmt-create-conversion.md), [`DROP CONVERSION`](/i18n/zh/docusaurus-plugin-content-docs/current/sql-stmts/sql-stmt-drop-conversion.md)