---
title: pg_stat_gssapi
---

# pg_stat_gssapi

The `pg_stat_gssapi` view provides per-connection statistics related to GSSAPI (Generic Security Services Application Program Interface) authentication and encryption. Each row corresponds to a backend process and includes information such as whether GSSAPI authentication was used, the principal name, whether encryption is enabled, and whether credentials are delegated. This view can be joined with `pg_stat_activity` or `pg_stat_replication` using the `pid` column to obtain more details about each connection. 

|column|type|references|description|
|------|----|----------|-----------|
|`pid`|integer| |Process ID of a backend.|
|`gss_authenticated boolean`|boolean| |True if GSSAPI authentication was used for this connection.|
|`principal`|text| |Principal used to authenticate this connection, or NULL if GSSAPI was not used to authenticate this connection. This field is truncated if the principal is longer than `NAMEDATALEN` (64 characters in a standard build).|
|`encrypted`|boolean| |True if GSSAPI encryption is in use on this connection.|
