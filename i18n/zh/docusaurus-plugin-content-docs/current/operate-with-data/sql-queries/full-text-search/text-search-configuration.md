---
title: 文本搜索配置示例
---

# 文本搜索配置示例

本文展示如何创建自定义文本搜索配置，以处理文档文本和查询文本。

一个文本搜索配置定义了将文档转换为 `tsvector` 所需的全部选项：包括用于将文本分词的解析器（parser），以及用于将每个词元（token）转换为词素（lexeme）的字典（dictionary）。每次调用 `to_tsvector` 或 `to_tsquery` 都需要一个文本搜索配置来执行这些处理操作。参数 `default_text_search_config` 指定默认配置的名称，在文本搜索函数中未显式指定配置时就会使用它。这个参数可以通过 `gpconfig` 命令行工具在 `postgresql.conf` 文件中进行设置，也可以使用 `SET` 命令为单独会话设置。

系统内置了多个预定义的文本搜索配置，你也可以轻松创建自定义配置。为了方便管理文本搜索对象，Apache Cloudberry 提供了一组 SQL 命令，同时还有多个 psql 命令可以查看文本搜索对象的相关信息（参见 [psql 支持](./text-search-psql-support.md)）。

以下是一个配置名为 `pg` 的示例，起始操作是复制内置的 `english` 配置：

```sql
CREATE TEXT SEARCH CONFIGURATION public.pg ( COPY = pg_catalog.english );
```

你可以定义一个 PostgreSQL 专用的同义词列表，并将其保存在 `$SHAREDIR/tsearch_data/pg_dict.syn` 文件中。文件内容如下：

```sql
postgres    pg
pgsql       pg
postgresql  pg
```

创建该同义词字典：

```sql
CREATE TEXT SEARCH DICTIONARY pg_dict (
    TEMPLATE = synonym,
    SYNONYMS = pg_dict
);
```

然后注册一个 Ispell 词典 `english_ispell`，该词典依赖自己的配置文件：

```sql
CREATE TEXT SEARCH DICTIONARY english_ispell (
    TEMPLATE = ispell,
    DictFile = english,
    AffFile = english,
    StopWords = english
);
```

为配置 `pg` 设置词汇映射：

```sql
ALTER TEXT SEARCH CONFIGURATION pg
    ALTER MAPPING FOR asciiword, asciihword, hword_asciipart,
                      word, hword, hword_part
    WITH pg_dict, english_ispell, english_stem;
```

选择不对某些内置配置会处理的 token 类型进行索引或搜索：

```sql
ALTER TEXT SEARCH CONFIGURATION pg
    DROP MAPPING FOR email, url, url_path, sfloat, float;
```

现在可以测试该配置：

```sql
SELECT * FROM ts_debug('public.pg', '
PostgreSQL, the highly scalable, SQL compliant, open source object-relational
database management system, is now undergoing beta testing of the next
version of our software.
');
```

下一步是将当前会话的默认配置设置为我们刚才在 `public` 模式下创建的新配置：

```sql
SET text_search_config = 'public.pg';
=> \dF
   List of text search configurations
 Schema  | Name | Description
---------+------+-------------
 public  | pg   |

SET default_text_search_config = 'public.pg';
SET

SHOW default_text_search_config;
 default_text_search_config
----------------------------
 public.pg
```
