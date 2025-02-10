"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[1844],{97864:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>i,default:()=>h,frontMatter:()=>l,metadata:()=>r,toc:()=>a});var t=s(85893),o=s(11151);const l={title:"DROP COLLATION"},i="DROP COLLATION",r={id:"sql-stmts/drop-collation",title:"DROP COLLATION",description:"Removes a previously defined collation.",source:"@site/docs/sql-stmts/drop-collation.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/drop-collation",permalink:"/zh/docs/sql-stmts/drop-collation",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/drop-collation.md",tags:[],version:"current",lastUpdatedBy:"TomShawn",lastUpdatedAt:1739157355,formattedLastUpdatedAt:"2025\u5e742\u670810\u65e5",frontMatter:{title:"DROP COLLATION"},sidebar:"docsbars",previous:{title:"DROP CAST",permalink:"/zh/docs/sql-stmts/drop-cast"},next:{title:"DROP CONVERSION",permalink:"/zh/docs/sql-stmts/drop-conversion"}},c={},a=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Examples",id:"examples",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,o.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"drop-collation",children:"DROP COLLATION"}),"\n",(0,t.jsx)(n.p,{children:"Removes a previously defined collation."}),"\n",(0,t.jsx)(n.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sql",children:"DROP COLLATION [ IF EXISTS ] <name> [ CASCADE | RESTRICT ]\n"})}),"\n",(0,t.jsx)(n.h2,{id:"description",children:"Description"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"DROP COLLATION"})," removes a previously defined collation. To be able to drop a collation, you must own the collation."]}),"\n",(0,t.jsx)(n.h2,{id:"parameters",children:"Parameters"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"IF EXISTS"})})}),"\n",(0,t.jsx)(n.p,{children:"Do not throw an error if the collation does not exist. A notice is issued in this case."}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"name"})})}),"\n",(0,t.jsx)(n.p,{children:"The name of the collation. The collation name can be schema-qualified."}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"CASCADE"})})}),"\n",(0,t.jsx)(n.p,{children:"Automatically drop objects that depend on the collation, and in turn all objects that depend on those objects."}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"RESTRICT"})})}),"\n",(0,t.jsx)(n.p,{children:"Refuse to drop the collation if any objects depend on it. This is the default."}),"\n",(0,t.jsx)(n.h2,{id:"examples",children:"Examples"}),"\n",(0,t.jsxs)(n.p,{children:["To drop the collation named ",(0,t.jsx)(n.code,{children:"german"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sql",children:"DROP COLLATION german;\n"})}),"\n",(0,t.jsx)(n.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.code,{children:"DROP COLLATION"})," command conforms to the SQL standard, apart from the ",(0,t.jsx)(n.code,{children:"IF EXISTS"})," option, which is a Cloudberry Database extension."]}),"\n",(0,t.jsx)(n.h2,{id:"see-also",children:"See also"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.a,{href:"/zh/docs/sql-stmts/alter-collation",children:"ALTER COLLATION"}),", ",(0,t.jsx)(n.a,{href:"/zh/docs/sql-stmts/create-collation",children:"CREATE COLLATION"})]})]})}function h(e={}){const{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},11151:(e,n,s)=>{s.d(n,{Z:()=>r,a:()=>i});var t=s(67294);const o={},l=t.createContext(o);function i(e){const n=t.useContext(l);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:i(e.components),t.createElement(l.Provider,{value:n},e.children)}}}]);