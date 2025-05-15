---
title: Use Column-Level Compression
---

# Use Column-Level Compression

Apache Cloudberry supports column-level compression, which reduces storage space by compressing specific columns. In some cases, it can also improve query performance, especially when processing large-scale data.

## User scenarios

- **Storage optimization**: Reduces disk space usage for storage-intensive applications.
- **Performance improvement**: Smaller compressed data blocks reduce I/O costs in columnar query scenarios.
- **High-frequency data analysis**: Lowers data access costs in large-scale data analysis.

## Example usage

The following is a simple example demonstrating how column-level compression can make a difference in Apache Cloudberry.

1. Create a table without column-level compression.

    ```sql
    CREATE TABLE no_column_compression (
        id serial PRIMARY KEY,
        data1 text,
        data2 text
    );
    ```

2. Create a table with column-level compression.

    ```sql
    CREATE TABLE column_compression (
        id serial PRIMARY KEY,
        data1 text ENCODING (compresstype=zlib, compresslevel=5),
        data2 text
    )
    WITH (
        appendoptimized=true,
        orientation=column
    );
    ```

3. Insert data into the table without column-level compression.

    ```sql
    INSERT INTO no_column_compression (data1, data2)
    SELECT repeat(md5(random()::text), 10), repeat(md5(random()::text), 10)
    FROM generate_series(1, 100000);
    ```

4. Insert data into the table with column-level compression.

    ```sql
    INSERT INTO column_compression (data1, data2)
    SELECT repeat(md5(random()::text), 10), repeat(md5(random()::text), 10)
    FROM generate_series(1, 100000);
    ```

5. Check the storage size of the table without column-level compression.

    ```sql
    SELECT pg_size_pretty(pg_total_relation_size('no_column_compression')) AS no_column_compression_size;
    ```

    Example result:

    ```sql
    no_column_compression_size
    ---------------------------
    69 MB
    ```

6. Check the storage size of the table with column-level compression.

    ```sql
    SELECT pg_size_pretty(pg_total_relation_size('column_compression')) AS column_compression_size;
    ```

    Example result:

    ```sql
    column_compression_size
    ------------------------
    36 MB
    ```

Compressed tables use significantly less storage space compared to uncompressed tables. In this example, the table with column-level compression reduced storage usage by nearly 50%.
