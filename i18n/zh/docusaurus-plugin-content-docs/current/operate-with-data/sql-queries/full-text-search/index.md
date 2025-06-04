---
title: 全文搜索功能
---

# 全文搜索功能

Apache Cloudberry 提供了一套用于自然语言文档查询的数据类型、函数、运算符、索引类型以及配置机制。

- **[全文搜索简介](./full-text-search-intro.md)**：概述 Apache Cloudberry 全文搜索的基本机制、搜索表达式、配置方式与自定义方法，并对比 Apache Cloudberry Text 提供的搜索功能。
- **[在数据库表中搜索文本](./search-text-in-db.md)**：说明如何使用文本搜索运算符查询数据库表中的内容，以及如何创建索引以提升搜索性能。
- **[控制文本搜索](./control-text-search.md)**：介绍如何构建搜索向量与查询向量，如何对搜索结果进行排序，以及如何在结果中高亮显示命中词。
- **[附加文本搜索功能](./additional-text-search-features.md)**：Apache Cloudberry 还提供了用于操作搜索向量、查询向量以及重写查询条件的额外函数和运算符。
- **[文本搜索解析器](./text-search-parsers.md)**：介绍文本搜索解析器如何将原始文本拆解为不同类型的词元（token）。
- **[文本搜索词典](./text-search-dictionaries.md)**：解析器生成的词元会依次通过词典链转换为标准词条（lexeme）。不同类型的词典可以用来过滤或转换词元，支持多种语言。
- **[文本搜索配置示例](./text-search-configuration.md)**：讲解如何创建自定义文本搜索配置，用于处理文档与查询文本。
- **[测试与调试文本搜索](./test-and-debug-text-search.md)**：介绍可用于测试与调试全文搜索配置的函数，包括解析器与词典的独立测试方法。
- **[全文搜索的 GiST 与 GIN 索引](./preferred-indexes-for-full-text-search.md)**：说明全文搜索所用索引类型的差异与适用场景，并进行对比分析。
- **[psql 支持](./text-search-psql-support.md)**：psql 命令行工具支持一个元命令，用于展示当前系统中关于全文搜索的配置信息。
- **[功能限制](./full-text-search-limitations.md)**：列出 Apache Cloudberry 全文搜索功能的限制和参数上限。
