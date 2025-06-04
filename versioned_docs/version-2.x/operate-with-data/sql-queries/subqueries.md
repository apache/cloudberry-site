---
title: Subqueries
---

# Subqueries

Subqueries let you embed one query inside another, enabling dynamic and conditional logic when defining queries. They are useful for filtering, calculating intermediate values, or expressing correlated relationships.

This document distinguishes between scalar and correlated subqueries and provides guidance on when and how to use them effectively.

A scalar subquery is a `SELECT` query in parentheses that returns exactly one row with one column. Do not use a `SELECT` query that returns multiple rows or columns as a scalar subquery. The query runs and uses the returned value in the surrounding value expression. A correlated scalar subquery contains references to the outer query block.

## Correlated subqueries

A correlated subquery (CSQ) is a `SELECT` query with a `WHERE` clause or target list that contains references to the parent outer clause. CSQs efficiently express results in terms of results of another query. Apache Cloudberry supports correlated subqueries that provide compatibility with many existing applications. A CSQ is a scalar or table subquery, depending on whether it returns one or multiple rows. Apache Cloudberry does not support correlated subqueries with skip-level correlations.

## Correlated subquery examples

### Example 1 – Scalar correlated subquery

```sql
SELECT * FROM t1 WHERE t1.x 
            > (SELECT MAX(t2.x) FROM t2 WHERE t2.y = t1.y);
```

### Example 2 – Correlated EXISTS subquery

```sql
SELECT * FROM t1 WHERE 
EXISTS (SELECT 1 FROM t2 WHERE t2.x = t1.x);
```

Apache Cloudberry uses one of the following methods to run CSQs:

- Unnest the CSQ into join operations – This method is most efficient, and it is how Apache Cloudberry runs most CSQs, including queries from the TPC-H benchmark.
- Run the CSQ on every row of the outer query – This method is relatively inefficient, and it is how Apache Cloudberry runs queries that contain CSQs in the `SELECT` list or are connected by `OR` conditions.

The following examples illustrate how to rewrite some of these types of queries to improve performance.

### Example 3 - CSQ in the select list

*Original Query*

```sql
SELECT T1.a,
      (SELECT COUNT(DISTINCT T2.z) FROM t2 WHERE t1.x = t2.y) dt2 
FROM t1;
```

Rewrite this query to perform an inner join with `t1` first and then perform a left join with `t1` again. The rewrite applies for only an equijoin in the correlated condition.

*Rewritten Query*

```sql
SELECT t1.a, dt2 FROM t1 
       LEFT JOIN 
        (SELECT t2.y AS csq_y, COUNT(DISTINCT t2.z) AS dt2 
              FROM t1, t2 WHERE t1.x = t2.y 
              GROUP BY t1.x) 
       ON (t1.x = csq_y);
```

### Example 4 - CSQs connected by OR clauses

*Original Query*

```sql
SELECT * FROM t1 
WHERE 
x > (SELECT COUNT(*) FROM t2 WHERE t1.x = t2.x) 
OR x < (SELECT COUNT(*) FROM t3 WHERE t1.y = t3.y)
```

Rewrite this query to separate it into two parts with a union on the `OR` conditions.

*Rewritten Query*

```sql
SELECT * FROM t1 
WHERE x > (SELECT count(*) FROM t2 WHERE t1.x = t2.x) 
UNION 
SELECT * FROM t1 
WHERE x < (SELECT count(*) FROM t3 WHERE t1.y = t3.y)
```

To view the query plan, use `EXPLAIN SELECT` or `EXPLAIN ANALYZE SELECT`. Subplan nodes in the query plan indicate that the query will run on every row of the outer query, and the query is a candidate for rewriting. For more information about these statements, see [Analyze Query Performance](../../performance/optimize-queries/analyze-query-performance.md).
