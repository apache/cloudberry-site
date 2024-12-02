"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[2757],{37894:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>l,contentTitle:()=>r,default:()=>h,frontMatter:()=>a,metadata:()=>s,toc:()=>d});var t=i(85893),o=i(11151);const a={title:"Use Aggregation Pushdown to Speed Up Query Execution"},r="Use aggregation pushdown to speed up query execution",s={id:"performance/use-aggre-pushdown-to-speed-up-queries",title:"Use Aggregation Pushdown to Speed Up Query Execution",description:"Aggregation pushdown is an optimization technique that moves the aggregation operation closer to the data source. Cloudberry Database supports pushing down aggregation operations, which means that the aggregation operator is processed before the join operator.",source:"@site/docs/performance/use-aggre-pushdown-to-speed-up-queries.md",sourceDirName:"performance",slug:"/performance/use-aggre-pushdown-to-speed-up-queries",permalink:"/docs/performance/use-aggre-pushdown-to-speed-up-queries",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/performance/use-aggre-pushdown-to-speed-up-queries.md",tags:[],version:"current",lastUpdatedBy:"Dianjin Wang",lastUpdatedAt:1733128076,formattedLastUpdatedAt:"Dec 2, 2024",frontMatter:{title:"Use Aggregation Pushdown to Speed Up Query Execution"},sidebar:"docsbars",previous:{title:"Parallel Queries Execution",permalink:"/docs/performance/parallel-query-execution"},next:{title:"Use IndexScan on AO Tables",permalink:"/docs/performance/use-index-scan-on-ao-tables"}},l={},d=[{value:"Usage example",id:"usage-example",level:2},{value:"Applicable scenarios",id:"applicable-scenarios",level:2},{value:"Applicable scenario 1",id:"applicable-scenario-1",level:3},{value:"Applicable scenario 2",id:"applicable-scenario-2",level:3},{value:"Unsuitable scenarios",id:"unsuitable-scenarios",level:2},{value:"Unsuitable scenario 1",id:"unsuitable-scenario-1",level:3},{value:"Unsuitable scenario 2",id:"unsuitable-scenario-2",level:3},{value:"Limitations",id:"limitations",level:2},{value:"Limitation 1",id:"limitation-1",level:3},{value:"Limitation 2",id:"limitation-2",level:3}];function c(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,o.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"use-aggregation-pushdown-to-speed-up-query-execution",children:"Use aggregation pushdown to speed up query execution"}),"\n",(0,t.jsx)(n.p,{children:"Aggregation pushdown is an optimization technique that moves the aggregation operation closer to the data source. Cloudberry Database supports pushing down aggregation operations, which means that the aggregation operator is processed before the join operator."}),"\n",(0,t.jsxs)(n.p,{children:["In ",(0,t.jsx)(n.a,{href:"#applicable-scenarios",children:"applicable scenarios"}),", aggregation pushdown can greatly reduce the size of the input set for join or aggregation operators, thereby enhancing their performance."]}),"\n",(0,t.jsx)(n.admonition,{type:"tip",children:(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"In the native PostgreSQL kernel's optimization logic, aggregation operations in each query are always performed after all join operations have been completed (excluding subqueries). Therefore, Cloudberry Database introduces aggregation pushdown, permitting the early execution of aggregation operations in applicable scenarios."}),"\n",(0,t.jsxs)(n.li,{children:["To determine whether the optimizer's chosen execution plan applies the aggregation pushdown optimization, check the position relationship between aggregation and join in the execution plan tree. If a plan first executes ",(0,t.jsx)(n.code,{children:"Partial Aggregation"}),", then performs ",(0,t.jsx)(n.code,{children:"Join"}),", and finally performs ",(0,t.jsx)(n.code,{children:"Final Aggregation"}),", it indicates that the optimizer has applied aggregation pushdown."]}),"\n"]})}),"\n",(0,t.jsx)(n.h2,{id:"usage-example",children:"Usage example"}),"\n",(0,t.jsxs)(n.p,{children:["Before using this aggregation pushdown optimization, you need to manually enable the GUC parameter ",(0,t.jsx)(n.code,{children:"gp_enable_agg_pushdown"}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["In addition, you need to manually set ",(0,t.jsx)(n.code,{children:"optimizer=off"})," to disable the GPORCA optimizer, because this optimization currently only works in the PostgreSQL optimizer."]}),"\n",(0,t.jsx)(n.p,{children:"The following is an example of using aggregation pushdown optimization."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sql",children:"-- Creates tables t1 and t2.\nCREATE TABLE t1(id INT, val1 INT);\nCREATE TABLE t2(id INT, val2 INT);\n\nSET OPTIMIZER=OFF; -- Disables the GPORCA optimizer.\nSET gp_enable_agg_pushdown=ON; -- Enables the GUC parameter.\n\n-- Executes a query with aggregation and join operations.\nEXPLAIN (COSTS OFF) SELECT id, SUM(val1) FROM t1 NATURAL JOIN t2 GROUP BY id;\n                     QUERY PLAN\n-----------------------------------------------------\n Gather Motion 3:1  (slice1; segments: 3)\n   ->  Finalize GroupAggregate\n         Group Key: t1.id\n         ->  Sort\n               Sort Key: t1.id\n               ->  Hash Join\n                     Hash Cond: (t2.id = t1.id)\n                     ->  Seq Scan on t2\n                     ->  Hash\n                           ->  Partial HashAggregate\n                                 Group Key: t1.id\n                                 ->  Seq Scan on t1\nOptimizer: Postgres query optimizer\n(13 rows)\n"})}),"\n",(0,t.jsxs)(n.p,{children:["From the execution plan result of the above example, you can see that before performing the HashJoin operation, Cloudberry Database first performs an aggregation operation on table ",(0,t.jsx)(n.code,{children:"t1"})," based on the ",(0,t.jsx)(n.code,{children:"id"})," column. This aggregation operation does not compromise the correctness of the statement's results and is likely to reduce the amount of data entering the HashJoin, thereby improving the efficiency of the statement execution."]}),"\n",(0,t.jsx)(n.h2,{id:"applicable-scenarios",children:"Applicable scenarios"}),"\n",(0,t.jsx)(n.p,{children:"Using aggregation pushdown in the following scenarios is expected to get obvious query performance improvements."}),"\n",(0,t.jsx)(n.h3,{id:"applicable-scenario-1",children:"Applicable scenario 1"}),"\n",(0,t.jsx)(n.p,{children:"A table where each record of data corresponds to multiple records of data in another table, requiring the two tables to be joined for group aggregation."}),"\n",(0,t.jsxs)(n.p,{children:["For example, to sum the prices of items in each order from the order table (",(0,t.jsx)(n.code,{children:"order_tbl"}),") and the order line table (",(0,t.jsx)(n.code,{children:"order_line_tbl"}),"), which means to calculate the total amount of each order ",(0,t.jsx)(n.code,{children:"SUM(price)"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sql",children:"SELECT o.order_id, SUM(price)\n  FROM order_tbl o, order_line_tbl ol\n  WHERE o.order_id = ol.order_id\n  GROUP BY o.order_id;\n"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Execution method in the native PostgreSQL optimizer: PostgreSQL's native optimizer can perform aggregation only after joining tables. Because every item in ",(0,t.jsx)(n.code,{children:"order_line_tbl"})," corresponds to an order in ",(0,t.jsx)(n.code,{children:"order_tbl"}),", the Join operator will not filter out any data."]}),"\n",(0,t.jsxs)(n.li,{children:["Execution method in Cloudberry Database: assuming that each order contains an average of 10 items, the volume of data is expected to decrease tenfold after aggregation. With aggregation pushdown enabled, the database first aggregates data in ",(0,t.jsx)(n.code,{children:"order_line_tbl"})," based on ",(0,t.jsx)(n.code,{children:"order_id"}),", reducing the volume of data entering the Join operator by tenfold, significantly reducing the cost of the Join operator. The corresponding execution plan is as follows:"]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sql",children:"EXPLAIN SELECT o.order_id, SUM(price)\n  FROM order_tbl o, order_line_tbl ol\n  WHERE o.order_id = ol.order_id\n  GROUP BY o.order_id;\n                                          QUERY PLAN\n-----------------------------------------------------------------------------------------------\n Gather Motion 3:1  (slice1; segments: 3)  (cost=712.89..879.56 rows=10000 width=12)\n   ->  Finalize HashAggregate  (cost=712.89..746.23 rows=3333 width=12)\n         Group Key: o.order_id\n         ->  Hash Join  (cost=617.00..696.23 rows=3333 width=12)\n               Hash Cond: (ol.order_id = o.order_id)\n               ->  Partial HashAggregate  (cost=538.00..571.38 rows=3338 width=12)\n                     Group Key: ol.order_id\n                     ->  Seq Scan on order_line_tbl ol  (cost=0.00..371.33 rows=33333 width=8)\n               ->  Hash  (cost=37.33..37.33 rows=3333 width=4)\n                     ->  Seq Scan on order_tbl o  (cost=0.00..37.33 rows=3333 width=4)\n Optimizer: Postgres query optimizer\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Similar scenario includes: joining the project table (",(0,t.jsx)(n.code,{children:"project"}),") and the experiment table (",(0,t.jsx)(n.code,{children:"experiment"}),"), and calculating the total experiment cost in the past year for each ",(0,t.jsx)(n.code,{children:"project"}),". The corresponding reference SQL statement is as follows:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sql",children:"SELECT proj_name, sum(cost)\n    FROM experiment e, project p\n    WHERE e.e_pid = p.p_pid AND e.start_time > now() - interval '1 year'\n    GROUP BY proj_name;\n"})}),"\n",(0,t.jsxs)(n.p,{children:["For this query, with aggregation pushdown enabled, Cloudberry Database performs pre-aggregation on the experiment table based on the ",(0,t.jsx)(n.code,{children:"e_pid"})," column, aggregating information of the same project together."]}),"\n",(0,t.jsx)(n.p,{children:"However, if this query also applies many filters on the project table, this might cause a high selectivity rate for join, leading to inefficient execution. Therefore, aggregation pushdown might not be suitable in such cases."}),"\n",(0,t.jsx)(n.h3,{id:"applicable-scenario-2",children:"Applicable scenario 2"}),"\n",(0,t.jsx)(n.p,{children:"In a query statement, the Join operator greatly increases the result set size, requiring grouped calculations."}),"\n",(0,t.jsxs)(n.p,{children:["For example, joining the ",(0,t.jsx)(n.code,{children:"person_1"})," table with the ",(0,t.jsx)(n.code,{children:"person_2"})," table to find out how many unique pairs can be formed for each name that appears in both tables. The SQL query is as follows:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sql",children:"SELECT p1.name, COUNT(p1.name) FROM person_1 p1, person_2 p2 WHERE p1.name = p2.name GROUP BY p1.name;\n"})}),"\n",(0,t.jsxs)(n.p,{children:["In this example, if a ",(0,t.jsx)(n.code,{children:"name"})," appears X times in the ",(0,t.jsx)(n.code,{children:"p1"})," table and Y times in the ",(0,t.jsx)(n.code,{children:"p2"})," table, then this name will appear X*Y times in the final result. If a large amount of data is in this scenario, the result set after the join might become very large."]}),"\n",(0,t.jsxs)(n.p,{children:["In the above example, if the aggregation operation is pushed down in advance to either the ",(0,t.jsx)(n.code,{children:"p1"})," or ",(0,t.jsx)(n.code,{children:"p2"})," side, then each name will appear at most once after aggregation on that side. This effectively reduces the workload of the Join operator and the size of the input set for the subsequent aggregation operator. The corresponding execution plan is as follows:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sql",children:"EXPLAIN SELECT p1.name, COUNT(p1.name) FROM person_1 p1, person_2 p2 WHERE p1.name = p2.name GROUP BY p1.name;\n                                       QUERY PLAN\n-----------------------------------------------------------------------------------------\n Gather Motion 3:1  (slice1; segments: 3)  (cost=1758.62..1925.23 rows=9997 width=12)\n   ->  Finalize HashAggregate  (cost=1758.62..1791.94 rows=3332 width=12)\n         Group Key: p1.name\n         ->  Hash Join  (cost=762.93..1592.17 rows=33290 width=12)\n               Hash Cond: (p2.name = p1.name)\n               ->  Seq Scan on p2  (cost=0.00..371.33 rows=33333 width=4)\n               ->  Hash  (cost=637.97..637.97 rows=9997 width=12)\n                     ->  Partial HashAggregate  (cost=538.00..637.97 rows=9997 width=12)\n                           Group Key: p1.name\n                           ->  Seq Scan on p1  (cost=0.00..371.33 rows=33333 width=4)\n Optimizer: Postgres query optimizer\n(11 rows)\n"})}),"\n",(0,t.jsx)(n.h2,{id:"unsuitable-scenarios",children:"Unsuitable scenarios"}),"\n",(0,t.jsx)(n.p,{children:"In the following scenarios, aggregation pushdown is unlikely to bring performance improvement. It is not recommended to enable aggregation pushdown in these scenarios."}),"\n",(0,t.jsx)(n.h3,{id:"unsuitable-scenario-1",children:"Unsuitable scenario 1"}),"\n",(0,t.jsx)(n.p,{children:"The data volume does not change much after aggregation."}),"\n",(0,t.jsxs)(n.p,{children:["Contrary to the ",(0,t.jsx)(n.a,{href:"#applicable-scenario-1",children:"applicable scenario 1"})," and ",(0,t.jsx)(n.a,{href:"#applicable-scenario-2",children:"applicable scenario 2"}),", if aggregation in advance does not greatly change the data volume and cannot reduce the size of the input set for subsequent computing, then it is recommended first to execute the Join operator to avoid unnecessary overhead."]}),"\n",(0,t.jsx)(n.h3,{id:"unsuitable-scenario-2",children:"Unsuitable scenario 2"}),"\n",(0,t.jsx)(n.p,{children:"If the join key is different from the grouping key, pushing down aggregation will change the grouping key used after the pushdown. In such cases, aggregation pushdown that rewrites the grouping key cannot reduce the data volume, causing poor performance of the pushed-down aggregation:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sql",children:"SELECT t1.value, COUNT(*) FROM t1, t2 WHERE t1.key = t2.key GROUP BY t1.value;\n"})}),"\n",(0,t.jsxs)(n.p,{children:["For the above query examples, directly pushing down the aggregation to the ",(0,t.jsx)(n.code,{children:"t1"})," side will cause incorrect results, with details similar to the limitations in ",(0,t.jsx)(n.a,{href:"#unsuitable-scenario-1",children:"unsuitable scenario 1"}),". To ensure the accuracy of the results, the equivalent grouping key for the actual pushed-down aggregation becomes ",(0,t.jsx)(n.code,{children:"GROUP BY t1.key, t1.value"}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["In this case, if the key and value in the ",(0,t.jsx)(n.code,{children:"t1"})," table are completely unrelated, each group might only contain a single tuple, so this aggregation pushdown will not have any positive effect. However, if the key and value are strongly correlated, or the same key always corresponds to the same value, then the grouping effect is not affected."]}),"\n",(0,t.jsxs)(n.p,{children:["In the example above, the original grouping by ",(0,t.jsx)(n.code,{children:"t1.value"})," is obvious. But after the aggregation pushdown, the grouping key changes to ",(0,t.jsx)(n.code,{children:"t1.key, t1.value"}),", and if the correlation between key and value is weak, it makes the grouping in the aggregation less effective."]}),"\n",(0,t.jsx)(n.h2,{id:"limitations",children:"Limitations"}),"\n",(0,t.jsx)(n.p,{children:"This section describes some limitations of the aggregation pushdown feature, including situations where this optimization cannot logically be applied and cases where it is not yet supported in engineering implementation."}),"\n",(0,t.jsx)(n.h3,{id:"limitation-1",children:"Limitation 1"}),"\n",(0,t.jsxs)(n.p,{children:["Aggregation pushdown cannot be applied when filtering is performed on columns other than those in the ",(0,t.jsx)(n.code,{children:"GROUP BY"})," clause during the join and subsequent computing processes. Consider the following SQL query:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sql",children:"SELECT id, SUM(val) FROM t1, t2 WHERE t1.id = t2.id AND t1.val > t2.val GROUP BY id;\n"})}),"\n",(0,t.jsxs)(n.p,{children:["In the above example, assume two tuples A and B from table ",(0,t.jsx)(n.code,{children:"t1"}),", both with the ",(0,t.jsx)(n.code,{children:"id"})," value ",(0,t.jsx)(n.code,{children:"100"}),", and a tuple C from table ",(0,t.jsx)(n.code,{children:"t2"}),", also with the ",(0,t.jsx)(n.code,{children:"id"})," value ",(0,t.jsx)(n.code,{children:"100"}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["During the join process of AB and C, although A and B have the same ",(0,t.jsx)(n.code,{children:"id"})," values, it is not guaranteed that they will both pass or fail the filtering condition ",(0,t.jsx)(n.code,{children:"AB.val > C.val"}),". In this case, pre-aggregating the sum of ",(0,t.jsx)(n.code,{children:"val"})," based on ",(0,t.jsx)(n.code,{children:"id"})," will inevitably combine the ",(0,t.jsx)(n.code,{children:"val"})," s of A and B. However, they might not both pass or fail the filtering condition, causing incorrect results."]}),"\n",(0,t.jsx)(n.p,{children:"In contrast, the following query example is similar but suitable for aggregation pushdown:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sql",children:"SELECT id, SUM(val) FROM t1, t2 WHERE t1.id = t2.id AND t1.id < t2.id_thre GROUP BY id;\n"})}),"\n",(0,t.jsxs)(n.p,{children:["This example also considers the same ABC tuples as the previous example. Because the additional filtering condition only uses the ",(0,t.jsx)(n.code,{children:"id"})," column from ",(0,t.jsx)(n.code,{children:"t1"}),", the two tuples AB with the same ",(0,t.jsx)(n.code,{children:"id"})," and the given tuple C will either all pass or all fail the filtering together. Therefore, it is possible to aggregate the sum of ",(0,t.jsx)(n.code,{children:"val"})," s of the AB tuples in advance."]}),"\n",(0,t.jsx)(n.h3,{id:"limitation-2",children:"Limitation 2"}),"\n",(0,t.jsx)(n.p,{children:"Aggregation pushdown on both sides of a Join is not supported. Consider the following SQL query:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sql",children:"SELECT id, SUM(val) FROM t1, t2 WHERE t1.id = t2.id GROUP BY id;\n"})}),"\n",(0,t.jsx)(n.p,{children:"You can rewrite the statement to get an equivalent alternative statement:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sql",children:"SELECT id, sum1 * cnt2 FROM\n    (SELECT id, SUM(val) FROM t1 GROUP BY id) AT1(id, sum1),\n    (SELECT id, COUNT(*) FROM t2 GROUP BY id) AT2(id, cnt2)\nWHERE AT1.id = AT2.id GROUP BY id;\n"})}),"\n",(0,t.jsxs)(n.p,{children:["In this example, the aggregation operation is pushed down to both sides of the join. For all tuples in the ",(0,t.jsx)(n.code,{children:"t1"})," table with ",(0,t.jsx)(n.code,{children:"id"})," 100, Cloudberry Database pre-aggregates their ",(0,t.jsx)(n.code,{children:"val"})," s, resulting in a corresponding ",(0,t.jsx)(n.code,{children:"sum1"}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["During the actual join process, for each tuple in the ",(0,t.jsx)(n.code,{children:"t2"})," table with ",(0,t.jsx)(n.code,{children:"id"})," 100, a join is performed with the tuple belonging to ",(0,t.jsx)(n.code,{children:"sum1"}),", resulting in the corresponding tuples. This means that for each ",(0,t.jsx)(n.code,{children:"id"})," 100 in ",(0,t.jsx)(n.code,{children:"t2"}),", ",(0,t.jsx)(n.code,{children:"sum1"})," will appear once in the final sum, allowing Cloudberry Database to pre-aggregate ",(0,t.jsx)(n.code,{children:"t2"}),", calculating the total number of tuples with ",(0,t.jsx)(n.code,{children:"id"})," 100 as ",(0,t.jsx)(n.code,{children:"cnt2"}),". The final result can then be calculated through ",(0,t.jsx)(n.code,{children:"sum1 * cnt2"}),"."]}),"\n",(0,t.jsx)(n.p,{children:"This scenario involves relatively complex statement and expression rewriting, and is currently not supported in Cloudberry Database."})]})}function h(e={}){const{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},11151:(e,n,i)=>{i.d(n,{Z:()=>s,a:()=>r});var t=i(67294);const o={},a=t.createContext(o);function r(e){const n=t.useContext(a);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:r(e.components),t.createElement(a.Provider,{value:n},e.children)}}}]);