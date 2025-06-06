---
title: Quick Build
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In the following sections, we'll provide detailed, step-by-step instructions for building Apache Cloudberry from source code. However, if you're familiar with the process or prefer a quick start, you can simply copy and paste the commands below to get Apache Cloudberry up and running. 

By this, you will get an Apache Cloudberry environment with a demo cluster ready for testing and development.

<Tabs>
<TabItem value="rocky-linux" label="For Rocky Linux 8+" default>
```bash

# Install sudo & git
dnf install -y sudo git

# Create and configure the gpadmin user
sudo useradd -U -m -s /bin/bash gpadmin
echo 'gpadmin ALL=(ALL) NOPASSWD:ALL' | sudo tee /etc/sudoers.d/90-gpadmin
sudo -u gpadmin sudo whoami # if the output is root, the configuration is correct


# Required configuration for gpadmin user
sudo -u gpadmin bash <<'EOF'
## Add Cloudberry environment setup to .bashrc
echo -e '\n# Add Cloudberry entries
if [ -f /usr/local/cloudberry-db/greenplum_path.sh ]; then
  source /usr/local/cloudberry-db/greenplum_path.sh
fi
## US English with UTF-8 character encoding
export LANG=en_US.UTF-8
' >> /home/gpadmin/.bashrc
## Set up SSH for passwordless access
mkdir -p /home/gpadmin/.ssh
if [ ! -f /home/gpadmin/.ssh/id_rsa ]; then
  ssh-keygen -t rsa -b 2048 -C 'apache-cloudberry-dev' -f /home/gpadmin/.ssh/id_rsa -N ""
fi
cat /home/gpadmin/.ssh/id_rsa.pub >> /home/gpadmin/.ssh/authorized_keys
## Set proper SSH directory permissions
chmod 700 /home/gpadmin/.ssh
chmod 600 /home/gpadmin/.ssh/authorized_keys
chmod 644 /home/gpadmin/.ssh/id_rsa.pub
EOF


# Configure system settings
sudo tee /etc/security/limits.d/90-db-limits.conf << 'EOF'
## Core dump file size limits for gpadmin
gpadmin soft core unlimited
gpadmin hard core unlimited
## Open file limits for gpadmin
gpadmin soft nofile 524288
gpadmin hard nofile 524288
## Process limits for gpadmin
gpadmin soft nproc 131072
gpadmin hard nproc 131072
EOF

# Verify resource limits.
sudo -u gpadmin bash -c "ulimit -a"

# Install required packages
sudo dnf install -y apr-devel \
  bison \
  bzip2-devel \
  cmake3 \
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
  readline-devel \
  rsync \
  wget \
  which \
  zlib-devel

# Enable additional development tools and libraries
## For Rocky Linux 8
sudo dnf install -y --enablerepo=devel libuv-devel libyaml-devel perl-IPC-Run protobuf-devel
## For Rocky Linux 9
sudo dnf install -y --enablerepo=crb libuv-devel libyaml-devel perl-IPC-Run protobuf-devel

# Only for Rocky Linux 8, install the higher version of gcc and gcc-c++
sudo yum install -y gcc-toolset-11-gcc gcc-toolset-11-gcc-c++
scl enable gcc-toolset-11 bash # for temprory use
sudo echo "source /opt/rh/gcc-toolset-11/enable" >> /etc/profile.d/gcc.sh
sudo source /etc/profile.d/gcc.sh #  for permanent use

# Build Xerces-C source code
XERCES_LATEST_RELEASE=3.3.0
XERCES_INSTALL_PREFIX="/usr/local/xerces-c"
wget -nv "https://dlcdn.apache.org//xerces/c/3/sources/xerces-c-${XERCES_LATEST_RELEASE}.tar.gz"
echo "$(curl -sL https://dlcdn.apache.org//xerces/c/3/sources/xerces-c-${XERCES_LATEST_RELEASE}.tar.gz.sha256)" | sha256sum -c -
tar xf "xerces-c-${XERCES_LATEST_RELEASE}.tar.gz"
rm "xerces-c-${XERCES_LATEST_RELEASE}.tar.gz"
cd xerces-c-${XERCES_LATEST_RELEASE}
./configure --prefix="${XERCES_INSTALL_PREFIX}-${XERCES_LATEST_RELEASE}"
make -j$(nproc)
make check
sudo make install
sudo ln -s ${XERCES_INSTALL_PREFIX}-${XERCES_LATEST_RELEASE} ${XERCES_INSTALL_PREFIX}

# Switch to the gpadmin user from now on
sudo su - gpadmin

# Download Source Code
git clone https://github.com/apache/cloudberry.git ~/cloudberry
cd ~/cloudberry
git submodule update --init --recursive

# Prepare the build environment for Apache Cloudberry
sudo rm -rf /usr/local/cloudberry-db
sudo chmod a+w /usr/local
mkdir -p /usr/local/cloudberry-db/lib
sudo cp -v /usr/local/xerces-c/lib/libxerces-c.so \
           /usr/local/xerces-c/lib/libxerces-c-3.*.so \
           /usr/local/cloudberry-db/lib
sudo chown -R gpadmin:gpadmin /usr/local/cloudberry-db

# Run configure
cd ~/cloudberry
export LD_LIBRARY_PATH=/usr/local/cloudberry-db/lib:LD_LIBRARY_PATH
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
            --enable-pax \
            --enable-pxf \
            --enable-tap-tests \
            --with-gssapi \
            --with-ldap \
            --with-libxml \
            --with-lz4 \
            --with-pam \
            --with-perl \
            --with-pgport=5432 \
            --with-python \
            --with-pythonsrc-ext \
            --with-ssl=openssl \
            --with-uuid=e2fs \
            --with-includes=/usr/local/xerces-c/include \
            --with-libraries=/usr/local/cloudberry-db/lib

# Build and install Cloudberry and its contrib modules
make -j$(nproc) -C ~/cloudberry
make -j$(nproc) -C ~/cloudberry/contrib
make install -C ~/cloudberry
make install -C ~/cloudberry/contrib

# Verify the installation
/usr/local/cloudberry-db/bin/postgres --gp-version
/usr/local/cloudberry-db/bin/postgres --version
ldd /usr/local/cloudberry-db/bin/postgres

# Set up a Cloudberry demo cluster
source /usr/local/cloudberry-db/greenplum_path.sh
make create-demo-cluster -C ~/cloudberry
source ~/cloudberry/gpAux/gpdemo/gpdemo-env.sh
psql -P pager=off template1 -c 'SELECT * from gp_segment_configuration'
psql template1 -c 'SELECT version()'
```
</TabItem>
<TabItem value="ubuntu" label="For Ubuntu 22.04+">

