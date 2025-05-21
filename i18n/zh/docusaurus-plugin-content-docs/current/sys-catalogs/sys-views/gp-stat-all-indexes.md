---
title: pg_stat_all_indexes
---

# pg_stat_all_indexes

`pg_stat_all_indexes` 视图为当前数据库中的每个索引显示一行，其中包含有关对该特定索引访问的统计信息。

`pg_stat_user_indexes` 和 `pg_stat_sys_indexes` 视图包含相同的信息，但分别只显示用户索引和系统索引。

|列|类型|描述|
|------|----|-----------|
|`relid`|oid|此索引所在表的 OID|
|`indexrelid`|oid|此索引的 OID|
|`schemaname`|name|此索引所在模式的名称|
|`relname`|name|此索引所在表的名称|
|`indexrelname`|name|此索引的名称|
|`idx_scan`|bigint|从所有 Segment 实例在此索引上启动的索引扫描总次数|
|`idx_tup_read`|bigint|此索引上的扫描返回的索引条目数|
|`idx_tup_fetch`|bigint|使用此索引通过简单索引扫描获取的活跃表行数|
