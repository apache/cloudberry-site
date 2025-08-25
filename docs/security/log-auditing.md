---
title: Log Auditing
---

# Log Auditing

This document describes Apache Cloudberry events that are logged and should be monitored to detect security threats.

Apache Cloudberry is capable of auditing a variety of events, including startup and shutdown of the system, segment database failures, SQL statements that result in an error, and all connection attempts and disconnections. Apache Cloudberry also logs SQL statements and information regarding SQL statements, and can be configured in a variety of ways to record audit information with more or less detail. The `log_error_verbosity` configuration parameter controls the amount of detail written in the server log for each message that is logged.  Similarly, the `log_min_error_statement` parameter allows administrators to configure the level of detail recorded specifically for SQL statements, and the `log_statement` parameter determines the kind of SQL statements that are audited. Apache Cloudberry records the username for all auditable events, when the event is initiated by a subject outside the Apache Cloudberry.

Apache Cloudberry prevents unauthorized modification and deletion of audit records by only allowing administrators with an appropriate role to perform any operations on log files.  Logs are stored in a proprietary format using comma-separated values (CSV).  Each segment and the coordinator stores its own log files, although these can be accessed remotely by an administrator.  Apache Cloudberry also authorizes overwriting of old log files via the `log_truncate_on_rotation` parameter.  This is a local parameter and must be set on each segment and coordinator configuration file.

