---
slug: postgresql16-for-apache-cloudberry-202606
title: "Apache Cloudberry Upgrades to PostgreSQL 16 Kernel"
description: "Cloudberry's main branch merges PostgreSQL 16, bringing MERGE, SQL/JSON, parallel VACUUM, logical replication enhancements, and over 5,730 upstream commits from PostgreSQL 15 and 16."
authors: [asfcloudberry]
tags: [Announcement]
image: /img/blog/postgresql-16-for-apache-cloudberry.png
---

The Apache Cloudberry (Incubating) community is pleased to announce that the Cloudberry main branch has upgraded its PostgreSQL kernel from **14.4** to **16.9**.

Apache Cloudberry users can now leverage PostgreSQL 16 features—including the MERGE command, SQL/JSON constructors, parallel VACUUM, and a rewritten statistics subsystem—directly in their MPP workloads. This upgrade spans two major PostgreSQL upstream releases (PostgreSQL 15 and 16) and incorporates over **5,730** upstream commits. It marks Cloudberry’s second cross-version kernel upgrade since the project was derived from Greenplum Database and began its independent evolution (the first being the leap from PostgreSQL 12.x — the kernel carried by Greenplum Database 7.0 — to 14.4). It is also the first major kernel upgrade driven by a broad group of community contributors since Cloudberry joined the Apache Incubator.

## Why this upgrade matters

The PostgreSQL database kernel is the foundation Cloudberry is built on. Tracking the PostgreSQL upstream release cadence is both an engineering necessity and a responsibility to our ecosystem.

- **PostgreSQL 14.x is approaching end of life.** Following the PostgreSQL community’s release lifecycle, PostgreSQL 14 is scheduled to reach end of support in November 2026. Completing the major-version upgrade in advance avoids a future where Cloudberry users have to choose between security patches and stability.
- **Faster access to PostgreSQL innovation.** Features like `pg_stat_io`, Memoize, and LZ4 WAL compression—originally developed by the upstream community—now flow into Cloudberry without years of backporting effort. Staying aligned with PostgreSQL upstream lets new features, planner improvements, and ecosystem tooling reach Cloudberry users naturally.

By staying aligned with a modern PostgreSQL releases, Cloudberry ensures users run their MPP workloads on an actively maintained PostgreSQL kernel — one that delivers a decade of upstream improvements without the delays and risks of backporting.

## What this upgrade brings

PostgreSQL 15 and 16 together accumulated a large body of improvements. To make this extensive list of updates easy to navigate, we have grouped the key changes into four primary categories for users and administrators, followed by developer-specific internal changes:

### 1. Modern SQL Capabilities & Query Standards

Upgrading to PostgreSQL 16 brings full support for the SQL-standard **`MERGE` command**, robust **SQL/JSON constructors**, and advanced database collations to Cloudberry:

- **`MERGE` Statement:** Full support for the SQL-standard `MERGE` command, allowing `INSERT / UPDATE / DELETE` to be expressed in a single statement. In Cloudberry’s distributed environment, this significantly simplifies ETL/ELT pipelines, replacing complex client-side workarounds and reducing coordinator-segment round-trips. Accompanying fixes cover partitioned tables, cross-partition triggers, RLS, `EvalPlanQual`, self-modified tuples, and `pg_stat_statements` integration.
- **SQL/JSON Enhancements:** New `IS JSON` predicate and standard JSON constructor functions (`json_array`, `json_object`, `json_scalar`, `json_serialize`), plus auto-generated query jumbling via `gen_node_support.pl` and stability fixes such as the `json_array()` subquery double-transformation issue.
- **Built-in ICU Support:** ICU support is now built by default, bringing superior multilingual sorting and localization out-of-the-box. `initdb` uses `uloc_getDefault()`, and `CREATE DATABASE LOCALE` applies across all collation providers.
- **SQL Types & Functions:**
  - Numeric scale can now be negative or greater than precision.
  - New `ANY_VALUE` aggregate.
  - `unnest(multirange)` and `range_agg` with multirange inputs.
  - `pg_size_pretty` / `pg_size_bytes` extended to petabyte scale.
  - `ALTER TABLE SET ACCESS METHOD` for switching table storage backends.
  - New `SYSTEM_USER` function and a `numeric_mul()` overflow fix.

### 2. Performance & Resource Optimization

Tracking upstream PostgreSQL releases introduces critical performance, query planning, and storage enhancements designed to scale with your MPP workloads:

- **Parallel `VACUUM` & Autovacuum:**
  - **Parallel VACUUM** (PostgreSQL 16, with the new `vacuumparallel.c`) helps reclaim space faster, allowing segment nodes to execute vacuuming operations in parallel to reduce disk I/O bottlenecks and locking overhead.
  - `ON COMMIT DELETE ROWS` no longer errors out after `relhassubclass=f`.
  - VACUUM end-of-truncation phase uses `WaitLatch()` instead of `pg_usleep()`.
  - Numeric overflow fix in parallel numeric aggregates.
  - `ANALYZE` preserves `relhasindex` for partitioned tables.
