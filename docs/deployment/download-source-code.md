---
title: Download Source Code
---

## Use the `gpadmin` user from now on

From here on out we execute commands as the `gpadmin` user:

```bash
sudo su - gpadmin
```

## Clone the Apache Cloudberry repository (main branch)

Clone the source code for Apache Cloudberry into the `gpadmin` user's home directory:

```bash
git clone https://github.com/apache/cloudberry.git ~/cloudberry
cd ~/cloudberry
git submodule update --init --recursive
```

:::note
The command `git submodule update --init --recursive` is used to initialize submodules for building with PAX support in this guide. If you don't plan to build with PAX support, you can skip this step.
:::

:::caution

In the Ubuntu container, you may encounter the following error when clone the source code:

```
error: git-remote-https died of signal 4
```

You can set the following environment variable to avoid this error:

```bash
export GNUTLS_CPUID_OVERRIDE=0x1
```
:::

## Download the source code archive

Alternatively, you can download the source code archive from the [Apache Cloudberry releases page](/releases).

```bash
tar xvzf apache-cloudberry-2.0.0-incubating-src.tar.gz
cd apache-cloudberry-<version>-incubating
```

:::note
The submodules are already included in the latest release source code archive, so you don't need to download the submodules manually after extracting the archive.
:::

:::caution
If you download the [main branch source code archive](https://github.com/apache/cloudberry/archive/refs/heads/main.zip) from the GitHub, there is no submodules included in the archive. Also, you cannot use `git submodule update --init --recursive` to initialize submodules for building with PAX support in this case. After unarchiving the main branch source code archive, you need to download the submodules manually at the root directory of the source code:

```bash
git clone https://github.com/google/googletest.git contrib/pax_storage/src/cpp/contrib/googletest
git clone https://github.com/p-ranav/tabulate.git contrib/pax_storage/src/cpp/contrib/tabulate
git clone https://github.com/google/benchmark.git contrib/pax_storage/src/cpp/contrib/googlebench
git clone https://github.com/coolxv/cpp-stub.git contrib/pax_storage/src/cpp/contrib/cpp-stub
git clone https://github.com/ibireme/yyjson.git dependency/yyjson
```
:::