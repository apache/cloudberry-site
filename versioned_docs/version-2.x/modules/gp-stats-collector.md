---
title: gp_stats_collector
---

# gp_stats_collector

The `gp_stats_collector` module collects query execution metrics in Apache Cloudberry and reports them to an external monitoring agent. It hooks into the executor on the coordinator and on the segments, and for each query it sends lifecycle events (query text, plan, timestamps, user and database) together with system, instrumentation, interconnect, and spill metrics. Events are delivered over a Unix domain socket, or can be written to a log table inside the database.

The module also provides an on-demand runtime query state interface (`pg_query_state`) that makes every backend of a running query report per-plan-node statistics without waiting for the query to finish.

## Build and install

`gp_stats_collector` is not built by default. To build it, configure Apache Cloudberry with the `--with-gp-stats-collector` option:

```shell
./configure --with-gp-stats-collector [other options]
```

When this option is set, `configure` requires:

- The protobuf library, version 3.0.0 or later (detected through `pkg-config`).
- The `protoc` compiler in `PATH`.

The module contains C++ sources that are compiled with `-std=c++17`.

## Enable the module

1. Add the library to `shared_preload_libraries` and restart the cluster. The module allocates shared memory and registers signal handlers at server start, so it must be preloaded:

    ```shell
    gpconfig -c shared_preload_libraries -v 'gp_stats_collector'
    gpstop -ra
    ```

    If `shared_preload_libraries` already lists other libraries, keep them in the value.

2. Create the extension in the database where you want to use the SQL objects. The extension requires superuser privileges to create:

    ```sql
    CREATE EXTENSION gp_stats_collector;
    ```

    The extension creates the `gpsc` schema. The default extension version is `1.2`.

3. Turn on collection. Collection is off by default:

    ```sql
    SET gpsc.enable TO on;
    ```

## Collected data

A query passes through four states, and the module sends one message per state from the dispatcher process (on the coordinator) and from the executor processes (on segments):

```text
submit -> ExecutorStart() -> start -> ExecutorRun() -> ExecutorFinish() -> end -> ExecutorEnd() -> done
```

| Data | Description | Controlled by |
|---|---|---|
| Query lifecycle | Query text, normalized query text, timestamps (submit, start, end, done), user and database information. | `gpsc.enable` |
| `EXPLAIN` data | The output of `EXPLAIN (TEXT, COSTS, VERBOSE)` for the query. | `gpsc.enable` |
| `EXPLAIN ANALYZE` data | The output of `EXPLAIN (TEXT, ANALYZE, BUFFERS, TIMING, VERBOSE)`. Sent only when the execution time reaches `gpsc.min_analyze_time`. | `gpsc.enable`, `gpsc.enable_analyze`, `gpsc.enable_cdbstats`, `gpsc.min_analyze_time` |
| Other metrics | Instrumentation, system, network, interconnect, and spill metrics. | `gpsc.enable` |

Notes on the reported events:

- Some queries skip the `end` state. In that case the `end` statistics are sent with `done`.
- If a query fails or is canceled, its statistics are sent with `done`.
- Some statistics are computed as the difference between the current value and a snapshot taken at `submit`.
- Each process (dispatcher or executor) sends its own statistics.
- A nested query on the dispatcher becomes a top-level query on the executors.

## Configuration parameters

### Collector parameters

A parameter with the `superuser` context can be changed only by a superuser. A parameter with the `user` context can be changed by any role in its session.

