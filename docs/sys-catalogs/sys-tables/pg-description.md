---
title: pg_description
---

# pg_description

The `pg_description` system catalog table stores optional descriptions (comments) for each database object. Descriptions can be manipulated with the `COMMENT` command and viewed with `psql`'s `\d` meta-commands. Descriptions of many built-in system objects are provided in the initial contents of `pg_description`. See also [pg_shdescription](./pg-shdescription.md), which performs a similar function for descriptions involving objects that are shared across a Cloudberry system.

|column|type|references|description|
|------|----|----------|-----------|
|`objoid`|oid|any OID column|The OID of the object this description pertains to.|
|`classoid`|oid|pg_class.oid|The OID of the system catalog this object appears in|
|`objsubid`|integer| |For a comment on a table column, this is the column number. For all other object types, this column is zero.|
|`description`|text| |Arbitrary text that serves as the description of this object.|
