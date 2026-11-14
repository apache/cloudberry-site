---
title: gp_sparse_vector
---

# gp_sparse_vector

The `gp_sparse_vector` module implements a sparse vector data type named `svec`, and the associated functions, operators, and aggregates. The type uses compressed storage of zeros to make vector computations on floating point numbers faster.

## Installation

`gp_sparse_vector` is always built and installed with Apache Cloudberry. It is part of the default `gpcontrib` build targets and does not depend on any `configure` option.

The module is an extension (version `1.0.1`). Before you can use it, create the extension in each database where you want to use it:

```sql
CREATE EXTENSION gp_sparse_vector;
```

The module does not require `shared_preload_libraries` or a restart.

:::note
The extension creates all its objects in the `sparse_vector` schema. Either qualify the object names with the schema (for example `sparse_vector.svec`), or add the schema to the search path:

```sql
SET search_path TO sparse_vector, public;
```

The examples in this document assume that `sparse_vector` is in the search path.
:::

## About the svec data type

When you use arrays of floating point numbers for various calculations, you often have long runs of zeros. This is common in scientific, retail optimization, and text processing applications. Each floating point number takes 8 bytes of storage in memory or on disk, so saving those zeros is often impractical. Many computations also benefit from skipping over the zeros.

For example, suppose that the following array of doubles is stored as a `float8[]`:

```
'{0, 33, <40,000 zeros>, 12, 22 }'::float8[]
```

This type of array arises often in text processing, where a dictionary might have 40-100K terms and each vector stores the number of times that each word appears in a particular document. This array occupies slightly more than 320KB of memory or disk, most of it zeros. Any operation that you perform on this data works on 40,001 fields that are not important.

The built-in array data type has a bitmap for null values, but it is a poor choice for this use case. It is not optimized for `float8[]` or for long runs of zeros instead of nulls, and the bitmap is not run-length-encoding (RLE) compressed. Even if each zero were stored as a `NULL` in the array, the bitmap for nulls would use 5KB to mark the nulls.

The `svec` type uses a simple RLE-based scheme that is biased toward being efficient for zero values. With this scheme, the bitmap of the example vector needs only 6 bytes.

:::note
`svec` supports only `float8` vector values.
:::

### Create svec values

You can construct an `svec` directly from a float array:

```sql
SELECT ('{0, 13, 37, 53, 0, 71 }'::float8[])::svec;
```

The text representation of an `svec` has the form `{counts}:{values}`, where each count is the number of times that the corresponding value repeats. For example, `'{1,2,3,4}:{3,4,5,6}'::svec` is a vector of 10 elements: one `3`, two `4`s, three `5`s, and four `6`s.

The module defines implicit casts between `svec` and `float8[]` in both directions, and implicit casts from `int2`, `integer`, `bigint`, `float4`, `float8`, and `numeric` to `svec`.

## Operators

The operators take advantage of the sparse storage format, which makes the computations on `svec` values faster. The `+`, `-`, `*`, `/`, and `%*%` operators accept `svec` and `float8[]` operands in any combination. A number that is cast to `svec` is a scalar and is applied to every element of the other operand. Otherwise, both operands must have the same dimension.

| Operator | Description |
|---|---|
| `+` | Adds the corresponding elements of two vectors. |
| `-` | Subtracts the corresponding elements of two vectors. |
| `*` | Multiplies the corresponding elements of two vectors. |
| `/` | Divides the corresponding elements of two vectors. |
| `^` | Raises each element of the left `svec` to the power that the right operand gives. The right operand must be a scalar, for example `a ^ 2::svec`. A vector on the right side raises an error. |
| `%*%` | Returns the dot product of two vectors as a `float8`. |
| `\|\|` | Concatenates two `svec` values. |
| `*\|\|` | Concatenates an `svec` (right operand) to itself the number of times given by the `int4` left operand. |
| `=` | Tests two `svec` values, or two `float8[]` values, for equality. |
| `<`, `<=`, `==`, `>=`, `>` | Compare two `svec` values by their L2 norm. These operators are the members of the `svec_l2_ops` B-tree operator class. |
| `<>` | Defined, but not a member of the operator class. In this version it is bound to the same function as `==`, so it returns `true` when the L2 norms are equal. Do not rely on it. |

The plus (`+`) operator adds each of the terms of two vectors of the same dimension. For example, if vector `a = {0,1,5}` and vector `b = {4,3,2}`, compute the vector addition as follows:

```sql
SELECT ('{0,1,5}'::float8[]::svec + '{4,3,2}'::float8[]::svec)::float8[];
```

```
 float8
---------
 {4,4,7}
```

