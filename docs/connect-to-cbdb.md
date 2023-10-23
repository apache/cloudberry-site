---
title: Connect to Cloudberry Database
---

# Connect to Cloudberry Database

## Establish a database session

Users can connect to Cloudberry Database using a PostgreSQL-compatible client program, such as `psql`. Users and administrators *always* connect to Cloudberry Database through the *coordinator*; the segments cannot accept client connections.

In order to establish a connection to the Cloudberry Database coordinator, you will need to know the following connection information and configure your client program accordingly.

|Connection Parameter|Description|Environment Variable|
|--------------------|-----------|--------------------|
|Application name|The application name that is connecting to the database. The default value, held in the `application_name` connection parameter is *psql*.|`$PGAPPNAME`|
|Database name|The name of the database to which you want to connect. For a newly initialized system, use the `postgres` database to connect for the first time.|`$PGDATABASE`|
|Host name|The host name of the Cloudberry Database coordinator. The default host is the local host.|`$PGHOST`|
|Port|The port number that the Cloudberry Database coordinator instance is running on. The default is 5432.|`$PGPORT`|
|User name|The database user (role) name to connect as. This is not necessarily the same as your OS user name. Check with your Cloudberry administrator if you are not sure what you database user name is. Note that every Cloudberry Database system has one superuser account that is created automatically at initialization time. This account has the same name as the OS name of the user who initialized the Cloudberry system (typically `gpadmin`).|`$PGUSER`|

