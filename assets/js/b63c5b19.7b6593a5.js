"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[2097],{95982:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>d,contentTitle:()=>o,default:()=>h,frontMatter:()=>r,metadata:()=>a,toc:()=>c});var n=s(85893),i=s(11151);const r={title:"gpstart"},o="gpstart",a={id:"sys-utilities/gpstart",title:"gpstart",description:"Starts a Cloudberry Database system.",source:"@site/docs/sys-utilities/gpstart.md",sourceDirName:"sys-utilities",slug:"/sys-utilities/gpstart",permalink:"/docs/sys-utilities/gpstart",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sys-utilities/gpstart.md",tags:[],version:"current",lastUpdatedBy:"Dianjin Wang",lastUpdatedAt:1733128076,formattedLastUpdatedAt:"Dec 2, 2024",frontMatter:{title:"gpstart"},sidebar:"docsbars",previous:{title:"gpssh",permalink:"/docs/sys-utilities/gpssh"},next:{title:"gpstate",permalink:"/docs/sys-utilities/gpstate"}},d={},c=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Options",id:"options",level:2},{value:"Examples",id:"examples",level:2},{value:"See also",id:"see-also",level:2}];function l(e){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h1,{id:"gpstart",children:"gpstart"}),"\n",(0,n.jsx)(t.p,{children:"Starts a Cloudberry Database system."}),"\n",(0,n.jsx)(t.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-shell",children:"gpstart [-d <coordinator_data_directory>] [-B <parallel_processes>] [-R]\n        [-m] [-y] [-a] [-t <timeout_seconds>] [-l <logfile_directory>] \n        [--skip-heap-checksum-validation]\n        [-v | -q]\n\ngpstart -? | -h | --help \n\ngpstart --version\n"})}),"\n",(0,n.jsx)(t.h2,{id:"description",children:"Description"}),"\n",(0,n.jsxs)(t.p,{children:["The ",(0,n.jsx)(t.code,{children:"gpstart"})," utility is used to start the Cloudberry Database server processes. When you start a Cloudberry Database system, you are actually starting several ",(0,n.jsx)(t.code,{children:"postgres"})," database server listener processes at once (the coordinator and all of the segment instances). The ",(0,n.jsx)(t.code,{children:"gpstart"})," utility handles the startup of the individual instances. Each instance is started in parallel."]}),"\n",(0,n.jsxs)(t.p,{children:["As part of the startup process, the utility checks the consistency of heap checksum setting among the Cloudberry Database coordinator and segment instances, either enabled or deactivated on all instances. If the heap checksum setting is different among the instances, an error is returned and Cloudberry Database does not start. The validation can be deactivated by specifying the option ",(0,n.jsx)(t.code,{children:"--skip-heap-checksum-validation"}),"."]}),"\n",(0,n.jsxs)(t.blockquote,{children:["\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.strong,{children:"Note"})," Before you can start a Cloudberry Database system, you must have initialized the system using ",(0,n.jsx)(t.code,{children:"gpinitsystem"}),". Enabling or deactivating heap checksums is set when you initialize the system and cannot be changed after initialization."]}),"\n"]}),"\n",(0,n.jsxs)(t.p,{children:["If the Cloudberry Database system is configured with a standby coordinator, and ",(0,n.jsx)(t.code,{children:"gpstart"})," does not detect it during startup, ",(0,n.jsx)(t.code,{children:"gpstart"})," displays a warning and lets you cancel the startup operation."]}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsxs)(t.li,{children:["\n",(0,n.jsxs)(t.p,{children:["If the ",(0,n.jsx)(t.code,{children:"-a"})," option (deactivate interactive mode prompts) is not specified, ",(0,n.jsx)(t.code,{children:"gpstart"})," displays and logs these messages:"]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{children:"Standby host is unreachable, cannot determine whether the standby is currently acting as the coordinator. Received error: <error>\nContinue only if you are certain that the standby is not acting as the coordinator.\n"})}),"\n",(0,n.jsx)(t.p,{children:"It also displays this prompt to continue startup:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{children:"Continue with startup Yy|Nn (default=N):\n"})}),"\n"]}),"\n",(0,n.jsxs)(t.li,{children:["\n",(0,n.jsxs)(t.p,{children:["If the ",(0,n.jsx)(t.code,{children:"-a"})," option is specified, the utility does not start the system. The messages are only logged, and ",(0,n.jsx)(t.code,{children:"gpstart"})," adds this log message:"]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{children:"Non interactive mode detected. Not starting the cluster. Start the cluster in interactive mode.\n"})}),"\n"]}),"\n"]}),"\n",(0,n.jsx)(t.p,{children:"If the standby coordinator is not accessible, you can start the system and troubleshoot standby coordinator issues while the system is available."}),"\n",(0,n.jsx)(t.h2,{id:"options",children:"Options"}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.strong,{children:(0,n.jsx)(t.code,{children:"-a"})})}),"\n",(0,n.jsx)(t.p,{children:"Do not prompt the user for confirmation. Deactivates interactive mode."}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.strong,{children:(0,n.jsx)(t.code,{children:"-B parallel_processes"})})}),"\n",(0,n.jsx)(t.p,{children:"The number of segments to start in parallel. If not specified, the utility will start up to 64 parallel processes depending on how many segment instances it needs to start."}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.strong,{children:(0,n.jsx)(t.code,{children:"-d coordinator_data_directory"})})}),"\n",(0,n.jsxs)(t.p,{children:["Optional. The coordinator host data directory. If not specified, the value set for ",(0,n.jsx)(t.code,{children:"$COORDINATOR_DATA_DIRECTORY"})," will be used."]}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.strong,{children:(0,n.jsx)(t.code,{children:"-l logfile_directory"})})}),"\n",(0,n.jsxs)(t.p,{children:["The directory to write the log file. Defaults to ",(0,n.jsx)(t.code,{children:"~/gpAdminLogs"}),"."]}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.strong,{children:(0,n.jsx)(t.code,{children:"-m"})})}),"\n",(0,n.jsx)(t.p,{children:"Optional. Starts the coordinator instance only, which may be useful for maintenance tasks. This mode only allows connections to the coordinator in utility mode. For example:"}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.code,{children:"PGOPTIONS='-c gp_role=utility' psql"})}),"\n",(0,n.jsx)(t.p,{children:"The consistency of the heap checksum setting on coordinator and segment instances is not checked."}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.strong,{children:(0,n.jsx)(t.code,{children:"-q"})})}),"\n",(0,n.jsx)(t.p,{children:"Run in quiet mode. Command output is not displayed on the screen, but is still written to the log file."}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.strong,{children:(0,n.jsx)(t.code,{children:"-R"})})}),"\n",(0,n.jsx)(t.p,{children:"Starts Cloudberry Database in restricted mode (only database superusers are allowed to connect)."}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.strong,{children:(0,n.jsx)(t.code,{children:"--skip-heap-checksum-validation"})})}),"\n",(0,n.jsx)(t.p,{children:"During startup, the utility does not validate the consistency of the heap checksum setting among the Cloudberry Database coordinator and segment instances. The default is to ensure that the heap checksum setting is the same on all instances, either enabled or deactivated."}),"\n",(0,n.jsxs)(t.blockquote,{children:["\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.strong,{children:"Caution"})," Starting Cloudberry Database without this validation could lead to data loss. Use this option to start Cloudberry Database only when it is necessary to ignore the heap checksum verification errors to recover data or to troubleshoot the errors."]}),"\n"]}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.strong,{children:(0,n.jsx)(t.code,{children:"-t timeout_seconds"})})}),"\n",(0,n.jsxs)(t.p,{children:["Specifies a timeout in seconds to wait for a segment instance to start up. If a segment instance was shutdown abnormally (due to power failure or killing its ",(0,n.jsx)(t.code,{children:"postgres"})," database listener process, for example), it may take longer to start up due to the database recovery and validation process. If not specified, the default timeout is 600 seconds."]}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.strong,{children:(0,n.jsx)(t.code,{children:"-v"})})}),"\n",(0,n.jsx)(t.p,{children:"Displays detailed status, progress and error messages output by the utility."}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.strong,{children:(0,n.jsx)(t.code,{children:"-y"})})}),"\n",(0,n.jsx)(t.p,{children:"Optional. Do not start the standby coordinator host. The default is to start the standby coordinator host and synchronization process."}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.strong,{children:(0,n.jsx)(t.code,{children:"-? | -h | --help"})})}),"\n",(0,n.jsx)(t.p,{children:"Displays the online help."}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.strong,{children:(0,n.jsx)(t.code,{children:"--version"})})}),"\n",(0,n.jsx)(t.p,{children:"Displays the version of this utility."}),"\n",(0,n.jsx)(t.h2,{id:"examples",children:"Examples"}),"\n",(0,n.jsx)(t.p,{children:"Start a Cloudberry Database system:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-shell",children:"gpstart\n"})}),"\n",(0,n.jsx)(t.p,{children:"Start a Cloudberry Database system in restricted mode (only allow superuser connections):"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-shell",children:"gpstart -R\n"})}),"\n",(0,n.jsx)(t.p,{children:"Start the Cloudberry coordinator instance only and connect in utility mode:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-shell",children:"gpstart -m \nPGOPTIONS='-c gp_role=utility' psql\n"})}),"\n",(0,n.jsx)(t.h2,{id:"see-also",children:"See also"}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.a,{href:"/docs/sys-utilities/gpstop",children:"gpstop"}),", ",(0,n.jsx)(t.a,{href:"/docs/sys-utilities/gpinitsystem",children:"gpinitsystem"})]})]})}function h(e={}){const{wrapper:t}={...(0,i.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(l,{...e})}):l(e)}},11151:(e,t,s)=>{s.d(t,{Z:()=>a,a:()=>o});var n=s(67294);const i={},r=n.createContext(i);function o(e){const t=n.useContext(r);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),n.createElement(r.Provider,{value:t},e.children)}}}]);