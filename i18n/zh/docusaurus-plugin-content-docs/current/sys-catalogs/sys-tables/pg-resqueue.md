---
title: pg_resqueue
---

# pg_resqueue

:::note 注意
只有在启用了基于资源队列的资源管理功能时，`pg_resqueue` 系统目录表才有效。
:::

`pg_resqueue` 系统目录表包含 Apache Cloudberry 中资源队列的信息，资源队列用于管理资源分配。该表仅在协调节点上填充，定义在 `pg_global` 表空间中，整个系统的所有数据库共享此表。

| 列名               | 类型       | 引用 | 说明                                                                 |
|--------------------|------------|------|----------------------------------------------------------------------|
| `oid`              | oid        |      | 对象标识符（Object ID）。                                            |
| `rsqname`          | name       |      | 资源队列名称。                                                       |
| `rsqcountlimit`    | real       |      | 该资源队列的活动查询数阈值。                                         |
| `rsqcostlimit`     | real       |      | 该资源队列的查询开销阈值。                                           |
| `rsqovercommit`    | boolean    |      | 当系统空闲时，是否允许超出开销阈值的查询继续执行。                     |
| `rsqignorecostlimit` | real    |      | 用于判断“小查询”的开销上限。小于该值的查询不会进入队列，而是立即执行。 |
