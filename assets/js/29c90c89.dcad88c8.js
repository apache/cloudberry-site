"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[6737],{59701:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>l,contentTitle:()=>d,default:()=>h,frontMatter:()=>i,metadata:()=>o,toc:()=>c});var n=s(85893),r=s(11151);const i={title:"DROP TRIGGER"},d="DROP TRIGGER",o={id:"sql-stmts/drop-trigger",title:"DROP TRIGGER",description:"Removes a trigger.",source:"@site/docs/sql-stmts/drop-trigger.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/drop-trigger",permalink:"/docs/sql-stmts/drop-trigger",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/drop-trigger.md",tags:[],version:"current",lastUpdatedBy:"Dianjin Wang",lastUpdatedAt:1741230918,formattedLastUpdatedAt:"Mar 6, 2025",frontMatter:{title:"DROP TRIGGER"},sidebar:"docsbars",previous:{title:"DROP TRANSFORM",permalink:"/docs/sql-stmts/drop-transform"},next:{title:"DROP TYPE",permalink:"/docs/sql-stmts/drop-type"}},l={},c=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Examples",id:"examples",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function a(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,r.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h1,{id:"drop-trigger",children:"DROP TRIGGER"}),"\n",(0,n.jsx)(t.p,{children:"Removes a trigger."}),"\n",(0,n.jsx)(t.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-sql",children:"DROP TRIGGER [IF EXISTS] <name> ON <table> [CASCADE | RESTRICT]\n"})}),"\n",(0,n.jsx)(t.h2,{id:"description",children:"Description"}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.code,{children:"DROP TRIGGER"})," will remove an existing trigger definition. To run this command, the current user must be the owner of the table for which the trigger is defined."]}),"\n",(0,n.jsx)(t.h2,{id:"parameters",children:"Parameters"}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.strong,{children:(0,n.jsx)(t.code,{children:"IF EXISTS"})})}),"\n",(0,n.jsx)(t.p,{children:"Do not throw an error if the trigger does not exist. A notice is issued in this case."}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.strong,{children:(0,n.jsx)(t.code,{children:"name"})})}),"\n",(0,n.jsx)(t.p,{children:"The name of the trigger to remove."}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.strong,{children:(0,n.jsx)(t.code,{children:"table"})})}),"\n",(0,n.jsx)(t.p,{children:"The name (optionally schema-qualified) of the table for which the trigger is defined."}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.strong,{children:(0,n.jsx)(t.code,{children:"CASCADE"})})}),"\n",(0,n.jsx)(t.p,{children:"Automatically drop objects that depend on the trigger."}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.strong,{children:(0,n.jsx)(t.code,{children:"RESTRICT"})})}),"\n",(0,n.jsx)(t.p,{children:"Refuse to drop the trigger if any objects depend on it. This is the default."}),"\n",(0,n.jsx)(t.h2,{id:"examples",children:"Examples"}),"\n",(0,n.jsxs)(t.p,{children:["Remove the trigger ",(0,n.jsx)(t.code,{children:"sendmail"})," on table ",(0,n.jsx)(t.code,{children:"expenses"}),";"]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-sql",children:"DROP TRIGGER sendmail ON expenses;\n"})}),"\n",(0,n.jsx)(t.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,n.jsxs)(t.p,{children:["The ",(0,n.jsx)(t.code,{children:"DROP TRIGGER"})," statement in Apache Cloudberry is not compatible with the SQL standard. In the SQL standard, trigger names are not local to tables, so the command is simply ",(0,n.jsx)(t.code,{children:"DROP TRIGGER name"}),"."]}),"\n",(0,n.jsx)(t.h2,{id:"see-also",children:"See also"}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.a,{href:"/docs/sql-stmts/alter-trigger",children:"ALTER TRIGGER"}),", ",(0,n.jsx)(t.a,{href:"/docs/sql-stmts/create-trigger",children:"CREATE TRIGGER"})]})]})}function h(e={}){const{wrapper:t}={...(0,r.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(a,{...e})}):a(e)}},11151:(e,t,s)=>{s.d(t,{Z:()=>o,a:()=>d});var n=s(67294);const r={},i=n.createContext(r);function d(e){const t=n.useContext(i);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:d(e.components),n.createElement(i.Provider,{value:t},e.children)}}}]);