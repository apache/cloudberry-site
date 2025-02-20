---
title: gp_version_at_initdb
---

# gp_version_at_initdb

`gp_version_at_initdb` 表位于 `pg_catalog` 模式中，在 Apache Cloudberry 系统的 Coordinator 和每个 Segment 上都有数据填充。它记录了系统首次初始化时使用的 Apache Cloudberry 版本。该表定义在 `pg_global` 表空间中，意味着它在系统的所有数据库中全局共享。

| 列名             | 类型     | 引用 | 描述                   |
|------------------|----------|------|------------------------|
| `schemaversion`  | smallint |      | 数据库模式的版本号。   |
| `productversion` | text     |      | 产品的版本号。         |
