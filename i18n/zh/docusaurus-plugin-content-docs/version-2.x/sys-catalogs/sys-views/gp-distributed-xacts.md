---
title: gp_distributed_xacts
---

# gp_distributed_xacts

`gp_distributed_xacts` 视图包含 Apache Cloudberry 分布式事务的相关信息。分布式事务是指涉及在多个 Segment 实例上修改数据的事务。Apache Cloudberry 的分布式事务管理器会确保各 Segment 保持同步。通过此视图，你可以查看当前活动的会话及其关联的分布式事务。

| 列名                     | 类型   | 引用 | 描述                                                                 |
|--------------------------|--------|------|----------------------------------------------------------------------|
| `distributed_xid`        | xid    |     | 在整个 Apache Cloudberry 集群中用于分布式事务的事务 ID。             |
| `state`                  | text   |     | 当前会话在分布式事务中的状态。                                       |
| `distributed_id`         | text   |     | 分布式事务的标识符，由两部分组成：唯一的时间戳和分布式事务编号。       |
| `gp_session_id`          | int    |     | 与该事务关联的 Apache Cloudberry 会话 ID。                           |
| `xmin_distributed_snapshot` | xid |     | 在此事务启动时，所有未完成事务中找到的最小分布式事务编号，用于 MVCC 分布式快照。 |
