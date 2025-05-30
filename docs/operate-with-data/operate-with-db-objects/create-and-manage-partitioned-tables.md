---
title: Create and Manage Partitioned Tables
---

# Create and Manage Partitioned Tables

This document outlines how to create and maintain partitioned tables in Apache Cloudberry using the recommended syntax.

For more information on partitioned tables, see [About Table Partitioning](./about-table-partitioning.md).

## Create partitioned tables

Before creating a partitioned table, you should:

- Choose the partition method: range, list, or hash.
- Choose the column(s) for the partition key.
- Determine the appropriate number of partitions and levels (if using multi-level partitioning).
- Create the partitioned table.
- Create the individual partitions.

Apache Cloudberry automatically creates constraints describing the partition boundary conditions. Any data inserted into the root partitioned table that matches a partition's constraints will be directed to that partition.

For sub-partitioning, you can use the same partition key column if necessary (for example, partition by month, then sub-partition by day). Consider partitioning by the most granular level directly (for example, 365 daily partitions instead of year then month then day) as a flat partition design typically runs faster, though a multi-level design can reduce query planning time.

### Define a date-range partitioned table

A date-range partitioned table uses a `date` or `timestamp` column as the partition key. You can specify multiple partition key columns for range partitioned tables.

Example: Create a `measurement` table for an ice-cream company, partitioned by month on the `logdate` column to retain 2 years of data and remove the oldest month's data monthly.

1. Create the root partitioned table:

    ```sql
    CREATE TABLE measurement (
        city_id         int not null,
        logdate         date not null,
        peaktemp        int,
        unitsales       int
    )
    DISTRIBUTED BY (city_id)
    PARTITION BY RANGE (logdate);
    ```

2. Create the partitions (for example, for each month):

    ```sql
    CREATE TABLE measurement_y2021m01 PARTITION OF measurement
    FOR VALUES FROM ('2021-01-01') TO ('2021-02-01');

    CREATE TABLE measurement_y2021m02 PARTITION OF measurement
    FOR VALUES FROM ('2021-02-01') TO ('2021-03-01');
    -- ... and so on for other months ...

    CREATE TABLE measurement_y2022m12 PARTITION OF measurement
    FOR VALUES FROM ('2022-12-01') TO ('2023-01-01') -- Note: Source had '2022-01-01' likely a typo for '2023-01-01'
    TABLESPACE fasttablespace;

    CREATE TABLE measurement_y2023m01 PARTITION OF measurement
    FOR VALUES FROM ('2023-01-01') TO ('2023-02-01')
    WITH (parallel_workers = 4)
    TABLESPACE fasttablespace;
    ```

    Range upper bounds are treated as exclusive. If data is inserted into the parent table that does not map to an existing partition, Apache Cloudberry returns an error (unless a default partition exists).

### Define a numeric-range partitioned table

This uses a numeric-type column as the partition key. Multiple partition key columns are supported.

Example: Create `numpart` table partitioned by `year`.

1. Create the root partitioned table:

    ```sql
    CREATE TABLE numpart (id int, rank int, year int, color char(1), count int)
    DISTRIBUTED BY (id)
    PARTITION BY RANGE (year);
    ```

2. Create the partitions:

    ```sql
    CREATE TABLE numpart_y2019 PARTITION OF numpart FOR VALUES FROM (2019) TO (2020);
    CREATE TABLE numpart_y2020 PARTITION OF numpart FOR VALUES FROM (2020) TO (2021);
    CREATE TABLE numpart_y2021 PARTITION OF numpart FOR VALUES FROM (2021) TO (2022);
    CREATE TABLE numpart_y2022 PARTITION OF numpart FOR VALUES FROM (2022) TO (2023);
    ```

### Define a list partitioned table

A list partitioned table can use any data type column that allows equality comparisons as its partition key. Only a single column is allowed as the partition key for list partitions. You must declare a partition specification for every list value.

Example: Create `listpart` table partitioned by `color`.

1. Create the root partitioned table:

    ```sql
    CREATE TABLE listpart (id int, rank int, year int, color char(1), count int)
    DISTRIBUTED BY (id)
    PARTITION BY LIST (color);
    ```

