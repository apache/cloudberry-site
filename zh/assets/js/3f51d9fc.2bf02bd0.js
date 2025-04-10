"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[1357],{42079:(e,n,c)=>{c.r(n),c.d(n,{assets:()=>t,contentTitle:()=>s,default:()=>o,frontMatter:()=>l,metadata:()=>i,toc:()=>a});var d=c(85893),r=c(11151);const l={title:"\u521b\u5efa\u548c\u7ba1\u7406\u8868"},s="\u5728 Apache Cloudberry \u4e2d\u521b\u5efa\u548c\u7ba1\u7406\u8868",i={id:"create-and-manage-tables",title:"\u521b\u5efa\u548c\u7ba1\u7406\u8868",description:"Apache Cloudberry \u4e2d\u7684\u8868\u7c7b\u4f3c\u4e8e\u5176\u4ed6\u5173\u7cfb\u578b\u6570\u636e\u5e93\u4e2d\u7684\u8868\uff0c\u4e0d\u8fc7\u8868\u7684\u884c\u6570\u636e\u5206\u5e03\u5728\u4e0d\u540c Segment \u4e0a\u3002\u521b\u5efa\u8868\u65f6\uff0c\u4f60\u9700\u8981\u6307\u5b9a\u8868\u7684\u5206\u5e03\u7b56\u7565\u3002",source:"@site/i18n/zh/docusaurus-plugin-content-docs/current/create-and-manage-tables.md",sourceDirName:".",slug:"/create-and-manage-tables",permalink:"/zh/docs/create-and-manage-tables",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/i18n/zh/docusaurus-plugin-content-docs/current/create-and-manage-tables.md",tags:[],version:"current",lastUpdatedBy:"Dianjin Wang",lastUpdatedAt:1744271659,formattedLastUpdatedAt:"2025\u5e744\u670810\u65e5",frontMatter:{title:"\u521b\u5efa\u548c\u7ba1\u7406\u8868"},sidebar:"docsbars",previous:{title:"Create and Manage Tablespaces",permalink:"/zh/docs/create-and-manage-tablespaces"},next:{title:"\u521b\u5efa\u548c\u7ba1\u7406 Schema",permalink:"/zh/docs/create-and-manage-schemas"}},t={},a=[{value:"\u521b\u5efa\u8868",id:"\u521b\u5efa\u8868",level:2},{value:"\u9009\u62e9\u5217\u6570\u636e\u7c7b\u578b",id:"\u9009\u62e9\u5217\u6570\u636e\u7c7b\u578b",level:3},{value:"\u8bbe\u7f6e\u8868\u548c\u5217\u7ea6\u675f",id:"\u8bbe\u7f6e\u8868\u548c\u5217\u7ea6\u675f",level:3},{value:"\u68c0\u67e5\u7ea6\u675f",id:"\u68c0\u67e5\u7ea6\u675f",level:4},{value:"\u975e\u7a7a\u7ea6\u675f",id:"\u975e\u7a7a\u7ea6\u675f",level:4},{value:"\u552f\u4e00\u7ea6\u675f",id:"\u552f\u4e00\u7ea6\u675f",level:4},{value:"\u4e3b\u952e",id:"\u4e3b\u952e",level:4},{value:"\u5916\u952e",id:"\u5916\u952e",level:4},{value:"\u6392\u9664\u7ea6\u675f",id:"\u6392\u9664\u7ea6\u675f",level:4}];function h(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.a)(),...e.components};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(n.h1,{id:"\u5728-apache-cloudberry-\u4e2d\u521b\u5efa\u548c\u7ba1\u7406\u8868",children:"\u5728 Apache Cloudberry \u4e2d\u521b\u5efa\u548c\u7ba1\u7406\u8868"}),"\n",(0,d.jsx)(n.p,{children:"Apache Cloudberry \u4e2d\u7684\u8868\u7c7b\u4f3c\u4e8e\u5176\u4ed6\u5173\u7cfb\u578b\u6570\u636e\u5e93\u4e2d\u7684\u8868\uff0c\u4e0d\u8fc7\u8868\u7684\u884c\u6570\u636e\u5206\u5e03\u5728\u4e0d\u540c Segment \u4e0a\u3002\u521b\u5efa\u8868\u65f6\uff0c\u4f60\u9700\u8981\u6307\u5b9a\u8868\u7684\u5206\u5e03\u7b56\u7565\u3002"}),"\n",(0,d.jsx)(n.h2,{id:"\u521b\u5efa\u8868",children:"\u521b\u5efa\u8868"}),"\n",(0,d.jsxs)(n.p,{children:["\u4f7f\u7528 ",(0,d.jsx)(n.code,{children:"CREATE TABLE"})," \u547d\u4ee4\u521b\u5efa\u8868\u5e76\u5b9a\u4e49\u8868\u7ed3\u6784\u3002\u521b\u5efa\u8868\u65f6\u4f1a\u5b9a\u4e49\uff1a"]}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsxs)(n.li,{children:["\u8868\u7684\u5217\u53ca\u5176\u5173\u8054\u7684\u6570\u636e\u7c7b\u578b\u3002\u8bf7\u53c2\u9605",(0,d.jsx)(n.a,{href:"#%E9%80%89%E6%8B%A9%E5%88%97%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B",children:"\u9009\u62e9\u5217\u6570\u636e\u7c7b\u578b"}),"\u3002"]}),"\n",(0,d.jsxs)(n.li,{children:["\u7528\u4e8e\u9650\u5236\u5217\u6216\u8868\u7684\u7ea6\u675f\u3002\u8bf7\u53c2\u9605",(0,d.jsx)(n.a,{href:"#%E8%AE%BE%E7%BD%AE%E8%A1%A8%E5%92%8C%E5%88%97%E7%BA%A6%E6%9D%9F",children:"\u8bbe\u7f6e\u8868\u548c\u5217\u7ea6\u675f"}),"\u3002"]}),"\n",(0,d.jsx)(n.li,{children:"\u8868\u7684\u5206\u5e03\u7b56\u7565\uff0c\u7528\u4e8e\u5b9a\u4e49 Segment \u4e4b\u95f4\u5212\u5206\u6570\u636e\u7684\u4f9d\u636e\u3002"}),"\n",(0,d.jsx)(n.li,{children:"\u8868\u5728\u78c1\u76d8\u4e0a\u7684\u5b58\u50a8\u65b9\u5f0f\u3002"}),"\n",(0,d.jsx)(n.li,{children:"\u5927\u8868\u7684\u8868\u5206\u533a\u7b56\u7565\u3002"}),"\n"]}),"\n",(0,d.jsx)(n.h3,{id:"\u9009\u62e9\u5217\u6570\u636e\u7c7b\u578b",children:"\u9009\u62e9\u5217\u6570\u636e\u7c7b\u578b"}),"\n",(0,d.jsx)(n.p,{children:"\u5217\u7684\u6570\u636e\u7c7b\u578b\u51b3\u5b9a\u4e86\u8be5\u5217\u53ef\u4ee5\u5305\u542b\u7684\u6570\u636e\u7c7b\u578b\u3002\u4f18\u5148\u9009\u62e9\u5360\u7528\u7a7a\u95f4\u5c0f\uff0c\u5e76\u80fd\u7ea6\u675f\u6570\u636e\u7684\u6700\u4f73\u6570\u636e\u7c7b\u578b\u3002\u4f8b\u5982\uff0c\u5b57\u7b26\u4e32\u4f7f\u7528\u5b57\u7b26\u7c7b\u578b\uff0c\u65e5\u671f\u4f7f\u7528\u65e5\u671f\u6216\u65f6\u95f4\u6233\u7c7b\u578b\uff0c\u6570\u5b57\u4f7f\u7528\u6570\u5b57\u7c7b\u578b\u3002"}),"\n",(0,d.jsxs)(n.p,{children:["\u5bf9\u4e8e\u5305\u542b\u6587\u672c\u6570\u636e\u7684\u5217\uff0c\u5efa\u8bae\u6307\u5b9a\u4e3a ",(0,d.jsx)(n.code,{children:"VARCHAR"})," \u6216 ",(0,d.jsx)(n.code,{children:"TEXT"})," \u7c7b\u578b\uff0c\u4e0d\u5efa\u8bae\u6307\u5b9a\u4e3a ",(0,d.jsx)(n.code,{children:"CHAR"})," \u7c7b\u578b\u3002\u5728 Apache Cloudberry \u4e2d\uff0c\u4f7f\u7528 ",(0,d.jsx)(n.code,{children:"VARCHAR"})," \u6216 ",(0,d.jsx)(n.code,{children:"TEXT"})," \u7c7b\u578b\uff0c\u6dfb\u52a0\u5230\u6570\u636e\u4e2d\u7684\u586b\u5145\uff08\u5373\u5728\u6700\u540e\u4e00\u4e2a\u975e\u7a7a\u683c\u5b57\u7b26\u4e4b\u540e\u6dfb\u52a0\u7684\u7a7a\u683c\u5b57\u7b26\uff09\u88ab\u5904\u7406\u4e3a\u91cd\u8981\u5b57\u7b26\uff0c\u800c\u5728 ",(0,d.jsx)(n.code,{children:"CHAR"})," \u7c7b\u578b\u4e2d\u5219\u4e0d\u89c6\u4e3a\u91cd\u8981\u5b57\u7b26\u3002"]}),"\n",(0,d.jsxs)(n.p,{children:["\u5bf9\u6570\u503c\u7c7b\u578b\u8fdb\u884c\u9009\u62e9\u65f6\uff0c\u786e\u4fdd\u8be5\u7c7b\u578b\u80fd\u5bb9\u7eb3\u5217\u4e0a\u7684\u6570\u503c\u6570\u636e\uff0c\u8fd8\u652f\u6301\u540e\u7eed\u6269\u5c55\uff0c\u5728\u6ee1\u8db3\u8fd9\u4e24\u70b9\u6761\u4ef6\u540e\uff0c\u9009\u62e9\u4e00\u4e2a\u6700\u5c0f\u7684\u6570\u636e\u7c7b\u578b\u3002\u4f8b\u5982\uff0c\u5982\u679c ",(0,d.jsx)(n.code,{children:"INT"})," \u6216 ",(0,d.jsx)(n.code,{children:"SMALLINT"})," \u7c7b\u578b\u5c31\u8db3\u4ee5\u5bb9\u7eb3\u6570\u503c\u6570\u636e\uff0c\u90a3\u4e48\u4f7f\u7528 ",(0,d.jsx)(n.code,{children:"BIGINT"})," \u7c7b\u578b\u5c31\u4f1a\u6d6a\u8d39\u5b58\u50a8\u7a7a\u95f4\u3002\u8bf7\u6ce8\u610f\uff0c\u5982\u679c\u9884\u8ba1\u6570\u503c\u4f1a\u968f\u65f6\u95f4\u6269\u5c55\uff0c\u5728\u52a0\u8f7d\u5927\u91cf\u6570\u636e\u540e\uff0c\u4ece\u8f83\u5c0f\u7684\u6570\u636e\u7c7b\u578b\u66f4\u6539\u4e3a\u8f83\u5927\u7684\u6570\u636e\u7c7b\u578b\u4f1a\u4ea7\u751f\u9ad8\u6210\u672c\u3002\u4f8b\u5982\uff0c\u5f53\u524d\u7684\u6570\u636e\u503c\u9002\u5408 ",(0,d.jsx)(n.code,{children:"SMALLINT"}),"\uff0c\u5982\u679c\u9884\u8ba1\u6570\u636e\u4f1a\u6269\u5c55\uff0c\u5219 ",(0,d.jsx)(n.code,{children:"INT"})," \u662f\u66f4\u597d\u7684\u957f\u671f\u9009\u62e9\u3002"]}),"\n",(0,d.jsx)(n.p,{children:"\u5bf9\u8de8\u8868\u8fde\u63a5\u4e2d\u7684\u5217\uff0c\u8bf7\u4f7f\u7528\u76f8\u540c\u7684\u6570\u636e\u7c7b\u578b\u3002\u8de8\u8868\u8fde\u63a5\u901a\u5e38\u6d89\u53ca\u4e00\u5f20\u8868\u4e2d\u7684\u4e3b\u952e\u548c\u53e6\u4e00\u5f20\u8868\u4e2d\u7684\u5916\u952e\u3002\u5f53\u6570\u636e\u7c7b\u578b\u4e0d\u540c\u65f6\uff0c\u6570\u636e\u5e93\u9700\u8981\u8f6c\u6362\u6570\u636e\u7c7b\u578b\u4f7f\u4e4b\u76f8\u540c\uff0c\u4ee5\u4fbf\u80fd\u591f\u6b63\u786e\u6bd4\u8f83\u6570\u636e\u503c\uff0c\u4f46\u8fd9\u5c06\u589e\u52a0\u4e0d\u5fc5\u8981\u7684\u5f00\u9500\u3002"}),"\n",(0,d.jsx)(n.h3,{id:"\u8bbe\u7f6e\u8868\u548c\u5217\u7ea6\u675f",children:"\u8bbe\u7f6e\u8868\u548c\u5217\u7ea6\u675f"}),"\n",(0,d.jsx)(n.p,{children:"\u4e3a\u8868\u548c\u5217\u8bbe\u7f6e\u7ea6\u675f\uff0c\u53ef\u4ee5\u9650\u5236\u8868\u4e2d\u7684\u6570\u636e\u3002Apache Cloudberry \u5bf9\u7ea6\u675f\u7684\u652f\u6301\u4e0e PostgreSQL \u76f8\u540c\uff0c\u4f46\u6709\u4e00\u4e9b\u9650\u5236\uff0c\u5305\u62ec\uff1a"}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"CHECK"})," \u7ea6\u675f\u53ea\u80fd\u5f15\u7528\u5176\u5b9a\u4e49\u7684\u8868\u3002"]}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"UNIQUE"})," \u548c ",(0,d.jsx)(n.code,{children:"PRIMARY KEY"})," \u7ea6\u675f\u5fc5\u987b\u4e0e\u8868\u7684\u5206\u5e03\u952e\u548c\u5206\u533a\u952e\uff08\u5982\u679c\u6709\uff09\u517c\u5bb9\u3002"]}),"\n",(0,d.jsx)(n.admonition,{title:"\u6ce8\u610f",type:"info",children:(0,d.jsxs)(n.p,{children:["\u4e0d\u5141\u8bb8\u5728 Append-Optimized \u8868\u4e0a\u4f7f\u7528 ",(0,d.jsx)(n.code,{children:"UNIQUE"})," \u548c ",(0,d.jsx)(n.code,{children:"PRIMARY KEY"})," \u7ea6\u675f\uff0c\u56e0\u4e3a Append-Optimized \u8868\u4e0d\u652f\u6301\u8fd9\u4e9b\u7ea6\u675f\u6240\u521b\u5efa\u7684 ",(0,d.jsx)(n.code,{children:"UNIQUE"})," \u7d22\u5f15\u3002"]})}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"FOREIGN KEY"})," \u7ea6\u675f\u662f\u5141\u8bb8\u7684\uff0c\u4f46\u4e0d\u4f1a\u5f3a\u5236\u6267\u884c\u3002"]}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsx)(n.p,{children:"\u5728\u5206\u533a\u8868\u4e0a\u5b9a\u4e49\u7684\u7ea6\u675f\u9002\u7528\u4e8e\u6574\u4e2a\u5206\u533a\u8868\u3002\u4e0d\u80fd\u5728\u8868\u7684\u5404\u4e2a\u90e8\u5206\u4e0a\u5b9a\u4e49\u7ea6\u675f\u3002"}),"\n"]}),"\n"]}),"\n",(0,d.jsx)(n.h4,{id:"\u68c0\u67e5\u7ea6\u675f",children:"\u68c0\u67e5\u7ea6\u675f"}),"\n",(0,d.jsxs)(n.p,{children:["\u68c0\u67e5 (Check) \u7ea6\u675f\u6307\u5b9a\u67d0\u4e2a\u5217\u4e2d\u7684\u503c\u5fc5\u987b\u6ee1\u8db3\u5e03\u5c14\uff08\u771f\u503c\uff09\u8868\u8fbe\u5f0f\u3002\u4f8b\u5982\uff0c\u4ee5\u4e0b\u8868\u4e2d\uff0c",(0,d.jsx)(n.code,{children:"price"})," \u5217\u53ea\u80fd\u5305\u542b\u6b63\u6570\u503c\uff1a"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-sql",children:"=> CREATE TABLE products \n            ( product_no integer, \n              name text, \n              price numeric CHECK (price > 0) );\n"})}),"\n",(0,d.jsx)(n.h4,{id:"\u975e\u7a7a\u7ea6\u675f",children:"\u975e\u7a7a\u7ea6\u675f"}),"\n",(0,d.jsx)(n.p,{children:"\u975e\u7a7a\u7ea6\u675f\u6307\u5b9a\u67d0\u4e2a\u5217\u4e0d\u80fd\u91c7\u7528\u7a7a\u503c\u3002\u975e\u7a7a\u7ea6\u675f\u59cb\u7ec8\u5199\u6210\u5217\u7ea6\u675f\u7684\u5f62\u5f0f\u3002\u4f8b\u5982\uff1a"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-sql",children:"=> CREATE TABLE products \n       ( product_no integer NOT NULL,\n         name text NOT NULL,\n         price numeric );\n"})}),"\n",(0,d.jsx)(n.h4,{id:"\u552f\u4e00\u7ea6\u675f",children:"\u552f\u4e00\u7ea6\u675f"}),"\n",(0,d.jsx)(n.p,{children:"\u552f\u4e00\u7ea6\u675f\u53ef\u786e\u4fdd\u67d0\u5217\u6216\u4e00\u7ec4\u5217\u4e2d\u5305\u542b\u7684\u6570\u636e\u76f8\u5bf9\u4e8e\u8868\u4e2d\u7684\u6240\u6709\u884c\u662f\u552f\u4e00\u7684\u3002\u8868\u5fc5\u987b\u662f\u54c8\u5e0c\u5206\u5e03\u7684\u6216\u590d\u5236\u7684\uff08\u800c\u4e0d\u662f\u968f\u673a\u5206\u5e03\u7684\uff09\u3002\u5982\u679c\u8868\u662f\u54c8\u5e0c\u5206\u5e03\u7684\uff0c\u5219\u7ea6\u675f\u5217\u5fc5\u987b\u4e0e\u8868\u7684\u5206\u5e03\u952e\u5217\u76f8\u540c\u6216\u662f\u5176\u5b50\u96c6\u3002\u4f8b\u5982\uff1a"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-sql",children:"=> CREATE TABLE products \n       ( product_no integer `UNIQUE`, \n         name text, \n         price numeric)\n      DISTRIBUTED BY (product_no);\n"})}),"\n",(0,d.jsx)(n.h4,{id:"\u4e3b\u952e",children:"\u4e3b\u952e"}),"\n",(0,d.jsxs)(n.p,{children:["\u4e3b\u952e\u7ea6\u675f\u662f ",(0,d.jsx)(n.code,{children:"UNIQUE"})," \u7ea6\u675f\u548c ",(0,d.jsx)(n.code,{children:"NOT NULL"})," \u7ea6\u675f\u7684\u7ec4\u5408\u3002\u8868\u5fc5\u987b\u662f\u54c8\u5e0c\u5206\u5e03\u7684\uff08\u800c\u4e0d\u662f\u968f\u673a\u5206\u5e03\u7684\uff09\uff0c\u800c\u4e3b\u952e\u5217\u5fc5\u987b\u4e0e\u8868\u7684\u5206\u5e03\u952e\u5217\u76f8\u540c\u6216\u662f\u5176\u8d85\u96c6\u3002\u5982\u679c\u8868\u6709\u4e3b\u952e\uff0c\u5219\u8be5\u5217\uff08\u6216\u5217\u7ec4\uff09\u9ed8\u8ba4\u4e3a\u8868\u7684\u5206\u5e03\u952e\u3002\u4f8b\u5982\uff1a"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-sql",children:"=> CREATE TABLE products \n       ( `product_no` integer `PRIMARY KEY`, \n         name text, \n         price numeric)\n`      DISTRIBUTED BY (``product_no``)`;\n"})}),"\n",(0,d.jsx)(n.h4,{id:"\u5916\u952e",children:"\u5916\u952e"}),"\n",(0,d.jsx)(n.p,{children:"Apache Cloudberry \u4e0d\u652f\u6301\u5916\u952e\u3002\u867d\u7136\u5728\u6570\u636e\u5e93\u4e2d\u53ef\u4ee5\u58f0\u660e\u5916\u952e\uff0c\u4f46\u4e0d\u4f1a\u5f3a\u5236\u6267\u884c\u53c2\u7167\u5b8c\u6574\u6027\u3002"}),"\n",(0,d.jsx)(n.p,{children:"\u5916\u952e\u7ea6\u675f\u6307\u5b9a\u67d0\u5217\u6216\u4e00\u7ec4\u5217\u4e2d\u7684\u503c\u5fc5\u987b\u4e0e\u53e6\u4e00\u5f20\u8868\u7684\u67d0\u4e00\u884c\u4e2d\u7684\u503c\u5339\u914d\uff0c\u4ee5\u4fdd\u6301\u4e24\u4e2a\u76f8\u5173\u8868\u4e4b\u95f4\u7684\u53c2\u7167\u5b8c\u6574\u6027\u3002\u5728 Apache Cloudberry \u7684\u5206\u5e03\u8868 Segment \u4e4b\u95f4\uff0c\u65e0\u6cd5\u5f3a\u5236\u6267\u884c\u53c2\u7167\u5b8c\u6574\u6027\u68c0\u67e5\u3002"}),"\n",(0,d.jsx)(n.h4,{id:"\u6392\u9664\u7ea6\u675f",children:"\u6392\u9664\u7ea6\u675f"}),"\n",(0,d.jsx)(n.p,{children:"\u6392\u9664\u7ea6\u675f\u786e\u4fdd\u5982\u679c\u4f7f\u7528\u6307\u5b9a\u7684\u8fd0\u7b97\u7b26\u5728\u6307\u5b9a\u7684\u5217\u6216\u8868\u8fbe\u5f0f\u4e0a\u6bd4\u8f83\u4efb\u610f\u4e24\u884c\uff0c\u81f3\u5c11\u5176\u4e2d\u4e00\u4e2a\u8fd0\u7b97\u7b26\u6bd4\u8f83\u5c06\u8fd4\u56de false \u6216 null\u3002\u8bed\u6cd5\u4e3a\uff1a"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-sql",children:"CREATE TABLE circles (\n    c circle,\n    EXCLUDE USING gist (c WITH &&)\n) DISTRIBUTED REPLICATED;\n"})}),"\n",(0,d.jsxs)(n.p,{children:["\u4e0e\u552f\u4e00\u7ea6\u675f\u7c7b\u4f3c\uff0c\u6392\u9664\u7ea6\u675f\u4ec5\u9002\u7528\u4e8e\u590d\u5236\u7684\u8868\u6216\u5f53\u5206\u5e03\u952e\u5217\u662f\u7ea6\u675f\u7684\u4e00\u90e8\u5206\uff0c\u4f7f\u7528\u4e0e\u5206\u5e03\u952e\u7684\u54c8\u5e0c\u8fd0\u7b97\u7b26\u7c7b\u4f3c\u7684 ",(0,d.jsx)(n.code,{children:"="})," \u8fd0\u7b97\u7b26\u3002"]}),"\n",(0,d.jsx)(n.p,{children:"\u5206\u533a\u8868\u4e0d\u652f\u6301\u6392\u9664\u7ea6\u675f\u3002"}),"\n",(0,d.jsxs)(n.p,{children:["\u8bf7\u53c2\u9605 ",(0,d.jsx)(n.a,{href:"https://github.com/apache/cloudberry-site/blob/cbdb-doc-validation/docs/sql-stmts/create-table.md",children:(0,d.jsx)(n.code,{children:"CREATE TABLE ... CONSTRAINT ... EXCLUDE"})})," \u4ee5\u67e5\u770b\u8be6\u60c5\u3002"]}),"\n",(0,d.jsx)(n.p,{children:"\u6dfb\u52a0\u6392\u9664\u7ea6\u675f\u4f1a\u81ea\u52a8\u521b\u5efa\u7ea6\u675f\u58f0\u660e\u4e2d\u6307\u5b9a\u7c7b\u578b\u7684\u7d22\u5f15\u3002"})]})}function o(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,d.jsx)(n,{...e,children:(0,d.jsx)(h,{...e})}):h(e)}},11151:(e,n,c)=>{c.d(n,{Z:()=>i,a:()=>s});var d=c(67294);const r={},l=d.createContext(r);function s(e){const n=d.useContext(l);return d.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),d.createElement(l.Provider,{value:n},e.children)}}}]);