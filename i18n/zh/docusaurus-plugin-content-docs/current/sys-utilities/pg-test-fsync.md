---
title: pg_test_fsync
---

# pg_test_fsync

确定最快的将写前日志（WAL）更新强制写入磁盘的同步方法，即最快的 `wal_sync_method`。

## 语法概要

```shell
pg_test_fsync [<option> ...]

pg_test_fsync -? | --help

pg_test_fsync -V | --version
```

## 描述

`pg_test_fsync` 是一个标准的PostgreSQL工具，用于确定在你的系统上最快的 `wal_sync_method`。它还提供诊断信息，帮助排查已发现的 I/O 问题。然而，`pg_test_fsync` 报告的差异可能对实际数据库吞吐量影响不大，因为许多数据库服务器的性能并不受限于写前日志的速度。

`pg_test_fsync` 报告中包含了每种 `wal_sync_method` 的平均文件同步操作时间，单位为微秒。这些信息也可用于优化 `commit_delay` 参数的数值，用于配置启动WAL刷新之前的延迟时间。


## 选项

以下是可用的命令行选项:

**`-f`**<br />
**`--filename`**

指定用于写入测试数据的文件名。该文件必须位于与 `pg_wal` 目录，即存储WAL文件的目录，相同的文件系统中。默认情况下，文件名为 `pg_test_fsync.out`，并创建于当前目录中。

**`-s`**<br />
**`--secs-per-test`**

设置每个测试的持续时间，以秒为单位。更长的测试时间可以提高测试精度，但也会延长总运行时间。默认值为5秒，使程序能够在不到2分钟内完成。

**`-V`**<br />
**`--version`**

输出 `pg_test_fsync` 的版本号并退出。

**`-?`**<br />
**`--help`**

显示有关 `pg_test_fsync` 命令行参数的帮助信息，并退出。


## 环境变量

**`PG_COLOR`**

指定是否在诊断消息中使用颜色。可能的值为 `always`，`auto`，和 `never`。