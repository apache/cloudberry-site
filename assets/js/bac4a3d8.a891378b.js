"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[6690],{10960:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>r,default:()=>h,frontMatter:()=>o,metadata:()=>c,toc:()=>l});var s=t(85893),i=t(11151);const o={title:"LISTEN"},r="LISTEN",c={id:"sql-stmts/listen",title:"LISTEN",description:"Listens for a notification.",source:"@site/docs/sql-stmts/listen.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/listen",permalink:"/docs/sql-stmts/listen",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/listen.md",tags:[],version:"current",lastUpdatedBy:"Dianjin Wang",lastUpdatedAt:1733128076,formattedLastUpdatedAt:"Dec 2, 2024",frontMatter:{title:"LISTEN"},sidebar:"docsbars",previous:{title:"INSERT",permalink:"/docs/sql-stmts/insert"},next:{title:"LOAD",permalink:"/docs/sql-stmts/load"}},a={},l=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Notes",id:"notes",level:2},{value:"Examples",id:"examples",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,i.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"listen",children:"LISTEN"}),"\n",(0,s.jsx)(n.p,{children:"Listens for a notification."}),"\n",(0,s.jsx)(n.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"LISTEN <channel>\n"})}),"\n",(0,s.jsx)(n.h2,{id:"description",children:"Description"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"LISTEN"})," registers the current session as a listener on the notification channel named channel. If the current session is already registered as a listener for this notification channel, nothing is done."]}),"\n",(0,s.jsxs)(n.p,{children:["Whenever the command ",(0,s.jsx)(n.code,{children:"NOTIFY <channel>"})," is invoked, either by this session or another one connected to the same database, all of the sessions currently listening on that notification channel are notified, and each will in turn notify its connected client application."]}),"\n",(0,s.jsxs)(n.p,{children:["A session can be unregistered for a given notification channel with the ",(0,s.jsx)(n.code,{children:"UNLISTEN"})," command. A session's listen registrations are automatically cleared when the session ends."]}),"\n",(0,s.jsxs)(n.p,{children:["The method a client application must use to detect notification events depends on which PostgreSQL application programming interface it uses. With the ",(0,s.jsx)(n.code,{children:"libpq"})," library, the application issues ",(0,s.jsx)(n.code,{children:"LISTEN"})," as an ordinary SQL command, and then must periodically call the function ",(0,s.jsx)(n.code,{children:"PQnotifies()"})," to find out whether any notification events have been received. Other interfaces such as ",(0,s.jsx)(n.code,{children:"libpgtcl"})," provide higher-level methods for handling notify events; indeed, with ",(0,s.jsx)(n.code,{children:"libpgtcl"})," the application programmer should not even issue ",(0,s.jsx)(n.code,{children:"LISTEN"})," or ",(0,s.jsx)(n.code,{children:"UNLISTEN"})," directly. Refer to the documentation for the interface that you are using for more details."]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.a,{href:"/docs/sql-stmts/notify",children:"NOTIFY"})," contains a more extensive discussion of the use of ",(0,s.jsx)(n.code,{children:"LISTEN"})," and ",(0,s.jsx)(n.code,{children:"NOTIFY"}),"."]}),"\n",(0,s.jsx)(n.h2,{id:"parameters",children:"Parameters"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"channel"})})}),"\n",(0,s.jsx)(n.p,{children:"The name of a notification channel (any identifier)."}),"\n",(0,s.jsx)(n.h2,{id:"notes",children:"Notes"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"LISTEN"})," takes effect at transaction commit. If ",(0,s.jsx)(n.code,{children:"LISTEN"})," or ",(0,s.jsx)(n.code,{children:"UNLISTEN"})," is run within a transaction that later rolls back, the set of notification channels being listened to is unchanged."]}),"\n",(0,s.jsxs)(n.p,{children:["A transaction that has executed ",(0,s.jsx)(n.code,{children:"LISTEN"})," cannot be prepared for two-phase commit."]}),"\n",(0,s.jsx)(n.h2,{id:"examples",children:"Examples"}),"\n",(0,s.jsxs)(n.p,{children:["Configure and execute a listen/notify sequence from ",(0,s.jsx)(n.code,{children:"psql"}),":"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:'LISTEN virtual;\nNOTIFY virtual;\nAsynchronous notification "virtual" received from server process with PID 8448.\n'})}),"\n",(0,s.jsx)(n.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,s.jsxs)(n.p,{children:["There is no ",(0,s.jsx)(n.code,{children:"LISTEN"})," statement in the SQL standard."]}),"\n",(0,s.jsx)(n.h2,{id:"see-also",children:"See also"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.a,{href:"/docs/sql-stmts/notify",children:"NOTIFY"}),", ",(0,s.jsx)(n.a,{href:"/docs/sql-stmts/unlisten",children:"UNLISTEN"})]})]})}function h(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},11151:(e,n,t)=>{t.d(n,{Z:()=>c,a:()=>r});var s=t(67294);const i={},o=s.createContext(i);function r(e){const n=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),s.createElement(o.Provider,{value:n},e.children)}}}]);