A vector dot product (`%*%`) between vectors `a` and `b` returns a scalar result of type `float8`. Compute the dot product (`0*4 + 1*3 + 5*2 = 13`) as follows:

```sql
SELECT '{0,1,5}'::float8[]::svec %*% '{4,3,2}'::float8[]::svec;
```

```
 ?column?
----------
       13
```

## Functions and aggregates

| Function | Description |
|---|---|
| `dot(a, b)` | Returns the dot product. Each argument is an `svec` or a `float8[]`. |
| `l1norm(svec)`, `l1norm(float8[])` | Returns the L1 norm of the vector. |
| `l2norm(svec)`, `l2norm(float8[])` | Returns the L2 norm of the vector. |
| `log(svec)` | Returns an `svec` that contains the natural logarithm of each element. |
| `dimension(svec)` | Returns the number of elements in the vector. |
| `unnest(svec)` | Returns the elements of the vector as a set of `float8` values. |
| `vec_sum(svec)`, `vec_sum(float8[])` | Returns the sum of the elements of the vector. |
| `vec_median(svec)`, `vec_median(float8[])` | Returns the median of the elements of the vector. |
| `vec_pivot(svec, float8)` | Appends a `float8` value to an `svec`. |
| `dmin(float8, float8)`, `dmax(float8, float8)` | Returns the smaller or the larger of two `float8` values. |
| `gp_extract_feature_histogram(text[], text[])` | Returns the sparse feature vector of a document (second argument) for a dictionary (first argument). |

| Aggregate | Description |
|---|---|
| `sum(svec)` | Returns the element-wise sum of the input vectors. |
| `vec_count_nonzero(svec)` | Returns an `svec` that contains, for each position, the number of input vectors that have a non-zero element in the position. |
| `count_vec(svec)` | The legacy name of `vec_count_nonzero(svec)`. |
| `array_agg(float8)` | Aggregates `float8` values into an `svec`. |
| `median_inmemory(float8)` | Returns the median of the input `float8` values. |

For example, for the set of vectors `{0,1,5}`, `{10,0,3}`, `{0,0,3}`, and `{0,1,0}`, the count of non-zero terms is `{1,2,3}`:

```sql
CREATE TABLE listvecs(a svec);

INSERT INTO listvecs VALUES ('{0,1,5}'::float8[]),
    ('{10,0,3}'::float8[]),
    ('{0,0,3}'::float8[]),
    ('{0,1,0}'::float8[]);

SELECT vec_count_nonzero(a)::float8[] AS count_nonzero FROM listvecs;
```

```
 count_nonzero
---------------
 {1,2,3}
(1 row)
```

## Example

This text classification example creates tables that represent a dictionary and some documents, and then performs document classification with vector arithmetic on word counts and proportions of dictionary words in each document.

Enable the extension and set the search path:

```sql
CREATE EXTENSION gp_sparse_vector;
SET search_path TO sparse_vector, public;
```

Suppose that you have a dictionary that is composed of words in a text array. Create a table to store the dictionary and insert the words:

```sql
CREATE TABLE features (dictionary text[][]) DISTRIBUTED RANDOMLY;
INSERT INTO features
    VALUES ('{am,before,being,bothered,corpus,document,i,in,is,me,never,now,one,really,second,the,third,this,until}');
```

You have a set of documents, each also defined as an array of words. Create a table to represent the documents and insert some data:

```sql
CREATE TABLE documents (docnum int, document text[]) DISTRIBUTED RANDOMLY;
INSERT INTO documents VALUES
    (1,'{this,is,one,document,in,the,corpus}'),
    (2,'{i,am,the,second,document,in,the,corpus}'),
    (3,'{being,third,never,really,bothered,me,until,now}'),
    (4,'{the,document,before,me,is,the,third,document}');
```

To find the dictionary words that are present in each document, prepare a Sparse Feature Vector (SFV) for each document. An SFV is a vector of dimension N, where N is the number of dictionary words, and each SFV contains a count of each dictionary word in the document.

Use the `gp_extract_feature_histogram()` function to create an SFV from a document. The function returns an `svec` that contains the count of each of the dictionary words in the ordinal positions of the dictionary. The vectors that you generate for the documents are referred to as the corpus:

```sql
CREATE TABLE corpus (docnum int, feature_vector svec) DISTRIBUTED RANDOMLY;

INSERT INTO corpus
    (SELECT docnum,
        gp_extract_feature_histogram(
            (SELECT dictionary FROM features LIMIT 1), document)
     FROM documents);
```

Show the feature vector of each document:

```sql
SELECT docnum AS document_number, feature_vector::float8[] FROM corpus ORDER BY 1;
```

