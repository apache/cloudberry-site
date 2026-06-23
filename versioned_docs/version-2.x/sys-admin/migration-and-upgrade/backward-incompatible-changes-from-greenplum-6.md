---
title: Backward-incompatible changes from Greenplum 6.x
toc_max_heading_level: 5
---

# Backward-incompatible changes from Greenplum 6.x

This page lists the backward-incompatible (breaking) changes that you may encounter when migrating workloads from Greenplum Database 6.x to Apache Cloudberry. The differences come from two sources: a much newer PostgreSQL kernel underneath Cloudberry, and a number of intentional cleanups in Greenplum-specific syntax, partitioning, and system catalogs.

Use this page as a pre-migration checklist alongside [Migration and Upgrade](./migration-and-upgrade.md), which describes the migration procedure itself with `cbcopy`. For each change below you will find:

- a short explanation of what changed and why it can break existing workloads;
- a **How to detect** section with SQL or shell snippets you can run on the source Greenplum 6.x cluster to find affected objects;
- a **How to fix** section with the recommended remediation, to be applied either on the source cluster before migration or on the target Cloudberry cluster after migration.

The changes are grouped into the following categories:

- **Upgrade blockers** — changes that will prevent migration or cause data corruption if ignored; address these first.
- **Changes in function and operator behavior** — semantics of existing built-in functions and operators that have changed without a syntax change, so queries may run but return different results.
- **Syntax changes and removed constructs** — SQL syntax that is no longer accepted or that requires rewriting.
- **Changes in partitioning mechanisms** — differences in how partitioned tables are declared, constrained, and represented.
- **Changes in the system catalog and metadata** — renamed or removed catalog tables, views, columns, and functions that monitoring tools, scripts, and extensions may rely on.
- **Changes in configuration and resource management** — removed or renamed GUC parameters, different default values, and changes to bundled extensions.

We recommend running every **How to detect** query on each database of the source cluster before the migration window, building an inventory of affected objects, and triaging the remediation according to the categories above.

## Upgrade blockers

### Incompatible change in the internal format of the `jsonb` type

In PostgreSQL kernel versions newer than 9.4, the internal representation of the `jsonb` type was changed without backward compatibility.

**How to detect**

Find all tables that use `jsonb`:

```sql
SELECT n.nspname, c.relname, a.attname
FROM pg_attribute a
    JOIN pg_class c ON c.oid = a.attrelid
    JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE a.atttypid = 'jsonb'::regtype
    AND a.attnum > 0;
```

**How to fix**

Recreate the problematic columns, replacing `jsonb` with `json` or `text`. If necessary, migrate the data before dropping the column with `jsonb`.

### Removal of the `abstime`, `reltime`, `tinterval`, and `unknown` types

Starting with PostgreSQL kernel version 10, the `unknown` type became a pseudo-type.  
Starting with PostgreSQL kernel version 12, the `abstime`, `reltime`, and `tinterval` types were removed.

In Greenplum 6, the following queries work without errors:

```sql
CREATE TABLE example_abstime (x abstime);

CREATE TABLE example_reltime (x reltime);

CREATE TABLE example_tinterval (x tinterval);

CREATE TABLE example_unknown (x unknown);
WARNING:  column "x" has type "unknown"
```

In Cloudberry, the same queries fail with errors:

```sql
CREATE TABLE example_abstime (x abstime);
ERROR:  type "abstime" does not exist

CREATE TABLE example_reltime (x reltime);
ERROR:  type "reltime" does not exist

CREATE TABLE example_tinterval (x tinterval);
ERROR:  type "tinterval" does not exist

CREATE TABLE example_unknown (x unknown);
ERROR:  column "x" has pseudo-type unknown
```

**How to detect**

All of these data types have been completely removed and are no longer available for use:

* in SQL queries;
* in table definitions;
* in PL/pgSQL functions.

Tables using the removed types can be found with the following query:

```sql
SELECT n.nspname, c.relname, a.attname, t.typname
FROM pg_attribute a
    JOIN pg_class c ON c.oid = a.attrelid
    JOIN pg_namespace n ON n.oid = c.relnamespace
    JOIN pg_type t ON t.oid = a.atttypid
WHERE t.typname IN ('abstime', 'reltime', 'tinterval', '_abstime', '_reltime', '_tinterval', 'unknown')
    AND a.attnum > 0
    AND NOT a.attisdropped;
```

It is also worth checking user-defined type definitions, views, and PL/pgSQL functions separately.

**How to fix**

Replace each use of a deprecated type with a current equivalent:

* `abstime` → `timestamp` / `timestamptz`
* `reltime` → `interval`
* `tinterval` → a pair of `timestamp`/`timestamptz` values, or `text`
* `unknown` → the most appropriate type depending on the data, or `text`

### Prohibition on using the `pg_` prefix in role names

Starting with PostgreSQL kernel version 9.6, the `pg_` prefix is reserved for system role and user names and is no longer available.

In Greenplum 6, the following query works without errors:

```sql
CREATE ROLE pg_example;
```

In Cloudberry, this query fails with an error:

```sql
CREATE ROLE pg_example;
ERROR:  role name "pg_example" is reserved
DETAIL:  Role names starting with "pg_" are reserved.
```

