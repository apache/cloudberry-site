---
title: Use Compression
---

# Use Compression

You can configure Apache Cloudberry to use data compression with some database features and with some utilities.Compression reduces disk usage and improves I/O across the system, however, it adds some performance overhead when compressing and decompressing data.

You can configure support for data compression with these features and utilities. See the specific feature or utility for information about support for compression.

- Append-optimized tables support compressing table data. See [`CREATE TABLE`](../sql-stmts/create-table.md).
- User-defined data types can be defined to compress data. See [`CREATE TYPE`](../sql-stmts/create-type.md).
- The external table protocols [`gpfdist`](../data-loading/load-data-using-gpfdist.md) ([`gpfdists`](../data-loading/load-data-using-gpfdists.md)), [s3](../data-loading/load-data-from-s3.md), and [pxf](../data-loading/load-data-using-pxf.md) support compression when accessing external data. For information about external tables, see [`CREATE EXTERNAL TABLE`](../sql-stmts/create-external-table.md).
- Workfiles (temporary spill files that are created when running a query that requires more memory than it is allocated) can be compressed. See the server configuration parameter `gp_workfile_compression`.
- The Apache Cloudberry utilities [`gpbackup`](../sys-utilities/gpbackup.md), [`gprestore`](../sys-utilities/gprestore.md), [`gpcopy`](../sys-utilities/gpcopy.md), [`gpload`](../sys-utilities/gpload.md), and [`gplogfilter`](../sys-utilities/gplogfilter.md) support compression.

For some compression algorithms (such as zlib) Apache Cloudberry requires software packages installed on the host system. For information about required software packages, see the [Apache Cloudberry Installation Guide](../cbdb-op-software-hardware.md).
