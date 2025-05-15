---
title: Use Dynamic Tables
---

# Use Dynamic Tables to Speed Up Queries and Auto-Refresh Data

Dynamic tables are database objects similar to materialized views that refresh data automatically and speed up queries. Apache Cloudberry introduces dynamic tables to make query processing faster and data updates automatic.

Dynamic tables can be created from base tables, external tables, or materialized views. They update data automatically based on a schedule, keeping the data current.

## Use cases

Dynamic tables are suitable for these scenarios:

- **Faster queries in lakehouse setups**: Replace external table queries with dynamic table queries to improve performance.
- **Automatic data updates**: Schedule refresh tasks to keep data updated without manual effort.
- **Real-time analysis**: Do well for scenarios that need frequent and up-to-date queries, such as financial analysis or operations monitoring.

## Comparison with materialized views

Dynamic tables and [Answer Query Using Materialized Views](/docs/performance/use-auto-materialized-view-to-answer-queries.md) have these differences:

| **Feature**                | Dynamic table                                                                               | AQUMV                                                                                  |
|----------------------------|---------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------|
| **Purpose**                | A special table that automatically refreshes, processes data pipelines, and simplifies ETL. | Uses materialized views to improve query efficiency and automatically rewrite queries. |
| **Base and structure**     | Can be based on ordinary tables, external tables, materialized views.                       | Based on materialized views, usually targeting a single table.                         |
| **Query rewrite**          | Not supported                                                                               | Supports single-table rewrite                                                          |
| **Data refresh mechanism** | Users can define automatic refresh interval through SQL                                     | Requires manual refresh of materialized view data                                      |

## Usage

### Create a dynamic table

To create a dynamic table, use the `CREATE DYNAMIC TABLE` statement:

``` sql
CREATE DYNAMIC TABLE table_name AS <select_query> [WITH NO DATA] [SCHEDULE '<cron_string>'] [DISTRIBUTED BY <distribution_key>];
```

Parameter details:

