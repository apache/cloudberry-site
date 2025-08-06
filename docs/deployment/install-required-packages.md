---
title: Install required packages
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This step installs essential development tools, libraries, and dependencies required for building Apache Cloudberry.

## Install basic system packages

The following command installs the full set of primary packages required for Cloudberry development:

<Tabs>
<TabItem value="rocky-linux" label="For Rocky Linux 8+" default>

```bash
sudo dnf install -y apr-devel \
  bison \
  bzip2-devel \
  cmake3 \
  curl \
  diffutils \
  flex \
  gcc \
  gcc-c++ \
  glibc-langpack-en \
  glibc-locale-source \
  iproute \
  krb5-devel \
  libcurl-devel \
  libevent-devel \
  libxml2-devel \
  libuuid-devel \
  libzstd-devel \
  lz4-devel \
  net-tools \
  openldap-devel \
  openssl-devel \
  openssh-server \
  pam-devel \
  perl \
  perl-ExtUtils-Embed \
  perl-Test-Simple \
  perl-Env \
  python3-devel \
  python3-pip \
  readline-devel \
  rsync \
  wget \
  which \
  zlib-devel
```

### Enable additional development tools and libraries

For Rocky Linux, we also need to install `CodeReady Builder (CRB)` or `devel` repos- they can provide additional development tools and libraries.

On Rocky Linux, they are disabled by default and must be explicitly enabled.

<Tabs>
<TabItem value="rocky-linux-8" label="For Rocky Linux 8" default>
```bash
sudo dnf install -y --enablerepo=devel libuv-devel libyaml-devel perl-IPC-Run protobuf-devel
```
</TabItem>
<TabItem value="rocky-linux-9" label="For Rocky Linux 9">
```bash
sudo dnf install -y --enablerepo=crb libuv-devel libyaml-devel perl-IPC-Run protobuf-devel
```
</TabItem>
</Tabs>

:::note
In Red Hat Enterprise Linux (RHEL), this repository is called "PowerTools."
:::

### Install Apache Xerces-C for ORCA

Apache Xerces-C is a required dependency for enabling the Orca query optimizer in Cloudberry. The following steps download the source code, verify its integrity, build the library, and install it.

1. Set variables (helper)

    To streamline the commands and make them reusable, define the following helper variables:

    ```bash
    XERCES_LATEST_RELEASE=3.3.0
    XERCES_INSTALL_PREFIX="/usr/local/xerces-c"
    ```

:::note
These variables are used throughout the build process to specify the version of Apache Xerces-C being installed (XERCES_LATEST_RELEASE) and its installation directory (XERCES_INSTALL_PREFIX). This ensures consistency and simplifies the commands.
:::

2. Download and verify the source package

    ```bash
    wget -nv "https://dlcdn.apache.org//xerces/c/3/sources/xerces-c-${XERCES_LATEST_RELEASE}.tar.gz"
    echo "$(curl -sL https://dlcdn.apache.org//xerces/c/3/sources/xerces-c-${XERCES_LATEST_RELEASE}.tar.gz.sha256)" | sha256sum -c -
    ```

:::note
Ensure the SHA-256 checksum validation passes (output: `xerces-c-3.3.0.tar.gz: OK`). If it fails, do not proceed and verify the source package's integrity.
:::

3. Extract, configure, build, test, and install

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

:::note
- The `make` command is run in parallel (`-j$(nproc)`) to leverage all available CPU cores for faster builds. The `nproc` command dynamically retrieves the number of cores.
- During `make check`, failures listed as **XFAIL** (expected failures) are acceptable and do not indicate a problem with the build.
- The output of the commands are saved to timestamped log files for future reference or troubleshooting.
:::

</TabItem>
<TabItem value="ubuntu" label="For Ubuntu 22.04+">

For Ubuntu users:

- The gcc and g++ versions in Ubuntu 22.04+ are sufficient for building Apache Cloudberry.
- We will use the default version of `libxerces-c` available in the Ubuntu repositories, which is compatible with Apache Cloudberry.

```bash
sudo apt install -y bison \
  bzip2 \
  cmake \
  curl \
  flex \
  gcc \
  g++ \
  iproute2 \
  iputils-ping \
  language-pack-en \
  locales \
  libapr1-dev \
  libbz2-dev \
  libcurl4-gnutls-dev \
  libevent-dev \
  libkrb5-dev \
  libipc-run-perl \
  libldap2-dev \
  libpam0g-dev \
  libprotobuf-dev \
  libreadline-dev \
  libssl-dev \
  libuv1-dev \
  liblz4-dev \
  libxerces-c-dev \
  libxml2-dev \
  libyaml-dev \
  libzstd-dev \
  libperl-dev \
  make \
  pkg-config \
  protobuf-compiler \
  python3-dev \
  python3-pip \
  python3-setuptools \
  rsync
```
</TabItem>
</Tabs>