---
slug: "announce-apache-cloudberry-2.1.0"
title: "Apache Cloudberry (Incubating) 2.1.0 Released"
description: "Apache Cloudberry 2.1.0 brings kernel improvements, ecosystem modernization, and enhanced developer tooling."
authors: [asfcloudberry]
tags: [Release]
image: /img/blog/20260415-cloudberry2.1.png
---

:::note
See the official announcement on the [Apache Cloudberry Dev mailing list](https://lists.apache.org/thread/m8j6ss247v2cnlmsd5rhxcfmzssv202q).
:::

The Apache Cloudberry (Incubating) community is pleased to announce the release of Apache Cloudberry (Incubating) version 2.1.0.

Apache Cloudberry (Incubating) is a Massively Parallel Processing (MPP) database for large-scale data analytics, derived from PostgreSQL and the last open-source version of Greenplum Database. It is designed to support both on-premise and cloud deployments, providing a scalable foundation for data warehousing and advanced analytics.

This release covers the main Cloudberry project and the two components cloudberry-backup and cloudberry-pxf.

We'd like to express our gratitude to all contributors to this release, as well as to the mentors and the Apache Incubator community for their invaluable support. This release continues the project's work on database kernel improvements, ecosystem modernization, and ASF-oriented release engineering.

## Release highlights

Apache Cloudberry 2.1.0 includes significant updates across the core database, Apache Cloudberry PXF, and Apache Cloudberry Backup:

- **UDP2 interconnect:** New UDP2 interconnect protocol implementation for improved distributed execution
- **MCP server:** Added MCP server support for easier integration with LLM-based tools and workflows
- **PAX enhancements:** LZ4 compression support for table columns with I/O and memory-management refinements
- **Fast ANALYZE for AO tables:** Introduced fast ANALYZE for append-optimized tables, addressing a common operational pain point
- **ORCA optimizer improvements:** CTE pruning, partial aggregate pushdown below joins, and multiple correctness and memory-leak fixes
- **Environment naming transition:** Completed migration from `greenplum_path.sh` to `cloudberry-env.sh`
- **PXF ecosystem modernization:** Realigned codebase with `greenplum/pxf-archive` baseline, updated Java packages to `org.apache.cloudberry`, and refreshed dependencies
- **Backup tooling updates:** Renamed to `cloudberry-backup` and merged S3 plugin into main repository

For more highlights, see the [Apache Cloudberry 2.1.0 preview blog post](/blog/apache-cloudberry-2.1.0-preview) and the [changelog](/releases/2.1.0-incubating).

## Download

- Download the release: https://cloudberry.apache.org/releases
- Changelog for 2.1.0: https://cloudberry.apache.org/releases/2.1.0-incubating
- For documentation, visit: https://cloudberry.apache.org/docs/

## Contributors team

We would like to thank all contributors who made this release possible:

> **cloudberry:** @tuhaihe, @gfphoenix78, @hanwei, @yjhjstz, @andr-sokolov, @reshke, @leborchuk, @zhangyue1818, @water32, @NJrslv, @lss602726449, @zhan7236, @oracleloyall, @edespino, @antoniopetrole, @liang8283, @RyanWei, @ginobiliwang, @kongfanshen, @zhangwenchao-123, @avamingli, @weinan003, @王平10304955, @gongxun0928, @yangs16, @Smyatkin-Maxim, @smartyhero, @HuSen8891, @jiaqizho, @付与龙10336563, @fanfuxiaoran, @yihong0618, @roseduan, @Xue-Bin Cong
>
> **cloudberry-pxf:** @ostinru, @MisterRaindrop, @Mulily0513, @edespino, @tuhaihe, @my-ship-it, @weinan003, @Terry1504, @gfphoenix78
>
> **cloudberry-backup:** @robertmu, @tuhaihe, @my-ship-it, @jiaqizho

## Join us

We are eager to expand our community and extend an invitation to new contributors. We genuinely welcome the opportunity to collaborate with individuals who share our passion and expertise.

- Website: https://cloudberry.apache.org
- Repository: https://github.com/apache/cloudberry
- Discussions: https://github.com/apache/cloudberry/discussions
- Issue tracker: https://github.com/apache/cloudberry/issues
- Mailing list: https://lists.apache.org/list.html?dev@cloudberry.apache.org
- Slack channel: https://join.slack.com/t/asf-cloudberry/shared_invite/zt-3um34r7hf-Sh~6jG6hVxlQJo1tbhK2sw
- Discord server: https://discord.com/invite/GJrz3Fxf6y


:::note
Disclaimer:
Apache Cloudberry is an effort undergoing incubation at the Apache Software Foundation (ASF), sponsored by the Apache Incubator PMC. Incubation is required of all newly accepted projects until a review by the Incubator PMC demonstrates that the project has met the ASF's requirements for community and process. While incubation status is not necessarily a reflection of the project's stability or readiness for production, it does indicate that the project is working towards compliance with ASF processes and governance.
:::
