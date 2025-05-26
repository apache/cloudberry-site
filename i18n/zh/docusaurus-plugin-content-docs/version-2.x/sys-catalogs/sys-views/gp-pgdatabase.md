---
title: gp_pgdatabase
---

# gp_pgdatabase

`gp_pgdatabase` 视图显示 Apache Cloudberry Segment 实例的状态，以及它们是作为镜像还是主 Segment 运行。Apache Cloudberry 故障检测和恢复工具在内部使用此视图来识别发生故障的 Segment。

|列|类型|引用|描述|
|------|----|----------|-----------|
|dbid|smallint|gp_segment_configuration.dbid|系统分配的 ID。Segment (或 Coordinator) 实例的唯一标识符。|
|isprimary|boolean|gp_segment_configuration.role|此实例是否处于活动状态。它当前是否作为主 Segment 运行（与镜像相对）。|
|content|smallint|gp_segment_configuration.content|实例上数据部分的 ID。主 Segment 实例及其镜像将具有相同的内容 ID。<br/><br/>对于 Segment，该值为 0 到 *N-1*，其中 *N* 是 Apache Cloudberry 中 Segment 的数量。<br/><br/>对于 Coordinator，该值为 -1。|
|valid|boolean|gp_segment_configuration.mode|此实例是否已启动，并且模式是 *s*（同步）或 *n*（未同步）。|
|definedprimary|boolean|gp_segment_configuration.preferred_role|系统初始化时此实例是否被定义为主 Segment（与镜像相对）。|