- **Optimizer & Executor Improvements:**
  - Hash-table acceleration for `NOT IN (values)`.
  - Datum sorts for single-column sorts.
  - Result Cache renamed to **Memoize**, with continued performance tuning.
  - **Parallel Hash Full Join** to speed up complex distributed queries.
  - Lower planning cost for deeply nested views, and fewer pallocs when building partition bounds.
  - Outer join optimization enhancements and symmetric hash join improvements (PostgreSQL 16).
- **WAL & Storage Subsystem:**
  - **LZ4 compression for full-page writes (FPW)** to reduce WAL volume and speed up replication under write-heavy workloads.
  - **Custom WAL resource managers** so extensions can register their own WAL record types.
  - **Direct I/O on macOS**, and skipping WAL recycling/preallocation during archive recovery.
  - Buffer manager refactored for faster relation extension, with new helpers like `smgrzeroextend()`, `FileZero()`, and `FileFallocate()`.
  - WAL/Recovery code split into `xlogrecovery.c` and `xlogprefetcher.c`, plus a new backup sink architecture (PostgreSQL 15).
  - To guarantee data integrity, the `HeapBitmapScan` `skip_fetch` optimization, which had correctness concerns, has been removed.
- **Critical Correctness Planner/Executor Fixes:**
  - Recognition of multiple hashable `ScalarArrayOpExpr`s in the planner.
  - Consistent whole-row Var construction between parsing and planning.
  - WindowAgg evaluation crash.
  - `WITH RECURSIVE UNION` assertion failure.
  - `ORDER BY` / `DISTINCT` aggregates with `FILTER`.
  - Missing expression processing on prune steps in `setrefs.c`.
  - Extreme skew detection in Parallel Hash Join.

### 3. Data Sync & Ecosystem Connectivity

This upgrade enhances the reliability and performance of logical replication, backup/restore workflows, and client-side protocols:

- **Major Logical Replication Improvements:**
  - Built-in support for **two-phase commit (2PC) on logical replication**, which can be enabled directly through the replication protocol. This is vital for maintaining transactional consistency across distributed segments in an MPP layout.
  - **Parallel apply workers** (PostgreSQL 16), **row/column-level filtering and schema-level publications** (PostgreSQL 15) significantly improve replication throughput and flexibility.
  - New predefined role `pg_create_subscription` for finer-grained permission management.
  - A series of correctness and robustness fixes, including a critical data-loss issue, slot invalidation, snapshot handling, and memory leaks.
- **Backup, Restore, and Upgrade Tooling:**
  - **`pg_dump`**: generic compression API, with zstd and LZ4 frame-only formats.
  - **`pg_basebackup`**: extended compression options, server-side compression (including `-Fp`), client-side LZ4 decompression, and parallel zstd compression.
  - **`pg_upgrade`**: fixes for an unintentional `'NULL'` string literal and cross-version `XMLSERIALIZE(NO INDENT)` handling; `pg_dumpall` correctly handles dangling OIDs in `pg_auth_members`.
- **Client Protocol & libpq:**
  - New `PQsendFlushRequest` and a fix for the pipeline-mode state machine.
  - SASL code refactored into a generic interface.
  - Escape function fixes for invalid encoding data, including security-relevant changes.
  - Length handling fixes in `PQescapeLiteral()` / `PQescapeIdentifier()`.
  - Build-time check that libpq does not call `exit()` or `abort()`.
- **Operator & psql Experience:**
  - `\watch` honors `PSQL_WATCH_PAGER`.
  - New `\drg` command for inspecting role grants.
  - `\copy from` now sends data in larger chunks.
  - `pg_waldump --rmgr` accepts multiple specifications.

### 4. Enterprise Observability, Security & Stability

Upgrading the core kernel to PostgreSQL 16 brings a modern, shared-memory statistics subsystem, security guardrails, and key robustness fixes:

- **Observability & the pgstat Rewrite:**
  - **Shared-Memory pgstat Rewrite (PostgreSQL 15):** The dedicated stats collector process is replaced with shared memory stats. This eliminates a potential performance bottleneck under high concurrent workloads. The monolithic `pgstat.c` was split into 14 files under `utils/activity/`, making the database kernel cleaner and easier to maintain.
  - **New `pg_stat_io` View (PostgreSQL 16):** Detailed I/O statistics including shared buffer hits, I/O times, and writebacks.
  - **`pg_stat_statements` Upgrades:** JIT counters, temp file block I/O timing, normalized utility query strings, `MERGE` support, and a 32-bit integer overflow fix.
  - Other improvements: SP-GiST index scans counted in pgstat, enhanced `pg_stat_reset_single_table_counters`, and new test helpers `pg_stat_force_next_flush()` and `pg_stat_have_stats()`.
