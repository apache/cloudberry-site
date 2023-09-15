---
title: ALTER TEXT SEARCH DICTIONARY
---

# ALTER TEXT SEARCH DICTIONARY

Changes the definition of a text search dictionary.

## Synopsis

```sql
ALTER TEXT SEARCH DICTIONARY <name> (
    <option> [ = <value> ] [, ... ]
)
ALTER TEXT SEARCH DICTIONARY <name> RENAME TO <new_name>
ALTER TEXT SEARCH DICTIONARY <name> OWNER TO { <new_owner> | CURRENT_USER | SESSION_USER }
ALTER TEXT SEARCH DICTIONARY <name> SET SCHEMA <new_schema>
```

## Description

`ALTER TEXT SEARCH DICTIONARY` changes the definition of a text search dictionary. You can change the dictionary's template-specific options, or change the dictionary's name or owner.

You must be the owner of the dictionary to use `ALTER TEXT SEARCH DICTIONARY`.

## Parameters

**`name`**

The name (optionally schema-qualified) of an existing text search dictionary.

**`option`**

The name of a template-specific option to be set for this dictionary.

**`value`**

The new value to use for a template-specific option. If the equal sign and value are omitted, then any previous setting for the option is removed from the dictionary, allowing the default to be used.

**`new_name`**

The new name of the text search dictionary.

**`new_owner`**

The new owner of the text search dictionary.

**`new_schema`**

The new schema for the text search dictionary.

Template-specific options can appear in any order.

## Examples

The following example command changes the stop word list for a Snowball-based dictionary. Other parameters remain unchanged.

```sql
ALTER TEXT SEARCH DICTIONARY my_dict ( StopWords = newrussian );
```

The following example command changes the language option to `dutch`, and removes the stop word option entirely:

```sql
ALTER TEXT SEARCH DICTIONARY my_dict ( language = dutch, StopWords );
```

The following example command "updates" the dictionary's definition without actually changing anything:

```sql
ALTER TEXT SEARCH DICTIONARY my_dict ( dummy );
```

(The reason this works is that the option removal code doesn't complain if there is no such option.) This trick is useful when changing configuration files for the dictionary: the `ALTER` will force existing database sessions to re-read the configuration files, which they would otherwise never do if they had read them earlier.

## Compatibility

There is no `ALTER TEXT SEARCH DICTIONARY` statement in the SQL standard.

## See also

[CREATE TEXT SEARCH DICTIONARY](/docs/sql-stmts/sql-stmt-create-text-search-dictionary.md), [DROP TEXT SEARCH DICTIONARY](/docs/sql-stmts/sql-stmt-drop-text-search-dictionary.md)
