---
title: Configuration Parameters
---

# Configuration Parameters

This document lists the configuration parameters (GUC) of Apache Cloudberry database in alphabetical order.

## autovacuum_freeze_max_age

- Variable Type: Integer
- Default Value: 200000000
- Value Range: [100000,2000000000]
- Setting Category: postmaster
- Description: Sets the "maximum age" of transaction IDs in a table. When the number of transactions accumulated since the transaction ID was allocated reaches this value, the system automatically performs autovacuum on the table to prevent transaction ID wraparound. This operation is enforced even if autovacuum is disabled to ensure data safety.

## autovacuum_vacuum_cost_delay

- Variable Type: Real
- Default Value: 2
- Unit: ms
- Value Range: [-1,100]
- Setting Category: sighup
- Description: Sets the vacuum cost delay time (in milliseconds) for autovacuum operations.

## autovacuum_vacuum_scale_factor

- Variable Type: Real
- Default Value: 0.2
- Value Range: [0,100]
- Setting Category: sighup
- Description: Controls the threshold ratio of updated or deleted tuples to total tuples before autovacuum is performed.

## autovacuum_vacuum_threshold

- Variable Type: Integer
- Default Value: 50
- Value Range: [0,2147483647]
- Setting Category: sighup
- Description: Controls the minimum number of updated or deleted tuples required to trigger autovacuum.

## checkpoint_timeout

- Value Range: 30 - 86400 (integer, in seconds)
- Default Value: 300 (5 minutes)
- Setting Category: local, system, reload
- Description: Specifies the maximum time interval between automatic WAL checkpoints.

  If no unit is specified when setting this parameter, the system defaults to seconds. The allowed range is 30 seconds to 1 day. The default value is 5 minutes (300 seconds or 5min). Increasing this parameter's value will increase the time required for crash recovery.

## gp_appendonly_compaction_segfile_limit

- Variable Type: Integer
- Default Value: 10
- Value Range: [0,127]
- Setting Category: user
- Description: Sets the minimum number of append-only segfiles that must be reserved for insert operations.

## gp_autostats_lock_wait

- Variable Type: Bool
- Default Value: off
- Setting Category: user
- Description: Controls whether autostats automatically generated `ANALYZE` waits for lock acquisition.

## gp_autostats_mode

- Variable Type: Enum
- Default Value: none
- Value Range: none, on_change, onchange, on_no_stats
- Setting Category: user
- Description: Controls whether the coordinator runs an automatic `ANALYZE` on a table after a statement modifies it outside of a function (statements inside functions use `gp_autostats_mode_in_functions`). `on_change` analyzes after `CREATE TABLE AS`, `INSERT`, `UPDATE`, `DELETE`, `MERGE` or `COPY FROM` when the number of affected rows exceeds `gp_autostats_on_change_threshold`; `on_no_stats` analyzes after `CREATE TABLE AS`, and after `INSERT` or `COPY FROM` into a table that has no statistics yet; `none` turns automatic analysis off, and `onchange` is accepted as another spelling of `on_change`. Views and partitioned parent tables are never analyzed this way.

## gp_cached_segworkers_threshold

- Variable Type: Integer
- Default Value: 5
- Value Range: [1,2147483647]
- Setting Category: user
- Description: Sets the maximum number of idle segment worker processes (QEs) per segment that a session keeps cached for reuse by later statements. When a reader worker is released and the per-segment free list already holds this many workers, the worker is destroyed instead of cached. The session's writer worker is never destroyed because of this limit, but it takes a place in the same free list, so while it is cached at most one less than this many reader workers stay cached. Workers on the coordinator are capped at 1 regardless of this setting.

## gp_command_count

- Variable Type: Integer
- Default Value: 0
- Value Range: [0,2147483647]
- Setting Category: internal
- Description: Displays the number of commands sent by the client in the current session.

## gp_dynamic_partition_pruning

- Parameter Type: Boolean
- Default Value: on
- Setting Category: coordinator, session, reload
- Description: Enables execution plans that can dynamically eliminate partition scans.

## gp_enable_runtime_filter_pushdown

- Value Range: Boolean
- Default Value: off
- Setting Category: user
- Description: Attempts to push down the hash table of hash join as a bloom filter to sequential scan or access methods (AM).

## gp_enable_statement_trigger

- Variable Type: Bool
- Default Value: off
- Setting Category: user
- Description: Allows creation of statement-level triggers.

## gp_max_partition_level

