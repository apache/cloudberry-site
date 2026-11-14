---
title: gp_exttable_fdw
---

# gp_exttable_fdw

The `gp_exttable_fdw` module is the foreign-data wrapper that Apache Cloudberry uses to implement external tables. An external table is stored in the catalog as a foreign table that belongs to the `gp_exttable_server` foreign server, and `gp_exttable_fdw` scans it or inserts into it.

:::note
`gp_exttable_fdw` and `gp_exttable_server` are special built-in objects that exist for backward compatibility with external tables. Do not use the wrapper directly in normal operation. Define external tables with [`CREATE EXTERNAL TABLE`](../sql-stmts/create-external-table.md) instead.
:::

## Installation

`gp_exttable_fdw` is always built and installed with Apache Cloudberry. It is part of the default `gpcontrib` build targets and does not depend on any `configure` option.

The module is packaged as an extension (version `1.0`, not relocatable) whose objects are created in the `pg_catalog` schema. `initdb` registers the extension when the cluster is initialized, so you do not need to run `CREATE EXTENSION`. It does not require `shared_preload_libraries` or a restart.

## Objects provided by the module

| Object | Type | Description |
|---|---|---|
| `gp_exttable_fdw` | Foreign-data wrapper | The wrapper for external tables. Uses `gp_exttable_fdw_handler()` as its handler and `gp_exttable_permission_check()` as its validator. |
| `gp_exttable_server` | Foreign server | The server that all external tables belong to. |
| `gp_exttable_fdw_handler()` | Function | The FDW handler. Supports foreign scans and foreign inserts. |
| `gp_exttable_permission_check(text[], oid)` | Function | The FDW validator. Checks the table options and the permissions of the current role. |
| `pg_exttable()` | Function | Returns one row for each external table. Runs on the coordinator. |
| `pg_exttable` | View | Defined as `SELECT * FROM pg_exttable()`. |

### The pg_exttable view

The `pg_exttable` view shows the external table definition that is stored in the options of each foreign table of `gp_exttable_server`.

| Column | Type | Description |
|---|---|---|
| `reloid` | `oid` | The OID of the external table. |
| `urilocation` | `text[]` | The location URIs of the external table. |
| `execlocation` | `text[]` | The segment locations where the external table runs. |
| `fmttype` | `"char"` | The format type of the external data. |
| `fmtopts` | `text` | The formatting options. |
| `options` | `text[]` | `{error_log_persistent=true}` when the table was created with `LOG ERRORS PERSISTENTLY`. Otherwise `NULL`. |
| `command` | `text` | The OS command to run for an `EXECUTE` external table. |
| `rejectlimit` | `int4` | The reject limit for single row error handling. `NULL` when single row error handling is not used. |
| `rejectlimittype` | `"char"` | The type of the reject limit: `r` for rows or `p` for percent. `NULL` when single row error handling is not used. |
| `logerrors` | `bool` | Whether errors are logged. |
| `encoding` | `int4` | The ID of the encoding of the external data. Use `pg_encoding_to_char(encoding)` to get the name. |
| `writable` | `bool` | Whether the table is a writable external table. |

For example:

```sql
SELECT reloid::regclass, urilocation, pg_encoding_to_char(encoding)
FROM pg_exttable;
```

## Foreign table options

The validator of `gp_exttable_fdw` checks the following options of a foreign table that belongs to `gp_exttable_server`:

| Option | Description |
|---|---|
| `format_type` | Required. One of `t` (text), `c` (CSV), or `b` (custom). |
| `location_uris` | The location URIs, separated by the `\|` character. You must specify either `location_uris` or `command`, and you cannot specify both. |
| `command` | The command of an `EXECUTE` external web table. Only superusers can set this option. |
| `is_writable` | A Boolean value that marks the table as writable. |
| `reject_limit_type` | `r` (rows, the default) or `p` (percent). |
| `reject_limit` | The reject limit for single row error handling. It cannot be used with a writable external table. |
| `encoding` | An encoding name (for example `UTF8` or `GBK`) or a numeric encoding ID. |

When a role that is not a superuser creates a table, the validator also checks whether the role is allowed to create an external table for the protocol of the location URIs.

A literal `|` or `\` character inside a location URI must be escaped as `\|` or `\\` in the `location_uris` option value.
