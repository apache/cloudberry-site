---
title: Inviting New Committers
description: This is the processes for adding new committers for Apache Cloudberry.
---

This process outlines the steps involved in adding new committers to Apache Cloudberry (Incubating), which follows the [Apache New Committer guidelines](https://community.apache.org/pmc/adding-committers.html#new-committer-process).

## New Committer Process

To go through the whole process of inviting a new committer, you need to be a Cloudberry PPMC member and go step by step according to the following table.

| Steps                          | Notes                                                                                                                                                                                                                                                                                                                                                                                                                                        | Templates                                                                                      |
|--------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------|
| **Discussion**                 | If any PPMC member recognize someone has met our [requirements](/team#committers) and can be the potential committer, please start a discussion in the private@cloudberry.apache.org. It's recommended to provide the reason why you want to propose the new candidate. The discussion will last at least 7 days.                                                                                                                            | [[DISCUSS]](#committer-discussion-template)                                                    |
| **Vote**                       | If the proposed candidate seems to be received positively by a majority of those responding, please start a new thread to vote the candidate. Let the Vote thread run for one week.                                                                                                                                                                                                                                                          | [[VOTE]](#committer-vote-template)                                                             |
| **Announcing results**         | No matter whether the result is positive or negative, please raise a new thread to summarize. If the result is negative, dismiss the following steps.                                                                                                                                                                                                                                                                                        | [[RESULT] [VOTE]](#committer-vote-results-template)                                            |
| **Sending the invitation**     | If the result is positive (achieved at least 3 +1 votes and no vetoes), then send a invitation to the new committer candidate. We give candidates a chance to decline committership in private. They can post a reply to the PMC mailing list. If the new committer candidate accepts, go to next. Otherwise, express the gratitude of Cloudberry community and stop here.                                                                   | [Invitation](#committer-invite-template)                                                       |
| **Committer Account Creation** | The new committer should file the ICLA file to the secretary@apache.org. Here are the guide on [signing the ICLA](/team/sign-icla). We need the mentors to help reqeust a new Apache ID for the new committer, see the template. After the new account is created (will receive *[NOTICE] Account created: xxx* from root@apache.org), then the new committer needs [set up the apache.org email account](/team/setup-apache-email-account). | [Request to create a Apache ID](#request-to-create-a-new-apache-id-for-new-committer-template) |
| **Welcome**                    | Send a welcome email to the new committer.                                                                                                                                                                                                                                                                                                                                                                                                   | [Welcome](#welcome-the-new-committer-to-the-community-template)                                |
| **Announcement**               | Announcing the new committer in the dev@cloudberry.apache.org mailing list.                                                                                                                                                                                                                                                                                                                                                                  | [[ANNOUNCEMENT]](#new-committer-announcement-template)                                         |
| **News**                       | Share the news accross the community channels.                                                                                                                                                                                                                                                                                                                                                                                               |                                                                                                |

## Email Templates

### Committer discussion template

```
To: private@cloudberry.apache.org
Subject: [DISCUSS] [Candidate Name] for Cloudberry Committer

Hi everyone,

I would like to nominate [Candidate Name] (GitHub ID: xxx) as a Cloudberry
Committer.

[State reasons that you believe they are a good candidate.]

[State contribution statistics, if available and relevant.]

This is still in the discussion phase. If everything goes
smoothly, we will proceed with the official vote in a separate email.

Looking forward to your thoughts and feedback.
```

### Committer vote template

```
To: private@cloudberry.apache.org
Subject: [VOTE] [Candidate Name] for Cloudberry Committer

Hi all,

This is a VOTE to add [Candidate Name] (GitHub Id: xxx) as a committer.

This has been discussed here: [Link to DISCUSS thread on
lists.apache.org] If you have more to add to the discussion, please do
so there, rather than in this VOTE thread.

-----

Please vote accordingly:

[+1] Yes, add this committer
[0] Abstain
[-1] No, do not add this committer (please provide a reason)

-----

Voting ends one week from today, until midnight UTC on YYYY-MM-DD
https://www.timeanddate.com/counters/customcounter.html?year=YYYY&month=MM&day=DD

See voting guidelines at
https://community.apache.org/pmc/adding-committers.html
```

### Committer vote results template

```
To: private@cloudberry.apache.org
Subject: [RESULT] [VOTE] [Candidate Name] for Cloudberry Committer

Hi Cloudberry PPMC,

The vote has now closed. The results are:

+1 N binding, M non-binding
 0 N binding, M non-binding
-1 N binding, M non-binding

The vote is ***successful***.

Then I'm going to invite [Candidate Name] to join us.

[Include link to VOTE thread on lists.apache.org]
```

### Committer invite template

```
To: NewCommiter@domain.com
Cc: private@cloudberry.apache.org
Subject: Invitation to become Cloudberry committer: [Candidate Name]

Hello [Candidate Name],

The Cloudberry Podling Project Management Committee (PPMC)
hereby offers you committer privileges to the project.

These privileges are offered on the understanding that you'll use them
reasonably and with common sense. We like to work on trust
rather than unnecessary constraints.

Being a committer enables you to more easily make
changes without needing to go through the patch
submission process.

Being a committer does not require you to
participate any more than you already do. It does
tend to make one even more committed. You will
probably find that you spend more time here.

Of course, you can decline and instead remain as a
contributor, participating as you do now.

This personal invitation is a chance for you to accept or decline in private.
Please let us know in reply to this message whether you accept or decline.

If you accept, you will need an Apache account (id) with privileges.
Please follow these instructions.

A. If you already have an ICLA on file:

    1. If you already have an Apache account, let us know your id and we
will grant you privileges on the project repositories.

    2. If you have previously sent an ICLA, let us know the email address
and public name used on the ICLA and your preferred Apache id, and
we will request your account.

    3. If the email address on the previously submitted ICLA is no longer
valid, let us know the email address and public name used on the new ICLA,
and your preferred Apache id. Continue to step B below and file your new ICLA.

Look to see if your preferred ID is already taken at
https://people.apache.org/committer-index.html

B. If there is not already an ICLA on file, you need to submit an ICLA:

    1. Details of the ICLA and the forms are found
    through this link: https://www.apache.org/licenses/#clas

    2. Instructions for its completion and return to
    the Secretary of the ASF are found at
    https://www.apache.org/licenses/contributor-agreements.html#submitting

    Do not copy the project or any other individual on your message
    to Secretary, as the form contains Personally Identifiable Information
    that should be kept private.

    3. When you complete the ICLA form, be sure to include in the form
    the Apache [Project] project and choose a
    unique Apache ID. Look to see if your preferred
    ID is already taken at
    https://people.apache.org/committer-index.html
    This will allow the Secretary to notify the PMC
    when your ICLA has been recorded.

When recording of your ICLA is noted, you will
receive a follow-up message with the next steps for
establishing you as a committer.

Yours,
The Apache Cloudberry PPMC
```

### Request to create a new Apache ID for new Committer template

```
To: private@cloudberry.apache.org
Subject: Request to create a new Apache ID for [Candidate Name]

Hi Dear Mentors,

We need your help to request a new Apache ID for our new committer [Candidate Name].

Name: [Candidate Name]
Apache ID: [Candidate Apache ID]
Email Address: [Candidate Email Address]

You can open this link to see his ICLA files:
https://whimsy.apache.org/officers/unlistedclas.cgi .

For reference: https://www.apache.org/dev/pmc.html#noncommitter

If the new account information is not provided on the ICLA, the
PMC chair is responsible to get the new committer's desired account ID
and request the new account.

Once the ICLA has been filed, use the ASF New Account Request form
(https://whimsy.apache.org/officers/acreq) to generate the request.
Should the PMC chair be unavailable for any reason, any ASF member can
act on their behalf.
```

### Welcome the new committer to the community template

```
To: NewCommitterID@apache.org, private@cloudberry.apache.org
Subject: Welcome, [Committer Name], New Committer!

Hello, [Committer Name],

As you know, the ASF Infrastructure has set up your committer account
with the username `[apacheID]`.

You will now be able to merge approved PRs on GitHub for this project.
(You'll need to associate your GitHub account with your Apache email
address.)

You can manage your account settings at https://id.apache.org/

The developer section of the website describes roles within the ASF and 
provides other resources:
  https://www.apache.org/foundation/how-it-works.html
  https://www.apache.org/dev/

The incubator also has some useful information for new committers
in incubating projects:
  https://incubator.apache.org/guides/committer.html
  https://incubator.apache.org/guides/ppmc.html

You now have expanded access to portions of the Whimsy toolset
specific to committers: https://whimsy.apache.org/

As an ASF committer, you now also have commit access to specific
sections of the ASF Foundation repository, as follows:

The general "committers" at:
https://svn.apache.org/repos/private/committers

Just as before you became a committer, participation in any ASF community
requires adherence to the ASF Code of Conduct:
  https://www.apache.org/foundation/policies/conduct.html

If you have any questions during this phase, then please
see the following resources:

Apache developer's pages: https://www.apache.org/dev/
Incubator committer guide: https://incubator.apache.org/guides/committer.html

Naturally, if you don't understand anything be sure to ask us on the
Cloudberry dev mailing list. Documentation is maintained by volunteers
and hence can be out-of-date and incomplete - of course you can now
help fix that.

A PPMC member will announce your election to the dev list, and we
encourage you to introduce yourself there.

[Your Name]
On behalf of the Cloudberry PPMC
```

### New committer announcement template

```
To: dev@cloudberry.apache.org
Subject: [ANNOUNCEMENT] New Committer: [Committer Name]

The Podling Project Management Committee (PPMC) for Apache Cloudberry
has invited [Committer Name] to become a committer and we are pleased
to announce that he has accepted.

[State New Committers's contribution, if available and relevant.]

Please join us in welcoming [Committer Name] to his new role and
responsibility in our project community.

[Your Name]
On behalf of the Cloudberry PPMC
```
