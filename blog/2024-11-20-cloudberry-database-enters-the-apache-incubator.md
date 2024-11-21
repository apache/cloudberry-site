---
slug: cloudberry-database-enters-the-apache-incubator
title: "Cloudberry Database Enters the Apache Incubator: A New Chapter in Open-Source MPP Database for Analytics and AI"
description: "Cloudberry is now rebranded to Apache Cloudberry™️ (Incubating)."
authors: [asfcloudberry]
tags: [Announcement]
image: /img/blog/202411-ASF-Incubator.jpeg
---

On October 12th, 2024, the Cloudberry Database project was voted to enter the Apache Software Foundation Incubator[^1], marking a significant milestone for the Cloudberry project and its community. On November 5th, 2024, the Cloudberry project repositories were transferred to the Apache Software Foundation. With this transition, Cloudberry has fully joined the incubator and begun its development under the Apache umbrella. Additionally, the Cloudberry Database is now proudly rebranded to Apache Cloudberry™️ (Incubating).

![Cloudberry Database enters Apache Incubator](/img/blog/cloudberry-database-enters-apache-incubator.jpeg)

<!-- truncate -->

## What is Cloudberry

Cloudberry, created by the original developers of Greenplum Database, is an advanced and mature open-source Massively Parallel Processing (MPP) database. It evolves from the open-source version of the Pivotal Greenplum Database® but features a newer PostgreSQL kernel and more advanced enterprise capabilities. Cloudberry can serve as a data warehouse and can also be used for large-scale analytics and AI/ML workloads.

![Apache Cloudberry Logo](/img/blog/apache-cloudberry-logo-color.png)

The Greenplum Database has been massively adopted by large numbers of small, medium, and big giant teams from different industries. It is also listed among the Top50 popular databases according to the [DB-Engines website](https://db-engines.com/en/ranking). However, with the archiving of the open-source Greenplum Database and a complete shutdown of its community, original open-source Greenplum users cannot get the security or feature updates for free anymore which results in potential challenges for their business.

We want to make Cloudberry the primary open-source alternative to the original Greenplum open-source version. We hope all open-source developers and users of Greenplum will migrate to Cloudberry.

## The Story of Cloudberry

Before going further, we would like to recap the history of the Greenplum Database from closed-source to open-source (October 2015) and then going closed-source (May 2024):

- The Greenplum Database has a long history back to 2003 when it was originally developed based on Massively Parallel Processing (MPP) architecture and the PostgreSQL technology by a company called Greenplum Inc.
- In 2010, Greenplum Inc. was acquired by EMC Corporation.
- In 2012, EMC and VMware (a subsidiary of EMC) combined several of their software assets, including Greenplum Database, into a new company called Pivotal Software, Inc.
- In 2015, Pivotal open sourced the Greenplum’s core engine and rebranded it as Pivotal Greenplum Database®, which became the first open-source MPP data warehouse. The open-source core of the Pivotal Greenplum Database® was used to initiate Apache HAWQ and Apache MADlib projects, while the Greenplum itself remained a single vendor open-source project.
- In 2019, VMware acquired Pivotal Software. This acquisition brought the Pivotal Greenplum Database® back into VMware. VMware continued to support the Greenplum Database development and its open-source community and provided VMware Tanzu Greenplum as the commercial product in the following years.
- In November 2023, Broadcom completed its acquisition of VMware and Greenplum is under Broadcom[^2].
- In May 2024, nearly all Greenplum’s GitHub repos were archived and became read-only, the Slack workspace was deleted (https://greenplum.slack.com), and both `user`[^3] and `dev`[^4] community email lists went silent. These are done by its latest owner without any announcements.

You can see that the ownership of Greenplum Database has changed many times over the past many years, which has raised concerns among the community users, developers, and ecosystem partners. Being controlled by one single vendor, Greenplum has lacked an open governance model that allows community participation in the decision-making process.

The Cloudberry builders recognized that the Greenplum Database had lost its drive for innovation and major feature updates for a long time. Greenplum became less competitive compared to newer generation open-source data warehouses and analytics projects.

Cloudberry was launched in 2022 by the original Greenplum developers, and its source code was made open in 2023. We were surprised when Greenplum suddenly shifted to a closed-source model, which was quite dramatic. From that point on, we were determined to continue our mission and reunite the original open-source Greenplum developers and users, shaping our project in a community way.

Cloudberry is not only simply remade with a different brand. It comes with a fantastic vision and ships a lot of advanced features and highlights, including a newer PostgreSQL kernel, enhanced security, end-to-end performance optimization, supporting AI/ML workloads and streaming, lakehouse integration, and more. We aim to keep Cloudberry compatible with Greenplum to let users use Cloudberry the way they were using Greenplum.

## Why Apache Incubator?

Joining the Apache Incubator is a major step for Cloudberry as it opens the door for collaboration, community growth, and innovation within the open-source world. The Apache Incubator provides a framework for the governance, mentoring, and management of open-source projects, ensuring the project’s growth while aligning with the Apache Way—a community-driven development model that emphasizes transparency and open collaboration.

As Cloudberry enters the Incubator, we are more committed than ever to fostering a vibrant, diverse developer community and encouraging contributions from across the globe. Cloudberry will now have the opportunity to benefit from the mentorship of experienced Apache community members. We hope Cloudberry can graduate from ASF Incubator and be mature and successful as a top-level Apache project by following the Apache Way.

## Acknowledgments

Thank you to all contributors from the Cloudberry community and our upstream projects’ contributors for their great contributions! Thanks to Roman Shaposhnik as our Champion, and thanks to Willem Jiang and Kent Yao as our mentors.

## Join us

As Cloudberry embarks on this exciting journey within the Apache Incubator, we invite developers, data scientists, and database enthusiasts to get involved in shaping the future of the project. Whether through contributing code, sharing use cases, or participating in discussions, we welcome everyone to join the growing community around Cloudberry.

Stay tuned for more updates, and join us in building the future of data warehouse and data analytics.

You can find us as follows:

- Visit the website: [https://cloudberry.apache.org](https://cloudberry.apache.org)
- Follow us on GitHub: [https://github.com/apache/cloudberry](https://github.com/apache/cloudberry)
- Join Slack workspace: [https://apache-cloudberry.slack.com](https://apache-cloudberry.slack.com)
- Subscribe to the dev mailing list: [dev@cloudberry.apache.org](mailto:dev@cloudberry.apache.org)

[^1]: https://lists.apache.org/thread/qzfb38dzb1x3cg29snq4doy95gd6pzy8
[^2]: https://investors.broadcom.com/news-releases/news-release-details/broadcom-completes-acquisition-vmware
[^3]: https://groups.google.com/a/greenplum.org/g/gpdb-users
[^4]: https://groups.google.com/a/greenplum.org/g/gpdb-dev

