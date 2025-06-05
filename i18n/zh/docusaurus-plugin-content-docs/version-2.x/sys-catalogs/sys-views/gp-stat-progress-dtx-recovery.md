---
title: gp_stat_progress_dtx_recovery
---

# gp_stat_progress_dtx_recovery

`gp_stat_progress_dtx_recovery` 视图是一个集群范围的视图，显示分布式事务 (DTX) 恢复过程的进度，该过程在 Postgres 启动期间于后台运行。

如果 Coordinator 重启后长时间处于恢复状态，此视图可能会很有用。Apache Cloudberry 在所有“存疑”事务解决之前不会接受连接。存疑事务是指已准备但尚未提交的事务。如果在 Coordinator 重启之前有大量事务正在运行，数据库恢复可能需要比预期更长的时间，你可以使用此视图来监控恢复的当前阶段。请注意，在这种情况下，由于 Apache Cloudberry 仍在启动中，你需要以工具模式（utility mode）访问数据库才能查看此视图。

|列|类型|描述|
|------|----|----------|
|`phase`|text | 恢复状态。可能的值有："initializing"（初始化中）、"recovering committed distributed transactions"（正在恢复已提交的分布式事务）、"gathering in-doubt transactions"（正在收集存疑事务）、"aborting in-doubt transactions"（正在中止存疑事务）、"gathering in-doubt orphaned transactions"（正在收集存疑孤立事务）和 "managing in-doubt orphaned transactions"（正在管理存疑孤立事务）。|
|`recover_commited_dtx_total`|bigint| 发现需要恢复的已提交事务总数。|
|`recover_commited_dtx_completed`|bigint| 已恢复的已提交事务数量。|
|`in_doubt_tx_total`|bigint| 发现的存疑事务总数，在启动和非启动阶段使用。|
|`in_doubt_tx_in_progress`|bigint| 进行中的存疑事务数量。|
|`in_doubt_tx_aborted`|bigint| 已中止的存疑事务数量。|
