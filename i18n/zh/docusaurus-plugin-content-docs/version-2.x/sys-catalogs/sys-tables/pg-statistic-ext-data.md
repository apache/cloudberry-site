---
title: pg_statistic_ext_data
---

# pg_statistic_ext_data

`pg_statistic_ext_data` 系统目录表用于存储通过 `CREATE STATISTICS` 创建的扩展优化器统计信息，这些统计信息对应于 [pg_statistic_ext](./pg-statistic-ext.md) 中定义的统计对象。该表中的每一行对应一个统计对象。

与 `pg_statistic` 类似，`pg_statistic_ext_data` 不应对公众开放，因为其中的内容可能包含敏感信息（例如：列中最常见的值组合可能具有业务意义）。`pg_stats_ext` 是一个基于 `pg_statistic_ext_data` 的公开视图（连接 `pg_statistic_ext` 后），仅显示当前用户可访问的表和列的相关统计信息。

| 列名             | 类型               | 引用                                      | 说明                                                                 |
|------------------|--------------------|-------------------------------------------|----------------------------------------------------------------------|
| `stxoid`         | oid                | [pg_statistic_ext](./pg-statistic-ext.md).oid | 包含本条数据定义的扩展统计对象的 OID。                                |
| `stxdndistinct`  | pg_ndistinct       |                                            | N-distinct（不重复值估计）统计信息，使用 `pg_ndistinct` 类型序列化存储。 |
| `stxddependencies` | pg_dependencies   |                                            | 函数依赖统计信息，使用 `pg_dependencies` 类型序列化存储。             |
| `stxdmcv`        | pg_mcv_list        |                                            | 最常见值（MCV）列表统计信息，使用 `pg_mcv_list` 类型序列化存储。       |
| `stxdexpr`       | ARRAY              |                                            | 存储扩展统计对象中表达式的统计信息。数组中的每个元素都包含一个表达式的统计数据，格式类似 `pg_statistic` 中的列统计信息（如空值比例、MCV、直方图等），通常为内部序列化格式。 |
