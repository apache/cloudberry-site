---
title: pg_stat_progress_cluster
---

# pg_stat_progress_cluster

`pg_stat_progress_cluster` 视图显示了 `CLUSTER` 和 `VACUUM FULL` 操作的进度。每一行代表一个当前正在执行这些命令的后端进程，提供诸如当前阶段、已扫描和写入的堆块数以及重建的索引等详细信息。该视图有助于监控和管理长时间运行的表重组任务。

| 字段 | 类型 | 描述 |
|---|---|---|
| `gp_segment_id` | integer | Segment（或 Coordinator）实例的唯一标识符。（此字段不在 `gp_stat_progress_cluster_summary` 视图中。） |
| `pid` | integer | 后端进程的 ID，如果是在 `gp_stat_progress_cluster_summary` 视图中，则是 Coordinator 进程的 ID。 |
| `datid` | oid | 此后端连接的数据库的对象标识符。 |
| `datname` | name | 此后端连接的数据库名称。 |
| `relid` | `oid` | 正在进行聚簇操作的表的对象标识符。 |
| `command` | text | 正在运行的命令名称，可以是 `CLUSTER` 或 `VACUUM FULL`。 |
| `phase` | text | 当前处理阶段。 |
| `cluster_index_relid` | oid | 如果表正在使用索引进行扫描，这是正在使用的索引的对象标识符；否则为零。此字段不适用于 AO/CO 表。 |
| `heap_tuples_scanned` | bigint | 对于堆表，`heap_tuples_scanned` 记录了已扫描的元组数量，包括活动元组和死亡元组。对于 AO 表，`heap_tuples_scanned` 记录了已扫描的活动元组数量，不包括死亡元组。此计数器仅在阶段为 `seq scanning append-optimized`、`seq scanning heap`、`index scanning heap` 或 `writing new heap` 时增加。对于 AO/CO 表，Apache Cloudberry 会将字节大小转换为等效的堆块大小。 |
| `heap_tuples_written` | bigint | 已写入的元组数量。此计数器仅在阶段为 `seq scanning heap`、`index scanning heap`、`writing new append-optimized` 或 `writing new heap` 时增加。 |
| `heap_blks_total` | bigint | 表中堆块的总数。此数量在 `seq scanning heap` 开始时报告。对于 AO/CO 表，Apache Cloudberry 会将字节大小转换为等效的堆块大小。 |
| `heap_blks_scanned` | bigint | 已扫描的堆块数。此计数器仅在阶段为 `seq scanning heap` 时增加。对于 AO/CO 表，Apache Cloudberry 会将字节大小转换为等效的堆块大小。 |
| `index_rebuild_count` | bigint | 已重建的索引数量。此计数器仅在阶段为 `rebuilding index` 时增加，不适用于 AO/CO 表。 |
