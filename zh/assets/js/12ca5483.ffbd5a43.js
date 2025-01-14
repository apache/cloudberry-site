"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[8514],{54044:(e,s,t)=>{t.r(s),t.d(s,{assets:()=>a,contentTitle:()=>c,default:()=>h,frontMatter:()=>r,metadata:()=>o,toc:()=>d});var n=t(85893),i=t(11151);const r={title:"DROP STATISTICS"},c="DROP STATISTICS",o={id:"sql-stmts/drop-statistics",title:"DROP STATISTICS",description:"Removes extended statistics.",source:"@site/docs/sql-stmts/drop-statistics.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/drop-statistics",permalink:"/zh/docs/sql-stmts/drop-statistics",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/drop-statistics.md",tags:[],version:"current",lastUpdatedBy:"TomShawn",lastUpdatedAt:1736834774,formattedLastUpdatedAt:"2025\u5e741\u670814\u65e5",frontMatter:{title:"DROP STATISTICS"},sidebar:"docsbars",previous:{title:"DROP SERVER",permalink:"/zh/docs/sql-stmts/drop-server"},next:{title:"DROP TABLE",permalink:"/zh/docs/sql-stmts/drop-table"}},a={},d=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Examples",id:"examples",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function l(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,i.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.h1,{id:"drop-statistics",children:"DROP STATISTICS"}),"\n",(0,n.jsx)(s.p,{children:"Removes extended statistics."}),"\n",(0,n.jsx)(s.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"DROP STATISTICS [ IF EXISTS ] <name> [, ...] [ CASCADE | RESTRICT ]\n"})}),"\n",(0,n.jsx)(s.h2,{id:"description",children:"Description"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"DROP STATISTICS"})," removes statistics object(s) from the database. Only the statistics object's owner, the schema owner, or a superuser can drop a statistics object."]}),"\n",(0,n.jsx)(s.h2,{id:"parameters",children:"Parameters"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"IF EXISTS"})})}),"\n",(0,n.jsx)(s.p,{children:"Do not throw an error if the statistics object does not exist. Cloudberry Database issues a notice in this case."}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"name"})})}),"\n",(0,n.jsx)(s.p,{children:"The name (optionally schema-qualified) of the statistics object to drop."}),"\n",(0,n.jsxs)(s.p,{children:["CASCADE\n",(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"RESTRICT"})})]}),"\n",(0,n.jsx)(s.p,{children:"These key words have no effect, since there are no dependencies on statistics."}),"\n",(0,n.jsx)(s.h2,{id:"examples",children:"Examples"}),"\n",(0,n.jsx)(s.p,{children:"Destroy two statistics objects in different schemas, without failing if they do not exist:"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"DROP STATISTICS IF EXISTS\n    accounting.users_uid_creation,\n    public.grants_user_role;\n"})}),"\n",(0,n.jsx)(s.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,n.jsxs)(s.p,{children:["There is no ",(0,n.jsx)(s.code,{children:"DROP STATISTICS"})," command in the SQL standard."]}),"\n",(0,n.jsx)(s.h2,{id:"see-also",children:"See also"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.a,{href:"/zh/docs/sql-stmts/alter-statistics",children:"ALTER STATISTICS"}),", ",(0,n.jsx)(s.a,{href:"/zh/docs/sql-stmts/create-statistics",children:"CREATE STATISTICS"})]})]})}function h(e={}){const{wrapper:s}={...(0,i.a)(),...e.components};return s?(0,n.jsx)(s,{...e,children:(0,n.jsx)(l,{...e})}):l(e)}},11151:(e,s,t)=>{t.d(s,{Z:()=>o,a:()=>c});var n=t(67294);const i={},r=n.createContext(i);function c(e){const s=n.useContext(r);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function o(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:c(e.components),n.createElement(r.Provider,{value:s},e.children)}}}]);