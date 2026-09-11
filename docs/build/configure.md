---
title: "Configure Apache Cloudberry Build"
source: https://cloudberry.apache.org/docs/build/configure
---

# Configure Apache Cloudberry Build

## Pre-stage the Python packages for `--with-pythonsrc-ext`

:::note
This step is only required starting from Apache Cloudberry 2.2.
:::

The Python source packages used by `--with-pythonsrc-ext` are not bundled in the repository. They have been removed since Apache Cloudberry 2.0 to comply with the Apache release policy, and used to be downloaded on the fly during the build. Starting from Apache Cloudberry 2.2, they are downloaded ahead of the build instead, so pre-stage them before you run `configure`.

Building PyYAML requires Cython earlier than 3.0. On Ubuntu, install the matching distribution package first:

```bash
# For Ubuntu 22.04, cython3 is 0.29.x
sudo apt install -y cython3

# For Ubuntu 24.04, cython3 is 3.x and cannot build PyYAML, so use cython3-legacy instead
sudo apt install -y cython3-legacy
```

On Rocky Linux 8 and 9, `python3-Cython` has already been installed in [Install required packages](./install-required-packages). On Rocky Linux 10, the distribution only ships Cython 3.x, so the following command installs a compatible version through `pip3` for you.

Then download the packages:

```bash
cd ~/cloudberry
make -C gpMgmt/bin download-python-deps
```

##  Configure the build process

**For Rocky Linux 8+**

### Prepare environment

The build process requires the necessary libraries (e.g., Xerces-C) to be available at the expected locations for configuration and runtime. Prepare the environment using the following commands:

```bash
sudo rm -rf /usr/local/cloudberry-db
sudo chmod a+w /usr/local
mkdir -p /usr/local/cloudberry-db/lib
sudo cp -v /usr/local/xerces-c/lib/libxerces-c.so \
           /usr/local/xerces-c/lib/libxerces-c-3.*.so \
           /usr/local/cloudberry-db/lib
sudo chown -R gpadmin:gpadmin /usr/local/cloudberry-db
```

### Run `configure`

The `configure` command sets up the build environment for Apache Cloudberry. This configuration includes several development features and extensions.

:::note
Starting from Apache Cloudberry 2.2, new extensions are available, including `diskquota`, `gp_stats_collector`, and `yezzey`. Use the corresponding `configure` options to enable them.
:::

**Cloudberry 2.2**

```bash
cd ~/cloudberry
export LD_LIBRARY_PATH=/usr/local/cloudberry-db/lib:${LD_LIBRARY_PATH:-""}
./configure --prefix=/usr/local/cloudberry-db \
            --disable-external-fts \
            --enable-gpcloud \
            --enable-ic-proxy \
            --enable-mapreduce \
            --enable-orafce \
            --enable-orca \
            --enable-pax \
            --disable-pxf \
            --enable-tap-tests \
            --with-diskquota \
            --with-gp-stats-collector \
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
            --with-yezzey \
            --with-includes=/usr/local/xerces-c/include \
            --with-libraries=/usr/local/cloudberry-db/lib
```
**Cloudberry 2.0/2.1**

```bash
cd ~/cloudberry
export LD_LIBRARY_PATH=/usr/local/cloudberry-db/lib:${LD_LIBRARY_PATH:-""}
./configure --prefix=/usr/local/cloudberry-db \
            --disable-external-fts \
            --enable-gpcloud \
            --enable-ic-proxy \
            --enable-mapreduce \
            --enable-orafce \
            --enable-orca \
            --enable-pax \
            --disable-pxf \
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
```
**For Ubuntu 22.04+**

### Prepare environment

Prepare the environment using the following commands:

```bash
sudo rm -rf /usr/local/cloudberry-db
sudo chmod a+w /usr/local
mkdir -p /usr/local/cloudberry-db
sudo chown -R gpadmin:gpadmin /usr/local/cloudberry-db
```

### Run `configure`

The `configure` command sets up the build environment for Apache Cloudberry. This configuration includes several development features and extensions.

