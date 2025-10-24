---
title: Restore Coordinator Mirroring After a Recovery
---

# Restore Coordinator Mirroring After a Recovery

After you activate a standby coordinator for recovery, the standby coordinator becomes the primary coordinator. You can continue running that instance as the primary coordinator if it has the same capabilities and dependability as the original coordinator host.

You must initialize a new standby coordinator to continue providing coordinator mirroring unless you have already done so while activating the prior standby coordinator. Run [`gpinitstandby`](../../sys-utilities/gpinitstandby.md) on the active coordinator host to configure a new standby coordinator. See [Enabling Coordinator Mirroring](./enable-coordinator-mirroring.md).

You can restore the primary and standby coordinator instances on the original hosts. This process swaps the roles of the primary and standby coordinator hosts, and it should be performed only if you strongly prefer to run the coordinator instances on the same hosts they occupied prior to the recovery scenario.

:::note
Restoring the primary and standby coordinator instances to their original hosts is not an online operation. The coordinator host must be stopped to perform the operation.

For information about the Apache Cloudberry utilities, see the *Apache Cloudberry Utility Guide*.
:::

## To restore the coordinator mirroring after a recovery

1. Ensure the original coordinator host is in dependable running condition; ensure the cause of the original failure is fixed.
2. On the original coordinator host, move or remove the data directory, `gpseg-1`. This example moves the directory to `backup_gpseg-1`:

    ```shell
    $ mv /data/coordinator/gpseg-1 /data/coordinator/backup_gpseg-1
    ```

    You can remove the backup directory once the standby is successfully configured.

3. Initialize a standby coordinator on the original coordinator host. For example, run this command from the current coordinator host, scdw:

    ```shell
    $ gpinitstandby -s cdw
    ```

4. After the initialization completes, check the status of standby coordinator, cdw. Run [`gpstate`](../../sys-utilities/gpstate.md) with the `-f` option to check the standby coordinator status:

    ```shell
    $ gpstate -f
    ```

    The standby coordinator status should be `passive`, and the WAL sender state should be `streaming`.


## To restore the coordinator and standby instances on original hosts (optional)

:::note
Before performing the steps in this section, be sure you have followed the steps to restore coordinator mirroring after a recovery, as described in the [To restore the coordinator mirroring after a recovery](#to-restore-the-coordinator-mirroring-after-a-recovery)previous section.
:::

1. Stop the Apache Cloudberry coordinator instance on the standby coordinator. For example:

    ```shell
    $ gpstop -m
    ```

2. Run the `gpactivatestandby` utility from the original coordinator host, cdw, that is currently a standby coordinator. For example:

    ```shell
    $ gpactivatestandby -d $COORDINATOR_DATA_DIRECTORY
    ```

    Where the `-d` option specifies the data directory of the host you are activating.

    :::note
    Before running `gpactivatestandby`, be sure to run `gpstate -f` to confirm that the standby coordinator is synchronized with the current coordinator node. If synchronized, the final line of the `gpstate -f` output will look similar to this: `20230607:06:50:06:004205 gpstate:test1-m:gpadmin-[INFO]:--Sync state: sync`.
    :::

3. After the utility completes, run `gpstate` with the `-b` option to display a summary of the system status:

    ```shell
    $ gpstate -b
    ```

    The coordinator instance status should be `Active`. When a standby coordinator is not configured, the command displays `No coordinator standby configured` for the standby coordinator state.

4. On the standby coordinator host, move or remove the data directory, `gpseg-1`. This example moves the directory:

    ```shell
    $ mv /data/coordinator/gpseg-1 /data//backup_gpseg-1
    ```

    You can remove the backup directory once the standby is successfully configured.

5. After the original coordinator host runs the primary Apache Cloudberry coordinator, you can initialize a standby coordinator on the original standby coordinator host. For example:

    ```shell
    $ gpinitstandby -s scdw
    ```

    After the command completes, you can run the `gpstate -f` command on the primary coordinator host, to check the standby coordinator status.


## To check the status of the coordinator mirroring process (optional)

You can run the `gpstate` utility with the `-f` option to display details of the standby coordinator host.

```shell
$ gpstate -f
```

The standby coordinator status should be `passive`, and the WAL sender state should be `streaming`.
