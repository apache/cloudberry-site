---
title: pg_replication_slots
---

# pg_replication_slots

The `pg_replication_slots` view provides a listing of all replication slots that currently exist on the database cluster, along with their current state. It includes information such as slot name, type (physical or logical), associated database, activity status, and WAL positions. This view is essential for monitoring replication slot usage and ensuring proper replication behavior.

|name|type|references|description|
|----|----|----------|-----------|
|`slot_name`|name| |A unique, cluster-wide identifier for the replication slot.|
|`plugin`|name| |The base name of the shared object containing the output plugin this logical slot is using, or null for physical slots.|
|`slot_type`|text| |The slot type - physical or logical.|
|`datoid`|oid|pg_database.oid|The OID of the database this slot is associated with, or null. Only logical slots have an associated database.|
|`database`|name|pg_database.datname|The name of the database this slot is associated with, or null. Only logical slots have an associated database.|
|`temporary`|boolean| |True if this is a temporary replication slot. Temporary slots are not saved to disk and are automatically dropped on error or when the session has finished.|
|`active`|boolean| |True if this slot is currently actively being used.|
|`active_pid`|integer| |The process ID of the session using this slot if the slot is currently actively being used. `NULL` if inactive.|
|`xmin`|xid| |The oldest transaction that this slot needs the database to retain. VACUUM cannot remove tuples deleted by any later transaction.|
|`catalog_xmin`|xid| |The oldest transaction affecting the system catalogs that this slot needs the database to retain. VACUUM cannot remove catalog tuples deleted by any later transaction.|
|`restart_ls`n|pg_lsn| |The address (LSN) of oldest WAL which still might be required by the consumer of this slot and thus won't be automatically removed during checkpoints. `NULL` if the LSN of this slot has never been reserved.|
|`confirmed_flush_lsn`|pg_lsn| |The address (LSN) up to which the logical slot's consumer has confirmed receiving data. Data older than this is not available anymore. NULL for physical slots.|
| `wal_status` | text | | Indicates the availability of WAL files for the replication slot. Possible values include `reserved`, `extended`, `unreserved`, and `lost`, reflecting the slot's current state regarding WAL retention.  |
| `safe_wal_size` | bigint | | Represents the amount of WAL data (in bytes) that can be written before the slot risks entering a `lost` state. A value of zero or null indicates imminent risk or that the slot is already lost. |
| `two_phase` | boolean | | Indicates whether the replication slot supports decoding of prepared transactions (two-phase commit). This is `true` for logical slots with two-phase decoding enabled and `false` for physical slots. |
