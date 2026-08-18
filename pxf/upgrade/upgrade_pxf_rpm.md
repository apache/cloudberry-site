---
title: "Upgrading the PXF Package"
description: "Upgrading PXF installed from an rpm or deb package."
source: https://cloudberry.apache.org/pxf/upgrade/upgrade_pxf_rpm
---

# Upgrading the PXF Package

If you installed PXF from the `rpm` or `deb` package and have configured and are using PXF in your current Apache Cloudberry installation, you must perform some upgrade actions when you install a new version of PXF.

The PXF upgrade procedure has two parts. You perform one procedure before, and one procedure after, you install the new version:

-   [Step 1: Complete the PXF Pre-Upgrade Actions](#step-1-complete-the-pxf-pre-upgrade-actions)
-   Install the new version of PXF
-   [Step 2: Upgrade PXF](#step-2-upgrade-pxf)

## Step 1: Complete the PXF Pre-Upgrade Actions

Perform this procedure before you upgrade to a new version of PXF:

1. Log in to the Apache Cloudberry coordinator host. For example:

    ``` shell
    $ ssh gpadmin@<coordinator>
    ```

1. Identify and note the version of PXF currently running in your Apache Cloudberry cluster:

    ``` shell
    gpadmin@coordinator$ pxf version
    ```

1. Stop PXF on each host as described in [Stopping PXF](../administering/cfginitstart_pxf.md#stopping-pxf).

1. Install the new version of PXF, identify and note the new PXF version number, and then continue your PXF upgrade with [Step 2: Upgrade PXF](#step-2-upgrade-pxf).

## Step 2: Upgrade PXF

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

1. Synchronize the PXF configuration from the coordinator host to the standby coordinator host and each Apache Cloudberry segment host. For example:

    ``` shell
    gpadmin@coordinator$ pxf cluster sync
    ```

1. Start PXF on each host as described in [Starting PXF](../administering/cfginitstart_pxf.md#starting-pxf).
