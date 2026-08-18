---
title: "Reading HBase Table Data"
description: "Reading HBase table data with PXF."
source: https://cloudberry.apache.org/pxf/access-hadoop/hbase_pxf
---

# Reading HBase Table Data

Apache HBase is a distributed, versioned, non-relational database on Hadoop.

The PXF HBase connector reads data stored in an HBase table. The HBase connector supports filter pushdown.

This section describes how to use the PXF HBase connector.

## Prerequisites

Before working with HBase table data, ensure that you have:

- Copied `<PXF_INSTALL_DIR>/share/pxf-hbase-*.jar` to each node in your HBase cluster, and that the location of this PXF JAR file is in the `$HBASE_CLASSPATH`. This configuration is required for the PXF HBase connector to support filter pushdown.
- Met the PXF Hadoop [Prerequisites](./access_hdfs.md#prerequisites).

## HBase Primer

This topic assumes that you have a basic understanding of the following HBase concepts:
 
- An HBase column includes two components: a column family and a column qualifier. These components are delimited by a colon `:` character, \<column-family\>:\<column-qualifier\>.
- An HBase row consists of a row key and one or more column values. A row key is a unique identifier for the table row.
- An HBase table is a multi-dimensional map comprised of one or more columns and rows of data. You specify the complete set of column families when you create an HBase table.
- An HBase cell is comprised of a row (column family, column qualifier, column value) and a timestamp. The column value and timestamp in a given cell represent a version of the value.

For detailed information about HBase, refer to the [Apache HBase Reference Guide](http://hbase.apache.org/book.html).

## HBase Shell

The HBase shell is a subsystem similar to that of `psql`. To start the HBase shell:

``` shell
$ hbase shell
<hbase output>
hbase(main):001:0>
```

The default HBase namespace is named `default`. 

### Example: Creating an HBase Table

Create a sample HBase table.

1. Create an HBase table named `order_info` in the `default` namespace. `order_info` has two column families: `product` and `shipping_info`:

    ``` pre
    hbase(main):> create 'order_info', 'product', 'shipping_info'
    ```

2. The `order_info` `product` column family has qualifiers named `name` and `location`. The `shipping_info` column family has qualifiers named `state` and `zipcode`. Add some data to the `order_info` table:

    ``` pre
    put 'order_info', '1', 'product:name', 'tennis racquet'
    put 'order_info', '1', 'product:location', 'out of stock'
    put 'order_info', '1', 'shipping_info:state', 'CA'
    put 'order_info', '1', 'shipping_info:zipcode', '12345'
    put 'order_info', '2', 'product:name', 'soccer ball'
    put 'order_info', '2', 'product:location', 'on floor'
    put 'order_info', '2', 'shipping_info:state', 'CO'
    put 'order_info', '2', 'shipping_info:zipcode', '56789'
    put 'order_info', '3', 'product:name', 'snorkel set'
    put 'order_info', '3', 'product:location', 'warehouse'
    put 'order_info', '3', 'shipping_info:state', 'OH'
    put 'order_info', '3', 'shipping_info:zipcode', '34567'
    ```
    
    You will access the `orders_info` HBase table directly via PXF in examples later in this topic.

3. Display the contents of the `order_info` table:

    ``` pre
    hbase(main):> scan 'order_info'
    ROW     COLUMN+CELL                                               
     1      column=product:location, timestamp=1499074825516, value=out of stock                                                
     1      column=product:name, timestamp=1499074825491, value=tennis racquet                                                  
     1      column=shipping_info:state, timestamp=1499074825531, value=CA                                                       
     1      column=shipping_info:zipcode, timestamp=1499074825548, value=12345                                                  
     2      column=product:location, timestamp=1499074825573, value=on floor    
     ... 
    3 row(s) in 0.0400 seconds                                         
    ```

## Querying External HBase Data

The PXF HBase connector supports a single profile named `hbase`.

Use the following syntax to create an Apache Cloudberry external table that references an HBase table:

``` sql
CREATE EXTERNAL TABLE <table_name>
    ( <column_name> <data_type> [, ...] | LIKE <other_table> )
LOCATION ('pxf://<hbase-table-name>?PROFILE=hbase[&SERVER=<server_name>]')
FORMAT 'CUSTOM' (FORMATTER='pxfwritable_import');
```

HBase connector-specific keywords and values used in the Apache Cloudberry [CREATE EXTERNAL TABLE](https://cloudberry.apache.org/docs/sql-stmts/create-external-table) call are described below.

| Keyword  | Value |
|-------|-------------------------------------|
| \<hbase&#8209;table&#8209;name\>    | The name of the HBase table. |
| PROFILE    | The `PROFILE` keyword must specify `hbase`. |
| SERVER=\<server_name\>    | The named server configuration that PXF uses to access the data. PXF uses the `default` server if not specified. |
| FORMAT  | The `FORMAT` clause must specify `'CUSTOM' (FORMATTER='pxfwritable_import')`.   |

## Data Type Mapping

HBase is byte-based; it stores all data types as an array of bytes. To represent HBase data in Apache Cloudberry, select a data type for your Apache Cloudberry column that matches the underlying content of the HBase column qualifier values.

**Note**: PXF does not support complex HBase objects.

## Column Mapping

You can create an Apache Cloudberry external table that references all, or a subset of, the column qualifiers defined in an HBase table. PXF supports direct or indirect mapping between an Apache Cloudberry table column and an HBase table column qualifier.

### Direct Mapping

When you use direct mapping to map Apache Cloudberry external table column names to HBase qualifiers, you specify column-family-qualified HBase qualifier names as quoted values. The PXF HBase connector passes these column names as-is to HBase as it reads the table data.

For example, to create an Apache Cloudberry external table accessing the following data:

-   qualifier `name` in the column family named `product`
-   qualifier `zipcode` in the column family named `shipping_info` 

from the `order_info` HBase table that you created in [Example: Creating an HBase Table](#example-creating-an-hbase-table), use this `CREATE EXTERNAL TABLE` syntax:

``` sql
CREATE EXTERNAL TABLE orderinfo_hbase ("product:name" varchar, "shipping_info:zipcode" int)
    LOCATION ('pxf://order_info?PROFILE=hbase')
    FORMAT 'CUSTOM' (FORMATTER='pxfwritable_import');
```

### Indirect Mapping via Lookup Table

When you use indirect mapping to map Apache Cloudberry external table column names to HBase qualifiers, you specify the mapping in a lookup table that you create in HBase. The lookup table maps a \<column-family\>:\<column-qualifier\> to a column name alias that you specify when you create the Apache Cloudberry external table. 

You must name the HBase PXF lookup table `pxflookup`. And you must define this table with a single column family named `mapping`. For example:

``` pre
hbase(main):> create 'pxflookup', 'mapping'
```

While the direct mapping method is fast and intuitive, using indirect mapping allows you to create a shorter, character-based alias for the HBase \<column-family\>:\<column-qualifier\> name. This better reconciles HBase column qualifier names with Apache Cloudberry due to the following:

-   HBase qualifier names can be very long. Apache Cloudberry has a 63 character limit on the size of the column name.
-   HBase qualifier names can include binary or non-printable characters. Apache Cloudberry column names are character-based.

When populating the `pxflookup` HBase table, add rows to the table such that the:

- row key specifies the HBase table name
- `mapping` column family qualifier identifies the Apache Cloudberry column name, and the value identifies the HBase `<column-family>:<column-qualifier>` for which you are creating the alias.

For example, to use indirect mapping with the `order_info` table, add these entries to the `pxflookup` table:

``` pre
hbase(main):> put 'pxflookup', 'order_info', 'mapping:pname', 'product:name'
hbase(main):> put 'pxflookup', 'order_info', 'mapping:zip', 'shipping_info:zipcode'
```

Then create an Apache Cloudberry external table using the following `CREATE EXTERNAL TABLE` syntax:

``` sql
CREATE EXTERNAL TABLE orderinfo_map (pname varchar, zip int)
    LOCATION ('pxf://order_info?PROFILE=hbase')
    FORMAT 'CUSTOM' (FORMATTER='pxfwritable_import');
```

## Row Key

The HBase table row key is a unique identifier for the table row. PXF handles the row key in a special way. 

To use the row key in the Apache Cloudberry external table query, define the external table using the PXF reserved column named `recordkey.` The `recordkey` column name instructs PXF to return the HBase table record key for each row.

Define the `recordkey` using the Apache Cloudberry data type `bytea`.

For example:

``` sql
CREATE EXTERNAL TABLE <table_name> (recordkey bytea, ... ) 
    LOCATION ('pxf://<hbase_table_name>?PROFILE=hbase')
    FORMAT 'CUSTOM' (FORMATTER='pxfwritable_import');
```

After you have created the external table, you can use the `recordkey` in a `WHERE` clause to filter the HBase table on a range of row key values.

**Note**: To enable filter pushdown on the `recordkey`, define the field as `text`.
