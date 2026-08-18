---
title: "pg_config"
source: https://cloudberry.apache.org/docs/next/sys-catalogs/sys-views/pg-config
---

# pg_config

The `pg_config` view displays the compile-time configuration parameters of the Cloudberry/PostgreSQL installation. It includes information such as installation directories, compiler flags, and version details. Access is typically restricted to superusers.

|column|type|references|description|
|------|----|----------|-----------|
|`name`|text| |The parameter name.|
|`setting`|text| |The parameter value.|
