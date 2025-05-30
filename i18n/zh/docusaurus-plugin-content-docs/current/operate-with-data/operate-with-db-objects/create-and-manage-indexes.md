# 创建和管理索引

在传统数据库中，索引常用于显著提升数据访问性能。但在 Apache Cloudberry 这样的分布式数据库中，索引的使用需要更加谨慎。Apache Cloudberry 的顺序扫描速度非常快，而索引查找则依赖磁盘的随机访问模式。由于数据分布在多个 Segment 上，每个 Segment 只需扫描自己持有的数据子集即可返回结果。再加上表分区机制，查询所需扫描的数据量可能会进一步减少。因此，在商业智能（BI）类查询中，由于通常返回大量数据，使用索引反而可能带来性能负担。

推荐的做法是，在没有索引的情况下先运行查询工作负载。如有必要，再根据实际情况添加索引。索引通常更适合 OLTP 场景，因为这类查询往往只访问单条记录或小范围数据。对于返回目标行集的查询，索引在 AO 表上也能带来性能优势，执行器在合适情况下会选择使用索引，而非全表扫描。对于压缩数据，索引访问意味着只解压必要的行，从而提升整体效率。

当表定义了主键时，Apache Cloudberry 会自动创建 `PRIMARY KEY` 约束。在分区表上创建索引时，需在根分区表上直接创建，系统会自动将该索引扩展到所有子表。注意，不能在系统自动创建的子表上单独添加索引。

另外，`UNIQUE CONSTRAINT`（如 `PRIMARY KEY CONSTRAINT`）会隐式创建一个 `UNIQUE INDEX`，该索引必须包含分布键和分区键的所有列，并在整个表（包括子分区）范围内保持唯一性。

索引会引入额外开销：它们占用存储空间，并在更新表数据时需要同步维护。因此，请务必确认查询工作负载确实使用了所创建的索引，并验证其是否带来了性能提升。要确定是否使用了索引，可以检查查询计划（通过 `EXPLAIN` 打印查询计划）。

## 索引类型

