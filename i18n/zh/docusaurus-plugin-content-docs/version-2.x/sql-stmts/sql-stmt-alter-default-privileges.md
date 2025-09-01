---
title: ALTER DEFAULT PRIVILEGES
---

# ALTER DEFAULT PRIVILEGES

更改默认访问权限。

## 语法概要

```sql

ALTER DEFAULT PRIVILEGES
    [ FOR { ROLE | USER } <target_role> [, ...] ]
    [ IN SCHEMA <schema_name> [, ...] ]
    <abbreviated_grant_or_revoke>

--  上面 <abbreviated_grant_or_revoke> 可以是:

GRANT { { SELECT | INSERT | UPDATE | DELETE | TRUNCATE | REFERENCES | TRIGGER }
    [, ...] | ALL [ PRIVILEGES ] }
    ON TABLES
    TO { [ GROUP ] <role_name> | PUBLIC } [, ...] [ WITH GRANT OPTION ]

GRANT { { USAGE | SELECT | UPDATE }
    [, ...] | ALL [ PRIVILEGES ] }
    ON SEQUENCES
    TO { [ GROUP ] <role_name> | PUBLIC } [, ...] [ WITH GRANT OPTION ]

GRANT { EXECUTE | ALL [ PRIVILEGES ] }
    ON { FUNCTIONS | ROUTINES }
    TO { [ GROUP ] <role_name> | PUBLIC } [, ...] [ WITH GRANT OPTION ]

GRANT { USAGE | ALL [ PRIVILEGES ] }
    ON TYPES
    TO { [ GROUP ] <role_name> | PUBLIC } [, ...] [ WITH GRANT OPTION ]

GRANT { USAGE | CREATE | ALL [ PRIVILEGES ] }
    ON SCHEMAS
    TO { [ GROUP ] <role_name> | PUBLIC } [, ...] [ WITH GRANT OPTION ]

REVOKE [ GRANT OPTION FOR ]
    { { SELECT | INSERT | UPDATE | DELETE | TRUNCATE | REFERENCES | TRIGGER }
    [, ...] | ALL [ PRIVILEGES ] }
    ON TABLES
    FROM { [ GROUP ] <role_name> | PUBLIC } [, ...]
    [ CASCADE | RESTRICT ]

REVOKE [ GRANT OPTION FOR ]
    { { USAGE | SELECT | UPDATE }
    [, ...] | ALL [ PRIVILEGES ] }
    ON SEQUENCES
    FROM { [ GROUP ] <role_name> | PUBLIC } [, ...]
    [ CASCADE | RESTRICT ]

REVOKE [ GRANT OPTION FOR ]
    { EXECUTE | ALL [ PRIVILEGES ] }
    ON { FUNCTIONS | ROUTINES }
    FROM { [ GROUP ] <role_name> | PUBLIC } [, ...]
    [ CASCADE | RESTRICT ]

REVOKE [ GRANT OPTION FOR ]
    { USAGE | ALL [ PRIVILEGES ] }
    ON TYPES
    FROM { [ GROUP ] <role_name> | PUBLIC } [, ...]
    [ CASCADE | RESTRICT ]

REVOKE [ GRANT OPTION FOR ]
    { USAGE | CREATE | ALL [ PRIVILEGES ] }
    ON SCHEMAS
    FROM { [ GROUP ] <role_name> | PUBLIC } [, ...]
    [ CASCADE | RESTRICT ]
```

## 描述

`ALTER DEFAULT PRIVILEGES` 允许您设置将应用于将来创建的对象的权限。(它不会影响分配给现有对象的权限)。目前,只能更改模式、表（包括视图和外部表）、序列、函数和类型（包括域）的权限。对于此命令，函数包括聚合和过程。这句 `FUNCTIONS` 和 `ROUTINES` 在此命令中是等效的。( `ROUTINES` 是今后的首选，作为功能和过程组合在一起的标准术语。在早期的 Apache Cloudberry 版本中，只有单词 `FUNCTIONS` 被允许。无法单独设置函数和过程的默认权限。 )

