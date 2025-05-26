---
title: gp_suboverflowed_backend
---

# gp_suboverflowed_backend

The `gp_suboverflowed_backend` view allows administrators to identify sessions in which a backend has subtransaction overflows, which can cause query performance degradation in the system, including catalog queries.

|column|type|description|
|------|----|----------|
|`segid`|integer|The id of the segment containing the suboverflowed backend.|
|`pids`|integer[]|A list of the pids of all suboverflowed backends on this segment.|
