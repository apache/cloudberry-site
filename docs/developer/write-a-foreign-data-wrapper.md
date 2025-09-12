---
title: Write a Foreign Data Wrapper
---

# Write a Foreign Data Wrapper

This guide outlines how to write a new foreign data wrapper (FDW) for Apache Cloudberry. A foreign data wrapper is a library that consists of a set of functions that the Apache Cloudberry server calls to access external data sources. The FDW is responsible for fetching data from remote data stores and returning it to the Apache Cloudberry executor.

FDWs enable Apache Cloudberry to treat external data sources as if they were regular database tables, allowing you to query external data using standard SQL.

## Before you begin

### Requirements

When developing with the Apache Cloudberry foreign data wrapper API:

- Your development system must have the same hardware and software architecture as your Apache Cloudberry hosts
- Code must be written in a compiled language such as C, using the version-1 interface
- Symbol names in your object files must not conflict with each other or with symbols defined in the Apache Cloudberry server
- You should be familiar with the foreign table concepts described in [Accessing External Data with Foreign Tables](/docs/external/g-foreign.html)

### Header files

The Apache Cloudberry header files for FDW development are located in `$GPHOME/include/postgresql/server/`:

- `foreign/fdwapi.h` - FDW API structures and callback function signatures
- `foreign/foreign.h` - Foreign data wrapper helper structs and functions
- `catalog/pg_foreign_table.h` - Foreign table definition
- `catalog/pg_foreign_server.h` - Foreign server definition

## FDW architecture

An FDW consists of two main components:

1. A handler function that returns a struct containing function pointers to all the callback functions needed by Apache Cloudberry to interact with the external data source.
2. An optional validator function that validates configuration options provided in `CREATE` and `ALTER` commands for the foreign data wrapper, servers, user mappings, and foreign tables.

### Handler function

The handler function is SQL-invokable and returns a struct containing pointers to callback functions:

```c
CREATE FUNCTION my_fdw_handler()
  RETURNS fdw_handler
  AS 'MODULE_PATHNAME'
LANGUAGE C STRICT;
```

### Validator function

The validator function validates options for FDW objects:

```c
CREATE FUNCTION my_fdw_validator(text[], oid)
  RETURNS void
  AS 'MODULE_PATHNAME'
LANGUAGE C STRICT;
```

## Callback functions

The FDW API defines callback functions that Apache Cloudberry invokes when scanning and updating foreign tables. The handler function returns a `FdwRoutine` struct containing pointers to these functions.

### Required scan-related callbacks

These functions are required for all FDWs:

#### GetForeignRelSize

```c
void GetForeignRelSize(PlannerInfo *root,
                       RelOptInfo *baserel,
                       Oid foreigntableid)
```

Obtain relation size estimates for a foreign table. Called at the beginning of planning.

#### GetForeignPaths

```c
void GetForeignPaths(PlannerInfo *root,
                     RelOptInfo *baserel,
                     Oid foreigntableid)
```

Create possible access paths for a scan on a foreign table. Must call `create_foreignscan_path()` for Apache Cloudberry compatibility.

#### GetForeignPlan

```c
ForeignScan *GetForeignPlan(PlannerInfo *root,
                            RelOptInfo *baserel,
                            Oid foreigntableid,
                            ForeignPath *best_path,
                            List *tlist,
                            List *scan_clauses)
```

Create a ForeignScan plan node from the selected foreign access path.

#### BeginForeignScan

```c
void BeginForeignScan(ForeignScanState *node,
                      int eflags)
```

Begin executing a foreign scan. Called during executor startup.

#### IterateForeignScan

```c
TupleTableSlot *IterateForeignScan(ForeignScanState *node)
```

Fetch one row from the foreign source. Return NULL when no more rows are available.

#### ReScanForeignScan

```c
void ReScanForeignScan(ForeignScanState *node)
```

Restart the scan from the beginning.

#### EndForeignScan

```c
void EndForeignScan(ForeignScanState *node)
```

End the scan and release resources.

### Optional update-related callbacks

If your FDW supports write operations, implement these functions:

#### ExecForeignInsert

