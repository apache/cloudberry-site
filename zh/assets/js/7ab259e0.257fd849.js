"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[7587],{46503:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>d,contentTitle:()=>a,default:()=>l,frontMatter:()=>o,metadata:()=>r,toc:()=>c});var i=n(85893),s=n(11151);const o={title:"gpactivatestandby"},a="gpactivatestandby",r={id:"sys-utilities/gpactivatestandby",title:"gpactivatestandby",description:"Activates a standby coordinator host and makes it the active coordinator for the Cloudberry Database system.",source:"@site/docs/sys-utilities/gpactivatestandby.md",sourceDirName:"sys-utilities",slug:"/sys-utilities/gpactivatestandby",permalink:"/zh/docs/sys-utilities/gpactivatestandby",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sys-utilities/gpactivatestandby.md",tags:[],version:"current",lastUpdatedBy:"Dianjin Wang",lastUpdatedAt:1739329693,formattedLastUpdatedAt:"2025\u5e742\u670812\u65e5",frontMatter:{title:"gpactivatestandby"},sidebar:"docsbars",previous:{title:"dropuser",permalink:"/zh/docs/sys-utilities/dropuser"},next:{title:"Releases",permalink:"/zh/docs/releases/"}},d={},c=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Options",id:"options",level:2},{value:"Example",id:"example",level:2},{value:"See also",id:"see-also",level:2}];function h(t){const e={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.a)(),...t.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.h1,{id:"gpactivatestandby",children:"gpactivatestandby"}),"\n",(0,i.jsx)(e.p,{children:"Activates a standby coordinator host and makes it the active coordinator for the Cloudberry Database system."}),"\n",(0,i.jsx)(e.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-shell",children:"gpactivatestandby [-d <standby_coordinator_datadir>] [-f] [-a] [-q] \n    [-l <logfile_directory>]\n\ngpactivatestandby -v \n\ngpactivatestandby -? | -h | --help\n"})}),"\n",(0,i.jsx)(e.h2,{id:"description",children:"Description"}),"\n",(0,i.jsxs)(e.p,{children:["The ",(0,i.jsx)(e.code,{children:"gpactivatestandby"})," utility activates a backup, standby coordinator host and brings it into operation as the active coordinator instance for a Cloudberry Database system. The activated standby coordinator effectively becomes the Cloudberry Database coordinator, accepting client connections on the coordinator port."]}),"\n",(0,i.jsxs)(e.blockquote,{children:["\n",(0,i.jsxs)(e.p,{children:[(0,i.jsx)(e.strong,{children:"NOTE"}),"\nBefore running ",(0,i.jsx)(e.code,{children:"gpactivatestandby"}),", be sure to run ",(0,i.jsx)(e.code,{children:"gpstate -f"})," to confirm that the standby coordinator is synchronized with the current coordinator node. If synchronized, the final line of the ",(0,i.jsx)(e.code,{children:"gpstate -f"})," output will look similar to this: ",(0,i.jsx)(e.code,{children:"20230607:06:50:06:004205 gpstate:test1-m:gpadmin-[INFO]:--Sync state: sync"})]}),"\n"]}),"\n",(0,i.jsxs)(e.p,{children:["When you initialize a standby coordinator, the default is to use the same port as the active coordinator. For information about the coordinator port for the standby coordinator, see ",(0,i.jsx)(e.a,{href:"/zh/docs/sys-utilities/gpinitstandby",children:"gpinitstandby"}),"."]}),"\n",(0,i.jsxs)(e.p,{children:["You must run this utility from the coordinator host you are activating, not the failed coordinator host you are deactivating. Running this utility assumes you have a standby coordinator host configured for the system (see ",(0,i.jsx)(e.a,{href:"/zh/docs/sys-utilities/gpinitstandby",children:"gpinitstandby"}),")."]}),"\n",(0,i.jsx)(e.p,{children:"The utility will perform the following steps:"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["Stops the synchronization process (",(0,i.jsx)(e.code,{children:"walreceiver"}),") on the standby coordinator"]}),"\n",(0,i.jsx)(e.li,{children:"Updates the system catalog tables of the standby coordinator using the logs"}),"\n",(0,i.jsx)(e.li,{children:"Activates the standby coordinator to be the new active coordinator for the system"}),"\n",(0,i.jsx)(e.li,{children:"Restarts the Cloudberry Database system with the new coordinator host"}),"\n"]}),"\n",(0,i.jsxs)(e.p,{children:["A backup, standby Cloudberry coordinator host serves as a 'warm standby' in the event of the primary Cloudberry coordinator host becoming non-operational. The standby coordinator is kept up to date by transaction log replication processes (the ",(0,i.jsx)(e.code,{children:"walsender"})," and ",(0,i.jsx)(e.code,{children:"walreceiver"}),"), which run on the primary coordinator and standby coordinator hosts and keep the data between the primary and standby coordinator hosts synchronized."]}),"\n",(0,i.jsxs)(e.p,{children:["If the primary coordinator fails, the log replication process is shutdown, and the standby coordinator can be activated in its place by using the ",(0,i.jsx)(e.code,{children:"gpactivatestandby"})," utility. Upon activation of the standby coordinator, the replicated logs are used to reconstruct the state of the Cloudberry coordinator host at the time of the last successfully committed transaction."]}),"\n",(0,i.jsxs)(e.p,{children:["In order to use ",(0,i.jsx)(e.code,{children:"gpactivatestandby"})," to activate a new primary coordinator host, the coordinator host that was previously serving as the primary coordinator cannot be running. The utility checks for a ",(0,i.jsx)(e.code,{children:"postmaster.pid"})," file in the data directory of the deactivated coordinator host, and if it finds it there, it will assume the old coordinator host is still active. In some cases, you may need to remove the ",(0,i.jsx)(e.code,{children:"postmaster.pid"})," file from the deactivated coordinator host data directory before running ",(0,i.jsx)(e.code,{children:"gpactivatestandby"})," (for example, if the deactivated coordinator host process was terminated unexpectedly)."]}),"\n",(0,i.jsxs)(e.p,{children:["After activating a standby coordinator, run ",(0,i.jsx)(e.code,{children:"ANALYZE"})," to update the database query statistics. For example:"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-shell",children:"psql <dbname> -c 'ANALYZE;'\n"})}),"\n",(0,i.jsxs)(e.p,{children:["After you activate the standby coordinator as the primary coordinator, the Cloudberry Database system no longer has a standby coordinator configured. You might want to specify another host to be the new standby with the ",(0,i.jsx)(e.a,{href:"/zh/docs/sys-utilities/gpinitstandby",children:"gpinitstandby"})," utility."]}),"\n",(0,i.jsx)(e.h2,{id:"options",children:"Options"}),"\n",(0,i.jsx)(e.p,{children:(0,i.jsx)(e.strong,{children:(0,i.jsx)(e.code,{children:"-a (do not prompt)"})})}),"\n",(0,i.jsx)(e.p,{children:"Do not prompt the user for confirmation."}),"\n",(0,i.jsx)(e.p,{children:(0,i.jsx)(e.strong,{children:(0,i.jsx)(e.code,{children:"-d standby_coordinator_datadir"})})}),"\n",(0,i.jsx)(e.p,{children:"The absolute path of the data directory for the coordinator host you are activating."}),"\n",(0,i.jsxs)(e.p,{children:["If this option is not specified, ",(0,i.jsx)(e.code,{children:"gpactivatestandby"})," uses the value of the ",(0,i.jsx)(e.code,{children:"COORDINATOR_DATA_DIRECTORY"})," environment variable setting on the coordinator host you are activating. If this option is specified, it overrides any setting of ",(0,i.jsx)(e.code,{children:"COORDINATOR_DATA_DIRECTORY"}),"."]}),"\n",(0,i.jsx)(e.p,{children:"If a directory cannot be determined, the utility returns an error."}),"\n",(0,i.jsx)(e.p,{children:(0,i.jsx)(e.strong,{children:(0,i.jsx)(e.code,{children:"-f (force activation)"})})}),"\n",(0,i.jsx)(e.p,{children:"Use this option to force activation of the backup coordinator host. Use this option only if you are sure that the standby and primary coordinator hosts are consistent."}),"\n",(0,i.jsx)(e.p,{children:(0,i.jsx)(e.strong,{children:(0,i.jsx)(e.code,{children:"-l logfile_directory"})})}),"\n",(0,i.jsxs)(e.p,{children:["The directory to write the log file. Defaults to ",(0,i.jsx)(e.code,{children:"~/gpAdminLogs"}),"."]}),"\n",(0,i.jsx)(e.p,{children:(0,i.jsx)(e.strong,{children:(0,i.jsx)(e.code,{children:"-q (no screen output)"})})}),"\n",(0,i.jsx)(e.p,{children:"Run in quiet mode. Command output is not displayed on the screen, but is still written to the log file."}),"\n",(0,i.jsx)(e.p,{children:(0,i.jsx)(e.strong,{children:(0,i.jsx)(e.code,{children:"-v (show utility version)"})})}),"\n",(0,i.jsx)(e.p,{children:"Displays the version, status, last updated date, and check sum of this utility."}),"\n",(0,i.jsx)(e.p,{children:(0,i.jsx)(e.strong,{children:(0,i.jsx)(e.code,{children:"-? | -h | --help (help)"})})}),"\n",(0,i.jsx)(e.p,{children:"Displays the online help."}),"\n",(0,i.jsx)(e.h2,{id:"example",children:"Example"}),"\n",(0,i.jsx)(e.p,{children:"Activate the standby coordinator host and make it the active coordinator instance for a Cloudberry Database system (run from backup coordinator host you are activating):"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-shell",children:"gpactivatestandby -d /gpdata\n"})}),"\n",(0,i.jsx)(e.h2,{id:"see-also",children:"See also"}),"\n",(0,i.jsxs)(e.p,{children:[(0,i.jsx)(e.a,{href:"/zh/docs/sys-utilities/gpinitsystem",children:"gpinitsystem"}),", ",(0,i.jsx)(e.a,{href:"/zh/docs/sys-utilities/gpinitstandby",children:"gpinitstandby"})]})]})}function l(t={}){const{wrapper:e}={...(0,s.a)(),...t.components};return e?(0,i.jsx)(e,{...t,children:(0,i.jsx)(h,{...t})}):h(t)}},11151:(t,e,n)=>{n.d(e,{Z:()=>r,a:()=>a});var i=n(67294);const s={},o=i.createContext(s);function a(t){const e=i.useContext(o);return i.useMemo((function(){return"function"==typeof t?t(e):{...e,...t}}),[e,t])}function r(t){let e;return e=t.disableParentContext?"function"==typeof t.components?t.components(s):t.components||s:a(t.components),i.createElement(o.Provider,{value:e},t.children)}}}]);