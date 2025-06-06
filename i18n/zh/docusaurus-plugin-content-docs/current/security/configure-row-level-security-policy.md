---
title: 配置行级安全策略
toc_max_heading_level: 5
---

# 配置行级安全策略

行级安全（RLS）策略允许表的所有者定义访问控制规则，用于限制用户对表中特定行的访问。当用户尝试查询或修改表数据时，系统会优先应用 RLS 策略，从而筛选出可访问的行，之后才会执行用户提交的 SQL 操作。

行级安全策略可以针对特定操作类型（如 `SELECT`、`INSERT`、`UPDATE` 或 `DELETE`）定义，也可以统一应用于所有操作（`ALL`）。你还可以基于用户、用户组或指定条件来限制对表中某些行的访问。

## 行级安全策略概览

- 默认情况下，表没有启用行级安全策略。如果用户在权限系统中拥有对该表的访问权限，则可以访问和修改表中的所有数据行。

- 可以使用 `ALTER TABLE ... ENABLE ROW LEVEL SECURITY` 命令启用表的行级安全策略。一旦启用，除表的所有者之外，其他用户将无法访问或修改该表，必须先定义合适的策略，其他用户才能访问或操作表中的数据。

    :::note 注意
    针对整张表的操作（如 `TRUNCATE` 和 `REFERENCES`）不会受到行级安全策略的限制。
    :::

- 策略可以基于 SQL 操作类型、角色，或两者同时设定。你可以为 `SELECT`、`INSERT`、`UPDATE`、`DELETE` 设置不同的策略，也可以设置一个通用策略（`ALL`）。同一个策略可赋予多个角色使用，角色之间的继承规则在行级安全策略中同样适用。

- 拥有 `BYPASSRLS` 属性的角色（包括超级用户）不受行级安全策略限制。表的所有者默认也不受策略约束，但如果需要，也可以通过 `ALTER TABLE ... FORCE ROW LEVEL SECURITY` 命令强制其受到行级策略约束。

- 只有表的所有者有权启用、禁用或创建行级安全策略。

## 启用并创建行级安全策略

必须先启用表的行级安全功能，才能定义具体策略。

**第 1 步：** 启用行级安全策略

表的所有者需执行以下命令启用行级安全：

```sql
ALTER TABLE <table_name> ENABLE ROW LEVEL SECURITY;
```

**第 2 步：** 创建策略

启用后，可以使用 `CREATE POLICY` 命令创建具体的安全策略。

行级安全策略中必须包含 `USING` 或 `WITH CHECK` 子句，提供返回布尔值的表达式，用于决定哪些行可以被查询或修改。系统会对表中的每一行逐条执行这个表达式，优先于用户 SQL 中的任何条件或函数。只有当表达式返回 `true` 时，该行才会被包含在操作结果中。

你可以为策略设置不同的表达式，分别控制数据的可见性和可修改性。表达式在查询执行过程中运行，权限级别与执行查询的用户相同。如果需要访问用户无权访问的数据，也可以通过定义带安全上下文的函数（Security-definer functions）实现。

以下是创建行级安全策略的基本语法结构：

    ```sql
    CREATE POLICY <name> ON <table_name>
        [ AS { PERMISSIVE | RESTRICTIVE } ]
        [ FOR { ALL | SELECT | INSERT | UPDATE | DELETE } ]
        [ TO { <role_name> | PUBLIC | CURRENT_USER | SESSION_USER } [, ...] ]
        [ USING ( <using_expression> ) ]
        [ WITH CHECK ( <check_expression> ) ]
    ```

请参考以下参数说明，了解各字段的详细用法：

- `name`：策略名称。

- `table_name`：策略应用的目标表名。

- `PERMISSIVE`：表示该策略为宽松策略。系统会将所有适用的宽松策略通过 `OR` 运算符合并。使用宽松策略可以扩大允许访问的数据范围。默认策略类型为宽松。

