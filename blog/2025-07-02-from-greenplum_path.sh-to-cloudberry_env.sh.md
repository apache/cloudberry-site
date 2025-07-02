---
slug: "from-greenplum-path.sh-to-cloudberry-env.sh"
title: "Goodbye `greenplum_path.sh`, Hello `cloudberry-env.sh`: A Phased Transition Plan"
description: "Renaming legacy scripts such as greenplum_path.sh to cloudberry-env.sh."
authors: [asfcloudberry]
tags: [Announcement]
image: /img/blog/202507-notice-cloudberry-env.png
---

To the Apache Cloudberry Community,

This post outlines our plan to rename legacy user-facing scripts such as `greenplum_path.sh`, aligning them with Apache Cloudberry’s official brand identity and complying with ASF trademark policy. This will be a two-step process designed to be transparent and minimize disruption for our users.

## Background: Why This Change is Necessary

As Apache Cloudberry (Incubating) matures, establishing a clear and independent brand identity is essential. While our project originated from Greenplum, it is now independently governed under the ASF Incubator, with a distinct development roadmap.

The "Greenplum" name is a registered trademark owned by Broadcom Inc.. To comply with ASF policies and avoid potential trademark confusion, the PPMC reached a consensus through the discussion that took place on the Dev@ mailing list and GitHub issues to rename legacy user-facing scripts that use the `Greenplum` name term.

## A Phased Approach to the Transition

To manage this transition smoothly, we will implement the changes in two phases:

### Phase 1: Non-Breaking Notice (Release 2.0)

The first step has been implemented in Pull Request [#1189](https://github.com/apache/cloudberry/pull/1189) and will be included in the upcoming Apache Cloudberry 2.0 release.

- **What's Changing**: When you run `source greenplum_path.sh`, you will see a notice clarifying Apache Cloudberry’s independence from Broadcom’s Greenplum, like the following output:

    ```bash
    [gpadmin@cloudberry]$ source /usr/local/cloudberry-db/greenplum_path.sh

    # --------------------------------------------------------------------
    # NOTICE from the Apache Cloudberry PPMC
    # --------------------------------------------------------------------
    # This file uses the term 'greenplum' to maintain compatibility with
    # earlier versions of Apache Cloudberry, which was originally called
    # Greenplum. This usage does not refer to VMware Tanzu Greenplum,
    # nor does it imply that Apache Cloudberry (Incubating) is affiliated
    # with, endorsed by, or sponsored by Broadcom Inc.
    #
    # This file will be renamed in a future Apache Cloudberry release to
    # ensure compliance with Apache Software Foundation guidelines.
    # We will announce the change on the project mailing list and website.
    #
    # See: https://lists.apache.org/thread/b8o974mnnqk6zpy86dgll2pgqcvqgnwm
    # --------------------------------------------------------------------
    ```

- **Impact**: This is a **non-breaking change**. Your scripts and workflows will continue to function as before. This step offers immediate brand clarification and serves as advance notice of the upcoming rename.

### Phase 2: Full Rename (Targeted for Release 2.1)

The second step will complete the brand alignment.

* **What's Changing**: We plan to formally rename `greenplum_path.sh` to `cloudberry-env.sh`. This effort may also include a broader review of related configuration scripts and internal naming for consistency.
* **Impact**: This will be a **breaking change**. You need to run the command `source cloudberry-env.sh` instead of `source greenplum_path.sh`. The change will be documented in the release notes, along with an optional alias method in the documentation, like: 

    ```bash 
    sudo ln -s /usr/local/cloudberry-db/cloudberry-env.sh /usr/local/cloudberry-db/greenplum_path.sh
    ```

### What This Means for You

- **For the 2.0 Release**: No action is required. Simply be aware that the notice will now appear when setting up your environment.
- **For the 2.1 Release**: Plan to update your scripts to use the new `cloudberry-env.sh` file.

## Moving Forward

This initiative lays a stronger foundation for the project's future as we continue our journey toward becoming a Top-Level Project. We thank everyone who participated in the discussion and the ASF legal team for the valuable inputs and advice.

Thank you for your support and understanding.

## Related Discussion

- GitHub PR: https://github.com/apache/cloudberry/pull/1189
- Mailing list thread: https://lists.apache.org/thread/b8o974mnnqk6zpy86dgll2pgqcvqgnwm

## Join Us

- Visit the website: [https://cloudberry.apache.org](https://cloudberry.apache.org)
- Follow us on GitHub: [https://github.com/apache/cloudberry](https://github.com/apache/cloudberry)
- Join Slack workspace: [https://apache-cloudberry.slack.com](https://apache-cloudberry.slack.com)
- Dev mailing list: to subscribe and check the archives, please visit [here](/community/mailing-lists)
