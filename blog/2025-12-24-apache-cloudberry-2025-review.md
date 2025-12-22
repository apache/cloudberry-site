---
slug: apache-cloudberry-2025-review
title: "Apache Cloudberry 2025 Review: A Year of Progress in the Apache Incubator"
description: "A year of milestones: First Apache release, growing community, and technical breakthroughs."
authors: [asfcloudberry]
tags: [Incubation]
image: /img/blog/apache-cloudberry-2025-review.png
---

2025 has been a defining year for Apache Cloudberry (Incubating).
Over the past twelve months, the project and its community have made steady and meaningful progress across releases, governance, infrastructure, and ecosystem growth.

This post looks back at the key milestones of Apache Cloudberry in 2025 and reflects on how the project has evolved since entering the Apache Incubator.

## From Proposal to Incubation

Apache Cloudberry officially entered the Apache Incubator in October 2024.
Following the successful vote, the project completed the migration of its source code repositories and infrastructure to the Apache Software Foundation in November 2024.

This initial phase focused on establishing a solid foundation under the ASF:

* Migrating repositories and CI infrastructure
* Completing project renaming and branding updates
* Aligning documentation and workflows with ASF policies
* Starting systematic code cleanup and compliance work
* Gathering broad community feedback and discussing the roadmap in depth

These efforts set the stage for sustained development and growth throughout 2025.

## First Apache Release: Cloudberry 2.0.0 (Incubating)

One of the most important milestones in 2025 was the release of Apache Cloudberry (Incubating) 2.0.0 in August 2025 — the project's first official Apache release.

Leading up to this release, the community completed several major efforts:

* Cherry-picking and consolidating large portions of the archived Greenplum open-source codebase
* Completing ASF license and compliance requirements (LICENSE, NOTICE, RAT audits)
* Cleaning up legacy files and restructuring the repository
* Building a new, Apache-compliant CI/CD workflow
* Running multiple release candidate (RC) rounds and addressing review feedback from the Incubator community

A major highlight of this release cycle was the introduction of the PAX (Partition Attributes Across) storage engine, a row-column hybrid format that optimizes performance for mixed workloads—a significant innovation contributed back to the core.

The 2.0.0 release marked a major transition from incubation setup to regular, disciplined Apache-style releases.

