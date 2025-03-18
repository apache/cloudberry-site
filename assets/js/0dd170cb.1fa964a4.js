"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[1071],{55361:(e,s,a)=>{a.r(s),a.d(s,{assets:()=>d,contentTitle:()=>i,default:()=>h,frontMatter:()=>r,metadata:()=>o,toc:()=>l});var t=a(85893),n=a(11151);const r={title:"ALTER DATABASE"},i="ALTER DATABASE",o={id:"sql-stmts/alter-database",title:"ALTER DATABASE",description:"Changes the attributes of a database.",source:"@site/docs/sql-stmts/alter-database.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/alter-database",permalink:"/docs/sql-stmts/alter-database",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/alter-database.md",tags:[],version:"current",lastUpdatedBy:"Dianjin Wang",lastUpdatedAt:1742268909,formattedLastUpdatedAt:"Mar 18, 2025",frontMatter:{title:"ALTER DATABASE"},sidebar:"docsbars",previous:{title:"ALTER CONVERSION",permalink:"/docs/sql-stmts/alter-conversion"},next:{title:"ALTER DEFAULT PRIVILEGES",permalink:"/docs/sql-stmts/alter-default-privileges"}},d={},l=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Notes",id:"notes",level:2},{value:"Examples",id:"examples",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function c(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,n.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(s.h1,{id:"alter-database",children:"ALTER DATABASE"}),"\n",(0,t.jsx)(s.p,{children:"Changes the attributes of a database."}),"\n",(0,t.jsx)(s.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-sql",children:"ALTER DATABASE <name> [ [WITH] <option> [ ... ]  ]\n\n-- where <option> can be:\n\n    ALLOW_CONNECTIONS <allowconn>\n    CONNECTION LIMIT <connlimit>\n    IS_TEMPLATE <istemplate>\n\nALTER DATABASE <name> RENAME TO <new_name>\n\nALTER DATABASE <name> OWNER TO { <new_owner> | CURRENT_USER | SESSION_USER }\n\nALTER DATABASE <name> SET TABLESPACE <new_tablespace>\n\nALTER DATABASE <name> SET <configuration_parameter> { TO | = } { <value> | DEFAULT }\nALTER DATABASE <name> SET <configuration_parameter> FROM CURRENT\nALTER DATABASE <name> RESET <configuration_parameter>\nALTER DATABASE <name> RESET ALL\n"})}),"\n",(0,t.jsx)(s.h2,{id:"description",children:"Description"}),"\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.code,{children:"ALTER DATABASE"})," changes the attributes of a database."]}),"\n",(0,t.jsx)(s.p,{children:"The first form changes the per-database settings. (See below for details.)  Only the database owner or a superuser can change these settings."}),"\n",(0,t.jsxs)(s.p,{children:["The second form changes the name of the database. Only the database owner or a superuser can rename a database; non-superuser owners must also have the ",(0,t.jsx)(s.code,{children:"CREATEDB"})," privilege. You cannot rename the current database. Connect to a different database first."]}),"\n",(0,t.jsxs)(s.p,{children:["The third form changes the owner of the database. To alter the owner, you must own the database and also be a direct or indirect member of the new owning role, and you must have the ",(0,t.jsx)(s.code,{children:"CREATEDB"})," privilege. (Note that superusers have all these privileges automatically.)"]}),"\n",(0,t.jsx)(s.p,{children:"The fourth form changes the default tablespace of the database. Only the database owner or a superuser can do this; you must also have create privilege for the new tablespace. This command physically moves any tables or indexes in the database's old default tablespace to the new tablespace. The new default tablespace must be empty for this database, and no one can be connected to the database. Note that tables and indexes in non-default tablespaces are not affected."}),"\n",(0,t.jsxs)(s.p,{children:["The remaining forms change the session default for a configuration parameter for a Apache Cloudberry. Whenever a new session is subsequently started in that database, the specified value becomes the session default value. The database-specific default overrides whatever setting is present in the server configuration file (",(0,t.jsx)(s.code,{children:"postgresql.conf"}),"). Only the database owner or a superuser can change the session defaults for a database. Certain parameters cannot be set this way, or can only be set by a superuser."]}),"\n",(0,t.jsx)(s.h2,{id:"parameters",children:"Parameters"}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.strong,{children:(0,t.jsx)(s.code,{children:"name"})})}),"\n",(0,t.jsx)(s.p,{children:"The name of the database whose attributes are to be altered."}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.strong,{children:(0,t.jsx)(s.code,{children:"allowconn"})})}),"\n",(0,t.jsxs)(s.p,{children:["If ",(0,t.jsx)(s.code,{children:"false"}),", then no one can connect to this database."]}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.strong,{children:(0,t.jsx)(s.code,{children:"connlimit"})})}),"\n",(0,t.jsxs)(s.p,{children:["The maximum number of concurrent connections allowed to this database on the coordinator. The default is ",(0,t.jsx)(s.code,{children:"-1"}),", no limit. Apache Cloudberry superusers are exempt from this limit."]}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.strong,{children:(0,t.jsx)(s.code,{children:"istemplate"})})}),"\n",(0,t.jsxs)(s.p,{children:["If ",(0,t.jsx)(s.code,{children:"true"}),", then this database can be cloned by any user with ",(0,t.jsx)(s.code,{children:"CREATEDB"})," privileges; if ",(0,t.jsx)(s.code,{children:"false"}),", then only superusers or the owner of the database can clone it. Note that template databases cannot be dropped."]}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.strong,{children:(0,t.jsx)(s.code,{children:"new_name"})})}),"\n",(0,t.jsx)(s.p,{children:"The new name of the database."}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.strong,{children:(0,t.jsx)(s.code,{children:"new_owner"})})}),"\n",(0,t.jsx)(s.p,{children:"The new owner of the database."}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.strong,{children:(0,t.jsx)(s.code,{children:"new_tablespace"})})}),"\n",(0,t.jsx)(s.p,{children:"The new default tablespace of the database."}),"\n",(0,t.jsx)(s.p,{children:"This form of the command cannot be executed inside a transaction block."}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsxs)(s.strong,{children:[(0,t.jsx)(s.code,{children:"configuration_parameter"})," value"]})}),"\n",(0,t.jsxs)(s.p,{children:["Set this database's session default for the specified configuration parameter to the given value. If value is ",(0,t.jsx)(s.code,{children:"DEFAULT"})," or, equivalently, ",(0,t.jsx)(s.code,{children:"RESET"})," is used, the database-specific setting is removed, so the system-wide default setting will be inherited in new sessions. Use ",(0,t.jsx)(s.code,{children:"RESET ALL"})," to clear all database-specific settings. ",(0,t.jsx)(s.code,{children:"SET FROM CURRENT"})," saves the session's current value of the parameter as the database-specific value."]}),"\n",(0,t.jsxs)(s.p,{children:["See ",(0,t.jsx)(s.a,{href:"/docs/sql-stmts/set",children:(0,t.jsx)(s.code,{children:"SET"})})," and Server Configuration Parameters for more information about allowed parameter names and values."]}),"\n",(0,t.jsx)(s.h2,{id:"notes",children:"Notes"}),"\n",(0,t.jsxs)(s.p,{children:["It is also possible to tie a session default to a specific role rather than to a database; see ",(0,t.jsx)(s.a,{href:"/docs/sql-stmts/alter-role",children:(0,t.jsx)(s.code,{children:"ALTER ROLE"})}),". Role-specific settings override database-specific ones if there is a conflict."]}),"\n",(0,t.jsx)(s.h2,{id:"examples",children:"Examples"}),"\n",(0,t.jsxs)(s.p,{children:["To disable index scans by default in the ",(0,t.jsx)(s.code,{children:"test"})," database:"]}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-sql",children:"ALTER DATABASE test SET enable_indexscan TO off;\n"})}),"\n",(0,t.jsxs)(s.p,{children:["To set the default schema search path for the ",(0,t.jsx)(s.code,{children:"mydatabase"})," database:"]}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-sql",children:"ALTER DATABASE mydatabase SET search_path TO myschema, public, pg_catalog;\n"})}),"\n",(0,t.jsx)(s.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,t.jsxs)(s.p,{children:["The ",(0,t.jsx)(s.code,{children:"ALTER DATABASE"})," statement is a Apache Cloudberry extension."]}),"\n",(0,t.jsx)(s.h2,{id:"see-also",children:"See also"}),"\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.a,{href:"/docs/sql-stmts/create-database",children:(0,t.jsx)(s.code,{children:"CREATE DATABASE"})}),", ",(0,t.jsx)(s.a,{href:"/docs/sql-stmts/drop-database",children:(0,t.jsx)(s.code,{children:"DROP DATABASE"})}),", ",(0,t.jsx)(s.a,{href:"/docs/sql-stmts/set",children:"SET"}),", ",(0,t.jsx)(s.a,{href:"/docs/sql-stmts/create-tablespace",children:(0,t.jsx)(s.code,{children:"CREATE TABLESPACE"})})]})]})}function h(e={}){const{wrapper:s}={...(0,n.a)(),...e.components};return s?(0,t.jsx)(s,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},11151:(e,s,a)=>{a.d(s,{Z:()=>o,a:()=>i});var t=a(67294);const n={},r=t.createContext(n);function i(e){const s=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function o(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:i(e.components),t.createElement(r.Provider,{value:s},e.children)}}}]);