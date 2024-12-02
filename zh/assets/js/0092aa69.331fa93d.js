"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[8927],{26825:(e,a,n)=>{n.r(a),n.d(a,{assets:()=>t,contentTitle:()=>l,default:()=>h,frontMatter:()=>r,metadata:()=>c,toc:()=>o});var d=n(85893),s=n(11151);const r={title:"\u521b\u5efa\u548c\u7ba1\u7406\u6570\u636e\u5e93"},l="\u521b\u5efa\u548c\u7ba1\u7406 Cloudberry Database",c={id:"create-and-manage-database",title:"\u521b\u5efa\u548c\u7ba1\u7406\u6570\u636e\u5e93",description:"Cloudberry Database \u7cfb\u7edf\u662f Cloudberry Database \u7684\u5355\u4e2a\u5b9e\u4f8b\u3002\u5728 Cloudberry Database \u4e2d\u53ef\u80fd\u6709\u591a\u4e2a\u6b63\u5728\u8fd0\u884c\u7684\u6570\u636e\u5e93\u7cfb\u7edf\uff0c\u4f46\u901a\u5e38\u5ba2\u6237\u7aef\u53ea\u80fd\u8fde\u63a5\u5230\u5176\u4e2d\u4e00\u4e2a\u7cfb\u7edf\u3002",source:"@site/i18n/zh/docusaurus-plugin-content-docs/current/create-and-manage-database.md",sourceDirName:".",slug:"/create-and-manage-database",permalink:"/zh/docs/create-and-manage-database",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/i18n/zh/docusaurus-plugin-content-docs/current/create-and-manage-database.md",tags:[],version:"current",lastUpdatedBy:"vitalzf",lastUpdatedAt:1733108055,formattedLastUpdatedAt:"2024\u5e7412\u67082\u65e5",frontMatter:{title:"\u521b\u5efa\u548c\u7ba1\u7406\u6570\u636e\u5e93"},sidebar:"docsbars",previous:{title:"\u4ece Web \u670d\u52a1\u52a0\u8f7d\u6570\u636e",permalink:"/zh/docs/data-loading/load-data-from-web-services"},next:{title:"\u542f\u52a8\u548c\u505c\u6b62\u6570\u636e\u5e93",permalink:"/zh/docs/start-and-stop-cbdb-database"}},t={},o=[{value:"\u6a21\u677f\u548c\u9ed8\u8ba4\u6570\u636e\u5e93",id:"\u6a21\u677f\u548c\u9ed8\u8ba4\u6570\u636e\u5e93",level:2},{value:"\u521b\u5efa\u6570\u636e\u5e93",id:"\u521b\u5efa\u6570\u636e\u5e93",level:2},{value:"\u514b\u9686\u6570\u636e\u5e93",id:"\u514b\u9686\u6570\u636e\u5e93",level:3},{value:"\u521b\u5efa\u6570\u636e\u5e93\u65f6\u5206\u914d\u5176\u4ed6\u6240\u6709\u8005",id:"\u521b\u5efa\u6570\u636e\u5e93\u65f6\u5206\u914d\u5176\u4ed6\u6240\u6709\u8005",level:3},{value:"\u67e5\u770b\u6570\u636e\u5e93\u5217\u8868",id:"\u67e5\u770b\u6570\u636e\u5e93\u5217\u8868",level:2},{value:"\u66f4\u6539\u6570\u636e\u5e93",id:"\u66f4\u6539\u6570\u636e\u5e93",level:2},{value:"\u5220\u9664\u6570\u636e\u5e93",id:"\u5220\u9664\u6570\u636e\u5e93",level:2}];function i(e){const a={admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,s.a)(),...e.components};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(a.h1,{id:"\u521b\u5efa\u548c\u7ba1\u7406-cloudberry-database",children:"\u521b\u5efa\u548c\u7ba1\u7406 Cloudberry Database"}),"\n",(0,d.jsx)(a.p,{children:"Cloudberry Database \u7cfb\u7edf\u662f Cloudberry Database \u7684\u5355\u4e2a\u5b9e\u4f8b\u3002\u5728 Cloudberry Database \u4e2d\u53ef\u80fd\u6709\u591a\u4e2a\u6b63\u5728\u8fd0\u884c\u7684\u6570\u636e\u5e93\u7cfb\u7edf\uff0c\u4f46\u901a\u5e38\u5ba2\u6237\u7aef\u53ea\u80fd\u8fde\u63a5\u5230\u5176\u4e2d\u4e00\u4e2a\u7cfb\u7edf\u3002"}),"\n",(0,d.jsx)(a.p,{children:"\u4e00\u4e2a Cloudberry Database \u6570\u636e\u5e93\u7cfb\u7edf (DBMS) \u4e2d\u53ef\u80fd\u6709\u591a\u4e2a\u6570\u636e\u5e93\u3002\u8fd9\u4e0d\u540c\u4e8e\u67d0\u4e9b\u201c\u6570\u636e\u5e93\u5b9e\u4f8b\u5373\u662f\u6570\u636e\u5e93\u201d\u7684 DBMS\uff0c\u4f8b\u5982 Oracle\u3002\u5c3d\u7ba1\u4f60\u53ef\u4ee5\u5728 Cloudberry Database \u7cfb\u7edf\u4e2d\u521b\u5efa\u591a\u4e2a\u6570\u636e\u5e93\uff0c\u4f46\u5ba2\u6237\u7aef\u7a0b\u5e8f\u4e00\u6b21\u53ea\u80fd\u8fde\u63a5\u548c\u8bbf\u95ee\u4e00\u4e2a\u6570\u636e\u5e93\uff0c\u800c\u4e0d\u80fd\u5728\u6570\u636e\u5e93\u4e4b\u95f4\u8fdb\u884c\u4ea4\u53c9\u67e5\u8be2\u3002"}),"\n",(0,d.jsx)(a.h2,{id:"\u6a21\u677f\u548c\u9ed8\u8ba4\u6570\u636e\u5e93",children:"\u6a21\u677f\u548c\u9ed8\u8ba4\u6570\u636e\u5e93"}),"\n",(0,d.jsxs)(a.p,{children:["Cloudberry Database \u63d0\u4f9b\u4e86\u82e5\u5e72\u6a21\u677f\u6570\u636e\u5e93\uff08",(0,d.jsx)(a.code,{children:"template1"})," \u548c ",(0,d.jsx)(a.code,{children:"template0"})," \uff09\u548c\u9ed8\u8ba4\u6570\u636e\u5e93 (",(0,d.jsx)(a.code,{children:"postgres"}),")\u3002"]}),"\n",(0,d.jsxs)(a.p,{children:["\u9ed8\u8ba4\u60c5\u51b5\u4e0b\uff0c\u4f60\u521b\u5efa\u7684\u6bcf\u4e2a\u65b0\u6570\u636e\u5e93\u90fd\u57fa\u4e8e ",(0,d.jsx)(a.code,{children:"template1"})," \u6570\u636e\u5e93\u3002\u9664\u975e\u4f60\u6307\u5b9a\u4e86\u5176\u4ed6\u6a21\u677f\u6570\u636e\u5e93\uff0cCloudberry Database \u9ed8\u8ba4\u4f7f\u7528 ",(0,d.jsx)(a.code,{children:"template1"})," \u521b\u5efa\u6570\u636e\u5e93\u3002\u4e0d\u5efa\u8bae\u5728 ",(0,d.jsx)(a.code,{children:"template1"})," \u4e2d\u521b\u5efa\u6570\u636e\u5e93\u5bf9\u8c61\uff0c\u5426\u5219\u57fa\u4e8e ",(0,d.jsx)(a.code,{children:"template1"})," \u65b0\u521b\u5efa\u7684\u6bcf\u4e2a\u6570\u636e\u5e93\u4e2d\u90fd\u6709\u8fd9\u4e9b\u5bf9\u8c61\u3002"]}),"\n",(0,d.jsxs)(a.p,{children:["Cloudberry Database \u5728\u5185\u90e8\u4f7f\u7528\u53e6\u4e00\u4e2a\u6570\u636e\u5e93\u6a21\u677f ",(0,d.jsx)(a.code,{children:"template0"}),"\u3002\u4f60\u53ef\u4ee5\u4f7f\u7528 ",(0,d.jsx)(a.code,{children:"template0"})," \u521b\u5efa\u4e00\u4e2a\u5b8c\u5168\u5e72\u51c0\u7684\u6570\u636e\u5e93\uff0c\u5176\u4e2d\u4ec5\u5305\u542b Cloudberry Database \u5728\u521d\u59cb\u5316\u65f6\u9884\u5b9a\u4e49\u7684\u6807\u51c6\u5bf9\u8c61\u3002\u8bf7\u52ff\u5220\u9664\u6216\u4fee\u6539 ",(0,d.jsx)(a.code,{children:"template0"}),"\u3002"]}),"\n",(0,d.jsxs)(a.p,{children:["\u9996\u6b21\u8fde\u63a5\u5230 Cloudberry Database \u65f6\uff0c\u4f60\u53ef\u4ee5\u4f7f\u7528 ",(0,d.jsx)(a.code,{children:"postgres"})," \u6570\u636e\u5e93\u3002Cloudberry Database \u4f7f\u7528 ",(0,d.jsx)(a.code,{children:"postgres"})," \u4f5c\u4e3a\u7ba1\u7406\u8fde\u63a5\u7684\u9ed8\u8ba4\u6570\u636e\u5e93\u3002"]}),"\n",(0,d.jsx)(a.h2,{id:"\u521b\u5efa\u6570\u636e\u5e93",children:"\u521b\u5efa\u6570\u636e\u5e93"}),"\n",(0,d.jsxs)(a.p,{children:["\u7528 ",(0,d.jsx)(a.code,{children:"CREATE DATABASE"})," \u547d\u4ee4\u521b\u5efa\u4e00\u4e2a\u65b0\u7684\u6570\u636e\u5e93\u3002\u4f8b\u5982\uff1a"]}),"\n",(0,d.jsx)(a.pre,{children:(0,d.jsx)(a.code,{className:"language-sql",children:"=> CREATE DATABASE <new_dbname>;\n"})}),"\n",(0,d.jsx)(a.p,{children:"\u8981\u521b\u5efa\u6570\u636e\u5e93\uff0c\u4f60\u9700\u8981\u6709\u521b\u5efa\u6570\u636e\u5e93\u7684\u6743\u9650\uff0c\u6216\u8005\u4f60\u9700\u8981\u662f Cloudberry Database \u7684\u8d85\u7ea7\u7528\u6237\u3002\u5982\u679c\u4f60\u6ca1\u6709\u76f8\u5e94\u7684\u6743\u9650\uff0c\u5219\u65e0\u6cd5\u521b\u5efa\u6570\u636e\u5e93\u3002\u8bf7\u8054\u7cfb Cloudberry Database \u7ba1\u7406\u5458\u6388\u6743\uff0c\u6216\u8bf7\u7ba1\u7406\u5458\u4e3a\u4f60\u521b\u5efa\u6570\u636e\u5e93\u3002"}),"\n",(0,d.jsxs)(a.p,{children:["\u6b64\u5916\uff0c\u4f60\u8fd8\u53ef\u4ee5\u4f7f\u7528\u5ba2\u6237\u7aef\u7a0b\u5e8f ",(0,d.jsx)(a.code,{children:"createdb"})," \u6765\u521b\u5efa\u6570\u636e\u5e93\u3002\u4f8b\u5982\uff0c\u5728\u547d\u4ee4\u884c\u7ec8\u7aef\u4e2d\u6267\u884c\u4ee5\u4e0b\u547d\u4ee4\uff0c\u5728\u547d\u4ee4\u4e2d\u4f7f\u7528\u5b9e\u9645\u7684\u4e3b\u673a\u540d\u548c\u7aef\u53e3\u8fde\u63a5\u5230 Cloudberry Database\uff0c\u5e76\u521b\u5efa\u4e00\u4e2a\u540d\u4e3a ",(0,d.jsx)(a.code,{children:"mydatabase"})," \u7684\u6570\u636e\u5e93\uff1a"]}),"\n",(0,d.jsx)(a.pre,{children:(0,d.jsx)(a.code,{className:"language-shell",children:"$ createdb -h coordinator_host -p 5432 mydatabase\n"})}),"\n",(0,d.jsx)(a.p,{children:"\u4e3b\u673a\u540d\u548c\u7aef\u53e3\u5fc5\u987b\u4e0e\u5df2\u5b89\u88c5\u7684 Cloudberry Database \u7cfb\u7edf\u7684\u4e3b\u673a\u540d\u548c\u7aef\u53e3\u5339\u914d\u3002"}),"\n",(0,d.jsx)(a.p,{children:"\u67d0\u4e9b\u6570\u636e\u5e93\u5bf9\u8c61\uff08\u4f8b\u5982\u89d2\u8272\uff09\u7531 Cloudberry Database \u7cfb\u7edf\u4e2d\u7684\u6240\u6709\u6570\u636e\u5e93\u5171\u4eab\u3002\u5176\u4ed6\u5bf9\u8c61\uff08\u4f8b\u5982\u521b\u5efa\u7684\u8868\uff09\u4ec5\u5728\u521b\u5efa\u5b83\u4eec\u7684\u6570\u636e\u5e93\u4e2d\u624d\u662f\u53ef\u89c1\u7684\u3002"}),"\n",(0,d.jsx)(a.admonition,{type:"caution",children:(0,d.jsxs)(a.p,{children:[(0,d.jsx)(a.code,{children:"CREATE DATABASE"})," \u547d\u4ee4\u4e0d\u662f\u4e8b\u52a1\u6027\u7684\u3002"]})}),"\n",(0,d.jsx)(a.h3,{id:"\u514b\u9686\u6570\u636e\u5e93",children:"\u514b\u9686\u6570\u636e\u5e93"}),"\n",(0,d.jsxs)(a.p,{children:["Cloudberry Database \u9ed8\u8ba4\u901a\u8fc7\u514b\u9686\u6807\u51c6\u7cfb\u7edf\u6570\u636e\u5e93\u6a21\u677f ",(0,d.jsx)(a.code,{children:"template1"})," \u6765\u521b\u5efa\u65b0\u6570\u636e\u5e93\u3002\u521b\u5efa\u65b0\u6570\u636e\u5e93\u65f6\uff0c\u4efb\u4f55\u6570\u636e\u5e93\u90fd\u53ef\u4ee5\u7528\u4f5c\u6a21\u677f\uff0c\u4f60\u53ef\u4ee5\u201c\u514b\u9686\u201d\u6216\u590d\u5236\u73b0\u6709\u6570\u636e\u5e93\u4ee5\u53ca\u8be5\u6570\u636e\u5e93\u4e2d\u7684\u6240\u6709\u5bf9\u8c61\u548c\u6570\u636e\u3002\u4f8b\u5982\uff1a"]}),"\n",(0,d.jsx)(a.pre,{children:(0,d.jsx)(a.code,{className:"language-sql",children:"=> CREATE DATABASE <new_dbname> TEMPLATE <old_dbname>;\n"})}),"\n",(0,d.jsx)(a.h3,{id:"\u521b\u5efa\u6570\u636e\u5e93\u65f6\u5206\u914d\u5176\u4ed6\u6240\u6709\u8005",children:"\u521b\u5efa\u6570\u636e\u5e93\u65f6\u5206\u914d\u5176\u4ed6\u6240\u6709\u8005"}),"\n",(0,d.jsx)(a.p,{children:"\u521b\u5efa\u6570\u636e\u5e93\u65f6\uff0c\u4f60\u53ef\u4ee5\u6307\u5b9a\u53e6\u4e00\u4e2a\u89d2\u8272\u4e3a\u8be5\u6570\u636e\u5e93\u7684\u6240\u6709\u8005\uff1a"}),"\n",(0,d.jsx)(a.pre,{children:(0,d.jsx)(a.code,{className:"language-sql",children:"=> CREATE DATABASE <new_dbname> WITH <owner=new_user>;\n"})}),"\n",(0,d.jsx)(a.h2,{id:"\u67e5\u770b\u6570\u636e\u5e93\u5217\u8868",children:"\u67e5\u770b\u6570\u636e\u5e93\u5217\u8868"}),"\n",(0,d.jsxs)(a.p,{children:["\u5982\u679c\u4f60\u4f7f\u7528\u7684\u662f ",(0,d.jsx)(a.code,{children:"psql"})," \u5ba2\u6237\u7aef\u7a0b\u5e8f\uff0c\u4f60\u53ef\u4ee5\u4f7f\u7528 ",(0,d.jsx)(a.code,{children:"\\l"})," \u5143\u547d\u4ee4\u6765\u67e5\u770b Cloudberry Database \u7cfb\u7edf\u4e2d\u7684\u6570\u636e\u5e93\u548c\u6a21\u677f\u5217\u8868\u3002\u5982\u679c\u4f7f\u7528\u7684\u662f\u5176\u4ed6\u5ba2\u6237\u7aef\u7a0b\u5e8f\u5e76\u4e14\u4f60\u662f\u8d85\u7ea7\u7528\u6237\uff0c\u5219\u53ef\u4ee5\u4ece ",(0,d.jsx)(a.code,{children:"pg_database"})," \u7cfb\u7edf\u76ee\u5f55\u8868\u4e2d\u67e5\u8be2\u6570\u636e\u5e93\u5217\u8868\u3002\u4f8b\u5982\uff1a"]}),"\n",(0,d.jsx)(a.pre,{children:(0,d.jsx)(a.code,{className:"language-sql",children:"=> SELECT datname from pg_database;\n"})}),"\n",(0,d.jsx)(a.h2,{id:"\u66f4\u6539\u6570\u636e\u5e93",children:"\u66f4\u6539\u6570\u636e\u5e93"}),"\n",(0,d.jsxs)(a.p,{children:[(0,d.jsx)(a.code,{children:"ALTER DATABASE"})," \u547d\u4ee4\u53ef\u66f4\u6539\u6570\u636e\u5e93\u6240\u6709\u8005\u3001\u540d\u79f0\u6216\u9ed8\u8ba4\u914d\u7f6e\u7b49\u6570\u636e\u5e93\u5c5e\u6027\u3002\u4ee5\u4e0b\u793a\u4f8b\u547d\u4ee4\u8bbe\u7f6e\u6570\u636e\u5e93\u7684\u9ed8\u8ba4 schema \u641c\u7d22\u8def\u5f84\uff08",(0,d.jsx)(a.code,{children:"search_path"})," \u914d\u7f6e\u53c2\u6570\uff09\uff1a"]}),"\n",(0,d.jsx)(a.pre,{children:(0,d.jsx)(a.code,{className:"language-sql",children:"=> ALTER DATABASE mydatabase SET search_path TO myschema, public, pg_catalog;\n"})}),"\n",(0,d.jsx)(a.p,{children:"\u82e5\u8981\u66f4\u6539\u6570\u636e\u5e93\uff0c\u4f60\u5fc5\u987b\u662f\u6570\u636e\u5e93\u7684\u6240\u6709\u8005\u6216\u8d85\u7ea7\u7528\u6237\u3002"}),"\n",(0,d.jsx)(a.h2,{id:"\u5220\u9664\u6570\u636e\u5e93",children:"\u5220\u9664\u6570\u636e\u5e93"}),"\n",(0,d.jsxs)(a.p,{children:[(0,d.jsx)(a.code,{children:"DROP DATABASE"})," \u547d\u4ee4\u7528\u4e8e\u5220\u9664\u6570\u636e\u5e93\u3002\u5b83\u5220\u9664\u6570\u636e\u5e93\u7684\u7cfb\u7edf\u76ee\u5f55\u6761\u76ee\uff0c\u5e76\u5220\u9664\u78c1\u76d8\u4e0a\u5305\u542b\u6570\u636e\u7684\u6570\u636e\u5e93\u76ee\u5f55\u3002\u8981\u6267\u884c ",(0,d.jsx)(a.code,{children:"DROP DATABASE"}),"\uff0c\u4f60\u5fc5\u987b\u662f\u6570\u636e\u5e93\u7684\u6240\u6709\u8005\u6216\u8d85\u7ea7\u7528\u6237\u3002\u5982\u679c\u6709\u7528\u6237\u6b63\u5728\u8fde\u63a5\u6570\u636e\u5e93\uff0c\u5219\u65e0\u6cd5\u5220\u9664\u8be5\u6570\u636e\u5e93\u3002\u5220\u9664\u67d0\u4e2a\u6570\u636e\u5e93\u524d\uff0c\u8bf7\u5148\u8fde\u63a5\u5230 ",(0,d.jsx)(a.code,{children:"postgres"})," \u6570\u636e\u5e93\uff08\u6216\u5176\u4ed6\u6570\u636e\u5e93\uff09\uff0c\u7136\u540e\u518d\u6267\u884c\u5220\u9664\u547d\u4ee4\u3002\u4f8b\u5982\uff1a"]}),"\n",(0,d.jsx)(a.pre,{children:(0,d.jsx)(a.code,{className:"language-sql",children:"=> \\c postgres\n=> DROP DATABASE mydatabase;\n"})}),"\n",(0,d.jsxs)(a.p,{children:["\u53e6\u5916\uff0c\u4f60\u4e5f\u53ef\u4ee5\u4f7f\u7528\u5ba2\u6237\u7aef\u7a0b\u5e8f ",(0,d.jsx)(a.code,{children:"dropdb"})," \u6765\u5220\u9664\u6570\u636e\u5e93\u3002\u4f8b\u5982\uff0c\u4ee5\u4e0b\u547d\u4ee4\u4f7f\u7528\u63d0\u4f9b\u7684\u4e3b\u673a\u540d\u548c\u7aef\u53e3\u8fde\u63a5\u5230 Cloudberry Database\uff0c\u5e76\u5220\u9664\u6570\u636e\u5e93 ",(0,d.jsx)(a.code,{children:"mydatabase"}),"\uff1a"]}),"\n",(0,d.jsx)(a.pre,{children:(0,d.jsx)(a.code,{className:"language-shell",children:"$ dropdb -h coordinator_host -p 5432 mydatabase\n"})}),"\n",(0,d.jsx)(a.admonition,{type:"caution",children:(0,d.jsx)(a.p,{children:"\u6570\u636e\u5e93\u88ab\u5220\u9664\u540e\u65e0\u6cd5\u64a4\u6d88\u3002"})}),"\n",(0,d.jsxs)(a.p,{children:[(0,d.jsx)(a.code,{children:"DROP DATABASE"})," \u547d\u4ee4\u4e0d\u662f\u4e8b\u52a1\u6027\u7684\u3002"]})]})}function h(e={}){const{wrapper:a}={...(0,s.a)(),...e.components};return a?(0,d.jsx)(a,{...e,children:(0,d.jsx)(i,{...e})}):i(e)}},11151:(e,a,n)=>{n.d(a,{Z:()=>c,a:()=>l});var d=n(67294);const s={},r=d.createContext(s);function l(e){const a=d.useContext(r);return d.useMemo((function(){return"function"==typeof e?e(a):{...a,...e}}),[a,e])}function c(e){let a;return a=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:l(e.components),d.createElement(r.Provider,{value:a},e.children)}}}]);