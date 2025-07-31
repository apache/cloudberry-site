---
slug: apache-cloudberry-incubation-report-202508
title: "Apache Cloudberry Incubation Report - August 2025"
description: "We’re making steady progress to grow!"
authors: [asfcloudberry]
tags: [Incubation]
image: /img/blog/apache-cloudberry-incubation-report.png
---

:::note

This Cloudberry incubation report summarizes our major progress during May and July 2025. It is adapted from the [Apache Incubator Report August 2025](https://cwiki.apache.org/confluence/display/INCUBATOR/August2025), with some modifications for readability.

:::

<!-- truncate -->

## Cloudberry 

Cloudberry is an advanced and mature open-source Massively Parallel Processing (MPP) database, derived from the open-source version of Pivotal Greenplum Database®️ but built on a more modern PostgreSQL 14 kernel, whereas Greenplum is based on PostgreSQL 12. This upgrade brings enhanced enterprise capabilities, making Cloudberry well-suited for data warehousing, large-scale analytics, and AI/ML workloads.

Cloudberry has been incubating since 2024-10-11.

### Three most important unfinished issues to address before graduating:

  1. Publish the first Apache release following ASF release processes.
  2. Grow the contributor and community to ensure long-term sustainability.

### How has the community developed since the last report?

  - Mailing list Activity: 221 new emails on the Dev mailing list since the last report, covering technical and Apache-related discussions.
  - Slack Activity: 15 new threads in `general` channel, 5 new members since last report.
  - GitHub Discussions: 16 new threads since last report.
  - New Committers:
    - May 21, 2025 - Wenchao Zhang (zhangwenchao-123)
    - July 9, 2025 - Xun Gong (gongxun0928)
  - Events:
    - Community Over Code Asia 2025: six presentations on Cloudberry at this conference, covering AI, Data Warehouse, OLAP and Incubator tracks. There was one Cloudberry booth.
    - HOW2025: PostgreSQL & IvorySQL Eco Conference in Jinan, China: PPMC members Dianjin Wang and Max Yang attended this conference and introduced Apache Cloudberry to the audience.
    - 10-minute T3D session on Apache Cloudberry from PPMC Member Tushar Pednekar with the host Joshua Drake: https://youtu.be/0mPCoEXG0XU
    - PPMC member Tushar Pednekar had a presentation on Cloudberry + Flink at Flink Forward Asia, Singapore 2025: https://www.youtube.com/watch?v=K9d572vOvNY
    - Presentation recording available at https://www.youtube.com/watch?v=lMYqOoE4p5A, by contributor @Leonid Borchuk and PPMC Member @Kirill Reshke at the sql-ninja conference.

### How has the project developed since the last report?

  - Compliance with ASF policy:
    - Renamed `greenplum_path` to `cloudberry-env.sh` for better compliance with ASF rules.
    - Updated Apache RAT license metadata for release.
    - Changed PAX's cpp-stub from submodule to subdir to avoid introducing binary files.
    - Changed Python modules for gpMgmt from bundling their source tarballs to downloading them during the build process via `pip3 install`.
  - Working on the first Apache Cloudberry (Incubating) 2.0.0 release:
    - Already had RC1 & RC2 rounds and fixed some license issues, will have an RC3 round for the dev vote and Apache Incubator vote.
  - PostgreSQL Kernel upgrade: the community developer has started the kernel upgrade work from PG 14.4 to PG 16.6.
  - 130 new commits to main branch since the last report, focusing on performance improvements, bug fixes and new features.
  - Ecosystem:
    - Apache SeaTunnel added official connector support for Apache Cloudberry in its latest 2.3.11 release (See https://s.apache.org/baj30).
    - Flink JDBC Connector v3.3.0+ now supports Cloudberry via PR https://s.apache.org/jt29r
  - Our GitHub main repo has reached 1k+ GitHub stars!

### How would you assess the podling's maturity?

  - [ ] Initial setup
  - [X] Working towards first release
  - [X] Community building
  - [ ] Nearing graduation
  - [ ] Other:

### Date of last release:

  N/A

### When were the last committers or PPMC members elected?

  - May 21, 2025 - Wenchao Zhang (zhangwenchao-123)
  - July 9, 2025 - Xun Gong (gongxun0928)
