"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[2544],{90045:(e,s,r)=>{r.r(s),r.d(s,{assets:()=>d,contentTitle:()=>i,default:()=>a,frontMatter:()=>o,metadata:()=>c,toc:()=>l});var n=r(85893),t=r(11151);const o={title:"FETCH"},i="FETCH",c={id:"sql-stmts/fetch",title:"FETCH",description:"Retrieves rows from a query using a cursor.",source:"@site/docs/sql-stmts/fetch.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/fetch",permalink:"/docs/sql-stmts/fetch",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/fetch.md",tags:[],version:"current",lastUpdatedBy:"Dianjin Wang",lastUpdatedAt:1733912691,formattedLastUpdatedAt:"Dec 11, 2024",frontMatter:{title:"FETCH"},sidebar:"docsbars",previous:{title:"EXPLAIN",permalink:"/docs/sql-stmts/explain"},next:{title:"GRANT",permalink:"/docs/sql-stmts/grant"}},d={},l=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Outputs",id:"outputs",level:2},{value:"Notes",id:"notes",level:2},{value:"Examples",id:"examples",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function h(e){const s={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,t.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.h1,{id:"fetch",children:"FETCH"}),"\n",(0,n.jsx)(s.p,{children:"Retrieves rows from a query using a cursor."}),"\n",(0,n.jsx)(s.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"FETCH [ <forward_direction> { FROM | IN } ] <cursor_name>\n"})}),"\n",(0,n.jsxs)(s.p,{children:["where ",(0,n.jsx)(s.code,{children:"<forward_direction>"})," can be empty or one of:"]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"\xa0\xa0\xa0\xa0NEXT\n\xa0\xa0\xa0\xa0FIRST\n\xa0\xa0\xa0\xa0ABSOLUTE <count>\n\xa0\xa0\xa0\xa0RELATIVE <count>\n\xa0\xa0\xa0\xa0<count>\n\xa0\xa0\xa0\xa0ALL\n\xa0\xa0\xa0\xa0FORWARD\n\xa0\xa0\xa0\xa0FORWARD <count>\n\xa0\xa0\xa0\xa0FORWARD ALL\n"})}),"\n",(0,n.jsx)(s.h2,{id:"description",children:"Description"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"FETCH"})," retrieves rows using a previously-created cursor."]}),"\n",(0,n.jsxs)(s.blockquote,{children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.strong,{children:"Note"})," You cannot ",(0,n.jsx)(s.code,{children:"FETCH"})," from a ",(0,n.jsx)(s.code,{children:"PARALLEL RETRIEVE CURSOR"}),", you must ",(0,n.jsx)(s.a,{href:"/docs/sql-stmts/retrieve",children:(0,n.jsx)(s.code,{children:"RETRIEVE"})})," the rows from it."]}),"\n"]}),"\n",(0,n.jsxs)(s.p,{children:["A cursor has an associated position, which is used by ",(0,n.jsx)(s.code,{children:"FETCH"}),". The cursor position can be before the first row of the query result, on any particular row of the result, or after the last row of the result. When created, a cursor is positioned before the first row. After fetching some rows, the cursor is positioned on the row most recently retrieved. If ",(0,n.jsx)(s.code,{children:"FETCH"})," runs off the end of the available rows then the cursor is left positioned after the last row. ",(0,n.jsx)(s.code,{children:"FETCH ALL"})," will always leave the cursor positioned after the last row."]}),"\n",(0,n.jsxs)(s.blockquote,{children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.strong,{children:"Note"}),"\nBecause Cloudberry Database does not support scrollable cursors, it is not possible to move a cursor position backwards. You can only move a cursor forward in position using ",(0,n.jsx)(s.code,{children:"FETCH"}),"."]}),"\n"]}),"\n",(0,n.jsxs)(s.p,{children:["The forms ",(0,n.jsx)(s.code,{children:"NEXT"}),", ",(0,n.jsx)(s.code,{children:"FIRST"}),", ",(0,n.jsx)(s.code,{children:"ABSOLUTE"}),", ",(0,n.jsx)(s.code,{children:"RELATIVE"})," fetch a single row after moving the cursor appropriately. If there is no such row, an empty result is returned, and the cursor is left positioned before the first row or after the last row as appropriate."]}),"\n",(0,n.jsxs)(s.p,{children:["The forms using ",(0,n.jsx)(s.code,{children:"FORWARD"})," retrieve the indicated number of rows moving in the forward direction, leaving the cursor positioned on the last-returned row (or after all rows, if the count exceeds the number of rows available)."]}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"RELATIVE 0"})," and ",(0,n.jsx)(s.code,{children:"FORWARD 0"})," request fetching the current row without moving the cursor, that is, re-fetching the most recently fetched row. This will succeed unless the cursor is positioned before the first row or after the last row, in which case no row is returned."]}),"\n",(0,n.jsxs)(s.blockquote,{children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.strong,{children:"Note"}),"\nThis page describes usage of cursors at the SQL command level. If you are trying to use cursors inside a PL/pgSQL function, the rules are different."]}),"\n"]}),"\n",(0,n.jsx)(s.h2,{id:"parameters",children:"Parameters"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"forward_direction"})})}),"\n",(0,n.jsx)(s.p,{children:"Defines the fetch direction and number of rows to fetch. Only forward fetches are allowed in Cloudberry Database. It can be one of the following:"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"NEXT"})})}),"\n",(0,n.jsx)(s.p,{children:"Fetch the next row. This is the default if direction is omitted."}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"FIRST"})})}),"\n",(0,n.jsxs)(s.p,{children:["Fetch the first row of the query (same as ",(0,n.jsx)(s.code,{children:"ABSOLUTE 1"}),"). Only allowed if it is the first ",(0,n.jsx)(s.code,{children:"FETCH"})," operation using this cursor."]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"ABSOLUTE count"})})}),"\n",(0,n.jsx)(s.p,{children:"Fetch the specified row of the query. Position after last row if count is out of range. Only allowed if the row specified by count moves the cursor position forward."}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"RELATIVE count"})})}),"\n",(0,n.jsxs)(s.p,{children:["Fetch the specified row of the query count rows ahead of the current cursor position. ",(0,n.jsx)(s.code,{children:"RELATIVE 0"})," re-fetches the current row, if any. Only allowed if count moves the cursor position forward."]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"count"})})}),"\n",(0,n.jsxs)(s.p,{children:["Fetch the next count number of rows (same as ",(0,n.jsx)(s.code,{children:"FORWARD count"}),")."]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"ALL"})})}),"\n",(0,n.jsxs)(s.p,{children:["Fetch all remaining rows (same as ",(0,n.jsx)(s.code,{children:"FORWARD ALL"}),")."]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"FORWARD"})})}),"\n",(0,n.jsxs)(s.p,{children:["Fetch the next row (same as ",(0,n.jsx)(s.code,{children:"NEXT"}),")."]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"FORWARD count"})})}),"\n",(0,n.jsxs)(s.p,{children:["Fetch the next count number of rows. ",(0,n.jsx)(s.code,{children:"FORWARD 0"})," re-fetches the current row."]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"FORWARD ALL"})})}),"\n",(0,n.jsx)(s.p,{children:"Fetch all remaining rows."}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"cursor_name"})})}),"\n",(0,n.jsx)(s.p,{children:"The name of an open cursor."}),"\n",(0,n.jsx)(s.h2,{id:"outputs",children:"Outputs"}),"\n",(0,n.jsxs)(s.p,{children:["On successful completion, a ",(0,n.jsx)(s.code,{children:"FETCH"})," command returns a command tag of the form"]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"FETCH <count>\n"})}),"\n",(0,n.jsxs)(s.p,{children:["The count is the number of rows fetched (possibly zero). Note that in ",(0,n.jsx)(s.code,{children:"psql"}),", the command tag will not actually be displayed, since ",(0,n.jsx)(s.code,{children:"psql"})," displays the fetched rows instead."]}),"\n",(0,n.jsx)(s.h2,{id:"notes",children:"Notes"}),"\n",(0,n.jsxs)(s.p,{children:["Cloudberry Database does not support scrollable cursors, so you can only use ",(0,n.jsx)(s.code,{children:"FETCH"})," to move the cursor position forward."]}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"ABSOLUTE"})," fetches are not any faster than navigating to the desired row with a relative move: the underlying implementation must traverse all the intermediate rows anyway."]}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"DECLARE"})," is used to define a cursor. Use ",(0,n.jsx)(s.code,{children:"MOVE"})," to change cursor position without retrieving data."]}),"\n",(0,n.jsx)(s.h2,{id:"examples",children:"Examples"}),"\n",(0,n.jsx)(s.p,{children:"Start the transaction:"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"BEGIN;\n"})}),"\n",(0,n.jsx)(s.p,{children:"Set up a cursor:"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"DECLARE mycursor CURSOR FOR SELECT * FROM films;\n"})}),"\n",(0,n.jsxs)(s.p,{children:["Fetch the first 5 rows in the cursor ",(0,n.jsx)(s.code,{children:"mycursor"}),":"]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"FETCH FORWARD 5 FROM mycursor;\n code  |          title          | did | date_prod  |   kind   |  len\n-------+-------------------------+-----+------------+----------+-------\n BL101 | The Third Man           | 101 | 1949-12-23 | Drama    | 01:44\n BL102 | The African Queen       | 101 | 1951-08-11 | Romantic | 01:43\n JL201 | Une Femme est une Femme | 102 | 1961-03-12 | Romantic | 01:25\n P_301 | Vertigo                 | 103 | 1958-11-14 | Action   | 02:08\n P_302 | Becket                  | 103 | 1964-02-03 | Drama    | 02:28\n"})}),"\n",(0,n.jsx)(s.p,{children:"Close the cursor and end the transaction:"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"CLOSE mycursor;\nCOMMIT;\n"})}),"\n",(0,n.jsxs)(s.p,{children:["Change the ",(0,n.jsx)(s.code,{children:"kind"})," column of the table ",(0,n.jsx)(s.code,{children:"films"})," in the row at the ",(0,n.jsx)(s.code,{children:"c_films"})," cursor's current position:"]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"UPDATE films SET kind = 'Dramatic' WHERE CURRENT OF c_films;\n"})}),"\n",(0,n.jsx)(s.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,n.jsx)(s.p,{children:"SQL standard allows cursors only in embedded SQL and in modules. Cloudberry Database permits cursors to be used interactively."}),"\n",(0,n.jsxs)(s.p,{children:["The variant of ",(0,n.jsx)(s.code,{children:"FETCH"})," described here returns the data as if it were a ",(0,n.jsx)(s.code,{children:"SELECT"})," result rather than placing it in host variables. Other than this point, ",(0,n.jsx)(s.code,{children:"FETCH"})," is fully upward-compatible with the SQL standard."]}),"\n",(0,n.jsxs)(s.p,{children:["The ",(0,n.jsx)(s.code,{children:"FETCH"})," forms involving ",(0,n.jsx)(s.code,{children:"FORWARD"}),", as well as the forms ",(0,n.jsx)(s.code,{children:"FETCH"})," count and ",(0,n.jsx)(s.code,{children:"FETCH ALL"}),", in which ",(0,n.jsx)(s.code,{children:"FORWARD"})," is implicit, are Cloudberry Database extensions. ",(0,n.jsx)(s.code,{children:"BACKWARD"})," is not supported."]}),"\n",(0,n.jsxs)(s.p,{children:["The SQL standard allows only ",(0,n.jsx)(s.code,{children:"FROM"})," preceding the cursor name; the option to use ",(0,n.jsx)(s.code,{children:"IN"}),", or to leave them out altogether, is an extension."]}),"\n",(0,n.jsx)(s.h2,{id:"see-also",children:"See also"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.a,{href:"/docs/sql-stmts/declare",children:"DECLARE"}),", ",(0,n.jsx)(s.a,{href:"/docs/sql-stmts/close",children:"CLOSE"}),", ",(0,n.jsx)(s.a,{href:"/docs/sql-stmts/move",children:"MOVE"})]})]})}function a(e={}){const{wrapper:s}={...(0,t.a)(),...e.components};return s?(0,n.jsx)(s,{...e,children:(0,n.jsx)(h,{...e})}):h(e)}},11151:(e,s,r)=>{r.d(s,{Z:()=>c,a:()=>i});var n=r(67294);const t={},o=n.createContext(t);function i(e){const s=n.useContext(o);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function c(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:i(e.components),n.createElement(o.Provider,{value:s},e.children)}}}]);