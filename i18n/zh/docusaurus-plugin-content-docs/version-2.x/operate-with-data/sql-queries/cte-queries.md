---
title: 公共表表达式（Common Table Expressions）
---

# WITH 查询（公共表表达式）

`WITH` 子句提供了一种在主查询中编写辅助语句的方式。这些语句通常被称为公共表表达式（Common Table Expressions，简称 CTE），可以理解为只在当前查询中临时存在的表。

:::info 信息
在 Apache Cloudberry 中使用 `WITH` 子句时有以下限制：

- 如果 `WITH` 子句出现在一个 `SELECT` 命令中，则该子句中最多只能包含一个用于修改表数据的命令（如 `INSERT`、`UPDATE` 或 `DELETE`）。
- 如果 `WITH` 子句出现在一个修改数据的命令中（如 `INSERT`、`UPDATE` 或 `DELETE`），那么该子句只能包含 `SELECT` 命令，不能再嵌套其他数据修改语句。
:::

在 Apache Cloudberry 中，`WITH` 子句默认启用了 `RECURSIVE` 关键字。可以通过将服务器配置参数 `gp_recursive_cte` 设为 `false` 来禁用递归功能。

## WITH 子句中的 SELECT 查询

CTE 的常见用途之一是将复杂查询拆分为多个更简单的部分。本节示例展示了如何在 `SELECT` 命令中使用 `WITH` 子句。这些示例中的 `WITH` 子句也可以用于 `INSERT`、`UPDATE` 或 `DELETE` 语句中。

`WITH` 子句中的 `SELECT` 查询在整个主查询执行过程中只会执行一次，即使在主查询或同级的其他 `WITH` 子句中被引用多次。因此，可以将重复使用的复杂计算逻辑放在 `WITH` 子句中，从而避免重复计算。同时也可以避免副作用函数被多次执行。但需要注意的是，相比普通子查询，查询优化器不太容易将主查询的筛选条件下推到 `WITH` 子句中。因此，`WITH` 查询通常会按照写法完整执行，即使主查询可能会在之后丢弃部分行。但如果引用该查询的上下文只需要部分结果，查询可能会提前终止。

下面这个示例查询展示了如何统计每个产品在销售额最高的地区的销售情况：

```sql
WITH regional_sales AS (
     SELECT region, SUM(amount) AS total_sales
     FROM orders
     GROUP BY region
  ), top_regions AS (
     SELECT region
     FROM regional_sales
     WHERE total_sales > (SELECT SUM(total_sales)/10 FROM regional_sales)
  )
SELECT region,
    product,
    SUM(quantity) AS product_units,
    SUM(amount) AS product_sales
FROM orders
WHERE region IN (SELECT region FROM top_regions)
GROUP BY region, product;
```

上述查询通过 `WITH` 子句定义了两个临时结果集：`regional_sales` 和 `top_regions`。其中 `top_regions` 使用了 `regional_sales` 的结果，而主查询又使用了 `top_regions`。虽然这个查询也可以不用 `WITH` 来写，但那样就需要使用两层嵌套的子查询。

如果指定了可选的 `RECURSIVE` 关键字，`WITH` 子句可以实现标准 SQL 中无法实现的递归操作。启用递归后，一个 `WITH` 查询可以引用自己的输出。下面这个简单的例子用于计算 1 到 100 的整数之和：

```sql
WITH RECURSIVE t(n) AS (
    VALUES (1)
  UNION ALL
    SELECT n+1 FROM t WHERE n < 100
)
SELECT sum(n) FROM t;
```

递归 `WITH` 查询的一般结构是：一个**非递归部分**，后接一个 `UNION`（或 `UNION ALL`），再接一个**递归部分**，其中只有递归部分可以引用自身的输出。

```sql
<non_recursive_term> UNION [ ALL ] <recursive_term>
```

递归 `WITH` 查询中如果包含 `UNION [ ALL ]`，其执行过程如下：

