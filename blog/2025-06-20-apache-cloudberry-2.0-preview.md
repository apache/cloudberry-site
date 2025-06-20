---
slug: "apache-cloudberry-2.0-preview-key-features-and-improvements-ahead"
title: "Apache Cloudberry 2.0 Preview: Key Features and Improvements Ahead"
description: "Key highlights of Apache Cloudberry 2.0"
authors: [asfcloudberry]
tags: [Release]
image: /img/blog/202506-cloudberry2.0.png
---

The next major release of Apache Cloudberry (Incubating)—version 2.0—is just around the corner. As the project’s first Apache release since joining the Apache Incubator, Cloudberry 2.0 brings a host of new features, performance enhancements, and compliance improvements. While the official release is still in progress, we’d like to share a preview of the most exciting changes and innovations you can expect. This overview highlights the key updates and sets the stage for the upcoming launch.

## Key Highlights of Apache Cloudberry 2.0

### Codebase Cleanup

One of the major efforts in this release was cleaning up the code repository to remove outdated and unused files. This includes legacy components such as Concourse CI configurations (`concourse/*`), `hd-ci/*`, legacy deployment directories (e.g., Vagrant and Kubernetes setups), and redundant artifacts like PyGreSQL-related files. This cleanup streamlines the codebase, making it easier for contributors to navigate and focus on meaningful development.

### Brand Refresh

As part of the transition to the Apache Incubator, we’ve unified branding across the project source code and website. References to legacy names like "Cloudberry Database" and "CloudberryDB" have been replaced with `Apache Cloudberry` or simply `Cloudberry`. This ensures consistency and aligns the project with Apache’s branding guidelines.

### Compliance Improvements

To meet Apache’s licensing and compliance standards, we’ve added the standard Apache License headers to all relevant newly created files by the Cloudberry community, replaced incompatible tarballs like Pylint (GPL-licensed) with Ruff (MIT-licensed), and ensured the codebase passes Apache RAT validation. 

We’ve reworded the NOTICE, LICENSE, DISCLAIMER, COPYRIGHT, and SECURITY files to reflect the new Apache Cloudberry branding and compliance requirements. All submodules and components’ licenses are listed in the top-level `licenses` directory.

Our PPMC members and committers have all signed the ICLA (Individual Contributor License Agreement) files and the Cloudberry donation corporation also signed the Software Grant Agreement (SGA) files and and has been filed with the Apache Software Foundation.

These changes make Cloudberry fully compliant with Apache’s open-source policies, paving the way for a smooth release process.

### Cherry-Picked Enhancements from archived Greenplum

Apache Cloudberry 2.0 incorporates hundreds of commits cherry-picked from the archived Greenplum repository. These include critical bug fixes, performance improvements, and enhancements to the ORCA query optimizer and other components. While some changes outside Cloudberry’s roadmap were deprioritized, the codebase is now largely aligned with Greenplum, offering a solid foundation for future development. Community contributors are welcome to pick up tasks related to these deprioritized changes. See the [proposal](https://github.com/apache/cloudberry/discussions/675) for more details.

### New Features and Enhancements

This release introduces new features and enhancements that expand Cloudberry’s capabilities compared to the previous Cloudberry 1.6 release:

* Dynamic Tables: Automatically refresh query results based on base tables, external tables, or materialized views—ideal for building live analytical dashboards. See the [doc](https://cloudberry.apache.org/docs/next/performance/use-dynamic-tables) for more details.
* PAX: Introduces a hybrid row-column storage model that improves cache efficiency and supports both object and local file systems. See the [doc](https://cloudberry.apache.org/docs/next/operate-with-data/pax-table-format) for more details.
* And More: Cloudberry 2.0 brings extensive enhancements across query optimization, the ORCA optimizer, transaction management, storage, data handling, resource managment, and tools. Full details will be available in the official 2.0 release notes.

### CICD Process

Since entering the Apache Incubator, a strong CI/CD pipeline has been established. This pipeline covers all the core tests and checks to ensure the quality of the codebase. At the same time, it can support parallel tests to speed up the CI/CD process, and output the detailed test result parsing and reporting, etc. 

As an Apache Incubator project, Apache Cloudberry 2.0 follows the Apache Software Foundation’s release process, including community discussions, voting, and compliance checks. This ensures the release meets the standards of quality and transparency.

### Security Enhancements

Security has been a top priority for Apache Cloudberry 2.0. We’ve introduced Coverity Scan and SonarQube for automated weekly code analysis, ensuring the codebase is robust and secure. 

Additionally, we’ve addressed critical vulnerabilities, including PostgreSQL CVE-2025-1049 fixes, and upgraded dependencies such as `PyYAML` to patch known issues. These measures reinforce Cloudberry’s commitment to providing a secure and reliable database platform.

### Website and Docs updates

The website and documentation have been updated to reflect the new branding and features. The website now includes a new design, updated content, and better navigation. The documentation has been updated to reflect the new features and changes in the codebase.

## Looking Ahead

As an Apache Incubator project, Cloudberry 2.0 follows the ASF’s rigorous release process, including open discussion, voting, and compliance checks. This ensures transparency, quality, and community trust.

With a cleaner codebase, enhanced security, and exciting new features and enhancements, Apache Cloudberry 2.0 will be a major milestone that sets the stage for future innovation. We invite the community to join us in shaping the future of Apache Cloudberry by contributing, testing, and sharing feedback.

Stay tuned for the official 2.0 release announcement! Thank you for being part of the Apache Cloudberry journey!

## Join Us

- Visit the website: [https://cloudberry.apache.org](https://cloudberry.apache.org)
- Follow us on GitHub: [https://github.com/apache/cloudberry](https://github.com/apache/cloudberry)
- Join Slack workspace: [https://apache-cloudberry.slack.com](https://apache-cloudberry.slack.com)
- Dev mailing list: to subscribe and check the archives, please visit [here](/community/mailing-lists)