| Parameter | Type | Default | Context | Description |
|---|---|---|---|---|
| `gpsc.enable` | boolean | `off` | superuser | Enables the metrics collector. |
| `gpsc.uds_path` | string | `/tmp/gpsc_agent.sock` | superuser | File system path of the agent's Unix domain socket. |
| `gpsc.logging_mode` | enum | `uds` | superuser | Destination of collected events. `uds` sends events to the Unix domain socket. `tbl` writes events to the log table that is exposed through the `gpsc.log` view. Only superusers can view this setting. |
| `gpsc.enable_analyze` | boolean | `on` | superuser | Collects `EXPLAIN ANALYZE` data. When it is on, the dispatcher enables buffer, row, and timing instrumentation for the queries it runs. |
| `gpsc.enable_cdbstats` | boolean | `on` | superuser | Adds Cloudberry-specific executor statistics to the `EXPLAIN ANALYZE` data. Takes effect only when `gpsc.enable_analyze` is on. |
| `gpsc.min_analyze_time` | integer (ms) | `10000` | user | Minimum execution time above which the `EXPLAIN ANALYZE` text is reported. `0` reports it for all queries. `-1` turns the feature off. |
| `gpsc.report_nested_queries` | boolean | `on` | user | When on, both top-level and nested queries are reported from the coordinator, and segments report aggregates. When off, only top-level queries are reported from the coordinator and segments. |
| `gpsc.enable_utility` | boolean | `off` | user | Collects statistics for utility statements. |
| `gpsc.ignored_users_list` | string | empty | superuser | Comma-separated list of roles whose queries are not reported. |
| `gpsc.max_text_size` | integer (bytes) | `1048576` | superuser | Query texts and error messages longer than this size are trimmed. Range: `0` to `2147483647`. |
| `gpsc.max_plan_size` | integer (kB) | `1024` | superuser | Plan texts longer than this size are trimmed. Range: `0` to `2097151`. |

:::note
It is not recommended to set `gpsc.max_text_size` or `gpsc.max_plan_size` higher than 1024 kB.
:::

### Runtime query state parameters

These parameters are registered only when the library is loaded through `shared_preload_libraries`.

| Parameter | Type | Default | Context | Description |
|---|---|---|---|---|
| `pg_query_state.enable` | boolean | `on` | superuser | Enables the runtime query state module (executor hooks and signal handling). |
| `pg_query_state.enable_timing` | boolean | `on` | superuser | Collects timing data in addition to row counts. |
| `pg_query_state.enable_buffers` | boolean | `on` | superuser | Collects buffer usage. |

## SQL objects

All objects are created in the `gpsc` schema. `USAGE` on the schema is granted to `PUBLIC`.

The `gpsc.log` and `gpsc.stat_messages` views are not granted to `PUBLIC`. All functions keep the default `EXECUTE` privilege for `PUBLIC`, and `gpsc.truncate_log()` and `gpsc.stat_messages_reset()` do not check the privileges of the caller. Revoke `EXECUTE` on these functions from `PUBLIC` if only administrators should run them.

Interconnect statistics are collected only when the cluster uses the UDPIFC interconnect.

### gpsc.stat_messages

A view that shows, for the coordinator and for each segment, counters of the messages that the collector has tried to send. Querying it fails with an error if the library is not loaded through `shared_preload_libraries`.

| Column | Type | Description |
|---|---|---|
| `segid` | `int` | Segment content ID. `-1` is the coordinator. |
| `total_messages` | `bigint` | Total number of messages, including failed ones. |
| `send_failures` | `bigint` | Number of messages that failed to be sent. |
| `connection_failures` | `bigint` | Number of failed connections to the agent socket. |
| `other_errors` | `bigint` | Number of other errors. |
| `max_message_size` | `int` | Size of the largest message. |

### gpsc.stat_messages_reset()

```sql
gpsc.stat_messages_reset() RETURNS SETOF void
```

Resets the counters shown in `gpsc.stat_messages` on the coordinator and on all segments.

### gpsc.log

A view over the log table on the coordinator and on all segments, ordered by `tmid`, `ssid`, `ccnt`. The table is filled when `gpsc.logging_mode` is `tbl`. Each row is one reported event.

Rows are inserted in a way that keeps them even if the transaction that ran the query rolls back.

