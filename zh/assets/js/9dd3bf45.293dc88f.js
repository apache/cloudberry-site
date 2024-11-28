"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[7608],{48572:(e,i,t)=>{t.r(i),t.d(i,{assets:()=>l,contentTitle:()=>a,default:()=>d,frontMatter:()=>s,metadata:()=>r,toc:()=>c});var n=t(85893),o=t(11151);const s={title:"Use RuntimeFilter to Optimize Join Queries"},a="Use RuntimeFilter to Optimize Join Queries",r={id:"performance/use-runtimefilter-to-optimize-queries",title:"Use RuntimeFilter to Optimize Join Queries",description:"When performing join queries on large tables, the SQL optimizer of Cloudberry Database often uses the HashJoin operator. HashJoin builds a hash table based on the join key to match the join key, which might cause a memory access bottleneck and disk bottleneck. RuntimeFilter is an optimization technique that generates filters in real-time during HashJoin operations, which can pre-filter data before executing HashJoin to speed up HashJoin operations. In some scenarios, the RuntimeFilter optimization can double execution efficiency.",source:"@site/docs/performance/use-runtimefilter-to-optimize-queries.md",sourceDirName:"performance",slug:"/performance/use-runtimefilter-to-optimize-queries",permalink:"/zh/docs/performance/use-runtimefilter-to-optimize-queries",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/performance/use-runtimefilter-to-optimize-queries.md",tags:[],version:"current",lastUpdatedBy:"Ed Espino",lastUpdatedAt:1732764009,formattedLastUpdatedAt:"2024\u5e7411\u670828\u65e5",frontMatter:{title:"Use RuntimeFilter to Optimize Join Queries"},sidebar:"docsbars",previous:{title:"Use IndexScan on AO Tables",permalink:"/zh/docs/performance/use-index-scan-on-ao-tables"},next:{title:"\u4f7f\u7528\u5217\u7ea7\u538b\u7f29",permalink:"/zh/docs/performance/use-columnar-compression"}},l={},c=[{value:"Applicable scenarios",id:"applicable-scenarios",level:2},{value:"Limitations",id:"limitations",level:2},{value:"Usage example",id:"usage-example",level:2},{value:"Example of optimization effect",id:"example-of-optimization-effect",level:2}];function h(e){const i={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(i.h1,{id:"use-runtimefilter-to-optimize-join-queries",children:"Use RuntimeFilter to Optimize Join Queries"}),"\n",(0,n.jsx)(i.p,{children:"When performing join queries on large tables, the SQL optimizer of Cloudberry Database often uses the HashJoin operator. HashJoin builds a hash table based on the join key to match the join key, which might cause a memory access bottleneck and disk bottleneck. RuntimeFilter is an optimization technique that generates filters in real-time during HashJoin operations, which can pre-filter data before executing HashJoin to speed up HashJoin operations. In some scenarios, the RuntimeFilter optimization can double execution efficiency."}),"\n",(0,n.jsx)(i.p,{children:"HashJoin is commonly used for joining a smaller table with a larger table. In Cloudberry Database, when performing HashJoin, a hash table is typically built based on the smaller table to be joined. Then, by iterating over the tuples in the larger table, it finds matches in the hash table to perform the join. The smaller table used to build the hash table is called the inner table, while the other table used for iterative matching is called the outer table."}),"\n",(0,n.jsx)(i.p,{children:"The main bottlenecks in executing the HashJoin operator are:"}),"\n",(0,n.jsxs)(i.ul,{children:["\n",(0,n.jsx)(i.li,{children:"Memory Access: For each tuple in the outer table, a matching tuple in the hash table needs to be found, involving one or more memory accesses."}),"\n",(0,n.jsx)(i.li,{children:"Disk I/O: If the inner table is too large to fit in memory, it must be processed in batches using disk storage, causing significant disk I/O."}),"\n"]}),"\n",(0,n.jsx)(i.p,{children:"With RuntimeFilter optimization enabled, Cloudberry Database builds a RuntimeFilter alongside the hash table. This means filtering the tuples of the larger table before executing HashJoin. During the process, a Bloom Filter is used to implement the RuntimeFilter, occupying much less memory space than the hash table. When the Bloom Filter can be fully stored in the L3 cache, its filtering efficiency is twice that of HashJoin, greatly reducing memory access costs."}),"\n",(0,n.jsx)(i.p,{children:"The optimization will determine whether to generate a RuntimeFilter operator based on the filtering rate of the connection conditions of HashJoin and the size of the inner table. If the data volume deviates too much from the estimated result during the actual execution, Cloudberry Database will also stop using RuntimeFilter in time."}),"\n",(0,n.jsx)(i.h2,{id:"applicable-scenarios",children:"Applicable scenarios"}),"\n",(0,n.jsx)(i.p,{children:"If your scenario meets all the following conditions, you can consider using RuntimeFilter optimization in HashJoin operations:"}),"\n",(0,n.jsxs)(i.ul,{children:["\n",(0,n.jsx)(i.li,{children:"The size of the inner table in a single segment is within 16 million rows."}),"\n",(0,n.jsx)(i.li,{children:"The original HashJoin join key has a selection rate lower than 60%, which means the result set meeting the Hash join condition is less than 60% of the outer table. This can also be understood as a filter rate greater than 40%."}),"\n"]}),"\n",(0,n.jsx)(i.p,{children:"In the above scenarios, the size of the Bloom Filter built by Cloudberry Database through RuntimeFilter is within 2 MB. It can be fully stored in the L3 cache, enabling the filtration of 40% of the tuples in the outer table with minimal overhead, thus yielding a positive impact. In certain scenarios, if the selectivity of the HashJoin join key is below 10%, the efficiency of execution can be doubled by optimizing with RuntimeFilter."}),"\n",(0,n.jsx)(i.h2,{id:"limitations",children:"Limitations"}),"\n",(0,n.jsx)(i.p,{children:(0,n.jsx)(i.strong,{children:"Currently, RuntimeFilter is only supported when the estimated number of rows in the inner table is less than 16 million."})}),"\n",(0,n.jsx)(i.p,{children:"This limitation is to prevent the Bloom Filter from occupying too much memory, which might cause slower execution speeds or reduced filtering efficiency. In future updates, there might be support for using RuntimeFilter in scenarios with very large inner tables to avoid disk I/O costs associated with batch processing."}),"\n",(0,n.jsx)(i.h2,{id:"usage-example",children:"Usage example"}),"\n",(0,n.jsx)(i.p,{children:"The following is an example of the HashJoin algorithm benefiting from RuntimeFilter:"}),"\n",(0,n.jsxs)(i.p,{children:["This optimization is effective only in the PostgreSQL optimizer. Therefore, before enabling RuntimeFilter, you need to first disable the GPORCA optimizer and manually turn on the GUC parameter ",(0,n.jsx)(i.code,{children:"gp_enable_runtime_filter"}),"."]}),"\n",(0,n.jsx)(i.pre,{children:(0,n.jsx)(i.code,{className:"language-sql",children:"-- Preparation\nSET optimizer TO off; -- Disables the GPORCA optimizer to use the PostgreSQL optimizer.\nSET gp_enable_runtime_filter TO on; -- Enables the RuntimeFilter optimization.\n\n-- Creates the test table.\nDROP TABLE IF EXISTS fact, dim;\nCREATE TABLE fact (fid int, did int, val int);\nCREATE TABLE dim (did int, proj_id int, filter_val int);\n\n-- Generates test data, and 80% of fact.did overlaps with dim.did.\nINSERT INTO fact SELECT i, i % 8000 + 1, i FROM generate_series(1, 100000) s(i);\nINSERT INTO dim SELECT i, i % 10, i FROM generate_series(1, 10000) s(i);\nANALYZE fact, dim;\n\n-- Checks the execution plan.\nEXPLAIN (COSTS OFF) SELECT COUNT(*) FROM fact, dim\n    WHERE fact.did = dim.did AND proj_id < 2;\n                                QUERY PLAN\n---------------------------------------------------------------------------\n Finalize Aggregate\n   ->  Gather Motion 3:1  (slice1; segments: 3)\n         ->  Partial Aggregate\n               ->  Hash Join\n                     Hash Cond: (fact.did = dim.did)\n                     ->  RuntimeFilter\n                           ->  Seq Scan on fact\n                     ->  Hash\n                           ->  Broadcast Motion 3:3  (slice2; segments: 3)\n                                 ->  Seq Scan on dim\n                                       Filter: (proj_id < 2)\n Optimizer: Postgres query optimizer\n(12 rows)\n"})}),"\n",(0,n.jsxs)(i.p,{children:["In the execution plan above, you can see the RuntimeFilter operator. If you want to print more information about the execution, use ",(0,n.jsx)(i.code,{children:"EXPLAIN ANALYZE"}),"."]}),"\n",(0,n.jsx)(i.pre,{children:(0,n.jsx)(i.code,{className:"language-sql",children:"->  RuntimeFilter (actual time=0.047..5.976 rows=6682 loops=1)\n       Bloom Bits: 1048576\n       Extra Text: (seg1)   Inner Processed: 2000, Flase Positive Rate: 0.000000\n"})}),"\n",(0,n.jsx)(i.h2,{id:"example-of-optimization-effect",children:"Example of optimization effect"}),"\n",(0,n.jsxs)(i.p,{children:['Using the tables from the "Usage example", by joining the ',(0,n.jsx)(i.code,{children:"fact"})," and ",(0,n.jsx)(i.code,{children:"dim"})," tables with the condition that project ID is less than ",(0,n.jsx)(i.code,{children:"2"}),", and using the ",(0,n.jsx)(i.code,{children:"did"})," column as the join key, you can see the effect of using RuntimeFilter in the execution time:"]}),"\n",(0,n.jsx)(i.pre,{children:(0,n.jsx)(i.code,{className:"language-sql",children:"-- Without RuntimeFilter\nEXPLAIN ANALYZE SELECT COUNT(*) FROM fact, dim\n    WHERE fact.did = dim.did AND proj_id < 2;\n\nExecution Time: 35956.436 ms\n\n-- With RuntimeFilter\nSET gp_enable_runtime_filter TO on;\nEXPLAIN ANALYZE SELECT COUNT(*) FROM fact, dim\n    WHERE fact.did = dim.did AND proj_id < 2;\n\nExecution Time: 18276.112 ms\n"})}),"\n",(0,n.jsxs)(i.p,{children:["The above is a part of the ",(0,n.jsx)(i.code,{children:"EXPLAIN ANALYZE"})," results. In the full results, the fact table scan produces 100 million tuples. After being filtered by RuntimeFilter, 22 million tuples remain, and finally, exactly 20 million tuples are left after the HashJoin, as expected. The pre-filtering effect is clear, and the time taken is reduced by approximately 50%."]})]})}function d(e={}){const{wrapper:i}={...(0,o.a)(),...e.components};return i?(0,n.jsx)(i,{...e,children:(0,n.jsx)(h,{...e})}):h(e)}},11151:(e,i,t)=>{t.d(i,{Z:()=>r,a:()=>a});var n=t(67294);const o={},s=n.createContext(o);function a(e){const i=n.useContext(s);return n.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function r(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:a(e.components),n.createElement(s.Provider,{value:i},e.children)}}}]);