---
title: pg_test_fsync
---


# pg_test_fsync

Determines the fastest `wal_sync_method`, which specifies the method used for forcing write-ahead log (WAL) updates out to disk for Cloudberry Database.


## Synopsis

```shell
pg_test_fsync [<option> ...]

pg_test_fsync -? | --help

pg_test_fsync -V | --version
```


## Description

`pg_test_fsync` is a standard PostgreSQL utility that you can use to determine what the fastest `wal_sync_method` is on your specific system. It also provides diagnostic information in the event of an identified I/O problem. However, differences reported by `pg_test_fsync` might not significantly impact real-world database throughput, because many database servers are not speed-limited by their write-ahead logs.

`pg_test_fsync` reports the average time for file synchronization operations, measured in microseconds, for each `wal_sync_method`. This information can also be used to optimize the `commit_delay` parameter, which introduces a configurable delay before initiating a WAL flush.


## Options

The following command-line options are available:

**`-f`**<br />
**`--filename`**

Specifies the name of the file that is used to write test data. This file must reside on the same file system as the `pg_wal` directory, where WAL files are stored. By default, the file is named `pg_test_fsync.out` and is created in the current directory.

**`-s`**<br />
**`--secs-per-test`**

Sets the duration of each test in seconds. A longer duration increases the accuracy of the test but also extends the total run time. The default value is 5 seconds, allowing the program to complete in under 2 minutes.

**`-V`**<br />
**`--version`**

Prints the `pg_test_fsync` version, and exits.

**`-?`**<br />
**`--help`**

Shows help about `pg_test_fsync` command line arguments, and exits.


## Environment

**`PG_COLOR`**

Specifies whether to use color in diagnostic messages. Possible values are `always`, `auto`, and `never`.