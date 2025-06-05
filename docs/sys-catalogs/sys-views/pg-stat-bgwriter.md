---
title: pg_stat_bgwriter
---

# pg_stat_bgwriter

The `pg_stat_bgwriter` view provides cumulative statistics about the background writer process, which is responsible for writing dirty buffers to disk in the background. This view helps monitor the efficiency of the background writer and overall buffer management. It includes metrics such as the number of buffers written during checkpoints, buffers cleaned by the background writer, and buffers written directly by backend processes. These statistics are useful for tuning database performance and understanding write activity patterns.

|column|type|references|description|
|------|----|----------|-----------|
|`checkpoints_timed`|bigint| |Number of scheduled checkpoints that have been performed.|
|`checkpoints_req`|bigint| |Number of requested checkpoints that have been performed.|
|`checkpoint_write_time`|double precision| |Total amount of time that has been spent in the portion of checkpoint processing where files are written to disk, in milliseconds.|
|`checkpoint_sync_time`|double precision| |Total amount of time that has been spent in the portion of checkpoint processing where files are synchronized to disk, in milliseconds.|
|`buffers_checkpoint`|bigint| |Number of buffers written during checkpoints.|
|`buffers_clean`|bigint| |Number of buffers written by the background writer.|
|`maxwritten_clean` | bigint| |Number of times the background writer stopped a cleaning scan because it had written too many buffers.|
|`buffers_backend`|  bigint| |Number of buffers written directly by a backend.|
|`buffers_backend_fsync` | bigint| |Number of times the background writer stopped a cleaning scan because it had written too many buffers.|
|`buffers_alloc`|bigint| |Number of buffers allocated.|
|`stats_reset`|timestamp with time zone| |Time at which these statistics were last reset.|
