---
title: "About Accessing the AWS S3 Object Store"
description: "About accessing the S3 object store with PXF."
source: https://cloudberry.apache.org/pxf/access-objectstores/access_s3
---

# About Accessing the AWS S3 Object Store

PXF is installed with a connector to the AWS S3 object store. PXF supports the following additional runtime features with this connector:

- Overriding the S3 credentials specified in the server configuration by providing them in the `CREATE EXTERNAL TABLE` command DDL.
- Using the Amazon S3 Select service to read certain CSV and Parquet data from S3.

## Overriding the S3 Server Configuration For External Tables

If you are accessing an S3-compatible object store, you can override the credentials in an S3 server configuration by directly specifying the S3 access ID and secret key via these custom options in the `CREATE EXTERNAL TABLE` `LOCATION` clause:

| Custom Option  | Value Description |
|-------|-------------------------------------|
| accesskey    | The AWS S3 account access key ID. |
| secretkey    | The secret key associated with the AWS S3 access key ID. |

For example:
<pre>CREATE EXTERNAL TABLE pxf_ext_tbl(name text, orders int)
  LOCATION ('pxf://S3_BUCKET/dir/file.txt?PROFILE=s3:text&SERVER=s3srvcfg<b>&accesskey=YOURKEY&secretkey=YOURSECRET</b>')
FORMAT 'TEXT' (delimiter=E',');</pre>

> <b>Warning:</b> Credentials that you provide in this manner are visible as part of the external table definition. Do not use this method of passing credentials in a production environment.

PXF does not support overriding Azure, Google Cloud Storage, and MinIO server credentials in this manner at this time.

Refer to [Configuration Property Precedence](../administering/configuring/cfg_server.md#about-configuration-property-precedence) for detailed information about the precedence rules that PXF uses to obtain configuration property settings for an Apache Cloudberry user.

## Overriding the S3 Server Configuration For Foreign Tables

PXF supports accessing S3 data using the Foreign Data Wrapper (FDW) framework, which provides an alternative to the External Table Framework. To access S3 using Foreign Data Wrappers, you must first create a server that defines the S3 connection parameters.

The following command creates a server named `s3srvcfg` that uses the `s3_pxf_fdw` foreign data wrapper. It will use credentials from PXF server configuration.

<pre>CREATE SERVER s3srvcfg FOREIGN DATA WRAPPER s3_pxf_fdw;</pre>

However, you can override the custom options by using the `OPTIONS` clause in the `CREATE SERVER` command. The following command creates a server named `s3srvcfg` that uses the `s3_pxf_fdw` foreign data wrapper and specifies the S3 access credentials:

<pre>CREATE SERVER s3srvcfg FOREIGN DATA WRAPPER s3_pxf_fdw
  OPTIONS (accesskey 'YOURKEY', secretkey 'YOURSECRET');</pre>

Replace `YOURKEY` with your AWS S3 access key ID and `YOURSECRET` with your AWS S3 secret access key.

Following options are supported:
| Option | Description |
|-------|-------------------------------------|
| accesskey    | The AWS S3 account access key ID. |
| secretkey    | The secret key associated with the AWS S3 access key ID. |

> <b>Warning:</b> Credentials that you provide in this manner are visible as part of the external table definition. Do not use this method of passing credentials in a production environment.

PXF does not support overriding Azure, Google Cloud Storage, and MinIO server credentials in this manner at this time.

Refer to [Configuration Property Precedence](../administering/configuring/cfg_server.md#about-configuration-property-precedence) for detailed information about the precedence rules that PXF uses to obtain configuration property settings for an Apache Cloudberry user.

> <b>Warning:</b> Credentials that you provide in the server configuration or user mapping are stored in the Apache Cloudberry system catalogs. Ensure that you follow your organization's security policies for managing database credentials.

## Using the Amazon S3 Select Service

Refer to [Reading CSV and Parquet Data from S3 Using S3 Select](./read_s3_s3select.md) for specific information on how PXF can use the Amazon S3 Select service to read CSV and Parquet files stored on S3.
