---
title: pg_stat_progress_analyze
---

# pg_stat_progress_analyze

`pg_stat_progress_analyze` 视图显示了当前正在运行的 `ANALYZE` 命令的进度。每一行代表一个执行 `ANALYZE` 的后端进程，并提供诸如当前阶段、已采样块数和已计算统计信息等详细信息。该视图有助于监控长时间运行的 `ANALYZE` 操作。

| 字段 | 类型 | 描述 |
|---|---|---|
| `gp_segment_id` | integer |  Segment（或 Coordinator）实例的唯一标识符。（此字段不在 `gp_stat_progress_analyze_summary` 视图中。） |
| `pid` | integer | 后端进程的 ID，如果是在 `gp_stat_progress_analyze_summary` 视图中，则是 Coordinator 进程的 ID。 |
| `datid` | oid | 此后端连接的数据库的对象标识符。 |
| `datname` | name | 此后端连接的数据库名称。 |
| `relid` | oid | 正在分析的表的对象标识符。 |
| `phase` | text | 当前处理阶段。 |
| `sample_blks_total` | bigint | 将采样的堆块总数。 |
| `sample_blks_scanned` | bigint | 已扫描的堆块数。 |
| `ext_stats_total` | bigint | 扩展统计信息的数量。 |
| `ext_stats_computed` | bigint | 已计算的扩展统计信息的数量。此计数器仅在阶段计算扩展统计信息时增加。 |
| `child_tables_total` | bigint | 子表的数量。 |
| `child_tables_done` | bigint | 已扫描的子表的数量。此计数器仅在阶段获取继承的样本行时增加。 |
| `current_child_table_relid` | oid | 当前正在扫描的子表的对象标识符。此字段仅在阶段获取继承的样本行时有效。（此字段不在 `gp_stat_progress_analyze_summary` 视图中。） |