- Variable Type: Integer
- Default Value: 0
- Value Range: [0,2147483647]
- Setting Category: superuser
- Description: Sets the maximum allowed partition level when creating partitioned tables using classic syntax.

## gp_max_plan_size

- Variable Type: Integer
- Default Value: 0
- Unit: kB
- Value Range: [0,2147483647]
- Setting Category: superuser
- Description: Sets the maximum size of an uncompressed serialized query plan that the coordinator dispatches to the segments. A query whose plan exceeds this size fails with a "Query plan size limit exceeded" error. A value of 0 means no limit.

## gp_max_slices

- Variable Type: Integer
- Default Value: 0
- Value Range: [0,2147483647]
- Setting Category: user
- Description: Sets the maximum number of slices allowed in a single query plan. A query with more slices than this fails at executor start with an error. A value of 0 means no limit.

## gp_resource_manager

- Value Range: none, group, group-v2, queue
- Default Value: none
- Setting Category: local, system, restart
- Description: Specifies the resource management scheme currently enabled in the Apache Cloudberry database cluster.
    - `none`: No resource manager is used (default).
    - `group`: Uses resource groups and enables resource group behavior based on Linux cgroup v1 functionality.
   - `group-v2`: Uses resource groups and enables resource group behavior based on Linux cgroup v2 functionality.
    - `queue`: Uses resource queues for resource management.

## gp_role

- Value Range: dispatch, execute, utility
- Default Value: Undefined (depends on process type)
- Setting Category: read only (automatically set in background)
- Description: This parameter is used to identify the role of the current server process.

    The role of the Coordinator process is `dispatch`, indicating it is responsible for query dispatch. The role of the Segment process is `execute`, indicating it is responsible for executing query plans. `utility` is used for special maintenance or management sessions. This parameter is automatically set by the system in the background and is mainly used to identify different types of internal worker processes.

## gp_session_id

- Variable Type: Integer
- Default Value: -1
- Value Range: [-2147483648,2147483647]
- Setting Category: backend
- Description: Used to uniquely identify a session in the Apache Cloudberry cluster.

## gp_vmem_protect_limit

- Variable Type: Integer
- Default Value: 8192
- Value Range: [0,1073741823]
- Setting Category: postmaster
- Description: Sets, in megabytes, the amount of memory that all database sessions on one segment instance together can reserve through the Cloudberry memory tracker. The value is a plain number of MB with no unit attached, so give it as for example `8192` rather than `8GB`. When a query process on a segment would push the segment total past this limit, its allocation fails with an "Out of memory" error whose detail starts with "Vmem limit reached". The limit applies under every `gp_resource_manager` setting, and `runaway_detector_activation_percent` is calculated as a percentage of it.

## krb_server_keyfile

- Variable Type: string
- Default Value: `<FILE:/workspace/dist/database/etc/postgresql/krb5.keytab>`
- Setting Category: sighup
- Description: Sets the location of the Kerberos server key file.

## lock_timeout

- Variable Type: Integer
- Default Value: 0
- Unit: ms
- Value Range: [0,2147483647]
- Setting Category: user
- Description: Sets the maximum time any statement waits to acquire a lock on a table, index, row, or other database object. If the wait exceeds this time, the statement is aborted with an error. A value of 0 turns off the timeout.

## log_autostats

- Variable Type: Bool
- Default Value: off
- Setting Category: superuser
- Description: Logs details of the ANALYZE operations issued by automatic statistics collection (see `gp_autostats_mode`). When enabled, the server log records which command on which table caused an automatic ANALYZE, and also when an automatic ANALYZE was skipped because the user does not own the table (this check is made only while `gp_autostats_allow_nonowner` is off, which is the default).

## log_autovacuum_min_duration

- Variable Type: Integer
- Default Value: 600000
- Unit: ms
- Value Range: [-1,2147483647]
- Setting Category: sighup
- Description: Sets the minimum execution time above which autovacuum actions are logged. A value of 0 logs all autovacuum actions, and -1 turns autovacuum logging off. It can also be set per table with the `log_autovacuum_min_duration` storage parameter.

## log_btree_build_stats

- Variable Type: Bool
- Default Value: off
- Setting Category: superuser
- Description: Writes system resource usage statistics (memory and CPU) for various B-tree operations to the server log. This is a developer option. It exists only when the server is built with the `BTREE_BUILD_STATS` macro defined, which is not the default.

## log_checkpoints

- Value Range: Boolean
- Default Value: on
- Setting Category: local, system, reload
- Description: Writes checkpoint and restartpoint information to the server log. The log messages include statistics such as the number of buffers written and the time taken to write them.

