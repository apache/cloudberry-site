---
title: "Download Source Code"
source: https://cloudberry.apache.org/docs/build/download-source-code
---

# Download Source Code

## Use the `gpadmin` user from now on

From here on out we execute commands as the `gpadmin` user:

```bash
sudo su - gpadmin
```

## Clone the Apache Cloudberry repository (2.x branch)

Clone the release source code for Apache Cloudberry into the `gpadmin` user's home directory:

```bash
git clone https://github.com/apache/cloudberry.git ~/cloudberry
cd ~/cloudberry
git fetch --tags

# For Apache Cloudberry 2.2.0
git checkout tags/2.2.0-incubating

# For Apache Cloudberry 2.1.0
git checkout tags/2.1.0-incubating

# For Apache Cloudberry 2.0.0
git checkout tags/2.0.0-incubating

git submodule update --init --recursive
```

:::note
The command `git submodule update --init --recursive` initializes the submodules that the build depends on. In Apache Cloudberry 2.0 and 2.1, these are only needed for building with PAX support, so you can skip this step if you don't plan to enable PAX. Starting from Apache Cloudberry 2.2, other components are shipped as submodules too, such as `gpcontrib/yezzey` for `--with-yezzey`, so run this command unless you are sure you need none of them.
:::

:::caution

In the Ubuntu container, you may encounter the following error when cloning the source code: `error: git-remote-https died of signal 4`.

You can set the following environment variable to avoid this error: `export GNUTLS_CPUID_OVERRIDE=0x1`.

:::

## Download the source code archive

Alternatively, you can download the source code archive from the [Apache Cloudberry releases page](/releases).

- For Apache Cloudberry 2.2.0

```bash
tar xvzf apache-cloudberry-2.2.0-incubating-src.tar.gz
mv apache-cloudberry-2.2.0-incubating cloudberry
```

- For Apache Cloudberry 2.1.0

```bash
tar xvzf apache-cloudberry-2.1.0-incubating-src.tar.gz
mv apache-cloudberry-2.1.0-incubating cloudberry
```

- For Apache Cloudberry 2.0.0

```bash
tar xvzf apache-cloudberry-2.0.0-incubating-src.tar.gz
mv apache-cloudberry-2.0.0-incubating cloudberry
```

:::note
The submodules are already included in the latest 2.x.0 release source code archive, so you don't need to download the submodules manually after extracting the archive.
:::
