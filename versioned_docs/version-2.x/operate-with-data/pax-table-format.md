---
title: PAX Storage Format
---

# PAX Storage Format

Apache Cloudberry supports the PAX (Partition Attributes Across) storage format.

PAX is a database storage format that combines the benefits of row-based storage (NSM, N-ary Storage Model) and column-based storage (DSM, Decomposition Storage Model). It is designed to improve query performance, particularly in terms of cache efficiency. In OLAP scenarios, PAX offers batch write performance similar to row-based storage and read performance like column-based storage. PAX can adapt to both cloud environments with object storage models and traditional offline physical file-based storage methods.

Compared to traditional storage formats, PAX has the following features:

- Data updates and deletions: PAX uses a mark-and-delete approach for data updates and deletions. This effectively manages changes in physical files without immediately rewriting the entire data file.
- Concurrency control and read-write isolation: PAX uses Multi-Version Concurrency Control (MVCC) to achieve efficient concurrency control and read-write isolation. The control granularity reaches the level of individual data files, enhancing operation safety and efficiency.
- Index support: PAX supports B-tree indexes, which help speed up query operations. This is particularly useful for improving data retrieval speed when dealing with large amounts of data.
- Data encoding and compression: PAX offers multiple data encoding methods (such as run-length encoding and delta encoding) and compression options (such as zstd and zlib), with various compression levels. These features help reduce storage space requirements while optimizing read performance.
- Statistics: Data files contain detailed statistics that are used for quick filtering and query optimization, reducing unnecessary data scanning and speeding up query processing.

## Applicable scenarios

The hybrid storage capability of PAX makes it suitable for complex OLAP applications that need to handle large amounts of data writes and frequent queries. Whether you are looking for a high-performance data analysis solution in a cloud infrastructure or dealing with large datasets in a traditional data center environment, PAX can provide strong support.

## Enable PAX when building Cloudberry from source code

To enable PAX when building Apache Cloudberry from source code, you need to:

1. Make sure that these dependency requirements are met:

    - C/C++ Compiler: GCC/GCC-C++ 11 or later
    - CMake: 3.11 or later
    - Protobuf: 3.5.0 or later
    - ZSTD (libzstd): 1.4.0 or later

