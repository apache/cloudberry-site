---
title: "Reading and Writing Parquet Data in an Object Store"
description: "Reading and writing Parquet data in object stores via PXF."
source: https://cloudberry.apache.org/pxf/access-objectstores/objstore_parquet
---

# Reading and Writing Parquet Data in an Object Store

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

The PXF object store connectors support reading and writing Parquet-format data. This section describes how to use PXF to access Parquet-format data in an object store, including how to create and query an external table that references a Parquet file in the store.

**Note**: Accessing Parquet-format data from an object store is very similar to accessing Parquet-format data in HDFS. This topic identifies object store-specific information required to read and write Parquet data, and links to the [PXF HDFS Parquet documentation](../access-hadoop/hdfs_parquet.md) where appropriate for common information.

## Prerequisites

Ensure that you have met the PXF Object Store [Prerequisites](./access_objstore.md#prerequisites) before you attempt to read data from or write data to an object store.

## Data Type Mapping

Refer to [Data Type Mapping](../access-hadoop/hdfs_parquet.md#data-type-mapping) in the PXF HDFS Parquet documentation for a description of the mapping between Apache Cloudberry and Parquet data types.

## Creating the External Table

The PXF `<objstore>:parquet` profiles support reading and writing data in Parquet format. PXF supports the following `<objstore>` profile prefixes:

| Object Store  | Profile Prefix |
|-------|-------------------------------------|
| Azure Blob Storage   | wasbs |
| Azure Data Lake Storage Gen2   | abfss |
| Google Cloud Storage    | gs |
| MinIO    | s3 |
| S3    | s3 |

Use the following syntax to create an Apache Cloudberry external table that references an HDFS directory. When you insert records into a writable external table, the block(s) of data that you insert are written to one or more files in the directory that you specified.

``` sql
CREATE [WRITABLE] EXTERNAL TABLE <table_name>
    ( <column_name> <data_type> [, ...] | LIKE <other_table> )
LOCATION ('pxf://<path-to-dir>
    ?PROFILE=<objstore>:parquet&SERVER=<server_name>[&<custom-option>=<value>[...]]')
FORMAT 'CUSTOM' (FORMATTER='pxfwritable_import'|'pxfwritable_export')
[DISTRIBUTED BY (<column_name> [, ... ] ) | DISTRIBUTED RANDOMLY];
```

The specific keywords and values used in the Apache Cloudberry [CREATE EXTERNAL TABLE](https://cloudberry.apache.org/docs/sql-stmts/create-external-table/) command are described in the table below.

| Keyword  | Value |
|-------|-------------------------------------|
| \<path&#8209;to&#8209;dir\>    | The path to the directory in the object store. When the `<server_name>` configuration includes a [`pxf.fs.basePath`](../administering/configuring/cfg_server.md#about-the-pxffsbasepath-property) property setting, PXF considers \<path&#8209;to&#8209;dir\> to be relative to the base path specified. Otherwise, PXF considers it to be an absolute path. \<path&#8209;to&#8209;dir\> must not specify a relative path nor include the dollar sign (`$`) character. |
| PROFILE=\<objstore\>:parquet    | The `PROFILE` keyword must identify the specific object store. For example, `s3:parquet`. |
| SERVER=\<server_name\>    | The named server configuration that PXF uses to access the data. |
| \<custom&#8209;option\>=\<value\> | Parquet-specific custom options are described in the [PXF HDFS Parquet documentation](../access-hadoop/hdfs_parquet.md#custom-options). |
| FORMAT 'CUSTOM' | Use `FORMAT` '`CUSTOM`' with `(FORMATTER='pxfwritable_export')` (write) or `(FORMATTER='pxfwritable_import')` (read). |
| DISTRIBUTED BY    | If you want to load data from an existing Apache Cloudberry table into the writable external table, consider specifying the same distribution policy or `<column_name>` on both tables. Doing so will avoid extra motion of data between segments on the load operation. |

If you are accessing an S3 object store:

- You can provide S3 credentials via custom options in the `CREATE EXTERNAL TABLE` command as described in [Overriding the S3 Server Configuration for External Tables DDL](./access_s3.md#overriding-the-s3-server-configuration-for-external-tables).
- If you are reading Parquet data from S3, you can direct PXF to use the S3 Select Amazon service to retrieve the data. Refer to [Using the Amazon S3 Select Service](./access_s3.md#using-the-amazon-s3-select-service) for more information about the PXF custom option used for this purpose.

## Creating the Foreign Table

Use one of the following foreign data wrappers with `format 'parquet'`.

| Object Store  | Foreign Data Wrapper |
|-------|-------------------------------------|
| Azure Blob Storage   | wasbs_pxf_fdw |
| Azure Data Lake Storage Gen2    | abfss_pxf_fdw |
| Google Cloud Storage    | gs_pxf_fdw |
| MinIO    | s3_pxf_fdw |
| S3    | s3_pxf_fdw |

The following syntax creates an Apache Cloudberry foreign table that references an Parquet-format file:

``` sql
CREATE SERVER <foreign_server> FOREIGN DATA WRAPPER <store>_pxf_fdw;
CREATE USER MAPPING FOR <user_name> SERVER <foreign_server>;

CREATE FOREIGN TABLE [ IF NOT EXISTS ] <table_name>
    ( <column_name> <data_type> [, ...] | LIKE <other_table> )
  SERVER <foreign_server>
  OPTIONS ( resource '<path-to-file>', format 'parquet' [, <custom-option> '<value>' [, ...] ]);
```

| Keyword  | Value |
|-------|-------------------------------------|
| \<foreign_server\>    | The named server configuration that PXF uses to access the data. You can override credentials in `CREATE SERVER` statement as described in [Overriding the S3 Server Configuration for Foreign Tables](./access_s3.md#overriding-the-s3-server-configuration-for-foreign-tables) |
| resource \<path&#8209;to&#8209;file\>    | The path to the directory or file in the object store. When the `<server_name>` configuration includes a [`pxf.fs.basePath`](../administering/configuring/cfg_server.md#about-the-pxffsbasepath-property) property setting, PXF considers \<path&#8209;to&#8209;file\> to be relative to the base path specified. Otherwise, PXF considers it to be an absolute path. \<path&#8209;to&#8209;file\> must not specify a relative path nor include the dollar sign (`$`) character. |
| format 'parquet'  | The file format; specify `'parquet'` for Parquet-formatted data. |
| \<custom&#8209;option\>=\<value\> | parquet-specific custom options are described in the [PXF HDFS parquet documentation](../access-hadoop/hdfs_parquet.md#custom-options). |

## Example

Refer to the [Example](../access-hadoop/hdfs_parquet.md#example) in the PXF HDFS Parquet documentation for a Parquet write/read example. Modifications that you must make to run the example with an object store include:

- Using the `CREATE WRITABLE EXTERNAL TABLE` syntax and `LOCATION` keywords and settings described above for the writable and readable external tables. For example, if your server name is `s3srvcfg`:

    ``` sql
    CREATE WRITABLE EXTERNAL TABLE pxf_tbl_parquet_s3 (location text, month text, number_of_orders int, item_quantity_per_order int[], total_sales double precision)
      LOCATION ('pxf://BUCKET/pxf_examples/pxf_parquet?PROFILE=s3:parquet&SERVER=s3srvcfg')
    FORMAT 'CUSTOM' (FORMATTER='pxfwritable_export');

    CREATE EXTERNAL TABLE read_pxf_parquet_s3(location text, month text, number_of_orders int, item_quantity_per_order int[], total_sales double precision)
      LOCATION ('pxf://BUCKET/pxf_examples/pxf_parquet?PROFILE=s3:parquet&SERVER=s3srvcfg')
    FORMAT 'CUSTOM' (FORMATTER='pxfwritable_import');
    ```
- Using the `CREATE FOREIGN TABLE` syntax and settings described above for the foreign table. For example, if your server name is `s3srvcfg`:

    ``` sql
	CREATE SERVER s3srvcfg FOREIGN DATA WRAPPER s3_pxf_fdw;
	CREATE USER MAPPING FOR CURRENT_USER SERVER s3srvcfg;

	CREATE FOREIGN TABLE pxf_parquet_s3 (location text, month text, number_of_orders int, item_quantity_per_order int[], total_sales double precision)
	SERVER s3srvcfg
	OPTIONS (
		resource 'BUCKET/pxf_examples/pxf_parquet',
		format 'parquet'
	)
    ```
