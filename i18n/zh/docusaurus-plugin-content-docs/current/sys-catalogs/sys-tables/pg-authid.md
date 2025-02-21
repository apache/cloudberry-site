---
title: pg_authid
---

# pg_authid

`pg_catalog` 模式中的 `pg_authid` 表记录了数据库授权标识符（角色）的信息。角色融合了用户和组的概念。用户是启用了 `rolcanlogin` 标志的角色。任何角色（无论是否启用 `rolcanlogin`）都可以包含其他角色作为成员。更多详情请查看 [`pg_auth_members`](/i18n/zh/docusaurus-plugin-content-docs/current/sys-catalogs/sys-tables/pg-auth-members.md)。

因为这张目录表包含了密码，所以不能公开读取。`pg_roles` 是 `pg_authid` 的一个公开可读视图，它会隐藏密码字段。

由于用户身份是在整个系统范围内定义的，`pg_authid` 在 Apache Cloudberry 系统的所有数据库中都是共享的：每个系统只有一份 `pg_authid` 的副本，而不是每个数据库一份。

| 列名              | 类型       | 引用                  | 描述                     |
|-------------------|------------|-----------------------|--------------------------|
| `oid`             | oid        |                       | 行标识符                 |
| `rolname`         | name       |                       | 角色名称                 |
| `rolsuper`        | boolean    |                       | 角色是否拥有超级用户权限 |
| `rolinherit`      | boolean    |                       | 角色是否会自动继承其所属角色的权限 |
| `rolcreaterole`   | boolean    |                       | 角色是否可以创建更多角色 |
| `rolcreatedb`     | boolean    |                       | 角色是否可以创建数据库   |
| `rolcanlogin`     | boolean    |                       | 角色是否可以登录，即此角色是否可以作为初始会话授权标识符 |
| `rolreplication`  | boolean    |                       | 角色是否是复制角色，即此角色是否可以启动流复制，并使用 `pg_start_backup` 和 `pg_stop_backup` 设置或取消系统备份模式 |
| `rolbypassrls`    | boolean    |                       | 角色是否绕过所有行级安全策略 |
| `rolconnlimit`    | int4       |                       | 对于可以登录的角色，此值设置该角色可以同时建立的最大连接数。`-1` 表示无限制 |
| `rolenableprofile`| boolean    |                       | 角色是否拥有配置文件     |
| `rolpassword`     | text       |                       | 密码（可能是加密的）；如果没有密码则为 NULL。如果密码是加密的，该列将以字符串 `md5` 开头，后面跟着一个 32 位的十六进制 MD5 哈希值。该 MD5 哈希值是用户的密码与用户名拼接后的哈希值。例如，如果用户 `joe` 的密码是 `xyzzy`，Apache Cloudberry 将存储 `xyzzyjoe` 的 MD5 哈希值。Apache Cloudberry 假设不符合该格式的密码是未加密的 |
| `rolvaliduntil`   | timestamptz |                       | 密码过期时间（仅用于密码认证）；如果没有过期时间则为 NULL |
| `rolprofile`      | oid        |                       | 关联的配置文件 ID 在 `pg_profile` 中的对象 ID |
| `rolaccountstatus`| smallint   |                       | 角色的账户状态           |
| `rolfailedlogins` | integer    |                       | 登录失败的次数           |
| `rolpasswordsetat`| timestamptz |                       | 密码最后设置的时间       |
| `rollockdate`     | timestamptz |                       | 角色锁定的时间           |
| `rolpasswordexpire`| timestamptz |                       | 密码过期的时间           |
| `rolresqueue`     | oid        |                       | 关联的资源队列 ID 在 `pg_resqueue` 中的对象 ID |
| `rolcreaterextgpfd`| boolean    |                       | 是否有使用 `gpfdist` 或 `gpfdists` 协议创建读取外部表的权限 |
| `rolcreaterexhttp`| boolean    |                       | 是否有使用 `http` 协议创建读取外部表的权限 |
| `rolcreatewextgpfd`| boolean    |                       | 是否有使用 `gpfdist` 或 `gpfdists` 协议创建写入外部表的权限 |
| `rolresgroup`     | oid        |                       | 关联的资源组 ID 在 `pg_resgroup` 中的对象 ID |
