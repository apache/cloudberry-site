---
title: pg_class
---

# pg_class

系统目录表 `pg_class` 用于记录表以及几乎所有具有列或类似表结构的对象，包括索引（详情请参阅 `pg_index`）、序列、视图、物化视图、复合类型和 TOAST 表。在下文中，我们将这些对象统称为“关系”。需要注意的是，并非所有列对所有关系类型都有实际意义。

| 列名              | 类型       | 引用                  | 描述                     |
|-------------------|------------|-----------------------|--------------------------|
| `oid`             | oid        |                       | 行标识符                 |
| `relname`         | name       |                       | 表、索引或视图的名称     |
| `relnamespace`    | oid        | `pg_namespace.oid`    | 包含此关系的命名空间（模式）的对象标识符 |
| `reltype`         | oid        | `pg_type.oid`         | 对应此表行类型的对象标识符（索引为零，因为索引没有 `pg_type` 条目） |
| `reloftype`       | oid        | `pg_type.oid`         | 对于类型化表，底层复合类型的对象标识符；其他关系为零 |
| `relowner`        | oid        | `pg_authid.oid`       | 关系的所有者             |
| `relam`           | oid        | `pg_am.oid`           | 如果这是表或索引，使用的访问方法（堆、B 树、哈希等） |
| `relfilenode`     | bigint     |                       | 此关系的磁盘文件名；零表示这是一个“映射”关系，其磁盘文件名由低级状态决定 |
| `reltablespace`   | oid        | `pg_tablespace.oid`   | 存储此关系的表空间。如果为零，则表示使用数据库的默认表空间。（如果关系没有磁盘文件，则此列无意义） |
| `relpages`        | int4       |                       | 此表的磁盘表示大小（以 `BLCKSZ` 大小的页为单位）。这是仅用于规划器的估算值。它由 `VACUUM`、`ANALYZE` 以及一些 DDL 命令（如 `CREATE INDEX`）更新 |
| `reltuples`       | real       |                       | 表中的行数。这是仅用于规划器的估算值。它由 `VACUUM`、`ANALYZE` 以及一些 DDL 命令（如 `CREATE INDEX`）更新 |
| `relallvisible`   | int4       |                       | 表的可见性映射中标记为全可见的页数。这是仅用于规划器的估算值。它由 `VACUUM`、`ANALYZE` 以及一些 DDL 命令（如 `CREATE INDEX`）更新 |
| `reltoastrelid`   | oid        | `pg_class.oid`        | 与该表关联的 TOAST 表的对象标识符，如果没有则为 `0`。TOAST 表将大属性“离线”存储在辅助表中 |
| `relhasindex`     | boolean    |                       | 如果这是表且有（或曾有）索引，则为 `true` |
| `relisshared`     | boolean    |                       | 如果该表在系统的所有数据库中共享，则为 `true`。只有某些系统目录表（如 `pg_database`）是共享的 |
| `relpersistence`  | char       |                       | 对象持久化类型：<br/>`p` = 永久表（堆或追加优化）<br/>`u` = 未记录的临时表<br/>`t` = 临时表 |
| `relkind`         | char       |                       | 对象类型：<br/>`r` = 普通表（堆或追加优化）<br/>`i` = 索引<br/>`S` = 序列<br/>`t` = TOAST 表<br/>`v` = 视图<br/>`m` = 物化视图<br/>`c` = 复合类型<br/>`f` = 外部表<br/>`p` = 分区表<br/>`I` = 分区索引<br/>`u` = 未编目临时堆表<br/>`o` = 内部追加优化 Segment 文件和 EOF<br/>`b` = 追加仅块目录<br/>`M` = 追加仅可见性映射 |
| `relnatts`        | int2       |                       | 关系中的用户列数（不包括系统列）。必须有这么多对应的条目在 `pg_attribute` 中。请参阅 `pg_attribute.attnum` |
| `relchecks`       | int2       |                       | 表上的 `CHECK` 约束数量；请参阅 `pg_constraint` 目录表 |
| `relhasrules`     | boolean    |                       | 如果表有（或曾有）规则，则为 `true`；请参阅 `pg_rewrite` 目录表 |
| `relhastriggers`  | boolean    |                       | 如果表有（或曾有）触发器，则为 `true` |
| `relhassubclass`  | boolean    |                       | 如果表有（或曾有）继承子表，则为 `true` |
| `relrowsecurity`  | boolean    |                       | 如果表启用了行级安全性，则为 `true`；请参阅 `pg_policy` 目录表 |
| `relforcerowsecurity` | boolean |                       | 如果行级安全性（启用时）也适用于表所有者，则为 `true`；请参阅 `pg_policy` 目录表 |
| `relispopulated`  | boolean    |                       | 如果关系已填充数据，则为 `true`（对于除某些物化视图外的所有关系，此值为 `true`） |
| `relreplident`    | char       |                       | 用于形成行的“副本标识符”的列：<br/>`d` = 默认（如果有主键）<br/>`n` = 无<br/>`f` = 所有列<br/>`i` = 设置了 `indisreplident` 的索引（如果使用的索引已被删除，则与无相同） |
| `relispartition`  | boolean    |                       | 如果表或索引是分区，则为 `true` |
| `relrewrite`      | oid        | `pg_class.oid`        | 在需要重写表的 DDL 操作期间，对于正在写入的新关系，此字段包含原始关系的对象标识符；否则为 0。该状态仅在内部可见；对于用户可见的关系，此字段不应包含除 0 以外的任何值 |
| `relfrozenxid`    | xid        |                       | 该表中所有早于此事务 ID 的事务 ID 均已被替换为永久（冻结）事务 ID。此值用于跟踪表是否需要进行清理以防止事务 ID 回绕，或者是否可以缩小 `pg_xact` 的大小。<br/><br/>如果关系不是表，或者表不需要清理以防止事务 ID 回绕，则值为 `0`（`InvalidTransactionId`）。表可能仍需要清理以回收磁盘空间 |
| `relminmxid`      | xid        |                       | 该表中所有早于此多事务 ID 的多事务 ID 均已被替换为事务 ID。此值用于跟踪表是否需要进行清理以防止多事务 ID 回绕，或者是否可以缩小 `pg_multixact` 的大小。如果关系不是表，则值为零（`InvalidMultiXactId`） |
| `relacl`          | aclitem[]  |                       | 由 `GRANT` 和 `REVOKE` 分配的访问权限 |
| `reloptions`      | text[]     |                       | 访问方法特定的选项，以“关键字=值”字符串形式表示 |
| `relpartbound`    | `pg_node_tree` |                       | 如果表是分区（请参阅 `relispartition`），分区边界的内部表示 |

`pg_class` 中的许多布尔标志是懒惰维护的：如果这是正确的状态，则保证为 `true`，但如果条件不再成立，则可能不会立即重置为 `false`。例如，`relhasindex` 由 `CREATE INDEX` 设置，但从未由 `DROP INDEX` 清除。相反，如果 `VACUUM` 发现表没有索引，则会清除 `relhasindex`。这种安排避免了竞争条件并提高了并发性。
