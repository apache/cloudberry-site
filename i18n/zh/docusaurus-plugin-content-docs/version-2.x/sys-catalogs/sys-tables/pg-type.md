---
title: pg_type
---

# pg_type

`pg_type` 系统目录表用于存储数据类型的信息。基础类型（标量类型）通过 `CREATE TYPE` 创建，域类型通过 `CREATE DOMAIN` 创建。每个表在数据库中都会自动生成一个复合类型，用于表示表的行结构。也可以使用 `CREATE TYPE AS` 明确创建复合类型。

| 列名          | 类型       | 引用                          | 说明                                                                 |
|---------------|------------|-------------------------------|----------------------------------------------------------------------|
| `oid`         | oid        |                               | 行标识符（隐藏属性，需显式选择）。                                    |
| `typname`     | name       |                               | 数据类型名称。                                                        |
| `typnamespace`| oid        | pg_namespace.oid              | 包含该类型的命名空间的 OID。                                          |
| `typowner`    | oid        | pg_authid.oid                 | 该类型的所有者。                                                      |
| `typlen`      | smallint   |                               | 如果为固定长度类型，表示其内部表示所占的字节数。可变长度类型为负值：<br/>`-1` 表示 `varlena` 类型（有长度前缀），<br/>`-2` 表示以 NULL 结尾的 C 字符串。 |
| `typbyval`    | boolean    |                               | 表示内部调用时该类型的值是按值传递还是按引用传递。如果 `typlen` 不是 1、2、4（或在某些平台上为 8），`typbyval` 应为 false。可变长度类型始终按引用传递。 |
| `typtype`     | char       |                               | 类型类别：<br/>`b` = 基础类型，<br/>`c` = 复合类型，<br/>`d` = 域，<br/>`e` = 枚举类型，<br/>`p` = 伪类型，<br/>`r` = 范围类型。详见 `typrelid` 和 `typbasetype`。 |
| `typcategory` | char       |                               | 类型分类，用于解析器确定优先使用哪种隐式类型转换。                     |
| `typispreferred` | boolean  |                               | 如果该类型在其类别中是优选的隐式转换目标，则为 true。                  |
| `typisdefined`| boolean    |                               | 如果该类型已定义则为 true，否则为占位符条目（例如引用了尚未定义的类型）。未定义类型只能信任其名称、命名空间和 OID。 |
| `typdelim`    | char       |                               | 当解析数组输入时，用于分隔值的字符。该分隔符与数组元素类型相关，而非数组类型。 |
| `typrelid`    | oid        | pg_class.oid                  | 若为复合类型，则指向定义该类型结构的表的 `pg_class` 条目；独立复合类型也需要这个表项，以供其 `pg_attribute` 关联。非复合类型该值为 0。 |
| `typsubscript`| regproc    | pg_proc.oid                   | 该类型的下标访问函数 OID；不支持下标访问则为 0。                       |
| `typelem`     | oid        | pg_type.oid                   | 如不为 0，则表示该类型的元素类型（支持数组下标访问）。例如 `name` 和 `point` 是固定长度但具有 `typelem` 的类型。 |
| `typarray`    | oid        | pg_type.oid                   | 如不为 0，则指向该类型的数组类型的 OID。用于查找某个类型的数组类型。   |
| `typinput`    | regproc    | pg_proc.oid                   | 文本格式的输入转换函数。                                              |
| `typoutput`   | regproc    | pg_proc.oid                   | 文本格式的输出转换函数。                                              |
| `typreceive`  | regproc    | pg_proc.oid                   | 二进制格式的输入转换函数；若无则为 0。                                 |
| `typsend`     | regproc    | pg_proc.oid                   | 二进制格式的输出转换函数；若无则为 0。                                 |
| `typmodin`    | regproc    | pg_proc.oid                   | 类型修饰符输入函数；若不支持则为 0。                                   |
| `typmodout`   | regproc    | pg_proc.oid                   | 类型修饰符输出函数；若使用默认格式则为 0。                             |
| `typanalyze`  | regproc    | pg_proc.oid                   | 自定义 `ANALYZE` 函数；若使用默认函数则为 0。                           |
| `typalign`    | char       |                               | 存储该类型值时所需的对齐方式，适用于磁盘和内存表示。多个值连续存储时，会插入填充字节使其按指定边界对齐。<br/>可能值：<br/>`c` = 字节对齐（无对齐需求）<br/>`s` = 2 字节对齐<br/>`i` = 4 字节对齐<br/>`d` = 8 字节对齐 |
| `typstorage`  | char       |                               | 对 `typlen = -1` 的 varlena 类型，表示是否支持 TOAST 及其默认存储策略：<br/>`p` = 始终明文存储<br/>`e` = 可存储至 TOAST 辅助表中<br/>`m` = 支持压缩后内联存储<br/>`x` = 支持压缩或 TOAST 存储。 |
| `typnotnull`  | boolean    |                               | 表示类型上的非空约束，仅适用于域类型。                                 |
| `typbasetype` | oid        | pg_type.oid                   | 该域所基于的基础类型；如果不是域类型则为 0。                           |
| `typtypmod`   | integer    |                               | 域所使用的 `typmod`；若基础类型不使用修饰符，则为 -1。非域类型此字段为 -1。 |
| `typndims`    | integer    |                               | 对于基于数组的域，表示数组维度数。其他类型为 0。                       |
| `typcollation`| oid        | pg_collation.oid              | 类型的排序规则 OID；若不支持排序规则则为 0。支持排序的基础类型通常为 `DEFAULT_COLLATION_OID`。 |
| `typdefaultbin` | pg_node_tree |                               | 若不为 null，表示该类型的默认表达式的 `nodeToString()` 形式，仅用于域类型。 |
| `typdefault`  | text       |                               | 若无默认值则为 null。若 `typdefaultbin` 存在，则本字段为其可读形式；否则本字段为默认值的外部表示，可作为输入传递给类型的转换函数。 |
| `typacl`      | ARRAY      |                               | 访问权限，详见 [GRANT](/docs/sql-stmts/grant.md) 和 [REVOKE](/docs/sql-stmts/revoke.md)。 |

下表列出了系统定义的 `typcategory` 分类码。未来的系统类别也将使用大写 ASCII 字母，其他字符保留给用户自定义类别。

| 代码 | 类别说明         |
|------|------------------|
| A    | 数组类型         |
| B    | 布尔类型         |
| C    | 复合类型         |
| D    | 日期/时间类型     |
| E    | 枚举类型         |
| G    | 几何类型         |
| I    | 网络地址类型     |
| N    | 数值类型         |
| P    | 伪类型           |
| R    | 范围类型         |
| S    | 字符串类型       |
| T    | 时间间隔类型     |
| U    | 用户定义类型     |
| V    | 位串类型         |
| X    | `unknown` 类型   |