- `RESTRICTIVE`：表示该策略为严格策略。系统会将所有适用的严格策略通过 `AND` 运算符合并。使用严格策略可以收紧可访问的数据范围，只有同时满足所有限制的记录才会被允许访问。

- 操作类型（`ALL`、`SELECT`、`INSERT`、`UPDATE`、`DELETE`）：指定策略适用的 SQL 操作。

- `role_name`：指定策略适用的角色，默认值为 `PUBLIC`，即策略适用于所有角色。

- `using_expression`：任意返回布尔值的 SQL 条件表达式。该表达式不能包含聚合函数或窗口函数。当启用行级安全策略后，系统会自动将此表达式附加在引用目标表的查询语句上。仅当表达式返回 `true` 时，数据行才对用户可见；如果返回 `false` 或 `null`，该行将对用户不可见（适用于 `SELECT`），也不能被修改（适用于 `UPDATE` 和 `DELETE`）。这类记录不会出现在结果中，也不会报错。

- `check_expression`：任意返回布尔值的 SQL 条件表达式，不能包含聚合函数或窗口函数。当启用行级安全后，该表达式会用于对表的 `INSERT` 和 `UPDATE` 操作进行校验。只有表达式返回 `true` 的记录才允许插入或更新；如果返回 `false` 或 `null`，系统将抛出错误，操作被拒绝。

    :::note
    `check_expression` 是针对插入或更新后的新数据进行验证的，而不是基于原始数据。
    :::

## 行级安全策略示例

以下示例演示了如何为一个表设置行级访问策略，仅允许 `(department = current_setting('myapp.current_department'))` 条件为 `true` 的行被返回。

1. 以管理员身份连接数据库：

    ```shell
    psql -h <host_ip> -p <port> -U <user_name> -d <db_name>
    ```

2. 创建表并插入数据：

    ```sql
    CREATE TABLE projects (
        project_id SERIAL PRIMARY KEY,
        project_name TEXT,
        project_manager TEXT,
        department TEXT
    );

    INSERT INTO projects (project_name, project_manager, department) VALUES
    ('Project Alpha', 'zhangsan', 'Engineering'),
    ('Project Beta', 'lisi', 'HR'),
    ('Project Gamma', 'wangwu', 'Sales');
    ```

3. 启用行级安全策略：

    ```sql
    ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
    ```

4. 创建行级安全策略：

    ```sql
    CREATE POLICY department_policy
    ON projects
    FOR SELECT
    USING (department = current_setting('myapp.current_department'));
    ```

    此策略的效果是：只有当 `(department = current_setting('myapp.current_department'))` 为 `true` 时，相关数据行才会被查询结果返回。

5. Create test users:

    ```sql
    CREATE USER zhangsan WITH PASSWORD '<password>';
    CREATE USER lisi WITH PASSWORD '<password>';
    CREATE USER wangwu WITH PASSWORD '<password>';
    ```
5. 创建测试用户：

    ```sql
    CREATE USER zhangsan WITH PASSWORD '<password>';
    CREATE USER lisi WITH PASSWORD '<password>';
    CREATE USER wangwu WITH PASSWORD '<password>';
    ```

6. 授权测试用户查询 `projects` 表：

    ```sql
    GRANT SELECT ON projects TO zhangsan;
    ```

7. 切换到测试用户，并为当前会话设置变量 `myapp.current_department` 的值：

    ```sql
    SET ROLE zhangsan;
    SET myapp.current_department = 'Engineering';
    ```

8. 以当前用户身份查询 `projects` 表：

    ```sql
    SELECT * FROM projects;
    ```

由于当前会话中 `myapp.current_department` 的值被设置为 `Engineering`，你将看到如下返回结果：

```sql
project_id | project_name | project_manager | department
-----------+--------------+-----------------+------------
         1 | Project Alpha | zhangsan        | Engineering
```

由于已启用行级安全策略，用户 `zhangsan` 只能看到 `department = 'Engineering'` 的记录，因此仅返回与工程部门相关的这一行数据。

