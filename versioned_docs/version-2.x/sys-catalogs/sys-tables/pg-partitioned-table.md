---
title: pg_partitioned_table
---

# pg_partitioned_table

The `pg_partitioned_table` system catalog stores information about how tables are partitioned.

|column|type|references|description|
|------|----|----------|-----------|
|`partrelid`|oid|[pg_class](./pg-class.md).oid|The object identifier of the `pg_class` entry for this partitioned table.|
|`partstrat`|char| | The partitioning strategy: `h` = hash partitioned table, `l` = list partitioned table, `r` = range partitioned table.|
|`partnatts`|smallint| |The number of columns in the partition key.|
|`partdefid`|oid|[pg_class](./pg-class.md).oid |The object identifier of the `pg_class` entry for the default partition of this partitioned table, or zero if this partitioned table does not have a default partition.|
|`partattrs`|int2vector|[pg_attribute](./pg-attribute.).attnum | An array of `partnatts` values that indicate which table columns are part of the partition key. For example, a value of `1 3` would mean that the first and the third table columns make up the partition key. A zero in this array indicates that the corresponding partition key column is an expression, rather than a simple column reference.|
|`partclass`|ARRAY|[pg_opclass](./pg-class.md).oid|For each column in the partition key, contains the object identifier of the operator class to use.|
|`partcollation`|ARRAY|[pg_opclass](./pg-class.md).oid |For each column in the partition key, contains the object identifier of the collation to use for partitioning, or zero if the column is not of a collatable data type.|
|`partexprs`|pg_node_tree| |Expression trees (in `nodeToString()` representation) for partition key columns that are not simple column references. This list contains one element for each zero entry in `partattrs`. Null if all partition key columns are simple references. Apache Cloudberry classic partition syntax does not support specifying an expression in a partition key. |
