---
title: postgres
---

# postgres 命令使用说明

`postgres` 是 PostgreSQL 数据库服务器的核心可执行文件，用于启动和管理数据库实例。本文将详细介绍 `postgres` 命令的常用选项及其使用方法。

---

## 基本语法

`postgres` 命令的基本语法如下：

```bash
postgres [OPTION]...
```

---

## 常用选项

以下是 `postgres` 命令的常用选项及其说明和示例。

### 数据库目录 (`-D`)

指定数据库集群的数据目录，数据目录包含数据库的所有数据文件和配置文件。

**示例：**

```bash
(base) admin@admindeMBP ~ % postgres -D /Users/admin/postgres
2025-02-25 23:10:12.898 CST [8806] LOG:  starting PostgreSQL 14.15 (Homebrew) on aarch64-apple-darwin23.6.0, compiled by Apple clang version 16.0.0 (clang-1600.0.26.4), 64-bit
2025-02-25 23:10:12.899 CST [8806] LOG:  listening on IPv6 address "::1", port 5432
2025-02-25 23:10:12.899 CST [8806] LOG:  listening on IPv4 address "127.0.0.1", port 5432
2025-02-25 23:10:12.900 CST [8806] LOG:  listening on Unix socket "/tmp/.s.PGSQL.5432"
2025-02-25 23:10:12.904 CST [8807] LOG:  database system was interrupted; last known up at 2025-02-25 23:08:46 CST
2025-02-25 23:10:12.960 CST [8807] LOG:  database system was not properly shut down; automatic recovery in progress
2025-02-25 23:10:12.961 CST [8807] LOG:  redo starts at 0/17482B0
2025-02-25 23:10:12.961 CST [8807] LOG:  invalid record length at 0/17482E8: wanted 24, got 0
2025-02-25 23:10:12.961 CST [8807] LOG:  redo done at 0/17482B0 system usage: CPU: user: 0.00 s, system: 0.00 s, elapsed: 0.00 s
2025-02-25 23:10:12.966 CST [8806] LOG:  database system is ready to accept connections
```

---

### 共享缓冲区的数量 (`-B`)

-B 选项指定了 共享缓冲区的数量

**示例：**

```bash
(base) admin@admindeMBP ~ % postgres -D /Users/admin/postgres -B 16384
2025-02-25 23:10:59.653 CST [10062] LOG:  starting PostgreSQL 14.15 (Homebrew) on aarch64-apple-darwin23.6.0, compiled by Apple clang version 16.0.0 (clang-1600.0.26.4), 64-bit
2025-02-25 23:10:59.654 CST [10062] LOG:  listening on IPv6 address "::1", port 5432
2025-02-25 23:10:59.654 CST [10062] LOG:  listening on IPv4 address "127.0.0.1", port 5432
2025-02-25 23:10:59.655 CST [10062] LOG:  listening on Unix socket "/tmp/.s.PGSQL.5432"
2025-02-25 23:10:59.658 CST [10063] LOG:  database system was interrupted; last known up at 2025-02-25 23:10:12 CST
2025-02-25 23:10:59.715 CST [10063] LOG:  database system was not properly shut down; automatic recovery in progress
2025-02-25 23:10:59.716 CST [10063] LOG:  redo starts at 0/1748360
2025-02-25 23:10:59.716 CST [10063] LOG:  invalid record length at 0/1748398: wanted 24, got 0
2025-02-25 23:10:59.716 CST [10063] LOG:  redo done at 0/1748360 system usage: CPU: user: 0.00 s, system: 0.00 s, elapsed: 0.00 s
2025-02-25 23:10:59.720 CST [10062] LOG:  database system is ready to accept connections
```

---

### 设置运行时参数 (`-c`)

通过 `-c` 选项可以设置运行时参数，格式为 `NAME=VALUE`。

**示例：**

设置日志级别为 `info`：

