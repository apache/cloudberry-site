---
title: fuzzystrmatch
---

# fuzzystrmatch

The `fuzzystrmatch` module provides functions that determine similarities and distance between strings, based on the Soundex, Levenshtein, Metaphone, and Double Metaphone algorithms.

The Apache Cloudberry `fuzzystrmatch` module is equivalent to the PostgreSQL `fuzzystrmatch` module. There are no MPP-specific considerations for the module.

## Install and register the module

`fuzzystrmatch` is built and installed by a default Apache Cloudberry build. Register the extension in each database in which you want to use it:

```sql
CREATE EXTENSION fuzzystrmatch;
```

## Module documentation

See [fuzzystrmatch](https://www.postgresql.org/docs/14/fuzzystrmatch.html) in the PostgreSQL documentation for details about the individual functions in this module.
