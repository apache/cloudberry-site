"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[269],{59152:(e,s,t)=>{t.r(s),t.d(s,{assets:()=>l,contentTitle:()=>o,default:()=>h,frontMatter:()=>i,metadata:()=>r,toc:()=>c});var n=t(85893),a=t(11151);const i={title:"VACUUM"},o="VACUUM",r={id:"sql-stmts/vacuum",title:"VACUUM",description:"Garbage-collects and optionally analyzes a database.",source:"@site/docs/sql-stmts/vacuum.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/vacuum",permalink:"/docs/sql-stmts/vacuum",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/vacuum.md",tags:[],version:"current",lastUpdatedBy:"Dianjin Wang",lastUpdatedAt:1733912691,formattedLastUpdatedAt:"Dec 11, 2024",frontMatter:{title:"VACUUM"},sidebar:"docsbars",previous:{title:"UPDATE",permalink:"/docs/sql-stmts/update"},next:{title:"VALUES",permalink:"/docs/sql-stmts/values"}},l={},c=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Notes",id:"notes",level:2},{value:"Examples",id:"examples",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function d(e){const s={a:"a",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,a.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.h1,{id:"vacuum",children:"VACUUM"}),"\n",(0,n.jsx)(s.p,{children:"Garbage-collects and optionally analyzes a database."}),"\n",(0,n.jsx)(s.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"VACUUM [({ FULL | FREEZE | VERBOSE | ANALYZE | DISABLE_PAGE_SKIPPING | SKIP_LOCKED | INDEX_CLEANUP } [, ...])] [<table> [(<column> [, ...] )]]\n        \nVACUUM [FULL] [FREEZE] [VERBOSE] [<table>]\n\nVACUUM [FULL] [FREEZE] [VERBOSE] ANALYZE\n\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0[<table> [(<column> [, ...] )]]\n\nVACUUM AO_AUX_ONLY <ao_table>\n"})}),"\n",(0,n.jsx)(s.h2,{id:"description",children:"Description"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"VACUUM"})," reclaims storage occupied by deleted tuples. In normal Cloudberry Database operation, tuples that are deleted or obsoleted by an update are not physically removed from their table; they remain present on disk until a ",(0,n.jsx)(s.code,{children:"VACUUM"})," is done. Therefore it is necessary to do ",(0,n.jsx)(s.code,{children:"VACUUM"})," periodically, especially on frequently-updated tables."]}),"\n",(0,n.jsxs)(s.p,{children:["With no parameter, ",(0,n.jsx)(s.code,{children:"VACUUM"})," processes every table in the current database. With a parameter, ",(0,n.jsx)(s.code,{children:"VACUUM"})," processes only that table."]}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"VACUUM ANALYZE"})," performs a ",(0,n.jsx)(s.code,{children:"VACUUM"})," and then an ",(0,n.jsx)(s.code,{children:"ANALYZE"})," for each selected table. This is a handy combination form for routine maintenance scripts. See ",(0,n.jsx)(s.a,{href:"/docs/sql-stmts/analyze",children:"ANALYZE"})," for more details about its processing."]}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"VACUUM"})," (without ",(0,n.jsx)(s.code,{children:"FULL"}),") marks deleted and obsoleted data in tables and indexes for future reuse and reclaims space for re-use only if the space is at the end of the table and an exclusive table lock can be easily obtained. Unused space at the start or middle of a table remains as is. With heap tables, this form of the command can operate in parallel with normal reading and writing of the table, as an exclusive lock is not obtained. However, extra space is not returned to the operating system (in most cases); it's just kept available for re-use within the same table. ",(0,n.jsx)(s.code,{children:"VACUUM FULL"})," rewrites the entire contents of the table into a new disk file with no extra space, allowing unused space to be returned to the operating system. This form is much slower and requires an exclusive lock on each table while it is being processed."]}),"\n",(0,n.jsxs)(s.p,{children:["With append-optimized tables, ",(0,n.jsx)(s.code,{children:"VACUUM"})," compacts a table by first vacuuming the indexes, then compacting each segment file in turn, and finally vacuuming auxiliary relations and updating statistics. On each segment, visible rows are copied from the current segment file to a new segment file, and then the current segment file is scheduled to be dropped and the new segment file is made available. Plain ",(0,n.jsx)(s.code,{children:"VACUUM"})," of an append-optimized table allows scans, inserts, deletes, and updates of the table while a segment file is compacted. However, an Access Exclusive lock is taken briefly to drop the current segment file and activate the new segment file."]}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"VACUUM FULL"})," does more extensive processing, including moving of tuples across blocks to try to compact the table to the minimum number of disk blocks. This form is much slower and requires an Access Exclusive lock on each table while it is being processed. The Access Exclusive lock guarantees that the holder is the only transaction accessing the table in any way."]}),"\n",(0,n.jsx)(s.p,{children:"When the option list is surrounded by parentheses, the options can be written in any order. Without parentheses, options must be specified in exactly the order shown above. The parenthesized syntax was added in Cloudberry Database 6.0; the unparenthesized syntax is deprecated."}),"\n",(0,n.jsxs)(s.blockquote,{children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.strong,{children:"Important"}),": For information on the use of ",(0,n.jsx)(s.code,{children:"VACUUM"}),", ",(0,n.jsx)(s.code,{children:"VACUUM FULL"}),", and ",(0,n.jsx)(s.code,{children:"VACUUM ANALYZE"}),", see ",(0,n.jsx)(s.a,{href:"#notes",children:"Notes"}),"."]}),"\n"]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:"Outputs"})}),"\n",(0,n.jsxs)(s.p,{children:["When ",(0,n.jsx)(s.code,{children:"VERBOSE"})," is specified, ",(0,n.jsx)(s.code,{children:"VACUUM"})," emits progress messages to indicate which table is currently being processed. Various statistics about the tables are printed as well."]}),"\n",(0,n.jsx)(s.h2,{id:"parameters",children:"Parameters"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"FULL"})})}),"\n",(0,n.jsx)(s.p,{children:"Selects a full vacuum, which may reclaim more space, but takes much longer and exclusively locks the table. This method also requires extra disk space, since it writes a new copy of the table and doesn't release the old copy until the operation is complete. Usually this should only be used when a significant amount of space needs to be reclaimed from within the table."}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"FREEZE"})})}),"\n",(0,n.jsxs)(s.p,{children:["Specifying ",(0,n.jsx)(s.code,{children:"FREEZE"})," is equivalent to performing ",(0,n.jsx)(s.code,{children:"VACUUM"})," with the ",(0,n.jsx)(s.code,{children:"vacuum_freeze_min_age"})," server configuration parameter set to zero. See Server Configuration Parameters for information about ",(0,n.jsx)(s.code,{children:"vacuum_freeze_min_age"}),"."]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"VERBOSE"})})}),"\n",(0,n.jsx)(s.p,{children:"Prints a detailed vacuum activity report for each table."}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"ANALYZE"})})}),"\n",(0,n.jsx)(s.p,{children:"Updates statistics used by the planner to determine the most efficient way to run a query."}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"DISABLE_PAGE_SKIPPING"})})}),"\n",(0,n.jsxs)(s.p,{children:["Normally, ",(0,n.jsx)(s.code,{children:"VACUUM"})," skips pages based on the visibility map. It always skips pages where all tuples are known to be frozen, and skips those where all tuples are known to be visible to all transactions except when performing an aggressive vacuum. Furthermore, except when performing an aggressive vacuum, it skips some pages in order to avoid waiting for other sessions to finish using them. This option disables all page-skipping behavior, you may use this option only when the contents of the visibility map are suspect, which should happen only if there is a hardware or software issue causing database corruption."]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"SKIP_LOCKED"})})}),"\n",(0,n.jsxs)(s.p,{children:["Specifies that ",(0,n.jsx)(s.code,{children:"VACUUM"})," should not wait for any conflicting locks to be released when beginning work on a relation: if it cannot lock a relation immediately without waiting, it skips the relation. Note that even with this option, ",(0,n.jsx)(s.code,{children:"VACUUM"})," may still block when opening the relation's indexes. Additionally, ",(0,n.jsx)(s.code,{children:"VACUUM ANALYZE"})," may still block when acquiring sample rows from partitions, table inheritance children, and some types of foreign tables. Also, while ",(0,n.jsx)(s.code,{children:"VACUUM"})," ordinarily processes all partitions of specified partitioned tables, this option will cause ",(0,n.jsx)(s.code,{children:"VACUUM"})," to skip all partitions if there is a conflicting lock on the partitioned table."]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"INDEX_CLEANUP"})})}),"\n",(0,n.jsxs)(s.p,{children:["Specifies that ",(0,n.jsx)(s.code,{children:"VACUUM"})," should attempt to remove index entries pointing to dead tuples. This is normally the desired behavior and is the default unless you override it by setting ",(0,n.jsx)(s.code,{children:"vacuum_index_cleanup"})," to ",(0,n.jsx)(s.code,{children:"false"})," for the table you run ",(0,n.jsx)(s.code,{children:"VACUUM"})," against. Setting this option to ",(0,n.jsx)(s.code,{children:"false"})," may be useful when you need to make vacuum run as quickly as possible, for example, to avoid imminent transaction ID wraparound. However, if you do not perform index cleanup regularly, performance may suffer, because as the table is modified, indexes accumulate dead tuples and the table itself accumulates dead line pointers that cannot be removed until index cleanup completes. This option has no effect for tables that do not have an index. If you use the ",(0,n.jsx)(s.code,{children:"FULL"})," option, it will ignore the ",(0,n.jsx)(s.code,{children:"INDEX_CLEANUP"})," option."]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"AO_AUX_ONLY"})})}),"\n",(0,n.jsxs)(s.p,{children:["Runs ",(0,n.jsx)(s.code,{children:"VACUUM"})," against all auxiliary tables of an append-optimized table. It does not run ",(0,n.jsx)(s.code,{children:"VACUUM"})," against the append-optimized table. If run against a non append-optimized table without any child partitions, no action takes place. If run against a heap table with an append-optimized partition, it vacuums the auxiliary tables of this partition."]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"<ao_table>"})})}),"\n",(0,n.jsx)(s.p,{children:"The name of a table to vacuum its auxiliary tables, ideally an append-optimized table."}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"<table>"})})}),"\n",(0,n.jsx)(s.p,{children:"The name (optionally schema-qualified) of a specific table to vacuum. Defaults to all tables in the current database."}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"<column>"})})}),"\n",(0,n.jsxs)(s.p,{children:["The name of a specific column to analyze. Defaults to all columns. If a column list is specified, ",(0,n.jsx)(s.code,{children:"ANALYZE"})," is implied."]}),"\n",(0,n.jsx)(s.h2,{id:"notes",children:"Notes"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"VACUUM"})," cannot be run inside a transaction block."]}),"\n",(0,n.jsxs)(s.p,{children:["Vacuum active databases frequently (at least nightly), in order to remove expired rows. After adding or deleting a large number of rows, running the ",(0,n.jsx)(s.code,{children:"VACUUM ANALYZE"})," command for the affected table might be useful. This updates the system catalogs with the results of all recent changes, and allows the Cloudberry Database query optimizer to make better choices in planning queries."]}),"\n",(0,n.jsxs)(s.blockquote,{children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.strong,{children:"Important"})," PostgreSQL has a separate optional server process called the ",(0,n.jsx)(s.em,{children:"autovacuum daemon"}),", whose purpose is to automate the execution of ",(0,n.jsx)(s.code,{children:"VACUUM"})," and ",(0,n.jsx)(s.code,{children:"ANALYZE"})," commands. Cloudberry Database enables the autovacuum daemon to perform ",(0,n.jsx)(s.code,{children:"VACUUM"})," operations only on the Cloudberry Database template database ",(0,n.jsx)(s.code,{children:"template0"}),". Autovacuum is enabled for ",(0,n.jsx)(s.code,{children:"template0"})," because connections are not allowed to ",(0,n.jsx)(s.code,{children:"template0"}),". The autovacuum daemon performs ",(0,n.jsx)(s.code,{children:"VACUUM"})," operations on ",(0,n.jsx)(s.code,{children:"template0"})," to manage transaction IDs (XIDs) and help avoid transaction ID wraparound issues in ",(0,n.jsx)(s.code,{children:"template0"}),"."]}),"\n"]}),"\n",(0,n.jsxs)(s.p,{children:["Manual ",(0,n.jsx)(s.code,{children:"VACUUM"})," operations must be performed in user-defined databases to manage transaction IDs (XIDs) in those databases."]}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"VACUUM"})," causes a substantial increase in I/O traffic, which can cause poor performance for other active sessions. Therefore, it is advisable to vacuum the database at low usage times."]}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"VACUUM"})," commands skip external and foreign tables."]}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"VACUUM FULL"})," reclaims all expired row space, however it requires an exclusive lock on each table being processed, is a very expensive operation, and might take a long time to complete on large, distributed Cloudberry Database tables. Perform ",(0,n.jsx)(s.code,{children:"VACUUM FULL"})," operations during database maintenance periods."]}),"\n",(0,n.jsxs)(s.p,{children:["The ",(0,n.jsx)(s.code,{children:"FULL"})," option is not recommended for routine use, but might be useful in special cases. An example is when you have deleted or updated most of the rows in a table and would like the table to physically shrink to occupy less disk space and allow faster table scans. ",(0,n.jsx)(s.code,{children:"VACUUM FULL"})," will usually shrink the table more than a plain ",(0,n.jsx)(s.code,{children:"VACUUM"})," would."]}),"\n",(0,n.jsxs)(s.p,{children:["As an alternative to ",(0,n.jsx)(s.code,{children:"VACUUM FULL"}),", you can re-create the table with a ",(0,n.jsx)(s.code,{children:"CREATE TABLE AS"})," statement and drop the old table."]}),"\n",(0,n.jsxs)(s.p,{children:["For append-optimized tables, ",(0,n.jsx)(s.code,{children:"VACUUM"})," requires enough available disk space to accommodate the new segment file during the ",(0,n.jsx)(s.code,{children:"VACUUM"})," process. If the ratio of hidden rows to total rows in a segment file is less than a threshold value (10, by default), the segment file is not compacted. The threshold value can be configured with the ",(0,n.jsx)(s.code,{children:"gp_appendonly_compaction_threshold"})," server configuration parameter. ",(0,n.jsx)(s.code,{children:"VACUUM FULL"})," ignores the threshold and rewrites the segment file regardless of the ratio. ",(0,n.jsx)(s.code,{children:"VACUUM"})," can be deactivated for append-optimized tables using the ",(0,n.jsx)(s.code,{children:"gp_appendonly_compaction"})," server configuration parameter. See Server Configuration Parameters for information about the server configuration parameters."]}),"\n",(0,n.jsx)(s.p,{children:'If a concurrent serializable transaction is detected when an append-optimized table is being vacuumed, the current and subsequent segment files are not compacted. If a segment file has been compacted but a concurrent serializable transaction is detected in the transaction that drops the original segment file, the drop is skipped. This could leave one or two segment files in an "awaiting drop" state after the vacuum has completed.'}),"\n",(0,n.jsx)(s.h2,{id:"examples",children:"Examples"}),"\n",(0,n.jsxs)(s.p,{children:["To clean a single table ",(0,n.jsx)(s.code,{children:"onek"}),", analyze it for the optimizer and print a detailed vacuum activity report:"]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"VACUUM (VERBOSE, ANALYZE) onek;\n"})}),"\n",(0,n.jsx)(s.p,{children:"Vacuum all tables in the current database:"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"VACUUM;\n"})}),"\n",(0,n.jsx)(s.p,{children:"Vacuum a specific table only:"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"VACUUM (VERBOSE, ANALYZE) mytable;\n"})}),"\n",(0,n.jsx)(s.p,{children:"Vacuum all tables in the current database and collect statistics for the query optimizer:"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"VACUUM ANALYZE;\n"})}),"\n",(0,n.jsx)(s.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,n.jsxs)(s.p,{children:["There is no ",(0,n.jsx)(s.code,{children:"VACUUM"})," statement in the SQL standard."]}),"\n",(0,n.jsx)(s.h2,{id:"see-also",children:"See also"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.a,{href:"/docs/sql-stmts/analyze",children:"ANALYZE"})})]})}function h(e={}){const{wrapper:s}={...(0,a.a)(),...e.components};return s?(0,n.jsx)(s,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}},11151:(e,s,t)=>{t.d(s,{Z:()=>r,a:()=>o});var n=t(67294);const a={},i=n.createContext(a);function o(e){const s=n.useContext(i);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function r(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:o(e.components),n.createElement(i.Provider,{value:s},e.children)}}}]);