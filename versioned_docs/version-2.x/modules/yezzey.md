---
title: yezzey
---

# yezzey

The `yezzey` module offloads the data of append-optimized tables (row-oriented and column-oriented) to S3-compatible object storage. An offloaded table keeps its definition and stays in the database. You continue to query and modify it with the same SQL statements, and Apache Cloudberry reads and writes its data files in the object storage instead of on the local disks of the segments.

Use `yezzey` to move cold data to cheaper storage and to reduce the disk space that a cluster needs.

:::note
`yezzey` is developed in the [open-gpdb/yezzey](https://github.com/open-gpdb/yezzey) project. The Apache Cloudberry source tree references it as a Git submodule in `gpcontrib/yezzey`. Apache Cloudberry 2.2 pins `yezzey` version 2.0.
:::

## How it works

`yezzey` consists of the following parts:

- A storage manager for append-optimized tables. It is installed as a hook when the `yezzey` library is loaded, and it redirects the file operations of offloaded tables to the object storage.
- The `yezzey` extension, which provides the functions and the metadata tables that manage offloading.
- [YProxy](https://github.com/open-gpdb/yproxy), a separate service that runs on the cluster hosts. The segments do not connect to the object storage directly. They send all requests to YProxy through a Unix domain socket, and YProxy keeps a pool of connections to the object storage and schedules the requests.

When a table is offloaded:

1. `yezzey` takes an exclusive lock on the table.
2. The data files of the table are uploaded to the object storage on all segments.
3. The tablespace of the table changes to the `yezzey` virtual tablespace (OID `8555`).
4. The transaction commits.

After offloading, new data that you insert into the table is written to the object storage. Files in the object storage are never modified in place. Each write creates new files, and `yezzey` records them in a metadata table, the virtual index, that follows the MVCC rules of the database. Files that are no longer referenced become garbage, which you remove with the cleanup functions described in [Remove obsolete files](#remove-obsolete-files).

## Build and install

`yezzey` is not built by default.

1. Fetch the submodule in the Apache Cloudberry source tree:

    ```shell
    git submodule update --init gpcontrib/yezzey
    ```

2. Configure Apache Cloudberry with the `--with-yezzey` option, then build and install. `--with-yezzey` requires OpenSSL support (`--with-ssl=openssl`) and a C++11 compiler:

    ```shell
    ./configure --with-yezzey --with-ssl=openssl [other options...]
    make
    make install
    ```

    To build only this module against an existing build tree:

    ```shell
    make -C gpcontrib/yezzey
    make -C gpcontrib/yezzey install
    ```

3. Build and install YProxy on every host of the cluster. See the [YProxy](https://github.com/open-gpdb/yproxy) project for instructions.

## Set up

### Configure and start YProxy

YProxy reads a YAML configuration file that defines its socket and the object storage. The following example is based on the configuration that the `yezzey` tests use:

```yaml
socket_path: "/tmp/yproxy.sock"
interconnect_socket_path: "/tmp/ic.sock"
log_level: info

storage:
  access_key_id: "<access key ID>"
  secret_access_key: "<secret access key>"
  storage_endpoint: "<endpoint URL>"
  storage_prefix: ""
  storage_bucket: "<bucket>"
  storage_region: "<region>"
  storage_type: "s3"
  tablespace_map:
    "pg_default": "<bucket>"

backup_storage:
  access_key_id: "<access key ID>"
  secret_access_key: "<secret access key>"
  storage_endpoint: "<endpoint URL>"
  storage_prefix: ""
  storage_bucket: "<bucket>"
  storage_region: "<region>"
  storage_type: "s3"
```

`tablespace_map` maps the tablespace that a table was in before offloading to the bucket that receives its data. Add an entry for every tablespace that contains tables you want to offload.

Start YProxy on every host, and make sure that the operating system user that runs Apache Cloudberry can access the socket:

```shell
yproxy -c /path/to/yproxy.yaml
```

For the complete list of YProxy settings, see the YProxy documentation.

### Enable the module

1. Add `yezzey` to `shared_preload_libraries` and restart the cluster. The library refuses to load in any other way:

    ```shell
    gpconfig -c shared_preload_libraries -v yezzey
    gpstop -ar
    ```

    If `shared_preload_libraries` already lists other libraries, keep them in the value.

2. Set the configuration parameters that your environment needs, and reload the configuration. At least check `yezzey.yproxy_socket` and `yezzey.use_gpg_crypto`:

    ```shell
    gpconfig -c yezzey.yproxy_socket -v "/tmp/yproxy.sock"
    gpstop -u
    ```

    `yezzey.use_gpg_crypto` is `on` by default, which requires a GPG key in the `crypto` section of the YProxy configuration (`gpg_key_id` and `gpg_key_path`). Without a key, `yezzey.offload_relation()` fails with `failed to offload relation`. If you do not encrypt the data, turn the parameter off:

    ```shell
    gpconfig -c yezzey.use_gpg_crypto -v false
    gpstop -u
    ```

3. Create the extension in each database in which you want to offload tables:

    ```sql
    CREATE EXTENSION yezzey;
    ```

    The extension creates the `yezzey` schema and grants `USAGE` on it to `PUBLIC`. The extension is marked as trusted, so a non-superuser who has the `CREATE` privilege on the database can create it.

    :::note
    The functions of the extension can be run by `PUBLIC`, and `yezzey.offload_relation()` and `yezzey.load_relation()` do not check the ownership of the table. Revoke `EXECUTE` on the functions from `PUBLIC` if only administrators should offload, load, or clean up tables.
    :::

## Configuration parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `yezzey.yproxy_socket` | string | `/tmp/yproxy.sock` | Path of the Unix domain socket of YProxy. |
| `yezzey.use_gpg_crypto` | boolean | `on` | Asks YProxy to encrypt the data with GPG when it is written to the object storage. The key is configured in the `crypto` section of the YProxy configuration. |
| `yezzey.storage_class` | string | `STANDARD` | Default storage class for the objects that `yezzey` writes. |
| `yezzey.multipart_chunksize` | integer | `16777216` | Default chunk size of a multipart upload, in bytes. |
| `yezzey.multipart_threshold` | integer | `67108864` | Default size threshold for multipart uploads, in bytes. |
| `yezzey.use_otm_feature` | boolean | `off` | Enables the offload tablespace map. When it is `off`, only tables in the default tablespace can be offloaded. When it is `on`, tables in other tablespaces can be offloaded too, and `yezzey` records the original tablespace of each table in `yezzey.offload_tablespace_map`. This parameter can be set only at connection start or in the server configuration. |
| `yezzey.log_level` | enum | `debug1` | Log level of the messages of the `yezzey` functions. |
| `yezzey.ao_log_level` | enum | `debug1` | Log level of the messages about the read and write operations on offloaded files. |
| `yezzey.autooffload` | boolean | `off` | Reserved. The parameter is defined, but it is not used in this version. |

Except for `yezzey.use_otm_feature` and `yezzey.autooffload`, the parameters can be changed by superusers only.

## Offload a table

`yezzey` works with append-optimized tables only, both row-oriented and column-oriented.

To offload an existing table, call `yezzey.offload_relation()`:

```sql
CREATE TABLE sales_archive (id int, amount numeric)
    WITH (appendonly=true) DISTRIBUTED BY (id);
INSERT INTO sales_archive SELECT i, i FROM generate_series(1, 100000) i;

SELECT yezzey.offload_relation('sales_archive');
```

The function reports its progress with `NOTICE` messages from each segment. The time that it takes depends on the size of the table. If the table is already offloaded, the function returns with the warning `The relation has already been offloaded`.

You can also create a table that is offloaded from the start, by placing it in the `yezzey` virtual tablespace:

```sql
CREATE TABLE regao_tt_alr_off (i int)
    WITH (appendonly=true)
    TABLESPACE yezzey
    DISTRIBUTED BY (i);

INSERT INTO regao_tt_alr_off SELECT generate_series(1,10010);

SELECT segindex, local_bytes, external_bytes
FROM yezzey.offload_relation_status('regao_tt_alr_off');
```

```text
 segindex | local_bytes | external_bytes
----------+-------------+----------------
        0 |           0 |          33816
        1 |           0 |          33928
        2 |           0 |          32560
(3 rows)
```

After a table is offloaded, you can continue to run `SELECT`, `INSERT`, `UPDATE`, `DELETE`, `VACUUM`, and `ALTER TABLE ... ADD COLUMN` on it.

To offload a partitioned table, offload each leaf partition. Calling `yezzey.offload_relation()` on the partitioned table itself fails.

## Load a table back to local storage

To move the data of an offloaded table back to the local disks of the segments, call `yezzey.load_relation()`:

```sql
SELECT yezzey.load_relation('sales_archive');
```

The time that the download takes depends on the size of the table and the number of its segment files. The files that were uploaded earlier stay in the object storage, so `external_bytes` in `yezzey.offload_relation_status()` is not reset to `0`.

## Check the status of a table

`yezzey.offload_relation_status()` returns one row per segment:

```sql
SELECT * FROM yezzey.offload_relation_status('sales_archive');
```

| Column | Description |
|---|---|
| `reloid` | OID of the table. |
| `segindex` | Segment content ID. |
| `local_bytes` | Size of the data that is stored on the local disk. `0` means that the table is fully offloaded. |
| `local_commited_bytes` | Size of the committed data on the local disk. |
| `external_bytes` | Size of the data in the object storage. `0` on all segments means that the table has never been offloaded. |
| `external_bloat_bytes` | Size of the data in the object storage that is no longer in use but is not deleted yet. |

For more detail, use `yezzey.offload_relation_status_per_filesegment()`, which returns one row per segment file, or `yezzey.relation_describe_external_storage_structure()`, which returns one row per file in the object storage, including its path.

The `yezzey.offload_metadata` table lists the tables that were offloaded with `yezzey.offload_relation()`. Tables that were created directly in the `yezzey` tablespace are not listed. `SELECT` on this table is granted to `PUBLIC`.

## Remove obsolete files

Data in the object storage is not deleted when rows are deleted or when a table is dropped, because the files might still be needed to roll back a transaction or to restore a backup. The following functions send delete requests for obsolete files to YProxy. They run on all segments.

| Function | Scope |
|---|---|
| `yezzey.vacuum(confirm boolean DEFAULT false, crazyDrop boolean DEFAULT false)` | All tablespaces. |
| `yezzey.vacuum_tablespace(tablespace oid, confirm boolean DEFAULT false, crazyDrop boolean DEFAULT false)` | One tablespace. |
| `yezzey.vacuum_relation(relation regclass, confirm boolean DEFAULT false, crazyDrop boolean DEFAULT false)` | One offloaded table. |

- `confirm` controls whether YProxy actually deletes the objects. With the default `false`, the call is a dry run. Set it to `true` to confirm the deletion.
- `crazyDrop` enables a more aggressive cleanup mode. Only superusers can set it to `true`.

A typical cleanup looks like this:

1. Run `VACUUM` on the append-optimized table, so that its obsolete files become garbage.
2. Inspect the storage of the table with `yezzey.relation_describe_external_storage_structure('<table>')`.
3. Call `yezzey.vacuum_relation()`, `yezzey.vacuum_tablespace()`, or `yezzey.vacuum()`, depending on the scope that you want to clean.
4. Check the storage of the table again to verify that the obsolete files are removed.

By default, YProxy keeps the files that a backup might still need. See the `vacuum` section of the YProxy configuration for the settings that control this behavior.

## Function reference

All functions are in the `yezzey` schema.

| Function | Returns | Description |
|---|---|---|
| `offload_relation(relation regclass)` | `void` | Offloads an append-optimized table to the object storage. |
| `load_relation(relation regclass)` | `void` | Loads an offloaded table back to local storage. |
| `offload_relation_status(relation regclass)` | set of rows | Local and external size of a table, per segment. |
| `offload_relation_status_per_filesegment(relation regclass)` | set of rows | Local and external size of a table, per segment file. |
| `relation_describe_external_storage_structure(relation regclass)` | set of rows | The files of a table in the object storage, with their paths and sizes. |
| `vacuum(confirm boolean, crazyDrop boolean)` | set of `boolean` | Removes obsolete files in all tablespaces. |
| `vacuum_tablespace(tablespace oid, confirm boolean, crazyDrop boolean)` | set of `boolean` | Removes obsolete files in one tablespace. |
| `vacuum_relation(relation regclass, confirm boolean, crazyDrop boolean)` | set of `boolean` | Removes obsolete files of one offloaded table. |

The extension also creates internal functions and metadata tables, such as `yezzey.yezzey_virtual_index`, `yezzey.yezzey_expire_index`, and `yezzey.offload_tablespace_map`. Do not call the internal functions or modify the metadata tables directly.

## Usage notes

- Only append-optimized tables can be offloaded.
- To offload a table that is not in the default tablespace, turn on `yezzey.use_otm_feature`. Otherwise the offload is rejected.
- You cannot move an offloaded table to another tablespace with `ALTER TABLE ... SET TABLESPACE`. The statement fails. Use `yezzey.load_relation()` to bring the data back to local storage.
- YProxy must be running on every host before you access offloaded tables. If YProxy or the object storage is unavailable, `yezzey` retries the read requests up to 100 times.
- Offloading takes an exclusive lock on the table for the duration of the upload.
- When you restore a cluster from a backup, the object storage must contain the files that the backup refers to. For this reason, obsolete files are kept until no backup needs them.
- For a standby cluster that receives WAL from the primary cluster, the object storage must be accessible from the standby cluster as well.
