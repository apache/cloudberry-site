---
title: pg_stat_gssapi
---

# pg_stat_gssapi

`pg_stat_gssapi` 视图提供了与 GSSAPI（通用安全服务应用程序接口）认证和加密相关的每个连接统计信息。每一行对应一个后端进程，包含诸如是否使用了 GSSAPI 认证、主体名称、是否启用加密以及凭据是否被委派等信息。该视图可以通过 `pid` 字段与 `pg_stat_activity` 或 `pg_stat_replication` 连接，以获取每个连接的更多详细信息。

| 字段 | 类型 | 引用 | 描述 |
|---|---|---|---|
| `pid` | integer | | 后端进程 ID。 |
| `gss_authenticated boolean` | boolean | | 如果此连接使用了 GSSAPI 认证，则为 True。 |
| `principal` | text | | 用于认证此连接的主体，如果此连接未使用 GSSAPI 进行认证，则为 NULL。如果主体名称的长度超过 `NAMEDATALEN`（标准构建中为 64 个字符），则此字段将被截断。 |
| `encrypted` | boolean | | 如果此连接正在使用 GSSAPI 加密，则为 True。 |
