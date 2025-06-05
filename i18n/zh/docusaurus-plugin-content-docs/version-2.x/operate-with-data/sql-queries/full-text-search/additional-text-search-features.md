---
title: 文本搜索额外功能
---

# 文本搜索的额外功能

Apache Cloudberry 提供了额外的函数和操作符，用于操作搜索向量和查询向量，并可重写搜索查询。

本节包含以下子主题：

- [操作文档](#操作文档)
- [操作查询](#操作查询)
- [重写查询](#重写查询)
- [收集文档统计信息](#收集文档统计信息)

## 操作文档

[解析文档](./control-text-search.md#解析文档)介绍了如何将原始文本文档转换为 `tsvector` 值。Apache Cloudberry 还提供了一些函数和操作符，用于处理已经转换为 `tsvector` 形式的文档。

`tsvector || tsvector`：`tsvector` 拼接操作符会返回一个新的向量，其中包含两个输入向量的词元和位置信息。拼接时会保留位置和权重标记。右侧向量中的位置值会在拼接时加上左侧向量中最大的位置值，使结果几乎等同于将原始文本拼接后再执行 `to_tsvector` 的效果。（这种方式并不完全等效，因为如果左侧向量文本结尾处存在被移除的停用词，它不会影响拼接后的结果；但如果直接拼接文本后再转换，则会影响右侧词元的位置。）

使用向量拼接而非文本拼接的好处之一是可以对文档的不同部分使用不同的解析配置。此外，由于 `setweight` 函数会统一标记整个向量中的词元权重，因此如果你希望文档的不同部分使用不同权重，应先解析文本并设置权重，再进行拼接。

`setweight(<vector> tsvector, <weight> "char") returns tsvector`：`setweight` 返回输入向量的副本，其中每个位置都被标记为指定的 `<weight>`，可选值为 `A`、`B`、`C` 或 `D`。（新向量默认使用 `D` 权重，因此不会在输出中显示。）这些权重标记在向量拼接时会保留，从而使排名函数能根据文档不同部分的词汇赋予不同重要性。

请注意，权重是应用在 **位置** 上，而不是 **词元** 上。如果输入向量已经被去除位置信息，则 `setweight` 不会起作用。

`length(<vector> tsvector) returns integer`：返回向量中包含的词元数量。

`strip(vector tsvector) returns tsvector`：返回一个不带任何位置或权重信息的向量，但其词元与输入向量相同。结果通常比原始向量更小，但也不如原始向量有用。相关性排序在被去除信息的向量上效果较差。此外，`<->`（紧跟）操作符无法在这类向量中使用，因为它无法判断词元之间的距离。

完整的 `tsvector` 相关函数列表可参考 PostgreSQL 文档中的 [文本搜索函数与操作符](https://www.postgresql.org/docs/14/functions-textsearch.html)。

## 操作查询

[解析查询](./control-text-search.md#解析查询)还介绍了如何将原始文本查询转换为 `tsquery` 值。Apache Cloudberry 同样提供了相关函数和操作符，用于处理已经转换为 `tsquery` 形式的查询。

`tsquery && tsquery`：返回两个查询的 `AND`（与）组合结果。

`tsquery || tsquery`：返回两个查询的 `OR`（或）组合结果。

`!! tsquery`：返回给定查询的否定（`NOT`）结果。

`tsquery <-> tsquery`：返回一个查询，用于匹配第一个查询紧跟第二个查询的情况，使用 `<->`（紧跟）操作符。例如：

```sql
SELECT to_tsquery('fat') <-> to_tsquery('cat | rat');
          ?column?
----------------------------
 'fat' <-> ( 'cat' | 'rat' )
```

`tsquery_phrase(<query1> tsquery, <query2> tsquery [, <distance> integer ]) returns tsquery`：返回一个查询条件，要求第一个子查询匹配词条，第二个子查询在距离 `<distance>` 个词位（lexeme）的位置上也有匹配，相当于使用 `<N>` 这种 `tsquery` 运算符。例如：

```sql
SELECT tsquery_phrase(to_tsquery('fat'), to_tsquery('cat'), 10);
  tsquery_phrase
------------------
 'fat' <10> 'cat'
```

`numnode(<query> tsquery) returns integer`：返回 tsquery 中的节点数（包括词条和操作符）。这个函数可以用于判断一个查询是否有意义：如果返回值大于 0，说明查询中包含有效词条；如果是 0，说明只有停用词。例如：

```sql
SELECT numnode(plainto_tsquery('the any'));
NOTICE:  query contains only stopword(s) or doesn't contain lexeme(s), ignored
 numnode
---------
       0

SELECT numnode('foo & bar'::tsquery);
 numnode
---------
       3
```

`querytree(<query> tsquery) returns text`：返回 tsquery 中可用于索引搜索的部分。这个函数可以用于识别不能被索引的查询条件，例如只包含停用词或仅包含否定条件的查询。例如：

```sql
SELECT querytree(to_tsquery('!defined'));
 querytree
-----------
```

## 重写查询

`ts_rewrite` 系列函数用于在一个 `tsquery` 中查找目标子查询，并将其替换为另一个子查询。这个过程类似于字符串替换，但只针对 `tsquery`。一个目标和替换子查询的组合可以视为一条“查询重写规则”。多个这样的重写规则可以显著增强搜索能力。例如，你可以通过同义词（如 `new york`、`big apple`、`nyc`、`gotham`）扩展搜索，也可以通过关键词重定向引导用户聚焦热点话题。

这项功能与同义词词典（[Thesaurus Dictionary](./text-search-dictionaries.md#词库字典thesaurus-dictionary）)）有部分重叠。不过，重写规则可以动态修改，无需重新建立索引；而更新同义词词典则需要重新索引才能生效。

`ts_rewrite(<query> tsquery, <target> tsquery, <substitute> tsquery) returns tsquery`：该形式的 `ts_rewrite` 应用一条重写规则：将 `<query>` 中的 `<target>` 替换为 `<substitute>`。例如：

```sql
SELECT ts_rewrite('a & b'::tsquery, 'a'::tsquery, 'c'::tsquery);
 ts_rewrite
------------
 'b' & 'c'
```

`ts_rewrite(<query> tsquery, <select> text) returns tsquery`：该形式接受一个起始查询 `<query>` 和一个 SQL `<select>` 语句（文本形式）。`<select>` 查询必须返回两个 `tsquery` 类型的字段。对于返回的每一行，将第一个字段值（目标）在 `<query>` 中替换为第二个字段值（替代）。例如：

```sql
CREATE TABLE aliases (id int, t tsquery, s tsquery);
INSERT INTO aliases VALUES(1, 'a', 'c');

SELECT ts_rewrite('a & b'::tsquery, 'SELECT t,s FROM aliases');
 ts_rewrite
------------
 'b' & 'c'
```

注意，如果应用了多条重写规则，执行顺序可能会影响结果。因此建议你在 `SELECT` 中通过某个排序字段添加 `ORDER BY`。

来看一个真实的天文学例子。我们要通过数据表定义的重写规则扩展查询 `supernovae`：

```sql
CREATE TABLE aliases (id int, t tsquery primary key, s tsquery);
INSERT INTO aliases VALUES(1, to_tsquery('supernovae'), to_tsquery('supernovae|sn'));

SELECT ts_rewrite(to_tsquery('supernovae & crab'), 'SELECT t, s FROM aliases');
           ts_rewrite            
---------------------------------
 'crab' & ( 'supernova' | 'sn' )
```

你可以通过更新表来修改重写规则：

```sql
UPDATE aliases
SET s = to_tsquery('supernovae|sn & !nebulae')
WHERE t = to_tsquery('supernovae');

SELECT ts_rewrite(to_tsquery('supernovae & crab'), 'SELECT t, s FROM aliases');
                 ts_rewrite                  
---------------------------------------------
 'crab' & ( 'supernova' | 'sn' & !'nebula' )
```

当重写规则很多时，重写操作可能变慢，因为系统会检查每一条规则是否匹配。你可以通过 `tsquery` 的包含运算符来预先过滤不可能匹配的规则，提高效率。例如，下面的查询只选出可能与原始查询匹配的规则：

```sql
SELECT ts_rewrite('a & b'::tsquery,
                  'SELECT t,s FROM aliases WHERE ''a & b''::tsquery @> t');
 ts_rewrite
------------
 'b' & 'c'
```

## 收集文档统计信息

函数 `ts_stat` 用于检查文本搜索配置是否合理，并帮助识别可能的停用词。

```sql
ts_stat(<sqlquery> text, [ <weights> text, ]
        OUT <word> text, OUT <ndoc> integer,
        OUT <nentry> integer) returns setof record
```

参数 `<sqlquery>` 是一个包含 SQL 查询的文本，这个查询必须返回一个 `tsvector` 类型的列。`ts_stat` 会执行这个查询，并统计每个词条（lexeme）的使用情况，返回以下字段：

- `<word> text` — 词条的值
- `<ndoc> integer` — 出现该词条的文档数量（即包含该词条的 `tsvector` 条数）
- `<nentry> integer` — 该词条的总出现次数

如果指定了 `weights`，则只统计具有指定权重的词条。例如，如果只统计权重为 `A` 或 `B` 的词条，可在第二个参数中传入 `'ab'`。

例如，要找出文档集合中最常出现的前十个词：

```sql
SELECT * FROM ts_stat('SELECT vector FROM apod')
ORDER BY nentry DESC, ndoc DESC, word
LIMIT 10;
```

如果只统计权重为 `A` 或 `B` 的词：

```sql
SELECT * FROM ts_stat('SELECT vector FROM apod', 'ab')
ORDER BY nentry DESC, ndoc DESC, word
LIMIT 10;
```