**How to detect**

```sql
SELECT rolname FROM pg_catalog.pg_roles WHERE rolname ~ '^pg_';
```

**How to fix**

```sql
ALTER ROLE pg_example RENAME TO another_example;
```

The fix can be applied before the upgrade.

### Removal of the `tsearch2` and `timetravel` extensions

The following extensions have been completely removed in Cloudberry:

* `tsearch2`;
* `timetravel`.

**How to detect**

Check whether these extensions are installed and whether they are used in your codebase:

```sql
SELECT extname, extversion
FROM pg_extension
WHERE extname IN ('tsearch2', 'timetravel');
```

**How to fix**

Stop using the removed extensions.

### Support for tables created with the `WITH OIDS` option has been removed

In PostgreSQL kernel versions newer than 12, support for tables created with the `WITH OIDS` option was removed.

In Greenplum 6, the following query works without errors:

```sql
CREATE TABLE example (value text) with oids;
```

In Cloudberry, the same query fails with an error:

```sql
CREATE TABLE example (value text) with oids;
ERROR:  syntax error at or near "oids"
```

**How to detect**

All tables defined with the `WITH OIDS` option can be found with the following query:

```sql
SELECT n.nspname, c.relname
FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE c.relhasoids
    AND n.nspname NOT IN ('pg_catalog', 'information_schema');
```

**How to fix**

For each found table, run `ALTER TABLE ... SET WITHOUT OIDS;`. If OID was used as a business key, additionally add a `bigserial` column, or any other suitable column.

## Changes in function and operator behavior

### Change in the behavior of set-returning functions

Starting with PostgreSQL kernel version 10, the behavior of Set Returning Functions, such as `generate_series`, `unnest`, `regexp_split_to_table`, `json_each`, and `json_array_elements`, changed in the `SELECT` list.

The difference can be seen in the following example.

Greenplum 6:

```sql
SELECT 'example' AS value, generate_series(1, 3), generate_series(1, 2);
  value  | generate_series | generate_series
---------+-----------------+-----------------
 example |               1 |               1
 example |               2 |               2
 example |               3 |               1
 example |               1 |               2
 example |               2 |               1
 example |               3 |               2
(6 rows)
```

Cloudberry:

```sql
SELECT 'example' AS value, generate_series(1, 3), generate_series(1, 2);
  value  | generate_series | generate_series
---------+-----------------+-----------------
 example |               1 |               1
 example |               2 |               2
 example |               3 |
(3 rows)
```

**How to detect**

Check the application codebase for uses of Set Returning Functions in the `SELECT` list.

**How to fix**

Replace calls to Set Returning Functions in the `SELECT` list with the corresponding `CROSS JOIN LATERAL`.

### The return type of the `extract()` function has been changed to `numeric`

Starting with PostgreSQL kernel version 14, the `extract()` function returns a value of type `numeric` instead of `double precision`.

Example for Greenplum 6:

```sql
SELECT pg_typeof(extract(epoch FROM now()));
     pg_typeof
------------------
 double precision
```

Example for Cloudberry:

```sql
SELECT pg_typeof(extract(epoch FROM now()));
 pg_typeof
-----------
  numeric
```

If an application expects `double precision`, its behavior may become unpredictable.

**How to detect**

Check the application codebase for uses of the `extract()` function.

**How to fix**

Modify the application or the problematic queries by adding an explicit type cast with `::double precision`.

### The behavior of the `to_number()` function has been fixed for correct format handling

In Greenplum 6, the `to_number()` function “swallowed” extra characters:

```sql
SELECT to_number('1234', '9,999');
 to_number
-----------
       134
(1 row)
```

In Cloudberry, this behavior has been fixed:

```sql
SELECT to_number('1234', '9,999');
 to_number
-----------
      1234
(1 row)
```

**How to detect**

Check the application codebase for uses of the `to_number()` function and for possible issues caused by “swallowing” extra characters.

**How to fix**

Adapt the application to the changed, correct behavior of `to_number()`.

### The evaluation order of some operators has changed

In Cloudberry, compared to Greenplum 6, the evaluation order of the `<=`, `>=`, `<>`, `IS`, `NOT BETWEEN`, and other compound operators has changed.

For example, in Greenplum 6, the following query is invalid:

```sql
SELECT 1 <> 2 IS TRUE;
ERROR:  argument of IS TRUE must be type boolean, not type integer
```

But in Cloudberry, the query works:

```sql
SELECT 1 <> 2 IS TRUE;
?column?
----------
t
(1 row)
```

**How to detect**

Check the application codebase for expressions with ambiguous operator evaluation order.

**How to fix**

Explicitly specify the operator evaluation order using parentheses.

### Behavior of `SIMILAR TO` with `ESCAPE NULL` has changed

Starting with PostgreSQL kernel version 13, the behavior of the `SIMILAR TO ... ESCAPE NULL` construct changed.

Example for Greenplum 6:

```sql
SELECT 'abc' SIMILAR TO 'abc' ESCAPE NULL;
?column?
----------
t
(1 row)
```

Example for Cloudberry:

