---
title: 创建和管理分区表
---

# 创建和管理分区表

本文档概述了如何在 Apache Cloudberry 中使用推荐的语法创建和维护分区表。

有关分区表的更多信息，请参阅[关于表分区](./about-table-partitioning.md)。

## 创建分区表

在创建分区表之前，您应该：

- 选择分区方法：范围、列表或哈希。
- 选择分区键的列。
- 确定适当的分区数量和级别（如果使用多级分区）。
- 创建分区表。
- 创建单独的分区。

Apache Cloudberry 会自动创建描述分区边界条件的约束。任何插入到根分区表中的数据，只要符合某个分区的约束，就会被定向到该分区。

对于子分区，如有必要，可以使用相同的分区键列（例如，按月分区，然后按天子分区）。考虑直接按最细粒度级别进行分区（例如，365 个每日分区，而不是按年、月、天），因为扁平分区设计通常运行更快，尽管多级设计可以减少查询规划时间。

### 定义日期范围分区表

日期范围分区表使用 `date` 或 `timestamp` 列作为分区键。您可以为范围分区表指定多个分区键列。

示例：为一家冰淇淋公司创建一个 `measurement` 表，按 `logdate` 列按月分区，以保留两年的数据并每月删除最旧月份的数据。

1. 创建根分区表：

    ```sql
    CREATE TABLE measurement (
        city_id         int not null,
        logdate         date not null,
        peaktemp        int,
        unitsales       int
    )
    DISTRIBUTED BY (city_id)
    PARTITION BY RANGE (logdate);
    ```

2. 创建分区（例如，每个月）：

    ```sql
    CREATE TABLE measurement_y2021m01 PARTITION OF measurement
    FOR VALUES FROM ('2021-01-01') TO ('2021-02-01');

    CREATE TABLE measurement_y2021m02 PARTITION OF measurement
    FOR VALUES FROM ('2021-02-01') TO ('2021-03-01');
    -- ... 其他月份以此类推 ...

    CREATE TABLE measurement_y2022m12 PARTITION OF measurement
    FOR VALUES FROM ('2022-12-01') TO ('2023-01-01') -- 注意：原文此处可能为笔误，应为 '2023-01-01'
    TABLESPACE fasttablespace;

    CREATE TABLE measurement_y2023m01 PARTITION OF measurement
    FOR VALUES FROM ('2023-01-01') TO ('2023-02-01')
    WITH (parallel_workers = 4)
    TABLESPACE fasttablespace;
    ```

    范围上限被视为独占。如果插入到父表中的数据没有映射到现有分区，Apache Cloudberry 将返回错误（除非存在默认分区）。

### 定义数字范围分区表

此类分区表使用数字类型的列作为分区键。支持多个分区键列。

示例：创建按 `year` 分区的 `numpart` 表。

1. 创建根分区表：

    ```sql
    CREATE TABLE numpart (id int, rank int, year int, color char(1), count int)
    DISTRIBUTED BY (id)
    PARTITION BY RANGE (year);
    ```

2. 创建分区：

    ```sql
    CREATE TABLE numpart_y2019 PARTITION OF numpart FOR VALUES FROM (2019) TO (2020);
    CREATE TABLE numpart_y2020 PARTITION OF numpart FOR VALUES FROM (2020) TO (2021);
    CREATE TABLE numpart_y2021 PARTITION OF numpart FOR VALUES FROM (2021) TO (2022);
    CREATE TABLE numpart_y2022 PARTITION OF numpart FOR VALUES FROM (2022) TO (2023);
    ```

### 定义列表分区表

列表分区表可以使用任何允许相等比较的数据类型列作为其分区键。列表分区只允许单个列作为分区键。您必须为每个列表值声明一个分区规范。

示例：创建按 `color` 分区的 `listpart` 表。

1. 创建根分区表：

    ```sql
    CREATE TABLE listpart (id int, rank int, year int, color char(1), count int)
    DISTRIBUTED BY (id)
    PARTITION BY LIST (color);
    ```

2. 创建分区：

    ```sql
    CREATE TABLE listpart_red PARTITION OF listpart FOR VALUES IN ('r');
    CREATE TABLE listpart_green PARTITION OF listpart FOR VALUES IN ('g');
    CREATE TABLE listpart_blue PARTITION OF listpart FOR VALUES IN ('b');
    CREATE TABLE listpart_other PARTITION OF listpart DEFAULT;
    ```

    `DEFAULT` 关键字会创建一个默认分区，用于捕获不匹配其他分区的任何数据。

