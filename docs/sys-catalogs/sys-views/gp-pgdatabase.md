---
title: gp_pgdatabase
---

# gp_pgdatabase

The `gp_pgdatabase` view displays the status of Apache Cloudberry segment instances and whether they are acting as the mirror or the primary. The Apache Cloudberry fault detection and recovery utilities use this view internally to identify failed segments.

|column|type|references|description|
|------|----|----------|-----------|
|`dbid`|smallint|gp_segment_configuration.dbid|System-assigned ID. The unique identifier of a segment (or coordinator) instance.|
|`isprimary`|boolean|gp_segment_configuration.role|Whether or not this instance is active. Is it currently acting as the primary segment (as opposed to the mirror).|
|`content`|smallint|gp_segment_configuration.content|The ID for the portion of data on an instance. A primary segment instance and its mirror will have the same content ID.<br/><br/>For a segment the value is from 0-*N-1*, where *N* is the number of segments in Apache Cloudberry.<br/><br/>For the coordinator, the value is -1.|
|`valid`|boolean|gp_segment_configuration.mode|Whether or not this instance is up and the mode is either *s* (synchronized) or *n* (not in sync).|
|`definedprimary`|boolean|gp_segment_configuration.preferred_role|Whether or not this instance was defined as the primary (as opposed to the mirror) at the time the system was initialized.|
