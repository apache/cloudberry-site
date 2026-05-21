---
title: Initializing Apache Cloudberry
---

Because Apache Cloudberry is distributed, the process for initializing a Apache Cloudberry Database management system involves initializing several individual PostgreSQL database instances (called *segment instances* in Cloudberry).

Each database instance \(the coordinator and all segments\) must be initialized across all of the hosts in the system in such a way that they can all work together as a unified DBMS. Cloudberry provides its own version of `initdb` called [gpinitsystem](/sys-utilities/gpinitsystem.md), which takes care of initializing the database on the coordinator and on each segment instance, and starting each instance in the correct order.

After the Apache Cloudberry database system has been initialized and started, you can then create and manage databases as you would in a regular PostgreSQL DBMS by connecting to the Cloudberry coordinator.

When performing the following initialization tasks, you must be logged into the coordinator host as the `gpadmin` user, and to run Apache Cloudberry utilities, you must source the `cloudberry-env.sh` file to set Apache Cloudberry environment variables. For example, if you are logged into the coordinator, run these commands.

```
$ su - gpadmin
$ source /usr/local/cloudberry-db/cloudberry-env.sh
```

## Creating the Initialization Host File 

The [gpinitsystem](/sys-utilities/gpinitsystem.md) utility requires a host file that contains the list of addresses for each segment host. The initialization utility determines the number of segment instances per host by the number host addresses listed per host times the number of data directory locations specified in the `gpinitsystem_config` file.

This file should only contain segment host addresses (not the coordinator or standby coordinator). For segment machines with multiple, unbonded network interfaces, this file should list the host address names for each interface — one per line.

:::note
The Apache Cloudberry segment host naming convention is sdwN where sdw is a prefix and N is an integer. For example, `sdw2` and so on. If hosts have multiple unbonded NICs, the convention is to append a dash (`-`) and number to the host name. For example, `sdw1-1` and `sdw1-2` are the two interface names for host `sdw1`. However, NIC bonding is recommended to create a load-balanced, fault-tolerant network.
:::

### To create the initialization host file

1.  Create a file named `hostfile_gpinitsystem`. In this file add the host address name\(s\) of your *segment* host interfaces, one name per line, no extra lines or spaces. For example, if you have four segment hosts with two unbonded network interfaces each:

    ```
    sdw1-1
    sdw1-2
    sdw2-1
    sdw2-2
    sdw3-1
    sdw3-2
    sdw4-1
    sdw4-2
    ```

2.  Save and close the file.

:::note
If you are not sure of the host names and/or interface address names used by your machines, look in the `/etc/hosts` file.
:::

## Creating the Apache Cloudberry Configuration File 

Your Cloudberry configuration file tells the [gpinitsystem](/sys-utilities/gpinitsystem.md) utility how you want to configure your Apache Cloudberry system. An example configuration file can be found in `$GPHOME/docs/cli_help/gpconfigs/gpinitsystem_config`.

### To create a gpinitsystem_config file 

1.  Make a copy of the `gpinitsystem_config` file to use as a starting point. For example:

    ```
    $ mkdir -p gpconfigs
    $ cp $GPHOME/docs/cli_help/gpconfigs/gpinitsystem_config \
         /home/gpadmin/gpconfigs/gpinitsystem_config
    ```

2.  Open the file you just copied in a text editor.

    Set all of the required parameters according to your environment. See [gpinitsystem](/sys-utilities/gpinitsystem.md) for more information. A Apache Cloudberry system must contain a coordinator instance and at *least two* segment instances (even if setting up a single node system).

    The `DATA_DIRECTORY` parameter is what determines how many segments per host will be created. If your segment hosts have multiple network interfaces, and you used their interface address names in your host file, the number of segments will be evenly spread over the number of available interfaces.

    The `COORDINATOR_HOSTNAME` is the hostname of the coordinator node.

    The `COORDINATOR_DIRECTORY` is the data directory of the coordinator node.

    To specify `PORT_BASE`, review the port range specified in the `net.ipv4.ip_local_port_range` parameter in the `/etc/sysctl.conf` file.

    Here is an example of the *required* parameters in the `gpinitsystem_config` file:

    ```
    SEG_PREFIX=gpseg
    PORT_BASE=6000 
    declare -a DATA_DIRECTORY=(/data1/primary /data1/primary /data1/primary /data2/primary /data2/primary /data2/primary)
    COORDINATOR_HOSTNAME=cdw 
    COORDINATOR_DIRECTORY=/data/coordinator 
    COORDINATOR_PORT=5432 
    TRUSTED SHELL=ssh
    CHECK_POINT_SEGMENTS=8
    ENCODING=UNICODE
    ```

