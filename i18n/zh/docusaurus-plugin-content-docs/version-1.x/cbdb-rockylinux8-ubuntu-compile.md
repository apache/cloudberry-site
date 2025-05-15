---
title: 在 Rocky Linux 8 和 Ubuntu 上
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 在 Rocky Linux 8 和 Ubuntu 系统上编译和安装 Apache Cloudberry

:::info
本文档来自 GitHub 仓库 [`apache/cloudberry`](https://github.com/apache/cloudberry/blob/main/deploy/build/README.Linux.md)。
:::

本文档分享如何在 Rocky Linux 8 和 Ubuntu 上编译和安装 Apache Cloudberry。请注意，本文档仅供开发人员在单节点环境中尝试 Apache Cloudberry。**请勿将本文档用于生产环境**。

若想了解如何在 Rocky Linux 9 上编译和安装 Apache Cloudberry，请参考 [在 Rocky Linux 9 上编译](/i18n/zh/docusaurus-plugin-content-docs/current/cbdb-rockylinux9-compile.md)。

按照以下步骤设置开发环境：

1. [克隆 GitHub 仓库](#第-1-步克隆-github-仓库)。
2. [安装依赖项](#第-2-步安装依赖项)。
3. [执行平台准备工作](#第-3-步执行平台准备工作)。
4. [构建 Apache Cloudberry](#第-4-步构建-apache-cloudberry)。
5. [验证集群](#第-5-步验证集群)。

## 第 1 步：克隆 GitHub 仓库

将 GitHub 仓库 `apache/cloudberry` 克隆到目标机器：

```shell
git clone https://github.com/apache/cloudberry.git
```

## 第 2 步：安装依赖项

进入仓库目录，根据你的操作系统安装依赖项：

<Tabs>
<TabItem value="rockey-rhel-8" label="RHEL 8 和 Rocky Linux 8" default>

1. 安装开发工具 Development Tools。

    ```bash
    sudo yum group install -y "Development Tools"
    ```

2. 安装依赖项。

    ```bash
    sudo yum install -y epel-release

    sudo yum install -y apr-devel bison bzip2-devel cmake3 flex gcc gcc-c++ krb5-devel libcurl-devel libevent-devel libkadm5  libxml2-devel libzstd-devel openssl-devel perl-ExtUtils-Embed python3-devel python3-pip readline-devel xerces-c-devel zlib-devel
    ```

3. 执行 `README.Rhel-Rocky.bash` 脚本安装更多依赖项。

    ```bash
    cd ~/cloudberry/deploy/build/
    ./README.Rhel-Rocky.bash
    ```

</TabItem>
<TabItem value="ubuntu-18.04" label="Ubuntu 18.04 或更新版本" default>

1. 执行 `deploy/build` 目录下的 `README.Ubuntu.bash` 脚本，以安装依赖项。

    ```shell
    # 执行该脚本需要输入密码。
    sudo ~/cloudberry/deploy/build/README.Ubuntu.bash
    ```

    :::info 提示
    - 当执行 `README.Ubutnu.bash` 脚本安装依赖项时，会提示你配置 Kerberos 的 `realm`。你可以输入任意 `realm`，因为这只是用于测试，而且在测试期间，系统会重新配置本地服务器/客户端。如果你想跳过此手动配置，请执行 `export DEBIAN_FRONTEND=noninteractive`。
    - 如果脚本下载安装包失败，请尝试使用另一个 Ubuntu 软件源。
    :::

2. 安装 GCC 10。Ubuntu 18.04 及以上版本应当使用 GCC 10 或以上版本：

    ```bash
    # 安装 gcc-10
    sudo apt install software-properties-common
    sudo add-apt-repository ppa:ubuntu-toolchain-r/test
    sudo apt install gcc-10 g++-10
    sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-10 100
    ```

</TabItem>
</Tabs>

## 第 3 步：执行平台准备工作

在操作系统上安装所有依赖项后，在构建 Apache Cloudberry 之前你还需要执行一些平台准备工作。这些操作包括在平台上手动运行 `ldconfig`、创建 `gpadmin` 用户以及设置密码以启动 Apache Cloudberry 并进行测试。

1. 确保将 `/usr/local/lib` 和 `/usr/local/lib64` 添加到 `/etc/ld.so.conf` 文件中。

    ```bash
    echo -e "/usr/local/lib \n/usr/local/lib64" >> /etc/ld.so.conf
    ldconfig
    ```

2. 创建 `gpadmin` 用户并设置 SSH 密钥。根据不同的操作系统手动创建 SSH 密钥，这样你就可以在不输入密码的情况下运行 `ssh localhost`。

    <Tabs>
    <TabItem value="rhel-rockey" label="Rocky Linux 和 RHEL 8" default>

    ```bash
    useradd gpadmin  # 创建 gpadmin 用户
    su - gpadmin  # 切换到 gpadmin 用户
    ssh-keygen  # 创建 SSH 密钥
    cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
    chmod 600 ~/.ssh/authorized_keys
    exit
    ```

    </TabItem>
    <TabItem value="ubuntu" label="Ubuntu" default>

    ```bash
    useradd -r -m -s /bin/bash gpadmin  # 创建 gpadmin 用户
    su - gpadmin  # 切换到 gpadmin 用户
    ssh-keygen  # 创建 SSH 密钥
    cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
    chmod 600 ~/.ssh/authorized_keys 
    exit
    ```

    </TabItem>
    </Tabs>

## 第 4 步：构建 Apache Cloudberry

安装完所有依赖项并执行了平台准备工作后，你就可以开始构建 Apache Cloudberry 了。按顺序执行以下命令。

1. 进入 `cloudberry` 目录，执行 `configure` 脚本。

    ```bash
    cd ../..
    ./configure --with-perl --with-python --with-libxml --with-gssapi --prefix=/usr/local/cloudberrydb
    ```

    :::info 提示
    Apache Cloudberry 默认使用 GPORCA 构建。如果你希望构建出不使用 GPORCA 的 Apache Cloudberry，请在 `./configure` 命令中添加 `--disable-orca` 参数。

    ```bash
    ./configure --disable-orca --with-perl --with-python --with-libxml --prefix=/usr/local/cloudberry
    ```

    :::

2. 编译源码并安装数据库。

    ```bash
    make -j8
    make -j8 install
    ```

3. 将 Greenplum 的环境变量引入运行中的 shell。

    ```bash
    cd ..
    cp -r cloudberry/ /home/gpadmin/
    cd /home/gpadmin/
    chown -R gpadmin:gpadmin cloudberry/
    su - gpadmin
    cd cloudberry/
    source /usr/local/cloudberry/greenplum_path.sh
    ```

4. 启动示例集群。

    <Tabs>
    <TabItem value="ubuntu-rocky-rhel" label="Ubuntu、Rocky Linux 和 RHEL" default>

    ```bash
    make create-demo-cluster
    ```

    </TabItem>
    </Tabs>

5. 执行以下命令，以准备测试。此命令将为测试配置端口和环境变量。

    该命令会配置端口和环境变量，例如 `PGPORT`（主节点的默认端口）和 `COORDINATOR_DATA_DIRECTORY`（主节点的数据目录）。

    ```bash
    source gpAux/gpdemo/gpdemo-env.sh
    ```

## 第 5 步：验证集群

1. 你可以通过以下命令来验证集群是否已成功启动。如果成功启动，你会看到端口在 `7000` 到 `7007` 之间的多个 `postgres` 进程。

    ```bash
    ps -ef | grep postgres
    ```

2. 连接至 Apache Cloudberry，通过查询系统表 `gp_segement_configuration` 查看活跃 segment 的信息。有关此系统表的详细描述，参见 [Greenplum 文档](https://docs.vmware.com/en/VMware-Greenplum/7/greenplum-database/ref_guide-system_catalogs-gp_segment_configuration.html)。

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
        1 |      -1 | p    | p              | n    | u      | 7000 | i-6wvpa9wt | i-6wvpa9wt | /home/gpadmin/cloudberry/gpAux/gpdemo/datadirs/qddir/demoDataDir-1         |           0
        8 |      -1 | m    | m              | s    | u      | 7001 | i-6wvpa9wt | i-6wvpa9wt | /home/gpadmin/cloudberry/gpAux/gpdemo/datadirs/standby                     |           0
        3 |       1 | p    | p              | s    | u      | 7003 | i-6wvpa9wt | i-6wvpa9wt | /home/gpadmin/cloudberry/gpAux/gpdemo/datadirs/dbfast2/demoDataDir1        |           0
        6 |       1 | m    | m              | s    | u      | 7006 | i-6wvpa9wt | i-6wvpa9wt | /home/gpadmin/cloudberry/gpAux/gpdemo/datadirs/dbfast_mirror2/demoDataDir1 |           0
        2 |       0 | p    | p              | s    | u      | 7002 | i-6wvpa9wt | i-6wvpa9wt | /home/gpadmin/cloudberry/gpAux/gpdemo/datadirs/dbfast1/demoDataDir0        |           0
        5 |       0 | m    | m              | s    | u      | 7005 | i-6wvpa9wt | i-6wvpa9wt | /home/gpadmin/cloudberry/gpAux/gpdemo/datadirs/dbfast_mirror1/demoDataDir0 |           0
        4 |       2 | p    | p              | s    | u      | 7004 | i-6wvpa9wt | i-6wvpa9wt | /home/gpadmin/cloudberry/gpAux/gpdemo/datadirs/dbfast3/demoDataDir2        |           0
        7 |       2 | m    | m              | s    | u      | 7007 | i-6wvpa9wt | i-6wvpa9wt | /home/gpadmin/cloudberry/gpAux/gpdemo/datadirs/dbfast_mirror3/demoDataDir2 |           0
    (8 rows)
    ```
