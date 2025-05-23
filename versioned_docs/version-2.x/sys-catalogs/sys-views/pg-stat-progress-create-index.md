---
title: pg_stat_progress_create_index
---

# pg_stat_progress_create_index

The `pg_stat_progress_create_index` view provides real-time information about the progress of `CREATE INDEX` and `REINDEX` operations. Each row represents a backend process currently building an index and includes details such as the command type, current phase, number of blocks and tuples processed, and partitioning information. This view is useful for monitoring and managing long-running index creation tasks.

|Column|Type|Description|
|------|----|-----------|
|`gp_segment_id`|integer| Unique identifier of a segment (or coordinator) instance. (This column is not present in the `gp_stat_progress_create_index_summary` view.)|
| `pid` | integer | Process identifier of the backend, or the coordinator process identifier if the `gp_stat_progress_create_index_summary` view. |
| `datid` | oid | The object identifer of the database to which this backend is connected. |
| `datname` | name | Name of the database to which this backend is connected. |
| `relid` | oid | The object identifer of the table on which the index is being created. |
| `index_relid` | oid | The object identifer of the index being created or reindexed. Because Apache Cloudberry does not support concurrent (re)indexing, this value is always `0`. |
| `command` | text | The name of the command that is running: `CREATE INDEX` or `REINDEX`. |
| `phase` | text | Current processing phase of index creation.  |
| `lockers_total` | bigint | Total number of lockers to wait for, when applicable. |
| `lockers_done` | bigint | Number of lockers already waited for. |
| `current_locker_pid` | bigint | The process identifier of the locker currently being waited for. |
| `blocks_total` | bigint | Total number of blocks to be processed in the current phase. |
| `blocks_done` | bigint | Number of blocks already processed in the current phase. |
| `tuples_total` | bigint | Total number of tuples to be processed in the current phase. |
| `tuples_done` | bigint | Number of tuples already processed in the current phase. |
| `partitions_total` | bigint | When creating an index on a partitioned table, this column is set to the total number of partitions on which the index is to be created. This field is 0 during a `REINDEX`. |
| `partitions_done` | bigint | When creating an index on a partitioned table, this column is set to the number of partitions on which the index has been completed. This field is 0 during a `REINDEX`. |
