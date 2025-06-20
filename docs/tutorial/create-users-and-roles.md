---
title: "Lesson 1: Create Users and Roles"
description: Learn how to create users and roles in the Apache Cloudberry with this helpful introduction.
---

Apache Cloudberry manages database access using roles. Initially, there is one superuser role, the role associated with the OS user who initialized the database instance, usually `gpadmin`. This user owns all of the Apache Cloudberry files and OS processes, so it is important to reserve the `gpadmin` role for system tasks only.

A role can be a user or a group. A user role can log into a database; that is, it has the `LOGIN` attribute. A user or group role can become a member of a group.

Permissions can be granted to users or groups. Initially, only the `gpadmin` role is able to create roles. You can add roles using the `createuser` utility command, `CREATE ROLE` SQL command, or the `CREATE USER` SQL command. The `CREATE USER` command is the same as the `CREATE ROLE` command except that it automatically assigns the role the `LOGIN` attribute.

## Quick-start operations

You can follow the examples below to create users and roles.

Before moving on to the operations, make sure that you have installed Apache Cloudberry by following [Install a Apache Cloudberry](https://github.com/apache/cloudberry-bootcamp/tree/main/000-cbdb-sandbox).

### Create a user using the CREATE USER command

1. Log into Apache Cloudberry in Docker. Connect to the database as the `gpadmin` user.

    ```shell
    [gpadmin@cdw ~]$ psql

    psql (14.4, server 14.4)
    Type "help" for help.
    ```

    ```shell
    gpadmin=#
    ```

2. Create a user named `lily` using the `CREATE USER` command, with a password `changeme`. After the creation, you need to enter the password to log in as the user `lily`.

    ```sql
    gpadmin=# CREATE USER lily WITH PASSWORD 'changeme';
    ```

    Output:

    ```sql
    NOTICE:  resource queue required -- using default resource queue "pg_default"
    CREATE ROLE
    ```

3. Verify that the user `lily` has been created.

    ```sql
    gpadmin=# \du
                                 List of roles
     Role name |                   Attributes                   | Member of
    -----------+------------------------------------------------+-----------
     gpadmin   | Superuser, Create role, Create DB, Replication | {}
     lily      |                                                | {}
    ```

### Create a user using the createuser utility command

1. Create a user named `lucy` using the `createuser` utility command.

    ```sql
    gpadmin=# \q  -- exit psql
    ```

    ```shell
    [gpadmin@cdw ~]$ createuser --interactive lucy
    ```

    You will be asked to choose whether the new role should be a superuser. Enter `y` to create a superuser.

    ```shell
    Shall the new role be a superuser? (y/n)
    ```

2. Connect to the database as the `gpadmin` user.

    ```shell
    [gpadmin@cdw ~]$ psql

    psql (14.4, server 14.4)
    Type "help" for help.
    ```

3. Verify that the user `lucy` has been created.

    ```sql
    gpadmin=# \du
                                 List of roles
     Role name |                   Attributes                   | Member of
    -----------+------------------------------------------------+-----------
     gpadmin   | Superuser, Create role, Create DB, Replication | {}
     lily      |                                                | {}
     lucy      | Superuser, Create role, Create DB              | {}
    ```

    ```sql
    gpadmin=# \q  -- exit psql
    ```

### Create a users group and add the users to it

1. Connect to the database as the `gpadmin` user.

    ```shell
    [gpadmin@cdw ~]$ psql

    psql (14.4, server 14.4)
    Type "help" for help.
    ```

    Output:

    ```shell
    gpadmin=#
    ```

2. Create a group named `users` using the `CREATE ROLE` command.

    ```sql
    gpadmin=# CREATE ROLE users;
    ```

    Output:

    ```sql
    NOTICE:  resource queue required -- using default resource queue "pg_default"
    CREATE ROLE
    ```

3. Add the `lily` and `lucy` users to the `users` group.

    ```sql
    gpadmin=# GRANT users TO lily, lucy;
    ```

    Output:

    ```sql
    GRANT ROLE
    ```

4. Verify that the two users have been added to the `users` group.

    ```sql
    gpadmin=# \du
                                 List of roles
     Role name |                   Attributes                   | Member of
    -----------+------------------------------------------------+-----------
     gpadmin   | Superuser, Create role, Create DB, Replication | {}
     lily      |                                                | {users}
     lucy      | Superuser, Create role, Create DB              | {users}
     users     | Cannot login                                   | {}
    ```

However, after creating the `users` group, `lily` and `lucy` cannot log into Apache Cloudberry yet. See the following error messages.

```shell
[gpadmin@cdw ~]$ psql -U lily -d gpadmin

psql: error: connection to server on socket "/tmp/.s.PGSQL.5432" failed: FATAL:  no pg_hba.conf entry for host "[local]", user "lily", database "gpadmin", no encryption
```

```shell
[gpadmin@cdw ~]$ psql -U lucy -d gpadmin

psql: error: connection to server on socket "/tmp/.s.PGSQL.5432" failed: FATAL:  no pg_hba.conf entry for host "[local]", user "lucy", database "gpadmin", no encryption
```

To make users (`lily` and `lucy`) able to log into the database, you need to adjust the `pg_hba.conf` configuration file on the coordinator node and use `gpstop` to populate the change.

1. Append `local gpadmin lily md5` and `local gpadmin lucy trust` to the `pg_hba.conf` file on the coordinator node.

    ```sql
    gpadmin=# \q  -- exit psql
    ```

    ```shell
    [gpadmin@cdw ~]$ echo "local gpadmin lily md5" >> /data0/database/coordinator/gpseg-1/pg_hba.conf
    [gpadmin@cdw ~]$ echo "local gpadmin lucy trust" >> /data0/database/coordinator/gpseg-1/pg_hba.conf
    ```

    > **Info:**
    >
    > - `pg_hba.conf` is a configuration file in Apache Cloudberry to control access permissions.
    > - `md5` and `trust` are the authentication methods. `md5` means that the user needs to enter the password to log in. `trust` means that the user can log in without entering the password.

2. Use `gpstop` to populate the change.

    ```shell
    [gpadmin@cdw ~]$ gpstop -u
    ```

    ```shell
    20230818:14:16:05:003653 gpstop:cdw:gpadmin-[INFO]:-Starting gpstop with args: -u
    20230818:14:16:05:003653 gpstop:cdw:gpadmin-[INFO]:-Gathering information and validating the environment...
    20230818:14:16:05:003653 gpstop:cdw:gpadmin-[INFO]:-Obtaining Cloudberry Coordinator catalog information
    20230818:14:16:05:003653 gpstop:cdw:gpadmin-[INFO]:-Obtaining Segment details from coordinator...
    20230818:14:16:05:003653 gpstop:cdw:gpadmin-[INFO]:-Cloudberry Version: 'postgres (Apache Cloudberry) 1.0.0 build dev'
    20230818:14:16:05:003653 gpstop:cdw:gpadmin-[INFO]:-Signalling all postmaster processes to reload
    ```

3. Verify that the two users can log into the database.

    ```shell
    [gpadmin@cdw ~]$ psql -U lily -d gpadmin
    Password for user lily:  # changeme

    psql (14.4, server 14.4)
    Type "help" for help.
    ```

    ```shell
    [gpadmin@cdw ~]$ psql -U lucy -d gpadmin

    psql (14.4, server 14.4)
    Type "help" for help.
    ```

    User `lily` and user `lucy` have had different privileges. You need to provide the password "changeme" for lily when login.
