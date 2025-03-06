"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[6405],{14758:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>d,contentTitle:()=>r,default:()=>h,frontMatter:()=>o,metadata:()=>c,toc:()=>a});var i=s(85893),t=s(11151);const o={title:"CREATE CONVERSION"},r="CREATE CONVERSION",c={id:"sql-stmts/create-conversion",title:"CREATE CONVERSION",description:"Defines a new encoding conversion.",source:"@site/docs/sql-stmts/create-conversion.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/create-conversion",permalink:"/zh/docs/sql-stmts/create-conversion",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/create-conversion.md",tags:[],version:"current",lastUpdatedBy:"Dianjin Wang",lastUpdatedAt:1741230918,formattedLastUpdatedAt:"2025\u5e743\u67086\u65e5",frontMatter:{title:"CREATE CONVERSION"},sidebar:"docsbars",previous:{title:"CREATE COLLATION",permalink:"/zh/docs/sql-stmts/create-collation"},next:{title:"CREATE DATABASE",permalink:"/zh/docs/sql-stmts/create-database"}},d={},a=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Notes",id:"notes",level:2},{value:"Examples",id:"examples",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function l(e){const n={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,t.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"create-conversion",children:"CREATE CONVERSION"}),"\n",(0,i.jsx)(n.p,{children:"Defines a new encoding conversion."}),"\n",(0,i.jsx)(n.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sql",children:"CREATE [DEFAULT] CONVERSION <name>\n     FOR <source_encoding> TO <dest_encoding> FROM <function_name>\n"})}),"\n",(0,i.jsx)(n.h2,{id:"description",children:"Description"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"CREATE CONVERSION"})," defines a new conversion between character set encodings. Also, conversions that are marked ",(0,i.jsx)(n.code,{children:"DEFAULT"})," can be used for automatic encoding conversion between client and server. For this purpose, two conversions, from encoding A to B ",(0,i.jsx)(n.em,{children:"and"})," from encoding B to A, must be defined."]}),"\n",(0,i.jsxs)(n.p,{children:["To create a conversion, you must have ",(0,i.jsx)(n.code,{children:"EXECUTE"})," privilege on the function and ",(0,i.jsx)(n.code,{children:"CREATE"})," privilege on the destination schema."]}),"\n",(0,i.jsx)(n.h2,{id:"parameters",children:"Parameters"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"DEFAULT"})})}),"\n",(0,i.jsx)(n.p,{children:"Indicates that this conversion is the default for this particular source to destination encoding. There should be only one default encoding in a schema for the encoding pair."}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"name"})})}),"\n",(0,i.jsx)(n.p,{children:"The name of the conversion. The conversion name may be schema-qualified. If it is not, the conversion is defined in the current schema. The conversion name must be unique within a schema."}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"source_encoding"})})}),"\n",(0,i.jsx)(n.p,{children:"The source encoding name."}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"dest_encoding"})})}),"\n",(0,i.jsx)(n.p,{children:"The destination encoding name."}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"function_name"})})}),"\n",(0,i.jsx)(n.p,{children:"The function used to perform the conversion. The function name may be schema-qualified. If it is not, the function will be looked up in the path. The function must have the following signature:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sql",children:"conv_proc(\n    integer,  -- source encoding ID\n    integer,  -- destination encoding ID\n    cstring,  -- source string (null terminated C string)\n    internal, -- destination (fill with a null terminated C string)\n    integer   -- source string length\n) RETURNS void;\n"})}),"\n",(0,i.jsx)(n.h2,{id:"notes",children:"Notes"}),"\n",(0,i.jsxs)(n.p,{children:["Use ",(0,i.jsx)(n.a,{href:"/zh/docs/sql-stmts/drop-conversion",children:"DROP CONVERSION"})," to remove a user-defined conversion."]}),"\n",(0,i.jsx)(n.p,{children:"The privileges required to create a conversion might change in a feature release."}),"\n",(0,i.jsxs)(n.p,{children:["Note that in this release of Apache Cloudberry, user-defined functions used in a user-defined conversion must be defined as ",(0,i.jsx)(n.code,{children:"IMMUTABLE"}),". Any compiled code (shared library files) for custom functions must be placed in the same location on every host in your Apache Cloudberry array (coordinator and all segments). This location must also be in the ",(0,i.jsx)(n.code,{children:"LD_LIBRARY_PATH"})," so that the server can locate the files."]}),"\n",(0,i.jsx)(n.h2,{id:"examples",children:"Examples"}),"\n",(0,i.jsxs)(n.p,{children:["To create a conversion from encoding ",(0,i.jsx)(n.code,{children:"UTF8"})," to ",(0,i.jsx)(n.code,{children:"LATIN1"})," using ",(0,i.jsx)(n.code,{children:"myfunc"}),":"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sql",children:"CREATE CONVERSION myconv FOR 'UTF8' TO 'LATIN1' FROM myfunc;\n"})}),"\n",(0,i.jsx)(n.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"CREATE CONVERSION"})," is a Apache Cloudberry extension. There is no ",(0,i.jsx)(n.code,{children:"CREATE CONVERSION"})," statement in the SQL standard, but there is a ",(0,i.jsx)(n.code,{children:"CREATE TRANSLATION"})," statement that is very similar in purpose and syntax."]}),"\n",(0,i.jsx)(n.h2,{id:"see-also",children:"See also"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"/zh/docs/sql-stmts/alter-conversion",children:"ALTER CONVERSION"}),", ",(0,i.jsx)(n.a,{href:"/zh/docs/sql-stmts/create-function",children:"CREATE FUNCTION"}),", ",(0,i.jsx)(n.a,{href:"/zh/docs/sql-stmts/drop-conversion",children:"DROP CONVERSION"})]})]})}function h(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(l,{...e})}):l(e)}},11151:(e,n,s)=>{s.d(n,{Z:()=>c,a:()=>r});var i=s(67294);const t={},o=i.createContext(t);function r(e){const n=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:r(e.components),i.createElement(o.Provider,{value:n},e.children)}}}]);