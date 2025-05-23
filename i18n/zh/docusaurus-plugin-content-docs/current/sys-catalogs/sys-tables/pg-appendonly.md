---
title: pg_appendonly
---

# pg_appendonly

`pg_catalog` 模式中的 `pg_appendonly` 表记录了追加优化表 (Append-Optimized) 的存储选项及其他特性信息。

| 列名          | 类型       | 引用 | 描述 |
|---------------|------------|------|------|
| `relid`       | oid        |      | 表的对象标识符（OID）。 |
| `blocksize`   | integer    |      | 追加优化表压缩所用的块大小。有效范围为 8K - 2M，默认值为 `32K`。 |
| `compresslevel` | smallint  |      | 压缩级别，压缩比从 1 增加到 19。若指定 `quicklz1` 为压缩类型，有效值为 1 或 3；指定 `zlib` 时，有效值为 1-9；指定 `zstd` 时，有效值为 1-19。 |
| `checksum`    | boolean    |      | 用于校验数据块在压缩和扫描时的状态，以确保数据完整性。 |
| `compresstype` | name      |      | 追加优化表所用的压缩类型。有效值包括：<br /> - `none`（无压缩）<br /> - `rle_type`（游程编码压缩）<br /> - `zlib`（gzip 压缩）<br /> - `zstd`（Zstandard 压缩）<br /> - `quicklz` |
| `columnstore` | boolean    |      | `1` 表示列存储，`0` 表示行存储。 |
| `segrelid`    | oid        |      | 表的磁盘 Segment 文件 ID。 |
| `segfilecount`| smallint   |      |  Segment 文件数量。 |
| `version`     | smallint   |      | 追加优化表的版本号。 |
| `blkdirrelid` | oid        |      | 用于磁盘列存储表文件的块。 |
| `blkdiridxid` | oid        |      | 用于磁盘列存储索引文件的块。 |
| `visimaprelid`| oid        |      | 表的可见性映射。 |
| `visimapidxid`| oid        |      | 可见性映射的 B 树索引。 |
