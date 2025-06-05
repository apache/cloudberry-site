---
title: 测试与调试全文搜索
---

# 测试与调试全文搜索

本文介绍了 Apache Cloudberry 提供的用于测试和调试搜索配置，或其中所指定的解析器与字典的函数。

自定义文本搜索配置的行为有时可能会令人困惑。本节介绍的函数可用于测试文本搜索相关对象。你既可以测试完整的搜索配置，也可以单独测试解析器和字典。

本节包括以下子主题：

- [配置测试](#配置测试)
- [解析器测试](#解析器测试)
- [字典测试](#字典测试)

## 配置测试

函数 `ts_debug` 可以方便地测试文本搜索配置的行为。

```sql
ts_debug([<config> regconfig, ] <document> text,
         OUT <alias> text,
         OUT <description> text,
         OUT <token> text,
         OUT <dictionaries> regdictionary[],
         OUT <dictionary> regdictionary,
         OUT <lexemes> text[])
         returns setof record
```

`ts_debug` 会显示指定配置下，解析器如何对 `document` 拆词，以及各个词如何被配置中的字典处理。它使用 `config` 参数指定的配置，如果未提供该参数，则使用 `default_text_search_config`。

`ts_debug` 对文本中解析出的每个 token 返回一行记录。每行包含以下列：

- `alias text` — token 类型的简写名称
- `description text` — token 类型的描述
- `token text` — 原始 token 字符串
- `dictionaries regdictionary[]` — 当前配置下，该 token 类型对应的字典列表
- `dictionary regdictionary` — 实际识别该 token 的字典，如果没有识别则为 `NULL`
- `lexemes text[]` — 被识别后生成的词元（lexeme），如果没有识别则为 `NULL`；若为 `{}` 表示是被识别为停用词（stop word）

以下是一个简单示例：

```sql
SELECT * FROM ts_debug('english', 'a fat  cat sat on a mat - it ate a fat rats');
   alias   |   description   | token |  dictionaries  |  dictionary  | lexemes 
-----------+-----------------+-------+----------------+--------------+---------
 asciiword | Word, all ASCII | a     | {english_stem} | english_stem | {}
 blank     | Space symbols   |       | {}             |              | 
 asciiword | Word, all ASCII | fat   | {english_stem} | english_stem | {fat}
 blank     | Space symbols   |       | {}             |              | 
 asciiword | Word, all ASCII | cat   | {english_stem} | english_stem | {cat}
 blank     | Space symbols   |       | {}             |              | 
 asciiword | Word, all ASCII | sat   | {english_stem} | english_stem | {sat}
 blank     | Space symbols   |       | {}             |              | 
 asciiword | Word, all ASCII | on    | {english_stem} | english_stem | {}
 blank     | Space symbols   |       | {}             |              | 
 asciiword | Word, all ASCII | a     | {english_stem} | english_stem | {}
 blank     | Space symbols   |       | {}             |              | 
 asciiword | Word, all ASCII | mat   | {english_stem} | english_stem | {mat}
 blank     | Space symbols   |       | {}             |              | 
 blank     | Space symbols   | -   | {}             |              | 
 asciiword | Word, all ASCII | it    | {english_stem} | english_stem | {}
 blank     | Space symbols   |       | {}             |              | 
 asciiword | Word, all ASCII | ate   | {english_stem} | english_stem | {ate}
 blank     | Space symbols   |       | {}             |              | 
 asciiword | Word, all ASCII | a     | {english_stem} | english_stem | {}
 blank     | Space symbols   |       | {}             |              | 
 asciiword | Word, all ASCII | fat   | {english_stem} | english_stem | {fat}
 blank     | Space symbols   |       | {}             |              | 
 asciiword | Word, all ASCII | rats  | {english_stem} | english_stem | {rat}
```

在更完整的演示中，首先需要为英文语言创建一个 `public.english` 配置和 Ispell 字典：

```sql
CREATE TEXT SEARCH CONFIGURATION public.english ( COPY = pg_catalog.english );

CREATE TEXT SEARCH DICTIONARY english_ispell (
    TEMPLATE = ispell,
    DictFile = english,
    AffFile = english,
    StopWords = english
);

ALTER TEXT SEARCH CONFIGURATION public.english
   ALTER MAPPING FOR asciiword WITH english_ispell, english_stem;
```

```sql
SELECT * FROM ts_debug('public.english', 'The Brightest supernovaes');
   alias   |   description   |    token    |         dictionaries          |   dictionary   |   lexemes   
-----------+-----------------+-------------+-------------------------------+----------------+-------------
 asciiword | Word, all ASCII | The         | {english_ispell,english_stem} | english_ispell | {}
 blank     | Space symbols   |             | {}                            |                | 
 asciiword | Word, all ASCII | Brightest   | {english_ispell,english_stem} | english_ispell | {bright}
 blank     | Space symbols   |             | {}                            |                | 
 asciiword | Word, all ASCII | supernovaes | {english_ispell,english_stem} | english_stem   | {supernova}
```

在这个示例中，词语 `Brightest` 被解析器识别为 `ASCII` 单词（别名为 `asciiword`）。对于这种 token 类型，配置中定义的字典列表是 `english_ispell` 和 `english_stem`。这个单词首先被 `english_ispell` 识别，并被归一化为名词 `bright`。而单词 `supernovaes` 并不在 `english_ispell` 的词库中，因此被传递给下一个字典处理。幸运的是，它被识别了（实际上，`english_stem` 是一个 Snowball 字典，它会尝试处理所有输入词，因此通常被放在字典链的末尾）。

单词 `The` 被 `english_ispell` 字典识别为停用词（详见[停用词](./text-search-dictionaries.md#停用词)），因此不会被索引。空格同样会被丢弃，因为配置中根本没有为空格类型定义任何字典。

你可以通过明确指定要显示的列来简化输出宽度：

```sql
SELECT alias, token, dictionary, lexemes FROM ts_debug('public.english', 'The Brightest supernovaes'); 
  alias    |    token    |   dictionary   |    lexemes 
-----------+-------------+----------------+------------- 
 asciiword | The         | english_ispell | {} 
 blank     |             |                | 
 asciiword | Brightest   | english_ispell | {bright} 
 blank     |             |                | 
 asciiword | supernovaes | english_stem   | {supernova}
```

## 解析器测试

以下函数可以用于直接测试文本搜索解析器的行为。

```sql
ts_parse(<parser_name> text, <document> text,
         OUT <tokid> integer, OUT <token> text) returns setof record
ts_parse(<parser_oid> oid, <document> text,
         OUT <tokid> integer, OUT <token> text) returns setof record
```

`ts_parse` 会解析指定的文档，并返回一组记录，每条记录代表一个解析出的 token。每条记录包括：

- `tokid`：解析器为该 token 分配的类型编号；
- `token`：该 token 的原始文本。

示例：

```sql
SELECT * FROM ts_parse('default', '123 - a number');
 tokid | token
-------+--------
    22 | 123
    12 |
    12 | -
     1 | a
    12 |
     1 | number
```

```sql
ts_token_type(<parser_name> text, OUT <tokid> integer,
              OUT <alias> text, OUT <description> text) returns setof record
ts_token_type(<parser_oid> oid, OUT <tokid> integer,
              OUT <alias> text, OUT <description> text) returns setof record
```

`ts_token_type` 函数会返回一个表格，列出指定解析器能够识别的所有 token 类型。对于每种 token 类型，表格会给出：

- 解析器用于标记该类型 token 的整数编号 `tokid`，
- 配置命令中使用的类型别名 `alias`，
- 该类型的简短描述 `description`。

例如：

```sql
SELECT * FROM ts_token_type('default');
 tokid |      alias      |               description                
-------+-----------------+------------------------------------------
     1 | asciiword       | Word, all ASCII
     2 | word            | Word, all letters
     3 | numword         | Word, letters and digits
     4 | email           | Email address
     5 | url             | URL
     6 | host            | Host
     7 | sfloat          | Scientific notation
     8 | version         | Version number
     9 | hword_numpart   | Hyphenated word part, letters and digits
    10 | hword_part      | Hyphenated word part, all letters
    11 | hword_asciipart | Hyphenated word part, all ASCII
    12 | blank           | Space symbols
    13 | tag             | XML tag
    14 | protocol        | Protocol head
    15 | numhword        | Hyphenated word, letters and digits
    16 | asciihword      | Hyphenated word, all ASCII
    17 | hword           | Hyphenated word, all letters
    18 | url_path        | URL path
    19 | file            | File or path name
    20 | float           | Decimal notation
    21 | int             | Signed integer
    22 | uint            | Unsigned integer
    23 | entity          | XML entity
```

## 字典测试

可以使用 `ts_lexize` 函数测试字典的行为。

```sql
ts_lexize(*dictreg* dictionary, *token* text) returns text[]
```

- 如果输入的 `*token*` 被字典识别，`ts_lexize` 会返回一个词元（lexeme）数组。
- 如果被识别但是停用词，则返回一个空数组。
- 如果是未知单词，则返回 `NULL`。

示例：

```sql
SELECT ts_lexize('english_stem', 'stars');
 ts_lexize
-----------
 {star}

SELECT ts_lexize('english_stem', 'a');
 ts_lexize
-----------
 {}
```

:::note 注意
`ts_lexize` 函数期望的输入是一个单一 token，而不是一整段文本。下面这个例子可能会引起混淆：

```sql
SELECT ts_lexize('thesaurus_astro','supernovae stars') is null;
 ?column?
----------
 t
```

:::

虽然词典 `thesaurus_astro` 识别短语 `supernovae stars`，但 `ts_lexize` 并不会解析整段输入文本，而是把它当成一个完整的 token，因此会失败。要测试这类词典，请使用 `plainto_tsquery` 或 `to_tsvector`，例如：

```sql
SELECT plainto_tsquery('supernovae stars');
 plainto_tsquery
-----------------
 'sn'
```
