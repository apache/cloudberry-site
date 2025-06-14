---
title: 更新统计信息
---

# 更新统计信息

要获得良好的查询性能，准确的统计信息准确十分重要。通过使用 `ANALYZE` 语句更新统计信息，可以使查询优化器生成最优的查询计划。Apache Cloudberry 对表进行分析时，相关的数据信息被存储在系统目录表中。如果存储的信息过时了，查询优化器可能会生成低效的查询计划。

## 查看统计信息是否已更新

要查看一张表的统计信息是否是最新的，可以使用 `pg_stat_all_tables` 系统视图。这个视图中的 `last_analyze` 列显示该表最近一次被分析的时间，而 `last_autoanalyze` 列显示该表最近一次被自动分析的时间。执行  `ANALYZE` 语句时，这两列的时间信息都会被更新。

例如，要检查 `test_analyze` 表的统计信息是否已更新，可以执行以下查询：

```sql
SELECT schemaname, relname, last_analyze, last_autoanalyze 
FROM pg_stat_all_tables 
WHERE relname = 'test_analyze';
```

## 有选择地生成统计信息

不带任何参数执行 `ANALYZE` 语句会更新数据库中所有表的统计信息。这是一个非常耗时的过程，不推荐这样操作。建议在数据发生变化时，选择性地对表执行 `ANALYZE` ，或者使用 analyzedb 工具。

对大表执行 `ANALYZE` 可能需要很长时间。如果无法对大表的所有列执行 `ANALYZE`，可以仅针对特定列使用  `ANALYZE table(column, ...)` 来生成统计信息。确保在这些条件中使用的列被包含在内：连接、`WHERE` 子句、`SORT` 子句、`GROUP BY` 子句或 `HAVING` 子句。

对于分区表，可以仅对发生变化的分区执行 `ANALYZE`，例如，添加新分区时。请注意，对于分区表，可以在根分区表或叶分区（实际存储数据和统计信息的文件）上执行 `ANALYZE`。在 Apache Cloudberry 中，对分区表的单个分区执行 `ANALYZE` 还会更新根表的统计信息，这表明对一个分区进行统计信息收集可能会影响整个分区表的优化器统计信息。使用 `pg_partition_tree()` 函数可以找到叶分区的名称。

```sql
SELECT * FROM pg_partition_tree( 'parent_table' );
```

## 提高统计信息质量

生成统计信息所耗费的时间，和统计信息的质量或准确性之间存在权衡关系，你需要找到一个平衡。

为了在合理的时间内分析大表，`ANALYZE` 会对表内容进行随机抽样，而不是检查每一行。若想增加一张表上所有列的样本值数量，可以调整 `default_statistics_target` 配置参数。该参数的目标值范围是 `1` 到 `10000`，默认目标值为 `100`。

默认情况下，`default_statistics_target` 参数应用于所有列，并指定多少数量的值存储在常见值列表中。较大的目标值可能会提高查询计划器的估计质量，尤其是对于具有不规则数据模式的列。

你可以使用 `SET default_statistics_target` 语句在会话级别设置 `default_statistics_target`。要设置此参数的默认值，需要在 `postgresql.conf` 配置文件中设置并重新加载文件。

## 何时执行 `ANALYZE`

在以下情况执行 `ANALYZE`：

- 加载数据之后
- 执行 `CREATE INDEX` 操作之后
- 执行 `INSERT`、`UPDATE` 和 `DELETE` 操作之后，因为这些操作大大改变了底层数据

`ANALYZE` 只需要对表进行读取锁定，因此可以与其他数据库操作并行执行。但出于性能原因，不建议在执行加载、`INSERT`、`UPDATE`、`DELETE` 和 `CREATE INDEX` 操作时执行 `ANALYZE`。

:::info 提示
Apache Cloudberry 优化了分区表执行 `ANALYZE` 时的行为。当对某个叶分区（例如 `ANALYZE sales_1_prt_p2023`）显式执行统计信息收集时，系统不会再自动更新根表或其他分区的统计信息。只有显式对根表（例如 `ANALYZE sales`）执行 `ANALYZE` 时，才会更新整张表的统计信息，包括所有子分区。

这种行为的改进提高了统计信息管理的控制力，避免了不必要的统计刷新。在实际使用中，推荐根据数据变化情况选择性地分析具体分区或整表。
:::

## 配置自动统计信息收集

配置参数 `gp_autostats_mode` 与 `gp_autostats_on_change_threshold` 一起确定何时触发自动分析操作。当触发自动统计信息收集时，优化器会在查询中加入 `ANALYZE` 步骤。

默认情况下，`gp_autostats_mode` 的值为 `none`。若将此参数设置为 `on_no_stats`，当表的所有者对无统计信息的表执行 `CREATE TABLE AS SELECT`、`INSERT` 或 `COPY` 操作时，将触发对这些操作的统计信息收集。

而将 `gp_autostats_mode` 设置为 `on_change` 时，仅当受影响的行数超过 `gp_autostats_on_change_threshold` 所设定的阈值时，才会进行统计信息收集。这个阈值的默认值是 `2147483647`。在表所有者执行 `CREATE TABLE AS SELECT`、`UPDATE`、`DELETE`、`INSERT` 和 `COPY` 操作时，如果受影响的行数超过了这个阈值，就会触发自动统计信息收集。

另外，若将服务器配置参数 `gp_autostats_allow_nonowner` 设置为 `true`，Apache Cloudberry 将会在以下情况对表进行自动统计信息收集：

- 当 `gp_autostats_mode` 被设置为 `on_no_stats`，并且第一个对表执行 `INSERT` 或 `COPY` 操作的非所有者用户。

将 `gp_autostats_mode` 设置为 `none` 则会停用自动统计信息收集功能。

对于分区表，如果在顶级父表上插入数据，将不会触发自动统计信息收集。但如果在分区表的叶表（实际存储数据的位置）中直接插入数据，则会触发自动统计信息收集。