For more details, see the [release announcement](/blog/announce-apache-cloudberry-2.0.0) and [What's New in Apache Cloudberry 2.0.0](/blog/whats-new-in-apache-cloudberry-2.0.0).

## Community Growth

Community is the heartbeat of any Apache project, and 2025 saw the Cloudberry family grow stronger and more diverse.

During the year, the Cloudberry Podling Project Management Committee (PPMC) was proud to welcome four new committers:

* [Xiong Tong](/blog/welcoming-xiongtong-as-a-new-apache-cloudberry-committer)
* [Wenchao Zhang](/blog/welcoming-wenchaozhang-as-a-new-apache-cloudberry-committer)
* [Xun Gong](/blog/welcoming-xungong-as-a-new-apache-cloudberry-committer)
* [Leonid Borchuk](/blog/welcoming-leonid-borchuk-as-a-new-apache-cloudberry-committer)

Mailing list discussions, GitHub issues, and design conversations continued to be kept active, covering topics such as kernel upgrades, performance improvements, extensions, and ecosystem integration.

The project has also emphasized transparent governance, clear contribution guidelines, and mentoring new contributors as part of its incubation journey.

## Community Activities and Events

Apache Cloudberry community members were active across a wide range of global and regional events in 2025, including:

* PostgresConf Global 2025
* Flink Forward Asia 2025
* Community Over Code Asia 2025
* PostgreSQL and data community meetups in Asia, Europe, and North America

In addition to conference talks, the community members organized and participated in Apache Cloudberry Meetups in multiple cities, providing opportunities to share technical updates, discuss roadmap items, and introduce the Apache way to new users and contributors.

These activities helped increase the project's visibility and attracted new participants from the broader PostgreSQL and data ecosystem.

## PostgreSQL Kernel Upgrade: PG 14 → PG 16

In 2025, the project also initiated the PostgreSQL kernel upgrade, moving Apache Cloudberry from PostgreSQL 14.x toward PostgreSQL 16.x.

This effort represents a significant technical investment and includes:

* Merging the new PostgreSQL kernel into Cloudberry work branches
* Resolving conflicts introduced by Cloudberry's MPP architecture
* Incrementally restoring build, initialization, and test coverage
* Validating parallel execution and regression test suites

The kernel upgrade work remains ongoing, but important milestones — including successful cluster startup — were achieved during the year. This challenging effort is expected to be completed in early 2026.

If you're interested in contributing to this effort, check out the [kernel upgrade discussion on the mailing list](https://lists.apache.org/list.html?dev@cloudberry.apache.org) and the [GitHub Project board](https://github.com/orgs/apache/projects/497).

## Ecosystem and Integrations

The Apache Cloudberry ecosystem expanded significantly in 2025, driven by a "Upstream first" philosophy.

### Native Integrations

Several widely used tools now provide native support for Cloudberry, including:

* [DBeaver](https://dbeaver.io/): For seamless database management and SQL development.
* [WAL-G](https://github.com/wal-g/wal-g): Enabling robust disaster recovery and continuous archiving.
* [Apache SeaTunnel](https://seatunnel.apache.org/docs/2.3.12/connector-v2/source/Cloudberry): Facilitating high-performance data integration.
* [Flink JDBC Connector](https://github.com/apache/flink-connector-jdbc) (v3.3.0+): Supporting real-time streaming data ingestion.

### Community-Maintained Extensions

The community also maintains a set of adapted extensions for Cloudberry:

* [PostGIS for Cloudberry](https://github.com/cloudberry-contrib/postgis): Upgraded to PostGIS 3.3.2, unlocking advanced geospatial analytics capabilities.
* [kafka_fdw for Cloudberry](https://github.com/cloudberry-contrib/kafka_fdw): Enabling efficient real-time data processing from Kafka.
* [cbcopy](https://github.com/cloudberry-contrib/cbcopy): Supporting migration from Greenplum to Cloudberry.
* [ParadeDB for Cloudberry](https://github.com/cloudberry-contrib/paradedb): Enabling search and analytics workloads on Cloudberry.
* [pgvector for Cloudberry](https://github.com/cloudberry-contrib/pgvector): Upgraded to version 0.8, enabling similarity search capabilities.

### Cross-Project Collaboration

Work is actively underway to add native Apache Cloudberry support to Apache MADlib, strengthening Cloudberry's position in advanced analytics and machine learning workloads. This collaboration highlights the strength of the Apache ecosystem, where projects work together to deliver integrated solutions.

## Repository Consolidation

To streamline the developer experience, the community consolidated several sub-repositories: `cloudberry-gpbackup` was renamed to `cloudberry-backup`, and the [S3 plugin](https://github.com/apache/cloudberry-gpbackup-s3-plugin) was merged into the main backup repository. 

Furthermore, `apache/cloudberry-devops-release` and `apache/cloudberry-bootcamp` were integrated into the main Cloudberry repository under the [`devops/`](https://github.com/apache/cloudberry/tree/main/devops) and [`devops/sandbox`](https://github.com/apache/cloudberry/tree/main/devops/sandbox) directories, respectively.

## Looking Ahead

As 2025 comes to a close, Apache Cloudberry stands on a much stronger foundation than it did a year ago:

* A completed first Apache release
* A growing and more diverse contributor community
* Active participation in global open-source events
* Ongoing kernel modernization
* An expanding ecosystem of integrations

The project will continue focusing on community growth, regular Apache releases, technical stability, and progress toward graduation from the Apache Incubator.

We would like to thank all contributors, mentors, and community members who helped make 2025 a productive and rewarding year for Apache Cloudberry.

## Stay Connected

Apache Cloudberry follows the principle of open and transparent governance. You can follow our [quarterly incubation reports](https://whimsy.apache.org/board/minutes/Cloudberry.html) to stay updated on key community events and project progress.

Get involved with the community:

* **GitHub**: [github.com/apache/cloudberry](https://github.com/apache/cloudberry)
* **Slack**: [Join our Slack workspace](https://inviter.co/apache-cloudberry)
* **Mailing Lists**: [lists.apache.org/list.html?dev@cloudberry.apache.org](https://lists.apache.org/list.html?dev@cloudberry.apache.org)
* **Website**: [cloudberry.apache.org](https://cloudberry.apache.org)
