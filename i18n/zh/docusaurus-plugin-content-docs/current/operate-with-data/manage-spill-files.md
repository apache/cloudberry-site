---
title: 管理查询生成的溢写文件
---

# 管理查询生成的溢写文件

如果内存不足以在内存中执行 SQL 查询，Apache Cloudberry 会在磁盘上创建溢写文件（也叫 workfile）。

单个查询最多允许创建的溢写文件数量由服务器配置参数 `gp_workfile_limit_files_per_query` 控制。默认值是 100000 个溢写文件，对于大多数查询来说已经足够。

如果某个查询创建的溢写文件数量超过了配置的限制，Apache Cloudberry 会报错：

```sql
ERROR: number of workfiles per query limit exceeded
```

以下情况可能会导致生成大量溢写文件：

- 查询的数据存在倾斜。
- 分配给查询的内存太少。你可以通过服务器配置参数 `max_statement_mem` 和 `statement_mem`，或者通过资源组或资源队列配置，来控制单个查询可用的最大内存。

你可以尝试修改查询语句、调整数据分布，或者更改系统内存配置，来让查询顺利执行。系统视图 `gp_toolkit.gp_workfile_*` 提供了溢写文件的使用信息，你可以用这些信息来排查问题和优化查询。这些 `gp_workfile_**` 视图在文档[查看查询溢写空间使用情况](../sys-catalogs/gp_toolkit.md#查询磁盘溢出空间使用情况) 中有详细说明。

更多参考资料：

- [使用资源组](../performance/manage-resources-using-resource-groups.md) 介绍了在启用资源组管理时，关于内存和溢写的注意事项。
