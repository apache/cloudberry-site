---
title: "PXF Pre-Upgrade Actions (cbupgrade)"
description: "Preparing PXF before an in-place Apache Cloudberry major version upgrade."
source: https://cloudberry.apache.org/pxf/upgrade/pxf_gpupgrade_pre
---

# PXF Pre-Upgrade Actions (cbupgrade)

:::warning Forward-looking reference

`cbupgrade` is the in-place major-version upgrade tool for Apache Cloudberry
(for example, upgrading from Apache Cloudberry 2.x to 3.x). It is **under active
development and is not supported yet**. This page is provided as a forward-looking
reference for how PXF is expected to participate in a `cbupgrade` workflow; the
exact commands and package layout may change before `cbupgrade` is released.
Do not use this procedure on a production cluster.

:::

If you are running PXF and plan to use `cbupgrade` for an in-place upgrade to a
new major version of Apache Cloudberry, you will perform these steps prior to
running `cbupgrade`.

## Pre-Upgrade Actions

Before you run `cbupgrade`, perform the following steps:

1. Upgrade PXF in your current cluster to the latest release; refer to the [Upgrading PXF](./upgrade_landing.md) documentation for instructions.

1. Note the PXF version.

1. Install the PXF package that targets the new Apache Cloudberry major version on every segment host in the cluster. You need only install the PXF package; you do not need to run the `pxf cluster prepare` or `pxf cluster register` commands.

1. Log in to the coordinator host of your current Apache Cloudberry cluster:

    ``` shell
    $ ssh gpadmin@<coordinator>
    gpadmin@coordinator$ 
    ```

1. Run the PXF pre-upgrade script for your current installation; substitute the file system path to your current Apache Cloudberry install directory:

    ``` shell
    gpadmin@coordinator$ export GPHOME=<current-cloudberry-install-dir>
    gpadmin@coordinator$ /usr/local/cloudberry-pxf-<current-version>/bin/pxf-pre-cbupgrade
    ```

    **Note:** The pre-upgrade script must connect to your running Apache Cloudberry cluster. By default, it attempts to connect to the `gpadmin` database on `localhost` on port `5432` as the `gpadmin` user (no password). If you need to customize these settings, refer to [Customizing the Apache Cloudberry Connection Parameters](#customizing-the-apache-cloudberry-connection-parameters) for instructions on setting environment variables for this purpose.

1. Stop PXF; note that PXF external tables will be inaccessible during the Apache Cloudberry upgrade process.

    ``` shell
    gpadmin@coordinator$ /usr/local/cloudberry-pxf-<current-version>/bin/pxf cluster stop
    ```

1. PXF is ready for upgrading by `cbupgrade`; return to the `cbupgrade` documentation to complete the major version upgrade.

## Customizing the Apache Cloudberry Connection Parameters

The PXF scripts that you run before and after `cbupgrade` must connect to your running Apache Cloudberry cluster. By default, the scripts attempt to connect to the `gpadmin` database on `localhost` on port `5432` as the `gpadmin` user, no password. If you need to customize these settings, you can do so by specifying the following environment variables:

| Environment Variable | Default Value | Description                                           |
|----------------------|---------------|-------------------------------------------------------|
| `$PGHOST`            | localhost     | The host name or IP address of the Apache Cloudberry coordinator host. |
| `$PGPORT`            | 5432          | The port number to connect to on the coordinator host.     |
| `$PGDATABASE`        | gpadmin       | The name of the database. |
| `$PGUSER`            | gpadmin       | The Apache Cloudberry user name.     |
| `$PGPASSWORD`        | _none_        | The password for the user. |

Refer to the [Environment Variables](https://www.postgresql.org/docs/9.4/libpq-envars.html) topic in the PostgreSQL documentation for more details.
