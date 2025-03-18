"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[4291],{17123:(d,e,n)=>{n.r(e),n.d(e,{assets:()=>l,contentTitle:()=>i,default:()=>h,frontMatter:()=>r,metadata:()=>c,toc:()=>a});var s=n(85893),t=n(11151);const r={title:"\u6570\u636e\u52a0\u8f7d\u6982\u51b5"},i="\u6570\u636e\u52a0\u8f7d\u6982\u89c8",c={id:"data-loading/index",title:"\u6570\u636e\u52a0\u8f7d\u6982\u51b5",description:"Apache Cloudberry \u4e3b\u8981\u901a\u8fc7\u52a0\u8f7d\u5de5\u5177\u5c06\u5916\u90e8\u6570\u636e\u8f6c\u6362\u4e3a\u5916\u90e8\u8868\u6765\u52a0\u8f7d\u6570\u636e\u3002\u7136\u540e\u4ece\u8fd9\u4e9b\u5916\u90e8\u8868\u4e2d\u8bfb\u53d6\u6570\u636e\uff0c\u6216\u5c06\u6570\u636e\u5199\u5165\u5916\u90e8\u8868\u4e2d\uff0c\u4ee5\u6b64\u5b9e\u73b0\u5916\u90e8\u6570\u636e\u52a0\u8f7d\u3002",source:"@site/i18n/zh/docusaurus-plugin-content-docs/current/data-loading/index.md",sourceDirName:"data-loading",slug:"/data-loading/",permalink:"/zh/docs/data-loading/",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/i18n/zh/docusaurus-plugin-content-docs/current/data-loading/index.md",tags:[],version:"current",lastUpdatedBy:"Dianjin Wang",lastUpdatedAt:1742268909,formattedLastUpdatedAt:"2025\u5e743\u670818\u65e5",frontMatter:{title:"\u6570\u636e\u52a0\u8f7d\u6982\u51b5"},sidebar:"docsbars",previous:{title:"\u5355\u8ba1\u7b97\u8282\u70b9\u6a21\u5f0f\u90e8\u7f72",permalink:"/zh/docs/deploy-cbdb-with-single-node"},next:{title:"\u4f7f\u7528 COPY \u52a0\u8f7d\u6570\u636e",permalink:"/zh/docs/data-loading/load-data-using-copy"}},l={},a=[{value:"\u6570\u636e\u52a0\u8f7d\u6d41\u7a0b",id:"\u6570\u636e\u52a0\u8f7d\u6d41\u7a0b",level:2},{value:"\u52a0\u8f7d\u65b9\u6cd5\u548c\u573a\u666f",id:"\u52a0\u8f7d\u65b9\u6cd5\u548c\u573a\u666f",level:2}];function o(d){const e={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,t.a)(),...d.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(e.h1,{id:"\u6570\u636e\u52a0\u8f7d\u6982\u89c8",children:"\u6570\u636e\u52a0\u8f7d\u6982\u89c8"}),"\n",(0,s.jsx)(e.p,{children:"Apache Cloudberry \u4e3b\u8981\u901a\u8fc7\u52a0\u8f7d\u5de5\u5177\u5c06\u5916\u90e8\u6570\u636e\u8f6c\u6362\u4e3a\u5916\u90e8\u8868\u6765\u52a0\u8f7d\u6570\u636e\u3002\u7136\u540e\u4ece\u8fd9\u4e9b\u5916\u90e8\u8868\u4e2d\u8bfb\u53d6\u6570\u636e\uff0c\u6216\u5c06\u6570\u636e\u5199\u5165\u5916\u90e8\u8868\u4e2d\uff0c\u4ee5\u6b64\u5b9e\u73b0\u5916\u90e8\u6570\u636e\u52a0\u8f7d\u3002"}),"\n",(0,s.jsx)(e.h2,{id:"\u6570\u636e\u52a0\u8f7d\u6d41\u7a0b",children:"\u6570\u636e\u52a0\u8f7d\u6d41\u7a0b"}),"\n",(0,s.jsx)(e.p,{children:"\u52a0\u8f7d\u6570\u636e\u8fdb\u5165 Apache Cloudberry \u7684\u4e00\u822c\u6d41\u7a0b\u5982\u4e0b\uff1a"}),"\n",(0,s.jsxs)(e.ol,{children:["\n",(0,s.jsx)(e.li,{children:"\u8bc4\u4f30\u6570\u636e\u52a0\u8f7d\u573a\u666f\uff08\u4f8b\u5982\u6570\u636e\u6e90\u4f4d\u7f6e\u3001\u6570\u636e\u7c7b\u578b\u548c\u6570\u636e\u91cf\uff09\uff0c\u5e76\u9009\u62e9\u5408\u9002\u7684\u52a0\u8f7d\u5de5\u5177\u3002"}),"\n",(0,s.jsx)(e.li,{children:"\u914d\u7f6e\u548c\u542f\u7528\u52a0\u8f7d\u5de5\u5177\u3002"}),"\n",(0,s.jsxs)(e.li,{children:["\u521b\u5efa\u5916\u90e8\u8868\uff0c\u6307\u5b9a ",(0,s.jsx)(e.code,{children:"CREATE EXTERNAL TABLE"})," \u8bed\u53e5\u4e2d\u7684\u52a0\u8f7d\u5de5\u5177\u534f\u8bae\u3001\u6570\u636e\u6e90\u5730\u5740\u548c\u6570\u636e\u683c\u5f0f\u3002"]}),"\n",(0,s.jsxs)(e.li,{children:["\u521b\u5efa\u5916\u90e8\u8868\u540e\uff0c\u53ef\u4ee5\u76f4\u63a5\u4f7f\u7528 ",(0,s.jsx)(e.code,{children:"SELECT"})," \u8bed\u53e5\u67e5\u8be2\u5916\u90e8\u8868\u4e2d\u7684\u6570\u636e\uff0c\u6216\u8005\u4f7f\u7528 ",(0,s.jsx)(e.code,{children:"INSERT INTO SELECT"})," \u8bed\u53e5\u4ece\u5916\u90e8\u8868\u4e2d\u5bfc\u5165\u6570\u636e\u3002"]}),"\n"]}),"\n",(0,s.jsx)(e.h2,{id:"\u52a0\u8f7d\u65b9\u6cd5\u548c\u573a\u666f",children:"\u52a0\u8f7d\u65b9\u6cd5\u548c\u573a\u666f"}),"\n",(0,s.jsx)(e.p,{children:"Apache Cloudberry \u63d0\u4f9b\u4e86\u591a\u79cd\u6570\u636e\u52a0\u8f7d\u89e3\u51b3\u65b9\u6848\uff0c\u4f60\u53ef\u4ee5\u6839\u636e\u4e0d\u540c\u7684\u6570\u636e\u6e90\u9009\u62e9\u4e0d\u540c\u7684\u6570\u636e\u52a0\u8f7d\u65b9\u6cd5\u3002"}),"\n",(0,s.jsxs)(e.table,{children:[(0,s.jsx)(e.thead,{children:(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.th,{children:"\u52a0\u8f7d\u65b9\u6cd5"}),(0,s.jsx)(e.th,{children:"\u6570\u636e\u6e90"}),(0,s.jsx)(e.th,{children:"\u6570\u636e\u683c\u5f0f"}),(0,s.jsx)(e.th,{children:"\u662f\u5426\u5e76\u884c"})]})}),(0,s.jsxs)(e.tbody,{children:[(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:(0,s.jsx)(e.a,{href:"/zh/docs/data-loading/load-data-using-copy",children:(0,s.jsx)(e.code,{children:"copy"})})}),(0,s.jsxs)(e.td,{children:["\u672c\u5730\u6587\u4ef6\u7cfb\u7edf",(0,s.jsx)("br",{}),(0,s.jsx)("br",{}),"\u2022 Coordinator \u8282\u70b9\u4e3b\u673a\uff08\u5bf9\u4e8e\u5355\u6587\u4ef6\uff09",(0,s.jsx)("br",{}),"\u2022 Segment \u8282\u70b9\u4e3b\u673a\uff08\u5bf9\u4e8e\u591a\u6587\u4ef6\uff09"]}),(0,s.jsxs)(e.td,{children:["\u2022 TXT",(0,s.jsx)("br",{}),"\u2022 CSV",(0,s.jsx)("br",{}),"\u2022 \u4e8c\u8fdb\u5236"]}),(0,s.jsx)(e.td,{children:"\u5426"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:(0,s.jsxs)(e.a,{href:"/zh/docs/data-loading/load-data-using-file-protocol",children:[(0,s.jsx)(e.code,{children:"file://"})," \u534f\u8bae"]})}),(0,s.jsx)(e.td,{children:"\u672c\u5730\u6587\u4ef6\u7cfb\u7edf\uff08\u672c\u5730 Segment \u4e3b\u673a\uff0c\u4ec5\u8d85\u7ea7\u7528\u6237\u53ef\u8bbf\u95ee\uff09"}),(0,s.jsxs)(e.td,{children:["\u2022 TXT",(0,s.jsx)("br",{}),"\u2022 CSV"]}),(0,s.jsx)(e.td,{children:"\u662f"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:(0,s.jsx)(e.a,{href:"/zh/docs/data-loading/load-data-using-gpfdist",children:(0,s.jsx)(e.code,{children:"gpfdist"})})}),(0,s.jsx)(e.td,{children:"\u672c\u5730\u4e3b\u673a\u6587\u4ef6\u6216\u8005\u901a\u8fc7\u5185\u7f51\u53ef\u8bbf\u95ee\u7684\u6587\u4ef6"}),(0,s.jsxs)(e.td,{children:["\u2022 TXT",(0,s.jsx)("br",{}),"\u2022 CSV",(0,s.jsx)("br",{}),"\u2022 ",(0,s.jsx)(e.code,{children:"FORMAT"})," \u5b50\u53e5\u652f\u6301\u7684\u4efb\u610f\u5206\u9694\u6587\u672c\u683c\u5f0f",(0,s.jsx)("br",{}),"\u2022 XML \u548c JSON\uff08\u9700\u8981\u901a\u8fc7 YAML \u914d\u7f6e\u6587\u4ef6\u8f6c\u6362\u4e3a\u6587\u672c\u683c\u5f0f\uff09"]}),(0,s.jsx)(e.td,{children:"\u662f"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsxs)(e.td,{children:[(0,s.jsxs)(e.a,{href:"/zh/docs/data-loading/load-data-using-gpload",children:["\u4f7f\u7528 ",(0,s.jsx)(e.code,{children:"gpload"})," \u6279\u91cf\u52a0\u8f7d"]}),"\uff08\u4f7f\u7528 ",(0,s.jsx)(e.code,{children:"gpfdists"})," \u4e3a\u5e95\u5c42\u5de5\u4f5c\u7ec4\u4ef6\uff09"]}),(0,s.jsx)(e.td,{children:"\u672c\u5730\u4e3b\u673a\u6587\u4ef6\u6216\u8005\u53ef\u901a\u8fc7\u5185\u7f51\u8bbf\u95ee\u7684\u6587\u4ef6"}),(0,s.jsxs)(e.td,{children:["\u2022 TXT",(0,s.jsx)("br",{}),"\u2022 CSV",(0,s.jsx)("br",{}),"\u2022 ",(0,s.jsx)(e.code,{children:"FORMAT"})," \u5b50\u53e5\u652f\u6301\u7684\u4efb\u610f\u5206\u9694\u6587\u672c\u683c\u5f0f",(0,s.jsx)("br",{}),"\u2022 XML \u548c JSON\uff08\u9700\u8981\u901a\u8fc7 YAML \u914d\u7f6e\u6587\u4ef6\u8f6c\u6362\u4e3a\u6587\u672c\u683c\u5f0f\uff09"]}),(0,s.jsx)(e.td,{children:"\u662f"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:(0,s.jsx)(e.a,{href:"/zh/docs/data-loading/load-data-from-web-services",children:"\u521b\u5efa\u5916\u90e8 Web \u8868"})}),(0,s.jsx)(e.td,{children:"\u4ece\u7f51\u7edc\u670d\u52a1\u6216\u53ef\u901a\u8fc7\u547d\u4ee4\u884c\u8bbf\u95ee\u7684\u4efb\u610f\u6765\u6e90\u63d0\u53d6\u7684\u6570\u636e"}),(0,s.jsxs)(e.td,{children:["\u2022 TXT",(0,s.jsx)("br",{}),"\u2022 CSV"]}),(0,s.jsx)(e.td,{children:"\u662f"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:(0,s.jsx)(e.a,{href:"/zh/docs/data-loading/load-data-from-kafka-using-fdw",children:"Kafka FDW"})}),(0,s.jsx)(e.td,{children:"\u4ece Apache Kafka \u6d41\u5f0f\u52a0\u8f7d\u6570\u636e"}),(0,s.jsxs)(e.td,{children:["\u2022 JSON",(0,s.jsx)("br",{}),"\u2022 CSV"]}),(0,s.jsx)(e.td,{children:"\u5426"})]})]})]})]})}function h(d={}){const{wrapper:e}={...(0,t.a)(),...d.components};return e?(0,s.jsx)(e,{...d,children:(0,s.jsx)(o,{...d})}):o(d)}},11151:(d,e,n)=>{n.d(e,{Z:()=>c,a:()=>i});var s=n(67294);const t={},r=s.createContext(t);function i(d){const e=s.useContext(r);return s.useMemo((function(){return"function"==typeof d?d(e):{...e,...d}}),[e,d])}function c(d){let e;return e=d.disableParentContext?"function"==typeof d.components?d.components(t):d.components||t:i(d.components),s.createElement(r.Provider,{value:e},d.children)}}}]);