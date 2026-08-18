---
title: "PXF Post-Upgrade Actions (cbupgrade)"
description: "Tasks to perform for PXF after an in-place Apache Cloudberry major version upgrade."
source: https://cloudberry.apache.org/pxf/upgrade/pxf_gpupgrade_post
---

# PXF Post-Upgrade Actions (cbupgrade)

:::warning Forward-looking reference

`cbupgrade` is the in-place major-version upgrade tool for Apache Cloudberry
(for example, upgrading from Apache Cloudberry 2.x to 3.x). It is **under active
development and is not supported yet**. This page is provided as a forward-looking
reference for how PXF is expected to participate in a `cbupgrade` workflow; the
exact commands and package layout may change before `cbupgrade` is released.
Do not use this procedure on a production cluster.

:::

If you are running PXF and plan to use `cbupgrade` for an in-place upgrade to a
new major version of Apache Cloudberry, you will perform these steps after
running `cbupgrade`.

In the steps below, `<old-version>` refers to the PXF installation that targeted
your previous Apache Cloudberry major version, and `<new-version>` refers to the
PXF installation that targets the new major version.

## Post-Upgrade Actions

Perform the following steps after running `cbupgrade`:

1. Determine if the `cbupgrade` process succeeded or failed.

1. **If the `cbupgrade` process failed**:

    1. Run the following commands to roll back your PXF installation to its previous state (before you ran the pre-upgrade script):

        ``` shell
        gpadmin@coordinator$ export GPHOME=<old-cloudberry-install-dir>
        gpadmin@coordinator$ /usr/local/cloudberry-pxf-<old-version>/bin/pxf-post-gpupgrade
        ```

        **Note:** The post-upgrade script must connect to your running Apache Cloudberry cluster. By default, it attempts to connect to the `gpadmin` database on `localhost` on port `5432` as the `gpadmin` user, no password. If you need to customize these settings, refer to [Customizing the Apache Cloudberry Connection Parameters](#customizing-the-apache-cloudberry-connection-parameters) for instructions on setting environment variables for this purpose.

    1. Restart the PXF that was running in your previous Apache Cloudberry installation.

        ``` shell
        gpadmin@coordinator$ /usr/local/cloudberry-pxf-<old-version>/bin/pxf cluster start
        ```

    1. You may choose to uninstall the PXF package for the new Apache Cloudberry major version.

    1. **Exit this procedure.**

1. **If the `cbupgrade` process succeeded, perform the remaining steps in this procedure.**

1. Configure PXF as though it was a fresh install in the new Apache Cloudberry major version:

    ``` shell
    gpadmin@coordinator$ export GPHOME=<new-cloudberry-install-dir>
    gpadmin@coordinator$ /usr/local/cloudberry-pxf-<new-version>/bin/pxf-post-gpupgrade
    ```

    **Note:** The post-upgrade script must connect to your running Apache Cloudberry cluster. By default, it attempts to connect to the `gpadmin` database on `localhost` on port `5432` as the `gpadmin` user, no password. If you need to customize these settings, refer to [Customizing the Apache Cloudberry Connection Parameters](#customizing-the-apache-cloudberry-connection-parameters) for instructions on setting environment variables for this purpose.

1. If you have not relocated your `$PXF_BASE`, you must copy the PXF configuration from the previous PXF install location to the new PXF install location. For example:

    ``` bash
    gpadmin@coordinator$ for dir in conf lib servers keytabs; do
        cp -aiv /usr/local/cloudberry-pxf-<old-version>/$dir/. /usr/local/cloudberry-pxf-<new-version>/$dir/
    done
    ```

1. Synchronize the PXF configuration from the Apache Cloudberry coordinator host to the standby and segment hosts:

    ``` shell
    gpadmin@coordinator$ /usr/local/cloudberry-pxf-<new-version>/bin/pxf cluster sync
    ```

1. Start the PXF installed for the new Apache Cloudberry major version.

    ``` shell
    gpadmin@coordinator$ /usr/local/cloudberry-pxf-<new-version>/bin/pxf cluster start
    ```

1. Update the `$PATH` in `.bashrc` or `.bash_profile` shell initialization scripts, replacing any occurrences of `/usr/local/cloudberry-pxf-<old-version>` with `/usr/local/cloudberry-pxf-<new-version>`.

1. Verify that PXF can access each external data source by querying external tables that specify each PXF server configuration.

1. (_Optional_) Uninstall the previous PXF package on every segment host in the cluster; this operation requires `sudo` privileges. For example:

    ``` shell
    $ yum remove cloudberry-pxf-<old-version>
    ```

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