:::note
Starting from Apache Cloudberry 2.2, new extensions are available, including `diskquota`, `gp_stats_collector`, and `yezzey`. Use the corresponding `configure` options to enable them.
:::

**Cloudberry 2.2**

```bash
cd ~/cloudberry
./configure --prefix=/usr/local/cloudberry-db \
            --disable-external-fts \
            --enable-gpcloud \
            --enable-ic-proxy \
            --enable-mapreduce \
            --enable-orafce \
            --enable-orca \
            --enable-pax \
            --disable-pxf \
            --enable-tap-tests \
            --with-diskquota \
            --with-gp-stats-collector \
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
            --with-yezzey \
            --with-includes=/usr/include/xercesc
```
**Cloudberry 2.0/2.1**

```bash
cd ~/cloudberry
./configure --prefix=/usr/local/cloudberry-db \
            --disable-external-fts \
            --enable-gpcloud \
            --enable-ic-proxy \
            --enable-mapreduce \
            --enable-orafce \
            --enable-orca \
            --enable-pax \
            --disable-pxf \
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
```

## `configure` options

The `configure` script is used to prepare the build environment for Apache Cloudberry. It checks for required libraries and sets up the necessary configuration options. 

You can run `./configure --help` to see a full list of options available for configuring Apache Cloudberry. Below is a list of commonly used options with their descriptions and notes. 

:::note
The build dependencies vary based on which features you enable or disable during configuration. While we've listed the basic required packages in the [previous section](./install-required-packages), you may need additional packages depending on your configuration choices. When you run the `./configure` command, it will check and report any missing dependencies that you'll need to install before proceeding with the build.

Also, some packages names vary between different Linux distributions.
:::

