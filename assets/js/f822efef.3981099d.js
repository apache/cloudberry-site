"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[3678],{37335:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>o,contentTitle:()=>l,default:()=>h,frontMatter:()=>i,metadata:()=>r,toc:()=>d});var t=a(85893),s=a(11151);const i={title:"CREATE LANGUAGE"},l="CREATE LANGUAGE",r={id:"sql-stmts/create-language",title:"CREATE LANGUAGE",description:"Defines a new procedural language.",source:"@site/docs/sql-stmts/create-language.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/create-language",permalink:"/docs/sql-stmts/create-language",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/create-language.md",tags:[],version:"current",lastUpdatedBy:"Dianjin Wang",lastUpdatedAt:1744271659,formattedLastUpdatedAt:"Apr 10, 2025",frontMatter:{title:"CREATE LANGUAGE"},sidebar:"docsbars",previous:{title:"CREATE INDEX",permalink:"/docs/sql-stmts/create-index"},next:{title:"CREATE MATERIALIZED VIEW",permalink:"/docs/sql-stmts/create-materialized-view"}},o={},d=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Notes",id:"notes",level:2},{value:"Examples",id:"examples",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function c(e){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,s.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"create-language",children:"CREATE LANGUAGE"}),"\n",(0,t.jsx)(n.p,{children:"Defines a new procedural language."}),"\n",(0,t.jsx)(n.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sql",children:"CREATE [ OR REPLACE ] [ PROCEDURAL ] LANGUAGE <name>\n\nCREATE [ OR REPLACE ] [ TRUSTED ] [ PROCEDURAL ] LANGUAGE <name>\n    HANDLER <call_handler>\n   [ INLINE <inline_handler> ] \n   [ VALIDATOR <valfunction> ]\n            \n"})}),"\n",(0,t.jsx)(n.h2,{id:"description",children:"Description"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"CREATE LANGUAGE"})," registers a new procedural language with a Apache Cloudberry. Subsequently, functions and procedures can be defined in this new language."]}),"\n",(0,t.jsxs)(n.blockquote,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Note"}),' Procedural languages for Apache Cloudberry have been made into "extensions," and should therefore be installed with ',(0,t.jsx)(n.a,{href:"/docs/sql-stmts/create-extension",children:"CREATE EXTENSION"}),", not ",(0,t.jsx)(n.code,{children:"CREATE LANGUAGE"}),". Using ",(0,t.jsx)(n.code,{children:"CREATE LANGUAGE"}),' directly should be restricted to extension installation scripts. If you have a "bare" language in your database, perhaps as a result of an upgrade, you can convert it to an extension using ',(0,t.jsx)(n.code,{children:"CREATE EXTENSION <langname> FROM unpackaged"}),"."]}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"CREATE LANGUAGE"})," effectively associates the language name with handler function(s) that are responsible for executing functions written in the language."]}),"\n",(0,t.jsxs)(n.p,{children:["There are two forms of the ",(0,t.jsx)(n.code,{children:"CREATE LANGUAGE"})," command. In the first form, the user supplies just the name of the desired language, and the Apache Cloudberry server consults the ",(0,t.jsx)(n.code,{children:"pg_pltemplate"})," system catalog to determine the correct parameters. In the second form, the user supplies the language parameters along with the language name. The second form can be used to create a language that is not defined in ",(0,t.jsx)(n.code,{children:"pg_pltemplate"}),", but this approach is considered obsolete."]}),"\n",(0,t.jsxs)(n.p,{children:["When the server finds an entry in the ",(0,t.jsx)(n.code,{children:"pg_pltemplate"})," catalog for the given language name, it will use the catalog data even if the command includes language parameters. This behavior simplifies loading of old dump files, which are likely to contain out-of-date information about language support functions."]}),"\n",(0,t.jsxs)(n.p,{children:["Ordinarily, the user must have the Apache Cloudberry superuser privilege to register a new language. However, the owner of a database can register a new language within that database if the language is listed in the ",(0,t.jsx)(n.code,{children:"pg_pltemplate"})," catalog and is marked as allowed to be created by database owners (",(0,t.jsx)(n.code,{children:"tmpldbacreate"})," is ",(0,t.jsx)(n.code,{children:"true"}),"). The default is that trusted languages can be created by database owners, but this can be adjusted by superusers by modifying the contents of ",(0,t.jsx)(n.code,{children:"pg_pltemplate"}),". The creator of a language becomes its owner and can later drop it, rename it, or assign it to a new owner."]}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"CREATE OR REPLACE LANGUAGE"})," will either create a new language, or replace an existing definition. If the language already exists, its parameters are updated according to the values specified or taken from ",(0,t.jsx)(n.code,{children:"pg_pltemplate"}),", but the language's ownership and permissions settings do not change, and any existing functions written in the language are assumed to still be valid. In addition to the normal privilege requirements for creating a language, the user must be superuser or owner of the existing language. The ",(0,t.jsx)(n.code,{children:"REPLACE"})," case is mainly meant to be used to ensure that the language exists. If the language has a ",(0,t.jsx)(n.code,{children:"pg_pltemplate"})," entry then ",(0,t.jsx)(n.code,{children:"REPLACE"})," will not actually change anything about an existing definition, except in the unusual case where the ",(0,t.jsx)(n.code,{children:"pg_pltemplate"})," entry has been modified since the language was created."]}),"\n",(0,t.jsx)(n.h2,{id:"parameters",children:"Parameters"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"TRUSTED"})})}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"TRUSTED"})," specifies that the language does not grant access to data that the user would not otherwise have. If this key word is omitted when registering the language, only users with the Apache Cloudberry superuser privilege can use this language to create new functions."]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"PROCEDURAL"})})}),"\n",(0,t.jsx)(n.p,{children:"This is a noise word."}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"name"})})}),"\n",(0,t.jsx)(n.p,{children:"The name of the new procedural language. The name must be unique among the languages in the database.\nFor backward compatibility, the name can be enclosed by single quotes."}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"HANDLER call_handler"})})}),"\n",(0,t.jsxs)(n.p,{children:["The name of a previously registered function that will be called to run the procedural language's functions. The call handler for a procedural language must be written in a compiled language such as C with version 1 call convention and registered with Apache Cloudberry as a function taking no arguments and returning the ",(0,t.jsx)(n.code,{children:"language_handler"})," type, a placeholder type that is simply used to identify the function as a call handler."]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"INLINE inline_handler"})})}),"\n",(0,t.jsxs)(n.p,{children:["The name of a previously registered function that is called to run an anonymous code block in this language that is created with the ",(0,t.jsx)(n.a,{href:"/docs/sql-stmts/do",children:"DO"})," command. If no inline_handler function is specified, the language does not support anonymous code blocks. The handler function must take one argument of type ",(0,t.jsx)(n.code,{children:"internal"}),", which is the ",(0,t.jsx)(n.a,{href:"/docs/sql-stmts/do",children:"DO"})," command internal representation. The function typically returns ",(0,t.jsx)(n.code,{children:"void"}),". The return value of the handler is ignored."]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"VALIDATOR valfunction"})})}),"\n",(0,t.jsxs)(n.p,{children:["The name of a previously registered function that will be called when a new function in the language is created, to validate the new function. If no validator function is specified, then Apache Cloudberry will not check a new function when it is created. The validator function must take one argument of type ",(0,t.jsx)(n.code,{children:"oid"}),", which will be the OID of the to-be-created function, and will typically return ",(0,t.jsx)(n.code,{children:"void"}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["A validator function would typically inspect the function body for syntactical correctness, but it can also look at other properties of the function, for example if the language cannot handle certain argument types. To signal an error, the validator function should use the ",(0,t.jsx)(n.code,{children:"ereport()"})," function. The return value of the function is ignored."]}),"\n",(0,t.jsxs)(n.blockquote,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Note"}),"  The ",(0,t.jsx)(n.code,{children:"TRUSTED"})," option and the support function name(s) are ignored if the server has an entry for the specified language name in ",(0,t.jsx)(n.code,{children:"pg_pltemplate"}),"."]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"notes",children:"Notes"}),"\n",(0,t.jsxs)(n.p,{children:["Use ",(0,t.jsx)(n.a,{href:"/docs/sql-stmts/drop-language",children:"DROP LANGUAGE"})," to drop procedural languages."]}),"\n",(0,t.jsxs)(n.p,{children:["The system catalog pg_language records information about the currently installed languages. Also, the psql command ",(0,t.jsx)(n.code,{children:"\\dL"})," lists the installed languages."]}),"\n",(0,t.jsxs)(n.p,{children:["To create functions in a procedural language, a user must have the ",(0,t.jsx)(n.code,{children:"USAGE"})," privilege for the language. By default, ",(0,t.jsx)(n.code,{children:"USAGE"})," is granted to ",(0,t.jsx)(n.code,{children:"PUBLIC"})," (everyone) for trusted languages. This may be revoked if desired."]}),"\n",(0,t.jsxs)(n.p,{children:["Procedural languages are local to individual databases. However, a language can be installed into the ",(0,t.jsx)(n.code,{children:"template1"})," database, which will cause it to be available automatically in all subsequently-created databases."]}),"\n",(0,t.jsxs)(n.p,{children:["The call handler function, the inline handler function (if any), and the validator function (if any) must already exist if the server does not have an entry for the language in ",(0,t.jsx)(n.code,{children:"pg_pltemplate"}),". But when there is an entry, the functions need not already exist; they will be automatically defined if not present in the database. (This might result in ",(0,t.jsx)(n.code,{children:"CREATE LANGUAGE"})," failing, if the shared library that implements the language is not available in the installation.)"]}),"\n",(0,t.jsx)(n.h2,{id:"examples",children:"Examples"}),"\n",(0,t.jsxs)(n.p,{children:["The preferred way of creating any of the standard procedural languages is to use ",(0,t.jsx)(n.code,{children:"CREATE EXTENSION"})," instead of ",(0,t.jsx)(n.code,{children:"CREATE LANGUAGE"}),". For example:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sql",children:"CREATE EXTENSION plperl;\n"})}),"\n",(0,t.jsxs)(n.p,{children:["For a language not known in the ",(0,t.jsx)(n.code,{children:"pg_pltemplate"})," catalog, a sequence such as this is needed:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sql",children:"CREATE FUNCTION plsample_call_handler() RETURNS \nlanguage_handler\n    AS '$libdir/plsample'\n    LANGUAGE C;\nCREATE LANGUAGE plsample\n    HANDLER plsample_call_handler;\n"})}),"\n",(0,t.jsx)(n.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"CREATE LANGUAGE"})," is a Apache Cloudberry extension."]}),"\n",(0,t.jsx)(n.h2,{id:"see-also",children:"See also"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.a,{href:"/docs/sql-stmts/alter-language",children:"ALTER LANGUAGE"}),", ",(0,t.jsx)(n.a,{href:"/docs/sql-stmts/create-extension",children:"CREATE EXTENSION"}),", ",(0,t.jsx)(n.a,{href:"/docs/sql-stmts/create-function",children:"CREATE FUNCTION"}),", ",(0,t.jsx)(n.a,{href:"/docs/sql-stmts/drop-language",children:"DROP LANGUAGE"}),", ",(0,t.jsx)(n.a,{href:"/docs/sql-stmts/grant",children:"GRANT"}),", ",(0,t.jsx)(n.a,{href:"/docs/sql-stmts/do",children:"DO"})]})]})}function h(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},11151:(e,n,a)=>{a.d(n,{Z:()=>r,a:()=>l});var t=a(67294);const s={},i=t.createContext(s);function l(e){const n=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:l(e.components),t.createElement(i.Provider,{value:n},e.children)}}}]);