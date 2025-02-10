"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[6104],{89835:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>i,default:()=>h,frontMatter:()=>d,metadata:()=>o,toc:()=>a});var t=s(85893),r=s(11151);const d={title:"DROP PROCEDURE"},i="DROP PROCEDURE",o={id:"sql-stmts/drop-procedure",title:"DROP PROCEDURE",description:"Removes a procedure.",source:"@site/docs/sql-stmts/drop-procedure.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/drop-procedure",permalink:"/zh/docs/sql-stmts/drop-procedure",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/drop-procedure.md",tags:[],version:"current",lastUpdatedBy:"TomShawn",lastUpdatedAt:1739157355,formattedLastUpdatedAt:"2025\u5e742\u670810\u65e5",frontMatter:{title:"DROP PROCEDURE"},sidebar:"docsbars",previous:{title:"DROP POLICY",permalink:"/zh/docs/sql-stmts/drop-policy"},next:{title:"DROP PROTOCOL",permalink:"/zh/docs/sql-stmts/drop-protocol"}},c={},a=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Examples",id:"examples",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function l(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"drop-procedure",children:"DROP PROCEDURE"}),"\n",(0,t.jsx)(n.p,{children:"Removes a procedure."}),"\n",(0,t.jsx)(n.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sql",children:"DROP PROCEDURE [IF EXISTS] name ( [ [argmode] [argname] argtype [, ...] ] )\n    [CASCADE | RESTRICT]\n"})}),"\n",(0,t.jsx)(n.h2,{id:"description",children:"Description"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"DROP PROCEDURE"})," removes the definition of an existing procedure. To run this command the user must be the owner of the procedure. The argument types to the procedure must be specified, since several different procedures may exist with the same name and different argument lists."]}),"\n",(0,t.jsx)(n.h2,{id:"parameters",children:"Parameters"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"IF EXISTS"})})}),"\n",(0,t.jsx)(n.p,{children:"Do not throw an error if the procedure does not exist. A notice is issued in this case."}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"name"})})}),"\n",(0,t.jsx)(n.p,{children:"The name (optionally schema-qualified) of an existing procedure. If no argument list is specified, the name must be unique in its schema."}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"argmode"})})}),"\n",(0,t.jsxs)(n.p,{children:["The mode of an argument: ",(0,t.jsx)(n.code,{children:"IN"})," or ",(0,t.jsx)(n.code,{children:"VARIADIC"}),". If omitted, the default is ",(0,t.jsx)(n.code,{children:"IN"}),"."]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"argname"})})}),"\n",(0,t.jsxs)(n.p,{children:["The name of an argument. Note that ",(0,t.jsx)(n.code,{children:"DROP PROCEDURE"})," does not actually pay any attention to argument names, since only the argument data types are needed to determine the procedure's identity."]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"argtype"})})}),"\n",(0,t.jsx)(n.p,{children:"The data type(s) of the procedure's arguments (optionally schema-qualified), if any."}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"CASCADE"})})}),"\n",(0,t.jsx)(n.p,{children:"Automatically drop objects that depend on the procedure, and in turn all objects that depend on those objects."}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"RESTRICT"})})}),"\n",(0,t.jsx)(n.p,{children:"Refuse to drop the procedure if any objects depend on it. This is the default."}),"\n",(0,t.jsx)(n.h2,{id:"examples",children:"Examples"}),"\n",(0,t.jsxs)(n.p,{children:["This command removes the procedure named ",(0,t.jsx)(n.code,{children:"do_db_maintenance"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sql",children:"DROP PROCEDURE do_db_maintenance();\n"})}),"\n",(0,t.jsx)(n.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,t.jsx)(n.p,{children:"This command conforms to the SQL standard, with these Cloudberry Database extensions:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"The standard only allows one procedure to be dropped per command."}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.code,{children:"IF EXISTS"})," option."]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"The ability to specify argument modes and names."}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"see-also",children:"See also"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.a,{href:"/zh/docs/sql-stmts/create-procedure",children:"CREATE PROCEDURE"}),", ",(0,t.jsx)(n.a,{href:"/zh/docs/sql-stmts/alter-procedure",children:"ALTER PROCEDURE"})]})]})}function h(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(l,{...e})}):l(e)}},11151:(e,n,s)=>{s.d(n,{Z:()=>o,a:()=>i});var t=s(67294);const r={},d=t.createContext(r);function i(e){const n=t.useContext(d);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),t.createElement(d.Provider,{value:n},e.children)}}}]);