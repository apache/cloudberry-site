---
title: gp_fastsequence
---

# gp_fastsequence

`gp_fastsequence` 表位于 `pg_catalog` 模式中，用于存储与追加优化表（append-optimized 表，或 AO 表）和列式表相关的信息。`last_sequence` 值表示该表当前使用的最大行号。

| 列名           | 类型   | 引用                  | 描述                                                                 |
|----------------|--------|-----------------------|----------------------------------------------------------------------|
| `objid`       | oid    | `pg_class.oid`        | 用于追踪追加优化文件 segment 的 `pg_aoseg.pg_aocsseg_*` 表的对象 ID。       |
| `objmod`      | bigint |                       | 对象修饰符。                                                         |
| `last_sequence`| bigint |                       | 该对象最后使用的序列号。                                             |
