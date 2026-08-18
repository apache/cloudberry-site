---
title: "Upgrading from an Earlier PXF Release"
description: "Upgrading PXF between releases."
source: https://cloudberry.apache.org/pxf/upgrade/upgrade_pxf
---

# Upgrading from an Earlier PXF Release

If you have installed a PXF `rpm` or `deb` package and have configured and are using PXF in your current Apache Cloudberry installation, you must perform some upgrade actions when you install a new version of PXF.

The PXF upgrade procedure has three steps. You perform one pre-install procedure, the install itself, and then a post-install procedure:

-   [Step 1: Perform the PXF Pre-Upgrade Actions](#step-1-perform-the-pxf-pre-upgrade-actions)
-   [Step 2: Install the New PXF](#step-2-install-the-new-pxf)
-   [Step 3: Complete the PXF Upgrade](#step-3-complete-the-pxf-upgrade)

## Step 1: Perform the PXF Pre-Upgrade Actions

Perform this procedure before you upgrade to a new version of PXF:

1. Log in to the Apache Cloudberry coordinator host. For example:

    ``` shell
    $ ssh gpadmin@<coordinator>
    ```

1. Identify and note the version of PXF currently running in your Apache Cloudberry cluster:

    ``` shell
    gpadmin@coordinator$ pxf version
    ```

1. Stop PXF on each Apache Cloudberry host as described in [Stopping PXF](../administering/cfginitstart_pxf.md#stopping-pxf):

    ``` shell
    gpadmin@coordinator$ pxf cluster stop
    ```

1. (Optional, Recommended) Back up the PXF user configuration files in `$PXF_BASE`. For example, if `PXF_BASE=/usr/local/cloudberry-pxf`:

    ``` shell
    gpadmin@coordinator$ cp -avi /usr/local/cloudberry-pxf pxf_base.bak
    ```

## Step 2: Install the New PXF

Install the new version of PXF, and identify and note the new PXF version number.

## Step 3: Complete the PXF Upgrade

After you install the new version of PXF, perform the following procedure:

1. Log in to the Apache Cloudberry coordinator host. For example:

    ``` shell
    $ ssh gpadmin@<coordinator>
    ```

1. Register the new version of the `pxf` extension files with Apache Cloudberry (see [pxf cluster register](../ref/pxf-cluster.md)). `$GPHOME` must be set when you run this command:

    ``` shell
    gpadmin@coordinator$ pxf cluster register
    ```

1. Update the `pxf` extension in every Apache Cloudberry database in which you are using PXF. A database superuser or the database owner must run this SQL command in the `psql` subsystem or in an SQL script:

    ``` sql
    ALTER EXTENSION pxf UPDATE;
    ```

1. Review the [CHANGELOG](/releases) for the release you are upgrading to. If a release introduces new configuration properties or changes default behavior, update the affected `pxf-site.xml`, `pxf-application.properties`, or related files in `$PXF_BASE` accordingly.

1. Synchronize the PXF configuration from the coordinator host to the standby coordinator host and each Apache Cloudberry segment host. For example:

    ``` shell
    gpadmin@coordinator$ pxf cluster sync
    ```

1. Start PXF on each Apache Cloudberry host as described in [Starting PXF](../administering/cfginitstart_pxf.md#starting-pxf):

    ``` shell
    gpadmin@coordinator$ pxf cluster start
    ```
