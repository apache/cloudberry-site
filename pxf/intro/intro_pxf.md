---
title: "Introduction to PXF"
description: "PXF concepts, supported platforms, architecture, and external table syntax."
source: https://cloudberry.apache.org/pxf/intro/intro_pxf
---

# Introduction to PXF

The Apache Cloudberry Platform Extension Framework (PXF) provides *connectors* that enable you to access data stored in sources external to your Apache Cloudberry deployment. These connectors map an external data source to an Apache Cloudberry *external table* definition. When you create the Apache Cloudberry external table, you identify the external data store and the format of the data via a *server* name and a *profile* name that you provide in the command.

You can query the external table via Apache Cloudberry, leaving the referenced data in place. Or, you can use the external table to load the data into Apache Cloudberry for higher performance.

## Supported Platforms

### Operating Systems

PXF is compatible with these operating system platforms and Apache Cloudberry versions:

| OS Version | Apache Cloudberry Version |
|--------------|-----------------|
| Rocky Linux 8, Rocky Linux 9, Ubuntu 22.04 | 2.0, 2.1 |
| Rocky Linux 8, Rocky Linux 9, Ubuntu 22.04, **Rocky Linux 10**, **Ubuntu 24.04** | 2.2+ (planned) |

### Java

PXF supports Java 8 and Java 11.

### Hadoop

PXF bundles all of the Hadoop JAR files on which it depends, and supports the following Hadoop component versions:

| Hadoop Version | Hive Server Version | HBase Server Version |
|----------------|---------------------|-------------|
| 2.x, 3.1+ | 1.x, 2.x, 3.1+ | 2.3.7 |

## Architectural Overview

Your Apache Cloudberry deployment consists of a coordinator host, a standby coordinator host, and multiple segment hosts. A single PXF Service process runs on each Apache Cloudberry host. The PXF Service process running on a segment host allocates a worker thread for each segment instance on the host that participates in a query against an external table. The PXF Services on multiple segment hosts communicate with the external data store in parallel. The PXF Service process running on the coordinator and standby coordinator hosts are not currently involved in data transfer; these processes may be used for other purposes in the future.

## About Connectors, Servers, and Profiles

*Connector* is a generic term that encapsulates the implementation details required to read from or write to an external data store. PXF provides built-in connectors to Hadoop (HDFS, Hive, HBase), object stores (Azure, Google Cloud Storage, MinIO, AWS S3, and Dell ECS), and SQL databases (via JDBC).

A PXF *Server* is a named configuration for a connector. A server definition provides the information required for PXF to access an external data source. This configuration information is data-store-specific, and may include server location, access credentials, and other relevant properties.

The Apache Cloudberry administrator will configure at least one server definition for each external data store that they will allow Apache Cloudberry users to access, and will publish the available server names as appropriate.

You specify a `SERVER=<server_name>` setting when you create the external table to identify the server configuration from which to obtain the configuration and credentials to access the external data store.

The default PXF server is named `default` (reserved), and when configured provides the location and access information for the external data source in the absence of a `SERVER=<server_name>` setting.

Finally, a PXF *profile* is a named mapping identifying a specific data format or protocol supported by a specific external data store. PXF supports text, Avro, JSON, RCFile, Parquet, SequenceFile, and ORC data formats, and the JDBC protocol, and provides several built-in profiles as discussed in the following section.

## Creating an External Table

PXF implements an Apache Cloudberry protocol named `pxf` that you can use to create an external table that references data in an external data store. The syntax for a [CREATE EXTERNAL TABLE](https://cloudberry.apache.org/docs/sql-stmts/create-external-table) command that specifies the `pxf` protocol follows:

``` sql
CREATE [WRITABLE] EXTERNAL TABLE <table_name>
        ( <column_name> <data_type> [, ...] | LIKE <other_table> )
LOCATION('pxf://<path-to-data>?PROFILE=<profile_name>[&SERVER=<server_name>][&<custom-option>=<value>[...]]')
FORMAT '[TEXT|CSV|CUSTOM]' (<formatting-properties>);
```

The `LOCATION` clause in a `CREATE EXTERNAL TABLE` statement specifying the `pxf` protocol is a URI. This URI identifies the path to, or other information describing, the location of the external data. For example, if the external data store is HDFS, the `<path-to-data>` identifies the absolute path to a specific HDFS file. If the external data store is Hive, `<path-to-data>` identifies a schema-qualified Hive table name.

You use the query portion of the URI, introduced by the question mark (?), to identify the PXF server and profile names.

PXF may require additional information to read or write certain data formats. You provide profile-specific information using the optional `<custom-option>=<value>` component of the `LOCATION` string and formatting information via the `<formatting-properties>` component of the string. The custom options and formatting properties supported by a specific profile vary; they are identified in usage documentation for the profile.

Table 1. CREATE EXTERNAL TABLE Parameter Values and Descriptions

<a id="creatinganexternaltable__table_pfy_htz_4p"></a>

| Keyword               | Value and Description                                                                                                                                                                                                                                                          |
|-------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| \<path&#8209;to&#8209;data\>        | A directory, file name, wildcard pattern, table name, etc. The syntax of \<path-to-data\> is dependent upon the external data source.                                                                                                                                                                                                                    |
| PROFILE=\<profile_name\>  | The profile that PXF uses to access the data. PXF supports profiles that access text, Avro, JSON, RCFile, Parquet, SequenceFile, and ORC data in [Hadoop services](../access-hadoop/access_hdfs.md), [object stores](../access-objectstores/access_objstore.md), [network file systems](../access-nfs/nfs_pxf.md), and [other SQL databases](../access-jdbc/jdbc_pxf.md).  |
| SERVER=\<server_name\>   | The named server configuration that PXF uses to access the data. PXF uses the `default` server if not specified. |
| \<custom&#8209;option\>=\<value\> | Additional options and their values supported by the profile or the server. |
| FORMAT&nbsp;\<value\>| PXF profiles support the `TEXT`, `CSV`, and `CUSTOM` formats.  |
| \<formatting&#8209;properties\> | Formatting properties supported by the profile; for example, the `FORMATTER` or `delimiter`.                                                                   |

**Note:** When you create a PXF external table, you cannot use the `HEADER` option in your formatter specification.

## Other PXF Features

Certain PXF connectors and profiles support filter pushdown and column projection. Refer to the following topics for detailed information about this support:

- [About PXF Filter Pushdown](./filter_push.md)
- [About Column Projection in PXF](./col_project.md)
