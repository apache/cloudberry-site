---
title: pg_stat_operations
---

# pg_stat_operations

`pg_stat_operations` 视图显示了对数据库对象（如表、索引、视图或数据库）或全局对象（如角色）执行的上次操作的详细信息。

| 字段 | 类型 | 引用 | 描述 |
|---|---|---|---|
| `classname` | text | | `pg_catalog` 模式中存储此对象记录的系统表的名称（`pg_class`=关系，`pg_database`=数据库，`pg_namespace`=模式，`pg_authid`=角色）。 |
| `objname` | name | | 对象的名称。 |
| `objid` | oid | | 对象的 OID。 |
| `schemaname` | name | | 对象所在的模式名称。 |
| `usestatus` | text | | 对对象执行上次操作的角色的状态（`CURRENT`=系统中当前活跃的角色，`DROPPED`=系统中不再存在的角色，`CHANGED`=系统中存在但自上次操作以来名称已更改的角色）。 |
| `usename` | name | | 对此对象执行操作的角色的名称。 |
| `actionname` | name | | 对对象执行的操作。 |
| `subtype` | text | | 操作对象的类型或执行操作的子类别。 |
| `statime` | timestamptz | | 操作的时间戳。此时间戳与写入 Apache Cloudberry 服务器日志文件的时间戳相同，如果你需要在日志中查找有关操作的更详细信息。 |
