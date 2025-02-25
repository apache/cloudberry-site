"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[5959],{98580:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>d,contentTitle:()=>l,default:()=>a,frontMatter:()=>r,metadata:()=>o,toc:()=>c});var i=n(85893),t=n(11151);const r={title:"gplogfilter"},l="gplogfilter",o={id:"sys-utilities/gplogfilter",title:"gplogfilter",description:"Searches through Cloudberry Database log files for specified entries.",source:"@site/docs/sys-utilities/gplogfilter.md",sourceDirName:"sys-utilities",slug:"/sys-utilities/gplogfilter",permalink:"/docs/sys-utilities/gplogfilter",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sys-utilities/gplogfilter.md",tags:[],version:"current",lastUpdatedBy:"Dianjin Wang",lastUpdatedAt:1740470606,formattedLastUpdatedAt:"Feb 25, 2025",frontMatter:{title:"gplogfilter"},sidebar:"docsbars",previous:{title:"gpload",permalink:"/docs/sys-utilities/gpload"},next:{title:"gpmemreport",permalink:"/docs/sys-utilities/gpmemreport"}},d={},c=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Options",id:"options",level:2},{value:"Pattern matching options",id:"pattern-matching-options",level:3},{value:"Output options",id:"output-options",level:3},{value:"Examples",id:"examples",level:2},{value:"See also",id:"see-also",level:2}];function h(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",strong:"strong",...(0,t.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(s.h1,{id:"gplogfilter",children:"gplogfilter"}),"\n",(0,i.jsx)(s.p,{children:"Searches through Cloudberry Database log files for specified entries."}),"\n",(0,i.jsx)(s.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-shell",children:"gplogfilter [<timestamp_options>] [<pattern_options>] \n     [<output_options>] [<input_options>] [<input_file>] \n\ngplogfilter --help \n\ngplogfilter --version\n"})}),"\n",(0,i.jsx)(s.h2,{id:"description",children:"Description"}),"\n",(0,i.jsxs)(s.p,{children:["The ",(0,i.jsx)(s.code,{children:"gplogfilter"})," utility can be used to search through a Cloudberry Database log file for entries matching the specified criteria. If an input file is not supplied, then ",(0,i.jsx)(s.code,{children:"gplogfilter"})," will use the ",(0,i.jsx)(s.code,{children:"$COORDINATOR_DATA_DIRECTORY"})," environment variable to locate the Cloudberry coordinator log file in the standard logging location. To read from standard input, use a dash (",(0,i.jsx)(s.code,{children:"-"}),") as the input file name. Input files may be compressed using ",(0,i.jsx)(s.code,{children:"gzip"}),". In an input file, a log entry is identified by its timestamp in ",(0,i.jsx)(s.code,{children:"YYYY-MM-DD [hh:mm[:ss]]"})," format."]}),"\n",(0,i.jsxs)(s.p,{children:["You can also use ",(0,i.jsx)(s.code,{children:"gplogfilter"})," to search through all segment log files at once by running it through the ",(0,i.jsx)(s.a,{href:"/docs/sys-utilities/gpssh",children:"gpssh"})," utility. For example, to display the last three lines of each segment log file:"]}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-shell",children:"gpssh -f seg_host_file\n=> source /usr/local/cloudberry-db/greenplum_path.sh\n=> gplogfilter -n 3 /gpdata/*/log/gpdb*.csv\n"})}),"\n",(0,i.jsxs)(s.p,{children:["By default, the output of ",(0,i.jsx)(s.code,{children:"gplogfilter"})," is sent to standard output. Use the ",(0,i.jsx)(s.code,{children:"-o"})," option to send the output to a file or a directory. If you supply an output file name ending in ",(0,i.jsx)(s.code,{children:".gz"}),", the output file will be compressed by default using maximum compression. If the output destination is a directory, the output file is given the same name as the input file."]}),"\n",(0,i.jsx)(s.h2,{id:"options",children:"Options"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.strong,{children:"Timestamp Options"})}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.strong,{children:(0,i.jsx)(s.code,{children:"-b datetime | --begin=datetime"})})}),"\n",(0,i.jsxs)(s.p,{children:["Specifies a starting date and time to begin searching for log entries in the format of ",(0,i.jsx)(s.code,{children:"YYYY-MM-DD [hh:mm[:ss]]"}),"."]}),"\n",(0,i.jsx)(s.p,{children:"If a time is specified, the date and time must be enclosed in either single or double quotes. This example encloses the date and time in single quotes:"}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-shell",children:"gplogfilter -b '2013-05-23 14:33'\n"})}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.strong,{children:(0,i.jsx)(s.code,{children:"-e datetime | --end=datetime"})})}),"\n",(0,i.jsxs)(s.p,{children:["Specifies an ending date and time to stop searching for log entries in the format of ",(0,i.jsx)(s.code,{children:"YYYY-MM-DD [hh:mm[:ss]]"}),"."]}),"\n",(0,i.jsx)(s.p,{children:"If a time is specified, the date and time must be enclosed in either single or double quotes. This example encloses the date and time in single quotes:"}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-shell",children:"gplogfilter -e '2013-05-23 14:33' \n"})}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.strong,{children:(0,i.jsx)(s.code,{children:"-d<time> | --duration=<time>"})})}),"\n",(0,i.jsxs)(s.p,{children:["Specifies a time duration to search for log entries in the format of ",(0,i.jsx)(s.code,{children:"[hh][:mm[:ss]]"}),". If used without either the ",(0,i.jsx)(s.code,{children:"-b"})," or ",(0,i.jsx)(s.code,{children:"-e"})," option, will use the current time as a basis."]}),"\n",(0,i.jsx)(s.h3,{id:"pattern-matching-options",children:"Pattern matching options"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.strong,{children:(0,i.jsx)(s.code,{children:"-c i [gnore] | r [espect] | --case=i [gnore] | r [espect]"})})}),"\n",(0,i.jsxs)(s.p,{children:["Matching of alphabetic characters is case sensitive by default unless proceeded by the ",(0,i.jsx)(s.code,{children:"--case=ignore"})," option."]}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.strong,{children:(0,i.jsx)(s.code,{children:"-C 'string' | --columns='string'"})})}),"\n",(0,i.jsx)(s.p,{children:"Selects specific columns from the log file. Specify the desired columns as a comma-delimited string of column numbers beginning with 1, where the second column from left is 2, the third is 3, and so on."}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.strong,{children:(0,i.jsx)(s.code,{children:"-f 'string' | --find='string'"})})}),"\n",(0,i.jsx)(s.p,{children:"Finds the log entries containing the specified string."}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.strong,{children:(0,i.jsx)(s.code,{children:"-F 'string' | --nofind='string'"})})}),"\n",(0,i.jsx)(s.p,{children:"Rejects the log entries containing the specified string."}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.strong,{children:(0,i.jsx)(s.code,{children:"-m regex | --match=regex"})})}),"\n",(0,i.jsxs)(s.p,{children:["Finds log entries that match the specified Python regular expression. See ",(0,i.jsx)(s.a,{href:"https://docs.python.org/library/re.html",children:"https://docs.python.org/library/re.html"})," for Python regular expression syntax."]}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.strong,{children:(0,i.jsx)(s.code,{children:"-M regex | --nomatch=regex"})})}),"\n",(0,i.jsxs)(s.p,{children:["Rejects log entries that match the specified Python regular expression. See ",(0,i.jsx)(s.a,{href:"https://docs.python.org/library/re.html",children:"https://docs.python.org/library/re.html"})," for Python regular expression syntax."]}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.strong,{children:(0,i.jsx)(s.code,{children:"-t | --trouble"})})}),"\n",(0,i.jsxs)(s.p,{children:["Finds only the log entries that have ",(0,i.jsx)(s.code,{children:"ERROR:"}),", ",(0,i.jsx)(s.code,{children:"FATAL:"}),", or ",(0,i.jsx)(s.code,{children:"PANIC:"})," in the first line."]}),"\n",(0,i.jsx)(s.h3,{id:"output-options",children:"Output options"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.strong,{children:(0,i.jsx)(s.code,{children:"-n <integer> | --tail=<integer>"})})}),"\n",(0,i.jsxs)(s.p,{children:["Limits the output to the last ",(0,i.jsx)(s.code,{children:"<integer>"})," of qualifying log entries found."]}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.strong,{children:(0,i.jsx)(s.code,{children:"-s <offset> [limit] | --slice=<offset> [limit]"})})}),"\n",(0,i.jsxs)(s.p,{children:["From the list of qualifying log entries, returns the ",(0,i.jsx)(s.code,{children:"<limit>"})," number of entries starting at the ",(0,i.jsx)(s.code,{children:"<offset>"})," entry number, where an ",(0,i.jsx)(s.code,{children:"<offset>"})," of zero (",(0,i.jsx)(s.code,{children:"0"}),") denotes the first entry in the result set and an ",(0,i.jsx)(s.code,{children:"<offset>"})," of any number greater than zero counts back from the end of the result set."]}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.strong,{children:(0,i.jsx)(s.code,{children:"-o <output_file> | --out=<output_file>"})})}),"\n",(0,i.jsxs)(s.p,{children:["Writes the output to the specified file or directory location instead of ",(0,i.jsx)(s.code,{children:"STDOUT"}),"."]}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.strong,{children:(0,i.jsx)(s.code,{children:"-z 0-9 | --zip=0-9"})})}),"\n",(0,i.jsxs)(s.p,{children:["Compresses the output file to the specified compression level using ",(0,i.jsx)(s.code,{children:"gzip"}),", where ",(0,i.jsx)(s.code,{children:"0"})," is no compression and ",(0,i.jsx)(s.code,{children:"9"})," is maximum compression. If you supply an output file name ending in ",(0,i.jsx)(s.code,{children:".gz"}),", the output file will be compressed by default using maximum compression."]}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.strong,{children:(0,i.jsx)(s.code,{children:"-a | --append"})})}),"\n",(0,i.jsx)(s.p,{children:"If the output file already exists, appends to the file instead of overwriting it."}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.strong,{children:"Input Options"})}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.strong,{children:(0,i.jsx)(s.code,{children:"input_file"})})}),"\n",(0,i.jsxs)(s.p,{children:["The name of the input log file(s) to search through. If an input file is not supplied, ",(0,i.jsx)(s.code,{children:"gplogfilter"})," will use the ",(0,i.jsx)(s.code,{children:"$COORDINATOR_DATA_DIRECTORY"})," environment variable to locate the Cloudberry Database coordinator log file. To read from standard input, use a dash (",(0,i.jsx)(s.code,{children:"-"}),") as the input file name."]}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.strong,{children:(0,i.jsx)(s.code,{children:"-u | --unzip"})})}),"\n",(0,i.jsxs)(s.p,{children:["Uncompress the input file using ",(0,i.jsx)(s.code,{children:"gunzip"}),". If the input file name ends in ",(0,i.jsx)(s.code,{children:".gz"}),", it will be uncompressed by default."]}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.strong,{children:(0,i.jsx)(s.code,{children:"--help"})})}),"\n",(0,i.jsx)(s.p,{children:"Displays the online help."}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.strong,{children:(0,i.jsx)(s.code,{children:"--version"})})}),"\n",(0,i.jsx)(s.p,{children:"Displays the version of this utility."}),"\n",(0,i.jsx)(s.h2,{id:"examples",children:"Examples"}),"\n",(0,i.jsx)(s.p,{children:"Display the last three error messages in the coordinator log file:"}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-shell",children:"gplogfilter -t -n 3\n"})}),"\n",(0,i.jsx)(s.p,{children:"Display all log messages in the coordinator log file timestamped in the last 10 minutes:"}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-shell",children:"gplogfilter -d :10\n"})}),"\n",(0,i.jsxs)(s.p,{children:["Display log messages in the coordinator log file containing the string ",(0,i.jsx)(s.code,{children:"|con6 cmd11|"}),":"]}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-shell",children:"gplogfilter -f '|con6 cmd11|'\n"})}),"\n",(0,i.jsxs)(s.p,{children:["Using ",(0,i.jsx)(s.a,{href:"/docs/sys-utilities/gpssh",children:"gpssh"}),", run ",(0,i.jsx)(s.code,{children:"gplogfilter"})," on the segment hosts and search for log messages in the segment log files containing the string ",(0,i.jsx)(s.code,{children:"con6"})," and save output to a file."]}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-shell",children:"gpssh -f seg_hosts_file -e 'source \n/usr/local/cloudberry-db/greenplum_path.sh ; gplogfilter -f \ncon6 /gpdata/*/log/gpdb*.csv' > seglog.out\n"})}),"\n",(0,i.jsx)(s.h2,{id:"see-also",children:"See also"}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"/docs/sys-utilities/gpssh",children:"gpssh"}),", ",(0,i.jsx)(s.a,{href:"/docs/sys-utilities/gpsync",children:"gpsync"})]})]})}function a(e={}){const{wrapper:s}={...(0,t.a)(),...e.components};return s?(0,i.jsx)(s,{...e,children:(0,i.jsx)(h,{...e})}):h(e)}},11151:(e,s,n)=>{n.d(s,{Z:()=>o,a:()=>l});var i=n(67294);const t={},r=i.createContext(t);function l(e){const s=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function o(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:l(e.components),i.createElement(r.Provider,{value:s},e.children)}}}]);