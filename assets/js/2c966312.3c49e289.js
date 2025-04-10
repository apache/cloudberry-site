"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[4395],{25531:(e,s,t)=>{t.r(s),t.d(s,{assets:()=>a,contentTitle:()=>r,default:()=>h,frontMatter:()=>i,metadata:()=>c,toc:()=>d});var n=t(85893),o=t(11151);const i={title:"DROP SCHEMA"},r="DROP SCHEMA",c={id:"sql-stmts/drop-schema",title:"DROP SCHEMA",description:"Removes a schema.",source:"@site/docs/sql-stmts/drop-schema.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/drop-schema",permalink:"/docs/sql-stmts/drop-schema",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/drop-schema.md",tags:[],version:"current",lastUpdatedBy:"Dianjin Wang",lastUpdatedAt:1744271659,formattedLastUpdatedAt:"Apr 10, 2025",frontMatter:{title:"DROP SCHEMA"},sidebar:"docsbars",previous:{title:"DROP RULE",permalink:"/docs/sql-stmts/drop-rule"},next:{title:"DROP SEQUENCE",permalink:"/docs/sql-stmts/drop-sequence"}},a={},d=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Notes",id:"notes",level:2},{value:"Examples",id:"examples",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function l(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,o.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.h1,{id:"drop-schema",children:"DROP SCHEMA"}),"\n",(0,n.jsx)(s.p,{children:"Removes a schema."}),"\n",(0,n.jsx)(s.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"DROP SCHEMA [IF EXISTS] <name> [, ...] [CASCADE | RESTRICT]\n"})}),"\n",(0,n.jsx)(s.h2,{id:"description",children:"Description"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"DROP SCHEMA"})," removes schemas from the database."]}),"\n",(0,n.jsx)(s.p,{children:"A schema can be dropped only by its owner or a superuser. Note that the owner can drop the schema (and thereby all contained objects) even if they do not own some of the objects within the schema."}),"\n",(0,n.jsx)(s.h2,{id:"parameters",children:"Parameters"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"IF EXISTS"})})}),"\n",(0,n.jsx)(s.p,{children:"Do not throw an error if the schema does not exist. A notice is issued in this case."}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"name"})})}),"\n",(0,n.jsx)(s.p,{children:"The name of the schema to remove."}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"CASCADE"})})}),"\n",(0,n.jsx)(s.p,{children:"Automatically drop objects (tables, functions, etc.) that are contained in the schema, and in turn all objects that depend on those objects."}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"RESTRICT"})})}),"\n",(0,n.jsx)(s.p,{children:"Refuse to drop the schema if it contains any objects. This is the default."}),"\n",(0,n.jsx)(s.h2,{id:"notes",children:"Notes"}),"\n",(0,n.jsxs)(s.p,{children:["Using the ",(0,n.jsx)(s.code,{children:"CASCADE"})," option may result in the command removing objects in other schemas besides the one(s) named."]}),"\n",(0,n.jsx)(s.h2,{id:"examples",children:"Examples"}),"\n",(0,n.jsxs)(s.p,{children:["Remove the schema ",(0,n.jsx)(s.code,{children:"mystuff"})," from the database, along with everything it contains:"]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"DROP SCHEMA mystuff CASCADE;\n"})}),"\n",(0,n.jsx)(s.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"DROP SCHEMA"})," is fully conforming with the SQL standard, except that the standard only allows one schema to be dropped per command. Also, the ",(0,n.jsx)(s.code,{children:"IF EXISTS"})," option is a Apache Cloudberry extension."]}),"\n",(0,n.jsx)(s.h2,{id:"see-also",children:"See also"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.a,{href:"/docs/sql-stmts/create-schema",children:(0,n.jsx)(s.code,{children:"CREATE SCHEMA"})}),", ",(0,n.jsx)(s.a,{href:"/docs/sql-stmts/alter-schema",children:(0,n.jsx)(s.code,{children:"ALTER SCHEMA"})})]})]})}function h(e={}){const{wrapper:s}={...(0,o.a)(),...e.components};return s?(0,n.jsx)(s,{...e,children:(0,n.jsx)(l,{...e})}):l(e)}},11151:(e,s,t)=>{t.d(s,{Z:()=>c,a:()=>r});var n=t(67294);const o={},i=n.createContext(o);function r(e){const s=n.useContext(i);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function c(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:r(e.components),n.createElement(i.Provider,{value:s},e.children)}}}]);