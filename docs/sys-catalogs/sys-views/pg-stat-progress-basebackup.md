---
title: pg_stat_progress_basebackup
---

# pg_stat_progress_basebackup

The `pg_stat_progress_basebackup` view shows the progress of base backups initiated by tools like `pg_basebackup`. Each row represents a WAL sender process currently performing a `BASE_BACKUP` command, detailing information such as the current phase, estimated total data size, data streamed so far, and tablespaces processed. This view helps monitor and manage ongoing base backup operations. 

|Column|Type|Description|
|------|----|-----------|
|`gp_segment_id`|integer| Unique identifier of a segment (or coordinator) instance. (This column is not present in the `gp_stat_progress_basebackup_summary` view.)|
| `pid` | integer | The process identifier of a WAL sender process, or the coordinator process identifier if the `gp_stat_progress_basebackup_summary` view. |
| `phase` | text | Current processing phase.  |
| `backup_total` | bigint | Total amount of data that will be streamed. This is estimated and reported as of the beginning of streaming database files phase. Note that this is only an approximation since the database may change during streaming database files phase and WAL log may be included in the backup later. This is always the same value as backup_streamed once the amount of data streamed exceeds the estimated total size. NULL if the estimation is disabled in `pg_basebackup`. |
| `backup_streamed` | bigint | Amount of data streamed. This counter only advances when the phase is streaming database files or transferring wal files. |
| `tablespaces_total` | bigint | Total number of tablespaces that will be streamed. |
| `tablespaces_streamed` | bigint | Number of tablespaces streamed. This counter only advances when the phase is streaming database files. |
