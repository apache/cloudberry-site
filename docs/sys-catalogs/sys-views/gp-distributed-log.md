---
title: gp_distributed_log
---

# gp_distributed_log

The `gp_distributed_log` view contains status information about distributed transactions and their associated local transactions. A distributed transaction is a transaction that involves modifying data on the segment instances. Apache Cloudberry's distributed transaction manager ensures that the segments stay in synch. This view allows you to see the status of distributed transactions.

|column|type|references|description|
|------|----|----------|-----------|
|`segment_id`|smallint|gp_segment_configuration.content|The content id of the segment. The coordinator is always -1 (no content).|
|`dbid`|smallint|gp_segment_configuration.dbid|The unique id of the segment instance.|
|`distributed_xid`|xid| |The global transaction id.|
|`status`|text| |The status of the distributed transaction (Committed or Aborted).|
|`local_transaction`|xid| |The local transaction ID.|
