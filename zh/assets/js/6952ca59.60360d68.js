"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[3933],{67386:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>i,contentTitle:()=>a,default:()=>m,frontMatter:()=>r,metadata:()=>c,toc:()=>d});var s=t(85893),o=t(11151);const r={title:"COMMENT"},a="COMMENT",c={id:"sql-stmts/comment",title:"COMMENT",description:"Defines or changes the comment of an object.",source:"@site/docs/sql-stmts/comment.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/comment",permalink:"/zh/docs/sql-stmts/comment",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/comment.md",tags:[],version:"current",lastUpdatedBy:"TomShawn",lastUpdatedAt:1741056503,formattedLastUpdatedAt:"2025\u5e743\u67084\u65e5",frontMatter:{title:"COMMENT"},sidebar:"docsbars",previous:{title:"CLUSTER",permalink:"/zh/docs/sql-stmts/cluster"},next:{title:"COMMIT",permalink:"/zh/docs/sql-stmts/commit"}},i={},d=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Notes",id:"notes",level:2},{value:"Examples",id:"examples",level:2},{value:"Compatibility",id:"compatibility",level:2}];function l(e){const n={blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,o.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"comment",children:"COMMENT"}),"\n",(0,s.jsx)(n.p,{children:"Defines or changes the comment of an object."}),"\n",(0,s.jsx)(n.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"COMMENT ON\n{\xa0ACCESS METHOD <object_name> |\n  AGGREGATE <aggregate_name> (<aggregate_signature>) |\n  CAST (<source_type> AS <target_type>) |\n  COLLATION <object_name>\n  COLUMN <relation_name>.<column_name> |\n  CONSTRAINT <constraint_name> ON <table_name> |\n  CONSTRAINT <constraint_name> ON DOMAIN <domain_name> |\n  CONVERSION <object_name> |\n  DATABASE <object_name> |\n  DOMAIN <object_name> |\n  EVENT TRIGGER <object_name> |\n  EXTENSION <object_name> |\n  FOREIGN DATA WRAPPER <object_name> |\n  FOREIGN TABLE <object_name> |\n  FUNCTION <function_name> [([[<argmode>] [<argname>] <argtype> [, ...]])] |\n  INDEX <object_name> |\n  MATERIALIZED VIEW <object_name> |\n  OPERATOR <operator_name> (<left_type>, <right_type>) |\n  OPERATOR CLASS <object_name> USING <index_method> |\n  OPERATOR FAMILY <object_name> USING <index_method> |\n  POLICY <policy_name> ON <table_name> |\n  [PROCEDURAL] LANGUAGE <object_name> |\n  PROCEDURE <procedure_name> [([[<argmode>] [<argname>] <argtype> [, ...]])] |\n  RESOURCE GROUP <object_name> |\n\xa0\xa0RESOURCE QUEUE <object_name> |\n  ROLE <object_name |\n  ROUTINE <routine_name> [([[<argmode>] [<argname>] <argtype> [, ...]])] |\n  RULE <rule_name> ON <table_name> |\n  SCHEMA <object_name> |\n  SEQUENCE <object_name> |\n  SERVER <object_name> |\n  STATISTICS <object_name> |\n  TABLE <object_name> |\n  TABLESPACE <object_name> |\n  TEXT SEARCH CONFIGURATION <object_name> |\n  TEXT SEARCH DICTIONARY <object_name> |\n  TEXT SEARCH PARSER <object_name> |\n  TEXT SEARCH TEMPLATE <object_name> |\n  TRANSFORM FOR <type_name> LANGUAGE <lang_name> |\n  TRIGGER <trigger_name> ON <table_name> |\n  TYPE <object_name> |\n  VIEW <object_name>\n} IS { <string_literal> | NULL }\n\n-- where <aggregate_signature> is:\n\n* |\n[ <argmode> ] [ <argname> ] <argtype> [ , ... ] |\n[ [ <argmode> ] [ <argname> ] <argtype> [ , ... ] ] ORDER BY [ <argmode> ] [ <argname> ] <argtype> [ , ... ]\n"})}),"\n",(0,s.jsx)(n.h2,{id:"description",children:"Description"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"COMMENT"})," stores a comment about a database object. Only one comment string is stored for each object, so to modify a comment, issue a new ",(0,s.jsx)(n.code,{children:"COMMENT"})," command for the same object. To remove a comment, specify ",(0,s.jsx)(n.code,{children:"NULL"})," in place of the text string. Comments are automatically dropped when the object is dropped."]}),"\n",(0,s.jsxs)(n.p,{children:["Cloudberry Database acquires a ",(0,s.jsx)(n.code,{children:"SHARE UPDATE EXCLUSIVE"})," lock on the object to be commented."]}),"\n",(0,s.jsxs)(n.p,{children:["For most kinds of object, only the object's owner can set the comment. Roles don't have owners, so the rule for ",(0,s.jsx)(n.code,{children:"COMMENT ON ROLE"})," is that you must be superuser to comment on a superuser role, or have the ",(0,s.jsx)(n.code,{children:"CREATEROLE"})," privilege to comment on non-superuser roles. Likewise, access methods don't have owners either; you must be superuser to comment on an access method. Of course, a superuser can comment on anything."]}),"\n",(0,s.jsxs)(n.p,{children:["You can view comments using the ",(0,s.jsx)(n.code,{children:"psql"})," meta-commands ",(0,s.jsx)(n.code,{children:"\\dd"}),", ",(0,s.jsx)(n.code,{children:"\\d+"}),", and ",(0,s.jsx)(n.code,{children:"\\l+"}),". Other user interfaces to retrieve comments can be built atop the same built-in functions that ",(0,s.jsx)(n.code,{children:"psql"})," uses, namely ",(0,s.jsx)(n.code,{children:"obj_description()"}),", ",(0,s.jsx)(n.code,{children:"col_description()"}),", and ",(0,s.jsx)(n.code,{children:"shobj_description()"}),"."]}),"\n",(0,s.jsx)(n.h2,{id:"parameters",children:"Parameters"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"object_name"})}),(0,s.jsx)("br",{}),"\n",(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"relation_name.column_name"})}),(0,s.jsx)("br",{}),"\n",(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"aggregate_name"})}),(0,s.jsx)("br",{}),"\n",(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"constraint_name"})}),(0,s.jsx)("br",{}),"\n",(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"function_name"})}),(0,s.jsx)("br",{}),"\n",(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"operator_name"})}),(0,s.jsx)("br",{}),"\n",(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"policy_name"})}),(0,s.jsx)("br",{}),"\n",(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"procedure_name"})}),(0,s.jsx)("br",{}),"\n",(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"routine_name"})}),(0,s.jsx)("br",{}),"\n",(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"rule_name"})}),(0,s.jsx)("br",{}),"\n",(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"trigger_name"})})]}),"\n",(0,s.jsx)(n.p,{children:"The name of the object to be commented. Names of tables, aggregates, collations, conversions, domains, foreign tables, functions, indexes, operators, operator classes, operator families, procedures, routines, sequences, statistics, text search objects, types, views, and materialized views can be schema-qualified. When commenting on a column, relation_name must refer to a table, view, materialized view, composite type, or foreign table."}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Note"})," Cloudberry Database does not support triggers."]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"table_name"})}),(0,s.jsx)("br",{}),"\n",(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"domain_name"})})]}),"\n",(0,s.jsx)(n.p,{children:"When creating a comment on a constraint, a trigger, a rule, or a policy, these parameters specify the name of the table or domain on which that object is defined."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"source_type"})})}),"\n",(0,s.jsx)(n.p,{children:"The name of the source data type of the cast."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"target_type"})})}),"\n",(0,s.jsx)(n.p,{children:"The name of the target data type of the cast."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"argmode"})})}),"\n",(0,s.jsxs)(n.p,{children:["The mode of a function or aggregate argument: either ",(0,s.jsx)(n.code,{children:"IN"}),", ",(0,s.jsx)(n.code,{children:"OUT"}),", ",(0,s.jsx)(n.code,{children:"INOUT"}),", or ",(0,s.jsx)(n.code,{children:"VARIADIC"}),". If omitted, the default is ",(0,s.jsx)(n.code,{children:"IN"}),". Note that ",(0,s.jsx)(n.code,{children:"COMMENT"})," does not actually pay any attention to ",(0,s.jsx)(n.code,{children:"OUT"})," arguments, since only the input arguments are needed to determine the function's identity. It is sufficient to list the ",(0,s.jsx)(n.code,{children:"IN"}),", ",(0,s.jsx)(n.code,{children:"INOUT"}),", and ",(0,s.jsx)(n.code,{children:"VARIADIC"})," arguments."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"argname"})})}),"\n",(0,s.jsxs)(n.p,{children:["The name of a function, procedure, or aggregate argument. Note that ",(0,s.jsx)(n.code,{children:"COMMENT"})," does not actually pay any attention to argument names, since only the argument data types are needed to determine the function's identity."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"argtype"})})}),"\n",(0,s.jsx)(n.p,{children:"The data type of a function, procedure, or aggregate argument."}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"left_type"})}),(0,s.jsx)("br",{}),"\n",(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"right_type"})})]}),"\n",(0,s.jsxs)(n.p,{children:["The data type(s) of the operator's arguments (optionally schema-qualified). Specify ",(0,s.jsx)(n.code,{children:"NONE"})," for the missing argument of a prefix or postfix operator."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"PROCEDURAL"})})}),"\n",(0,s.jsx)(n.p,{children:"Cloudberry Database ignores this noise word."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"type_name"})})}),"\n",(0,s.jsx)(n.p,{children:"The name of the data type of the transform."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"lang_name"})})}),"\n",(0,s.jsx)(n.p,{children:"The name of the language of the transform."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"string_literal"})})}),"\n",(0,s.jsx)(n.p,{children:"The new comment contents, written as a string literal."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"NULL"})})}),"\n",(0,s.jsxs)(n.p,{children:["Specify ",(0,s.jsx)(n.code,{children:"NULL"})," to drop the comment."]}),"\n",(0,s.jsx)(n.h2,{id:"notes",children:"Notes"}),"\n",(0,s.jsx)(n.p,{children:"There is presently no security mechanism for viewing comments: any user connected to a database can see all of the comments for objects in that database. For shared objects such as databases, roles, and tablespaces, comments are stored globally so any user connected to any database in the cluster can see all the comments for shared objects."}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Caution"})," Do not put security-critical information in comments."]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"examples",children:"Examples"}),"\n",(0,s.jsxs)(n.p,{children:["Attach a comment to the table ",(0,s.jsx)(n.code,{children:"mytable"}),":"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"COMMENT ON TABLE mytable IS 'This is my table.';\n"})}),"\n",(0,s.jsx)(n.p,{children:"Remove it again:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"COMMENT ON TABLE mytable IS NULL;\n"})}),"\n",(0,s.jsx)(n.p,{children:"More examples:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"COMMENT ON ACCESS METHOD gin IS 'GIN index access method';\nCOMMENT ON AGGREGATE my_aggregate (double precision) IS 'Computes sample variance';\nCOMMENT ON CAST (text AS int4) IS 'Allow casts from text to int4';\nCOMMENT ON COLLATION \"fr_CA\" IS 'Canadian French';\nCOMMENT ON COLUMN my_table.my_column IS 'Employee ID number';\nCOMMENT ON CONVERSION my_conv IS 'Conversion to UTF8';\nCOMMENT ON CONSTRAINT bar_col_cons ON bar IS 'Constrains column col';\nCOMMENT ON CONSTRAINT dom_col_constr ON DOMAIN dom IS 'Constrains col of domain';\nCOMMENT ON DATABASE my_database IS 'Development Database';\nCOMMENT ON DOMAIN my_domain IS 'Email Address Domain';\nCOMMENT ON EVENT TRIGGER cancel_ddl IS 'Cancels all DLL commands';\nCOMMENT ON EXTENSION hstore IS 'implements the hstore data type';\nCOMMENT ON FOREIGN DATA WRAPPER mywrapper IS 'my foreign data wrapper';\nCOMMENT ON FOREIGN TABLE my_foreign_table IS 'Employee Information in other database';\nCOMMENT ON FUNCTION my_function (timestamp) IS 'Returns Roman Numeral';\nCOMMENT ON INDEX my_index IS 'Enforces uniqueness on employee ID';\nCOMMENT ON LANGUAGE plpython IS 'Python support for stored procedures';\nCOMMENT ON MATERIALIZED VIEW my_matview IS 'Summary of order history';\nCOMMENT ON OPERATOR ^ (text, text) IS 'Performs intersection of two texts';\nCOMMENT ON OPERATOR - (NONE, integer) IS 'Unary minus';\nCOMMENT ON OPERATOR CLASS int4_ops USING btree IS '4 byte integer operators for btrees';\nCOMMENT ON OPERATOR FAMILY integer_ops USING btree IS 'all integer operators for btrees';\nCOMMENT ON POLICY my_policy ON mytable IS 'Filter rows by users';\nCOMMENT ON PROCEDURE my_proc (integer, integer) IS 'Runs a report';\nCOMMENT ON ROLE my_role IS 'Administration group for finance tables';\nCOMMENT ON ROUTINE my_routine (integer, integer) IS 'Runs a routine (which is a function or procedure)';\nCOMMENT ON RULE my_rule ON my_table IS 'Logs updates of employee records';\nCOMMENT ON SCHEMA my_schema IS 'Departmental data';\nCOMMENT ON SEQUENCE my_sequence IS 'Used to generate primary keys';\nCOMMENT ON SERVER myserver IS 'my foreign server';\nCOMMENT ON STATISTICS my_statistics IS 'Improves planner row estimations';\nCOMMENT ON TABLE my_schema.my_table IS 'Employee Information';\nCOMMENT ON TABLESPACE my_tablespace IS 'Tablespace for indexes';\nCOMMENT ON TEXT SEARCH CONFIGURATION my_config IS 'Special word filtering';\nCOMMENT ON TEXT SEARCH DICTIONARY swedish IS 'Snowball stemmer for Swedish language';\nCOMMENT ON TEXT SEARCH PARSER my_parser IS 'Splits text into words';\nCOMMENT ON TEXT SEARCH TEMPLATE snowball IS 'Snowball stemmer';\nCOMMENT ON TRANSFORM FOR hstore LANGUAGE plpythonu IS 'Transform between hstore and Python dict';\nCOMMENT ON TRIGGER my_trigger ON my_table IS 'Used for RI';\nCOMMENT ON TYPE complex IS 'Complex number data type';\nCOMMENT ON VIEW my_view IS 'View of departmental costs';\n"})}),"\n",(0,s.jsx)(n.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,s.jsxs)(n.p,{children:["There is no ",(0,s.jsx)(n.code,{children:"COMMENT"})," command in the SQL standard."]})]})}function m(e={}){const{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},11151:(e,n,t)=>{t.d(n,{Z:()=>c,a:()=>a});var s=t(67294);const o={},r=s.createContext(o);function a(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:a(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);