- 首先执行非递归部分。对于 `UNION`（但不是 `UNION ALL`），会去重。将剩余的所有行加入递归查询的结果中，并放入一个临时的*工作表*中。
- 只要工作表非空，重复以下步骤：
    1. 执行递归部分，将当前工作表的内容作为递归自引用的输入。对于 `UNION`（但不是 `UNION ALL`），会去重并排除所有重复于之前结果的行。将剩余行加入递归查询的结果，并放入一个临时的*中间表*中。
    2. 用中间表的内容替换工作表的内容，并清空中间表。

    :::note 注意
    虽然语法上使用了 `RECURSIVE` 实现递归查询，但 Apache Cloudberry 实际上使用迭代的方式来执行这些查询。
    :::

在上面示例中，每一步的工作表只包含一行，值依次从 1 到 100。第 100 步时，由于 `WHERE` 子句的条件不再满足，不再产生输出，查询终止。

递归 `WITH` 查询通常用于处理树状或层级结构的数据。例如，下面的查询用于找出某个产品的所有直接和间接组成部分，前提是已知一个只包含直接从属关系的表：

```sql
WITH RECURSIVE included_parts(sub_part, part, quantity) AS (
    SELECT sub_part, part, quantity FROM parts WHERE part = 'our_product'
  UNION ALL
    SELECT p.sub_part, p.part, p.quantity * pr.quantity
    FROM included_parts pr, parts p
    WHERE p.part = pr.sub_part
)
SELECT sub_part, SUM(quantity) as total_quantity
FROM included_parts
GROUP BY sub_part;
```

在使用递归 `WITH` 查询时，必须确保递归部分最终会返回空结果；否则查询将无限循环。

在某些情况下，可以使用 `UNION` 替代 `UNION ALL` 来避免无限循环，因为 `UNION` 会去除重复的结果行，可能会让递归部分最终没有新行产生，从而结束循环。但并非所有循环都涉及完全重复的行。有时只需要判断部分字段是否重复，就能判断是否进入了循环。标准做法是记录已访问的路径，例如构建一个包含已访问节点的数组。

下面是一个基于 `graph` 表执行链接关系遍历的查询示例，表中使用 `link` 字段表示连接关系：

```sql
WITH RECURSIVE search_graph(id, link, data, depth) AS (
    SELECT g.id, g.link, g.data, 1
    FROM graph g
  UNION ALL
    SELECT g.id, g.link, g.data, sg.depth + 1
    FROM graph g, search_graph sg
    WHERE g.id = sg.link
)
SELECT * FROM search_graph;
```

如果 `link` 字段中存在循环，该查询将进入死循环。即使将 `UNION ALL` 改为 `UNION`，因为查询还依赖 `depth` 输出字段，也不能完全避免循环。此时需要在遍历路径中判断是否已访问过某行。改进后的查询将在原查询基础上添加两个字段：`path` 和 `cycle`，用于识别和检测路径中的重复访问。

```sql
WITH RECURSIVE search_graph(id, link, data, depth, path, cycle) AS (
    SELECT g.id, g.link, g.data, 1,
      ARRAY[g.id],
      false
    FROM graph g
  UNION ALL
    SELECT g.id, g.link, g.data, sg.depth + 1,
      path || g.id,
      g.id = ANY(path)
    FROM graph g, search_graph sg
    WHERE g.id = sg.link AND NOT cycle
)
SELECT * FROM search_graph;
```

除了用于检测循环，数组值本身也很有用，它表示达到某一行所经过的“路径”。

在需要检查多个字段才能识别循环的场景中，可以使用行数组（array of rows）。例如，如果需要同时比较字段 `f1` 和 `f2`：

```sql
WITH RECURSIVE search_graph(id, link, data, depth, path, cycle) AS (
    SELECT g.id, g.link, g.data, 1,
      ARRAY[ROW(g.f1, g.f2)],
      false
    FROM graph g
  UNION ALL
    SELECT g.id, g.link, g.data, sg.depth + 1,
      path || ROW(g.f1, g.f2),
      ROW(g.f1, g.f2) = ANY(path)
    FROM graph g, search_graph sg
    WHERE g.id = sg.link AND NOT cycle
)
SELECT * FROM search_graph;
```

**提示：** 如果只需要检查一个字段是否出现过，可以省略 `ROW()` 语法，使用普通数组即可，不需要构造复合类型数组，效率更高。

