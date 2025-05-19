---
title: pg_tablespace
---

# pg_tablespace

`pg_tablespace` 系统目录表用于存储系统中可用表空间的信息。用户可以将表放置在指定的表空间中，以便更好地管理磁盘布局。与其他大多数系统目录不同，`pg_tablespace` 是在整个 Apache Cloudberry 系统中共享的：整个系统只有一份 `pg_tablespace` 表，而不是每个数据库各有一份。

| 列名        | 类型       | 引用                  | 说明                                                                 |
|-------------|------------|-----------------------|----------------------------------------------------------------------|
| `oid`       | oid        |                       | 对象标识符（Object ID）。                                             |
| `spcname`   | name       |                       | 表空间名称。                                                          |
| `spcowner`  | oid        | pg_authid.oid         | 表空间的所有者，通常为创建该表空间的用户。                             |
| `spcacl`    | ARRAY      |                       | 表空间的访问权限。                                                    |
| `spcoptions`| ARRAY      |                       | 表空间在各个内容节点（contentID）上的位置配置。                        |
