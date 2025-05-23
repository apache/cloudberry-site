---
title: gp_stat_archiver
---

# gp_stat_archiver

`gp_stat_archiver` 视图提供有关 Apache Cloudberry 集群中每个 Segment 的 WAL 归档进程的信息。它包括成功归档的 WAL 文件数量、上次归档 WAL 文件的名称和时间、失败的归档尝试次数以及上次失败的详细信息等指标。此视图对于监视和诊断整个集群的 WAL 归档非常有用。

|列|类型|引用|描述|
|------|----|----------|-----------|
|`gp_segment_id`|integer| |Segment (或 Coordinator) 实例的唯一标识符。|
|`archived_count`|bigint| |已成功归档的 WAL 文件数量。|
|`last_archived_wal`|text| |最近成功归档的 WAL 文件的名称。|
|`last_archived_time `|timestamp with time zone| |最近成功归档操作的时间。|
|`failed_count`|bigint| |归档 WAL 文件的失败尝试次数。|
|`last_failed_wal`|timestamp with time zone| |最近失败归档操作的 WAL 文件名称。|
|`last_failed_time`|bigint| |最近失败归档操作的时间。|
|`stats_reset`|timestamp with time zone| |上次重置这些统计信息的时间。|

此系统视图在 `gp_stat_archiver_summary` 系统视图中进行了汇总。
