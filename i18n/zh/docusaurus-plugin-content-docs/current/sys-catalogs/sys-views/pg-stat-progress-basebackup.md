---
title: pg_stat_progress_basebackup
---

# pg_stat_progress_basebackup

`pg_stat_progress_basebackup` 视图显示了由 `pg_basebackup` 等工具启动的基础备份的进度。每一行代表一个当前正在执行 `BASE_BACKUP` 命令的 WAL 发送进程，详细说明了当前阶段、估计的总数据大小、已传输的数据量以及已处理的表空间。该视图有助于监控和管理正在进行的基础备份操作。

| 字段 | 类型 | 描述 |
|---|---|---|
| `gp_segment_id` | integer | Segment（或 Coordinator）实例的唯一标识符。（此字段不在 `gp_stat_progress_basebackup_summary` 视图中。） |
| `pid` | integer | WAL 发送进程的进程 ID，如果是在 `gp_stat_progress_basebackup_summary` 视图中，则是 Coordinator 进程的 ID。 |
| `phase` | text | 当前处理阶段。 |
| `backup_total` | bigint | 将要传输的数据总量。这是在开始传输数据库文件阶段时估计并报告的。请注意，这只是一个近似值，因为在传输数据库文件阶段数据库可能会发生变化，并且 WAL 日志可能会在稍后包含在备份中。一旦传输的数据量超过估计的总大小，此值将始终与 `backup_streamed` 相同。如果 `pg_basebackup` 中禁用估计，则为 NULL。 |
| `backup_streamed` | bigint | 已传输的数据量。此计数器仅在阶段传输数据库文件或传输 WAL 文件时增加。 |
| `tablespaces_total` | bigint | 将要传输的表空间总数。 |
| `tablespaces_streamed` | bigint | 已传输的表空间数量。此计数器仅在阶段传输数据库文件时增加。 |