## log_connections

- Variable Type: Bool
- Default Value: off
- Setting Category: superuser-backend
- Description: Writes a line to the server log for each connection attempt, and for each successful client authentication. Some client programs, such as psql, try to connect twice while determining whether a password is required, so duplicate "connection received" messages do not always indicate a problem.

## log_destination

- Variable Type: String
- Default Value: stderr
- Setting Category: sighup
- Description: Sets the destinations for server log output, as a comma-separated list of `stderr`, `csvlog`, `jsonlog`, `syslog` and `eventlog`. `syslog` is available only on platforms that support it, and `eventlog` only on Windows. `csvlog` and `jsonlog` require `logging_collector` to be on. When `stderr` is included, `logging_collector` is on and `gp_log_format` is `csv` (the default), every message is written to the log file in CSV format and nothing is sent to the other destinations in the list. To use `csvlog`, `jsonlog`, `syslog` or `eventlog`, remove `stderr` from the list or set `gp_log_format` to `text`. This parameter is hidden from `SHOW ALL`. The source code labels it as defunct, but the server still uses it.

## log_directory

- Variable Type: String
- Default Value: log
- Setting Category: sighup
- Description: Sets the directory where server log files are written when the logging collector is enabled. It can be an absolute path or a path relative to the data directory. This parameter is hidden from `SHOW ALL` and can be viewed only by superusers and members of `pg_read_all_settings`. The source code labels it as defunct, but the server still uses it.

## log_disconnections

- Variable Type: Bool
- Default Value: off
- Setting Category: superuser-backend
- Description: Writes a line to the server log when a client session ends, including the duration of the session.

## log_dispatch_stats

- Variable Type: Bool
- Default Value: off
- Setting Category: superuser
- Description: Writes dispatcher performance statistics for each statement to the server log. It cannot be turned on while any of `log_statement_stats`, `log_parser_stats`, `log_planner_stats` or `log_executor_stats` is on.

## log_duration

- Variable Type: Bool
- Default Value: off
- Setting Category: superuser
- Description: Logs the duration of each completed SQL statement.

## log_error_verbosity

- Variable Type: Enum
- Default Value: default
- Value Range: terse, default, verbose
- Setting Category: superuser
- Description: Controls the amount of detail written to the server log for each message that is logged. `terse` omits the DETAIL, HINT, QUERY and CONTEXT fields, and `verbose` adds the SQLSTATE error code and the source file name, function name and line number that generated the message. It has no effect on messages that Cloudberry writes in its own CSV format, which happens when `log_destination` includes `stderr`, `logging_collector` is on and `gp_log_format` is `csv`, which are all defaults. In `csvlog` and `jsonlog` output it controls only whether the source file name, function name and line number are written.

## log_executor_stats

- Variable Type: Bool
- Default Value: off
- Setting Category: superuser
- Description: Writes executor performance statistics for each statement to the server log. It cannot be turned on while `log_statement_stats` is on.

## log_file_mode

- Variable Type: Integer
- Default Value: 0600
- Value Range: [0000,0777]
- Setting Category: sighup
- Description: Sets the permissions of the log files created when `logging_collector` is on. The value is a numeric mode in the form accepted by the `chmod` and `umask` system calls. To use the usual octal format, the number must start with a 0 (zero).

## log_filename

- Variable Type: String
- Default Value: gpdb-%Y-%m-%d_%H%M%S.csv
- Setting Category: sighup
- Description: Sets the file name pattern for server log files, treated as a `strftime` pattern. The file suffix follows `gp_log_format`: with the default CSV format a name that does not end in `.csv` gets its last four characters replaced with `.csv`, and with TEXT format a trailing `.csv` is replaced with `.log`. Only superusers and members of `pg_read_all_settings` can view this parameter, and it is not shown by `SHOW ALL`.

## log_hostname

- Variable Type: Bool
- Default Value: off
- Setting Category: sighup
- Description: By default, connection log messages only show the IP address of the connecting host. Turning this on also logs the host name, which requires a reverse DNS lookup for each connection and can impose a non-negligible performance penalty depending on your host name resolution setup.

## log_line_prefix

- Variable Type: String
- Default Value: `'%m [%p] '`
- Setting Category: sighup
- Description: Sets a printf-style string that is written at the start of each log line. `%` escapes such as `%m` (time stamp with milliseconds) and `%p` (process ID) are replaced with status information. An empty value means no prefix. The prefix is not used for messages that Cloudberry writes in its own CSV format, which happens when `log_destination` includes `stderr`, `logging_collector` is on and `gp_log_format` is `csv`, which are all defaults. This parameter is hidden from `SHOW ALL`. The source code labels it as defunct, but the server still uses it.

