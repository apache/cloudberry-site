"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[7774],{12904:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>l,contentTitle:()=>t,default:()=>h,frontMatter:()=>i,metadata:()=>d,toc:()=>r});var o=n(85893),c=n(11151);const i={title:"LOCK"},t="LOCK",d={id:"sql-stmts/lock",title:"LOCK",description:"Locks a table.",source:"@site/docs/sql-stmts/lock.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/lock",permalink:"/docs/sql-stmts/lock",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/lock.md",tags:[],version:"current",lastUpdatedBy:"dependabot[bot]",lastUpdatedAt:1744180221,formattedLastUpdatedAt:"Apr 9, 2025",frontMatter:{title:"LOCK"},sidebar:"docsbars",previous:{title:"LOAD",permalink:"/docs/sql-stmts/load"},next:{title:"MOVE",permalink:"/docs/sql-stmts/move"}},l={},r=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Notes",id:"notes",level:2},{value:"Examples",id:"examples",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function a(e){const s={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,c.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(s.h1,{id:"lock",children:"LOCK"}),"\n",(0,o.jsx)(s.p,{children:"Locks a table."}),"\n",(0,o.jsx)(s.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{className:"language-sql",children:"LOCK [TABLE] [ONLY] name [ * ] [, ...] [IN <lockmode> MODE] [NOWAIT] [COORDINATOR ONLY]\n"})}),"\n",(0,o.jsx)(s.p,{children:"where lockmode is one of:"}),"\n",(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{className:"language-sql",children:"ACCESS SHARE | ROW SHARE | ROW EXCLUSIVE | SHARE UPDATE EXCLUSIVE \n| SHARE | SHARE ROW EXCLUSIVE | EXCLUSIVE | ACCESS EXCLUSIVE\n"})}),"\n",(0,o.jsx)(s.h2,{id:"description",children:"Description"}),"\n",(0,o.jsxs)(s.p,{children:[(0,o.jsx)(s.code,{children:"LOCK TABLE"})," obtains a table-level lock, waiting if necessary for any conflicting locks to be released. If ",(0,o.jsx)(s.code,{children:"NOWAIT"})," is specified, ",(0,o.jsx)(s.code,{children:"LOCK TABLE"})," does not wait to acquire the desired lock: if it cannot be acquired immediately, the command is stopped and an error is emitted. Once obtained, the lock is held for the remainder of the current transaction. There is no ",(0,o.jsx)(s.code,{children:"UNLOCK TABLE"})," command; locks are always released at transaction end."]}),"\n",(0,o.jsxs)(s.p,{children:["When acquiring locks automatically for commands that reference tables, Apache Cloudberry always uses the least restrictive lock mode possible. ",(0,o.jsx)(s.code,{children:"LOCK TABLE"})," provides for cases when you might need more restrictive locking. For example, suppose an application runs a transaction at the ",(0,o.jsx)(s.code,{children:"READ COMMITTED"})," isolation level and needs to ensure that data in a table remains stable for the duration of the transaction. To achieve this you could obtain ",(0,o.jsx)(s.code,{children:"SHARE"})," lock mode over the table before querying. This will prevent concurrent data changes and ensure subsequent reads of the table see a stable view of committed data, because ",(0,o.jsx)(s.code,{children:"SHARE"})," lock mode conflicts with the ",(0,o.jsx)(s.code,{children:"ROW EXCLUSIVE"})," lock acquired by writers, and your ",(0,o.jsx)(s.code,{children:"LOCK TABLE <name> IN SHARE MODE"})," statement will wait until any concurrent holders of ",(0,o.jsx)(s.code,{children:"ROW EXCLUSIVE"})," mode locks commit or rolls back. Thus, once you obtain the lock, there are no uncommitted writes outstanding; furthermore none can begin until you release the lock."]}),"\n",(0,o.jsxs)(s.p,{children:["To achieve a similar effect when running a transaction at the ",(0,o.jsx)(s.code,{children:"REPEATABLE READ"})," or ",(0,o.jsx)(s.code,{children:"SERIALIZABLE"})," isolation level, you have to run the ",(0,o.jsx)(s.code,{children:"LOCK TABLE"})," statement before running any ",(0,o.jsx)(s.code,{children:"SELECT"})," or data modification statement. A ",(0,o.jsx)(s.code,{children:"REPEATABLE READ"})," or ",(0,o.jsx)(s.code,{children:"SERIALIZABLE"})," transaction's view of data will be frozen when its first ",(0,o.jsx)(s.code,{children:"SELECT"})," or data modification statement begins. A ",(0,o.jsx)(s.code,{children:"LOCK TABLE"})," later in the transaction will still prevent concurrent writes \u2014 but it won't ensure that what the transaction reads corresponds to the latest committed values."]}),"\n",(0,o.jsxs)(s.p,{children:["If a transaction of this sort is going to change the data in the table, then it should use ",(0,o.jsx)(s.code,{children:"SHARE ROW EXCLUSIVE"})," lock mode instead of ",(0,o.jsx)(s.code,{children:"SHARE"})," mode. This ensures that only one transaction of this type runs at a time. Without this, a deadlock is possible: two transactions might both acquire ",(0,o.jsx)(s.code,{children:"SHARE"})," mode, and then be unable to also acquire ",(0,o.jsx)(s.code,{children:"ROW EXCLUSIVE"})," mode to actually perform their updates. Note that a transaction's own locks never conflict, so a transaction can acquire ",(0,o.jsx)(s.code,{children:"ROW EXCLUSIVE"})," mode when it holds ",(0,o.jsx)(s.code,{children:"SHARE"})," mode \u2014 but not if anyone else holds ",(0,o.jsx)(s.code,{children:"SHARE"})," mode. To avoid deadlocks, make sure all transactions acquire locks on the same objects in the same order, and if multiple lock modes are involved for a single object, then transactions should always acquire the most restrictive mode first."]}),"\n",(0,o.jsx)(s.h2,{id:"parameters",children:"Parameters"}),"\n",(0,o.jsx)(s.p,{children:(0,o.jsx)(s.strong,{children:(0,o.jsx)(s.code,{children:"name"})})}),"\n",(0,o.jsxs)(s.p,{children:["The name (optionally schema-qualified) of an existing table to lock. If ",(0,o.jsx)(s.code,{children:"ONLY"})," is specified, only that table is locked. If ",(0,o.jsx)(s.code,{children:"ONLY"})," is not specified, the table and all its descendant tables (if any) are locked. Optionally, ",(0,o.jsx)(s.code,{children:"*"})," can be specified after the table name to explicitly indicate that descendant tables are included."]}),"\n",(0,o.jsxs)(s.p,{children:["If multiple tables are given, tables are locked one-by-one in the order specified in the ",(0,o.jsx)(s.code,{children:"LOCK TABLE"})," command."]}),"\n",(0,o.jsx)(s.p,{children:(0,o.jsx)(s.strong,{children:(0,o.jsx)(s.code,{children:"lockmode"})})}),"\n",(0,o.jsxs)(s.p,{children:["The lock mode specifies which locks this lock conflicts with. If no lock mode is specified, then ",(0,o.jsx)(s.code,{children:"ACCESS EXCLUSIVE"}),", the most restrictive mode, is used. Lock modes are as follows:"]}),"\n",(0,o.jsxs)(s.ul,{children:["\n",(0,o.jsxs)(s.li,{children:["ACCESS SHARE \u2014 Conflicts with the ",(0,o.jsx)(s.code,{children:"ACCESS EXCLUSIVE"})," lock mode only. The ",(0,o.jsx)(s.code,{children:"SELECT"})," command acquires a lock of this mode on referenced tables. In general, any query that only reads a table and does not modify it will acquire this lock mode."]}),"\n",(0,o.jsxs)(s.li,{children:["ROW SHARE \u2014 Conflicts with the ",(0,o.jsx)(s.code,{children:"EXCLUSIVE"})," and ",(0,o.jsx)(s.code,{children:"ACCESS EXCLUSIVE"})," lock modes. The ",(0,o.jsx)(s.code,{children:"SELECT FOR SHARE"})," command automatically acquires a lock of this mode on the target table(s) (in addition to ",(0,o.jsx)(s.code,{children:"ACCESS SHARE"})," locks on any other tables that are referenced but not selected ",(0,o.jsx)(s.code,{children:"FOR SHARE"}),")."]}),"\n",(0,o.jsxs)(s.li,{children:["ROW EXCLUSIVE \u2014 Conflicts with the ",(0,o.jsx)(s.code,{children:"SHARE"}),", ",(0,o.jsx)(s.code,{children:"SHARE ROW EXCLUSIVE"}),", ",(0,o.jsx)(s.code,{children:"EXCLUSIVE"}),", and ",(0,o.jsx)(s.code,{children:"ACCESS EXCLUSIVE"})," lock modes. The commands ",(0,o.jsx)(s.code,{children:"INSERT"})," and ",(0,o.jsx)(s.code,{children:"COPY"})," automatically acquire this lock mode on the target table (in addition to ",(0,o.jsx)(s.code,{children:"ACCESS SHARE"})," locks on any other referenced tables) See ",(0,o.jsx)(s.a,{href:"#notes",children:"Note"}),"."]}),"\n",(0,o.jsxs)(s.li,{children:["SHARE UPDATE EXCLUSIVE \u2014 Conflicts with the ",(0,o.jsx)(s.code,{children:"SHARE UPDATE EXCLUSIVE"}),", ",(0,o.jsx)(s.code,{children:"SHARE"}),", ",(0,o.jsx)(s.code,{children:"SHARE ROW EXCLUSIVE"}),", ",(0,o.jsx)(s.code,{children:"EXCLUSIVE"}),", and ",(0,o.jsx)(s.code,{children:"ACCESS EXCLUSIVE"})," lock modes. This mode protects a table against concurrent schema changes and ",(0,o.jsx)(s.code,{children:"VACUUM"})," runs. Acquired by ",(0,o.jsx)(s.code,{children:"VACUUM"})," (without ",(0,o.jsx)(s.code,{children:"FULL"}),") on heap tables and ",(0,o.jsx)(s.code,{children:"ANALYZE"}),"."]}),"\n",(0,o.jsxs)(s.li,{children:["SHARE \u2014 Conflicts with the ",(0,o.jsx)(s.code,{children:"ROW EXCLUSIVE"}),", ",(0,o.jsx)(s.code,{children:"SHARE UPDATE EXCLUSIVE"}),", ",(0,o.jsx)(s.code,{children:"SHARE ROW EXCLUSIVE, EXCLUSIVE"}),", and ",(0,o.jsx)(s.code,{children:"ACCESS EXCLUSIVE"})," lock modes. This mode protects a table against concurrent data changes. Acquired automatically by ",(0,o.jsx)(s.code,{children:"CREATE INDEX"}),"."]}),"\n",(0,o.jsxs)(s.li,{children:["SHARE ROW EXCLUSIVE \u2014 Conflicts with the ",(0,o.jsx)(s.code,{children:"ROW EXCLUSIVE"}),", ",(0,o.jsx)(s.code,{children:"SHARE UPDATE EXCLUSIVE"}),", ",(0,o.jsx)(s.code,{children:"SHARE"}),", ",(0,o.jsx)(s.code,{children:"SHARE ROW EXCLUSIVE"}),", ",(0,o.jsx)(s.code,{children:"EXCLUSIVE"}),", and ",(0,o.jsx)(s.code,{children:"ACCESS EXCLUSIVE"})," lock modes. This mode protects a table against concurrent data changes, and is self-exclusive so that only one session can hold it at a time. This lock mode is not automatically acquired by any Apache Cloudberry command."]}),"\n",(0,o.jsxs)(s.li,{children:["EXCLUSIVE \u2014 Conflicts with the ",(0,o.jsx)(s.code,{children:"ROW SHARE"}),", ",(0,o.jsx)(s.code,{children:"ROW EXCLUSIVE"}),", ",(0,o.jsx)(s.code,{children:"SHARE UPDATE EXCLUSIVE"}),", ",(0,o.jsx)(s.code,{children:"SHARE"}),", ",(0,o.jsx)(s.code,{children:"SHARE ROW EXCLUSIVE"}),", ",(0,o.jsx)(s.code,{children:"EXCLUSIVE"}),", and ",(0,o.jsx)(s.code,{children:"ACCESS EXCLUSIVE"})," lock modes. This mode allows only concurrent ",(0,o.jsx)(s.code,{children:"ACCESS SHARE"})," locks, i.e., only reads from the table can proceed in parallel with a transaction holding this lock mode. This lock mode is automatically acquired for ",(0,o.jsx)(s.code,{children:"UPDATE"}),", ",(0,o.jsx)(s.code,{children:"SELECT FOR UPDATE"}),", and ",(0,o.jsx)(s.code,{children:"DELETE"})," in Apache Cloudberry (which is more restrictive locking than in regular PostgreSQL). See ",(0,o.jsx)(s.a,{href:"#notes",children:"Note"}),"."]}),"\n",(0,o.jsxs)(s.li,{children:["ACCESS EXCLUSIVE \u2014 Conflicts with locks of all modes (",(0,o.jsx)(s.code,{children:"ACCESS SHARE"}),", ",(0,o.jsx)(s.code,{children:"ROW SHARE"}),", ",(0,o.jsx)(s.code,{children:"ROW EXCLUSIVE"}),", ",(0,o.jsx)(s.code,{children:"SHARE UPDATE EXCLUSIVE"}),", ",(0,o.jsx)(s.code,{children:"SHARE"}),", ",(0,o.jsx)(s.code,{children:"SHARE ROW EXCLUSIVE"}),", ",(0,o.jsx)(s.code,{children:"EXCLUSIVE"}),", and ",(0,o.jsx)(s.code,{children:"ACCESS EXCLUSIVE"}),"). This mode guarantees that the holder is the only transaction accessing the table in any way. Acquired automatically by the ",(0,o.jsx)(s.code,{children:"ALTER TABLE"}),", ",(0,o.jsx)(s.code,{children:"DROP TABLE"}),", ",(0,o.jsx)(s.code,{children:"TRUNCATE"}),", ",(0,o.jsx)(s.code,{children:"REINDEX"}),", ",(0,o.jsx)(s.code,{children:"CLUSTER"}),", and ",(0,o.jsx)(s.code,{children:"VACUUM FULL"})," commands. This is the default lock mode for ",(0,o.jsx)(s.code,{children:"LOCK TABLE"})," statements that do not specify a mode explicitly. This lock is also briefly acquired by ",(0,o.jsx)(s.code,{children:"VACUUM"})," (without ",(0,o.jsx)(s.code,{children:"FULL"}),") on append-optimized tables during processing."]}),"\n"]}),"\n",(0,o.jsxs)(s.blockquote,{children:["\n",(0,o.jsxs)(s.p,{children:[(0,o.jsx)(s.strong,{children:"Note:"})," As the default, Apache Cloudberry acquires an ",(0,o.jsx)(s.code,{children:"EXCLUSIVE"})," lock on tables for ",(0,o.jsx)(s.code,{children:"DELETE"}),", ",(0,o.jsx)(s.code,{children:"UPDATE"}),", and ",(0,o.jsx)(s.code,{children:"SELECT FOR UPDATE"})," operations on heap tables. When the Global Deadlock Detector is enabled, the lock mode for the operations on heap tables is ",(0,o.jsx)(s.code,{children:"ROW EXCLUSIVE"}),"."]}),"\n"]}),"\n",(0,o.jsx)(s.p,{children:(0,o.jsx)(s.strong,{children:(0,o.jsx)(s.code,{children:"NOWAIT"})})}),"\n",(0,o.jsxs)(s.p,{children:["Specifies that ",(0,o.jsx)(s.code,{children:"LOCK TABLE"})," should not wait for any conflicting locks to be released: if the specified lock(s) cannot be acquired immediately without waiting, the transaction is cancelled."]}),"\n",(0,o.jsx)(s.p,{children:(0,o.jsx)(s.strong,{children:(0,o.jsx)(s.code,{children:"COORDINATOR ONLY"})})}),"\n",(0,o.jsxs)(s.p,{children:["Specifies that when a ",(0,o.jsx)(s.code,{children:"LOCK TABLE"})," command is issued, Apache Cloudberry will lock tables on the coordinator only, rather than on the coordinator and all of the segments. This is particularly useful for metadata-only operations."]}),"\n",(0,o.jsxs)(s.p,{children:[(0,o.jsx)(s.strong,{children:"Note"})," This option is only supported in ",(0,o.jsx)(s.code,{children:"ACCESS SHARE MODE"}),"."]}),"\n",(0,o.jsx)(s.h2,{id:"notes",children:"Notes"}),"\n",(0,o.jsxs)(s.p,{children:[(0,o.jsx)(s.code,{children:"LOCK TABLE ... IN ACCESS SHARE MODE"})," requires ",(0,o.jsx)(s.code,{children:"SELECT"})," privileges on the target table. All other forms of ",(0,o.jsx)(s.code,{children:"LOCK"})," require table-level ",(0,o.jsx)(s.code,{children:"UPDATE"}),", ",(0,o.jsx)(s.code,{children:"DELETE"}),", or ",(0,o.jsx)(s.code,{children:"TRUNCATE"})," privileges."]}),"\n",(0,o.jsxs)(s.p,{children:[(0,o.jsx)(s.code,{children:"LOCK TABLE"})," is useless outside of a transaction block: the lock would be held only to the completion of the ",(0,o.jsx)(s.code,{children:"LOCK"})," statement. Therefore, Apache Cloudberry reports an error if ",(0,o.jsx)(s.code,{children:"LOCK"})," is used outside of a transaction block. Use ",(0,o.jsx)(s.code,{children:"BEGIN"})," and ",(0,o.jsx)(s.code,{children:"END"})," to define a transaction block."]}),"\n",(0,o.jsxs)(s.p,{children:[(0,o.jsx)(s.code,{children:"LOCK TABLE"})," only deals with table-level locks, and so the mode names involving ",(0,o.jsx)(s.code,{children:"ROW"})," are all misnomers. These mode names should generally be read as indicating the intention of the user to acquire row-level locks within the locked table. Also, ",(0,o.jsx)(s.code,{children:"ROW EXCLUSIVE"})," mode is a shareable table lock. Keep in mind that all the lock modes have identical semantics so far as ",(0,o.jsx)(s.code,{children:"LOCK TABLE"})," is concerned, differing only in the rules about which modes conflict with which. For information on how to acquire an actual row-level lock, see the ",(0,o.jsx)(s.code,{children:"FOR UPDATE/FOR SHARE"})," clause in the ",(0,o.jsx)(s.a,{href:"/docs/sql-stmts/select",children:"SELECT"})," reference documentation."]}),"\n",(0,o.jsx)(s.h2,{id:"examples",children:"Examples"}),"\n",(0,o.jsxs)(s.p,{children:["Obtain a ",(0,o.jsx)(s.code,{children:"SHARE"})," lock on the ",(0,o.jsx)(s.code,{children:"films"})," table when going to perform inserts into the ",(0,o.jsx)(s.code,{children:"films_user_comments"})," table:"]}),"\n",(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{className:"language-sql",children:"BEGIN WORK;\nLOCK TABLE films IN SHARE MODE;\nSELECT id FROM films\n    WHERE name = 'Star Wars: Episode I - The Phantom Menace';\n-- Do ROLLBACK if record was not returned\nINSERT INTO films_user_comments VALUES\n    (_id_, 'GREAT! I was waiting for it for so long!');\nCOMMIT WORK;\n"})}),"\n",(0,o.jsxs)(s.p,{children:["Take a ",(0,o.jsx)(s.code,{children:"SHARE ROW EXCLUSIVE"})," lock on a table when performing a delete operation:"]}),"\n",(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{className:"language-sql",children:"BEGIN WORK;\nLOCK TABLE films IN SHARE ROW EXCLUSIVE MODE;\nDELETE FROM films_user_comments WHERE id IN\n    (SELECT id FROM films WHERE rating < 5);\nDELETE FROM films WHERE rating < 5;\nCOMMIT WORK;\n"})}),"\n",(0,o.jsx)(s.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,o.jsxs)(s.p,{children:["There is no ",(0,o.jsx)(s.code,{children:"LOCK TABLE"})," in the SQL standard, which instead uses ",(0,o.jsx)(s.code,{children:"SET TRANSACTION"})," to specify concurrency levels on transactions. Apache Cloudberry supports that too; see ",(0,o.jsx)(s.a,{href:"/docs/sql-stmts/set-transaction",children:"SET TRANSACTION"})," for details."]}),"\n",(0,o.jsxs)(s.p,{children:["Except for ",(0,o.jsx)(s.code,{children:"ACCESS SHARE"}),", ",(0,o.jsx)(s.code,{children:"ACCESS EXCLUSIVE"}),", and ",(0,o.jsx)(s.code,{children:"SHARE UPDATE EXCLUSIVE"})," lock modes, the Apache Cloudberry lock modes and the ",(0,o.jsx)(s.code,{children:"LOCK TABLE"})," syntax are compatible with those present in Oracle."]}),"\n",(0,o.jsx)(s.h2,{id:"see-also",children:"See also"}),"\n",(0,o.jsxs)(s.p,{children:[(0,o.jsx)(s.a,{href:"/docs/sql-stmts/begin",children:"BEGIN"}),", ",(0,o.jsx)(s.a,{href:"/docs/sql-stmts/set-transaction",children:"SET TRANSACTION"}),", ",(0,o.jsx)(s.a,{href:"/docs/sql-stmts/select",children:"SELECT"})]})]})}function h(e={}){const{wrapper:s}={...(0,c.a)(),...e.components};return s?(0,o.jsx)(s,{...e,children:(0,o.jsx)(a,{...e})}):a(e)}},11151:(e,s,n)=>{n.d(s,{Z:()=>d,a:()=>t});var o=n(67294);const c={},i=o.createContext(c);function t(e){const s=o.useContext(i);return o.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function d(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(c):e.components||c:t(e.components),o.createElement(i.Provider,{value:s},e.children)}}}]);