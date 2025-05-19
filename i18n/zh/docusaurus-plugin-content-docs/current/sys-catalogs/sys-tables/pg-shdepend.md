---
title: pg_shdepend
---

# pg_shdepend

`pg_shdepend` 系统目录表用于记录数据库对象与共享对象（如角色）之间的依赖关系。这些信息确保 Apache Cloudberry 在删除对象之前，能够确认该对象未被其他对象引用。关于记录单个数据库内部依赖关系的表，请参见 [pg_depend](./pg-depend.md)。

与大多数系统目录不同，`pg_shdepend` 是在整个 Cloudberry 系统中共享的：整个系统只有一份 `pg_shdepend` 表，而不是每个数据库各有一份。

在所有情况下，`pg_shdepend` 中的一条记录都表示：在不删除依赖对象的前提下，不能删除被引用对象。具体的依赖语义由 `deptype` 字段指定，包括以下几种类型：

- **SHARED_DEPENDENCY_OWNER (o)** — 被引用对象（必须是一个角色）是依赖对象的所有者。
- **SHARED_DEPENDENCY_ACL (a)** — 被引用对象（必须是一个角色）出现在依赖对象的访问控制列表（ACL）中。
- **SHARED_DEPENDENCY_PIN (p)** — 不存在具体的依赖对象；该类型的记录表示系统本身依赖于被引用对象，因此该对象永远不能被删除。此类记录仅在系统初始化时创建，依赖对象相关的字段值全部为零。

| 列名          | 类型       | 引用                          | 说明                                                                 |
|---------------|------------|-------------------------------|----------------------------------------------------------------------|
| `dbid`        | oid        | pg_database.oid               | 依赖对象所在数据库的 OID，如果是共享对象则为 0。                      |
| `classid`     | oid        | pg_class.oid                  | 依赖对象所在系统目录表的 OID。                                        |
| `objid`       | oid        | 任意 OID 类型列               | 具体依赖对象的 OID。                                                 |
| `objsubid`    | integer    |                               | 如果依赖对象为表列，则为列号；其他对象类型该字段为 0。                |
| `refclassid`  | oid        | pg_class.oid                  | 被引用对象所在的系统目录表的 OID（必须是共享目录）。                  |
| `refobjid`    | oid        | 任意 OID 类型列               | 具体被引用对象的 OID。                                               |
| `deptype`     | char       |                               | 表示该依赖关系语义的类型编码。                                       |
