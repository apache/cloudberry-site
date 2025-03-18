"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[7255],{10989:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>l,contentTitle:()=>o,default:()=>u,frontMatter:()=>c,metadata:()=>s,toc:()=>d});var t=r(85893),i=r(11151),a=r(52991);const c={title:"Query Performance Overview"},o="Query Performance in Apache Cloudberry",s={id:"performance/index",title:"Query Performance Overview",description:"Apache Cloudberry dynamically eliminates irrelevant partitions in a table and optimally allocates memory for different operators in a query.These enhancements scan less data for a query, accelerate query processing, and support more concurrency.",source:"@site/docs/performance/index.md",sourceDirName:"performance",slug:"/performance/",permalink:"/zh/docs/performance/",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/performance/index.md",tags:[],version:"current",lastUpdatedBy:"Dianjin Wang",lastUpdatedAt:1742268909,formattedLastUpdatedAt:"2025\u5e743\u670818\u65e5",frontMatter:{title:"Query Performance Overview"},sidebar:"docsbars",previous:{title:"Use pgvector for Vector Similarity Search",permalink:"/zh/docs/advanced-analytics/pgvector-search"},next:{title:"\u66f4\u65b0\u7edf\u8ba1\u4fe1\u606f",permalink:"/zh/docs/performance/update-stats-using-analyze"}},l={},d=[];function p(e){const n={admonition:"admonition",code:"code",h1:"h1",li:"li",p:"p",ul:"ul",...(0,i.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"query-performance-in-apache-cloudberry",children:"Query Performance in Apache Cloudberry"}),"\n",(0,t.jsx)(n.p,{children:"Apache Cloudberry dynamically eliminates irrelevant partitions in a table and optimally allocates memory for different operators in a query.These enhancements scan less data for a query, accelerate query processing, and support more concurrency."}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Dynamic partition elimination"}),"\n",(0,t.jsxs)(n.p,{children:["In Apache Cloudberry, values available only when a query runs are used to dynamically prune partitions, which improves query processing speed. Enable or deactivate dynamic partition elimination by setting the server configuration parameter ",(0,t.jsx)(n.code,{children:"gp_dynamic_partition_pruning"})," to ",(0,t.jsx)(n.code,{children:"ON"})," or ",(0,t.jsx)(n.code,{children:"OFF"}),"; it is ",(0,t.jsx)(n.code,{children:"ON"})," by default."]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Memory optimizations"}),"\n",(0,t.jsx)(n.p,{children:"Apache Cloudberry allocates memory optimally for different operators in a query and frees and re-allocates memory during the stages of processing a query."}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.admonition,{type:"info",children:(0,t.jsx)(n.p,{children:"Apache Cloudberry uses GPORCA by default. GPORCA extends the planning and optimization capabilities of the Postgres optimizer."})}),"\n","\n","\n",(0,t.jsx)(a.Z,{})]})}function u(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(p,{...e})}):p(e)}},52991:(e,n,r)=>{r.d(n,{Z:()=>x});r(67294);var t=r(90512),i=r(53438),a=r(33692),c=r(13919),o=r(95999),s=r(92503);const l={cardContainer:"cardContainer_fWXF",cardTitle:"cardTitle_rnsV",cardDescription:"cardDescription_PWke"};var d=r(85893);function p(e){let{href:n,children:r}=e;return(0,d.jsx)(a.Z,{href:n,className:(0,t.Z)("card padding--lg",l.cardContainer),children:r})}function u(e){let{href:n,icon:r,title:i,description:a}=e;return(0,d.jsxs)(p,{href:n,children:[(0,d.jsxs)(s.Z,{as:"h2",className:(0,t.Z)("text--truncate",l.cardTitle),title:i,children:[r," ",i]}),a&&(0,d.jsx)("p",{className:(0,t.Z)("text--truncate",l.cardDescription),title:a,children:a})]})}function m(e){let{item:n}=e;const r=(0,i.LM)(n);return r?(0,d.jsx)(u,{href:r,icon:"\ud83d\uddc3\ufe0f",title:n.label,description:n.description??(0,o.I)({message:"{count} items",id:"theme.docs.DocCard.categoryDescription",description:"The default description for a category card in the generated index about how many items this category includes"},{count:n.items.length})}):null}function h(e){let{item:n}=e;const r=(0,c.Z)(n.href)?"\ud83d\udcc4\ufe0f":"\ud83d\udd17",t=(0,i.xz)(n.docId??void 0);return(0,d.jsx)(u,{href:n.href,icon:r,title:n.label,description:n.description??t?.description})}function f(e){let{item:n}=e;switch(n.type){case"link":return(0,d.jsx)(h,{item:n});case"category":return(0,d.jsx)(m,{item:n});default:throw new Error(`unknown item type ${JSON.stringify(n)}`)}}function y(e){let{className:n}=e;const r=(0,i.jA)();return(0,d.jsx)(x,{items:r.items,className:n})}function x(e){const{items:n,className:r}=e;if(!n)return(0,d.jsx)(y,{...e});const a=(0,i.MN)(n);return(0,d.jsx)("section",{className:(0,t.Z)("row",r),children:a.map(((e,n)=>(0,d.jsx)("article",{className:"col col--6 margin-bottom--lg",children:(0,d.jsx)(f,{item:e})},n)))})}},11151:(e,n,r)=>{r.d(n,{Z:()=>o,a:()=>c});var t=r(67294);const i={},a=t.createContext(i);function c(e){const n=t.useContext(a);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:c(e.components),t.createElement(a.Provider,{value:n},e.children)}}}]);