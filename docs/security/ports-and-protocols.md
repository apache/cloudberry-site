---
title: Ports and Protocols
---

# Apache Cloudberry Ports and Protocols

Lists network ports and protocols used within the Cloudberry cluster.

Apache Cloudberry clients connect with TCP to the Cloudberry coordinator instance at the client connection port, `5432` by default. The listen port can be reconfigured in the postgresql.conf configuration file. Client connections use the PostgreSQL libpq API. The `psql` command-line interface, several Cloudberry utilities, and language-specific programming APIs all either use the libpq library directly or implement the `libpq` protocol internally.

Each segment instance also has a client connection port, used solely by the coordinator instance to coordinate database operations with the segments. The `gpstate -p` command, run on the Cloudberry coordinator, lists the port assignments for the Cloudberry coordinator and the primary segments and mirrors. For example:

```shell
[gpadmin@cdw ~]$ gpstate -p 
20250516:02:57:04:011030 gpstate:cdw:gpadmin-[INFO]:-Starting gpstate with args: -p
20250516:02:57:05:011030 gpstate:cdw:gpadmin-[INFO]:-local Cloudberry Version: 'postgres (Apache Cloudberry) 14.4 build commit:fc9a9d4cad8dd4037b9bc07bf837c0b958726103'
20250516:02:57:05:011030 gpstate:cdw:gpadmin-[INFO]:-coordinator Cloudberry Version: 'PostgreSQL 14.4 (Apache Cloudberry 2.0.0 build commit:fc9a9d4cad8dd4037b9bc07bf837c0b958726103) on x86_64-pc-linux-gnu, compiled by GCC gcc (GCC) 10, 64-bit compiled on May 16 2025 15:26:34'
20250516:02:57:05:011030 gpstate:cdw:gpadmin-[INFO]:-Obtaining Segment details from coordinator...
20250516:02:57:05:011030 gpstate:cdw:gpadmin-[INFO]:--Coordinator segment instance  /data/coordinator/gpseg-1  port = 5432
20250516:02:57:05:011030 gpstate:cdw:gpadmin-[INFO]:--Segment instance port assignments
20250516:02:57:05:011030 gpstate:cdw:gpadmin-[INFO]:-----------------------------------
20250516:02:57:05:011030 gpstate:cdw:gpadmin-[INFO]:-   Host   Datadir                Port
20250516:02:57:05:011030 gpstate:cdw:gpadmin-[INFO]:-   sdw1   /data/primary/gpseg0   20000
20250516:02:57:05:011030 gpstate:cdw:gpadmin-[INFO]:-   sdw2   /data/mirror/gpseg0    21000
20250516:02:57:05:011030 gpstate:cdw:gpadmin-[INFO]:-   sdw1   /data/primary/gpseg1   20001
20250516:02:57:05:011030 gpstate:cdw:gpadmin-[INFO]:-   sdw2   /data/mirror/gpseg1    21001
20250516:02:57:05:011030 gpstate:cdw:gpadmin-[INFO]:-   sdw1   /data/primary/gpseg2   20002
20250516:02:57:05:011030 gpstate:cdw:gpadmin-[INFO]:-   sdw2   /data/mirror/gpseg2    21002
20250516:02:57:05:011030 gpstate:cdw:gpadmin-[INFO]:-   sdw2   /data/primary/gpseg3   20000
20250516:02:57:05:011030 gpstate:cdw:gpadmin-[INFO]:-   sdw3   /data/mirror/gpseg3    21000
20250516:02:57:05:011030 gpstate:cdw:gpadmin-[INFO]:-   sdw2   /data/primary/gpseg4   20001
20250516:02:57:05:011030 gpstate:cdw:gpadmin-[INFO]:-   sdw3   /data/mirror/gpseg4    21001
20250516:02:57:05:011030 gpstate:cdw:gpadmin-[INFO]:-   sdw2   /data/primary/gpseg5   20002
20250516:02:57:05:011030 gpstate:cdw:gpadmin-[INFO]:-   sdw3   /data/mirror/gpseg5    21002
20250516:02:57:05:011030 gpstate:cdw:gpadmin-[INFO]:-   sdw3   /data/primary/gpseg6   20000
20250516:02:57:05:011030 gpstate:cdw:gpadmin-[INFO]:-   sdw1   /data/mirror/gpseg6    21000
20250516:02:57:05:011030 gpstate:cdw:gpadmin-[INFO]:-   sdw3   /data/primary/gpseg7   20001
20250516:02:57:05:011030 gpstate:cdw:gpadmin-[INFO]:-   sdw1   /data/mirror/gpseg7    21001
20250516:02:57:05:011030 gpstate:cdw:gpadmin-[INFO]:-   sdw3   /data/primary/gpseg8   20002
20250516:02:57:05:011030 gpstate:cdw:gpadmin-[INFO]:-   sdw1   /data/mirror/gpseg8    21002
```

