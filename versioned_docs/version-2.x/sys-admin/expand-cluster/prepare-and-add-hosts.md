---
title: Prepare and Add Hosts
---

# Prepare and Add Hosts

Verify your new host systems are ready for integration into the existing Cloudberry system.

To prepare new host systems for expansion, install the Apache Cloudberry software binaries, exchange the required SSH keys, and run performance tests.

Run performance tests first on the new hosts and then all hosts. Run the tests on all hosts with the system offline so user activity does not distort results.

Generally, you should run performance tests when an administrator modifies host networking or other special conditions in the system. For example, if you will run the expanded system on two network clusters, run tests on each cluster.

:::note
Preparing host systems for use by a Apache Cloudberry system assumes that the new hosts' operating system has been properly configured to match the existing hosts, described in [Configuring Your Systems](../../cbdb-op-software-hardware.md#supported-os).
:::

## Add new hosts to the trusted host environment

New hosts must exchange SSH keys with the existing hosts to enable Cloudberry administrative utilities to connect to all segments without a password prompt. Perform the key exchange process twice with the [gpssh-exkeys](../../sys-utilities/gpssh-exkeys.md) utility.

First perform the process as `root`, for administration convenience, and then as the user `gpadmin`, for management utilities. Perform the following tasks in order:

1. [To exchange SSH keys as root](#to-exchange-ssh-keys-as-root)
2. [To create the gpadmin user](#to-create-the-gpadmin-user)
3. [To exchange SSH keys as the gpadmin user](#to-exchange-ssh-keys-as-the-gpadmin-user)

:::note
The Apache Cloudberry segment host naming convention is `sdwN` where `sdw` is a prefix and `N` is an integer ( `sdw1`, `sdw2` and so on). For hosts with multiple interfaces, the convention is to append a dash (`-`) and number to the host name. For example, `sdw1-1` and `sdw1-2` are the two interface names for host `sdw1`.
:::

### To exchange SSH keys as root

1. Create a host file with the existing host names in your array and a separate host file with the new expansion host names. For existing hosts, you can use the same host file used to set up SSH keys in the system. In the files, list all hosts (coordinator, backup coordinator, and segment hosts) with one name per line and no extra lines or spaces. Exchange SSH keys using the configured host names for a given host if you use a multi-NIC configuration. In this example, `cdw` is configured with a single NIC, and `sdw1`, `sdw2`, and `sdw3` are configured with 4 NICs:

    ```
    cdw
    sdw1-1
    sdw1-2
    sdw1-3
    sdw1-4
    sdw2-1
    sdw2-2
    sdw2-3
    sdw2-4
    sdw3-1
    sdw3-2
    sdw3-3
    sdw3-4
    ```

2. Log in as `root` on the coordinator host, and source the `greenplum_path.sh` file from your Cloudberry installation.

    ```shell
    $ su - 
    # source /usr/local/greenplum-db/greenplum_path.sh
    ```

3. Run the `gpssh-exkeys` utility referencing the host list files. For example:

    ```shell
    # gpssh-exkeys -e /home/gpadmin/<existing_hosts_file> -x 
    /home/gpadmin/<new_hosts_file>
    ```

4. `gpssh-exkeys` checks the remote hosts and performs the key exchange between all hosts. Enter the `root` user password when prompted. For example:

    ```shell
    Enter password for root@<hostname>: <root_password>
    ```


### To create the gpadmin user

1. Use [gpssh](../../sys-utilities/gpssh.md) to create the `gpadmin` user on all the new segment hosts (if it does not exist already). Use the list of new hosts you created for the key exchange. For example:

    ```shell
    # gpssh -f <new_hosts_file> '/usr/sbin/useradd gpadmin -d 
    /home/gpadmin -s /bin/bash'
    ```

2. Set a password for the new `gpadmin` user. On Linux, you can do this on all segment hosts simultaneously using `gpssh`. For example:

    ```shell
    # gpssh -f <new_hosts_file> 'echo <gpadmin_password> | passwd 
    gpadmin --stdin'
    ```

3. Verify the `gpadmin` user has been created by looking for its home directory:

    ```shell
    # gpssh -f <new_hosts_file> ls -l /home
    ```


### To exchange SSH keys as the gpadmin user

1. Log in as `gpadmin` and run the `gpssh-exkeys` utility referencing the host list files. For example:

    ```shell
    # gpssh-exkeys -e /home/gpadmin/<existing_hosts_file> -x 
    /home/gpadmin/<new_hosts_file>
    ```

2. `gpssh-exkeys` will check the remote hosts and perform the key exchange between all hosts. Enter the `gpadmin` user password when prompted. For example:

    ```shell
    Enter password for gpadmin@<hostname>: <gpadmin_password>
    ```


## Validate disk I/O and memory bandwidth

Use the [gpcheckperf](../../sys-utilities/gpcheckperf.md) utility to test disk I/O and memory bandwidth.

### To run gpcheckperf

1. Run the `gpcheckperf` utility using the host file for new hosts. Use the `-d` option to specify the file systems you want to test on each host. You must have write access to these directories. For example:

    ```shell
    $ gpcheckperf -f <new_hosts_file> -d /data1 -d /data2 -v 
    ```

2. The utility may take a long time to perform the tests because it is copying very large files between the hosts. When it is finished, you will see the summary results for the Disk Write, Disk Read, and Stream tests.

For a network divided into subnets, repeat this procedure with a separate host file for each subnet.

## Integrate new hardware into the system

Before initializing the system with the new segments, shut down the system with `gpstop` to prevent user activity from skewing performance test results. Then, repeat the performance tests using host files that include *all* hosts, existing and new.

