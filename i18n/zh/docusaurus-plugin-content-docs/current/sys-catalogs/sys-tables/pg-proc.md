---
title: pg_proc
---

# pg_proc

`pg_proc` 系统目录表存储了函数（包括过程）的信息，涵盖内置函数和通过 `CREATE FUNCTION` 定义的函数。该表包含普通函数、聚合函数和窗口函数的数据。如果 `proisagg` 为 `true`，则对应的记录会出现在 `pg_aggregate` 表中。

对于已编译的函数（包括内置函数和动态加载的函数），`prosrc` 字段包含函数在 C 语言中的名称（即链接符号）。对于其他已知语言类型，`prosrc` 包含函数的源代码。`probin` 字段仅对动态加载的 C 语言函数有意义，用于表示包含该函数的共享库文件名称。

| 列名          | 类型           | 引用                    | 说明                                                                 |
|---------------|----------------|-------------------------|----------------------------------------------------------------------|
| `oid`         | oid            |                         | 行标识符（隐藏属性，需显式选择）。                                    |
| `proname`     | name           |                         | 函数名称。                                                            |
| `pronamespace`| oid            | pg_namespace.oid        | 包含该函数的命名空间的 OID。                                          |
| `proowner`    | oid            | pg_authid.oid           | 函数的所有者。                                                        |
| `prolang`     | oid            | pg_language.oid         | 实现该函数的语言或调用接口。                                          |
| `procost`     | real           |                         | 函数的估算执行开销（以 `cpu_operator_cost` 为单位）。如果 `proretset` 为 `true`，则表示每返回一行的开销。 |
| `prorows`     | real           |                         | 估算的结果行数（如果 `proretset` 为 `false`，则为 0）。               |
| `provariadic` | oid            | pg_type.oid             | 可变参数数组元素的数据类型；如果函数无可变参数，则为 0。              |
| `prosupport`  | regproc        | pg_proc.oid             | 用于该函数的查询规划支持函数。                                        |
| `prokind`     | char           |                         | 函数类型：`f` 表示普通函数，`p` 表示过程，`a` 表示聚合函数，`w` 表示窗口函数。 |
| `prosecdef`   | boolean        |                         | 该函数是否为 security definer（类似于 setuid 的函数）。              |
| `proleakproof`| boolean        |                         | 函数是否无副作用。仅通过返回值传递参数信息。如果函数可能因参数值而抛出错误，则不能被视为 leak-proof。 |
| `proisstrict` | boolean        |                         | 如果任一参数为 NULL，则函数返回 NULL，且不会真正调用函数。非 strict 函数必须能够处理 NULL 输入。 |
| `proretset`   | boolean        |                         | 函数是否返回集合（即多个值）。                                        |
| `provolatile` | char           |                         | 函数结果是否仅依赖于输入参数，或会受外部因素影响：`i` 表示 *immutable*（输入相同，结果始终相同），`s` 表示 *stable*（在一次扫描中结果不变），`v` 表示 *volatile*（结果可能随时变化，或具有副作用）。 |
| `proparallel` | char           |                         | 函数是否可以在并行执行环境中安全运行。                                |
| `pronargs`    | smallint       |                         | 参数个数。                                                            |
| `pronargdefaults` | smallint   |                         | 具有默认值的参数个数。                                                |
| `prorettype`  | oid            | pg_type.oid             | 返回值的数据类型；如果是过程，则为 null。                              |
| `proargtypes` | ARRAY          | pg_type.oid             | 函数参数类型数组，仅包括输入参数（包括 `INOUT` 和 `VARIADIC` 参数），表示函数的调用签名。 |
| `proallargtypes` | ARRAY       | pg_type.oid             | 函数所有参数的数据类型数组，包括 `OUT` 和 `INOUT` 参数；如果所有参数均为 `IN` 类型，则该字段为 null。注意该数组从下标 1 开始，而历史上的 `proargtypes` 从下标 0 开始。 |
| `proargmodes` | ARRAY          |                         | 函数参数的模式数组：`i` = `IN`，`o` = `OUT`，`b` = `INOUT`，`v` = `VARIADIC`。如果所有参数均为 `IN` 类型，则该字段为 null。注意下标对应 `proallargtypes` 的位置，而非 `proargtypes`。 |
| `proargnames` | ARRAY          |                         | 函数参数名称的数组。无名称的参数对应空字符串；如果所有参数均无名称，则该字段为 null。下标对应 `proallargtypes` 的位置。 |
| `proargdefaults` | pg_node_tree |                         | 默认参数值的表达式树（`nodeToString()` 格式）。这是一个包含 `pronargdefaults` 个元素的列表，分别对应最后 N 个输入参数（即 `proargtypes` 的最后 N 项）。如果没有默认参数，则为 null。 |
| `protrftypes` | ARRAY          |                         | 需要应用转换（transform）的数据类型列表。                              |
| `prosrc`      | text           |                         | 指示函数处理器如何调用该函数。可能是解释型语言的源代码、链接符号、文件名，或其他依语言实现而定的内容。 |
| `probin`      | text           |                         | 补充的调用信息，含义依语言而异。                                      |
| `prosqlbody`  | pg_node_tree   |                         | 如果 `prolang` 为 `sql` 且 `prokind` 不为 `a`（即普通函数或过程），则此字段包含该函数或过程的预解析 SQL 语句体。主要用于数据库内部。如果是其他语言，则为 null。 |
| `proconfig`   | ARRAY          |                         | 该函数的本地运行时配置参数设置。                                      |
| `proacl`      | ARRAY          |                         | 函数的访问权限（由 `GRANT`/`REVOKE` 指定）。                           |
| `prodataaccess` | char         |                         | 函数的 SQL 数据访问模式：`c` = CONTAINS SQL，`n` = NO SQL，`r` = READS SQL DATA，`m` = MODIFIES SQL DATA。 |
| `proexeclocation` | char        |                         | 函数执行时所在位置：`m` - 仅在协调节点执行，`a` - 任意计算节点执行，`s` - 所有计算节点同时执行，`i` - 在 initplan 阶段执行。 |
