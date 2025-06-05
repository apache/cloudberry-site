---
slug: apache-cloudberry-incubation-report-202505
title: "Apache Cloudberry Incubation Report - May 2025"
description: "We’re making steady progress to grow!"
authors: [asfcloudberry]
tags: [Incubation]
image: /img/blog/apache-cloudberry-incubation-report.png
---

:::note

This Cloudberry incubation report summarizes our major progress during March and April 2025. It is adapted from the [Apache Incubator Report May 2025](https://cwiki.apache.org/confluence/display/INCUBATOR/May2025#cloudberry), with some modifications for readability.

:::

<!-- truncate -->

## Cloudberry 

Cloudberry is an advanced and mature open-source Massively Parallel Processing (MPP) database, derived from the open-source version of Pivotal Greenplum Database®️ but built on a more modern PostgreSQL 14 kernel, whereas Greenplum is based on PostgreSQL 12. This upgrade brings enhanced enterprise capabilities, making Cloudberry well-suited for data warehousing, large-scale analytics, and AI/ML workloads.

Cloudberry has been incubating since 2024-10-11

### Three most important unfinished issues to address before graduating:

  1. Complete the source code cleanup to ensure ASF compliance.
  2. Publish the first Apache release following ASF release processes.
  3. Grow the contributor and community to ensure long-term sustainability.

### How has the community developed since the last report?

  - Mailing list Activity: 59 messages and 92 messages on the Dev mailing list in March and April 2025, covering technical and Apache-related
  discussions.
  - Slack Activity: 16 new threads in `general` channel, 27 new members since last report.
  - GitHub Discussions: 4 new threads in March and 7 new threads in April.
  - New Committer: welcomed our first committer since joining the incubator.
    - Mar 19, 2025 - Xiong Tong
  - Events:
    - Join OSPP 2025 to attract university students to join the open-source development
    - A Cloudberry Meetup hosted by HashData in Hangzhou attracted 30~ attendees.
    - The contributor @Leonid Borchuk and PPMC Member @Kirill Reshke presented their talks on Cloudberry at the sql-ninja conference in Moscow
      on 03/22, 2025.
    - PPMC member Shine Zhang presented "From Greenplum to Apache Cloudberry" at Postgres Conference 2025, Orlando / United States, March 20, 2025
    - 6+ Cloudberry proposals are submitted to CommunityOverCode NA/Asia 2025 (still in review and waiting for the final approval).
    - Create website pages to guide on how to invite the new committer.

### How has the project developed since the last report?

  - Create the Wiki space in GitHub to organize the collective knowledge from community practices, including the release process.
  - Security:
    - Integrated two code analysis tools to enhance our code quality and identify potential issues in the development process: Coverity Scan and SonarQube Scan.
    - Fix the PostgreSQL security issue CVE-2025-1094.
  - CICD:
    - Working on adding the Ubuntu build and test environment support to Cloudberry
  - Codebase Updates:
    - Evolve the Cloudberry code following the Roadmap: Contributed back the row-column hybrid storage engine -PAX to the Cloudberry codebase;
    - Completed the first stage of cherry-picking commits from the open-source Greenplum project to Cloudberry (80%+ progress of plan).
    - Work for the first Apache Cloudberry (Incubating) 2.0.0 release
      - Pull Request management through the GitHub project: https://github.com/orgs/apache/projects/490
  - License-related updates: 
    - Update the NOTICE and LICENSE files.
    - List the third-party licenses under the `licenses` directory.
    - Replace the Pylint with a license-compatible one - ruff.
    - Update the license headers with the Apache license header for the newly created files.
    - Add RAT license audit config and compliance metadata.
  - Brand updates: rebrand old names to the latest Apache Cloudberry brand both in the main codebase and the site source.
  - Cleanup the old unused files from the source code for a clearer codebase and ASF compliance (including `concourse/*`, `hd-ci/*`, `deploy/*`, and so on).

### How would you assess the podling's maturity?

  - [ ] Initial setup
  - [X] Working towards first release
  - [X] Community building
  - [ ] Nearing graduation
  - [ ] Other:

### Date of last release:

  N/A

### When were the last committers or PPMC members elected?

  - Mar 19, 2025 - Xiong Tong (committer)
