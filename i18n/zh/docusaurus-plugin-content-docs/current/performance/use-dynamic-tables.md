---
title: 使用动态表
---

# 使用动态表自动刷新数据和加速查询

动态表 (Dynamic Table) 是一种类似于物化视图的特殊数据库对象，具有自动刷新和查询加速的特性。Apache Cloudberry 引入动态表功能，旨在提供更高效、更灵活的查询处理和数据更新。

动态表支持由基础表、外部表、物化视图等构建，且具有自动更新的功能。用户可以通过定义调度任务来自动刷新动态表数据，确保数据始终保持最新。

## 使用场景

动态表主要适用于以下几种场景：

- 为湖仓架构加速查询：对于使用湖仓架构的客户，动态表可以将外部表查询自动替换成在动态表上的查询，提升查询性能。
- 自动数据刷新：在需要定期更新数据的场景下，动态表可通过设定自动刷新任务来避免人工干预。
- 实时数据分析：适合需要频繁查询最新数据且对数据刷新要求较高的应用场景，如金融分析、运营监控等。

## 与物化视图的对比

动态表与[自动使用物化视图回答查询（AQUMV）](../performance/optimize-queries/use-auto-materialized-view-to-answer-queries.md)的区别如下：

| **特性**         | 动态表                                     | AQUMV                                  |
|------------------|--------------------------------------------|----------------------------------------|
| **用途**         | 自动刷新的特殊表，处理数据流水线，简化 ETL | 利用物化视图提高查询效率，自动改写查询 |
| **组成与结构**   | 可由普通表、外部表、物化视图等组成         | 基于物化视图，通常针对单个表           |
| **查询改写能力** | 不支持                                     | 支持单表改写                           |
| **数据刷新机制** | 可通过 SQL 定义自动刷新周期                | 需要手动刷新物化视图数据               |

## 使用方法

### 创建动态表

您可以使用 `CREATE DYNAMIC TABLE` 语句创建动态表。

``` sql
CREATE DYNAMIC TABLE table_name AS <select_query> [WITH NO DATA] [SCHEDULE '<cron_string>'] [DISTRIBUTED BY <distribution_key>];
```

参数说明：