2. Run the following command at the top level of the Cloudberry source code directory to download the submodules:

   ```bash
   git submodule update --init --recursive
   ```

   The following submodules will be downloaded for building and tesing PAX:

    - yyjson (`dependency/yyjson`)
    - cpp-stub (`contrib/pax_storage/src/cpp/contrib`)
    - googlebench (`contrib/pax_storage/src/cpp/contrib`) (Now it's an optional dependency, it will be downloaded but not built by default. If needed, you can build it manually.)
    - googletest (`contrib/pax_storage/src/cpp/contrib`)
    - tabulate (`contrib/pax_storage/src/cpp/contrib`)

    :::note
    The submodules above are already included in the latest release source code archive, so you do not need to download the submodules manually after extracting the archive.
    :::

3. When running the `configure` command, add the `--enable-pax` option. For example:

    ```bash
    ./configure --enable-pax --with-perl --with-python --with-libxml --with-gssapi --prefix=/usr/local/cloudberrydb
    ```

    In addition, to enable PAX in `DEBUG` mode, add the `--enable-cassert` option (along with `--enable-pax`) in the `configure` command, and the `GTEST` in PAX will be built. Run `GTEST` as follows:

    ```bash
    cd contrib/pax_storage/build
    ./src/cpp/test_main
    ```

:::tip
If you are interested in the implementation details of PAX, you can refer to the [design documents in GitHub repo](https://github.com/apache/cloudberry/tree/main/contrib/pax_storage/doc).
:::

## Usage

### Create a PAX table

To create a table in PAX format, you need to set the table access method to PAX. You can do this in one of the following ways:

- Use the `USING PAX` clause explicitly when creating the table, for example:

    ```sql
    CREATE TABLE t1(a int, b int, c text) USING PAX;
    -- t1 is a PAX table and can be used like a normal heap table.
    ```

- Set the default table access method to PAX and then create the table:

    ```sql
    -- Set the default table access method. From now on, newly created tables will use PAX format.
    SET default_table_access_method = pax;

    -- Implicitly use the default access method, which is PAX.
    CREATE TABLE t1(a int, b int, c text);
    ```

When creating a table, you can also specify minimum and maximum value information for certain columns to speed up queries:

```sql
-- Use WITH(minmax_columns='b,c') to specify that columns b and c
-- should record min and max statistics.
-- This helps optimize queries involving these two columns,
-- because the system can quickly determine which data blocks might contain matching data.
CREATE TABLE p2(a INT, b INT, c INT) USING pax WITH(minmax_columns='b,c');

INSERT INTO p2 SELECT i, i * 2, i * 3 FROM generate_series(1,10)i;

-- because column b has minmax statistics,
-- the system can quickly locate the data blocks that might contain the value, speeding up the query.
SELECT * FROM p2 WHERE b = 4;

-- Similarly, because of the minmax information on column b, the system can quickly determine that no data blocks can meet this condition
-- (if all generated values are positive), possibly returning no data immediately and avoiding unnecessary data scans.
SELECT * FROM p2 WHERE b < 0;

-- Modify the minmax statistics settings for table p2 to apply only to column b. For data inserted later,
-- only column b will maintain this statistical information, and it won't affect existing data or trigger any rewrites or adjustments.
ALTER TABLE p2 SET(minmax_columns='b');
```

### View the format of an existing table

To check whether a table is in PAX format, you can use one of the following methods:

- Use the `psql` command `\d+`:

    ```sql
    gpadmin=# \d+ t1
                                                Table "public.t1"
    Column |  Type   | Collation | Nullable | Default | Storage  | Compression | Stats target | Description
    --------+---------+-----------+----------+---------+----------+-------------+--------------+-------------
    a      | integer |           |          |         | plain    |             |              |
    b      | integer |           |          |         | plain    |             |              |
    c      | text    |           |          |         | extended |             |              |
    Distributed by: (a)
    Access method: pax
    ```

- Query the system catalog tables `pg_class` and `pg_am`:

    ```sql
    SELECT relname, amname FROM pg_class, pg_am WHERE relam = pg_am.oid AND relname = 't1';

    relname | amname
    ---------+--------
    t1      | pax
    (1 row)
    ```

## Support for TOAST

If some columns in a PAX table contain large values, you can enable TOAST storage to store these large values in a separate TOAST file. This helps to make the data in the main data file more compact, allowing you to scan more tuples within the same data size.

By default, the TOAST storage is enabled for PAX tables. Unlike PostgreSQL, the TOAST storage supported by PAX does not rely on Page management, which allows PAX to store data larger than 2 MiB.

You can configure TOAST-related thresholds using the following parameters. For more details, refer to [PAX-related system parameters](#pax-related-system-parameters). 

- `pax_enable_toast`
- `pax_min_size_of_compress_toast`
- `pax_min_size_of_external_toast`

## Support for clustering

Apache Cloudberry supports z-ordering for PAX tables, which greatly improves performance when managing and querying multi-dimensional data. Using the clustering feature, you can organize data in PAX tables using two different sorting strategies: index-based clustering and `reloptions`-based clustering. Note that the two strategies are mutually exclusive, and you can only choose one.

### Clustering strategies

You can use the clustering feature of Apache Cloudberry to physically sort and optimize table data. The goal is to improve query performance by reorganizing the physical storage order of the data. In PAX tables, the clustering feature provides two different strategies for sorting data:

- Index-based clustering. This strategy is based on B-tree indexes and works similarly to the native clustering method in PostgreSQL. It is suitable when an index has already been created for the table.

    Example:

    ```sql
    CREATE TABLE t2(c1 int, c2 int) USING PAX;
    CREATE INDEX c1_idx ON t2(c1);
    CLUSTER t2 USING c1_idx;
    DROP TABLE t2;
    ```

- `reloptions`-based clustering. PAX tables support clustering operations based on `reloptions` where `cluster_columns` are specified, and it provides the following sorting methods:

    - Z-order clustering: This method encodes the values of multiple columns into a byte array and sorts by this byte array. It is ideal for cases where multiple columns are used as query conditions (with no fixed order for the columns in the query). This method greatly enhances performance for multi-dimensional data queries. However, it is not suitable for string columns with the same prefix. When `cluster_type` is not specified, PAX uses z-order sorting as the default clustering strategy:

        ```sql
        CREATE TABLE t2(c1 int, c2 float, c3 text) USING PAX WITH (cluster_columns='c1,c2');
        INSERT INTO t2 SELECT i, i, i::text FROM generate_series(1, 100000) i;
        CLUSTER t2;
        DROP TABLE t2;
        ```

        In this example, the data in table `t2` is sorted using z-order by the `c1` and `c2` columns. This sorting method provides great performance improvement in multi-dimensional query scenarios.

    - Lexical clustering: This method sorts by the values and order of the columns, and it is primarily used for sorting and optimizing queries on string columns with the same prefix. For example:

        ```sql
        CREATE TABLE t2(c1 int, c2 float, c3 text) USING PAX WITH (cluster_columns='c1,c2', cluster_type='lexical');
        INSERT INTO t2 SELECT i, i, i::text FROM generate_series(1, 100000) i;
        CLUSTER t2;
        DROP TABLE t2;
        ```

        In this example, the data in table `t2` is sorted lexically by the `c1` and `c2` columns. This sorting method is well-suited for columns with the same prefix.

### Conflicts between clustering types

Note that index-based clustering and `cluster_columns`-based clustering cannot be used at the same time. If a table has already been clustered based on an index (or `cluster_columns`), you cannot specify `cluster_columns` (or an index) for clustering.

An example of handling cluster conflicts:

```sql
-- Creates a table and uses index-based clustering
CREATE TABLE t2(c1 int, c2 float, c3 text) USING PAX;
CREATE INDEX t2_idx ON t2(c1);
CLUSTER t2 USING t2_idx;

-- Tries to use cluster columns (will fail)
ALTER TABLE t2 SET (cluster_columns='c1,c2', cluster_type='zorder');
-- Tries to use lexical clustering (will fail)
ALTER TABLE t2 SET (cluster_columns='c1,c2', cluster_type='lexical');

-- Drops the index and successfully use lexical clustering
DROP INDEX t2_idx;
ALTER TABLE t2 SET (cluster_columns='c1,c2', cluster_type='lexical');
```

In the above example, after table `t2` is clustered using an index, attempts to set z-order or lexical clustering using `cluster_columns` will fail, until the index is dropped.

## Bloom filter support

Apache Cloudberry supports bloom filters, allowing you to generate and maintain bloom filter information at the column level. This feature helps quickly filter data blocks and improves query performance, especially when using `IN` conditions with multiple values, greatly reducing unnecessary data scans.

### Bloom filter options

You can specify the columns for which you want to record bloom filter information by setting the `bloomfilter_columns` option. For example:

```sql
CREATE TABLE p1 (
    a int,
    b int,
    c text
) USING PAX WITH (bloomfilter_columns='b,c,a');
```

In this example, bloom filters will be generated for columns `b`, `c`, and `a` in the table `p1`.

The size of the bloom filter is controlled by the following GUC (global user configuration) parameters:

- `pax_max_tuples_per_file`: Controls the maximum number of tuples stored in each data file.
- `pax_bloom_filter_work_memory_bytes`: Controls the maximum memory allowed for the bloom filter.

For example:

```sql
-- Sets the maximum number of tuples per file.
SET pax_max_tuples_per_file = 131073;

-- Sets the maximum bloom filter memory.
SET pax_bloom_filter_work_memory_bytes = 1048576;  -- 1MB

-- Creates a table and specifies bloom filter options for columns.
CREATE TABLE p1 (
    a int,
    b int,
    c text
) USING PAX WITH (bloomfilter_columns='b,c,a');
```

The size of the generated bloom filter is calculated as follows:

```sql
ceil(min(pax_max_tuples_per_file * 2, pax_bloom_filter_work_memory_bytes))
```

`ceil` is a rounding function, which ensures that the size of the bloom filter is always a power of `2`.

## Sparse filtering

Sparse filtering is a data scanning optimization provided by the PAX storage format. It improves query performance by skipping file scans that do not meet conditions and reducing the amount of data block to be scanned within files.

To use sparse filtering, make sure that the following conditions are
met:

- The system parameter `pax_enable_sparse_filter` is set to `ON` (default value).
- Statistics have been configured for the relevant columns (`min`/`max` or bloom filter).
- The query contains filter conditions (`WHERE` clause) for these columns

### Expression support examples

PAX supports basic conditional expressions. For example:

```sql
-- Creates test table
CREATE TABLE a(v1 int, v2 int, v3 int) USING PAX WITH(minmax_columns='v1, v2, v3');

-- Basic conditions
SELECT * FROM a WHERE v1 <= 3;                                    -- Full condition support. root is OpExpr.
SELECT * FROM a WHERE v1 != NULL;                                -- Full condition support. root is NULLTest.

-- Multiple conditions
SELECT * FROM a WHERE v1 <= 3 AND v2 >= 3;                       -- Full condition support. Tree structure has only one level.
SELECT * FROM a WHERE v1 <= 3 AND v2 >= 3 AND v3 >= 3;          -- Full condition support.
SELECT * FROM a WHERE v1 <= 3 AND v2 >= 3 AND v3 != NULL;       -- Full condition support.
```

PAX also supports nested expression structures and certain operators. For example:

```sql
-- Creates test table.
CREATE TABLE a(v1 int, v2 int, v3 int) USING PAX WITH(minmax_columns='v1, v2, v3');

-- Nested expressions.
SELECT * FROM a WHERE (v1 <= 3 OR v2 > 3) AND v3 >= 10;         -- Full support for all conditions.
SELECT * FROM a WHERE (v1 <= 3 AND v2 > 3) OR v3 >= 10;         -- Supports complete nested expressions.

-- Operators.
SELECT * FROM a WHERE v1 + v2 <= 3;
SELECT * FROM a WHERE v1 + 10 <= 3;
```

PAX can handle complete expression trees, including nested `AND`/`OR` conditions. This means that all the above queries can be optimized, and Apache Cloudberry will use all available filter conditions to improve query efficiency.

### Supported expression types

PAX sparse filtering supports the following expression types:

- Arithmetic operators (`OpExpr`)

    - Supports addition (`+`), subtraction (`-`), and multiplication (`*`)
    - Division operations are not supported (due to difficulty in estimating negative number ranges)
    - Examples: `a + 1`, `1 - a`, `a * b`

- Comparison operators (`OpExpr`)

    - Supports `<`, `<=`, `=`, `>=`, `>`
    - Examples: `a < 1`, `a + 1 < 10`, `a = b`

- Logical operators (`BoolExpr`)

    - Supports `AND`, `OR`, `NOT`
    - Example: `a < 10 AND b > 10`

- NULL value tests (`NullTest`)

    - Supports `IS NULL`, `IS NOT NULL`
    - Examples: `a IS NULL`, `a IS NOT NULL`

- Type casting (`FuncExpr`)

    - Only supports basic type casting
    - Example: `a::float8 < 1.1`
    - Custom functions are not supported, such as `func(a) < 10`

- `IN` operator (`ScalarArrayOpExpr`)

    - Supports `IN` expressions
    - Example: `a IN (1, 2, 3)`

### Partial condition support

When a query contains unsupported expressions (such as custom functions), PAX adopts a partial condition support strategy:

- Identifies and extracts supported conditions.
- Uses supported conditions for sparse filtering.

For example:

```sql
-- Creates custom function v2
CREATE OR REPLACE FUNCTION func(v2 double precision)
RETURNS double precision AS $$
BEGIN
  RETURN v2 * 2;
END;
$$ LANGUAGE plpgsql;

-- Uses custom function in query
SELECT * FROM a WHERE v1 < 3 AND func(v2) < 10;  -- PAX will use v1 < 3 for filtering
```

In this example, although `func(v2) < 10` cannot be used for sparse filtering, Apache Cloudberry still uses `v1 < 3` to optimize query performance. This approach ensures that partial performance optimization is achieved even in complex queries.

:::note
- The effectiveness of sparse filtering depends on data distribution and query conditions.
- It is recommended to enable statistics on columns that are frequently used as filter conditions.
- Certain conditions (such as custom functions) are ignored.
:::

## View data change records on PAX tables in WAL logs

Data operations related to PAX tables are recorded in the Write-Ahead Logging (WAL) system. This ensures reliable backups between primary and mirror nodes, which assists in failover processes.

You can use the `pg_waldump` tool to view the WAL logs for PAX tables. The logs are stored in the `$COORDINATOR_DATA_DIRECTORY/pg_wal` directory or the `pg_wal` directory within the Segment node's data directory.

The PAX table WAL logs can be used for these purposes:

- **Data recovery**: Helps restore data during system failures or data inconsistencies.
- **Failover support**: Ensures data synchronization between primary and mirror nodes.
- **Debugging and analysis**: Identifies and analyzes specific operations on PAX tables.

### Example: operate PAX tables and view WAL logs

1. Create a PAX table.

    ```sql
    CREATE TABLE a (
       v1 int,
       v2 int,
       v3 int
    ) USING PAX;
    ```

    This creates a PAX table `a` with columns `v1`, `v2`, and `v3`.

2. Insert data into the table:

    ```sql
    INSERT INTO a VALUES (1, 2, 3);
    ```

3. Locate the node where the PAX table resides:

    ```sql
    -- Views the IDs and data directory locations of all nodes in the cluster
    SELECT * FROM gp_segment_configuration;

    -- Identifies the Segment ID of table a based on the results of the above query
    -- This helps determine the segment and data directory location of table a
    SELECT gp_segment_id FROM gp_distribution_policy WHERE localoid = 'a'::regclass;
    ```

4. Find the corresponding WAL log in the `pg_wal` directory of the identified node. For example:

    ``` bash
    ls $COORDINATOR_DATA_DIRECTORY/pg_wal
    ```

    Locate the most recent WAL file to analyze the relevant operations. In this example, assume the WAL log file is named `00000001000000000000000A`.

5.  Query the `relfilenode` of the PAX table to associate the WAL log with the PAX table:

    ```sql
    SELECT relfilenode FROM pg_class WHERE relname = 'a';
    ```

    The `relfilenode` is the unique identifier of the table in the WAL log.

6.  Use the `pg_waldump` tool to parse the WAL log and identify operations related to the PAX table:

    ```bash
    pg_waldump -f $COORDINATOR_DATA_DIRECTORY/pg_wal/00000001000000000000000A
    ```

    In the output, search for the previously obtained `relfilenode` to find operations associated with the PAX table.

    Example output of `pg_waldump`:

    ```text
    rmgr: PAX       len (rec/tot):     68/   104, tx:    593, lsn: 0/016E1D98, prev 0/016E1D60, desc: INSERT off 3, blkref #0: rel 1663/16384/19780 blk 0
    ```

    In this example:

    - `rmgr: PAX` indicates the record type.
    - `rel 1663/16384/19780` corresponds to the `relfilenode` of the PAX table.
    - `INSERT` indicates that an insert operation was recorded.

By following the steps above, you can track and analyze WAL logs related to PAX tables in Apache Cloudberry for debugging, recovery, or performance optimization purposes.

## Limitations for PAX tables

- For index support, the PAX storage format currently only supports B-tree (`btree`) indexes. Bugs might occur when using GiST, SP-GiST (`gist/spgist`) or Brin indexes. Supports for other index types are still experimental and might be unavailable.
- Currently, if a field is too long, it will be stored in a TOAST file. This TOAST is different from PostgreSQL's TOAST tables, and they only share the same name.
- Unlike traditional heap tables, PAX format does not support `TOAST` fields. Currently, all column data is stored in the same data file.
- The PAX format does not support data backup and restore using `pg_dump` or `pg_restore`. PAX tables are ignored during these operations. You can use `pg_basebackup` to backup and restore PAX tables.

## PAX-related SQL options

PAX supports SQL options to control its behavior. You can use these options in the `WITH()` clause, for example, `WITH(minmax_columns='b,c', storage_format=porc)`.

| Name                   | Type    | Valid values                                         | Description                                                                                                                                                                                                                                                                                                                                                  |
|------------------------|---------|------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `storage_format`       | `string`| •  `porc`<br />•  `porc_vec`                             | Controls the internal storage format. `porc` is the default value, which stores data in a regular format and does not preserve null values. `porc_vec` stores data in a vector format and always preserves null values for fixed-length fields, regardless of whether the column value is null or not.                                                   |
| `compresstype`         | `string`| •  `none`<br />•  `rle`<br />•  `delta`<br />•  `zstd`<br />•  `zlib`<br />•  `dict` | Specifies the compression method for column values. You can only choose one method. The default value is `none`. <br /><br />•  `none` means no compression is applied.<br />•  `rle` uses run-length encoding to compress repeated consecutive data.<br />•  `delta` is used for numeric columns, storing the difference between adjacent values.<br />•  `zstd` uses the zstd algorithm, which offers high compression ratio and fast compression speed.<br />•  `zlib` is a general-purpose compression algorithm, suitable for compressing general data.<br />•  `dict` uses dictionary encoding to speed up the processing of many repeated strings. Currently, it is an experimental feature and is not recommended for production use. |
| `compresslevel`        | `int`   | Range `[0, 19]`                                      | Indicates the compression level. The default value is `0`. A smaller value means faster compression, while a larger value provides higher compression. This option is only effective when used with `compresstype`.                                                                                                                                            |
| `partition_by`         | `string`| Valid column names in the table                     | When writing batch data, this option attempts to partition the data by the specified column and store it in the same data file, improving data locality. Only integer types are supported. This partition key is independent of table partitioning and serves as a suggestion for organizing data internally in PAX.                              |
| `partition_ranges`     | `string`| `FROM(XX) TO(YY) [every(DD)]`                       | This option must be used with `partition_by` to set partition ranges. You can define a single range or divide a large range into multiple non-contiguous smaller ranges. It attempts to store data within each range in the same data file. Data outside the range will be stored in the default data file.                                                 |
| `minmax_columns`       | `string`| Valid column names in the table, separated by commas| Records `minmax` statistics for the defined columns to speed up data queries. After renaming a column, the statistics will no longer be recorded for that column. If you modify `minmax_columns` using `ALTER TABLE`, the change only applies to data files written afterward and does not affect existing data files.                                    |
| `cluster_columns`      | `string`| A comma-separated list of valid column names in the table. | Indicates that the PAX table stores the internal data in a clustered way. When using the `cluster` command, the data can be sorted by these columns, and the sorting method is controlled by the `cluster_type` parameter.                                                                                                                        |
| `bloomfilter_columns`  | `string`| A comma-separated list of valid column names in the table. | Calculates bloom filters for the data in the specified columns to help data filtering.                                                                                                                                                                                                                                                                        |
| `parallel_workers`     | `int`   | `[0,64]`                                             | A PostgreSQL option that sets the number of parallel processes for concurrent scanning.                                                                                                                                                                                                                                                                       |
| `cluster_type`         | `string`| `lexical` and `zorder`                              | Specifies the cluster type when clustering is based on custom columns defined in `reloptions` rather than an index. Valid values are `lexical` and `zorder`. `lexical` sorts by the values and order of the columns, while `zorder` encodes the values of multiple columns into a byte array and sorts by that array.                                    |


The values of these options only affect newly inserted and updated data and do not change the existing data.

## PAX-related system parameters

The following system parameters (GUC) are used to set the behavior of PAX tables in the current session. Use the command `SET <parameter>=<value>` to configure them, for example, `SET pax_enable_sparse_filter=on`.

| Parameter name                       | Value type | Valid values                                                                             | Description                                                                                                                                                                                                                     |
|--------------------------------------|------------|------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `pax_enable_sparse_filter`           | `bool`     | `on` and `off`                                                                           | Specifies whether to enable sparse filtering based on statistics. The default value is `on`, which means that sparse filtering is enabled by default.                                                                           |
| `pax_enable_row_filter`              | `bool`     | `on` and `off`                                                                           | Specifies whether to enable row filtering. The default value is `off`, which means that row filtering is disabled. It is not recommended to enable this parameter.                                                              |
| `pax_scan_reuse_buffer_size`         | `int`      | Range `[1048576, 33554432]` (1MiB to 32MiB)                                              | The buffer block size used during scanning. The default value is `8388608` (8MiB).                                                                                                                                              |
| `pax_max_tuples_per_group`           | `int`      | Range `[5, 524288]`                                                                      | Specifies the maximum number of tuples allowed in each group. The default value is `131072`.                                                                                                                                    |
| `pax_max_tuples_per_file`            | `int`      | Range `[131072, 8388608]`                                                                | Specifies the maximum number of tuples allowed in each data file. The maximum value is `8388608`. The default value is `1310720`.                                                                                               |
| `pax_max_size_per_file`              | `int`      | Range `[8388608, 335544320]` (8MiB to 320MiB)                                            | The maximum physical size allowed for each data file. The default value is `67108864` (64MiB). The actual file size might be slightly larger than the set size. Very large or small values might negatively impact performance. |
| `pax_enable_toast`                   | `bool`     | `on` and `off`. The default value is `on`.                                               | Specifies whether to enable TOAST support.                                                                                                                                                                                      |
| `pax_min_size_of_compress_toast`     | `int`      | Range `[524288, 1073741824]` (512KiB to 1GiB). The default value is `524288` (512KiB).   | Specifies the threshold for creating compressed TOAST tables. If the character length exceeds this threshold, Apache Cloudberry creates compressed TOAST tables for storage.                                                    |
| `pax_min_size_of_external_toast`     | `int`      | Range `[10485760, 2147483647]` (10MiB to 2GiB). The default value is `10485760` (10MiB). | Specifies the threshold for creating external TOAST tables. If the character length exceeds this threshold, Apache Cloudberry creates external TOAST tables for storage.                                                        |
| `pax_default_storage_format`         | `string`   | `porc` (the default value)                                                               | Controls the default storage format.                                                                                                                                                                                            |
| `pax_bloom_filter_work_memory_bytes` | `int`      | Range `[1024, 2147483647]` (1KiB to 2GiB). The default value is `10240` (10KiB).         | Controls the maximum memory allowed for bloom filter usage.                                                                                                                                                                     |

## Best practices

- Use partitioning options:

    - It is recommended to use partitioning options when data needs to be imported based on an integer column and meets the following conditions:

        - The data is evenly distributed across this column, with a wide range and no extreme concentration.
        - This column is often used as a filter condition in queries or as a key for joins.

    - Keep in mind that the PAX partition key is only effective during a single batch data import. It cannot be adjusted between multiple data writes. The partition key settings only apply to future inserts or updates, so after changing the partition key, newly imported data will follow the new partition key.

- Use `minmax` statistics:

    - For columns with a wide data range that are often used in query filters, setting `minmax` values for these columns can greatly speed up the query process.
    - By using `minmax` statistics, if a column in a data file does not match the `minmax` values or null tests, the entire file can be skipped quickly, avoiding unnecessary data scans.
    - Important note: The effectiveness of `minmax` depends on how data is inserted. If the data in a PAX table is inserted in batches (such as with `batch insert` or `copy`) and the data range within each batch is continuous, then `minmax` will be very effective. However, if the data is inserted randomly, the effectiveness of `minmax` filtering may be reduced.

- If a PAX table has multiple columns used in query filters, you can use `with(cluster_columns='b,c,d', cluster_type='zorder')`. After sorting the data with `zorder` encoding, any of the `cluster_columns` can benefit from filtering. In comparison, for single-column-based cluster sorting, filtering is only effective on the sorted key, with minimal impact on other columns. Clustering sorting influences `minmax`-based filtering but does not affect `bloom filter`-based filtering.

- If your query uses filters like `column1 in (12, 11, 13)` or `column1 = 'X'`, you might consider using a `bloom filter (with(bloomfilter_columns='b,c'))`. In internal implementation, PAX calculates bloom filters for certain data. If the bloom filter can confirm that the data is not in the block, PAX can skip the current block. Note that the effectiveness of bloom filter depends on several factors:

    - The amount of data within a `group`.
    - The space used by the `bloom filter`.
