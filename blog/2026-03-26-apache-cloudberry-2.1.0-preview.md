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

## Apache Cloudberry Core (`apache/cloudberry`)

The core repository in 2.1.0 includes both user-facing improvements and behind-the-scenes engineering work.

It is important to emphasize that 2.1.0 is built on a **stable branch**. The community is currently undertaking an effort to upgrade the underlying PostgreSQL core from version 14.4 to the latest 14.22. This approach ensures that the database receives essential kernel updates while maintaining strict stability. While 2.1.0 does not include the entirety of this massive upgrade, these updates will be included in the future 2.x release.

### Selected kernel and performance updates

- **UDP2 interconnect:** 2.1.0 adds a new UDP2 interconnect protocol implementation, continuing work on the interconnect layer and distributed execution path.
- **MCP server:** The release candidate adds an MCP server for Cloudberry, making it easier to connect Cloudberry with LLM-based tools and workflows.
- **PAX improvements:** PAX gains support for `LZ4` compression for table columns, along with I/O and memory-management refinements.
- **Fast `ANALYZE` for AO tables:** The release candidate introduces fast `ANALYZE` for append-optimized tables, targeting a common operational pain point for large analytical workloads.
- **ORCA optimizer work:** 2.1.0 includes a series of ORCA improvements such as CTE pruning, partial aggregate pushdown below joins, and multiple correctness and memory-leak fixes.
- **Runtime filter pushdown:** Runtime filter pushdown work continues in this cycle, including support for pushing filters down to Table AM and related fixes.

### Developer workflow and release engineering

- **Release-branch testing and ASF checks:** The project added binary swap testing for the `REL_2_STABLE` branch and expanded Apache RAT-related audit checks in CI.
- **Sandbox and developer tooling:** The earlier `apache/cloudberry-devops-release` and `apache/cloudberry-bootcamp` work has been integrated into the main repository under `devops`, and the sandbox gains a local mode for development and validation.
- **Environment naming transition:** In 2.1, the environment setup has completed the move from `greenplum_path.sh` to `cloudberry-env.sh`. For background on that transition, see [Goodbye `greenplum_path.sh`, Hello `cloudberry-env.sh`: A Phased Transition Plan](https://cloudberry.apache.org/blog/from-greenplum-path.sh-to-cloudberry-env.sh).
- **Compression and dependency cleanup:** The codebase also removes support for QuickLZ, encouraging the use of maintained alternatives such as `zlib` or `zstd`.

There are many other fixes in areas such as hot standby, disaster recovery, utilities, CI portability, and testing. For a broader view of the current release candidate, see the [core branch comparison](https://github.com/apache/cloudberry/compare/2.0.0-incubating...2.1.0-incubating-rc2).

## Apache Cloudberry PXF (`apache/cloudberry-pxf`)

Apache Cloudberry PXF is one of the clearest examples of ecosystem modernization in the 2.1.0 cycle.

First, the codebase has been realigned with the archived `greenplum/pxf-archive` baseline, and Cloudberry-specific support has been ported onto that newer base for Cloudberry 2.1. The repository also received ASF-oriented cleanup, including updates to `DISCLAIMER`, `LICENSE`, and `NOTICE`, as well as removal of the pre-bundled `gradle-wrapper.jar`.

Second, the project has refreshed its engineering workflow. Legacy Concourse CI files have been removed in favor of a refactored and robust CI layout oriented around current Cloudberry development and testing.

Third, 2.1.0 continues the broader Cloudberry branding refresh. Java package declarations move from `org.greenplum` to `org.apache.cloudberry`, and the Go library dependency references are updated to `apache/cloudberry-go-libs`.

PXF also includes a substantial set of dependency and connector updates in this cycle:

- Apache Avro is updated to newer Java 8 compatible versions, with added `zstd` support in tests and related automation.
- Apache ORC is updated to `1.7.11`.
- Parquet is updated first to `1.12.3` and later to `1.15.2`, adding support such as `ZSTD`, `LZ4_RAW`, and vectored I/O improvements.
- HBase client support is updated from `1.3.2` to `2.3.7`.

For more detail, see the [PXF branch comparison](https://github.com/apache/cloudberry-pxf/compare/1.6.0...2.1.0-incubating-rc2).

## Apache Cloudberry Backup (`apache/cloudberry-backup`)

Apache Cloudberry Backup also sees significant repository and tooling work in the current 2.1.0 release candidate.

The project has been renamed from `cloudberry-gpbackup` to `cloudberry-backup`, and its codebase has been aligned with the archived `greenplum/gpbackup-archive` baseline while preserving Cloudberry-specific adaptation for Cloudberry 2.1. Dependency references have also been updated from `gp-common-go-libs` to `apache/cloudberry-go-libs`.

One practical usability change is that the archived `gpbackup-s3-plugin` has been merged into the main repository under `plugins/s3plugin`, reducing the amount of separate setup required for S3-based backup workflows.

The repository also continues the project's ASF-oriented cleanup work, including updates to LICENSE and NOTICE files, removal of legacy files, and modernization of CI coverage for unit, integration, end-to-end, S3 plugin, and scale-related testing.

For the complete set of changes in the current release candidate, see the [Backup branch comparison](https://github.com/apache/cloudberry-backup/compare/1.6.0...2.1.0-incubating-rc2).

## Looking Ahead

Even before the 2.1.0 vote is complete, the current release candidate already shows the project's direction clearly: continued kernel work in the main database, modernization of surrounding components, and a cleaner foundation for future community development.

If the release is approved, the project will share the official release announcement and related materials through the website and community channels. Until then, this post should be read as a preview of the current release candidate rather than the final release notes.

We welcome everyone to continue following and participating in the Apache Cloudberry community to witness the 2.1.0 release:

- Visit our website: https://cloudberry.apache.org
- Follow us on GitHub: https://github.com/apache/cloudberry
- Join our Slack workspace: https://join.slack.com/t/asf-cloudberry/shared_invite/zt-3um34r7hf-Sh~6jG6hVxlQJo1tbhK2sw
- Subscribe to the mailing lists: https://cloudberry.apache.org/community/mailing-lists
