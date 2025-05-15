---
title: Load Data from Kafka Using Kafka FDW
---

# Load Data from Kafka Using Kafka FDW

Kafka Foreign Data Wrapper (FDW) allows Apache Cloudberry to connect directly to Apache Kafka, enabling it to read and process Kafka data as external tables. This integration improves the efficiency, flexibility, and reliability of real-time Kafka data processing, enhancing data operations and business performance.

Apache Cloudberry supports using Kafka FDW to create external tables and import data.

See the Kafka FDW repository for more information: [https://github.com/cloudberry-contrib/kafka_fdw](https://github.com/cloudberry-contrib/kafka_fdw). Note that this repo is contributed by the community members, but it is not maintained by the PPMC as an official community project.

## Basic usage

- Create the `kafka_fdw` extension:

    ``` sql
    CREATE EXTENSION kafka_fdw;
    ```

- Create an external server and specify Kafka's cluster address. You need to replace `localhost:9092` with your Kafka cluster address.

    ``` sql
    CREATE SERVER kafka_server
    FOREIGN DATA WRAPPER kafka_fdw
    OPTIONS (mpp_execute 'all segments', brokers 'localhost:9092');
    ```

- Create user mapping:

    ``` sql
    CREATE USER MAPPING FOR PUBLIC SERVER kafka_server;
    ```

- Create an external table:

    When creating an external table, you need to specify two metadata columns: `partition` and `offset`, which identify the partition and offset of messages in a Kafka topic. Here is an example:

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

    Parameter description:

    - `batch_size`: The size of data read from Kafka at once.
    - `buffer_delay`: The timeout for getting data from Kafka.

## Supported data formats

Currently, `CSV` and `JSON` data formats are supported.

## Query

You can specify the message partition and offset in your query by using the `partition` or `offset` column condition:

``` sql
SELECT * FROM kafka_test WHERE part = 0 AND offs > 1000 LIMIT 60;
```

You can also specify multiple conditions:

``` sql
SELECT * FROM kafka_test WHERE (part = 0 AND offs > 100) OR (part = 1 AND offs > 300) OR (part = 3 AND offs > 700);
```

## Message producer

Currently, Kafka FDW supports inserting data into external tables, which acts as a message producer for Kafka. You only need to use the `INSERT` statement.

``` sql
INSERT INTO kafka_test(part, some_int, some_text)
VALUES
    (0, 5464565, 'some text goes into partition 0'),
    (1, 5464565, 'some text goes into partition 1'),
    (0, 5464565, 'some text goes into partition 0'),
    (3, 5464565, 'some text goes into partition 3'),
    (NULL, 5464565, 'some text goes into partition selected by kafka');
```

When inserting data, you can specify `partition` to specify which partition to insert into.

## Data import

To use Kafka FDW for data import, you can create custom functions, such as the `INSERT INTO SELECT` statement. The basic principle is to fetch all data from the external table and insert it into the target table sequentially.

Here is a simple example, which you can modify according to your needs:

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

    -- Creates progress record table.
    EXECUTE FORMAT('CREATE TABLE IF NOT EXISTS %I (part integer PRIMARY KEY, offs bigint NOT NULL)', import_progress_table_name);

    -- The number of partitions in the topic table might change, so reinitialize before each import.
    EXECUTE FORMAT('INSERT INTO %I SELECT DISTINCT part, 0 FROM %I ON CONFLICT (part) DO NOTHING', import_progress_table_name, src_table_name);

    -- Imports data partition by partition.
    FOR current_row IN
        EXECUTE FORMAT('SELECT part, offs FROM %I', import_progress_table_name)
    LOOP
        current_part := current_row.part;
        current_offs := current_row.offs;

        -- Gets the maximum offset for the current partition.
        EXECUTE FORMAT('SELECT MAX(offs) FROM %I WHERE part = %s', src_table_name, current_part) INTO max_off_result;
        max_off := max_off_result;

        -- Skips if there is no new data.
        IF max_off+1 = current_offs THEN
            CONTINUE;
        END IF;

        -- Imports data.
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

        -- Updates import progress.
        EXECUTE FORMAT('UPDATE %I SET offs = %s WHERE part = %s', import_progress_table_name, max_off + 1, current_part);
    END LOOP;

    RETURN;
END;
$$ LANGUAGE plpgsql;
```

When executing the query, call this function, passing in the external table name, target table name, and the fields to be imported. Here is an example:

``` sql
SELECT import_kafka_data('kafka_test', 'dest_table_fdw', ARRAY['some_int', 'some_text', 'some_date', 'some_time']);
```
