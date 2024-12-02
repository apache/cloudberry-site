"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[9372],{56246:(e,d,n)=>{n.r(d),n.d(d,{assets:()=>o,contentTitle:()=>c,default:()=>x,frontMatter:()=>r,metadata:()=>l,toc:()=>t});var s=n(85893),i=n(11151);const r={title:"gpdemo"},c="gpdemo\uff08\u5f15\u5165\u81ea v1.5.0 \u7248\u672c\uff09",l={id:"sys-utilities/gpdemo",title:"gpdemo",description:"\u5728 v1.5.0 \u4ee5\u524d\uff0c\u5982\u679c\u7528\u6237\u60f3\u5728\u5355\u8282\u70b9\u4e0a\u90e8\u7f72\u5e26\u6709 Segment \u7684 Cloudberry Database \u5c0f\u578b\u96c6\u7fa4\u7528\u4e8e\u6f14\u793a\uff0c\u9700\u8981\u82b1\u8d39\u65f6\u95f4\u7f16\u5199\u914d\u7f6e\u6587\u4ef6\u548c\u53c2\u6570\u3002\u81ea v1.5.0 \u8d77\uff0c\u7528\u6237\u53ea\u9700\u8981\u901a\u8fc7\u5185\u7f6e\u7684 gpdemo \u811a\u672c\uff0c\u4f7f\u7528\u4e00\u6761\u547d\u4ee4\u5c31\u80fd\u5feb\u901f\u90e8\u7f72\u6307\u5b9a Segment \u6570\u7684 Cloudberry Database \u96c6\u7fa4\u3002",source:"@site/i18n/zh/docusaurus-plugin-content-docs/current/sys-utilities/gpdemo.md",sourceDirName:"sys-utilities",slug:"/sys-utilities/gpdemo",permalink:"/zh/docs/sys-utilities/gpdemo",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/i18n/zh/docusaurus-plugin-content-docs/current/sys-utilities/gpdemo.md",tags:[],version:"current",lastUpdatedBy:"vitalzf",lastUpdatedAt:1733108055,formattedLastUpdatedAt:"2024\u5e7412\u67082\u65e5",frontMatter:{title:"gpdemo"},sidebar:"docsbars",previous:{title:"gpdeletesystem",permalink:"/zh/docs/sys-utilities/gpdeletesystem"},next:{title:"gpexpand",permalink:"/zh/docs/sys-utilities/gpexpand"}},o={},t=[{value:"\u4f7f\u7528\u65b9\u6cd5",id:"\u4f7f\u7528\u65b9\u6cd5",level:2},{value:"\u9ed8\u8ba4\u90e8\u7f72",id:"\u9ed8\u8ba4\u90e8\u7f72",level:3},{value:"\u5e26\u81ea\u5b9a\u4e49\u914d\u7f6e\u7684\u90e8\u7f72",id:"\u5e26\u81ea\u5b9a\u4e49\u914d\u7f6e\u7684\u90e8\u7f72",level:3},{value:"\u6307\u5b9a Segment \u6570\u91cf",id:"\u6307\u5b9a-segment-\u6570\u91cf",level:4},{value:"\u6307\u5b9a\u8282\u70b9\u7684\u6570\u636e\u76ee\u5f55",id:"\u6307\u5b9a\u8282\u70b9\u7684\u6570\u636e\u76ee\u5f55",level:4},{value:"\u6307\u5b9a\u96c6\u7fa4 Coordinator \u8282\u70b9\u7684\u521d\u59cb\u7aef\u53e3",id:"\u6307\u5b9a\u96c6\u7fa4-coordinator-\u8282\u70b9\u7684\u521d\u59cb\u7aef\u53e3",level:4},{value:"\u6307\u5b9a\u96c6\u7fa4\u6bcf\u4e2a\u8282\u70b9\u7684\u989d\u5916\u521d\u59cb\u5316\u53c2\u6570",id:"\u6307\u5b9a\u96c6\u7fa4\u6bcf\u4e2a\u8282\u70b9\u7684\u989d\u5916\u521d\u59cb\u5316\u53c2\u6570",level:4},{value:"\u547d\u4ee4\u884c\u9009\u9879\u8bf4\u660e",id:"\u547d\u4ee4\u884c\u9009\u9879\u8bf4\u660e",level:2}];function h(e){const d={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,i.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(d.h1,{id:"gpdemo\u5f15\u5165\u81ea-v150-\u7248\u672c",children:"gpdemo\uff08\u5f15\u5165\u81ea v1.5.0 \u7248\u672c\uff09"}),"\n",(0,s.jsxs)(d.p,{children:["\u5728 v1.5.0 \u4ee5\u524d\uff0c\u5982\u679c\u7528\u6237\u60f3\u5728\u5355\u8282\u70b9\u4e0a\u90e8\u7f72\u5e26\u6709 Segment \u7684 Cloudberry Database \u5c0f\u578b\u96c6\u7fa4\u7528\u4e8e\u6f14\u793a\uff0c\u9700\u8981\u82b1\u8d39\u65f6\u95f4\u7f16\u5199\u914d\u7f6e\u6587\u4ef6\u548c\u53c2\u6570\u3002\u81ea v1.5.0 \u8d77\uff0c\u7528\u6237\u53ea\u9700\u8981\u901a\u8fc7\u5185\u7f6e\u7684 ",(0,s.jsx)(d.code,{children:"gpdemo"})," \u811a\u672c\uff0c\u4f7f\u7528\u4e00\u6761\u547d\u4ee4\u5c31\u80fd\u5feb\u901f\u90e8\u7f72\u6307\u5b9a Segment \u6570\u7684 Cloudberry Database \u96c6\u7fa4\u3002"]}),"\n",(0,s.jsxs)(d.p,{children:[(0,s.jsx)(d.code,{children:"gpdemo"})," \u5c06\u968f\u5176\u4ed6\u7cfb\u7edf\u5de5\u5177\uff08\u4f8b\u5982 ",(0,s.jsx)(d.code,{children:"gpinitsystem"}),"\u3001",(0,s.jsx)(d.code,{children:"gpstart"}),"\u3001",(0,s.jsx)(d.code,{children:"gpstop"})," \u7b49\uff09\u4e00\u5e76\u5b89\u88c5\u5230 ",(0,s.jsx)(d.code,{children:"GPHOME/bin"})," \u76ee\u5f55\u4e0b\u3002"]}),"\n",(0,s.jsx)(d.admonition,{title:"\u8b66\u544a",type:"warning",children:(0,s.jsxs)(d.p,{children:["\u9664\u90e8\u7f72\u5355\u8ba1\u7b97\u8282\u70b9\u7684\u96c6\u7fa4\u5916\uff0c\u4e0d\u5efa\u8bae\u5c06 ",(0,s.jsx)(d.code,{children:"gpdemo"})," \u7528\u4e8e\u751f\u4ea7\u73af\u5883\u3002"]})}),"\n",(0,s.jsx)(d.h2,{id:"\u4f7f\u7528\u65b9\u6cd5",children:"\u4f7f\u7528\u65b9\u6cd5"}),"\n",(0,s.jsxs)(d.p,{children:["\u5728\u76ee\u6807\u670d\u52a1\u5668\u4e0a\u5b89\u88c5\u5b8c\u6210 RPM \u5305\uff0c\u5e76\u6b63\u786e\u52a0\u8f7d ",(0,s.jsx)(d.code,{children:"greenplum_path.sh"})," \u540e\uff0c\u5373\u53ef\u6267\u884c ",(0,s.jsx)(d.code,{children:"gpdemo"}),"\u3002"]}),"\n",(0,s.jsx)(d.h3,{id:"\u9ed8\u8ba4\u90e8\u7f72",children:"\u9ed8\u8ba4\u90e8\u7f72"}),"\n",(0,s.jsxs)(d.p,{children:["\u8981\u5feb\u901f\u521b\u5efa\u4e00\u5957\u96c6\u7fa4\uff0c\u4e14\u5bf9\u96c6\u7fa4\u6570\u636e\u76ee\u5f55\u4f4d\u7f6e\u3001\u521d\u59cb\u7aef\u53e3\u3001Segment \u6570\u91cf\u7b49\u65e0\u7279\u6b8a\u8981\u6c42\uff0c\u53ef\u65e0\u53c2\u6570\u6267\u884c ",(0,s.jsx)(d.code,{children:"gpdemo"}),"\uff1a"]}),"\n",(0,s.jsx)(d.pre,{children:(0,s.jsx)(d.code,{className:"language-bash",children:"gpdemo\n"})}),"\n",(0,s.jsx)(d.p,{children:"\u6267\u884c\u8be5\u547d\u4ee4\u540e\uff0c\u811a\u672c\u4f1a\u5728\u5f53\u524d\u8def\u5f84\u4e0b\u521b\u5efa\u6d4b\u8bd5\u96c6\u7fa4\u3002\u96c6\u7fa4\u7684\u9ed8\u8ba4\u914d\u7f6e\u5982\u4e0b\uff1a"}),"\n",(0,s.jsxs)(d.ul,{children:["\n",(0,s.jsx)(d.li,{children:"Segment \u6570\uff1a3"}),"\n",(0,s.jsxs)(d.li,{children:["\u6570\u636e\u76ee\u5f55\uff1a",(0,s.jsx)(d.code,{children:"./datadirs"})]}),"\n",(0,s.jsxs)(d.li,{children:["Coordinator \u521d\u59cb\u7aef\u53e3\uff1a",(0,s.jsx)(d.code,{children:"7000"})]}),"\n"]}),"\n",(0,s.jsxs)(d.admonition,{title:"\u63d0\u793a",type:"info",children:[(0,s.jsxs)(d.p,{children:["\u521b\u5efa\u5b8c\u6210\u540e\uff0c\u811a\u672c\u4f1a\u5728\u5f53\u524d\u76ee\u5f55\u751f\u6210\u4e00\u4e2a\u5305\u542b\u96c6\u7fa4\u57fa\u672c\u4fe1\u606f\u7684 ",(0,s.jsx)(d.code,{children:"gpdemo-env.sh"})," \u6587\u4ef6\u3002\u5728\u4f7f\u7528 ",(0,s.jsx)(d.code,{children:"gpdemo"})," \u5bf9\u96c6\u7fa4\u8fdb\u884c\u64cd\u4f5c\u524d\uff0c\u4f60\u9700\u8981\u6267\u884c ",(0,s.jsx)(d.code,{children:"source gpdemo-env.sh"})," \u4ee5\u52a0\u8f7d\u8fd9\u4e9b\u4fe1\u606f\u3002"]}),(0,s.jsxs)(d.p,{children:["\u6bcf\u6b21\u65b0\u5efa shell \u4f1a\u8bdd\u540e\u90fd\u9700\u8981\u52a0\u8f7d\u4e00\u6b21\u3002\u4f60\u53ef\u4ee5\u5c06\u8fd9\u884c\u6307\u4ee4\u52a0\u5165\u5230 ",(0,s.jsx)(d.code,{children:"~/.bashrc"})," \u6216 ",(0,s.jsx)(d.code,{children:"~/.zshrc"})," \u6765\u81ea\u52a8\u52a0\u8f7d\u3002"]})]}),"\n",(0,s.jsx)(d.h3,{id:"\u5e26\u81ea\u5b9a\u4e49\u914d\u7f6e\u7684\u90e8\u7f72",children:"\u5e26\u81ea\u5b9a\u4e49\u914d\u7f6e\u7684\u90e8\u7f72"}),"\n",(0,s.jsx)(d.p,{children:"\u5982\u679c\u9700\u8981\u5bf9\u96c6\u7fa4\u7684 Segment \u6570\u91cf\u3001\u6570\u636e\u76ee\u5f55\u4f4d\u7f6e\u3001\u521d\u59cb\u7aef\u53e3\u7b49\u8fdb\u884c\u5b9a\u5236\uff0c\u53ef\u53c2\u8003\u4ee5\u4e0b\u8bf4\u660e\u3002"}),"\n",(0,s.jsx)(d.h4,{id:"\u6307\u5b9a-segment-\u6570\u91cf",children:"\u6307\u5b9a Segment \u6570\u91cf"}),"\n",(0,s.jsx)(d.p,{children:"\u5728\u9ed8\u8ba4\u90e8\u7f72\u4e0b\uff0c\u96c6\u7fa4\u7684 Segment \u6570\u91cf\u4e3a 3\u3002"}),"\n",(0,s.jsxs)(d.p,{children:["\u8981\u6307\u5b9a\u96c6\u7fa4\u7684 Segment \u6570\u91cf\uff0c\u4f60\u53ef\u4ee5\u5728 ",(0,s.jsx)(d.code,{children:"gpdemo"})," \u547d\u4ee4\u4e2d\u52a0\u5165 ",(0,s.jsx)(d.code,{children:"NUM_PRIMARY_MIRROR_PAIRS"})," \u53c2\u6570\u3002\u4f8b\u5982\u6307\u5b9a Segment \u6570\u91cf\u4e3a 3\uff0c\u53ef\u6267\u884c\uff1a"]}),"\n",(0,s.jsx)(d.pre,{children:(0,s.jsx)(d.code,{className:"language-bash",children:"NUM_PRIMARY_MIRROR_PAIRS=3 gpdemo\n"})}),"\n",(0,s.jsx)(d.admonition,{title:"\u63d0\u793a",type:"info",children:(0,s.jsxs)(d.ul,{children:["\n",(0,s.jsx)(d.li,{children:"\u6bcf\u4e2a Segment \u7531\u4e00\u4e2a Primary \u548c\u4e00\u4e2a Mirror \u7ec4\u6210\uff0c\u6240\u4ee5\u8be5\u53c2\u6570\u503c\u6bcf\u589e\u52a0\u4e00\uff0c\u5c06\u591a\u521b\u5efa\u4e24\u4e2a\u8282\u70b9\u3002\u5efa\u8bae\u8bbe\u7f6e\u4e3a\u5947\u6570\u4ee5\u66f4\u597d\u5730\u6355\u6349\u6570\u636e\u5206\u5e03\u95ee\u9898\u3002"}),"\n",(0,s.jsxs)(d.li,{children:["\u5f53\u8bbe\u7f6e\u4e3a 0 \u65f6\uff0c\u5c06\u90e8\u7f72\u4e00\u4e2a\u5355\u8ba1\u7b97\u8282\u70b9\u96c6\u7fa4\uff0c\u8be6\u89c1",(0,s.jsx)(d.a,{href:"/zh/docs/deploy-cbdb-with-single-node",children:"\u90e8\u7f72\u5355\u8ba1\u7b97\u8282\u70b9\u7684 Cloudberry Database \u96c6\u7fa4"}),"\u3002"]}),"\n"]})}),"\n",(0,s.jsx)(d.h4,{id:"\u6307\u5b9a\u8282\u70b9\u7684\u6570\u636e\u76ee\u5f55",children:"\u6307\u5b9a\u8282\u70b9\u7684\u6570\u636e\u76ee\u5f55"}),"\n",(0,s.jsxs)(d.p,{children:["\u96c6\u7fa4\u5404\u8282\u70b9\u7684\u6570\u636e\u9ed8\u8ba4\u4f4d\u4e8e ",(0,s.jsx)(d.code,{children:"./datadirs"}),"\uff0c\u5373\u5f53\u524d\u76ee\u5f55\u7684 ",(0,s.jsx)(d.code,{children:"datadirs"})," \u5b50\u76ee\u5f55\u4e0b\u3002\u82e5\u60f3\u8981\u6307\u5b9a\u96c6\u7fa4\u7684\u6570\u636e\u76ee\u5f55\u4f4d\u7f6e\uff0c\u4f60\u53ef\u4ee5\u9009\u62e9\u4efb\u4e00\u65b9\u6cd5\uff1a"]}),"\n",(0,s.jsxs)(d.ul,{children:["\n",(0,s.jsxs)(d.li,{children:["\n",(0,s.jsxs)(d.p,{children:["\u901a\u8fc7 ",(0,s.jsx)(d.code,{children:"cd"})," \u5207\u6362\u5230\u76ee\u6807\u76ee\u5f55\uff0c\u518d\u6267\u884c ",(0,s.jsx)(d.code,{children:"gpdemo"}),"\u3002"]}),"\n"]}),"\n",(0,s.jsxs)(d.li,{children:["\n",(0,s.jsxs)(d.p,{children:["\u5728 ",(0,s.jsx)(d.code,{children:"gpdemo"})," \u547d\u4ee4\u4e2d\u6307\u5b9a ",(0,s.jsx)(d.code,{children:"DATADIRS"})," \u53c2\u6570\u6765\u8bbe\u7f6e\u6570\u636e\u76ee\u5f55\uff0c\u4f8b\u5982\uff1a"]}),"\n",(0,s.jsx)(d.pre,{children:(0,s.jsx)(d.code,{className:"language-bash",children:"DATADIRS=/target/directory/ gpdemo\n"})}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(d.admonition,{title:"\u63d0\u793a",type:"info",children:[(0,s.jsxs)(d.p,{children:["\u5728\u90e8\u7f72\u5b8c\u6210\u540e\uff0c\u5982\u679c\u4f60\u9700\u8981\u901a\u8fc7\u4fee\u6539 ",(0,s.jsx)(d.code,{children:"pg_hha.conf"})," \u914d\u7f6e\u6587\u4ef6\u7b49\u65b9\u5f0f\u624b\u52a8\u8c03\u6574\u6570\u636e\u76ee\u5f55\u7684\u4f4d\u7f6e\uff0c\u53ef\u80fd\u9700\u8981\u77e5\u9053 Coordinator \u548c\u5404\u4e2a Segment \u6570\u636e\u76ee\u5f55\u7684\u9ed8\u8ba4\u4f4d\u7f6e\uff1a"]}),(0,s.jsxs)(d.ul,{children:["\n",(0,s.jsxs)(d.li,{children:["\n",(0,s.jsxs)(d.p,{children:["\u666e\u901a\u591a\u8282\u70b9\u96c6\u7fa4\u6a21\u5f0f\uff08\u5373 ",(0,s.jsx)(d.code,{children:"NUM_PRIMARY_MIRROR_PAIRS"})," > 0\uff09"]}),"\n",(0,s.jsxs)(d.ul,{children:["\n",(0,s.jsxs)(d.li,{children:["Coordinator\uff1a",(0,s.jsx)(d.code,{children:"./datadirs/qddir"})]}),"\n",(0,s.jsxs)(d.li,{children:["Coordinator Standby\uff1a",(0,s.jsx)(d.code,{children:"./datadirs/standby"})]}),"\n",(0,s.jsxs)(d.li,{children:["Segments","\n",(0,s.jsxs)(d.ul,{children:["\n",(0,s.jsxs)(d.li,{children:["Primary\uff1a",(0,s.jsx)(d.code,{children:"./datadirs/dbfast<N>"})," \u5176\u4e2d",(0,s.jsx)(d.code,{children:"<N>"}),"\u4e3a Segment \u7f16\u53f7\u3002"]}),"\n",(0,s.jsxs)(d.li,{children:["Mirror\uff1a",(0,s.jsx)(d.code,{children:"./datadirs/dbfast_mirror<N>"})," \u5176\u4e2d",(0,s.jsx)(d.code,{children:"<N>"}),"\u4e3a Segment \u7f16\u53f7\u3002"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(d.li,{children:["\n",(0,s.jsxs)(d.p,{children:["\u5355\u8282\u70b9\u90e8\u7f72\u6a21\u5f0f\uff08\u5373 ",(0,s.jsx)(d.code,{children:"NUM_PRIMARY_MIRROR_PAIRS"})," = 0\uff09"]}),"\n",(0,s.jsxs)(d.ul,{children:["\n",(0,s.jsxs)(d.li,{children:["Coordinator\uff1a",(0,s.jsx)(d.code,{children:"./datadirs/singlenodedir"})]}),"\n",(0,s.jsxs)(d.li,{children:["Coordinator Standby\uff1a",(0,s.jsx)(d.code,{children:"./datadirs/standby"})]}),"\n"]}),"\n"]}),"\n"]})]}),"\n",(0,s.jsx)(d.h4,{id:"\u6307\u5b9a\u96c6\u7fa4-coordinator-\u8282\u70b9\u7684\u521d\u59cb\u7aef\u53e3",children:"\u6307\u5b9a\u96c6\u7fa4 Coordinator \u8282\u70b9\u7684\u521d\u59cb\u7aef\u53e3"}),"\n",(0,s.jsxs)(d.p,{children:["\u5728\u9ed8\u8ba4\u90e8\u7f72\u4e0b\uff0c\u96c6\u7fa4\u7684 Coordinator \u7aef\u53e3\u4e3a ",(0,s.jsx)(d.code,{children:"7000"}),"\uff0c\u96c6\u7fa4\u4e2d\u6240\u6709\u5176\u5b83\u8282\u70b9\u7684\u7aef\u53e3\u90fd\u662f\u4ece\u8be5\u503c\u8d77\u8fde\u7eed\u5206\u914d\u7684\u3002"]}),"\n",(0,s.jsxs)(d.p,{children:["\u8981\u6307\u5b9a\u96c6\u7fa4 Coordinator \u8282\u70b9\u7684\u521d\u59cb\u7aef\u53e3\uff0c\u4f60\u53ef\u4ee5\u5728 ",(0,s.jsx)(d.code,{children:"gpdemo"})," \u547d\u4ee4\u4e2d\u52a0\u5165 ",(0,s.jsx)(d.code,{children:"PORT_BASE"})," \u53c2\u6570\uff0c\u4f8b\u5982\uff1a"]}),"\n",(0,s.jsx)(d.pre,{children:(0,s.jsx)(d.code,{className:"language-bash",children:"PORT_BASE=7000 gpdemo\n"})}),"\n",(0,s.jsx)(d.h4,{id:"\u6307\u5b9a\u96c6\u7fa4\u6bcf\u4e2a\u8282\u70b9\u7684\u989d\u5916\u521d\u59cb\u5316\u53c2\u6570",children:"\u6307\u5b9a\u96c6\u7fa4\u6bcf\u4e2a\u8282\u70b9\u7684\u989d\u5916\u521d\u59cb\u5316\u53c2\u6570"}),"\n",(0,s.jsxs)(d.p,{children:[(0,s.jsx)(d.code,{children:"BLDWRAP_POSTGRES_CONF_ADDONS"})," \u6307\u5b9a\u96c6\u7fa4\u6bcf\u4e2a\u8282\u70b9\u7684\u989d\u5916\u521d\u59cb\u5316\u53c2\u6570\u3002\u9ed8\u8ba4\u503c\u4e3a ",(0,s.jsx)(d.code,{children:"fsync=off"})," \u4ee5\u63d0\u4f9b\u66f4\u597d\u5730\u5e76\u53d1\u6027\u80fd\u3002"]}),"\n",(0,s.jsx)(d.p,{children:(0,s.jsxs)(d.strong,{children:["\u5728\u751f\u4ea7\u73af\u5883\u4e0b\uff0c\u8bf7\u4f7f\u7528 ",(0,s.jsx)(d.code,{children:'export BLDWRAP_POSTGRES_CONF_ADDONS="fsync=on"'})," \u4ee5\u542f\u7528 fsync\uff0c\u5426\u5219\u4f1a\u5f71\u54cd\u96c6\u7fa4\u7684 ACID \u7279\u6027\u3002\u4f7f\u7528\u5355\u8282\u70b9\u6a21\u5f0f\u65f6\uff0cfsync \u4f1a\u81ea\u52a8\u542f\u7528\uff0c\u4e0d\u9700\u8981\u989d\u5916\u64cd\u4f5c\u3002"]})}),"\n",(0,s.jsx)(d.h2,{id:"\u547d\u4ee4\u884c\u9009\u9879\u8bf4\u660e",children:"\u547d\u4ee4\u884c\u9009\u9879\u8bf4\u660e"}),"\n",(0,s.jsxs)(d.p,{children:[(0,s.jsx)(d.code,{children:"gpdemo"})," \u63d0\u4f9b\u82e5\u5e72\u547d\u4ee4\u884c\u9009\u9879\uff0c\u89e3\u91ca\u5982\u4e0b\uff0c\u53ef\u901a\u8fc7 ",(0,s.jsx)(d.code,{children:"gpdemo -H"})," \u67e5\u770b\u3002"]}),"\n",(0,s.jsxs)(d.table,{children:[(0,s.jsx)(d.thead,{children:(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.th,{children:"\u9009\u9879"}),(0,s.jsx)(d.th,{children:"\u4f5c\u7528"})]})}),(0,s.jsxs)(d.tbody,{children:[(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"-K"})}),(0,s.jsx)(d.td,{children:"\u521b\u5efa\u96c6\u7fa4\u65f6\uff0c\u8df3\u8fc7\u6570\u636e\u4e00\u81f4\u6027\u68c0\u67e5\u3002\u4e0d\u5efa\u8bae\u4f7f\u7528\u8be5\u9009\u9879\uff0c"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"-c"})}),(0,s.jsxs)(d.td,{children:["\u68c0\u67e5\u7aef\u53e3\u5360\u7528\u60c5\u51b5\uff0c\u786e\u8ba4\u662f\u5426\u53ef\u4ee5\u521b\u5efa\u6d4b\u8bd5\u96c6\u7fa4\u3002",(0,s.jsx)("br",{}),(0,s.jsx)("br",{}),"\u6267\u884c ",(0,s.jsx)(d.code,{children:"gpdemo -c"})," \u524d\uff0c\u4f60\u9700\u8981\u5148\u6267\u884c ",(0,s.jsx)(d.code,{children:"source gpdemo-env.sh"})," \u4ee5\u52a0\u8f7d\u96c6\u7fa4\u57fa\u672c\u4fe1\u606f\u3002\u8be5 ",(0,s.jsx)(d.code,{children:"sh"})," \u6587\u4ef6\u4f4d\u4e8e\u521b\u5efa\u96c6\u7fa4\u65f6\u6240\u5728\u7684\u76ee\u5f55\u4e0b\u3002"]})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"-d"})}),(0,s.jsxs)(d.td,{children:["\u5220\u9664\u6d4b\u8bd5\u96c6\u7fa4\u3002",(0,s.jsx)("br",{}),(0,s.jsx)("br",{}),"\u6267\u884c ",(0,s.jsx)(d.code,{children:"gpdemo -d"})," \u524d\uff0c\u4f60\u9700\u8981\u5148\u6267\u884c ",(0,s.jsx)(d.code,{children:"source gpdemo-env.sh"})," \u4ee5\u52a0\u8f7d\u96c6\u7fa4\u57fa\u672c\u4fe1\u606f\u3002\u8be5 ",(0,s.jsx)(d.code,{children:"sh"})," \u6587\u4ef6\u4f4d\u4e8e\u521b\u5efa\u96c6\u7fa4\u65f6\u6240\u5728\u7684\u76ee\u5f55\u4e0b\u3002"]})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"-p"})}),(0,s.jsxs)(d.td,{children:["\u67e5\u770b Coordinator \u548c\u5404 Segment \u4e0a\u96c6\u7fa4\u72b6\u6001\u3001\u7248\u672c\u7b49\u4fe1\u606f\u3002",(0,s.jsx)("br",{}),(0,s.jsx)("br",{}),"\u6267\u884c ",(0,s.jsx)(d.code,{children:"gpdemo -p"})," \u524d\uff0c\u4f60\u9700\u8981\u5148\u6267\u884c ",(0,s.jsx)(d.code,{children:"source gpdemo-env.sh"})," \u4ee5\u52a0\u8f7d\u96c6\u7fa4\u57fa\u672c\u4fe1\u606f\u3002\u8be5 ",(0,s.jsx)(d.code,{children:"sh"})," \u6587\u4ef6\u4f4d\u4e8e\u521b\u5efa\u96c6\u7fa4\u65f6\u6240\u5728\u7684\u76ee\u5f55\u4e0b\u3002"]})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsxs)(d.td,{children:[(0,s.jsx)(d.code,{children:"-h"})," \u6216 ",(0,s.jsx)(d.code,{children:"-H"})]}),(0,s.jsxs)(d.td,{children:[(0,s.jsx)(d.code,{children:"gpdemo -h"})," \u8f93\u51fa\u8f83\u4e3a\u7b80\u7565\u7684\u5e2e\u52a9\u8bf4\u660e\u3002",(0,s.jsx)(d.code,{children:"gpdemo -H"})," \u8f93\u51fa\u8f83\u4e3a\u8be6\u7ec6\u7684\u5e2e\u52a9\u8bf4\u660e\uff0c\u5305\u62ec\u73af\u5883\u53d8\u91cf\u7b49\u989d\u5916\u914d\u7f6e\u3002"]})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"-v"})}),(0,s.jsxs)(d.td,{children:["\u67e5\u770b\u5f53\u524d\u7684 ",(0,s.jsx)(d.code,{children:"gpdemo"})," \u7248\u672c\u3002"]})]})]})]})]})}function x(e={}){const{wrapper:d}={...(0,i.a)(),...e.components};return d?(0,s.jsx)(d,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},11151:(e,d,n)=>{n.d(d,{Z:()=>l,a:()=>c});var s=n(67294);const i={},r=s.createContext(i);function c(e){const d=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(d):{...d,...e}}),[d,e])}function l(e){let d;return d=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:c(e.components),s.createElement(r.Provider,{value:d},e.children)}}}]);