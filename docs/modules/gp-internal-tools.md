---
title: gp_internal_tools
---

# gp_internal_tools

The `gp_internal_tools` module is a set of diagnostic tools for Apache Cloudberry. The extension installs the `session_state` schema with a view that shows the memory consumption of each session on the coordinator and on every segment. The module also ships shared libraries with low-level diagnostic functions for the workfile manager, the instrumentation shared memory, and append-optimized tables.

:::note
This module is meant for troubleshooting. It exposes internal server state and is not needed for normal operation.
:::

## Build and install

`gp_internal_tools` is built and installed by default with Apache Cloudberry. No `configure` option is required.

The build installs four shared libraries in the library directory of the installation: `gp_session_state_memory_stats`, `gp_workfile_mgr`, `gp_instrument_shmem`, and `gp_ao_co_diagnostics`.

## Enable the module

Create the extension in each database where you want to use it. Creating the extension requires superuser privileges. It does not need `shared_preload_libraries`.

```sql
CREATE EXTENSION gp_internal_tools;
```

The extension creates its objects in the `session_state` schema.

## Objects installed by the extension

### session_state.session_level_memory_consumption

A view with one row per session and per instance (the coordinator and each segment) that shows the memory used by the session on that instance. `SELECT` on the view is granted to `PUBLIC`.

| Column | Type | Description |
|---|---|---|
| `datname` | `name` | Name of the database that the session is connected to. |
| `sess_id` | `integer` | Session ID. |
| `usename` | `name` | Name of the session user. |
| `query` | `text` | Current query of the session, as shown in `pg_stat_activity`. |
| `segid` | `integer` | Segment content ID. `-1` is the coordinator. |
| `vmem_mb` | `integer` | Virtual memory used by the session on this instance, in MB. |
| `is_runaway` | `boolean` | Whether the session is marked as a runaway session on this instance. |
| `qe_count` | `integer` | Number of query executor processes of the session on this instance. |
| `active_qe_count` | `integer` | Number of active query executor processes of the session on this instance. |
| `dirty_qe_count` | `integer` | Internal cleanup counter of the session (the `cleanupCountdown` field of the session state). |
| `runaway_vmem_mb` | `integer` | Value of the virtual memory counter of the session when it was marked as a runaway session. |
| `runaway_command_cnt` | `integer` | Command count of the session when it was marked as a runaway session. |
| `idle_start` | `timestamp with time zone` | Last time a query executor process of this session became idle. |

The `datname`, `usename`, and `query` columns come from a left join with `pg_stat_activity` on the session ID, so they are `NULL` if the session is not found there.

### Functions

The view is built on two set-returning functions. `EXECUTE` on both is granted to `PUBLIC`.

| Function | Runs on | Description |
|---|---|---|
| `session_state.session_state_memory_entries_f_on_master()` | Coordinator | Returns the session memory entries of the coordinator. |
| `session_state.session_state_memory_entries_f_on_segments()` | All segments | Returns the session memory entries of each segment. |

Both functions return `SETOF record` with the columns `(segid int, sessionid int, vmem_mb int, runaway_status int, qe_count int, active_qe_count int, dirty_qe_count int, runaway_vmem_mb int, runaway_command_cnt int, idle_start timestamp with time zone)`. Query the view instead of calling them directly.

## Example

```sql
CREATE EXTENSION gp_internal_tools;

SELECT * FROM session_state.session_level_memory_consumption LIMIT 0;
```

```text
 datname | sess_id | usename | query | segid | vmem_mb | is_runaway | qe_count | active_qe_count | dirty_qe_count | runaway_vmem_mb | runaway_command_cnt | idle_start
---------+---------+---------+-------+-------+---------+------------+----------+-----------------+----------------+-----------------+---------------------+------------
(0 rows)
```

To see the memory used by the current session on each instance:

```sql
SELECT m.segid, m.vmem_mb, m.is_runaway
FROM session_state.session_level_memory_consumption m, pg_stat_activity a
WHERE a.pid = pg_backend_pid()
  AND m.sess_id = a.sess_id;
```

## Additional diagnostic libraries

The module also builds and installs the following shared libraries. The extension script does not create SQL functions for them: `CREATE EXTENSION gp_internal_tools` installs only the `session_state` objects described above. The C functions in these libraries are thin wrappers around internal server functions and are intended for support and development use.

| Library | C functions | Purpose |
|---|---|---|
| `gp_workfile_mgr` | `gp_workfile_mgr_cache_entries`, `gp_workfile_mgr_used_diskspace` | Workfile manager diagnostics. `gp_workfile_mgr_cache_entries` returns the workfile cache entries of one segment. `gp_workfile_mgr_used_diskspace` returns a `(segid int4, bytes int8)` row with the number of bytes used for workfiles on a segment. |
| `gp_instrument_shmem` | `gp_instrument_shmem_summary`, `gp_instrument_shmem_detail` | Diagnostics of the instrumentation slots in shared memory. `gp_instrument_shmem_summary` returns `(segid int4, num_free int8, num_used int8)`. `gp_instrument_shmem_detail` returns one row per used slot with `(tmid int4, ssid int4, ccnt int2, segid int2, pid int4, nid int2, tuplecount int8, nloops int8, ntuples int8)`. |
| `gp_ao_co_diagnostics` | `gp_aoseg_wrapper`, `gp_aoseg_history_wrapper`, `gp_aocsseg_wrapper`, `gp_aocsseg_history_wrapper`, `gp_aoblkdir_wrapper`, `gp_aovisimap_wrapper`, `gp_aovisimap_entry_wrapper`, `gp_aovisimap_hidden_info_wrapper`, among others | Diagnostics for append-optimized row-oriented (AO) and column-oriented (CO) tables: segment file metadata including historic (non-visible) entries, block directory entries, and visibility map information such as the number of hidden tuples per segment file. |

## Usage notes

- The view calls a function on every segment, so each query on it dispatches to the whole cluster.
- Dropping the extension removes the view and the functions in the `session_state` schema.
