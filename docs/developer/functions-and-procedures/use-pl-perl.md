---
title: Use PL/Perl
---

# Use PL/Perl

PL/Perl is an embedded procedural language that allows you to write PostgreSQL functions using the Perl programming language.

With PL/Perl, you can:

- Write functions in Perl and call them from SQL.
- Use the powerful string manipulation features of Perl.
- Use available Perl modules.

## Enable PL/Perl

To use PL/Perl, you must enable it in your database.

1. Connect to your database using `psql`.

    ```bash
    psql -d <database_name>
    ```

2. Create the `plperl` extension.

    ```sql
    CREATE EXTENSION plperl;
    ```

    This registers the trusted (`plperl`) language. If you want the untrusted language, use `CREATE EXTENSION plperlu`.

## Write PL/Perl functions

You define a PL/Perl function using the standard SQL `CREATE FUNCTION` syntax. The body of the function is ordinary Perl code.

```sql
CREATE FUNCTION perl_max (integer, integer)
RETURNS integer
AS $$
    if ($_[0] > $_[1]) { return $_[0]; }
    return $_[1];
$$ LANGUAGE plperl;
```

### Arguments and results

- Arguments are accessed via the `@_` array.
- You return a result value with the `return` statement or as the last evaluated expression.
- To return a SQL `NULL`, return the Perl `undef`.

### Strict functions

By default, PL/Perl functions are called with non-null arguments. If a SQL `NULL` is passed, the result is `NULL` unless you specify `STRICT`.

```sql
CREATE FUNCTION perl_max_strict (integer, integer)
RETURNS integer
AS $$
    if ($_[0] > $_[1]) { return $_[0]; }
    return $_[1];
$$ LANGUAGE plperl STRICT;
```

## Built-in functions

PL/Perl provides access to the database via built-in functions.

- `spi_exec_query(query [, limit])`: Executes a query and returns the result.
- `elog(level, msg)`: Emits a log message.

Example of using `spi_exec_query`:

```sql
CREATE OR REPLACE FUNCTION return_match(varchar) RETURNS SETOF test AS $$
    my $rv = spi_exec_query('select * from test;');
    my $nrows = $rv->{processed};
    foreach my $rn (0 .. $nrows - 1) {
        my $row = $rv->{rows}[$rn];
        if (index($row->{v}, $_[0]) != -1) {
            return_next($row);
        }
    }
    return undef;
$$ LANGUAGE plperl;
```

## Security and limitations

- **Trusted Language (`plperl`)**: Restricts file system operations and other potentially unsafe operations. Any user can create functions in `plperl`.
- **Untrusted Language (`plperlu`)**: Allows unrestricted access to the system. Only superusers can create functions in `plperlu`.
- **Limitations**:
    - PL/Perl triggers are not supported in Apache Cloudberry.
    - PL/Perl functions cannot call each other directly.