## log_lock_waits

- Variable Type: Bool
- Default Value: off
- Setting Category: superuser
- Description: Writes a log message when a session waits longer than `deadlock_timeout` to acquire a lock.

## log_min_duration_sample

- Variable Type: Integer
- Default Value: -1
- Unit: ms
- Value Range: [-1,2147483647]
- Setting Category: superuser
- Description: Logs a sample of the completed statements that ran for at least the specified amount of time, together with their duration. `log_statement_sample_rate` sets the fraction that is logged. `0` samples all statements, and `-1` disables this feature. Statements that exceed `log_min_duration_statement` are always logged.

## log_min_duration_statement

- Variable Type: Integer
- Default Value: -1
- Unit: ms
- Value Range: [-1,2147483647]
- Setting Category: superuser
- Description: Logs each completed statement together with its duration if it ran for at least the specified amount of time. `0` logs all statements and their durations, and `-1` disables this feature.

## log_min_error_statement

- Variable Type: Enum
- Default Value: error
- Value Range: debug5, debug4, debug3, debug2, debug1, info, notice, warning, error, log, fatal, panic
- Setting Category: superuser
- Description: Causes the SQL statement that caused an error to be written to the server log when the message severity is at or above this level. Each level includes all the levels that follow it; the later the level, the fewer statements are logged.

## log_min_messages

- Variable Type: Enum
- Default Value: warning
- Value Range: debug5, debug4, debug3, debug2, debug1, info, notice, warning, error, log, fatal, panic
- Setting Category: superuser
- Description: Controls which message levels are written to the server log. Each level includes all the levels that follow it; the later the level, the fewer messages are sent to the log.

## log_parameter_max_length

- Variable Type: Integer
- Default Value: -1
- Unit: B
- Value Range: [-1,1073741823]
- Setting Category: superuser
- Description: Sets the maximum number of bytes of each bind parameter value written to the server log together with logged statements. `-1` logs the values in full, and `0` turns off logging of bind parameter values for these messages.

## log_parameter_max_length_on_error

- Variable Type: Integer
- Default Value: 0
- Unit: B
- Value Range: [-1,1073741823]
- Setting Category: user
- Description: Sets the maximum number of bytes of each bind parameter value written to error messages. `-1` logs the values in full, and `0` (the default) turns off logging of bind parameter values in error messages.

## log_parser_stats

- Variable Type: Bool
- Default Value: off
- Setting Category: superuser
- Description: Writes parser performance statistics for each statement to the server log. It cannot be turned on while `log_statement_stats` is on.

## log_planner_stats

- Variable Type: Bool
- Default Value: off
- Setting Category: superuser
- Description: Writes planner performance statistics for each statement to the server log. It cannot be turned on while `log_statement_stats` is on.

## log_recovery_conflict_waits

- Variable Type: Bool
- Default Value: off
- Setting Category: sighup
- Description: Writes a log message when the startup process on a standby waits longer than `deadlock_timeout` for a recovery conflict.

## log_replication_commands

- Variable Type: Bool
- Default Value: off
- Setting Category: superuser
- Description: Writes each replication command to the server log.

## log_rotation_age

- Variable Type: Integer
- Default Value: 1440
- Unit: min
- Value Range: [0,35791394]
- Setting Category: sighup
- Description: Sets the age a log file can reach before the logging collector closes it and starts a new one. The default of 1440 minutes (1d) creates a new log file every 24 hours. Set to 0 to turn off time-based log rotation.

## log_rotation_size

- Variable Type: Integer
- Default Value: 1048576
- Unit: kB
- Value Range: [0,2097151]
- Setting Category: sighup
- Description: Sets the size a log file can reach before the logging collector closes it and starts a new one. The default of 1048576 kB is 1 GB. Set to 0 to turn off size-based log rotation.

## log_startup_progress_interval

- Variable Type: Integer
- Default Value: 10000
- Unit: ms
- Value Range: [0,2147483647]
- Setting Category: sighup
- Description: Sets the time between the progress messages that the startup process writes during long-running operations. `0` turns these messages off.

## log_statement

