---
title: 使用 gp_toolkit Schema 查看系统信息
---

# 使用 gp_toolkit Schema 查看系统信息

Apache Cloudberry 提供了一个名为 `gp_toolkit` 的管理 Schema，你可以用它查询系统目录、日志文件和操作环境中的系统状态信息。`gp_toolkit` Schema 包含多个视图，可以通过 SQL 命令访问这些视图。所有数据库用户都能访问 `gp_toolkit` Schema，虽然某些对象可能需要超级用户权限。为了方便使用，你可以将 `gp_toolkit` Schema 添加到你的 Schema 搜索路径中。例如：

```sql
=> ALTER ROLE myrole SET search_path TO myschema,gp_toolkit;
```

本文档描述了 `gp_toolkit` 中一些最有用的视图和用户定义函数（UDF）。你可能会发现 `gp_toolkit` Schema 中还有其他对象（视图、函数和外部表），这些对象是为了支持本节中描述的视图而存在，本文件中未具体描述它们。

:::caution 小心
请勿更改 `gp_toolkit` Schema 中的数据库对象，也不要在该 Schema 中创建新的数据库对象，否则可能会影响这些对象所返回信息的准确性。通过 `gpbackup` 和 `gprestore` 工具进行数据库备份和恢复时，对 `gp_toolkit` Schema 所做的任何更改都会丢失。
:::

`gp_toolkit` Schema 中的视图可以分为以下几类：

