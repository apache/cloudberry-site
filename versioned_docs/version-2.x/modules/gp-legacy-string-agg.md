---
title: gp_legacy_string_agg
---

# gp_legacy_string_agg

The `gp_legacy_string_agg` module provides a single-argument `string_agg(text)` aggregate function. Apache Cloudberry, like PostgreSQL, provides only two-argument forms of `string_agg()` as built-in functions.

:::note
The single-argument function is deprecated. Use this module only to keep legacy SQL running while you migrate it to the built-in two-argument `string_agg()` function.
:::

## Installation

`gp_legacy_string_agg` is always built and installed with Apache Cloudberry. It is part of the default `gpcontrib` build targets and does not depend on any `configure` option.

The module is an extension (version `1.0.0`, relocatable). Before you can use the function, create the extension in each database where you want to use it:

```sql
CREATE EXTENSION gp_legacy_string_agg;
```

The module does not require `shared_preload_libraries` or a restart.

## Usage

The single-argument aggregate function has the following signature:

```sql
string_agg(text)
```

The function concatenates the non-null input values into a string without a delimiter. Each aggregate result (each group) raises a deprecation warning. The result is `NULL` when there are no non-null input values. For example:

```sql
SELECT string_agg(a) FROM (VALUES('aaaa'),('bbbb'),('cccc'),(NULL)) g(a);
```

```
WARNING:  Deprecated call to string_agg(text), use string_agg(text, text) instead
  string_agg
--------------
 aaaabbbbcccc
(1 row)
```

The result depends on the order of the input rows. The order is unspecified by default. To control it, use an `ORDER BY` clause within the aggregate call. For example:

```sql
CREATE TABLE foo(a int, b text);
INSERT INTO foo VALUES(1, 'aaaa'),(2, 'bbbb'),(3, 'cccc'), (4, NULL);
SELECT string_agg(b ORDER BY a) FROM foo;
```

```
WARNING:  Deprecated call to string_agg(text), use string_agg(text, text) instead
  string_agg
--------------
 aaaabbbbcccc
(1 row)
```

## Migrate to the two-argument string_agg() function

The built-in aggregate function takes a delimiter as its second argument:

```sql
string_agg(text, text)
```

A call with an empty delimiter is equivalent to the single-argument function that this module provides. For example, replace `string_agg(a)` with:

```sql
string_agg(a, '')
```

After you convert all the calls, you can drop the extension:

```sql
DROP EXTENSION gp_legacy_string_agg;
```

For more information about the built-in function, see [Aggregate Functions](https://www.postgresql.org/docs/14/functions-aggregate.html) in the PostgreSQL documentation.
