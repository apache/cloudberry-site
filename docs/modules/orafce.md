---
title: orafce
---

# orafce

The `orafce` module provides Oracle compatibility SQL functions, data types, and packages in Apache Cloudberry. It implements a subset of the functions and packages of the Oracle RDBMS, which helps you port Oracle applications.

The module in Apache Cloudberry is a modified version of the open source [Orafce](https://github.com/orafce/orafce) extension. The source files are in the `gpcontrib/orafce` directory of the Apache Cloudberry source code and are based on Orafce 4.9 (4.9.2).

## Installation

`orafce` is not built by default. To build and install the module with Apache Cloudberry, specify the `--enable-orafce` option when you run `configure`:

```shell
./configure --enable-orafce [other options...]
make
make install
```

The module is an extension (version `4.9`, not relocatable). Before you can use it, create the extension in each database where you want to use it:

```sql
CREATE EXTENSION orafce;
```

## Schemas

The extension creates its objects in the following schemas:

| Schema | Content |
|---|---|
| `oracle` | Oracle compatible functions (for example `oracle.substr()`, `oracle.add_months()`, `oracle.nvl2()`, and `oracle.sysdate()`), the `oracle.date` domain, the `oracle.varchar2` and `oracle.nvarchar2` data types, and the `oracle.dual` view. |
| `dbms_output` | The `DBMS_OUTPUT` package. |
| `dbms_pipe` | The `DBMS_PIPE` package. |
| `dbms_utility` | The `DBMS_UTILITY` package. |
| `dbms_assert` | The `DBMS_ASSERT` package. |
| `dbms_random` | The `DBMS_RANDOM` package. |
| `dbms_sql` | The `DBMS_SQL` package. |
| `utl_file` | The `UTL_FILE` package. |
| `plvstr`, `plvchr`, `plvdate`, `plvsubst`, `plvlex` | The PLVision string, character, date, substitution, and lexer packages. |
| `plunit` | The PLUnit assertion functions. |

## Usage

To call the functions in the `oracle` schema without a schema qualifier, add the schema to the search path. For example, this command sets the default search path of a database:

```sql
ALTER DATABASE db_name SET search_path = "$user", public, oracle;
```

Some functions in the `oracle` schema have the same name as a built-in function, for example `oracle.substr()`. The built-in `pg_catalog` schema is searched first by default. To give precedence to the Oracle compatible version, either qualify the function name with the schema, or put `oracle` before `pg_catalog` in the search path:

```sql
SET search_path TO oracle, "$user", public, pg_catalog;
```

For example:

```sql
SET search_path TO public, oracle;
SELECT add_months(date '2003-08-01', 3);
```

```
 add_months
------------
 2003-11-01
(1 row)
```

You can use the `oracle.varchar2` and `oracle.nvarchar2` data types as the distribution key or as the partition key of a table:

```sql
CREATE TABLE t1 (str oracle.varchar2(30)) DISTRIBUTED BY (str);
```

### Configuration parameters

The module defines the following configuration parameters. You can set them in a session with `SET`.

| Parameter | Default | Description |
|---|---|---|
| `orafce.nls_date_format` | Not set | Emulates the date output behavior of Oracle. |
| `orafce.timezone` | `GMT` | The time zone that the `oracle.sysdate()` function uses and that `oracle.dbtimezone()` returns. |
| `orafce.varchar2_null_safe_concat` | `false` | Whether the concatenation of `varchar2` values is null safe. |
| `orafce.sys_guid_source` | `uuid_generate_v1` | The function that `oracle.sys_guid()` uses to make its result: `uuid_generate_v1`, `uuid_generate_v1mc`, or `uuid_generate_v4` from the `uuid-ossp` extension, or the built-in `gen_random_uuid`. In this version, the value `uuid_generate_v4` is stored as `uuid_generate_v1`. |
| `orafce.using_substring_zero_width_in_substr` | `warning_oracle` | The behavior of the `substr()` function when the substring length argument is zero. Valid values are `warning_oracle`, `warning_orafce`, `oracle`, and `orafce`. |

## Differences from the original Orafce extension

The module in Apache Cloudberry differs from the original Orafce 4.9 extension as follows:

- The `oracle.decode()` functions are not created. Apache Cloudberry has built-in support for `decode()`: the parser transforms a `decode()` call into a `CASE` expression, so you can use `decode()` without the `orafce` extension. For example:

    ```sql
    SELECT decode(2, 1, 'ABC', 2, 'DEF');
    ```

    ```
     case
    ------
     DEF
    (1 row)
    ```

- The `dbms_alert` package is not available. The `dbms_alert` schema and its functions are not created, because the implementation cannot run in an MPP environment.

:::note
PostgreSQL 14, on which Apache Cloudberry is based, provides `sinh()`, `cosh()`, and `tanh()` as built-in functions. See [Mathematical Functions and Operators](https://www.postgresql.org/docs/14/functions-math.html) in the PostgreSQL documentation. You do not need `orafce` to use them.
:::

## Additional documentation

For detailed information about the individual functions and supporting objects in this module, see the following files in the [`gpcontrib/orafce`](https://github.com/apache/cloudberry/tree/REL_2_STABLE/gpcontrib/orafce) directory of the Apache Cloudberry source code:

- `README.asciidoc`
- The documents in the `doc/orafce_documentation` directory
- The Oracle to PostgreSQL migration notes in the `doc/sql_migration` directory
