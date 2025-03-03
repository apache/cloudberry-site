---
title: pg_amop
---

# pg_amop

`pg_catalog` 模式中的 `pg_amop` 表用于存储与索引访问方法操作类相关操作符的信息。表中每一行都对应一个操作类中的成员操作符。

表中的 `amopmethod` 字段必须与所属操作符家族的 `opfmethod` 字段匹配（包含 `amopmethod` 是为了性能优化而有意保留的冗余设计）。此外，`amoplefttype` 和 `amoprighttype` 字段必须与引用的 `pg_operator` 条目中的 `oprleft` 和 `oprright` 字段一致。

| 列名          | 类型   | 引用                  | 描述                     |
|---------------|--------|-----------------------|--------------------------|
| `oid`         | oid    |                       | 行标识符（隐藏属性，需显式选择） |
| `amopfamily`  | oid    | `pg_opfamily.oid`     | 所属操作符家族           |
| `amoplefttype`| oid    | `pg_type.oid`         | 操作符的左输入数据类型   |
| `amoprighttype`| oid   | `pg_type.oid`         | 操作符的右输入数据类型   |
| `amopstrategy`| smallint |                       | 操作符策略编号           |
| `amoppurpose` | char   |                       | 操作符用途，`s` 表示搜索，`o` 表示排序 |
| `amopopr`     | oid    | `pg_operator.oid`     | 操作符的 OID             |
| `amopmethod`  | oid    | `pg_am.oid`           | 操作符家族的索引访问方法 |
| `amopsortfamily`| oid   | `pg_opfamily.oid`     | 若为排序操作符，则为对应的 B 树操作符家族；若为搜索操作符，则为零 |
