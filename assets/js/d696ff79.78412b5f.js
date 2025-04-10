"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[636],{84414:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>d,contentTitle:()=>a,default:()=>h,frontMatter:()=>i,metadata:()=>c,toc:()=>o});var t=n(85893),r=n(11151);const i={title:"DBeaver"},a="DBeaver",c={id:"ecosystem/sql-clients/dbeaver",title:"DBeaver",description:"DBeaver is a powerful database management tool and SQL client software that supports various database systems, including MySQL, PostgreSQL, and Apache Cloudberry. This document introduces how to establish a connection between DBeaver and the Apache Cloudberry database.",source:"@site/docs/ecosystem/sql-clients/dbeaver.md",sourceDirName:"ecosystem/sql-clients",slug:"/ecosystem/sql-clients/dbeaver",permalink:"/docs/ecosystem/sql-clients/dbeaver",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/ecosystem/sql-clients/dbeaver.md",tags:[],version:"current",lastUpdatedBy:"Alwin",lastUpdatedAt:1744282709,formattedLastUpdatedAt:"Apr 10, 2025",frontMatter:{title:"DBeaver"},sidebar:"docsbars",previous:{title:"Develop Database Extensions Using PGRX",permalink:"/docs/developer/develop-extensions-using-rust"},next:{title:"SQL Statements Index",permalink:"/docs/sql-stmts/"}},d={},o=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Steps",id:"steps",level:2}];function l(e){const s={code:"code",h1:"h1",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...(0,r.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(s.h1,{id:"dbeaver",children:"DBeaver"}),"\n",(0,t.jsx)(s.p,{children:"DBeaver is a powerful database management tool and SQL client software that supports various database systems, including MySQL, PostgreSQL, and Apache Cloudberry. This document introduces how to establish a connection between DBeaver and the Apache Cloudberry database."}),"\n",(0,t.jsx)(s.h2,{id:"prerequisites",children:"Prerequisites"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:["Apache Cloudberry is deployed with proper database access permissions set in ",(0,t.jsx)(s.code,{children:"pg_hba.conf"}),"."]}),"\n",(0,t.jsx)(s.li,{children:"DBeaver (v24.3.3 or higher) is installed."}),"\n"]}),"\n",(0,t.jsx)(s.h2,{id:"steps",children:"Steps"}),"\n",(0,t.jsxs)(s.ol,{children:["\n",(0,t.jsxs)(s.li,{children:["\n",(0,t.jsx)(s.p,{children:"Launch DBeaver and start creating a new database connection using either of these methods:"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:["Select ",(0,t.jsx)(s.strong,{children:"Database"})," > ",(0,t.jsx)(s.strong,{children:"New Database Connection"})," from the menu bar."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.img,{src:n(24682).Z+"",width:"1012",height:"745"})}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsx)(s.li,{children:"Click the plus (+) icon in the top-left corner."}),"\n"]}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.img,{src:n(17578).Z+"",width:"1280",height:"800"})}),"\n",(0,t.jsxs)(s.ol,{start:"2",children:["\n",(0,t.jsxs)(s.li,{children:["In the ",(0,t.jsx)(s.strong,{children:"Select your database"})," dialog, find and select ",(0,t.jsx)(s.strong,{children:"Cloudberry"}),", then click ",(0,t.jsx)(s.strong,{children:"Next"}),"."]}),"\n"]}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.img,{src:n(96482).Z+"",width:"1027",height:"833"})}),"\n",(0,t.jsxs)(s.ol,{start:"3",children:["\n",(0,t.jsxs)(s.li,{children:["\n",(0,t.jsxs)(s.p,{children:["In the ",(0,t.jsx)(s.strong,{children:"Connection Settings"})," dialog's ",(0,t.jsx)(s.strong,{children:"Main"})," tab, fill in these connection parameters:"]}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Host"}),": Enter the hostname or IP address of your Cloudberry database server."]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Port"}),": Enter the database port (for example, ",(0,t.jsx)(s.code,{children:"5432"}),")."]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Database"}),": Enter the target database name."]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Username"}),": Enter a database username with access privileges."]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Password"}),": Enter the corresponding password."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.img,{src:n(55839).Z+"",width:"1280",height:"857"})}),"\n",(0,t.jsxs)(s.p,{children:["Switch to the ",(0,t.jsx)(s.strong,{children:"Driver properties"})," tab to view and modify Cloudberry driver properties by clicking the Value column."]}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.img,{src:n(62237).Z+"",width:"1280",height:"857"})}),"\n",(0,t.jsxs)(s.ol,{start:"4",children:["\n",(0,t.jsxs)(s.li,{children:["Verify and complete the configuration: Click ",(0,t.jsx)(s.strong,{children:"Test Connection"})," to test the connection. A confirmation dialog indicates a successful test. Click ",(0,t.jsx)(s.strong,{children:"OK"})," to confirm, then click ",(0,t.jsx)(s.strong,{children:"Finish"})," to complete the setup."]}),"\n"]}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.img,{src:n(59432).Z+"",width:"1280",height:"857"})}),"\n",(0,t.jsxs)(s.ol,{start:"5",children:["\n",(0,t.jsx)(s.li,{children:"After establishing the connection, you can see the created database connection in the left navigation pane and manage your database through DBeaver."}),"\n"]}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.img,{src:n(16659).Z+"",width:"1280",height:"911"})})]})}function h(e={}){const{wrapper:s}={...(0,r.a)(),...e.components};return s?(0,t.jsx)(s,{...e,children:(0,t.jsx)(l,{...e})}):l(e)}},24682:(e,s,n)=>{n.d(s,{Z:()=>t});const t=n.p+"assets/images/dbeaver1-0ecd72a213285561cb14cbad020b4d93.png"},17578:(e,s,n)=>{n.d(s,{Z:()=>t});const t=n.p+"assets/images/dbeaver2-894c2dc02085c683b632cfd262e08e75.png"},96482:(e,s,n)=>{n.d(s,{Z:()=>t});const t=n.p+"assets/images/dbeaver3-5d912d01a4605ba00315d59e39473d59.png"},55839:(e,s,n)=>{n.d(s,{Z:()=>t});const t=n.p+"assets/images/dbeaver4-8e6acefd60d5f4d3ca872f514c48ea26.png"},62237:(e,s,n)=>{n.d(s,{Z:()=>t});const t=n.p+"assets/images/dbeaver5-87d7bc62e4e61d94a560e9267ed18651.png"},59432:(e,s,n)=>{n.d(s,{Z:()=>t});const t=n.p+"assets/images/dbeaver6-c15608ff3a95ef58b67b2b61115959d3.png"},16659:(e,s,n)=>{n.d(s,{Z:()=>t});const t=n.p+"assets/images/dbeaver7-5eb0e146a22cc77ce9b74fcc5b5a5574.png"},11151:(e,s,n)=>{n.d(s,{Z:()=>c,a:()=>a});var t=n(67294);const r={},i=t.createContext(r);function a(e){const s=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function c(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),t.createElement(i.Provider,{value:s},e.children)}}}]);