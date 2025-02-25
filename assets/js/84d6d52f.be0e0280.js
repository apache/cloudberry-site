"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[5606],{14468:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>o,default:()=>h,frontMatter:()=>r,metadata:()=>d,toc:()=>l});var c=t(85893),s=t(11151);const r={title:"Concurrency Control for Transactions"},o="Transactional Concurrency Control in Cloudberry Database",d={id:"transactional-concurrency-control",title:"Concurrency Control for Transactions",description:"This document introduces the transactional concurrency control in Cloudberry Database, including:",source:"@site/docs/transactional-concurrency-control.md",sourceDirName:".",slug:"/transactional-concurrency-control",permalink:"/docs/transactional-concurrency-control",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/transactional-concurrency-control.md",tags:[],version:"current",lastUpdatedBy:"Dianjin Wang",lastUpdatedAt:1740470606,formattedLastUpdatedAt:"Feb 25, 2025",frontMatter:{title:"Concurrency Control for Transactions"},sidebar:"docsbars",previous:{title:"Work with Transactions",permalink:"/docs/work-with-transactions"},next:{title:"Choose the Table Storage Model",permalink:"/docs/table-storage-models"}},a={},l=[{value:"MVCC mechanism",id:"mvcc-mechanism",level:2},{value:"Lock modes",id:"lock-modes",level:2},{value:"Global Deadlock Detector",id:"global-deadlock-detector",level:2},{value:"Global Deadlock Detector UPDATE and DELETE compatibility",id:"global-deadlock-detector-update-and-delete-compatibility",level:3},{value:"See also",id:"see-also",level:2}];function i(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,s.a)(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(n.h1,{id:"transactional-concurrency-control-in-cloudberry-database",children:"Transactional Concurrency Control in Cloudberry Database"}),"\n",(0,c.jsx)(n.p,{children:"This document introduces the transactional concurrency control in Cloudberry Database, including:"}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsx)(n.li,{children:(0,c.jsx)(n.a,{href:"#mvcc-mechanism",children:"MVCC mechanism"})}),"\n",(0,c.jsx)(n.li,{children:(0,c.jsx)(n.a,{href:"#lock-modes",children:"Lock modes"})}),"\n",(0,c.jsx)(n.li,{children:(0,c.jsx)(n.a,{href:"#global-deadlock-detector",children:"Global Deadlock Detector"})}),"\n"]}),"\n",(0,c.jsx)(n.h2,{id:"mvcc-mechanism",children:"MVCC mechanism"}),"\n",(0,c.jsx)(n.p,{children:"Cloudberry Database and PostgreSQL do not use locks for concurrency control. Instead, they maintain data consistency through a multi-version model known as Multi-version Concurrency Control (MVCC). MVCC ensures transaction isolation for each database session, allowing each query transaction to see a consistent snapshot of data. This ensures that the data observed by a transaction remains consistent and unaffected by other concurrent transactions."}),"\n",(0,c.jsxs)(n.p,{children:['However, the specific data changes visible to a transaction are influenced by its isolation level. The default isolation level is "READ COMMITTED," which means that a transaction can observe data changes made by other transactions that have already been committed. If the isolation level is set to "REPEATABLE READ," then queries within that transaction will observe the data because it was at the beginning of the transaction and will not see changes made by other transactions in the interim. To specify the isolation level of a transaction, you can use the statement ',(0,c.jsx)(n.code,{children:"BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ"}),' to start a transaction with the "REPEATABLE READ" isolation level.']}),"\n",(0,c.jsx)(n.p,{children:"Because MVCC does not use explicit locks for concurrency control, lock contention is minimized and Cloudberry Database maintains reasonable performance in multi-user environments. Locks acquired for querying (reading) data do not conflict with locks acquired for writing data."}),"\n",(0,c.jsx)(n.h2,{id:"lock-modes",children:"Lock modes"}),"\n",(0,c.jsxs)(n.p,{children:["Cloudberry Database provides multiple lock modes to control concurrent access to data in tables. Most Cloudberry Database SQL commands automatically acquire the appropriate locks to ensure that referenced tables are not dropped or modified in incompatible ways while a command runs. For applications that cannot adapt easily to MVCC behavior, you can use the ",(0,c.jsx)(n.code,{children:"LOCK"})," command to acquire explicit locks. However, proper use of MVCC generally provides better performance."]}),"\n",(0,c.jsxs)(n.table,{children:[(0,c.jsx)(n.thead,{children:(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.th,{children:"Lock Mode"}),(0,c.jsx)(n.th,{children:"Associated SQL Commands"}),(0,c.jsx)(n.th,{children:"Conflicts With"})]})}),(0,c.jsxs)(n.tbody,{children:[(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:"ACCESS SHARE"}),(0,c.jsx)(n.td,{children:(0,c.jsx)(n.code,{children:"SELECT"})}),(0,c.jsx)(n.td,{children:"ACCESS EXCLUSIVE"})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:"ROW SHARE"}),(0,c.jsx)(n.td,{children:(0,c.jsx)(n.code,{children:"SELECT...FOR lock_strength"})}),(0,c.jsx)(n.td,{children:"EXCLUSIVE, ACCESS EXCLUSIVE"})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:"ROW EXCLUSIVE"}),(0,c.jsxs)(n.td,{children:[(0,c.jsx)(n.code,{children:"INSERT"}),", ",(0,c.jsx)(n.code,{children:"COPY"})]}),(0,c.jsx)(n.td,{children:"SHARE, SHARE ROW EXCLUSIVE, EXCLUSIVE, ACCESS EXCLUSIVE"})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:"SHARE UPDATE EXCLUSIVE"}),(0,c.jsx)(n.td,{children:(0,c.jsx)(n.code,{children:"ANALYZE"})}),(0,c.jsx)(n.td,{children:"SHARE UPDATE EXCLUSIVE, SHARE, EXCLUSIVE, ACCESS EXCLUSIVE"})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:"SHARE"}),(0,c.jsx)(n.td,{children:(0,c.jsx)(n.code,{children:"CREATE INDEX"})}),(0,c.jsx)(n.td,{children:"ROW EXCLUSIVE, SHARE UPDATE EXCLUSIVE, SHARE ROW EXCLUSIVE, EXCLUSIVE, ACCESS EXCLUSIVE"})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:"SHARE ROW EXCLUSIVE"}),(0,c.jsx)(n.td,{children:"\xa0"}),(0,c.jsx)(n.td,{children:"ROW EXCLUSIVE, SHARE UPDATE EXCLUSIVE, SHARE, SHARE ROW EXCLUSIVE, EXCLUSIVE, ACCESS EXCLUSIVE"})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:"EXCLUSIVE"}),(0,c.jsxs)(n.td,{children:[(0,c.jsx)(n.code,{children:"DELETE"}),", ",(0,c.jsx)(n.code,{children:"UPDATE"}),", ",(0,c.jsx)(n.code,{children:"SELECT...FOR lock_strength"}),", ",(0,c.jsx)(n.code,{children:"REFRESH MATERIALIZED VIEW CONCURRENTLY"})]}),(0,c.jsx)(n.td,{children:"ROW SHARE, ROW EXCLUSIVE, SHARE UPDATE EXCLUSIVE, SHARE, SHARE ROW EXCLUSIVE, EXCLUSIVE, ACCESS EXCLUSIVE"})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:"ACCESS EXCLUSIVE"}),(0,c.jsxs)(n.td,{children:[(0,c.jsx)(n.code,{children:"ALTER TABLE"}),", ",(0,c.jsx)(n.code,{children:"DROP TABLE"}),", ",(0,c.jsx)(n.code,{children:"TRUNCATE"}),", ",(0,c.jsx)(n.code,{children:"REINDEX"}),", ",(0,c.jsx)(n.code,{children:"CLUSTER"}),", ",(0,c.jsx)(n.code,{children:"REFRESH MATERIALIZED VIEW"})," (without ",(0,c.jsx)(n.code,{children:"CONCURRENTLY"}),"), ",(0,c.jsx)(n.code,{children:"VACUUM FULL"})]}),(0,c.jsx)(n.td,{children:"ACCESS SHARE, ROW SHARE, ROW EXCLUSIVE, SHARE UPDATE EXCLUSIVE, SHARE, SHARE ROW EXCLUSIVE, EXCLUSIVE, ACCESS EXCLUSIVE"})]})]})]}),"\n",(0,c.jsxs)(n.admonition,{type:"info",children:[(0,c.jsxs)(n.p,{children:["By default, the Global Deadlock Detector is deactivated, and Cloudberry Database acquires the more restrictive ",(0,c.jsx)(n.code,{children:"EXCLUSIVE"})," lock (rather than ",(0,c.jsx)(n.code,{children:"ROW EXCLUSIVE"})," in PostgreSQL) for ",(0,c.jsx)(n.code,{children:"UPDATE"})," and ",(0,c.jsx)(n.code,{children:"DELETE"}),"."]}),(0,c.jsx)(n.p,{children:"When the Global Deadlock Detector is enabled:"}),(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:["The lock mode for some ",(0,c.jsx)(n.code,{children:"DELETE"})," and ",(0,c.jsx)(n.code,{children:"UPDATE"})," operations on heap tables is ",(0,c.jsx)(n.code,{children:"ROW EXCLUSIVE"}),". See ",(0,c.jsx)(n.a,{href:"#global-deadlock-detector",children:"Global Deadlock Detector"}),"."]}),"\n"]})]}),"\n",(0,c.jsx)(n.h2,{id:"global-deadlock-detector",children:"Global Deadlock Detector"}),"\n",(0,c.jsxs)(n.p,{children:["The Cloudberry Database Global Deadlock Detector background worker process collects lock information on all segments and uses a directed algorithm to detect the existence of local and global deadlocks. This algorithm allows Cloudberry Database to relax concurrent update and delete restrictions on heap tables. (Cloudberry Database still employs table-level locking on AO/CO tables, restricting concurrent ",(0,c.jsx)(n.code,{children:"UPDATE"}),", ",(0,c.jsx)(n.code,{children:"DELETE"}),", and ",(0,c.jsx)(n.code,{children:"SELECT...FOR lock_strength"})," operations.)"]}),"\n",(0,c.jsxs)(n.p,{children:["By default, the Global Deadlock Detector is deactivated and Cloudberry Database runs the concurrent ",(0,c.jsx)(n.code,{children:"UPDATE"})," and ",(0,c.jsx)(n.code,{children:"DELETE"})," operations on a heap table serially. You can activate these concurrent updates and have the Global Deadlock Detector determine when a deadlock exists by setting the parameter ",(0,c.jsx)(n.code,{children:"gp_enable_global_deadlock_detector"})," in the ",(0,c.jsx)(n.code,{children:"postgresql.conf"})," configuration file to ",(0,c.jsx)(n.code,{children:"on"})," and then restarting the database."]}),"\n",(0,c.jsxs)(n.p,{children:["When the Global Deadlock Detector is enabled, the background worker process is automatically started on the coordinator host when you start Cloudberry Database. You configure the interval at which the Global Deadlock Detector collects and analyzes lock waiting data via the ",(0,c.jsx)(n.code,{children:"gp_global_deadlock_detector_period"})," server configuration parameter in the ",(0,c.jsx)(n.code,{children:"postgresql.conf"})," configuration file."]}),"\n",(0,c.jsx)(n.p,{children:"If the Global Deadlock Detector determines that deadlock exists, it breaks the deadlock by cancelling one or more backend processes associated with the youngest transaction(s) involved."}),"\n",(0,c.jsx)(n.p,{children:"When the Global Deadlock Detector determines a deadlock exists for the following types of transactions, only one of the transactions will succeed. The other transactions will fail with an error indicating that concurrent updates to the same row is not allowed."}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsx)(n.li,{children:"Concurrent transactions on the same row of a heap table where the first transaction is an update operation and a later transaction runs an update or delete and the query plan contains a motion operator."}),"\n",(0,c.jsx)(n.li,{children:"Concurrent update transactions on the same distribution key of a heap table that are run by the Postgres-based planner."}),"\n",(0,c.jsx)(n.li,{children:"Concurrent update transactions on the same row of a hash table that are run by the GPORCA optimizer."}),"\n"]}),"\n",(0,c.jsx)(n.admonition,{type:"tip",children:(0,c.jsxs)(n.p,{children:["Cloudberry Database uses the interval specified in the ",(0,c.jsx)(n.code,{children:"deadlock_timeout"})," server configuration parameter for local deadlock detection. Because the local and global deadlock detection algorithms differ, the cancelled process(es) may differ depending upon which detector (local or global) Cloudberry Database triggers first."]})}),"\n",(0,c.jsx)(n.admonition,{type:"tip",children:(0,c.jsxs)(n.p,{children:["If the ",(0,c.jsx)(n.code,{children:"lock_timeout"})," server configuration parameter is turned on and set to a value smaller than ",(0,c.jsx)(n.code,{children:"deadlock_timeout"})," and ",(0,c.jsx)(n.code,{children:"gp_global_deadlock_detector_period"}),", Cloudberry Database will cancel a statement before it would ever trigger a deadlock check in that session."]})}),"\n",(0,c.jsxs)(n.p,{children:["To view lock waiting information for all segments, run the ",(0,c.jsx)(n.code,{children:"gp_dist_wait_status()"})," user-defined function. You can use the output of this function to determine which transactions are waiting on locks, which transactions are holding locks, the lock types and mode, the waiter and holder session identifiers, and which segments are running the transactions. Sample output of the ",(0,c.jsx)(n.code,{children:"gp_dist_wait_status()"})," function follows:"]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-sql",children:"SELECT * FROM pg_catalog.gp_dist_wait_status();\n\n-[ RECORD 1 ]----+--------------\nsegid            | 0\nwaiter_dxid      | 11\nholder_dxid      | 12\nholdTillEndXact  | t\nwaiter_lpid      | 31249\nholder_lpid      | 31458\nwaiter_lockmode  | ShareLock\nwaiter_locktype  | transactionid\nwaiter_sessionid | 8\nholder_sessionid | 9\n-[ RECORD 2 ]----+--------------\nsegid            | 1\nwaiter_dxid      | 12\nholder_dxid      | 11\nholdTillEndXact  | t\nwaiter_lpid      | 31467\nholder_lpid      | 31250\nwaiter_lockmode  | ShareLock\nwaiter_locktype  | transactionid\nwaiter_sessionid | 9\nholder_sessionid | 8\n"})}),"\n",(0,c.jsx)(n.p,{children:"When it cancels a transaction to break a deadlock, the Global Deadlock Detector reports the following error message:"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{children:'ERROR:  canceling statement due to user request: "cancelled by global deadlock detector"\n'})}),"\n",(0,c.jsx)(n.h3,{id:"global-deadlock-detector-update-and-delete-compatibility",children:"Global Deadlock Detector UPDATE and DELETE compatibility"}),"\n",(0,c.jsxs)(n.p,{children:["The Global Deadlock Detector can manage concurrent updates for these types of ",(0,c.jsx)(n.code,{children:"UPDATE"})," and ",(0,c.jsx)(n.code,{children:"DELETE"})," commands on heap tables:"]}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:["\n",(0,c.jsxs)(n.p,{children:["Simple ",(0,c.jsx)(n.code,{children:"UPDATE"})," of a single table. Update a non-distribution key with the Postgres-based planner. The command does not contain a ",(0,c.jsx)(n.code,{children:"FROM"})," clause, or a sub-query in the ",(0,c.jsx)(n.code,{children:"WHERE"})," clause."]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-sql",children:"UPDATE t SET c2 = c2 + 1 WHERE c1 > 10;\n"})}),"\n"]}),"\n",(0,c.jsxs)(n.li,{children:["\n",(0,c.jsxs)(n.p,{children:["Simple ",(0,c.jsx)(n.code,{children:"DELETE"})," of a single table. The command does not contain a sub-query in the ",(0,c.jsx)(n.code,{children:"FROM"})," or ",(0,c.jsx)(n.code,{children:"WHERE"})," clauses."]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-sql",children:"DELETE FROM t WHERE c1 > 10;\n"})}),"\n"]}),"\n",(0,c.jsxs)(n.li,{children:["\n",(0,c.jsxs)(n.p,{children:["Split ",(0,c.jsx)(n.code,{children:"UPDATE"}),". For the Postgres-based planner, the ",(0,c.jsx)(n.code,{children:"UPDATE"})," command updates a distribution key."]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-sql",children:"UPDATE t SET c = c + 1; -- c is a distribution key\n"})}),"\n",(0,c.jsxs)(n.p,{children:["For GPORCA, the ",(0,c.jsx)(n.code,{children:"UPDATE"})," command updates a distribution key or references a distribution key."]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-sql",children:"UPDATE t SET b = b + 1 WHERE c = 10; -- c is a distribution key\n"})}),"\n"]}),"\n",(0,c.jsxs)(n.li,{children:["\n",(0,c.jsxs)(n.p,{children:["Complex ",(0,c.jsx)(n.code,{children:"UPDATE"}),". The ",(0,c.jsx)(n.code,{children:"UPDATE"})," command includes multiple table joins."]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-sql",children:"UPDATE t1 SET c = t1.c+1 FROM t2 WHERE t1.c = t2.c;\n"})}),"\n",(0,c.jsxs)(n.p,{children:["Or the command contains a sub-query in the ",(0,c.jsx)(n.code,{children:"WHERE"})," clause."]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-sql",children:"UPDATE t SET c = c + 1 WHERE c > ALL(SELECT * FROM t1);\n"})}),"\n"]}),"\n",(0,c.jsxs)(n.li,{children:["\n",(0,c.jsxs)(n.p,{children:["Complex ",(0,c.jsx)(n.code,{children:"DELETE"}),". A complex ",(0,c.jsx)(n.code,{children:"DELETE"})," command is similar to a complex ",(0,c.jsx)(n.code,{children:"UPDATE"}),", and involves multiple table joins or a sub-query."]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-sql",children:"DELETE FROM t USING t1 WHERE t.c > t1.c;\n"})}),"\n"]}),"\n"]}),"\n",(0,c.jsxs)(n.p,{children:["The following table shows the concurrent ",(0,c.jsx)(n.code,{children:"UPDATE"})," or ",(0,c.jsx)(n.code,{children:"DELETE"})," commands that are managed by the Global Deadlock Detector. For example, concurrent simple ",(0,c.jsx)(n.code,{children:"UPDATE"})," commands on the same table row are managed by the Global Deadlock Detector. For a concurrent complex ",(0,c.jsx)(n.code,{children:"UPDATE"})," and a simple ",(0,c.jsx)(n.code,{children:"UPDATE"}),", only one ",(0,c.jsx)(n.code,{children:"UPDATE"})," is performed, and an error is returned for the other ",(0,c.jsx)(n.code,{children:"UPDATE"}),"."]}),"\n",(0,c.jsxs)(n.table,{children:[(0,c.jsx)(n.thead,{children:(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.th,{children:"Command"}),(0,c.jsxs)(n.th,{children:["Simple ",(0,c.jsx)(n.code,{children:"UPDATE"})]}),(0,c.jsxs)(n.th,{children:["Simple ",(0,c.jsx)(n.code,{children:"DELETE"})]}),(0,c.jsxs)(n.th,{children:["Split ",(0,c.jsx)(n.code,{children:"UPDATE"})]}),(0,c.jsxs)(n.th,{children:["Complex ",(0,c.jsx)(n.code,{children:"UPDATE"})]}),(0,c.jsxs)(n.th,{children:["Complex ",(0,c.jsx)(n.code,{children:"DELETE"})]})]})}),(0,c.jsxs)(n.tbody,{children:[(0,c.jsxs)(n.tr,{children:[(0,c.jsxs)(n.td,{children:["Simple ",(0,c.jsx)(n.code,{children:"UPDATE"})]}),(0,c.jsx)(n.td,{children:"YES"}),(0,c.jsx)(n.td,{children:"YES"}),(0,c.jsx)(n.td,{children:"NO"}),(0,c.jsx)(n.td,{children:"NO"}),(0,c.jsx)(n.td,{children:"NO"})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsxs)(n.td,{children:["Simple ",(0,c.jsx)(n.code,{children:"DELETE"})]}),(0,c.jsx)(n.td,{children:"YES"}),(0,c.jsx)(n.td,{children:"YES"}),(0,c.jsx)(n.td,{children:"NO"}),(0,c.jsx)(n.td,{children:"YES"}),(0,c.jsx)(n.td,{children:"YES"})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsxs)(n.td,{children:["Split ",(0,c.jsx)(n.code,{children:"UPDATE"})]}),(0,c.jsx)(n.td,{children:"NO"}),(0,c.jsx)(n.td,{children:"NO"}),(0,c.jsx)(n.td,{children:"NO"}),(0,c.jsx)(n.td,{children:"NO"}),(0,c.jsx)(n.td,{children:"NO"})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsxs)(n.td,{children:["Complex ",(0,c.jsx)(n.code,{children:"UPDATE"})]}),(0,c.jsx)(n.td,{children:"NO"}),(0,c.jsx)(n.td,{children:"YES"}),(0,c.jsx)(n.td,{children:"NO"}),(0,c.jsx)(n.td,{children:"NO"}),(0,c.jsx)(n.td,{children:"NO"})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsxs)(n.td,{children:["Complex ",(0,c.jsx)(n.code,{children:"DELETE"})]}),(0,c.jsx)(n.td,{children:"NO"}),(0,c.jsx)(n.td,{children:"YES"}),(0,c.jsx)(n.td,{children:"NO"}),(0,c.jsx)(n.td,{children:"NO"}),(0,c.jsx)(n.td,{children:"YES"})]})]})]}),"\n",(0,c.jsx)(n.h2,{id:"see-also",children:"See also"}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsx)(n.li,{children:(0,c.jsx)(n.a,{href:"/docs/work-with-transactions",children:"Work with Transactions"})}),"\n",(0,c.jsx)(n.li,{children:(0,c.jsx)(n.a,{href:"/docs/insert-update-delete-rows",children:"Insert, Update, and Delete Rows"})}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,c.jsx)(n,{...e,children:(0,c.jsx)(i,{...e})}):i(e)}},11151:(e,n,t)=>{t.d(n,{Z:()=>d,a:()=>o});var c=t(67294);const s={},r=c.createContext(s);function o(e){const n=c.useContext(r);return c.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),c.createElement(r.Provider,{value:n},e.children)}}}]);