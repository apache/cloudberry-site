---
title: pg_aggregate
---

# pg_aggregate

`pg_catalog` 模式中的 `pg_aggregate` 表用于存储聚合函数的相关信息。聚合函数是对一组值（通常是满足查询条件的每一行中某一列的值）进行操作，并从这些值中计算出一个单一结果的函数。常见的聚合函数包括 `sum`、`count` 和 `max`。`pg_aggregate` 表中的每一项都是 `pg_proc` 表中对应项的扩展，其中 `pg_proc` 表记录了聚合函数的名称、输入输出数据类型以及其他与普通函数相似的信息。

|列名|类型|引用|描述|
|----|----|----|----|
|`aggfnoid`|regproc|`pg_proc.oid`|聚合函数的 OID|
|`aggkind`|char| |聚合类型：`n` 表示普通聚合，`o` 表示有序集合聚合，`h` 表示假设集合聚合|
|`aggnumdirectargs`|smallint| |有序集合或假设集合聚合的直接参数数量（非聚合参数），变长参数数组算作一个参数。如果该值等于 `pronargs`，则聚合函数必须是变长的，且变长参数数组同时描述了聚合参数和最终的直接参数。对于普通聚合，此值始终为零。|
|`aggtransfn`|regproc|`pg_proc.oid`|转换函数的 OID|
|`aggfinalfn`|regproc|`pg_proc.oid`|最终函数的 OID（如果不存在则为零）|
|`aggcombinefn`|regproc|`pg_proc.oid`|组合函数的 OID（如果不存在则为零）|
|`aggserialfn`|regproc|`pg_proc.oid`|序列化函数的 OID，用于将转换类型转换为 `bytea`（如果不存在则为零）|
|`aggdeserialfn`|regproc|`pg_proc.oid`|反序列化函数的 OID，用于将 `bytea` 转换回转换类型（如果不存在则为零）|
|`aggmtransfn`|regproc|`pg_proc.oid`|移动聚合模式下的正向转换函数 OID（如果不存在则为零）|
|`aggminvtransfn`|regproc|`pg_proc.oid`|移动聚合模式下的逆向转换函数 OID（如果不存在则为零）|
|`aggmfinalfn`|regproc|`pg_proc.oid`|移动聚合模式下的最终函数 OID（如果不存在则为零）|
|`aggfinalextra`|bool| |如果为 `true`，则向 `aggfinalfn` 传递额外的虚拟参数|
|`aggmfinalextra`|bool| |如果为 `true`，则向 `aggmfinalfn` 传递额外的虚拟参数|
|`aggfinalmodify`|char| |指示 `aggfinalfn` 是否修改转换状态|
|`aggmfinalmodify`|char| |指示 `aggmfinalfn` 是否修改转换状态|
|`aggsortop`|oid|`pg_operator.oid`|相关排序操作符的 OID（如果不存在则为零）|
|`aggtranstype`|oid|`pg_type.oid`|聚合函数内部转换（状态）数据的数据类型|
|`aggtransspace`|integer| |转换状态数据的近似平均大小（以字节为单位），或者为零以使用默认估计值|
|`aggmtranstype`|oid|`pg_type.oid`|移动聚合模式下聚合函数内部转换（状态）数据的数据类型（如果不存在则为零）|
|`aggmtransspace`|integer| |移动聚合模式下转换状态数据的近似平均大小（以字节为单位），或者为零以使用默认估计值|
|`agginitval`|text| |转换状态的初始值。这是一个文本字段，包含其外部字符串表示形式的初始值。如果此字段为 NULL，则转换状态值从 NULL 开始。|
|`aggminitval`|text| |移动聚合模式下转换状态的初始值。这是一个文本字段，包含其外部字符串表示形式的初始值。如果此字段为 NULL，则转换状态值从 NULL 开始。|
|`aggrepsafeexec`|bool| |如果聚合函数可以在并行执行中安全运行，则为 `true`|