2. Create the partitions:

    ```sql
    CREATE TABLE listpart_red PARTITION OF listpart FOR VALUES IN ('r');
    CREATE TABLE listpart_green PARTITION OF listpart FOR VALUES IN ('g');
    CREATE TABLE listpart_blue PARTITION OF listpart FOR VALUES IN ('b');
    CREATE TABLE listpart_other PARTITION OF listpart DEFAULT;
    ```

    The `DEFAULT` keyword creates a default partition to catch any data not matching other partitions.

### Define a hash partitioned table

A hash partitioned table uses a single hashable column as its partition key. You must declare a partition specification for every modulus/remainder combination.

Example: Create `hpt` table partitioned by the hash of column `c`.

1. Create the root partitioned table:

    ```sql
    CREATE TABLE hpt (a int, b int, c text) PARTITION BY HASH(c);
    ```

2. Create the partitions:

    ```sql
    CREATE TABLE hpt_p1 PARTITION OF hpt FOR VALUES WITH (MODULUS 3, REMAINDER 0);
    CREATE TABLE hpt_p2 PARTITION OF hpt FOR VALUES WITH (MODULUS 3, REMAINDER 1);
    CREATE TABLE hpt_p3 PARTITION OF hpt FOR VALUES WITH (MODULUS 3, REMAINDER 2);
    ```

### Define a multi-level partitioned table

You can create a multi-level partition hierarchy by sub-partitioning existing partitions.

Example: Create a two-level partition for `msales`, partitioned by `year` (range), then sub-partitioned by `region` (list).

1. Create the root (level 1) partitioned table:

    ```sql
    CREATE TABLE msales (trans_id int, year int, amount decimal(9,2), region text)
    DISTRIBUTED BY (trans_id)
    PARTITION BY RANGE (year);
    ```

2. Create yearly partitions (level 2), themselves partitioned by region:

    ```sql
    CREATE TABLE msales_2021 PARTITION OF msales FOR VALUES FROM (2021) TO (2022)
    PARTITION BY LIST (region);
    CREATE TABLE msales_2022 PARTITION OF msales FOR VALUES FROM (2022) TO (2023)
    PARTITION BY LIST (region);
    CREATE TABLE msales_2023 PARTITION OF msales FOR VALUES FROM (2023) TO (2024)
    PARTITION BY LIST (region);
    ```

3. Create the region sub-partitions (leaf partitions):

    ```sql
    CREATE TABLE msales_2021_usa PARTITION OF msales_2021 FOR VALUES IN ('usa');
    CREATE TABLE msales_2021_asia PARTITION OF msales_2021 FOR VALUES IN ('asia');
    CREATE TABLE msales_2021_europe PARTITION OF msales_2021 FOR VALUES IN ('europe');
    -- ... and similarly for msales_2022 and msales_2023 ...
    ```

## Partition an existing table

Tables can only be partitioned at creation time. To partition an existing table:

1. Create a new partitioned table with the desired structure.
2. Load data from the original table into the new partitioned table.
3. Drop the original table.
4. Rename the new partitioned table to the original table's name.
5. Re-grant any necessary permissions.

```sql
-- Assume 'msales' is an existing non-partitioned table
-- 1. Create new partitioned table (msales2)
CREATE TABLE msales2 (LIKE msales) PARTITION BY RANGE (year); -- Define partitions for msales2 here
-- (Example: CREATE TABLE msales2_y2021 PARTITION OF msales2 FOR VALUES FROM (2021) TO (2022); etc.)

-- 2. Load data
INSERT INTO msales2 SELECT * FROM msales;

-- 3. Drop old table
DROP TABLE msales;

-- 4. Rename new table
ALTER TABLE msales2 RENAME TO msales;

-- 5. Re-grant permissions
GRANT ALL PRIVILEGES ON msales TO admin;
GRANT SELECT ON msales TO guest;
```

Note: The `LIKE` clause does not copy over partition structures when creating a new table from a partitioned one.

## Load data into a partitioned table

Initially, the top-level root partitioned table is empty. When you insert data into the root table, Apache Cloudberry routes the data to the appropriate bottom-level leaf partitions. In a multi-level design, only the leaf partitions at the bottom-most levels contain data.

Apache Cloudberry rejects rows that cannot be mapped to a leaf partition, and the load fails, unless a `DEFAULT` partition is defined to catch such rows.

Be cautious with` DEFAULT` partitions: if they contain data, they are always scanned by the query optimizer, potentially slowing down overall scan time.

Using `COPY` or `INSERT` to load data into a parent table automatically routes data to the correct leaf partition. Best practice: For loading large amounts of data, create an intermediate staging table, load data into it, and then attach it to your partition hierarchy.

