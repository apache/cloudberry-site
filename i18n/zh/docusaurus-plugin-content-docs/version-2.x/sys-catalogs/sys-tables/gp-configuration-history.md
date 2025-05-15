---
title: gp_configuration_history
---

# gp_configuration_history

`gp_configuration_history` 表位于 `pg_catalog` 模式中，用于存储与故障检测和恢复操作相关的系统变更信息。`fts_probe` 进程会将数据写入该表，同时一些管理工具（如 `gprecoverseg` 和 `gpinitsystem`）也会向表中记录数据。例如，当用户向系统中添加新的 Segment 或镜像 Segment 时，相关事件会被记录到 `gp_configuration_history` 表中。

技术支持工程师在排查系统问题时，可以参考该表中存储的事件描述。

需要注意的是，该表仅在 Coordinator 节点上填充数据，并且定义在 `pg_global` 表空间中，因此它在系统的所有数据库之间全局共享。

| 列名      | 类型                     | 引用                              | 描述                                   |
|-----------|--------------------------|-----------------------------------|----------------------------------------|
| `time`    | timestamp with time zone |                                   | 事件记录的时间戳。                     |
| `dbid`    | smallint                 | `gp_segment_configuration.dbid`   | 系统分配的 ID，用于唯一标识 Segment 或 Coordinator 节点实例。 |
| `desc`    | text                     |                                   | 事件的文本描述。                       |