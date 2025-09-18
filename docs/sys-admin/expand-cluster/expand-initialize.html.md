---
title: Initialize New Segments
---

# Initialize New Segments

Use the `gpexpand` utility to create and initialize the new segment instances and create the expansion schema.

The first time you run [`gpexpand`](../../utility_guide/ref/gpexpand.html) with a valid input file it creates and initializes segment instances and creates the expansion schema. After these steps are completed, running `gpexpand` detects if the expansion schema has been created and, if so, performs table redistribution.

:::note
To prevent catalog inconsistency across existing and new segments, be sure that no DDL operations are running during the initialization phase.
:::

- [Create an input file for system expansion](#create-an-input-file-for-system-expansion)
- [Run gpexpand to initialize new segments](#run-gpexpand-to-initialize-new-segments)
- [Roll back a failed expansion setup](#roll-back-a-failed-expansion-setup)

## Create an input file for system expansion

To begin expansion, `gpexpand` requires an input file containing information about the new segments and hosts. If you run `gpexpand` without specifying an input file, the utility displays an interactive interview that collects the required information and automatically creates an input file.

If you create the input file using the interactive interview, you may specify a file with a list of expansion hosts in the interview prompt. If your platform or command shell limits the length of the host list, specifying the hosts with `-f` may be mandatory.

### Create an input file in interactive mode

Before you run `gpexpand` to create an input file in interactive mode, ensure you know:

- The number of new hosts (or a hosts file)
- The new hostnames (or a hosts file)
- The mirroring strategy used in existing hosts, if any
- The number of segments to add per host, if any

The utility automatically generates an input file based on this information, `dbid`, `content` ID, and data directory values stored in `gp_segment_configuration`, and saves the file in the current directory.

#### To create an input file in interactive mode

1. Log in on the coordinator host as the user who will run your Apache Cloudberry system; for example, `gpadmin`.
2. Run `gpexpand`. The utility displays messages about how to prepare for an expansion operation, and it prompts you to quit or continue.

    Optionally, specify a hosts file using `-f`. For example:

    ```shell
    $ gpexpand -f /home/gpadmin/<new_hosts_file>
    ```

3. At the prompt, select `Y` to continue.
4. Unless you specified a hosts file using `-f`, you are prompted to enter hostnames. Enter a comma separated list of the hostnames of the new expansion hosts. Do not include interface hostnames. For example:

    ```shell
    > sdw4, sdw5, sdw6, sdw7
    ```

    To add segments to existing hosts only, enter a blank line at this prompt. Do not specify `localhost` or any existing host name.

5. Enter the mirroring strategy used in your system, if any. Options are `spread|grouped|none`. The default setting is `grouped`.

    Ensure you have enough hosts for the selected grouping strategy. For more information about mirroring, see [Planning Mirror Segments](expand-planning.html).

6. Enter the number of new primary segments to add, if any. By default, new hosts are initialized with the same number of primary segments as existing hosts. Increase segments per host by entering a number greater than zero. The number you enter will be the number of additional segments initialized on all hosts. For example, if existing hosts currently have two segments each, entering a value of `2` initializes two more segments on existing hosts, and four segments on new hosts.
7. If you are adding new primary segments, enter the new primary data directory root for the new segments. Do not specify the actual data directory name, which is created automatically by `gpexpand` based on the existing data directory names.

    For example, if your existing data directories are as follows:

    ```shell
    /gpdata/primary/gp0
    /gpdata/primary/gp1
    ```

    then enter the following (one at each prompt) to specify the data directories for two new primary segments:

    ```shell
    /gpdata/primary
    /gpdata/primary
    ```

    When the initialization runs, the utility creates the new directories `gp2` and `gp3` under `/gpdata/primary`.

8. If you are adding new mirror segments, enter the new mirror data directory root for the new segments. Do not specify the data directory name; it is created automatically by `gpexpand` based on the existing data directory names.

    For example, if your existing data directories are as follows:

    ```shell
    /gpdata/mirror/gp0
    /gpdata/mirror/gp1
    ```

    enter the following (one at each prompt) to specify the data directories for two new mirror segments:

    ```shell
    /gpdata/mirror
    /gpdata/mirror
    ```

    When the initialization runs, the utility will create the new directories `gp2` and `gp3` under `/gpdata/mirror`.

    These primary and mirror root directories for new segments must exist on the hosts, and the user running `gpexpand` must have permissions to create directories in them.

    After you have entered all required information, the utility generates an input file and saves it in the current directory. For example:

    ```
    gpexpand_inputfile_yyyymmdd_145134
    ```

    If the Cloudberry cluster is configured with tablespaces, the utility automatically generates an additional tablespace mapping file. This file is required for later parsing by the utility so make sure it is present before proceeding with the next step. For example:

    ```
    gpexpand_inputfile_yyyymmdd_145134.ts
    ```

### Expansion input file format

Use the interactive interview process to create your own input file unless your expansion scenario has atypical needs.

The format for expansion input files is:

```
hostname|address|port|datadir|dbid|content|preferred_role
```

For example:

```
sdw5|sdw5-1|50011|/gpdata/primary/gp9|11|9|p
sdw5|sdw5-2|50012|/gpdata/primary/gp10|12|10|p
sdw5|sdw5-2|60011|/gpdata/mirror/gp9|13|9|m
sdw5|sdw5-1|60012|/gpdata/mirror/gp10|14|10|m
```

For each new segment, this format of expansion input file requires the following:

|Parameter|Valid values|Description|
|---------|------------|-----------|
|hostname|Hostname|Hostname for the segment host.|
|port|An available port number|Database listener port for the segment, incremented on the existing segment *port* base number.|
|datadir|Directory name|The data directory location for a segment as per the gp_segment_configuration system catalog.|
|dbid|Integer. Must not conflict with existing *dbid* values.|Database ID for the segment. The values you enter should be incremented sequentially from existing *dbid* values shown in the system catalog `gp_segment_configuration`. For example, to add four segment instances to an existing ten-segment array with *dbid* values of 1-10, list new *dbid* values of 11, 12, 13 and 14.|
|content|Integer. Must not conflict with existing *content* values.|The content ID of the segment. A primary segment and its mirror should have the same content ID, incremented sequentially from existing values. For more information, see *content* in the reference for `gp_segment_configuration`.|
|preferred_role|`p` or `m`|Determines whether this segment is a primary or mirror. Specify `p` for primary and `m` for mirror.|

## Run gpexpand to initialize new segments

After you have created an input file, run `gpexpand` to initialize new segment instances.

### To run gpexpand with an input file

1. Log in on the coordinator host as the user who will run your Apache Cloudberry system; for example, `gpadmin`.
2. Run the `gpexpand` utility, specifying the input file with `-i`. For example:

    ```shell
    $ gpexpand -i input_file
    ```

    The utility detects if an expansion schema exists for the Apache Cloudberry system. If a *gpexpand* schema exists, remove it with `gpexpand -c` before you start a new expansion operation. See [Removing the Expansion Schema](expand-post.html).

    When the new segments are initialized and the expansion schema is created, the utility prints a success message and exits.


When the initialization process completes, you can connect to Apache Cloudberry and view the expansion schema. The *gpexpand* schema resides in the postgres database. For more information, see [About the Expansion Schema](expand-planning.html).

After segment initialization is complete, [redistribute the tables](expand-redistribute.html#expand-redistribute) to balance existing data over the new segments.

## Monitor the cluster expansion state

At any time, you can check the state of cluster expansion by running the `gpstate` utility with the `-x` flag:

```shell
$ gpstate -x
```

If the expansion schema exists in the postgres database, `gpstate -x` reports on the progress of the expansion. During the first expansion phase, `gpstate` reports on the progress of new segment initialization. During the second phase, `gpstate` reports on the progress of table redistribution, and whether redistribution is paused or active.

You can also query the expansion schema to see expansion status. See [Monitoring Table Redistribution](expand-redistribute.html) for more information.

## Roll back a failed expansion setup

You can roll back an expansion setup operation (adding segment instances and segment hosts) only if the operation fails.

If the expansion fails during the initialization step, while the database is down, you must first restart the database in coordinator-only mode by running the `gpstart -m` command.

Roll back the failed expansion with the following command:

```shell
gpexpand --rollback
```

