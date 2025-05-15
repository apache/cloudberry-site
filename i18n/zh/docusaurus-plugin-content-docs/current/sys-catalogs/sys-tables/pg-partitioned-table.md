---
title: pg_partitioned_table
---

# pg_partitioned_table

`pg_partitioned_table` 系统目录表用于存储表分区方式的相关信息。

| 列名       | 类型         | 引用                          | 说明                                                                 |
|------------|--------------|-------------------------------|----------------------------------------------------------------------|
| `partrelid`| oid          | [pg_class](./pg-class.md).oid | 分区表在 `pg_class` 中的对象标识符。                                 |
| `partstrat`| char         |                               | 分区策略：`h` 表示哈希分区表，`l` 表示列表分区表，`r` 表示范围分区表。 |
| `partnatts`| smallint     |                               | 分区键中的列数。                                                     |
| `partdefid`| oid          | [pg_class](./pg-class.md).oid | 分区表的默认分区在 `pg_class` 中的对象标识符；如果没有默认分区，则为 0。 |
| `partattrs`| int2vector   | [pg_attribute](./pg-attribute.md).attnum | 一个包含 `partnatts` 个值的数组，用于指示哪些表列是分区键的一部分。例如，值为 `1 3` 表示分区键由第 1 列和第 3 列组成。数组中的 0 表示对应的分区键列是表达式而非简单的列引用。 |
| `partclass`| ARRAY        | [pg_opclass](./pg-opclass.md).oid | 每个分区键列对应的操作符类的对象标识符。                              |
| `partcollation`| ARRAY | [pg_opclass](./pg-opclass.md).oid | 每个分区键列对应的排序规则对象标识符；如果该列不是可排序数据类型，则为 0。 |
| `partexprs`| pg_node_tree |                               | 用于表示那些不是简单列引用的分区键列的表达式树（`nodeToString()` 格式）。该列表中每个元素对应 `partattrs` 中的一个 0 项。如果所有分区键列都是简单引用，则该字段为 NULL。Apache Cloudberry 的经典分区语法不支持在分区键中指定表达式。 |
