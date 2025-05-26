---
title: gp_resgroup_iostats_per_host
---

# gp_resgroup_iostats_per_host

`gp_toolkit.gp_resgroup_iostats_per_host` 视图允许管理员查看每个资源组在每台主机上的当前磁盘 I/O 使用情况。

内存量以 MB 为单位指定。

:::note
`gp_resgroup_iostats_per_host` 视图仅在基于资源组的资源管理处于活动状态时有效。
:::

|列|类型|引用|描述|
|------|----|----------|-----------|
|`rsgname`|name| pg_resgroup.rsgname|资源组的名称|
|`hostname`|text|gp_segment_configuration.hostname|Segment 主机的主机名|
|`tablespace`|text|pg_tablespace.spcname|表空间的名称|
|`rbps`|bigint| |资源组在主机上的实时顺序读磁盘 I/O 吞吐量，单位为字节/秒|
|`wbps`|bigint| |资源组在主机上的实时顺序写磁盘 I/O 吞吐量，单位为字节/秒|
|`riops`|bigint| |资源组在主机上的实时每秒读 I/O 操作数|
|`wiops`|bigint| |资源组在主机上的实时每秒写 I/O 操作数|

`gp_resgroup_iostats_per_host` 视图的示例输出：

```sql
SELECT * from gp_toolkit.gp_resgroup_iostats_per_host;

rsgname        | hostname | tablespace       | rbps | wbps | riops | wiops  
----------------+----------+------------------+------------------+------------------+-------------+-------------
rg_test_group1 | mtspc    | pg_default       | 21356347                | 29369067                | 162           | 36           
rg_test_group2 | mtspc    | pg_default       | 0                | 0                | 0           | 0           
rg_test_group3 | mtspc    | pg_default       | 0                | 0                | 0           | 0           
rg_test_group4 | mtspc    | * | 0                | 0                | 0           | 0           
rg_test_group5 | mtspc    | rg_io_limit_ts_1 | 0                | 0                | 0           | 0           
(5 rows)
