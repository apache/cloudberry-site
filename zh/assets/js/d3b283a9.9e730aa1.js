"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[98],{4795:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>o,contentTitle:()=>l,default:()=>h,frontMatter:()=>r,metadata:()=>a,toc:()=>c});var t=s(85893),i=s(11151);const r={title:"gppkg"},l="gppkg",a={id:"sys-utilities/gppkg",title:"gppkg",description:"Cloudberry Package Manager installs, upgrades, migrates, and removes Apache Cloudberry extensions in .gppkg format, such as PL/Java, PL/R, PostGIS, and MADlib, along with their dependencies, across an entire cluster.",source:"@site/docs/sys-utilities/gppkg.md",sourceDirName:"sys-utilities",slug:"/sys-utilities/gppkg",permalink:"/zh/docs/sys-utilities/gppkg",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sys-utilities/gppkg.md",tags:[],version:"current",lastUpdatedBy:"Dianjin Wang",lastUpdatedAt:1744271659,formattedLastUpdatedAt:"2025\u5e744\u670810\u65e5",frontMatter:{title:"gppkg"},sidebar:"docsbars",previous:{title:"gpmovemirrors",permalink:"/zh/docs/sys-utilities/gpmovemirrors"},next:{title:"gprestore",permalink:"/zh/docs/sys-utilities/gprestore"}},o={},c=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Commands",id:"commands",level:2},{value:"Global options",id:"global-options",level:2},{value:"Examples",id:"examples",level:2}];function d(e){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,i.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"gppkg",children:"gppkg"}),"\n",(0,t.jsxs)(n.p,{children:["Cloudberry Package Manager installs, upgrades, migrates, and removes Apache Cloudberry extensions in ",(0,t.jsx)(n.code,{children:".gppkg"})," format, such as PL/Java, PL/R, PostGIS, and MADlib, along with their dependencies, across an entire cluster."]}),"\n",(0,t.jsx)(n.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"gppkg <command> [<command_options> ...] \n\ngppkg <commmand> --h | --help\n\ngppkg --version\n\ngppkg -v | --verbose\n"})}),"\n",(0,t.jsx)(n.h2,{id:"description",children:"Description"}),"\n",(0,t.jsxs)(n.p,{children:["The Cloudberry Package Manager -- ",(0,t.jsx)(n.code,{children:"gppkg"})," -- utility installs Apache Cloudberry extensions, along with any dependencies, on all hosts across a cluster. It will also automatically install extensions on new hosts in the case of system expansion and segment recovery."]}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.code,{children:"gppkg"})," utility does not require that Apache Cloudberry is running in order to install packages."]}),"\n",(0,t.jsx)(n.p,{children:"Examples of database extensions and packages software that are delivered using the Cloudberry Package Manager:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"PL/Java"}),"\n",(0,t.jsx)(n.li,{children:"PL/R"}),"\n",(0,t.jsx)(n.li,{children:"PostGIS"}),"\n",(0,t.jsx)(n.li,{children:"MADlib"}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"commands",children:"Commands"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"help"})})}),"\n",(0,t.jsx)(n.p,{children:"Display the help for the command."}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"install <package_name> [<command_options>]"})})}),"\n",(0,t.jsx)(n.p,{children:"Install or upgrade the specified package in the cluster. This includes any pre/post installation steps and installation of any dependencies."}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"migrate --source <source_path> --destination <destination_path> [--pkglibs <pkglibs_path>] [<command_options>]"})})}),"\n",(0,t.jsxs)(n.p,{children:["Migrate all packages from one minor version of Apache Cloudberry to another. The option ",(0,t.jsx)(n.code,{children:"--source <source_path>"})," specifies the path of the source ",(0,t.jsx)(n.code,{children:"$GPHOME"}),", and the option ",(0,t.jsx)(n.code,{children:"--destination <destination_path>"})," specifies the path of the destination ",(0,t.jsx)(n.code,{children:"$GPHOME"}),". Additionally, the option ",(0,t.jsx)(n.code,{children:"--pkglibs <pkglibs_path>"})," allows you to point to a location where you may place newer version packages for the destination Cloudberry version; ",(0,t.jsx)(n.code,{children:"gppkg"})," will upgrade these packages automatically."]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"query [<package_name_string>] [<query_option>] [<command_options>]"})})}),"\n",(0,t.jsxs)(n.p,{children:["Display information about the extensions installed in the cluster. ",(0,t.jsx)(n.code,{children:"<package_name_string>"})," is a string that specifies the package name. If it is an empty string, it will match all packages. If it is a simple word, it will match all packages with the word included in the name. Use ",(0,t.jsx)(n.code,{children:"\u2013-exact"})," to specify the exact package name."]}),"\n",(0,t.jsxs)(n.table,{children:[(0,t.jsx)(n.thead,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.th,{children:"query_option"}),(0,t.jsx)(n.th,{children:"Returns"})]})}),(0,t.jsxs)(n.tbody,{children:[(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"--exact"})}),(0,t.jsxs)(n.td,{children:["The provided ",(0,t.jsx)(n.code,{children:"<package_name_string>"})," must match exactly a package name"]})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"--detail"})}),(0,t.jsx)(n.td,{children:"Provide detailed information about the package"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"--verify"})}),(0,t.jsx)(n.td,{children:"Verify the package installation"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"--local"})}),(0,t.jsx)(n.td,{children:"Do not query at cluster level"})]})]})]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"remove <package_name> [<command_options>]"})})}),"\n",(0,t.jsx)(n.p,{children:"Uninstall the specified package from the cluster."}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"sync [<command_options>]"})})}),"\n",(0,t.jsx)(n.p,{children:"Reconcile the package state of the cluster to match the state of the master host. Running this option after a failed or partial install/uninstall ensures that the package installation state is consistent across the cluster."}),"\n",(0,t.jsx)(n.h2,{id:"global-options",children:"Global options"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"--cluster_info <cluster_info>"})})}),"\n",(0,t.jsxs)(n.p,{children:["Use this option when Apache Cloudberry is not running. The input file ",(0,t.jsx)(n.code,{children:"<cluster_info>"})," contains information about the database cluster. You may generate the file by running the following command:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"psql postgres -Xc 'select dbid, content, role, preferred_role, mode, status, hostname, address, port, datadir from gp_segment_configuration order by content, preferred_role desc;' | head -n-2 | tail -n+3 | tr -d \" \" > cluster_info\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"-a | --accept"})})}),"\n",(0,t.jsx)(n.p,{children:"Do not prompt the user for confirmation."}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"-d | --dryrun"})})}),"\n",(0,t.jsx)(n.p,{children:"Run a simulation for the command, without modifying anything."}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"-f | --force"})})}),"\n",(0,t.jsx)(n.p,{children:"Skip all requirement checks and overwrite existing files."}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"-h | --help"})})}),"\n",(0,t.jsx)(n.p,{children:"Display the online help."}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"-V | --version"})})}),"\n",(0,t.jsx)(n.p,{children:"Display the version of this utility."}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"-v | --verbose"})})}),"\n",(0,t.jsx)(n.p,{children:"Set the logging level to verbose."}),"\n",(0,t.jsx)(n.h2,{id:"examples",children:"Examples"}),"\n",(0,t.jsx)(n.p,{children:"Install the Apache Cloudberry PL/Java extension:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"gppkg install ./pljava-2.0.7-gp7-rhel8_x86_64.gppkg\n"})}),"\n",(0,t.jsx)(n.p,{children:"Query all packages that are installed in a cluster:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"gppkg query\n\nDetecting network topology[=========================================] [OK] \nDetect result \n 3 unique hosts found \nDataSciencePython3.9 - 1.1.0 \n"})})]})}function h(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},11151:(e,n,s)=>{s.d(n,{Z:()=>a,a:()=>l});var t=s(67294);const i={},r=t.createContext(i);function l(e){const n=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:l(e.components),t.createElement(r.Provider,{value:n},e.children)}}}]);