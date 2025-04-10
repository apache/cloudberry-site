"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[7546],{10079:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>i,contentTitle:()=>l,default:()=>h,frontMatter:()=>r,metadata:()=>c,toc:()=>a});var o=n(85893),s=n(11151);const r={title:"ALTER PROTOCOL"},l="ALTER PROTOCOL",c={id:"sql-stmts/alter-protocol",title:"ALTER PROTOCOL",description:"Changes the definition of a protocol.",source:"@site/docs/sql-stmts/alter-protocol.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/alter-protocol",permalink:"/zh/docs/sql-stmts/alter-protocol",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/alter-protocol.md",tags:[],version:"current",lastUpdatedBy:"Alwin",lastUpdatedAt:1744282709,formattedLastUpdatedAt:"2025\u5e744\u670810\u65e5",frontMatter:{title:"ALTER PROTOCOL"},sidebar:"docsbars",previous:{title:"ALTER PROCEDURE",permalink:"/zh/docs/sql-stmts/alter-procedure"},next:{title:"ALTER RESOURCE GROUP",permalink:"/zh/docs/sql-stmts/alter-resource-group"}},i={},a=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Examples",id:"examples",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function d(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,s.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h1,{id:"alter-protocol",children:"ALTER PROTOCOL"}),"\n",(0,o.jsx)(t.p,{children:"Changes the definition of a protocol."}),"\n",(0,o.jsx)(t.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-sql",children:"ALTER PROTOCOL <name> RENAME TO <newname>\n\nALTER PROTOCOL <name> OWNER TO <newowner>\n"})}),"\n",(0,o.jsx)(t.h2,{id:"description",children:"Description"}),"\n",(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.code,{children:"ALTER PROTOCOL"})," changes the definition of a protocol. Only the protocol name or owner can be altered."]}),"\n",(0,o.jsxs)(t.p,{children:["You must own the protocol to use ",(0,o.jsx)(t.code,{children:"ALTER PROTOCOL"}),". To alter the owner, you must also be a direct or indirect member of the new owning role, and that role must have ",(0,o.jsx)(t.code,{children:"CREATE"})," privilege on schema of the protocol."]}),"\n",(0,o.jsx)(t.p,{children:"These restrictions are in place to ensure that altering the owner only makes changes that could by made by dropping and recreating the protocol. Note that a superuser can alter ownership of any protocol."}),"\n",(0,o.jsx)(t.h2,{id:"parameters",children:"Parameters"}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.strong,{children:(0,o.jsx)(t.code,{children:"name"})})}),"\n",(0,o.jsx)(t.p,{children:"The name (optionally schema-qualified) of an existing protocol."}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.strong,{children:(0,o.jsx)(t.code,{children:"newname"})})}),"\n",(0,o.jsx)(t.p,{children:"The new name of the protocol."}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.strong,{children:(0,o.jsx)(t.code,{children:"newowner"})})}),"\n",(0,o.jsx)(t.p,{children:"The new owner of the protocol."}),"\n",(0,o.jsx)(t.h2,{id:"examples",children:"Examples"}),"\n",(0,o.jsxs)(t.p,{children:["To rename the protocol ",(0,o.jsx)(t.code,{children:"GPDBauth"})," to ",(0,o.jsx)(t.code,{children:"GPDB_authentication"}),":"]}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-sql",children:"ALTER PROTOCOL GPDBauth RENAME TO GPDB_authentication;\n"})}),"\n",(0,o.jsxs)(t.p,{children:["To change the owner of the ",(0,o.jsx)(t.code,{children:"GPDB_authentication"})," protocol to ",(0,o.jsx)(t.code,{children:"joe"}),":"]}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-sql",children:"ALTER PROTOCOL GPDB_authentication OWNER TO joe;\n"})}),"\n",(0,o.jsx)(t.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,o.jsxs)(t.p,{children:["There is no ",(0,o.jsx)(t.code,{children:"ALTER PROTOCOL"})," statement in the SQL standard."]}),"\n",(0,o.jsx)(t.h2,{id:"see-also",children:"See also"}),"\n",(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.a,{href:"/zh/docs/sql-stmts/create-external-table",children:"CREATE EXTERNAL TABLE"}),", ",(0,o.jsx)(t.a,{href:"/zh/docs/sql-stmts/create-protocol",children:"CREATE PROTOCOL"}),", ",(0,o.jsx)(t.a,{href:"/zh/docs/sql-stmts/drop-protocol",children:"DROP PROTOCOL"})]})]})}function h(e={}){const{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},11151:(e,t,n)=>{n.d(t,{Z:()=>c,a:()=>l});var o=n(67294);const s={},r=o.createContext(s);function l(e){const t=o.useContext(r);return o.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:l(e.components),o.createElement(r.Provider,{value:t},e.children)}}}]);