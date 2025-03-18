"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[9648],{72476:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>a,default:()=>l,frontMatter:()=>o,metadata:()=>i,toc:()=>d});var r=n(85893),s=n(11151);const o={title:"Architecture"},a="Apache Cloudberry Architecture",i={id:"cbdb-architecture",title:"Architecture",description:"This document introduces the product architecture and the implementation mechanism of the internal modules in Apache Cloudberry.",source:"@site/docs/cbdb-architecture.md",sourceDirName:".",slug:"/cbdb-architecture",permalink:"/docs/cbdb-architecture",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/cbdb-architecture.md",tags:[],version:"current",lastUpdatedBy:"Dianjin Wang",lastUpdatedAt:1742268909,formattedLastUpdatedAt:"Mar 18, 2025",frontMatter:{title:"Architecture"},sidebar:"docsbars",previous:{title:"Feature Overview",permalink:"/docs/"},next:{title:"User Scenarios",permalink:"/docs/cbdb-scenarios"}},c={},d=[];function h(e){const t={h1:"h1",img:"img",li:"li",p:"p",strong:"strong",ul:"ul",...(0,s.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{id:"apache-cloudberry-architecture",children:"Apache Cloudberry Architecture"}),"\n",(0,r.jsx)(t.p,{children:"This document introduces the product architecture and the implementation mechanism of the internal modules in Apache Cloudberry."}),"\n",(0,r.jsx)(t.p,{children:"In most cases, Apache Cloudberry is similar to PostgreSQL in terms of SQL support, features, configuration options, and user functionalities. Users can interact with Apache Cloudberry in a similar way to how they interact with a standalone PostgreSQL system."}),"\n",(0,r.jsx)(t.p,{children:"Apache Cloudberry uses MPP (Massively Parallel Processing) architecture to store and process large volumes of data, by distributing data and computing workloads across multiple servers or hosts."}),"\n",(0,r.jsx)(t.p,{children:"MPP, known as the shared-nothing architecture, refers to systems with multiple hosts that work together to perform a task. Each host has its own processor, memory, disk, network resources, and operating system. Apache Cloudberry uses this high-performance architecture to distribute data loads and can use all system resources in parallel to process queries."}),"\n",(0,r.jsx)(t.p,{children:"From users' view, Apache Cloudberry is a complete relational database management system (RDBMS). In a physical view, it contains multiple PostgreSQL instances. To make these independent PostgreSQL instances work together, Apache Cloudberry performs distributed cluster processing at different levels for data storage, computing, communication, and management. Apache Cloudberry hides the complex details of the distributed system, giving users a single logical database view. This greatly eases the work of developers and operational staff."}),"\n",(0,r.jsx)(t.p,{children:"The architecture diagram of Apache Cloudberry is as follows:"}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.img,{alt:"Apache Cloudberry Architecture",src:n(73060).Z+"",width:"1322",height:"634"})}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:["\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.strong,{children:"Coordinator node"})," (or control node) is the gateway to the Apache Cloudberry system, which accepts client connections and SQL queries, and allocates tasks to data node instances. Users interact with Apache Cloudberry by connecting to the coordinator node using a client program (such as psql) or an application programming interface (API) (such as JDBC, ODBC, or libpq PostgreSQL C API)."]}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:"The coordinator node acts as the global system directory, containing a set of system tables that record the metadata of Apache Cloudberry."}),"\n",(0,r.jsx)(t.li,{children:"The coordinator node does not store user data. User data is stored only in data node instances."}),"\n",(0,r.jsx)(t.li,{children:"The coordinator node performs authentication for client connections, processes SQL commands, distributes workload among segments, coordinates the results returned by each segment, and returns the final results to the client program."}),"\n",(0,r.jsx)(t.li,{children:"Apache Cloudberry uses Write Ahead Logging (WAL) for coordinator/standby mirroring. In WAL-based logging, all modifications are first written to a log before being written to the disk, which ensures the data integrity of in-process operations."}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(t.li,{children:["\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.strong,{children:"Segment"})," (or data node) instances are individual Postgres processes, each storing a portion of the data and executing the corresponding part of the query. When a user connects to the database through the coordinator node and submits a query request, a process is created on each segment node to handle the query. User-defined tables and their indexes are distributed across the available segments, and each segment node contains distinct portions of the data. The processes of data processing runs in the corresponding segment. Users interact with segments through the coordinator, and the segment operate on servers known as the segment host."]}),"\n",(0,r.jsx)(t.p,{children:"Typically, a segment host runs 2 to 8 data nodes, depending on the processor, memory, storage, network interface, and workload. The configuration of the segment host needs to be balanced, because evenly distributing the data and workload among segments is the key to achieving optimal performance with Apache Cloudberry, which allows all segments to start processing a task and finish the work at the same time."}),"\n"]}),"\n",(0,r.jsxs)(t.li,{children:["\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.strong,{children:"Interconnect"})," is the network layer in the Apache Cloudberry system architecture. Interconnect refers to the network infrastructure upon which the communication between the coordinator node and the segments relies, which uses a standard Ethernet switching structure."]}),"\n",(0,r.jsx)(t.p,{children:"For performance reasons, a 10 GB or faster network is recommended. By default, the Interconnect module uses the UDP protocol with flow control (UDPIFC) for communication to send messages through the network. The data packet verification performed by Apache Cloudberry exceeds the scope provided by UDP, which means that its reliability is equivalent to using the TCP protocol, and its performance and scalability surpass the TCP protocol. If the Interconnect is changed to the TCP protocol instead, the scalability of Apache Cloudberry is limited to 1000 segments. This limit does not apply when UDPIFC is used as the default protocol."}),"\n"]}),"\n",(0,r.jsxs)(t.li,{children:["\n",(0,r.jsx)(t.p,{children:"Apache Cloudberry uses Multiversion Concurrency Control (MVCC) to ensure data consistency. When querying the database, each transaction only sees a snapshot of the data, ensuring that current transactions do not see modifications made by other transactions on the same records. In this way, MVCC provides transaction isolation in the database."}),"\n",(0,r.jsx)(t.p,{children:"MVCC minimizes lock contention to ensure performance in a multi-user environment. This is done by avoiding explicit locking for database transactions."}),"\n",(0,r.jsx)(t.p,{children:"In concurrency control, MVCC does not introduce conflicts for query (read) locks and write locks. In addition, read and write operations do not block each other. This is the biggest advantages of MVCC over the lock mechanism."}),"\n"]}),"\n"]})]})}function l(e={}){const{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(h,{...e})}):h(e)}},73060:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"assets/images/cbdb-arch-50bcace26617dbb38fd0ddc8fd6f8608.png"},11151:(e,t,n)=>{n.d(t,{Z:()=>i,a:()=>a});var r=n(67294);const s={},o=r.createContext(s);function a(e){const t=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),r.createElement(o.Provider,{value:t},e.children)}}}]);