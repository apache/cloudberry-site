---
title: psql 支持
---

# psql 支持

`psql` 命令行工具提供了一个元命令，用于显示 Apache Cloudberry 全文搜索配置的相关信息。

你可以使用以下命令集，在 `psql` 中查询全文搜索配置对象的信息：

```sql
\dF{d,p,t}[+] [PATTERN]
```

其中，可选的 `+` 表示显示更详细的信息。

参数 `PATTERN` 是可选的，可以指定一个文本搜索对象的名称，也可以带上 schema 限定名。如果不提供 `PATTERN`，则会显示所有可见对象的信息。`PATTERN` 也可以是正则表达式，并且可以**分别**指定 schema 名和对象名的匹配模式。下面是一些示例，说明了这一用法：

```sql
=> \dF *fulltext*
       List of text search configurations
 Schema |  Name        | Description
--------+--------------+-------------
 public | fulltext_cfg |
```

```sql
=> \dF *.fulltext*
       List of text search configurations
 Schema   |  Name        | Description
----------+----------------------------
 fulltext | fulltext_cfg |
 public   | fulltext_cfg |
```

可用的命令如下：

`\dF[+] [PATTERN]`: Lists text search configurations (add `+` for more detail).

```sql
=> \dF russian
            List of text search configurations
   Schema   |  Name   |            Description             
------------+---------+------------------------------------
 pg_catalog | russian | configuration for russian language

=> \dF+ russian
Text search configuration "pg_catalog.russian"
Parser: "pg_catalog.default"
      Token      | Dictionaries 
-----------------+--------------
 asciihword      | english_stem
 asciiword       | english_stem
 email           | simple
 file            | simple
 float           | simple
 host            | simple
 hword           | russian_stem
 hword_asciipart | english_stem
 hword_numpart   | simple
 hword_part      | russian_stem
 int             | simple
 numhword        | simple
 numword         | simple
 sfloat          | simple
 uint            | simple
 url             | simple
 url_path        | simple
 version         | simple
 word            | russian_stem
```

`\dFd[+] [PATTERN]`：列出文本搜索字典（添加 `+` 以获取更多详细信息）。

```sql
=> \dFd
                            List of text search dictionaries
   Schema   |      Name       |                        Description                        
------------+-----------------+-----------------------------------------------------------
 pg_catalog | arabic_stem     | snowball stemmer for arabic language
 pg_catalog | danish_stem     | snowball stemmer for danish language
 pg_catalog | dutch_stem      | snowball stemmer for dutch language
 pg_catalog | english_stem    | snowball stemmer for english language
 pg_catalog | finnish_stem    | snowball stemmer for finnish language
 pg_catalog | french_stem     | snowball stemmer for french language
 pg_catalog | german_stem     | snowball stemmer for german language
 pg_catalog | hungarian_stem  | snowball stemmer for hungarian language
 pg_catalog | indonesian_stem | snowball stemmer for indonesian language
 pg_catalog | irish_stem      | snowball stemmer for irish language
 pg_catalog | italian_stem    | snowball stemmer for italian language
 pg_catalog | lithuanian_stem | snowball stemmer for lithuanian language
 pg_catalog | nepali_stem     | snowball stemmer for nepali language
 pg_catalog | norwegian_stem  | snowball stemmer for norwegian language
 pg_catalog | portuguese_stem | snowball stemmer for portuguese language
 pg_catalog | romanian_stem   | snowball stemmer for romanian language
 pg_catalog | russian_stem    | snowball stemmer for russian language
 pg_catalog | simple          | simple dictionary: just lower case and check for stopword
 pg_catalog | spanish_stem    | snowball stemmer for spanish language
 pg_catalog | swedish_stem    | snowball stemmer for swedish language
 pg_catalog | tamil_stem      | snowball stemmer for tamil language
 pg_catalog | turkish_stem    | snowball stemmer for turkish language
```

`\dFp[+] [PATTERN]`：列出文本搜索解析器（添加 `+` 以获取更多详细信息）。

```sql
=> \dFp
        List of text search parsers
   Schema   |  Name   |     Description     
------------+---------+---------------------
 pg_catalog | default | default word parser
=> \dFp+
    Text search parser "pg_catalog.default"
     Method      |    Function    | Description 
-----------------+----------------+-------------
 Start parse     | prsd_start     | 
 Get next token  | prsd_nexttoken | 
 End parse       | prsd_end       | 
 Get headline    | prsd_headline  | 
 Get token types | prsd_lextype   | 

        Token types for parser "pg_catalog.default"
   Token name    |               Description                
-----------------+------------------------------------------
 asciihword      | Hyphenated word, all ASCII
 asciiword       | Word, all ASCII
 blank           | Space symbols
 email           | Email address
 entity          | XML entity
 file            | File or path name
 float           | Decimal notation
 host            | Host
 hword           | Hyphenated word, all letters
 hword_asciipart | Hyphenated word part, all ASCII
 hword_numpart   | Hyphenated word part, letters and digits
 hword_part      | Hyphenated word part, all letters
 int             | Signed integer
 numhword        | Hyphenated word, letters and digits
 numword         | Word, letters and digits
 protocol        | Protocol head
 sfloat          | Scientific notation
 tag             | XML tag
 uint            | Unsigned integer
 url             | URL
 url_path        | URL path
 version         | Version number
 word            | Word, all letters
(23 rows)
```

`\dFt[+] [PATTERN]`：列出文本搜索模板（添加 `+` 以获取更多详细信息）。

```sql
=> \dFt
                           List of text search templates
   Schema   |   Name    |                        Description                        
------------+-----------+-----------------------------------------------------------
 pg_catalog | ispell    | ispell dictionary
 pg_catalog | simple    | simple dictionary: just lower case and check for stopword
 pg_catalog | snowball  | snowball stemmer
 pg_catalog | synonym   | synonym dictionary: replace word by its synonym
 pg_catalog | thesaurus | thesaurus dictionary: phrase by phrase substitution
```
