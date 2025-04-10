"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[3402],{27498:(e,s,r)=>{r.r(s),r.d(s,{assets:()=>c,contentTitle:()=>o,default:()=>h,frontMatter:()=>i,metadata:()=>l,toc:()=>a});var n=r(85893),t=r(11151);const i={title:"RETRIEVE"},o="RETRIEVE",l={id:"sql-stmts/retrieve",title:"RETRIEVE",description:"Retrieves rows from a query using a parallel retrieve cursor.",source:"@site/docs/sql-stmts/retrieve.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/retrieve",permalink:"/zh/docs/sql-stmts/retrieve",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/retrieve.md",tags:[],version:"current",lastUpdatedBy:"Alwin",lastUpdatedAt:1744282709,formattedLastUpdatedAt:"2025\u5e744\u670810\u65e5",frontMatter:{title:"RETRIEVE"},sidebar:"docsbars",previous:{title:"RESET",permalink:"/zh/docs/sql-stmts/reset"},next:{title:"REVOKE",permalink:"/zh/docs/sql-stmts/revoke"}},c={},a=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Outputs",id:"outputs",level:2},{value:"Notes",id:"notes",level:2},{value:"Examples",id:"examples",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function d(e){const s={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,t.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.h1,{id:"retrieve",children:"RETRIEVE"}),"\n",(0,n.jsx)(s.p,{children:"Retrieves rows from a query using a parallel retrieve cursor."}),"\n",(0,n.jsx)(s.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"RETRIEVE { <count> | ALL } FROM ENDPOINT <endpoint_name>\n"})}),"\n",(0,n.jsx)(s.h2,{id:"description",children:"Description"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"RETRIEVE"})," retrieves rows using a previously-created parallel retrieve cursor. You retrieve the rows in individual retrieve sessions, separate direct connections to individual segment endpoints that will serve the results for each individual segment. When you initiate a retrieve session, you must specify ",(0,n.jsx)(s.code,{children:"gp_retrieve_conn=true"})," on the connection request. Because a retrieve session is independent of the parallel retrieve cursors or their corresponding endpoints, you can ",(0,n.jsx)(s.code,{children:"RETRIEVE"})," from multiple endpoints in the same retrieve session."]}),"\n",(0,n.jsxs)(s.p,{children:["A parallel retrieve cursor has an associated position, which is used by ",(0,n.jsx)(s.code,{children:"RETRIEVE"}),". The cursor position can be before the first row of the query result, on any particular row of the result, or after the last row of the result."]}),"\n",(0,n.jsxs)(s.blockquote,{children:["\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:"Note:"})}),"\n",(0,n.jsxs)(s.p,{children:["Because Apache Cloudberry does not support scrollable cursors, the ",(0,n.jsx)(s.code,{children:"RETRIEVE"})," command moves a parallel retrieve cursor only forward in position."]}),"\n"]}),"\n",(0,n.jsx)(s.p,{children:"When it is created, a parallel retrieve cursor is positioned before the first row. After retrieving some rows, the cursor is positioned on the row most recently retrieved."}),"\n",(0,n.jsxs)(s.p,{children:["If ",(0,n.jsx)(s.code,{children:"RETRIEVE"})," runs off the end of the available rows then the cursor is left positioned after the last row."]}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"RETRIEVE ALL"})," always leaves the parallel retrieve cursor positioned after the last row."]}),"\n",(0,n.jsx)(s.h2,{id:"parameters",children:"Parameters"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"count"})})}),"\n",(0,n.jsx)(s.p,{children:"Retrieve the next count number of rows. count must be a positive number."}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"ALL"})})}),"\n",(0,n.jsx)(s.p,{children:"Retrieve all remaining rows."}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"endpoint_name"})})}),"\n",(0,n.jsx)(s.p,{children:"The name of the endpoint from which to retrieve the rows."}),"\n",(0,n.jsx)(s.h2,{id:"outputs",children:"Outputs"}),"\n",(0,n.jsxs)(s.p,{children:["On successful completion, a ",(0,n.jsx)(s.code,{children:"RETRIEVE"})," command returns the fetched rows (possibly empty) and a count of the number of rows fetched (possibly zero)."]}),"\n",(0,n.jsx)(s.h2,{id:"notes",children:"Notes"}),"\n",(0,n.jsxs)(s.p,{children:["Use ",(0,n.jsx)(s.code,{children:"DECLARE ... PARALLEL RETRIEVE CURSOR"})," to define a parallel retrieve cursor."]}),"\n",(0,n.jsxs)(s.p,{children:["Parallel retrieve cursors do not support ",(0,n.jsx)(s.code,{children:"FETCH"})," or ",(0,n.jsx)(s.code,{children:"MOVE"})," operations."]}),"\n",(0,n.jsx)(s.h2,{id:"examples",children:"Examples"}),"\n",(0,n.jsx)(s.p,{children:"Start the transaction:"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"BEGIN;\n"})}),"\n",(0,n.jsx)(s.p,{children:"Create a parallel retrieve cursor:"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"DECLARE mycursor PARALLEL RETRIEVE CURSOR FOR SELECT * FROM films;\n"})}),"\n",(0,n.jsx)(s.p,{children:"List the cursor endpoints:"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"SELECT * FROM gp_endpoints WHERE cursorname='mycursor';\n"})}),"\n",(0,n.jsx)(s.p,{children:"Note the hostname, port, auth_token, and name associated with each endpoint."}),"\n",(0,n.jsx)(s.p,{children:"In another terminal window, initiate a retrieve session using a hostname, port, and auth_token returned from the previous query. For example:"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"PGPASSWORD=d3825fc07e56bee5fcd2b1d0b600c85e PGOPTIONS='-c gp_retrieve_conn=true' psql -d testdb -h sdw3 -p 6001;\n"})}),"\n",(0,n.jsxs)(s.p,{children:["Fetch all rows from an endpoint (for example, the endpoint named ",(0,n.jsx)(s.code,{children:"prc10000001100000005"}),"):"]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"RETRIEVE ALL FROM ENDPOINT prc10000001100000005;\n"})}),"\n",(0,n.jsx)(s.p,{children:"Exit the retrieve session."}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"\\q\n"})}),"\n",(0,n.jsx)(s.p,{children:"Back in the original session, close the cursor and end the transaction:"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"CLOSE mycursor;\nCOMMIT;\n"})}),"\n",(0,n.jsx)(s.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"RETRIEVE"})," is a Apache Cloudberry extension. The SQL standard makes no provisions for parallel retrieve cursors."]}),"\n",(0,n.jsx)(s.h2,{id:"see-also",children:"See also"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.a,{href:"/zh/docs/sql-stmts/declare",children:"DECLARE"}),", ",(0,n.jsx)(s.a,{href:"/zh/docs/sql-stmts/close",children:"CLOSE"})]})]})}function h(e={}){const{wrapper:s}={...(0,t.a)(),...e.components};return s?(0,n.jsx)(s,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}},11151:(e,s,r)=>{r.d(s,{Z:()=>l,a:()=>o});var n=r(67294);const t={},i=n.createContext(t);function o(e){const s=n.useContext(i);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function l(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),n.createElement(i.Provider,{value:s},e.children)}}}]);