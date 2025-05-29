---
title: Post installation
---

## Validate basic functionalities

Run the installcheck test suite to verify basic functionality. It is recommended to test with both Orca (the query optimizer) enabled and disabled:

```bash
# Run tests with Orca optimizer enabled
PGOPTIONS='-c optimizer=on' make --directory=~/cloudberry installcheck

# Run tests with Orca optimizer disabled
PGOPTIONS='-c optimizer=off' make --directory=~/cloudberry installcheck
```

:::tip
Even though Orca is the default Cloudberry optimizer, you must explicitly set `optimizer=on` when running installcheck. Without this setting, the `explain` test will fail due to missing the explicit configuration option.
:::

### 1. Test results

The installcheck target provides a basic test of functionality. During execution, you'll see output like this:

```bash
test tablespace                   ... ok         3236 ms (diff   76 ms)
parallel group (20 tests):  pg_lsn oid txid name char varchar int2 regproc text ...
     boolean                      ... ok          862 ms (diff   56 ms)
     char                         ... ok          419 ms (diff   87 ms)
     explain                      ... FAILED      310 ms (diff  139 ms)
```

At the end, you'll see a summary, for example:

```
========================
 1 of 658 tests failed. 
========================
```

If any tests fail:

- `regression.diffs`: Shows differences between actual and expected results
- `regression.out`: Contains the complete test execution output

The files will be located in `/home/gpadmin/cloudberry/src/test/regress/`.

:::note
installcheck is just one of several test schedules available. This guide focuses on basic development environment setup and validation.
:::

### 2. Troubleshoot test failures

If a test fails, you might need to examine the log files from various cluster components. You can locate the data directories containing these logs by querying the segment configuration:

```bash
psql -P pager=off template1 -c 'SELECT * from gp_segment_configuration'
```

This shows the complete cluster configuration. The `content = -1` identifies coordinator nodes:

```sql
 dbid | content | role | preferred_role | mode | status | port | hostname | address |                                  datadir                                   | warehouseid 
------+---------+------+----------------+------+--------+------+----------+---------+----------------------------------------------------------------------------+-------------
    1 |      -1 | p    | p              | n    | u      | 7000 | mdw      | mdw     | /home/gpadmin/cloudberry/gpAux/gpdemo/datadirs/qddir/demoDataDir-1         |           0
    8 |      -1 | m    | m              | s    | u      | 7001 | mdw      | mdw     | /home/gpadmin/cloudberry/gpAux/gpdemo/datadirs/standby                     |           0
    2 |       0 | p    | p              | s    | u      | 7002 | mdw      | mdw     | /home/gpadmin/cloudberry/gpAux/gpdemo/datadirs/dbfast1/demoDataDir0        |           0
    5 |       0 | m    | m              | s    | u      | 7005 | mdw      | mdw     | /home/gpadmin/cloudberry/gpAux/gpdemo/datadirs/dbfast_mirror1/demoDataDir0 |           0
    3 |       1 | p    | p              | s    | u      | 7003 | mdw      | mdw     | /home/gpadmin/cloudberry/gpAux/gpdemo/datadirs/dbfast2/demoDataDir1        |           0
    6 |       1 | m    | m              | s    | u      | 7006 | mdw      | mdw     | /home/gpadmin/cloudberry/gpAux/gpdemo/datadirs/dbfast_mirror2/demoDataDir1 |           0
    4 |       2 | p    | p              | s    | u      | 7004 | mdw      | mdw     | /home/gpadmin/cloudberry/gpAux/gpdemo/datadirs/dbfast3/demoDataDir2        |           0
    7 |       2 | m    | m              | s    | u      | 7007 | mdw      | mdw     | /home/gpadmin/cloudberry/gpAux/gpdemo/datadirs/dbfast_mirror3/demoDataDir2 |           0
```

Each `datadir` contains log files that can help diagnose test failures. Review the logs in the relevant component's directory based on which test failed. 