---
title: gp_stat_activity
---

# gp_stat_activity

The `pg_stat_activity` view is a cluster-wide view that displays the `pg_stat_activity` information from every primary segment.

|column|type|references|description|
|------|----|----------|-----------|
|`gp_segment_id`|integer| |Unique identifier of a segment (or coordinator) instance.|
|`datid`|oid|pg_database.oid|Database OID|
|`datname`|name| |Database name|
|`pid`|integer| |Process ID of this backend|
|`sess_id`|integer| |Session ID|
| `leader_pid` | integer | | Process ID of the leader of the session.|
|`usesysid`|oid|pg_authid.oid|OID of the user logged into this backend|
|`usename`|name| |Name of the user logged into this backend|
|`application_name`|text| |Name of the application that is connected to this backend|
|`client_addr`|inet| |IP address of the client connected to this backend. If this field is null, it indicates either that the client is connected via a Unix socket on the server machine or that this is an internal process such as autovacuum.|
|`client_hostname`|text| |Host name of the connected client, as reported by a reverse DNS lookup of `client_addr`. This field will only be non-null for IP connections, and only when log_hostname is enabled.|
|`client_port`|integer| |TCP port number that the client is using for communication with this backend, or -1 if a Unix socket is used|
|`backend_start`|timestamptz| |Time backend process was started|
|`xact_start`|timestamptz| |Transaction start time|
|`query_start`|timestamptz| |Time query began execution|
|`state_change`|timestampz| |Time when the `state` was last changed|
|`wait_event_type`|text| |Type of event for which the backend is waiting|
|`wait_event`|text| |Wait event name if backend is currently waiting|
|`state`|text| |Current overall state of this backend. Possible values are:<br/><br/>- `active`: The backend is running a query.<br/><br/>- `idle`: The backend is waiting for a new client command.<br/><br/>- `idle in transaction`: The backend is in a transaction, but is not currently running a query.<br/><br/>- `idle in transaction (aborted)`: This state is similar to idle in transaction, except one of the statements in the transaction caused an error.<br/><br/>- `fastpath function call`: The backend is running a fast-path function.<br/><br/>- `disabled`: This state is reported if `track_activities` is deactivated in this backend.|
| `backend_xid` | xid | |  The current transaction ID (XID) being executed by this backend, if any.   |
|`backend_xmin`|xid| |The minimum transaction ID that this backend needs to retain.|
|  `query_id` | bigint | | The query ID of the currently executing query. |
|`query`|text| |Text of this backend's most recent query. If `state` is active this field shows the currently running query. In all other states, it shows the last query that was run.|
| `backend_type` | text  | Describes the type of backend process (for example, "client backend", "worker process", "autovacuum worker"). |   
|`rsgid`|oid|pg_resgroup.oid|Resource group OID or `0`.|
|`rsgname`|text|pg_resgroup.rsgname|Resource group name or `unknown`.|
