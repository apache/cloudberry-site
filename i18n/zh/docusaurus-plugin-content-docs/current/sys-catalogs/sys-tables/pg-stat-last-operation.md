---
title: pg_stat_last_operation
---

# pg_stat_last_operation

`pg_stat_last_operation` 表用于记录数据库对象（如表、视图）的操作元数据跟踪信息。

| 列名          | 类型                     | 引用                  | 说明                                                                 |
|---------------|--------------------------|-----------------------|----------------------------------------------------------------------|
| `classid`     | oid                      | pg_class.oid          | 包含该对象的系统目录表的 OID。                                        |
| `objid`       | oid                      | 任意 OID 类型列       | 该对象在其系统目录中的 OID。                                         |
| `staactionname` | name                   |                       | 对该对象执行的操作名称。                                             |
| `stasysid`    | oid                      | pg_authid.oid         | 指向 `pg_authid.oid` 的外键。                                        |
| `stausename`  | name                     |                       | 执行该操作的角色名称。                                               |
| `stasubtype`  | text                     |                       | 被操作对象的类型，或所执行操作的子类型。                             |
| `statime`     | timestamp with timezone |                       | 操作的时间戳。如果需要在 Apache Cloudberry 的日志文件中查找该操作的详细信息，可以使用此时间戳进行比对。 |

`pg_stat_last_operation` 表记录了数据库对象的操作跟踪信息，包括对象 ID、DDL 操作类型、执行用户、对象类型以及操作时间戳。每当数据库对象被创建、修改、截断（TRUNCATE）、清理（VACUUM）、分析（ANALYZE）、分区，或授予权限时，Apache Cloudberry 会更新该表。

如果你希望跟踪某个特定对象上的操作，可以使用该对象的 `objid` 值进行查询。由于 `stasubtype` 既可能表示被操作对象的类型，也可能表示操作的子类型，因此不建议将其作为查询条件。

以下示例展示了如何在创建和替换视图后，使用 `objid` 作为查询条件在 `pg_stat_last_operation` 表中查看相关操作记录：

```sql
testdb=# CREATE VIEW trial AS SELECT * FROM gp_segment_configuration;

CREATE VIEW

testdb=# CREATE OR REPLACE VIEW trial AS SELECT * FROM gp_segment_configuration;

CREATE VIEW

testdb=# SELECT * FROM pg_stat_last_operation WHERE objid='trial'::regclass::oid;

 classid | objid | staactionname | stasysid | stausename | stasubtype |            statime            
---------+-------+---------------+----------+------------+------------+-------------------------------
  1259   | 24735 | CREATE         |       10 | gpadmin    | VIEW       | 2020-04-07 16:44:28.808811+00
  1259   | 24735 | ALTER          |       10 | gpadmin    | SET        | 2020-04-07 16:44:38.110615+00
(2 rows)
```

注意：对于视图的 `REPLAC`E 操作，`pg_stat_last_operation` 表中记录的操作类型为 `ALTER` (`staactionname`)，操作子类型为 `SET` (`stasubtype`)。