- `<select_query>`：用于生成动态表的查询，支持与基础表、物化视图或其他动态表的连接。
- `WITH NO DATA`：如果指定此选项，建表时不会填充数据，只会创建空的动态表。
- `SCHEDULE '<cron_string>'`：指定动态表的刷新周期，使用标准的 Linux cron 表达式，具体表达式的写法请参考 [Cron 表达式](https://crontab.guru/)。
- `DISTRIBUTED BY`：指定动态表的分布键，以优化查询性能。

完整的语法如下：

``` sql
CREATE DYNAMIC TABLE [ IF NOT EXISTS ] table_name
   [ (column_name [, ...] ) ]
   [ USING method ]
   [ WITH ( storage_parameter [= value] [, ... ] ) ]
   [ TABLESPACE tablespace_name ]
   [SCHEDULE schedule_string]
   AS query
   [ WITH [ NO ] DATA ]
   [DISTRIBUTED BY (keys [, ...])]
```

使用动态表的示例：

``` sql
CREATE DYNAMIC TABLE dt0 SCHEDULE '5 * * * *' AS SELECT a, b, sum(c) FROM t1 GROUP BY a, b WITH NO DATA DISTRIBUTED BY(b);

\d dt0
               List of relations
Schema | Name |     Type      |  Owner  | Storage
--------+------+---------------+---------+---------
public | dt0  | dynamic table | gpadmin | heap
```

以上语句创建一个动态表，并设置每 5 分钟自动刷新一次。

### 刷新动态表

动态表会根据 `SCHEDULE` 设置自动刷新。如果您需要手动刷新，可以使用 `REFRESH DYNAMIC TABLE` 命令，使用时将 `table_name` 替换为实际的表名：

``` sql
REFRESH DYNAMIC TABLE table_name;
```

若需要将表清空并置为不可读取的状态，可以使用：

``` sql
REFRESH DYNAMIC TABLE table_name WITH NO DATA;
```

### 查看调度信息

使用内置函数 `pg_get_dynamic_table_schedule()` 查看动态表的刷新调度信息。执行时，将 `table_name` 替换为实际的表名：

``` sql
SELECT pg_get_dynamic_table_schedule('table_name'::regclass::oid);
```

### 删除动态表

使用 `DROP DYNAMIC TABLE` 删除动态表，删除时会同时删除相关的自动刷新任务。执行时，将 `table_name` 替换为实际的表名：

``` sql
DROP DYNAMIC TABLE table_name;
```

### 查看分布键

动态表支持在建表时指定分布键。您可以使用 `\d+` 命令查看动态表的分布键和查询 SQL 定义。

``` 
\d+ dt0
```

示例输出：

``` sql
Dynamic table "public.dt0"
Column |  Type   | Collation | Nullable | Default | Storage | Compression | Stats target | Description
--------+---------+-----------+----------+---------+---------+-------------+--------------+-------------
a      | integer |           |          |         | plain   |             |              |
b      | integer |           |          |         | plain   |             |              |
sum    | bigint  |           |          |         | plain   |             |              |
View definition:
SELECT t1.a,
   t1.b,
   sum(t1.c) AS sum
   FROM t1
   GROUP BY t1.a, t1.b;
Distributed by: (b)
Access method: heap
```

在这个例子中，动态表 `dt0` 使用列 `b` 作为分布键，通过此方式来优化查询性能。查询和聚合操作可以更高效地执行，因为数据根据分布键 `b` 被分配到不同的节点。

## 使用示例

### 示例 1：加速湖仓架构的外部表查询

通过使用动态表，在处理数据湖或外部存储的数据时，Apache Cloudberry 将对外部表的查询自动替换为在动态表上的查询，从而加速查询过程。

1. 创建一个可读取的外部表 `ext_r`，数据来源于指定的文件 `dynamic_table_text_file.txt`。

    ``` sql
    CREATE READABLE EXTERNAL TABLE ext_r(id int)
       LOCATION('demoprot://dynamic_table_text_file.txt')
    FORMAT 'text';
    ```

    以上创建外部表的语句中，`dynamic_table_text_file.txt` 是一个示例文件路径，而 `demoport` 是一个示例协议（可以为 `gpfdist` 或其他协议）。

2. 使用 `EXPLAIN` 查看表的查询执行计划，查询条件是 `id > 5`。

    ``` sql
    EXPLAIN(COSTS OFF, VERBOSE)
    SELECT sum(id) FROM ext_r WHERE id > 5;
    ```

    以下查询计划出现了 `Foreign Scan on dynamic_table_schema.ext_r`，由此可知执行器直接扫描了外部表 `ext_r`。

    ``` sql
    QUERY PLAN
    --------------------------------------------------------------
    Finalize Aggregate
    Output: sum(id)
    ->  Gather Motion 3:1  (slice1; segments: 3)
          Output: (PARTIAL sum(id))
          ->  Partial Aggregate
                Output: PARTIAL sum(id)
                ->  Foreign Scan on dynamic_table_schema.ext_r
                      Output: id
                      Filter: (ext_r.id > 5)
    ```

3. 创建动态表 `dt_external`，将外部表 `ext_r` 中的数据筛选后存入动态表 `dt_external`，并执行 `ANALYZE` 来更新表的统计信息。

    ``` sql
    CREATE DYNAMIC TABLE dt_external AS
    SELECT * FROM ext_r WHERE id > 5;
    ANALYZE dt_external;
    ```

4. 在事务中设置相关参数，开启动态表查询加速功能。

    ``` sql
    BEGIN;
    SET optimizer = OFF;
    SET LOCAL enable_answer_query_using_materialized_views = ON;
    SET LOCAL aqumv_allow_foreign_table = ON;
    ```

5. 再次使用 `EXPLAIN` 查看表的查询执行计划，查询条件是 `id > 5`。

    ``` sql
    EXPLAIN(COSTS OFF, VERBOSE)
    SELECT sum(id) FROM ext_r WHERE id > 5;
    COMMIT;
    ```

    以下查询计划中出现了 `Seq Scan on dynamic_table_schema.dt_external`，由此可知，执行器使用了动态表自动替换外部表查询，对 `ext_r` 外部表的查询替换成对 `dt_external` 动态表的查询。

    ``` sql
    QUERY PLAN
    ---------------------------------------------------------------
    Finalize Aggregate
    Output: sum(id)
    ->  Gather Motion 3:1  (slice1; segments: 3)
          Output: (PARTIAL sum(id))
          ->  Partial Aggregate
                Output: PARTIAL sum(id)
                ->  Seq Scan on dynamic_table_schema.dt_external
                      Output: id
    Settings: enable_answer_query_using_materialized_views = 'on',
    optimizer = 'off'
    Optimizer: Postgres query optimizer
    (10 rows)
    ```

通过这个流程，查询效率得到了提高，因为原本需要扫描外部表的操作被动态表的扫描替代，减少了查询的响应时间。

### 示例 2：创建空的动态表

如果在创建时不希望自动填充数据，可以使用 `WITH NO DATA` 选项。示例如下：

1. 创建基表 `existing_table` 并插入数据：

    ``` sql
    CREATE TABLE existing_table (
       id INT,
       name VARCHAR(100),
       value INT
    );

    INSERT INTO existing_table (id, name, value) VALUES
    (1, 'Alice', 100),
    (2, 'Bob', 150),
    (3, 'Charlie', 200);
    ```

2. 创建空的动态表：

    ``` sql
    CREATE DYNAMIC TABLE empty_table AS 
    SELECT * FROM existing_table 
    WITH NO DATA;
    ```

    该语句创建了一个空的动态表，之后可以通过手动刷新来填充数据。

3. 验证该表为空：

    ``` sql
    SELECT * FROM empty_table;

    -- ERROR:  materialized view "empty_table" has not been populated
    -- HINT:  Use the REFRESH MATERIALIZED VIEW command.
    ```

## 注意事项

- 刷新策略：确保设置适当的刷新间隔。如果刷新间隔过于频繁，可能会增加系统负载；如果刷新间隔过于稀疏，查询数据可能不够及时。
- 查询替换：动态表的查询性能优势在于自动替换外部表查询，因此，适合用于经常需要外部表数据的查询场景。
- 数据一致性：由于动态表是物化视图的一种，因此要注意刷新策略和数据一致性的平衡，确保业务逻辑的准确性。
