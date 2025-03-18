"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[9948],{53553:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>h,frontMatter:()=>a,metadata:()=>o,toc:()=>c});var s=n(85893),r=n(11151);const a={title:"CREATE FOREIGN TABLE"},i="CREATE FOREIGN TABLE",o={id:"sql-stmts/create-foreign-table",title:"CREATE FOREIGN TABLE",description:"Defines a new foreign table.",source:"@site/docs/sql-stmts/create-foreign-table.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/create-foreign-table",permalink:"/docs/sql-stmts/create-foreign-table",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/create-foreign-table.md",tags:[],version:"current",lastUpdatedBy:"Dianjin Wang",lastUpdatedAt:1742268909,formattedLastUpdatedAt:"Mar 18, 2025",frontMatter:{title:"CREATE FOREIGN TABLE"},sidebar:"docsbars",previous:{title:"CREATE FOREIGN DATA WRAPPER",permalink:"/docs/sql-stmts/create-foreign-data-wrapper"},next:{title:"CREATE FUNCTION",permalink:"/docs/sql-stmts/create-function"}},l={},c=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Notes",id:"notes",level:2},{value:"Examples",id:"examples",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function d(e){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h1,{id:"create-foreign-table",children:"CREATE FOREIGN TABLE"}),"\n",(0,s.jsx)(t.p,{children:"Defines a new foreign table."}),"\n",(0,s.jsx)(t.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-sql",children:"CREATE FOREIGN TABLE [ IF NOT EXISTS ] <table_name> ( [\n  { <column_name> <data_type> [ OPTIONS ( <option> '<value>' [, ... ] ) ] [ COLLATE <collation> ] [ <column_constraint> [ ... ] ]\n    | <table_constraint> }\n    [, ... ]\n] )\n[ INHERITS ( <parent_table> [, ... ] ) ]\n  SERVER <server_name>\n  [ OPTIONS ( [ mpp_execute { 'coordinator' | 'any' | 'all segments' } [, ] ] <option> '<value>' [, ... ] ) ]\n\nCREATE FOREIGN TABLE [ IF NOT EXISTS ] <table_name>\n  PARTITION OF <parent_table> [ (\n  { <column_name> [ WITH OPTIONS ] [ <column_constraint> [ ... ] ]\n    | <table_constraint> }\n    [, ... ]\n) ]\n{ FOR VALUES <partition_bound_spec> | DEFAULT }\n  SERVER <server_name>\n  [ OPTIONS ( [ mpp_execute { 'coordinator' | 'any' | 'all segments' } [, ] ] <option> '<value>' [, ... ] ) ]\n\n-- where <column_constraint> is:\n\n[ CONSTRAINT <constraint_name> ]\n{ NOT NULL |\n  NULL |\n  DEFAULT <default_expr> |\n  GENERATED ALWAYS AS ( <generation_expr> ) STORED}\n\n-- and <table_constraint> is:\n\n[ CONSTRAINT <constraint_name> ]\nCHECK ( <expression> ) [ NO INHERIT ]\n\n-- and <partition_bound_spec> is:\n\nIN ( <partition_bound_expr> [, ...] ) |\nFROM ( { <partition_bound_expr> | MINVALUE | MAXVALUE } [, ...] )\n  TO ( { <partition_bound_expr> | MINVALUE | MAXVALUE } [, ...] ) |\nWITH ( MODULUS <numeric_literal>, REMAINDER <numeric_literal> )\n"})}),"\n",(0,s.jsx)(t.h2,{id:"description",children:"Description"}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.code,{children:"CREATE FOREIGN TABLE"})," creates a new foreign table in the current database. The user who creates the foreign table becomes its owner."]}),"\n",(0,s.jsxs)(t.p,{children:["If you schema-qualify the table name (for example, ",(0,s.jsx)(t.code,{children:"CREATE FOREIGN TABLE myschema.mytable ..."}),"), Apache Cloudberry creates the table in the specified schema. Otherwise, the foreign table is created in the current schema. The name of the foreign table must be distinct from the name of any other foreign table, table, sequence, index, view, or materialized view in the same schema."]}),"\n",(0,s.jsxs)(t.p,{children:["Because ",(0,s.jsx)(t.code,{children:"CREATE FOREIGN TABLE"})," automatically creates a data type that represents the composite type corresponding to one row of the foreign table, foreign tables cannot have the same name as any existing data type in the same schema."]}),"\n",(0,s.jsxs)(t.p,{children:["If the ",(0,s.jsx)(t.code,{children:"PARTITION OF"})," clause is specified, then the table is created as a partition of parent_table with specified bounds."]}),"\n",(0,s.jsxs)(t.p,{children:["To create a foreign table, you must have ",(0,s.jsx)(t.code,{children:"USAGE"})," privilege on the foreign server, as well as ",(0,s.jsx)(t.code,{children:"USAGE"})," privilege on all column types used in the table."]}),"\n",(0,s.jsx)(t.h2,{id:"parameters",children:"Parameters"}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"IF NOT EXISTS"})})}),"\n",(0,s.jsx)(t.p,{children:"Do not throw an error if a relation with the same name already exists. Apache Cloudberry issues a notice in this case. Note that there is no guarantee that the existing relation is anything like the one that would have been created."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"table_name"})})}),"\n",(0,s.jsx)(t.p,{children:"The name (optionally schema-qualified) of the foreign table to create."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"column_name"})})}),"\n",(0,s.jsx)(t.p,{children:"The name of a column to create in the new foreign table."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"data_type"})})}),"\n",(0,s.jsx)(t.p,{children:"The data type of the column, including array specifiers."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"COLLATE collation"})})}),"\n",(0,s.jsxs)(t.p,{children:["The ",(0,s.jsx)(t.code,{children:"COLLATE"})," clause assigns a collation to the column (which must be of a collatable data type). If not specified, the column data type's default collation is used."]}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"INHERITS ( parent_table [, ... ] )"})})}),"\n",(0,s.jsxs)(t.p,{children:["The optional ",(0,s.jsx)(t.code,{children:"INHERITS"})," clause specifies a list of tables from which the new foreign table automatically inherits all columns. Parent tables can be plain tables or foreign tables. See the similar form of ",(0,s.jsx)(t.a,{href:"/docs/sql-stmts/create-table",children:"CREATE TABLE"})," for more details."]}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"PARTITION OF parent_table { FOR VALUES partition_bound_spec | DEFAULT }"})})}),"\n",(0,s.jsxs)(t.p,{children:["This form can be used to create the foreign table as partition of the given parent table with specified partition bound values. See the similar form of ",(0,s.jsx)(t.a,{href:"/docs/sql-stmts/create-table",children:"CREATE TABLE"})," for more details. Note that it is currently not allowed to create the foreign table as a partition of the parent table if there are ",(0,s.jsx)(t.code,{children:"UNIQUE"})," indexes on the parent table. (See also ",(0,s.jsx)(t.a,{href:"/docs/sql-stmts/alter-table",children:"ALTER TABLE ATTACH PARTITION"}),".)"]}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"CONSTRAINT constraint_name"})})}),"\n",(0,s.jsxs)(t.p,{children:["An optional name for a column or table constraint. If the constraint is violated, the constraint name is present in error messages, so constraint names like ",(0,s.jsx)(t.code,{children:"col must be positive"})," can be used to communicate helpful constraint information to client applications. (Double-quotes are needed to specify constraint names that contain spaces.) If a constraint name is not specified, the system generates a name."]}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"NOT NULL"})})}),"\n",(0,s.jsx)(t.p,{children:"The column is not allowed to contain null values."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"NULL"})})}),"\n",(0,s.jsx)(t.p,{children:"The column is allowed to contain null values. This is the default."}),"\n",(0,s.jsx)(t.p,{children:"This clause is provided only for compatibility with non-standard SQL databases. Its use is discouraged in new applications."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"CHECK ( expression ) [ NO INHERIT ]"})})}),"\n",(0,s.jsxs)(t.p,{children:["The ",(0,s.jsx)(t.code,{children:"CHECK"})," clause specifies an expression producing a Boolean result which each row in the foreign table is expected to satisfy; that is, the expression should produce TRUE or UNKNOWN, never FALSE, for all rows in the foreign table. A check constraint specified as a column constraint should reference that column's value only, while an expression appearing in a table constraint can reference multiple columns."]}),"\n",(0,s.jsxs)(t.p,{children:["Currently, ",(0,s.jsx)(t.code,{children:"CHECK"})," expressions cannot contain subqueries nor refer to variables other than columns of the current row. The system column ",(0,s.jsx)(t.code,{children:"tableoid"})," may be referenced, but not any other system column."]}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"DEFAULT default_expr"})})}),"\n",(0,s.jsxs)(t.p,{children:["The ",(0,s.jsx)(t.code,{children:"DEFAULT"})," clause assigns a default value for the column whose definition it appears within. The value is any variable-free expression; Apache Cloudberry does not allow subqueries and cross-references to other columns in the current table. The data type of the default expression must match the data type of the column."]}),"\n",(0,s.jsx)(t.p,{children:"Apache Cloudberry uses the default expression in any insert operation that does not specify a value for the column. If there is no default for a column, then the default is null."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"GENERATED ALWAYS AS ( generation_expr ) STORED"})})}),"\n",(0,s.jsx)(t.p,{children:"This clause creates the column as a generated column. The column cannot be written to, and when read the result of the specified expression will be returned."}),"\n",(0,s.jsxs)(t.p,{children:["The keyword ",(0,s.jsx)(t.code,{children:"STORED"})," is required to signify that the column will be computed on write. (The computed value will be presented to the foreign-data wrapper for storage and must be returned on reading.)"]}),"\n",(0,s.jsx)(t.p,{children:"The generation expression can refer to other columns in the table, but not other generated columns. Any functions and operators used must be immutable. References to other tables are not allowed."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"server_name"})})}),"\n",(0,s.jsxs)(t.p,{children:["The name of an existing server to use for the foreign table. For details on defining a server, see ",(0,s.jsx)(t.a,{href:"/docs/sql-stmts/create-server",children:"CREATE SERVER"}),"."]}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"OPTIONS ( option 'value' [, ... ] )"})})}),"\n",(0,s.jsx)(t.p,{children:"The options for the new foreign table or one of its columns. While option names must be unique, a table option and a column option may have the same name. The option names and values are foreign-data wrapper-specific. Apache Cloudberry validates the options and values using the foreign-data wrapper's validator_function."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"mpp_execute { 'coordinator' | 'any' | 'all segments' }"})})}),"\n",(0,s.jsx)(t.p,{children:"A Apache Cloudberry-specific option that identifies the host from which the foreign-data wrapper reads or writes data:"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:"coordinator"})," (the default)\u2014Read or write data from the coordinator host."]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:"any"}),"\u2014Read data from either the coordinator host or any one segment, depending on which path costs less."]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:"all segments"}),"\u2014Read or write data from all segments. To support this option value, the foreign-data wrapper must have a policy that matches the segments to data."]}),"\n"]}),"\n",(0,s.jsxs)(t.blockquote,{children:["\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.strong,{children:"Note"})," Apache Cloudberry supports parallel writes to foreign tables only when you set ",(0,s.jsx)(t.code,{children:"mpp_execute 'all segments'"}),"."]}),"\n"]}),"\n",(0,s.jsxs)(t.p,{children:["Support for the foreign table ",(0,s.jsx)(t.code,{children:"mpp_execute"})," option, and the specific modes, is foreign-data wrapper-specific."]}),"\n",(0,s.jsxs)(t.p,{children:["The ",(0,s.jsx)(t.code,{children:"mpp_execute"})," option can be specified in multiple commands: ",(0,s.jsx)(t.code,{children:"CREATE FOREIGN TABLE"}),", ",(0,s.jsx)(t.code,{children:"CREATE SERVER"}),", and ",(0,s.jsx)(t.code,{children:"CREATE FOREIGN DATA WRAPPER"}),". The foreign table setting takes precedence over the foreign server setting, followed by the foreign-data wrapper setting."]}),"\n",(0,s.jsx)(t.h2,{id:"notes",children:"Notes"}),"\n",(0,s.jsxs)(t.p,{children:["Constraints on foreign tables (such as ",(0,s.jsx)(t.code,{children:"CHECK"})," or ",(0,s.jsx)(t.code,{children:"NOT NULL"})," clauses) are not enforced by Apache Cloudberry, and most foreign-data wrappers do not attempt to enforce them either; that is, the constraint is simply assumed to hold true. There would be little point in such enforcement since it would only apply to rows inserted or updated via the foreign table, and not to rows modified by other means, such as directly on the remote server. Instead, a constraint attached to a foreign table should represent a constraint that is being enforced by the remote server."]}),"\n",(0,s.jsx)(t.p,{children:"Some special-purpose foreign-data wrappers might be the only access mechanism for the data they access, and in that case it might be appropriate for the foreign-data wrapper itself to perform constraint enforcement. But you should not assume that a wrapper does that unless its documentation says so."}),"\n",(0,s.jsx)(t.p,{children:"Although Apache Cloudberry does not attempt to enforce constraints on foreign tables, it does assume that they are correct for purposes of query optimization. If there are rows visible in the foreign table that do not satisfy a declared constraint, queries on the table might produce errors or incorrect answers. It is the user's responsibility to ensure that the constraint definition matches reality."}),"\n",(0,s.jsx)("div",{class:"note",children:"When a foreign table is used as a partition of a partitioned table, there is an implicit constraint that its contents must satisfy the partitioning rule. Again, it is the user's responsibility to ensure that that is true, which is best done by installing a matching constraint on the remote server."}),"\n",(0,s.jsxs)(t.p,{children:["Within a partitioned table containing foreign-table partitions, an ",(0,s.jsx)(t.code,{children:"UPDATE"})," that changes the partition key value can cause a row to be moved from a local partition to a foreign-table partition, provided the foreign-data wrapper supports tuple routing. However it is not currently possible to move a row from a foreign-table partition to another partition. An ",(0,s.jsx)(t.code,{children:"UPDATE"})," that would require doing that will fail due to the partitioning constraint, assuming that that is properly enforced by the remote server."]}),"\n",(0,s.jsx)(t.p,{children:"Similar considerations apply to generated columns. Stored generated columns are computed on insert or update on the local Apache Cloudberry server and handed to the foreign-data wrapper for writing out to the foreign data store, but it is not enforced that a query of the foreign table returns values for stored generated columns that are consistent with the generation expression. Again, this might result in incorrect query results."}),"\n",(0,s.jsx)(t.h2,{id:"examples",children:"Examples"}),"\n",(0,s.jsxs)(t.p,{children:["Create a foreign table named ",(0,s.jsx)(t.code,{children:"films"})," with the server named ",(0,s.jsx)(t.code,{children:"film_server"}),":"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-sql",children:"CREATE FOREIGN TABLE films (\n    code        char(5) NOT NULL,\n    title       varchar(40) NOT NULL,\n    did         integer NOT NULL,\n    date_prod   date,\n    kind        varchar(10),\n    len         interval hour to minute\n)\nSERVER film_server;\n"})}),"\n",(0,s.jsxs)(t.p,{children:["Create foreign table ",(0,s.jsx)(t.code,{children:"measurement_y2016m07"}),", which will be accessed through the server ",(0,s.jsx)(t.code,{children:"server_07"}),", as a partition of the range partitioned table measurement:"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-sql",children:"CREATE FOREIGN TABLE measurement_y2016m07\n    PARTITION OF measurement FOR VALUES FROM ('2016-07-01') TO ('2016-08-01')\n    SERVER server_07;\n"})}),"\n",(0,s.jsx)(t.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.code,{children:"CREATE FOREIGN TABLE"})," largely conforms to the SQL standard; however, much as with ",(0,s.jsx)(t.a,{href:"/docs/sql-stmts/create-table",children:"CREATE TABLE"}),", Apache Cloudberry permits ",(0,s.jsx)(t.code,{children:"NULL"})," constraints and zero-column foreign tables. The ability to specify column default values is a Apache Cloudberry extension, as is the ",(0,s.jsx)(t.code,{children:"mpp_execute"})," option. Table inheritance, in the form defined by Apache Cloudberry, is nonstandard."]}),"\n",(0,s.jsx)(t.h2,{id:"see-also",children:"See also"}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.a,{href:"/docs/sql-stmts/alter-foreign-table",children:"ALTER FOREIGN TABLE"}),", ",(0,s.jsx)(t.a,{href:"/docs/sql-stmts/drop-foreign-table",children:"DROP FOREIGN TABLE"}),", ",(0,s.jsx)(t.a,{href:"/docs/sql-stmts/create-server",children:"CREATE SERVER"})]})]})}function h(e={}){const{wrapper:t}={...(0,r.a)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},11151:(e,t,n)=>{n.d(t,{Z:()=>o,a:()=>i});var s=n(67294);const r={},a=s.createContext(r);function i(e){const t=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),s.createElement(a.Provider,{value:t},e.children)}}}]);