[检查需要例行维护的表](#检查需要例行维护的表)
[检查锁](#检查锁)
[检查 ao 表](#检查-ao-表)
[查看 apache cloudberry 服务器日志文件](#查看-apache-cloudberry-服务器日志文件)
[检查服务器配置文件](#检查服务器配置文件)
[检查下线的 segment](#检查下线的-segment)
[检查资源组活动和状态](#检查资源组活动和状态)
[检查资源队列活动和状态](#检查资源队列活动和状态)
[查询磁盘溢出空间使用情况](#查询磁盘溢出空间使用情况)
[查看用户和角色](#查看用户和角色)
[检查数据库对象大小和磁盘空间](#检查数据库对象大小和磁盘空间)
[检查缺失和孤立数据文件](#检查缺失和孤立数据文件)
[移动孤立数据文件](#移动孤立数据文件)
[检查不均匀的数据分布](#检查不均匀的数据分布)
[维护分区](#维护分区)

## 关于扩展

`gp_toolkit` 是在 Apache Cloudberry 中作为扩展实现的。因为此扩展在 `template1` 数据库中注册，所以你在创建的每个 Apache Cloudberry 数据库中都可以立即使用它。

## 升级扩展

安装或升级 Apache Cloudberry 时，`gp_toolkit` 扩展会自动安装。即使升级了 Apache Cloudberry，之前版本的扩展仍可在现有数据库中使用。要将扩展升级到最新版本，你需要在**每个**使用该扩展的数据库中执行以下命令：

```sql
ALTER EXTENSION gp_toolkit UPDATE TO '1.4';
```

## 检查需要例行维护的表

以下视图可以帮助识别需要进行例行维护的表（如 `VACUUM` 和/或 `ANALYZE`）。

- [`gp_bloat_diag`](#gp_bloat_diag)
- [`gp_stats_missing`](#gp_stats_missing)

`VACUUM` 或 `VACUUM FULL` 命令用于回收被删除或过期行占用的磁盘空间。由于 Apache Cloudberry 使用的是 MVCC 事务并发模型，被删除或更新的数据行虽然对新事务不可见，但仍然占用磁盘空间。过期的行会增加表在磁盘上的体积，进而降低表的扫描速度。

`ANALYZE` 命令用于收集查询优化器所需的列级统计信息。Apache Cloudberry 使用基于成本的查询优化器，依赖于数据库统计信息。准确的统计信息有助于查询优化器更好地估计选择性和查询操作将检索的行数，从而选择最有效的查询计划。

### gp_bloat_diag

该视图显示了存在膨胀问题的常规堆存储表（即实际磁盘页数超过表统计信息中预期的页数）。这些膨胀的表需要执行 `VACUUM` 或 `VACUUM FULL` 操作，以回收被删除或过期行占用的磁盘空间。所有用户都可以访问该视图，但非超级用户只能查看他们有权限访问的表。

:::tip 提示
有关返回更多表优化信息的诊断功能，请参见[检查 AO 表](#检查-ao-表)视图。
:::

该视图的列说明如下：

- `bdirelid`：表对象 ID。
- `bdinspname`：Schema 名称。
- `bdirelname`：表名称。
- `bdirelpages`：磁盘上的实际页数。
- `bdiexppages`：表数据预期的页数。
- `bdidiag`：膨胀诊断信息。

### gp_stats_missing

该视图显示了没有统计信息的表，这些表可能需要执行 `ANALYZE` 操作。

该视图的列说明如下：

- `smischema`：Schema 名称。
- `smitable`：表名称。
- `smisize`：该表是否具有统计信息？如果表没有记录行计数和行大小统计信息，则此值为假，表明该表可能需要分析。如果表中没有任何行，这个值也会为假。例如，分区表的父表始终是空的，因此始终返回假值。
- `smicols`：表中的列数。
- `smirecs`：表中记录了统计信息的列数。

## 检查锁

当事务访问某个关系（如表）时，会获取一个锁。根据获取的锁类型，后续事务可能需要等待才能访问相同的关系。有关锁类型的更多信息，请参见[事务中的并发控制](../transactional-concurrency-control.md#事务中的并发控制)的多版本并发控制机制。Apache Cloudberry 的资源队列（用于资源管理）也使用锁来控制查询进入系统。

`gp_locks_*` 系列视图可以帮助诊断由于锁而导致查询和会话等待访问对象的情况。

- [`gp_locks_on_relation`](#gp_locks_on_relation)
- [`gp_locks_on_resqueue`](#gp_locks_on_resqueue)

### gp_locks_on_relation

该视图显示当前在关系上持有的任何锁，以及与该锁相关的查询的会话信息。有关锁类型的更多信息，请参见[事务中的并发控制](../transactional-concurrency-control.md#事务中的并发控制)。所有用户都可以访问该视图，但非超级用户只能看到他们有权限访问的关系的锁。

该视图的列说明如下：

- `lorlocktype`：可锁对象的类型：`relation`、`extend`、`page`、`tuple`、`transactionid`、`object`、`userlock`、`resource queue` 或 `advisory`。
- `lordatabase`：对象所在数据库的对象 ID，如果对象是共享对象，则为零。
- `lorrelname`：关系名称。
- `lorrelation`：关系对象 ID。
- `lortransaction`：受锁影响的事务 ID。
- `lorpid`：持有或等待此锁的服务器进程的进程 ID。如果锁被准备事务持有，则为 `NULL`。
- `lormode`：当前进程持有或期望的锁模式名称。
- `lorgranted`：显示锁是否已授予（`true`）或未授予（`false`）。
- `lorcurrentquery`：当前会话中的查询。

### gp_locks_on_resqueue

:::note 注意
`gp_locks_on_resqueue` 视图只有在基于资源队列的资源管理启用时才有效。
:::

该视图显示当前在资源队列上持有的锁及相关查询会话的信息。所有用户都可以访问该视图，但非超级用户只能看到与自己会话相关的锁。

该视图的列描述如下：

- `lorusename`：运行会话的用户名称。
- `lorrsqname`：资源队列名称。
- `lorlocktype`：锁对象的类型：`resource queue`。
- `lorobjid`：锁定事务的 ID。
- `lortransaction`：受锁影响的事务 ID。
- `lorpid`：受锁影响事务的进程 ID。
- `lormode`：该进程持有或期望的锁模式名称。
- `lorgranted`：显示锁是否被授予（`true`）或未被授予（`false`）。
- `lorwaiteventtype`：等待事件的类别（例如 I/O、锁定、网络等）。
- `lorwaitevent`：具体等待事件的名称或描述（例如某个文件的 I/O 操作或锁的对象）。

## 检查 AO 表

`gp_toolkit` Schema 包含一组诊断函数，用于检查 AO 表（即 Append-Optimized 表）的状态。

创建 AO 表（或列式 AO 表）时，会自动创建一张表来存储该表的元数据信息。元数据包括每个表 Segment 中的记录数量等信息。

AO 表中可能包含不可见行——这些是已更新或删除的行，在表执行 `VACUUM` 压缩前，这些行仍保留在存储中。隐藏行通过辅助的可见性映射表（visimap）进行跟踪。

以下函数可以让你访问 AO 表和列式表的元数据，并查看其中的不可见行。

大多数函数的输入参数是 `regclass`，可以是表的 `name` 或表的 `oid`。

### __gp_aovisimap_compaction_info(oid)

该函数显示 AO 表的压缩信息，针对存储表数据的数据库 Segment 上的磁盘数据文件。你可以利用这些信息确定 `VACUUM` 操作将压缩哪些 AO 表的数据文件。

:::tip 提示
在 `VACUUM` 操作删除数据文件中的行之前，尽管这些行对新事务不可见，已删除或更新的行仍会占用磁盘空间。配置参数 `gp_appendonly_compaction` 控制 `VACUUM` 的功能。
:::

下表描述了 `__gp_aovisimap_compaction_info` 函数输出的列信息：

- `content`：数据库 Segment ID。
- `datafile`：Segment 上的数据文件 ID。
- `compaction_possible`：此值为 `t` 或 `f`，值为 `t` 表示执行 `VACUUM` 时可以对数据文件进行压缩。服务器配置参数 `gp_appendonly_compaction_threshold` 会影响此值。
- `hidden_tupcount`：数据文件中隐藏（已删除或更新）行的数量。
- `total_tupcount`：数据文件中的行总数。
- `percent_hidden`：数据文件中隐藏行占总行数的百分比。

### __gp_aoseg(regclass)

该函数返回 AO 表磁盘 Segment 文件的元数据。

输入参数是 AO 表的名称或 OID。输出的列描述如下：

- `segment_id`：数据分片在集群中的 Segment ID。
- `segno`：文件 Segment 编号。
- `eof`：该文件 Segment 的有效文件结束位置。
- `tupcount`：Segment 中的元组总数，包括不可见的元组。
- `varblockcount`：文件 Segment 中的可变块总数。
- `eof_uncompressed`：如果文件 Segment 未压缩，则显示文件结束的位置。
- `modcount`：数据修改操作的次数。
- `formatversion`：AO 文件的存储格式版本，用于指示文件所使用的格式版本。
- `state`：文件 Segment 的状态，指示该 Segment 是否处于活动状态或在压缩后等待删除。

### __gp_aoseg_history(regclass)

该函数返回 AO 表磁盘 Segment 文件的元数据历史信息，显示所有不同版本（堆元组）的 `aoseg` 元数据。虽然数据较复杂，但对于有系统深入理解的用户来说，可能在调试时有用。

输入参数是 AO 表的名称或 OID。输出的列描述如下：

- `segment_id`：数据分片在集群中的 Segment ID。
- `segno`：文件 Segment 编号。
- `tupcount`：Segment 中的元组总数，包括不可见的元组。
- `eof`：该文件 Segment 的有效文件结束位置。
- `eof_uncompressed`：如果文件 Segment 未压缩，则显示文件结束的位置。
- `modcount`：数据修改操作的次数。
- `formatversion`：AO 文件的存储格式版本，用于指示文件所使用的格式版本。
- `state`：文件 Segment 的状态，指示该 Segment 是否处于活动状态或在压缩后等待删除。

### __gp_aocsseg(regclass)

该函数返回列存储的 AO 表的磁盘 Segment 文件中的元数据信息，不包括不可见行。每行描述表中某列的 Segment 信息。

输入参数是列存储 AO 表的名称或 OID。输出的列描述如下：

- `segment_id`：数据分片在集群中的 Segment ID。
- `segno`：文件 Segment 编号。
- `column_num`：列号。
- `physical_segno`：Segment 文件中的 Segment 编号。
- `tupcount`：Segment 中的元组总数，包括不可见的元组。
- `eof`：该文件 Segment 的有效文件结束位置。
- `eof_uncompressed`：如果文件 Segment 未压缩，则显示文件结束的位置。
- `modcount`：数据修改操作的次数。
- `formatversion`：AO 文件的存储格式版本，用于指示文件所使用的格式版本。
- `state`：文件 Segment 的状态，指示该 Segment 是否处于活动状态或在压缩后等待删除。

### __gp_aocsseg_history(regclass)

此函数返回列式 AO 表的磁盘 Segment 文件中的元数据信息。每一行描述表中某列的一个 Segment。数据较为复杂，但对于深入了解系统的用户来说，这些信息可能对调试有所帮助。

输入参数为列式 AO 表的名称或 oid。输出的列描述如下：

- `segment_id`：数据分片在集群中的 Segment ID。
- `segno`：文件 Segment 编号。
- `column_num`：列号。
- `physical_segno`：包含列数据的 Segment。
- `tupcount`：Segment 中的元组总数。
- `eof`：该文件 Segment 的有效文件结束位置。
- `eof_uncompressed`：如果文件 Segment 未压缩，则显示文件结束的位置。
- `modcount`：数据修改操作的次数。
- `formatversion`：AO 文件的存储格式版本，用于指示文件所使用的格式版本。
- `state`：文件 Segment 的状态，指示该 Segment 是否处于活动状态或在压缩后等待删除。

### __gp_aovisimap(regclass)

此函数根据可见性映射返回每个不可见元组的元组 ID、Segment 文件和行号。

输入参数为 AO 表的名称或 oid。输出的列描述如下：

- `tid`：元组 ID。
- `segno`：Segment 文件的编号。
- `row_num`：被删除或更新行的行号。

### __gp_aovisimap_hidden_info(regclass)

此函数返回 AO 表的 Segment 文件中隐藏和可见元组的数量。

输入参数为 AO 表的名称或 oid。输出的列描述如下：

- `segno`：Segment 文件的编号。
- `hidden_tupcount`：Segment 文件中隐藏元组的数量。
- `total_tupcount`：Segment 文件中的元组总数。

### __gp_aovisimap_entry(regclass)

此函数返回有关表的每个可见性图条目的信息。

输入参数是 AO 表的名称或 OID。输出列的描述如下：

- `segno`：可见性图条目的 Segment 号。
- `first_row_num`：条目的首行编号。
- `hidden_tupcount`：条目中隐藏元组的数量。
- `bitmap`：可见性位图的文本表示。

### __gp_aoblkdir(regclass)

对于具有或曾经具有索引的 AO/AOCO 表，此函数返回在块目录关系中记录的每个块目录条目的行；它将块目录关系的 `minipage` 列扁平化，并为每个 `minipage` 条目返回一行。

输入参数是 AO 表的名称或OID。

你必须在实用模式下对每个 Segment 执行此函数，或使用 `gp_dist_random()`，如以下示例所示：

```sql
SELECT (gp_toolkit.__gp_aoblkdir('<table_name>')).*
    FROM gp_dist_random('gp_id');
```

输出列的描述如下：

- `tupleid`：包含此块目录条目的块目录行的元组 ID。
- `segno`：物理 Segment 文件编号。
- `columngroup_no`：此 `minipage` 条目所描述列的 `attnum`（对于面向行的表始终为 `0`）。
- `entry_no`：此 `minipage` 内包含此块目录条目的条目序列号。
- `first_row_no`：此块目录条目所覆盖行的首行编号。
- `file_offset`：此块目录条目所覆盖行的起始文件偏移量。
- `row_count`：此块目录条目所覆盖行的数量。

### get_column_size(oid)

对于给定的 AOCO 表，此函数返回表中所有列的列大小和压缩比。

输入参数是列式 AO 表的对象标识符。输出列的描述如下：

- `segment`：Segment ID。
- `attnum`：列的属性编号。
- `size`：列的大小（以字节为单位）。
- `size_uncompressed`：如果列未压缩，则列的大小（以字节为单位）。
- `compression_ratio`：压缩比。

### gp_column_size

该视图汇总了所有 Segment 中列式 AO 表的列大小和压缩比。视图的列说明如下：

- `gp_segment_id`：Segment ID。
- `relid`：表的 OID（对象标识符）。
- `schema`：表所属的 schema 名称。
- `relname`：表名。
- `attnum`：列的属性编号。
- `attname`：列名。
- `size`：列的大小（以字节为单位）。
- `size_uncompressed`：如果列未被压缩，则列的大小（以字节为单位）。
- `compression_ratio`：压缩比。

### gp_column_size_summary

该视图展示了 `gp_column_size` 视图的汇总信息。它聚合了所有 Segment 中每个列式 AO 表的每列的大小和压缩比。视图的列说明如下：

- `relid`：表的 OID（对象标识符）。
- `schema`：表所属的 schema 名称。
- `relname`：表名。
- `attnum`：列的属性编号。
- `attname`：列名。
- `size`：列的大小（以字节为单位）。
- `size_uncompressed`：如果列未压缩，则列的大小（以字节为单位）。
- `compression_ratio`：压缩比。

## 查看 Apache Cloudberry 服务器日志文件

Apache Cloudberry 系统的每个组件（Coordinator、Standby Coordinator、主 Segment 和镜像 Segment）都会保留自己的服务器日志文件。`gp_log_*` 系列视图允许你对服务器日志文件发出 SQL 查询，以查找特定感兴趣的条目。使用这些视图需要超级用户权限。

- [`gp_log_command_timings`](#gp_log_command_timings)
- [`gp_log_database`](#gp_log_database)
- [`gp_log_coordinator_concise`](#gp_log_coordinator_concise)
- [`gp_log_system`](#gp_log_system)

### gp_log_command_timings

该视图使用外部表读取 Coordinator 上的日志文件，并报告数据库会话中 SQL 命令的运行时间。使用该视图需要超级用户权限。视图的列描述如下：

- `logsession`：会话标识符（以 "con" 为前缀）。
- `logcmdcount`：会话中的命令编号（以 "cmd" 为前缀）。
- `logdatabase`：数据库名称。
- `loguser`：数据库用户名称。
- `logpid`：进程 ID（以 "p" 为前缀）。
- `logtimemin`：此命令的第一个日志消息的时间。
- `logtimemax`：此命令的最后一个日志消息的时间。
- `logduration`：从开始到结束的语句持续时间。

### gp_log_database

该视图使用外部表读取整个 Apache Cloudberry 系统（Coordinator、Segment 和镜像）的服务器日志文件，并列出与当前数据库相关的日志条目。相关的日志条目可以通过会话 ID（`logsession`）和命令 ID（`logcmdcount`）识别。使用该视图需要超级用户权限。视图的列描述如下：

- `logtime`：日志消息的时间戳。
- `loguser`：数据库用户名称。
- `logdatabase`：数据库名称。
- `logpid`：关联的进程 ID（以 "p" 为前缀）。
- `logthread`：关联的线程计数（以 "th" 为前缀）。
- `loghost`：Segment 或 Coordinator 主机名。
- `logport`：Segment 或 Coordinator 端口。
- `logsessiontime`：会话连接打开的时间。
- `logtransaction`：全局事务 ID。
- `logsession`：会话标识符（以 "con" 为前缀）。
- `logcmdcount`：会话中的命令编号（以 "cmd" 为前缀）。
- `logsegment`：Segment 内容标识符（主 Segment 以 "seg" 为前缀，镜像以 "mir" 为前缀， Coordinator 的内容 ID 始终为 -1）。
- `logslice`：切片 ID（正在运行的查询计划部分）。
- `logdistxact`：分布式事务 ID。
- `loglocalxact`：本地事务 ID。
- `logsubxact`：子事务 ID。
- `logseverity`：日志级别，包括 `LOG`、`ERROR`、`FATAL`、`PANIC`、`DEBUG1` 或 `DEBUG2`。
- `logstate`：与日志消息关联的 SQL 状态代码。
- `logmessage`：日志或错误消息文本。
- `logdetail`：与错误消息关联的详细信息文本。
- `loghint`：与错误消息关联的提示信息文本。
- `logquery`：系统生成的查询文本。
- `logquerypos`：系统生成的查询文本中的游标索引。
- `logcontext`：生成此消息的上下文。
- `logdebug`：用于调试的查询字符串，包含详细信息。
- `logcursorpos`：查询字符串中的游标索引。
- `logfunction`：生成此消息的函数。
- `logfile`：生成此消息的日志文件。
- `logline`：生成此消息的日志文件中的行。
- `logstack`：与此消息相关的堆栈跟踪的完整文本。

### gp_log_coordinator_concise

该视图使用外部表从 Coordinator 日志文件中读取一部分日志字Segment。使用该视图需要超级用户权限。视图的列描述如下：

- `logtime`：日志消息的时间戳。
- `logdatabase`：数据库的名称。
- `logsession`：会话标识符（以 "con" 为前缀）。
- `logcmdcount`：会话中的命令编号（以 "cmd" 为前缀）。
- `logseverity`：日志的严重性级别。
- `logmessage`：日志或错误消息文本。

### gp_log_system

该视图使用外部表读取整个 Apache Cloudberry 系统（Coordinator 、Segment 和镜像）的服务器日志文件，并列出所有日志条目。相关日志条目可以通过会话 ID（`logsession`）和命令 ID（`logcmdcount`）进行识别。使用该视图需要超级用户权限。视图的列描述如下：

- `logtime`：日志消息的时间戳。
- `loguser`：数据库用户的名称。
- `logdatabase`：数据库的名称。
- `logpid`：相关的进程 ID（以 "p" 为前缀）。
- `logthread`：相关的线程计数（以 "th" 为前缀）。
- `loghost`：Segment 或 Coordinator 的主机名称。
- `logport`：Segment 或 Coordinator 的端口。
- `logsessiontime`：会话连接打开的时间。
- `logtransaction`：全局事务 ID。
- `logsession`：会话标识符（以 "con" 为前缀）。
- `logcmdcount`：会话中的命令编号（以 "cmd" 为前缀）。
- `logsegment`：Segment 内容标识符（对于主 Segment 以 "seg" 为前缀，镜像 Segment 以 "mir" 为前缀。Coordinator 的内容 ID 始终为 -1）。
- `logslice`：切片 ID（运行中的查询计划的一部分）。
- `logdistxact`：分布式事务 ID。
- `loglocalxact`：本地事务 ID。
- `logsubxact`：子事务 ID。
- `logseverity`：LOG、ERROR、FATAL、PANIC、DEBUG1 或 DEBUG2。
- `logstate`：与日志消息关联的 SQL 状态码。
- `logmessage`：日志或错误消息文本。
- `logdetail`：与错误消息相关的详细消息文本。
- `loghint`：与错误消息相关的提示消息文本。
- `logquery`：内部生成的查询文本。
- `logquerypos`：内部生成的查询文本中的游标索引。
- `logcontext`：生成此消息的上下文。
- `logdebug`：包含完整调试信息的查询字符串。
- `logcursorpos`：查询字符串中的游标索引。
- `logfunction`：生成此消息的函数。
- `logfile`：生成此消息的日志文件。
- `logline`：生成此消息的日志文件中的行。
- `logstack`：与此消息关联的堆栈跟踪的完整文本。

## 检查服务器配置文件

每个 Apache Cloudberry 系统的组件（Coordinator、Standby Coordinator、主 Segment 和镜像 Segment）都有自己的服务器配置文件（`postgresql.conf`）。可以使用以下 `gp_toolkit` 对象检查系统中所有主 `postgresql.conf` 文件的参数设置：

- [`gp_param_setting('parameter_name')`](#gp_param_settingparameter_name)
- [`gp_param_settings_seg_value_diffs`](#gp_param_settings_seg_value_diffs)

### gp_param_setting('parameter_name')

该函数接收一个服务器配置参数的名称，并返回 Coordinator 和每个活动 Segment 的 `postgresql.conf` 值。此函数对所有用户可用。视图的列描述如下：

- `paramsegment`：Segment 内容 ID（仅显示活动 Segment ）。Coordinator 内容 ID 始终为 `-1`。
- `paramname`：参数名称。
- `paramvalue`：参数值。

示例：

```sql
SELECT * FROM gp_toolkit.gp_param_setting('max_connections');
```

### gp_param_settings_seg_value_diffs

被分类为 *local* 参数的服务器配置参数（即每个 Segment 从其自己的 `postgresql.conf` 文件中获取参数值）应该在所有 Segment 上设置为相同的值。该视图显示了不一致的本地参数设置。预期有不同值的参数（例如 `port`）不包括在内。该视图对所有用户可用。

视图的列描述如下：

- `psdname`：参数名称。
- `psdvalue`：参数值。
- `psdcount`：拥有该值的 Segment 的数量。

## 检查下线的 Segment

可以使用 [`gp_pgdatabase_invalid`](#gp_pgdatabase_invalid) 视图检查处于下线状态的 Segment。

### gp_pgdatabase_invalid

该视图显示系统目录中标记为下线 Segment 的信息。该视图对所有用户可用。视图的列描述如下：

- `pgdbidbid`：Segment 的 dbid。每个 Segment 都有一个唯一的 dbid。
- `pgdbiisprimary`：该 Segment 当前是否作为主 Segment （活动 Segment）？（`t` 或 `f`）。
- `pgdbicontent`：此 Segment 的内容 ID。主 Segment 和镜像 Segment 将具有相同的内容 ID。
- `pgdbivalid`：此 Segment 是否在线并有效？（`t` 或 `f`）。
- `pgdbidefinedprimary`：此 Segment 在系统初始化时是否被分配为主 Segment 角色？（`t` 或 `f`）。

## 检查资源组活动和状态

:::note 注意
本节描述的资源组活动和状态视图仅在基于资源组的资源管理处于激活状态时有效。
:::

资源组用于管理事务，以避免耗尽系统的 CPU 和内存资源。每个数据库用户都被分配到一个资源组。Apache Cloudberry 在执行用户提交的事务之前，会根据用户资源组的配置限制来评估该事务。

你可以使用 `gp_resgroup_config` 视图查看每个资源组的配置情况。你可以使用 `gp_resgroup_status*` 视图来显示每个资源组的当前事务状态和资源使用情况。

- [`gp_resgroup_config`](#gp_resgroup_config)
- [`gp_resgroup_role`](#gp_resgroup_role)
- [`gp_resgroup_status`](#gp_resgroup_status)
- [`gp_resgroup_status_per_host`](#gp_resgroup_status_per_host)
- [`gp_resgroup_status_per_segment`](#gp_resgroup_status_per_segment)

### gp_resgroup_config

`gp_resgroup_config` 视图允许管理员查看资源组的当前 CPU、内存和并发限制。

该视图对所有用户可用。视图的列描述如下：

- `groupid`：资源组的 ID。
- `groupname`：资源组的名称。
- `concurrency`：资源组指定的并发 (`CONCURRENCY`) 值。
- `cpu_max_percent`：资源组指定的 CPU 限制 (`CPU_MAX_PERCENT`) 值，或为 `-1`。
- `cpu_weight`：资源组的调度优先级 (`CPU_WEIGHT`)。
- `cpuset`：为资源组保留的 CPU 核心 (CPUSET)，或为 -1。
- `memory_quota`：资源组指定的内存配额值。
- `min_cost`：要包含在资源组中的查询计划的最小成本 (`MIN_COST`)。
- `io_limit`：为分配给特定表空间 (以表空间 oid 显示) 和资源组的查询设置的最大顺序读写磁盘 I/O 吞吐量，以及每秒的最大读写 I/O 操作 (`IO_LIMIT`)。

### gp_resgroup_role

`gp_resgroup_role` 视图允许管理员查看分配给每个角色的资源组。

该视图对所有用户可用。视图的列描述如下：

- `rrrolname`：角色的名称。
- `rrrsgname`：资源组的名称。

### gp_resgroup_status

`gp_resgroup_status` 视图允许管理员查看资源组的状态和活动。它显示每个资源组有多少查询在等待执行，以及当前系统中有多少查询正在运行。该视图还展示了资源组的当前内存和 CPU 使用情况。

:::note 注意
资源组使用主机系统上配置的 Linux 控制组（cgroups）。这些 cgroups 用于管理主机系统资源。当资源组使用的是嵌套 cgroups 中的一部分时，资源组的限制是相对于父 cgroup 的分配。有关嵌套 cgroups 和 Apache Cloudberry 资源组限制的信息，请参阅《使用资源组》文档。
:::

该视图对所有用户开放。视图的各列描述如下：

- `groupid`：资源组的 ID。
- `groupname`：资源组的名称。
- `num_running`：当前在资源组中运行的事务数量。
- `num_queueing`：当前在资源组中排队的事务数量。
- `num_queued`：自 Apache Cloudberry 集群上次启动以来，资源组中排队的事务总数（不包括 `num_queueing`）。
- `num_executed`：自 Apache Cloudberry 集群上次启动以来，在资源组中执行的事务总数（不包括 `num_running`）。
- `total_queue_duration`：自 Apache Cloudberry 集群上次启动以来，任何事务排队的总时长。

`gp_resgroup_status` 视图的示例输出：

```sql
select * from gp_toolkit.gp_resgroup_status;

groupid | groupname | num_running | num_queueing | num_queued | num_executed | total_queue_duration 
---------+-----------+-------------+--------------+------------+--------------+----------------------
(0 rows)
```

### gp_resgroup_status_per_host

`gp_resgroup_status_per_host` 视图显示每个资源组在每个主机上的实时 CPU 和内存使用情况（MB）。该视图还展示了每个资源组在主机上的可用和分配的固定内存和共享内存。

视图的各列描述如下：

- `groupid`：资源组的 ID。
- `groupname`：资源组的名称。
- `hostname`：分 Segment 主机的主机名。
- `cpu_usage`：资源组在主机上的实时 CPU 核心使用情况。该值为资源组在主机上使用的 CPU 核心百分比（以浮点值表示）的总和。
- `memory_usage`：每个数据库 Segment 主机上资源组的实时内存使用情况，以 MB 为单位。

`gp_resgroup_status_per_host` 视图的示例输出：

```sql
select * from gp_toolkit.gp_resgroup_status_per_host;
groupid | groupname | hostname | cpu_usage | memory_usage 
---------+-----------+----------+-----------+--------------
(0 rows)
```

### gp_resgroup_status_per_segment

`gp_toolkit.gp_resgroup_status_per_segment` 视图用于展示按 Segment 分组的资源组内存使用情况，统计数据由 vmem tracker 提供，单位为 MB。该视图适用于数据库管理员监控各 Segment 上资源组的内存占用情况。

:::note 注意
此视图仅在启用了资源组（Resource Group）资源管理功能的情况下可用。
:::

视图各列含义如下：

- `groupid`（类型：`oid`）：资源组的唯一标识，对应 `pg_resgroup.oid`。
- `groupname`（类型：`name`）：资源组名称，对应 `pg_resgroup.rsgname`。
- `segment_id`（类型：`smallint`）：对应 Segment 实例的 content ID，来源于 `gp_segment_configuration.content`。
- `vmem_usage`（类型：`smallint`）：该资源组在对应 Segment 上的实时内存使用量（单位：MB）。

## 检查资源队列活动和状态

Note

本节描述的资源队列活动和状态视图仅在基于资源队列的资源管理处于活动状态时有效。

资源队列的目的是限制系统在任何时刻可以执行的活动查询数量，以避免耗尽系统资源，如内存、CPU 和磁盘 I/O。所有数据库用户都被分配到一个资源队列，用户提交的每条语句在运行之前，都会先评估是否符合资源队列的限制。`gp_resq_*` 系列视图可用于检查通过各自的资源队列当前提交到系统的语句状态。需要注意的是，超级用户发出的语句不受资源排队的限制。

- [`gp_resq_activity`](#gp_resq_activity)
- [`gp_resq_activity_by_queue`](#gp_resq_activity_by_queue)
- [`gp_resq_priority_statement`](#gp_resq_priority_statement)
- [`gp_resq_role`](#gp_resq_role)
- [`gp_resqueue_status`](#gp_resqueue_status)

### gp_resq_activity

对于具有活动工作负载的资源队列，该视图显示每个通过资源队列提交的活动语句的一行。该视图对所有用户可见。

视图中的列描述如下：

- `resqprocpid`：分配给此语句的进程ID（在 Coordinator 上）。
- `resqrole`：用户名。
- `resqoid`：资源队列对象ID。
- `resqname`：资源队列名称。
- `resqstart`：语句提交给系统的时间。
- `resqstatus`：语句的状态：运行中、等待中或已取消。

### gp_resq_activity_by_queue

对于具有活动工作负载的资源队列，该视图显示队列活动的汇总。该视图对所有用户可见。

视图中的列描述如下：

- `resqoid`：资源队列对象ID。
- `resqname`：资源队列名称。
- `resqlast`：提交到队列的最后一条语句的时间。
- `resqstatus`：最后一条语句的状态：运行中、等待中或已取消。
- `resqtotal`：此队列中的语句总数。

### gp_resq_priority_statement

该视图显示了当前在 Apache Cloudberry 系统中运行的所有语句的资源队列优先级、会话 ID 以及其他相关信息。所有用户均可访问该视图。

视图中的列描述如下：

- `rqpdatname`：当前会话连接的数据库名称。
- `rqpusename`：发出该语句的用户。
- `rqpsession`：会话 ID。
- `rqpcommand`：该会话中的语句编号（命令 ID 和会话 ID 唯一标识一条语句）。
- `rqppriority`：此语句的资源队列优先级（`MAX`、`HIGH`、`MEDIUM`、`LOW`）。
- `rqpweight`：与该语句优先级相关的整数值。
- `rqpquery`：该语句的查询文本。

### gp_resq_role

该视图显示与某个角色相关联的资源队列。所有用户均可访问该视图。

视图中的列描述如下：

- `rrrolname`：角色（用户）名称。
- `rrrsqname`：分配给该角色的资源队列名称。如果角色没有明确分配给资源队列，则它将处于默认资源队列 (*pg_default*) 中。

### gp_resqueue_status

该视图允许管理员查看资源队列的状态和活动情况。它显示有多少查询正在等待执行，以及来自特定资源队列的当前活动查询数量。

视图中的列描述如下：

- `queueid`：资源队列的 ID。
- `rsqname`：资源队列的名称。
- `rsqcountlimit`：资源队列的活动查询阈值。值为 `-1` 表示没有限制。
- `rsqcountvalue`：当前在资源队列中使用的活动查询槽数量。
- `rsqcostlimit`：资源队列的查询成本阈值。值为 `-1` 表示没有限制。
- `rsqcostvalue`：当前在资源队列中的所有语句的总成本。
- `rsqmemorylimit`：资源队列的内存限制。
- `rsqmemoryvalue`：当前在资源队列中的所有语句所使用的总内存。
- `rsqwaiters`：当前在资源队列中等待的语句数量。
- `rsqholders`：当前从该资源队列在系统中运行的语句数量。

## 查询磁盘溢出空间使用情况

*gp_workfile* 视图显示了当前使用磁盘溢出空间的所有查询的信息。当 Apache Cloudberry 由于内存不足无法在内存中运行查询时，会在磁盘上创建工作文件。这些信息可用于故障排除和查询优化。此外，这些视图中的信息还可以用于指定 Apache Cloudberry 配置参数 `gp_workfile_limit_per_query` 和 `gp_workfile_limit_per_segment` 的值。

- [`gp_workfile_entries`](#gp_workfile_entries)
- [`gp_workfile_usage_per_query`](#gp_workfile_usage_per_query)
- [`gp_workfile_usage_per_segment`](#gp_workfile_usage_per_segment)

### gp_workfile_entries

该视图为当前每个在 Segment 上使用工作文件的操作符提供一行信息。该视图对所有用户可用，但非超级用户只能查看他们有权限访问的数据库的信息。

视图中的列描述如下：

| 列            | 类型    | 描述                                     |
|---------------|---------|------------------------------------------|
| `datname`     | name    | 数据库名称。                             |
| `pid`         | integer | 服务器进程的进程 ID。                    |
| `sess_id`     | integer | 会话 ID。                                |
| `command_cnt` | integer | 查询的命令 ID。                          |
| `usename`     | name    | 角色名称。                               |
| `query`       | text    | 当前正在运行的查询。                     |
| `segid`       | integer | Segment ID。                             |
| `slice`       | integer | 查询计划片段，即当前执行的查询计划部分。 |
| `optype`      | text    | 创建工作文件的查询操作符类型。           |
| `size`        | bigint  | 工作文件的大小（以字节为单位）。         |
| `numfiles`    | integer | 创建的文件数量。                         |
| `prefix`      | text    | 命名相关工作文件集时使用的前缀。         |

### gp_workfile_usage_per_query

该视图为每个当前使用磁盘空间进行工作文件的查询提供一行信息。所有用户均可访问该视图，但非超级用户只能查看他们有权限访问的数据库信息。

视图的列描述如下：

| 列            | 类型    | 描述                             |
|---------------|---------|----------------------------------|
| `datname`     | name    | 数据库名称。                     |
| `pid`         | integer | 服务器进程的进程 ID。            |
| `sess_id`     | integer | 会话 ID。                        |
| `command_cnt` | integer | 查询的命令 ID。                  |
| `usename`     | name    | 角色名称。                       |
| `query`       | text    | 当前进程正在运行的查询。         |
| `segid`       | integer | Segment ID。                     |
| `size`        | numeric | 工作文件的大小（以字节为单位）。 |
| `numfiles`    | bigint  | 创建的文件数量。                 |

### gp_workfile_usage_per_segment

该视图为每个 Segment 包含一行数据。每行显示当前时间 Segment 上工作文件使用的总磁盘空间。该视图对所有用户可用，但非超级用户只能查看其有权限访问的数据库的信息。

视图的列描述如下：

| 列         | 类型     | 描述                        |
|------------|----------|-----------------------------|
| `segid`    | smallint | Segment ID。                |
| `size`     | numeric  | Segment上工作文件的总大小。 |
| `numfiles` | bigint   | 创建的文件数量。            |

## 查看用户和角色

将用户（角色）进行分组，以便更方便地管理对象权限是很常见的做法。通过这种方式，可以对整个组授予或撤销权限。在 Apache Cloudberry 中，这通过创建一个代表该组的角色来实现，然后将用户角色加入该组角色的成员。

可以使用 [`gp_roles_assigned`](#gp_roles_assigned) 视图查看系统中的所有角色及其分配的成员（如果该角色也是一个组角色）。

### gp_roles_assigned

该视图显示系统中的所有角色及其分配的成员（如果该角色也是一个组角色）。所有用户均可访问该视图。

视图的列说明如下：

- `raroleid`：角色对象 ID。如果该角色有成员（用户），则视为\*组\*角色。
- `rarolename`：角色（用户或组）名称。
- `ramemberid`：作为该角色成员的角色对象 ID。
- `ramembername`：作为该角色成员的角色名称。

## 检查数据库对象大小和磁盘空间

`gp_size_*` 系列视图可用于确定分布式 Apache Cloudberry 数据库、Schema、表或索引的磁盘空间使用情况。以下视图计算所有主 Segment （不包括镜像）的对象总大小。

- [`gp_size_of_all_table_indexes`](#gp_size_of_all_table_indexes)
- [`gp_size_of_database`](#gp_size_of_database)
- [`gp_size_of_index`](#gp_size_of_index)
- [`gp_size_of_schema_disk`](#gp_size_of_schema_disk)
- [`gp_size_of_table_and_indexes_disk`](#gp_size_of_table_and_indexes_disk)
- [`gp_size_of_table_and_indexes_licensing`](#gp_size_of_table_and_indexes_licensing)
- [`gp_size_of_table_disk`](#gp_size_of_table_disk)
- [`gp_size_of_table_uncompressed`](#gp_size_of_table_uncompressed)
- [`gp_disk_free`](#gp_disk_free)

表和索引大小视图按对象 ID 列出关系（而不是按名称）。要按名称检查表或索引的大小，必须在 `pg_class` 表中查找关系名称（`relname`）。例如：

```sql
SELECT relname as name, sotdsize as size, sotdtoastsize as 
toast, sotdadditionalsize as other 
FROM gp_size_of_table_disk as sotd, pg_class 
WHERE sotd.sotdoid=pg_class.oid ORDER BY relname;
```

### gp_size_of_all_table_indexes

该视图显示某个表所有索引的总大小。所有用户均可访问该视图，但非超级用户只能查看他们有权限访问的关系。

视图的列说明如下：

- `soatioid`：表的对象 ID。
- `soatisize`：所有表索引的总大小（以字节为单位）。
- `soatischemaname`：Schema 名称。
- `soatitablename`：表名称。

### gp_size_of_database

该视图显示了数据库的总大小。所有用户均可访问该视图，但非超级用户只能查看他们有权限访问的数据库。

视图中的列描述如下：

- `sodddatname`：数据库名称。
- `sodddatsize`：数据库大小（以字节为单位）。

### gp_size_of_index

该视图显示了索引的总大小。所有用户均可访问该视图，但非超级用户只能查看他们有权限访问的关系。

视图中的列描述如下：

- `soioid`：索引的对象 ID。
- `soitableoid`：该索引所属表的对象 ID。
- `soisize`：索引大小（以字节为单位）。
- `soiindexschemaname`：索引 Schema 名称。
- `soiindexname`：索引名称。
- `soitableschemaname`：表 Schema 名称。
- `soitablename`：表的名称。

### gp_size_of_schema_disk

该视图显示当前数据库中公共 Schema 和用户创建 Schema 的大小。所有用户均可访问该视图，但非超级用户只能查看他们有权限访问的 Schema。

视图中的列描述如下：

- `sosdnsp`：Schema 名称。
- `sosdschematablesize`：Schema 中表的总大小（以字节为单位）。
- `sosdschemaidxsize`：Schema 中索引的总大小（以字节为单位）。

### gp_size_of_table_and_indexes_disk

该视图显示表及其索引在磁盘上的大小。所有用户都可以访问该视图，但非超级用户只能查看他们有权限访问的关系。

该视图的列描述如下：

- `sotaidoid`：父表的对象 ID。
- `sotaidtablesize`：表的磁盘大小。
- `sotaididxsize`：表上所有索引的总大小。
- `sotaidschemaname`：Schema 名称。
- `sotaidtablename`：表名称。

### gp_size_of_table_and_indexes_licensing

该视图显示用于许可目的的表及其索引的总大小。使用该视图需要超级用户权限。

该视图的列描述如下：

- `sotailoid`：表的对象 ID。
- `sotailtablesizedisk`：表的总磁盘大小。
- `sotailtablesizeuncompressed`：如果表是压缩的追加优化表，显示未压缩的表大小（以字节为单位）。
- `sotailindexessize`：表中所有索引的总大小。
- `sotailschemaname`：Schema 名称。
- `sotailtablename`：表名称。

### gp_size_of_table_disk

该视图显示表在磁盘上的大小。所有用户都可以访问该视图，但非超级用户只能查看他们有权限访问的表。该视图的列描述如下：

- `sotdoid`：表的对象 ID。
- `sotdsize`：表的大小（以字节为单位）。该大小仅为主表的大小，不包括超大（TOAST）属性等辅助对象或 AO 表的额外存储对象。
- `sotdtoastsize`：如果存在，则为 TOAST 表（超大属性存储）的大小。
- `sotdadditionalsize`：反映追加优化（AO）表的 Segment 和块目录表大小。
- `sotdschemaname`：Schema 名称。
- `sotdtablename`：表名称。

### gp_size_of_table_uncompressed

该视图显示追加优化（AO）表的未压缩表大小。否则，将显示表在磁盘上的大小。使用该视图需要超级用户权限。该视图的列描述如下：

- `sotuoid`：表的对象 ID。
- `sotusize`：如果是压缩的 AO 表，则为未压缩的表大小（以字节为单位）。否则，显示表在磁盘上的大小。
- `sotuschemaname`：Schema 名称。
- `sotutablename`：表名称。

### gp_disk_free

这个外部表在活动 Segment 主机上运行 `df`（磁盘空闲）命令，并返回结果。未激活的镜像不包括在计算中。使用此外部表需要超级用户权限。视图的列描述如下：

- `dfsegment`：Segment 的内容 ID（仅显示活动 Segment）。
- `dfhostname`：Segment 主机的主机名。
- `dfdevice`：设备名称。
- `dfspace`：Segment 文件系统中的空闲磁盘空间，以千字节为单位。

## 检查缺失和孤立数据文件

Apache Cloudberry 将在目录中存在但在磁盘上缺失的关系数据文件视为缺失。相反，当 Apache Cloudberry 遇到未在任何关系中引用的意外数据文件时，它会将该文件视为孤立。

Apache Cloudberry 提供以下视图，以帮助识别当前数据库中是否存在缺失或孤立的文件：

- [`gp_move_orphaned_files()`](#gp_move_orphaned_files)
- [`gp_check_orphaned_files`](#gp_check_orphaned_files)
- [`gp_check_missing_files`](#gp_check_missing_files)

在扩展集群或进行离线维护之前，最好检查这些情况。

默认情况下，本节中识别的视图对 `PUBLIC` 可用。

### gp_check_orphaned_files

`gp_check_orphaned_files` 视图扫描默认和用户定义的表空间以查找孤立的数据文件。Apache Cloudberry 在此检查中考虑正常数据文件、名称中带下划线（`_`）的文件，以及扩展编号文件（名称中包含 `.<N>` 的文件）。`gp_check_orphaned_files` 从 Apache Cloudberry Coordinator和所有 Segment 收集结果。

视图的列描述如下：

- `gp_segment_id`：数据库 Segment 标识符。
- `tablespace`：孤立文件所在的表空间标识符。
- `filename`：孤立数据文件的文件名。
- `filepath`：孤立数据文件的文件系统路径，相对于 Coordinator 或 Segment 的数据目录。

:::caution 小心
将该视图作为识别孤立数据文件的众多数据点之一，请勿仅根据查询该视图的结果删除文件。
:::

### gp_check_missing_files

`gp_check_missing_files` 视图扫描堆和追加优化的列式表，以查找缺失的数据文件。Apache Cloudberry 在此检查中仅考虑正常的数据文件（文件名中不包含 `.` 或 `_` 的文件）。`gp_check_missing_files` 收集来自 Apache Cloudberry Coordinator 和所有 Segment 的结果。

该视图的列描述如下：

- `gp_segment_id`：数据库 Segment 标识符。
- `tablespace`：表所在表空间的标识符。
- `relname`：缺失数据文件的表名。
- `filename`：缺失数据文件的文件名。

### gp_check_missing_files_ext

`gp_check_missing_files_ext` 视图仅扫描追加优化的列式表，以查找缺失的扩展数据文件。Apache Cloudberry 在此检查中同时考虑正常数据文件和带有编号的扩展文件（文件名中包含 `.<N>` 的文件）。包含 `_` 的文件不在考虑范围内。`gp_check_missing_files_ext` 仅收集来自 Apache Cloudberry 数据库 Segment 的结果。

该视图的列描述如下：

- `gp_segment_id`：数据库 Segment 标识符。
- `tablespace`：表所在表空间的标识符。
- `relname`：缺失扩展数据文件的表名。
- `filename`：缺失扩展数据文件的文件名。

## 移动孤立数据文件

`gp_move_orphaned_files()` 用户定义函数（UDF）将通过 [`gp_check_orphaned_files`](#gp_check_orphaned_files) 视图找到的孤立文件移动到你指定的文件系统位置。

该函数的签名为： `gp_move_orphaned_files( <target_directory> TEXT )`。

`<target_directory>` 必须在所有 Segment 主机上存在，且指定的目录必须可由 `gpadmin` 用户访问。如果你为 `<target_directory>` 指定相对路径，则该路径相对于 Coordinator 或 Segment 的数据目录。

Apache Cloudberry 会将每个移动的数据文件重命名为一个反映文件在数据目录中原始位置的名称。文件名的格式取决于孤立文件所在的表空间：

| 表空间         | 重命名的文件格式                                                                  |
|----------------|-----------------------------------------------------------------------------------|
| `default`      | `seg<num>_base_<database-oid>_<relfilenode>`                                      |
| `global`       | `seg<num>_global_<relfilenode>`                                                   |
| `user-defined` | `seg<num>_pg_tblspc_<tablespace-oid>_<gpdb-version>_<database-oid>_<relfilenode>` |

例如，如果在默认表空间中名为 `12345` 的文件在主 Segment 2 中孤立，

```sql
SELECT * FROM gp_move_orphaned_files('/home/gpadmin/orphaned');
```

该命令将移动并重命名文件，如下所示：

- 原始位置: `<data_directory>/base/13700/12345`
- 新位置和文件名: `/home/gpadmin/orphaned/seg2_base_13700_12345`

`gp_move_orphaned_files()` 会返回每个移动文件的原始和新文件系统位置，并指示移动操作的成功或失败。例如：

```sql
SELECT * FROM gp_toolkit.gp_move_orphaned_files('/home/gpadmin/orphaned');
 gp_segment_id | move_success |           oldpath          |         newpath
---------------+--------------+----------------------------+-----------------------------------
            -1 | t            | /<data_dir>/base/13715/99999 | /home/gpadmin/orphaned/seg-1_base_13715_99999
             1 | t            | /<data_dir>/base/13715/99999 | /home/gpadmin/orphaned/seg1_base_13715_99999
             2 | t            | /<data_dir>/base/13715/99999 | /home/gpadmin/orphaned/seg2_base_13715_99999
(3 rows)
```

移动文件后，你可以选择删除它们或进行备份。

## 检查不均匀的数据分布

在 Apache Cloudberry 中，所有表都是分布式的，这意味着它们的数据被划分到系统中的所有 Segment 上。如果数据分布不均匀，查询处理性能可能会下降。以下视图可以帮助诊断表是否存在不均匀的数据分布：

- [`gp_toolkit.gp_skew_coefficients`](#gp_skew_coefficients)
- [`gp_toolkit.gp_skew_idle_fractions`](#gp_skew_idle_fractions)

### gp_skew_coefficients

该视图通过计算存储在每个 Segment 上的数据的变异系数 (CV) 来显示数据分布的偏斜情况。该视图对所有用户开放，但非超级用户只能查看他们有权限访问的表。

视图中的列描述如下：

- `skcoid`：表的对象 ID。
- `skcnamespace`：定义表的命名空间。
- `skcrelname`：表的名称。
- `skccoeff`：变异系数 (CV) 的计算方法是标准偏差除以平均值。它考虑了数据系列的平均值及其变动性。值越低越好，值越高则表示数据偏斜程度越大。

### gp_skew_idle_fractions

该视图通过计算在表扫描过程中系统处于空闲状态的百分比来显示数据分布的偏斜情况，这也是处理数据偏斜的一个指标。该视图对所有用户开放，但非超级用户只能查看他们有权限访问的表。

视图中的列描述如下：

- `sifoid`：表的对象 ID。
- `sifnamespace`：定义表的命名空间。
- `sifrelname`：表的名称。
- `siffraction`：在表扫描过程中系统处于空闲状态的百分比，这是不均匀数据分布或查询处理偏斜的一个指标。例如，`0.1` 表示 10% 的偏斜，`0.5` 表示 50% 的偏斜，依此类推。偏斜超过 10% 的表应评估其分布策略。

## 维护分区

如果你的数据库使用了分区，则需要定期执行某些任务以帮助维护这些分区。Apache Cloudberry 提供了一个视图和多个用户定义的函数来协助完成这些任务。

### gp_partitions

`gp_partitions` 视图显示数据库中的所有叶子分区。

该视图与旧版的 `pg_partitions` 视图保持向后兼容（该视图在 Apache Cloudberry 的早期主要版本中可用）。视图的各列描述如下：

| 列                         | 类型     | 描述                                               |
|----------------------------|----------|----------------------------------------------------|
| `schemaname`               | name     | 分区表所在 Schema 的名称。                         |
| `tablename`                | name     | 顶层父表的名称。                                   |
| `partitionschemaname`      | name     | 分区表的 Schema。                                  |
| `partitiontablename`       | name     | 分区表的关系名称（如果直接访问分区时使用的表名）。 |
| `parentpartitiontablename` | regclass | 该分区上一级父表的关系名称。                       |
| `partitiontype`            | text     | 分区类型（范围或列表）。                           |
| `partitionlevel`           | integer  | 此分区在层级中的级别。                             |
| `partitionrank`            | integer  | 对于范围分区，与同级其他分区相比的排名。           |
| `partitionlistvalues`      | text     | 对于列表分区，与该分区相关的列表值。               |
| `partitionrangestart`      | text     | 对于范围分区，此分区的起始值。                     |
| `partitionrangeend`        | text     | 对于范围分区，此分区的结束值。                     |
| `partitionisdefault`       | boolean  | 如果这是默认分区，则为 T，否则为 F。               |
| `partitionboundary`        | text     | 此分区的完整分区规范。                             |
| `parenttablespace`         | name     | 该分区上一级父表的表空间。                         |
| `partitiontablespace`      | name     | 此分区的表空间。                                   |

### 用户定义的分区维护函数

下表总结了 Apache Cloudberry 可帮助你维护分区的函数：

| 函数                                      | 返回类型 | 描述                                                                      |
|-------------------------------------------|----------|---------------------------------------------------------------------------|
| `pg_partition_rank(rp regclass)`          | integer  | 对于范围分区，返回与同级其他分区的排名。对于其他类型的分区，返回 `NULL`。 |
| `pg_partition_range_from(rp regclass)`    | text     | 返回范围分区的下界。                                                      |
| `pg_partition_range_to(rp regclass)`      | text     | 返回范围分区的上界。                                                      |
| `pg_partition_isdefault(rp regclass)`     | boolean  | 判断给定分区是否为默认分区。                                              |
| `pg_partition_lowest_child(rp regclass)`  | regclass | 找到给定分区的最低排名子分区。                                            |
| `pg_partition_highest_child(rp regclass)` | regclass | 找到给定分区的最高排名子分区。                                            |
