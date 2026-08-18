---
title: "Apache Cloudberry Platform Extension Framework (PXF)"
description: "Overview of the Apache Cloudberry Platform Extension Framework (PXF)."
source: https://cloudberry.apache.org/pxf/overview_pxf
---

# Apache Cloudberry Platform Extension Framework (PXF)

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

With the explosion of data stores and cloud services, data now resides across many disparate systems and in a variety of formats. Often, data is classified both by its location and the operations performed on the data, as well as how often the data is accessed:  real-time or transactional (hot), less frequent (warm), or archival (cold).

The diagram below describes a data source that tracks monthly sales across many years. Real-time operational data is stored in MySQL. Data subject to analytic and business intelligence operations is stored in Apache Cloudberry. The rarely accessed, archival data resides in AWS S3.

![Operational Data Location Example](graphics/datatemp.png "Operational Data Location Example")

When multiple, related data sets exist in external systems, it is often more efficient to join data sets remotely and return only the results, rather than negotiate the time and storage requirements of performing a rather expensive full data load operation. The *Apache Cloudberry Platform Extension Framework (PXF)*, an Apache Cloudberry extension that provides parallel, high throughput data access and federated query processing, provides this capability.

With PXF, you can use Apache Cloudberry and SQL to query these heterogeneous data sources:

- Hadoop, Hive, and HBase
- Azure Blob Storage and Azure Data Lake Storage Gen2
- AWS S3
- MinIO
- Google Cloud Storage
- SQL databases including Apache Ignite, Hive, MySQL, ORACLE, Microsoft SQL Server, DB2, and PostgreSQL (via JDBC)
- Network file systems

And these data formats:

- Avro, AvroSequenceFile
- JSON
- ORC
- Parquet
- RCFile
- SequenceFile
- Text (plain, delimited, embedded line feeds, fixed width)

## Basic Usage

You use PXF to map data from an external source to an Apache Cloudberry *external table* definition. You can then use the PXF external table and SQL to:

- Perform queries on the external data, leaving the referenced data in place on the remote system.
- Load a subset of the external data into Apache Cloudberry.
- Run complex queries on local data residing in Apache Cloudberry tables and remote data referenced via PXF external tables.
- Write data to the external data source.

Check out the [PXF introduction](intro/intro_pxf.md) for a high level overview of important PXF concepts.

## Get Started Configuring PXF

The Apache Cloudberry administrator manages PXF, Apache Cloudberry user privileges, and external data source configuration. Tasks include:

- [Installing](administering/configuring/about_pxf_dir.md), [configuring](administering/configuring/instcfg_pxf.md), [starting](administering/cfginitstart_pxf.md), [monitoring](administering/monitor_pxf.md), and [troubleshooting](troubleshooting/troubleshooting_pxf.md) the PXF Service.
- Managing PXF [upgrade](upgrade/upgrade_landing.md).
- [Configuring](administering/configuring/cfg_server.md) and publishing one or more server definitions for each external data source. This definition specifies the location of, and access credentials to, the external data source. 
- [Granting](administering/using_pxf.md) Apache Cloudberry user access to PXF and PXF external tables.

## Get Started Using PXF

An Apache Cloudberry user [creates](intro/intro_pxf.md#creating-an-external-table) a PXF external table that references a file or other data in the external data source, and uses the external table to query or load the external data in Apache Cloudberry. Tasks are external data store-dependent:

- See [Accessing Hadoop with PXF](access-hadoop/access_hdfs.md) when the data resides in Hadoop.
- See [Accessing Azure, Google Cloud Storage, MinIO, and S3 Object Stores with PXF](access-objectstores/access_objstore.md) when the data resides in an object store.
- See [Accessing an SQL Database with PXF](access-jdbc/jdbc_pxf.md) when the data resides in an external SQL database.
