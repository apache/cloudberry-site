---
title: pg_statistic_ext
---

# pg_statistic_ext

The `pg_statistic_ext` system catalog table holds definitions of extended planner statistics. Each row in this catalog corresponds to a *statistics object* created with [`CREATE STATISTICS`](../../sql-stmts/create-statistics.md).

|column|type|references|description|
|------|----|----------|-----------|
|`oid`|oid| |The object ID|
|`stxrelid`|oid|[pg_class](./pg-class.md).oid | The table containing the columns described by this object |
|`stxname`|name| | The name of the statistics object |
|`stxnamespace`|oid|[pg_namespace](./pg-namespace.md).oid| | The object identifier of the namespace that contains this statistics object |
|`stxowner`|oid|[pg_authid](./pg-authid.md).oid | The owner of the statistics object |
| `stxstattarget` | integer |  | Statistics target for this extended statistics object. Controls the level of detail of statistics collected by ANALYZE for this object. A value of `-1` indicates that the statistics targets of the referenced columns or the system default statistics target should be used. |
|`stxkeys`|ARRAY|[pg_attribute](./pg-attribute.md).oid | An array of attribute numbers, indicating which table columns are covered by this statistics object; for example, a value of `1 3` would mean that the first and the third table columns are covered |
|`stxkind`|ARRAY| | An array containing codes for the enabled statistics kinds; valid values are: `d` for n-distinct statistics, `f` for functional dependency statistics, and `m` for most common values (MCV) list statistics |
| `stxexprs` | pg_node_tree |   |  If the statistics object is defined on expressions, this column stores the parse tree representation of those expressions. If the statistics object is only defined on simple columns (via `stxkeys`), this field will be `NULL`. |

The `pg_statistic_ext` entry is filled in completely during `CREATE STATISTICS`, but the actual statistical values are not computed then. Subsequent `ANALYZE` commands compute the desired values and populate an entry in the [pg_statistic_ext_data](./pg-statistic-ext-data.md) catalog.
