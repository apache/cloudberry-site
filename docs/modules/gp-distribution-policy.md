---
title: gp_distribution_policy
---

# gp_distribution_policy

The `gp_distribution_policy` module checks whether the rows of a table are stored on the segments that the table's distribution policy assigns them to. On each segment, it scans the table, computes the hash of the distribution key columns of every row, and verifies that the row belongs to that segment.

Use it to detect rows that ended up on a wrong segment.

## Build and install

`gp_distribution_policy` is built and installed by default with Apache Cloudberry. No `configure` option is required.

## Enable the module

Create the extension in each database where you want to use it. Creating the extension requires superuser privileges. It does not need `shared_preload_libraries`.

```sql
CREATE EXTENSION gp_distribution_policy;
```

The extension installs its functions in the `public` schema.

## Functions

| Function | Returns | Description |
|---|---|---|
| `gp_table_distribution_check(regclass)` | `TABLE (gp_segment_id int, is_distribution_correct boolean)` | Runs the check on all segments and returns one row per segment. `is_distribution_correct` is `true` if all rows stored on that segment belong to it, and `false` if at least one row is on the wrong segment. |
| `gp_distribution_policy_table_check(relid regclass)` | `boolean` | Checks the rows of the table on the instance where the function is executed. It is the per-segment function behind `gp_table_distribution_check()`. Call `gp_table_distribution_check()` instead of calling this function directly. |

## Example

```sql
CREATE EXTENSION gp_distribution_policy;

CREATE TABLE some_other_table(id int, some_other_data int) DISTRIBUTED BY (id);
INSERT INTO some_other_table SELECT i, i FROM generate_series(1,12) i;

SELECT gp_table_distribution_check('some_other_table');
```

On a cluster with three segments where all rows are placed correctly, the output is:

```text
 gp_table_distribution_check
-----------------------------
 (0,t)
 (1,t)
 (2,t)
(3 rows)
```

If a segment holds rows that hash to a different segment, that segment is reported with `f`. For example, after the same row has been inserted directly on every segment, only one segment is correct:

```text
 gp_table_distribution_check
-----------------------------
 (0,t)
 (1,f)
 (2,f)
(3 rows)
```

To get the result as separate columns:

```sql
SELECT * FROM gp_table_distribution_check('some_other_table');
```

## Usage notes

- The input relation must be a table, a materialized view, or a directory table. For views, foreign tables, and partitioned tables, the function reports the error `input relation is not a table`. To check a partitioned table, run the check on each leaf partition.
- Heap tables and append-optimized tables are supported.
- The check is meaningful only for hash-distributed tables. For randomly distributed and replicated tables, the function reports `false` for some segments even though the data is placed correctly, so do not use it for such tables.
- The check scans the table on each segment and stops on a segment at the first misplaced row. On a large table with a correct distribution, it reads the whole table.
- The result tells you which segments contain misplaced rows. It does not identify the rows.
