---
title: Heap 存储和 AO 存储模型
---

# Heap 存储和 AO 存储模型

Apache Cloudberry 支持 Heap 存储和 Appended-Optimized (AO) 存储两种模型。选择存储模型需要根据数据类型和查询类型来决定。本文档介绍这两种存储模型，并提供选择最优模型的参考建议。

## Heap 存储

Apache Cloudberry 默认使用与 PostgreSQL 相同的 Heap 存储模型。Heap 表适用于 OLTP 类型的工作负载，这类工作负载通常在数据加载后会频繁修改。`UPDATE` 和 `DELETE` 操作需要存储行级版本信息，以确保数据库事务处理的可靠性。Heap 表更适合较小的表，例如加载后经常更新的维度表。

## AO 存储

AO 表适用于数据仓库环境中的非规范化事实表。这些事实表通常是系统中最大的表，通常以批量方式加载，并通过只读查询访问。将大型事实表迁移到 AO 存储模型可以减少行级更新可见性信息的存储开销，从而实现更高效、更易优化的页面结构。AO 表的存储模型针对批量数据加载进行了优化，不建议使用单行 `INSERT` 语句。

## 创建具有指定存储选项的表

行存储的 Heap 表是默认存储类型。

```sql
CREATE TABLE foo (a int, b text) DISTRIBUTED BY (a);
```

使用 `CREATE TABLE` 命令的 `WITH` 子句指定表的存储选项。默认情况下，表会被创建为行存储 Heap 表。例如，要创建一个未启用压缩的 AO 表：

```sql
CREATE TABLE bar (a int, b text) 
    WITH (appendoptimized=true)
    DISTRIBUTED BY (a);
```

:::note 注意
使用 `appendoptimized=value` 语法指定 AO 表的存储类型。`appendoptimized` 是 `appendonly` 旧存储选项的简化别名。Apache Cloudberry 会在目录中存储为 `appendonly`，并在列出 AO 表存储选项时显示相同信息。
:::

在可重复读或可串行化事务中，`UPDATE` 和 `DELETE` 操作不支持 AO 表，否则会导致事务中断。

## 选择行存储或列存储

Apache Cloudberry 支持行存储、列存储或两者结合的存储模型。本节提供选择表存储方向的一般指导原则。建议根据实际数据和查询工作负载进行性能评估。

- **行存储：** 适合具有大量迭代事务的 OLTP 工作负载，尤其是在需要同时访问单行的多列时，检索效率更高。
- **列存储：** 适合数据仓库工作负载，尤其是对少量列进行聚合计算，或仅更新单列而无需修改其他列时。

对于大多数通用或混合工作负载，行存储在灵活性和性能之间提供了最佳平衡。然而，在某些场景下，列存储模型能实现更高效的 I/O 和存储性能。选择表存储方向时，请考虑以下因素：

- **表数据的更新：** 如果表数据需要频繁加载和更新，建议选择行存储的 Heap 表。列存储仅支持 AO 表。

- **频繁插入：** 如果表中需要频繁插入行数据，推荐选择行存储模型。列存储表不适合写操作，因为一行的列值会写入磁盘上的不同位置。

- **查询中请求的列数：** 如果查询的 `SELECT` 列表或 `WHERE` 子句中通常包含所有或大部分列，建议选择行存储模型。列存储更适合聚合单列数据的查询，例如：

    ```sql
    SELECT SUM(salary) ...
    ```

    ```sql
    SELECT AVG(salary) ... WHERE salary > 10000
    ```

    或者 `WHERE` 子句针对单列并返回较少行的查询，例如：

    ```sql
    SELECT salary, dept ... WHERE state='CA'
    ```

- **表的列数：** 如果表包含大量列且需要同时访问，或者表行大小较小时，行存储效率更高。对于列数多且查询只访问少量列的情况，列存储性能更佳。

- **压缩：** 列存储中的数据类型一致，因此支持更高效的存储优化。例如，许多压缩算法利用相邻数据的相似性进行压缩。然而，压缩率越高，随机访问的难度也会增加，因为读取数据时需要解压缩。

### 创建列存储表

使用 `CREATE TABLE` 命令的 `WITH` 子句指定表的存储选项。默认情况下，表为行存储 Heap 表。使用列存储的表必须为 AO 表。例如，要创建列存储表：

```sql
CREATE TABLE bar (a int, b text) 
    WITH (appendoptimized=true, orientation=column) 
    DISTRIBUTED BY (a);
```
