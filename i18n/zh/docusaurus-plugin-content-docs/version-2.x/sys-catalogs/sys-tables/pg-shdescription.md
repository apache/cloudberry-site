---
title: pg_shdescription
---

# pg_shdescription

`pg_shdescription` 系统目录表用于存储共享数据库对象的可选描述信息（注释）。可以通过 `COMMENT` 命令添加或修改这些描述，并使用 `psql` 的 `\d` 元命令查看。关于记录单个数据库内对象描述信息的表，请参见 [pg_description](./pg-description.md)。

与大多数系统目录不同，`pg_shdescription` 是在整个 Cloudberry 系统中共享的：整个系统仅有一份 `pg_shdescription` 表，而不是每个数据库各有一份。

| 列名          | 类型       | 引用                          | 说明                                                                 |
|---------------|------------|-------------------------------|----------------------------------------------------------------------|
| `objoid`      | oid        | 任意 OID 类型列               | 该描述所对应对象的 OID。                                             |
| `classoid`    | oid        | pg_class.oid                  | 该对象所在系统目录表的 OID。                                         |
| `description` | text       |                               | 对象的描述内容，可以是任意文本。                                     |
