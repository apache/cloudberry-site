---
title: Use PL/Python
---

# Use PL/Python

PL/Python is an embedded procedural language that allows you to write PostgreSQL functions using the Python programming language. Apache Cloudberry supports PL/Python using Python 3.

With PL/Python, you can:

- Write functions in Python and call them from SQL.
- Use Python's extensive standard library and third-party modules.
- Access the database via the `plpy` module.

## Enable PL/Python

To use PL/Python, you must enable it in your database. Apache Cloudberry uses the untrusted `plpython3u` language, which provides unrestricted access to the system.

1. Connect to your database using `psql`.

    ```bash
    psql -d <database_name>
    ```

2. Create the `plpython3u` extension.

    ```sql
    CREATE EXTENSION plpython3u;
    ```

    :::{note}
    Because PL/Python is an untrusted language (`u` suffix), only database superusers can creating functions using it. This is because it allows access to the file system and other system resources.
    :::

## Write PL/Python functions

You define a PL/Python function using the standard SQL `CREATE FUNCTION` syntax. The body of the function is Python code.

```sql
CREATE FUNCTION py_max (a integer, b integer)
RETURNS integer
AS $$
    if a > b:
        return a
    return b
$$ LANGUAGE plpython3u;
```

### Arguments and results

- Arguments are passed as variables matching the argument names.
- You can also access arguments via the `args` list.
- Return values are handled automatically. Python `None` maps to SQL `NULL`.

### Data type mapping

Apache Cloudberry automatically maps SQL types to Python types.

| SQL type | Python type |
| :--- | :--- |
| `boolean` | `bool` |
| `integer`, `bigint` | `int` |
| `real`, `double precision` | `float` |
| `text`, `varchar` | `str` |
| `bytea` | `bytes` |
| `Array` | `list` |
| `Composite Type` | `dict` (for input), `tuple`/`dict` (for output) |

Example of returning a composite type:

```sql
CREATE TYPE type_record AS (first text, second int4);

CREATE FUNCTION return_composite()
RETURNS type_record
AS $$
    return {'first': 'hello', 'second': 42}
$$ LANGUAGE plpython3u;
```

## Built-in functions

The `plpy` module provides methods to interact with the database.

- `plpy.execute(query [, limit])`: Executes a SQL query.
- `plpy.prepare(query, argtypes)`: Prepares a query execution plan.
- `plpy.info(msg)`, `plpy.error(msg)`: Logs messages.

Example using `plpy.execute`:

```sql
CREATE FUNCTION get_user_name(id int)
RETURNS text
AS $$
    res = plpy.execute(f"SELECT username FROM users WHERE id = {id}")
    if res:
        return res[0]['username']
    return None
$$ LANGUAGE plpython3u;
```

## Install Python modules

You can use third-party Python modules in your PL/Python functions. The module must be installed on all hosts in the cluster (coordinator and segments).

To install a module, use `pip` on every host:

```bash
gpssh -f <hostfile> "pip3 install <module_name>"
```

Then you can import it in your function:

```sql
CREATE FUNCTION use_numpy()
RETURNS float
AS $$
    import numpy as np
    return np.mean([1, 2, 3, 4])
$$ LANGUAGE plpython3u;
```
