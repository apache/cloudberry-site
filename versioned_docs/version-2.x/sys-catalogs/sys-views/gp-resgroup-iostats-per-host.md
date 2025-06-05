---
title: gp_resgroup_iostats_per_host
---

# gp_resgroup_iostats_per_host

The `gp_toolkit.gp_resgroup_iostats_per_host` view allows administrators to see current disk I/O  usage for each resource group on a per-host basis.

Memory amounts are specified in MBs.

:::note
The `gp_resgroup_iostats_per_host` view is valid only when resource group-based resource management is active.
:::

|column|type|references|description|
|------|----|----------|-----------|
|`rsgname`|name| pg_resgroup.rsgname|The name of the resource group|
|`hostname`|text|gp_segment_configuration.hostname|The hostname of the segment host|
|`tablespace`|text|pg_tablespace.spcname|The name of the tablespace|
|`rbps`|bigint| |The real-time read sequential disk I/O throughput by the resource group on a host, in Bytes/s|
|`wbps`|bigint| |The real-time write sequential disk I/O throughput by the resource group on a host, in Bytes/s|
|`riops`|bigint| |The real-time read I/O operations per second by the resource group on a host|
|`wiops`|bigint| |The real-time write I/O operations per second by the resource group on a host|

Sample output for the `gp_resgroup_iostats_per_host` view:

```sql
SELECT * from gp_toolkit.gp_resgroup_iostats_per_host;

rsgname        | hostname | tablespace       | rbps | wbps | riops | wiops  
----------------+----------+------------------+------------------+------------------+-------------+-------------
rg_test_group1 | mtspc    | pg_default       | 21356347                | 29369067                | 162           | 36           
rg_test_group2 | mtspc    | pg_default       | 0                | 0                | 0           | 0           
rg_test_group3 | mtspc    | pg_default       | 0                | 0                | 0           | 0           
rg_test_group4 | mtspc    | *                | 0                | 0                | 0           | 0           
rg_test_group5 | mtspc    | rg_io_limit_ts_1 | 0                | 0                | 0           | 0           
(5 rows)
```