```bash
(base) admin@admindeMBP ~ % postgres -D /Users/admin/postgres -c log_min_messages=info 
2025-02-25 23:13:34.168 CST [14655] LOG:  starting PostgreSQL 14.15 (Homebrew) on aarch64-apple-darwin23.6.0, compiled by Apple clang version 16.0.0 (clang-1600.0.26.4), 64-bit
2025-02-25 23:13:34.169 CST [14655] LOG:  listening on IPv6 address "::1", port 5432
2025-02-25 23:13:34.169 CST [14655] LOG:  listening on IPv4 address "127.0.0.1", port 5432
2025-02-25 23:13:34.170 CST [14655] LOG:  listening on Unix socket "/tmp/.s.PGSQL.5432"
2025-02-25 23:13:34.173 CST [14656] LOG:  database system was interrupted; last known up at 2025-02-25 23:12:23 CST
2025-02-25 23:13:34.229 CST [14656] LOG:  database system was not properly shut down; automatic recovery in progress
2025-02-25 23:13:34.230 CST [14656] LOG:  redo starts at 0/1748620
2025-02-25 23:13:34.230 CST [14656] LOG:  invalid record length at 0/1748658: wanted 24, got 0
2025-02-25 23:13:34.230 CST [14656] LOG:  redo done at 0/1748620 system usage: CPU: user: 0.00 s, system: 0.00 s, elapsed: 0.00 s
2025-02-25 23:13:34.234 CST [14655] LOG:  database system is ready to accept connections
```

---

### 打印运行时参数 (`-C`)

打印指定运行时参数的值，然后退出。

**示例：**

打印 `max_connections` 的当前值：

```bash
(base) admin@admindeMBP ~ % postgres -D /Users/admin/postgres -C max_connections
100
```

---

### 调试级别 (`-d`)

设置调试级别，范围为 `1-5`，数字越大，输出信息越详细。

**示例：**

设置调试级别为 `1`：

```bash
(base) admin@admindeMBP ~ % postgres -D /Users/admin/postgres -d 1
2025-02-25 23:14:30.644 CST [16415] DEBUG:  registering background worker "logical replication launcher"
2025-02-25 23:14:30.648 CST [16415] LOG:  starting PostgreSQL 14.15 (Homebrew) on aarch64-apple-darwin23.6.0, compiled by Apple clang version 16.0.0 (clang-1600.0.26.4), 64-bit
2025-02-25 23:14:30.649 CST [16415] LOG:  listening on IPv6 address "::1", port 5432
2025-02-25 23:14:30.649 CST [16415] LOG:  listening on IPv4 address "127.0.0.1", port 5432
2025-02-25 23:14:30.650 CST [16415] LOG:  listening on Unix socket "/tmp/.s.PGSQL.5432"
2025-02-25 23:14:30.653 CST [16416] LOG:  database system was interrupted; last known up at 2025-02-25 23:14:14 CST
2025-02-25 23:14:30.703 CST [16416] DEBUG:  checkpoint record is at 0/1748708
2025-02-25 23:14:30.703 CST [16416] DEBUG:  redo record is at 0/1748708; shutdown true
2025-02-25 23:14:30.703 CST [16416] DEBUG:  next transaction ID: 747; next OID: 24576
2025-02-25 23:14:30.703 CST [16416] DEBUG:  next MultiXactId: 1; next MultiXactOffset: 0
2025-02-25 23:14:30.703 CST [16416] DEBUG:  oldest unfrozen transaction ID: 726, in database 1
2025-02-25 23:14:30.703 CST [16416] DEBUG:  oldest MultiXactId: 1, in database 1
2025-02-25 23:14:30.703 CST [16416] DEBUG:  commit timestamp Xid oldest/newest: 0/0
2025-02-25 23:14:30.703 CST [16416] DEBUG:  transaction ID wrap limit is 2147484373, limited by database with OID 1
2025-02-25 23:14:30.703 CST [16416] DEBUG:  MultiXactId wrap limit is 2147483648, limited by database with OID 1
2025-02-25 23:14:30.703 CST [16416] DEBUG:  starting up replication slots
2025-02-25 23:14:30.703 CST [16416] DEBUG:  xmin required by slots: data 0, catalog 0
2025-02-25 23:14:30.703 CST [16416] LOG:  database system was not properly shut down; automatic recovery in progress
2025-02-25 23:14:30.703 CST [16416] DEBUG:  resetting unlogged relations: cleanup 1 init 0
2025-02-25 23:14:30.704 CST [16416] LOG:  invalid record length at 0/1748780: wanted 24, got 0
2025-02-25 23:14:30.704 CST [16416] LOG:  redo is not required
2025-02-25 23:14:30.704 CST [16416] DEBUG:  resetting unlogged relations: cleanup 0 init 1
2025-02-25 23:14:30.705 CST [16416] DEBUG:  performing replication slot checkpoint
2025-02-25 23:14:30.706 CST [16416] DEBUG:  MultiXactId wrap limit is 2147483648, limited by database with OID 1
2025-02-25 23:14:30.706 CST [16416] DEBUG:  MultiXact member stop limit is now 4294914944 based on MultiXact 1
2025-02-25 23:14:30.707 CST [16415] DEBUG:  starting background worker process "logical replication launcher"
2025-02-25 23:14:30.707 CST [16420] DEBUG:  autovacuum launcher started
2025-02-25 23:14:30.708 CST [16415] LOG:  database system is ready to accept connections
2025-02-25 23:14:30.708 CST [16422] DEBUG:  logical replication launcher started
```