- Variable Type: Enum
- Default Value: none
- Value Range: none, ddl, mod, all
- Setting Category: superuser
- Description: Controls which SQL statements are written to the server log. `ddl` logs data definition statements such as CREATE, ALTER and DROP, `mod` logs those plus data-modifying statements such as INSERT, UPDATE, DELETE, TRUNCATE and COPY FROM, and `all` logs every statement. The built-in default is `none`, but `gpinitsystem` writes `log_statement=all` into the coordinator's `postgresql.conf`.

## log_statement_sample_rate

- Variable Type: Real
- Default Value: 1
- Value Range: [0,1]
- Setting Category: superuser
- Description: Sets the fraction of the statements that exceed `log_min_duration_sample` to log. `0` logs none of them, and `1` logs all of them.

## log_statement_stats

- Variable Type: Bool
- Default Value: off
- Setting Category: superuser
- Description: Writes cumulative performance statistics (parser, planner and executor combined) for each statement to the server log. It cannot be turned on while any of `log_parser_stats`, `log_planner_stats` or `log_executor_stats` is on.

## log_temp_files

- Variable Type: Integer
- Default Value: -1
- Unit: kB
- Value Range: [-1,2147483647]
- Setting Category: superuser
- Description: Logs the name and size of each temporary file whose size is equal to or larger than this value when the file is deleted. Set to 0 to log all temporary files, or -1 (the default) to turn this logging off.

## log_timezone

- Variable Type: String
- Default Value: GMT
- Setting Category: sighup
- Description: Sets the time zone used for the time stamps written to the server log. `initdb` sets it in `postgresql.conf` to the time zone of its environment.

## log_transaction_sample_rate

- Variable Type: Real
- Default Value: 0
- Value Range: [0,1]
- Setting Category: superuser
- Description: Sets the fraction of transactions whose statements are all logged, regardless of their duration. `0` logs none, and `1` logs the statements of all transactions.

## log_truncate_on_rotation

- Variable Type: Bool
- Default Value: off
- Setting Category: sighup
- Description: When on, the logging collector truncates (overwrites) an existing log file of the same name instead of appending to it. Truncation happens only on time-based rotation when the new file name differs from the current one; size-based rotation and server start always append.

## max_connections

- Value Range: 10 - 262143
- Default Value: 250 on Coordinator, 750 on Segment
- Setting Category: local, system, restart
- Description: The maximum number of concurrent connections allowed by the database server.

    In the Apache Cloudberry system, client connections enter only through the Coordinator instance. Segment instances should allow 3 to 10 times the number of connections as the Coordinator. When increasing this parameter's value, the value of `max_prepared_transactions` must be increased accordingly.

    The larger this parameter value, the more shared memory Apache Cloudberry requires.

## max_locks_per_transaction

- Variable Type: Integer
- Default Value: 128
- Value Range: [10,2147483647]
- Setting Category: postmaster
- Description: Controls the size of the shared lock table, which is sized on the assumption that at most `max_locks_per_transaction` objects per server process or prepared transaction need to be locked at any one time. The table has room for `max_locks_per_transaction` * (`max_connections` + `max_prepared_transactions` + other background processes) lock entries, so a single transaction can lock more objects than this as long as the table has free space. Raise it if queries touch many tables or partitions and fail with out-of-shared-memory errors.

## max_replication_slots

- Variable Type: Integer
- Default Value: 10
- Value Range: [0,262143]
- Setting Category: postmaster
- Description: Sets the maximum number of replication slots that can be defined simultaneously.

## max_slot_wal_keep_size

- Variable Type: Integer
- Default Value: -1
- Unit: MB
- Value Range: [-1,2147483647]
- Setting Category: sighup
- Description: Sets the maximum amount of WAL that replication slots can retain on disk. If a slot holds back more WAL than this, the slot is marked as invalid and the WAL segments are released for deletion or recycling. A value of -1 means replication slots can retain an unlimited amount of WAL.

## max_statement_mem

- Variable Type: Integer
- Default Value: 2048000
- Unit: kB
- Value Range: [32768,2147483647]
- Setting Category: superuser
- Description: Sets the upper bound for `statement_mem`: any attempt to set `statement_mem` to a value equal to or greater than `max_statement_mem` is rejected. It bounds `gp_resgroup_memory_query_fixed_mem` the same way. The default of `2048000` kB is 2000MB.

## optimizer_array_constraints

- Variable Type: Bool
- Default Value: on
- Setting Category: user
- Description: Allows the optimizer's constraint derivation framework to recognize array-type constraints.

## optimizer_array_expansion_threshold

