---
title: "About the PXF Deployment Topology"
description: "PXF deployment topologies."
source: https://cloudberry.apache.org/pxf/administering/deployment_topos
---

# About the PXF Deployment Topology

The default PXF deployment topology is co-located; you install PXF on each Apache Cloudberry host, and the PXF Service starts and runs on each Apache Cloudberry segment host.

You manage the PXF services deployed in a co-located topology using the [pxf cluster](../ref/pxf-cluster.md) commands.

## Alternate Deployment Topology

Running the PXF Service on non-Apache Cloudberry hosts is an alternate deployment topology. If you choose this topology, you must install PXF on both the non-Apache Cloudberry hosts and on all Apache Cloudberry hosts.

In the alternate deployment topology, you manage the PXF services individually using the [pxf](../ref/pxf.md) command on each host; you can not use the `pxf cluster` commands to collectively manage the PXF services in this topology.

If you choose the alternate deployment topology, you must explicitly configure each Apache Cloudberry host to identify the host and listen address on which the PXF Service is running. These procedures are described in [Configuring the Host](./advanced-config/cfghostport.md#configuring-the-host) and [Configuring the Listen Address](././advanced-config/cfghostport.md#configuring-the-listen-address).
