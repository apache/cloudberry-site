---
title: auto_explain
---

# auto_explain

The `auto_explain` module logs the execution plans of slow statements automatically, without having to run `EXPLAIN` by hand.

In Apache Cloudberry, `auto_explain` takes effect only in regular sessions on the coordinator. When the library is loaded in a segment process or in a utility-mode connection, it does nothing and does not define its configuration parameters. Otherwise, it works like the PostgreSQL `auto_explain` module. With `auto_explain.log_analyze` enabled, the logged plan also includes the per-slice execution statistics collected from the segments.

## Load the module

`auto_explain` is built and installed by a default Apache Cloudberry build. It is a library, not an extension: it provides no SQL objects, and you do not run `CREATE EXTENSION` for it.

To load the module into a single session, run the following command as a superuser:

```sql
LOAD 'auto_explain';
```

To load it into all sessions, add `auto_explain` to `session_preload_libraries` or `shared_preload_libraries`. A change to `shared_preload_libraries` requires a restart of the cluster. Preloading lets you track slow queries whenever they happen, at the cost of some overhead for all queries.

## Configuration parameters

The module does nothing until `auto_explain.log_min_duration` is set to a value other than `-1`. Only superusers can change these parameters.

| Parameter | Description |
|-----------|-------------|
| `auto_explain.log_min_duration` | Minimum statement execution time, in milliseconds, above which the plan is logged. `0` logs all plans. `-1` (the default) turns logging off. |
| `auto_explain.log_analyze` | Logs `EXPLAIN ANALYZE` output instead of `EXPLAIN` output. |
| `auto_explain.log_buffers` | Logs buffer usage. Takes effect only when `log_analyze` is on. |
| `auto_explain.log_wal` | Logs WAL usage. Takes effect only when `log_analyze` is on. |
| `auto_explain.log_timing` | Collects per-node timing. Takes effect only when `log_analyze` is on. |
| `auto_explain.log_triggers` | Includes trigger statistics. Takes effect only when `log_analyze` is on. |
| `auto_explain.log_verbose` | Logs `EXPLAIN VERBOSE` output. |
| `auto_explain.log_settings` | Logs the modified configuration parameters that affect query planning. |
| `auto_explain.log_format` | Output format: `text`, `xml`, `json`, or `yaml`. |
| `auto_explain.log_level` | Log level for the plan. |
| `auto_explain.log_nested_statements` | Logs statements that are run inside functions. |
| `auto_explain.sample_rate` | Fraction of statements to process in each session. |

## Example

```sql
LOAD 'auto_explain';
SET auto_explain.log_min_duration = 0;
SET auto_explain.log_analyze = true;
SELECT count(*) FROM pg_class;
```

The plan of the `SELECT` statement is written to the coordinator log.

## Module documentation

See [auto_explain](https://www.postgresql.org/docs/14/auto-explain.html) in the PostgreSQL documentation for details about each configuration parameter.
