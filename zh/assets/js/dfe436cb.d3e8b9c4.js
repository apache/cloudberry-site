"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[439],{89479:(e,s,t)=>{t.r(s),t.d(s,{assets:()=>o,contentTitle:()=>l,default:()=>h,frontMatter:()=>i,metadata:()=>a,toc:()=>d});var r=t(85893),n=t(11151);const i={title:"Manage Roles and Privileges"},l="Manage Roles and Privileges in Apache Cloudberry",a={id:"security/manage-roles-and-privileges",title:"Manage Roles and Privileges",description:"The Apache Cloudberry authorization mechanism stores roles and privileges to access database objects in the database and is administered using SQL statements or command-line utilities.",source:"@site/docs/security/manage-roles-and-privileges.md",sourceDirName:"security",slug:"/security/manage-roles-and-privileges",permalink:"/zh/docs/security/manage-roles-and-privileges",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/security/manage-roles-and-privileges.md",tags:[],version:"current",lastUpdatedBy:"Alwin",lastUpdatedAt:1744282709,formattedLastUpdatedAt:"2025\u5e744\u670810\u65e5",frontMatter:{title:"Manage Roles and Privileges"},sidebar:"docsbars",previous:{title:"Security and Permission",permalink:"/zh/docs/security/"},next:{title:"Configure Client Authentication",permalink:"/zh/docs/security/client-auth"}},o={},d=[{value:"Security best practices for roles and privileges",id:"security-best-practices-for-roles-and-privileges",level:2},{value:"Create new roles (users)",id:"create-new-roles-users",level:2},{value:"Alter role attributes",id:"alter-role-attributes",level:3},{value:"Role membership",id:"role-membership",level:2},{value:"Manage object privileges",id:"manage-object-privileges",level:2},{value:"Encrypt data",id:"encrypt-data",level:2}];function c(e){const s={a:"a",admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,n.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.h1,{id:"manage-roles-and-privileges-in-apache-cloudberry",children:"Manage Roles and Privileges in Apache Cloudberry"}),"\n",(0,r.jsx)(s.p,{children:"The Apache Cloudberry authorization mechanism stores roles and privileges to access database objects in the database and is administered using SQL statements or command-line utilities."}),"\n",(0,r.jsxs)(s.p,{children:["Apache Cloudberry manages database access privileges using ",(0,r.jsx)(s.em,{children:"roles"}),". The concept of roles subsumes the concepts of ",(0,r.jsx)(s.em,{children:"users"})," and ",(0,r.jsx)(s.em,{children:"groups"}),". A role can be a database user, a group, or both. Roles can own database objects (for example, tables) and can assign privileges on those objects to other roles to control access to the objects. Roles can be members of other roles, thus a member role can inherit the object privileges of its parent role."]}),"\n",(0,r.jsx)(s.p,{children:"Every Apache Cloudberry system contains a set of database roles (users and groups). Those roles are separate from the users and groups managed by the operating system on which the server runs. However, for convenience you may want to maintain a relationship between operating system user names and Apache Cloudberry role names, since many of the client applications use the current operating system user name as the default."}),"\n",(0,r.jsx)(s.p,{children:"In Apache Cloudberry, users log in and connect through the coordinator instance, which then verifies their role and access privileges. The coordinator then issues commands to the segment instances behind the scenes as the currently logged-in role."}),"\n",(0,r.jsx)(s.p,{children:"Roles are defined at the system level, meaning they are valid for all databases in the system."}),"\n",(0,r.jsxs)(s.p,{children:["In order to bootstrap the Apache Cloudberry system, a freshly initialized system always contains one predefined ",(0,r.jsx)(s.em,{children:"superuser"})," role (also referred to as the system user). This role will have the same name as the operating system user that initialized the Apache Cloudberry system. Customarily, this role is named ",(0,r.jsx)(s.code,{children:"gpadmin"}),". In order to create more roles you first have to connect as this initial role."]}),"\n",(0,r.jsx)(s.h2,{id:"security-best-practices-for-roles-and-privileges",children:"Security best practices for roles and privileges"}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"Secure the gpadmin system user."})," Apache Cloudberry requires a UNIX user ID to install and initialize the Apache Cloudberry system. This system user is referred to as ",(0,r.jsx)(s.code,{children:"gpadmin"})," in the Apache Cloudberry documentation. This ",(0,r.jsx)(s.code,{children:"gpadmin"})," user is the default database superuser in Apache Cloudberry, as well as the file system owner of the Apache Cloudberry installation and its underlying data files. This default administrator account is fundamental to the design of Apache Cloudberry. The system cannot run without it, and there is no way to limit the access of this gpadmin user ID. Use roles to manage who has access to the database for specific purposes. You should only use the ",(0,r.jsx)(s.code,{children:"gpadmin"})," account for system maintenance tasks such as expansion and upgrade. Anyone who logs on to a Apache Cloudberry host as this user ID can read, alter or delete any data, including system catalog data and database access rights. Therefore, it is very important to secure the gpadmin user ID and only provide access to essential system administrators. Administrators should only log in to Apache Cloudberry as ",(0,r.jsx)(s.code,{children:"gpadmin"})," when performing certain system maintenance tasks (such as upgrade or expansion). Database users should never log on as ",(0,r.jsx)(s.code,{children:"gpadmin"}),", and ETL or production workloads should never run as ",(0,r.jsx)(s.code,{children:"gpadmin"}),"."]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"Assign a distinct role to each user that logs in."})," For logging and auditing purposes, each user that is allowed to log in to Apache Cloudberry should be given their own database role. For applications or web services, consider creating a distinct role for each application or service. See ",(0,r.jsx)(s.a,{href:"#create-new-roles-users",children:"Create New Roles (Users)"}),"."]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"Use groups to manage access privileges."})," See ",(0,r.jsx)(s.a,{href:"#role-membership",children:"Role membership"}),"."]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"Limit users who have the SUPERUSER role attribute."})," Roles that are superusers bypass all access privilege checks in Apache Cloudberry, as well as resource queuing. Only system administrators should be given superuser rights. See ",(0,r.jsx)(s.a,{href:"#alter-role-attributes",children:"Altering Role Attributes"}),"."]}),"\n"]}),"\n",(0,r.jsx)(s.h2,{id:"create-new-roles-users",children:"Create new roles (users)"}),"\n",(0,r.jsxs)(s.p,{children:["A user-level role is considered to be a database role that can log in to the database and initiate a database session. Therefore, when you create a new user-level role using the ",(0,r.jsx)(s.code,{children:"CREATE ROLE"})," command, you must specify the ",(0,r.jsx)(s.code,{children:"LOGIN"})," privilege. For example:"]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-sql",children:"=# CREATE ROLE jsmith WITH LOGIN;\n"})}),"\n",(0,r.jsxs)(s.p,{children:["A database role may have a number of attributes that define what sort of tasks that role can perform in the database. You can set these attributes when you create the role, or later using the ",(0,r.jsx)(s.code,{children:"ALTER ROLE"})," command."]}),"\n",(0,r.jsx)(s.h3,{id:"alter-role-attributes",children:"Alter role attributes"}),"\n",(0,r.jsx)(s.p,{children:"A database role might have a number of attributes that define what sort of tasks that role can perform in the database."}),"\n",(0,r.jsxs)(s.table,{children:[(0,r.jsx)(s.thead,{children:(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.th,{children:"Attributes"}),(0,r.jsx)(s.th,{children:"Description"})]})}),(0,r.jsxs)(s.tbody,{children:[(0,r.jsxs)(s.tr,{children:[(0,r.jsxs)(s.td,{children:[(0,r.jsx)(s.code,{children:"SUPERUSER"})," or ",(0,r.jsx)(s.code,{children:"NOSUPERUSER"})]}),(0,r.jsxs)(s.td,{children:["Determines if the role is a superuser. You must yourself be a superuser to create a new superuser. ",(0,r.jsx)(s.code,{children:"NOSUPERUSER"})," is the default."]})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsxs)(s.td,{children:[(0,r.jsx)(s.code,{children:"CREATEDB"})," or ",(0,r.jsx)(s.code,{children:"NOCREATEDB"})]}),(0,r.jsxs)(s.td,{children:["Determines if the role is allowed to create databases. ",(0,r.jsx)(s.code,{children:"NOCREATEDB"})," is the default."]})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsxs)(s.td,{children:[(0,r.jsx)(s.code,{children:"CREATEROLE"})," or ",(0,r.jsx)(s.code,{children:"NOCREATEROLE"})]}),(0,r.jsxs)(s.td,{children:["Determines if the role is allowed to create and manage other roles. ",(0,r.jsx)(s.code,{children:"NOCREATEROLE"})," is the default."]})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsxs)(s.td,{children:[(0,r.jsx)(s.code,{children:"INHERIT"})," or ",(0,r.jsx)(s.code,{children:"NOINHERIT"})]}),(0,r.jsxs)(s.td,{children:["Determines whether a role inherits the privileges of roles it is a member. A role with the ",(0,r.jsx)(s.code,{children:"INHERIT"})," attribute can automatically use whatever database privileges have been granted to all roles it is directly or indirectly a member of. ",(0,r.jsx)(s.code,{children:"INHERIT"})," is the default."]})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsxs)(s.td,{children:[(0,r.jsx)(s.code,{children:"LOGIN"})," or ",(0,r.jsx)(s.code,{children:"NOLOGIN"})]}),(0,r.jsxs)(s.td,{children:["Determines whether a role is allowed to log in. A role having the ",(0,r.jsx)(s.code,{children:"LOGIN"})," attribute can be thought of as a user. Roles without this attribute are useful for managing database privileges (groups). ",(0,r.jsx)(s.code,{children:"NOLOGIN"})," is the default."]})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"CONNECTION LIMIT *connlimit*"})}),(0,r.jsx)(s.td,{children:"If role can log in, this specifies how many concurrent connections the role can make. -1 (the default) means no limit."})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsxs)(s.td,{children:[(0,r.jsx)(s.code,{children:"CREATEEXTTABLE"})," or ",(0,r.jsx)(s.code,{children:"NOCREATEEXTTABLE"})]}),(0,r.jsxs)(s.td,{children:["Determines whether a role is allowed to create external tables. ",(0,r.jsx)(s.code,{children:"NOCREATEEXTTABLE"})," is the default. For a role with the ",(0,r.jsx)(s.code,{children:"CREATEEXTTABLE"})," attribute, the default external table ",(0,r.jsx)(s.code,{children:"type"})," is ",(0,r.jsx)(s.code,{children:"readable"})," and the default ",(0,r.jsx)(s.code,{children:"protocol"})," is ",(0,r.jsx)(s.code,{children:"gpfdist"}),". Note that external tables that use the ",(0,r.jsx)(s.code,{children:"file"})," protocol can only be created by superusers."]})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"PASSWORD '*password*'"})}),(0,r.jsxs)(s.td,{children:["Sets the role's password. If you do not plan to use password authentication you can omit this option. If no password is specified, the password will be set to null and password authentication will always fail for that user. A null password can optionally be written explicitly as ",(0,r.jsx)(s.code,{children:"PASSWORD NULL"}),"."]})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsxs)(s.td,{children:[(0,r.jsx)(s.code,{children:"DENY deny_interval"})," or ",(0,r.jsx)(s.code,{children:"DENY deny_point"})]}),(0,r.jsxs)(s.td,{children:["Restricts access during an interval, specified by day or day and time. For more information see ",(0,r.jsx)(s.a,{href:"#time-based-authentication",children:"Time-based authentication"}),"."]})]})]})]}),"\n",(0,r.jsxs)(s.p,{children:["You can set these attributes when you create the role, or later using the ",(0,r.jsx)(s.code,{children:"ALTER ROLE"})," command. For example:"]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-sql",children:"=# ALTER ROLE jsmith WITH PASSWORD 'passwd123';\n=# ALTER ROLE jsmith LOGIN;\n=# ALTER ROLE jsmith DENY DAY 'Sunday';\n"})}),"\n",(0,r.jsx)(s.p,{children:"A role can also have role-specific defaults for many of the server configuration settings. For example, to set the default schema search path for a role:"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-sql",children:"=# ALTER ROLE admin SET search_path TO myschema, public;\n"})}),"\n",(0,r.jsx)(s.h2,{id:"role-membership",children:"Role membership"}),"\n",(0,r.jsx)(s.p,{children:"It is frequently convenient to group users together to ease management of object privileges: that way, privileges can be granted to, or revoked from, a group as a whole. In Apache Cloudberry, this is done by creating a role that represents the group, and then granting membership in the group role to individual user roles."}),"\n",(0,r.jsxs)(s.p,{children:["Use the ",(0,r.jsx)(s.code,{children:"CREATE ROLE"})," SQL command to create a new group role. For example:"]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-sql",children:"=# CREATE ROLE admin CREATEROLE CREATEDB;\n"})}),"\n",(0,r.jsxs)(s.p,{children:["Once the group role exists, you can add and remove members (user roles) using the ",(0,r.jsx)(s.code,{children:"GRANT"})," and ",(0,r.jsx)(s.code,{children:"REVOKE"})," commands. For example:"]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-sql",children:"=# GRANT admin TO john, sally;\n=# REVOKE admin FROM bob;\n"})}),"\n",(0,r.jsxs)(s.p,{children:["For managing object privileges, you would then grant the appropriate privileges to the group-level role only (see ",(0,r.jsx)(s.a,{href:"#manage-object-privileges",children:"Managing object privileges"}),"). The member user roles then inherit the object privileges of the group role. For example:"]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-sql",children:"=# GRANT ALL ON TABLE mytable TO admin;\n=# GRANT ALL ON SCHEMA myschema TO admin;\n=# GRANT ALL ON DATABASE mydb TO admin;\n"})}),"\n",(0,r.jsxs)(s.p,{children:["The role attributes ",(0,r.jsx)(s.code,{children:"LOGIN"}),", ",(0,r.jsx)(s.code,{children:"SUPERUSER"}),", ",(0,r.jsx)(s.code,{children:"CREATEDB"}),", ",(0,r.jsx)(s.code,{children:"CREATEROLE"}),", ",(0,r.jsx)(s.code,{children:"CREATEEXTTABLE"}),", and ",(0,r.jsx)(s.code,{children:"RESOURCE QUEUE"})," are never inherited as ordinary privileges on database objects are. User members must actually ",(0,r.jsx)(s.code,{children:"SET ROLE"})," to a specific role having one of these attributes in order to make use of the attribute. In the above example, we gave ",(0,r.jsx)(s.code,{children:"CREATEDB"})," and ",(0,r.jsx)(s.code,{children:"CREATEROLE"})," to the ",(0,r.jsx)(s.code,{children:"admin"})," role. If ",(0,r.jsx)(s.code,{children:"sally"})," is a member of ",(0,r.jsx)(s.code,{children:"admin"}),", then ",(0,r.jsx)(s.code,{children:"sally"})," could issue the following command to assume the role attributes of the parent role:"]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-sql",children:"=> SET ROLE admin;\n"})}),"\n",(0,r.jsx)(s.h2,{id:"manage-object-privileges",children:"Manage object privileges"}),"\n",(0,r.jsx)(s.p,{children:"When an object (table, view, sequence, database, function, language, schema, or tablespace) is created, it is assigned an owner. The owner is normally the role that ran the creation statement. For most kinds of objects, the initial state is that only the owner (or a superuser) can do anything with the object. To allow other roles to use it, privileges must be granted. Apache Cloudberry supports the following privileges for each object type:"}),"\n",(0,r.jsxs)(s.table,{children:[(0,r.jsx)(s.thead,{children:(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.th,{style:{textAlign:"left"},children:"Object Type"}),(0,r.jsx)(s.th,{style:{textAlign:"left"},children:"privileges"})]})}),(0,r.jsxs)(s.tbody,{children:[(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{style:{textAlign:"left"},children:"Tables, External Tables, Views"}),(0,r.jsxs)(s.td,{style:{textAlign:"left"},children:[(0,r.jsx)(s.code,{children:"SELECT"}),", ",(0,r.jsx)(s.code,{children:"INSERT"}),", ",(0,r.jsx)(s.code,{children:"UPDATE"}),", ",(0,r.jsx)(s.code,{children:"DELETE"}),", ",(0,r.jsx)(s.code,{children:"REFERENCES"}),", ",(0,r.jsx)(s.code,{children:"TRIGGER"}),", ",(0,r.jsx)(s.code,{children:"TRUNCATE"}),", ",(0,r.jsx)(s.code,{children:"ALL"})]})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{style:{textAlign:"left"},children:"Columns"}),(0,r.jsxs)(s.td,{style:{textAlign:"left"},children:[(0,r.jsx)(s.code,{children:"SELECT"}),", ",(0,r.jsx)(s.code,{children:"INSERT"}),", ",(0,r.jsx)(s.code,{children:"UPDATE"}),", ",(0,r.jsx)(s.code,{children:"REFERENCES"}),", ",(0,r.jsx)(s.code,{children:"ALL"})]})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{style:{textAlign:"left"},children:"Sequences"}),(0,r.jsxs)(s.td,{style:{textAlign:"left"},children:[(0,r.jsx)(s.code,{children:"USAGE"}),", ",(0,r.jsx)(s.code,{children:"SELECT"}),", ",(0,r.jsx)(s.code,{children:"UPDATE"}),", ",(0,r.jsx)(s.code,{children:"ALL"})]})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{style:{textAlign:"left"},children:"Databases"}),(0,r.jsxs)(s.td,{style:{textAlign:"left"},children:[(0,r.jsx)(s.code,{children:"CREATE"}),", ",(0,r.jsx)(s.code,{children:"CONNECT"}),", ",(0,r.jsx)(s.code,{children:"TEMPORARY"}),", ",(0,r.jsx)(s.code,{children:"TEMP"}),", ",(0,r.jsx)(s.code,{children:"ALL"})]})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{style:{textAlign:"left"},children:"Domains"}),(0,r.jsxs)(s.td,{style:{textAlign:"left"},children:[(0,r.jsx)(s.code,{children:"USAGE"}),", ",(0,r.jsx)(s.code,{children:"ALL"})]})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{style:{textAlign:"left"},children:"Foreign Data Wrappers"}),(0,r.jsxs)(s.td,{style:{textAlign:"left"},children:[(0,r.jsx)(s.code,{children:"USAGE"}),", ",(0,r.jsx)(s.code,{children:"ALL"})]})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{style:{textAlign:"left"},children:"Foreign Servers"}),(0,r.jsxs)(s.td,{style:{textAlign:"left"},children:[(0,r.jsx)(s.code,{children:"USAGE"}),", ",(0,r.jsx)(s.code,{children:"ALL"})]})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{style:{textAlign:"left"},children:"Functions"}),(0,r.jsxs)(s.td,{style:{textAlign:"left"},children:[(0,r.jsx)(s.code,{children:"EXECUTE"}),", ",(0,r.jsx)(s.code,{children:"ALL"})]})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{style:{textAlign:"left"},children:"Procedural Languages"}),(0,r.jsxs)(s.td,{style:{textAlign:"left"},children:[(0,r.jsx)(s.code,{children:"USAGE"}),", ",(0,r.jsx)(s.code,{children:"ALL"})]})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{style:{textAlign:"left"},children:"Schemas"}),(0,r.jsxs)(s.td,{style:{textAlign:"left"},children:[(0,r.jsx)(s.code,{children:"CREATE"}),", ",(0,r.jsx)(s.code,{children:"USAGE"}),", ",(0,r.jsx)(s.code,{children:"ALL"})]})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{style:{textAlign:"left"},children:"Tablespaces"}),(0,r.jsxs)(s.td,{style:{textAlign:"left"},children:[(0,r.jsx)(s.code,{children:"CREATE"}),", ",(0,r.jsx)(s.code,{children:"ALL"})]})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{style:{textAlign:"left"},children:"Types"}),(0,r.jsxs)(s.td,{style:{textAlign:"left"},children:[(0,r.jsx)(s.code,{children:"USAGE"}),", ",(0,r.jsx)(s.code,{children:"ALL"})]})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{style:{textAlign:"left"},children:"Protocols"}),(0,r.jsxs)(s.td,{style:{textAlign:"left"},children:[(0,r.jsx)(s.code,{children:"SELECT"}),", ",(0,r.jsx)(s.code,{children:"INSERT"}),", ",(0,r.jsx)(s.code,{children:"ALL"})]})]})]})]}),"\n",(0,r.jsx)(s.admonition,{type:"info",children:(0,r.jsxs)(s.p,{children:["You must grant privileges for each object individually. For example, granting ",(0,r.jsx)(s.code,{children:"ALL"})," on a database does not grant full access to the objects within that database. It only grants all of the database-level privileges (",(0,r.jsx)(s.code,{children:"CONNECT"}),", ",(0,r.jsx)(s.code,{children:"CREATE"}),", ",(0,r.jsx)(s.code,{children:"TEMPORARY"}),") to the database itself."]})}),"\n",(0,r.jsxs)(s.p,{children:["Use the ",(0,r.jsx)(s.code,{children:"GRANT"})," SQL command to give a specified role privileges on an object. For example, to grant the role named ",(0,r.jsx)(s.code,{children:"jsmith"})," insert privileges on the table named ",(0,r.jsx)(s.code,{children:"mytable"}),":"]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-sql",children:"=# GRANT INSERT ON mytable TO jsmith;\n"})}),"\n",(0,r.jsxs)(s.p,{children:["Similarly, to grant ",(0,r.jsx)(s.code,{children:"jsmith"})," select privileges only to the column named ",(0,r.jsx)(s.code,{children:"col1"})," in the table named ",(0,r.jsx)(s.code,{children:"table2"}),":"]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-sql",children:"=# GRANT SELECT (col1) on TABLE table2 TO jsmith;\n"})}),"\n",(0,r.jsxs)(s.p,{children:["To revoke privileges, use the ",(0,r.jsx)(s.code,{children:"REVOKE"})," command. For example:"]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-sql",children:"=# REVOKE ALL PRIVILEGES ON mytable FROM jsmith;\n"})}),"\n",(0,r.jsxs)(s.p,{children:["You can also use the ",(0,r.jsx)(s.code,{children:"DROP OWNED"})," and ",(0,r.jsx)(s.code,{children:"REASSIGN OWNED"})," commands for managing objects owned by deprecated roles (Note: only an object's owner or a superuser can drop an object or reassign ownership). For example:"]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-sql",children:"=# REASSIGN OWNED BY sally TO bob;\n=# DROP OWNED BY visitor;\n"})}),"\n",(0,r.jsx)(s.h2,{id:"encrypt-data",children:"Encrypt data"}),"\n",(0,r.jsxs)(s.p,{children:["Apache Cloudberry is installed with an optional module of encryption/decryption functions called ",(0,r.jsx)(s.code,{children:"pgcrypto"}),". The ",(0,r.jsx)(s.code,{children:"pgcrypto"})," functions allow database administrators to store certain columns of data in encrypted form. This adds an extra layer of protection for sensitive data, as data stored in Apache Cloudberry in encrypted form cannot be read by anyone who does not have the encryption key, nor can it be read directly from the disks."]}),"\n",(0,r.jsx)(s.admonition,{type:"info",children:(0,r.jsxs)(s.p,{children:["The ",(0,r.jsx)(s.code,{children:"pgcrypto"})," functions run inside the database server, which means that all the data and passwords move between ",(0,r.jsx)(s.code,{children:"pgcrypto"})," and the client application in clear-text."]})}),"\n",(0,r.jsxs)(s.p,{children:["To use ",(0,r.jsx)(s.code,{children:"pgcrypto"})," functions, register the ",(0,r.jsx)(s.code,{children:"pgcrypto"})," extension in each database in which you want to use the functions. For example:"]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-shell",children:'psql -d testdb -c "CREATE EXTENSION pgcrypto"\n'})}),"\n",(0,r.jsxs)(s.p,{children:["See ",(0,r.jsx)(s.a,{href:"https://www.postgresql.org/docs/12/pgcrypto.html",children:"pgcrypto"})," in the PostgreSQL documentation for more information about individual functions."]})]})}function h(e={}){const{wrapper:s}={...(0,n.a)(),...e.components};return s?(0,r.jsx)(s,{...e,children:(0,r.jsx)(c,{...e})}):c(e)}},11151:(e,s,t)=>{t.d(s,{Z:()=>a,a:()=>l});var r=t(67294);const n={},i=r.createContext(n);function l(e){const s=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function a(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:l(e.components),r.createElement(i.Provider,{value:s},e.children)}}}]);