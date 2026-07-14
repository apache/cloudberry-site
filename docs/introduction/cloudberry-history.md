---
title: Project History
---

import Timeline from "@site/src/components/common/Timeline";

# Apache Cloudberry Project History

This page chronicles the key milestones in the development of Apache Cloudberry, from its origins to the present day.

## Timeline

export const history = [
  {
    date: "May 2026",
    title: "PostgreSQL 16.9 Kernel Upgrade",
    description:
      "The main branch upgraded the PostgreSQL kernel from 14.4 to PostgreSQL 16.9, bringing the modern PostgreSQL features, performance improvements, and security fixes to the MPP platform.",
    links: [
      { label: "Announcement", url: "/blog/postgresql16-for-apache-cloudberry-202606" },
    ],
  },
  {
    date: "April 2026",
    title: "Apache Cloudberry (Incubating) 2.1.0 Released",
    description:
      "Version 2.1.0 was released, continuing the release momentum within the Apache Incubator with further enhancements and community contributions.",
    links: [
      { label: "2.1 Preview", url: "/blog/apache-cloudberry-2.1.0-preview" },
      { label: "Announcement", url: "/blog/announce-apache-cloudberry-2.1.0" },
      { label: "Changelog", url: "/releases/2.1.0-incubating" },
    ],
  },
  {
    date: "July 2025",
    title: "First Apache Release — v2.0.0",
    description:
      "Apache Cloudberry (Incubating) 2.0.0 was released, marking the first official Apache Release and establishing the project's release process under Apache governance.",
    links: [
      { label: "2.0 Preview", url: "/blog/apache-cloudberry-2.0-preview-key-features-and-improvements-ahead" },
      { label: "Announcement", url: "/blog/announce-apache-cloudberry-2.0.0" },
      { label: "What's New", url: "/blog/whats-new-in-apache-cloudberry-2.0.0" },
      { label: "Changelog", url: "/releases/2.0.0-incubating" },
    ],
  },
  {
    date: "October 2024",
    title: "Joined the Apache Incubator",
    description:
      "Cloudberry Database was voted into the Apache Incubator, rebranded as Apache Cloudberry, and began its incubation journey under the umbrella of the Apache Software Foundation Incubator.",
    links: [
      { label: "Announcement", url: "/blog/cloudberry-database-enters-the-apache-incubator" },
    ],
  },
  {
    date: "May 2024",
    title: "Greenplum Database Went Closed-Source",
    description:
      "Greenplum Database archived its GitHub repository and went closed-source. This event cemented Apache Cloudberry's role as the open-source successor continuing the PostgreSQL-based MPP database lineage.",
  },
  {
    date: "June 2023",
    title: "Cloudberry Database Open-Sourced",
    description:
      "Cloudberry Database was officially open-sourced, inviting the global developer community to participate, contribute, and build together.",
  },
  {
    date: "June 2022",
    title: "Project Launched",
    description:
      "HashData launched the Cloudberry Database project, derived from Greenplum Database 7. The team upgraded the PostgreSQL kernel from 12.x to 14.4, laying a modern foundation for the future.",
  },
];

<Timeline items={history} reversed />

## Incubation Reports

Apache Cloudberry submits regular incubation reports to the Apache Incubator PMC. These reports provide detailed updates on community growth, release progress, and project maturity.

- [May 2026](/blog/apache-cloudberry-incubation-report-202605)
- [February 2026](/blog/apache-cloudberry-incubation-report-202602)
- [November 2025](/blog/apache-cloudberry-incubation-report-202511)
- [August 2025](/blog/apache-cloudberry-incubation-report-202508)
- [May 2025](/blog/apache-cloudberry-incubation-report-202505)
