---
title: Inviting New PPMC Members
description: This is the process for adding new PPMC members for Apache Cloudberry.
---

This process outlines the steps involved in adding new PPMC (Podling Project Management Committee) members to Apache Cloudberry (Incubating), which follows the [Apache PMC Member guidelines](https://community.apache.org/pmc/adding-pmc-members.html).

## New PPMC Member Process

To go through the whole process of inviting a new PPMC member, you need to be a Cloudberry PPMC member and go step by step according to the following table.

| Steps                          | Notes                                                                                                                                                                                                                                                                                                                                                                                                                                        | Templates                                                                                      |
|--------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------|
| **Discussion**                 | Any PPMC member may propose a potential PPMC member. If you recognize someone (typically an existing committer) who has demonstrated leadership and commitment to the project, please start a discussion in the private@cloudberry.apache.org. It's recommended to provide the reason why you want to propose the new candidate. The discussion will last at least 7 days.                                                                    | [[DISCUSS]](#ppmc-member-discussion-template)                                                  |
| **Vote**                       | If the proposed candidate seems to be received positively by a majority of those responding, please start a new thread to vote the candidate. Let the Vote thread run for one week.                                                                                                                                                                                                                                                          | [[VOTE]](#ppmc-member-vote-template)                                                           |
| **Announcing results**         | No matter whether the result is positive or negative, please raise a new thread to summarize. If the result is negative, dismiss the following steps.                                                                                                                                                                                                                                                                                        | [[RESULT] [VOTE]](#ppmc-member-vote-results-template)                                          |
| **Sending the invitation**     | If the result is positive (achieved at least 3 +1 votes and no vetoes), then send an invitation to the new PPMC member candidate. We give candidates a chance to decline PPMC membership in private. They can post a reply to the private mailing list. If the new PPMC member candidate accepts, go to next. Otherwise, express the gratitude of Cloudberry community and stop here.                                                        | [Invitation](#ppmc-member-invite-template)                                                     |
| **Update roster**              | If the new PPMC member already has an Apache ID, use the [PPMC roster tool](https://whimsy.apache.org/roster/ppmc/cloudberry) on Whimsy to update the roster and grant them appropriate PPMC privileges.                                                                                                                                                                                                                                     |                                                                                                |
| **Welcome**                    | Send a welcome email to the new PPMC member.                                                                                                                                                                                                                                                                                                                                                                                                 | [Welcome](#welcome-the-new-ppmc-member-to-the-ppmc-template)                              |
| **Announcement**               | Announce the new PPMC member in the dev@cloudberry.apache.org mailing list.                                                                                                                                                                                                                                                                                                                                                                  | [[ANNOUNCEMENT]](#new-ppmc-member-announcement-template)                                       |
| **News**                       | Share the news across the community channels.                                                                                                                                                                                                                                                                                                                                                                                                |                                                                                                |

## Email Templates

### PPMC member discussion template

```
To: private@cloudberry.apache.org
Subject: [DISCUSS] New PPMC Member: [Candidate Name]

Hi PPMC members,

I would like to propose [Candidate Name] (GitHub ID: xxx) as a new
PPMC member of Apache Cloudberry.

[State reasons that you believe they are a good candidate, including their
contributions to the project, leadership qualities, and commitment to the
Apache Way.]

[State contribution statistics and community involvement, if available and relevant.]

Please remember that should this candidate be elected, they will have
access to our archives, and be able to read this, so phrase your
comments constructively with this in mind.
```

### PPMC member vote template

```
To: private@cloudberry.apache.org
Subject: [VOTE] New PPMC Member: [Candidate Name]

Hi PPMC members,

This is a VOTE to add [Candidate Name] (GitHub ID: xxx) as a PPMC 
member of Apache Cloudberry.

This has been discussed here: 
[Link to DISCUSS thread on lists.apache.org] 

If you have more to add to the discussion, please do so in the DISCUSS
thread rather than in this VOTE thread.

-----

Please vote accordingly:

[+1] Yes, add this person to the PPMC
[0] Abstain
[-1] No, do not add this person to the PPMC

-----

Voting ends one week from today, until midnight UTC on YYYY-MM-DD
https://www.timeanddate.com/counters/customcounter.html?year=YYYY&month=MM&day=DD

See voting guidelines at
https://community.apache.org/pmc/adding-pmc-members.html
```

### PPMC member vote results template

```
To: private@cloudberry.apache.org
Subject: [RESULT] [VOTE] New PPMC member: [Candidate Name]

Hi Cloudberry PPMC,

The vote has now closed. The results are:

+1 N binding, M non-binding
 0 N binding, M non-binding
-1 N binding, M non-binding

[Considering listing the names of who voted]

The vote is ***successful***.

VOTE thread:
[Include link to VOTE thread on lists.apache.org]

Then I'm going to invite [Candidate Name] to join the Cloudberry PPMC.
```

### PPMC member invite template

```
To: [Candidate's Apache Email Address]
Cc: private@cloudberry.apache.org
Subject: Invitation to become Cloudberry PPMC member: [PPMC Member Name]

Hello [Candidate Name],

The Cloudberry Podling Project Management Committee (PPMC)
hereby offers you membership in the PPMC. These privileges are offered on
the understanding that you'll use them reasonably and with common sense.
We like to work on trust rather than unnecessary constraints.

This personal invitation is a chance for you to accept or decline in private.
Please let us know in reply to this message whether you accept or decline.
Also, please refrain from sharing that you were invited before the official
announcement by the PPMC.

The rights and responsibilities are described here:
https://community.apache.org/pmc/responsibilities.html
If that's in any way unclear, please reach out to me or  any of the
other PPMC members for clarification, or to discuss this decision in more
detail.

[Your Name]
On behalf of the Apache Cloudberry PPMC
```

### Welcome the new PPMC member to the PPMC template

```
To: [PMC member ID]@apache.org, private@cloudberry.apache.org
Subject: Welcome to the PPMC, [PPMC Member Name]

Hello, [PPMC Member Name],

Welcome to the Cloudberry Podling Project Management Committee. As a PPMC
member, you are now empowered to help make decisions about, and guide the
future of, our project.

Please subscribe to the Cloudberry Podling Project Management
Committee mailing list private@cloudberry.apache.org. Do this by
sending an empty email to private-subscribe@cloudberry.apache.org and
following the instructions in the automated response you'll receive.

Please see the announcement email on the dev list.

It's a real pleasure to have you here, and we look forward to working
with you.

[Your Name]
On behalf of the Cloudberry PPMC
```

### New PPMC member announcement template

```
To: dev@cloudberry.apache.org
Subject: [ANNOUNCEMENT] New PPMC Member: [PPMC Member Name]

The Podling Project Management Committee (PPMC) for Apache Cloudberry
is delighted to announce that [PMC Member Name] has joined the PPMC!

[State New PPMC Member's contributions, leadership, and commitment to the
project, if available and relevant.]

The PPMC - Podling Project Management Committee - manages and guides the
direction of the project, and is responsible for inviting new
committers and PPMC members to steward the longevity of the project.
See https://community.apache.org/pmc/responsibilities.html if you're
interested in learning more about the rights and responsibilities of
PPMC members.

Please join us in welcoming [PPMC Member Name] to their new role in our
project!

[Your Name]
On behalf of the Apache Cloudberry PPMC
```
