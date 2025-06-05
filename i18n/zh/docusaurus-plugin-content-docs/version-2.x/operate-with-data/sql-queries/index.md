---
title: SQL 查询
---

# SQL 查询

Apache Cloudberry 构建于 PostgreSQL 之上，遵循 SQL 标准来进行数据定义、操作和分析。要有效地编写查询语句，需要了解决定 SQL 语法和语义的一些基本规则。

本文档介绍在 Apache Cloudberry 中构建 SQL 查询所需掌握的核心概念，包括 SQL 语言结构、值表达式、聚合函数和窗口函数、子查询以及表达式的求值规则。这些内容分别对应 SQL 查询的不同组成部分，能够帮助你编写准确、高效且表达能力强的查询语句。

本页链接的子主题提供了更详细的说明和示例，帮助你编写与 Cloudberry 引擎高度兼容的 SQL 查询。

- [基本查询语法](./basic-query-syntax.md)
- [SQL 语言](./sql-language.md)
    - [GROUP BY 和 HAVING 子句](./group-by-and-having-clauses.md)
    - [WHERE 子句](./where-clauses.md)
- [值表达式](./value-expressions.md)
- [表达式求值规则](./evaluation-order.md)
- [表连接查询](./join-queries.md)
- [表函数](./table-functions.md)
- [聚合函数](./aggregates-expressions.md)
- [窗口函数](./window-functions.md)
- [子查询](./subqueries.md)
- [公共表表达式](./cte-queries.md)
- [表和列别名](./table-and-column-aliases.md)
- [全文搜索](./full-text-search/index.md)
