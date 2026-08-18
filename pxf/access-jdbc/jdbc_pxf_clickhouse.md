---
title: "Example: Reading From and Writing to a ClickHouse Table"
description: "Using PXF JDBC with ClickHouse."
source: https://cloudberry.apache.org/pxf/access-jdbc/jdbc_pxf_clickhouse
---

# Example: Reading From and Writing to a ClickHouse Table

<!--
Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.
-->

In this example, you:

- Install the ClickHouse JDBC driver on the Apache Cloudberry coordinator (see [JDBC driver installation](#jdbc-driver))
- Create a ClickHouse table, and insert data into the table
- Create a PXF readable external table that references the ClickHouse table using `JDBC_DRIVER` and `DB_URL` in the `LOCATION` clause (no separate PXF server configuration directory is required)
- Read the data in the ClickHouse table using PXF
- Create a PXF writable external table that references the ClickHouse table
- Write data to the ClickHouse table using PXF
- Read the data in the ClickHouse table again

## Create a ClickHouse Table

Perform the following steps to create a ClickHouse table named `pxf_ch_types` in the `default` database:

```sql
CREATE TABLE default.pxf_ch_types (
  i_int Int32,
  s_small Int16,
  b_big Int64,
  f_float32 Float32,
  d_float64 Float64,
  b_bool Bool,
  dec Decimal(38,10),
  t_text String,
  bin String,
  d_date Date,
  d_ts DateTime64(3,'UTC'),
  d_tstz DateTime64(3,'UTC'),
  d_uuid UUID
) ENGINE = MergeTree ORDER BY (i_int);

INSERT INTO default.pxf_ch_types
  (i_int, s_small, b_big, f_float32, d_float64, b_bool, dec, t_text, bin, d_date, d_ts, d_tstz, d_uuid)
VALUES
  (1, 2, 3, 1.25, 3.1415926, true, toDecimal64('12345.6789012345', 10), 'hello', 'ABCD',
   toDate('2020-01-02'), toDateTime64('2020-01-02 03:04:05.006', 3, 'UTC'),
   toDateTime64('2020-01-02 03:04:05.006', 3, 'UTC'), toUUID('550e8400-e29b-41d4-a716-446655440000'));
```

## JDBC driver

Place the ClickHouse JDBC driver JAR under `$PXF_BASE/lib` on every coordinator and segment host, synchronize PXF, and restart PXF. The Cloudberry build can bundle JDBC drivers from `server/pxf-jdbc-drivers`; follow your deployment’s procedure (for example, the automation `Makefile` target that stages PXF and links drivers).

You do **not** need a `servers/clickhouse/jdbc-site.xml` if you pass connection options in the external table definition, as shown below.

Automated tests exercise ClickHouse server versions **24** and **26** together with the ClickHouse JDBC drivers.

For ClickHouse we recommend latest clickhouse-jdbc-all:0.9.7 or newer (fat jar version with shaded dependencies). In case you observe HTTP reliably issues you can use Apache HttpClient: add the JDBC URL parameter `http_connection_provider=APACHE_HTTP_CLIENT` (for example `jdbc:clickhouse://clickhousehost:8123/default?http_connection_provider=APACHE_HTTP_CLIENT`).

## Read from the ClickHouse Table

Perform the following procedure to create a PXF external table that references the `pxf_ch_types` ClickHouse table, and reads the data in the table:

1. Create a PXF readable external table using the `jdbc` profile. Substitute your ClickHouse host, port, and driver class as appropriate:

   ```sql
   CREATE EXTERNAL TABLE pxf_ch_read(
     i_int int, s_small smallint, b_big bigint,
     f_float32 real, d_float64 double precision, b_bool boolean,
     dec numeric, t_text text, bin bytea, d_date date,
     d_ts timestamp, d_tstz timestamp with time zone, d_uuid uuid)
     LOCATION ('pxf://default.pxf_ch_types?PROFILE=jdbc&JDBC_DRIVER=com.clickhouse.jdbc.ClickHouseDriver&DB_URL=jdbc:clickhouse://clickhousehost:8123/default')
     FORMAT 'CUSTOM' (FORMATTER='pxfwritable_import');
   ```

2. Read the data:

   ```sql
   SELECT * FROM pxf_ch_read ORDER BY i_int;
   ```

## Write to the ClickHouse Table

Perform the following procedure to create a PXF writable external table that references the `pxf_ch_types` ClickHouse table, and writes data to the table:

1. Create a PXF writable external table:

   ```sql
   CREATE WRITABLE EXTERNAL TABLE pxf_ch_write(
     i_int int, s_small smallint, b_big bigint,
     f_float32 real, d_float64 double precision, b_bool boolean,
     dec numeric, t_text text, bin bytea, d_date date,
     d_ts timestamp, d_tstz timestamp with time zone, d_uuid uuid)
     LOCATION ('pxf://default.pxf_ch_types?PROFILE=jdbc&JDBC_DRIVER=com.clickhouse.jdbc.ClickHouseDriver&DB_URL=jdbc:clickhouse://clickhousehost:8123/default')
     FORMAT 'CUSTOM' (FORMATTER='pxfwritable_export');
   ```

2. Write data:

   ```sql
   INSERT INTO pxf_ch_write VALUES
     (2, 3, 4, 2.25, 4.1415926, true, CAST('12345.6789012345' AS numeric),
      'hello2', decode('41424344','hex'), DATE '2020-01-02',
      TIMESTAMP '2020-01-02 03:04:05.006',
      TIMESTAMPTZ '2020-01-02 03:04:05.006+00',
      '550e8400-e29b-41d4-a716-446655440000'::uuid);
   ```

3. Read the data back:

   ```sql
   SELECT * FROM pxf_ch_read ORDER BY i_int;
   ```

## Data Type Mapping and Limitations

PXF supports the following JDBC data types (see [JDBC Data Types Supported](./jdbc_pxf.md#data-types-supported)).
For ClickHouse, the typical JDBC-side mappings are:

- `INTEGER`, `SMALLINT`, `BIGINT` → `Int32`, `Int16`, `Int64`
- `REAL`, `FLOAT8` → `Float32`, `Float64`
- `NUMERIC` → `Decimal(precision, scale)`
- `BOOLEAN` → `Bool`
- `VARCHAR`, `BPCHAR`, `TEXT` → `String`
- `DATE` → `Date`
- `TIMESTAMP` → `DateTime64(precision, 'UTC')`
- `TIMESTAMPTZ` → `DateTime64(precision, 'UTC')`
- `BYTEA` → `String`
- `UUID` → `UUID`
