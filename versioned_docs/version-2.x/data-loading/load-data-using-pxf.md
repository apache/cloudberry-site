---
title: Load Data Using PXF
---

# Load Data Using the Platform Extension Framework (PXF)

The Apache Cloudberry Platform Extension Framework (PXF) is an extensible framework that allows Apache Cloudberry to query external data files whose metadata is not managed by the database. You can use its `pxf://` protocol to access data residing in object store systems (Azure, Google Cloud Storage, Minio, S3), external Hadoop systems (HDFS, Hive, HBase), and SQL databases.

PXF includes built-in connectors for accessing data that exists inside HDFS files, Hive tables, HBase tables, and JDBC-accessible databases. Users can also create their own connectors to other data storage or processing engines.

The version of PXF used in Apache Cloudberry is forked from the Greenplum PXF project and has been specifically adapted for it. The source code for this adapted version is hosted by the Apache Software Foundation at [apache/cloudberry-pxf](https://github.com/apache/cloudberry-pxf).

The PXF `pxf` protocol is packaged as an Apache Cloudberry extension that supports both reading from and writing to external data stores. The framework includes a C-language extension and a Java service. After you configure and initialize PXF, you start a single PXF JVM process on each Apache Cloudberry segment host. This long-running process concurrently serves multiple query requests.

Before using the `pxf` protocol, you must explicitly initialize and start the PXF service. You must also enable PXF in each database where it will be used and grant permissions on the `pxf` protocol to the relevant Apache Cloudberry users.

## Install and Build PXF

PXF is a component that must be built and installed separately. The source code and detailed instructions for building, installing, and developing PXF are available in the official `apache/cloudberry-pxf` repository. Before proceeding with the configuration, follow the development guide in the repository to set up PXF.

**Build and Installation Guide**: [apache/cloudberry-pxf README](https://github.com/apache/cloudberry-pxf/blob/main/README.md)

## Configure PXF

Before you can use PXF to access external data, you must configure and initialize the service.

### Initialize and Start PXF

To use PXF, you must first initialize it. This process creates the necessary configuration directory structure and files on each Apache Cloudberry segment host. After initialization, you need to start the PXF service.

1.  Add the PXF binary directory to your `PATH`. This step ensures that you can run `pxf` commands from any location.
    
    ```shell
    export PATH=/usr/local/pxf/bin:$PATH
    ```
    
    You can add this line to your `.bashrc` or `.zshrc` file to make it permanent.

2.  Initialize PXF. The `prepare` command sets up the PXF configuration. This command only needs to be run once.
    
    ```shell
    pxf prepare
    ```

3.  Start the PXF service. This command starts a Java process on each segment host that acts as the external data coordinator.
    
    ```shell
    pxf start
    ```

### Enable PXF in a database

You must enable PXF in each database in which you want to use the `pxf` protocol to access external data.

To enable PXF in a database, you must create the PXF extension in the database:

```sql
CREATE EXTENSION pxf;
```

The `pxf` protocol is packaged as an extension with Apache Cloudberry, and you must explicitly enable it in each database in which you plan to use it.

### Grant access to PXF

To allow non-superuser Apache Cloudberry roles to create external tables using the `pxf` protocol, you must grant `SELECT` privileges on the `pxf` protocol to each role:

```sql
GRANT SELECT ON PROTOCOL pxf TO <role_name>;
```

To allow non-superuser Apache Cloudberry roles to create writable external tables using the `pxf` protocol, you must grant `INSERT` privileges on the `pxf` protocol to each role:

```sql
GRANT INSERT ON PROTOCOL pxf TO <role_name>;
```

## PXF configuration overview

PXF configuration includes server configuration and connector configuration. A PXF *server* is a named configuration that provides access credentials and other information required to access an external data source. A PXF *connector* is the interface between PXF and the external data source.

### Example: configure S3 connector

Create a PXF configuration for accessing S3 data:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <property>
        <name>fs.s3a.access.key</name>
        <value>YOUR_ACCESS_KEY</value>
    </property>
    <property>
        <name>fs.s3a.secret.key</name>
        <value>YOUR_SECRET_KEY</value>
    </property>
    <property>
        <name>fs.s3a.endpoint</name>
        <value>s3.amazonaws.com</value>
    </property>
</configuration>
```

### Example: configure JDBC connector

For accessing SQL databases:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <property>
        <name>jdbc.driver</name>
        <value>org.postgresql.Driver</value>
    </property>
    <property>
        <name>jdbc.url</name>
        <value>jdbc:postgresql://hostname:5432/database</value>
    </property>
    <property>
        <name>jdbc.user</name>
        <value>username</value>
    </property>
    <property>
        <name>jdbc.password</name>
        <value>password</value>
    </property>
</configuration>
```

## Step 3. Create PXF external tables

PXF external tables use the `pxf://` protocol in the `LOCATION` clause. The URL format varies depending on the data source and connector.

### Read from HDFS

Access text files stored in HDFS:

```sql
CREATE EXTERNAL TABLE sales_hdfs (
    transaction_id int,
    product_name text,
    sale_date date,
    amount decimal(10,2)
)
LOCATION ('pxf://hdfs-namenode:8020/data/sales/sales.txt?PROFILE=hdfs:text')
FORMAT 'TEXT' (DELIMITER '|');
```

### Read from Hive tables

Access Hive tables directly:

```sql
CREATE EXTERNAL TABLE hive_sales (
    transaction_id int,
    product_name text,
    sale_date date,
    amount decimal(10,2)
)
LOCATION ('pxf://hive-metastore:9083/sales_db.sales_table?PROFILE=hive')
FORMAT 'CUSTOM' (FORMATTER='pxfwritable_import');
```

### Read from Parquet files

Access Parquet files in object storage:

```sql
CREATE EXTERNAL TABLE parquet_data (
    id bigint,
    name text,
    created_date date
)
LOCATION ('pxf://s3a://my-bucket/data/events.parquet?PROFILE=s3:parquet&SERVER=s3-server')
FORMAT 'CUSTOM' (FORMATTER='pxfwritable_import');
```

### Read from SQL databases

Query external SQL databases:

```sql
CREATE EXTERNAL TABLE external_customers (
    customer_id int,
    customer_name text,
    email text,
    registration_date date
)
LOCATION ('pxf://postgresql-server/customers?PROFILE=jdbc&SERVER=postgres-server')
FORMAT 'CUSTOM' (FORMATTER='pxfwritable_import');
```

### Write data with PXF

Create writable external tables to export data:

```sql
CREATE WRITABLE EXTERNAL TABLE export_to_hdfs (
    transaction_id int,
    product_name text,
    sale_date date,
    amount decimal(10,2)
)
LOCATION ('pxf://hdfs-namenode:8020/exports/sales_export?PROFILE=hdfs:text')
FORMAT 'TEXT' (DELIMITER '|')
DISTRIBUTED BY (transaction_id);
```

## PXF URL format

The PXF protocol URL follows this syntax:

```
pxf://<host>[:<port>]/<path-to-data>?PROFILE=<profile_name>[&<custom-option>=<value>][&SERVER=<server_name>]
```

Where:
- `host:port`: Location of the external data source
- `path-to-data`: Path to the specific data (file, directory, table, etc.)
- `PROFILE`: PXF connector profile (e.g., `hdfs:text`, `hive`, `s3:parquet`, `jdbc`)
- `SERVER`: Named server configuration (optional)
- `custom-option`: Additional connector-specific options

## Common PXF profiles

| Profile | Data Source | Format | Use Case |
|---------|-------------|--------|----------|
| `hdfs:text` | HDFS | Text files | Delimited text data |
| `hdfs:avro` | HDFS | Avro files | Schema evolution support |
| `hdfs:parquet` | HDFS | Parquet files | Columnar analytics |
| `hdfs:orc` | HDFS | ORC files | Optimized row columnar |
| `hive` | Hive | Various | Hive table access |
| `hbase` | HBase | HBase | NoSQL data access |
| `s3:text` | S3 | Text files | Cloud object storage |
| `s3:parquet` | S3 | Parquet files | Cloud analytics |
| `jdbc` | SQL Database | Various | External database access |

## Performance optimization

### Partition pruning

PXF supports partition pruning for Hive tables:

```sql
SELECT * FROM hive_sales 
WHERE sale_date >= '2024-01-01' AND sale_date < '2024-02-01';
```

### Predicate pushdown

Enable predicate pushdown for better performance:

```sql
-- This filter can be pushed down to the external source
SELECT * FROM external_customers 
WHERE registration_date > '2024-01-01';
```

### Parallel processing

Leverage multiple files for better parallelism:

```sql
CREATE EXTERNAL TABLE multi_file_data (
    id bigint,
    data text
)
LOCATION ('pxf://hdfs-namenode:8020/data/partitioned/*?PROFILE=hdfs:text')
FORMAT 'TEXT' (DELIMITER ',');
```

## Error handling

Enable error logging for data quality monitoring:

```sql
CREATE EXTERNAL TABLE sales_with_errors (
    transaction_id int,
    product_name text,
    sale_date date,
    amount decimal(10,2)
)
LOCATION ('pxf://hdfs-namenode:8020/data/sales/?PROFILE=hdfs:text')
FORMAT 'TEXT' (DELIMITER '|')
LOG ERRORS SEGMENT REJECT LIMIT 50;
```

## Best practices

- Select the most specific PXF profile that matches your data format and storage system to ensure optimal performance and feature support.
- Create reusable named server configurations to centralize connection parameters and credentials, making it easier to manage multiple external data sources.
- Structure your external data using file sizes between 100MB and 1GB to achieve optimal parallel processing across Apache Cloudberry segments.
- Leverage compressed storage formats such as Parquet or ORC to reduce I/O overhead and improve query performance.
- Implement comprehensive error logging and monitoring in production environments to quickly identify and resolve data access issues.
- Establish proper authentication mechanisms and enable encryption for all connections to sensitive external data sources.

## Limitations

- PXF requires the external data source to be accessible from all segment hosts.
- Some data sources may have specific version compatibility requirements.
- Write operations depend on the connector's capabilities.
- Performance can be affected by network latency to external sources.

## Troubleshooting

### Check PXF service status

```shell
pxf cluster status
```

### View PXF logs

```shell
pxf cluster logs
```

### Test connectivity

```sql
SELECT * FROM pxf_external_table LIMIT 5;
```

## Learn More

For more details about the Apache Cloudberry Platform Extension Framework (PXF), please refer to the official PXF project repository, which contains the source code, documentation, and contribution guidelines.

- [Apache Cloudberry PXF Project](https://github.com/apache/cloudberry-pxf)
