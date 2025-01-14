"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[3507],{74523:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>o,contentTitle:()=>c,default:()=>b,frontMatter:()=>a,metadata:()=>d,toc:()=>i});var n=t(85893),s=t(11151);const a={title:"\u67b6\u6784\u4ecb\u7ecd"},c="Cloudberry Database \u67b6\u6784\u4ecb\u7ecd",d={id:"cbdb-architecture",title:"\u67b6\u6784\u4ecb\u7ecd",description:"\u672c\u6587\u4ecb\u7ecd Cloudberry Database \u7684\u4ea7\u54c1\u67b6\u6784\u4ee5\u53ca\u5185\u90e8\u6a21\u5757\u7684\u5b9e\u73b0\u673a\u5236\u3002",source:"@site/i18n/zh/docusaurus-plugin-content-docs/current/cbdb-architecture.md",sourceDirName:".",slug:"/cbdb-architecture",permalink:"/zh/docs/cbdb-architecture",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/i18n/zh/docusaurus-plugin-content-docs/current/cbdb-architecture.md",tags:[],version:"current",lastUpdatedBy:"TomShawn",lastUpdatedAt:1736834774,formattedLastUpdatedAt:"2025\u5e741\u670814\u65e5",frontMatter:{title:"\u67b6\u6784\u4ecb\u7ecd"},sidebar:"docsbars",previous:{title:"\u4ea7\u54c1\u7279\u6027",permalink:"/zh/docs/"},next:{title:"\u4f7f\u7528\u573a\u666f",permalink:"/zh/docs/cbdb-scenarios"}},o={},i=[];function l(e){const r={h1:"h1",img:"img",li:"li",p:"p",strong:"strong",ul:"ul",...(0,s.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h1,{id:"cloudberry-database-\u67b6\u6784\u4ecb\u7ecd",children:"Cloudberry Database \u67b6\u6784\u4ecb\u7ecd"}),"\n",(0,n.jsx)(r.p,{children:"\u672c\u6587\u4ecb\u7ecd Cloudberry Database \u7684\u4ea7\u54c1\u67b6\u6784\u4ee5\u53ca\u5185\u90e8\u6a21\u5757\u7684\u5b9e\u73b0\u673a\u5236\u3002"}),"\n",(0,n.jsx)(r.p,{children:"\u5728\u5927\u591a\u6570\u60c5\u51b5\u4e0b\uff0cCloudberry Database \u5728 SQL \u652f\u6301\u3001\u529f\u80fd\u3001\u914d\u7f6e\u9009\u9879\u548c\u6700\u7ec8\u7528\u6237\u529f\u80fd\u65b9\u9762\u4e0e PostgreSQL \u975e\u5e38\u76f8\u4f3c\u3002\u6570\u636e\u5e93\u7528\u6237\u4e0e Cloudberry Database \u6570\u636e\u5e93\u7684\u4ea4\u4e92\u4f53\u9a8c\uff0c\u975e\u5e38\u63a5\u8fd1\u4e0e\u5355\u673a PostgreSQL \u8fdb\u884c\u4ea4\u4e92\u3002"}),"\n",(0,n.jsx)(r.p,{children:"Cloudberry Database \u91c7\u7528 MPP \u67b6\u6784\u6280\u672f\uff0c\u901a\u8fc7\u5728\u591a\u4e2a\u670d\u52a1\u5668\u6216\u4e3b\u673a\u4e4b\u95f4\u5206\u914d\u6570\u636e\u548c\u5904\u7406\u5de5\u4f5c\u8d1f\u8f7d\u6765\u5b58\u50a8\u548c\u5904\u7406\u5927\u91cf\u6570\u636e\u3002"}),"\n",(0,n.jsx)(r.p,{children:"MPP \u4e5f\u79f0\u4e3a\u5927\u89c4\u6a21\u5e76\u884c\u5904\u7406\u67b6\u6784\uff0c\u662f\u6307\u5177\u6709\u591a\u53f0\u4e3b\u673a\u7684\u7cfb\u7edf\uff0c\u8fd9\u4e9b\u4e3b\u673a\u534f\u4f5c\u6267\u884c\u540c\u4e00\u64cd\u4f5c\u3002\u6bcf\u53f0\u4e3b\u673a\u90fd\u6709\u81ea\u5df1\u7684\u5904\u7406\u5668\u3001\u5185\u5b58\u3001\u78c1\u76d8\u3001\u7f51\u7edc\u8d44\u6e90\u548c\u64cd\u4f5c\u7cfb\u7edf\u3002Cloudberry Database\u4f7f\u7528\u8fd9\u79cd\u9ad8\u6027\u80fd\u7684\u7cfb\u7edf\u67b6\u6784\u6765\u5206\u914d\u6d77\u91cf\u6570\u636e\u7684\u8d1f\u8f7d\uff0c\u5e76\u4e14\u53ef\u4ee5\u5e76\u884c\u4f7f\u7528\u7cfb\u7edf\u7684\u6240\u6709\u8d44\u6e90\u6765\u5904\u7406\u67e5\u8be2\u3002"}),"\n",(0,n.jsx)(r.p,{children:"\u4ece\u7528\u6237\u89d2\u5ea6\u6765\u770b\uff0cCloudberry Database \u662f\u4e00\u4e2a\u5b8c\u5907\u7684\u5173\u7cfb\u6570\u636e\u5e93\u7ba1\u7406\u7cfb\u7edf (RDBMS)\u3002\u4ece\u7269\u7406\u5c42\u9762\u6765\u770b\uff0c\u5b83\u5185\u542b\u591a\u4e2a PostgreSQL \u5b9e\u4f8b\u3002\u4e3a\u4e86\u5b9e\u73b0\u591a\u4e2a\u72ec\u7acb PostgreSQL \u5b9e\u4f8b\u7684\u5206\u5de5\u548c\u5408\u4f5c\uff0cCloudberry Database \u5728\u4e0d\u540c\u5c42\u9762\u5bf9\u6570\u636e\u5b58\u50a8\u3001\u8ba1\u7b97\u3001\u901a\u4fe1\u548c\u7ba1\u7406\u8fdb\u884c\u4e86\u5206\u5e03\u5f0f\u96c6\u7fa4\u5316\u5904\u7406\u3002Cloudberry Database \u867d\u7136\u662f\u4e00\u4e2a\u96c6\u7fa4\uff0c\u7136\u800c\u5bf9\u7528\u6237\u800c\u8a00\uff0c\u5b83\u5c01\u88c5\u4e86\u6240\u6709\u5206\u5e03\u5f0f\u7684\u7ec6\u8282\uff0c\u4e3a\u7528\u6237\u63d0\u4f9b\u4e86\u5355\u4e2a\u903b\u8f91\u6570\u636e\u5e93\u3002\u8fd9\u79cd\u5c01\u88c5\u6781\u5927\u5730\u89e3\u653e\u4e86\u5f00\u53d1\u4eba\u5458\u548c\u8fd0\u7ef4\u4eba\u5458\u7684\u5de5\u4f5c\u3002"}),"\n",(0,n.jsx)(r.p,{children:"Cloudberry Database \u67b6\u6784\u56fe\u5982\u4e0b\u6240\u793a\uff1a"}),"\n",(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{alt:"Cloudberry Database Architecture",src:t(62646).Z+"",width:"1588",height:"770"})}),"\n",(0,n.jsxs)(r.ul,{children:["\n",(0,n.jsxs)(r.li,{children:["\n",(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.strong,{children:"\u63a7\u5236\u8282\u70b9 (Coordinator)"})," \u662f Cloudberry Database \u6570\u636e\u5e93\u7cfb\u7edf\u7684\u5165\u53e3\uff0c\u5b83\u63a5\u53d7\u5ba2\u6237\u7aef\u8fde\u63a5\u548c SQL \u67e5\u8be2\uff0c\u5e76\u5c06\u5de5\u4f5c\u5206\u914d\u7ed9\u6570\u636e\u8282\u70b9\u5b9e\u4f8b\u3002\u7528\u6237\u4e0e Cloudberry Database \u8fdb\u884c\u4ea4\u4e92\uff0c\u4f7f\u7528\u5ba2\u6237\u7aef\u7a0b\u5e8f\uff08\u4f8b\u5982 psql\uff09\u6216\u5e94\u7528\u7a0b\u5e8f\u7f16\u7a0b\u63a5\u53e3\uff08API\uff09\uff08\u4f8b\u5982 JDBC\u3001ODBC \u6216 libpq PostgreSQL C API\uff09\u8fde\u63a5\u5230\u63a7\u5236\u8282\u70b9\u3002"]}),"\n",(0,n.jsxs)(r.ul,{children:["\n",(0,n.jsx)(r.li,{children:"\u63a7\u5236\u8282\u70b9\u662f\u5168\u5c40\u7cfb\u7edf\u76ee\u5f55\u6240\u5728\u7684\u4f4d\u7f6e\uff0c\u5168\u5c40\u7cfb\u7edf\u76ee\u5f55\u662f\u4e00\u7ec4\u7cfb\u7edf\u8868\uff0c\u5176\u4e2d\u5305\u542b\u6709\u5173 Cloudberry Database \u6570\u636e\u5e93\u7cfb\u7edf\u672c\u8eab\u7684\u5143\u6570\u636e\u3002"}),"\n",(0,n.jsx)(r.li,{children:"\u63a7\u5236\u8282\u70b9\u4e0d\u5305\u542b\u4efb\u4f55\u7528\u6237\u6570\u636e\uff0c\u6570\u636e\u53ea\u4fdd\u5b58\u5728\u6570\u636e\u8282\u70b9\u5b9e\u4f8b\u4e0a\u3002"}),"\n",(0,n.jsx)(r.li,{children:"\u63a7\u5236\u8282\u70b9\u5bf9\u5ba2\u6237\u7aef\u8fde\u63a5\u8fdb\u884c\u8eab\u4efd\u9a8c\u8bc1\uff0c\u5904\u7406\u4f20\u5165\u7684 SQL \u547d\u4ee4\uff0c\u5728\u6570\u636e\u8282\u70b9\u4e4b\u95f4\u5206\u914d\u5de5\u4f5c\u8d1f\u8f7d\uff0c\u534f\u8c03\u6bcf\u4e2a\u6570\u636e\u8282\u70b9\u8fd4\u56de\u7684\u7ed3\u679c\uff0c\u5e76\u5c06\u6700\u7ec8\u7ed3\u679c\u5448\u73b0\u7ed9\u5ba2\u6237\u7aef\u7a0b\u5e8f\u3002"}),"\n",(0,n.jsx)(r.li,{children:"Cloudberry Database \u4f7f\u7528\u9884\u5199\u65e5\u5fd7\u8bb0\u5f55\uff08WAL\uff09\u8fdb\u884c\u63a7\u5236\u8282\u70b9/Standby \u955c\u50cf\u3002\u5728\u57fa\u4e8e WAL \u7684\u65e5\u5fd7\u8bb0\u5f55\u4e2d\uff0c\u6240\u6709\u4fee\u6539\u90fd\u5c06\u5728\u5199\u5165\u78c1\u76d8\u4e4b\u524d\u5148\u5199\u65e5\u5fd7\uff0c\u4ee5\u786e\u4fdd\u4efb\u4f55\u8fdb\u7a0b\u5185\u64cd\u4f5c\u7684\u6570\u636e\u5b8c\u6574\u6027\u3002"}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(r.li,{children:["\n",(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.strong,{children:"\u6570\u636e\u8282\u70b9 (Segment)"})," \u5b9e\u4f8b\u662f\u72ec\u7acb\u7684 Postgres \u8fdb\u7a0b\uff0c\u6bcf\u4e2a\u6570\u636e\u8282\u70b9\u5b58\u50a8\u4e00\u90e8\u5206\u6570\u636e\u5e76\u6267\u884c\u76f8\u5e94\u90e8\u5206\u67e5\u8be2\u3002\u5f53\u7528\u6237\u901a\u8fc7\u63a7\u5236\u8282\u70b9\u8fde\u63a5\u5230\u6570\u636e\u5e93\u5e76\u63d0\u4ea4\u67e5\u8be2\u8bf7\u6c42\u65f6\uff0c\u4f1a\u5728\u6bcf\u4e2a\u6570\u636e\u8282\u70b9\u521b\u5efa\u8fdb\u7a0b\u6765\u5904\u7406\u67e5\u8be2\u3002\u7528\u6237\u5b9a\u4e49\u7684\u8868\u53ca\u5176\u7d22\u5f15\u5206\u5e03\u5728 Cloudberry Database \u4e2d\u7684\u6240\u6709\u53ef\u7528\u6570\u636e\u8282\u70b9\u4e2d\uff0c\u6bcf\u4e2a\u6570\u636e\u8282\u70b9\u90fd\u5305\u542b\u6570\u636e\u7684\u4e0d\u540c\u90e8\u5206\uff0c\u4e0d\u540c\u90e8\u5206\u6570\u636e\u5904\u7406\u7684\u8fdb\u7a0b\u5728\u76f8\u5e94\u7684\u6570\u636e\u8282\u70b9\u4e2d\u8fd0\u884c\u3002\u7528\u6237\u901a\u8fc7\u63a7\u5236\u8282\u70b9\u4e0e\u6570\u636e\u8282\u70b9\u8fdb\u884c\u4ea4\u4e92\uff0c\u6570\u636e\u8282\u70b9\u5728\u79f0\u4e3a\u6570\u636e\u8282\u70b9\u4e3b\u673a\u7684\u670d\u52a1\u5668\u4e0a\u8fd0\u884c\u3002"]}),"\n",(0,n.jsx)(r.p,{children:"\u6570\u636e\u8282\u70b9\u4e3b\u673a\u901a\u5e38\u6267\u884c 2 \u5230 8 \u4e2a\u6570\u636e\u8282\u70b9\uff0c\u5177\u4f53\u53d6\u51b3\u4e8e\u5904\u7406\u5668\u3001\u5185\u5b58\u3001\u5b58\u50a8\u3001\u7f51\u7edc\u63a5\u53e3\u548c\u5de5\u4f5c\u8d1f\u8f7d\u3002\u6570\u636e\u8282\u70b9\u4e3b\u673a\u7684\u9700\u8981\u5e73\u8861\u914d\u7f6e\uff0c\u56e0\u4e3a Cloudberry Database\u83b7\u5f97\u6700\u4f73\u6027\u80fd\u7684\u5173\u952e\u662f\u5c06\u6570\u636e\u548c\u5de5\u4f5c\u8d1f\u8f7d\u5e73\u5747\u5206\u914d\u5230\u6570\u636e\u8282\u70b9\u4e2d\uff0c\u4ee5\u4fbf\u6240\u6709\u6570\u636e\u8282\u70b9\u540c\u65f6\u5f00\u59cb\u5904\u7406\u4e00\u9879\u4efb\u52a1\u5e76\u540c\u65f6\u5b8c\u6210\u5de5\u4f5c\u3002"}),"\n"]}),"\n",(0,n.jsxs)(r.li,{children:["\n",(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.strong,{children:"\u5185\u90e8\u4e92\u8054 (Interconnect)"})," \u662f Cloudberry Database \u7cfb\u7edf\u67b6\u6784\u4e2d\u7684\u7f51\u7edc\u5c42\u3002\u5185\u90e8\u4e92\u8054\u662f\u6307\u63a7\u5236\u8282\u70b9\u3001\u6570\u636e\u8282\u70b9\u901a\u4fe1\u6240\u4f9d\u8d56\u7684\u7f51\u7edc\u57fa\u7840\u67b6\u6784\uff0c\u4f7f\u7528\u6807\u51c6\u7684\u4ee5\u592a\u7f51\u4ea4\u6362\u7ed3\u6784\u3002"]}),"\n",(0,n.jsx)(r.p,{children:"\u51fa\u4e8e\u6027\u80fd\u539f\u56e0\uff0c\u5efa\u8bae\u4f7f\u7528 10 GB \u6216\u66f4\u5feb\u7684\u7f51\u7edc\u3002\u9ed8\u8ba4\u60c5\u51b5\u4e0b\uff0c\u5185\u90e8\u4e92\u8054\u6a21\u5757\u4f7f\u7528\u5e26\u6709\u6d41\u63a7\u5236(UDPIFC) \u7684 UDP \u534f\u8bae\u6765\u5b9e\u73b0\u901a\u4fe1\uff0c\u4ee5\u901a\u8fc7\u7f51\u7edc\u53d1\u9001\u6d88\u606f\u3002Cloudberry Database \u6267\u884c\u7684\u6570\u636e\u5305\u9a8c\u8bc1\u8d85\u51fa\u4e86 UDP \u6240\u63d0\u4f9b\u7684\u8303\u56f4\uff0c\u8fd9\u610f\u5473\u7740\u53ef\u9760\u6027\u7b49\u540c\u4e8e\u4f7f\u7528 TCP \u534f\u8bae\uff0c\u5e76\u4e14\u6027\u80fd\u548c\u53ef\u4f38\u7f29\u6027\u8d85\u8fc7\u4e86 TCP \u534f\u8bae\u3002 \u5982\u679c\u5c06\u5185\u90e8\u4e92\u8054\u6539\u4e3a\u4f7f\u7528 TCP \u534f\u8bae\uff0c\u5219 Cloudberry Database \u7684\u53ef\u4f38\u7f29\u6027\u9650\u5236\u4e3a 1000 \u4e2a\u6570\u636e\u8282\u70b9\u3002\u4f7f\u7528 UDPIFC \u4f5c\u4e3a\u9ed8\u8ba4\u534f\u8bae\u65f6\uff0c\u6b64\u9650\u5236\u4e0d\u9002\u7528\u3002"}),"\n"]}),"\n",(0,n.jsxs)(r.li,{children:["\n",(0,n.jsx)(r.p,{children:"Cloudberry Database \u4f7f\u7528\u591a\u7248\u672c\u63a7\u5236 (Multiversion Concurrency Control/MVCC) \u4fdd\u8bc1\u6570\u636e\u4e00\u81f4\u6027\u3002\u8fd9\u610f\u5473\u7740\u5728\u67e5\u8be2\u6570\u636e\u5e93\u65f6\uff0c\u6bcf\u4e2a\u4e8b\u52a1\u770b\u5230\u7684\u53ea\u662f\u6570\u636e\u7684\u5feb\u7167\uff0c\u5176\u786e\u4fdd\u5f53\u524d\u7684\u4e8b\u52a1\u4e0d\u4f1a\u770b\u5230\u5176\u4ed6\u4e8b\u52a1\u5728\u76f8\u540c\u8bb0\u5f55\u4e0a\u7684\u4fee\u6539\u3002\u636e\u6b64\u4e3a\u6570\u636e\u5e93\u7684\u6bcf\u4e2a\u4e8b\u52a1\u63d0\u4f9b\u4e8b\u52a1\u9694\u79bb\u3002"}),"\n",(0,n.jsx)(r.p,{children:"MVCC \u4ee5\u907f\u514d\u7ed9\u6570\u636e\u5e93\u4e8b\u52a1\u663e\u5f0f\u9501\u5b9a\u7684\u65b9\u5f0f\uff0c\u6700\u5927\u5316\u51cf\u5c11\u9501\u4e89\u7528\u4ee5\u786e\u4fdd\u591a\u7528\u6237\u73af\u5883\u4e0b\u7684\u6027\u80fd\u3002\u5728\u5e76\u53d1\u63a7\u5236\u65b9\u9762\uff0c\u4f7f\u7528 MVCC \u800c\u4e0d\u662f\u4f7f\u7528\u9501\u673a\u5236\u7684\u6700\u5927\u4f18\u52bf\u662f\uff0cMVCC \u5bf9\u67e5\u8be2\uff08\u8bfb\uff09\u7684\u9501\u4e0e\u5199\u7684\u9501\u4e0d\u5b58\u5728\u51b2\u7a81\uff0c\u5e76\u4e14\u8bfb\u4e0e\u5199\u4e4b\u95f4\u4ece\u4e0d\u4e92\u76f8\u963b\u585e\u3002"}),"\n"]}),"\n"]})]})}function b(e={}){const{wrapper:r}={...(0,s.a)(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(l,{...e})}):l(e)}},62646:(e,r,t)=>{t.d(r,{Z:()=>n});const n=t.p+"assets/images/cbdb-arch-f1df30d2e3ddbe3a05c243d5a68130be.png"},11151:(e,r,t)=>{t.d(r,{Z:()=>d,a:()=>c});var n=t(67294);const s={},a=n.createContext(s);function c(e){const r=n.useContext(a);return n.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function d(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:c(e.components),n.createElement(a.Provider,{value:r},e.children)}}}]);