```sql
SELECT 'abc' SIMILAR TO 'abc' ESCAPE NULL;
?column?
----------

(1 row)
```

**How to detect**

Check the application codebase for uses of the `ESCAPE NULL` construct.

**How to fix**

Replace `ESCAPE NULL` with `ESCAPE <some value>`.

## Syntax changes and removed constructs

### Explicit `ROW()` is required in `UPDATE` statements with row constructors

Starting with PostgreSQL kernel version 10, when updating a single column via a `ROW` constructor, the `ROW` keyword must be specified explicitly.

In Greenplum 6, the following query works without errors:

```sql
CREATE TABLE example (value text);

INSERT INTO example (value) VALUES ('a');

-- this query
UPDATE example SET (value) = (value || '_updated');
```

In Cloudberry, the same query fails with an error:

```sql
CREATE TABLE example (value text);

INSERT INTO example (value) VALUES ('a');

-- this query
UPDATE example SET (value) = (value || '_updated');
ERROR:  source for a multiple-column UPDATE item must be a sub-SELECT or ROW() expression
```

**How to detect**

Check the application codebase for uses of a `ROW` constructor for a single column.

**How to fix**

Modify the problematic queries so that they either do not use a `ROW` constructor, for example, `UPDATE ... SET col = expr`, or explicitly specify the `ROW` keyword: `UPDATE ... SET (col) = ROW(expr)`.

### Statement-level triggers are not supported

Unlike Greenplum 6, Cloudberry does not support statement-level triggers.

The following queries work correctly in Greenplum 6:

```sql
CREATE TABLE example (
    id bigserial,
    value text
) DISTRIBUTED BY (id);

CREATE OR REPLACE FUNCTION example_trigger_func()
RETURNS TRIGGER AS $$
BEGIN
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER example_trigger
    AFTER INSERT OR UPDATE ON example
    FOR EACH STATEMENT
    EXECUTE PROCEDURE example_trigger_func();
```

But they do not work in Cloudberry:

```sql
CREATE TABLE example (
    id bigserial,
    value text
) DISTRIBUTED BY (id);

CREATE OR REPLACE FUNCTION example_trigger_func()
RETURNS TRIGGER AS $$
BEGIN
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER example_trigger
    AFTER INSERT OR UPDATE ON example
    FOR EACH STATEMENT
    EXECUTE PROCEDURE example_trigger_func();

ERROR:  Triggers for statements are not yet supported
```

**How to detect**

All statement-level triggers can be found with the following query:

```sql
SELECT n.nspname, c.relname, tgname
FROM pg_trigger t
    JOIN pg_class c ON t.tgrelid = c.oid
    JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE tgtype & 1 = 0 AND NOT tgisinternal;
```

**How to fix**

Stop using statement-level triggers: move the logic to the application side or use row-level triggers.

### Functions with `EXECUTE ON` must return sets (`SETOF`)

In Cloudberry, functions with the `EXECUTE ON ALL SEGMENTS` / `COORDINATOR` / `INITPLAN` attributes must now return `SETOF`.

A valid example for Greenplum 6:

```sql
CREATE OR REPLACE FUNCTION example_func()
RETURNS integer
AS $$
BEGIN
    RETURN 42;
END;
$$ LANGUAGE plpgsql
EXECUTE ON ALL SEGMENTS;
```

This stops working in Cloudberry:

```sql
CREATE OR REPLACE FUNCTION example_func()
RETURNS integer
AS $$
BEGIN
    RETURN 42;
END;
$$ LANGUAGE plpgsql
EXECUTE ON ALL SEGMENTS;

ERROR:  EXECUTE ON ALL SEGMENTS is only supported for set-returning functions
```

**How to detect**

Functions with the `EXECUTE ON ALL SEGMENTS` / `COORDINATOR` / `INITPLAN` attributes that do not return `SETOF` can be found with the following query:

```sql
SELECT n.nspname, p.proname
FROM pg_proc p
    JOIN pg_language l ON l.oid = p.prolang
    JOIN pg_type t ON t.oid = p.prorettype
    JOIN pg_namespace n ON n.oid = p.pronamespace
WHERE NOT proretset
    AND proexeclocation IN ('s', 'm', 'i')
    AND l.lanname NOT IN ('internal')
    AND t.typname NOT IN ('record');
```

**How to fix**

Recreate the problematic functions with `RETURNS SETOF ...` and `RETURN NEXT`.

### Support for postfix operators has been removed

Starting with PostgreSQL kernel version 14, support for postfix operators has been removed, both system-defined and user-defined ones.

In Greenplum 6, the following query works without errors:

```sql
SELECT 5! AS factorial;
 factorial
-----------
       120
```

In Cloudberry, the same query fails with an error:

```sql
SELECT 5! AS factorial;
ERROR:  syntax error at or near "AS"
LINE 1: SELECT 5! AS factorial;
```

**How to detect**

In Greenplum 6, there is only one system postfix operator: `!`. However, user-defined operators may also exist. The full list of postfix operators can be obtained with the following query:

```sql
SELECT o.oid, n.nspname, o.oprname, o.oid < 16384 AS is_system
FROM pg_operator o
    JOIN pg_namespace n ON o.oprnamespace = n.oid
WHERE o.oprright = 0;
```

