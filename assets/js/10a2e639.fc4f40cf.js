"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[4809],{87513:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>h,frontMatter:()=>o,metadata:()=>r,toc:()=>c});var s=t(85893),i=t(11151);const o={title:"CREATE EXTENSION"},a="CREATE EXTENSION",r={id:"sql-stmts/create-extension",title:"CREATE EXTENSION",description:"Registers an extension in a Cloudberry Database.",source:"@site/docs/sql-stmts/create-extension.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/create-extension",permalink:"/docs/sql-stmts/create-extension",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/create-extension.md",tags:[],version:"current",lastUpdatedBy:"Ed Espino",lastUpdatedAt:1732764009,formattedLastUpdatedAt:"Nov 28, 2024",frontMatter:{title:"CREATE EXTENSION"},sidebar:"docsbars",previous:{title:"CREATE DOMAIN",permalink:"/docs/sql-stmts/create-domain"},next:{title:"CREATE EXTERNAL TABLE",permalink:"/docs/sql-stmts/create-external-table"}},l={},c=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Notes",id:"notes",level:2},{value:"Examples",id:"examples",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function d(e){const n={a:"a",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,i.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"create-extension",children:"CREATE EXTENSION"}),"\n",(0,s.jsx)(n.p,{children:"Registers an extension in a Cloudberry Database."}),"\n",(0,s.jsx)(n.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"CREATE EXTENSION [ IF NOT EXISTS ] <extension_name>\n  [ WITH ] [ SCHEMA <schema_name> ]\n           [ VERSION <version> ]\n           [ FROM <old_version> ]\n           [ CASCADE ]\n"})}),"\n",(0,s.jsx)(n.h2,{id:"description",children:"Description"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"CREATE EXTENSION"})," loads a new extension into the current database. There must not be an extension of the same name already loaded."]}),"\n",(0,s.jsxs)(n.p,{children:["Loading an extension essentially amounts to running the extension script file. The script typically creates new SQL objects such as functions, data types, operators, and index support methods. ",(0,s.jsx)(n.code,{children:"CREATE EXTENSION"})," additionally records the identities of all of the created objects, so that they can be dropped again if ",(0,s.jsx)(n.code,{children:"DROP EXTENSION"})," is issued."]}),"\n",(0,s.jsxs)(n.p,{children:["Loading an extension requires the same privileges that would be required to create its component objects. For most extensions this means superuser or database owner privileges are required. The user who runs ",(0,s.jsx)(n.code,{children:"CREATE EXTENSION"})," becomes the owner of the extension for purposes of later privilege checks, as well as the owner of any objects created by the extension script."]}),"\n",(0,s.jsx)(n.h2,{id:"parameters",children:"Parameters"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"IF NOT EXISTS"})})}),"\n",(0,s.jsx)(n.p,{children:"Do not throw an error if an extension with the same name already exists. Cloudberry Database issues a notice in this case. Note that there is no guarantee that the existing extension is anything like the one that would have been created from the currently-available script file."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"extension_name"})})}),"\n",(0,s.jsxs)(n.p,{children:["The name of the extension to be installed. Cloudberry Database will create the extension using details from the file ",(0,s.jsx)(n.code,{children:"SHAREDIR/extension/<extension_name>.control"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"SHAREDIR"})," is the installation shared-data directory, for example ",(0,s.jsx)(n.code,{children:"/usr/local/cloudberry-db/share/postgresql"}),". The command ",(0,s.jsx)(n.code,{children:"pg_config --sharedir"})," displays the directory."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"schema_name"})})}),"\n",(0,s.jsx)(n.p,{children:"The name of the schema in which to install the extension objects, given that the extension allows its contents to be relocated. The named schema must already exist. If not specified, and the extension's control file does not specify a schema either, the current default object creation schema is used."}),"\n",(0,s.jsxs)(n.p,{children:["If the extension specifies a schema parameter in its control file, then that schema cannot be overridden with a ",(0,s.jsx)(n.code,{children:"SCHEMA"})," clause. Normally, an error is raised if a ",(0,s.jsx)(n.code,{children:"SCHEMA"})," clause is given and it conflicts with the extension's ",(0,s.jsx)(n.code,{children:"schema"})," parameter. However, if the ",(0,s.jsx)(n.code,{children:"CASCADE"})," clause is also given, then schema_name is ignored when it conflicts. The given schema_name is used for installation of any needed extensions that do not a specify schema in their control files."]}),"\n",(0,s.jsx)(n.p,{children:"Remember that the extension itself is not considered to be within any schema: extensions have unqualified names that must be unique database-wide. But objects belonging to the extension can be within schemas."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"version"})})}),"\n",(0,s.jsx)(n.p,{children:"The version of the extension to install. This can be written as either an identifier or a string literal. The default version is whatever is specified in the extension's control file."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"old_version"})})}),"\n",(0,s.jsxs)(n.p,{children:["Specify ",(0,s.jsx)(n.code,{children:"FROM old_version"})," only if you are attempting to install an extension that replaces an ",(0,s.jsx)(n.em,{children:"old-style"})," module that is a collection of objects that is not packaged into an extension. This option causes ",(0,s.jsx)(n.code,{children:"CREATE EXTENSION"})," to run an alternative installation script that absorbs the existing objects into the extension, instead of creating new objects. Ensure that ",(0,s.jsx)(n.code,{children:"SCHEMA"})," specifies the schema containing these pre-existing objects.\nThe value to use for old_version is determined by the extension's author, and might vary if there is more than one version of the old-style module that can be upgraded into an extension."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"CASCADE"})})}),"\n",(0,s.jsxs)(n.p,{children:["Automatically install any extensions that this extension depends on that are not already installed. Dependent extensions are checked recursively and those dependencies are also installed automatically. If the ",(0,s.jsx)(n.code,{children:"SCHEMA"})," clause is specified, the schema applies to the extension and all dependent extensions that are installed. Other options that are specified are not applied to the automatically-installed dependent extensions; in particular, their default versions are always selected."]}),"\n",(0,s.jsx)(n.h2,{id:"notes",children:"Notes"}),"\n",(0,s.jsxs)(n.p,{children:["Before you can use ",(0,s.jsx)(n.code,{children:"CREATE EXTENSION"})," to load an extension into a database, the extension's supporting files must be installed. The supporting files must be installed in the same location on all Cloudberry Database hosts. For information about creating new extensions, see the PostgreSQL ",(0,s.jsx)(n.a,{href:"https://www.postgresql.org/docs/12/extend-extensions.html",children:"Packaging Related Objects into an Extension"})," documentation."]}),"\n",(0,s.jsx)(n.p,{children:"The extensions currently available for loading can be identified from the pg_available_extensions or pg_available_extension_versions system views."}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Note:"})," Installing an extension as superuser requires trusting that the extension's author wrote the extension installation script in a secure fashion. It is not terribly difficult for a malicious user to create trojan-horse objects that will compromise later execution of a carelessly-written extension script, allowing that user to acquire superuser privileges. However, trojan-horse objects are only hazardous if they are in the ",(0,s.jsx)(n.code,{children:"search_path"})," during script execution, meaning that they are in the extension's installation target schema or in the schema of some extension it depends on. Therefore, a good rule of thumb when dealing with extensions whose scripts have not been carefully vetted is to install them only into schemas for which ",(0,s.jsx)(n.code,{children:"CREATE"})," privilege has not been and will not be granted to any untrusted users. Likewise for any extensions they depend on. d"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"The extensions supplied with Cloudberry Database are believed to be secure against installation-time attacks of this sort, except for a few that depend on other extensions. As stated in the documentation for those extensions, they should be installed into secure schemas, or installed into the same schemas as the extensions they depend on, or both."}),"\n",(0,s.jsx)(n.h2,{id:"examples",children:"Examples"}),"\n",(0,s.jsxs)(n.p,{children:["Install the ",(0,s.jsx)(n.code,{children:"hstore"})," extension into the current database, placing its objects in schema ",(0,s.jsx)(n.code,{children:"addons"}),":"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"CREATE EXTENSION hstore SCHEMA addons;\n"})}),"\n",(0,s.jsx)(n.p,{children:"Another way to accomplish the same thing:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"SET search_path = addons;\nCREATE EXTENSION hstore;\n"})}),"\n",(0,s.jsx)(n.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"CREATE EXTENSION"})," is a Cloudberry Database extension."]}),"\n",(0,s.jsx)(n.h2,{id:"see-also",children:"See also"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.a,{href:"/docs/sql-stmts/alter-extension",children:"ALTER EXTENSION"}),", ",(0,s.jsx)(n.a,{href:"/docs/sql-stmts/drop-extension",children:"DROP EXTENSION"})]})]})}function h(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},11151:(e,n,t)=>{t.d(n,{Z:()=>r,a:()=>a});var s=t(67294);const i={},o=s.createContext(i);function a(e){const n=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),s.createElement(o.Provider,{value:n},e.children)}}}]);