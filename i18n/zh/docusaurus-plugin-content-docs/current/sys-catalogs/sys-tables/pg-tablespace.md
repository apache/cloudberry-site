---
title: pg_tablespace
---

# pg_tablespace

The `pg_tablespace` system catalog table stores information about the available tablespaces. Tables can be placed in particular tablespaces to aid administration of disk layout. Unlike most system catalogs, `pg_tablespace` is shared across all databases of a Cloudberry system: there is only one copy of `pg_tablespace` per system, not one per database.

|column|type|references|description|
|------|----|----------|-----------|
|`oid`|oid| |The object ID|
|`spcname`|name| |Tablespace name.|
|`spcowner`|oid|pg_authid.oid|Owner of the tablespace, usually the user who created it.|
|`spcacl`|ARRAY| |Tablespace access privileges.|
|`spcoptions`|ARRAY| |Tablespace contentID locations.|
