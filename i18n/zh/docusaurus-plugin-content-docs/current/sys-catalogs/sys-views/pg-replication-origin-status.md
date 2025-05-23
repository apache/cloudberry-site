---
title: pg_replication_origin_status
---

# pg_replication_origin_status

`pg_replication_origin_status` 视图提供了关于复制源进度的信息，包括本地和远程日志序列号 (LSN)。此视图对于监视和管理逻辑复制同步至关重要。

|名称|类型|引用|描述|
|----|----|----------|-----------|
|`local_id`|oid|pg_replication_origin.roident|内部节点标识符。|
|`external_id`|text|pg_replication_origin.roname|外部节点标识符。|
|`remote_lsn`|pg_lsn| |源节点已复制数据到的 LSN。|
|`local_lsn`|pg_lsn| |此节点已复制 `remote_lsn` 时的 LSN。在使用异步提交时，用于在将数据持久化到磁盘之前刷新提交记录。|
