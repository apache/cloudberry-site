"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[1794],{86059:(e,a,n)=>{n.r(a),n.d(a,{assets:()=>s,contentTitle:()=>d,default:()=>p,frontMatter:()=>l,metadata:()=>i,toc:()=>r});var t=n(85893),o=n(11151);const l={title:"Load Data Using gpload"},d="Load Data into Apache Cloudberry Using gpload",i={id:"data-loading/load-data-using-gpload",title:"Load Data Using gpload",description:"The gpload utility of Apache Cloudberry loads data using readable external tables and the Apache Cloudberry parallel file server (gpfdist). It handles parallel file-based external table setup and allows users to configure their data format, external table definition, and gpfdist setup in a single configuration file.",source:"@site/docs/data-loading/load-data-using-gpload.md",sourceDirName:"data-loading",slug:"/data-loading/load-data-using-gpload",permalink:"/docs/data-loading/load-data-using-gpload",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/data-loading/load-data-using-gpload.md",tags:[],version:"current",lastUpdatedBy:"Dianjin Wang",lastUpdatedAt:1743488661,formattedLastUpdatedAt:"Apr 1, 2025",frontMatter:{title:"Load Data Using gpload"},sidebar:"docsbars",previous:{title:"Load Data Using the File Protocol",permalink:"/docs/data-loading/load-data-using-file-protocol"},next:{title:"Load Data from Web Services",permalink:"/docs/data-loading/load-data-from-web-services"}},s={},r=[{value:"To use gpload",id:"to-use-gpload",level:2}];function c(e){const a={admonition:"admonition",code:"code",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",...(0,o.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(a.h1,{id:"load-data-into-apache-cloudberry-using-gpload",children:["Load Data into Apache Cloudberry Using ",(0,t.jsx)(a.code,{children:"gpload"})]}),"\n",(0,t.jsxs)(a.p,{children:["The ",(0,t.jsx)(a.code,{children:"gpload"})," utility of Apache Cloudberry loads data using readable external tables and the Apache Cloudberry parallel file server (gpfdist). It handles parallel file-based external table setup and allows users to configure their data format, external table definition, and gpfdist setup in a single configuration file."]}),"\n",(0,t.jsx)(a.admonition,{type:"tip",children:(0,t.jsxs)(a.p,{children:["In ",(0,t.jsx)(a.code,{children:"gpload"}),", ",(0,t.jsx)(a.code,{children:"MERGE"})," and ",(0,t.jsx)(a.code,{children:"UPDATE"})," operations are not supported if the target table column name is a reserved keyword, has capital letters, or includes any character that requires quotes ",(0,t.jsx)(a.code,{children:'" "'})," to identify the column."]})}),"\n",(0,t.jsx)(a.h2,{id:"to-use-gpload",children:"To use gpload"}),"\n",(0,t.jsxs)(a.ol,{children:["\n",(0,t.jsxs)(a.li,{children:["\n",(0,t.jsxs)(a.p,{children:["Ensure that your environment is set up to run ",(0,t.jsx)(a.code,{children:"gpload"}),". Some dependent files from your Apache Cloudberry installation are required, such as gpfdist and Python 3, as well as network access to the Apache Cloudberry segment hosts. ",(0,t.jsx)(a.code,{children:"gpload"})," also requires that you install the following packages:"]}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-shell",children:"pip install psycopg2 pyyaml\n"})}),"\n"]}),"\n",(0,t.jsxs)(a.li,{children:["\n",(0,t.jsx)(a.p,{children:"Create your load control file. This is a YAML-formatted file that specifies the Apache Cloudberry connection information, gpfdist configuration information, external table options, and data format."}),"\n",(0,t.jsx)(a.p,{children:"For example:"}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-yaml",children:"---\nVERSION: 1.0.0.1\nDATABASE: ops\nUSER: gpadmin\nHOST: cdw-1\nPORT: 5432\nGPLOAD:\n   INPUT:\n    - SOURCE:\n         LOCAL_HOSTNAME:\n           - etl1-1\n           - etl1-2\n           - etl1-3\n           - etl1-4\n         PORT: 8081\n         FILE: \n           - /var/load/data/*\n    - COLUMNS:\n           - name: text\n           - amount: float4\n           - category: text\n           - descr: text\n           - date: date\n    - FORMAT: text\n    - DELIMITER: '|'\n    - ERROR_LIMIT: 25\n    - LOG_ERRORS: true\n   OUTPUT:\n    - TABLE: payables.expenses\n    - MODE: INSERT\n   PRELOAD:\n    - REUSE_TABLES: true \n# SQL:\n#   - BEFORE: \"INSERT INTO audit VALUES('start', current_timestamp)\"\n#   - AFTER: \"INSERT INTO audit VALUES('end', current_timestamp)\"\n"})}),"\n"]}),"\n",(0,t.jsxs)(a.li,{children:["\n",(0,t.jsxs)(a.p,{children:["Run ",(0,t.jsx)(a.code,{children:"gpload"}),", passing in the load control file. For example:"]}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-sql",children:"gpload -f my_load.yml\n"})}),"\n"]}),"\n"]})]})}function p(e={}){const{wrapper:a}={...(0,o.a)(),...e.components};return a?(0,t.jsx)(a,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},11151:(e,a,n)=>{n.d(a,{Z:()=>i,a:()=>d});var t=n(67294);const o={},l=t.createContext(o);function d(e){const a=t.useContext(l);return t.useMemo((function(){return"function"==typeof e?e(a):{...a,...e}}),[a,e])}function i(e){let a;return a=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:d(e.components),t.createElement(l.Provider,{value:a},e.children)}}}]);