"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[9673],{24683:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>i,default:()=>g,frontMatter:()=>a,metadata:()=>o,toc:()=>c});var s=t(85893),r=t(11151);const a={title:"DROP AGGREGATE"},i="DROP AGGREGATE",o={id:"sql-stmts/drop-aggregate",title:"DROP AGGREGATE",description:"Removes an aggregate function.",source:"@site/docs/sql-stmts/drop-aggregate.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/drop-aggregate",permalink:"/docs/sql-stmts/drop-aggregate",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/drop-aggregate.md",tags:[],version:"current",lastUpdatedBy:"Dianjin Wang",lastUpdatedAt:1744271659,formattedLastUpdatedAt:"Apr 10, 2025",frontMatter:{title:"DROP AGGREGATE"},sidebar:"docsbars",previous:{title:"DROP ACCESS METHOD",permalink:"/docs/sql-stmts/drop-access-method"},next:{title:"DROP CAST",permalink:"/docs/sql-stmts/drop-cast"}},d={},c=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Notes",id:"notes",level:2},{value:"Examples",id:"examples",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function l(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,r.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"drop-aggregate",children:"DROP AGGREGATE"}),"\n",(0,s.jsx)(n.p,{children:"Removes an aggregate function."}),"\n",(0,s.jsx)(n.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"DROP AGGREGATE [IF EXISTS] <name> ( <aggregate_signature> ) [, ...] [CASCADE | RESTRICT]\n\n-- where <aggregate_signature> is:\n\n* |\n[ <argmode> ] [ <argname> ] <argtype> [ , ... ] |\n[ [ <argmode> ] [ <argname> ] <argtype> [ , ... ] ] ORDER BY [ <argmode> ] [ <argname> ] <argtype> [ , ... ]\n"})}),"\n",(0,s.jsx)(n.h2,{id:"description",children:"Description"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"DROP AGGREGATE"})," removes an existing aggregate function. To run this command the current user must be the owner of the aggregate function."]}),"\n",(0,s.jsx)(n.h2,{id:"parameters",children:"Parameters"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"IF EXISTS"})})}),"\n",(0,s.jsx)(n.p,{children:"Do not throw an error if the aggregate does not exist. A notice is issued in this case."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"name"})})}),"\n",(0,s.jsx)(n.p,{children:"The name (optionally schema-qualified) of an existing aggregate function."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"argmode"})})}),"\n",(0,s.jsxs)(n.p,{children:["The mode of an argument: ",(0,s.jsx)(n.code,{children:"IN"})," or ",(0,s.jsx)(n.code,{children:"VARIADIC"}),". If omitted, the default is ",(0,s.jsx)(n.code,{children:"IN"}),"."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"argname"})})}),"\n",(0,s.jsxs)(n.p,{children:["The name of an argument. Note that ",(0,s.jsx)(n.code,{children:"DROP AGGREGATE"})," does not actually pay any attention to argument names, since only the argument data types are needed to determine the aggregate function's identity."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"argtype"})})}),"\n",(0,s.jsxs)(n.p,{children:["An input data type on which the aggregate function operates. To reference a zero-argument aggregate function, write ",(0,s.jsx)(n.code,{children:"*"})," in place of the list of argument specifications. To reference an ordered-set aggregate function, write ",(0,s.jsx)(n.code,{children:"ORDER BY"})," between the direct and aggregated argument specifications."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"CASCADE"})})}),"\n",(0,s.jsx)(n.p,{children:"Automatically drop objects that depend on the aggregate function (such as views using it) and in turn all objects that depend on those objects."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"RESTRICT"})})}),"\n",(0,s.jsx)(n.p,{children:"Refuse to drop the aggregate function if any objects depend on it. This is the default."}),"\n",(0,s.jsx)(n.h2,{id:"notes",children:"Notes"}),"\n",(0,s.jsxs)(n.p,{children:["Alternative syntaxes for referencing ordered-set aggregates are described under ",(0,s.jsx)(n.a,{href:"/docs/sql-stmts/alter-aggregate",children:"ALTER AGGREGATE"}),"."]}),"\n",(0,s.jsx)(n.h2,{id:"examples",children:"Examples"}),"\n",(0,s.jsxs)(n.p,{children:["To remove the aggregate function ",(0,s.jsx)(n.code,{children:"myavg"})," for type ",(0,s.jsx)(n.code,{children:"integer"}),":"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"DROP AGGREGATE myavg(integer);\n"})}),"\n",(0,s.jsxs)(n.p,{children:["To remove the hypothetical-set aggregate function ",(0,s.jsx)(n.code,{children:"myrank"}),", which takes an arbitrary list of ordering columns and a matching list of direct arguments:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:'DROP AGGREGATE myrank(VARIADIC "any" ORDER BY VARIADIC "any");\n'})}),"\n",(0,s.jsx)(n.p,{children:"To remove multiple aggregate functions in one command:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"DROP AGGREGATE myavg(integer), myavg(bigint);\n"})}),"\n",(0,s.jsx)(n.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,s.jsxs)(n.p,{children:["There is no ",(0,s.jsx)(n.code,{children:"DROP AGGREGATE"})," statement in the SQL standard."]}),"\n",(0,s.jsx)(n.h2,{id:"see-also",children:"See also"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.a,{href:"/docs/sql-stmts/alter-aggregate",children:"ALTER AGGREGATE"}),", ",(0,s.jsx)(n.a,{href:"/docs/sql-stmts/create-aggregate",children:"CREATE AGGREGATE"})]})]})}function g(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},11151:(e,n,t)=>{t.d(n,{Z:()=>o,a:()=>i});var s=t(67294);const r={},a=s.createContext(r);function i(e){const n=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),s.createElement(a.Provider,{value:n},e.children)}}}]);