---
title: pg_description
---

# pg_description

`pg_description` 系统目录表用于存储数据库对象的可选描述信息（即注释）。可以通过 `COMMENT` 命令添加、修改或删除描述信息，也可以使用 `psql` 工具的 `\d` 元命令查看这些描述。许多内置系统对象的描述在数据库初始化时已经预填充到 `pg_description` 表中。关于存储跨整个 Cloudberry 系统共享对象描述信息的表，请参见 [pg_shdescription](./pg-shdescription.md)。

| 列名          | 类型       | 引用                  | 说明                                                                 |
|---------------|------------|-----------------------|----------------------------------------------------------------------|
| `objoid`      | oid        | 任意 OID 类型列       | 该描述所对应对象的 OID。                                             |
| `classoid`    | oid        | pg_class.oid          | 该对象所在系统目录表的 OID。                                         |
| `objsubid`    | integer    |                       | 如果是对表列的注释，则为列号；对于其他对象类型，该字段为 0。           |
| `description` | text       |                       | 该对象的描述内容，可以是任意文本。                                   |
