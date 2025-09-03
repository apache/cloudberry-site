---
title: ALTER DOMAIN
---

# ALTER DOMAIN

更改域的定义。

## 语法概要

```sql
ALTER DOMAIN <name> { SET DEFAULT <expression> | DROP DEFAULT }

ALTER DOMAIN <name> { SET | DROP } NOT NULL

ALTER DOMAIN <name> ADD <domain_constraint> [ NOT VALID ]

ALTER DOMAIN <name> DROP CONSTRAINT [ IF EXISTS ] <constraint_name> [RESTRICT | CASCADE]

ALTER DOMAIN <name> RENAME CONSTRAINT <constraint_name> TO <new_constraint_name>

ALTER DOMAIN <name> VALIDATE CONSTRAINT <constraint_name>
  
ALTER DOMAIN <name> OWNER TO { <new_owner> | CURRENT_USER | SESSION_USER }
  
ALTER DOMAIN <name> RENAME TO <new_name>

ALTER DOMAIN <name> SET SCHEMA <new_schema>
```

## 描述

ALTER DOMAIN 更改现有域的定义。有几种子形式：

- **SET/DROP DEFAULT** - 这些表单设置或删除域的默认值。请注意，默认值仅适用于后续 `INSERT` 命令。它们不会影响使用域的表中已有的行。

- **SET/DROP NOT NULL** - 这些表单会更改域是标记为允许 NULL 值还是拒绝 NULL 值。您只能 `SET NOT NULL` 当使用域的列不包含空值时。

- **ADD domain_constraint [ NOT VALID ]** - 此形式使用与 [`CREATE DOMAIN`](/i18n/zh/docusaurus-plugin-content-docs/current/sql-stmts/sql-stmt-create-domain.md)。将新约束添加到域时，将根据新添加的约束检查使用该域的所有列。可以通过使用 `NOT VALID` 选项；稍后可以使用以下命令使约束有效 `ALTER DOMAIN ... VALIDATE CONSTRAINT` 。新插入或更新的行始终根据所有约束进行检查，即使是那些标记为 `NOT VALID `。 `NOT VALID`  仅适用于 `CHECK` 约束。

- **DROP CONSTRAINT [ IF EXISTS ]** - 此形式删除了对域的约束。如果如果指定了 `IF EXISTS` 并且约束不存在，则不会抛出任何错误。在这种情况下，将发出通知。

- **RENAME CONSTRAINT** - 此表单更改域上约束的名称。

- **VALIDATE CONSTRAINT** - 此表单验证先前添加为 `NOT VALID` ，即验证域的表列中的所有值都满足指定的约束。

- **OWNER** - 此表单将域的所有者更改为指定的用户。

- **RENAME** - 此表单更改域的名称。

- **SET SCHEMA** - 此形式会更改域的模式。与该域相关联的所有约束也会被移至新的模式中。

您必须拥有该域才能使用 `ALTER DOMAIN` 。要更改域的模式，您还必须对新模式拥有 `CREATE` 权限。要更改所有者，您还必须是新拥有角色的直接或间接成员，并且该角色必须对域的模式拥有 `CREATE` 权限。（这些限制确保更改所有者不会做任何您通过删除并重新创建域无法做到的事情。不过，超级用户仍然可以更改任何域的所有权。）

## 参数

**`name`**

要更改的现有域的名称（可选模式限定）。

**`domain_constraint`**

域的新域约束。

**`constraint_name`**

要删除或重命名的现有约束的名称。

**`NOT VALID`**

不要验证现有列数据的约束有效性。

**`CASCADE`**

自动删除依赖于约束的对象，进而删除依赖于这些对象的所有对象。

**`RESTRICT`**

如果有任何依赖对象，则拒绝删除约束。这是默认行为。

**`new_name`**

域的新名称。

**`new_constraint_name`**

约束的新名称。

**`new_owner`**

域的新所有者的用户名。

**`new_schema`**

域的新模式。

## 注意事项

虽然 `ALTER DOMAIN ADD CONSTRAINT` 尝试验证现有存储的数据是否满足新约束，此检查不是万无一失的，因为该命令无法 "看到" 新插入或更新但尚未提交的表行。如果存在并发作可能插入错误数据的危险，则继续的方法是使用 `NOT VALID` 选项，提交该命令，等待所有事务启动后该提交完成，然后发出 `ALTER DOMAIN VALIDATE CONSTRAINT` 来搜索违反约束的数据。此方法是可靠的，因为一旦提交约束，所有新事务都保证对域类型的新值强制执行它。

当前,如果数据库中任何表的容器类型列(复合列、数组列或范围列)中使用了指定的域或任何派生域，那么 `ALTER DOMAIN ADD CONSTRAINT`、`ALTER DOMAIN VALIDATE CONSTRAINT` 和 `ALTER DOMAIN SET NOT NULL` 操作将会失败。这些操作最终应得到改进，以便能够验证此类嵌套值的新约束。

## 示例

要向域添加 `NOT NULL` 约束:

```sql
ALTER DOMAIN zipcode SET NOT NULL;
```

要从一个域中移除NOT NULL约束:

```sql
ALTER DOMAIN zipcode DROP NOT NULL;
```

要向域添加检查约束:

```sql
ALTER DOMAIN zipcode ADD CONSTRAINT zipchk CHECK (char_length(VALUE) = 5);
```

从域中删除检查约束:

```sql
ALTER DOMAIN zipcode DROP CONSTRAINT zipchk;
```

重命名域上的检查约束:

```sql
ALTER DOMAIN zipcode RENAME CONSTRAINT zipchk TO zip_check;
```

要将域移动到其他模式中，请执行以下作:

```sql
ALTER DOMAIN zipcode SET SCHEMA customers;
```

## 兼容性

`ALTER DOMAIN` 符合 SQL 标准，但 `OWNER` 、 `RENAME` 、 `SET SCHEMA` 和 `VALIDATE CONSTRAINT` 变体除外，这些是 Apache Cloudberry 的扩展。 `ADD CONSTRAINT` 的 `NOT VALID` 也是 Apache Cloudberry 的扩展。

## 另见

[`CREATE DOMAIN`](/i18n/zh/docusaurus-plugin-content-docs/current/sql-stmts/sql-stmt-create-domain.md), [`DROP DOMAIN`](/i18n/zh/docusaurus-plugin-content-docs/current/sql-stmts/sql-stmt-drop-domain.md)