- **Security and Privilege Model:**
  - **`CREATEROLE` privilege restrictions:** A substantial improvement to the role/privilege model that closes long-standing privilege escalation paths.
  - New GUCs: `createrole_self_grant`, `reserved_connections`.
  - New predefined roles: `pg_maintain`, `pg_create_subscription`.
  - Non-superuser predefined roles for vacuum / analyze workflows.
  - `PUBLIC CREATE` is revoked from the public schema, which is now owned by `pg_database_owner`.
  - **Security Invoker Views** (`SECURITY INVOKER`).
  - Fixes around `session_authorization` interactions and a `scram_SaltedPassword()` integer overflow.
- **Partitioned Table Improvements:**
  - Self-referencing foreign keys on partitioned tables.
  - Correct handling of detach with top-level FKs.
  - `relhassubclass` reset on ATTACH; consistent trigger renames; firing state preserved on clone.
  - Partitionwise join / grouping is disabled when collations do not match, preventing incorrect results.
- **Critical Stability and Data Correctness Fixes:**
  - Fixed data corruption on relation truncation failure.
  - Page header is no longer corrupted when an update lands on a non-`LP_NORMAL` TID; the operation now fails cleanly.
  - Unsafe `BufferDescriptors` access.
  - GB18030 SIGSEGV from out-of-bounds read.
  - Snowball stemmer null pointer dereference after OOM.
  - Rare standby assertion failure on primary restart.
  - Catcache invalidation during list entry construction.

### 5. Under the Hood: Updates for Kernel Contributors

If you are a contributor working on the Cloudberry database engine, this upgrade introduces several codebase updates, cleaner abstraction layers, and automated testing tools:

- **Pervasive Storage Refactor:** **`RelFileNode` ➔ `RelFileLocator`** rename. This touches hundreds of files, aligning Cloudberry's internal naming conventions with modern PostgreSQL.
- **Configuration Engine Decoupling:** GUC system split: `guc.c` ➔ `guc.c` + `guc_tables.c` + `guc_funcs.c`.
- **Header Optimization:** `varatt.h` separated from `postgres.h`.
- **Modernized Testing Cluster:** The test suite transitioned from `PostgresNode.pm` to the new `PostgreSQL::Test::Cluster` framework, improving testing speed and reliability.
- **Parser Automation:** `gen_node_support.pl` auto-generates `copyfuncs` / `equalfuncs` / `outfuncs` / `readfuncs` and query jumbling code, with a NodeTag ABI stability check.

## What this means for Cloudberry users

- **A modern PostgreSQL foundation.** Cloudberry users can now benefit directly from features accumulated across PostgreSQL 15 and 16, including MERGE, SQL/JSON, two-phase logical replication, Memoize, Parallel Hash Full Join, and `pg_stat_io`.
- **Better observability and operability.** The shared-memory pgstat rewrite, the new I/O view, and `pg_stat_statements` enhancements give operators and DBAs a richer toolbox for performance analysis.
- **A stronger security posture.** `CREATEROLE` tightening, new predefined roles, and security invoker views align Cloudberry’s privilege model more closely with modern production practices.
- **Smoother ecosystem integration.** Staying close to PostgreSQL upstream means Cloudberry can interoperate more naturally with PostgreSQL extensions, tools, and clients.

## What comes next

Landing this work on the main branch is a milestone, not the finish line.

- **Try it out.** Some issues uncovered during the upgrade (tracked on the [community project board](https://github.com/orgs/apache/projects/497)) are not yet fully resolved; the community is actively working on them and aims to address them as quickly as possible. We warmly invite users and developers to exercise the new kernel in test environments and share feedback.
- **Continued optimization.** Expect ongoing work on MPP-side integration with the new kernel, performance regression fixes, and further tuning of existing capabilities on top of PostgreSQL 16.
- **Community collaboration.** Issues, pull requests, and real-world usage reports all help Cloudberry move forward. If you would like to contribute, the door is open.

## Acknowledgments

This kernel upgrade was a collaborative effort across the community. Special thanks to the contributors who drove the merge:

> @chenjinbao1989, @lss602726449, @reshke, @gfphoenix78, @yjhjstz, @tuhaihe

And to everyone who participated in code reviews, testing, and issue reporting throughout the year-long effort.

## Join us

Apache Cloudberry is a community-driven open-source project, and we welcome contributors of all backgrounds—whether you are a database veteran or just getting started with MPP systems.

- Website: https://cloudberry.apache.org
- Repository: https://github.com/apache/cloudberry
- Discussions: https://github.com/apache/cloudberry/discussions
- Issue tracker: https://github.com/apache/cloudberry/issues
- Mailing list: https://lists.apache.org/list.html?dev@cloudberry.apache.org
- Slack workspace: https://join.slack.com/t/asf-cloudberry/shared_invite/zt-3um34r7hf-Sh~6jG6hVxlQJo1tbhK2sw
- Discord server: [Join our Discord server](https://discord.gg/GJrz3Fxf6y)
