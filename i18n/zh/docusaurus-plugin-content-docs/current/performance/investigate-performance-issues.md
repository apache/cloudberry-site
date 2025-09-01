---
title: 如何排查性能问题
---

# 如何排查性能问题

本章将指导你如何识别并排查 Apache Cloudberry 系统中的性能问题。

你可以按照以下步骤，一步步找出性能问题的根源。如果只是某个查询或工作负载变慢，那么问题可能出在它本身。但如果整个系统性能都出现问题，则很可能是硬件故障、系统异常或资源争用导致的。

## 检查系统状态

首先，使用 `gpstate` 工具检查是否有发生故障的 Segment。一旦有 Segment 实例宕机，其处理任务会转移到其他主机上，这必然导致整个 Apache Cloudberry 系统性能下降。

Segment 故障往往是硬件问题的征兆，比如磁盘或网卡损坏。你可以使用 Apache Cloudberry 自带的硬件验证工具 `gpcheckperf`，快速找出有硬件问题的 Segment 主机。

## 检查数据库活动

- [检查活动会话（工作负载）](#检查活动会话工作负载)
- [检查锁（资源争用）](#检查锁资源争用)
- [检查查询状态和系统利用率](#检查查询状态和系统利用率)

### 检查活动会话（工作负载）

`pg_stat_activity` 是一个系统目录视图，它的每一行都对应一个正在运行的服务器进程，其中包含了数据库 OID、数据库名称、进程 ID、用户 OID、用户名、当前查询、查询开始时间、进程启动时间、客户端地址和端口号等信息。为了看到最全面的系统负载信息，建议使用数据库超级用户身份来查询该视图。例如：

```sql
SELECT * FROM pg_stat_activity;
```

请注意，这些信息不是瞬时更新的。

### 检查锁（资源争用）

`pg_locks` 系统目录视图可以让你一览所有未释放的锁。当一个事务锁定了某个对象，其他查询就只能排队等待，直到锁被释放。从用户的角度看，就是查询好像卡住了。

只要查询 `pg_locks` 中那些“未被授予”（granted=false）的锁，就能很快定位到客户端会话之间的资源争用。`pg_locks` 提供了数据库系统中所有锁的全局视图，而不仅仅是当前数据库的锁。你可以将其 `relation` 列与 `pg_class.oid` 进行连接，以识别被锁定的关系（例如表），但这仅对当前数据库中的关系有效。你还可以将其 `pid` 列与 `pg_stat_activity.pid` 连接，以查看关于持有锁或等待锁的会话的更多信息。例如：

```sql
SELECT locktype, database, c.relname, l.relation, 
l.transactionid, l.pid, l.mode, l.granted, 
a.query 
        FROM pg_locks l, pg_class c, pg_stat_activity a 
        WHERE l.relation=c.oid AND l.pid=a.pid
        ORDER BY c.relname;
```

如果你使用了资源组，等待执行的查询也会出现在 `pg_locks` 中。要查看在某个资源组中有多少查询正在等待，可以使用 `gp_toolkit.gp_resgroup_status` 系统目录视图。例如：

```sql
SELECT * FROM gp_toolkit.gp_resgroup_status;
```

同理，如果你使用了资源队列，在队列中等待的查询也会显示在 `pg_locks` 中。要查看有多少查询在等待执行，可以使用 `gp_toolkit.gp_resqueue_status` 系统目录视图。例如：

```sql
SELECT * FROM gp_toolkit.gp_resqueue_status;
```

### 检查查询状态和系统利用率

要监控 Apache Cloudberry 集群上各个主机的数据库活动，可以借助 `ps`、`top`、`iostat`、`vmstat`、`netstat` 等常见的系统监控工具。借助这些工具，你可以轻易找出当前正在运行的 Apache Cloudberry 进程（即 `postgres` 进程），并定位到那些消耗 CPU、内存、磁盘I/O或网络资源最多的任务。通过分析这些系统统计数据，你就能揪出那些因过度消耗资源而拖慢系统性能的查询。

更方便的是，你可以使用 Apache Cloudberry 的管理工具 `gpssh`，在所有主机上同时运行这些监控命令。

你也可以创建并使用 Apache Cloudberry 的 `session_level_memory_consumption` 视图，该视图提供了正在运行查询的会话的当前内存利用率和空闲时间等信息。有关该视图的更多信息，请参阅[查看会话内存使用信息](../sys-admin/check-database-system.md)。

## 排查有问题的查询

当某个查询性能不佳时，分析它的查询计划是排查问题的关键。使用 `EXPLAIN` 命令就能获取任何查询的执行计划。有关解读查询计划和识别问题的更多信息，请参阅[分析查询性能](./optimize-queries/analyze-query-performance.md)。

当查询执行期间发生内存不足事件时，Apache Cloudberry 的内存核算框架会详细记录下事件发生时每个正在运行的查询的内存消耗情况。这些信息会被写入 Apache Cloudberry 的 Segment 日志中。

## 调查错误消息

Apache Cloudberry 的日志都存放在 Coordinator 或 Segment 的数据目录下的 `log` 文件夹里。排查问题时，应优先查看 Coordinator 的日志，因为它的信息最全。日志文件每天会进行轮转，并采用 `gpdb-YYYY-MM-DD_hhmmss.csv` 的命名约定。要找到 Coordinator 主机上的日志文件，可以执行：

```shell
$ cd $COORDINATOR_DATA_DIRECTORY/log
```

日志行的格式如下：

```shell
<timestamp> | <user> | <database> | <statement_id> | <con#><cmd#> 
|:-<LOG_LEVEL>: <log_message>
```

你应当重点关注 `WARNING`、`ERROR`、`FATAL` 或 `PANIC` 这几个级别的日志。为了方便搜索，Cloudberry 提供了 `gplogfilter` 工具，可以高效地筛选日志文件。例如，在 Coordinator 主机上运行以下命令，即可检查标准日志位置中的问题日志：

```shell
$ gplogfilter -t
```

如果需要进一步在所有 Segment 的日志中查找相关条目，可以通过 `gpssh` 在所有 Segment 主机上运行 `gplogfilter`。利用 `statement_id` 或 `con#`（会话标识符）可以很方便地将分布在各处的日志关联起来。例如，要在所有 Segment 日志中搜索包含字符串 `con6` 的条目并将输出保存到文件：

```shell
gpssh -f seg_hosts_file -e 'source 
/usr/local/cloudberry-db/cloudberry-env.sh ; gplogfilter -f 
con6 /gpdata/*/log/gpdb*.csv' > seglog.out
```