"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[8916],{93462:(e,s,r)=>{r.r(s),r.d(s,{assets:()=>c,contentTitle:()=>o,default:()=>h,frontMatter:()=>i,metadata:()=>d,toc:()=>l});var n=r(85893),t=r(11151);const i={title:"DROP SERVER"},o="DROP SERVER",d={id:"sql-stmts/drop-server",title:"DROP SERVER",description:"Removes a foreign server descriptor.",source:"@site/docs/sql-stmts/drop-server.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/drop-server",permalink:"/zh/docs/sql-stmts/drop-server",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/drop-server.md",tags:[],version:"current",lastUpdatedBy:"Ed Espino",lastUpdatedAt:1732764009,formattedLastUpdatedAt:"2024\u5e7411\u670828\u65e5",frontMatter:{title:"DROP SERVER"},sidebar:"docsbars",previous:{title:"DROP SEQUENCE",permalink:"/zh/docs/sql-stmts/drop-sequence"},next:{title:"DROP STATISTICS",permalink:"/zh/docs/sql-stmts/drop-statistics"}},c={},l=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Examples",id:"examples",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function a(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,t.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.h1,{id:"drop-server",children:"DROP SERVER"}),"\n",(0,n.jsx)(s.p,{children:"Removes a foreign server descriptor."}),"\n",(0,n.jsx)(s.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"DROP SERVER [ IF EXISTS ] <name> [, ...] [ CASCADE | RESTRICT ]\n"})}),"\n",(0,n.jsx)(s.h2,{id:"description",children:"Description"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"DROP SERVER"})," removes an existing foreign server descriptor. The user running this command must be the owner of the server."]}),"\n",(0,n.jsx)(s.h2,{id:"parameters",children:"Parameters"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"IF EXISTS"})})}),"\n",(0,n.jsx)(s.p,{children:"Do not throw an error if the server does not exist. Cloudberry Database issues a notice in this case."}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"name"})})}),"\n",(0,n.jsx)(s.p,{children:"The name of an existing server."}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"CASCADE"})})}),"\n",(0,n.jsx)(s.p,{children:"Automatically drop objects that depend on the server (such as user mappings), and in turn all objects that depend on those objects."}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"RESTRICT"})})}),"\n",(0,n.jsx)(s.p,{children:"Refuse to drop the server if any object depends on it. This is the default."}),"\n",(0,n.jsx)(s.h2,{id:"examples",children:"Examples"}),"\n",(0,n.jsxs)(s.p,{children:["Drop the server named ",(0,n.jsx)(s.code,{children:"foo"})," if it exists:"]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"DROP SERVER IF EXISTS foo;\n"})}),"\n",(0,n.jsx)(s.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"DROP SERVER"})," conforms to ISO/IEC 9075-9 (SQL/MED). The ",(0,n.jsx)(s.code,{children:"IF EXISTS"})," clause is a Cloudberry Database extension."]}),"\n",(0,n.jsx)(s.h2,{id:"see-also",children:"See also"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.a,{href:"/zh/docs/sql-stmts/create-server",children:"CREATE SERVER"}),", ",(0,n.jsx)(s.a,{href:"/zh/docs/sql-stmts/alter-server",children:"ALTER SERVER"})]})]})}function h(e={}){const{wrapper:s}={...(0,t.a)(),...e.components};return s?(0,n.jsx)(s,{...e,children:(0,n.jsx)(a,{...e})}):a(e)}},11151:(e,s,r)=>{r.d(s,{Z:()=>d,a:()=>o});var n=r(67294);const t={},i=n.createContext(t);function o(e){const s=n.useContext(i);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function d(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),n.createElement(i.Provider,{value:s},e.children)}}}]);