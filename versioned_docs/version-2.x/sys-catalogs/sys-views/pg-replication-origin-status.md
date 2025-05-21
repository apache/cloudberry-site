---
title: pg_replication_origin_status
---

# pg_replication_origin_status

The `pg_replication_origin_status` view provides information about the progress of replication origins, including the local and remote log sequence numbers (LSNs). This view is essential for monitoring and managing logical replication synchronization.

|name|type|references|description|
|----|----|----------|-----------|
|`local_id`|oid|pg_replication_origin.roident|Internal node identifier.|
|`external_id`|text|pg_replication_origin.roname|External node identifier.|
|`remote_lsn`|pg_lsn| |The origin node's LSN up to which data has been replicated.|
|`local_lsn`|pg_lsn| |This node's LSN at which remote_lsn has been replicated. Used to flush commit records before persisting data to disk when using asynchronous commits.|
