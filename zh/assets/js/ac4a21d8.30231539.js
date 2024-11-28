"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[3246],{69454:(e,s,r)=>{r.r(s),r.d(s,{assets:()=>a,contentTitle:()=>c,default:()=>h,frontMatter:()=>o,metadata:()=>i,toc:()=>l});var n=r(85893),t=r(11151);const o={title:"DECLARE"},c="DECLARE",i={id:"sql-stmts/declare",title:"DECLARE",description:"Defines a cursor.",source:"@site/docs/sql-stmts/declare.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/declare",permalink:"/zh/docs/sql-stmts/declare",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/declare.md",tags:[],version:"current",lastUpdatedBy:"Ed Espino",lastUpdatedAt:1732764009,formattedLastUpdatedAt:"2024\u5e7411\u670828\u65e5",frontMatter:{title:"DECLARE"},sidebar:"docsbars",previous:{title:"DEALLOCATE",permalink:"/zh/docs/sql-stmts/deallocate"},next:{title:"DELETE",permalink:"/zh/docs/sql-stmts/delete"}},a={},l=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Notes",id:"notes",level:2},{value:"Examples",id:"examples",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function d(e){const s={a:"a",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.h1,{id:"declare",children:"DECLARE"}),"\n",(0,n.jsx)(s.p,{children:"Defines a cursor."}),"\n",(0,n.jsx)(s.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"DECLARE <name> [BINARY] [INSENSITIVE] [NO SCROLL] [PARALLEL RETRIEVE] CURSOR \n\xa0\xa0\xa0\xa0\xa0[{WITH | WITHOUT} HOLD] \n\xa0\xa0\xa0\xa0\xa0FOR <query>\n"})}),"\n",(0,n.jsx)(s.h2,{id:"description",children:"Description"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"DECLARE"})," allows a user to create a cursor, which can be used to retrieve a small number of rows at a time out of a larger query. Cursors can return data using ",(0,n.jsx)(s.a,{href:"/zh/docs/sql-stmts/fetch",children:"FETCH"}),"."]}),"\n",(0,n.jsxs)(s.blockquote,{children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.strong,{children:"Note"})," This page describes usage of cursors at the SQL command level. If you are trying to use cursors inside a PL/pgSQL function, the rules are different, see PL/pgSQL."]}),"\n"]}),"\n",(0,n.jsxs)(s.p,{children:["Normal cursors return data in text format, the same as a ",(0,n.jsx)(s.code,{children:"SELECT"})," would produce. Since data is stored natively in binary format, the system must do a conversion to produce the text format. Once the information comes back in text form, the client application may need to convert it to a binary format to manipulate it. In addition, data in the text format is often larger in size than in the binary format. Binary cursors return the data in a binary representation that may be more easily manipulated. Nevertheless, if you intend to display the data as text anyway, retrieving it in text form will save you some effort on the client side."]}),"\n",(0,n.jsx)(s.p,{children:"As an example, if a query returns a value of one from an integer column, you would get a string of 1 with a default cursor whereas with a binary cursor you would get a 4-byte field containing the internal representation of the value (in big-endian byte order)."}),"\n",(0,n.jsxs)(s.p,{children:["Binary cursors should be used carefully. Many applications, including ",(0,n.jsx)(s.code,{children:"psql"}),", are not prepared to handle binary cursors and expect data to come back in the text format."]}),"\n",(0,n.jsxs)(s.blockquote,{children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.strong,{children:"Note"})," When the client application uses the 'extended query' protocol to issue a ",(0,n.jsx)(s.code,{children:"FETCH"})," command, the Bind protocol message specifies whether data is to be retrieved in text or binary format. This choice overrides the way that the cursor is defined. The concept of a binary cursor as such is thus obsolete when using extended query protocol \u2014 any cursor can be treated as either text or binary."]}),"\n"]}),"\n",(0,n.jsxs)(s.p,{children:["A cursor can be specified in the ",(0,n.jsx)(s.code,{children:"WHERE CURRENT OF"})," clause of the ",(0,n.jsx)(s.a,{href:"/zh/docs/sql-stmts/update",children:"UPDATE"})," or ",(0,n.jsx)(s.a,{href:"/zh/docs/sql-stmts/delete",children:"DELETE"})," statement to update or delete table data. The ",(0,n.jsx)(s.code,{children:"UPDATE"})," or ",(0,n.jsx)(s.code,{children:"DELETE"})," statement can only be run on the server, for example in an interactive ",(0,n.jsx)(s.code,{children:"psql"})," session or a script."]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:"Parallel Retrieve Cursors"})}),"\n",(0,n.jsxs)(s.p,{children:["Cloudberry Database supports a special type of cursor, a ",(0,n.jsx)(s.em,{children:"parallel retrieve cursor"}),". You can use a parallel retrieve cursor to retrieve query results, in parallel, directly from the Cloudberry Database segments, bypassing the Cloudberry Database coordinator."]}),"\n",(0,n.jsxs)(s.p,{children:["Parallel retrieve cursors do not support the ",(0,n.jsx)(s.code,{children:"WITH HOLD"})," clause. Cloudberry Database ignores the ",(0,n.jsx)(s.code,{children:"BINARY"})," clause when you declare a parallel retrieve cursor."]}),"\n",(0,n.jsxs)(s.p,{children:["You open a special retrieve session to each parallel retrieve cursor endpoint, and use the ",(0,n.jsx)(s.a,{href:"/zh/docs/sql-stmts/retrieve",children:"RETRIEVE"})," command to retrieve the query results from a parallel retrieve cursor."]}),"\n",(0,n.jsx)(s.h2,{id:"parameters",children:"Parameters"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"name"})})}),"\n",(0,n.jsx)(s.p,{children:"The name of the cursor to be created."}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"BINARY"})})}),"\n",(0,n.jsx)(s.p,{children:"Causes the cursor to return data in binary rather than in text format."}),"\n",(0,n.jsxs)(s.blockquote,{children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.strong,{children:"Note"})," Cloudberry Database ignores the ",(0,n.jsx)(s.code,{children:"BINARY"})," clause when you declare a ",(0,n.jsx)(s.code,{children:"PARALLEL RETRIEVE"})," cursor."]}),"\n"]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"INSENSITIVE"})})}),"\n",(0,n.jsx)(s.p,{children:"Indicates that data retrieved from the cursor should be unaffected by updates to the table(s) underlying the cursor that occur after the cursor is created. In Cloudberry Database, all cursors are insensitive. This key word currently has no effect and is present only for compatibility with the SQL standard."}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"NO SCROLL"})})}),"\n",(0,n.jsxs)(s.p,{children:["The cursor cannot be used to retrieve rows in a nonsequential fashion. This is the default behavior in Cloudberry Database; scrollable cursors (",(0,n.jsx)(s.code,{children:"SCROLL"}),") are not supported."]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"PARALLEL RETRIEVE"})})}),"\n",(0,n.jsx)(s.p,{children:"Declare a parallel retrieve cursor. A parallel retrieve cursor is a special type of cursor that you can use to retrieve results directly from Cloudberry Database segments, in parallel."}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"WITH HOLD"})}),(0,n.jsx)("br",{}),"\n",(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"WITHOUT HOLD"})})]}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"WITH HOLD"})," specifies that the cursor may continue to be used after the transaction that created it successfully commits. ",(0,n.jsx)(s.code,{children:"WITHOUT HOLD"})," specifies that the cursor cannot be used outside of the transaction that created it. ",(0,n.jsx)(s.code,{children:"WITHOUT HOLD"})," is the default."]}),"\n",(0,n.jsxs)(s.blockquote,{children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.strong,{children:"Note"})," Cloudberry Database does not support declaring a ",(0,n.jsx)(s.code,{children:"PARALLEL RETRIEVE"})," cursor with the ",(0,n.jsx)(s.code,{children:"WITH HOLD"})," clause. ",(0,n.jsx)(s.code,{children:"WITH HOLD"})," also cannot not be specified when the ",(0,n.jsx)(s.code,{children:"query"})," includes a ",(0,n.jsx)(s.code,{children:"FOR UPDATE"})," or ",(0,n.jsx)(s.code,{children:"FOR SHARE"})," clause."]}),"\n"]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"query"})})}),"\n",(0,n.jsxs)(s.p,{children:["A ",(0,n.jsx)(s.a,{href:"/zh/docs/sql-stmts/select",children:"SELECT"})," or ",(0,n.jsx)(s.a,{href:"/zh/docs/sql-stmts/values",children:"VALUES"})," command which will provide the rows to be returned by the cursor."]}),"\n",(0,n.jsxs)(s.p,{children:["If the cursor is used in the ",(0,n.jsx)(s.code,{children:"WHERE CURRENT OF"})," clause of the ",(0,n.jsx)(s.a,{href:"/zh/docs/sql-stmts/update",children:"UPDATE"})," or ",(0,n.jsx)(s.a,{href:"/zh/docs/sql-stmts/delete",children:"DELETE"})," command, the ",(0,n.jsx)(s.code,{children:"SELECT"})," command must satisfy the following conditions:"]}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["\n",(0,n.jsx)(s.p,{children:"Cannot reference a view or external table."}),"\n"]}),"\n",(0,n.jsxs)(s.li,{children:["\n",(0,n.jsx)(s.p,{children:"References only one table."}),"\n",(0,n.jsx)(s.p,{children:"The table must be a heap table, and it must not be replicated-distributed (must not be a view, external table, or append-optimized column-oriented table)."}),"\n"]}),"\n",(0,n.jsxs)(s.li,{children:["\n",(0,n.jsx)(s.p,{children:"Cannot contain any of the following:"}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"A grouping clause"}),"\n",(0,n.jsxs)(s.li,{children:["A set operation such as ",(0,n.jsx)(s.code,{children:"UNION ALL"})," or ",(0,n.jsx)(s.code,{children:"UNION DISTINCT"})]}),"\n",(0,n.jsx)(s.li,{children:"A sorting clause"}),"\n",(0,n.jsx)(s.li,{children:"A windowing clause"}),"\n",(0,n.jsx)(s.li,{children:"A join or a self-join"}),"\n"]}),"\n",(0,n.jsxs)(s.p,{children:["Specifying the ",(0,n.jsx)(s.code,{children:"FOR UPDATE"})," clause in the ",(0,n.jsx)(s.code,{children:"SELECT"})," command prevents other sessions from changing the rows between the time they are fetched and the time they are updated. Without the ",(0,n.jsx)(s.code,{children:"FOR UPDATE"})," clause, a subsequent use of the ",(0,n.jsx)(s.code,{children:"UPDATE"})," or ",(0,n.jsx)(s.code,{children:"DELETE"})," command with the ",(0,n.jsx)(s.code,{children:"WHERE CURRENT OF"})," clause has no effect if the row was changed since the cursor was created."]}),"\n",(0,n.jsxs)(s.blockquote,{children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.strong,{children:"Note"})," Specifying the ",(0,n.jsx)(s.code,{children:"FOR UPDATE"})," clause in the ",(0,n.jsx)(s.code,{children:"SELECT"})," command locks the entire table, not just the selected rows."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(s.p,{children:["The key words ",(0,n.jsx)(s.code,{children:"BINARY"}),", ",(0,n.jsx)(s.code,{children:"INSENSITIVE"}),", and ",(0,n.jsx)(s.code,{children:"NO SCROLL"})," can appear in any order."]}),"\n",(0,n.jsx)(s.h2,{id:"notes",children:"Notes"}),"\n",(0,n.jsxs)(s.p,{children:["Unless ",(0,n.jsx)(s.code,{children:"WITH HOLD"})," is specified, the cursor created by this command can only be used within the current transaction. Thus, ",(0,n.jsx)(s.code,{children:"DECLARE"})," without ",(0,n.jsx)(s.code,{children:"WITH HOLD"})," is useless outside a transaction block: the cursor would survive only to the completion of the statement. Therefore Cloudberry Database reports an error if this command is used outside a transaction block. Use ",(0,n.jsx)(s.code,{children:"BEGIN"})," and ",(0,n.jsx)(s.code,{children:"COMMIT"})," (or ",(0,n.jsx)(s.code,{children:"ROLLBACK"}),") to define a transaction block."]}),"\n",(0,n.jsxs)(s.p,{children:["If ",(0,n.jsx)(s.code,{children:"WITH HOLD"})," is specified and the transaction that created the cursor successfully commits, the cursor can continue to be accessed by subsequent transactions in the same session. (But if the creating transaction ends prematurely, the cursor is removed.) A cursor created with ",(0,n.jsx)(s.code,{children:"WITH HOLD"})," is closed when an explicit ",(0,n.jsx)(s.code,{children:"CLOSE"})," command is issued on it, or the session ends. In the current implementation, the rows represented by a held cursor are copied into a temporary file or memory area so that they remain available for subsequent transactions."]}),"\n",(0,n.jsxs)(s.p,{children:["If you create a cursor with the ",(0,n.jsx)(s.code,{children:"DECLARE"})," command in a transaction, you cannot use the ",(0,n.jsx)(s.code,{children:"SET"})," command in the transaction until you close the cursor with the ",(0,n.jsx)(s.code,{children:"CLOSE"})," command."]}),"\n",(0,n.jsxs)(s.p,{children:["Scrollable cursors are not currently supported in Cloudberry Database. You can only use ",(0,n.jsx)(s.code,{children:"FETCH"})," or ",(0,n.jsx)(s.code,{children:"RETRIEVE"})," to move the cursor position forward, not backwards."]}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"DECLARE...FOR UPDATE"})," is not supported with append-optimized tables."]}),"\n",(0,n.jsxs)(s.p,{children:["You can see all available cursors by querying the ",(0,n.jsx)(s.code,{children:"pg_cursors"})," system view."]}),"\n",(0,n.jsx)(s.h2,{id:"examples",children:"Examples"}),"\n",(0,n.jsx)(s.p,{children:"Declare a cursor:"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"DECLARE mycursor CURSOR FOR SELECT * FROM mytable;\n"})}),"\n",(0,n.jsx)(s.p,{children:"Declare a parallel retrieve cursor for the same query:"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"DECLARE myprcursor PARALLEL RETRIEVE CURSOR FOR SELECT * FROM mytable;\n"})}),"\n",(0,n.jsx)(s.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,n.jsx)(s.p,{children:"SQL standard allows cursors only in embedded SQL and in modules. Cloudberry Database permits cursors to be used interactively."}),"\n",(0,n.jsxs)(s.p,{children:["Cloudberry Database does not implement an ",(0,n.jsx)(s.code,{children:"OPEN"})," statement for cursors. A cursor is considered to be open when it is declared."]}),"\n",(0,n.jsx)(s.p,{children:"The SQL standard allows cursors to move both forward and backward. All Cloudberry Database cursors are forward moving only (not scrollable)."}),"\n",(0,n.jsx)(s.p,{children:"Binary cursors are a Cloudberry Database extension."}),"\n",(0,n.jsx)(s.p,{children:"The SQL standard makes no provisions for parallel retrieve cursors."}),"\n",(0,n.jsx)(s.h2,{id:"see-also",children:"See also"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.a,{href:"/zh/docs/sql-stmts/close",children:"CLOSE"}),", ",(0,n.jsx)(s.a,{href:"/zh/docs/sql-stmts/delete",children:"DELETE"}),", ",(0,n.jsx)(s.a,{href:"/zh/docs/sql-stmts/fetch",children:"FETCH"}),", ",(0,n.jsx)(s.a,{href:"/zh/docs/sql-stmts/move",children:"MOVE"}),", ",(0,n.jsx)(s.a,{href:"/zh/docs/sql-stmts/retrieve",children:"RETRIEVE"}),", ",(0,n.jsx)(s.a,{href:"/zh/docs/sql-stmts/select",children:"SELECT"}),", ",(0,n.jsx)(s.a,{href:"/zh/docs/sql-stmts/update",children:"UPDATE"})]})]})}function h(e={}){const{wrapper:s}={...(0,t.a)(),...e.components};return s?(0,n.jsx)(s,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}},11151:(e,s,r)=>{r.d(s,{Z:()=>i,a:()=>c});var n=r(67294);const t={},o=n.createContext(t);function c(e){const s=n.useContext(o);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function i(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:c(e.components),n.createElement(o.Provider,{value:s},e.children)}}}]);