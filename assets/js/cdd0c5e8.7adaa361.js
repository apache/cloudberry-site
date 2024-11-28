"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[3131],{8139:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>h,frontMatter:()=>a,metadata:()=>i,toc:()=>d});var n=s(85893),r=s(11151);const a={title:"CREATE OPERATOR CLASS"},o="CREATE OPERATOR CLASS",i={id:"sql-stmts/create-operator-class",title:"CREATE OPERATOR CLASS",description:"Defines a new operator class.",source:"@site/docs/sql-stmts/create-operator-class.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/create-operator-class",permalink:"/docs/sql-stmts/create-operator-class",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/create-operator-class.md",tags:[],version:"current",lastUpdatedBy:"Ed Espino",lastUpdatedAt:1732764009,formattedLastUpdatedAt:"Nov 28, 2024",frontMatter:{title:"CREATE OPERATOR CLASS"},sidebar:"docsbars",previous:{title:"CREATE MATERIALIZED VIEW",permalink:"/docs/sql-stmts/create-materialized-view"},next:{title:"CREATE OPERATOR FAMILY",permalink:"/docs/sql-stmts/create-operator-family"}},c={},d=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Notes",id:"notes",level:2},{value:"Examples",id:"examples",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function l(e){const t={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,r.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h1,{id:"create-operator-class",children:"CREATE OPERATOR CLASS"}),"\n",(0,n.jsx)(t.p,{children:"Defines a new operator class."}),"\n",(0,n.jsx)(t.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-sql",children:"CREATE OPERATOR CLASS <name> [DEFAULT] FOR TYPE <data_type>\xa0\xa0\n  USING <index_method> [ FAMILY <family_name> ] AS \n\xa0\xa0{ OPERATOR <strategy_number> <operator_name> [ ( <op_type>, <op_type> ) ] [ FOR SEARCH | FOR ORDER BY <sort_family_name> ]\n\xa0\xa0| FUNCTION <support_number> [ ( <op_type> [ , <op_type> ] ) ] <function_name> (<argument_type> [, ...] )\n\xa0\xa0| STORAGE <storage_type>\n\xa0\xa0} [, ... ]\n"})}),"\n",(0,n.jsx)(t.h2,{id:"description",children:"Description"}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.code,{children:"CREATE OPERATOR CLASS"})," creates a new operator class. An operator class defines how a particular data type can be used with an index. The operator class specifies that certain operators will fill particular roles or strategies for this data type and this index method. The operator class also specifies the support functions to be used by the index method when the operator class is selected for an index column. All of the operators and functions used by an operator class must be defined before the operator class is created. Any functions used to implement the operator class must be defined as ",(0,n.jsx)(t.code,{children:"IMMUTABLE"}),"."]}),"\n",(0,n.jsx)(t.p,{children:"If a schema name is given, then the operator class is created in the specified schema. Otherwise, it is created in the current schema. Two operator classes in the same schema can have the same name only if they are for different index methods."}),"\n",(0,n.jsx)(t.p,{children:"The user who defines an operator class becomes its owner. Presently, the creating user must be a superuser. (This restriction is made because an erroneous operator class definition could confuse or even crash the server.)"}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.code,{children:"CREATE OPERATOR CLASS"})," does not presently check whether the operator class definition includes all the operators and functions required by the index method, nor whether the operators and functions form a self-consistent set. It is the user's responsibility to define a valid operator class."]}),"\n",(0,n.jsxs)(t.p,{children:["Related operator classes can be grouped into operator families. To add a new operator class to an existing family, specify the ",(0,n.jsx)(t.code,{children:"FAMILY"})," option in ",(0,n.jsx)(t.code,{children:"CREATE OPERATOR CLASS"}),". Without this option, the new class is placed into a family named the same as the new class (Cloudberry Database creates that family if it doesn't already exist)."]}),"\n",(0,n.jsxs)(t.p,{children:["Refer to ",(0,n.jsx)(t.a,{href:"https://www.postgresql.org/docs/12/xindex.html",children:"Interfacing Extensions to Indexes"})," in the PostgreSQL documentation for more information."]}),"\n",(0,n.jsx)(t.h2,{id:"parameters",children:"Parameters"}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.strong,{children:(0,n.jsx)(t.code,{children:"name"})})}),"\n",(0,n.jsx)(t.p,{children:"The (optionally schema-qualified) name of the operator class to be defined. Two operator classes in the same schema can have the same name only if they are for different index methods."}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.strong,{children:(0,n.jsx)(t.code,{children:"DEFAULT"})})}),"\n",(0,n.jsx)(t.p,{children:"If present, makes the operator class the default operator class for its data type. At most one operator class can be the default for a specific data type and index method."}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.strong,{children:(0,n.jsx)(t.code,{children:"data_type"})})}),"\n",(0,n.jsx)(t.p,{children:"The column data type that this operator class is for."}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.strong,{children:(0,n.jsx)(t.code,{children:"index_method"})})}),"\n",(0,n.jsx)(t.p,{children:"The name of the index method that this operator class is for."}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.strong,{children:(0,n.jsx)(t.code,{children:"family_name"})})}),"\n",(0,n.jsx)(t.p,{children:"The name of the existing operator family to add this operator class to. If not specified, a family named the same as the operator class is used (creating it, if it doesn't already exist)."}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.strong,{children:(0,n.jsx)(t.code,{children:"strategy_number"})})}),"\n",(0,n.jsxs)(t.p,{children:["The index method's strategy number for an operator associated with the operator class. The operators associated with an operator class are identified by ",(0,n.jsx)(t.em,{children:"strategy numbers"}),", which serve to identify the semantics of each operator within the context of its operator class."]}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.strong,{children:(0,n.jsx)(t.code,{children:"operator_name"})})}),"\n",(0,n.jsx)(t.p,{children:"The name (optionally schema-qualified) of an operator associated with the operator class."}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.strong,{children:(0,n.jsx)(t.code,{children:"op_type"})})}),"\n",(0,n.jsxs)(t.p,{children:["In an ",(0,n.jsx)(t.code,{children:"OPERATOR"})," clause, the operand data type(s) of the operator, or ",(0,n.jsx)(t.code,{children:"NONE"})," to signify a left-unary or right-unary operator. The operand data types can be omitted in the normal case where they are the same as the operator class's data type."]}),"\n",(0,n.jsxs)(t.p,{children:["In a ",(0,n.jsx)(t.code,{children:"FUNCTION"})," clause, the operand data type(s) the function is intended to support, if different from the input data type(s) of the function (for B-tree comparison functions and hash functions) or the class's data type (for B-tree sort support functions and all functions in GiST, SP-GiST, GIN, and BRIN operator classes). These defaults are correct, and so op_type need not be specified in ",(0,n.jsx)(t.code,{children:"FUNCTION"})," clauses, except for the case of a B-tree sort support function that is meant to support cross-data-type comparisons."]}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.strong,{children:(0,n.jsx)(t.code,{children:"sort_family_name"})})}),"\n",(0,n.jsxs)(t.p,{children:["The name (optionally schema-qualified) of an existing ",(0,n.jsx)(t.code,{children:"btree"})," operator family that describes the sort ordering associated with an ordering operator."]}),"\n",(0,n.jsxs)(t.p,{children:["If neither ",(0,n.jsx)(t.code,{children:"FOR SEARCH"})," nor ",(0,n.jsx)(t.code,{children:"FOR ORDER BY"})," is specified, ",(0,n.jsx)(t.code,{children:"FOR SEARCH"})," is the default."]}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.strong,{children:(0,n.jsx)(t.code,{children:"support_number"})})}),"\n",(0,n.jsx)(t.p,{children:"The index method's support function number for a function associated with the operator class."}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.strong,{children:(0,n.jsx)(t.code,{children:"function_name"})})}),"\n",(0,n.jsx)(t.p,{children:"The name (optionally schema-qualified) of a function that is an index method support function for the operator class."}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.strong,{children:(0,n.jsx)(t.code,{children:"argument_type"})})}),"\n",(0,n.jsx)(t.p,{children:"The parameter data type(s) of the function."}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.strong,{children:(0,n.jsx)(t.code,{children:"storage_type"})})}),"\n",(0,n.jsxs)(t.p,{children:["The data type actually stored in the index. Normally this is the same as the column data type, but some index methods (currently GiST, GIN, and BRIN) allow it to be different. The ",(0,n.jsx)(t.code,{children:"STORAGE"})," clause must be omitted unless the index method allows a different type to be used. If the column data_type is specified as ",(0,n.jsx)(t.code,{children:"anyarray"}),", the storage_type can be declared as ",(0,n.jsx)(t.code,{children:"anyelement"})," to indicate that the index entries are members of the element type belonging to the actual array type that each particular index is created for."]}),"\n",(0,n.jsxs)(t.p,{children:["The ",(0,n.jsx)(t.code,{children:"OPERATOR"}),", ",(0,n.jsx)(t.code,{children:"FUNCTION"}),", and ",(0,n.jsx)(t.code,{children:"STORAGE"})," clauses can appear in any order."]}),"\n",(0,n.jsx)(t.h2,{id:"notes",children:"Notes"}),"\n",(0,n.jsx)(t.p,{children:"Because the index machinery does not check access permissions on functions before using them, including a function or operator in an operator class is the same as granting public execute permission on it. This is usually not an issue for the sorts of functions that are useful in an operator class."}),"\n",(0,n.jsx)(t.p,{children:"The operators should not be defined by SQL functions. A SQL function is likely to be inlined into the calling query, which will prevent the optimizer from recognizing that the query matches an index."}),"\n",(0,n.jsxs)(t.p,{children:["Any functions used to implement the operator class must be defined as ",(0,n.jsx)(t.code,{children:"IMMUTABLE"}),"."]}),"\n",(0,n.jsxs)(t.p,{children:["Before Cloudberry Database 6.0, the ",(0,n.jsx)(t.code,{children:"OPERATOR"})," clause could include a ",(0,n.jsx)(t.code,{children:"RECHECK"}),' option. This option is no longer supported. Cloudberry Database now determines whether an index operator is "lossy" on-the-fly at run time. This allows more efficient handling of cases where an operator might or might not be lossy.']}),"\n",(0,n.jsx)(t.h2,{id:"examples",children:"Examples"}),"\n",(0,n.jsxs)(t.p,{children:["The following example command defines a GiST index operator class for the data type ",(0,n.jsx)(t.code,{children:"_int4"})," (array of int4). See the ",(0,n.jsx)(t.code,{children:"intarray"})," contrib module for the complete example."]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-sql",children:"CREATE OPERATOR CLASS gist__int_ops\n    DEFAULT FOR TYPE _int4 USING gist AS\n        OPERATOR 3 &&,\n        OPERATOR 6 = (anyarray, anyarray),\n        OPERATOR 7 @>,\n        OPERATOR 8 <@,\n        OPERATOR 20 @@ (_int4, query_int),\n        FUNCTION 1 g_int_consistent (internal, _int4, smallint, oid, internal),\n        FUNCTION 2 g_int_union (internal, internal),\n        FUNCTION 3 g_int_compress (internal),\n        FUNCTION 4 g_int_decompress (internal),\n        FUNCTION 5 g_int_penalty (internal, internal, internal),\n        FUNCTION 6 g_int_picksplit (internal, internal),\n        FUNCTION 7 g_int_same (_int4, _int4, internal);\n"})}),"\n",(0,n.jsx)(t.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.code,{children:"CREATE OPERATOR CLASS"})," is a Cloudberry Database extension. There is no ",(0,n.jsx)(t.code,{children:"CREATE OPERATOR CLASS"})," statement in the SQL standard."]}),"\n",(0,n.jsx)(t.h2,{id:"see-also",children:"See also"}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.a,{href:"/docs/sql-stmts/alter-operator-class",children:"ALTER OPERATOR CLASS"}),", ",(0,n.jsx)(t.a,{href:"/docs/sql-stmts/drop-operator-class",children:"DROP OPERATOR CLASS"}),", ",(0,n.jsx)(t.a,{href:"/docs/sql-stmts/create-operator-family",children:"CREATE OPERATOR FAMILY"}),", ",(0,n.jsx)(t.a,{href:"/docs/sql-stmts/alter-operator-family",children:"ALTER OPERATOR FAMILY"}),", ",(0,n.jsx)(t.a,{href:"/docs/sql-stmts/create-function",children:"CREATE FUNCTION"})]})]})}function h(e={}){const{wrapper:t}={...(0,r.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(l,{...e})}):l(e)}},11151:(e,t,s)=>{s.d(t,{Z:()=>i,a:()=>o});var n=s(67294);const r={},a=n.createContext(r);function o(e){const t=n.useContext(a);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),n.createElement(a.Provider,{value:t},e.children)}}}]);