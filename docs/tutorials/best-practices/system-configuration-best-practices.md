---
title: System Configuration
---

# System Configuration Best Practices

Requirements and best practices for system administrators who are configuring Apache Cloudberry cluster hosts.

Configuration of the Apache Cloudberry cluster is usually performed as root.

## Configure the timezone

Apache Cloudberry selects a timezone to use from a set of internally stored PostgreSQL timezones. The available PostgreSQL timezones are taken from the Internet Assigned Numbers Authority (IANA) Time Zone Database, and Apache Cloudberry updates its list of available timezones as necessary when the IANA database changes for PostgreSQL.

Cloudberry selects the timezone by matching a PostgreSQL timezone with the user specified time zone, or the host system time zone if no time zone is configured. For example, when selecting a default timezone, Cloudberry uses an algorithm to select a PostgreSQL timezone based on the host system timezone files. If the system timezone includes leap second information, Apache Cloudberry cannot match the system timezone with a PostgreSQL timezone. In this case, Apache Cloudberry calculates a "best match" with a PostgreSQL timezone based on information from the host system.

As a best practice, configure Apache Cloudberry and the host systems to use a known, supported timezone. This sets the timezone for the Apache Cloudberry coordinator and segment instances, and prevents Apache Cloudberry from recalculating a "best match" timezone each time the cluster is restarted, using the current system timezone and Cloudberry timezone files (which may have been updated from the IANA database since the last restart). Use the `gpconfig` utility to show and set the Apache Cloudberry timezone. For example, these commands show the Apache Cloudberry timezone and set the timezone to `US/Pacific`.

```shell
gpconfig -s TimeZone
gpconfig -c TimeZone -v 'US/Pacific'
```

You must restart Apache Cloudberry after changing the timezone. The command `gpstop -ra` restarts Apache Cloudberry. The catalog view `pg_timezone_names` provides Apache Cloudberry timezone information.

## Configure the file system

XFS is the file system used for Apache Cloudberry data directories. Use the mount options described in [Configuring Your Systems](../../cbdb-op-prepare-to-deploy.md).

## Configure ports

