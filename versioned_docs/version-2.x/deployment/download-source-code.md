---
title: Download Source Code
---

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
git checkout tags/2.0.0-incubating
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
mv apache-cloudberry-2.0.0-incubating cloudberry
```

:::note
The submodules are already included in the latest 2.0.0 release source code archive, so you don't need to download the submodules manually after extracting the archive.
:::