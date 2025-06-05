---
title: gp_distributed_log
---

# gp_distributed_log

`gp_distributed_log` 视图包含有关分布式事务及其相关本地事务的状态信息。分布式事务是指涉及修改 Segment 实例上数据的事务。Apache Cloudberry 的分布式事务管理器确保 Segment 保持同步。此视图允许你查看分布式事务的状态。

|列|类型|引用|描述|
|------|----|----------|-----------|
|segment_id|smallint|gp_segment_configuration.content|Segment 的内容 ID。Coordinator 始终为 -1（无内容）。|
|dbid|smallint|gp_segment_configuration.dbid|Segment 实例的唯一 ID。|
|distributed_xid|xid| |全局事务 ID。|
|status|text| |分布式事务的状态（已提交或已中止）。|
|local_transaction|xid| |本地事务 ID。|
