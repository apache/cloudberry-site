---
title: reject_partition_fullscan
---

# reject_partition_fullscan

The `reject_partition_fullscan` module rejects queries that scan all partitions of a partitioned table without effective partition pruning. It installs a planner hook that inspects the finished plan, whether it comes from the Postgres-based planner or from GPORCA, and raises an error if a partitioned table would be scanned in full.

Use it to prevent expensive queries that omit a filter on the partition key.

## Build and install

`reject_partition_fullscan` is one of the debug extensions under `gpcontrib`. These are built when `--enable-debug-extensions` is in effect, which is the default. If Apache Cloudberry is configured with `--disable-debug-extensions`, the module is not built.

## Enable the module

The module works by loading its shared library. It has no SQL objects.

- To enable it for the whole cluster, add the library to `shared_preload_libraries` and restart the cluster:

    ```shell
    gpconfig -c shared_preload_libraries -v 'reject_partition_fullscan'
    gpstop -ra
    ```

    If `shared_preload_libraries` already lists other libraries, keep them in the value.

- To enable it for the current session only, load the library with `LOAD`. This requires superuser privileges:

    ```sql
    LOAD 'reject_partition_fullscan';
    ```

`CREATE EXTENSION reject_partition_fullscan` is available, but it creates no objects. The planner hook and the configuration parameters are registered when the library is loaded.

:::note
The check is on by default once the library is loaded, because `reject_partition_fullscan` defaults to `on`.
:::

## Configuration parameters

Both parameters can be changed by any role in its session.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `reject_partition_fullscan` | boolean | `on` | Rejects queries on partitioned tables that scan all partitions without pruning. |
| `partition_fullscan_threshold` | integer | `0` | Maximum number of partitions that a query is allowed to scan after pruning. With `0`, a plan of the Postgres-based planner is rejected if more than one partition remains. See [Behavior](#behavior). Range: `0` to `2147483647`. |

## Behavior

After a statement is planned, the module walks the plan tree and checks every scan of a partitioned table:

- With `partition_fullscan_threshold = 0`, a plan of the Postgres-based planner is rejected if more than one partition remains after plan-time pruning. A filter on the partition key that keeps two or more partitions is therefore rejected too. Set a positive threshold to allow such queries.
- With `partition_fullscan_threshold` greater than `0`, the statement is rejected if the number of partitions that remain after pruning is greater than the threshold.

:::caution
The module works reliably with plans of the Postgres-based planner. GPORCA, which is the default optimizer, attaches run-time pruning information to its dynamic scans, and the module treats such scans as prunable at run time. As a result, `SELECT` statements that GPORCA plans are not rejected, even when they scan all partitions. `UPDATE` and `DELETE` statements on partitioned tables are planned by the Postgres-based planner and are checked. To enforce the check for `SELECT` statements, turn GPORCA off in the session with `SET optimizer = off`.
:::

A rejected statement fails with an error of this form:

```text
ERROR:  partitioned table "<schema>.<table>" full partition scan is not allowed, <n> partitions would be scanned
HINT:  Add a WHERE clause on the partition key to enable partition pruning.
```

The check runs on every statement that is planned. It applies to `SELECT`, `UPDATE`, and `DELETE` statements, to partitioned tables referenced in subqueries, and to statements such as `EXPLAIN`, `INSERT ... SELECT`, and `CREATE TABLE AS` that read a partitioned table.

The following cases are not rejected:

- `reject_partition_fullscan` is `off`.
- `enable_partition_pruning` is `off`.
- The scan covers at most one partition, for example a partitioned table with a single partition.
- Partitions can be pruned at run time: plans with pruning steps that are evaluated at executor startup or during execution (for example a prepared statement with a parameter on the partition key), and GPORCA dynamic scans that use join-based partition pruning.

## Example

```sql
LOAD 'reject_partition_fullscan';
SET optimizer = off;

CREATE TABLE pfr_test (id int, dt date, val text)
    PARTITION BY RANGE (dt);
CREATE TABLE pfr_test_p1 PARTITION OF pfr_test
    FOR VALUES FROM ('2025-01-01') TO ('2025-04-01');
CREATE TABLE pfr_test_p2 PARTITION OF pfr_test
    FOR VALUES FROM ('2025-04-01') TO ('2025-07-01');
CREATE TABLE pfr_test_p3 PARTITION OF pfr_test
    FOR VALUES FROM ('2025-07-01') TO ('2025-10-01');

SET reject_partition_fullscan = on;
SET partition_fullscan_threshold = 0;

-- Rejected: no filter on the partition key
SELECT * FROM pfr_test;
SELECT * FROM pfr_test WHERE val = 'x';
UPDATE pfr_test SET val = 'y';

-- Allowed: the filter prunes the scan to one partition
SELECT * FROM pfr_test WHERE dt = '2025-02-01';
DELETE FROM pfr_test WHERE dt = '2025-02-01';

-- Rejected: two partitions remain after pruning
SELECT * FROM pfr_test
    WHERE dt >= '2025-01-01' AND dt < '2025-07-01';

-- Threshold mode: allow up to 2 partitions
SET partition_fullscan_threshold = 2;

-- Allowed: pruned to 2 partitions
SELECT * FROM pfr_test
    WHERE dt >= '2025-01-01' AND dt < '2025-07-01';

-- Rejected: 3 partitions exceed the threshold
SELECT * FROM pfr_test;
```

To allow a full scan for one session, turn the check off:

```sql
SET reject_partition_fullscan = off;
```

## Usage notes

- Both parameters can be changed by any role, so the module is a guard against accidental full scans, not an enforcement mechanism.
- The check runs at planning time on the plan that the optimizer produced. It does not consider how much data the partitions contain.
- When the library is loaded with `LOAD`, the check applies only to that session.
