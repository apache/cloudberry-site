---
title: pg_resourcetype
---

# pg_resourcetype

`pg_resourcetype` 系统目录表包含可以分配给 Apache Cloudberry 资源队列的扩展属性信息。每一行记录了一个属性及其固有特性，例如默认设置、是否为必需项，以及在允许的情况下将其禁用的值。

该表仅在协调节点上填充，并定义在 `pg_global` 表空间中，因此在整个系统的所有数据库中共享。

| 列名               | 类型       | 引用 | 说明                                                                 |
|--------------------|------------|------|----------------------------------------------------------------------|
| `oid`              | oid        |      | 对象标识符（Object ID）。                                            |
| `resname`          | name       |      | 资源类型名称。                                                       |
| `restypid`         | smallint   |      | 资源类型 ID。                                                        |
| `resrequired`      | boolean    |      | 该资源类型是否是合法资源队列所必需的。                               |
| `reshasdefault`    | boolean    |      | 该资源类型是否具有默认值；如果为 true，则默认值定义在 `resdefaultsetting` 字段中。 |
| `rescandisable`    | boolean    |      | 该资源类型是否允许被移除或禁用；如果为 true，则禁用值定义在 `resdisabledsetting` 字段中。 |
| `resdefaultsetting`| text       |      | （如适用）该资源类型的默认设置值。                                   |
| `resdisabledsetting`| text      |      | 当允许禁用时，用于禁用该资源类型的值。                               |
