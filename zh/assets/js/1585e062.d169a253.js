"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[9923],{20717:(e,n,c)=>{c.r(n),c.d(n,{assets:()=>a,contentTitle:()=>d,default:()=>p,frontMatter:()=>s,metadata:()=>r,toc:()=>l});var i=c(85893),t=c(11151);const s={title:"\u5728 AO \u8868\u4e0a\u4f7f\u7528 IndexScan"},d="\u5728 AO \u8868\u4e0a\u4f7f\u7528 IndexScan",r={id:"performance/use-index-scan-on-ao-tables",title:"\u5728 AO \u8868\u4e0a\u4f7f\u7528 IndexScan",description:"Apache Cloudberry \u652f\u6301\u5bf9 Append-Optimized \u8868\uff08\u7b80\u79f0 AO \u8868\uff09\u8fdb\u884c IndexScan\uff0c\u4ee5\u6b64\u6765\u63d0\u5347\u67d0\u4e9b\u573a\u666f\u4e0b\u7684\u67e5\u8be2\u6548\u7387\uff0c\u4f8b\u5982\u4ee5\u4e0b\u67e5\u8be2\uff1a",source:"@site/i18n/zh/docusaurus-plugin-content-docs/current/performance/use-index-scan-on-ao-tables.md",sourceDirName:"performance",slug:"/performance/use-index-scan-on-ao-tables",permalink:"/zh/docs/performance/use-index-scan-on-ao-tables",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/i18n/zh/docusaurus-plugin-content-docs/current/performance/use-index-scan-on-ao-tables.md",tags:[],version:"current",lastUpdatedBy:"dependabot[bot]",lastUpdatedAt:1744180221,formattedLastUpdatedAt:"2025\u5e744\u67089\u65e5",frontMatter:{title:"\u5728 AO \u8868\u4e0a\u4f7f\u7528 IndexScan"},sidebar:"docsbars",previous:{title:"\u4f7f\u7528\u805a\u96c6\u4e0b\u63a8\u4f18\u5316\u67e5\u8be2",permalink:"/zh/docs/performance/use-aggre-pushdown-to-speed-up-queries"},next:{title:"\u4f7f\u7528 RuntimeFilter \u4f18\u5316 Join \u67e5\u8be2",permalink:"/zh/docs/performance/use-runtimefilter-to-optimize-queries"}},a={},l=[{value:"\u9002\u7528\u573a\u666f",id:"\u9002\u7528\u573a\u666f",level:2},{value:"\u4f7f\u7528\u793a\u4f8b",id:"\u4f7f\u7528\u793a\u4f8b",level:2}];function o(e){const n={admonition:"admonition",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,t.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"\u5728-ao-\u8868\u4e0a\u4f7f\u7528-indexscan",children:"\u5728 AO \u8868\u4e0a\u4f7f\u7528 IndexScan"}),"\n",(0,i.jsx)(n.p,{children:"Apache Cloudberry \u652f\u6301\u5bf9 Append-Optimized \u8868\uff08\u7b80\u79f0 AO \u8868\uff09\u8fdb\u884c IndexScan\uff0c\u4ee5\u6b64\u6765\u63d0\u5347\u67d0\u4e9b\u573a\u666f\u4e0b\u7684\u67e5\u8be2\u6548\u7387\uff0c\u4f8b\u5982\u4ee5\u4e0b\u67e5\u8be2\uff1a"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sql",children:"SELECT * FROM tbl WHERE val > 100 ORDER BY val LIMIT 10;\n"})}),"\n",(0,i.jsxs)(n.admonition,{title:"\u63d0\u793a",type:"tip",children:[(0,i.jsx)(n.p,{children:"Append-Optimized (AO) \u8868\u662f\u4e00\u79cd\u4f18\u5316\u5b58\u50a8\u65b9\u5f0f\uff0c\u9762\u5411\u4ee5\u6279\u91cf\u63d2\u5165\u4e3a\u4e3b\u7684\u573a\u666f\uff0c\u4f8b\u5982\u5927\u6570\u636e\u5206\u6790\u548c\u6570\u636e\u4ed3\u5e93\u573a\u666f\u3002"}),(0,i.jsx)(n.p,{children:"\u5f53\u5411 AO \u8868\u4e2d\u63d2\u5165\u65b0\u6570\u636e\u65f6\uff0cApache Cloudberry \u4f1a\u5c06\u65b0\u6570\u636e\u63d2\u5165\u5230\u8868\u7684\u672b\u5c3e\uff0c\u800c\u4e0d\u662f\u50cf\u666e\u901a\u7684\u8868\u90a3\u6837\u5bfb\u627e\u7a7a\u95f2\u7a7a\u95f4\u63d2\u5165\u3002\u8fd9\u610f\u5473\u7740\u5728\u5411 AO \u8868\u63d2\u5165\u6570\u636e\u65f6\uff0c\u53ea\u9700\u8981\u5bf9\u6587\u4ef6\u8fdb\u884c\u8ffd\u52a0\u5199\u5165\uff0c\u56e0\u6b64\u53ef\u4ee5\u83b7\u5f97\u66f4\u9ad8\u7684\u63d2\u5165\u6548\u7387\u3002"})]}),"\n",(0,i.jsx)(n.p,{children:"\u5bf9\u4e8e\u4ee5\u4e0a\u67e5\u8be2\u8bed\u53e5\uff1a"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["\u5982\u679c\u4f7f\u7528 heap \u8868\u5b58\u50a8\u65b9\u5f0f\uff0cApache Cloudberry \u6267\u884c\u8be5\u67e5\u8be2\u53ef\u4ee5\u901a\u8fc7 IndexScan \u627e\u5230 10 \u4e2a ",(0,i.jsx)(n.code,{children:"val"})," \u5927\u4e8e ",(0,i.jsx)(n.code,{children:"100"})," \u7684\u5143\u7956\uff0c\u4ec5\u9700\u901a\u8fc7\u7d22\u5f15\u548c\u6570\u636e\u8868\u8bfb\u53d6\u5927\u7ea6 10 \u4e2a\u5143\u7956\u5373\u53ef\u3002"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["\u5982\u679c\u4f7f\u7528 AO \u8868\u7684\u5b58\u50a8\u65b9\u5f0f\uff0c\u4e14\u5047\u8bbe ",(0,i.jsx)(n.code,{children:"tbl"})," \u8868\u6709 10 \u4ebf\u884c\u5143\u7ec4\uff0c\u800c\u6211\u4eec\u901a\u8fc7 ",(0,i.jsx)(n.code,{children:"LIMIT"})," \u5b50\u53e5\u6307\u5b9a\u53ea\u9700\u8981\u8fd4\u56de 10 \u6761\u5143\u7ec4\uff1a"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Apache Cloudberry \u652f\u6301\u4f7f\u7528 IndexScan \u8fd0\u7b97\u6765\u626b\u63cf AO \u8868\uff0c\u53ef\u5927\u5e45\u964d\u4f4e\u626b\u63cf\u7684\u6570\u636e\u91cf\uff0c\u5927\u5927\u63d0\u5347\u626b\u63cf\u7684\u6548\u7387\uff0c\u662f\u6bd4 SeqScan \u4ee5\u53ca BitmapScan \u66f4\u597d\u7684\u626b\u63cf\u65b9\u5f0f\u3002SeqScan \u6216\u8005 BitmapScan \u6bd4 IndexScan \u591a\u626b\u63cf 1 \u4ebf\u500d\u7684\u6570\u636e\u91cf\u3002"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"\u9002\u7528\u573a\u666f",children:"\u9002\u7528\u573a\u666f"}),"\n",(0,i.jsxs)(n.p,{children:["\u8be5\u7279\u6027\u9002\u7528\u4e8e\u5bf9\u8f83\u5927\u7684\u8868\u8fdb\u884c\u67e5\u8be2\uff0c\u540c\u65f6\u4f1a\u901a\u8fc7 ",(0,i.jsx)(n.code,{children:"ORDER BY"})," \u53ca ",(0,i.jsx)(n.code,{children:"LIMIT"})," \u4ece\u53e5\u6765\u9650\u5236\u8fd4\u56de\u7684\u7ed3\u679c\u96c6\u5927\u5c0f\u7684\u573a\u666f\uff1a"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sql",children:"SELECT * FROM tbl WHERE val > 100 ORDER BY val LIMIT 10;\n"})}),"\n",(0,i.jsx)(n.admonition,{title:"\u6ce8\u610f",type:"info",children:(0,i.jsxs)(n.p,{children:["\u201c\u8f83\u5927\u7684\u8868\u201d\u53ef\u7406\u89e3\u4e3a\u8868\u5927\u5c0f\u5927\u7ea6\u4e3a\u8981\u67e5\u8be2\u6570\u636e\u7684 3000 \u500d\u5de6\u53f3\u3002\u4f8b\u5982\u4f7f\u7528 ",(0,i.jsx)(n.code,{children:"LIMIT 10"})," \u8fd4\u56de 10 \u6761\u8bb0\u5f55\uff0c\u8868\u5927\u4e8e 3 \u4e07\u6761\u8bb0\u5f55\u53ef\u7b97\u662f\u5927\u8868\u3002"]})}),"\n",(0,i.jsx)(n.p,{children:"\u6839\u636e\u6570\u636e\u91cf\u7684\u5927\u5c0f\u53ef\u80fd\u5f97\u5230\u4e0d\u540c\u7a0b\u5ea6\u7684\u4f18\u5316\u3002\u6700\u9002\u7528\u7684\u573a\u666f\u4e0b\uff0c\u539f\u672c\u9700\u8981\u6267\u884c\u6570\u5341\u5206\u949f\u7684\u67e5\u8be2\u80fd\u5728 1 \u79d2\u5185\u8fd4\u56de\u3002"}),"\n",(0,i.jsx)(n.h2,{id:"\u4f7f\u7528\u793a\u4f8b",children:"\u4f7f\u7528\u793a\u4f8b"}),"\n",(0,i.jsxs)(n.p,{children:["\u8981\u542f\u7528 AO IndexScan\uff0c\u4f60\u9700\u8981\u5148\u901a\u8fc7 ",(0,i.jsx)(n.code,{children:"SET optimizer TO off;"})," \u5173\u95ed GPORCA \u4f18\u5316\u5668\uff0c\u5e76\u5c06\u7cfb\u7edf\u53c2\u6570 ",(0,i.jsx)(n.code,{children:"gp_enable_ao_indexscan"})," \u8bbe\u4e3a ",(0,i.jsx)(n.code,{children:"ON"}),"\u3002"]}),"\n",(0,i.jsx)(n.p,{children:"\u4ece\u4ee5\u4e0b\u793a\u4f8b\u53ef\u770b\u51fa\uff0c\u4e0d\u542f\u7528 AO IndexScan \u7684\u6267\u884c\u65f6\u95f4\u4e3a 5888.235 ms\uff0c\u8fdc\u957f\u4e8e\u542f\u7528 AO IndexScan \u7684\u6267\u884c\u65f6\u95f4 15.462 ms\u3002"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sql",children:"SET optimizer TO off; -- \u8981\u542f\u7528 AO IndexScan\uff0c\u9700\u8981\u5148\u5173\u95ed ORCA \u4f18\u5316\u5668\n\n-- \u521b\u5efa\u6d4b\u8bd5\u8868\uff0c\u751f\u6210 1 \u4ebf\u6761\u6570\u636e\uff0c\u5e76\u5728 val \u5217\u521b\u5efa\u7d22\u5f15\nCREATE TABLE tbl (id int, val int) WITH (orientation='column', appendonly=true);\nINSERT INTO tbl SELECT i, i FROM generate_series(1, 100000000) s(i);\n\n-- \u76f4\u63a5\u8fdb\u884c\u67e5\u8be2\nEXPLAIN ANALYZE SELECT * FROM tbl WHERE val > 100 ORDER BY val LIMIT 10;\n\n(Execution Time: 5888.235 ms)\n\n\n-- \u5f00\u542f AO \u8868 IndexScan \u540e\u518d\u6b21\u67e5\u8be2\nSET gp_enable_ao_indexscan TO on;\nEXPLAIN ANALYZE SELECT * FROM tbl WHERE val > 100 ORDER BY val LIMIT 10;\n\n(Execution Time: 15.462 ms)\n"})}),"\n",(0,i.jsx)(n.p,{children:"\u5f53\u524d\u8be5\u529f\u80fd\u4ec5\u9002\u7528\u4e8e PostgreSQL \u4f18\u5316\u5668\u3002\u540c\u65f6\uff0c\u7531\u4e8e\u5728\u67d0\u4e9b\u673a\u68b0\u786c\u76d8\u4e0a\uff0c\u968f\u673a I/O \u53ef\u80fd\u6bd4\u987a\u5e8f I/O \u6548\u7387\u4f4e 30000 \u500d\uff0c\u56e0\u6b64\u5982\u679c\u5728\u4f7f\u7528\u8f83\u5dee\u7684\u673a\u68b0\u786c\u76d8\u7684\u60c5\u51b5\u4e0b\u5f00\u542f\u8be5\u7279\u6027\uff0cIndexScan \u7684\u6267\u884c\u6548\u7387\u53ef\u80fd\u5e76\u4e0d\u9ad8\u3002"})]})}function p(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(o,{...e})}):o(e)}},11151:(e,n,c)=>{c.d(n,{Z:()=>r,a:()=>d});var i=c(67294);const t={},s=i.createContext(t);function d(e){const n=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:d(e.components),i.createElement(s.Provider,{value:n},e.children)}}}]);