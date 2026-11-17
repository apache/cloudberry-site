---
title: ltree
---

# ltree

The `ltree` module implements a data type named `ltree` that you can use to represent labels of data stored in a hierarchical tree-like structure. The module also provides extensive facilities for searching through label trees.

The Apache Cloudberry `ltree` module is based on the PostgreSQL `ltree` module. See [MPP considerations](#mpp-considerations) for the difference.

## Install and register the module

`ltree` is not part of the default build targets (`make` and `make install`) of Apache Cloudberry. If `CREATE EXTENSION` reports that the extension is not available, build and install the module from the Apache Cloudberry source tree that your installation was configured from:

```shell
make -C contrib/ltree install
```

The module files must be present on every host of the cluster (coordinator, standby coordinator, and all segment hosts). The module is also installed by `make install-world`.

Then register the extension in each database in which you want to use it:

```sql
CREATE EXTENSION ltree;
```

## MPP considerations

The extension does not provide a hash operator class for the `ltree` data type. For this reason, you cannot use an `ltree` column as the distribution key of a table. A table whose only column is of type `ltree` is created with random distribution.

## Module documentation

See [ltree](https://www.postgresql.org/docs/14/ltree.html) in the PostgreSQL documentation for details about the data types, operators, and functions that this module defines.
