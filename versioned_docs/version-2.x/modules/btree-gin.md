---
title: btree_gin
---

# btree_gin

The `btree_gin` module provides sample generalized inverted index (GIN) operator classes that implement B-tree equivalent behavior for a number of data types.

The Apache Cloudberry `btree_gin` module is equivalent to the PostgreSQL `btree_gin` module. There are no MPP-specific considerations for the module.

## Install and register the module

`btree_gin` is built and installed by a default Apache Cloudberry build. Register the extension in each database in which you want to use it:

```sql
CREATE EXTENSION btree_gin;
```

## Module documentation

See [btree_gin](https://www.postgresql.org/docs/14/btree-gin.html) in the PostgreSQL documentation for the list of supported data types and usage examples.
