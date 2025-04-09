"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[2529],{86054:(e,s,t)=>{t.r(s),t.d(s,{assets:()=>a,contentTitle:()=>o,default:()=>h,frontMatter:()=>i,metadata:()=>l,toc:()=>c});var r=t(85893),n=t(11151);const i={title:"SET ROLE"},o="SET ROLE",l={id:"sql-stmts/set-role",title:"SET ROLE",description:"Sets the current role identifier of the current session.",source:"@site/docs/sql-stmts/set-role.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/set-role",permalink:"/docs/sql-stmts/set-role",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/set-role.md",tags:[],version:"current",lastUpdatedBy:"dependabot[bot]",lastUpdatedAt:1744180221,formattedLastUpdatedAt:"Apr 9, 2025",frontMatter:{title:"SET ROLE"},sidebar:"docsbars",previous:{title:"SET CONSTRAINTS",permalink:"/docs/sql-stmts/set-constraints"},next:{title:"SET SESSION AUTHORIZATION",permalink:"/docs/sql-stmts/set-session-authorization"}},a={},c=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Notes",id:"notes",level:2},{value:"Examples",id:"examples",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function d(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,n.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.h1,{id:"set-role",children:"SET ROLE"}),"\n",(0,r.jsx)(s.p,{children:"Sets the current role identifier of the current session."}),"\n",(0,r.jsx)(s.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-sql",children:"SET [SESSION | LOCAL] ROLE <rolename>\n\nSET [SESSION | LOCAL] ROLE NONE\n\nRESET ROLE\n"})}),"\n",(0,r.jsx)(s.h2,{id:"description",children:"Description"}),"\n",(0,r.jsxs)(s.p,{children:["This command sets the current role identifier of the current SQL-session context to be rolename. The role name may be written as either an identifier or a string literal. After ",(0,r.jsx)(s.code,{children:"SET ROLE"}),", permissions checking for SQL commands is carried out as though the named role were the one that had logged in originally."]}),"\n",(0,r.jsx)(s.p,{children:"The specified rolename must be a role that the current session user is a member of. If the session user is a superuser, any role can be selected."}),"\n",(0,r.jsxs)(s.p,{children:["The ",(0,r.jsx)(s.code,{children:"NONE"})," and ",(0,r.jsx)(s.code,{children:"RESET"})," forms reset the current role identifier to be the current session role identifier. These forms may be run by any user."]}),"\n",(0,r.jsx)(s.h2,{id:"parameters",children:"Parameters"}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.strong,{children:(0,r.jsx)(s.code,{children:"SESSION"})})}),"\n",(0,r.jsx)(s.p,{children:"Specifies that the command takes effect for the current session. This is the default."}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.strong,{children:(0,r.jsx)(s.code,{children:"LOCAL"})})}),"\n",(0,r.jsxs)(s.p,{children:["Specifies that the command takes effect for only the current transaction. After ",(0,r.jsx)(s.code,{children:"COMMIT"})," or ",(0,r.jsx)(s.code,{children:"ROLLBACK"}),", the session-level setting takes effect again. Note that ",(0,r.jsx)(s.code,{children:"SET LOCAL"})," will appear to have no effect if it is run outside of a transaction."]}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.strong,{children:(0,r.jsx)(s.code,{children:"rolename"})})}),"\n",(0,r.jsx)(s.p,{children:"The name of a role to use for permissions checking in this session."}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.strong,{children:(0,r.jsx)(s.code,{children:"RESET"})})}),"\n",(0,r.jsx)(s.p,{children:"Reset the current role identifier to be the current session role identifier (that of the role used to log in)."}),"\n",(0,r.jsx)(s.h2,{id:"notes",children:"Notes"}),"\n",(0,r.jsxs)(s.p,{children:["Using this command, it is possible to either add privileges or restrict privileges. If the session user role has the ",(0,r.jsx)(s.code,{children:"INHERITS"})," attribute, then it automatically has all the privileges of every role that it could ",(0,r.jsx)(s.code,{children:"SET ROLE"})," to; in this case ",(0,r.jsx)(s.code,{children:"SET ROLE"})," effectively drops all the privileges assigned directly to the session user and to the other roles it is a member of, leaving only the privileges available to the named role. On the other hand, if the session user role has the ",(0,r.jsx)(s.code,{children:"NOINHERITS"})," attribute, ",(0,r.jsx)(s.code,{children:"SET ROLE"})," drops the privileges assigned directly to the session user and instead acquires the privileges available to the named role."]}),"\n",(0,r.jsxs)(s.p,{children:["In particular, when a superuser chooses to ",(0,r.jsx)(s.code,{children:"SET ROLE"})," to a non-superuser role, they lose their superuser privileges."]}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.code,{children:"SET ROLE"})," has effects comparable to ",(0,r.jsx)(s.code,{children:"SET SESSION AUTHORIZATION"}),", but the privilege checks involved are quite different. Also, ",(0,r.jsx)(s.code,{children:"SET SESSION AUTHORIZATION"})," determines which roles are allowable for later ",(0,r.jsx)(s.code,{children:"SET ROLE"})," commands, whereas changing roles with ",(0,r.jsx)(s.code,{children:"SET ROLE"})," does not change the set of roles allowed to a later ",(0,r.jsx)(s.code,{children:"SET ROLE"}),"."]}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.code,{children:"SET ROLE"})," does not process session variables specified by the role's ",(0,r.jsx)(s.code,{children:"ALTER ROLE"})," settings; the session variables are only processed during login."]}),"\n",(0,r.jsx)(s.h2,{id:"examples",children:"Examples"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-sql",children:"SELECT SESSION_USER, CURRENT_USER;\n session_user | current_user \n--------------+--------------\n peter        | peter\n\nSET ROLE 'paul';\n\nSELECT SESSION_USER, CURRENT_USER;\n session_user | current_user \n--------------+--------------\n peter        | paul\n"})}),"\n",(0,r.jsx)(s.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,r.jsxs)(s.p,{children:["Apache Cloudberry allows identifier syntax (rolename), while the SQL standard requires the role name to be written as a string literal. SQL does not allow this command during a transaction; Apache Cloudberry does not make this restriction. The ",(0,r.jsx)(s.code,{children:"SESSION"})," and ",(0,r.jsx)(s.code,{children:"LOCAL"})," modifiers are a Apache Cloudberry extension, as is the ",(0,r.jsx)(s.code,{children:"RESET"})," syntax."]}),"\n",(0,r.jsx)(s.h2,{id:"see-also",children:"See also"}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.a,{href:"/docs/sql-stmts/set-session-authorization",children:(0,r.jsx)(s.code,{children:"SET SESSION AUTHORIZATION"})})})]})}function h(e={}){const{wrapper:s}={...(0,n.a)(),...e.components};return s?(0,r.jsx)(s,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},11151:(e,s,t)=>{t.d(s,{Z:()=>l,a:()=>o});var r=t(67294);const n={},i=r.createContext(n);function o(e){const s=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function l(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:o(e.components),r.createElement(i.Provider,{value:s},e.children)}}}]);