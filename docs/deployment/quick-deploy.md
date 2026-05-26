---
title: Quick Deployment Guide
---

# Quick Deployment Guide

This guide provides a streamlined, copy-paste-friendly procedure for experienced administrators. This guide shows how to deploy a 5-node Apache Cloudberry cluster:

- 1 Coordinator (`cdw`)
- 1 Standby Coordinator (`scdw`)
- 3 Segments (`sdw1`, `sdw2`, `sdw3`), each with 2 primary and 2 mirror instances

:::info
For detailed explanations of each step, refer to the full deployment guides:
[Configuring Your Systems](./prepare-to-deploy.md), [Installing Using RPM/DEB Package](./install_cloudberry.md), [Creating the Data Storage Areas](./create_data_dirs.md), and [Initializing Apache Cloudberry](./init_cloudberry.md).
:::

## Cluster layout

| Host | Role | IP (example) |
|------|------|--------------|
| cdw | Coordinator | 192.168.1.1 |
| scdw | Standby Coordinator | 192.168.1.2 |
| sdw1 | Segment 1 | 192.168.1.3 |
| sdw2 | Segment 2 | 192.168.1.4 |
| sdw3 | Segment 3 | 192.168.1.5 |

Data directories used:

- Coordinator/Standby: `/data/coordinator`
- Segment primary: `/data/primary` (2 instances per host)
- Segment mirror: `/data/mirror` (2 instances per host)

---

## 1. Configuring your systems (as root on all hosts)

### 1.1 Deactivate SELinux

:::note
This step applies to RHEL/Oracle/Rocky Linux only. On Ubuntu, SELinux is not installed by default and this step can be skipped.
:::

```bash
# Check current status
sestatus

# If not disabled, deactivate it
sed -i 's/^SELINUX=.*/SELINUX=disabled/' /etc/selinux/config

# Reboot is required to take effect
```

### 1.2 Deactivate firewall

**For RHEL/Rocky Linux (firewalld):**

```bash
# Check current status
systemctl status firewalld

# If not disabled, deactivate it
systemctl stop firewalld.service
systemctl disable firewalld.service
```

**For Ubuntu (ufw):**

```bash
# Check current status (disabled by default)
ufw status

# If active, disable it
ufw disable
```

### 1.3 Set the hosts file

Set the hostname on each host (takes effect immediately, no reboot required):

```bash
# Run on each host respectively
hostnamectl set-hostname cdw    # on coordinator
hostnamectl set-hostname scdw   # on standby coordinator
hostnamectl set-hostname sdw1   # on segment 1
hostnamectl set-hostname sdw2   # on segment 2
hostnamectl set-hostname sdw3   # on segment 3

# Verify
hostname

# Refresh the shell prompt to show the new hostname
exec bash
```

Edit `/etc/hosts` on all hosts:

```bash
cat >> /etc/hosts <<EOF
192.168.1.1  cdw
192.168.1.2  scdw
192.168.1.3  sdw1
192.168.1.4  sdw2
192.168.1.5  sdw3
EOF
```

### 1.4 Set sysctl.conf parameters

```bash
cat >> /etc/sysctl.conf <<EOF
kernel.shmall = 197951838
kernel.shmmax = 810810728448
kernel.shmmni = 4096
vm.overcommit_memory = 2
vm.overcommit_ratio = 95
net.ipv4.ip_local_port_range = 10000 65535
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
vm.dirty_background_ratio = 0
vm.dirty_ratio = 0
vm.dirty_background_bytes = 1610612736
vm.dirty_bytes = 4294967296
kernel.core_pattern=/var/core/core.%h.%t
EOF

mkdir -p /var/core
sysctl -p
```

:::note
The `kernel.shmall` and `kernel.shmmax` values above are examples for a host with ~1583 GB memory. Calculate the correct values for your system:

```bash
echo $(expr $(getconf _PHYS_PAGES) / 2)              # kernel.shmall
echo $(expr $(getconf _PHYS_PAGES) / 2 \* $(getconf PAGE_SIZE))  # kernel.shmmax
```
:::

### 1.5 Set system resource limits

```bash
cat >> /etc/security/limits.conf <<EOF
* soft nofile 524288
* hard nofile 524288
* soft nproc 131072
* hard nproc 131072
* soft core unlimited
EOF
```

- `nofile` — maximum number of open file descriptors
- `nproc` — maximum number of processes
- `core` — core dump file size (unlimited enables core dumps for debugging)

### 1.6 XFS mount options

:::note
If you are using cloud VMs with only a single system disk (no additional data disk), you can skip the disk formatting and mounting steps below. Simply create the data directory on the existing filesystem:

