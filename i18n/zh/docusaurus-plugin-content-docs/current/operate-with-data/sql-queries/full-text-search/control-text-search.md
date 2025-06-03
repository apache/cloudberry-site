---
title: 控制文本搜索
---

# 控制文本搜索

本文介绍如何创建搜索向量与查询向量，如何对搜索结果进行排序，以及如何在文本搜索结果中高亮显示关键词。

要实现全文搜索，必须有函数将文档转换为 `tsvector`，并将用户查询转换为 `tsquery`。同时，需要有函数根据相关性对文档排序，以便返回有用的结果。展示结果的可读性也很重要。Apache Cloudberry 提供了以上所有功能的支持。

本文包含以下主题：

- [解析文档](#解析文档)
- [解析查询](#解析查询)
- [排序搜索结果](#排序搜索结果)
- [高亮显示搜索词](#高亮显示搜索词)

## 解析文档

Apache Cloudberry 提供了 `to_tsvector` 函数，用于将文档转换为 `tsvector` 类型。

```sql
to_tsvector([<config> regconfig, ] <document> text) returns tsvector
```

`to_tsvector` 会将文本文档解析为词元（token），将词元归约为词条（lexeme），并返回一个包含词条及其在文档中位置的 `tsvector`。文档会根据指定或默认的文本搜索配置进行处理。以下是一个简单的例子：

```sql
SELECT to_tsvector('english', 'a fat  cat sat on a mat - it ate a fat rats');
                  to_tsvector
-----------------------------------------------------
 'ate':9 'cat':3 'fat':2,11 'mat':7 'rat':12 'sat':4
```

从上面的例子可以看出，结果中没有 `a`、`on` 和 `it`，而 `rats` 被还原为 `rat`，标点符号 `-` 被忽略。

`to_tsvector` 会调用解析器将文档拆分成词元并为每个词元分配一个类型。系统会依次查阅一个词典列表（参见[文本搜索词典](./text-search-dictionaries.md)），这个列表可能根据词元类型而有所不同。第一个识别该词元的词典会返回一个或多个标准化的词条。例如，`rats` 被还原为 `rat`，是因为某个词典识别它是 `rat` 的复数形式。一些高频词会被识别为停用词（stop words），在搜索中价值不高，因此会被忽略，例如上例中的 `a`、`on` 和 `it`。如果没有任何词典识别一个词元，也会被忽略。例如 `-` 被忽略，是因为它属于“空格符号（Space symbols）”类型，而这个类型并没有关联任何词典，因此此类词元永远不会被索引。

使用哪个解析器、词典以及要索引哪些类型的词元，取决于所选的文本搜索配置（参见[文本搜索配置示例](./text-search-configuration.md)）。同一个数据库中可以有多个不同配置。系统也预设了多种语言的配置。在上面的例子中使用的是默认的英文配置 `english`。

可以使用 `setweight` 函数为 `tsvector` 中的词条指定一个权重（weight），可选的权重包括 `A`、`B`、`C` 和 `D`。通常用于标注文档中不同部分的词条，例如将标题（title）和正文（body）分开标记。之后这些权重信息可以用于提升搜索结果的排序质量。

由于 `to_tsvector(NULL)` 返回的是 `NULL`，因此建议在字段可能为 null 时使用 `coalesce`。以下是从结构化文档生成 `tsvector` 的推荐方法：

函数 `setweight` 可用于为 `tsvector` 中的词条添加权重标签，权重可以是 `A`、`B`、`C` 或 `D`。通常用于标记文档中不同部分的词条来源，比如 `title` 与 `body`。这些权重信息可用于后续的搜索结果排序。

由于 `to_tsvector(NULL)` 会返回 `NULL`，因此在字段可能为 null 时建议使用 `coalesce`。下面是从结构化文档创建 `tsvector` 的推荐方法：

```sql
UPDATE tt SET ti = setweight(to_tsvector(coalesce(title,'')), 'A') 
  || setweight(to_tsvector(coalesce(keyword,'')), 'B') 
  || setweight(to_tsvector(coalesce(abstract,'')), 'C') 
  || setweight(to_tsvector(coalesce(body,'')), 'D');
```

在这个例子中，`setweight` 用于标记每个词条的来源，之后通过 `tsvector` 拼接运算符 `||` 合并这些标记后的 `tsvector` 值。相关操作的细节参见[附加文本搜索功能](./additional-text-search-features.md)。

## 解析查询

Apache Cloudberry 提供了 `to_tsquery`、`plainto_tsquery`、`phraseto_tsquery` 和 `websearch_to_tsquery` 这些函数，用于将查询字符串转换为 `tsquery` 类型。其中 `to_tsquery` 功能最强，但对输入格式要求也更严格；`websearch_to_tsquery` 是 `to_tsquery` 的简化版，语法更接近常见网页搜索引擎。

```sql
to_tsquery([<config> regconfig, ] <querytext> text) returns tsquery
```

`to_tsquery` 会将 *querytext* 转换为 `tsquery` 值，输入文本必须由词条组成，并用布尔运算符连接：`&`（AND）、`|`（OR）、`!`（NOT）和 `<->`（紧邻），可使用括号进行分组。换句话说，输入必须符合 tsquery 的语法规范。不过与基本 tsquery 输入不同的是，`to_tsquery` 会先使用指定（或默认）配置将每个词规范化为词条（lexeme），并忽略配置中定义的停用词。例如：

```sql
SELECT to_tsquery('english', 'The & Fat & Rats');
  to_tsquery   
---------------
 'fat' & 'rat'
```

就像基本 `tsquery` 输入那样，也可以为词条指定权重，用于限制匹配特定权重的 `tsvector` 词条。例如：

```sql
SELECT to_tsquery('english', 'Fat | Rats:AB');
    to_tsquery    
------------------
 'fat' | 'rat':AB
```

此外，可以在词条后添加 `*` 表示前缀匹配：

```sql
SELECT to_tsquery('supern:*A & star:A*B');
        to_tsquery        
--------------------------
 'supern':*A & 'star':*AB
```

这样的词条会匹配 `tsvector` 中所有以该前缀开头的词。

`to_tsquery` 也支持使用单引号括起的短语，这在启用了支持短语的词典（如同义词词典）时很有用。例如，某个同义词词典中包含规则 `supernovae stars : sn`，那么：

```sql
SELECT to_tsquery('''supernovae stars'' & !crab');
  to_tsquery
---------------
 'sn' & !'crab'
```

如果不加引号，像这种没有用运算符连接的多词输入会导致语法错误。

```sql
plainto_tsquery([ <config> regconfig, ] <querytext> text) returns tsquery
```

`plainto_tsquery` 用于将普通文本 `querytext` 转换为 `tsquery`。其处理流程类似 `to_tsvector`，文本会被解析并规范化，并在剩余词条之间自动插入 `&`（AND）运算符。

例如：

```sql
SELECT plainto_tsquery('english', 'The Fat Rats');
 plainto_tsquery 
-----------------
 'fat' & 'rat'
```

注意，`plainto_tsquery` 并不会识别布尔运算符、权重标签或前缀匹配标记：

```sql
SELECT plainto_tsquery('english', 'The Fat & Rats:C');
   plainto_tsquery   
---------------------
 'fat' & 'rat' & 'c'
```

在这个例子中，所有的标点符号都被当作空格符号而被忽略了。

```sql
phraseto_tsquery([ <config> regconfig, ] <querytext> text) returns tsquery
```

`phraseto_tsquery` 的行为类似 `plainto_tsquery`，不同的是它会在词条之间插入 `<->`（紧邻）运算符，而不是 `&`（与）运算符。此外，它不会简单地丢弃停用词，而是用 `<N>` 运算符代替 `<->` 运算符进行处理。这在需要搜索确切词条顺序的场景下非常有用，因为 `<->` 运算符不仅要求所有词条都出现，还要求它们的顺序一致。

示例：

```sql
SELECT phraseto_tsquery('english', 'The Fat Rats');
 phraseto_tsquery
------------------
 'fat' <-> 'rat'
```

与 `plainto_tsquery` 一样，`phraseto_tsquery` 不会识别 `tsquery` 的布尔运算符、权重标签或前缀匹配标记：

```sql
SELECT phraseto_tsquery('english', 'The Fat & Rats:C');
      phraseto_tsquery
-----------------------------
 'fat' <-> 'rat' <-> 'c'
```

```sql
websearch_to_tsquery([ <config> regconfig, ] <querytext> text) returns tsquery
```

`websearch_to_tsquery` 使用一种替代语法将 `querytext` 转换为 `tsquery`。在这种语法中，普通未格式化文本本身就是合法查询。与 `plainto_tsquery` 和 `phraseto_tsquery` 不同，它还支持识别特定的运算符。此外，该函数不会抛出语法错误，因此可以直接使用用户提供的原始输入进行搜索。

支持的语法包括：

- `未加引号的文本`：会被处理为以 `&` 连接的词条，行为类似 `plainto_tsquery`。
- `"加引号的文本"`：会被处理为以 `<->` 连接的词条，行为类似 `phraseto_tsquery`。
- `OR`：逻辑或，转换为 `|` 运算符。
- `-`：逻辑非，转换为 `!` 运算符。

示例：

```sql
SELECT websearch_to_tsquery('english', 'The fat rats');
 websearch_to_tsquery
----------------------
 'fat' & 'rat'
(1 row)

SELECT websearch_to_tsquery('english', '"supernovae stars" -crab');
       websearch_to_tsquery
----------------------------------
 'supernova' <-> 'star' & !'crab'
(1 row)

SELECT websearch_to_tsquery('english', '"sad cat" or "fat rat"');
       websearch_to_tsquery
-----------------------------------
 'sad' <-> 'cat' | 'fat' <-> 'rat'
(1 row)

SELECT websearch_to_tsquery('english', 'signal -"segmentation fault"');
         websearch_to_tsquery
---------------------------------------
 'signal' & !( 'segment' <-> 'fault' )
(1 row)

SELECT websearch_to_tsquery('english', '""" )( dummy  query <->');
 websearch_to_tsquery
----------------------
 'dummi' & 'queri'
(1 row)
```

## 排序搜索结果

排序的目标是衡量文档与查询的相关程度，以便在匹配项较多时，能优先显示最相关的结果。Apache Cloudberry 提供了两个内置的排序函数，这些函数会综合考虑词频、位置以及结构信息，也就是说，它们会判断查询词在文档中出现的频率、彼此的接近程度，以及这些词出现的位置在文档中的重要性。

不过，“相关性”这个概念本身是模糊且高度依赖具体业务场景的。某些应用可能还需要考虑其他因素，例如文档的更新时间。因此，这些内置排序函数只是示例，你也可以根据自己的需求自定义排序函数，或将其结果与其他因素结合起来使用。

目前可用的两个排序函数是：

- `ts_rank([ <weights> float4[], ] <vector> tsvector, <query> tsquery [, <normalization> integer ]) returns float4`：根据匹配词条的频率对向量进行排序。
  
- `ts_rank_cd([ <weights> float4[], ] <vector> tsvector, <query> tsquery [, <normalization> integer ]) returns float4`：计算覆盖密度（cover density）排序，参考 Clarke、Cormack 和 Tudhope 于 1999 年在期刊 "Information Processing and Management" 中发表的论文 "Relevance Ranking for One to Three Term Queries"。与 `ts_rank` 类似，但它会进一步考虑匹配词条之间的距离。

`ts_rank_cd` 需要词条位置信息，因此会忽略 `tsvector` 中已被“剥离”（stripped）的词条。如果输入中没有未剥离的词条，则结果为 0。（关于 `strip` 函数和 `tsvector` 的位置信息，详见[处理文档](./additional-text-search-features.md#操作文档)）

这两个函数都支持可选参数 `<weights>`，用于对不同权重的词条赋予不同的重要程度。权重数组的顺序为：

```sql
{D-weight, C-weight, B-weight, A-weight}
```

如果未指定 `<weights>`，则默认使用以下权重：

```sql
{0.1, 0.2, 0.4, 1.0}
```

通常会使用权重区分文档中不同区域的词条，例如标题、摘要与正文，使排序时能给予这些区域不同的权重。

由于文档越长，包含查询词的可能性也越高，因此有必要考虑文档长度对排序的影响。例如，一个只有一百个词的文档中包含五次搜索词，可能比一个一千词的文档包含同样五次更相关。

两个排序函数都支持一个整型的 `<normalization>` 参数，用于指定是否以及如何按文档长度调整得分。这个参数是一个位掩码，可以通过 `|` 运算符组合多个选项，例如 `2|4`。

可选的 normalization 值如下：

- `0`（默认）：忽略文档长度
- `1`：用 `1 + log(文档长度)` 对得分取倒数
- `2`：用文档长度对得分取倒数
- `4`：按词条片段间的调和平均距离缩放得分（仅 `ts_rank_cd` 实现）
- `8`：用文档中的唯一词条数对得分取倒数
- `16`：用 `1 + log(唯一词条数)` 对得分取倒数
- `32`：将得分缩放为 `rank / (rank + 1)`

如果设置了多个标志位，会按上述顺序依次应用。

需要注意的是，这些排序函数不会使用任何全局统计数据，因此无法像某些人希望的那样把得分标准化为 1% 或 100%。不过，可以使用 `normalization` 选项 `32 (rank/(rank+1))` 将所有得分压缩到 0 到 1 的范围，这种缩放仅改变显示格式，不会影响排序结果的先后顺序。

下面是一个示例，用于选出排序前十的匹配结果：

```sql
SELECT title, ts_rank_cd(textsearch, query) AS rank
FROM apod, to_tsquery('neutrino|(dark & matter)') query
WHERE query @@ textsearch
ORDER BY rank DESC
LIMIT 10;
                     title                     |   rank
-----------------------------------------------+----------
 Neutrinos in the Sun                          |      3.1
 The Sudbury Neutrino Detector                 |      2.4
 A MACHO View of Galactic Dark Matter          |  2.01317
 Hot Gas and Dark Matter                       |  1.91171
 The Virgo Cluster: Hot Plasma and Dark Matter |  1.90953
 Rafting for Solar Neutrinos                   |      1.9
 NGC 4650A: Strange Galaxy and Dark Matter     |  1.85774
 Hot Gas and Dark Matter                       |   1.6123
 Ice Fishing for Cosmic Neutrinos              |      1.6
 Weak Lensing Distorts the Universe            | 0.818218
```

下面是使用归一化排序的相同示例：

```sql
SELECT title, ts_rank_cd(textsearch, query, 32 /* rank/(rank+1) */ ) AS rank
FROM apod, to_tsquery('neutrino|(dark & matter)') query
WHERE  query @@ textsearch
ORDER BY rank DESC
LIMIT 10;
                     title                     |        rank
-----------------------------------------------+-------------------
 Neutrinos in the Sun                          | 0.756097569485493
 The Sudbury Neutrino Detector                 | 0.705882361190954
 A MACHO View of Galactic Dark Matter          | 0.668123210574724
 Hot Gas and Dark Matter                       |  0.65655958650282
 The Virgo Cluster: Hot Plasma and Dark Matter | 0.656301290640973
 Rafting for Solar Neutrinos                   | 0.655172410958162
 NGC 4650A: Strange Galaxy and Dark Matter     | 0.650072921219637
 Hot Gas and Dark Matter                       | 0.617195790024749
 Ice Fishing for Cosmic Neutrinos              | 0.615384618911517
 Weak Lensing Distorts the Universe            | 0.450010798361481
```

排序的代价较高，因为它需要访问每个匹配文档的 `tsvector`，这可能涉及大量 I/O 操作，导致查询变慢。实际使用中，这种开销几乎不可避免，因为大多数查询都会返回大量匹配结果。

## 高亮显示搜索结果

在展示搜索结果时，理想的做法是显示文档的一部分内容，并标出与查询相关的部分。通常，搜索引擎会显示文档片段，并突出显示命中词。Apache Cloudberry 提供了 `ts_headline` 函数实现这一功能。

```sql
ts_headline([<config> regconfig, ] <document> text, <query> tsquery [, <options> text ]) returns text
```

`ts_headline` 接受一个文档和一个查询，返回文档中与查询匹配的片段，并对匹配词进行高亮。你可以通过 `*config*` 参数指定解析文档时使用的文本搜索配置；如果未指定，则使用 `default_text_search_config`。

如果指定了 `*options*` 参数，它必须是一个以逗号分隔的 `*option=value*` 列表。可用的选项包括：

- `MaxWords`, `MinWords`（整数）：定义输出摘要片段的最长和最短长度。默认值分别为 35 和 15。
- `ShortWord`（整数）：开头或结尾若有短词（长度不超过该值），且不是查询词，则会被忽略。默认值为 3，主要用于去除如英文冠词之类的无效词。
- `HighlightAll`（布尔值）：如果设置为 `true`，将使用整篇文档作为输出内容，并忽略前面三个参数。默认值是 `false`。
- `MaxFragments`（整数）：最多显示的片段数。默认值为 0，表示不使用片段模式；大于 0 时则启用基于片段的输出（详见下文）。
- `StartSel`, `StopSel`（字符串）：用于包裹高亮词的起始与结束标记。默认值分别为 `<b>` 和 `</b>`，适合用于 HTML。
- `FragmentDelimiter`（字符串）：当显示多个片段时，片段之间使用该字符串分隔。默认值为 `...`。

这些选项名称大小写不敏感。如果字符串值中包含空格或逗号，需使用双引号括起来。

非片段模式下，`ts_headline` 会在文档中查找与 `<query>` 匹配的内容，并选择其中一处命中显示，优先选取在可用长度范围内包含更多查询词的内容。

片段模式下，`ts_headline` 会查找所有命中点，并将每处命中扩展为不超过 `MaxWords` 单词的片段，优先选取包含更多查询词的片段，并尽可能扩展片段以包含上下文。该模式更适合展示分布较广的命中，或需要显示多个命中点的场景。

无论哪种模式，如果未找到匹配项，则返回文档开头 `MinWords` 数量的词作为默认摘要。

示例：

```sql
SELECT ts_headline('english',
  'The most common type of search
is to find all documents containing given query terms
and return them in order of their similarity to the
query.',
  to_tsquery('english', 'query & similarity'));
                        ts_headline
------------------------------------------------------------
 containing given <b>query</b> terms                       +
 and return them in order of their <b>similarity</b> to the+
 <b>query</b>.
```

```sql
SELECT ts_headline('english',
  'Search terms may occur
many times in a document,
requiring ranking of the search matches to decide which
occurrences to display in the result.',
  to_tsquery('english', 'search & term'),
  'MaxFragments=10, MaxWords=7, MinWords=3, StartSel=<<, StopSel=>>');
                        ts_headline
------------------------------------------------------------
 <<Search>> <<terms>> may occur                            +
 many times ... ranking of the <<search>> matches to decide
```

`ts_headline` 使用的是原始文档文本，而不是 `tsvector` 提取结果，因此运行速度较慢，建议谨慎使用。
