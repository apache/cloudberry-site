---
title: Extension Modules Overview
---

# Extension Modules Overview

Apache Cloudberry ships with a set of optional modules that add data types, functions, operators, foreign-data wrappers, storage formats, and diagnostic tools to the database. The modules live in two directories of the source tree:

- `contrib/` holds the modules that come from PostgreSQL, plus several modules that Apache Cloudberry adds.
- `gpcontrib/` holds the modules that are specific to Apache Cloudberry.

This page lists every module in both directories as of Apache Cloudberry 2.2, with its version, its history across the 2.x releases, and how it is built.

## Use a module

Most modules are packaged as extensions. An extension is registered once in every database in which you want to use it:

```sql
CREATE EXTENSION <extension_name>;
```

To list the extensions that are installed on the cluster and the ones that are registered in the current database:

```sql
SELECT name, default_version, installed_version FROM pg_available_extensions ORDER BY name;
```

Some modules are plain shared libraries that do not have SQL objects. You load such a module with `LOAD`, or by adding it to `shared_preload_libraries` or `session_preload_libraries`. The page of each module tells you which method applies.

## How to read the tables

**Version** is the extension version (`default_version` in the control file of the module) in Apache Cloudberry 2.2. A dash means that the module is a library or a program without an extension version.

**2.x history** compares the 2.0, 2.1, and 2.2 releases with each other, and 2.0 with the 1.6 release:

- **New in 2.0**, **New in 2.1**, **New in 2.2**: the release that first includes the module.
- **Updated in ...**: the extension version changed in that release.
- A dash means that the module is present in 2.0, 2.1, and 2.2 with the same version.

**Build** tells you how the module gets built when you build Apache Cloudberry from source:

- **Default**: `make` and `make install` at the top of the source tree build and install the module.
- **On request**: the module is in the source tree, but you need to build it explicitly, for example with `make -C contrib/<module> install`, or by building the `world` target. The build scripts in `devops/build/automation/cloudberry/scripts` of the source tree also build and install `contrib/`, so a cluster built with them has these modules, provided that the required `configure` options are set.
- **A `configure` option**: the module is built only when you pass that option to `configure`. Where the option is on by default, the table says so.
- **Not built**: the source is in the tree, but no makefile target of Apache Cloudberry builds it.

The module files must be installed on the coordinator and on every segment host.

:::note
A module name that links to a page in this section has been reviewed against the Apache Cloudberry 2.x source code. For the other PostgreSQL modules, the link points to the PostgreSQL documentation. Those modules follow the PostgreSQL behavior, and some of them might have limitations in a distributed cluster.
:::

## Modules in contrib/

### PostgreSQL modules

