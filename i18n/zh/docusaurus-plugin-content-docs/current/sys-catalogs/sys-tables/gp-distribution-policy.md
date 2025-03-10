---
title: gp_distribution_policy
---

# gp_distribution_policy

`gp_distribution_policy` 表位于 `pg_catalog` 模式中，记录了 Apache Cloudberry 表的相关信息以及数据在 Segment 节点间的分布策略。该表仅在 Coordinator 节点上更新，且不全局共享，因此每个数据库都会拥有该表的独立副本。

| 列名         | 类型       | 引用                  | 描述                                                                 |
|--------------|------------|-----------------------|----------------------------------------------------------------------|
| `localoid`   | oid        | `pg_class.oid`        | 表的对象标识符 (OID)。                                               |
| `policytype` | char       |                       | 表的分布策略：<br/><br/>`p` - 分区策略。表数据分布在多个 Segment 实例上。<br/><br/>`r` - 复制策略。表数据会在每个 Segment 实例上复制。 |
| `numsegments`| integer    |                       | 表数据分布的 Segment 实例数量。                                      |
| `distkey`    | int2vector | `pg_attribute.attnum` | 分布列的列编号。                                                     |
| `distclass`  | oidvector  | `pg_opclass.oid`      | 分布列的操作符类标识符。                                             |
