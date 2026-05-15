---
title: Configuring Your Systems
---

Describes how to prepare your operating system environment for Apache Cloudberry software installation. Before deploying Apache Cloudberry on physical or virtual machines, you need to do some preparations. Read this document and [Software and Hardware Configuration Requirements](./platform-requirements.md) before you start to deploy Apache Cloudberry.

Perform the following tasks in order:

1. Make sure your host systems meet the requirements described in [Software and Hardware Configuration Requirements](./platform-requirements.md).
2. [Deactivate or configure SELinux.](#deactivate-or-configure-selinux)
3. [Deactivate or configure firewall software.](#deactivate-or-configure-firewall-software)
4. [Set the required operating system parameters.](#recommended-os-parameters-settings)
5. [Synchronize system clocks.](#synchronizing-system-clocks)
6. [Create the gpadmin account.](#creating-the-cloudberry-administrative-user)

Unless noted, these tasks should be performed for *all* hosts in your Apache Cloudberry array (coordinator, standby coordinator, and segment hosts).

The Apache Cloudberry host naming convention for the coordinator host is `cdw` and for the standby coordinator host is `scdw`. 

The segment host naming convention is `sdwN` where `sdw` is a prefix and `N` is an integer. For example, segment host names would be `sdw1`, `sdw2` and so on. NIC bonding is recommended for hosts with multiple interfaces, but when the interfaces are not bonded, the convention is to append a dash (`-`) and number to the host name. For example, `sdw1-1` and `sdw1-2` are the two interface names for host `sdw1`.

:::important
When data loss is not acceptable for an Apache Cloudberry cluster, coordinator and segment mirroring is recommended. If mirroring is not enabled then Apache Cloudberry stores only one copy of the data, so the underlying storage media provides the only guarantee for data availability and correctness in the event of a hardware failure.
:::

## Deactivate or configure SELinux

For all Apache Cloudberry host systems running RHEL/Oracle/Rocky Linux, SELinux must either be `Disabled` or configured to allow unconfined access to Apache Cloudberry processes, directories, and the `gpadmin` user.

If you choose to deactivate SELinux:

1. As the root user, check the status of SELinux:

    ```bash
    # sestatus

    SELinuxstatus: disabled
    ```

2. If SELinux is not deactivated, deactivate it by editing the `/etc/selinux/config` file. As root, change the value of the `SELINUX` parameter in the `config` file as follows:

    ```bash
    SELINUX=disabled
    ```

3. If the System Security Services Daemon (SSSD) is installed on your systems, edit the SSSD configuration file and set the `selinux_provider` parameter to `none` to prevent SELinux-related SSH authentication denials that could occur even with SELinux deactivated. As root, edit `/etc/sssd/sssd.conf` and add this parameter:

    ```
    selinux_provider=none
    ```

4. Reboot the system to apply any changes that you made and verify that SELinux is deactivated.

If you choose to enable SELinux in `Enforcing` mode, then Apache Cloudberry processes and users can operate successfully in the default `Unconfined` context. If you require increased SELinux confinement for Apache Cloudberry processes and users, you must test your configuration to ensure that there are no functionality or performance impacts to Apache Cloudberry.

## Deactivate or configure firewall software

You should also deactivate firewall software such as `firewalld` (on RHEL systems) or `ufw` (on Ubuntu systems, deactivated by default). If firewall software is not deactivated, you must instead configure your software to allow required communication between Apache Cloudberry hosts.

1. Check the status of `firewalld` with the command:

    ```bash
    # systemctl status firewalld
    ```

    If `firewalld` is deactivated, the command output is:

    ```
    * firewalld.service - firewalld - dynamic firewall daemon
       Loaded: loaded (/usr/lib/systemd/system/firewalld.service; disabled; vendor preset: enabled)
       Active: inactive (dead)
    ```

2. If necessary, run these commands as root to deactivate `firewalld`:

    ```bash
    # systemctl stop firewalld.service
    # systemctl disable firewalld.service
    ```

See the documentation for the firewall or your operating system for additional information.

## Recommended OS parameters settings

Apache Cloudberry requires that certain Linux operating system (OS) parameters be set on all hosts in your Apache Cloudberry system (coordinators and segments).

In general, the following categories of system parameters need to be altered:

- **Shared Memory** - An Apache Cloudberry instance will not work unless the shared memory segment for your kernel is properly sized. Most default OS installations have the shared memory values set too low for Apache Cloudberry. On Linux systems, you must also deactivate the OOM (out of memory) killer.
- **Network** - On high-volume Apache Cloudberry systems, certain network-related tuning parameters must be set to optimize network connections made by the Cloudberry interconnect.
- **User Limits** - User limits control the resources available to processes started by a user's shell. Apache Cloudberry requires a higher limit on the allowed number of file descriptors that a single process can have open. The default settings may cause some Apache Cloudberry queries to fail because they will run out of file descriptors needed to process the query.

More specifically, you need to edit the following Linux configuration settings:

- [The hosts file](#the-hosts-file)
- [The sysctl.conf file](#the-sysctlconf-file)
- [System resources limits](#system-resources-limits)
- [Core dump](#core-dump)
- [XFS mount options](#xfs-mount-options)
- [Disk I/O settings](#disk-io-settings)
- [Networking](#networking)
- [Transparent Huge Pages (THP)](#transparent-huge-pages-thp)
- [IPC object removal](#ipc-object-removal)
- [SSH connection threshold](#ssh-connection-threshold)

### The hosts file

Edit the `/etc/hosts` file and make sure that it includes the host names and all interface address names for every machine participating in your Apache Cloudberry system.

First, use the `hostnamectl` command to set the hostname on each host. The hostname should only include letters, numbers, and the hyphen (`-`). It is recommended to use all lowercase letters. Each hostname must be globally unique across all hosts. For example:

```bash
# Run on each host respectively
hostnamectl set-hostname cdw    # on coordinator
hostnamectl set-hostname scdw   # on standby coordinator
hostnamectl set-hostname sdw1   # on segment 1
hostnamectl set-hostname sdw2   # on segment 2
hostnamectl set-hostname sdw3   # on segment 3

# Verify (takes effect immediately)
hostname

# Refresh the shell prompt to show the new hostname
exec bash
```

Then, edit the `/etc/hosts` file on all hosts to add the mappings of all host names to their IP addresses. For example:

```
192.168.1.1  cdw
192.168.1.2  scdw
192.168.1.3  sdw1
192.168.1.4  sdw2
192.168.1.5  sdw3
```

### The sysctl.conf file

The `sysctl.conf` parameters listed in this topic are for performance, optimization, and consistency in a wide variety of environments. Change these settings according to your specific situation and setup.

Set the parameters in the `/etc/sysctl.conf` file and reload with `sysctl -p`:

```conf
# kernel.shmall = _PHYS_PAGES / 2 # See Shared Memory Pages
kernel.shmall = 197951838
# kernel.shmmax = kernel.shmall * PAGE_SIZE
kernel.shmmax = 810810728448
kernel.shmmni = 4096
vm.overcommit_memory = 2 # See Segment Host Memory
vm.overcommit_ratio = 95 # See Segment Host Memory

net.ipv4.ip_local_port_range = 10000 65535 # See Port Settings
kernel.sem = 250 2048000 200 8192
kernel.sysrq = 1
kernel.core_uses_pid = 1
kernel.msgmnb = 65536
kernel.msgmax = 65536
kernel.msgmni = 2048
net.ipv4.tcp_syncookies = 1
net.ipv4.conf.default.accept_source_route = 0
net.ipv4.tcp_max_syn_backlog = 4096
net.ipv4.conf.all.arp_filter = 1
net.ipv4.ipfrag_high_thresh = 41943040
net.ipv4.ipfrag_low_thresh = 31457280
net.ipv4.ipfrag_time = 60
net.core.netdev_max_backlog = 10000
net.core.rmem_max = 2097152
net.core.wmem_max = 2097152
vm.swappiness = 10
vm.zone_reclaim_mode = 0
vm.dirty_expire_centisecs = 500
vm.dirty_writeback_centisecs = 100
vm.dirty_background_ratio = 0 # See System Memory
vm.dirty_ratio = 0
vm.dirty_background_bytes = 1610612736
vm.dirty_bytes = 4294967296
```

#### Shared memory pages

Apache Cloudberry uses shared memory to communicate between `postgres` processes that are part of the same `postgres` instance. `kernel.shmall` sets the total amount of shared memory, in pages, that can be used system wide. `kernel.shmmax` sets the maximum size of a single shared memory segment in bytes.

Set `kernel.shmall` and `kernel.shmmax` values based on your system's physical memory and page size. In general, the value for both parameters should be one half of the system physical memory.

Use the operating system variables `_PHYS_PAGES` and `PAGE_SIZE` to set the parameters.

```
kernel.shmall = ( _PHYS_PAGES / 2)
kernel.shmmax = ( _PHYS_PAGES / 2) * PAGE_SIZE
```

To calculate the values for `kernel.shmall` and `kernel.shmmax`, run the following commands using the `getconf` command, which returns the value of an operating system variable.

```bash
$ echo $(expr $(getconf _PHYS_PAGES) / 2)
$ echo $(expr $(getconf _PHYS_PAGES) / 2 \* $(getconf PAGE_SIZE))
```

As best practice, we recommend you set the following values in the `/etc/sysctl.conf` file using calculated values. For example, a host system has 1583 GB of memory installed and returns these values: `_PHYS_PAGES = 395903676` and `PAGE_SIZE = 4096`. These would be the `kernel.shmall` and `kernel.shmmax` values:

```
kernel.shmall = 197951838
kernel.shmmax = 810810728448
```

If the Apache Cloudberry coordinator has a different shared memory configuration than the segment hosts, the `_PHYS_PAGES` and `PAGE_SIZE` values might differ, and the `kernel.shmall` and `kernel.shmmax` values on the coordinator host will differ from those on the segment hosts.

#### Segment host memory

The `vm.overcommit_memory` Linux kernel parameter is used by the OS to determine how much memory can be allocated to processes. For Apache Cloudberry, this parameter should always be set to 2.

`vm.overcommit_ratio` is the percent of RAM that is used for application processes and the remainder is reserved for the operating system. The default is 50 on Red Hat Enterprise Linux.

`vm.overcommit_ratio` is calculated as follows:

```
vm.overcommit_ratio = (RAM - 0.026 * gp_vmem) / RAM
```

The calculation method of `gp_vmem` is as follows:

```
# If the system memory is less than 256 GB, use the following formula to calculate:
gp_vmem = ((SWAP + RAM) – (7.5GB + 0.05 * RAM)) / 1.7

# If the system memory is greater than or equal to 256 GB, use the following formula to calculate:
gp_vmem = ((SWAP + RAM) – (7.5GB + 0.05 * RAM)) / 1.17

# In the above formulas, SWAP is the swap space on the host, in GB.
# RAM is the size of the memory installed on the host, in GB.
```

#### Port settings

To avoid port conflicts between Apache Cloudberry and other applications during initialization, make a note of the port range specified by the operating system parameter `net.ipv4.ip_local_port_range`. When initializing Apache Cloudberry using the `gpinitsystem` cluster configuration file, do not specify Apache Cloudberry ports in that range. 

For example, if `net.ipv4.ip_local_port_range = 10000 65535`, set the Apache Cloudberry base port numbers to these values.

```
PORT_BASE = 6000
MIRROR_PORT_BASE = 7000
```

#### IP fragmentation settings

When the Apache Cloudberry interconnect uses UDP (the default), the network interface card controls IP packet fragmentation and reassemblies.

If the UDP message size is larger than the size of the maximum transmission unit (MTU) of a network, the IP layer fragments the message. (Refer to [Networking](#networking) later in this topic for more information about MTU sizes for Apache Cloudberry.) The receiver must store the fragments in a buffer before it can reorganize and reassemble the message.

The following `sysctl.conf` operating system parameters control the reassembly process:

| OS Parameter | Description |
|---|---|
| `net.ipv4.ipfrag_high_thresh` | The maximum amount of memory used to reassemble IP fragments before the kernel starts to remove fragments to free up resources. The default value is 4194304 bytes (4MB). |
| `net.ipv4.ipfrag_low_thresh` | The minimum amount of memory used to reassemble IP fragments. The default value is 3145728 bytes (3MB). (Deprecated after kernel version 4.17.) |
| `net.ipv4.ipfrag_time` | The maximum amount of time (in seconds) to keep an IP fragment in memory. The default value is 30. |

The recommended settings for these parameters for Apache Cloudberry follow:

```conf
net.ipv4.ipfrag_high_thresh = 41943040
net.ipv4.ipfrag_low_thresh = 31457280
net.ipv4.ipfrag_time = 60
```

#### System memory

For host systems with more than 64GB of memory, these settings are recommended:

```conf
vm.dirty_background_ratio = 0
vm.dirty_ratio = 0
vm.dirty_background_bytes = 1610612736 # 1.5GB
vm.dirty_bytes = 4294967296 # 4GB
```

For host systems with 64GB of memory or less, remove `vm.dirty_background_bytes` and `vm.dirty_bytes` and set the two `ratio` parameters to these values:

```conf
vm.dirty_background_ratio = 3
vm.dirty_ratio = 10
```

Increase `vm.min_free_kbytes` to ensure `PF_MEMALLOC` requests from network and storage drivers are easily satisfied. This is especially critical on systems with large amounts of system memory. The default value is often far too low on these systems. Use this awk command to set `vm.min_free_kbytes` to a recommended 3% of system physical memory:

```bash
awk 'BEGIN {OFMT = "%.0f";} /MemTotal/ {print "vm.min_free_kbytes =", $2 * .03;}' /proc/meminfo >> /etc/sysctl.conf
```

Do not set `vm.min_free_kbytes` to higher than 5% of system memory as doing so might cause out of memory conditions.

### System resources limits

Set the following parameters in the `/etc/security/limits.conf` file:

```
* soft nofile 524288
* hard nofile 524288
* soft nproc 131072
* hard nproc 131072
```

For Red Hat Enterprise Linux (RHEL) systems, parameter values in the `/etc/security/limits.d/20-nproc.conf` file override the values in the `limits.conf` file. Ensure that any parameters in the override file are set to the required value. The Linux module `pam_limits` sets user limits by reading the values from the `limits.conf` file and then from the override file. For information about PAM and user limits, see the documentation on PAM and `pam_limits`.

Run the `ulimit -u` command on each segment host to display the maximum number of processes that are available to each user. Validate that the return value is 131072.

### Core dump

Enable core file generation to a known location by adding the following line to `/etc/sysctl.conf`:

```conf
kernel.core_pattern=/var/core/core.%h.%t
```

Add the following line to `/etc/security/limits.conf`:

```
* soft core unlimited
```

To apply the changes to the live kernel, run the following command:

```bash
# sysctl -p
```

### XFS mount options

XFS is the preferred data storage file system on Linux platforms for Apache Cloudberry data directories. Use the `mount` command with the following recommended XFS mount options:

```
rw,nodev,noatime,inode64
```

:::note
The `nobarrier` option is not supported on RHEL 8/9 or Ubuntu systems. Use only the options `rw,nodev,noatime,inode64`.
:::

:::tip
If you are using cloud VMs with only a single system disk (no additional data disk), you can skip the disk formatting and mounting steps below. Simply create the data directory on the existing filesystem:

```bash
mkdir -p /data
chown -R gpadmin:gpadmin /data
```
:::

If you have a dedicated data disk, set up XFS file mounting in the `/etc/fstab` file. Adjust the device path according to your actual situation:

```bash
mkdir -p /data
mkfs.xfs -f /dev/sdb

# Use device name directly
echo "/dev/sdb /data xfs rw,nodev,noatime,inode64 0 0" >> /etc/fstab
# Or use UUID for stable identification across reboots (recommended for cloud/VM environments)
# echo "UUID=$(blkid -s UUID -o value /dev/vdb1) /data xfs rw,nodev,noatime,inode64 0 0" >> /etc/fstab

mount /data
chown -R gpadmin:gpadmin /data
```

Run the following command to check whether the mounting is successful:

```bash
df -h
```

### Disk I/O settings

#### Read-ahead value

Each disk device file should have a read-ahead (`blockdev`) value of 16384. To verify the read-ahead value of a disk device:

```bash
# sudo /sbin/blockdev --getra <devname>
```

For example:

```bash
# sudo /sbin/blockdev --getra /dev/sdb
```

To set blockdev (read-ahead) on a device:

```bash
# sudo /sbin/blockdev --setra <bytes> <devname>
```

For example:

```bash
# sudo /sbin/blockdev --setra 16384 /dev/sdb
```

:::note
The `blockdev --setra` command is not persistent. You must ensure the read-ahead value is set whenever the system restarts. How to set the value will vary based on your system.
:::

One method to set the `blockdev` value at system startup is by adding the `/sbin/blockdev --setra` command in the `rc.local` file. For example, add this line to the `rc.local` file to set the read-ahead value for the disk `sdb`.

```
/sbin/blockdev --setra 16384 /dev/sdb
```

On systems that use systemd, you must also set the execute permissions on the `rc.local` file to enable it to run at startup. For example, on a RHEL system, this command sets execute permissions on the file.

```bash
# chmod +x /etc/rc.d/rc.local
```

Restart the system to have the setting take effect.

#### Disk I/O scheduler

The Linux disk scheduler orders the I/O requests submitted to a storage device, controlling the way the kernel commits reads and writes to disk.

A typical Linux disk I/O scheduler supports multiple access policies. The optimal policy selection depends on the underlying storage infrastructure. The recommended scheduler policy settings for Apache Cloudberry systems for specific OSs and storage device types follow:

| Storage Device Type | OS | Recommended Scheduler Policy |
|---|---|---|
| Non-Volatile Memory Express (NVMe) | RHEL 8/9, Ubuntu | `none` |
| Solid-State Drives (SSD) | RHEL 8/9, Ubuntu | `none` |
| Other | RHEL 8/9, Ubuntu | `mq-deadline` |

To specify a scheduler until the next system reboot, run the following:

```bash
# echo schedulername > /sys/block/<devname>/queue/scheduler
```

For example:

```bash
# echo mq-deadline > /sys/block/sdb/queue/scheduler
```

:::note
Using the `echo` command to set the disk I/O scheduler policy is not persistent; you must ensure that you run the command whenever the system reboots. How to run the command will vary based on your system.
:::

To specify the I/O scheduler at boot time on systems that use `grub2`, use the system utility `grubby`. This command adds the parameter when run as `root`:

```bash
# grubby --update-kernel=ALL --args="elevator=mq-deadline"
```

After adding the parameter, reboot the system.

This `grubby` command displays kernel parameter settings:

```bash
# grubby --info=ALL
```

### Networking

The maximum transmission unit (MTU) of a network specifies the size (in bytes) of the largest data packet/frame accepted by a network-connected device. A jumbo frame is a frame that contains more than the standard MTU of 1500 bytes.

Apache Cloudberry utilizes 3 distinct MTU settings:

- The Apache Cloudberry `gp_max_packet_size` server configuration parameter. The default max packet size is 8192. This default assumes a jumbo frame MTU.
- The operating system MTU setting.
- The rack switch MTU setting.

These settings are connected, in that they should always be either the same, or close to the same, value, or otherwise in the order of Apache Cloudberry < OS < switch for MTU size.

9000 is a common supported setting for switches, and is the recommended OS and rack switch MTU setting for your Apache Cloudberry hosts.

### Transparent Huge Pages (THP)

Deactivate Transparent Huge Pages (THP) as it degrades Apache Cloudberry performance.

On systems that use `grub2`, use the system utility `grubby`. This command adds the parameter when run as root:

```bash
# grubby --update-kernel=ALL --args="transparent_hugepage=never"
```

After adding the parameter, reboot the system.

For Ubuntu systems, install the `hugepages` package and run this command as root:

```bash
# hugeadm --thp-never
```

This cat command checks the state of THP. The output indicates that THP is deactivated:

```bash
$ cat /sys/kernel/mm/*transparent_hugepage/enabled
always [never]
```

### IPC object removal

Deactivate IPC object removal. The default `systemd` setting `RemoveIPC=yes` removes IPC connections when non-system user accounts log out. This causes the Apache Cloudberry utility `gpinitsystem` to fail with semaphore errors. Perform one of the following to avoid this issue.

- When you add the `gpadmin` operating system user account to the coordinator node in [Creating the Apache Cloudberry Administrative User](#creating-the-cloudberry-administrative-user), create the user as a system account.
- Deactivate `RemoveIPC`. Set this parameter in `/etc/systemd/logind.conf` on the Apache Cloudberry host systems.

    ```
    RemoveIPC=no
    ```

    The setting takes effect after restarting the `systemd-login` service or rebooting the system. To restart the service, run this command as the root user.

    ```bash
    service systemd-logind restart
    ```

### SSH connection threshold

Certain Apache Cloudberry management utilities including `gpexpand`, `gpinitsystem`, and `gpaddmirrors`, use secure shell (SSH) connections between systems to perform their tasks. In large Apache Cloudberry deployments, cloud deployments, or deployments with a large number of segments per host, these utilities may exceed the host's maximum threshold for unauthenticated connections. When this occurs, you receive errors such as: `ssh_exchange_identification: Connection closed by remote host`.

To increase this connection threshold for your Apache Cloudberry system, update the SSH `MaxStartups` and `MaxSessions` configuration parameters in the `/etc/ssh/sshd_config` SSH daemon configuration file.

:::note
You must have root permission to edit these two files.
:::

If you specify `MaxStartups` and `MaxSessions` using a single integer value, you identify the maximum number of concurrent unauthenticated connections (`MaxStartups`) and maximum number of open shell, login, or subsystem sessions permitted per network connection (`MaxSessions`). For example:

```
MaxStartups 200
MaxSessions 200
```

If you specify `MaxStartups` using the "start:rate:full" syntax, you enable random early connection drop by the SSH daemon. `start` identifies the maximum number of unauthenticated SSH connection attempts allowed. Once `start` number of unauthenticated connection attempts is reached, the SSH daemon refuses `rate` percent of subsequent connection attempts. `full` identifies the maximum number of unauthenticated connection attempts after which all attempts are refused. For example:

```
MaxStartups 10:30:200
MaxSessions 200
```

Restart the SSH daemon after you update `MaxStartups` and `MaxSessions`:

```bash
# service sshd restart
```

## Synchronizing system clocks

You must use NTP (Network Time Protocol) to synchronize the system clocks on all hosts that comprise your Apache Cloudberry system. Accurate time keeping is essential to ensure reliable operations on the database and data integrity.

There are many different architectures you may choose from to implement NTP. We recommend you use one of the following:

- Configure coordinator as the NTP primary source and the other hosts in the cluster connect to it.
- Configure an external NTP primary source and all hosts in the cluster connect to it.

Depending on your operating system version, the NTP protocol may be implemented by the `ntpd` daemon, the `chronyd` daemon, or other. Refer to your preferred NTP protocol documentation for more details.

### Option 1: Configure system clocks with the coordinator as the primary source

1. On the coordinator host, log in as root and edit your NTP daemon configuration file. Set the `server` parameter to point to your data center's NTP time server. For example (if `10.6.220.20` was the IP address of your data center's NTP server):

    ```
    server 10.6.220.20
    ```

2. On each segment host, log in as root and edit your NTP daemon configuration file. Set the first `server` parameter to point to the coordinator host, and the second server parameter to point to the standby coordinator host. For example:

    ```
    server cdw prefer
    server scdw
    ```

3. On the standby coordinator host, log in as root and edit your NTP daemon configuration file. Set the first `server` parameter to point to the primary coordinator host, and the second server parameter to point to your data center's NTP time server. For example:

    ```
    server cdw prefer
    server 10.6.220.20
    ```

4. Synchronize the system clocks on all Apache Cloudberry hosts as root.

    If you are using the `ntpd` daemon:

    ```bash
    systemctl restart ntpd
    ```

    If you are using the `chronyd` daemon:

    ```bash
    systemctl restart chronyd
    ```

### Option 2: Configure system clocks with an external primary source

1. On each host, including coordinator, standby coordinator, and segments, log in as root and edit your NTP daemon configuration file. Set the first `server` parameter to point to your data center's NTP time server. For example (if `10.6.220.20` was the IP address of your data center's NTP server):

    ```
    server 10.6.220.20
    ```

2. On the coordinator host, use your NTP daemon to synchronize the system clocks on all Apache Cloudberry hosts. For example, using `gpssh`:

    If you are using the `ntpd` daemon:

    ```bash
    gpssh -f hostfile_gpssh_allhosts -v -e 'systemctl restart ntpd'
    ```

    If you are using the `chronyd` daemon:

    ```bash
    gpssh -f hostfile_gpssh_allhosts -v -e 'systemctl restart chronyd'
    ```

## Creating the Cloudberry administrative user

Create a dedicated operating system user account on each node to run and administer Apache Cloudberry. This user account is named `gpadmin` by convention.

:::important
You cannot run the Apache Cloudberry server as `root`.
:::

The `gpadmin` user must have permission to access the services and directories required to install and run Apache Cloudberry.

The `gpadmin` user on each Apache Cloudberry host must have an SSH key pair installed and be able to SSH from any host in the cluster to any other host in the cluster without entering a password or passphrase (called "passwordless SSH"). If you enable passwordless SSH from the coordinator host to every other host in the cluster ("1-*n* passwordless SSH"), you can use the Apache Cloudberry `gpssh-exkeys` command-line utility later to enable passwordless SSH from every host to every other host ("*n*-*n* passwordless SSH").

You can optionally give the `gpadmin` user sudo privilege, so that you can easily administer all hosts in the Apache Cloudberry cluster as `gpadmin` using the `sudo`, `ssh/rsync`, and `gpssh/gpsync` commands.

The following steps show how to set up the `gpadmin` user on a host, set a password, create an SSH key pair, and (optionally) enable sudo capability. These steps must be performed as root on every Apache Cloudberry cluster host. (For a large Apache Cloudberry cluster you will want to automate these steps using your system provisioning tools.)

1. Create the `gpadmin` group and user.

    :::note
    Make sure the `gpadmin` user has the same user id (uid) and group id (gid) numbers on each host to prevent problems with scripts or services that use them for identity or permissions. For example, backing up Apache Cloudberry databases to some networked file systems or storage appliances could fail if the `gpadmin` user has different uid or gid numbers on different segment hosts. When you create the `gpadmin` group and user, you can use the `groupadd -g` option to specify a gid number and the `useradd -u` option to specify the uid number. Use the command `id gpadmin` to see the uid and gid for the `gpadmin` user on the current host.
    :::

    This example creates the `gpadmin` group, creates the `gpadmin` user as a system account with a home directory and as a member of the `gpadmin` group, and creates a password for the user.

    ```bash
    # groupadd gpadmin
    # useradd gpadmin -r -m -g gpadmin
    # passwd gpadmin
    New password: <changeme>
    Retype new password: <changeme>
    ```

2. Switch to the `gpadmin` user and generate an SSH key pair for the `gpadmin` user.

    ```bash
    $ su - gpadmin
    $ ssh-keygen -t rsa -b 4096
    Generating public/private rsa key pair.
    Enter file in which to save the key (/home/gpadmin/.ssh/id_rsa):
    Created directory '/home/gpadmin/.ssh'.
    Enter passphrase (empty for no passphrase):
    Enter same passphrase again:
    ```

    At the passphrase prompts, press Enter so that SSH connections will not require entry of a passphrase.

3. Grant sudo access to the `gpadmin` user.

    On Red Hat or Rocky Linux, run `visudo` and uncomment the `%wheel` group entry.

    ```
    %wheel        ALL=(ALL)       NOPASSWD: ALL
    ```

    Make sure you uncomment the line that has the `NOPASSWD` keyword.

    Add the `gpadmin` user to the `wheel` group with this command.

    ```bash
    # usermod -aG wheel gpadmin
    ```
