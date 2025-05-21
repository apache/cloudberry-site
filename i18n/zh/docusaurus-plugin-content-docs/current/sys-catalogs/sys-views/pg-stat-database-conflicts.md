---
title: pg_stat_database_conflicts
---

# pg_stat_database_conflicts

`pg_stat_database_conflicts` 视图提供了 Apache Cloudberry 备用服务器上因恢复冲突导致查询取消的统计信息。每一行对应一个数据库，并包含因各种冲突类型（例如表空间被删除、锁超时、旧快照、缓冲区固定和死锁）而导致的取消次数。该视图有助于监控和诊断备用服务器上与复制冲突相关的问题。

| 字段 | 类型 | 引用 | 描述 |
|---|---|---|---|
| `datid` | oid | | 数据库的 OID。 |
| `datname` | name | | 数据库名称。 |
| `confl_tablespace` | bigint | | 此数据库中因表空间被删除而取消的查询数量。 |
| `confl_lock` | bigint | | 此数据库中因锁超时而取消的查询数量。 |
| `confl_snapshot` | bigint | | 此数据库中因旧快照而取消的查询数量。 |
| `confl_bufferpin` | bigint | | 此数据库中因缓冲区固定而取消的查询数量。 |
| `confl_deadlock` | bigint | | 此数据库中因死锁而取消的查询数量。 |
