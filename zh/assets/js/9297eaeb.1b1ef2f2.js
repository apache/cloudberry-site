"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[3125],{86724:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>a,default:()=>m,frontMatter:()=>c,metadata:()=>o,toc:()=>l});var i=n(85893),r=n(11151),s=n(52991);const c={title:"Security and Permission"},a=void 0,o={id:"security/index",title:"Security and Permission",description:"",source:"@site/docs/security/index.md",sourceDirName:"security",slug:"/security/",permalink:"/zh/docs/security/",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/security/index.md",tags:[],version:"current",lastUpdatedBy:"Dianjin Wang",lastUpdatedAt:1744271659,formattedLastUpdatedAt:"2025\u5e744\u670810\u65e5",frontMatter:{title:"Security and Permission"},sidebar:"docsbars",previous:{title:"\u4f7f\u7528\u52a8\u6001\u8868",permalink:"/zh/docs/performance/use-dynamic-tables"},next:{title:"Manage Roles and Privileges",permalink:"/zh/docs/security/manage-roles-and-privileges"}},d={},l=[];function u(e){return(0,i.jsx)(s.Z,{})}function m(e={}){const{wrapper:t}={...(0,r.a)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(u,{...e})}):u()}},52991:(e,t,n)=>{n.d(t,{Z:()=>y});n(67294);var i=n(90512),r=n(53438),s=n(33692),c=n(13919),a=n(95999),o=n(92503);const d={cardContainer:"cardContainer_fWXF",cardTitle:"cardTitle_rnsV",cardDescription:"cardDescription_PWke"};var l=n(85893);function u(e){let{href:t,children:n}=e;return(0,l.jsx)(s.Z,{href:t,className:(0,i.Z)("card padding--lg",d.cardContainer),children:n})}function m(e){let{href:t,icon:n,title:r,description:s}=e;return(0,l.jsxs)(u,{href:t,children:[(0,l.jsxs)(o.Z,{as:"h2",className:(0,i.Z)("text--truncate",d.cardTitle),title:r,children:[n," ",r]}),s&&(0,l.jsx)("p",{className:(0,i.Z)("text--truncate",d.cardDescription),title:s,children:s})]})}function p(e){let{item:t}=e;const n=(0,r.LM)(t);return n?(0,l.jsx)(m,{href:n,icon:"\ud83d\uddc3\ufe0f",title:t.label,description:t.description??(0,a.I)({message:"{count} items",id:"theme.docs.DocCard.categoryDescription",description:"The default description for a category card in the generated index about how many items this category includes"},{count:t.items.length})}):null}function f(e){let{item:t}=e;const n=(0,c.Z)(t.href)?"\ud83d\udcc4\ufe0f":"\ud83d\udd17",i=(0,r.xz)(t.docId??void 0);return(0,l.jsx)(m,{href:t.href,icon:n,title:t.label,description:t.description??i?.description})}function h(e){let{item:t}=e;switch(t.type){case"link":return(0,l.jsx)(f,{item:t});case"category":return(0,l.jsx)(p,{item:t});default:throw new Error(`unknown item type ${JSON.stringify(t)}`)}}function x(e){let{className:t}=e;const n=(0,r.jA)();return(0,l.jsx)(y,{items:n.items,className:t})}function y(e){const{items:t,className:n}=e;if(!t)return(0,l.jsx)(x,{...e});const s=(0,r.MN)(t);return(0,l.jsx)("section",{className:(0,i.Z)("row",n),children:s.map(((e,t)=>(0,l.jsx)("article",{className:"col col--6 margin-bottom--lg",children:(0,l.jsx)(h,{item:e})},t)))})}},11151:(e,t,n)=>{n.d(t,{Z:()=>a,a:()=>c});var i=n(67294);const r={},s=i.createContext(r);function c(e){const t=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:c(e.components),i.createElement(s.Provider,{value:t},e.children)}}}]);