---
title: 在 Rocky Linux 9 上
---

# 在 Rocky Linux 9 上编译和安装 Apache Cloudberry

:::info 提示
本文档来自 [Building Apache Cloudberry (Incubating): A Development Environment Guide](https://github.com/edespino/cloudberry/blob/rocky9-dev-readme/deploy/build/README-rockylinux9.md)。
:::

本文适用于希望探索并可能为 Apache Cloudberry 做出贡献的开发人员。文中描述的构建环境仅适用于开发和测试。

若想了解如何在 Rocky Linux 8 和 Ubuntu 上编译和安装 Apache Cloudberry，请参考 [在 Rocky Linux 8 和 Ubuntu 上编译](/i18n/zh/docusaurus-plugin-content-docs/current/cbdb-rockylinux8-ubuntu-compile.md)。

## 1. 目标受众

- 想为 Apache Cloudberry 贡献代码的开发人员。
- 想探索 Cloudberry 扩展功能的 PostgreSQL 开发人员。
- 对分布式查询处理感兴趣的数据库爱好者。
- 考虑加入 Apache Cloudberry 社区的人员。

通过本文描述的构建过程，你可以：

- 调试和测试新功能。
- 使用开发工具深入了解代码库。
- 运行测试套件和验证检查。
- 修改代码并进行测试。

:::tip 提示
如果你是 Apache Cloudberry 或 PostgreSQL 开发的新手：

- 建议先构建 PostgreSQL，熟悉基本工作流程。
- 加入项目邮件列表，与其他开发人员交流。
- 查看项目议题跟踪器，了解当前的开发重点。
- 探索代码库时，要做好应对较长构建时间和多次迭代测试的准备。
:::

## 2. 构建 Apache Cloudberry 的过程

Apache Cloudberry（孵化中）的构建过程和 PostgreSQL 基本一致。如果你之前搭建过 PostgreSQL 的开发环境，那么构建 Cloudberry 会让你有种似曾相识的感觉。

对于 Cloudberry 或 PostgreSQL 的新手，我建议先从构建 PostgreSQL 开始。PostgreSQL 开发社区提供了丰富的文档和工具，能帮你顺利走完整个流程。熟悉了 PostgreSQL 的构建过程后，再转向 Cloudberry 就会容易很多。

## 3. Cloudberry 与 PostgreSQL 的主要区别

虽然整体流程差不多，但因为 Cloudberry 是分布式架构，所以在使用时会有一些额外的注意事项：

- **额外依赖**：需要一些特定的库和工具，比如用于 Orca 查询优化器的 `xerces-c`。
- **分布式特性**：Cloudberry 在 PostgreSQL 的基础上增加了大规模并行处理功能，这会带来一些额外的配置步骤。

熟悉 PostgreSQL 后，设置 Cloudberry 就会变得轻而易举。接下来的章节会一步步指导你完成 Cloudberry 的构建和运行时设置。

## 4. 准备工作

### 4.1 配置 Rocky Linux 9 虚拟机

- 你可以使用任何平台来创建虚拟机或容器：

    - **AWS EC2**：这些步骤已在 Rocky-9-EC2-Base-9.5-20241118.0.x86_64 AMI 上验证过，但应该适用于任何 Rocky Linux 9 的版本。
    - **VirtualBox**：可以使用官方的 Rocky Linux 9 ISO 或 Vagrant 镜像。
    - **Docker**：这些步骤已在 `rockylinux/rockylinux:9` 镜像上验证过，但应该适用于任何基于 Rocky Linux 9 的容器。

        ```bash
        docker run -it --shm-size=2gb -h cdw rockylinux/rockylinux:9
        ```

        这里的主机名 "cdw"（协调数据仓库）只是我们在测试时给容器起的一个示例名字。

        为了确保测试套件能够顺利运行，你可能需要通过 `--shm-size=2gb` 参数来增加容器的共享内存。如果 Cloudberry 集群没有足够的共享内存资源，测试可能会失败。

    - **其他云平台**：使用等效的 Rocky Linux 9 镜像。

- 确保虚拟机或容器具备以下条件：
    - 能够连接互联网，以便安装软件包。
    - 可以通过 SSH 或控制台进行用户交互。
    - 有足够的资源（CPU、内存和存储空间），以满足开发环境的需求。

:::说明
由于不同平台的环境配置步骤各不相同，本指南没有涵盖具体步骤。本指南假设你已经成功创建了虚拟机或容器，并且能够以默认用户身份登录（例如，在 AWS 上的 Rocky Linux 使用 `rocky` 用户）。
:::

### 4.2 系统要求

开发环境的最低要求如下：

- CPU：建议 4 核（最低 2 核）
- 内存：建议 8GB（最低 4GB）
- 存储：建议有 20GB 的可用空间
- 网络：需要宽带互联网连接，用于下载软件包

### 4.3 安装 `sudo`（如果尚未安装）

如果系统中尚未安装 `sudo`，请运行以下命令进行安装：

```bash
dnf install -y sudo
```

:::说明
在 Docker 等环境中，安装 `sudo` 后，`root` 用户可以在无需密码提示的情况下使用 `sudo`。
:::

### 4.4 安装所需软件包

本步骤将安装构建 Apache Cloudberry 所需的基本开发工具、库和依赖项。

#### 4.4.1 安装基本系统软件包

以下命令将安装 Cloudberry 开发所需的主要软件包：

```bash
sudo dnf install -y apr-devel autoconf bison bzip2 bzip2-devel cmake3 createrepo_c ed flex gcc gcc-c++ git glibc-langpack-en initscripts iproute java-11-openjdk java-11-openjdk-devel krb5-devel less libcurl-devel libevent-devel libuuid-devel libxml2-devel libzstd-devel lz4 lz4-devel m4 nc net-tools openldap-devel openssh-clients openssh-server openssl-devel pam-devel passwd perl perl-Env perl-ExtUtils-Embed perl-Test-Simple perl-core pinentry python3-devel python3-lxml python3-psutil python3-pytest python3-pyyaml readline-devel rpm-build rpm-sign rpmdevtools rsync tar unzip util-linux-ng wget which zlib-devel
```

#### 4.4.2 安装 CodeReady Builder (CRB) 软件包

CRB 仓库提供了额外的开发工具和库。在 Rocky Linux 上，该仓库默认处于禁用状态，需要手动启用。

```bash
sudo dnf install -y --enablerepo=crb libuv-devel libyaml-devel perl-IPC-Run
```

:::note 说明
在红帽企业版 Linux (RHEL) 中，此仓库被称为 "PowerTools"。
:::

### 4.5 创建并配置 `gpadmin` 用户

为了准备 Apache Cloudberry（孵化中）的开发环境，我们需要创建并配置一个专用的 `gpadmin` 用户。

1. 创建一个名为 `gpadmin` 的用户，同时创建同名用户组、主目录，并设置 bash 为默认 shell：

    ```bash
    sudo useradd -U -m -s /bin/bash gpadmin
    ```

2. 授予 `gpadmin` 用户无需密码的 sudo 访问权限：

    ```bash
    echo 'gpadmin ALL=(ALL) NOPASSWD:ALL' | sudo tee /etc/sudoers.d/90-gpadmin
    ```

3. 验证 `gpadmin` 用户的设置：

    ```bash
    sudo -u gpadmin sudo whoami
    ```

    如果输出为 `root`，则表明配置正确。

#### 4.5.1 设置 `gpadmin` 用户环境

可选步骤：通过配置 Vim、Tmux 和 Oh My Bash 来增强 `gpadmin` 的开发环境

```bash
sudo dnf install -y vim tmux

sudo -u gpadmin bash <<'EOF'
# 设置 Vim 配置
wget -nv -q https://gist.githubusercontent.com/simonista/8703722/raw/d08f2b4dc10452b97d3ca15386e9eed457a53c61/.vimrc -O /home/gpadmin/.vimrc

# 设置 Tmux 配置
wget -nv -q https://raw.githubusercontent.com/tony/tmux-config/master/.tmux.conf -O /home/gpadmin/.tmux.conf

# 安装 Oh My Bash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/ohmybash/oh-my-bash/master/tools/install.sh )" --unattended
EOF
```

#### 4.5.2 必要的配置

该脚本以 `gpadmin` 用户身份执行三项主要任务：

- 更新 `.bashrc`，引入 Cloudberry 环境变量。
- 设置 SSH 密钥对，实现免密登录（如果尚未存在）。
- 配置 SSH 目录的正确权限，确保安全。

脚本通过 heredoc（EOF）块在 `gpadmin` 用户上下文中执行多个命令。在这些说明中会多次用到这种方法。

```bash
sudo -u gpadmin bash <<'EOF'
# 将 Cloudberry 环境设置添加到 .bashrc
echo -e '\n

# 添加 Cloudberry 条目
if [ -f /usr/local/cloudberry-db/greenplum_path.sh ]; then
  source /usr/local/cloudberry-db/greenplum_path.sh
fi

# 使用 UTF-8 编码的美式英语
export LANG=en_US.UTF-8
' >> /home/gpadmin/.bashrc

# 设置 SSH 以实现免密访问
mkdir -p /home/gpadmin/.ssh
if [ ! -f /home/gpadmin/.ssh/id_rsa ]; then
  ssh-keygen -t rsa -b 2048 -C 'apache-cloudberry-dev' -f /home/gpadmin/.ssh/id_rsa -N ""
fi
cat /home/gpadmin/.ssh/id_rsa.pub >> /home/gpadmin/.ssh/authorized_keys

# 设置 SSH 目录的正确权限
chmod 700 /home/gpadmin/.ssh
chmod 600 /home/gpadmin/.ssh/authorized_keys
chmod 644 /home/gpadmin/.ssh/id_rsa.pub
EOF
```

### 4.6 配置系统设置

像 Apache Cloudberry 这样的数据库系统需要特定的系统资源限制才能高效运行。这些限制应针对运行数据库进程的 `gpadmin` 用户进行配置。

1. 创建资源限制配置

    创建用户限制配置文件：

    ```bash
    sudo tee /etc/security/limits.d/90-db-limits.conf << 'EOF'
    # 为 gpadmin 设置核心转储文件大小限制
    gpadmin soft core unlimited
    gpadmin hard core unlimited
    # 为 gpadmin 设置打开文件限制
    gpadmin soft nofile 524288
    gpadmin hard nofile 524288
    # 为 gpadmin 设置进程限制
    gpadmin soft nproc 131072
    gpadmin hard nproc 131072
    EOF
    ```

2. 了解以下这些限制。

    配置设置了以下类型的资源限制：

    - **核心转储** (`core`)：
        - 设置为 `unlimited`，启用完整的内核转储。
        - 对调试和故障排除至关重要。
        - 软限制和硬限制均不受限制。

    - **打开文件** (`nofile`)：
        - 设置为 `524288`（512K）个文件。
        - 用于处理大量的并发数据库连接。
        - 对分布式操作和大型工作负载至关重要。

    - **进程限制** (`nproc`)：
        - 设置为 `131072`（128K）个进程。
        - 支持并行查询执行。
        - 支持 Cloudberry 的分布式架构。

3. 验证资源限制。

    ```bash
    # 检查当前限制
    sudo -u gpadmin ulimit -a
    ```

## 5. 获取并编译软件

从这一步开始，我们将以 `gpadmin` 用户身份执行命令。

```bash
sudo su - gpadmin
```

### 5.1 下载、构建并安装 Apache Xerces-C

Apache Xerces-C 是 Cloudberry 启用 Orca 查询优化器的必需依赖项。以下步骤将下载源代码，验证其完整性，构建库并完成安装。

#### 5.1.1 设置变量（辅助）

为了简化命令并提高可复用性，我们定义以下辅助变量：

```bash
XERCES_LATEST_RELEASE=3.3.0
XERCES_INSTALL_PREFIX="/usr/local/xerces-c"
```

:::note 说明
这些变量用于指定要安装的 Apache Xerces-C 的版本（`XERCES_LATEST_RELEASE`）及其安装路径（`XERCES_INSTALL_PREFIX`），确保整个构建过程的一致性并简化命令。
:::

#### 5.1.2 下载并验证源代码包

```bash
wget -nv "https://dlcdn.apache.org//xerces/c/3/sources/xerces-c-${XERCES_LATEST_RELEASE}.tar.gz"
echo "$(curl -sL https://dlcdn.apache.org//xerces/c/3/sources/xerces-c-${XERCES_LATEST_RELEASE}.tar.gz.sha256)" | sha256sum -c -
```

:::note 说明
请确保 SHA-256 校验通过（输出应为：`xerces-c-3.3.0.tar.gz: OK`）。如果校验失败，请不要继续，需验证源代码包的完整性。
:::

#### 5.1.3 解压、配置、构建、测试和安装

```bash
tar xf "xerces-c-${XERCES_LATEST_RELEASE}.tar.gz"
rm "xerces-c-${XERCES_LATEST_RELEASE}.tar.gz"
cd xerces-c-${XERCES_LATEST_RELEASE}

./configure --prefix="${XERCES_INSTALL_PREFIX}-${XERCES_LATEST_RELEASE}" | tee configure-$(date "+%Y.%m.%d-%H.%M.%S").log
make -j$(nproc) | tee make-$(date "+%Y.%m.%d-%H.%M.%S").log
make check | tee make-check-$(date "+%Y.%m.%d-%H.%M.%S").log
sudo make install | tee make-install-$(date "+%Y.%m.%d-%H.%M.%S").log
sudo ln -s ${XERCES_INSTALL_PREFIX}-${XERCES_LATEST_RELEASE} ${XERCES_INSTALL_PREFIX}
```

:::note 说明
- `make` 命令以并行方式运行（`-j$(nproc)`），利用所有可用的 CPU 核心加速构建过程。`nproc` 命令动态获取核心数量。
- 在 `make check` 阶段，标记为 **XFAIL**（预期失败）的测试结果是可以接受的，不代表构建存在问题。
- 命令的输出被保存到带时间戳的日志文件中，方便日后参考或故障排查。
:::

### 5.2 克隆 Apache Cloudberry 仓库

将 Apache Cloudberry 的源代码克隆到 `gpadmin` 用户的主目录中：

```bash
git clone https://github.com/apache/cloudberry.git ~/cloudberry
cd ~/cloudberry
```

### 5.3 配置构建过程

#### 5.3.1 准备环境

构建过程需要在指定位置准备好必要的库（例如 Xerces-C），以便进行配置和运行。使用以下命令来准备环境：

```bash
sudo rm -rf /usr/local/cloudberry-db
sudo chmod a+w /usr/local
mkdir -p /usr/local/cloudberry-db/lib
sudo cp -v /usr/local/xerces-c/lib/libxerces-c.so \
           /usr/local/xerces-c/lib/libxerces-c-3.*.so \
           /usr/local/cloudberry-db/lib
sudo chown -R gpadmin.gpadmin /usr/local/cloudberry-db
```

#### 5.3.2 运行 `configure`

`configure` 命令用于设置 Apache Cloudberry 的构建环境，包括多个开发功能和扩展。

```bash
cd ~/cloudberry
export LD_LIBRARY_PATH=/usr/local/cloudberry-db/lib:$LD_LIBRARY_PATH
./configure --prefix=/usr/local/cloudberry-db \
            --disable-external-fts \
            --enable-debug \
            --enable-cassert \
            --enable-debug-extensions \
            --enable-gpcloud \
            --enable-ic-proxy \
            --enable-mapreduce \
            --enable-orafce \
            --enable-orca \
            --enable-pxf \
            --enable-tap-tests \
            --with-gssapi \
            --with-ldap \
            --with-libxml \
            --with-lz4 \
            --with-openssl \
            --with-pam \
            --with-perl \
            --with-pgport=5432 \
            --with-python \
            --with-pythonsrc-ext \
            --with-ssl=openssl \
            --with-openssl \
            --with-uuid=e2fs \
            --with-includes=/usr/local/xerces-c/include \
            --with-libraries=/usr/local/cloudberry-db/lib | tee ~/cloudberry/configure-$(date "+%Y.%m.%d-%H.%M.%S").log
```

:::note 说明
`configure` 命令的输出被保存到带时间戳的日志文件中，方便日后参考或故障排查。
:::

### 5.4 构建并安装 Apache Cloudberry 及其 contrib 扩展

#### 5.4.1 编译代码

```bash
# 使用以下命令编译 Apache Cloudberry 的核心组件：
make -j$(nproc) --directory=~/cloudberry | tee ~/cloudberry/make-$(date "+%Y.%m.%d-%H.%M.%S").log

# 编译额外的 contrib 模块，这些模块提供了可选功能和扩展：
make -j$(nproc) --directory=~/cloudberry/contrib | tee ~/cloudberry/make-contrib-$(date "+%Y.%m.%d-%H.%M.%S").log
```

#### 5.4.2 安装编译后的二进制文件

```bash
# 将核心组件安装到指定目录：
make install --directory=~/cloudberry | tee ~/cloudberry/make-install-$(date "+%Y.%m.%d-%H.%M.%S").log

# 将 contrib 模块安装到指定目录：
make install --directory=~/cloudberry/contrib | tee ~/cloudberry/make-contrib-install-$(date "+%Y.%m.%d-%H.%M.%S").log
```

### 5.5 验证安装

安装完成后，通过以下步骤验证安装是否成功：

#### 5.5.1 检查 Cloudberry 版本

```bash
/usr/local/cloudberry-db/bin/postgres --gp-version
/usr/local/cloudberry-db/bin/postgres --version
```

#### 5.5.2 验证库依赖

```bash
ldd /usr/local/cloudberry-db/bin/postgres
```

#### 5.5.3 检查库扩展

```bash
ls -al /usr/local/cloudberry-db/share/postgresql/extension
```

#### 5.5.4 检查核心工具

```bash
ls -l /usr/local/cloudberry-db/bin/
```
预期输出应包含关键二进制文件，如 postgres 和 initdb 等。

### 5.6 常见问题

- **配置失败，提示缺少依赖项：**

    1. 确认所有必需的软件包是否已正确安装。
    2. 查看配置日志文件，了解具体的错误信息。
    3. 确保 CRB 仓库已启用且配置正确。

- **构建失败，提示编译错误：**

    1. 查看 make 日志，定位具体的错误信息。
    2. 确保系统有足够的资源（如内存和 CPU）。
    3. 验证 Xerces-C 是否安装正确。

- **库加载问题：**

    1. 确保 `LD_LIBRARY_PATH` 包含所需的库目录。
    2. 检查库文件的权限设置。

如果需要更详细的错误信息，可以查看安装过程中生成的带时间戳的日志文件。

至此，您已在 Rocky Linux 9 上成功构建并安装了 Apache Cloudberry，安装目录为 `/usr/local/cloudberry-db`。

## 6. 设置 Cloudberry 开发集群

本节将指导你搭建一个 Cloudberry 演示集群，并测试其基本功能。该演示集群包含一个 Coordinator、一个备用 Coordinator 以及多个主 Segment 和镜像 Segment，所有这些组件都运行在同一台开发主机上。

### 6.1 设置初始容器（并非所有环境都需要）

容器环境通常不会默认启动 SSH 服务。由于 Cloudberry 高度依赖 SSH 进行进程间通信，因此我们需要手动初始化并启动 SSH 服务：

```bash
if ! pgrep sshd > /dev/null; then
    echo "SSH 服务未运行，正在启动..."
    sudo ssh-keygen -A
    echo "PasswordAuthentication yes" | sudo tee -a /etc/ssh/sshd_config
    sudo /usr/sbin/sshd
else
    echo "SSH 服务已在运行"
fi
```

### 6.2 为 Cloudberry 配置 SSH

Cloudberry 使用 SSH 进行 Coordinator 与 Segment 之间的通信。以下命令将确保为 `gpadmin` 用户正确配置 SSH，通过将主机添加到 `known_hosts` 文件并验证 SSH 连接：

```bash
ssh-keyscan $(hostname) >> ~/.ssh/known_hosts
ssh $(hostname) date
```

### 6.3 设置 Cloudberry 环境变量

加载 Cloudberry 环境变量，这些变量会设置二进制文件、库和其他关键组件的路径：

```bash
source /usr/local/cloudberry-db/greenplum_path.sh
```

### 6.4 创建开发集群

创建一个演示集群，该集群在单台机器上模拟完整的 Cloudberry 部署。这包括 1 个 Coordinator、1 个备用 Coordinator、3 个主 Segment 和 3 个镜像 Segment：

```bash
make create-demo-cluster --directory=~/cloudberry | tee ~/cloudberry/make-create-demo-cluster-$(date "+%Y.%m.%d-%H.%M.%S").log
```

### 6.5 配置集群环境

创建集群后，验证并加载指向 Coordinator 端口和数据目录的集群特定变量：

```bash
source ~/cloudberry/gpAux/gpdemo/gpdemo-env.sh
```

### 6.6 验证集群部署

运行以下命令，确保集群正常运行：

```bash
# 显示详细的集群状态，包括 Segment 的状态
gpstate

# 测试集群的关闭和启动
gpstop -a
gpstart -a

# 查看 Cloudberry 的版本和构建信息
psql template1 -c 'SELECT version()'

# 查看 Segment 配置，显示主 Segment 和镜像 Segment 的关系
psql template1 -c 'SELECT * from gp_segment_configuration'

# 查看可用的 PostgreSQL 扩展
psql template1 -c 'SELECT * FROM pg_available_extensions'
```

### 6.7 扩展测试示例：pg_stat_statements

以下示例展示了如何启用和测试 `pg_stat_statements` 扩展，该扩展可提供 SQL 查询执行的统计信息：

```bash
# 创建一个用于测试的数据库
createdb gpadmin

# 将扩展添加到共享库中以启用它
echo "shared_preload_libraries='pg_stat_statements'" >> $COORDINATOR_DATA_DIRECTORY/postgresql.conf

# 重启集群以加载新库（-r 表示“重启”）
gpstop -ar

# 在数据库中创建扩展
psql gpadmin -e -c 'CREATE EXTENSION pg_stat_statements'

# 运行测试查询以生成统计信息
psql gpadmin --echo-queries <<EOF
-- 创建一个示例表
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name TEXT,
    department TEXT,
    salary NUMERIC
);

-- 插入示例数据
INSERT INTO employees (name, department, salary)
VALUES
('Alice', 'HR', 60000),
('Bob', 'Engineering', 80000),
('Charlie', 'Marketing', 70000);

-- 查询数据以生成统计信息
SELECT * FROM employees WHERE department = 'Engineering';
SELECT AVG(salary) FROM employees;

-- 查看调用次数最多的查询
SELECT query, calls, total_exec_time AS total_time, rows
FROM pg_stat_statements
ORDER BY calls DESC
LIMIT 5;

-- 查看耗时最长的查询
SELECT query, calls, total_exec_time AS total_time, rows
FROM pg_stat_statements
ORDER BY total_exec_time DESC
LIMIT 5;
EOF
```

### 6.8 清理开发集群

如果需要清理环境并重新开始，可以销毁演示集群：

```bash
make destroy-demo-cluster --directory=~/cloudberry | tee ~/cloudberry/make-destroy-demo-cluster-$(date "+%Y.%m.%d-%H.%M.%S").log
```

此命令会清除所有集群数据和配置，方便你按需创建一个全新的干净集群。

### 6.9 解决 SSH 连接问题

运行 `create-demo-cluster` 时，若 SSH 主机验证未完成，进程可能会卡住，表现为等待用户输入以确认主机身份的停滞状态。

因此，在创建集群前，需运行以下命令：

```bash
ssh-keyscan $(hostname) >> ~/.ssh/known_hosts
```

该命令会自动将主机的 SSH 密钥添加到 `known_hosts` 文件，避免在创建集群时出现交互式提示。

如果仍遇到 SSH 问题，可按以下步骤排查：

1. 确保 SSH 守护进程正在运行。
2. 检查 `known_hosts` 文件是否存在且权限正确。
3. 在创建集群前，通过 `ssh $(hostname) date` 测试 SSH 连接。

## 7. 验证基本功能

运行 installcheck 测试套件验证基本功能。建议分别在启用和禁用 Orca（查询优化器）的情况下进行测试：

```bash
# 启用 Orca 优化器运行测试
PGOPTIONS='-c optimizer=on' make --directory=~/cloudberry installcheck

# 禁用 Orca 优化器运行测试
PGOPTIONS='-c optimizer=off' make --directory=~/cloudberry installcheck
```

:::tip 提示
尽管 Orca 是 Cloudberry 的默认优化器，但在运行 installcheck 时，需明确设置 `optimizer=on`，否则 `explain` 测试会因缺少显式配置选项而失败。
:::

### 7.1 测试结果

installcheck 测试用于检查基本功能是否正常。执行时，你会看到类似以下的输出：

```bash
test tablespace                   ... ok         3236 ms (diff   76 ms)
parallel group (20 tests):  pg_lsn oid txid name char varchar int2 regproc text ...
     boolean                      ... ok          862 ms (diff   56 ms)
     char                         ... ok          419 ms (diff   87 ms)
     explain                      ... FAILED      310 ms (diff  139 ms)
```

执行完成后，会显示一个总结，例如：

```
========================
 1 of 658 tests failed. 
========================
```

如果某些测试失败了：

- `regression.diffs` 文件会显示实际结果与预期结果之间的差异。
- `regression.out` 文件包含完整的测试执行输出。

这些文件位于 `/home/gpadmin/cloudberry/src/test/regress/` 目录中。

:::note 说明
installcheck 只是众多可用测试计划中的一个。本指南主要关注基本开发环境的搭建和验证。
:::

### 7.2 排查测试失败

如果测试失败，你可能需要查看各个集群组件的日志文件。可以通过查询 Segment 配置来定位包含这些日志的数据目录：

```bash
psql -P pager=off template1 -c 'SELECT * from gp_segment_configuration'
```

此命令会显示完整的集群配置信息。其中，`content = -1` 表示 Coordinator 节点：

```sql
 dbid | content | role | preferred_role | mode | status | port | hostname | address |                                  datadir                                   | warehouseid 
------+---------+------+----------------+------+--------+------+----------+---------+----------------------------------------------------------------------------+-------------
    1 |      -1 | p    | p              | n    | u      | 7000 | mdw      | mdw     | /home/gpadmin/cloudberry/gpAux/gpdemo/datadirs/qddir/demoDataDir-1         |           0
    8 |      -1 | m    | m              | s    | u      | 7001 | mdw      | mdw     | /home/gpadmin/cloudberry/gpAux/gpdemo/datadirs/standby                     |           0
    2 |       0 | p    | p              | s    | u      | 7002 | mdw      | mdw     | /home/gpadmin/cloudberry/gpAux/gpdemo/datadirs/dbfast1/demoDataDir0        |           0
    5 |       0 | m    | m              | s    | u      | 7005 | mdw      | mdw     | /home/gpadmin/cloudberry/gpAux/gpdemo/datadirs/dbfast_mirror1/demoDataDir0 |           0
    3 |       1 | p    | p              | s    | u      | 7003 | mdw      | mdw     | /home/gpadmin/cloudberry/gpAux/gpdemo/datadirs/dbfast2/demoDataDir1        |           0
    6 |       1 | m    | m              | s    | u      | 7006 | mdw      | mdw     | /home/gpadmin/cloudberry/gpAux/gpdemo/datadirs/dbfast_mirror2/demoDataDir1 |           0
    4 |       2 | p    | p              | s    | u      | 7004 | mdw      | mdw     | /home/gpadmin/cloudberry/gpAux/gpdemo/datadirs/dbfast3/demoDataDir2        |           0
    7 |       2 | m    | m              | s    | u      | 7007 | mdw      | mdw     | /home/gpadmin/cloudberry/gpAux/gpdemo/datadirs/dbfast_mirror3/demoDataDir2 |           0
```

每个 `datadir` 目录中都包含有助于诊断测试失败的日志文件。可以根据失败的测试，在相应组件的目录中查看这些日志。
