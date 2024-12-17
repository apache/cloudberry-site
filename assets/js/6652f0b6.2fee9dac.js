"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[3710],{2928:(e,s,r)=>{r.r(s),r.d(s,{assets:()=>c,contentTitle:()=>l,default:()=>u,frontMatter:()=>t,metadata:()=>a,toc:()=>d});var o=r(85893),n=r(11151);const t={title:"DROP RESOURCE QUEUE"},l="DROP RESOURCE QUEUE",a={id:"sql-stmts/drop-resource-queue",title:"DROP RESOURCE QUEUE",description:"Removes a resource queue.",source:"@site/docs/sql-stmts/drop-resource-queue.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/drop-resource-queue",permalink:"/docs/sql-stmts/drop-resource-queue",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/drop-resource-queue.md",tags:[],version:"current",lastUpdatedBy:"TomShawn",lastUpdatedAt:1734402925,formattedLastUpdatedAt:"Dec 17, 2024",frontMatter:{title:"DROP RESOURCE QUEUE"},sidebar:"docsbars",previous:{title:"DROP RESOURCE GROUP",permalink:"/docs/sql-stmts/drop-resource-group"},next:{title:"DROP ROLE",permalink:"/docs/sql-stmts/drop-role"}},c={},d=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Notes",id:"notes",level:2},{value:"Examples",id:"examples",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function i(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,n.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(s.h1,{id:"drop-resource-queue",children:"DROP RESOURCE QUEUE"}),"\n",(0,o.jsx)(s.p,{children:"Removes a resource queue."}),"\n",(0,o.jsx)(s.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{className:"language-sql",children:"DROP RESOURCE QUEUE <queue_name>\n"})}),"\n",(0,o.jsx)(s.h2,{id:"description",children:"Description"}),"\n",(0,o.jsx)(s.p,{children:"This command removes a resource queue from Cloudberry Database. To drop a resource queue, the queue cannot have any roles assigned to it, nor can it have any statements waiting in the queue. Only a superuser can drop a resource queue."}),"\n",(0,o.jsx)(s.h2,{id:"parameters",children:"Parameters"}),"\n",(0,o.jsx)(s.p,{children:(0,o.jsx)(s.strong,{children:(0,o.jsx)(s.code,{children:"queue_name"})})}),"\n",(0,o.jsx)(s.p,{children:"The name of a resource queue to remove."}),"\n",(0,o.jsx)(s.h2,{id:"notes",children:"Notes"}),"\n",(0,o.jsxs)(s.p,{children:["Use ",(0,o.jsx)(s.a,{href:"/docs/sql-stmts/alter-role",children:"ALTER ROLE"})," to remove a user from a resource queue."]}),"\n",(0,o.jsxs)(s.p,{children:["To see all the currently active queries for all resource queues, perform the following query of the ",(0,o.jsx)(s.code,{children:"pg_locks"})," table joined with the ",(0,o.jsx)(s.code,{children:"pg_roles"})," and ",(0,o.jsx)(s.code,{children:"pg_resqueue"})," tables:"]}),"\n",(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{className:"language-sql",children:"SELECT rolname, rsqname, locktype, objid, pid, \nmode, granted FROM pg_roles, pg_resqueue, pg_locks WHERE \npg_roles.rolresqueue=pg_locks.objid AND \npg_locks.objid=pg_resqueue.oid;\n"})}),"\n",(0,o.jsxs)(s.p,{children:["To see the roles assigned to a resource queue, perform the following query of the ",(0,o.jsx)(s.code,{children:"pg_roles"})," and ",(0,o.jsx)(s.code,{children:"pg_resqueue"})," system catalog tables:"]}),"\n",(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{className:"language-sql",children:"SELECT rolname, rsqname FROM pg_roles, pg_resqueue WHERE \npg_roles.rolresqueue=pg_resqueue.oid;\n"})}),"\n",(0,o.jsx)(s.h2,{id:"examples",children:"Examples"}),"\n",(0,o.jsxs)(s.p,{children:["Remove a role from a resource queue (and move the role to the default resource queue, ",(0,o.jsx)(s.code,{children:"pg_default"}),"):"]}),"\n",(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{className:"language-sql",children:"ALTER ROLE bob RESOURCE QUEUE NONE;\n"})}),"\n",(0,o.jsxs)(s.p,{children:["Remove the resource queue named ",(0,o.jsx)(s.code,{children:"adhoc"}),":"]}),"\n",(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{className:"language-sql",children:"DROP RESOURCE QUEUE adhoc;\n"})}),"\n",(0,o.jsx)(s.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,o.jsxs)(s.p,{children:["The ",(0,o.jsx)(s.code,{children:"DROP RESOURCE QUEUE"})," statement is a Cloudberry Database extension."]}),"\n",(0,o.jsx)(s.h2,{id:"see-also",children:"See also"}),"\n",(0,o.jsxs)(s.p,{children:[(0,o.jsx)(s.a,{href:"/docs/sql-stmts/alter-resource-queue",children:"ALTER RESOURCE QUEUE"}),", ",(0,o.jsx)(s.a,{href:"/docs/sql-stmts/create-resource-queue",children:"CREATE RESOURCE QUEUE"}),", ",(0,o.jsx)(s.a,{href:"/docs/sql-stmts/alter-role",children:"ALTER ROLE"})]})]})}function u(e={}){const{wrapper:s}={...(0,n.a)(),...e.components};return s?(0,o.jsx)(s,{...e,children:(0,o.jsx)(i,{...e})}):i(e)}},11151:(e,s,r)=>{r.d(s,{Z:()=>a,a:()=>l});var o=r(67294);const n={},t=o.createContext(n);function l(e){const s=o.useContext(t);return o.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function a(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:l(e.components),o.createElement(t.Provider,{value:s},e.children)}}}]);