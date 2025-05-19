---
title: pg_type_encoding
---

# pg_type_encoding

The `pg_type_encoding` system catalog table contains the column storage type information.

|column|type|modifers|storage|description|
|------|----|--------|-------|-----------|
|`typeid`|oid|not null|plain|Foreign key to [pg_attribute](./pg-attribute.md)|
|`typoptions`|ARRAY| |extended|The actual options|
