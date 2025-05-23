---
title: BRIN Indexes
---

# BRIN Indexes

When a table is very large and the values of certain columns are naturally correlated with their physical storage locations, you can use block range indexes (BRIN). A BRIN index summarizes values for a range of blocks (or pages), where each range includes a group of physically adjacent pages in the table. For example, in a table that stores order data, earlier orders tend to appear at the beginning of the table. Similarly, in a table of postal codes, codes from the same city may be physically clustered.

BRIN indexes participate in queries using bitmap index scans. When the summary information in the index matches the query condition, the query accesses all pages within that block range and returns all tuples found. The executor then verifies these tuples one by one and filters out those that do not satisfy the condition. For this reason, BRIN is a "lossy" index. Since BRIN indexes are typically very small, they introduce minimal overhead compared to sequential scans, while enabling the system to skip many unrelated blocks.

The type of data a BRIN index stores and the queries it can accelerate depend on the operator class selected for each column. For linearly ordered data types, the index records the minimum and maximum values within each range. For geometric types, it stores the bounding box that encloses all objects in the range.

The size of each block range is determined by the `pages_per_range` parameter at index creation. The number of index entries equals the total number of pages in the table divided by `pages_per_range`. A smaller value leads to a larger index (more entries), but the summaries become more fine-grained, allowing the scan to skip more unrelated data blocks. The default `pages_per_range` value is `32` for heap tables and `1` for append-optimized tables.

:::note
Starting from v2.0.0, BRIN indexes are supported on AO and CO tables. A chained revmap structure is used to optimize storage and reduce space usage. This optimization improves both storage layout and summary maintenance, and allows summaries to be generated manually using `brin_summarize_range()`.

Although BRIN indexes can be created and maintained on AO/CO tables, whether the query planner chooses to use them depends on query predicates, data distribution, page count, and the heuristic cost model. As such, not all BRIN use cases lead to automatic performance gains. BRIN is best suited for large datasets with strong data clustering.
:::

## Maintain BRIN indexes

When a BRIN index is created, Apache Cloudberry scans existing heap pages and generates summary tuples for each block range, including the possibly incomplete tail range. As new data fills additional pages, the system attempts to update the summary information for ranges that have already been summarized. However, for ranges that have not yet been summarized, the system does not automatically create summary tuples. These ranges remain in an "unsummarized" state and require manual intervention to generate summaries.

You can generate initial summaries using the following methods:

- During a `VACUUM` operation, the system automatically summarizes all unprocessed block ranges.

Alternatively, you can manually control summarization using the following functions:

- `brin_summarize_new_values(regclass)`: summarizes all unprocessed block ranges.
- `brin_summarize_range(regclass, bigint)`: summarizes only the range containing the specified page, if it has not been summarized.

To remove summary information instead, you can use the `brin_desummarize_range(regclass, bigint)` function to clear summaries for a specific range. This is especially useful when data changes make existing summaries inaccurate.

The table below lists the functions available for BRIN index maintenance. These functions cannot be executed in recovery mode and are restricted to superusers or the index owner.

| Name                                                         | Return type | Description                                                                              |
|--------------------------------------------------------------|-------------|------------------------------------------------------------------------------------------|
| `brin_summarize_new_values(index regclass)`                  | integer     | Summarizes all unprocessed block ranges.                                                 |
| `brin_summarize_range(index regclass, blockNumber bigint)`   | integer     | Summarizes the range containing the specified block, if not already summarized.          |
| `brin_desummarize_range(index regclass, blockNumber bigint)` | integer     | Removes the summary for the range containing the specified block, if already summarized. |

The `brin_summarize_new_values` function accepts an index name or OID and automatically finds unsummarized ranges. It scans the corresponding table pages and generates new summary index tuples. It returns the number of summary entries created. The `brin_summarize_range` function processes only the range that contains the specified block number.

:::info
- Normally, after running `VACUUM`, the `brin_summarize_new_values()` function does not generate new summaries because the default behavior includes summarizing all newly added block ranges during cleanup. This function is mainly used for manual summary refreshes, which is useful when auto-vacuum is disabled or the table is frequently updated.
- If the table has few pages or the query predicate is not selective enough, the planner might still choose not to use a BRIN index path.
- The `brin_summarize_range` and `brin_desummarize_range` functions only affect ranges that actually exist. If a non-existent block number is provided, the function returns `0`. Due to uneven data distribution, some ranges may exist only on a subset of segments. In that case, the function returns the number of segments that successfully processed the range.
:::
