---
title: "Accessing Hadoop"
description: "Accessing Hadoop services with PXF."
source: https://cloudberry.apache.org/pxf/access-hadoop/access_hdfs
---

# Accessing Hadoop

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

PXF is compatible with Cloudera, Hortonworks Data Platform, and generic Apache Hadoop distributions. PXF is installed with HDFS, Hive, and HBase connectors. You use these connectors to access varied formats of data from these Hadoop distributions.

## Architecture

HDFS is the primary distributed storage mechanism used by Apache Hadoop. When a user or application performs a query on a PXF external table that references an HDFS file, the Apache Cloudberry coordinator host dispatches the query to all segment instances. Each segment instance contacts the PXF Service running on its host. When it receives the request from a segment instance, the PXF Service:

1. Allocates a worker thread to serve the request from the segment instance.
2. Invokes the HDFS Java API to request metadata information for the HDFS file from the HDFS NameNode. 

<span className="figtitleprefix">Figure: </span>PXF-to-Hadoop Architecture

![Apache Cloudberry Platform Extenstion Framework to Hadoop Architecture](../graphics/pxfarch.png "Apache Cloudberry Platform Extension Framework-to-Hadoop Architecture")

A PXF worker thread works on behalf of a segment instance. A worker thread uses its Apache Cloudberry `gp_segment_id` and the file block information described in the metadata to assign itself a specific portion of the query data. This data may reside on one or more HDFS DataNodes.

The PXF worker thread invokes the HDFS Java API to read the data and delivers it to the segment instance. The segment instance delivers its portion of the data to the Apache Cloudberry coordinator host. This communication occurs across segment hosts and segment instances in parallel.

## Prerequisites

Before working with Hadoop data using PXF, ensure that:

- You have configured PXF, and PXF is running on each Apache Cloudberry host. See [Configuring PXF](../administering/configuring/instcfg_pxf.md) for additional information.
- You have configured the PXF Hadoop Connectors that you plan to use. Refer to [Configuring PXF Hadoop Connectors](../administering/configuring/hadoop-connectors/client_instcfg.md) for instructions. If you plan to access JSON-formatted data stored in a Cloudera Hadoop cluster, PXF requires a Cloudera version 5.8 or later Hadoop distribution.
- If user impersonation is enabled (the default), ensure that you have granted read (and write as appropriate) permission to the HDFS files and directories that will be accessed as external tables in Apache Cloudberry to each Apache Cloudberry user/role name that will access the HDFS files and directories. If user impersonation is not enabled, you must grant this permission to the `gpadmin` user.
- Time is synchronized between the Apache Cloudberry hosts and the external Hadoop systems.

## HDFS Shell Command Primer
Examples in the PXF Hadoop topics access files on HDFS. You can choose to access files that already exist in your HDFS cluster. Or, you can follow the steps in the examples to create new files.

A Hadoop installation includes command-line tools that interact directly with your HDFS file system. These tools support typical file system operations that include copying and listing files, changing file permissions, and so forth. You run these tools on a system with a Hadoop client installation. By default, Apache Cloudberry hosts do not
include a Hadoop client installation.

The HDFS file system command syntax is `hdfs dfs <options> [<file>]`. Invoked with no options, `hdfs dfs` lists the file system options supported by the tool.

The user invoking the `hdfs dfs` command must have read privileges on the HDFS data store to list and view directory and file contents, and write permission to create directories and files.

The `hdfs dfs` options used in the PXF Hadoop topics are:

| Option  | Description |
|-------|-------------------------------------|
| `-cat`    | Display file contents. |
| `-mkdir`    | Create a directory in HDFS. |
| `-put`    | Copy a file from the local file system to HDFS. |

Examples:

Create a directory in HDFS:

``` shell
$ hdfs dfs -mkdir -p /data/pxf_examples
```

Copy a text file from your local file system to HDFS:

``` shell
$ hdfs dfs -put /tmp/example.txt /data/pxf_examples/
```

Display the contents of a text file located in HDFS:

``` shell
$ hdfs dfs -cat /data/pxf_examples/example.txt
```

## Connectors, Data Formats, and Profiles

The PXF Hadoop connectors provide built-in profiles to support the following data formats:

- Text
- CSV
- Avro
- JSON
- ORC
- Parquet
- RCFile
- SequenceFile
- AvroSequenceFile

The PXF Hadoop connectors expose the following profiles to read, and in many cases write, these supported data formats:

