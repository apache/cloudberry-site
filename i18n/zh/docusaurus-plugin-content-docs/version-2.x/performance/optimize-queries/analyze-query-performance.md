---
title: 分析查询性能
---

# 分析查询性能

分析性能不佳的查询的执行计划，可以帮助你发现可能的性能优化空间。

Apache Cloudberry 会为每条查询生成一个查询计划。是否选择了适合查询语句和数据结构的查询计划，会直接影响查询性能。查询计划定义了 Cloudberry 在并行执行环境下如何执行这条查询。

查询优化器会根据数据库中维护的统计信息，选择一个成本最低的执行计划。成本以磁盘 I/O 计量，单位是磁盘页读取次数。优化器的目标是最小化查询执行的总成本。

你可以使用 `EXPLAIN` 命令查看某条查询的执行计划。`EXPLAIN` 会显示优化器为该查询计划估算的成本。例如：

```sql
EXPLAIN SELECT * FROM names WHERE id=22;
```

`EXPLAIN ANALYZE` 会实际执行该语句，并显示其执行计划。这对于判断优化器的估算是否准确非常有用。例如：

```sql
EXPLAIN ANALYZE SELECT * FROM names WHERE id=22;
```

:::note 注意
在 Apache Cloudberry 中，默认使用 GPORCA 优化器，与 Postgres 优化器并存。由 GPORCA 生成的 `EXPLAIN` 输出格式与 Postgres 优化器不同。

默认情况下，Apache Cloudberry 会优先使用 GPORCA 来生成查询的执行计划。

当使用 `EXPLAIN ANALYZE` 并启用 GPORCA 时，执行计划中只会显示被裁剪掉的分区数量，不会列出实际被扫描的分区。要在 segment 日志中显示被扫描分区的名称，可以将服务器配置参数 `gp_log_dynamic_partition_pruning` 设置为 `on`。下面这个 `SET` 命令可以启用该参数：

```sql
SET gp_log_dynamic_partition_pruning = on;
```

:::

## 解读 EXPLAIN 输出

一个查询计划是一棵由多个节点组成的树。计划中的每个节点代表一个单独的操作，例如表扫描、连接、聚合或排序。

查询计划应自下而上阅读：每个节点会将结果行传递给其上方的节点。计划树底部的节点通常是表扫描操作，包括顺序扫描、索引扫描或位图索引扫描。如果查询需要连接、聚合、排序或其他行处理操作，这些操作会在扫描节点之上由额外的节点执行。计划树顶部的节点通常是 Apache Cloudberry 的 motion 节点：例如 redistribute、explicit redistribute、broadcast 或 gather motion。这些操作用于在查询执行过程中在不同的 segment 实例间传递数据行。

`EXPLAIN` 的输出中，每个节点对应一行，显示节点类型以及以下执行成本估算信息：

- **cost** — 以磁盘页读取次数为单位衡量。1.0 表示顺序读取一个磁盘页。括号中的第一个值是启动成本（获取第一行的成本），第二个值是获取所有行的总成本。这个总成本是基于“获取所有行”的假设，但这不一定成立，例如查询中有 `LIMIT` 时，并不会返回所有行。

    :::note 注意
    GPORCA 与 Postgres 优化器生成的 cost 值不具备可比性。这两个优化器使用的是不同的成本模型和算法来评估执行计划的成本。因此，不应也不能通过比较两者的 cost 值来得出任何结论。
    :::

    此外，cost 值只在当前查询及其对应的统计信息下，用于比较不同执行计划方案之间的优劣。不同查询即便使用相同优化器，也可能产生完全不同的 cost 值。

    简而言之，cost 是优化器内部用于评估计划优劣的一个参考值，仅凭 `EXPLAIN` 中显示的 cost 无法判断实际性能。

- **rows** — 表示该计划节点最终输出的行数。该数值通常小于该节点处理或扫描的行数，反映了 `WHERE` 条件的选择性。理想情况下，最顶层节点的 rows 值应接近实际返回、更新或删除的行数。
- **width** — 表示该计划节点输出的每一行所占的总字节数。

还需注意：

- 一个节点的 cost 会包含其所有子节点的 cost。计划树最上层的节点显示的是整个查询计划的总成本，也是优化器试图最小化的目标。
- cost 仅反映查询优化器用于评估执行计划时考虑的开销，不包括诸如将结果传输给客户端的耗时。

### EXPLAIN 示例

下面的示例展示了如何解读某条查询的 `EXPLAIN` 输出：

```sql
EXPLAIN SELECT * FROM names WHERE name = 'Joelle';
                     QUERY PLAN
------------------------------------------------------------
Gather Motion 2:1 (slice1) (cost=0.00..20.88 rows=1 width=13)

   -> Seq Scan on 'names' (cost=0.00..20.88 rows=1 width=13)
         Filter: name::text ~~ 'Joelle'::text
```

