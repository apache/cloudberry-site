---
title: Installing Using RPM/DEB Package
---

This document introduces how to manually deploy Apache Cloudberry on physical/virtual machines using RPM or DEB packages. Before reading this document, it is recommended to first read the [Software and Hardware Configuration Requirements](./platform-requirements.md) and [Prepare to Deploy Apache Cloudberry](./prepare-to-deploy.md).

You must install Apache Cloudberry on each host machine of the Apache Cloudberry system. 

:::info
Starting from Apache Cloudberry 2.1, RPM and DEB packages are officially provided for download. RPM packages support Rocky Linux 8/9, RHEL 8/9, and compatible distributions. DEB packages support Ubuntu 22.04. 

After downloading, please verify the signatures and checksums of the files.
:::


## Install the package

After the preparation, it is time to install Apache Cloudberry. You need to download the corresponding package from [Apache Cloudberry Releases](https://cloudberry.apache.org/releases), and then install the database on each node using the installation package.

1. Download and copy the package to the home directory of `gpadmin` on the coordinator, standby coordinator, and every segment host machine.

2. With sudo (or as `root`), install the Apache Cloudberry package on each host machine using your system's package manager software:

    ```bash    
    # For RPM (Rocky Linux, RHEL, etc.)
    sudo dnf install <RPM package path>
    # Or for older systems: sudo yum install <RPM package path>
    
    # For DEB (Ubuntu)
    sudo apt install --fix-broken <DEB package path>
    # Or alternatively: sudo dpkg -i <DEB package path> && apt-get install -f
    ```

    The `yum`, `dnf` and `apt` command automatically installs software dependencies, copies the Apache Cloudberry software files into a version-specific directory under `/usr/local`, `/usr/local/cloudberry-db-<version>`, and creates the symbolic link `/usr/local/cloudberry-db` to the installation directory.

3. Grant the `gpadmin` user the permission to access the `/usr/local/cloudberry-db/` directory.

    ```bash
    sudo chown -R gpadmin:gpadmin /usr/local/cloudberry*
    ```

## (Optional) Installing to a non-default directory

:::caution
Custom installation directory is not supported in Apache Cloudberry 2.1. This feature is planned for Apache Cloudberry 2.2. The instructions below are provided for future reference only.
:::

### For RPM-based systems (Rocky Linux, RHEL, etc.)

On RHEL-based systems, you can use the `rpm` command with the `--prefix` option to install Apache Cloudberry to a non-default directory (instead of under `/usr/local`). Note that using `rpm` directly does not automatically install dependencies; you must manually install them on each host.

1. Download and copy the Apache Cloudberry package to the `gpadmin` user's home directory on the coordinator, standby coordinator, and every segment host machine.

2. Manually install the dependencies to each host system:

    ```bash
    $ sudo dnf install openssh-server openssh-clients sudo shadow-utils \
    bash procps-ng ca-certificates python3 apr bzip2 krb5-libs libevent \
    libicu liburing libuuid libxml2 libyaml libzstd lz4 ncurses openldap \
    openssl pam pcre2 perl protobuf readline zlib libuv iproute \
    net-tools which rsync keyutils libssh libpsl xz
    ```

3. Use `rpm` with the `--prefix` option to install the Apache Cloudberry package to your chosen installation directory on each host machine:

    ```bash
    $ sudo rpm --install ./<RPM package filename> --prefix=<directory>
    ```

    The `rpm` command copies the Apache Cloudberry software files into a version-specific directory under your chosen `<directory>`, and creates a symbolic link `<directory>/cloudberry-db` to the versioned directory.

4. Change the owner and group of the installed files to `gpadmin`:

    ```bash
    $ sudo chown -R gpadmin:gpadmin <directory>/cloudberry*
    ```

If you install to a non-default directory using `rpm`, you will need to continue using `rpm` (instead of `dnf`) to perform minor version upgrades.

## Enabling Passwordless SSH

The `gpadmin` user on each Cloudberry host must be able to SSH from any host in the cluster to any other host in the cluster without entering a password or passphrase (called "passwordless SSH"). If you enable passwordless SSH from the coordinator host to every other host in the cluster ("1-*n* passwordless SSH"), you can use the `gpssh-exkeys` command-line utility to enable passwordless SSH from every host to every other host ("*n*-*n* passwordless SSH").

1. Log in to the coordinator host as the `gpadmin` user, and use the `gpadmin` user for subsequent operations.
2.  Source the `path` file in the Apache Cloudberry installation directory.

    ```
    $ source /usr/local/cloudberry-db-<version>/cloudberry-env.sh
    ```

    :::caution
    Since Cloudberry 2.1, the path file name has been changed from `greenplum_path.sh` to `cloudberry-env.sh`, see the [blog](https://cloudberry.apache.org/blog/from-greenplum-path.sh-to-cloudberry-env.sh/) for more details.
    :::

    :::note
    Add the above `source` command to the `gpadmin` user's `.bashrc` or other shell startup file so that the Apache Cloudberry path and environment variables are set whenever you log in as `gpadmin`.
    :::

3.  Use the `ssh-copy-id` command to add the `gpadmin` user's public key to the `authorized_hosts` SSH file on every other host in the cluster.

    ```
    $ ssh-copy-id scdw
    $ ssh-copy-id sdw1
    $ ssh-copy-id sdw2
    $ ssh-copy-id sdw3
    . . .
    ```

    This enables 1-*n* passwordless SSH. You will be prompted to enter the `gpadmin` user's password for each host. If you have the `sshpass` command on your system, you can use a command like the following to avoid the prompt.

    ```
    $ SSHPASS=<password> sshpass -e ssh-copy-id scdw
    ```

4.  In the `gpadmin` home directory, create a file named `hostfile_exkeys` that has the machine configured host names and host addresses (interface names) for each host in your cloudberry system (coordinator, standby coordinator, and segment hosts). Make sure there are no blank lines or extra spaces. Check the `/etc/hosts` file on your systems for the correct host names to use for your environment. 

    For example, if you have a coordinator, standby coordinator, and three segment hosts with two unbonded network interfaces per host, your file would look something like this:

    ```
    cdw
    cdw-1
    cdw-2
    scdw
    scdw-1
    scdw-2
    sdw1
    sdw1-1
    sdw1-2
    sdw2
    sdw2-1
    sdw2-2
    sdw3
    sdw3-1
    sdw3-2
    ```

5.  Run the `gpssh-exkeys` utility with your `hostfile_exkeys` file to enable *n*-*n* passwordless SSH for the `gpadmin` user.

    ```
    $ gpssh-exkeys -f hostfile_exkeys
    ```

## Confirm the installation

To make sure the Apache Cloudberry software was installed and configured correctly, run the following confirmation steps from your Apache Cloudberry coordinator host. If necessary, correct any problems before continuing on to the next task.

1. Log in to the coordinator host as `gpadmin`:

    ```bash
    $ su - gpadmin
    ```

2. Use the `gpssh` utility to see if you can log in to all hosts without a password prompt, and to confirm that the Apache Cloudberry software was installed on all hosts. Use the `hostfile_exkeys` file you created earlier. For example:

    ```bash
    $ gpssh -f hostfile_exkeys -e 'ls -l /usr/local/cloudberry-db-*'
    ```

    If the installation was successful, you should be able to log in to all hosts without a password prompt. All hosts should show that they have the same contents in their installation directories, and that the directories are owned by the `gpadmin` user.

    If you are prompted for a password, run the following command to redo the ssh key exchange:

    ```bash
    $ gpssh-exkeys -f hostfile_exkeys
    ```

## About Your Apache Cloudberry Installation 

-   **`cloudberry-env.sh`** — This file contains the environment variables for Apache Cloudberry.
-   **bin** — This directory contains the Apache Cloudberry management utilities. This directory also contains the PostgreSQL client and server programs, most of which are also used in Apache Cloudberry.
-   **docs/cli_help** — This directory contains help files for Apache Cloudberry command-line utilities.
-   **docs/cli_help/gpconfigs** — This directory contains sample `gpinitsystem` configuration files and host files that can be modified and used when installing and initializing a Apache Cloudberry system.
-   **ext** — Bundled programs (such as Python) used by some Apache Cloudberry utilities.
-   **include** — The C header files for Apache Cloudberry.
-   **lib** — Apache Cloudberry and PostgreSQL library files.
-   **sbin** — Supporting/Internal scripts and programs.
-   **share** — Shared files for Apache Cloudberry.
