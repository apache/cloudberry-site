---
title: About Table Partitioning
---

# About Table Partitioning

Apache Cloudberry enables you to logically divide large tables into smaller, more manageable pieces using table partitioning. This can significantly improve query performance by allowing the query optimizer to scan only the necessary data, rather than the entire table. Partitioning is a logical division; it does not change the physical distribution of table data across segments.

For how to create and manage partitioned tables, see [Create and Manage Partitioned Tables](./create-and-manage-partitioned-tables.md).

## Why use table partitioning

Partitioning can offer several advantages, particularly for very large tables (for example, those exceeding the physical memory of the database server):

- **Improved Query Performance**: Queries can run much faster when most of the heavily accessed rows are in a single partition or a small number of partitions. Partitioning acts like an upper level of an index, making it more likely that critical parts of indexes fit in memory.
- **Efficient Scans**: When queries or updates access a large percentage of a single partition, a sequential scan of that partition can be more efficient than using an index, which would involve random-access reads across the whole table.
- **Faster Data Management**: Bulk loads and deletes can be performed rapidly by adding or removing partitions. Operations like `DROP TABLE` on a partition or `ALTER TABLE DETACH PARTITION` are much faster than bulk `DELETE` operations and avoid `VACUUM` overhead.
- **Data Tiering**: Seldom-used data can be migrated to cheaper, slower storage media by managing partitions.

## Partitioning methods

Apache Cloudberry supports the following table partitioning methods:

- **Range partitioning**: The table is partitioned into "ranges" defined by one or more key columns. There is no overlap between the value ranges assigned to different partitions. For example, you might partition by date ranges or ranges of business object identifiers. Each range's bounds are inclusive at the lower end and exclusive at the upper end.
- **List partitioning**: The table is partitioned by explicitly listing which key value(s) appear in each partition. For example, partitioning by sales territory or product line.
- **Hash partitioning**: The table is partitioned by specifying a modulus and a remainder for each partition. Each partition holds rows for which the hash value of the partition key, divided by the modulus, produces the specified remainder.

These methods can be combined in a multi-level partition design, for instance, using date-range partitioning at the first level and list partitioning at a sub-level. (An example figure in the source documentation illustrates a multi-level design using date-range and list partitioning).

## Partitioned table structure

When you partition a table in Apache Cloudberry:

- The main table you define (the *partitioned table*) is a "virtual" table; it doesn't store data itself.
- The actual data is stored in the individual *partitions*, which are otherwise ordinary tables associated with the partitioned table. Each partition stores a subset of the data as defined by its *partition bounds*.
- Rows inserted into the partitioned table are automatically routed to the correct partition based on the partition key column(s). If a row's partition key is updated such that it no longer fits its original partition's bounds, Apache Cloudberry will attempt to move it to the correct partition.
- You define partitions when creating the table using the `PARTITION BY` clause in the `CREATE TABLE` command. This creates a top-level *root partitioned table* which can have one or more levels of *child* tables (partitions). The table immediately above a child is its *parent*. A *leaf partition* is at the bottom of a hierarchy and holds data; leaf partitions in the same hierarchy can reside at different depths.
- Apache Cloudberry automatically creates distinct partition constraints for each partition, limiting the data it can contain. Query optimizers use these constraints to determine which partitions to scan for a given query.
- A partition itself can be defined as a partitioned table, leading to *sub-partitioning*.
- All partitions must have the same columns as their parent, but they can have their own distinct indexes, constraints, and default values.
- Partitions can also be external or foreign tables, but you must ensure their contents satisfy the partitioning rule. There are other restrictions for foreign tables as well.

## Decide on a partitioning strategy

Consider these questions to determine if partitioning is a viable strategy:

- **Is the table large enough?** Partitioning benefits large fact tables with millions or billions of records. For small tables, administrative overhead might outweigh benefits.
- **Are you experiencing unsatisfactory performance?** Partitioning should be considered if queries are slower than desired.
- **Do your query predicates have identifiable access patterns?** Look for columns consistently used in `WHERE` clauses. For example, if queries often filter by date, a date-partitioning design might be beneficial. If access is by region, consider list partitioning.
- **Does your data warehouse maintain a window of historical data?** If you need to keep data for a specific period (for example, the last twelve months), partitioning (for example, by month) allows you to easily drop the oldest partition and add a new one.
- **Can the data be divided into somewhat equal parts?** Choose criteria that divide data as evenly as possible. If partitions have roughly equal records, query performance can improve proportionally to the number of partitions (assuming the design supports the query criteria).

