"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[6881],{7016:(e,s,r)=>{r.r(s),r.d(s,{assets:()=>l,contentTitle:()=>i,default:()=>h,frontMatter:()=>o,metadata:()=>a,toc:()=>d});var n=r(85893),t=r(11151);const o={title:"CREATE ROLE"},i="CREATE ROLE",a={id:"sql-stmts/create-role",title:"CREATE ROLE",description:"Defines a new database role (user or group).",source:"@site/docs/sql-stmts/create-role.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/create-role",permalink:"/docs/sql-stmts/create-role",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/create-role.md",tags:[],version:"current",lastUpdatedBy:"TomShawn",lastUpdatedAt:1740044194,formattedLastUpdatedAt:"Feb 20, 2025",frontMatter:{title:"CREATE ROLE"},sidebar:"docsbars",previous:{title:"CREATE RESOURCE QUEUE",permalink:"/docs/sql-stmts/create-resource-queue"},next:{title:"CREATE RULE",permalink:"/docs/sql-stmts/create-rule"}},l={},d=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Notes",id:"notes",level:2},{value:"Examples",id:"examples",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function c(e){const s={a:"a",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,t.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.h1,{id:"create-role",children:"CREATE ROLE"}),"\n",(0,n.jsx)(s.p,{children:"Defines a new database role (user or group)."}),"\n",(0,n.jsx)(s.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"CREATE ROLE <name> [[WITH] <option> [ ... ]]\n"})}),"\n",(0,n.jsx)(s.p,{children:"where option can be:"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"      SUPERUSER | NOSUPERUSER\n    | CREATEDB | NOCREATEDB\n    | CREATEROLE | NOCREATEROLE\n\xa0\xa0\xa0\xa0| CREATEEXTTABLE | NOCREATEEXTTABLE \n\xa0\xa0\xa0\xa0\xa0\xa0[ ( <attribute>='<value>'[, ...] ) ]\n\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0where <attributes> and <value> are:\n\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0type='readable'|'writable'\n\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0protocol='gpfdist'|'http'\n    | INHERIT | NOINHERIT\n    | LOGIN | NOLOGIN\n    | REPLICATION | NOREPLICATION\n    | BYPASSRLS | NOBYPASSRLS\n    | CONNECTION LIMIT <connlimit>\n    | [ ENCRYPTED ] PASSWORD '<password>' | PASSWORD NULL\n    | VALID UNTIL '<timestamp>' \n    | IN ROLE <role_name> [, ...]\n    | IN GROUP <role_name> [, ...]\n    | ROLE <role_name> [, ...]\n    | ADMIN <role_name> [, ...]\n    | USER <role_name> [, ...]\n    | SYSID <uid> [, ...]\n\xa0\xa0\xa0\xa0| RESOURCE QUEUE <queue_name>\n\xa0\xa0\xa0\xa0| RESOURCE GROUP <group_name>\n    | [ DENY <deny_point> ]\n    | [ DENY BETWEEN <deny_point> AND <deny_point>]\n"})}),"\n",(0,n.jsx)(s.h2,{id:"description",children:"Description"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"CREATE ROLE"})," adds a new role to a Cloudberry Database system. A role is an entity that can own database objects and have database privileges. A role can be considered a user, a group, or both depending on how it is used. You must have ",(0,n.jsx)(s.code,{children:"CREATEROLE"})," privilege or be a database superuser to use this command."]}),"\n",(0,n.jsx)(s.p,{children:"Note that roles are defined at the system-level and are valid for all databases in your Cloudberry Database system."}),"\n",(0,n.jsx)(s.h2,{id:"parameters",children:"Parameters"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"name"})})}),"\n",(0,n.jsx)(s.p,{children:"The name of the new role."}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"SUPERUSER"})}),(0,n.jsx)("br",{}),"\n",(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"NOSUPERUSER"})})]}),"\n",(0,n.jsxs)(s.p,{children:['These clauses determine whether the new role is a "superuser". If ',(0,n.jsx)(s.code,{children:"SUPERUSER"})," is specified, the role being defined will be a superuser, who can override all access restrictions within the database. Superuser status is dangerous and should be used only when really needed. You must yourself be a superuser to create a new superuser. ",(0,n.jsx)(s.code,{children:"NOSUPERUSER"})," is the default."]}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"CREATEDB"})}),(0,n.jsx)("br",{}),"\n",(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"NOCREATEDB"})})]}),"\n",(0,n.jsxs)(s.p,{children:["These clauses define a role's ability to create databases. If ",(0,n.jsx)(s.code,{children:"CREATEDB"})," is specified, the role being defined will be allowed to create new databases. Specifying ",(0,n.jsx)(s.code,{children:"NOCREATEDB"})," (the default) will deny a role the ability to create databases."]}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"CREATEROLE"})}),(0,n.jsx)("br",{}),"\n",(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"NOCREATEROLE"})})]}),"\n",(0,n.jsxs)(s.p,{children:["These clauses determine whether a role will be permitted to create new roles (that is, execute ",(0,n.jsx)(s.code,{children:"CREATE ROLE"}),"). If ",(0,n.jsx)(s.code,{children:"CREATEROLE"})," is specified, the role being defined will be allowed to create new roles, alter other roles, and drop other roles. ",(0,n.jsx)(s.code,{children:"NOCREATEROLE"})," (the default) will deny a role the ability to create roles or modify roles other than their own."]}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"CREATEEXTTABLE"})}),(0,n.jsx)("br",{}),"\n",(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"NOCREATEEXTTABLE"})})]}),"\n",(0,n.jsxs)(s.p,{children:["If ",(0,n.jsx)(s.code,{children:"CREATEEXTTABLE"})," is specified, the role being defined is allowed to create external tables. The default ",(0,n.jsx)(s.code,{children:"type"})," is ",(0,n.jsx)(s.code,{children:"readable"})," and the default ",(0,n.jsx)(s.code,{children:"protocol"})," is ",(0,n.jsx)(s.code,{children:"gpfdist"}),", if not specified. Valid types are ",(0,n.jsx)(s.code,{children:"gpfdist"}),", ",(0,n.jsx)(s.code,{children:"gpfdists"}),", ",(0,n.jsx)(s.code,{children:"http"}),", and ",(0,n.jsx)(s.code,{children:"https"}),". ",(0,n.jsx)(s.code,{children:"NOCREATEEXTTABLE"})," (the default type) denies the role the ability to create external tables. Note that external tables that use the ",(0,n.jsx)(s.code,{children:"file"})," or ",(0,n.jsx)(s.code,{children:"execute"})," protocols can only be created by superusers."]}),"\n",(0,n.jsxs)(s.p,{children:["Use the ",(0,n.jsx)(s.code,{children:"GRANT...ON PROTOCOL"})," command to allow users to create and use external tables with a custom protocol type, including the ",(0,n.jsx)(s.code,{children:"s3"})," and ",(0,n.jsx)(s.code,{children:"pxf"})," protocols included with Cloudberry Database."]}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"INHERIT"})}),(0,n.jsx)("br",{}),"\n",(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"NOINHERIT"})})]}),"\n",(0,n.jsxs)(s.p,{children:['These clauses determine whether a role "inherits" the privileges of roles it is a member of. If specified, ',(0,n.jsx)(s.code,{children:"INHERIT"})," (the default) allows the role to use whatever database privileges have been granted to all roles it is directly or indirectly a member of. With ",(0,n.jsx)(s.code,{children:"NOINHERIT"}),", membership in another role only grants the ability to ",(0,n.jsx)(s.code,{children:"SET ROLE"})," to that other role; the privileges of the other role are only available after having done so."]}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"LOGIN"})}),(0,n.jsx)("br",{}),"\n",(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"NOLOGIN"})})]}),"\n",(0,n.jsxs)(s.p,{children:["These clauses determine whether a role is allowed to log in; that is, whether the role can be given as the initial session authorization name during client connection. If specified, ",(0,n.jsx)(s.code,{children:"LOGIN"})," allows a role to log in to a database. A role having the ",(0,n.jsx)(s.code,{children:"LOGIN"})," attribute can be thought of as a user. Roles with ",(0,n.jsx)(s.code,{children:"NOLOGIN"})," are useful for managing database privileges, but are not users in the usual sense of the word. If not specified, ",(0,n.jsx)(s.code,{children:"NOLOGIN"})," is the default, except when ",(0,n.jsx)(s.code,{children:"CREATE ROLE"})," is invoked through its alternative spelling ",(0,n.jsx)(s.a,{href:"/docs/sql-stmts/create-user",children:"CREATE USER"}),"."]}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"REPLICATION"})}),(0,n.jsx)("br",{}),"\n",(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"NOREPLICATION"})})]}),"\n",(0,n.jsxs)(s.p,{children:["These clauses determine whether a role is a replication role. A role must have this attribute (or be a superuser) in order to be able to connect to the server in replication mode (physical or logical replication) and in order to be able to create or drop replication slots. A role having the ",(0,n.jsx)(s.code,{children:"REPLICATION"})," attribute is a very highly privileged role, and should only be used on roles actually used for replication. If not specified, ",(0,n.jsx)(s.code,{children:"NOREPLICATION"})," is the default. You must be a superuser to create a new role having the ",(0,n.jsx)(s.code,{children:"REPLICATION"})," attribute."]}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"BYPASSRLS"})}),(0,n.jsx)("br",{}),"\n",(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"NOBYPASSRLS"})})]}),"\n",(0,n.jsxs)(s.p,{children:["These clauses determine whether a role bypasses every row-level security (RLS) policy. ",(0,n.jsx)(s.code,{children:"NOBYPASSRLS"})," is the default. You must be a superuser to create a new role having the ",(0,n.jsx)(s.code,{children:"BYPASSRLS"})," attribute."]}),"\n",(0,n.jsxs)(s.p,{children:["Note that ",(0,n.jsx)(s.code,{children:"pg_dump"})," will set row_security to ",(0,n.jsx)(s.code,{children:"OFF"})," by default, to ensure all contents of a table are dumped out. If the user running ",(0,n.jsx)(s.code,{children:"pg_dump"})," does not have appropriate permissions, an error will be returned. However, superusers and the owner of the table being dumped always bypass RLS."]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"CONNECTION LIMIT connlimit"})})}),"\n",(0,n.jsxs)(s.p,{children:["If role can log in, this specifies how many concurrent connections the role can make. The default of ",(0,n.jsx)(s.code,{children:"-1"})," means there is no limit. Note that only normal connections are counted towards this limit. Neither prepared transactions nor background worker connections are counted towards this limit."]}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"[ ENCRYPTED ] PASSWORD 'password'"})}),(0,n.jsx)("br",{}),"\n",(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"PASSWORD NULL"})})]}),"\n",(0,n.jsxs)(s.p,{children:["Sets the role's password. (A password is only of use for roles having the ",(0,n.jsx)(s.code,{children:"LOGIN"})," attribute, but you can nonetheless define one for roles without it.) If you do not plan to use password authentication you can omit this option. If no password is specified, the password will be set to null and password authentication will always fail for that user. A null password can optionally be written explicitly as ",(0,n.jsx)(s.code,{children:"PASSWORD NULL"}),"."]}),"\n",(0,n.jsxs)(s.blockquote,{children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.strong,{children:"Note:"})," Specifying an empty string will also set the password to null, but that was not the case before Cloudberry Database version 7. In earlier versions, an empty string could be used, or not, depending on the authentication method and the exact version, and ",(0,n.jsx)(s.code,{children:"libpq"})," would refuse to use it in any case. To avoid the ambiguity, specifying an empty string should be avoided."]}),"\n"]}),"\n",(0,n.jsxs)(s.p,{children:["The password is always stored encrypted in the system catalogs. The ",(0,n.jsx)(s.code,{children:"ENCRYPTED"})," keyword has no effect, but is accepted for backwards compatibility. The method of encryption is determined by the configuration parameter ",(0,n.jsx)(s.code,{children:"password_encryption"}),". If the presented password string is already in MD5-encrypted or SCRAM-encrypted format, then it is stored as-is regardless of ",(0,n.jsx)(s.code,{children:"password_encryption"})," (since the system cannot decrypt the specified encrypted password string, to encrypt it in a different format). This allows reloading of encrypted passwords during dump/restore."]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"VALID UNTIL 'timestamp'"})})}),"\n",(0,n.jsx)(s.p,{children:"The VALID UNTIL clause sets a date and time after which the role's password is no longer valid. If this clause is omitted the password will never expire."}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"IN ROLE role_name"})})}),"\n",(0,n.jsxs)(s.p,{children:["Adds the new role as a member of the named roles. (Note that there is no option to add the new role as an administrator; use a separate ",(0,n.jsx)(s.code,{children:"GRANT"})," command to do that.)"]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"IN GROUP role_name"})})}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"IN GROUP"})," is an obsolete spelling of ",(0,n.jsx)(s.code,{children:"IN ROLE"}),"."]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"ROLE role_name"})})}),"\n",(0,n.jsx)(s.p,{children:'Adds the named roles as members of this role. (This in effect makes the new role a "group".)'}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"ADMIN rolename"})})}),"\n",(0,n.jsxs)(s.p,{children:["The ",(0,n.jsx)(s.code,{children:"ADMIN"})," clause is like ",(0,n.jsx)(s.code,{children:"ROLE"}),", but the named roles are added to the new role ",(0,n.jsx)(s.code,{children:"WITH ADMIN OPTION"}),", giving them the right to grant membership in this role to others."]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"USER role_name"})})}),"\n",(0,n.jsxs)(s.p,{children:["The ",(0,n.jsx)(s.code,{children:"USER"})," clause is an obsolete spelling of the ",(0,n.jsx)(s.code,{children:"ROLE"})," clause."]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"SYSID uid"})})}),"\n",(0,n.jsxs)(s.p,{children:["The ",(0,n.jsx)(s.code,{children:"SYSID"})," clause is ignored, but is accepted for backwards compatibility."]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"RESOURCE GROUP group_name"})})}),"\n",(0,n.jsx)(s.p,{children:"The name of the resource group to assign to the new role. The role will be subject to the concurrent transaction, memory, and CPU limits configured for the resource group. You can assign a single resource group to one or more roles."}),"\n",(0,n.jsxs)(s.p,{children:["If you do not specify a resource group for a new role, the role is automatically assigned the default resource group for the role's capability, ",(0,n.jsx)(s.code,{children:"admin_group"})," for ",(0,n.jsx)(s.code,{children:"SUPERUSER"})," roles, ",(0,n.jsx)(s.code,{children:"default_group"})," for non-admin roles."]}),"\n",(0,n.jsxs)(s.p,{children:["You can assign the ",(0,n.jsx)(s.code,{children:"admin_group"})," resource group to any role having the ",(0,n.jsx)(s.code,{children:"SUPERUSER"})," attribute."]}),"\n",(0,n.jsxs)(s.p,{children:["You can assign the ",(0,n.jsx)(s.code,{children:"default_group"})," resource group to any role."]}),"\n",(0,n.jsx)(s.p,{children:"You cannot assign a resource group that you create for an external component to a role."}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"RESOURCE QUEUE queue_name"})})}),"\n",(0,n.jsxs)(s.p,{children:["The name of the resource queue to which the new user-level role is to be assigned. Only roles with ",(0,n.jsx)(s.code,{children:"LOGIN"})," privilege can be assigned to a resource queue. The special keyword ",(0,n.jsx)(s.code,{children:"NONE"})," means that the role is assigned to the default resource queue. A role can only belong to one resource queue."]}),"\n",(0,n.jsxs)(s.p,{children:["Roles with the ",(0,n.jsx)(s.code,{children:"SUPERUSER"})," attribute are exempt from resource queue limits. For a superuser role, queries always run immediately regardless of limits imposed by an assigned resource queue."]}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"DENY deny_point"})}),(0,n.jsx)("br",{}),"\n",(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"DENY BETWEEN deny_point AND deny_point"})})]}),"\n",(0,n.jsxs)(s.p,{children:["The ",(0,n.jsx)(s.code,{children:"DENY"})," and ",(0,n.jsx)(s.code,{children:"DENY BETWEEN"})," keywords set time-based constraints that are enforced at login. ",(0,n.jsx)(s.code,{children:"DENY"})," sets a day or a day and time to deny access. ",(0,n.jsx)(s.code,{children:"DENY BETWEEN"})," sets an interval during which access is denied. Both use the parameter deny_point that has the following format:"]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"DAY day [ TIME 'time' ]\n"})}),"\n",(0,n.jsxs)(s.p,{children:["The two parts of the ",(0,n.jsx)(s.code,{children:"deny_point"})," parameter use the following formats:"]}),"\n",(0,n.jsxs)(s.p,{children:["For ",(0,n.jsx)(s.code,{children:"day"}),":"]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"{'Sunday' | 'Monday' | 'Tuesday' |'Wednesday' | 'Thursday' | 'Friday' | \n'Saturday' | 0-6 }\n"})}),"\n",(0,n.jsxs)(s.p,{children:["For ",(0,n.jsx)(s.code,{children:"time"}),":"]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"{ 00-23 : 00-59 | 01-12 : 00-59 { AM | PM }}\n"})}),"\n",(0,n.jsxs)(s.p,{children:["The ",(0,n.jsx)(s.code,{children:"DENY BETWEEN"})," clause uses two deny_point parameters:"]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"DENY BETWEEN <deny_point> AND <deny_point>\n"})}),"\n",(0,n.jsx)(s.h2,{id:"notes",children:"Notes"}),"\n",(0,n.jsxs)(s.p,{children:["Use ",(0,n.jsx)(s.a,{href:"/docs/sql-stmts/alter-role",children:"ALTER ROLE"})," to change the attributes of a role, and ",(0,n.jsx)(s.a,{href:"/docs/sql-stmts/drop-role",children:"DROP ROLE"})," to remove a role. All the attributes specified by ",(0,n.jsx)(s.code,{children:"CREATE ROLE"})," can be modified by later ",(0,n.jsx)(s.code,{children:"ALTER ROLE"})," commands."]}),"\n",(0,n.jsxs)(s.p,{children:["The preferred way to add and remove role members of roles is to use ",(0,n.jsx)(s.a,{href:"/docs/sql-stmts/grant",children:"GRANT"})," and ",(0,n.jsx)(s.a,{href:"/docs/sql-stmts/revoke",children:"REVOKE"}),"."]}),"\n",(0,n.jsxs)(s.p,{children:["The ",(0,n.jsx)(s.code,{children:"VALID UNTIL"})," clause defines an expiration time for a password only, not for the role ",(0,n.jsx)(s.em,{children:"per se"}),". The expiration time is not enforced when logging in using a non-password-based authentication method."]}),"\n",(0,n.jsxs)(s.p,{children:["The ",(0,n.jsx)(s.code,{children:"INHERIT"})," attribute governs inheritance of grantable privileges (access privileges for database objects and role memberships). It does not apply to the special role attributes set by ",(0,n.jsx)(s.code,{children:"CREATE ROLE"})," and ",(0,n.jsx)(s.code,{children:"ALTER ROLE"}),". For example, being a member of a role with ",(0,n.jsx)(s.code,{children:"CREATEDB"})," privilege does not immediately grant the ability to create databases, even if ",(0,n.jsx)(s.code,{children:"INHERIT"})," is set; it would be necessary to become that role via ",(0,n.jsx)(s.a,{href:"/docs/sql-stmts/set-role",children:"SET ROLE"})," before creating a database."]}),"\n",(0,n.jsxs)(s.p,{children:["The ",(0,n.jsx)(s.code,{children:"INHERIT"})," attribute is the default for reasons of backwards compatibility. In prior releases of Cloudberry Database, users always had access to all privileges of groups they were members of. However, ",(0,n.jsx)(s.code,{children:"NOINHERIT"})," provides a closer match to the semantics specified in the SQL standard."]}),"\n",(0,n.jsxs)(s.p,{children:["Be careful with the ",(0,n.jsx)(s.code,{children:"CREATEROLE"})," privilege. There is no concept of inheritance for the privileges of a ",(0,n.jsx)(s.code,{children:"CREATEROLE"}),"-role. That means that even if a role does not have a certain privilege but is allowed to create other roles, it can easily create another role with different privileges than its own (except for creating roles with superuser privileges). For example, if a role has the ",(0,n.jsx)(s.code,{children:"CREATEROLE"})," privilege but not the ",(0,n.jsx)(s.code,{children:"CREATEDB"})," privilege, it can create a new role with the ",(0,n.jsx)(s.code,{children:"CREATEDB"})," privilege. Therefore, regard roles that have the ",(0,n.jsx)(s.code,{children:"CREATEROLE"})," privilege as almost-superuser-roles."]}),"\n",(0,n.jsxs)(s.p,{children:["Cloudberry Database includes a program createuser that has the same functionality as ",(0,n.jsx)(s.code,{children:"CREATE ROLE"})," (in fact, it calls this command) but can be run from the command shell."]}),"\n",(0,n.jsxs)(s.p,{children:["The ",(0,n.jsx)(s.code,{children:"CONNECTION LIMIT"}),' option is only enforced approximately; if two new sessions start at about the same time when just one connection "slot" remains for the role, it is possible that both will fail. Also, the limit is never enforced for superusers.']}),"\n",(0,n.jsxs)(s.p,{children:["You must exercise caution when specifying an unencrypted password with this command. The password will be transmitted to the server in clear-text, and it might also be logged in the client's command history or the server log. The client program createuser, however, transmits the password encrypted. Also, psql contains a command ",(0,n.jsx)(s.code,{children:"\\password"})," that can be used to safely change the password later."]}),"\n",(0,n.jsx)(s.h2,{id:"examples",children:"Examples"}),"\n",(0,n.jsx)(s.p,{children:"Create a role that can log in, but don't give it a password:"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"CREATE ROLE jonathan LOGIN;\n"})}),"\n",(0,n.jsx)(s.p,{children:"Create a role with a password:"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"CREATE USER davide WITH PASSWORD 'jw8s0F4';\n"})}),"\n",(0,n.jsxs)(s.p,{children:["(",(0,n.jsx)(s.code,{children:"CREATE USER"})," is the same as ",(0,n.jsx)(s.code,{children:"CREATE ROLE"})," except that it implies ",(0,n.jsx)(s.code,{children:"LOGIN"}),".)"]}),"\n",(0,n.jsx)(s.p,{children:"Create a role with a password that is valid until the end of 2022:"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"CREATE USER joelle WITH LOGIN PASSWORD 'jw8s0F4' VALID UNTIL '2023-01-01';\n"})}),"\n",(0,n.jsx)(s.p,{children:"Create a role that can create databases and manage other roles:"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"CREATE ROLE admin WITH CREATEDB CREATEROLE;\n"})}),"\n",(0,n.jsx)(s.p,{children:"Create a role that does not allow login access on Sundays:"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"CREATE ROLE user3 DENY DAY 'Sunday';\n"})}),"\n",(0,n.jsx)(s.p,{children:"Create a role that can create readable and writable external tables of type 'gpfdist':"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"CREATE ROLE jan WITH CREATEEXTTABLE(type='readable', protocol='gpfdist')\n   CREATEEXTTABLE(type='writable', protocol='gpfdist'); \n"})}),"\n",(0,n.jsx)(s.p,{children:"Create a role, assigning a resource group:"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"CREATE ROLE bill RESOURCE GROUP rg_light;\n"})}),"\n",(0,n.jsx)(s.p,{children:"Create a role that belongs to a resource queue:"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"CREATE ROLE jonathan LOGIN RESOURCE QUEUE poweruser;\n"})}),"\n",(0,n.jsx)(s.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"CREATE ROLE"})," is in the SQL standard, but the standard only requires the syntax:"]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-sql",children:"CREATE ROLE <name> [WITH ADMIN <rolename>]\n"})}),"\n",(0,n.jsxs)(s.p,{children:["Allowing multiple initial administrators, and all the other options of ",(0,n.jsx)(s.code,{children:"CREATE ROLE"}),", are Cloudberry Database extensions."]}),"\n",(0,n.jsx)(s.p,{children:"The SQL standard defines the concepts of users and roles, but it regards them as distinct concepts and leaves all commands defining users to be specified by the database implementation. In Cloudberry Database users and roles are unified into a single type of object. Roles therefore have many more optional attributes than they do in the standard."}),"\n",(0,n.jsxs)(s.p,{children:["The behavior specified by the SQL standard is most closely approximated by giving users the ",(0,n.jsx)(s.code,{children:"NOINHERIT"})," attribute, while roles are given the ",(0,n.jsx)(s.code,{children:"INHERIT"})," attribute."]}),"\n",(0,n.jsx)(s.h2,{id:"see-also",children:"See also"}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.a,{href:"/docs/sql-stmts/set-role",children:"SET ROLE"}),", ",(0,n.jsx)(s.a,{href:"/docs/sql-stmts/alter-role",children:"ALTER ROLE"}),", ",(0,n.jsx)(s.a,{href:"/docs/sql-stmts/drop-role",children:"DROP ROLE"}),", ",(0,n.jsx)(s.a,{href:"/docs/sql-stmts/grant",children:"GRANT"}),", ",(0,n.jsx)(s.a,{href:"/docs/sql-stmts/revoke",children:"REVOKE"}),", ",(0,n.jsx)(s.a,{href:"/docs/sql-stmts/create-resource-queue",children:"CREATE RESOURCE QUEUE"})," ",(0,n.jsx)(s.a,{href:"/docs/sql-stmts/create-resource-group",children:"CREATE RESOURCE GROUP"}),", createuser"]})]})}function h(e={}){const{wrapper:s}={...(0,t.a)(),...e.components};return s?(0,n.jsx)(s,{...e,children:(0,n.jsx)(c,{...e})}):c(e)}},11151:(e,s,r)=>{r.d(s,{Z:()=>a,a:()=>i});var n=r(67294);const t={},o=n.createContext(t);function i(e){const s=n.useContext(o);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function a(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:i(e.components),n.createElement(o.Provider,{value:s},e.children)}}}]);