- Value Range: Integer greater than `0`
- Default Value: 20
- Setting Category: coordinator, session, reload
- Description: When GPORCA is enabled (default) and executing queries containing constant array predicates, the `optimizer_array_expansion_threshold` parameter limits the optimization process based on the number of constants in the array.

    If the number of array elements in the query predicate exceeds the value specified by this parameter, GPORCA will not convert the predicate to disjunctive normal form during query optimization, thereby reducing optimization time and memory consumption. For example, when GPORCA processes a query with an `IN` clause containing more than 20 elements, it will not convert the clause to disjunctive normal form for optimization performance. This behavioral difference can be observed in the execution plan from how the `IN` condition is filtered.

    Modifying this parameter's value affects the trade-off between optimization time and memory usage, as well as optimization benefits from constraint derivation, such as conflict detection and partition pruning. This parameter can be set at the database system level, individual database level, or session and query level.

## optimizer_cost_model

- Variable Type: Enum
- Default Value: calibrated
- Setting Category: user
- Description: Sets the cost model used by the optimizer.

## optimizer_cost_threshold

- Variable Type: Real
- Default Value: 0
- Value Range: [0,2.15E+09]
- Setting Category: user
- Description: Sets the sampling threshold related to the optimal execution plan cost, where 0 means no upper limit.

## optimizer_cte_inlining_bound

- Variable Type: Integer
- Default Value: 0
- Value Range: [0,2147483647]
- Setting Category: user
- Description: Sets the size boundary for the optimizer to decide whether to inline CTEs (Common Table Expressions).

## optimizer_damping_factor_filter

- Variable Type: Real
- Default Value: 0.75
- Value Range: [0,1]
- Setting Category: user
- Description: Sets the damping factor used for selection predicates in the optimizer, where `1.0` means no damping.

## optimizer_damping_factor_groupby

- Variable Type: Real
- Default Value: 0.75
- Value Range: [0,1]
- Setting Category: user
- Description: Sets the damping factor for `group by` operations in the optimizer, where `1.0` means no damping.

## optimizer_damping_factor_join

- Variable Type: Real
- Default Value: 0
- Value Range: [0,1]
- Setting Category: user
- Description: Sets the damping factor for join predicates in the optimizer, where `1.0` means no damping and `0.0` means using square root damping.

## optimizer_discard_redistribute_hashjoin

- Variable Type: Bool
- Default Value: off
- Setting Category: user
- Description: Controls whether the optimizer discards hash join plans containing redistribute operations.

## optimizer_dpe_stats

- Variable Type: Bool
- Default Value: on
- Setting Category: user
- Description: Enables statistics derivation for partitioned tables in dynamic partition elimination scenarios.

## optimizer_enable_derive_stats_all_groups

- Variable Type: Bool
- Default Value: off
- Setting Category: user
- Description: Enables statistics derivation for all groups after completing search space exploration.

## optimizer_enable_dynamicbitmapscan

- Value Range: Boolean
- Default Value: on
- Setting Category: user
- Description: When enabled, the optimizer uses dynamic bitmap scan plans.

    If this parameter is set to `off`, GPORCA will not generate dynamic bitmap scan plans and will fall back to using dynamic sequential scan as an alternative.

## optimizer_enable_dynamicindexonlyscan

- Parameter Type: Boolean
- Default Value: on
- Setting Category: coordinator, session, reload
- Description: When GPORCA is enabled (default), the `optimizer_enable_dynamicindexonlyscan` parameter controls whether to generate dynamic index-only scan plans.

    The default value is `on`. When planning queries on partitioned tables, if the query does not contain single-row volatile (SIRV) functions, GPORCA may generate dynamic index-only scans as an alternative. If set to `off`, GPORCA will not generate dynamic index-only scan plans. This parameter can be set at the database system level, individual database level, or session and query level.

## optimizer_enable_dynamicindexscan

- Value Range: Boolean
- Default Value: on
- Setting Category: user
- Description: This parameter controls whether to enable dynamic index scan in query plans.

    When enabled, the optimizer uses dynamic index scan plans. If this parameter is set to `off`, GPORCA will not generate dynamic index scan plans and will fall back to using dynamic sequential scan as an alternative.

## optimizer_enable_foreign_table

- Parameter Type: Boolean
- Default Value: true
- Setting Category: coordinator, session, reload
- Description: When GPORCA is enabled (default) and this parameter is set to `true` (default), GPORCA generates execution plans for queries involving foreign tables.

    If set to `false`, queries containing foreign tables will fall back to being planned by the PostgreSQL-based optimizer.

