---
title: Team
description: Built On Open Source, By Open Source, For Open Source.
---

import TeamTable from '@site/src/components/team/TeamTable';
import CoreContributors from '@site/src/components/team/CoreContributors';
import { ppmcMembers, committers } from '@site/src/data/team';

The Apache Cloudberry (Incubating) team works on developing the core database kernel, utilities, tools, as well as the documentation website. 

## Podling PMC
Each Podling Project Management Committee (PPMC) helps its Podling learn how to govern itself. It works like a PMC but reports to the Incubator PMC instead of to the ASF Board. Initially, it is composed of the Podling’s mentors and the initial committers. The PPMC is directly responsible for the oversight of the podling, and it also decides who to add as a PPMC member.

<TeamTable members={ppmcMembers} />

### New PPMC Members

- [Inviting New PPMC Members](./team/new-ppmc-member)

## Committers

Committers are contributors who have shown sustained commitment to the project through ongoing contributions of high quality and have been granted write access to the project repositories.

Committers in Apache Cloudberry (Incubating):
- Have write access to the project's repositories
- Review and merge pull requests from contributors
- Participate in discussions about the project's development
- Help maintain code quality and project standards
- Mentor new contributors and help grow the community

The path to becoming a committer typically involves:

1. **Consistent Contribution**: Make regular, high-quality contributions to the project over time.
2. **Community Involvement**: Participate in discussions, help other users, and engage with the community.
3. **Code Quality**: Demonstrate technical skill and an understanding of the project's architecture.
4. **Review Process**: Help review pull requests from other contributors.
5. **Nomination**: Current committers or PPMC members may nominate you based on your contributions.
6. **Vote**: The PPMC will vote on your nomination. If approved, you'll be invited to become a committer.

Committer status recognizes your contributions and grants you additional responsibilities in shaping the project's future. We encourage all contributors to aim for this role by consistently participating in the project's development.

### New Committers

- [Inviting New Committers](./team/new-committers)
- [Sign the ICLA](./team/sign-icla)
- [Setup the Apache email account](./team/setup-apache-email-account)

The listing includes new committers, excluding PPMC members above:

<TeamTable members={committers} />

## Core Contributors

Our journey began in 2022, built on the foundation of PostgreSQL and Greenplum Database, and we thank both communities for their invaluable contributions. Today, Apache Cloudberry (Incubating) is driven forward by the PPMC members and committers below.

<CoreContributors />