## Verify the partition strategy

Use the `EXPLAIN` command to examine the query plan and verify that the optimizer scans only relevant partitions.

Example: For a table `msales` partitioned by `year` and sub-partitioned by `region`:

```sql
EXPLAIN SELECT * FROM msales WHERE year='2021' AND region='usa';
```

The query plan should show a scan of only `msales_2021_usa` (the relevant leaf partition). Scans of parent tables or default partitions (if any) should return 0-1 rows. Ensure unnecessary partitions are not scanned.

### Troubleshoot selective partition scans

Limitations that can prevent selective scanning:

- The query optimizer can selectively scan only when the query contains a direct and simple restriction of the table using immutable operators like `=`, `<`, `<=`, `>`, `>=`, and `<>`.
- Selective scanning recognizes `STABLE` and `IMMUTABLE` functions in a query, but not `VOLATILE` functions. For example, `WHERE date > CURRENT_DATE` allows selective scanning, but `WHERE time > TIMEOFDAY()` does not.

## View your partition design

Partitioning information is stored in system catalogs like `pg_partitioned_table` and in additional fields in `pg_class` (`relispartition`, `relpartbound`).

Use these functions to get information about partitioned tables:

- `pg_partition_tree(regclass)`: Lists information about tables/indexes in a partition hierarchy for a given partitioned table/index.
- `pg_partition_ancestors(regclass)`: Lists ancestor relations of a given partition, including itself.
- `pg_partition_root(regclass)`: Returns the topmost parent of the hierarchy for a given relation.

Example: Display the partition structure of `msales`:

```sql
SELECT * FROM pg_partition_tree('msales');
```

## About partition pruning

Partition pruning is a query optimization technique that improves performance for partitioned tables. It is controlled by the `enable_partition_pruning` server configuration parameter, which is `on `by default.

The planner/optimizer examines partition definitions to prove that a partition need not be scanned because it cannot contain rows meeting the query's `WHERE` clause. If proven, the partition is excluded (pruned) from the query plan.

Pruning is driven by constraints implicitly defined by partition keys, not by the presence of indexes on key columns.

Partition pruning can occur:

- During query planning: For known values.
- During query execution: Useful when clauses contain expressions whose values are not known at planning time (for example, parameters in `PREPARE`, subquery results, parameterized nested loop join values).

    - During plan initialization: For parameter values known at execution's initialization phase. Pruned partitions will not appear in `EXPLAIN`/`EXPLAIN ANALYZE`. The "Subplans Removed" property in `EXPLAIN` output shows how many were removed here.
    - During actual execution: For values known only during the run. This requires careful inspection of the loops property in `EXPLAIN ANALYZE` output. Subplans for different partitions might have different loop counts or show as (`never executed`) if pruned every time.

## Maintain partitions

The set of partitions is often dynamic, involving removing old partitions and adding new ones. These tasks can be done nearly instantaneously by manipulating the partition structure. Use `ALTER TABLE` against the top-level root partitioned table or the partition itself.

### Add a partition

- Directly add to the hierarchy:

    ```sql
    CREATE TABLE msales_mfeb20 PARTITION OF msales
        FOR VALUES FROM ('2020-02-01') TO ('2020-03-01');
    ```

- Create as a regular table then attach (allows pre-loading/checking data):

    ```sql
    -- Create table with same structure as parent
    CREATE TABLE msales_mfeb20 (LIKE msales INCLUDING DEFAULTS INCLUDING CONSTRAINTS);

    -- Add constraints matching intended partition bounds
    ALTER TABLE msales_mfeb20 ADD CONSTRAINT y2020m02
    CHECK ( logdate >= DATE '2020-02-01' AND logdate < DATE '2020-03-01' );

    -- Load data or perform other prep work into msales_mfeb20
    -- ...

    -- Attach to the partition hierarchy
    ALTER TABLE msales ATTACH PARTITION msales_mfeb20
    FOR VALUES FROM ('2020-02-01') TO ('2020-03-01');
    ```

    - `ATTACH PARTITION` requires a `SHARE UPDATE EXCLUSIVE` lock on the partitioned table.
    - Creating a `CHECK` constraint on the table to be attached that matches the partition bounds (as shown above) allows the system to skip a validation scan. Drop the redundant `CHECK` constraint after `ATTACH PARTITION` completes.
    - If the partitioned table has a `DEFAULT` partition, consider creating a `CHECK` constraint on the `DEFAULT` partition that excludes the data of the partition being attached. This avoids scanning the `DEFAULT` partition to verify no records belong in the new partition.

