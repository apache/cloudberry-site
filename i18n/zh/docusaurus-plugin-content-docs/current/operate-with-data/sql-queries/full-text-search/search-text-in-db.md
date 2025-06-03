---
title: 在数据库表中搜索文本
---

# 在数据库表中搜索文本

本文介绍如何使用文本搜索运算符查询数据库表中的内容，以及如何创建索引以加速全文搜索。

上一节中展示的是使用常量字符串进行全文匹配的示例。本节则介绍如何在表数据中进行搜索，并可选地结合索引使用。

本节包含以下子主题：

- [搜索表数据](#搜索表数据)
- [创建索引](#创建索引)

## 搜索表数据

进行全文搜索时不一定需要索引。下面是一个简单查询，用于选出 `body` 字段中包含 `friend` 这个词的所有行，并打印其 `title`：

```sql
SELECT title
FROM pgweb
WHERE to_tsvector('english', body) @@ to_tsquery('english', 'friend');
```

这个查询也会匹配类似 `friends` 和 `friendly` 的词，因为它们在处理过程中会被归一化为相同的词条（lexeme）。

以上语句中显式指定了使用 `english` 配置来解析和标准化文本。你也可以省略配置参数：

```sql
SELECT title
FROM pgweb
WHERE to_tsvector(body) @@ to_tsquery('friend');
```

这种写法会使用 `default_text_search_config` 中设置的默认配置。

下面是一个更复杂的示例：查询在 `title` 或 `body` 字段中同时包含 `create` 和 `table` 的最近 10 篇文档：

```sql
SELECT title
FROM pgweb
WHERE to_tsvector(title || ' ' || body) @@ to_tsquery('create & table')
ORDER BY last_mod_date DESC
LIMIT 10;
```

为了简化说明，这里省略了 `coalesce`，在实际使用中如果某个字段可能为 `NULL`，则应使用 `coalesce` 以避免整个拼接结果变成 `NULL`。

虽然这些查询不需要索引也能工作，但大多数应用场景中直接扫描表的方式效率过低，仅适用于偶尔的临时查询。实际中建议结合索引使用文本搜索功能。

## 创建索引

你可以创建 GIN 索引（参考[全文搜索的 GiST 与 GIN 索引](./preferred-indexes-for-full-text-search.md)）以加速搜索：

```sql
CREATE INDEX pgweb_idx ON pgweb USING GIN (to_tsvector('english', body));
```

注意，这里使用的是 `to_tsvector` 的双参数版本。在表达式索引中，只有显式指定配置名的文本搜索函数才能使用。原因是索引内容不能受到 `default_text_search_config` 的影响。如果允许使用默认配置，可能导致索引中混入不同配置生成的 `tsvector`，从而引发不一致，最终导致无法正确导出或恢复索引。

正因为索引使用的是带配置名的 `to_tsvector`，所以只有查询时也使用相同配置名的写法，才能命中索引。例如：

- 可命中索引：`WHERE to_tsvector('english', body) @@ 'a & b'`
- 无法命中索引：`WHERE to_tsvector(body) @@ 'a & b'`

这保证了只有在配置一致的前提下，索引才会被使用。

你也可以创建更复杂的表达式索引，让配置名来源于表中的另一列。例如：

```sql
CREATE INDEX pgweb_idx ON pgweb USING GIN (to_tsvector(config_name, body));
```

在这个例子中，`config_name` 是 `pgweb` 表中的一列。这种方式可以在同一个索引中使用不同的配置，同时记录每条索引记录使用的是哪种配置。这在文档集合包含多种语言时尤其有用。需要注意的是，查询语句也必须与索引创建时的格式保持一致，例如：`WHERE to_tsvector(config_name, body) @@ 'a & b'`。

索引也可以基于多个列拼接创建：

```sql
CREATE INDEX pgweb_idx ON pgweb USING GIN (to_tsvector('english', title || ' ' || body));
```

另一种做法是单独创建一个 `tsvector` 类型的列，专门保存 `to_tsvector` 的结果。为了保证该列在源数据更新时自动同步，推荐使用持久生成列（stored generated column）。以下示例中拼接了 `title` 和 `body` 字段，并用 `coalesce` 避免任一字段为 `NULL` 导致整个拼接失败：

```sql
ALTER TABLE pgweb 
    ADD COLUMN textsearchable_index_col tsvector
        GENERATED ALWAYS AS (to_tsvector('english', coalesce(title, '') || ' ' || coalesce(body, ''))) STORED;
```

然后可以为这个列创建 GIN 索引，加速搜索：

```sql
CREATE INDEX textsearch_idx ON pgweb USING GIN (textsearchable_index_col);
```

接下来就可以执行快速的全文搜索了：

```sql
SELECT title FROM pgweb WHERE textsearchable_index_col @@ to_tsquery('create & table') 
ORDER BY last_mod_date DESC LIMIT 10;
```

相比表达式索引，这种单独列的方式有几个优势：

- 查询时不需要显式指定文本搜索配置，也能命中索引。正如上例所示，查询可以依赖 `default_text_search_config`。
- 查询效率更高，因为无需在执行时重新调用 `to_tsvector` 来验证匹配结果（这在使用 GiST 索引时比 GIN 索引更为关键，详见[全文搜索的 GiST 与 GIN 索引](./preferred-indexes-for-full-text-search.md)）。

不过，表达式索引的设置更简单，占用的磁盘空间也更少，因为 `tsvector` 不会被实际存储在表中。