**How to fix**

* Replace uses of the `!` operator with an explicit call to the `factorial(...)` function.
* Replace user-defined postfix operators with prefix operators or with explicit calls to the corresponding functions.

## Changes in partitioning mechanisms

### Requirement to include all partition keys in unique indexes

Unlike Greenplum 6, in Cloudberry a unique index must include **all** partition keys.

Example of a query that works in Greenplum 6:

```sql
CREATE TABLE sales (
    id int NOT NULL,
    region text,
    amount decimal(10, 2)
)
    DISTRIBUTED BY (id)
    PARTITION BY LIST (region)
    (
        VALUES ('Asia'),
        VALUES ('Europe')
    );

INSERT INTO sales (id, region, amount)
VALUES
    (1, 'Asia', 100.00),
    (1, 'Europe', 150.00),
    (2, 'Asia', 200.00);

CREATE UNIQUE INDEX sales_id_idx ON sales (id);
```

The same query does not work in Cloudberry:

```sql
CREATE TABLE sales (
    id int NOT NULL,
    region text,
    amount decimal(10, 2)
)
    DISTRIBUTED BY (id)
    PARTITION BY LIST (region)
    (
        VALUES ('Asia'),
        VALUES ('Europe')
    );

INSERT INTO sales (id, region, amount)
VALUES
    (1, 'Asia', 100.00),
    (1, 'Europe', 150.00),
    (2, 'Asia', 200.00);

CREATE UNIQUE INDEX sales_id_idx ON sales (id);
ERROR:  unique constraint on partitioned table must include all partitioning columns
DETAIL:  UNIQUE constraint on table "sales" lacks column "region" which is part of the partition key.
```

**How to detect**

All unique indexes that do not include **all** partition keys can be found with the following query:

```sql
WITH partitions AS (
SELECT DISTINCT n.nspname, c.relname, c.oid, p.paratts
FROM pg_partition p
    JOIN pg_class c ON p.parrelid = c.oid
    JOIN pg_namespace n ON n.oid = c.relnamespace
)
SELECT p.nspname, p.relname, ir.relname AS indexname
FROM pg_index i
    JOIN partitions p ON p.oid = i.indrelid
    JOIN pg_class ir ON ir.oid = i.indexrelid
WHERE (i.indisunique OR i.indisprimary)
    AND NOT (p.paratts <@ i.indkey);
```

**How to fix**

Recreate the found indexes, adding the partition keys.

### Limitation on list partitioning by multiple columns

In Cloudberry, list partitioning by multiple columns is implemented through subpartitioning: the standard Cloudberry syntax assumes one column or expression at each level.

This limitation is related to the fact that list-based partitioning by multiple columns, for example `PARTITION BY LIST (col1, col2)`, often makes it impossible to use the GPORCA optimizer.

The following example works in Greenplum 6:

```sql
CREATE TABLE example (a int, b int, c int)
    PARTITION BY LIST (b, c)
    (
        DEFAULT PARTITION other
    );
```

But it does not work in Cloudberry:

```sql
CREATE TABLE example (a int, b int, c int)
    PARTITION BY LIST (b, c)
    (
        DEFAULT PARTITION other
    );
ERROR:  cannot use "list" partition strategy with more than one column
```

**How to detect**

Tables with list-based partitioning by multiple columns can be found with the following query:

```sql
SELECT n.nspname, c.relname
FROM pg_partition p
    JOIN pg_class c ON p.parrelid = c.oid
    JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE parkind = 'l'
    AND parnatts > 1;
```

**How to fix**

In Cloudberry, subpartitioning should be used for this:

```sql
CREATE TABLE example (a int, b int, c int)
PARTITION BY LIST (b)
    SUBPARTITION BY LIST (c)
    SUBPARTITION TEMPLATE (
        DEFAULT SUBPARTITION other_c
    )
    (
        DEFAULT PARTITION other
    );
```

### Support for `FOR (RANK(...))` in partition DDL has been removed

Cloudberry does not support the `FOR (RANK(...))` construct when working with partitions.

Working example for Greenplum 6:

```sql
CREATE TABLE sales (
    id int,
    date date,
    amount decimal(10, 2)
)
WITH (appendoptimized = true, compresstype = zstd, compresslevel = 1)
DISTRIBUTED BY (id)
PARTITION BY RANGE (date) (
    START ('2026-01-01') END ('2027-01-01') EVERY (INTERVAL '1 month')
);

ALTER TABLE sales
    ALTER PARTITION FOR (RANK(2))
    TRUNCATE PARTITION FOR (RANK(2));
```

Does not work in Cloudberry:

```sql
CREATE TABLE sales (
    id int,
    date date,
    amount decimal(10, 2)
)
WITH (appendoptimized = true, compresstype = zstd, compresslevel = 1)
DISTRIBUTED BY (id)
PARTITION BY RANGE (date) (
    START ('2026-01-01') END ('2027-01-01') EVERY (INTERVAL '1 month')
);

ALTER TABLE sales
    ALTER PARTITION FOR (RANK(2))
    TRUNCATE PARTITION FOR (RANK(2));
ERROR:  addressing partition by RANK is no longer supported
HINT:  Use partition name or FOR (<partition key value>) instead.
```

