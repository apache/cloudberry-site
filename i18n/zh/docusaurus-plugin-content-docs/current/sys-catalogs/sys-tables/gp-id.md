---
title: gp_id
---

# gp_id

`gp_id` 系统目录表位于 `pg_catalog` 模式中，用于标识 Apache Cloudberry 系统的名称和 Segment 数量。它还包含该表所在的特定数据库实例（Segment 或 Coordinator）的本地信息。该表定义在 `pg_global` 表空间中，意味着它在系统的所有数据库中全局共享。

| 列名          | 类型     | 引用 | 描述                                                                 |
|---------------|----------|------|----------------------------------------------------------------------|
| `gpname`     | name     |      | 当前 Apache Cloudberry 系统的名称。                                  |
| `numsegments`| smallint |      | Apache Cloudberry 系统中的 Segment 数量。                            |
| `dbid`       | smallint |      | 当前 Segment（或 Coordinator）实例的唯一标识符。                     |
| `content`    | smallint |      | 当前 Segment 实例上数据部分的 ID。主 Segment 和其镜像会共享相同的 content ID。<br/><br/>对于 Segment，值的范围为 0 到 *N-1*，其中 *N* 是 Apache Cloudberry 系统中的 Segment 数量。<br/><br/>对于 Coordinator，值为 -1。 |
