---
title: 全文搜索功能限制
---

# 全文搜索功能限制

本文列出了 Apache Cloudberry 全文搜索相关对象的使用限制与最大值。

当前 Apache Cloudberry 的文本搜索功能存在以下限制：

- `tsvector` 和 `tsquery` 类型不能作为 Apache Cloudberry 表的分布键（distribution key）
- 每个词条（lexeme）的长度必须小于 2KB
- 一个 `tsvector`（词条加位置信息）的总长度必须小于 1MB
- `<N>`（FOLLOWED BY）`tsquery` 运算符中的匹配距离不能超过 16,384
- 词条总数必须小于 2⁶⁴
- `tsvector` 中的位置值必须大于 0 且不超过 16,383
- 每个词条最多只能包含 256 个位置值
- 一个 `tsquery` 中的节点总数（词条加运算符）不能超过 32,768 个

作为对比，PostgreSQL 8.1 的官方文档中包含 10441 个不同词，共计 335420 个词，其中出现频率最高的词是 “postgresql”，在 655 个文档中共出现了 6127 次。

另一个例子是 PostgreSQL 邮件列表归档，包含 910989 个唯一词，共计 57491343 个词条，分布在 461020 封邮件中。
