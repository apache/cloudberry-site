---
title: Checking for Failed Segments 
---

With mirroring enabled, you can have failed segment instances in the system without interruption of service or any indication that a failure has occurred. You can verify the status of your system using the `gpstate` utility, by examing the contents of the `gp_segment_configuration` catalog table, or by checking log files.

## Check for failed segments using gpstate

The `gpstate` utility provides the status of each individual component of a Apache Cloudberry system, including primary segments, mirror segments, coordinator, and standby coordinator.

On the coordinator host, run the [gpstate](../../../utility_guide/ref/gpstate.html) utility with the `-e` option to show segment instances with error conditions:

```shell
$ gpstate -e
```

If the utility lists `Segments with Primary and Mirror Roles Switched`, the segment is not in its *preferred role* (the role to which it was assigned at system initialization). This means the system is in a potentially unbalanced state, as some segment hosts may have more active segments than is optimal for top system performance.

Segments that display the `Config status` as `Down` indicate the corresponding mirror segment is down.

See [Recovering from Segment Failures](g-recovering-from-segment-failures.html) for instructions to fix this situation.

## Check for failed segments using the gp_segment_configuration table

To get detailed information about failed segments, you can check the [gp_segment_configuration](../../../ref_guide/system_catalogs/gp_segment_configuration.html) catalog table. For example:

```shell
$ psql postgres -c "SELECT * FROM gp_segment_configuration WHERE status='d';"
```

For failed segment instances, note the host, port, preferred role, and data directory. This information will help determine the host and segment instances to troubleshoot. To display information about mirror segment instances, run:

```shell
$ gpstate -m
```

## Check for failed segments by examining log files

Log files can provide information to help determine an error's cause. The coordinator and segment instances each have their own log file in `log` of the data directory. The coordinator log file contains the most information and you should always check it first.

Use the [gplogfilter](../../../utility_guide/ref/gplogfilter.html) utility to check the Apache Cloudberry log files for additional information. To check the segment log files, run `gplogfilter` on the segment hosts using [gpssh](../../../utility_guide/ref/gpssh.html).

## To check the log files

1. Use `gplogfilter` to check the coordinator log file for `WARNING`, `ERROR`, `FATAL` or `PANIC` log level messages:

    ```shell
    $ gplogfilter -t
    ```

2. Use `gpssh` to check for `WARNING`, `ERROR`, `FATAL`, or `PANIC` log level messages on each segment instance. For example:

    ```shell
    $ gpssh -f seg_hosts_file -e 'source 
    /usr/local/greenplum-db/greenplum_path.sh ; gplogfilter -t 
    /data1/primary/*/log/gpdb*.log' > seglog.out
    ```
