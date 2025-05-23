---
title: pg_stat_bgwriter
---

# pg_stat_bgwriter

`pg_stat_bgwriter` 视图提供了关于后台写入进程的累积统计信息，该进程负责将脏缓冲区异步写入磁盘。此视图有助于监控后台写入器的效率和整体缓冲区管理。它包括诸如检查点期间写入的缓冲区数量、后台写入器清理的缓冲区数量以及由后端进程直接写入的缓冲区数量等指标。这些统计信息对于调整数据库性能和理解写入活动模式非常有用。

| 字段 | 类型 | 引用 | 描述 |
|---|---|---|---|
| `checkpoints_timed` | bigint | | 已执行的计划检查点数量。 |
| `checkpoints_req` | bigint | | 已执行的请求检查点数量。 |
| `checkpoint_write_time` | double precision | | 检查点处理中文件写入磁盘部分所花费的总时间，单位为毫秒。 |
| `checkpoint_sync_time` | double precision | | 检查点处理中文件同步到磁盘部分所花费的总时间，单位为毫秒。 |
| `buffers_checkpoint` | bigint | | 检查点期间写入的缓冲区数量。 |
| `buffers_clean` | bigint | | 后台写入器写入的缓冲区数量。 |
| `maxwritten_clean` | bigint | | 后台写入器因写入过多缓冲区而停止清理扫描的次数。 |
| `buffers_backend` | bigint | | 后端直接写入的缓冲区数量。 |
| `buffers_backend_fsync` | bigint | | 后台写入器因写入过多缓冲区而停止清理扫描的次数。 |
| `buffers_alloc` | bigint | | 已分配的缓冲区数量。 |
| `stats_reset` | timestamp with time zone | | 上次重置这些统计信息的时间。 |
