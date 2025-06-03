---
title: 文本搜索字典
---

# 文本搜索字典

Apache Cloudberry 的全文搜索解析器生成的词元（token）会依次传递给一系列字典，用于生成标准化的术语，即“词素”（lexeme）。可使用不同类型的字典，以适应不同语言并按需对词元进行过滤和转换。

本节包含以下子主题：

- [关于文本搜索字典](#关于文本搜索字典)
- [停用词](#停用词stop-words)
- [简单字典](#simple-字典)
- [同义词字典](#同义词字典synonym-dictionary)
- [词库字典（thesaurus）](#词库字典thesaurus-dictionary)
- [Ispell 字典](#ispell-字典)
- [SnowBall 字典](#snowball-字典)

## 关于文本搜索字典

字典的作用是过滤掉不应参与搜索的词（即停用词），并将词语标准化，使相同词的不同派生形式能匹配在一起。标准化后的词称为词素（lexeme）。除了提升搜索质量，词的标准化和停用词移除还能减少 `tsvector` 表示文档时的大小，从而提高性能。标准化未必具备语言学含义，更多取决于应用语义。

一些标准化示例：

- 语言层面：Ispell 字典尝试将输入词还原为标准形式；词干提取（stemmer）字典会去除词尾；
- URL 标准化：可将等价的链接转换为统一形式，例如：
    - `http://www.pgsql.ru/db/mw/index.html`
    - `http://www.pgsql.ru/db/mw/`
    - `http://www.pgsql.ru/db/../db/mw/index.html`
- 颜色名称可转换为十六进制值，如：`red`, `green`, `blue`, `magenta` → `FF0000`, `00FF00`, `0000FF`, `FF00FF`
- 如果索引的是数字，可去除小数部分以减少取值范围，例如：`3.14159265359`、`3.1415926` 和 `3.14` 在只保留两位小数时都会标准化为相同值。

一个字典程序接收词元作为输入，返回以下几种结果之一：

- 如果该词元在字典中已知，返回一个词素数组（注意：一个词元可能产生多个词素）；
- 返回一个带有 `TSL_FILTER` 标志的单个词素，表示将词元替换为一个新的词元，并传递给后续字典（此类字典称为 *过滤字典*）；
- 如果该词元是已知的停用词，返回空数组；
- 如果字典无法识别该词元，返回 `NULL`。

Apache Cloudberry 为多种语言预定义了字典模板，并允许基于模板创建自定义字典。如果现有模板不适用，也可以创建新的模板，详见 Apache Cloudberry 源码包的 `contrib/` 目录中的示例。

文本搜索配置将解析器与字典集合组合起来，用于处理解析器返回的不同类型的词元。配置为解析器的每一种词元类型指定一个字典列表。当解析器识别到某个词元时，会按配置顺序依次查询字典：

- 一旦某个字典识别出该词元（即返回非 NULL），就停止继续；
- 如果识别结果是停用词，或所有字典都未能识别该词元，该词元将被丢弃，不再索引或参与搜索；
- 如果某个字典是过滤字典，并返回了一个新词元，则这个新词元会继续传递给后续字典处理。

配置字典列表时的一般规则是：先放最专用、最严格的字典，再放通用字典，最后放最宽松的字典，如 Snowball stemmer 或 `simple` 字典（它能识别所有词元）。例如，针对天文学搜索（配置名为 `astro_en`），可以为 `asciiword` 类型设置如下字典链：

```sql
ALTER TEXT SEARCH CONFIGURATION astro_en
    ADD MAPPING FOR asciiword WITH astrosyn, english_ispell, english_stem;
```

过滤字典可以放在链中任意位置，但不能放在最后，否则不起作用。它们适合用于对词元进行部分标准化，简化后续字典的处理任务。例如，可用过滤字典去除字符中的重音符号，类似于 [`unaccent`](https://www.postgresql.org/docs/14/unaccent.html) 模块的功能。

## 停用词（Stop words）

停用词是那些在几乎所有文档中都出现、但对搜索结果没有区分价值的高频词。因此，在全文搜索中可以忽略这些词。例如，几乎每篇英文文档中都有 `a` 和 `the` 这样的词，所以没有必要将它们写入索引。

不过，停用词会影响 `tsvector` 中的位置编号，从而间接影响文档的排名计算：

```sql
SELECT to_tsvector('english', 'in the list of stop words');
        to_tsvector
----------------------------
 'list':3 'stop':5 'word':6
```

上例中，位置 1、2 和 4 消失了，就是因为这些位置的词是停用词。包含和不包含停用词的文本，在排名计算上的差异明显：

```sql
SELECT ts_rank_cd (to_tsvector('english', 'in the list of stop words'), to_tsquery('list & stop'));
 ts_rank_cd
------------
       0.05

SELECT ts_rank_cd (to_tsvector('english', 'list stop words'), to_tsquery('list & stop'));
 ts_rank_cd
------------
        0.1
```

是否将某个词视为停用词，由具体的字典决定。例如，`ispell` 字典会先将词进行标准化，再检查是否为停用词；而 `Snowball` 词干提取器会先查停用词列表。两者行为不同，是为了尽可能减少干扰项。

## simple 字典

`simple` 模板的工作方式是将输入词元转换为小写，并在停用词文件中查找。如果在文件中找到该词，则返回空数组，表示该词被丢弃；如果没找到，就返回小写形式，作为标准化后的词素。

也可以配置字典，在不是停用词时返回 `NULL`，让这个词元传递给下一个字典处理。

以下是一个使用 `simple` 模板定义字典的示例：

```sql
CREATE TEXT SEARCH DICTIONARY public.simple_dict (
    TEMPLATE = pg_catalog.simple,
    STOPWORDS = english
);
```

这里的 `english` 是一个停用词文件的基础名，完整文件名是 `$SHAREDIR/tsearch_data/english.stop`，其中 `$SHAREDIR` 是 Apache Cloudberry 的共享数据目录，通常为 `/usr/local/cloudberry-db-<version>/share/postgresql`。如果不确定路径，可以执行 `pg_config --sharedir` 查看。

该文件的格式是一行一个词，忽略空行和行尾空格，自动将大写转换为小写，但不会做其他处理。

测试该字典的行为：

```sql
SELECT ts_lexize('public.simple_dict', 'YeS');
 ts_lexize
-----------
 {yes}

SELECT ts_lexize('public.simple_dict', 'The');
 ts_lexize
-----------
 {}
```

你也可以选择在词不在停用词文件中时返回 `NULL`，而不是返回小写形式。只需将字典的 `Accept` 参数设为 `false`：

```sql
ALTER TEXT SEARCH DICTIONARY public.simple_dict ( Accept = false );

SELECT ts_lexize('public.simple_dict', 'YeS');
 ts_lexize
-----------
 {yes}

SELECT ts_lexize('public.simple_dict', 'The');
 ts_lexize
-----------
 {}
```

当使用默认的 `Accept = true` 设置时，这种字典只适合放在字典链的最后一个位置，因为它不会将任何词元传递给后续字典。而当 `Accept = false` 时，该字典必须位于前面，并且后面必须至少有一个字典。

:::caution 小心
大多数类型的字典都依赖配置文件，比如停用词文件。这些文件 *必须* 使用 UTF-8 编码保存。如果数据库编码不同，系统会在读取时自动进行转换。

一般来说，一个数据库会话只会在首次使用某个字典时读取一次字典文件。如果修改了字典文件，而希望当前会话立刻加载更新内容，可以执行一次 `ALTER TEXT SEARCH DICTIONARY` 命令。这条命令可以不实际修改任何参数，仅用于强制刷新配置。
:::

## 同义词字典（Synonym dictionary）

该字典模板用于创建可以将一个词替换为其同义词的字典。不支持短语匹配——如果需要处理短语，应使用同义词库模板（参见 [Thesaurus Dictionary](#词库字典thesaurus-dictionary)）。

同义词字典可以用于解决语言处理中的一些问题。例如，为了避免英文词干提取器将 "Paris" 错误地还原为 "pari"，只需在同义词文件中添加一行 `Paris paris`，并将该字典放在 `english_stem` 字典之前。例如：

```sql
SELECT * FROM ts_debug('english', 'Paris');
   alias   |   description   | token |  dictionaries  |  dictionary  | lexemes 
-----------+-----------------+-------+----------------+--------------+---------
 asciiword | Word, all ASCII | Paris | {english_stem} | english_stem | {pari}

CREATE TEXT SEARCH DICTIONARY my_synonym (
    TEMPLATE = synonym,
    SYNONYMS = my_synonyms
);

ALTER TEXT SEARCH CONFIGURATION english
    ALTER MAPPING FOR asciiword
    WITH my_synonym, english_stem;

SELECT * FROM ts_debug('english', 'Paris');
   alias   |   description   | token |       dictionaries        | dictionary | lexemes 
-----------+-----------------+-------+---------------------------+------------+---------
 asciiword | Word, all ASCII | Paris | {my_synonym,english_stem} | my_synonym | {paris}
```

`synonym` 模板唯一必需的参数是 `SYNONYMS`，它指定配置文件的基础名，上例中为 `my_synonyms`。配置文件的完整路径将是 `$SHAREDIR/tsearch_data/my_synonyms.syn`（其中 `$SHAREDIR` 是 Apache Cloudberry 安装目录中的共享数据目录）。文件格式是一行一个词项，词项和其同义词之间用空格分隔。文件中的空行和尾部空格会被忽略。

该模板还支持一个可选参数 `CaseSensitive`，默认值为 `false`。当设置为 `false` 时，词项和输入词元都将转换为小写后再比较；当设置为 `true` 时，二者将按原样大小写敏感地进行比较。

你也可以在配置文件中某个同义词的末尾添加星号（`*`），表示该同义词是一个前缀。此星号在 `to_tsvector()` 中会被忽略，但在 `to_tsquery()` 中则会作为前缀匹配标记处理（参见 [解析查询](./control-text-search.md#解析查询)）。假设你在 `$SHAREDIR/tsearch_data/synonym_sample.syn` 文件中添加了以下内容：

```sql
postgres pgsql postgresql pgsql postgre pgsql 
gogle googl 
indices index*
```

那么查询会得到如下结果：

```sql
mydb=# CREATE TEXT SEARCH DICTIONARY syn (template=synonym, synonyms='synonym_sample');
mydb=# SELECT ts_lexize('syn', 'indices');
 ts_lexize
-----------
 {index}
(1 row)

mydb=# CREATE TEXT SEARCH CONFIGURATION tst (copy=simple);
mydb=# ALTER TEXT SEARCH CONFIGURATION tst ALTER MAPPING FOR asciiword WITH syn;
mydb=# SELECT to_tsvector('tst', 'indices');
 to_tsvector
-------------
 'index':1
(1 row)

mydb=# SELECT to_tsquery('tst', 'indices');
 to_tsquery
------------
 'index':*
(1 row)

mydb=# SELECT 'indexes are very useful'::tsvector;
            tsvector             
---------------------------------
 'are' 'indexes' 'useful' 'very'
(1 row)

mydb=# SELECT 'indexes are very useful'::tsvector @@ to_tsquery('tst', 'indices');
 ?column?
----------
 t
(1 row)
```

## 词库字典（thesaurus dictionary）

词库字典（有时缩写为 TZ）是一种词汇集合，其中包含词语和短语之间的关系信息，例如上位词（BT）、下位词（NT）、首选词、非首选词、相关词等。

简单来说，词库字典会将所有非首选词替换为一个首选词，并可以选择性地保留原始词语用于索引。Apache Cloudberry 当前的词库字典实现是在同义词字典的基础上扩展而来，增加了对 *短语* 的支持。词库字典需要一个配置文件，格式如下：

```sql
# 这是注释
示例词语 : 索引词语
更多示例词语 : 更多索引词语
...
```

其中，冒号（`:`）用作短语与替换内容之间的分隔符。

词库字典会使用一个 *子字典*（在字典配置中指定）对输入文本进行归一化处理，然后再进行短语匹配。一个词库字典只能指定一个子字典。如果子字典无法识别某个词，就会报错。此时应移除该词，或者在子字典中添加对该词的支持。你可以在索引词前加上星号（`*`），表示不对其应用子字典处理，但所有的示例词必须被子字典识别。

当多个短语匹配输入内容时，词库字典会优先选择最长匹配。如果长度相同，则使用最后一个定义。

子字典识别的停用词无法直接指定，但可以使用问号（`?`）标记任何停用词可以出现的位置。例如，假设子字典认为 `a` 和 `the` 是停用词：

```sql
? one ? two : swsw
```

可以匹配 `a one the two` 和 `the one a two`，都会被替换为 `swsw`。

因为词库字典能识别短语，它需要记住处理状态，并与解析器配合使用。词库字典通过词元类型来判断是否继续处理一个词，或停止匹配。如果配置不当，会导致匹配失败。例如，如果词库字典只配置用于处理 `asciiword` 类型词项，那么定义 `one 7` 将无法生效，因为 `7` 是 `uint` 类型的词元，不属于词库字典的处理范围。

:::caution 小心
词库字典在索引阶段使用，因此任何配置参数的变更都需要重新索引。相比之下，大多数其他类型的字典在添加或移除停用词时通常不需要重新索引。
:::

**词库字典配置**

要定义一个新的词库字典，使用 `thesaurus` 模板。例如：

```sql
CREATE TEXT SEARCH DICTIONARY thesaurus_simple (
    TEMPLATE = thesaurus,
    DictFile = mythesaurus,
    Dictionary = pg_catalog.english_stem
);
```

其中：

- `thesaurus_simple` 是新字典的名称；
- `mythesaurus` 是词库配置文件的基础名（完整路径为 `$SHAREDIR/tsearch_data/mythesaurus.ths`，其中 `$SHAREDIR` 是安装目录中的共享数据路径）；
- `pg_catalog.english_stem` 是用于归一化的子字典（这里使用 Snowball 的英文词干提取器）。注意子字典本身也可能有配置项（如停用词列表），此处未展示。

接下来，可以将 `thesaurus_simple` 这个词库字典绑定到指定的词元类型上，例如：

```sql
ALTER TEXT SEARCH CONFIGURATION russian
    ALTER MAPPING FOR asciiword, asciihword, hword_asciipart
    WITH thesaurus_simple;
```

**词库示例**

以下是一个简单的天文学词库 `thesaurus_astro`，其中包含一些天文学相关的短语组合：

```sql
supernovae stars : sn
crab nebulae : crab
```

接下来，我们创建一个字典，并将部分词元类型绑定到这个天文学词库和英文词干提取器上：

```sql
CREATE TEXT SEARCH DICTIONARY thesaurus_astro (
    TEMPLATE = thesaurus,
    DictFile = thesaurus_astro,
    Dictionary = english_stem
);

ALTER TEXT SEARCH CONFIGURATION russian
    ALTER MAPPING FOR asciiword, asciihword, hword_asciipart
    WITH thesaurus_astro, english_stem;
```

现在可以测试词库的实际效果。`ts_lexize` 不太适合用来测试词库，因为它将整个输入视为一个单独的词元。推荐使用 `plainto_tsquery` 和 `to_tsvector`，它们会将输入字符串拆分成多个词元：

```sql
SELECT plainto_tsquery('supernova star');
 plainto_tsquery
-----------------
 'supernova' & 'star'

SELECT to_tsvector('supernova star');
 to_tsvector
-------------
 'star':2 'supernova':1
```

原则上，也可以使用 `to_tsquery`，只需要将参数加上引号：

```sql
SELECT to_tsquery('''supernova star''');
 to_tsquery
------------
 'supernova' & 'star'
```

注意，在 `thesaurus_astro` 中定义了 `supernovae stars`，它能够匹配 `supernova star`，这是因为词库中指定了 `english_stem` 作为词干提取器，去掉了复数形式中的 `e` 和 `s`。

如果你希望在索引中同时保留原始短语和替换后的词，只需将原始短语也写在定义的右侧即可：

```sql
supernovae stars : sn supernovae stars

SELECT plainto_tsquery('supernova star');
       plainto_tsquery
-----------------------------
 'supernova' & 'star'
```

## Ispell 字典

Ispell 字典模板支持形态学词典，可以将一个词的多种语言形式归一为同一个词元。例如，英文 Ispell 字典可以匹配搜索词 `bank` 的所有词形变化，如 `banking`、`banked`、`banks`、`banks'` 和 `bank's`。

Apache Cloudberry 的标准发行版不包含任何 Ispell 配置文件。但可以从 [Ispell 官方网站](https://www.cs.hmc.edu/~geoff/ispell.html) 获取多种语言的词典。此外，系统还支持一些更新的字典文件格式，如 [MySpell](http://en.wikipedia.org/wiki/MySpell)（OpenOffice 2.0.1 以下版本）和 [Hunspell](http://sourceforge.net/projects/hunspell/)（OpenOffice 2.0.2 及以上版本）。你也可以在 [OpenOffice Wiki](http://wiki.services.openoffice.org/wiki/Dictionaries) 上找到大量的词典文件。

要创建一个 Ispell 字典，请按以下步骤操作：

1. 下载字典配置文件。OpenOffice 的扩展文件通常以 `.oxt` 结尾。你需要从中提取 `.aff` 和 `.dic` 文件，并将它们分别重命名为 `.affix` 和 `.dict`。有些词典文件可能还需要将字符集转换为 UTF-8，例如处理挪威语词典时可以使用以下命令：

    ```bash
    iconv -f ISO_8859-1 -t UTF-8 -o nn_no.affix nn_NO.aff
    iconv -f ISO_8859-1 -t UTF-8 -o nn_no.dict nn_NO.dic
    ```

2. 将这些文件复制到 `$SHAREDIR/tsearch_data` 目录下。
3. 使用以下 SQL 命令将文件加载到 PostgreSQL 中：

    ```sql
    CREATE TEXT SEARCH DICTIONARY english_hunspell (
        TEMPLATE = ispell,
        DictFile = en_us,
        AffFile = en_us,
        Stopwords = english);
    ```

其中，`DictFile`、`AffFile` 和 `Stopwords` 指定了字典文件、词缀规则文件和停用词文件的基础名称。停用词文件的格式与前面介绍的 `simple` 字典类型相同。其他文件的格式可参考上面列出的网站。

Ispell 字典通常只识别有限的词汇，因此建议在其后再配置一个识别范围更广的字典，例如 Snowball 字典，用来识别其他无法覆盖的词。

Ispell 的 `.affix` 文件结构如下：

```sql
prefixes
flag *A:
    .           >   RE      # 如 enter > reenter
suffixes
flag T:
    E           >   ST      # 如 late > latest
    [^AEIOU]Y   >   -Y,IEST # 如 dirty > dirtiest
    [AEIOU]Y    >   EST     # 如 gray > grayest
    [^EY]       >   EST     # 如 small > smallest
```

`.dict` 文件结构如下：

```
lapse/ADGRS
lard/DGRS
large/PRTY
lark/MRS
```

`.dict` 文件的格式为：

```
基础词/词缀类别标记
```

在 `.affix` 文件中，每条词缀规则的格式如下：

```
条件 > [-删除的字母,] 添加的词缀
```

其中，`条件` 的格式类似正则表达式，可以使用 `[字符组]` 和 `[^排除组]`。例如，`[AEIOU]Y` 表示一个词以 "y" 结尾，倒数第二个字母是 "a"、"e"、"i"、"o" 或 "u"；`[^EY]` 表示结尾不是 "e" 或 "y"。

Ispell 字典支持复合词的拆分和识别，这是一项非常实用的功能。你需要在词缀文件中使用如下语句启用该功能，并指定用于标记可参与复合的词的特殊标志：

```
compoundwords  controlled z
```

以下是挪威语的使用示例：

```
SELECT ts_lexize('norwegian_ispell', 'overbuljongterningpakkmesterassistent');
   {over,buljong,terning,pakk,mester,assistent}
SELECT ts_lexize('norwegian_ispell', 'sjokoladefabrikk');
   {sjokoladefabrikk,sjokolade,fabrikk}
```

MySpell 格式是 Hunspell 的子集。Hunspell 的 `.affix` 文件结构如下：

```
PFX A Y 1
PFX A   0     re         .
SFX T N 4
SFX T   0     st         e
SFX T   y     iest       [^aeiou]y
SFX T   0     est        [aeiou]y
SFX T   0     est        [^ey]
```

每组词缀规则的第一行是头部信息，后续是规则条目。每条规则包括以下字段：

- 参数类型（PFX 表示前缀，SFX 表示后缀）
- 标志（即词缀类别的名称）
- 删除的字符（前缀从词首删除，后缀从词尾删除）
- 添加的词缀
- 条件（格式类似正则表达式）

`.dict` 文件格式与 Ispell 的 `.dict` 文件类似，例如：

```
larder/M
lardy/RT
large/RSPMYT
largehearted
```

:::note 注意
MySpell 不支持复合词，而 Hunspell 支持较为复杂的复合词处理。但目前 Apache Cloudberry 仅实现了 Hunspell 的基础复合词功能。
:::

## SnowBall 字典

SnowBall 字典模板基于 Martin Porter 的项目，他是广泛使用的英文词干提取算法 Porter stemmer 的作者。Snowball 项目目前已为多种语言提供词干提取算法（可参考 [Snowball 官网](http://snowballstem.org/)）。每种算法都能将特定语言中的词语变体还原为统一的词干形式。

SnowBall 字典需要指定 `language` 参数，以确定使用哪种词干提取器；还可以选择性地指定一个停用词文件，用于排除特定词汇。（Apache Cloudberry 默认的停用词表也是由 Snowball 项目提供的。）例如，以下是一个等效于内建配置的定义：

```sql
CREATE TEXT SEARCH DICTIONARY english_stem (
    TEMPLATE = snowball,
    Language = english,
    StopWords = english
);
```

停用词文件的格式与前文所述一致。

SnowBall 字典能识别所有输入内容，无论是否能够将其简化为词干。因此，它应当放在字典链的最后。若将其放在其他字典前面，会导致词元直接被它处理，不会继续传递给后续字典，从而失去意义。
