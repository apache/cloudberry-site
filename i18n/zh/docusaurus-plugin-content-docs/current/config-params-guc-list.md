---
title: 配置参数
---

# 配置参数

本文档按照字母顺序列出 Apache Cloudberry 数据库的配置参数 (GUC)。

## autovacuum_freeze_max_age

- 变量类型：Integer
- 默认值：200000000
- 值范围：[100000,2000000000]
- 设置分类：postmaster
- 描述：设置表中事务 ID 的“最大使用年龄”。当事务 ID 自分配以来累计经过的事务数达到该值时，系统会自动对表执行 autovacuum，以防止事务 ID 回卷。即使关闭了 autovacuum，系统也会强制执行此操作以保障数据安全。

## autovacuum_vacuum_cost_delay

- 变量类型：Real
- 默认值：2
- 单位：ms
- 值范围：[-1,100]
- 设置分类：sighup
- 描述：设置 autovacuum 操作中 vacuum 成本延迟的时间（单位：毫秒）。

## autovacuum_vacuum_scale_factor

- 变量类型：Real
- 默认值：0.2
- 值范围：[0,100]
- 设置分类：sighup
- 描述：控制在执行 autovacuum 之前，表中已更新或删除元组数量相对于总元组数的比例阈值。

## autovacuum_vacuum_threshold

- 变量类型：Integer
- 默认值：50
- 值范围：[0,2147483647]
- 设置分类：sighup
- 描述：控制触发 autovacuum 所需的最小更新或删除元组数量。

## checkpoint_timeout

- 值范围：30 - 86400（整数，单位为秒）
- 默认值：300（5 分钟）
- 设置分类：local, system, reload
- 描述：指定自动 WAL 检查点之间的最大时间间隔。

    如果设置此参数时未指定单位，系统会默认按秒解析。允许的范围是 30 秒到 1 天。默认值为 5 分钟（即 300 秒或 5min）。增大此参数的值会增加崩溃恢复所需的时间。

## gp_appendonly_compaction_segfile_limit

- 变量类型：Integer
- 默认值：10
- 值范围：[0,127]
- 设置分类：user
- 描述：设置插入操作时必须预留的 append-only segfile 最小数量。

## gp_autostats_lock_wait

- 变量类型：Bool
- 默认值：off
- 设置分类：user
- 描述：控制 autostats 自动生成的 `ANALYZE` 是否等待锁获取。

## gp_command_count

- 变量类型：Integer
- 默认值：0
- 值范围：[0,2147483647]
- 设置分类：internal
- 描述：显示当前会话中客户端已发送的命令数量。

## gp_dynamic_partition_pruning

- 参数类型：Boolean
- 默认值：on
- 设置分类：coordinator, session, reload
- 描述：启用可动态消除分区扫描的执行计划。

## gp_enable_runtime_filter_pushdown

- 值范围：Boolean
- 默认值：off
- 设置分类：user
- 描述：尝试将 hash join 的哈希表作为 bloom filter 下推到顺序扫描或访问方法（AM）。

## gp_enable_statement_trigger

- 变量类型：Bool
- 默认值：off
- 设置分类：user
- 描述：允许创建语句级触发器。

## gp_max_partition_level

- 变量类型：Integer
- 默认值：0
- 值范围：[0,2147483647]
- 设置分类：superuser
- 描述：设置使用经典语法创建分区表时允许的最大分区层级数。

## gp_resource_manager

- 值范围：none, group, group-v2, queue
- 默认值：none
- 设置分类：local, system, restart
- 描述：指定当前在 Apache Cloudberry 数据库集群中启用的资源管理方案。
    - `none`：不使用任何资源管理器（默认值）。
    - `group`：使用资源组，并基于 Linux cgroup v1 功能启用资源组行为。
    - `group-v2`：使用资源组，并基于 Linux cgroup v2 功能启用资源组行为。
    - `queue`：使用资源队列进行资源管理。

## gp_role

