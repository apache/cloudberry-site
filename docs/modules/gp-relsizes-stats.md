---
title: gp_relsizes_stats
---

# gp_relsizes_stats

The `gp_relsizes_stats` module collects and stores the on-disk sizes of relation files in Apache Cloudberry. It scans the database directories on the segments, records the size and modification time of each relation file, and exposes views that aggregate these figures per table and per schema.

Statistics can be collected periodically by a background worker, or on demand by calling a function. Naptime parameters let you spread the file scan over time to limit the I/O load.

## Build and install

`gp_relsizes_stats` is built and installed by default with Apache Cloudberry. No `configure` option is required.

To build and install only this module from the source tree:

```shell
make -C gpcontrib/gp_relsizes_stats
make -C gpcontrib/gp_relsizes_stats install
```

## Enable the module

1. Add the library to `shared_preload_libraries` and restart the cluster. The periodic background worker is registered only when the library is preloaded:

    ```shell
    gpconfig -c shared_preload_libraries -v "'gp_relsizes_stats'" --skipvalidation
    gpstop -ra
    ```

    If `shared_preload_libraries` already lists other libraries, keep them in the value.

2. Create the extension in each database for which you want to collect statistics:

    ```sql
    CREATE EXTENSION gp_relsizes_stats;
    ```

    The extension is marked as trusted, so a non-superuser who has the `CREATE` privilege on the database can create it. The extension creates the `relsizes_stats_schema` schema. The role that creates the extension is granted `USAGE` on the schema and `SELECT` on its tables and views, with grant option.

3. Optional: enable periodic collection. It is off by default:

    ```shell
    gpconfig -c gp_relsizes_stats.enabled -v on --skipvalidation
    gpstop -u
    ```

## How collection works

- The main background worker connects to the `postgres` database. When `gp_relsizes_stats.enabled` is on, it runs a collection cycle and then sleeps for `gp_relsizes_stats.restart_naptime`.
- A collection cycle goes through all databases except `template0`, `template1`, `diskquota`, and `gpperfmon`. For each database it starts a dynamic background worker. Databases in which the extension is not created are skipped.
- For each database, the worker rebuilds `segment_file_map`, replaces the content of `segment_file_sizes` with a fresh scan of the database directories on all segments (the default tablespace and user tablespaces), and, if `gp_relsizes_stats.save_history` is on, refreshes `table_sizes_history`.
- Each collection cycle needs free background worker slots. If a worker cannot be registered, the error message hints at increasing `max_worker_processes`. If this error occurs in the periodic worker, the worker exits and does not start again until the cluster is restarted.

## Configuration parameters

All parameters can be set only in the server configuration and take effect after a configuration reload. The naptime parameters take plain integers in milliseconds. Values with a unit, such as `'6h'`, are not accepted.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `gp_relsizes_stats.enabled` | boolean | `off` | Enables periodic collection by the background worker. |
| `gp_relsizes_stats.save_history` | boolean | `on` | Saves table sizes to `relsizes_stats_schema.table_sizes_history` during collection. |
| `gp_relsizes_stats.restart_naptime` | integer (ms) | `21600000` | Time between two collection cycles. The default is 6 hours. Range: `0` to `2147483647`. |
| `gp_relsizes_stats.database_naptime` | integer (ms) | `0` | Total pause that is spread between databases in one cycle. The value is divided by the number of databases, and the worker sleeps for the result after each database. Range: `0` to `2147483647`. |
| `gp_relsizes_stats.file_naptime` | integer (ms) | `1` | Pause after each file during the file scan. Range: `0` to `2147483647`. |

## SQL objects

All objects are created in the `relsizes_stats_schema` schema.

### Functions

| Function | Returns | Description |
|---|---|---|
| `relsizes_collect_stats_once()` | `void` | Runs one collection cycle for all databases, without the naptime pauses. It does not check `gp_relsizes_stats.enabled`. |
| `get_stats_for_database(dboid oid, fast bool)` | `TABLE (segment integer, relfilenode oid, filepath text, size bigint, mtime bigint)` | Runs on all segments. Scans the directories of the database `dboid` and returns one row per relation file. When `fast` is `true`, the scan does not pause between files. It is used by the collection process. |

### Tables

`segment_file_map`: maps relations to their relation file nodes on each segment. Append-optimized, randomly distributed.

| Column | Type | Description |
|---|---|---|
| `segment` | `integer` | Segment content ID. |
| `reloid` | `oid` | OID of the relation. |
| `relfilenode` | `oid` | Relation file node on that segment. |

