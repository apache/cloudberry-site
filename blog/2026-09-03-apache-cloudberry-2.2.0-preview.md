---
slug: "apache-cloudberry-2.2.0-preview"
title: "Previewing Apache Cloudberry (Incubating) 2.2.0"
description: "A preview of key changes in the current Apache Cloudberry 2.2.0 release candidates across the core database, PXF, Backup, and the newly released Go libraries."
authors: [asfcloudberry]
tags: [Release]
image: /img/blog/202609-cloudberry2.2.png
---

:::note
Apache Cloudberry 2.2.0 has not been officially released yet. This post highlights several changes included in the current release candidates. Final contents may still change before the release is approved.
:::

Apache Cloudberry (Incubating) 2.2.0 is the widest release the project has cut so far. Alongside the core database, this cycle publishes coordinated releases of Apache Cloudberry PXF, Apache Cloudberry Backup, and, for the first time, Apache Cloudberry Go Libs.

- Core: [`apache/cloudberry`](https://github.com/apache/cloudberry)
- PXF: [`apache/cloudberry-pxf`](https://github.com/apache/cloudberry-pxf)
- Backup: [`apache/cloudberry-backup`](https://github.com/apache/cloudberry-backup)
- Go Libs: [`apache/cloudberry-go-libs`](https://github.com/apache/cloudberry-go-libs)

This article is a preview rather than an official release announcement, so it focuses on the changes users and developers are most likely to notice instead of a complete changelog.

## Apache Cloudberry Core (`apache/cloudberry`)

### The PostgreSQL kernel is moving again: 14.4 to 14.9

The single most consequential change in 2.2.0 is not a feature. It is a change in posture.

Greenplum froze its PostgreSQL base and stayed there. Cloudberry has decided not to. The project now actively tracks upstream PostgreSQL 14 minor releases and absorbs the optimizations, fixes, and hardening that come with them. The kernel underneath Cloudberry has moved from PostgreSQL 14.4 to 14.9 in this release, and the work continues one minor version at a time until PostgreSQL 14 reaches the end of its upstream life.

The security payoff is immediate. Commits in this cycle reference more than forty distinct CVE identifiers, covering the upstream fixes shipped in PostgreSQL 14.5 through 14.9 as well as several recent advisories cherry-picked ahead of the merge.

This is an ongoing, reviewable effort rather than a one-time jump. If you want to help, the tracking board is open: https://github.com/orgs/apache/projects/572

Special thanks to our Cloudberry PPMC member [@reshke](https://github.com/reshke) for the sustained effort that made this possible.

### Six new extensions

2.2.0 significantly expands what ships in the tree. Several extensions have been introduced by community members, adapted for PostgreSQL 14 and Cloudberry.

- **`diskquota`** (`gpcontrib/diskquota`) enforces disk usage limits on database objects. It supports quota limits per schema and per role within a database, implemented as a soft limit: a query targeting an over-quota schema or role is rejected before it starts, and a query that crosses the limit while running is cancelled. This is a legacy extension from the official Greenplum Database project, distributed under the PostgreSQL license, now brought forward to PostgreSQL 14 and Cloudberry. Enable it at build time with `--with-diskquota`.

  ```sql
  SELECT diskquota.set_schema_quota('s1', '1 MB');
  SELECT diskquota.set_role_quota('u1', '1 MB');
  ```

- **`gp_stats_collector`** (`gpcontrib/gp_stats_collector`) collects query execution metrics and reports them to an external agent over a Unix domain socket. It captures the query lifecycle, `EXPLAIN` and `EXPLAIN ANALYZE` output, and instrument, system, network, interconnect, and spill metrics, all governed by `gpsc.*` GUCs. This is the extension the forthcoming Cloudberry Command Center consumes. Enable it with `--with-gp-stats-collector`.

- **`gp_relsizes_stats`** (`gpcontrib/gp_relsizes_stats`) calculates and stores statistics on file and table sizes and on space occupied on coordinator and segment host disks. A background worker collects on a configurable schedule, with per-database and per-file nap times so the load can be spread over time. It is built and installed by default.

- **`reject_partition_fullscan`** (`gpcontrib/reject_partition_fullscan`) rejects queries against partitioned tables that prune no partitions, which is a common way for a missing `WHERE` clause on the partition key to turn into a very expensive query. Two user-settable GUCs control it: `reject_partition_fullscan` and `partition_fullscan_threshold`. Both the PostgreSQL planner and ORCA dynamic scan paths are handled. It is built and installed by default; load it through `shared_preload_libraries` or `LOAD` to activate the planner hook.

- **`try_convert`** (`contrib/try_convert`) adds error-safe type casts, in the spirit of SQL Server's `TRY_CAST`. A failed cast returns a default value instead of aborting the statement. Casting from `hstore` and `citext` is supported via `add_type_for_try_convert()`. It is built and installed by default.

  ```sql
  SELECT try_convert('42d'::text, 1234::int2);  -- returns 1234
  ```

- **`yezzey`** (`gpcontrib/yezzey`) is included as a submodule at version 1.8.11, and offloads AO/AOCO table data to S3-compatible object storage for tiered storage workloads. Enable it with `--with-yezzey`.

### Query processing and observability

- **Intra-segment parallel table scan in ORCA.** ORCA can now generate worker-level parallel scans within a segment, with parallel-safety checks, cost model integration, and DXL serialization. Worker count follows `max_parallel_workers_per_gather`.
- **Parallel Hash Full Join and Right Join.** Two join shapes that previously fell back to serial hash joins can now run in parallel.
- **Interconnect statistics views.** A new `interconnect` extension exposes cumulative counters from the UDPIFC interconnect protocol through three views: `gp_interconnect_stats` for the whole cluster, `gp_interconnect_stats_per_segment`, and `gp_interconnect_stats_per_host`. This makes interconnect behaviour observable with plain SQL rather than log scraping.
- **AQUMV for multi-table joins.** Answer-Query-Using-Materialized-Views now supports exact matches for multi-table join queries.
- **New optimizer knob.** `optimizer_use_streaming_hashagg` lets you control ORCA's use of streaming hash aggregation.

Beyond these, the cycle carries a long list of correctness fixes in ORCA, PAX storage, append-optimized vacuum, the UDP interconnect, `pg_dump` and `pg_dumpall` upgrade paths from Greenplum 5, 6, and 7, and cluster utilities such as `gpexpand`.

### Platform coverage, packaging, and developer experience

Release engineering received as much attention as the kernel this cycle.

- **Three more operating systems in CI.** On top of Rocky Linux 9 and Ubuntu 22.04, the project now builds and tests on Rocky Linux 8, Rocky Linux 10, and Ubuntu 24.04. New development images are published as `apache/incubator-cloudberry:cbdb-build-rocky8-latest`, `apache/incubator-cloudberry:cbdb-build-rocky10-latest`, and `apache/incubator-cloudberry:cbdb-build-ubuntu24.04-latest`.
- **Two workflows instead of many.** The per-OS test workflows have been consolidated into one matrix-driven Rocky Linux workflow and one matrix-driven Ubuntu workflow. Adding the next OS version is now a matrix entry rather than a new file, and every day-to-day change is validated across all supported versions.
- **Automated DEB and RPM builds.** A convenience package workflow lets the release manager produce packages for x86_64 and ARM64 across the supported operating systems, starting from a verified ASF source release tarball with signature and checksum validation built in.
- **Relocatable RPMs with major-version coexistence.** RPM packages can now be installed to a custom location with `rpm --prefix`, and the package name carries the major version, so multiple Cloudberry major versions can live side by side under one prefix.
- **Smoother Python build dependencies.** Build-time Python packages are no longer fetched unpredictably mid-build. You can pre-stage them ahead of time:

  ```bash
  make -C gpMgmt/bin download-python-deps
  ```

  The target downloads the `psutil`, `PyYAML`, and `PyGreSQL` source packages, skips anything already present, and installs `wheel` and `cython` only when they are missing, falling back to `--break-system-packages` on distributions with externally managed Python environments such as Ubuntu 24.04.
- **macOS build portability.** A series of fixes to PAX, the UDP interconnect, and shared-library linking make the source tree considerably friendlier to build on macOS for local development.

For the full picture, see the [core branch comparison](https://github.com/apache/cloudberry/compare/2.1.0-incubating...2.2.0-incubating-rc1).

## Apache Cloudberry PXF (`apache/cloudberry-pxf`)

### See and control what PXF is doing

The headline addition is observability that DBAs have wanted for years. `pxf_stat_activity` shows what is running inside the PXF server, one row per active operation, with segment id, session id, command count, transaction id, operation, user, server, profile, schema, table, data source, and start time. Two companion functions, `pxf_cancel_backend` and `pxf_interrupt_backend`, let you stop a runaway external-table query without restarting PXF.

```sql
SELECT * FROM pxf_stat_activity;
```

Server-side logging is easier to correlate too: `gp_session_id` and `gp_command_count` are now added to the logging MDC, so PXF log lines can be tied back to the Cloudberry session that produced them.

### Java, toolchain, and dependencies

- **Java 17 is supported**, with Gradle upgraded to 8.14.4. Java 21 works experimentally in this release and becomes officially supported in PXF 3.0. The compilation baseline remains Java 8.
- **Go toolchain moved to 1.25** for the PXF CLI.
- **Log4j is at 2.25.4** and **HBase at 2.5.15**. Note that HBase support is planned for removal in PXF 3.0.
- Other dependencies including `golang.org/x/crypto` and `tomcat-embed-core` were refreshed to clear security advisories.

The PXF 3.0 direction, including the Java 21 baseline and the HBase removal, is tracked publicly in [cloudberry-pxf#131](https://github.com/apache/cloudberry-pxf/issues/131).

### Testing and connectors

Connector testing has expanded substantially, with Testcontainers-based suites now covering ClickHouse, Oracle, and Microsoft SQL Server over JDBC, plus S3. CI gained Rocky Linux 9 and Rocky Linux 10 environments, and a convenience package build workflow now produces PXF packages the same way the core project does.

There are functional gains as well: Parquet UUID types can be read and written, and filter pushdown now works for numeric columns compared against integer constants.

Finally, **PXF documentation has moved to the Cloudberry website** and is now browsable at https://cloudberry.apache.org/pxf/

For more detail, see the [PXF branch comparison](https://github.com/apache/cloudberry-pxf/compare/2.1.0-incubating...2.2.0-incubating-rc1).

## Apache Cloudberry Backup (`apache/cloudberry-backup`)

Two new commands ship in 2.2.0.

**`gpbackman`** manages the backups that `gpbackup` creates, working directly against the `gpbackup_history.db` SQLite history database. It can display backup information and reports, delete a specific backup or every backup older than a time condition, from local storage or through storage plugins, clean deleted backups out of the history database, and synchronize the cluster history database to the standby coordinator either manually or automatically after a deletion. This release also adds database filters to its commands.

**`gpbackup_exporter`** is a Prometheus exporter for the same history database. It exposes backup status, deletion status, backup metadata, backup duration, and seconds since the last completed backup, listening on port 19854 by default with optional TLS and authentication.

```bash
./gpbackup_exporter --collect.interval=600
```

Other changes worth knowing about:

- The `gpbackup` history database is now synchronized with the standby coordinator.
- `gprestore --resize-cluster` no longer fails when `--jobs` is greater than 1.
- The column permissions query during backup is faster.
- The Go toolchain moved to 1.25.
- A portable binary package workflow lets the release manager produce x86_64 and ARM64 packages quickly.

For the complete set of changes, see the [Backup branch comparison](https://github.com/apache/cloudberry-backup/compare/2.1.0-incubating...2.2.0-incubating-rc1).

## Apache Cloudberry Go Libs (`apache/cloudberry-go-libs`)

This is the first release of `cloudberry-go-libs` as its own artifact. The motivation is downstream: components that depend on these libraries, WAL-G among them, need a released, versioned, ASF-compliant dependency rather than a moving branch.

The repository received the compliance work that an ASF release requires, its CI/CD was modernized onto GitHub Actions, the Go module path was renamed to `github.com/apache/cloudberry-go-libs`, and the PostgreSQL driver was migrated from `pgx` v4 to v5. Dependencies including `golang.org/x/crypto` and `golang.org/x/net` were upgraded to clear security advisories.

## Looking Ahead

If there is a theme to 2.2.0, it is that Cloudberry is behaving less like a fork and more like an upstream. The kernel tracks PostgreSQL again instead of standing still. Extensions that used to live in scattered forks now live in the tree with tests. The ecosystem components release together, on the same cadence, with the same packaging machinery. And the Go libraries are published so that projects outside Cloudberry can depend on them properly.

If the releases are approved, the project will share the official announcement and related materials through the website and community channels. Until then, please read this post as a preview of the current release candidates rather than final release notes.

We welcome everyone to continue following and participating in the Apache Cloudberry community to witness the 2.2.0 release:

- Visit our website: https://cloudberry.apache.org
- Follow us on GitHub: https://github.com/apache/cloudberry
- Join our Slack workspace: https://join.slack.com/t/asf-cloudberry/shared_invite/zt-3um34r7hf-Sh~6jG6hVxlQJo1tbhK2sw
- Subscribe to the mailing lists: https://cloudberry.apache.org/community/mailing-lists
