---
title: pg_stat_progress_create_index
---

# pg_stat_progress_create_index

`pg_stat_progress_create_index` 是一个系统视图，用于显示当前数据库中正在执行的 `CREATE INDEX` 或 `REINDEX` 操作的实时执行进度。

该视图展示的是每个正在构建索引的后台进程 (Backend) 的详细状态，包括执行阶段（phase）、处理的元组数量、已扫描的数据块数等信息。在执行完成后，该视图对应记录将被自动清除。

在 Apache Cloudberry 中，该视图也适用于 AO 表（Append-Optimized 表），可用于观察其索引构建过程的阶段性信息。

该视图的主要用途包括：

- 实时监控索引创建或重建进程。
- 分析长时间运行的 `CREATE INDEX`/`REINDEX` 的瓶颈。
- 判断系统当前是否存在资源占用的索引任务。
- 配合 `pg_stat_activity` 分析执行索引任务的进程信息。

示例如下：

```sql
-- 查询所有正在执行的索引构建任务
SELECT * FROM pg_stat_progress_create_index;

-- 查询指定表上的索引进度
SELECT * FROM pg_stat_progress_create_index
WHERE relid = 'ao_test'::regclass;
```

### 字段说明

| 字段名               | 说明 |
|----------------------|------|
| `gp_segment_id`      | 当前记录所属的 Segment ID，仅在分布式环境中有效。 |
| `pid`                | 后台进程的进程号，可与 `pg_stat_activity` 联合查询获取会话详情。 |
| `datid`              | 数据库的 OID，对应 `pg_database.oid`。 |
| `datname`            | 数据库名称。 |
| `relid`              | 正在被索引的表的 OID，对应 `pg_class.oid`。 |
| `index_relid`        | 正在构建的索引对象的 OID。 |
| `command`            | 当前执行的命令类型：`CREATE INDEX` 或 `REINDEX`。 |
| `phase`              | 当前执行阶段，例如： <br /> `initializing`：初始化阶段 <br /> `scanning heap`：扫描表数据 <br /> `sorting`：排序阶段 <br /> `building index: loading tuples in tree`：构建索引结构 <br /> `waiting for locks`：等待表锁或元数据锁 |
| `lockers_total`      | 等待释放锁的会话总数（如有）。 |
| `lockers_done`       | 已完成锁释放的会话数量。 |
| `current_locker_pid` | 当前持有锁的进程号（如果正在等待）。 |
| `blocks_total`       | 要扫描的总数据块数（可能为 0 表示不可用或未开始）。 |
| `blocks_done`        | 已经扫描的数据块数。 |
| `tuples_total`       | 预计需要处理的元组总数（如可计算）。 |
| `tuples_done`        | 已处理的元组数。 |
| `partitions_total`   | （如适用）分区表中总分区数。 |
| `partitions_done`    | （如适用）已处理的分区数。 |

:::note 注意
- 此视图仅展示正在执行中的索引操作。索引创建完成后，记录会从视图中消失。
- 对于数据量小的表，索引可能瞬间完成，导致查询视图时无任何行。
- 为便于观察，可以在大表上执行索引构建，或使用复杂字段（如大文本）放缓过程。
- 在 AO 表上执行 `CREATE INDEX` 同样会上报进度信息。
- 该视图可与 ``pg_stat_activity`` 联合使用，通过 ``pid`` 字段关联：

    ```sql
    SELECT a.usename, a.query, p.phase, p.blocks_done, p.blocks_total
    FROM pg_stat_activity a
    JOIN pg_stat_progress_create_index p ON a.pid = p.pid;
    ```

:::
