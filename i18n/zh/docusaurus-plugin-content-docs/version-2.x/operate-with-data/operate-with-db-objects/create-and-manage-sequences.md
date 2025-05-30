---
title: 创建和管理序列
---

# 创建和管理序列

Apache Cloudberry 中的序列对象是一种特殊的单行表，用作数字生成器。可以使用序列为插入表中的行生成唯一的整数标识符。在表的某一列中声明 `SERIAL` 类型时，系统会自动创建一个对应的序列计数器。

Apache Cloudberry 提供了用于创建、修改和删除序列的命令，也提供了内置函数来获取序列的下一个值（`nextval()`）或将序列设置为指定起始值（`setval()`）。

:::note 注意
Apache Cloudberry 不支持 PostgreSQL 的 `currval()` 和 `lastval()` 函数。
:::

序列对象的属性包括序列名称、增量值、上次生成的值、最小值和最大值等。序列还有一个特殊的布尔属性 `is_called`，它决定了 `nextval()` 是否会在返回值之前对序列进行自增。当 `is_called` 为 `true` 时，`nextval()` 会先递增再返回；当 `is_called` 为 `false` 时，`nextval()` 直接返回当前值，不执行递增。

## 创建序列

[`CREATE SEQUENCE`](../../sql-stmts/create-sequence.md) 命令用于创建并初始化一个序列，序列名必须在同一个 schema 中唯一，不能与已有的序列、表、索引或视图重名。可以指定可选的起始值。例如：

```sql
CREATE SEQUENCE myserial START 101;
```

新建序列时，系统会将其 `is_called` 属性设为 `false`。首次调用 `nextval()` 不会自增计数器，而是直接返回起始值，并将 `is_called` 设为 `true`。

## 使用序列

通过 `CREATE SEQUENCE` 创建序列后，可以查看其属性，也可以使用内置函数进行操作。

### 查看序列属性

可以直接查询序列来查看其当前属性，例如查看名为 `myserial` 的序列：

```sql
SELECT * FROM myserial;
```

### 获取下一个序列值

调用内置函数 `nextval()` 可以获取并使用序列的下一个值。下面的示例将序列 `myserial` 的下一个值插入到表 `vendors` 的第一列中：

```sql
INSERT INTO vendors VALUES (nextval('myserial'), 'acme');
```

`nextval()` 会根据序列的 `is_called` 属性判断是否需要在返回前进行自增。如果 `is_called` 为 `true`，则先自增；并且在返回前会将 `is_called` 设置为 `true`。

`nextval()` 的操作不会被事务回滚。即使执行 `nextval()` 的事务失败，获取到的值也会被视为已使用。这意味着失败的事务可能会在序列中留下未使用的空值。

:::note 注意
如果启用了镜像功能，则不能在 `UPDATE` 或 `DELETE` 语句中使用 `nextval()` 函数。
:::

### 设置序列计数器的值

可以使用 Apache Cloudberry 内置函数 `setval()` 设置序列的当前计数值。例如，以下命令将名为 `myserial` 的序列计数器设为 `201`：

```sql
SELECT setval('myserial', 201);
```

`setval()` 有两种函数签名：`setval(sequence, start_val)` 和 `setval(sequence, start_val, is_called)`。默认的 `setval(sequence, start_val)` 会将序列的 `is_called` 属性设为 `true`。

如果希望下一次调用 `nextval()` 时不自动递增序列，可以使用带第三个参数的形式，将 `is_called` 设置为 `false`：

```sql
SELECT setval('myserial', 201, false);
```

`setval()` 的执行不会被事务回滚。

### 使用 nextval() 和 setval() 时的注意事项

为了避免多个事务同时从同一序列获取值时发生阻塞，`nextval()` 获取的值不会因为事务回滚而被重用。因此，事务失败或数据库崩溃都可能导致生成的序列中出现空洞。有时即使事务没有失败，也可能出现空洞。例如，带有 `ON CONFLICT` 子句的 `INSERT` 会在判断是否存在冲突之前，就先计算要插入的元组，并执行 `nextval()`。因此，Apache Cloudberry 的序列不能保证生成连续的、不间断的数值。

同样，`setval()` 修改序列状态的操作对其他事务是立即可见的，即使当前事务最终回滚，这些更改也不会被撤销。

如果数据库集群在提交包含 `nextval()` 或 `setval()` 的事务前发生崩溃，那么这些变更可能还没有写入持久存储。此时，重启集群后，序列的状态可能是修改前的，也可能是修改后的。这种情况不会影响数据库内部对序列的正常使用，因为未提交事务的其他效果也不会可见。但如果你打算将序列值用于数据库之外的持久用途，必须确保 `nextval()` 已经提交后再使用该值。

## 修改序列

[`ALTER SEQUENCE`](../../sql-stmts/alter-sequence.md) 命令用于修改已有序列的属性。可以调整序列的起始值、最小值、最大值和增量值，也可以重启序列计数。

未在 `ALTER SEQUENCE` 中指定的参数会保持原值不变。

使用 `ALTER SEQUENCE sequence START WITH start_value` 可以设置新的起始值，但不会影响当前的 `last_value`，也不会改变 `nextval(sequence)` 返回的值。

使用 `ALTER SEQUENCE sequence RESTART` 会将 `last_value` 重置为当前的起始值，并将 `is_called` 设为 `false`，下一次调用 `nextval()` 时会返回起始值。

使用 `ALTER SEQUENCE sequence RESTART WITH restart_value` 会将 `last_value` 设置为指定值，并将 `is_called` 设置为 `false`，下一次调用 `nextval()` 会返回该值。这相当于调用 `setval(sequence, restart_value, false)`。

以下示例将名为 `myserial` 的序列从 `105` 开始重新计数：

```sql
ALTER SEQUENCE myserial RESTART WITH 105;
```

## 删除序列

使用 [`DROP SEQUENCE`](../../sql-stmts/drop-sequence.md) 命令可以删除一个序列。例如，以下命令会删除名为 `myserial` 的序列：

```sql
DROP SEQUENCE myserial;
```

## 将序列作为列的默认值

除了使用 `SERIAL` 或 `BIGSERIAL` 类型，也可以在 [`CREATE TABLE`](../../sql-stmts/create-table.md) 命令中直接引用一个序列。例如：

```sql
CREATE TABLE tablename ( id INT4 DEFAULT nextval('myserial'), name text );
```

也可以使用 `ALTER TABLE` 修改某个列的默认值为序列计数器：

```sql
ALTER TABLE tablename ALTER COLUMN id SET DEFAULT nextval('myserial');
```

## 序列循环

默认情况下，序列不会循环。也就是说，当序列达到最大值后（`SMALLSERIAL` 是 `+32767`，`SERIAL` 是 `+2147483647`，`BIGSERIAL` 是 `+9223372036854775807`），后续的每次 `nextval()` 调用都会报错。可以修改序列属性，让其循环计数，从 `1` 重新开始：

```sql
ALTER SEQUENCE myserial CYCLE;
```

也可以在创建序列时指定循环行为：

```sql
CREATE SEQUENCE myserial CYCLE;
```
