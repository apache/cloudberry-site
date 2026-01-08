---
title: Use PL/R
---

# Use PL/R

PL/R is a procedural language that allows you to write Apache Cloudberry functions using the R programming language. With the PL/R extension, you can execute R commands, use R modules and functions, and perform analytics directly within the database.

## Enable PL/R

To use PL/R, you must first ensure that R is installed on your system and then register the PL/R language in your database.

### Install R

You must install R on all hosts (coordinator and segments) in your Apache Cloudberry cluster.

1. Install R using your system's package manager.

    For Debian/Ubuntu systems:

    ```bash
    sudo apt update && sudo apt install r-base
    ```

    For RHEL/Rocky Linux systems:

    ```bash
    sudo yum install R
    ```

2. Configure the `R_HOME` environment variable.
   
    Find the R home directory:

    ```bash
    R RHOME
    # Example output: /usr/lib/R
    ```

    Add the `R_HOME` variable to `$GPHOME/greenplum_path.sh` on all hosts:

    ```bash
    export R_HOME=/usr/lib/R
    ```

3. Source the updated path file and restart the database.

    ```bash
    source $GPHOME/greenplum_path.sh
    gpstop -r
    ```

### Register PL/R extension

PL/R is an untrusted language, so only superusers can register it. Enable it for each database where you want to use it:

```sql
CREATE EXTENSION plr;
```

## Examples

The following examples demonstrate how to use PL/R for various tasks.

### Example 1: Use simple R functions

This function generates an array of numbers with a normal distribution using the R function `rnorm()`.

```sql
CREATE OR REPLACE FUNCTION r_norm(n integer, mean float8, std_dev float8) 
RETURNS float8[] 
AS $$
  x <- rnorm(n, mean, std_dev)
  return(x)
$$ LANGUAGE plr;
```

Use the function in a query:

```sql
SELECT r_norm(10, 0, 1) as x 
FROM generate_series(1, 10);
```

### Example 2: Return DataFrames

If your R function returns a `data.frame`, you must define a corresponding composite type in the database or use `RECORD`.

1. Create a type matching the `data.frame` structure:
   ```sql
   CREATE TYPE t_result AS (name text, value float8);
   ```

2. Define the PL/R function returning `SETOF` the created type:
   ```sql
   CREATE OR REPLACE FUNCTION get_data() 
   RETURNS SETOF t_result 
   AS $$
     names <- c("A", "B", "C")
     values <- c(1.1, 2.2, 3.3)
     return(data.frame(names, values))
   $$ LANGUAGE plr;
   ```

3. Call the function:
   ```sql
   SELECT * FROM get_data();
   ```

## Install R packages

You can extend PL/R functionality by installing additional R packages. These packages must be installed on **all hosts** in the cluster.

1. Download the package source (`.tar.gz`) from CRAN.
2. Copy the file to all hosts.
3. Install the package using `R CMD INSTALL`.

    ```bash
    # Example for the 'arm' package
    gpssh -f all_hosts "$R_HOME/bin/R CMD INSTALL arm_1.5-03.tar.gz"
    ```

4. Verify the package can be loaded in PL/R:

    ```sql
    CREATE OR REPLACE FUNCTION check_pkg(pkgname text) 
    RETURNS boolean 
    AS $$
        return(require(pkgname, character.only=TRUE))
    $$ LANGUAGE plr;

    SELECT check_pkg('arm');
    ```

## Display R library information

You can check installed packages and libraries using R commands or PL/R functions.

To list installed packages via PL/R:

```sql
CREATE OR REPLACE FUNCTION list_packages() 
RETURNS text[] 
AS $$
  return(rownames(installed.packages()))
$$ LANGUAGE plr;

SELECT list_packages();
```
