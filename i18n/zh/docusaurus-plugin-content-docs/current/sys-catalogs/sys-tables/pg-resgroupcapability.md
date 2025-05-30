---
title: pg_resgroupcapability
---

# pg_resgroupcapability

:::note 注意
只有在启用了基于资源组的资源管理时，`pg_resgroupcapability` 系统目录表才有效。
:::

`pg_resgroupcapability` 系统目录表包含已定义的 Apache Cloudberry 资源组的能力与限制信息。可以通过资源组的对象 ID 将该表与 [pg_resgroup](./pg-resgroup.md) 表进行关联。

该表定义在 `pg_global` 表空间中，整个系统的所有数据库共享此表。

| 列名          | 类型       | 引用                  | 说明                                                                 |
|---------------|------------|-----------------------|----------------------------------------------------------------------|
| `resgroupid`  | oid        | `pg_resgroup.oid`     | 关联资源组的对象标识符。                                              |
| `reslimittype`| smallint   |                       | 资源组限制类型：<br/><br/>1 - 并发数（Concurrency）<br/><br/>2 - 最大 CPU 权重（CPU_MAX_WEIGHT）<br/><br/>3 - CPU 权重（CPU_WEIGHT）<br/><br/>4 - 绑定的 CPU 集（CPUSET）<br/><br/>5 - 内存配额（MEMORY_QUOTA）<br/><br/>6 - 最小成本阈值（MIN_COST）<br/><br/>7 - I/O 限制（IO_LIMIT） |
| `value`       | 不透明类型 |                       | 为当前记录所引用的资源限制设定的具体值。该值的数据类型固定为 `text`，系统会根据限制类型将其转换为对应的数据类型。 |
