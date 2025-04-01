"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[971],{28561:(e,s,r)=>{r.r(s),r.d(s,{assets:()=>l,contentTitle:()=>a,default:()=>h,frontMatter:()=>o,metadata:()=>i,toc:()=>c});var t=r(85893),n=r(11151);const o={title:"ALTER GROUP"},a="ALTER GROUP",i={id:"sql-stmts/alter-group",title:"ALTER GROUP",description:"Changes a role name or membership.",source:"@site/docs/sql-stmts/alter-group.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/alter-group",permalink:"/docs/sql-stmts/alter-group",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/alter-group.md",tags:[],version:"current",lastUpdatedBy:"Dianjin Wang",lastUpdatedAt:1743488661,formattedLastUpdatedAt:"Apr 1, 2025",frontMatter:{title:"ALTER GROUP"},sidebar:"docsbars",previous:{title:"ALTER FUNCTION",permalink:"/docs/sql-stmts/alter-function"},next:{title:"ALTER INDEX",permalink:"/docs/sql-stmts/alter-index"}},l={},c=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Examples",id:"examples",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function d(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,n.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(s.h1,{id:"alter-group",children:"ALTER GROUP"}),"\n",(0,t.jsx)(s.p,{children:"Changes a role name or membership."}),"\n",(0,t.jsx)(s.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-sql",children:"ALTER GROUP <role_specification> ADD USER <user_name> [, ... ]\n\nALTER GROUP <role_specification> DROP USER <user_name> [, ... ]\n\n-- where <role_specification> can be:\n\n    <role_name>\n  | CURRENT_USER\n  | SESSION_USER\n\nALTER GROUP <group_name> RENAME TO <new_name>\n"})}),"\n",(0,t.jsx)(s.h2,{id:"description",children:"Description"}),"\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.code,{children:"ALTER GROUP"})," changes the attributes of a user group. This is an obsolete command, though still accepted for backwards compatibility, because users and groups are superseded by the more general concept of roles."]}),"\n",(0,t.jsxs)(s.p,{children:['The first two variants add users to a group or remove them from a group. (Any role can play the part of either a "user" or "group" for this purpose. These variants are effectively equivalent to granting or revoking membership in the role named as the "group"; so, the preferred way to do this is to use ',(0,t.jsx)(s.a,{href:"/docs/sql-stmts/grant",children:"GRANT"})," or ",(0,t.jsx)(s.a,{href:"/docs/sql-stmts/revoke",children:"REVOKE"}),"."]}),"\n",(0,t.jsxs)(s.p,{children:["The third variant changes the name of the group. This is exactly equivalent to renaming the role with ",(0,t.jsx)(s.a,{href:"/docs/sql-stmts/alter-role",children:"ALTER ROLE"}),"."]}),"\n",(0,t.jsx)(s.h2,{id:"parameters",children:"Parameters"}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.strong,{children:(0,t.jsx)(s.code,{children:"group_name"})})}),"\n",(0,t.jsx)(s.p,{children:"The name of the group (role) to modify."}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.strong,{children:(0,t.jsx)(s.code,{children:"user_name"})})}),"\n",(0,t.jsxs)(s.p,{children:["Users (roles) that are to be added to or removed from the group. The users (roles) must already exist; ",(0,t.jsx)(s.code,{children:"ALTER GROUP"})," does not create or drop users."]}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.strong,{children:(0,t.jsx)(s.code,{children:"new_name"})})}),"\n",(0,t.jsx)(s.p,{children:"The new name of the group."}),"\n",(0,t.jsx)(s.h2,{id:"examples",children:"Examples"}),"\n",(0,t.jsx)(s.p,{children:"To add users to a group:"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-sql",children:"ALTER GROUP staff ADD USER karl, john;\n"})}),"\n",(0,t.jsx)(s.p,{children:"To remove a user from a group:"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-sql",children:"ALTER GROUP workers DROP USER beth;\n"})}),"\n",(0,t.jsx)(s.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,t.jsxs)(s.p,{children:["There is no ",(0,t.jsx)(s.code,{children:"ALTER GROUP"})," statement in the SQL standard."]}),"\n",(0,t.jsx)(s.h2,{id:"see-also",children:"See also"}),"\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.a,{href:"/docs/sql-stmts/alter-role",children:"ALTER ROLE"}),", ",(0,t.jsx)(s.a,{href:"/docs/sql-stmts/grant",children:"GRANT"}),", ",(0,t.jsx)(s.a,{href:"/docs/sql-stmts/revoke",children:"REVOKE"})]})]})}function h(e={}){const{wrapper:s}={...(0,n.a)(),...e.components};return s?(0,t.jsx)(s,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},11151:(e,s,r)=>{r.d(s,{Z:()=>i,a:()=>a});var t=r(67294);const n={},o=t.createContext(n);function a(e){const s=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function i(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:a(e.components),t.createElement(o.Provider,{value:s},e.children)}}}]);