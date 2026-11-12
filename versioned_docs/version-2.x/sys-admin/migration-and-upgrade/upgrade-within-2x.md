---
title: Upgrade Within the 2.x Series
toc_max_heading_level: 4
---

# Upgrade Within the 2.x Series

This guide tells you how to upgrade an Apache Cloudberry 2.x cluster to a later 2.x release, for example from 2.0 or 2.1 to 2.2.

All 2.x releases use the same on-disk format. To upgrade, you stop the cluster, replace the Apache Cloudberry software on every host, and start the cluster again. You do not move or reload the data. This procedure is also known as a binary swap.

:::caution
This procedure applies only when the cluster was initialized with an Apache Cloudberry 2.x release. A cluster that was initialized with Cloudberry 1.x has a different on-disk format. For such a cluster, see [Migration and Upgrade](./migration-and-upgrade.md).
:::

## Before you begin

- **Downtime.** The cluster is down during the upgrade. A rolling upgrade is not possible, because all hosts must run the same release.
- **All hosts.** You must replace the software on the coordinator host, the standby coordinator host, and every segment host.
- **Same build options.** If you build Apache Cloudberry from source, use the same `configure` options that you used for the current installation. For example, do not change the block size.
- **Previous package.** Keep the package file of the release that you run now. You need it if you must roll back, because the installation of the new package removes the files of the previous release.
- **Host health.** Make sure that the hardware of all hosts is healthy and that the hosts still meet the [software and hardware requirements](../../deployment/platform-requirements.md).
- **Release notes.** Read the [release notes](/releases) of the target release. A new 2.x release can include a later PostgreSQL 14 minor version. For example, 2.2 moves the kernel from PostgreSQL 14.4 to 14.10.

## Check the system catalog before the upgrade day

Run the `gpcheckcat` utility some days or weeks before the upgrade, during a maintenance period. Then you have time to correct the problems that the utility finds before the scheduled upgrade.

1. Start the cluster in restricted mode. In this mode, only superusers can connect, so that other activity does not cause false reports.

    ```shell
    gpstop -a
    gpstart -a -R
    ```

2. Check the system catalog of all databases.

    ```shell
    gpcheckcat -A
    ```

3. If `gpcheckcat` reports inconsistencies, run it again with the `-g` option. The utility then writes SQL scripts that repair the inconsistencies into the directory that you specify.

    ```shell
    gpcheckcat -A -g <directory for the repair scripts>
    ```

    Run the SQL scripts, then run `gpcheckcat` again. Repeat these steps until the utility reports no inconsistencies.

4. Start the cluster in the usual mode again.

    ```shell
    gpstop -a
    gpstart -a
    ```

If you cannot restrict the access to the cluster, run `gpcheckcat -A -O`. With the `-O` option, the utility runs only the tests that are safe while the cluster is in use. For more information, see [gpcheckcat](../../sys-utilities/gpcheckcat.md).

## Step 1. Check the current cluster

Do these steps as the `gpadmin` user on the coordinator host.

1. Record the current version.

    ```shell
    psql -d postgres -c "SELECT version();"
    ```

2. Make sure that all segments are up and that all mirrors are synchronized.

    ```shell
    gpstate -e
    ```

    If the output shows segments that are down or not synchronized, recover them first. See [Recover from Segment Failures](../high-availability/recover-from-segment-failures.md).

3. Record the extensions that are installed in each database.

    ```sql
    SELECT extname, extversion FROM pg_extension ORDER BY 1;
    ```

4. Back up your data. See [Backup and Restore](../backup-and-restore/index.md).

5. Record where the current software is installed.

    ```shell
    echo $GPHOME
    ls -ld /usr/local/cloudberry-db*
    ```

6. Save a copy of the environment file outside the installation directory. The installation of the new package removes or replaces this file, and the changes that you made to it are lost.

    ```shell
    cp $GPHOME/cloudberry-env.sh ~/cloudberry-env.sh.before-upgrade
    ```

    If you upgrade from 2.0, the name of the file is `greenplum_path.sh`. If you changed the file on other hosts too, save a copy on each of those hosts.

