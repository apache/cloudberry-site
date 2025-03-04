---
title: pg_auth_members
---

# pg_auth_members

`pg_catalog` 模式中的 `pg_auth_members` 系统目录表记录了角色之间的成员关系。任何非循环的关系都是允许的。由于角色是全系统范围的，`pg_auth_members` 在 Apache Cloudberry 系统的所有数据库中都是共享的。

| 列名         | 类型   | 引用                  | 描述                     |
|--------------|--------|-----------------------|--------------------------|
| `roleid`     | oid    | `pg_authid.oid`       | 父级（组）角色的 ID      |
| `member`     | oid    | `pg_authid.oid`       | 成员角色的 ID            |
| `grantor`    | oid    | `pg_authid.oid`       | 授予此成员关系的角色 ID  |
| `admin_option` | boolean |                       | 如果为真，角色成员可以将成员关系授予他人 |
