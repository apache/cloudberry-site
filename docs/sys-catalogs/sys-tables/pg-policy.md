---
title: pg_policy
---

# pg_policy

The catalog `pg_policy` stores row level security policies for tables. A policy includes the kind of command that it applies to (possibly all commands), the roles that it applies to, the expression to be added as a security-barrier qualification to queries that include the table, and the expression to be added as a `WITH CHECK` option for queries that attempt to add new records to the table.

|column|type|references|description|
|------|----|----------|-----------|
|`oid`|oid| |The object ID|
|`polname`|name| |The name of the policy|
|`polerelid`|oid|pg_class.oid|The table to which the policy applies|
|`polcmd`|char| |The command type to which the policy is applied: `r` for `SELECT`, `a` for `INSERT`, `w` for `UPDATE`, `d` for `DELETE`, or `*` for all|
|`polpermissive`|boolean| |Is the policy permissive or restrictive?|
|`polroles`|ARRAY|pg_authid.oid |The roles to which the policy is applied|
|`polqual`|pg_node_tree| |The expression tree to be added to the security barrier qualifications for queries that use the table|
|`polwithcheck`|pg_node_tree| |The expression tree to be added to the `WITH CHECK` qualifications for queries that attempt to add rows to the table|

:::note
Apache Cloudberry applies policies stored in `pg_policy` only when `pg_class.relrowsecurity` is set for their table.
:::