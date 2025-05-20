---
title: pg_statistic_ext
---

# pg_statistic_ext

`pg_statistic_ext` 系统目录表用于存储扩展优化器统计信息的定义。该表中的每一行对应一个通过 `CREATE STATISTICS` 创建的统计对象。

| 列名          | 类型       | 引用                          | 说明                                                                 |
|---------------|------------|-------------------------------|----------------------------------------------------------------------|
| `oid`         | oid        |                               | 对象标识符（Object ID）。                                             |
| `stxrelid`    | oid        | [pg_class](./pg-class.md).oid | 包含该统计对象所描述列的表的 OID。                                     |
| `stxname`     | name       |                               | 统计对象的名称。                                                      |
| `stxnamespace`| oid        | [pg_namespace](./pg-namespace.md).oid | 包含该统计对象的命名空间的 OID。                                      |
| `stxowner`    | oid        | [pg_authid](./pg-authid.md).oid | 该统计对象的所有者。                                                 |
| `stxstattarget` | integer   |                               | 扩展统计对象的统计目标值。用于控制 `ANALYZE` 收集统计信息的详细程度。若为 `-1`，则表示使用所引用列的统计目标或系统默认统计目标。 |
| `stxkeys`     | ARRAY      | [pg_attribute](./pg-attribute.md).oid | 列号数组，表示该统计对象覆盖了哪些表列。例如：值为 `1 3` 表示统计对象覆盖了第 1 列和第 3 列。 |
| `stxkind`     | ARRAY      |                               | 启用的统计类型编码数组。有效值包括：`d` 表示 n-distinct 统计，`f` 表示函数依赖统计，`m` 表示最常见值（MCV）列表统计。 |
| `stxexprs`    | pg_node_tree |                               | 若该统计对象定义在表达式上，则此字段存储这些表达式的解析树；若统计对象仅基于普通列（通过 `stxkeys` 指定），则此字段为 `NULL`。 |

`pg_statistic_ext` 表中的记录会在执行 `CREATE STATISTICS` 时完整创建，但不会立即计算具体的统计值。后续执行 `ANALYZE` 命令时才会计算实际的统计数据，并将其写入 [pg_statistic_ext_data](./pg-statistic-ext-data.md) 系统目录表中。
