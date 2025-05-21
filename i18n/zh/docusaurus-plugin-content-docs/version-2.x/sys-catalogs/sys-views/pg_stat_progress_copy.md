---
title: pg_stat_progress_copy
---

# pg_stat_progress_copy

`pg_stat_progress_copy` 视图显示了当前正在运行的 `COPY` 命令的进度。每一行代表一个执行 `COPY` 操作的后端进程，并提供诸如命令类型（`COPY FROM` 或 `COPY TO`）、I/O 类型（例如，`FILE` 和 `PIPE`）、已处理的字节数和元组数，以及因错误而排除或跳过的元组计数等详细信息。该视图有助于监控长时间运行的 `COPY` 操作。

| 字段 | 类型 | 描述 |
|---|---|---|
| `gp_segment_id` | integer | Segment（或 Coordinator）实例的唯一标识符。（此字段不在 `gp_stat_progress_copy_summary` 视图中。） |
| `pid` | integer | 后端进程的 ID，如果是在 `gp_stat_progress_copy_summary` 视图中，则是 Coordinator 进程的 ID。 |
| `datid` | oid | 此后端连接的数据库的对象标识符。 |
| `datname` | name | 此后端连接的数据库名称。 |
| `relid` | oid | 执行 `COPY` 命令的表的对象标识符。如果从 `SELECT` 查询复制，则设置为 `0`。 |
| `command` | text | 正在运行的命令：`COPY FROM`、`COPY TO`、`COPY FROM ON SEGMENT` 或 `COPY TO ON SEGMENT`。 |
| `type` | text | 读取或写入数据的 I/O 类型：`FILE`、`PROGRAM`、`PIPE`（用于 `COPY FROM STDIN` 和 `COPY TO STDOUT`），或 `CALLBACK`（例如在逻辑复制中的初始表同步期间使用）。 |
| `bytes_processed` | bigint | `COPY` 命令已处理的字节数。 |
| `bytes_total` | bigint | `COPY FROM` 命令源文件的大小（字节）。如果不可用，则设置为 `0`。 |
| `tuples_processed` | bigint | `COPY` 命令已处理的元组数。 |
| `tuples_excluded` | bigint | 因 `COPY` 命令的 `WHERE` 子句排除而未处理的元组数。 |
