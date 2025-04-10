"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[475],{2094:(e,d,n)=>{n.r(d),n.d(d,{assets:()=>E,contentTitle:()=>l,default:()=>o,frontMatter:()=>r,metadata:()=>i,toc:()=>t});var c=n(85893),s=n(11151);const r={title:"\u4e8b\u52a1\u4e2d\u7684\u5e76\u53d1\u63a7\u5236"},l="\u4e8b\u52a1\u4e2d\u7684\u5e76\u53d1\u63a7\u5236",i={id:"transactional-concurrency-control",title:"\u4e8b\u52a1\u4e2d\u7684\u5e76\u53d1\u63a7\u5236",description:"\u672c\u6587\u6863\u4ecb\u7ecd Apache Cloudberry \u4e2d\u7684\u4e8b\u52a1\u5e76\u53d1\u63a7\u5236\uff0c\u5305\u62ec\uff1a",source:"@site/i18n/zh/docusaurus-plugin-content-docs/current/transactional-concurrency-control.md",sourceDirName:".",slug:"/transactional-concurrency-control",permalink:"/zh/docs/transactional-concurrency-control",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/i18n/zh/docusaurus-plugin-content-docs/current/transactional-concurrency-control.md",tags:[],version:"current",lastUpdatedBy:"Alwin",lastUpdatedAt:1744282709,formattedLastUpdatedAt:"2025\u5e744\u670810\u65e5",frontMatter:{title:"\u4e8b\u52a1\u4e2d\u7684\u5e76\u53d1\u63a7\u5236"},sidebar:"docsbars",previous:{title:"\u4e8b\u52a1\u64cd\u4f5c",permalink:"/zh/docs/work-with-transactions"},next:{title:"\u9009\u62e9\u8868\u5b58\u50a8\u6a21\u578b",permalink:"/zh/docs/table-storage-models"}},E={},t=[{value:"\u591a\u7248\u672c\u5e76\u53d1\u63a7\u5236\u673a\u5236",id:"\u591a\u7248\u672c\u5e76\u53d1\u63a7\u5236\u673a\u5236",level:2},{value:"\u9501\u6a21\u5f0f",id:"\u9501\u6a21\u5f0f",level:2},{value:"\u5168\u5c40\u6b7b\u9501\u68c0\u6d4b\u5668",id:"\u5168\u5c40\u6b7b\u9501\u68c0\u6d4b\u5668",level:2},{value:"\u5168\u5c40\u6b7b\u9501\u68c0\u6d4b\u5668\u5bf9\u5e76\u53d1 <code>UPDATE</code> \u548c <code>DELETE</code> \u64cd\u4f5c\u7684\u7ba1\u7406",id:"\u5168\u5c40\u6b7b\u9501\u68c0\u6d4b\u5668\u5bf9\u5e76\u53d1-update-\u548c-delete-\u64cd\u4f5c\u7684\u7ba1\u7406",level:3}];function h(e){const d={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,s.a)(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(d.h1,{id:"\u4e8b\u52a1\u4e2d\u7684\u5e76\u53d1\u63a7\u5236",children:"\u4e8b\u52a1\u4e2d\u7684\u5e76\u53d1\u63a7\u5236"}),"\n",(0,c.jsx)(d.p,{children:"\u672c\u6587\u6863\u4ecb\u7ecd Apache Cloudberry \u4e2d\u7684\u4e8b\u52a1\u5e76\u53d1\u63a7\u5236\uff0c\u5305\u62ec\uff1a"}),"\n",(0,c.jsxs)(d.ul,{children:["\n",(0,c.jsxs)(d.li,{children:[(0,c.jsx)(d.a,{href:"#%E4%BA%8B%E5%8A%A1%E4%B8%AD%E7%9A%84%E5%B9%B6%E5%8F%91%E6%8E%A7%E5%88%B6",children:"\u4e8b\u52a1\u4e2d\u7684\u5e76\u53d1\u63a7\u5236"}),"\n",(0,c.jsxs)(d.ul,{children:["\n",(0,c.jsx)(d.li,{children:(0,c.jsx)(d.a,{href:"#%E5%A4%9A%E7%89%88%E6%9C%AC%E5%B9%B6%E5%8F%91%E6%8E%A7%E5%88%B6%E6%9C%BA%E5%88%B6",children:"\u591a\u7248\u672c\u5e76\u53d1\u63a7\u5236\u673a\u5236"})}),"\n",(0,c.jsx)(d.li,{children:(0,c.jsx)(d.a,{href:"#%E9%94%81%E6%A8%A1%E5%BC%8F",children:"\u9501\u6a21\u5f0f"})}),"\n",(0,c.jsxs)(d.li,{children:[(0,c.jsx)(d.a,{href:"#%E5%85%A8%E5%B1%80%E6%AD%BB%E9%94%81%E6%A3%80%E6%B5%8B%E5%99%A8",children:"\u5168\u5c40\u6b7b\u9501\u68c0\u6d4b\u5668"}),"\n",(0,c.jsxs)(d.ul,{children:["\n",(0,c.jsx)(d.li,{children:(0,c.jsxs)(d.a,{href:"#%E5%85%A8%E5%B1%80%E6%AD%BB%E9%94%81%E6%A3%80%E6%B5%8B%E5%99%A8%E5%AF%B9%E5%B9%B6%E5%8F%91-update-%E5%92%8C-delete-%E6%93%8D%E4%BD%9C%E7%9A%84%E7%AE%A1%E7%90%86",children:["\u5168\u5c40\u6b7b\u9501\u68c0\u6d4b\u5668\u5bf9\u5e76\u53d1 ",(0,c.jsx)(d.code,{children:"UPDATE"})," \u548c ",(0,c.jsx)(d.code,{children:"DELETE"})," \u64cd\u4f5c\u7684\u7ba1\u7406"]})}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,c.jsx)(d.h2,{id:"\u591a\u7248\u672c\u5e76\u53d1\u63a7\u5236\u673a\u5236",children:"\u591a\u7248\u672c\u5e76\u53d1\u63a7\u5236\u673a\u5236"}),"\n",(0,c.jsx)(d.p,{children:"Apache Cloudberry \u548c PostgreSQL \u4e0d\u4f7f\u7528\u9501\u673a\u5236\u6765\u8fdb\u884c\u4e8b\u52a1\u5e76\u53d1\u63a7\u5236\uff0c\u800c\u662f\u4f7f\u7528\u591a\u7248\u672c\u5e76\u53d1\u63a7\u5236\uff08MVCC\uff09\u673a\u5236\u6765\u7ef4\u62a4\u6570\u636e\u4e00\u81f4\u6027\u3002MVCC \u786e\u4fdd\u6bcf\u4e2a\u6570\u636e\u5e93\u4f1a\u8bdd\u7684\u4e8b\u52a1\u9694\u79bb\uff0c\u4f7f\u5f97\u6bcf\u4e2a\u67e5\u8be2\u4e8b\u52a1\u90fd\u80fd\u770b\u5230\u4e00\u4e2a\u4e00\u81f4\u7684\u6570\u636e\u5feb\u7167\u3002\u8fd9\u4fdd\u8bc1\u4e86\u4e8b\u52a1\u89c2\u5bdf\u5230\u7684\u6570\u636e\u662f\u4e00\u81f4\u7684\uff0c\u4e0d\u53d7\u5176\u4ed6\u5e76\u53d1\u4e8b\u52a1\u7684\u5f71\u54cd\u3002"}),"\n",(0,c.jsxs)(d.p,{children:["\u7136\u800c\uff0c\u4e8b\u52a1\u53ef\u89c1\u7684\u5177\u4f53\u6570\u636e\u53d8\u5316\u53d7\u9694\u79bb\u7ea7\u522b\u7684\u5f71\u54cd\u3002\u9ed8\u8ba4\u7684\u9694\u79bb\u7ea7\u522b\u662f\u201c\u5df2\u63d0\u4ea4\u8bfb\u201d\uff08",(0,c.jsx)(d.code,{children:"READ COMMITTED"}),"\uff09\uff0c\u8fd9\u610f\u5473\u7740\u4e8b\u52a1\u53ef\u4ee5\u89c2\u5bdf\u5230\u5176\u4ed6\u5df2\u63d0\u4ea4\u4e8b\u52a1\u6240\u505a\u7684\u6570\u636e\u53d8\u5316\u3002\u5982\u679c\u5c06\u9694\u79bb\u7ea7\u522b\u8bbe\u7f6e\u4e3a\u201c\u53ef\u91cd\u590d\u8bfb\u201d\uff08",(0,c.jsx)(d.code,{children:"REPEATABLE READ"}),"\uff09\uff0c\u90a3\u4e48\u8be5\u4e8b\u52a1\u4e2d\u7684\u67e5\u8be2\u5c06\u89c2\u5bdf\u5230\u4e8b\u52a1\u5f00\u59cb\u65f6\u7684\u6570\u636e\u72b6\u6001\uff0c\u5e76\u4e14\u4e0d\u4f1a\u770b\u5230\u5176\u4ed6\u4e8b\u52a1\u5728\u6b64\u671f\u95f4\u6240\u505a\u7684\u66f4\u6539\u3002\u4e3a\u4e86\u6307\u5b9a\u4e8b\u52a1\u7684\u9694\u79bb\u7ea7\u522b\uff0c\u4f60\u53ef\u4ee5\u4f7f\u7528\u8bed\u53e5 ",(0,c.jsx)(d.code,{children:"BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ"})," \u6765\u4ee5\u201c\u53ef\u91cd\u590d\u8bfb\u201d\u9694\u79bb\u7ea7\u522b\u542f\u52a8\u4e8b\u52a1\u3002"]}),"\n",(0,c.jsx)(d.p,{children:"\u7531\u4e8e MVCC \u4e0d\u4f7f\u7528\u663e\u5f0f\u9501\u8fdb\u884c\u5e76\u53d1\u63a7\u5236\uff0c\u56e0\u6b64\u6700\u5927\u9650\u5ea6\u51cf\u5c11\u4e86\u9501\u4e89\u7528\uff0cApache Cloudberry \u5728\u591a\u7528\u6237\u73af\u5883\u4e2d\u4fdd\u6301\u4e86\u5408\u7406\u7684\u6027\u80fd\u3002\u7528\u4e8e\u67e5\u8be2\uff08\u8bfb\u53d6\uff09\u6570\u636e\u7684\u9501\u4e0d\u4f1a\u4e0e\u7528\u4e8e\u5199\u5165\u6570\u636e\u7684\u9501\u53d1\u751f\u51b2\u7a81\u3002"}),"\n",(0,c.jsx)(d.h2,{id:"\u9501\u6a21\u5f0f",children:"\u9501\u6a21\u5f0f"}),"\n",(0,c.jsxs)(d.p,{children:["Apache Cloudberry \u63d0\u4f9b\u591a\u79cd\u9501\u6a21\u5f0f\u6765\u63a7\u5236\u5bf9\u8868\u6570\u636e\u7684\u5e76\u53d1\u8bbf\u95ee\u3002\u5927\u591a\u6570 Apache Cloudberry \u7684 SQL \u547d\u4ee4\u4f1a\u81ea\u52a8\u83b7\u53d6\u9002\u5f53\u7684\u9501\uff0c\u4ee5\u786e\u4fdd\u5728\u547d\u4ee4\u6267\u884c\u671f\u95f4\uff0c\u88ab\u5f15\u7528\u7684\u8868\u4e0d\u4f1a\u88ab\u5220\u9664\u6216\u88ab\u4ee5\u4e0d\u517c\u5bb9\u7684\u65b9\u5f0f\u4fee\u6539\u3002\u5bf9\u4e8e\u90a3\u4e9b\u96be\u4ee5\u9002\u5e94 MVCC \u884c\u4e3a\u7684\u5e94\u7528\u7a0b\u5e8f\uff0c\u4f60\u53ef\u4ee5\u4f7f\u7528 ",(0,c.jsx)(d.code,{children:"LOCK"})," \u547d\u4ee4\u6765\u83b7\u53d6\u663e\u5f0f\u9501\u3002\u7136\u800c\uff0c\u901a\u5e38\u60c5\u51b5\u4e0b\uff0c\u6b63\u786e\u4f7f\u7528 MVCC \u80fd\u591f\u63d0\u4f9b\u66f4\u597d\u7684\u6027\u80fd\u3002"]}),"\n",(0,c.jsxs)(d.table,{children:[(0,c.jsx)(d.thead,{children:(0,c.jsxs)(d.tr,{children:[(0,c.jsx)(d.th,{children:"\u9501\u6a21\u5f0f"}),(0,c.jsx)(d.th,{children:"\u76f8\u5173 SQL \u547d\u4ee4"}),(0,c.jsx)(d.th,{children:"\u4e0e\u4e4b\u51b2\u7a81\u7684\u5176\u4ed6\u9501\u6a21\u5f0f"})]})}),(0,c.jsxs)(d.tbody,{children:[(0,c.jsxs)(d.tr,{children:[(0,c.jsx)(d.td,{children:"ACCESS SHARE"}),(0,c.jsx)(d.td,{children:(0,c.jsx)(d.code,{children:"SELECT"})}),(0,c.jsx)(d.td,{children:"ACCESS EXCLUSIVE"})]}),(0,c.jsxs)(d.tr,{children:[(0,c.jsx)(d.td,{children:"ROW SHARE"}),(0,c.jsx)(d.td,{children:(0,c.jsx)(d.code,{children:"SELECT...FOR lock_strength"})}),(0,c.jsx)(d.td,{children:"EXCLUSIVE, ACCESS EXCLUSIVE"})]}),(0,c.jsxs)(d.tr,{children:[(0,c.jsx)(d.td,{children:"ROW EXCLUSIVE"}),(0,c.jsxs)(d.td,{children:[(0,c.jsx)(d.code,{children:"INSERT"}),", ",(0,c.jsx)(d.code,{children:"COPY"})]}),(0,c.jsx)(d.td,{children:"SHARE, SHARE ROW EXCLUSIVE, EXCLUSIVE, ACCESS EXCLUSIVE"})]}),(0,c.jsxs)(d.tr,{children:[(0,c.jsx)(d.td,{children:"SHARE UPDATE EXCLUSIVE"}),(0,c.jsx)(d.td,{children:(0,c.jsx)(d.code,{children:"ANALYZE"})}),(0,c.jsx)(d.td,{children:"SHARE UPDATE EXCLUSIVE, SHARE, EXCLUSIVE, ACCESS EXCLUSIVE"})]}),(0,c.jsxs)(d.tr,{children:[(0,c.jsx)(d.td,{children:"SHARE"}),(0,c.jsx)(d.td,{children:(0,c.jsx)(d.code,{children:"CREATE INDEX"})}),(0,c.jsx)(d.td,{children:"ROW EXCLUSIVE, SHARE UPDATE EXCLUSIVE, SHARE ROW EXCLUSIVE, EXCLUSIVE, ACCESS EXCLUSIVE"})]}),(0,c.jsxs)(d.tr,{children:[(0,c.jsx)(d.td,{children:"SHARE ROW EXCLUSIVE"}),(0,c.jsx)(d.td,{children:"\xa0"}),(0,c.jsx)(d.td,{children:"ROW EXCLUSIVE, SHARE UPDATE EXCLUSIVE, SHARE, SHARE ROW EXCLUSIVE, EXCLUSIVE, ACCESS EXCLUSIVE"})]}),(0,c.jsxs)(d.tr,{children:[(0,c.jsx)(d.td,{children:"EXCLUSIVE"}),(0,c.jsxs)(d.td,{children:[(0,c.jsx)(d.code,{children:"DELETE"}),", ",(0,c.jsx)(d.code,{children:"UPDATE"}),", ",(0,c.jsx)(d.code,{children:"SELECT...FOR lock_strength"}),", ",(0,c.jsx)(d.code,{children:"REFRESH MATERIALIZED VIEW CONCURRENTLY"})]}),(0,c.jsx)(d.td,{children:"ROW SHARE, ROW EXCLUSIVE, SHARE UPDATE EXCLUSIVE, SHARE, SHARE ROW EXCLUSIVE, EXCLUSIVE, ACCESS EXCLUSIVE"})]}),(0,c.jsxs)(d.tr,{children:[(0,c.jsx)(d.td,{children:"ACCESS EXCLUSIVE"}),(0,c.jsxs)(d.td,{children:[(0,c.jsx)(d.code,{children:"ALTER TABLE"}),", ",(0,c.jsx)(d.code,{children:"DROP TABLE"}),", ",(0,c.jsx)(d.code,{children:"TRUNCATE"}),", ",(0,c.jsx)(d.code,{children:"REINDEX"}),", ",(0,c.jsx)(d.code,{children:"CLUSTER"}),", ",(0,c.jsx)(d.code,{children:"REFRESH MATERIALIZED VIEW"}),"\uff08\u4e0d\u5e26 ",(0,c.jsx)(d.code,{children:"CONCURRENTLY"}),"\uff09, ",(0,c.jsx)(d.code,{children:"VACUUM FULL"})]}),(0,c.jsx)(d.td,{children:"ACCESS SHARE, ROW SHARE, ROW EXCLUSIVE, SHARE UPDATE EXCLUSIVE, SHARE, SHARE ROW EXCLUSIVE, EXCLUSIVE, ACCESS EXCLUSIVE"})]})]})]}),"\n",(0,c.jsxs)(d.admonition,{title:"\u6ce8\u610f",type:"info",children:[(0,c.jsxs)(d.p,{children:["\u5168\u5c40\u6b7b\u9501\u68c0\u6d4b\u5668 (Global Deadlock Detector) \u662f\u9ed8\u8ba4\u5173\u95ed\u7684\u3002Apache Cloudberry \u5728\u6267\u884c ",(0,c.jsx)(d.code,{children:"UPDATE"})," \u548c ",(0,c.jsx)(d.code,{children:"DELETE"})," \u64cd\u4f5c\u65f6\u4f1a\u83b7\u53d6\u66f4\u4e3a\u4e25\u683c\u7684 ",(0,c.jsx)(d.code,{children:"EXCLUSIVE"}),"\uff08\u6392\u4ed6\u9501\uff09\uff0c\u800c\u4e0d\u662f PostgreSQL \u4e2d\u7684 ",(0,c.jsx)(d.code,{children:"ROW EXCLUSIVE"}),"\uff08\u884c\u6392\u4ed6\u9501\uff09\u3002"]}),(0,c.jsx)(d.p,{children:"\u5f53\u5168\u5c40\u6b7b\u9501\u68c0\u6d4b\u5668\u5f00\u542f\u540e\uff1a"}),(0,c.jsxs)(d.ul,{children:["\n",(0,c.jsxs)(d.li,{children:["\u5806\u8868\u4e0a\u67d0\u4e9b ",(0,c.jsx)(d.code,{children:"DELETE"})," \u548c ",(0,c.jsx)(d.code,{children:"UPDATE"})," \u64cd\u4f5c\u7684\u9501\u6a21\u5f0f\u5c06\u662f ",(0,c.jsx)(d.code,{children:"ROW EXCLUSIVE"}),"\u3002\u8be6\u89c1",(0,c.jsx)(d.a,{href:"#%E5%85%A8%E5%B1%80%E6%AD%BB%E9%94%81%E6%A3%80%E6%B5%8B",children:"\u5168\u5c40\u6b7b\u9501\u68c0\u6d4b\u5668"}),"\u3002"]}),"\n"]})]}),"\n",(0,c.jsx)(d.h2,{id:"\u5168\u5c40\u6b7b\u9501\u68c0\u6d4b\u5668",children:"\u5168\u5c40\u6b7b\u9501\u68c0\u6d4b\u5668"}),"\n",(0,c.jsxs)(d.p,{children:["Apache Cloudberry \u7684\u5168\u5c40\u6b7b\u9501\u68c0\u6d4b\u5668 (Global Deadlock Detector) \u540e\u53f0\u5de5\u4f5c\u8fdb\u7a0b\u4f1a\u6536\u96c6\u6240\u6709 Segment \u4e0a\u7684\u9501\u4fe1\u606f\uff0c\u5e76\u4f7f\u7528\u4e00\u79cd\u6709\u5411\u7b97\u6cd5\u6765\u68c0\u6d4b\u672c\u5730\u548c\u5168\u5c40\u6b7b\u9501\u662f\u5426\u5b58\u5728\u3002\u8fd9\u79cd\u7b97\u6cd5\u8ba9 Apache Cloudberry \u653e\u5bbd\u4e86\u5bf9\u5806\u8868\u4e0a\u5e76\u53d1\u66f4\u65b0\u548c\u5220\u9664\u64cd\u4f5c\u7684\u9650\u5236\u3002\u5c3d\u7ba1\u5982\u6b64\uff0cApache Cloudberry \u5728 AO/CO \u8868\u4e0a\u4ecd\u91c7\u7528\u8868\u7ea7\u9501\u5b9a\uff0c\u9650\u5236\u5e76\u53d1\u7684 ",(0,c.jsx)(d.code,{children:"UPDATE"}),"\u3001",(0,c.jsx)(d.code,{children:"DELETE"})," \u548c ",(0,c.jsx)(d.code,{children:"SELECT...FOR lock_strength"})," \u64cd\u4f5c\u3002"]}),"\n",(0,c.jsxs)(d.p,{children:["\u9ed8\u8ba4\u60c5\u51b5\u4e0b\uff0c\u5168\u5c40\u6b7b\u9501\u68c0\u6d4b\u5668\u662f\u5173\u95ed\u7684\u3002\u5728 Apache Cloudberry \u4e2d\uff0c\u5806\u8868\u4e0a\u7684\u5e76\u53d1 ",(0,c.jsx)(d.code,{children:"UPDATE"})," \u548c ",(0,c.jsx)(d.code,{children:"DELETE"})," \u64cd\u4f5c\u4f1a\u4e32\u884c\u8fd0\u884c\u3002\u82e5\u8981\u6fc0\u6d3b\u8fd9\u4e9b\u5e76\u53d1\u66f4\u65b0\u5e76\u8ba9\u5168\u5c40\u6b7b\u9501\u68c0\u6d4b\u5668\u51b3\u5b9a\u4f55\u65f6\u5b58\u5728\u6b7b\u9501\uff0c\u4f60\u53ef\u4ee5\u5728 ",(0,c.jsx)(d.code,{children:"postgresql.conf"})," \u914d\u7f6e\u6587\u4ef6\u4e2d\u8bbe\u7f6e\u53c2\u6570 ",(0,c.jsx)(d.code,{children:"gp_enable_global_deadlock_detector"})," \u4e3a ",(0,c.jsx)(d.code,{children:"on"}),"\uff0c\u5e76\u91cd\u542f\u6570\u636e\u5e93\u3002"]}),"\n",(0,c.jsxs)(d.p,{children:["\u5f53\u5168\u5c40\u6b7b\u9501\u68c0\u6d4b\u5668\u542f\u7528\u65f6\uff0c\u540e\u53f0\u5de5\u4f5c\u8fdb\u7a0b\u4f1a\u5728 Coordinator \u4e3b\u673a\u4e0a\u81ea\u52a8\u542f\u52a8\u3002\u4f60\u53ef\u4ee5\u901a\u8fc7\u5728 ",(0,c.jsx)(d.code,{children:"postgresql.conf"})," \u914d\u7f6e\u6587\u4ef6\u4e2d\u7684 ",(0,c.jsx)(d.code,{children:"gp_global_deadlock_detector_period"})," \u670d\u52a1\u5668\u914d\u7f6e\u53c2\u6570\u6765\u914d\u7f6e\u5168\u5c40\u6b7b\u9501\u68c0\u6d4b\u5668\u6536\u96c6\u548c\u5206\u6790\u9501\u7b49\u5f85\u6570\u636e\u7684\u95f4\u9694\u3002"]}),"\n",(0,c.jsx)(d.p,{children:"\u5982\u679c\u5168\u5c40\u6b7b\u9501\u68c0\u6d4b\u5668\u786e\u5b9a\u5b58\u5728\u6b7b\u9501\uff0c\u5b83\u4f1a\u91c7\u53d6\u63aa\u65bd\u6253\u7834\u6b7b\u9501\uff0c\u5177\u4f53\u505a\u6cd5\u662f\u53d6\u6d88\u76f8\u5173\u6700\u8fd1\u4e8b\u52a1\u7684\u4e00\u4e2a\u6216\u591a\u4e2a\u540e\u53f0\u8fdb\u7a0b\u3002"}),"\n",(0,c.jsx)(d.p,{children:"\u5f53\u5168\u5c40\u6b7b\u9501\u68c0\u6d4b\u5668\u53d1\u73b0\u4ee5\u4e0b\u7c7b\u578b\u7684\u4e8b\u52a1\u5b58\u5728\u6b7b\u9501\u65f6\uff0c\u5176\u4e2d\u53ea\u6709\u4e00\u4e2a\u4e8b\u52a1\u4f1a\u6210\u529f\u3002\u5176\u4ed6\u4e8b\u52a1\u4f1a\u56e0\u4e3a\u4e0d\u5141\u8bb8\u5bf9\u540c\u4e00\u884c\u8fdb\u884c\u5e76\u53d1\u66f4\u65b0\u800c\u5931\u8d25\uff0c\u5e76\u663e\u793a\u76f8\u5e94\u7684\u9519\u8bef\u4fe1\u606f\u3002"}),"\n",(0,c.jsxs)(d.ul,{children:["\n",(0,c.jsx)(d.li,{children:"\u5728\u5806\u8868\u4e0a\uff0c\u9488\u5bf9\u540c\u4e00\u884c\u7684\u5e76\u53d1\u4e8b\u52a1\uff0c\u5982\u679c\u7b2c\u4e00\u4e2a\u4e8b\u52a1\u662f\u66f4\u65b0\u64cd\u4f5c\uff0c\u800c\u540e\u7eed\u7684\u4e8b\u52a1\u8fdb\u884c\u66f4\u65b0\u6216\u5220\u9664\uff0c\u5e76\u4e14\u67e5\u8be2\u8ba1\u5212\u4e2d\u5305\u542b motion \u64cd\u4f5c\u7b26\u3002"}),"\n",(0,c.jsx)(d.li,{children:"\u57fa\u4e8e Postgres \u4f18\u5316\u5668\uff0c\u9488\u5bf9\u5806\u8868\u4e0a\u540c\u4e00\u5206\u5e03\u952e\u7684\u5e76\u53d1\u66f4\u65b0\u4e8b\u52a1\u3002"}),"\n",(0,c.jsx)(d.li,{children:"\u57fa\u4e8e GPORCA \u4f18\u5316\u5668\uff0c\u9488\u5bf9\u54c8\u5e0c\u8868\u4e0a\u540c\u4e00\u884c\u7684\u5e76\u53d1\u66f4\u65b0\u4e8b\u52a1\u3002"}),"\n"]}),"\n",(0,c.jsx)(d.admonition,{title:"\u63d0\u793a",type:"tip",children:(0,c.jsxs)(d.p,{children:["Apache Cloudberry \u4f7f\u7528\u670d\u52a1\u5668\u914d\u7f6e\u53c2\u6570 ",(0,c.jsx)(d.code,{children:"deadlock_timeout"})," \u6240\u6307\u5b9a\u7684\u95f4\u9694\u6765\u8fdb\u884c\u672c\u5730\u6b7b\u9501\u68c0\u6d4b\u3002\u7531\u4e8e\u672c\u5730\u548c\u5168\u5c40\u6b7b\u9501\u68c0\u6d4b\u7b97\u6cd5\u4e0d\u540c\uff0c\u6839\u636e\u54ea\u4e2a\u68c0\u6d4b\u5668\uff08\u672c\u5730\u6216\u5168\u5c40\uff09\u9996\u5148\u89e6\u53d1\uff0c\u88ab\u53d6\u6d88\u7684\u8fdb\u7a0b\u53ef\u80fd\u4f1a\u6709\u6240\u4e0d\u540c\u3002"]})}),"\n",(0,c.jsx)(d.admonition,{title:"\u63d0\u793a",type:"tip",children:(0,c.jsxs)(d.p,{children:["\u5982\u679c\u542f\u7528\u4e86 ",(0,c.jsx)(d.code,{children:"lock_timeout"})," \u670d\u52a1\u5668\u914d\u7f6e\u53c2\u6570\uff0c\u5e76\u5c06\u5176\u8bbe\u7f6e\u4e3a\u5c0f\u4e8e ",(0,c.jsx)(d.code,{children:"deadlock_timeout"})," \u548c ",(0,c.jsx)(d.code,{children:"gp_global_deadlock_detector_period"})," \u7684\u503c\uff0cApache Cloudberry \u5c06\u5728\u4f1a\u8bdd\u4e2d\u89e6\u53d1\u6b7b\u9501\u68c0\u67e5\u4e4b\u524d\u53d6\u6d88\u4e00\u4e2a\u8bed\u53e5\u3002"]})}),"\n",(0,c.jsxs)(d.p,{children:["\u82e5\u8981\u67e5\u770b\u6240\u6709 Segment \u7684\u7b49\u9501\u4fe1\u606f\uff0c\u8bf7\u6267\u884c\u7528\u6237\u5b9a\u4e49\u51fd\u6570 ",(0,c.jsx)(d.code,{children:"gp_dist_wait_status()"}),"\u3002\u901a\u8fc7\u51fd\u6570\u7684\u8f93\u51fa\uff0c\u53ef\u4ee5\u786e\u5b9a\u54ea\u4e9b\u4e8b\u52a1\u6b63\u5728\u7b49\u9501\uff0c\u54ea\u4e9b\u4e8b\u52a1\u6301\u6709\u9501\uff0c\u9501\u7684\u7c7b\u578b\u548c\u6a21\u5f0f\uff0c\u7b49\u5f85\u8005\u548c\u6301\u6709\u8005\u7684\u4f1a\u8bdd\u6807\u8bc6\u7b26\uff0c\u4ee5\u53ca\u54ea\u4e9b Segment \u6b63\u5728\u8fd0\u884c\u4e8b\u52a1\u3002\u4ee5\u4e0b\u662f\u4e00\u4e2a ",(0,c.jsx)(d.code,{children:"gp_dist_wait_status()"})," \u51fd\u6570\u7684\u793a\u4f8b\u8f93\u51fa\uff1a"]}),"\n",(0,c.jsx)(d.pre,{children:(0,c.jsx)(d.code,{className:"language-sql",children:"SELECT * FROM pg_catalog.gp_dist_wait_status();\n\n-[ RECORD 1 ]----+--------------\nsegid            | 0\nwaiter_dxid      | 11\nholder_dxid      | 12\nholdTillEndXact  | t\nwaiter_lpid      | 31249\nholder_lpid      | 31458\nwaiter_lockmode  | ShareLock\nwaiter_locktype  | transactionid\nwaiter_sessionid | 8\nholder_sessionid | 9\n-[ RECORD 2 ]----+--------------\nsegid            | 1\nwaiter_dxid      | 12\nholder_dxid      | 11\nholdTillEndXact  | t\nwaiter_lpid      | 31467\nholder_lpid      | 31250\nwaiter_lockmode  | ShareLock\nwaiter_locktype  | transactionid\nwaiter_sessionid | 9\nholder_sessionid | 8\n"})}),"\n",(0,c.jsx)(d.p,{children:"\u5f53\u5168\u5c40\u6b7b\u9501\u68c0\u6d4b\u5668\u53d6\u6d88\u4e86\u4e00\u4e2a\u4e8b\u52a1\u4ee5\u6253\u7834\u6b7b\u9501\u65f6\uff0c\u4f1a\u62a5\u544a\u4ee5\u4e0b\u9519\u8bef\u4fe1\u606f\uff1a"}),"\n",(0,c.jsx)(d.pre,{children:(0,c.jsx)(d.code,{children:'ERROR: canceling statement due to user request: "cancelled by global deadlock detector"\n'})}),"\n",(0,c.jsxs)(d.h3,{id:"\u5168\u5c40\u6b7b\u9501\u68c0\u6d4b\u5668\u5bf9\u5e76\u53d1-update-\u548c-delete-\u64cd\u4f5c\u7684\u7ba1\u7406",children:["\u5168\u5c40\u6b7b\u9501\u68c0\u6d4b\u5668\u5bf9\u5e76\u53d1 ",(0,c.jsx)(d.code,{children:"UPDATE"})," \u548c ",(0,c.jsx)(d.code,{children:"DELETE"})," \u64cd\u4f5c\u7684\u7ba1\u7406"]}),"\n",(0,c.jsxs)(d.p,{children:["\u5bf9\u4e8e\u5806\u8868\uff0c\u5168\u5c40\u6b7b\u9501\u68c0\u6d4b\u5668\u53ef\u4ee5\u7ba1\u7406\u4ee5\u4e0b\u7c7b\u578b\u7684 ",(0,c.jsx)(d.code,{children:"UPDATE"})," \u548c ",(0,c.jsx)(d.code,{children:"DELETE"})," \u5e76\u53d1\u64cd\u4f5c\u547d\u4ee4\uff1a"]}),"\n",(0,c.jsxs)(d.ul,{children:["\n",(0,c.jsxs)(d.li,{children:["\n",(0,c.jsxs)(d.p,{children:["\u7b80\u5355\u7684\u5355\u8868 ",(0,c.jsx)(d.code,{children:"UPDATE"}),"\uff08\u66f4\u65b0\uff09\u3002\u4f7f\u7528\u57fa\u4e8e Postgres \u4f18\u5316\u5668\u66f4\u65b0\u975e\u5206\u5e03\u952e\u3002\u547d\u4ee4\u4e0d\u5305\u542b ",(0,c.jsx)(d.code,{children:"FROM"})," \u5b50\u53e5\uff0c\u4e5f\u4e0d\u5728 ",(0,c.jsx)(d.code,{children:"WHERE"})," \u5b50\u53e5\u4e2d\u5305\u542b\u5b50\u67e5\u8be2\u3002"]}),"\n",(0,c.jsx)(d.pre,{children:(0,c.jsx)(d.code,{className:"language-sql",children:"UPDATE t SET c2 = c2 + 1 WHERE c1 > 10;\n"})}),"\n"]}),"\n",(0,c.jsxs)(d.li,{children:["\n",(0,c.jsxs)(d.p,{children:["\u7b80\u5355\u7684\u5355\u8868 ",(0,c.jsx)(d.code,{children:"DELETE"}),"\uff08\u5220\u9664\uff09\u3002",(0,c.jsx)(d.code,{children:"FROM"})," \u6216 ",(0,c.jsx)(d.code,{children:"WHERE"})," \u5b50\u53e5\u4e2d\u4e0d\u5305\u542b\u5b50\u67e5\u8be2\u3002"]}),"\n",(0,c.jsx)(d.pre,{children:(0,c.jsx)(d.code,{className:"language-sql",children:"DELETE FROM t WHERE c1 > 10;\n"})}),"\n"]}),"\n",(0,c.jsxs)(d.li,{children:["\n",(0,c.jsxs)(d.p,{children:["\u62c6\u5206 ",(0,c.jsx)(d.code,{children:"UPDATE"}),"\u3002\u5982\u679c\u4f7f\u7528\u57fa\u4e8e Postgres \u7684\u4f18\u5316\u5668\uff0c",(0,c.jsx)(d.code,{children:"UPDATE"})," \u547d\u4ee4\u66f4\u65b0\u4e00\u4e2a\u5206\u5e03\u952e\u3002"]}),"\n",(0,c.jsx)(d.pre,{children:(0,c.jsx)(d.code,{className:"language-sql",children:"UPDATE t SET c = c + 1; -- c \u662f\u4e00\u4e2a\u5206\u5e03\u952e\n"})}),"\n",(0,c.jsxs)(d.p,{children:["\u5982\u679c\u4f7f\u7528 GPORCA \u4f18\u5316\u5668\uff0c",(0,c.jsx)(d.code,{children:"UPDATE"})," \u547d\u4ee4\u5219\u66f4\u65b0\u4e00\u4e2a\u5206\u5e03\u952e\u6216\u5f15\u7528\u4e00\u4e2a\u5206\u5e03\u952e\u3002"]}),"\n",(0,c.jsx)(d.pre,{children:(0,c.jsx)(d.code,{className:"language-sql",children:"UPDATE t SET b = b + 1 WHERE c = 10; -- c \u662f\u4e00\u4e2a\u5206\u5e03\u952e\n"})}),"\n"]}),"\n",(0,c.jsxs)(d.li,{children:["\n",(0,c.jsxs)(d.p,{children:["\u590d\u6742 ",(0,c.jsx)(d.code,{children:"UPDATE"}),"\uff0c\u5305\u62ec\u591a\u8868\u8fde\u63a5\u7684 ",(0,c.jsx)(d.code,{children:"UPDATE"})," \u547d\u4ee4\u3002"]}),"\n",(0,c.jsx)(d.pre,{children:(0,c.jsx)(d.code,{className:"language-sql",children:"UPDATE t1 SET c = t1.c+1 FROM t2 WHERE t1.c = t2.c;\n"})}),"\n",(0,c.jsxs)(d.p,{children:["\u6216\u8005\u547d\u4ee4\u5728 ",(0,c.jsx)(d.code,{children:"WHERE"})," \u5b50\u53e5\u4e2d\u5305\u542b\u5b50\u67e5\u8be2\u3002"]}),"\n",(0,c.jsx)(d.pre,{children:(0,c.jsx)(d.code,{className:"language-sql",children:"UPDATE t SET c = c + 1 WHERE c > ALL(SELECT * FROM t1);\n"})}),"\n"]}),"\n",(0,c.jsxs)(d.li,{children:["\n",(0,c.jsxs)(d.p,{children:["\u590d\u6742 ",(0,c.jsx)(d.code,{children:"DELETE"})," \u64cd\u4f5c\uff0c\u7c7b\u4f3c\u4e8e\u590d\u6742\u7684 ",(0,c.jsx)(d.code,{children:"UPDATE"})," \u64cd\u4f5c\uff0c\u6d89\u53ca\u591a\u8868\u8fde\u63a5\u6216\u5b50\u67e5\u8be2\u3002"]}),"\n",(0,c.jsx)(d.pre,{children:(0,c.jsx)(d.code,{className:"language-sql",children:"DELETE FROM t USING t1 WHERE t.c > t1.c;\n"})}),"\n"]}),"\n"]}),"\n",(0,c.jsxs)(d.p,{children:["\u4e0b\u8868\u5217\u4e3e\u4e86\u5168\u5c40\u6b7b\u9501\u68c0\u6d4b\u5668\u6240\u7ba1\u7406\u7684\u5e76\u53d1 ",(0,c.jsx)(d.code,{children:"UPDATE"})," \u548c ",(0,c.jsx)(d.code,{children:"DELETE"})," \u547d\u4ee4\u3002\u8fd9\u4e9b\u547d\u4ee4\u7684\u4f8b\u5b50\u5305\u62ec\uff1a"]}),"\n",(0,c.jsxs)(d.ul,{children:["\n",(0,c.jsxs)(d.li,{children:["\u540c\u4e00\u8868\u884c\u4e0a\u7684\u5e76\u53d1\u7b80\u5355 ",(0,c.jsx)(d.code,{children:"UPDATE"})," \u547d\u4ee4\uff0c\u7531\u5168\u5c40\u6b7b\u9501\u68c0\u6d4b\u5668\u8fdb\u884c\u7ba1\u7406\u3002"]}),"\n",(0,c.jsxs)(d.li,{children:["\u5e76\u53d1\u7684\u590d\u6742 ",(0,c.jsx)(d.code,{children:"UPDATE"})," \u548c\u7b80\u5355 ",(0,c.jsx)(d.code,{children:"UPDATE"})," \u547d\u4ee4\uff0c\u5176\u4e2d\u53ea\u6709\u4e00\u4e2a ",(0,c.jsx)(d.code,{children:"UPDATE"})," \u4f1a\u88ab\u6267\u884c\uff0c\u800c\u53e6\u4e00\u4e2a ",(0,c.jsx)(d.code,{children:"UPDATE"})," \u4f1a\u8fd4\u56de\u9519\u8bef\u3002"]}),"\n"]}),"\n",(0,c.jsx)(d.admonition,{title:"\u63d0\u793a",type:"tip",children:(0,c.jsxs)(d.p,{children:["\u5728\u4e0b\u9762\u8868\u683c\u4e2d\uff0c",(0,c.jsx)(d.code,{children:"YES"})," \u8868\u793a\u53ef\u5e76\u53d1\u6267\u884c\uff0c",(0,c.jsx)(d.code,{children:"NO"})," \u8868\u793a\u4e0d\u53ef\u5e76\u53d1\u6267\u884c\u3002"]})}),"\n",(0,c.jsxs)(d.table,{children:[(0,c.jsx)(d.thead,{children:(0,c.jsxs)(d.tr,{children:[(0,c.jsx)(d.th,{children:"\u547d\u4ee4"}),(0,c.jsxs)(d.th,{children:["\u7b80\u5355 ",(0,c.jsx)(d.code,{children:"UPDATE"})]}),(0,c.jsxs)(d.th,{children:["\u7b80\u5355 ",(0,c.jsx)(d.code,{children:"DELETE"})]}),(0,c.jsxs)(d.th,{children:["\u62c6\u5206 ",(0,c.jsx)(d.code,{children:"UPDATE"})]}),(0,c.jsxs)(d.th,{children:["\u590d\u6742 ",(0,c.jsx)(d.code,{children:"UPDATE"})]}),(0,c.jsxs)(d.th,{children:["\u590d\u6742 ",(0,c.jsx)(d.code,{children:"DELETE"})]})]})}),(0,c.jsxs)(d.tbody,{children:[(0,c.jsxs)(d.tr,{children:[(0,c.jsxs)(d.td,{children:["\u7b80\u5355 ",(0,c.jsx)(d.code,{children:"UPDATE"})]}),(0,c.jsx)(d.td,{children:"YES"}),(0,c.jsx)(d.td,{children:"YES"}),(0,c.jsx)(d.td,{children:"NO"}),(0,c.jsx)(d.td,{children:"NO"}),(0,c.jsx)(d.td,{children:"NO"})]}),(0,c.jsxs)(d.tr,{children:[(0,c.jsxs)(d.td,{children:["\u7b80\u5355 ",(0,c.jsx)(d.code,{children:"DELETE"})]}),(0,c.jsx)(d.td,{children:"YES"}),(0,c.jsx)(d.td,{children:"YES"}),(0,c.jsx)(d.td,{children:"NO"}),(0,c.jsx)(d.td,{children:"YES"}),(0,c.jsx)(d.td,{children:"YES"})]}),(0,c.jsxs)(d.tr,{children:[(0,c.jsxs)(d.td,{children:["\u62c6\u5206 ",(0,c.jsx)(d.code,{children:"UPDATE"})]}),(0,c.jsx)(d.td,{children:"NO"}),(0,c.jsx)(d.td,{children:"NO"}),(0,c.jsx)(d.td,{children:"NO"}),(0,c.jsx)(d.td,{children:"NO"}),(0,c.jsx)(d.td,{children:"NO"})]}),(0,c.jsxs)(d.tr,{children:[(0,c.jsxs)(d.td,{children:["\u590d\u6742 ",(0,c.jsx)(d.code,{children:"UPDATE"})]}),(0,c.jsx)(d.td,{children:"NO"}),(0,c.jsx)(d.td,{children:"YES"}),(0,c.jsx)(d.td,{children:"NO"}),(0,c.jsx)(d.td,{children:"NO"}),(0,c.jsx)(d.td,{children:"NO"})]}),(0,c.jsxs)(d.tr,{children:[(0,c.jsxs)(d.td,{children:["\u590d\u6742 ",(0,c.jsx)(d.code,{children:"DELETE"})]}),(0,c.jsx)(d.td,{children:"NO"}),(0,c.jsx)(d.td,{children:"YES"}),(0,c.jsx)(d.td,{children:"NO"}),(0,c.jsx)(d.td,{children:"NO"}),(0,c.jsx)(d.td,{children:"YES"})]})]})]})]})}function o(e={}){const{wrapper:d}={...(0,s.a)(),...e.components};return d?(0,c.jsx)(d,{...e,children:(0,c.jsx)(h,{...e})}):h(e)}},11151:(e,d,n)=>{n.d(d,{Z:()=>i,a:()=>l});var c=n(67294);const s={},r=c.createContext(s);function l(e){const d=c.useContext(r);return c.useMemo((function(){return"function"==typeof e?e(d):{...d,...e}}),[d,e])}function i(e){let d;return d=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:l(e.components),c.createElement(r.Provider,{value:d},e.children)}}}]);