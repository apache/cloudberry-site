---
title: pg_resgroup
---

# pg_resgroup

:::note
The `pg_resgroup` system catalog table is valid only when resource group-based resource management is active.
:::

The `pg_resgroup` system catalog table contains information about Apache Cloudberry resource groups, which are used for managing concurrent statements, CPU, and memory resources. This table, defined in the `pg_global` tablespace, is globally shared across all databases in the system.

|column|type|references|description|
|------|----|----------|-----------|
|`oid`|oid| |The object ID|
|`rsgname`|name| |The name of the resource group.|
|`parent`|oid| |Unused; reserved for future use.|
