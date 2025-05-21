---
title: gp_stat_archiver
---

# gp_stat_archiver

The `gp_stat_archiver` view provides information about the WAL archiver process for each segment in the Apache Cloudberry cluster. It includes metrics such as the number of successfully archived WAL files, the name and time of the last archived WAL file, the number of failed archival attempts, and details of the last failure. This view is useful for monitoring and diagnosing WAL archiving across the cluster.

|column|type|references|description|
|------|----|----------|-----------|
|`gp_segment_id`|integer| |Unique identifier of a segment (or coordinator) instance.|
|`archived_count`|bigint| |Number of WAL files that have been successfully archived.|
|`last_archived_wal`|text| |Name of the WAL file most recently successfully archived.|
|`last_archived_time `|timestamp with time zone| |Time of the most recent successful archive operation.|
|`failed_count`|bigint| |Number of failed attempts for archiving WAL files.|
|`last_failed_wal`|timestamp with time zone| |Name of the WAL file of the most recent failed archival operation.|
|`last_failed_time`|bigint| |Time of the most recent failed archival operation.|
|`stats_reset`|timestamp with time zone| |Time at which these statistics were last reset.|

This system view is summarized in the `gp_stat_archiver_summary` system view.
