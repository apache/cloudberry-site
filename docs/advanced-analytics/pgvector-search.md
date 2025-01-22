---
title: Use pgvector for Vector Similarity Search
---

# Use pgvector for Vector Similarity Search

pgvector is an open-source plugin for vector similarity search. It supports both exact and approximate nearest neighbor searches, as well as L2 distance, inner product, and cosine distance. For more details, see [pgvector/pgvector: Open-source vector similarity search for Postgres](https://github.com/pgvector/pgvector). 

Apache Cloudberry allows you to use pgvector for data storage, querying, indexing, hybrid searches, and more through SQL statements. This document explains how to use pgvector in Apache Cloudberry.

:::note
While the pgvector extension is maintained by the dedicated pgvector community, Cloudberry is committed to ensuring its compatibility and ease of use within our platform. Here is one [forked pgvector version](https://github.com/cloudberry-contrib/pgvector), which is contributed by the community members and customized for Cloudberry, but please note that it is not maintained as one official Cloudberry project.
:::

## Quick start

Enable the extension (do this once in each database where you want to use it):

``` sql
CREATE EXTENSION vector;
```

Create a vector column with 3 dimensions:

``` sql
CREATE TABLE items (id bigserial PRIMARY KEY, embedding vector(3));
```

Insert vector data:

``` sql
INSERT INTO items (embedding) VALUES ('[1,2,3]'), ('[4,5,6]');
```

Get the nearest neighbors by L2 distance:

``` sql
SELECT * FROM items ORDER BY embedding <-> '[3,1,2]' LIMIT 5;
```

Note: Use `<#>` for inner product and `<=>` for cosine distance. 

## Store data

Create a table with a vector column:

``` sql
CREATE TABLE items (id bigserial PRIMARY KEY, embedding vector(3));
```

Or add a vector column to an existing table:

``` sql
ALTER TABLE items ADD COLUMN embedding vector(3);
```

Insert vectors:

``` sql
INSERT INTO items (embedding) VALUES ('[1,2,3]'), ('[4,5,6]');
```

Insert and update vectors:

``` sql
INSERT INTO items (id, embedding) VALUES (1, '[1,2,3]'), (2, '[4,5,6]')
    ON CONFLICT (id) DO UPDATE SET embedding = EXCLUDED.embedding;
```

Update vectors:

``` sql
UPDATE items SET embedding = '[1,2,3]' WHERE id = 1;
```

Delete vectors:

``` sql
DELETE FROM items WHERE id = 1;
```

## Query data

Get the nearest neighbors to a vector:

``` sql
SELECT * FROM items ORDER BY embedding <-> '[3,1,2]' LIMIT 5;
```

The supported distance functions are:

-   `<->`: L2 distance
-   `<#>`: negative inner product
-   `<=>`: cosine distance

Get the nearest neighbors of a row:

``` sql
SELECT * FROM items WHERE id != 1 ORDER BY embedding <-> (SELECT embedding FROM items WHERE id = 1) LIMIT 5;
```

Get rows within a specific distance range:

``` sql
SELECT * FROM items WHERE embedding <-> '[3,1,2]' < 5;
```

Note: Using `ORDER BY` and `LIMIT` together can take advantage of indexing.

Get the distance:

``` sql
SELECT embedding <-> '[3,1,2]' AS distance FROM items;
```

For inner product, multiply by `-1` (because `<#>` returns the negative inner product).

``` sql
SELECT (embedding <#> '[3,1,2]') * -1 AS inner_product FROM items;
```

For cosine similarity, use `1` minus the cosine distance.

``` sql
SELECT 1 - (embedding <=> '[3,1,2]') AS cosine_similarity FROM items;
```

Calculate the average of vectors:

``` sql
SELECT AVG(embedding) FROM items;
```

Calculate the average of a group of vectors:

``` sql
SELECT category_id, AVG(embedding) FROM items GROUP BY category_id;
```

## Index data

By default, pgvector performs exact nearest neighbor searches, which provides a high recall rate.

If you need a higher recall rate, you can use approximate nearest neighbor search by adding an index, although this might reduce performance. Unlike adding a regular index, after adding an approximate index, **queries will return different results**.

pgvector supports the following index types:

-   HNSW
-   IVFFlat

### HNSW index

**About HNSW**
HNSW (Hierarchical Navigable Small World) is an efficient algorithm for approximate nearest neighbor search, designed for processing large-scale and high-dimensional datasets.

The basic principles of HNSW are as follows:

> -   Multi-level graph structure: HNSW organizes data by building a multi-level graph. In this graph, each node represents a data point (or vector), and the edges between nodes reflect their relative proximity in space.
> -   Search optimization: This multi-level structure allows the search process to skip over many irrelevant data points quickly, narrowing down the neighboring area of the query vector. This greatly improves query efficiency.

HNSW is particularly useful in the following scenarios:

> -   High-dimensional data: HNSW index is very effective for high-dimensional datasets, because it is good at handling complex proximity relationships in high-dimensional space.
> -   Large datasets: HNSW index is suitable for large datasets because it balances query speed and recall rate better than many other types of indexes.

Creating an HNSW index takes longer and uses more memory, but it offers better query performance (speed-recall tradeoff). Unlike IVFFlat, HNSW does not require a training step, so you can create the index even when the table has no data.

Add an index for each distance function you plan to use.

#### Create an HNSW index

Each distance metric has its specific use cases. The choice of which method to use for creating an index depends on the type of search you want to optimize. For example, if your application focuses on getting vectors with similar direction but possibly different magnitudes, an index created with cosine distance might be more suitable. On the other hand, if you are concerned with the straight-line distance between vectors, you should choose an index based on L2 distance.

L2 distance:

``` sql
CREATE INDEX ON items USING hnsw (embedding vector_l2_ops);
```

Inner product:

``` sql
CREATE INDEX ON items USING hnsw (embedding vector_ip_ops);
```

Cosine distance:

``` sql
CREATE INDEX ON items USING hnsw (embedding vector_cosine_ops);
```

The maximum dimension for indexable vectors is 2000.



#### HNSW index options

-   `m`: The maximum number of connections per layer (`16` by default).
-   `ef_construction`: The size of the dynamic candidate list used to build the graph (`64` by default).

``` sql
CREATE INDEX ON items USING hnsw (embedding vector_l2_ops) WITH (m = 16, ef_construction = 64);
```

A larger `ef_construction` value provides higher recall but at the cost of index build time and insert speed.

#### HNSW index query options

Specify the size of the dynamic candidate list for searches (`40` by default). A larger value improves recall but reduces speed.

``` sql
SET hnsw.ef_search = 100;
```

Use `SET LOCAL` within a transaction to apply it to a single query:

``` sql
BEGIN;
SET LOCAL hnsw.ef_search = 100;
SELECT ...
COMMIT;
```

#### HNSW index build time

Index build speed increases greatly when the internal graph structure of the HNSW index fits into `maintenance_work_mem`.

``` sql
SET maintenance_work_mem = '8GB';
```

If the graph no longer fits, you will receive a notification:

``` sql
NOTICE:  hnsw graph no longer fits into maintenance_work_mem after 100000 tuples
DETAIL:  Building will take significantly more time.
HINT:  Increase maintenance_work_mem to speed up builds.
```

Note: Do not set `maintenance_work_mem` too high, because this exhausts the server's memory.

Like other index types, it is faster to create the index after loading the initial data.


``` sql
SET max_parallel_maintenance_workers = 7; -- Including the leader thread
```

For more workers, you might also need to increase `max_parallel_workers` (`8` by default).

#### View HNSW index progress

You can check the progress when creating an HNSW index:

``` sql
SELECT phase, round(100.0 * blocks_done / nullif(blocks_total, 0), 1) AS "%" FROM pg_stat_progress_create_index;
```

The HNSW index build process includes the following phases:

1.  `initializing`: The starting phase of index creation. In this phase, the system prepares all necessary resources and configurations to begin building the index.
2.  `loading tuples`: Data points (or vectors) are added to the multi-level graph, and the corresponding connections are established.

### IVFFlat index

**About IVFFlat**
The IVFFlat index is a method for efficient vector search in large datasets, particularly useful for the Approximate Nearest Neighbor (ANN) search.

The basic principles of IVFFlat index are as follows:

> -   Partitioned search space: IVFFlat works by dividing the data into multiple "lists". These lists are created by clustering the dataset (for example, using the K-means algorithm), with each list representing a cluster in the data space.
> -   Reduced search complexity: Instead of searching through the entire dataset, the search first identifies which lists (or clusters) the search vector is likely to belong to, then only searches within those lists, reducing computing time.

IVFFlat is particularly useful in the following scenarios:

> -   Large datasets: For datasets containing many vectors, a full search (checking every vector) can be very time-consuming. IVFFlat optimizes the search process through clustering and partitioning.
> -   Approximate search: IVFFlat is an approximate nearest neighbor search method, suitable for scenarios where quick response times are needed and some inaccuracy in search results is acceptable.

To achieve good recall with IVFFlat, follow these best practices:

> -   Create the index after some data has been inserted into the table.
> -   Choose an appropriate number of lists. For tables with up to 1 million rows, it is recommended to use the number of rows divided by 1000 as the number of lists. For tables with more than 1 million rows, use the square root of the number of rows as the number of lists.
> -   Specify an appropriate number of probes during queries (the higher the number of probes, the higher the recall, but the slower the query). It is recommended to start by trying the square root of the number of lists. Add an index for each distance function you plan to use.

#### Create an IVFFlat index

Each distance metric has its specific use cases. The choice of which method to use for creating an index depends on the type of search you want to optimize. For example, if your application focuses on finding vectors with similar direction but possibly different magnitudes, an index created with cosine distance might be more suitable. On the other hand, if you are concerned with the straight-line distance between vectors, you should choose an index based on L2 distance.

The `lists` parameter specifies the number of partitions (lists).

L2 distance:

``` sql
CREATE INDEX ON items USING ivfflat (embedding vector_l2_ops) WITH (lists = 100);
```

Inner product:

``` sql
CREATE INDEX ON items USING ivfflat (embedding vector_ip_ops) WITH (lists = 100);
```

Cosine distance:

``` sql
CREATE INDEX ON items USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
```

Attention: Apache Cloudberry currently supports indexing vectors with up to 2000 dimensions.



#### Specify the number of Probes

The number of probes means how many "lists" the system checks during an approximate nearest neighbor search. These lists are subsets of the dataset created through clustering algorithms like K-means. Increasing the number of probes means the system checks more lists to get the nearest neighbors, thus improving accuracy. A higher number of probes increases search accuracy but also adds computing overhead, slowing down the search. Therefore, the number of probes is a parameter that should be balanced based on specific use cases.



Specify the number of probes (`1` by default):

``` sql
SET ivfflat.probes = 10;
```

If you choose a large number of probes, there might be some performance loss that impacts speed, but you will achieve higher recall. You can also set it to match the number of lists for an exact nearest neighbor search (in this case, the optimizer does use the index).

Use `SET LOCAL` within a transaction to set the number of probes for a single query:

``` sql
BEGIN;
SET LOCAL ivfflat.probes = 10;
SELECT ...
COMMIT;
```

#### View IVFFlat index progress

You can check the index progress during its creation:

``` sql
SELECT phase, tuples_done, tuples_total FROM pg_stat_progress_create_index;
```

The progress phases include:

1.  `initializing`: The starting phase of index creation. The system prepares all necessary resources and configurations during this phase.
2.  `performing k-means`: The k-means algorithm is used to divide the vector dataset into multiple lists (or clusters).
3.  `sorting tuples`: Sorting the data (tuples). This is done based on vector values or the lists they belong to, optimizing the index structure and improving search efficiency.
4.  `loading tuples`: Data is actually loaded into the index structure, which means that tuple data is written to the index to ensure it meets indexing requirements.



Attention: `tuples_done` and `tuples_total` are only populated during the loading tuples phase.


### Use filters in indexes

When creating an index, you can use a `WHERE` clause to limit the scope of the index. This method allows vector searches to only consider rows that meet specific conditions, which improves search efficiency and accuracy.

``` sql
SELECT * FROM items WHERE category_id = 123 ORDER BY embedding <-> '[3,1,2]' LIMIT 5;
```

Create an index on one or more `WHERE` columns for exact searches:

``` sql
CREATE INDEX ON items (category_id);
```

Create a partial index on a vector column for approximate searches:

``` sql
CREATE INDEX ON items USING ivfflat (embedding vector_l2_ops) WITH (lists = 100) WHERE (category_id = 123);
```

For approximate searches with different values in multiple `WHERE` columns, use partitioning:

``` sql
CREATE TABLE items (embedding vector(3), category_id int) PARTITION BY LIST(category_id);
```


## Hybrid search

Perform hybrid search using Apache Cloudberry full-text search:

``` sql
SELECT id, content FROM items, plainto_tsquery('hello search') query
    WHERE textsearch @@ query ORDER BY ts_rank_cd(textsearch, query) DESC LIMIT 5;
```

## pgvector performance

Use `EXPLAIN ANALYZE` for performance debugging:

``` sql
EXPLAIN ANALYZE SELECT * FROM items ORDER BY embedding <-> '[3,1,2]' LIMIT 5;
```

### Exact search

To speed up queries without an index, you can increase the value of the `max_parallel_workers_per_gather` parameter.

``` sql
SET max_parallel_workers_per_gather = 4;
```

If vectors are already normalized to a length of `1` (for example, the [OpenAI embeddings](https://platform.openai.com/docs/guides/embeddings/which-distance-function-should-i-use)), using inner product can provide the best performance.

``` sql
SELECT * FROM items ORDER BY embedding <#> '[3,1,2]' LIMIT 5;
```

### Approximate search

To speed up queries with an index, you can increase the number of inverted lists (at the cost of some recall).

``` sql
CREATE INDEX ON items USING ivfflat (embedding vector_l2_ops) WITH (lists = 1000);
```

These are some guidelines for nearest neighbor search and performance optimization in pgvector. Depending on your needs and data structure, you can adjust and optimize based on these recommendations.
