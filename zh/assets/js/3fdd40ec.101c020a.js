"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[3930],{95617:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>t,contentTitle:()=>c,default:()=>h,frontMatter:()=>a,metadata:()=>l,toc:()=>i});var d=s(85893),r=s(11151);const a={title:"\u542f\u52a8\u548c\u505c\u6b62\u6570\u636e\u5e93"},c="\u542f\u52a8\u548c\u505c\u6b62 Cloudberry Database",l={id:"start-and-stop-cbdb-database",title:"\u542f\u52a8\u548c\u505c\u6b62\u6570\u636e\u5e93",description:"\u5728 Cloudberry Database \u6570\u636e\u5e93\u7ba1\u7406\u7cfb\u7edf\u4e2d\uff0c\u6570\u636e\u5e93\u670d\u52a1\u5668\u5b9e\u4f8b\uff08\u5305\u62ec Coordinator \u548c\u6240\u6709 Segment\uff09\u542f\u505c\u548c\u8fd0\u884c\u5728\u6240\u6709\u7cfb\u7edf\u4e3b\u673a\u4e0a\uff0c\u8fd9\u6837\u5404\u5b9e\u4f8b\u80fd\u591f\u534f\u540c\u5de5\u4f5c\uff0c\u5f62\u6210\u4e00\u4e2a\u7edf\u4e00\u7684\u6570\u636e\u5e93\u7ba1\u7406\u7cfb\u7edf\u3002",source:"@site/i18n/zh/docusaurus-plugin-content-docs/current/start-and-stop-cbdb-database.md",sourceDirName:".",slug:"/start-and-stop-cbdb-database",permalink:"/zh/docs/start-and-stop-cbdb-database",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/i18n/zh/docusaurus-plugin-content-docs/current/start-and-stop-cbdb-database.md",tags:[],version:"current",lastUpdatedBy:"TomShawn",lastUpdatedAt:1740044194,formattedLastUpdatedAt:"2025\u5e742\u670820\u65e5",frontMatter:{title:"\u542f\u52a8\u548c\u505c\u6b62\u6570\u636e\u5e93"},sidebar:"docsbars",previous:{title:"\u521b\u5efa\u548c\u7ba1\u7406\u6570\u636e\u5e93",permalink:"/zh/docs/create-and-manage-database"},next:{title:"\u8fde\u63a5\u5230\u6570\u636e\u5e93",permalink:"/zh/docs/connect-to-cbdb"}},t={},i=[{value:"\u542f\u52a8 Cloudberry Database",id:"\u542f\u52a8-cloudberry-database",level:2},{value:"\u91cd\u542f Cloudberry Database",id:"\u91cd\u542f-cloudberry-database",level:2},{value:"\u91cd\u65b0\u52a0\u8f7d\u914d\u7f6e\u6587\u4ef6\u66f4\u6539",id:"\u91cd\u65b0\u52a0\u8f7d\u914d\u7f6e\u6587\u4ef6\u66f4\u6539",level:2},{value:"\u5728\u7ef4\u62a4\u6a21\u5f0f\u4e0b\u542f\u52a8 Coordinator",id:"\u5728\u7ef4\u62a4\u6a21\u5f0f\u4e0b\u542f\u52a8-coordinator",level:2},{value:"\u505c\u6b62 Cloudberry Database",id:"\u505c\u6b62-cloudberry-database",level:2},{value:"\u505c\u6b62\u5ba2\u6237\u7aef\u8fdb\u7a0b",id:"\u505c\u6b62\u5ba2\u6237\u7aef\u8fdb\u7a0b",level:2}];function o(e){const n={admonition:"admonition",code:"code",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,r.a)(),...e.components};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(n.h1,{id:"\u542f\u52a8\u548c\u505c\u6b62-cloudberry-database",children:"\u542f\u52a8\u548c\u505c\u6b62 Cloudberry Database"}),"\n",(0,d.jsx)(n.p,{children:"\u5728 Cloudberry Database \u6570\u636e\u5e93\u7ba1\u7406\u7cfb\u7edf\u4e2d\uff0c\u6570\u636e\u5e93\u670d\u52a1\u5668\u5b9e\u4f8b\uff08\u5305\u62ec Coordinator \u548c\u6240\u6709 Segment\uff09\u542f\u505c\u548c\u8fd0\u884c\u5728\u6240\u6709\u7cfb\u7edf\u4e3b\u673a\u4e0a\uff0c\u8fd9\u6837\u5404\u5b9e\u4f8b\u80fd\u591f\u534f\u540c\u5de5\u4f5c\uff0c\u5f62\u6210\u4e00\u4e2a\u7edf\u4e00\u7684\u6570\u636e\u5e93\u7ba1\u7406\u7cfb\u7edf\u3002"}),"\n",(0,d.jsx)(n.p,{children:"\u56e0\u4e3a Cloudberry Database \u7cfb\u7edf\u5206\u5e03\u5728\u591a\u53f0\u673a\u5668\u4e0a\uff0c\u6240\u4ee5 Cloudberry Database \u7cfb\u7edf\u542f\u52a8\u548c\u505c\u6b62\u7684\u8fc7\u7a0b\u4e0e\u5e38\u89c4 PostgreSQL \u6570\u636e\u5e93\u7cfb\u7edf\u4e0d\u540c\u3002"}),"\n",(0,d.jsxs)(n.p,{children:["\u547d\u4ee4\u884c\u5de5\u5177 ",(0,d.jsx)(n.code,{children:"gpstart"})," \u548c ",(0,d.jsx)(n.code,{children:"gpstop"})," \u5206\u522b\u7528\u4e8e\u542f\u52a8\u548c\u505c\u6b62 Cloudberry Database\u3002\u5b83\u4eec\u4f4d\u4e8e Coordinator \u4e3b\u673a\u4e0a\u7684 ",(0,d.jsx)(n.code,{children:"$GPHOME/bin"})," \u76ee\u5f55\u4e2d\u3002"]}),"\n",(0,d.jsx)(n.admonition,{title:"\u63d0\u793a",type:"tip",children:(0,d.jsxs)(n.p,{children:["\u8bf7\u52ff\u4f7f\u7528 ",(0,d.jsx)(n.code,{children:"kill"})," \u547d\u4ee4\u6765\u7ec8\u6b62 Postgres \u8fdb\u7a0b\uff0c\u56e0\u4e3a\u4f7f\u7528 ",(0,d.jsx)(n.code,{children:"kill -9"})," \u6216 ",(0,d.jsx)(n.code,{children:"kill -11"})," \u4f1a\u635f\u574f\u6570\u636e\u5e93\u5e76\u963b\u788d\u6545\u969c\u539f\u56e0\u5206\u6790\u3002\u8981\u7ec8\u6b62 Postgres \u8fdb\u7a0b\uff0c\u8bf7\u4f7f\u7528\u6570\u636e\u5e93\u51fd\u6570 ",(0,d.jsx)(n.code,{children:"pg_cancel_backend()"}),"\u3002"]})}),"\n",(0,d.jsx)(n.h2,{id:"\u542f\u52a8-cloudberry-database",children:"\u542f\u52a8 Cloudberry Database"}),"\n",(0,d.jsxs)(n.p,{children:["\u8981\u542f\u52a8\u5df2\u521d\u59cb\u5316\u7684 Cloudberry Database\uff0c\u5728 Coordinator \u5b9e\u4f8b\u4e0a\u6267\u884c ",(0,d.jsx)(n.code,{children:"gpstart"}),"\u3002"]}),"\n",(0,d.jsxs)(n.p,{children:["\u5982\u679c\u6570\u636e\u5e93\u7cfb\u7edf\u5df2\u901a\u8fc7 ",(0,d.jsx)(n.code,{children:"gpinitsystem"})," \u521d\u59cb\u5316\u5e76\u88ab ",(0,d.jsx)(n.code,{children:"gpstop"})," \u505c\u6b62\uff0c\u4f60\u53ef\u4ee5\u901a\u8fc7 ",(0,d.jsx)(n.code,{children:"gpstart"})," \u6765\u91cd\u542f\u6570\u636e\u5e93\u3002",(0,d.jsx)(n.code,{children:"gpstart"})," \u7684\u4f5c\u7528\u662f\u542f\u52a8 Cloudberry Database \u96c6\u7fa4\u4e2d\u7684\u6240\u6709 ",(0,d.jsx)(n.code,{children:"postgres"})," \u5b9e\u4f8b\uff0c\u4ece\u800c\u5b8c\u6210\u6574\u4e2a\u6570\u636e\u5e93\u7684\u542f\u52a8\u3002\u5728\u542f\u52a8\u8fc7\u7a0b\u4e2d\uff0c",(0,d.jsx)(n.code,{children:"gpstart"})," \u4f1a\u534f\u8c03\u548c\u5e76\u884c\u6267\u884c\u6240\u6709\u5fc5\u8981\u7684\u6b65\u9aa4\u3002"]}),"\n",(0,d.jsxs)(n.p,{children:["\u5728 Coordinator \u4e3b\u673a\u4e0a\u6267\u884c ",(0,d.jsx)(n.code,{children:"gpstart"})," \u6765\u542f\u52a8 Cloudberry Database\uff1a"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-shell",children:"$ gpstart\n"})}),"\n",(0,d.jsx)(n.h2,{id:"\u91cd\u542f-cloudberry-database",children:"\u91cd\u542f Cloudberry Database"}),"\n",(0,d.jsxs)(n.p,{children:["\u8981\u91cd\u542f Cloudberry Database\uff0c\u8bf7\u5728 Coordinator \u4e3b\u673a\u4e0a\u6267\u884c\u5e26 ",(0,d.jsx)(n.code,{children:"-r"})," \u9009\u9879\u7684 ",(0,d.jsx)(n.code,{children:"gpstop"})," \u547d\u4ee4\uff1a"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-shell",children:"$ gpstop -r\n"})}),"\n",(0,d.jsx)(n.h2,{id:"\u91cd\u65b0\u52a0\u8f7d\u914d\u7f6e\u6587\u4ef6\u66f4\u6539",children:"\u91cd\u65b0\u52a0\u8f7d\u914d\u7f6e\u6587\u4ef6\u66f4\u6539"}),"\n",(0,d.jsx)(n.p,{children:"\u4f60\u53ef\u4ee5\u5728\u4e0d\u4e2d\u65ad\u7cfb\u7edf\u7684\u60c5\u51b5\u4e0b\uff0c\u91cd\u65b0\u52a0\u8f7d Cloudberry Database \u914d\u7f6e\u6587\u4ef6\u7684\u66f4\u6539\u3002"}),"\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"gpstop"})," \u652f\u6301\u5728\u4e0d\u4e2d\u65ad\u670d\u52a1\u7684\u60c5\u51b5\u4e0b\uff0c\u91cd\u65b0\u52a0\u8f7d ",(0,d.jsx)(n.code,{children:"pg_hba.conf"})," \u914d\u7f6e\u6587\u4ef6\u548c ",(0,d.jsx)(n.code,{children:"postgresql.conf"})," \u4e2d\u7684\u8fd0\u884c\u65f6\u53c2\u6570\u3002\u5ba2\u6237\u7aef\u5728\u91cd\u65b0\u8fde\u63a5\u5230\u6570\u636e\u5e93\u65f6\uff0c\u6d3b\u52a8\u4f1a\u8bdd\u5c06\u5e94\u7528\u914d\u7f6e\u6587\u4ef6\u4e2d\u7684\u66f4\u6539\u3002\u4f46\u662f\uff0c\u8bb8\u591a\u670d\u52a1\u5668\u914d\u7f6e\u53c2\u6570\u53ea\u5728\u5b8c\u6574\u91cd\u542f\u7cfb\u7edf (",(0,d.jsx)(n.code,{children:"gpstop -r"}),") \u540e\u624d\u751f\u6548\u3002"]}),"\n",(0,d.jsxs)(n.p,{children:["\u5728\u4e0d\u5173\u95ed Cloudberry Database \u7cfb\u7edf\u7684\u60c5\u51b5\u4e0b\uff0c\u4f7f\u7528 ",(0,d.jsx)(n.code,{children:"gpstop -u"})," \u91cd\u65b0\u52a0\u8f7d\u914d\u7f6e\u6587\u4ef6\u66f4\u6539\uff1a"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-shell",children:"$ gpstop -u\n"})}),"\n",(0,d.jsx)(n.h2,{id:"\u5728\u7ef4\u62a4\u6a21\u5f0f\u4e0b\u542f\u52a8-coordinator",children:"\u5728\u7ef4\u62a4\u6a21\u5f0f\u4e0b\u542f\u52a8 Coordinator"}),"\n",(0,d.jsx)(n.p,{children:"\u5982\u679c\u8981\u6267\u884c\u7ef4\u62a4\u6216\u7ba1\u7406\u4efb\u52a1\uff0c\u53c8\u4e0d\u60f3\u5f71\u54cd Segment \u4e0a\u7684\u6570\u636e\uff0c\u4ec5\u9700\u542f\u52a8 Coordinator \u5373\u53ef\u3002\u4f8b\u5982\uff0c\u5728\u7ef4\u62a4\u6a21\u5f0f\u4e0b\uff0c\u4f60\u53ef\u4ee5\u53ea\u8fde\u63a5\u5230\u6570\u636e\u5e93\u7684 Coordinator \u5b9e\u4f8b\uff0c\u5e76\u7f16\u8f91\u7cfb\u7edf\u76ee\u5f55\u8bbe\u7f6e\u3002"}),"\n",(0,d.jsxs)(n.ol,{children:["\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsxs)(n.p,{children:["\u5728 ",(0,d.jsx)(n.code,{children:"gpstart"})," \u4e2d\u4f7f\u7528 ",(0,d.jsx)(n.code,{children:"-m"})," \u9009\u9879\uff0c\u8fdb\u5165\u5230\u7ef4\u62a4\u6a21\u5f0f\uff1a"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-shell",children:"$ gpstart -m\n"})}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsx)(n.p,{children:"\u5728\u7ef4\u62a4\u6a21\u5f0f\u4e0b\u8fde\u63a5\u5230 Coordinator \u4ee5\u8fdb\u884c Catalog \u7ef4\u62a4\u3002\u4f8b\u5982\uff1a"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-shell",children:"$ PGOPTIONS='-c gp_role=utility' psql postgres\n"})}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsx)(n.p,{children:"\u5b8c\u6210\u7ef4\u62a4\u4efb\u52a1\u540e\uff0c\u5728\u7ef4\u62a4\u6a21\u5f0f\u4e0b\u505c\u6b62 Coordinator\u3002\u7136\u540e\uff0c\u5728\u751f\u4ea7\u6a21\u5f0f\u4e0b\u91cd\u65b0\u542f\u52a8 Coordinator\u3002"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-shell",children:"$ gpstop -m\n$ gpstart\n"})}),"\n",(0,d.jsx)(n.admonition,{title:"\u8b66\u544a",type:"caution",children:(0,d.jsx)(n.p,{children:"\u4e0d\u6b63\u786e\u5730\u4f7f\u7528\u7ef4\u62a4\u6a21\u5f0f\u53ef\u80fd\u5bfc\u81f4\u7cfb\u7edf\u72b6\u6001\u4e0d\u4e00\u81f4\u3002\u5efa\u8bae\u6b64\u64cd\u4f5c\u7531\u6280\u672f\u652f\u6301\u6765\u6267\u884c\u3002"})}),"\n"]}),"\n"]}),"\n",(0,d.jsx)(n.h2,{id:"\u505c\u6b62-cloudberry-database",children:"\u505c\u6b62 Cloudberry Database"}),"\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"gpstop"})," \u5728 Coordinator \u4e3b\u673a\u4e0a\u505c\u6b62\u6216\u91cd\u542f Cloudberry Database \u7cfb\u7edf\u3002\u6267\u884c\u540e\uff0c",(0,d.jsx)(n.code,{children:"gpstop"})," \u4f1a\u505c\u6b62\u7cfb\u7edf\u4e2d\u7684\u6240\u6709 ",(0,d.jsx)(n.code,{children:"postgres"})," \u8fdb\u7a0b\uff0c\u5305\u62ec Coordinator \u548c\u6240\u6709 Segment \u5b9e\u4f8b\u3002",(0,d.jsx)(n.code,{children:"gpstop"})," \u9ed8\u8ba4\u4f7f\u7528\u591a\u4e2a\u5e76\u884c\u5de5\u4f5c\u7ebf\u7a0b\u6765\u5173\u95ed\u7ec4\u6210 Cloudberry Database \u96c6\u7fa4\u7684 Postgres \u5b9e\u4f8b\u3002\u8981\u7acb\u5373\u505c\u6b62 Cloudberry Database\uff0c\u8bf7\u4f7f\u7528\u5feb\u901f\u6a21\u5f0f\u3002"]}),"\n",(0,d.jsx)(n.admonition,{title:"\u63d0\u793a",type:"tip",children:(0,d.jsx)(n.p,{children:"\u4e0d\u5efa\u8bae\u4f7f\u7528\u5feb\u901f\u6a21\u5f0f\u3002\u6b64\u6a21\u5f0f\u4f1a\u505c\u6b62\u6240\u6709\u6570\u636e\u5e93\u8fdb\u7a0b\uff0c\u4f7f\u6570\u636e\u5e93\u670d\u52a1\u5668\u6765\u4e0d\u53ca\u5b8c\u6210\u4e8b\u52a1\u5904\u7406\uff0c\u6216\u6765\u4e0d\u53ca\u6e05\u7406\u4efb\u4f55\u4e34\u65f6\u6216\u8fdb\u7a0b\u4e2d\u7684\u5de5\u4f5c\u6587\u4ef6\u3002"})}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsx)(n.p,{children:"\u505c\u6b62 Cloudberry Database\uff1a"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-shell",children:"$ gpstop\n"})}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsx)(n.p,{children:"\u5728\u5feb\u901f\u6a21\u5f0f\u4e0b\u505c\u6b62 Cloudberry Database\uff1a"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-shell",children:"$ gpstop -M fast\n"})}),"\n"]}),"\n"]}),"\n",(0,d.jsxs)(n.p,{children:["\u9ed8\u8ba4\u60c5\u51b5\u4e0b\uff0c\u5982\u679c\u6709\u5ba2\u6237\u7aef\u8fde\u63a5\u5230\u6570\u636e\u5e93\uff0c\u5219\u4e0d\u5141\u8bb8\u5173\u95ed Cloudberry Database\u3002\u4f7f\u7528 ",(0,d.jsx)(n.code,{children:"-M fast"})," \u9009\u9879\u53ef\u4ee5\u56de\u6eda\u6240\u6709\u6b63\u5728\u8fdb\u884c\u7684\u4e8b\u52a1\uff0c\u5e76\u5728\u5173\u95ed Cloudberry Database \u4e4b\u524d\u7ec8\u6b62\u4efb\u4f55\u8fde\u63a5\u3002"]}),"\n",(0,d.jsx)(n.h2,{id:"\u505c\u6b62\u5ba2\u6237\u7aef\u8fdb\u7a0b",children:"\u505c\u6b62\u5ba2\u6237\u7aef\u8fdb\u7a0b"}),"\n",(0,d.jsxs)(n.p,{children:["Cloudberry Database \u4e3a\u6bcf\u4e2a\u5ba2\u6237\u7aef\u8fde\u63a5\u542f\u52a8\u4e00\u4e2a\u65b0\u7684\u540e\u7aef\u8fdb\u7a0b\u3002\u5177\u6709 ",(0,d.jsx)(n.code,{children:"SUPERUSER"})," \u6743\u9650\u7684 Cloudberry Database \u7528\u6237\u53ef\u4ee5\u53d6\u6d88\u548c\u7ec8\u6b62\u8fd9\u4e9b\u5ba2\u6237\u7aef\u7684\u540e\u7aef\u8fdb\u7a0b\u3002"]}),"\n",(0,d.jsxs)(n.p,{children:["\u901a\u8fc7 ",(0,d.jsx)(n.code,{children:"pg_cancel_backend()"})," \u51fd\u6570\u53d6\u6d88\u540e\u7aef\u8fdb\u7a0b\uff0c\u4f1a\u7ed3\u675f\u6b63\u5728\u6392\u961f\u6216\u8fdb\u884c\u7684\u5ba2\u6237\u7aef\u67e5\u8be2\u3002\u901a\u8fc7 ",(0,d.jsx)(n.code,{children:"pg_terminate_backend()"})," \u51fd\u6570\u7ec8\u6b62\u540e\u7aef\u8fdb\u7a0b\uff0c\u5c06\u7ec8\u6b62\u4e0e\u6570\u636e\u5e93\u7684\u5ba2\u6237\u7aef\u8fde\u63a5\u3002"]}),"\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"pg_cancel_backenda()"})," \u51fd\u6570\u6709\u4e24\u4e2a\u7b7e\u540d\uff1a"]}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsx)(n.li,{children:(0,d.jsx)(n.code,{children:"pg_cancel_backend( pid int4 )"})}),"\n",(0,d.jsx)(n.li,{children:(0,d.jsx)(n.code,{children:"pg_cancel_backend( pid int4, msg text )"})}),"\n"]}),"\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"pg_terminate_backend()"})," \u51fd\u6570\u6709\u4e24\u4e2a\u76f8\u4f3c\u7684\u7b7e\u540d\uff1a"]}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsx)(n.li,{children:(0,d.jsx)(n.code,{children:"pg_terminate_backend( pid int4 )"})}),"\n",(0,d.jsx)(n.li,{children:(0,d.jsx)(n.code,{children:"pg_terminate_backend( pid int4, msg text )"})}),"\n"]}),"\n",(0,d.jsxs)(n.p,{children:["\u5982\u679c\u4f60\u63d0\u4f9b ",(0,d.jsx)(n.code,{children:"msg"}),"\uff0cCloudberry Database \u4f1a\u5728\u8fd4\u56de\u7ed9\u5ba2\u6237\u7aef\u7684\u53d6\u6d88\u6d88\u606f\u4e2d\u5305\u542b ",(0,d.jsx)(n.code,{children:"msg"})," \u6587\u672c\u3002",(0,d.jsx)(n.code,{children:"msg"})," \u9650\u5236\u4e3a 128 \u5b57\u8282\uff0cCloudberry Database \u4f1a\u622a\u65ad\u4efb\u4f55\u66f4\u957f\u7684\u5185\u5bb9\u3002"]}),"\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"pg_cancel_backend()"})," \u548c ",(0,d.jsx)(n.code,{children:"pg_terminate_backend()"})," \u51fd\u6570\u5982\u679c\u6267\u884c\u6210\u529f\uff0c\u5219\u8fd4\u56de ",(0,d.jsx)(n.code,{children:"true"}),"\uff0c\u5426\u5219\u8fd4\u56de ",(0,d.jsx)(n.code,{children:"false"}),"\u3002"]}),"\n",(0,d.jsxs)(n.p,{children:["\u8981\u53d6\u6d88\u6216\u7ec8\u6b62\u540e\u7aef\u8fdb\u7a0b\uff0c\u5fc5\u987b\u5148\u83b7\u5f97\u540e\u7aef\u7684\u8fdb\u7a0b ID\u3002\u4f60\u53ef\u4ee5\u4ece ",(0,d.jsx)(n.code,{children:"pg_stat_activity"})," \u89c6\u56fe\u7684 ",(0,d.jsx)(n.code,{children:"pid"})," \u5217\u83b7\u53d6\u8fdb\u7a0b ID\u3002\u4f8b\u5982\uff0c\u67e5\u770b\u6267\u884c\u4e2d\u548c\u6392\u961f\u4e2d\u6240\u6709\u67e5\u8be2\u5bf9\u5e94\u7684\u8fdb\u7a0b\u4fe1\u606f\uff1a"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-sql",children:"SELECT usename, pid, state, query, datname\n     FROM pg_stat_activity;\n"})}),"\n",(0,d.jsx)(n.p,{children:"\u90e8\u5206\u67e5\u8be2\u8f93\u51fa\u793a\u4f8b\uff1a"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-sql",children:"usename |  pid     | state  |         query          | datname\n_---------+-------------------+--------+------------------------+---------_\n  sammy  |   31861  | idle   | SELECT * FROM testtbl; | testdb\n  billy  |   31905  | active | SELECT * FROM topten;  | testdb\n"})}),"\n",(0,d.jsx)(n.p,{children:"\u4f60\u53ef\u4ee5\u901a\u8fc7\u67e5\u8be2\u8f93\u51fa\u6765\u8bc6\u522b\u67e5\u8be2\u6216\u5ba2\u6237\u7aef\u8fde\u63a5\u7684\u8fdb\u7a0b ID (pid)\u3002"}),"\n",(0,d.jsxs)(n.p,{children:["\u8bc6\u522b\u67e5\u8be2\u5bf9\u5e94\u7684\u8fdb\u7a0b ID \u540e\uff0c\u4f60\u53ef\u4ee5\u53d6\u6d88\u7b49\u5f85\u4e2d\u7684\u67e5\u8be2\u3002\u4f8b\u5982\uff0c\u53d6\u6d88\u4e0a\u8ff0\u793a\u4f8b\u8f93\u51fa\u4e2d\u8bc6\u522b\u7684\u7b49\u5f85\u67e5\u8be2\uff0c\u5e76\u5c06 ",(0,d.jsx)(n.code,{children:"Admin canceled long-running query."})," \u5305\u542b\u4e3a\u8fd4\u56de\u7ed9\u5ba2\u6237\u7aef\u7684\u6d88\u606f\uff1a"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"=# SELECT pg_cancel_backend(31905 ,'Admin canceled long-running query.');\n\nERROR:  canceling statement due to user request: \"Admin canceled long-running query.\"\n"})})]})}function h(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,d.jsx)(n,{...e,children:(0,d.jsx)(o,{...e})}):o(e)}},11151:(e,n,s)=>{s.d(n,{Z:()=>l,a:()=>c});var d=s(67294);const r={},a=d.createContext(r);function c(e){const n=d.useContext(a);return d.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:c(e.components),d.createElement(a.Provider,{value:n},e.children)}}}]);