---

### 监听主机 (`-h`)

指定服务器监听的 IP 地址或主机名。默认情况下，PostgreSQL 只监听本地连接。

**示例：**

监听所有 IP 地址：

```bash
(base) admin@admindeMBP ~ % postgres -D /Users/admin/postgres -h 0.0.0.0
2025-02-25 23:15:05.000 CST [17664] LOG:  starting PostgreSQL 14.15 (Homebrew) on aarch64-apple-darwin23.6.0, compiled by Apple clang version 16.0.0 (clang-1600.0.26.4), 64-bit
2025-02-25 23:15:05.000 CST [17664] LOG:  listening on IPv4 address "0.0.0.0", port 5432
2025-02-25 23:15:05.001 CST [17664] LOG:  listening on Unix socket "/tmp/.s.PGSQL.5432"
2025-02-25 23:15:05.005 CST [17665] LOG:  database system was interrupted; last known up at 2025-02-25 23:14:30 CST
2025-02-25 23:15:05.054 CST [17665] LOG:  database system was not properly shut down; automatic recovery in progress
2025-02-25 23:15:05.055 CST [17665] LOG:  redo starts at 0/17487F8
2025-02-25 23:15:05.055 CST [17665] LOG:  invalid record length at 0/1748830: wanted 24, got 0
2025-02-25 23:15:05.055 CST [17665] LOG:  redo done at 0/17487F8 system usage: CPU: user: 0.00 s, system: 0.00 s, elapsed: 0.00 s
2025-02-25 23:15:05.059 CST [17664] LOG:  database system is ready to accept connections
```

---


### Unix 域套接字目录 (`-k`)

指定 Unix 域套接字的目录路径。

**示例：**

将 Unix 域套接字目录设置为 `/var/run/postgresql`：

