---
title: 查询处理概览
---

# 查询处理概览

本节概述 Apache Cloudberry 的查询处理流程。理解这一流程有助于编写和优化查询。

用户像使用其他数据库管理系统一样向 Apache Cloudberry 发起查询。他们通过如 `psql` 这样的客户端程序连接到 Apache Cloudberry 的协调器节点，并提交 SQL 语句。

## 查询规划与调度

协调器负责接收、解析并优化查询。生成的查询计划可以是并行执行的，也可以是定向执行的。协调器将并行查询计划下发到所有 segment 节点。

如果是定向查询计划，协调器则只下发到某一个 segment 节点。每个 segment 只处理属于自己那一部分数据的本地数据库操作。大多数数据库操作——如表扫描、连接、聚合和排序——都会在所有 segment 上并行执行。每个操作都在本地独立完成，不依赖其他 segment 上的数据。

某些查询只访问单个 segment 上的数据，比如单行的 `INSERT`、`UPDATE`、`DELETE` 或 `SELECT`，或是针对表的分布键进行筛选的查询。这类查询不会下发到所有 segment，只会定向发送到包含相关行的那个 segment。

## Apache Cloudberry 查询计划

查询计划是 Apache Cloudberry 为获取查询结果所执行操作的集合。计划中的每个`节点`或步骤代表一个数据库操作，比如表扫描、连接、聚合或排序。计划的执行顺序是自下而上。

除了常见的数据库操作，Apache Cloudberry 还包含一种特殊操作：`motion`。motion 表示在查询执行过程中，segment 之间的数据移动。并非所有查询都需要 motion，比如定向查询就不需要在节点之间传输数据。

为了实现查询运行时的最大并行度，Apache Cloudberry 会将查询计划划分为多个 `slice`。slice 是计划中的一部分，允许各 segment 独立并行执行。每当查询计划中出现 motion 操作，系统就会在 motion 的两侧划分出不同的 slice。

例如，考虑以下这条包含两表连接的简单查询：

```sql
SELECT customer, amount
FROM sales JOIN customer USING (cust_id)
WHERE dateCol = '04-30-2016';
```

下图展示了该查询的执行计划。每个 segment 都会收到该查询计划的副本并并行执行。

该查询计划包含一个 `redistribute motion`，该操作将元组在各个 segment 之间重新分布，以完成连接操作。之所以需要重新分布，是因为 `customer` 表按 `cust_id` 分布在各个 segment 上，而 `sales` 表按 `sale_id` 分布。要完成连接，必须将 `sales` 表的数据按 `cust_id` 重新分布。执行计划在 redistribute motion 的两侧被划分为 *slice 1* 和 *slice 2*。

此外，该查询计划还包含一个 `gather motion`，即将 segment 的查询结果返回给协调器以供客户端展示。由于每个 motion 操作都会触发一次划分，该计划的最上层还隐含了一个 `slice 3`。并非所有查询计划都有 gather motion，例如 `CREATE TABLE x AS SELECT...` 就没有 gather motion，因为查询结果是写入新表而不是返回给协调器。

## 并行查询执行

Apache Cloudberry 会启动多个数据库进程来完成查询的执行工作。在协调器节点上，负责查询处理的工作进程称为 *查询调度器*（QD）。QD 负责生成并下发查询计划，同时收集并输出最终查询结果。在 segment 节点上，查询的工作进程称为 *查询执行器*（QE）。QE 负责完成自己所分配的查询任务，并将中间结果传递给其他工作进程。

查询计划中的每个 *slice* 至少会分配一个工作进程。每个工作进程会独立处理其对应的那一部分查询计划。在查询执行期间，每个 segment 节点上会并行运行多个进程来协同处理查询任务。

在不同 segment 上执行同一个 slice 的一组进程被称为一个 *gang*。当某一部分任务完成后，数据行会从一个 gang 向上流动到下一个 gang，依次传递整个查询计划。这种 segment 之间的进程通信称为 Apache Cloudberry 的 *interconnect* 组件。