- `<select_query>`: The SQL query with which the dynamic table is defined. Supports joins with base tables, materialized views, or other dynamic tables.
- `WITH NO DATA`: Creates the table without initial data.
- `SCHEDULE '<cron_string>'`: Sets the refresh schedule using Linux cron expressions. See [Cron Expressions](https://crontab.guru/) for more details.
- `DISTRIBUTED BY`: Defines the distribution key to improve query performance.

Full syntax:

``` sql
CREATE DYNAMIC TABLE [ IF NOT EXISTS ] table_name
   [ (column_name [, ...] ) ]
   [ USING method ]
   [ WITH ( storage_parameter [= value] [, ... ] ) ]
   [ TABLESPACE tablespace_name ]
   [ SCHEDULE schedule_string ]
   AS query
   [ WITH [ NO ] DATA ]
   [ DISTRIBUTED BY (keys [, ...]) ];
```

Example:

``` sql
CREATE DYNAMIC TABLE dt0 SCHEDULE '5 * * * *' AS SELECT a, b, sum(c) FROM t1 GROUP BY a, b WITH NO DATA DISTRIBUTED BY(b);

\d dt0

             List of relations
Schema | Name |     Type      |  Owner  | Storage
--------+------+---------------+---------+---------
public | dt0  | dynamic table | gpadmin | heap
(1 rows)
```

This example creates a dynamic table `dt0` and schedules it to refresh every 5 minutes.

### Refresh a dynamic table

Dynamic tables refresh automatically based on their `SCHEDULE` setting. To manually refresh a table, use the `REFRESH DYNAMIC TABLE` statement. Replace `table_name` with the actual table name:

``` sql
REFRESH DYNAMIC TABLE table_name;
```

To clear the table and make it unreadable, use the `WITH NO DATA` option. Replace `table_name` with the actual table name:

``` sql
REFRESH DYNAMIC TABLE table_name WITH NO DATA;
```

### View schedule information

To view the refresh schedule of a dynamic table, use the `pg_get_dynamic_table_schedule` function. Replace `table_name` with the actual table name:

``` sql
SELECT pg_get_dynamic_table_schedule('table_name'::regclass::oid);
```

### Drop a dynamic table

To delete a dynamic table and its associated refresh tasks, use the `DROP DYNAMIC TABLE` statement. Replace `table_name` with the actual table name:

``` sql
DROP DYNAMIC TABLE table_name;
```

### View distribution key

You can specify a distribution key when creating a dynamic table to optimize query performance. Use the `\d+` command to view distribution keys and query definitions.

Example:

``` sql
\d+ dt0
```

Output:

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

In this example, the dynamic table `dt0` uses column `b` as its distribution key. This ensures efficient query and aggregation operations, because data is distributed across nodes based on `b`.

## Examples

### Example 1: Accelerate external table queries in lake-house architecture

Apache Cloudberry automatically replaces queries to external tables with queries on dynamic tables when processing data from data lakes or external storage, thereby accelerating the query process.

1. Create a readable external table `ext_r` with data sourced from the specified file `dynamic_table_text_file.txt`.

    ``` sql
    CREATE READABLE EXTERNAL TABLE ext_r(id int)
       LOCATION('demoprot://dynamic_table_text_file.txt')
    FORMAT 'text';
    ```

    In the above statement for creating an external table, `demoprot://dynamic_table_text_file.txt` is an example protocol and file path.

2. Use `EXPLAIN` to view the query execution plan for the table with the query condition `id > 5`.

    ``` sql
    EXPLAIN(COSTS OFF, VERBOSE)
    SELECT sum(id) FROM ext_r WHERE id > 5;
    ```

    Query plan output. In the following plan, `Foreign Scan on dynamic_table_schema.ext_r` appears, which means that the planner directly scanned the external table `ext_r`.

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

3. Create a dynamic table `dt_external` to store the filtered data from the external table `ext_r`, and execute `ANALYZE` to update the table statistics.

    ``` sql
    CREATE DYNAMIC TABLE dt_external AS
    SELECT * FROM ext_r WHERE id > 5;
    ANALYZE dt_external;
    ```

4. Set the parameters in a transaction to enable dynamic table query acceleration.

    ``` sql
    BEGIN;
    SET optimizer = OFF;
    SET LOCAL enable_answer_query_using_materialized_views = ON;
    SET LOCAL aqumv_allow_foreign_table = ON;
    ```

5. Again, use `EXPLAIN` to view the query execution plan for the table with the query condition `id > 5`.

    Use dynamic table to automatically replace external table queries, replacing the query to the external table `ext_r` with a query to the dynamic table `dt_external`, thereby accelerating the query.

    ``` sql
    EXPLAIN(COSTS OFF, VERBOSE)
    SELECT sum(id) FROM ext_r WHERE id > 5;
    
    COMMIT;
    ```

    Query plan output. In the following plan, `Seq Scan on dynamic_table_schema.dt_external` indicates that the planner automatically replaced the query on the external table with the query on the dynamic table `dt_external`.

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

Through this process, query efficiency is improved because the operation that originally required scanning the external table is replaced by scanning the dynamic table, which reduces query response time.

### Example 2: Create an empty dynamic table

1. Create a base table `existing_table` and insert data:

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

2. Create an empty dynamic table:

    ``` sql
    CREATE DYNAMIC TABLE empty_table AS 
    SELECT * FROM existing_table 
    WITH NO DATA;
    ```

    This statement creates an empty dynamic table, which can be populated with data through manual refresh later.

3. Check that this table is empty:

    ``` sql
    SELECT * FROM empty_table;
    
    -- ERROR:  materialized view "empty_table" has not been populated
    -- HINT:  Use the REFRESH MATERIALIZED VIEW command.
    ```

## Notes

- Refresh strategy: Ensure to set an appropriate refresh interval. If the refresh interval is too frequent, it might increase system load; if the refresh interval is too sparse, the query data might not be timely.
- Query replacement: The performance advantage of dynamic tables lies in automatically replacing external table queries, making them suitable for query scenarios that frequently require external table data.
- Data consistency: Because dynamic tables are a type of materialized view, pay attention to the balance between refresh strategy and data consistency to ensure the accuracy of application logic.