```bash
(base) admin@admindeMBP ~ % postgres -D /Users/admin/postgres -k /Users/admin/run/postgresql
2025-02-25 23:15:49.532 CST [18920] LOG:  starting PostgreSQL 14.15 (Homebrew) on aarch64-apple-darwin23.6.0, compiled by Apple clang version 16.0.0 (clang-1600.0.26.4), 64-bit
2025-02-25 23:15:49.533 CST [18920] LOG:  listening on IPv6 address "::1", port 5432
2025-02-25 23:15:49.533 CST [18920] LOG:  listening on IPv4 address "127.0.0.1", port 5432
2025-02-25 23:15:49.534 CST [18920] LOG:  listening on Unix socket "/Users/admin/run/postgresql/.s.PGSQL.5432"
2025-02-25 23:15:49.538 CST [18921] LOG:  database system was interrupted; last known up at 2025-02-25 23:15:29 CST
2025-02-25 23:15:49.586 CST [18921] LOG:  database system was not properly shut down; automatic recovery in progress
2025-02-25 23:15:49.587 CST [18921] LOG:  redo starts at 0/1748958
2025-02-25 23:15:49.587 CST [18921] LOG:  invalid record length at 0/1748990: wanted 24, got 0
2025-02-25 23:15:49.587 CST [18921] LOG:  redo done at 0/1748958 system usage: CPU: user: 0.00 s, system: 0.00 s, elapsed: 0.00 s
2025-02-25 23:15:49.591 CST [18920] LOG:  database system is ready to accept connections
```

---

### 启用 SSL 连接 (`-l`)

启用 SSL 加密连接。

**示例：**

启用 SSL 连接：

```bash
(base) admin@admindeMBP ~ % postgres -D /Users/admin/postgres -l
2025-02-25 23:16:08.791 CST [19548] LOG:  starting PostgreSQL 14.15 (Homebrew) on aarch64-apple-darwin23.6.0, compiled by Apple clang version 16.0.0 (clang-1600.0.26.4), 64-bit
2025-02-25 23:16:08.792 CST [19548] LOG:  listening on IPv6 address "::1", port 5432
2025-02-25 23:16:08.792 CST [19548] LOG:  listening on IPv4 address "127.0.0.1", port 5432
2025-02-25 23:16:08.793 CST [19548] LOG:  listening on Unix socket "/tmp/.s.PGSQL.5432"
2025-02-25 23:16:08.796 CST [19549] LOG:  database system was interrupted; last known up at 2025-02-25 23:15:49 CST
2025-02-25 23:16:08.844 CST [19549] LOG:  database system was not properly shut down; automatic recovery in progress
2025-02-25 23:16:08.845 CST [19549] LOG:  redo starts at 0/1748A08
2025-02-25 23:16:08.845 CST [19549] LOG:  invalid record length at 0/1748A40: wanted 24, got 0
2025-02-25 23:16:08.845 CST [19549] LOG:  redo done at 0/1748A08 system usage: CPU: user: 0.00 s, system: 0.00 s, elapsed: 0.00 s
2025-02-25 23:16:08.849 CST [19548] LOG:  database system is ready to accept connections
```

---

### 最大连接数 (`-N`)

设置允许的最大客户端连接数。

**示例：**

设置最大连接数为 `100`：

```bash
(base) admin@admindeMBP ~ % postgres -D /Users/admin/postgres -N 100
2025-02-25 23:16:28.883 CST [20173] LOG:  starting PostgreSQL 14.15 (Homebrew) on aarch64-apple-darwin23.6.0, compiled by Apple clang version 16.0.0 (clang-1600.0.26.4), 64-bit
2025-02-25 23:16:28.884 CST [20173] LOG:  listening on IPv6 address "::1", port 5432
2025-02-25 23:16:28.884 CST [20173] LOG:  listening on IPv4 address "127.0.0.1", port 5432
2025-02-25 23:16:28.884 CST [20173] LOG:  listening on Unix socket "/tmp/.s.PGSQL.5432"
2025-02-25 23:16:28.888 CST [20174] LOG:  database system was interrupted; last known up at 2025-02-25 23:16:08 CST
2025-02-25 23:16:28.942 CST [20174] LOG:  database system was not properly shut down; automatic recovery in progress
2025-02-25 23:16:28.943 CST [20174] LOG:  redo starts at 0/1748AB8
2025-02-25 23:16:28.943 CST [20174] LOG:  invalid record length at 0/1748AF0: wanted 24, got 0
2025-02-25 23:16:28.943 CST [20174] LOG:  redo done at 0/1748AB8 system usage: CPU: user: 0.00 s, system: 0.00 s, elapsed: 0.00 s
2025-02-25 23:16:28.947 CST [20173] LOG:  database system is ready to accept connections
```

