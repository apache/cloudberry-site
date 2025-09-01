---
title: pg_attribute
---

# pg_attribute

`pg_catalog` 模式里的 `pg_attribute` 表，是用来存表里列的信息的。数据库里每个表的每一列，在这个表里都有一行对应。（不只是表，索引和在 `pg_class` 里有记录的对象，也都会有对应的属性记录。）在这里，“属性”和“列”是一个意思。

如果某列被删除了，它在 `pg_attribute` 里的记录，`atttypid` 会被改成零，但 `attlen` 和其他从 `pg_type` 拷贝过来的字段还是有效的。这是为了应对一种情况：如果被删除列的数据类型后来也被删了，那 `pg_type` 里就找不到对应的记录了。这种时候，`attlen` 和其他字段就能用来解释表里一行的内容。

| 列名          | 类型       | 引用                  | 描述                     |
|---------------|------------|-----------------------|--------------------------|
| `attrelid`    | oid        | `pg_class.oid`        | 这列属于哪个表。         |
| `attname`     | name       |                       | 列的名字。               |
| `atttypid`    | oid        | `pg_type.oid`         | 这列的数据类型。         |
| `attstattarget` | integer   |                       | 控制 `ANALYZE` 为这列收集统计信息的详细程度。值为零表示不收集统计信息。负值表示使用系统的默认统计目标。正数值的具体含义取决于数据类型。对于标量数据类型，它既是“最常见值”的目标数量，也是直方图桶的目标数量。 |
| `attlen`      | smallint   |                       | 这列数据类型的 `pg_type.typlen` 的副本。 |
| `attnum`      | smallint   |                       | 列的编号。普通列从 1 开始编号。系统列（比如 `ctid`）则用（任意的）负数编号。 |
| `attndims`    | integer    |                       | 如果这列是数组类型，就表示维度数量；否则是 0。（目前，数组的维度数量没有强制要求，所以任何非零值都表示它是数组。） |
| `attcacheoff` | integer    |                       | 在存储时总是 `-1`，但在把这列加载到内存里的行描述符时，可能会更新为缓存这属性在行内的偏移量。 |
| `atttypmod`   | integer    |                       | 记录在表创建时提供的类型特定数据（比如，`varchar` 列的最大长度）。它会传递给类型特定的输入函数和长度强制函数。对于不需要它的类型，值通常是 `-1`。 |
| `attbyval`    | boolean    |                       | 这列数据类型的 `pg_type.typbyval` 的副本。 |
| `attstorage`  | char       |                       | 通常是这列数据类型的 `pg_type.typstorage` 的副本。对于可 TOAST 的数据类型，可以在列创建后更改这个值来控制存储策略。 |
| `attalign`    | char       |                       | 这列数据类型的 `pg_type.typalign` 的副本。 |
| `attnotnull`  | boolean    |                       | 表示这列有非空约束。     |
| `attcompression` | char     |                       | 这列的压缩类型。有效值包括：`n`（无压缩）、`r`（游程编码）、`z`（zlib）和 `s`（snappy）。 |
| `atthasdef`   | boolean    |                       | 这列有默认表达式或生成表达式，这种情况下在 `pg_attrdef` 目录里会有对应的条目来定义这个值。（检查 `attgenerated` 可以确定这是默认值还是生成表达式。） |
| `atthasmissing` | boolean  |                       | 这列有一个值，当这列完全缺失时（比如在行创建后添加有非易失性 `DEFAULT` 值的列时）会用这个值。实际值存储在 `attmissingval` 列里。 |
| `attidentity` | char       |                       | 如果是零字节（`''`），就不是身份列。否则，`a` 表示始终生成，`d` 表示默认生成。 |
| `attgenerated` | char      |                       | 如果是零字节（`''`），就不是生成列。否则，`s` 表示存储。（未来可能会添加其他值。） |
| `attisdropped` | boolean   |                       | 这列已经被删除，不再有效。被删除的列在物理上还在表里，但会被解析器忽略，所以无法通过 SQL 访问。 |
| `attislocal`  | boolean    |                       | 这列在关系里是本地定义的。注意，列可以同时本地定义并继承。 |
| `attinhcount` | integer    |                       | 这列的直接祖先数量。有非零祖先数量的列不能被删除或重命名。 |
| `attcollation` | oid       | `pg_collation.oid`    | 这列定义的排序规则，如果不是可排序的数据类型就是零。 |
| `attacl`      | aclitem[]  |                       | 如果给这列授予了特定的列级访问权限，就在这里记录。 |
| `attoptions`  | text[]     |                       | 属性级选项，以“关键字=值”字符串的形式表示。 |
| `attfdwoptions` | text[]    |                       | 属性级外部数据包装器选项，以“关键字=值”字符串的形式表示。 |
| `attmissingval` | anyarray  |                       | 这列包含一个元素的数组，里面是当这列完全缺失时（比如在行创建后添加有非易失性 `DEFAULT` 值的列时）用的值。只有当 `atthasmissing` 是 `true` 时才用这个值。如果没有值，这列就是 `null`。 |
