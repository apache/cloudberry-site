---
title: pg_replication_slots
---

# pg_replication_slots

`pg_replication_slots` 视图提供了数据库集群上当前存在的所有复制槽的列表及其当前状态。它包括槽名称、类型（物理或逻辑）、关联数据库、活动状态和 WAL 位置等信息。此视图对于监控复制槽使用情况和确保正确的复制行为至关重要。

|名称|类型|引用|描述|
|----|----|----------|-----------|
|`slot_name`|name| |复制槽的唯一、集群范围标识符。|
|`plugin`|name| |此逻辑槽正在使用的输出插件所包含的共享对象的基本名称，物理槽则为 null。|
|`slot_type`|text| |槽类型 - 物理或逻辑。|
|`datoid`|oid|pg_database.oid|此槽关联的数据库 OID，或 null。只有逻辑槽才有关联的数据库。|
|`database`|name|pg_database.datname|此槽关联的数据库名称，或 null。只有逻辑槽才有关联的数据库。|
|`temporary`|boolean| |如果这是一个临时复制槽，则为 True。临时槽不保存到磁盘，并在错误或会话结束时自动删除。|
|`active`|boolean| |如果此槽当前正在被主动使用，则为 True。|
|`active_pid`|integer| |如果此槽当前正在被主动使用，则为使用此槽的会话的进程 ID。如果非活动，则为 `NULL`。|
|`xmin`|xid| |此槽需要数据库保留的最旧事务。VACUUM 无法删除任何后续事务删除的元组。|
|`catalog_xmin`|xid| |此槽需要数据库保留的、影响系统目录的最旧事务。VACUUM 无法删除任何后续事务删除的目录元组。|
|`restart_lsn`|pg_lsn| |此槽的消费者可能仍然需要的、最旧 WAL 的地址 (LSN)，因此在检查点期间不会自动删除。如果此槽的 LSN 从未被保留，则为 `NULL`。|
|`confirmed_flush_lsn`|pg_lsn| |逻辑槽的消费者已确认接收数据到的地址 (LSN)。早于此的数据不再可用。物理槽为 NULL。|
| `wal_status` | text | | 指示复制槽的 WAL 文件可用性。可能的值包括 `reserved`、`extended`、`unreserved` 和 `lost`，反映了槽在 WAL 保留方面的当前状态。 |
| `safe_wal_size` | bigint | | 表示在槽面临进入 `lost` 状态之前可以写入的 WAL 数据量（字节）。值为零或 null 表示即将面临风险或槽已丢失。 |
| `two_phase` | boolean | | 指示复制槽是否支持解码准备好的事务（两阶段提交）。对于启用了两阶段解码的逻辑槽，此值为 `true`；对于物理槽，此值为 `false`。 |
