



# pg_test_timing Documentation

## Overview

`pg_test_timing` is a utility tool provided by Cloudberry for testing the timing behavior of PostgreSQL database operations. It helps in identifying performance bottlenecks and optimizing database operations.

## Features

- Measures execution time of SQL queries
- Supports multiple query execution modes
- Provides detailed timing reports

## Usage

To use `pg_test_timing`, follow these steps:

1. Install `pg_test_timing` if not already installed.
2. Run the tool with the necessary parameters.

Example command:
```bash
pg_test_timing -d your_database -c "SELECT * FROM your_table"