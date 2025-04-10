"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[734],{384:(e,s,t)=>{t.r(s),t.d(s,{assets:()=>o,contentTitle:()=>i,default:()=>h,frontMatter:()=>l,metadata:()=>a,toc:()=>c});var n=t(85893),r=t(11151);const l={title:"ALTER RULE"},i="ALTER RULE",a={id:"sql-stmts/alter-rule",title:"ALTER RULE",description:"Changes the definition of a rule.",source:"@site/docs/sql-stmts/alter-rule.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/alter-rule",permalink:"/docs/sql-stmts/alter-rule",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/alter-rule.md",tags:[],version:"current",lastUpdatedBy:"Dianjin Wang",lastUpdatedAt:1744271659,formattedLastUpdatedAt:"Apr 10, 2025",frontMatter:{title:"ALTER RULE"},sidebar:"docsbars",previous:{title:"ALTER ROUTINE",permalink:"/docs/sql-stmts/alter-routine"},next:{title:"ALTER SCHEMA",permalink:"/docs/sql-stmts/alter-schema"}},o={},c=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Examples",id:"examples",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function d(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,r.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.h1,{id:"alter-rule",children:"ALTER RULE"}),"\n",(0,n.jsx)(s.p,{children:"Changes the definition of a rule."}),"\n",(0,n.jsx)(s.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"ALTER RULE name ON <table_name> RENAME TO <new_name>\n"})}),"\n",(0,n.jsx)(s.h2,{id:"description",children:"Description"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"ALTER RULE"})," changes properties of an existing rule. Currently, the only available action is to change the rule's name."]}),"\n",(0,n.jsxs)(s.p,{children:["To use ",(0,n.jsx)(s.code,{children:"ALTER RULE"}),", you must own the table or view that the rule applies to."]}),"\n",(0,n.jsx)(s.h2,{id:"parameters",children:"Parameters"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"name"})})}),"\n",(0,n.jsx)(s.p,{children:"The name of an existing rule to alter."}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"table_name"})})}),"\n",(0,n.jsx)(s.p,{children:"The name (optionally schema-qualified) of the table or view that the rule applies to."}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"new_name"})})}),"\n",(0,n.jsx)(s.p,{children:"The new name for the rule."}),"\n",(0,n.jsx)(s.h2,{id:"examples",children:"Examples"}),"\n",(0,n.jsx)(s.p,{children:"To rename an existing rule:"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"ALTER RULE notify_all ON emp RENAME TO notify_me; \n"})}),"\n",(0,n.jsx)(s.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"ALTER RULE"})," is a Apache Cloudberry extension, as is the entire query rewrite system."]}),"\n",(0,n.jsx)(s.h2,{id:"see-also",children:"See also"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.a,{href:"/docs/sql-stmts/create-rule",children:(0,n.jsx)(s.code,{children:"CREATE RULE"})}),", ",(0,n.jsx)(s.a,{href:"/docs/sql-stmts/drop-rule",children:(0,n.jsx)(s.code,{children:"DROP RULE"})})]})]})}function h(e={}){const{wrapper:s}={...(0,r.a)(),...e.components};return s?(0,n.jsx)(s,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}},11151:(e,s,t)=>{t.d(s,{Z:()=>a,a:()=>i});var n=t(67294);const r={},l=n.createContext(r);function i(e){const s=n.useContext(l);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function a(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),n.createElement(l.Provider,{value:s},e.children)}}}]);