---
title: 管理视图依赖关系
---

# 管理视图依赖关系

如果某张表存在视图依赖，删除该表时必须使用 `CASCADE` 关键字。同时，在存在依赖的情况下，也无法修改表结构。下面的示例展示了视图对表的依赖关系：

```sql
CREATE TABLE t (id integer PRIMARY KEY);
CREATE VIEW v AS SELECT * FROM t;
 
DROP TABLE t;
ERROR:  cannot drop table t because other objects depend on it
DETAIL:  view v depends on table t
HINT:  Use DROP ... CASCADE to drop the dependent objects too.
 
ALTER TABLE t DROP id;
ERROR:  cannot drop column id of table t because other objects depend on it
DETAIL:  view v depends on column id of table t
HINT:  Use DROP ... CASCADE to drop the dependent objects too.
```

如上例所示，如果存在复杂的视图依赖层级，修改表结构会变得非常麻烦，因为必须按正确顺序重新创建这些视图。系统在创建视图时要求其依赖的对象必须已经存在。

在需要修改被视图引用的表时，可以先查找视图依赖信息。例如，可能希望将某个列的数据类型从 `integer` 改为 `bigint`，以支持更大的数值。但如果某个视图正在使用该列，就无法直接修改。必须先删除这些视图，再修改列类型，最后重新执行所有 `CREATE VIEW` 语句来还原视图。

## 查找视图依赖关系

以下示例展示了如何查询表或列的视图依赖信息：

