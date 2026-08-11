---
slug: apache-cloudberry-incubation-report-202608
title: "Apache Cloudberry Incubation Report - August 2026"
description: "We’re making steady progress to grow!"
authors: [asfcloudberry]
tags: [Incubation]
image: /img/blog/apache-cloudberry-incubation-report.png
---

:::note

This Cloudberry incubation report summarizes our major progress from May 2026 to July 2026. It is adapted from the [Apache Incubator Report August 2026](https://cwiki.apache.org/confluence/spaces/INCUBATOR/pages/446070925/August2026#cloudberry), with some modifications for readability.

:::

<!-- truncate -->

## Cloudberry 

Apache Cloudberry is an advanced and mature open-source Massively Parallel Processing (MPP) database, derived from the last open-source version of the Greenplum Database® but built on a more modern PostgreSQL kernel and with more advanced enterprise capabilities. Cloudberry can serve as a data warehouse and can also be used for large-scale analytics and AI/ML workloads.

Cloudberry has been incubating since 2024-10-11.

### Three most important unfinished issues to address before graduating:

   1. Grow the contributor and community to ensure long-term sustainability.
   2. Publish a few more Apache releases following the ASF release processes.

### How has the community developed since the last report?

  - The community continued its public bi-weekly meetings, holding six meetings from May through July 2026. Discussions covered the PostgreSQL 16 kernel upgrade, release coordination, CI and packaging, ecosystem projects, documentation, community governance, and open technical topics.
  - New Committers: Anton Kurochkin (@woblerr) and Liu Shengsong (@lss602726449) were announced as new committers on June 26 and July 6, respectively.
  - Contributors and community participation continued to grow through work on the main repository and related ecosystem projects. The community also discussed new Kubernetes operators and the creation of an Apache Cloudberry Command Center repository.
  - Community governance and responsible AI use continued to receive attention. The community discussed the AI guideline and the use of AI-assisted code review tools, with AI-assisted code review tools, such as GitHub Copilot, were discussed as optional review suggestions subject to normal community review.
  - Events and outreach:
    - Community Over Code Asia 2026: Seven Cloudberry-related talks, a Cloudberry booth: https://s.apache.org/knmjs
    - Saint Highload 2026: our PPMC member Leonid Borchuk presented a session on PAX: https://s.apache.org/re82o

### How has the project developed since the last report?

  - PostgreSQL kernel upgrade and core development:
    - Merged the PostgreSQL 16 kernel upgrade into the `main` branch with 5730 commits. The remaining FIXME items are planned to be addressed as part of the future 3.0 release.
    - Started discussion about a future kernel upgrade from PostgreSQL 16 to PostgreSQL 18.
    - Continued PostgreSQL 14.x maintenance on the 2.x stable branch, including work to backport 14.8 and archive-related fixes.
    - Added security fixes for several CVEs and continued dependency and security maintenance across the repositories.
    - New extensions:
      - Added the `gp_relsizes_stats` extension.
      - Introduced the `yezzey` extension for the 2.x stable branch as a submodule.
      - Added the `TRY_CONVERT` extension.
      - Added the `reject_partition_fullscan` extension.
    - Continued ORCA and planner improvements, including fixes for CTE handling, intra-segment parallel table scans, HAVING and grouping-set handling, non-ASCII column aliases, empty-partition statistics, outer-join predicate pushdown, and other correctness and stability issues.
  - datalake_fdw: Started implementing Iceberg support in the `datalake_fdw`.
  - Ecosystem and sub-repositories:
    - `cloudberry-pxf`:
      - Continued the 2.2 release plan.
      - Added Java 21 support, upgraded the Gradle wrapper, updated HBase and Log4j dependencies, improved S3-related Testcontainers coverage, and added session and command-count information to logging context.
      - Applied security and dependency updates and restored green CI testing.
    - `cloudberry-backup`:
      - Completed the Go 1.25 upgrade and continued PostgreSQL 16 support work.
      - Pinned the CI branch to Cloudberry 2.x stable branch and applied dependency updates to address security alerts.
      - Added the `gpbackup_exporter` Prometheus exporter for the backup history database.
    - `cloudberry-go-libs`:
      - Added a new CI/CD workflow and completed the ASF compliance work. The project is ready for the 2.2 release.
    - Other ecosystem work:
      - `WAL-G` added support for PAX incremental backups.
      - `Odyssey` 1.5.1 was released, and Odyssey support was documented on the Cloudberry website.
      - Community members developed Kubernetes operators for Cloudberry.
      - Yandex Cloud plans to donate the `Command Center` project to Apache Cloudberry - https://s.apache.org/urvsc
  - Release, CI, and packaging:
    - Release:
      - Provided the convenience packages for 2.1 release.
      - Started preparing Apache Cloudberry (Incubating) 2.2.0. By the end of July, the release was considered ready to enter the release process, with remaining work including cherry-picking changes to `REL_2_STABLE`, and finalizing PXF Rocky Linux 10 support.
      - Created the release runbook wiki page for the release manager.
    - CI workflows:
      - Added Rocky Linux 10 workflow support.
      - Completed the CI consolidation work from OS-specific CI workflows into matrix-based workflows for easier maintenance and future platform expansion.
      - Bumped the Go version to 1.25 in the development Docker images and CI workflows.
      - Planned to add a macOS CI workflow.
    - Packaging:
      - Improved RPM packaging for the core repository, including custom installation prefixes and support for installing multiple major versions side by side.
      - Merged the source-release-based convenience packages workflow for the main repository, `cloudberry-backup` and `cloudberry-pxf` for the coming 2.2+ releases. 
  - Website and documentation:
    - Upgraded the website to Docusaurus 3.10.2 and continued UI improvements.
    - Added the “Powered by” page and integrated `cloudberry-pxf` documentation into the main website.
    - Added a project history page and ecosystem documentation for `Odyssey` and `WAL-G`.
    - Added a new page on backward-incompatible changes from Greenplum 6.x.
    - Refreshed the deployment guide.
    - Published five new blog posts to share the latest community news. 

### How would you assess the podling's maturity?

  - [ ] Initial setup
  - [ ] Working towards first release
  - [X] Community building
  - [x] Nearing graduation
  - [ ] Other:

### Date of last release:

  - April 14, 2026 - Apache Cloudberry (Incubating) 2.1.0

### When were the last committers or PPMC members elected?

   - June 22, 2026 - Anton Kurochkin (woblerr) was announced as a new committer.
  - July 6, 2026 - Liu Shengsong (@lss602726449) was announced as a new committer. 

---

## Join Us

Apache Cloudberry follows the principle of open and transparent governance. You can follow our [quarterly incubation reports](https://whimsy.apache.org/board/minutes/Cloudberry.html) to stay updated on key community events and project progress.

Get involved with the community:

* **GitHub**: [github.com/apache/cloudberry](https://github.com/apache/cloudberry)
* **Slack**: [Join our Slack workspace](https://join.slack.com/t/asf-cloudberry/shared_invite/zt-3um34r7hf-Sh~6jG6hVxlQJo1tbhK2sw)
* **Discord**: [Join our Discord server](https://discord.gg/GJrz3Fxf6y)
* **Mailing Lists**: [lists.apache.org/list.html?dev@cloudberry.apache.org](https://lists.apache.org/list.html?dev@cloudberry.apache.org)
* **Website**: [cloudberry.apache.org](https://cloudberry.apache.org)
