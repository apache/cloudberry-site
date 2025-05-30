---
title: pg_policy
---

# pg_policy

`pg_policy` 系统目录表用于存储表的行级安全策略。每个策略包括适用的命令类型（也可以适用于所有命令）、适用的角色、用于查询中的安全屏障限定条件的表达式，以及用于插入新记录时的 `WITH CHECK` 表达式。

| 列名         | 类型         | 引用              | 说明                                                                 |
|--------------|--------------|-------------------|----------------------------------------------------------------------|
| `oid`        | oid          |                   | 对象标识符（Object ID）                                              |
| `polname`    | name         |                   | 策略名称                                                             |
| `polerelid`  | oid          | pg_class.oid      | 该策略所作用的表                                                     |
| `polcmd`     | char         |                   | 策略所适用的命令类型：`r` 表示 `SELECT`，`a` 表示 `INSERT`，`w` 表示 `UPDATE`，`d` 表示 `DELETE`，`*` 表示适用于所有命令 |
| `polpermissive` | boolean   |                   | 策略是宽松的（允许更多操作）还是限制的（严格限制操作）               |
| `polroles`   | ARRAY        | pg_authid.oid     | 该策略适用的角色                                                     |
| `polqual`    | pg_node_tree |                   | 将添加到使用该表的查询中的安全屏障限定条件的表达式树                  |
| `polwithcheck` | pg_node_tree |                   | 将添加到插入新记录时的 `WITH CHECK` 限定条件的表达式树                |

:::note 注意
只有当表的 `pg_class.relrowsecurity` 设置为启用时，Apache Cloudberry 才会应用 `pg_policy` 中存储的策略。
:::