- [查找表的直接视图依赖](#查找表的直接视图依赖)
- [查找表列的直接依赖](#查找表列的直接依赖)
- [列出视图所在的 schema](#列出视图所在的-schema)
- [列出视图定义](#列出视图定义)
- [列出嵌套视图](#列出嵌套视图)

示例输出基于本文最后的[示例数据](#example_data)。

此外，第一个示例查询 [查找表的直接视图依赖](#查找表的直接视图依赖) 也可用于查找用户自定义函数（或过程）的依赖。该查询使用系统目录表 `pg_class` 来获取表和视图的信息；若需查询函数，可使用目录表 `pg_proc`。

有关存储视图信息的系统目录表说明，参见[关于 Apache Cloudberry 中视图的存储](./view-storage.md)。

### 查找表的直接视图依赖

以下查询展示了如何找出哪些视图直接依赖于表 `t1`。查询通过连接多个系统目录表并限定条件，仅返回与视图相关的依赖信息。

```sql
SELECT v.oid::regclass AS view,
  d.refobjid::regclass AS ref_object    -- 表名
  -- d.refobjid::regproc AS ref_object  -- 函数名
FROM pg_depend AS d      -- 记录依赖关系的对象
  JOIN pg_rewrite AS r   -- 表和视图的重写规则
     ON r.oid = d.objid
  JOIN pg_class AS v     -- 视图对象
     ON v.oid = r.ev_class
WHERE v.relkind = 'v'         -- 仅筛选视图
  AND d.classid = 'pg_rewrite'::regclass  -- 依赖的是规则
  AND d.deptype = 'n'         -- 普通依赖
  AND d.refclassid = 'pg_class'::regclass  -- 被依赖的是表
  AND d.refobjid = 't1'::regclass
  -- AND d.refclassid = 'pg_proc'::regclass -- 被依赖的是函数
  -- AND d.refobjid = 'f'::regproc
;
    view    | ref_object
------------+------------
 v1         | t1
 v2         | t1
 v2         | t1
 v3         | t1
 mytest.vt1 | t1
 mytest.v2a | t1
 mytest.v2a | t1
(7 rows)
```

这个查询中使用了 `regclass` 类型进行类型转换。关于对象标识符类型的详细说明，请参考 PostgreSQL 文档：[Object Identifier Types](https://www.postgresql.org/docs/14/datatype-oid.html)。

在某些情况下，视图会被列出多次，因为该视图引用了同一个表中的多个列。可以使用 `DISTINCT` 去重。

你也可以修改查询，用于查找哪些视图直接依赖于函数 `f`：

- 在 `SELECT` 子句中，将 `d.refobjid::regclass as ref_object`（表名）替换为 `d.refobjid::regproc as ref_object`（函数名）。
- 在 `WHERE` 子句中，将 `d.refclassid = 'pg_class'::regclass`（表）替换为 `d.refclassid = 'pg_proc'::regclass`（函数）。同时将 `d.refobjid = 't1'::regclass` 改为 `d.refobjid = 'f'::regproc`。
- 也可以注释掉与表相关的行，取消注释与函数相关的行。

### 查找表列的直接依赖

你可以修改之前的查询，找出依赖某个表列的视图。这在你打算删除该列时特别有用（向表中添加列通常不会有问题）。该查询会使用系统目录表 `pg_attribute` 来获取列信息。

以下查询查找所有依赖表 `t1` 的 `id` 列的视图：

```sql
SELECT v.oid::regclass AS view,
  d.refobjid::regclass AS ref_object, -- 表名
  a.attname AS col_name               -- 列名
FROM pg_attribute AS a   -- 表的列信息
  JOIN pg_depend AS d    -- 依赖列的对象
    ON d.refobjsubid = a.attnum AND d.refobjid = a.attrelid
  JOIN pg_rewrite AS r   -- 与列相关的重写规则
    ON r.oid = d.objid
  JOIN pg_class AS v     -- 规则所对应的视图
    ON v.oid = r.ev_class
WHERE v.relkind = 'v'    -- 仅筛选视图
  AND d.classid = 'pg_rewrite'::regclass  -- 依赖项为规则
  AND d.refclassid = 'pg_class'::regclass -- 被依赖对象为表
  AND d.deptype = 'n'    -- 普通依赖
  AND a.attrelid = 't1'::regclass
  AND a.attname = 'id'
;
    view    | ref_object | col_name
------------+------------+----------
 v1         | t1         | id
 v2         | t1         | id
 mytest.vt1 | t1         | id
 mytest.v2a | t1         | id
(4 rows)
```

### 列出视图所在的 schema

如果你在多个 schema 中创建了视图，也可以列出每个视图的名称、所在 schema 以及其引用的表。该查询会从系统目录表 `pg_namespace` 中获取 schema 信息，并排除系统 schema（`pg_catalog`、`information_schema` 和 `gp_toolkit`）。同时，该查询不会列出引用自身的视图。

```sql
SELECT v.oid::regclass AS view,
  ns.nspname AS schema,       -- 视图所在 schema
  d.refobjid::regclass AS ref_object -- 被引用的表名
FROM pg_depend AS d            -- 依赖项
  JOIN pg_rewrite AS r        -- 与表相关的规则
    ON r.oid = d.objid
  JOIN pg_class AS v          -- 与规则关联的视图
    ON v.oid = r.ev_class
  JOIN pg_namespace AS ns     -- schema 信息
    ON ns.oid = v.relnamespace
WHERE v.relkind = 'v'          -- 仅筛选视图
  AND d.classid = 'pg_rewrite'::regclass 
  AND d.refclassid = 'pg_class'::regclass  -- 被引用对象为表或视图
  AND d.deptype = 'n'         -- 普通依赖
  AND ns.nspname NOT IN ('pg_catalog', 'information_schema', 'gp_toolkit') -- 排除系统 schema
  AND NOT (v.oid = d.refobjid) -- 排除自引用依赖
;
    view    | schema | ref_object
------------+--------+------------
 v1         | public | t1
 v2         | public | t1
 v2         | public | t1
 v2         | public | v1
 v3         | public | t1
 vm1        | public | mytest.tm1
 mytest.vm1 | mytest | t1
 vm2        | public | mytest.tm1
 mytest.v2a | mytest | t1
 mytest.v2a | mytest | t1
 mytest.v2a | mytest | v1
(11 rows)
```

### 列出视图定义

以下查询列出了依赖表 `t1` 的视图、所引用的列编号以及视图定义。查询结果中通过拼接文本构造了完整的 `CREATE VIEW` 命令。

```sql
SELECT v.relname AS view,  
  d.refobjid::regclass as ref_object,
  d.refobjsubid as ref_col, 
  'CREATE VIEW ' || v.relname || ' AS ' || pg_get_viewdef(v.oid) AS view_def
FROM pg_depend AS d
  JOIN pg_rewrite AS r
    ON r.oid = d.objid
  JOIN pg_class AS v
    ON v.oid = r.ev_class
WHERE NOT (v.oid = d.refobjid) 
  AND d.refobjid = 't1'::regclass
  ORDER BY d.refobjsubid
;
 view | ref_object | ref_col |                  view_def
------+------------+---------+--------------------------------------------
 v1   | t1         |       1 | CREATE VIEW v1 AS  SELECT max(t1.id) AS id+
      |            |         |    FROM t1;
 v2a  | t1         |       1 | CREATE VIEW v2a AS  SELECT t1.val         +
      |            |         |    FROM (t1                               +
      |            |         |      JOIN v1 USING (id));
 vt1  | t1         |       1 | CREATE VIEW vt1 AS  SELECT t1.id          +
      |            |         |    FROM t1                                +
      |            |         |   WHERE (t1.id < 3);
 v2   | t1         |       1 | CREATE VIEW v2 AS  SELECT t1.val          +
      |            |         |    FROM (t1                               +
      |            |         |      JOIN v1 USING (id));
 v2a  | t1         |       2 | CREATE VIEW v2a AS  SELECT t1.val         +
      |            |         |    FROM (t1                               +
      |            |         |      JOIN v1 USING (id));
 v3   | t1         |       2 | CREATE VIEW v3 AS  SELECT (t1.val || f()) +
      |            |         |    FROM t1;
 v2   | t1         |       2 | CREATE VIEW v2 AS  SELECT t1.val          +
      |            |         |    FROM (t1                               +
      |            |         |      JOIN v1 USING (id));
(7 rows)
```

### 列出嵌套视图

以下 CTE 查询用于查找引用其他视图的视图信息。

`WITH` 子句会筛选出所有用户 schema 中的视图，主查询用于找出那些引用了其他视图的视图。

```sql
WITH views AS ( SELECT v.relname AS view,
  d.refobjid AS ref_object,
  v.oid AS view_oid,
  ns.nspname AS namespace
FROM pg_depend AS d
  JOIN pg_rewrite AS r
    ON r.oid = d.objid
  JOIN pg_class AS v
    ON v.oid = r.ev_class
  JOIN pg_namespace AS ns
    ON ns.oid = v.relnamespace
WHERE v.relkind = 'v'
  AND ns.nspname NOT IN ('pg_catalog', 'information_schema', 'gp_toolkit') -- 排除系统 schema
  AND d.deptype = 'n'    -- 普通依赖
  AND NOT (v.oid = d.refobjid) -- 排除自引用
 )
SELECT views.view, views.namespace AS schema,
  views.ref_object::regclass AS ref_view,
  ref_nspace.nspname AS ref_schema
FROM views 
  JOIN pg_depend as dep
    ON dep.refobjid = views.view_oid 
  JOIN pg_class AS class
    ON views.ref_object = class.oid
  JOIN  pg_namespace AS ref_nspace
      ON class.relnamespace = ref_nspace.oid
  WHERE class.relkind = 'v'
    AND dep.deptype = 'n'    
; 
 view | schema | ref_view | ref_schema
------+--------+----------+------------
 v2   | public | v1       | public
 v2a  | mytest | v1       | public
```

### 示例数据

这些示例查询的输出基于以下数据库对象和数据。

```sql
CREATE TABLE t1 (
   id integer PRIMARY KEY,
   val text NOT NULL
);

INSERT INTO t1 VALUES
   (1, 'one'), (2, 'two'), (3, 'three');

CREATE FUNCTION f() RETURNS text
   LANGUAGE sql AS 'SELECT ''suffix''::text';

CREATE VIEW v1 AS
  SELECT max(id) AS id
  FROM t1;
 
CREATE VIEW v2 AS
  SELECT t1.val
  FROM t1 JOIN v1 USING (id);
 
CREATE VIEW v3 AS
  SELECT val || f()
  FROM t1;

CREATE VIEW v5 AS
  SELECT f() ;

CREATE SCHEMA mytest ;

CREATE TABLE mytest.tm1 (
   id integer PRIMARY KEY,
   val text NOT NULL
);

INSERT INTO mytest.tm1 VALUES
   (1, 'one'), (2, 'two'), (3, 'three');

CREATE VIEW vm1 AS
  SELECT id FROM mytest.tm1 WHERE id < 3 ;

CREATE VIEW mytest.vm1 AS
  SELECT id FROM public.t1 WHERE id < 3 ;

CREATE VIEW vm2 AS
  SELECT max(id) AS id
  FROM mytest.tm1;

CREATE VIEW mytest.v2a AS
  SELECT t1.val
  FROM public.t1 JOIN public.v1 USING (id);
```
