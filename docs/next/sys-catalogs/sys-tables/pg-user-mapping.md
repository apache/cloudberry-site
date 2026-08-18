---
title: "pg_user_mapping"
source: https://cloudberry.apache.org/docs/next/sys-catalogs/sys-tables/pg-user-mapping
---

# pg_user_mapping

The system catalog table `pg_user_mapping` stores the mappings from local user to remote user. You must have administrator privileges to view this catalog. Access to this catalog is restricted from normal users, use the `pg_user_mappings` view instead.

|column|type|references|description|
|------|----|----------|-----------|
|`oid`|oid| |The object ID|
|`umuser`|oid|pg_authid.oid|OID of the local role being mapped, 0 if the user mapping is public.|
|`umserver`|oid|pg_foreign_server.oid|OID of the foreign server that contains this mapping|
|`umoptions`|ARRAY| |User mapping-specific options, as "keyword=value" strings.|
