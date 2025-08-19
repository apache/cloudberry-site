---
title: Use pgvector for Vector Similarity Search
---

# 使用pgvector进行向量相似度搜索

pgvector 是一个开源的向量相似度搜索插件。它支持精确和近似的最近邻搜索，以及 L2 距离、内积和余弦距离。更多详情可参考： [pgvector/pgvector: Open-source vector similarity search for Postgres](https://github.com/pgvector/pgvector). 

Apache Cloudberry 允许用户通过 SQL 语句使用 pgvector 进行数据存储、查询、索引、混合搜索等操作。本文将介绍如何在 Apache Cloudberry 中使用 pgvector。

:::note

虽然 pgvector 扩展由专门的 pgvector 社区维护，但 Cloudberry 致力于确保其在我们平台上的兼容性和易用性。这里提供了一个 [pgvector 版本](https://github.com/cloudberry-contrib/pgvector)分支，该分支由社区成员贡献并针对 Cloudberry 进行了定制，请注意，该分支不属于 Cloudberry 的官方维护项目。
:::

## 快速开始

启用扩展（在每个需要使用的数据库中执行一次）：

``` sql
CREATE EXTENSION vector;
```

创建一个具有 3 个维度的向量列：

``` sql
CREATE TABLE items (id bigserial PRIMARY KEY, embedding vector(3));
```

插入向量数据：

``` sql
INSERT INTO items (embedding) VALUES ('[1,2,3]'), ('[4,5,6]');
```

通过 L2 距离获取最近邻数据：

``` sql
SELECT * FROM items ORDER BY embedding <-> '[3,1,2]' LIMIT 5;
```

注意: 使用 `<#>` 表示内积，使用 `<=>` 表示余弦距离。

## 存储数据

创建一个带有向量列的表：

``` sql
CREATE TABLE items (id bigserial PRIMARY KEY, embedding vector(3));
```

或者在已有的表中添加一个向量列：

``` sql
ALTER TABLE items ADD COLUMN embedding vector(3);
```

插入向量：

``` sql
INSERT INTO items (embedding) VALUES ('[1,2,3]'), ('[4,5,6]');
```

插入并更新向量：

``` sql
INSERT INTO items (id, embedding) VALUES (1, '[1,2,3]'), (2, '[4,5,6]')
    ON CONFLICT (id) DO UPDATE SET embedding = EXCLUDED.embedding;
```

更新向量：

``` sql
UPDATE items SET embedding = '[1,2,3]' WHERE id = 1;
```

删除向量：

``` sql
DELETE FROM items WHERE id = 1;
```

## 查询数据

获取与某个向量的最近邻数据：

``` sql
SELECT * FROM items ORDER BY embedding <-> '[3,1,2]' LIMIT 5;
```

支持的距离函数包括：

-   `<->`: L2 距离
-   `<#>`: 负内积
-   `<=>`: 余弦距离

获取某一行的最近邻数据：

``` sql
SELECT * FROM items WHERE id != 1 ORDER BY embedding <-> (SELECT embedding FROM items WHERE id = 1) LIMIT 5;
```

获取在特定距离范围内的行：

``` sql
SELECT * FROM items WHERE embedding <-> '[3,1,2]' < 5;
```

注意：`ORDER BY` 和 `LIMIT` 一起使用时可以利用索引。

获取距离：

``` sql
SELECT embedding <-> '[3,1,2]' AS distance FROM items;
```

对于内积，需要乘以 `-1`（因为 `<#>` 返回的是负内积）。

``` sql
SELECT (embedding <#> '[3,1,2]') * -1 AS inner_product FROM items;
```

对于余弦相似度，可以用 `1` 减去余弦距离。

``` sql
SELECT 1 - (embedding <=> '[3,1,2]') AS cosine_similarity FROM items;
```

计算向量的平均值：

``` sql
SELECT AVG(embedding) FROM items;
```

计算一组向量的平均值：

``` sql
SELECT category_id, AVG(embedding) FROM items GROUP BY category_id;
```

## 索引数据

默认情况下，pgvector 会执行精确的最近邻搜索，这能够提供较高的召回率。

如果需要更高的召回率，可以通过添加索引来使用近似最近邻搜索，但这可能会降低性能。与常规索引不同的是，添加近似索引后，**查询结果可能会不同**。

pgvector 支持以下索引类型：

-   HNSW
-   IVFFlat

### HNSW index

**关于 HNSW**
HNSW (Hierarchical Navigable Small World) 是一种高效的近似最近邻搜索算法，专为处理大规模和高维数据集而设计。

HNSW 的基本原理如下：

> -   **多层图结构**：HNSW 通过构建多层图来组织数据。在图中，每个节点代表一个数据点（或向量），节点之间的边反映它们在空间中的相对接近程度。
> -   **搜索优化**：这种多层结构使搜索过程能够快速跳过大量无关的数据点，缩小查询向量的邻域范围，从而大幅提升查询效率。

HNSW 特别适用于以下场景：

> - **高维数据**：HNSW 索引对高维数据集非常有效，因为它善于处理高维空间中的复杂邻近关系。

> -   **大规模数据集**：HNSW 索引适合大规模数据集，因为它比许多其他索引类型更好地平衡了查询速度与召回率。

创建 HNSW 索引所需时间更长、内存占用更高，但能提供更好的查询性能（速度与召回率的权衡）。与 IVFFlat 不同，HNSW 不需要训练步骤，因此即使表中没有数据，也可以创建索引。

需要为计划使用的每种距离函数分别添加索引。

#### 创建 HNSW 索引

每种距离度量都有其特定的应用场景。选择哪种方式创建索引，取决于你要优化的搜索类型。例如，如果你的应用更关注向量方向相似而幅度可能不同的情况，那么使用余弦距离创建的索引可能更合适。如果关注的是向量之间的直线距离，那么应选择基于 L2 距离的索引。

索引支持的最大向量维度为 2000。

L2 距离:

``` sql
CREATE INDEX ON items USING hnsw (embedding vector_l2_ops);
```

内积:

``` sql
CREATE INDEX ON items USING hnsw (embedding vector_ip_ops);
```

余弦距离:

``` sql
CREATE INDEX ON items USING hnsw (embedding vector_cosine_ops);
```

索引支持的最大向量维度为 2000。



#### HNSW 索引参数

-   `m`: 每层的最大连接数（默认 `16`）。
-   `ef_construction`: 构建图时动态候选列表的大小（默认 `64`）。

``` sql
CREATE INDEX ON items USING hnsw (embedding vector_l2_ops) WITH (m = 16, ef_construction = 64);
```

较大的 `ef_construction` 值可以提供更高的召回率，但会增加索引构建时间和插入速度的开销。

#### HNSW 索引查询参数

可指定搜索时动态候选列表的大小（默认 `40`）。值越大，召回率越高，但查询速度越慢。

``` sql
SET hnsw.ef_search = 100;
```

在事务中使用 `SET LOCAL` 可以只对单次查询生效。

``` sql
BEGIN;
SET LOCAL hnsw.ef_search = 100;
SELECT ...
COMMIT;
```

#### HNSW 索引构建时间

当 HNSW 索引的内部图结构能完全放入 `maintenance_work_mem` 时，索引构建速度会显著提升。

``` sql
SET maintenance_work_mem = '8GB';
```

如果图结构过大，会收到如下提醒：

``` sql
NOTICE:  hnsw graph no longer fits into maintenance_work_mem after 100000 tuples
DETAIL:  Building will take significantly more time.
HINT:  Increase maintenance_work_mem to speed up builds.
```

注意：不要把 `maintenance_work_mem` 设置得过高，否则可能耗尽服务器内存。

和其他索引类型一样，在加载初始数据后再创建索引速度更快。


``` sql
SET max_parallel_maintenance_workers = 7; -- Including the leader thread
```

如果需要更多并行工作进程，还需要增加 `max_parallel_workers`（默认 `8`）。

#### 查看 HNSW 索引进度

在创建 HNSW 索引时，可以查看进度。

``` sql
SELECT phase, round(100.0 * blocks_done / nullif(blocks_total, 0), 1) AS "%" FROM pg_stat_progress_create_index;
```

HNSW 索引的构建过程包含以下阶段：

1.  `initializing`: 索引创建的初始阶段，在这一阶段，系统为创建索引准备必要的资源和配置。
2.  `loading tuples`: 向多层图中添加数据点（向量），并建立对应的连接关系。

### IVFFlat 索引

**关于 IVFFlat**
IVFFlat 索引是一种适用于大规模数据集的高效向量搜索方法，常用于近似最近邻（ANN）搜索。

IVFFlat 的基本原理如下：

> -   **搜索空间分区**：IVFFlat 将数据划分为多个“列表”（list），这些列表通过对数据集进行聚类（如 K-means 算法）生成，每个列表代表数据空间中的一个簇。
> -   **降低搜索复杂度**：搜索时，不是遍历整个数据集，而是先确定查询向量可能属于哪些列表，然后只在这些列表内进行搜索，从而降低计算开销。

IVFFlat 特别适合以下场景：

> -   **大规模数据集**：对于包含大量向量的数据集，逐个比较的全量搜索代价高昂，IVFFlat 通过聚类分区优化搜索效率。
> -   **近似搜索**：IVFFlat 是一种近似最近邻搜索方法，适用于需要快速响应且能接受结果存在一定误差的场景。

为获得较好的召回率，建议：

> -   在表中已有一定数据后再创建索引。
> -   合理选择列表数（lists）：当表的行数 ≤ 100 万时，推荐使用行数 ÷ 1000 作为列表数；当表的行数 > 100 万时，推荐使用行数平方根作为列表数。
> -   Specify an appropriate number of probes during queries (the higher the number of probes, the higher the recall, but the slower the query). It is recommended to start by trying the square root of the number of lists. Add an index for each distance function you plan to use.

#### 创建IVFFlat索引

每种距离度量都有其特定的应用场景。选择哪种方法创建索引，取决于你想优化的搜索类型。例如，如果你的应用关注的是找到方向相似但幅度可能不同的向量，那么使用余弦距离创建的索引可能更合适。另一方面，如果你关注向量之间的直线距离，那么应选择基于 L2 距离的索引。

`lists` 参数指定分区（列表）的数量。

L2 距离:

``` sql
CREATE INDEX ON items USING ivfflat (embedding vector_l2_ops) WITH (lists = 100);
```

内积:

``` sql
CREATE INDEX ON items USING ivfflat (embedding vector_ip_ops) WITH (lists = 100);
```

余弦距离:

``` sql
CREATE INDEX ON items USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
```

注意：Apache Cloudberry目前只支持最多2000维索引向量



#### 指定Probes数量

Probes表示在近似最近邻搜索过程中，系统检查多少个“列表”。这些列表是通过聚类算法（如 K-means）从数据集中生成的子集。增加探针数意味着系统会检查更多列表以找到最近邻，从而提高搜索精度。探针数越高，搜索精度越高，但也增加计算开销，降低查询速度。因此，探针数应根据具体应用场景进行平衡。

选择探针数量 (默认为`1` ):

``` sql
SET ivfflat.probes = 10;
```

如果选择较大的探针数，可能会对速度造成一定影响，但可以获得更高的召回率。你也可以将探针数设置为与列表数相等，以进行精确最近邻搜索（此时优化器会使用索引）。

Use `SET LOCAL` within a transaction to set the number of probes for a single query:

``` sql
BEGIN;
SET LOCAL ivfflat.probes = 10;
SELECT ...
COMMIT;
```

#### 查看 IVFFlat 索引进度

在创建 IVFFlat 索引时，可以查看索引构建进度。

``` sql
SELECT phase, tuples_done, tuples_total FROM pg_stat_progress_create_index;
```

索引构建过程包括以下阶段：

1.  `initializing`: 索引创建的起始阶段，系统准备必要的资源和配置。
2.  `performing k-means`: 使用 K-means 算法将向量数据集划分为多个列表（簇）。
3.  `sorting tuples`: 对数据（元组）进行排序，根据向量值或所属列表优化索引结构，提高搜索效率。
4.  `loading tuples`: 将数据实际加载到索引结构中，确保索引满足要求。

注意：`tuples_done` 和 `tuples_total` 仅在 `loading tuples` 阶段才会显示。


### 在索引中使用过滤条件

创建索引时，可以使用 `WHERE` 子句限制索引范围。这种方法允许向量搜索只考虑满足特定条件的行，从而提高搜索效率和准确性：

``` sql
SELECT * FROM items WHERE category_id = 123 ORDER BY embedding <-> '[3,1,2]' LIMIT 5;
```

在精确搜索时，可以为一个或多个 `WHERE` 条件列创建索引：

``` sql
CREATE INDEX ON items (category_id);
```

对近似搜索，可以在向量列上创建部分索引：

``` sql
CREATE INDEX ON items USING ivfflat (embedding vector_l2_ops) WITH (lists = 100) WHERE (category_id = 123);
```

对多条件 `WHERE` 场景，可以使用表分区来优化搜索：

``` sql
CREATE TABLE items (embedding vector(3), category_id int) PARTITION BY LIST(category_id);
```


## 混合搜索

可以结合 Apache Cloudberry 的全文搜索功能执行混合搜索：

``` sql
SELECT id, content FROM items, plainto_tsquery('hello search') query
    WHERE textsearch @@ query ORDER BY ts_rank_cd(textsearch, query) DESC LIMIT 5;
```

## pgvector 性能

可以使用 `EXPLAIN ANALYZE` 进行性能调试:

``` sql
EXPLAIN ANALYZE SELECT * FROM items ORDER BY embedding <-> '[3,1,2]' LIMIT 5;
```

### 精确搜索

若没有索引，可通过增加 `max_parallel_workers_per_gather` 参数来提高查询速度：

``` sql
SET max_parallel_workers_per_gather = 4;
```

如果向量已经归一化为长度为 1（例如 OpenAI embeddings），使用内积可获得最佳性能：

``` sql
SELECT * FROM items ORDER BY embedding <#> '[3,1,2]' LIMIT 5;
```

### 近似搜索

若已有索引，可通过增加反向列表数量（lists）来加速查询，但可能会牺牲部分召回率：

``` sql
CREATE INDEX ON items USING ivfflat (embedding vector_l2_ops) WITH (lists = 1000);
```

以上是 pgvector 中最近邻搜索及性能优化的一些指南。你可以根据具体需求和数据结构，对这些建议进行调整和优化。
