---
title: pg_resgroup
---

# pg_resgroup

:::note 注意
只有在启用了基于资源组的资源管理时，`pg_resgroup` 系统目录表才有效。
:::

`pg_resgroup` 系统目录表包含 Apache Cloudberry 中资源组的信息。资源组用于管理并发语句、CPU 和内存资源。该表定义在 `pg_global` 表空间中，整个系统的所有数据库共享此表。

| 列名   | 类型 | 引用 | 说明                     |
|--------|------|------|--------------------------|
| `oid`  | oid  |      | 对象标识符（Object ID）。 |
| `rsgname` | name |      | 资源组名称。             |
| `parent` | oid  |      | 未使用，预留供将来使用。 |