```c
TupleTableSlot *ExecForeignInsert(EState *estate,
                                  ResultRelInfo *rinfo,
                                  TupleTableSlot *slot,
                                  TupleTableSlot *planSlot)
```

Insert a single tuple into the foreign table.

#### ExecForeignUpdate

```c
TupleTableSlot *ExecForeignUpdate(EState *estate,
                                  ResultRelInfo *rinfo,
                                  TupleTableSlot *slot,
                                  TupleTableSlot *planSlot)
```

Update a single tuple in the foreign table.

#### ExecForeignDelete

```c
TupleTableSlot *ExecForeignDelete(EState *estate,
                                  ResultRelInfo *rinfo,
                                  TupleTableSlot *slot,
                                  TupleTableSlot *planSlot)
```

Delete a single tuple from the foreign table.

## Apache Cloudberry considerations

### The mpp_execute option

Apache Cloudberry supports parallel execution through the `mpp_execute` option. Your FDW should handle this option to determine where to request or send data:

```c
ForeignTable *table = GetForeignTable(foreigntableid);
if (table->exec_location == FTEXECLOCATION_ALL_SEGMENTS)
{
    // Execute on all segments in parallel
}
else if (table->exec_location == FTEXECLOCATION_ANY)
{
    // Execute on coordinator or any one segment
}
else if (table->exec_location == FTEXECLOCATION_COORDINATOR)
{
    // Execute on coordinator only (default)
}
```

### Segment identification

For parallel execution (`mpp_execute 'all segments'`), each segment must determine which portion of the data is its responsibility:

```c
int segmentNumber = GpIdentity.segindex;
int totalNumberOfSegments = getgpsegmentCount();
```

### Parallel write operations

Apache Cloudberry supports parallel write operations only when `mpp_execute` is set to `'all segments'`. For other settings, write operations are initiated through the coordinator.

## Example FDW implementation

Here's a basic skeleton for an FDW:

```c
#include "postgres.h"
#include "foreign/fdwapi.h"
#include "foreign/foreign.h"

PG_MODULE_MAGIC;

// Function declarations
extern Datum my_fdw_handler(PG_FUNCTION_ARGS);
extern Datum my_fdw_validator(PG_FUNCTION_ARGS);

// FDW callback functions
static void myGetForeignRelSize(PlannerInfo *root,
                                RelOptInfo *baserel,
                                Oid foreigntableid);
static void myGetForeignPaths(PlannerInfo *root,
                              RelOptInfo *baserel,
                              Oid foreigntableid);
// ... other callback functions

PG_FUNCTION_INFO_V1(my_fdw_handler);
Datum
my_fdw_handler(PG_FUNCTION_ARGS)
{
    FdwRoutine *fdwroutine = makeNode(FdwRoutine);

    // Required scan functions
    fdwroutine->GetForeignRelSize = myGetForeignRelSize;
    fdwroutine->GetForeignPaths = myGetForeignPaths;
    fdwroutine->GetForeignPlan = myGetForeignPlan;
    fdwroutine->BeginForeignScan = myBeginForeignScan;
    fdwroutine->IterateForeignScan = myIterateForeignScan;
    fdwroutine->ReScanForeignScan = myReScanForeignScan;
    fdwroutine->EndForeignScan = myEndForeignScan;

    // Optional write functions
    fdwroutine->ExecForeignInsert = myExecForeignInsert;
    fdwroutine->ExecForeignUpdate = myExecForeignUpdate;
    fdwroutine->ExecForeignDelete = myExecForeignDelete;

    PG_RETURN_POINTER(fdwroutine);
}

PG_FUNCTION_INFO_V1(my_fdw_validator);
Datum
my_fdw_validator(PG_FUNCTION_ARGS)
{
    List *options_list = untransformRelOptions(PG_GETARG_DATUM(0));
    Oid catalog = PG_GETARG_OID(1);
    
    // Validate options based on catalog type
    // Implementation depends on your FDW's specific options
    
    PG_RETURN_VOID();
}
```

## Building and packaging

### Using PGXS

Create a Makefile using the PostgreSQL build extension infrastructure:

