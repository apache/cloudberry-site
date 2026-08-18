---
title: "Reading and Writing ORC Data in an Object Store"
description: "Reading and writing ORC data in object stores via PXF."
source: https://cloudberry.apache.org/pxf/access-objectstores/objstore_orc
---

# Reading and Writing ORC Data in an Object Store

The PXF object store connectors support reading and writing ORC-formatted data. This section describes how to use PXF to access ORC data in an object store, including how to create and query an external table that references a file in the store.

**Note**: Accessing ORC-formatted data from an object store is very similar to accessing ORC-formatted data in HDFS. This topic identifies object store-specific information required to read and write ORC data, and links to the [PXF Hadoop ORC documentation](../access-hadoop/hdfs_orc.md) where appropriate for common information.

## Prerequisites

Ensure that you have met the PXF Object Store [Prerequisites](./access_objstore.md#prerequisites) before you attempt to read data from or write data to an object store.

## Data Type Mapping

Refer to [Data Type Mapping](../access-hadoop/hdfs_orc.md#data-type-mapping) in the PXF Hadoop ORC documentation for a description of the mapping between Apache Cloudberry and ORC data types.

## Creating the External Table

The PXF `<objstore>:orc` profiles support reading and writing data in ORC format. PXF supports the following `<objstore>` profile prefixes:

| Object Store  | Profile Prefix |
|-------|------------------------|
| Azure Blob Storage   | wasbs |
| Azure Data Lake Storage Gen2    | abfss |
| Google Cloud Storage    | gs |
| MinIO    | s3 |
| S3    | s3 |

Use the following syntax to create an Apache Cloudberry external table that references an object store file. When you insert records into a writable external table, the block(s) of data that you insert are written to one or more files in the directory that you specified.

``` sql
CREATE [WRITABLE] EXTERNAL TABLE <table_name>
    ( <column_name> <data_type> [, ...] | LIKE <other_table> )
LOCATION ('pxf://<path-to-file>?PROFILE=<objstore>:orc&SERVER=<server_name>[&<custom-option>=<value>[...]]')
FORMAT 'CUSTOM' (FORMATTER='pxfwritable_import'|'pxfwritable_export')
[DISTRIBUTED BY (<column_name> [, ... ] ) | DISTRIBUTED RANDOMLY];
```

The specific keywords and values used in the Apache Cloudberry [CREATE EXTERNAL TABLE](https://cloudberry.apache.org/docs/sql-stmts/create-external-table) command are described in the table below.

| Keyword  | Value |
|-------|-------------------------------------|
| \<path&#8209;to&#8209;file\>    | The path to the directory or file in the object store. When the `<server_name>` configuration includes a [`pxf.fs.basePath`](../administering/configuring/cfg_server.md#about-the-pxffsbasepath-property) property setting, PXF considers \<path&#8209;to&#8209;file\> to be relative to the base path specified. Otherwise, PXF considers it to be an absolute path. \<path&#8209;to&#8209;file\> must not specify a relative path nor include the dollar sign (`$`) character. |
| PROFILE=\<objstore\>:orc    | The `PROFILE` keyword must identify the specific object store. For example, `s3:orc`. |
| SERVER=\<server_name\>    | The named server configuration that PXF uses to access the data. |
| \<custom&#8209;option\>=\<value\> | ORC supports customs options as described in the [PXF Hadoop ORC documentation](../access-hadoop/hdfs_orc.md#custom-options). |
| FORMAT 'CUSTOM' | Use `FORMAT` '`CUSTOM`' with `(FORMATTER='pxfwritable_export')` (write) or `(FORMATTER='pxfwritable_import')` (read). |
| DISTRIBUTED BY    | If you want to load data from an existing Apache Cloudberry table into the writable external table, consider specifying the same distribution policy or `<column_name>` on both tables. Doing so will avoid extra motion of data between segments on the load operation. |

If you are accessing an S3 object store, you can provide S3 credentials via custom options in the `CREATE EXTERNAL TABLE` command as described in [Overriding the S3 Server Configuration for External Tables](./access_s3.md#overriding-the-s3-server-configuration-for-external-tables).

## Creating the Foreign Table

Use one of the following foreign data wrappers with `format 'orc'`.

| Object Store  | Foreign Data Wrapper |
|-------|-------------------------------------|
| Azure Blob Storage   | wasbs_pxf_fdw |
| Azure Data Lake Storage Gen2    | abfss_pxf_fdw |
| Google Cloud Storage    | gs_pxf_fdw |
| MinIO    | s3_pxf_fdw |
| S3    | s3_pxf_fdw |

The following syntax creates an Apache Cloudberry foreign table that references an ORC-format file:

``` sql
CREATE SERVER <foreign_server> FOREIGN DATA WRAPPER <store>_pxf_fdw;
CREATE USER MAPPING FOR <user_name> SERVER <foreign_server>;

CREATE FOREIGN TABLE [ IF NOT EXISTS ] <table_name>
    ( <column_name> <data_type> [, ...] | LIKE <other_table> )
  SERVER <foreign_server>
  OPTIONS ( resource '<path-to-file>', format 'orc' [, <custom-option> '<value>' [, ...] ]);
```

| Keyword  | Value |
|-------|-------------------------------------|
| \<foreign_server\>    | The named server configuration that PXF uses to access the data. You can override credentials in `CREATE SERVER` statement as described in [Overriding the S3 Server Configuration for Foreign Tables](./access_s3.md#overriding-the-s3-server-configuration-for-foreign-tables) |
| resource \<path&#8209;to&#8209;file\>    | The path to the directory or file in the object store. When the `<server_name>` configuration includes a [`pxf.fs.basePath`](../administering/configuring/cfg_server.md#about-the-pxffsbasepath-property) property setting, PXF considers \<path&#8209;to&#8209;file\> to be relative to the base path specified. Otherwise, PXF considers it to be an absolute path. \<path&#8209;to&#8209;file\> must not specify a relative path nor include the dollar sign (`$`) character. |
| format 'orc'  | The file format; specify `'orc'` for ORC-formatted data. |
| \<custom&#8209;option\>=\<value\> | ORC-specific custom options are described in the [PXF HDFS ORC documentation](../access-hadoop/hdfs_orc.md#custom-options). |

## Example

Refer to [Example: Reading an ORC File on HDFS](../access-hadoop/hdfs_orc.md#example-reading-an-orc-file-on-hdfs) in the PXF Hadoop ORC documentation for an example. Modifications that you must make to run the example with an object store include:

- Copying the ORC file to the object store instead of HDFS. For example, to copy the file to S3:

    ``` shell
    $ aws s3 cp /tmp/sampledata.orc s3://BUCKET/pxf_examples/orc_example/
    ```

- Using the `CREATE EXTERNAL TABLE` syntax and `LOCATION` keywords and settings described above. For example, if your server name is `s3srvcfg`:

    ``` sql
    CREATE EXTERNAL TABLE sample_orc( location TEXT, month TEXT, num_orders INTEGER, total_sales NUMERIC(10,2), items_sold TEXT[] )
      LOCATION('pxf://BUCKET/pxf_examples/orc_example?PROFILE=s3:orc&SERVER=s3srvcfg')
    FORMAT 'CUSTOM' (FORMATTER='pxfwritable_import');
    ```

- Using the `CREATE WRITABLE EXTERNAL TABLE` syntax and `LOCATION` keywords and settings described above for the writable external table. For example, if your server name is `s3srvcfg`:

    ``` sql
    CREATE WRITABLE EXTERNAL TABLE write_to_sample_orc (location TEXT, month TEXT, num_orders INT, total_sales NUMERIC(10,2), items_sold TEXT[])
      LOCATION ('pxf://BUCKET/pxf_examples/orc_example?PROFILE=s3:orc&SERVER=s3srvcfg')
    FORMAT 'CUSTOM' (FORMATTER='pxfwritable_export');
    ```

- Or using the `CREATE FOREIGN TABLE` syntax create one foreign table to read and write operations. For example, if your server name is `s3srvcfg`:

    ``` sql
    CREATE SERVER s3srvcfg FOREIGN DATA WRAPPER s3_pxf_fdw;
    CREATE USER MAPPING FOR CURRENT_USER SERVER s3srvcfg;

    CREATE FOREIGN TABLE sample_orc (location TEXT, month TEXT, num_orders INT, total_sales NUMERIC(10,2), items_sold TEXT[])
    SERVER s3srvcfg
    OPTIONS (
    	resource 'BUCKET/pxf_examples/orc_example',
    	format 'orc'
    )
    ```