Cloudberry provides an administrative schema called `gp_toolkit` that you can use to query log files, as well as system catalogs and operating environment for system status information. For more information, including usage, refer to [`gp_toolkit` - View server log files](../sys-catalogs/gp_toolkit.md#view-server-log-files).

Apache Cloudberry includes the PostgreSQL Audit Extension, or pgaudit, which provides detailed session and object audit logging via the standard logging facility provided by PostgreSQL. The goal of PostgreSQL Audit is to provide the tools needed to produce audit logs required to pass certain government, financial, or ISO certification audits.

## View the database server log files

Every database instance in Apache Cloudberry (coordinator and segments) is a running PostgreSQL database server with its own server log file. Daily log files are created in the `log` directory of the coordinator and each segment data directory.

The server log files are written in comma-separated values (CSV) format. Not all log entries will have values for all of the log fields. For example, only log entries associated with a query worker process will have the `slice_id` populated. Related log entries of a particular query can be identified by its session identifier (`gp_session_id`) and command identifier (`gp_command_count`).

|\# |Field name |Data type |description |
|:--|:----------|:---------|:-----------|
|1 |event_time |timestamp with time zone |Time that the log entry was written to the log |
|2 |user_name |varchar(100) |The database user name |
|3 |database_name |varchar(100) |The database name |
|4 |process_id |varchar(10) |The system process id (prefixed with "p") |
|5 |thread_id |varchar(50) |The thread count (prefixed with "th") |
|6 |remote_host |varchar(100) |On the coordinator, the hostname/address of the client machine. On the segment, the hostname/address of the coordinator. |
|7 |remote_port |varchar(10) |The segment or coordinator port number |
|8 |session_start_time |timestamp with time zone |Time session connection was opened |
|9 |transaction_id |int |Top-level transaction ID on the coordinator. This ID is the parent of any subtransactions. |
|10 |gp_session_id |text |Session identifier number (prefixed with "con") |
|11 |gp_command_count |text |The command number within a session (prefixed with "cmd") |
|12 |gp_segment |text |The segment content identifier (prefixed with "seg" for primaries or "mir" for mirrors). The coordinator always has a content id of -1. |
|13 |slice_id |text |The slice id (portion of the query plan being run) |
|14 |distr_tranx_id text |Distributed transaction ID | 
|15 |local_tranx_id |text |Local transaction ID |
|16 |sub_tranx_id |text |Subtransaction ID |
|17 |event_severity  |varchar(10) |Values include: LOG, ERROR, FATAL, PANIC, DEBUG1, DEBUG2 |
|18 |sql_state_code |varchar(10) |SQL state code associated with the log message |
|19 |event_message |text |Log or error message text |
|20 |event_detail |text |Detail message text associated with an error or warning message |
|21 |event_hint |text |Hint message text associated with an error or warning message |
|22 |internal_query |text |The internally-generated query text |
|23 |internal_query_pos |int |The cursor index into the internally-generated query text |
|24 |event_context |text |The context in which this message gets generated |
|25 |debug_query_string |text |User-supplied query string with full detail for debugging. This string can be modified for internal use. |
|26 |error_cursor_pos |int |The cursor index into the query string |
|27 |func_name |text |The function in which this message is generated |
|28 |file_name |text |The internal code file where the message originated |
|29 |file_line |int |The line of the code file where the message originated |
|30 |stack_trace |text |Stack trace text associated with this message |

Cloudberry provides a utility called `gplogfilter` that can be used to search through a Apache Cloudberry log file for entries matching the specified criteria. By default, this utility searches through the Cloudberry coordinator log file in the default logging location. For example, to display the last three lines of the coordinator log file:

```shell
$ gplogfilter -n 3
```

You can also use `gplogfilter` to search through all segment log files at once by running it through the `gpssh` utility. For example, to display the last three lines of each segment log file:

```shell
$ gpssh -f seg_host_file
  => source /usr/local/cloudberry-db/cloudberry-env.sh
  => gplogfilter -n 3 /data*/*/gp*/pg_log/gpdb*.csv
```

The following are the Cloudberry security-related audit (or logging) server configuration parameters that are set in the postgresql.conf configuration file:

|Field Name |Value Range |Default |Description |
|:-----------|:------------|:--------|:------------|
|log_connections |Boolean |off |This outputs a line to the server log detailing each successful connection. Some client programs, like psql, attempt to connect twice while determining if a password is required, so duplicate “connection received” messages do not always indicate a problem. |
|log_disconnections |Boolean |off |This outputs a line in the server log at termination of a client session, and includes the duration of the session. |
|log_statement |NONE<br/>DDL<br/>MOD<br/>ALL |ALL |Controls which SQL statements are logged. DDL logs all data definition commands like CREATE, ALTER, and DROP commands. MOD logs all DDL statements, plus INSERT, UPDATE, DELETE, TRUNCATE, and COPY FROM. PREPARE and EXPLAIN ANALYZE statements are also logged if their contained command is of an appropriate type. |
|log_hostname |Boolean |off |By default, connection log messages only show the IP address of the connecting host. Turning on this option causes logging of the host name as well. Note that depending on your host name resolution setup this might impose a non-negligible performance penalty. |
|log_duration |Boolean |off |Causes the duration of every completed statement which satisfies log_statement to be logged. |
|log_error_verbosity |TERSE<br/>DEFAULT<br/>VERBOSE |DEFAULT |Controls the amount of detail written in the server log for each message that is logged. |
|log_min_duration_statement |number of milliseconds, 0, -1 |-1 |Logs the statement and its duration on a single log line if its duration is greater than or equal to the specified number of milliseconds. Setting this to 0 will print all statements and their durations. -1 deactivates the feature. For example, if you set it to 250 then all SQL statements that run 250ms or longer will be logged. Enabling this option can be useful in tracking down unoptimized queries in your applications. |
|log_min_messages |DEBUG5<br/>DEBUG4<br/>DEBUG3<br/>DEBUG2<br/>DEBUG1<br/>INFO<br/>NOTICE<br/>WARNING<br/>ERROR<br/>LOG<br/>FATAL<br/>PANIC |NOTICE |Controls which message levels are written to the server log. Each level includes all the levels that follow it. The later the level, the fewer messages are sent to the log. |
|log_rotation_size |0 - INT_MAX/1024 kilobytes|1048576|When greater than 0, a new log file is created when this number of kilobytes have been written to the log. Set to zero to deactivate size-based creation of new log files. |
|log_rotation_age |Any valid time expression (number and unit) |1d |Determines the lifetime of an individual log file. When this amount of time has elapsed since the current log file was created, a new log file will be created. Set to zero to deactivate time-based creation of new log files. |
|log_statement_stats |Boolean |off |For each query, write total performance statistics of the query parser, planner, and executor to the server log. This is a crude profiling instrument. |
|log_truncate_on_rotation |Boolean |off |Truncates (overwrites), rather than appends to, any existing log file of the same name. Truncation will occur only when a new file is being opened due to time-based rotation. For example, using this setting in combination with a `log_filename` such as `gpseg#-%H.log` would result in generating twenty-four hourly log files and then cyclically overwriting them. When off, pre-existing files will be appended to in all cases. |
