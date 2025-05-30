---
title: Create and Manage Indexes
---

# Create and Manage indexes

In traditional databases, indexes are commonly used to significantly improve data access performance. However, in distributed systems like Apache Cloudberry, indexes must be used more cautiously. Apache Cloudberry provides high-speed sequential scans, while index lookups rely on random disk access. Because data is distributed across multiple segments, each segment only needs to scan its local subset of data to return results. Combined with table partitioning, the amount of data scanned during a query can be further reduced. As a result, in business intelligence (BI) workloads—which typically return large result sets—indexes might introduce performance overhead instead of benefits.

The recommended approach is to run queries without indexes first. If necessary, add indexes based on actual performance observations. Indexes are usually more suitable for OLTP scenarios, where queries often retrieve a single row or a small data range. For queries that return specific target rows, indexes can also provide performance gains on AO tables. In suitable cases, the planner might choose to use the index instead of scanning the entire table. For compressed data, index access allows the system to decompress only the required rows, improving overall efficiency.

When a table defines a primary key, Apache Cloudberry automatically creates a `PRIMARY KEY` constraint. For partitioned tables, indexes must be created on the root table; the system will automatically propagate the index to all child tables. Note that you cannot manually add indexes to system-created child tables.

In addition, a `UNIQUE CONSTRAINT` (such as a `PRIMARY KEY CONSTRAINT`) implicitly creates a `UNIQUE INDEX`. This index must include all columns in both the distribution key and partition key, and it must enforce uniqueness across the entire table, including all partitions.

Indexes introduce additional overhead: they consume storage and require maintenance during data updates. Therefore, always confirm that your query workload actually uses the indexes you create, and verify that they provide measurable performance improvements. You can check this by examining the query execution plan using `EXPLAIN`.

## Index types

