---
title: Stored Procedures and User-Defined Functions
---

# Stored Procedures and User-Defined Functions

Apache Cloudberry provides powerful capabilities for extending the database functionality through Stored Procedures (SPs) and User-Defined Functions (UDFs).

## User-Defined functions (UDFs)

User-Defined Functions (UDFs) return values and can be used in queries. They allow you to bundle complex logic and calculations into reusable components.

Apache Cloudberry supports several procedural languages for writing UDFs:

- **PL/Python**: Write functions using Python 3. With the `plpython3u` untrusted language, you can access system calls and external libraries.
- **PL/Java**: Write functions using Java. Suitable for complex computations and integration with existing Java libraries.
- **PL/Perl**: Write functions using Perl, leveraging its strong string manipulation capabilities.
- **PL/Container**: Run Python and R functions securely inside Docker containers. This provides isolation and security for running untrusted code.

## Stored procedures

Stored Procedures are similar to functions but do not return a value. They are invoked using the `CALL` command and can handle transaction control (e.g., `COMMIT`, `ROLLBACK`) within the procedure body, which is not allowed in functions.

## Supported languages

| Language | Extension | Trusted or not | Description |
| :--- | :--- | :--- | :--- |
| **SQL** | Built-in | Yes | Write functions using standard SQL queries. |
| **PL/pgSQL** | Built-in | Yes | The procedural language for the PostgreSQL database system. |
| **PL/Python** | `plpython3u` | No | Python 3 procedural language. |
| **PL/Java** | `pljava` | Yes | Java procedural language. |
| **PL/Perl** | `plperl` | Yes | Perl procedural language. |
| **PL/Container** | `plcontainer` | Yes (Safe) | Run Python/R in Docker containers. |
