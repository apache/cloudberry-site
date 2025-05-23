---
title: gp_suboverflowed_backend
---

# gp_suboverflowed_backend

`gp_suboverflowed_backend` 视图允许管理员识别后端发生子事务溢出的会话，这可能导致系统中查询性能下降，包括目录查询。

|列|类型|描述|
|------|----|----------|
|`segid`|integer|包含子事务溢出后端的 Segment ID。|
|`pids`|integer[]|此 Segment 上所有子事务溢出后端的进程 ID 列表。|
