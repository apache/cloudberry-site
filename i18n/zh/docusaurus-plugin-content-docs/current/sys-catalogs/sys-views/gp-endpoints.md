---
title: gp_endpoints
---

# gp_endpoints

`gp_endpoints` 视图列出了当前会话用户在当前数据库中声明的所有活动并行检索游标所创建的端点。当 Apache Cloudberry 超级用户访问此视图时，它会返回当前数据库中所有用户声明的所有并行检索游标所创建的端点列表。

端点的生命周期仅限于定义并行检索游标的事务期间，或直到游标关闭。

| 名称               | 类型          | 引用 | 描述                                                                 |
|--------------------|---------------|------|----------------------------------------------------------------------|
| `gp_segment_id`    | integer       |     | 该端点所在的 QE（查询执行器）的 `gp_segment_id`。                     |
| `auth_token`       | text          |     | 用于检索会话的身份验证令牌。                                         |
| `cursorname`       | text          |     | 并行检索游标的名称。                                                 |
| `sessionid`        | integer       |     | 创建并行检索游标的会话的标识符。                                     |
| `hostname`         | varchar(64)   |     | 用于从该端点检索数据的主机名。                                       |
| `port`             | integer       |     | 用于从该端点检索数据的端口号。                                       |
| `username`         | text          |     | 会话用户的名称（非当前用户）；*需以该用户身份启动检索会话*。          |
| `state`            | text          |     | 端点的状态；有效状态包括：<br/><br/>- READY：端点已准备好被检索。<br/>- ATTACHED：端点已附加到检索连接。<br/>- RETRIEVING：检索会话当前正在从该端点检索数据。<br/>- FINISHED：端点已完全检索完毕。<br/>- RELEASED：由于错误，端点已释放且连接已关闭。 |
| `endpointname`     | text          |     | 端点的标识符；在执行 RETRIEVE 命令时需提供此标识符。                   |
