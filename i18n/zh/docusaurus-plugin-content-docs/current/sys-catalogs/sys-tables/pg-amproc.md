---
title: pg_amproc
---

# pg_amproc

`pg_catalog` 模式中的 `pg_amproc` 表记录了与索引访问方法操作类相关支持过程的信息。表中的每一行代表一个属于操作类的支持过程。

| 列名          | 类型   | 引用                  | 描述                     |
|---------------|--------|-----------------------|--------------------------|
| `oid`         | oid    |                       | 行标识符（隐藏属性，需显式选择） |
| `amprocfamily`| oid    | `pg_opfamily.oid`     | 所属操作符家族           |
| `amproclefttype`| oid   | `pg_type.oid`         | 相关操作符的左输入数据类型 |
| `amprocrighttype`| oid   | `pg_type.oid`         | 相关操作符的右输入数据类型 |
| `amprocnum`   | smallint |                      | 支持过程编号             |
| `amproc`      | regproc| `pg_proc.oid`         | 支持过程的 OID           |