See the [recommended OS parameter settings](../../cbdb-op-prepare-to-deploy.md#set-system-parameters) for further details.

Set up `ip_local_port_range` so it does not conflict with the Apache Cloudberry port ranges. For example, setting this range in `/etc/sysctl.conf`:

```conf
net.ipv4.ip_local_port_range = 10000  65535
```

you could set the Apache Cloudberry base port numbers to these values.

```conf
PORT_BASE = 6000
MIRROR_PORT_BASE = 7000
```

See the [Recommended OS Parameters Settings](../../cbdb-op-prepare-to-deploy.md#set-system-parameters) for further details.

## Configure I/O

Set the blockdev read-ahead size to 16384 on the devices that contain data directories. This command sets the read-ahead size for `/dev/sdb`.

```shell
/sbin/blockdev --setra 16384 /dev/sdb
```

This command returns the read-ahead size for `/dev/sdb`.

```shell
# /sbin/blockdev --getra /dev/sdb
16384
```

The deadline IO scheduler should be set for all data directory devices.

```shell
# cat /sys/block/sdb/queue/scheduler
noop anticipatory [deadline] cfq 
```

The maximum number of OS files and processes should be increased in the `/etc/security/limits.conf` file.

```conf
* soft  nofile 524288
* hard  nofile 524288
* soft  nproc 131072
* hard  nproc 131072
```

## Configure OS memory

The Linux sysctl `vm.overcommit_memory` and `vm.overcommit_ratio` variables affect how the operating system manages memory allocation.

`vm.overcommit_memory` determines the method the OS uses for determining how much memory can be allocated to processes. This should be always set to 2, which is the only safe setting for the database.

> **Note** For information on configuration of overcommit memory, refer to:

- [https://en.wikipedia.org/wiki/Memory_overcommitment](https://www.google.com/url?q=https://en.wikipedia.org/wiki/Memory_overcommitment&sa=D&ust=1499719618717000&usg=AFQjCNErcHO7vErv4pn9fIhCxrR0XRiknA)
- [https://www.kernel.org/doc/Documentation/vm/overcommit-accounting](https://www.google.com/url?q=https://www.kernel.org/doc/Documentation/vm/overcommit-accounting&sa=D&ust=1499719618717000&usg=AFQjCNEmu5tZutAaN1KCSlIwz4hwqihkOQ)

`vm.overcommit_ratio` is the percent of RAM that is used for application processes. The default is 50 on Red Hat Enterprise Linux.

Do not enable huge pages in the operating system.

## Configure shared memory

Apache Cloudberry uses shared memory to communicate between `postgres` processes that are part of the same `postgres` instance. The following shared memory settings should be set in `sysctl` and are rarely modified.

```conf
kernel.shmmax = 810810728448
kernel.shmmni = 4096
kernel.shmall = 197951838
```

## Determine the number of segments per host

Determining the number of segments to run on each segment host has immense impact on overall system performance. The segments share the host's CPU cores, memory, and NICs with each other and with other processes running on the host. Over-estimating the number of segments a server can accommodate is a common cause of suboptimal performance.

The factors that must be considered when choosing how many segments to run per host include the following:

- Number of cores
- Amount of physical RAM installed in the server
- Number of NICs
- Amount of storage attached to server
- Mixture of primary and mirror segments
- ETL processes that will run on the hosts
- Non-Cloudberry processes running on the hosts

## Configure resource queue segment memory

The `gp_vmem_protect_limit` server configuration parameter specifies the amount of memory that all active postgres processes for a single segment can consume at any given time. Queries that exceed this amount will fail. Use the following calculations to estimate a safe value for `gp_vmem_protect_limit`.

1. Calculate `gp_vmem`, the host memory available to Apache Cloudberry.
    - If the total system memory is less than 256 GB, use this formula:

        ```shell
        gp_vmem = ((SWAP + RAM) – (7.5GB + 0.05 * RAM)) / 1.7
        ```

    - If the total system memory is equal to or greater than 256 GB, use this formula:

        ```shell
        gp_vmem = ((SWAP + RAM) – (7.5GB + 0.05 * RAM)) / 1.17
        ```

    where `SWAP` is the host's swap space in GB and `RAM` is the RAM installed on the host in GB.

2. Calculate `max_acting_primary_segments`. This is the maximum number of primary segments that can be running on a host when mirror segments are activated due to a segment or host failure on another host in the cluster. With mirrors arranged in a 4-host block with 8 primary segments per host, for example, a single segment host failure would activate two or three mirror segments on each remaining host in the failed host's block. The `max_acting_primary_segments` value for this configuration is 11 (8 primary segments plus 3 mirrors activated on failure).
3. Calculate `gp_vmem_protect_limit` by dividing the total Apache Cloudberry memory by the maximum number of acting primaries:

    ```shell
    gp_vmem_protect_limit = gp_vmem / max_acting_primary_segments
    ```

    Convert to megabytes to find the value to set for the `gp_vmem_protect_limit` system configuration parameter.


For scenarios where a large number of workfiles are generated, adjust the calculation for `gp_vmem` to account for the workfiles.

- If the total system memory is less than 256 GB:

    ```shell
    gp_vmem = ((SWAP + RAM) – (7.5GB + 0.05 * RAM - (300KB * total_#_workfiles))) / 1.7
    ```

- If the total system memory is equal to or greater than 256 GB:

    ```shell
    gp_vmem = ((SWAP + RAM) – (7.5GB + 0.05 * RAM - (300KB * total_#_workfiles))) / 1.17
    ```

You can calculate the value of the `vm.overcommit_ratio` operating system parameter from the value of `gp_vmem`:

```shell
vm.overcommit_ratio = (RAM - 0.026 * gp_vmem) / RAM
```

See [OS Memory Configuration](#configure-os-memory) for more about about `vm.overcommit_ratio`.

## Configure resource queue statement memory

The `statement_mem` server configuration parameter is the amount of memory to be allocated to any single query in a segment database. If a statement requires additional memory it will spill to disk. Calculate the value for `statement_mem` with the following formula:

`(gp_vmem_protect_limit * .9) / max_expected_concurrent_queries`

For example, for 40 concurrent queries with `gp_vmem_protect_limit` set to 8GB (8192MB), the calculation for `statement_mem` would be:

`(8192MB * .9) / 40 = 184MB`

Each query would be allowed 184MB of memory before it must spill to disk.

To increase `statement_mem` safely you must either increase `gp_vmem_protect_limit` or reduce the number of concurrent queries. To increase `gp_vmem_protect_limit`, you must add physical RAM and/or swap space, or reduce the number of segments per host.

Note that adding segment hosts to the cluster cannot help out-of-memory errors unless you use the additional hosts to decrease the number of segments per host.

Spill files are created when there is not enough memory to fit all the mapper output, usually when 80% of the buffer space is occupied.

## Configure resource queue spill files

Apache Cloudberry creates *spill files* (also called *workfiles*) on disk if a query is allocated insufficient memory to run in memory. A single query can create no more than 100,000 spill files, by default, which is sufficient for the majority of queries.

You can control the maximum number of spill files created per query and per segment with the configuration parameter `gp_workfile_limit_files_per_query`. Set the parameter to 0 to allow queries to create an unlimited number of spill files. Limiting the number of spill files permitted prevents run-away queries from disrupting the system.

A query could generate a large number of spill files if not enough memory is allocated to it or if data skew is present in the queried data. If a query creates more than the specified number of spill files, Apache Cloudberry returns this error:

`ERROR: number of workfiles per query limit exceeded`

Before raising the `gp_workfile_limit_files_per_query`, try reducing the number of spill files by changing the query, changing the data distribution, or changing the memory configuration.

The `gp_toolkit` schema includes views that allow you to see information about all the queries that are currently using spill files. This information can be used for troubleshooting and for tuning queries:

- The `gp_workfile_entries` view contains one row for each operator using disk space for workfiles on a segment at the current time. See [How to Read Explain Plans](tuning_queries.html) for information about operators.
- The `gp_workfile_usage_per_query` view contains one row for each query using disk space for workfiles on a segment at the current time.
- The `gp_workfile_usage_per_segment` view contains one row for each segment. Each row displays the total amount of disk space used for workfiles on the segment at the current time.

The `gp_workfile_compression` configuration parameter specifies whether the spill files are compressed. It is `off` by default. Enabling compression can improve performance when spill files are used.