`segment_file_sizes`: the result of the last file scan. Append-optimized, randomly distributed.

| Column | Type | Description |
|---|---|---|
| `segment` | `integer` | Segment content ID. |
| `relfilenode` | `oid` | Relation file node, parsed from the file name. |
| `filepath` | `text` | Path of the file. |
| `size` | `bigint` | File size in bytes. |
| `mtime` | `bigint` | Last modification time of the file, as a Unix timestamp. |

`table_sizes_history`: table sizes with the date of collection. Randomly distributed.

| Column | Type | Description |
|---|---|---|
| `insert_date` | `date` | Date on which the row was collected. |
| `nspname` | `text` | Schema name. |
| `relname` | `text` | Table name. |
| `size` | `bigint` | Table size in bytes. |
| `mtime` | `timestamp` | Latest modification time among the files of the table. |

### Views

`table_files`: one row per file of each table (relation kinds `r` and `p`, excluding the `pg_global` tablespace), including the files of TOAST tables, TOAST indexes, and the auxiliary relations of append-optimized tables. Indexes on the table and the block directory of append-optimized tables are not included, so the sizes in `table_sizes` are not the total relation sizes.

| Column | Type | Description |
|---|---|---|
| `nspname` | `name` | Schema name. |
| `relname` | `name` | Table name. For rows with `own_file = false`, this is the name of the root partitioned table. |
| `segment` | `integer` | Segment content ID. |
| `relfilenode` | `oid` | Relation file node. |
| `filepath` | `text` | Path of the file. `NULL` if the relation has no file on disk. |
| `kind` | `text` | One of `main`, `toast`, `toast_idx`, `ao`, `ao_vm`, `ao_vm_idx`. |
| `size` | `bigint` | File size in bytes, `0` if the relation has no file. |
| `mtime` | `bigint` | Modification time as a Unix timestamp, `0` if the relation has no file. |
| `own_file` | `boolean` | `true` if the file belongs to the relation named in `relname`. `false` if the file belongs to a descendant partition and is attributed to the root partitioned table. |

`table_sizes`: total size per table. For a root partitioned table, the size includes all its descendant partitions. Each partition also appears as its own row.

| Column | Type | Description |
|---|---|---|
| `nspname` | `name` | Schema name. |
| `relname` | `name` | Table name. |
| `size` | `numeric` | Sum of file sizes in bytes. |
| `mtime` | `timestamp with time zone` | Latest modification time among the files of the table. |

`namespace_sizes`: total size per schema. Only rows with `own_file = true` are summed, so partitions are not counted twice.

| Column | Type | Description |
|---|---|---|
| `nspname` | `name` | Schema name. |
| `size` | `numeric` | Sum of file sizes in bytes. |

## Example

Collect statistics on demand and check the size of a table:

```sql
CREATE EXTENSION gp_relsizes_stats;

CREATE TABLE employees (
    employee_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    department_id INT,
    date_of_birth DATE
);

INSERT INTO employees (first_name, last_name, department_id, date_of_birth) VALUES
('John', 'Doe', 1, '1988-06-15'),
('Jane', 'Smith', 2, '1990-07-20'),
('Emily', 'Jones', 1, '1985-08-30');

SELECT relsizes_stats_schema.relsizes_collect_stats_once();

SELECT size FROM relsizes_stats_schema.table_sizes_history WHERE relname = 'employees';
```

```text
 size
-------
 65536
(1 row)
```

Check the size of a schema:

```sql
SELECT size FROM relsizes_stats_schema.namespace_sizes WHERE nspname = 'public';
```

To allow another role to read the statistics:

```sql
GRANT USAGE ON SCHEMA relsizes_stats_schema TO user2;
GRANT SELECT ON ALL TABLES IN SCHEMA relsizes_stats_schema TO user2;
```

## Usage notes

- The periodic background worker runs only when the library is loaded through `shared_preload_libraries`. `relsizes_collect_stats_once()` also works without preloading the library.
- File sizes are collected on the segments only. Files on the coordinator are not scanned.
- The sizes in `segment_file_sizes` and in the views reflect the last collection, not the current state of the files.
- Each collection deletes all rows of `table_sizes_history` in the database and inserts the current table sizes with the current date. The table therefore holds the result of the latest collection that ran with `gp_relsizes_stats.save_history` turned on.
- Partitioned tables (root and intermediate levels) have no files on disk. They appear in `table_files` with a size of `0`.
- The module is tested only on Linux.
