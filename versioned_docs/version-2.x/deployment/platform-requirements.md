---
title: Platform Requirements
---

This topic describes the Apache Cloudberry platform and operating system software requirements for deploying the software to on-premise hardware, or to public cloud services such as AWS, GCP, or Azure.

## Hardware requirements

### Supported deployment environments

Apache Cloudberry supports deployment on both physical machines and virtual machines. Below are the recommended configurations for the environments.

#### For development or test environments

| Component    | CPU  | Memory | Disk type | Network                 | Number of instances |
| ------- | ---- | ---- | -------- | -------------------- | -------- |
| Coordinator  | 4 cores | 8 GB | SSD      | 10 Gbps NIC (2 preferred) | 1+       |
| Segment | 4 cores | 8 GB | SSD      | 10 Gbps NIC (2 preferred) | 1+       |

#### For production environments

| Component    | CPU    | Memory   | Disk type | Network                 | Instance count |
| ------- | ------ | ------ | -------- | -------------------- | -------- |
| Coordinator  | 16+ cores | 32+ GB | SSD      | 10 Gbps NIC (2 preferred) | 2+       |
| Segment | 8+ cores  | 32+ GB | SSD      | 10 Gbps NIC (2 preferred) | 2+       |

Apache Cloudberry can also be deployed on public cloud platforms such as AWS, Azure, and GCP. The hardware requirements for cloud-based deployments might vary based on the instance types selected on these platforms. Refer to the specific cloud provider’s documentation for instance configurations that meet or exceed the recommended hardware specifications.

#### Minimum hardware requirements

The following lists minimum recommended specifications for hardware servers intended to support Apache Cloudberry on Linux systems in a production environment. All host servers in your Apache Cloudberry system must have the same hardware and software configuration. Apache Cloudberry also provides hardware build guides for its certified hardware platforms. Work with a Cloudberry Systems Engineer to review your anticipated environment to ensure an appropriate hardware configuration for Apache Cloudberry.

- Minimum CPU: Any x86_64/AARCH64 compatible CPU
- Minimum Memory: 16 GB RAM per server
- Disk Space Requirements:
  - 150MB per host for Cloudberry installation
  - Approximately 300MB per segment instance for metadata
  - Cap disk capacity at 70% full to accommodate temporary files and prevent performance degradation
- Network Requirements: 10 Gigabit Ethernet within the array; NIC bonding is recommended when multiple interfaces are present Apache Cloudberry can use either IPV4 or IPV6 protocols.

**Hyperthreading**

Resource Groups - one of the key Apache Cloudberry features - can control transaction concurrency, CPU and memory resources, workload isolation, and dynamic bursting. 

When using resource groups to control resource allocation on Intel based systems, consider switching off Hyper-Threading (HT) in the server BIOS (for Intel cores the default is ON). Switching off HT might cause a small throughput reduction (less than 15%), but can achieve greater isolation between resource groups, and higher query performance with lower concurrency workloads.

### CPU architecture support

Apache Cloudberry supports running on both **x86_64** and **ARM (AARCH64)** CPU architectures, making it suitable for a wide range of hardware platforms including cloud instances and ARM-based servers.

| Architecture | Source Build | Convenience binaries |
|---|---|---|
| x86_64 | Supported | Available (2.1+) |
| ARM (AARCH64) | Supported | Planned for 2.2 |

For ARM-based deployments in the current release, you can [build Apache Cloudberry from source](../build/index.md).

### Storage

- To prevent a high data disk load from affecting the operating system's normal I/O response, mount the operating system and the data disk on separate disks.
- If the host configuration allows, it is recommended to use 2 independent SAS disks as the system disk (RAID1), and another 10 SAS disks as the data disk (RAID5).
- It is recommended to use LVM logical volumes to manage disks for more flexible disk configuration.

**For the system disk**: The system disk should use an independent disk to avoid impact on the operating system when data disks are heavily loaded. It is recommended that the system disk be configured in dual-disk RAID 1 and the operating system of the system disk be XFS.

**For data disks**: It is recommended to use LVM to manage data disks. According to test statistics, creating an independent logical volume for each physical volume can achieve the best disk performance. For example:

```bash
pvcreate /dev/vdb
pvcreate /dev/vdc
pvcreate /dev/vdd
vgcreate data /dev/vdb /dev/vdc /dev/vdd
lvcreate --extents 100%pvs -n data0 data /dev/vdb
lvcreate --extents 100%pvs -n data1 data /dev/vdc
lvcreate --extents 100%pvs -n data2 data /dev/vdd 
```

The names of mount points must be consecutive, and the mount points of data disks should be `/data0`, `/data1`, ..., `/dataN`. Data disks should use the XFS file format. For example:

```bash
mkdir -p /data0 /data1 /data2
mkfs.xfs /dev/data/data0
mkfs.xfs /dev/data/data1
mkfs.xfs /dev/data/data2
mount /dev/data/data0 /data0/
mount /dev/data/data1 /data1/
mount /dev/data/data2 /data2/ 
```

## Data exchange network

