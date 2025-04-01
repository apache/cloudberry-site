"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[8751],{71650:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>a,contentTitle:()=>d,default:()=>p,frontMatter:()=>o,metadata:()=>r,toc:()=>l});var t=n(85893),i=n(11151);const o={title:"DROP DOMAIN"},d="DROP DOMAIN",r={id:"sql-stmts/drop-domain",title:"DROP DOMAIN",description:"Removes a domain.",source:"@site/docs/sql-stmts/drop-domain.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/drop-domain",permalink:"/docs/sql-stmts/drop-domain",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/drop-domain.md",tags:[],version:"current",lastUpdatedBy:"Dianjin Wang",lastUpdatedAt:1743488661,formattedLastUpdatedAt:"Apr 1, 2025",frontMatter:{title:"DROP DOMAIN"},sidebar:"docsbars",previous:{title:"DROP DATABASE",permalink:"/docs/sql-stmts/drop-database"},next:{title:"DROP EXTENSION",permalink:"/docs/sql-stmts/drop-extension"}},a={},l=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Examples",id:"examples",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function c(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,i.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(s.h1,{id:"drop-domain",children:"DROP DOMAIN"}),"\n",(0,t.jsx)(s.p,{children:"Removes a domain."}),"\n",(0,t.jsx)(s.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-sql",children:"DROP DOMAIN [IF EXISTS] <name> [, ...]  [CASCADE | RESTRICT]\n"})}),"\n",(0,t.jsx)(s.h2,{id:"description",children:"Description"}),"\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.code,{children:"DROP DOMAIN"})," removes a previously defined domain. Only the owner of a domain can remove it."]}),"\n",(0,t.jsx)(s.h2,{id:"parameters",children:"Parameters"}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.strong,{children:(0,t.jsx)(s.code,{children:"IF EXISTS"})})}),"\n",(0,t.jsx)(s.p,{children:"Do not throw an error if the domain does not exist. A notice is issued in this case."}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.strong,{children:(0,t.jsx)(s.code,{children:"name"})})}),"\n",(0,t.jsx)(s.p,{children:"The name (optionally schema-qualified) of an existing domain."}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.strong,{children:(0,t.jsx)(s.code,{children:"CASCADE"})})}),"\n",(0,t.jsx)(s.p,{children:"Automatically drop objects that depend on the domain (such as table columns), and in turn all objects that depend on those objects."}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.strong,{children:(0,t.jsx)(s.code,{children:"RESTRICT"})})}),"\n",(0,t.jsx)(s.p,{children:"Refuse to drop the domain if any objects depend on it. This is the default."}),"\n",(0,t.jsx)(s.h2,{id:"examples",children:"Examples"}),"\n",(0,t.jsxs)(s.p,{children:["Remove the domain named ",(0,t.jsx)(s.code,{children:"us_postal_code"}),":"]}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-sql",children:"DROP DOMAIN us_postal_code;\n"})}),"\n",(0,t.jsx)(s.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,t.jsxs)(s.p,{children:["This command conforms to the SQL standard, except for the ",(0,t.jsx)(s.code,{children:"IF EXISTS"})," option, which is a Apache Cloudberry extension."]}),"\n",(0,t.jsx)(s.h2,{id:"see-also",children:"See also"}),"\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.a,{href:"/docs/sql-stmts/alter-domain",children:"ALTER DOMAIN"}),", ",(0,t.jsx)(s.a,{href:"/docs/sql-stmts/create-domain",children:"CREATE DOMAIN"})]})]})}function p(e={}){const{wrapper:s}={...(0,i.a)(),...e.components};return s?(0,t.jsx)(s,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},11151:(e,s,n)=>{n.d(s,{Z:()=>r,a:()=>d});var t=n(67294);const i={},o=t.createContext(i);function d(e){const s=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function r(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:d(e.components),t.createElement(o.Provider,{value:s},e.children)}}}]);