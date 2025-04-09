"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[3742],{45725:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>c,contentTitle:()=>r,default:()=>h,frontMatter:()=>a,metadata:()=>l,toc:()=>o});var n=s(85893),i=s(11151);const a={title:"TRUNCATE"},r="TRUNCATE",l={id:"sql-stmts/truncate",title:"TRUNCATE",description:"Empties a table or set of tables of all rows.",source:"@site/docs/sql-stmts/truncate.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/truncate",permalink:"/zh/docs/sql-stmts/truncate",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/truncate.md",tags:[],version:"current",lastUpdatedBy:"dependabot[bot]",lastUpdatedAt:1744180221,formattedLastUpdatedAt:"2025\u5e744\u67089\u65e5",frontMatter:{title:"TRUNCATE"},sidebar:"docsbars",previous:{title:"START TRANSACTION",permalink:"/zh/docs/sql-stmts/start-transaction"},next:{title:"UNLISTEN",permalink:"/zh/docs/sql-stmts/unlisten"}},c={},o=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Notes",id:"notes",level:2},{value:"Examples",id:"examples",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function d(e){const t={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,i.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h1,{id:"truncate",children:"TRUNCATE"}),"\n",(0,n.jsx)(t.p,{children:"Empties a table or set of tables of all rows."}),"\n",(0,n.jsx)(t.admonition,{type:"info",children:(0,n.jsxs)(t.p,{children:["Apache Cloudberry does not enforce referential integrity syntax (foreign key constraints). ",(0,n.jsx)(t.code,{children:"TRUNCATE"})," truncates a table that is referenced in a foreign key constraint even if the ",(0,n.jsx)(t.code,{children:"CASCADE"})," option is omitted."]})}),"\n",(0,n.jsx)(t.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-sql",children:"TRUNCATE [TABLE] [ONLY] <name> [ * ] [, ...] \n    [ RESTART IDENTITY | CONTINUE IDENTITY ] [CASCADE | RESTRICT]\n"})}),"\n",(0,n.jsx)(t.h2,{id:"description",children:"Description"}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.code,{children:"TRUNCATE"})," quickly removes all rows from a table or set of tables. It has the same effect as an unqualified ",(0,n.jsx)(t.a,{href:"/zh/docs/sql-stmts/delete",children:(0,n.jsx)(t.code,{children:"DELETE"})})," on each table, but since it does not actually scan the tables it is faster. Furthermore, it reclaims disk space immediately, rather than requiring a subsequent ",(0,n.jsx)(t.a,{href:"/zh/docs/sql-stmts/vacuum",children:(0,n.jsx)(t.code,{children:"VACUUM"})})," operation. This is most useful on large tables."]}),"\n",(0,n.jsxs)(t.p,{children:["You must have the ",(0,n.jsx)(t.code,{children:"TRUNCATE"})," privilege on the table to truncate it."]}),"\n",(0,n.jsx)(t.h2,{id:"parameters",children:"Parameters"}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.strong,{children:(0,n.jsx)(t.code,{children:"name"})})}),"\n",(0,n.jsxs)(t.p,{children:["The name (optionally schema-qualified) of a table to truncate. If ",(0,n.jsx)(t.code,{children:"ONLY"})," is specified before the table name, only that table is truncated. If ",(0,n.jsx)(t.code,{children:"ONLY"})," is not specified, the table and all its descendant tables (if any) are truncated. Optionally, you can specify ",(0,n.jsx)(t.code,{children:"*"})," after the table name to explicitly indicate that descendant tables are included."]}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.strong,{children:(0,n.jsx)(t.code,{children:"RESTART IDENTITY"})})}),"\n",(0,n.jsx)(t.p,{children:"Automatically restart sequences owned by columns of the truncated table(s)."}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.strong,{children:(0,n.jsx)(t.code,{children:"CONTINUE IDENTITY"})})}),"\n",(0,n.jsx)(t.p,{children:"Do not change the values of sequences. This is the default."}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.strong,{children:(0,n.jsx)(t.code,{children:"CASCADE"})})}),"\n",(0,n.jsx)(t.p,{children:"Because this key word applies to foreign key references (which are not supported in Apache Cloudberry) it has no effect."}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.strong,{children:(0,n.jsx)(t.code,{children:"RESTRICT"})})}),"\n",(0,n.jsx)(t.p,{children:"Because this key word applies to foreign key references (which are not supported in Apache Cloudberry) it has no effect."}),"\n",(0,n.jsx)(t.h2,{id:"notes",children:"Notes"}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.code,{children:"TRUNCATE"})," acquires an ",(0,n.jsx)(t.code,{children:"ACCESS EXCLUSIVE"})," lock on each table that it operates on, which blocks all other concurrent operations on the table. When ",(0,n.jsx)(t.code,{children:"RESTART IDENTITY"})," is specified, any sequences that are to be restarted are likewise locked exclusively. If you require concurrent access to a table, use the ",(0,n.jsx)(t.code,{children:"DELETE"})," command instead."]}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.code,{children:"TRUNCATE"})," will not fire any user-defined ",(0,n.jsx)(t.code,{children:"ON DELETE"})," triggers that might exist for the tables."]}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.code,{children:"TRUNCATE"})," will not truncate any tables that inherit from the named table. Only the named table is truncated, not its child tables."]}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.code,{children:"TRUNCATE"})," is not MVCC-safe. After truncation, the table will appear empty to concurrent transactions, if they are using a snapshot taken before the truncation occurred."]}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.code,{children:"TRUNCATE"})," is transaction-safe with respect to the data in the tables: the truncation will be safely rolled back if the surrounding transaction does not commit."]}),"\n",(0,n.jsxs)(t.p,{children:["When ",(0,n.jsx)(t.code,{children:"RESTART IDENTITY"})," is specified, the implied ",(0,n.jsx)(t.code,{children:"ALTER SEQUENCE RESTART"})," operations are also done transactionally; that is, they will be rolled back if the surrounding transaction does not commit. Be aware that if any additional sequence operations are done on the restarted sequences before the transaction rolls back, the effects of these operations on the sequences will be rolled back."]}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.code,{children:"TRUNCATE"})," is not currently supported for foreign tables. This implies that if a specified table has any descendant tables that are foreign, the command will fail."]}),"\n",(0,n.jsx)(t.h2,{id:"examples",children:"Examples"}),"\n",(0,n.jsxs)(t.p,{children:["Empty the tables ",(0,n.jsx)(t.code,{children:"films"})," and ",(0,n.jsx)(t.code,{children:"distributors"}),":"]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-sql",children:"TRUNCATE films, distributors;\n"})}),"\n",(0,n.jsx)(t.p,{children:"The same, and also reset any associated sequence generators:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-sql",children:"TRUNCATE films, distributors RESTART IDENTITY;\n"})}),"\n",(0,n.jsx)(t.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,n.jsxs)(t.p,{children:["The SQL:2008 standard includes a ",(0,n.jsx)(t.code,{children:"TRUNCATE"})," command with the syntax ",(0,n.jsx)(t.code,{children:"TRUNCATE TABLE tablename"}),". The clauses ",(0,n.jsx)(t.code,{children:"CONTINUE IDENTITY"}),"/",(0,n.jsx)(t.code,{children:"RESTART IDENTITY"})," also appear in that standard, but have slightly different though related meanings. Some of the concurrency behavior of this command is left implementation-defined by the standard, so the above notes should be considered and compared with other implementations if necessary."]}),"\n",(0,n.jsx)(t.h2,{id:"see-also",children:"See also"}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.a,{href:"/zh/docs/sql-stmts/delete",children:(0,n.jsx)(t.code,{children:"DELETE"})})})]})}function h(e={}){const{wrapper:t}={...(0,i.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}},11151:(e,t,s)=>{s.d(t,{Z:()=>l,a:()=>r});var n=s(67294);const i={},a=n.createContext(i);function r(e){const t=n.useContext(a);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),n.createElement(a.Provider,{value:t},e.children)}}}]);