| Option |	Description | Notes |
|--|--|--|
| `--prefix=PREFIX` |Installation directory. `/usr/local/cbdb` is the default value. `make install` will install all the files in `/usr/local/cbdb/bin`, `/usr/local/cbdb/lib` etc. | You can specify an installation prefix other than `/usr/local/cbdb` using `--prefix`. In this guide, we use `/usr/local/cloudberry-db` as the installation directory. |
| `--disable-gpfdist` |      Do not use gpfdist | Enable gpfdist by default. This requires apr lib and libevent to be installed.|
| `--disable-pxf`    |       Do not build PXF. | Enable PXF by default. PXF is a query federation engine that accesses data residing in external systems such as Hadoop, Hive, HBase, relational databases, S3, Google Cloud Storage, among other external systems. Now the [cloudberry-pxf](https://github.com/apache/cloudberry-pxf/tree/main/fdw) will be kept as the latest version of `pxf_fdw`.|
| `--enable-orafce`  | Build with Oracle compatibility functions.  |   |
| `--enable-debug`          | Build all programs and libraries with debugging symbols.| This means that you can run the programs in a debugger to analyze problems. This enlarges the size of the installed executables considerably, and on non-GCC compilers it usually also disables compiler optimization, causing slowdowns. However, having the symbols available is extremely helpful for dealing with any problems that might arise. Currently, this option is recommended for production installations only if you use GCC. But you should always have it on if you are doing development work or running a beta version.|
|  `--enable-profiling`     | Build with profiling enabled.|This option is for use only with GCC and when doing development work.|
|  `--enable-tap-tests`     | Enable tests using the Perl TAP tools. | This requires `Perl` and Perl module `IPC::Run` to be installed.|
|  `--enable-cassert`       | Enable assertion checks (for debugging)|Enables assertion checks in the server, which test for many “cannot happen” conditions. This is invaluable for code development purposes, but the tests can slow down the server significantly. This option is not recommended for production use, but you should have it on for development work or when running a beta version.|
|  `--disable-orca`         | Disable ORCA optimizer|ORCA is enabled by default. ORCA requires xerces-c library to be installed.|
|  `--enable-mapreduce`     | Enable Cloudberry Mapreduce support| This requires libyaml to be installed.|
|  `--enable-gpcloud`       | Enable gpcloud support||
|  `--enable-external-fts`  | Enable external fts support||
|  `--enable-ic-proxy`      | Enable interconnect proxy mode | This requires libuv library to be installed. |
|  `--enable-pax`          | Enable PAX support | gcc/gcc-c++ 11+, cmake3, protobuf and ZSTD are required, see details [here](https://github.com/apache/cloudberry/blob/main/contrib/pax_storage/doc/README.md#build). |
|  `--with-includes=DIRS`   | Look for additional header files in DIRS|The Xerces-C is required to build with ORCA.|
|  `--with-libraries=DIRS`  | Look for additional libraries in DIRS|The library xerces-c is required to build with ORCA|
|  `--with-pgport=PORTNUM`  | Set default port number [5432]| `--with-pgport=5432` is used in this guide.|
|  `--with-llvm`           | Build with LLVM based JIT support|This requires the LLVM library to be installed.|
|  `--with-icu`             | Build with ICU support  | This requires the ICU4C package to be installed. |
|  `--with-perl`            | Build Perl modules (PL/Perl)|This requires Perl devel packages to be installed.|
|  `--with-python`          | Build Python modules (PL/Python)|This requires Python3 devel packages to be installed.|
|  `--with-pythonsrc-ext`   | Build Python modules for gpMgmt|Recommended options. It's used for gpMgmt tools. This option requires `curl`, `python3`, and `python3-pip` to be installed; `curl` is used for downloading the needed Python3 packages, and `python3-pip` is used for installing the Python packages for building PyYaml. If you don't build with this option, after installing Cloudberry you will need to install the specific Python packages from the Linux distros: `psutil`, `pygresql`, `pyyaml`, or run the command at the top directory `pip3 install -r python-dependencies.txt`.|
|  `--with-gssapi`          | Build with GSSAPI support|The GSSAPI system is usually a part of the Kerberos installation, so this requires the krb5 package to be installed.|
|  `--with-pam`             | Build with PAM (Pluggable Authentication Modules) support.|This requires the PAM package to be installed.|
|  `--with-ldap`            | Build with LDAP support for authentication and connection parameter lookup.|This requires the OpenLDAP package to be installed.|
|  `--with-uuid=LIB`        | Build contrib/uuid-ossp module using LIB (bsd,e2fs,ossp).| <ul><li>`bsd` to use the UUID functions found in FreeBSD and some other BSD-derived systems</li><li>`e2fs` to use the UUID library created by the e2fsprogs project; this library is present in most Linux systems and in macOS, and can be obtained for other platforms as well</li><li>`ossp` to use the OSSP UUID library</li></ul> So we use `--with-uuid=e2fs` in the build under Linux/macOS - this requires the uuid library to be installed.|
|  `--with-libxml`          | Build with libxml2, enabling SQL/XML support.|This requires libxml2 to be installed.|
|  `--with-lz4`             | Build with LZ4 compression support |This allows the use of LZ4 for compression of table data and lz4 library is required to be installed.|
|  `--with-ssl=LIB`         | Build with support for SSL (encrypted) connections. | The only LIBRARY supported is openssl, so `--with-ssl=openssl` is used in this guide. This requires the OpenSSL package to be installed. |
|  `--with-diskquota`       | Build with diskquota extension. | Diskquota is an extension that provides disk usage enforcement for database objects in Apache Cloudberry. **Since Cloudberry 2.2**|
|  `--with-gp-stats-collector`      | Build with stats collector extension. | An extension for collecting query execution metrics and reporting them to an external agent. **Since Cloudberry 2.2**|
|  `--with-yezzey`       | Build with Yezzey extension. | Yezzey is an extension for offloading data from Cloudberry to S3-compatible external storage. This option builds the extension only. You do not need a proxy if there are only a few requests to S3, but many parallel data exchange streams can exhaust CPU and network on the cluster host. For better performance under heavy traffic, additionally deploy [YProxy](https://github.com/open-gpdb/yproxy), which pools connections to S3 and schedules the requests. **Since Cloudberry 2.2**|
