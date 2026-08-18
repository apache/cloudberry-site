---
title: "pxf"
description: "pxf utility reference."
source: https://cloudberry.apache.org/pxf/ref/pxf
---

# pxf

Manage the PXF configuration and the PXF Service instance on the local Apache Cloudberry host.

## Synopsis

``` pre
pxf <command> [<option>]
```

where \<command\> is:

``` pre
cluster
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
version
```

## Description

The `pxf` utility manages the PXF configuration and the PXF Service instance on the local Apache Cloudberry host. You can use the utility to:

- Synchronize the PXF configuration from the coordinator host to the standby coordinator host or to a segment host.
- Start, stop, or restart the PXF Service instance on the coordinator host, standby coordinator host, or a specific segment host, or display the status of the PXF Service instance running on the coordinator, standby coordinator, or a segment host.
- Copy the PXF extension control file from a PXF installation on the host to the Apache Cloudberry installation on the host after an Apache Cloudberry upgrade.
- Prepare a new `$PXF_BASE` runtime configuration directory on the host.

(Use the [`pxf cluster`](./pxf-cluster.md) command to prepare a new `$PXF_BASE` on all hosts, copy the PXF extension control file to `$GPHOME` on all hosts, synchronize the PXF configuration to the Apache Cloudberry cluster, or to start, stop, or display the status of the PXF Service instance on all hosts in the cluster.)

## Commands

<dt>cluster</dt>
<dd>Manage the PXF configuration and the PXF Service instance on all Apache Cloudberry hosts. See `pxf cluster`.</dd>

<dt>help</dt>
<dd>Display the `pxf` management utility help message and then exit.</dd>

<dt>init (deprecated)</dt>
<dd>The command is equivalent to the `register` command.</dd>

<dt>migrate</dt>
<dd>Migrate the configuration in a legacy `$PXF_CONF` directory to `$PXF_BASE` on the host. When you run the command, you must identify the legacy configuration directory via an environment variable named `PXF_CONF`. PXF migrates the configuration to the current `$PXF_BASE`, copying and merging files and directories as necessary. <b>Note:</b> You must manually migrate any `pxf-log4j.properties` customizations to the `pxf-log4j2.xml` file.</dd>

<dt>prepare</dt>
<dd>Prepare a new `$PXF_BASE` directory on the host. When you run the command, you must identify the new PXF runtime configuration directory via an environment variable named `PXF_BASE`. PXF copies runtime configuration file templates and directories to this `$PXF_BASE`.</dd>

<dt>register</dt>
<dd>Copy the PXF extension files from the PXF installation on the host to the Apache Cloudberry installation on the host. This command requires that `$GPHOME` be set, and is run once after you install PXF 6.x the first time, or run when you upgrade your Apache Cloudberry installation.</dd>

<dt>reset (deprecated)</dt>
<dd>The command is a no-op.</dd>

<dt>restart</dt>
<dd>Restart the PXF Service instance running on the local coordinator host, standby coordinator host, or segment host.</dd>

<dt>start</dt>
<dd>Start the PXF Service instance on the local coordinator host, standby coordinator host, or segment host.</dd>

<dt>status</dt>
<dd>Display the status of the PXF Service instance running on the local coordinator host, standby coordinator host, or segment host.</dd>

<dt>stop  </dt>
<dd>Stop the PXF Service instance running on the local coordinator host, standby coordinator host, or segment host.</dd>

<dt>sync  </dt>
<dd>Synchronize the PXF configuration (`$PXF_BASE`) from the coordinator host to a specific Apache Cloudberry standby coordinator host or segment host. You must run `pxf sync` on the coordinator host. By default, this command updates files on and copies files to the remote. You can instruct PXF to also delete files during the synchronization; see Options below.</dd>

<dt>version  </dt>
<dd>Display the PXF version and then exit.</dd>

## Options

The `pxf sync` command, which you must run on the Apache Cloudberry coordinator host, takes the following option and argument:

<dt>&#8211;d | &#8211;&#8211;delete </dt>
<dd>Delete any files in the PXF user configuration on <code>&lt;gphost></code> that are not also present on the coordinator host. If you specify this option, you must provide it on the command line before <code>&lt;gphost></code>.</dd>

<dt>&lt;gphost> </dt>
<dd>The Apache Cloudberry host to which to synchronize the PXF configuration. Required. <code>&lt;gphost></code> must identify the standby coordinator host or a segment host.</dd>

## Examples

Start the PXF Service instance on the local Apache Cloudberry host:

``` shell
$ pxf start
```

## See Also

[`pxf cluster`](./pxf-cluster.md)
