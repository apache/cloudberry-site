---
title: "pxf cluster"
description: "pxf cluster utility reference."
source: https://cloudberry.apache.org/pxf/ref/pxf-cluster
---

# pxf cluster

Manage the PXF configuration and the PXF Service instance on all Apache Cloudberry hosts.

## Synopsis

``` pre
pxf cluster <command> [<option>]
```

where `<command>` is:

``` pre
help
init (deprecated)
migrate
prepare
register
reset (deprecated)
restart
start
status
stop
sync
```

## Description

The `pxf cluster` utility command manages PXF on the coordinator host, standby coordinator host, and on all Apache Cloudberry segment hosts. You can use the utility to:

- Start, stop, and restart the PXF Service instance on the coordinator host, standby coordinator host, and all segment hosts.
- Display the status of the PXF Service instance on the coordinator host, standby coordinator host, and all segment hosts.
- Synchronize the PXF configuration from the Apache Cloudberry coordinator host to the standby coordinator and to all segment hosts.
- Copy the PXF extension control file from the PXF installation on each host to the Apache Cloudberry installation on the host after an Apache Cloudberry upgrade.
- Prepare a new `$PXF_BASE` runtime configuration directory.
- Migrate a legacy `$PXF_CONF` configuration to `$PXF_BASE`.

`pxf cluster` requires a running Apache Cloudberry cluster. You must run the utility on the Apache Cloudberry coordinator host.

If you want to manage the PXF Service instance on a specific segment host, use the `pxf` utility. See [`pxf`](./pxf.md).

## Commands

<dt>help</dt>
<dd>Display the `pxf cluster` help message and then exit.</dd>

<dt>init (deprecated)</dt>
<dd>The command is equivalent to the `register` command.</dd>

<dt>migrate</dt>
<dd>Migrate the configuration in a legacy `$PXF_CONF` directory to `$PXF_BASE` on each Apache Cloudberry host. When you run the command, you must identify the legacy configuration directory via an environment variable named `PXF_CONF`. PXF migrates the configuration to `$PXF_BASE`, copying and merging files and directories as necessary. <b>Note:</b> You must manually migrate any `pxf-log4j.properties` customizations to the `pxf-log4j2.xml` file.</dd>

<dt>prepare</dt>
<dd>Prepare a new `$PXF_BASE` directory on each Apache Cloudberry host. When you run the command, you must identify the new PXF runtime configuration directory via an environment variable named `PXF_BASE`. PXF copies runtime configuration file templates and directories to this `$PXF_BASE`.</dd>

<dt>register</dt>
<dd>Copy the PXF extension control file from the PXF installation on each host to the Apache Cloudberry installation on the host. This command requires that `$GPHOME` be set, and is run once after you install PXF 6.x the first time, or run after you upgrade your Apache Cloudberry installation.</dd>

<dt>reset (deprecated) </dt>
<dd>The command is a no-op.</dd>

<dt>restart</dt>
<dd>Stop, and then start, the PXF Service instance on the coordinator host, standby coordinator host, and all segment hosts.</dd>

<dt>start</dt>
<dd>Start the PXF Service instance on the coordinator host, standby coordinator host, and all segment hosts.</dd>

<dt>status  </dt>
<dd>Display the status of the PXF Service instance on the coordinator host, standby coordinator host, and all segment hosts.</dd>

<dt>stop  </dt>
<dd>Stop the PXF Service instance on the coordinator host, standby coordinator host, and all segment hosts.</dd>

<dt>sync  </dt>
<dd>Synchronize the PXF configuration (`$PXF_BASE`) from the coordinator host to the standby coordinator host and to all Apache Cloudberry segment hosts. By default, this command updates files on and copies files to the remote. You can instruct PXF to also delete files during the synchronization; see Options below.</dd>
<dd>If you have updated the PXF user configuration or add new JAR or native library dependencies, you must also restart PXF after you synchronize the PXF configuration.</dd>

## Options

The `pxf cluster sync` command takes the following option:

<dt>&#8211;d | &#8211;&#8211;delete </dt>
<dd>Delete any files in the PXF user configuration on the standby coordinator host and segment hosts that are not also present on the coordinator host.</dd>

## Examples

Stop the PXF Service instance on the coordinator host, standby coordinator host, and all segment hosts:

``` shell
$ pxf cluster stop
```

Synchronize the PXF configuration to the standby coordinator host and all segment hosts, deleting files that do not exist on the coordinator host:

``` shell
$ pxf cluster sync --delete
```

## See Also

[`pxf`](./pxf.md)