- **Network card configuration**

    The data exchange network is used for transmitting business data, which has high requirements on network performance and throughput. In a production environment, two 10 Gbps NICs are generally required, and they will be used after bonding. The recommended bond 4 parameter are as follows:

    ```bash
    BONDING_OPTS='mode=4 miimon=100 xmit_hash_policy=layer3+4'
    ```

- **Connectivity requirements**

    - Connect the management console and the database host in the data exchange network. If there is a firewall device between the management console and the database host, ensure that the TCP idle connection can be kept for more than 12 hours.
    - Connect database hosts and management console hosts in the data exchange network, and do not limit the TCP idle connection time.
    - Connect database clients and application programs that access the database with the database coordinator node in the data exchange network.
    - Ensure that the TCP idle connection can be kept for more than 12 hours.

- **Default gateway**

    If the host is configured with a management network, the network card (bond0) of the data exchange network should be used as the default gateway device; otherwise, it might cause abnormal traffic monitoring of the host network, deployment failure, and performance problems. The following is an example of viewing the default gateway.

    ```bash
    netstat -rn | grep ^0.0.0.0
    ```

- **Switch**

    - Make sure that the egress bandwidth of the data network switch from layer 1 to layer 2 is no lower than the maximum disk I/O throughput capacity of a single cabinet (calculated with a single RAID card of 500 MBps).
    - A switch convergence ratio of 4:1 is recommended. When the convergence ratio reaches 6:1, most links will be saturated. Significant packet loss occurs when the convergence ratio reaches 8:1.

## Software requirements

### Supported OS

Apache Cloudberry supports the following operating systems:

- Rocky Linux 8/9
- Ubuntu 22.04
- RHEL 8/9 and compatible distributions (Oracle Linux, AlmaLinux, etc.)

### Software dependencies

The following runtime packages are required on all Apache Cloudberry hosts. These dependencies are automatically resolved when installing via `dnf` (RPM) or `apt` (DEB), but are listed here for reference.

#### Common dependencies (all platforms)

```
bash, openssh, rsync, perl, python3, less, hostname, iproute / iproute2, iputils / iputils-ping, which / debianutils
```

#### For Rocky Linux / RHEL 8

```
apr, audit, bash, bzip2, hostname, iproute, iputils, keyutils,
less, libcurl, libevent, libidn2, libselinux, libstdc++, libuuid,
libuv, libxml2, libyaml, libzstd, lz4, openldap, openssh,
openssh-clients, openssh-server, openssl, pam, perl, python3,
readline, rsync, which
```

#### For Rocky Linux / RHEL 9

```
apr, bash, bzip2, glibc, hostname, iproute, iputils, keyutils,
less, libcap, libcurl, libidn2, libpsl, libssh, libstdc++,
libxml2, libyaml, libzstd, lz4, openldap, openssh,
openssh-clients, openssh-server, openssl, pam, pcre2, perl,
python3, readline, rsync, which, xz
```

#### For Ubuntu 22.04

```
curl, cgroup-tools, debianutils, hostname, iputils-ping, iproute2,
keyutils, krb5-multidev, less, libapr1, libbz2-1.0, libcurl4,
libcurl3-gnutls, libevent-2.1-7, libreadline8, libxml2, libyaml-0-2,
libldap-2.5-0, libzstd1, libcgroup1, libssl3, libpam0g, libprotobuf23,
libpsl5, libuv1, liburing2, libxerces-c3.2, locales, lsof, lz4,
net-tools, openssh-client, openssh-server, openssl, python3, rsync,
wget, xz-utils, zlib1g
```

### Java 

Apache Cloudberry supports these Java versions for PL/Java and PXF:

-   Open JDK 8 or Open JDK 11, 17, available from [AdoptOpenJDK](https://adoptopenjdk.net)
-   Oracle JDK 8 or Oracle JDK 11, 17

### File system

XFS is the required file system for data storage on Apache Cloudberry hosts. 

Apache Cloudberry is supported on network or shared storage if the shared storage is presented as a block device to the servers running Apache Cloudberry and the XFS file system is mounted on the block device. Network file systems are not supported. When using network or shared storage, Apache Cloudberry mirroring must be used in the same way as with local storage, and no modifications may be made to the mirroring scheme or the recovery scheme of the segments.

Apache Cloudberry can be deployed to virtualized systems only if the storage is presented as block devices and the XFS file system is mounted for the storage of the segment directories.

Apache Cloudberry is supported on Amazon Web Services (AWS) servers using either Amazon instance store (Amazon uses the volume names ephemeral[0-23]) or Amazon Elastic Block Store (Amazon EBS) storage. If using Amazon EBS storage the storage should be RAID of Amazon EBS volumes and mounted with the XFS file system for it to be a supported configuration.

### SSH configuration

The recommended configuration for the SSH server side (`/etc/ssh/sshd_config`) is as follows. After the configuration is complete, run `systemctl restart sshd.service` to make it effective.

| Parameter                   | Value   | Description             |
| ---------------------- | ---- | ---------------- |
| Port                   | 22   | Listening port.         |
| PasswordAuthentication | yes  | Allows password login, which can be changed after cluster initialization.   |
| PermitEmptyPasswords   | no   | Empty password is not allowed for login. |
| UseDNS                 | no   | DNS is not used.     |
