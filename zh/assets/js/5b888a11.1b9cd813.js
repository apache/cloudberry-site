"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[7362],{28089:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>d,contentTitle:()=>i,default:()=>h,frontMatter:()=>o,metadata:()=>c,toc:()=>l});var t=n(85893),r=n(11151);const o={title:"DROP SEQUENCE"},i="DROP SEQUENCE",c={id:"sql-stmts/drop-sequence",title:"DROP SEQUENCE",description:"Removes a sequence.",source:"@site/docs/sql-stmts/drop-sequence.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/drop-sequence",permalink:"/zh/docs/sql-stmts/drop-sequence",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/drop-sequence.md",tags:[],version:"current",lastUpdatedBy:"Dianjin Wang",lastUpdatedAt:1733128076,formattedLastUpdatedAt:"2024\u5e7412\u67082\u65e5",frontMatter:{title:"DROP SEQUENCE"},sidebar:"docsbars",previous:{title:"DROP SCHEMA",permalink:"/zh/docs/sql-stmts/drop-schema"},next:{title:"DROP SERVER",permalink:"/zh/docs/sql-stmts/drop-server"}},d={},l=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Examples",id:"examples",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function a(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,r.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(s.h1,{id:"drop-sequence",children:"DROP SEQUENCE"}),"\n",(0,t.jsx)(s.p,{children:"Removes a sequence."}),"\n",(0,t.jsx)(s.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-sql",children:"DROP SEQUENCE [IF EXISTS] <name> [, ...] [CASCADE | RESTRICT]\n"})}),"\n",(0,t.jsx)(s.h2,{id:"description",children:"Description"}),"\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.code,{children:"DROP SEQUENCE"})," removes sequence number generators. You must own the sequence to drop it (or be a superuser)."]}),"\n",(0,t.jsx)(s.h2,{id:"parameters",children:"Parameters"}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.strong,{children:(0,t.jsx)(s.code,{children:"IF EXISTS"})})}),"\n",(0,t.jsx)(s.p,{children:"Do not throw an error if the sequence does not exist. Cloudberry Database issues a notice in this case."}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.strong,{children:(0,t.jsx)(s.code,{children:"name"})})}),"\n",(0,t.jsx)(s.p,{children:"The name (optionally schema-qualified) of the sequence to remove."}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.strong,{children:(0,t.jsx)(s.code,{children:"CASCADE"})})}),"\n",(0,t.jsx)(s.p,{children:"Automatically drop objects that depend on the sequence, and in turn all objects that depend on those objects."}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.strong,{children:(0,t.jsx)(s.code,{children:"RESTRICT"})})}),"\n",(0,t.jsx)(s.p,{children:"Refuse to drop the sequence if any objects depend on it. This is the default."}),"\n",(0,t.jsx)(s.h2,{id:"examples",children:"Examples"}),"\n",(0,t.jsxs)(s.p,{children:["Remove the sequence ",(0,t.jsx)(s.code,{children:"myserial"}),":"]}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-sql",children:"DROP SEQUENCE myserial;\n"})}),"\n",(0,t.jsx)(s.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.code,{children:"DROP SEQUENCE"})," conforms to the SQL standard, except that the standard allows only one sequence to be dropped per command. Also, the ",(0,t.jsx)(s.code,{children:"IF EXISTS"})," option is a Cloudberry Database extension."]}),"\n",(0,t.jsx)(s.h2,{id:"see-also",children:"See also"}),"\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.a,{href:"/zh/docs/sql-stmts/alter-sequence",children:"ALTER SEQUENCE"}),", ",(0,t.jsx)(s.a,{href:"/zh/docs/sql-stmts/create-sequence",children:"CREATE SEQUENCE"})]})]})}function h(e={}){const{wrapper:s}={...(0,r.a)(),...e.components};return s?(0,t.jsx)(s,{...e,children:(0,t.jsx)(a,{...e})}):a(e)}},11151:(e,s,n)=>{n.d(s,{Z:()=>c,a:()=>i});var t=n(67294);const r={},o=t.createContext(r);function i(e){const s=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function c(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),t.createElement(o.Provider,{value:s},e.children)}}}]);