应从下往上阅读该执行计划。首先，查询优化器对 `names` 表进行顺序扫描。注意，`WHERE` 子句作为 *Filter* 条件出现在扫描节点中，表示每行都会应用这个条件筛选，只有满足条件的行才会被输出。

扫描操作的结果会传递给 *gather motion* 节点。在 Apache Cloudberry 中，gather motion 表示 segment 实例将结果行发送到协调器。在这个例子中，是由两个 segment 实例向一个协调器实例发送数据。该操作属于并行查询计划的 `slice1`。一个查询计划会被划分为多个 *slice*，便于各个 segment 并行执行不同部分的查询计划。

该查询计划的估算启动成本为 `0.00`，总成本为 `20.88`（磁盘页读取数）。优化器预估该查询将返回 1 行数据。

## 解读 EXPLAIN ANALYZE 输出

`EXPLAIN ANALYZE` 会先生成执行计划并实际运行该语句。其输出中不仅包含优化器的估算成本，还包括实际的执行情况。这有助于判断优化器估算是否准确。此外，`EXPLAIN ANALYZE` 还会显示以下内容：

- 查询执行的总耗时（单位为毫秒）。
- 查询计划中每个 slice 的内存使用情况，以及整条查询语句所保留的内存。
- 每个计划节点实际参与执行的 *worker*（segment）数量，仅统计返回数据的 segment。
- 某个操作中返回数据最多的 segment 所返回的最大行数。如果多个 segment 返回的行数相同，将显示耗时最长的那一个 segment（根据 `time to end`）。
- 返回数据最多的 segment 的 ID。
- 对于相关操作，会显示该操作使用的 `work_mem` 内存大小。如果 `work_mem` 不足，无法在内存中完成操作，计划中还会显示性能最差的 segment 溢写到磁盘的数据量。例如：

    ```
    Work_mem used: 64K bytes avg, 64K bytes max (seg0).
    Work_mem wanted: 90K bytes avg, 90K byes max (seg0) to lessen 
    workfile I/O affecting 2 workers.
    ```

- 对于返回数据最多的 segment，显示其获取第一行所花时间（毫秒），以及获取全部数据的耗时。如果这两个时间相同，可能省略 `time` to first row。

### EXPLAIN ANALYZE 示例

以下示例使用相同的查询语句，展示如何解读 `EXPLAIN ANALYZE` 的输出。执行计划中加粗部分表示每个节点实际的运行时间、返回的行数，以及整条查询的内存和时间统计信息。

```sql
EXPLAIN ANALYZE SELECT * FROM names WHERE name = 'Joelle';
                     QUERY PLAN
------------------------------------------------------------
Gather Motion 2:1 (slice1; segments: 2) (cost=0.00..20.88 rows=1 width=13)
    Rows out: 1 rows at destination with 0.305 ms to first row, 0.537 ms to end, start offset by 0.289 ms.
        -> Seq Scan on names (cost=0.00..20.88 rows=1 width=13)
             Rows out: Avg 1 rows x 2 workers. Max 1 rows (seg0) with 0.255 ms to first row, 0.486 ms to end, start offset by 0.968 ms.
                 Filter: name = 'Joelle'::text
 Slice statistics:

      (slice0) Executor memory: 135K bytes.

    (slice1) Executor memory: 151K bytes avg x 2 workers, 151K bytes max (seg0).

Statement statistics:
 Memory used: 128000K bytes
 Total runtime: 22.548 ms
```

计划应从下往上读。这条查询的总耗时为 `22.548` 毫秒。

顺序扫描操作中，只有一个 segment（`seg0`）返回了数据，返回了 `1 行`。该 segment 查找到第一行耗时 `0.255` 毫秒，扫描完整个表耗时 `0.486` 毫秒。这个结果和优化器预估非常接近：优化器估算该查询只会返回 1 行。`gather motion`（即各 segment 向协调器传输结果）操作共接收到 1 行数据，该操作的总耗时为 `0.537` 毫秒。

#### 判断查询使用的优化器

你可以通过查看 `EXPLAIN` 输出，判断查询计划是否由 GPORCA 生成，以及当前是否启用了 GPORCA。相关信息会显示在 `EXPLAIN` 输出的最后部分。`Settings` 行显示服务器配置参数 `OPTIMIZER` 的当前设置；`Optimizer:` 行则显示是 GPORCA 还是 Postgres 优化器生成了该查询计划。

下面两个示例中，GPORCA 是启用状态（`OPTIMIZER=on`）。第一个查询计划是由 GPORCA 生成的；第二个虽然启用了 GPORCA，但 Cloudberry 回退使用了 Postgres 优化器生成计划。

