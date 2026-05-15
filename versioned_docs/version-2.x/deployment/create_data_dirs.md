---
title: Creating the Data Storage Areas
---

## Creating Data Storage Areas on the Coordinator and Standby Coordinator Hosts

A data storage area is required on the Apache Cloudberry coordinator and standby coordinator hosts to store Apache Cloudberry system data such as catalog data and other system metadata.

### To create the data directory location on the coordinator

The data directory location on the coordinator is different than those on the segments. The coordinator does not store any user data, only the system catalog tables and system metadata are stored on the coordinator instance, therefore you do not need to designate as much storage space as on the segments.

1.  Create or choose a directory that will serve as your coordinator data storage area. This directory should have sufficient disk space for your data and be owned by the `gpadmin` user and group. For example, run the following commands as `root`:

    ```
    # mkdir -p /data/coordinator
    ```

2.  Change ownership of this directory to the `gpadmin` user. For example:

    ```
    # chown gpadmin:gpadmin /data/coordinator
    ```

3.  Using [gpssh](/sys-utilities/gpssh.md), create the coordinator data directory location on your standby coordinator as well. For example:

    ```
    # source /usr/local/cloudberry-db/cloudberry-env.sh 
    # gpssh -h scdw -e 'sudo mkdir -p /data/coordinator'
    # gpssh -h scdw -e 'sudo chown gpadmin:gpadmin /data/coordinator'
    ```

## Creating Data Storage Areas on Segment Hosts 

Data storage areas are required on the Apache Cloudberry segment hosts for primary segments. Separate storage areas are required for mirror segments.

### To create the data directory locations on all segment hosts

1.  On the coordinator host, log in as `root`:

    ```
    # su
    ```

2.  Create a file called `hostfile_gpssh_segonly`. This file should have only one machine configured host name for each segment host. For example, if you have three segment hosts:

    ```
    sdw1
    sdw2
    sdw3
    ```

3.  Using [gpssh](/sys-utilities/gpssh.md), create the primary and mirror data directory locations on all segment hosts at once using the `hostfile_gpssh_segonly` file you just created. For example:

    ```
    # source /usr/local/cloudberry-db/cloudberry-env.sh 
    # gpssh -f hostfile_gpssh_segonly -e 'sudo mkdir -p /data/primary'
    # gpssh -f hostfile_gpssh_segonly -e 'sudo mkdir -p /data/mirror'
    # gpssh -f hostfile_gpssh_segonly -e 'sudo chown -R gpadmin /data/*'
    ```

