"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[7745],{6165:(e,s,i)=>{i.r(s),i.d(s,{assets:()=>c,contentTitle:()=>a,default:()=>h,frontMatter:()=>n,metadata:()=>l,toc:()=>d});var t=i(85893),r=i(11151);const n={title:"Utility Overview"},a="Utility Overview",l={id:"sys-utilities/index",title:"Utility Overview",description:"The command-line utilities provided with Apache Cloudberry.",source:"@site/docs/sys-utilities/index.md",sourceDirName:"sys-utilities",slug:"/sys-utilities/",permalink:"/docs/sys-utilities/",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sys-utilities/index.md",tags:[],version:"current",lastUpdatedBy:"dependabot[bot]",lastUpdatedAt:1744180221,formattedLastUpdatedAt:"Apr 9, 2025",frontMatter:{title:"Utility Overview"},sidebar:"docsbars",previous:{title:"Range Functions and Operators",permalink:"/docs/functions/range-functions-and-operators"},next:{title:"analyzedb",permalink:"/docs/sys-utilities/analyzedb"}},c={},d=[{value:"Reference for Client Applications",id:"reference-for-client-applications",level:2},{value:"Reference for Server Applications",id:"reference-for-server-applications",level:2},{value:"Reference for Administrator",id:"reference-for-administrator",level:2}];function o(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",ul:"ul",...(0,r.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(s.h1,{id:"utility-overview",children:"Utility Overview"}),"\n",(0,t.jsx)(s.p,{children:"The command-line utilities provided with Apache Cloudberry."}),"\n",(0,t.jsx)(s.p,{children:"Apache Cloudberry uses the standard PostgreSQL client and server programs and provides additional management utilities for administering a distributed Apache Cloudberry DBMS."}),"\n",(0,t.jsxs)(s.p,{children:["Several utilities are installed when you install the Apache Cloudberry server. These utilities reside in ",(0,t.jsx)(s.code,{children:"$GPHOME/bin"}),"."]}),"\n",(0,t.jsx)(s.p,{children:"Superscripts identify those utilities that require separate downloads, as well as those utilities that are also installed with the Client and Loader Tools Packages. All utilities are installed when you install the Apache Cloudberry server, unless specifically identified by a superscript."}),"\n",(0,t.jsx)(s.p,{children:"For more information about a utility, see the corresponding topic listed in the System Utilities section."}),"\n",(0,t.jsx)(s.h2,{id:"reference-for-client-applications",children:"Reference for Client Applications"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.a,{href:"/docs/sys-utilities/clusterdb",children:"clusterdb"})," \u2014 cluster a database"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.a,{href:"/docs/sys-utilities/createdb",children:"createdb"})," \u2014 create a new database"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.a,{href:"/docs/sys-utilities/createuser",children:"createuser"})," \u2014 define a new user account"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.a,{href:"/docs/sys-utilities/dropdb",children:"dropdb"})," \u2014 remove a database"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.a,{href:"/docs/sys-utilities/dropuser",children:"dropuser"})," \u2014 remove a user account"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.a,{href:"/docs/sys-utilities/pg-config",children:"pg_config"})," \u2014 retrieve information about the installed version of PostgreSQL"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.a,{href:"/docs/sys-utilities/pg-dump",children:"pg_dump"})," \u2014 extract a database into a script file or other archive file"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.a,{href:"/docs/sys-utilities/pg-dumpall",children:"pg_dumpall"})," \u2014 extract a database cluster into a script file"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.a,{href:"/docs/sys-utilities/pg-restore",children:"pg_restore"})," \u2014 restore a database from an archive file created by pg_dump"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.a,{href:"/docs/sys-utilities/psql",children:"psql"})," \u2014 interactive terminal"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.a,{href:"/docs/sys-utilities/reindexdb",children:"reindexdb"})," \u2014 reindex a database"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.a,{href:"/docs/sys-utilities/vacuumdb",children:"vacuumdb"})," \u2014 garbage-collect and analyze a database"]}),"\n"]}),"\n",(0,t.jsx)(s.h2,{id:"reference-for-server-applications",children:"Reference for Server Applications"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.a,{href:"/docs/sys-utilities/pg-checksums",children:"pg_checksums"})," \u2014 enable, disable or check data checksums in a database cluster"]}),"\n"]}),"\n",(0,t.jsx)(s.h2,{id:"reference-for-administrator",children:"Reference for Administrator"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.a,{href:"/docs/sys-utilities/analyzedb",children:"analyzedb"})," - performs ",(0,t.jsx)(s.code,{children:"ANALYZE"})," operations on tables incrementally and concurrently"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.a,{href:"/docs/sys-utilities/gpaddmirrors",children:"gpaddmirrors"})," - add mirror segments to a Apache Cloudberry system that was initially configured without mirroring"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.a,{href:"/docs/sys-utilities/gpbackup",children:"gpbackup"})," - create a Apache Cloudberry backup for use with the gprestore utility"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.a,{href:"/docs/sys-utilities/gpcheckcat",children:"gpcheckcat"})," - test Apache Cloudberry catalog tables for inconsistencies"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.a,{href:"/docs/sys-utilities/gpcheckperf",children:"gpcheckperf"})," - verifiy the baseline hardware performance of the specified hosts"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.a,{href:"/docs/sys-utilities/gpconfig",children:"gpconfig"})," - set server configuration parameters on all segments within a Apache Cloudberry system"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.a,{href:"/docs/sys-utilities/gpdeletesystem",children:"gpdeletesystem"})," - delete a Apache Cloudberry system that was initialized using gpinitsystem"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.a,{href:"/docs/sys-utilities/gpdemo",children:"gpdemo"})," - deploy a small Apache Cloudberry cluster with segments on a single node to make a demo"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.a,{href:"/docs/sys-utilities/gpexpand",children:"gpexpand"})," - expand an existing Apache Cloudberry across new hosts in the system"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.a,{href:"/docs/sys-utilities/gpfdist",children:"gpfdist"})," - serve data files to or writes data files out from Apache Cloudberry segments"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.a,{href:"/docs/sys-utilities/gpinitstandby",children:"gpinitstandby"})," - add and/or initialize a standby coordinator host for a Apache Cloudberry system"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.a,{href:"/docs/sys-utilities/gpinitsystem",children:"gpinitsystem"})," - initialize a Apache Cloudberry system using configuration parameters specified in the gpinitsystem_config file"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.a,{href:"/docs/sys-utilities/gpload",children:"gpload"})," - run a load job as defined in a YAML formatted control file"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.a,{href:"/docs/sys-utilities/gplogfilter",children:"gplogfilter"})," - search through Apache Cloudberry log files for specified entries"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.a,{href:"/docs/sys-utilities/gpmemreport",children:"gpmemreport"})," - interpret the output created by the gpmemwatcher utility and generates output files in a readable format"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.a,{href:"/docs/sys-utilities/gpmemwatcher",children:"gpmemwatcher"})," - track the memory usage of each process in a database cluster."]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.a,{href:"/docs/sys-utilities/gpmovemirrors",children:"gpmovemirrors"})," - move mirror segment instances to new locations"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.a,{href:"/docs/sys-utilities/gppkg",children:"gppkg"})," - package manager to install, upgrade, migrate, and remove extensions in ",(0,t.jsx)(s.code,{children:".gppkg"})," format"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.a,{href:"/docs/sys-utilities/gprestore",children:"gprestore"})," - restore a database backup that was created using the gpbackup utility"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.a,{href:"/docs/sys-utilities/gpreload",children:"gpreload"})," - reload table data sorting the data based on specified columns"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.a,{href:"/docs/sys-utilities/gprecoverseg",children:"gprecoverseg"})," - recover a primary or mirror segment instance that has been marked as down (if mirroring is enabled)"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.a,{href:"/docs/sys-utilities/gpshrink",children:"gpshrink"})," - use ",(0,t.jsx)(s.code,{children:"gpshrink"})," to reduce the size of the cluster, saving server resources"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.a,{href:"/docs/sys-utilities/gpssh-exkeys",children:"gpssh-exkeys"})," - exchange SSH public keys between hosts"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.a,{href:"/docs/sys-utilities/gpssh",children:"gpssh"})," - provide SSH access to multiple hosts at once"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.a,{href:"/docs/sys-utilities/gpstart",children:"gpstart"})," - start a Apache Cloudberry system"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.a,{href:"/docs/sys-utilities/gpstate",children:"gpstate"})," - show the status of a running Apache Cloudberry system"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.a,{href:"/docs/sys-utilities/gpstop",children:"gpstop"})," - stop or restart a Apache Cloudberry system"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.a,{href:"/docs/sys-utilities/gpsync",children:"gpsync"})," - copy files between multiple hosts at once"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.a,{href:"/docs/sys-utilities/gpactivatestandby",children:"gpactivatestandby"})," - activate a standby coordinator host and makes it the active coordinator"]}),"\n"]})]})}function h(e={}){const{wrapper:s}={...(0,r.a)(),...e.components};return s?(0,t.jsx)(s,{...e,children:(0,t.jsx)(o,{...e})}):o(e)}},11151:(e,s,i)=>{i.d(s,{Z:()=>l,a:()=>a});var t=i(67294);const r={},n=t.createContext(r);function a(e){const s=t.useContext(n);return t.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function l(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),t.createElement(n.Provider,{value:s},e.children)}}}]);