"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[6201],{30355:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>l,contentTitle:()=>i,default:()=>h,frontMatter:()=>o,metadata:()=>a,toc:()=>d});var r=s(85893),t=s(11151);const o={title:"Prepare to Deploy"},i="Prepare to Deploy on Physical or Virtual Machine",a={id:"cbdb-op-prepare-to-deploy",title:"Prepare to Deploy",description:"Before deploying Apache Cloudberry on physical or virtual machines, you need to do some preparations. Read this document and Software and Hardware Configuration Requirements before you start to deploy Apache Cloudberry.",source:"@site/docs/cbdb-op-prepare-to-deploy.md",sourceDirName:".",slug:"/cbdb-op-prepare-to-deploy",permalink:"/docs/cbdb-op-prepare-to-deploy",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/cbdb-op-prepare-to-deploy.md",tags:[],version:"current",lastUpdatedBy:"Dianjin Wang",lastUpdatedAt:1744271659,formattedLastUpdatedAt:"Apr 10, 2025",frontMatter:{title:"Prepare to Deploy"},sidebar:"docsbars",previous:{title:"Software and Hardware Configuration",permalink:"/docs/cbdb-op-software-hardware"},next:{title:"Deploy Manually Using RPM Package",permalink:"/docs/cbdb-op-deploy-guide"}},l={},d=[{value:"Plan the deployment architecture",id:"plan-the-deployment-architecture",level:2},{value:"Modify server settings",id:"modify-server-settings",level:2},{value:"Change hostname",id:"change-hostname",level:3},{value:"Add <code>gpadmin</code> admin user",id:"add-gpadmin-admin-user",level:3},{value:"Disable SELinux and firewall software",id:"disable-selinux-and-firewall-software",level:3},{value:"Modify network mapping",id:"modify-network-mapping",level:3},{value:"Set system parameters",id:"set-system-parameters",level:3},{value:"Shared memory",id:"shared-memory",level:4},{value:"Segment memory",id:"segment-memory",level:4},{value:"Port",id:"port",level:4},{value:"IP segmentation",id:"ip-segmentation",level:4},{value:"System memory",id:"system-memory",level:4},{value:"Resource limit",id:"resource-limit",level:4},{value:"CORE DUMP",id:"core-dump",level:4},{value:"Set mount options for the XFS file system",id:"set-mount-options-for-the-xfs-file-system",level:4},{value:"Blockdev value",id:"blockdev-value",level:4},{value:"I/O scheduling policy settings for disks",id:"io-scheduling-policy-settings-for-disks",level:4},{value:"Disable Transparent Huge Pages (THP)",id:"disable-transparent-huge-pages-thp",level:4},{value:"Disable IPC object deletion",id:"disable-ipc-object-deletion",level:4},{value:"SSH connection threshold",id:"ssh-connection-threshold",level:4},{value:"Clock synchronization",id:"clock-synchronization",level:4}];function c(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,t.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"prepare-to-deploy-on-physical-or-virtual-machine",children:"Prepare to Deploy on Physical or Virtual Machine"}),"\n",(0,r.jsxs)(n.p,{children:["Before deploying Apache Cloudberry on physical or virtual machines, you need to do some preparations. Read this document and ",(0,r.jsx)(n.a,{href:"/docs/cbdb-op-software-hardware",children:"Software and Hardware Configuration Requirements"})," before you start to deploy Apache Cloudberry."]}),"\n",(0,r.jsx)(n.h2,{id:"plan-the-deployment-architecture",children:"Plan the deployment architecture"}),"\n",(0,r.jsxs)(n.p,{children:["Plan your deployment architecture based on the ",(0,r.jsx)(n.a,{href:"/docs/cbdb-architecture",children:"Apache Cloudberry Architecture"})," and ",(0,r.jsx)(n.a,{href:"/docs/cbdb-op-software-hardware",children:"Software and Hardware Configuration Requirements"}),", and determine the number of servers needed. Ensure that all servers are within a single security group and have mutual trust configured."]}),"\n",(0,r.jsx)(n.p,{children:"The deployment plan for the example of this document includes 1 coordinator + 1 standby + 3 segments (primary + mirror), totaling 5 servers."}),"\n",(0,r.jsx)(n.h2,{id:"modify-server-settings",children:"Modify server settings"}),"\n",(0,r.jsxs)(n.p,{children:["Log into each host as the ",(0,r.jsx)(n.code,{children:"root"})," user, and modify the settings of each node server in the order of the following sections."]}),"\n",(0,r.jsx)(n.h3,{id:"change-hostname",children:"Change hostname"}),"\n",(0,r.jsxs)(n.p,{children:["Use the ",(0,r.jsx)(n.code,{children:"hostnamectl set-hostname"})," command to modify the hostname of each server respectively, following these naming conventions:"]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Only include letters, numbers, and the hyphen ",(0,r.jsx)(n.code,{children:"-"}),". Note: The underscore ",(0,r.jsx)(n.code,{children:"_"})," is not a valid character."]}),"\n",(0,r.jsx)(n.li,{children:"Case-insensitive, but it is recommended to use all lowercase letters. Using uppercase letters for the hostname might cause Kerberos authentication to fail."}),"\n",(0,r.jsx)(n.li,{children:"Each hostname must be globally unique across all hosts."}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"Example:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"hostnamectl set-hostname cbdb-coordinator\nhostnamectl set-hostname cbdb-standbycoordinator\nhostnamectl set-hostname cbdb-datanode01\nhostnamectl set-hostname cbdb-datanode02\nhostnamectl set-hostname cbdb-datanode03\n"})}),"\n",(0,r.jsxs)(n.h3,{id:"add-gpadmin-admin-user",children:["Add ",(0,r.jsx)(n.code,{children:"gpadmin"})," admin user"]}),"\n",(0,r.jsxs)(n.p,{children:["Follow the example below to create a user group and username ",(0,r.jsx)(n.code,{children:"gpadmin"}),". Set the user group and username identifier to ",(0,r.jsx)(n.code,{children:"520"}),". Create and specify the ",(0,r.jsx)(n.code,{children:"gpadmin"})," home directory ",(0,r.jsx)(n.code,{children:"/home/gpadmin"}),"."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"groupadd -g 520 gpadmin  # Adds user group gpadmin.\nuseradd -g 520 -u 520 -m -d /home/gpadmin/ -s /bin/bash gpadmin  # Adds username gpadmin and creates the home directory of gpadmin.\npasswd gpadmin  # Sets a password for gpadmin; after executing, follow the prompts to input the password.\n"})}),"\n",(0,r.jsx)(n.h3,{id:"disable-selinux-and-firewall-software",children:"Disable SELinux and firewall software"}),"\n",(0,r.jsxs)(n.p,{children:["Run ",(0,r.jsx)(n.code,{children:"systemctl status firewalld"})," to view the firewall status. If the firewall is on, you need to turn it off by setting the ",(0,r.jsx)(n.code,{children:"SELINUX"})," parameter to ",(0,r.jsx)(n.code,{children:"disabled"})," in the ",(0,r.jsx)(n.code,{children:"/etc/selinux/config"})," file."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"SELINUX=disabled\n"})}),"\n",(0,r.jsx)(n.p,{children:"You can also disable the firewall using the following commands:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"systemctl stop firewalld.service\nsystemctl disable firewalld.service\n"})}),"\n",(0,r.jsx)(n.h3,{id:"modify-network-mapping",children:"Modify network mapping"}),"\n",(0,r.jsxs)(n.p,{children:["Check the ",(0,r.jsx)(n.code,{children:"/etc/hosts"})," file to make sure that it contains mappings of all host aliases to their network IP addresses. Examples are as follows:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"192.168.1.101  cbdb-coordinator\n192.168.1.102  cbdb-standbycoordinator\n192.168.1.103  cbdb-datanode01\n192.168.1.104  cbdb-datanode02\n192.168.1.105  cbdb-datanode03\n"})}),"\n",(0,r.jsx)(n.h3,{id:"set-system-parameters",children:"Set system parameters"}),"\n",(0,r.jsxs)(n.p,{children:["Add relevant system parameters in the ",(0,r.jsx)(n.code,{children:"/etc/sysctl.conf"})," configuration file, and run the ",(0,r.jsx)(n.code,{children:"sysctl -p"})," command to make the configuration file effective."]}),"\n",(0,r.jsx)(n.p,{children:"When setting the configuration parameters, you can take the following example as a reference and set them according to your needs. Details of some of these parameters and recommended settings are provided below."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-conf",children:"# kernel.shmall = _PHYS_PAGES / 2\nkernel.shmall = 197951838\n# kernel.shmmax = kernel.shmall * PAGE_SIZE\nkernel.shmmax = 810810728448\nkernel.shmmni = 4096\nvm.overcommit_memory = 2\nvm.overcommit_ratio = 95\nnet.ipv4.ip_local_port_range = 10000 65535\nkernel.sem = 250 2048000 200 8192\nkernel.sysrq = 1\nkernel.core_uses_pid = 1\nkernel.msgmnb = 65536\nkernel.msgmax = 65536\nkernel.msgmni = 2048\nnet.ipv4.tcp_syncookies = 1\nnet.ipv4.conf.default.accept_source_route = 0\nnet.ipv4.tcp_max_syn_backlog = 4096\nnet.ipv4.conf.all.arp_filter = 1\nnet.ipv4.ipfrag_high_thresh = 41943040\nnet.ipv4.ipfrag_low_thresh = 31457280\nnet.ipv4.ipfrag_time = 60\nnet.core.netdev_max_backlog = 10000\nnet.core.rmem_max = 2097152\nnet.core.wmem_max = 2097152\nvm.swappiness = 10\nvm.zone_reclaim_mode = 0\nvm.dirty_expire_centisecs = 500\nvm.dirty_writeback_centisecs = 100\nvm.dirty_background_ratio = 0\nvm.dirty_ratio = 0\nvm.dirty_background_bytes = 1610612736\nvm.dirty_bytes = 4294967296\n"})}),"\n",(0,r.jsx)(n.h4,{id:"shared-memory",children:"Shared memory"}),"\n",(0,r.jsxs)(n.p,{children:["In the ",(0,r.jsx)(n.code,{children:"/etc/sysctl.conf"})," configuration file, ",(0,r.jsx)(n.code,{children:"kernel.shmall"})," represents the total amount of available shared memory, in pages. ",(0,r.jsx)(n.code,{children:"kernel.shmmax"})," represents the maximum size of a single shared memory segment, in bytes."]}),"\n",(0,r.jsxs)(n.p,{children:["You can define these 2 values \u200b\u200busing the operating system's ",(0,r.jsx)(n.code,{children:"_PHYS_PAGES"})," and ",(0,r.jsx)(n.code,{children:"PAGE_SIZE"})," parameters:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-conf",children:"kernel.shmall = ( _PHYS_PAGES / 2) \nkernel.shmmax = ( _PHYS_PAGES / 2) * PAGE_SIZE\n"})}),"\n",(0,r.jsxs)(n.p,{children:["To get the values \u200b\u200bof these 2 operating system parameters, you can use ",(0,r.jsx)(n.code,{children:"getconf"}),", for example:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"$ echo $(expr $(getconf _PHYS_PAGES) / 2) \n$ echo $(expr $(getconf _PHYS_PAGES) / 2 \\* $(getconf PAGE_SIZE))\n"})}),"\n",(0,r.jsx)(n.h4,{id:"segment-memory",children:"Segment memory"}),"\n",(0,r.jsxs)(n.p,{children:["In the ",(0,r.jsx)(n.code,{children:"/etc/sysctl.conf"})," configuration file,"]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"vm.overcommit_memory"})," indicates the overcommit handling modes for memory. Available options are:"]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"0"}),": Heuristic overcommit handling"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"1"}),": Always overcommit"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"2"}),": Don't overcommit"]}),"\n"]}),"\n",(0,r.jsxs)(n.p,{children:["Set the value of this parameter to ",(0,r.jsx)(n.code,{children:"2"})," to refuse overcommit."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"vm.overcommit_ratio"})," is a kernel parameter and is the percentage of RAM occupied by the application process. The default value on CentOS is ",(0,r.jsx)(n.code,{children:"50"}),". ",(0,r.jsx)(n.code,{children:"vm.overcommit_ratio"})," is calculated as follows:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"vm.overcommit_ratio = (RAM - 0.026 * gp_vmem) / RAM\n"})}),"\n",(0,r.jsxs)(n.p,{children:["The calculation method of ",(0,r.jsx)(n.code,{children:"gp_vmem"})," is as follows:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"# If the system memory is less than 256 GB, use the following formula to calculate:\ngp_vmem = ((SWAP + RAM) \u2013 (7.5GB + 0.05 * RAM)) / 1.7\n\n# If the system memory is greater than or equal to 256 GB, use the following formula to calculate:\ngp_vmem = ((SWAP + RAM) \u2013 (7.5GB + 0.05 * RAM)) / 1.17\n\n# In the above formulas, SWAP is the swap space on the host, in GB.\n# RAM is the size of the memory installed on the host, in GB.\n"})}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h4,{id:"port",children:"Port"}),"\n",(0,r.jsxs)(n.p,{children:["In the ",(0,r.jsx)(n.code,{children:"/etc/sysctl.conf"})," configuration file, ",(0,r.jsx)(n.code,{children:"net.ipv4.ip_local_port_range"})," is used to specify the port range. To avoid port conflicts between Apache Cloudberry and other applications, you need to specify the port range via operating system parameters. When you later set Apache Cloudberry initialization parameters, avoid setting Apache Cloudberry related ports in this range."]}),"\n",(0,r.jsxs)(n.p,{children:["For example, for ",(0,r.jsx)(n.code,{children:"net.ipv4.ip_local_port_range = 10000 65535"}),", you need to avoid setting the Apache Cloudberry related ports in the interval ",(0,r.jsx)(n.code,{children:"[10000,65535]"}),". You can set them to ",(0,r.jsx)(n.code,{children:"6000"})," and ",(0,r.jsx)(n.code,{children:"7000"}),":"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"PORT_BASE = 6000 \nMIRROR_PORT_BASE = 7000\n"})}),"\n",(0,r.jsx)(n.h4,{id:"ip-segmentation",children:"IP segmentation"}),"\n",(0,r.jsx)(n.p,{children:"When the Apache Cloudberry uses the UDP protocol for internal connection, the network card controls the fragmentation and reassembly of IP packets. If the size of a UDP message is larger than the maximum size of network transmission unit (MTU), the IP layer fragments the message."}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"net.ipv4.ipfrag_high_thresh"}),": When the total size of IP fragments exceeds this threshold, the kernel will attempt to reorganize IP fragments. If the fragments exceed this threshold but all fragments have not arrived within the specified time, the kernel will not reorganize the fragments. This threshold is typically used to control whether larger shards are reorganized. The default value is ",(0,r.jsx)(n.code,{children:"4194304"})," bytes (4 MB)."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"net.ipv4.ipfrag_low_thresh"}),": Indicates that when the total size of IP fragments is below this threshold, the kernel will wait as long as possible for more fragments to arrive, to allow for larger reorganizations. This threshold is used to minimize unfinished reorganization operations and improve system performance. The default value is ",(0,r.jsx)(n.code,{children:"3145728"})," bytes (3 MB)."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"net.ipv4.ipfrag_time"})," is a kernel parameter that controls the IP fragment reassembly timeout. The default value is ",(0,r.jsx)(n.code,{children:"30"}),"."]}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"It is recommended to set the above parameters to the following values:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-conf",children:"net.ipv4.ipfrag_high_thresh = 41943040 \nnet.ipv4.ipfrag_low_thresh = 31457280 \nnet.ipv4.ipfrag_time = 60 \n"})}),"\n",(0,r.jsx)(n.h4,{id:"system-memory",children:"System memory"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["If the server memory exceeds 64 GB, it is recommended to set the following parameters in the ",(0,r.jsx)(n.code,{children:"/etc/sysctl.conf"})," configuration file:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-conf",children:"vm.dirty_background_ratio = 0\nvm.dirty_ratio = 0\nvm.dirty_background_bytes = 1610612736 # 1.5GB\nvm.dirty_bytes = 4294967296 # 4GB\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["If the server memory is less than 64 GB, do not set ",(0,r.jsx)(n.code,{children:"vm.dirty_background_bytes"})," and ",(0,r.jsx)(n.code,{children:"vm.dirty_bytes"}),". It is recommended to set the following parameters in the ",(0,r.jsx)(n.code,{children:"/etc/sysctl.conf"})," configuration file:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-conf",children:"vm.dirty_background_ratio = 3 \nvm.dirty_ratio = 10\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["To deal with emergencies when the system encounters memory pressure, it is recommended to add the ",(0,r.jsx)(n.code,{children:"vm.min_free_kbytes"})," parameter in the ",(0,r.jsx)(n.code,{children:"/etc/sysctl.conf"})," configuration file to specify the amount of available memory reserved by the system. It is recommended to set ",(0,r.jsx)(n.code,{children:"vm.min_free_kbytes"})," to 3% of the system's physical memory. The command is as follows:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:'awk \'BEGIN {OFMT = "%.0f";} /MemTotal/ {print "vm.min_free_kbytes =", $2 * .03;}\' /proc/meminfo >> /etc/sysctl.conf\n'})}),"\n",(0,r.jsxs)(n.p,{children:["It is not recommended that the setting of ",(0,r.jsx)(n.code,{children:"vm.min_free_kbytes"})," exceed 5% of the system's physical memory."]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h4,{id:"resource-limit",children:"Resource limit"}),"\n",(0,r.jsxs)(n.p,{children:["Edit the ",(0,r.jsx)(n.code,{children:"/etc/security/limits.conf"})," file and add the following content, which limits the usage of software and hardware resources."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"*soft nofile 524288\n*hard nofile 524288\n*soft nproc 131072\n*hard nproc 131072\n"})}),"\n",(0,r.jsx)(n.h4,{id:"core-dump",children:"CORE DUMP"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["Add the following parameter to the ",(0,r.jsx)(n.code,{children:"/etc/sysctl.conf"})," configuration file:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-conf",children:"kernel.core_pattern=/var/core/core.%h.%t\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Run the following command to make the configuration effective:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"sysctl -p\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["Add the following parameter to ",(0,r.jsx)(n.code,{children:"/etc/security/limits.conf"}),":"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"* soft core unlimited\n"})}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h4,{id:"set-mount-options-for-the-xfs-file-system",children:"Set mount options for the XFS file system"}),"\n",(0,r.jsx)(n.p,{children:"XFS is the file system for the data directory of Apache Cloudberry. XFS has the following mount options:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"rw,nodev,noatime,inode64\n"})}),"\n",(0,r.jsxs)(n.p,{children:["You can set up XFS file mounting in the ",(0,r.jsx)(n.code,{children:"/etc/fstab"})," file. See the following commands. You need to choose the file path according to the actual situation:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:'mkdir -p /data0/\nmkfs.xfs -f /dev/vdc\necho "/dev/vdc /data0 xfs rw,nodev,noatime,nobarrier,inode64 0 0" >> /etc/fstab\nmount /data0\nchown -R gpadmin:gpadmin /data0/\n'})}),"\n",(0,r.jsx)(n.p,{children:"Run the following command to check whether the mounting is successful:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"df -h\n"})}),"\n",(0,r.jsx)(n.h4,{id:"blockdev-value",children:"Blockdev value"}),"\n",(0,r.jsxs)(n.p,{children:["The blockdev value for each disk file should be ",(0,r.jsx)(n.code,{children:"16384"}),". To verify the blockdev value of a disk device, use the following command:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"sudo /sbin/blockdev --getra <devname>\n"})}),"\n",(0,r.jsx)(n.p,{children:"For example, to verify the blockdev value of the example server disk:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"sudo /sbin/blockdev --getra /dev/vdc\n"})}),"\n",(0,r.jsx)(n.p,{children:"To modify the blockdev value of a device file, use the following command:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"sudo /sbin/blockdev --setra <bytes> <devname>\n"})}),"\n",(0,r.jsx)(n.p,{children:"For example, to modify the file blockdev value of the hard disk of the example server:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"sudo /sbin/blockdev --setra 16384 /dev/vdc\n"})}),"\n",(0,r.jsx)(n.h4,{id:"io-scheduling-policy-settings-for-disks",children:"I/O scheduling policy settings for disks"}),"\n",(0,r.jsx)(n.p,{children:"The disk type, operating system and scheduling policies of Apache Cloudberry are as follows:"}),"\n",(0,r.jsxs)("table",{children:[(0,r.jsxs)("tr",{children:[(0,r.jsx)("th",{rowspan:"3",children:"Storage device type"}),(0,r.jsx)("th",{rowspan:"3",children:"OS"}),(0,r.jsx)("th",{rowspan:"3",children:"Recommended scheduling policy"})]}),(0,r.jsx)("tr",{}),(0,r.jsx)("tr",{}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{rowspan:"3",children:"NVMe"}),(0,r.jsx)("td",{children:"RHEL 7"}),(0,r.jsx)("td",{children:"none"})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:"RHEL 8"}),(0,r.jsx)("td",{children:"none"})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:"Ubuntu"}),(0,r.jsx)("td",{children:"none"})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{rowspan:"3",children:"SSD"}),(0,r.jsx)("td",{children:"RHEL 7"}),(0,r.jsx)("td",{children:"noop"})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:"RHEL 8"}),(0,r.jsx)("td",{children:"none"})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:"Ubuntu"}),(0,r.jsx)("td",{children:"none"})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{rowspan:"3",children:"Other"}),(0,r.jsx)("td",{children:"RHEL 7"}),(0,r.jsx)("td",{children:"deadline"})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:"RHEL 8"}),(0,r.jsx)("td",{children:"mq-deadline"})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:"Ubuntu"}),(0,r.jsx)("td",{children:"mq-deadline"})]})]}),"\n",(0,r.jsx)(n.p,{children:"Refer to the following command to modify the scheduling policy. Note that this command is only a temporary modification, and the modification becomes invalid after the server is restarted."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"echo schedulername > /sys/block/<devname>/queue/scheduler\n"})}),"\n",(0,r.jsx)(n.p,{children:"For example, temporarily modify the disk I/O scheduling policy of the example server:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"echo deadline > /sys/block/vdc/queue/scheduler\n"})}),"\n",(0,r.jsxs)(n.p,{children:["To permanently modify the scheduling policy, use the system utility ",(0,r.jsx)(n.code,{children:"grubby"}),". After using ",(0,r.jsx)(n.code,{children:"grubby"}),", the modification takes effect immediately after you restart the server. The sample command is as follows:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:'grubby --update-kernel=ALL --args="elevator=deadline"\n'})}),"\n",(0,r.jsx)(n.p,{children:"To view the kernel parameter settings, use the following command:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"grubby --info=ALL\n"})}),"\n",(0,r.jsx)(n.h4,{id:"disable-transparent-huge-pages-thp",children:"Disable Transparent Huge Pages (THP)"}),"\n",(0,r.jsx)(n.p,{children:"You need to disable Transparent Huge Pages (THP), because it reduces database performance. The command is as follows:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:'grubby --update-kernel=ALL --args="transparent_hugepage=never"\n'})}),"\n",(0,r.jsx)(n.p,{children:"Check the status of THP:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"cat /sys/kernel/mm/*transparent_hugepage/enabled\n"})}),"\n",(0,r.jsx)(n.h4,{id:"disable-ipc-object-deletion",children:"Disable IPC object deletion"}),"\n",(0,r.jsxs)(n.p,{children:["Disable IPC object deletion by setting the value of ",(0,r.jsx)(n.code,{children:"RemoveIPC"})," to ",(0,r.jsx)(n.code,{children:"no"}),". You can set this parameter in the ",(0,r.jsx)(n.code,{children:"/etc/systemd/logind.conf"})," file of Apache Cloudberry."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"RemoveIPC=no\n"})}),"\n",(0,r.jsx)(n.p,{children:"After disabling it, run the following command to restart the server to make the disabling setting effective:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"service systemd-logind restart\n"})}),"\n",(0,r.jsx)(n.h4,{id:"ssh-connection-threshold",children:"SSH connection threshold"}),"\n",(0,r.jsxs)(n.p,{children:["To set the SSH connection threshold, you need to modify the ",(0,r.jsx)(n.code,{children:"MaxStartups"})," and ",(0,r.jsx)(n.code,{children:"MaxSessions"})," parameters in the ",(0,r.jsx)(n.code,{children:"/etc/ssh/sshd_config"})," configuration file. Both of the following writing methods are acceptable."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"MaxStartups 200\nMaxSessions 200\n"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"MaxStartups 10:30:200\nMaxSessions 200\n"})}),"\n",(0,r.jsx)(n.p,{children:"Run the following command to restart the server to make the setting take effect:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"service sshd restart\n"})}),"\n",(0,r.jsx)(n.h4,{id:"clock-synchronization",children:"Clock synchronization"}),"\n",(0,r.jsx)(n.p,{children:"Apache Cloudberry requires the clock synchronization to be configured for all hosts, and the clock synchronization service should be started when the host starts. You can choose one of the following synchronization methods:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Use the coordinator node's time as the source, and other hosts synchronize the clock of the coordinator node host."}),"\n",(0,r.jsx)(n.li,{children:"Synchronize clocks using an external clock source."}),"\n"]}),"\n",(0,r.jsxs)(n.p,{children:["The example in this document uses an external clock source for synchronization, that is, adding the following configuration to the ",(0,r.jsx)(n.code,{children:"/etc/chrony.conf"})," configuration file:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-conf",children:"# Use public servers from the pool.ntp.org project.\n# Please consider joining the pool (http://www.pool.ntp.org/join.html).\nserver 0.centos.pool.ntp.org iburst\n"})}),"\n",(0,r.jsx)(n.p,{children:"After setting, you can run the following command to check the clock synchronization status:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"systemctl status chronyd\n"})})]})}function h(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(c,{...e})}):c(e)}},11151:(e,n,s)=>{s.d(n,{Z:()=>a,a:()=>i});var r=s(67294);const t={},o=r.createContext(t);function i(e){const n=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:i(e.components),r.createElement(o.Provider,{value:n},e.children)}}}]);