---
slug: apache-cloudberry-incubation-report-202511
title: "Apache Cloudberry Incubation Report - November 2025"
description: "We’re making steady progress to grow!"
authors: [asfcloudberry]
tags: [Incubation]
image: /img/blog/apache-cloudberry-incubation-report.png
---

:::note

This Cloudberry incubation report summarizes our major progress during August and October 2025. It is adapted from the [Apache Incubator Report November 2025](https://cwiki.apache.org/confluence/display/INCUBATOR/November2025#cloudberry), with some modifications for readability.

:::

<!-- truncate -->

## Cloudberry 

Cloudberry is an advanced and mature open-source Massively Parallel Processing (MPP) database, derived from the open-source version of Pivotal Greenplum Database®️ but built on a more modern PostgreSQL 14 kernel, whereas Greenplum is based on PostgreSQL 12. This upgrade brings enhanced enterprise capabilities, making Cloudberry well-suited for data warehousing, large-scale analytics, and AI/ML workloads.

Cloudberry has been incubating since 2024-10-11.

### Three most important unfinished issues to address before graduating:

  1. Grow the contributor and community to ensure long-term sustainability.
  2. Publish a few more Apache releases following the ASF release processes.

### How has the community developed since the last report?

- Mailing list Activity: 210 new emails on the Dev mailing list since the last report, covering community, technical and Apache-related discussions.
- GitHub Discussions: 14 new threads since last report.
- New Committers:
  - Sep 25, 2025 - Leonid Borchuk (leborchuk)
- Events:
  - Apache Cloudberry Meetup organized in Beijing on August 16, 2025, which attracted 30~ attendees. This meetup focused on the new features and highlights of the 2.0.0 release and the Apache way. See recap post at https://s.apache.org/xqyi9.
  - Our committer Leonid Borchuk presented a talk, "PAX — column store for Apache Cloudberry/Postgres 14", at PGConf.SPb 2025 in Saint Petersburg on September 29, 2025. See details at https://pgconf.ru/talk/2484244.

### How has the project developed since the last report?

- Publish the first Apache Cloudberry (Incubating) 2.0.0 release on August 25, 2025. See announcement email at https://s.apache.org/fn13p
- PostgreSQL Kernel upgrade (14~>16): the work has been in progress. See the monthly report at https://s.apache.org/kp3lj
- 113 new commits to the main branch since the last report, focusing on CI, performance, bug fixes, and new features.
- Sub-repositories:
  - Archived the `apache/cloudberry-devops-release` repo and migrated these files to the `devops/` directory of the main repository.
  - For the backup tool repos:
    - The `cloudberry-gpbackup` repo has been renamed to `cloudberry-backup`, reflecting the project’s independence and alignment with the Cloudberry brand. Its codebase has synced with the GP’s archived version.
    - The core files from `apache/cloudberry-gpbackup-s3-plugin` have been merged into the `cloudberry-backup` repos under `plugins/s3plugin`. Now, the S3 plugin will be installed together with Cloudberry Backup.
  - The `cloudberry-pxf` is still in progress on the archived Greenplum commits sync to Cloudberry.
  - `cloudberry-go-libs` has synced with the GP’s archived version.
- Started the discussion on the next release 2.1.0. See discussion at https://s.apache.org/rx7s8
- It has been one year since Cloudberry joined the ASF Incubator. Here is our Roadmap recap at https://s.apache.org/5fxn9
- Ecosystem:
  - The community developers are working with the Apache MADlib team to add support for Cloudberry to MADlib upstream. See the PR at https://github.com/apache/madlib/pull/627
  - The PostGIS for Cloudberry has been upgraded from 2.5 to 3.3.2

### How would you assess the podling's maturity?

  - [ ] Initial setup
  - [ ] Working towards first release
  - [X] Community building
  - [ ] Nearing graduation
  - [ ] Other:

### Date of last release:

  - August 25, 2025

### When were the last committers or PPMC members elected?

  - Sep 25, 2025 - Leonid Borchuk (leborchuk)
