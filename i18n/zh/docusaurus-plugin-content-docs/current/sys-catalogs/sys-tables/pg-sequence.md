---
title: pg_sequence
---

# pg_sequence

系统目录表 `pg_sequence` 包含序列（sequence）对象的相关信息。序列的部分信息（如名称和模式）存储在 [pg_class](./pg-class.md) 系统表中。

| 列名         | 类型       | 引用                  | 说明                     |
|--------------|------------|-----------------------|--------------------------|
| `seqrelid`   | oid        | `pg_class.oid`        | 该序列在 `pg_class` 表中的对象标识符（OID）。 |
| `seqtypid`   | oid        | `pg_type.oid`         | 该序列的数据类型。       |
| `seqstart`   | bigint     |                       | 序列的起始值。           |
| `seqincrement` | bigint   |                       | 序列的步长值。           |
| `seqmax`     | bigint     |                       | 序列的最大值。           |
| `seqmin`     | bigint     |                       | 序列的最小值。           |
| `seqcache`   | bigint     |                       | 序列的缓存大小。         |
| `seqcycle`   | boolean    |                       | 序列是否允许循环。       |
