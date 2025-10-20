---
title: Build with Docker Dev Image
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide provides instructions for building Apache Cloudberry using a Docker-based development environment. This method is particularly useful for ensuring a consistent build environment across different systems and for saving setup time.

## Prerequisites

- Docker: Ensure you have Docker installed on your system. You can download and install Docker from the official website: [Docker](https://www.docker.com/get-started).
- Harddisk space: Ensure you have at least 10 GB of free disk space available for the Docker image and build artifacts.

## Run the Docker Dev Image

Run the following command to start a Docker container with the Apache Cloudberry development image:

<Tabs>
<TabItem value="rocky-linux-8" label="Rocky Linux 8" default>
```bash
docker run --name cbdb-dev -it --rm -h cdw --shm-size=2gb apache/incubator-cloudberry:cbdb-build-rocky8-latest
```
</TabItem>
<TabItem value="rocky-linux-9" label="Rocky Linux 9">
```bash
docker run --name cbdb-dev -it --rm -h cdw --shm-size=2gb apache/incubator-cloudberry:cbdb-build-rocky9-latest
```
</TabItem>
<TabItem value="ubuntu-22" label="Ubuntu 22.04">
```bash
docker run --name cbdb-dev -it --rm -h cdw --shm-size=2gb apache/incubator-cloudberry:cbdb-build-ubuntu22.04-latest
```
</TabItem>
</Tabs>

Explaination:
- `--name=cbdb-dev` will set the name of the container to `cbdb-dev`. You can change it to any name you prefer.
- `-it` will run the container in interactive mode, allowing you to execute commands inside it.
- `--rm` will remove the container after you exit it. If you want to keep the container for further use, you can remove this option.
- `-h cdw` will set the hostname of the container to `cdw` (Coordinator Data Warehouse).
- `--shm-size=2gb` is used to set the container's shared memory for test suites run successfully. Test failures can occur when the Cloudberry cluster lacks sufficient shared memory resources, then you may need to increase the container's shared memory using this option.

This development environment has done the following things for you:
- Created a user named `gpadmin` with the necessary permissions.
- Set up the environment variables and paths.
- Configured the specific system resource limits.
- Installed the necessary dependencies.

Then you will be inside the Docker container with the Apache Cloudberry development environment ready to use. Before you go on, you need to make sure you have login the docker container as the `gpadmin` user like this:

```
======================================================================

                          ++++++++++       ++++++
                        ++++++++++++++   +++++++
                       ++++        +++++ ++++
                      ++++          +++++++++
                   =+====         =============+
                 ========       =====+      =====
                ====  ====     ====           ====
               ====    ===     ===             ====
               ====            === ===         ====
               ====            ===  ==--       ===
                =====          ===== --       ====
                 =====================     ======
                   ============================
                                     =-----=
     ____  _                    _  _
    / ___|| |  ___   _   _   __| || |__    ___  _ __  _ __  _   _
   | |    | | / _ \ | | | | / _` || '_ \  / _ \| '__|| '__|| | | |
   | |___ | || (_) || |_| || (_| || |_) ||  __/| |   | |   | |_| |
    \____||_| \____  \__,_| \__,_||_.__/  \___||_|   |_|    \__, |
                                                            |___/
----------------------------------------------------------------------

Welcome to the Apache Cloudberry Build Environment!

Container OS ........ : Rocky Linux 9.5 (Blue Onyx)
User ................ : gpadmin
Container hostname .. : cdw
IP Address .......... : 170.17.0.1
CPU Info ............ : Intel(R) Xeon(R) Gold 6151 CPU @ 3.00GHz
CPU(s) .............. : 8
Memory .............. : 15Gi total
======================================================================

[gpadmin@cdw ~]$
```

## What's next?

You can now proceed with the following steps to build and install Apache Cloudberry:

- [Download the source code](./download-source-code.md)
- [Configure Apache Cloudberry Build](./configure.md)
- [Build and Install Apache Cloudberry and contrib extensions](./build-and-install.md)
- [Set up a Cloudberry Demo Cluster](./set-demo-cluster.md) (start with the step `Set up Cloudberry environment variables`) 
- [Post installation](./post-installation.md)

Or just running the following command more quickly:

```bash
## Download the source code
git clone --recurse-submodules --branch main --single-branch --depth=1 https://github.com/apache/cloudberry.git

## Change directory
cd /home/gpadmin/cloudberry

## Set up the SRC_DIR environment variable and create a directory for build logs
export SRC_DIR=/home/gpadmin/cloudberry
mkdir -p ${SRC_DIR}/build-logs

## Configure, build, and install Cloudberry
./devops/build/automation/cloudberry/scripts/configure-cloudberry.sh
./devops/build/automation/cloudberry/scripts/build-cloudberry.sh

## Set up a Cloudberry Demo Cluster
./devops/build/automation/cloudberry/scripts/create-cloudberry-demo-cluster.sh

## Start a Cloudberry Demo Cluster
source /usr/local/cloudberry-db/cloudberry-env.sh
source /home/gpadmin/cloudberry/gpAux/gpdemo/gpdemo-env.sh
psql -p 7000 postgres
```