**How to detect**

Check the application codebase and scripts for uses of the `FOR (RANK(...))` construct.

**How to fix**

Replace `FOR (RANK(...))` with `FOR (VALUE ...)` or `FOR VALUES`.

### Inheritance of storage parameters for AO tables has changed

If an AO parameter is not explicitly specified for a partition, the behavior differs:

* in Greenplum 6, the default value is applied;
* in Cloudberry, the parameter is inherited from the parent table.

The following query works in Greenplum 6:

```sql
CREATE TABLE sales
(
    id int,
    date date,
    region text,
    amount decimal(10, 2)
)
    WITH (appendoptimized = true, compresstype = zstd, compresslevel = 1)
    DISTRIBUTED BY (id)
    PARTITION BY LIST (region)
        (
        PARTITION asia VALUES ('Asia')
            WITH (appendoptimized = true, compresslevel = 0),
        PARTITION europe VALUES ('Europe')
        );
```

But it does not work in Cloudberry:

```sql
CREATE TABLE sales
(
    id int,
    date date,
    region text,
    amount decimal(10, 2)
)
    WITH (appendoptimized = true, compresstype = zstd, compresslevel = 1)
    DISTRIBUTED BY (id)
    PARTITION BY LIST (region)
        (
        PARTITION asia VALUES ('Asia')
            WITH (appendoptimized = true, compresslevel = 0),
        PARTITION europe VALUES ('Europe')
        );
ERROR:  compresstype "zstd" can't be used with compresslevel 0
```

**How to detect**

Partitions created without explicit options can be found with the following query:

```sql
SELECT
    schemaname,
    tablename,
    partitionschemaname,
    partitiontablename,
    par.reloptions AS parent_options,
    c.reloptions AS child_options,
    po AS parent_option
FROM pg_partitions p
    JOIN pg_class par ON par.oid = format('%s.%s', schemaname, tablename)::regclass
    JOIN pg_class c ON c.oid = format('%s.%s', partitionschemaname, partitiontablename)::regclass
    JOIN unnest(par.reloptions) po ON TRUE
    LEFT JOIN unnest(c.reloptions) co ON split_part(po, '=', 1) = split_part(co, '=', 1)
WHERE co IS NULL;
```

**How to fix**

Create a copy of the problematic partition with explicitly specified options, move the data into it, and replace the original partition with the updated one.

### Limitations on `EXCLUSIVE` / `INCLUSIVE` boundaries for `float` / `numeric` / `text` types

Unlike Greenplum 6, in Cloudberry the `START EXCLUSIVE` / `END INCLUSIVE` constructs work only for types with the `+` operator, such as `integer` and `timestamp`, but not for `float`, `numeric`, or `text`.

Correct example for Greenplum 6:

```sql
CREATE TABLE sales
(
    id int,
    date date,
    amount decimal(10, 2)
)
    WITH (appendoptimized = true)
    DISTRIBUTED BY (id)
    PARTITION BY RANGE (amount)
        (
        START (0) EXCLUSIVE
            END (1000)
            EVERY (250)
        );
```

Does not work in Cloudberry:

```sql
CREATE TABLE sales
(
    id int,
    date date,
    amount decimal(10, 2)
)
    WITH (appendoptimized = true)
    DISTRIBUTED BY (id)
    PARTITION BY RANGE (amount)
        (
        START (0) EXCLUSIVE
            END (1000)
            EVERY (250)
        );
ERROR:  START EXCLUSIVE not supported for partition key data type: numeric
HINT:  Specify an inclusive START value and remove the EXCLUSIVE keyword
```

**How to detect**

Tables with `START EXCLUSIVE` / `END INCLUSIVE` on unsupported types can be found with the following query:

```sql
SELECT n.nspname, c.relname, t.typname, pr.parchildrelid::regclass
FROM pg_partition p
    JOIN pg_partition_rule pr ON p.oid = pr.paroid
    JOIN pg_class c ON p.parrelid = c.oid
    JOIN pg_namespace n ON n.oid = c.relnamespace
    JOIN pg_attribute a ON a.attrelid = c.oid AND a.attnum = ANY(p.paratts)
    JOIN pg_type t ON t.oid = a.atttypid
WHERE t.typname IN ('text', 'float8', 'float4', 'numeric')
    AND (NOT pr.parrangestartincl OR pr.parrangeendincl);
```

**How to fix**

Recreate the problematic tables without `EXCLUSIVE` / `INCLUSIVE` on these types.

### The level system for partitioned tables has changed

In Greenplum 6, immediate child partitions have `pg_partition.parlevel = 0`. In Cloudberry, immediate child partitions have `pg_partition_tree().level = 1`. The `pg_partition` view has been removed in Cloudberry, so the `pg_partition_tree()` function should be used instead.

This change may break queries that rely on partition levels.

**How to detect**

Check the application codebase and scripts for uses of partition levels.

**How to fix**

Adapt the application codebase and scripts to account for the changed partition levels and the removal of the `pg_partition` view. Instead of `pg_partition`, use the `pg_partition_tree()` function or the `pg_partitioned_table` view.