### 定义哈希分区表

哈希分区表使用单个可哈希列作为其分区键。您必须为每个模数/余数组合声明一个分区规范。

示例：创建按列 `c` 的哈希值分区的 `hpt` 表。

1. 创建根分区表：

    ```sql
    CREATE TABLE hpt (a int, b int, c text) PARTITION BY HASH(c);
    ```

2. 创建分区：

    ```sql
    CREATE TABLE hpt_p1 PARTITION OF hpt FOR VALUES WITH (MODULUS 3, REMAINDER 0);
    CREATE TABLE hpt_p2 PARTITION OF hpt FOR VALUES WITH (MODULUS 3, REMAINDER 1);
    CREATE TABLE hpt_p3 PARTITION OF hpt FOR VALUES WITH (MODULUS 3, REMAINDER 2);
    ```

### 定义多级分区表

您可以通过对现有分区进行子分区来创建多级分区层次结构。

示例：为 `msales` 创建一个两级分区，首先按 `year`（范围）分区，然后按 `region`（列表）子分区。

1. 创建根（第一级）分区表：

    ```sql
    CREATE TABLE msales (trans_id int, year int, amount decimal(9,2), region text)
    DISTRIBUTED BY (trans_id)
    PARTITION BY RANGE (year);
    ```

2. 创建年份分区（第二级），这些分区本身按区域分区：

    ```sql
    CREATE TABLE msales_2021 PARTITION OF msales FOR VALUES FROM (2021) TO (2022)
    PARTITION BY LIST (region);
    CREATE TABLE msales_2022 PARTITION OF msales FOR VALUES FROM (2022) TO (2023)
    PARTITION BY LIST (region);
    CREATE TABLE msales_2023 PARTITION OF msales FOR VALUES FROM (2023) TO (2024)
    PARTITION BY LIST (region);
    ```

3. 创建区域子分区（叶分区）：

    ```sql
    CREATE TABLE msales_2021_usa PARTITION OF msales_2021 FOR VALUES IN ('usa');
    CREATE TABLE msales_2021_asia PARTITION OF msales_2021 FOR VALUES IN ('asia');
    CREATE TABLE msales_2021_europe PARTITION OF msales_2021 FOR VALUES IN ('europe');
    -- ... msales_2022 和 msales_2023 类似 ...
    ```

## 现有表的分区

表只能在创建时进行分区。要对现有表进行分区，请按照以下步骤操作：

1. 创建一个具有所需结构的新分区表。
2. 将数据从原始表加载到新的分区表。
3. 删除原始表。
4. 将新的分区表重命名为原始表的名称。
5. 重新授予任何必要的权限。

```sql
-- 假设 'msales' 是一个现有的非分区表
-- 1. 创建新的分区表 (msales2)
CREATE TABLE msales2 (LIKE msales) PARTITION BY RANGE (year); -- 在此处定义 msales2 的分区
-- (示例：CREATE TABLE msales2_y2021 PARTITION OF msales2 FOR VALUES FROM (2021) TO (2022); 等)

-- 2. 加载数据
INSERT INTO msales2 SELECT * FROM msales;

-- 3. 删除旧表
DROP TABLE msales;

-- 4. 重命名新表
ALTER TABLE msales2 RENAME TO msales;

-- 5. 重新授予权限
GRANT ALL PRIVILEGES ON msales TO admin;
GRANT SELECT ON msales TO guest;
```

注意：当从一个分区表创建新表时，`LIKE` 子句不会复制分区结构。

## 将数据加载到分区表

最初，顶层根分区表是空的。当您将数据插入到根表时，Apache Cloudberry 会将数据路由到适当的底层叶分区。在多级设计中，只有最底层的叶分区才包含数据。

如果行无法映射到叶分区，Apache Cloudberry 会拒绝这些行，并且加载会失败，除非定义了一个 `DEFAULT` 分区来捕获此类行。

使用 `DEFAULT` 分区时请务必小心：如果它们包含数据，查询优化器将始终扫描它们，这可能会减慢整体扫描时间。

使用 `COPY` 或 `INSERT` 将数据加载到父表会自动将数据路由到正确的叶分区。最佳实践：对于加载大量数据，创建一个中间暂存表，将数据加载到其中，然后将其附加到您的分区层次结构中。

## 验证分区策略

使用 `EXPLAIN` 命令检查查询计划，并验证优化器是否仅扫描相关分区。

