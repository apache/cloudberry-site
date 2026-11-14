---
title: postgres_fdw
---

# postgres_fdw

The `postgres_fdw` module is a foreign-data wrapper (FDW) that you can use to access data stored in a remote PostgreSQL or Apache Cloudberry database.

The Apache Cloudberry `postgres_fdw` module is a modified version of the PostgreSQL `postgres_fdw` module. It supports the MPP execution options of Apache Cloudberry foreign tables, and it has some restrictions that the PostgreSQL module does not have. Both are described below.

## Install and register the module

`postgres_fdw` is not part of the default build targets (`make` and `make install`) of Apache Cloudberry. If `CREATE EXTENSION` reports that the extension is not available, build and install the module from the Apache Cloudberry source tree that your installation was configured from:

```shell
make -C contrib/postgres_fdw install
```

The module files must be present on every host of the cluster (coordinator, standby coordinator, and all segment hosts). The module is also installed by `make install-world`.

Then register the extension in each database in which you want to use it:

```sql
CREATE EXTENSION postgres_fdw;
```

## Basic usage

```sql
CREATE SERVER pgserver FOREIGN DATA WRAPPER postgres_fdw
  OPTIONS (host 'pghost', port '5432', dbname 'sales');

CREATE USER MAPPING FOR CURRENT_USER SERVER pgserver
  OPTIONS (user 'remote_user', password 'secret');

CREATE FOREIGN TABLE orders_ft (id int, amount numeric)
  SERVER pgserver
  OPTIONS (schema_name 'public', table_name 'orders');

SELECT count(*) FROM orders_ft;
```

## Options

The module accepts the connection options of `libpq` and the options of the PostgreSQL 14 `postgres_fdw` module: `schema_name`, `table_name`, `column_name`, `use_remote_estimate`, `fdw_startup_cost`, `fdw_tuple_cost`, `extensions`, `updatable`, `truncatable`, `fetch_size`, `batch_size`, `async_capable`, `keep_connections`, `password_required`, `sslcert`, and `sslkey`.

The following options are specific to Apache Cloudberry:

| Option | Where | Description |
|--------|-------|-------------|
| `mpp_execute` | Foreign table, server, or foreign-data wrapper | Apache Cloudberry option that determines where the foreign table is accessed: `'coordinator'` (the same as `'master'`), `'any'`, or `'all segments'`. |
| `num_segments` | Server | Number of segments that access a foreign table whose `mpp_execute` option is `'all segments'`. If you do not set this option, all segments of the cluster are used. |

With `mpp_execute 'all segments'`, an `INSERT INTO <foreign table> SELECT ...` statement writes to the remote server from the segments in parallel.

## Access multiple remote servers from one foreign table

A foreign table whose `mpp_execute` option is `'all segments'` can read from several remote servers that hold tables of the same structure. Add each server to the foreign table as a foreign segment:

```sql
CREATE SERVER mpps1 FOREIGN DATA WRAPPER postgres_fdw OPTIONS (host 'pghost1', dbname 'fdw1');
CREATE SERVER mpps2 FOREIGN DATA WRAPPER postgres_fdw OPTIONS (host 'pghost2', dbname 'fdw2');
CREATE USER MAPPING FOR CURRENT_USER SERVER mpps1;
CREATE USER MAPPING FOR CURRENT_USER SERVER mpps2;

CREATE FOREIGN TABLE fs1 (a int, b text)
  SERVER mpps1
  OPTIONS (schema_name 'public', table_name 't1', mpp_execute 'all segments');

ADD FOREIGN SEGMENT FROM SERVER mpps1 INTO fs1;
ADD FOREIGN SEGMENT FROM SERVER mpps2 INTO fs1;
```

A query on `fs1` then scans one remote server per query executor process and gathers the results on the coordinator:

```sql
SET optimizer = off;
EXPLAIN (COSTS OFF) SELECT * FROM fs1;
```

```text
                QUERY PLAN
------------------------------------------
 Gather Motion 2:1  (slice1; segments: 2)
   ->  Foreign Scan on fs1
 Optimizer: Postgres query optimizer
(3 rows)
```

For such a foreign table:

- Aggregates can be pushed down to the remote servers as partial aggregates, which are finalized on the coordinator.
- A `LIMIT` clause is applied on each segment as a preliminary limit before the rows are gathered on the coordinator.
- The hidden column `gp_foreign_server` contains the OID of the foreign server that a row comes from. You can use it in join conditions, for example `fs1.gp_foreign_server = fs2.gp_foreign_server`, to join only rows that come from the same server.

:::caution
Queries on a foreign table with foreign segments return correct results only with the Postgres-based planner. GPORCA ignores the foreign segments: it scans the table on all segments of the cluster, so some remote servers are read more than once and rows are duplicated, and `gp_foreign_server` is `0` for every row. Turn GPORCA off before you query such a table:

```sql
SET optimizer = off;
```
:::

## Limitations

- The `use_remote_estimate` option is not supported. If the option is present on a server or a foreign table, with any value, the module ignores it and reports the warning `fdw option 'use_remote_estimate' is not supported.`
- When the remote server is an Apache Cloudberry database, only `INSERT` is supported on the foreign table. `UPDATE` and `DELETE` are not supported.

## Functions

| Function | Description |
|----------|-------------|
| `postgres_fdw_get_connections(OUT server_name text, OUT valid boolean) returns setof record` | Returns the foreign server names of all open connections that `postgres_fdw` established from the local session, and whether each connection is valid. |
| `postgres_fdw_disconnect(server_name text) returns boolean` | Discards the open connections from the local session to the given foreign server. |
| `postgres_fdw_disconnect_all() returns boolean` | Discards all open connections from the local session to foreign servers. |

## Module documentation

See [postgres_fdw](https://www.postgresql.org/docs/14/postgres-fdw.html) in the PostgreSQL documentation for details about the options and behavior of this module.
