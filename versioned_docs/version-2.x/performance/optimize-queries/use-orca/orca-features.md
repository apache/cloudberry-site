---
title: GPORCA Features and Enhancements
---

# GPORCA Features and Enhancements

GPORCA provides enhanced support for certain types of queries and operations:

- Queries on partitioned tables
- Queries with subqueries
- Queries with common table expressions (CTEs)
- Optimized DML operations

## Enhancements for partitioned table queries

GPORCA applies the following optimizations when handling queries on partitioned tables:

- Improved partition pruning capabilities.

- Query plans can include the Partition Selector operator.

- `EXPLAIN` plans no longer enumerate all partitions.

    For queries using static partition pruning (for example, comparing partition keys with constants), GPORCA displays a Partition Selector operator in the `EXPLAIN` output, including the filter condition and the number of selected partitions. Example:

    ```sql
    Partition Selector for Part_Table (dynamic scan id: 1) 
            Filter: a > 10
            Partitions selected:  1 (out of 3)
    ```

    For dynamic partition pruning (for example, comparing partition keys with variables), the partitions are determined at execution time, and the `EXPLAIN` output does not list the selected partitions.

- The size of the query plan does not grow with the number of partitions.

- Significantly reduces the risk of out-of-memory errors caused by a large number of partitions.

The following `CREATE TABLE` example creates a range-partitioned table:

```sql
CREATE TABLE sales(order_id int, item_id int, amount numeric(15,2), 
      date date, yr_qtr int)
   PARTITION BY RANGE (yr_qtr) (start (201501) INCLUSIVE end (201504) INCLUSIVE, 
   start (201601) INCLUSIVE end (201604) INCLUSIVE,
   start (201701) INCLUSIVE end (201704) INCLUSIVE,     
   start (201801) INCLUSIVE end (201804) INCLUSIVE,
   start (201901) INCLUSIVE end (201904) INCLUSIVE,
   start (202001) INCLUSIVE end (202004) INCLUSIVE);
```

GPORCA optimizes the following types of queries on partitioned tables:

- Full table scans: partitions are not enumerated in the plan.

    ```sql
    SELECT * FROM sales;
    ```

- Queries with constant filter conditions: partition pruning is applied.

    ```sql
    SELECT * FROM sales WHERE yr_qtr = 201501;
    ```

- Range queries: also trigger partition pruning.

    ```sql
    SELECT * FROM sales WHERE yr_qtr BETWEEN 201601 AND 201704;
    ```

- Joins on partitioned tables: for example, joining the dimension table `date_dim` with the fact table `catalog_sales`.

    ```sql
    SELECT * FROM catalog_sales
        WHERE date_id IN (SELECT id FROM date_dim WHERE month=12);
    ```

## Subquery optimization

GPORCA processes subqueries more efficiently. A subquery is a query nested within an outer query block, such as the `SELECT` inside the `WHERE` clause below:

```sql
SELECT * FROM part
  WHERE price > (SELECT avg(price) FROM part);
```

GPORCA also optimizes correlated subqueries (CSQs), which reference columns from the outer query. For example, both the inner and outer queries in the following statement use the `price` column:

```sql
SELECT * FROM part p1 WHERE price > (SELECT avg(price) FROM part p2 WHERE p2.brand = p1.brand);
```

GPORCA can generate more efficient plans for the following types of subqueries:

- Correlated subqueries in the `SELECT` list:

    ```sql
    SELECT *,
    (SELECT min(price) FROM part p2 WHERE p1.brand = p2.brand)
    AS foo
    FROM part p1;
    ```

- Correlated subqueries inside `OR` conditions:

    ```sql
    SELECT FROM part p1 WHERE p_size > 40 OR 
        p_retailprice > 
        (SELECT avg(p_retailprice) 
            FROM part p2 
            WHERE p2.p_brand = p1.p_brand)
    ```

- Nested subqueries with jump correlations:

    ```sql
    SELECT * FROM part p1 WHERE p1.p_partkey 
    IN (SELECT p_partkey FROM part p2 WHERE p2.p_retailprice = 
        (SELECT min(p_retailprice)
            FROM part p3 
            WHERE p3.p_brand = p1.p_brand)
    );
    ```


    :::info
    The PostgreSQL planner does not support nested correlated subqueries with jump correlations.
    :::

- Correlated subqueries with aggregation and inequality:

    ```sql
    SELECT * FROM part p1 WHERE p1.p_retailprice =
    (SELECT min(p_retailprice) FROM part p2 WHERE p2.p_brand <> p1.p_brand);
    ```

- Correlated subqueries expected to return a single row:

    ```sql
    SELECT p_partkey, 
    (SELECT p_retailprice FROM part p2 WHERE p2.p_brand = p1.p_brand )
    FROM part p1;
    ```

## Common table expression (CTE) optimization

GPORCA efficiently handles queries with `WITH` clauses. A `WITH` clause, also known as a common table expression (CTE), defines a temporary logical table used within the query. The following is an example of a query with a CTE:

```sql
WITH v AS (SELECT a, sum(b) as s FROM T WHERE c < 10 GROUP BY a)
  SELECT * FROM  v AS v1, v AS v2
  WHERE v1.a <> v2.a AND v1.s < v2.s;
```

As part of query optimization, GPORCA supports predicate pushdown into CTEs. In the example below, equality predicates are pushed into the CTE:

```sql
WITH v AS (SELECT a, sum(b) as s FROM T GROUP BY a)
  SELECT *
  FROM v as v1, v as v2, v as v3
  WHERE v1.a < v2.a
    AND v1.s < v3.s
    AND v1.a = 10
    AND v2.a = 20
    AND v3.a = 30;
```

GPORCA supports the following types of CTEs:

- CTEs that define multiple logical tables. In the example below, the CTE defines two logical tables:

    ```sql
    WITH cte1 AS (SELECT a, sum(b) as s FROM T 
                   WHERE c < 10 GROUP BY a),
          cte2 AS (SELECT a, s FROM cte1 WHERE s > 1000)
      SELECT *
      FROM cte1 as v1, cte2 as v2, cte2 as v3
      WHERE v1.a < v2.a AND v1.s < v3.s;
    ```

## DML operation optimization

GPORCA also enhances DML operations such as `INSERT`, `UPDATE`, and `DELETE`:

- DML operations appear as regular operator nodes in the execution plan.

    - They can appear at any position in the plan (currently limited to the top-level slice).
    - They can have downstream nodes (consumers).

- `UPDATE` operations are implemented using the `Split` operator and support the following:

    - Updates to distribution key columns.
    - Updates to partition key columns. The following example shows a plan containing a `Split` operator:
   
    ```sql
    QUERY PLAN
    --------------------------------------------------------------
    Update  (cost=0.00..5.46 rows=1 width=1)
       ->  Redistribute Motion 2:2  (slice1; segments: 2)
             Hash Key: a
             ->  Result  (cost=0.00..3.23 rows=1 width=48)
                   ->  Split  (cost=0.00..2.13 rows=1 width=40)
                         ->  Result  (cost=0.00..1.05 rows=1 width=40)
                               ->  Seq Scan on dmltest
    ```

## Other optimization capabilities

GPORCA also includes the following optimization features:

- Improved join order selection.
- Support for reordering joins and aggregation operations.
- Optimization of sort order.
- Consideration of data skew estimation during optimization.
