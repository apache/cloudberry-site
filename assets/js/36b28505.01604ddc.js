"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[7528],{35569:(e,s,t)=>{t.r(s),t.d(s,{assets:()=>o,contentTitle:()=>i,default:()=>h,frontMatter:()=>r,metadata:()=>c,toc:()=>l});var n=t(85893),a=t(11151);const r={title:"ALTER SCHEMA"},i="ALTER SCHEMA",c={id:"sql-stmts/alter-schema",title:"ALTER SCHEMA",description:"Changes the definition of a schema.",source:"@site/docs/sql-stmts/alter-schema.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/alter-schema",permalink:"/docs/sql-stmts/alter-schema",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/alter-schema.md",tags:[],version:"current",lastUpdatedBy:"TomShawn",lastUpdatedAt:1741056503,formattedLastUpdatedAt:"Mar 4, 2025",frontMatter:{title:"ALTER SCHEMA"},sidebar:"docsbars",previous:{title:"ALTER RULE",permalink:"/docs/sql-stmts/alter-rule"},next:{title:"ALTER SEQUENCE",permalink:"/docs/sql-stmts/alter-sequence"}},o={},l=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function d(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,a.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.h1,{id:"alter-schema",children:"ALTER SCHEMA"}),"\n",(0,n.jsx)(s.p,{children:"Changes the definition of a schema."}),"\n",(0,n.jsx)(s.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"ALTER SCHEMA <name> RENAME TO <new_name>\n\nALTER SCHEMA <name> OWNER TO { <new_owner> | CURRENT_USER | SESSION_USER }\n"})}),"\n",(0,n.jsx)(s.h2,{id:"description",children:"Description"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"ALTER SCHEMA"})," changes the definition of a schema."]}),"\n",(0,n.jsxs)(s.p,{children:["You must own the schema to use ",(0,n.jsx)(s.code,{children:"ALTER SCHEMA"}),". To rename a schema you must also have the ",(0,n.jsx)(s.code,{children:"CREATE"})," privilege for the database. To alter the owner, you must also be a direct or indirect member of the new owning role, and you must have the ",(0,n.jsx)(s.code,{children:"CREATE"})," privilege for the database. Note that superusers have all these privileges automatically."]}),"\n",(0,n.jsx)(s.h2,{id:"parameters",children:"Parameters"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"name"})})}),"\n",(0,n.jsx)(s.p,{children:"The name of an existing schema."}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"new_name"})})}),"\n",(0,n.jsxs)(s.p,{children:["The new name of the schema. The new name cannot begin with ",(0,n.jsx)(s.code,{children:"pg_"}),", as such names are reserved for system schemas."]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"new_owner"})})}),"\n",(0,n.jsx)(s.p,{children:"The new owner of the schema."}),"\n",(0,n.jsx)(s.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,n.jsxs)(s.p,{children:["There is no ",(0,n.jsx)(s.code,{children:"ALTER SCHEMA"})," statement in the SQL standard."]}),"\n",(0,n.jsx)(s.h2,{id:"see-also",children:"See also"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.a,{href:"/docs/sql-stmts/create-schema",children:"CREATE SCHEMA"}),", ",(0,n.jsx)(s.a,{href:"/docs/sql-stmts/drop-schema",children:"DROP SCHEMA"})]})]})}function h(e={}){const{wrapper:s}={...(0,a.a)(),...e.components};return s?(0,n.jsx)(s,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}},11151:(e,s,t)=>{t.d(s,{Z:()=>c,a:()=>i});var n=t(67294);const a={},r=n.createContext(a);function i(e){const s=n.useContext(r);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function c(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:i(e.components),n.createElement(r.Provider,{value:s},e.children)}}}]);