---
title: 查询性能概述
---

# 查询性能概述

Apache Cloudberry 能动态地清除无关分区以减少内存分配，以此来优化查询性能。这些机制可以显著减少查询扫描的数据量，加快查询执行速度，并提升系统的并发处理能力。

:::tip 提示
Apache Cloudberry 默认启用 GPORCA 优化器，扩展了原生 Postgres 优化器的查询规划与优化能力。
:::

## 动态分区消除

在 Apache Cloudberry 中，系统利用仅在执行查询时才能确定的值来动态地对分区进行裁剪，从而提高查询处理速度。该功能称为动态分区消除（Dynamic Partition Elimination，简称 DPE）。

DPE 适用于以下类型的连接操作：

- `Hash Inner Join`
- `Hash Left Join`
- `Hash Right Join`（自 v2.0.0 起支持）

启用 DPE 需满足以下条件：

- 分区表必须作为 Join 的连接外表。
- Join 条件必须是基于分区键的等值条件。
- 必须对分区表收集统计信息，例如：

    ```sql
    ANALYZE <root partition>;
    ```

参数 `gp_dynamic_partition_pruning` 用于控制是否启用 DPE，默认值为 `ON`。该参数仅对 Postgres 优化器有效。你可以通过 `EXPLAIN` 查看执行计划中是否包含 `Partition Selector` 节点，以判断 DPE 是否实际生效。

## 内存优化

Apache Cloudberry 会根据查询中各个运算符的特点动态分配内存，并在查询不同阶段主动释放或重新分配内存资源，从而实现更高效的资源使用和查询执行。
