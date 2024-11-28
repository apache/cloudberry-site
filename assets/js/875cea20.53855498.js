"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[2817],{52055:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>l,contentTitle:()=>i,default:()=>p,frontMatter:()=>o,metadata:()=>d,toc:()=>a});var t=n(85893),r=n(11151);const o={title:"DROP ROUTINE"},i="DROP ROUTINE",d={id:"sql-stmts/drop-routine",title:"DROP ROUTINE",description:"Removes a routine.",source:"@site/docs/sql-stmts/drop-routine.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/drop-routine",permalink:"/docs/sql-stmts/drop-routine",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/drop-routine.md",tags:[],version:"current",lastUpdatedBy:"Ed Espino",lastUpdatedAt:1732764009,formattedLastUpdatedAt:"Nov 28, 2024",frontMatter:{title:"DROP ROUTINE"},sidebar:"docsbars",previous:{title:"DROP ROLE",permalink:"/docs/sql-stmts/drop-role"},next:{title:"DROP RULE",permalink:"/docs/sql-stmts/drop-rule"}},l={},a=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Examples",id:"examples",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function c(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(s.h1,{id:"drop-routine",children:"DROP ROUTINE"}),"\n",(0,t.jsx)(s.p,{children:"Removes a routine."}),"\n",(0,t.jsx)(s.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-sql",children:"DROP ROUTINE [IF EXISTS] name ( [ [argmode] [argname] argtype [, ...] ] )\n    [CASCADE | RESTRICT]\n"})}),"\n",(0,t.jsx)(s.h2,{id:"description",children:"Description"}),"\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.code,{children:"DROP ROUTINE"})," removes the definition of an existing routine, which can be an aggregate function, a normal function, or a procedure. Refer to ",(0,t.jsx)(s.a,{href:"/docs/sql-stmts/drop-aggregate",children:"DROP AGGREGATE"}),", ",(0,t.jsx)(s.a,{href:"/docs/sql-stmts/drop-function",children:"DROP FUNCTION"}),", and ",(0,t.jsx)(s.a,{href:"/docs/sql-stmts/drop-procedure",children:"DROP PROCEDURE"})," for the description of the parameters, more examples, and further details."]}),"\n",(0,t.jsx)(s.h2,{id:"examples",children:"Examples"}),"\n",(0,t.jsxs)(s.p,{children:["To drop the routine ",(0,t.jsx)(s.code,{children:"foo"})," for type ",(0,t.jsx)(s.code,{children:"integer"}),":"]}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-sql",children:"DROP ROUTINE foo(integer);\n"})}),"\n",(0,t.jsxs)(s.p,{children:["This command will work independent of whether ",(0,t.jsx)(s.code,{children:"foo"})," is an aggregate, function, or procedure."]}),"\n",(0,t.jsx)(s.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,t.jsx)(s.p,{children:"This command conforms to the SQL standard, with these Cloudberry Database extensions:"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:["\n",(0,t.jsx)(s.p,{children:"The standard only allows one routine to be dropped per command."}),"\n"]}),"\n",(0,t.jsxs)(s.li,{children:["\n",(0,t.jsxs)(s.p,{children:["The ",(0,t.jsx)(s.code,{children:"IF EXISTS"})," option."]}),"\n"]}),"\n",(0,t.jsxs)(s.li,{children:["\n",(0,t.jsx)(s.p,{children:"The ability to specify argument modes and names."}),"\n"]}),"\n",(0,t.jsxs)(s.li,{children:["\n",(0,t.jsx)(s.p,{children:"Aggregate functions are an extension."}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(s.h2,{id:"see-also",children:"See also"}),"\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.a,{href:"/docs/sql-stmts/drop-aggregate",children:"DROP AGGREGATE"}),", ",(0,t.jsx)(s.a,{href:"/docs/sql-stmts/drop-function",children:"DROP FUNCTION"}),", ",(0,t.jsx)(s.a,{href:"/docs/sql-stmts/drop-procedure",children:"DROP PROCEDURE"}),", ",(0,t.jsx)(s.a,{href:"/docs/sql-stmts/alter-routine",children:"ALTER ROUTINE"})]})]})}function p(e={}){const{wrapper:s}={...(0,r.a)(),...e.components};return s?(0,t.jsx)(s,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},11151:(e,s,n)=>{n.d(s,{Z:()=>d,a:()=>i});var t=n(67294);const r={},o=t.createContext(r);function i(e){const s=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function d(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),t.createElement(o.Provider,{value:s},e.children)}}}]);