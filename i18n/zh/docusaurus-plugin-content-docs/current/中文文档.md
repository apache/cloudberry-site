




## 中文技术文档：pg_test_timing 文档

```markdown
# pg_test_timing 文档

## 概述

`pg_test_timing` 是 Cloudberry 提供的一个实用工具，用于测试 PostgreSQL 数据库操作的时间行为。它有助于识别性能瓶颈并优化数据库操作。

## 功能

- 测量 SQL 查询的执行时间
- 支持多种查询执行模式
- 提供详细的时间报告

## 使用方法

要使用 `pg_test_timing`，请按照以下步骤操作：

1. 如果尚未安装，请安装 `pg_test_timing`。
2. 使用必要的参数运行工具。

示例命令：
```bash
pg_test_timing -d your_database -c "SELECT * FROM your_table"