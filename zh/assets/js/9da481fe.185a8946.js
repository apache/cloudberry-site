"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[6855],{69736:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>r,default:()=>h,frontMatter:()=>o,metadata:()=>a,toc:()=>c});var s=t(85893),i=t(11151);const o={title:"ALTER OPERATOR FAMILY"},r="ALTER OPERATOR FAMILY",a={id:"sql-stmts/alter-operator-family",title:"ALTER OPERATOR FAMILY",description:"Changes the definition of an operator family.",source:"@site/docs/sql-stmts/alter-operator-family.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/alter-operator-family",permalink:"/zh/docs/sql-stmts/alter-operator-family",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/alter-operator-family.md",tags:[],version:"current",lastUpdatedBy:"TomShawn",lastUpdatedAt:1736834774,formattedLastUpdatedAt:"2025\u5e741\u670814\u65e5",frontMatter:{title:"ALTER OPERATOR FAMILY"},sidebar:"docsbars",previous:{title:"ALTER OPERATOR CLASS",permalink:"/zh/docs/sql-stmts/alter-operator-class"},next:{title:"ALTER OPERATOR",permalink:"/zh/docs/sql-stmts/alter-operator"}},d={},c=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Notes",id:"notes",level:2},{value:"Examples",id:"examples",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function l(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,i.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"alter-operator-family",children:"ALTER OPERATOR FAMILY"}),"\n",(0,s.jsx)(n.p,{children:"Changes the definition of an operator family."}),"\n",(0,s.jsx)(n.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"ALTER OPERATOR FAMILY <name> USING <index_method> ADD\n  {  OPERATOR <strategy_number> <operator_name> ( <op_type>, <op_type> ) [ FOR SEARCH | FOR ORDER BY <sort_family_name> ]\n    | FUNCTION <support_number> [ ( <op_type> [ , <op_type> ] ) ] <function_name> ( <argument_type> [, ...] )\n  } [, ... ]\n\nALTER OPERATOR FAMILY <name> USING <index_method> DROP\n  {  OPERATOR <strategy_number> ( <op_type> [ , <op_type> ] ) \n    | FUNCTION <support_number> ( <op_type> [ , <op_type> ] ) \n  } [, ... ]\n\nALTER OPERATOR FAMILY <name> USING <index_method> RENAME TO <new_name>\n\nALTER OPERATOR FAMILY <name> USING <index_method> OWNER TO { <new_owner> | CURRENT_USER | SESSION_USER }\n\nALTER OPERATOR FAMILY <name> USING <index_method> SET SCHEMA <new_schema>\n"})}),"\n",(0,s.jsx)(n.h2,{id:"description",children:"Description"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"ALTER OPERATOR FAMILY"})," changes the definition of an operator family. You can add operators and support functions to the family, remove them from the family, or change the family's name or owner."]}),"\n",(0,s.jsxs)(n.p,{children:["When operators and support functions are added to a family with ",(0,s.jsx)(n.code,{children:"ALTER OPERATOR FAMILY"}),', they are not part of any specific operator class within the family, but are just "loose" within the family. This indicates that these operators and functions are compatible with the family\'s semantics, but are not required for correct functioning of any specific index. (Operators and functions that are so required should be declared as part of an operator class, instead; see ',(0,s.jsx)(n.a,{href:"/zh/docs/sql-stmts/create-operator-class",children:"CREATE OPERATOR CLASS"}),".) You can drop loose members of a family from the family at any time, but members of an operator class cannot be dropped without dropping the whole class and any indexes that depend on it. Typically, single-data-type operators and functions are part of operator classes because they are needed to support an index on that specific data type, while cross-data-type operators and functions are made loose members of the family."]}),"\n",(0,s.jsxs)(n.p,{children:["You must be a superuser to use ",(0,s.jsx)(n.code,{children:"ALTER OPERATOR FAMILY"}),". (This restriction is made because an erroneous operator family definition could confuse or even crash the server.)"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"ALTER OPERATOR FAMILY"})," does not presently check whether the operator family definition includes all the operators and functions required by the index method, nor whether the operators and functions form a self-consistent set. It is the user's responsibility to define a valid operator family."]}),"\n",(0,s.jsx)(n.h2,{id:"parameters",children:"Parameters"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"name"})})}),"\n",(0,s.jsx)(n.p,{children:"The name (optionally schema-qualified) of an existing operator family."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"index_method"})})}),"\n",(0,s.jsx)(n.p,{children:"The name of the index method this operator family is for."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"strategy_number"})})}),"\n",(0,s.jsx)(n.p,{children:"The index method's strategy number for an operator associated with the operator family."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"operator_name"})})}),"\n",(0,s.jsx)(n.p,{children:"The name (optionally schema-qualified) of an operator associated with the operator family."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"op_type"})})}),"\n",(0,s.jsxs)(n.p,{children:["In an ",(0,s.jsx)(n.code,{children:"OPERATOR"})," clause, the operand data type(s) of the operator, or ",(0,s.jsx)(n.code,{children:"NONE"})," to signify a left-unary or right-unary operator. Unlike the comparable syntax in ",(0,s.jsx)(n.code,{children:"CREATE OPERATOR CLASS"}),", the operand data types must always be specified."]}),"\n",(0,s.jsxs)(n.p,{children:["In an ",(0,s.jsx)(n.code,{children:"ADD FUNCTION"})," clause, the operand data type(s) the function is intended to support, if different from the input data type(s) of the function. For B-tree comparison functions and hash functions it is not necessary to specify op_type since the function's input data type(s) are always the correct ones to use. For B-tree sort support functions and all functions in GiST, SP-GiST, and GIN operator classes, it is necessary to specify the operand data type(s) the function is to be used with."]}),"\n",(0,s.jsxs)(n.p,{children:["In a ",(0,s.jsx)(n.code,{children:"DROP FUNCTION"})," clause, the operand data type(s) the function is intended to support must be specified."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"sort_family_name"})})}),"\n",(0,s.jsxs)(n.p,{children:["The name (optionally schema-qualified) of an existing ",(0,s.jsx)(n.code,{children:"btree"})," operator family that describes the sort ordering associated with an ordering operator."]}),"\n",(0,s.jsxs)(n.p,{children:["If neither ",(0,s.jsx)(n.code,{children:"FOR SEARCH"})," nor ",(0,s.jsx)(n.code,{children:"FOR ORDER BY"})," is specified, ",(0,s.jsx)(n.code,{children:"FOR SEARCH"})," is the default."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"support_number"})})}),"\n",(0,s.jsx)(n.p,{children:"The index method's support function number for a function associated with the operator family."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"function_name"})})}),"\n",(0,s.jsx)(n.p,{children:"The name (optionally schema-qualified) of a function that is an index method support function for the operator family. If no argument list is specified, the name must be unique in its schema."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"argument_type"})})}),"\n",(0,s.jsx)(n.p,{children:"The parameter data type(s) of the function."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"new_name"})})}),"\n",(0,s.jsx)(n.p,{children:"The new name of the operator family."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"new_owner"})})}),"\n",(0,s.jsx)(n.p,{children:"The new owner of the operator family."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"new_schema"})})}),"\n",(0,s.jsx)(n.p,{children:"The new schema for the operator family."}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"OPERATOR"})," and ",(0,s.jsx)(n.code,{children:"FUNCTION"})," clauses can appear in any order."]}),"\n",(0,s.jsx)(n.h2,{id:"notes",children:"Notes"}),"\n",(0,s.jsxs)(n.p,{children:["Notice that the ",(0,s.jsx)(n.code,{children:"DROP"}),' syntax only specifies the "slot" in the operator family, by strategy or support number and input data type(s). The name of the operator or function occupying the slot is not mentioned. Also, for ',(0,s.jsx)(n.code,{children:"DROP FUNCTION"})," the type(s) to specify are the input data type(s) the function is intended to support; for ",(0,s.jsx)(n.code,{children:"GiST"}),", ",(0,s.jsx)(n.code,{children:"SP_GiST"}),", and ",(0,s.jsx)(n.code,{children:"GIN"})," indexes this might have nothing to do with the actual input argument types of the function."]}),"\n",(0,s.jsx)(n.p,{children:"Because the index machinery does not check access permissions on functions before using them, including a function or operator in an operator family is tantamount to granting public execute permission on it. This is usually not an issue for the sorts of functions that are useful in an operator family."}),"\n",(0,s.jsx)(n.p,{children:"The operators should not be defined by SQL functions. A SQL function is likely to be inlined into the calling query, which will prevent the optimizer from recognizing that the query matches an index."}),"\n",(0,s.jsxs)(n.p,{children:["Before Cloudberry Database 6.0, the ",(0,s.jsx)(n.code,{children:"OPERATOR"})," clause could include a ",(0,s.jsx)(n.code,{children:"RECHECK"}),' option. This option is no longer supported. Cloudberry Database now determines whether an index operator is "lossy" on-the-fly at run time. This allows more efficient handling of cases where an operator might or might not be lossy.']}),"\n",(0,s.jsx)(n.h2,{id:"examples",children:"Examples"}),"\n",(0,s.jsxs)(n.p,{children:["The following example command adds cross-data-type operators and support functions to an operator family that already contains B-tree operator classes for data types ",(0,s.jsx)(n.code,{children:"int4"})," and ",(0,s.jsx)(n.code,{children:"int2"}),".:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"ALTER OPERATOR FAMILY integer_ops USING btree ADD\n\n  -- int4 vs int2\n  OPERATOR 1 < (int4, int2) ,\n  OPERATOR 2 <= (int4, int2) ,\n  OPERATOR 3 = (int4, int2) ,\n  OPERATOR 4 >= (int4, int2) ,\n  OPERATOR 5 > (int4, int2) ,\n  FUNCTION 1 btint42cmp(int4, int2) ,\n\n  -- int2 vs int4\n  OPERATOR 1 < (int2, int4) ,\n  OPERATOR 2 <= (int2, int4) ,\n  OPERATOR 3 = (int2, int4) ,\n  OPERATOR 4 >= (int2, int4) ,\n  OPERATOR 5 > (int2, int4) ,\n  FUNCTION 1 btint24cmp(int2, int4) ;\n"})}),"\n",(0,s.jsx)(n.p,{children:"To remove these entries:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"ALTER OPERATOR FAMILY integer_ops USING btree DROP\n\n  -- int4 vs int2\n  OPERATOR 1 (int4, int2) ,\n  OPERATOR 2 (int4, int2) ,\n  OPERATOR 3 (int4, int2) ,\n  OPERATOR 4 (int4, int2) ,\n  OPERATOR 5 (int4, int2) ,\n  FUNCTION 1 (int4, int2) ,\n\n  -- int2 vs int4\n  OPERATOR 1 (int2, int4) ,\n  OPERATOR 2 (int2, int4) ,\n  OPERATOR 3 (int2, int4) ,\n  OPERATOR 4 (int2, int4) ,\n  OPERATOR 5 (int2, int4) ,\n  FUNCTION 1 (int2, int4) ;\n"})}),"\n",(0,s.jsx)(n.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,s.jsxs)(n.p,{children:["There is no ",(0,s.jsx)(n.code,{children:"ALTER OPERATOR FAMILY"})," statement in the SQL standard."]}),"\n",(0,s.jsx)(n.h2,{id:"see-also",children:"See also"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.a,{href:"/zh/docs/sql-stmts/create-operator-family",children:"CREATE OPERATOR FAMILY"}),", ",(0,s.jsx)(n.a,{href:"/zh/docs/sql-stmts/drop-operator-family",children:"DROP OPERATOR FAMILY"}),", ",(0,s.jsx)(n.a,{href:"/zh/docs/sql-stmts/alter-operator-class",children:"ALTER OPERATOR CLASS"}),", ",(0,s.jsx)(n.a,{href:"/zh/docs/sql-stmts/create-operator-class",children:"CREATE OPERATOR CLASS"}),", ",(0,s.jsx)(n.a,{href:"/zh/docs/sql-stmts/drop-operator-class",children:"DROP OPERATOR CLASS"})]})]})}function h(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},11151:(e,n,t)=>{t.d(n,{Z:()=>a,a:()=>r});var s=t(67294);const i={},o=s.createContext(i);function r(e){const n=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),s.createElement(o.Provider,{value:n},e.children)}}}]);