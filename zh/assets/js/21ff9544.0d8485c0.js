"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[3378],{26317:(e,s,t)=>{t.r(s),t.d(s,{assets:()=>d,contentTitle:()=>r,default:()=>h,frontMatter:()=>n,metadata:()=>l,toc:()=>o});var i=t(85893),a=t(11151);const n={title:"CREATE MATERIALIZED VIEW"},r="CREATE MATERIALIZED VIEW",l={id:"sql-stmts/create-materialized-view",title:"CREATE MATERIALIZED VIEW",description:"Defines a new materialized view.",source:"@site/docs/sql-stmts/create-materialized-view.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/create-materialized-view",permalink:"/zh/docs/sql-stmts/create-materialized-view",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/create-materialized-view.md",tags:[],version:"current",lastUpdatedBy:"TomShawn",lastUpdatedAt:1736834774,formattedLastUpdatedAt:"2025\u5e741\u670814\u65e5",frontMatter:{title:"CREATE MATERIALIZED VIEW"},sidebar:"docsbars",previous:{title:"CREATE LANGUAGE",permalink:"/zh/docs/sql-stmts/create-language"},next:{title:"CREATE OPERATOR CLASS",permalink:"/zh/docs/sql-stmts/create-operator-class"}},d={},o=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Notes",id:"notes",level:2},{value:"Examples",id:"examples",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function c(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,a.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(s.h1,{id:"create-materialized-view",children:"CREATE MATERIALIZED VIEW"}),"\n",(0,i.jsx)(s.p,{children:"Defines a new materialized view."}),"\n",(0,i.jsx)(s.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-sql",children:"CREATE MATERIALIZED VIEW [ IF  NOT EXISTS ] <table_name>\n    [ (<column_name> [, ...] ) ]\n    [ USING <method> ]\n    [ WITH ( <storage_parameter> [= <value>] [, ... ] ) ]\n    [ TABLESPACE <tablespace_name> ]\n    AS <query>\n    [ WITH [ NO ] DATA ]\n    [DISTRIBUTED { BY ( <column> [<opclass>] [, ... ] ) | RANDOMLY | REPLICATED }]\n"})}),"\n",(0,i.jsx)(s.h2,{id:"description",children:"Description"}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.code,{children:"CREATE MATERIALIZED VIEW"})," defines a materialized view of a query. The query is run and used to populate the view at the time the command is issued (unless ",(0,i.jsx)(s.code,{children:"WITH NO DATA"})," is used) and can be refreshed later using ",(0,i.jsx)(s.a,{href:"/zh/docs/sql-stmts/refresh-materialized-view",children:"REFRESH MATERIALIZED VIEW"}),"."]}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.code,{children:"CREATE MATERIALIZED VIEW"})," is similar to ",(0,i.jsx)(s.code,{children:"CREATE TABLE AS"}),", except that it also remembers the query used to initialize the view, so that it can be refreshed later upon demand. To refresh materialized view data, use the ",(0,i.jsx)(s.code,{children:"REFRESH MATERIALIZED VIEW"})," command. A materialized view has many of the same properties as a table, but there is no support for temporary materialized views."]}),"\n",(0,i.jsx)(s.h2,{id:"parameters",children:"Parameters"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.strong,{children:(0,i.jsx)(s.code,{children:"IF NOT EXISTS"})})}),"\n",(0,i.jsx)(s.p,{children:"Do not throw an error if a materialized view with the same name already exists. A notice is issued in this case. Note that there is no guarantee that the existing materialized view is anything like the one that would have been created."}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.strong,{children:(0,i.jsx)(s.code,{children:"table_name"})})}),"\n",(0,i.jsx)(s.p,{children:"The name (optionally schema-qualified) of the materialized view to be created."}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.strong,{children:(0,i.jsx)(s.code,{children:"column_name"})})}),"\n",(0,i.jsx)(s.p,{children:"The name of a column in the new materialized view. The column names are assigned based on position. The first column name is assigned to the first column of the query result, and so on. If a column name is not provided, it is taken from the output column names of the query."}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.strong,{children:(0,i.jsx)(s.code,{children:"USING method"})})}),"\n",(0,i.jsxs)(s.p,{children:["This optional clause specifies the table access method to use to store the contents for the new materialized view; the method needs be an access method of type ",(0,i.jsx)(s.code,{children:"TABLE"}),". If this option is not specified, the default table access method is chosen for the new materialized view. See default_table_access_method for more information."]}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.strong,{children:(0,i.jsx)(s.code,{children:"WITH ( storage_parameter [= value] [, ... ] )"})})}),"\n",(0,i.jsxs)(s.p,{children:["This clause specifies optional storage parameters for the materialized view. All parameters supported for ",(0,i.jsx)(s.code,{children:"CREATE TABLE"})," are also supported for ",(0,i.jsx)(s.code,{children:"CREATE MATERIALIZED VIEW"}),". See ",(0,i.jsx)(s.a,{href:"/zh/docs/sql-stmts/create-table",children:"CREATE TABLE"})," for more information."]}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.strong,{children:(0,i.jsx)(s.code,{children:"TABLESPACE tablespace_name"})})}),"\n",(0,i.jsx)(s.p,{children:"The tablespace_name is the name of the tablespace in which the new materialized view is to be created. If not specified, server configuration parameter default_tablespace is consulted."}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.strong,{children:(0,i.jsx)(s.code,{children:"query"})})}),"\n",(0,i.jsxs)(s.p,{children:["A ",(0,i.jsx)(s.a,{href:"/zh/docs/sql-stmts/select",children:"SELECT"}),", ",(0,i.jsx)(s.a,{href:"/zh/docs/sql-stmts/select#the-table-command",children:"TABLE"}),", or ",(0,i.jsx)(s.a,{href:"/zh/docs/sql-stmts/values",children:"VALUES"})," command. This query will run within a security-restricted operation; in particular, calls to functions that themselves create temporary tables will fail."]}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.strong,{children:(0,i.jsx)(s.code,{children:"WITH [ NO ] DATA"})})}),"\n",(0,i.jsxs)(s.p,{children:["This clause specifies whether or not the materialized view should be populated with data at creation time. ",(0,i.jsx)(s.code,{children:"WITH DATA"})," is the default, populate the materialized view. For ",(0,i.jsx)(s.code,{children:"WITH NO DATA"}),", the materialized view is not populated with data, is flagged as unscannable, and cannot be queried until ",(0,i.jsx)(s.code,{children:"REFRESH MATERIALIZED VIEW"})," is used to populate the materialized view."]}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.strong,{children:(0,i.jsx)(s.code,{children:"[DISTRIBUTED { BY ( <column> [<opclass>] [, ... ] )"})}),(0,i.jsx)("br",{}),"\n",(0,i.jsx)(s.strong,{children:(0,i.jsx)(s.code,{children:"DISTRIBUTED RANDOMLY"})}),(0,i.jsx)("br",{}),"\n",(0,i.jsx)(s.strong,{children:(0,i.jsx)(s.code,{children:"DISTRIBUTED REPLICATED"})})]}),"\n",(0,i.jsxs)(s.p,{children:["Used to declare the Cloudberry Database distribution policy for the materialized view data. For information about a table distribution policy, see ",(0,i.jsx)(s.a,{href:"/zh/docs/sql-stmts/create-table",children:"CREATE TABLE"}),"."]}),"\n",(0,i.jsx)(s.h2,{id:"notes",children:"Notes"}),"\n",(0,i.jsxs)(s.p,{children:["Materialized views are read only. The system will not allow an ",(0,i.jsx)(s.code,{children:"INSERT"}),", ",(0,i.jsx)(s.code,{children:"UPDATE"}),", or ",(0,i.jsx)(s.code,{children:"DELETE"})," on a materialized view. Use ",(0,i.jsx)(s.code,{children:"REFRESH MATERIALIZED VIEW"})," to update the materialized view data."]}),"\n",(0,i.jsxs)(s.p,{children:["If you want the data to be ordered upon generation, you must use an ",(0,i.jsx)(s.code,{children:"ORDER BY"})," clause in the materialized view query. However, if a materialized view query contains an ",(0,i.jsx)(s.code,{children:"ORDER BY"})," or ",(0,i.jsx)(s.code,{children:"SORT"})," clause, the data is not guaranteed to be ordered or sorted if ",(0,i.jsx)(s.code,{children:"SELECT"})," is performed on the materialized view."]}),"\n",(0,i.jsx)(s.h2,{id:"examples",children:"Examples"}),"\n",(0,i.jsx)(s.p,{children:"Create a view consisting of all comedy films:"}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-sql",children:"CREATE MATERIALIZED VIEW comedies AS SELECT * FROM films \nWHERE kind = 'comedy';\n"})}),"\n",(0,i.jsxs)(s.p,{children:["This will create a view containing the columns that are in the ",(0,i.jsx)(s.code,{children:"film"})," table at the time of view creation. Though ",(0,i.jsx)(s.code,{children:"*"})," was used to create the materialized view, columns added later to the table will not be part of the view."]}),"\n",(0,i.jsx)(s.p,{children:"Create a view that gets the top ten ranked baby names:"}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-sql",children:"CREATE MATERIALIZED VIEW topten AS SELECT name, rank, gender, year FROM \nnames, rank WHERE rank < '11' AND names.id=rank.id;\n"})}),"\n",(0,i.jsx)(s.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.code,{children:"CREATE MATERIALIZED VIEW"})," is a Cloudberry Database extension of the SQL standard."]}),"\n",(0,i.jsx)(s.h2,{id:"see-also",children:"See also"}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"/zh/docs/sql-stmts/select",children:"SELECT"}),", ",(0,i.jsx)(s.a,{href:"/zh/docs/sql-stmts/values",children:"VALUES"}),", ",(0,i.jsx)(s.a,{href:"/zh/docs/sql-stmts/create-view",children:"CREATE VIEW"}),", ",(0,i.jsx)(s.a,{href:"/zh/docs/sql-stmts/alter-materialized-view",children:"ALTER MATERIALIZED VIEW"}),", ",(0,i.jsx)(s.a,{href:"/zh/docs/sql-stmts/drop-materialized-view",children:"DROP MATERIALIZED VIEW"}),", ",(0,i.jsx)(s.a,{href:"/zh/docs/sql-stmts/refresh-materialized-view",children:"REFRESH MATERIALIZED VIEW"})]})]})}function h(e={}){const{wrapper:s}={...(0,a.a)(),...e.components};return s?(0,i.jsx)(s,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},11151:(e,s,t)=>{t.d(s,{Z:()=>l,a:()=>r});var i=t(67294);const a={},n=i.createContext(a);function r(e){const s=i.useContext(n);return i.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function l(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:r(e.components),i.createElement(n.Provider,{value:s},e.children)}}}]);