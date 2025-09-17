---
title: Handle Data Loading Errors
---

# Handle Data Loading Errors

Real-world data is often imperfect, containing formatting errors, missing values, or inconsistent data types. Apache Cloudberry provides robust error handling mechanisms that allow you to load correctly formatted data while isolating and managing problematic rows, ensuring your ETL processes are resilient and reliable.

By default, if external table data contains any error, the entire load operation fails and no data is loaded. With error handling enabled, you can load valid data and deal with problematic rows separately.

## Error handling modes

Apache Cloudberry supports two error handling approaches:

1. Single row error isolation allows the system to skip individual problematic rows and continue processing the remaining valid data, preventing entire operations from failing due to isolated data quality issues.
2. Error logging functionality captures comprehensive details about problematic data rows, including error descriptions, line numbers, and the actual data that caused the failure, enabling thorough analysis and remediation.

## Single row error isolation

### Basic error isolation

Enable single row error isolation by adding `SEGMENT REJECT LIMIT` to your external table definition:

```sql
CREATE EXTERNAL TABLE sales_data_with_errors (
    transaction_id int,
    product_name text,
    sale_date date,
    amount decimal(10,2)
)
LOCATION ('gpfdist://etl-server:8081/sales/*.csv')
FORMAT 'CSV' (HEADER)
SEGMENT REJECT LIMIT 100;
```

This configuration allows up to 100 rows with errors per segment before the operation fails.

### Percentage-based limits

You can also specify error limits as a percentage:

```sql
CREATE EXTERNAL TABLE sales_data (
    transaction_id int,
    product_name text, 
    sale_date date,
    amount decimal(10,2)
)
LOCATION ('gpfdist://etl-server:8081/sales/*.csv')
FORMAT 'CSV' (HEADER)
SEGMENT REJECT LIMIT 5 PERCENT;
```

This allows up to 5% of rows to contain errors before failing.

## Error logging

### Enable error logging

Use `LOG ERRORS` to capture detailed information about rejected rows:

```sql
CREATE EXTERNAL TABLE sales_data_logged (
    transaction_id int,
    product_name text,
    sale_date date,
    amount decimal(10,2)
)
LOCATION ('gpfdist://etl-server:8081/sales/*.csv')
FORMAT 'CSV' (HEADER)
LOG ERRORS 
SEGMENT REJECT LIMIT 50;
```

### Persistent error logging

For long-term error analysis, use persistent error logging:

```sql
CREATE EXTERNAL TABLE sales_data_persistent (
    transaction_id int,
    product_name text,
    sale_date date,
    amount decimal(10,2)
)
LOCATION ('gpfdist://etl-server:8081/sales/*.csv')
FORMAT 'CSV' (HEADER)
LOG ERRORS PERSISTENTLY
SEGMENT REJECT LIMIT 25;
```

## View error information

### Query error logs

When error logging is enabled, Apache Cloudberry creates error log tables that you can query:

```sql
-- Views recent errors from the current session.
SELECT * FROM gp_read_error_log('sales_data_logged');
```

### Error log table structure

The error log contains these columns:

| Column | Description |
|--------|-------------|
| `cmdtime` | Timestamp when the error occurred |
| `relname` | Name of the external table |
| `filename` | Source file containing the error |
| `linenum` | Line number in the source file |
| `bytenum` | Byte position in the source file |
| `errmsg` | Error message description |
| `rawdata` | Raw data that caused the error |
| `rawbytes` | Raw bytes of the problematic data |

### Example error analysis

```sql
-- Find the most common error types
SELECT errmsg, COUNT(*) as error_count
FROM gp_read_error_log('sales_data_logged')
GROUP BY errmsg
ORDER BY error_count DESC;

-- Views specific error details.
SELECT cmdtime, filename, linenum, errmsg, rawdata
FROM gp_read_error_log('sales_data_logged')
WHERE errmsg LIKE '%invalid input syntax%'
ORDER BY cmdtime DESC;
```

## Common data errors and solutions

### Data type conversion errors

**Error**: `invalid input syntax for type numeric`
**Cause**: Non-numeric data in numeric columns
**Solution**: Clean data or use text columns with post-processing

```sql
-- Original problematic data: "N/A" in amount column.
-- Solution: Use text type and handle conversion later.
CREATE EXTERNAL TABLE sales_flexible (
    transaction_id int,
    product_name text,
    sale_date text,  -- Use text for flexible parsing
    amount text      -- Use text to handle "N/A" values
)
LOCATION ('gpfdist://etl-server:8081/sales/*.csv')
FORMAT 'CSV' (HEADER)
LOG ERRORS SEGMENT REJECT LIMIT 10 PERCENT;
```

### Date format issues

**Error**: `invalid input syntax for type date`  
**Cause**: Inconsistent date formats
**Solution**: Standardize date formats or use flexible parsing.

```sql
-- Handles multiple date formats in post-processing.
SELECT 
    transaction_id,
    product_name,
    CASE 
        WHEN sale_date ~ '^\d{4}-\d{2}-\d{2}$' THEN sale_date::date
        WHEN sale_date ~ '^\d{2}/\d{2}/\d{4}$' THEN to_date(sale_date, 'MM/DD/YYYY')
        ELSE NULL
    END as parsed_date,
    amount::decimal(10,2)
FROM sales_flexible
WHERE sale_date IS NOT NULL;
```

### Miss or extra columns

**Error**: `extra data after last expected column`  
**Cause**: Inconsistent number of columns
**Solution**: Use more flexible table definition

