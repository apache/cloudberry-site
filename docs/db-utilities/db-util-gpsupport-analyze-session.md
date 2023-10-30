---
title: gpsupport analyze_session
---

# gpsupport analyze_session

This tool traces busy processes associated with a Cloudberry Database session. The information collected can be used for root cause analysis on hung sessions.

## Usage

```shell
gpsupport analyze_session [-session <session_id> ] [-coordinator-dir <directory>] 
[-segment-dir <directory>] 
```

## Options

**`-session`**

Cloudberry session ID which is referenced in `pg_stat_activity`.

**`-coordinator-dir`**

Working directory for coordinator process.

**`-segment-dir`**

Working directory for segment processes.

**`-free-space`**

Free space threshold which will exit log collection if reached. Default value is 10%.

**`-a`**

Answer Yes to all prompts.

## Examples

Collect process information for a given Cloudberry Database session id:

```shell
gpsupport analyze_session -session 12345
```

The tool prompt gives a high-level list of only the servers that are running busy processes and how processes are distributed across the Cloudberry hosts. This gives an idea of what hosts are busier than others, which might be caused by processing skew or other environmental issue with the affected hosts.

Note: `lsof, strace, pstack, gcore, gdb` must be installed on all hosts. `gcore` will perform a memory dump of the Cloudberry process and the size could be anywhere from 300MB to several Gigabytes. Isolating which hosts to collect using the `gpsupport` global option `-hostfile` to limit the collection size.