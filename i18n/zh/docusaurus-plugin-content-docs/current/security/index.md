---
title: 安全与权限
---

本节介绍如何保护 Apache Cloudberry 系统的安全。阅读本指南需要具备 Linux/UNIX 系统管理和数据库管理系统方面的知识，以及熟悉 SQL 语言。

Apache Cloudberry 基于 PostgreSQL 开发，因此你需要对 PostgreSQL 有一定了解。对于 Apache Cloudberry 中与 PostgreSQL 类似的功能，文中会提供 PostgreSQL 官方文档的参考链接。

文档面向负责管理 Apache Cloudberry 数据库系统的管理员。

```mdx-code-block
import DocCardList from '@theme/DocCardList';

<DocCardList />
```

## 关于终端安全软件

如果你在 Apache Cloudberry 所在主机上安装了终端安全类软件，比如杀毒软件、数据防护软件、网络安全工具或其他安全相关程序，这些软件可能会带来额外的 CPU、I\O、网络或内存负载，从而干扰 Apache Cloudberry 的运行，影响数据库的性能和稳定性。

请参考终端安全软件厂商的建议，并在非生产环境中进行充分测试，确保这些软件不会对 Apache Cloudberry 的运行产生负面影响。

