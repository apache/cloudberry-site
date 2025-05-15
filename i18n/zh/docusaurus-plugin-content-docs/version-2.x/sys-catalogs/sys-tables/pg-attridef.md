---
title: pg_attrdef
---

# pg_attrdef

`pg_catalog` 模式中的 `pg_attrdef` 表用于存储列的默认值。关于列的主要信息存储在 `pg_attribute` 表中。只有在创建表或添加列时明确指定了默认值的列，才会在此表中有记录。

| 列名   | 类型          | 引用                  | 描述                     |
|--------|---------------|-----------------------|--------------------------|
| `oid`  | oid           |                       | 对象 ID                  |
| `adrelid` | oid         | `pg_class.oid`        | 该列所属的表             |
| `adnum`| smallint      | `pg_attribute.attnum` | 列的编号                 |
| `adbin`| pg_node_tree  |                       | 列默认值的内部表示       |