示例：对于按 `year` 分区并按 `region` 子分区的表 `msales`：

```sql
EXPLAIN SELECT * FROM msales WHERE year='2021' AND region='usa';
```

查询计划应仅显示对 `msales_2021_usa`（相关叶分区）的扫描。对父表或默认分区（如果有）的扫描应返回 0-1 行。请确保没有扫描不必要的分区。

### 故障排除选择性分区扫描

可能阻止选择性扫描的限制包括：

- 查询优化器仅当查询包含使用不可变运算符（如 `=`、`<`、`<=`、`>`、`>=` 和 `<>`) 对表进行的直接简单限制时，才能选择性扫描。
- 选择性扫描识别查询中的 `STABLE` 和 `IMMUTABLE` 函数，但不识别 `VOLATILE` 函数。例如，`WHERE date > CURRENT_DATE` 允许选择性扫描，但 `WHERE time > TIMEOFDAY()` 不允许。

## 查看您的分区设计

分区信息存储在系统目录中，例如 `pg_partitioned_table` 以及 `pg_class` 中的附加字段（`relispartition`、`relpartbound`）。

使用这些函数获取有关分区表的信息：

- `pg_partition_tree(regclass)`：列出给定分区表/索引的分区层次结构中的表/索引信息。
- `pg_partition_ancestors(regclass)`：列出给定分区的祖先关系，包括其自身。
- `pg_partition_root(regclass)`：返回给定关系的层次结构的顶层父级。

示例：显示 `msales` 的分区结构：

```sql
SELECT * FROM pg_partition_tree('msales');
```

## 关于分区裁剪

分区裁剪是一种查询优化技术，用于提高分区表的性能。它由服务器配置参数 `enable_partition_pruning` 控制，该参数默认为 `on`。

规划器/优化器会检查分区定义，以证明某个分区不需要扫描，因为它不包含满足查询 `WHERE` 子句条件的行。如果得到证实，该分区将从查询计划中排除（裁剪）。

裁剪由分区键隐式定义的约束驱动，而不是由键列上是否存在索引驱动。

分区裁剪可能发生在：

- **查询规划期间**：针对已知值。
- **查询执行期间**：当子句包含在规划时不知道其值的表达式时（例如，`PREPARE` 中的参数、子查询结果、参数化嵌套循环连接值）很有用。

    - **计划初始化期间**：针对在执行初始化阶段已知的参数值。被裁剪的分区不会出现在 `EXPLAIN`/`EXPLAIN ANALYZE` 中。`EXPLAIN` 输出中的“Subplans Removed”属性显示了在此处移除了多少个。
    - **实际执行期间**：针对仅在运行时才知道的值。这需要仔细检查 `EXPLAIN ANALYZE` 输出中的循环属性。不同分区的子计划可能具有不同的循环计数，或者如果每次都被裁剪，则显示为 (`never executed`)。

## 维护分区

分区集通常是动态的，涉及移除旧分区和添加新分区。这些任务可以通过操作分区结构几乎瞬间完成。对顶层根分区表或分区本身使用 `ALTER TABLE`。

### 添加分区

- **直接添加到层次结构**：

    ```sql
    CREATE TABLE msales_mfeb20 PARTITION OF msales
        FOR VALUES FROM ('2020-02-01') TO ('2020-03-01');
    ```

- **作为普通表创建然后附加（允许预加载/检查数据）**：

    ```sql
    -- 创建与父表结构相同的表
    CREATE TABLE msales_mfeb20 (LIKE msales INCLUDING DEFAULTS INCLUDING CONSTRAINTS);

    -- 添加与预期分区边界匹配的约束
    ALTER TABLE msales_mfeb20 ADD CONSTRAINT y2020m02
    CHECK ( logdate >= DATE '2020-02-01' AND logdate < DATE '2020-03-01' );

    -- 将数据加载或执行其他准备工作到 msales_mfeb20 中
    -- ...

    -- 附加到分区层次结构
    ALTER TABLE msales ATTACH PARTITION msales_mfeb20
    FOR VALUES FROM ('2020-02-01') TO ('2020-03-01');
    ```

    - `ATTACH PARTITION` 需要在分区表上获得 `SHARE UPDATE EXCLUSIVE` 锁。
    - 在要附加的表上创建与分区边界匹配的 `CHECK` 约束（如上所示）可以使系统跳过验证扫描。在 `ATTACH PARTITION` 完成后，删除冗余的 `CHECK` 约束。
    - 如果分区表有 `DEFAULT` 分区，请考虑在 `DEFAULT` 分区上创建 `CHECK` 约束，排除要附加分区的数据。这避免了扫描 `DEFAULT` 分区以验证新分区中没有记录。

