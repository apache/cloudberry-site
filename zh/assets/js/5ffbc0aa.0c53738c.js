"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[7063],{77917:(e,n,d)=>{d.r(n),d.d(n,{assets:()=>l,contentTitle:()=>c,default:()=>h,frontMatter:()=>s,metadata:()=>o,toc:()=>t});var r=d(85893),i=d(11151);const s={title:"\u4f7f\u7528\u805a\u96c6\u4e0b\u63a8\u4f18\u5316\u67e5\u8be2"},c="\u4f7f\u7528\u805a\u96c6\u4e0b\u63a8\u4f18\u5316\u67e5\u8be2",o={id:"performance/use-aggre-pushdown-to-speed-up-queries",title:"\u4f7f\u7528\u805a\u96c6\u4e0b\u63a8\u4f18\u5316\u67e5\u8be2",description:"\u805a\u96c6\u4e0b\u63a8 (Aggregation Pushdown) \u662f\u4f7f\u805a\u96c6 (Aggregation) \u64cd\u4f5c\u7684\u8fd0\u7b97\u66f4\u63a5\u8fd1\u6570\u636e\u6e90\u7684\u4e00\u79cd\u4f18\u5316\u6280\u672f\u3002Cloudberry Database \u652f\u6301\u5c06\u805a\u96c6\u8fd0\u7b97\u4e0b\u63a8\uff0c\u5373\u5c06\u805a\u96c6\u7b97\u5b50\u63d0\u524d\u5230\u8fde\u63a5 (Join) \u7b97\u5b50\u4e4b\u524d\u8fdb\u884c\u8ba1\u7b97\u3002",source:"@site/i18n/zh/docusaurus-plugin-content-docs/current/performance/use-aggre-pushdown-to-speed-up-queries.md",sourceDirName:"performance",slug:"/performance/use-aggre-pushdown-to-speed-up-queries",permalink:"/zh/docs/performance/use-aggre-pushdown-to-speed-up-queries",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/i18n/zh/docusaurus-plugin-content-docs/current/performance/use-aggre-pushdown-to-speed-up-queries.md",tags:[],version:"current",lastUpdatedBy:"TomShawn",lastUpdatedAt:1740044194,formattedLastUpdatedAt:"2025\u5e742\u670820\u65e5",frontMatter:{title:"\u4f7f\u7528\u805a\u96c6\u4e0b\u63a8\u4f18\u5316\u67e5\u8be2"},sidebar:"docsbars",previous:{title:"\u5e76\u884c\u6267\u884c\u67e5\u8be2",permalink:"/zh/docs/performance/parallel-query-execution"},next:{title:"\u5728 AO \u8868\u4e0a\u4f7f\u7528 IndexScan",permalink:"/zh/docs/performance/use-index-scan-on-ao-tables"}},l={},t=[{value:"\u4f7f\u7528\u793a\u4f8b",id:"\u4f7f\u7528\u793a\u4f8b",level:2},{value:"\u9002\u7528\u573a\u666f",id:"\u9002\u7528\u573a\u666f",level:2},{value:"\u9002\u7528\u573a\u666f\u4e00",id:"\u9002\u7528\u573a\u666f\u4e00",level:3},{value:"\u9002\u7528\u573a\u666f\u4e8c",id:"\u9002\u7528\u573a\u666f\u4e8c",level:3},{value:"\u4e0d\u9002\u7528\u7684\u573a\u666f",id:"\u4e0d\u9002\u7528\u7684\u573a\u666f",level:2},{value:"\u4e0d\u9002\u7528\u7684\u573a\u666f\u4e00",id:"\u4e0d\u9002\u7528\u7684\u573a\u666f\u4e00",level:3},{value:"\u4e0d\u9002\u7528\u7684\u573a\u666f\u4e8c",id:"\u4e0d\u9002\u7528\u7684\u573a\u666f\u4e8c",level:3},{value:"\u4f7f\u7528\u9650\u5236",id:"\u4f7f\u7528\u9650\u5236",level:2},{value:"\u4f7f\u7528\u9650\u5236\u4e00",id:"\u4f7f\u7528\u9650\u5236\u4e00",level:3},{value:"\u4f7f\u7528\u9650\u5236\u4e8c",id:"\u4f7f\u7528\u9650\u5236\u4e8c",level:3}];function a(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"\u4f7f\u7528\u805a\u96c6\u4e0b\u63a8\u4f18\u5316\u67e5\u8be2",children:"\u4f7f\u7528\u805a\u96c6\u4e0b\u63a8\u4f18\u5316\u67e5\u8be2"}),"\n",(0,r.jsx)(n.p,{children:"\u805a\u96c6\u4e0b\u63a8 (Aggregation Pushdown) \u662f\u4f7f\u805a\u96c6 (Aggregation) \u64cd\u4f5c\u7684\u8fd0\u7b97\u66f4\u63a5\u8fd1\u6570\u636e\u6e90\u7684\u4e00\u79cd\u4f18\u5316\u6280\u672f\u3002Cloudberry Database \u652f\u6301\u5c06\u805a\u96c6\u8fd0\u7b97\u4e0b\u63a8\uff0c\u5373\u5c06\u805a\u96c6\u7b97\u5b50\u63d0\u524d\u5230\u8fde\u63a5 (Join) \u7b97\u5b50\u4e4b\u524d\u8fdb\u884c\u8ba1\u7b97\u3002"}),"\n",(0,r.jsxs)(n.p,{children:["\u5728",(0,r.jsx)(n.a,{href:"#%E9%80%82%E7%94%A8%E5%9C%BA%E6%99%AF",children:"\u9002\u7528\u7684\u573a\u666f"}),"\u4e0b\uff0c\u805a\u96c6\u4e0b\u63a8\u80fd\u591f\u660e\u663e\u5730\u51cf\u5c11\u8fde\u63a5\u7b97\u5b50\u6216\u8005\u805a\u96c6\u7b97\u5b50\u7684\u8f93\u5165\u96c6\u5927\u5c0f\uff0c\u8fdb\u800c\u63d0\u5347\u7b97\u5b50\u7684\u6267\u884c\u6027\u80fd\u3002"]}),"\n",(0,r.jsx)(n.admonition,{title:"\u63d0\u793a",type:"tip",children:(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u5728\u539f\u751f PostgreSQL \u5185\u6838\u7684\u4f18\u5316\u5668\u903b\u8f91\u4e2d\uff0c\u6bcf\u4e2a\u67e5\u8be2\u4e2d\u7684\u805a\u96c6\u64cd\u4f5c\u59cb\u7ec8\u90fd\u5728\u5168\u90e8\u8fde\u63a5\u64cd\u4f5c\u7ed3\u675f\u540e\u624d\u4f1a\u8fdb\u884c\uff08\u4e0d\u5305\u542b\u5b50\u67e5\u8be2\u7684\u60c5\u51b5\u4e0b\uff09\u3002\u56e0\u6b64 Cloudberry Database \u5f15\u5165\u805a\u96c6\u4e0b\u63a8\u7279\u6027\uff0c\u4f7f\u5f97 Cloudberry Database \u80fd\u591f\u5728\u5408\u9002\u7684\u573a\u666f\u4e0b\u9009\u62e9\u63d0\u524d\u6267\u884c\u805a\u96c6\u64cd\u4f5c\u3002"}),"\n",(0,r.jsx)(n.li,{children:"\u8981\u5224\u65ad\u4f18\u5316\u5668\u9009\u62e9\u7684\u6267\u884c\u8ba1\u5212\u662f\u5426\u5e94\u7528\u4e86\u805a\u96c6\u4e0b\u63a8\u4f18\u5316\uff0c\u53ef\u4ee5\u89c2\u5bdf Aggregation \u548c Join \u5728\u6267\u884c\u8ba1\u5212\u6811\u4e2d\u7684\u4f4d\u7f6e\u5173\u7cfb\u3002\u82e5\u67d0\u4e2a\u6267\u884c\u8ba1\u5212\u5148\u8fdb\u884c\u4e86 Partial Aggregation \u7136\u540e\u518d\u8fdb\u884c Join \u64cd\u4f5c\uff0c\u6700\u7ec8\u624d\u8fdb\u884c Final Aggregation\uff0c\u5219\u8868\u793a\u4f18\u5316\u5668\u5e94\u7528\u4e86\u805a\u96c6\u4e0b\u63a8\u3002"}),"\n"]})}),"\n",(0,r.jsx)(n.h2,{id:"\u4f7f\u7528\u793a\u4f8b",children:"\u4f7f\u7528\u793a\u4f8b"}),"\n",(0,r.jsxs)(n.p,{children:["\u4f7f\u7528\u8be5\u805a\u96c6\u4e0b\u63a8\u4f18\u5316\u524d\uff0c\u4f60\u9700\u8981\u624b\u52a8\u5f00\u542f GUC \u53c2\u6570 ",(0,r.jsx)(n.code,{children:"gp_enable_agg_pushdown"}),"\u3002"]}),"\n",(0,r.jsxs)(n.p,{children:["\u6b64\u5916\uff0c\u4f60\u8fd8\u9700\u8981\u624b\u52a8\u8bbe\u7f6e ",(0,r.jsx)(n.code,{children:"optimizer=off"})," \u6765\u5173\u95ed GPORCA \u4f18\u5316\u5668\uff0c\u56e0\u4e3a\u5f53\u524d\u8be5\u4f18\u5316\u4ec5\u5728 PostgreSQL \u4f18\u5316\u5668\u4e2d\u751f\u6548\u3002"]}),"\n",(0,r.jsx)(n.p,{children:"\u4ee5\u4e0b\u4e3a\u805a\u96c6\u4e0b\u63a8\u4f18\u5316\u7684\u4f7f\u7528\u793a\u4f8b\u3002"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sql",children:"-- \u521b\u5efa t1 \u548c t2 \u4e24\u5f20\u8868\u683c\nCREATE TABLE t1(id INT, val1 INT);\nCREATE TABLE t2(id INT, val2 INT);\n\nSET OPTIMIZER=OFF; -- \u5173\u95ed GPORCA \u4f18\u5316\u5668\nSET gp_enable_agg_pushdown=ON; -- \u5f00\u542f GUC \u53c2\u6570\n\n-- \u6267\u884c\u4e00\u6761\u5e26\u6709\u805a\u96c6\u8fd0\u7b97\u548c\u8fde\u63a5\u8fd0\u7b97\u7684\u67e5\u8be2\nEXPLAIN (COSTS OFF) SELECT id, SUM(val1) FROM t1 NATURAL JOIN t2 GROUP BY id;\n                     QUERY PLAN\n-----------------------------------------------------\n Gather Motion 3:1  (slice1; segments: 3)\n   ->  Finalize GroupAggregate\n         Group Key: t1.id\n         ->  Sort\n               Sort Key: t1.id\n               ->  Hash Join\n                     Hash Cond: (t2.id = t1.id)\n                     ->  Seq Scan on t2\n                     ->  Hash\n                           ->  Partial HashAggregate\n                                 Group Key: t1.id\n                                 ->  Seq Scan on t1\nOptimizer: Postgres query optimizer\n(13 rows)\n"})}),"\n",(0,r.jsxs)(n.p,{children:["\u4ece\u4ee5\u4e0a\u793a\u4f8b\u7684\u6267\u884c\u8ba1\u5212\u7ed3\u679c\u4e2d\uff0c\u53ef\u4ee5\u770b\u5230\u5728\u8fdb\u884c HashJoin \u8fd0\u7b97\u524d\uff0cCloudberry Database \u5148\u5bf9 ",(0,r.jsx)(n.code,{children:"t1"})," \u8868\u6839\u636e ",(0,r.jsx)(n.code,{children:"id"})," \u5217\u63d0\u524d\u6267\u884c\u4e86\u805a\u96c6\u8fd0\u7b97\u3002\u8be5\u805a\u96c6\u8fd0\u7b97\u5e76\u4e0d\u4f1a\u7834\u574f\u8bed\u53e5\u6267\u884c\u7ed3\u679c\u7684\u6b63\u786e\u6027\uff0c\u5e76\u5927\u6982\u7387\u80fd\u51cf\u5c11\u8fdb\u5165 HashJoin \u7684\u6570\u636e\u91cf\uff0c\u8fdb\u800c\u63d0\u5347\u8bed\u53e5\u6267\u884c\u7684\u6548\u7387\u3002"]}),"\n",(0,r.jsx)(n.h2,{id:"\u9002\u7528\u573a\u666f",children:"\u9002\u7528\u573a\u666f"}),"\n",(0,r.jsx)(n.p,{children:"\u5728\u4ee5\u4e0b\u573a\u666f\u4e0b\u4f7f\u7528\u805a\u96c6\u4e0b\u63a8\uff0c\u9884\u671f\u80fd\u83b7\u5f97\u8f83\u4e3a\u660e\u663e\u7684\u67e5\u8be2\u6027\u80fd\u63d0\u5347\u3002"}),"\n",(0,r.jsx)(n.h3,{id:"\u9002\u7528\u573a\u666f\u4e00",children:"\u9002\u7528\u573a\u666f\u4e00"}),"\n",(0,r.jsx)(n.p,{children:"\u573a\u666f\u63cf\u8ff0\uff1a\u4e00\u5f20\u8868\u7684\u6bcf\u6761\u6570\u636e\u5bf9\u5e94\u53e6\u4e00\u5f20\u8868\u4e2d\u7684\u591a\u6761\u6570\u636e\uff0c\u9700\u8981\u5c06\u4e24\u5f20\u8868\u8fde\u63a5\u8d77\u6765\u8fdb\u884c\u5206\u7ec4\u805a\u96c6\u8fd0\u7b97\u3002"}),"\n",(0,r.jsxs)(n.p,{children:["\u4f8b\u5982\u9700\u8981\u5c06\u8ba2\u5355\u8868 (",(0,r.jsx)(n.code,{children:"order_tbl"}),") \u548c\u8ba2\u5355\u9879\u8868 (",(0,r.jsx)(n.code,{children:"order_line_tbl"}),") \u8fde\u63a5\uff0c\u5bf9\u4e8e\u6bcf\u4e2a\u8ba2\u5355\u5c06\u5176\u5bf9\u5e94\u8ba2\u5355\u9879\u7684\u4ef7\u683c\u6c42\u548c\uff0c\u5373\u9700\u8981\u8ba1\u7b97\u6bcf\u4e2a\u8ba2\u5355\u7684\u603b\u91d1\u989d ",(0,r.jsx)(n.code,{children:"SUM(price)"}),"\uff1a"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sql",children:"SELECT o.order_id, SUM(price)\n  FROM order_tbl o, order_line_tbl ol\n  WHERE o.order_id = ol.order_id\n  GROUP BY o.order_id;\n"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\u5728 PostgreSQL \u539f\u751f\u4f18\u5316\u5668\u4e2d\u7684\u6267\u884c\u65b9\u5f0f\uff1aPostgreSQL \u539f\u751f\u4f18\u5316\u5668\u53ea\u80fd\u5148\u5c06\u4e24\u8868\u8fde\u63a5\u518d\u8fdb\u884c\u805a\u96c6\u8fd0\u7b97\u3002\u7531\u4e8e ",(0,r.jsx)(n.code,{children:"order_line_tbl"})," \u8868\u4e2d\u7684\u6bcf\u4e2a\u8ba2\u5355\u9879\u4e00\u5b9a\u5b58\u5728\u5bf9\u5e94\u7684 ",(0,r.jsx)(n.code,{children:"order_tbl"})," \u8868\u4e2d\u7684\u8ba2\u5355\u4fe1\u606f\uff0c\u56e0\u6b64\u8be5 Join \u7b97\u5b50\u5e76\u4e0d\u4f1a\u7b5b\u9009\u6389\u4efb\u4f55\u6570\u636e\u3002"]}),"\n",(0,r.jsxs)(n.li,{children:["\u5728 Cloudberry Database \u4e2d\u7684\u6267\u884c\u65b9\u5f0f\uff1a\u5047\u8bbe\u6bcf\u4e2a\u8ba2\u5355\u5e73\u5747\u5305\u542b 10 \u4e2a\u8ba2\u5355\u9879\uff0c\u90a3\u4e48\u7ecf\u8fc7 Aggregation \u7b97\u5b50\u8fdb\u884c\u805a\u96c6\u540e\uff0c\u6570\u636e\u91cf\u9884\u8ba1\u4f1a\u51cf\u5c11 10 \u500d\u3002\u5f00\u542f\u805a\u96c6\u4e0b\u63a8\u540e\uff0c\u6570\u636e\u5e93\u5c06\u5148\u5bf9 ",(0,r.jsx)(n.code,{children:"order_line_tbl"})," \u4e2d\u7684\u6570\u636e\u6839\u636e ",(0,r.jsx)(n.code,{children:"order_id"})," \u8fdb\u884c\u63d0\u524d\u805a\u96c6\uff0c\u7531\u6b64\u4f20\u5165 Join \u7b97\u5b50\u7684\u6570\u636e\u91cf\u5c06\u51cf\u5c11 10 \u500d\uff0c\u8fdb\u800c\u663e\u8457\u5730\u964d\u4f4e Join \u7b97\u5b50\u7684\u5f00\u9500\u3002\u5bf9\u5e94\u7684\u6267\u884c\u8ba1\u5212\u5982\u4e0b\uff1a"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sql",children:"EXPLAIN SELECT o.order_id, SUM(price)\n  FROM order_tbl o, order_line_tbl ol\n  WHERE o.order_id = ol.order_id\n  GROUP BY o.order_id;\n                                          QUERY PLAN\n-----------------------------------------------------------------------------------------------\n Gather Motion 3:1  (slice1; segments: 3)  (cost=712.89..879.56 rows=10000 width=12)\n   ->  Finalize HashAggregate  (cost=712.89..746.23 rows=3333 width=12)\n         Group Key: o.order_id\n         ->  Hash Join  (cost=617.00..696.23 rows=3333 width=12)\n               Hash Cond: (ol.order_id = o.order_id)\n               ->  Partial HashAggregate  (cost=538.00..571.38 rows=3338 width=12)\n                     Group Key: ol.order_id\n                     ->  Seq Scan on order_line_tbl ol  (cost=0.00..371.33 rows=33333 width=8)\n               ->  Hash  (cost=37.33..37.33 rows=3333 width=4)\n                     ->  Seq Scan on order_tbl o  (cost=0.00..37.33 rows=3333 width=4)\n Optimizer: Postgres query optimizer\n"})}),"\n",(0,r.jsxs)(n.p,{children:["\u4e0e\u8be5\u573a\u666f\u76f8\u4f3c\u7684\u573a\u666f\u8fd8\u6709\uff1a\u8fde\u63a5\u9879\u76ee\u8868 (",(0,r.jsx)(n.code,{children:"project"}),") \u548c\u5b9e\u9a8c\u8868 (",(0,r.jsx)(n.code,{children:"experiment"}),")\uff0c\u5bf9\u4e8e\u6bcf\u4e2a\u9879\u76ee ",(0,r.jsx)(n.code,{children:"project"})," \u8ba1\u7b97\u8fc7\u53bb\u4e00\u5e74\u5185\u7684\u5b9e\u9a8c\u8d39\u7528\u603b\u548c\u3002\u5bf9\u5e94\u7684\u53c2\u8003 SQL \u8bed\u53e5\u5982\u4e0b\uff1a"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sql",children:"SELECT proj_name, sum(cost)\n    FROM experiment e, project p\n    WHERE e.e_pid = p.p_pid AND e.start_time > now() - interval '1 year'\n    GROUP BY proj_name;\n"})}),"\n",(0,r.jsxs)(n.p,{children:["\u5bf9\u4e8e\u8be5\u67e5\u8be2\uff0c\u5f00\u542f\u805a\u96c6\u4e0b\u63a8\u540e\uff0cCloudberry Database \u4f1a\u63d0\u524d\u5bf9 ",(0,r.jsx)(n.code,{children:"experiment"})," \u8868\u6839\u636e ",(0,r.jsx)(n.code,{children:"e_pid"})," \u5217\u8fdb\u884c\u9884\u805a\u96c6\uff0c\u5c06\u540c\u4e00\u4e2a ",(0,r.jsx)(n.code,{children:"project"})," \u7684\u4fe1\u606f\u5148\u805a\u96c6\u5728\u4e00\u8d77\u3002"]}),"\n",(0,r.jsxs)(n.p,{children:["\u4f46\u5982\u679c\u8be5\u67e5\u8be2\u5728 ",(0,r.jsx)(n.code,{children:"project"})," \u8868\u4e0a\u4e5f\u505a\u4e86\u8bb8\u591a\u7b5b\u9009\u7684\u8bdd\uff0c\u53ef\u80fd\u4f7f\u5f97  Join \u7684\u7b5b\u9009\u7387\u8fc7\u9ad8\uff0c\u5bfc\u81f4\u6267\u884c\u6548\u7387\u4e0d\u9ad8\uff0c\u56e0\u6b64\u805a\u96c6\u4e0b\u63a8\u6682\u65f6\u4e0d\u9002\u7528\u4e8e\u8fd9\u79cd\u60c5\u51b5\u3002"]}),"\n",(0,r.jsx)(n.h3,{id:"\u9002\u7528\u573a\u666f\u4e8c",children:"\u9002\u7528\u573a\u666f\u4e8c"}),"\n",(0,r.jsx)(n.p,{children:"\u573a\u666f\u63cf\u8ff0\uff1a\u67e5\u8be2\u8bed\u53e5\u4e2d\u7684 Join \u7b97\u5b50\u4f1a\u4f7f\u5f97\u7ed3\u679c\u96c6\u663e\u8457\u53d8\u5927\uff0c\u5e76\u6700\u7ec8\u9700\u8981\u5206\u7ec4\u8ba1\u7b97\u7ed3\u679c\u3002"}),"\n",(0,r.jsxs)(n.p,{children:["\u4f8b\u5982\u9700\u8981\u5c06 ",(0,r.jsx)(n.code,{children:"person_1"})," \u8868\u4e0e ",(0,r.jsx)(n.code,{children:"person_2"})," \u8868\u8fde\u63a5\uff0c\u6c42\u51fa\u4e24\u8868\u4e4b\u95f4\u6bcf\u4e2a\u76f8\u540c\u7684\u540d\u5b57\u80fd\u6709\u591a\u5c11\u4e0d\u540c\u7684\u5bf9\uff0cSQL \u67e5\u8be2\u5982\u4e0b\uff1a"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sql",children:"SELECT p1.name, COUNT(p1.name) FROM person_1 p1, person_2 p2 WHERE p1.name = p2.name GROUP BY p1.name;\n"})}),"\n",(0,r.jsxs)(n.p,{children:["\u8be5\u4f8b\u5b50\u4e2d\u82e5\u67d0\u4e2a ",(0,r.jsx)(n.code,{children:"name"})," \u5728 ",(0,r.jsx)(n.code,{children:"p1"})," \u8868\u4e2d\u51fa\u73b0 X \u6b21\uff0c\u5728 ",(0,r.jsx)(n.code,{children:"p2"})," \u8868\u4e2d\u51fa\u73b0 Y \u6b21\uff0c\u5219\u8be5 ",(0,r.jsx)(n.code,{children:"name"})," \u5728\u6700\u7ec8\u7684\u7ed3\u679c\u4e2d\u4f1a\u51fa\u73b0 X*Y \u6b21\u3002\u82e5\u5927\u91cf\u7684\u6570\u636e\u90fd\u662f\u8fd9\u79cd\u60c5\u51b5\uff0c\u6700\u7ec8 Join \u540e\u7684\u7ed3\u679c\u96c6\u53ef\u80fd\u5c31\u4f1a\u5f88\u5927\u3002"]}),"\n",(0,r.jsxs)(n.p,{children:["\u5728\u4ee5\u4e0a\u793a\u4f8b\u4e2d\uff0c\u5982\u679c\u5c06\u805a\u96c6\u8fd0\u7b97\u63d0\u524d\u4e0b\u63a8\u5230 ",(0,r.jsx)(n.code,{children:"p1"})," \u6216\u8005 ",(0,r.jsx)(n.code,{children:"p2"})," \u4fa7\uff0c\u5219\u6bcf\u4e2a ",(0,r.jsx)(n.code,{children:"name"})," \u5728\u8be5\u4fa7\u8fdb\u884c\u5b8c\u805a\u96c6\u4e4b\u540e\u6700\u591a\u51fa\u73b0\u4e00\u6b21\uff0c\u80fd\u6709\u6548\u5730\u51cf\u5c11 Join \u7b97\u5b50\u7684\u5f00\u9500\uff0c\u4ee5\u53ca\u540e\u7eed Aggregation \u7b97\u5b50\u9700\u8981\u5904\u7406\u7684\u8f93\u5165\u96c6\u5927\u5c0f\u3002\u5bf9\u5e94\u6267\u884c\u8ba1\u5212\u5982\u4e0b\uff1a"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sql",children:"EXPLAIN SELECT p1.name, COUNT(p1.name) FROM person_1 p1, person_2 p2 WHERE p1.name = p2.name GROUP BY p1.name;\n                                       QUERY PLAN\n-----------------------------------------------------------------------------------------\n Gather Motion 3:1  (slice1; segments: 3)  (cost=1758.62..1925.23 rows=9997 width=12)\n   ->  Finalize HashAggregate  (cost=1758.62..1791.94 rows=3332 width=12)\n         Group Key: p1.name\n         ->  Hash Join  (cost=762.93..1592.17 rows=33290 width=12)\n               Hash Cond: (p2.name = p1.name)\n               ->  Seq Scan on p2  (cost=0.00..371.33 rows=33333 width=4)\n               ->  Hash  (cost=637.97..637.97 rows=9997 width=12)\n                     ->  Partial HashAggregate  (cost=538.00..637.97 rows=9997 width=12)\n                           Group Key: p1.name\n                           ->  Seq Scan on p1  (cost=0.00..371.33 rows=33333 width=4)\n Optimizer: Postgres query optimizer\n(11 rows)\n"})}),"\n",(0,r.jsx)(n.h2,{id:"\u4e0d\u9002\u7528\u7684\u573a\u666f",children:"\u4e0d\u9002\u7528\u7684\u573a\u666f"}),"\n",(0,r.jsx)(n.p,{children:"\u4ee5\u4e0b\u573a\u666f\u96be\u4ee5\u901a\u8fc7\u805a\u96c6\u4e0b\u63a8\u5f97\u5230\u6027\u80fd\u63d0\u5347\uff0c\u4e0d\u5efa\u8bae\u5f00\u542f\u805a\u96c6\u4e0b\u63a8\u3002"}),"\n",(0,r.jsx)(n.h3,{id:"\u4e0d\u9002\u7528\u7684\u573a\u666f\u4e00",children:"\u4e0d\u9002\u7528\u7684\u573a\u666f\u4e00"}),"\n",(0,r.jsx)(n.p,{children:"\u573a\u666f\u63cf\u8ff0\uff1a\u6267\u884c\u805a\u96c6\u540e\u6570\u636e\u91cf\u53d8\u5316\u4e0d\u5927\u7684\u573a\u666f\u3002"}),"\n",(0,r.jsxs)(n.p,{children:["\u4e0e\u4ee5\u4e0a",(0,r.jsx)(n.a,{href:"#%E9%80%82%E7%94%A8%E5%9C%BA%E6%99%AF%E4%B8%80",children:"\u9002\u7528\u573a\u666f\u4e00"}),"\u4ee5\u53ca",(0,r.jsx)(n.a,{href:"#%E9%80%82%E7%94%A8%E5%9C%BA%E6%99%AF%E4%BA%8C",children:"\u9002\u7528\u573a\u666f\u4e8c"}),"\u76f8\u53cd\uff0c\u82e5\u63d0\u524d\u8fdb\u884c Aggregation \u4e0d\u4f1a\u4f7f\u5f97\u6570\u636e\u91cf\u53d1\u751f\u53d8\u5316\uff0c\u65e0\u6cd5\u51cf\u5c11\u540e\u7eed\u8ba1\u7b97\u7684\u8f93\u5165\u96c6\u5927\u5c0f\uff0c\u5219\u5e94\u8be5\u5148\u6267\u884c Join \u7b97\u5b50\u907f\u514d\u65e0\u8c13\u7684\u5f00\u9500\u3002"]}),"\n",(0,r.jsx)(n.h3,{id:"\u4e0d\u9002\u7528\u7684\u573a\u666f\u4e8c",children:"\u4e0d\u9002\u7528\u7684\u573a\u666f\u4e8c"}),"\n",(0,r.jsx)(n.p,{children:"\u573a\u666f\u63cf\u8ff0\uff1a\u82e5\u8fde\u63a5\u952e\u4e0e\u5206\u7ec4\u952e\u4e0d\u540c\uff0c\u5219\u805a\u96c6\u4e0b\u63a8\u4f1a\u4f7f\u5f97\u4e0b\u63a8\u540e\u7684\u5206\u7ec4\u952e\u53d1\u751f\u53d8\u5316\u3002\u8fd9\u79cd\u60c5\u51b5\u4e0b\uff0c\u805a\u96c6\u4e0b\u63a8\u6539\u5199\u5206\u7ec4\u952e\u540e\u7684\u805a\u96c6\u65e0\u6cd5\u51cf\u5c11\u6570\u636e\u91cf\uff0c\u5bfc\u81f4\u4e0b\u63a8\u540e\u7684\u805a\u96c6\u6548\u679c\u4e0d\u4f73\uff1a"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sql",children:"SELECT t1.value, COUNT(*) FROM t1, t2 WHERE t1.key = t2.key GROUP BY t1.value;\n"})}),"\n",(0,r.jsxs)(n.p,{children:["\u5bf9\u4e8e\u4ee5\u4e0a\u67e5\u8be2\u793a\u4f8b\uff0c\u5982\u679c\u76f4\u63a5\u5c06\u805a\u96c6\u4e0b\u63a8\u5230 ",(0,r.jsx)(n.code,{children:"t1"})," \u4fa7\u4f1a\u5bfc\u81f4\u5f97\u5230\u9519\u8bef\u7ed3\u679c\uff0c\u5177\u4f53\u7ec6\u8282\u7c7b\u4f3c",(0,r.jsx)(n.a,{href:"#%E4%BD%BF%E7%94%A8%E9%99%90%E5%88%B6%E4%B8%80",children:"\u4f7f\u7528\u9650\u5236\u4e00"}),"\u573a\u666f\u3002\u4e3a\u4e86\u4fdd\u8bc1\u8ba1\u7b97\u7ed3\u679c\u7684\u6b63\u786e\u6027\uff0c\u5b9e\u9645\u4e0b\u63a8\u7684\u805a\u96c6\u64cd\u4f5c\u6240\u7b49\u4ef7\u7684\u5206\u7ec4\u952e\u4f1a\u53d8\u6210 ",(0,r.jsx)(n.code,{children:"GROUP BY t1.key, t1.value"}),"\u3002"]}),"\n",(0,r.jsxs)(n.p,{children:["\u8fd9\u79cd\u60c5\u51b5\u4e0b\u5982\u679c ",(0,r.jsx)(n.code,{children:"t1"})," \u8868\u7684 ",(0,r.jsx)(n.code,{children:"key"})," \u4e0e ",(0,r.jsx)(n.code,{children:"value"})," \u662f\u5b8c\u5168\u4e0d\u76f8\u5e72\u7684\uff0c\u90a3\u4e48\u6bcf\u4e2a\u5206\u7ec4\u53ef\u80fd\u90fd\u53ea\u6709\u5355\u4e2a\u5143\u7ec4\uff0c\u56e0\u6b64\u8be5\u805a\u96c6\u4e0b\u63a8\u4e0d\u4f1a\u4ea7\u751f\u4efb\u4f55\u6b63\u9762\u6548\u679c\uff1b\u4f46\u5982\u679c ",(0,r.jsx)(n.code,{children:"key"})," \u4e0e ",(0,r.jsx)(n.code,{children:"value"})," \u76f8\u5173\u6027\u5f3a\uff0c\u6216\u8005\u76f8\u540c\u7684 ",(0,r.jsx)(n.code,{children:"key"})," \u4e00\u5b9a\u5bf9\u5e94\u76f8\u540c\u7684 ",(0,r.jsx)(n.code,{children:"value"}),"\uff0c\u5219\u5206\u7ec4\u6548\u679c\u4e0d\u4f1a\u53d7\u5230\u5f71\u54cd\u3002"]}),"\n",(0,r.jsxs)(n.p,{children:["\u5bf9\u4e8e\u4ee5\u4e0a\u793a\u4f8b\uff0c\u539f\u672c\u901a\u8fc7 ",(0,r.jsx)(n.code,{children:"t1.value"})," \u5206\u7ec4\u6548\u679c\u660e\u663e\u3002\u4f46\u7ecf\u8fc7\u805a\u96c6\u4e0b\u63a8\u540e\uff0c\u5206\u7ec4\u952e\u53d8\u6210 ",(0,r.jsx)(n.code,{children:"t1.key, t1.value"}),"\uff0c\u4e14 ",(0,r.jsx)(n.code,{children:"key"})," \u4e0e ",(0,r.jsx)(n.code,{children:"value"})," \u76f8\u5173\u6027\u5f31\uff0c\u5bfc\u81f4\u8be5\u805a\u96c6\u7684\u5206\u7ec4\u65e0\u6cd5\u4ea7\u751f\u660e\u663e\u7684\u6548\u679c\u3002"]}),"\n",(0,r.jsx)(n.h2,{id:"\u4f7f\u7528\u9650\u5236",children:"\u4f7f\u7528\u9650\u5236"}),"\n",(0,r.jsx)(n.p,{children:"\u8be5\u5c0f\u8282\u63cf\u8ff0\u805a\u96c6\u4e0b\u63a8\u7279\u6027\u7684\u4e00\u4e9b\u9650\u5236\uff0c\u5305\u62ec\u903b\u8f91\u4e0a\u65e0\u6cd5\u5e94\u7528\u8be5\u4f18\u5316\u7684\u60c5\u51b5\u4ee5\u53ca\u5de5\u7a0b\u5b9e\u73b0\u4e0a\u5c1a\u672a\u652f\u6301\u7684\u60c5\u51b5\u3002"}),"\n",(0,r.jsx)(n.h3,{id:"\u4f7f\u7528\u9650\u5236\u4e00",children:"\u4f7f\u7528\u9650\u5236\u4e00"}),"\n",(0,r.jsxs)(n.p,{children:["\u9650\u5236\u63cf\u8ff0\uff1a\u5728\u8fde\u63a5\u53ca\u540e\u7eed\u8ba1\u7b97\u8fc7\u7a0b\u4e2d\uff0c\u901a\u8fc7 ",(0,r.jsx)(n.code,{children:"GROUP BY"})," \u5217\u4ee5\u5916\u7684\u5217\u8fdb\u884c\u7b5b\u9009\u7684\u60c5\u51b5\u4e0b\u65e0\u6cd5\u5e94\u7528\u805a\u96c6\u4e0b\u63a8\u3002\u8003\u8651\u5982\u4e0b\u7684 SQL \u67e5\u8be2\uff1a"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sql",children:"SELECT id, SUM(val) FROM t1, t2 WHERE t1.id = t2.id AND t1.val > t2.val GROUP BY id;\n"})}),"\n",(0,r.jsxs)(n.p,{children:["\u5728\u4ee5\u4e0a\u793a\u4f8b\u4e2d\uff0c\u5047\u8bbe ",(0,r.jsx)(n.code,{children:"id"})," \u4e3a ",(0,r.jsx)(n.code,{children:"100"})," \u7684\u4e24\u4e2a\u6765\u81ea ",(0,r.jsx)(n.code,{children:"t1"})," \u8868\u7684\u5143\u7ec4 A \u548c B\uff0c\u4ee5\u53ca\u6765\u81ea ",(0,r.jsx)(n.code,{children:"t2"})," \u8868\u540c\u6837 ",(0,r.jsx)(n.code,{children:"id"})," \u4e3a ",(0,r.jsx)(n.code,{children:"100"})," \u7684\u5143\u7ec4 C\u3002"]}),"\n",(0,r.jsxs)(n.p,{children:["\u5728 AB \u548c C \u8fdb\u884c\u8fde\u63a5\u7684\u8fc7\u7a0b\u4e2d\uff0cA \u548c B \u867d\u7136 ",(0,r.jsx)(n.code,{children:"id"})," \u76f8\u540c\uff0c\u4f46\u4e0d\u80fd\u4fdd\u8bc1\u5b83\u4eec\u540c\u65f6\u901a\u8fc7\u6216\u8005\u4e0d\u901a\u8fc7 ",(0,r.jsx)(n.code,{children:"AB.val > C.val"})," \u7684\u7b5b\u9009\u6761\u4ef6\u3002\u5728\u8fd9\u79cd\u60c5\u51b5\u63d0\u524d\u6839\u636e ",(0,r.jsx)(n.code,{children:"id"})," \u5bf9 ",(0,r.jsx)(n.code,{children:"val"})," \u8fdb\u884c\u6c42\u548c\u5fc5\u7136\u4f1a\u5c06 A \u548c B \u7684 ",(0,r.jsx)(n.code,{children:"val"})," \u52a0\u5230\u4e00\u8d77\uff0c\u7136\u800c\u5b83\u4eec\u5e76\u4e0d\u4e00\u5b9a\u540c\u65f6\u901a\u8fc7\u6216\u4e0d\u901a\u8fc7\u7b5b\u9009\u6761\u4ef6\uff0c\u56e0\u6b64\u4f1a\u5bfc\u81f4\u5f97\u5230\u9519\u8bef\u7684\u7ed3\u679c\u3002"]}),"\n",(0,r.jsx)(n.p,{children:"\u4f5c\u4e3a\u5bf9\u6bd4\uff0c\u4ee5\u4e0b\u67e5\u8be2\u793a\u4f8b\u4e0e\u5176\u76f8\u4f3c\uff0c\u4f46\u53ef\u4ee5\u5e94\u7528\u805a\u96c6\u4e0b\u63a8\uff1a"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sql",children:"SELECT id, SUM(val) FROM t1, t2 WHERE t1.id = t2.id AND t1.id < t2.id_thre GROUP BY id;\n"})}),"\n",(0,r.jsxs)(n.p,{children:["\u8be5\u4f8b\u5b50\u4e2d\u540c\u6837\u8003\u8651\u4e0e\u524d\u9762\u4f8b\u5b50\u4e2d\u76f8\u540c\u7684 ABC \u4e09\u4e2a\u5143\u7ec4\uff0c\u7531\u4e8e\u989d\u5916\u7684\u7b5b\u9009\u6761\u4ef6\u4ec5\u7528\u5230 ",(0,r.jsx)(n.code,{children:"t1"})," \u4e2d\u7684 ",(0,r.jsx)(n.code,{children:"id"})," \u5217\uff0cAB \u8fd9\u4e24\u4e2a ",(0,r.jsx)(n.code,{children:"id"})," \u76f8\u540c\u7684\u5143\u7ec4\u4e0e\u7ed9\u5b9a\u7684\u5143\u7ec4 C \u8fde\u63a5\uff0c\u8981\u4e48\u90fd\u901a\u8fc7\u7b5b\u9009\uff0c\u8981\u4e48\u90fd\u4e0d\u901a\u8fc7\u7b5b\u9009\uff0c\u56e0\u6b64\u53ef\u4ee5\u63d0\u524d\u901a\u8fc7\u805a\u96c6\u64cd\u4f5c\u5c06 AB \u5143\u7ec4\u7684 val \u8fdb\u884c\u6c42\u548c\u3002"]}),"\n",(0,r.jsx)(n.h3,{id:"\u4f7f\u7528\u9650\u5236\u4e8c",children:"\u4f7f\u7528\u9650\u5236\u4e8c"}),"\n",(0,r.jsx)(n.p,{children:"\u9650\u5236\u63cf\u8ff0\uff1a\u4e0d\u652f\u6301\u5bf9 Join \u7684\u4e24\u4fa7\u540c\u65f6\u8fdb\u884c\u805a\u96c6\u4e0b\u63a8\u3002\u8003\u8651\u5982\u4e0b\u7684 SQL \u67e5\u8be2\uff1a"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sql",children:"SELECT id, SUM(val) FROM t1, t2 WHERE t1.id = t2.id GROUP BY id;\n"})}),"\n",(0,r.jsx)(n.p,{children:"\u5b9e\u9645\u4e0a\u6211\u4eec\u53ef\u4ee5\u6539\u5199\u8bed\u53e5\uff0c\u5f97\u5230\u4e0e\u5176\u7b49\u4ef7\u7684\u53e6\u4e00\u4e2a\u8bed\u53e5\uff1a"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sql",children:"SELECT id, sum1 * cnt2 FROM\n    (SELECT id, SUM(val) FROM t1 GROUP BY id) AT1(id, sum1),\n    (SELECT id, COUNT(*) FROM t2 GROUP BY id) AT2(id, cnt2)\nWHERE AT1.id = AT2.id GROUP BY id;\n"})}),"\n",(0,r.jsxs)(n.p,{children:["\u8be5\u4f8b\u5b50\u4e2d\u5c06\u805a\u96c6\u64cd\u4f5c\u540c\u65f6\u4e0b\u63a8\u5230\u4e86 Join \u7684\u4e24\u4fa7\u3002\u5bf9\u4e8e ",(0,r.jsx)(n.code,{children:"t1"})," \u8868\u4e2d ",(0,r.jsx)(n.code,{children:"id"})," \u4e3a ",(0,r.jsx)(n.code,{children:"100"})," \u7684\u5168\u90e8\u5143\u7ec4\uff0cCloudberry Database \u5bf9\u5176 ",(0,r.jsx)(n.code,{children:"val"})," \u63d0\u524d\u8fdb\u884c\u4e86\u6c42\u548c\uff0c\u5f97\u5230\u4e86\u5bf9\u5e94\u7684 ",(0,r.jsx)(n.code,{children:"sum1"}),"\u3002"]}),"\n",(0,r.jsxs)(n.p,{children:["\u5728\u5b9e\u9645\u8fdb\u884c\u8fde\u63a5\u7684\u8fc7\u7a0b\u4e2d\uff0c\u5bf9\u4e8e ",(0,r.jsx)(n.code,{children:"t2"})," \u8868\u4e2d\u6bcf\u4e2a ",(0,r.jsx)(n.code,{children:"id"})," \u4e3a ",(0,r.jsx)(n.code,{children:"100"})," \u7684\u5143\u7ec4\uff0c\u90fd\u4f1a\u4e0e ",(0,r.jsx)(n.code,{children:"sum1"})," \u6240\u5c5e\u7684\u5143\u7ec4\u8fdb\u884c\u8fde\u63a5\u5e76\u5f97\u5230\u5bf9\u5e94\u7684\u5143\u7ec4\u3002\u4e5f\u5c31\u662f\u8bf4 ",(0,r.jsx)(n.code,{children:"t2"})," \u4e2d\u6bcf\u6709\u4e00\u4e2a ",(0,r.jsx)(n.code,{children:"id"})," \u4e3a ",(0,r.jsx)(n.code,{children:"100"}),"\uff0c",(0,r.jsx)(n.code,{children:"sum1"})," \u5c31\u4f1a\u5728\u6700\u7ec8\u7684\u6c42\u548c\u7ed3\u679c\u4e2d\u51fa\u73b0\u4e00\u6b21\uff0c\u56e0\u6b64 Cloudberry Database \u53ef\u4ee5\u63d0\u524d\u5bf9 ",(0,r.jsx)(n.code,{children:"t2"})," \u8fdb\u884c\u805a\u96c6\uff0c\u8ba1\u7b97\u51fa\u603b\u5171\u6709 ",(0,r.jsx)(n.code,{children:"cnt2"})," \u4e2a ",(0,r.jsx)(n.code,{children:"id"})," \u4e3a ",(0,r.jsx)(n.code,{children:"100"})," \u7684 \u5143\u7ec4\uff0c\u6700\u540e\u53ef\u4ee5\u901a\u8fc7 ",(0,r.jsx)(n.code,{children:"sum1 * cnt2"})," \u6765\u8ba1\u7b97\u6700\u7ec8\u7684\u7ed3\u679c\u3002"]}),"\n",(0,r.jsx)(n.p,{children:"\u7531\u4e8e\u8be5\u573a\u666f\u6d89\u53ca\u5230\u76f8\u5bf9\u590d\u6742\u7684\u8bed\u53e5\u6539\u5199\u4ee5\u53ca\u8868\u8fbe\u5f0f\u6539\u5199\uff0c\u5728\u76ee\u524d\u4ea7\u54c1\u4e2d\u6682\u4e0d\u652f\u6301\u3002"})]})}function h(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(a,{...e})}):a(e)}},11151:(e,n,d)=>{d.d(n,{Z:()=>o,a:()=>c});var r=d(67294);const i={},s=r.createContext(i);function c(e){const n=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:c(e.components),r.createElement(s.Provider,{value:n},e.children)}}}]);