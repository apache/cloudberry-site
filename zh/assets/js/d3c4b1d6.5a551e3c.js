"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[1492],{52880:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>h,contentTitle:()=>d,default:()=>a,frontMatter:()=>t,metadata:()=>c,toc:()=>l});var i=s(85893),r=s(11151);const t={title:"gpshrink"},d="gpshrink",c={id:"sys-utilities/gpshrink",title:"gpshrink",description:"Apache Cloudberry \u901a\u8fc7 gpshrink \u7cfb\u7edf\u5de5\u5177\u7f29\u5bb9\u96c6\u7fa4\u3002\u96c6\u7fa4\u8d44\u6e90\u7a7a\u95f2\u65f6\uff0c\u4f8b\u5982\u78c1\u76d8\u7a7a\u95f4\u5360\u7528\u957f\u671f\u4f4e\u4e8e 20%\u3001CPU \u6216\u5185\u5b58\u5360\u7528\u7387\u6301\u7eed\u8f83\u4f4e\uff0c\u5219\u53ef\u4ee5\u4f7f\u7528 gpshrink \u6765\u5b9e\u73b0\u96c6\u7fa4\u7684\u7f29\u5bb9\uff0c\u4ece\u800c\u8282\u7701\u670d\u52a1\u5668\u8d44\u6e90\u3002\u7528\u6237\u53ef\u4ee5\u901a\u8fc7 gpshrink \u5de5\u5177\u5220\u9664\u591a\u4f59\u670d\u52a1\u5668\u4e0a\u7684 segment\uff0c\u4ece\u800c\u5b9e\u73b0\u96c6\u7fa4\u7f29\u5bb9\u3002",source:"@site/i18n/zh/docusaurus-plugin-content-docs/current/sys-utilities/gpshrink.md",sourceDirName:"sys-utilities",slug:"/sys-utilities/gpshrink",permalink:"/zh/docs/sys-utilities/gpshrink",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/i18n/zh/docusaurus-plugin-content-docs/current/sys-utilities/gpshrink.md",tags:[],version:"current",lastUpdatedBy:"Dianjin Wang",lastUpdatedAt:1743488661,formattedLastUpdatedAt:"2025\u5e744\u67081\u65e5",frontMatter:{title:"gpshrink"},sidebar:"docsbars",previous:{title:"gprecoverseg",permalink:"/zh/docs/sys-utilities/gprecoverseg"},next:{title:"gpssh-exkeys",permalink:"/zh/docs/sys-utilities/gpssh-exkeys"}},h={},l=[{value:"\u4f7f\u7528 gpshrink \u7f29\u5bb9\u96c6\u7fa4",id:"\u4f7f\u7528-gpshrink-\u7f29\u5bb9\u96c6\u7fa4",level:2}];function o(e){const n={admonition:"admonition",code:"code",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"gpshrink",children:"gpshrink"}),"\n",(0,i.jsx)(n.p,{children:"Apache Cloudberry \u901a\u8fc7 gpshrink \u7cfb\u7edf\u5de5\u5177\u7f29\u5bb9\u96c6\u7fa4\u3002\u96c6\u7fa4\u8d44\u6e90\u7a7a\u95f2\u65f6\uff0c\u4f8b\u5982\u78c1\u76d8\u7a7a\u95f4\u5360\u7528\u957f\u671f\u4f4e\u4e8e 20%\u3001CPU \u6216\u5185\u5b58\u5360\u7528\u7387\u6301\u7eed\u8f83\u4f4e\uff0c\u5219\u53ef\u4ee5\u4f7f\u7528 gpshrink \u6765\u5b9e\u73b0\u96c6\u7fa4\u7684\u7f29\u5bb9\uff0c\u4ece\u800c\u8282\u7701\u670d\u52a1\u5668\u8d44\u6e90\u3002\u7528\u6237\u53ef\u4ee5\u901a\u8fc7 gpshrink \u5de5\u5177\u5220\u9664\u591a\u4f59\u670d\u52a1\u5668\u4e0a\u7684 segment\uff0c\u4ece\u800c\u5b9e\u73b0\u96c6\u7fa4\u7f29\u5bb9\u3002"}),"\n",(0,i.jsx)(n.p,{children:"gpshrink \u5728\u6267\u884c\u65f6\u5206\u4e3a\u4e24\u9636\u6bb5\uff1a"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u5728\u51c6\u5907\u9636\u6bb5\uff0c\u4f1a\u6536\u96c6\u6570\u636e\u5e93\u4e2d\u6240\u6709\u9700\u8981\u91cd\u5206\u5e03\u7684\u7528\u6237\u8868\u4fe1\u606f\u3002"}),"\n",(0,i.jsx)(n.li,{children:"\u5728\u6570\u636e\u91cd\u5206\u5e03\u9636\u6bb5\uff0c\u4f1a\u5c06\u6570\u636e\u5e93\u96c6\u7fa4\u4e2d\u7684\u6240\u6709\u8868\u8fdb\u884c\u6570\u636e\u91cd\u5206\u5e03\uff0c\u5373\u5c06\u73b0\u6709\u7684\u6570\u636e\u5e93\u96c6\u7fa4\u4e2d\u7684\u6570\u636e\u91cd\u65b0\u5206\u5e03\u5230\u6269\u5bb9\u6216\u7f29\u5bb9\u540e\u7684\u6570\u636e\u5e93\u4e2d\u3002"}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"\u4f7f\u7528-gpshrink-\u7f29\u5bb9\u96c6\u7fa4",children:"\u4f7f\u7528 gpshrink \u7f29\u5bb9\u96c6\u7fa4"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"\u521b\u5efa\u4e00\u4e2a\u4e09\u8282\u70b9\u7684\u96c6\u7fa4\u3002"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"make create-demo-cluster\n"})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"\u521b\u5efa\u6d4b\u8bd5\u8868 test \u5e76\u67e5\u770b\u7f29\u5bb9\u524d\u7684\u72b6\u6001\u3002"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sql",children:"-- \u5efa\u8868\u5e76\u63d2\u5165\u6570\u636e\nCREATE TABLE test(a INT); \nINSERT INTO test SELECT i FROM generate_series(1,100) i;\n-- \u67e5\u770b test \u8868\u7684\u6570\u636e\u5206\u5e03\nSELECT gp_segment_id, COUNT(*) FROM test GROUP BY gp_segment_id;\n-- \u67e5\u770b\u5143\u6570\u636e\u72b6\u6001\nSELECT * FROM gp_distribution_policy;\nSELECT * FROM gp_segment_configuration;\n"})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"\u521b\u5efa shrinktest \u6587\u4ef6\uff0c\u5728\u5176\u4e2d\u5199\u5165\u5f85\u5220\u9664\u7684 segment \u7684\u4fe1\u606f\u3002"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"touch shrinktest\n"})}),"\n",(0,i.jsx)(n.p,{children:"segment \u4fe1\u606f\u7684\u683c\u5f0f\u4e3ahostname|address|port|datadir|dbid|content|role\uff0c\u6bcf\u4e2a segment \u7684\u4fe1\u606f\u9700\u5305\u62ec primary \u548c mirror \u7684\u4fe1\u606f\uff0c\u5982\u4e0b\u6240\u793a\u3002\u82e5\u8981\u5220\u9664\u591a\u4e2a segment\uff0c\u5219\u9700\u5c06 content \u8f83\u5927\u7684 segment \u5199\u5728\u524d\u9762\uff0c\u786e\u4fdd perferred role \u4e0e role \u662f\u4e00\u81f4\u7684\uff0c\u5148\u5199 primary \u518d\u5199 mirror\u3002"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"# \u4ee5\u5220\u9664\u4e00\u4e2a segment \u4e3a\u4f8b\uff0c\u4ee5\u4e0b\u4e3a\u5199\u5165\u7684 primary \u548c mirror \u7684\u4fe1\u606f\ni-thd001y0|i-thd001y0|7004|/home/gpadmin/cloudberry/gpAux/gpdemo/datadirs/dbfast3/demoDataDir2|4|2|p\ni-thd001y0|i-thd001y0|7007|/home/gpadmin/cloudberry/gpAux/gpdemo/datadirs/dbfast_mirror3/demoDataDir2|7|2|m\n"})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["\u6267\u884c ",(0,i.jsx)(n.code,{children:"gpshrink"})," \u547d\u4ee4\u4e24\u6b21\u3002"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"# \u51c6\u5907\u9636\u6bb5\ngpshrink -i shrinktest\n# \u91cd\u5206\u5e03\u9636\u6bb5\ngpshrink -i shrinktest\n"})}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{children:"\u4e3b\u8981\u53c2\u6570"}),(0,i.jsx)(n.th,{children:"\u63cf\u8ff0"})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"-i"})}),(0,i.jsx)(n.td,{children:"\u6307\u5b9a\u8981\u5220\u9664\u7684 segment \u6587\u4ef6\u3002"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"-c"})}),(0,i.jsx)(n.td,{children:"\u6e05\u7406\u5df2\u6536\u96c6\u7684\u8868\u4fe1\u606f\u3002"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"-a"})}),(0,i.jsx)(n.td,{children:"\u6536\u96c6\u91cd\u5206\u5e03\u540e\u8868\u7684\u7edf\u8ba1\u4fe1\u606f\u3002"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"-d"})}),(0,i.jsx)(n.td,{children:"\u8bbe\u7f6e\u6700\u957f\u6267\u884c\u6301\u7eed\u65f6\u95f4\uff0c\u8d85\u65f6\u5c06\u7ec8\u6b62\uff0c\u7528\u4e8e\u91cd\u5206\u5e03\u9636\u6bb5\u3002"})]})]})]}),"\n",(0,i.jsxs)(n.admonition,{type:"tip",children:[(0,i.jsx)(n.p,{children:"gpshrink \u4e3b\u8981\u5206\u4e24\u9636\u6bb5\u5b9e\u73b0\uff1a"}),(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\u7b2c\u4e00\u6761 ",(0,i.jsx)(n.code,{children:"gpshrink -i shrinktest"})," \u547d\u4ee4\u5b9e\u9645\u4e0a\u5b8c\u6210\u4e86\u7f29\u5bb9\u7684\u51c6\u5907\u5de5\u4f5c\uff1a\u57fa\u4e8e\u8f93\u5165\u6587\u4ef6 ",(0,i.jsx)(n.code,{children:"shrinktest"})," \u8bfb\u53d6\u88ab\u5220\u9664\u7684 segment\uff0c\u521b\u5efa\u5bf9\u5e94\u7684\u8868 ",(0,i.jsx)(n.code,{children:"gpshrink.status"}),"\uff08\u7528\u4e8e\u8bb0\u5f55 gpshrink \u7684\u72b6\u6001\u548c ",(0,i.jsx)(n.code,{children:"gpshrink.status_detail"}),"\uff08\u7528\u4e8e\u8bb0\u5f55\u6bcf\u4e2a\u8868\u7684\u72b6\u6001\uff09\uff0c\u5e76\u83b7\u53d6\u6240\u6709\u9700\u8981\u6267\u884c\u91cd\u5206\u5e03\u7684\u8868\u3002"]}),"\n",(0,i.jsxs)(n.li,{children:["\u7b2c\u4e8c\u6761 ",(0,i.jsx)(n.code,{children:"gpshrink -i shrinktest"})," \u547d\u4ee4\u5219\u5b8c\u6210\u4e86\u7f29\u5bb9\u7684\u6570\u636e\u91cd\u5206\u5e03\u5de5\u4f5c\uff1a\u8ba1\u7b97\u5220\u9664 segment \u540e\u7684 sgement size\uff0c\u5bf9\u6bcf\u4e2a\u8868\u6267\u884c ",(0,i.jsx)(n.code,{children:"gpshrink"}),"\uff0c\u5b9e\u73b0\u6570\u636e\u91cd\u5206\u5e03\uff0c\u6700\u540e\u5728 ",(0,i.jsx)(n.code,{children:"gp_segment_configuration"})," \u4e2d\u5220\u9664\u76f8\u5e94\u7684 segment\u3002\u5728\u91cd\u5206\u5e03\u9636\u6bb5\uff0c\u4e0d\u5efa\u8bae\u7528\u6237\u6267\u884c\u521b\u5efa\u8868\u7684\u64cd\u4f5c\uff0c\u56e0\u4e3a\u65b0\u5efa\u7684\u8868\u5c06\u65e0\u6cd5\u91cd\u5206\u5e03\u5728\u7f29\u5bb9\u540e\u7684\u96c6\u7fa4\u4e2d\u3002\u4e5f\u53ef\u80fd\u4f1a\u51fa\u73b0\u4e00\u4e9b\u8bed\u53e5\u6267\u884c\u5931\u8d25\u7684\u73b0\u8c61\uff0c\u56e0\u4e3a\u6709\u4e9b\u8868\u5904\u4e8e\u88ab\u9501\u5b9a\u72b6\u6001\u3002"]}),"\n"]})]}),"\n",(0,i.jsx)(n.admonition,{type:"tip",children:(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\u82e5\u7b2c\u4e00\u6761 ",(0,i.jsx)(n.code,{children:"gpshrink -i shrinktest"})," \u6267\u884c\u5931\u8d25\uff0c\u53ef\u80fd\u7684\u539f\u56e0\u662f ",(0,i.jsx)(n.code,{children:"shrinktest"})," \u6587\u4ef6\u9519\u8bef\u5bfc\u81f4\u6267\u884c\u4e2d\u65ad\uff0c\u6b64\u65f6\u53ea\u9700\u901a\u8fc7 ",(0,i.jsx)(n.code,{children:"gpshrink -c"})," \u6e05\u9664\u5176\u4e2d\u6536\u96c6\u7684\u6570\u636e\uff0c\u518d\u91cd\u65b0\u6267\u884c ",(0,i.jsx)(n.code,{children:"gpshrink -i shrinktest"}),"\u3002"]}),"\n",(0,i.jsxs)(n.li,{children:["\u82e5\u7b2c\u4e8c\u6761 ",(0,i.jsx)(n.code,{children:"gpshrink -i shrinktest"})," \u53d1\u751f\u9519\u8bef\uff0c\u7528\u6237\u9700\u8981\u767b\u9646\u6570\u636e\u5e93\uff0c\u68c0\u67e5\u6570\u636e\u5e93\u4e2d\u8868\u7684\u72b6\u6001\uff0c\u5e76\u8fdb\u884c\u8fdb\u4e00\u6b65\u7684\u6570\u636e\u91cd\u5206\u5e03\u6216\u8005\u56de\u6eda\u3002"]}),"\n"]})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"\u7f29\u5bb9\u540e\u518d\u6b21\u67e5\u770b test \u8868\u7684\u72b6\u6001\u3002"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sql",children:"-- \u67e5\u770b test \u8868\u7684\u6570\u636e\u5206\u5e03\nSELECT gp_segment_id, COUNT(*) FROM test GROUP BY gp_segment_id;\n-- \u67e5\u770b\u5143\u6570\u636e\u72b6\u6001\nSELECT * FROM gp_distribution_policy;\nSELECT * FROM gp_segment_configuration;\n"})}),"\n"]}),"\n"]})]})}function a(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(o,{...e})}):o(e)}},11151:(e,n,s)=>{s.d(n,{Z:()=>c,a:()=>d});var i=s(67294);const r={},t=i.createContext(r);function d(e){const n=i.useContext(t);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:d(e.components),i.createElement(t.Provider,{value:n},e.children)}}}]);