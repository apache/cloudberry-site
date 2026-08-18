---
title: "OS Upgrade Considerations for PXF"
description: "Upgrading the operating system on PXF hosts."
source: https://cloudberry.apache.org/pxf/upgrade/upgrade_os
---

# OS Upgrade Considerations for PXF

If you plan to upgrade the operating system on your Apache Cloudberry cluster hosts and you are running PXF in your Apache Cloudberry installation, you must perform some PXF-specific actions before and after you upgrade the OS.

For the operating system versions supported by your Apache Cloudberry release, refer to [Supported Platforms](../intro/intro_pxf.md#supported-platforms).

The following procedures assume that you are upgrading the OS on a different set of hosts than that of the current/running Apache Cloudberry cluster.

## Pre-OS Upgrade Actions

Perform the following steps before you upgrade the operating system:

1. Upgrade PXF in your current cluster to the latest release and verify PXF operation **before** you commence the OS upgrade.

1. Retain the following PXF user configuration directories, typically located in `/usr/local/cloudberry-pxf`: `conf/`, `keytabs/`, `lib/`, and `servers/`. If you relocated `$PXF_BASE`, retain the configuration in that directory.

## Post-OS Upgrade Actions

After you upgrade the operating system and install, configure, and verify Apache Cloudberry on the new set of hosts, perform the following procedure:

1. Download a PXF package for the upgraded OS from the [Apache Cloudberry PXF releases](https://github.com/apache/cloudberry-pxf/releases). *You must download the same version of PXF as the version that was running on the original Apache Cloudberry cluster.*

1. Install PXF for the upgraded OS on all Apache Cloudberry hosts.

1. Copy the PXF configuration files from the original cluster to `/usr/local/cloudberry-pxf` on the upgraded OS Apache Cloudberry coordinator host. If you choose to [relocate $PXF_BASE](../administering/configuring/about_pxf_dir.md#relocating-pxf_base), copy the configuration to that directory instead.

1. Synchronize the PXF configuration to all hosts in the Apache Cloudberry cluster:

    ``` shell
    gpadmin@coordinator$ pxf cluster sync
    ```

1. Start PXF on each Apache Cloudberry host:

    ``` shell
    gpadmin@coordinator$ pxf cluster start
    ```

1. Verify that PXF can access each external data source by querying external tables that specify each PXF server configuration.