### 索引分区表

在分区表的键列上创建索引时，会自动为每个现有分区以及之后创建或附加的任何分区创建匹配的索引。分区表上的索引是“虚拟”的；实际数据存储在各个分区的子索引中。

为避免在索引大型层次结构时出现长时间锁定，可以采用以下方法：

- 仅在父表上创建无效索引：

    ```sql
    CREATE INDEX measurement_usls_idx ON ONLY measurement (unitsales);
    ```

- 在各个分区上创建索引：

    ```sql
    CREATE INDEX measurement_usls_202102_idx ON measurement_y2021m02 (unitsales);
    -- ... 对其他分区重复此操作 ...
    ```

- 将每个分区的索引附加到父索引：

    ```sql
    ALTER INDEX measurement_usls_idx ATTACH PARTITION measurement_usls_202102_idx;
    -- ... 对其他分区索引重复此操作 ...
    ```

一旦所有分区的索引都已附加，父索引将自动标记为有效。

此技术也适用于 `UNIQUE` 和 `PRIMARY KEY` 约束（索引会隐式创建）。

```sql
ALTER TABLE ONLY measurement ADD UNIQUE (city_id, logdate);

ALTER TABLE measurement_y2021m02 ADD UNIQUE (city_id, logdate);
ALTER INDEX measurement_city_id_logdate_key
    ATTACH PARTITION measurement_y2021m02_city_id_logdate_key;
-- ...
```

此技术也适用于 `UNIQUE` 和 `PRIMARY KEY` 约束（索引会隐式创建）。

```sql
ALTER TABLE ONLY measurement ADD UNIQUE (city_id, logdate);

ALTER TABLE measurement_y2021m02 ADD UNIQUE (city_id, logdate);
ALTER INDEX measurement_city_id_logdate_key
    ATTACH PARTITION measurement_y2021m02_city_id_logdate_key;
-- ...
```

### 重命名分区

使用 `ALTER TABLE ... RENAME TO` 重命名分区（分区本身也是一个表）：

```sql
ALTER TABLE msales_mfeb17 RENAME TO msales_month_feb17;
```

## 添加默认分区

`DEFAULT` 分区用于捕获不符合任何其他已定义分区的数据。如果没有默认分区，此类数据将导致错误。一个分区表只能有一个默认分区。

1. 在表创建期间：

    ```sql
    CREATE TABLE msales_other PARTITION OF msales DEFAULT;
    ```

2. 表创建后（将现有表附加为默认分区）：

    ```sql
    -- 创建一个与根表模式相同的表
    CREATE TABLE msales_other (LIKE msales);

    -- 将其附加为默认分区
    ALTER TABLE msales ATTACH PARTITION msales_other DEFAULT;
    ```

### 移除分区

要删除旧数据，您可以移除分区。这会快速删除该分区中的所有记录。

```sql
DROP TABLE measurement_y2020m02;
```

此命令需要对父表进行 `ACCESS EXCLUSIVE` 锁定。

### 分离分区

将分区从层级中移除，但保留其作为独立的表。

```sql
ALTER TABLE msales DETACH PARTITION msales_2021;
```

分离一个本身包含子分区的分区，也会自动分离其子分区。这常用于滚动移除旧数据，以便在删除数据之前进行进一步操作（备份、聚合）。

### 清空分区

从特定分区中删除所有数据。

```sql
TRUNCATE ONLY msales_other; -- 仅清空指定分区
```

如果清空本身已分区的分区，其子分区也会被清空。要清空整个分区表（所有分区）：

```sql
TRUNCATE msales;
```

### 交换分区

将一个表替换现有分区。这包括分离原始分区，然后将新表作为分区附加。

- 只能在层级的最低层（包含数据的叶子分区）交换分区。
- 不能与复制表、另一个分区表或非叶子子分区交换分区。
- 待附加表中的数据必须符合目标分区的分区约束。

示例：

```sql
-- 假设 msales_2021_new 是一个结构和数据均正确的 2021 年分区表
ALTER TABLE msales DETACH PARTITION msales_2021;
ALTER TABLE msales ATTACH PARTITION msales_2021_new FOR VALUES FROM (2021) TO (2022);
```
