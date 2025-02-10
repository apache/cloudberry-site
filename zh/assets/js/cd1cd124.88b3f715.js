"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[8627],{12307:(e,s,a)=>{a.r(s),a.d(s,{assets:()=>d,contentTitle:()=>n,default:()=>h,frontMatter:()=>r,metadata:()=>l,toc:()=>o});var t=a(85893),i=a(11151);const r={title:"LOAD"},n="LOAD",l={id:"sql-stmts/load",title:"LOAD",description:"Loads or reloads a shared library file.",source:"@site/docs/sql-stmts/load.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/load",permalink:"/zh/docs/sql-stmts/load",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/load.md",tags:[],version:"current",lastUpdatedBy:"TomShawn",lastUpdatedAt:1739157355,formattedLastUpdatedAt:"2025\u5e742\u670810\u65e5",frontMatter:{title:"LOAD"},sidebar:"docsbars",previous:{title:"LISTEN",permalink:"/zh/docs/sql-stmts/listen"},next:{title:"LOCK",permalink:"/zh/docs/sql-stmts/lock"}},d={},o=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Examples",id:"examples",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function c(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,i.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(s.h1,{id:"load",children:"LOAD"}),"\n",(0,t.jsx)(s.p,{children:"Loads or reloads a shared library file."}),"\n",(0,t.jsx)(s.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-sql",children:"LOAD '<filename>'\n"})}),"\n",(0,t.jsx)(s.h2,{id:"description",children:"Description"}),"\n",(0,t.jsxs)(s.p,{children:["This command loads a shared library file into the Cloudberry Database server address space. If the file had been loaded previously, it is first unloaded. This command is primarily useful to unload and reload a shared library file that has been changed since the server first loaded it. To make use of the shared library, function(s) in it need to be declared using the ",(0,t.jsx)(s.code,{children:"CREATE FUNCTION"})," command."]}),"\n",(0,t.jsxs)(s.p,{children:["The library file name is typically given as just a bare file name, which is sought in the server's library search path (set by ",(0,t.jsx)(s.code,{children:"dynamic_library_path"}),"). Alternatively it can be given as a full path name. In either case the platform's standard shared library file name extension may be omitted."]}),"\n",(0,t.jsxs)(s.p,{children:["Note that in Cloudberry Database the shared library file (",(0,t.jsx)(s.code,{children:".so"})," file) must reside in the same path location on every host in the Cloudberry Database array (coordinators, segments, and mirrors)."]}),"\n",(0,t.jsxs)(s.p,{children:["Non-superusers can only apply ",(0,t.jsx)(s.code,{children:"LOAD"})," to library files located in ",(0,t.jsx)(s.code,{children:"$libdir/plugins/"})," \u2014 the specified ",(0,t.jsx)(s.code,{children:"filename"})," must begin with exactly that string. You must ensure that only \u201csafe\u201d libraries are installed there."]}),"\n",(0,t.jsx)(s.h2,{id:"parameters",children:"Parameters"}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.strong,{children:(0,t.jsx)(s.code,{children:"filename"})})}),"\n",(0,t.jsx)(s.p,{children:"The path and file name of a shared library file. This file must exist in the same location on all hosts in your Cloudberry Database array."}),"\n",(0,t.jsx)(s.h2,{id:"examples",children:"Examples"}),"\n",(0,t.jsx)(s.p,{children:"Load a shared library file:"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-sql",children:"LOAD '/usr/local/cloudberry-db/lib/myfuncs.so';\n"})}),"\n",(0,t.jsx)(s.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.code,{children:"LOAD"})," is a Cloudberry Database extension."]}),"\n",(0,t.jsx)(s.h2,{id:"see-also",children:"See also"}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.a,{href:"/zh/docs/sql-stmts/create-function",children:"CREATE FUNCTION"})})]})}function h(e={}){const{wrapper:s}={...(0,i.a)(),...e.components};return s?(0,t.jsx)(s,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},11151:(e,s,a)=>{a.d(s,{Z:()=>l,a:()=>n});var t=a(67294);const i={},r=t.createContext(i);function n(e){const s=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function l(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:n(e.components),t.createElement(r.Provider,{value:s},e.children)}}}]);