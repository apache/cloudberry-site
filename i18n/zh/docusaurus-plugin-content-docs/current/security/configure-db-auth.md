---
title: 配置数据库授权
---

# 配置数据库授权

本文介绍如何通过角色与权限机制，在用户级别限制对数据库数据的访问。

## 访问权限与角色

Apache Cloudberry 使用角色（role）来管理数据库的访问权限。角色的概念涵盖了传统意义上的“用户”和“用户组”。一个角色既可以是数据库用户，也可以是用户组，甚至可以是两者的结合。角色可以拥有数据库对象（如表），也可以将这些对象的权限授权给其他角色，从而控制访问行为。角色之间可以嵌套，子角色可以继承父角色的对象权限。

每个 Apache Cloudberry 系统都包含一组数据库角色（用户和用户组）。这些角色与服务器操作系统中定义的用户和用户组是相互独立的。不过，为了使用方便，你可以将操作系统用户名与 Apache Cloudberry 的角色名保持一致，因为许多客户端工具会默认使用当前操作系统用户身份登录。

在 Apache Cloudberry 中，用户是通过 Coordinator 实例连接并登录系统的，Coordinator 会验证用户的角色与访问权限。登录成功后，Coordinator 会以该角色的身份向后端的各个 Segment 实例分发 SQL 命令。

角色在系统层面定义，在整个系统中的所有数据库中都有效。

初始化 Apache Cloudberry 系统时，系统会自动创建一个预定义的超级用户角色（也称为系统用户），其名称与执行初始化操作的操作系统用户名相同。通常该角色名为 `gpadmin`。如果你想创建更多角色，必须先以这个初始角色连接系统。

## 管理对象权限

每当创建一个对象（如表、视图、序列、数据库、函数、语言、模式或表空间）时，系统会将其归属于一个所有者。通常，所有者是执行创建语句的角色。对于大多数对象类型，初始状态下只有所有者（或超级用户）具有操作权限。若希望其他角色访问这些对象，必须显式授权。

Apache Cloudberry 支持以下各类对象的权限管理：

| 对象类型 | 支持的权限 |
|:---------|:------------|
| 表、视图、序列 | `SELECT`<br/>`INSERT`<br/>`UPDATE`<br/>`DELETE`<br/>`RULE`<br/>`ALL` |
| 外部表 | `SELECT`<br/>`RULE`<br/>`ALL` |
| 数据库 | `CONNECT`<br/>`CREATE`<br/>`TEMPORARY` 或 `TEMP`<br/>`ALL` |
| 函数 | `EXECUTE` |
| 过程语言 | `USAGE` |
| 模式（schema） | `CREATE`<br/>`USAGE`<br/>`ALL` |

每个对象的权限需要单独授权。例如，在某个数据库上授予 `ALL` 权限，并不会自动赋予该数据库中所有对象的访问权限，它仅代表该角色拥有对该数据库本身的 `CONNECT`、`CREATE` 和 `TEMPORARY` 权限。

你可以使用 `GRANT` 命令授予角色对某个对象的权限，例如：

```sql
GRANT INSERT ON mytable TO jsmith;
```

如需撤销权限，可使用 `REVOKE` 命令，例如：

```sql
REVOKE ALL PRIVILEGES ON mytable FROM jsmith;
```

还可以使用 `DROP OWNED` 与 `REASSIGN OWNED` 命令管理不再使用的角色所拥有的对象（注意：仅对象所有者或超级用户有权删除或变更对象所有权）。例如：

```sql
REASSIGN OWNED BY sally TO bob;
DROP OWNED BY visitor;
```

## 按时间限制访问权限

Apache Cloudberry 支持管理员根据角色设置访问时间限制。可以通过 `CREATE ROLE` 或 `ALTER ROLE` 命令配置基于时间的访问约束。

访问限制可以按“星期几”设置，也可以同时包含具体时间段。这些限制可随时移除，无需删除或重建角色。

时间约束只对直接设置的角色生效。如果某个角色是另一个具有时间约束角色的成员，它不会继承这些时间限制。

时间限制只在用户登录时生效，不影响 `SET ROLE` 和 `SET SESSION AUTHORIZATION` 命令。

只有具有超级用户或 `CREATEROLE` 权限的用户才能为角色设置时间限制。不能为超级用户添加任何时间限制。

可以通过以下两种方式添加时间限制。在 `CREATE ROLE` 或 `ALTER ROLE` 命令中使用关键字 `DENY`，并指定以下之一：

- 指定某个星期几，或星期几加具体时间，表示在这些时间点禁止访问。例如：每周三全天禁止访问。
- 指定一个时间区间，包括起始的星期几和可选的时间段，表示在此区间内禁止访问。例如：从周三晚上 10 点到周四早上 8 点禁止访问。

你可以为同一个角色指定多个时间限制。例如，禁止在每周三任何时间访问，同时禁止每周五下午 3 点到 5 点之间的访问。

设置星期几有两种方式：使用 `DAY` 关键字，后接英文星期几名称（使用单引号包裹），或用数字 0 到 6 表示。对应关系如下表所示：

