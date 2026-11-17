---
title: diskquota
---

# diskquota

The `diskquota` module allows Apache Cloudberry administrators to limit the amount of disk space that schemas, roles, or tablespaces use in a database.

Apache Cloudberry includes `diskquota` 2.3 in the `gpcontrib/diskquota` directory of the source code.

## Installation

### Build the module

`diskquota` is not built by default. To build and install the module with Apache Cloudberry, specify the `--with-diskquota` option when you run `configure`:

```shell
./configure --with-diskquota [other options...]
make
make install
```

The module is built with CMake, so `cmake` must be installed on the build host.

### Enable the module

Before you can use the module, perform these steps:

1. Create the `diskquota` database. The module uses this database to store the list of the databases in which the module is enabled.

    ```shell
    createdb diskquota
    ```

2. Add the `diskquota-2.3` shared library to the `shared_preload_libraries` server configuration parameter and restart Apache Cloudberry. Be sure to retain the previous setting of the configuration parameter. For example:

    ```shell
    gpconfig -s shared_preload_libraries
    gpconfig -c shared_preload_libraries -v 'diskquota-2.3'
    gpstop -ar
    ```

    If `shared_preload_libraries` already contains other libraries, specify a comma-separated list, for example `'auto_explain,diskquota-2.3'`.

3. Create the `diskquota` extension in each database in which you want to enforce disk usage quotas. The `diskquota.max_monitored_databases` parameter limits the number of databases in which you can create the extension (`50` by default).

    ```sql
    CREATE EXTENSION diskquota;
    ```

4. If the database is not empty when you create the extension, `diskquota` raises the following warning. Run the `diskquota.init_table_size_table()` function to size the existing tables. In a database with many files, this can take some time.

    ```
    WARNING:  [diskquota] diskquota is not ready because current database is not empty
    HINT:  please run 'SELECT diskquota.init_table_size_table();' to initialize diskquota
    ```

    ```sql
    SELECT diskquota.init_table_size_table();
    ```

:::note
The library must be loaded through `shared_preload_libraries`. If it is not, the functions of the module fail with an error that reports that `diskquota-2.3` is not in `shared_preload_libraries`.
:::

For more information about the `gpconfig` and `gpstop` utilities, see [gpconfig](../sys-utilities/gpconfig.md) and [gpstop](../sys-utilities/gpstop.md).

## About the diskquota module

The disk usage of a table includes the table data, indexes, toast tables, and free space map. For append-optimized tables, the calculation also includes the auxiliary tables, such as the visibility map and the block directory table.

You can set the following quotas with the `diskquota` module:

- A schema disk quota sets a limit on the disk space that all the tables in a specific schema of a database can use. The disk usage of a schema is the total of the disk usage on all segments for all tables in the schema.
- A role disk quota sets a limit on the disk space that all the tables that a specific role owns in a database can use. The disk usage of a role is the total of the disk usage on all segments for all tables that the role owns. Although a role is a cluster-level object, the quota limit and the disk usage of a role are specific to each database.
- A schema tablespace disk quota sets a limit on the disk space that all the tables in a specific schema and tablespace of a database can use.
- A role tablespace disk quota sets a limit on the disk space that all the tables that a specific role owns in a specific tablespace of a database can use.
- A per-segment tablespace disk quota sets a limit on the disk space that a single segment can use when a tablespace quota is set for a schema or role.

:::note
You cannot set a role disk quota for the system owner, that is, the bootstrap superuser that initialized the cluster.
:::

Each database stores and manages its own quota configuration in the `diskquota.quota_config` table.

## How diskquota monitors disk usage

`diskquota` is based on the background worker framework. A single `diskquota` launcher process runs on the coordinator. The launcher starts `diskquota` worker processes on the coordinator for the databases in which the extension is created. No launcher or worker processes run on the segments.

A worker process monitors the disk usage of the schemas, roles, and tablespaces in its database. On each segment, hooks in the storage manager record the tables whose files are created, extended, or truncated. These tables are called active tables. Periodically, the worker process queries the segments for the sizes of the active tables, updates the disk usage of the corresponding schemas and roles, and compares the usage with the quota limits. When a quota is exceeded, the worker puts the schema, role, or tablespace into the reject map, which is stored in shared memory.

`diskquota` can enforce both soft limits and hard limits for disk usage:

