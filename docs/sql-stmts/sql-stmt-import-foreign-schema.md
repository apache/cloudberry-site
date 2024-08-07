---
title: IMPORT FOREIGN SCHEMA
---

# IMPORT FOREIGN SCHEMA

Imports table definitions from a foreign server.

## Synopsis

```sql
IMPORT FOREIGN SCHEMA <remote_schema>
    [ { LIMIT TO | EXCEPT } ( <table_name> [, ...] ) ]
    FROM SERVER <server_name>
    INTO <local_schema>
    [ OPTIONS ( <option> '<value>' [, ... ] ) ]
```

## Description

`IMPORT FOREIGN SCHEMA` creates foreign tables that represent tables existing on a foreign server. The new foreign tables will be owned by the user issuing the command and are created with the correct column definitions and options to match the remote tables.

By default, all tables and views existing in a particular schema on the foreign server are imported. Optionally, the list of tables can be limited to a specified subset, or specific tables can be excluded. The new foreign tables are all created in the target schema, which must already exist.

To use `IMPORT FOREIGN SCHEMA`, the user must have `USAGE` privilege on the foreign server, as well as `CREATE` privilege on the target schema.

Support for importing foreign schemas is foreign-data wrapper-specific.

## Parameters

**`remote_schema`**

The remote schema to import from. The specific meaning of a remote schema depends on the foreign data wrapper in use.

**`LIMIT TO ( table_name [, ...] )`**

Import only foreign tables matching one of the given table names. Other tables existing in the foreign schema will be ignored.

**`EXCEPT ( table_name [, ...] )`**

Exclude specified foreign tables from the import. All tables existing in the foreign schema will be imported except the ones listed here.

**`server_name`**

The name of the foreign server from which to import the table definitions.

**`local_schema`**

The schema in which Cloudberry Database will create the imported foreign tables.

**`OPTIONS ( option 'value' [, ... ] )`**

The options to be used during the import. The allowed option names and values are specific to each foreign-data wrapper.


## Examples

Import table definitions from a remote schema `foreign_films` on server `film_server`, creating the foreign tables in local schema `films`:

```sql
IMPORT FOREIGN SCHEMA foreign_films
    FROM SERVER film_server INTO films;
```

As above, but import only the two tables `actors` and `directors` (if they exist):

```sql
IMPORT FOREIGN SCHEMA foreign_films LIMIT TO (actors, directors)
    FROM SERVER film_server INTO films;
```

## Compatibility

The `IMPORT FOREIGN SCHEMA` command conforms to the SQL standard, except that the `OPTIONS` clause is a Cloudberry Database extension.

## See also

[CREATE FOREIGN TABLE](/docs/sql-stmts/sql-stmt-create-foreign-table.md), [CREATE SERVER](/docs/sql-stmts/sql-stmt-create-server.md)
