---
title: pg_stat_progress_cluster
---

# pg_stat_progress_cluster

The `pg_stat_progress_cluster` view shows the progress of `CLUSTER` and `VACUUM FULL` operations. Each row represents a backend process currently executing one of these commands, providing details such as the current phase, number of heap blocks scanned and written, and indexes rebuilt. This view helps monitor and manage long-running table reorganization tasks.

|Column|Type|Description|
|------|----|-----------|
|`gp_segment_id`|integer| Unique identifier of a segment (or coordinator) instance. (This column is not present in the `gp_stat_progress_cluster_summary` view.)|
| `pid` | integer | Process identifier of the backend, or the coordinator process identifier if the `gp_stat_progress_cluster_summary` view. |
| `datid` | oid | The object identifier of the database to which this backend is connected. |
| `datname` | name | Name of the database to which this backend is connected. |
| `relid` | `oid` | The object identifier of the table being clustered. |
| `command` | text | The name of the command that is running. Either `CLUSTER` or `VACUUM FULL`. |
| `phase` | text | Current processing phase.  |
| `cluster_index_relid` | oid | If the table is being scanned using an index, this is the object identifier of the index being used; otherwise, it is zero. This field is not applicable to AO/CO tables. |
| `heap_tuples_scanned` | bigint | For heap tables, `heap_tuples_scanned` records the number of tuples scanned, including both live and dead tuples. For AO tables, `heap_tuples_scanned` records the number of live tuples scanned, excluding the dead tuples. This counter only advances when the phase is `seq scanning append-optimized`, `seq scanning heap`, `index scanning heap`, or `writing new heap`. For AO/CO tables, Apache Cloudberry converts byte size into equivalent heap blocks in size. |
| `heap_tuples_written` | bigint | Number of tuples written. This counter only advances when the phase is `seq scanning heap`, `index scanning heap`, `writing new append-optimized`, or `writing new heap`. |
| `heap_blks_total` | bigint | Total number of heap blocks in the table. This number is reported as of the beginning of `seq scanning heap`. For AO/CO tables, Apache Cloudberry converts byte size into equivalent heap blocks in size. |
| `heap_blks_scanned` | bigint | Number of heap blocks scanned. This counter only advances when the phase is `seq scanning heap`. For AO/CO tables, Apache Cloudberry converts byte size into equivalent heap blocks in size. |
| `index_rebuild_count` | bigint | Number of indexes rebuilt. This counter only advances when the phase is `rebuilding index`, and is not applicable to AO/CO tables. |
