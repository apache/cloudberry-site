---
title: pg_stat_database
---

# pg_stat_database

The `pg_stat_database` view provides cumulative statistics for each database in the cluster. It includes metrics such as the number of committed and rolled-back transactions, disk block reads and cache hits, tuples returned or fetched, and counts of inserted, updated, and deleted rows. This view is useful for monitoring overall database activity and performance.

|column|type|references|description|
|------|----|----------|-----------|
|`gp_segment_id`|integer| |Unique identifier of a segment (or coordinator) instance.|
|`datid`|oid| |OID of this database, or 0 for objects belonging to a shared relation.|
|`datname`|name| |Name of this database, or NULL for shared objects.|
|`numbackends`|integer| |Number of backends currently connected to this database, or NULL for shared objects. This is the only column in this view that returns a value reflecting current state; all other columns return the accumulated values since the last reset.|
|`xact_commit`|bigint| |Number of transactions in this database that have been committed.|
|`xact_rollback`|bigint| |Number of transactions in this database that have been rolled back.|
|`blks_read`|bigint| |Number of disk blocks read in this database.|
|`blks_hit`|bigint| |Number of times disk blocks were found already in the buffer cache, so that a read was not necessary (this only includes hits in the PostgreSQL buffer cache, not the operating system's file system cache).|
|`tup_returned`|bigint| |Number of live rows fetched by sequential scans and index entries returned by index scans in this database.|
|`tup_fetched `|bigint| |Number of live rows fetched by index scans in this database.|
|`tup_inserted`|bigint| |Number of rows inserted by queries in this database.|
|`tup_updated`|bigint| |Number of rows updated by queries in this database.|
|`tup_deleted | bigint`|bigint| |Number of rows deleted by queries in this database.|
|`conflicts`|bigint| |Number of queries canceled due to conflicts with recovery in this database.|
|`temp_files`|bigint| |Number of temporary files created by queries in this database. All temporary files are counted, regardless of why the temporary file was created (for example, sorting or hashing), and regardless of the `log_temp_files` setting.|
|`temp_bytes`|bigint| |Total amount of data written to temporary files by queries in this database. All temporary files are counted, regardless of why the temporary file was created, and regardless of the log_temp_files setting.|
|`deadlocks`|bigint| |Number of deadlocks detected in this database.|
|`checksum_failures`|bigint| |Number of data page checksum failures detected in this database (or on a shared object), or NULL if data checksums are not enabled.|
|`checksum_last_failure`|timestamp with time zone| |Time at which the last data page checksum failure was detected in this database (or on a shared object), or NULL if data checksums are not enabled.|
|`blk_read_time`|double precision| |Time spent reading data file blocks by backends in this database, in milliseconds (if track_io_timing is enabled, otherwise zero).|
|`session_time`|double precision| |Time spent by database sessions in this database, in milliseconds (note that statistics are only updated when the state of a session changes, so if sessions have been idle for a long time, this idle time won't be included).|
|`active_time`|double precision| |Time spent executing SQL statements in this database, in milliseconds (this corresponds to the states active and fastpath function call in pg_stat_activity).|
|`idle_in_transaction_time`|double precision| |Time spent idling while in a transaction in this database, in milliseconds (this corresponds to the states idle in transaction and idle in transaction (aborted) in `gp_stat_activity`)|
|`sessions`|bigint| |Total number of sessions established to this database.|
|`sessions_abandoned`|bigint| |Number of database sessions to this database that were terminated because connection to the client was lost.|
|`sessions_fatal`|bigint| |Number of database sessions to this database that were terminated by fatal errors.|
|`sessions_killed`|bigint| |Number of database sessions to this database that were terminated by operator intervention.|
|`stats_reset`|timestamp with time zone| |Time at which these statistics were last reset.|
