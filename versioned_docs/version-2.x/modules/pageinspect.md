---
title: pageinspect
---

# pageinspect

The `pageinspect` module provides functions for low-level inspection of the contents of database pages. Only superusers can use these functions.

The Apache Cloudberry `pageinspect` module is based on the PostgreSQL `pageinspect` module. The differences are described in [MPP considerations](#mpp-considerations) and [Functions added by Apache Cloudberry](#functions-added-by-apache-cloudberry).

## Install and register the module

`pageinspect` is built and installed by a default Apache Cloudberry build. Register the extension in each database in which you want to use it:

```sql
CREATE EXTENSION pageinspect;
```

If an older version of the extension is already registered in a database, update it to get the functions of the current version:

```sql
ALTER EXTENSION pageinspect UPDATE;
```

## MPP considerations

- `get_raw_page()` does not read pages of append-optimized tables. It also rejects relations that have no page storage of their own, such as views, foreign tables, and partitioned tables.
- A function that reads data from a relation reads it only from the instance on which the function runs. For example, when you call `get_raw_page()` for a user table in a normal session, the function runs on the coordinator, which stores no data for the table, and the call fails with the error `block number 0 is out of range for relation "..."`. System catalog tables can be read on the coordinator.

    To inspect pages on a segment, run the function on that segment, for example in a utility-mode connection to the segment.

## Functions

The module provides the PostgreSQL 14 `pageinspect` functions:

| Group | Functions |
|-------|-----------|
| General | `get_raw_page`, `page_header`, `page_checksum`, `fsm_page_contents` |
| Heap | `heap_page_items`, `tuple_data_split`, `heap_page_item_attrs`, `heap_tuple_infomask_flags` |
| B-tree | `bt_metap`, `bt_page_stats`, `bt_page_items` |
| BRIN | `brin_page_type`, `brin_metapage_info`, `brin_revmap_data`, `brin_page_items` |
| GIN | `gin_metapage_info`, `gin_page_opaque_info`, `gin_leafpage_items` |
| GiST | `gist_page_opaque_info`, `gist_page_items`, `gist_page_items_bytea` |
| Hash | `hash_page_type`, `hash_page_stats`, `hash_page_items`, `hash_bitmap_info`, `hash_metapage_info` |

See [pageinspect](https://www.postgresql.org/docs/14/pageinspect.html) in the PostgreSQL documentation for details about these functions.

## Functions added by Apache Cloudberry

### Bitmap index functions

| Function | Description |
|----------|-------------|
| `bm_metap(relname text) returns record` | Returns information about the meta page of a bitmap index: `magic`, `version`, `auxrelid`, `auxindexrelid`, and `lovlastblknum`. |
| `bm_bitmap_page_header(relname text, blkno int) returns record` | Returns the header information of a bitmap page: `num_words`, `next_blkno`, and `last_tid`. |
| `bm_lov_page_items(relname text, blkno int) returns setof record` | Returns the list of values (LOV) items of a bitmap LOV page. |
| `bm_bitmap_page_items(relname text, blkno int) returns setof record` | Returns the content words of a bitmap page and whether each word is compressed: `word_num`, `compressed`, and `content_word`. |
| `bm_bitmap_page_items(page bytea) returns setof record` | Same as the previous function, for a page image obtained with `get_raw_page()`. |

`bm_lov_page_items()` returns the columns `itemoffset`, `lov_head_blkno`, `lov_tail_blkno`, `last_complete_word`, `last_word`, `last_tid`, `last_setbit_tid`, `is_last_complete_word_fill`, and `is_last_word_fill`.

### BRIN functions

Apache Cloudberry supports BRIN indexes on append-optimized tables, and `pageinspect` reflects this:

- `brin_metapage_info(page bytea)` returns four columns in addition to the PostgreSQL ones: `isAO` (`boolean`), `firstrevmappages` (`bigint[]`), `lastrevmappages` (`bigint[]`), and `lastrevmappagenums` (`bigint[]`). The arrays describe the range map chains of an index on an append-optimized table.
- `brin_revmap_chain(indexrelid regclass, segno int) returns bigint[]` returns the chain of range map block numbers for a segment file number (block sequence) of an append-optimized table. `segno` must be in the range from 0 to 127.

## Examples

Get information about the meta page of the bitmap index named `i1`:

```sql
SELECT * FROM bm_metap('i1');
```

Display the header information of the second block of the bitmap index `i1`:

```sql
SELECT * FROM bm_bitmap_page_header('i1', 2);
```

Display the LOV items in the first block of the bitmap index `i1`:

```sql
SELECT * FROM bm_lov_page_items('i1', 1) ORDER BY itemoffset;
```

Return the content words in the second block of the bitmap index `i1`, either by index name and block number, or from a page image:

```sql
SELECT * FROM bm_bitmap_page_items('i1', 2) ORDER BY word_num;
SELECT * FROM bm_bitmap_page_items(get_raw_page('i1', 2)) ORDER BY word_num;
```
