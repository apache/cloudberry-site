---
title: pg_stat_progress_create_index
---

# pg_stat_progress_create_index

`pg_stat_progress_create_index` 视图提供了 `CREATE INDEX` 和 `REINDEX` 操作进度的实时信息。每一行代表一个当前正在构建索引的后端进程，包含诸如命令类型、当前阶段、已处理的块数和元组数以及分区信息等详细信息。此视图有助于监控和管理长时间运行的索引创建任务。

| 字段 | 类型 | 描述 |
|---|---|---|
| `gp_segment_id` | integer | Segment（或 Coordinator）实例的唯一标识符。（此字段不在 `gp_stat_progress_create_index_summary` 视图中。） |
| `pid` | integer | 后端进程的 ID，如果是在 `gp_stat_progress_create_index_summary` 视图中，则是 Coordinator 进程的 ID。 |
| `datid` | oid | 此后端连接的数据库的对象标识符。 |
| `datname` | name | 此后端连接的数据库名称。 |
| `relid` | oid | 正在创建索引的表的对象标识符。 |
| `index_relid` | oid | 正在创建或重建的索引的对象标识符。由于 Apache Cloudberry 不支持并发（重）索引，此值始终为 `0`。 |
| `command` | text | 正在运行的命令名称：`CREATE INDEX` 或 `REINDEX`。 |
| `phase` | text | 索引创建的当前处理阶段。 |
| `lockers_total` | bigint | 适用的情况下，需要等待的锁总数。 |
| `lockers_done` | bigint | 已经等待的锁数量。 |
| `current_locker_pid` | bigint | 当前正在等待的锁的进程 ID。 |
| `blocks_total` | bigint | 当前阶段要处理的块总数。 |
| `blocks_done` | bigint | 当前阶段已处理的块数。 |
| `tuples_total` | bigint | 当前阶段要处理的元组总数。 |
| `tuples_done` | bigint | 当前阶段已处理的元组数。 |
| `partitions_total` | bigint | 在分区表上创建索引时，此列设置为要创建索引的分区总数。在 `REINDEX` 期间此字段为 0。 |
| `partitions_done` | bigint | 在分区表上创建索引时，此列设置为已完成索引的分区数量。在 `REINDEX` 期间此字段为 0。 |
