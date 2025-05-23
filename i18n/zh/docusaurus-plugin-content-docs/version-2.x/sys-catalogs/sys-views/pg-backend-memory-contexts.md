---
title: pg_backend_memory_contexts
---

# pg_backend_memory_contexts

`pg_backend_memory_contexts` 系统视图显示当前会话所连接的服务器进程正在使用的所有内存上下文。

`pg_backend_memory_contexts` 为每个内存上下文显示一行。

|列|类型|描述|
|------|----|-----------|
| `gp_segment_id` | int4 | 内存上下文的 Segment ID。|
|`name`|text| 内存上下文的名称。|
|`ident`|text| 内存上下文的识别信息。此字段被截断为 1024 字节。|
|`parent`|text| 此内存上下文的父级名称。|
|`level`|int4| 在上下文树中与 `TopMemoryContext` 的距离。|
|`total_bytes`|int8| 为此内存上下文分配的总字节数。|
|`total_nblocks`|int8| 为此内存上下文分配的总块数。|
|`free_bytes`|int8| 空闲空间（字节）。|
|`free_chunks`|int8| 空闲块的总数。|
|`used_bytes`|int8| 已用空间（字节）。|