Apache Cloudberry 支持 Postgres 的多种索引类型，包括 B-tree、Hash、GiST、SP-GiST、GIN 和 [BRIN 索引](./brin-indexes.md)。不同类型的索引适用于不同查询场景。B-tree 是默认类型，适用范围最广。关于各类索引的详细说明，可参考 PostgreSQL 官方文档中的[索引类型](https://www.postgresql.org/docs/14/indexes-types.html)。

:::note 说明
Apache Cloudberry 中，唯一索引的索引键列必须与分布键相同或包含分布键所有列。在分区表上，唯一索引不能跨所有分区强制唯一性，仅在单个子表内有效。
:::

### Bitmap 索引

Bitmap 索引特别适用于数据量大、查询频繁且更新较少的典型数据仓库场景。相较于普通索引，它在节省存储空间的同时，也能高效处理多条件查询。

Bitmap 索引为每个键值维护一个位图，位图中的每一位表示对应位置上的行是否包含该键值。多个位图之间可以进行布尔运算（如 `AND`、`OR`），从而支持高效的多条件组合过滤。在访问数据前，Bitmap 运算可提前过滤大量无关行，显著提升查询性能。

使用建议：

- 适用于数据仓库类的查询型负载；
- 最适合基数中等（大约 100 到 100000 个唯一值）的列；
- 尤其适用于 `WHERE` 子句中包含多个 `AND` 或 `OR` 条件的查询；
- 自 v2.0.0 起，支持通过数组谓词（如 `col IN (...)` 或 `col = ANY(array)`）触发 Bitmap Index Scan：

    - 可应用于 B-tree 和 Hash 索引；
    - Hash 索引原先仅支持等值匹配，现在也支持数组比较谓词；
    - 执行器会基于代价模型自动判断是否使用 Bitmap 路径。

    示例：以下查询可以触发 Bitmap Index 扫描，从而有效利用 Hash 索引处理多值条件，在大数据量场景下提升查询效率。

    ```sql
    CREATE TABLE users(id int, name text) DISTRIBUTED BY (id);
    CREATE INDEX ON users USING hash (name);

    SELECT * FROM users WHERE name IN ('alice', 'bob', 'carol');
    ```

使用限制：

- 不适用于唯一性列或高基数字段（如用户 ID、电话号码）。
- 不推荐用于频繁更新的 OLTP 场景。
- 建议在实际测试确认性能收益后再添加 Bitmap 索引。

## 管理索引

### 对索引进行聚簇

可以使用 `CLUSTER` 命令按照索引对表数据进行物理重排。不过，对于非常大的表，这一过程可能耗时较长。为了更高效地实现相同目的，也可以通过手动方式对表数据进行重新排序：创建一个中间表，并按预期顺序插入数据。例如：

```sql
CREATE TABLE new_table (LIKE old_table) 
    AS SELECT * FROM old_table ORDER BY myixcolumn;
DROP old_table;
ALTER TABLE new_table RENAME TO old_table;
CREATE INDEX myixcolumn_ix ON old_table;
VACUUM ANALYZE old_table;
```

### 创建索引

使用 `CREATE INDEX` 命令可以在表上创建索引。默认索引类型为 B-tree。例如，在 *employee* 表的 *gender* 列上创建 B-tree 索引：

```sql
CREATE INDEX gender_idx ON employee (gender);
```

在 *films* 表的 *title* 列上创建位图索引（Bitmap index）：

```sql
CREATE INDEX title_bmp_idx ON films USING bitmap (title);
```

### 重建表上的所有索引

可以使用 `REINDEX` 命令重建表或某个索引：

```sql
REINDEX my_table;
```

重建表上单个索引：

```sql
REINDEX my_index;
```

### 删除索引

使用 `DROP INDEX` 命令可删除索引。例如：

```sql
DROP INDEX title_idx;
```

在数据加载过程中，先删除所有索引，完成数据加载后再重新创建索引，通常可以加快整体加载速度。

## 仅索引扫描和覆盖索引

:::note 说明
Apache Cloudberry 仅在新建表上启用仅索引扫描（index-only scan）和覆盖索引（covering index）功能。
:::

### 什么是仅索引扫描

在 Apache Cloudberry 中，所有索引都是辅助索引，单独存储在主数据（堆表）之外。

在一般的索引扫描中，执行器会先通过索引定位符合条件的元组位置，然后再通过堆表指针访问堆表以读取实际数据。由于堆表中的数据通常是非连续存储的，这种方式会引发大量随机 I/O，尤其在传统机械硬盘上表现更明显。尽管位图扫描在一定程度上可以缓解这一问题，但仍无法完全避免堆表访问的开销。

仅索引扫描（index-only scan）是一种可以完全通过索引返回结果的扫描方式，无需访问堆表表，从而显著提高查询性能。

:::note 说明
从 v2.0.0 起，Apache Cloudberry（基于 ORCA 执行器）在 AO 表和 PAX 表上支持仅索引扫描，有效提升这些表在重读场景下的查询性能。
:::

### 使用条件

要启用仅索引扫描，需同时满足以下两个基本条件：

- 使用支持该功能的索引类型：

    - B-tree 索引始终支持。
    - GiST 和 SP-GiST 索引在部分操作符类下支持。
    - GIN 索引不支持（仅存储部分字段信息）。
    - 其他索引类型通常不支持。

- 查询中引用的列全部包含在索引中：

    可使用仅索引扫描的查询示例：

    ```sql
    SELECT x, y FROM tab WHERE x = 'key';
    SELECT x FROM tab WHERE x = 'key' AND y < 42;
    ```

    无法使用仅索引扫描的查询示例：

    ```sql
    SELECT x, z FROM tab WHERE x = 'key';
    SELECT x FROM tab WHERE x = 'key' AND z < 42;
    ```

### 额外注意：MVCC 可见性检查

即便满足以上两个条件，系统仍需确认每条记录是否对当前事务“可见”，即符合多版本并发控制（MVCC）规则。由于可见性信息并不存储在索引中，通常仍需访问堆表进行判断。

为减少堆表访问带来的性能开销，Apache Cloudberry 提供了可见性映射（visibility map）机制：

- 当某个堆表数据页内的所有元组对所有事务均可见时，该数据页会被标记为“全可见”。
- 查询执行时，会首先查阅可见性映射。
- 若数据页为“全可见”，则跳过堆表访问，直接返回结果。
- 否则仍需访问堆表确认可见性。

可见性映射占用空间较小，通常可以完全缓存在内存中，大大降低了查询中的随机 I/O 成本。因此，仅当堆表中大多数页面为“全可见”时，仅索引扫描才能真正带来性能提升。

### 覆盖索引的作用

为了更好地支持仅索引扫描，可以显式创建覆盖索引（covering index），即将查询所涉及的所有列都包含在索引中。Apache Cloudberry 支持使用 `INCLUDE` 子句将非过滤条件列一并添加进索引中：

示例：

```sql
-- 传统索引，仅加速 WHERE 子句，不支持仅索引扫描
CREATE INDEX tab_x ON tab(x);

-- 覆盖索引，包含返回列 y，支持仅索引扫描
CREATE INDEX tab_x_y ON tab(x) INCLUDE (y);

-- 查询示例
SELECT y FROM tab WHERE x = 'key';
```

通过 `INCLUDE` 添加的列不会参与索引匹配，仅用于覆盖查询返回字段，因此：

- 不需要支持索引操作；
- 在唯一索引中不参与唯一性判断。

例如：

```sql
CREATE UNIQUE INDEX tab_x_y ON tab(x) INCLUDE (y);
-- 唯一性仍仅约束列 x，不包括列 y
```

限制与注意事项：

- 索引元组大小有限：如果包含宽字段，可能导致索引体积过大，引发插入失败。
- 添加非键列会增加索引大小，可能影响读取或更新性能。
- 仅当表更新频率较低（大多数数据页为“全可见”）时，覆盖索引才有助于触发仅索引扫描。
- 当前不支持将表达式作为 `INCLUDE` 列。
- 目前仅 B-tree 和 GiST 索引类型支持 `INCLUDE` 子句。

:::note 说明
从 v2.0.0 起，Apache Cloudberry（使用 ORCA 执行器）支持在 AO 表和 PAX 表上使用 PostgreSQL 风格的 `INCLUDE` 子句，支持创建覆盖索引（cover index）。
:::

从 v2.0.0 起，GPORCA 执行器在选择仅索引扫描路径时，会综合考虑索引的宽度和包含列的数量。如果多个索引都能满足查询的谓词和返回列要求，执行器会优先选择字段更少、结构更紧凑的索引，以降低 I/O 成本。

示例：

```sql
CREATE TABLE t1 (c1 int, c2 int, c3 int, c4 int, c5 int);

CREATE INDEX idx_large ON t1 USING btree(c1) INCLUDE (c2, c3, c4, c5);
CREATE INDEX idx_c1 ON t1 USING btree(c1);

EXPLAIN ANALYZE SELECT c1 FROM t1 WHERE c1 = 4;
```

在上述查询中，虽然两个索引都能支持该查询，但执行器会优先选择 `idx_c1`，因为它更小、更高效。

为此，建议在使用 `INCLUDE` 索引时注意：

- `INCLUDE` 列的数量和字段宽度会直接影响索引扫描的性能；
- 避免为高频轻量查询创建包含过多列的“宽索引”；
- 可以根据不同查询场景分别创建“宽索引”和“窄索引”，由执行器根据成本自动选择合适路径。

### 动态仅索引扫描

动态仅索引扫描（dynamic index-only scan）是 Apache Cloudberry（使用 ORCA 执行器）在分区表查询中采用的一种高效扫描策略。该方法融合了两项技术：

- **仅索引扫描（Index Only Scan）**：查询过程中只访问索引，而不访问堆表表，前提是查询字段全部包含在索引中，且对应数据页标记为“全可见”（如经过 `VACUUM` 后标记为 `all-visible`）。
- **动态扫描（Dynamic Scan）**：在执行阶段根据查询条件动态选择所需的分区，避免不必要的分区访问（即分区裁剪）。

动态仅索引扫描的核心思想是：结合仅索引扫描和分区裁剪，仅对查询相关的分区进行扫描，同时跳过堆表表访问，从而提升查询效率。

适用场景包括：

- 查询对象为分区表；
- 查询只访问索引中包含的字段（即使用覆盖索引）；
- 表经过 `VACUUM`，相关数据页已标记为全可见；
- 表为“宽表”，但索引结构紧凑（仅包含必要字段）。

使用动态仅索引扫描可以显著提升性能，减少 I/O 消耗，自动适配分区结构，且对用户完全透明。

该功能默认开启。如果已关闭，可通过以下方式启用：

```sql
SET optimizer_enable_dynamicindexonlyscan = on;
```

示例：

```sql
CREATE TABLE pt(a int, b text, c text) 
PARTITION BY RANGE(a) (START (0) END (100) EVERY (20));

CREATE INDEX idx ON pt(a);  -- 覆盖索引，仅包含列 a

-- 插入大量数据并清理
INSERT INTO pt ...
VACUUM pt;

-- 查询仅涉及列 a，且可以裁剪分区
SELECT a FROM pt WHERE a < 42;
```

## 倒序索引扫描

在某些包含 `ORDER BY ... DESC` 的查询中，如果可以利用 B-tree 索引的倒序扫描路径，GPORCA 执行器会选择使用倒序索引扫描（Backward IndexScan），从而避免额外的排序操作。

例如：

```sql
CREATE TABLE foo (a int, b int, c int) DISTRIBUTED BY (a);
CREATE INDEX foo_b ON foo(b);
INSERT INTO foo SELECT i, i, i FROM generate_series(1,10000) i;
ANALYZE foo;

EXPLAIN SELECT * FROM foo ORDER BY b DESC LIMIT 1;
```

在这个查询中，虽然索引 `foo_b` 的默认排序为升序，但查询要求降序排序，执行器会自动选择使用 Backward IndexScan 按降序扫描索引，从而省略 `Sort` 节点：

```sql
Limit
  ->  Gather Motion 3:1
        Merge Key: b
        ->  Limit
              ->  Index Scan Backward using foo_b on foo
```

该优化适用于普通索引扫描（`IndexScan`）和仅索引扫描（`IndexOnlyScan`）两种类型。

此优化生效的前提条件包括：

- 使用的是 B-tree 索引；
- 查询包含与索引列一致的 `ORDER BY` 子句；
- 查询排序方向与索引默认方向相反；
- 如果涉及 `NULLS FIRST` 或 `NULLS LAST`，其排序方式也必须匹配。

Backward IndexScan 可以显著减少排序操作的资源开销，尤其适用于分页查询或 top-N 查询。

## 检查索引使用情况

Apache Cloudberry 的索引无需用户手动维护或优化，但你可以通过检查实际查询的执行计划来评估索引是否有效。使用 `EXPLAIN` 命令可以查看数据库执行查询时是否使用了索引。

查询计划展示了数据库执行查询的过程（称为 *计划节点*），并为每个步骤提供成本估算。要检查索引是否被使用，可在 `EXPLAIN` 输出中查找以下计划节点：

- **Index Scan**：直接通过索引扫描获取数据。
- **Bitmap Index Scan**：根据查询条件构建位图，并进行位图扫描。
- **Bitmap Heap Scan**：根据位图定位堆表中对应的行。
- **BitmapAnd** / **BitmapOr**：将多个位图合并，用于支持复合条件的查询。

以下是评估和优化索引使用的一些建议：

- 每次创建或修改索引后，务必运行 `ANALYZE`。该命令用于更新统计信息，执行器会据此估算结果行数，从而选择更合适的执行计划。

- 使用真实数据进行测试。测试数据只能反映测试场景，不能代表生产环境的实际分布和行为。

- 避免使用过小的数据集，因为其行为可能与大数据量场景差异较大，测试结果可能不具参考价值。

- 创建测试数据时需注意数据分布问题。例如，随机分布，数据倾斜都会影响统计信息的准确性。

- 可以通过调整 GUC 参数强制优化器使用特定计划，从而测试索引效果。例如：

    ```sql
    SET enable_seqscan = off;
    SET enable_nestloop = off;
    ```

    关闭顺序扫描和嵌套循环后，可以迫使系统尝试使用索引路径。对有无索引的查询分别执行 `EXPLAIN ANALYZE`，对比两者的实际执行时间和执行计划，评估索引是否带来性能收益。