7. Create a file with the name `hostfile_all` in the home directory of the `gpadmin` user. The file lists every host in the cluster, one host name on each line. The `gpssh` commands in this guide use this file.

    ```shell
    psql -d postgres -Atc "SELECT DISTINCT hostname FROM gp_segment_configuration ORDER BY 1;" > ~/hostfile_all
    cat ~/hostfile_all
    ```

## Step 2. Stop the cluster

1. Stop the services and the jobs that connect to the cluster, so that they do not fail or start during the upgrade. Examples are:

    - Scheduled jobs of the `gpadmin` user, such as `cron` jobs for backup, `VACUUM`, or `ANALYZE`.
    - Data loading jobs, and the `gpfdist` processes that they use.
    - The PXF service, if you use PXF. Run `pxf cluster stop` on the coordinator host.
    - Monitoring tools and applications.

2. Make sure that no client sessions are connected, then stop the cluster. The `gpstop -a` command does a smart shutdown: it waits and then fails if a client is still connected.

    ```shell
    gpstop -a
    ```

3. Make sure that no `postgres` process is left on any host.

    ```shell
    gpssh -f ~/hostfile_all -e 'pgrep -u gpadmin -l postgres || echo "no postgres process"'
    ```

## Step 3. Install the new release on every host

Use the method that matches your current installation.

### Get the package

