"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[436],{54287:(e,a,n)=>{n.r(a),n.d(a,{assets:()=>c,contentTitle:()=>r,default:()=>h,frontMatter:()=>i,metadata:()=>l,toc:()=>d});var t=n(85893),s=n(11151);const i={title:"Use Dynamic Tables"},r="Use Dynamic Tables to Speed Up Queries and Auto-Refresh Data",l={id:"performance/use-dynamic-tables",title:"Use Dynamic Tables",description:"Dynamic tables are database objects similar to materialized views that refresh data automatically and speed up queries. Apache Cloudberry introduces dynamic tables to make query processing faster and data updates automatic.",source:"@site/docs/performance/use-dynamic-tables.md",sourceDirName:"performance",slug:"/performance/use-dynamic-tables",permalink:"/docs/performance/use-dynamic-tables",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/performance/use-dynamic-tables.md",tags:[],version:"current",lastUpdatedBy:"Dianjin Wang",lastUpdatedAt:1742268909,formattedLastUpdatedAt:"Mar 18, 2025",frontMatter:{title:"Use Dynamic Tables"},sidebar:"docsbars",previous:{title:"Resource Groups",permalink:"/docs/performance/manage-resources-using-resource-groups"},next:{title:"Security and Permission",permalink:"/docs/security/"}},c={},d=[{value:"Use cases",id:"use-cases",level:2},{value:"Comparison with materialized views",id:"comparison-with-materialized-views",level:2},{value:"Usage",id:"usage",level:2},{value:"Create a dynamic table",id:"create-a-dynamic-table",level:3},{value:"Refresh a dynamic table",id:"refresh-a-dynamic-table",level:3},{value:"View schedule information",id:"view-schedule-information",level:3},{value:"Drop a dynamic table",id:"drop-a-dynamic-table",level:3},{value:"View distribution key",id:"view-distribution-key",level:3},{value:"Examples",id:"examples",level:2},{value:"Example 1: Accelerate external table queries in lake-house architecture",id:"example-1-accelerate-external-table-queries-in-lake-house-architecture",level:3},{value:"Example 2: Create an empty dynamic table",id:"example-2-create-an-empty-dynamic-table",level:3},{value:"Notes",id:"notes",level:2}];function o(e){const a={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,s.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(a.h1,{id:"use-dynamic-tables-to-speed-up-queries-and-auto-refresh-data",children:"Use Dynamic Tables to Speed Up Queries and Auto-Refresh Data"}),"\n",(0,t.jsx)(a.p,{children:"Dynamic tables are database objects similar to materialized views that refresh data automatically and speed up queries. Apache Cloudberry introduces dynamic tables to make query processing faster and data updates automatic."}),"\n",(0,t.jsx)(a.p,{children:"Dynamic tables can be created from base tables, external tables, or materialized views. They update data automatically based on a schedule, keeping the data current."}),"\n",(0,t.jsx)(a.h2,{id:"use-cases",children:"Use cases"}),"\n",(0,t.jsx)(a.p,{children:"Dynamic tables are suitable for these scenarios:"}),"\n",(0,t.jsxs)(a.ul,{children:["\n",(0,t.jsxs)(a.li,{children:[(0,t.jsx)(a.strong,{children:"Faster queries in lakehouse setups"}),": Replace external table queries with dynamic table queries to improve performance."]}),"\n",(0,t.jsxs)(a.li,{children:[(0,t.jsx)(a.strong,{children:"Automatic data updates"}),": Schedule refresh tasks to keep data updated without manual effort."]}),"\n",(0,t.jsxs)(a.li,{children:[(0,t.jsx)(a.strong,{children:"Real-time analysis"}),": Do well for scenarios that need frequent and up-to-date queries, such as financial analysis or operations monitoring."]}),"\n"]}),"\n",(0,t.jsx)(a.h2,{id:"comparison-with-materialized-views",children:"Comparison with materialized views"}),"\n",(0,t.jsxs)(a.p,{children:["Dynamic tables and ",(0,t.jsx)(a.a,{href:"/docs/performance/use-auto-materialized-view-to-answer-queries",children:"Answer Query Using Materialized Views"})," have these differences:"]}),"\n",(0,t.jsxs)(a.table,{children:[(0,t.jsx)(a.thead,{children:(0,t.jsxs)(a.tr,{children:[(0,t.jsx)(a.th,{children:(0,t.jsx)(a.strong,{children:"Feature"})}),(0,t.jsx)(a.th,{children:"Dynamic table"}),(0,t.jsx)(a.th,{children:"AQUMV"})]})}),(0,t.jsxs)(a.tbody,{children:[(0,t.jsxs)(a.tr,{children:[(0,t.jsx)(a.td,{children:(0,t.jsx)(a.strong,{children:"Purpose"})}),(0,t.jsx)(a.td,{children:"A special table that automatically refreshes, processes data pipelines, and simplifies ETL."}),(0,t.jsx)(a.td,{children:"Uses materialized views to improve query efficiency and automatically rewrite queries."})]}),(0,t.jsxs)(a.tr,{children:[(0,t.jsx)(a.td,{children:(0,t.jsx)(a.strong,{children:"Base and structure"})}),(0,t.jsx)(a.td,{children:"Can be based on ordinary tables, external tables, materialized views."}),(0,t.jsx)(a.td,{children:"Based on materialized views, usually targeting a single table."})]}),(0,t.jsxs)(a.tr,{children:[(0,t.jsx)(a.td,{children:(0,t.jsx)(a.strong,{children:"Query rewrite"})}),(0,t.jsx)(a.td,{children:"Not supported"}),(0,t.jsx)(a.td,{children:"Supports single-table rewrite"})]}),(0,t.jsxs)(a.tr,{children:[(0,t.jsx)(a.td,{children:(0,t.jsx)(a.strong,{children:"Data refresh mechanism"})}),(0,t.jsx)(a.td,{children:"Users can define automatic refresh interval through SQL"}),(0,t.jsx)(a.td,{children:"Requires manual refresh of materialized view data"})]})]})]}),"\n",(0,t.jsx)(a.h2,{id:"usage",children:"Usage"}),"\n",(0,t.jsx)(a.h3,{id:"create-a-dynamic-table",children:"Create a dynamic table"}),"\n",(0,t.jsxs)(a.p,{children:["To create a dynamic table, use the ",(0,t.jsx)(a.code,{children:"CREATE DYNAMIC TABLE"})," statement:"]}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-sql",children:"CREATE DYNAMIC TABLE table_name AS <select_query> [WITH NO DATA] [SCHEDULE '<cron_string>'] [DISTRIBUTED BY <distribution_key>];\n"})}),"\n",(0,t.jsx)(a.p,{children:"Parameter details:"}),"\n",(0,t.jsxs)(a.ul,{children:["\n",(0,t.jsxs)(a.li,{children:[(0,t.jsx)(a.code,{children:"<select_query>"}),": The SQL query with which the dynamic table is defined. Supports joins with base tables, materialized views, or other dynamic tables."]}),"\n",(0,t.jsxs)(a.li,{children:[(0,t.jsx)(a.code,{children:"WITH NO DATA"}),": Creates the table without initial data."]}),"\n",(0,t.jsxs)(a.li,{children:[(0,t.jsx)(a.code,{children:"SCHEDULE '<cron_string>'"}),": Sets the refresh schedule using Linux cron expressions. See ",(0,t.jsx)(a.a,{href:"https://crontab.guru/",children:"Cron Expressions"})," for more details."]}),"\n",(0,t.jsxs)(a.li,{children:[(0,t.jsx)(a.code,{children:"DISTRIBUTED BY"}),": Defines the distribution key to improve query performance."]}),"\n"]}),"\n",(0,t.jsx)(a.p,{children:"Full syntax:"}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-sql",children:"CREATE DYNAMIC TABLE [ IF NOT EXISTS ] table_name\n   [ (column_name [, ...] ) ]\n   [ USING method ]\n   [ WITH ( storage_parameter [= value] [, ... ] ) ]\n   [ TABLESPACE tablespace_name ]\n   [ SCHEDULE schedule_string ]\n   AS query\n   [ WITH [ NO ] DATA ]\n   [ DISTRIBUTED BY (keys [, ...]) ];\n"})}),"\n",(0,t.jsx)(a.p,{children:"Example:"}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-sql",children:"CREATE DYNAMIC TABLE dt0 SCHEDULE '5 * * * *' AS SELECT a, b, sum(c) FROM t1 GROUP BY a, b WITH NO DATA DISTRIBUTED BY(b);\n\n\\d dt0\n\n             List of relations\nSchema | Name |     Type      |  Owner  | Storage\n--------+------+---------------+---------+---------\npublic | dt0  | dynamic table | gpadmin | heap\n(1 rows)\n"})}),"\n",(0,t.jsxs)(a.p,{children:["This example creates a dynamic table ",(0,t.jsx)(a.code,{children:"dt0"})," and schedules it to refresh every 5 minutes."]}),"\n",(0,t.jsx)(a.h3,{id:"refresh-a-dynamic-table",children:"Refresh a dynamic table"}),"\n",(0,t.jsxs)(a.p,{children:["Dynamic tables refresh automatically based on their ",(0,t.jsx)(a.code,{children:"SCHEDULE"})," setting. To manually refresh a table, use the ",(0,t.jsx)(a.code,{children:"REFRESH DYNAMIC TABLE"})," statement. Replace ",(0,t.jsx)(a.code,{children:"table_name"})," with the actual table name:"]}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-sql",children:"REFRESH DYNAMIC TABLE table_name;\n"})}),"\n",(0,t.jsxs)(a.p,{children:["To clear the table and make it unreadable, use the ",(0,t.jsx)(a.code,{children:"WITH NO DATA"})," option. Replace ",(0,t.jsx)(a.code,{children:"table_name"})," with the actual table name:"]}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-sql",children:"REFRESH DYNAMIC TABLE table_name WITH NO DATA;\n"})}),"\n",(0,t.jsx)(a.h3,{id:"view-schedule-information",children:"View schedule information"}),"\n",(0,t.jsxs)(a.p,{children:["To view the refresh schedule of a dynamic table, use the ",(0,t.jsx)(a.code,{children:"pg_get_dynamic_table_schedule"})," function. Replace ",(0,t.jsx)(a.code,{children:"table_name"})," with the actual table name:"]}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-sql",children:"SELECT pg_get_dynamic_table_schedule('table_name'::regclass::oid);\n"})}),"\n",(0,t.jsx)(a.h3,{id:"drop-a-dynamic-table",children:"Drop a dynamic table"}),"\n",(0,t.jsxs)(a.p,{children:["To delete a dynamic table and its associated refresh tasks, use the ",(0,t.jsx)(a.code,{children:"DROP DYNAMIC TABLE"})," statement. Replace ",(0,t.jsx)(a.code,{children:"table_name"})," with the actual table name:"]}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-sql",children:"DROP DYNAMIC TABLE table_name;\n"})}),"\n",(0,t.jsx)(a.h3,{id:"view-distribution-key",children:"View distribution key"}),"\n",(0,t.jsxs)(a.p,{children:["You can specify a distribution key when creating a dynamic table to optimize query performance. Use the ",(0,t.jsx)(a.code,{children:"\\d+"})," command to view distribution keys and query definitions."]}),"\n",(0,t.jsx)(a.p,{children:"Example:"}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-sql",children:"\\d+ dt0\n"})}),"\n",(0,t.jsx)(a.p,{children:"Output:"}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-sql",children:'Dynamic table "public.dt0"\nColumn |  Type   | Collation | Nullable | Default | Storage | Compression | Stats target | Description\n--------+---------+-----------+----------+---------+---------+-------------+--------------+-------------\na      | integer |           |          |         | plain   |             |              |\nb      | integer |           |          |         | plain   |             |              |\nsum    | bigint  |           |          |         | plain   |             |              |\nView definition:\nSELECT t1.a,\n   t1.b,\n   sum(t1.c) AS sum\n   FROM t1\n   GROUP BY t1.a, t1.b;\nDistributed by: (b)\nAccess method: heap\n'})}),"\n",(0,t.jsxs)(a.p,{children:["In this example, the dynamic table ",(0,t.jsx)(a.code,{children:"dt0"})," uses column ",(0,t.jsx)(a.code,{children:"b"})," as its distribution key. This ensures efficient query and aggregation operations, because data is distributed across nodes based on ",(0,t.jsx)(a.code,{children:"b"}),"."]}),"\n",(0,t.jsx)(a.h2,{id:"examples",children:"Examples"}),"\n",(0,t.jsx)(a.h3,{id:"example-1-accelerate-external-table-queries-in-lake-house-architecture",children:"Example 1: Accelerate external table queries in lake-house architecture"}),"\n",(0,t.jsx)(a.p,{children:"Apache Cloudberry automatically replaces queries to external tables with queries on dynamic tables when processing data from data lakes or external storage, thereby accelerating the query process."}),"\n",(0,t.jsxs)(a.ol,{children:["\n",(0,t.jsxs)(a.li,{children:["\n",(0,t.jsxs)(a.p,{children:["Create a readable external table ",(0,t.jsx)(a.code,{children:"ext_r"})," with data sourced from the specified file ",(0,t.jsx)(a.code,{children:"dynamic_table_text_file.txt"}),"."]}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-sql",children:"CREATE READABLE EXTERNAL TABLE ext_r(id int)\n   LOCATION('demoprot://dynamic_table_text_file.txt')\nFORMAT 'text';\n"})}),"\n",(0,t.jsxs)(a.p,{children:["In the above statement for creating an external table, ",(0,t.jsx)(a.code,{children:"demoprot://dynamic_table_text_file.txt"})," is an example protocol and file path."]}),"\n"]}),"\n",(0,t.jsxs)(a.li,{children:["\n",(0,t.jsxs)(a.p,{children:["Use ",(0,t.jsx)(a.code,{children:"EXPLAIN"})," to view the query execution plan for the table with the query condition ",(0,t.jsx)(a.code,{children:"id > 5"}),"."]}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-sql",children:"EXPLAIN(COSTS OFF, VERBOSE)\nSELECT sum(id) FROM ext_r WHERE id > 5;\n"})}),"\n",(0,t.jsxs)(a.p,{children:["Query plan output. In the following plan, ",(0,t.jsx)(a.code,{children:"Foreign Scan on dynamic_table_schema.ext_r"})," appears, which means that the planner directly scanned the external table ",(0,t.jsx)(a.code,{children:"ext_r"}),"."]}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-sql",children:"QUERY PLAN\n--------------------------------------------------------------\nFinalize Aggregate\nOutput: sum(id)\n->  Gather Motion 3:1  (slice1; segments: 3)\n      Output: (PARTIAL sum(id))\n      ->  Partial Aggregate\n            Output: PARTIAL sum(id)\n            ->  Foreign Scan on dynamic_table_schema.ext_r\n                  Output: id\n                  Filter: (ext_r.id > 5)\n"})}),"\n"]}),"\n",(0,t.jsxs)(a.li,{children:["\n",(0,t.jsxs)(a.p,{children:["Create a dynamic table ",(0,t.jsx)(a.code,{children:"dt_external"})," to store the filtered data from the external table ",(0,t.jsx)(a.code,{children:"ext_r"}),", and execute ",(0,t.jsx)(a.code,{children:"ANALYZE"})," to update the table statistics."]}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-sql",children:"CREATE DYNAMIC TABLE dt_external AS\nSELECT * FROM ext_r WHERE id > 5;\nANALYZE dt_external;\n"})}),"\n"]}),"\n",(0,t.jsxs)(a.li,{children:["\n",(0,t.jsx)(a.p,{children:"Set the parameters in a transaction to enable dynamic table query acceleration."}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-sql",children:"BEGIN;\nSET optimizer = OFF;\nSET LOCAL enable_answer_query_using_materialized_views = ON;\nSET LOCAL aqumv_allow_foreign_table = ON;\n"})}),"\n"]}),"\n",(0,t.jsxs)(a.li,{children:["\n",(0,t.jsxs)(a.p,{children:["Again, use ",(0,t.jsx)(a.code,{children:"EXPLAIN"})," to view the query execution plan for the table with the query condition ",(0,t.jsx)(a.code,{children:"id > 5"}),"."]}),"\n",(0,t.jsxs)(a.p,{children:["Use dynamic table to automatically replace external table queries, replacing the query to the external table ",(0,t.jsx)(a.code,{children:"ext_r"})," with a query to the dynamic table ",(0,t.jsx)(a.code,{children:"dt_external"}),", thereby accelerating the query."]}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-sql",children:"EXPLAIN(COSTS OFF, VERBOSE)\nSELECT sum(id) FROM ext_r WHERE id > 5;\n\nCOMMIT;\n"})}),"\n",(0,t.jsxs)(a.p,{children:["Query plan output. In the following plan, ",(0,t.jsx)(a.code,{children:"Seq Scan on dynamic_table_schema.dt_external"})," indicates that the planner automatically replaced the query on the external table with the query on the dynamic table ",(0,t.jsx)(a.code,{children:"dt_external"}),"."]}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-sql",children:"QUERY PLAN\n---------------------------------------------------------------\nFinalize Aggregate\nOutput: sum(id)\n->  Gather Motion 3:1  (slice1; segments: 3)\n      Output: (PARTIAL sum(id))\n      ->  Partial Aggregate\n            Output: PARTIAL sum(id)\n            ->  Seq Scan on dynamic_table_schema.dt_external\n                  Output: id\nSettings: enable_answer_query_using_materialized_views = 'on',\noptimizer = 'off'\nOptimizer: Postgres query optimizer\n(10 rows)\n"})}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(a.p,{children:"Through this process, query efficiency is improved because the operation that originally required scanning the external table is replaced by scanning the dynamic table, which reduces query response time."}),"\n",(0,t.jsx)(a.h3,{id:"example-2-create-an-empty-dynamic-table",children:"Example 2: Create an empty dynamic table"}),"\n",(0,t.jsxs)(a.ol,{children:["\n",(0,t.jsxs)(a.li,{children:["\n",(0,t.jsxs)(a.p,{children:["Create a base table ",(0,t.jsx)(a.code,{children:"existing_table"})," and insert data:"]}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-sql",children:"CREATE TABLE existing_table (\n   id INT,\n   name VARCHAR(100),\n   value INT\n);\n\nINSERT INTO existing_table (id, name, value) VALUES\n(1, 'Alice', 100),\n(2, 'Bob', 150),\n(3, 'Charlie', 200);\n"})}),"\n"]}),"\n",(0,t.jsxs)(a.li,{children:["\n",(0,t.jsx)(a.p,{children:"Create an empty dynamic table:"}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-sql",children:"CREATE DYNAMIC TABLE empty_table AS \nSELECT * FROM existing_table \nWITH NO DATA;\n"})}),"\n",(0,t.jsx)(a.p,{children:"This statement creates an empty dynamic table, which can be populated with data through manual refresh later."}),"\n"]}),"\n",(0,t.jsxs)(a.li,{children:["\n",(0,t.jsx)(a.p,{children:"Check that this table is empty:"}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-sql",children:'SELECT * FROM empty_table;\n\n-- ERROR:  materialized view "empty_table" has not been populated\n-- HINT:  Use the REFRESH MATERIALIZED VIEW command.\n'})}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(a.h2,{id:"notes",children:"Notes"}),"\n",(0,t.jsxs)(a.ul,{children:["\n",(0,t.jsx)(a.li,{children:"Refresh strategy: Ensure to set an appropriate refresh interval. If the refresh interval is too frequent, it might increase system load; if the refresh interval is too sparse, the query data might not be timely."}),"\n",(0,t.jsx)(a.li,{children:"Query replacement: The performance advantage of dynamic tables lies in automatically replacing external table queries, making them suitable for query scenarios that frequently require external table data."}),"\n",(0,t.jsx)(a.li,{children:"Data consistency: Because dynamic tables are a type of materialized view, pay attention to the balance between refresh strategy and data consistency to ensure the accuracy of application logic."}),"\n"]})]})}function h(e={}){const{wrapper:a}={...(0,s.a)(),...e.components};return a?(0,t.jsx)(a,{...e,children:(0,t.jsx)(o,{...e})}):o(e)}},11151:(e,a,n)=>{n.d(a,{Z:()=>l,a:()=>r});var t=n(67294);const s={},i=t.createContext(s);function r(e){const a=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(a):{...a,...e}}),[a,e])}function l(e){let a;return a=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),t.createElement(i.Provider,{value:a},e.children)}}}]);