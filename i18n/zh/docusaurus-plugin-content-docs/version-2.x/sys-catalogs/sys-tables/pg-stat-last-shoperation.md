---
title: pg_stat_last_shoperation
---

# pg_stat_last_shoperation

`pg_stat_last_shoperation` 表用于记录全局对象（如角色和表空间）的操作元数据跟踪信息。

| 列名          | 类型                     | 引用                  | 说明                                                                 |
|---------------|--------------------------|-----------------------|----------------------------------------------------------------------|
| `classid`     | oid                      | pg_class.oid          | 包含该对象的系统目录表的 OID。                                        |
| `objid`       | oid                      | 任意 OID 类型列       | 该对象在其系统目录中的 OID。                                         |
| `staactionname` | name                   |                       | 对该对象执行的操作名称。                                             |
| `stasysid`    | oid                      |                       | 执行该操作的角色的 OID。                                             |
| `stausename`  | name                     |                       | 执行该操作的角色名称。                                               |
| `stasubtype`  | text                     |                       | 被操作对象的类型，或所执行操作的子类型。                             |
| `statime`     | timestamp with timezone |                       | 操作的时间戳。如果需要在 Apache Cloudberry 的日志文件中查找该操作的详细信息，可以使用该时间戳进行比对。 |

该表记录了全局对象的操作历史，包括操作类型、执行用户、对象类型以及操作时间戳。每当全局对象（如角色、表空间等）被创建、修改或删除时，`pg_stat_last_shoperation` 表会自动更新相关信息。
