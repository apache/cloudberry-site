"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[2703],{68896:(e,r,o)=>{o.r(r),o.d(r,{assets:()=>d,contentTitle:()=>a,default:()=>h,frontMatter:()=>i,metadata:()=>s,toc:()=>c});var t=o(85893),n=o(11151);const i={title:"Enable Coordinator Mirroring for Cloudberry Database",toc_max_heading_level:5},a="Enable Coordinator Mirroring for Cloudberry Database",s={id:"sys-admin/enable-coordinator-mirroring",title:"Enable Coordinator Mirroring for Cloudberry Database",description:"Cloudberry Database provides a series of high-availability features to make sure your database system can tolerate unexpected incidents such as a hardware platform failure and can be quickly recovered from such incidents.",source:"@site/docs/sys-admin/enable-coordinator-mirroring.md",sourceDirName:"sys-admin",slug:"/sys-admin/enable-coordinator-mirroring",permalink:"/zh/docs/sys-admin/enable-coordinator-mirroring",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sys-admin/enable-coordinator-mirroring.md",tags:[],version:"current",lastUpdatedBy:"Dianjin Wang",lastUpdatedAt:1733912691,formattedLastUpdatedAt:"2024\u5e7412\u670811\u65e5",frontMatter:{title:"Enable Coordinator Mirroring for Cloudberry Database",toc_max_heading_level:5},sidebar:"docsbars",previous:{title:"\u67e5\u770b Cloudberry Database \u7cfb\u7edf",permalink:"/zh/docs/sys-admin/check-database-system"},next:{title:"\u5e38\u7528\u76d1\u63a7\u8fd0\u7ef4\u64cd\u4f5c",permalink:"/zh/docs/sys-admin/recommended-maintenance-monitoring-tasks"}},d={},c=[{value:"Overview of coordinator mirroring",id:"overview-of-coordinator-mirroring",level:2},{value:"Configure coordinator mirroring",id:"configure-coordinator-mirroring",level:2},{value:"Prerequisites",id:"prerequisites",level:3},{value:"Step 1. Enable the standby coordinator",id:"step-1-enable-the-standby-coordinator",level:3},{value:"Step 2. Activate the standby coordinator",id:"step-2-activate-the-standby-coordinator",level:3},{value:"Step 3. Restore coordinator mirroring after a recovery",id:"step-3-restore-coordinator-mirroring-after-a-recovery",level:3}];function l(e){const r={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,n.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.h1,{id:"enable-coordinator-mirroring-for-cloudberry-database",children:"Enable Coordinator Mirroring for Cloudberry Database"}),"\n",(0,t.jsx)(r.p,{children:"Cloudberry Database provides a series of high-availability features to make sure your database system can tolerate unexpected incidents such as a hardware platform failure and can be quickly recovered from such incidents."}),"\n",(0,t.jsx)(r.p,{children:"This topic describes how to configure coordinator mirroring to ensure a smooth coordinator node failover."}),"\n",(0,t.jsx)(r.h2,{id:"overview-of-coordinator-mirroring",children:"Overview of coordinator mirroring"}),"\n",(0,t.jsx)(r.p,{children:"In addition to the primary working coordinator node, you can include a standby coordinator in your CBDB cluster, which can take the system over when the primary host is down."}),"\n",(0,t.jsx)(r.p,{children:"The primary and standby coordinators should be deployed on different hosts so that the cluster can tolerate a single-host failure. Clients connect to the primary coordinator and queries can be run only on the primary coordinator. The standby coordinator is kept up to date with the primary coordinator using Write-Ahead Logging (WAL)-based streaming replication."}),"\n",(0,t.jsxs)(r.p,{children:["If the coordinator fails, the administrator needs to run the ",(0,t.jsx)(r.code,{children:"gpactivatestandby"})," utility to have the standby coordinator take over as the new primary coordinator. You can configure a virtual IP address for the coordinator and standby so that client programs do not have to switch to a different network address when the current coordinator changes. If the coordinator host fails, the virtual IP address can be swapped to the actual acting coordinator."]}),"\n",(0,t.jsx)(r.h2,{id:"configure-coordinator-mirroring",children:"Configure coordinator mirroring"}),"\n",(0,t.jsx)(r.p,{children:"Take the following steps to enable and activate coordinator mirroring for your CBDB cluster:"}),"\n",(0,t.jsx)(r.h3,{id:"prerequisites",children:"Prerequisites"}),"\n",(0,t.jsx)(r.p,{children:"Make sure that you have already configured a standby coordinator on a different host from where the primary coordinator is running. Specifically, ensure that the following is properly configured on the standby coordinator host:"}),"\n",(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsxs)(r.li,{children:[(0,t.jsx)(r.code,{children:"gpadmin"})," system user is created"]}),"\n",(0,t.jsx)(r.li,{children:"CBDB rpm package is installed"}),"\n",(0,t.jsx)(r.li,{children:"Environmental variables are set"}),"\n",(0,t.jsx)(r.li,{children:"SSH keys are exchanged"}),"\n",(0,t.jsx)(r.li,{children:"Data directories and tablespace directories, if needed, are created"}),"\n"]}),"\n",(0,t.jsx)(r.admonition,{type:"note",children:(0,t.jsxs)(r.p,{children:["If you follow the steps described in the ",(0,t.jsx)(r.a,{href:"https://cloudberrydb.org/docs/cbdb-op-prepare-to-deploy",children:"Prepare to Deploy"})," and ",(0,t.jsx)(r.a,{href:"https://cloudberrydb.org/docs/cbdb-op-deploy-guide",children:"Deploy Cloudberry Database Manually Using RPM Package"})," topics to deploy the cluster, a host for the standby coordinator ( ",(0,t.jsx)(r.code,{children:"cbdb-standbycoordinator"}),") is already configured in the cluster."]})}),"\n",(0,t.jsx)(r.h3,{id:"step-1-enable-the-standby-coordinator",children:"Step 1. Enable the standby coordinator"}),"\n",(0,t.jsxs)(r.p,{children:["You need to first enable the standby coordinator using the ",(0,t.jsx)(r.code,{children:"gpinitstandby"})," utility:"]}),"\n",(0,t.jsxs)(r.ol,{children:["\n",(0,t.jsxs)(r.li,{children:["\n",(0,t.jsxs)(r.p,{children:["Run the ",(0,t.jsx)(r.code,{children:"gpinitstandby"})," utility on the currently active primary coordinator (",(0,t.jsx)(r.code,{children:"cbdb-coordinator"}),") host to add a standby coordinator host to your CBDB cluster. For example:"]}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{children:"$ gpinitstandby -s cbdb-standbycoordinator\n"})}),"\n",(0,t.jsxs)(r.p,{children:["The ",(0,t.jsx)(r.code,{children:"-s"})," option specifies the standby coordinator hostname."]}),"\n",(0,t.jsxs)(r.p,{children:["You will be prompted with the following message when the initialization is completed: ",(0,t.jsx)(r.code,{children:"-Successfully created standby coordinator on cbdb-coordinator"}),"."]}),"\n"]}),"\n",(0,t.jsxs)(r.li,{children:["\n",(0,t.jsxs)(r.p,{children:["You can run the ",(0,t.jsx)(r.code,{children:"gpstate"})," utility with the ",(0,t.jsx)(r.code,{children:"-f"})," option to display details of the standby coordinator host."]}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{children:"$ gpstate -f\n"})}),"\n",(0,t.jsxs)(r.p,{children:["The standby coordinator status should be ",(0,t.jsx)(r.code,{children:"passive"}),", and the WAL sender state should be ",(0,t.jsx)(r.code,{children:"streaming"}),", as demonstrated below:"]}),"\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.img,{alt:"init standby",src:o(95080).Z+"",width:"1035",height:"413"})}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(r.h3,{id:"step-2-activate-the-standby-coordinator",children:"Step 2. Activate the standby coordinator"}),"\n",(0,t.jsxs)(r.p,{children:["If the primary coordinator fails, the CBDB cluster is not accessible and WAL replication stops. You can use ",(0,t.jsx)(r.code,{children:"gpactivatestandby"})," to activate the standby coordinator. Upon activation of the standby coordinator, CBDB reconstructs the coordinator host state at the time of the last successfully committed transaction."]}),"\n",(0,t.jsx)(r.p,{children:"To activate the standby coordinator:"}),"\n",(0,t.jsxs)(r.ol,{children:["\n",(0,t.jsxs)(r.li,{children:["\n",(0,t.jsxs)(r.p,{children:["Run the ",(0,t.jsx)(r.code,{children:"gpactivatestandby"})," utility from the standby coordinator host you are activating. For example:"]}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{children:"$ export PGPORT=5432\n$ gpactivatestandby -d /data0/coordinator/gpseg-1\n"})}),"\n",(0,t.jsxs)(r.p,{children:["Where ",(0,t.jsx)(r.code,{children:"-d"})," specifies the data directory of the coordinator host you are activating."]}),"\n",(0,t.jsx)(r.admonition,{type:"note",children:(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsxs)(r.li,{children:["\n",(0,t.jsxs)(r.p,{children:["Before running ",(0,t.jsx)(r.code,{children:"gpactivatestandby"}),", be sure to run ",(0,t.jsx)(r.code,{children:"gpstate -f"})," to confirm that the standby coordinator is synchronized with the current coordinator node. If synchronized, the final line of the ",(0,t.jsx)(r.code,{children:"gpstate -f"})," output will look similar to this: ",(0,t.jsx)(r.code,{children:"20230607:06:50:06:004205 gpstate:test1-m:gpadmin-[INFO]:--Sync state: sync"})]}),"\n"]}),"\n",(0,t.jsxs)(r.li,{children:["\n",(0,t.jsxs)(r.p,{children:["It might take a moment for the activation to be completed. Wait until you are prompted to continue the process and enter ",(0,t.jsx)(r.code,{children:"Y"})," in your terminal to confirm."]}),"\n"]}),"\n"]})}),"\n",(0,t.jsx)(r.p,{children:"After you activate the standby, it becomes the active or primary coordinator for your CBDB cluster. You can access the CBDB cluster by connecting to the standby coordinator."}),"\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.img,{alt:"activate standby",src:o(22521).Z+"",width:"1200",height:"536"})}),"\n"]}),"\n",(0,t.jsxs)(r.li,{children:["\n",(0,t.jsxs)(r.p,{children:["After the utility is completed, you can run ",(0,t.jsx)(r.code,{children:"gpstate"})," with the ",(0,t.jsx)(r.code,{children:"-b"})," option to display a summary of the system status:"]}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{children:"$ gpstate -b\n"})}),"\n",(0,t.jsxs)(r.p,{children:["The coordinator status should be ",(0,t.jsx)(r.code,{children:"Active"}),". When a standby coordinator is not configured, the command displays ",(0,t.jsx)(r.code,{children:"No coordinator standby configured"})," for the standby coordinator status. If you configured a new standby coordinator, its status is ",(0,t.jsx)(r.code,{children:"Passive"}),"."]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(r.h3,{id:"step-3-restore-coordinator-mirroring-after-a-recovery",children:"Step 3. Restore coordinator mirroring after a recovery"}),"\n",(0,t.jsx)(r.p,{children:"After you activate a standby coordinator for recovery, the standby coordinator becomes the primary coordinator. You can continue running that instance as the primary coordinator if it has the same capabilities and dependability as the original coordinator host."}),"\n",(0,t.jsx)(r.p,{children:"You must initialize a new standby coordinator to continue providing coordinator mirroring unless you have already done so while activating the prior standby coordinator."}),"\n",(0,t.jsx)(r.p,{children:"Take the steps below to configure the failed primary coordinator to become a standby coordinator:"}),"\n",(0,t.jsxs)(r.ol,{children:["\n",(0,t.jsxs)(r.li,{children:["\n",(0,t.jsx)(r.p,{children:"Ensure the original coordinator host is in dependable running condition."}),"\n"]}),"\n",(0,t.jsxs)(r.li,{children:["\n",(0,t.jsxs)(r.p,{children:["On the original primary coordinator host, move or remove the data directory, ",(0,t.jsx)(r.code,{children:"gpseg-1"}),". This example moves the directory to ",(0,t.jsx)(r.code,{children:"backup_gpseg-1"}),":"]}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{children:"$ mv /data0/coordinator/gpseg-1 /data0/coordinator/backup_gpseg-1\n"})}),"\n",(0,t.jsx)(r.p,{children:"You can remove the backup directory once the standby is successfully configured."}),"\n"]}),"\n",(0,t.jsxs)(r.li,{children:["\n",(0,t.jsxs)(r.p,{children:["Initialize a standby coordinator on the original coordinator host. For example, run this command from the current coordinator host, ",(0,t.jsx)(r.code,{children:"cbdb-standbycoordinator"}),":"]}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{children:"$ gpinitstandby -s cbdb-coordinator\n"})}),"\n"]}),"\n",(0,t.jsxs)(r.li,{children:["\n",(0,t.jsxs)(r.p,{children:["After the initialization is completed, check the status of the standby coordinator ",(0,t.jsx)(r.code,{children:"cbdb-coordinator"}),". Run ",(0,t.jsx)(r.code,{children:"gpstate"})," with the ",(0,t.jsx)(r.code,{children:"-f"})," option to check the standby coordinator status:"]}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{children:"$ gpstate -f\n"})}),"\n",(0,t.jsxs)(r.p,{children:["The standby coordinator status should be ",(0,t.jsx)(r.code,{children:"passive"}),", and the WAL sender state should be ",(0,t.jsx)(r.code,{children:"streaming"}),"."]}),"\n"]}),"\n"]})]})}function h(e={}){const{wrapper:r}={...(0,n.a)(),...e.components};return r?(0,t.jsx)(r,{...e,children:(0,t.jsx)(l,{...e})}):l(e)}},22521:(e,r,o)=>{o.d(r,{Z:()=>t});const t=o.p+"assets/images/activate-standby-b63868e8c8b4a0a92df89dfc35eb1901.png"},95080:(e,r,o)=>{o.d(r,{Z:()=>t});const t=o.p+"assets/images/init-standby-1e8b18af4a9d4ef65831117776d98524.png"},11151:(e,r,o)=>{o.d(r,{Z:()=>s,a:()=>a});var t=o(67294);const n={},i=t.createContext(n);function a(e){const r=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function s(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:a(e.components),t.createElement(i.Provider,{value:r},e.children)}}}]);