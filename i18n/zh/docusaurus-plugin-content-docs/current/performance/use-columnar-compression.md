---
title: 使用列级压缩
---

# 使用列级压缩

Apache Cloudberry 支持列级压缩功能，通过对指定列进行数据压缩，可以显著减少存储空间的占用。在某些情况下，列级压缩还能优化查询性能，特别是在处理大规模数据时。

## 使用场景

- **存储优化**：对于存储密集型的应用，列级压缩能够有效减少磁盘空间使用。
- **性能提升**：在列存储的查询场景下，压缩后的数据块更小，可以减少 I/O 开销。
- **高频数据分析**：在大规模数据分析场景中，列级压缩可以降低读取数据的成本。

## 使用示例

以下是一个简单的列级压缩功能示例，展示了在 Apache Cloudberry 中使用列级压缩的效果。

1. 创建不使用列级压缩的表。

    ```sql
    CREATE TABLE no_column_compression (
        id serial PRIMARY KEY,
        data1 text,
        data2 text
    );
    ```

2. 创建使用列级压缩的表。

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

3. 插入数据到不使用列级压缩的表。

    ```sql
    INSERT INTO no_column_compression (data1, data2)
    SELECT repeat(md5(random()::text), 10), repeat(md5(random()::text), 10)
    FROM generate_series(1, 100000);
    ```

4. 插入数据到使用列级压缩的表。

    ```sql
    INSERT INTO column_compression (data1, data2)
    SELECT repeat(md5(random()::text), 10), repeat(md5(random()::text), 10)
    FROM generate_series(1, 100000);
    ```

5. 查看不使用列级压缩的表的存储空间。

    ```sql
    SELECT pg_size_pretty(pg_total_relation_size('no_column_compression')) AS no_column_compression_size;
    ```

    示例结果：

    ```sql
    no_column_compression_size
    ---------------------------
    69 MB
    ```

6. 查看使用列级压缩的表的存储空间。

    ```sql
    SELECT pg_size_pretty(pg_total_relation_size('column_compression')) AS column_compression_size;
    ```

    示例结果：

    ```sql
    column_compression_size
    ------------------------
    36 MB
    ```

压缩后的表占用的存储空间明显小于未压缩的表。在本示例中，使用列级压缩的表减少了接近 50% 的存储空间。