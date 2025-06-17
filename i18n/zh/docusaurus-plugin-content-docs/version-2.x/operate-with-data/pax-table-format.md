---
title: PAX 存储格式
---

# PAX 存储格式

Apache Cloudberry 支持 PAX (Partition Attributes Across) 存储格式。

PAX 是一种数据库存储格式，它结合了行式存储 (NSM，N-ary Storage Model) 和列式存储 (DSM，Decomposition Storage Model) 的优点，旨在提高数据库的查询性能，尤其是在缓存效率方面。在 OLAP 场景下，PAX 拥有媲美行式存储的批量写入性能和列式存储的读取性能。PAX 既能适应云环境下基于对象存储的存储模型，也能适应于线下传统基于物理文件的存储方式。

与传统存储格式相比，PAX 还有以下特性：

- 数据更新和删除：PAX 采用标记删除的方式对数据进行删除和更新，这样可以有效地管理存储在物理文件中的数据变更，而无需立即重写整个数据文件。
- 并发控制与读写隔离：PAX 使用多版本并发控制 (MVCC) 技术来实现高效的并发控制和读写隔离，其控制粒度达到单个数据文件级别，增强了操作的安全性和效率。
- 索引支持：支持 B-tree 索引，这有助于加速查询操作，特别是在处理大量数据时可以显著提高数据检索速度。
- 数据编码与压缩：PAX 提供多种数据编码（如 run-length encoding, delta encoding）和压缩方法（如 zstd, zlib），及多种压缩级别，这些特性帮助减少存储空间需求，同时优化读取性能。
- 统计信息：数据文件包含详细的统计信息，这些信息用于快速过滤和查询优化，从而减少不必要的数据扫描，加快查询处理速度。

## 适用场景

PAX 的混合存储能力使其适合于需要处理大量数据写入和频繁查询的复杂 OLAP 应用。无论是在云基础设施中寻求高性能数据分析解决方案，还是在传统数据中心环境中处理大规模数据集，PAX 都能提供强大支持。

## 从源码编译 Cloudberry 时启用 PAX

要在从源码编译 Apache Cloudberry 时启用 PAX，你需要：

1. 确保满足以下依赖要求：

    - C/C++ 编译器：GCC/GCC-C++ 11 或更高版本
    - CMake：3.11 或更高版本
    - Protobuf：3.5.0 或更高版本
    - ZSTD (libzstd)：1.4.0 或更高版本

2. 在 Cloudberry 源码目录的顶层运行以下命令以下载子模块：

   ```bash
   git submodule update --init --recursive
   ```

   执行该命令会下载这些子模块，用来构建和测试 PAX：

    - yyjson (`dependency/yyjson`)
    - cpp-stub (`contrib/pax_storage/src/cpp/cotnrib`)
    - googlebench (`contrib/pax_storage/src/cpp/cotnrib`)
    - googletest (`contrib/pax_storage/src/cpp/cotnrib`)
    - tabulate (`contrib/pax_storage/src/cpp/cotnrib`)

    :::note 注意
    上述子模块已经包含在最新发布的源代码压缩包中，因此解压后无需手动下载这些子模块。
    :::

3. 在运行 `configure` 命令时，添加 `--enable-pax` 选项。例如：

    ```bash
    ./configure --enable-pax --with-perl --with-python --with-libxml --with-gssapi --prefix=/usr/local/cloudberrydb
    ```

    另外，如果要在 `DEBUG` 模式下启用 PAX，请在 `configure` 命令中添加 `--enable-cassert` 选项（与 `--enable-pax` 一起），PAX 中的 `GTEST` 将会被编译。运行 `GTEST` 如下：

    ```bash
    cd contrib/pax_storage/build
    ./src/cpp/test_main
    ```

