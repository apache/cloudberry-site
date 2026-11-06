---
slug: "announce-apache-cloudberry-2.2.0"
title: "Apache Cloudberry (Incubating) 2.2.0 Released"
description: "Apache Cloudberry 2.2.0 moves the kernel to PostgreSQL 14.10, adds six new extensions, broadens platform support, and ships coordinated releases of PXF, Backup, and Go Libs."
authors: [asfcloudberry]
tags: [Release]
image: /img/blog/20261106-cloudberry2.2-release.png
---

:::note
See the official announcement on the [Apache Cloudberry Dev mailing list](https://lists.apache.org/thread/k0dsc67f4sqjmn75df1226f6k2pv3n1c).
:::

The Apache Cloudberry (Incubating) community is pleased to announce the release of Apache Cloudberry (Incubating) version 2.2.0.

Apache Cloudberry (Incubating) is a Massively Parallel Processing (MPP) database for large-scale data analytics, derived from PostgreSQL and the last open-source version of Greenplum Database. It is designed to support both on-premise and cloud deployments, providing a scalable foundation for data warehousing and advanced analytics.

This release covers the main Cloudberry project and the components cloudberry-backup, cloudberry-pxf, and, for the first time, cloudberry-go-libs.

We'd like to express our gratitude to all contributors to this release, as well as to the mentors and the Apache Incubator community for their invaluable support. This release continues the project's work on tracking upstream PostgreSQL, expanding the extension ecosystem, and ASF-oriented release engineering.

## Release highlights

Apache Cloudberry 2.2.0 includes significant updates across the core database, Apache Cloudberry PXF, Apache Cloudberry Backup, and Apache Cloudberry Go Libs:

- **Tracking upstream PostgreSQL:** The kernel moves from PostgreSQL 14.4 to 14.10, absorbing upstream optimizations, fixes, and hardening one minor release at a time
- **Security fixes:** Dozens of upstream PostgreSQL CVE fixes, including targeted cherry-picks of advisories published after 14.10
- **Six new extensions:** `diskquota`, `gp_stats_collector`, `gp_relsizes_stats`, `reject_partition_fullscan`, `try_convert`, and `yezzey`
- **Query processing and observability:** Interconnect statistics views, intra-segment parallel table scan in ORCA, parallel Hash Full Join and Right Join, and AQUMV support for multi-table joins
- **Platform coverage:** Rocky Linux 8, 9, and 10 and Ubuntu 22.04 and 24.04 are supported and tested in CI; Ubuntu 20.04 is dropped
- **Packaging:** Automated DEB and RPM builds for x86_64 and ARM64, and relocatable RPMs that let multiple Cloudberry major versions coexist
- **PXF observability and toolchain:** `pxf_stat_activity` with `pxf_cancel_backend` and `pxf_interrupt_backend`, Java 17 support, and broader connector testing
- **Backup tooling:** New `gpbackman` command for managing backups and `gpbackup_exporter` for Prometheus monitoring
- **Go Libs:** First release of `cloudberry-go-libs` as a versioned, ASF-compliant artifact for downstream components

For more highlights, see the [Apache Cloudberry 2.2.0 preview blog post](/blog/apache-cloudberry-2.2.0-preview) and the [changelog](/releases/2.2.0-incubating).

## Download

- Download the release: https://cloudberry.apache.org/releases
- Changelog for 2.2.0: https://cloudberry.apache.org/releases/2.2.0-incubating
- For documentation, visit: https://cloudberry.apache.org/docs/

## Contributors team

We would like to thank all contributors who made this release possible:

> **cloudberry:** @leborchuk, @shaohuaxi, @tuhaihe, @Alena0704, @Smyatkin-Maxim, @fanfuxiaoran, @ZTE-EBASE, @MisterRaindrop, @krylosov-aa, @andr-sokolov, @yjhjstz, @fairyfar, @reshke, @congxuebin, @roaldm153, @Vlasdislav, @gongxun0928, @chenjinbao1989, @lqriu, @gfphoenix78, @avamingli, @lss602726449, @MutableFire, @my-ship-it, @zhangyue1818, @04cb, @ostinru, @AndrewOvvv, @x4m, @robozmey, @aviralgarg05, @woblerr, @jangjang0401, @Jaroslavian, @pjfanning
>
> **cloudberry-pxf:** @ostinru, @tuhaihe, @leborchuk, @MisterRaindrop, @Mulily0513
>
> **cloudberry-backup:** @tuhaihe, @woblerr, @talmacschen2022, @my-ship-it
>
> **cloudberry-go-libs:** @tuhaihe, @serprex, @robertmu, @gfphoenix78

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