**提示：** 递归查询默认按广度优先（breadth-first）顺序生成结果。如果希望按深度优先（depth-first）顺序展示结果，可以通过 `ORDER BY` 子句对外层查询使用由“路径”构造的列进行排序。

当你不确定递归查询是否会进入死循环时，一个常用的调试技巧是为主查询添加 `LIMIT` 限制。例如，以下查询如果没有 `LIMIT` 子句，将会无限循环：

```sql
WITH RECURSIVE t(n) AS (
    SELECT 1
  UNION ALL
    SELECT n+1 FROM t
)
SELECT n FROM t LIMIT 100;
```

这种技巧之所以有效，是因为 Apache Cloudberry 只会执行主查询实际需要的行数。但是**不推荐在生产环境中使用这种方式来控制递归行为**，因为其他系统的执行策略可能不同。而且，如果外层查询对递归结果进行排序或与其他表关联，通常仍会尝试获取全部递归结果，此时 `LIMIT` 就无法限制执行范围。

`WITH` 查询的一个有用特性是：即使在父查询或同级的其他 `WITH` 查询中被多次引用，它通常只会在整个父查询执行期间评估一次。因此，可以将多处使用的高开销计算放在 `WITH` 查询中，避免重复计算。另一个常见用途是避免具有副作用的函数被重复调用。但另一方面，优化器无法将父查询中的筛选条件下推到一个被多次引用的 `WITH` 查询中，因为这种优化可能影响所有引用，而非某一特定引用。Apache Cloudberry 会严格按照 `WITH` 查询的定义执行它，不会因为父查询后续可能丢弃部分行而提前剔除。

（不过，如前所述，如果引用该 `WITH` 查询的上下文只需要部分结果，系统可能会提前结束查询的执行。）

如果 `WITH` 查询是非递归且无副作用的（也就是说，它是一个不包含不稳定函数的 `SELECT`），那么系统可以将其合并到父查询中，实现两个查询层级的联合优化。默认情况下，如果父查询只引用了一次该 `WITH` 查询，系统会自动合并；如果被引用多次，则不会合并。

可以通过显式指定 `MATERIALIZED` 强制系统单独执行 `WITH` 查询，也可以指定 `NOT MATERIALIZED` 强制合并到父查询中。选择 `NOT MATERIALIZED` 可能会导致对 `WITH` 查询重复计算，但当每次使用只需要 `WITH` 查询结果的一小部分时，整体仍可能获得更好的性能。

下面是相关规则的一个简单示例：

```sql
WITH w AS (
    SELECT * FROM big_table
)
SELECT * FROM w WHERE key = 123;
```

此时，`WITH` 查询会被合并，其执行计划等效于：

```sql
SELECT * FROM big_table WHERE key = 123;
```

如果 `key` 上有索引，Apache Cloudberry 会使用该索引快速定位满足条件的行。

而在以下查询中：

```sql
WITH w AS (
    SELECT * FROM big_table
)
SELECT * FROM w AS w1 JOIN w AS w2 ON w1.key = w2.ref
WHERE w2.key = 123;
```

由于 `w` 被多次引用，系统会对 `WITH` 查询进行物化（`MATERIALIZED`），即创建 `big_table` 的一个临时副本，然后再进行自连接，这将无法利用索引，性能较差。

此时建议使用：

```sql
WITH w AS NOT MATERIALIZED (
    SELECT * FROM big_table
)
SELECT * FROM w AS w1 JOIN w AS w2 ON w1.key = w2.ref
WHERE w2.key = 123;
```

这样父查询的筛选条件就可以直接作用在 `big_table` 上，提高查询效率。

但在某些场景下，不建议使用 `NOT MATERIALIZED`。例如：

```sql
WITH w AS (
    SELECT key, very_expensive_function(val) as f FROM some_table
)
SELECT * FROM w AS w1 JOIN w AS w2 ON w1.f = w2.f;
```

在这个查询中，`WITH` 查询的物化行为可以确保 `very_expensive_function` 对每一行只调用一次，而不是在连接中重复调用两次。

## WITH 子句中的数据修改语句

