"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[4844],{65455:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>o,contentTitle:()=>a,default:()=>h,frontMatter:()=>d,metadata:()=>i,toc:()=>c});var r=t(85893),s=t(11151);const d={title:"Software and Hardware Configuration"},a="Software and Hardware Configuration",i={id:"cbdb-op-software-hardware",title:"Software and Hardware Configuration",description:"This document introduces the software and hardware configuration required for Apache Cloudberry.",source:"@site/docs/cbdb-op-software-hardware.md",sourceDirName:".",slug:"/cbdb-op-software-hardware",permalink:"/docs/cbdb-op-software-hardware",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/cbdb-op-software-hardware.md",tags:[],version:"current",lastUpdatedBy:"TomShawn",lastUpdatedAt:1741056503,formattedLastUpdatedAt:"Mar 4, 2025",frontMatter:{title:"Software and Hardware Configuration"},sidebar:"docsbars",previous:{title:"On Rocky Linux 9",permalink:"/docs/cbdb-rockylinux9-compile"},next:{title:"Prepare to Deploy",permalink:"/docs/cbdb-op-prepare-to-deploy"}},o={},c=[{value:"Hardware requirements",id:"hardware-requirements",level:2},{value:"Supported deployment environments",id:"supported-deployment-environments",level:3},{value:"For development or test environments",id:"for-development-or-test-environments",level:4},{value:"For production environments",id:"for-production-environments",level:4},{value:"Storage",id:"storage",level:3},{value:"Data exchange network",id:"data-exchange-network",level:2},{value:"Software requirements",id:"software-requirements",level:2},{value:"Supported OS",id:"supported-os",level:3},{value:"OS configurations",id:"os-configurations",level:3},{value:"SSH password-free login",id:"ssh-password-free-login",level:3}];function l(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,s.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"software-and-hardware-configuration",children:"Software and Hardware Configuration"}),"\n",(0,r.jsx)(n.p,{children:"This document introduces the software and hardware configuration required for Apache Cloudberry."}),"\n",(0,r.jsx)(n.h2,{id:"hardware-requirements",children:"Hardware requirements"}),"\n",(0,r.jsx)(n.h3,{id:"supported-deployment-environments",children:"Supported deployment environments"}),"\n",(0,r.jsx)(n.p,{children:"Apache Cloudberry supports deployment on both physical machines and virtual machines. Below are the recommended configurations for the environments."}),"\n",(0,r.jsx)(n.h4,{id:"for-development-or-test-environments",children:"For development or test environments"}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"Component"}),(0,r.jsx)(n.th,{children:"CPU"}),(0,r.jsx)(n.th,{children:"Memory"}),(0,r.jsx)(n.th,{children:"Disk type"}),(0,r.jsx)(n.th,{children:"Network"}),(0,r.jsx)(n.th,{children:"Number of instances"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"Coordinator"}),(0,r.jsx)(n.td,{children:"4 cores"}),(0,r.jsx)(n.td,{children:"8 GB"}),(0,r.jsx)(n.td,{children:"SSD"}),(0,r.jsx)(n.td,{children:"10 Gbps NIC (2 preferred)"}),(0,r.jsx)(n.td,{children:"1+"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"Segment"}),(0,r.jsx)(n.td,{children:"4 cores"}),(0,r.jsx)(n.td,{children:"8 GB"}),(0,r.jsx)(n.td,{children:"SSD"}),(0,r.jsx)(n.td,{children:"10 Gbps NIC (2 preferred)"}),(0,r.jsx)(n.td,{children:"1+"})]})]})]}),"\n",(0,r.jsx)(n.h4,{id:"for-production-environments",children:"For production environments"}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"Component"}),(0,r.jsx)(n.th,{children:"CPU"}),(0,r.jsx)(n.th,{children:"Memory"}),(0,r.jsx)(n.th,{children:"Disk type"}),(0,r.jsx)(n.th,{children:"Network"}),(0,r.jsx)(n.th,{children:"Instance count"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"Coordinator"}),(0,r.jsx)(n.td,{children:"16+ cores"}),(0,r.jsx)(n.td,{children:"32+ GB"}),(0,r.jsx)(n.td,{children:"SSD"}),(0,r.jsx)(n.td,{children:"10 Gbps NIC (2 preferred)"}),(0,r.jsx)(n.td,{children:"2+"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"Segment"}),(0,r.jsx)(n.td,{children:"8+ cores"}),(0,r.jsx)(n.td,{children:"32+ GB"}),(0,r.jsx)(n.td,{children:"SSD"}),(0,r.jsx)(n.td,{children:"10 Gbps NIC (2 preferred)"}),(0,r.jsx)(n.td,{children:"2+"})]})]})]}),"\n",(0,r.jsx)(n.p,{children:"Apache Cloudberry can also be deployed on public cloud platforms such as AWS, Azure, and GCP. The hardware requirements for cloud-based deployments might vary based on the instance types selected on these platforms. Refer to the specific cloud provider\u2019s documentation for instance configurations that meet or exceed the recommended hardware specifications."}),"\n",(0,r.jsx)(n.h3,{id:"storage",children:"Storage"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"To prevent a high data disk load from affecting the operating system's normal I/O response, mount the operating system and the data disk on separate disks."}),"\n",(0,r.jsx)(n.li,{children:"If the host configuration allows, it is recommended to use 2 independent SAS disks as the system disk (RAID1), and another 10 SAS disks as the data disk (RAID5)."}),"\n",(0,r.jsx)(n.li,{children:"It is recommended to use LVM logical volumes to manage disks for more flexible disk configuration."}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"For the system disk: The system disk should use an independent disk to avoid impact on the operating system when data disks are heavily loaded. It is recommended that the system disk be configured in dual-disk RAID 1 and the operating system of the system disk be XFS."}),"\n",(0,r.jsx)(n.p,{children:"For data disks: It is recommended to use LVM to manage data disks. According to test statistics, creating an independent logical volume for each physical volume can achieve the best disk performance. For example:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"pvcreate /dev/vdb\npvcreate /dev/vdc\npvcreate /dev/vdd\nvgcreate data /dev/vdb /dev/vdc /dev/vdd\nlvcreate --extents 100%pvs -n data0 data /dev/vdb\nlvcreate --extents 100%pvs -n data1 data /dev/vdc\nlvcreate --extents 100%pvs -n data2 data /dev/vdd \n"})}),"\n",(0,r.jsxs)(n.p,{children:["The names of mount points must be consecutive, and the mount points of data disks should be ",(0,r.jsx)(n.code,{children:"/data0"}),", ",(0,r.jsx)(n.code,{children:"/data1"}),", ..., ",(0,r.jsx)(n.code,{children:"/dataN"}),". Data disks should use the XFS file format. For example:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"mkdir -p /data0 /data1 /data2\nmkfs.xfs /dev/data/data0\nmkfs.xfs /dev/data/data1\nmkfs.xfs /dev/data/data2\nmount /dev/data/data0 /data0/\nmount /dev/data/data1 /data1/\nmount /dev/data/data2 /data2/ \n"})}),"\n",(0,r.jsx)(n.h2,{id:"data-exchange-network",children:"Data exchange network"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Network card configuration"})}),"\n",(0,r.jsx)(n.p,{children:"The data exchange network is used for transmitting business data, which has high requirements on network performance and throughput. In a production environment, two 10 Gbps NICs are generally required, and they will be used after bonding. The recommended bond 4 parameter are as follows:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"BONDING_OPTS='mode=4 miimon=100 xmit_hash_policy=layer3+4'\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Connectivity requirements"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Connect the management console and the database host in the data exchange network. If there is a firewall device between the management console and the database host, ensure that the TCP idle connection can be kept for more than 12 hours."}),"\n",(0,r.jsx)(n.li,{children:"Connect database hosts and management console hosts in the data exchange network, and do not limit the TCP idle connection time."}),"\n",(0,r.jsx)(n.li,{children:"Connect database clients and application programs that access the database with the database coordinator node in the data exchange network."}),"\n",(0,r.jsx)(n.li,{children:"Ensure that the TCP idle connection can be kept for more than 12 hours."}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Default gateway"})}),"\n",(0,r.jsx)(n.p,{children:"If the host is configured with a management network, the network card (bond0) of the data exchange network should be used as the default gateway device; otherwise, it might cause abnormal traffic monitoring of the host network, deployment failure, and performance problems. The following is an example of viewing the default gateway."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"netstat -rn | grep ^0.0.0.0\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Switch"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Make sure that the egress bandwidth of the data network switch from layer 1 to layer 2 is no lower than the maximum disk I/O throughput capacity of a single cabinet (calculated with a single RAID card of 500 MBps)."}),"\n",(0,r.jsx)(n.li,{children:"A switch convergence ratio of 4:1 is recommended. When the convergence ratio reaches 6:1, most links will be saturated. Significant packet loss occurs when the convergence ratio reaches 8:1."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"software-requirements",children:"Software requirements"}),"\n",(0,r.jsx)(n.h3,{id:"supported-os",children:"Supported OS"}),"\n",(0,r.jsx)(n.p,{children:"Apache Cloudberry supports the following operating systems:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Kylin V10 SP1 or SP2"}),"\n",(0,r.jsx)(n.li,{children:"NeoKylin V7update6"}),"\n",(0,r.jsx)(n.li,{children:"RHEL/CentOS 7.6+"}),"\n",(0,r.jsx)(n.li,{children:"openEuler 20.3 LTS SP2"}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"os-configurations",children:"OS configurations"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"SSH configuration"}),"\n",(0,r.jsxs)(n.p,{children:["The recommended configuration for the SSH server side (",(0,r.jsx)(n.code,{children:"/etc/ssh/sshd_config"}),") is as follows. After the configuration is complete, run ",(0,r.jsx)(n.code,{children:"systemctl restart sshd.service"})," to make it effective."]}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"Parameter"}),(0,r.jsx)(n.th,{children:"Value"}),(0,r.jsx)(n.th,{children:"Description"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"Port"}),(0,r.jsx)(n.td,{children:"22"}),(0,r.jsx)(n.td,{children:"Listening port."})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"PasswordAuthentication"}),(0,r.jsx)(n.td,{children:"yes"}),(0,r.jsx)(n.td,{children:"Allows password login, which can be changed after cluster initialization."})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"PermitEmptyPass words"}),(0,r.jsx)(n.td,{children:"no"}),(0,r.jsx)(n.td,{children:"Empty password is not allowed for login."})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"UseDNS"}),(0,r.jsx)(n.td,{children:"no"}),(0,r.jsx)(n.td,{children:"DNS is not used."})]})]})]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"ssh-password-free-login",children:"SSH password-free login"}),"\n",(0,r.jsx)(n.p,{children:"Configure SSH password-free login for all nodes. For example:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"ssh-keygen -t rsa\nssh-copy-id root@192.168.66.154 \n"})})]})}function h(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}},11151:(e,n,t)=>{t.d(n,{Z:()=>i,a:()=>a});var r=t(67294);const s={},d=r.createContext(s);function a(e){const n=r.useContext(d);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),r.createElement(d.Provider,{value:n},e.children)}}}]);