| Column | Type | Description |
|---|---|---|
| `query_id` | `bigint` | Query ID. |
| `plan_id` | `bigint` | Hash of the normalized plan. |
| `nested_level` | `bigint` | Nesting level of the query. |
| `slice_id` | `bigint` | Slice ID. |
| `systemstat_vsize`, `systemstat_rss`, `systemstat_vmsizekb`, `systemstat_vmpeakkb` | `bigint` | Process memory figures from `/proc/pid/stat` and `/proc/pid/status`. |
| `systemstat_rchar`, `systemstat_wchar`, `systemstat_syscr`, `systemstat_syscw`, `systemstat_read_bytes`, `systemstat_write_bytes`, `systemstat_cancelled_write_bytes` | `bigint` | Process I/O counters from `/proc/pid/io`. |
| `instrumentation_ntuples`, `instrumentation_nloops`, `instrumentation_tuplecount` | `bigint` | Tuple and loop counters. |
| `instrumentation_shared_blks_hit`, `instrumentation_shared_blks_read`, `instrumentation_shared_blks_dirtied`, `instrumentation_shared_blks_written` | `bigint` | Shared buffer block counters. |
| `instrumentation_local_blks_hit`, `instrumentation_local_blks_read`, `instrumentation_local_blks_dirtied`, `instrumentation_local_blks_written` | `bigint` | Local buffer block counters. |
| `instrumentation_temp_blks_read`, `instrumentation_temp_blks_written` | `bigint` | Temporary file block counters. |
| `instrumentation_inherited_calls` | `bigint` | Number of nested queries. |
| `instrumentation_sent_total_bytes`, `instrumentation_sent_tuple_bytes`, `instrumentation_sent_chunks` | `bigint` | Network data sent. |
| `instrumentation_received_total_bytes`, `instrumentation_received_tuple_bytes`, `instrumentation_received_chunks` | `bigint` | Network data received. |
| `interconnect_total_recv_queue_size`, `interconnect_recv_queue_size_counting_time`, `interconnect_total_capacity`, `interconnect_capacity_counting_time`, `interconnect_total_buffers`, `interconnect_buffer_counting_time`, `interconnect_active_connections_num`, `interconnect_retransmits`, `interconnect_startup_cached_pkt_num`, `interconnect_mismatch_num`, `interconnect_crc_errors`, `interconnect_snd_pkt_num`, `interconnect_recv_pkt_num`, `interconnect_disordered_pkt_num`, `interconnect_duplicated_pkt_num`, `interconnect_recv_ack_num`, `interconnect_status_query_msg_num` | `bigint` | Interconnect statistics. |
| `spill_totalbytes` | `bigint` | Spill bytes written. |
| `systemstat_runningtimeseconds`, `systemstat_usertimeseconds`, `systemstat_kerneltimeseconds` | `double precision` | Wall clock, user, and kernel time in seconds. |
| `instrumentation_firsttuple`, `instrumentation_startup`, `instrumentation_total`, `instrumentation_blk_read_time`, `instrumentation_blk_write_time`, `instrumentation_startup_time`, `instrumentation_inherited_time` | `double precision` | Timing figures in seconds. |
| `datetime`, `submit_time`, `start_time`, `end_time` | `timestamp with time zone` | Event and query timestamps. |
| `tmid`, `ssid`, `ccnt` | `int` | Query key: a time-based ID from `gp_gettmid()`, the session ID, and the command counter. |
| `dbid` | `int` | The `dbid` of the reporting instance, as in `gp_segment_configuration`. |
| `segid` | `int` | Segment index. `-1` is the coordinator. |
| `spill_filecount` | `int` | Number of spill (temporary) files created. |
| `generator` | `text` | Planner or optimizer that produced the plan. |
| `query_text`, `template_query_text` | `text` | Query text and normalized query text. |
| `plan_text`, `template_plan_text` | `text` | `EXPLAIN` text and normalized plan text. |
| `analyze_text` | `text` | `EXPLAIN ANALYZE` text. |
| `user_name`, `database_name`, `rsgname` | `text` | Session user, database, and resource group. |
| `error_message` | `text` | Error message, if the query failed. |
| `query_status` | `text` | Event state, for example `QUERY_STATUS_SUBMIT`, `QUERY_STATUS_START`, `QUERY_STATUS_END`, `QUERY_STATUS_DONE`. |
| `utility` | `boolean` | Whether the event belongs to a utility statement. |

### gpsc.truncate_log()

```sql
gpsc.truncate_log() RETURNS SETOF void
```

Truncates the log table on the coordinator and on all segments.

### gpsc.pg_query_state()

```sql
gpsc.pg_query_state(pid int, trace_id bytea) RETURNS SETOF void
```

Triggers runtime per-node collection for the query that is running on the coordinator backend `pid`. The request is fanned out to the coordinator backend and to every segment backend that takes part in the query. Each backend walks its plan tree and pushes one batch of per-node statistics to the socket set in `gpsc.uds_path`. The coordinator also pushes the plan document, rate-limited so that repeated polls of a long query do not resend an unchanged plan. The function returns no rows and does not wait for the results.

- `trace_id` must be exactly 16 bytes. The caller generates it, and the receiver uses it as the key of the collection.
- The function runs on the coordinator only.
- A backend cannot poll itself.

### gpsc.pg_query_state_backends()

