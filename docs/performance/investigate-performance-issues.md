---
title: Investigate Performance Issues
---

# Investigate Performance Issues

This document provides guidelines for identifying and troubleshooting performance problems in a Apache Cloudberry system.

This document lists steps you can take to help identify the cause of a performance problem. If the problem affects a particular workload or query, you can focus on tuning that particular workload. If the performance problem is system-wide, then hardware problems, system failures, or resource contention may be the cause.

## Check system state

Use the `gpstate` utility to identify failed segments. A Apache Cloudberry system will incur performance degradation when segment instances are down because other hosts must pick up the processing responsibilities of the down segments.

Failed segments can indicate a hardware failure, such as a failed disk drive or network card. Apache Cloudberry provides the hardware verification tool `gpcheckperf` to help identify the segment hosts with hardware issues.

## Check database activity

- [Check for Active Sessions (Workload)](#check-for-active-sessions-workload)
- [Check for Locks (Contention)](#check-for-locks-contention)
- [Check Query Status and System Utilization](#check-query-status-and-system-utilization)

### Check for active sessions (workload)

The `pg_stat_activity` system catalog view shows one row per server process; it shows the database OID, database name, process ID, user OID, user name, current query, time at which the current query began execution, time at which the process was started, client address, and port number. To obtain the most information about the current system workload, query this view as the database superuser. For example:

```sql
SELECT * FROM pg_stat_activity;
```

Note that the information does not update instantaneously.

### Check for locks (contention)

The `pg_locks` system catalog view allows you to see information about outstanding locks. If a transaction is holding a lock on an object, any other queries must wait for that lock to be released before they can continue. This may appear to the user as if a query is hanging.

Examine `pg_locks` for ungranted locks to help identify contention between database client sessions. `pg_locks` provides a global view of all locks in the database system, not only those relevant to the current database. You can join its relation column against `pg_class.oid` to identify locked relations (such as tables), but this works correctly only for relations in the current database. You can join the `pid` column to the `pg_stat_activity.pid` to see more information about the session holding or waiting to hold a lock. For example:

```sql
SELECT locktype, database, c.relname, l.relation, 
l.transactionid, l.pid, l.mode, l.granted, 
a.query 
        FROM pg_locks l, pg_class c, pg_stat_activity a 
        WHERE l.relation=c.oid AND l.pid=a.pid
        ORDER BY c.relname;
```

If you use resource groups, queries that are waiting will also show in `pg_locks`. To see how many queries are waiting to run in a resource group, use the `gp_resgroup_status` system catalog view. For example:

```sql
SELECT * FROM gp_toolkit.gp_resgroup_status;
```

Similarly, if you use resource queues, queries that are waiting in a queue also show in `pg_locks`. To see how many queries are waiting to run from a resource queue, use the `gp_resqueue_status` system catalog view. For example:

```sql
SELECT * FROM gp_toolkit.gp_resqueue_status;
```

### Check query status and system utilization

You can use system monitoring utilities such as `ps`, `top`, `iostat`, `vmstat`, `netstat` and so on to monitor database activity on the hosts in your Apache Cloudberry array. These tools can help identify Apache Cloudberry processes (`postgres` processes) currently running on the system and the most resource intensive tasks with regards to CPU, memory, disk I/O, or network activity. Look at these system statistics to identify queries that degrade database performance by overloading the system and consuming excessive resources. Apache Cloudberry's management tool `gpssh` allows you to run these system monitoring commands on several hosts simultaneously.

You can create and use the Apache Cloudberry `session_level_memory_consumption` view that provides information about the current memory utilization and idle time for sessions that are running queries on Apache Cloudberry. For information about the view, see [Viewing Session Memory Usage Information](../sys-admin/check-database-system.md).

## Troubleshoot problem queries

If a query performs poorly, look at its query plan to help identify problems. The `EXPLAIN` command shows the query plan for a given query. See [Analyze Query Performance](./optimize-queries/analyze-query-performance.md) for more information about reading query plans and identifying problems.

When an out of memory event occurs during query execution, the Apache Cloudberry memory accounting framework reports detailed memory consumption of every query running at the time of the event. The information is written to the Apache Cloudberry segment logs.

## Investigate error messages

Apache Cloudberry log messages are written to files in the `log` directory within the coordinator's or segment's data directory. Because the coordinator log file contains the most information, you should always check it first. Log files roll over daily and use the naming convention: `gpdb-YYYY-MM-DD_hhmmss.csv`. To locate the log files on the coordinator host:

```shell
$ cd $COORDINATOR_DATA_DIRECTORY/log
```

Log lines have the format of:

```shell
<timestamp> | <user> | <database> | <statement_id> | <con#><cmd#> 
|:-<LOG_LEVEL>: <log_message>
```

You may want to focus your search for `WARNING`, `ERROR`, `FATAL` or `PANIC` log level messages. You can use the Cloudberry utility `gplogfilter` to search through Apache Cloudberry log files. For example, when you run the following command on the coordinator host, it checks for problem log messages in the standard logging locations:

```shell
$ gplogfilter -t
```

To search for related log entries in the segment log files, you can run `gplogfilter` on the segment hosts using `gpssh`. You can identify corresponding log entries by the `statement_id` or `con`# (session identifier). For example, to search for log messages in the segment log files containing the string `con6` and save output to a file:

```shell
gpssh -f seg_hosts_file -e 'source 
/usr/local/cloudberry-db/cloudberry-env.sh ; gplogfilter -f 
con6 /gpdata/*/log/gpdb*.csv' > seglog.out
```