```sql
-- Adds extra optional columns to handle variable column counts.
CREATE EXTERNAL TABLE flexible_sales (
    transaction_id int,
    product_name text,
    sale_date date,
    amount decimal(10,2),
    extra_field1 text,  -- Optional fields
    extra_field2 text,
    extra_field3 text
)
LOCATION ('gpfdist://etl-server:8081/sales/*.csv')
FORMAT 'CSV' (HEADER)
LOG ERRORS SEGMENT REJECT LIMIT 20 PERCENT;
```

### Character encoding issues

**Error**: `invalid byte sequence`
**Cause**: Character encoding mismatch
**Solution**: Specify correct encoding

```sql
CREATE EXTERNAL TABLE encoded_data (
    id int,
    description text
)
LOCATION ('gpfdist://etl-server:8081/data/*.txt')
FORMAT 'TEXT' (DELIMITER '|')
ENCODING 'LATIN1'  -- Specify encoding
LOG ERRORS SEGMENT REJECT LIMIT 5 PERCENT;
```

## Error handling strategies

### Two-phase loading

Use a staging approach for complex data cleaning:

```sql
-- Phase 1: Load into staging table with flexible types
CREATE EXTERNAL TABLE sales_staging (
    transaction_id text,
    product_name text,
    sale_date text,
    amount text,
    raw_line text  -- Store entire row for complex cases
)
LOCATION ('gpfdist://etl-server:8081/sales/*.csv')
FORMAT 'CSV'
LOG ERRORS SEGMENT REJECT LIMIT 20 PERCENT;

-- Phase 2: Clean and insert into final table
INSERT INTO sales_final (transaction_id, product_name, sale_date, amount)
SELECT 
    transaction_id::int,
    product_name,
    sale_date::date,
    amount::decimal(10,2)
FROM sales_staging
WHERE transaction_id ~ '^\d+$'  -- Validate numeric ID
  AND sale_date ~ '^\d{4}-\d{2}-\d{2}$'  -- Validate date format
  AND amount ~ '^\d+\.?\d*$';  -- Validate amount format
```

### Error threshold monitoring

Set up monitoring for error rates:

```sql
-- Function to check error rate
CREATE OR REPLACE FUNCTION check_error_rate(table_name text, threshold_percent numeric)
RETURNS boolean AS $$
DECLARE
    error_count int;
    total_count int;
    error_rate numeric;
BEGIN
    SELECT COUNT(*) INTO error_count FROM gp_read_error_log(table_name);
    
    -- Estimate total processed rows (depends on your tracking method)
    SELECT reltuples INTO total_count FROM pg_class WHERE relname = table_name;
    
    IF total_count > 0 THEN
        error_rate := (error_count::numeric / total_count) * 100;
        RETURN error_rate <= threshold_percent;
    END IF;
    
    RETURN true;
END;
$$ LANGUAGE plpgsql;

-- Usage
SELECT check_error_rate('sales_data_logged', 5.0);  -- Check if error rate is under 5%
```

## Best practices

### Design for errors

1. Begin with permissive table definitions using text data types and generous error limits to understand the full scope of data quality issues before implementing strict validation rules.
2. Implement data validation incrementally by gradually adding constraints and type conversions as you gain confidence in data quality and identify patterns in the error logs.
3. Establish regular monitoring and review processes for error logs to identify systematic data quality issues and trends that may indicate problems with source systems or data processing pipelines.

### Error limit guidelines

| Data Quality | Suggested Reject Limit | Use Case |
|--------------|----------------------|----------|
| High quality | 1-10 rows | Production systems |
| Medium quality | 1-5% | Development/testing |
| Poor quality | 10-20% | Initial data exploration |
| Unknown quality | 50% | Data discovery phase |

### Operational procedures

1. Establish a regular schedule for cleaning up old error logs to prevent excessive storage consumption and maintain system performance.
2. Configure monitoring systems to alert when error rates exceed predefined thresholds, enabling quick response to data quality issues.
3. Maintain communication channels with data providers to share error patterns and collaborate on improving source data quality.

### Performance considerations

1. Error logging functionality introduces some computational overhead during data loading operations, so consider this impact when processing large datasets.
2. Setting higher segment reject limits allows more rows to be processed before the operation fails, but this also means more resources are consumed analyzing problematic data.
3. Error log tables can grow significantly in production environments, so implement monitoring to track storage usage and prevent disk space issues.

## Troubleshooting

### High error rates

If you are experiencing high error rates:

1. Analyze the error log entries to identify patterns or systematic issues in your data, such as consistent formatting problems or missing values in specific columns.
2. Work with data providers to verify the quality and consistency of source data, including checking for recent changes in data formats or processing.
3. Carefully review your external table definitions to ensure that column data types, delimiters, and format specifications accurately match the actual data structure.
4. Start troubleshooting with small data samples to isolate issues quickly before processing larger datasets.

### Performance issues

If error handling is impacting performance:

1. Fine-tune your segment reject limits to balance between fault tolerance and processing efficiency, avoiding unnecessarily high thresholds that waste resources.
2. For complex data with known quality issues, consider implementing a two-phase loading process using staging tables with flexible data types.
3. Break large data loads into smaller, manageable batches to reduce memory pressure and improve error isolation.
4. Continuously monitor system resources including memory usage, disk I/O, and storage consumption during data loading operations.

## Learn more

- [Load Data Using gpfdist](/docs/data-loading/load-data-using-gpfdist.md)
- [Load Data Using COPY](/docs/data-loading/load-data-using-copy.md)
