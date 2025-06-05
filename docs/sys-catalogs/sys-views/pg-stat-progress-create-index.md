---
title: pg_stat_progress_create_index
---

## pg_stat_progress_create_index

`pg_stat_progress_create_index` is a system view that shows real-time progress for ongoing `CREATE INDEX` or `REINDEX` operations in the current database.

This view displays detailed status information for each backend process building an index, including the current execution phase, the number of tuples processed, blocks scanned, and more. Once the operation completes, the corresponding entries are automatically removed from the view.

In Apache Cloudberry, this view also supports AO (Append-Optimized) tables and can be used to observe the phase-wise progress of index creation on such tables.

Typical use cases include:

- Monitoring index creation or rebuild operations in real time.
- Analyzing performance bottlenecks of long-running `CREATE INDEX` or `REINDEX` commands.
- Checking if any index operations are currently consuming system resources.
- Correlating with `pg_stat_activity` to trace backend process details.

Example queries:

```sql
-- Views all ongoing index creation tasks
SELECT * FROM pg_stat_progress_create_index;

-- Views index progress for a specific table
SELECT * FROM pg_stat_progress_create_index
WHERE relid = 'ao_test'::regclass;
```

### Field descriptions

| Field                 | Description |
|-----------------------|-------------|
| `gp_segment_id`       | ID of the segment where this entry resides. Only applicable in a distributed environment. |
| `pid`                 | Process ID of the backend. Can be joined with `pg_stat_activity` for session details. |
| `datid`               | OID of the database, corresponding to `pg_database.oid`. |
| `datname`             | Name of the database. |
| `relid`               | OID of the table being indexed, corresponding to `pg_class.oid`. |
| `index_relid`         | OID of the index being built. |
| `command`             | Command being executed: `CREATE INDEX` or `REINDEX`. |
| `phase`               | Current phase of execution, for example: <br /> `initializing`: Initialization phase <br /> `scanning heap`: Scanning table data <br /> `sorting`: Sorting phase <br /> `building index: loading tuples in tree`: Building index structure <br /> `waiting for locks`: Waiting for table or metadata locks |
| `lockers_total`       | Total number of sessions holding conflicting locks (if any). |
| `lockers_done`        | Number of sessions that have released their locks. |
| `current_locker_pid`  | Process ID of the session currently holding the lock (if waiting). |
| `blocks_total`        | Total number of data blocks to scan (may be 0 if unknown or not started). |
| `blocks_done`         | Number of data blocks already scanned. |
| `tuples_total`        | Estimated total number of tuples to process (if available). |
| `tuples_done`         | Number of tuples already processed. |
| `partitions_total`    | Total number of partitions (if applicable). |
| `partitions_done`     | Number of partitions already processed (if applicable). |

:::note
- This view only shows currently running index operations. Entries disappear once the operation completes.
- For small tables, index creation may complete instantly, and the view might return no rows.
- To better observe progress, try creating an index on a large table or use complex columns (for example, large text) to slow down execution.
- Progress is also reported when building indexes on AO (Append-Optimized) tables.
- You can join this view with ``pg_stat_activity`` using the ``pid`` field.

    ```sql
    SELECT a.usename, a.query, p.phase, p.blocks_done, p.blocks_total
    FROM pg_stat_activity a
    JOIN pg_stat_progress_create_index p ON a.pid = p.pid;
    ```

:::
