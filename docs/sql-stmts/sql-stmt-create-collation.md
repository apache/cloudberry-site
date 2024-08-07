---
title: CREATE COLLATION
---

# CREATE COLLATION

Defines a new collation.

## Synopsis

```sql
CREATE COLLATION [ IF NOT EXISTS ] <name> (
    [ LOCALE = <locale>, ]    
    [ LC_COLLATE = <lc_collate>, ]    
    [ LC_CTYPE = <lc_ctype>, ]
    [ PROVIDER = <provider>, ]
    [ DETERMINISTIC = <boolean>, ]
    [ VERSION = <version> ])

CREATE COLLATION [ IF NOT EXISTS ] <name> FROM <existing_collation>
```

## Description

`CREATE COLLATION` defines a new collation using the specified operating system locale settings, or by copying an existing collation.

To be able to create a collation, you must have `CREATE` privilege on the destination schema.

## Parameters

**`IF NOT EXISTS`**

Do not throw an error if a collation with the same name already exists. A notice is issued in this case. Note that there is no guarantee that the existing collation is anything like the one that would have been created.

**`name`**

The name of the collation. The collation name can be schema-qualified. If it is not, the collation is defined in the current schema. The collation name must be unique within that schema. (The system catalogs can contain collations with the same name for other encodings, but these are ignored if the database encoding does not match.)

**`locale`**

This is a shortcut for setting `LC_COLLATE` and `LC_CTYPE` at once. If you specify this, you cannot specify either of those parameters.

**`lc_collate`**

Use the specified operating system locale for the `LC_COLLATE` locale category.

**`lc_ctype`**

Use the specified operating system locale for the `LC_CTYPE` locale category.

**`provider`**

Specifies the provider to use for locale services associated with this collation. Possible values are: `icu`, `libc`. `libc` is the default. The available choices depend on the operating system and build options.

**`DETERMINISTIC`**

Specifies whether the collation should use deterministic comparisons. The default is `true`. A deterministic comparison considers strings that are not byte-wise equal to be unequal even if they are considered logically equal by the comparison. Cloudberry Database breaks ties using a byte-wise comparison. Comparison that is not deterministic can make the collation be, say, case- or accent-insensitive. For that, you need to choose an appropriate `LC_COLLATE` setting and set the collation to not deterministic here.

Nondeterministic collations are only supported with the `icu` provider.

**`version`**

Specifies the version string to store with the collation. Normally, this should be omitted, which will cause the version to be computed from the actual version of the collation as provided by the operating system. This option is intended to be used by `pg_upgrade` for copying the version from an existing installation.

See also [ALTER COLLATION](/docs/sql-stmts/sql-stmt-alter-collation.md) for how to handle collation version mismatches.

**`existing_collation`**

The name of an existing collation to copy. The new collation will have the same properties as the existing one, but it will be an independent object.

## Notes

`CREATE COLLATION` takes a `SHARE ROW EXCLUSIVE` lock, which is self-conflicting, on the `pg_collation` system catalog, so only one `CREATE COLLATION` command can run at a time.

Use [DROP COLLATION](/docs/sql-stmts/sql-stmt-drop-collation.md) to remove user-defined collations.

See [Collation Support](https://www.postgresql.org/docs/12/collation.html) in the PostgreSQL documentation for more information about collation support in Cloudberry Database.

When using the `libc` collation provider, the, locale must be applicable to the current database encoding. See [CREATE DATABASE](/docs/sql-stmts/sql-stmt-create-database.md) for the precise rules.

## Examples

To create a collation from the operating system locale `fr_FR.utf8` (assuming the current database encoding is `UTF8`):

```sql
CREATE COLLATION french (LOCALE = 'fr_FR.utf8');
```

To create a collation using the `icu` provider using German phone book sort order:

```sql
CREATE COLLATION german_phonebook (provider = icu, locale = 'de-u-co-phonebk');
```

To create a collation from an existing collation:

```sql
CREATE COLLATION german FROM "de_DE";
```

This can be convenient to be able to use operating-system-independent collation names in applications.

## Compatibility

There is a `CREATE COLLATION` statement in the SQL standard, but it is limited to copying an existing collation. The syntax to create a new collation is a Cloudberry Database extension.

## See also

[ALTER COLLATION](/docs/sql-stmts/sql-stmt-alter-collation.md), [DROP COLLATION](/docs/sql-stmts/sql-stmt-drop-collation.md)
