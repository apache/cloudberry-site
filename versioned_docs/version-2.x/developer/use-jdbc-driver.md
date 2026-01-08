---
title: Use JDBC
---

# Use JDBC

Because Apache Cloudberry is compatible with Greenplum and PostgreSQL, JDBC access methods are the same as those for Greenplum/PostgreSQL.

This guide explains how to connect to Apache Cloudberry using JDBC and perform database operations.

## Prerequisites

Before connecting to Apache Cloudberry via JDBC, ensure you have:

- A Java runtime environment (JDK 1.8 or later) installed.
- The PostgreSQL JDBC driver (`postgresql-<version>.jar`) downloaded.
- Connection details for Apache Cloudberry, including host, port, database name, username, and password.

## Step 1. Download the JDBC driver

The JDBC driver can be downloaded from the [official PostgreSQL website](https://jdbc.postgresql.org/). Use the latest stable version compatible with Apache Cloudberry.

Example download command (for version 42.5.0):

```sh
wget https://jdbc.postgresql.org/download/postgresql-42.5.0.jar
```

## Step 2. Connect to Apache Cloudberry

To connect to Apache Cloudberry, use the following connection string format in you Java program.

```text
jdbc:postgresql://<host>:<port>/<database>?parameters
```

Common parameters:

- `user=<username>`: Specifies the database username.
- `password=<password>`: Specifies the database password.
- `ssl=<true|false>`: Enables or disables SSL connection.
- `ApplicationName=<app_name>`: Optional, used to identify the client application.

Example:

```text
jdbc:postgresql://db.example.com:5432/mydb?user=myuser&password=mypass&ssl=true
```

The following example demonstrates how to connect to Apache Cloudberry using JDBC:

```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class DBExample {
   public static void main(String[] args) {
      String url = "jdbc:postgresql://your-db-host:5432/your_database";
      String user = "your_username";
      String password = "your_password";

      try (Connection conn = DriverManager.getConnection(url, user, password);
          Statement stmt = conn.createStatement();
          ResultSet rs = stmt.executeQuery("SELECT version();")) {

         while (rs.next()) {
            System.out.println("Database Version: " + rs.getString(1));
         }
      } catch (SQLException e) {
         e.printStackTrace();
      }
   }
}
```

## Step 3. Set up the environment

### Download PostgreSQL JDBC driver

Before connecting to the database, download the PostgreSQL JDBC driver:

```bash
wget https://jdbc.postgresql.org/download/postgresql-42.5.0.jar
```

### Compile Java code

After writing the Java program, compile it using the downloaded JDBC driver:

```bash
javac -cp postgresql-42.5.0.jar YourJavaProgram.java
```

### Run the Java program

Execute the Java program with the classpath set to include the JDBC driver:

```bash
java -cp .:postgresql-42.5.0.jar YourJavaProgram
```

## Execute SQL statements

To execute SQL statements through JDBC, you can refer to the following sections to add code to your java program.

### Query data

```java
String query = "SELECT id, name FROM users";
try (Statement stmt = conn.createStatement();
    ResultSet rs = stmt.executeQuery(query)) {
   while (rs.next()) {
      int id = rs.getInt("id");
      String name = rs.getString("name");
      System.out.println("ID: " + id + ", Name: " + name);
   }
}
```

### Insert data

```java
String insertSQL = "INSERT INTO users (id, name) VALUES (1, 'Alice')";
try (Statement stmt = conn.createStatement()) {
   int rowsAffected = stmt.executeUpdate(insertSQL);
   System.out.println("Rows inserted: " + rowsAffected);
}
```

### Update data

```java
String updateSQL = "UPDATE users SET name = 'Bob' WHERE id = 1";
try (Statement stmt = conn.createStatement()) {
   int rowsAffected = stmt.executeUpdate(updateSQL);
   System.out.println("Rows updated: " + rowsAffected);
}
```

### Delete data

```java
String deleteSQL = "DELETE FROM users WHERE id = 1";
try (Statement stmt = conn.createStatement()) {
   int rowsAffected = stmt.executeUpdate(deleteSQL);
   System.out.println("Rows deleted: " + rowsAffected);
}
```

## Transaction management

JDBC allows explicit transaction control:

```java
conn.setAutoCommit(false);
try (Statement stmt = conn.createStatement()) {
   stmt.executeUpdate("INSERT INTO users (id, name) VALUES (2, 'Charlie')");
   stmt.executeUpdate("UPDATE users SET name = 'Charlie Updated' WHERE id = 2");
   conn.commit();
} catch (SQLException e) {
   conn.rollback();
   e.printStackTrace();
}
```

## Use connection pools

In production environments, using a connection pool (for example, HikariCP) improves performance.

### Add HikariCP dependency

For Maven:

```xml
<dependency>
   <groupId>com.zaxxer</groupId>
   <artifactId>HikariCP</artifactId>
   <version>5.0.1</version>
</dependency>
```

### Configure HikariCP

```java
HikariConfig config = new HikariConfig();
config.setJdbcUrl("jdbc:postgresql://your-db-host:5432/your_database");
config.setUsername("your_username");
config.setPassword("your_password");
config.setMaximumPoolSize(10);
HikariDataSource dataSource = new HikariDataSource(config);
```

## Troubleshoot connection issues

If the connection fails, check:

- Network accessibility to Apache Cloudberry.
- Firewall or security group settings allowing PostgreSQL port (default 5432).
- Correct JDBC URL, username, and password.
- Database logs for detailed error messages.
