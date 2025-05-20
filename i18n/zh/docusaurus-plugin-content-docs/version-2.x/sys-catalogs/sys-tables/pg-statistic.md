---
title: pg_statistic
---

# pg_statistic

`pg_statistic` 系统目录表用于存储数据库中表内容的统计信息。这些记录由 `ANALYZE` 命令生成，并被查询优化器用于优化查询性能。请注意，即使统计信息是最新的，它们也仍然是近似值。

通常，对于每个经过分析的表列，会有一条 `stainherit = false` 的记录。如果该表存在继承子表，Apache Cloudberry 会额外生成一条 `stainherit = true` 的记录，表示整个继承树上的统计信息。例如：`SELECT column FROM table*` 返回的数据会使用 `stainherit = true` 的记录；而 `SELECT column FROM ONLY table` 则对应 `stainherit = false` 的记录。

`pg_statistic` 还存储了索引表达式的统计信息。这些表达式被视为“虚拟列”，其中 `starelid` 指向索引对象。普通的非表达式索引列不会额外生成记录，因为其统计信息已由底层表列覆盖。目前，索引表达式的统计记录始终具有 `stainherit = false`。

由于不同类型的数据适合不同形式的统计，`pg_statistic` 的设计避免对其存储的统计信息类型做出过多假设。只有最通用的统计数据（如空值比例）拥有独立字段，其他统计信息都存储在“槽位”中，即一组相关字段，这些字段的含义由某个标识码指定。

`pg_statistic` 不应对所有用户开放，因为即使是统计信息也可能包含敏感数据（例如薪资列的最大/最小值）。系统提供了一个公开可读的视图 `pg_stats`，该视图只会显示当前用户有权限访问的表的统计信息。

:::caution
诸如 `gpsd` 和 `minirepro` 等诊断工具会从 `pg_statistic` 中提取敏感信息（如直方图边界）并以明文形式保存。在传输这些工具生成的输出文件之前，请务必进行审查，确保内容适合在组织外部共享。
:::

| 列名            | 类型       | 引用                          | 说明                                                                 |
|-----------------|------------|-------------------------------|----------------------------------------------------------------------|
| `starelid`      | oid        | [pg_class](./pg-class.md).oid | 该列所属的表或索引的 OID。                                           |
| `staattnum`     | smallint   | [pg_attribute](./pg-attribute.md).attnum | 该列在表中的属性编号。                                               |
| `stainherit`    | boolean    |                               | 若为 true，则统计信息包括继承子表的列数据；否则仅统计当前表的列数据。   |
| `stanullfrac`   | real       |                               | 该列中 NULL 值所占的比例。                                           |
| `stawidth`      | integer    |                               | 非 NULL 值的平均存储宽度（以字节为单位）。                             |
| `stadistinct`   | real       |                               | 列中不同非 NULL 值的数量：<br /> - 若大于 0，表示精确的去重计数；<br /> - 若小于 0，表示为总行数的乘数（如 -0.4 表示唯一值大约是表行数的 40%）；<br /> - 若为 0，表示未知。 |
| `stakindN`      | smallint   |                               | 第 N 个槽位中的统计类型标识码。                                       |
| `staopN`        | oid        | [pg_operator](./pg-operator.md).oid | 用于派生第 N 个槽位统计信息的操作符。例如直方图使用 `<` 运算符来定义排序顺序。 |
| `stacollN`      | oid        | pg_collation.oid              | 用于派生第 N 个槽位统计信息的排序规则。对于可排序数据类型会显示相应排序规则；不可排序类型为 0。 |
| `stanumbersN`   | ARRAY      |                               | 第 N 个槽位中的数值型统计数据。若该槽位类型不涉及数值信息，则为 NULL。   |
| `stavaluesN`    | anyarray   |                               | 第 N 个槽位中的数据值。若该槽位类型不存储数据值，则为 NULL。数组元素的类型与列的数据类型一致，或为其相关类型（如数组的元素类型）。因此该列的数据类型只能定义为 `anyarray`。 |
