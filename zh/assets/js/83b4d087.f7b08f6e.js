"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[9239],{85457:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>i,default:()=>E,frontMatter:()=>a,metadata:()=>o,toc:()=>c});var s=t(85893),r=t(11151);const a={title:"CREATE GROUP"},i="CREATE GROUP",o={id:"sql-stmts/create-group",title:"CREATE GROUP",description:"Defines a new database role.",source:"@site/docs/sql-stmts/create-group.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/create-group",permalink:"/zh/docs/sql-stmts/create-group",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/create-group.md",tags:[],version:"current",lastUpdatedBy:"TomShawn",lastUpdatedAt:1741056503,formattedLastUpdatedAt:"2025\u5e743\u67084\u65e5",frontMatter:{title:"CREATE GROUP"},sidebar:"docsbars",previous:{title:"CREATE FUNCTION",permalink:"/zh/docs/sql-stmts/create-function"},next:{title:"CREATE INDEX",permalink:"/zh/docs/sql-stmts/create-index"}},l={},c=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...(0,r.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"create-group",children:"CREATE GROUP"}),"\n",(0,s.jsx)(n.p,{children:"Defines a new database role."}),"\n",(0,s.jsx)(n.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"CREATE GROUP <name> [[WITH] <option> [ ... ]]\n"})}),"\n",(0,s.jsx)(n.p,{children:"where option can be:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"      SUPERUSER | NOSUPERUSER\n    | CREATEDB | NOCREATEDB\n    | CREATEROLE | NOCREATEROLE\n\xa0\xa0\xa0\xa0| CREATEEXTTABLE | NOCREATEEXTTABLE \n\xa0\xa0\xa0\xa0\xa0\xa0[ ( <attribute>='<value>'[, ...] ) ]\n\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0where <attributes> and <value> are:\n\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0type='readable'|'writable'\n\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0protocol='gpfdist'|'http'\n    | INHERIT | NOINHERIT\n    | LOGIN | NOLOGIN\n    | REPLICATION | NOREPLICATION\n    | BYPASSRLS | NOBYPASSRLS\n    | CONNECTION LIMIT <connlimit>\n    | [ ENCRYPTED | UNENCRYPTED ] PASSWORD '<password>' | PASSWORD NULL\n    | VALID UNTIL '<timestamp>' \n    | IN ROLE <role_name> [, ...]\n    | IN GROUP <role_name> [, ...]\n    | ROLE <role_name> [, ...]\n    | ADMIN <role_name> [, ...]\n    | USER <role_name> [, ...]\n    | SYSID <uid> [, ...]\n\xa0\xa0\xa0\xa0| RESOURCE QUEUE <queue_name>\n\xa0\xa0\xa0\xa0| RESOURCE GROUP <group_name>\n    | [ DENY <deny_point> ]\n    | [ DENY BETWEEN <deny_point> AND <deny_point>]\n"})}),"\n",(0,s.jsx)(n.h2,{id:"description",children:"Description"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"CREATE GROUP"})," is an alias for ",(0,s.jsx)(n.a,{href:"/zh/docs/sql-stmts/create-role",children:"CREATE ROLE"}),"."]}),"\n",(0,s.jsx)(n.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,s.jsxs)(n.p,{children:["There is no ",(0,s.jsx)(n.code,{children:"CREATE GROUP"})," statement in the SQL standard."]}),"\n",(0,s.jsx)(n.h2,{id:"see-also",children:"See also"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"/zh/docs/sql-stmts/create-role",children:"CREATE ROLE"})})]})}function E(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},11151:(e,n,t)=>{t.d(n,{Z:()=>o,a:()=>i});var s=t(67294);const r={},a=s.createContext(r);function i(e){const n=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),s.createElement(a.Provider,{value:n},e.children)}}}]);