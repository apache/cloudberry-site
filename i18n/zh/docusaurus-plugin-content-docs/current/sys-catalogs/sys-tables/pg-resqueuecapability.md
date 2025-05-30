---
title: pg_resqueuecapability
---

# pg_resqueuecapability

:::note 注意
只有在启用了基于资源队列的资源管理功能时，`pg_resqueuecapability` 系统目录表才有效。
:::

`pg_resqueuecapability` 系统目录表包含已存在的 Apache Cloudberry 资源队列的扩展属性（即能力）信息。只有那些被赋予了扩展能力（例如优先级设置）的资源队列才会记录在此表中。该表通过资源队列的对象 ID 与 [pg_resqueue](./pg-resqueue.md) 表关联，通过资源类型 ID（`restypid`）与 [pg_resourcetype](./pg-resourcetype.md) 表关联。

该表仅在协调节点上填充，定义在 `pg_global` 表空间中，整个系统的所有数据库共享此表。

| 列名          | 类型         | 引用                          | 说明                                                                 |
|---------------|--------------|-------------------------------|----------------------------------------------------------------------|
| `rsqueueid`   | oid          | `pg_resqueue.oid`             | 关联资源队列的对象标识符。                                           |
| `restypid`    | smallint     | `pg_resourcetype.restypid`    | 资源类型，来源于 [pg_resourcetype](./pg-resourcetype.md) 系统表。     |
| `resetting`   | text         |                               | 为该记录所对应的能力设置的具体值。根据实际的资源类型，该值的数据类型可能不同。 |
