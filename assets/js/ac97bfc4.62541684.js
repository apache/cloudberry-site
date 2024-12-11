"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[178],{9181:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>d,contentTitle:()=>o,default:()=>h,frontMatter:()=>a,metadata:()=>r,toc:()=>c});var t=s(85893),i=s(11151);const a={title:"ALTER DOMAIN"},o="ALTER DOMAIN",r={id:"sql-stmts/alter-domain",title:"ALTER DOMAIN",description:"Changes the definition of a domain.",source:"@site/docs/sql-stmts/alter-domain.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/alter-domain",permalink:"/docs/sql-stmts/alter-domain",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/alter-domain.md",tags:[],version:"current",lastUpdatedBy:"Dianjin Wang",lastUpdatedAt:1733912691,formattedLastUpdatedAt:"Dec 11, 2024",frontMatter:{title:"ALTER DOMAIN"},sidebar:"docsbars",previous:{title:"ALTER DEFAULT PRIVILEGES",permalink:"/docs/sql-stmts/alter-default-privileges"},next:{title:"ALTER EXTENSION",permalink:"/docs/sql-stmts/alter-extension"}},d={},c=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Notes",id:"notes",level:2},{value:"Examples",id:"examples",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function l(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"alter-domain",children:"ALTER DOMAIN"}),"\n",(0,t.jsx)(n.p,{children:"Changes the definition of a domain."}),"\n",(0,t.jsx)(n.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sql",children:"ALTER DOMAIN <name> { SET DEFAULT <expression> | DROP DEFAULT }\n\nALTER DOMAIN <name> { SET | DROP } NOT NULL\n\nALTER DOMAIN <name> ADD <domain_constraint> [ NOT VALID ]\n\nALTER DOMAIN <name> DROP CONSTRAINT [ IF EXISTS ] <constraint_name> [RESTRICT | CASCADE]\n\nALTER DOMAIN <name> RENAME CONSTRAINT <constraint_name> TO <new_constraint_name>\n\nALTER DOMAIN <name> VALIDATE CONSTRAINT <constraint_name>\n  \nALTER DOMAIN <name> OWNER TO { <new_owner> | CURRENT_USER | SESSION_USER }\n  \nALTER DOMAIN <name> RENAME TO <new_name>\n\nALTER DOMAIN <name> SET SCHEMA <new_schema>\n"})}),"\n",(0,t.jsx)(n.h2,{id:"description",children:"Description"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"ALTER DOMAIN"})," changes the definition of an existing domain. There are several sub-forms:"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"SET/DROP DEFAULT"})," \u2014 These forms set or remove the default value for a domain. Note that defaults only apply to subsequent ",(0,t.jsx)(n.code,{children:"INSERT"})," commands. They do not affect rows already in a table using the domain."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"SET/DROP NOT NULL"})," \u2014 These forms change whether a domain is marked to allow NULL values or to reject NULL values. You may only ",(0,t.jsx)(n.code,{children:"SET NOT NULL"})," when the columns using the domain contain no null values."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"ADD domain_constraint [ NOT VALID ]"})," \u2014 This form adds a new constraint to a domain using the same syntax as ",(0,t.jsx)(n.a,{href:"/docs/sql-stmts/create-domain",children:"CREATE DOMAIN"}),". When a new constraint is added to a domain, all columns using that domain will be checked against the newly-added constraint. These checks can be suppressed by adding the new constraint using the ",(0,t.jsx)(n.code,{children:"NOT VALID"})," option; the constraint can later be made valid using ",(0,t.jsx)(n.code,{children:"ALTER DOMAIN ... VALIDATE CONSTRAINT"}),". Newly inserted or updated rows are always checked against all constraints, even those marked ",(0,t.jsx)(n.code,{children:"NOT VALID"}),". ",(0,t.jsx)(n.code,{children:"NOT VALID"})," is only accepted for ",(0,t.jsx)(n.code,{children:"CHECK"})," constraints."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"DROP CONSTRAINT [ IF EXISTS ]"})," \u2014 This form drops constraints on a domain. If ",(0,t.jsx)(n.code,{children:"IF EXISTS"})," is specified and the constraint does not exist, no error is thrown. In this case a notice is issued instead."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"RENAME CONSTRAINT"})," \u2014 This form changes the name of a constraint on a domain."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"VALIDATE CONSTRAINT"})," \u2014 This form validates a constraint previously added as ",(0,t.jsx)(n.code,{children:"NOT VALID"}),", that is, it verifies that all values in table columns of the domain satisfy the specified constraint."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"OWNER"})," \u2014 This form changes the owner of the domain to the specified user."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"RENAME"})," \u2014 This form changes the name of the domain."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"SET SCHEMA"})," \u2014 This form changes the schema of the domain. Any constraints associated with the domain are moved into the new schema as well."]}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["You must own the domain to use ",(0,t.jsx)(n.code,{children:"ALTER DOMAIN"}),". To change the schema of a domain, you must also have ",(0,t.jsx)(n.code,{children:"CREATE"})," privilege on the new schema. To alter the owner, you must also be a direct or indirect member of the new owning role, and that role must have ",(0,t.jsx)(n.code,{children:"CREATE"})," privilege on the domain's schema. (These restrictions enforce that altering the owner does not do anything you could not do by dropping and recreating the domain. However, a superuser can alter ownership of any domain anyway.)"]}),"\n",(0,t.jsx)(n.h2,{id:"parameters",children:"Parameters"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"name"})})}),"\n",(0,t.jsx)(n.p,{children:"The name (optionally schema-qualified) of an existing domain to alter."}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"domain_constraint"})})}),"\n",(0,t.jsx)(n.p,{children:"New domain constraint for the domain."}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"constraint_name"})})}),"\n",(0,t.jsx)(n.p,{children:"Name of an existing constraint to drop or rename."}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"NOT VALID"})})}),"\n",(0,t.jsx)(n.p,{children:"Do not verify existing column data for constraint validity."}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"CASCADE"})})}),"\n",(0,t.jsx)(n.p,{children:"Automatically drop objects that depend on the constraint, and in turn all objects that depend on those objects."}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"RESTRICT"})})}),"\n",(0,t.jsx)(n.p,{children:"Refuse to drop the constraint if there are any dependent objects. This is the default behavior."}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"new_name"})})}),"\n",(0,t.jsx)(n.p,{children:"The new name for the domain."}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"new_constraint_name"})})}),"\n",(0,t.jsx)(n.p,{children:"The new name for the constraint."}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"new_owner"})})}),"\n",(0,t.jsx)(n.p,{children:"The user name of the new owner of the domain."}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"new_schema"})})}),"\n",(0,t.jsx)(n.p,{children:"The new schema for the domain."}),"\n",(0,t.jsx)(n.h2,{id:"notes",children:"Notes"}),"\n",(0,t.jsxs)(n.p,{children:["Although ",(0,t.jsx)(n.code,{children:"ALTER DOMAIN ADD CONSTRAINT"})," attempts to verify that existing stored data satisfies the new constraint, this check is not bulletproof, because the command cannot \u201csee\u201d table rows that are newly inserted or updated and not yet committed. If there is a hazard that concurrent operations might insert bad data, the way to proceed is to add the constraint using the ",(0,t.jsx)(n.code,{children:"NOT VALID"})," option, commit that command, wait until all transactions started before that commit have finished, and then issue ",(0,t.jsx)(n.code,{children:"ALTER DOMAIN VALIDATE CONSTRAINT"})," to search for data violating the constraint. This method is reliable because once the constraint is committed, all new transactions are guaranteed to enforce it against new values of the domain type."]}),"\n",(0,t.jsxs)(n.p,{children:["Currently, ",(0,t.jsx)(n.code,{children:"ALTER DOMAIN ADD CONSTRAINT"}),", ",(0,t.jsx)(n.code,{children:"ALTER DOMAIN VALIDATE CONSTRAINT"}),", and ",(0,t.jsx)(n.code,{children:"ALTER DOMAIN SET NOT NULL"})," will fail if the named domain or any derived domain is used within a container-type column (a composite, array, or range column) in any table in the database. They should eventually be improved to be able to verify the new constraint for such nested values."]}),"\n",(0,t.jsx)(n.h2,{id:"examples",children:"Examples"}),"\n",(0,t.jsxs)(n.p,{children:["To add a ",(0,t.jsx)(n.code,{children:"NOT NULL"})," constraint to a domain:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sql",children:"ALTER DOMAIN zipcode SET NOT NULL;\n"})}),"\n",(0,t.jsxs)(n.p,{children:["To remove a ",(0,t.jsx)(n.code,{children:"NOT NULL"})," constraint from a domain:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sql",children:"ALTER DOMAIN zipcode DROP NOT NULL;\n"})}),"\n",(0,t.jsx)(n.p,{children:"To add a check constraint to a domain:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sql",children:"ALTER DOMAIN zipcode ADD CONSTRAINT zipchk CHECK (char_length(VALUE) = 5);\n"})}),"\n",(0,t.jsx)(n.p,{children:"To remove a check constraint from a domain:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sql",children:"ALTER DOMAIN zipcode DROP CONSTRAINT zipchk;\n"})}),"\n",(0,t.jsx)(n.p,{children:"To rename a check constraint on a domain:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sql",children:"ALTER DOMAIN zipcode RENAME CONSTRAINT zipchk TO zip_check;\n"})}),"\n",(0,t.jsx)(n.p,{children:"To move the domain into a different schema:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sql",children:"ALTER DOMAIN zipcode SET SCHEMA customers;\n"})}),"\n",(0,t.jsx)(n.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"ALTER DOMAIN"})," conforms to the SQL standard, except for the ",(0,t.jsx)(n.code,{children:"OWNER"}),", ",(0,t.jsx)(n.code,{children:"RENAME"}),", ",(0,t.jsx)(n.code,{children:"SET SCHEMA"}),", and ",(0,t.jsx)(n.code,{children:"VALIDATE CONSTRAINT"})," variants, which are Cloudberry Database extensions. The ",(0,t.jsx)(n.code,{children:"NOT VALID"})," clause of the ",(0,t.jsx)(n.code,{children:"ADD CONSTRAINT"})," variant is also a Cloudberry Database extension."]}),"\n",(0,t.jsx)(n.h2,{id:"see-also",children:"See also"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.a,{href:"/docs/sql-stmts/create-domain",children:"CREATE DOMAIN"}),", ",(0,t.jsx)(n.a,{href:"/docs/sql-stmts/drop-domain",children:"DROP DOMAIN"})]})]})}function h(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(l,{...e})}):l(e)}},11151:(e,n,s)=>{s.d(n,{Z:()=>r,a:()=>o});var t=s(67294);const i={},a=t.createContext(i);function o(e){const n=t.useContext(a);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),t.createElement(a.Provider,{value:n},e.children)}}}]);