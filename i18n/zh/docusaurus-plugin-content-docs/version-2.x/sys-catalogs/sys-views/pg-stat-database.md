---
title: pg_stat_database
---

# pg_stat_database

`pg_stat_database` 视图提供了集群中每个数据库的累积统计信息。它包括诸如已提交和已回滚事务的数量、磁盘块读取和缓存命中、返回或获取的元组、以及插入、更新和删除的行数等指标。此视图对于监控整体数据库活动和性能非常有用。

| 字段 | 类型 | 引用 | 描述 |
|---|---|---|---|
| `gp_segment_id` | integer | | Segment（或 Coordinator）实例的唯一标识符。 |
| `datid` | oid | | 此数据库的 OID，或者对于属于共享关系的对象为 0。 |
| `datname` | name | | 此数据库的名称，或者对于共享对象为 NULL。 |
| `numbackends` | integer | | 当前连接到此数据库的后端数量，或者对于共享对象为 NULL。这是此视图中唯一返回反映当前状态值的字段；所有其他字段均返回自上次重置以来的累积值。 |
| `xact_commit` | bigint | | 此数据库中已提交的事务数量。 |
| `xact_rollback` | bigint | | 此数据库中已回滚的事务数量。 |
| `blks_read` | bigint | | 此数据库中读取的磁盘块数量。 |
| `blks_hit` | bigint | | 在缓冲区缓存中已找到磁盘块的次数，因此无需读取（这仅包括 PostgreSQL 缓冲区缓存中的命中，不包括操作系统的文件系统缓存）。 |
| `tup_returned` | bigint | | 此数据库中通过顺序扫描获取的活动行数和通过索引扫描返回的索引条目数。 |
| `tup_fetched` | bigint | | 此数据库中通过索引扫描获取的活动行数。 |
| `tup_inserted` | bigint | | 此数据库中通过查询插入的行数。 |
| `tup_updated` | bigint | | 此数据库中通过查询更新的行数。 |
| `tup_deleted` | bigint | | 此数据库中通过查询删除的行数。 |
| `conflicts` | bigint | | 此数据库中因与恢复冲突而取消的查询数量。 |
| `temp_files` | bigint | | 此数据库中通过查询创建的临时文件数量。所有临时文件均被计数，无论创建临时文件的原因（例如，排序或哈希），也无论 `log_temp_files` 设置如何。 |
| `temp_bytes` | bigint | | 此数据库中通过查询写入临时文件的总数据量。所有临时文件均被计数，无论创建临时文件的原因，也无论 `log_temp_files` 设置如何。 |
| `deadlocks` | bigint | | 此数据库中检测到的死锁数量。 |
| `checksum_failures` | bigint | | 此数据库中（或在共享对象上）检测到的数据页校验和失败数量，如果未启用数据校验和则为 NULL。 |
| `checksum_last_failure` | timestamp with time zone | | 此数据库中（或在共享对象上）上次检测到数据页校验和失败的时间，如果未启用数据校验和则为 NULL。 |
| `blk_read_time` | double precision | | 此数据库中后端读取数据文件块所花费的时间，单位为毫秒（如果启用 `track_io_timing`，否则为零）。 |
| `session_time` | double precision | | 此数据库中会话所花费的时间，单位为毫秒（请注意，统计信息仅在会话状态更改时更新，因此如果会话长时间空闲，此空闲时间将不包含在内）。 |
| `active_time` | double precision | | 此数据库中执行 SQL 语句所花费的时间，单位为毫秒（这对应于 `pg_stat_activity` 中的 `active` 和 `fastpath function call` 状态）。 |
| `idle_in_transaction_time` | double precision | | 此数据库中在事务中空闲所花费的时间，单位为毫秒（这对应于 `gp_stat_activity` 中的 `idle in transaction` 和 `idle in transaction (aborted)` 状态）。 |
| `sessions` | bigint | | 到此数据库建立的会话总数。 |
| `sessions_abandoned` | bigint | | 到此数据库的数据库会话因与客户端连接丢失而被终止的数量。 |
| `sessions_fatal` | bigint | | 到此数据库的数据库会话因致命错误而被终止的数量。 |
| `sessions_killed` | bigint | | 到此数据库的数据库会话因操作员干预而被终止的数量。 |
| `stats_reset` | timestamp with time zone | | 上次重置这些统计信息的时间。 |