只能更改将由您自己或您所属的角色创建的对象的默认权限。权限可以全局设置(即，针对在当前数据库中创建的所有对象)，也可以仅针对在指定模式中创建的对象设置权限。

正如在 [`GRANT`](/i18n/zh/docusaurus-plugin-content-docs/current/sql-stmts/sql-stmt-grant.md) 下所解释的，任何对象类型的默认权限通常会将所有可授予的权限授予对象所有者，并且可能也会将一些权限授予 `PUBLIC` 。不过，通过使用 `ALTER DEFAULT PRIVILEGES` 修改全局默认权限，可以改变这种行为。

每个模式指定的默认权限将添加到特定对象类型的任何全局默认权限中。这意味着如果全局授予每个模式的权限(默认情况下，或根据先前的 `ALTER DEFAULT PRIVILEGES` 未指定模式的命令)。每个模式 `REVOKE` 仅对逆转先前每个模式的效果有用 `GRANT` 。

## 参数

**`target_role`**

当前角色所属的现有角色的名称。如果 `FOR ROLE` 被省略，则承担当前角色。

**`schema_name`**

现有模式的名称。如果指定，则更改稍后在该架构中创建的对象的默认权限。如果 `IN SCHEMA` 被省略，全局默认权限被更改。`IN SCHEMA` 在设置模式权限时不允许，因为模式不能嵌套。

**`role_name`**

要授予或撤销权限的现有角色的名称。此参数以及 `abbreviated_grant_or_revoke` 中的所有其他参数的作用如下所述`GRANT` 或 `REVOKE` , 只不过是为整个对象而不是特定的命名对象设置权限。

## 注意事项

使用 `psql` 的 `\ddp` 命令以获取有关现有默认权限分配的信息。特权值的含义与在 [`GRANT`](/i18n/zh/docusaurus-plugin-content-docs/current/sql-stmts/sql-stmt-grant.md) 下对 `\dp` 的解释相同。

如果要删除已更改其默认权限的角色，则必须撤消其默认权限的更改或使用 `DROP OWNED BY` 以删除角色的默认权限。

## 示例

在模式 `myschema` 中的所有表(和视图) 向所有人授予 SELECT 权限，并允许角色 `webuser` 能向这些表中插入数据:

```sql
ALTER DEFAULT PRIVILEGES IN SCHEMA myschema GRANT SELECT ON TABLES TO PUBLIC;
ALTER DEFAULT PRIVILEGES IN SCHEMA myschema GRANT INSERT ON TABLES TO webuser;
```

撤消上面的操作，这样 subsequently-created 表就不会拥有比正常情况更多的权限:

```sql
ALTER DEFAULT PRIVILEGES IN SCHEMA myschema REVOKE SELECT ON TABLES FROM PUBLIC;
ALTER DEFAULT PRIVILEGES IN SCHEMA myschema REVOKE INSERT ON TABLES FROM webuser;
```

移除通常授予函数的公共 `EXECUTE` 权限，该权限适用于角色 `admin` 后续创建的所有函数：

```sql
ALTER DEFAULT PRIVILEGES FOR ROLE admin REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC;
```

但是请注意，您无法使用仅限于单个模式的命令来实现该效果。以下命令无效，除非它正在撤消匹配的 `GRANT`:

```sql
ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC;
```

这是因为每个模式的默认权限只能向全局设置添加权限，而不能删除它授予的权限。

## 兼容性

SQL 标准中没有 `ALTER DEFAULT PRIVILEGES` 语句。

## 另见

[`GRANT`](/i18n/zh/docusaurus-plugin-content-docs/current/sql-stmts/sql-stmt-grant.md) , [`REVOKE`](/i18n/zh/docusaurus-plugin-content-docs/current/sql-stmts/sql-stmt-revoke.md)

