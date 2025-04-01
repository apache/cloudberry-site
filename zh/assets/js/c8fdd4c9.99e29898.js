"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[493],{52898:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>t,contentTitle:()=>c,default:()=>o,frontMatter:()=>d,metadata:()=>i,toc:()=>a});var l=r(85893),s=r(11151);const d={title:"\u5e76\u884c\u6267\u884c\u67e5\u8be2"},c="\u5e76\u884c\u6267\u884c\u67e5\u8be2",i={id:"performance/parallel-query-execution",title:"\u5e76\u884c\u6267\u884c\u67e5\u8be2",description:"\u672c\u6587\u6863\u4ecb\u7ecd Apache Cloudberry \u5e76\u884c\u67e5\u8be2\u7684\u4f7f\u7528\u573a\u666f\u3001\u4f7f\u7528\u65b9\u6cd5\u3001\u4f7f\u7528\u9650\u5236\u548c\u4f7f\u7528\u8be5\u529f\u80fd\u7684\u5e38\u89c1\u95ee\u9898\u3002Apache Cloudberry \u652f\u6301\u5e76\u884c\u67e5\u8be2\u529f\u80fd\uff0c\u5373\u5229\u7528\u591a\u4e2a CPU \u6838\u5fc3\u6765\u5904\u7406\u5355\u4e2a\u67e5\u8be2\uff0c\u4ee5\u6b64\u6765\u63d0\u9ad8\u67e5\u8be2\u6027\u80fd\u3002\u5728\u6267\u884c\u67e5\u8be2\u8fc7\u7a0b\u4e2d\uff0c\u8ba1\u7b97\u8282\u70b9\uff08\u5305\u62ec SeqScan \u7b97\u5b50\uff09\u7684\u6570\u91cf\u4f1a\u968f\u7740\u6570\u636e\u91cf\u53d8\u5316\u52a8\u6001\u8c03\u6574\u3002",source:"@site/i18n/zh/docusaurus-plugin-content-docs/current/performance/parallel-query-execution.md",sourceDirName:"performance",slug:"/performance/parallel-query-execution",permalink:"/zh/docs/performance/parallel-query-execution",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/i18n/zh/docusaurus-plugin-content-docs/current/performance/parallel-query-execution.md",tags:[],version:"current",lastUpdatedBy:"Dianjin Wang",lastUpdatedAt:1743488661,formattedLastUpdatedAt:"2025\u5e744\u67081\u65e5",frontMatter:{title:"\u5e76\u884c\u6267\u884c\u67e5\u8be2"},sidebar:"docsbars",previous:{title:"\u5e76\u884c\u521b\u5efa AO/AOCO \u8868\u4e0e\u5237\u65b0\u7269\u5316\u89c6\u56fe",permalink:"/zh/docs/performance/parallel-create-ao-refresh-mv"},next:{title:"\u4f7f\u7528\u805a\u96c6\u4e0b\u63a8\u4f18\u5316\u67e5\u8be2",permalink:"/zh/docs/performance/use-aggre-pushdown-to-speed-up-queries"}},t={},a=[{value:"\u4f7f\u7528\u573a\u666f",id:"\u4f7f\u7528\u573a\u666f",level:2},{value:"\u4f7f\u7528\u65b9\u6cd5",id:"\u4f7f\u7528\u65b9\u6cd5",level:2},{value:"\u5e76\u884c\u67e5\u8be2 Heap \u8868",id:"\u5e76\u884c\u67e5\u8be2-heap-\u8868",level:3},{value:"\u5e76\u884c\u67e5\u8be2 AO/AOCO \u8868",id:"\u5e76\u884c\u67e5\u8be2-aoaoco-\u8868",level:3},{value:"\u53c2\u6570\u8bf4\u660e",id:"\u53c2\u6570\u8bf4\u660e",level:2},{value:"\u5e38\u89c1\u95ee\u9898",id:"\u5e38\u89c1\u95ee\u9898",level:2}];function h(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,s.a)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.h1,{id:"\u5e76\u884c\u6267\u884c\u67e5\u8be2",children:"\u5e76\u884c\u6267\u884c\u67e5\u8be2"}),"\n",(0,l.jsxs)(n.p,{children:["\u672c\u6587\u6863\u4ecb\u7ecd Apache Cloudberry \u5e76\u884c\u67e5\u8be2\u7684\u4f7f\u7528\u573a\u666f\u3001\u4f7f\u7528\u65b9\u6cd5\u3001\u4f7f\u7528\u9650\u5236\u548c\u4f7f\u7528\u8be5\u529f\u80fd\u7684\u5e38\u89c1\u95ee\u9898\u3002Apache Cloudberry \u652f\u6301\u5e76\u884c\u67e5\u8be2\u529f\u80fd\uff0c\u5373\u5229\u7528\u591a\u4e2a CPU \u6838\u5fc3\u6765\u5904\u7406\u5355\u4e2a\u67e5\u8be2\uff0c\u4ee5\u6b64\u6765\u63d0\u9ad8\u67e5\u8be2\u6027\u80fd\u3002\u5728\u6267\u884c\u67e5\u8be2\u8fc7\u7a0b\u4e2d\uff0c\u8ba1\u7b97\u8282\u70b9\uff08\u5305\u62ec ",(0,l.jsx)(n.code,{children:"SeqScan"})," \u7b97\u5b50\uff09\u7684\u6570\u91cf\u4f1a\u968f\u7740\u6570\u636e\u91cf\u53d8\u5316\u52a8\u6001\u8c03\u6574\u3002"]}),"\n",(0,l.jsx)(n.h2,{id:"\u4f7f\u7528\u573a\u666f",children:"\u4f7f\u7528\u573a\u666f"}),"\n",(0,l.jsx)(n.p,{children:"\u5355\u53f0\u7269\u7406\u673a\u4e0a\u90e8\u7f72\u5c11\u91cf Segment\uff0c\u901a\u8fc7\u52a8\u6001\u8c03\u6574\u5e76\u884c\u5ea6\u66ff\u4ee3\u5927\u91cf\u90e8\u7f72 Segment\uff0c\u5e76\u540c\u65f6\u63d0\u5347\u6027\u80fd\u3002"}),"\n",(0,l.jsx)(n.p,{children:"\u5728\u4e3b\u673a CPU\u3001\u78c1\u76d8\u8d1f\u8f7d\u4e0d\u9ad8\u65f6\uff0c\u5f00\u542f\u7b97\u5b50\u5e76\u884c\u6709\u6027\u80fd\u4f18\u52bf\u3002"}),"\n",(0,l.jsx)(n.h2,{id:"\u4f7f\u7528\u65b9\u6cd5",children:"\u4f7f\u7528\u65b9\u6cd5"}),"\n",(0,l.jsx)(n.p,{children:"Apache Cloudberry \u652f\u6301\u5728 AO/AOCO \u8868\u548c Heap \u8868\u4e0a\u8fdb\u884c\u5e76\u884c\u67e5\u8be2\u3002"}),"\n",(0,l.jsx)(n.h3,{id:"\u5e76\u884c\u67e5\u8be2-heap-\u8868",children:"\u5e76\u884c\u67e5\u8be2 Heap \u8868"}),"\n",(0,l.jsxs)(n.ol,{children:["\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsx)(n.p,{children:"\u5f00\u542f\u5e76\u884c\u67e5\u8be2\u529f\u80fd\u524d\uff0c\u9700\u8981\u5173\u95ed GPORCA \u4f18\u5316\u5668\u3002"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-sql",children:"SET enable_parallel = ON;\nSET optimizer = OFF;\n"})}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsx)(n.p,{children:"\u8bbe\u7f6e\u6700\u5927\u5e76\u884c\u5ea6\u3002"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-sql",children:"-- \u8bbe\u7f6e\u9700\u8003\u8651 CPU \u6838\u6570\u548c segment \u6570.\nSET max_parallel_workers_per_gather = 4;\n"})}),"\n",(0,l.jsx)(n.p,{children:"\u67e5\u8be2\u4f8b\u5b50\uff1a"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-sql",children:"CREATE TABLE t1 (c1 int,c2 int, c3 int, c4 box) distributed by (c1);\nINSERT INTO t1 SELECT x, 2*x, 3*x, box('6,6,6,6') FROM generate_series(1,1000000) AS x;\nSELECT count(*) from t1;\n"})}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.h3,{id:"\u5e76\u884c\u67e5\u8be2-aoaoco-\u8868",children:"\u5e76\u884c\u67e5\u8be2 AO/AOCO \u8868"}),"\n",(0,l.jsxs)(n.ol,{children:["\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsx)(n.p,{children:"\u5f00\u542f\u5e76\u884c\u67e5\u8be2\u529f\u80fd\u524d\uff0c\u9700\u8981\u5173\u95ed GPORCA \u4f18\u5316\u5668\u3002"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-sql",children:"SET enable_parallel = ON;\nSET optimizer = OFF;\n"})}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsx)(n.p,{children:"\u8bbe\u7f6e\u6700\u5927\u5e76\u884c\u5ea6\u3002"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-sql",children:"-- \u8bbe\u7f6e\u9700\u8003\u8651 CPU \u6838\u6570\u548c segment \u6570\nSET max_parallel_workers_per_gather = 4;\n\n-- \u8bbe\u7f6e\u5728\u4e00\u4e2a\u4e8b\u52a1\u4e2d\u5c06\u6570\u636e\u63d2\u5165\u591a\u5c11\u4e2a\u6587\u4ef6\u91cc\u3002\u66f4\u5927\u7684\u503c\u53ef\u80fd\u5e26\u6765\u6027\u80fd\u4e0b\u964d\uff0c\u5c24\u5176\u662f\u5bf9\u4e8e AOCO \u8868\u3002\nSET gp_appendonly_insert_files = 8;\n\n-- \u6bcf\u9694 10 \u4e07\u884c\u6362\u4e0b\u4e00\u4e2a\u6587\u4ef6\u63d2\u5165\u6570\u636e\uff0c\u53ef\u6839\u636e\u60c5\u51b5\u8c03\u6574\uff0c\u8ba9\u6570\u636e\u5c3d\u91cf\u5747\u5300\u5206\u5e03\u5728\u591a\u4e2a\u6587\u4ef6\u4e0a\u3002\nSET gp_appendonly_insert_files_tuples_range = 100000;\n"})}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsx)(n.p,{children:"\u63d2\u5165\u548c\u67e5\u8be2\u3002"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-sql",children:"CREATE TABLE ao(x INT) USING ao_row;\nINSERT INTO ao SELECT i FROM generate_series(1, 1000000) i;\n-- \u6700\u597d\u5148\u66f4\u65b0\u7edf\u8ba1\u4fe1\u606f\nANALYZE ao;\nSELECT COUNT(*) FROM ao;\n"})}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"\u53c2\u6570\u8bf4\u660e",children:"\u53c2\u6570\u8bf4\u660e"}),"\n",(0,l.jsxs)(n.table,{children:[(0,l.jsx)(n.thead,{children:(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.th,{children:"\u53c2\u6570\u540d"}),(0,l.jsx)(n.th,{children:"\u63cf\u8ff0\u8bf4\u660e"}),(0,l.jsx)(n.th,{children:"\u9ed8\u8ba4\u503c"}),(0,l.jsx)(n.th,{children:"\u662f\u5426\u4e3a\u5fc5\u586b"}),(0,l.jsx)(n.th,{children:"\u793a\u4f8b"})]})}),(0,l.jsxs)(n.tbody,{children:[(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"enable_parallel"})}),(0,l.jsx)(n.td,{children:"\u662f\u5426\u5f00\u542f\u5e76\u884c\u7279\u6027"}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"OFF"})}),(0,l.jsx)(n.td,{children:"\u662f"}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"SET enable_parallel = ON;"})})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"optimizer"})}),(0,l.jsx)(n.td,{children:"\u662f\u5426\u5f00\u542f GPORCA \u4f18\u5316\u5668"}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"ON"})}),(0,l.jsx)(n.td,{children:"\u662f"}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"SET optimizer = OFF;"})})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"gp_appendonly_insert_files"})}),(0,l.jsx)(n.td,{children:"\u5728\u4e00\u4e2a\u4e8b\u52a1\u4e2d\u5c06\u6570\u636e\u63d2\u5165\u591a\u5c11\u4e2a\u6587\u4ef6\u91cc"}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"4"})}),(0,l.jsx)(n.td,{children:"\u5426"}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"SET gp_appendonly_insert_files = 8;"})})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"gp_appendonly_insert_files_tuples_range"})}),(0,l.jsx)(n.td,{children:"\u6bcf\u9694\u591a\u5c11\u884c\uff0c\u6362\u4e0b\u4e00\u4e2a\u6587\u4ef6\u63d2\u5165\u6570\u636e"}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"100000"})}),(0,l.jsx)(n.td,{children:"\u5426"}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"SET gp_appendonly_insert_files_tuples_range = 100000;"})})]})]})]}),"\n",(0,l.jsx)(n.h2,{id:"\u5e38\u89c1\u95ee\u9898",children:"\u5e38\u89c1\u95ee\u9898"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsx)(n.p,{children:"\u76ee\u524d\u652f\u6301\u5e76\u884c\u6267\u884c\u5305\u542b\u4e0b\u5217\u7b97\u5b50\u7684\u67e5\u8be2\u8bed\u53e5\u3002Apache Cloudberry \u6682\u4e0d\u652f\u6301\u5305\u542b\u5176\u4ed6\u7b97\u5b50\u7684\u67e5\u8be2\u3002"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-sql",children:"sequence scan\nindex scan\nindex only scan\nbitmap heap scan\nappend\nhash join\nnestloop join\nmerge join\n"})}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsx)(n.p,{children:"\u5e76\u884c\u67e5\u8be2\u5e76\u975e\u5728\u4efb\u4f55\u60c5\u51b5\u4e0b\u90fd\u80fd\u63d0\u9ad8\u67e5\u8be2\u6027\u80fd\u3002\u8fc7\u5927\u7684\u5e76\u884c\u5ea6\u53ef\u80fd\u9020\u6210\u8d1f\u8f7d\u8fc7\u5927\uff0c\u53cd\u800c\u5bfc\u81f4\u6027\u80fd\u4e0b\u964d\u3002"}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsx)(n.p,{children:"\u5f00\u542f\u5e76\u884c\u610f\u5473\u7740\u6210\u500d\u7684\u5185\u5b58\u5f00\u9500\uff0c\u53ef\u80fd\u9047\u5230\u5185\u5b58\u4e0d\u8db3\u800c\u62a5\u9519\u3002"}),"\n"]}),"\n"]})]})}function o(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(h,{...e})}):h(e)}},11151:(e,n,r)=>{r.d(n,{Z:()=>i,a:()=>c});var l=r(67294);const s={},d=l.createContext(s);function c(e){const n=l.useContext(d);return l.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:c(e.components),l.createElement(d.Provider,{value:n},e.children)}}}]);