```bash
mkdir -p /data
```

The XFS formatting steps below apply when you have a dedicated data disk available.
:::

```bash
mkdir -p /data
mkfs.xfs -f /dev/sdb   # adjust device name as needed

# Use device name directly
echo "/dev/sdb /data xfs rw,nodev,noatime,inode64 0 0" >> /etc/fstab
# Or use UUID for stable identification across reboots (recommended for cloud/VM environments)
# echo "UUID=$(blkid -s UUID -o value /dev/vdb1) /data xfs rw,nodev,noatime,inode64 0 0" >> /etc/fstab

mount /data
```

### 1.7 Disk I/O settings

```bash
# Set read-ahead value
/sbin/blockdev --setra 16384 /dev/sdb

# Persist read-ahead across reboots
echo '/sbin/blockdev --setra 16384 /dev/sdb' >> /etc/rc.d/rc.local
chmod +x /etc/rc.d/rc.local

# Set I/O scheduler permanently (for non-NVMe/SSD disks)
# For RHEL/Rocky Linux:
grubby --update-kernel=ALL --args="elevator=mq-deadline"
# For Ubuntu:
sed -i 's/GRUB_CMDLINE_LINUX="\(.*\)"/GRUB_CMDLINE_LINUX="\1 elevator=mq-deadline"/' /etc/default/grub && update-grub
```

### 1.8 Disable Transparent Huge Pages

```bash
# Check current THP status
cat /sys/kernel/mm/*transparent_hugepage/enabled

# If not [never], disable it permanently
# For RHEL/Rocky Linux:
grubby --update-kernel=ALL --args="transparent_hugepage=never"
# For Ubuntu:
sed -i 's/GRUB_CMDLINE_LINUX="\(.*\)"/GRUB_CMDLINE_LINUX="\1 transparent_hugepage=never"/' /etc/default/grub && update-grub

# Reboot is required to take effect
```

### 1.9 Disable IPC object removal

```bash
sed -i 's/^#RemoveIPC=.*/RemoveIPC=no/' /etc/systemd/logind.conf
service systemd-logind restart
```

### 1.10 SSH connection threshold

```bash
sed -i 's/^#MaxStartups.*/MaxStartups 10:30:200/' /etc/ssh/sshd_config
sed -i 's/^#MaxSessions.*/MaxSessions 200/' /etc/ssh/sshd_config
service sshd restart
```

### 1.11 Synchronize system clocks

```bash
# For RHEL/Rocky Linux
systemctl enable chronyd
systemctl restart chronyd
chronyc tracking

# For Ubuntu (enable must use 'chrony', restart works with either name)
systemctl enable chrony
systemctl restart chronyd
chronyc tracking
```

### 1.12 Create the gpadmin administrative user

```bash
groupadd gpadmin
useradd gpadmin -r -m -g gpadmin
passwd gpadmin

# Grant passwordless sudo
# For RHEL/Rocky Linux: uncomment the %wheel NOPASSWD line in sudoers
# Or use visudo to uncomment: %wheel ALL=(ALL) NOPASSWD: ALL
sed -i 's/^# %wheel\tALL=(ALL)\tNOPASSWD: ALL/%wheel\tALL=(ALL)\tNOPASSWD: ALL/' /etc/sudoers
usermod -aG wheel gpadmin

# For Ubuntu: add gpadmin to sudo group and create a sudoers drop-in file
usermod -aG sudo gpadmin
echo "gpadmin ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/gpadmin
chmod 440 /etc/sudoers.d/gpadmin

# Set data directory ownership to gpadmin
chown -R gpadmin:gpadmin /data
```

:::note
Make sure the `gpadmin` user has the same UID/GID across all hosts. Use `id gpadmin` to verify, or pass `-g <gid>` to `groupadd` and `-u <uid>` to `useradd` to set fixed values.
:::

---

## 2. Install the Apache Cloudberry package (as root on each host)

