---
title: 创建和管理物化视图
---

# 在 Apache Cloudberry 中创建和管理物化视图

在 Apache Cloudberry 中，物化视图与普通视图类似。物化视图允许你保存一条常用或复杂的查询语句，并像查询普通表一样通过 `SELECT` 访问该查询的结果。物化视图会将查询结果以类似表的形式持久化存储。

与直接访问底层表或使用普通视图相比，读取物化视图中的数据通常更快，但物化视图中的数据不是实时更新的，且不能直接修改。如果要更新其中的数据，需使用 `REFRESH MATERIALIZED VIEW` 命令进行刷新。

创建物化视图时使用的查询语句，与创建普通视图的方式完全一致。例如，可以创建一个用于快速展示历史销售汇总的物化视图，在某些场景下可以接受当前日期的数据不完整：

```sql
CREATE MATERIALIZED VIEW sales_summary AS
  SELECT seller_no, invoice_date, sum(invoice_amt)::numeric(13,2) as sales_amt
    FROM invoice
    WHERE invoice_date < CURRENT_DATE
    GROUP BY seller_no, invoice_date;

CREATE UNIQUE INDEX sales_summary_seller
  ON sales_summary (seller_no, invoice_date);
```

这个物化视图可以用于销售人员的仪表盘中绘制图表。你可以通过如下命令安排夜间定时任务来更新汇总信息：

```sql
REFRESH MATERIALIZED VIEW sales_summary;
```

在系统目录中，物化视图的元数据信息与表或普通视图完全一致。物化视图与表、视图一样，都是一种关系对象。当在查询中引用物化视图时，系统会直接返回其中保存的数据，就像查询普通表一样。定义中的查询语句仅用于填充视图数据，并不会在查询过程中再次执行。

如果你能接受定期刷新物化视图的数据，那么就能通过它获得非常可观的性能收益。

物化视图的一个典型用途是加速访问外部数据源（如外部表或 foreign data wrapper）导入的数据。此外，物化视图可以创建索引，而 foreign data wrapper 不支持索引，因此这也是一个性能优势（尽管并不适用于所有类型的外部数据源）。

如果某个子查询仅在单个查询中使用，且使用频率不高，可以考虑直接使用 `SELECT` 语句的 `WITH` 子句代替创建物化视图。

## 创建物化视图

`CREATE MATERIALIZED VIEW` 命令可以基于一条查询语句定义一个物化视图。

```sql
CREATE MATERIALIZED VIEW us_users AS SELECT u.id, u.name, a.zone FROM users u, address a WHERE a.country = 'USA';
```

:::tip 提示
如果创建物化视图时使用了 `ORDER BY` 或 `SORT` 子句，排序仅在首次创建视图时生效。之后每次刷新物化视图时，数据不会保留原有的排序顺序。因为物化视图本质上是一个静态快照，它不会随着新数据的插入自动更新或维持顺序。
:::

## 刷新或停用物化视图

使用 `REFRESH MATERIALIZED VIEW` 命令可以更新物化视图中的数据：

```sql
REFRESH MATERIALIZED VIEW us_users;
```

如果使用了 `WITH NO DATA` 子句，当前数据将被清除，且不会重新填充新数据，物化视图将处于不可查询的状态。如果此时尝试查询该视图，会报错。

```sql
REFRESH MATERIALIZED VIEW us_users WITH NO DATA;
```

## 删除物化视图

使用 `DROP MATERIALIZED VIEW` 命令可以删除物化视图的定义和其中的数据。例如：

```sql
DROP MATERIALIZED VIEW us_users;
```

使用 `DROP MATERIALIZED VIEW ... CASCADE` 命令会一并删除所有依赖该物化视图的对象。例如，如果有另一个物化视图依赖于当前将被删除的视图，它也会被一起删除。如果不加 `CASCADE`，而存在依赖关系，则 `DROP MATERIALIZED VIEW` 命令会执行失败。
