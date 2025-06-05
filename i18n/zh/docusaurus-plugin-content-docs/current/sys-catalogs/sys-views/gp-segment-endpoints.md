---
title: gp_segment_endpoints
---

# gp_segment_endpoints

`gp_segment_endpoints` 视图列出了当前会话用户在 QE（查询执行器）中声明的所有活动并行检索游标所创建的端点。当 Apache Cloudberry 超级用户访问此视图时，它会返回所有用户声明的所有并行检索游标在 QE 上创建的端点列表。

端点的生命周期仅限于定义并行检索游标的事务期间，或直到游标关闭。

| 列名               | 类型   | 引用 | 描述                                                                 |
|--------------------|--------|------|----------------------------------------------------------------------|
| `auth_token`       | text   |     | 检索会话的身份验证令牌。                                             |
| `databaseid`       | oid    |     | 创建并行检索游标的数据库的标识符。                                   |
| `senderpid`        | integer|     | 发送查询结果的进程标识符。                                           |
| `receiverpid`      | integer|     | 接收查询结果的检索会话的进程标识符。                                 |
| `state`            | text   |     | 端点的状态；有效状态包括：<br/><br/>- READY：端点已准备好被检索。<br/>- ATTACHED：端点已附加到检索连接。<br/>- RETRIEVING：检索会话当前正在从该端点检索数据。<br/>- FINISHED：端点已完全检索完毕。<br/>- RELEASED：由于错误，端点已释放且连接已关闭。 |
| `gp_segment_id`    | integer|     | QE 的端点 `gp_segment_id`。                                         |
| `sessionid`        | integer|     | 创建并行检索游标的会话的标识符。                                     |
| `username`         | text   |     | 会话用户的名称（非当前用户）；*需以该用户身份启动检索会话*。          |
| `endpointname`     | text   |    | 端点的标识符；在执行 `RETRIEVE` 命令时需提供此标识符。                 |
| `cursorname`       | text   |    | 并行检索游标的名称。                                                 |