| Data Source | Data Format | Profile Name(s) | Foreign Data Wrapper format | Supported Operations |
|-------------|------|---------|-----|-----|
| HDFS | delimited single line [text](./hdfs_text.md#reading-text-data) | hdfs:text | text | Read, Write |
| HDFS | delimited single line comma-separated values of [text](./hdfs_text.md#reading-text-data) | hdfs:csv | csv | Read, Write |
| HDFS | multi-byte or multi-character delimited single line [csv](./hdfs_text.md#about-reading-data-containing-multi-byte-or-multi-character-delimiters) | hdfs:csv | csv | Read |
| HDFS | fixed width single line [text](./hdfs_fixedwidth.md) | hdfs:fixedwidth | | Read, Write |
| HDFS | delimited [text with quoted linefeeds](./hdfs_text.md#reading-text-data-with-quoted-linefeeds) | hdfs:text:multi | text:multi | Read |
| HDFS | [Avro](./hdfs_avro.md) | hdfs:avro | avro | Read, Write |
| HDFS | [JSON](./hdfs_json.md) | hdfs:json | json | Read, Write |
| HDFS | [ORC](./hdfs_orc.md) | hdfs:orc | orc | Read, Write |
| HDFS | [Parquet](./hdfs_parquet.md) | hdfs:parquet | parquet | Read, Write |
| HDFS | AvroSequenceFile | hdfs:AvroSequenceFile | AvroSequenceFile | Read, Write |
| HDFS | [SequenceFile](./hdfs_seqfile.md) | hdfs:SequenceFile | SequenceFile | Read, Write |
| [Hive](./hive_pxf.md) | stored as TextFile | hive, [hive:text](./hive_pxf.md#accessing-textfile-format-hive-tables) |  | Read |
| [Hive](./hive_pxf.md) | stored as SequenceFile | hive |  | Read |
| [Hive](./hive_pxf.md) | stored as RCFile | hive, [hive:rc](./hive_pxf.md#accessing-rcfile-format-hive-tables) | | Read |
| [Hive](./hive_pxf.md) | stored as ORC | hive, [hive:orc](./hive_pxf.md#accessing-orc-format-hive-tables) | orc | Read |
| [Hive](./hive_pxf.md) | stored as Parquet | hive | | Read |
| [Hive](./hive_pxf.md) | stored as Avro | hive | | Read |
| [HBase](./hbase_pxf.md) | Any | hbase | - | Read |

### Choosing the Profile

PXF provides more than one profile to access text and Parquet data on Hadoop. Here are some things to consider as you determine which profile to choose.

Choose the `hive` profile when:

- The data resides in a Hive table, and you do not know the underlying file type of the table up front.
- The data resides in a Hive table, and the Hive table is partitioned.

Choose the `hdfs:text`, `hdfs:csv` profiles when the file is text and you know the location of the file in the HDFS file system.

When accessing ORC-format data:

- Choose the `hdfs:orc` profile when the file is ORC, you know the location of the file in the HDFS file system, and the file is not managed by Hive or you do not want to use the Hive Metastore.
- Choose the `hive:orc` profile when the table is ORC and the table is managed by Hive, and the data is partitioned or the data includes complex types.

Choose the `hdfs:parquet` profile when the file is Parquet, you know the location of the file in the HDFS file system, and you want to take advantage of extended filter pushdown support for additional data types and operators.

### Specifying the Profile for External Tables

You must provide the profile name when you specify the `pxf` protocol in a `CREATE EXTERNAL TABLE` command to create an Apache Cloudberry external table that references a Hadoop file or directory, HBase table, or Hive table. For example, the following command creates an external table that uses the default server and specifies the profile named `hdfs:text` to access the HDFS file `/data/pxf_examples/pxf_hdfs_simple.txt`:

``` sql
CREATE EXTERNAL TABLE pxf_hdfs_text(location text, month text, num_orders int, total_sales float8)
   LOCATION ('pxf://data/pxf_examples/pxf_hdfs_simple.txt?PROFILE=hdfs:text')
FORMAT 'TEXT' (delimiter=E',');
```

### Specifying the Profile for Foreign Tables

When you use the `hdfs_pxf_fdw`, `hive_pxf_fdw`, or `hbase_pxf_fdw` foreign data wrapper in a `CREATE FOREIGN TABLE` command, you must specify a server name you configuredin Prerequisites section above. The foreign table can reference a Hadoop file or directory, an HBase table, or a Hive table. For example, the following commands create a foreign server named `hadoop_server` with the `hdfs_pxf_fdw` foreign data wrapper, then create a foreign table that uses the `text` format to access the HDFS file `data/pxf_examples/pxf_hdfs_simple.txt`:

``` sql
CREATE SERVER hadoop_server FOREIGN DATA WRAPPER hdfs_pxf_fdw;
CREATE USER MAPPING FOR CURRENT_USER SERVER hadoop_server;

CREATE FOREIGN TABLE pxf_parquet_s3 (location text, month text, num_orders int, total_sales float8)
SERVER hadoop_server
OPTIONS (
  resource 'data/pxf_examples/pxf_hdfs_simple.txt',
  format 'text',
  delimiter=E','
)
```
