"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[5607],{24269:(e,i,s)=>{s.r(i),s.d(i,{assets:()=>l,contentTitle:()=>r,default:()=>h,frontMatter:()=>a,metadata:()=>d,toc:()=>o});var t=s(85893),n=s(11151);const a={title:"REFRESH MATERIALIZED VIEW"},r="REFRESH MATERIALIZED VIEW",d={id:"sql-stmts/refresh-materialized-view",title:"REFRESH MATERIALIZED VIEW",description:"Replaces the contents of a materialized view.",source:"@site/docs/sql-stmts/refresh-materialized-view.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/refresh-materialized-view",permalink:"/zh/docs/sql-stmts/refresh-materialized-view",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/refresh-materialized-view.md",tags:[],version:"current",lastUpdatedBy:"Dianjin Wang",lastUpdatedAt:1733128076,formattedLastUpdatedAt:"2024\u5e7412\u67082\u65e5",frontMatter:{title:"REFRESH MATERIALIZED VIEW"},sidebar:"docsbars",previous:{title:"REASSIGN OWNED",permalink:"/zh/docs/sql-stmts/reassign-owned"},next:{title:"REINDEX",permalink:"/zh/docs/sql-stmts/reindex"}},l={},o=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Notes",id:"notes",level:2},{value:"Examples",id:"examples",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function c(e){const i={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,n.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(i.h1,{id:"refresh-materialized-view",children:"REFRESH MATERIALIZED VIEW"}),"\n",(0,t.jsx)(i.p,{children:"Replaces the contents of a materialized view."}),"\n",(0,t.jsx)(i.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{className:"language-sql",children:"REFRESH MATERIALIZED VIEW [ CONCURRENTLY ] <name>\n    [ WITH [ NO ] DATA ]\n"})}),"\n",(0,t.jsx)(i.h2,{id:"description",children:"Description"}),"\n",(0,t.jsxs)(i.p,{children:[(0,t.jsx)(i.code,{children:"REFRESH MATERIALIZED VIEW"})," completely replaces the contents of a materialized view. The old contents are discarded. To run this command you must be the owner of the materialized view. If ",(0,t.jsx)(i.code,{children:"WITH DATA"})," is specified (or defaults), the backing query is executed to provide the new data, and the materialized view is left in a scannable state. If ",(0,t.jsx)(i.code,{children:"WITH NO DATA"})," is specified, no new data is generated, and the materialized view is left in an unscannable state."]}),"\n",(0,t.jsxs)(i.p,{children:["You may not specify ",(0,t.jsx)(i.code,{children:"CONCURRENTLY"})," and ",(0,t.jsx)(i.code,{children:"WITH NO DATA"})," together."]}),"\n",(0,t.jsx)(i.h2,{id:"parameters",children:"Parameters"}),"\n",(0,t.jsx)(i.p,{children:(0,t.jsx)(i.strong,{children:(0,t.jsx)(i.code,{children:"CONCURRENTLY"})})}),"\n",(0,t.jsx)(i.p,{children:"Refresh the materialized view without locking out concurrent selects on the materialized view. Without this option, a refresh that affects a lot of rows tends to use fewer resources and completes more quickly, but could block other connections which are trying to read from the materialized view. This option might be faster in cases where a small number of rows are affected."}),"\n",(0,t.jsxs)(i.p,{children:["This option is only allowed if there is at least one ",(0,t.jsx)(i.code,{children:"UNIQUE"})," index on the materialized view which uses only column names and includes all rows; that is, it must not index on any expressions nor include a ",(0,t.jsx)(i.code,{children:"WHERE"})," clause."]}),"\n",(0,t.jsx)(i.p,{children:"You can not use this option when the materialized view is not already populated."}),"\n",(0,t.jsxs)(i.p,{children:["Even with this option, only one ",(0,t.jsx)(i.code,{children:"REFRESH"})," at a time may run against any one materialized view."]}),"\n",(0,t.jsx)(i.p,{children:(0,t.jsx)(i.strong,{children:(0,t.jsx)(i.code,{children:"name"})})}),"\n",(0,t.jsx)(i.p,{children:"The name (optionally schema-qualified) of the materialized view to refresh."}),"\n",(0,t.jsx)(i.p,{children:(0,t.jsx)(i.strong,{children:(0,t.jsx)(i.code,{children:"WITH [ NO ] DATA"})})}),"\n",(0,t.jsxs)(i.p,{children:[(0,t.jsx)(i.code,{children:"WITH DATA"})," is the default and specifies that the materialized view query is run to provide new data, and the materialized view is left in a scannable state. If ",(0,t.jsx)(i.code,{children:"WITH NO DATA"})," is specified, no new data is generated and the materialized view is left in an unscannable state."]}),"\n",(0,t.jsx)(i.h2,{id:"notes",children:"Notes"}),"\n",(0,t.jsxs)(i.p,{children:["If there is an ",(0,t.jsx)(i.code,{children:"ORDER BY"})," clause in the materialized view's defining query, the original contents of the materialized view will be ordered that way; but ",(0,t.jsx)(i.code,{children:"REFRESH MATERIALIZED VIEW"})," does not guarantee to preserve that ordering."]}),"\n",(0,t.jsx)(i.h2,{id:"examples",children:"Examples"}),"\n",(0,t.jsxs)(i.p,{children:["This command replaces the contents of the materialized view ",(0,t.jsx)(i.code,{children:"order_summary"})," using the query from the materialized view's definition, and leaves it in a scannable state."]}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{className:"language-sql",children:"REFRESH MATERIALIZED VIEW order_summary;\n"})}),"\n",(0,t.jsxs)(i.p,{children:["This command frees storage associated with the materialized view ",(0,t.jsx)(i.code,{children:"annual_statistics_basis"})," and leaves it in an unscannable state."]}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{className:"language-sql",children:"REFRESH MATERIALIZED VIEW annual_statistics_basis WITH NO DATA;\n"})}),"\n",(0,t.jsx)(i.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,t.jsxs)(i.p,{children:[(0,t.jsx)(i.code,{children:"REFRESH MATERIALIZED VIEW"})," is a Cloudberry Database extension of the SQL standard."]}),"\n",(0,t.jsx)(i.h2,{id:"see-also",children:"See also"}),"\n",(0,t.jsxs)(i.p,{children:[(0,t.jsx)(i.a,{href:"/zh/docs/sql-stmts/alter-materialized-view",children:"ALTER MATERIALIZED VIEW"}),", ",(0,t.jsx)(i.a,{href:"/zh/docs/sql-stmts/create-materialized-view",children:"CREATE MATERIALIZED VIEW"}),", ",(0,t.jsx)(i.a,{href:"/zh/docs/sql-stmts/drop-materialized-view",children:"DROP MATERIALIZED VIEW"})]})]})}function h(e={}){const{wrapper:i}={...(0,n.a)(),...e.components};return i?(0,t.jsx)(i,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},11151:(e,i,s)=>{s.d(i,{Z:()=>d,a:()=>r});var t=s(67294);const n={},a=t.createContext(n);function r(e){const i=t.useContext(a);return t.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function d(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:r(e.components),t.createElement(a.Provider,{value:i},e.children)}}}]);