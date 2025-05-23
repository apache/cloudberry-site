---
title: pg_stat_progress_analyze
---

# pg_stat_progress_analyze

The `pg_stat_progress_analyze` view displays the progress of currently running `ANALYZE` commands. Each row represents a backend process executing `ANALYZE` and provides details such as the current phase, number of blocks sampled, and statistics computed. This view is useful for monitoring long-running `ANALYZE` operations.

|Column|Type|Description|
|------|----|-----------|
|`gp_segment_id`|integer| Unique identifier of a segment (or coordinator) instance. (This column is not present in the `gp_stat_progress_analyze_summary` view.) |
| `pid` | integer | The process identifier of the backend, or the coordinator process identifier if the `gp_stat_progress_analyze_summary` view. |
| `datid` | oid | The object identifier of the database to which this backend is connected. |
| `datname` | name | Name of the database to which this backend is connected. |
| `relid` | oid | The object identifier of the table being analyzed. |
| `phase` | text | Current processing phase.  |
| `sample_blks_total` | bigint | Total number of heap blocks that will be sampled. |
| `sample_blks_scanned` | bigint | Number of heap blocks scanned. |
| `ext_stats_total` | bigint | Number of extended statistics. |
| `ext_stats_computed` | bigint | Number of extended statistics computed. This counter only advances when the phase is computing extended statistics. |
| `child_tables_total` | bigint | Number of child tables. |
| `child_tables_done` | bigint | Number of child tables scanned. This counter only advances when the phase is acquiring inherited sample rows. |
| `current_child_table_relid` | oid | The object identifier of the child table currently being scanned. This field is only valid when the phase is acquiring inherited sample rows. (This column is not present in the for `gp_stat_progress_analyze_summary` view.)|