- 值范围：dispatch, execute, utility
- 默认值：未定义（取决于进程类型）
- 设置分类：read only（仅在后台自动设置）
- 描述：该参数用于标识当前服务器进程的角色。
- Coordinator 进程的角色为 `dispatch`，表示它负责查询调度。Segment 进程的角色为 `execute`，表示它负责执行查询计划。`utility` 用于一些特殊的维护或管理会话。该参数在后台由系统自动设置，主要用于标识不同类型的内部工作进程。

## gp_session_id

- 变量类型：Integer
- 默认值：-1
- 值范围：[-2147483648,2147483647]
- 设置分类：backend
- 描述：在 Apache Cloudberry 集群中用于唯一标识某个会话的全局 ID。

## krb_server_keyfile

- 变量类型：string
- 默认值：`FILE:/workspace/dist/database/etc/postgresql/krb5.keytab`
- 设置分类：sighup
- 描述：设置 Kerberos 服务器密钥文件的位置。

## log_checkpoints

- 值范围：Boolean
- 默认值：on
- 设置分类：local, system, reload
- 描述：将检查点 (checkpoint) 和重启点 (restartpoint) 写入服务器日志。日志消息中包含一些统计信息，例如写入的缓冲区数量和写入所花费的时间。

## max_connections

- 值范围：10 - 262143
- 默认值：Coordinator 上为 250，Segment 上为 750
- 设置分类：local, system, restart
- 描述：数据库服务器允许的最大并发连接数。

    在 Apache Cloudberry 系统中，客户端连接仅通过 Coordinator 实例进入。Segment 实例应允许为 Coordinator 的 3 到 10 倍的连接数。增加此参数的值时，必须相应地增加 `max_prepared_transactions` 的值。

    此参数值越大，Apache Cloudberry 需要的共享内存也越多。

## max_replication_slots

- 变量类型：Integer
- 默认值：10
- 值范围：[0,262143]
- 设置分类：postmaster
- 描述：设置可同时定义的复制槽的最大数量。

## optimizer_array_constraints

- 变量类型：Bool
- 默认值：on
- 设置分类：user
- 描述：允许优化器的约束推导框架识别数组类型的约束条件。

## optimizer_array_expansion_threshold

- 值范围：大于 `0` 的整数
- 默认值：20
- 设置分类：coordinator, session, reload
- 描述：当启用 GPORCA（默认启用）并执行包含常量数组谓词的查询时，`optimizer_array_expansion_threshold` 参数会根据数组中常量的数量限制优化过程。

    如果查询谓词中的数组元素数量超过该参数指定的值，GPORCA 在查询优化期间将不会将该谓词转换为析取范式 (disjunctive normal form)，从而缩短优化时间并减少内存消耗。例如，当 GPORCA 处理一个 `IN` 子句元素超过 20 个的查询时，为了优化性能，它不会将该子句转换为析取范式。在执行计划中，这种行为差异可以从 `IN` 条件的过滤方式中看出。

    修改该参数的值会影响优化时间和内存使用之间的权衡，同时也可能影响到基于约束推导带来的优化收益，例如冲突检测和分区裁剪。此参数可在数据库系统级、单个数据库级，或 session 和 query 级别进行设置。

## optimizer_cost_model

- 变量类型：Enum
- 默认值：calibrated
- 设置分类：user
- 描述：设置优化器使用的成本模型。

## optimizer_cost_threshold

- 变量类型：Real
- 默认值：0
- 值范围：[0,2147480000]
- 设置分类：user
- 描述：设置与最佳执行计划成本相关的采样阈值，0 表示不设上限。

## optimizer_cte_inlining_bound

- 变量类型：Integer
- 默认值：0
- 值范围：[0,2147483647]
- 设置分类：user
- 描述：设置优化器决定是否内联 CTE（公用表表达式）的大小界限。

## optimizer_damping_factor_filter

- 变量类型：Real
- 默认值：0.75
- 值范围：[0,1]
- 设置分类：user
- 描述：设置优化器中用于选择谓词的抑制因子，`1.0` 表示不进行抑制。

## optimizer_damping_factor_groupby

