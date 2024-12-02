"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[443],{89149:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>h,frontMatter:()=>r,metadata:()=>i,toc:()=>d});var a=n(85893),s=n(11151);const r={title:"Start and Stop Database"},o="Start and Stop Cloudberry Database",i={id:"start-and-stop-cbdb-database",title:"Start and Stop Database",description:"In a Cloudberry Database DBMS, the database server instances (the coordinator and all segments) are started or stopped across all of the hosts in the system in such a way that they can work together as a unified DBMS.",source:"@site/docs/start-and-stop-cbdb-database.md",sourceDirName:".",slug:"/start-and-stop-cbdb-database",permalink:"/docs/start-and-stop-cbdb-database",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/start-and-stop-cbdb-database.md",tags:[],version:"current",lastUpdatedBy:"Dianjin Wang",lastUpdatedAt:1733128076,formattedLastUpdatedAt:"Dec 2, 2024",frontMatter:{title:"Start and Stop Database"},sidebar:"docsbars",previous:{title:"Create and Manage Database",permalink:"/docs/create-and-manage-database"},next:{title:"Connect to Database",permalink:"/docs/connect-to-cbdb"}},c={},d=[{value:"Start Cloudberry Database",id:"start-cloudberry-database",level:2},{value:"Restart Cloudberry Database",id:"restart-cloudberry-database",level:2},{value:"Reload configuration file changes only",id:"reload-configuration-file-changes-only",level:2},{value:"Start the Coordinator in maintenance mode",id:"start-the-coordinator-in-maintenance-mode",level:2},{value:"Stop Cloudberry Database",id:"stop-cloudberry-database",level:2},{value:"Stop client processes",id:"stop-client-processes",level:2}];function l(e){const t={admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,s.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h1,{id:"start-and-stop-cloudberry-database",children:"Start and Stop Cloudberry Database"}),"\n",(0,a.jsx)(t.p,{children:"In a Cloudberry Database DBMS, the database server instances (the coordinator and all segments) are started or stopped across all of the hosts in the system in such a way that they can work together as a unified DBMS."}),"\n",(0,a.jsx)(t.p,{children:"Because a Cloudberry Database system is distributed across many machines, the process for starting and stopping a Cloudberry Database system is different than the process for starting and stopping a regular PostgreSQL DBMS."}),"\n",(0,a.jsxs)(t.p,{children:["Use the ",(0,a.jsx)(t.code,{children:"gpstart"})," and ",(0,a.jsx)(t.code,{children:"gpstop"})," utilities to start and stop Cloudberry Database, respectively. These utilities are located in the ",(0,a.jsx)(t.code,{children:"$GPHOME/bin"})," directory on your Cloudberry Database coordinator host."]}),"\n",(0,a.jsx)(t.admonition,{type:"tip",children:(0,a.jsxs)(t.p,{children:["Do not issue a ",(0,a.jsx)(t.code,{children:"kill"})," command to end any Postgres process. Instead, use the database command ",(0,a.jsx)(t.code,{children:"pg_cancel_backend()"}),"."]})}),"\n",(0,a.jsxs)(t.p,{children:["Issuing a ",(0,a.jsx)(t.code,{children:"kill -9"})," or ",(0,a.jsx)(t.code,{children:"kill -11"})," can introduce database corruption and prevent root cause analysis from being performed."]}),"\n",(0,a.jsx)(t.h2,{id:"start-cloudberry-database",children:"Start Cloudberry Database"}),"\n",(0,a.jsxs)(t.p,{children:["Start an initialized Cloudberry Database system by running the ",(0,a.jsx)(t.code,{children:"gpstart"})," utility on the coordinator instance."]}),"\n",(0,a.jsxs)(t.p,{children:["Use the ",(0,a.jsx)(t.code,{children:"gpstart"})," utility to start a Cloudberry Database system that has already been initialized by the ",(0,a.jsx)(t.code,{children:"gpinitsystem"})," utility, but has been stopped by the ",(0,a.jsx)(t.code,{children:"gpstop"})," utility. The ",(0,a.jsx)(t.code,{children:"gpstart"})," utility starts Cloudberry Database by starting all the ",(0,a.jsx)(t.code,{children:"postgres"})," instances on the Cloudberry Database cluster. ",(0,a.jsx)(t.code,{children:"gpstart"})," orchestrates this process and performs the process in parallel."]}),"\n",(0,a.jsxs)(t.p,{children:["Run ",(0,a.jsx)(t.code,{children:"gpstart"})," on the coordinator host to start Cloudberry Database:"]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-shell",children:"$ gpstart\n"})}),"\n",(0,a.jsx)(t.h2,{id:"restart-cloudberry-database",children:"Restart Cloudberry Database"}),"\n",(0,a.jsx)(t.p,{children:"Stop the Cloudberry Database system and then restart it."}),"\n",(0,a.jsxs)(t.p,{children:["The ",(0,a.jsx)(t.code,{children:"gpstop"})," utility with the ",(0,a.jsx)(t.code,{children:"-r"})," option can stop and then restart Cloudberry Database after the shutdown completes."]}),"\n",(0,a.jsx)(t.p,{children:"To restart Cloudberry Database, enter the following command on the coordinator host:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-shell",children:"$ gpstop -r\n"})}),"\n",(0,a.jsx)(t.h2,{id:"reload-configuration-file-changes-only",children:"Reload configuration file changes only"}),"\n",(0,a.jsx)(t.p,{children:"Reload changes to Cloudberry Database configuration files without interrupting the system."}),"\n",(0,a.jsxs)(t.p,{children:["The ",(0,a.jsx)(t.code,{children:"gpstop"})," utility can reload changes to the ",(0,a.jsx)(t.code,{children:"pg_hba.conf"})," configuration file and to ",(0,a.jsx)(t.em,{children:"runtime"})," parameters in the coordinator ",(0,a.jsx)(t.code,{children:"postgresql.conf"})," file without service interruption. Active sessions pick up changes when they reconnect to the database. Many server configuration parameters require a full system restart (",(0,a.jsx)(t.code,{children:"gpstop -r"}),") to activate."]}),"\n",(0,a.jsxs)(t.p,{children:["Reload configuration file changes without shutting down the Cloudberry Database system using the ",(0,a.jsx)(t.code,{children:"gpstop"})," utility:"]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-shell",children:"$ gpstop -u\n"})}),"\n",(0,a.jsx)(t.h2,{id:"start-the-coordinator-in-maintenance-mode",children:"Start the Coordinator in maintenance mode"}),"\n",(0,a.jsx)(t.p,{children:"Start only the coordinator to perform maintenance or administrative tasks without affecting data on the segments. For example, you can connect to a database only on the coordinator instance in maintenance mode and edit system catalog settings."}),"\n",(0,a.jsxs)(t.ol,{children:["\n",(0,a.jsxs)(t.li,{children:["\n",(0,a.jsxs)(t.p,{children:["Run ",(0,a.jsx)(t.code,{children:"gpstart"})," using the ",(0,a.jsx)(t.code,{children:"-m"})," option:"]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-shell",children:"$ gpstart -m\n"})}),"\n"]}),"\n",(0,a.jsxs)(t.li,{children:["\n",(0,a.jsx)(t.p,{children:"Connect to the coordinator in maintenance mode to do catalog maintenance. For example:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-shell",children:"$ PGOPTIONS='-c gp_role=utility' psql postgres\n"})}),"\n"]}),"\n",(0,a.jsxs)(t.li,{children:["\n",(0,a.jsx)(t.p,{children:"After completing your administrative tasks, stop the coordinator in maintenance mode. Then, restart it in production mode."}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-shell",children:"$ gpstop -m\n$ gpstart\n"})}),"\n",(0,a.jsx)(t.admonition,{type:"caution",children:(0,a.jsx)(t.p,{children:"Incorrect use of maintenance mode connections can result in an inconsistent system state. It is recommended that Technical Support perform this operation."})}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(t.h2,{id:"stop-cloudberry-database",children:"Stop Cloudberry Database"}),"\n",(0,a.jsxs)(t.p,{children:["The ",(0,a.jsx)(t.code,{children:"gpstop"})," utility stops or restarts your Cloudberry Database system and always runs on the coordinator host. When activated, ",(0,a.jsx)(t.code,{children:"gpstop"})," stops all ",(0,a.jsx)(t.code,{children:"postgres"})," processes in the system, including the coordinator and all segment instances. The ",(0,a.jsx)(t.code,{children:"gpstop"})," utility uses a default of up to multiple parallel worker threads to bring down the Postgres instances that make up the Cloudberry Database cluster. To stop Cloudberry Database immediately, use the fast mode."]}),"\n",(0,a.jsx)(t.admonition,{type:"tip",children:(0,a.jsx)(t.p,{children:"Immediate shut down mode is not recommended. This mode stops all database processes without allowing the database server to complete transaction processing or clean up any temporary or in-process work files."})}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsxs)(t.li,{children:["\n",(0,a.jsx)(t.p,{children:"To stop Cloudberry Database:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-shell",children:"$ gpstop\n"})}),"\n"]}),"\n",(0,a.jsxs)(t.li,{children:["\n",(0,a.jsx)(t.p,{children:"To stop Cloudberry Database in fast mode:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-shell",children:"$ gpstop -M fast\n"})}),"\n",(0,a.jsxs)(t.p,{children:["By default, you are not allowed to shut down Cloudberry Database if there are any client connections to the database. Use the ",(0,a.jsx)(t.code,{children:"-M fast"})," option to roll back all in progress transactions and terminate any connections before shutting down."]}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(t.h2,{id:"stop-client-processes",children:"Stop client processes"}),"\n",(0,a.jsxs)(t.p,{children:["Cloudberry Database launches a new backend process for each client connection. A Cloudberry Database user with ",(0,a.jsx)(t.code,{children:"SUPERUSER"})," privileges can cancel and terminate these client backend processes."]}),"\n",(0,a.jsxs)(t.p,{children:["Canceling a backend process with the ",(0,a.jsx)(t.code,{children:"pg_cancel_backend()"})," function ends a specific queued or active client query. Terminating a backend process with the ",(0,a.jsx)(t.code,{children:"pg_terminate_backend()"})," function terminates a client connection to a database."]}),"\n",(0,a.jsxs)(t.p,{children:["The ",(0,a.jsx)(t.code,{children:"pg_cancel_backend()"})," function has two signatures:"]}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsx)(t.li,{children:(0,a.jsx)(t.code,{children:"pg_cancel_backend( pid int4 )"})}),"\n",(0,a.jsx)(t.li,{children:(0,a.jsx)(t.code,{children:"pg_cancel_backend( pid int4, msg text )"})}),"\n"]}),"\n",(0,a.jsxs)(t.p,{children:["The ",(0,a.jsx)(t.code,{children:"pg_terminate_backend()"})," function has two similar signatures:"]}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsx)(t.li,{children:(0,a.jsx)(t.code,{children:"pg_terminate_backend( pid int4 )"})}),"\n",(0,a.jsx)(t.li,{children:(0,a.jsx)(t.code,{children:"pg_terminate_backend( pid int4, msg text )"})}),"\n"]}),"\n",(0,a.jsxs)(t.p,{children:["If you provide a ",(0,a.jsx)(t.code,{children:"msg"}),", Cloudberry Database includes the text in the cancel message returned to the client. ",(0,a.jsx)(t.code,{children:"msg"})," is limited to 128 bytes; Cloudberry Database truncates anything longer."]}),"\n",(0,a.jsxs)(t.p,{children:["The ",(0,a.jsx)(t.code,{children:"pg_cancel_backend()"})," and ",(0,a.jsx)(t.code,{children:"pg_terminate_backend()"})," functions return ",(0,a.jsx)(t.code,{children:"true"})," if successful, and ",(0,a.jsx)(t.code,{children:"false"})," otherwise."]}),"\n",(0,a.jsxs)(t.p,{children:["To cancel or terminate a backend process, you must first identify the process ID of the backend. You can obtain the process ID from the ",(0,a.jsx)(t.code,{children:"pid"})," column of the ",(0,a.jsx)(t.code,{children:"pg_stat_activity"})," view. For example, to view the process information associated with all running and queued queries:"]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-sql",children:"SELECT usename, pid, state, query, datname\n     FROM pg_stat_activity;\n"})}),"\n",(0,a.jsx)(t.p,{children:"Sample partial query output:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-sql",children:"usename |  pid     | state  |         query          | datname\n---------+-------------------+--------+------------------------+---------\n\xa0\xa0sammy  |   31861  | idle   | SELECT * FROM testtbl; | testdb\n \xa0billy  |   31905  | active | SELECT * FROM topten;  | testdb\n"})}),"\n",(0,a.jsxs)(t.p,{children:["Use the output to identify the process id (",(0,a.jsx)(t.code,{children:"pid"}),") of the query or client connection."]}),"\n",(0,a.jsxs)(t.p,{children:["For example, to cancel the waiting query identified in the sample output above and include ",(0,a.jsx)(t.code,{children:"'Admin canceled long-running query.'"})," as the message returned to the client:"]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-sql",children:"=# SELECT pg_cancel_backend(31905 ,'Admin canceled long-running query.');\n\nERROR:  canceling statement due to user request: \"Admin canceled long-running query.\"\n"})})]})}function h(e={}){const{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(l,{...e})}):l(e)}},11151:(e,t,n)=>{n.d(t,{Z:()=>i,a:()=>o});var a=n(67294);const s={},r=a.createContext(s);function o(e){const t=a.useContext(r);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),a.createElement(r.Provider,{value:t},e.children)}}}]);