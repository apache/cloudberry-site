---
title: pg_buffercache
---

# pg_buffercache

The `pg_buffercache` module provides a means for examining what is happening in the shared buffer cache in real time.

The Apache Cloudberry `pg_buffercache` module is based on the PostgreSQL `pg_buffercache` module. In addition to the PostgreSQL views and functions, which report on the instance that you are connected to, it provides `gp_`-prefixed views that collect the same information from the coordinator and from all primary segments.

## Install and register the module

`pg_buffercache` is built and installed by a default Apache Cloudberry build. Register the extension in each database in which you want to use it:

```sql
CREATE EXTENSION pg_buffercache;
```

By default, access to the views and functions of this module is restricted to superusers and to members of the `pg_monitor` role.

## Views and functions for a single instance

These objects report on the shared buffers of the instance that runs the query. When you query them in a normal session, that instance is the coordinator.

| Object | Description |
|--------|-------------|
| `pg_buffercache` view, `pg_buffercache_pages()` function | One row for each shared buffer. |
| `pg_buffercache_summary` view, `pg_buffercache_summary()` function | One row that summarizes the state of the shared buffer cache. |
| `pg_buffercache_usage_counts` view, `pg_buffercache_usage_counts()` function | One row for each usage count value. |

The `pg_buffercache` view has the following columns:

| Column | Type | Description |
|--------|------|-------------|
| `bufferid` | `integer` | ID of the buffer, in the range from 1 to `shared_buffers`. |
| `relfilenode` | `oid` | Filenode number of the relation. |
| `reltablespace` | `oid` | Tablespace OID of the relation. |
| `reldatabase` | `oid` | Database OID of the relation. |
| `relforknumber` | `smallint` | Fork number within the relation. |
| `relblocknumber` | `bigint` | Page number within the relation. |
| `isdirty` | `boolean` | Whether the page is dirty. |
| `usagecount` | `smallint` | Clock-sweep access count. |
| `pinning_backends` | `integer` | Number of backends that pin this buffer. |

The `pg_buffercache_summary` view has the following columns:

| Column | Type | Description |
|--------|------|-------------|
| `buffers_used` | `integer` | Number of used shared buffers. |
| `buffers_unused` | `integer` | Number of unused shared buffers. |
| `buffers_dirty` | `integer` | Number of dirty shared buffers. |
| `buffers_pinned` | `integer` | Number of pinned shared buffers. |
| `usagecount_avg` | `double precision` | Average usage count of the used shared buffers. |

The `pg_buffercache_usage_counts` view has the following columns:

| Column | Type | Description |
|--------|------|-------------|
| `usage_count` | `integer` | A possible buffer usage count. |
| `buffers` | `integer` | Number of buffers with this usage count. |
| `dirty` | `integer` | Number of dirty buffers with this usage count. |
| `pinned` | `integer` | Number of pinned buffers with this usage count. |

The summary and usage count views are much cheaper to query than `pg_buffercache`.

## Cluster-wide views

| View | Description |
|------|-------------|
| `gp_buffercache` | The `pg_buffercache` rows of the coordinator and of every primary segment. |
| `gp_buffercache_summary` | The `pg_buffercache_summary` row of the coordinator and of every primary segment: one row per instance. |
| `gp_buffercache_usage_counts` | The `pg_buffercache_usage_counts` rows of the coordinator and of every primary segment. |
| `gp_buffercache_summary_aggregated` | A single row that aggregates `gp_buffercache_summary` over all instances: the sum of each buffer counter and the average of `usagecount_avg`. |
| `gp_buffercache_usage_counts_aggregated` | A single row that contains the sums of the columns of `gp_buffercache_usage_counts`, including the `usage_count` column itself. It is not a breakdown per usage count. |

The first three views have the columns of the corresponding `pg_` view, preceded by a `gp_segment_id` column. The value of `gp_segment_id` is `-1` for the coordinator.

## Examples

Show the buffer cache summary of each instance:

```sql
SELECT * FROM gp_buffercache_summary;
```

Show the totals for the whole cluster:

```sql
SELECT * FROM gp_buffercache_summary_aggregated;
```

Count the dirty buffers on each instance:

```sql
SELECT gp_segment_id, count(*) AS dirty_buffers
FROM gp_buffercache
WHERE isdirty
GROUP BY gp_segment_id
ORDER BY gp_segment_id;
```

## Module documentation

See [pg_buffercache](https://www.postgresql.org/docs/14/pgbuffercache.html) in the PostgreSQL documentation for more information about the `pg_buffercache` view. The summary and usage count functions were added to PostgreSQL in version 16 and are described in the [PostgreSQL 16 documentation](https://www.postgresql.org/docs/16/pgbuffercache.html).
