---
title: pg_stat_database_conflicts
---

# pg_stat_database_conflicts

The `pg_stat_database_conflicts` view provides statistics about query cancellations due to recovery conflicts on standby servers in PostgreSQL. Each row corresponds to a database and includes counts of cancellations caused by various conflict types, such as dropped tablespaces, lock timeouts, old snapshots, pinned buffers, and deadlocks. This view is useful for monitoring and diagnosing issues related to replication conflicts on standby servers.

|column|type|references|description|
|------|----|----------|-----------|
|`datid`|oid| |OID of a database.|
|`datname`|name| |Name of this database.|
|`confl_tablespace`|bigint| |Number of queries in this database that have been canceled due to dropped tablespaces.|
|`confl_lock`|bigint| |Number of queries in this database that have been canceled due to lock timeouts.|
|`confl_snapshot`|bigint| |Number of queries in this database that have been canceled due to old snapshots.|
|`confl_bufferpin`|bigint| |Number of queries in this database that have been canceled due to pinned buffers.|
|`confl_deadlock`|bigint| |Number of queries in this database that have been canceled due to deadlocks.|