### Index partitioned tables

Creating an index on the key column(s) of a partitioned table automatically creates a matching index on each existing partition, and any partitions created or attached later will also get such an index. The index on the partitioned table is "virtual"; actual data is in child indexes on individual partitions.

To avoid long lock times when indexing large hierarchies:

- Create an invalid index on the parent table only:

    ```sql
    CREATE INDEX measurement_usls_idx ON ONLY measurement (unitsales);
    ```

- Create indexes on individual partitions:

    ```sql
    CREATE INDEX measurement_usls_202102_idx ON measurement_y2021m02 (unitsales);
    -- ... repeat for other partitions ...
    ```

- Attach each partition's index to the parent index:

    ```sql
    ALTER INDEX measurement_usls_idx ATTACH PARTITION measurement_usls_202102_idx;
    -- ... repeat for other partition indexes ...
    ```

Once indexes for all partitions are attached, the parent index is marked valid automatically.

This technique also applies to `UNIQUE` and `PRIMARY KEY` constraints (indexes are created implicitly).

```sql
ALTER TABLE ONLY measurement ADD UNIQUE (city_id, logdate);

ALTER TABLE measurement_y2021m02 ADD UNIQUE (city_id, logdate);
ALTER INDEX measurement_city_id_logdate_key
    ATTACH PARTITION measurement_y2021m02_city_id_logdate_key;
-- ...
```

This technique also applies to `UNIQUE` and `PRIMARY KEY` constraints (indexes are created implicitly).

```sql
ALTER TABLE ONLY measurement ADD UNIQUE (city_id, logdate);

ALTER TABLE measurement_y2021m02 ADD UNIQUE (city_id, logdate);
ALTER INDEX measurement_city_id_logdate_key
    ATTACH PARTITION measurement_y2021m02_city_id_logdate_key;
-- ...
```

### Rename a partition

Rename a partition (which is a table) using `ALTER TABLE ... RENAME TO`:

```sql
ALTER TABLE msales_mfeb17 RENAME TO msales_month_feb17;
```

## Add a default partition

A `DEFAULT` partition catches data that does not fit into any other defined partition. Without it, such data causes an error. A partitioned table can have only one default partition.

1. During table creation:

    ```sql
    CREATE TABLE msales_other PARTITION OF msales DEFAULT;
    ```

2. After table creation (attaching an existing table as default):

    ```sql
    -- Create a table with the same schema as the root
    CREATE TABLE msales_other (LIKE msales);

    -- Attach it as the default partition
    ALTER TABLE msales ATTACH PARTITION msales_other DEFAULT;
    ```

### Drop a partition

To remove old data, you can drop the partition. This quickly deletes all records in that partition.

```sql
DROP TABLE measurement_y2020m02;
```

This command requires an `ACCESS EXCLUSIVE` lock on the parent table.

### Detach a partition

Removes a partition from the hierarchy but retains it as a standalone table.

```sql
ALTER TABLE msales DETACH PARTITION msales_2021;
```

Detaching a partition that itself has sub-partitions automatically detaches those sub-partitions as well. This is common for rolling old data out, allowing further operations (backup, aggregation) before dropping the data.

### Truncate a partition

Removes all data from a specific partition.

```sql
TRUNCATE ONLY msales_other; -- Truncates only the specified partition
```

If you truncate a partition that is itself partitioned, its sub-partitions are also truncated.
To truncate the entire partitioned table (all partitions):

```sql
TRUNCATE msales;
```

### Exchange a partition

Swaps one table in place of an existing partition. This involves detaching the original partition and then attaching the new table as a partition.

- You can exchange partitions only at the lowest level of the hierarchy (leaf partitions containing data).
- Cannot exchange a partition with a replicated table, another partitioned table, or a non-leaf child partition.
- The data in the table being attached must be valid against the partition constraints of the target partition.

Example:

```sql
-- Assume msales_2021_new is a table with the correct structure and data for the 2021 partition
ALTER TABLE msales DETACH PARTITION msales_2021;
ALTER TABLE msales ATTACH PARTITION msales_2021_new FOR VALUES FROM (2021) TO (2022);
```