```makefile
MODULE_big = my_fdw
OBJS = my_fdw.o

PG_CONFIG = pg_config
PGXS := $(shell $(PG_CONFIG) --pgxs)

PG_CPPFLAGS = -I$(shell $(PG_CONFIG) --includedir)
SHLIB_LINK = -L$(shell $(PG_CONFIG) --libdir)
include $(PGXS)
```

### Creating an extension

Create SQL script file (`my_fdw--1.0.sql`):

```sql
CREATE FUNCTION my_fdw_handler()
  RETURNS fdw_handler
  AS 'MODULE_PATHNAME'
LANGUAGE C STRICT;

CREATE FUNCTION my_fdw_validator(text[], oid)
  RETURNS void
  AS 'MODULE_PATHNAME'
LANGUAGE C STRICT;

CREATE FOREIGN DATA WRAPPER my_fdw
  HANDLER my_fdw_handler
  VALIDATOR my_fdw_validator;
```

Create control file (`my_fdw.control`):

```ini
# my_fdw extension
comment = 'My custom foreign data wrapper'
default_version = '1.0'
module_pathname = '$libdir/my_fdw'
relocatable = true
```

Update Makefile for extension:

```makefile
EXTENSION = my_fdw
DATA = my_fdw--1.0.sql
```

## Deployment

For Apache Cloudberry clusters:

1. Install shared library to `$GPHOME/lib/postgresql/` on all hosts.
2. Install extension files to `$GPHOME/share/postgresql/extension/` on all hosts.
3. Set permissions so `gpadmin` user can access all files.
4. Install on all hosts - coordinator and all segment hosts.

## Testing your FDW

### Basic functionality test

```sql
-- Create extension
CREATE EXTENSION my_fdw;

-- Create foreign server
CREATE SERVER my_server
    FOREIGN DATA WRAPPER my_fdw
    OPTIONS (host 'remote-host', port '5432');

-- Create user mapping
CREATE USER MAPPING FOR current_user
    SERVER my_server
    OPTIONS (user 'remote_user', password 'remote_password');

-- Create foreign table
CREATE FOREIGN TABLE my_foreign_table (
    id integer,
    name text
) SERVER my_server
OPTIONS (table_name 'remote_table');

-- Test query
SELECT * FROM my_foreign_table LIMIT 5;
```

### Parallel execution test

```sql
-- Test parallel execution
CREATE FOREIGN TABLE parallel_test (
    id integer,
    data text
) SERVER my_server
OPTIONS (
    table_name 'large_table',
    mpp_execute 'all segments'
);

SELECT count(*) FROM parallel_test;
```

## Best practices

- Implement comprehensive error handling throughout your FDW code, ensuring that all failure modes are properly reported to users with clear, actionable error messages.
- Use PostgreSQL memory contexts correctly to prevent memory leaks and ensure proper cleanup when queries are cancelled or encounter errors.
- Design your FDW to handle bulk data operations efficiently and take advantage of Apache Cloudberry's parallel processing capabilities where appropriate.
- Validate all user inputs and configuration parameters, implement secure authentication mechanisms, and follow security best practices for external data access.
- Create thorough documentation that explains all configuration options, connection parameters, and usage examples for administrators and developers.
- Develop comprehensive test suites that cover various data types, edge cases, error conditions, and performance scenarios across different external data sources.

## Debugging

### Enable verbose logging

Set in postgresql.conf:
```ini
log_min_messages = DEBUG1
```

### Use elog for debugging

```c
elog(DEBUG1, "FDW: Processing %d rows", row_count);
elog(WARNING, "FDW: Connection failed, retrying...");
```

### Common issues

1. Segmentation faults frequently occur due to improper memory management, such as accessing freed memory or buffer overruns in C code.
2. Symbol name conflicts can arise when multiple extensions define functions with the same names; ensure all function names are unique and properly namespaced.
3. Parallel execution issues are often difficult to debug; start testing with single-segment configurations before enabling multi-segment parallel processing.
4. Performance bottlenecks may appear in data conversion or network operations; use profiling tools to identify and optimize critical code paths.

## Learn more

- [Foreign Data Wrapper Helper Functions](https://www.postgresql.org/docs/12/fdw-helpers.html)
- [Foreign Data Wrapper Callback Routines](https://www.postgresql.org/docs/12/fdw-callbacks.html)
