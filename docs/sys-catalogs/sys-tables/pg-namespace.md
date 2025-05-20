---
title: pg_namespace
---

# pg_namespace

The `pg_namespace` system catalog table stores namespaces. A namespace is the structure underlying SQL schemas: each namespace can have a separate collection of relations, types, etc. without name conflicts.

|column|type|references|description|
|------|----|----------|-----------|
|`oid`|oid| |Row identifier (hidden attribute; must be explicitly selected)|
|`nspname`|name| |Name of the namespace|
|`nspowner`|oid|pg_authid.oid|Owner of the namespace|
|`nspacl`|ARRAY| |Access privileges as given by `GRANT` and `REVOKE`|
