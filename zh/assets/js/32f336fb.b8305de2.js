"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[5268],{73580:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>t,contentTitle:()=>l,default:()=>u,frontMatter:()=>i,metadata:()=>a,toc:()=>d});var c=s(85893),r=s(11151);const i={title:"\u81ea\u52a8\u4f7f\u7528\u7269\u5316\u89c6\u56fe\u8fdb\u884c\u67e5\u8be2\u4f18\u5316"},l="\u81ea\u52a8\u4f7f\u7528\u7269\u5316\u89c6\u56fe\u8fdb\u884c\u67e5\u8be2\u4f18\u5316\uff08\u5f15\u5165\u81ea v1.5.0 \u7248\u672c\uff09",a={id:"performance/use-auto-materialized-view-to-answer-queries",title:"\u81ea\u52a8\u4f7f\u7528\u7269\u5316\u89c6\u56fe\u8fdb\u884c\u67e5\u8be2\u4f18\u5316",description:"\u81ea v1.5.0 \u7248\u672c\u8d77\uff0cCloudberry Database \u652f\u6301\u5728\u67e5\u8be2\u89c4\u5212\u9636\u6bb5\u81ea\u52a8\u4f7f\u7528\u7269\u5316\u89c6\u56fe\u6765\u8ba1\u7b97\u90e8\u5206\u6216\u5168\u90e8\u67e5\u8be2\uff08\u5373 AQUMV\uff09\u3002\u8fd9\u4e00\u529f\u80fd\u7279\u522b\u9002\u7528\u4e8e\u5728\u5927\u8868\u4e0a\u8fdb\u884c\u7684\u67e5\u8be2\uff0c\u80fd\u663e\u8457\u63d0\u9ad8\u67e5\u8be2\u5904\u7406\u65f6\u95f4\u3002AQUMV \u4f7f\u7528\u589e\u91cf\u7269\u5316\u89c6\u56fe (IMV)\uff0c\u56e0\u4e3a\u5f53\u76f8\u5173\u8868\u6709\u5199\u5165\u64cd\u4f5c\u65f6\uff0cIMV \u901a\u5e38\u80fd\u4fdd\u6301\u6700\u65b0\u7684\u6570\u636e\u3002",source:"@site/i18n/zh/docusaurus-plugin-content-docs/current/performance/use-auto-materialized-view-to-answer-queries.md",sourceDirName:"performance",slug:"/performance/use-auto-materialized-view-to-answer-queries",permalink:"/zh/docs/performance/use-auto-materialized-view-to-answer-queries",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/i18n/zh/docusaurus-plugin-content-docs/current/performance/use-auto-materialized-view-to-answer-queries.md",tags:[],version:"current",lastUpdatedBy:"Dianjin Wang",lastUpdatedAt:1739329693,formattedLastUpdatedAt:"2025\u5e742\u670812\u65e5",frontMatter:{title:"\u81ea\u52a8\u4f7f\u7528\u7269\u5316\u89c6\u56fe\u8fdb\u884c\u67e5\u8be2\u4f18\u5316"},sidebar:"docsbars",previous:{title:"\u5728 AO \u8868\u4e0a\u4f7f\u7528\u552f\u4e00\u7d22\u5f15",permalink:"/zh/docs/performance/use-unique-index-on-ao-tables"},next:{title:"\u4f7f\u7528\u589e\u91cf\u7269\u5316\u89c6\u56fe",permalink:"/zh/docs/performance/use-incremental-materialized-view"}},t={},d=[{value:"\u573a\u666f\u8bf4\u660e",id:"\u573a\u666f\u8bf4\u660e",level:2},{value:"\u4f7f\u7528\u793a\u4f8b",id:"\u4f7f\u7528\u793a\u4f8b",level:2},{value:"\u5b9e\u73b0\u539f\u7406",id:"\u5b9e\u73b0\u539f\u7406",level:2},{value:"\u4f7f\u7528\u9650\u5236",id:"\u4f7f\u7528\u9650\u5236",level:2},{value:"\u76f8\u5173\u5176\u4ed6\u529f\u80fd",id:"\u76f8\u5173\u5176\u4ed6\u529f\u80fd",level:2}];function o(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,r.a)(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(n.h1,{id:"\u81ea\u52a8\u4f7f\u7528\u7269\u5316\u89c6\u56fe\u8fdb\u884c\u67e5\u8be2\u4f18\u5316\u5f15\u5165\u81ea-v150-\u7248\u672c",children:"\u81ea\u52a8\u4f7f\u7528\u7269\u5316\u89c6\u56fe\u8fdb\u884c\u67e5\u8be2\u4f18\u5316\uff08\u5f15\u5165\u81ea v1.5.0 \u7248\u672c\uff09"}),"\n",(0,c.jsx)(n.p,{children:"\u81ea v1.5.0 \u7248\u672c\u8d77\uff0cCloudberry Database \u652f\u6301\u5728\u67e5\u8be2\u89c4\u5212\u9636\u6bb5\u81ea\u52a8\u4f7f\u7528\u7269\u5316\u89c6\u56fe\u6765\u8ba1\u7b97\u90e8\u5206\u6216\u5168\u90e8\u67e5\u8be2\uff08\u5373 AQUMV\uff09\u3002\u8fd9\u4e00\u529f\u80fd\u7279\u522b\u9002\u7528\u4e8e\u5728\u5927\u8868\u4e0a\u8fdb\u884c\u7684\u67e5\u8be2\uff0c\u80fd\u663e\u8457\u63d0\u9ad8\u67e5\u8be2\u5904\u7406\u65f6\u95f4\u3002AQUMV \u4f7f\u7528\u589e\u91cf\u7269\u5316\u89c6\u56fe (IMV)\uff0c\u56e0\u4e3a\u5f53\u76f8\u5173\u8868\u6709\u5199\u5165\u64cd\u4f5c\u65f6\uff0cIMV \u901a\u5e38\u80fd\u4fdd\u6301\u6700\u65b0\u7684\u6570\u636e\u3002"}),"\n",(0,c.jsx)(n.h2,{id:"\u573a\u666f\u8bf4\u660e",children:"\u573a\u666f\u8bf4\u660e"}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsx)(n.li,{children:"\u5927\u6570\u636e\u91cf\u7684\u805a\u5408\u67e5\u8be2\uff1a\u5bf9\u4e8e\u9700\u8981\u4ece\u6570\u767e\u4e07\u6761\u8bb0\u5f55\u4e2d\u8fdb\u884c\u805a\u5408\u7684\u67e5\u8be2\uff0cAQUMV \u80fd\u663e\u8457\u51cf\u5c11\u67e5\u8be2\u65f6\u95f4\u3002"}),"\n",(0,c.jsx)(n.li,{children:"\u9891\u7e41\u66f4\u65b0\u7684\u5927\u8868\uff1a\u5728\u6570\u636e\u9891\u7e41\u66f4\u65b0\u7684\u73af\u5883\u4e2d\uff0c\u4f7f\u7528 IMV \u53ef\u4ee5\u786e\u4fdd\u67e5\u8be2\u7ed3\u679c\u7684\u5b9e\u65f6\u6027\u548c\u51c6\u786e\u6027\u3002"}),"\n",(0,c.jsx)(n.li,{children:"\u590d\u6742\u8ba1\u7b97\u7684\u573a\u666f\uff1a\u5bf9\u4e8e\u5305\u542b\u590d\u6742\u8ba1\u7b97\uff08\u5982\u4ee5\u4e0b\u793a\u4f8b\u4e2d\u7684\u5e73\u65b9\u6839\u548c\u7edd\u5bf9\u503c\u8ba1\u7b97\uff09\u7684\u67e5\u8be2\uff0cAQUMV \u53ef\u4ee5\u901a\u8fc7\u9884\u8ba1\u7b97\u8fd9\u4e9b\u503c\u5728\u7269\u5316\u89c6\u56fe\u4e2d\uff0c\u52a0\u5feb\u67e5\u8be2\u901f\u5ea6\u3002"}),"\n"]}),"\n",(0,c.jsx)(n.h2,{id:"\u4f7f\u7528\u793a\u4f8b",children:"\u4f7f\u7528\u793a\u4f8b"}),"\n",(0,c.jsxs)(n.p,{children:["\u8981\u542f\u7528 AQUMV \u529f\u80fd\uff0c\u9700\u8981\u5148\u521b\u5efa\u7269\u5316\u89c6\u56fe\uff0c\u5e76\u5c06\u7cfb\u7edf\u53c2\u6570 ",(0,c.jsx)(n.code,{children:"enable_answer_query_using_materialized_views"})," \u7684\u503c\u8bbe\u4e3a ",(0,c.jsx)(n.code,{children:"ON"}),"\u3002\u4e0b\u9762\u662f\u4e0d\u4f7f\u7528 AQUMV \u4e0e\u4f7f\u7528 AQUMV \u6267\u884c\u76f8\u540c\u590d\u6742\u67e5\u8be2\u7684\u7ed3\u679c\u5bf9\u6bd4\u3002"]}),"\n",(0,c.jsxs)(n.ol,{children:["\n",(0,c.jsxs)(n.li,{children:["\n",(0,c.jsx)(n.p,{children:"\u5173\u95ed GPORCA \u6267\u884c\u4f18\u5316\u5668\uff0c\u4f7f\u7528\u57fa\u4e8e Postgres \u7684\u6267\u884c\u4f18\u5316\u5668\u3002"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-sql",children:"SET optimizer TO off;\n"})}),"\n"]}),"\n",(0,c.jsxs)(n.li,{children:["\n",(0,c.jsxs)(n.p,{children:["\u521b\u5efa\u8868\u683c ",(0,c.jsx)(n.code,{children:"aqumv_t1"}),"\u3002"]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-sql",children:"CREATE TABLE aqumv_t1(c1 INT, c2 INT, c3 INT) DISTRIBUTED BY (c1);\n"})}),"\n"]}),"\n",(0,c.jsxs)(n.li,{children:["\n",(0,c.jsx)(n.p,{children:"\u5f80\u8868\u4e2d\u63d2\u5165\u6570\u636e\uff0c\u5e76\u6536\u96c6\u8868\u4e0a\u7684\u7edf\u8ba1\u4fe1\u606f\u3002"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-sql",children:"INSERT INTO aqumv_t1 SELECT i, i+1, i+2 FROM generate_series(1, 100000000) i;\nANALYZE aqumv_t1;\n"})}),"\n"]}),"\n",(0,c.jsxs)(n.li,{children:["\n",(0,c.jsx)(n.p,{children:"\u5728\u4e0d\u5f00\u542f AQUMV \u7684\u60c5\u51b5\u4e0b\u6267\u884c\u67e5\u8be2\uff0c\u8017\u65f6 7384.329 ms\u3002"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-sql",children:"SELECT SQRT(ABS(ABS(c2) - c1 - 1) + ABS(c2)) FROM aqumv_t1 WHERE c1 > 30 AND c1 < 40 AND SQRT(ABS(c2)) > 5.8;\n\n    sqrt\n-------------------66.0827625302982196.2449979983983985.9160797830996166.1644140029689766.3245553203367595.830951894845301\n(7 rows)\n\nTime: 7384.329 ms (00:07.384)\n"})}),"\n",(0,c.jsxs)(n.p,{children:["\u8be5\u67e5\u8be2\u7684\u8ba1\u5212\u5982\u4e0b\uff0c\u53ef\u89c1\u4f18\u5316\u5668\u5bf9\u8868\u8fdb\u884c\u4e86\u626b\u63cf (",(0,c.jsx)(n.code,{children:"Seq Scan on aqumv_t1"}),")\u3002"]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-sql",children:"EXPLAIN(COSTS OFF) SELECT SQRT(ABS(ABS(c2) - c1 - 1) + ABS(c2)) FROM aqumv_t1 WHERE c1 > 30 AND c1 < 40 AND SQRT(ABS(c2)) > 5.8;\n\n                                                QUERY PLAN\n\n-------------------------------------------------------------------------------------------------------------\nGather Motion 3:1  (slice1; segments: 3)\n->  Seq Scan on aqumv_t1\n        Filter: ((c1 > 30) AND (c1 < 40) AND (sqrt((abs(c2))::double precision) > '5.8'::double pre\ncision))\nOptimizer: Postgres query optimizer\n(4 rows)\n"})}),"\n"]}),"\n",(0,c.jsxs)(n.li,{children:["\n",(0,c.jsxs)(n.p,{children:["\u73b0\u5728\u57fa\u4e8e ",(0,c.jsx)(n.code,{children:"aqumv_t1"})," \u521b\u5efa\u7269\u5316\u89c6\u56fe ",(0,c.jsx)(n.code,{children:"mvt1"}),"\uff0c\u5e76\u6536\u96c6\u8be5\u89c6\u56fe\u7684\u7edf\u8ba1\u4fe1\u606f\u3002"]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-sql",children:"CREATE INCREMENTAL MATERIALIZED VIEW mvt1 AS SELECT c1 AS mc1, c2 AS mc2, ABS(c2) AS mc3, ABS(ABS(c2) - c1 - 1) AS mc4\nFROM aqumv_t1 WHERE c1 > 30 AND c1 < 40;\n\nANALYZE mvt1;\n"})}),"\n"]}),"\n",(0,c.jsxs)(n.li,{children:["\n",(0,c.jsx)(n.p,{children:"\u5f00\u542f AQUMV \u76f8\u5173\u914d\u7f6e\u53c2\u6570\uff1a"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-sql",children:"SET enable_answer_query_using_materialized_views = ON;\n"})}),"\n"]}),"\n",(0,c.jsxs)(n.li,{children:["\n",(0,c.jsx)(n.p,{children:"\u73b0\u5728 AQUMV \u5df2\u5f00\u542f\uff0c\u518d\u6b21\u6267\u884c\u76f8\u540c\u7684\u8868\u67e5\u8be2\uff0c\u8017\u65f6 45.701 ms\u3002"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-sql",children:"SELECT SQRT(ABS(ABS(c2) - c1 - 1) + ABS(c2)) FROM aqumv_t1 WHERE c1 > 30 AND c1 < 40 AND SQRT(ABS(c2)) > 5.8;\n\n    sqrt\n-------------------66.0827625302982196.2449979983983985.8309518948453015.9160797830996166.1644140029689766.324555320336759\n(7 rows)\n\nTime: 45.701 ms\n"})}),"\n",(0,c.jsxs)(n.p,{children:["\u8be5\u67e5\u8be2\u7684\u8ba1\u5212\u5982\u4e0b\uff0c\u53ef\u89c1\u4f18\u5316\u5668\u6ca1\u6709\u626b\u63cf ",(0,c.jsx)(n.code,{children:"aqumv_t1"})," \u8868\uff0c\u800c\u626b\u63cf\u4e86\u7269\u5316\u89c6\u56fe ",(0,c.jsx)(n.code,{children:"mvt1"})," (",(0,c.jsx)(n.code,{children:"Seq Scan on public.mvt1"}),")\u3002"]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-sql",children:"explain(verbose, costs off)select sqrt(abs(abs(c2) - c1 - 1) + abs(c2)) from aqumv_t1 where c1 > 30 and c1 < 40 and sqrt(abs(c2)) > 5.8;\n\n                                QUERY PLAN\n--------------------------------------------------------------------------------\nGather Motion 3:1  (slice1; segments: 3)\nOutput: (sqrt(((mc4 + mc3))::double precision))\n->  Seq Scan on public.mvt1\n        Output: sqrt(((mc4 + mc3))::double precision)\n        Filter: (sqrt((mvt1.mc3)::double precision) > '5.8'::double precision)\nSettings: enable_answer_query_using_materialized_views = 'on', optimizer = 'off'\nOptimizer: Postgres query optimizer\n(7 rows)\n"})}),"\n",(0,c.jsxs)(n.p,{children:["\u5728\u4ee5\u4e0a\u793a\u4f8b\u4e2d\uff0c\u5728\u6ca1\u6709\u4f7f\u7528\u7269\u5316\u89c6\u56fe\u7684\u60c5\u51b5\u4e0b\uff0c\u67e5\u8be2\u8017\u65f6\u4e3a 7384.329 \u6beb\u79d2\u3002\u800c\u542f\u7528 AQUMV \u540e\uff0c\u4f7f\u7528\u7269\u5316\u89c6\u56fe\u7684\u76f8\u540c\u67e5\u8be2\u4ec5\u8017\u65f6 45.701 \u6beb\u79d2\u3002\u8fd9\u8bf4\u660e\u7269\u5316\u89c6\u56fe\u901a\u8fc7\u9884\u5148\u8ba1\u7b97\u548c\u5b58\u50a8\u76f8\u5173\u8ba1\u7b97\u7ed3\u679c\uff0c\u53ea\u5305\u542b\u4e86\u6ee1\u8db3\u7279\u5b9a\u6761\u4ef6\uff08",(0,c.jsx)(n.code,{children:"c1 > 30 and c1 < 40"}),"\uff09\u7684\u884c\u3002"]}),"\n",(0,c.jsxs)(n.p,{children:["\u56e0\u6b64\u4ee5\u4e0a\u8868\u67e5\u8be2 ",(0,c.jsx)(n.code,{children:"select sqrt(abs(abs(c2) - c1 - 1) + abs(c2)) from aqumv_t1 where c1 > 30 and c1 < 40 and sqrt(abs(c2)) > 5.8;"})," \u5b9e\u9645\u4e0a\u7b49\u6548\u4e8e\u5bf9\u7269\u5316\u89c6\u56fe\u7684\u67e5\u8be2\u8bed\u53e5 ",(0,c.jsx)(n.code,{children:"select sqrt(mc4 + mc3) from mvt1 where sqrt(mc3) > 5.8;"}),"\u3002"]}),"\n"]}),"\n"]}),"\n",(0,c.jsx)(n.p,{children:"\u901a\u8fc7\u8fd9\u79cd\u65b9\u5f0f\uff0c\u5f53\u6267\u884c\u76f8\u540c\u7684\u67e5\u8be2\u65f6\uff0c\u53ef\u4ee5\u76f4\u63a5\u4ece\u7269\u5316\u89c6\u56fe\u4e2d\u83b7\u53d6\u6570\u636e\uff0c\u800c\u4e0d\u662f\u4ece\u539f\u59cb\u8868\u4e2d\uff0c\u8fd9\u6837 AQUMV \u80fd\u663e\u8457\u63d0\u9ad8\u67e5\u8be2\u6027\u80fd\uff0c\u7279\u522b\u662f\u5728\u5904\u7406\u5927\u6570\u636e\u91cf\u548c\u590d\u6742\u8ba1\u7b97\u65f6\u3002"}),"\n",(0,c.jsx)(n.h2,{id:"\u5b9e\u73b0\u539f\u7406",children:"\u5b9e\u73b0\u539f\u7406"}),"\n",(0,c.jsx)(n.p,{children:"AQUMV \u662f\u901a\u8fc7\u5bf9\u67e5\u8be2\u6811\u8fdb\u884c\u7b49\u6548\u8f6c\u6362\u6765\u5b9e\u73b0\u67e5\u8be2\u4f18\u5316\u7684\u3002"}),"\n",(0,c.jsx)(n.p,{children:"\u8868\u67e5\u8be2\u53ea\u6709\u6ee1\u8db3\u4ee5\u4e0b\u6761\u4ef6\u540e\uff0cCloudberry Database  \u624d\u4f1a\u81ea\u52a8\u4f7f\u7528\u7269\u5316\u89c6\u56fe\uff1a"}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsx)(n.li,{children:"\u7269\u5316\u89c6\u56fe\u5fc5\u987b\u5305\u542b\u67e5\u8be2\u8868\u8fbe\u5f0f\u6240\u9700\u7684\u6240\u6709\u884c\u3002"}),"\n",(0,c.jsx)(n.li,{children:"\u5982\u679c\u7269\u5316\u89c6\u56fe\u5305\u542b\u6bd4\u67e5\u8be2\u66f4\u591a\u7684\u884c\uff0c\u53ef\u80fd\u9700\u8981\u6dfb\u52a0\u989d\u5916\u7684\u8fc7\u6ee4\u6761\u4ef6\u3002"}),"\n",(0,c.jsx)(n.li,{children:"\u6240\u6709\u8f93\u51fa\u8868\u8fbe\u5f0f\u5fc5\u987b\u80fd\u591f\u4ece\u89c6\u56fe\u7684\u8f93\u51fa\u4e2d\u8ba1\u7b97\u5f97\u51fa\u3002"}),"\n",(0,c.jsx)(n.li,{children:"\u8f93\u51fa\u8868\u8fbe\u5f0f\u53ef\u4ee5\u5b8c\u5168\u6216\u90e8\u5206\u4e0e\u7269\u5316\u89c6\u56fe\u7684\u76ee\u6807\u5217\u8868\u5339\u914d\u3002"}),"\n"]}),"\n",(0,c.jsx)(n.p,{children:"\u5f53\u5b58\u5728\u591a\u4e2a\u6709\u6548\u7684\u7269\u5316\u89c6\u56fe\u5019\u9009\u9879\u65f6\uff0c\u6216\u8005\u5f53\u4ece\u7269\u5316\u89c6\u56fe\u4e2d\u67e5\u8be2\u7684\u6210\u672c\u9ad8\u4e8e\u76f4\u63a5\u4ece\u539f\u59cb\u8868\u4e2d\u67e5\u8be2\uff08\u4f8b\u5982\uff0c\u539f\u59cb\u8868\u6709\u7d22\u5f15\u7b49\u60c5\u51b5\uff09\uff0c\u53ef\u4ee5\u8ba9\u89c4\u5212\u5668\u6839\u636e\u4ee3\u4ef7\u4f30\u7b97\u51b3\u5b9a\u6700\u4f73\u9009\u62e9\u3002"}),"\n",(0,c.jsx)(n.h2,{id:"\u4f7f\u7528\u9650\u5236",children:"\u4f7f\u7528\u9650\u5236"}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:["\u53ea\u652f\u6301\u5bf9\u5355\u4e00\u5173\u7cfb\u7684 ",(0,c.jsx)(n.code,{children:"SELECT"})," \u67e5\u8be2\uff0c\u9002\u7528\u4e8e\u7269\u5316\u89c6\u56fe\u67e5\u8be2\u548c\u539f\u59cb\u67e5\u8be2\u3002"]}),"\n",(0,c.jsxs)(n.li,{children:["\u5f53\u524d\u4e0d\u652f\u6301\u7684\u529f\u80fd\u5305\u62ec\uff1a\u805a\u5408 (AGG)\u3001\u5b50\u67e5\u8be2\u3001\u539f\u59cb\u67e5\u8be2\u7684\u6392\u5e8f (ORDER BY)\u3001\u8fde\u63a5 (JOIN)\u3001\u5b50\u94fe\u63a5(SUBLINK)\u3001\u5206\u7ec4 (GROUP BY)\u3001\u7a97\u53e3\u51fd\u6570\u3001\u516c\u5171\u8868\u8868\u8fbe\u5f0f (CTE)\u3001\u53bb\u91cd (DISTINCT ON)\u3001\u5237\u65b0\u7269\u5316\u89c6\u56fe(REFRESH MATERIALIZED VIEW)\u3001",(0,c.jsx)(n.code,{children:"CREATE AS"})," \u8bed\u53e5\u3002"]}),"\n"]}),"\n",(0,c.jsx)(n.h2,{id:"\u76f8\u5173\u5176\u4ed6\u529f\u80fd",children:"\u76f8\u5173\u5176\u4ed6\u529f\u80fd"}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.a,{href:"/zh/docs/performance/parallel-create-ao-refresh-mv",children:"\u5e76\u884c\u521b\u5efa AO \u8868\u4e0e\u5237\u65b0\u7269\u5316\u89c6\u56fe"})}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.a,{href:"/zh/docs/performance/use-incremental-materialized-view",children:"\u589e\u91cf\u7269\u5316\u89c6\u56fe\u8bf4\u660e\u6587\u6863"})})]})}function u(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,c.jsx)(n,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}},11151:(e,n,s)=>{s.d(n,{Z:()=>a,a:()=>l});var c=s(67294);const r={},i=c.createContext(r);function l(e){const n=c.useContext(i);return c.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:l(e.components),c.createElement(i.Provider,{value:n},e.children)}}}]);