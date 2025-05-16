---
title: pg_rewrite
---

# pg_rewrite

`pg_rewrite` 系统目录表存储了表和视图的重写规则。如果某个表在该目录中存在规则，则其对应的 `pg_class.relhasrules` 字段必须为 `true`。

| 列名       | 类型         | 引用              | 说明                                                                 |
|------------|--------------|-------------------|----------------------------------------------------------------------|
| `oid`      | oid          |                   | 对象标识符（Object ID）。                                             |
| `rulename` | name         |                   | 规则名称。                                                            |
| `ev_class` | oid          | pg_class.oid      | 该规则所作用的表。                                                    |
| `ev_type`  | char         |                   | 规则适用的事件类型：1 = SELECT，2 = UPDATE，3 = INSERT，4 = DELETE。    |
| `ev_enabled` | char       |                   | 控制规则在哪种会话复制角色模式下触发。始终为 `O`，表示规则在 origin 模式下触发。 |
| `is_instead` | boolean    |                   | 如果是 `INSTEAD` 规则，则为 `true`。                                  |
| `ev_qual`  | pg_node_tree |                   | 规则的条件表达式树（`nodeToString()` 格式）。                          |
| `ev_action` | pg_node_tree |                   | 规则的操作查询树（`nodeToString()` 格式）。                            |
