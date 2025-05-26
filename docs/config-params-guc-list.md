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

## krb_server_keyfile

- Variable Type: string
- Default Value: `<FILE:/workspace/dist/database/etc/postgresql/krb5.keytab>`
- Setting Category: sighup
- Description: Sets the location of the Kerberos server key file.

## log_checkpoints

- Value Range: Boolean
- Default Value: on
- Setting Category: local, system, reload
- Description: Writes checkpoint and restartpoint information to the server log. The log messages include statistics such as the number of buffers written and the time taken to write them.

## max_connections

- Value Range: 10 - 262143
- Default Value: 250 on Coordinator, 750 on Segment
- Setting Category: local, system, restart
- Description: The maximum number of concurrent connections allowed by the database server.

    In the Apache Cloudberry system, client connections enter only through the Coordinator instance. Segment instances should allow 3 to 10 times the number of connections as the Coordinator. When increasing this parameter's value, the value of `max_prepared_transactions` must be increased accordingly.

    The larger this parameter value, the more shared memory Apache Cloudberry requires.

## max_replication_slots

- Variable Type: Integer
- Default Value: 10
- Value Range: [0,262143]
- Setting Category: postmaster
- Description: Sets the maximum number of replication slots that can be defined simultaneously.

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