### Partition constraints have been moved out of `pg_constraint`

In Greenplum 6, partition boundaries are displayed as `CHECK CONSTRAINT` entries in the `pg_constraint` system view.

In Cloudberry, partition boundaries are no longer `CHECK CONSTRAINT` entries and are not displayed in `pg_constraint`. Similar information can now be obtained from `gp_toolkit.gp_partitions`.

**How to detect**

Check the application codebase and scripts for uses of `pg_constraint` to work with partition constraints.

**How to fix**

Use the `gp_toolkit.gp_partitions` view instead of `pg_constraint` to work with partition constraints.

## Changes in the system catalog and metadata

### Removed and renamed columns in system catalog views and tables

When moving to Cloudberry, together with the PostgreSQL kernel and Greenplum 6 upgrade, the following columns in system catalog views and tables were removed or renamed:

| Old column                                                                  | New column                                                           |
|-----------------------------------------------------------------------------|----------------------------------------------------------------------|
| `pg_class.relhasoids`                                                       | Removed                                                              |
| `pg_class.relhaspkey`                                                       | `EXISTS (SELECT FROM pg_index WHERE indrelid=... AND indisprimary)`  |
| `pg_class.relstorage`                                                       | `pg_class.relam`                                                     |
| `pg_proc.proisagg`                                                          | `pg_proc.prokind = 'a'`                                              |
| `pg_proc.proiswindow`                                                       | `pg_proc.prokind = 'w'`                                              |
| `pg_proc.protransform`                                                      | `pg_proc.prosupport`                                                 |
| `pg_attrdef.adsrc`                                                          | `pg_get_expr(adbin, adrelid)`                                        |
| `pg_constraint.consrc`                                                       | `pg_get_constraintdef(oid)`                                          |
| `pg_stat_activity.waiting`                                                  | `wait_event_type`, `wait_event`                                      |
| `pg_am.*` — dozens of columns                                               | The access method API has been significantly reworked. There is no simple replacement. |
| `gp_distributed_log.distributed_id`, `gp_distributed_xacts.distributed_id`  | Removed                                                              |
| `gp_stat_replication.*_location`                                            | Renamed to `*_lsn`                                                   |
| `information_schema.routines.result_cast_character_set_name`                | Renamed to `result_cast_char_set_name`                               |

**How to detect**

Check the application codebase for uses of removed or renamed columns.

**How to fix**

Make the corresponding changes in the application codebase.

### Removal of system tables and views

The following system tables and views have been completely removed in Cloudberry compared to Greenplum 6:

* `pg_catalog.pg_partition`;
* `pg_catalog.pg_partition_columns`;
* `pg_catalog.pg_partition_encoding`;
* `pg_catalog.pg_partition_rule`;
* `pg_catalog.pg_partitions`;
* `pg_catalog.pg_partition_templates`;
* `pg_catalog.pg_stat_partition_operations`.

**How to detect**

Check the application codebase for uses of the removed system tables and views.

**How to fix**

Make the corresponding changes in the application codebase.

To work with partitioned tables in Cloudberry, use the `pg_partitioned_table` view and the `pg_partition_tree()`, `pg_partition_ancestors()`, and `pg_partition_root()` functions.

### Removal and renaming of system functions

The following system functions have been completely removed in Cloudberry compared to Greenplum 6:

* `pg_get_partition_def`, `pg_get_partition_rule_def`, `pg_get_partition_template_def`;
* `gp_elog`, `gp_fault_inject`, `gp_update_ao_master_stats`.

Functions in the `pg_*_xlog*` family have been renamed according to the `pg_*_wal*` pattern, for example, `pg_switch_xlog()` → `pg_switch_wal()`.  
Some functions have been removed.

**How to detect**

Check the application codebase for uses of removed and renamed system functions.

**How to fix**

Make the corresponding changes in the application codebase.

### Changes in how sequence metadata is displayed

Starting with PostgreSQL kernel version 10, the way sequence metadata is displayed has changed.  
Queries of the form `SELECT * FROM <seq_name>` now return only `last_value`, `log_cnt`, and `is_called`. Other properties are available through `pg_sequence` or `pg_sequences`.

Example for Greenplum 6:

```sql
CREATE SEQUENCE example_seq
    START WITH 100
    INCREMENT BY 1;

SELECT * FROM example_seq;
 sequence_name    | last_value | start_value | increment_by |      max_value      | min_value | cache_value | log_cnt | is_cycled | is_called
------------------+------------+-------------+--------------+---------------------+-----------+-------------+---------+-----------+-----------
 example_seq      |        100 |         100 |            1 | 9223372036854775807 |         1 |           1 |       0 | f         | f
```

Example for Cloudberry:

