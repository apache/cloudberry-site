---
title: Configure Apache Cloudberry Build
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

##  Configure the build process

<Tabs>
<TabItem value="rocky-linux" label="For Rocky Linux 8+" default>

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

```bash
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
```
</TabItem>
<TabItem value="ubuntu-linux" label="For Ubuntu 20.04+" default>

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

```bash
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
```
</TabItem>
</Tabs>

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
| `--disable-pxf`    |       Do not build PXF. | Enable PXF by default. |PXF is a query federation engine that accesses data residing in external systems such as Hadoop, Hive, HBase, relational databases, S3, Google Cloud Storage, among other external systems.|
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
