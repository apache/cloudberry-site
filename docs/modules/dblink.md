---
title: dblink
---

# dblink

The `dblink` module supports connections to other databases from within a database session. The other database can be in the same Apache Cloudberry cluster, in another Apache Cloudberry cluster, or in a PostgreSQL server.

:::note
`dblink` is intended for short ad hoc queries in other databases. It is not a replacement for external tables, foreign tables, or data migration tools.
:::

The Apache Cloudberry `dblink` module is a modified version of the PostgreSQL `dblink` module. See [MPP considerations](#mpp-considerations) for the restrictions that apply.

## Install and register the module

`dblink` is built and installed by a default Apache Cloudberry build. Register the extension in each database in which you want to use it:

```sql
CREATE EXTENSION dblink;
```

## MPP considerations

- A named or implicit (unnamed) `dblink` connection exists only in the coordinator process that serves your session. A statement that modifies table data, such as `INSERT INTO ... SELECT ... FROM dblink(...)`, runs the `dblink()` call in a different process, which cannot see that connection. In such statements, pass the connection string directly to `dblink()`:

    ```sql
    CREATE TABLE testdbllocal (a int, b text) DISTRIBUTED BY (a);
    INSERT INTO testdbllocal
      SELECT * FROM dblink('dbname=postgres', 'SELECT * FROM testdblink') AS dbltab(id int, product text);
    ```

    If you use a connection name instead, the statement fails with the error `could not establish connection`, and the detail `missing "=" after "<connection name>" in connection info string`.

- Asynchronous queries are not supported. The extension does not create the `dblink_send_query()`, `dblink_is_busy()`, and `dblink_get_result()` functions.

- A non-superuser must specify both `host` and `password` in the connection string of `dblink_connect()` and `dblink()`, even to connect to a local database. Otherwise, the call fails with `host is required` or `password is required`. If a non-superuser does not specify `user`, the name of the current database user is used.

## Use dblink

The following steps show the basic use of `dblink`. The examples use `dblink_connect()` to create a connection to a database and `dblink()` to run an SQL query.

1. Create a sample table in the `postgres` database:

    ```sql
    CREATE TABLE testdblink (a int, b text) DISTRIBUTED BY (a);
    INSERT INTO testdblink VALUES (1, 'Cheese'), (2, 'Fish');
    ```

2. Log in to a different database, for example `testdb`, as a superuser, and register the extension if you have not done so:

    ```sql
    CREATE EXTENSION dblink;
    ```

3. Use `dblink_connect()` to create either an implicit or a named connection to another database. The connection string is a `libpq`-style keyword/value string. This example creates a connection named `mylocalconn` to the `postgres` database on the local cluster:

    ```sql
    SELECT dblink_connect('mylocalconn', 'dbname=postgres user=gpadmin');
    ```

    ```text
     dblink_connect
    ----------------
     OK
    (1 row)
    ```

4. Use `dblink()` to run a query over the connection. The function returns `record`, so you must specify the names and types of the returned columns:

    ```sql
    SELECT * FROM dblink('mylocalconn', 'SELECT * FROM testdblink') AS dbltab(id int, product text);
    ```

    ```text
     id | product
    ----+---------
      1 | Cheese
      2 | Fish
    (2 rows)
    ```

5. Close the connection when you no longer need it:

    ```sql
    SELECT dblink_disconnect('mylocalconn');
    ```

To connect to a remote system, include the host and password information in the connection string. For example, to create an implicit connection:

```sql
SELECT dblink_connect('host=remotehost port=5432 dbname=postgres user=gpadmin password=secret');
```

### Use dblink as a non-superuser

A non-superuser must include the host and the password in the connection string of `dblink_connect()`. For example, the user `test_user` can create a connection to the local coordinator host `cdw` with this command:

```sql
SELECT dblink_connect('host=cdw port=5432 dbname=postgres user=test_user password=secret');
```

In addition, the remote server must actually request a password for the connection. If it does not (for example, with `trust` authentication), the call fails with `password is required`.

To let non-superusers create connections that do not require a password, use the `dblink_connect_u()` function. It is identical to `dblink_connect()`, except that it skips these checks. `dblink_connect_u()` is installed with all privileges revoked from `PUBLIC`, so only superusers can call it until you grant the `EXECUTE` privilege on it.

:::caution
Grant `EXECUTE` on `dblink_connect_u()` only to users that you trust. If the target system has users with an authentication method that does not involve a password, a non-superuser who can call `dblink_connect_u()` can impersonate such a user and escalate privileges. Also, a password can be supplied from the server environment, such as a `~/.pgpass` file that belongs to the operating system user that runs the server.
:::

1. As a superuser, grant the `EXECUTE` privilege on the `dblink_connect_u()` functions:

    ```sql
    GRANT EXECUTE ON FUNCTION dblink_connect_u(text) TO test_user;
    GRANT EXECUTE ON FUNCTION dblink_connect_u(text, text) TO test_user;
    ```

2. As `test_user`, create a connection without a password, and use it:

    ```sql
    SELECT dblink_connect_u('testconn', 'dbname=postgres user=test_user');
    SELECT * FROM dblink('testconn', 'SELECT * FROM testdblink') AS dbltab(id int, product text);
    ```

### Use dblink with SSL-encrypted connections

To connect over an encrypted connection, specify the `sslmode` keyword in the connection string. Set `sslmode` to at least `require` to disallow unencrypted connections. For example:

```sql
SELECT dblink_connect('con_sales', 'dbname=sales host=cdw user=gpadmin sslmode=require');
```

## Module documentation

See [dblink](https://www.postgresql.org/docs/14/dblink.html) in the PostgreSQL documentation for details about the individual functions in this module.
