---
title: pg_stat_progress_copy
---

# pg_stat_progress_copy

The `pg_stat_progress_copy` view displays the progress of currently running `COPY` commands. Each row represents a backend process executing a `COPY` operation and provides details such as the command type (`COPY FROM` or `COPY TO`), I/O type (for example, `FILE` and `PIPE`), number of bytes and tuples processed, and counts of tuples excluded or skipped due to errors. This view is useful for monitoring long-running `COPY` operations.

|Column|Type|Description|
|------|----|-----------|
|`gp_segment_id`|integer| Unique identifier of a segment (or coordinator) instance. (This column is not present in the `gp_stat_progress_copy_summary` view.)|
| `pid` | integer | Process identifier of the backend, or the coordinator process identifier if the `gp_stat_progress_copy_summary` view. |
| `datid` | oid | The object identifier of the database to which this backend is connected. |
| `datname` | name | Name of the database to which this backend is connected. |
| `relid` | oid | The object identifier of the table on which the `COPY` command is executed. It is set to `0` if copying from a `SELECT` query. |
| `command` | text | The command that is running: `COPY FROM`, `COPY TO`, `COPY FROM ON SEGMENT`, or `COPY TO ON SEGMENT`. |
| `type` | text | The io type that the data is read from or written to: `FILE`, `PROGRAM`, `PIPE` (for `COPY FROM STDIN` and `COPY TO STDOUT`), or `CALLBACK` (used for example during the initial table synchronization in logical replication). |
| `bytes_processed` | bigint | Number of bytes already processed by `COPY` command. |
| `bytes_total` | bigint | Size of source file for `COPY FROM` command in bytes. It is set to `0` if not available. |
| `tuples_processed` | bigint | Number of tuples already processed by `COPY` command. |
| `tuples_excluded` | bigint | Number of tuples not processed because they were excluded by the `WHERE` clause of the `COPY` command. |
