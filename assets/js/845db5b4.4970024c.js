"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[2951],{94253:(e,a,i)=>{i.r(a),i.d(a,{assets:()=>l,contentTitle:()=>n,default:()=>h,frontMatter:()=>s,metadata:()=>d,toc:()=>o});var t=i(85893),r=i(11151);const s={title:"Create and Manage Materialized Views"},n="Create and Manage Materialized Views in Cloudberry Database",d={id:"create-and-manage-materialized-views",title:"Create and Manage Materialized Views",description:"In Cloudberry Database, materialized views are similar to views. A materialized view enables you to save a frequently used or complex query, then access the query results in a SELECT statement as if they were a table. Materialized views persist the query results in a table-like form.",source:"@site/docs/create-and-manage-materialized-views.md",sourceDirName:".",slug:"/create-and-manage-materialized-views",permalink:"/docs/create-and-manage-materialized-views",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/create-and-manage-materialized-views.md",tags:[],version:"current",lastUpdatedBy:"TomShawn",lastUpdatedAt:1741056503,formattedLastUpdatedAt:"Mar 4, 2025",frontMatter:{title:"Create and Manage Materialized Views"},sidebar:"docsbars",previous:{title:"Create and Manage Views",permalink:"/docs/create-and-manage-views"},next:{title:"Insert, Update, and Delete Rows",permalink:"/docs/insert-update-delete-rows"}},l={},o=[{value:"Create materialized views",id:"create-materialized-views",level:2},{value:"Refresh or deactivate materialized views",id:"refresh-or-deactivate-materialized-views",level:2},{value:"Drop materialized views",id:"drop-materialized-views",level:2}];function c(e){const a={admonition:"admonition",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...(0,r.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(a.h1,{id:"create-and-manage-materialized-views-in-cloudberry-database",children:"Create and Manage Materialized Views in Cloudberry Database"}),"\n",(0,t.jsxs)(a.p,{children:["In Cloudberry Database, materialized views are similar to views. A materialized view enables you to save a frequently used or complex query, then access the query results in a ",(0,t.jsx)(a.code,{children:"SELECT"})," statement as if they were a table. Materialized views persist the query results in a table-like form."]}),"\n",(0,t.jsxs)(a.p,{children:["Although accessing the data stored in a materialized view can be much faster than accessing the underlying tables directly or through a regular view, the data is not always current. The materialized view data cannot be directly updated. To refresh the materialized view data, use the ",(0,t.jsx)(a.code,{children:"REFRESH MATERIALIZED VIEW"})," command."]}),"\n",(0,t.jsx)(a.p,{children:"The query used to create the materialized view is stored in exactly the same way that a view's query is stored. For example, you can create a materialized view that quickly displays a summary of historical sales data for situations where having incomplete data for the current date is acceptable."}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-sql",children:"CREATE MATERIALIZED VIEW sales_summary AS\n  SELECT seller_no, invoice_date, sum(invoice_amt)::numeric(13,2) as sales_amt\n    FROM invoice\n    WHERE invoice_date < CURRENT_DATE\n    GROUP BY seller_no, invoice_date\n\nCREATE UNIQUE INDEX sales_summary_seller\n  ON sales_summary (seller_no, invoice_date);\n"})}),"\n",(0,t.jsx)(a.p,{children:"The materialized view might be useful for displaying a graph in the dashboard created for sales people. You can schedule a job to update the summary information each night using the following command:"}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-sql",children:"REFRESH MATERIALIZED VIEW sales_summary;\n"})}),"\n",(0,t.jsx)(a.p,{children:"The information about a materialized view in the Cloudberry Database system catalogs is exactly the same as it is for a table or view. A materialized view is a relation, just like a table or a view. When a materialized view is referenced in a query, the data is returned directly from the materialized view, just like from a table. The query in the materialized view definition is only used for populating the materialized view."}),"\n",(0,t.jsx)(a.p,{children:"If you can tolerate periodically updating the materialized view data, you can get great performance benefit from the view."}),"\n",(0,t.jsx)(a.p,{children:"One use of a materialized view is to allow faster access to data brought in from an external data source such as external table or a foreign data wrapper. Also, you can define indexes on a materialized view, whereas foreign data wrappers do not support indexes; this advantage might not apply for other types of external data access."}),"\n",(0,t.jsxs)(a.p,{children:["If a subquery is associated with a single query, consider using the ",(0,t.jsx)(a.code,{children:"WITH"})," clause of the ",(0,t.jsx)(a.code,{children:"SELECT"})," command instead of creating a seldom-used materialized view."]}),"\n",(0,t.jsx)(a.h2,{id:"create-materialized-views",children:"Create materialized views"}),"\n",(0,t.jsxs)(a.p,{children:["The ",(0,t.jsx)(a.code,{children:"CREATE MATERIALIZED VIEW"})," command defines a materialized view based on a query."]}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-sql",children:"CREATE MATERIALIZED VIEW us_users AS SELECT u.id, u.name, a.zone FROM users u, address a WHERE a.country = 'USA';\n"})}),"\n",(0,t.jsx)(a.admonition,{type:"tip",children:(0,t.jsxs)(a.p,{children:["When a materialized view is created with an ",(0,t.jsx)(a.code,{children:"ORDER BY"})," or ",(0,t.jsx)(a.code,{children:"SORT"})," clause, this sorting is applied only at the time of the view's initial creation. Subsequent refreshes of the materialized view do not maintain this order, because the view is essentially a static snapshot of data and does not dynamically update or preserve the sorting with new data insertions."]})}),"\n",(0,t.jsx)(a.h2,{id:"refresh-or-deactivate-materialized-views",children:"Refresh or deactivate materialized views"}),"\n",(0,t.jsxs)(a.p,{children:["The ",(0,t.jsx)(a.code,{children:"REFRESH MATERIALIZED VIEW"})," command updates the materialized view data."]}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-sql",children:"REFRESH MATERIALIZED VIEW us_users;\n"})}),"\n",(0,t.jsxs)(a.p,{children:["With the ",(0,t.jsx)(a.code,{children:"WITH NO DATA"})," clause, the current data is removed, no new data is generated, and the materialized view is left in an unscannable state. An error is returned if a query attempts to access an unscannable materialized view."]}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-sql",children:"REFRESH MATERIALIZED VIEW us_users WITH NO DATA;\n"})}),"\n",(0,t.jsx)(a.h2,{id:"drop-materialized-views",children:"Drop materialized views"}),"\n",(0,t.jsxs)(a.p,{children:["The ",(0,t.jsx)(a.code,{children:"DROP MATERIALIZED VIEW"})," command removes a materialized view definition and data. For example:"]}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-sql",children:"DROP MATERIALIZED VIEW us_users;\n"})}),"\n",(0,t.jsxs)(a.p,{children:["The ",(0,t.jsx)(a.code,{children:"DROP MATERIALIZED VIEW ... CASCADE"})," command also removes all dependent objects. For example, if another materialized view depends on the materialized view which is about to be dropped, the other materialized view will be dropped as well. Without the ",(0,t.jsx)(a.code,{children:"CASCADE"})," option, the ",(0,t.jsx)(a.code,{children:"DROP MATERIALIZED VIEW"})," command fails."]})]})}function h(e={}){const{wrapper:a}={...(0,r.a)(),...e.components};return a?(0,t.jsx)(a,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},11151:(e,a,i)=>{i.d(a,{Z:()=>d,a:()=>n});var t=i(67294);const r={},s=t.createContext(r);function n(e){const a=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(a):{...a,...e}}),[a,e])}function d(e){let a;return a=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:n(e.components),t.createElement(s.Provider,{value:a},e.children)}}}]);