---
title: Load Data from Amazon S3
---

# Load Data from Amazon S3 Using the `s3` Protocol

The `s3` protocol is used in a URL that specifies the location of an Amazon S3 bucket and a prefix to use for reading or writing files in the bucket.

Amazon Simple Storage Service (Amazon S3) provides secure, durable, highly-scalable object storage. For information about Amazon S3, see [Amazon S3](https://aws.amazon.com/s3/).

You can define read-only external tables that use existing data files in the S3 bucket for table data, or writable external tables that store the data from `INSERT` operations to files in the S3 bucket. Apache Cloudberry uses the S3 URL and prefix specified in the protocol URL either to select one or more files for a read-only table, or to define the location and filename format to use when uploading S3 files for `INSERT` operations to writable tables.

The `s3` protocol also supports [Dell Elastic Cloud Storage](https://www.dell.com/en-us/dt/learn/data-storage/ecs.htm) (ECS), an Amazon S3 compatible service.

:::note
The `pxf` protocol can access data in S3 and other object store systems such as Azure, Google Cloud Storage, and Minio. The `pxf` protocol can also access data in external Hadoop systems (HDFS, Hive, HBase), and SQL databases. See [`pxf://` protocol](/docs/data-loading/load-data-using-pxf.md).
:::

## Configure the s3 protocol

You must configure the `s3` protocol before you can use it. Perform these steps in each database in which you want to use the protocol:

1. Create the read and write functions for the `s3` protocol library:

    ```sql
    CREATE OR REPLACE FUNCTION write_to_s3() RETURNS integer AS
       '$libdir/gps3ext.so', 's3_export' LANGUAGE C STABLE;
    ```

    ```sql
    CREATE OR REPLACE FUNCTION read_from_s3() RETURNS integer AS
       '$libdir/gps3ext.so', 's3_import' LANGUAGE C STABLE;
    ```

2. Declare the `s3` protocol and specify the read and write functions you created in the previous step:

    To allow only Apache Cloudberry superusers to use the protocol, create it as follows:

    ```sql
    CREATE PROTOCOL s3 (writefunc = write_to_s3, readfunc = read_from_s3);
    ```

    If you want to permit non-superusers to use the `s3` protocol, create it as a `TRUSTED` protocol and `GRANT` access to those users. For example:

    ```sql
    CREATE TRUSTED PROTOCOL s3 (writefunc = write_to_s3, readfunc = read_from_s3);
    GRANT ALL ON PROTOCOL s3 TO user1, user2;
    ```

    :::note
    The protocol name `s3` must be the same as the protocol of the URL specified for the external table that you create to access an S3 resource.
    :::

    The corresponding function is called by every Apache Cloudberry segment instance.

## Use s3 external tables

Follow these basic steps to use the `s3` protocol with Apache Cloudberry external tables. Each step includes links to relevant topics from which you can obtain more information.

1. [Configure the s3 Protocol](#configure-the-s3-protocol).
2. Create the `s3` protocol configuration file:

    1. Create a template `s3` protocol configuration file using the `gpcheckcloud` utility:

        ```shell
        gpcheckcloud -t > ./mytest_s3.config
        ```

    2. (Optional) Edit the template file to specify the `accessid` and `secret` authentication credentials required to connect to the S3 location.

3. Apache Cloudberry can access an `s3` protocol configuration file when the file is located on each segment host or when the file is served up by an `http/https` server. Identify where you plan to locate the configuration file, and note the location and configuration option (if applicable).

    If you are relying on the AWS credential file to authenticate, this file must reside at `~/.aws/credentials` on each Apache Cloudberry segment host.

4. Use the `gpcheckcloud` utility to validate connectivity to the S3 bucket. You must specify the S3 endpoint name and bucket that you want to check.

    For example, if the `s3` protocol configuration file resides in the default location, you would run the following command:

    ```shell
    gpcheckcloud -c "s3://<s3-endpoint>/<s3-bucket>"
    ```

    `gpcheckcloud` attempts to connect to the S3 endpoint and lists any files in the S3 bucket, if available. A successful connection ends with the message:

    ```
    Your configuration works well.
    ```

    You can optionally use `gpcheckcloud` to validate uploading to and downloading from the S3 bucket.

5. Create an s3 external table by specifying an `s3` protocol URL in the `CREATE EXTERNAL TABLE` command, `LOCATION` clause.

### Create a readable S3 external table

For reading data from S3, specify the S3 location and file pattern:

```sql
CREATE EXTERNAL TABLE sales_data (
    transaction_id int,
    product_name text,
    sale_date date,
    amount decimal(10,2)
)
LOCATION ('s3://s3-us-west-2.amazonaws.com/your-bucket/sales-data/ config=/path/to/s3.config')
FORMAT 'CSV' (HEADER);
```

### Create a writable S3 external table

For writing data to S3:

```sql
CREATE WRITABLE EXTERNAL TABLE sales_export (LIKE sales_data)
LOCATION ('s3://s3-us-west-2.amazonaws.com/your-bucket/exports/ config=/path/to/s3.config')
FORMAT 'CSV'
DISTRIBUTED BY (transaction_id);
```

    For read-only s3 tables, the URL defines the location and prefix used to select existing data files that comprise the s3 table. For example:

    ```sql
    CREATE READABLE EXTERNAL TABLE S3TBL (date text, time text, amt int)
       LOCATION('s3://s3-us-west-2.amazonaws.com/s3test.example.com/dataset1/normal/ config=/home/gpadmin/aws_s3/s3.conf')
       FORMAT 'csv';
    ```

    For writable s3 tables, the protocol URL defines the S3 location in which Apache Cloudberry writes the data files that back the table for `INSERT` operations. You can also specify a prefix that Apache Cloudberry will add to the files that it creates. For example:

    ```sql
    CREATE WRITABLE EXTERNAL TABLE S3WRIT (LIKE S3TBL)
       LOCATION('s3://s3-us-west-2.amazonaws.com/s3test.example.com/dataset1/normal/ config=/home/gpadmin/aws_s3/s3.conf')
       FORMAT 'csv';
    ```

## About the s3 Protocol LOCATION URL

When you use the `s3` protocol, you specify an S3 file location and optional configuration file location and region parameters in the `LOCATION` clause of the `CREATE EXTERNAL TABLE` command. The syntax follows:

```
's3://<S3_endpoint>[:<port>]/<bucket_name>/[<S3_prefix>] [region=<S3_region>] [config=<config_file_location> | config_server=<url>] [section=<section_name>]'
```

The `s3` protocol requires that you specify the S3 endpoint and S3 bucket name. Each Apache Cloudberry segment host must have access to the S3 location. The optional S3_prefix value is used to select files for read-only S3 tables, or as a filename prefix to use when uploading files for s3 writable tables.

:::note
The Apache Cloudberry `s3` protocol URL must include the S3 endpoint hostname.
:::

To specify an ECS endpoint (an Amazon S3 compatible service) in the `LOCATION` clause, you must set the `s3` protocol configuration file parameter `version` to `2`. The `version` parameter controls whether the `region` parameter is used in the `LOCATION` clause. You can also specify an Amazon S3 location when the `version` parameter is 2.

:::note
Although the S3_prefix is an optional part of the syntax, you should always include an S3 prefix for both writable and read-only s3 tables to separate datasets as part of the `CREATE EXTERNAL TABLE` syntax.
:::

For writable s3 tables, the `s3` protocol URL specifies the endpoint and bucket name where Apache Cloudberry uploads data files for the table. The S3 file prefix is used for each new file uploaded to the S3 location as a result of inserting data to the table.

For read-only s3 tables, the S3 file prefix is optional. If you specify an S3_prefix, then the `s3` protocol selects all files that start with the specified prefix as data files for the external table. The `s3` protocol does not use the slash character (`/`) as a delimiter, so a slash character following a prefix is treated as part of the prefix itself.

For example, consider the following 5 files that each have the S3_endpoint named `s3-us-west-2.amazonaws.com` and the bucket_name `test1`:

```
s3://s3-us-west-2.amazonaws.com/test1/abc
s3://s3-us-west-2.amazonaws.com/test1/abc/
s3://s3-us-west-2.amazonaws.com/test1/abc/xx
s3://s3-us-west-2.amazonaws.com/test1/abcdef
s3://s3-us-west-2.amazonaws.com/test1/abcdefff
```

- If the S3 URL is provided as `s3://s3-us-west-2.amazonaws.com/test1/abc`, then the `abc` prefix selects all 5 files.
- If the S3 URL is provided as `s3://s3-us-west-2.amazonaws.com/test1/abc/`, then the `abc/` prefix selects the files `s3://s3-us-west-2.amazonaws.com/test1/abc/` and `s3://s3-us-west-2.amazonaws.com/test1/abc/xx`.
- If the S3 URL is provided as `s3://s3-us-west-2.amazonaws.com/test1/abcd`, then the `abcd` prefix selects the files `s3://s3-us-west-2.amazonaws.com/test1/abcdef` and `s3://s3-us-west-2.amazonaws.com/test1/abcdefff`

Wildcard characters are not supported in an S3_prefix; however, the S3 prefix functions as if a wildcard character immediately followed the prefix itself.

All of the files selected by the S3 URL (S3_endpoint/bucket_name/S3_prefix) are used as the source for the external table, so they must have the same format. Each file must also contain complete data rows. A data row cannot be split between files.

You use the `config` or `config_server` parameter to specify the location of the required `s3` protocol configuration file that contains AWS connection credentials and communication parameters.

Use the `section` parameter to specify the name of the configuration file section from which the `s3` protocol reads configuration parameters. The default `section` is named `default`. When you specify the section name in the configuration file, enclose it in brackets (for example, `[default]`).

## Learn more

- [Amazon S3 Documentation](https://aws.amazon.com/documentation/s3/)
- [AWS S3 Endpoints](https://docs.aws.amazon.com/general/latest/gr/rande.html#s3_region)
