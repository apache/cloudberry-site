"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[1135],{44311:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>r,default:()=>l,frontMatter:()=>o,metadata:()=>a,toc:()=>c});var s=n(85893),i=n(11151);const o={title:"gpinitstandby"},r="gpinitstandby",a={id:"sys-utilities/gpinitstandby",title:"gpinitstandby",description:"Adds and/or initializes a standby coordinator host for a Apache Cloudberry system.",source:"@site/docs/sys-utilities/gpinitstandby.md",sourceDirName:"sys-utilities",slug:"/sys-utilities/gpinitstandby",permalink:"/zh/docs/sys-utilities/gpinitstandby",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sys-utilities/gpinitstandby.md",tags:[],version:"current",lastUpdatedBy:"Dianjin Wang",lastUpdatedAt:1743488661,formattedLastUpdatedAt:"2025\u5e744\u67081\u65e5",frontMatter:{title:"gpinitstandby"},sidebar:"docsbars",previous:{title:"gpfdist",permalink:"/zh/docs/sys-utilities/gpfdist"},next:{title:"gpinitsystem",permalink:"/zh/docs/sys-utilities/gpinitsystem"}},d={},c=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Options",id:"options",level:2},{value:"Examples",id:"examples",level:2},{value:"See also",id:"see-also",level:2}];function h(e){const t={a:"a",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h1,{id:"gpinitstandby",children:"gpinitstandby"}),"\n",(0,s.jsx)(t.p,{children:"Adds and/or initializes a standby coordinator host for a Apache Cloudberry system."}),"\n",(0,s.jsx)(t.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-shell",children:"gpinitstandby { -s <standby_hostname> [-P port] | -r | -n } [-a] [-q] \n    [-D] [-S <standby_data_directory>] [-l <logfile_directory>] \n    [--hba-hostnames <boolean>] \n\ngpinitstandby -v \n\ngpinitstandby -?\n"})}),"\n",(0,s.jsx)(t.h2,{id:"description",children:"Description"}),"\n",(0,s.jsxs)(t.p,{children:["The ",(0,s.jsx)(t.code,{children:"gpinitstandby"})," utility adds a backup, standby coordinator instance to your Apache Cloudberry system. If your system has an existing standby coordinator instance configured, use the ",(0,s.jsx)(t.code,{children:"-r"})," option to remove it before adding the new standby coordinator instance."]}),"\n",(0,s.jsx)(t.p,{children:"Before running this utility, make sure that the Apache Cloudberry software is installed on the standby coordinator host and that you have exchanged SSH keys between the hosts. It is recommended that the coordinator port is set to the same port number on the coordinator host and the standby coordinator host."}),"\n",(0,s.jsxs)(t.p,{children:["This utility should be run on the currently active ",(0,s.jsx)(t.em,{children:"primary"})," coordinator host."]}),"\n",(0,s.jsx)(t.p,{children:"The utility performs the following steps:"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:["Updates the Apache Cloudberry system catalog to remove the existing standby coordinator information (if the ",(0,s.jsx)(t.code,{children:"-r"})," option is supplied)"]}),"\n",(0,s.jsx)(t.li,{children:"Updates the Apache Cloudberry system catalog to add the new standby coordinator instance information"}),"\n",(0,s.jsxs)(t.li,{children:["Edits the ",(0,s.jsx)(t.code,{children:"pg_hba.conf"})," file of the Apache Cloudberry coordinator to allow access from the newly added standby coordinator"]}),"\n",(0,s.jsx)(t.li,{children:"Sets up the standby coordinator instance on the alternate coordinator host"}),"\n",(0,s.jsx)(t.li,{children:"Starts the synchronization process"}),"\n"]}),"\n",(0,s.jsxs)(t.p,{children:["A backup, standby coordinator instance serves as a 'warm standby' in the event of the primary coordinator becoming non-operational. The standby coordinator is kept up to date by transaction log replication processes (the ",(0,s.jsx)(t.code,{children:"walsender"})," and ",(0,s.jsx)(t.code,{children:"walreceiver"}),"), which run on the primary coordinator and standby coordinator hosts and keep the data between the primary and standby coordinator instances synchronized. If the primary coordinator fails, the log replication process is shut down, and the standby coordinator can be activated in its place by using the ",(0,s.jsx)(t.code,{children:"gpactivatestandby"})," utility. Upon activation of the standby coordinator, the replicated logs are used to reconstruct the state of the coordinator instance at the time of the last successfully committed transaction."]}),"\n",(0,s.jsx)(t.p,{children:"The activated standby coordinator effectively becomes the Apache Cloudberry coordinator, accepting client connections on the coordinator port and performing normal coordinator operations such as SQL command processing and resource management."}),"\n",(0,s.jsxs)(t.blockquote,{children:["\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.strong,{children:"Important"})," If the ",(0,s.jsx)(t.code,{children:"gpinitstandby"})," utility previously failed to initialize the standby coordinator, you must delete the files in the standby coordinator data directory before running ",(0,s.jsx)(t.code,{children:"gpinitstandby"})," again. The standby coordinator data directory is not cleaned up after an initialization failure because it contains log files that can help in determining the reason for the failure."]}),"\n"]}),"\n",(0,s.jsxs)(t.p,{children:["If an initialization failure occurs, a summary report file is generated in the standby host directory ",(0,s.jsx)(t.code,{children:"/tmp"}),". The report file lists the directories on the standby host that require clean up."]}),"\n",(0,s.jsx)(t.h2,{id:"options",children:"Options"}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"-a (do not prompt)"})})}),"\n",(0,s.jsx)(t.p,{children:"Do not prompt the user for confirmation."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"-D (debug)"})})}),"\n",(0,s.jsx)(t.p,{children:"Sets logging level to debug."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"--hba-hostnames boolean"})})}),"\n",(0,s.jsxs)(t.p,{children:["Optional. Controls whether this utility uses IP addresses or host names in the ",(0,s.jsx)(t.code,{children:"pg_hba.conf"})," file when updating this file with addresses that can connect to Apache Cloudberry. When set to 0 -- the default value -- this utility uses IP addresses when updating this file. When set to 1, this utility uses host names when updating this file. For consistency, use the same value that was specified for ",(0,s.jsx)(t.code,{children:"HBA_HOSTNAMES"})," when the Apache Cloudberry system was initialized. "]}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"-l logfile_directory"})})}),"\n",(0,s.jsxs)(t.p,{children:["The directory to write the log file. Defaults to ",(0,s.jsx)(t.code,{children:"~/gpAdminLogs"}),"."]}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"-n (restart standby coordinator)"})})}),"\n",(0,s.jsx)(t.p,{children:"Specify this option to start a Apache Cloudberry standby coordinator that has been configured but has stopped for some reason."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"-P port"})})}),"\n",(0,s.jsx)(t.p,{children:"This option specifies the port that is used by the Apache Cloudberry standby coordinator. The default is the same port used by the active Apache Cloudberry coordinator."}),"\n",(0,s.jsx)(t.p,{children:"If the Apache Cloudberry standby coordinator is on the same host as the active coordinator, the ports must be different. If the ports are the same for the active and standby coordinator and the host is the same, the utility returns an error."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"-q (no screen output)"})})}),"\n",(0,s.jsx)(t.p,{children:"Run in quiet mode. Command output is not displayed on the screen, but is still written to the log file."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"-r (remove standby coordinator)"})})}),"\n",(0,s.jsx)(t.p,{children:"Removes the currently configured standby coordinator instance from your Apache Cloudberry system."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"-s standby_hostname"})})}),"\n",(0,s.jsx)(t.p,{children:"The host name of the standby coordinator host."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"-S standby_data_directory"})})}),"\n",(0,s.jsx)(t.p,{children:"The data directory to use for a new standby coordinator. The default is the same directory used by the active coordinator."}),"\n",(0,s.jsx)(t.p,{children:"If the standby coordinator is on the same host as the active coordinator, a different directory must be specified using this option."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"-v (show utility version)"})})}),"\n",(0,s.jsx)(t.p,{children:"Displays the version, status, last updated date, and checksum of this utility."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"-? (help)"})})}),"\n",(0,s.jsx)(t.p,{children:"Displays the online help."}),"\n",(0,s.jsx)(t.h2,{id:"examples",children:"Examples"}),"\n",(0,s.jsx)(t.p,{children:"Add a standby coordinator instance to your Apache Cloudberry system and start the synchronization process:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-shell",children:"gpinitstandby -s host09\n"})}),"\n",(0,s.jsx)(t.p,{children:"Start an existing standby coordinator instance and synchronize the data with the current primary coordinator instance:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-shell",children:"gpinitstandby -n\n"})}),"\n",(0,s.jsxs)(t.blockquote,{children:["\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.strong,{children:"Note"})," Do not specify the -n and -s options in the same command."]}),"\n"]}),"\n",(0,s.jsx)(t.p,{children:"Add a standby coordinator instance to your Apache Cloudberry system specifying a different port:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-shell",children:"gpinitstandby -s myhost -P 2222\n"})}),"\n",(0,s.jsxs)(t.p,{children:["If you specify the same host name as the active Apache Cloudberry coordinator, you must also specify a different port number with the ",(0,s.jsx)(t.code,{children:"-P"})," option and a standby data directory with the ",(0,s.jsx)(t.code,{children:"-S"})," option."]}),"\n",(0,s.jsx)(t.p,{children:"Remove the existing standby coordinator from your Cloudberry system configuration:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-shell",children:"gpinitstandby -r\n"})}),"\n",(0,s.jsx)(t.h2,{id:"see-also",children:"See also"}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.a,{href:"/zh/docs/sys-utilities/gpinitsystem",children:"gpinitsystem"}),", ",(0,s.jsx)(t.a,{href:"/zh/docs/sys-utilities/gpaddmirrors",children:"gpaddmirrors"}),", ",(0,s.jsx)(t.a,{href:"/zh/docs/sys-utilities/gpactivatestandby",children:"gpactivatestandby"})]})]})}function l(e={}){const{wrapper:t}={...(0,i.a)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},11151:(e,t,n)=>{n.d(t,{Z:()=>a,a:()=>r});var s=n(67294);const i={},o=s.createContext(i);function r(e){const t=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),s.createElement(o.Provider,{value:t},e.children)}}}]);