:::tip 提示
如果你对 PAX 的实现细节感兴趣，可以参考 [GitHub 仓库中的设计文档](https://github.com/apache/cloudberry/tree/main/contrib/pax_storage/doc)。
:::

## 使用方法

### 创建 PAX 的表

要创建 PAX 格式的表，你需要将表的访问方式 (Table Access Method) 设为 PAX，可以参照以下任一方法进行设置：

- 在建表时显式使用 `USING PAX` 子句，例如：

    ```sql
    CREATE TABLE t1(a int, b int, c text) USING PAX;
    -- t1 为 PAX 表，可以作为普通 heap 表使用。
    ```

- 先设置表的默认访问方式，然后再建表：

    ```sql
    -- 设置表的默认访问方式，此后新建的表都将使用 PAX 格式。
    SET default_table_access_method = pax;

    -- 隐式使用默认表访问方式，即 PAX。
    CREATE TABLE t1(a int, b int, c text);
    ```

在建表时，你还可以指定部分列的最小值和最大值信息，以加速查询：

```sql
-- 通过 WITH(minmax_columns='b,c') 指定了对
-- 列 b 和 c 记录最小值和最大值（minmax）统计信息。
-- 这可以帮助优化那些涉及这两列的查询，
-- 因为系统可以快速判断哪些数据块可能包含符合条件的数据。
CREATE TABLE p2(a INT, b INT, c INT) USING pax WITH(minmax_columns='b,c');

INSERT INTO p2 SELECT i, i * 2, i * 3 FROM generate_series(1,10)i;


-- 由于 b 列有 minmax 统计信息，
-- 系统可以快速定位到可能包含该值的数据块，从而加速查询过程。
SELECT * FROM p2 WHERE b = 4;

-- 同样，由于 b 列的 minmax 信息，系统能迅速确定没有数据块能满足这个条件
--（如果所有生成的值都是正的），可能直接返回没有数据的结果，从而避免不必要的数据扫描。
SELECT * FROM p2 WHERE b < 0;

-- 修改表 p2 的 minmax 统计信息设置，使其仅适用于列 b。对于之后插入的数据，
-- 只有 b 列会维护这种统计信息，而对已存在的数据不会产生影响，也不会进行重新写入或调整。
ALTER TABLE p2 SET(minmax_columns='b');
```

### 查看已有表的格式

要查看一张表是否为 PAX 格式，可使用下面任一方法：

- 使用 `psql` 命令 `\d+`：

    ```sql
    gpadmin=# \d+ t1
                                                Table "public.t1"
    Column |  Type   | Collation | Nullable | Default | Storage  | Compression | Stats target | Description
    --------+---------+-----------+----------+---------+----------+-------------+--------------+-------------
    a      | integer |           |          |         | plain    |             |              |
    b      | integer |           |          |         | plain    |             |              |
    c      | text    |           |          |         | extended |             |              |
    Distributed by: (a)
    Access method: pax
    ```

- 查询系统目录表 `pg_class` 和 `pg_am`：

    ```sql
    SELECT relname, amname FROM pg_class, pg_am WHERE relam = pg_am.oid AND relname = 't1';

    relname | amname
    ---------+--------
    t1      | pax
    (1 row)
    ```

## 对 TOAST 的支持

如果 PAX 表中某些列有大量较长的值，可以开启 TOAST 存储，将这些较长的值存储到单独 `toast` 的文件中。这样可以使数据文件中的数据变得更加紧凑，扫描相同的数据量，可以获得更多的元组。

PAX 默认开启 TOAST 存储。与 PostgreSQL 不同的是，PAX 支持的 TOAST 存储不依赖 Page 管理数据，这意味着 PAX 可以存储超过 2 MiB 的数据。

你可以通过以下配置参数来设置 TOAST 相关阈值，详情参见 [PAX 相关系统参数](pax-相关系统参数)。

- `pax_enable_toast`
- `pax_min_size_of_compress_toast`
- `pax_min_size_of_external_toast`

## Cluster 排序支持

Apache Cloudberry 的 PAX 表支持 Z-ordering 排序，使得用户在管理和查询多维数据时可以获得显著的性能提升。通过 Cluster 功能，你可以使用两种不同的排序策略来对 PAX 表中的数据进行组织：基于索引的 Cluster 和基于 `reloptions` 的 Cluster。需要注意的是，这两种策略是互斥的，只能选择其中一种。

### Cluster 策略

Cluster 功能是 Apache Cloudberry 中用于对表数据进行物理排序和优化的机制，目的是通过重新组织数据的物理存储顺序来提高查询性能。在 PAX 表中，Cluster 功能提供两种不同的策略来排序数据：

- 基于索引的 Cluster。基于 B-tree 索引的 Cluster 策略与 PostgreSQL 中的原生 Cluster 使用方法一致，适合已经为表建立索引的情况。

    示例：

    ```sql
    CREATE TABLE t2(c1 int, c2 int) USING PAX;
    CREATE INDEX c1_idx ON t2(c1);
    CLUSTER t2 USING c1_idx;
    DROP TABLE t2;
    ```

- 基于 `reloptions` 的 Cluster。PAX 表支持基于 `reloptions` 中指定 `cluster_columns` 来进行 Cluster 操作，并提供了两种排序方式：

    - Z-order Cluster：将多列的值编码成一个字节数组，然后对字节数组进行排序。适合多列作为查询条件（查询条件中列的顺序不固定）的场景，对多维数据查询性能提升显著。但不适于具有相同前缀的字符串列。当不指定 `cluster_type` 时，PAX 默认使用 Z-order 排序作为默认 Cluster 策略：

        ```sql
        CREATE TABLE t2(c1 int, c2 float, c3 text) USING PAX WITH (cluster_columns='c1,c2');
        INSERT INTO t2 SELECT i, i, i::text FROM generate_series(1, 100000) i;
        CLUSTER t2;
        DROP TABLE t2;
        ```

        此示例中，表 `t2` 的数据根据 `c1` 和 `c2` 列使用 Z-order 排序。这种排序方式对多维查询场景有显著的性能提升。

    - LexicalnCluster：按照列的值以及顺序进行排序，主要用于针对具有相同前缀的字符串列的排序和查询优化。示例：

        ```sql
        CREATE TABLE t2(c1 int, c2 float, c3 text) USING PAX WITH (cluster_columns='c1,c2', cluster_type='lexical');
        INSERT INTO t2 SELECT i, i, i::text FROM generate_series(1, 100000) i;
        CLUSTER t2;
        DROP TABLE t2;
        ```

        在该示例中，表 `t2` 中的数据根据 `c1` 和 `c2` 列使用 Lexical 方式进行排序，这种排序方式适合具有相同前缀的列。

### Cluster 类型冲突

需要注意的是，基于索引的 Cluster 与基于 `cluster_columns` 的 Cluster 不能同时使用。如果表已经基于索引进行了 Cluster，则不能再指定 `cluster_columns` 进行 Cluster 操作，反之亦然。

示例：Cluster 冲突处理

```sql
-- 创建表并基于索引进行 Cluster
CREATE TABLE t2(c1 int, c2 float, c3 text) USING PAX;
CREATE INDEX t2_idx ON t2(c1);
CLUSTER t2 USING t2_idx;

-- 尝试使用 Cluster Columns 进行操作（会失败）
ALTER TABLE t2 SET (cluster_columns='c1,c2', cluster_type='zorder');
-- 尝试使用 Lexical Cluster（会失败）
ALTER TABLE t2 SET (cluster_columns='c1,c2', cluster_type='lexical');

-- 删除索引后成功使用 Lexical Cluster
DROP INDEX t2_idx;
ALTER TABLE t2 SET (cluster_columns='c1,c2', cluster_type='lexical');
```

在上述示例中，当表 `t2` 使用了索引进行 Cluster 操作后，尝试通过 `cluster_columns` 设置 Z-order 或 Lexical Cluster 都会失败。删除索引后，才能成功设置 Lexical Cluster。

## PAX 表中的 Bloom Filter 支持

Apache Cloudberry 的 PAX 表支持 bloom filter，使用户能够在列级别生成和维护 bloom filter 信息。这一特性可以帮助快速过滤数据块，提高查询性能，特别是在使用包含多个值的 `IN` 条件时，能显著减少不必要的数据扫描。

### 选项说明

你可以通过设置 `bloomfilter_columns` 选项来指定希望记录 bloom filter 信息的列。例如：

```sql
CREATE TABLE p1 (
    a int,
    b int,
    c text
) USING PAX WITH (bloomfilter_columns='b,c,a');
```

在此示例中，`p1` 表的列 `b`、`c` 和 `a` 都会生成相应的 bloom filter 信息。

bloom filter 的大小受两个 GUC（全局配置变量）控制：

- `pax_max_tuples_per_file`：控制每个数据文件中存储的最大元组数。
- `pax_bloom_filter_work_memory_bytes`：控制 bloom filter 所允许的最大内存使用量。

示例如下：

```sql
-- 设置每个文件最多包含的元组数
SET pax_max_tuples_per_file = 131073;

-- 设置 bloom filter 最大工作内存
SET pax_bloom_filter_work_memory_bytes = 1048576;  -- 1MB

-- 创建表并指定列的 bloom filter 选项
CREATE TABLE p1 (
    a int,
    b int,
    c text
) USING PAX WITH (bloomfilter_columns='b,c,a');
```

生成的 bloom filter 大小计算方式为：

```sql
ceil(min(pax_max_tuples_per_file * 2, pax_bloom_filter_work_memory_bytes))
```

其中 `ceil` 是向下取整函数，保证生成的 bloom filter 大小始终为 2 的 N 次方。

## 稀疏过滤

稀疏过滤是 PAX 存储格式提供的一项数据扫描优化功能，通过跳过不满足条件的文件扫描和减少文件内数据块的扫描量来提升查询性能。

要使用稀疏过滤，需要满足以下条件：

- 系统参数 `pax_enable_sparse_filter` 的值为 `ON`（默认值）
- 相关列已配置统计信息（`min`/`max` 或 bloom filter）
- 查询中包含这些列的过滤条件（`WHERE` 子句）

### 表达式支持示例

PAX 支持基础的条件表达式，例如：

```sql
-- 创建测试表
CREATE TABLE a(v1 int, v2 int, v3 int) USING PAX WITH(minmax_columns='v1, v2, v3');

-- 基础条件
SELECT * FROM a WHERE v1 <= 3;                                    -- 完整条件支持，root 为 OpExpr
SELECT * FROM a WHERE v1 != NULL;                                -- 完整条件支持，root 为 NULLTest

-- 多条件
SELECT * FROM a WHERE v1 <= 3 AND v2 >= 3;                       -- 完整条件支持，树形结构只有一层
SELECT * FROM a WHERE v1 <= 3 AND v2 >= 3 AND v3 >= 3;          -- 完整条件支持
SELECT * FROM a WHERE v1 <= 3 AND v2 >= 3 AND v3 != NULL;       -- 完整条件支持
```

PAX 还支持嵌套表达式结构以及部分运算符号，例如：

```sql
-- 创建测试表
CREATE TABLE a(v1 int, v2 int, v3 int) USING PAX WITH(minmax_columns='v1, v2, v3');

-- 嵌套表达式
SELECT * FROM a WHERE (v1 <= 3 OR v2 > 3) AND v3 >= 10;         -- 完整支持所有条件
SELECT * FROM a WHERE (v1 <= 3 AND v2 > 3) OR v3 >= 10;         -- 支持完整的嵌套表达式

-- 运算符号
SELECT * FROM a WHERE v1 + v2 <= 3;
SELECT * FROM a WHERE v1 + 10 <= 3;
```

PAX 可以处理完整的表达式树，包括嵌套的 `AND`/`OR` 条件。这意味着所有上述查询都能得到优化，系统会使用所有可用的过滤条件来提高查询效率。

### 支持的表达式类型

PAX 稀疏过滤支持多种表达式类型：

- 算术运算符 (`OpExpr`)

    - 支持加法（`+`）、减法（`-`）和乘法（`*`）
    - 不支持除法运算（因为负数范围难以估算）
    - 示例：`a + 1`、`1 - a`、`a * b`

- 比较运算符 (`OpExpr`)

    - 支持 `<`、`<=`、`=`、`>=`、`>`
    - 示例：`a < 1`、`a + 1 < 10`、`a = b`

- 逻辑运算符 (`BoolExpr`)

    - 支持 `AND`、`OR`、`NOT`
    - 示例：`a < 10 AND b > 10`

- NULL 值测试 (`NullTest`)

    - 支持 `IS NULL`、`IS NOT NULL`
    - 示例：`a IS NULL`、`a IS NOT NULL`

- 类型转换 (`FuncExpr`)

    - 仅支持基本类型转换
    - 示例：`a::float8 < 1.1`
    - 不支持自定义函数，如 `func(a) < 10`

- `IN` 运算符 (`ScalarArrayOpExpr`)

    - 支持 `IN` 表达式
    - 示例：`a IN (1, 2, 3)`

### 部分条件支持

当查询中包含不支持的表达式时（如自定义函数），PAX 采用部分条件支持策略：

- 识别并提取可支持的条件。
- 使用支持的条件执行稀疏过滤。

例如：

```sql
-- 创建自定义函数 v2
CREATE OR REPLACE FUNCTION func(v2 double precision)
RETURNS double precision AS $$
BEGIN
  RETURN v2 * 2;
END;
$$ LANGUAGE plpgsql;

-- 在查询中使用自定义函数
SELECT * FROM a WHERE v1 < 3 AND func(v2) < 10;  -- PAX 将使用 v1 < 3 进行过滤
```

在这个例子中，虽然 `func(v2) < 10` 不能用于稀疏过滤，但 Apache Cloudberry 仍会使用 `v1 < 3` 来优化查询性能。这种方式确保即使在复杂查询中也能获得部分的性能优化。

:::note 注意
- 稀疏过滤的效果取决于数据分布和查询条件。
- 建议在频繁作为过滤条件的列上启用统计信息。
- 部分条件（例如自定义函数）会被忽略。
:::

## 在 WAL 日志中查看 PAX 表的数据变更记录

与 PAX 表相关的数据操作会被记录到 WAL（预写式日志）系统中。从而确保 Primary 和 Mirror 节点间的备份是可靠的，并协助故障切换。

你可以通过 `pg_waldump` 工具查看 PAX 表的 WAL 日志，日志存储在 `$COORDINATOR_DATA_DIRECTORY/pg_wal` 目录或 Segment 节点数据目录的 `pg_wal` 目录中。

PAX 表的 WAL 日志主要有以下用途：

- **数据恢复**：在系统故障或数据不一致时，帮助恢复数据。
- **故障切换支持**：确保 Primary 和 Mirror 节点之间的数据同步一致。
- **调试和分析**：定位和分析针对 PAX 表的特定操作。

### 示例：操作 PAX 表及查看 WAL 日志

1. 创建 PAX 表。

    ```sql
    CREATE TABLE a (
       v1 int,
       v2 int,
       v3 int
    ) USING PAX;
    ```

    这将创建一个包含 `v1`、`v2` 和 `v3` 列的 PAX 表 `a`。

2. 向表中插入一行数据：

    ```sql
    INSERT INTO a VALUES (1, 2, 3);
    ```

3. 定位该 PAX 表所在的节点：

    ```sql
    -- 查看集群中所有节点的 ID 以及数据目录位置
    SELECT * FROM gp_segment_configuration;

    -- 查看 a 表所在 Segment 的 ID，参照上已语句返回的结果
    -- 可获知 a 表所在的 Segment 以及数据目录位置
    SELECT gp_segment_id FROM gp_distribution_policy WHERE localoid = 'a'::regclass;
    ```

4. 在对应节点数据目录的 `pg_wal` 中找到对应的 WAL 日志。例如：

    ```bash
    ls $COORDINATOR_DATA_DIRECTORY/pg_wal
    ```

    找到最近的 WAL 文件以分析相关操作。在本示例中，假设 WAL 日志名为
    `00000001000000000000000A`。

5. 查询 PAX 表的 `relfilenode`，将 WAL 日志与 PAX 表关联：

    ```sql
    SELECT relfilenode FROM pg_class WHERE relname = 'a';
    ```

    `relfilenode` 是表在 WAL 日志中的唯一标识符。

6. 使用 `pg_waldump` 工具解析 WAL 日志并定位 PAX 表相关的操作：

    ```bash
    pg_waldump -f $COORDINATOR_DATA_DIRECTORY/pg_wal/00000001000000000000000A
    ```

    在输出中搜索之前获取的 `relfilenode`，以找到与 PAX 表相关的操作。

    `pg_waldump` 输出示例

    ```text
    rmgr: PAX       len (rec/tot):     68/   104, tx:    593, lsn: 0/016E1D98, prev 0/016E1D60, desc: INSERT off 3, blkref #0: rel 1663/16384/19780 blk 0
    ```

    在此示例中：

    - `rmgr: PAX` 表示记录类型。
    - `rel 1663/16384/19780` 对应 PAX 表的 `relfilenode`。
    - `INSERT` 表明记录了一条插入操作。

通过以上步骤，可以追踪和分析与 Apache Cloudberry 中 PAX 表相关的 WAL 日志，用于调试、恢复或性能优化。

## PAX 使用限制

- 在索引支持方面，PAX 存储格式目前仅支持 B-tree (`btree`) 索引。在 PAX 表上创建 GiST 索引、SP-GiST (`gist/spgist`) 索引和 Brin 索引时会报错，其他的索引仅为实验性功能，可能不支持。
- 目前如果字段太长，会放到 TOAST 文件里存储。这里的 TOAST 与 PostgreSQL 的 TOAST 表不同，仅仅在名称上相同。
- PAX 格式暂不支持使用 `pg_dump` 或 `pg_restore` 进行数据备份和恢复，PAX 表在这些操作中会被忽略。你可以使用 `pg_basebackup` 对 PAX 表进行备份和恢复。

## PAX 相关 SQL 选项

PAX 支持若干 SQL 选项，用来控制 PAX 的行为。你可以在 `WITH()` 子句中使用这些选项，例如 `WITH(minmax_columns='b,c', storage_format=porc)`。

| 名称                  | 类型     | 合法值                                             | 描述                                                                                                                                                                                                                   |
|-----------------------|----------|----------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `storage_format`      | `string` | •  `porc`<br />•  `porc_vec`                            | 控制内部存储格式。`porc` 是默认值，表示以普通数据格式存储，不会保存空值。`porc_vec` 表示以向量格式存储数据，始终会保存定长字段的空值，不管列值是否为空。                                                                                      |
| `compresstype`        | `string` | •  `none`<br />•  `rle`<br />•  `delta`<br />•  `zstd`<br />•  `zlib`<br />•  `dict` | 列值进行压缩编码的方式，只能选择其中一种。默认值是 `none`。<br /><br />•  `none` 表示不进行任何压缩。<br />•  `rle` 使用运行长度编码压缩重复的连续数据。<br />•  `delta` 适用于数值列，存储的是相邻数值的差值。<br />•  `zstd` 提供高压缩率和快速压缩的 zstd 算法。<br />•  `zlib` 是一种通用的压缩算法，适合压缩一般数据。<br />•  `dict` 使用字典编码来加速处理大量重复字符串。当前为实验特性，不建议在生产环境中使用。 |
| `compresslevel`       | `int`    | 区间 `[0, 19]`                                     | 表示压缩级别，默认值是 0。值小时压缩更快，值大时压缩率更高。只有配合 `compresstype` 使用才有效。                                                                                                                       |
| `partition_by`        | `string` | 表中合法的列名                                     | 写入批量数据时，尽可能将数据按指定列分区存放到相同的数据文件中，提高数据聚集的相关性。当前只支持整数类型。此分区键与分区表无关，是 PAX 内部组织数据的建议。                                                                 |
| `partition_ranges`    | `string` | `FROM(XX) TO(YY) [every(DD)]`                      | 该选项必须与 `partition_by` 配合使用，设置分区范围。可以只设置一个范围，也可以将一个大的范围划分成多个不相邻的小范围。尽可能将每个范围内的数据放入同一个数据文件中。不在范围内的数据会放入默认数据文件里。          |
| `minmax_columns`      | `string` | 表中以逗号分隔的合法列名                           | 对定义在表中的列记录 `minmax` 统计信息，以加快数据查询。列重命名后，列数据不会再记录统计信息。使用 `ALTER TABLE` 修改 `minmax_columns` 后，只会对未来新写入的数据文件生效，不会影响原来的数据文件。            |
| `cluster_columns`     | `string` | 表中以逗号分隔的合法列名                           | 作用是提示 PAX 对内部数据进行聚集存储，在使用 cluster 命令时可以以列进行排序，排序方式以 `cluster_type` 参数控制。                                                                                                 |
| `bloomfilter_columns` | `string` | 表中以逗号分隔的合法列名                           | 给相应列的数据计算 bloom filter，用于数据过滤。                                                                                                                                                                       |
| `parallel_workers`    | `int`    | `[0,64]`                                           | PostgreSQL 的选项，进程并行化扫描时的并发进程个数。                                                                                                                                                                  |
| `cluster_type`        | `string` | `lexical` 和 `zorder`                              | 当不使用索引，而是基于 `reloptions` 自定义的列进行 Cluster 排序时，Cluster 的类型。合法值是 `lexical` 和 `zorder`。`lexical` 表示按照列的值以及顺序进行排序，`zorder` 表示将多列的值编码成一个字节数组，然后对字节数组进行排序。 |

以上 `option` 的值只会影响到新插入和更新的数据，并不会影响到已经存在的数据。

## PAX 相关系统参数

以下系统参数 (GUC) 用于设置当前会话中 PAX 表的行为，执行 `SET <参数>=<值>` 即可，例如 `SET pax_enable_sparse_filter=on`。

| 参数名                               | 值类型   | 合法值                                                                             | 描述                                                                                                                                                            |
|--------------------------------------|----------|------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `pax_enable_sparse_filter`           | `bool`   | `on` 和 `off`                                                                      | 指定对列数据是否开启基于统计信息的稀疏过滤。默认值是 `on`，表示开启稀疏过滤。                                                                                   |
| `pax_enable_row_filter`              | `bool`   | `on` 和 `off`                                                                      | 指定是否开启行过滤。默认值是 `off`，表示关闭行过滤。不建议用户开启此参数。                                                                                      |
| `pax_scan_reuse_buffer_size`         | `int`    | 区间 `[1048576, 33554432]`（即 1MiB 到 32MiB）                                     | 扫描时使用的缓冲块大小，默认值是 `8388608`（即 8 MiB）。                                                                                                        |
| `pax_max_tuples_per_group`           | `int`    | 区间 `[5, 524288]`                                                                 | 指定每个 group 内最多允许有多少条数据。默认值是 `131072`。                                                                                                      |
| `pax_max_tuples_per_file`            | `int`    | 区间 `[131072, 8388608]`                                                           | 指定每个数据文件里最多允许有多少条数据，其中最大值为 `8388608`。默认值是 `1310720`。                                                                            |
| `pax_max_size_per_file`              | `int`    | 区间 `[8388608, 335544320]`（即 8MiB 到 320MiB）                                   | 每个数据文件允许的最大物理容量，默认值是 `67108864`（即 64MiB）。这里设置的大小不是硬性要求，实际可能略大于设定的大小。太大或太小的数值都会对性能产生负面影响。 |
| `pax_enable_toast`                   | `bool`   | `on` 和 `off`，默认值为 `on`                                                       | 指定是否开启 TOAST 支持。                                                                                                                                       |
| `pax_min_size_of_compress_toast`     | `int`    | 区间 `[524288, 1073741824]`（即 512KiB 到 1GiB），默认值为 `524288`（即 512KiB）   | 指定创建压缩 TOAST 表的阈值。如果字符长度大于此阈值，Apache Cloudberry 会创建压缩 TOAST 表来存储数据。                                                          |
| `pax_min_size_of_external_toast`     | `int`    | 区间 `[10485760, 2147483647]`（即 10MiB 到 2GiB），默认值为 `10485760`（即 10MiB） | 指定创建外部 TOAST 表的阈值。如果字符长度大于此阈值，Apache Cloudberry 会创建外部 TOAST 表来存储数据。                                                          |
| `pax_default_storage_format`         | `string` | `porc`（默认值为 `porc`）                                                          | 控制默认的存储格式。                                                                                                                                            |
| `pax_bloom_filter_work_memory_bytes` | `int`    | 区间 `[1024, 2147483647]`（即 1KiB 到 2GiB），默认值为 `10240`（即 10KiB）         | 控制 bloom filter 所允许的最大内存使用量。                                                                                                                      |

## 最佳实践

- 使用分区选项：

    - 当数据需要在某一整数列上导入，并且满足以下条件时，推荐使用分区选项：

        - 数据在该列上分布相对均匀，且范围较广，没有极端的聚集情形。
        - 该列常用作查询过滤条件或作为连接 (`join`) 的键。

    - 需要注意的是，PAX 的分区键仅在单次批量导入数据时有效，多次写入的数据之间无法再次调整。分区键的设置仅对未来插入或更新的数据生效，因此在变更分区键后，新导入的数据将按新的分区键处理。

- 使用 `minmax` 统计信息：

    - 对于数据分布范围广且常用于查询过滤的列，设置记录该列的 `minmax` 值可以显著加速查询过程。
    - 利用 `minmax` 统计，如果一个数据文件中所有的列都不满足 `minmax` 或空值测试，则可以快速跳过整个文件，避免进行不必要的数据扫描。
    - 重要的注意事项：`minmax` 的效果依赖于数据的插入方式。如果 PAX 表的数据是通过批量插入（如 `batch insert` 或 `copy`）且每个批次内的数据范围是连续的，则 `minmax` 会非常有效。相反，如果数据插入是随机的，`minmax` 过滤的效果可能会较差。

- 如果 PAX 表有多个数据列需要出现在查询的过滤条件中，你可以使用 `with(cluster_columns='b,c,d', cluster_type='zorder')`。按照 `zorder` 编码方式进行 Cluster 排序后，对 `cluster_columns` 中的任意列都能有一定的过滤效果。相比于基于单列的 Cluster 排序，只有在排序的键上进行过滤才会有明显的效果，在其他列上几乎无效。Cluster 排序影响的是基于 `minmax` 的过滤方式，不影响基于 `bloom filter` 的过滤。

- 如果查询中需要过滤例如 `column1 in (12, 11, 13)` 或 `column1 = 'X'` 的表达式，可以考虑使用 `bloom filter（with(bloomfilter_columns='b,c')）`。PAX 内部会对部分数据计算 bloom filter。当 bloom filter 能确信数据不在数据块时，PAX 可以跳过当前数据块。值得注意的是，bloom filter 过滤效果的好坏与几个方面有关：

    - `group` 内的数据量。
    - `bloom filter` 使用的空间。