Apache Cloudberry supports multiple PostgreSQL index types, including B-tree, Hash, GiST, SP-GiST, GIN, and [BRIN indexes](./brin-indexes.md). Each type is suited to different query patterns. B-tree is the default and most widely applicable index type. For detailed explanations of each index type, refer to the PostgreSQL documentation on [index types](https://www.postgresql.org/docs/14/indexes-types.html).

:::note
In Apache Cloudberry, the indexed columns of a unique index must either match the distribution key or include all its columns. On partitioned tables, unique indexes enforce uniqueness only within individual child tables, not across all partitions.
:::

### Bitmap indexes

Bitmap indexes are especially suitable for typical data warehouse scenarios with large data volumes, frequent queries, and infrequent updates. Compared to regular indexes, bitmap indexes save storage space while efficiently handling multi-condition queries.

A bitmap index maintains a bitmap for each key value. Each bit in the bitmap indicates whether the corresponding row contains that value. Bitmaps can be combined using Boolean operations (such as `AND` and `OR`), allowing efficient filtering across multiple conditions. Before accessing data, bitmap operations can eliminate large numbers of irrelevant rows, significantly improving query performance.

Recommended usage:

- Ideal for analytical workloads in data warehouses.

- Best suited for columns with medium cardinality (around 100 to 100,000 unique values).

- Especially effective for queries with multiple `AND` or `OR` conditions in the `WHERE` clause.

- Starting from v2.0.0, bitmap index scans can be triggered by array predicates (such as `col IN (...)` or `col = ANY(array)`):

    - Works with both B-tree and hash indexes.
    - Hash indexes, which previously only supported equality matches, now support array comparison predicates.
    - The planner uses a cost-based model to decide whether to use a bitmap path.

    Example: The following query triggers a bitmap index scan, allowing the hash index to efficiently handle multi-value conditions in large datasets.

    ```sql
    CREATE TABLE users(id int, name text) DISTRIBUTED BY (id);
    CREATE INDEX ON users USING hash (name);

    SELECT * FROM users WHERE name IN ('alice', 'bob', 'carol');
    ```

Limitations:

- Not suitable for unique or high-cardinality columns (such as user IDs or phone numbers).
- Not recommended for OLTP workloads with frequent updates.
- Always validate performance benefits through testing before adding bitmap indexes.

## Manage indexes

### Cluster a table by index

You can use the `CLUSTER` command to physically reorder table data based on an index. However, this operation can be time-consuming for very large tables. A more efficient alternative is to manually reorder the data by creating an intermediate table and inserting data in the desired order. For example:

```sql
CREATE TABLE new_table (LIKE old_table) 
    AS SELECT * FROM old_table ORDER BY myixcolumn;
DROP old_table;
ALTER TABLE new_table RENAME TO old_table;
CREATE INDEX myixcolumn_ix ON old_table;
VACUUM ANALYZE old_table;
```

### Create indexes

Use the `CREATE INDEX` command to create indexes on a table. The default index type is B-tree. For example, to create a B-tree index on the *gender* column of the *employee* table:

```sql
CREATE INDEX gender_idx ON employee (gender);
```

To create a bitmap index on the *title* column of the *films* table:

```sql
CREATE INDEX title_bmp_idx ON films USING bitmap (title);
```

### Rebuild all indexes on a table

You can use the `REINDEX` command to rebuild all indexes on a table or a specific index:

```sql
REINDEX my_table;
```

Rebuild a single index on a table:

```sql
REINDEX my_index;
```

### Drop indexes

Use the `DROP INDEX` command to remove an index. For example:

```sql
DROP INDEX title_idx;
```

During data loading, dropping all indexes beforehand and recreating them after the load is complete can often improve overall performance.

## Index-only scan and covering index

:::note
Apache Cloudberry supports index-only scans and covering indexes only on newly created tables.
:::

### What is an index-only scan

In Apache Cloudberry, all indexes are secondary and stored separately from the main data (heap).

In a typical index scan, the planner uses the index to locate matching tuple positions, then accesses the heap via tuple pointers to fetch the actual data. Because data in the heap is usually not stored contiguously, this approach can lead to significant random I/O, especially on traditional spinning disks. Although bitmap scans can reduce this overhead to some extent, heap access is still required.

An index-only scan is a scan method that can return results entirely from the index, without accessing the heap, which significantly improves query performance.

:::note
Starting from v2.0.0, Apache Cloudberry (using the ORCA optimizer) supports index-only scans on append-optimized (AO) and PAX tables, improving performance for repeated-read query workloads on these table types.
:::

### Requirements

Two conditions must be met to enable index-only scans:

- The index type must support index-only scans:

    - B-tree indexes always support it.
    - GiST and SP-GiST indexes support it with certain operator classes.
    - GIN indexes do not support it (they only store partial field data).
    - Other index types generally do not support it.

- All columns referenced in the query must be included in the index:

    Example queries that can use index-only scans:

    ```sql
    SELECT x, y FROM tab WHERE x = 'key';
    SELECT x FROM tab WHERE x = 'key' AND y < 42;
    ```

    Example queries that cannot use index-only scans:

    ```sql
    SELECT x, z FROM tab WHERE x = 'key';
    SELECT x FROM tab WHERE x = 'key' AND z < 42;
    ```

### Additional note: MVCC visibility checks

Even if both conditions above are met, the system must still verify whether each record is visible to the current transaction, according to multi-version concurrency control (MVCC) rules. Because visibility information is not stored in indexes, the system usually needs to access the heap for confirmation.

To reduce the performance overhead of heap access, Apache Cloudberry uses a visibility map mechanism:

- If all tuples in a heap page are visible to all transactions, the page is marked as "all-visible".
- During query execution, the system checks the visibility map first.
- If the page is "all-visible", it skips heap access and returns results directly.
- Otherwise, the heap must still be accessed for visibility checks.

Visibility maps are lightweight and usually cached entirely in memory, significantly reducing the cost of random I/O during queries. As a result, index-only scans offer real performance benefits only when most heap pages are marked as "all-visible".

### Purpose of covering indexes

To better support index-only scans, you can explicitly create covering indexes that include all columns referenced in the query. Apache Cloudberry supports the `INCLUDE` clause, which allows you to add non-filter columns to the index:

Example:

```sql
-- Traditional index: accelerates only the WHERE clause, does not support index-only scan
CREATE INDEX tab_x ON tab(x);

-- Covering index: includes column y in the index, supports index-only scan
CREATE INDEX tab_x_y ON tab(x) INCLUDE (y);

-- Example query
SELECT y FROM tab WHERE x = 'key';
```

Columns added using `INCLUDE` are not used for index matching. They are included only to cover the columns returned by the query. Therefore:

- They do not need to support indexable operations.
- In a unique index, they are not considered in uniqueness enforcement.

Example:

```sql
CREATE UNIQUE INDEX tab_x_y ON tab(x) INCLUDE (y);
-- Uniqueness is enforced on column x only, not on y
```

Limitations and considerations:

- Index tuple size is limited. Including wide columns might lead to large index size and insertion failures.
- Adding non-key columns increases index size and might affect read or update performance.
- Covering indexes only help trigger index-only scans if the table is rarely updated (i.e., most pages are marked as all-visible).
- Expressions are not currently supported in the `INCLUDE` clause.
- Currently, only B-tree and GiST index types support `INCLUDE`.

:::note
Starting from v2.0.0, Apache Cloudberry (using the ORCA optimizer) supports PostgreSQL-style `INCLUDE` clauses on AO and PAX tables, enabling the creation of covering indexes.
:::

From v2.0.0 onward, the GPORCA optimizer considers both the width and the number of included columns when selecting an index-only scan path. If multiple indexes satisfy the query predicates and output requirements, the optimizer prefers narrower indexes with fewer fields to reduce I/O costs.

Example:

```sql
CREATE TABLE t1 (c1 int, c2 int, c3 int, c4 int, c5 int);

CREATE INDEX idx_large ON t1 USING btree(c1) INCLUDE (c2, c3, c4, c5);
CREATE INDEX idx_c1 ON t1 USING btree(c1);

EXPLAIN ANALYZE SELECT c1 FROM
```

### Dynamic index-only scan

Dynamic index-only scan is an efficient query strategy used by Apache Cloudberry (with the ORCA optimizer) when querying partitioned tables. It combines two key techniques:

- **Index-only scan**: The query accesses only the index and avoids heap access, provided all referenced columns are covered by the index and the corresponding pages are marked as "all-visible" (e.g., after a `VACUUM` operation).
- **Dynamic scan**: During execution, only the relevant partitions are selected based on query conditions, avoiding unnecessary partition access (i.e., partition pruning).

The core idea of dynamic index-only scan is to combine index-only access with partition pruning. This allows the system to scan only the relevant partitions and skip heap access, greatly improving query efficiency.

It applies in the following scenarios:

- The target is a partitioned table.
- The query references only columns included in the index (i.e., using a covering index).
- The table has been vacuumed, and related pages are marked as all-visible.
- The table is wide, but the index is compact and includes only necessary columns.

Dynamic index-only scan significantly improves performance, reduces I/O, adapts automatically to partition structure, and is completely transparent to users.

This feature is enabled by default. If it is disabled, run the following command to enable it:

```sql
SET optimizer_enable_dynamicindexonlyscan = on;
```

Example:

```sql
CREATE TABLE pt(a int, b text, c text) 
PARTITION BY RANGE(a) (START (0) END (100) EVERY (20));

CREATE INDEX idx ON pt(a);  -- Covering index, includes only column a

-- Insert a large volume of data and clean up
INSERT INTO pt ...
VACUUM pt;

-- Query involves only column a and supports partition pruning
SELECT a FROM pt WHERE a < 42;
```

## Backward index scan

For queries that include `ORDER BY ... DESC`, the GPORCA optimizer might choose a backward index scan path using a B-tree index to avoid additional sorting operations.

Example:

```sql
CREATE TABLE foo (a int, b int, c int) DISTRIBUTED BY (a);
CREATE INDEX foo_b ON foo(b);
INSERT INTO foo SELECT i, i, i FROM generate_series(1,10000) i;
ANALYZE foo;

EXPLAIN SELECT * FROM foo ORDER BY b DESC LIMIT 1;
```

In this query, although the `foo_b` index is ordered in ascending order by default, the query requires descending order. The optimizer automatically selects a Backward IndexScan to scan the index in descending order, eliminating the need for a `Sort` node:

```sql
Limit
  ->  Gather Motion 3:1
        Merge Key: b
        ->  Limit
              ->  Index Scan Backward using foo_b on foo
```

This optimization applies to both regular index scans (`IndexScan`) and index-only scans (`IndexOnlyScan`).

The following conditions must be met for the optimization to take effect:

- A B-tree index is used.
- The query includes an `ORDER BY` clause that matches the index column.
- The sort direction in the query is opposite to the index’s default order.
- If `NULLS FIRST` or `NULLS LAST` is specified, the sort behavior must also match.

Backward IndexScan can significantly reduce the overhead of sorting operations, making it particularly effective for pagination or top-N queries.

## Check index usage

Indexes in Apache Cloudberry require no manual tuning or maintenance. However, you can evaluate their effectiveness by inspecting the actual query execution plan. Use the `EXPLAIN` command to see whether a query uses an index.

The query plan reveals how the database executes a query (known as *plan nodes*) and provides cost estimates for each step. To check if an index is used, look for the following nodes in the `EXPLAIN` output:

- **Index Scan**: retrieves data directly using the index.
- **Bitmap Index Scan**: builds a bitmap based on query conditions and performs bitmap scan.
- **Bitmap Heap Scan**: fetches rows from the heap using the bitmap.
- **BitmapAnd** / **BitmapOr**: merges multiple bitmaps for compound conditions.

Here are some recommendations for evaluating and optimizing index usage:

- Always run `ANALYZE` after creating or modifying an index. This updates table statistics, which the optimizer uses to estimate row counts and choose the best plan.

- Test with real data. Test data reflects the test environment only and does not represent actual production data distribution or behavior.

- Avoid using small datasets for testing. Their behavior often differs significantly from large-scale data, and the results might not be meaningful.

- Pay attention to data distribution when generating test data. Random and skewed values can all affect the accuracy of statistics.

- You can adjust GUC parameters to force the optimizer to use specific plans and evaluate index behavior. For example:

    ```sql
    SET enable_seqscan = off;
    SET enable_nestloop = off;
    ```
   
    Disabling sequential scan and nested loop join encourages the system to choose an index-based path. Use `EXPLAIN ANALYZE` on both indexed and non-indexed queries, compare the execution times and plans, and determine whether the index improves performance.
