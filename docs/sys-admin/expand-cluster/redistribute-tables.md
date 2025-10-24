---
title: Redistribute Tables
---

# Redistribute Tables

Redistribute tables to balance existing data over the newly expanded cluster.

After creating an expansion schema, you can redistribute tables across the entire system with [`gpexpand`](../../sys-utilities/gpexpand.md). Plan to run this during low-use hours when the utility's CPU usage and table locks have minimal impact on operations. Rank tables to redistribute the largest or most critical tables first.

:::note
When redistributing data, Apache Cloudberry must be running in production mode. Apache Cloudberry cannot be in restricted mode or in coordinator mode. The [`gpstart`](../../sys-utilities/gpstart.md) options `-R` or `-m` cannot be specified to start Apache Cloudberry.
:::

While table redistribution is underway, any new tables or partitions created are distributed across all segments exactly as they would be under normal operating conditions. Queries can access all segments, even before the relevant data is redistributed to tables on the new segments. The table or partition being redistributed is locked and unavailable for read or write operations. When its redistribution completes, normal operations resume.

- [Ranking Tables for Redistribution](#rank-tables-for-redistribution)
- [Redistributing Tables Using gpexpand](#redistribute-tables-using-gpexpand)
- [Monitoring Table Redistribution](#monitor-table-redistribution)

## Rank tables for redistribution

For large systems, you can control the table redistribution order. Adjust tables' `rank` values in the expansion schema to prioritize heavily-used tables and minimize performance impact. Available free disk space can affect table ranking; see [Managing Redistribution in Large-Scale Cloudberry Systems](./plan-system-expansion.md).

To rank tables for redistribution by updating `rank` values in [gpexpand.status_detail](../../sys-utilities/gpexpand.md), connect to Apache Cloudberry using `psql` or another supported client. Update *gpexpand.status_detail* with commands such as:

```sql
=> UPDATE gpexpand.status_detail SET rank=10;

=> UPDATE gpexpand.status_detail SET rank=1 WHERE fq_name = 'public.lineitem';
=> UPDATE gpexpand.status_detail SET rank=2 WHERE fq_name = 'public.orders';
```

These commands lower the priority of all tables to `10` and then assign a rank of `1` to `lineitem` and a rank of `2` to `orders`. When table redistribution begins, `lineitem` is redistributed first, followed by `orders` and all other tables in *gpexpand.status_detail*. To exclude a table from redistribution, remove the table from the *gpexpand.status_detail* table.

## Redistribute tables using gpexpand

### To redistribute tables with gpexpand

1. Log in on the coordinator host as the user who will run your Apache Cloudberry system, for example, `gpadmin`.
2. Run the `gpexpand` utility. You can use the `-d` or `-e` option to define the expansion session time period. For example, to run the utility for up to 60 consecutive hours:

    ```shell
    $ gpexpand -d 60:00:00
    ```

    The utility redistributes tables until the last table in the schema completes or it reaches the specified duration or end time. `gpexpand` updates the status and time in `gpexpand.status` when a session starts and finishes.

:::note
After completing table redistribution, run the `VACUUM ANALYZE` and `REINDEX`commands on the catalog tables to update table statistics, and rebuild indexes. See [Routine Vacuum and Analyze](../routine-maintain-tasks.md) and [`VACUUM`](../../sql-stmts/vacuum.md).
:::

## Monitor table redistribution

During the table redistribution process you can query the expansion schema to view:

- a current progress summary, the estimated rate of table redistribution, and the estimated time to completion. Use `gpexpand.expansion_progress`, as described in [Viewing Expansion Status](#view-expansion-status).
- per-table status information, using `gpexpand.status_detail`. See [Viewing Table Status](#view-table-status).

See also [Monitoring the Cluster Expansion State](./plan-system-expansion.md) for information about monitoring the overall expansion progress with the `gpstate` utility.

### View expansion status

After the first table completes redistribution, *gpexpand.expansion_progress* calculates its estimates and refreshes them based on all tables' redistribution rates. Calculations restart each time you start a table redistribution session with `gpexpand`. To monitor progress, connect to Apache Cloudberry using `psql` or another supported client; query *gpexpand.expansion_progress* with a command like the following:

```sql
=# SELECT * FROM gpexpand.expansion_progress;
             name             |         value
------------------------------+-----------------------
 Bytes Left                   | 5534842880
 Bytes Done                   | 142475264
 Estimated Expansion Rate     | 680.75667095996092 MB/s
 Estimated Time to Completion | 00:01:01.008047
 Tables Expanded              | 4
 Tables Left                  | 4
(6 rows)
```

### View table status

The table *gpexpand.status_detail* stores status, time of last update, and more facts about each table in the schema. To see a table's status, connect to Apache Cloudberry using `psql` or another supported client and query *gpexpand.status_detail*:

```sql
=> SELECT status, expansion_started, source_bytes FROM
gpexpand.status_detail WHERE fq_name = 'public.sales';
  status   |     expansion_started      | source_bytes
-----------+----------------------------+--------------
 COMPLETED | 2017-02-20 10:54:10.043869 |   4929748992
(1 row)
```