```sql
                       QUERY PLAN
------------------------------------------------------------------------------------
 Aggregate  (cost=0.00..296.14 rows=1 width=8)
   ->  Gather Motion 2:1  (slice1; segments: 2)  (cost=0.00..295.10 rows=1 width=8)
         ->  Aggregate  (cost=0.00..294.10 rows=1 width=8)
               ->  Seq Scan on part  (cost=0.00..97.69 rows=100040 width=1)
 Settings:  optimizer=on
 Optimizer: GPORCA
(5 rows)
```

```sql
explain select count(*) from part;

                       QUERY PLAN
----------------------------------------------------------------------------------------
 Aggregate  (cost=3519.05..3519.06 rows=1 width=8)
   ->  Gather Motion 2:1  (slice1; segments: 2)  (cost=3518.99..3519.03 rows=1 width=8)
         ->  Aggregate  (cost=3518.99..3519.00 rows=1 width=8)
               ->  Seq Scan on part  (cost=0.00..3018.79 rows=100040 width=1)
 Settings:  optimizer=on
 Optimizer: Postgres-based planner
(5 rows)
```

对于下面这个查询，服务器配置参数 `OPTIMIZER` 被设置为 `off`，因此使用了 Postgres 优化器：

```sql
explain select count(*) from part;

                       QUERY PLAN
----------------------------------------------------------------------------------------
 Aggregate  (cost=3519.05..3519.06 rows=1 width=8)
   ->  Gather Motion 2:1  (slice1; segments: 2)  (cost=3518.99..3519.03 rows=1 width=8)
         ->  Aggregate  (cost=3518.99..3519.00 rows=1 width=8)
               ->  Seq Scan on part  (cost=0.00..3018.79 rows=100040 width=1)
 Settings: optimizer=off
 Optimizer: Postgres-based planner
(5 rows)
```

## 分析查询计划以定位问题

如果某条查询执行性能较差，可以通过分析其查询计划并思考以下几个问题：

- **是否有某个操作耗时异常？** 查看是否存在某个操作占用了大部分查询执行时间。例如，如果索引扫描的耗时异常，可能是索引已过期，需要重建索引。你也可以尝试调整 `enable_<operator>` 类参数，通过禁用某些计划节点来让 Postgres 优化器选择不同的执行计划。

- **查询计划生成时间是否超过了查询本身的执行时间？** 当查询涉及大量表连接时，Postgres 优化器会使用一种动态算法来生成执行计划，其耗时部分取决于连接的表数量。你可以通过将 `join_collapse_limit` 和 `from_collapse_limit` 配置参数设置为较小的值（如 `8`）来减少优化器的计划时间。需要注意的是，虽然较小的值能加快计划生成，但可能会导致计划质量下降。

- **优化器的估算是否接近实际？** 运行 `EXPLAIN ANALYZE`，观察优化器估算的返回行数是否接近实际返回行数。如果偏差较大，建议对相关列重新收集统计信息。

- **选择性较强的谓词是否尽早在执行计划中应用？** 应该尽量在执行计划早期就应用选择性强的过滤条件，这样可以减少上层节点处理的行数。如果计划中未能正确估算谓词的选择性，可考虑对相关列重新收集统计信息。你也可以尝试调整 SQL 中 `WHERE` 子句的顺序。

- **优化器是否选择了最佳的连接顺序？** 多表连接查询中，应确保优化器优先进行选择性更强、能尽早过滤掉大量数据的连接操作，从而减少后续操作处理的行数。

    如果执行计划没有采用最佳连接顺序，可以设置 `join_collapse_limit=1` 并使用显式的 `JOIN` 语法来强制 Postgres 优化器按指定顺序进行连接。此外，也可以对连接键列收集更多统计信息。

- **优化器是否只扫描了所需的分区？** 如果使用了表分区，检查优化器是否只扫描了满足查询条件的子分区。对于父分区的扫描应返回 0 行，因为父分区本身不包含数据。参考文档 [确定分区策略](../../operate-with-data/operate-with-db-objects/about-table-partitioning.md#decide-on-a-partitioning-strategy) 中有关于选择性分区扫描的查询计划示例。

- **优化器是否选择了 hash 聚合和 hash join 操作（如果适用）？** hash 操作通常比其他类型的连接或聚合更快。其行比较与排序操作都在内存中进行，而不是频繁读写磁盘。要让优化器选择 hash 操作，系统必须有足够的内存来容纳预计的行数。可以尝试调高 `work_mem` 参数来提升查询性能。如果可能，运行 `EXPLAIN ANALYZE`，查看哪些操作发生了溢写、使用了多少 `work_mem`，以及要避免溢写所需的内存。例如：

    `Work_mem used: 23430K bytes avg, 23430K bytes max (seg0). Work_mem wanted: 33649K bytes avg, 33649K bytes max (seg0) to lessen workfile I/O affecting 2 workers.`

    `EXPLAIN ANALYZE` 中的 "bytes wanted" 信息是根据写入 workfile 的数据量估算的，并不精确。实际需要的最小 `work_mem` 可能与建议值不同。