Download the package from [Apache Cloudberry Releases](https://cloudberry.apache.org/releases) to `/home/gpadmin/` on every host, then install:

```bash
# For RPM (Rocky Linux, RHEL, etc.)
dnf install /home/gpadmin/apache-cloudberry-db-incubating-*.rpm

# For DEB (Ubuntu)
# apt install --fix-broken /home/gpadmin/apache-cloudberry-db-incubating-*.deb

# Set ownership
chown -R gpadmin:gpadmin /usr/local/cloudberry*
```

---

## 3. Enable passwordless SSH (as gpadmin on cdw)

```bash
su - gpadmin
source /usr/local/cloudberry-db/cloudberry-env.sh

# Generate SSH key (press Enter at passphrase prompts)
ssh-keygen -t rsa -b 4096 -N "" -f ~/.ssh/id_rsa

# Enable 1-n passwordless SSH (will prompt for gpadmin password)
ssh-copy-id cdw
ssh-copy-id scdw
ssh-copy-id sdw1
ssh-copy-id sdw2
ssh-copy-id sdw3

# Create the host file for gpssh-exkeys
cat > ~/hostfile_exkeys <<EOF
cdw
scdw
sdw1
sdw2
sdw3
EOF

# Enable n-n passwordless SSH
gpssh-exkeys -f ~/hostfile_exkeys

# Verify
gpssh -f ~/hostfile_exkeys -e 'hostname'
```

### Confirm the installation

```bash
gpssh -f ~/hostfile_exkeys -e 'ls -l /usr/local/cloudberry-db-*'
```

---

## 4. Create data storage areas (as gpadmin on cdw)

```bash
source /usr/local/cloudberry-db/cloudberry-env.sh

# Coordinator data directory
sudo mkdir -p /data/coordinator
sudo chown gpadmin:gpadmin /data/coordinator

# Standby coordinator data directory
gpssh -h scdw -e 'sudo mkdir -p /data/coordinator'
gpssh -h scdw -e 'sudo chown gpadmin:gpadmin /data/coordinator'

# Segment host file
cat > ~/hostfile_gpinitsystem <<EOF
sdw1
sdw2
sdw3
EOF

# Segment primary and mirror directories
gpssh -f ~/hostfile_gpinitsystem -e 'sudo mkdir -p /data/primary'
gpssh -f ~/hostfile_gpinitsystem -e 'sudo mkdir -p /data/mirror'
gpssh -f ~/hostfile_gpinitsystem -e 'sudo chown -R gpadmin:gpadmin /data'
```

---

## 5. Initialize the cluster (as gpadmin on cdw)

### 5.1 Create the initialization host file

```bash
# Already created in step 4 as ~/hostfile_gpinitsystem
cat ~/hostfile_gpinitsystem
```

### 5.2 Create the configuration file

```bash
mkdir -p ~/gpconfigs

cat > ~/gpconfigs/gpinitsystem_config <<EOF
SEG_PREFIX=gpseg
PORT_BASE=6000
declare -a DATA_DIRECTORY=(/data/primary /data/primary)
COORDINATOR_HOSTNAME=cdw
COORDINATOR_DIRECTORY=/data/coordinator
COORDINATOR_PORT=5432
TRUSTED_SHELL=ssh
CHECK_POINT_SEGMENTS=8
ENCODING=UNICODE
MIRROR_PORT_BASE=7000
declare -a MIRROR_DATA_DIRECTORY=(/data/mirror /data/mirror)
DATABASE_NAME=warehouse
EOF
```

### 5.3 Run the initialization utility

```bash
gpinitsystem -c ~/gpconfigs/gpinitsystem_config -h ~/hostfile_gpinitsystem \
    -s scdw --mirror-mode=spread
```

When prompted, type `y` to continue. On success you should see:

```
=> Apache Cloudberry instance successfully created.
```

:::tip
The `-s scdw` option initializes the standby coordinator during cluster creation. If you omit `-s` during `gpinitsystem`, you can initialize the standby separately afterwards:

```bash
gpinitstandby -s scdw
```

Verify the standby is synchronized:

```bash
gpstate -f
```
:::

### 5.4 Set the timezone (optional)

```bash
gpconfig -c TimeZone -v 'US/Pacific'
gpstop -ra
```

### 5.5 Set environment variables

```bash
cat >> ~/.bashrc <<EOF
source /usr/local/cloudberry-db/cloudberry-env.sh
export COORDINATOR_DATA_DIRECTORY=/data/coordinator/gpseg-1
export PGPORT=5432
export PGUSER=gpadmin
export PGDATABASE=warehouse
# (Optional) RHEL/Rocky Linux: ensure ps works under cloudberry-env.sh
export LD_PRELOAD=/lib64/libz.so.1 ps
EOF

source ~/.bashrc

# Copy to standby
scp ~/.bashrc scdw:~/
```

---

## 6. Log into Apache Cloudberry

```bash
psql -d warehouse
```

Check cluster status:

```sql
warehouse=# SELECT * FROM gp_segment_configuration ORDER BY content, role;
```

---

## Quick reference: cluster operations

```bash
# Check cluster status
gpstate -s

# Stop the cluster
gpstop -a

# Start the cluster
gpstart -a

# Restart the cluster
gpstop -ra
```