| 英文名称     | 数字表示 |
|:-------------|:---------|
| DAY 'Sunday' | DAY 0    |
| DAY 'Monday' | DAY 1    |
| DAY 'Tuesday'| DAY 2    |
| DAY 'Wednesday'| DAY 3  |
| DAY 'Thursday'| DAY 4   |
| DAY 'Friday' | DAY 5    |
| DAY 'Saturday'| DAY 6   |

时间可以用 12 小时或 24 小时制表示。使用 `TIME` 关键字，后跟用单引号括起的时间字符串。时间中只包含小时和分钟，使用冒号（:）分隔。12 小时制需加上 `AM` 或 `PM`。例如：

```sql
TIME '14:00'     -- 表示 24 小时制时间 14:00
TIME '02:00 PM'  -- 表示下午 2 点，12 小时制
TIME '02:00'     -- 默认为 24 小时制，即凌晨 2 点，等同于 TIME '02:00 AM'
```

:::info 信息
时间限制是根据服务器时间判断的，不考虑时区。
:::

如需设置某一时间区间内禁止访问，可使用 `BETWEEN` 和 `AND` 连接两个包含 `DAY` 和可选 `TIME` 的时间点。例如：

```sql
ALTER ROLE hr DENY DAY 'Wednesday' TIME '22:00' 
            BETWEEN DAY 'Thursday' TIME '08:00';
```

```sql
BETWEEN DAY 'Monday' AND DAY 'Tuesday' 

BETWEEN DAY 'Monday' TIME '00:00' AND
        DAY 'Monday' TIME '01:00'

BETWEEN DAY 'Monday' TIME '12:00 AM' AND
        DAY 'Tuesday' TIME '02:00 AM'

BETWEEN DAY 'Monday' TIME '00:00' AND
        DAY 'Tuesday' TIME '02:00'
        DAY 2 TIME '02:00'
```

最后三条语句是等效的。

:::note 注意
时间区间不能跨越周六。
:::

以下写法是错误的：

```sql
DENY BETWEEN DAY 'Saturday' AND DAY 'Sunday'
```

正确的写法是使用两个独立的 DENY 子句，如下所示：

```sql
DENY DAY 'Saturday'
DENY DAY 'Sunday'
```

下面是一些示例，演示如何在创建角色时设置时间限制，以及如何修改已有角色以添加时间限制。这里只展示与时间限制相关的语句，完整语法请参考 [`CREATE ROLE`](../sql-stmts/create-role.md) 和 [`ALTER ROLE`](../sql-stmts/alter-table.md)。

### 示例 1 – 创建一个包含时间限制的新角色

禁止在周末访问：

```sql
CREATE ROLE generaluser
DENY DAY 'Saturday'
DENY DAY 'Sunday'
... 
```

### 示例 2 – 修改角色，添加时间限制

每天凌晨 2 点到 4 点之间禁止访问：

```sql
ALTER ROLE generaluser
 DENY BETWEEN DAY 'Monday' TIME '02:00' AND DAY 'Monday' TIME '04:00'
 DENY BETWEEN DAY 'Tuesday' TIME '02:00' AND DAY 'Tuesday' TIME '04:00'
 DENY BETWEEN DAY 'Wednesday' TIME '02:00' AND DAY 'Wednesday' TIME '04:00'
 DENY BETWEEN DAY 'Thursday' TIME '02:00' AND DAY 'Thursday' TIME '04:00'
 DENY BETWEEN DAY 'Friday' TIME '02:00' AND DAY 'Friday' TIME '04:00'
 DENY BETWEEN DAY 'Saturday' TIME '02:00' AND DAY 'Saturday' TIME '04:00'
 DENY BETWEEN DAY 'Sunday' TIME '02:00' AND DAY 'Sunday' TIME '04:00'
  ... 
```

### 示例 3 – 修改角色，添加时间限制

禁止在每周三全天访问，禁止在每周五下午 3 点至 5 点之间访问：

```sql
ALTER ROLE generaluser
 DENY DAY 'Wednesday'
 DENY BETWEEN DAY 'Friday' TIME '15:00' AND DAY 'Friday' TIME '17:00'
```

## 删除时间限制

如需移除时间限制，可使用 `ALTER ROLE` 命令，格式为 `DROP DENY FOR`，后跟要移除的星期几和时间说明：

```sql
DROP DENY FOR DAY 'Sunday'
```

如果某个时间限制与 `DROP` 子句中的时间部分或全部重叠，该限制会被完全移除。比如，某个限制禁止在周一和周二访问，如果 `DROP` 子句中指定删除周一的限制，那么整个“周一和周二”的限制都会被删除。

换句话说，只要存在交集，原限制就会被整个移除，即使它包含比 `DROP` 子句更多的内容。

示例 1：从角色中移除某项时间限制

```sql
ALTER ROLE generaluser
DROP DENY FOR DAY 'Monday'
    ... 
```

这条语句会删除角色 `generaluser` 的所有与“星期一”限制相关的规则，即使这些规则还包含了其他限制条件，也会一并移除（例如示例 2 中的配置）。