3. (Optional) If you want to deploy mirror segments, uncomment and set the mirroring parameters according to your environment. To specify `MIRROR_PORT_BASE`, review the port range specified under the `net.ipv4.ip_local_port_range` parameter in the `/etc/sysctl.conf` file. Here is an example of the *optional* mirror parameters in the `gpinitsystem_config` file:

    ```
    MIRROR_PORT_BASE=7000
    declare -a MIRROR_DATA_DIRECTORY=(/data1/mirror /data1/mirror /data1/mirror /data2/mirror /data2/mirror /data2/mirror)
    ```

    :::note
    You can initialize your Cloudberry system with primary segments only and deploy mirrors later using the [gpaddmirrors](/sys-utilities/gpaddmirrors.md) utility.

4. To create a default database during initialization, you need to fill in the database name. In this example, the `warehouse` database is created during initialization:

    ```
    DATABASE_NAME=warehouse
    ```

5.  Save and close the file.

## Running the Initialization Utility 

The [gpinitsystem](/sys-utilities/gpinitsystem.md) utility will create a Apache Cloudberry system using the values defined in the configuration file.

These steps assume you are logged in as the `gpadmin` user and have sourced the `cloudberry-env.sh` file to set Apache Cloudberry environment variables.

### To run the initialization utility 

1.  Run the following command referencing the path and file name of your initialization configuration file (`gpinitsystem_config`) and host file (`hostfile_gpinitsystem`). For example:

    ```
    $ cd ~
    $ gpinitsystem -c gpconfigs/gpinitsystem_config -h gpconfigs/hostfile_gpinitsystem
    ```

    In the command above, `-c` specifies the configuration file and `-h` specifies the computing node list.

    For a fully redundant system (with a standby coordinator and a *spread* mirror configuration) include the `-s` and `--mirror-mode=spread` options. For example:

    ```
    $ gpinitsystem -c gpconfigs/gpinitsystem_config -h gpconfigs/hostfile_gpinitsystem \
      -s <standby_coordinator_hostname> --mirror-mode=spread
    ```

    During a new cluster creation, you may use the `-O output_configuration_file` option to save the cluster configuration details in a file. For example:

    ```
    $ gpinitsystem -c gpconfigs/gpinitsystem_config -O gpconfigs/config_template 
    ```

    This output file can be edited and used at a later stage as the input file of the `-I` option, to create a new cluster or to recover from a backup. See [gpinitsystem](/sys-utilities/gpinitsystem.md) for further details.

    :::note
    Calling `gpinitsystem` with the `-O` option does not initialize the Apache Cloudberry system; it merely generates and saves a file with cluster configuration details.
    :::

2.  The utility will verify your setup information and make sure it can connect to each host and access the data directories specified in your configuration. If all of the pre-checks are successful, the utility will prompt you to confirm your configuration. For example:

    ```
    => Continue with Cloudberry creation? Yy/Nn
    ```

3.  Press `y` to start the initialization.
4.  The utility will then begin setup and initialization of the coordinator instance and each segment instance in the system. Each segment instance is set up in parallel. Depending on the number of segments, this process can take a while.
5.  At the end of a successful setup, the utility will start your Apache Cloudberry system. You should see:

    ```
    => Apache Cloudberry instance successfully created.
    ```

### (Optional) Initializing a Standby Coordinator

:::note
If you included the `-s <standby_coordinator_hostname>` option in the `gpinitsystem` command, the standby coordinator is already initialized and you can skip this step.
:::

If you did not include the `-s` option when running `gpinitsystem`, you can initialize a standby coordinator separately after the cluster is up and running using the `gpinitstandby` utility.

The standby coordinator serves as a warm backup of the coordinator instance. If the primary coordinator becomes unavailable, the standby can be activated to take over.

1. Ensure the standby coordinator host has the same data directory created and owned by `gpadmin`:

    ```bash
    $ gpssh -h scdw -e 'sudo mkdir -p /data/coordinator'
    $ gpssh -h scdw -e 'sudo chown gpadmin:gpadmin /data/coordinator'
    ```

2. Run `gpinitstandby` from the coordinator host as `gpadmin`:

    ```bash
    $ gpinitstandby -s scdw
    ```

3. Verify the standby coordinator is synchronized:

    ```bash
    $ gpstate -f
    ```

    The output should show the standby coordinator with `Sync state: sync`.

### Troubleshooting Initialization Problems 

