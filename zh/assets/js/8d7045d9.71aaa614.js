"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[3265],{32741:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>r,contentTitle:()=>a,default:()=>l,frontMatter:()=>c,metadata:()=>o,toc:()=>d});var s=n(85893),i=n(11151);const c={title:"SET CONSTRAINTS"},a="SET CONSTRAINTS",o={id:"sql-stmts/set-constraints",title:"SET CONSTRAINTS",description:"Sets constraint check timing for the current transaction.",source:"@site/docs/sql-stmts/set-constraints.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/set-constraints",permalink:"/zh/docs/sql-stmts/set-constraints",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/set-constraints.md",tags:[],version:"current",lastUpdatedBy:"TomShawn",lastUpdatedAt:1741056503,formattedLastUpdatedAt:"2025\u5e743\u67084\u65e5",frontMatter:{title:"SET CONSTRAINTS"},sidebar:"docsbars",previous:{title:"SELECT",permalink:"/zh/docs/sql-stmts/select"},next:{title:"SET ROLE",permalink:"/zh/docs/sql-stmts/set-role"}},r={},d=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Notes",id:"notes",level:2},{value:"Compatibility",id:"compatibility",level:2}];function h(e){const t={blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,i.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h1,{id:"set-constraints",children:"SET CONSTRAINTS"}),"\n",(0,s.jsx)(t.p,{children:"Sets constraint check timing for the current transaction."}),"\n",(0,s.jsxs)(t.blockquote,{children:["\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.strong,{children:"Note"})," Referential integrity syntax (foreign key constraints) is accepted but not enforced."]}),"\n"]}),"\n",(0,s.jsx)(t.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-sql",children:"SET CONSTRAINTS { ALL | <name> [, ...] } { DEFERRED | IMMEDIATE }\n"})}),"\n",(0,s.jsx)(t.h2,{id:"description",children:"Description"}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.code,{children:"SET CONSTRAINTS"})," sets the behavior of constraint checking within the current transaction. ",(0,s.jsx)(t.code,{children:"IMMEDIATE"})," constraints are checked at the end of each statement. ",(0,s.jsx)(t.code,{children:"DEFERRED"})," constraints are not checked until transaction commit. Each constraint has its own ",(0,s.jsx)(t.code,{children:"IMMEDIATE"})," or ",(0,s.jsx)(t.code,{children:"DEFERRED"})," mode."]}),"\n",(0,s.jsxs)(t.p,{children:["Upon creation, a constraint is given one of three characteristics: ",(0,s.jsx)(t.code,{children:"DEFERRABLE INITIALLY DEFERRED"}),", ",(0,s.jsx)(t.code,{children:"DEFERRABLE INITIALLY IMMEDIATE"}),", or ",(0,s.jsx)(t.code,{children:"NOT DEFERRABLE"}),". The third class is always ",(0,s.jsx)(t.code,{children:"IMMEDIATE"})," and is not affected by the ",(0,s.jsx)(t.code,{children:"SET CONSTRAINTS"})," command. The first two classes start every transaction in the indicated mode, but their behavior can be changed within a transaction by ",(0,s.jsx)(t.code,{children:"SET CONSTRAINTS"}),"."]}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.code,{children:"SET CONSTRAINTS"})," with a list of constraint names changes the mode of just those constraints (which must all be deferrable). Each constraint name can be schema-qualified. The current schema search path is used to find the first matching name if no schema name is specified. ",(0,s.jsx)(t.code,{children:"SET CONSTRAINTS ALL"})," changes the mode of all deferrable constraints."]}),"\n",(0,s.jsxs)(t.p,{children:["When ",(0,s.jsx)(t.code,{children:"SET CONSTRAINTS"})," changes the mode of a constraint from ",(0,s.jsx)(t.code,{children:"DEFERRED"})," to ",(0,s.jsx)(t.code,{children:"IMMEDIATE"}),", the new mode takes effect retroactively: any outstanding data modifications that would have been checked at the end of the transaction are instead checked during the execution of the ",(0,s.jsx)(t.code,{children:"SET CONSTRAINTS"})," command. If any such constraint is violated, the ",(0,s.jsx)(t.code,{children:"SET CONSTRAINTS"})," fails (and does not change the constraint mode). Thus, ",(0,s.jsx)(t.code,{children:"SET CONSTRAINTS"})," can be used to force checking of constraints to occur at a specific point in a transaction."]}),"\n",(0,s.jsxs)(t.p,{children:["Currently, only ",(0,s.jsx)(t.code,{children:"UNIQUE"}),", ",(0,s.jsx)(t.code,{children:"PRIMARY KEY"}),", ",(0,s.jsx)(t.code,{children:"REFERENCES"})," (foreign key), and ",(0,s.jsx)(t.code,{children:"EXCLUDE"})," constraints are affected by this setting. ",(0,s.jsx)(t.code,{children:"NOT NULL"})," and ",(0,s.jsx)(t.code,{children:"CHECK"})," constraints are always checked immediately when a row is inserted or modified (",(0,s.jsx)(t.em,{children:"not"})," at the end of the statement). Uniqueness and exclusion constraints that have not been declared ",(0,s.jsx)(t.code,{children:"DEFERRABLE"})," are also checked immediately."]}),"\n",(0,s.jsx)(t.p,{children:'The firing of triggers that are declared as "constraint triggers" is also controlled by this setting \u2014 they fire at the same time that the associated constraint should be checked.'}),"\n",(0,s.jsx)(t.h2,{id:"notes",children:"Notes"}),"\n",(0,s.jsxs)(t.p,{children:["Because Cloudberry Database does not require constraint names to be unique within a schema (but only per-table), it is possible that there is more than one match for a specified constraint name. In this case ",(0,s.jsx)(t.code,{children:"SET CONSTRAINTS"})," will act on all matches. For a non-schema-qualified name, once a match or matches have been found in some schema in the search path, schemas appearing later in the path are not searched."]}),"\n",(0,s.jsx)(t.p,{children:"This command only alters the behavior of constraints within the current transaction. Issuing this outside of a transaction block emits a warning and otherwise has no effect."}),"\n",(0,s.jsx)(t.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,s.jsxs)(t.p,{children:["This command complies with the behavior defined in the SQL standard, except for the limitation that, in Cloudberry Database, it does not apply to ",(0,s.jsx)(t.code,{children:"NOT NULL"})," and ",(0,s.jsx)(t.code,{children:"CHECK"})," constraints. Also, Cloudberry Database checks non-deferrable uniqueness constraints immediately, not at end of statement as the standard would suggest."]})]})}function l(e={}){const{wrapper:t}={...(0,i.a)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},11151:(e,t,n)=>{n.d(t,{Z:()=>o,a:()=>a});var s=n(67294);const i={},c=s.createContext(i);function a(e){const t=s.useContext(c);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),s.createElement(c.Provider,{value:t},e.children)}}}]);