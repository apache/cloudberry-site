"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[3307],{14513:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>p,frontMatter:()=>l,metadata:()=>i,toc:()=>a});var t=s(85893),r=s(11151);const l={title:"CALL"},o="CALL",i={id:"sql-stmts/call",title:"CALL",description:"Invokes a procedure.",source:"@site/docs/sql-stmts/call.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/call",permalink:"/docs/sql-stmts/call",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/call.md",tags:[],version:"current",lastUpdatedBy:"TomShawn",lastUpdatedAt:1741056503,formattedLastUpdatedAt:"Mar 4, 2025",frontMatter:{title:"CALL"},sidebar:"docsbars",previous:{title:"BEGIN",permalink:"/docs/sql-stmts/begin"},next:{title:"CHECKPOINT",permalink:"/docs/sql-stmts/checkpoint"}},c={},a=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Notes",id:"notes",level:2},{value:"Examples",id:"examples",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,r.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"call",children:"CALL"}),"\n",(0,t.jsx)(n.p,{children:"Invokes a procedure."}),"\n",(0,t.jsx)(n.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sql",children:"CALL <name> ( [ <argument> ] [, ...] )\n"})}),"\n",(0,t.jsx)(n.h2,{id:"description",children:"Description"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"CALL"})," executes a procedure."]}),"\n",(0,t.jsx)(n.p,{children:"If the procedure has any output parameters, then a result row will be returned, containing the values of those parameters."}),"\n",(0,t.jsx)(n.h2,{id:"parameters",children:"Parameters"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"name"})})}),"\n",(0,t.jsx)(n.p,{children:"The name (optionally schema-qualified) of the procedure."}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"argument"})})}),"\n",(0,t.jsx)(n.p,{children:"An input argument for the procedure call."}),"\n",(0,t.jsx)(n.h2,{id:"notes",children:"Notes"}),"\n",(0,t.jsxs)(n.p,{children:["The user must have ",(0,t.jsx)(n.code,{children:"EXECUTE"})," privilege on the procedure in order to be allowed to invoke it."]}),"\n",(0,t.jsxs)(n.p,{children:["To call a function (not a procedure), use ",(0,t.jsx)(n.a,{href:"/docs/sql-stmts/select",children:"SELECT"})," instead."]}),"\n",(0,t.jsxs)(n.p,{children:["If ",(0,t.jsx)(n.code,{children:"CALL"})," is invoked in a transaction block, then the called procedure cannot run transaction control statements. Transaction control statements are only allowed if ",(0,t.jsx)(n.code,{children:"CALL"})," is invoked in its own transaction."]}),"\n",(0,t.jsxs)(n.p,{children:["PL/pgSQL handles output parameters in ",(0,t.jsx)(n.code,{children:"CALL"})," commands differently; refer to ",(0,t.jsx)(n.a,{href:"https://www.postgresql.org/docs/12/plpgsql-control-structures.html#PLPGSQL-STATEMENTS-CALLING-PROCEDURE",children:"Calling a Procedure"})," in the PostgreSQL documentation for more information."]}),"\n",(0,t.jsx)(n.h2,{id:"examples",children:"Examples"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sql",children:"CALL do_db_maintenance();\n"})}),"\n",(0,t.jsx)(n.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"CALL"})," conforms to the SQL standard."]}),"\n",(0,t.jsx)(n.h2,{id:"see-also",children:"See also"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.a,{href:"/docs/sql-stmts/create-procedure",children:"CREATE PROCEDURE"})})]})}function p(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},11151:(e,n,s)=>{s.d(n,{Z:()=>i,a:()=>o});var t=s(67294);const r={},l=t.createContext(r);function o(e){const n=t.useContext(l);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),t.createElement(l.Provider,{value:n},e.children)}}}]);