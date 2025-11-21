---
title: Use ODBC
---

# Use ODBC

Because Apache Cloudberry is compatible with Greenplum and PostgreSQL, ODBC access methods are the same as those for Greenplum/PostgreSQL.

This guide explains how to connect to Apache Cloudberry using ODBC on Linux or macOS and perform database operations.

## Prerequisites

Before connecting to Apache Cloudberry via ODBC, ensure you have:

- The PostgreSQL ODBC driver installed.
- An ODBC-compliant application or tool (for example, `psqlODBC`, `isql`, BI tools like Tableau).
- Connection details for Apache Cloudberry, including host, port, database name, username, and password.

## Install the ODBC driver

The PostgreSQL ODBC driver can be downloaded from the [official PostgreSQL ODBC website](https://odbc.postgresql.org/). Ensure you install the correct version for your operating system.

1. Install the required packages (for Ubuntu/Debian):

    ```sh
    sudo apt update && sudo apt install -y unixodbc odbc-postgresql
    ```

2. Verify installation:

    ```sh
    odbcinst -q -d
    ```

    The output should list `PostgreSQL` as a supported driver.

## Configure ODBC connection

Edit the ODBC driver configuration file (`/etc/odbcinst.ini`):

```ini
[PostgreSQL]
Description = ODBC for PostgreSQL
Driver = /usr/lib/x86_64-linux-gnu/odbc/psqlodbcw.so
Setup = /usr/lib/x86_64-linux-gnu/odbc/libodbcpsqlS.so
```

Edit the ODBC data source file (`/etc/odbc.ini`):

```ini
[YourDataSource]
Driver = PostgreSQL
ServerName = your-db-host
Port = 5432
Database = your_database
UserName = your_username
Password = your_password
SSLmode = prefer
```

## Connect to Apache Cloudberry via ODBC

### Use `isql`

Once the DSN is configured, you can test the connection using `isql`:

```sh
isql -v YourDataSource your_username your_password
```

If the connection is successful, you will enter an interactive SQL shell.

### Use Python (`pyodbc`)

If you prefer to connect using Python, install the `pyodbc` package and use the following script:

```python
import pyodbc

conn = pyodbc.connect(
   "DSN=YourDataSource;UID=your_username;PWD=your_password"
)
cursor = conn.cursor()
cursor.execute("SELECT version();")
row = cursor.fetchone()
print("Database Version:", row[0])
conn.close()
```

## Execute SQL statements

### Query data

```python
cursor.execute("SELECT id, name FROM users;")
for row in cursor.fetchall():
   print(f"ID: {row[0]}, Name: {row[1]}")
```

### Insert data

```python
cursor.execute("INSERT INTO users (id, name) VALUES (1, 'Alice');")
conn.commit()
```

### Update data

```python
cursor.execute("UPDATE users SET name = 'Bob' WHERE id = 1;")
conn.commit()
```

### Delete data

```python
cursor.execute("DELETE FROM users WHERE id = 1;")
conn.commit()
```

## Connection troubleshooting

If the connection fails, check:

- Network accessibility to Apache Cloudberry.
- Firewall or security group settings allowing PostgreSQL port (default 5432).
- Correct ODBC DSN settings.
- Database logs for error messages.
