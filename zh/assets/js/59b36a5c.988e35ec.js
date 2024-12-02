"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[1886],{34216:(e,s,t)=>{t.r(s),t.d(s,{assets:()=>d,contentTitle:()=>r,default:()=>p,frontMatter:()=>l,metadata:()=>i,toc:()=>c});var n=t(85893),a=t(11151);const l={title:"DEALLOCATE"},r="DEALLOCATE",i={id:"sql-stmts/deallocate",title:"DEALLOCATE",description:"Deallocates a prepared statement.",source:"@site/docs/sql-stmts/deallocate.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/deallocate",permalink:"/zh/docs/sql-stmts/deallocate",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/deallocate.md",tags:[],version:"current",lastUpdatedBy:"Dianjin Wang",lastUpdatedAt:1733128076,formattedLastUpdatedAt:"2024\u5e7412\u67082\u65e5",frontMatter:{title:"DEALLOCATE"},sidebar:"docsbars",previous:{title:"CREATE VIEW",permalink:"/zh/docs/sql-stmts/create-view"},next:{title:"DECLARE",permalink:"/zh/docs/sql-stmts/declare"}},d={},c=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Examples",id:"examples",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function o(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,a.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.h1,{id:"deallocate",children:"DEALLOCATE"}),"\n",(0,n.jsx)(s.p,{children:"Deallocates a prepared statement."}),"\n",(0,n.jsx)(s.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"DEALLOCATE [PREPARE] { <name> | ALL }\n"})}),"\n",(0,n.jsx)(s.h2,{id:"description",children:"Description"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"DEALLOCATE"})," is used to deallocate a previously prepared SQL statement. If you do not explicitly deallocate a prepared statement, it is deallocated when the session ends."]}),"\n",(0,n.jsxs)(s.p,{children:["For more information on prepared statements, see ",(0,n.jsx)(s.a,{href:"/zh/docs/sql-stmts/prepare",children:"PREPARE"}),"."]}),"\n",(0,n.jsx)(s.h2,{id:"parameters",children:"Parameters"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"PREPARE"})})}),"\n",(0,n.jsx)(s.p,{children:"Optional key word which is ignored."}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"name"})})}),"\n",(0,n.jsx)(s.p,{children:"The name of the prepared statement to deallocate."}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"ALL"})})}),"\n",(0,n.jsx)(s.p,{children:"Deallocate all prepared statements"}),"\n",(0,n.jsx)(s.h2,{id:"examples",children:"Examples"}),"\n",(0,n.jsxs)(s.p,{children:["Deallocate the previously prepared statement named ",(0,n.jsx)(s.code,{children:"insert_names"}),":"]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"DEALLOCATE insert_names;\n"})}),"\n",(0,n.jsx)(s.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,n.jsxs)(s.p,{children:["The SQL standard includes a ",(0,n.jsx)(s.code,{children:"DEALLOCATE"})," statement, but it is only for use in embedded SQL."]}),"\n",(0,n.jsx)(s.h2,{id:"see-also",children:"See also"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.a,{href:"/zh/docs/sql-stmts/execute",children:"EXECUTE"}),", ",(0,n.jsx)(s.a,{href:"/zh/docs/sql-stmts/prepare",children:"PREPARE"})]})]})}function p(e={}){const{wrapper:s}={...(0,a.a)(),...e.components};return s?(0,n.jsx)(s,{...e,children:(0,n.jsx)(o,{...e})}):o(e)}},11151:(e,s,t)=>{t.d(s,{Z:()=>i,a:()=>r});var n=t(67294);const a={},l=n.createContext(a);function r(e){const s=n.useContext(l);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function i(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:r(e.components),n.createElement(l.Provider,{value:s},e.children)}}}]);