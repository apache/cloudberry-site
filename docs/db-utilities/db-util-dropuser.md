---
title: dropuser
---

# dropuser

Removes a database role.

## Synopsis

```shell
dropuser [<connection-option> ...] [-e] [-i] <role_name>

dropuser -? | --help 

dropuser -V | --version
```

## Description

`dropuser` removes an existing role from Cloudberry Database. Only superusers and users with the `CREATEROLE` privilege can remove roles. To remove a superuser role, you must yourself be a superuser.

`dropuser` is a wrapper around the SQL command `DROP ROLE`.

## Options

**`role_name`**

The name of the role to be removed. You will be prompted for a name if not specified on the command line and the `-i`/`--interactive` option is used.

**`-e | --echo`**

Echo the commands that `dropuser` generates and sends to the server.

**`-i | --interactive`**

Prompt for confirmation before actually removing the role, and prompt for the role name if none is specified on the command line.

**`--if-exists`**

Do not throw an error if the user does not exist. A notice is issued in this case.

**`-V | --version`**

Print the `dropuser` version and exit.

**`-? | --help`**

Show help about `dropuser` command line arguments, and exit.

### Connection options

**`-h host | --host=host`**

The host name of the machine on which the Cloudberry coordinator database server is running. If not specified, reads from the environment variable `PGHOST` or defaults to localhost.

**`-p port | --port=port`**

The TCP port on which the Cloudberry coordinator database server is listening for connections. If not specified, reads from the environment variable `PGPORT` or defaults to 5432.

**`-U username | --username=username`**

The database role name to connect as. If not specified, reads from the environment variable `PGUSER` or defaults to the current system role name.

**`-w | --no-password`**

Never issue a password prompt. If the server requires password authentication and a password is not available by other means such as a `.pgpass` file, the connection attempt will fail. This option can be useful in batch jobs and scripts where no user is present to enter a password.

**`-W | --password`**

Force a password prompt.

## Examples

To remove the role `joe` using default connection options:

```shell
dropuser joe
DROP ROLE
```

To remove the role joe using connection options, with verification, and a peek at the underlying command:

```shell
dropuser -p 54321 -h coordinatorhost -i -e joe
Role "joe" will be permanently removed.
Are you sure? (y/n) y
DROP ROLE "joe"
DROP ROLE
```

## See also

[createuser](/docs/db-utilities/db-util-createuser.md), [`DROP ROLE`](/docs/sql-stmts/sql-stmt-drop-role.md)