If the utility encounters any errors while setting up an instance, the entire process will fail, and could possibly leave you with a partially created system. Refer to the error messages and logs to determine the cause of the failure and where in the process the failure occurred. Log files are created in `~/gpAdminLogs`.

Depending on when the error occurred in the process, you may need to clean up and then try the `gpinitsystem` utility again. For example, if some segment instances were created and some failed, you may need to stop `postgres` processes and remove any utility-created data directories from your data storage area(s). A backout script is created to help with this cleanup if necessary.

#### Using the Backout Script 

If the gpinitsystem utility fails, it will create the following backout script if it has left your system in a partially installed state:

`~/gpAdminLogs/backout_gpinitsystem_<user>_<timestamp>`

You can use this script to clean up a partially created Apache Cloudberry system. This backout script will remove any utility-created data directories, `postgres` processes, and log files. After correcting the error that caused `gpinitsystem` to fail and running the backout script, you should be ready to retry initializing your Apache Cloudberry array.

The following example shows how to run the backout script:

```
$ bash ~/gpAdminLogs/backout_gpinitsystem_gpadmin_20071031_121053
```

## Setting the Apache Cloudberry Timezone 

As a best practice, configure Apache Cloudberry and the host systems to use a known, supported timezone. Apache Cloudberry uses a timezone from a set of internally stored PostgreSQL timezones. Setting the Apache Cloudberry timezone prevents Apache Cloudberry from selecting a timezone each time the cluster is restarted and sets the timezone for the Apache Cloudberry coordinator and segment instances.

Use the [gpconfig](/sys-utilities/gpconfig.md) utility to show and set the Apache Cloudberry timezone. For example, these commands show the Apache Cloudberry timezone and set the timezone to `US/Pacific`.

```
$ gpconfig -s TimeZone
$ gpconfig -c TimeZone -v 'US/Pacific'
```

You must restart Apache Cloudberry after changing the timezone. The command `gpstop -ra` restarts Apache Cloudberry. The catalog view `pg_timezone_names` provides Apache Cloudberry timezone information.

## Setting Apache Cloudberry Environment Variables 

You must set environment variables in the Apache Cloudberry user (`gpadmin`) environment that runs Apache Cloudberry on the Apache Cloudberry coordinator and standby coordinator hosts. A `cloudberry-env.sh` file is provided in the Apache Cloudberry installation directory with environment variable settings for Apache Cloudberry.

The Apache Cloudberry management utilities also require that the `COORDINATOR_DATA_DIRECTORY` environment variable be set. This should point to the directory created by the `gpinitsystem` utility in the coordinator data directory location.

:::note
The `cloudberry-env.sh` script changes the operating environment in order to support running the Apache Cloudberry-specific utilities. These same changes to the environment can negatively affect the operation of other system-level utilities, such as `ps` or `yum`. Use separate accounts for performing system administration and database administration, instead of attempting to perform both functions as `gpadmin`.
:::

These steps ensure that the environment variables are set for the `gpadmin` user after a system reboot.

### To set up the gpadmin environment for Apache Cloudberry

1.  Open the `gpadmin` profile file (such as `.bashrc`) in a text editor. For example:

    ```
    $ vi ~/.bashrc
    ```

2.  Add lines to this file to source the `cloudberry-env.sh` file and set the `COORDINATOR_DATA_DIRECTORY` environment variable. For example:

    ```
    source /usr/local/cloudberry-db/cloudberry-env.sh
    export COORDINATOR_DATA_DIRECTORY=/data/coordinator/gpseg-1
    ```

3.  (Optional) You may also want to set some client session environment variables such as `PGPORT`, `PGUSER` and `PGDATABASE` for convenience. For example:

    ```
    export PGPORT=5432
    export PGUSER=gpadmin
    export PGDATABASE=warehouse
    ```

4.  (Optional) If you use RHEL/Oracle/Rocky Linux, add the following line to the end of the `.bashrc` file to enable using the `ps` command in the `cloudberry-env.sh` environment:

    ```
    export LD_PRELOAD=/lib64/libz.so.1 ps
    ```

5.  Save and close the file.
6.  After editing the profile file, source it to make the changes active. For example:

    ```
    $ source ~/.bashrc
    ```

7.  If you have a standby coordinator host, copy your environment file to the standby coordinator as well. For example:

    ```
    $ cd ~
    $ scp .bashrc <standby_hostname>:`pwd`
    ```

:::note
The `.bashrc` file should not produce any output. If you wish to have a message display to users upon logging in, use the `.bash_profile` file instead.
:::
