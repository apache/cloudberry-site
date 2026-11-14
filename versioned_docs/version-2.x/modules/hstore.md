---
title: hstore
---

# hstore

The `hstore` module implements the `hstore` data type for storing sets of key/value pairs within a single value. This can be useful in various scenarios, such as rows with many attributes that are rarely examined, or semi-structured data.

The Apache Cloudberry `hstore` module is equivalent to the PostgreSQL `hstore` module. There are no MPP-specific considerations for the module.

## Install and register the module

`hstore` is built and installed by a default Apache Cloudberry build. Register the extension in each database in which you want to use it:

```sql
CREATE EXTENSION hstore;
```

## Module documentation

See [hstore](https://www.postgresql.org/docs/14/hstore.html) in the PostgreSQL documentation for details about the data type, operators, and functions that this module defines.