---

### 监听端口 (`-p`)

指定服务器监听的端口号，默认端口为 `5432`。

**示例：**

监听 `5433` 端口：

```bash
(base) admin@admindeMBP ~ % postgres -D /Users/admin/postgres -p 5433
2025-02-25 23:16:45.812 CST [20678] LOG:  starting PostgreSQL 14.15 (Homebrew) on aarch64-apple-darwin23.6.0, compiled by Apple clang version 16.0.0 (clang-1600.0.26.4), 64-bit
2025-02-25 23:16:45.813 CST [20678] LOG:  listening on IPv6 address "::1", port 5433
2025-02-25 23:16:45.813 CST [20678] LOG:  listening on IPv4 address "127.0.0.1", port 5433
2025-02-25 23:16:45.814 CST [20678] LOG:  listening on Unix socket "/tmp/.s.PGSQL.5433"
2025-02-25 23:16:45.817 CST [20679] LOG:  database system was interrupted; last known up at 2025-02-25 23:16:28 CST
2025-02-25 23:16:45.867 CST [20679] LOG:  database system was not properly shut down; automatic recovery in progress
2025-02-25 23:16:45.868 CST [20679] LOG:  redo starts at 0/1748B68
2025-02-25 23:16:45.868 CST [20679] LOG:  invalid record length at 0/1748BA0: wanted 24, got 0
2025-02-25 23:16:45.868 CST [20679] LOG:  redo done at 0/1748B68 system usage: CPU: user: 0.00 s, system: 0.00 s, elapsed: 0.00 s
2025-02-25 23:16:45.872 CST [20678] LOG:  database system is ready to accept connections
```

---

### 显示查询统计信息 (`-s`)

在每个查询执行后显示统计信息。

**示例：**

启用查询统计信息：

```bash
(base) admin@admindeMBP ~ % postgres -D /Users/admin/postgres -s
2025-02-25 23:17:06.236 CST [21303] LOG:  starting PostgreSQL 14.15 (Homebrew) on aarch64-apple-darwin23.6.0, compiled by Apple clang version 16.0.0 (clang-1600.0.26.4), 64-bit
2025-02-25 23:17:06.237 CST [21303] LOG:  listening on IPv6 address "::1", port 5432
2025-02-25 23:17:06.237 CST [21303] LOG:  listening on IPv4 address "127.0.0.1", port 5432
2025-02-25 23:17:06.238 CST [21303] LOG:  listening on Unix socket "/tmp/.s.PGSQL.5432"
2025-02-25 23:17:06.242 CST [21304] LOG:  database system was interrupted; last known up at 2025-02-25 23:16:45 CST
2025-02-25 23:17:06.290 CST [21304] LOG:  database system was not properly shut down; automatic recovery in progress
2025-02-25 23:17:06.291 CST [21304] LOG:  redo starts at 0/1748C18
2025-02-25 23:17:06.291 CST [21304] LOG:  invalid record length at 0/1748C50: wanted 24, got 0
2025-02-25 23:17:06.291 CST [21304] LOG:  redo done at 0/1748C18 system usage: CPU: user: 0.00 s, system: 0.00 s, elapsed: 0.00 s
2025-02-25 23:17:06.295 CST [21303] LOG:  database system is ready to accept connections
```

---

### 设置排序内存 (`-S`)

设置排序操作使用的内存大小（单位为 kB）。

**示例：**

设置排序内存为 `1024 kB`：