- 变量类型：Real
- 默认值：0.75
- 值范围：[0,1]
- 设置分类：user
- 描述：设置优化器中 `group by` 操作的抑制因子，`1.0` 表示不进行抑制。

## optimizer_damping_factor_join

- 变量类型：Real
- 默认值：0
- 值范围：[0,1]
- 设置分类：user
- 描述：设置优化器中连接谓词的抑制因子，`1.0` 表示不抑制，`0.0` 表示使用平方根抑制法。

## optimizer_discard_redistribute_hashjoin

- 变量类型：Bool
- 默认值：off
- 设置分类：user
- 描述：控制优化器是否丢弃包含 redistribute 动作的哈希连接计划。

## optimizer_dpe_stats

- 变量类型：Bool
- 默认值：on
- 设置分类：user
- 描述：启用针对动态分区消除场景下分区表的统计信息推导。

## optimizer_enable_derive_stats_all_groups

- 变量类型：Bool
- 默认值：off
- 设置分类：user
- 描述：在完成搜索空间探索后，启用对所有分组的统计信息推导。

## optimizer_enable_dynamicbitmapscan

- 值范围：Boolean
- 默认值：on
- 设置分类：user
- 描述：启用后，优化器会使用 dynamic bitmap scan（动态位图扫描）计划。

    如果将该参数设为 `off`，GPORCA 将不会生成 dynamic bitmap scan 计划，而是退回使用 dynamic sequential scan（动态顺序扫描）作为替代。

## optimizer_enable_dynamicindexonlyscan

- 参数类型：Boolean
- 默认值：on
- 设置分类：coordinator, session, reload
- 描述：当启用 GPORCA（默认启用）时，`optimizer_enable_dynamicindexonlyscan` 参数用于控制是否生成动态仅索引 (dynamic index-only) 扫描计划。

    默认值为 `on`，在对分区表进行查询计划时，如果查询中不包含单行易变（SIRV）函数，GPORCA 可能会生成动态仅索引扫描作为替代方案。如果设置为 `off`，GPORCA 不会生成动态仅索引扫描计划。此参数可在数据库系统级、单个数据库级，或在 session 和 query 级别进行设置。

## optimizer_enable_dynamicindexscan

- 值范围：Boolean
- 默认值：on
- 设置分类：user
- 描述：该参数用于控制是否在查询计划中启用动态索引扫描。

    启用后，优化器会使用 dynamic index scan（动态索引扫描）计划。如果将该参数设为 `off`，GPORCA 将不会生成 dynamic index scan 计划，而是退回使用 dynamic sequential scan（动态顺序扫描）作为替代。

## optimizer_enable_foreign_table

- 参数类型：Boolean
- 默认值：true
- 设置分类：coordinator, session, reload
- 描述：当启用 GPORCA（默认启用）且该参数设置为 `true`（默认值）时，GPORCA 会为涉及外部表 (foreign table) 的查询生成执行计划。

    如果设置为 `false`，包含外部表的查询将回退由基于 PostgreSQL 的优化器生成执行计划。

## optimizer_enable_indexonlyscan

- 参数类型：Boolean
- 默认值：true
- 设置分类：coordinator, session, reload
- 描述：当启用 GPORCA（默认启用）且此参数设置为 `true`（默认值）时，GPORCA 可以为 B-tree 索引和包含查询中所有列的任意类型索引生成仅索引 (index-only) 扫描计划。（GiST 索引仅支持部分操作类的 index-only 扫描。）

    GPORCA 只访问索引中的值，不访问表的实际数据块。这可以提高查询执行性能，尤其是在表经过 vacuum、包含宽列，且索引中已包含所有可见列的情况下，无需读取任何数据块。如果将此参数设置为 `false`，GPORCA 将不会生成 index-only 扫描计划。此参数可在数据库系统级、单个数据库级，或在 session 和 query 级别进行设置。

## optimizer_enable_orderedagg

