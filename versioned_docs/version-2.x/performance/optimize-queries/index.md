---
title: Query Performance Overview
---

# Query Performance in Apache Cloudberry

Apache Cloudberry improves query performance through dynamic partition elimination and adaptive memory allocation. These mechanisms help reduce the amount of data scanned, speed up query execution, and enhance overall concurrency.

:::tip
Apache Cloudberry uses the GPORCA optimizer by default, which extends the native Postgres planner with more advanced optimization capabilities.
:::

## Dynamic partition elimination

Apache Cloudberry supports dynamic partition elimination (DPE), a feature that prunes partitions at query execution time based on runtime values. This reduces the data scanned and improves query efficiency.

DPE is supported for the following join types:

- `Hash Inner Join`
- `Hash Left Join`
- `Hash Right Join` (since v2.0.0)

DPE is enabled when the following conditions are met:

- The partitioned table is on the outer side of the join.
- The join condition is an equality predicate on the partition key.
- Statistics are collected on the partitioned tables. For example:

    ```sql
    ANALYZE <root partition>;
    ```

The `gp_dynamic_partition_pruning` parameter controls whether DPE is enabled. It is ``ON`` by default but only applies to the Postgres optimizer. You can verify if DPE is in effect by checking the ``EXPLAIN`` plan for the presence of a `Partition Selector` node.

## Memory optimizations

Apache Cloudberry dynamically allocates memory based on the characteristics of query operators and proactively releases or reallocates memory during different query phases. This leads to more efficient memory usage and faster query execution.

:::info
Apache Cloudberry uses GPORCA by default. GPORCA extends the planning and optimization capabilities of the Postgres optimizer.
:::

```mdx-code-block
import DocCardList from '@theme/DocCardList';

<DocCardList />
```
