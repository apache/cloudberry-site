---
title: pg_trigger
---

# pg_trigger

`pg_trigger` 系统目录表用于存储表上的触发器信息。

:::note 注意
Apache Cloudberry 不支持触发器。
:::

| 列名          | 类型       | 引用                          | 说明                                                                 |
|---------------|------------|-------------------------------|----------------------------------------------------------------------|
| `oid`         | oid        |                               | 对象标识符（Object ID）。                                             |
| `tgrelid`     | oid        | *pg_class.oid*<br/><br/>注意：Apache Cloudberry 不强制引用完整性。 | 触发器所作用的表。                                                   |
| `tgparentid`  | oid        | *pg_trigger.oid*              | 父触发器的 OID。如果该触发器是从其他触发器克隆（例如分区表），则为其来源触发器的 OID；如果不是克隆的，则值为 0。 |
| `tgname`      | name       |                               | 触发器名称（在同一个表中必须唯一）。                                   |
| `tgfoid`      | oid        | *pg_proc.oid*<br/><br/>注意：Apache Cloudberry 不强制引用完整性。 | 触发器调用的函数。                                                   |
| `tgtype`      | smallint   |                               | 用于标识触发条件的位掩码（bit mask）。                                 |
| `tgenabled`   | char       |                               | 触发器是否启用。                                                      |
| `tgisinternal`| boolean    |                               | 是否为系统自动生成的触发器（通常用于约束检查，见 `tgconstraint`）。     |
| `tgconstrrelid` | oid      | *pg_class.oid*<br/><br/>注意：Apache Cloudberry 不强制引用完整性。 | 被引用约束所指向的表。                                               |
| `tgconstrindid`| oid       | *pg_class.oid*                | 用于支持唯一性、主键或引用完整性约束的索引。                           |
| `tgconstraint`| oid        | *pg_constraint.oid*           | 与该触发器关联的 `pg_constraint` 条目的 OID（如果存在）。             |
| `tgdeferrable`| boolean    |                               | 是否为可延迟触发器。                                                  |
| `tginitdeferred` | boolean  |                               | 是否在事务开始时就处于延迟状态。                                       |
| `tgnargs`     | smallint   |                               | 传递给触发器函数的参数个数。                                           |
| `tgattr`      | ARRAY      |                               | 当前未使用。                                                          |
| `tgargs`      | bytea      |                               | 传递给触发器函数的参数字符串，每个参数以 NULL 结尾。                   |
| `tgqual`      | pg_node_tree |                               | 触发器 `WHEN` 条件的表达式树（使用 `nodeToString()` 表示），如果没有条件则为 null。 |
| `tgoldtable`  | name       |                               | 旧转换表的名称（transition table），若无则为 NULL。                     |
| `tgnewtable`  | name       |                               | 新转换表的名称，若无则为 NULL。                                       |
