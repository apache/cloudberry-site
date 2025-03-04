"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[4878],{1811:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>o,default:()=>h,frontMatter:()=>r,metadata:()=>a,toc:()=>d});var s=t(85893),i=t(11151);const r={title:"ALTER TYPE"},o="ALTER TYPE",a={id:"sql-stmts/alter-type",title:"ALTER TYPE",description:"Changes the definition of a data type.",source:"@site/docs/sql-stmts/alter-type.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/alter-type",permalink:"/docs/sql-stmts/alter-type",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/alter-type.md",tags:[],version:"current",lastUpdatedBy:"TomShawn",lastUpdatedAt:1741056503,formattedLastUpdatedAt:"Mar 4, 2025",frontMatter:{title:"ALTER TYPE"},sidebar:"docsbars",previous:{title:"ALTER TRIGGER",permalink:"/docs/sql-stmts/alter-trigger"},next:{title:"ALTER USER MAPPING",permalink:"/docs/sql-stmts/alter-user-mapping"}},l={},d=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Notes",id:"notes",level:2},{value:"Examples",id:"examples",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function c(e){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,i.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"alter-type",children:"ALTER TYPE"}),"\n",(0,s.jsx)(n.p,{children:"Changes the definition of a data type."}),"\n",(0,s.jsx)(n.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"ALTER TYPE <name> <action> [, ... ]\nALTER TYPE <name> OWNER TO { <new_owner> | CURRENT_USER | SESSION_USER }\nALTER TYPE <name> RENAME ATTRIBUTE <attribute_name> TO <new_attribute_name> [ CASCADE | RESTRICT ]\nALTER TYPE <name> RENAME TO <new_name>\nALTER TYPE <name> SET SCHEMA <new_schema>\nALTER TYPE <name> ADD VALUE [ IF NOT EXISTS ] <new_enum_value> [ { BEFORE | AFTER } <neighbor_enum_value> ]\nALTER TYPE <name> RENAME VALUE <existing_enum_value> to <new_enum_value>\nALTER TYPE <name> SET DEFAULT ENCODING ( <storage_directive> )\n\n-- where <action> is one of:\n  \n  ADD ATTRIBUTE <attribute_name> <data_type> [ COLLATE <collation> ] [ CASCADE | RESTRICT ]\n  DROP ATTRIBUTE [ IF EXISTS ] <attribute_name> [ CASCADE | RESTRICT ]\n  ALTER ATTRIBUTE <attribute_name> [ SET DATA ] TYPE <data_type> [ COLLATE <collation> ] [ CASCADE | RESTRICT ]\n\n-- where <storage_directive> is:\n\n   COMPRESSTYPE={ZLIB | ZSTD | RLE_TYPE | NONE}\n   COMPRESSLEVEL={0-19}\n   BLOCKSIZE={8192-2097152}\n"})}),"\n",(0,s.jsx)(n.h2,{id:"description",children:"Description"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"ALTER TYPE"})," changes the definition of an existing type. There are several subforms:"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"ADD ATTRIBUTE"})})}),"\n",(0,s.jsxs)(n.p,{children:["Adds a new attribute to a composite type, using the same syntax as ",(0,s.jsx)(n.a,{href:"/docs/sql-stmts/create-type",children:"CREATE TYPE"}),"."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"DROP ATTRIBUTE [ IF EXISTS ]"})})}),"\n",(0,s.jsxs)(n.p,{children:["Drops an attribute from a composite type. If ",(0,s.jsx)(n.code,{children:"IF EXISTS"})," is specified and the attribute does not exist, no error is thrown. In this case Cloudberry Database issues a notice instead."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"SET DATA TYPE"})})}),"\n",(0,s.jsx)(n.p,{children:"Changes the type of an attribute of a composite type."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"OWNER"})})}),"\n",(0,s.jsx)(n.p,{children:"Changes the owner of the type."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"RENAME"})})}),"\n",(0,s.jsx)(n.p,{children:"Changes the name of the type or the name of an individual attribute of a composite type."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"SET SCHEMA"})})}),"\n",(0,s.jsx)(n.p,{children:"Moves the type into another schema."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"ADD VALUE [ IF NOT EXISTS ] [ BEFORE | AFTER ]"})})}),"\n",(0,s.jsxs)(n.p,{children:["Adds a new value to an enum type. The new value's place in the enum's ordering can be specified as being ",(0,s.jsx)(n.code,{children:"BEFORE"})," or ",(0,s.jsx)(n.code,{children:"AFTER"})," one of the existing values. Otherwise, the new item is added at the end of the list of values."]}),"\n",(0,s.jsxs)(n.p,{children:["If ",(0,s.jsx)(n.code,{children:"IF NOT EXISTS"})," is specified, it is not an error if the type already contains the new value; Cloudberry Database issues a notice but takes no other action. Otherwise, an error will occur if the new value is already present."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"RENAME VALUE"})})}),"\n",(0,s.jsx)(n.p,{children:"Renames a value of an enum type. The value's place in the enum's ordering is not affected. An error will occur if the specified value is not present or the new name is already present."}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"ADD ATTRIBUTE"}),", ",(0,s.jsx)(n.code,{children:"DROP ATTRIBUTE"}),", and ",(0,s.jsx)(n.code,{children:"ALTER ATTRIBUTE"})," actions can be combined into a list of multiple alterations to apply in parallel. For example, it is possible to add several attributes and/or alter the type of several attributes in a single command."]}),"\n",(0,s.jsx)(n.p,{children:"You can change the name, the owner, and the schema of a type. You can also add or update storage options for a scalar type."}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Note"})," Cloudberry Database does not support adding storage options for row or composite types."]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["You must own the type to use ",(0,s.jsx)(n.code,{children:"ALTER TYPE"}),". To change the schema of a type, you must also have ",(0,s.jsx)(n.code,{children:"CREATE"})," privilege on the new schema. To alter the owner, you must also be a direct or indirect member of the new owning role, and that role must have ",(0,s.jsx)(n.code,{children:"CREATE"})," privilege on the type's schema. (These restrictions enforce that altering the owner does not do anything that could be done by dropping and recreating the type. However, a superuser can alter ownership of any type.) To add an attribute or alter an attribute type, you must also have ",(0,s.jsx)(n.code,{children:"USAGE"})," privilege on the data type."]}),"\n",(0,s.jsx)(n.h2,{id:"parameters",children:"Parameters"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"name"})})}),"\n",(0,s.jsx)(n.p,{children:"The name (optionally schema-qualified) of an existing type to alter."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"new_name"})})}),"\n",(0,s.jsx)(n.p,{children:"The new name for the type."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"new_owner"})})}),"\n",(0,s.jsx)(n.p,{children:"The user name of the new owner of the type."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"new_schema"})})}),"\n",(0,s.jsx)(n.p,{children:"The new schema for the type."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"attribute_name"})})}),"\n",(0,s.jsx)(n.p,{children:"The name of the attribute to add, alter, or drop."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"new_attribute_name"})})}),"\n",(0,s.jsx)(n.p,{children:"The new name of the attribute to be renamed."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"data_type"})})}),"\n",(0,s.jsx)(n.p,{children:"The data type of the attribute to add, or the new type of the attribute to alter."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"new_enum_value"})})}),"\n",(0,s.jsx)(n.p,{children:"The new value to be added to an enum type's list of values. Like all enum literals, it must be quoted."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"neighbor_enum_value"})})}),"\n",(0,s.jsx)(n.p,{children:"The existing enum value that the new value should be added immediately before or after in the enum type's sort ordering. Like all enum literals, it must be quoted."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"existing_enum_value"})})}),"\n",(0,s.jsx)(n.p,{children:"The existing enum value that should be renamed. Like all enum literals, it must be quoted."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"CASCADE"})})}),"\n",(0,s.jsx)(n.p,{children:"Automatically propagate the operation to typed tables of the type being altered, and their descendants."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"RESTRICT"})})}),"\n",(0,s.jsx)(n.p,{children:"Refuse the operation if the type being altered is the type of a typed table. This is the default."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"storage_directive"})})}),"\n",(0,s.jsxs)(n.p,{children:["Identifies default storage options for the type when specified in a table column definition. Options include ",(0,s.jsx)(n.code,{children:"COMPRESSTYPE"}),", ",(0,s.jsx)(n.code,{children:"COMPRESSLEVEL"}),", and ",(0,s.jsx)(n.code,{children:"BLOCKSIZE"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"COMPRESSTYPE"})," \u2014 Set to ",(0,s.jsx)(n.code,{children:"ZLIB"})," (the default), ",(0,s.jsx)(n.code,{children:"ZSTD"})," or ",(0,s.jsx)(n.code,{children:"RLE_TYPE"})," to specify the type of compression used."]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"COMPRESSLEVEL"})," \u2014 For Zstd compression, set to an integer value from 1 (fastest compression) to 19 (highest compression ratio). For zlib compression, the valid range is from 1 to 9. For ",(0,s.jsx)(n.code,{children:"RLE_TYPE"}),", the compression level can be set to an integer value from 1 (fastest compression) to 4 (highest compression ratio). The default compression level is 1."]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"BLOCKSIZE"})," \u2014 Set to the size, in bytes, for each block in the column. The ",(0,s.jsx)(n.code,{children:"BLOCKSIZE"})," must be between 8192 and 2097152 bytes, and be a multiple of 8192. The default block size is 32768."]}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Note"})," storage_directives defined at the table- or column-level override the default storage options defined for a type."]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"notes",children:"Notes"}),"\n",(0,s.jsxs)(n.p,{children:["If ",(0,s.jsx)(n.code,{children:"ALTER TYPE ... ADD VALUE"})," (the form that adds a new value to an enum type) is executed inside a transaction block, the new value cannot be used until after the transaction has been committed."]}),"\n",(0,s.jsxs)(n.p,{children:["Comparisons involving an added enum value will sometimes be slower than comparisons involving only original members of the enum type. This will usually only occur if ",(0,s.jsx)(n.code,{children:"BEFORE"})," or ",(0,s.jsx)(n.code,{children:"AFTER"}),' is used to set the new value\'s sort position somewhere other than at the end of the list. However, sometimes it will happen even though the new value is added at the end (this occurs if the OID counter "wrapped around" since the original creation of the enum type). The slowdown is usually insignificant; but if it matters, optimal performance can be regained by dropping and recreating the enum type, or by dumping and reloading the database.']}),"\n",(0,s.jsx)(n.h2,{id:"examples",children:"Examples"}),"\n",(0,s.jsxs)(n.p,{children:["To rename the data type named ",(0,s.jsx)(n.code,{children:"electronic_mail"}),":"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"ALTER TYPE electronic_mail RENAME TO email;\n"})}),"\n",(0,s.jsxs)(n.p,{children:["To change the owner of the user-defined type ",(0,s.jsx)(n.code,{children:"email"})," to ",(0,s.jsx)(n.code,{children:"joe"}),":"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"ALTER TYPE email OWNER TO joe;\n"})}),"\n",(0,s.jsxs)(n.p,{children:["To change the schema of the user-defined type ",(0,s.jsx)(n.code,{children:"email"})," to ",(0,s.jsx)(n.code,{children:"customers"}),":"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"ALTER TYPE email SET SCHEMA customers;\n"})}),"\n",(0,s.jsxs)(n.p,{children:["To set or alter the compression type and compression level of the user-defined type named ",(0,s.jsx)(n.code,{children:"int33"}),":"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"ALTER TYPE int33 SET DEFAULT ENCODING (compresstype=zlib, compresslevel=7);\n"})}),"\n",(0,s.jsx)(n.p,{children:"To add a new attribute to a type:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"ALTER TYPE compfoo ADD ATTRIBUTE f3 int;\n"})}),"\n",(0,s.jsx)(n.p,{children:"To add a new value to an enum type in a particular sort position:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"ALTER TYPE colors ADD VALUE 'orange' AFTER 'red';\n"})}),"\n",(0,s.jsx)(n.p,{children:"To rename an enum value:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"ALTER TYPE colors RENAME VALUE 'purple' TO 'mauve';\n"})}),"\n",(0,s.jsx)(n.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,s.jsx)(n.p,{children:"The variants to add and drop attributes are part of the SQL standard; the other variants are Cloudberry Database extensions."}),"\n",(0,s.jsx)(n.h2,{id:"see-also",children:"See also"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.a,{href:"/docs/sql-stmts/create-type",children:"CREATE TYPE"}),", ",(0,s.jsx)(n.a,{href:"/docs/sql-stmts/drop-type",children:"DROP TYPE"})]})]})}function h(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}},11151:(e,n,t)=>{t.d(n,{Z:()=>a,a:()=>o});var s=t(67294);const i={},r=s.createContext(i);function o(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);