| Module | Description | Version | 2.x history | Build |
|---|---|---|---|---|
| [adminpack](https://www.postgresql.org/docs/14/adminpack.html) | Support functions for administration tools such as pgAdmin. | 2.1 | — | Not built |
| [amcheck](https://www.postgresql.org/docs/14/amcheck.html) | Verifies the logical consistency of relations and indexes. | 1.3 | — | On request |
| [auth_delay](https://www.postgresql.org/docs/14/auth-delay.html) | Pauses before reporting an authentication failure. | — | — | On request |
| [auto_explain](./auto-explain.md) | Logs execution plans of slow statements automatically. | — | — | Default |
| [bloom](https://www.postgresql.org/docs/14/bloom.html) | Index access method based on Bloom filters. | 1.0 | — | On request |
| bool_plperl | Transform between `bool` and PL/Perl. | 1.0 | — | On request, with `--with-perl` |
| [btree_gin](./btree-gin.md) | GIN operator classes with B-tree behavior. | 1.3 | — | Default |
| [btree_gist](https://www.postgresql.org/docs/14/btree-gist.html) | GiST operator classes with B-tree behavior. | 1.6 | — | On request |
| [citext](./citext.md) | Case-insensitive character string type. | 1.6 | — | Default |
| [cube](https://www.postgresql.org/docs/14/cube.html) | Data type for multidimensional cubes. | 1.5 | — | Not built |
| [dblink](./dblink.md) | Connects to other databases from within a session. | 1.2 | — | Default |
| [dict_int](https://www.postgresql.org/docs/14/dict-int.html) | Text search dictionary template for integers. | 1.0 | — | On request |
| [dict_xsyn](https://www.postgresql.org/docs/14/dict-xsyn.html) | Text search dictionary template for extended synonym processing. | 1.0 | — | On request |
| [earthdistance](https://www.postgresql.org/docs/14/earthdistance.html) | Calculates great-circle distances on the surface of the Earth. | 1.1 | — | Not built |
| [file_fdw](https://www.postgresql.org/docs/14/file-fdw.html) | Foreign-data wrapper for files in the server file system. | 1.0 | — | Default |
| [fuzzystrmatch](./fuzzystrmatch.md) | Determines similarities and distance between strings. | 1.1 | — | Default |
| [hstore](./hstore.md) | Stores sets of key/value pairs in a single value. | 1.8 | — | Default |
| hstore_plperl | Transform between `hstore` and PL/Perl. | 1.0 | — | On request, with `--with-perl` |
| hstore_plpython | Transform between `hstore` and PL/Python. | 1.0 | — | On request, with `--with-python` (on by default) |
| [intagg](https://www.postgresql.org/docs/14/intagg.html) | Integer aggregator and enumerator (obsolete). | 1.1 | — | On request |
| [intarray](https://www.postgresql.org/docs/14/intarray.html) | Functions, operators, and index support for arrays of integers. | 1.5 | — | On request |
| [isn](./isn.md) | Data types for international product numbering standards. | 1.2 | — | On request |
| jsonb_plperl | Transform between `jsonb` and PL/Perl. | 1.0 | — | On request, with `--with-perl` |
| jsonb_plpython | Transform between `jsonb` and PL/Python. | 1.0 | — | On request, with `--with-python` (on by default) |
| [lo](https://www.postgresql.org/docs/14/lo.html) | Large object maintenance. | 1.1 | — | Not built |
| [ltree](./ltree.md) | Data type for hierarchical tree-like labels. | 1.2 | — | On request |
| ltree_plpython | Transform between `ltree` and PL/Python. | 1.0 | — | On request, with `--with-python` (on by default) |
| [oid2name](https://www.postgresql.org/docs/14/oid2name.html) | Utility program that resolves OIDs and file nodes to names. | — | — | On request |
| [old_snapshot](https://www.postgresql.org/docs/14/oldsnapshot.html) | Shows the XID/time mapping that `old_snapshot_threshold` uses. | 1.0 | — | On request |
| [pageinspect](./pageinspect.md) | Inspects the contents of database pages at a low level. | 1.9 | — | Default |
| [passwordcheck](https://www.postgresql.org/docs/14/passwordcheck.html) | Checks the strength of passwords. | — | — | Default |
| [pg_buffercache](./pg-buffercache.md) | Examines the shared buffer cache. | 1.4.1 | **Updated in 2.0** (1.3 to 1.4.1) | Default |
| [pg_freespacemap](https://www.postgresql.org/docs/14/pgfreespacemap.html) | Examines the free space map. | 1.2 | — | On request |
| [pg_prewarm](https://www.postgresql.org/docs/14/pgprewarm.html) | Loads relation data into the buffer cache. | 1.2 | — | On request |
| [pg_standby](https://www.postgresql.org/docs/14/pgstandby.html) | Utility program for warm standby servers. | — | — | Not built |
| [pg_stat_statements](https://www.postgresql.org/docs/14/pgstatstatements.html) | Tracks planning and execution statistics of SQL statements. | 1.9 | — | On request |
| [pg_surgery](https://www.postgresql.org/docs/14/pgsurgery.html) | Performs surgery on a damaged relation. | 1.0 | — | On request |
| [pg_trgm](./pg-trgm.md) | Text similarity measurement and index searching based on trigrams. | 1.6 | — | Default |
| [pg_visibility](https://www.postgresql.org/docs/14/pgvisibility.html) | Examines the visibility map and page-level visibility information. | 1.2 | — | On request |
| [pgcrypto](./pgcrypto.md) | Cryptographic functions. | 1.3 | — | Default |
| [pgrowlocks](https://www.postgresql.org/docs/14/pgrowlocks.html) | Shows row-level locking information. | 1.2 | — | On request |
| [pgstattuple](https://www.postgresql.org/docs/14/pgstattuple.html) | Shows tuple-level statistics. | 1.5 | — | On request |
| [postgres_fdw](./postgres-fdw.md) | Foreign-data wrapper for data stored in external PostgreSQL servers. | 1.1 | — | On request |
| [seg](https://www.postgresql.org/docs/14/seg.html) | Data type for line segments or floating-point intervals. | 1.4 | — | On request |
| [sepgsql](https://www.postgresql.org/docs/14/sepgsql.html) | Label-based mandatory access control based on SELinux. | — | — | On request, with `--with-selinux` |
| [spi](https://www.postgresql.org/docs/14/contrib-spi.html) | Example trigger functions: `autoinc`, `insert_username`, `moddatetime`, and `refint`. | 1.0 | — | On request |
| [sslinfo](./sslinfo.md) | Information about the SSL certificate of the current client. | 1.2 | — | On request, requires OpenSSL |
| start-scripts | Example scripts for starting the server at boot time. | — | — | Not built |
| [tablefunc](./tablefunc.md) | Functions that return tables, including `crosstab`. | 1.0 | — | Default |
| [tcn](https://www.postgresql.org/docs/14/tcn.html) | Trigger function that notifies listeners of changes to a table. | 1.0 | — | On request |
| [test_decoding](https://www.postgresql.org/docs/14/test-decoding.html) | Example output plugin for logical decoding. | — | — | On request |
| [tsm_system_rows](./tsm-system-rows.md) | `SYSTEM_ROWS` table sampling method. | 1.0 | — | On request |
| [tsm_system_time](./tsm-system-time.md) | `SYSTEM_TIME` table sampling method. | 1.0 | — | On request |
| [unaccent](https://www.postgresql.org/docs/14/unaccent.html) | Text search dictionary that removes accents. | 1.1 | — | On request |
| [uuid-ossp](./uuid-ossp.md) | Functions that generate universally unique identifiers (UUIDs). | 1.1 | — | On request, with `--with-uuid=LIB` |
| [vacuumlo](https://www.postgresql.org/docs/14/vacuumlo.html) | Utility program that removes orphaned large objects. | — | — | On request |
| [xml2](https://www.postgresql.org/docs/14/xml2.html) | XPath querying and XSLT functions (obsolete). | 1.1 | — | On request, with `--with-libxml` |

### Apache Cloudberry modules

| Module | Description | Version | 2.x history | Build |
|---|---|---|---|---|
| extprotocol | Example of a custom protocol for external tables. | — | — | Default |
| formatter | Example of a custom data formatter for external tables. | — | — | Default |
| formatter_fixedwidth | Custom formatter that reads and writes fixed-width data files. | — | — | Default |
| indexscan | The `readindex()` function, which reads the entries of an index for testing and diagnosis. | — | — | Default |
| interconnect | The interconnect implementations (UDP, TCP, and proxy) as a loadable module. The `interconnect` extension adds views with interconnect statistics. | 1.0 | **Updated in 2.2** (packaged as an extension) | Default |
| pax_storage | The PAX table format. See [PAX Storage Format](../operate-with-data/pax-table-format.md). | — | **New in 2.0** | `--enable-pax` |
| sasdemo | Example programs and formatter functions for exchanging data with SAS. | — | — | Not built |
| try_convert | The `try_convert()` function for type casts that return a default value instead of an error. | 1.0 | **New in 2.2** | Default |
| udp2 | A reworked implementation of the UDP interconnect that is separated from the database kernel. | — | **New in 2.1** | `--enable-ic-udp2` |

## Modules in gpcontrib/

| Module | Description | Version | 2.x history | Build |
|---|---|---|---|---|
| [diskquota](./diskquota.md) | Limits the disk space that schemas, roles, and tablespaces can use. | 2.3 | **New in 2.2** | `--with-diskquota` |
| gp_debug_numsegments | Gets and sets the default number of segments that new tables are created on. For development and testing. | 1.0 | — | Default (debug extensions) |
| [gp_distribution_policy](./gp-distribution-policy.md) | Checks whether the rows of a table are stored on the segments that the distribution policy expects. | 1.0 | — | Default |
| [gp_exttable_fdw](./gp-exttable-fdw.md) | Foreign-data wrapper that implements external tables. | 1.0 | — | Default |
| gp_inject_fault | Fault injection framework. For development and testing. | 1.0 | — | Default (debug extensions) |
| [gp_internal_tools](./gp-internal-tools.md) | Diagnostic views and functions for troubleshooting. | 1.0.0 | — | Default |
| [gp_legacy_string_agg](./gp-legacy-string-agg.md) | The single-argument `string_agg()` aggregate. | 1.0.0 | — | Default |
| [gp_relsizes_stats](./gp-relsizes-stats.md) | Tracks the on-disk sizes of tables. | 1.0 | **New in 2.2** | Default |
| gp_replica_check | Compares primary and mirror segments. For development and testing. | 0.0.1 | — | Default (debug extensions) |
| [gp_sparse_vector](./gp-sparse-vector.md) | Sparse vector data type and its operators. | 1.0.1 | — | Default |
| [gp_stats_collector](./gp-stats-collector.md) | Collects query and plan execution metrics and reports them to a monitoring agent. | 1.2 | **New in 2.2** | `--with-gp-stats-collector` |
| [gp_toolkit](../sys-catalogs/gp_toolkit.md) | Administrative views and functions. | 1.7 | **Updated in 2.0** (1.4 to 1.6), **Updated in 2.2** (1.6 to 1.7) | Default |
| gpcloud | The `s3` protocol for external tables and the `gpcheckcloud` utility. See [Load Data from Amazon S3](../data-loading/load-data-from-s3.md). | — | — | `--enable-gpcloud` |
| gpmapreduce | The `gpmapreduce` utility. | — | — | `--enable-mapreduce` |
| [orafce](./orafce.md) | Oracle compatibility functions and packages. | 4.9 | — | `--enable-orafce` |
| pg_hint_plan | Controls execution plans with hints in SQL comments. See [Query Plan Hints](../performance/optimize-queries/query-hints.md). | 1.3.9 | **New in 2.0** | Default |
| pxf_fdw | Foreign-data wrapper for the Platform Extension Framework (PXF). See [Load Data Using PXF](../data-loading/load-data-using-pxf.md). | 1.0 | — | `--enable-pxf` (on by default) |
| [reject_partition_fullscan](./reject-partition-fullscan.md) | Rejects queries that scan all partitions of a table without pruning. | 1.0 | **New in 2.2** | Default (debug extensions) |
| [yezzey](./yezzey.md) | Offloads the data of append-optimized tables to S3-compatible object storage. The source is a Git submodule. | 2.0 | **New in 2.2** | `--with-yezzey` |
| zstd | Zstandard compression for append-optimized tables. | — | — | `--with-zstd` (on by default) |

The modules that are marked as debug extensions are built unless you pass `--disable-debug-extensions` to `configure`. Do not use `gp_debug_numsegments`, `gp_inject_fault`, or `gp_replica_check` in production clusters.

### Removed modules

| Module | Description | Removed in |
|---|---|---|
| quicklz | QuickLZ compression for append-optimized tables. | 2.1 |