```sql
CREATE SEQUENCE example_seq
    START WITH 100
    INCREMENT BY 1;

SELECT * FROM example_seq;
 last_value | log_cnt | is_called
------------+---------+-----------
        100 |       0 | f

SELECT * FROM pg_sequence WHERE seqrelid = 'example_seq'::regclass;
 seqrelid | seqtypid | seqstart | seqincrement |       seqmax        | seqmin | seqcache | seqcycle
----------+----------+----------+--------------+---------------------+--------+----------+----------
    17186 |       20 |      100 |            1 | 9223372036854775807 |      1 |       20 | f

SELECT * FROM pg_sequences WHERE sequencename = 'example_seq';
 schemaname | sequencename    | sequenceowner | data_type | start_value | min_value |      max_value      | increment_by | cycle | cache_size | last_value
------------+-----------------+---------------+-----------+-------------+-----------+---------------------+--------------+-------+------------+------------
 public     | example_seq     | user1         | bigint    |         100 |         1 | 9223372036854775807 |            1 | f     |         20 |
```

**How to detect**

Check the application codebase for queries of the form `SELECT * FROM <seq_name>` that use fields other than `last_value`, `log_cnt`, and `is_called`.

**How to fix**

Make the corresponding changes in the application codebase by querying `pg_sequence` or `pg_sequences`.

### Change in the internal representation of external tables

Inside Cloudberry, external tables are represented as foreign tables. Compared to Greenplum 6, this results in the following differences:

* The `pg_tables` system view no longer shows external tables.
* `pg_class.relkind` for external tables is now `'f'`, not `'r'`.
* The `pg_exttable` system table has become a view.
* The `EXPLAIN` output has changed: `Foreign Scan` is displayed instead of `External Scan`.

**How to detect**

Check the application codebase and scripts for references to external table metadata.

The list of external tables can be obtained with the following query:

```sql
SELECT n.nspname, c.relname, c.relkind, e.urilocation, e.execlocation, e.fmttype, e.fmtopts
FROM pg_exttable e
    JOIN pg_class c ON c.oid = e.reloid
    JOIN pg_namespace n ON n.oid = c.relnamespace;
```

**How to fix**

Make changes to the application codebase and scripts according to these changes.

### The `gp_toolkit` schema is now provided as an extension

In Cloudberry, unlike Greenplum 6, `gp_toolkit` is provided as an extension.  
From an installation perspective, nothing changes: when a database is created, `gp_toolkit` is connected automatically.

The following views have been removed:

* `gp_toolkit.gp_size_of_partition_and_indexes_disk`;
* `gp_toolkit.__gp_user_data_tables`.

The signatures of the following existing functions have changed:

* `gp_toolkit.__gp_aoseg*`;
* `gp_toolkit.__gp_aocsseg*`;
* `gp_dist_wait_status`;
* `gp_execution_segment`;
* `gp_request_fts_probe_scan`;
* `gp_tablespace_segment_location`.

The following columns have been removed from existing views:

* `gp_toolkit.gp_locks_on_resqueue.lorwaiting`;
* `gp_toolkit.gp_resgroup_config.cpu_rate_limit`;
* `gp_toolkit.gp_resgroup_config.memory_auditor`;
* `gp_toolkit.gp_resgroup_config.memory_shared_quota`;
* `gp_toolkit.gp_resgroup_config.memory_spill_ratio`;
* `gp_toolkit.gp_resgroup_status.cpu_usage`;
* `gp_toolkit.gp_resgroup_status.memory_usage`;
* `gp_toolkit.gp_resgroup_status_per_host.cpu`;
* `gp_toolkit.gp_resgroup_status_per_host.memory_available`;
* `gp_toolkit.gp_resgroup_status_per_host.memory_quota_available`;
* `gp_toolkit.gp_resgroup_status_per_host.memory_quota_used`;
* `gp_toolkit.gp_resgroup_status_per_host.memory_shared_available`;
* `gp_toolkit.gp_resgroup_status_per_host.memory_shared_used`;
* `gp_toolkit.gp_resgroup_status_per_host.memory_used`;
* `gp_toolkit.gp_resgroup_status_per_host.rsgname`;
* `gp_toolkit.gp_resgroup_status_per_segment.cpu`;
* `gp_toolkit.gp_resgroup_status_per_segment.hostname`;
* `gp_toolkit.gp_resgroup_status_per_segment.memory_available`;
* `gp_toolkit.gp_resgroup_status_per_segment.memory_quota_available`;
* `gp_toolkit.gp_resgroup_status_per_segment.memory_quota_used`;
* `gp_toolkit.gp_resgroup_status_per_segment.memory_shared_available`;
* `gp_toolkit.gp_resgroup_status_per_segment.memory_shared_used`;
* `gp_toolkit.gp_resgroup_status_per_segment.memory_used`;
* `gp_toolkit.gp_resgroup_status_per_segment.rsgname`;
* `gp_toolkit.gp_resgroup_status.rsgname`;
* `gp_toolkit.__gp_user_tables.autrelstorage`.

**How to detect**

Check the application codebase and scripts for uses of changed or removed objects.

**How to fix**

Adapt the application codebase and scripts: stop using removed objects and account for changes in existing ones.

## Changes in configuration and resource management

### Removal of configuration parameters

The following configuration parameters have been completely removed in Cloudberry compared to Greenplum 6:

