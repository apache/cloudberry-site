---
title: GPORCA 功能与增强
---

# GPORCA 功能与增强

GPORCA 对某些类型的查询和操作提供了增强支持：

- 分区表查询
- 含子查询的查询
- 含公用表表达式（CTE）的查询
- DML 操作优化

## 分区表查询增强

GPORCA 在处理分区表查询时进行了以下优化：

- 提升了分区裁剪能力。

- 查询计划中可以包含 Partition Selector 运算符。

- `EXPLAIN` 计划中不再枚举所有分区。

    对于静态分区裁剪（即分区键与常量比较）的查询，GPORCA 会在 `EXPLAIN` 输出中展示 Partition Selector 运算符，并指明过滤条件和选中的分区数量。示例如下：

    ```sql
    Partition Selector for Part_Table (dynamic scan id: 1) 
            Filter: a > 10
            Partitions selected:  1 (out of 3)
    ```

    对于动态分区裁剪（即分区键与变量比较）的查询，分区选择会在执行期间确定，`EXPLAIN` 输出中不会列出选中的分区。

- 查询计划的体积不随分区数量增长。

- 显著降低了因分区数量过多而导致的内存不足风险。

以下 `CREATE TABLE` 示例创建了一个范围分区表：

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

GPORCA 对以下类型的分区表查询进行了优化：

- 全表扫描：不会在计划中枚举分区。

    ```sql
    SELECT * FROM sales;
    ```

- 使用常量过滤条件的查询：可执行分区裁剪。

    ```sql
    SELECT * FROM sales WHERE yr_qtr = 201501;
    ```

- 范围查询：同样会触发分区裁剪。

    ```sql
    SELECT * FROM sales WHERE yr_qtr BETWEEN 201601 AND 201704 ;
    ```

- 分区表连接查询：如下示例将维度表 `date_dim` 与事实表 `catalog_sales` 进行连接。

    ```sql
    SELECT * FROM catalog_sales
        WHERE date_id IN (SELECT id FROM date_dim WHERE month=12);
    ```

## 子查询优化

GPORCA 能更高效地处理子查询。子查询是嵌套在外部查询块中的查询，例如以下语句中 `WHERE` 子句中的 `SELECT`：

```sql
SELECT * FROM part
  WHERE price > (SELECT avg(price) FROM part);
```

GPORCA 同样优化了相关子查询（CSQ），即引用外层查询字段的子查询。例如以下语句中，内外层查询都使用了 `price` 列：

```sql
SELECT * FROM part p1 WHERE price > (SELECT avg(price) FROM part p2 WHERE p2.brand = p1.brand);
```

GPORCA 可以为以下类型的子查询生成更优的执行计划：

- 出现在 SELECT 列表中的相关子查询：

    ```sql
    SELECT *,
    (SELECT min(price) FROM part p2 WHERE p1.brand = p2.brand)
    AS foo
    FROM part p1;
    ```

- 出现在 OR 条件中的相关子查询：

    ```sql
    SELECT FROM part p1 WHERE p_size > 40 OR 
        p_retailprice > 
        (SELECT avg(p_retailprice) 
            FROM part p2 
            WHERE p2.p_brand = p1.p_brand)
    ```

- 含跳跃关联的嵌套子查询：

    ```sql
    SELECT * FROM part p1 WHERE p1.p_partkey 
    IN (SELECT p_partkey FROM part p2 WHERE p2.p_retailprice = 
        (SELECT min(p_retailprice)
            FROM part p3 
            WHERE p3.p_brand = p1.p_brand)
    );
    ```

    :::info 提示
    基于 Postgres 的查询规划器不支持跳跃关联的嵌套相关子查询。
    :::

- 含聚合和不等式的相关子查询：

    ```sql
    SELECT * FROM part p1 WHERE p1.p_retailprice =
    (SELECT min(p_retailprice) FROM part p2 WHERE p2.p_brand <> p1.p_brand);
    ```

- 必须返回单行的相关子查询：

    ```sql
    SELECT p_partkey, 
    (SELECT p_retailprice FROM part p2 WHERE p2.p_brand = p1.p_brand )
    FROM part p1;
    ```

## 公用表表达式（CTE）优化

GPORCA 能有效处理含 WITH 子句的查询。WITH 子句（即公用表表达式，CTE）定义了查询中临时使用的逻辑表。以下是一个包含 CTE 的查询示例：

```sql
WITH v AS (SELECT a, sum(b) as s FROM T where c < 10 GROUP BY a)
  SELECT * FROM  v AS v1 ,  v AS v2
  WHERE v1.a <> v2.a AND v1.s < v2.s;
```

作为查询优化的一部分，GPORCA 支持将谓词下推到 CTE 内部。例如以下查询中，等值谓词被下推到了 CTE 中：

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

GPORCA 支持以下类型的 CTE：

- 同时定义多个逻辑表的 CTE。以下示例中，CTE 定义了两个逻辑表：

    ```sql
    WITH cte1 AS (SELECT a, sum(b) as s FROM T 
                    where c < 10 GROUP BY a),
        cte2 AS (SELECT a, s FROM cte1 where s > 1000)
    SELECT *
    FROM cte1 as v1, cte2 as v2, cte2 as v3
    WHERE v1.a < v2.a AND v1.s < v3.s;
    ```

## DML 操作优化

GPORCA 对 `INSERT`、`UPDATE` 和 `DELETE` 等 DML 操作也做了增强：

- DML 操作在执行计划中作为普通运算符节点出现。

    - 可以出现在计划的任意位置（目前仅限顶层切片）。
    - 可以有下游节点（消费者）。

- `UPDATE` 操作通过 Split 运算符实现，支持以下特性：

    - 支持更新分布键列。
    - 支持更新分区键列。以下示例展示了包含 Split 运算符的计划：
   
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

## 其他优化能力

GPORCA 还包括以下优化能力：

- 更优的连接顺序选择。
- 支持连接和聚合操作的重排序。
- 排序顺序优化。
- 在优化过程中考虑数据倾斜估计。
