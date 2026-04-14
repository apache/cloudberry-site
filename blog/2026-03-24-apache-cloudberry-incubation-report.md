---
slug: apache-cloudberry-incubation-report-202602
title: "Apache Cloudberry Incubation Report - February 2026"
description: "We’re making steady progress to grow!"
authors: [asfcloudberry]
tags: [Incubation]
image: /img/blog/apache-cloudberry-incubation-report.png
---

:::note

This Cloudberry incubation report summarizes our major progress during November 2025 to January 2026. It is adapted from the [Apache Incubator Report February 2026](https://cwiki.apache.org/confluence/display/INCUBATOR/February2026#cloudberry), with some modifications for readability.

:::

<!-- truncate -->

## Cloudberry 

Cloudberry is an advanced and mature open-source Massively Parallel Processing (MPP) database, derived from the open-source version of Pivotal Greenplum Database®️ but built on a more modern PostgreSQL 14 kernel, whereas Greenplum is based on PostgreSQL 12. This upgrade brings enhanced enterprise capabilities, making Cloudberry well-suited for data warehousing, large-scale analytics, and AI/ML workloads.

Cloudberry has been incubating since 2024-10-11.

### Three most important unfinished issues to address before graduating:

   1. Grow the contributor and community to ensure long-term sustainability.
   2. Publish a few more Apache releases following the ASF release processes.

### How has the community developed since the last report?

  - Mailing list Activity: 82 new emails on the Dev mailing list since the last report, covering community, repositories, support, technical and Apache-related discussions.
  - GitHub Discussions: 5 new threads since last report.
  - New Committers: Rose Duan
  - Events:
    - Hosted a Cloudberry community booth at the China Open Source Conference (COSCon'25) in Beijing, Dec 6-7, 2025.
    - Apache Cloudberry Meetup organized in Shenzhen: 30+ attendees on Jan 17th
    - Commenced Apache Cloudberry Bi-weekly Community Meeting, see details in https://s.apache.org/9ba4d, the 1st meeting was held on January 30, 2026.

### How has the project developed since the last report?

  - PostgreSQL Kernel upgrade (14~>16): at this stage, most of the core enablement work for PostgreSQL 16.9 has been completed. Currently addressing Cloudberry schedule tests.
  - Performance
    - PAX: optimize I/O read for multiple discrete columns in a group.
    - Add UDP2 interconnect protocol implementation (right now it is still an experimental feature).
    - Set `join_collapse_limit` default value to 13.
  - Stability
    1. Merged 72 commits, most of them - bugfixes and CI/CD improvements.
    2. Fixed 2 CVEs.
  - CI and infra
    1. Added support for Ubuntu 22.04 and Debian packages to CI/CD
    2. Added support for Rocky Linux 8 to CI/CD
  - Sub-repositories: 
    - `cloudberry-pxf`. After several months of continuous effort, the PXF project has recently achieved a significant milestone:
      1. The code baseline has been 100% aligned with the archived pxf-archive from GP.
      2. Completed full adaptation for Cloudberry.
      3. Added a relatively comprehensive and extensive CI pipeline for PXF.
      4. Source code cleanup is in progress.
    - Squash `cloudberry-bootcamp` repository into `devops/sandbox` in the main repository catalog.
  - New release: 2.1
    - Merged 244 commits from `main` to `REL_2_STABLE`. We're ready to release Cloudberry 2.1.
  - Ecosystem
    1. Madlib integration is still in progress. We successfully performed manual tests, but PR is still open to fix the CI bugs: https://github.com/apache/madlib/pull/627.
    2. Working on diskquota extension integration: still in progress - see https://github.com/apache/cloudberry/pull/1490.
  - 2025 Summary and 2026 Overview discussions
    1. Published Cloudberry 2025 Review blog post: https://s.apache.org/fxde8
    2. Initiated Cloudberry 2026 roadmap discussions: https://s.apache.org/jxd7s

### How would you assess the podling's maturity?

  - [ ] Initial setup
  - [ ] Working towards first release
  - [X] Community building
  - [ ] Nearing graduation
  - [ ] Other:

### Date of last release:

  - August 25, 2025

### When were the last committers or PPMC members elected?

  - Rose Duan, 19th Jan 2026

---

## Join Us

Apache Cloudberry follows the principle of open and transparent governance. You can follow our [quarterly incubation reports](https://whimsy.apache.org/board/minutes/Cloudberry.html) to stay updated on key community events and project progress.

Get involved with the community:

* **GitHub**: [github.com/apache/cloudberry](https://github.com/apache/cloudberry)
* **Slack**: [Join our Slack workspace](https://join.slack.com/t/asf-cloudberry/shared_invite/zt-3um34r7hf-Sh~6jG6hVxlQJo1tbhK2sw)
* **Mailing Lists**: [lists.apache.org/list.html?dev@cloudberry.apache.org](https://lists.apache.org/list.html?dev@cloudberry.apache.org)
* **Website**: [cloudberry.apache.org](https://cloudberry.apache.org)
