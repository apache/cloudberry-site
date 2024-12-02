"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[2130],{90592:(e,s,t)=>{t.r(s),t.d(s,{assets:()=>l,contentTitle:()=>r,default:()=>h,frontMatter:()=>a,metadata:()=>d,toc:()=>i});var n=t(85893),o=t(11151);const a={title:"REASSIGN OWNED"},r="REASSIGN OWNED",d={id:"sql-stmts/reassign-owned",title:"REASSIGN OWNED",description:"Changes the ownership of database objects owned by a database role.",source:"@site/docs/sql-stmts/reassign-owned.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/reassign-owned",permalink:"/docs/sql-stmts/reassign-owned",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/reassign-owned.md",tags:[],version:"current",lastUpdatedBy:"vitalzf",lastUpdatedAt:1733108055,formattedLastUpdatedAt:"Dec 2, 2024",frontMatter:{title:"REASSIGN OWNED"},sidebar:"docsbars",previous:{title:"PREPARE",permalink:"/docs/sql-stmts/prepare"},next:{title:"REFRESH MATERIALIZED VIEW",permalink:"/docs/sql-stmts/refresh-materialized-view"}},l={},i=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Notes",id:"notes",level:2},{value:"Examples",id:"examples",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function c(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,o.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.h1,{id:"reassign-owned",children:"REASSIGN OWNED"}),"\n",(0,n.jsx)(s.p,{children:"Changes the ownership of database objects owned by a database role."}),"\n",(0,n.jsx)(s.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"REASSIGN OWNED BY { <old_role> | CURRENT_USER | SESSION_USER } [, ...]\n               TO { <new_role> | CURRENT_USER | SESSION_USER }\n"})}),"\n",(0,n.jsx)(s.h2,{id:"description",children:"Description"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"REASSIGN OWNED"})," changes the ownership of database objects owned by any of the old_roles to new_role."]}),"\n",(0,n.jsx)(s.h2,{id:"parameters",children:"Parameters"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"old_role"})})}),"\n",(0,n.jsx)(s.p,{children:"The name of a role. The ownership of all the objects in the current database, and of all shared objects (databases, tablespaces), owned by this role will be reassigned to new_role."}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"new_role"})})}),"\n",(0,n.jsx)(s.p,{children:"The name of the role that will be made the new owner of the affected objects."}),"\n",(0,n.jsx)(s.h2,{id:"notes",children:"Notes"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"REASSIGN OWNED"})," is often used to prepare for the removal of one or more roles. Because ",(0,n.jsx)(s.code,{children:"REASSIGN OWNED"})," does not affect objects in other databases, it is usually necessary to run this command in each database that contains objects owned by a role that is to be removed."]}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"REASSIGN OWNED"})," requires privileges on both the source role(s) and the target role."]}),"\n",(0,n.jsxs)(s.p,{children:["The ",(0,n.jsx)(s.a,{href:"/docs/sql-stmts/drop-owned",children:"DROP OWNED"})," command is an alternative that simply drops all of the database objects owned by one or more roles."]}),"\n",(0,n.jsxs)(s.p,{children:["The ",(0,n.jsx)(s.code,{children:"REASSIGN OWNED"})," command does not affect any privileges granted to the old_roles on objects that are not owned by them. Likewise, it does not affect default privileges created with ",(0,n.jsx)(s.code,{children:"ALTER DEFAULT PRIVILEGES"}),". Use ",(0,n.jsx)(s.code,{children:"DROP OWNED"})," to revoke such privileges."]}),"\n",(0,n.jsx)(s.h2,{id:"examples",children:"Examples"}),"\n",(0,n.jsxs)(s.p,{children:["Reassign any database objects owned by the role named ",(0,n.jsx)(s.code,{children:"sally"})," and ",(0,n.jsx)(s.code,{children:"bob"})," to ",(0,n.jsx)(s.code,{children:"admin"}),":"]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"REASSIGN OWNED BY sally, bob TO admin;\n"})}),"\n",(0,n.jsx)(s.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,n.jsxs)(s.p,{children:["The ",(0,n.jsx)(s.code,{children:"REASSIGN OWNED"})," command is a Cloudberry Database extension."]}),"\n",(0,n.jsx)(s.h2,{id:"see-also",children:"See also"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.a,{href:"/docs/sql-stmts/drop-owned",children:"DROP OWNED"}),", ",(0,n.jsx)(s.a,{href:"/docs/sql-stmts/drop-role",children:"DROP ROLE"}),", ",(0,n.jsx)(s.a,{href:"/docs/sql-stmts/alter-database",children:"ALTER DATABASE"})]})]})}function h(e={}){const{wrapper:s}={...(0,o.a)(),...e.components};return s?(0,n.jsx)(s,{...e,children:(0,n.jsx)(c,{...e})}):c(e)}},11151:(e,s,t)=>{t.d(s,{Z:()=>d,a:()=>r});var n=t(67294);const o={},a=n.createContext(o);function r(e){const s=n.useContext(a);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function d(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:r(e.components),n.createElement(a.Provider,{value:s},e.children)}}}]);