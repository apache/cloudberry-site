---
title: pg_attribute_encoding
---

# pg_attribute_encoding

`pg_catalog` 模式下的 `pg_attribute_encoding` 系统目录表记录了列存储的相关信息。

| 列名          | 类型       | 修饰符   | 存储方式 | 描述                     |
|---------------|------------|----------|----------|--------------------------|
| `attrelid`    | oid        | not null | plain    | 外键，关联至 `pg_attribute.attrelid` |
| `attnum`      | smallint   | not null | plain    | 外键，关联至 `pg_attribute.attnum`   |
| `filenum`     | smallint   | not null | plain    | 列的文件编号             |
| `attoptions`  | text[]     |          | extended | 列的存储选项             |

当列的 `filenum` 值为 `f` 时，磁盘上的列文件会使用 `(f - 1)*128` 到 `f*128 - 1` 的后缀。例如：

- 若 `filenum = 1`，则文件名为 `relfilenode`、`relfilenode.1` ... `relfilenode.127`。
- 若 `filenum = 2`，则文件名为 `relfilenode.128`、`relfilenode.129` ... `relfilenode.255`。
- 若 `filenum = 3`，则文件名为 `relfilenode.256`、`relfilenode.257` ... `relfilenode.383`。
