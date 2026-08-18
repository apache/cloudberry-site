---
title: "Reading a Multi-Line Text File into a Single Table Row"
description: "Reading a multi-line text file as a single table row from object storage via PXF."
source: https://cloudberry.apache.org/pxf/access-objectstores/objstore_fileasrow
---

# Reading a Multi-Line Text File into a Single Table Row

The PXF object store connectors support reading a multi-line text file as a single table row. This section describes how to use PXF to read multi-line text and JSON data files in an object store, including how to create an external table that references multiple files in the store.

PXF supports reading only text and JSON files in this manner.

**Note**: Accessing multi-line files from an object store is very similar to accessing multi-line files in HDFS. This topic identifies the object store-specific information required to read these files. Refer to the [PXF HDFS documentation](../access-hadoop/hdfs_fileasrow.md) for more information.

## Prerequisites

Ensure that you have met the PXF Object Store [Prerequisites](./access_objstore.md#prerequisites) before you attempt to read data from multiple files residing in an object store.

## Creating the External Table

Use the `<objstore>:text:multi` profile to read multiple files in an object store each into a single table row. PXF supports the following `<objstore>` profile prefixes:

| Object Store  | Profile Prefix |
|-------|-------------------------------------|
| Azure Blob Storage   | wasbs |
| Azure Data Lake Storage Gen2    | abfss |
| Google Cloud Storage    | gs |
| MinIO    | s3 |
| S3    | s3 |

The following syntax creates an Apache Cloudberry readable external table that references one or more text files in an object store:

``` sql
CREATE EXTERNAL TABLE <table_name>
    ( <column_name> text|json | LIKE <other_table> )
  LOCATION ('pxf://<path-to-files>?PROFILE=<objstore>:text:multi&SERVER=<server_name>[&IGNORE_MISSING_PATH=<boolean>]&FILE_AS_ROW=true')
  FORMAT 'CSV');
```

The specific keywords and values used in the Apache Cloudberry [CREATE EXTERNAL TABLE](https://cloudberry.apache.org/docs/sql-stmts/create-external-table) command are described in the table below.

| Keyword  | Value |
|-------|-------------------------------------|
| \<path&#8209;to&#8209;files\>    | The path to the directory or files in the object store. When the `<server_name>` configuration includes a [`pxf.fs.basePath`](../administering/configuring/cfg_server.md#about-the-pxffsbasepath-property) property setting, PXF considers \<path&#8209;to&#8209;files\> to be relative to the base path specified. Otherwise, PXF considers it to be an absolute path. \<path&#8209;to&#8209;files\> must not specify a relative path nor include the dollar sign (`$`) character. |
| PROFILE=\<objstore\>:text:multi    | The `PROFILE` keyword must identify the specific object store. For example, `s3:text:multi`. |
| SERVER=\<server_name\>    | The named server configuration that PXF uses to access the data. |
| IGNORE_MISSING_PATH=\<boolean\> | Specify the action to take when \<path-to-files\> is missing or invalid. The default value is `false`, PXF returns an error in this situation. When the value is `true`, PXF ignores missing path errors and returns an empty fragment. |
| FILE\_AS\_ROW=true    | The required option that instructs PXF to read each file into a single table row. |
| FORMAT | The `FORMAT` must specify `'CSV'`.  |

If you are accessing an S3 object store, you can provide S3 credentials via custom options in the `CREATE EXTERNAL TABLE` command as described in [Overriding the S3 Server Configuration for External Tables](./access_s3.md#overriding-the-s3-server-configuration-for-external-tables).

## Example

Refer to [Example: Reading an HDFS Text File into a Single Table Row](../access-hadoop/hdfs_fileasrow.md#example-reading-an-hdfs-text-file-into-a-single-table-row) in the PXF HDFS documentation for an example. Modifications that you must make to run the example with an object store include:

- Copying the file to the object store instead of HDFS. For example, to copy the file to S3:

    ``` shell
    $ aws s3 cp /tmp/file1.txt s3://BUCKET/pxf_examples/tdir
    $ aws s3 cp /tmp/file2.txt s3://BUCKET/pxf_examples/tdir
    $ aws s3 cp /tmp/file3.txt s3://BUCKET/pxf_examples/tdir
    ```

- Using the `CREATE EXTERNAL TABLE` syntax and `LOCATION` keywords and settings described above. For example, if your server name is `s3srvcfg`:

    ``` sql
    CREATE EXTERNAL TABLE pxf_readfileasrow_s3( c1 text )
      LOCATION('pxf://BUCKET/pxf_examples/tdir?PROFILE=s3:text:multi&SERVER=s3srvcfg&FILE_AS_ROW=true')
    FORMAT 'CSV'
    ```
