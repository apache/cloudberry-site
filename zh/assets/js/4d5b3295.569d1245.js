"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[9479],{36770:(e,s,t)=>{t.r(s),t.d(s,{assets:()=>c,contentTitle:()=>l,default:()=>h,frontMatter:()=>r,metadata:()=>i,toc:()=>o});var n=t(85893),a=t(11151);const r={title:"ALTER TABLESPACE"},l="ALTER TABLESPACE",i={id:"sql-stmts/alter-tablespace",title:"ALTER TABLESPACE",description:"Changes the definition of a tablespace.",source:"@site/docs/sql-stmts/alter-tablespace.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/alter-tablespace",permalink:"/zh/docs/sql-stmts/alter-tablespace",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/alter-tablespace.md",tags:[],version:"current",lastUpdatedBy:"Dianjin Wang",lastUpdatedAt:1744271659,formattedLastUpdatedAt:"2025\u5e744\u670810\u65e5",frontMatter:{title:"ALTER TABLESPACE"},sidebar:"docsbars",previous:{title:"ALTER TABLE",permalink:"/zh/docs/sql-stmts/alter-table"},next:{title:"ALTER TEXT SEARCH CONFIGURATION",permalink:"/zh/docs/sql-stmts/alter-text-search-configuration"}},c={},o=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Examples",id:"examples",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function d(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,a.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.h1,{id:"alter-tablespace",children:"ALTER TABLESPACE"}),"\n",(0,n.jsx)(s.p,{children:"Changes the definition of a tablespace."}),"\n",(0,n.jsx)(s.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"ALTER TABLESPACE <name> RENAME TO <new_name>\n\nALTER TABLESPACE <name> OWNER TO { <new_owner> | CURRENT_USER | SESSION_USER }\n\nALTER TABLESPACE <name> SET ( <tablespace_option> = <value> [, ... ] )\n\nALTER TABLESPACE <name> RESET ( <tablespace_option> [, ... ] )\n"})}),"\n",(0,n.jsx)(s.h2,{id:"description",children:"Description"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"ALTER TABLESPACE"})," changes the definition of a tablespace."]}),"\n",(0,n.jsxs)(s.p,{children:["You must own the tablespace to use ",(0,n.jsx)(s.code,{children:"ALTER TABLESPACE"}),". To alter the owner, you must also be a direct or indirect member of the new owning role. (Note that superusers have these privileges automatically.)"]}),"\n",(0,n.jsx)(s.h2,{id:"parameters",children:"Parameters"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"name"})})}),"\n",(0,n.jsx)(s.p,{children:"The name of an existing tablespace."}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"new_name"})})}),"\n",(0,n.jsxs)(s.p,{children:["The new name of the tablespace. The new name cannot begin with ",(0,n.jsx)(s.code,{children:"pg_"})," or ",(0,n.jsx)(s.code,{children:"gp_ "}),"(reserved for system tablespaces)."]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"new_owner"})})}),"\n",(0,n.jsx)(s.p,{children:"The new owner of the tablespace."}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"tablespace_parameter"})})}),"\n",(0,n.jsxs)(s.p,{children:["A tablespace parameter to set or reset. Currently, the only available parameters are ",(0,n.jsx)(s.code,{children:"seq_page_cost"})," and ",(0,n.jsx)(s.code,{children:"random_page_cost"}),". Setting either value for a particular tablespace will override the planner's usual estimate of the cost of reading pages from tables in that tablespace, as established by the configuration parameters of the same name (see ",(0,n.jsx)(s.code,{children:"seq_page_cost"}),", ",(0,n.jsx)(s.code,{children:"random_page_cost"}),"). This may be useful if one tablespace is located on a disk which is faster or slower than the remainder of the I/O subsystem."]}),"\n",(0,n.jsx)(s.h2,{id:"examples",children:"Examples"}),"\n",(0,n.jsxs)(s.p,{children:["Rename tablespace ",(0,n.jsx)(s.code,{children:"index_space"})," to ",(0,n.jsx)(s.code,{children:"fast_raid"}),":"]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"ALTER TABLESPACE index_space RENAME TO fast_raid;\n"})}),"\n",(0,n.jsxs)(s.p,{children:["Change the owner of tablespace ",(0,n.jsx)(s.code,{children:"index_space"}),":"]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"ALTER TABLESPACE index_space OWNER TO mary;\n"})}),"\n",(0,n.jsx)(s.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,n.jsxs)(s.p,{children:["There is no ",(0,n.jsx)(s.code,{children:"ALTER TABLESPACE"})," statement in the SQL standard."]}),"\n",(0,n.jsx)(s.h2,{id:"see-also",children:"See also"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.a,{href:"/zh/docs/sql-stmts/create-tablespace",children:(0,n.jsx)(s.code,{children:"CREATE TABLESPACE"})}),", ",(0,n.jsx)(s.a,{href:"/zh/docs/sql-stmts/drop-tablespace",children:(0,n.jsx)(s.code,{children:"DROP TABLESPACE"})})]})]})}function h(e={}){const{wrapper:s}={...(0,a.a)(),...e.components};return s?(0,n.jsx)(s,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}},11151:(e,s,t)=>{t.d(s,{Z:()=>i,a:()=>l});var n=t(67294);const a={},r=n.createContext(a);function l(e){const s=n.useContext(r);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function i(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:l(e.components),n.createElement(r.Provider,{value:s},e.children)}}}]);