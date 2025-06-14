---
title: 创建和管理视图
---

# 在 Apache Cloudberry 中创建和管理视图

在 Apache Cloudberry 中，视图用于保存常用或复杂的查询，你可以像访问普通表一样，通过 `SELECT` 语句访问这些查询结果。视图不会在磁盘上物化：每次访问视图时，系统都会以子查询的方式运行其定义的查询语句。

关于视图的更多内容，参见[视图存储说明](./view-storage.md)和[处理视图依赖关系](./work-with-view-dependencies.md)。

## 创建视图

使用 `CREATE VIEW` 命令可以基于一个查询定义一个视图。例如：

```sql
CREATE VIEW comedies AS SELECT * FROM films WHERE kind = 'comedy';
```

<!-- Views ignore `ORDER BY` and `SORT` operations stored in the view. -->

## 删除视图

使用 `DROP VIEW` 命令可以删除视图。例如：

```sql
DROP VIEW topten;
```

使用 `DROP VIEW ... CASCADE` 命令还可以一并删除所有依赖该视图的对象。例如，如果有其他视图依赖当前将要删除的视图，那么这些依赖视图也会被一并删除。如果不加 `CASCADE` 选项，`DROP VIEW` 命令会执行失败。

## 创建视图的最佳实践

在定义和使用视图时，请记住：视图本质上就是一个 SQL 查询，在查询执行时会被替换为其定义内容。

以下是视图的一些常见用途：

- 将重复使用的 SQL 查询或表达式集中定义，方便复用。
- 将表结构与应用查询解耦，使你在调整表结构时无需修改上层应用。

如果某个子查询只在一条语句中使用，建议直接使用 `SELECT` 的 `WITH` 子句，而不是为其创建一个使用频率很低的视图。

一般来说，上述用途都不需要嵌套视图（即视图依赖其他视图）。以下两种视图使用模式往往会导致问题，因为视图在执行时会被替换为其 SQL：

- 定义多层嵌套视图，使最终查询语句看起来非常简洁。

    当你想优化或调试这些使用了视图的查询时，例如查看执行计划，就会发现执行计划结构复杂、难以理解和优化。

- 定义一个“全能视图”（world view）：将大量数据表连接在一起的视图，用于支持多种查询场景。

    某些查询在特定的 `WHERE` 条件下性能会很差，而在其他条件下表现正常，容易引发性能问题。