## optimizer_enable_indexonlyscan

- Parameter Type: Boolean
- Default Value: true
- Setting Category: coordinator, session, reload
- Description: When GPORCA is enabled (default) and this parameter is set to `true` (default), GPORCA can generate index-only scan plans for B-tree indexes and any type of index that contains all columns in the query. (GiST indexes only support index-only scans for certain operator classes.)

    GPORCA only accesses values in the index and not the actual data blocks of the table. This can improve query execution performance, especially when the table has been vacuumed, contains wide columns, and all visible columns are already in the index, eliminating the need to read any data blocks. If this parameter is set to `false`, GPORCA will not generate index-only scan plans. This parameter can be set at the database system level, individual database level, or session and query level.

## optimizer_enable_orderedagg

- Parameter Type: Boolean
- Default Value: on
- Setting Category: coordinator, session, reload
- Description: When GPORCA is enabled (default), this parameter controls whether to generate query plans for ordered aggregates.

    When set to `on` (default), GPORCA generates execution plans for queries containing ordered aggregates. When set to `off`, such queries will fall back to being planned by the PostgreSQL-based optimizer.

    This parameter can be set at the database system level, individual database level, or session and query level.

## optimizer_enable_push_join_below_union_all

- Parameter Type: Boolean
- Default Value: off
- Setting Category: coordinator, session, reload
- Description: When GPORCA is enabled (default), the `optimizer_enable_push_join_below_union_all` parameter controls GPORCA's behavior when encountering queries containing `JOIN UNION ALL`.

    The default value is `off`. GPORCA will not perform any transformation when the query contains `JOIN UNION ALL`.

    If set to `on` and the plan cost meets requirements, GPORCA will transform `JOIN UNION ALL` into multiple subqueries each performing `JOIN` followed by `UNION ALL`. This transformation may improve join performance when the subqueries of `UNION ALL` can benefit from join operations (but don't qualify in the original plan).

    For example, in scenarios where indexed nested loop joins are highly efficient, such as when the inner table is large with an index and the outer table is small, or when multiple large tables with indexes are `UNION ALL`'ed with a small table, this transformation can push join conditions down as index conditions, potentially performing better than using hash joins.

    Enabling this transformation may increase query planning time, so it's recommended to use `EXPLAIN` to analyze query execution plans with this parameter both enabled and disabled. This parameter can be set at the database system level, individual database level, or session and query level.

## optimizer_enable_query_parameter

- Variable Type: Bool
- Default Value: on
- Setting Category: user
- Description: Allows the GPORCA optimizer to handle query parameters.

## optimizer_enable_right_outer_join

- Parameter Type: Boolean
- Default Value: on
- Setting Category: coordinator, session, reload
- Description: When GPORCA is enabled (default), this parameter controls whether GPORCA generates right outer joins.

    If set to the default value `on`, GPORCA can either directly generate right outer joins or convert left outer joins to right outer joins (when the optimizer deems it appropriate). If set to `off`, GPORCA will convert incoming right outer joins to equivalent left outer joins and completely avoid generating any right outer joins.

    If you encounter performance issues with queries using right outer joins, you can disable right outer joins by setting this parameter to `off`.

    This parameter can be set at the database system level, individual database level, or session and query level. However, it's more recommended to control it at the query level, as right outer joins may be more appropriate query plan choices in certain scenarios.

## optimizer_force_three_stage_scalar_dqa

- Variable Type: Bool
- Default Value: on
- Setting Category: user
- Description: Forces the optimizer to always choose three-stage aggregation plans for scalar distinct qualified aggregates.

## optimizer_nestloop_factor

- Variable Type: Real
- Default Value: 1024
- Value Range: [1,1.79769e+308]
- Setting Category: user
- Description: Sets the cost factor for nested loop joins in the optimizer.

## optimizer_penalize_broadcast_threshold

- Parameter Type: Integer
- Value Range: `[0,2147483647]`
- Default Value: 100000
- Setting Category: user
- Description: Specifies the maximum number of relation rows that can be broadcast without penalty.

    If the number of broadcast rows exceeds this threshold, the optimizer will increase its execution cost to reduce the likelihood of selecting that plan.

    Setting this parameter to `0` disables the penalty mechanism, meaning no penalty is applied to any broadcast.

## optimizer_push_group_by_below_setop_threshold

- Variable Type: Integer
- Default Value: 10
- Value Range: [0,2147483647]
- Setting Category: user
- Description: Sets the maximum number of child nodes to attempt pushing `GROUP BY` operations below SetOp nodes.

## optimizer_replicated_table_insert

- Variable Type: Bool
- Default Value: on
- Setting Category: user
- Description: Omits broadcast operations when inserting data into replicated tables.

## optimizer_skew_factor

- Variable Type: Integer
- Default Value: 0
- Value Range: [0,100]
- Setting Category: user
- Description: Sets the source and weight of the skew factor. `0` means disabling skew derivation based on sample statistics, `1`–`100` means enabling and calculating skew ratio based on samples; the actual skew used for cost estimation is the product of this parameter and the skew ratio.

## optimizer_sort_factor

- Variable Type: Real
- Default Value: 1
- Value Range: [0,1.79769e+308]
- Setting Category: user
- Description: Sets the cost factor for sort operations in the optimizer; `1.0` means the same as default cost, greater than 1 means higher sort cost, less than 1 means lower cost.

## optimizer_trace_fallback

- Variable Type: Bool
- Default Value: off
- Setting Category: user
- Description: Prints information at the `INFO` log level when GPORCA falls back to using the traditional optimizer.

## optimizer_use_gpdb_allocators

- Variable Type: Bool
- Default Value: on
- Setting Category: postmaster
- Description: Allows the GPORCA optimizer to use the database's memory context management mechanism (Memory Contexts).

## optimizer_xform_bind_threshold

- Variable Type: Integer
- Default Value: 0
- Value Range: [0,2147483647]
- Setting Category: user
- Description: Limits the maximum number of bindings that can be generated for each transformation rule (xform) on each group expression. Setting to `0` means this limit is not enabled.

## statement_mem

- Variable Type: Integer
- Default Value: 128000
- Unit: kB
- Value Range: [1000,2147483647]
- Setting Category: user
- Description: Sets the amount of memory reserved for a query. The default of `128000` kB is 125MB. How much memory a query actually receives also depends on the resource manager: the resource queue's `MEMORY_LIMIT`, or the resource group's `MEMORY_QUOTA` and `gp_resgroup_memory_query_fixed_mem`. The value must be less than `max_statement_mem`.

## superuser_reserved_connections

- Value Range: Integer less than `max_connections`
- Default Value: 10
- Setting Category: local, system, restart
- Description: Specifies the number of connection slots reserved for Apache Cloudberry database superusers.

## track_io_timing

- Parameter Type: Boolean
- Default Value: off
- Setting Category: superuser
- Description: Used to collect timing statistics for database I/O activities. When enabled, the system records I/O operation durations during statement execution, which is useful for performance analysis and bottleneck identification. This parameter is off by default and can only be set by superusers.

## wal_compression

- Variable Type: Bool
- Default Value: on
- Setting Category: superuser
- Description: Enables compression of full page writes in WAL files.

## wal_keep_size

- Parameter Type: integer
- Value Range: 0 - 2147483647 (in MB)
- Default Value: 320
- Setting Category: sighup
- Description: Specifies the maximum size of WAL files to retain for standby servers.

## work_mem

- Value Range: Integer in kilobytes
- Default Value: 32MB
- Setting Category: coordinator, session, reload
- Description: Specifies the maximum amount of memory that can be used by each query operation (such as sort or hash table) before writing to temporary disk files. If no unit is specified for this parameter, it defaults to kilobytes. The default value is 32MB.

    In complex queries, multiple sort or hash operations may be executed in parallel, each of which can use the amount of memory specified by `work_mem` before writing to temporary files. Additionally, multiple sessions may perform these operations simultaneously, so the total memory consumption may be much higher than the value of `work_mem` itself. This should be taken into special consideration when choosing the value for this parameter.

    `work_mem` affects these operations: sort operations for `ORDER BY`, `DISTINCT`, and merge joins; hash tables for hash joins, hash aggregates, and processing `IN` subqueries; bitmap index scans; and tuple store-based operations such as function scans, CTEs, PL/pgSQL, and management UDFs.

    In addition to allocating memory for specific execution operators, `work_mem` also affects the PostgreSQL optimizer's preference for certain query plans. Note that `work_mem` is independent of the resource queue and resource group memory management mechanisms. It takes effect at the query level and is not affected by resource queue or resource group memory limits.

## writable_external_table_bufsize

- Variable Type: Integer
- Default Value: 1024
- Unit: kB
- Value Range: [32,131072]
- Setting Category: user
- Description: Sets the buffer size (in kB) for writing to gpfdist before writing to writable external tables.
