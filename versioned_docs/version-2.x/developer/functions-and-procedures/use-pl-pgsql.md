---
title: Use PL/pgSQL
---

# Use PL/pgSQL

PL/pgSQL is a loadable procedural language that is installed and registered by default with Apache Cloudberry. It adds the ability to perform complex computations and usage of control structures to standard SQL.

## Benefits of PL/pgSQL

- **SQL integration**: It is designed to be easy to use with SQL.
- **Portability**: Functions written in PL/pgSQL can be used on any platform where Apache Cloudberry runs.
- **Performance**: It reduces the communication overhead between the client and the server by grouping multiple SQL statements into a single block.

## Structure of PL/pgSQL functions

A PL/pgSQL function differs from a standard SQL function in that the function body is organized into blocks.

```sql
[ <<label>> ]
[ DECLARE
    declarations ]
BEGIN
    statements
END [ label ];
```

- **Declarations**: Define variables used in the block.
- **Statements**: The actual procedural code.
- **BEGIN/END**: Delimit the block.

### Example: Create a simple function

```sql
CREATE OR REPLACE FUNCTION sales_tax(subtotal real)
RETURNS real AS $$
BEGIN
    RETURN subtotal * 0.06;
END;
$$ LANGUAGE plpgsql;
```

## Anonymous blocks

You can run PL/pgSQL code without creating a persistent function using the `DO` command. This is useful for administration tasks or one-off scripts.

```sql
DO $$
DECLARE
    counter integer := 0;
BEGIN
    WHILE counter < 5 LOOP
        RAISE NOTICE 'Counter: %', counter;
        counter := counter + 1;
    END LOOP;
END $$;
```

## Declarations

You can declare variables with standard SQL data types. You can also use `%TYPE` and `%ROWTYPE` to reference existing database objects.

- `%TYPE`: copies the data type of a variable or table column.

    ```sql
    user_id users.id%TYPE;
    ```

- `%ROWTYPE`: creates a composite variable that matches the row structure of a table.

    ```sql
    user_row users%ROWTYPE;
    ```

## Control structures

PL/pgSQL supports various control structures:

- **IF-THEN-ELSE**: Conditional execution.
- **LOOP, WHILE, FOR**: Iterative execution.
- **EXCEPTION**: Error handling.

```sql
IF v_count > 0 THEN
    UPDATE users SET active = true WHERE id = v_user_id;
ELSE
    INSERT INTO users (id, active) VALUES (v_user_id, true);
END IF;
```

## Cursors

Cursors allow you to iterate through a query result set row by row.

```sql
DECLARE
    curs1 CURSOR FOR SELECT * FROM users;
    row_var users%ROWTYPE;
BEGIN
    OPEN curs1;
    LOOP
        FETCH curs1 INTO row_var;
        EXIT WHEN NOT FOUND;
        -- Process row_var
    END LOOP;
    CLOSE curs1;
END;
```
