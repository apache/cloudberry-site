---
title: pg_trigger
---

# pg_trigger

The `pg_trigger` system catalog table stores triggers on tables.

:::note
Apache Cloudberry does not support triggers.
:::

|column|type|references|description|
|------|----|----------|-----------|
|`oid`|oid| |The object ID|
|`tgrelid`|oid|*pg_class.oid*<br/><br/>Note that Apache Cloudberry does not enforce referential integrity.|The table this trigger is on.|
| `tgparentid` | oid | *pg_trigger.oid* | OID of the parent trigger that this trigger was cloned from (for example, on a partition); zero if not a clone. |
|`tgname`|name| |Trigger name (must be unique among triggers of same table).|
|`tgfoid`|oid|*pg_proc.oid*<br/><br/>Note that Apache Cloudberry does not enforce referential integrity.|The function to be called.|
|`tgtype`|smallint| |Bit mask identifying trigger conditions.|
|`tgenabled`|char| |True if trigger is enabled.|
|`tgisinternal`|boolean| |True if trigger is internally generated (usually, to enforce the constraint identified by tgconstraint).|
|`tgconstrrelid`|oid|*pg_class.oid*<br/><br/>Note that Apache Cloudberry does not enforce referential integrity.|The table referenced by an referential integrity constraint.|
|`tgconstrindid`|oid|*pg_class.oid*|The index supporting a unique, primary key, or referential integrity constraint.|
|`tgconstraint`|oid|*pg_constraint.oid*|The `pg_constraint` entry associated with the trigger, if any.|
|`tgdeferrable`|boolean| |True if deferrable.|
|`tginitdeferred`|boolean| |True if initially deferred.|
|`tgnargs`|smallint| |Number of argument strings passed to trigger function.|
|`tgattr`|ARRAY| |Currently not used.|
|`tgargs`|bytea| |Argument strings to pass to trigger, each NULL-terminated.|
|`tgqual`|pg_node_tree| |Expression tree (in `nodeToString()` representation) for the trigger's `WHEN` condition, or null if none.|
|`tgoldtable`|name| |The name of the old transition table, or NULL if none.|
|`tgnewtable`|name| |The name of the new transition table, or NULL if none.|
