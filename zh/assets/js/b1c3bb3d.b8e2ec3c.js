"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[8818],{25850:(e,r,s)=>{s.r(r),s.d(r,{assets:()=>i,contentTitle:()=>a,default:()=>p,frontMatter:()=>t,metadata:()=>c,toc:()=>l});var o=s(85893),n=s(11151);const t={title:"DROP RESOURCE GROUP"},a="DROP RESOURCE GROUP",c={id:"sql-stmts/drop-resource-group",title:"DROP RESOURCE GROUP",description:"Removes a resource group.",source:"@site/docs/sql-stmts/drop-resource-group.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/drop-resource-group",permalink:"/zh/docs/sql-stmts/drop-resource-group",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/drop-resource-group.md",tags:[],version:"current",lastUpdatedBy:"Dianjin Wang",lastUpdatedAt:1744271659,formattedLastUpdatedAt:"2025\u5e744\u670810\u65e5",frontMatter:{title:"DROP RESOURCE GROUP"},sidebar:"docsbars",previous:{title:"DROP PROTOCOL",permalink:"/zh/docs/sql-stmts/drop-protocol"},next:{title:"DROP RESOURCE QUEUE",permalink:"/zh/docs/sql-stmts/drop-resource-queue"}},i={},l=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Notes",id:"notes",level:2},{value:"Examples",id:"examples",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function d(e){const r={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,n.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(r.h1,{id:"drop-resource-group",children:"DROP RESOURCE GROUP"}),"\n",(0,o.jsx)(r.p,{children:"Removes a resource group."}),"\n",(0,o.jsx)(r.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,o.jsx)(r.pre,{children:(0,o.jsx)(r.code,{className:"language-sql",children:"DROP RESOURCE GROUP <group_name>\n"})}),"\n",(0,o.jsx)(r.h2,{id:"description",children:"Description"}),"\n",(0,o.jsx)(r.p,{children:"This command removes a resource group from Apache Cloudberry. Only a superuser can drop a resource group. When you drop a resource group, the memory and CPU resources reserved by the group are returned to Apache Cloudberry."}),"\n",(0,o.jsx)(r.p,{children:"To drop a role resource group, the group cannot be assigned to any roles, nor can it have any statements pending or running in the group. If you drop a resource group that you created for an external component, the behavior is determined by the external component. For example, dropping a resource group that you assigned to a PL/Container runtime stops running containers in the group."}),"\n",(0,o.jsxs)(r.p,{children:["You cannot drop the pre-defined ",(0,o.jsx)(r.code,{children:"admin_group"})," and ",(0,o.jsx)(r.code,{children:"default_group"})," resource groups."]}),"\n",(0,o.jsx)(r.h2,{id:"parameters",children:"Parameters"}),"\n",(0,o.jsx)(r.p,{children:(0,o.jsx)(r.strong,{children:(0,o.jsx)(r.code,{children:"group_name"})})}),"\n",(0,o.jsx)(r.p,{children:"The name of the resource group to remove."}),"\n",(0,o.jsx)(r.h2,{id:"notes",children:"Notes"}),"\n",(0,o.jsxs)(r.p,{children:["You cannot submit a ",(0,o.jsx)(r.code,{children:"DROP RESOURCE GROUP"})," command in an explicit transaction or sub-transaction."]}),"\n",(0,o.jsxs)(r.p,{children:["Use ",(0,o.jsx)(r.a,{href:"/zh/docs/sql-stmts/alter-role",children:"ALTER ROLE"})," to remove a resource group assigned to a specific user/role."]}),"\n",(0,o.jsx)(r.p,{children:"Perform the following query to view all of the currently active queries for all resource groups:"}),"\n",(0,o.jsx)(r.pre,{children:(0,o.jsx)(r.code,{className:"language-sql",children:"SELECT usename, query, waiting, pid,\n    rsgid, rsgname, rsgqueueduration \n  FROM pg_stat_activity;\n"})}),"\n",(0,o.jsxs)(r.p,{children:["To view the resource group assignments, perform the following query on the ",(0,o.jsx)(r.code,{children:"pg_roles"})," and ",(0,o.jsx)(r.code,{children:"pg_resgroup"})," system catalog tables:"]}),"\n",(0,o.jsx)(r.pre,{children:(0,o.jsx)(r.code,{className:"language-sql",children:"SELECT rolname, rsgname \n  FROM pg_roles, pg_resgroup\n  WHERE pg_roles.rolresgroup=pg_resgroup.oid;\n"})}),"\n",(0,o.jsx)(r.h2,{id:"examples",children:"Examples"}),"\n",(0,o.jsxs)(r.p,{children:["Remove the resource group assigned to a role. This operation then assigns the default resource group ",(0,o.jsx)(r.code,{children:"default_group"})," to the role:"]}),"\n",(0,o.jsx)(r.pre,{children:(0,o.jsx)(r.code,{className:"language-sql",children:"ALTER ROLE bob RESOURCE GROUP NONE;\n"})}),"\n",(0,o.jsxs)(r.p,{children:["Remove the resource group named ",(0,o.jsx)(r.code,{children:"adhoc"}),":"]}),"\n",(0,o.jsx)(r.pre,{children:(0,o.jsx)(r.code,{className:"language-sql",children:"DROP RESOURCE GROUP adhoc;\n"})}),"\n",(0,o.jsx)(r.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,o.jsxs)(r.p,{children:["The ",(0,o.jsx)(r.code,{children:"DROP RESOURCE GROUP"})," statement is a Apache Cloudberry extension."]}),"\n",(0,o.jsx)(r.h2,{id:"see-also",children:"See also"}),"\n",(0,o.jsxs)(r.p,{children:[(0,o.jsx)(r.a,{href:"/zh/docs/sql-stmts/alter-resource-group",children:"ALTER RESOURCE GROUP"}),", ",(0,o.jsx)(r.a,{href:"/zh/docs/sql-stmts/create-resource-group",children:"CREATE RESOURCE GROUP"}),", ",(0,o.jsx)(r.a,{href:"/zh/docs/sql-stmts/alter-role",children:"ALTER ROLE"})]})]})}function p(e={}){const{wrapper:r}={...(0,n.a)(),...e.components};return r?(0,o.jsx)(r,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},11151:(e,r,s)=>{s.d(r,{Z:()=>c,a:()=>a});var o=s(67294);const n={},t=o.createContext(n);function a(e){const r=o.useContext(t);return o.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function c(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:a(e.components),o.createElement(t.Provider,{value:r},e.children)}}}]);