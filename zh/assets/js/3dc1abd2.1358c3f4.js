"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[7742],{36545:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>d,contentTitle:()=>l,default:()=>u,frontMatter:()=>s,metadata:()=>o,toc:()=>c});var t=i(85893),r=i(11151);const s={title:"\u4f7f\u7528 RuntimeFilter \u4f18\u5316 Join \u67e5\u8be2"},l="\u4f7f\u7528 RuntimeFilter \u4f18\u5316 Join \u67e5\u8be2",o={id:"performance/use-runtimefilter-to-optimize-queries",title:"\u4f7f\u7528 RuntimeFilter \u4f18\u5316 Join \u67e5\u8be2",description:"\u5728\u6267\u884c\u5927\u8868\u8fde\u63a5\u67e5\u8be2\u7684\u65f6\u5019\uff0cSQL \u4f18\u5316\u5668\u5e38\u9009\u7528 HashJoin \u7b97\u5b50\u6765\u8fdb\u884c\u8fd0\u7b97\u3002HashJoin \u57fa\u4e8e\u8fde\u63a5\u952e\u6784\u5efa\u54c8\u5e0c\u8868\u6765\u8fdb\u884c\u8fde\u63a5\u952e\u7684\u5339\u914d\uff0c\u8fd9\u53ef\u80fd\u5b58\u5728\u5185\u5b58\u8bbf\u95ee\u548c\u78c1\u76d8\u74f6\u9888\u3002RuntimeFilter \u662f\u5728\u6267\u884c HashJoin \u8fd0\u7b97\u65f6\uff0c\u5b9e\u65f6\u4ea7\u751f\u8fc7\u6ee4\u5668 (Filter) \u7684\u4f18\u5316\u6280\u672f\uff0c\u53ef\u4ee5\u5728\u6267\u884c HashJoin \u524d\u9884\u5148\u5bf9\u6570\u636e\u8fdb\u884c\u7b5b\u9009\uff0c\u66f4\u5feb\u5730\u6267\u884c HashJoin\u3002\u5728\u67d0\u4e9b\u573a\u666f\u4e0b\uff0c\u901a\u8fc7 RuntimeFilter \u4f18\u5316\u80fd\u591f\u4f7f\u6267\u884c\u6548\u7387\u7ffb\u500d\u3002",source:"@site/i18n/zh/docusaurus-plugin-content-docs/current/performance/use-runtimefilter-to-optimize-queries.md",sourceDirName:"performance",slug:"/performance/use-runtimefilter-to-optimize-queries",permalink:"/zh/docs/performance/use-runtimefilter-to-optimize-queries",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/i18n/zh/docusaurus-plugin-content-docs/current/performance/use-runtimefilter-to-optimize-queries.md",tags:[],version:"current",lastUpdatedBy:"Dianjin Wang",lastUpdatedAt:1744271659,formattedLastUpdatedAt:"2025\u5e744\u670810\u65e5",frontMatter:{title:"\u4f7f\u7528 RuntimeFilter \u4f18\u5316 Join \u67e5\u8be2"},sidebar:"docsbars",previous:{title:"\u5728 AO \u8868\u4e0a\u4f7f\u7528 IndexScan",permalink:"/zh/docs/performance/use-index-scan-on-ao-tables"},next:{title:"\u4f7f\u7528\u5217\u7ea7\u538b\u7f29",permalink:"/zh/docs/performance/use-columnar-compression"}},d={},c=[{value:"\u9002\u7528\u573a\u666f",id:"\u9002\u7528\u573a\u666f",level:2},{value:"\u4f7f\u7528\u9650\u5236",id:"\u4f7f\u7528\u9650\u5236",level:2},{value:"\u7528\u6cd5\u793a\u4f8b",id:"\u7528\u6cd5\u793a\u4f8b",level:2},{value:"\u4f18\u5316\u6548\u679c\u793a\u4f8b",id:"\u4f18\u5316\u6548\u679c\u793a\u4f8b",level:2}];function a(e){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"\u4f7f\u7528-runtimefilter-\u4f18\u5316-join-\u67e5\u8be2",children:"\u4f7f\u7528 RuntimeFilter \u4f18\u5316 Join \u67e5\u8be2"}),"\n",(0,t.jsx)(n.p,{children:"\u5728\u6267\u884c\u5927\u8868\u8fde\u63a5\u67e5\u8be2\u7684\u65f6\u5019\uff0cSQL \u4f18\u5316\u5668\u5e38\u9009\u7528 HashJoin \u7b97\u5b50\u6765\u8fdb\u884c\u8fd0\u7b97\u3002HashJoin \u57fa\u4e8e\u8fde\u63a5\u952e\u6784\u5efa\u54c8\u5e0c\u8868\u6765\u8fdb\u884c\u8fde\u63a5\u952e\u7684\u5339\u914d\uff0c\u8fd9\u53ef\u80fd\u5b58\u5728\u5185\u5b58\u8bbf\u95ee\u548c\u78c1\u76d8\u74f6\u9888\u3002RuntimeFilter \u662f\u5728\u6267\u884c HashJoin \u8fd0\u7b97\u65f6\uff0c\u5b9e\u65f6\u4ea7\u751f\u8fc7\u6ee4\u5668 (Filter) \u7684\u4f18\u5316\u6280\u672f\uff0c\u53ef\u4ee5\u5728\u6267\u884c HashJoin \u524d\u9884\u5148\u5bf9\u6570\u636e\u8fdb\u884c\u7b5b\u9009\uff0c\u66f4\u5feb\u5730\u6267\u884c HashJoin\u3002\u5728\u67d0\u4e9b\u573a\u666f\u4e0b\uff0c\u901a\u8fc7 RuntimeFilter \u4f18\u5316\u80fd\u591f\u4f7f\u6267\u884c\u6548\u7387\u7ffb\u500d\u3002"}),"\n",(0,t.jsx)(n.p,{children:"HashJoin \u5e38\u7528\u4e8e\u5c0f\u8868\u548c\u5927\u8868\u7684\u8fde\u63a5\u3002Apache Cloudberry \u5728\u6267\u884c HashJoin \u8fd0\u7b97\u65f6\uff0c\u901a\u5e38\u57fa\u4e8e\u5f85\u8fde\u63a5\u7684\u4e24\u8868\u4e2d\u8f83\u5c0f\u7684\u8868\u6765\u6784\u5efa\u54c8\u5e0c\u8868\uff0c\u7136\u540e\u5faa\u73af\u5730\u6839\u636e\u8f83\u5927\u8868\u4e2d\u7684\u5143\u7956\uff0c\u5728\u54c8\u5e0c\u8868\u4e2d\u67e5\u627e\u8fde\u63a5\u952e\u5339\u914d\u7684\u5143\u7956\u6765\u5b9e\u73b0\u8fde\u63a5\u3002\u7528\u6765\u6784\u5efa\u54c8\u5e0c\u8868\u7684\u5c0f\u8868\u88ab\u79f0\u4e3a\u5185\u8868 (Inner Table)\uff0c\u53e6\u4e00\u4e2a\u7528\u6765\u5faa\u73af\u5339\u914d\u7684\u8868\u88ab\u79f0\u4e3a\u5916\u8868 (Outer Table)\u3002"}),"\n",(0,t.jsx)(n.p,{children:"HashJoin \u7b97\u5b50\u5728\u6267\u884c\u4e0a\u4e3b\u8981\u5b58\u5728\u4ee5\u4e0b\u74f6\u9888\uff1a"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u5185\u5b58\u8bbf\u95ee\uff1a\u5bf9\u4e8e\u5916\u8868\u7684\u6bcf\u4e2a\u5143\u7ec4\uff0c\u9700\u8981\u5728\u54c8\u5e0c\u8868\u4e2d\u67e5\u627e\u5339\u914d\u7684\u5185\u8868\u5143\u7ec4\uff0c\u6d89\u53ca\u4e00\u6b21\u6216\u591a\u6b21\u5185\u5b58\u8bbf\u95ee\u3002"}),"\n",(0,t.jsx)(n.li,{children:"\u78c1\u76d8 I/O\uff1a\u82e5\u5185\u8868\u4e0d\u9002\u5408\u5168\u90e8\u653e\u5230\u5185\u5b58\u4e2d\uff0c\u9700\u8981\u501f\u52a9\u78c1\u76d8\u6765\u5206\u6279\u6b21\u8fdb\u884c\u5904\u7406\uff0c\u56e0\u6b64\u4ea7\u751f\u5927\u91cf\u78c1\u76d8 I/O\u3002"}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"\u9488\u5bf9\u4ee5\u4e0a\u74f6\u9888\u5f00\u542f RuntimeFilter \u4f18\u5316\u540e\uff0cApache Cloudberry \u5728\u6784\u5efa\u54c8\u5e0c\u8868\u7684\u540c\u65f6\uff0c\u4e5f\u4f1a\u6784\u5efa\u5bf9\u5e94\u7684 RuntimeFilter\uff0c\u5373\u5728\u6267\u884c HashJoin \u4e4b\u524d\u5bf9\u5927\u8868\u7684\u5143\u7ec4\u8fdb\u884c\u8fc7\u6ee4\u3002\u5728\u6267\u884c\u8fc7\u7a0b\u4e2d\uff0c\u901a\u8fc7\u5e03\u9686\u8fc7\u6ee4\u5668 (Bloom Filter) \u6765\u5b9e\u73b0 RuntimeFilter\uff0c\u8be5\u6570\u636e\u7ed3\u6784\u6240\u5360\u5185\u5b58\u7a7a\u95f4\u8fdc\u5c0f\u4e8e\u54c8\u5e0c\u8868\u3002\u5728\u80fd\u591f\u5b8c\u5168\u5b58\u653e\u5728 L3 \u7f13\u5b58\u4e2d\u7684\u60c5\u51b5\u4e0b\uff0c\u5e03\u9686\u8fc7\u6ee4\u5668\u7684\u8fc7\u6ee4\u6548\u7387\u4e3a HashJoin \u7684\u4e24\u500d\uff0c\u4f7f\u5f97\u5185\u5b58\u8bbf\u95ee\u5f00\u9500\u5927\u5927\u964d\u4f4e\u3002"}),"\n",(0,t.jsx)(n.p,{children:"\u8be5\u4f18\u5316\u4f1a\u6839\u636e HashJoin \u7684\u8fde\u63a5\u6761\u4ef6\u7684\u7b5b\u9009\u7387\u4ee5\u53ca\u5185\u8868\u7684\u5927\u5c0f\u6765\u51b3\u5b9a\u662f\u5426\u751f\u6210 RuntimeFilter \u7b97\u5b50\uff0c\u5728\u5b9e\u9645\u6267\u884c\u7684\u8fc7\u7a0b\u4e2d\u5982\u679c\u53d1\u73b0\u6570\u636e\u91cf\u4e0e\u4f30\u7b97\u7ed3\u679c\u504f\u79bb\u592a\u5927\uff0cApache Cloudberry \u4e5f\u4f1a\u53ca\u65f6\u505c\u6b62\u4f7f\u7528 RuntimeFilter\u3002"}),"\n",(0,t.jsx)(n.h2,{id:"\u9002\u7528\u573a\u666f",children:"\u9002\u7528\u573a\u666f"}),"\n",(0,t.jsx)(n.p,{children:"\u5982\u679c\u573a\u666f\u540c\u65f6\u6ee1\u8db3\u4ee5\u4e0b\u6761\u4ef6\uff0c\u53ef\u4ee5\u8003\u8651\u5728 HashJoin \u8fd0\u7b97\u4e2d\u4f7f\u7528 RuntimeFilter \u4f18\u5316\uff1a"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u5355\u4e2a Segment \u4e2d HashJoin \u7684\u5185\u8868\u5927\u5c0f\u5728 1600 \u4e07\u884c\u4ee5\u5185\u3002"}),"\n",(0,t.jsx)(n.li,{children:"\u539f\u672c\u7684 HashJoin \u8fde\u63a5\u952e\u5bf9\u6570\u636e\u7684\u9009\u62e9\u7387\u4f4e\u4e8e 60%\uff0c\u5373\u6ee1\u8db3 Hash \u8fde\u63a5\u6761\u4ef6\u7684\u7ed3\u679c\u96c6\u5927\u5c0f\u4e0d\u5230\u5916\u8868\u7684 60%\uff0c\u4e5f\u53ef\u4ee5\u7406\u89e3\u4e3a\u7b5b\u9009\u7387\u5927\u4e8e 40%\u3002"}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"\u4e0a\u8ff0\u573a\u666f\u4e0b\uff0cApache Cloudberry \u901a\u8fc7 RuntimeFilter \u6784\u5efa\u7684\u5e03\u9686\u8fc7\u6ee4\u5668\u5927\u5c0f\u5728 2 MB \u4ee5\u5185\uff0c\u80fd\u591f\u5b8c\u5168\u5b58\u653e\u5728 L3 \u7f13\u5b58\u4e2d\uff0c\u8fdb\u800c\u80fd\u4ee5\u8f83\u5c0f\u7684\u5f00\u9500\u7b5b\u9009\u6389 40% \u7684\u5916\u8868\u5143\u7ec4\uff0c\u56e0\u6b64\u4ea7\u751f\u6b63\u5411\u6536\u76ca\u3002\u5728\u67d0\u4e9b\u573a\u666f\u4e0b\uff0c\u5982\u679c\u8be5 HashJoin \u8fde\u63a5\u952e\u7684\u9009\u62e9\u7387\u4f4e\u4e8e 10%\uff0c\u901a\u8fc7 RuntimeFilter \u4f18\u5316\u80fd\u591f\u4f7f\u6267\u884c\u6548\u7387\u7ffb\u500d\u3002"}),"\n",(0,t.jsx)(n.h2,{id:"\u4f7f\u7528\u9650\u5236",children:"\u4f7f\u7528\u9650\u5236"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"\u5f53\u524d RuntimeFilter \u4ec5\u652f\u6301\u5728\u5185\u8868\u884c\u6570\u4f30\u8ba1\u5c0f\u4e8e 1600 \u4e07\u884c\u7684\u60c5\u51b5\u4e0b\u542f\u7528\u3002"})}),"\n",(0,t.jsx)(n.p,{children:"\u8be5\u9650\u5236\u662f\u4e3a\u4e86\u907f\u514d\u5e03\u9686\u8fc7\u6ee4\u5668\u5360\u7528\u5185\u5b58\u8fc7\u5927\uff0c\u800c\u5bfc\u81f4\u6267\u884c\u901f\u5ea6\u6162\u6216\u8005\u7b5b\u9009\u6548\u7387\u8fc7\u4f4e\u3002\u5728\u672a\u6765\u7684\u66f4\u65b0\u4e2d\uff0c\u53ef\u80fd\u4f1a\u652f\u6301\u5728\u8d85\u5927\u5185\u8868\u7684\u60c5\u51b5\u4e0b\u4f7f\u7528 RuntimeFilter \u6765\u907f\u514d\u5206\u6279\u6267\u884c\u5e26\u6765\u7684\u78c1\u76d8 IO \u5f00\u9500\u3002"}),"\n",(0,t.jsx)(n.h2,{id:"\u7528\u6cd5\u793a\u4f8b",children:"\u7528\u6cd5\u793a\u4f8b"}),"\n",(0,t.jsx)(n.p,{children:"\u4ee5\u4e0b\u4e3a HashJoin \u7b97\u6cd5\u53d7\u76ca\u4e8e RuntimeFilter \u7684\u5b9e\u9645\u4f8b\u5b50\uff1a"}),"\n",(0,t.jsxs)(n.p,{children:["\u8be5\u4f18\u5316\u4ec5\u5728 PostgreSQL \u4f18\u5316\u5668\u4e2d\u751f\u6548\uff0c\u56e0\u6b64\u5f00\u542f\u524d\uff0c\u4f60\u9700\u8981\u5148\u5173\u95ed GPORCA \u4f18\u5316\u5668\uff0c\u5e76\u624b\u52a8\u5f00\u542f GUC \u7684\u53c2\u6570 ",(0,t.jsx)(n.code,{children:"gp_enable_runtime_filter"}),"\u3002"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sql",children:"-- \u51c6\u5907\u5de5\u4f5c\nSET optimizer TO off; -- \u5173\u95ed ORCA \u4f18\u5316\u5668\uff0c\u4f7f\u7528 PostgreSQL \u4f18\u5316\u5668\nSET gp_enable_runtime_filter TO on; -- \u5f00\u542f RuntimeFilter \u4f18\u5316\n\n-- \u521b\u5efa\u8868\u683c\nDROP TABLE IF EXISTS fact, dim;\nCREATE TABLE fact (fid int, did int, val int);\nCREATE TABLE dim (did int, proj_id int, filter_val int);\n\n-- \u751f\u6210\u6d4b\u8bd5\u6570\u636e\uff0c\u5176\u4e2d fact.did \u4e0e dim.did \u6709 80% \u662f\u91cd\u53e0\u7684\nINSERT INTO fact SELECT i, i % 8000 + 1, i FROM generate_series(1, 100000) s(i);\nINSERT INTO dim SELECT i, i % 10, i FROM generate_series(1, 10000) s(i);\nANALYZE fact, dim;\n\n-- \u67e5\u770b\u6267\u884c\u8ba1\u5212\nEXPLAIN (COSTS OFF) SELECT COUNT(*) FROM fact, dim\n    WHERE fact.did = dim.did AND proj_id < 2;\n                                QUERY PLAN\n---------------------------------------------------------------------------\n Finalize Aggregate\n   ->  Gather Motion 3:1  (slice1; segments: 3)\n         ->  Partial Aggregate\n               ->  Hash Join\n                     Hash Cond: (fact.did = dim.did)\n                     ->  RuntimeFilter\n                           ->  Seq Scan on fact\n                     ->  Hash\n                           ->  Broadcast Motion 3:3  (slice2; segments: 3)\n                                 ->  Seq Scan on dim\n                                       Filter: (proj_id < 2)\n Optimizer: Postgres query optimizer\n(12 rows)\n"})}),"\n",(0,t.jsxs)(n.p,{children:["\u4ee5\u4e0a\u6267\u884c\u8ba1\u5212\u4e2d\u51fa\u73b0\u4e86 ",(0,t.jsx)(n.code,{children:"RuntimeFilter"})," \u7b97\u5b50\u3002\u5982\u679c\u8981\u6253\u5370\u66f4\u591a\u6267\u884c\u76f8\u5173\u7684\u4fe1\u606f\uff0c\u4f60\u53ef\u4ee5\u4f7f\u7528 ",(0,t.jsx)(n.code,{children:"EXPLAIN ANALYZE"}),"\uff1a"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sql",children:"->  RuntimeFilter (actual time=0.047..5.976 rows=6682 loops=1)\n       Bloom Bits: 1048576\n       Extra Text: (seg1)   Inner Processed: 2000, Flase Positive Rate: 0.000000\n"})}),"\n",(0,t.jsx)(n.h2,{id:"\u4f18\u5316\u6548\u679c\u793a\u4f8b",children:"\u4f18\u5316\u6548\u679c\u793a\u4f8b"}),"\n",(0,t.jsxs)(n.p,{children:["\u4f7f\u7528\u201c\u7528\u6cd5\u793a\u4f8b\u201d\u7684\u8868\uff0c\u4ee5\u9879\u76ee ",(0,t.jsx)(n.code,{children:"id"})," \u5c0f\u4e8e ",(0,t.jsx)(n.code,{children:"2"})," \u4e3a\u6761\u4ef6\uff0c",(0,t.jsx)(n.code,{children:"did"})," \u5217\u4e3a\u8fde\u63a5\u952e\uff0c\u5c06 ",(0,t.jsx)(n.code,{children:"fact"})," \u548c ",(0,t.jsx)(n.code,{children:"dim"})," \u8868\u8fde\u63a5\u8d77\u6765\uff0c\u53ef\u4ece\u6267\u884c\u65f6\u95f4\u4e0a\u770b\u51fa\u4f7f\u7528 RuntimeFilter \u7684\u6548\u679c\uff1a"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sql",children:"-- \u672a\u5f00\u542f RuntimeFilter\nEXPLAIN ANALYZE SELECT COUNT(*) FROM fact, dim\n    WHERE fact.did = dim.did AND proj_id < 2;\n\nExecution Time: 35956.436 ms\n\n-- \u5f00\u542f RuntimeFilter\nSET gp_enable_runtime_filter TO on;\nEXPLAIN ANALYZE SELECT COUNT(*) FROM fact, dim\n    WHERE fact.did = dim.did AND proj_id < 2;\n\nExecution Time: 18276.112 ms\n"})}),"\n",(0,t.jsxs)(n.p,{children:["\u4ee5\u4e0a\u4e3a ",(0,t.jsx)(n.code,{children:"EXPLAIN ANALYZE"})," \u7684\u90e8\u5206\u7ed3\u679c\u3002\u5728\u5b8c\u6574\u7ed3\u679c\u4e2d\uff0cfact \u8868\u626b\u63cf\u51fa\u5143\u7ec4 1 \u4ebf\u6761\uff0c\u7ecf\u8fc7 RuntimeFilter \u540e\u5269\u4f59 2200 \u4e07\u6761\uff0c\u6700\u540e\u901a\u8fc7 HashJoin \u540e\u521a\u597d\u5269\u4e0b\u9884\u671f\u4e2d\u7684 2000 \u4e07\u6761\u3002\u63d0\u524d\u8fc7\u6ee4\u6548\u679c\u660e\u663e\uff0c\u8017\u65f6\u4e5f\u57fa\u672c\u4e0a\u51cf\u5c11\u4e86 50%\u3002"]})]})}function u(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(a,{...e})}):a(e)}},11151:(e,n,i)=>{i.d(n,{Z:()=>o,a:()=>l});var t=i(67294);const r={},s=t.createContext(r);function l(e){const n=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:l(e.components),t.createElement(s.Provider,{value:n},e.children)}}}]);