```bash

# Install sudo & git
apt update && apt install -y sudo git

# Create and configure the gpadmin user
sudo useradd -U -m -s /bin/bash gpadmin
echo 'gpadmin ALL=(ALL) NOPASSWD:ALL' | sudo tee /etc/sudoers.d/90-gpadmin
sudo -u gpadmin sudo whoami # if the output is root, the configuration is correct

# Required configuration
sudo -u gpadmin bash <<'EOF'
## Add Cloudberry environment setup to .bashrc
echo -e '\n# Add Cloudberry entries
if [ -f /usr/local/cloudberry-db/greenplum_path.sh ]; then
  source /usr/local/cloudberry-db/greenplum_path.sh
fi
## US English with UTF-8 character encoding
export LANG=en_US.UTF-8
' >> /home/gpadmin/.bashrc
## Set up SSH for passwordless access
mkdir -p /home/gpadmin/.ssh
if [ ! -f /home/gpadmin/.ssh/id_rsa ]; then
  ssh-keygen -t rsa -b 2048 -C 'apache-cloudberry-dev' -f /home/gpadmin/.ssh/id_rsa -N ""
fi
cat /home/gpadmin/.ssh/id_rsa.pub >> /home/gpadmin/.ssh/authorized_keys
## Set proper SSH directory permissions
chmod 700 /home/gpadmin/.ssh
chmod 600 /home/gpadmin/.ssh/authorized_keys
chmod 644 /home/gpadmin/.ssh/id_rsa.pub
EOF

# Configure system settings
sudo tee /etc/security/limits.d/90-db-limits.conf << 'EOF'
## Core dump file size limits for gpadmin
gpadmin soft core unlimited
gpadmin hard core unlimited
## Open file limits for gpadmin
gpadmin soft nofile 524288
gpadmin hard nofile 524288
## Process limits for gpadmin
gpadmin soft nproc 131072
gpadmin hard nproc 131072
EOF

# Verify resource limits
sudo -u gpadmin bash -c "ulimit -a"

# Install basic system packages
sudo apt install -y gcc g++ libxml2-dev pkg-config bzip2 libzstd-dev bison python3 flex python3-dev libreadline-dev  libuv1-dev libkrb5-dev libapr1-dev libevent-dev libyaml-dev libssl-dev libpam0g-dev libcurl4-gnutls-dev libbz2-dev libldap2-dev libxerces-c-dev libperl-dev libipc-run-perl make cmake libprotobuf-dev python3-setuptools iproute2 iputils-ping rsync liblz4-dev protobuf-compiler language-pack-en locales

# Use the gpadmin user from now on
sudo su - gpadmin

# Clone the Apache Cloudberry repository
git clone https://github.com/apache/cloudberry.git ~/cloudberry
cd ~/cloudberry
git submodule update --init --recursive

# Prepare the build environment for Apache Cloudberry
sudo rm -rf /usr/local/cloudberry-db
sudo chmod a+w /usr/local
mkdir -p /usr/local/cloudberry-db
sudo chown -R gpadmin:gpadmin /usr/local/cloudberry-db

# Run configure
cd ~/cloudberry
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
            --enable-pax \
            --enable-pxf \
            --enable-tap-tests \
            --with-gssapi \
            --with-ldap \
            --with-libxml \
            --with-lz4 \
            --with-pam \
            --with-perl \
            --with-pgport=5432 \
            --with-python \
            --with-pythonsrc-ext \
            --with-ssl=openssl \
            --with-uuid=e2fs \
            --with-includes=/usr/include/xercesc

# Build and install Cloudberry and its contrib modules
make -j$(nproc) -C ~/cloudberry
make -j$(nproc) -C ~/cloudberry/contrib
make install -C ~/cloudberry
make install -C ~/cloudberry/contrib

# Verify the installation
/usr/local/cloudberry-db/bin/postgres --gp-version
/usr/local/cloudberry-db/bin/postgres --version
ldd /usr/local/cloudberry-db/bin/postgres

# Set up a Cloudberry demo cluster
source /usr/local/cloudberry-db/greenplum_path.sh
make create-demo-cluster -C ~/cloudberry
source ~/cloudberry/gpAux/gpdemo/gpdemo-env.sh
psql -P pager=off template1 -c 'SELECT * from gp_segment_configuration'
psql template1 -c 'SELECT version()'
```
</TabItem>
</Tabs>
