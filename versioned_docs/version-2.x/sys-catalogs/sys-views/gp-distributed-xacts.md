---
title: gp_distributed_xacts
---

# gp_distributed_xacts

The `gp_distributed_xacts` view contains information about Apache Cloudberry distributed transactions. A distributed transaction is a transaction that involves modifying data on the segment instances. Apache Cloudberry's distributed transaction manager ensures that the segments stay in synch. This view allows you to see the currently active sessions and their associated distributed transactions.

|column|type|references|description|
|------|----|----------|-----------|
|`distributed_xid`|xid| |The transaction ID used by the distributed transaction across the Apache Cloudberry array.|
|`state`|text| |The current state of this session with regards to distributed transactions.|
|`distributed_id`|text| |The distributed transaction identifier. It has 2 parts — a unique timestamp and the distributed transaction number.|
|`gp_session_id`|int| |The ID number of the Apache Cloudberry session associated with this transaction.|
|`xmin_distributed _snapshot`|xid| |The minimum distributed transaction number found among all open transactions when this transaction was started. It is used for MVCC distributed snapshot purposes.|
