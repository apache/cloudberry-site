"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[9853],{91978:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>h,frontMatter:()=>n,metadata:()=>r,toc:()=>c});var i=s(85893),a=s(11151);const n={title:"ANALYZE"},o="ANALYZE",r={id:"sql-stmts/analyze",title:"ANALYZE",description:"Collects statistics about a database.",source:"@site/docs/sql-stmts/analyze.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/analyze",permalink:"/zh/docs/sql-stmts/analyze",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/analyze.md",tags:[],version:"current",lastUpdatedBy:"dependabot[bot]",lastUpdatedAt:1744180221,formattedLastUpdatedAt:"2025\u5e744\u67089\u65e5",frontMatter:{title:"ANALYZE"},sidebar:"docsbars",previous:{title:"ALTER VIEW",permalink:"/zh/docs/sql-stmts/alter-view"},next:{title:"BEGIN",permalink:"/zh/docs/sql-stmts/begin"}},l={},c=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Notes",id:"notes",level:2},{value:"Examples",id:"examples",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function d(e){const t={a:"a",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,a.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h1,{id:"analyze",children:"ANALYZE"}),"\n",(0,i.jsx)(t.p,{children:"Collects statistics about a database."}),"\n",(0,i.jsx)(t.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-sql",children:"ANALYZE [VERBOSE] [SKIP_LOCKED] [<table> [ (<column> [, ...] ) ]]\n\nANALYZE [VERBOSE] [SKIP_LOCKED] {<root_partition_table_name>|<leaf_partition_table_name>} [ (<column> [, ...] )] \n\nANALYZE [VERBOSE] [SKIP_LOCKED] ROOTPARTITION {ALL | <root_partition_table_name> [ (<column> [, ...] )]}\n"})}),"\n",(0,i.jsx)(t.h2,{id:"description",children:"Description"}),"\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:"ANALYZE"})," collects statistics about the contents of tables in the database, and stores the results in the system table ",(0,i.jsx)(t.em,{children:"pg_statistic"}),". Subsequently, Apache Cloudberry uses these statistics to help determine the most efficient execution plans for queries. For information about the table statistics that are collected, see ",(0,i.jsx)(t.a,{href:"#notes",children:"Notes"}),"."]}),"\n",(0,i.jsxs)(t.p,{children:["With no parameter, ",(0,i.jsx)(t.code,{children:"ANALYZE"})," collects statistics for every table in the current database. You can specify a table name to collect statistics for a single table. You can specify a set of column names in a specific table, in which case the statistics only for those columns from that table are collected."]}),"\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:"ANALYZE"})," does not collect statistics on external tables."]}),"\n",(0,i.jsxs)(t.p,{children:["For partitioned tables, ",(0,i.jsx)(t.code,{children:"ANALYZE"})," collects additional statistics, HyperLogLog (HLL) statistics, on the leaf partitions. HLL statistics are used are used to derive number of distinct values (NDV) for queries against partitioned tables."]}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"When aggregating NDV estimates across multiple leaf partitions, HLL statistics generate a more accurate NDV estimates than the standard table statistics."}),"\n",(0,i.jsxs)(t.li,{children:["When updating HLL statistics, ",(0,i.jsx)(t.code,{children:"ANALYZE"})," operations are required only on leaf partitions that have changed. For example, ",(0,i.jsx)(t.code,{children:"ANALYZE"})," is required if the leaf partition data has changed, or if the leaf partition has been exchanged with another table. For more information about updating partitioned table statistics, see ",(0,i.jsx)(t.a,{href:"#notes",children:"Notes"}),"."]}),"\n"]}),"\n",(0,i.jsxs)(t.blockquote,{children:["\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.strong,{children:"Important"})," If you intend to run queries on partitioned tables with GPORCA enabled (the default), then you must collect statistics on the root partition of the partitioned table with the ",(0,i.jsx)(t.code,{children:"ANALYZE"})," or ",(0,i.jsx)(t.code,{children:"ANALYZE ROOTPARTITION"})," command. For information about collecting statistics on partitioned tables and when the ",(0,i.jsx)(t.code,{children:"ROOTPARTITION"})," keyword is required, see ",(0,i.jsx)(t.a,{href:"#notes",children:"Notes"}),". For information about GPORCA, see Overview of GPORCA in the ",(0,i.jsx)(t.em,{children:"Apache Cloudberry Administrator Guide"}),"."]}),"\n"]}),"\n",(0,i.jsxs)(t.blockquote,{children:["\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.strong,{children:"Note"})," You can also use the Apache Cloudberry utility ",(0,i.jsx)(t.code,{children:"analyzedb"})," to update table statistics. The ",(0,i.jsx)(t.code,{children:"analyzedb"})," utility can update statistics for multiple tables concurrently. The utility can also check table statistics and update statistics only if the statistics are not current or do not exist. For information about the utility, see the ",(0,i.jsx)(t.em,{children:"Apache Cloudberry Utility Guide"}),"."]}),"\n"]}),"\n",(0,i.jsx)(t.h2,{id:"parameters",children:"Parameters"}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:"{ root_partition_table_name | leaf_partition_table_name } [ (column [, ...] ) ]"})})}),"\n",(0,i.jsx)(t.p,{children:"Collect statistics for partitioned tables including HLL statistics. HLL statistics are collected only on leaf partitions."}),"\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:"ANALYZE root_partition_table_name"}),", collects statistics on all leaf partitions and the root partition."]}),"\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:"ANALYZE leaf_partition_table_name"}),", collects statistics on the leaf partition."]}),"\n",(0,i.jsxs)(t.p,{children:["By default, if you specify a leaf partition, and all other leaf partitions have statistics, ",(0,i.jsx)(t.code,{children:"ANALYZE"})," updates the root partition statistics. If not all leaf partitions have statistics, ",(0,i.jsx)(t.code,{children:"ANALYZE"})," logs information about the leaf partitions that do not have statistics. For information about when root partition statistics are collected, see ",(0,i.jsx)(t.a,{href:"#notes",children:"Notes"}),"."]}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:"ROOTPARTITION [ALL]"})})}),"\n",(0,i.jsxs)(t.p,{children:["Collect statistics only on the root partition of partitioned tables based on the data in the partitioned table. If possible, ",(0,i.jsx)(t.code,{children:"ANALYZE"})," uses leaf partition statistics to generate root partition statistics. Otherwise, ",(0,i.jsx)(t.code,{children:"ANALYZE"})," collects the statistics by sampling leaf partition data. Statistics are not collected on the leaf partitions, the data is only sampled. ",(0,i.jsx)(t.code,{children:"ALL"})," statistics are not collected."]}),"\n",(0,i.jsxs)(t.p,{children:["For information about when the ",(0,i.jsx)(t.code,{children:"ROOTPARTITION"})," keyword is required, see ",(0,i.jsx)(t.a,{href:"#notes",children:"Notes"}),"."]}),"\n",(0,i.jsxs)(t.p,{children:["When you specify ",(0,i.jsx)(t.code,{children:"ROOTPARTITION"}),", you must specify either ",(0,i.jsx)(t.code,{children:"ALL"})," or the name of a partitioned table."]}),"\n",(0,i.jsxs)(t.p,{children:["If you specify ",(0,i.jsx)(t.code,{children:"ALL"})," with ",(0,i.jsx)(t.code,{children:"ROOTPARTITION"}),", Apache Cloudberry collects statistics for the root partition of all partitioned tables in the database. If there are no partitioned tables in the database, a message stating that there are no partitioned tables is returned. For tables that are not partitioned tables, statistics are not collected."]}),"\n",(0,i.jsxs)(t.p,{children:["If you specify a table name with ",(0,i.jsx)(t.code,{children:"ROOTPARTITION"})," and the table is not a partitioned table, no statistics are collected for the table and a warning message is returned."]}),"\n",(0,i.jsxs)(t.p,{children:["The ",(0,i.jsx)(t.code,{children:"ROOTPARTITION"})," clause is not valid with ",(0,i.jsx)(t.code,{children:"VACUUM ANALYZE"}),". The command ",(0,i.jsx)(t.code,{children:"VACUUM ANALYZE ROOTPARTITION"})," returns an error."]}),"\n",(0,i.jsxs)(t.p,{children:["If all the leaf partitions have statistics, performing ",(0,i.jsx)(t.code,{children:"ANALYZE ROOTPARTITION"})," to generate root partition statistics should be quick (a few seconds depending on the number of partitions and table columns). If some of the leaf partitions do not have statistics, then all the table data is sampled to generate root partition statistics. Sampling table data takes longer and results in lower quality root partition statistics."]}),"\n",(0,i.jsxs)(t.p,{children:["For the partitioned table ",(0,i.jsx)(t.em,{children:"sales_curr_yr"}),", this example command collects statistics only on the root partition of the partitioned table."]}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:"ANALYZE ROOTPARTITION sales_curr_yr;"})})}),"\n",(0,i.jsxs)(t.p,{children:["This example ",(0,i.jsx)(t.code,{children:"ANALYZE"})," command collects statistics on the root partition of all the partitioned tables in the database."]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-sql",children:"ANALYZE ROOTPARTITION ALL;\n"})}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:"VERBOSE"})})}),"\n",(0,i.jsxs)(t.p,{children:["Enables display of progress messages. When specified, ",(0,i.jsx)(t.code,{children:"ANALYZE"})," emits this information"]}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"The table that is being processed."}),"\n",(0,i.jsx)(t.li,{children:"The query that is run to generate the sample table."}),"\n",(0,i.jsx)(t.li,{children:"The column for which statistics is being computed."}),"\n",(0,i.jsx)(t.li,{children:"The queries that are issued to collect the different statistics for a single column."}),"\n",(0,i.jsx)(t.li,{children:"The statistics that are collected."}),"\n"]}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:"SKIP_LOCKED"})})}),"\n",(0,i.jsxs)(t.p,{children:["Specifies that ",(0,i.jsx)(t.code,{children:"ANALYZE"})," should not wait for any conflicting locks to be released when beginning work on a relation: if it cannot lock a relation immediately without waiting, it skips the relation. Note that even with this option, ",(0,i.jsx)(t.code,{children:"ANALYZE"})," may still block when opening the relation's indexes or when acquiring sample rows from partitions, table inheritance children, and some types of foreign tables. Also, while ",(0,i.jsx)(t.code,{children:"ANALYZE"})," ordinarily processes all partitions of specified partitioned tables, this option will cause ",(0,i.jsx)(t.code,{children:"ANALYZE"})," to skip all partitions if there is a conflicting lock on the partitioned table."]}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:"table"})})}),"\n",(0,i.jsx)(t.p,{children:"The name (possibly schema-qualified) of a specific table to analyze. If omitted, all regular tables (but not foreign tables) in the current database are analyzed."}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:"column"})})}),"\n",(0,i.jsx)(t.p,{children:"The name of a specific column to analyze. Defaults to all columns."}),"\n",(0,i.jsx)(t.h2,{id:"notes",children:"Notes"}),"\n",(0,i.jsxs)(t.p,{children:["Foreign tables are analyzed only when explicitly selected. Not all foreign data wrappers support ",(0,i.jsx)(t.code,{children:"ANALYZE"}),". If the table's wrapper does not support ",(0,i.jsx)(t.code,{children:"ANALYZE"}),", the command prints a warning and does nothing."]}),"\n",(0,i.jsxs)(t.p,{children:["It is a good idea to run ",(0,i.jsx)(t.code,{children:"ANALYZE"})," periodically, or just after making major changes in the contents of a table. Accurate statistics helps Apache Cloudberry choose the most appropriate query plan, and thereby improve the speed of query processing. A common strategy for read-mostly databases is to run ",(0,i.jsx)(t.a,{href:"/zh/docs/sql-stmts/vacuum",children:"VACUUM"})," and ",(0,i.jsx)(t.code,{children:"ANALYZE"})," once a day during a low-usage time of day. (This will not be sufficient if there is heavy update activity.) You can check for tables with missing statistics using the ",(0,i.jsx)(t.code,{children:"gp_stats_missing"})," view, which is in the ",(0,i.jsx)(t.code,{children:"gp_toolkit"})," schema:"]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-sql",children:"SELECT * from gp_toolkit.gp_stats_missing;\n"})}),"\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:"ANALYZE"})," requires ",(0,i.jsx)(t.code,{children:"SHARE UPDATE EXCLUSIVE"})," lock on the target table. This lock conflicts with these locks: ",(0,i.jsx)(t.code,{children:"SHARE UPDATE EXCLUSIVE"}),", ",(0,i.jsx)(t.code,{children:"SHARE"}),", ",(0,i.jsx)(t.code,{children:"SHARE ROW EXCLUSIVE"}),", ",(0,i.jsx)(t.code,{children:"EXCLUSIVE"}),", ",(0,i.jsx)(t.code,{children:"ACCESS EXCLUSIVE"}),"."]}),"\n",(0,i.jsxs)(t.p,{children:["If you run ",(0,i.jsx)(t.code,{children:"ANALYZE"})," on a table that does not contain data, statistics are not collected for the table. For example, if you perform a ",(0,i.jsx)(t.code,{children:"TRUNCATE"})," operation on a table that has statistics, and then run ",(0,i.jsx)(t.code,{children:"ANALYZE"})," on the table, the statistics do not change."]}),"\n",(0,i.jsx)(t.p,{children:"For a partitioned table, specifying which portion of the table to analyze, the root partition or sub-partitions (leaf partitions) can be useful if the partitioned table has a large number of partitions that have been analyzed and only a few leaf partitions have changed."}),"\n",(0,i.jsxs)(t.blockquote,{children:["\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.strong,{children:"Note"})," When you create a partitioned table with the ",(0,i.jsx)(t.code,{children:"CREATE TABLE"})," command, Apache Cloudberry creates the table that you specify (the root partition or parent table), and also creates a hierarchy of tables based on the partition hierarchy that you specified (the child tables)."]}),"\n"]}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsxs)(t.li,{children:["\n",(0,i.jsxs)(t.p,{children:["When you run ",(0,i.jsx)(t.code,{children:"ANALYZE"})," on the root partitioned table, statistics are collected for all the leaf partitions. Leaf partitions are the lowest-level tables in the hierarchy of child tables created by Apache Cloudberry for use by the partitioned table."]}),"\n"]}),"\n",(0,i.jsxs)(t.li,{children:["\n",(0,i.jsxs)(t.p,{children:["When you run ",(0,i.jsx)(t.code,{children:"ANALYZE"})," on a leaf partition, statistics are collected only for that leaf partition and the root partition. If data in the leaf partition has changed (for example, you made significant updates to the leaf partition data or you exchanged the leaf partition), then you can run ANALYZE on the leaf partition to collect table statistics. By default, if all other leaf partitions have statistics, the command updates the root partition statistics."]}),"\n",(0,i.jsxs)(t.p,{children:["For example, if you collected statistics on a partitioned table with a large number partitions and then updated data in only a few leaf partitions, you can run ",(0,i.jsx)(t.code,{children:"ANALYZE"})," only on those partitions to update statistics on the partitions and the statistics on the root partition."]}),"\n"]}),"\n",(0,i.jsxs)(t.li,{children:["\n",(0,i.jsxs)(t.p,{children:["When you run ",(0,i.jsx)(t.code,{children:"ANALYZE"})," on a child table that is not a leaf partition, statistics are not collected."]}),"\n",(0,i.jsxs)(t.p,{children:["For example, you can create a partitioned table with partitions for the years 2006 to 2016 and sub-partitions for each month in each year. If you run ",(0,i.jsx)(t.code,{children:"ANALYZE"})," on the child table for the year 2013 no statistics are collected. If you run ",(0,i.jsx)(t.code,{children:"ANALYZE"})," on the leaf partition for March of 2013, statistics are collected only for that leaf partition."]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(t.p,{children:["For a partitioned table that contains a leaf partition that has been exchanged to use an external table, ",(0,i.jsx)(t.code,{children:"ANALYZE"})," does not collect statistics for the external table partition:"]}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsxs)(t.li,{children:["If ",(0,i.jsx)(t.code,{children:"ANALYZE"})," is run on an external table partition, the partition is not analyzed."]}),"\n",(0,i.jsxs)(t.li,{children:["If ",(0,i.jsx)(t.code,{children:"ANALYZE"})," or ",(0,i.jsx)(t.code,{children:"ANALYZE ROOTPARTITION"})," is run on the root partition, external table partitions are not sampled and root table statistics do not include external table partition."]}),"\n",(0,i.jsxs)(t.li,{children:["If the ",(0,i.jsx)(t.code,{children:"VERBOSE"})," clause is specified, an informational message is displayed: ",(0,i.jsx)(t.code,{children:"skipping external table"}),"."]}),"\n"]}),"\n",(0,i.jsxs)(t.p,{children:["The Apache Cloudberry server configuration parameter optimizer_analyze_root_partition determines when statistics are collected on a root partitioned table. If the parameter is ",(0,i.jsx)(t.code,{children:"on"})," (the default), the ",(0,i.jsx)(t.code,{children:"ROOTPARTITION"})," keyword is not required to collect statistics on the root partition when you run ",(0,i.jsx)(t.code,{children:"ANALYZE"}),". Root partition statistics are collected when you run ",(0,i.jsx)(t.code,{children:"ANALYZE"})," on the root partition, or when you run ",(0,i.jsx)(t.code,{children:"ANALYZE"})," on a leaf partition of the partitioned table and the other leaf partitions have statistics. If the parameter is ",(0,i.jsx)(t.code,{children:"off"}),", you must run ",(0,i.jsx)(t.code,{children:"ANALZYE ROOTPARTITION"})," to collect root partition statistics."]}),"\n",(0,i.jsxs)(t.p,{children:["The statistics collected by ",(0,i.jsx)(t.code,{children:"ANALYZE"})," usually include a list of some of the most common values in each column and a histogram showing the approximate data distribution in each column. One or both of these may be omitted if ",(0,i.jsx)(t.code,{children:"ANALYZE"})," deems them uninteresting (for example, in a unique-key column, there are no common values) or if the column data type does not support the appropriate operators."]}),"\n",(0,i.jsxs)(t.p,{children:["For large tables, ",(0,i.jsx)(t.code,{children:"ANALYZE"})," takes a random sample of the table contents, rather than examining every row. This allows even very large tables to be analyzed in a small amount of time. Note, however, that the statistics are only approximate, and will change slightly each time ",(0,i.jsx)(t.code,{children:"ANALYZE"})," is run, even if the actual table contents did not change. This may result in small changes in the planner's estimated costs shown by ",(0,i.jsx)(t.code,{children:"EXPLAIN"}),". In rare situations, this non-determinism will cause the query optimizer to choose a different query plan between runs of ",(0,i.jsx)(t.code,{children:"ANALYZE"}),". To avoid this, raise the amount of statistics collected by ",(0,i.jsx)(t.code,{children:"ANALYZE"})," by adjusting the default_statistics_target configuration parameter, or on a column-by-column basis by setting the per-column statistics target with ",(0,i.jsx)(t.code,{children:"ALTER TABLE ... ALTER COLUMN ... SET (n_distinct ...)"})," (see ",(0,i.jsx)(t.code,{children:"ALTER TABLE"}),"). The target value sets the maximum number of entries in the most-common-value list and the maximum number of bins in the histogram. The default target value is 100, but this can be adjusted up or down to trade off accuracy of planner estimates against the time taken for ",(0,i.jsx)(t.code,{children:"ANALYZE"})," and the amount of space occupied in ",(0,i.jsx)(t.code,{children:"pg_statistic"}),". In particular, setting the statistics target to zero deactivates collection of statistics for that column. It may be useful to do that for columns that are never used as part of the ",(0,i.jsx)(t.code,{children:"WHERE"}),", ",(0,i.jsx)(t.code,{children:"GROUP BY"}),", or ",(0,i.jsx)(t.code,{children:"ORDER BY"})," clauses of queries, since the planner will have no use for statistics on such columns."]}),"\n",(0,i.jsxs)(t.p,{children:["The largest statistics target among the columns being analyzed determines the number of table rows sampled to prepare the statistics. Increasing the target causes a proportional increase in the time and space needed to do ",(0,i.jsx)(t.code,{children:"ANALYZE"}),"."]}),"\n",(0,i.jsxs)(t.p,{children:["One of the values estimated by ",(0,i.jsx)(t.code,{children:"ANALYZE"})," is the number of distinct values that appear in each column. Because only a subset of the rows are examined, this estimate can sometimes be quite inaccurate, even with the largest possible statistics target. If this inaccuracy leads to bad query plans, a more accurate value can be determined manually and then installed with ",(0,i.jsx)(t.code,{children:"ALTER TABLE ... ALTER COLUMN ... SET STATISTICS DISTINCT"})," (see ",(0,i.jsx)(t.a,{href:"/zh/docs/sql-stmts/alter-table",children:"ALTER TABLE"}),")."]}),"\n",(0,i.jsxs)(t.p,{children:["When Apache Cloudberry performs an ",(0,i.jsx)(t.code,{children:"ANALYZE"})," operation to collect statistics for a table and detects that all the sampled table data pages are empty (do not contain valid data), Apache Cloudberry displays a message that a ",(0,i.jsx)(t.code,{children:"VACUUM FULL"})," operation should be performed. If the sampled pages are empty, the table statistics will be inaccurate. Pages become empty after a large number of changes to the table, for example deleting a large number of rows. A ",(0,i.jsx)(t.code,{children:"VACUUM FULL"})," operation removes the empty pages and allows an ",(0,i.jsx)(t.code,{children:"ANALYZE"})," operation to collect accurate statistics."]}),"\n",(0,i.jsxs)(t.p,{children:["If there are no statistics for the table, the server configuration parameter gp_enable_relsize_collection controls whether the Postgres Planner uses a default statistics file or estimates the size of a table using the ",(0,i.jsx)(t.code,{children:"pg_relation_size"})," function. By default, the Postgres Planner uses the default statistics file to estimate the number of rows if statistics are not available."]}),"\n",(0,i.jsx)(t.h2,{id:"examples",children:"Examples"}),"\n",(0,i.jsxs)(t.p,{children:["Collect statistics for the table ",(0,i.jsx)(t.code,{children:"mytable"}),":"]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-sql",children:"ANALYZE mytable;\n"})}),"\n",(0,i.jsx)(t.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,i.jsxs)(t.p,{children:["There is no ",(0,i.jsx)(t.code,{children:"ANALYZE"})," statement in the SQL standard."]}),"\n",(0,i.jsx)(t.h2,{id:"see-also",children:"See also"}),"\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.a,{href:"/zh/docs/sql-stmts/alter-table",children:"ALTER TABLE"}),", ",(0,i.jsx)(t.a,{href:"/zh/docs/sql-stmts/explain",children:"EXPLAIN"}),", ",(0,i.jsx)(t.a,{href:"/zh/docs/sql-stmts/vacuum",children:"VACUUM"}),", analyzedb."]})]})}function h(e={}){const{wrapper:t}={...(0,a.a)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},11151:(e,t,s)=>{s.d(t,{Z:()=>r,a:()=>o});var i=s(67294);const a={},n=i.createContext(a);function o(e){const t=i.useContext(n);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:o(e.components),i.createElement(n.Provider,{value:t},e.children)}}}]);