- `diskquota` always enforces soft limits. It checks the reject map before a query runs. If the target schema, role, or tablespace of a query that adds data is in the reject map, the query is cancelled before it starts, with an error message that reports that the quota is exceeded. If the quota is not exceeded when a query starts, the query is allowed to run, even if it eventually causes the quota to be exceeded.
- When hard limit enforcement is enabled, `diskquota` also checks disk usage during query execution. If a query exceeds a disk quota while it is running, `diskquota` terminates the query. Hard limit enforcement is deactivated by default. See [diskquota.hard_limit](#diskquotahard_limit).

There is some delay after a quota is reached before the schema or role is added to the reject map, because the worker processes recalculate the table sizes periodically (every two seconds by default). Other queries can add more data during the delay. The same delay occurs when the disk usage falls beneath a quota because of operations that remove data, such as `DROP`, `TRUNCATE`, or `VACUUM FULL`. See [diskquota.naptime](#diskquotanaptime).

Deleting rows or running `VACUUM` on a table does not release disk space, so these operations alone cannot remove a schema or role from the reject map. To reduce the disk space that a table uses, run `VACUUM FULL` or `TRUNCATE TABLE`.

If the number of databases in which the extension is created is larger than `diskquota.max_workers`, the launcher starts and stops worker processes dynamically, so that the databases share the available workers.

## Functions and views

The functions and views of the module are in the `diskquota` schema.

Only superusers can run the functions that set quotas, and the `pause()` and `resume()` functions.

| Function | Description |
|---|---|
| `void init_table_size_table()` | Sizes the existing tables in the current database. |
| `void set_schema_quota(schema_name text, quota text)` | Sets a disk quota for a schema in the current database. |
| `void set_role_quota(role_name text, quota text)` | Sets a disk quota for a role in the current database. |
| `void set_schema_tablespace_quota(schema_name text, tablespace_name text, quota text)` | Sets a disk quota for a schema and tablespace combination in the current database. |
| `void set_role_tablespace_quota(role_name text, tablespace_name text, quota text)` | Sets a disk quota for a role and tablespace combination in the current database. |
| `void set_per_segment_quota(tablespace_name text, ratio float4)` | Sets a per-segment disk quota ratio for a tablespace in the current database. |
| `void pause()` | Continues to count the disk usage of the current database, but stops raising errors when a limit is exceeded. |
| `void resume()` | Resumes raising errors when a disk usage limit is exceeded in the current database. |
| `status()` | Returns a table with the `name` and `status` columns that shows the state of soft and hard limit enforcement in the current database, and the binary and schema versions of `diskquota`. |
| `bigint relation_size(relation regclass)` | Returns the size of a relation on all segments as `diskquota` calculates it. |
| `boolean wait_for_worker_new_epoch()` | Waits until the worker process of the current database finishes a new round of disk usage refresh. |

| View | Description |
|---|---|
| `show_fast_database_size_view` | Displays the disk space usage of the current database. |
| `show_fast_schema_quota_view` | Lists the quotas and the disk usage for schemas in the current database. |
| `show_fast_role_quota_view` | Lists the quotas and the disk usage for roles in the current database. |
| `show_fast_schema_tablespace_quota_view` | Lists the quotas and the disk usage for schemas per tablespace in the current database. |
| `show_fast_role_tablespace_quota_view` | Lists the quotas and the disk usage for roles per tablespace in the current database. |
| `show_segment_ratio_quota_view` | Displays the per-segment quota ratio of the tablespaces for which a ratio is set in the current database. |
| `rejectmap` | Lists the entries in the reject map. |

## Configuration parameters

The module defines the following server configuration parameters. Use the `gpconfig` utility to set them. A parameter that is marked "restart" takes effect after you restart the cluster (`gpstop -ar`). A parameter that is marked "reload" takes effect after you reload the configuration (`gpstop -u`).

| Parameter | Default | Takes effect | Description |
|---|---|---|---|
| `diskquota.naptime` | `2` | reload | The interval, in seconds, at which `diskquota` recalculates the table sizes. |
| `diskquota.hard_limit` | `off` | reload | Activates or deactivates hard limit enforcement of disk usage. |
| `diskquota.worker_timeout` | `60` | reload | The time, in seconds, after which `diskquota.wait_for_worker_new_epoch()` raises a notice that it timed out while waiting for the worker process. |
| `diskquota.max_workers` | `10` | restart | The maximum number of `diskquota` worker processes that can run at the same time. The maximum value is `20`. |
| `diskquota.max_active_tables` | `307200` (`300 * 1024`) | restart | The maximum number of active relations (tables, indexes, and so on) that `diskquota` can track at the same time. |
| `diskquota.max_table_segments` | `10485760` (`10 * 1024 * 1024`) | restart | The maximum number of table segments in the cluster. |
| `diskquota.max_monitored_databases` | `50` | restart | The maximum number of databases that `diskquota` can monitor. The maximum value is `1024`. |
| `diskquota.max_quota_probes` | `1048576` (`1024 * 1024`) | restart | The maximum number of quota probes in the cluster. |

### diskquota.naptime

The smaller the `diskquota.naptime` value, the less delay in detecting changes in disk usage. This example sets the value to ten seconds:

```shell
gpconfig -c diskquota.naptime -v 10
gpstop -u
```

### diskquota.hard_limit

When hard limit enforcement is enabled, `diskquota` checks the quotas during query execution. If a running query exceeds a quota limit, `diskquota` terminates the query.

To activate hard limit enforcement for all databases, set the parameter to `on` and reload the configuration:

```shell
gpconfig -c diskquota.hard_limit -v 'on'
gpstop -u
```

Run the following query to view the hard limit enforcement setting:

```sql
SELECT * FROM diskquota.status();
```

### diskquota.max_workers

The parameter specifies the maximum number of worker processes that can run at the same time, not including the launcher process. The `diskquota` workers are taken from the pool of worker processes that the `max_worker_processes` server configuration parameter establishes, so `diskquota.max_workers` should be less than `max_worker_processes`.

### diskquota.max_active_tables

Active tables are the tables whose sizes might have changed since `diskquota` last recalculated the table sizes. The active table list is stored in shared memory that is allocated when the server starts. If the active table shared memory is full, `diskquota` might fail to detect the corresponding disk usage changes in time.

### diskquota.max_table_segments

A table (including each child table of a partitioned table) is distributed to all segments. `diskquota` counts the part of a table on each segment as a table segment. The parameter therefore limits the number of tables that `diskquota` can monitor.

When you expand the cluster, each table consumes more table segments, which reduces the number of tables that `diskquota` can support. If the following warning is reported, increase the `diskquota.max_table_segments` value, and then restart Apache Cloudberry:

```
WARNING:  [diskquota] the number of tables exceeds the limit, please increase the GUC value for diskquota.max_table_segments. Current diskquota.max_table_segments value: 10485760
```

## Use the diskquota module

### View the diskquota status

To view the state of soft and hard limit enforcement in the current database and the `diskquota` version numbers, call the `status()` function:

```sql
SELECT * FROM diskquota.status();
```

```
          name          | status
------------------------+--------
 soft limits            | on
 hard limits            | off
 current binary version | 2.3.0
 current schema version | 2.3
(4 rows)
```

When `diskquota` is paused in the database, the status of `soft limits` is `paused`. The status of `hard limits` is also `paused` if hard limit enforcement is enabled.

### Pause and resume quota enforcement

To stop raising quota exceeded errors in the current database for a period of time, pause and then resume `diskquota`:

```sql
SELECT diskquota.pause();
-- Perform the operations for which quotas should not be enforced.
SELECT diskquota.resume();
```

`diskquota` continues to count disk usage while it is paused.

### Set a schema or role disk quota

Use the `diskquota.set_schema_quota()` and `diskquota.set_role_quota()` functions to set, update, or delete the disk quota limits for schemas and roles in the current database. The functions take two arguments: the schema or role name, and the quota to set. Specify the quota in units of MB, GB, TB, or PB, for example `'2TB'`. A number without a unit is in MB. A quota of `0` is not allowed.

The functions convert the schema or role name to lower case, unless you enclose the name in double quotes inside the string, for example `'"MyRole"'`.

The following example sets a 250GB quota for the `acct` schema:

```sql
SELECT diskquota.set_schema_quota('acct', '250GB');
```

This example sets a 500MB quota for the `nickd` role:

```sql
SELECT diskquota.set_role_quota('nickd', '500MB');
```

To change a quota, call the function again with the new quota value.

To remove a schema or role quota, set the quota value to `'-1'`.

### Set a tablespace disk quota for a schema or role

Use the `diskquota.set_schema_tablespace_quota()` and `diskquota.set_role_tablespace_quota()` functions to set, update, or delete per-tablespace disk quota limits for schemas and roles in the current database. The functions take three arguments: the schema or role name, the tablespace name, and the quota to set.

The following example sets a 250GB disk quota for the `acct` schema in the `tspaced1` tablespace:

```sql
SELECT diskquota.set_schema_tablespace_quota('acct', 'tspaced1', '250GB');
```

This example sets a 500MB disk quota for the `nickd` role in the `tspaced2` tablespace:

```sql
SELECT diskquota.set_role_tablespace_quota('nickd', 'tspaced2', '500MB');
```

To change a quota, call the function again with the new quota value.

To remove a schema or role tablespace quota, set the quota value to `'-1'`.

### Set a per-segment tablespace disk quota

When you set a tablespace quota for a schema or a role, you can also define a per-segment quota for the tablespace. A per-segment quota limits the amount of disk space that the tablespace can consume on a single segment, which helps to prevent the disk of a segment from filling because of data skew.

Use the `diskquota.set_per_segment_quota()` function to set, update, or delete a per-segment tablespace quota. The function takes two arguments: the tablespace name and a ratio. The ratio identifies how much more of the disk quota a single segment can use than the average segment quota. A ratio of `0` is not allowed.

The average segment quota is calculated as follows:

```
avg_seg_quota = tablespace_quota / number_of_segments
```

For example, if the cluster has 8 segments and you set the following schema tablespace quota, the average segment quota for the `tspaced1` tablespace is `800GB / 8 = 100GB`:

```sql
SELECT diskquota.set_schema_tablespace_quota('accts', 'tspaced1', '800GB');
```

If you then set the following per-segment ratio, the maximum disk usage that is allowed per segment is `100GB * 2.0 = 200GB`:

```sql
SELECT diskquota.set_per_segment_quota('tspaced1', '2.0');
```

To change the ratio, call the function again with the new value. To remove a per-segment tablespace quota, set the ratio to `'-1'`.

To view the per-segment quota ratio that is set for a tablespace, query the `show_segment_ratio_quota_view` view:

```sql
SELECT tablespace_name, per_seg_quota_ratio
  FROM diskquota.show_segment_ratio_quota_view WHERE tablespace_name IN ('tspaced1');
```

```
 tablespace_name | per_seg_quota_ratio
-----------------+---------------------
 tspaced1        |                   2
(1 row)
```

### Display disk quotas and disk usage

The `diskquota.show_fast_schema_quota_view` view lists the quotas for schemas in the current database. The `nspsize_in_bytes` column contains the calculated size of all the tables that belong to the schema.

```sql
SELECT * FROM diskquota.show_fast_schema_quota_view;
```

```
 schema_name | schema_oid | quota_in_mb | nspsize_in_bytes
-------------+------------+-------------+------------------
 acct        |      16561 |      256000 |           131072
 public      |       2200 |         250 |          3014656
(2 rows)
```

The `diskquota.show_fast_role_quota_view` view lists the quotas for roles in the current database. The `rolsize_in_bytes` column contains the calculated size of all the tables that the role owns.

```sql
SELECT * FROM diskquota.show_fast_role_quota_view;
```

```
 role_name | role_oid | quota_in_mb | rolsize_in_bytes
-----------+----------+-------------+------------------
 mdach     |    16558 |         500 |           131072
 nickd     |    16577 |         500 |        144670720
(2 rows)
```

To view the per-tablespace disk quotas for schemas and roles, query the `diskquota.show_fast_schema_tablespace_quota_view` and `diskquota.show_fast_role_tablespace_quota_view` views. For example:

```sql
SELECT schema_name, tablespace_name, quota_in_mb, nspsize_tablespace_in_bytes
   FROM diskquota.show_fast_schema_tablespace_quota_view
   WHERE schema_name = 'acct' AND tablespace_name = 'tspaced1';
```

### Identify the diskquota-monitored databases

Run the following commands to obtain the list of the databases that `diskquota` monitors in the cluster:

```sql
\c diskquota
SELECT d.datname FROM diskquota_namespace.database_list q, pg_database d
    WHERE q.dbid = d.oid ORDER BY d.datname;
```

## Notes and limitations

- Drop the `diskquota` extension from a database before you drop the database. A `diskquota` worker process is connected to each database in which the extension is created.
- `diskquota` also counts the disk usage of temporary tables. The size of a temporary table is added to the usage of the role that owns the table. It is not added to the usage of the current schema, because a temporary table is located in a temporary schema.
- When the reject map shared memory is full, data might be loaded into some schemas or roles after they have reached their quota limits.

## Examples

### Set a schema quota

This example configures a schema quota and shows the soft limit behavior as data is added to the schema. The example assumes that the `diskquota` library is preloaded and that the `diskquota` database exists.

1. Create a database named `testdb` and connect to it.

    ```shell
    createdb testdb
    psql -d testdb
    ```

2. Create the `diskquota` extension in the database.

    ```sql
    CREATE EXTENSION diskquota;
    ```

3. Create a schema named `s1`.

    ```sql
    CREATE SCHEMA s1;
    ```

4. Set a 1MB disk quota for the `s1` schema.

    ```sql
    SELECT diskquota.set_schema_quota('s1', '1 MB');
    ```

5. Create a table in the `s1` schema and insert a small amount of data into it. The schema has no data yet, so it is not in the reject map.

    ```sql
    SET search_path TO s1;
    CREATE TABLE a(i int) DISTRIBUTED BY (i);
    INSERT INTO a SELECT generate_series(1,100);
    ```

6. Insert a large amount of data, enough to exceed the 1MB quota of the schema. Before the `INSERT` command, the `s1` schema is not in the reject map, so with only soft limit enforcement in effect the command is allowed to run, even though it exceeds the limit of the schema.

    ```sql
    INSERT INTO a SELECT generate_series(1,10000000);
    ```

7. Try to insert a small amount of data. Because the previous command exceeded the disk quota of the schema, the schema is in the reject map and any command that loads data is cancelled.

    ```sql
    INSERT INTO a SELECT generate_series(1,100);
    ```

    ```
    ERROR:  schema's disk space quota exceeded with name: s1
    ```

8. Remove the quota from the `s1` schema by setting it to `-1`, and insert a small amount of data again. The 5-second sleep before the `INSERT` command ensures that the reject map is updated before the command runs.

    ```sql
    SELECT diskquota.set_schema_quota('s1', '-1');
    SELECT pg_sleep(5);
    INSERT INTO a SELECT generate_series(1,100);
    ```

### Enable hard limit enforcement

This example enables hard limit enforcement of disk usage, and runs the commands of the previous example again. Before you start, empty the table from the previous example so that the schema is under its quota again:

```sql
TRUNCATE s1.a;
SELECT diskquota.wait_for_worker_new_epoch();
```

1. Enable hard limit enforcement.

    ```shell
    gpconfig -c diskquota.hard_limit -v 'on'
    gpstop -u
    ```

2. View the hard limit enforcement setting.

    ```sql
    SELECT * FROM diskquota.status();
    ```

3. Set a 1MB disk quota for the `s1` schema again.

    ```sql
    SELECT diskquota.set_schema_quota('s1', '1 MB');
    ```

4. Insert a large amount of data, enough to exceed the 1MB quota of the schema. Before the `INSERT` command, the `s1` schema is not in the reject map, so the command is allowed to start. When the operation exceeds the schema quota, `diskquota` terminates the query with an error like `schema's disk space quota exceeded with name: 17952`. With hard limit enforcement, the error reports the OID of the schema instead of its name.

    ```sql
    INSERT INTO a SELECT generate_series(1,10000000);
    ```

5. Remove the quota from the `s1` schema, and wait until the reject map is updated:

    ```sql
    SELECT diskquota.set_schema_quota('s1', '-1');
    SELECT diskquota.wait_for_worker_new_epoch();
    ```

### Set a per-segment tablespace quota

This example configures a tablespace quota and a per-segment tablespace quota. It uses the `testdb` database and the `s1` schema of the previous examples, and assumes that a tablespace named `tbsp1` exists in the cluster.

1. Set a disk quota of 10MB for the `s1` schema in the `tbsp1` tablespace.

    ```sql
    SELECT diskquota.set_schema_tablespace_quota('s1', 'tbsp1', '10 MB');
    ```

2. Create a table named `b` in the `tbsp1` tablespace and insert some data. The data does not exceed the 10MB quota.

    ```sql
    SET search_path TO s1;
    CREATE TABLE b(i int) TABLESPACE tbsp1 DISTRIBUTED BY (i);
    INSERT INTO b SELECT generate_series(1,100000);
    ```

3. Set a per-segment ratio of `0.1` for the `tbsp1` tablespace. With this setting, a single segment can use at most the average segment quota multiplied by `0.1`, which is less than the space that the table already uses on a segment.

    ```sql
    SELECT diskquota.set_per_segment_quota('tbsp1', 0.1);
    ```

4. Wait for `diskquota` to refresh the disk usage, and then try to insert more data. Because the per-segment tablespace quota is exceeded, the command is cancelled.

    ```sql
    SELECT diskquota.wait_for_worker_new_epoch();
    INSERT INTO b SELECT generate_series(1,100);
    ```

    ```
    ERROR:  tablespace: tbsp1, schema: s1 diskquota exceeded per segment quota
    ```
