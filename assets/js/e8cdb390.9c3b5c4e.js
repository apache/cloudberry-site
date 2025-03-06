"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[2952],{46338:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>r,default:()=>h,frontMatter:()=>i,metadata:()=>o,toc:()=>l});var a=n(85893),s=n(11151);const i={title:"Create and Manage Tables"},r="Create and Manage Tables in Apache Cloudberry",o={id:"create-and-manage-tables",title:"Create and Manage Tables",description:"Apache Cloudberry tables are similar to tables in any relational database, except that table rows are distributed across the different segments in the system. When you create a table, you specify the table's distribution policy.",source:"@site/docs/create-and-manage-tables.md",sourceDirName:".",slug:"/create-and-manage-tables",permalink:"/docs/create-and-manage-tables",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/create-and-manage-tables.md",tags:[],version:"current",lastUpdatedBy:"Dianjin Wang",lastUpdatedAt:1741230918,formattedLastUpdatedAt:"Mar 6, 2025",frontMatter:{title:"Create and Manage Tables"},sidebar:"docsbars",previous:{title:"Create and Manage Tablespaces",permalink:"/docs/create-and-manage-tablespaces"},next:{title:"Create and Manage Schemas",permalink:"/docs/create-and-manage-schemas"}},c={},l=[{value:"Create a table",id:"create-a-table",level:2},{value:"Choose column data types",id:"choose-column-data-types",level:3},{value:"Set table and column constraints",id:"set-table-and-column-constraints",level:3},{value:"Check constraints",id:"check-constraints",level:4},{value:"Not-null constraints",id:"not-null-constraints",level:4},{value:"Unique constraints",id:"unique-constraints",level:4},{value:"Primary keys",id:"primary-keys",level:4},{value:"Foreign keys",id:"foreign-keys",level:4},{value:"Exclusion constraints",id:"exclusion-constraints",level:4}];function d(e){const t={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h1,{id:"create-and-manage-tables-in-apache-cloudberry",children:"Create and Manage Tables in Apache Cloudberry"}),"\n",(0,a.jsx)(t.p,{children:"Apache Cloudberry tables are similar to tables in any relational database, except that table rows are distributed across the different segments in the system. When you create a table, you specify the table's distribution policy."}),"\n",(0,a.jsx)(t.h2,{id:"create-a-table",children:"Create a table"}),"\n",(0,a.jsxs)(t.p,{children:["The ",(0,a.jsx)(t.code,{children:"CREATE TABLE"})," command creates a table and defines its structure. When you create a table, you define:"]}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsxs)(t.li,{children:["The columns of the table and their associated data types. See ",(0,a.jsx)(t.a,{href:"#choose-column-data-types",children:"Choose column data types"}),"."]}),"\n",(0,a.jsxs)(t.li,{children:["Any table or column constraints to limit the data that a column or table can contain. See ",(0,a.jsx)(t.a,{href:"#set-table-and-column-constraints",children:"Setting table and column constraints"}),"."]}),"\n",(0,a.jsx)(t.li,{children:"The distribution policy of the table, which determines how Apache Cloudberry divides data across the segments."}),"\n",(0,a.jsx)(t.li,{children:"The way the table is stored on disk."}),"\n",(0,a.jsx)(t.li,{children:"The table partitioning strategy for large tables."}),"\n"]}),"\n",(0,a.jsx)(t.h3,{id:"choose-column-data-types",children:"Choose column data types"}),"\n",(0,a.jsx)(t.p,{children:"The data type of a column determines the types of data values the column can contain. Choose the data type that uses the least possible space but can still accommodate your data and that best constrains the data. For example, use character data types for strings, date or timestamp data types for dates, and numeric data types for numbers."}),"\n",(0,a.jsxs)(t.p,{children:["For table columns that contain textual data, specify the data type ",(0,a.jsx)(t.code,{children:"VARCHAR"})," or ",(0,a.jsx)(t.code,{children:"TEXT"}),". Specifying the data type ",(0,a.jsx)(t.code,{children:"CHAR"})," is not recommended. In Apache Cloudberry, the data types ",(0,a.jsx)(t.code,{children:"VARCHAR"})," or ",(0,a.jsx)(t.code,{children:"TEXT"})," handle padding added to the data (space characters added after the last non-space character) as significant characters, the data type ",(0,a.jsx)(t.code,{children:"CHAR"})," does not."]}),"\n",(0,a.jsxs)(t.p,{children:["Use the smallest numeric data type that will accommodate your numeric data and allow for future expansion. For example, using ",(0,a.jsx)(t.code,{children:"BIGINT"})," for data that fits in ",(0,a.jsx)(t.code,{children:"INT"})," or ",(0,a.jsx)(t.code,{children:"SMALLINT"})," wastes storage space. If you expect that your data values will expand over time, consider that changing from a smaller datatype to a larger datatype after loading large amounts of data is costly. For example, if your current data values fit in a ",(0,a.jsx)(t.code,{children:"SMALLINT"})," but it is likely that the values will expand, ",(0,a.jsx)(t.code,{children:"INT"})," is the better long-term choice."]}),"\n",(0,a.jsx)(t.p,{children:"Use the same data types for columns that you plan to use in cross-table joins. Cross-table joins usually use the primary key in one table and a foreign key in the other table. When the data types are different, the database must convert one of them so that the data values can be compared correctly, which adds unnecessary overhead."}),"\n",(0,a.jsx)(t.h3,{id:"set-table-and-column-constraints",children:"Set table and column constraints"}),"\n",(0,a.jsx)(t.p,{children:"You can define constraints on columns and tables to restrict the data in your tables. Apache Cloudberry support for constraints is the same as PostgreSQL with some limitations, including:"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsxs)(t.li,{children:["\n",(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.code,{children:"CHECK"})," constraints can refer only to the table on which they are defined."]}),"\n"]}),"\n",(0,a.jsxs)(t.li,{children:["\n",(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.code,{children:"UNIQUE"})," and ",(0,a.jsx)(t.code,{children:"PRIMARY KEY"})," constraints must be compatible with their table's distribution key and partitioning key, if any."]}),"\n",(0,a.jsx)(t.admonition,{type:"info",children:(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.code,{children:"UNIQUE"})," and ",(0,a.jsx)(t.code,{children:"PRIMARY KEY"})," constraints are not allowed on append-optimized tables because the ",(0,a.jsx)(t.code,{children:"UNIQUE"})," indexes that are created by the constraints are not allowed on append-optimized tables."]})}),"\n"]}),"\n",(0,a.jsxs)(t.li,{children:["\n",(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.code,{children:"FOREIGN KEY"})," constraints are allowed, but not enforced."]}),"\n"]}),"\n",(0,a.jsxs)(t.li,{children:["\n",(0,a.jsx)(t.p,{children:"Constraints that you define on partitioned tables apply to the partitioned table as a whole. You cannot define constraints on the individual parts of the table."}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(t.h4,{id:"check-constraints",children:"Check constraints"}),"\n",(0,a.jsx)(t.p,{children:"Check constraints allow you to specify that the value in a certain column must satisfy a Boolean (truth-value) expression. For example, to require positive product prices:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-sql",children:"=> CREATE TABLE products \n            ( product_no integer, \n              name text, \n              price numeric CHECK (price > 0) );\n"})}),"\n",(0,a.jsx)(t.h4,{id:"not-null-constraints",children:"Not-null constraints"}),"\n",(0,a.jsx)(t.p,{children:"Not-null constraints specify that a column must not assume the null value. A not-null constraint is always written as a column constraint. For example:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-sql",children:"=> CREATE TABLE products \n       ( product_no integer NOT NULL,\n         name text NOT NULL,\n         price numeric );\n"})}),"\n",(0,a.jsx)(t.h4,{id:"unique-constraints",children:"Unique constraints"}),"\n",(0,a.jsxs)(t.p,{children:["Unique constraints ensure that the data contained in a column or a group of columns is unique with respect to all the rows in the table. The table must be hash-distributed or replicated (not ",(0,a.jsx)(t.code,{children:"DISTRIBUTED RANDOMLY"}),"). If the table is hash-distributed, the constraint columns must be the same as (or a superset of) the table's distribution key columns. For example:"]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-sql",children:"=> CREATE TABLE products \n       ( product_no integer `UNIQUE`, \n         name text, \n         price numeric)\n      DISTRIBUTED BY (product_no);\n"})}),"\n",(0,a.jsx)(t.h4,{id:"primary-keys",children:"Primary keys"}),"\n",(0,a.jsxs)(t.p,{children:["A primary key constraint is a combination of a ",(0,a.jsx)(t.code,{children:"UNIQUE"})," constraint and a ",(0,a.jsx)(t.code,{children:"NOT NULL"})," constraint. The table must be hash-distributed (not ",(0,a.jsx)(t.code,{children:"DISTRIBUTED RANDOMLY"}),"), and the primary key columns must be the same as (or a superset of) the table's distribution key columns. If a table has a primary key, this column (or group of columns) is chosen as the distribution key for the table by default. For example:"]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-sql",children:"=> CREATE TABLE products \n       ( `product_no` integer `PRIMARY KEY`, \n         name text, \n         price numeric)\n`      DISTRIBUTED BY (``product_no``)`;\n\n"})}),"\n",(0,a.jsx)(t.h4,{id:"foreign-keys",children:"Foreign keys"}),"\n",(0,a.jsx)(t.p,{children:"Foreign keys are not supported. You can declare them, but referential integrity is not enforced."}),"\n",(0,a.jsx)(t.p,{children:"Foreign key constraints specify that the values in a column or a group of columns must match the values appearing in some row of another table to maintain referential integrity between two related tables. Referential integrity checks cannot be enforced between the distributed table segments of a Apache Cloudberry."}),"\n",(0,a.jsx)(t.h4,{id:"exclusion-constraints",children:"Exclusion constraints"}),"\n",(0,a.jsx)(t.p,{children:"Exclusion constraints ensure that if any two rows are compared on the specified columns or expressions using the specified operators, at least one of these operator comparisons will return false or null. The syntax is:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-sql",children:"CREATE TABLE circles (\n    c circle,\n    EXCLUDE USING gist (c WITH &&)\n) DISTRIBUTED REPLICATED;\n"})}),"\n",(0,a.jsxs)(t.p,{children:["Similar to unique constraints, an exclusion constraint is permitted only for replicated tables or when the distribution key columns are part of the constraint, with the same ",(0,a.jsx)(t.code,{children:"="})," operator as in the distribution key's hash operator class."]}),"\n",(0,a.jsx)(t.p,{children:"Exclusion constraints are not supported for partitioned tables."}),"\n",(0,a.jsxs)(t.p,{children:["See also ",(0,a.jsx)(t.a,{href:"https://github.com/apache/cloudberry-site/blob/cbdb-doc-validation/docs/sql-stmts/create-table.md",children:(0,a.jsx)(t.code,{children:"CREATE TABLE ... CONSTRAINT ... EXCLUDE"})})," for details."]}),"\n",(0,a.jsx)(t.p,{children:"Adding an exclusion constraint automatically creates an index of the type specified in the constraint declaration."})]})}function h(e={}){const{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}},11151:(e,t,n)=>{n.d(t,{Z:()=>o,a:()=>r});var a=n(67294);const s={},i=a.createContext(s);function r(e){const t=a.useContext(i);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),a.createElement(i.Provider,{value:t},e.children)}}}]);