---
title: gp_session_endpoints
---

# gp_session_endpoints

`gp_session_endpoints` 视图列出了当前会话用户在当前会话中声明的所有活动并行检索游标所创建的端点。

端点仅在定义并行检索游标的事务期间存在，或直到游标关闭。

|列|类型|引用|描述|
|----|----|----------|-----------|
|gp_segment_id|integer| |QE 的端点 `gp_segment_id`。|
|auth_token|text| |检索会话的身份验证令牌。|
|cursorname|text| |并行检索游标的名称。|
|sessionid|integer| |创建并行检索游标的会话的标识符。|
|hostname|varchar(64)| |用于从该端点检索数据的主机名。|
|port|integer| |用于从该端点检索数据的端口号。|
|username|text| |会话用户的名称（不是当前用户）；*你需要以此用户身份启动检索会话*。|
|state|text| |端点的状态；有效状态为：<br/><br/>READY：端点已准备好被检索。<br/><br/>ATTACHED：端点已附加到检索连接。<br/><br/>RETRIEVING：检索会话当前正在从该端点检索数据。<br/><br/>FINISHED：端点已完全检索完毕。<br/><br/>RELEASED：由于错误，端点已释放且连接已关闭。|
|endpointname|text| |端点标识符；你将此标识符提供给 `RETRIEVE` 命令。|
