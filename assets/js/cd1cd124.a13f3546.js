"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[8627],{12307:(e,s,a)=>{a.r(s),a.d(s,{assets:()=>d,contentTitle:()=>n,default:()=>h,frontMatter:()=>t,metadata:()=>l,toc:()=>o});var i=a(85893),r=a(11151);const t={title:"LOAD"},n="LOAD",l={id:"sql-stmts/load",title:"LOAD",description:"Loads or reloads a shared library file.",source:"@site/docs/sql-stmts/load.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/load",permalink:"/docs/sql-stmts/load",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/load.md",tags:[],version:"current",lastUpdatedBy:"Dianjin Wang",lastUpdatedAt:1741230918,formattedLastUpdatedAt:"Mar 6, 2025",frontMatter:{title:"LOAD"},sidebar:"docsbars",previous:{title:"LISTEN",permalink:"/docs/sql-stmts/listen"},next:{title:"LOCK",permalink:"/docs/sql-stmts/lock"}},d={},o=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Examples",id:"examples",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function c(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,r.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(s.h1,{id:"load",children:"LOAD"}),"\n",(0,i.jsx)(s.p,{children:"Loads or reloads a shared library file."}),"\n",(0,i.jsx)(s.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-sql",children:"LOAD '<filename>'\n"})}),"\n",(0,i.jsx)(s.h2,{id:"description",children:"Description"}),"\n",(0,i.jsxs)(s.p,{children:["This command loads a shared library file into the Apache Cloudberry server address space. If the file had been loaded previously, it is first unloaded. This command is primarily useful to unload and reload a shared library file that has been changed since the server first loaded it. To make use of the shared library, function(s) in it need to be declared using the ",(0,i.jsx)(s.code,{children:"CREATE FUNCTION"})," command."]}),"\n",(0,i.jsxs)(s.p,{children:["The library file name is typically given as just a bare file name, which is sought in the server's library search path (set by ",(0,i.jsx)(s.code,{children:"dynamic_library_path"}),"). Alternatively it can be given as a full path name. In either case the platform's standard shared library file name extension may be omitted."]}),"\n",(0,i.jsxs)(s.p,{children:["Note that in Apache Cloudberry the shared library file (",(0,i.jsx)(s.code,{children:".so"})," file) must reside in the same path location on every host in the Apache Cloudberry array (coordinators, segments, and mirrors)."]}),"\n",(0,i.jsxs)(s.p,{children:["Non-superusers can only apply ",(0,i.jsx)(s.code,{children:"LOAD"})," to library files located in ",(0,i.jsx)(s.code,{children:"$libdir/plugins/"})," \u2014 the specified ",(0,i.jsx)(s.code,{children:"filename"})," must begin with exactly that string. You must ensure that only \u201csafe\u201d libraries are installed there."]}),"\n",(0,i.jsx)(s.h2,{id:"parameters",children:"Parameters"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.strong,{children:(0,i.jsx)(s.code,{children:"filename"})})}),"\n",(0,i.jsx)(s.p,{children:"The path and file name of a shared library file. This file must exist in the same location on all hosts in your Apache Cloudberry array."}),"\n",(0,i.jsx)(s.h2,{id:"examples",children:"Examples"}),"\n",(0,i.jsx)(s.p,{children:"Load a shared library file:"}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-sql",children:"LOAD '/usr/local/cloudberry/lib/myfuncs.so';\n"})}),"\n",(0,i.jsx)(s.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.code,{children:"LOAD"})," is a Apache Cloudberry extension."]}),"\n",(0,i.jsx)(s.h2,{id:"see-also",children:"See also"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.a,{href:"/docs/sql-stmts/create-function",children:"CREATE FUNCTION"})})]})}function h(e={}){const{wrapper:s}={...(0,r.a)(),...e.components};return s?(0,i.jsx)(s,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},11151:(e,s,a)=>{a.d(s,{Z:()=>l,a:()=>n});var i=a(67294);const r={},t=i.createContext(r);function n(e){const s=i.useContext(t);return i.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function l(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:n(e.components),i.createElement(t.Provider,{value:s},e.children)}}}]);