- 参数类型：Boolean
- 默认值：on
- 设置分类：coordinator, session, reload
- 描述：当启用 GPORCA（默认启用）时，此参数用于控制是否为有序聚合 (ordered aggregates) 生成查询计划。

    当设置为 `on`（默认值）时，GPORCA 会为包含有序聚合的查询生成执行计划。当设置为 `off` 时，该类查询将回退由基于 PostgreSQL 的优化器进行计划生成。

    此参数可设置在数据库系统级、单个数据库级，或 session 和 query 级别。

## optimizer_enable_push_join_below_union_all

- 参数类型：Boolean
- 默认值：off
- 设置分类：coordinator, session, reload
- 描述：当启用 GPORCA（默认启用）时，`optimizer_enable_push_join_below_union_all` 参数用于控制 GPORCA 在遇到包含 `JOIN UNION ALL` 的查询时的行为。

    默认值为 `off`，GPORCA 在查询中包含 `JOIN UNION ALL` 时不会进行任何变换。

    如果设置为 `on` 且计划成本符合要求，GPORCA 会将 `JOIN UNION ALL` 转换为多个子查询各自进行 `JOIN` 的 `UNION ALL`。当 `UNION ALL` 的子查询能够受益于连接操作（但在原始计划中不符合条件）时，该变换可能提升连接性能。

    例如，对于一个索引嵌套循环连接 (indexed nested loop join) 非常高效的场景，即内表较大且有索引，而外表较小时；或者多个有索引的大表与一个小表进行 `UNION ALL` 后再连接的情况，此变换可将连接条件下推为索引条件，从而比使用哈希连接性能更好。

    启用此变换可能会增加查询规划时间，因此建议使用 `EXPLAIN` 分析开启和关闭此参数时的查询执行计划。此参数可在数据库系统级、单个数据库级，或在 session 和 query 级别进行设置。

## optimizer_enable_query_parameter

- 变量类型：Bool
- 默认值：on
- 设置分类：user
- 描述：允许 GPORCA 优化器理查询参数。

## optimizer_enable_right_outer_join

- 参数类型：Boolean
- 默认值：on
- 设置分类：coordinator, session, reload
- 描述：当启用 GPORCA（默认启用）时，此参数用于控制 GPORCA 是否生成 right outer join（右外连接）。

    如果设置为默认值 `on`，GPORCA 既可以直接生成 right outer join，也可以将 left outer join 转换为 right outer join（当优化器认为合适时）。如果设置为 `off`，GPORCA 会将传入的 right outer join 转换为等价的 left outer join，并完全避免生成任何 right outer join。

    如果在使用 right outer join 的查询中遇到性能问题，可以通过将此参数设置为 `off` 来禁止使用 right outer join。

    此参数可以在数据库系统级、单个数据库级，或 session 和 query 级别进行设置。不过更推荐在查询级别进行控制，因为某些场景下 right outer join 是更合适的查询计划选择。

## optimizer_force_three_stage_scalar_dqa

- 变量类型：Bool
- 默认值：on
- 设置分类：user
- 描述：强制优化器始终为标量形式的去重聚合（Distinct Qualified Aggregate）选择三阶段聚合计划。

## optimizer_nestloop_factor

- 变量类型：Real
- 默认值：1024
- 值范围：[1,1.79769e+308]
- 设置分类：user
- 描述：设置优化器中嵌套循环连接（NestLoop Join）的成本因子。

## optimizer_penalize_broadcast_threshold

- 参数类型：Integer
- 值范围：`[0,2147483647]`
- 默认值：100000
- 设置分类：user
- 描述：指定在不受惩罚的情况下，最多可广播的关系（relation）行数。

    如果广播的行数超过该阈值，优化器会增加其执行成本以降低选择该计划的可能性。

    将该参数设置为 `0` 表示禁用该惩罚机制，即对任何广播都不加惩罚。

## optimizer_push_group_by_below_setop_threshold

- 变量类型：Integer
- 默认值：10
- 值范围：[0,2147483647]
- 设置分类：user
- 描述：设置在集合操作（SetOp）节点下尝试下推 `GROUP BY` 操作的子节点最大数量。

## optimizer_replicated_table_insert

