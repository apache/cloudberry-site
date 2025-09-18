---
title: Enabling Coordinator Mirroring 
---

You can configure a new Apache Cloudberry system with a standby coordinator using `gpinitsystem` or enable it later using `gpinitstandby`. This topic assumes you are adding a standby coordinator to an existing system that was initialized without one.

For information about the utilities [gpinitsystem](../../../utility_guide/ref/gpinitsystem.html) and [gpinitstandby](../../../utility_guide/ref/gpinitstandby.html), see the *Apache Cloudberry Utility Guide*.

## To add a standby coordinator to an existing system

1. Ensure the standby coordinator host is installed and configured: `gpadmin` system user created, Apache Cloudberry binaries installed, environment variables set, SSH keys exchanged, and that the data directories and tablespace directories, if needed, are created.
2. Run the `gpinitstandby` utility on the currently active *primary* coordinator host to add a standby coordinator host to your Apache Cloudberry system. For example:

    ```shell
    $ gpinitstandby -s scdw
    ```

    Where `-s` specifies the standby coordinator host name.


To switch operations to a standby coordinator, see [Recovering a Failed Coordinator](g-recovering-a-failed-coordinator.html).

## To check the status of the coordinator mirroring process (optional)

You can run the `gpstate` utility with the `-f` option to display details of the standby coordinator host.

```shell
$ gpstate -f
```

The standby coordinator status should be passive, and the WAL sender state should be streaming.

For information about the [gpstate](../../../utility_guide/ref/gpstate.html) utility, see the *Apache Cloudberry Utility Guide*.
