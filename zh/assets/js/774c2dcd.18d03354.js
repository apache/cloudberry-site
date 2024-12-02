"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[7956],{88738:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>a,contentTitle:()=>l,default:()=>t,frontMatter:()=>r,metadata:()=>i,toc:()=>h});var d=s(85893),c=s(11151);const r={title:"\u90e8\u7f72\u524d\u51c6\u5907"},l="\u7269\u7406\u673a\u90e8\u7f72\u524d\u51c6\u5907\u5de5\u4f5c",i={id:"cbdb-op-prepare-to-deploy",title:"\u90e8\u7f72\u524d\u51c6\u5907",description:"\u5728\u7269\u7406\u673a\u4e0a\u90e8\u7f72 Cloudberry Database \u524d\uff0c\u4f60\u9700\u8981\u505a\u4e00\u4e9b\u51c6\u5907\u5de5\u4f5c\u3002\u5728\u5f00\u59cb\u90e8\u7f72\u4e4b\u524d\uff0c\u8bf7\u9605\u8bfb\u672c\u6587\u6863\u4ee5\u53ca\u8f6f\u786c\u4ef6\u914d\u7f6e\u8981\u6c42\u3002",source:"@site/i18n/zh/docusaurus-plugin-content-docs/current/cbdb-op-prepare-to-deploy.md",sourceDirName:".",slug:"/cbdb-op-prepare-to-deploy",permalink:"/zh/docs/cbdb-op-prepare-to-deploy",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/i18n/zh/docusaurus-plugin-content-docs/current/cbdb-op-prepare-to-deploy.md",tags:[],version:"current",lastUpdatedBy:"vitalzf",lastUpdatedAt:1733108055,formattedLastUpdatedAt:"2024\u5e7412\u67082\u65e5",frontMatter:{title:"\u90e8\u7f72\u524d\u51c6\u5907"},sidebar:"docsbars",previous:{title:"\u8f6f\u786c\u4ef6\u914d\u7f6e\u9700\u6c42",permalink:"/zh/docs/cbdb-op-software-hardware"},next:{title:"\u901a\u8fc7 RPM \u5305\u624b\u52a8\u90e8\u7f72",permalink:"/zh/docs/cbdb-op-deploy-guide"}},a={},h=[{value:"\u89c4\u5212\u90e8\u7f72\u67b6\u6784",id:"\u89c4\u5212\u90e8\u7f72\u67b6\u6784",level:2},{value:"\u4fee\u6539\u670d\u52a1\u5668\u8bbe\u7f6e",id:"\u4fee\u6539\u670d\u52a1\u5668\u8bbe\u7f6e",level:2},{value:"\u4fee\u6539\u4e3b\u673a\u540d",id:"\u4fee\u6539\u4e3b\u673a\u540d",level:3},{value:"\u65b0\u589e <code>gpadmin</code> \u7ba1\u7406\u7528\u6237",id:"\u65b0\u589e-gpadmin-\u7ba1\u7406\u7528\u6237",level:3},{value:"\u7981\u7528 SELinux \u548c\u9632\u706b\u5899\u8f6f\u4ef6",id:"\u7981\u7528-selinux-\u548c\u9632\u706b\u5899\u8f6f\u4ef6",level:3},{value:"\u4fee\u6539\u7f51\u7edc\u6620\u5c04",id:"\u4fee\u6539\u7f51\u7edc\u6620\u5c04",level:3},{value:"\u8bbe\u7f6e\u7cfb\u7edf\u53c2\u6570",id:"\u8bbe\u7f6e\u7cfb\u7edf\u53c2\u6570",level:3},{value:"\u5171\u4eab\u5185\u5b58\u8bbe\u7f6e",id:"\u5171\u4eab\u5185\u5b58\u8bbe\u7f6e",level:4},{value:"Segment \u7684\u5185\u5b58\u8bbe\u7f6e",id:"segment-\u7684\u5185\u5b58\u8bbe\u7f6e",level:4},{value:"\u7aef\u53e3\u8bbe\u7f6e",id:"\u7aef\u53e3\u8bbe\u7f6e",level:4},{value:"IP \u5206\u6bb5\u8bbe\u7f6e",id:"ip-\u5206\u6bb5\u8bbe\u7f6e",level:4},{value:"\u7cfb\u7edf\u5185\u5b58",id:"\u7cfb\u7edf\u5185\u5b58",level:4},{value:"\u8d44\u6e90\u9650\u5236\u8bbe\u7f6e",id:"\u8d44\u6e90\u9650\u5236\u8bbe\u7f6e",level:4},{value:"CORE DUMP \u8bbe\u7f6e",id:"core-dump-\u8bbe\u7f6e",level:4},{value:"\u4e3a XFS \u6587\u4ef6\u7cfb\u7edf\u8bbe\u7f6e\u6302\u8f7d\u9009\u9879",id:"\u4e3a-xfs-\u6587\u4ef6\u7cfb\u7edf\u8bbe\u7f6e\u6302\u8f7d\u9009\u9879",level:4},{value:"\u9884\u8bfb\u503c\u8bbe\u7f6e",id:"\u9884\u8bfb\u503c\u8bbe\u7f6e",level:4},{value:"\u78c1\u76d8\u7684 I/O \u8c03\u5ea6\u7b56\u7565\u8bbe\u7f6e",id:"\u78c1\u76d8\u7684-io-\u8c03\u5ea6\u7b56\u7565\u8bbe\u7f6e",level:4},{value:"\u7981\u7528\u900f\u660e\u5927\u9875\u9762 (THP)",id:"\u7981\u7528\u900f\u660e\u5927\u9875\u9762-thp",level:4},{value:"\u7981\u7528 IPC \u5bf9\u8c61\u5220\u9664",id:"\u7981\u7528-ipc-\u5bf9\u8c61\u5220\u9664",level:4},{value:"SSH \u8fde\u63a5\u6570\u9608\u503c\u8bbe\u7f6e",id:"ssh-\u8fde\u63a5\u6570\u9608\u503c\u8bbe\u7f6e",level:4},{value:"\u65f6\u949f\u540c\u6b65\u8bbe\u7f6e",id:"\u65f6\u949f\u540c\u6b65\u8bbe\u7f6e",level:4}];function o(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,c.a)(),...e.components};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(n.h1,{id:"\u7269\u7406\u673a\u90e8\u7f72\u524d\u51c6\u5907\u5de5\u4f5c",children:"\u7269\u7406\u673a\u90e8\u7f72\u524d\u51c6\u5907\u5de5\u4f5c"}),"\n",(0,d.jsxs)(n.p,{children:["\u5728\u7269\u7406\u673a\u4e0a\u90e8\u7f72 Cloudberry Database \u524d\uff0c\u4f60\u9700\u8981\u505a\u4e00\u4e9b\u51c6\u5907\u5de5\u4f5c\u3002\u5728\u5f00\u59cb\u90e8\u7f72\u4e4b\u524d\uff0c\u8bf7\u9605\u8bfb\u672c\u6587\u6863\u4ee5\u53ca",(0,d.jsx)(n.a,{href:"/zh/docs/cbdb-op-software-hardware",children:"\u8f6f\u786c\u4ef6\u914d\u7f6e\u8981\u6c42"}),"\u3002"]}),"\n",(0,d.jsx)(n.h2,{id:"\u89c4\u5212\u90e8\u7f72\u67b6\u6784",children:"\u89c4\u5212\u90e8\u7f72\u67b6\u6784"}),"\n",(0,d.jsxs)(n.p,{children:["\u6839\u636e ",(0,d.jsx)(n.a,{href:"/zh/docs/cbdb-architecture",children:"Cloudberry Database \u67b6\u6784"}),"\u548c",(0,d.jsx)(n.a,{href:"/zh/docs/cbdb-op-software-hardware",children:"\u8f6f\u786c\u4ef6\u914d\u7f6e\u8981\u6c42"}),"\u89c4\u5212\u90e8\u7f72\u67b6\u6784\uff0c\u786e\u5b9a\u6240\u9700\u7684\u670d\u52a1\u5668\u6570\u91cf\u3002\u786e\u4fdd\u6240\u6709\u7684\u670d\u52a1\u5668\u90fd\u5728\u4e00\u4e2a\u5b89\u5168\u7ec4\u5185\uff0c\u5e76\u4e14\u914d\u7f6e\u4e86\u4e92\u4fe1\u3002"]}),"\n",(0,d.jsx)(n.p,{children:"\u672c\u6587\u793a\u4f8b\u7684\u90e8\u7f72\u89c4\u5212\u4e3a 1 Coordinator + 1 Standby + 3 Segment (Primary + Mirror)\uff0c\u5171 5 \u53f0\u670d\u52a1\u5668\u3002"}),"\n",(0,d.jsx)(n.h2,{id:"\u4fee\u6539\u670d\u52a1\u5668\u8bbe\u7f6e",children:"\u4fee\u6539\u670d\u52a1\u5668\u8bbe\u7f6e"}),"\n",(0,d.jsx)(n.p,{children:"\u4f7f\u7528 root \u7528\u6237\u767b\u5f55\u6bcf\u53f0\u4e3b\u673a\uff0c\u6309\u7167\u4ee5\u4e0b\u7ae0\u8282\u7684\u987a\u5e8f\uff0c\u4f9d\u6b21\u4fee\u6539\u5404\u8282\u70b9\u4e3b\u673a\u7684\u8bbe\u7f6e\u3002"}),"\n",(0,d.jsx)(n.h3,{id:"\u4fee\u6539\u4e3b\u673a\u540d",children:"\u4fee\u6539\u4e3b\u673a\u540d"}),"\n",(0,d.jsxs)(n.p,{children:["\u4f7f\u7528 ",(0,d.jsx)(n.code,{children:"hostnamectl set-hostname"})," \u547d\u4ee4\u5206\u522b\u4fee\u6539\u6bcf\u53f0\u4e3b\u673a\u7684 hostname\uff0c\u987b\u6ee1\u8db3\u4ee5\u4e0b\u547d\u540d\u89c4\u5219\uff1a"]}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsxs)(n.li,{children:["\u53ea\u5305\u62ec\u82f1\u6587\u5b57\u6bcd\u3001\u6570\u5b57\u548c\u8fde\u63a5\u7b26 ",(0,d.jsx)(n.code,{children:"-"}),"\u3002\u6ce8\u610f\uff1a\u4e0b\u5212\u7ebf ",(0,d.jsx)(n.code,{children:"_"})," \u4e0d\u662f\u5408\u6cd5\u5b57\u7b26\u3002"]}),"\n",(0,d.jsx)(n.li,{children:"\u4e0d\u533a\u5206\u5927\u5c0f\u5199\uff0c\u5efa\u8bae\u5168\u90e8\u4f7f\u7528\u5c0f\u5199\u5b57\u6bcd\u3002\u4f7f\u7528\u5927\u5199\u5b57\u6bcd\u4f5c\u4e3a\u4e3b\u673a\u540d\uff0c\u53ef\u80fd\u4f1a\u5bfc\u81f4 Kerberos \u8ba4\u8bc1\u5931\u8d25\u3002"}),"\n",(0,d.jsx)(n.li,{children:"\u6240\u6709\u4e3b\u673a\u4e2d\uff0c\u6bcf\u53f0\u4e3b\u673a\u540d\u5fc5\u987b\u5168\u5c40\u552f\u4e00\u3002"}),"\n"]}),"\n",(0,d.jsx)(n.p,{children:"\u793a\u4f8b\u5982\u4e0b\uff1a"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"hostnamectl set-hostname cbdb-coordinator\nhostnamectl set-hostname cbdb-standbycoordinator\nhostnamectl set-hostname cbdb-datanode01\nhostnamectl set-hostname cbdb-datanode02\nhostnamectl set-hostname cbdb-datanode03\n"})}),"\n",(0,d.jsxs)(n.h3,{id:"\u65b0\u589e-gpadmin-\u7ba1\u7406\u7528\u6237",children:["\u65b0\u589e ",(0,d.jsx)(n.code,{children:"gpadmin"})," \u7ba1\u7406\u7528\u6237"]}),"\n",(0,d.jsxs)(n.p,{children:["\u53c2\u8003\u4ee5\u4e0b\u793a\u4f8b\uff0c\u521b\u5efa\u7528\u6237\u7ec4\u548c\u7528\u6237\u540d ",(0,d.jsx)(n.code,{children:"gpadmin"}),"\uff0c\u5c06\u7528\u6237\u7ec4\u548c\u7528\u6237\u540d\u7684\u6807\u8bc6\u53f7\u8bbe\u4e3a ",(0,d.jsx)(n.code,{children:"520"}),"\uff0c\u521b\u5efa\u5e76\u6307\u5b9a\u4e3b\u76ee\u5f55 ",(0,d.jsx)(n.code,{children:"/home/gpadmin/"}),"\u3002"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"groupadd -g 520 gpadmin  # \u6dfb\u52a0\u7528\u6237\u7ec4 gpadmin\nuseradd -g 520 -u 520 -m -d /home/gpadmin/ -s /bin/bash gpadmin  # \u6dfb\u52a0\u7528\u6237\u540d gpadmin \u5e76\u521b\u5efa\u4e3b\u76ee\u5f55\u3002\npasswd gpadmin  # \u4e3a gpadmin \u8bbe\u7f6e\u5bc6\u7801\uff0c\u6267\u884c\u540e\uff0c\u6309\u7167\u63d0\u793a\u8f93\u51fa\u5bc6\u7801\u3002\n"})}),"\n",(0,d.jsx)(n.h3,{id:"\u7981\u7528-selinux-\u548c\u9632\u706b\u5899\u8f6f\u4ef6",children:"\u7981\u7528 SELinux \u548c\u9632\u706b\u5899\u8f6f\u4ef6"}),"\n",(0,d.jsxs)(n.p,{children:["\u6267\u884c ",(0,d.jsx)(n.code,{children:"systemctl status firewalld"})," \u67e5\u770b\u9632\u706b\u5899\u72b6\u6001\u3002\u5982\u679c\u9632\u706b\u5899\u5904\u4e8e\u5f00\u542f\u72b6\u6001\uff0c\u4f60\u9700\u8981\u5173\u95ed\u9632\u706b\u5899\uff0c\u5373\u5728 ",(0,d.jsx)(n.code,{children:"/etc/selinux/config"})," \u6587\u4ef6\u4e2d\u5c06 ",(0,d.jsx)(n.code,{children:"SELINUX"})," \u53c2\u6570\u8bbe\u4e3a ",(0,d.jsx)(n.code,{children:"disabled"}),"\u3002"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"SELINUX=disabled\n"})}),"\n",(0,d.jsx)(n.p,{children:"\u4f60\u8fd8\u53ef\u4ee5\u4f7f\u7528\u4ee5\u4e0b\u547d\u4ee4\u7981\u7528\u9632\u706b\u5899\uff1a"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"systemctl stop firewalld.service\nsystemctl disable firewalld.service\n"})}),"\n",(0,d.jsx)(n.h3,{id:"\u4fee\u6539\u7f51\u7edc\u6620\u5c04",children:"\u4fee\u6539\u7f51\u7edc\u6620\u5c04"}),"\n",(0,d.jsxs)(n.p,{children:["\u68c0\u67e5 ",(0,d.jsx)(n.code,{children:"/etc/hosts"})," \u6587\u4ef6\uff0c\u786e\u4fdd\u8be5\u6587\u4ef6\u5305\u542b Cloudberry Database \u6240\u6709\u4e3b\u673a\u522b\u540d\u4e0e\u5176\u7f51\u7edc IP \u5730\u5740\u7684\u6620\u5c04\u3002\u793a\u4f8b\u5982\u4e0b\uff1a"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{children:"192.168.1.101  cbdb-coordinator\n192.168.1.102  cbdb-standbycoordinator\n192.168.1.103  cbdb-datanode01\n192.168.1.104  cbdb-datanode02\n192.168.1.105  cbdb-datanode03\n"})}),"\n",(0,d.jsx)(n.h3,{id:"\u8bbe\u7f6e\u7cfb\u7edf\u53c2\u6570",children:"\u8bbe\u7f6e\u7cfb\u7edf\u53c2\u6570"}),"\n",(0,d.jsxs)(n.p,{children:["\u7f16\u8f91 ",(0,d.jsx)(n.code,{children:"/etc/sysctl.conf"})," \u914d\u7f6e\u6587\u4ef6\uff0c\u5728\u914d\u7f6e\u6587\u4ef6\u4e2d\u6dfb\u52a0\u76f8\u5173\u7cfb\u7edf\u53c2\u6570\uff0c\u5e76\u6267\u884c ",(0,d.jsx)(n.code,{children:"sysctl -p"})," \u547d\u4ee4\u8ba9\u914d\u7f6e\u6587\u4ef6\u751f\u6548\u3002"]}),"\n",(0,d.jsx)(n.p,{children:"\u4ee5\u4e0b\u914d\u7f6e\u53c2\u6570\u4ec5\u4f9b\u53c2\u8003\uff0c\u8bf7\u6309\u5b9e\u9645\u9700\u8981\u8fdb\u884c\u8bbe\u7f6e\u3002\u4e0b\u6587\u4ecb\u7ecd\u4e86\u5176\u4e2d\u4e00\u4e9b\u914d\u7f6e\u53c2\u6570\u7684\u8be6\u7ec6\u4fe1\u606f\u4ee5\u53ca\u63a8\u8350\u8bbe\u7f6e\u3002"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-conf",children:"# kernel.shmall = _PHYS_PAGES / 2\nkernel.shmall = 197951838\n# kernel.shmmax = kernel.shmall * PAGE_SIZE\nkernel.shmmax = 810810728448\nkernel.shmmni = 4096\nvm.overcommit_memory = 2\nvm.overcommit_ratio = 95\nnet.ipv4.ip_local_port_range = 10000 65535\nkernel.sem = 250 2048000 200 8192\nkernel.sysrq = 1\nkernel.core_uses_pid = 1\nkernel.msgmnb = 65536\nkernel.msgmax = 65536\nkernel.msgmni = 2048\nnet.ipv4.tcp_syncookies = 1\nnet.ipv4.conf.default.accept_source_route = 0\nnet.ipv4.tcp_max_syn_backlog = 4096\nnet.ipv4.conf.all.arp_filter = 1\nnet.ipv4.ipfrag_high_thresh = 41943040\nnet.ipv4.ipfrag_low_thresh = 31457280\nnet.ipv4.ipfrag_time = 60\nnet.core.netdev_max_backlog = 10000\nnet.core.rmem_max = 2097152\nnet.core.wmem_max = 2097152\nvm.swappiness = 10\nvm.zone_reclaim_mode = 0\nvm.dirty_expire_centisecs = 500\nvm.dirty_writeback_centisecs = 100\nvm.dirty_background_ratio = 0\nvm.dirty_ratio = 0\nvm.dirty_background_bytes = 1610612736\nvm.dirty_bytes = 4294967296\n"})}),"\n",(0,d.jsx)(n.h4,{id:"\u5171\u4eab\u5185\u5b58\u8bbe\u7f6e",children:"\u5171\u4eab\u5185\u5b58\u8bbe\u7f6e"}),"\n",(0,d.jsxs)(n.p,{children:["\u5728 ",(0,d.jsx)(n.code,{children:"/etc/sysctl.conf"})," \u914d\u7f6e\u6587\u4ef6\u4e2d\uff0c",(0,d.jsx)(n.code,{children:"kernel.shmall"})," \u8868\u793a\u53ef\u7528\u5171\u4eab\u5185\u5b58\u7684\u603b\u91cf\uff0c\u5355\u4f4d\u662f\u9875\u3002",(0,d.jsx)(n.code,{children:"kernel.shmmax"})," \u8868\u793a\u5355\u4e2a\u5171\u4eab\u5185\u5b58\u6bb5\u7684\u6700\u5927\u503c\uff0c\u4ee5\u5b57\u8282\u4e3a\u5355\u4f4d\u3002"]}),"\n",(0,d.jsxs)(n.p,{children:["\u4f60\u53ef\u4ee5\u4f7f\u7528\u64cd\u4f5c\u7cfb\u7edf\u7684 ",(0,d.jsx)(n.code,{children:"_PHYS_PAGES"})," \u548c ",(0,d.jsx)(n.code,{children:"PAGE_SIZE"})," \u4e24\u4e2a\u53c2\u6570\u6765\u5b9a\u4e49\u8fd9\u4e24\u4e2a\u503c\uff1a"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-conf",children:"kernel.shmall = ( _PHYS_PAGES / 2) \nkernel.shmmax = ( _PHYS_PAGES / 2) * PAGE_SIZE\n"})}),"\n",(0,d.jsxs)(n.p,{children:["\u8981\u83b7\u53d6\u8fd9\u4e24\u4e2a\u64cd\u4f5c\u7cfb\u7edf\u53c2\u6570\u7684\u503c\uff0c\u4f60\u53ef\u4ee5\u4f7f\u7528 ",(0,d.jsx)(n.code,{children:"getconf"})," \uff0c\u793a\u4f8b\u5982\u4e0b\uff1a"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"$ echo $(expr $(getconf _PHYS_PAGES) / 2) \n$ echo $(expr $(getconf _PHYS_PAGES) / 2 \\* $(getconf PAGE_SIZE))\n"})}),"\n",(0,d.jsx)(n.h4,{id:"segment-\u7684\u5185\u5b58\u8bbe\u7f6e",children:"Segment \u7684\u5185\u5b58\u8bbe\u7f6e"}),"\n",(0,d.jsxs)(n.p,{children:["\u5728 ",(0,d.jsx)(n.code,{children:"/etc/sysctl.conf"})," \u914d\u7f6e\u6587\u4ef6\u4e2d\uff0c"]}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"vm.overcommit_memory"})," \u662f\u4e00\u4e2a Linux \u5185\u6838\u53c2\u6570\u3002\u4f7f\u7528\u8be5\u53c2\u6570\u6307\u5b9a\u5bf9\u5185\u5b58\u8fc7\u5ea6\u4f7f\u7528\u7684\u5904\u7406\u65b9\u5f0f\u3002\u53ef\u9009\u503c\u5982\u4e0b\uff1a"]}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"0"}),": \u63a2\u7d22\u5f0f\u5904\u7406\uff0c\u5373\u9884\u4f30\u53ef\u7528\u5185\u5b58\u5e76\u62d2\u7edd\u5360\u7528\u5185\u5b58\u8fc7\u5927\u7684\u8bf7\u6c42\u3002"]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"1"}),": \u5141\u8bb8\u8fc7\u5ea6\u4f7f\u7528\u3002"]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"2"}),": \u62d2\u7edd\u8fc7\u5ea6\u4f7f\u7528\u3002"]}),"\n"]}),"\n",(0,d.jsxs)(n.p,{children:["\u5c06 ",(0,d.jsx)(n.code,{children:"vm.overcommit_memory"}),"\xa0\u8bbe\u7f6e\u4e3a\xa0",(0,d.jsx)(n.code,{children:"2"}),"\uff0c\u5373\u62d2\u7edd\u8fc7\u5ea6\u4f7f\u7528\u3002"]}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"vm.overcommit_ratio"})," \u662f\u4e00\u4e2a\u5185\u6838\u53c2\u6570\uff0c\u662f\u5e94\u7528\u8fdb\u7a0b\u5360\u7528 RAM \u7684\u767e\u5206\u6bd4\u3002\u5728 CentOS \u4e0a\u9ed8\u8ba4\u503c\u4e3a ",(0,d.jsx)(n.code,{children:"50"}),"\u3002",(0,d.jsx)(n.code,{children:"vm.overcommit_ratio"})," \u7684\u8ba1\u7b97\u516c\u5f0f\u5982\u4e0b\uff1a"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{children:"vm.overcommit_ratio = (RAM - 0.026 * gp_vmem) / RAM\n"})}),"\n",(0,d.jsxs)(n.p,{children:["\u5176\u4e2d ",(0,d.jsx)(n.code,{children:"gp_vmem"})," \u7684\u8ba1\u7b97\u65b9\u6cd5\u5982\u4e0b\uff1a"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{children:"# \u5982\u679c\u7cfb\u7edf\u5185\u5b58\u4f4e\u4e8e 256 GB, \u4f7f\u7528\u5982\u4e0b\u516c\u5f0f\u8ba1\u7b97\uff1a\ngp_vmem = ((SWAP + RAM) \u2013 (7.5GB + 0.05 * RAM)) / 1.7\n\n# \u5982\u679c\u7cfb\u7edf\u5185\u5b58\u5927\u4e8e\u7b49\u4e8e 256 GB, \u4f7f\u7528\u5982\u4e0b\u516c\u5f0f\u8ba1\u7b97\uff1a\ngp_vmem = ((SWAP + RAM) \u2013 (7.5GB + 0.05 * RAM)) / 1.17\n\n# \u4ee5\u4e0a\u516c\u5f0f\u4e2d\uff0cSWAP \u662f\u4e3b\u673a\u4e0a\u7684\u4ea4\u6362\u7a7a\u95f4\uff0c\u4ee5 GB \u4e3a\u5355\u4f4d\u3002\n# RAM \u662f\u4e3b\u673a\u4e0a\u5b89\u88c5\u7684\u5185\u5b58\u5927\u5c0f\uff0c\u4ee5 GB \u4e3a\u5355\u4f4d\u3002\n"})}),"\n"]}),"\n"]}),"\n",(0,d.jsx)(n.h4,{id:"\u7aef\u53e3\u8bbe\u7f6e",children:"\u7aef\u53e3\u8bbe\u7f6e"}),"\n",(0,d.jsxs)(n.p,{children:["\u5728 ",(0,d.jsx)(n.code,{children:"/etc/sysctl.conf"})," \u914d\u7f6e\u6587\u4ef6\u4e2d\uff0c",(0,d.jsx)(n.code,{children:"net.ipv4.ip_local_port_range"})," \u7528\u4e8e\u6307\u5b9a\u7aef\u53e3\u8303\u56f4\u3002\u4e3a\u4e86\u907f\u514d Cloudberry Database \u4e0e\u5176\u4ed6\u5e94\u7528\u7a0b\u5e8f\u4e4b\u95f4\u51fa\u73b0\u7aef\u53e3\u51b2\u7a81\uff0c\u9700\u8981\u901a\u8fc7\u64cd\u4f5c\u7cfb\u7edf\u53c2\u6570\u6307\u5b9a\u7aef\u53e3\u8303\u56f4\u3002\u5728\u540e\u7eed\u8bbe\u7f6e Cloudberry Database \u521d\u59cb\u5316\u53c2\u6570\u65f6\u5019\uff0c\u8bf7\u52ff\u4f7f\u7528\u8fd9\u4e2a\u8303\u56f4\u7684\u7aef\u53e3\u3002"]}),"\n",(0,d.jsxs)(n.p,{children:["\u5047\u8bbe ",(0,d.jsx)(n.code,{children:"net.ipv4.ip_local_port_range = 10000 65535"}),"\uff0c\u90a3\u4e48 Cloudberry Database \u76f8\u5173\u7684\u7aef\u53e3\u5e94\u907f\u514d\u8bbe\u7f6e\u5728\u533a\u95f4 ",(0,d.jsx)(n.code,{children:"[10000,65535]"})," \u5185\uff0c\u53ef\u4ee5\u8bbe\u7f6e\u4e3a ",(0,d.jsx)(n.code,{children:"6000"})," \u548c ",(0,d.jsx)(n.code,{children:"7000"}),"\uff0c\u793a\u4f8b\u5982\u4e0b\uff1a"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{children:"PORT_BASE = 6000 \nMIRROR_PORT_BASE = 7000\n"})}),"\n",(0,d.jsx)(n.h4,{id:"ip-\u5206\u6bb5\u8bbe\u7f6e",children:"IP \u5206\u6bb5\u8bbe\u7f6e"}),"\n",(0,d.jsx)(n.p,{children:"\u5f53 Cloudberry Database \u5185\u90e8\u8fde\u63a5\u4f7f\u7528 UDP \u534f\u8bae\uff0c\u7f51\u5361\u4f1a\u63a7\u5236 IP \u6570\u636e\u5305\u7684\u5206\u6bb5\u548c\u91cd\u7ec4\u3002\u5982\u679c UDP \u6d88\u606f\u7684\u5927\u5c0f\u5927\u4e8e\u7f51\u7edc\u6700\u5927\u4f20\u8f93\u5355\u5143 (MTU) \u7684\u5927\u5c0f\uff0cIP \u5c42\u4f1a\u5bf9\u6d88\u606f\u8fdb\u884c\u5206\u6bb5\u3002"}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"net.ipv4.ipfrag_high_thresh"}),"\uff1a\u5f53 IP \u5206\u7247\u7684\u603b\u5927\u5c0f\u8d85\u8fc7\u8be5\u9608\u503c\u65f6\uff0c\u5185\u6838\u5c06\u5c1d\u8bd5\u5bf9 IP \u5206\u7247\u8fdb\u884c\u91cd\u7ec4\u3002\u5982\u679c\u5206\u7247\u8d85\u8fc7\u4e86\u8fd9\u4e2a\u9608\u503c\uff0c\u4f46\u5168\u90e8\u7247\u6bb5\u5728\u89c4\u5b9a\u7684\u65f6\u95f4\u5185\u4ecd\u672a\u5230\u8fbe\uff0c\u5185\u6838\u5219\u4e0d\u4f1a\u91cd\u7ec4\u8fd9\u4e9b\u5206\u7247\u3002\u8be5\u9608\u503c\u901a\u5e38\u7528\u4e8e\u63a7\u5236\u662f\u5426\u5bf9\u8f83\u5927\u7684\u5206\u7247\u8fdb\u884c\u91cd\u7ec4\u3002\u9ed8\u8ba4\u503c\u4e3a ",(0,d.jsx)(n.code,{children:"4194304"})," \u5b57\u8282\uff08\u5373 4 MB\uff09\u3002"]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"net.ipv4.ipfrag_low_thresh"}),"\uff1a\u8868\u793a\u5f53 IP \u5206\u7247\u7684\u603b\u5927\u5c0f\u4f4e\u4e8e\u8be5\u9608\u503c\u65f6\uff0c\u5185\u6838\u5c06\u5c3d\u53ef\u80fd\u5730\u7b49\u5f85\u66f4\u591a\u5206\u7247\u5230\u8fbe\uff0c\u4ee5\u4fbf\u8fdb\u884c\u66f4\u5927\u7684\u91cd\u7ec4\u3002\u8fd9\u4e2a\u9608\u503c\u7684\u76ee\u7684\u662f\u5c3d\u91cf\u51cf\u5c11\u672a\u5b8c\u6210\u7684\u91cd\u7ec4\u64cd\u4f5c\uff0c\u4ee5\u63d0\u9ad8\u7cfb\u7edf\u6027\u80fd\u3002\u9ed8\u8ba4\u503c\u4e3a ",(0,d.jsx)(n.code,{children:"3145728"})," \u5b57\u8282\uff083 MB\uff09\u3002"]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"net.ipv4.ipfrag_time"})," \u662f\u4e00\u4e2a\u63a7\u5236 IP \u5206\u7247\u91cd\u7ec4\u8d85\u65f6\u65f6\u95f4\u7684\u5185\u6838\u53c2\u6570\uff0c\u9ed8\u8ba4\u503c\u662f ",(0,d.jsx)(n.code,{children:"30"}),"\u3002"]}),"\n"]}),"\n",(0,d.jsx)(n.p,{children:"\u63a8\u8350\u5c06\u4ee5\u4e0a\u53c2\u6570\u8bbe\u4e3a\u5982\u4e0b\u503c\uff1a"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-conf",children:"net.ipv4.ipfrag_high_thresh = 41943040 \nnet.ipv4.ipfrag_low_thresh = 31457280 \nnet.ipv4.ipfrag_time = 60 \n"})}),"\n",(0,d.jsx)(n.h4,{id:"\u7cfb\u7edf\u5185\u5b58",children:"\u7cfb\u7edf\u5185\u5b58"}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsxs)(n.p,{children:["\u5982\u679c\u670d\u52a1\u5668\u5185\u5b58\u8d85\u8fc7 64 GB\uff0c\u5efa\u8bae\u5728 ",(0,d.jsx)(n.code,{children:"/etc/sysctl.conf"})," \u914d\u7f6e\u6587\u4ef6\u4e2d\u8fdb\u884c\u5982\u4e0b\u53c2\u6570\u8bbe\u7f6e\uff1a"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-conf",children:"vm.dirty_background_ratio = 0\nvm.dirty_ratio = 0\nvm.dirty_background_bytes = 1610612736 # 1.5GB\nvm.dirty_bytes = 4294967296 # 4GB\n"})}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsxs)(n.p,{children:["\u5982\u679c\u670d\u52a1\u5668\u5185\u5b58\u4f4e\u4e8e 64 GB\uff0c\u5219\u4e0d\u9700\u8981\u8bbe\u7f6e ",(0,d.jsx)(n.code,{children:"vm.dirty_background_bytes"})," \u548c ",(0,d.jsx)(n.code,{children:"vm.dirty_bytes"}),"\uff0c\u5efa\u8bae\u5728 ",(0,d.jsx)(n.code,{children:"/etc/sysctl.conf"})," \u914d\u7f6e\u6587\u4ef6\u4e2d\u8fdb\u884c\u5982\u4e0b\u53c2\u6570\u8bbe\u7f6e\uff1a"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-conf",children:"vm.dirty_background_ratio = 3 \nvm.dirty_ratio = 10\n"})}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsxs)(n.p,{children:["\u4e3a\u4e86\u5e94\u5bf9\u7cfb\u7edf\u51fa\u73b0\u5185\u5b58\u538b\u529b\u65f6\u7684\u7d27\u6025\u60c5\u51b5\uff0c\u5efa\u8bae\u5728 ",(0,d.jsx)(n.code,{children:"/etc/sysctl.conf"})," \u914d\u7f6e\u6587\u4ef6\u4e2d\u65b0\u589e ",(0,d.jsx)(n.code,{children:"vm.min_free_kbytes"})," \u53c2\u6570\uff0c\u7528\u4e8e\u63a7\u5236\u7cfb\u7edf\u4fdd\u7559\u7684\u53ef\u7528\u5185\u5b58\u91cf\u3002\u5efa\u8bae\u5c06 ",(0,d.jsx)(n.code,{children:"vm.min_free_kbytes"})," \u8bbe\u7f6e\u4e3a\u7cfb\u7edf\u7269\u7406\u5185\u5b58\u7684 3%\uff0c\u547d\u4ee4\u5982\u4e0b\uff1a"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:'awk \'BEGIN {OFMT = "%.0f";} /MemTotal/ {print "vm.min_free_kbytes =", $2 * .03;}\' /proc/meminfo >> /etc/sysctl.conf\n'})}),"\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"vm.min_free_kbytes"})," \u7684\u8bbe\u7f6e\u4e0d\u5efa\u8bae\u8d85\u8fc7\u7cfb\u7edf\u7269\u7406\u5185\u5b58\u7684 5%\u3002"]}),"\n"]}),"\n"]}),"\n",(0,d.jsx)(n.h4,{id:"\u8d44\u6e90\u9650\u5236\u8bbe\u7f6e",children:"\u8d44\u6e90\u9650\u5236\u8bbe\u7f6e"}),"\n",(0,d.jsxs)(n.p,{children:["\u7f16\u8f91 ",(0,d.jsx)(n.code,{children:"/etc/security/limits.conf"})," \u6587\u4ef6\u5e76\u6dfb\u52a0\u5982\u4e0b\u5185\u5bb9\uff0c\u8fd9\u5c06\u5bf9\u8f6f\u786c\u4ef6\u8d44\u6e90\u7528\u91cf\u8fdb\u884c\u9650\u5236\u3002"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{children:"*soft nofile 524288\n*hard nofile 524288\n*soft nproc 131072\n*hard nproc 131072\n"})}),"\n",(0,d.jsx)(n.h4,{id:"core-dump-\u8bbe\u7f6e",children:"CORE DUMP \u8bbe\u7f6e"}),"\n",(0,d.jsxs)(n.ol,{children:["\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsxs)(n.p,{children:["\u6dfb\u52a0\u4ee5\u4e0b\u53c2\u6570\u81f3 ",(0,d.jsx)(n.code,{children:"/etc/sysctl.conf"})," \u914d\u7f6e\u6587\u4ef6\uff1a"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-conf",children:"kernel.core_pattern=/var/core/core.%h.%t\n"})}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsx)(n.p,{children:"\u6267\u884c\u4ee5\u4e0b\u547d\u4ee4\u4f7f\u914d\u7f6e\u751f\u6548\uff1a"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"sysctl -p\n"})}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsxs)(n.p,{children:["\u6dfb\u52a0\u4ee5\u4e0b\u53c2\u6570\u81f3 ",(0,d.jsx)(n.code,{children:"/etc/security/limits.conf"}),"\uff1a"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{children:"* soft core unlimited\n"})}),"\n"]}),"\n"]}),"\n",(0,d.jsx)(n.h4,{id:"\u4e3a-xfs-\u6587\u4ef6\u7cfb\u7edf\u8bbe\u7f6e\u6302\u8f7d\u9009\u9879",children:"\u4e3a XFS \u6587\u4ef6\u7cfb\u7edf\u8bbe\u7f6e\u6302\u8f7d\u9009\u9879"}),"\n",(0,d.jsx)(n.p,{children:"XFS \u662f Cloudberry Database \u6570\u636e\u76ee\u5f55\u7684\u6587\u4ef6\u7cfb\u7edf\uff0cXFS \u4f7f\u7528\u4ee5\u4e0b\u9009\u9879\u8fdb\u884c\u6302\u8f7d\uff1a"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{children:"rw,nodev,noatime,inode64\n"})}),"\n",(0,d.jsxs)(n.p,{children:["\u4f60\u53ef\u4ee5\u5728 ",(0,d.jsx)(n.code,{children:"/etc/fstab"})," \u6587\u4ef6\u4e2d\u8bbe\u7f6e XFS \u6587\u4ef6\u6302\u8f7d\uff0c\u53c2\u8003\u5982\u4e0b\u547d\u4ee4\u3002\u4f60\u9700\u8981\u6839\u636e\u5b9e\u9645\u60c5\u51b5\u9009\u62e9\u6587\u4ef6\u8def\u5f84\uff1a"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:'mkdir -p /data0/\nmkfs.xfs -f /dev/vdc\necho "/dev/vdc /data0 xfs rw,nodev,noatime,nobarrier,inode64 0 0" >> /etc/fstab\nmount /data0\nchown -R gpadmin:gpadmin /data0/\n'})}),"\n",(0,d.jsx)(n.p,{children:"\u6267\u884c\u4ee5\u4e0b\u547d\u4ee4\u67e5\u770b\u6302\u8f7d\u662f\u5426\u6210\u529f\uff1a"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"df -h\n"})}),"\n",(0,d.jsx)(n.h4,{id:"\u9884\u8bfb\u503c\u8bbe\u7f6e",children:"\u9884\u8bfb\u503c\u8bbe\u7f6e"}),"\n",(0,d.jsxs)(n.p,{children:["\u6bcf\u4e2a\u78c1\u76d8\u8bbe\u5907\u6587\u4ef6\u7684\u9884\u8bfb (blockdev) \u503c\u5e94\u8be5\u662f ",(0,d.jsx)(n.code,{children:"16384"}),"\u3002\u8981\u9a8c\u8bc1\u78c1\u76d8\u8bbe\u5907\u7684\u9884\u8bfb\u53d6\u503c\uff0c\u4f60\u53ef\u4ee5\u4f7f\u7528\u4ee5\u4e0b\u547d\u4ee4\uff1a"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"sudo /sbin/blockdev --getra <devname>\n"})}),"\n",(0,d.jsx)(n.p,{children:"\u4f8b\u5982\uff0c\u9a8c\u8bc1\u672c\u6587\u793a\u4f8b\u670d\u52a1\u5668\u786c\u76d8\u7684\u6587\u4ef6\u9884\u8bfb\u503c\uff1a"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"sudo /sbin/blockdev --getra /dev/vdc\n"})}),"\n",(0,d.jsx)(n.p,{children:"\u8981\u4fee\u6539\u8bbe\u5907\u6587\u4ef6\u7684\u9884\u8bfb\u503c\uff0c\u4f60\u53ef\u4ee5\u4f7f\u7528\u4ee5\u4e0b\u547d\u4ee4\uff1a"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"sudo /sbin/blockdev --setra <bytes> <devname>\n"})}),"\n",(0,d.jsx)(n.p,{children:"\u4f8b\u5982\uff0c\u4fee\u6539\u672c\u6587\u6863\u670d\u52a1\u5668\u786c\u76d8\u7684\u6587\u4ef6\u9884\u8bfb\u503c\uff1a"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"sudo /sbin/blockdev --setra 16384 /dev/vdc\n"})}),"\n",(0,d.jsx)(n.h4,{id:"\u78c1\u76d8\u7684-io-\u8c03\u5ea6\u7b56\u7565\u8bbe\u7f6e",children:"\u78c1\u76d8\u7684 I/O \u8c03\u5ea6\u7b56\u7565\u8bbe\u7f6e"}),"\n",(0,d.jsx)(n.p,{children:"Cloudberry Database \u7684\u78c1\u76d8\u7c7b\u578b\u3001\u64cd\u4f5c\u7cfb\u7edf\u4ee5\u53ca\u8c03\u5ea6\u7b56\u7565\u5982\u4e0b\uff1a"}),"\n",(0,d.jsxs)("table",{children:[(0,d.jsxs)("tr",{children:[(0,d.jsx)("th",{rowspan:"3",children:"\u5b58\u50a8\u8bbe\u5907\u7c7b\u578b"}),(0,d.jsx)("th",{rowspan:"3",children:"OS"}),(0,d.jsx)("th",{rowspan:"3",children:"\u63a8\u8350\u7684\u8c03\u5ea6\u7b56\u7565"})]}),(0,d.jsx)("tr",{}),(0,d.jsx)("tr",{}),(0,d.jsxs)("tr",{children:[(0,d.jsx)("td",{rowspan:"3",children:"NVMe"}),(0,d.jsx)("td",{children:"RHEL 7"}),(0,d.jsx)("td",{children:"none"})]}),(0,d.jsxs)("tr",{children:[(0,d.jsx)("td",{children:"RHEL 8"}),(0,d.jsx)("td",{children:"none"})]}),(0,d.jsxs)("tr",{children:[(0,d.jsx)("td",{children:"Ubuntu"}),(0,d.jsx)("td",{children:"none"})]}),(0,d.jsxs)("tr",{children:[(0,d.jsx)("td",{rowspan:"3",children:"SSD"}),(0,d.jsx)("td",{children:"RHEL 7"}),(0,d.jsx)("td",{children:"noop"})]}),(0,d.jsxs)("tr",{children:[(0,d.jsx)("td",{children:"RHEL 8"}),(0,d.jsx)("td",{children:"none"})]}),(0,d.jsxs)("tr",{children:[(0,d.jsx)("td",{children:"Ubuntu"}),(0,d.jsx)("td",{children:"none"})]}),(0,d.jsxs)("tr",{children:[(0,d.jsx)("td",{rowspan:"3",children:"\u5176\u4ed6"}),(0,d.jsx)("td",{children:"RHEL 7"}),(0,d.jsx)("td",{children:"deadline"})]}),(0,d.jsxs)("tr",{children:[(0,d.jsx)("td",{children:"RHEL 8"}),(0,d.jsx)("td",{children:"mq-deadline"})]}),(0,d.jsxs)("tr",{children:[(0,d.jsx)("td",{children:"Ubuntu"}),(0,d.jsx)("td",{children:"mq-deadline"})]})]}),"\n",(0,d.jsx)(n.p,{children:"\u53c2\u8003\u4ee5\u4e0b\u547d\u4ee4\u4fee\u6539\u8c03\u5ea6\u7b56\u7565\u3002\u6ce8\u610f\uff0c\u8be5\u547d\u4ee4\u4ec5\u4e3a\u4e34\u65f6\u4fee\u6539\uff0c\u670d\u52a1\u5668\u91cd\u542f\u540e\uff0c\u4fee\u6539\u5c06\u5931\u6548\u3002"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"echo schedulername > /sys/block/<devname>/queue/scheduler\n"})}),"\n",(0,d.jsx)(n.p,{children:"\u4f8b\u5982\uff0c\u4e34\u65f6\u4fee\u6539\u672c\u6587\u6863\u670d\u52a1\u5668\u78c1\u76d8 I/O \u8c03\u5ea6\u7b56\u7565\uff1a"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"echo deadline > /sys/block/vdc/queue/scheduler\n"})}),"\n",(0,d.jsx)(n.p,{children:"\u82e5\u8981\u6c38\u4e45\u4fee\u6539\u8c03\u5ea6\u7b56\u7565\uff0c\u4f60\u53ef\u4ee5\u4f7f\u7528\u7cfb\u7edf\u5b9e\u7528\u7a0b\u5e8f grubby\u3002\u901a\u8fc7 grubby \u4fee\u6539\u540e\uff0c\u91cd\u542f\u670d\u52a1\u5668\u540e\u7acb\u5373\u751f\u6548\uff0c\u793a\u4f8b\u547d\u4ee4\u5982\u4e0b\u6240\u793a\uff1a"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:'grubby --update-kernel=ALL --args="elevator=deadline"\n'})}),"\n",(0,d.jsx)(n.p,{children:"\u53ef\u4ee5\u901a\u8fc7\u5982\u4e0b\u547d\u4ee4\u67e5\u770b\u5185\u6838\u53c2\u6570\u8bbe\u7f6e\uff1a"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"grubby --info=ALL\n"})}),"\n",(0,d.jsx)(n.h4,{id:"\u7981\u7528\u900f\u660e\u5927\u9875\u9762-thp",children:"\u7981\u7528\u900f\u660e\u5927\u9875\u9762 (THP)"}),"\n",(0,d.jsx)(n.p,{children:"\u4f60\u9700\u8981\u7981\u7528\u900f\u660e\u5927\u9875\u9762 (THP)\uff0c\u56e0\u4e3a\u5b83\u4f1a\u964d\u4f4e Cloudberry Database \u7684\u6027\u80fd\u3002\u7981\u7528\u7684\u547d\u4ee4\u5982\u4e0b\u6240\uff1a"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:'grubby --update-kernel=ALL --args="transparent_hugepage=never"\n'})}),"\n",(0,d.jsx)(n.p,{children:"\u901a\u8fc7\u5982\u4e0b\u547d\u4ee4\u67e5\u770b THP \u7684\u72b6\u6001\uff1a"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"cat /sys/kernel/mm/*transparent_hugepage/enabled\n"})}),"\n",(0,d.jsx)(n.h4,{id:"\u7981\u7528-ipc-\u5bf9\u8c61\u5220\u9664",children:"\u7981\u7528 IPC \u5bf9\u8c61\u5220\u9664"}),"\n",(0,d.jsxs)(n.p,{children:["\u7981\u7528 IPC \u5bf9\u8c61\u5220\u9664\uff0c\u5373\u628a ",(0,d.jsx)(n.code,{children:"RemoveIPC"})," \u7684\u503c\u8bbe\u4e3a ",(0,d.jsx)(n.code,{children:"no"}),"\u3002\u4f60\u53ef\u4ee5\u5728 Cloudberry Database \u7684 ",(0,d.jsx)(n.code,{children:"/etc/systemd/logind.conf"})," \u6587\u4ef6\u4e2d\u8bbe\u7f6e\u8be5\u53c2\u6570\u3002"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{children:"RemoveIPC=no\n"})}),"\n",(0,d.jsx)(n.p,{children:"\u7981\u7528\u540e\uff0c\u6267\u884c\u5982\u4e0b\u547d\u4ee4\u91cd\u542f\u670d\u52a1\u5668\u4f7f\u5f97\u7981\u7528\u8bbe\u7f6e\u751f\u6548\uff1a"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"service systemd-logind restart\n"})}),"\n",(0,d.jsx)(n.h4,{id:"ssh-\u8fde\u63a5\u6570\u9608\u503c\u8bbe\u7f6e",children:"SSH \u8fde\u63a5\u6570\u9608\u503c\u8bbe\u7f6e"}),"\n",(0,d.jsxs)(n.p,{children:["\u8981\u8bbe\u7f6e SSH \u8fde\u63a5\u6570\u9608\u503c\uff0c\u4f60\u9700\u8981\u4fee\u6539 ",(0,d.jsx)(n.code,{children:"/etc/ssh/sshd_config"})," \u914d\u7f6e\u6587\u4ef6\u4e2d\u7684 ",(0,d.jsx)(n.code,{children:"MaxStartups"})," \u4ee5\u53ca ",(0,d.jsx)(n.code,{children:"MaxSessions"})," \u53c2\u6570\u3002\u4ee5\u4e0b\u4e24\u79cd\u5199\u6cd5\u5747\u53ef\u3002"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{children:"MaxStartups 200\nMaxSessions 200\n"})}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{children:"MaxStartups 10:30:200\nMaxSessions 200\n"})}),"\n",(0,d.jsx)(n.p,{children:"\u6267\u884c\u5982\u4e0b\u547d\u4ee4\u91cd\u542f\u670d\u52a1\u5668\u4f7f\u5f97\u8bbe\u7f6e\u751f\u6548\uff1a"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"service sshd restart\n"})}),"\n",(0,d.jsx)(n.h4,{id:"\u65f6\u949f\u540c\u6b65\u8bbe\u7f6e",children:"\u65f6\u949f\u540c\u6b65\u8bbe\u7f6e"}),"\n",(0,d.jsx)(n.p,{children:"Cloudberry Database \u8981\u6c42\u4e3a\u6240\u6709\u4e3b\u673a\u914d\u7f6e\u65f6\u949f\u9700\u8981\u540c\u6b65\uff0c\u65f6\u949f\u540c\u6b65\u670d\u52a1\u5e94\u5f53\u968f\u4e3b\u673a\u542f\u52a8\u800c\u542f\u52a8\u3002\u6709\u4e24\u79cd\u540c\u6b65\u65b9\u5f0f\uff1a"}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsx)(n.li,{children:"\u4f7f\u7528 Coordinator \u8282\u70b9\u7684\u65f6\u95f4\u4f5c\u4e3a\u6765\u6e90\uff0c\u5176\u4ed6\u4e3b\u673a\u540c\u6b65 Coordinator \u8282\u70b9\u4e3b\u673a\u7684\u65f6\u949f\u3002"}),"\n",(0,d.jsx)(n.li,{children:"\u4f7f\u7528\u5916\u90e8\u65f6\u949f\u6765\u6e90\u540c\u6b65\u3002"}),"\n"]}),"\n",(0,d.jsxs)(n.p,{children:["\u672c\u6587\u6863\u793a\u4f8b\u4f7f\u7528\u5916\u90e8\u65f6\u949f\u6765\u6e90\u540c\u6b65\uff0c\u5373\u5728 ",(0,d.jsx)(n.code,{children:"/etc/chrony.conf"})," \u914d\u7f6e\u6587\u4ef6\u4e2d\u6dfb\u52a0\u5982\u4e0b\u914d\u7f6e\uff1a"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-conf",children:"# Use public servers from the pool.ntp.org project.\n# Please consider joining the pool (http://www.pool.ntp.org/join.html).\nserver 0.centos.pool.ntp.org iburst\n"})}),"\n",(0,d.jsx)(n.p,{children:"\u8bbe\u7f6e\u540e\uff0c\u53ef\u6267\u884c\u5982\u4e0b\u547d\u4ee4\u67e5\u770b\u65f6\u949f\u540c\u6b65\u72b6\u6001\uff1a"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"systemctl status chronyd\n"})})]})}function t(e={}){const{wrapper:n}={...(0,c.a)(),...e.components};return n?(0,d.jsx)(n,{...e,children:(0,d.jsx)(o,{...e})}):o(e)}},11151:(e,n,s)=>{s.d(n,{Z:()=>i,a:()=>l});var d=s(67294);const c={},r=d.createContext(c);function l(e){const n=d.useContext(r);return d.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(c):e.components||c:l(e.components),d.createElement(r.Provider,{value:n},e.children)}}}]);