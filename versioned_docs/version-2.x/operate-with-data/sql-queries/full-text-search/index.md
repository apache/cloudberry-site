---
title: Full Text Search
---

# Full Text Search

Apache Cloudberry provides data types, functions, operators, index types, and configurations for querying natural language documents.

- **[About Full Text Search](./full-text-search-intro.md)**: This topic provides an overview of Apache Cloudberry full text search, basic text search expressions, configuring, and customizing text search. Apache Cloudberry full text search is compared with Apache Cloudberry Text.
- **[Search Text in Database Tables](./search-text-in-db.md)**: This topic shows how to use text search operators to search database tables and how to create indexes to speed up text searches.
- **[Control Text Search](./control-text-search.md)**: This topic shows how to create search and query vectors, how to rank search results, and how to highlight search terms in the results of text search queries.
- **[Additional Text Search Features](./additional-text-search-features.md)**: Apache Cloudberry has additional functions and operators you can use to manipulate search and query vectors, and to rewrite search queries.
- **[Text Search Parsers](./text-search-parsers.md)**: This topic describes the types of tokens the Apache Cloudberry text search parser produces from raw text.
- **[Text Search Dictionaries](./text-search-dictionaries.md)**: Tokens produced by the Apache Cloudberry full text search parser are passed through a chain of dictionaries to produce a normalized term or "lexeme". Different kinds of dictionaries are available to filter and transform tokens in different ways and for different languages.
- **[Text Search Configuration Example](./text-search-configuration.md)**: This topic shows how to create a customized text search configuration to process document and query text.
- **[Test and Debug Text Search](./test-and-debug-text-search.md)**: This topic introduces the Apache Cloudberry functions you can use to test and debug a search configuration or the individual parser and dictionaries specified in a configuration.
- **[GiST and GIN Indexes for Text Search](./preferred-indexes-for-full-text-search.md)**: This topic describes and compares the Apache Cloudberry index types that are used for full text searching.
- **[psql Support](./text-search-psql-support.md)**: The psql command-line utility provides a meta-command to display information about Apache Cloudberry full text search configurations.
- **[Limitations](./full-text-search-limitations.md)**: This topic lists limitations and maximums for Apache Cloudberry full text search objects.
