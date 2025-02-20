---
title: gp_id
---

# gp_id

The `gp_id` system catalog table in the `pg_catalog` schema identifies the Apache Cloudberry system name and number of segments for the system. It also has `local` values for the particular database instance (segment or coordinator) on which the table resides. This table is defined in the `pg_global` tablespace, meaning it is globally shared across all databases in the system.

|column|type|references|description|
|------|----|----------|-----------|
|`gpname`|name| |The name of this Apache Cloudberry system.|
|`numsegments`|smallint| |The number of segments in the Apache Cloudberry system.|
|`dbid`|smallint| |The unique identifier of this segment (or coordinator) instance.|
|`content`|smallint| |The ID for the portion of data on this segment instance. A primary and its mirror will have the same content ID.<br/><br/>For a segment the value is from 0-*N-1*, where *N* is the number of segments in Apache Cloudberry.<br/><br/>For the coordinator, the value is -1.|
