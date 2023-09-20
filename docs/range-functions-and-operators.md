---
title: Range Functions and Operators
---

# Range Functions and Operators in Cloudberry Database

The following table shows the operators available for range types.

|Operator|Description|Example|Result|
|--------|-----------|-------|------|
|`=`|equal|`int4range(1,5) = '[1,4]'::int4range`|`t`|
|`<>`|not equal|`numrange(1.1,2.2) <> numrange(1.1,2.3)`|`t`|
|`<`|less than|`int4range(1,10) < int4range(2,3)`|`t`|
|`>`|greater than|`int4range(1,10) > int4range(1,5)`|`t`|
|`<=`|less than or equal|`numrange(1.1,2.2) <= numrange(1.1,2.2)`|`t`|
|`>=`|greater than or equal|`numrange(1.1,2.2) >= numrange(1.1,2.0)`|`t`|
|`@>`|contains range|`int4range(2,4) @> int4range(2,3)`|`t`|
|`@>`|contains element|`'[2011-01-01,2011-03-01)'::tsrange @> '2011-01-10'::timestamp`|`t`|
|`<@`|range is contained by|`int4range(2,4) <@ int4range(1,7)`|`t`|
|`<@`|element is contained by|`42 <@ int4range(1,7)`|`f`|
|`&&`|overlap (have points in common)|`int8range(3,7) && int8range(4,12)`|`t`|
|`<<`|strictly left of|`int8range(1,10) << int8range(100,110)`|`t`|
|`>>`|strictly right of|`int8range(50,60) >> int8range(20,30)`|`t`|
|`&<`|does not extend to the right of|`int8range(1,20) &< int8range(18,20)`|`t`|
|`&>`|does not extend to the left of|`int8range(7,20) &> int8range(5,10)`|`t`|
|`-|-`|is adjacent to|`numrange(1.1,2.2) -|- numrange(2.2,3.3)`|`t`|
|`+`|union|`numrange(5,15) + numrange(10,20)`|`[5,20)`|
|`*`|intersection|`int8range(5,15) * int8range(10,20)`|`[10,15)`|
|`-`|difference|`int8range(5,15) - int8range(10,20)`|`[5,10)`|

The simple comparison operators `<`, `>`, `<=`, and `>=` compare the lower bounds first, and only if those are equal, compare the upper bounds. These comparisons are not usually very useful for ranges, but are provided to allo B-tree indexes to be constructed on ranges.

The left-of/right-of/adjacent operators always return false when an empty range is involved; that is, an empty range is not considered to be either before or after any other range.

The union and difference operators will fail if the resulting range would need to contain two disjoint sub-ranges, as such a range cannot be represented.

The following table shows the functions available for use with range types.

|Function|Return Type|Description|Example|Result|
|--------|-----------|-----------|-------|------|
|`lower(anyrange)`|range's element type|lower bound of range|`lower(numrange(1.1,2.2))`|`1.1`|
|`upper(anyrange)`|range's element type|upper bound of range|`upper(numrange(1.1,2.2))`|`2.2`|
|`isempty(anyrange)`|`boolean`|is the range empty?|`isempty(numrange(1.1,2.2))`|`false`|
|`lower_inc(anyrange)`|`boolean`|is the lower bound inclusive?|`lower_inc(numrange(1.1,2.2))`|`true`|
|`upper_inc(anyrange)`|`boolean`|is the upper bound inclusive?|`upper_inc(numrange(1.1,2.2))`|`false`|
|`lower_inf(anyrange)`|`boolean`|is the lower bound infinite?|`lower_inf('(,)'::daterange)`|`true`|
|`upper_inf(anyrange)`|`boolean`|is the upper bound infinite?|`upper_inf('(,)'::daterange)`|`true`|
|`range_merge(anyrange, anyrange)`|`anyrange`|the smallest range which includes both of the given ranges|`range_merge('[1,2)'::int4range, '[3,4)'::int4range)`|`[1,4)`|

The `lower` and `upper` functions return null if the range is empty or the requested bound is infinite. The `lower_inc`, `upper_inc`, `lower_inf`, and `upper_inf` functions all return false for an empty range.
