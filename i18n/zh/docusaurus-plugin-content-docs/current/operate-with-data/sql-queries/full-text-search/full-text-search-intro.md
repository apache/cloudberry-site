---
title: 全文搜索简介
---

# 全文搜索简介

本文介绍 Apache Cloudberry 的全文搜索功能，包括基本的搜索表达式、配置方式以及自定义方法。

本节包含以下子主题：

- [什么是文档？](#什么是文档)
- [基本文本匹配](#基本文本匹配)
- [配置](#配置)

全文搜索（Full Text Searching，简称“文本搜索”）用于在自然语言的文档中查找满足某个查询条件的内容，并可按与查询的相关性对结果排序。最常见的搜索方式是找出所有包含特定查询词的文档，并按它们与查询的相似度排序返回。

Apache Cloudberry 提供了 `tsvector` 类型来存储预处理后的文档，`tsquery` 类型用于表示查询条件。这两个类型配套了多种函数与运算符，其中最重要的是匹配运算符 `@@`，它在[基本文本匹配](#基本文本匹配)中会详细介绍。你可以通过索引来加速全文搜索（详见[全文搜索的 GiST 与 GIN 索引](./preferred-indexes-for-full-text-search.md)）。

“查询”与“相似度”的定义是灵活且依赖应用场景的。最简单的方式是将查询视为一个词集合，将相似度定义为文档中查询词出现的频率。

Apache Cloudberry 也支持常见文本匹配运算符，如 `~`、`~*`、`LIKE` 和 `ILIKE`，但这些操作符在文档搜索场景中存在明显局限：

- 不支持语言处理，哪怕是英文。例如，正则表达式无法有效处理词形变化，像 `satisfies` 与 `satisfy` 这样的词就无法统一匹配。虽然你可以使用 OR 条件搜索不同的变体，但这既繁琐又容易出错（有些单词可能有上千个变体）。
- 无法对匹配结果进行排序，当结果很多时无法评估其相关性。
- 由于无法使用索引，每次搜索都要扫描所有文档，速度较慢。

通过全文索引，文档可以预处理后存入索引，以便日后快速搜索。预处理过程包括：

- **将文档解析为词元（token）**。解析过程中可以识别不同类型的词元，例如数字、单词、复合词、电子邮件地址等，从而进行差异化处理。理论上，词元的分类可以根据实际应用调整，但通常使用系统预设的分类就已足够。Apache Cloudberry 使用解析器（parser）执行这一步，系统内置标准解析器，也允许创建自定义解析器。
- **将词元转换为词条（lexeme）**。词条是经过标准化处理的词，例如统一大小写、去除英文词尾（如 s、es 等），这样可以把同一词的多种变体归一化，简化查询条件。不需要手动列出所有变体。这个步骤通常也会过滤掉停用词（如英文中的 the、is 等），它们在搜索中无实质作用。简单说，词元是原始的文本片段，词条是认为可用于索引的标准化词汇。Apache Cloudberry 使用词典（dictionary）执行该步骤，系统提供多种标准词典，也可根据需要创建自定义词典。
- **存储优化后的预处理文档**，以便搜索。例如，可以将每个文档表示为一组已排序的词条数组。词条通常还附带位置信息，便于进行邻近度排序，即：查询词集中出现的文档比分散出现的文档排名更高。

词典机制可以精细控制词元的标准化方式。通过配置合适的词典，你可以：

- 定义停用词，使其不被索引。
- 使用 Ispell 将同义词归一为同一个词。
- 使用同义词词典（thesaurus）将短语映射为单一词。
- 使用 Ispell 词典将多个变体映射为标准形式。
- 使用 Snowball 提供的词干提取规则，将变体归为统一形式。

## 什么是文档

在全文搜索系统中，”文档“是搜索的基本单位，例如一篇杂志文章或一封电子邮件。文本搜索引擎需要能够解析文档，并建立词条（关键词）与其所在文档之间的关联关系。后续搜索时，系统正是依赖这些关联来查找包含查询词的文档。

在 Apache Cloudberry 中，文档通常是数据库表中某一行的文本字段，也可能是多个字段拼接而成的组合，有时这些字段可能来自多个表或是运行时动态生成的。换句话说，文档可以由多个部分构造而成用于索引，它本身不一定以完整形式保存在数据库中。例如：

```sql
SELECT title || ' ' ||  author || ' ' ||  abstract || ' ' || body AS document
FROM messages
WHERE mid = 12;

SELECT m.title || ' ' || m.author || ' ' || m.abstract || ' ' || d.body AS document
FROM messages m, docs d
WHERE m.mid = d.did AND m.mid = 12;
```

:::note 注意
上述查询中应使用 `coalesce`，避免某个字段为 `NULL` 时导致整段文档结果为 `NULL`。
:::

另一种做法是将文档以普通文本文件形式保存在文件系统中。此时可以使用数据库存储全文索引并执行搜索操作，再通过某个唯一标识符从文件系统中读取文档。但从数据库外部读取文件需要超级用户权限或特殊函数支持，因此一般不如将数据直接存储在 Apache Cloudberry 中方便。此外，将所有内容保存在数据库中还能轻松获取文档的元数据，辅助索引与展示。

为了进行全文搜索，每个文档必须被转换成预处理格式 `tsvector`。搜索与排序都是基于 `tsvector` 表示进行的，只有在用户需要查看文档内容时才需要取出原始文本。因此，我们常说 `tsvector` 就是文档，尽管它只是完整文档的压缩表示形式。

## 基本文本匹配

在 Apache Cloudberry 中，全文搜索基于匹配运算符 `@@`。当一个 `tsvector`（文档）与一个 `tsquery`（查询）匹配时，返回结果为 `true`。左右参数顺序无关紧要：

```sql
SELECT 'a fat cat sat on a mat and ate a fat rat'::tsvector @@ 'cat & rat'::tsquery;
 ?column?
----------
 t

SELECT 'fat & cow'::tsquery @@ 'a fat cat sat on a mat and ate a fat rat'::tsvector;
 ?column?
----------
 f
```

从这个例子可以看出，`tsquery` 并不只是普通文本，就像 `tsvector` 也不是原始文本一样。`tsquery` 包含的是已标准化的词条（lexeme），并且可以通过 `AND`、`OR`、`NOT` 和 `FOLLOWED BY` 运算符组合多个查询词。可以使用 `to_tsquery`、`plainto_tsquery` 和 `phraseto_query` 等函数将用户输入的文本转换为标准的 `tsquery`；同样，`to_tsvector` 用于解析并标准化文档字符串。实际搜索操作通常会像这样：

```sql
SELECT to_tsvector('fat cats ate fat rats') @@ to_tsquery('fat & rat');
 ?column? 
----------
 t
```

如果写成下面这样，匹配将失败：

```sql
SELECT 'fat cats ate fat rats'::tsvector @@ to_tsquery('fat & rat');
 ?column? 
----------
 f
```

因为 `tsvector` 中的词条被视为已标准化，`rats` 不会再转换为 `rat`，因此无法匹配。

`@@` 运算符也支持直接对 `text` 类型进行匹配，在简单场景中无需显式地将字符串转换为 `tsvector` 或 `tsquery`。支持的变体包括：

```sql
tsvector @@ tsquery
tsquery  @@ tsvector
text @@ tsquery
text @@ text
```

前两种你已经见过。`text @@ tsquery` 相当于 `to_tsvector(x) @@ y`；而 `text @@ text` 等价于 `to_tsvector(x) @@ plainto_tsquery(y)`。

在 `tsquery` 表达式中，`&`（AND）表示两个查询词都必须出现在文档中；`|`（OR）表示至少一个词出现即可；`!`（NOT）表示该词不能出现在文档中。例如，`fat & ! rat` 会匹配那些包含 `fat` 但不包含 `rat` 的文档。

要进行短语搜索，可以使用 `<->`（FOLLOWED BY）运算符，表示两个词必须相邻，且顺序一致。例如：

```sql
SELECT to_tsvector('fatal error') @@ to_tsquery('fatal <-> error');
 ?column? 
----------
 t

SELECT to_tsvector('error is not fatal') @@ to_tsquery('fatal <-> error');
 ?column? 
----------
 f
```

还有更一般形式的 `FOLLOWED BY` 运算符 `<N>`，其中 _N_ 是一个整数，表示两个匹配词条之间的最大间隔。例如，`<1>` 等同于 `<->`，`<2>` 允许中间插入一个其他词，依此类推。`phraseto_tsquery` 函数就使用了这种形式，用于构造能容忍停用词的多词短语查询。例如：

```sql
SELECT phraseto_tsquery('cats ate rats');
       phraseto_tsquery        
-------------------------------
 'cat' <-> 'ate' <-> 'rat'

SELECT phraseto_tsquery('the cats ate the rats');
       phraseto_tsquery        
-------------------------------
 'cat' <-> 'ate' <2> 'rat'
```

有一个比较特殊但有时很有用的用法是，`<0>` 可用于要求两个模式匹配同一个词。

可以使用括号来控制 `tsquery` 运算符的嵌套顺序。没有括号时，运算符的优先级为：`|` 优先级最低，其次是 `&`，然后是 `<->`，最高的是 `!`。

值得注意的是，`AND` / `OR` / `NOT` 运算符在 `FOLLOWED BY` 运算符内部和外部的语义略有不同，因为在 `FOLLOWED BY` 中匹配的确切位置是有意义的。例如，通常 `!x` 会匹配那些完全不包含 `x` 的文档。但 `!x <-> y` 表示 `y` 前面紧邻的词不能是 `x`；如果 `x` 出现在文档其他位置，仍然可以匹配。再比如，`x & y` 只要求文档中都出现了 `x` 和 `y` 即可，但 `(x & y) <-> z` 要求 `x` 和 `y` 匹配在同一个位置，并且紧邻 `z`。这和 `x <-> z & y <-> z` 是不同的，后者匹配的是文档中有两个独立的序列 `x z` 和 `y z`。尽管像 `(x & y) <-> z` 这种写法在 `x` 和 `y` 无法匹配在同一位置时是无效的，但在更复杂的场景中（例如使用前缀匹配），这种写法可能会有实际用途。

## 配置

上面介绍的是一些基本的文本搜索用法。实际上，全文搜索功能还能完成更多工作，比如跳过某些词的索引（停用词）、处理同义词，或者使用更复杂的解析方式（例如不仅按空格分词）。这些高级功能都由文本搜索配置控制。Apache Cloudberry 提供了多种语言的预设配置，也支持用户自定义配置。（使用 psql 的 `dF` 命令可以列出所有可用配置。）

安装时系统会选择一个合适的配置，并在 `postgresql.conf` 中设置 `default_text_search_config`。如果整个集群都使用同一个文本搜索配置，可以直接在 `postgresql.conf` 中设置。如果不同数据库使用不同配置，可通过 `ALTER DATABASE ... SET` 进行设置。如果想在每个会话中单独指定，可以在会话内设置 `default_text_search_config`。

所有依赖文本搜索配置的函数都可以接受一个可选参数 `regconfig`，用于显式指定使用哪一个配置。只有当该参数被省略时，才会使用默认配置 `default_text_search_config`。

为了方便构建自定义配置，Apache Cloudberry 将配置设计为由更简单的数据库对象构成。全文搜索功能涉及以下四种配置相关的数据库对象：

- **文本搜索解析器（text search parsers）**：将文档拆分为词元（token），并为每个词元分类（如单词、数字等）。
- **文本搜索词典（text search dictionaries）**：将词元转换为标准形式（lexeme），并过滤停用词。
- **文本搜索模板（text search templates）**：提供词典背后的实现函数。词典本质上是指定了一个模板及其参数。
- **文本搜索配置（text search configurations）**：指定使用哪个解析器和一组词典，用于处理解析器生成的词元。

解析器和模板是用底层 C 函数构建的，因此开发新的解析器或模板需要 C 编程能力，并且需要超级用户权限才能安装到数据库中。（在 Apache Cloudberry 的 `contrib/` 目录中包含一些附加解析器和模板的示例。）相比之下，词典和配置只是对解析器和模板的组合与参数化，不需要任何特殊权限即可创建。
