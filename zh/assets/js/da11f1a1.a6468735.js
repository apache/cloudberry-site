"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[5109],{90181:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>l,contentTitle:()=>c,default:()=>h,frontMatter:()=>i,metadata:()=>r,toc:()=>o});var t=n(85893),a=n(11151);const i={title:"CREATE SEQUENCE"},c="CREATE SEQUENCE",r={id:"sql-stmts/create-sequence",title:"CREATE SEQUENCE",description:"Defines a new sequence generator.",source:"@site/docs/sql-stmts/create-sequence.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/create-sequence",permalink:"/zh/docs/sql-stmts/create-sequence",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/create-sequence.md",tags:[],version:"current",lastUpdatedBy:"vitalzf",lastUpdatedAt:1733108055,formattedLastUpdatedAt:"2024\u5e7412\u67082\u65e5",frontMatter:{title:"CREATE SEQUENCE"},sidebar:"docsbars",previous:{title:"CREATE SCHEMA",permalink:"/zh/docs/sql-stmts/create-schema"},next:{title:"CREATE SERVER",permalink:"/zh/docs/sql-stmts/create-server"}},l={},o=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Notes",id:"notes",level:2},{value:"Examples",id:"examples",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function d(e){const s={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,a.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(s.h1,{id:"create-sequence",children:"CREATE SEQUENCE"}),"\n",(0,t.jsx)(s.p,{children:"Defines a new sequence generator."}),"\n",(0,t.jsx)(s.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-sql",children:"CREATE [TEMPORARY | TEMP] SEQUENCE [IF NOT EXISTS] <name>\n       [ AS data_type ]\n\xa0\xa0\xa0\xa0\xa0\xa0\xa0[INCREMENT [BY] <increment>] \n\xa0\xa0\xa0\xa0\xa0\xa0\xa0[MINVALUE <minvalue> | NO MINVALUE] \n\xa0\xa0\xa0\xa0\xa0\xa0\xa0[MAXVALUE <maxvalue> | NO MAXVALUE] \n\xa0\xa0\xa0\xa0\xa0\xa0\xa0[START [ WITH ] <start>] \n\xa0\xa0\xa0\xa0\xa0\xa0\xa0[CACHE <cache>] \n\xa0\xa0\xa0\xa0\xa0\xa0\xa0[[NO] CYCLE] \n\xa0\xa0\xa0\xa0\xa0\xa0\xa0[OWNED BY { <table_name>.<column_name> | NONE }]\n"})}),"\n",(0,t.jsx)(s.h2,{id:"description",children:"Description"}),"\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.code,{children:"CREATE SEQUENCE"})," creates a new sequence number generator. This involves creating and initializing a new special single-row table with the same name. The generator will be owned by the user issuing the command."]}),"\n",(0,t.jsx)(s.p,{children:"If a schema name is given, then the sequence is created in the specified schema. Otherwise it is created in the current schema. Temporary sequences exist in a special schema, so you may not provide a schema name when creating a temporary sequence. The sequence name must be distinct from the name of any other sequence, table, index, view, or foreign table in the same schema."}),"\n",(0,t.jsxs)(s.p,{children:["After a sequence is created, you use the ",(0,t.jsx)(s.code,{children:"nextval()"})," function to operate on the sequence. For example, to insert a row into a table that gets the next value of a sequence:"]}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-sql",children:"INSERT INTO distributors VALUES (nextval('myserial'), 'acme');\n"})}),"\n",(0,t.jsxs)(s.p,{children:["You can also use the function ",(0,t.jsx)(s.code,{children:"setval()"})," to operate on a sequence, but only for queries that do not operate on distributed data. For example, the following query is allowed because it resets the sequence counter value for the sequence generator process on the coordinator:"]}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-sql",children:"SELECT setval('myserial', 201);\n"})}),"\n",(0,t.jsx)(s.p,{children:"But the following query will be rejected in Cloudberry Database because it operates on distributed data:"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-sql",children:"INSERT INTO product VALUES (setval('myserial', 201), 'gizmo');\n"})}),"\n",(0,t.jsx)(s.p,{children:"In a regular (non-distributed) database, functions that operate on the sequence go to the local sequence table to get values as they are needed. In Cloudberry Database, however, keep in mind that each segment is its own distinct database process. Therefore the segments need a single point of truth to go for sequence values so that all segments get incremented correctly and the sequence moves forward in the right order. A sequence server process runs on the coordinator and is the point-of-truth for a sequence in a Cloudberry Database distributed database. Segments get sequence values at runtime from the coordinator."}),"\n",(0,t.jsx)(s.p,{children:"Because of this distributed sequence design, there are some limitations on the functions that operate on a sequence in Cloudberry Database:"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.code,{children:"lastval()"})," and ",(0,t.jsx)(s.code,{children:"currval()"})," functions are not supported."]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.code,{children:"setval()"})," can only be used to set the value of the sequence generator on the coordinator, it cannot be used in subqueries to update records on distributed table data."]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.code,{children:"nextval()"})," sometimes grabs a block of values from the coordinator for a segment to use, depending on the query. So values may sometimes be skipped in the sequence if all of the block turns out not to be needed at the segment level. Note that a regular PostgreSQL database does this too, so this is not something unique to Cloudberry Database."]}),"\n"]}),"\n",(0,t.jsxs)(s.blockquote,{children:["\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.strong,{children:"Note"}),"\nThe default sequence cache size in Cloudberry Database is ",(0,t.jsx)(s.code,{children:"20"}),"."]}),"\n"]}),"\n",(0,t.jsx)(s.p,{children:"Although you cannot update a sequence directly, you can use a query like:"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-sql",children:"SELECT * FROM <sequence_name>;\n"})}),"\n",(0,t.jsxs)(s.p,{children:["to examine the parameters and current state of a sequence. In particular, the last_value field of the sequence shows the last value allocated by any session. (Note that this value might be obsolete by the time it's printed, if other sessions are actively doing ",(0,t.jsx)(s.code,{children:"nextval()"})," calls.)"]}),"\n",(0,t.jsx)(s.h2,{id:"parameters",children:"Parameters"}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.strong,{children:(0,t.jsx)(s.code,{children:"TEMPORARY | TEMP"})})}),"\n",(0,t.jsx)(s.p,{children:"If specified, the sequence object is created only for this session, and is automatically dropped on session exit. Existing permanent sequences with the same name are not visible (in this session) while the temporary sequence exists, unless they are referenced with schema-qualified names."}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.strong,{children:(0,t.jsx)(s.code,{children:"IF NOT EXISTS"})})}),"\n",(0,t.jsx)(s.p,{children:"Do not throw an error if a relation with the same name already exists. Cloudberry Database issues a notice in this case. Note that there is no guarantee that the existing relation is anything like the sequence that would have been created - it might not even be a sequence."}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.strong,{children:(0,t.jsx)(s.code,{children:"name"})})}),"\n",(0,t.jsx)(s.p,{children:"The name (optionally schema-qualified) of the sequence to be created."}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.strong,{children:(0,t.jsx)(s.code,{children:"data_type"})})}),"\n",(0,t.jsxs)(s.p,{children:["The optional clause ",(0,t.jsx)(s.code,{children:"AS data_type"})," specifies the data type of the sequence. Valid types are ",(0,t.jsx)(s.code,{children:"smallint"}),", ",(0,t.jsx)(s.code,{children:"integer"}),", and ",(0,t.jsx)(s.code,{children:"bigint"}),". ",(0,t.jsx)(s.code,{children:"bigint"})," is the default. The data type determines the default minimum and maximum values of the sequence."]}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.strong,{children:(0,t.jsx)(s.code,{children:"increment"})})}),"\n",(0,t.jsxs)(s.p,{children:["Specifies which value is added to the current sequence value to create a new value. A positive value will make an ascending sequence, a negative one a descending sequence. The default value is ",(0,t.jsx)(s.code,{children:"1"}),"."]}),"\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.strong,{children:(0,t.jsx)(s.code,{children:"minvalue"})}),(0,t.jsx)("br",{}),"\n",(0,t.jsx)(s.strong,{children:(0,t.jsx)(s.code,{children:"NO MINVALUE"})})]}),"\n",(0,t.jsxs)(s.p,{children:["Determines the minimum value a sequence can generate. If this clause is not supplied or ",(0,t.jsx)(s.code,{children:"NO MINVALUE"})," is specified, then the default values will be used. The default for an ascending sequence is the maximum value of the data type. The default for a descending sequence is ",(0,t.jsx)(s.code,{children:"-1"}),"."]}),"\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.strong,{children:(0,t.jsx)(s.code,{children:"maxvalue"})}),(0,t.jsx)("br",{}),"\n",(0,t.jsx)(s.strong,{children:(0,t.jsx)(s.code,{children:"NO MAXVALUE"})})]}),"\n",(0,t.jsxs)(s.p,{children:["Determines the maximum value for the sequence. If this clause is not supplied or ",(0,t.jsx)(s.code,{children:"NO MAXVALUE"})," is specified, then default values will be used. The defaults are 263-1 and -1 for ascending and descending sequences, respectively."]}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.strong,{children:(0,t.jsx)(s.code,{children:"start"})})}),"\n",(0,t.jsxs)(s.p,{children:["Allows the sequence to begin anywhere. The default starting value is ",(0,t.jsx)(s.code,{children:"minvalue"})," for ascending sequences and ",(0,t.jsx)(s.code,{children:"maxvalue"})," for descending ones."]}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.strong,{children:(0,t.jsx)(s.code,{children:"cache"})})}),"\n",(0,t.jsx)(s.p,{children:"Specifies how many sequence numbers are to be preallocated and stored in memory for faster access. The default value is 20. The minimum value is 1 (no cache)."}),"\n",(0,t.jsxs)(s.blockquote,{children:["\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.strong,{children:"Note"})," When operating with a cache of sequence numbers (",(0,t.jsx)(s.code,{children:"cache > 1"}),"), Cloudberry Database may discard some cached sequence values. If you require consecutive values, you must explicitly set ",(0,t.jsx)(s.code,{children:"CACHE 1"})," when you create or alter the sequence."]}),"\n"]}),"\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.strong,{children:(0,t.jsx)(s.code,{children:"CYCLE"})}),(0,t.jsx)("br",{}),"\n",(0,t.jsx)(s.strong,{children:(0,t.jsx)(s.code,{children:"NO CYCLE"})})]}),"\n",(0,t.jsxs)(s.p,{children:["Allows the sequence to wrap around when the ",(0,t.jsx)(s.code,{children:"maxvalue"})," (for ascending) or ",(0,t.jsx)(s.code,{children:"minvalue"})," (for descending) has been reached. If the limit is reached, the next number generated will be the ",(0,t.jsx)(s.code,{children:"minvalue"})," (for ascending) or ",(0,t.jsx)(s.code,{children:"maxvalue"})," (for descending). If ",(0,t.jsx)(s.code,{children:"NO CYCLE"})," is specified, any calls to ",(0,t.jsx)(s.code,{children:"nextval()"})," after the sequence has reached its maximum value will return an error. If neither ",(0,t.jsx)(s.code,{children:"CYCLE"})," or ",(0,t.jsx)(s.code,{children:"NO CYCLE"})," are specified, ",(0,t.jsx)(s.code,{children:"NO CYCLE"})," is the default."]}),"\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.strong,{children:(0,t.jsx)(s.code,{children:"OWNED BY table_name.colume_name"})}),(0,t.jsx)("br",{}),"\n",(0,t.jsx)(s.strong,{children:(0,t.jsx)(s.code,{children:"OWNED BY NONE"})})]}),"\n",(0,t.jsxs)(s.p,{children:["Causes the sequence to be associated with a specific table column, such that if that column (or its whole table) is dropped, the sequence will be automatically dropped as well. The specified table must have the same owner and be in the same schema as the sequence. ",(0,t.jsx)(s.code,{children:"OWNED BY NONE"}),", the default, specifies that there is no such association."]}),"\n",(0,t.jsx)(s.h2,{id:"notes",children:"Notes"}),"\n",(0,t.jsxs)(s.p,{children:["Use ",(0,t.jsx)(s.code,{children:"DROP SEQUENCE"})," to remove a sequence."]}),"\n",(0,t.jsx)(s.p,{children:"Sequences are based on bigint arithmetic, so the range cannot exceed the range of an eight-byte integer (-9223372036854775808 to 9223372036854775807)."}),"\n",(0,t.jsxs)(s.p,{children:["Because ",(0,t.jsx)(s.code,{children:"nextval()"})," and ",(0,t.jsx)(s.code,{children:"setval()"}),' calls are never rolled back, sequence objects cannot be used if "gapless" assignment of sequence numbers is needed. It is possible to build gapless assignment by using exclusive locking of a table containing a counter; but this solution is much more expensive than sequence objects, especially if many transactions need sequence numbers concurrently.']}),"\n",(0,t.jsxs)(s.p,{children:["Although multiple sessions are guaranteed to allocate distinct sequence values, the values may be generated out of sequence when all the sessions are considered. For example, with a ",(0,t.jsx)(s.code,{children:"cache"})," setting of ",(0,t.jsx)(s.code,{children:"10"}),", session A might reserve values 1..10 and return ",(0,t.jsx)(s.code,{children:"nextval=1"}),", then session B might reserve values 11..20 and return ",(0,t.jsx)(s.code,{children:"nextval=11"})," before session A has generated nextval=2. Thus, with a ",(0,t.jsx)(s.code,{children:"cache"})," setting of one it is safe to assume that ",(0,t.jsx)(s.code,{children:"nextval()"})," values are generated sequentially; with a ",(0,t.jsx)(s.code,{children:"cache"})," setting greater than one you should only assume that the ",(0,t.jsx)(s.code,{children:"nextval()"})," values are all distinct, not that they are generated purely sequentially."]}),"\n",(0,t.jsxs)(s.p,{children:["Another consideration is that a ",(0,t.jsx)(s.code,{children:"setval()"})," executed on such a sequence will not be noticed by other sessions until they have used up any preallocated values they have cached."]}),"\n",(0,t.jsx)(s.h2,{id:"examples",children:"Examples"}),"\n",(0,t.jsxs)(s.p,{children:["Create an ascending sequence named ",(0,t.jsx)(s.code,{children:"myseq"}),", starting at 101:"]}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-sql",children:"CREATE SEQUENCE myseq START 101;\n"})}),"\n",(0,t.jsxs)(s.p,{children:["Insert a row into a table that gets the next value of the sequence named ",(0,t.jsx)(s.code,{children:"myseq"}),":"]}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-sql",children:"INSERT INTO distributors VALUES (nextval('myseq'), 'acme'); \n"})}),"\n",(0,t.jsx)(s.p,{children:"Reset the sequence counter value on the Cloudberry Database coordinator:"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-sql",children:"SELECT setval('myseq', 201);\n"})}),"\n",(0,t.jsxs)(s.p,{children:["Illegal use of ",(0,t.jsx)(s.code,{children:"setval()"})," in Cloudberry Database (setting sequence values on distributed data):"]}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-sql",children:"INSERT INTO product VALUES (setval('myseq', 201), 'gizmo'); \n"})}),"\n",(0,t.jsx)(s.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.code,{children:"CREATE SEQUENCE"})," conforms to the SQL standard, with the following exceptions:"]}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:["You obtain the next value using the ",(0,t.jsx)(s.code,{children:"nextval()"})," function instead of the ",(0,t.jsx)(s.code,{children:"NEXT VALUE FOR"})," expression specified in the SQL standard."]}),"\n",(0,t.jsxs)(s.li,{children:["The ",(0,t.jsx)(s.code,{children:"OWNED BY"})," clause is a Cloudberry Database extension."]}),"\n"]}),"\n",(0,t.jsx)(s.h2,{id:"see-also",children:"See also"}),"\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.a,{href:"/zh/docs/sql-stmts/alter-sequence",children:"ALTER SEQUENCE"}),", ",(0,t.jsx)(s.a,{href:"/zh/docs/sql-stmts/drop-sequence",children:"DROP SEQUENCE"})]})]})}function h(e={}){const{wrapper:s}={...(0,a.a)(),...e.components};return s?(0,t.jsx)(s,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},11151:(e,s,n)=>{n.d(s,{Z:()=>r,a:()=>c});var t=n(67294);const a={},i=t.createContext(a);function c(e){const s=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function r(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:c(e.components),t.createElement(i.Provider,{value:s},e.children)}}}]);