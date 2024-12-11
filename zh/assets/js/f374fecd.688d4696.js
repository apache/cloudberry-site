"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[6973],{6021:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>a,contentTitle:()=>r,default:()=>h,frontMatter:()=>o,metadata:()=>c,toc:()=>l});var t=s(85893),i=s(11151);const o={title:"gpconfig"},r="gpconfig",c={id:"sys-utilities/gpconfig",title:"gpconfig",description:"Sets server configuration parameters on all segments within a Cloudberry Database system.",source:"@site/docs/sys-utilities/gpconfig.md",sourceDirName:"sys-utilities",slug:"/sys-utilities/gpconfig",permalink:"/zh/docs/sys-utilities/gpconfig",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sys-utilities/gpconfig.md",tags:[],version:"current",lastUpdatedBy:"Dianjin Wang",lastUpdatedAt:1733912691,formattedLastUpdatedAt:"2024\u5e7412\u670811\u65e5",frontMatter:{title:"gpconfig"},sidebar:"docsbars",previous:{title:"gpcheckperf",permalink:"/zh/docs/sys-utilities/gpcheckperf"},next:{title:"gpdeletesystem",permalink:"/zh/docs/sys-utilities/gpdeletesystem"}},a={},l=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Options",id:"options",level:2},{value:"Examples",id:"examples",level:2},{value:"See also",id:"see-also",level:2}];function d(e){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"gpconfig",children:"gpconfig"}),"\n",(0,t.jsx)(n.p,{children:"Sets server configuration parameters on all segments within a Cloudberry Database system."}),"\n",(0,t.jsx)(n.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"gpconfig -c <param_name> -v <value> [-m <coordinator_value> | --coordinatoronly]\n\xa0\xa0\xa0\xa0\xa0\xa0\xa0| -r <param_name> [--coordinatoronly]\n       | -l\n\xa0\xa0     [--skipvalidation] [--verbose] [--debug]\n\ngpconfig -s <param_name> [--file | --file-compare] [--verbose] [--debug]\n\ngpconfig --help\n"})}),"\n",(0,t.jsx)(n.h2,{id:"description",children:"Description"}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.code,{children:"gpconfig"})," utility allows you to set, unset, or view configuration parameters from the ",(0,t.jsx)(n.code,{children:"postgresql.conf"})," files of all instances (coordinator, segments, and mirrors) in your Cloudberry Database system. When setting a parameter, you can also specify a different value for the coordinator if necessary. For example, parameters such as ",(0,t.jsx)(n.code,{children:"max_connections"})," require a different setting on the coordinator than what is used for the segments. If you want to set or unset a global or coordinator only parameter, use the ",(0,t.jsx)(n.code,{children:"--coordinatoronly"})," option."]}),"\n",(0,t.jsxs)(n.blockquote,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Note"})," For configuration parameters of vartype ",(0,t.jsx)(n.code,{children:"string"}),", you may not pass values enclosed in single quotes to ",(0,t.jsx)(n.code,{children:"gpconfig -c"}),"."]}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"gpconfig"})," can only be used to manage certain parameters. For example, you cannot use it to set parameters such as ",(0,t.jsx)(n.code,{children:"port"}),", which is required to be distinct for every segment instance. Use the ",(0,t.jsx)(n.code,{children:"-l"})," (list) option to see a complete list of configuration parameters supported by ",(0,t.jsx)(n.code,{children:"gpconfig"}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["When ",(0,t.jsx)(n.code,{children:"gpconfig"})," sets a configuration parameter in a segment ",(0,t.jsx)(n.code,{children:"postgresql.conf"})," file, the new parameter setting always displays at the bottom of the file. When you use ",(0,t.jsx)(n.code,{children:"gpconfig"})," to remove a configuration parameter setting, ",(0,t.jsx)(n.code,{children:"gpconfig"})," comments out the parameter in all segment ",(0,t.jsx)(n.code,{children:"postgresql.conf"})," files, thereby restoring the system default setting. For example, if you use ",(0,t.jsx)(n.code,{children:"gpconfig"}),"to remove (comment out) a parameter and later add it back (set a new value), there will be two instances of the parameter; one that is commented out, and one that is enabled and inserted at the bottom of the ",(0,t.jsx)(n.code,{children:"postgresql.conf"})," file."]}),"\n",(0,t.jsxs)(n.p,{children:["After setting a parameter, you must restart your Cloudberry Database system or reload the ",(0,t.jsx)(n.code,{children:"postgresql.conf"})," files in order for the change to take effect. Whether you require a restart or a reload depends on the parameter."]}),"\n",(0,t.jsxs)(n.p,{children:["To show the currently set values for a parameter across the system, use the ",(0,t.jsx)(n.code,{children:"-s"})," option."]}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"gpconfig"})," uses the following environment variables to connect to the Cloudberry Database coordinator instance and obtain system configuration information:"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"PGHOST"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"PGPORT"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"PGUSER"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"PGPASSWORD"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"PGDATABASE"})}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"options",children:"Options"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"-c | --change param_name"})})}),"\n",(0,t.jsxs)(n.p,{children:["Changes a configuration parameter setting by adding the new setting to the bottom of the ",(0,t.jsx)(n.code,{children:"postgresql.conf"})," files."]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"-v | --value value"})})}),"\n",(0,t.jsxs)(n.p,{children:["The value to use for the configuration parameter you specified with the ",(0,t.jsx)(n.code,{children:"-c"})," option. By default, this value is applied to all segments, their mirrors, the coordinator, and the standby coordinator."]}),"\n",(0,t.jsxs)(n.p,{children:["The utility correctly quotes the value when adding the setting to the ",(0,t.jsx)(n.code,{children:"postgresql.conf"})," files."]}),"\n",(0,t.jsxs)(n.p,{children:["To set the value to an empty string, enter empty single quotes (",(0,t.jsx)(n.code,{children:"''"}),")."]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"-m | --coordinatorvalue coordinator_value"})})}),"\n",(0,t.jsxs)(n.p,{children:["The coordinator value to use for the configuration parameter you specified with the ",(0,t.jsx)(n.code,{children:"-c"})," option. If specified, this value only applies to the coordinator and standby coordinator. This option can only be used with ",(0,t.jsx)(n.code,{children:"-v"}),"."]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"--coordinatoronly"})})}),"\n",(0,t.jsxs)(n.p,{children:["When specified, ",(0,t.jsx)(n.code,{children:"gpconfig"})," will only edit the coordinator ",(0,t.jsx)(n.code,{children:"postgresql.conf"})," file."]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"-r | --remove param_name"})})}),"\n",(0,t.jsxs)(n.p,{children:["Removes a configuration parameter setting by commenting out the entry in the ",(0,t.jsx)(n.code,{children:"postgresql.conf"})," files."]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"-l | --list"})})}),"\n",(0,t.jsxs)(n.p,{children:["Lists all configuration parameters supported by the ",(0,t.jsx)(n.code,{children:"gpconfig"})," utility."]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"-s | --show param_name"})})}),"\n",(0,t.jsxs)(n.p,{children:["Shows the value for a configuration parameter used on all instances (coordinator and segments) in the Cloudberry Database system. If there is a difference in a parameter value among the instances, the utility displays an error message. Running ",(0,t.jsx)(n.code,{children:"gpconfig"})," with the ",(0,t.jsx)(n.code,{children:"-s"})," option reads parameter values directly from the database, and not the ",(0,t.jsx)(n.code,{children:"postgresql.conf"})," file. If you are using ",(0,t.jsx)(n.code,{children:"gpconfig"})," to set configuration parameters across all segments, then running ",(0,t.jsx)(n.code,{children:"gpconfig -s"})," to verify the changes, you might still see the previous (old) values. You must reload the configuration files (",(0,t.jsx)(n.code,{children:"gpstop -u"}),") or restart the system (",(0,t.jsx)(n.code,{children:"gpstop -r"}),") for changes to take effect."]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"--file"})})}),"\n",(0,t.jsxs)(n.p,{children:["For a configuration parameter, shows the value from the ",(0,t.jsx)(n.code,{children:"postgresql.conf"})," file on all instances (coordinator and segments) in the Cloudberry Database system. If there is a difference in a parameter value among the instances, the utility displays a message. Must be specified with the ",(0,t.jsx)(n.code,{children:"-s"})," option."]}),"\n",(0,t.jsxs)(n.p,{children:["For example, the configuration parameter ",(0,t.jsx)(n.code,{children:"statement_mem"})," is set to 64MB for a user with the ",(0,t.jsx)(n.code,{children:"ALTER ROLE"})," command, and the value in the ",(0,t.jsx)(n.code,{children:"postgresql.conf"})," file is 128MB. Running the command ",(0,t.jsx)(n.code,{children:"gpconfig -s statement_mem --file"})," displays 128MB. The command ",(0,t.jsx)(n.code,{children:"gpconfig -s statement_mem"})," run by the user displays 64MB."]}),"\n",(0,t.jsxs)(n.p,{children:["Not valid with the ",(0,t.jsx)(n.code,{children:"--file-compare"})," option."]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"--file-compare"})})}),"\n",(0,t.jsxs)(n.p,{children:["For a configuration parameter, compares the current Cloudberry Database value with the value in the ",(0,t.jsx)(n.code,{children:"postgresql.conf"})," files on hosts (coordinator and segments). The values in the ",(0,t.jsx)(n.code,{children:"postgresql.conf files"})," represent the value when Cloudberry Database is restarted."]}),"\n",(0,t.jsx)(n.p,{children:"If the values are not the same, the utility displays the values from all hosts. If all hosts have the same value, the utility displays a summary report."}),"\n",(0,t.jsxs)(n.p,{children:["Not valid with the ",(0,t.jsx)(n.code,{children:"--file"})," option."]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"--skipvalidation"})})}),"\n",(0,t.jsxs)(n.p,{children:["Overrides the system validation checks of ",(0,t.jsx)(n.code,{children:"gpconfig"})," and allows you to operate on any server configuration parameter, including hidden parameters and restricted parameters that cannot be changed by ",(0,t.jsx)(n.code,{children:"gpconfig"}),". When used with the ",(0,t.jsx)(n.code,{children:"-l"})," option (list), it shows the list of restricted parameters."]}),"\n",(0,t.jsxs)(n.blockquote,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Caution"})," Use extreme caution when setting configuration parameters with this option."]}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"--verbose"})})}),"\n",(0,t.jsxs)(n.p,{children:["Displays additional log information during ",(0,t.jsx)(n.code,{children:"gpconfig"})," command execution."]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"--debug"})})}),"\n",(0,t.jsx)(n.p,{children:"Sets logging output to debug level."}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"-? | -h | --help"})})}),"\n",(0,t.jsx)(n.p,{children:"Displays the online help."}),"\n",(0,t.jsx)(n.h2,{id:"examples",children:"Examples"}),"\n",(0,t.jsxs)(n.p,{children:["Set the ",(0,t.jsx)(n.code,{children:"max_connections"})," setting to 100 on all segments and 10 on the coordinator:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"gpconfig -c max_connections -v 100 -m 10\n"})}),"\n",(0,t.jsx)(n.p,{children:"These examples shows the syntax required due to bash shell string processing."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"gpconfig -c search_path -v '\"\\$user\",public'\ngpconfig -c dynamic_library_path -v '\\$libdir'\n"})}),"\n",(0,t.jsxs)(n.p,{children:["The configuration parameters are added to the ",(0,t.jsx)(n.code,{children:"postgresql.conf"})," file."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"search_path='\"$user\",public'\ndynamic_library_path='$libdir'\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Comment out all instances of the ",(0,t.jsx)(n.code,{children:"default_statistics_target"})," configuration parameter, and restore the system default:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"gpconfig -r default_statistics_target\n"})}),"\n",(0,t.jsxs)(n.p,{children:["List all configuration parameters supported by ",(0,t.jsx)(n.code,{children:"gpconfig"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"gpconfig -l\n"})}),"\n",(0,t.jsx)(n.p,{children:"Show the values of a particular configuration parameter across the system:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"gpconfig -s max_connections\n"})}),"\n",(0,t.jsx)(n.h2,{id:"see-also",children:"See also"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.a,{href:"/zh/docs/sys-utilities/gpstop",children:"gpstop"})})]})}function h(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},11151:(e,n,s)=>{s.d(n,{Z:()=>c,a:()=>r});var t=s(67294);const i={},o=t.createContext(i);function r(e){const n=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),t.createElement(o.Provider,{value:n},e.children)}}}]);