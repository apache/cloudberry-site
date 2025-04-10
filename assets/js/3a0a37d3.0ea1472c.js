"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[2253],{29802:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>h,frontMatter:()=>s,metadata:()=>a,toc:()=>d});var n=r(85893),i=r(11151);const s={title:"CREATE TRIGGER"},o="CREATE TRIGGER",a={id:"sql-stmts/create-trigger",title:"CREATE TRIGGER",description:"Defines a new trigger. User-defined triggers are not supported in Apache Cloudberry.",source:"@site/docs/sql-stmts/create-trigger.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/create-trigger",permalink:"/docs/sql-stmts/create-trigger",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/create-trigger.md",tags:[],version:"current",lastUpdatedBy:"Dianjin Wang",lastUpdatedAt:1744271659,formattedLastUpdatedAt:"Apr 10, 2025",frontMatter:{title:"CREATE TRIGGER"},sidebar:"docsbars",previous:{title:"CREATE TRANSFORM",permalink:"/docs/sql-stmts/create-transform"},next:{title:"CREATE TYPE",permalink:"/docs/sql-stmts/create-type"}},c={},d=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Notes",id:"notes",level:2},{value:"Examples",id:"examples",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function l(e){const t={a:"a",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h1,{id:"create-trigger",children:"CREATE TRIGGER"}),"\n",(0,n.jsx)(t.p,{children:"Defines a new trigger. User-defined triggers are not supported in Apache Cloudberry."}),"\n",(0,n.jsx)(t.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-sql",children:"CREATE TRIGGER <name> {BEFORE | AFTER} {<event> [OR ...]}\n\xa0\xa0\xa0\xa0\xa0\xa0\xa0ON <table> [ FOR [EACH] {ROW | STATEMENT} ]\n\xa0\xa0\xa0\xa0\xa0\xa0\xa0EXECUTE PROCEDURE <funcname> ( <arguments> )\n"})}),"\n",(0,n.jsx)(t.h2,{id:"description",children:"Description"}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.code,{children:"CREATE TRIGGER"})," creates a new trigger. The trigger will be associated with the specified table and will run the specified function when certain events occur. If multiple triggers of the same kind are defined for the same event, they will be fired in alphabetical order by name."]}),"\n",(0,n.jsxs)(t.blockquote,{children:["\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.em,{children:"Important"})," Due to the distributed nature of a Apache Cloudberry system, the use of triggers on data is very limited in Apache Cloudberry. The function used in the trigger must be ",(0,n.jsx)(t.code,{children:"IMMUTABLE"}),", meaning it cannot use information not directly present in its argument list. The function specified in the trigger also cannot run any SQL or modify distributed database objects in any way. Given that triggers are most often used to alter tables (for example, update these other rows when this row is updated), these limitations offer very little practical use of triggers in Apache Cloudberry. For that reason, Apache Cloudberry does not support the use of user-defined triggers in Apache Cloudberry. Triggers cannot be used on append-optimized tables.\nEvent Triggers, which capture only DDL events, ",(0,n.jsx)(t.em,{children:"are"})," supported in Apache Cloudberry. See the PostgreSQL documentation for ",(0,n.jsx)(t.a,{href:"https://www.postgresql.org/docs/12/event-triggers.html",children:"Event Triggers"})," for additional information."]}),"\n"]}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.a,{href:"/docs/sql-stmts/select",children:"SELECT"})," does not modify any rows so you can not create ",(0,n.jsx)(t.code,{children:"SELECT"})," triggers. Rules and views are more appropriate in such cases."]}),"\n",(0,n.jsx)(t.h2,{id:"parameters",children:"Parameters"}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.strong,{children:(0,n.jsx)(t.code,{children:"name"})})}),"\n",(0,n.jsx)(t.p,{children:"The name to give the new trigger. This must be distinct from the name of any other trigger for the same table."}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.strong,{children:(0,n.jsx)(t.code,{children:"BEFORE AFTER"})})}),"\n",(0,n.jsxs)(t.p,{children:["Determines whether the function is called before or after the event. If the trigger fires before the event, the trigger may skip the operation for the current row, or change the row being inserted (for ",(0,n.jsx)(t.code,{children:"INSERT"})," and ",(0,n.jsx)(t.code,{children:"UPDATE"})," operations only). If the trigger fires after the event, all changes, including the last insertion, update, or deletion, are visible to the trigger."]}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.strong,{children:(0,n.jsx)(t.code,{children:"event"})})}),"\n",(0,n.jsxs)(t.p,{children:["Specifies the event that will fire the trigger (",(0,n.jsx)(t.code,{children:"INSERT"}),", ",(0,n.jsx)(t.code,{children:"UPDATE"}),", or ",(0,n.jsx)(t.code,{children:"DELETE"}),"). Multiple events can be specified using OR."]}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.strong,{children:(0,n.jsx)(t.code,{children:"table"})})}),"\n",(0,n.jsx)(t.p,{children:"The name (optionally schema-qualified) of the table the trigger is for."}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.strong,{children:(0,n.jsx)(t.code,{children:"FOR EACH ROW"})}),(0,n.jsx)("br",{}),"\n",(0,n.jsx)(t.strong,{children:(0,n.jsx)(t.code,{children:"FOR EACH STATEMENT"})})]}),"\n",(0,n.jsxs)(t.p,{children:["This specifies whether the trigger procedure should be fired once for every row affected by the trigger event, or just once per SQL statement. If neither is specified, ",(0,n.jsx)(t.code,{children:"FOR EACH STATEMENT"})," is the default. A trigger that is marked ",(0,n.jsx)(t.code,{children:"FOR EACH ROW"})," is called once for every row that the operation modifies. In contrast, a trigger that is marked ",(0,n.jsx)(t.code,{children:"FOR EACH STATEMENT"})," only runs once for any given operation, regardless of how many rows it modifies."]}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.strong,{children:(0,n.jsx)(t.code,{children:"funcname"})})}),"\n",(0,n.jsxs)(t.p,{children:["A user-supplied function that is declared as ",(0,n.jsx)(t.code,{children:"IMMUTABLE"}),", taking no arguments, and returning type ",(0,n.jsx)(t.code,{children:"trigger"}),", which is run when the trigger fires. This function must not run SQL or modify the database in any way."]}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.strong,{children:(0,n.jsx)(t.code,{children:"arguments"})})}),"\n",(0,n.jsx)(t.p,{children:"An optional comma-separated list of arguments to be provided to the function when the trigger is run. The arguments are literal string constants. Simple names and numeric constants may be written here, too, but they will all be converted to strings. Please check the description of the implementation language of the trigger function about how the trigger arguments are accessible within the function; it may be different from normal function arguments."}),"\n",(0,n.jsx)(t.h2,{id:"notes",children:"Notes"}),"\n",(0,n.jsxs)(t.p,{children:["To create a trigger on a table, the user must have the ",(0,n.jsx)(t.code,{children:"TRIGGER"})," privilege on the table."]}),"\n",(0,n.jsx)(t.h2,{id:"examples",children:"Examples"}),"\n",(0,n.jsx)(t.p,{children:"Declare the trigger function and then a trigger:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-sql",children:"CREATE FUNCTION sendmail() RETURNS trigger AS \n'$GPHOME/lib/emailtrig.so' LANGUAGE C IMMUTABLE;\n\nCREATE TRIGGER t_sendmail AFTER INSERT OR UPDATE OR DELETE \nON mytable FOR EACH STATEMENT EXECUTE PROCEDURE sendmail();\n"})}),"\n",(0,n.jsx)(t.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,n.jsxs)(t.p,{children:["The ",(0,n.jsx)(t.code,{children:"CREATE TRIGGER"})," statement in Apache Cloudberry implements a subset of the SQL standard. The following functionality is currently missing:"]}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:"Apache Cloudberry has strict limitations on the function that is called by a trigger, which makes the use of triggers very limited in Apache Cloudberry. For this reason, triggers are not officially supported in Apache Cloudberry."}),"\n",(0,n.jsxs)(t.li,{children:["SQL allows triggers to fire on updates to specific columns (e.g., ",(0,n.jsx)(t.code,{children:"AFTER UPDATE OF col1, col2"}),")."]}),"\n",(0,n.jsxs)(t.li,{children:["SQL allows you to define aliases for the 'old' and 'new' rows or tables for use in the definition of the triggered action (e.g., ",(0,n.jsx)(t.code,{children:"CREATE TRIGGER ... ON tablename REFERENCING OLD ROW AS somename NEW ROW AS othername ..."}),"). Since Apache Cloudberry allows trigger procedures to be written in any number of user-defined languages, access to the data is handled in a language-specific way."]}),"\n",(0,n.jsxs)(t.li,{children:["Apache Cloudberry only allows the execution of a user-defined function for the triggered action. The standard allows the execution of a number of other SQL commands, such as ",(0,n.jsx)(t.code,{children:"CREATE TABLE"})," as the triggered action. This limitation is not hard to work around by creating a user-defined function that runs the desired commands."]}),"\n",(0,n.jsx)(t.li,{children:"SQL specifies that multiple triggers should be fired in time-of-creation order. Apache Cloudberry uses name order, which was judged to be more convenient."}),"\n",(0,n.jsxs)(t.li,{children:["SQL specifies that ",(0,n.jsx)(t.code,{children:"BEFORE DELETE"})," triggers on cascaded deletes fire after the cascaded ",(0,n.jsx)(t.code,{children:"DELETE"})," completes. The Apache Cloudberry behavior is for ",(0,n.jsx)(t.code,{children:"BEFORE DELETE"})," to always fire before the delete action, even a cascading one. This is considered more consistent."]}),"\n",(0,n.jsxs)(t.li,{children:["The ability to specify multiple actions for a single trigger using ",(0,n.jsx)(t.code,{children:"OR"})," is a Apache Cloudberry extension of the SQL standard."]}),"\n"]}),"\n",(0,n.jsx)(t.h2,{id:"see-also",children:"See also"}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.a,{href:"/docs/sql-stmts/create-function",children:"CREATE FUNCTION"}),", ",(0,n.jsx)(t.a,{href:"/docs/sql-stmts/alter-trigger",children:"ALTER TRIGGER"}),", ",(0,n.jsx)(t.a,{href:"/docs/sql-stmts/drop-trigger",children:"DROP TRIGGER"}),", ",(0,n.jsx)(t.a,{href:"/docs/sql-stmts/create-rule",children:"CREATE RULE"})]})]})}function h(e={}){const{wrapper:t}={...(0,i.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(l,{...e})}):l(e)}},11151:(e,t,r)=>{r.d(t,{Z:()=>a,a:()=>o});var n=r(67294);const i={},s=n.createContext(i);function o(e){const t=n.useContext(s);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),n.createElement(s.Provider,{value:t},e.children)}}}]);