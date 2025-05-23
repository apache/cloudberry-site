---
title: pg_stat_all_tables
---

# pg_stat_all_tables

`pg_stat_all_tables` 视图为当前数据库中的每张表（包括 TOAST 表）显示一行，其中包含有关对该特定表访问的统计信息。

`pg_stat_user_tables` 和 `pg_stat_sys_tables` 视图包含相同的信息，但分别只显示用户表和系统表。

|列|类型|描述|
|------|----|-----------|
|`relid`|oid|表的 OID|
|`schemaname`|name|此表所在模式的名称|
|`relname`|name|此表的名称|
|`seq_scan`|bigint|从所有 Segment 实例在此表上启动的顺序扫描总次数|
|`seq_tup_read`|bigint|通过顺序扫描获取的活跃行数|
|`idx_scan`|bigint|从所有 Segment 实例在此表上启动的索引扫描总次数|
|`idx_tup_fetch`|bigint|通过索引扫描获取的活跃行数|
|`n_tup_ins`|bigint|插入的行数|
|`n_tup_upd`|bigint|更新的行数（包括 HOT 更新的行）|
|`n_tup_del`|bigint|删除的行数|
|`n_tup_hot_upd`|bigint|HOT 更新的行数（即，无需单独的索引更新）|
|`n_live_tup`|bigint|活跃行的估计数量|
|`n_dead_tup`|bigint|死亡行的估计数量|
|`n_mod_since_analyze`|bigint|自上次分析此表以来修改的行数估计值|
|`last_vacuum`|timestamp with time zone|上次手动 `VACUUM` 此表的时间（不包括 `VACUUM FULL`）|
|`last_autovacuum`|timestamp with time zone|上次由自动清理守护进程清理此表的时间|
|`last_analyze`|timestamp with time zone|上次手动分析此表的时间|
|`last_autoanalyze`|timestamp with time zone|上次由自动清理守护进程分析此表的时间|
|`vacuum_count`|bigint|此表被手动 `VACUUM` 的次数（不包括 `VACUUM FULL`）|
|`autovacuum_count`|bigint|此表被自动清理守护进程清理的次数|
|`analyze_count`|bigint|此表被手动分析的次数|
|`autoanalyze_count`|bigint|此表被自动清理守护进程分析的次数|
