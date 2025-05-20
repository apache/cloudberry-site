---
title: pg_type_encoding
---

# pg_type_encoding

`pg_type_encoding` 系统目录表用于存储列的存储类型信息。

|列名|类型|约束|存储方式|说明|
|------|----|--------|-------|-----------|
|`typeid`|oid|not null|plain|引用 [pg_attribute](./pg-attribute.md) 的外键。|
|`typoptions`|ARRAY| |extended|实际的存储选项。|
