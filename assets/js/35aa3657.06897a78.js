"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[419],{67894:(e,s,t)=>{t.r(s),t.d(s,{assets:()=>o,contentTitle:()=>c,default:()=>h,frontMatter:()=>r,metadata:()=>i,toc:()=>l});var a=t(85893),n=t(11151);const r={title:"CREATE TABLESPACE"},c="CREATE TABLESPACE",i={id:"sql-stmts/create-tablespace",title:"CREATE TABLESPACE",description:"Defines a new tablespace.",source:"@site/docs/sql-stmts/create-tablespace.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/create-tablespace",permalink:"/docs/sql-stmts/create-tablespace",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/create-tablespace.md",tags:[],version:"current",lastUpdatedBy:"Dianjin Wang",lastUpdatedAt:1733128076,formattedLastUpdatedAt:"Dec 2, 2024",frontMatter:{title:"CREATE TABLESPACE"},sidebar:"docsbars",previous:{title:"CREATE TABLE",permalink:"/docs/sql-stmts/create-table"},next:{title:"CREATE TEXT SEARCH CONFIGURATION",permalink:"/docs/sql-stmts/create-text-search-configuration"}},o={},l=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Notes",id:"notes",level:2},{value:"Examples",id:"examples",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function d(e){const s={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,n.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(s.h1,{id:"create-tablespace",children:"CREATE TABLESPACE"}),"\n",(0,a.jsx)(s.p,{children:"Defines a new tablespace."}),"\n",(0,a.jsx)(s.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,a.jsx)(s.pre,{children:(0,a.jsx)(s.code,{className:"language-sql",children:"CREATE TABLESPACE <tablespace_name>\n   [ OWNER { <owner_name> | CURRENT_USER | SESSION_USER } ]\n   LOCATION '<directory>' \n   [ WITH (content<ID_1>='<directory>'[, content<ID_2>='<directory>' ... ] [, <tablespace_option = value [, ... ] ] ) ]\n"})}),"\n",(0,a.jsx)(s.h2,{id:"description",children:"Description"}),"\n",(0,a.jsxs)(s.p,{children:[(0,a.jsx)(s.code,{children:"CREATE TABLESPACE"})," registers and configures a new tablespace for your Cloudberry Database system. The tablespace name must be distinct from the name of any existing tablespace in the system. A tablespace is a Cloudberry Database system object (a global object), you can use a tablespace from any database if you have appropriate privileges."]}),"\n",(0,a.jsx)(s.p,{children:"A tablespace allows superusers to define an alternative host file system location where the data files containing database objects (such as tables and indexes) reside."}),"\n",(0,a.jsxs)(s.p,{children:["A user with appropriate privileges can pass tablespace_name to ",(0,a.jsx)(s.a,{href:"/docs/sql-stmts/create-database",children:(0,a.jsx)(s.code,{children:"CREATE DATABASE"})}),", ",(0,a.jsx)(s.a,{href:"/docs/sql-stmts/create-table",children:(0,a.jsx)(s.code,{children:"CREATE TABLE"})}),", or ",(0,a.jsx)(s.a,{href:"/docs/sql-stmts/create-index",children:(0,a.jsx)(s.code,{children:"CREATE INDEX"})})," to direct Cloudberry Database to store the data files for these objects within the specified tablespace."]}),"\n",(0,a.jsx)(s.p,{children:"In Cloudberry Database, the file system location must exist on all hosts including the hosts running the coordinator, standby mirror, each primary segment, and each mirror segment."}),"\n",(0,a.jsx)(s.h2,{id:"parameters",children:"Parameters"}),"\n",(0,a.jsx)(s.p,{children:(0,a.jsx)(s.strong,{children:(0,a.jsx)(s.code,{children:"tablespace_name"})})}),"\n",(0,a.jsxs)(s.p,{children:["The name of a tablespace to be created. The name cannot begin with ",(0,a.jsx)(s.code,{children:"pg_"})," or ",(0,a.jsx)(s.code,{children:"gp_"}),", as such names are reserved for system tablespaces."]}),"\n",(0,a.jsx)(s.p,{children:(0,a.jsx)(s.strong,{children:(0,a.jsx)(s.code,{children:"owner_name"})})}),"\n",(0,a.jsx)(s.p,{children:"The name of the user who will own the tablespace. If omitted, defaults to the user running the command. Only superusers can create tablespaces, but they can assign ownership of tablespaces to non-superusers."}),"\n",(0,a.jsx)(s.p,{children:(0,a.jsx)(s.strong,{children:(0,a.jsx)(s.code,{children:"LOCATION 'directory'"})})}),"\n",(0,a.jsxs)(s.p,{children:["The directory that will be used for the tablespace. The directory should be empty and must be owned by the Cloudberry Database system user. You must specify the absolute path of the directory, and the path name must not be greater than 100 characters in length. (The location is used to create a symlink target in the pg_tblspc directory, and symlink targets are truncated to 100 characters when sending to ",(0,a.jsx)(s.code,{children:"tar"})," from utilities such as ",(0,a.jsx)(s.code,{children:"pg_basebackup"}),".)"]}),"\n",(0,a.jsxs)(s.p,{children:["You can specify a different tablespace directory for any Cloudberry Database segment instance in the ",(0,a.jsx)(s.code,{children:"WITH"})," clause."]}),"\n",(0,a.jsx)(s.p,{children:(0,a.jsx)(s.strong,{children:(0,a.jsx)(s.code,{children:"contentID_i='directory_i'"})})}),"\n",(0,a.jsxs)(s.p,{children:["The value ID_i is the content ID for the segment instance. directory_i is the absolute path to the host system file location that the segment instance uses as the root directory for the tablespace. You cannot specify the content ID of the coordinator instance (",(0,a.jsx)(s.code,{children:"-1"}),"). You can specify the same directory for multiple segments."]}),"\n",(0,a.jsxs)(s.p,{children:["If a segment instance is not listed in the ",(0,a.jsx)(s.code,{children:"WITH"})," clause, Cloudberry Database uses the tablespace directory specified in the ",(0,a.jsx)(s.code,{children:"LOCATION"})," clause."]}),"\n",(0,a.jsxs)(s.p,{children:["The restrictions identified for the ",(0,a.jsx)(s.code,{children:"LOCATION"})," directory also hold for directory_i."]}),"\n",(0,a.jsx)(s.p,{children:(0,a.jsx)(s.strong,{children:(0,a.jsx)(s.code,{children:"tablespace_option"})})}),"\n",(0,a.jsxs)(s.p,{children:["A tablespace parameter to set or reset. Currently, the only available parameters are ",(0,a.jsx)(s.code,{children:"seq_page_cost"})," and ",(0,a.jsx)(s.code,{children:"random_page_cost"}),". Setting either value for a particular tablespace will override the planner's usual estimate of the cost of reading pages from tables in that tablespace, as established by the configuration parameters of the same name (see ",(0,a.jsx)(s.code,{children:"seq_page_cost"}),", ",(0,a.jsx)(s.code,{children:"random_page_cost"}),"). This may be useful if one tablespace is located on a disk which is faster or slower than the remainder of the I/O subsystem."]}),"\n",(0,a.jsx)(s.h2,{id:"notes",children:"Notes"}),"\n",(0,a.jsxs)(s.p,{children:["Because ",(0,a.jsx)(s.code,{children:"CREATE TABLESPACE"})," creates symbolic links from the ",(0,a.jsx)(s.code,{children:"pg_tblspc"})," directory in the coordinator and segment instance data directory to the directories specified in the command, Cloudberry Database supports tablespaces only on systems that support symbolic links."]}),"\n",(0,a.jsxs)(s.p,{children:["You cannot run ",(0,a.jsx)(s.code,{children:"CREATE TABLESPACE"})," inside a transaction block."]}),"\n",(0,a.jsx)(s.p,{children:"When creating tablespaces, ensure that file system locations have sufficient I/O speed and available disk space."}),"\n",(0,a.jsx)(s.admonition,{type:"info",children:(0,a.jsxs)(s.p,{children:["Cloudberry Database does not support different tablespace locations for a primary-mirror pair with the same content ID. It is only possible to configure different locations for different content IDs. Do not modify symbolic links under the ",(0,a.jsx)(s.code,{children:"pg_tblspc"})," directory so that primary-mirror pairs point to different file locations; this will lead to erroneous behavior."]})}),"\n",(0,a.jsx)(s.h2,{id:"examples",children:"Examples"}),"\n",(0,a.jsx)(s.p,{children:"Create a new tablespace and specify the file system location for the coordinator and all segment instances:"}),"\n",(0,a.jsx)(s.pre,{children:(0,a.jsx)(s.code,{className:"language-sql",children:"CREATE TABLESPACE mytblspace LOCATION '/mydbtspc/mytestspace';\n"})}),"\n",(0,a.jsxs)(s.p,{children:["Create a tablespace ",(0,a.jsx)(s.code,{children:"indexspace"})," at ",(0,a.jsx)(s.code,{children:"/data/indexes"})," owned by user ",(0,a.jsx)(s.code,{children:"genevieve"}),":"]}),"\n",(0,a.jsx)(s.pre,{children:(0,a.jsx)(s.code,{className:"language-sql",children:"CREATE TABLESPACE indexspace OWNER genevieve LOCATION '/data/indexes';\n"})}),"\n",(0,a.jsxs)(s.p,{children:["Create a new tablespace and specify a location for segment instances with content ID 0 and 1. For the coordinator and segment instances not listed in the ",(0,a.jsx)(s.code,{children:"WITH"})," clause, the file system location for the tablespace is the directory specified in the ",(0,a.jsx)(s.code,{children:"LOCATION"})," clause."]}),"\n",(0,a.jsx)(s.pre,{children:(0,a.jsx)(s.code,{className:"language-sql",children:"CREATE TABLESPACE mytblspace LOCATION '/mydbtspc/mytestspace' WITH (content0='/temp/mytest', content1='/temp/mytest');\n"})}),"\n",(0,a.jsx)(s.p,{children:"The example specifies the same location for the two segment instances. You can a specify different location for each segment."}),"\n",(0,a.jsx)(s.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,a.jsxs)(s.p,{children:[(0,a.jsx)(s.code,{children:"CREATE TABLESPACE"})," is a Cloudberry Database extension."]}),"\n",(0,a.jsx)(s.h2,{id:"see-also",children:"See also"}),"\n",(0,a.jsxs)(s.p,{children:[(0,a.jsx)(s.a,{href:"/docs/sql-stmts/create-database",children:(0,a.jsx)(s.code,{children:"CREATE DATABASE"})}),", ",(0,a.jsx)(s.a,{href:"/docs/sql-stmts/create-table",children:(0,a.jsx)(s.code,{children:"CREATE TABLE"})}),", ",(0,a.jsx)(s.a,{href:"/docs/sql-stmts/create-index",children:(0,a.jsx)(s.code,{children:"CREATE INDEX"})}),", ",(0,a.jsx)(s.a,{href:"/docs/sql-stmts/drop-tablespace",children:(0,a.jsx)(s.code,{children:"DROP TABLESPACE"})}),", ",(0,a.jsx)(s.a,{href:"/docs/sql-stmts/alter-tablespace",children:(0,a.jsx)(s.code,{children:"ALTER TABLESPACE"})})]})]})}function h(e={}){const{wrapper:s}={...(0,n.a)(),...e.components};return s?(0,a.jsx)(s,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}},11151:(e,s,t)=>{t.d(s,{Z:()=>i,a:()=>c});var a=t(67294);const n={},r=a.createContext(n);function c(e){const s=a.useContext(r);return a.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function i(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:c(e.components),a.createElement(r.Provider,{value:s},e.children)}}}]);