"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[2418],{88927:(e,s,t)=>{t.r(s),t.d(s,{assets:()=>l,contentTitle:()=>i,default:()=>p,frontMatter:()=>o,metadata:()=>a,toc:()=>d});var r=t(85893),n=t(11151);const o={title:"DROP OPERATOR FAMILY"},i="DROP OPERATOR FAMILY",a={id:"sql-stmts/drop-operator-family",title:"DROP OPERATOR FAMILY",description:"Removes an operator family.",source:"@site/docs/sql-stmts/drop-operator-family.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/drop-operator-family",permalink:"/docs/sql-stmts/drop-operator-family",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/drop-operator-family.md",tags:[],version:"current",lastUpdatedBy:"Dianjin Wang",lastUpdatedAt:1742268909,formattedLastUpdatedAt:"Mar 18, 2025",frontMatter:{title:"DROP OPERATOR FAMILY"},sidebar:"docsbars",previous:{title:"DROP OPERATOR CLASS",permalink:"/docs/sql-stmts/drop-operator-class"},next:{title:"DROP OPERATOR",permalink:"/docs/sql-stmts/drop-operator"}},l={},d=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Examples",id:"examples",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function c(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,n.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.h1,{id:"drop-operator-family",children:"DROP OPERATOR FAMILY"}),"\n",(0,r.jsx)(s.p,{children:"Removes an operator family."}),"\n",(0,r.jsx)(s.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-sql",children:"DROP OPERATOR FAMILY [IF EXISTS] <name> USING <index_method> [CASCADE | RESTRICT]\n"})}),"\n",(0,r.jsx)(s.h2,{id:"description",children:"Description"}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.code,{children:"DROP OPERATOR FAMILY"})," drops an existing operator family. To run this command you must be the owner of the operator family."]}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.code,{children:"DROP OPERATOR FAMILY"})," includes dropping any operator classes contained in the family, but it does not drop any of the operators or functions referenced by the family. If there are any indexes depending on operator classes within the family, you will need to specify ",(0,r.jsx)(s.code,{children:"CASCADE"})," for the drop to complete."]}),"\n",(0,r.jsx)(s.h2,{id:"parameters",children:"Parameters"}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.strong,{children:(0,r.jsx)(s.code,{children:"IF EXISTS"})})}),"\n",(0,r.jsx)(s.p,{children:"Do not throw an error if the operator family does not exist. A notice is issued in this case."}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.strong,{children:(0,r.jsx)(s.code,{children:"name"})})}),"\n",(0,r.jsx)(s.p,{children:"The name (optionally schema-qualified) of an existing operator family."}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.strong,{children:(0,r.jsx)(s.code,{children:"index_method"})})}),"\n",(0,r.jsx)(s.p,{children:"The name of the index access method the operator family is for."}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.strong,{children:(0,r.jsx)(s.code,{children:"CASCADE"})})}),"\n",(0,r.jsx)(s.p,{children:"Automatically drop objects that depend on the operator family, and in turn all objects that depend on those objects."}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.strong,{children:(0,r.jsx)(s.code,{children:"RESTRICT"})})}),"\n",(0,r.jsx)(s.p,{children:"Refuse to drop the operator family if any objects depend on it. This is the default."}),"\n",(0,r.jsx)(s.h2,{id:"examples",children:"Examples"}),"\n",(0,r.jsxs)(s.p,{children:["Remove the B-tree operator family ",(0,r.jsx)(s.code,{children:"float_ops"}),":"]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-sql",children:"DROP OPERATOR FAMILY float_ops USING btree;\n"})}),"\n",(0,r.jsxs)(s.p,{children:["This command will not succeed if there are any existing indexes that use the operator family. Add ",(0,r.jsx)(s.code,{children:"CASCADE"})," to drop such indexes along with the operator family."]}),"\n",(0,r.jsx)(s.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,r.jsxs)(s.p,{children:["There is no ",(0,r.jsx)(s.code,{children:"DROP OPERATOR FAMILY"})," statement in the SQL standard."]}),"\n",(0,r.jsx)(s.h2,{id:"see-also",children:"See also"}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.a,{href:"/docs/sql-stmts/alter-operator-family",children:"ALTER OPERATOR FAMILY"}),", ",(0,r.jsx)(s.a,{href:"/docs/sql-stmts/create-operator-family",children:"CREATE OPERATOR FAMILY"}),", ",(0,r.jsx)(s.a,{href:"/docs/sql-stmts/alter-operator-class",children:"ALTER OPERATOR CLASS"}),", ",(0,r.jsx)(s.a,{href:"/docs/sql-stmts/create-operator-class",children:"CREATE OPERATOR CLASS"}),", ",(0,r.jsx)(s.a,{href:"/docs/sql-stmts/drop-operator-class",children:"DROP OPERATOR CLASS"})]})]})}function p(e={}){const{wrapper:s}={...(0,n.a)(),...e.components};return s?(0,r.jsx)(s,{...e,children:(0,r.jsx)(c,{...e})}):c(e)}},11151:(e,s,t)=>{t.d(s,{Z:()=>a,a:()=>i});var r=t(67294);const n={},o=r.createContext(n);function i(e){const s=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function a(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:i(e.components),r.createElement(o.Provider,{value:s},e.children)}}}]);