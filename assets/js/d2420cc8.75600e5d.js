"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[3459],{19215:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>r,default:()=>h,frontMatter:()=>o,metadata:()=>i,toc:()=>d});var a=t(85893),s=t(11151);const o={title:"Work with Transactions"},r="Work with Transactions in Apache Cloudberry",i={id:"work-with-transactions",title:"Work with Transactions",description:"Transactions allow you to bundle multiple SQL statements in one all-or-nothing operation.",source:"@site/docs/work-with-transactions.md",sourceDirName:".",slug:"/work-with-transactions",permalink:"/docs/work-with-transactions",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/work-with-transactions.md",tags:[],version:"current",lastUpdatedBy:"dependabot[bot]",lastUpdatedAt:1744180221,formattedLastUpdatedAt:"Apr 9, 2025",frontMatter:{title:"Work with Transactions"},sidebar:"docsbars",previous:{title:"Insert, Update, and Delete Rows",permalink:"/docs/insert-update-delete-rows"},next:{title:"Concurrency Control for Transactions",permalink:"/docs/transactional-concurrency-control"}},c={},d=[{value:"Transaction isolation levels",id:"transaction-isolation-levels",level:2},{value:"Read uncommitted and read committed",id:"read-uncommitted-and-read-committed",level:3},{value:"Repeatable read and serializable",id:"repeatable-read-and-serializable",level:3},{value:"See also",id:"see-also",level:2}];function l(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...(0,s.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.h1,{id:"work-with-transactions-in-apache-cloudberry",children:"Work with Transactions in Apache Cloudberry"}),"\n",(0,a.jsx)(n.p,{children:"Transactions allow you to bundle multiple SQL statements in one all-or-nothing operation."}),"\n",(0,a.jsx)(n.p,{children:"The following are the Apache Cloudberry SQL transaction commands:"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"BEGIN"})," or ",(0,a.jsx)(n.code,{children:"START TRANSACTION"})," starts a transaction block."]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"END"})," or ",(0,a.jsx)(n.code,{children:"COMMIT"})," commits the results of a transaction."]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"ROLLBACK"})," abandons a transaction without making any changes."]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"SAVEPOINT"})," marks a place in a transaction and enables partial rollback. You can roll back commands run after a savepoint while maintaining commands run before the savepoint."]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"ROLLBACK TO SAVEPOINT"})," rolls back a transaction to a savepoint."]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"RELEASE SAVEPOINT"})," destroys a savepoint within a transaction."]}),"\n"]}),"\n",(0,a.jsx)(n.h2,{id:"transaction-isolation-levels",children:"Transaction isolation levels"}),"\n",(0,a.jsx)(n.p,{children:"Apache Cloudberry accepts the standard SQL transaction levels as follows:"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"READ UNCOMMITTED"})," and ",(0,a.jsx)(n.code,{children:"READ COMMITTED"})," behave like the standard ",(0,a.jsx)(n.code,{children:"READ COMMITTED"}),"."]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"REPEATABLE READ"})," and ",(0,a.jsx)(n.code,{children:"SERIALIZABLE"})," behave like ",(0,a.jsx)(n.code,{children:"REPEATABLE READ"}),"."]}),"\n"]}),"\n",(0,a.jsx)(n.p,{children:"The following information describes the behavior of the Apache Cloudberry transaction levels."}),"\n",(0,a.jsx)(n.h3,{id:"read-uncommitted-and-read-committed",children:"Read uncommitted and read committed"}),"\n",(0,a.jsxs)(n.p,{children:["Apache Cloudberry does not allow any command to see an uncommitted update in another concurrent transaction, so ",(0,a.jsx)(n.code,{children:"READ UNCOMMITTED"})," behaves the same as ",(0,a.jsx)(n.code,{children:"READ COMMITTED"}),". ",(0,a.jsx)(n.code,{children:"READ COMMITTED"})," provides fast, simple, partial transaction isolation. ",(0,a.jsx)(n.code,{children:"SELECT"}),", ",(0,a.jsx)(n.code,{children:"UPDATE"}),", and ",(0,a.jsx)(n.code,{children:"DELETE"})," commands operate on a snapshot of the database taken when the query started."]}),"\n",(0,a.jsxs)(n.p,{children:["A ",(0,a.jsx)(n.code,{children:"SELECT"})," query:"]}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"Sees data committed before the query starts."}),"\n",(0,a.jsx)(n.li,{children:"Sees updates run within the transaction."}),"\n",(0,a.jsx)(n.li,{children:"Does not see uncommitted data outside the transaction."}),"\n",(0,a.jsx)(n.li,{children:"Can possibly see changes that concurrent transactions made if the concurrent transaction is committed after the initial read in its own transaction."}),"\n"]}),"\n",(0,a.jsxs)(n.p,{children:["Successive ",(0,a.jsx)(n.code,{children:"SELECT"})," queries in the same transaction can see different data if other concurrent transactions commit changes between the successive queries. ",(0,a.jsx)(n.code,{children:"UPDATE"})," and ",(0,a.jsx)(n.code,{children:"DELETE"})," commands find only rows committed before the commands started."]}),"\n",(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.code,{children:"READ COMMITTED"})," transaction isolation allows concurrent transactions to modify or lock a row before ",(0,a.jsx)(n.code,{children:"UPDATE"})," or ",(0,a.jsx)(n.code,{children:"DELETE"})," find the row. ",(0,a.jsx)(n.code,{children:"READ COMMITTED"})," transaction isolation might be inadequate for applications that perform complex queries and updates and require a consistent view of the database."]}),"\n",(0,a.jsx)(n.h3,{id:"repeatable-read-and-serializable",children:"Repeatable read and serializable"}),"\n",(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.code,{children:"SERIALIZABLE"})," transaction isolation, as defined by the SQL standard, ensures that transactions that run concurrently produce the same results as if they were run one after another. If you specify ",(0,a.jsx)(n.code,{children:"SERIALIZABLE"})," Apache Cloudberry falls back to ",(0,a.jsx)(n.code,{children:"REPEATABLE READ"}),". ",(0,a.jsx)(n.code,{children:"REPEATABLE READ"})," transactions prevent dirty reads, non-repeatable reads, and phantom reads without expensive locking, but Apache Cloudberry does not detect all serializability interactions that can occur during concurrent transaction execution. Concurrent transactions should be examined to identify interactions that are not prevented by disallowing concurrent updates of the same data. You can prevent these interactions by using explicit table locks or by requiring the conflicting transactions to update a dummy row introduced to represent the conflict."]}),"\n",(0,a.jsxs)(n.p,{children:["With ",(0,a.jsx)(n.code,{children:"REPEATABLE READ"})," transactions, a ",(0,a.jsx)(n.code,{children:"SELECT"})," query:"]}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"Sees a snapshot of the data as of the start of the transaction (not as of the start of the current query within the transaction)."}),"\n",(0,a.jsx)(n.li,{children:"Sees only data committed before the query starts."}),"\n",(0,a.jsx)(n.li,{children:"Sees updates run within the transaction."}),"\n",(0,a.jsx)(n.li,{children:"Does not see uncommitted data outside the transaction."}),"\n",(0,a.jsx)(n.li,{children:"Does not see changes that concurrent transactions make."}),"\n",(0,a.jsxs)(n.li,{children:["Successive ",(0,a.jsx)(n.code,{children:"SELECT"})," commands within a single transaction always see the same data."]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"UPDATE"}),", ",(0,a.jsx)(n.code,{children:"DELETE"}),", ",(0,a.jsx)(n.code,{children:"SELECT FOR UPDATE"}),", and ",(0,a.jsx)(n.code,{children:"SELECT FOR SHARE"})," commands find only rows committed before the command started. If a concurrent transaction has updated, deleted, or locked a target row, the ",(0,a.jsx)(n.code,{children:"REPEATABLE READ"})," transaction waits for the concurrent transaction to commit or roll back the change. If the concurrent transaction commits the change, the ",(0,a.jsx)(n.code,{children:"REPEATABLE READ"})," transaction rolls back. If the concurrent transaction rolls back its change, the ",(0,a.jsx)(n.code,{children:"REPEATABLE READ"})," transaction can commit its changes."]}),"\n"]}),"\n",(0,a.jsxs)(n.p,{children:["The default transaction isolation level in Apache Cloudberry is ",(0,a.jsx)(n.code,{children:"READ COMMITTED"}),". To change the isolation level for a transaction, declare the isolation level when you ",(0,a.jsx)(n.code,{children:"BEGIN"})," the transaction or use the ",(0,a.jsx)(n.code,{children:"SET TRANSACTION"})," command after the transaction starts."]}),"\n",(0,a.jsx)(n.h2,{id:"see-also",children:"See also"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:(0,a.jsx)(n.a,{href:"/docs/transactional-concurrency-control",children:"Transactional Concurrency Control"})}),"\n",(0,a.jsx)(n.li,{children:(0,a.jsx)(n.a,{href:"/docs/insert-update-delete-rows",children:"Insert, Update, and Delete Rows"})}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(l,{...e})}):l(e)}},11151:(e,n,t)=>{t.d(n,{Z:()=>i,a:()=>r});var a=t(67294);const s={},o=a.createContext(s);function r(e){const n=a.useContext(o);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),a.createElement(o.Provider,{value:n},e.children)}}}]);