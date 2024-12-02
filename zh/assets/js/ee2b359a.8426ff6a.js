"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[7653],{54609:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>o,contentTitle:()=>i,default:()=>h,frontMatter:()=>s,metadata:()=>d,toc:()=>c});var a=t(85893),r=t(11151);const s={title:"Advanced Aggregate Functions"},i="Advanced Aggregate Functions in Cloudberry Database",d={id:"functions/advanced-aggregate-functions",title:"Advanced Aggregate Functions",description:"The following built-in advanced analytic functions are Cloudberry extensions of the PostgreSQL database. Analytic functions are immutable.",source:"@site/docs/functions/advanced-aggregate-functions.md",sourceDirName:"functions",slug:"/functions/advanced-aggregate-functions",permalink:"/zh/docs/functions/advanced-aggregate-functions",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/functions/advanced-aggregate-functions.md",tags:[],version:"current",lastUpdatedBy:"Dianjin Wang",lastUpdatedAt:1733128076,formattedLastUpdatedAt:"2024\u5e7412\u67082\u65e5",frontMatter:{title:"Advanced Aggregate Functions"},sidebar:"docsbars",previous:{title:"Window Functions",permalink:"/zh/docs/functions/window-functions"},next:{title:"Text Search Functions and Operators",permalink:"/zh/docs/functions/text-search-functions-and-operators"}},o={},c=[];function l(e){const n={a:"a",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",section:"section",strong:"strong",sup:"sup",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,r.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.h1,{id:"advanced-aggregate-functions-in-cloudberry-database",children:"Advanced Aggregate Functions in Cloudberry Database"}),"\n",(0,a.jsxs)(n.p,{children:["The following built-in advanced analytic functions are Cloudberry extensions of the PostgreSQL database. Analytic functions are ",(0,a.jsx)(n.em,{children:"immutable"}),"."]}),"\n",(0,a.jsxs)(n.blockquote,{children:["\n",(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.strong,{children:"Note"})," The Cloudberry MADlib Extension for Analytics provides additional advanced functions to perform statistical analysis and machine learning with Cloudberry Database data."]}),"\n"]}),"\n",(0,a.jsxs)(n.table,{children:[(0,a.jsx)(n.thead,{children:(0,a.jsxs)(n.tr,{children:[(0,a.jsx)(n.th,{children:"Function"}),(0,a.jsx)(n.th,{children:"Return Type"}),(0,a.jsx)(n.th,{children:"Full Syntax"}),(0,a.jsx)(n.th,{children:"Description"})]})}),(0,a.jsxs)(n.tbody,{children:[(0,a.jsxs)(n.tr,{children:[(0,a.jsx)(n.td,{children:(0,a.jsx)(n.code,{children:"MEDIAN (expr)"})}),(0,a.jsx)(n.td,{children:(0,a.jsx)(n.code,{children:"timestamp, timestamptz, interval, float"})}),(0,a.jsxs)(n.td,{children:[(0,a.jsx)(n.code,{children:"MEDIAN (expression)"})," ",(0,a.jsx)(n.sup,{children:(0,a.jsx)(n.a,{href:"#user-content-fn-1",id:"user-content-fnref-1","data-footnote-ref":!0,"aria-describedby":"footnote-label",children:"1"})})]}),(0,a.jsx)(n.td,{children:"Can take a two-dimensional array as input. Treats such arrays as matrices."})]}),(0,a.jsxs)(n.tr,{children:[(0,a.jsx)(n.td,{children:(0,a.jsx)(n.code,{children:"PERCENTILE_CONT (expr) WITHIN GROUP (ORDER BY expr [DESC/ASC])"})}),(0,a.jsx)(n.td,{children:(0,a.jsx)(n.code,{children:"timestamp, timestamptz, interval, float"})}),(0,a.jsxs)(n.td,{children:[(0,a.jsx)(n.code,{children:"PERCENTILE_CONT(percentage) WITHIN GROUP (ORDER BY expression)"})," ",(0,a.jsx)(n.sup,{children:(0,a.jsx)(n.a,{href:"#user-content-fn-2",id:"user-content-fnref-2","data-footnote-ref":!0,"aria-describedby":"footnote-label",children:"2"})})]}),(0,a.jsx)(n.td,{children:"Performs an inverse distribution function that assumes a continuous distribution model. It takes a percentile value and a sort specification and returns the same datatype as the numeric datatype of the argument. This returned value is a computed result after performing linear interpolation. Null are ignored in this calculation."})]}),(0,a.jsxs)(n.tr,{children:[(0,a.jsx)(n.td,{children:(0,a.jsx)(n.code,{children:"PERCENTILE_DISC (expr) WITHIN GROUP (ORDER BY expr [DESC/ASC])"})}),(0,a.jsx)(n.td,{children:(0,a.jsx)(n.code,{children:"timestamp, timestamptz, interval, float"})}),(0,a.jsxs)(n.td,{children:[(0,a.jsx)(n.code,{children:"PERCENTILE_DISC(percentage) WITHIN GROUP (ORDER BY expression)"})," ",(0,a.jsx)(n.sup,{children:(0,a.jsx)(n.a,{href:"#user-content-fn-3",id:"user-content-fnref-3","data-footnote-ref":!0,"aria-describedby":"footnote-label",children:"3"})})]}),(0,a.jsx)(n.td,{children:"Performs an inverse distribution function that assumes a discrete distribution model. It takes a percentile value and a sort specification. This returned value is an element from the set. Null are ignored in this calculation."})]}),(0,a.jsxs)(n.tr,{children:[(0,a.jsx)(n.td,{children:(0,a.jsx)(n.code,{children:"sum(array[])"})}),(0,a.jsx)(n.td,{children:(0,a.jsx)(n.code,{children:"smallint[]int[], bigint[], float[]"})}),(0,a.jsxs)(n.td,{children:[(0,a.jsx)(n.code,{children:"sum(array[[1,2],[3,4]])"})," ",(0,a.jsx)(n.sup,{children:(0,a.jsx)(n.a,{href:"#user-content-fn-4",id:"user-content-fnref-4","data-footnote-ref":!0,"aria-describedby":"footnote-label",children:"4"})})]}),(0,a.jsx)(n.td,{children:"Performs matrix summation. Can take as input a two-dimensional array that is treated as a matrix."})]}),(0,a.jsxs)(n.tr,{children:[(0,a.jsx)(n.td,{children:(0,a.jsx)(n.code,{children:"pivot_sum (label[], label, expr)"})}),(0,a.jsx)(n.td,{children:(0,a.jsx)(n.code,{children:"int[], bigint[], float[]"})}),(0,a.jsx)(n.td,{children:(0,a.jsx)(n.code,{children:"pivot_sum( array['A1','A2'], attr, value)"})}),(0,a.jsx)(n.td,{children:"A pivot aggregation using sum to resolve duplicate entries."})]}),(0,a.jsxs)(n.tr,{children:[(0,a.jsx)(n.td,{children:(0,a.jsx)(n.code,{children:"unnest (array[])"})}),(0,a.jsxs)(n.td,{children:["set of ",(0,a.jsx)(n.code,{children:"anyelement"})]}),(0,a.jsx)(n.td,{children:(0,a.jsx)(n.code,{children:"unnest( array['one', 'row', 'per', 'item'])"})}),(0,a.jsxs)(n.td,{children:["Transforms a one-dimensional array into rows. Returns a set of ",(0,a.jsx)(n.code,{children:"anyelement"}),", a polymorphic ",(0,a.jsx)(n.a,{href:"https://www.postgresql.org/docs/12/datatype-pseudo.html",children:"pseudotype in PostgreSQL"}),"."]})]})]})]}),"\n",(0,a.jsxs)(n.section,{"data-footnotes":!0,className:"footnotes",children:[(0,a.jsx)(n.h2,{className:"sr-only",id:"footnote-label",children:"Footnotes"}),"\n",(0,a.jsxs)(n.ol,{children:["\n",(0,a.jsxs)(n.li,{id:"user-content-fn-1",children:["\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-sql",children:"SELECT department_id, MEDIAN(salary) \nFROM employees \nGROUP BY department_id;\n"})}),"\n",(0,a.jsx)(n.a,{href:"#user-content-fnref-1","data-footnote-backref":"","aria-label":"Back to reference 1",className:"data-footnote-backref",children:"\u21a9"}),"\n"]}),"\n",(0,a.jsxs)(n.li,{id:"user-content-fn-2",children:["\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-sql",children:'SELECT department_id,\nPERCENTILE_CONT (0.5) WITHIN GROUP (ORDER BY salary DESC)\n"Median_cont"; \nFROM employees GROUP BY department_id;\n'})}),"\n",(0,a.jsx)(n.a,{href:"#user-content-fnref-2","data-footnote-backref":"","aria-label":"Back to reference 2",className:"data-footnote-backref",children:"\u21a9"}),"\n"]}),"\n",(0,a.jsxs)(n.li,{id:"user-content-fn-3",children:["\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-sql",children:'SELECT department_id, \nPERCENTILE_DISC (0.5) WITHIN GROUP (ORDER BY salary DESC)\n"Median_desc"; \nFROM employees GROUP BY department_id;\n'})}),"\n",(0,a.jsx)(n.a,{href:"#user-content-fnref-3","data-footnote-backref":"","aria-label":"Back to reference 3",className:"data-footnote-backref",children:"\u21a9"}),"\n"]}),"\n",(0,a.jsxs)(n.li,{id:"user-content-fn-4",children:["\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-sql",children:"CREATE TABLE mymatrix (myvalue int[]);\nINSERT INTO mymatrix VALUES (array[[1,2],[3,4]]);\nINSERT INTO mymatrix VALUES (array[[0,1],[1,0]]);\nSELECT sum(myvalue) FROM mymatrix;\nsum \n---------------\n{{1,3},{4,4}}\n"})}),"\n",(0,a.jsx)(n.a,{href:"#user-content-fnref-4","data-footnote-backref":"","aria-label":"Back to reference 4",className:"data-footnote-backref",children:"\u21a9"}),"\n"]}),"\n"]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(l,{...e})}):l(e)}},11151:(e,n,t)=>{t.d(n,{Z:()=>d,a:()=>i});var a=t(67294);const r={},s=a.createContext(r);function i(e){const n=a.useContext(s);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),a.createElement(s.Provider,{value:n},e.children)}}}]);