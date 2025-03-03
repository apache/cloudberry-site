---
title: On Rocky Linux 8 and Ubuntu
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Compile and Install Apache Cloudberry on Rocky Linux 8 and Ubuntu

:::info
The source of this document is from the GitHub repository [`apache/cloudberry`](https://github.com/apache/cloudberry/blob/main/deploy/build/README.Linux.md).
:::

This document shares how to compile and install Apache Cloudberry on Rocky Linux 8, RHEL 8, and Ubuntu. Note that this document is for developers to try out Apache Cloudberry in a single-node environments. **DO NOT use this document for production environments**.

To learn how to compile and install Apache Cloudberry on Rocky Linux 9, see [Compile on Rocky Linux 9](/docs/cbdb-rockylinux9-compile.md).

Take the following steps to compile and install Apache Cloudberry:

1. [Clone GitHub repo](#step-1-clone-github-repo).
2. [Install dependencies](#step-2-install-dependencies).
3. [Perform prerequisite platform tasks](#step-3-perform-prerequisite-platform-tasks).
4. [Build Apache Cloudberry](#step-4-build-apache-cloudberry).
5. [Verify the cluster](#step-5-verify-the-cluster).

## Step 1. Clone GitHub repo

Clone the GitHub repository `apache/cloudberry` to the target machine:

```shell
git clone https://github.com/apache/cloudberry.git
```

## Step 2. Install dependencies

Enter the repository and install dependencies according to your operating systems:

<Tabs>
<TabItem value="rockey-rhel-8" label="For RHEL 8 and Rocky Linux 8" default>

1. Install Development Tools.

    ```bash
    sudo yum group install -y "Development Tools"
    ```

2. Install dependencies:

    ```bash
    sudo yum install -y epel-release

    sudo yum install -y apr-devel bison bzip2-devel cmake3 flex gcc gcc-c++ krb5-devel libcurl-devel libevent-devel libkadm5  libxml2-devel libzstd-devel openssl-devel perl-ExtUtils-Embed python3-devel python3-pip readline-devel xerces-c-devel zlib-devel
    ```

3. Install more dependencies by running the `README.Rhel-Rocky.bash` script.

    ```bash
    cd ~/cloudberrydb/deploy/build/
    ./README.Rhel-Rocky.bash
    ```

</TabItem>
<TabItem value="ubuntu-18.04" label="For Ubuntu 18.04 or later" default>

1. Install dependencies by running the `README.Ubuntu.bash` script in the `deploy/build` directory.

    ```shell
    ## You need to enter your password to run.
    sudo ~/cloudberrydb/deploy/build/README.Ubuntu.bash
    ```

    :::info
    - When you run the `README.Ubuntu.bash` script for dependencies, you will be asked to configure `realm` for Kerberos. You can enter any realm, because this is just for testing, and during testing, it will reconfigure a local server/client. If you want to skip this manual configuration, run `export DEBIAN_FRONTEND=noninteractive`.
    - If the script fails to download packages, we recommend that you can try another one software source for Ubuntu.
    :::

2. Install GCC 10. Ubuntu 18.04 and later versions should use GCC 10 or newer:

    ```bash
    ## Install gcc-10
    sudo apt install software-properties-common
    sudo add-apt-repository ppa:ubuntu-toolchain-r/test
    sudo apt install gcc-10 g++-10
    sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-10 100
    ```

</TabItem>
</Tabs>

## Step 3. Perform prerequisite platform tasks

After you have installed all the dependencies for your operating system, it is time to do some prerequisite platform tasks before you go on building Apache Cloudberry. These operation include manually running `ldconfig` on all platforms, creating the `gpadmin` user, and setting up a password to start the Apache Cloudberry and test.

1. Make sure that you add `/usr/local/lib` and `/usr/local/lib64` to the `/etc/ld.so.conf` file.

    ```bash
    echo -e "/usr/local/lib \n/usr/local/lib64" >> /etc/ld.so.conf
    ldconfig
    ```

2. Create the `gpadmin` user and set up the SSH key. Manually create SSH keys based on different operating systems, so that you can run `ssh localhost` without a password.

    <Tabs>
    <TabItem value="rhel-rockey" label="For Rocky Linux 8 and RHEL 8" default>

    ```bash
    useradd gpadmin  # Creates gpadmin user
    su - gpadmin  # Uses the gpadmin user
    ssh-keygen  # Creates SSH key
    cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
    chmod 600 ~/.ssh/authorized_keys
    exit
    ```

    </TabItem>
    <TabItem value="ubuntu" label="For Ubuntu" default>

    ```bash
    useradd -r -m -s /bin/bash gpadmin  # Creates gpadmin user
    su - gpadmin  # Uses the gpadmin user
    ssh-keygen  # Creates SSH key
    cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
    chmod 600 ~/.ssh/authorized_keys 
    exit
    ```

    </TabItem>
    </Tabs>

## Step 4. Build Apache Cloudberry

After you have installed all the dependencies and performed the prerequisite platform tasks, you can start to build Apache Cloudberry. Run the following commands in sequence.

1. Configure the build environment. Enter the `cloudberrydb` directory and run the `configure` script.

    ```bash
    cd ../..
    ./configure --with-perl --with-python --with-libxml --with-gssapi --prefix=/usr/local/cloudberrydb
    ```

    :::info
    Apache Cloudberry is built with GPORCA by default. If you want to build CBDB without GPORCA, add the `--disable-orca` flag in the `./configure` command.
    
    ```bash
    ./configure --disable-orca --with-perl --with-python --with-libxml --prefix=/usr/local/cloudberrydb
    ```

    :::

2. Compile the code and install the database.

    ```bash
    make -j8
    make -j8 install
    ```

3. Bring in the Greenplum environment variables for your running shell.

    ```bash
    cd ..
    cp -r cloudberrydb/ /home/gpadmin/
    cd /home/gpadmin/
    chown -R gpadmin:gpadmin cloudberrydb/
    su - gpadmin
    cd cloudberrydb/
    source /usr/local/cloudberrydb/greenplum_path.sh
    ```

4. Start the demo cluster.

    <Tabs>
    <TabItem value="ubuntu-rocky-rhel" label="For Ubuntu, Rocky Linux 8, and RHEL 8" default>

    ```bash
    make create-demo-cluster
    ```

    </TabItem>
    </Tabs>

5. Prepare the test by running the following command. This command will configure the port and environment variables for the test.

    Environment variables such as `PGPORT` and `COORDINATOR_DATA_DIRECTORY` will be configured, which are the default port and the data directory of the coordinator node.

    ```bash
    source gpAux/gpdemo/gpdemo-env.sh
    ```

## Step 5. Verify the cluster

1. You can verify whether the cluster has started successfully by running the following command. If successful, you might see multiple active `postgres` processes with ports ranging from `7000` to `7007`.

    ```bash
    ps -ef | grep postgres
    ```
    
2. Connect to the Apache Cloudberry and see the active segment information by querying the system table `gp_segement_configuration`. For detailed description of this table, see the Greenplum document [here](https://docs.vmware.com/en/VMware-Greenplum/6/greenplum-database/ref_guide-system_catalogs-gp_segment_configuration.html).

    ```sql
    psql -p 7000 postgres
    psql (14.4, server 14.4)
    Type "help" for help.
    ```

    ```sql
    SELECT VERSION();
               version                                                          
    -------------------------------------------------------------------------------------
    PostgreSQL 14.4 (Apache Cloudberry 1.6.0+dev.1383.g5cdbab19af build dev) on x86_64-pc-li
    nux-gnu, compiled by gcc (GCC) 8.5.0 20210514 (Red Hat 8.5.0-23), 64-bit compiled on Feb 
    26 2025 18:20:10
    (1 row)
    ```

    ```sql
    SELECT * FROM gp_segment_configuration;

     dbid | content | role | preferred_role | mode | status | port |  hostname  |  address   |                                   datadir                                    | warehouseid 
    ------+---------+------+----------------+------+--------+------+------------+------------+------------------------------------------------------------------------------+-------------
        1 |      -1 | p    | p              | n    | u      | 7000 | i-6wvpa9wt | i-6wvpa9wt | /home/gpadmin/cloudberrydb/gpAux/gpdemo/datadirs/qddir/demoDataDir-1         |           0
        8 |      -1 | m    | m              | s    | u      | 7001 | i-6wvpa9wt | i-6wvpa9wt | /home/gpadmin/cloudberrydb/gpAux/gpdemo/datadirs/standby                     |           0
        3 |       1 | p    | p              | s    | u      | 7003 | i-6wvpa9wt | i-6wvpa9wt | /home/gpadmin/cloudberrydb/gpAux/gpdemo/datadirs/dbfast2/demoDataDir1        |           0
        6 |       1 | m    | m              | s    | u      | 7006 | i-6wvpa9wt | i-6wvpa9wt | /home/gpadmin/cloudberrydb/gpAux/gpdemo/datadirs/dbfast_mirror2/demoDataDir1 |           0
        2 |       0 | p    | p              | s    | u      | 7002 | i-6wvpa9wt | i-6wvpa9wt | /home/gpadmin/cloudberrydb/gpAux/gpdemo/datadirs/dbfast1/demoDataDir0        |           0
        5 |       0 | m    | m              | s    | u      | 7005 | i-6wvpa9wt | i-6wvpa9wt | /home/gpadmin/cloudberrydb/gpAux/gpdemo/datadirs/dbfast_mirror1/demoDataDir0 |           0
        4 |       2 | p    | p              | s    | u      | 7004 | i-6wvpa9wt | i-6wvpa9wt | /home/gpadmin/cloudberrydb/gpAux/gpdemo/datadirs/dbfast3/demoDataDir2        |           0
        7 |       2 | m    | m              | s    | u      | 7007 | i-6wvpa9wt | i-6wvpa9wt | /home/gpadmin/cloudberrydb/gpAux/gpdemo/datadirs/dbfast_mirror3/demoDataDir2 |           0
    (8 rows)
    ```