```bash
(base) admin@admindeMBP ~ % postgres -D /Users/admin/postgres -S 1024
2025-02-25 23:17:22.682 CST [21553] LOG:  starting PostgreSQL 14.15 (Homebrew) on aarch64-apple-darwin23.6.0, compiled by Apple clang version 16.0.0 (clang-1600.0.26.4), 64-bit
2025-02-25 23:17:22.683 CST [21553] LOG:  listening on IPv6 address "::1", port 5432
2025-02-25 23:17:22.683 CST [21553] LOG:  listening on IPv4 address "127.0.0.1", port 5432
2025-02-25 23:17:22.683 CST [21553] LOG:  listening on Unix socket "/tmp/.s.PGSQL.5432"
2025-02-25 23:17:22.687 CST [21554] LOG:  database system was interrupted; last known up at 2025-02-25 23:17:06 CST
2025-02-25 23:17:22.736 CST [21554] LOG:  database system was not properly shut down; automatic recovery in progress
2025-02-25 23:17:22.737 CST [21554] LOG:  redo starts at 0/1748CC8
2025-02-25 23:17:22.737 CST [21554] LOG:  invalid record length at 0/1748D00: wanted 24, got 0
2025-02-25 23:17:22.737 CST [21554] LOG:  redo done at 0/1748CC8 system usage: CPU: user: 0.00 s, system: 0.00 s, elapsed: 0.00 s
2025-02-25 23:17:22.741 CST [21553] LOG:  database system is ready to accept connections
```

---

### 版本信息 (`-V`)

输出 PostgreSQL 的版本信息，然后退出。

**示例：**

查看版本信息：

```bash
(base) admin@admindeMBP ~ % postgres -V
postgres (PostgreSQL) 14.15 (Homebrew)
```

---

### 帮助信息 (`-?` 或 `--help`)

显示 `postgres` 命令的帮助信息，然后退出。

**示例：**

查看帮助信息：

```bash
(base) admin@admindeMBP ~ % postgres -V
postgres (PostgreSQL) 14.15 (Homebrew)
(base) admin@admindeMBP ~ % postgres --help
postgres is the PostgreSQL server.

Usage:
  postgres [OPTION]...

Options:
  -B NBUFFERS        number of shared buffers
  -c NAME=VALUE      set run-time parameter
  -C NAME            print value of run-time parameter, then exit
  -d 1-5             debugging level
  -D DATADIR         database directory
  -e                 use European date input format (DMY)
  -F                 turn fsync off
  -h HOSTNAME        host name or IP address to listen on
  -i                 enable TCP/IP connections
  -k DIRECTORY       Unix-domain socket location
  -l                 enable SSL connections
  -N MAX-CONNECT     maximum number of allowed connections
  -p PORT            port number to listen on
  -s                 show statistics after each query
  -S WORK-MEM        set amount of memory for sorts (in kB)
  -V, --version      output version information, then exit
  --NAME=VALUE       set run-time parameter
  --describe-config  describe configuration parameters, then exit
  -?, --help         show this help, then exit

Developer options:
  -f s|i|o|b|t|n|m|h forbid use of some plan types
  -n                 do not reinitialize shared memory after abnormal exit
  -O                 allow system table structure changes
  -P                 disable system indexes
  -t pa|pl|ex        show timings after each query
  -T                 send SIGSTOP to all backend processes if one dies
  -W NUM             wait NUM seconds to allow attach from a debugger

Options for single-user mode:
  --single           selects single-user mode (must be first argument)
  DBNAME             database name (defaults to user name)
  -d 0-5             override debugging level
  -E                 echo statement before execution
  -j                 do not use newline as interactive query delimiter
  -r FILENAME        send stdout and stderr to given file

Options for bootstrapping mode:
  --boot             selects bootstrapping mode (must be first argument)
  DBNAME             database name (mandatory argument in bootstrapping mode)
  -r FILENAME        send stdout and stderr to given file
  -x NUM             internal use

Please read the documentation for the complete list of run-time
configuration settings and how to set them on the command line or in
the configuration file.

Report bugs to <pgsql-bugs@lists.postgresql.org>.
PostgreSQL home page: <https://www.postgresql.org/>
```

---

## 总结

本文详细介绍了 `postgres` 命令的常用选项及其使用方法。通过合理使用这些选项，可以灵活配置和管理 PostgreSQL 数据库服务器。

更多详细信息，请参考 [PostgreSQL 官方文档](https://www.postgresql.org/docs/14/app-postgres.html)。
