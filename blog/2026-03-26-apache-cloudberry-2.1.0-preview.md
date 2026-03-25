---
slug: "apache-cloudberry-2.1.0-preview"
title: "Previewing Apache Cloudberry (Incubating) 2.1.0"
description: "A preview of key changes in the current Apache Cloudberry 2.1.0 release candidate across the core database, PXF, and backup tooling."
authors: [asfcloudberry]
tags: [Release]
image: /img/blog/202603-cloudberry2.1.png
---

:::note
Apache Cloudberry 2.1.0 is currently under community vote and has not been officially released yet. This post highlights several changes included in the current release candidate. Final contents may still change before the release is approved.
:::

Apache Cloudberry (Incubating) 2.1.0 continues the project's work on database kernel improvements, ecosystem modernization, and ASF-oriented release engineering. Based on the current release candidate, this upcoming version includes changes across the core database, Apache Cloudberry PXF, and Apache Cloudberry Backup.

This article is a preview rather than an official release announcement, so it focuses on a few representative updates instead of a complete changelog.

## Apache Cloudberry Core

The core repository in 2.1.0 includes both user-facing improvements and behind-the-scenes engineering work.

### Selected kernel and performance updates

- **UDP2 interconnect:** 2.1.0 adds a new UDP2 interconnect protocol implementation, continuing work on the interconnect layer and distributed execution path.
- **MCP server:** The release candidate adds an MCP server for Cloudberry, making it easier to connect Cloudberry with LLM-based tools and workflows.
- **PAX improvements:** PAX gains support for `LZ4` compression for table columns, along with I/O and memory-management refinements.
- **Fast `ANALYZE` for AO tables:** The release candidate introduces fast `ANALYZE` for append-optimized tables, targeting a common operational pain point for large analytical workloads.
- **ORCA optimizer work:** 2.1.0 includes a series of ORCA improvements such as CTE pruning, partial aggregate pushdown below joins, support for hash window aggregation in the vectorized executor, and multiple correctness and memory-leak fixes.
- **Runtime filter pushdown:** Runtime filter pushdown work continues in this cycle, including support for pushing filters down to Table AM and related fixes.

### Developer workflow and release engineering

- **Release-branch testing and ASF checks:** The project added binary swap testing for the `REL_2_STABLE` branch and expanded Apache RAT-related checks in CI.
- **Sandbox and developer tooling:** The earlier `cloudberry-devops-release` and `cloudberry-bootcamp` work has been brought into the main repository under `devops`, and the sandbox gains a local mode for development and validation.
- **Environment naming transition:** In 2.1, the environment setup has completed the move from `greenplum_path.sh` to `cloudberry-env.sh`. For background on that transition, see [Goodbye `greenplum_path.sh`, Hello `cloudberry-env.sh`: A Phased Transition Plan](https://cloudberry.apache.org/blog/from-greenplum-path.sh-to-cloudberry-env.sh).
- **Compression and dependency cleanup:** The codebase also removes support for QuickLZ, encouraging the use of maintained alternatives such as `zlib` or `zstd`.

There are many other fixes in areas such as hot standby, disaster recovery, utilities, CI portability, and testing. For a broader view of the current release candidate, see the [core branch comparison](https://github.com/apache/cloudberry/compare/2.0.0-incubating...2.1.0-incubating-rc2).

## Apache Cloudberry PXF

Apache Cloudberry PXF is one of the clearest examples of ecosystem modernization in the 2.1.0 cycle.

First, the codebase has been realigned with the archived `greenplum/pxf-archive` baseline, and Cloudberry-specific support has been ported onto that newer base for Cloudberry 2.1. The repository also received ASF-oriented cleanup, including updates to `DISCLAIMER`, `LICENSE`, and `NOTICE`, as well as removal of the pre-bundled `gradle-wrapper.jar`.

Second, the project has refreshed its engineering workflow. Legacy Concourse CI files have been removed in favor of a cleaner CI layout oriented around current Cloudberry development and testing.

Third, 2.1.0 continues the broader Cloudberry naming transition. Java package declarations move from `org.greenplum` to `org.apache.cloudberry`, and the Go library dependency references are updated to `apache/cloudberry-go-libs`.

PXF also includes a substantial set of dependency and connector updates in this cycle:

- Apache Avro is updated to newer Java 8 compatible versions, with added `zstd` support in tests and related automation.
- Apache ORC is updated to `1.7.11`.
- Parquet is updated first to `1.12.3` and later to `1.15.2`, adding support such as `ZSTD`, `LZ4_RAW`, and vectored I/O improvements.
- HBase client support is updated from `1.3.2` to `2.3.7`.

For more detail, see the [PXF branch comparison](https://github.com/apache/cloudberry-pxf/compare/1.6.0...2.1.0-incubating-rc2).

## Apache Cloudberry Backup

Apache Cloudberry Backup also sees significant repository and tooling work in the current 2.1.0 release candidate.

The project has been renamed from `cloudberry-gpbackup` to `cloudberry-backup`, and its codebase has been aligned with the archived `greenplum/gpbackup-archive` baseline while preserving Cloudberry-specific adaptation for Cloudberry 2.1. Dependency references have also been updated from `gp-common-go-libs` to `apache/cloudberry-go-libs`.

One practical usability change is that the archived `gpbackup-s3-plugin` has been merged into the main repository under `plugins/s3plugin`, reducing the amount of separate setup required for S3-based backup workflows.

The repository also continues the project's ASF-oriented cleanup work, including updates to core licensing and notice files, removal of legacy files, and modernization of CI coverage for unit, integration, end-to-end, S3 plugin, and scale-related testing.

For the complete set of changes in the current release candidate, see the [Backup branch comparison](https://github.com/apache/cloudberry-backup/compare/1.6.0...2.1.0-incubating-rc2).

## Looking Ahead

Even before the 2.1.0 vote is complete, the current release candidate already shows the project's direction clearly: continued kernel work in the main database, modernization of surrounding components, and a cleaner foundation for future community development.

If the release is approved, the project will share the official release announcement and related materials through the website and community channels. Until then, this post should be read as a preview of the current release candidate rather than the final release notes.