```sql
gpsc.pg_query_state_backends(pid int) RETURNS TABLE(segid int, pid int)
```

Lists the segment backends that take part in the query running on backend `pid`, so that a collector knows how many batches to expect. A query that runs only on the coordinator is reported as a single row for the coordinator with `segid` less than `0`. The function returns an empty set when the target is not running a query or has `pg_query_state.enable` turned off.

### Internal objects

The following objects are created by the extension but are not meant to be called directly:

- `gpsc.cbdb_mpp_query_state(gpsc.gp_segment_pid[], bytea)` and the composite type `gpsc.gp_segment_pid (segid int, pid int)`: used by `gpsc.pg_query_state()` to dispatch the request to segments.
- Functions whose names start with two underscores, such as `gpsc.__stat_messages_f_on_master()` or `gpsc.__test_uds_start_server(text)`: helpers behind the views and functions above, and helpers for the regression tests.

### Privileges

`EXECUTE` on `gpsc.pg_query_state()`, `gpsc.pg_query_state_backends()`, and `gpsc.cbdb_mpp_query_state()` is granted to `PUBLIC`. Access is checked in the server: a caller can poll a backend only if the caller is a superuser or runs under the same role as the target backend. This lets a monitoring agent use a non-superuser role without being able to observe queries of other roles.

## Example

The following example writes events to the log table instead of the socket and then reads them back.

```sql
CREATE EXTENSION gp_stats_collector;

-- Helper to sort the events of one query in lifecycle order
CREATE OR REPLACE FUNCTION gpsc_status_order(status text)
RETURNS integer
AS $$
BEGIN
    RETURN CASE status
        WHEN 'QUERY_STATUS_SUBMIT' THEN 1
        WHEN 'QUERY_STATUS_START' THEN 2
        WHEN 'QUERY_STATUS_END' THEN 3
        WHEN 'QUERY_STATUS_DONE' THEN 4
        ELSE 999
    END;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

SET gpsc.ignored_users_list TO '';
SET gpsc.enable TO TRUE;
SET gpsc.report_nested_queries TO TRUE;
SET gpsc.enable_utility TO FALSE;

SET gpsc.logging_mode to 'TBL';

SELECT 1;
SELECT COUNT(*) FROM generate_series(1,10);

RESET gpsc.logging_mode;

SELECT segid, query_text, query_status FROM gpsc.log ORDER BY segid, ccnt, gpsc_status_order(query_status) ASC;
```

```text
 segid |                 query_text                  |    query_status
-------+---------------------------------------------+---------------------
    -1 | SELECT 1;                                   | QUERY_STATUS_SUBMIT
    -1 | SELECT 1;                                   | QUERY_STATUS_START
    -1 | SELECT 1;                                   | QUERY_STATUS_END
    -1 | SELECT 1;                                   | QUERY_STATUS_DONE
    -1 | SELECT COUNT(*) FROM generate_series(1,10); | QUERY_STATUS_SUBMIT
    -1 | SELECT COUNT(*) FROM generate_series(1,10); | QUERY_STATUS_START
    -1 | SELECT COUNT(*) FROM generate_series(1,10); | QUERY_STATUS_END
    -1 | SELECT COUNT(*) FROM generate_series(1,10); | QUERY_STATUS_DONE
(8 rows)
```

To clear the log table:

```sql
SELECT gpsc.truncate_log();
```

To poll a running query, generate a 16-byte trace ID and pass the process ID of the coordinator backend that runs the query:

```sql
SELECT * FROM gpsc.pg_query_state_backends(12345);
SELECT gpsc.pg_query_state(12345, '\x00112233445566778899aabbccddeeff'::bytea);
```

## Usage notes

- Delivery is best-effort. A message that cannot be written to the socket is dropped and is not retried, so a slow or absent agent does not add latency to queries. Use `gpsc.stat_messages` to check for failures.
- Runtime query state results are pushed to the agent socket. `gpsc.pg_query_state()` does not return them to the SQL caller.
- `gpsc.pg_query_state()` and `gpsc.pg_query_state_backends()` report an error if the library is not loaded through `shared_preload_libraries`, if no backend with the given `pid` exists, or if the caller is not allowed to poll the target backend. `gpsc.pg_query_state_backends()` also reports an error if `pid` belongs to a segment executor process instead of the coordinator backend of the session.
- The process-level system statistics are read from the `/proc` file system.
