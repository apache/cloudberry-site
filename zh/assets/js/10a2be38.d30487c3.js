"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[5495],{83041:(e,s,t)=>{t.r(s),t.d(s,{assets:()=>c,contentTitle:()=>l,default:()=>h,frontMatter:()=>r,metadata:()=>a,toc:()=>o});var n=t(85893),i=t(11151);const r={title:"SELECT INTO"},l="SELECT INTO",a={id:"sql-stmts/select-into",title:"SELECT INTO",description:"Defines a new table from the results of a query.",source:"@site/docs/sql-stmts/select-into.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/select-into",permalink:"/zh/docs/sql-stmts/select-into",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/select-into.md",tags:[],version:"current",lastUpdatedBy:"vitalzf",lastUpdatedAt:1733108055,formattedLastUpdatedAt:"2024\u5e7412\u67082\u65e5",frontMatter:{title:"SELECT INTO"},sidebar:"docsbars",previous:{title:"SAVEPOINT",permalink:"/zh/docs/sql-stmts/savepoint"},next:{title:"SELECT",permalink:"/zh/docs/sql-stmts/select"}},c={},o=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Notes",id:"notes",level:2},{value:"Examples",id:"examples",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function d(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,i.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.h1,{id:"select-into",children:"SELECT INTO"}),"\n",(0,n.jsx)(s.p,{children:"Defines a new table from the results of a query."}),"\n",(0,n.jsx)(s.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"[ WITH [ RECURSIVE ] <with_query> [, ...] ]\nSELECT [ALL | DISTINCT [ON ( <expression> [, ...] )]]\n    * | <expression> [ [AS] <output_name> ] [, ...]\n    INTO [TEMPORARY | TEMP | UNLOGGED ] [TABLE] <new_table>\n    [FROM <from_item> [, ...]]\n    [WHERE <condition>]\n    [GROUP BY <expression> [, ...]]\n    [HAVING <condition> [, ...]]\n    [WINDOW <window_name> AS ( <window_definition> ) [, ...]]\n    [{UNION | INTERSECT | EXCEPT} [ALL | DISTINCT ] <select>]\n    [ORDER BY <expression> [ASC | DESC | USING <operator>] [NULLS {FIRST | LAST}] [, ...]]\n    [LIMIT {<count> | ALL}]\n    [OFFSET <start> [ ROW | ROWS ] ]\n    [FETCH { FIRST | NEXT } [ <count> ] { ROW | ROWS } ONLY ]\n    [FOR {UPDATE | SHARE} [OF <table_name> [, ...]] [NOWAIT] [...]]\n"})}),"\n",(0,n.jsx)(s.h2,{id:"description",children:"Description"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"SELECT INTO"})," creates a new table and fills it with data computed by a query. The data is not returned to the client, as it is with a normal ",(0,n.jsx)(s.code,{children:"SELECT"}),". The new table's columns have the names and data types associated with the output columns of the ",(0,n.jsx)(s.code,{children:"SELECT"}),"."]}),"\n",(0,n.jsx)(s.h2,{id:"parameters",children:"Parameters"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"TEMPORARY"})}),(0,n.jsx)("br",{}),"\n",(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"TEMP"})})]}),"\n",(0,n.jsxs)(s.p,{children:["If specified, the table is created as a temporary table. Refer to ",(0,n.jsx)(s.a,{href:"/zh/docs/sql-stmts/create-table",children:"CREATE TABLE"})," for details."]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"UNLOGGED"})})}),"\n",(0,n.jsxs)(s.p,{children:["If specified, the table is created as an unlogged table. Refer to ",(0,n.jsx)(s.a,{href:"/zh/docs/sql-stmts/create-table",children:"CREATE TABLE"})," for details."]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"new_table"})})}),"\n",(0,n.jsx)(s.p,{children:"The name (optionally schema-qualified) of the table to be created."}),"\n",(0,n.jsxs)(s.p,{children:["All other parameters for ",(0,n.jsx)(s.code,{children:"SELECT INTO"})," are described in detail on the ",(0,n.jsx)(s.a,{href:"/zh/docs/sql-stmts/select",children:"SELECT"})," reference page."]}),"\n",(0,n.jsx)(s.h2,{id:"notes",children:"Notes"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.a,{href:"/zh/docs/sql-stmts/create-table-as",children:"CREATE TABLE AS"})," is functionally similar to ",(0,n.jsx)(s.code,{children:"SELECT INTO"}),". ",(0,n.jsx)(s.code,{children:"CREATE TABLE AS"})," is the recommended syntax, since this form of ",(0,n.jsx)(s.code,{children:"SELECT INTO"})," is not available in ECPG or PL/pgSQL, because they interpret the ",(0,n.jsx)(s.code,{children:"INTO"})," clause differently. Also, ",(0,n.jsx)(s.code,{children:"CREATE TABLE AS"})," offers a superset of the functionality provided by ",(0,n.jsx)(s.code,{children:"SELECT INTO"}),"."]}),"\n",(0,n.jsxs)(s.p,{children:["In contrast to ",(0,n.jsx)(s.code,{children:"CREATE TABLE AS"}),", ",(0,n.jsx)(s.code,{children:"SELECT INTO"})," does not allow specifying properties like a table's access method with ",(0,n.jsx)(s.code,{children:"USING <method>"})," or the table's tablespace with ",(0,n.jsx)(s.code,{children:"TABLESPACE <tablespace_name>"}),". Use ",(0,n.jsx)(s.a,{href:"/zh/docs/sql-stmts/create-table-as",children:"CREATE TABLE AS"})," if necessary. Therefore, the default table access method is chosen for the new table."]}),"\n",(0,n.jsx)(s.h2,{id:"examples",children:"Examples"}),"\n",(0,n.jsxs)(s.p,{children:["Create a new table ",(0,n.jsx)(s.code,{children:"films_recent"})," consisting only of recent entries from the table ",(0,n.jsx)(s.code,{children:"films"}),":"]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"SELECT * INTO films_recent FROM films WHERE date_prod >= '2016-01-01';\n"})}),"\n",(0,n.jsx)(s.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,n.jsxs)(s.p,{children:["The SQL standard uses ",(0,n.jsx)(s.code,{children:"SELECT INTO"})," to represent selecting values into scalar variables of a host program, rather than creating a new table. The Cloudberry Database usage of ",(0,n.jsx)(s.code,{children:"SELECT INTO"})," to represent table creation is historical. It is best to use ",(0,n.jsx)(s.a,{href:"/zh/docs/sql-stmts/create-table-as",children:"CREATE TABLE AS"})," for this purpose in new applications."]}),"\n",(0,n.jsx)(s.h2,{id:"see-also",children:"See also"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.a,{href:"/zh/docs/sql-stmts/select",children:"SELECT"}),", ",(0,n.jsx)(s.a,{href:"/zh/docs/sql-stmts/create-table-as",children:"CREATE TABLE AS"})]})]})}function h(e={}){const{wrapper:s}={...(0,i.a)(),...e.components};return s?(0,n.jsx)(s,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}},11151:(e,s,t)=>{t.d(s,{Z:()=>a,a:()=>l});var n=t(67294);const i={},r=n.createContext(i);function l(e){const s=n.useContext(r);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function a(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:l(e.components),n.createElement(r.Provider,{value:s},e.children)}}}]);