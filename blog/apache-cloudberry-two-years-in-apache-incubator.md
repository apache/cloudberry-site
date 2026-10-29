---
title: "Apache Cloudberry: Two Years in the Apache Incubator"
description: "Looking back at two years of Apache Cloudberry community growth, releases, PostgreSQL modernization, and ecosystem collaboration."
source: https://cloudberry.apache.org/blog/apache-cloudberry-two-years-in-apache-incubator
---

# Apache Cloudberry: Two Years in the Apache Incubator

On October 11, 2024, Cloudberry entered the Apache Incubator. Two years later, Apache Cloudberry (Incubating) has grown from a newly formed podling into an active open-source community with regular releases, a broader contributor base, and a more modern database foundation.

This anniversary is a chance to look back at what the community has built together—and to thank everyone who has contributed code, reviews, documentation, testing, events, and discussion along the way.

<!-- truncate -->

## From a new podling to an operating Apache project

The first months were about establishing the foundations needed for sustainable, transparent development under the Apache Software Foundation. The project migrated its repositories and CI infrastructure, completed its initial ASF compliance work, refreshed its documentation and branding, and began developing in the open through the Apache mailing lists and GitHub.

That foundation made the next stage possible: regular Apache releases, a growing contributor community, and a clearer path for users and ecosystem projects to participate.

## Release milestones

The community has shipped two official Apache releases since entering the Incubator:

* [Apache Cloudberry 2.0.0 (Incubating)](/blog/announce-apache-cloudberry-2.0.0) was released in August 2025. It was the project's first official Apache release and introduced the PAX storage engine alongside the release engineering, compliance, and testing work required to establish a repeatable Apache release process.
* [Apache Cloudberry 2.1.0 (Incubating)](/blog/announce-apache-cloudberry-2.1.0) was released in April 2026. It continued improvements across the core database, Apache Cloudberry PXF, and Apache Cloudberry Backup, and made convenience RPM and DEB packages available for the first time.

The community is also preparing the next step. The [2.2.0 preview](/blog/apache-cloudberry-2.2.0-preview) describes the current release candidate direction, including coordinated releases for the core database, PXF, Backup, and Go Libs. It is important to distinguish this preview from an official release: 2.2.0 is still subject to the Apache release process.

The community has also started discussions around Apache Cloudberry 3.0. This will be the first Cloudberry release based on the PostgreSQL 16 kernel, opening the next major chapter in the project's kernel modernization and release planning.

## A more modern PostgreSQL foundation

One of the largest engineering efforts of the past two years was upgrading Cloudberry's database kernel. In June 2026, the project announced that the `main` branch had upgraded from PostgreSQL 14.4 to PostgreSQL 16.9, incorporating more than 5,730 upstream commits from PostgreSQL 15 and 16.

The [PostgreSQL 16 announcement](/blog/postgresql16-for-apache-cloudberry-202606) highlights what this brings to Cloudberry users and developers: `MERGE`, SQL/JSON capabilities, parallel `VACUUM`, two-phase logical replication, `pg_stat_io`, a modernized statistics subsystem, security improvements, and many correctness and performance fixes.

This work is more than a version-number change. It is a substantial integration effort across the PostgreSQL kernel and Cloudberry's MPP architecture, involving broad community contributions in implementation, review, testing, and issue follow-up. The merge into `main` is a major milestone, with continued optimization and stabilization still ahead.

In parallel with the major-version upgrade on `main`, the community continues to update the PostgreSQL 14 kernel on the `REL_2_STABLE` branch. These minor-version upgrades and related maintenance work help keep the 2.x series current, stable, and better supported while development of the PostgreSQL 16-based 3.0 line moves forward.

## Community growth and shared responsibility

Since entering the Incubator, the community has welcomed 10 new committers:

* Xiong Tong
* Wenchao Zhang
* Xun Gong
* Leonid Borchuk
* Rose Duan
* Xiaoyu Liu
* Nikolay Antonov
* Robert Mu
* Anton Kurochkin
* Liu Shengsong

In April 2026, [Leonid Borchuk was elected to the PPMC](/blog/welcoming-leonid-borchuk-as-a-new-apache-cloudberry-ppmc-member), adding another project leader to the group responsible for community health, project direction, and the incubation journey.

These elections represent more than a growing list of names. They show how participation in design discussions, code review, documentation, testing, release work, and community outreach can develop into shared project responsibility.

## Meeting users and contributors where they are

Cloudberry community members have continued to introduce the project to the wider PostgreSQL, data, and Apache communities. During the past two years, they have participated in PostgresConf, Flink Forward Asia, Community Over Code Asia, PostgreSQL meetups, regional conferences, and Cloudberry meetups in multiple cities.

The project also increased its presence at Community Over Code Asia. In 2025, the community presented six Cloudberry-related sessions and hosted a booth. In 2026, it brought seven sessions, a booth, and an in-person community gathering to the event in Beijing. These activities helped users learn about the project, gave contributors a place to share their work, and created opportunities for new people to join the community.

The community's public bi-weekly meetings, introduced in early 2026, have added another regular forum for release coordination, kernel upgrades, testing, ecosystem projects, documentation, and governance discussions.

## Growing an ecosystem around the database

Apache Cloudberry's progress is not limited to the core database repository. The community has continued to develop and integrate related projects, including Apache Cloudberry PXF, Apache Cloudberry Backup, and Cloudberry Go Libs. The project has also documented integrations with tools such as DBeaver, WAL-G, Apache SeaTunnel, and the Flink JDBC Connector, while collaborating with Apache MADlib on native Cloudberry support.

This ecosystem work follows an upstream-first direction: make Cloudberry easier to use with established tools, contribute improvements where they belong, and keep related repositories aligned with Apache release and compliance practices.

## Looking ahead

After two years in the Apache Incubator, Apache Cloudberry has a stronger technical and community foundation—but the work is not finished. The next stage is about making that foundation durable:

* continuing regular, transparent Apache releases;
* completing the stabilization and optimization work around the PostgreSQL 16 kernel;
* growing a diverse contributor and user community;
* improving packaging, testing, documentation, and ecosystem integrations; and
* continuing the path toward graduation from the Apache Incubator.

Thank you to every contributor, committer, PPMC member, mentor, user, event organizer, and community participant who has helped Apache Cloudberry reach this point. We invite you to try the project, share feedback, join the discussions, and help shape its next two years.

## Join us

* [Website](https://cloudberry.apache.org)
* [Source repository](https://github.com/apache/cloudberry)
* [GitHub Discussions](https://github.com/apache/cloudberry/discussions)
* [Developer mailing list](https://lists.apache.org/list.html?dev@cloudberry.apache.org)
* [Community meetings and channels](https://cloudberry.apache.org/community/)
