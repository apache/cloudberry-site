"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[5620],{16134:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>i,contentTitle:()=>c,default:()=>h,frontMatter:()=>r,metadata:()=>a,toc:()=>d});var o=n(85893),s=n(11151);const r={title:"Connect to Database"},c="Connect to Apache Cloudberry",a={id:"connect-to-cbdb",title:"Connect to Database",description:"This document introduces how to connect to Apache Cloudberry.",source:"@site/docs/connect-to-cbdb.md",sourceDirName:".",slug:"/connect-to-cbdb",permalink:"/docs/connect-to-cbdb",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/connect-to-cbdb.md",tags:[],version:"current",lastUpdatedBy:"dependabot[bot]",lastUpdatedAt:1744180221,formattedLastUpdatedAt:"Apr 9, 2025",frontMatter:{title:"Connect to Database"},sidebar:"docsbars",previous:{title:"Start and Stop Database",permalink:"/docs/start-and-stop-cbdb-database"},next:{title:"Basic Query Syntax",permalink:"/docs/basic-query-syntax"}},i={},d=[{value:"Connection parameters",id:"connection-parameters",level:2},{value:"Supported client applications",id:"supported-client-applications",level:2},{value:"Client utility applications",id:"client-utility-applications",level:3},{value:"Connect with psql",id:"connect-with-psql",level:3},{value:"Connect with application interfaces",id:"connect-with-application-interfaces",level:2},{value:"Troubleshoot connection problems",id:"troubleshoot-connection-problems",level:2}];function l(e){const t={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,s.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h1,{id:"connect-to-apache-cloudberry",children:"Connect to Apache Cloudberry"}),"\n",(0,o.jsx)(t.p,{children:"This document introduces how to connect to Apache Cloudberry."}),"\n",(0,o.jsx)(t.h2,{id:"connection-parameters",children:"Connection parameters"}),"\n",(0,o.jsxs)(t.p,{children:["Users can connect to Apache Cloudberry using a PostgreSQL-compatible client program, such as ",(0,o.jsx)(t.code,{children:"psql"}),". Users and administrators always connect to Apache Cloudberry through the ",(0,o.jsx)(t.em,{children:"coordinator"}),". The segments cannot accept client connections."]}),"\n",(0,o.jsx)(t.p,{children:"To establish a connection to the Apache Cloudberry coordinator, you will need to know the following connection information and configure your client program accordingly."}),"\n",(0,o.jsxs)(t.table,{children:[(0,o.jsx)(t.thead,{children:(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.th,{children:"Connection parameter"}),(0,o.jsx)(t.th,{children:"Description"}),(0,o.jsx)(t.th,{children:"Environment variable"})]})}),(0,o.jsxs)(t.tbody,{children:[(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:"Application name"}),(0,o.jsxs)(t.td,{children:["The application name that is connecting to the database. The default value, held in the ",(0,o.jsx)(t.code,{children:"application_name"})," connection parameter is ",(0,o.jsx)(t.em,{children:"psql"}),"."]}),(0,o.jsx)(t.td,{children:(0,o.jsx)(t.code,{children:"$PGAPPNAME"})})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:"Database name"}),(0,o.jsxs)(t.td,{children:["The name of the database to which you want to connect. For a newly initialized system, use the ",(0,o.jsx)(t.code,{children:"postgres"})," database to connect for the first time."]}),(0,o.jsx)(t.td,{children:(0,o.jsx)(t.code,{children:"$PGDATABASE"})})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:"Host name"}),(0,o.jsx)(t.td,{children:"The host name of the Apache Cloudberry coordinator. The default host is the local host."}),(0,o.jsx)(t.td,{children:(0,o.jsx)(t.code,{children:"$PGHOST"})})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:"Port"}),(0,o.jsx)(t.td,{children:"The port number that the Apache Cloudberry coordinator instance is running on. The default is 5432."}),(0,o.jsx)(t.td,{children:(0,o.jsx)(t.code,{children:"$PGPORT"})})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:"User name"}),(0,o.jsxs)(t.td,{children:["The database user (role) name to connect as. This is not necessarily the same as your OS user name. Check with your Apache Cloudberry administrator if you are not sure what you database user name is. Note that every Apache Cloudberry system has one superuser account that is created automatically at initialization time. This account has the same name as the OS name of the user who initialized the Apache Cloudberry system (typically ",(0,o.jsx)(t.code,{children:"gpadmin"}),")."]}),(0,o.jsx)(t.td,{children:(0,o.jsx)(t.code,{children:"$PGUSER"})})]})]})]}),"\n",(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.a,{href:"#connect-with-psql",children:"Connecting with psql"})," provides example commands for connecting to Apache Cloudberry."]}),"\n",(0,o.jsx)(t.h2,{id:"supported-client-applications",children:"Supported client applications"}),"\n",(0,o.jsx)(t.p,{children:"Users can connect to Apache Cloudberry using various client applications:"}),"\n",(0,o.jsxs)(t.ul,{children:["\n",(0,o.jsxs)(t.li,{children:["A number of ",(0,o.jsx)(t.a,{href:"#client-utility-applications",children:"Apache Cloudberry Client Applications"})," are provided with your Apache Cloudberry installation. The ",(0,o.jsx)(t.code,{children:"psql"})," client application provides an interactive command-line interface to Apache Cloudberry."]}),"\n",(0,o.jsxs)(t.li,{children:["Using standard ",(0,o.jsx)(t.a,{href:"#connect-with-application-interfaces",children:"Database Application Interfaces"}),", such as ODBC and JDBC, users can create their own client applications that interface to Apache Cloudberry."]}),"\n",(0,o.jsx)(t.li,{children:"Most client tools that use standard database interfaces, such as ODBC and JDBC, can be configured to connect to Apache Cloudberry."}),"\n"]}),"\n",(0,o.jsx)(t.h3,{id:"client-utility-applications",children:"Client utility applications"}),"\n",(0,o.jsxs)(t.p,{children:["Apache Cloudberry comes installed with a number of client utility applications located in the ",(0,o.jsx)(t.code,{children:"$GPHOME/bin"})," directory of your Apache Cloudberry coordinator host installation. The following are the most commonly used client utility applications:"]}),"\n",(0,o.jsxs)(t.table,{children:[(0,o.jsx)(t.thead,{children:(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.th,{children:"Name"}),(0,o.jsx)(t.th,{children:"Usage"})]})}),(0,o.jsxs)(t.tbody,{children:[(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:(0,o.jsx)(t.code,{children:"createdb"})}),(0,o.jsx)(t.td,{children:"Creates a new database"})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:(0,o.jsx)(t.code,{children:"createuser"})}),(0,o.jsx)(t.td,{children:"Defines a new database role"})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:(0,o.jsx)(t.code,{children:"dropdb"})}),(0,o.jsx)(t.td,{children:"Removes a database"})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:(0,o.jsx)(t.code,{children:"dropuser"})}),(0,o.jsx)(t.td,{children:"Removes a role"})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:(0,o.jsx)(t.code,{children:"psql"})}),(0,o.jsx)(t.td,{children:"PostgreSQL interactive terminal"})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:(0,o.jsx)(t.code,{children:"reindexdb"})}),(0,o.jsx)(t.td,{children:"Reindexes a database"})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:(0,o.jsx)(t.code,{children:"vacuumdb"})}),(0,o.jsx)(t.td,{children:"Garbage-collects and analyzes a database"})]})]})]}),"\n",(0,o.jsxs)(t.p,{children:["When using these client applications, you must connect to a database through the Apache Cloudberry coordinator instance. You will need to know the name of your target database, the host name and port number of the coordinator, and what database user name to connect as. This information can be provided on the command-line using the options ",(0,o.jsx)(t.code,{children:"-d"}),", ",(0,o.jsx)(t.code,{children:"-h"}),", ",(0,o.jsx)(t.code,{children:"-p"}),", and ",(0,o.jsx)(t.code,{children:"-U"})," respectively. If an argument is found that does not belong to any option, it will be interpreted as the database name first."]}),"\n",(0,o.jsx)(t.p,{children:"All of these options have default values which will be used if the option is not specified. The default host is the local host. The default port number is 5432. The default user name is your OS system user name, as is the default database name. Note that OS user names and Apache Cloudberry user names are not necessarily the same."}),"\n",(0,o.jsxs)(t.p,{children:["If the default values are not correct, you can set the environment variables ",(0,o.jsx)(t.code,{children:"PGDATABASE"}),", ",(0,o.jsx)(t.code,{children:"PGHOST"}),", ",(0,o.jsx)(t.code,{children:"PGPORT"}),", and ",(0,o.jsx)(t.code,{children:"PGUSER"})," to the appropriate values, or use a ",(0,o.jsx)(t.code,{children:"psql"})," ",(0,o.jsx)(t.code,{children:"~/.pgpass"})," file to contain frequently-used passwords."]}),"\n",(0,o.jsx)(t.h3,{id:"connect-with-psql",children:"Connect with psql"}),"\n",(0,o.jsxs)(t.p,{children:["Depending on the default values used or the environment variables you have set, the following examples show how to access a database via ",(0,o.jsx)(t.code,{children:"psql"}),":"]}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-shell",children:"$ psql -d mydatabase -h coordinator_host -p 5432 -U `gpadmin`\n"})}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-shell",children:"$ psql mydatabase\n"})}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-shell",children:"$ psql\n"})}),"\n",(0,o.jsxs)(t.p,{children:["If a user-defined database has not yet been created, you can access the system by connecting to the ",(0,o.jsx)(t.code,{children:"postgres"})," database. For example:"]}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-shell",children:"$ psql postgres\n"})}),"\n",(0,o.jsxs)(t.p,{children:["After connecting to a database, ",(0,o.jsx)(t.code,{children:"psql"})," provides a prompt with the name of the database to which ",(0,o.jsx)(t.code,{children:"psql"})," is currently connected, followed by the string ",(0,o.jsx)(t.code,{children:"=>"})," (or ",(0,o.jsx)(t.code,{children:"=#"})," if you are the database superuser). For example:"]}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-shell",children:"mydatabase=>\n"})}),"\n",(0,o.jsxs)(t.p,{children:["At the prompt, you might type in SQL commands. A SQL command must end with a ",(0,o.jsx)(t.code,{children:";"})," (semicolon) in order to be sent to the server and run. For example:"]}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-sql",children:"=> SELECT * FROM mytable;\n"})}),"\n",(0,o.jsx)(t.h2,{id:"connect-with-application-interfaces",children:"Connect with application interfaces"}),"\n",(0,o.jsx)(t.p,{children:"You might want to develop your own client applications that interface to Apache Cloudberry. PostgreSQL provides a number of database drivers for the most commonly used database application programming interfaces (APIs), which can also be used with Apache Cloudberry. These drivers are available as a separate download. Each driver (except libpq, which comes with PostgreSQL) is an independent PostgreSQL development project and must be downloaded, installed and configured to connect to Apache Cloudberry. The following drivers are available:"}),"\n",(0,o.jsxs)(t.table,{children:[(0,o.jsx)(t.thead,{children:(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.th,{children:"API"}),(0,o.jsx)(t.th,{children:"PostgreSQL Driver"}),(0,o.jsx)(t.th,{children:"Download Link"})]})}),(0,o.jsxs)(t.tbody,{children:[(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:"ODBC"}),(0,o.jsx)(t.td,{children:"psqlODBC"}),(0,o.jsx)(t.td,{children:(0,o.jsx)(t.a,{href:"https://odbc.postgresql.org/",children:"https://odbc.postgresql.org/"})})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:"JDBC"}),(0,o.jsx)(t.td,{children:"pgjdbc"}),(0,o.jsx)(t.td,{children:(0,o.jsx)(t.a,{href:"https://jdbc.postgresql.org/",children:"https://jdbc.postgresql.org/"})})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:"Perl DBI"}),(0,o.jsx)(t.td,{children:"pgperl"}),(0,o.jsx)(t.td,{children:(0,o.jsx)(t.a,{href:"https://metacpan.org/release/DBD-Pg",children:"https://metacpan.org/release/DBD-Pg"})})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:"Python DBI"}),(0,o.jsx)(t.td,{children:"pygresql"}),(0,o.jsx)(t.td,{children:(0,o.jsx)(t.a,{href:"http://www.pygresql.org/",children:"http://www.pygresql.org/"})})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:"Python DBI"}),(0,o.jsx)(t.td,{children:"psycopg2"}),(0,o.jsx)(t.td,{children:(0,o.jsx)(t.a,{href:"https://www.psycopg.org/",children:"https://www.psycopg.org/"})})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:"libpq C Library"}),(0,o.jsx)(t.td,{children:"libpq"}),(0,o.jsx)(t.td,{children:(0,o.jsx)(t.a,{href:"https://www.postgresql.org/docs/14/libpq.html",children:"https://www.postgresql.org/docs/14/libpq.html"})})]})]})]}),"\n",(0,o.jsx)(t.p,{children:"General instructions for accessing a Apache Cloudberry with an API are:"}),"\n",(0,o.jsxs)(t.ol,{children:["\n",(0,o.jsx)(t.li,{children:"Download your programming language platform and respective API from the appropriate source. For example, you can get the Java Development Kit (JDK) and JDBC API from Oracle."}),"\n",(0,o.jsx)(t.li,{children:"Write your client application according to the API specifications. When programming your application, be aware of the SQL support in Apache Cloudberry so you do not include any unsupported SQL syntax."}),"\n"]}),"\n",(0,o.jsx)(t.p,{children:"Download the appropriate driver and configure connectivity to your Apache Cloudberry coordinator instance."}),"\n",(0,o.jsx)(t.h2,{id:"troubleshoot-connection-problems",children:"Troubleshoot connection problems"}),"\n",(0,o.jsx)(t.p,{children:"A number of things can prevent a client application from successfully connecting to Apache Cloudberry. This topic explains some of the common causes of connection problems and how to correct them."}),"\n",(0,o.jsxs)(t.table,{children:[(0,o.jsx)(t.thead,{children:(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.th,{children:"Problem"}),(0,o.jsx)(t.th,{children:"Solution"})]})}),(0,o.jsxs)(t.tbody,{children:[(0,o.jsxs)(t.tr,{children:[(0,o.jsxs)(t.td,{children:["No ",(0,o.jsx)(t.code,{children:"pg_hba.conf"})," entry for host or user"]}),(0,o.jsxs)(t.td,{children:["To enable Apache Cloudberry to accept remote client connections, you must configure your Apache Cloudberry coordinator instance so that connections are allowed from the client hosts and database users that will be connecting to Apache Cloudberry. This is done by adding the appropriate entries to the ",(0,o.jsx)(t.code,{children:"pg_hba.conf"})," configuration file (located in the coordinator instance's data directory)."]})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:"Apache Cloudberry is not running"}),(0,o.jsxs)(t.td,{children:["If the Apache Cloudberry coordinator instance is down, users will not be able to connect. You can verify that the Apache Cloudberry system is up by running the ",(0,o.jsx)(t.code,{children:"gpstate"})," utility on the Apache Cloudberry coordinator host."]})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:"Network problems: Interconnect timeouts"}),(0,o.jsxs)(t.td,{children:["If users connect to the Apache Cloudberry coordinator host from a remote client, network problems can prevent a connection (for example, DNS host name resolution problems, the host system is down, and so on.). To ensure that network problems are not the cause, connect to the Apache Cloudberry coordinator host from the remote client host. For example: ",(0,o.jsx)(t.code,{children:"ping hostname"}),(0,o.jsx)("br",{}),(0,o.jsx)("br",{}),"If the system cannot resolve the host names and IP addresses of the hosts involved in Apache Cloudberry, queries and connections will fail. For some operations, connections to the Apache Cloudberry coordinator use ",(0,o.jsx)(t.code,{children:"localhost"})," and others use the actual host name, so you must be able to resolve both. If you encounter this error, first make sure you can connect to each host in your Apache Cloudberry array from the coordinator host over the network. In the ",(0,o.jsx)(t.code,{children:"/etc/hosts"})," file of the coordinator and all segments, make sure you have the correct host names and IP addresses for all hosts involved in the Apache Cloudberry array. The ",(0,o.jsx)(t.code,{children:"127.0.0.1"})," IP must resolve to ",(0,o.jsx)(t.code,{children:"localhost"}),"."]})]})]})]})]})}function h(e={}){const{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}},11151:(e,t,n)=>{n.d(t,{Z:()=>a,a:()=>c});var o=n(67294);const s={},r=o.createContext(s);function c(e){const t=o.useContext(r);return o.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:c(e.components),o.createElement(r.Provider,{value:t},e.children)}}}]);