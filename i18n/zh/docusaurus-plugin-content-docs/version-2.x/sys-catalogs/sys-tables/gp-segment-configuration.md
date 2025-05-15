---
title: gp_segment_configuration
---

# gp_segment_configuration

`gp_segment_configuration` 表位于 `pg_catalog` 模式中，用于存储镜像和 Segment 实例的配置信息。

| 列名             | 类型     | 引用 | 描述                                                                 |
|------------------|----------|------|----------------------------------------------------------------------|
| `dbid`          | smallint |      | Segment（或 Coordinator）实例的唯一标识符。                          |
| `content`       | smallint |      | Segment 实例的内容标识符。主 Segment 实例及其对应的镜像始终具有相同的内容标识符。<br/><br/>对于 Segment，值的范围为 0 到 *N*-1，其中 *N* 是系统中主 Segment 的数量。<br/><br/>对于 Coordinator，值始终为 -1。 |
| `role`          | char     |      | Segment 当前运行的角色。取值为 `p`（主）或 `m`（镜像）。             |
| `preferred_role`| char     |      | Segment 在初始化时被分配的角色。取值为 `p`（主）或 `m`（镜像）。     |
| `mode`          | char     |      | Segment 实例与其镜像副本的同步状态。取值为 `s`（已同步）或 `n`（未同步）。<br/><br/>对于 Coordinator Segment，该列始终显示 `n`；对于备用 Coordinator Segment，始终显示 `s`。但这些值并不表示 Coordinator Segment 的同步状态。要确定 Coordinator 和备用 Coordinator 之间的同步状态，请使用 `gp_stat_replication`。 |
| `status`        | char     |      | Segment 实例的故障状态。取值为 `u`（正常）或 `d`（故障）。           |
| `port`          | integer  |      | 数据库服务器监听进程使用的 TCP 端口。                                |
| `hostname`      | text     |      | Segment 主机的主机名。                                               |
| `address`       | text     |      | 用于访问 Segment 主机上特定 Segment 实例的主机名。在未配置基于接口的主机名的系统中，该值可能与 `hostname` 相同。 |
| `datadir`       | text     |      | Segment 实例的数据目录。                                             |
| `warehouseid`   | oid      |      | Segment 所属仓库的 ID。                                              |
