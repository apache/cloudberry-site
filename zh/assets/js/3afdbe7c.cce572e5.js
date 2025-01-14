"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[4117],{58222:(e,n,d)=>{d.r(n),d.d(n,{assets:()=>o,contentTitle:()=>c,default:()=>h,frontMatter:()=>a,metadata:()=>i,toc:()=>l});var r=d(85893),s=d(11151);const a={title:"\u901a\u8fc7 RPM \u5305\u624b\u52a8\u90e8\u7f72"},c="\u901a\u8fc7 RPM \u5305\u5728\u7269\u7406\u673a\u4e0a\u624b\u52a8\u90e8\u7f72 Cloudberry Database",i={id:"cbdb-op-deploy-guide",title:"\u901a\u8fc7 RPM \u5305\u624b\u52a8\u90e8\u7f72",description:"\u672c\u6587\u6863\u4ecb\u7ecd\u5982\u4f55\u901a\u8fc7 RPM \u5305\u5728\u7269\u7406\u673a\u4e0a\u5b89\u88c5\u4e0e\u90e8\u7f72 Cloudberry Database\u3002\u5728\u9605\u8bfb\u672c\u6587\u524d\uff0c\u5efa\u8bae\u5148\u9605\u8bfb\u8f6f\u786c\u4ef6\u914d\u7f6e\u9700\u6c42\u548c\u7269\u7406\u673a\u90e8\u7f72\u524d\u51c6\u5907\u5de5\u4f5c\u3002",source:"@site/i18n/zh/docusaurus-plugin-content-docs/current/cbdb-op-deploy-guide.md",sourceDirName:".",slug:"/cbdb-op-deploy-guide",permalink:"/zh/docs/cbdb-op-deploy-guide",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/i18n/zh/docusaurus-plugin-content-docs/current/cbdb-op-deploy-guide.md",tags:[],version:"current",lastUpdatedBy:"TomShawn",lastUpdatedAt:1736834774,formattedLastUpdatedAt:"2025\u5e741\u670814\u65e5",frontMatter:{title:"\u901a\u8fc7 RPM \u5305\u624b\u52a8\u90e8\u7f72"},sidebar:"docsbars",previous:{title:"\u90e8\u7f72\u524d\u51c6\u5907",permalink:"/zh/docs/cbdb-op-prepare-to-deploy"},next:{title:"\u5355\u8ba1\u7b97\u8282\u70b9\u6a21\u5f0f\u90e8\u7f72",permalink:"/zh/docs/deploy-cbdb-with-single-node"}},o={},l=[{value:"\u7b2c 1 \u6b65\uff1a\u51c6\u5907\u8282\u70b9\u670d\u52a1\u5668",id:"\u7b2c-1-\u6b65\u51c6\u5907\u8282\u70b9\u670d\u52a1\u5668",level:2},{value:"\u7b2c 2 \u6b65\uff1a\u5b89\u88c5 RPM \u5305",id:"\u7b2c-2-\u6b65\u5b89\u88c5-rpm-\u5305",level:2},{value:"\u7b2c 3 \u6b65\uff1a\u914d\u7f6e\u8282\u70b9\u95f4\u4e92\u4fe1",id:"\u7b2c-3-\u6b65\u914d\u7f6e\u8282\u70b9\u95f4\u4e92\u4fe1",level:2},{value:"\u7b2c 4 \u6b65\uff1a\u521d\u59cb\u5316 Cloudberry Database",id:"\u7b2c-4-\u6b65\u521d\u59cb\u5316-cloudberry-database",level:2},{value:"\u7b2c 5 \u6b65\uff1a\u767b\u5f55\u6570\u636e\u5e93",id:"\u7b2c-5-\u6b65\u767b\u5f55\u6570\u636e\u5e93",level:2}];function t(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,s.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"\u901a\u8fc7-rpm-\u5305\u5728\u7269\u7406\u673a\u4e0a\u624b\u52a8\u90e8\u7f72-cloudberry-database",children:"\u901a\u8fc7 RPM \u5305\u5728\u7269\u7406\u673a\u4e0a\u624b\u52a8\u90e8\u7f72 Cloudberry Database"}),"\n",(0,r.jsxs)(n.p,{children:["\u672c\u6587\u6863\u4ecb\u7ecd\u5982\u4f55\u901a\u8fc7 RPM \u5305\u5728\u7269\u7406\u673a\u4e0a\u5b89\u88c5\u4e0e\u90e8\u7f72 Cloudberry Database\u3002\u5728\u9605\u8bfb\u672c\u6587\u524d\uff0c\u5efa\u8bae\u5148\u9605\u8bfb",(0,r.jsx)(n.a,{href:"/zh/docs/cbdb-op-software-hardware",children:"\u8f6f\u786c\u4ef6\u914d\u7f6e\u9700\u6c42"}),"\u548c",(0,r.jsx)(n.a,{href:"/zh/docs/cbdb-op-prepare-to-deploy",children:"\u7269\u7406\u673a\u90e8\u7f72\u524d\u51c6\u5907\u5de5\u4f5c"}),"\u3002"]}),"\n",(0,r.jsx)(n.p,{children:"\u672c\u6587\u6240\u4ecb\u7ecd\u7684\u90e8\u7f72\u65b9\u6cd5\u53ef\u7528\u4e8e\u751f\u4ea7\u73af\u5883\u3002"}),"\n",(0,r.jsx)(n.p,{children:"\u672c\u6587\u793a\u4f8b\u4ee5 CentOS 7.6 \u4e3a\u4f8b\uff0c\u8bf4\u660e\u5982\u4f55\u90e8\u7f72 Cloudberry Database v1.0.0\u3002\u4e3b\u8981\u5206\u4e3a\u4ee5\u4e0b\u6b65\u9aa4\uff1a"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"#%E7%AC%AC-1-%E6%AD%A5%E5%87%86%E5%A4%87%E8%8A%82%E7%82%B9%E6%9C%8D%E5%8A%A1%E5%99%A8",children:"\u51c6\u5907\u8282\u70b9\u670d\u52a1\u5668"}),"\u3002"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"#%E7%AC%AC-2-%E6%AD%A5%E5%AE%89%E8%A3%85-rpm-%E5%8C%85",children:"\u5b89\u88c5 RPM \u5305"}),"\u3002"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"#%E7%AC%AC-3-%E6%AD%A5%E9%85%8D%E7%BD%AE%E8%8A%82%E7%82%B9%E9%97%B4%E4%BA%92%E4%BF%A1",children:"\u914d\u7f6e\u8282\u70b9\u95f4\u4e92\u4fe1"}),"\u3002"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"#%E7%AC%AC-4-%E6%AD%A5%E5%88%9D%E5%A7%8B%E5%8C%96-cloudberry-database",children:"\u521d\u59cb\u5316\u6570\u636e\u5e93"}),"\u3002"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"#%E7%AC%AC-5-%E6%AD%A5%E7%99%BB%E5%BD%95%E6%95%B0%E6%8D%AE%E5%BA%93",children:"\u767b\u5f55\u6570\u636e\u5e93"}),"\u3002"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"\u7b2c-1-\u6b65\u51c6\u5907\u8282\u70b9\u670d\u52a1\u5668",children:"\u7b2c 1 \u6b65\uff1a\u51c6\u5907\u8282\u70b9\u670d\u52a1\u5668"}),"\n",(0,r.jsxs)(n.p,{children:["\u53c2\u7167",(0,r.jsx)(n.a,{href:"/zh/docs/cbdb-op-prepare-to-deploy",children:"\u7269\u7406\u673a\u90e8\u7f72\u524d\u51c6\u5907\u5de5\u4f5c"}),"\u7684\u5185\u5bb9\uff0c\u5b8c\u6210\u8282\u70b9\u670d\u52a1\u5668\u7684\u51c6\u5907\u5de5\u4f5c\u3002"]}),"\n",(0,r.jsx)(n.h2,{id:"\u7b2c-2-\u6b65\u5b89\u88c5-rpm-\u5305",children:"\u7b2c 2 \u6b65\uff1a\u5b89\u88c5 RPM \u5305"}),"\n",(0,r.jsxs)(n.p,{children:["\u5728\u5b8c\u6210\u51c6\u5907\u5de5\u4f5c\u540e\uff0c\u5c31\u53ef\u4ee5\u5b89\u88c5 Cloudberry Database \u4e86\u3002\u4f60\u9700\u8981\u4ece ",(0,r.jsx)(n.a,{href:"https://github.com/cloudberrydb/cloudberrydb/releases",children:"Cloudberry Database \u53d1\u5e03\u9875\u9762"}),"\u4e0b\u8f7d\u5bf9\u5e94\u7684 RPM \u5b89\u88c5\u5305\uff0c\u7136\u540e\u5728\u6bcf\u4e2a\u8282\u70b9\u4e0a\u901a\u8fc7\u5b89\u88c5\u5305\u8fdb\u884c\u5b89\u88c5\u3002"]}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["\u4e0b\u8f7d Cloudberry Database \u7684 RPM \u5b89\u88c5\u5305\u81f3 ",(0,r.jsx)(n.code,{children:"gpadmin"})," \u4e3b\u76ee\u5f55 ",(0,r.jsx)(n.code,{children:"/home/gpadmin/"}),"\uff1a"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"wget -P /home/gpadmin <\u4e0b\u8f7d\u5730\u5740>\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["\u5728 ",(0,r.jsx)(n.code,{children:"/home/gpadmin"})," \u76ee\u5f55\u4e0b\u5b89\u88c5 RPM \u5305\u3002"]}),"\n",(0,r.jsxs)(n.p,{children:["\u6267\u884c\u4ee5\u4e0b\u547d\u4ee4\u65f6\uff0c\u4f60\u9700\u8981\u5c06 ",(0,r.jsx)(n.code,{children:"<RPM \u5b89\u88c5\u5305\u8def\u5f84>"})," \u66ff\u6362\u4e3a\u5b9e\u9645\u7684\u5b89\u88c5\u5305\u8def\u5f84\uff0c\u5e76\u4f7f\u7528 ",(0,r.jsx)(n.code,{children:"root"})," \u7528\u6237\u6267\u884c\u3002\u5b89\u88c5\u65f6\uff0c\u4f1a\u81ea\u52a8\u521b\u5efa\u9ed8\u8ba4\u5b89\u88c5\u76ee\u5f55 ",(0,r.jsx)(n.code,{children:"/usr/local/cloudberry-db/"}),"\u3002"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"cd /home/gpadmin\nyum install <RPM \u5b89\u88c5\u5305\u8def\u5f84>\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["\u4e3a ",(0,r.jsx)(n.code,{children:"gpadmin"})," \u7528\u6237\u6388\u4e88\u5b89\u88c5\u76ee\u5f55\u7684\u6743\u9650\uff1a"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"chown -R gpadmin:gpadmin /usr/local\nchown -R gpadmin:gpadmin /usr/local/cloudberry*\n"})}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"\u7b2c-3-\u6b65\u914d\u7f6e\u8282\u70b9\u95f4\u4e92\u4fe1",children:"\u7b2c 3 \u6b65\uff1a\u914d\u7f6e\u8282\u70b9\u95f4\u4e92\u4fe1"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["\u5207\u6362\u5230 ",(0,r.jsx)(n.code,{children:"gpadmin"})," \u7528\u6237\uff0c\u540e\u7eed\u64cd\u4f5c\u4f7f\u7528 ",(0,r.jsx)(n.code,{children:"gpadmin"})," \u7528\u6237\u8fdb\u884c\u3002"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"su - gpadmin\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"\u521b\u5efa\u8282\u70b9\u7684\u4fe1\u606f\u914d\u7f6e\u6587\u4ef6\u3002"}),"\n",(0,r.jsxs)(n.p,{children:["\u5728 ",(0,r.jsx)(n.code,{children:"/home/gpadmin/"})," \u76ee\u5f55\u4e0b\u521b\u5efa\u8282\u70b9\u7684\u914d\u7f6e\u6587\u4ef6\uff0c\u5305\u542b ",(0,r.jsx)(n.code,{children:"all_hosts"})," \u548c ",(0,r.jsx)(n.code,{children:"seg_hosts"})," \u6587\u4ef6\uff0c\u5206\u522b\u5b58\u653e\u5168\u90e8\u8282\u70b9\u548c\u6570\u636e\u8282\u70b9\u7684\u4e3b\u673a\u4fe1\u606f\uff0c\u4ee3\u7801\u5982\u4e0b\u6240\u793a\uff1a"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"[gpadmin@cbdb-coordinator gpadmin]$ cat all_hosts\n\ncbdb-coordinator\ncbdb-standbycoordinator\ncbdb-datanode01\ncbdb-datanode02\ncbdb-datanode03\n\n[gpadmin@cbdb-coordinator gpadmin]$ cat seg_hosts\n\ncbdb-datanode01\ncbdb-datanode02\ncbdb-datanode03\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"\u4e3a\u5404\u4e3b\u673a\u4e4b\u95f4\u914d\u7f6e SSH \u4e92\u4fe1\u3002"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["\u5728\u5404\u4e3b\u673a\u4e0a\u6267\u884c ",(0,r.jsx)(n.code,{children:"ssh-keygen"})," \u751f\u6210 SSH \u5bc6\u94a5\uff0c\u793a\u4f8b\u5982\u4e0b\uff1a"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"[gpadmin@cbbd-coordinator cloudberry-db-1.0.0]$ ssh-keygen\n\nGenerating public/private rsa key pair.\nEnter file in which to save the key (/usr/local/cloudberry-db/.ssh/id_rsa):\nEnter passphrase (empty for no passphrase):\nEnter same passphrase again:\nYour identification has been saved in /usr/local/cloudberry-db/.ssh/id_rsa.\nYour public key has been saved in /usr/local/cloudberry-db/.ssh/id_rsa.pub.\nThe key fingerprint is:\nSHA256:cvcYS87egYCyh/v6UtdqrejVU5qqF7OvpcHg/T9lRrg gpadmin@cbbd-coordinator\nThe key's randomart image is:\n+---[RSA 2048]----+\n|                 |\n|                 |\n|       +         |\n|+      O         |\n|o ...  S         |\n|. +o=  B C       |\n| o B=00 D        |\n|.o=o0o.. =       |\n|O=++*+o+..       |\n+----[SHA256]-----+\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["\u5728\u5404\u4e3b\u673a\u4e0a\u4f7f\u7528 ",(0,r.jsx)(n.code,{children:"ssh-copy-id"})," \u914d\u7f6e\u514d\u5bc6\uff0c\u793a\u4f8b\u5982\u4e0b\uff1a"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"ssh-copy-id  cbdb-coordinator\nssh-copy-id  cbdb-standbycoordinator\nssh-copy-id  cbdb-datanode01\nssh-copy-id  cbdb-datanode02\nssh-copy-id  cbdb-datanode03\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"\u9a8c\u8bc1\u8282\u70b9\u4e4b\u95f4\u7684 SSH \u662f\u5426\u5168\u90e8\u6253\u901a\uff0c\u5373\u670d\u52a1\u5668\u4e4b\u95f4\u514d\u5bc6\u7801\u767b\u5f55\u662f\u5426\u6210\u529f\uff0c\u793a\u4f8b\u5982\u4e0b\uff1a"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"[gpadmin@cbdb-coordinator ~]$ gpssh -f all_hosts\n=> pwd\n[ cbdb-datanode03] b'/usr/local/cloudberry-db\\r'\n[ cbdb-coordinator] b'/usr/local/cloudberry-db\\r'\n[ cbdb-datanode02] b'/usr/local/cloudberry-db\\r'\n[cbdb-standbycoordinator] b'/usr/local/cloudberry-db\\r'\n[ cbdb-datanode01] b'/usr/local/cloudberry-db\\r'\n=>\n"})}),"\n",(0,r.jsxs)(n.p,{children:["\u82e5\u65e0\u6cd5\u6267\u884c ",(0,r.jsx)(n.code,{children:"gpssh"}),"\uff0c\u53ef\u5728 Coordinator \u8282\u70b9\u5148\u6267\u884c\u5982\u4e0b\u547d\u4ee4 ",(0,r.jsx)(n.code,{children:"source /usr/local/cloudberry-db/greenplum_path.sh"}),"\u3002"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"\u7b2c-4-\u6b65\u521d\u59cb\u5316-cloudberry-database",children:"\u7b2c 4 \u6b65\uff1a\u521d\u59cb\u5316 Cloudberry Database"}),"\n",(0,r.jsxs)(n.p,{children:["\u6267\u884c\u4ee5\u4e0b\u64cd\u4f5c\u524d\uff0c\u4f60\u9700\u8981\u5148\u6267\u884c ",(0,r.jsx)(n.code,{children:"su - gpadmin"})," \u5207\u6362\u5230 ",(0,r.jsx)(n.code,{children:"gpadmin"})," \u7528\u6237\u3002"]}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["\u5728\u6240\u6709\u8282\u70b9\uff08Coordinator/Standby Coordinator/Segment\uff09\u7684 ",(0,r.jsx)(n.code,{children:"~/.bashrc"})," \u6587\u4ef6\u4e2d\u65b0\u589e\u4e00\u884c ",(0,r.jsx)(n.code,{children:"source"})," \u547d\u4ee4\uff0c\u793a\u4f8b\u5982\u4e0b\uff1a"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"source /usr/local/cloudberry-db/greenplum_path.sh\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["\u6267\u884c ",(0,r.jsx)(n.code,{children:"source"})," \u547d\u4ee4\u4f7f\u5f97\u65b0\u589e\u5185\u5bb9\u751f\u6548\uff1a"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"source ~/.bashrc\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["\u5728 Coordinator \u8282\u70b9\u4e0a\u4f7f\u7528 ",(0,r.jsx)(n.code,{children:"gpssh"})," \u547d\u4ee4\u4e3a Segment \u8282\u70b9\u521b\u5efa\u6570\u636e\u76ee\u5f55\u548c Mirror \u76ee\u5f55\uff0c\u672c\u6587\u6863\u4e2d\u4e24\u4e2a\u76ee\u5f55\u5206\u522b\u4e3a ",(0,r.jsx)(n.code,{children:"/data0/primary/"})," \u548c ",(0,r.jsx)(n.code,{children:"/data0/mirror/"}),"\uff0c\u793a\u4f8b\u5982\u4e0b\uff1a"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"gpssh -f seg_hosts\nmkdir -p /data0/primary/\nmkdir -p /data0/mirror/\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["\u5728 Coordinator \u8282\u70b9\u4e0a\u521b\u5efa\u6570\u636e\u76ee\u5f55\uff0c\u672c\u6587\u6863\u4ee5 ",(0,r.jsx)(n.code,{children:"/data0/coordinator"})," \u4e3a\u4f8b\uff1a"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"mkdir -p /data0/coordinator/\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["\u5728 Coordinator \u8282\u70b9\u4e0a\u4f7f\u7528 ",(0,r.jsx)(n.code,{children:"gpssh"})," \u547d\u4ee4\u4e3a Standby \u8282\u70b9\u521b\u5efa\u6570\u636e\u76ee\u5f55\uff0c\u672c\u6587\u6863\u4ee5 ",(0,r.jsx)(n.code,{children:"/data0/coordinator/"})," \u4e3a\u4f8b\uff1a"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"gpssh -h cbdb-standbycoordinator -e 'mkdir -p /data0/coordinator/'\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["\u5728 Coordinator \u548c Standby \u8282\u70b9\u7684\u4e3b\u673a\u4e0a\uff0c\u5f80 ",(0,r.jsx)(n.code,{children:"~/.bashrc"})," \u6587\u4ef6\u518d\u6dfb\u52a0\u4e00\u884c ",(0,r.jsx)(n.code,{children:"COORDINATOR_DATA_DIRECTORY"})," \u7684\u8def\u5f84\u58f0\u660e\uff1a",(0,r.jsx)(n.code,{children:"{\u7b2c 5 \u6b65\u7684\u8def\u5f84}"})," + ",(0,r.jsx)(n.code,{children:"gpseg-1"}),"\uff0c\u793a\u4f8b\u5982\u4e0b\uff1a"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"export COORDINATOR_DATA_DIRECTORY=/data0/coordinator/gpseg-1\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["\u5728 Coordinator \u548c Standby \u8282\u70b9\u7684\u4e3b\u673a\u6267\u884c\u4ee5\u4e0b\u547d\u4ee4\uff0c\u4f7f\u4e0a\u4e00\u6b65\u5bf9 ",(0,r.jsx)(n.code,{children:"COORDINATOR_DATA_DIRECTORY"})," \u7684\u58f0\u660e\u751f\u6548\u3002"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"source ~/.bashrc\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["\u914d\u7f6e ",(0,r.jsx)(n.code,{children:"gpinitsystem_config"})," \u542f\u52a8\u811a\u672c\u3002"]}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"\u5728 Coordinator \u8282\u70b9\u6240\u5728\u4e3b\u673a\u4e0a\uff0c\u5c06\u6a21\u677f\u914d\u7f6e\u6587\u4ef6\u590d\u5236\u5230\u8be5\u5f53\u524d\u76ee\u5f55\uff1a"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"cp $GPHOME/docs/cli_help/gpconfigs/gpinitsystem_config .\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["\u4fee\u6539 ",(0,r.jsx)(n.code,{children:"gpinitsystem_config"})," \u6587\u4ef6\u3002"]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"\u6ce8\u610f\u7aef\u53e3\uff0cCoordinator \u8282\u70b9\u3001Segment \u8282\u70b9\u3001Mirror \u8282\u70b9\u3002"}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["\u5c06 ",(0,r.jsx)(n.code,{children:"DATA_DIRECTORY"})," \u4fee\u6539\u4e3a Segment \u8ba1\u7b97\u8282\u70b9\u7684\u6570\u636e\u76ee\u5f55\uff0c\u5373\u524d\u9762\u6b65\u9aa4\u4e2d\u7684 ",(0,r.jsx)(n.code,{children:"/data0/primary"}),"\u3002"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["\u5c06 ",(0,r.jsx)(n.code,{children:"COORDINATOR_HOSTNAME"})," \u4fee\u6539\u4e3a Coordinator \u8282\u70b9\u4e3b\u673a\u540d\u3002\u672c\u6587\u6863\u4e2d Coordinator \u4e3b\u673a\u540d\u4e3a ",(0,r.jsx)(n.code,{children:"cbdb-coordinator"}),"\u3002"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["\u5c06 ",(0,r.jsx)(n.code,{children:"COORDINATOR_DIRECTORY"})," \u4fee\u6539\u4e3a Coordinator \u8282\u70b9\u6570\u636e\u76ee\u5f55\uff0c\u5373\u524d\u9762\u6b65\u9aa4\u4e2d\u7684 ",(0,r.jsx)(n.code,{children:"/data0/coordinator"}),"\u3002"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["\u5c06 ",(0,r.jsx)(n.code,{children:"MIRROR_DATA_DIRECTORY"})," \u4fee\u6539\u4e3a Mirror \u7684\u6570\u636e\u76ee\u5f55\uff0c\u5373\u524d\u9762\u6b65\u9aa4\u7684 ",(0,r.jsx)(n.code,{children:"/data0/mirror"}),"\u3002"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"[gpadmin@cbdb-coordinator ~]$ cat gpinitsystem_config\n# FILE NAME: gpinitsystem_config\n\n# Configuration file needed by the gpinitsystem\n\n########################################\n#### REQUIRED PARAMETERS\n########################################\n\n#### Naming convention for utility-generated data directories.\nSEG_PREFIX=gpseg\n\n#### Base number by which primary segment port numbers\n#### are calculated.\nPORT_BASE=6000\n\n#### File system location(s) where primary segment data directories\n#### will be created. The number of locations in the list dictate\n#### the number of primary segments that will get created per\n#### physical host (if multiple addresses for a host are listed in\n#### the hostfile, the number of segments will be spread evenly across\n#### the specified interface addresses).\ndeclare -a DATA_DIRECTORY=(/data0/primary)\n\n#### OS-configured hostname or IP address of the coordinator host.\nCOORDINATOR_HOSTNAME=cbdb-coordinator\n\n#### File system location where the coordinator data directory\n#### will be created.\nCOORDINATOR_DIRECTORY=/data0/coordinator\n\n#### Port number for the coordinator instance.\nCOORDINATOR_PORT=5432\n\n#### Shell utility used to connect to remote hosts.\nTRUSTED_SHELL=ssh\n\n#### Default server-side character set encoding.\nENCODING=UNICODE\n\n########################################\n#### OPTIONAL MIRROR PARAMETERS\n########################################\n\n#### Base number by which mirror segment port numbers\n#### are calculated.\nMIRROR_PORT_BASE=7000\n\n#### File system location(s) where mirror segment data directories\n#### will be created. The number of mirror locations must equal the\n#### number of primary locations as specified in the\n#### DATA_DIRECTORY parameter.\ndeclare -a MIRROR_DATA_DIRECTORY=(/data0/mirror)\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["\u5728\u521d\u59cb\u5316\u8fc7\u7a0b\u4e2d\u5982\u679c\u9700\u8981\u751f\u6210\u9ed8\u8ba4\u7684\u6570\u636e\u5e93\uff0c\u5219\u9700\u8981\u586b\u5199\u6570\u636e\u5e93\u540d\u3002\u672c\u6587\u6863\u4e2d\uff0c\u521d\u59cb\u5316\u751f\u6210 ",(0,r.jsx)(n.code,{children:"warehouse"}),"\u6570\u636e\u5e93\u3002"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-conf",children:"########################################\n#### OTHER OPTIONAL PARAMETERS\n########################################\n\n#### Create a database of this name after initialization.\nDATABASE_NAME=warehouse\n"})}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["\u521d\u59cb\u5316 Cloudberry Database\u3002\u4f7f\u7528 ",(0,r.jsx)(n.code,{children:"gpinitsystem"})," \u547d\u4ee4\u8fdb\u884c\u521d\u59cb\u5316\uff0c\u547d\u4ee4\u793a\u4f8b\u5982\u4e0b\uff1a"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"gpinitsystem -c  gpinitsystem_config -h /home/gpadmin/seg_hosts\n"})}),"\n",(0,r.jsxs)(n.p,{children:["\u5728\u4ee5\u4e0a ",(0,r.jsx)(n.code,{children:"gpinitsystem"})," \u4e2d\uff0c",(0,r.jsx)(n.code,{children:"-c"})," \u4e3a\u914d\u7f6e\u6587\u4ef6\uff0c",(0,r.jsx)(n.code,{children:"-h"})," \u4e3a\u8ba1\u7b97\u8282\u70b9\u5217\u8868\u3002"]}),"\n",(0,r.jsx)(n.p,{children:"\u5982\u679c\u9700\u8981\u521d\u59cb\u5316 Standby Coordinator \u8282\u70b9\uff0c\u5219\u53c2\u8003\u5982\u4e0b\u547d\u4ee4\u521d\u59cb\u5316\uff1a"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"gpinitstandby -s cbdb-standbycoordinator\n"})}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"\u7b2c-5-\u6b65\u767b\u5f55\u6570\u636e\u5e93",children:"\u7b2c 5 \u6b65\uff1a\u767b\u5f55\u6570\u636e\u5e93"}),"\n",(0,r.jsx)(n.p,{children:"\u81f3\u6b64\uff0cCloudberry Database \u5df2\u7ecf\u6210\u529f\u90e8\u7f72\uff0c\u4f60\u53ef\u4ee5\u53c2\u8003\u4ee5\u4e0b\u547d\u4ee4\u6765\u767b\u5f55\u6570\u636e\u5e93\uff1a"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"psql -h <hostname> -p <port> -U <username> -d <database>\n"})}),"\n",(0,r.jsx)(n.p,{children:"\u4ee5\u4e0a\u547d\u4ee4\u4e2d\uff1a"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"<hostname>"})," \u662f Cloudberry Database \u670d\u52a1\u5668\u7684 Coordinator \u8282\u70b9 IP \u5730\u5740\u3002"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"<port>"})," \u662f Cloudberry Database \u7684\u7aef\u53e3\u53f7\uff0c\u9ed8\u8ba4\u4e3a ",(0,r.jsx)(n.code,{children:"5432"}),"\u3002"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"<username>"})," \u662f\u6570\u636e\u5e93\u7684\u7528\u6237\u540d\u3002"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"<database>"})," \u662f\u8981\u8fde\u63a5\u7684\u6570\u636e\u5e93\u540d\u79f0\u3002"]}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"\u6267\u884c\u547d\u4ee4\u540e\uff0c\u7cfb\u7edf\u5c06\u63d0\u793a\u4f60\u8f93\u5165\u6570\u636e\u5e93\u5bc6\u7801\u3002\u8f93\u5165\u6b63\u786e\u7684\u5bc6\u7801\u540e\uff0c\u4f60\u5c06\u6210\u529f\u767b\u5f55\u5230 Cloudberry Database\uff0c\u5e76\u53ef\u4ee5\u6267\u884c\u76f8\u5e94\u7684 SQL \u67e5\u8be2\u548c\u64cd\u4f5c\u3002\u8bf7\u786e\u4fdd\u4f60\u6709\u6b63\u786e\u7684\u6743\u9650\u6765\u8bbf\u95ee\u76ee\u6807\u6570\u636e\u5e93\u3002"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sql",children:'[gpadmin@cddb-coordinator ~]$ psql warehouse\npsql (14.4, server 14.4)\nType "help" for help.\n\nwarehouse=# SELECT * FROM gp_segment_configuration;\ndbid | content | role | preferred_role | mode | status | port  | hostname             | address               | datadir\n------------------------------------------------------------------------------------------\n1    | -1      | p    | p              | n    | u      | 5432 | cddb-coordinator          | cddb-coordinator           | /data0/coordinator/gpseg-1\n8    | -1      | m    | m              | s    | u      | 5432 | cddb-standbycoordinator   | cddb-standbycoordinator    | /data0/coordinator/gpseg-1\n2    | 0       | p    | p              | s    | u      | 6000 | cddb-datanode01      | cddb-datanode01       | /data0/primary/gpseg0\n5    | 0       | m    | m              | s    | u      | 7000 | cddb-datanode02      | cddb-datanode02       | /data0/mirror/gpseg0\n3    | 1       | p    | p              | s    | u      | 6000 | cddb-datanode02      | cddb-datanode02       | /data0/primary/gpseg1\n6    | 1       | m    | m              | s    | u      | 7000 | cddb-datanode03      | cddb-datanode03       | /data0/mirror/gpseg1\n4    | 2       | p    | p              | s    | u      | 6000 | cddb-datanode03      | cddb-datanode03       | /data0/primary/gpseg2\n7    | 2       | m    | m              | s    | u      | 7000 | cddb-datanode01      | cddb-datanode01       | /data0/mirror/gpseg2\n(8 rows)\n'})})]})}function h(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(t,{...e})}):t(e)}},11151:(e,n,d)=>{d.d(n,{Z:()=>i,a:()=>c});var r=d(67294);const s={},a=r.createContext(s);function c(e){const n=r.useContext(a);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:c(e.components),r.createElement(a.Provider,{value:n},e.children)}}}]);