* `wal_keep_segments` — renamed to `wal_keep_size`;
* `memory_spill_ratio`;
* `gp_resource_group_memory_limit`;
* `gp_resource_group_enable_recalculate_query_mem`;
* `gp_resource_group_cpu_ceiling_enforcement`;
* `gp_enable_gpperfmon`;
* `gp_gpperfmon_send_interval`;
* `gpperfmon_log_alert_level`;
* `gpperfmon_port`;
* `gp_log_resqueue_priority_sleep_time`;
* `dev_opt_unsafe_truncate_in_subtransaction`;
* `gp_add_column_inherits_table_setting`;
* `gp_allow_rename_relation_without_lock`;
* `gp_count_host_segments_using_address`;
* `gp_eager_agg_distinct_pruning`;
* `gp_eager_one_phase_agg`;
* `gp_eager_preunique`;
* `gp_enable_exchange_default_partition`;
* `gp_enable_mk_sort`;
* `gp_enable_motion_mk_sort`;
* `gp_enable_sort_distinct`;
* `gp_ignore_window_exclude`;
* `gp_indexcheck_vacuum`;
* `gp_partitioning_dynamic_selection_log`;
* `gp_safefswritesize`;
* `gp_use_synchronize_seqscans_catalog_vacuum_full`;
* `optimizer_analyze_enable_merge_of_leaf_stats`;
* `optimizer_enable_dml_triggers`;
* `optimizer_enable_partial_index`;
* `optimizer_prune_unused_columns`.

**How to detect**

Check the application codebase for uses of the listed configuration parameters.

**How to fix**

Make the corresponding changes in the application codebase by removing the use of the deleted configuration parameters.

### Change in possible values of the `password_encryption` parameter

Starting with PostgreSQL kernel version 10, the type of the `password_encryption` parameter and the set of possible values have changed.

In Greenplum 6, the parameter has the following type and possible values:

```sql
SELECT vartype, enumvals FROM pg_settings WHERE name = 'password_encryption';
 vartype | enumvals
---------+----------
 bool    |
(1 row)
```

In Cloudberry, the parameter has the following type and possible values:

```sql
SELECT vartype, enumvals FROM pg_settings WHERE name = 'password_encryption';
 vartype |      enumvals
---------+---------------------
 enum    | {md5,scram-sha-256}
(1 row)
```

**How to detect**

Check the application codebase for uses of the `password_encryption` parameter and take the changes into account.

**How to fix**

Wherever the `password_encryption` parameter is used, replace the value with `md5`. The `scram-sha-256` value is also allowed, but in the current service version it is supported with limitations.

The fix can be applied only after the upgrade.

### Changes in default parameter values

In Cloudberry, compared to Greenplum 6, the default values of the following parameters have changed:

| Parameter                      | Greenplum 6 | Cloudberry |
|--------------------------------|------------:|-----------:|
| `wal_level`                    | `archive`  | `replica`  |
| `autovacuum_vacuum_cost_delay` | `20ms`     | `2ms`      |
| `checkpoint_completion_target` | 0.5        | 0.9        |
| `extra_float_digits`           | 0          | 1          |
| `gp_interconnect_address_type` | `wildcard` | `unicast`  |
| `autovacuum`                   | `off`      | `on` for `template0` |
| `optimizer_enable_orderedagg`  | `off`      | `on`       |
| `vacuum_cost_page_miss`        | 10         | 2          |

**How to detect**

Most of these parameters are system-level parameters and affect operation only indirectly. `extra_float_digits` stands out because it can affect query results.

**How to fix**

In places where the effect of the new `extra_float_digits` value is observed, explicitly set `extra_float_digits = 0` at the session or transaction level.

### Possible changes in query execution plans

Cloudberry contains many changes and improvements in the GPORCA optimizer that may change the query execution plan. Queries will not “break” logically, but they may start executing differently.

Things to consider:

* New parameters affecting query plan construction have appeared:

    * `enable_partitionwise_aggregate`;
    * `enable_partitionwise_join`;
    * `enable_parallel`;
    * `enable_parallel_dedup_semi_join`;
    * `enable_parallel_hash`;
    * `enable_parallel_append`;
    * `enable_parallel_dedup_semi_reverse_join`;
    * `enable_parallel_semi_join`;
    * `jit`;
    * `jit_above_cost`;
    * `jit_dump_bitcode`;
    * `jit_expressions`;
    * `jit_inline_above_cost`;
    * `jit_optimize_above_cost`;
    * `jit_tuple_deforming`.

* GPORCA does not support multi-level partitioned tables.

**How to detect**

Capture baseline plans for critical queries before migrating to Cloudberry:

```sql
EXPLAIN (ANALYZE, VERBOSE, COSTS, BUFFERS) <query>;
```

**How to fix**

Depending on the nature of the plan changes and their criticality, rewrite the problematic query or adjust the parameters.

### Extensions merged into the core

In Cloudberry, the following extensions have been removed, and their functionality has been moved into the core:

* `gp_parallel_retrieve_cursor`;
* `gp_array_agg`;
* `gp_percentile_agg`.

**How to detect**

Check whether these extensions are installed and whether they are used in your codebase:

```sql
SELECT extname, extversion
FROM pg_extension
WHERE extname IN ('gp_parallel_retrieve_cursor', 'gp_array_agg', 'gp_percentile_agg');
```

**How to fix**

If necessary, adapt the application codebase and scripts to use the built-in functionality.