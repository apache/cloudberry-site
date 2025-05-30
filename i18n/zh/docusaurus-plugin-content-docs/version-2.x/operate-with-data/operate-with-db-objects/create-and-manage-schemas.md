---
title: 创建和管理模式（Schema）
---

# 在 Apache Cloudberry 中创建和管理模式（Schema）

在 Apache Cloudberry 中，模式（schema）用于对数据库中的对象和数据进行逻辑组织。通过模式，可以在同一个数据库中创建多个同名对象（如表），只要它们位于不同的模式中就不会发生冲突。

## 默认的 "public" 模式

每个数据库都有一个默认的模式，名为 *public*。如果你没有显式创建任何模式，新建的对象将会创建在 *public* 模式中。所有数据库角色（用户）默认拥有该模式的 `CREATE` 和 `USAGE` 权限。你可以创建自定义模式，并授予用户相应权限以访问该模式。

## 创建模式

使用 `CREATE SCHEMA` 命令创建一个新模式。例如：

```sql
=> CREATE SCHEMA myschema;
```

要在某个模式中创建或访问对象，需要使用模式名和对象名的组合，通过点号连接。例如：

```sql
myschema.table
```

访问模式的更多信息见 [模式搜索路径](#schema-search-paths)。

你还可以创建属于其他用户的模式，用于将用户的活动限定在指定的命名空间内。语法如下：

```sql
=> CREATE SCHEMA `schemaname` AUTHORIZATION `username`;
```

## 模式搜索路径

要引用数据库中的某个对象，可以使用模式限定名。例如：

```sql
=> SELECT * FROM myschema.mytable;
```

你可以设置 `search_path` 配置参数，用于指定数据库在查找对象时搜索模式的顺序。搜索路径中排在最前的模式被视为 *默认模式*。如果不指定模式名称，对象将创建在默认模式中。

### 设置模式搜索路径

使用 `ALTER DATABASE` 命令设置 `search_path` 参数。例如：

```sql
=> ALTER DATABASE mydatabase SET search_path TO myschema, 
public, pg_catalog;
```

你也可以通过 `ALTER ROLE` 命令为特定用户设置 `search_path`，例如：

```sql
=> ALTER ROLE sally SET search_path TO myschema, public, 
pg_catalog;
```

:::tip 提示
在使用 Apache Cloudberry 时，建议你：

- 创建新对象时显式指定模式名，以确保对象被创建在预期的模式中。
- 不要依赖 `search_path` 来隐式指定非 `public` 模式。否则，数据库可能会将对象创建在非预期的模式中。
:::

### 查看当前模式

使用 `current_schema()` 函数查看当前默认模式。例如：

```sql
=> SELECT current_schema();
```

使用 `SHOW` 命令查看当前的搜索路径。例如：

```sql
=> SHOW search_path;
```

## 删除模式

使用 `DROP SCHEMA` 命令删除一个模式。例如：

```sql
=> DROP SCHEMA myschema;
```

默认情况下，只有当模式为空时才能删除它。若要删除一个模式及其包含的所有对象（表、数据、函数等），可以使用：

```sql
=> DROP SCHEMA myschema CASCADE;
```

## 系统模式

每个数据库都包含以下系统级模式：

- `pg_catalog`：包含系统目录表、内置数据类型、函数和操作符。即使未在搜索路径中显式列出，该模式也始终是搜索路径的一部分。
- `information_schema`：包含一组标准化视图，用于查询数据库对象的信息。这些视图以标准方式从系统目录表中提取信息。
- `pg_toast`：用于存储超过页大小的大对象（如长记录）。该模式由 Cloudberry 系统内部使用。
- `pg_bitmapindex`：用于存储位图索引对象，如值列表。该模式由 Cloudberry 系统内部使用。
- `pg_aoseg`：用于存储 append-optimized 表的辅助对象。该模式由 Cloudberry 系统内部使用。
- `gp_toolkit`：一个管理用的模式，包含可通过 SQL 命令访问的外部表、视图和函数。所有数据库用户都可以访问 `gp_toolkit` 来查看系统日志文件和其他系统指标。
