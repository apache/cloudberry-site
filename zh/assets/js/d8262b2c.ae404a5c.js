"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[1590],{55223:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>a,contentTitle:()=>l,default:()=>u,frontMatter:()=>i,metadata:()=>t,toc:()=>c});var o=s(85893),r=s(11151);const i={title:"\u5728 AO \u8868\u4e0a\u4f7f\u7528\u552f\u4e00\u7d22\u5f15"},l="\u5728 AO \u8868\u4e0a\u4f7f\u7528\u552f\u4e00\u7d22\u5f15\uff08\u5f15\u5165\u81ea v1.5.0 \u7248\u672c\uff09",t={id:"performance/use-unique-index-on-ao-tables",title:"\u5728 AO \u8868\u4e0a\u4f7f\u7528\u552f\u4e00\u7d22\u5f15",description:"\u81ea v1.5.0 \u7248\u672c\u8d77\uff0c\u4f60\u53ef\u4ee5\u5728 Apache Cloudberry \u7684 Append-Optimized (AO) \u6216 AOCS \u8868\u4e0a\u6dfb\u52a0\u552f\u4e00\u7d22\u5f15\u3002\u6709\u4e86\u552f\u4e00\u7d22\u5f15\uff0cApache Cloudberry \u4f1a\u5728\u5c06\u6570\u636e\u63d2\u5165\u5230 AO \u8868\u65f6\uff0c\u5f3a\u5236\u68c0\u67e5\u552f\u4e00\u6027\u7ea6\u675f\uff0c\u4ece\u800c\u4fdd\u8bc1\u6570\u636e\u7684\u552f\u4e00\u6027\uff0c\u540c\u65f6\u80fd\u591f\u4e0e\u4f18\u5316\u5668\u4e00\u8d77\u4f18\u5316\u7279\u5b9a\u7684\u67e5\u8be2\uff0c\u4ece\u800c\u63d0\u9ad8\u6570\u636e\u5e93\u7684\u67e5\u8be2\u6027\u80fd\u3002\u4f46\u8fd9\u4e5f\u5e26\u6765\u7684\u4e00\u5b9a\u7684\u5f00\u9500\u7528\u4e8e\u7ef4\u62a4\u552f\u4e00\u7d22\u5f15\uff0c\u5c24\u5176\u662f\u5728\u63d2\u5165\u6570\u636e\u65f6\u3002",source:"@site/i18n/zh/docusaurus-plugin-content-docs/current/performance/use-unique-index-on-ao-tables.md",sourceDirName:"performance",slug:"/performance/use-unique-index-on-ao-tables",permalink:"/zh/docs/performance/use-unique-index-on-ao-tables",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/i18n/zh/docusaurus-plugin-content-docs/current/performance/use-unique-index-on-ao-tables.md",tags:[],version:"current",lastUpdatedBy:"Dianjin Wang",lastUpdatedAt:1742268909,formattedLastUpdatedAt:"2025\u5e743\u670818\u65e5",frontMatter:{title:"\u5728 AO \u8868\u4e0a\u4f7f\u7528\u552f\u4e00\u7d22\u5f15"},sidebar:"docsbars",previous:{title:"\u66f4\u65b0\u7edf\u8ba1\u4fe1\u606f",permalink:"/zh/docs/performance/update-stats-using-analyze"},next:{title:"\u81ea\u52a8\u4f7f\u7528\u7269\u5316\u89c6\u56fe\u8fdb\u884c\u67e5\u8be2\u4f18\u5316",permalink:"/zh/docs/performance/use-auto-materialized-view-to-answer-queries"}},a={},c=[{value:"\u5b9e\u73b0\u539f\u7406",id:"\u5b9e\u73b0\u539f\u7406",level:2},{value:"\u5982\u4f55\u5728 AO \u8868\u4e0a\u6dfb\u52a0\u552f\u4e00\u7d22\u5f15",id:"\u5982\u4f55\u5728-ao-\u8868\u4e0a\u6dfb\u52a0\u552f\u4e00\u7d22\u5f15",level:2},{value:"\u4f7f\u7528\u793a\u4f8b",id:"\u4f7f\u7528\u793a\u4f8b",level:2}];function d(e){const n={code:"code",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,r.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h1,{id:"\u5728-ao-\u8868\u4e0a\u4f7f\u7528\u552f\u4e00\u7d22\u5f15\u5f15\u5165\u81ea-v150-\u7248\u672c",children:"\u5728 AO \u8868\u4e0a\u4f7f\u7528\u552f\u4e00\u7d22\u5f15\uff08\u5f15\u5165\u81ea v1.5.0 \u7248\u672c\uff09"}),"\n",(0,o.jsx)(n.p,{children:"\u81ea v1.5.0 \u7248\u672c\u8d77\uff0c\u4f60\u53ef\u4ee5\u5728 Apache Cloudberry \u7684 Append-Optimized (AO) \u6216 AOCS \u8868\u4e0a\u6dfb\u52a0\u552f\u4e00\u7d22\u5f15\u3002\u6709\u4e86\u552f\u4e00\u7d22\u5f15\uff0cApache Cloudberry \u4f1a\u5728\u5c06\u6570\u636e\u63d2\u5165\u5230 AO \u8868\u65f6\uff0c\u5f3a\u5236\u68c0\u67e5\u552f\u4e00\u6027\u7ea6\u675f\uff0c\u4ece\u800c\u4fdd\u8bc1\u6570\u636e\u7684\u552f\u4e00\u6027\uff0c\u540c\u65f6\u80fd\u591f\u4e0e\u4f18\u5316\u5668\u4e00\u8d77\u4f18\u5316\u7279\u5b9a\u7684\u67e5\u8be2\uff0c\u4ece\u800c\u63d0\u9ad8\u6570\u636e\u5e93\u7684\u67e5\u8be2\u6027\u80fd\u3002\u4f46\u8fd9\u4e5f\u5e26\u6765\u7684\u4e00\u5b9a\u7684\u5f00\u9500\u7528\u4e8e\u7ef4\u62a4\u552f\u4e00\u7d22\u5f15\uff0c\u5c24\u5176\u662f\u5728\u63d2\u5165\u6570\u636e\u65f6\u3002"}),"\n",(0,o.jsx)(n.h2,{id:"\u5b9e\u73b0\u539f\u7406",children:"\u5b9e\u73b0\u539f\u7406"}),"\n",(0,o.jsx)(n.p,{children:"\u9488\u5bf9\u5b58\u5728\u552f\u4e00\u7d22\u5f15\u7684\u573a\u666f\uff0c\u5728\u5411 AO \u8868\u63d2\u5165\u6570\u636e\u65f6\uff0cApache Cloudberry \u4f1a\u5728 AO \u8868\u7684\u8f85\u52a9\u7d22\u5f15\u7ed3\u6784 BlockDirectory \u4e2d\u63d2\u5165 placeholder\uff0c\u4ee5\u963b\u585e\u76f8\u540c key \u7684\u63d2\u5165\uff0c\u4ece\u800c\u5b9e\u73b0\u552f\u4e00\u7d22\u5f15\u3002"}),"\n",(0,o.jsx)(n.h2,{id:"\u5982\u4f55\u5728-ao-\u8868\u4e0a\u6dfb\u52a0\u552f\u4e00\u7d22\u5f15",children:"\u5982\u4f55\u5728 AO \u8868\u4e0a\u6dfb\u52a0\u552f\u4e00\u7d22\u5f15"}),"\n",(0,o.jsx)(n.p,{children:"\u6709\u4e24\u79cd\u65b9\u6cd5\u53ef\u4ee5\u5728 AO \u8868\u4e0a\u6dfb\u52a0\u552f\u4e00\u7d22\u5f15\uff0c\u4f60\u53ef\u4ee5\u6839\u636e\u81ea\u5df1\u7684\u4e1a\u52a1\u9700\u8981\u8fdb\u884c\u9009\u62e9\uff1a"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"\u5728\u5efa\u8868\u7684\u540c\u65f6\u6307\u5b9a\u552f\u4e00\u952e\u6216\u7ea6\u675f\uff1a"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-sql",children:"CREATE TABLE foo(i int UNIQUE) USING ao_row;\nCREATE TABLE bar(i int UNIQUE) USING ao_column;\nCREATE TABLE foo2(i int, CONSTRAINT iuniq UNIQUE(i));\n"})}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"\u5728\u5efa\u8868\u540e\u5355\u72ec\u6dfb\u52a0\u552f\u4e00\u7d22\u5f15\u6216\u7ea6\u675f\uff1a"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-sql",children:"CREATE TABLE baz(i int) with (appendonly=true);\nCREATE UNIQUE INDEX on baz(i);\n\nCREATE TABLE foobar(i int) USING ao_row;\nALTER TABLE foobar ADD CONSTRAINT unique_i UNIQUE (i);\n"})}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(n.h2,{id:"\u4f7f\u7528\u793a\u4f8b",children:"\u4f7f\u7528\u793a\u4f8b"}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"\u521b\u5efa\u4e00\u5f20\u6709\u552f\u4e00\u7ea6\u675f\u7684 AO \u793a\u4f8b\u8868\u3002"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-sql",children:'postgres=# CREATE TABLE foo(i int UNIQUE) USING ao_row;\nCREATE TABLE\n\npostgres=# \\d foo\n                Table "public.foo"\nColumn |  Type   | Collation | Nullable | Default \n--------+---------+-----------+----------+---------\ni      | integer |           |          | \nCompression Type: None\nCompression Level: 0\nBlock Size: 32768\nChecksum: t\nIndexes:\n    "foo_i_key" UNIQUE CONSTRAINT, btree (i)\nDistributed by: (i)\n'})}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:["\u5f80\u8868\u4e2d\u63d2\u5165\u76f8\u540c\u7684\u952e\u503c\uff0c\u4f1a\u8fd4\u56de ",(0,o.jsx)(n.code,{children:"duplicate key"})," \u7684\u9519\u8bef\u3002"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-sql",children:'postgres=# INSERT INTO foo VALUES(1);\nINSERT 0 1\n\npostgres=# INSERT INTO foo VALUES(1);\nERROR:  duplicate key value violates unique constraint "foo_i_key"  (seg1 127.0.1.1:8003 pid=557)\nDETAIL:  Key (i)=(1) already exists.\n'})}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(n.p,{children:"\u5e76\u53d1\u63d2\u5165\u6570\u636e\u7684\u793a\u4f8b\uff1a\u5728 READ COMMITTED \u4e8b\u52a1\u7ea7\u522b\u4e0b\uff0c\u4e24\u4e2a\u4e8b\u52a1\u5e76\u53d1\u5730\u5411\u540c\u4e00\u5f20 AO \u8868\u7684\u63d2\u5165\u76f8\u540c\u7684\u503c\uff0c\u4e00\u4e2a\u6210\u529f\uff0c\u53e6\u4e00\u4e2a\u88ab\u963b\u585e\u3002"}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"\u5982\u679c\u4e00\u4e2a\u4e8b\u52a1\u6210\u529f\uff0c\u90a3\u4e48\u53e6\u4e00\u4e2a\u63d2\u5165\u5931\u8d25"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-sql",children:"-- \u4f1a\u8bdd 1\npostgres=# BEGIN;\nBEGIN\n\npostgres=*# INSERT INTO foo VALUES(1);\nINSERT 0 1  -- \u6210\u529f\u63d2\u5165\n\npostgres=*# COMMIT;\nCOMMIT\n"})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-sql",children:'-- \u4f1a\u8bdd 2\npostgres=# BEGIN;\nBEGIN\n\npostgres=*# INSERT INTO foo VALUES(1);\nERROR:  duplicate key value violates unique constraint "foo_i_key"  (seg1 127.0.1.1:8003 pid=2726)\nDETAIL:  Key (i)=(1) already exists.  -- \u63d2\u5165\u5931\u8d25\n\npostgres=!# END;\nROLLBACK\n'})}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"\u5982\u679c\u4e00\u4e2a\u4e8b\u52a1\u63d2\u5165\u5931\u8d25\uff0c\u90a3\u4e48\u53e6\u4e00\u4e2a\u4e8b\u52a1\u4f1a\u63d2\u5165\u6210\u529f\u3002"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-sql",children:"postgres=# BEGIN;\nBEGIN\npostgres=*# INSERT INTO foo VALUES(1);\nINSERT 0 1\npostgres=*# ROLLBACK;\nROLLBACK\n"})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-sql",children:"postgres=# BEGIN;\nBEGIN\npostgres=*# INSERT INTO foo VALUES(1);\nINSERT 0 1\npostgres=*# COMMIT;\nCOMMIT\n"})}),"\n"]}),"\n"]})]})}function u(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},11151:(e,n,s)=>{s.d(n,{Z:()=>t,a:()=>l});var o=s(67294);const r={},i=o.createContext(r);function l(e){const n=o.useContext(i);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function t(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:l(e.components),o.createElement(i.Provider,{value:n},e.children)}}}]);