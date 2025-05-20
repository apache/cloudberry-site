---
title: pg_operator
---

# pg_operator

`pg_operator` 系统目录表用于存储操作符的信息，包括内置操作符和通过 `CREATE OPERATOR` 定义的操作符。未使用的列值为 0，例如：前缀操作符的 `oprleft` 值为 0。

| 列名          | 类型       | 引用                          | 说明                                                                 |
|---------------|------------|-------------------------------|----------------------------------------------------------------------|
| `oid`         | oid        |                               | 行标识符（隐藏属性，需显式选择）。                                    |
| `oprname`     | name       |                               | 操作符名称。                                                          |
| `oprnamespace`| oid        | pg_namespace.oid              | 包含该操作符的命名空间的 OID。                                        |
| `oprowner`    | oid        | pg_authid.oid                 | 操作符的所有者。                                                      |
| `oprkind`     | char       |                               | 操作符的形式：`b` = 中缀（二元），`l` = 前缀（一元左侧），`r` = 后缀（一元右侧）。 |
| `oprcanmerge` | boolean    |                               | 该操作符是否支持合并连接（merge join）。                              |
| `oprcanhash`  | boolean    |                               | 该操作符是否支持哈希连接（hash join）。                               |
| `oprleft`     | oid        | pg_type.oid                   | 左操作数的数据类型。                                                  |
| `oprright`    | oid        | pg_type.oid                   | 右操作数的数据类型。                                                  |
| `oprresult`   | oid        | pg_type.oid                   | 结果的数据类型。                                                      |
| `oprcom`      | oid        | pg_operator.oid               | 该操作符的对换操作符（若有）。                                        |
| `oprnegate`   | oid        | pg_operator.oid               | 该操作符的取反操作符（若有）。                                        |
| `oprcode`     | regproc    | pg_proc.oid                   | 实现该操作符的函数。                                                  |
| `oprrest`     | regproc    | pg_proc.oid                   | 用于限制条件选择率估算的函数。                                        |
| `oprjoin`     | regproc    | pg_proc.oid                   | 用于连接条件选择率估算的函数。                                        |