[Connecting with psql](#connect-with-psql) provides example commands for connecting to Cloudberry Database.

## Supported client applications

Users can connect to Cloudberry Database using various client applications:

- A number of [Cloudberry Database Client Applications](#cloudberry-database-client-applications) are provided with your Cloudberry installation. The `psql` client application provides an interactive command-line interface to Cloudberry Database.
- Using standard [Database Application Interfaces](#database-application-interfaces), such as ODBC and JDBC, users can create their own client applications that interface to Cloudberry Database.
- Most client tools that use standard database interfaces, such as ODBC and JDBC, can be configured to connect to Cloudberry Database.

## Cloudberry Database client applications

Cloudberry Database comes installed with a number of client utility applications located in the `$GPHOME/bin` directory of your Cloudberry Database coordinator host installation. The following are the most commonly used client utility applications:

|Name|Usage|
|----|-----|
|`createdb`|create a new database|
|`createuser`|define a new database role|
|`dropdb`|remove a database|
|`dropuser`|remove a role|
|`psql`|PostgreSQL interactive terminal|
|`reindexdb`|reindex a database|
|`vacuumdb`|garbage-collect and analyze a database|

When using these client applications, you must connect to a database through the Cloudberry coordinator instance. You will need to know the name of your target database, the host name and port number of the coordinator, and what database user name to connect as. This information can be provided on the command-line using the options `-d`, `-h`, `-p`, and `-U` respectively. If an argument is found that does not belong to any option, it will be interpreted as the database name first.

All of these options have default values which will be used if the option is not specified. The default host is the local host. The default port number is 5432. The default user name is your OS system user name, as is the default database name. Note that OS user names and Cloudberry Database user names are not necessarily the same.

If the default values are not correct, you can set the environment variables `PGDATABASE`, `PGHOST`, `PGPORT`, and `PGUSER` to the appropriate values, or use a `psql` `~/.pgpass` file to contain frequently-used passwords.

## Connect with psql

Depending on the default values used or the environment variables you have set, the following examples show how to access a database via `psql`:

```shell
$ psql -d gpdatabase -h coordinator_host -p 5432 -U `gpadmin`
```

```shell
$ psql gpdatabase
```

```shell
$ psql
```

If a user-defined database has not yet been created, you can access the system by connecting to the `postgres` database. For example:

```shell
$ psql postgres
```

After connecting to a database, `psql` provides a prompt with the name of the database to which `psql` is currently connected, followed by the string `=>` (or `=#` if you are the database superuser). For example:

```shell
gpdatabase=>
```

At the prompt, you may type in SQL commands. A SQL command must end with a `;` (semicolon) in order to be sent to the server and run. For example:

```sql
=> SELECT * FROM mytable;
```

## Database application interfaces `<!-- 概念类信息，暂未验证 -->`

You may want to develop your own client applications that interface to Cloudberry Database. PostgreSQL provides a number of database drivers for the most commonly used database application programming interfaces (APIs), which can also be used with Cloudberry Database. These drivers are available as a separate download. Each driver (except libpq, which comes with PostgreSQL) is an independent PostgreSQL development project and must be downloaded, installed and configured to connect to Cloudberry Database. The following drivers are available:

|API|PostgreSQL Driver|Download Link|
|---|-----------------|-------------|
|ODBC|Cloudberry DataDirect ODBC Driver|[https://network.pivotal.io/products/pivotal-gpdb](https://network.pivotal.io/products/pivotal-gpdb).|
|ODBC|psqlODBC|[https://odbc.postgresql.org/](https://odbc.postgresql.org/)|
|JDBC|Cloudberry DataDirect JDBC Driver|[https://network.pivotal.io/products/pivotal-gpdb](https://network.pivotal.io/products/pivotal-gpdb)|
|JDBC|pgjdbc|[https://jdbc.postgresql.org/](https://jdbc.postgresql.org/)|
|Perl DBI|pgperl|[https://metacpan.org/release/DBD-Pg](https://metacpan.org/release/DBD-Pg)|
|Python DBI|pygresql|[http://www.pygresql.org/](http://www.pygresql.org/)|
|Python DBI|psycopg2|[https://www.psycopg.org/](https://www.psycopg.org/)|
|libpq C Library|libpq|[https://www.postgresql.org/docs/12/libpq.html](https://www.postgresql.org/docs/12/libpq.html)|

General instructions for accessing a Cloudberry Database with an API are:

1. Download your programming language platform and respective API from the appropriate source. For example, you can get the Java Development Kit (JDK) and JDBC API from Oracle.
2. Write your client application according to the API specifications. When programming your application, be aware of the SQL support in Cloudberry Database so you do not include any unsupported SQL syntax.

Download the appropriate driver and configure connectivity to your Cloudberry Database coordinator instance.

## Troubleshoot connection problems（基本验证 by @TomShawn）

A number of things can prevent a client application from successfully connecting to Cloudberry Database. This topic explains some of the common causes of connection problems and how to correct them.

| Problem | Solution |
| ------- | -------- |
| No `pg_hba.conf` entry for host or user | To enable Cloudberry Database to accept remote client connections, you must configure your Cloudberry Database coordinator instance so that connections are allowed from the client hosts and database users that will be connecting to Cloudberry Database. This is done by adding the appropriate entries to the `pg_hba.conf` configuration file (located in the coordinator instance's data directory). |
| Cloudberry Database is not running | If the Cloudberry Database coordinator instance is down, users will not be able to connect. You can verify that the Cloudberry Database system is up by running the `gpstate` utility on the Cloudberry coordinator host. |
| Network problems: Interconnect timeouts | If users connect to the Cloudberry coordinator host from a remote client, network problems can prevent a connection (for example, DNS host name resolution problems, the host system is down, and so on.). To ensure that network problems are not the cause, connect to the Cloudberry coordinator host from the remote client host. For example: `ping hostname`<br/><br/>If the system cannot resolve the host names and IP addresses of the hosts involved in Cloudberry Database, queries and connections will fail. For some operations, connections to the Cloudberry Database coordinator use `localhost` and others use the actual host name, so you must be able to resolve both. If you encounter this error, first make sure you can connect to each host in your Cloudberry Database array from the coordinator host over the network. In the `/etc/hosts` file of the coordinator and all segments, make sure you have the correct host names and IP addresses for all hosts involved in the Cloudberry Database array. The `127.0.0.1` IP must resolve to `localhost`. |
| Too many clients already `<!-- 无法验证 by @TomShawn -->` | By default, Cloudberry Database is configured to allow a maximum of 250 concurrent user connections on the coordinator and 750 on a segment. A connection attempt that causes that limit to be exceeded will be refused. This limit is controlled by the `max_connections` parameter in the `postgresql.conf` configuration file of the Cloudberry Database coordinator. If you change this setting for the coordinator, you must also make appropriate changes at the segments. |