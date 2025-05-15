---
title: 从 Kafka 加载数据
---

# 从 Kafka 加载数据

Kafka Foreign Data Wrapper (FDW) 提供了 Apache Cloudberry 与 Apache Kafka 连接的能力，使得数据库能够直接从 Kafka 中读取数据，并将其作为外部表来处理。Apache Cloudberry 用户可以更高效、灵活、可靠地处理 Kafka 中的实时数据，从而提高数据处理能力和业务效率。

Apache Cloudberry 支持使用 Kafka FDW 来创建外部表以及导入数据。

更多信息，参考 Kafka FDW 仓库：[https://github.com/cloudberry-contrib/kafka_fdw](https://github.com/cloudberry-contrib/kafka_fdw)。注意，该仓库由社区成员贡献，但不是由 PPMC 维护的官方社区项目。

## 基本使用

- 创建 `kafka_fdw` 扩展。

    ``` sql
    CREATE EXTENSION kafka_fdw;
    ```

- 创建外部服务器，指定 Kafka 的集群地址。你需要将 `localhost:9092` 替换为你的 Kafka 集群地址。

    ``` sql
    CREATE SERVER kafka_server
    FOREIGN DATA WRAPPER kafka_fdw
    OPTIONS (mpp_execute 'all segments', brokers 'localhost:9092');
    ```

- 创建 user mapping。

    ``` sql
    CREATE USER MAPPING FOR PUBLIC SERVER kafka_server;
    ```

- 创建外部表

    创建外部表时，必须指定两个元数据信息列 `partition` 和 `offset`，用于标识 Kafka 中的一个 Topic 的消息所属的分区和偏移。下面是一个示例：

    ``` sql
    CREATE FOREIGN TABLE kafka_test (
        part int OPTIONS (partition 'true'),
        offs bigint OPTIONS (offset 'true'),
        some_int int,
        some_text text,
        some_date date,
        some_time timestamp
    )
    SERVER kafka_server OPTIONS
        (format 'csv', topic 'contrib_regress_csv', batch_size '1000', buffer_delay '1000');
    ```

    参数说明：

    - `batch_size`：从 Kafka 读取一次数据的量。
    - `buffer_delay`：从 Kafka 获取数据的超时时间。

## 支持的数据格式

目前支持 `CSV` 和 `JSON` 两种数据格式。

## 查询

可以在查询的时候指定消息的分区和偏移，指定 `partition` 或 `offset`：

``` sql
SELECT * FROM kafka_test WHERE part = 0 AND offs > 1000 LIMIT 60;
```

也可以指定多个条件：

``` sql
SELECT * FROM kafka_test WHERE (part = 0 AND offs > 100) OR (part = 1 AND offs > 300) OR (part = 3 AND offs > 700);
```

## 消息生产者

目前 Kafka FDW 支持向外表中插入数据，即作为了 Kafka 的消息生产者。只需要使用 INSERT 语句即可。

``` sql
INSERT INTO kafka_test(part, some_int, some_text)
VALUES
    (0, 5464565, 'some text goes into partition 0'),
    (1, 5464565, 'some text goes into partition 1'),
    (0, 5464565, 'some text goes into partition 0'),
    (3, 5464565, 'some text goes into partition 3'),
    (NULL, 5464565, 'some text goes into partition selected by kafka');
```

插入的时候可以指定 `partition` 表示插入到哪个分区。

## 数据导入功能

如果想要通过 kafka FDW 实现类似数据导入的功能，您可以通过自定义函数来实现，例如 `insert into select` 语句，基本原理是将外表中的所有数据依次取出来插入到目标表中。

下面是一个简单的示例，您可以根据实际情况对此函数进行修改：

``` sql
CREATE OR REPLACE FUNCTION import_kafka_data(
  src_table_name text,
  dest_table_name text,
  dest_table_columns text[]
) RETURNS void AS $$

DECLARE
    current_row RECORD;
    current_part integer;
    current_offs bigint;
    max_off bigint;
    import_progress_table_name text;
    max_off_result bigint;
BEGIN

    import_progress_table_name := src_table_name || '_import_progress';

    -- 创建进度记录表
    EXECUTE FORMAT('CREATE TABLE IF NOT EXISTS %I (part integer PRIMARY KEY, offs bigint NOT NULL)', import_progress_table_name);

    -- 表的 topic 的 partition 数量有可能发生变化，所以每次导入前都要重新初始化
    EXECUTE FORMAT('INSERT INTO %I SELECT DISTINCT part, 0 FROM %I ON CONFLICT (part) DO NOTHING', import_progress_table_name, src_table_name);

    -- 逐个分区导入数据
    FOR current_row IN
        EXECUTE FORMAT('SELECT part, offs FROM %I', import_progress_table_name)
    LOOP
        current_part := current_row.part;
        current_offs := current_row.offs;

        -- 获取当前分区的最大 offset
        EXECUTE FORMAT('SELECT MAX(offs) FROM %I WHERE part = %s', src_table_name, current_part) INTO max_off_result;
        max_off := max_off_result;

        -- 没有新数据跳过
        IF max_off+1 = current_offs THEN
            CONTINUE;
        END IF;

        -- 导入数据
        EXECUTE FORMAT('
            INSERT INTO %I (%s)
            SELECT %s
            FROM %I
            WHERE part = %s AND offs >= %s AND offs <= %s',
            dest_table_name,
            array_to_string(dest_table_columns, ', '),
            array_to_string(dest_table_columns, ', '),
            src_table_name,
            current_part,
            current_offs,
            max_off
        );        

        -- 更新导入进度
        EXECUTE FORMAT('UPDATE %I SET offs = %s WHERE part = %s', import_progress_table_name, max_off + 1, current_part);
    END LOOP;

    RETURN;
END;
$$ LANGUAGE plpgsql;
```

执行的时候只需要调用这个函数，传入外表名称、目标表名称、需要导入的字段即可，如下：

``` sql
SELECT import_kafka_data('kafka_test', 'dest_table_fdw', ARRAY['some_int', 'some_text', 'some_date', 'some_time']);
```