Additional Apache Cloudberry network connections are created for features such as standby replication, segment mirroring, statistics collection, and data exchange between segments. Some persistent connections are established when the database starts up and other transient connections are created during operations such as query execution. Transient connections for query execution processes, data movement, and statistics collection use available ports in the range `1025` to `65535` with both TCP and UDP protocols.

:::note
To avoid port conflicts between Apache Cloudberry and other applications when initializing Apache Cloudberry, do not specify Apache Cloudberry ports in the range specified by the operating system parameter `net.ipv4.ip_local_port_range`. For example, if `net.ipv4.ip_local_port_range = 10000 65535`, you could set the Apache Cloudberry base port numbers to values outside of that range:

```shell
PORT_BASE = 6000
MIRROR_PORT_BASE = 7000
```

:::

Some add-on products and services that work with Apache Cloudberry have additional networking requirements. The following table lists ports and protocols used within the Cloudberry cluster, and includes services and applications that integrate with Apache Cloudberry.

|Service|Protocol/Port|Description|
|-------|-------------|-----------|
|Coordinator SQL client connection|TCP 5432, libpq|SQL client connection port on the Cloudberry coordinator host. Supports clients using the PostgreSQL libpq API. Configurable.|
|Segment SQL client connection|varies, libpq|The SQL client connection port for a segment instance. Each primary and mirror segment on a host must have a unique port. Ports are assigned when the Cloudberry system is initialized or expanded. The `gp_segment_configuration` system catalog records port numbers for each primary (p) or mirror (m) segment in the `port` column. Run `gpstate -p` to view the ports in use.|
|Segment mirroring port|varies, libpq|The port where a segment receives mirrored blocks from its primary. The port is assigned when the mirror is set up. The `gp_segment_configuration` system catalog records port numbers for each primary (p) or mirror (m) segment in the `port` column. Run `gpstate -p` to view the ports in use.|
|Apache Cloudberry Interconnect|UDP 1025-65535, dynamically allocated|The Interconnect transports database tuples between Cloudberry segments during query execution.|
|Standby coordinator client listener|TCP 5432, libpq|SQL client connection port on the standby coordinator host. Usually the same as the coordinator client connection port. Configure with the `gpinitstandby` utility `-P` option.|
|Standby coordinator replicator|TCP 1025-65535, gpsyncmaster|The `gpsyncmaster` process on the coordinator host establishes a connection to the secondary coordinator host to replicate the coordinator's log to the standby coordinator.|
|Apache Cloudberry file load and transfer utilities: gpfdist, gpload.|TCP 8080, HTTP<br/>TCP 9000, HTTPS|The gpfdist file serving utility can run on Cloudberry hosts or external hosts. Specify the connection port with the `-p` option when starting the server.<br/><br/>The gpload utility runs one or more instances of gpfdist with ports or port ranges specified in a configuration file.|
|Backup completion notification|TCP 25, TCP 587, SMTP|The `gpbackup` backup utility can optionally send email to a list of email addresses at completion of a backup. The SMTP service must be enabled on the Cloudberry coordinator host.|
|Apache Cloudberry secure shell (SSH): gpssh, gpsync, gpssh-exkeys, gppkg|TCP 22, SSH|Many Cloudberry utilities use rsync and ssh to transfer files between hosts and manage the Cloudberry system within the cluster.|
|GPText|TCP 2188 (base port)|ZooKeeper client ports. ZooKeeper uses a range of ports beginning at the base port number. The base port number and maximum port number are set in the GPText installation configuration file at installation time. The default base port number is 2188.|
|GPText|TCP 18983 (base port)|GPText (Apache Solr) nodes. GPText nodes use a range of ports beginning at the base port number. The base port number and maximum port number are set in the GPText installation configuration file at installation time. The default base port number is 18983.|
|EMC Data Domain and DD Boost|TCP/UDP 111, NFS portmapper|Used to assign a random port for the mountd service used by NFS and DD Boost. The mountd service port can be statically assigned on the Data Domain server.|
|EMC Data Domain and DD Boost|TCP 2052|Main port used by NFS mountd. This port can be set on the Data Domain system using the `nfs set mountd-port` command .|
|EMC Data Domain and DD Boost|TCP 2049, NFS|Main port used by NFS. This port can be configured using the `nfs set server-port` command on the Data Domain server.|
|EMC Data Domain and DD Boost|TCP 2051, replication|Used when replication is configured on the Data Domain system. This port can be configured using the `replication modify` command on the Data Domain server.|
|Pgbouncer connection pooler|TCP, libpq|The pgbouncer connection pooler runs between libpq clients and Cloudberry (or PostgreSQL) databases. While you can run it on the Cloudberry coordinator host, running pgbouncer on a host outside of the Cloudberry cluster is recommended. When it runs on a separate host, pgbouncer can act as a warm standby mechanism for the Cloudberry coordinator host, switching to the Cloudberry standby host without requiring clients to reconfigure. Set the client connection port and the Cloudberry coordinator host address and port in the `pgbouncer.ini` configuration file.|
