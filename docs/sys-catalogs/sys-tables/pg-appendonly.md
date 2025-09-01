---
title: pg_appendonly
---

# pg_appendonly

The `pg_appendonly` table in the `pg_catalog` schema contains information about the storage options and other characteristics of append-optimized tables.

|column|type|references|description|
|------|----|----------|-----------|
|`relid`|oid| |The table object identifier \(OID\) of the table.|
| `blocksize` | integer |  | Block size used for compression of append-optimized tables. Valid values are 8K - 2M. Default is `32K`. |
| `compresslevel`|smallint| |The compression level, with compression ratio increasing from 1 to 19. With zlib specified, valid values are 1-9. When zstd is specified, valid values are 1-19. |
| `checksum`|boolean| |A checksum value that is stored to compare the state of a block of data at compression time and at scan time to ensure data integrity. |
| `compresstype`|name| |Type of compression used to compress append-optimized tables. Valid values are: <br /> - `none` (no compression)<br /> - `rle_type` (run-length encoding compression) <br />- `zlib` (gzip compression) <br />- `zstd` (Zstandard compression) |
| `columnstore` | boolean |  | `1` for column-oriented storage, `0` for row-oriented storage. |
| `segrelid` | oid | |Table on-disk segment file id. |
| `segfilecount` |  smallint| |Number of segment files. |
| `version`  | smallint | |Version of the append-optimized table. |
| `blkdirrelid` | oid | |Block used for on-disk column-oriented table file. |
| `blkdiridxid` | oid | |Block used for on-disk column-oriented index file. |
| `visimaprelid` | oid | |Visibility map for the table. |
| `visimapidxid` | oid | |B-tree index on the visibility map. |
