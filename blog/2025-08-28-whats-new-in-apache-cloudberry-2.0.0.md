---
slug: whats-new-in-apache-cloudberry-2.0.0
title: "What's New in Apache Cloudberry 2.0.0"
description: "Dive into the new features and enhancements in Apache Cloudberry 2.0.0"
authors: [asfcloudberry]
tags: [Release]
image: /img/blog/whats-new-in-apache-cloudberry-2.0.0.png
---

Apache Cloudberry (Incubating) 2.0.0 is the first Apache release since joining the ASF Incubator. This major version delivers significant enhancements to the database kernel, representing a substantial leap forward in performance, reliability, and manageability. The release also includes hundreds of bug fixes and stability improvements.

In this article, we highlight only the most important features, enhancements, and fixes to help you quickly understand the key improvements in this release. For more details, please refer to the [Apache Cloudberry 2.0.0 Changelog](https://cloudberry.apache.org/releases/2.0.0-incubating/).

## New features

### Query processing and optimization

#### Index and scan

##### Enhanced index-only scan capabilities

- Supports index-only scans on a broader range of index types when using the GPORCA optimizer, including those with covering indexes using `INCLUDE` columns. This helps improve query performance.

- Supports dynamic index-only scan when using the GPORCA optimizer to accelerate queries on partitioned tables. This feature combines partition pruning with index-only access to avoid heap lookups, significantly reducing I/O and improving performance. It is ideal for wide tables with narrow covering indexes and can be enabled using `SET optimizer_enable_dynamicindexonlyscan = on`.

- Supports index-only scans when using the GPORCA optimizer on append-only (AO) tables and PAX tables, enabling faster query execution by avoiding block access when possible. This improves performance in scenarios where traditional index scans on AO and PAX tables were previously inefficient.

##### Improved index scan performance and flexibility

- Supports backward index scans when using the GPORCA optimizer for queries with `ORDER BY ... DESC`, eliminating the need for explicit sorting when a B-tree index exists in the opposite order. This optimization reduces resource usage and improves performance, especially for top-N and pagination queries.

- The GPORCA optimizer supports triggering Bitmap Index Scans using array comparison predicates like `col IN (...)` or `col = ANY(array)`, including for hash indexes. This improves query performance on large datasets by enabling more efficient multi-value matching. The optimizer automatically chooses the bitmap scan path based on cost estimation.

- The GPORCA optimizer now considers the width of `INCLUDE` columns when costing index-only scans, favoring narrower indexes that return fewer unused columns. This improves plan selection for queries where multiple covering indexes are available. The cost model also more accurately estimates I/O by refining how `relallvisible` is used in index-only scan costing.

##### BRIN index enhancements

- Redesigns BRIN index internals for AO/CO tables to replace the `UPPER` page structure with a more efficient chaining model. This significantly reduces disk space usage for empty indexes and improves performance by avoiding unnecessary page access. The new design better handles the unique layout of AO/CO tables while maintaining correctness and compatibility.

- BRIN indexes on AO/CO tables now support summarizing specific logical heap block ranges using `brin_summarize_range()`, enabling more precise control during index maintenance and testing. This enhancement also adds improved coverage for scenarios involving aborted rows, increasing robustness and correctness in edge cases.

- Supports generating `IndexScan` plans when using the GPORCA optimizer with `ScalarArrayOp` qualifiers (for example, `col = ANY(array)`) for B-tree indexes. This enhancement aligns ORCA with the planner's behavior and allows more efficient execution of array comparison queries, as long as the predicate column is the first key in a multicolumn index.

#### View and materialized view

- Improves performance of `REFRESH MATERIALIZED VIEW WITH NO DATA` by avoiding full query execution. The command now behaves like a `TRUNCATE`,significantly reducing execution time while preserving proper dispatch to segments.

#### Join

- Supports left join pruning when using the GPORCA optimizer, allowing unnecessary left joins to be eliminated during query optimization. This applies when the query only uses columns from the outer table and the join condition fully covers the inner table's unique or primary keys. This can lead to more efficient query plans.

- Supports `FULL JOIN` using the `Hash Full Join` strategy when using the GPORCA optimizer. This approach avoids sorting join keys and reduces data redistribution, making it suitable for large datasets or joins on non-aligned distribution keys. All `FULL JOIN` queries now use `Hash Full Join`.

- The GPORCA optimizer now avoids unnecessary data redistribution for multi-way self joins using left or right outer joins when the join keys are symmetric. This optimization improves performance by recognizing that such joins preserve data colocation, eliminating redundant motion operations.

- The GPORCA optimizer no longer penalizes broadcast plans for `NOT IN` queries (Left Anti Semi Join), regardless of the `optimizer_penalize_broadcast_threshold` setting. This change improves performance and avoids potential OOM issues by enabling parallel execution instead of concentrating large tables on the coordinator node.

#### Function & aggregate

- Supports intermediate aggregates when using the GPORCA optimizer, enabling more efficient execution of queries that include both `DISTINCT` aggregates and regular aggregates. This ensures correct handling of aggregation stages using `AGGSPLIT`. In addition, ORCA introduces an optimization for `MIN()` and `MAX()` functions by using index scans with a limit, instead of full table scans with regular aggregation. This optimization also supports `IS NULL` and `IS NOT NULL` conditions on indexed columns, significantly improving performance for applicable queries.

- Enables more `HashAggregate` plan alternatives for queries that include `DISTINCT` aggregates when using the GPORCA optimizer. By generating a two-stage aggregation plan that avoids placing `DISTINCT` functions in hash-based nodes, ORCA ensures compatibility with the executor and expands the range of supported query plans. This improvement enhances optimization choices for group-by queries.

- Supports queries using `GROUP BY CUBE`, enabling multi-dimensional grouping sets in query plans. This expands analytic query capabilities. Note that optimization time for `CUBE` queries may be high due to the large number of generated plan alternatives.

#### Preprocessing

- Inlines Common Table Expressions (CTEs) that contain outer references, allowing such queries to be planned and explained successfully. Previously, these queries would fall back to the legacy planner due to limitations in handling shared scans with outer references. This change improves compatibility and enables ORCA to optimize a broader range of CTE-based queries.

- No longer rewrites `IN` queries to `EXISTS` when the inner subquery contains a set-returning function. This prevents invalid query transformations that could previously result in execution errors. The change ensures correct handling of queries like `a IN (SELECTgenerate_series(1, a))`.

#### Optimization and performance enhancements

##### Dynamic Table

- Introduces dynamic tables, a new feature that enables automatic, scheduled refresh of query results. Dynamic tables are similar to materialized views but are designed for scenarios requiring up-to-date data, such as real-time analytics, lakehouse architectures, and automated ETL pipelines.
- Supports creating dynamic tables from base tables, external tables, or materialized views. Users can define refresh intervals using standard cron expressions, ensuring data is kept current without manual intervention.
- For more details, see the [official documentation](https://cloudberry.apache.org/docs/performance/use-dynamic-tables/).

##### Plan hint

- Supports plan hints for scan types and join row estimates when using the GPORCA optimizer, enabling users to guide query planning using `pg_hint_plan`-style comments. Supports scan hints include `SeqScan`, `IndexScan`, `BitmapScan`, and their negations, while row hints allow users to specify expected join cardinalities.

- The `plan hint` field is now required in the ORCA optimizer configuration. This change simplifies internal parsing logic and ensures consistent handling of optimizer configuration files.

- Supports join order hints for left and right outer joins when using the GPORCA optimizer, extending the existing hint framework beyond inner joins. This enhancement allows users to guide the optimizer's join order more precisely in complex queries involving outer joins, improving plan control and potentially execution performance.

##### Enhancements to ORCA

- Supports table aliases in query plans when using the GPORCA optimizer, making `EXPLAIN` outputs more descriptive and aligned with user-defined query syntax. In addition, ORCA adds support for query parameters, including those used in functions and prepared statements, enabling better compatibility with parameterized workloads and dynamic SQL execution.

- When using the GPORCA optimizer, supports generating plans for queries on tables with row-level security (RLS) enabled. Security policies are enforced during plan generation, ensuring only permitted rows are visible to each user. ORCA still falls back to the planner for RLS queries with sublinks, foreign tables, or for `INSERT` and `UPDATE` statements.

- The GPORCA optimizer now gracefully falls back to the Postgres planner when a function in the `FROM` clause uses `WITH ORDINALITY`, which is not currently supported. The fallback includes a clear error message indicating the unsupported feature.

- When using the GPORCA optimizer, supports pushing down filters with `BETWEEN` predicates when combined with constant filters, enabling more effective predicate propagation. This enhancement can reduce the number of rows processed during joins, improving query performance in applicable cases.

- When using the GPORCA optimizer, supports hashed subplans when the subquery expression is hashable and contains no outer references. This enhancement can significantly improve query performance by reducing execution time in applicable cases.

- ORCA now supports executing foreign tables with `mpp_execute='ANY'` on either the coordinator or segments, depending on cost. This allows more flexible and efficient execution plans for foreign data sources. A new "Universal" distribution type is introduced to support this behavior, similar to how `generate_series()` is handled.

- ORCA now supports direct dispatch for randomly distributed tables when the query includes a filter on `gp_segment_id`. This enhancement improves query performance by routing execution directly to the relevant segment, reducing unnecessary data processing across the cluster.

- ORCA now supports generating plans with the `ProjectSet` node, enabling correct execution of queries that include set-returning functions (SRFs) in the target list. This enhancement prevents fallback to the legacy planner and ensures compatibility with PostgreSQL 11+ behavior.

- ORCA now supports the `FIELDSELECT` node, which allows it to optimize a broader range of queries involving composite data types. Previously, such queries would fall back to the legacy planner. This enhancement improves compatibility and reduces unnecessary planner fallbacks.

- ORCA now derives statistics only for the columns used in `UNION ALL` queries, instead of all output columns from the input tables. This optimization reduces unnecessary computation and can improve planning performance for large queries.

- Updates naming in logs and `EXPLAIN` output to refer to the optimizers as "GPORCA" and "Postgres based planner" for improved clarity and consistency.

- Optimizes ORCA's `Union All` performance by deriving statistics only for columns used in the query output. This reduces unnecessary computation and improves planning efficiency for queries with unused columns.

### Transaction management

#### Lock management

- Updates logic to ignore invalidated slots while computing the oldest catalog Xmin, reducing the risk of deadlocks and improving transaction concurrency.

- Performs serializable isolation checks early for AO/CO tables, ensuring stricter consistency guarantees and reducing the likelihood of isolation conflicts.

- Enhances the index creation process to prevent deadlocks by ensuring the coordinator acquires an `AccessShareLock` on `pg_index` before dispatching a synchronization query to segments, thus aligning `indcheckxmin` and avoiding conflicts that GDD cannot resolve.

#### Transaction performance and reliability

- Avoids replaying DTX information in checkpoints for newly expanded segments, preventing potential inconsistencies during recovery.

- Adds `gp_stat_progress_dtx_recovery` for better observability of distributed transaction recovery progress.

- Improves error reporting for DTX protocol command dispatch errors, making it easier to diagnose and resolve issues.

- Allows utility mode on the coordinator to skip upgrading locks for `SELECT` locking clauses, improving efficiency for maintenance operations.

### Storage

#### PAX table format

- Introduces support for the PAX (Partition Attributes Across) storage format, a hybrid approach that combines the advantages of row-based and column-based storage. PAX is designed to deliver high performance for both data writes and analytical queries, making it well-suited for OLAP workloads and large-scale data analysis. For more details, see the [official documentation](https://cloudberry.apache.org/docs/operate-with-data/pax-table-format/).

#### AO/CO table enhancements

- Optimizes `CREATE INDEX` operations on AO tables with scan progress reporting, enhancing the efficiency of index creation.

- Declares the connected variable as "volatile" to ensure proper handling across `PG_TRY` and `PG_CATCH` blocks, mirroring PostgreSQL's best practices for exception-safe variable usage in transaction control.

#### Partitioning

- Extends Orca's planning capabilities to include support for foreign partitions, enabling optimized query execution for tables with a mix of foreign and non-foreign partitions. The implementation introduces new logical and physical operators for foreign partitions, supports static and dynamic partition elimination, and integrates with any foreign data wrapper compatible, enhancing performance and flexibility for external data queries.

- Optimizes the analysis of leaf partitions in multi-level partition tables to avoid unnecessary resampling of intermediate partitions.

- Supports dynamic partition elimination (DPE) when using the GPORCA optimizer for plans involving duplicate-sensitive random motions. This allows partition selectors to pass through segment filters, enabling more efficient query plans and reducing the number of scanned partitions.

- Adds Dynamic Partition Elimination for Hash Right Joins, which enhances the efficiency of join operations on partitioned tables.

- Supports boolean static partition pruning in ORCA, enhancing the efficiency of partition pruning during query optimization.

- Enhances ORCA's query planning by incorporating partition key opfamily checks during partition pruning to optimize data distribution and partition scanning, ensuring correct motion triggering and partition scanning by aligning predicate operators with the distribution or partition key's opfamily, addressing issues with missing motion, incorrect direct dispatch, and ineffective partition pruning.

- Caches the last found partition in `ExecFindPartition` to improve performance for repeated partition lookups.

- Enables ORCA to derive dynamic table scan cardinality from leaf partitions, addressing limitations in handling date and time-related data types by changing their internal representation to doubles.

- Enhances the DPv2 algorithm to include distribution spec information with partition selectors, improving the efficiency of distributed query execution.

- Introduces a new Non-Replicated distribution specification to optimize join operations in database processing. By relaxing the enforcement of singleton distribution for outer tables when the inner table is universally distributed, it aims to reduce unnecessary data gathering and duplicate-sensitive motions, thereby generating more efficient execution plans.

#### Memory management

- Implements a custom allocator to enable ORCA to use standard C++ containers, addressing heap allocation management.

- Refactors ORCA's memory pool by making several methods static and adds assertions to ensure pointer safety.

- Optimizes serialization of IMDId objects in ORCA to be lazy, improving performance by deferring serialization until necessary. Improves optimization time when loading objects into the relcache and when involving large and wide partition tables.

- Ensures that strings returned by `GetDatabasePath` are always freed using `pfree`, preventing memory leaks.

- Enables MPP (Massively Parallel Processing) support for `pg_buffercache` and builds it by default, making buffer cache management more scalable and efficient in distributed environments.

- Introduces `pg_buffercache_summary()` to offer a high-level overview of buffer cache activity.

#### Metadata and access methods

- Allows the definition of lock modes for custom reloptions, providing more control over table and index access.

- Supports specification of reloptions when switching storage models, allowing seamless transitions between different storage formats.

- Introduces a new struct member in `CreateStmt` to indicate the origin of the statement, specifying if it was generated from GP style classic partitioning syntax.

- Adds syscache lookup for `pg_attribute_encoding` and `pg_appendonly`, improving performance and efficiency in metadata access.

- Introduces a new catalog entry in `pg_aggregate` to store replication safety information for aggregates, allowing users to mark specific aggregates as safe for execution on replicated slices via an optional repsafe parameter during the `CREATE AGGREGATE` command. This helps optimize performance by avoiding unnecessary broadcasts on large replicated datasets.

- Enhances the dispatch of `ALTER DATABASE` commands by allowing options like `ALLOW_CONNECTIONS` and `IS_TEMPLATE` to be dispatched to segments, ensuring catalog changes are reflected everywhere.

### Data loading and external tables

#### External table enhancements

- Adds clearer restrictions and warnings when exchanging or attaching external tables. Writable external tables can no longer be used as partitions, and attaching readable external tables without validation now triggers a warning instead of requiring a no-op clause.

- Disables `SET DISTRIBUTED REPLICATED` for `ALTER EXTERNAL TABLE` to prevent misuse and ensure consistency.

#### Foreign data wrapper

- Improves performance and stability for `gpfdist` external tables. Adds TCP keepalive support for more reliable reads, and increases the default buffer size to enhance write throughput for writable external tables.

- ORCA now falls back to the planner for queries involving foreign partitions using `greenplum_fdw`, preventing crashes caused by incompatible execution behavior. Queries on non-partitioned foreign tables using `greenplum_fdw` remain supported by ORCA.

### High availability and high reliability

#### Backup and disaster recovery

- Improves archiver performance when handling many `.ready` files by reducing redundant directory scans. This change speeds up WAL archiving, especially when `archive_command` has been failing and many files have accumulated.

- `gp_create_restore_point()` can only be executed on the Coordinator node. Calling this function on a segment node will result in an error. The function returns a structured record value, including the restore point name and LSN, which you can view directly by running `SELECT * FROM gp_create_restore_point()`.

#### WAL

- Improves WAL replication management by restricting a coordinator-specific tracking mechanism to the coordinator only. This change simplifies primary segment behavior and aligns replication practices more closely across segments. No functional change for users, but helps reduce unnecessary complexity in WAL retention logic.

- Enhances WAL retention logic to improve reliability of incremental recovery using `pg_rewind`. Physical replication slots now retain WAL files up to the last common checkpoint, reducing risk of missing WAL during recovery. This change also simplifies the underlying logic and adds test coverage for WAL recycling.

- Switches WAL replication connections to use the standard libpq protocol instead of a legacy internal one. This improves compatibility and reliability of replication behavior. Also fixed test failures and improved error handling for replication connections.

### Security

#### DB Operations

- `REFRESH MATERIALIZED VIEW CONCURRENTLY` runs all internal operations in the correct security context to prevent potential privilege escalation. This change ensures safer execution by restricting operations to the appropriate permission level.

- Improves internal handling of new `aoseg` and `aocsseg` tuples by aligning tuple freezing behavior with other catalog operations. This change enhances consistency with upstream PostgreSQL practices and removes the need for `CatalogTupleFrozenInsert`.

#### System processes

- Orphaned file checks now exclude idle sessions during safety validation. This prevents unnecessary errors when persistent connections from services are active, allowing the detection process to complete successfully.

- Adds a safety check in backend signal handlers to ensure signals are handled by the correct process. This prevents unintended shared memory access by child processes and improves overall process isolation and stability.

- Improves process safety by preventing child processes spawned via `system()` from calling `proc_exit()`. This avoids potential corruption of shared memory structures and ensures only the parent process performs cleanup operations.

- Removes the permission check for `cpu.pressure` when using `gp_resource_manager='group-v2'`. This prevents startup failures on systems where PSI is disabled, without affecting resource management functionality.

#### Replication/Mirrorless clusters

- Improves replication error reporting by setting persistent `WalSndError` when a replication slot is invalidated. This ensures accurate error visibility in `gp_stat_replication`.

#### Permission management

- Strengthens security by rejecting extension schema or owner substitutions containing potentially unsafe characters like `$`, `'`, or `\`. This prevents SQL injection in extension scripts and protects against privilege escalation in certain non-bundled extensions.

- Creating or assigning roles to the `system_group` resource group now results in an error, as this group is reserved for internal system processes only.

- Reverts the restriction requiring superuser privileges to set the `gp_resource_group_bypass` GUC. This allows applications like GPCC to function more easily while still limiting resource impact.

- Altering the `mpp_execute` option of a foreign server or wrapper is now disallowed to prevent inconsistencies in foreign table distribution policies. Changing these options previously could result in outdated cached plans and incorrect query execution. This update ensures plan correctness by enforcing cache invalidation only when appropriate.

#### pgcrypto

- Adds support for FIPS mode in `pgcrypto`, controlled by a GUC. This allows Cloudberry to operate in FIPS-compliant environments when linked with a supported FIPS-enabled OpenSSL version. Certain ciphers are disabled in this mode to comply with FIPS requirements.

- `pgcrypto` now allows enabling FIPS mode even on systems where FIPS is not pre-enabled by the OS or environment. This change removes the dependency on `FIPS_mode()` checks, offering more flexibility in managing FIPS compliance through the database.

### Resource management

#### Resource group management

- Renames the `memory_limit` parameter to `memory_quota` in `CREATE/ALTER RESOURCE GROUP` to clarify its meaning and unit.

- Adds a new system view `gp_toolkit.gp_resgroup_status_per_segment` to monitor memory usage per resource group on each segment. This view helps database administrators track real-time vmem consumption (in MB) when resource group-based resource management is enabled.

- Improves logging behavior when memory usage reaches Vmem or resource group limits. The system now prints log messages directly to stderr to avoid stack overflow errors during allocation failures.

- Removes unnecessary permission check for `cpu.pressure` when using the `group-v2` resource manager. This prevents startup failures on systems where PSI is not enabled, improving compatibility across Linux distributions.

#### Logging and monitoring

- Adds additional log messages for GDD backends to help investigate memory-related issues. These logs provide better visibility into backend behavior during high memory usage scenarios.

- Adds a log ignore rule for "terminating connection" messages to reduce noise in test outputs. This helps avoid unnecessary diffs in CI for tests that involve connection termination.

- Adds more verbose logging to `ResCheckSelfDeadlock()`.

- Logs queue IDs and portal IDs in resource queue logs.

- Dumps more information when releasing resource queue locks to aid in troubleshooting and monitoring.

- Uses `ERROR` for dispatcher liveness checks.

- Enhances logging for dispatch connection liveness checks to improve clarity during connection failures. Logs now include more accurate error messages based on socket state and system errors.

#### Platform compatibility and build

- Improves `gp_sparse_vector` compatibility with ARM platforms by fixing type handling in serialization logic. This ensures consistent behavior across different architectures.

- Adds support for `sigaction()` on Windows to align signal handling behavior with other platforms. This reduces platform-specific differences and improves code consistency.

- Updates ACL mode type in ORCA to match the parser's definition, ensuring consistent type usage.

#### System views and statistics

- Improves join cardinality estimation for projected columns that preserve the number of distinct values (NDVs), such as additions or subtractions with constants. This allows the optimizer to use underlying column histograms for more accurate estimates, improving plan quality for queries with scalar projections in join conditions.

- Increases precision for frequency and NDV values in ORCA when processing metadata population scripts (MDPs). This change ensures consistent behavior between MDPs and live database queries, reducing discrepancies caused by rounding small values.

- ORCA now considers null value skew when costing redistribute motions, improving plan accuracy for queries involving columns with many nulls. This helps avoid performance issues caused by data being unevenly distributed across segments.

- ORCA now supports extended statistics to improve cardinality estimation for queries with correlated columns. This allows the optimizer to use real data-driven correlation factors instead of relying on arbitrary GUC settings, leading to more accurate query plans.

- Introduces `gp_log_backend_memory_contexts` to log memory contexts across segments, with optional targeting by content ID. This enhances observability and helps diagnose memory issues in distributed queries.

- ORCA now supports statistics derivation for predicates involving different time-related data types, such as date and timestamp. This improves plan accuracy and performance for queries comparing mixed temporal types.

- Autostats now uses `SKIP LOCKED` for `ANALYZE` operations to avoid blocking on locks, reducing the risk of deadlocks and improving predictability. This behavior is enabled by default and can be controlled using the `gp_autostats_lock_wait` GUC.

- ORCA now supports `STATS_EXT_NDISTINCT` extended statistics for estimating cardinality on correlated columns. This improves accuracy for queries using `GROUP BY` or `DISTINCT` on such columns.

#### Network connections

- Marks `gp_reject_internal_tcp_connection` as defunct to improve reliability of internal QD-to-entry DB connections. These connections over TCP/IP are now treated as authenticated by default, preventing authentication errors caused by `pg_hba.conf` settings.

### Tools and utilities

#### analyzedb

- `analyzedb` now includes materialized views in its list of tables to analyze. This improves the performance immediately after analysis.

#### gpexpand

- `gpexpand` now includes a cluster health check to ensure all segments are up and in their preferred roles before proceeding. This prevents incorrect port assignments and avoids potential issues during expansion when nodes are not in a stable state.

#### gp_toolkit

- Added an update path for the `gp_toolkit` extension to version 1.6. This update renames the column `memory_limit` to `memory_quota` in the `gp_resgroup_config` view for improved clarity. Users can apply the update using `ALTER EXTENSION gp_toolkit UPDATE TO '1.6'`.

## Bug fixes

- Fixed data loss caused by incorrect shared snapshot handling.
- Fixed memory corruption during AOCO ADD COLUMN abort.
- Fixed checkpoint WAL replay failure.
- Fixed incorrect results when using UNION for RECURSIVE_CTE.
- Fixed incorrect results from hash joins on char columns.
- Fixed incorrect results produced by WITH RECURSIVE queries.
- Fixed incorrect results when a REPLICATED table is unioned with a DISTRIBUTED table.
- Fixed incorrect results when the outer query had ORDER BY after a LATERAL subquery.
- Fixed incorrect behavior of DELETE with split update.
- Fixed incorrect results when using direct dispatch.
- Fixed memory leaks in ORCA and various components.
- Fixed long-running execution with bitmap indexes.
- Fixed redundant SORT enforcement on group aggregates.
- Fixed incorrect index position in target list in ExecTupleSplit.
- Fixed incorrect value in the cpu_usage column returned by `pg_resgroup_get_status()`.
- Fixed incorrect behavior of gp_toolkit.gp_move_orphaned_files.
- Fixed incorrect results in multi-stage aggregate queries.
- Fixed incorrect plan and output in multi-stage aggregate queries.
- Fixed incorrect reltuples value after VACUUM.
- Fixed incorrect index->reltuples value after VACUUM.
- Fixed a vulnerability where LDAP leaked user information.
- Fixed incorrect permissions warning on the pgpass file.
- Fixed incorrect handling of ONLY keyword for multiple tables in GRANT/REVOKE statements.
- Fixed incorrect permissions in resource management DDL.
- Fixed incorrect security context in REFRESH MATERIALIZED VIEW CONCURRENTLY.
- Fixed deadlock between coordinator and segments.
- Fixed race condition in CTE reader-writer communication.
- Fixed race condition when invalidating obsolete replication slots.
- Fixed deadlock by allowing concurrent creation of non-first indexes on AO tables.
- Fixed locking issue when opening range tables inside `ExecInitModifyTable()`.
- Fixed incorrect unlock mode in DefineRelation.
- Fixed incorrect locking in partition distribution policies.
- Fixed issues with rle_type when converting a table from AO to AOCO.
- Fixed incorrect handling of empty ranges and NULL values in BRIN indexes.
- Fixed incorrect handling of NULL values when merging BRIN summaries.
- Fixed incorrect TIDs order when building bitmap indexes.
- Fixed possible inconsistency between bitmap LOV table and its index.
- Fixed incorrect behavior of VACUUM in AO tables with indexes.
- Fixed incorrect handling of TOAST values for invisible AppendOptimized tuples during VACUUM.
- Fixed ORCA's invalid processing of nested SubLinks under aggregates.
- Fixed ORCA's invalid processing of nested SubLinks referenced in GROUP BY clauses.
- Fixed ORCA's invalid processing of nested SubLinks with GROUP BY attributes.
- Fixed incorrect predicate pushdown when using casted columns.
- Fixed incorrect join condition loss after pulling up sublinks to join nodes.
- Fixed incorrect hash-key generation for Redistribute Motion in multi-DQA expressions.
- Fixed incorrect plan generation for SEMI JOIN with RANDOM distributed tables.
- Fixed incorrect behavior of gp_stat_bgwriter.
- Fixed incorrect monitoring in pg_stat_slru.
- Fixed incorrect monitoring in gp_stat_progress_dtx_recovery.
- Fixed incorrect monitoring in pg_resgroup_get_status().
- Fixed incorrect monitoring in gp_toolkit.gp_resgroup_config.
- Fixed compilation issues on various platforms.
- Fixed documentation and comment typos.
- Fixed build system and Makefile issues.
- Fixed various memory leaks and resource management issues.
- Fixed various error handling and logging improvements.
- Fixed mismatched types.
- Fixed the ORCA preprocess step for queries with the Select-Project-NaryJoin pattern.
- Fixed the missing discard_output variable in shared scan node functions.
- Fixed the crash caused by running VACUUM AO_AUX_ONLY on an AO-partitioned table.
- Fixed an obvious memory leak in _bitmap_xlog_insert_bitmapwords().
- Fixed a memory leak in the merge join implementation.
- Fixed the issue where the token for user ID xxx did not exist.
- Fixed the issue where plan hints could not derive table descriptors.
- Fixed the issue where inject_fault suspend could not be canceled.
- Fixed fallback in debug builds due to scalars with invalid return types.
- Fixed relptr encoding of the base address.
- Fixed visimap consults for unique checks during UPDATE operations.
- Fixed the issue where external table location URIs containing | caused errors.
- Fixed handling of the time command output containing commas.
- Fixed a small overestimation of the output length of base64 encoding.
- Fixed gp_toolkit.__gp_aocsseg_history crash on non-AO columnar tables.
- Fixed a race condition between termination and resqueue wakeup.
- Fixed a statement leak involving self-deadlocks.
- Fixed the detection of child output columns when the parent is a UNION during join pruning.
- Fixed a query crash when using a negative memory_limit value in resource groups.
- Fixed issues in pgarch new directory-scanning logic.
- Fixed a memory leak in the FTS PROBE process.
- Fixed check_multi_column_list_partition_keys.
- Fixed a memory leak caught via ICW with memory check enabled.
- Fixed query hang and fallback issues involving CTEs on replicated tables.
- Fixed the unrecognized join type error with LASJ Not-In and network types.
- Fixed issues in upgrade_adapt.sql related to queries using WITH OIDS.
- Fixed the double declaration of check_ok() in pg_upgrade.h.
- Fixed logic error with subdirectories generated by pg_upgrade for internal files.
- Fixed a typo in the pg_upgrade file header.
- Fixed the bug where PL/Python functions caused the master process to reset.
- Fixed the Shared Scan hang issue involving initplans.
- Fixed motion toast error.
- Fixed a memory leak related to fsync in AO tables.
- Fixed CDatumSortedSet handling of empty arrays that caused errors in ORCA.
- Fixed ORCA returning incorrect column type modifier information.
- Fixed DbgStr output when printing DP structs in ORCA.
- Fixed the comment on performDtxProtocolPrepare.
- Fixed a memory leak in Dynamic Index, IndexOnly, and BitmapIndex scans during execution.
- Fixed the memory accounting bug when moving MemoryContext under another accounting node.
- Fixed the ALTER TABLE ALTER COLUMN TYPE issue that reuses an incorrect index.
- Fixed query fallback when a subquery is present within LEAST() or GREATEST().
- Fixed the typo in timestamp.
- Fixed unexpected warnings related to pg_stat_statements node types.
- Fixed the crash involving initplan in MPP.
- Fixed LeftJoinPruning pruning essential LEFT JOINs.
- Fixed the SET command that incorrectly sends DTX protocol commands.
- Fixed the segmentation fault in addOneOption().
- Fixed parallel_retrieve_cursor diffs.
- Fixed gpdiff.pl to ignore information when EXPLAIN ignores costs.
- Fixed the uninitialized-use warning in CTranslatorDXLToPlStmt.cpp.
- Fixed the bug where the LOCALE flag cannot be used with a string pattern.
- Fixed a typo in cdbmutate.c.
- Fixed CColRefSet debug printing.
- Fixed ORCA producing incorrect plans when handling SEMI JOIN with RANDOM distributed tables.
- Fixed orphaned temp tables on the coordinator.
- Fixed the segmentation fault caused by concurrent INSERT ON CONFLICT and DROP TABLE.
- Fixed redundant columns in a multi-stage aggregate plan.
- Fixed the import of ICU collations in pg_import_system_collations().
- Fixed the error: "Cannot add cell to table content: total cell count of XXX exceeded."
- Fixed orphaned temporary namespace catalog entries left on the coordinator.
- Fixed REFRESH MATERIALIZED VIEW on AO tables with indexes.
- Fixed the use of PORTNAME in the gp_toolkit Makefile.
- Fixed pg_stat_activity display for bypassed and unassigned queries.
- Fixed the recursive CTE MergeJoin that involved a motion on WTS.
- Fixed the column width display for partitioned tables.
- Fixed the LDAP crash when ldaptls=1 and ldapscheme is not set.
- Fixed the gpstop pipeline flakiness after the referenced change.
- Fixed the ANALYZE bug in expand_vacuum_rels.
- Fixed the compilation error.
- Fixed the ORCA crash due to improper colref mapping with CTEs.
- Fixed the bug where gpload insert mode was not included in a transaction.
- Fixed the bug where resgroup total wait time was always zero.
- Fixed the gpcheckcat error against pg_description.
- Fixed flakiness caused by waiting for a different number of fault triggers.
- Fixed the bug involving RelabelType in the GROUP BY clause.
- Fixed the planner error with multiple copies of an AlternativeSubPlan.
- Fixed the issue with bitmap indexes.
- Fixed the bug in HashAgg related to selective-column-spilling logic.
- Fixed the bug in disk-based hash aggregation.
- Fixed the pipeline stall issue in LookupTupleHashEntryHash().
- Fixed the use of version in ArgumentParser, which is deprecated.
- Fixed the use of BaseException.message, which has been deprecated since Python 2.6.
- Fixed the case pg_rewind_fail_missing_xlog.
- Fixed the compiler warning for gcc-12.
- Fixed support for the DEFERRABLE keyword on primary and unique keys.
- Fixed the unlocking of pruned partitions in partitioned tables.
- Fixed the crash in ORCA involving skip-level correlated queries.
- Fixed the removal of Assert statements in release builds.
- Fixed the typo in comments: JOIN_SEMI_DEDUP/JOIN_SEMI_DEDUP_REVERSE.
- Fixed the issue where REORGANIZE=TRUE did not redistribute randomly-distributed tables.
- Fixed the core dump caused by concurrent updates on partition tables in DynamicScan.
- Fixed the typo: ANALZE to ANALYZE.
- Fixed the issue where cgroup v1 cpu_quota_us cannot be larger than its parent's value.
- Fixed indentation and trailing whitespace in UDFs in resgroup/resgroup_auxiliary_tools_v1.
- Fixed the name of cpu_hard_quota_limit in resgroup_syntax.sql.
- Fixed multi-row DEFAULT handling in INSERT ... SELECT rules.
- Fixed invalid function references in several comments.
- Fixed the bug where COPY FORM does not throw ERROR: extra data after last expected column.
- Fixed the issue where file .204800 was not being checked in ao_foreach_extent_file.
- Fixed the issue of incorrectly incrementing the command counter.
- Fixed the coordinator crash in MPPnoticeReceiver.
- Fixed the dangling pointer in ExecDynamicIndexScan().
- Fixed the ORCA bug that incorrectly removed required redistribution motion when using GROUP BY over gp_segment_id.
- Fixed header handling in url_curl.c.
- Fixed ao_filehandler to support new attnum to filenum mapping changes.
- Fixed pg_aocsseg to work with attnum to filenum mapping.
- Fixed a comment in pg_dump.
- Fixed the ORCA build break.
- Fixed the gpconfig SSH retry undefined parameter issue.
- Fixed the stale gp_default_storage_options comment.
- Fixed the bug: unrecognized node type: 147.
- Fixed spelling errors identified by lintian.
- Fixed the bypass catalog unit test.
- Fixed erroneous Valgrind markings in AllocSetRealloc.
- Fixed the legacy bug in the DatabaseFrozenIds lock.
- Fixed the mirror checkpointer error on the ALTER DATABASE query.
- Fixed the bug: get_ao_compression_ratio() failed on root partitioned tables with AO children.
- Fixed the issue where InterruptHoldoffCount was not being reset.
- Fixed gpexpand failure caused by an event trigger.
- Fixed missing redistribute for CTAS or INSERT INTO on randomly distributed tables when using ORCA.
- Fixed the double free of remapper->typmodmap in TeardownUDPIFCInterconnect().
- Fixed the bug in the upstream-merged COMMIT AND CHAIN feature.
- Fixed inconsistency between gp_fastsequence row and index after a crash.
- Fixed the typo allocatd to allocated.
- Fixed the error: unrecognized node type: 145 in transformExpr.
- Fixed build error caused by unused variable.
- Fixed the issue where the distribution key was missing when creating a stage table.
- Fixed the regex for etc/environment.d.
- Fixed the string comparison warning.
- Fixed obsolete references to SnapshotNow in comments.
- Fixed pull-up error when the target list contains a RelabelType node.
- Fixed the issue where index DDL operations were recorded in QEs' pg_last_stat_operation.
- Fixed two compiler warnings.
- Fixed the wrong value of maxAttrNum in TupleSplitState.
- Fixed the bug of incorrect index position in target list in ExecTupleSplit.
- Fixed the format error of the library name on Mac M1.
- Fixed the pg_resgroup_get_status_kv() function.
- Fixed interconnect bugs in ic_proxy_ibuf_push().
- Fixed memory leaks in auto_explain.
- Fixed ic_proxy compilation when HOST_NAME_MAX is unavailable.
- Fixed duplicate filters caused by reversed operator argument order.
- Fixed pg_rewind when the log file is a symbolic link.
- Fixed and enabled 64-bit bitmapset and updated visimap.
- Fixed the hang caused by multi-DQA with filters in the planner.
- Fixed the bogus ORCA plan that incorrectly joins a CTE and a REPLICATED table.
- Fixed the error in ATSETAM when applied to ao_column with a dropped column.
- Fixed the LWLockHeldByMe assert failure in SharedSnapshotDump.
- Fixed the KeepLogSeg() unit test.
- Fixed the race condition when invalidating obsolete replication slots.
- Fixed the uninitialized value in segno calculation.
- Fixed issues in the invalidation logic for obsolete replication slots.
- Fixed checkpoint signalling.
- Fixed memory overrun when querying pg_stat_slru.
- Fixed the bug where ORCA fails to decorrelate subqueries ordered by outer references.
- Fixed unused variable compile warnings.
- Fixed the bug where NestLoop join fails to materialize the inner child in some cases.
- Fixed COPY execution via FDW on coordinator as executor.
- Fixed inFunction usage for auto_stats in CTAS.
- Fixed a compiler warning.
- Fixed the syntax error with CREATE MATERIALIZED VIEW.
- Fixed the issue preventing temporary table creation LIKE existing tables with comments.
- Fixed and rewrote IndexOpProperties API.
- Removed redundant Get/SetStaticPruneResult usage.
- Fixed EPQ handling for DML operations.
- Fixed gpcheckperf failure when using -V with -f option.
- Fixed possible mirror startup failure triggered by FTS promotion.
- Fixed the parallel retrieve cursor issue when selecting transient record types.
- Fixed the resource management DDL warning: unrecognized node type when log_statement='ddl'
- Fixed the resgroup init error when many cores are present in cpuset.cpus.
- Fixed resqueue malfunction when using JDBC extended protocol.
- Fixed the missing LOCKING CLAUSE on foreign tables when ORCA is enabled.
- Fixed the test_consume_xids behavior where it consumes one more transaction ID than expected.
- Fixed the ONLY keyword handling for multiple tables in GRANT/REVOKE statements.
- Fixed the regression test to ignore memory usage values in JSON format EXPLAIN output.
- Fixed relcache lookup in ORCA when selecting from sequences.
- Fixed missing WAL files required by pg_rewind.
- Fixed the gp_dqa test to explicitly ANALYZE tables.
- Fixed the crash of AggNode in the executor caused by an ORCA plan.
- Fixed the resource group cpuset test case.
- Fixed the compiler warning caused by gpfdist with compressed external tables.
- Fixed link issues on macOS and Windows.
- Fixed failure when DynamicSeqScan contains a SubPlan.
- Fixed the error: cache lookup failed for type 0.
- Fixed the multi-level correlated subquery bug.
- Fixed checkpoint WAL replay failure.
- Fixed the check for BufFileRead() in ExecHashJoinGetSavedTuple().
- Fixed the test extension to allow executing SQL code inside a Portal.
- Fixed resgroup view test cases.
- Fixed incorrect DISTKEY assignment when copying partitions on segments.
- Fixed ic-proxy mis-disconnecting addresses after reloading the config file.
- Fixed the gpcheckcat check on partition distribution policies.
- Fixed colid remapping in disjunctive constraints.
- Fixed the Makefile by removing the tablespace-step target from all.
- Fixed CBitSet intersection logic in ORCA.
- Fixed the query preprocessor for nested Select-Project-NaryJoin patterns.
- Fixed incorrect unlock mode in DefineRelation.
- Fixed the upgrade process for external tables with dropped columns.
- Fixed the formatting issue in SECURITY.md.
- Fixed gp_gettmid to return the correct startup timestamp.
- Fixed the gpload regression test failure when the OS user is not gpadmin.
- Fixed the compiler warning in appendonlyblockdirectory.c.
- Fixed missing reloptions in partition roots created using Cloudberry syntax.
- Fixed the crash when calling get_ao_compression_ratio on HEAP tables.
- Fixed incorrect sortOp and eqOp values generated by IsCorrelatedEqualityOpExpr.
- Fixed the dependency bug involving minirepro and materialized views.
- Fixed recursion handling in ALTER TABLE ... ENABLE/DISABLE TRIGGER.
- Fixed SPE plans to display Partitions selected: 1 (out of 5).
- Fixed incorrect hash-key generation for Redistribute Motion when creating paths for multi-DQA expressions.
- Removed gp_enable_sort_distinct and noduplicates optimizations.
- Fixed gpinitsystem Behave tests that use environment variables.
- Fixed false alarms in gpcheckcat for pg_default_acl.
- Fixed gpinitsystem failure with custom locale settings.
- Fixed a panic in the greenplum_fdw test.
- Fixed the failure in bitmap index null-array condition.
- Fixed the compilation warning in gram.y.
- Fixed multiple issues related to DistributedTransaction handling.
- Fixed compile-time warnings in pg_basebackup code.
- Fixed gplogfilter to correctly generate CSV output.
- Fixed the assert in the OpExecutor node.
- Fixed improper copying of group statistics in ORCA.
- Fixed error reporting after ioctl() call in pg_upgrade --clone mode.
- Fixed replay of CREATE DATABASE records on standby.
- Fixed a minor memory leak in pg_dump.
- Fixed parallel restore of foreign keys to partitioned tables.
- Fixed the issue where the pg_appendonly entry was not removed during AO-to-HEAP table conversion.
- Fixed assertion failure and segmentation fault in the backup code.
- Fixed fallback behavior for non-default collations.
- Fixed the subtransaction test for Python 3.10.
- Fixed Windows client compilation of libpgcommon.
- Fixed compiler warnings introduced by the Dynamic Scan commit.
- Fixed the issue where CREATE OR REPLACE TRANSFORM failed.
- Fixed compiler warnings for non-assert builds.
- Fixed lock assertions in dshash.c.
- Fixed \watch interaction with libedit on C.