"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[6389],{77094:(e,s,t)=>{t.r(s),t.d(s,{assets:()=>a,contentTitle:()=>o,default:()=>h,frontMatter:()=>i,metadata:()=>l,toc:()=>d});var n=t(85893),r=t(11151);const i={title:"DROP FOREIGN TABLE"},o="DROP FOREIGN TABLE",l={id:"sql-stmts/drop-foreign-table",title:"DROP FOREIGN TABLE",description:"Removes a foreign table.",source:"@site/docs/sql-stmts/drop-foreign-table.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/drop-foreign-table",permalink:"/zh/docs/sql-stmts/drop-foreign-table",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/drop-foreign-table.md",tags:[],version:"current",lastUpdatedBy:"Dianjin Wang",lastUpdatedAt:1742268909,formattedLastUpdatedAt:"2025\u5e743\u670818\u65e5",frontMatter:{title:"DROP FOREIGN TABLE"},sidebar:"docsbars",previous:{title:"DROP FOREIGN DATA WRAPPER",permalink:"/zh/docs/sql-stmts/drop-foreign-data-wrapper"},next:{title:"DROP FUNCTION",permalink:"/zh/docs/sql-stmts/drop-function"}},a={},d=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Examples",id:"examples",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function c(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,r.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.h1,{id:"drop-foreign-table",children:"DROP FOREIGN TABLE"}),"\n",(0,n.jsx)(s.p,{children:"Removes a foreign table."}),"\n",(0,n.jsx)(s.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"DROP FOREIGN TABLE [ IF EXISTS ] <name> [, ...] [ CASCADE | RESTRICT ]\n"})}),"\n",(0,n.jsx)(s.h2,{id:"description",children:"Description"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"DROP FOREIGN TABLE"})," removes an existing foreign table. Only the owner of a foreign table can remove it."]}),"\n",(0,n.jsx)(s.h2,{id:"parameters",children:"Parameters"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"IF EXISTS"})})}),"\n",(0,n.jsx)(s.p,{children:"Do not throw an error if the foreign table does not exist. Apache Cloudberry issues a notice in this case."}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"name"})})}),"\n",(0,n.jsx)(s.p,{children:"The name (optionally schema-qualified) of the foreign table to drop."}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"CASCADE"})})}),"\n",(0,n.jsx)(s.p,{children:"Automatically drop objects that depend on the foreign table (such as views), and in turn all objects that depend on those objects."}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"RESTRICT"})})}),"\n",(0,n.jsx)(s.p,{children:"Refuse to drop the foreign table if any objects depend on it. This is the default."}),"\n",(0,n.jsx)(s.h2,{id:"examples",children:"Examples"}),"\n",(0,n.jsxs)(s.p,{children:["To destroy two foreign tables, ",(0,n.jsx)(s.code,{children:"films"})," and ",(0,n.jsx)(s.code,{children:"distributors"}),":"]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"DROP FOREIGN TABLE films, distributors;\n"})}),"\n",(0,n.jsx)(s.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"DROP FOREIGN TABLE"})," conforms to ISO/IEC 9075-9 (SQL/MED), except that the standard only allows one foreign table to be dropped per command. The ",(0,n.jsx)(s.code,{children:"IF EXISTS"})," clause is a Apache Cloudberry extension."]}),"\n",(0,n.jsx)(s.h2,{id:"see-also",children:"See also"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.a,{href:"/zh/docs/sql-stmts/alter-foreign-table",children:"ALTER FOREIGN TABLE"}),", ",(0,n.jsx)(s.a,{href:"/zh/docs/sql-stmts/create-foreign-table",children:"CREATE FOREIGN TABLE"})]})]})}function h(e={}){const{wrapper:s}={...(0,r.a)(),...e.components};return s?(0,n.jsx)(s,{...e,children:(0,n.jsx)(c,{...e})}):c(e)}},11151:(e,s,t)=>{t.d(s,{Z:()=>l,a:()=>o});var n=t(67294);const r={},i=n.createContext(r);function o(e){const s=n.useContext(i);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function l(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),n.createElement(i.Provider,{value:s},e.children)}}}]);