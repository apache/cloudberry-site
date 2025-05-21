---
title: gp_stat_progress_dtx_recovery
---

# gp_stat_progress_dtx_recovery

The `gp_stat_progress_dtx_recovery` view is a cluster-wide view that displays the progress of the Distributed Transaction (DTX) Recovery process, which runs in the backgroup during Postgres startup. 

This view might be useful if a coordinator restart remains in a recovery state for a long time. Apache Cloudberry will not accept connections until all "in-doubt" transactions are resolved. In-doubt transactions are transactions that have been prepared but not committed yet. If there were many transactions running before the coordinator restarted, the recovery of the database might take longer than expected, and you might use this view to monitor the current phase of the recovery. Note that in this scenario, as Apache Cloudberry is still starting up, you will need to access the database in utility mode to check this view.

|Column|Type|Description|
|------|----|-----------|
|`phase`|text | Status of the recovery. The possible values are: 'initializing', 'recovering commited distributed transactions', 'gathering in-doubt transactions', 'aborting in-doubt transactions', 'gathering in-doubt orphaned transactions', and 'managing in-doubt orphaned transactions'.|
|`recover_commited_dtx_total`|bigint| Total number of committed transactions found to recover.|
|`recover_commited_dtx_completed`|bigint| Number of committed transactions that have been recovered.| 
| in_doubt_tx_total`|bigint| Total number of in-doubt transaction found, used in startup and non-startup phases.|
|`in_doubt_tx_in_progress`|bigint| Number of in-progress, in-doubt transactions.|
|`in_doubt_tx_aborted`|bigint| Number of aborted in-doubt transactions.|
