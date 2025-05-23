---
title: gp_stat_activity
---

# gp_stat_activity

`pg_stat_activity` 视图是一个集群范围的视图，显示来自每个主 Segment 的 `pg_stat_activity` 信息。

|列|类型|引用|描述|
|------|----|----------|-----------|
|`gp_segment_id`|integer| |Segment (或 Coordinator) 实例的唯一标识符。|
|`datid`|oid|pg_database.oid|数据库 OID|
|`datname`|name| |数据库名称|
|`pid`|integer| |此后端进程的 ID|
|`sess_id`|integer| |会话 ID|
| `leader_pid` | integer | | 会话领导者的进程 ID。|
|`usesysid`|oid|pg_authid.oid|登录此后端的用户的 OID|
|`usename`|name| |登录此后端的用户的名称|
|`application_name`|text| |连接到此后端的应用程序名称|
|`client_addr`|inet| |连接到此客户端的 IP 地址。如果此字段为 null，则表示客户端通过服务器机器上的 Unix 套接字连接，或者这是一个内部进程（如 autovacuum）。|
|`client_hostname`|text| |连接客户端的主机名，由 `client_addr` 的反向 DNS 查找报告。此字段仅在 IP 连接非空时，并且仅在 `log_hostname` 启用时才非空。|
|`client_port`|integer| |客户端用于与此后端通信的 TCP 端口号，如果使用 Unix 套接字则为 -1|
|`backend_start`|timestamptz| |后端进程启动时间|
|`xact_start`|timestamptz| |事务开始时间|
|`query_start`|timestamptz| |查询开始执行时间|
|`state_change`|timestampz| |`state` 最后一次更改的时间|
|`wait_event_type`|text| |后端正在等待的事件类型|
|`wait_event`|text| |如果后端当前正在等待，则为等待事件名称|
|`state`|text| |此后端的当前整体状态。可能的值为：<br/><br/>- `active`：后端正在运行查询。<br/><br/>- `idle`：后端正在等待新的客户端命令。<br/><br/>- `idle in transaction`：后端处于事务中，但当前未运行查询。<br/><br/>- `idle in transaction (aborted)`：此状态类似于 `idle in transaction`，但事务中的某个语句导致了错误。<br/><br/>- `fastpath function call`：后端正在运行快速路径函数。<br/><br/>- `disabled`：如果此后端中 `track_activities` 被停用，则报告此状态。|
| `backend_xid` | xid | | 此后端当前正在执行的事务 ID (XID)（如果有）。 |
|`backend_xmin`|xid| |此后端需要保留的最小事务 ID。|
| `query_id` | bigint | | 当前正在执行的查询的查询 ID。 |
|`query`|text| |此后端最近查询的文本。如果 `state` 为 `active`，此字段显示当前正在运行的查询。在所有其他状态下，它显示最后运行的查询。|
| `backend_type` | text | 描述后端进程的类型（例如，"client backend"、"worker process"、"autovacuum worker"）。 |
|`rsgid`|oid|pg_resgroup.oid|资源组 OID 或 `0`。|
|`rsgname`|text|pg_resgroup.rsgname|资源组名称或 `unknown`。|