```
 document_number |             feature_vector
-----------------+-----------------------------------------
               1 | {0,0,0,0,1,1,0,1,1,0,0,0,1,0,0,1,0,1,0}
               2 | {1,0,0,0,1,1,1,1,0,0,0,0,0,0,1,2,0,0,0}
               3 | {0,0,1,1,0,0,0,0,0,1,1,1,0,1,0,0,1,0,1}
               4 | {0,1,0,0,0,2,0,0,1,1,0,0,0,0,0,2,1,0,0}
(4 rows)
```

The word "am" is the first word in the dictionary, and there is `1` instance of it in the SFV of the second document, "i am the second document in the corpus". The word "before" has no instances in the document, so its value is `0`, and so on.

Count the number of documents in which each feature occurs at least once:

```sql
SELECT (vec_count_nonzero(feature_vector))::float8[] AS count_in_document FROM corpus;
```

```
            count_in_document
-----------------------------------------
 {1,1,1,1,2,3,1,2,2,2,1,1,1,1,1,3,2,1,1}
(1 row)
```

Count all occurrences of each term in all documents:

```sql
SELECT (sum(feature_vector))::float8[] AS sum_in_document FROM corpus;
```

```
             sum_in_document
-----------------------------------------
 {1,1,1,1,2,4,1,2,2,2,1,1,1,1,1,5,2,1,1}
(1 row)
```

The remainder of the classification process is vector math. The count is turned into a weight that reflects Term Frequency / Inverse Document Frequency (tf/idf). The calculation for a given term in a given document is:

```
#_times_term_appears_in_this_doc * log( #_docs / #_docs_the_term_appears_in )
```

`#_docs` is the total number of documents (4 in this case). For example, the term "document" in document 1 has a weight of `1 * log(4/3)`. In document 4, the term has a weight of `2 * log(4/3)`. Terms that appear in every document have a weight of `0`.

Calculate the tf/idf:

```sql
SELECT docnum, (feature_vector*logidf)::float8[] AS tf_idf
    FROM (SELECT log(count(feature_vector)/vec_count_nonzero(feature_vector)) AS logidf FROM corpus)
    AS foo, corpus ORDER BY docnum;
```

```
 docnum |                                                                                     tf_idf
--------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
      1 | {0,0,0,0,0.6931471805599453,0.28768207245178085,0,0.6931471805599453,0.6931471805599453,0,0,0,1.3862943611198906,0,0,0.28768207245178085,0,1.3862943611198906,0}
      2 | {1.3862943611198906,0,0,0,0.6931471805599453,0.28768207245178085,1.3862943611198906,0.6931471805599453,0,0,0,0,0,0,1.3862943611198906,0.5753641449035617,0,0,0}
      3 | {0,0,1.3862943611198906,1.3862943611198906,0,0,0,0,0,0.6931471805599453,1.3862943611198906,1.3862943611198906,0,1.3862943611198906,0,0,0.6931471805599453,0,1.3862943611198906}
      4 | {0,1.3862943611198906,0,0,0,0.5753641449035617,0,0,0.6931471805599453,0.6931471805599453,0,0,0,0,0,0.5753641449035617,0.6931471805599453,0,0}
(4 rows)
```

You can determine the angular distance between one document and the rest of the documents with the `ACOS` of the dot product of the document vectors. First, create a table that stores the tf/idf weighted vectors:

```sql
CREATE TABLE weights AS
    (SELECT docnum, (feature_vector*logidf) tf_idf
        FROM (SELECT log(count(feature_vector)/vec_count_nonzero(feature_vector))
       AS logidf FROM corpus) foo, corpus ORDER BY docnum)
    DISTRIBUTED RANDOMLY;
```

Then calculate the angular distance between the first document and every other document:

```sql
SELECT docnum, trunc((180.*(ACOS(dmin(1.,(tf_idf%*%testdoc)/(l2norm(tf_idf)*l2norm(testdoc))))/(4.*ATAN(1.))))::numeric,2)
     AS angular_distance FROM weights,
     (SELECT tf_idf testdoc FROM weights WHERE docnum = 1 LIMIT 1) foo
ORDER BY 1;
```

```
 docnum | angular_distance
--------+------------------
      1 |             0.00
      2 |            78.82
      3 |            90.00
      4 |            80.02
(4 rows)
```

The angular distance between document 1 and itself is 0 degrees, and between document 1 and document 3 is 90 degrees because they share no features at all.

## Additional documentation

For more information about this module, see the README files in the [`gpcontrib/gp_sparse_vector`](https://github.com/apache/cloudberry/tree/REL_2_STABLE/gpcontrib/gp_sparse_vector) directory of the Apache Cloudberry source code.
