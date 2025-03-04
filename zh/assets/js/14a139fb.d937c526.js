"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[7401],{79653:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>l,contentTitle:()=>r,default:()=>h,frontMatter:()=>o,metadata:()=>i,toc:()=>c});var t=s(85893),a=s(11151);const o={title:"DO"},r="DO",i={id:"sql-stmts/do",title:"DO",description:"Runs anonymous code block as a transient anonymous function.",source:"@site/docs/sql-stmts/do.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/do",permalink:"/zh/docs/sql-stmts/do",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/do.md",tags:[],version:"current",lastUpdatedBy:"TomShawn",lastUpdatedAt:1741056503,formattedLastUpdatedAt:"2025\u5e743\u67084\u65e5",frontMatter:{title:"DO"},sidebar:"docsbars",previous:{title:"DISCARD",permalink:"/zh/docs/sql-stmts/discard"},next:{title:"DROP ACCESS METHOD",permalink:"/zh/docs/sql-stmts/drop-access-method"}},l={},c=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Notes",id:"notes",level:2},{value:"Examples",id:"examples",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,a.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"do",children:"DO"}),"\n",(0,t.jsx)(n.p,{children:"Runs anonymous code block as a transient anonymous function."}),"\n",(0,t.jsx)(n.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sql",children:"DO [ LANGUAGE <lang_name> ] <code>\n"})}),"\n",(0,t.jsx)(n.h2,{id:"description",children:"Description"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"DO"})," runs an anonymous code block, or in other words a transient anonymous function in a procedural language."]}),"\n",(0,t.jsxs)(n.p,{children:["The code block is treated as though it were the body of a function with no parameters, returning ",(0,t.jsx)(n.code,{children:"void"}),". It is parsed and run a single time."]}),"\n",(0,t.jsxs)(n.p,{children:["The optional ",(0,t.jsx)(n.code,{children:"LANGUAGE"})," clause can appear either before or after the code block."]}),"\n",(0,t.jsx)(n.p,{children:"Anonymous blocks are procedural language structures that provide the capability to create and run procedural code on the fly without persistently storing the code as database objects in the system catalogs. The concept of anonymous blocks is similar to UNIX shell scripts, which enable several manually entered commands to be grouped and run as one step. As the name implies, anonymous blocks do not have a name, and for this reason they cannot be referenced from other objects. Although built dynamically, anonymous blocks can be easily stored as scripts in the operating system files for repetitive execution."}),"\n",(0,t.jsx)(n.p,{children:"Anonymous blocks are standard procedural language blocks. They carry the syntax and obey the rules that apply to the procedural language, including declaration and scope of variables, execution, exception handling, and language usage."}),"\n",(0,t.jsx)(n.p,{children:"The compilation and execution of anonymous blocks are combined in one step, while a user-defined function needs to be re-defined before use each time its definition changes."}),"\n",(0,t.jsx)(n.h2,{id:"parameters",children:"Parameters"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"code"})})}),"\n",(0,t.jsxs)(n.p,{children:["The procedural language code to be run. This must be specified as a string literal, just as with the ",(0,t.jsx)(n.code,{children:"CREATE FUNCTION"})," command. Use of a dollar-quoted literal is recommended."]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"lang_name"})})}),"\n",(0,t.jsxs)(n.p,{children:["The name of the procedural language in which the code is written. The default is ",(0,t.jsx)(n.code,{children:"plpgsql"}),"."]}),"\n",(0,t.jsx)(n.h2,{id:"notes",children:"Notes"}),"\n",(0,t.jsxs)(n.p,{children:["The procedural language to be used must already have been installed into the current database by means of ",(0,t.jsx)(n.code,{children:"CREATE EXTENSION"}),". The PL/pgSQL language is installed wih Cloudberry Database and is registered by default every user-created database. The PL/Python and PL/Perl languages are installed by default, but not registered. Other languages are neither installed nor registered. The pg_language system catalog contains information about the registered languages in a database."]}),"\n",(0,t.jsxs)(n.p,{children:["The user must have ",(0,t.jsx)(n.code,{children:"USAGE"})," privilege for the procedural language, or must be a superuser if the language is untrusted. This is the same privilege requirement as for creating a function in the language."]}),"\n",(0,t.jsxs)(n.p,{children:["If ",(0,t.jsx)(n.code,{children:"DO"})," is run in a transaction block, then the procedure code cannot execute transaction control statements. Transaction control statements are allowed only if ",(0,t.jsx)(n.code,{children:"DO"})," is run in its own transaction."]}),"\n",(0,t.jsxs)(n.p,{children:["Anonymous blocks do not support function volatility or ",(0,t.jsx)(n.code,{children:"EXECUTE ON"})," attributes."]}),"\n",(0,t.jsx)(n.h2,{id:"examples",children:"Examples"}),"\n",(0,t.jsxs)(n.p,{children:["This PL/pgSQL example grants all privileges on all views in schema ",(0,t.jsx)(n.code,{children:"public"})," to role ",(0,t.jsx)(n.code,{children:"webuser"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sql",children:"DO $$DECLARE r record;\nBEGIN\n    FOR r IN SELECT table_schema, table_name FROM information_schema.tables\n             WHERE table_type = 'VIEW' AND table_schema = 'public'\n    LOOP\n        EXECUTE 'GRANT ALL ON ' || quote_ident(r.table_schema) || '.' || quote_ident(r.table_name) || ' TO webuser';\n    END LOOP;\nEND$$;\n"})}),"\n",(0,t.jsx)(n.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,t.jsxs)(n.p,{children:["There is no ",(0,t.jsx)(n.code,{children:"DO"})," statement in the SQL standard."]}),"\n",(0,t.jsx)(n.h2,{id:"see-also",children:"See also"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.a,{href:"/zh/docs/sql-stmts/create-language",children:"CREATE LANGUAGE"})})]})}function h(e={}){const{wrapper:n}={...(0,a.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},11151:(e,n,s)=>{s.d(n,{Z:()=>i,a:()=>r});var t=s(67294);const a={},o=t.createContext(a);function r(e){const n=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:r(e.components),t.createElement(o.Provider,{value:n},e.children)}}}]);