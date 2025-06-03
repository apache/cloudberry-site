---
title: 文本搜索解析器
---

# 文本搜索解析器（Text Search Parsers）

本文介绍 Apache Cloudberry 文本搜索解析器如何将原始文本拆分为不同类型的词元（token）。

文本搜索解析器的作用是将原始文档文本拆解成词元，并标注每个词元的类型，这些类型由解析器定义。解析器本身**不会**修改文本内容，只是识别可能的词边界。由于功能范围有限，通常不需要像字典那样定制解析器。目前 Apache Cloudberry 仅提供一个内建解析器，已经能满足多种应用场景。

这个内建解析器名为 `pg_catalog.default`，它识别 23 种词元类型，如下表所示：

| 别名（Alias） | 描述（Description）                         | 示例（Example） |
|---------------|----------------------------------------------|-----------------|
| asciiword     | 仅由 ASCII 字母组成的单词                   | `elephant`      |
| word          | 任意语言字母组成的单词                      | `mañana`        |
| numword       | 字母和数字组成的单词                        | `beta1`         |
| asciihword    | 由 ASCII 字符组成的连字符单词               | `up-to-date`    |
| hword         | 任意字母组成的连字符单词                    | `lógico-matemática` |
| numhword      | 字母和数字组成的连字符单词                  | `postgresql-beta1` |
| hword_asciipart | 连字符单词的 ASCII 部分                  | `postgresql`（出现在 `postgresql-beta1` 中） |
| hword_part    | 连字符单词的普通字母部分                    | `lógico` 或 `matemática`（出现在 `lógico-matemática` 中） |
| hword_numpart | 连字符单词的字母+数字部分                   | `beta1`（出现在 `postgresql-beta1` 中） |
| email         | 电子邮箱地址                                | `foo@example.com` |
| protocol      | 协议前缀                                    | `http://`       |
| url           | URL 地址                                    | `example.com/stuff/index.html` |
| host          | 主机名                                      | `example.com`   |
| url_path      | URL 路径                                    | `/stuff/index.html`（作为 URL 的一部分） |
| file          | 文件路径                                    | `/usr/local/foo.txt`（不作为 URL 时） |
| sfloat        | 科学计数法                                  | `-1.234e56`     |
| float         | 小数表示                                    | `-1.234`        |
| int           | 带符号整数                                  | `-1234`         |
| uint          | 无符号整数                                  | `1234`          |
| version       | 版本号                                      | `8.3.0`         |
| tag           | XML 标签                                    | `<a href="dictionaries.html">` |
| entity        | XML 实体                                    | `&amp;`         |
| blank         | 空格或未分类标点符号                        |（如空格、标点）|

:::note 注意
解析器对“字母”的定义受数据库的 locale 设置中的 `lc_ctype` 影响。完全由 ASCII 字母构成的词会被单独标为一种类型（asciiword），有时便于特殊处理。在多数欧洲语言中，`word` 和 `asciiword` 类型通常可以合并处理。
:::

`email` 类型并不完全支持 RFC 5322 中所有合法的邮件地址字符。具体来说，只允许使用字母、数字、点号、短横线和下划线作为邮箱用户名中的字符。

同一段文本中，解析器有可能产生多个重叠的词元。例如，连字符连接的复合词会被同时拆解为整体和各个部分：

```sql
SELECT alias, description, token FROM ts_debug('foo-bar-beta1');
      alias      |               description                |     token     
-----------------+------------------------------------------+---------------
 numhword        | Hyphenated word, letters and digits      | foo-bar-beta1
 hword_asciipart | Hyphenated word part, all ASCII          | foo
 blank           | Space symbols                            | -
 hword_asciipart | Hyphenated word part, all ASCII          | bar
 blank           | Space symbols                            | -
 hword_numpart   | Hyphenated word part, letters and digits | beta1
```

这种行为是有意设计的，它可以支持对复合词整体和部分的搜索。以下是另一个有参考价值的例子：

```sql
SELECT alias, description, token FROM ts_debug('http://example.com/stuff/index.html');
  alias   |  description  |            token             
----------+---------------+------------------------------
 protocol | Protocol head | http://
 url      | URL           | example.com/stuff/index.html
 host     | Host          | example.com
 url_path | URL path      | /stuff/index.html
```
