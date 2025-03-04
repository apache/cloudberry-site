"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[9810],{18471:(e,d,r)=>{r.r(d),r.d(d,{assets:()=>i,contentTitle:()=>c,default:()=>o,frontMatter:()=>l,metadata:()=>t,toc:()=>h});var s=r(85893),n=r(11151);const l={title:"\u8fde\u63a5\u5230\u6570\u636e\u5e93"},c="\u8fde\u63a5\u5230 Cloudberry Database",t={id:"connect-to-cbdb",title:"\u8fde\u63a5\u5230\u6570\u636e\u5e93",description:"\u672c\u6587\u6863\u4ecb\u7ecd\u5982\u4f55\u8fde\u63a5\u5230 Cloudberry Database\u3002",source:"@site/i18n/zh/docusaurus-plugin-content-docs/current/connect-to-cbdb.md",sourceDirName:".",slug:"/connect-to-cbdb",permalink:"/zh/docs/connect-to-cbdb",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/i18n/zh/docusaurus-plugin-content-docs/current/connect-to-cbdb.md",tags:[],version:"current",lastUpdatedBy:"TomShawn",lastUpdatedAt:1741056503,formattedLastUpdatedAt:"2025\u5e743\u67084\u65e5",frontMatter:{title:"\u8fde\u63a5\u5230\u6570\u636e\u5e93"},sidebar:"docsbars",previous:{title:"\u542f\u52a8\u548c\u505c\u6b62\u6570\u636e\u5e93",permalink:"/zh/docs/start-and-stop-cbdb-database"},next:{title:"\u57fa\u672c\u67e5\u8be2\u8bed\u6cd5",permalink:"/zh/docs/basic-query-syntax"}},i={},h=[{value:"\u8fde\u63a5\u53c2\u6570",id:"\u8fde\u63a5\u53c2\u6570",level:2},{value:"\u652f\u6301\u7684\u5ba2\u6237\u7aef\u5e94\u7528\u7a0b\u5e8f",id:"\u652f\u6301\u7684\u5ba2\u6237\u7aef\u5e94\u7528\u7a0b\u5e8f",level:2},{value:"\u5ba2\u6237\u7aef\u5e94\u7528\u7a0b\u5e8f",id:"\u5ba2\u6237\u7aef\u5e94\u7528\u7a0b\u5e8f",level:3},{value:"\u4f7f\u7528 psql \u8fde\u63a5",id:"\u4f7f\u7528-psql-\u8fde\u63a5",level:3},{value:"\u4f7f\u7528\u5e94\u7528\u7a0b\u5e8f\u63a5\u53e3\u8fde\u63a5",id:"\u4f7f\u7528\u5e94\u7528\u7a0b\u5e8f\u63a5\u53e3\u8fde\u63a5",level:2},{value:"\u5e38\u89c1\u8fde\u63a5\u95ee\u9898",id:"\u5e38\u89c1\u8fde\u63a5\u95ee\u9898",level:2}];function a(e){const d={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,n.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(d.h1,{id:"\u8fde\u63a5\u5230-cloudberry-database",children:"\u8fde\u63a5\u5230 Cloudberry Database"}),"\n",(0,s.jsx)(d.p,{children:"\u672c\u6587\u6863\u4ecb\u7ecd\u5982\u4f55\u8fde\u63a5\u5230 Cloudberry Database\u3002"}),"\n",(0,s.jsx)(d.h2,{id:"\u8fde\u63a5\u53c2\u6570",children:"\u8fde\u63a5\u53c2\u6570"}),"\n",(0,s.jsxs)(d.p,{children:["\u4f60\u53ef\u4ee5\u4f7f\u7528\u4e0e PostgreSQL \u517c\u5bb9\u7684\u5ba2\u6237\u7aef\u7a0b\u5e8f\uff08\u4f8b\u5982 ",(0,s.jsx)(d.code,{children:"psql"}),"\uff09\u8fde\u63a5\u5230 Cloudberry Database\u3002\u7528\u6237\u548c\u7ba1\u7406\u5458\u603b\u662f\u901a\u8fc7 ",(0,s.jsx)(d.em,{children:"coordinator"})," \u8fde\u63a5\u5230 Cloudberry Database\u3002Segment \u4e0d\u63a5\u53d7\u5ba2\u6237\u7aef\u8fde\u63a5\u3002"]}),"\n",(0,s.jsx)(d.p,{children:"\u4e3a\u4e86\u5efa\u7acb\u4e0e Cloudberry Database coordinator \u7684\u8fde\u63a5\uff0c\u4f60\u9700\u8981\u4e86\u89e3\u4ee5\u4e0b\u8fde\u63a5\u4fe1\u606f\uff0c\u5e76\u76f8\u5e94\u5730\u914d\u7f6e\u4f60\u7684\u5ba2\u6237\u7aef\u7a0b\u5e8f\u3002"}),"\n",(0,s.jsxs)(d.table,{children:[(0,s.jsx)(d.thead,{children:(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.th,{children:"\u8fde\u63a5\u53c2\u6570"}),(0,s.jsx)(d.th,{children:"\u63cf\u8ff0"}),(0,s.jsx)(d.th,{children:"\u73af\u5883\u53d8\u91cf"})]})}),(0,s.jsxs)(d.tbody,{children:[(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"\u5e94\u7528\u7a0b\u5e8f\u540d"}),(0,s.jsxs)(d.td,{children:["\u8fde\u63a5\u5230\u6570\u636e\u5e93\u7684\u5e94\u7528\u7a0b\u5e8f\u540d\u79f0\u3002\u5728 ",(0,s.jsx)(d.code,{children:"application_name"})," \u8fde\u63a5\u53c2\u6570\u4e2d\u7684\u9ed8\u8ba4\u503c\u662f ",(0,s.jsx)(d.em,{children:"psql"}),"\u3002"]}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"$PGAPPNAME"})})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"\u6570\u636e\u5e93\u540d"}),(0,s.jsxs)(d.td,{children:["\u5f85\u8fde\u63a5\u6570\u636e\u5e93\u7684\u540d\u79f0\u3002\u5bf9\u4e8e\u65b0\u521d\u59cb\u5316\u7684\u7cfb\u7edf\uff0c\u9996\u6b21\u8fde\u63a5\u8bf7\u4f7f\u7528 ",(0,s.jsx)(d.code,{children:"postgres"})," \u6570\u636e\u5e93\u3002"]}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"$PGDATABASE"})})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"\u4e3b\u673a\u540d"}),(0,s.jsx)(d.td,{children:"Cloudberry Database coordinator \u7684\u4e3b\u673a\u540d\u3002\u9ed8\u8ba4\u4e3b\u673a\u662f\u672c\u5730\u4e3b\u673a\u3002"}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"$PGHOST"})})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"\u7aef\u53e3"}),(0,s.jsxs)(d.td,{children:["Cloudberry Database coordinator \u5b9e\u4f8b\u8fd0\u884c\u7684\u7aef\u53e3\u53f7\u3002\u9ed8\u8ba4\u503c\u4e3a ",(0,s.jsx)(d.code,{children:"5432"}),"\u3002"]}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"$PGPORT"})})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"\u7528\u6237\u540d"}),(0,s.jsxs)(d.td,{children:["\u8fde\u63a5\u7684\u6570\u636e\u5e93\u7528\u6237\uff08\u89d2\u8272\uff09\u540d\u79f0\u3002\u8fd9\u4e0d\u4e00\u5b9a\u4e0e\u4f60\u7684\u64cd\u4f5c\u7cfb\u7edf\u7528\u6237\u540d\u76f8\u540c\u3002\u5982\u679c\u4f60\u4e0d\u786e\u5b9a\u4f60\u7684\u6570\u636e\u5e93\u7528\u6237\u540d\u662f\u4ec0\u4e48\uff0c\u8bf7\u4e0e\u4f60\u7684 Cloudberry Database \u7ba1\u7406\u5458\u8054\u7cfb\u3002\u8bf7\u6ce8\u610f\uff0c\u6bcf\u4e2a Cloudberry Database \u7cfb\u7edf\u5728\u521d\u59cb\u5316\u65f6\u90fd\u4f1a\u81ea\u52a8\u521b\u5efa\u4e00\u4e2a\u8d85\u7ea7\u7528\u6237\u5e10\u6237\u3002\u6b64\u5e10\u6237\u7684\u540d\u79f0\u4e0e\u521d\u59cb\u5316 Cloudberry Database \u7cfb\u7edf\u7684\u7528\u6237\u7684\u64cd\u4f5c\u7cfb\u7edf\u540d\u79f0\u76f8\u540c\uff08\u901a\u5e38\u4e3a ",(0,s.jsx)(d.code,{children:"gpadmin"}),"\uff09\u3002"]}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"$PGUSER"})})]})]})]}),"\n",(0,s.jsxs)(d.p,{children:[(0,s.jsx)(d.a,{href:"#%E4%BD%BF%E7%94%A8-psql-%E8%BF%9E%E6%8E%A5",children:"\u4f7f\u7528 psql \u8fde\u63a5"})," \u4ecb\u7ecd\u4e86\u8fde\u63a5\u5230 Cloudberry Database \u7684\u793a\u4f8b\u547d\u4ee4\u3002"]}),"\n",(0,s.jsx)(d.h2,{id:"\u652f\u6301\u7684\u5ba2\u6237\u7aef\u5e94\u7528\u7a0b\u5e8f",children:"\u652f\u6301\u7684\u5ba2\u6237\u7aef\u5e94\u7528\u7a0b\u5e8f"}),"\n",(0,s.jsx)(d.p,{children:"\u4f60\u53ef\u4ee5\u4f7f\u7528\u591a\u79cd\u5ba2\u6237\u7aef\u5e94\u7528\u7a0b\u5e8f\u8fde\u63a5\u5230 Cloudberry Database\uff1a"}),"\n",(0,s.jsxs)(d.ul,{children:["\n",(0,s.jsxs)(d.li,{children:["Cloudberry Database \u5b89\u88c5\u4e2d\u5305\u542b\u4e86\u4e00\u4e9b",(0,s.jsx)(d.a,{href:"#%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F",children:"\u5ba2\u6237\u7aef\u5e94\u7528\u7a0b\u5e8f"}),"\u3002\u5728\u8fd9\u4e9b\u5e94\u7528\u7a0b\u5e8f\u4e2d\uff0c",(0,s.jsx)(d.code,{children:"psql"})," \u662f\u4e00\u4e2a\u4ea4\u4e92\u5f0f\u547d\u4ee4\u884c\u754c\u9762\u3002"]}),"\n",(0,s.jsxs)(d.li,{children:["\u4f7f\u7528\u6807\u51c6\u7684",(0,s.jsx)(d.a,{href:"#%E4%BD%BF%E7%94%A8%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F%E6%8E%A5%E5%8F%A3%E8%BF%9E%E6%8E%A5",children:"\u6570\u636e\u5e93\u5e94\u7528\u7a0b\u5e8f\u63a5\u53e3"}),"\uff0c\u4f8b\u5982 ODBC \u548c JDBC\uff0c\u4f60\u53ef\u4ee5\u521b\u5efa\u81ea\u5df1\u7684\u5ba2\u6237\u7aef\u5e94\u7528\u7a0b\u5e8f\uff0c\u4e0e Cloudberry Database \u8fdb\u884c\u8fde\u63a5\u3002"]}),"\n",(0,s.jsx)(d.li,{children:"\u5927\u591a\u6570\u4f7f\u7528\u6807\u51c6\u6570\u636e\u5e93\u63a5\u53e3\uff08\u4f8b\u5982 ODBC \u548c JDBC\uff09\u7684\u5ba2\u6237\u7aef\u5de5\u5177\uff0c\u90fd\u53ef\u4ee5\u914d\u7f6e\u4e3a\u8fde\u63a5\u5230 Cloudberry Database\u3002"}),"\n"]}),"\n",(0,s.jsx)(d.h3,{id:"\u5ba2\u6237\u7aef\u5e94\u7528\u7a0b\u5e8f",children:"\u5ba2\u6237\u7aef\u5e94\u7528\u7a0b\u5e8f"}),"\n",(0,s.jsxs)(d.p,{children:["Cloudberry Database \u7684\u5b89\u88c5\u4e2d\uff0c\u968f\u9644\u5305\u542b\u4e86\u4e00\u4e9b\u5ba2\u6237\u7aef\u5de5\u5177\u5e94\u7528\u7a0b\u5e8f\uff0c\u4f4d\u4e8e coordinator \u4e3b\u673a\u5b89\u88c5\u7684 ",(0,s.jsx)(d.code,{children:"$GPHOME/bin"})," \u76ee\u5f55\u4e0b\u3002\u4ee5\u4e0b\u662f\u6700\u5e38\u7528\u7684\u5ba2\u6237\u7aef\u5e94\u7528\u7a0b\u5e8f\uff1a"]}),"\n",(0,s.jsxs)(d.table,{children:[(0,s.jsx)(d.thead,{children:(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.th,{children:"\u540d\u79f0"}),(0,s.jsx)(d.th,{children:"\u7528\u9014"})]})}),(0,s.jsxs)(d.tbody,{children:[(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"createdb"})}),(0,s.jsx)(d.td,{children:"\u521b\u5efa\u65b0\u7684\u6570\u636e\u5e93"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"createuser"})}),(0,s.jsx)(d.td,{children:"\u5b9a\u4e49\u65b0\u7684\u6570\u636e\u5e93\u89d2\u8272"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"dropdb"})}),(0,s.jsx)(d.td,{children:"\u5220\u9664\u6570\u636e\u5e93"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"dropuser"})}),(0,s.jsx)(d.td,{children:"\u5220\u9664\u89d2\u8272"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"psql"})}),(0,s.jsx)(d.td,{children:"PostgreSQL \u4ea4\u4e92\u7ec8\u7aef"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"reindexdb"})}),(0,s.jsx)(d.td,{children:"\u5bf9\u6570\u636e\u5e93\u8fdb\u884c\u91cd\u65b0\u7d22\u5f15"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"vacuumdb"})}),(0,s.jsx)(d.td,{children:"\u6536\u96c6\u5e76\u5206\u6790\u6570\u636e\u5e93\u7684\u5783\u573e"})]})]})]}),"\n",(0,s.jsxs)(d.p,{children:["\u4f7f\u7528\u8fd9\u4e9b\u5ba2\u6237\u7aef\u5e94\u7528\u7a0b\u5e8f\u65f6\uff0c\u60a8\u5fc5\u987b\u901a\u8fc7 coordinator \u5b9e\u4f8b\u8fde\u63a5\u5230\u6570\u636e\u5e93\u3002\u60a8\u9700\u8981\u77e5\u9053\u76ee\u6807\u6570\u636e\u5e93\u7684\u540d\u79f0\u3001coordinator \u7684\u4e3b\u673a\u540d\u548c\u7aef\u53e3\u53f7\uff0c\u4ee5\u53ca\u8981\u8fde\u63a5\u7684\u6570\u636e\u5e93\u7528\u6237\u540d\u3002\u4f60\u53ef\u4ee5\u5728\u8fde\u63a5\u547d\u4ee4\u4e0a\u4e2d\u4f7f\u7528 ",(0,s.jsx)(d.code,{children:"-d"}),"\u3001",(0,s.jsx)(d.code,{children:"-h"}),"\u3001",(0,s.jsx)(d.code,{children:"-p"})," \u548c ",(0,s.jsx)(d.code,{children:"-U"})," \u9009\u9879\u5206\u522b\u6307\u5b9a\u8fd9\u4e9b\u4fe1\u606f\u3002\u5982\u679c\u6ca1\u6709\u4e3a\u67d0\u4e2a\u53c2\u6570\u663e\u793a\u6307\u5b9a\u9009\u9879\uff0c\u6570\u636e\u5e93\u5c06\u9996\u5148\u4f7f\u7528\u6570\u636e\u5e93\u540d\u79f0\u6765\u4f5c\u4e3a\u8be5\u53c2\u6570\u7684\u9ed8\u8ba4\u503c\u3002"]}),"\n",(0,s.jsxs)(d.p,{children:["\u6240\u6709\u8fd9\u4e9b\u9009\u9879\u90fd\u6709\u9ed8\u8ba4\u503c\uff0c\u5982\u679c\u672a\u6307\u5b9a\u9009\u9879\uff0c\u5219\u4f7f\u7528\u8fd9\u4e9b\u9ed8\u8ba4\u503c\uff1a\u9ed8\u8ba4\u4e3b\u673a\u662f\u672c\u5730\u4e3b\u673a localhost\u3002\u9ed8\u8ba4\u7aef\u53e3\u53f7\u662f ",(0,s.jsx)(d.code,{children:"5432"}),"\u3002\u9ed8\u8ba4\u7528\u6237\u540d\u662f\u64cd\u4f5c\u7cfb\u7edf\u7684\u7528\u6237\u540d\u79f0\uff0c\u6570\u636e\u5e93\u540d\u79f0\u4e5f\u662f\u5982\u6b64\u3002\u8bf7\u6ce8\u610f\uff0c\u64cd\u4f5c\u7cfb\u7edf\u7528\u6237\u540d\u548c Cloudberry Database \u7528\u6237\u540d\u4e0d\u4e00\u5b9a\u76f8\u540c\u3002"]}),"\n",(0,s.jsxs)(d.p,{children:["\u5982\u679c\u9ed8\u8ba4\u503c\u4e0d\u6b63\u786e\uff0c\u60a8\u53ef\u4ee5\u9002\u5f53\u8bbe\u7f6e\u73af\u5883\u53d8\u91cf ",(0,s.jsx)(d.code,{children:"PGDATABASE"}),"\u3001",(0,s.jsx)(d.code,{children:"PGHOST"}),"\u3001",(0,s.jsx)(d.code,{children:"PGPORT"})," \u548c ",(0,s.jsx)(d.code,{children:"PGUSER"})," \u7684\u503c\uff0c\u6216\u4f7f\u7528 ",(0,s.jsx)(d.code,{children:"psql"})," \u7684 ",(0,s.jsx)(d.code,{children:"~/.pgpass"})," \u6587\u4ef6\u6765\u4fdd\u5b58\u7ecf\u5e38\u4f7f\u7528\u7684\u5bc6\u7801\u3002"]}),"\n",(0,s.jsx)(d.h3,{id:"\u4f7f\u7528-psql-\u8fde\u63a5",children:"\u4f7f\u7528 psql \u8fde\u63a5"}),"\n",(0,s.jsxs)(d.p,{children:["\u6839\u636e\u9ed8\u8ba4\u503c\u6216\u4f60\u8bbe\u7f6e\u7684\u73af\u5883\u53d8\u91cf\uff0c\u4f7f\u7528 ",(0,s.jsx)(d.code,{children:"psql"})," \u8bbf\u95ee\u6570\u636e\u5e93\uff0c\u793a\u4f8b\u5982\u4e0b\uff1a"]}),"\n",(0,s.jsx)(d.pre,{children:(0,s.jsx)(d.code,{className:"language-shell",children:"$ psql -d cbdb-database -h coordinator_host -p 5432 -U `gpadmin`\n"})}),"\n",(0,s.jsx)(d.pre,{children:(0,s.jsx)(d.code,{className:"language-shell",children:"$ psql cbdb-database\n"})}),"\n",(0,s.jsx)(d.pre,{children:(0,s.jsx)(d.code,{className:"language-shell",children:"$ psql\n"})}),"\n",(0,s.jsxs)(d.p,{children:["\u5982\u679c\u5c1a\u672a\u521b\u5efa\u7528\u6237\u5b9a\u4e49\u7684\u6570\u636e\u5e93\uff0c\u4f60\u53ef\u4ee5\u5148\u8fde\u63a5\u5230 ",(0,s.jsx)(d.code,{children:"postgres"})," \u6570\u636e\u5e93\u6765\u8bbf\u95ee\u7cfb\u7edf\u3002\u4f8b\u5982\uff1a"]}),"\n",(0,s.jsx)(d.pre,{children:(0,s.jsx)(d.code,{className:"language-shell",children:"$ psql postgres\n"})}),"\n",(0,s.jsxs)(d.p,{children:["\u8fde\u63a5\u5230\u6570\u636e\u5e93\u540e\uff0c",(0,s.jsx)(d.code,{children:"psql"})," \u5c55\u793a\u4e86\u4e00\u4e2a\u63d0\u793a\u7b26\uff0c\u63d0\u793a\u7b26\u540e\u9762\u662f ",(0,s.jsx)(d.code,{children:"psql"})," \u5f53\u524d\u8fde\u63a5\u7684\u6570\u636e\u5e93\u540d\u79f0\uff0c\u540e\u9762\u8ddf\u7740\u5b57\u7b26\u4e32 ",(0,s.jsx)(d.code,{children:"=>"}),"\uff08\u5982\u679c\u4f60\u662f\u6570\u636e\u5e93\u8d85\u7ea7\u7528\u6237\u5219\u4e3a ",(0,s.jsx)(d.code,{children:"=#"}),"\uff09\u3002\u4f8b\u5982\uff1a"]}),"\n",(0,s.jsx)(d.pre,{children:(0,s.jsx)(d.code,{className:"language-shell",children:"cbdb-database=>\n"})}),"\n",(0,s.jsxs)(d.p,{children:["\u5728\u63d0\u793a\u7b26\u4e2d\uff0c\u4f60\u53ef\u4ee5\u8f93\u5165 SQL \u547d\u4ee4\u3002\u4e3a\u4e86\u5c06 SQL \u547d\u4ee4\u53d1\u9001\u5230\u670d\u52a1\u5668\u5e76\u8fd0\u884c\uff0cSQL \u547d\u4ee4\u5fc5\u987b\u4ee5 ",(0,s.jsx)(d.code,{children:";"}),"\uff08\u5206\u53f7\uff09\u7ed3\u5c3e\u3002\u4f8b\u5982\uff1a"]}),"\n",(0,s.jsx)(d.pre,{children:(0,s.jsx)(d.code,{className:"language-sql",children:"=> SELECT * FROM mytable;\n"})}),"\n",(0,s.jsx)(d.h2,{id:"\u4f7f\u7528\u5e94\u7528\u7a0b\u5e8f\u63a5\u53e3\u8fde\u63a5",children:"\u4f7f\u7528\u5e94\u7528\u7a0b\u5e8f\u63a5\u53e3\u8fde\u63a5"}),"\n",(0,s.jsx)(d.p,{children:"\u4f60\u53ef\u80fd\u5e0c\u671b\u5f00\u53d1\u81ea\u5df1\u7684\u5ba2\u6237\u7aef\u5e94\u7528\u7a0b\u5e8f\u4e0e Cloudberry Database \u8fdb\u884c\u4ea4\u4e92\u3002PostgreSQL \u4e3a\u6700\u5e38\u7528\u7684\u6570\u636e\u5e93\u5e94\u7528\u7a0b\u5e8f\u7f16\u7a0b\u63a5\u53e3\uff08API\uff09\u63d0\u4f9b\u4e86\u4e00\u7cfb\u5217\u6570\u636e\u5e93\u9a71\u52a8\u7a0b\u5e8f\uff0c\u8fd9\u4e9b\u9a71\u52a8\u7a0b\u5e8f\u4e5f\u53ef\u4ee5\u4e0e Cloudberry Database \u4e00\u8d77\u4f7f\u7528\u3002\u8fd9\u4e9b\u9a71\u52a8\u7a0b\u5e8f\u9700\u8981\u5355\u72ec\u4e0b\u8f7d\u3002"}),"\n",(0,s.jsxs)(d.p,{children:["\u6bcf\u4e2a\u9a71\u52a8\u7a0b\u5e8f\uff08\u9664\u4e86\u968f PostgreSQL \u4e00\u8d77\u63d0\u4f9b\u7684 ",(0,s.jsx)(d.code,{children:"libpq"}),"\uff09\u90fd\u662f\u72ec\u7acb\u7684 PostgreSQL \u5f00\u53d1\u9879\u76ee\u3002\u4f60\u9700\u8981\u4e0b\u8f7d\u3001\u5b89\u88c5\u5e76\u914d\u7f6e\u8fd9\u4e9b\u5e94\u7528\u7a0b\u5e8f\uff0c\u624d\u80fd\u8fde\u63a5\u5230 Cloudberry Database\u3002\u8fd9\u4e9b\u9a71\u52a8\u7a0b\u5e8f\u5982\u4e0b\uff1a"]}),"\n",(0,s.jsxs)(d.table,{children:[(0,s.jsx)(d.thead,{children:(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.th,{children:"API"}),(0,s.jsx)(d.th,{children:"PostgreSQL \u9a71\u52a8\u7a0b\u5e8f"}),(0,s.jsx)(d.th,{children:"\u4e0b\u8f7d\u94fe\u63a5"})]})}),(0,s.jsxs)(d.tbody,{children:[(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"ODBC"}),(0,s.jsx)(d.td,{children:"psqlODBC"}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.a,{href:"https://odbc.postgresql.org/",children:"psqlODBC - PostgreSQL ODBC \u9a71\u52a8\u7a0b\u5e8f"})})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"JDBC"}),(0,s.jsx)(d.td,{children:"pgjdbc"}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.a,{href:"https://jdbc.postgresql.org/",children:"PostgreSQL JDBC \u9a71\u52a8\u7a0b\u5e8f"})})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"Perl DBI"}),(0,s.jsx)(d.td,{children:"pgperl"}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.a,{href:"https://metacpan.org/release/DBD-Pg",children:"DBD-Pg"})})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"Python DBI"}),(0,s.jsx)(d.td,{children:"pygresql"}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.a,{href:"http://www.pygresql.org/",children:"PyGreSQL"})})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"Python DBI"}),(0,s.jsx)(d.td,{children:"psycopg2"}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.a,{href:"https://www.psycopg.org/",children:"Psycopg"})})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"libpq C \u5e93"}),(0,s.jsx)(d.td,{children:"libpq"}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.a,{href:"https://www.postgresql.org/docs/14/libpq.html",children:"libpq - C \u5e93"})})]})]})]}),"\n",(0,s.jsx)(d.p,{children:"\u4f7f\u7528 API \u8bbf\u95ee Cloudberry Database \u7684\u901a\u7528\u8bf4\u660e\u662f\uff1a"}),"\n",(0,s.jsxs)(d.ol,{children:["\n",(0,s.jsx)(d.li,{children:"\u4ece\u9002\u5f53\u6765\u6e90\u4e0b\u8f7d\u4f60\u7684\u7f16\u7a0b\u8bed\u8a00\u5e73\u53f0\u548c\u76f8\u5e94\u7684 API\u3002\u4f8b\u5982\uff0c\u4f60\u53ef\u4ee5\u4ece Oracle \u83b7\u53d6 Java \u5f00\u53d1\u5de5\u5177\u5305\uff08JDK\uff09\u548c JDBC API\u3002"}),"\n",(0,s.jsx)(d.li,{children:"\u6839\u636e API \u89c4\u8303\uff0c\u7f16\u5199\u4f60\u7684\u5ba2\u6237\u7aef\u5e94\u7528\u7a0b\u5e8f\u3002\u5728\u7f16\u5199\u5e94\u7528\u7a0b\u5e8f\u65f6\uff0c\u8bf7\u6ce8\u610f Cloudberry Database \u4e2d\u7684 SQL \u652f\u6301\uff0c\u8fd9\u6837\u5c31\u4e0d\u4f1a\u5305\u542b\u4e0d\u53d7\u652f\u6301\u7684 SQL \u8bed\u6cd5\u3002"}),"\n"]}),"\n",(0,s.jsx)(d.p,{children:"\u4e0b\u8f7d\u9002\u5f53\u7684\u9a71\u52a8\u7a0b\u5e8f\u5e76\u914d\u7f6e\u4e0e\u4f60\u7684 Cloudberry Database coordinator \u5b9e\u4f8b\u7684\u8fde\u63a5\u3002"}),"\n",(0,s.jsx)(d.h2,{id:"\u5e38\u89c1\u8fde\u63a5\u95ee\u9898",children:"\u5e38\u89c1\u8fde\u63a5\u95ee\u9898"}),"\n",(0,s.jsx)(d.p,{children:"\u6709\u5f88\u591a\u539f\u56e0\u53ef\u80fd\u4f1a\u5bfc\u81f4\u5ba2\u6237\u7aef\u5e94\u7528\u7a0b\u5e8f\u65e0\u6cd5\u6210\u529f\u8fde\u63a5\u5230 Cloudberry Database\u3002\u4ee5\u4e0b\u8868\u683c\u4ecb\u7ecd\u4e86\u8fde\u63a5\u95ee\u9898\u7684\u4e00\u4e9b\u5e38\u89c1\u539f\u56e0\u4ee5\u53ca\u5982\u4f55\u89e3\u51b3\u3002"}),"\n",(0,s.jsxs)(d.table,{children:[(0,s.jsx)(d.thead,{children:(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.th,{children:"\u95ee\u9898"}),(0,s.jsx)(d.th,{children:"\u89e3\u51b3\u65b9\u6848"})]})}),(0,s.jsxs)(d.tbody,{children:[(0,s.jsxs)(d.tr,{children:[(0,s.jsxs)(d.td,{children:["\u6ca1\u6709\u9488\u5bf9\u4e3b\u673a\u6216\u7528\u6237\u7684 ",(0,s.jsx)(d.code,{children:"pg_hba.conf"})," \u6761\u76ee"]}),(0,s.jsxs)(d.td,{children:["\u8981\u5141\u8bb8\u8fdc\u7a0b\u5ba2\u6237\u7aef\u8fde\u63a5\u5230 Cloudberry Database\uff0c\u4f60\u9700\u8981\u914d\u7f6e Cloudberry Database coordinator \u5b9e\u4f8b\u4ee5\u63a5\u53d7\u8fd9\u4e9b\u8fde\u63a5\u3002\u8fd9\u9700\u8981\u901a\u8fc7\u5728 ",(0,s.jsx)(d.code,{children:"pg_hba.conf"})," \u914d\u7f6e\u6587\u4ef6\uff08\u8be5\u6587\u4ef6\u4f4d\u4e8e coordinator \u5b9e\u4f8b\u7684\u6570\u636e\u76ee\u5f55\u4e2d\uff09\u6dfb\u52a0\u9002\u5f53\u7684\u6761\u76ee\u6765\u5b9e\u73b0\u3002"]})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"Cloudberry Database \u6ca1\u6709\u8fd0\u884c"}),(0,s.jsxs)(d.td,{children:["\u5982\u679c Cloudberry Database coordinator \u5b9e\u4f8b\u505c\u6b62\u8fd0\u884c\uff0c\u7528\u6237\u5c06\u65e0\u6cd5\u8fde\u63a5\u3002\u4f60\u53ef\u4ee5\u901a\u8fc7\u5728 Cloudberry Database coordinator \u4e3b\u673a\u4e0a\u8fd0\u884c ",(0,s.jsx)(d.code,{children:"gpstate"})," \u5b9e\u7528\u7a0b\u5e8f\u6765\u9a8c\u8bc1 Cloudberry Database \u7cfb\u7edf\u662f\u5426\u5728\u8fd0\u884c\u3002"]})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:"\u7f51\u7edc\u95ee\u9898\uff1a\u8fde\u63a5\u8d85\u65f6"}),(0,s.jsxs)(d.td,{children:["\u5982\u679c\u7528\u6237\u4ece\u8fdc\u7a0b\u5ba2\u6237\u7aef\u8fde\u63a5\u5230 Cloudberry Database coordinator \u4e3b\u673a\uff0c\u7f51\u7edc\u95ee\u9898\u53ef\u80fd\u4f1a\u963b\u6b62\u8fde\u63a5\uff08\u4f8b\u5982\uff0cDNS \u4e3b\u673a\u540d\u89e3\u6790\u95ee\u9898\u3001\u4e3b\u673a\u7cfb\u7edf\u5173\u95ed\u7b49\uff09\u3002\u4e3a\u6392\u9664\u7f51\u7edc\u95ee\u9898\uff0c\u8bf7\u4ece\u8fdc\u7a0b\u5ba2\u6237\u7aef\u4e3b\u673a\u8fde\u63a5\u5230 Cloudberry Database coordinator \u4e3b\u673a\u3002\u4f8b\u5982\uff1a",(0,s.jsx)(d.code,{children:"ping hostname"}),"\u3002",(0,s.jsx)("br",{}),(0,s.jsx)("br",{}),"\u5982\u679c\u7cfb\u7edf\u65e0\u6cd5\u89e3\u6790\u53c2\u4e0e Cloudberry Database \u7684\u4e3b\u673a\u7684\u4e3b\u673a\u540d\u548c IP \u5730\u5740\uff0c\u67e5\u8be2\u548c\u8fde\u63a5\u5c06\u4f1a\u5931\u8d25\u3002\u67d0\u4e9b\u64cd\u4f5c\u4f1a\u4f7f\u7528 ",(0,s.jsx)(d.code,{children:"localhost"})," \u8fde\u63a5\u5230 Cloudberry Database coordinator\uff0c\u800c\u5176\u4ed6\u64cd\u4f5c\u5219\u4f1a\u4f7f\u7528\u5b9e\u9645\u7684\u4e3b\u673a\u540d\uff0c\u56e0\u6b64\u4f60\u5fc5\u987b\u80fd\u591f\u89e3\u6790\u8fd9\u4e24\u8005\u3002\u5982\u679c\u4f60\u9047\u5230\u8fd9\u4e2a\u9519\u8bef\uff0c\u8bf7\u9996\u5148\u786e\u4fdd\u4f60\u80fd\u591f\u4ece coordinator \u4e3b\u673a\u901a\u8fc7\u7f51\u7edc\u8fde\u63a5\u5230 Cloudberry Database \u5217\u8868\u4e2d\u7684\u6bcf\u4e2a\u4e3b\u673a\u3002\u5728 coordinator \u548c\u6240\u6709 segment \u7684 ",(0,s.jsx)(d.code,{children:"/etc/hosts"})," \u6587\u4ef6\u4e2d\uff0c\u786e\u4fdd\u4f60\u62e5\u6709 Cloudberry Database \u5217\u8868\u4e2d\u6d89\u53ca\u7684\u6240\u6709\u4e3b\u673a\u7684\u6b63\u786e\u4e3b\u673a\u540d\u548c IP \u5730\u5740\u3002",(0,s.jsx)(d.code,{children:"127.0.0.1"})," \u5fc5\u987b\u89e3\u6790\u4e3a ",(0,s.jsx)(d.code,{children:"localhost"}),"\u3002"]})]})]})]})]})}function o(e={}){const{wrapper:d}={...(0,n.a)(),...e.components};return d?(0,s.jsx)(d,{...e,children:(0,s.jsx)(a,{...e})}):a(e)}},11151:(e,d,r)=>{r.d(d,{Z:()=>t,a:()=>c});var s=r(67294);const n={},l=s.createContext(n);function c(e){const d=s.useContext(l);return s.useMemo((function(){return"function"==typeof e?e(d):{...d,...e}}),[d,e])}function t(e){let d;return d=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:c(e.components),s.createElement(l.Provider,{value:d},e.children)}}}]);