在 `SELECT` 查询中，可以在 `WITH` 子句中使用数据修改语句，如 `INSERT`、`UPDATE` 或 `DELETE`。这样可以在一个查询中同时完成多个不同的操作。

`WITH` 子句中的数据修改语句只会执行一次，并且总是完整执行，无论主查询是否读取了其输出（甚至是否读取都无所谓）。这和 `WITH` 中使用 `SELECT` 时的行为不同：对于 `SELECT`，只有在主查询需要其输出时才会继续执行。

下面这个简单的 CTE 查询会从 `products` 表中删除部分行。`WITH` 子句中的 `DELETE` 会删除满足条件的记录，并通过 `RETURNING` 子句返回被删除的内容：

```sql
WITH deleted_rows AS (
    DELETE FROM products
    WHERE
        "date" >= '2010-10-01' AND
        "date" < '2010-11-01'
    RETURNING *
)
SELECT * FROM deleted_rows;
```

在 `WITH` 子句中使用数据修改语句时，必须包含 `RETURNING` 子句，如上例所示。形成临时表的是 `RETURNING` 子句的输出，而**不是**被修改的目标表。如果数据修改语句没有 `RETURNING` 子句，就不会生成临时表，也无法在后续查询中引用该语句。不过 Apache Cloudberry 仍然会执行这个语句。

如果启用了可选的 `RECURSIVE` 关键字，`WITH` 子句中的数据修改语句不允许出现递归自引用。但在某些情况下，可以通过引用递归 `WITH` 的输出间接实现目的。比如，下面的查询会删除某个产品的所有直接和间接组成部分：

```sql
WITH RECURSIVE included_parts(sub_part, part) AS (
    SELECT sub_part, part FROM parts WHERE part = 'our_product'
  UNION ALL
    SELECT p.sub_part, p.part
    FROM included_parts pr, parts p
    WHERE p.part = pr.sub_part
  )
DELETE FROM parts
  WHERE part IN (SELECT part FROM included_parts);
```

`WITH` 子句中的所有子语句会和主查询并发执行。因此，当在 `WITH` 中使用数据修改语句时，实际的执行顺序是不可预测的。不过，所有语句都运行在同一个*快照*中，对目标表的修改在执行过程中是不可见的。这种机制降低了执行顺序不确定性所带来的影响，也意味着子语句之间以及与主查询之间的唯一通信方式是 `RETURNING` 数据。

例如，在下面这个查询中，外层的 `SELECT` 返回的是 `UPDATE` 执行前的原始价格：

```sql
WITH t AS (
    UPDATE products SET price = price * 1.05
    RETURNING *
)
SELECT * FROM products;
```

在同一个语句中对同一行执行两次更新是不被支持的。这种语句的执行结果不可预测。虽然最终只会有一个修改生效，但难以预判（有时根本无法确定）到底是哪一个修改被应用。

作为 `WITH` 子句中数据修改语句目标的表，不能包含以下规则：

- 条件规则（conditional rule）
- `ALSO` 规则
- 扩展为多个语句的 `INSTEAD` 规则

## 注意事项

在构建 `WITH` 查询时，请注意以下几点：

- `SELECT FOR UPDATE` 不能被内联。
- Apache Cloudberry 只有在显式指定 `NOT MATERIALIZED` 时才会内联被多次引用的 CTE。
- 如果 CTE 中包含外层自引用，则不能进行内联。
- 如果 CTE 中包含不稳定函数（volatile function），也不会进行内联。
- 在子查询或 CTE 中指定 `ORDER BY` 并不会强制整个查询结果按照该顺序输出。
- Apache Cloudberry 始终会将 CTE 子句物化。这种行为带来以下影响：
    - 原本只需要访问少量数据的查询，可能会读取整张表，甚至产生临时文件。
    - CTE 更像是一个只读的临时表而不是动态视图，因此不允许在其中使用 `UPDATE` 或 `DELETE FROM` 语句。
- 尽管内联通常能显著提升性能，但在某些边界场景下反而可能导致效率下降，例如：一个复杂表达式被内联到多个位置时。
- GPORCA 查询优化器不支持 `[NOT] MATERIALIZED` 语法。
