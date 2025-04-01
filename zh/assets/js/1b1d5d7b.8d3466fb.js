"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[4822],{44620:(e,r,s)=>{s.r(r),s.d(r,{assets:()=>a,contentTitle:()=>c,default:()=>h,frontMatter:()=>t,metadata:()=>i,toc:()=>l});var o=s(85893),n=s(11151);const t={title:"CREATE RESOURCE GROUP"},c="CREATE RESOURCE GROUP",i={id:"sql-stmts/create-resource-group",title:"CREATE RESOURCE GROUP",description:"Defines a new resource group.",source:"@site/docs/sql-stmts/create-resource-group.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/create-resource-group",permalink:"/zh/docs/sql-stmts/create-resource-group",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/create-resource-group.md",tags:[],version:"current",lastUpdatedBy:"Dianjin Wang",lastUpdatedAt:1743488661,formattedLastUpdatedAt:"2025\u5e744\u67081\u65e5",frontMatter:{title:"CREATE RESOURCE GROUP"},sidebar:"docsbars",previous:{title:"CREATE PROTOCOL",permalink:"/zh/docs/sql-stmts/create-protocol"},next:{title:"CREATE RESOURCE QUEUE",permalink:"/zh/docs/sql-stmts/create-resource-queue"}},a={},l=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Notes",id:"notes",level:2},{value:"Examples",id:"examples",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function u(e){const r={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,n.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(r.h1,{id:"create-resource-group",children:"CREATE RESOURCE GROUP"}),"\n",(0,o.jsx)(r.p,{children:"Defines a new resource group."}),"\n",(0,o.jsx)(r.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,o.jsx)(r.pre,{children:(0,o.jsx)(r.code,{className:"language-sql",children:"CREATE RESOURCE GROUP <name> WITH (<group_attribute>=<value> [, ... ])\n"})}),"\n",(0,o.jsx)(r.p,{children:"where group_attribute is one of:"}),"\n",(0,o.jsx)(r.pre,{children:(0,o.jsx)(r.code,{className:"language-sql",children:"CPU_MAX_PERCENT=<integer> | CPUSET=<coordinator_cores>;<segment_cores>\n[ MEMORY_LIMIT=<integer> ]\n[ CPU_WEIGHT=<integer> ]\n[ CONCURRENCY=<integer> ]\n[ MIN_COST=<integer> ]\n"})}),"\n",(0,o.jsx)(r.h2,{id:"description",children:"Description"}),"\n",(0,o.jsx)(r.p,{children:"Creates a new resource group for Apache Cloudberry resource management. You can create resource groups to manage resources for roles or to manage the resources of a Apache Cloudberry external component such as PL/Container."}),"\n",(0,o.jsx)(r.p,{children:"A resource group that you create to manage a user role identifies concurrent transaction, memory, and CPU limits for the role when resource groups are enabled. You may assign such resource groups to one or more roles."}),"\n",(0,o.jsx)(r.p,{children:"A resource group that you create to manage the resources of a Apache Cloudberry external component such as PL/Container identifies the memory and CPU limits for the component when resource groups are enabled. These resource groups use cgroups for both CPU and memory management. Assignment of resource groups to external components is component-specific. For example, you assign a PL/Container resource group when you configure a PL/Container runtime. You cannot assign a resource group that you create for external components to a role, nor can you assign a resource group that you create for roles to an external component."}),"\n",(0,o.jsxs)(r.p,{children:["You must have ",(0,o.jsx)(r.code,{children:"SUPERUSER"})," privileges to create a resource group. The maximum number of resource groups allowed in your Apache Cloudberry cluster is 100."]}),"\n",(0,o.jsxs)(r.p,{children:["Apache Cloudberry pre-defines two default resource groups: ",(0,o.jsx)(r.code,{children:"admin_group"})," and ",(0,o.jsx)(r.code,{children:"default_group"}),". These group names, as well as the group name ",(0,o.jsx)(r.code,{children:"none"}),", are reserved."]}),"\n",(0,o.jsx)(r.p,{children:"To set appropriate limits for resource groups, the Apache Cloudberry administrator must be familiar with the queries typically run on the system, as well as the users/roles running those queries and the external components they may be using, such as PL/Containers."}),"\n",(0,o.jsxs)(r.p,{children:["After creating a resource group for a role, assign the group to one or more roles using the ",(0,o.jsx)(r.a,{href:"/zh/docs/sql-stmts/alter-role",children:"ALTER ROLE"})," or ",(0,o.jsx)(r.a,{href:"/zh/docs/sql-stmts/create-role",children:"CREATE ROLE"})," commands."]}),"\n",(0,o.jsxs)(r.p,{children:["After you create a resource group to manage the CPU and memory resources of an external component, configure the external component to use the resource group. For example, configure the PL/Container runtime ",(0,o.jsx)(r.code,{children:"resource_group_id"}),"."]}),"\n",(0,o.jsx)(r.h2,{id:"parameters",children:"Parameters"}),"\n",(0,o.jsx)(r.p,{children:(0,o.jsx)(r.strong,{children:(0,o.jsx)(r.code,{children:"name"})})}),"\n",(0,o.jsx)(r.p,{children:"The name of the resource group."}),"\n",(0,o.jsx)(r.p,{children:(0,o.jsx)(r.strong,{children:(0,o.jsx)(r.code,{children:"CONCURRENCY integer"})})}),"\n",(0,o.jsxs)(r.p,{children:["Optional. The maximum number of concurrent transactions, including active and idle transactions, that are permitted for this resource group. The ",(0,o.jsx)(r.code,{children:"CONCURRENCY"})," value must be an integer in the range [0 .. ",(0,o.jsx)(r.code,{children:"max_connections"}),"]. The default ",(0,o.jsx)(r.code,{children:"CONCURRENCY"})," value for resource groups defined for roles is 20."]}),"\n",(0,o.jsxs)(r.p,{children:["You must set ",(0,o.jsx)(r.code,{children:"CONCURRENCY"})," to ",(0,o.jsx)(r.code,{children:"0"})," for resource groups that you create for external components."]}),"\n",(0,o.jsxs)(r.blockquote,{children:["\n",(0,o.jsxs)(r.p,{children:[(0,o.jsx)(r.strong,{children:"Note"})," You cannot set the ",(0,o.jsx)(r.code,{children:"CONCURRENCY"})," value for the ",(0,o.jsx)(r.code,{children:"admin_group"})," to ",(0,o.jsx)(r.code,{children:"0"}),"."]}),"\n"]}),"\n",(0,o.jsx)(r.p,{children:(0,o.jsx)(r.strong,{children:(0,o.jsx)(r.code,{children:"CPU_MAX_PERCENT integer"})})}),"\n",(0,o.jsxs)(r.p,{children:["Optional. The percentage of the maximum available CPU resources that the resource group can use. The value range is ",(0,o.jsx)(r.code,{children:"1-100"}),"."]}),"\n",(0,o.jsx)(r.p,{children:(0,o.jsx)(r.strong,{children:(0,o.jsx)(r.code,{children:"CPU_WEIGHT integer"})})}),"\n",(0,o.jsxs)(r.p,{children:["Optional. The scheduling priority of the current group. The value range is ",(0,o.jsx)(r.code,{children:"1-500"}),", the default is `100."]}),"\n",(0,o.jsx)(r.p,{children:(0,o.jsx)(r.strong,{children:(0,o.jsx)(r.code,{children:"CPUSET <coordinator_cores>;<segment_cores>"})})}),"\n",(0,o.jsxs)(r.p,{children:[(0,o.jsx)(r.code,{children:"CPUSET"})," identifies the CPU cores to reserve for this resource group on the coordinator host and on segment hosts. The CPU cores that you specify must be available in the system and cannot overlap with any CPU cores that you specify for other resource groups."]}),"\n",(0,o.jsxs)(r.blockquote,{children:["\n",(0,o.jsxs)(r.p,{children:[(0,o.jsx)(r.strong,{children:"Note"})," You must specify either ",(0,o.jsx)(r.code,{children:"CPU_MAX_PERCENT"})," or ",(0,o.jsx)(r.code,{children:"CPUSET"})," when you create a resource group, but not both."]}),"\n"]}),"\n",(0,o.jsx)(r.p,{children:"Specify cores as a comma-separated list of single core numbers or core number intervals. Define the coordinator host cores first, followed by segment host cores, and separate the two with a semicolon. You must enclose the full core configuration in single quotes. For example, '1;1,3-4' configures core 1 for the coordinator host, and cores 1, 3, and 4 for the segment hosts."}),"\n",(0,o.jsxs)(r.blockquote,{children:["\n",(0,o.jsxs)(r.p,{children:[(0,o.jsx)(r.strong,{children:"Note"})," You can configure ",(0,o.jsx)(r.code,{children:"CPUSET"})," for a resource group only after you have enabled resource group-based resource management for your Apache Cloudberry cluster."]}),"\n"]}),"\n",(0,o.jsx)(r.p,{children:(0,o.jsx)(r.strong,{children:(0,o.jsx)(r.code,{children:"MEMORY_LIMIT integer"})})}),"\n",(0,o.jsx)(r.p,{children:"Optional. The maximum available memory, in MB, to reserve for this resource group. This value determines the total amount of memory that all worker processes within a resource group can consume on a segment host during query execution."}),"\n",(0,o.jsxs)(r.p,{children:["The minimum memory quantity you can specify for a resource group is ",(0,o.jsx)(r.code,{children:"0"}),". The default value is ",(0,o.jsx)(r.code,{children:"-1"}),"."]}),"\n",(0,o.jsxs)(r.p,{children:["When you specify a ",(0,o.jsx)(r.code,{children:"MEMORY_LIMIT"})," of ",(0,o.jsx)(r.code,{children:"-1"}),", ",(0,o.jsx)(r.code,{children:"MEMORY LIMIT"})," takes the value of the ",(0,o.jsx)(r.code,{children:"statement_mem"})," server configuration parameter."]}),"\n",(0,o.jsxs)(r.blockquote,{children:["\n",(0,o.jsxs)(r.p,{children:[(0,o.jsx)(r.strong,{children:"Note"})," If the server configuration parameter ",(0,o.jsx)(r.code,{children:"gp_resgroup_memory_query_fixed_mem"})," is set, its value overrides at the session level the value of ",(0,o.jsx)(r.code,{children:"MEMORY_LIMIT"}),"."]}),"\n"]}),"\n",(0,o.jsx)(r.p,{children:(0,o.jsx)(r.strong,{children:(0,o.jsx)(r.code,{children:"MIN_COST integer"})})}),"\n",(0,o.jsx)(r.p,{children:"Optional. The limit on the cost of the query plan generated by a query in this resource group. When the query plan cost of the query is less than this value, the query will be unassigned from the resource group to which it belongs."}),"\n",(0,o.jsx)(r.p,{children:"This means that low-cost queries will execute more quickly, as they are not subject to resource constraints."}),"\n",(0,o.jsxs)(r.p,{children:["The value range is ",(0,o.jsx)(r.code,{children:"0-500"}),". The default value is ",(0,o.jsx)(r.code,{children:"0"}),", which means that the cost is not used to bypass the query."]}),"\n",(0,o.jsx)(r.h2,{id:"notes",children:"Notes"}),"\n",(0,o.jsxs)(r.p,{children:["You cannot submit a ",(0,o.jsx)(r.code,{children:"CREATE RESOURCE GROUP"})," command in an explicit transaction or sub-transaction."]}),"\n",(0,o.jsxs)(r.p,{children:["Use the ",(0,o.jsx)(r.code,{children:"gp_toolkit.gp_resgroup_config"})," system view to display the limit settings of all resource groups:"]}),"\n",(0,o.jsx)(r.pre,{children:(0,o.jsx)(r.code,{className:"language-sql",children:"SELECT * FROM gp_toolkit.gp_resgroup_config;\n"})}),"\n",(0,o.jsx)(r.h2,{id:"examples",children:"Examples"}),"\n",(0,o.jsx)(r.p,{children:"Create a resource group with CPU and memory limit percentages of 35:"}),"\n",(0,o.jsx)(r.pre,{children:(0,o.jsx)(r.code,{className:"language-sql",children:"CREATE RESOURCE GROUP rgroup1 WITH (CPU_MAX_PERCENT=35, MEMORY_LIMIT=35);\n"})}),"\n",(0,o.jsx)(r.p,{children:"Create a resource group with a concurrent transaction limit of 20, a memory limit of 15, and a CPU limit of 25:"}),"\n",(0,o.jsx)(r.pre,{children:(0,o.jsx)(r.code,{className:"language-sql",children:"CREATE RESOURCE GROUP rgroup2 WITH (CONCURRENCY=20, \n  MEMORY_LIMIT=15, CPU_MAX_PERCENT=25);\n"})}),"\n",(0,o.jsx)(r.p,{children:"Create a resource group to manage PL/Container resources specifying a memory limit of 10, and a CPU limit of 10:"}),"\n",(0,o.jsx)(r.pre,{children:(0,o.jsx)(r.code,{className:"language-sql",children:"CREATE RESOURCE GROUP plc_run1 WITH (MEMORY_LIMIT=10, CPU_MAX_PERCENT=10,\n  CONCURRENCY=0);\n"})}),"\n",(0,o.jsx)(r.p,{children:"Create a resource group with a memory limit percentage of 11 to which you assign CPU core 1 on the coordinator host, and cores 1 to 3 on segment hosts:"}),"\n",(0,o.jsx)(r.pre,{children:(0,o.jsx)(r.code,{className:"language-sql",children:"CREATE RESOURCE GROUP rgroup3 WITH (CPUSET='1;1-3', MEMORY_LIMIT=11);\n"})}),"\n",(0,o.jsx)(r.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,o.jsxs)(r.p,{children:[(0,o.jsx)(r.code,{children:"CREATE RESOURCE GROUP"})," is a Apache Cloudberry extension. There is no provision for resource groups or resource management in the SQL standard."]}),"\n",(0,o.jsx)(r.h2,{id:"see-also",children:"See also"}),"\n",(0,o.jsxs)(r.p,{children:[(0,o.jsx)(r.a,{href:"/zh/docs/sql-stmts/alter-role",children:"ALTER ROLE"}),", ",(0,o.jsx)(r.a,{href:"/zh/docs/sql-stmts/create-role",children:"CREATE ROLE"}),", ",(0,o.jsx)(r.a,{href:"/zh/docs/sql-stmts/alter-resource-group",children:"ALTER RESOURCE GROUP"}),", ",(0,o.jsx)(r.a,{href:"/zh/docs/sql-stmts/drop-resource-group",children:"DROP RESOURCE GROUP"})]})]})}function h(e={}){const{wrapper:r}={...(0,n.a)(),...e.components};return r?(0,o.jsx)(r,{...e,children:(0,o.jsx)(u,{...e})}):u(e)}},11151:(e,r,s)=>{s.d(r,{Z:()=>i,a:()=>c});var o=s(67294);const n={},t=o.createContext(n);function c(e){const r=o.useContext(t);return o.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function i(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:c(e.components),o.createElement(t.Provider,{value:r},e.children)}}}]);