:::tip
- **Avoid over-partitioning**: Creating too many partitions can slow down management and maintenance tasks like vacuuming, segment recovery, and cluster expansion.
- **Ensure partition elimination**: Partitioning doesn't improve query performance unless the query optimizer can eliminate partitions based on query predicates. Queries scanning every partition will run slower. Always check the `EXPLAIN` plan.
- **Multi-level partitioning caution**: Be careful with multi-level partitioning as the number of partition files can grow very quickly, potentially impacting system manageability. For example, partitioning by 1000 days and 1000 cities creates one million partitions. If the table has 100 columns and is column-oriented, this could mean 100 million files per segment. Consider a single-level partition with bitmap indexes as an alternative, and always test performance.
:::

### Best practices for partitioning design

Careful design is crucial as poor choices can negatively affect query planning and execution performance.

- **Partition Key Selection**:

    * Choose the column(s) most commonly appearing in `WHERE` clauses of queries to enable partition pruning.
    * Consider requirements for `PRIMARY KEY` or `UNIQUE` constraints, which might influence key choice.
    * Factor in data removal needs; design partitions so that data to be removed together resides in a single partition for quick detachment.

- **Number of Partitions**:

    * **Too few partitions**: Might result in indexes remaining too large, poor data locality, and low cache hit ratios.
    * **Too many partitions**: Can lead to longer query planning times and higher memory consumption during planning and execution.

- **Future Growth**:

    * Consider how data might change. If partitioning by `LIST` of customers, what if the number of customers grows significantly? Partitioning by `HASH` with a reasonable number of partitions might be more robust.

- **Sub-partitioning**:

    * Can be useful for dividing partitions expected to become larger than others.
    * Range partitioning with multiple columns in the partition key is another option.
    * Both can easily lead to excessive partitions, so exercise restraint.

- **Overhead**:

    * The query planner generally handles hierarchies up to a few thousand partitions well, provided typical queries allow pruning to a small number of partitions.
    * Planning times and memory use increase when more partitions remain after pruning, especially for `UPDATE` and `DELETE` commands.
    * Server memory consumption can grow significantly if many sessions touch many partitions, as metadata for each partition is loaded into local memory per session.

- **Workload Type**:

    * Data warehousing tasks might benefit from more partitions than OLTP-type workloads. Planning time is often less critical in data warehouses compared to execution time.

- **Test Thoroughly**:

    * Make decisions early, as re-partitioning large tables is slow.
    * Simulate intended workloads to optimize the partitioning strategy. Do not assume more partitions are always better, or vice-versa.

## Limitations

Be aware of the following limitations for partitioned tables in Apache Cloudberry:

- A partitioned table can have a maximum of 32,767 partitions at each level.
- Partitioning replicated tables (tables created with `DISTRIBUTED REPLICATED`) is not supported.
- The Cloudberry query optimizer (GPORCA, which is the default) does not support uniform multi-level partitioned tables. Queries against such tables will use the Postgres-based planner.
- The `gpbackup` utility does not back up data from a leaf partition if that leaf partition is an external or foreign table.
- To create a unique or primary key constraint on a partitioned table:
    - The partition keys must not include any expressions or function calls.
    - The constraint's columns must include all of the partition key columns. This is because individual indexes enforce uniqueness within their partition, and the partition structure itself must guarantee no duplicates across different partitions.
- There is no way to create an exclusion constraint that spans the entire partitioned table; such constraints can only be placed on individual leaf partitions.
- Mixing temporary and permanent relations within the same partition hierarchy is not allowed. If the partitioned table is permanent, all its partitions must be permanent, and likewise for temporary tables (where all members must belong to the same session).
- **Inheritance Differences**:
    - Partitions cannot have columns that are not present in the parent table. You cannot add columns to partitions after creation or attach tables with different column structures.
    - `CHECK` and `NOT NULL` constraints of a partitioned table are always inherited by all of its partitions. `CHECK` constraints marked `NO INHERIT` cannot be created on partitioned tables. You cannot drop a `NOT NULL` constraint on a partition's column if the same constraint is present in the parent table.
    - Using `ONLY` to add or drop a constraint on only the partitioned table (for example, `ALTER TABLE ONLY ...`) is supported only as long as there are no partitions. Once partitions exist, using `ONLY` for constraints will result in an error.
    - Attempting to use `TRUNCATE ONLY` on a partitioned table will always return an error because the partitioned table itself contains no data.
- **External or Foreign Table Leaf Partitions**:
    - Modifying data (`INSERT`, `DELETE`, `UPDATE`, `TRUNCATE`) in a non-writable external/foreign partition or without permission will error.
    - `COPY` cannot copy data *to* a partitioned table if it involves updating an external/foreign partition.
    - `COPY` from an external/foreign table partition errors unless `IGNORE EXTERNAL PARTITIONS` is specified (which skips them). To `COPY` from a partitioned table with external/foreign leaf partitions, use an SQL expression (for example, `COPY (SELECT * from my_table) TO stdout`).
    - `VACUUM` commands skip external and foreign table partitions.
    - DDL operations like adding/dropping a column or changing a column's data type on a non-writable external/foreign partition (or without permission) will error.
