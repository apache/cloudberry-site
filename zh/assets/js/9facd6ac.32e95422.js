"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[3179],{78304:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>l,frontMatter:()=>r,metadata:()=>a,toc:()=>d});var i=t(85893),s=t(11151);const r={title:"ALTER TEXT SEARCH CONFIGURATION"},o="ALTER TEXT SEARCH CONFIGURATION",a={id:"sql-stmts/alter-text-search-configuration",title:"ALTER TEXT SEARCH CONFIGURATION",description:"Changes the definition of a text search configuration.",source:"@site/docs/sql-stmts/alter-text-search-configuration.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/alter-text-search-configuration",permalink:"/zh/docs/sql-stmts/alter-text-search-configuration",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/alter-text-search-configuration.md",tags:[],version:"current",lastUpdatedBy:"Dianjin Wang",lastUpdatedAt:1743488661,formattedLastUpdatedAt:"2025\u5e744\u67081\u65e5",frontMatter:{title:"ALTER TEXT SEARCH CONFIGURATION"},sidebar:"docsbars",previous:{title:"ALTER TABLESPACE",permalink:"/zh/docs/sql-stmts/alter-tablespace"},next:{title:"ALTER TEXT SEARCH DICTIONARY",permalink:"/zh/docs/sql-stmts/alter-text-search-dictionary"}},c={},d=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Examples",id:"examples",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function h(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,s.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"alter-text-search-configuration",children:"ALTER TEXT SEARCH CONFIGURATION"}),"\n",(0,i.jsx)(n.p,{children:"Changes the definition of a text search configuration."}),"\n",(0,i.jsx)(n.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sql",children:"ALTER TEXT SEARCH CONFIGURATION <name>\n    ADD MAPPING FOR <token_type> [, ... ] WITH <dictionary_name> [, ... ]\nALTER TEXT SEARCH CONFIGURATION <name>\n    ALTER MAPPING FOR <token_type> [, ... ] WITH <dictionary_name> [, ... ]\nALTER TEXT SEARCH CONFIGURATION <name>\n    ALTER MAPPING REPLACE <old_dictionary> WITH <new_dictionary>\nALTER TEXT SEARCH CONFIGURATION <name>\n    ALTER MAPPING FOR <token_type> [, ... ] REPLACE <old_dictionary> WITH <new_dictionary>\nALTER TEXT SEARCH CONFIGURATION <name>\n    DROP MAPPING [ IF EXISTS ] FOR <token_type> [, ... ]\nALTER TEXT SEARCH CONFIGURATION <name> RENAME TO <new_name>\nALTER TEXT SEARCH CONFIGURATION <name> OWNER TO { <new_owner> | CURRENT_USER | SESSION_USER }\nALTER TEXT SEARCH CONFIGURATION <name> SET SCHEMA <new_schema>\n"})}),"\n",(0,i.jsx)(n.h2,{id:"description",children:"Description"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"ALTER TEXT SEARCH CONFIGURATION"})," changes the definition of a text search configuration. You can modify its mappings from token types to dictionaries, or change the configuration's name or owner."]}),"\n",(0,i.jsxs)(n.p,{children:["You must be the owner of the configuration to use ",(0,i.jsx)(n.code,{children:"ALTER TEXT SEARCH CONFIGURATION"}),"."]}),"\n",(0,i.jsx)(n.h2,{id:"parameters",children:"Parameters"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"name"})})}),"\n",(0,i.jsx)(n.p,{children:"The name (optionally schema-qualified) of an existing text search configuration."}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"token_type"})})}),"\n",(0,i.jsx)(n.p,{children:"The name of a token type that is emitted by the configuration's parser."}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"dictionary_name"})})}),"\n",(0,i.jsx)(n.p,{children:"The name of a text search dictionary to be consulted for the specified token type(s). If multiple dictionaries are listed, they are consulted in the specified order."}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"old_dictionary"})})}),"\n",(0,i.jsx)(n.p,{children:"The name of a text search dictionary to be replaced in the mapping."}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"new_dictionary"})})}),"\n",(0,i.jsx)(n.p,{children:"The name of a text search dictionary to be substituted for old_dictionary."}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"new_name"})})}),"\n",(0,i.jsx)(n.p,{children:"The new name of the text search configuration."}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"new_owner"})})}),"\n",(0,i.jsx)(n.p,{children:"The new owner of the text search configuration."}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"new_schema"})})}),"\n",(0,i.jsx)(n.p,{children:"The new schema for the text search configuration."}),"\n",(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.code,{children:"ADD MAPPING FOR"})," form installs a list of dictionaries to be consulted for the specified token type(s); it is an error if there is already a mapping for any of the token types. The ",(0,i.jsx)(n.code,{children:"ALTER MAPPING FOR"})," form does the same, but first removing any existing mapping for those token types. The ",(0,i.jsx)(n.code,{children:"ALTER MAPPING REPLACE"})," forms substitute new_dictionary for old_dictionary anywhere the latter appears. This is done for only the specified token types when ",(0,i.jsx)(n.code,{children:"FOR"})," appears, or for all mappings of the configuration when it doesn't. The ",(0,i.jsx)(n.code,{children:"DROP MAPPING"})," form removes all dictionaries for the specified token type(s), causing tokens of those types to be ignored by the text search configuration. It is an error if there is no mapping for the token types, unless ",(0,i.jsx)(n.code,{children:"IF EXISTS"})," appears."]}),"\n",(0,i.jsx)(n.h2,{id:"examples",children:"Examples"}),"\n",(0,i.jsxs)(n.p,{children:["The following example replaces the ",(0,i.jsx)(n.code,{children:"english"})," dictionary with the ",(0,i.jsx)(n.code,{children:"swedish"})," dictionary anywhere that ",(0,i.jsx)(n.code,{children:"english"})," is used within ",(0,i.jsx)(n.code,{children:"my_config"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sql",children:"ALTER TEXT SEARCH CONFIGURATION my_config\n  ALTER MAPPING REPLACE english WITH swedish;\n"})}),"\n",(0,i.jsx)(n.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,i.jsxs)(n.p,{children:["There is no ",(0,i.jsx)(n.code,{children:"ALTER TEXT SEARCH CONFIGURATION"})," statement in the SQL standard."]}),"\n",(0,i.jsx)(n.h2,{id:"see-also",children:"See also"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"/zh/docs/sql-stmts/create-text-search-configuration",children:"CREATE TEXT SEARCH CONFIGURATION"}),", ",(0,i.jsx)(n.a,{href:"/zh/docs/sql-stmts/drop-text-search-configuration",children:"DROP TEXT SEARCH CONFIGURATION"})]})]})}function l(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(h,{...e})}):h(e)}},11151:(e,n,t)=>{t.d(n,{Z:()=>a,a:()=>o});var i=t(67294);const s={},r=i.createContext(s);function o(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);