- 变量类型：Bool
- 默认值：on
- 设置分类：user
- 描述：向复制表插入数据时省略广播操作。

## optimizer_skew_factor

- 变量类型：Integer
- 默认值：0
- 值范围：[0,100]
- 设置分类：user
- 描述：设置倾斜系数的来源及权重。`0` 表示禁用基于样本统计的倾斜推导，`1`–`100` 表示启用并根据样本计算倾斜比；实际用于成本估算的倾斜度为该参数与倾斜比的乘积。

## optimizer_sort_factor

- 变量类型：Real
- 默认值：1
- 值范围：[0,1.79769e+308]
- 设置分类：user
- 描述：设置优化器中排序操作的成本因子；`1.0` 表示与默认成本相同，大于 1 表示排序代价更高，小于 1 表示代价更低。

## optimizer_trace_fallback

- 变量类型：Bool
- 默认值：off
- 设置分类：user
- 描述：当 GPORCA 回退使用传统优化器时，在 `INFO` 日志级别打印提示信息。

## optimizer_use_gpdb_allocators

- 变量类型：Bool
- 默认值：on
- 设置分类：postmaster
- 描述：允许 GPORCA 优化器使用数据库的内存上下文管理机制（Memory Contexts）。

## optimizer_xform_bind_threshold

- 变量类型：Integer
- 默认值：0
- 值范围：[0,2147483647]
- 设置分类：user
- 描述：限制每个转换规则（xform）在每个分组表达式上最多生成的绑定数量。设置为 `0` 表示不启用该限制。

## superuser_reserved_connections

- 值范围：小于 `max_connections` 的整数
- 默认值：10
- 设置分类：local, system, restart
- 描述：指定为 Apache Cloudberry 数据库超级用户保留的连接槽数量。

## track_io_timing

- 参数类型：Boolean
- 默认值：off
- 设置分类：superuser
- 描述：用于收集数据库 I/O 活动的时间统计信息。启用此参数后，系统会记录语句执行期间的 I/O 操作耗时，这对于性能分析和瓶颈定位非常有用。该参数默认关闭，仅可由超级用户设置。

## wal_compression

- 变量类型：Bool
- 默认值：on
- 设置分类：superuser
- 描述：启用对 WAL 文件中完整页面写入内容的压缩。

## wal_keep_size

- 参数类型：integer
- 值范围：0 - 2147483647（以 MB 为单位）
- 默认值：320
- 设置分类：sighup
- 描述：指定为备用服务器 (standby servers) 保留的 WAL 文件大小上限。

## work_mem

- 值范围：以 kilobyte 为单位的整数
- 默认值：32MB
- 设置分类：coordinator, session, reload
- 描述：指定每个查询操作（例如排序或哈希表）在写入临时磁盘文件前最多可以使用的内存量。如果该参数没有指定单位，则默认为 kilobyte。默认值为 32MB。

    在复杂查询中，可能会并行执行多个排序或哈希操作，每个操作在写入临时文件前都可以使用 `work_mem` 指定的内存量。此外，多个会话可能同时进行这些操作，因此总内存消耗可能远高于 `work_mem` 本身的数值。在选择该参数值时需特别注意这一点。

    `work_mem` 会影响这些操作：用于 `ORDER BY`、`DISTINCT` 和合并连接的排序操作；用于哈希连接、哈希聚合，以及处理 `IN` 子查询的哈希表；位图索引扫描；基于 tuple store 的操作，例如函数扫描、CTE、PL/pgSQL 和管理类 UDF 等。

    除了为特定执行算子分配内存外，`work_mem` 还会影响 PostgreSQL 优化器选择某些查询计划的偏好。需要注意的是，`work_mem` 是独立于资源队列和资源组的内存管理机制，它在查询级别生效，不会受到资源队列或资源组内存限制的影响。

## writable_external_table_bufsize

- 变量类型：Integer
- 默认值：1024
- 单位：kB
- 值范围：[32,131072]
- 设置分类：user
- 描述：为可写外部表写入 gpfdist 之前设置的缓冲区大小（单位：kB）。
