"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[4148],{15601:(e,i,s)=>{s.r(i),s.d(i,{assets:()=>l,contentTitle:()=>t,default:()=>h,frontMatter:()=>o,metadata:()=>c,toc:()=>d});var n=s(85893),r=s(11151);const o={title:"CREATE POLICY"},t="CREATE POLICY",c={id:"sql-stmts/create-policy",title:"CREATE POLICY",description:"Defines a new row-level security policy for a table.",source:"@site/docs/sql-stmts/create-policy.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/create-policy",permalink:"/zh/docs/sql-stmts/create-policy",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/create-policy.md",tags:[],version:"current",lastUpdatedBy:"Ed Espino",lastUpdatedAt:1732764009,formattedLastUpdatedAt:"2024\u5e7411\u670828\u65e5",frontMatter:{title:"CREATE POLICY"},sidebar:"docsbars",previous:{title:"CREATE OPERATOR",permalink:"/zh/docs/sql-stmts/create-operator"},next:{title:"CREATE PROCEDURE",permalink:"/zh/docs/sql-stmts/create-procedure"}},l={},d=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Per-command policies",id:"per-command-policies",level:2},{value:"Application of multiple policies",id:"application-of-multiple-policies",level:2},{value:"Notes",id:"notes",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function a(e){const i={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,r.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(i.h1,{id:"create-policy",children:"CREATE POLICY"}),"\n",(0,n.jsx)(i.p,{children:"Defines a new row-level security policy for a table."}),"\n",(0,n.jsx)(i.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,n.jsx)(i.pre,{children:(0,n.jsx)(i.code,{className:"language-sql",children:"CREATE POLICY <name> ON <table_name>\n    [ AS { PERMISSIVE | RESTRICTIVE } ]\n    [ FOR { ALL | SELECT | INSERT | UPDATE | DELETE } ]\n    [ TO { <role_name> | PUBLIC | CURRENT_USER | SESSION_USER } [, ...] ]\n    [ USING ( <using_expression> ) ]\n    [ WITH CHECK ( <check_expression> ) ]\n"})}),"\n",(0,n.jsx)(i.h2,{id:"description",children:"Description"}),"\n",(0,n.jsxs)(i.p,{children:["The ",(0,n.jsx)(i.code,{children:"CREATE POLICY"})," command defines a new row-level security policy for a table. Note that row-level security must be enabled on the table (using ",(0,n.jsx)(i.code,{children:"ALTER TABLE ... ENABLE ROW LEVEL SECURITY"}),") in order for Cloudberry Database to apply created policies."]}),"\n",(0,n.jsxs)(i.p,{children:["A policy grants the permission to select, insert, update, or delete rows that match the relevant policy expression. Existing table rows are checked against the expression specified in ",(0,n.jsx)(i.code,{children:"USING"}),", while new rows that would be created via ",(0,n.jsx)(i.code,{children:"INSERT"})," or ",(0,n.jsx)(i.code,{children:"UPDATE"})," are checked against the expression specified in ",(0,n.jsx)(i.code,{children:"WITH CHECK"}),". When a ",(0,n.jsx)(i.code,{children:"USING"})," expression returns true for a given row, then that row is visible to the user, while if false or null is returned then the row is not visible. When a ",(0,n.jsx)(i.code,{children:"WITH CHECK"})," expression returns true for a row, then that row is inserted or updated, while if false or null is returned then an error occurs."]}),"\n",(0,n.jsxs)(i.p,{children:["For ",(0,n.jsx)(i.code,{children:"INSERT"})," and ",(0,n.jsx)(i.code,{children:"UPDATE"})," statements, ",(0,n.jsx)(i.code,{children:"WITH CHECK"})," expressions are enforced before any actual data modifications are made, and before any other constraints."]}),"\n",(0,n.jsx)(i.p,{children:"Policy names are per-table. Therefore, one policy name can be used for many different tables and have a definition for each table which is appropriate to that table."}),"\n",(0,n.jsxs)(i.p,{children:["Policies can be applied for specific commands or for specific roles. The default for newly-created policies is that they apply for all commands and roles, unless otherwise specified. Multiple policies may apply to a single command; see below for more details. The table in ",(0,n.jsx)(i.a,{href:"#per-command-policies",children:"Per-Command Policies"})," summarizes how the different types of policies apply to specific commands."]}),"\n",(0,n.jsxs)(i.p,{children:["For policies that can have both ",(0,n.jsx)(i.code,{children:"USING"})," and ",(0,n.jsx)(i.code,{children:"WITH CHECK"})," expressions (",(0,n.jsx)(i.code,{children:"ALL"})," and ",(0,n.jsx)(i.code,{children:"UPDATE"}),"), if no ",(0,n.jsx)(i.code,{children:"WITH CHECK"})," expression is defined, then the ",(0,n.jsx)(i.code,{children:"USING"})," expression will be used both to determine which rows are visible (normal ",(0,n.jsx)(i.code,{children:"USING"})," case) and which new rows will be allowed to be added (",(0,n.jsx)(i.code,{children:"WITH CHECK"})," case)."]}),"\n",(0,n.jsx)(i.p,{children:'If row-level security is enabled for a table, but no applicable policies exist, a "default deny" policy is assumed, so that no rows will be visible or updatable.'}),"\n",(0,n.jsx)(i.h2,{id:"parameters",children:"Parameters"}),"\n",(0,n.jsx)(i.p,{children:(0,n.jsx)(i.strong,{children:(0,n.jsx)(i.code,{children:"name"})})}),"\n",(0,n.jsx)(i.p,{children:"The name of the policy to be created. This must be distinct from the name of any other policy defined for the table."}),"\n",(0,n.jsx)(i.p,{children:(0,n.jsx)(i.strong,{children:(0,n.jsx)(i.code,{children:"table_name"})})}),"\n",(0,n.jsx)(i.p,{children:"The name (optionally schema-qualified) of the table to which the policy applies."}),"\n",(0,n.jsx)(i.p,{children:(0,n.jsx)(i.strong,{children:(0,n.jsx)(i.code,{children:"PERMISSIVE"})})}),"\n",(0,n.jsxs)(i.p,{children:["Specify that the policy is to be created as a permissive policy. All permissive policies which are applicable to a given query will be combined together using the Boolean ",(0,n.jsx)(i.code,{children:"OR"})," operator. By creating permissive policies, administrators can add to the set of records which can be accessed. Policies are permissive by default."]}),"\n",(0,n.jsx)(i.p,{children:(0,n.jsx)(i.strong,{children:(0,n.jsx)(i.code,{children:"RESTRICTIVE"})})}),"\n",(0,n.jsxs)(i.p,{children:["Specify that the policy is to be created as a restrictive policy. All restrictive policies which are applicable to a given query will be combined together using the Boolean ",(0,n.jsx)(i.code,{children:"AND"})," operator. By creating restrictive policies, administrators can reduce the set of records which can be accessed as all restrictive policies must be passed for each record."]}),"\n",(0,n.jsx)(i.p,{children:"You must define at least one permissive policy to grant access to records before restrictive policies can be usefully used to reduce that access. If only restrictive policies exist, then no records will be accessible. When a mix of permissive and restrictive policies are present, a record is only accessible if at least one of the permissive policies passes, in addition to all the restrictive policies."}),"\n",(0,n.jsx)(i.p,{children:(0,n.jsx)(i.strong,{children:(0,n.jsx)(i.code,{children:"command"})})}),"\n",(0,n.jsxs)(i.p,{children:["The command to which the policy applies. Valid options are ",(0,n.jsx)(i.code,{children:"ALL"}),", ",(0,n.jsx)(i.code,{children:"SELECT"}),", ",(0,n.jsx)(i.code,{children:"INSERT"}),", ",(0,n.jsx)(i.code,{children:"UPDATE"}),", and ",(0,n.jsx)(i.code,{children:"DELETE"}),". ",(0,n.jsx)(i.code,{children:"ALL"})," is the default. See below for specifics regarding how these are applied."]}),"\n",(0,n.jsx)(i.p,{children:(0,n.jsx)(i.strong,{children:(0,n.jsx)(i.code,{children:"role_name"})})}),"\n",(0,n.jsxs)(i.p,{children:["The role(s) to which the policy is to be applied. The default is ",(0,n.jsx)(i.code,{children:"PUBLIC"}),", which will apply the policy to all roles."]}),"\n",(0,n.jsx)(i.p,{children:(0,n.jsx)(i.strong,{children:(0,n.jsx)(i.code,{children:"using_expression"})})}),"\n",(0,n.jsxs)(i.p,{children:["Any SQL conditional expression (returning ",(0,n.jsx)(i.code,{children:"boolean"}),"). The conditional expression cannot contain any aggregate or window functions. This expression will be added to queries that refer to the table if row-level security is enabled. Rows for which the expression returns true will be visible. Any rows for which the expression returns false or null will not be visible to the user (in a ",(0,n.jsx)(i.code,{children:"SELECT"}),"), and will not be available for modification (in an ",(0,n.jsx)(i.code,{children:"UPDATE"})," or ",(0,n.jsx)(i.code,{children:"DELETE"}),"). Such rows are silently suppressed; no error is reported."]}),"\n",(0,n.jsx)(i.p,{children:(0,n.jsx)(i.strong,{children:(0,n.jsx)(i.code,{children:"check_expression"})})}),"\n",(0,n.jsxs)(i.p,{children:["Any SQL conditional expression (returning ",(0,n.jsx)(i.code,{children:"boolean"}),"). The conditional expression cannot contain any aggregate or window functions. This expression will be used in ",(0,n.jsx)(i.code,{children:"INSERT"})," and ",(0,n.jsx)(i.code,{children:"UPDATE"})," queries against the table if row-level security is enabled. Only rows for which the expression evaluates to true will be allowed. An error will be thrown if the expression evaluates to false or null for any of the records inserted or any of the records that result from the update. Note that the check_expression is evaluated against the proposed new contents of the row, not the original contents."]}),"\n",(0,n.jsx)(i.h2,{id:"per-command-policies",children:"Per-command policies"}),"\n",(0,n.jsx)(i.p,{children:(0,n.jsx)(i.strong,{children:(0,n.jsx)(i.code,{children:"ALL"})})}),"\n",(0,n.jsxs)(i.p,{children:["Using ",(0,n.jsx)(i.code,{children:"ALL"})," for a policy means that it will apply to all commands, regardless of the type of command. If an ",(0,n.jsx)(i.code,{children:"ALL"})," policy exists and more specific policies exist, then both the ",(0,n.jsx)(i.code,{children:"ALL"})," policy and the more specific policy (or policies) will be applied. Additionally, ",(0,n.jsx)(i.code,{children:"ALL"})," policies will be applied to both the selection side of a query and the modification side, using the ",(0,n.jsx)(i.code,{children:"USING"})," expression for both cases if only a ",(0,n.jsx)(i.code,{children:"USING"})," expression has been defined."]}),"\n",(0,n.jsxs)(i.p,{children:["As an example, if an ",(0,n.jsx)(i.code,{children:"UPDATE"})," is issued, then the ",(0,n.jsx)(i.code,{children:"ALL"})," policy will be applicable both to what the ",(0,n.jsx)(i.code,{children:"UPDATE"})," will be able to select as rows to be updated (applying the ",(0,n.jsx)(i.code,{children:"USING"})," expression), and to the resulting updated rows, to check if they are permitted to be added to the table (applying the ",(0,n.jsx)(i.code,{children:"WITH CHECK"})," expression, if defined, and the ",(0,n.jsx)(i.code,{children:"USING"})," expression otherwise). If an ",(0,n.jsx)(i.code,{children:"INSERT"})," or ",(0,n.jsx)(i.code,{children:"UPDATE"})," command attempts to add rows to the table that do not pass the ",(0,n.jsx)(i.code,{children:"ALL"})," policy's ",(0,n.jsx)(i.code,{children:"WITH CHECK"})," expression, the entire command will be aborted."]}),"\n",(0,n.jsx)(i.p,{children:(0,n.jsx)(i.strong,{children:(0,n.jsx)(i.code,{children:"SELECT"})})}),"\n",(0,n.jsxs)(i.p,{children:["Using ",(0,n.jsx)(i.code,{children:"SELECT"})," for a policy means that it will apply to ",(0,n.jsx)(i.code,{children:"SELECT"})," queries and whenever ",(0,n.jsx)(i.code,{children:"SELECT"})," permissions are required on the relation that the policy is defined for. The result is that only those records from the relation that pass the ",(0,n.jsx)(i.code,{children:"SELECT"})," policy will be returned during a ",(0,n.jsx)(i.code,{children:"SELECT"})," query, and that queries that require ",(0,n.jsx)(i.code,{children:"SELECT"})," permissions, such as ",(0,n.jsx)(i.code,{children:"UPDATE"}),", will also only see those records that are allowed by the ",(0,n.jsx)(i.code,{children:"SELECT"})," policy. A ",(0,n.jsx)(i.code,{children:"SELECT"})," policy cannot have a ",(0,n.jsx)(i.code,{children:"WITH CHECK"})," expression, as it only applies in cases where records are being retrieved from the relation."]}),"\n",(0,n.jsx)(i.p,{children:(0,n.jsx)(i.strong,{children:(0,n.jsx)(i.code,{children:"INSERT"})})}),"\n",(0,n.jsxs)(i.p,{children:["Using ",(0,n.jsx)(i.code,{children:"INSERT"})," for a policy means that it will apply to ",(0,n.jsx)(i.code,{children:"INSERT"})," commands. Rows being inserted that do not pass this policy will result in a policy violation error, and the entire ",(0,n.jsx)(i.code,{children:"INSERT"})," command will be aborted. An ",(0,n.jsx)(i.code,{children:"INSERT"})," policy cannot have a ",(0,n.jsx)(i.code,{children:"USING"})," expression, as it only applies in cases where records are being added to the relation."]}),"\n",(0,n.jsxs)(i.p,{children:["Note that ",(0,n.jsx)(i.code,{children:"INSERT"})," with ",(0,n.jsx)(i.code,{children:"ON CONFLICT DO UPDATE"})," checks ",(0,n.jsx)(i.code,{children:"INSERT"})," policies' ",(0,n.jsx)(i.code,{children:"WITH CHECK"})," expressions only for rows appended to the relation by the ",(0,n.jsx)(i.code,{children:"INSERT"})," path."]}),"\n",(0,n.jsx)(i.p,{children:(0,n.jsx)(i.strong,{children:(0,n.jsx)(i.code,{children:"UPDATE"})})}),"\n",(0,n.jsxs)(i.p,{children:["Using ",(0,n.jsx)(i.code,{children:"UPDATE"})," for a policy means that it will apply to ",(0,n.jsx)(i.code,{children:"UPDATE"}),", ",(0,n.jsx)(i.code,{children:"SELECT FOR UPDATE"}),", and ",(0,n.jsx)(i.code,{children:"SELECT FOR SHARE"})," commands, as well as auxiliary ",(0,n.jsx)(i.code,{children:"ON CONFLICT DO UPDATE"})," clauses of ",(0,n.jsx)(i.code,{children:"INSERT"})," commands. Since ",(0,n.jsx)(i.code,{children:"UPDATE"})," involves pulling an existing record and replacing it with a new modified record, ",(0,n.jsx)(i.code,{children:"UPDATE"})," policies accept both a ",(0,n.jsx)(i.code,{children:"USING"})," expression and a ",(0,n.jsx)(i.code,{children:"WITH CHECK"})," expression. The ",(0,n.jsx)(i.code,{children:"USING"})," expression determines which records the ",(0,n.jsx)(i.code,{children:"UPDATE"})," command will see to operate against, while the ",(0,n.jsx)(i.code,{children:"WITH CHECK"})," expression defines which modified rows are allowed to be stored back into the relation."]}),"\n",(0,n.jsxs)(i.p,{children:["Any rows whose updated values do not pass the ",(0,n.jsx)(i.code,{children:"WITH CHECK"})," expression will cause an error, and the entire command will be aborted. If only a ",(0,n.jsx)(i.code,{children:"USING"})," clause is specified, then that clause will be used for both ",(0,n.jsx)(i.code,{children:"USING"})," and ",(0,n.jsx)(i.code,{children:"WITH CHECK"})," cases."]}),"\n",(0,n.jsxs)(i.p,{children:["Typically an ",(0,n.jsx)(i.code,{children:"UPDATE"})," command also needs to read data from columns in the relation being updated (e.g., in a ",(0,n.jsx)(i.code,{children:"WHERE"})," clause or a ",(0,n.jsx)(i.code,{children:"RETURNING"})," clause, or in an expression on the right hand side of the ",(0,n.jsx)(i.code,{children:"SET"})," clause). In this case, ",(0,n.jsx)(i.code,{children:"SELECT"})," rights are also required on the relation being updated, and the appropriate ",(0,n.jsx)(i.code,{children:"SELECT"})," or ",(0,n.jsx)(i.code,{children:"ALL"})," policies will be applied in addition to the ",(0,n.jsx)(i.code,{children:"UPDATE"})," policies. Thus the user must have access to the row(s) being updated through a ",(0,n.jsx)(i.code,{children:"SELECT"})," or ",(0,n.jsx)(i.code,{children:"ALL"})," policy in addition to being granted permission to update the row(s) via an ",(0,n.jsx)(i.code,{children:"UPDATE"})," or ",(0,n.jsx)(i.code,{children:"ALL"})," policy."]}),"\n",(0,n.jsxs)(i.p,{children:["When an ",(0,n.jsx)(i.code,{children:"INSERT"})," command has an auxiliary ",(0,n.jsx)(i.code,{children:"ON CONFLICT DO UPDATE"})," clause, if the ",(0,n.jsx)(i.code,{children:"UPDATE"})," path is taken, the row to be updated is first checked against the ",(0,n.jsx)(i.code,{children:"USING"})," expressions of any ",(0,n.jsx)(i.code,{children:"UPDATE"})," policies, and then the new updated row is checked against the ",(0,n.jsx)(i.code,{children:"WITH CHECK"})," expressions. Note, however, that unlike a standalone ",(0,n.jsx)(i.code,{children:"UPDATE"})," command, if the existing row does not pass the ",(0,n.jsx)(i.code,{children:"USING"})," expressions, an error will be thrown (the ",(0,n.jsx)(i.code,{children:"UPDATE"})," path will never be silently avoided)."]}),"\n",(0,n.jsx)(i.p,{children:(0,n.jsx)(i.strong,{children:(0,n.jsx)(i.code,{children:"DELETE"})})}),"\n",(0,n.jsxs)(i.p,{children:["Using ",(0,n.jsx)(i.code,{children:"DELETE"})," for a policy means that it will apply to ",(0,n.jsx)(i.code,{children:"DELETE"})," commands. Only rows that pass this policy will be seen by a ",(0,n.jsx)(i.code,{children:"DELETE"})," command. There can be rows that are visible through a ",(0,n.jsx)(i.code,{children:"SELECT"})," that are not available for deletion, if they do not pass the ",(0,n.jsx)(i.code,{children:"USING"})," expression for the ",(0,n.jsx)(i.code,{children:"DELETE"})," policy."]}),"\n",(0,n.jsxs)(i.p,{children:["In most cases a ",(0,n.jsx)(i.code,{children:"DELETE"})," command also needs to read data from columns in the relation that it is deleting from (e.g., in a ",(0,n.jsx)(i.code,{children:"WHERE"})," clause or a ",(0,n.jsx)(i.code,{children:"RETURNING"})," clause). In this case, ",(0,n.jsx)(i.code,{children:"SELECT"})," rights are also required on the relation, and the appropriate ",(0,n.jsx)(i.code,{children:"SELECT"})," or ",(0,n.jsx)(i.code,{children:"ALL"})," policies will be applied in addition to the ",(0,n.jsx)(i.code,{children:"DELETE"})," policies. Thus the user must have access to the row(s) being deleted through a ",(0,n.jsx)(i.code,{children:"SELECT"})," or ",(0,n.jsx)(i.code,{children:"ALL"})," policy in addition to being granted permission to delete the row(s) via a ",(0,n.jsx)(i.code,{children:"DELETE"})," or ",(0,n.jsx)(i.code,{children:"ALL"})," policy."]}),"\n",(0,n.jsxs)(i.p,{children:["A ",(0,n.jsx)(i.code,{children:"DELETE"})," policy cannot have a ",(0,n.jsx)(i.code,{children:"WITH CHECK"})," expression, as it only applies in cases where records are being deleted from the relation, so that there is no new row to check."]}),"\n",(0,n.jsxs)(i.table,{children:[(0,n.jsx)(i.thead,{children:(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.th,{children:"Command"}),(0,n.jsx)(i.th,{children:(0,n.jsx)(i.code,{children:"SELECT/ALL policy, USING expression"})}),(0,n.jsx)(i.th,{children:(0,n.jsx)(i.code,{children:"INSERT/ALL policy, WITH CHECK expression"})}),(0,n.jsx)(i.th,{children:(0,n.jsx)(i.code,{children:"UPDATE/ALL policy, USING expression"})}),(0,n.jsx)(i.th,{children:(0,n.jsx)(i.code,{children:"UPDATE/ALL policy, WITH CHECK expression"})}),(0,n.jsx)(i.th,{children:(0,n.jsx)(i.code,{children:"DELETE/ALL policy, USING expression"})})]})}),(0,n.jsxs)(i.tbody,{children:[(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:"SELECT"}),(0,n.jsx)(i.td,{children:"Existing row"}),(0,n.jsx)(i.td,{children:"--"}),(0,n.jsx)(i.td,{children:"--"}),(0,n.jsx)(i.td,{children:"--"}),(0,n.jsx)(i.td,{children:"--"})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:"SELECT FOR UPDATE/SHARE"}),(0,n.jsx)(i.td,{children:"Existing row"}),(0,n.jsx)(i.td,{children:"--"}),(0,n.jsx)(i.td,{children:"Existing row"}),(0,n.jsx)(i.td,{children:"--"}),(0,n.jsx)(i.td,{children:"--"})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:"INSERT"}),(0,n.jsx)(i.td,{children:"--"}),(0,n.jsx)(i.td,{children:"New row"}),(0,n.jsx)(i.td,{children:"--"}),(0,n.jsx)(i.td,{children:"--"}),(0,n.jsx)(i.td,{children:"--"})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:"INSERT ... RETURNING"}),(0,n.jsxs)(i.td,{children:["New row",(0,n.jsx)("sup",{children:"[a]"})]}),(0,n.jsx)(i.td,{children:"New row"}),(0,n.jsx)(i.td,{children:"--"}),(0,n.jsx)(i.td,{children:"--"}),(0,n.jsx)(i.td,{children:"--"})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:"UPDATE"}),(0,n.jsxs)(i.td,{children:["Existing and new rows",(0,n.jsx)("sup",{children:"[a]"})]}),(0,n.jsx)(i.td,{children:"--"}),(0,n.jsx)(i.td,{children:"Existing row"}),(0,n.jsx)(i.td,{children:"New row"}),(0,n.jsx)(i.td,{children:"--"})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:"DELETE"}),(0,n.jsxs)(i.td,{children:["Existing row",(0,n.jsx)("sup",{children:"[a]"})]}),(0,n.jsx)(i.td,{children:"--"}),(0,n.jsx)(i.td,{children:"--"}),(0,n.jsx)(i.td,{children:"--"}),(0,n.jsx)(i.td,{children:"Existing row"})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:"ON CONFLICT DO UPDATE"}),(0,n.jsx)(i.td,{children:"Existing and new rows"}),(0,n.jsx)(i.td,{children:"--"}),(0,n.jsx)(i.td,{children:"Existing row"}),(0,n.jsx)(i.td,{children:"New row"}),(0,n.jsx)(i.td,{children:"--"})]})]})]}),"\n",(0,n.jsxs)(i.p,{children:[(0,n.jsx)("sup",{children:"[a]"}),"If read access is required to the existing or new row (for example, a ",(0,n.jsx)(i.code,{children:"WHERE"})," or ",(0,n.jsx)(i.code,{children:"RETURNING"})," clause that refers to columns from the relation)."]}),"\n",(0,n.jsx)(i.h2,{id:"application-of-multiple-policies",children:"Application of multiple policies"}),"\n",(0,n.jsxs)(i.p,{children:["When multiple policies of different command types apply to the same command (for example, ",(0,n.jsx)(i.code,{children:"SELECT"})," and ",(0,n.jsx)(i.code,{children:"UPDATE"})," policies applied to an ",(0,n.jsx)(i.code,{children:"UPDATE"})," command), then the user must have both types of permissions (for example, permission to select rows from the relation as well as permission to update them). Thus the expressions for one type of policy are combined with the expressions for the other type of policy using the ",(0,n.jsx)(i.code,{children:"AND"})," operator."]}),"\n",(0,n.jsxs)(i.p,{children:["When multiple policies of the same command type apply to the same command, then there must be at least one ",(0,n.jsx)(i.code,{children:"PERMISSIVE"})," policy granting access to the relation, and all of the ",(0,n.jsx)(i.code,{children:"RESTRICTIVE"})," policies must pass. Thus all the ",(0,n.jsx)(i.code,{children:"PERMISSIVE"})," policy expressions are combined using ",(0,n.jsx)(i.code,{children:"OR"}),", all the ",(0,n.jsx)(i.code,{children:"RESTRICTIVE"})," policy expressions are combined using ",(0,n.jsx)(i.code,{children:"AND"}),", and the results are combined using ",(0,n.jsx)(i.code,{children:"AND"}),". If there are no ",(0,n.jsx)(i.code,{children:"PERMISSIVE"})," policies, then access is denied."]}),"\n",(0,n.jsxs)(i.p,{children:["Note that, for the purposes of combining multiple policies, ",(0,n.jsx)(i.code,{children:"ALL"})," policies are treated as having the same type as whichever other type of policy is being applied."]}),"\n",(0,n.jsxs)(i.p,{children:["For example, in an ",(0,n.jsx)(i.code,{children:"UPDATE"})," command requiring both ",(0,n.jsx)(i.code,{children:"SELECT"})," and ",(0,n.jsx)(i.code,{children:"UPDATE"})," permissions, if there are multiple applicable policies of each type, they will be combined as follows:"]}),"\n",(0,n.jsx)(i.pre,{children:(0,n.jsx)(i.code,{className:"language-sql",children:"expression from RESTRICTIVE SELECT/ALL policy 1\nAND\nexpression from RESTRICTIVE SELECT/ALL policy 2\nAND\n...\nAND\n(\n  expression from PERMISSIVE SELECT/ALL policy 1\n  OR\n  expression from PERMISSIVE SELECT/ALL policy 2\n  OR\n  ...\n)\nAND\nexpression from RESTRICTIVE UPDATE/ALL policy 1\nAND\nexpression from RESTRICTIVE UPDATE/ALL policy 2\nAND\n...\nAND\n(\n  expression from PERMISSIVE UPDATE/ALL policy 1\n  OR\n  expression from PERMISSIVE UPDATE/ALL policy 2\n  OR\n  ...\n)\n"})}),"\n",(0,n.jsx)(i.h2,{id:"notes",children:"Notes"}),"\n",(0,n.jsx)(i.p,{children:"You must be the owner of a table to create or change policies for it."}),"\n",(0,n.jsx)(i.p,{children:"While policies will be applied for explicit queries against tables in the database, they are not applied when the system is performing internal referential integrity checks or validating constraints. This means there are indirect ways to determine that a given value exists. An example of this is attempting to insert a duplicate value into a column that is a primary key or has a unique constraint. If the insert fails then the user can infer that the value already exists. (This example assumes that the user is permitted by policy to insert records which they are not allowed to see.) Another example is where a user is allowed to insert into a table which references another, otherwise hidden table. Existence can be determined by the user inserting values into the referencing table, where success would indicate that the value exists in the referenced table. These issues can be addressed by carefully crafting policies to prevent users from being able to insert, delete, or update records at all which might possibly indicate a value they are not otherwise able to see, or by using generated values (e.g., surrogate keys) instead of keys with external meanings."}),"\n",(0,n.jsxs)(i.p,{children:["Generally, the system will enforce filter conditions imposed using security policies prior to qualifications that appear in user queries, in order to prevent inadvertent exposure of the protected data to user-defined functions which might not be trustworthy. However, functions and operators marked by the system (or the system administrator) as ",(0,n.jsx)(i.code,{children:"LEAKPROOF"})," may be evaluated before policy expressions, as they are assumed to be trustworthy."]}),"\n",(0,n.jsx)(i.p,{children:"Since policy expressions are added to the user's query directly, they will be run with the rights of the user running the overall query. Therefore, users who are using a given policy must be able to access any tables or functions referenced in the expression or they will simply receive a permission denied error when attempting to query the table that has row-level security enabled. This does not change how views work, however. As with normal queries and views, permission checks and policies for the tables which are referenced by a view will use the view owner's rights and any policies which apply to the view owner."}),"\n",(0,n.jsx)(i.p,{children:"Refer to About Configuring Row-Level Security Policies for more information and practical examples."}),"\n",(0,n.jsx)(i.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,n.jsxs)(i.p,{children:[(0,n.jsx)(i.code,{children:"CREATE POLICY"})," is a Cloudberry Database extension to the SQL standard."]}),"\n",(0,n.jsx)(i.h2,{id:"see-also",children:"See also"}),"\n",(0,n.jsxs)(i.p,{children:[(0,n.jsx)(i.a,{href:"/zh/docs/sql-stmts/alter-policy",children:"ALTER POLICY"}),", ",(0,n.jsx)(i.a,{href:"/zh/docs/sql-stmts/drop-policy",children:"DROP POLICY"}),", ",(0,n.jsx)(i.a,{href:"/zh/docs/sql-stmts/alter-table",children:"ALTER TABLE"})]})]})}function h(e={}){const{wrapper:i}={...(0,r.a)(),...e.components};return i?(0,n.jsx)(i,{...e,children:(0,n.jsx)(a,{...e})}):a(e)}},11151:(e,i,s)=>{s.d(i,{Z:()=>c,a:()=>t});var n=s(67294);const r={},o=n.createContext(r);function t(e){const i=n.useContext(o);return n.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function c(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:t(e.components),n.createElement(o.Provider,{value:i},e.children)}}}]);