1. Download the package of the new release for your operating system from the [release page](https://github.com/apache/cloudberry/releases).

    For some releases, the download is a `.tar.gz` file that contains the package, its signature (`.asc`), and its checksum (`.sha512`). Extract the file, then check the package.

    ```shell
    tar xzf <downloaded file>.tar.gz
    sha512sum -c <package file>.sha512
    ```

2. Copy the package file to every host.

### RPM package

1. Install the package as `root` or with `sudo` on every host.

    ```shell
    sudo dnf install ./<new RPM package file>
    ```

    The package installs the software into the versioned directory `/usr/local/cloudberry-db-<version>`.

    When you upgrade from 2.1 to 2.2, `dnf` also removes the 2.1 package, because the name of the package changed. The directory `/usr/local/cloudberry-db-2.1.0` stays on the disk, but it contains only the files that are not part of the package. During the installation, this message can appear. You can ignore it.

    ```
    Warning: /usr/local/cloudberry-db points to Cloudberry major version 2.1; leaving it unchanged so major versions can coexist
    ```

2. Point the symbolic link `/usr/local/cloudberry-db` to the new directory on every host. After an upgrade from 2.1 to 2.2, the link does not exist, and you must create it.

    ```shell
    sudo ln -sfn /usr/local/cloudberry-db-<version> /usr/local/cloudberry-db
    ls -ld /usr/local/cloudberry-db
    ```

3. Give the `gpadmin` user the ownership of the new directory on every host.

    ```shell
    sudo chown -R gpadmin:gpadmin /usr/local/cloudberry-db*
    ```

:::note
The meaning of the `rpm --prefix` option changed in 2.2. With 2.2, the prefix is the parent directory. The software goes into `<prefix>/cloudberry-db-<version>`, and the symbolic link is `<prefix>/cloudberry-db`. If you installed 2.1 with `--prefix`, install 2.2 with `rpm -U --prefix=<parent directory>`, then update the `source` line in the shell startup file of the `gpadmin` user, because the path of the software changes.
:::

### DEB package

The DEB package installs the software into `/usr/cloudberry-db`, which is not a versioned directory. The new package replaces the files of the previous release.

1. Keep the DEB package file of the previous release. You need it if you must roll back.

2. Install the package as `root` or with `sudo` on every host.

    ```shell
    sudo apt install ./<new DEB package file>
    ```

3. Give the `gpadmin` user the ownership of the directory.

    ```shell
    sudo chown -R gpadmin:gpadmin /usr/cloudberry-db /usr/local/cloudberry-db
    ```

### Build from source

1. Build the new release with the same `configure` options as the current installation, but with a new `--prefix`, for example `/usr/local/cloudberry-db-<version>`. See [Build from source](../../build/index.md).

2. Install the build into the same path on every host.

3. Point the symbolic link to the new directory on every host.

    ```shell
    sudo ln -sfn /usr/local/cloudberry-db-<version> /usr/local/cloudberry-db
    ```

### Update the environment file

The new installation has a new `cloudberry-env.sh` file. If you changed the environment file of the previous release, compare the new file with the copy that you saved in [Step 1](#step-1-check-the-current-cluster), then make the same changes in the new file. Do this on every host on which you changed the file. These are some examples of such changes:

- If the cluster uses LDAP authentication, a line such as `export LDAPCONF=/etc/openldap/ldap.conf`.
- If the cluster uses PL/Java, the `JAVA_HOME` and `LD_LIBRARY_PATH` variables.

```shell
diff ~/cloudberry-env.sh.before-upgrade /usr/local/cloudberry-db/cloudberry-env.sh
```

Some extension packages also change the environment file when you install them. Thus the previous file can contain lines that you did not add yourself.

### Add the files that are not part of the package

The new installation directory contains only the files of the Apache Cloudberry package. If you added files to the previous installation directory, add them to the new directory on every host. Examples are:

- Extensions that you built and installed separately, such as PXF or other third-party extensions. Build them again with the new release, or install the packages that match the new release.
- Files that the extensions use, such as JAR files, shared object files, and libraries.
- Custom libraries, JDBC drivers, or scripts that you copied into `$GPHOME`.

After an RPM upgrade, you can find such files in the directory of the previous release, for example `/usr/local/cloudberry-db-2.1.0`.

## Step 4. Start the cluster

1. Load the environment of the new release. Do this in a new shell, so that no variable of the previous release remains.

    ```shell
    source /usr/local/cloudberry-db/cloudberry-env.sh
    ```

    :::note
    Apache Cloudberry 2.0 uses the file name `greenplum_path.sh`. Later releases use `cloudberry-env.sh`. If you upgrade from 2.0, change the `source` line in the shell startup file of the `gpadmin` user, for example `~/.bashrc`, on every host.
    :::

2. Start the cluster.

    ```shell
    gpstart -a
    ```

## Step 5. Verify the upgrade

1. Make sure that the coordinator runs the new release.

    ```shell
    psql -d postgres -c "SELECT version();"
    ```

2. Make sure that all segments run the same release.

    ```shell
    gpstate -i
    ```

    The last line of the output must be `All segments are running the same software version`.

3. Make sure that all segments are up and that all mirrors are synchronized.

    ```shell
    gpstate -e
    ```

4. Make sure that the features that you use work as expected. For example:

    - Run some of your usual queries.
    - Call your user-defined functions.
    - Use the extensions that you installed, such as PostGIS or MADlib.
    - Do a backup and a restore of a small table.

## Step 6. Do the post-upgrade tasks

1. Find the extensions that have a later version in the new release. Run this query in each database.

    ```sql
    SELECT e.extname, e.extversion AS installed, a.default_version AS available
    FROM pg_extension e
    JOIN pg_available_extensions a ON a.name = e.extname
    WHERE e.extversion <> a.default_version;
    ```

    Update each extension that the query returns. For example, 2.2 includes a later version of `gp_toolkit` than 2.1.

    ```sql
    ALTER EXTENSION <extension name> UPDATE;
    ```

2. Collect statistics again if the release notes of the target release tell you to.

    ```shell
    analyzedb -a -d <database name>
    ```

3. Start the services and the jobs that you stopped in [Step 2](#step-2-stop-the-cluster) again, for example the `cron` jobs and the PXF service (`pxf cluster start`).

4. When you are sure that you do not need to roll back, remove the directory or the package of the previous release from every host.

## Roll back

Because the on-disk format is the same, you can go back to the previous 2.x release in the same way.

1. Stop the cluster.

    ```shell
    gpstop -a
    ```

2. Make the previous release active on every host.

    - **RPM package.** Remove the package of the new release, then install the package of the previous release. You must remove the new package first, because it replaces the previous one. The `--noautoremove` option keeps the dependencies on the host.

        ```shell
        sudo dnf remove --noautoremove apache-cloudberry-db-incubating-2
        sudo dnf install ./<previous RPM package file>
        sudo chown -R gpadmin:gpadmin /usr/local/cloudberry-db*
        ls -ld /usr/local/cloudberry-db
        ```

        Make sure that the symbolic link points to the directory of the previous release. If it does not, create it again with `ln -sfn`.

    - **DEB package.** Install the package of the previous release with the option that permits a downgrade.

        ```shell
        sudo apt install --allow-downgrades ./<previous DEB package file>
        sudo chown -R gpadmin:gpadmin /usr/cloudberry-db /usr/local/cloudberry-db
        ```

    - **Build from source.** Point the symbolic link back to the directory of the previous release.

        ```shell
        sudo ln -sfn /usr/local/cloudberry-db-<previous version> /usr/local/cloudberry-db
        ```

3. Load the environment of the previous release in a new shell, then start the cluster.

    ```shell
    gpstart -a
    ```

If you updated an extension in Step 6, the previous release does not include the files of that extension version. Test the rollback in a test environment first, or roll back before you update extensions.

## Limitations

A binary swap replaces the software but does not change the system catalog of the existing cluster. Built-in catalog objects that a later 2.x release adds, such as a new built-in function, are available only in clusters that you initialize with that release. Bug fixes and other changes in the software apply to existing clusters as usual.

## Troubleshooting

### The shell cannot find `cloudberry-env.sh` or `gpstart`

A new shell of the `gpadmin` user shows a message like this one, and commands such as `gpstart` are not found:

```
/usr/local/cloudberry-db/cloudberry-env.sh: No such file or directory
```

The symbolic link `/usr/local/cloudberry-db` does not exist. This is the usual result of an RPM upgrade from 2.1 to 2.2. Create the link on every host as described in [Step 3](#step-3-install-the-new-release-on-every-host), then open a new shell.

### `gpstart` fails in `pg_controldata`

`gpstart` stops with a message like this one:

```
gpstart:...-[CRITICAL]:-Error occurred: non-zero rc: -11
 Command was: '$GPHOME/bin/pg_controldata /data/coordinator/gpseg-1'
```

When you run the `pg_controldata` command yourself, the output contains these warnings:

```
WARNING: Calculated CRC checksum does not match value stored in file.
Either the file is corrupt, or it has a different layout than this program
is expecting.  The results below are untrustworthy.

WARNING: invalid WAL segment size
```

The most frequent cause is that the cluster was not initialized with a 2.x release. For example, the data directories come from Cloudberry 1.x. The new software cannot read the control file of that cluster.

`gpstart` stops before it starts an instance, so the data directories are not changed. To recover:

1. Make the previous software active again on every host, as described in [Roll back](#roll-back).
2. Start the cluster with the previous software.
3. Move the data to a new 2.x cluster. See [Migration and Upgrade](./migration-and-upgrade.md).

### The server reports that the database files are incompatible

An instance does not start, and its log contains a message like this one:

```
FATAL:  database files are incompatible with server
```

The detail line of the message tells you which value is different, for example the block size. The new software was built with options that are different from the options of the software that initialized the cluster. Install a build that uses the same options.

### `gpstart` reports different versions on the hosts

Some hosts still run the previous release. Do [Step 3](#step-3-install-the-new-release-on-every-host) on every host, including the standby coordinator host, then make sure that the symbolic link points to the new directory on every host.

```shell
gpssh -f ~/hostfile_all -e 'ls -ld /usr/local/cloudberry-db; /usr/local/cloudberry-db/bin/postgres --gp-version'
```

### Get help

If you cannot solve a problem, ask the community. See [Support](/support) for the channels, such as the mailing list and GitHub. Give this information in your report:

- The release that you upgraded from, the release that you upgraded to, the operating system, and the type of package.
- The steps of this guide that you completed, and the step that failed.
- The full error message, and the log files of the `gpstop`, `gpstart`, and `gpcheckcat` utilities. These log files are in the `~/gpAdminLogs` directory of the `gpadmin` user on the coordinator host.
- The log file of the instance that did not start. It is in the `log` directory (or `pg_log` on some installations) of the data directory of that instance.
