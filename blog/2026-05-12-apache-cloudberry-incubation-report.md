---
slug: apache-cloudberry-incubation-report-202605
title: "Apache Cloudberry Incubation Report - May 2026"
description: "We’re making steady progress to grow!"
authors: [asfcloudberry]
tags: [Incubation]
image: /img/blog/apache-cloudberry-incubation-report.png
---

:::note

This Cloudberry incubation report summarizes our major progress from February 2026 to April 2026. It is adapted from the [Apache Incubator Report May 2026](https://cwiki.apache.org/confluence/display/INCUBATOR/May2026#cloudberry), with some modifications for readability.

:::

<!-- truncate -->

## Cloudberry 

Cloudberry is an advanced and mature open-source Massively Parallel Processing (MPP) database, derived from the open-source version of Pivotal Greenplum Database®️ but built on a more modern PostgreSQL 14 kernel, whereas Greenplum is based on PostgreSQL 12. This upgrade brings enhanced enterprise capabilities, making Cloudberry well-suited for data warehousing, large-scale analytics, and AI/ML workloads.

Cloudberry has been incubating since 2024-10-11.

### Three most important unfinished issues to address before graduating:

   1. Grow the contributor and community to ensure long-term sustainability.
   2. Publish a few more Apache releases following the ASF release processes.

### How has the community developed since the last report?

  - The community continued the Apache Cloudberry bi-weekly community meeting, holding five public meetings from February to April 2026. These meetings covered release coordination, kernel upgrades, ecosystem projects, testing strategy, events, and open community topics.
  - New Committers: Xiaoyu Liu (@misterRaindrop), Nikolay Antonov (@ostinru), Robert Mu (@robertmu)
  - New PPMC Member: Leonid Borchuk
  - Community channels:
    - Created a new Slack workspace and a new Discord server after the previous Slack workspace became unavailable.
    - Updated the website and planned updates across related repositories to point users to the current communication channels.
  - Governance and community process:
    - Started discussion on an AI conduct policy to guide responsible use of LLM tools while following ASF copyright and attribution expectations.
    - Added a website page documenting how to invite new PPMC members.
  - Events and outreach:
    - Community Over Code Asia 2026: around 11 Cloudberry-related proposals, now waiting for the review results. Plan to organize one in-person community gathering in Beijing during the conference.
    - A Cloudberry meetup was organized in Moscow, with public recordings and a Russian Habr article bringing more user feedback to the community.
    - Two community members were confirmed as PGConf.dev 2026 speakers.
  - New contributors appeared in community discussions and PRs, including contributions around Cloudberry Backup, PXF, and core repository features.

### How has the project developed since the last report?

  - Released Apache Cloudberry (Incubating) 2.1.0 in April 2026, the project's second Apache release after entering the ASF Incubator. Convenience RPM/DEB packages and binary packages were provided for the first time. Manual packages were made for 2.1.0, and automation is being considered for 2.2.0.
  - PostgreSQL kernel upgrade:
    - Started the PostgreSQL 14.x minor-version upgrade work for the 2.x release branch. The branch progressed from PostgreSQL 14.4 through 14.8, with later 14.x updates being tracked in the project Kanban.
    - Continued the PostgreSQL 16 kernel upgrade on the work development branch. This work is expected to be completed by the end of Q2 2026.
    - Fixed PostgreSQL upstream CVEs and security-related patches, including libpq SSL/GSS negotiation error handling.
  - Core project improvements:
    - Merged the diskquota extension into the main repository.
    - Added the gp_stats_collector extension, improving observability and laying groundwork for dashboard related work.
    - Added AQUMV exact-match support for multi-table JOIN queries.
    - Started discussion on an Iceberg subsystem for `datalake_fdw`.
  - CI, testing, and platform support:
    - Added Ubuntu 24.04 Docker image and test matrix support.
    - Continued Rocky Linux 10 support work, with initial build docker images. The related test matrix support is to be added.
    - Started discussion on rethinking the testing strategy for better test efficiency and coverage.
    - Upgraded Go to 1.24 in Cloudberry development images and related ecosystem repositories. Newer Go version support is in the discussion.
    - Started adding Behave tests for gpMgmt tools (WIP).
  - Ecosystem and sub-repositories:
    - `cloudberry-pxf`:
      - Started a roadmap discussion for the PXF project.
      - Released 2.1.0, the first Apache release for PXF.
      - Renamed Java packages from `org.greenplum` to `org.apache.cloudberry` and updated ASF compliance files.
      - Added Java 17 support and Rocky Linux 9 CI support.
      - Removed `gradle-wrapper.jar` from source release artifacts and download/verify it during build for ASF license compliance.
      - Added or improved JDBC tests using Testcontainers for ClickHouse, MS SQL, and Oracle.
      - Upgraded dependencies including Apache AVRO, Apache ORC, Parquet, and HBase related components, and discussed Java 21 support.
    - `cloudberry-backup`:
      - Released 2.1.0, the first Apache release for gpbackup.
      - Completed migration work from legacy Concourse CI to GitHub Actions.
      - Added ASF release script support and Cloudberry 2.1 compatibility.
      - Started a roadmap discussion for the backup project.
      - Merged gpbackman-related backup management work. The Prometheus exporter for the gpbackup history database work is in the review process.
    - `cloudberry-go-libs`:
      - Tracked a security issue and dependency update needed by related backup tooling.
    - Apache MADlib:
      - Continued collaboration with Apache MADlib to add Apache Cloudberry support upstream, with community discussion ongoing. See: https://s.apache.org/bsu9m
  - Next release: Started early discussion for Apache Cloudberry 2.2.0, including release manager, release process documentation, packaging automation, and testing strategy.

### How would you assess the podling's maturity?

  - [ ] Initial setup
  - [ ] Working towards first release
  - [X] Community building
  - [ ] Nearing graduation
  - [ ] Other:

### Date of last release:

  - April 14, 2026 - Apache Cloudberry (Incubating) 2.1.0

### When were the last committers or PPMC members elected?

  - March 24, 2026 - Xiaoyu Liu (@misterRaindrop), Nikolay Antonov (@ostinru), Robert Mu (@robertmu) were announced as new committers.
  - April 07, 2026 - Leonid Borchuk was announced as a new PPMC member.

---

## Join Us

Apache Cloudberry follows the principle of open and transparent governance. You can follow our [quarterly incubation reports](https://whimsy.apache.org/board/minutes/Cloudberry.html) to stay updated on key community events and project progress.

Get involved with the community:

* **GitHub**: [github.com/apache/cloudberry](https://github.com/apache/cloudberry)
* **Slack**: [Join our Slack workspace](https://join.slack.com/t/asf-cloudberry/shared_invite/zt-3um34r7hf-Sh~6jG6hVxlQJo1tbhK2sw)
* **Discord**: [Join our Discord server](https://discord.gg/GJrz3Fxf6y)
* **Mailing Lists**: [lists.apache.org/list.html?dev@cloudberry.apache.org](https://lists.apache.org/list.html?dev@cloudberry.apache.org)
* **Website**: [cloudberry.apache.org](https://cloudberry.apache.org)
