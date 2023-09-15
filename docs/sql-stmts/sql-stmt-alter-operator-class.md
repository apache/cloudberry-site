---
title: ALTER OPERATOR CLASS
---

# ALTER OPERATOR CLASS

Changes the definition of an operator class.

## Synopsis

```sql
ALTER OPERATOR CLASS <name> USING <index_method> RENAME TO <new_name>

ALTER OPERATOR CLASS <name> USING <index_method> OWNER TO { <new_owner> | CURRENT_USER | SESSION_USER }

ALTER OPERATOR CLASS <name> USING <index_method> SET SCHEMA <new_schema>
```

## Description

`ALTER OPERATOR CLASS` changes the definition of an operator class.

You must own the operator class to use `ALTER OPERATOR CLASS`. To alter the owner, you must also be a direct or indirect member of the new owning role, and that role must have `CREATE` privilege on the operator class's schema. (These restrictions enforce that altering the owner does not do anything you could not do by dropping and recreating the operator class. However, a superuser can alter ownership of any operator class anyway.)

## Parameters

**`name`**

The name (optionally schema-qualified) of an existing operator class.

**`index_method`**

The name of the index method this operator class is for.

**`new_name`**

The new name of the operator class.

**`new_owner`**

The new owner of the operator class

**`new_schema`**

The new schema for the operator class.

## Compatibility

There is no `ALTER OPERATOR CLASS` statement in the SQL standard.

## See also

[CREATE OPERATOR CLASS](/docs/sql-stmts/sql-stmt-create-operator-class.md), [DROP OPERATOR CLASS](/docs/sql-stmts/sql-stmt-drop-operator-class.md), [ALTER OPERATOR FAMILY](/docs/sql-stmts/sql-stmt-alter-operator-family.md)
