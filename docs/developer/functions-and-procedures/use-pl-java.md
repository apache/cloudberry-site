---
title: Use PL/Java
---

# Use PL/Java

PL/Java is an embedded trusted procedural language that allows you to write PostgreSQL functions and triggers using the Java programming language. 

With PL/Java, you can:

- Write functions in Java and call them from SQL.
- Use the Java Standard Library.
- Access the database via JDBC from within the Java function.

## Enable PL/Java

To use PL/Java, you must enable it in your database.

1. Connect to your database using `psql`.

    ```bash
    psql -d <database_name>
    ```

2. Create the `pljava` extension.

    ```sql
    CREATE EXTENSION pljava;
    ```

    This registers both the trusted (`pljava`) and untrusted (`javau`) languages. If you only want the trusted language, use `CREATE EXTENSION pljavat`.

3. Configure the classpath headers.
    
    You need to set the `pljava_classpath` configuration parameter to include the JAR files containing your Java classes.

    ```sql
    SET pljava_classpath = 'examples.jar:myclasses.jar';
    ```

    To make this change permanent for the database:

    ```sql
    ALTER DATABASE <database_name> SET pljava_classpath = 'examples.jar:myclasses.jar';
    ```

## Write PL/Java functions

To create a PL/Java function, you write a Java class with static methods, compile it into a JAR file, and then declare the function in SQL.

### SQL declaration

A Java function is declared with the name of a class and a static method on that class.

```sql
CREATE FUNCTION getsysprop(VARCHAR)
RETURNS VARCHAR
AS 'java.lang.System.getProperty'
LANGUAGE java;
```

You can then call the function just like any other SQL function:

```sql
SELECT getsysprop('user.home');
```

### Type mapping

PL/Java automatically maps PostgreSQL types to Java types.

| PostgreSQL type | Java type |
| :--- | :--- |
| `boolean` | `boolean` |
| `smallint` | `short` |
| `integer` | `int` |
| `bigint` | `long` |
| `real` | `float` |
| `double precision` | `double` |
| `text`, `varchar`, `char` | `java.lang.String` |
| `date` | `java.sql.Date` |
| `time` | `java.sql.Time` |
| `timestamp` | `java.sql.Timestamp` |
| `bytea` | `byte[]` |

### NULL handling

Primitive Java types (like `int`, `double`, `boolean`) cannot be `NULL`. If you pass a SQL `NULL` to a Java function expecting a primitive, it will result in an error unless you map it to the corresponding wrapper class (for example, `java.lang.Integer`).

Example of handling NULLs:

1. Create the Java method.

    ```java
    package com.example;
    public class Utils {
        public static boolean trueIfEvenOrNull(Integer value) {
            return (value == null) ? true : (value.intValue() % 2) == 0;
        }
    }
    ```

2. Declare the function in SQL using the full class name.

    ```sql
    CREATE FUNCTION true_if_even_or_null(integer)
    RETURNS boolean
    AS 'com.example.Utils.trueIfEvenOrNull(java.lang.Integer)'
    LANGUAGE java;
    ```

### Complex types

You can pass complex types and rows to Java functions. PL/Java supports `Complex` types and `ResultSet` for handling rows and sets.

## Use JDBC

PL/Java includes a JDBC driver that allows your Java code to access the database where the function is running.

To establish a connection to the current database session:

```java
import java.sql.Connection;
import java.sql.DriverManager;

Connection conn = DriverManager.getConnection("jdbc:default:connection");
```

### Limitations

When using the internal JDBC driver (`jdbc:default:connection`):
- You cannot manage transactions explicitly (`commit()`, `rollback()`, etc. are not allowed). The function runs within the transaction context of the calling SQL statement.
- `Savepoint` operations are allowed but must be released within the same function.
- `ResultSet` from `executeQuery()` is always `FETCH_FORWARD` and `CONCUR_READ_ONLY`.

## Handle exceptions

PL/Java maps database errors to `java.sql.SQLException`. You can catch standard SQL exceptions in your Java code. If your Java code throws an exception, it is reported as an error to the PostgreSQL client, and the transaction is aborted (unless caught by a savepoint).

## Log messages

PL/Java uses the standard `java.util.logging.Logger`. Messages logged via this logger are redirected to the PostgreSQL log system (`elog`).

```java
import java.util.logging.Logger;

Logger.getAnonymousLogger().info("Time is " + new java.util.Date());
```

The database configuration `log_min_messages` determines which log levels are actually sent to the client or written to the server log.

## Security

- **Trusted Language (`java`)**: When using the trusted `java` language, the Java security manager prevents access to the file system and other sensitive system resources using standard Java security policies. Any user can create functions in the trusted language.
- **Untrusted Language (`javau`)**: The untrusted `javau` language allows unrestricted access (for example, file system access), similar to a standalone Java application. Only superusers can create functions using `javau`.
