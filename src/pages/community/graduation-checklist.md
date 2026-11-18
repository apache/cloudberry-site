---
title: Graduation Checklist
description: A self-assessment of Apache Cloudberry (Incubating) against the Apache Project Maturity Model, with evidence for each item.
---

# Graduation Checklist

This page is a self-assessment of Apache Cloudberry (Incubating) against the
[Apache Project Maturity Model](https://community.apache.org/apache-way/apache-project-maturity-model.html).
It was written to support the
[graduation discussion](https://lists.apache.org/thread/5osoq0g2rzhgg30gxdrvqgzok9sqo12q)
that started on the dev mailing list in November 2026.

:::note Community draft

- **Assessment date:** November 16, 2026. Links were checked on that date.
  The statistics were collected on November 16 and 17, 2026. Both will go out
  of date.
- **Status:** this is a community draft. It is not a decision, and it has not
  been reviewed by the PPMC, the mentors, or the Incubator PMC.
- **Review:** please check it item by item and send corrections to
  [dev@cloudberry.apache.org](/community/mailing-lists), or open a pull
  request against
  [apache/cloudberry-site](https://github.com/apache/cloudberry-site).

:::

## How to read this page

Unless a different period is given, the numbers on this page cover the
incubation period: from 2024-10-11, the date the project entered incubation
according to the
[Incubator status page](https://incubator.apache.org/projects/cloudberry.html),
to 2026-11-15. The repositories were transferred to the ASF on 2024-11-05
with their history, so pull requests, issues, and discussions from before the
transfer are included. The dev mailing list was created on 2024-10-24, so its
numbers start on that date.

Each item of the maturity model (version 1.4, which added the Trademarks and
Branding section) has one of three statuses:

- **Yes**: the evidence we checked supports the item.
- **Partially met**: part of the item is supported, and a gap or an unverified
  point remains. The gap is described.
- **Not yet met**: the evidence does not support the item.

The item descriptions are quoted from the model page.

## Summary

| Category | Items | Yes | Partially met | Not yet met |
|--|--|--|--|--|
| Code | CD10 - CD50 | 5 | 0 | 0 |
| Licenses and Copyright | LC10 - LC50 | 5 | 0 | 0 |
| Releases | RE10 - RE50 | 5 | 0 | 0 |
| Quality | QU10 - QU50 | 5 | 0 | 0 |
| Community | CO10 - CO70 | 7 | 0 | 0 |
| Consensus Building | CS10 - CS50 | 5 | 0 | 0 |
| Independence | IN10 - IN20 | 2 | 0 | 0 |
| Trademarks and Branding | TB10 - TB40 | 2 | 2 | 0 |
| **Total** | **38** | **36** | **2** | **0** |

The open points, in short:

1. **Trademarks (TB20, TB30).** The project's former domain,
   `cloudberrydb.org`, lapsed after the donation and was registered again in
   January 2026 by an unrelated party. One trademark registration for the
   former name (CLOUDBERRYDB, China) is still held by the donor, and the PPMC
   is discussing how to handle it.

## Code

| ID | Item | Status | Assessment and evidence |
|--|--|--|--|
| CD10 | The project produces Open Source software for distribution to the public, at no charge. | **Yes** | The code is under the Apache License 2.0 and is available at no charge from [GitHub](https://github.com/apache/cloudberry) and the [Downloads page](/releases). |
| CD20 | Anyone can easily discover and access the project's code. | **Yes** | The repositories are public under the `apache` GitHub organization and are listed on the [Incubator status page](https://incubator.apache.org/projects/cloudberry.html): [cloudberry](https://github.com/apache/cloudberry), [cloudberry-site](https://github.com/apache/cloudberry-site), [cloudberry-backup](https://github.com/apache/cloudberry-backup), [cloudberry-go-libs](https://github.com/apache/cloudberry-go-libs), [cloudberry-pxf](https://github.com/apache/cloudberry-pxf), and [cloudberry-command-center](https://github.com/apache/cloudberry-command-center). Note: the `cloudberry-command-center` repository exists under `apache` but is still empty. The donated code is being transferred to the ASF; the November 2026 Incubator report gives the ASF Infra ticket as [INFRA-28370](https://issues.apache.org/jira/browse/INFRA-28370) (viewing it requires an ASF Jira login). Until the transfer is done, the code is in its original repository, [open-gpdb/yagpcc](https://github.com/open-gpdb/yagpcc), as recorded in the [IP clearance form](https://incubator.apache.org/ip-clearance/cloudberry-command-center.html). |
| CD30 | Anyone using standard, widely-available tools, can build the code in a reproducible way. | **Yes** | The build uses standard tools (GCC, GNU Make, Autoconf-generated `configure`). The steps are documented in the [build guide](/docs/build/build-and-install) and the same steps run in the public [CI workflows](https://github.com/apache/cloudberry/tree/main/.github/workflows) on every pull request. |
| CD40 | The full history of the project's code is available via a source code control system, in a way that allows anyone to recreate any released version. | **Yes** | The full Git history is public. Each release and release candidate has a tag, for example [`2.0.0-incubating`](https://github.com/apache/cloudberry/releases/tag/2.0.0-incubating), [`2.1.0-incubating`](https://github.com/apache/cloudberry/releases/tag/2.1.0-incubating), and [`2.2.0-incubating`](https://github.com/apache/cloudberry/releases/tag/2.2.0-incubating). |
| CD50 | The source code control system establishes the provenance of each line of code in a reliable way, based on strong authentication of the committer. When third parties contribute code, commit messages provide reliable information about the code provenance. | **Yes** | Only committers whose GitHub accounts are linked to their ASF accounts can push or merge. Changes go through pull requests; during incubation, 921 of 949 merged pull requests in the main repository had at least one approving review. Commits backported from PostgreSQL and Greenplum keep their original author and commit message. Code that arrives from outside goes through IP clearance, as with the [Command Center donation](https://lists.apache.org/thread/ns671nv1c9fsgcp35byx3h4ybdxksv61). |

## Licenses and Copyright

| ID | Item | Status | Assessment and evidence |
|--|--|--|--|
| LC10 | The Apache License, version 2.0, covers the released code. | **Yes** | See [LICENSE](https://github.com/apache/cloudberry/blob/main/LICENSE), [NOTICE](https://github.com/apache/cloudberry/blob/main/NOTICE), and [DISCLAIMER](https://github.com/apache/cloudberry/blob/main/DISCLAIMER). License headers are checked on every pull request by the [Apache RAT workflow](https://github.com/apache/cloudberry/blob/main/.github/workflows/apache-rat-audit.yml). |
| LC20 | Libraries that are mandatory dependencies of the project's code do not create more restrictions than the Apache License does. | **Yes** | Third-party code in the source tree is listed in `LICENSE` with its license text under [`licenses/`](https://github.com/apache/cloudberry/tree/main/licenses). Exceptions and clarifications are recorded in [README.apache.md](https://github.com/apache/cloudberry/blob/main/README.apache.md). Two 2.2.0 release candidates were cancelled after Incubator PMC members found license issues ([rc1](https://lists.apache.org/thread/xqkkmrp9knfgnoy1pmfcqxobs0m30b5l), [rc2](https://lists.apache.org/thread/cp38o038gc9q5lo930cnhp5ft7qllhxb)); these were fixed before [rc3 passed](https://lists.apache.org/thread/dytyjhlz3xo9hjwxm743wcx28rf5695b). The "Verify distribution rights" items on the Incubator status page were completed on 2026-11-04. |
| LC30 | The libraries mentioned in LC20 are available as Open Source software. | **Yes** | The dependencies named in the build guide and in `LICENSE` are open source. |
| LC40 | Committers are bound by an Individual Contributor Agreement (the "Apache iCLA") that defines which code they may commit and how they need to identify code that is not their own. | **Yes** | An ICLA is required before a committer account is created. See [Sign the ICLA](/team/sign-icla) and the "Establish a list of active committers" items on the [Incubator status page](https://incubator.apache.org/projects/cloudberry.html), completed on 2024-10-29. |
| LC50 | The project clearly defines and documents the copyright ownership of everything that the project produces. | **Yes** | `NOTICE` states the ASF copyright and the earlier Greenplum copyright. `README.apache.md` explains the historical copyright notices in code that came from Greenplum. The Incubator status page records that the papers transferring rights to the ASF were received on 2024-10-26. |

## Releases

| ID | Item | Status | Assessment and evidence |
|--|--|--|--|
| RE10 | Releases consist of source code, distributed using standard and open archive formats that are expected to stay readable in the long term. | **Yes** | Releases are `.tar.gz` source archives on [downloads.apache.org](https://downloads.apache.org/incubator/cloudberry/) (current release) and [archive.apache.org](https://archive.apache.org/dist/incubator/cloudberry/) (earlier releases), linked from the [Downloads page](/releases). |
| RE20 | The project's PMC (Project Management Committee, see CS10) approves each software release in order to make the release an act of the Foundation. | **Yes** | Each release was approved by a PPMC vote on the dev list and then by an Incubator PMC vote on general@incubator. 2.0.0: [PPMC](https://lists.apache.org/thread/7rw92td7smo9rjl0ms86dhz42mbg0pxx) (10 binding +1), [IPMC](https://lists.apache.org/thread/dsqbn726kkn5hvmk3s7wn3ws9psopz0k). 2.1.0: [PPMC](https://lists.apache.org/thread/xzqzp6scvxd00gfxx685nks7ykc7bpcr) (4 binding +1), [IPMC](https://lists.apache.org/thread/j9yoh66yx9j1ccdgqpys7blhoyqzshh7). 2.2.0: [PPMC](https://lists.apache.org/thread/992zbgg1ps2nsgsdkdh7ghrto8x3kpn8) (4 binding +1), [IPMC](https://lists.apache.org/thread/dytyjhlz3xo9hjwxm743wcx28rf5695b). Each IPMC vote had 3 binding +1 votes. |
| RE30 | Releases are signed and/or distributed along with digests that anyone can reliably use to validate the downloaded archives. | **Yes** | Every source archive has an `.asc` signature and a `.sha512` checksum. The [KEYS](https://downloads.apache.org/incubator/cloudberry/KEYS) file and the verification steps are on the [Downloads page](/releases#verifying-releases). |
| RE40 | The project can distribute convenience binaries alongside source code, but they are not Apache Releases, they are provided with no guarantee. | **Yes** | The Downloads page states that the source archive is the official release. RPM and DEB packages are published on the GitHub release page and are labelled as convenience binaries there, for example in the [2.2.0 release notes](https://github.com/apache/cloudberry/releases/tag/2.2.0-incubating). |
| RE50 | The project documents a repeatable release process so that someone new to the project can independently generate the complete set of artifacts required for a release. | **Yes** | The process is documented in the project wiki: [Release Process Overview](https://github.com/apache/cloudberry/wiki/Release-Process-Overview), [Source Release Checklist](https://github.com/apache/cloudberry/wiki/Source-Release-Checklist), and [Release Runbook](https://github.com/apache/cloudberry/wiki/Release-Runbook). The three releases had three different release managers (Ed Espino, Dianjin Wang, Leonid Borchuk), and the third was a first-time release manager. |

## Quality

| ID | Item | Status | Assessment and evidence |
|--|--|--|--|
| QU10 | The project is open and honest about the quality of its code. Various levels of quality and maturity for various modules are natural and acceptable as long as they are clearly communicated. | **Yes** | Bugs are reported and tracked in public [GitHub Issues](https://github.com/apache/cloudberry/issues), and anyone can raise quality concerns there or on the dev list. CI results are public, and each release has a detailed [changelog](/releases). Feature documentation states known limitations, for example the limitations section of the [PAX table format](/docs/operate-with-data/pax-table-format) page. |
| QU20 | The project puts a very high priority on producing secure software. | **Yes** | The repository runs weekly [Coverity](https://github.com/apache/cloudberry/blob/main/.github/workflows/coverity.yml), [SonarQube](https://github.com/apache/cloudberry/blob/main/.github/workflows/sonarqube.yml) scans, and [SQLancer](https://github.com/apache/cloudberry/blob/main/.github/workflows/sqlancer-cloudberry.yml) fuzzing on pull requests. Findings are discussed in public when they are not sensitive, for example the [SonarQube reports thread](https://lists.apache.org/thread/mvz1n14f8949v8kt1kqqv6yzn76c90h2). PostgreSQL fixes are backported to the stable branch. The pull request template asks authors to review security implications. |
| QU30 | The project provides a well-documented, secure and private channel to report security issues, along with a documented way of responding to them. | **Yes** | The [Security Policy](/community/security) and [SECURITY.md](https://github.com/apache/cloudberry/blob/main/SECURITY.md) direct reports to `security@apache.org` and point to the [ASF security process](https://www.apache.org/security/). |
| QU40 | The project puts a high priority on backwards compatibility and aims to document any incompatible changes and provide tools and documentation to help users transition to new features. | **Yes** | All 2.x releases keep the same on-disk format; see [Upgrade Within the 2.x Series](/docs/sys-admin/migration-and-upgrade/upgrade-within-2x). Differences from Greenplum 6 are listed in [Backward-incompatible changes from Greenplum 6](/docs/sys-admin/migration-and-upgrade/backward-incompatible-changes-from-greenplum-6). The pull request template has a "Breaking change" field. Removals planned for 3.0 were proposed in public first, for example [gpmapreduce](https://lists.apache.org/thread/bm0r1sxns0f8ddnf03xjzzh20rxv9c1h). |
| QU50 | The project strives to respond to documented bug reports in a timely manner. | **Yes** | Bug reports use an [issue template](https://github.com/apache/cloudberry/blob/main/.github/ISSUE_TEMPLATE/bug-report.yml) that labels them as bugs, and issues are sorted with type, priority, and status labels. During incubation, 308 issues were opened in the main repository and 199 were closed. Of the 108 issues filed by people who are not on the project roster, 84 (78%) have a reply from someone other than the reporter (automated comments excluded), and 9 are open without one. Where a reply was given, the median time to the first reply was about 15 hours. Most issues without a reply from another person (108 of 132) were opened by people on the roster. |

## Community

| ID | Item | Status | Assessment and evidence |
|--|--|--|--|
| CO10 | The project has a well-known homepage that points to all the information required to operate according to this maturity model. | **Yes** | [cloudberry.apache.org](https://cloudberry.apache.org/) links to downloads, documentation, the contribution guide, the team page, mailing lists, and the security policy. |
| CO20 | The community welcomes contributions from anyone who acts in good faith and in a respectful manner, and who adds value to the project. | **Yes** | See the [contribution guide](/contribute) and the [Code of Conduct](https://github.com/apache/cloudberry/blob/main/CODE_OF_CONDUCT.md). During incubation, 65 people had pull requests merged in the main repository, and 42 of them are not on the project roster. Frequent non-committer contributors are added as repository collaborators so that CI runs on their pull requests without waiting ([.asf.yaml](https://github.com/apache/cloudberry/blob/main/.asf.yaml)). |
| CO30 | Contributions include source code, documentation, constructive bug reports, constructive discussions, marketing and generally anything that adds value to the project. | **Yes** | The [contribution guide](/contribute/how-to-contribute) lists code, documentation, and community support. The path to committer described on the [Team page](/team#committers) counts community involvement, helping other users, and reviews, not only code. |
| CO40 | The community strives to be meritocratic and gives more rights and responsibilities to contributors who, over time, add value to the project. | **Yes** | Since entering incubation the PPMC has elected 11 new committers and 1 new PPMC member (Leonid Borchuk, April 2026). Dates are on the [Incubator status page](https://incubator.apache.org/projects/cloudberry.html). The new committers are listed on the Team page under four organizations, and two are listed as individuals. Note: only one committer has been promoted to the PPMC so far. |
| CO50 | The project documents how contributors can earn more rights such as commit access or decision power, and applies these principles consistently. | **Yes** | See the [Team page](/team), [Inviting New Committers](/team/new-committers), and [Inviting New PPMC Members](/team/new-ppmc-member). |
| CO60 | The community operates based on consensus of its members (see CS10) who have decision power. Dictators, benevolent or not, are not welcome in Apache projects. | **Yes** | Releases, the Command Center donation, and new committers were decided by votes. Technical direction is discussed in the open, for example the [3.0 release discussion](https://lists.apache.org/thread/z86b1mjqv7xrhmo2bgkdthmrwnrn5f59). Note: participation in votes is narrow. The 2.1.0 and 2.2.0 release votes and the [donation vote](https://lists.apache.org/thread/yyr3c79j28p0c9wo7qgybxn7f56to4s0) each had 4 binding votes, out of 25 PPMC members. |
| CO70 | The project strives to answer user questions in a timely manner. | **Yes** | Users ask questions on [GitHub Discussions](https://github.com/apache/cloudberry/discussions), the dev list, Slack, and Discord. Of the 126 GitHub Discussions opened during incubation, 110 have at least one comment. We did not measure response times on Slack, Discord, or WeChat. |

## Consensus Building

| ID | Item | Status | Assessment and evidence |
|--|--|--|--|
| CS10 | The project maintains a public list of its contributors who have decision power. The project's PMC (Project Management Committee) consists of those contributors. | **Yes** | The [Team page](/team) lists the PPMC members (including mentors) and the committers. The [Incubator status page](https://incubator.apache.org/projects/cloudberry.html) links to the ASF roster. |
| CS20 | Decisions require a consensus among PMC members and are documented on the project's main communications channel. The PMC takes community opinions into account, but the PMC has the final word. | **Yes** | Votes and their results are posted on the [dev list](https://lists.apache.org/list.html?dev@cloudberry.apache.org). GitHub Discussions are mirrored to the dev list. From its creation on 2024-10-24 to the end of the incubation period covered here, the list had 1,510 messages in 337 threads; 715 of the messages were mirrored from GitHub. |
| CS30 | The project uses documented voting rules to build consensus when discussion is not sufficient. | **Yes** | The project follows the [ASF voting rules](https://www.apache.org/foundation/voting.html). The [proposal guide](/contribute/proposal), the committer and PPMC guides, and the wiki [vote templates](https://github.com/apache/cloudberry/wiki/Vote-Templates) describe how votes are run. |
| CS40 | In Apache projects, vetoes are only valid for code commits. The person exercising the veto must justify it with a technical explanation, as per the Apache voting rules defined in CS30. | **Yes** | We found no case of a veto being used outside these rules. The [proposal guide](/contribute/proposal#decision) states that the project follows the [ASF voting process](https://www.apache.org/foundation/voting.html): votes on proposals are procedural votes decided by majority, and a -1 on a code change from a committer is a veto that is valid only with a technical justification. |
| CS50 | All "important" discussions happen asynchronously in written form on the project's main communications channel. Offline, face-to-face or private discussions that affect the project are also documented on that channel. | **Yes** | Proposals, release planning, and votes take place on the dev list and on GitHub Discussions mirrored to it. The [bi-weekly meetings](/community/bi-weekly-meetings) are open to everyone and are not used to make decisions; their minutes and recordings are public and linked from the website and the community calendar. Slack, Discord, and WeChat are used for day-to-day questions and chat; decisions that affect the project are taken on the dev list. |

## Independence

| ID | Item | Status | Assessment and evidence |
|--|--|--|--|
| IN10 | The project is independent from any corporate or organizational influence. | **Yes** | No single organization controls the project. When the project entered incubation, 11 of the 21 PPMC members (mentors excluded) were listed under the donor, HashData; today the largest group is 5 of 22, and no organization has a majority. The breakdown by organization is in the [graduation discussion](https://lists.apache.org/thread/5osoq0g2rzhgg30gxdrvqgzok9sqo12q) on the dev list; affiliations are self-reported on the [Team page](/team). The one PPMC member elected during incubation is from Yandex Cloud, and since September 2025 half of the new committers (4 of 8) have come from outside HashData. The three releases were managed by people from three organizations: 2.0.0 by Ed Espino (Synx Data Labs), 2.1.0 by Dianjin Wang (HashData), and 2.2.0 by Leonid Borchuk (Yandex Cloud). Most code contributions during incubation came from people at HashData, with Yandex Cloud second, and 45 of the 69 people who had pull requests merged into the four code repositories are not committers. Decisions are taken on the dev list. |
| IN20 | Contributors act as themselves, not as representatives of a corporation or organization. | **Yes** | Votes, reviews, and decisions are made by individuals, and committer and PPMC status belongs to the person, not the employer. The PPMC will continue to reinforce individual participation. |

## Trademarks and Branding

| ID | Item | Status | Assessment and evidence |
|--|--|--|--|
| TB10 | The project uses "Apache Foo™" as the project and software product name consistently, with appropriate trademark attributions. | **Yes** | The website, the repositories, and the release artifacts use "Apache Cloudberry (Incubating)". The home page uses the ™ mark, and the footer carries the incubation disclaimer and a trademark attribution that names Apache Cloudberry and its logo. |
| TB20 | The project's primary homepage is at projectname.apache.org. When exceptions exist to use alternate domains for any purpose, any non-apache.org domain names are owned by the ASF. | **Partially met** | The homepage is [cloudberry.apache.org](https://cloudberry.apache.org/), and it is the only address the project has promoted during incubation. **Gap**: `cloudberrydb.org`, the domain the project used before it joined the ASF, is not controlled by the project or the ASF. According to the PPMC member who handled it, the donor stopped renewing the domain in 2025, after the donation to the ASF. Until that registration ended, `cloudberrydb.org` redirected to `cloudberry.apache.org`. WHOIS shows that it was registered again on 2026-01-31 through NameCheap with a privacy service, so the current registrant is an unrelated party that we cannot identify. It serves a page titled "Cloud Berry DB". Checked on 2026-11-17: the main repository, the website repository, and the Apache Cloudberry blog contain no links to the old domain. Some third-party pages, such as old mirrors and directories, may still point to it. Also, the community calendar is held under a Gmail account, not an ASF resource. |
| TB30 | The ASF has trademark rights, including any registrations, to the project name, logo, and any other major branding elements. | **Partially met** | The podling name search was approved ([PODLINGNAMESEARCH-227](https://issues.apache.org/jira/browse/PODLINGNAMESEARCH-227)), and the logo is hosted on the [ASF logos site](https://www.apache.org/logos/#cloudberry). One trademark registration related to the project's former name exists outside the ASF: the word mark CLOUDBERRYDB in China, registration No. 76837513, Class 42. It was registered on 2024-09-07, before the project entered the Incubator, and is valid until 2034-09-06. It is held by the donor, HashData. Source: the official [CNIPA trademark search](https://wcjs.sbj.cnipa.gov.cn) (data as of 2026-11-15, status registered) and Trademark Gazette No. 1902. According to the donor, it holds no other trademark registration or application related to the project: none in another class, none for the logo, and none for "Cloudberry Database". The donation used the standard [ASF Software Grant Agreement](https://www.apache.org/licenses/software-grant-template.pdf), which grants copyright and patent licenses and contains no trademark license or assignment, so this registration was not transferred to the ASF. The PPMC is discussing how to resolve this (assignment to the ASF or cancellation) and will consult ASF Brand Management. This is to be resolved before graduation. |
| TB40 | The project monitors for any major misuses of their project's brand by others, and reports any potential misuses to Brand Management. | **Yes** | The PPMC is responsible for the podling's brand, as stated in the [November 2026 Incubator report](https://cwiki.apache.org/confluence/display/INCUBATOR/November2026). The site has [brand guidelines](/community/brand) and a [Powered By](/powered-by) page, and the project follows the [ASF process for reporting misuse](https://www.apache.org/foundation/marks/reporting). The former domain described in TB20 was identified during this assessment and is being brought to the PPMC for review. |

## Other items to watch before graduation

These are not maturity model items, but they came up while collecting the
evidence.

- **Mentor sign-off.** In August 2026 the Incubator noted that the podling's
  report had
  [no mentor sign-off](https://lists.apache.org/thread/r22qmtml3njp8mj9kdqtjtcr3gqp65pr)
  at submission time. On the assessment date the November 2026 report on the
  Incubator wiki also showed no sign-off yet.
- **Incubator status page.** The project setup, copyright, and distribution
  rights items on the
  [status page](https://incubator.apache.org/projects/cloudberry.html) are
  dated as complete. The "Incubation" and "Exit" sections have no entries
  yet.
- **Command Center.** The donation vote and the IP clearance are complete.
  The `apache/cloudberry-command-center` repository has been created but was
  still empty on the assessment date; the transfer of the code is tracked in
  [INFRA-28370](https://issues.apache.org/jira/browse/INFRA-28370), as cited
  in the November report.

## References

- [Apache Project Maturity Model](https://community.apache.org/apache-way/apache-project-maturity-model.html)
- [Incubator graduation guide](https://incubator.apache.org/guides/graduation.html)
- [Graduation discussion on the dev list](https://lists.apache.org/thread/5osoq0g2rzhgg30gxdrvqgzok9sqo12q)
- [Cloudberry Incubator status page](https://incubator.apache.org/projects/cloudberry.html)
