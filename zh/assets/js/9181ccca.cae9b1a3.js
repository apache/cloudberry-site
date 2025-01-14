"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[3061],{30789:(e,s,t)=>{t.r(s),t.d(s,{assets:()=>c,contentTitle:()=>o,default:()=>l,frontMatter:()=>a,metadata:()=>d,toc:()=>i});var r=t(85893),n=t(11151);const a={title:"Protect Passwords"},o="Protect passwords in Cloudberry Database",d={id:"security/protect-passwords",title:"Protect Passwords",description:"In its default configuration, Cloudberry Database saves MD5 or SCRAM-SHA-256 hashes of login users' passwords in the pgauthid system catalog rather than saving clear text passwords. Anyone who is able to view the pgauthid table can see hash strings, but no passwords. This also ensures that passwords are obscured when the database is dumped to backup files.",source:"@site/docs/security/protect-passwords.md",sourceDirName:"security",slug:"/security/protect-passwords",permalink:"/zh/docs/security/protect-passwords",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/security/protect-passwords.md",tags:[],version:"current",lastUpdatedBy:"TomShawn",lastUpdatedAt:1736834774,formattedLastUpdatedAt:"2025\u5e741\u670814\u65e5",frontMatter:{title:"Protect Passwords"},sidebar:"docsbars",previous:{title:"Configure Row-Level Security Policy",permalink:"/zh/docs/security/configure-row-level-security-policy"},next:{title:"Set Password Profile",permalink:"/zh/docs/security/set-password-profile"}},c={},i=[];function h(e){const s={admonition:"admonition",code:"code",em:"em",h1:"h1",li:"li",p:"p",pre:"pre",ul:"ul",...(0,n.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.h1,{id:"protect-passwords-in-cloudberry-database",children:"Protect passwords in Cloudberry Database"}),"\n",(0,r.jsxs)(s.p,{children:["In its default configuration, Cloudberry Database saves MD5 or SCRAM-SHA-256 hashes of login users' passwords in the ",(0,r.jsx)(s.code,{children:"pg_authid"})," system catalog rather than saving clear text passwords. Anyone who is able to view the ",(0,r.jsx)(s.code,{children:"pg_authid"})," table can see hash strings, but no passwords. This also ensures that passwords are obscured when the database is dumped to backup files."]}),"\n",(0,r.jsx)(s.p,{children:"The hash function runs when the password is set by using any of the following commands:"}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsx)(s.li,{children:(0,r.jsx)(s.code,{children:"CREATE USER name WITH PASSWORD 'password'"})}),"\n",(0,r.jsx)(s.li,{children:(0,r.jsx)(s.code,{children:"CREATE ROLE name WITH LOGIN PASSWORD 'password'"})}),"\n",(0,r.jsx)(s.li,{children:(0,r.jsx)(s.code,{children:"ALTER USER name WITH PASSWORD 'password'"})}),"\n",(0,r.jsx)(s.li,{children:(0,r.jsx)(s.code,{children:"ALTER ROLE name WITH PASSWORD 'password'"})}),"\n"]}),"\n",(0,r.jsx)(s.admonition,{type:"info",children:(0,r.jsxs)(s.p,{children:["The SQL command syntax and ",(0,r.jsx)(s.code,{children:"password_encryption"})," configuration variable include the term ",(0,r.jsx)(s.em,{children:"encrypt"}),", but the passwords are not technically encrypted. They are ",(0,r.jsx)(s.em,{children:"hashed"})," and therefore cannot be decrypted."]})}),"\n",(0,r.jsxs)(s.p,{children:["The hash is calculated on the concatenated clear text password and role name. The MD5 hash produces a 32-byte hexadecimal string prefixed with the characters ",(0,r.jsx)(s.code,{children:"md5"})," while the SCRAM-SHA-256 hash produces a 64-byte hexadecimal string prefixed with the characters ",(0,r.jsx)(s.code,{children:"SCRAM-SHA-256"}),". The hashed password is saved in the ",(0,r.jsx)(s.code,{children:"rolpassword"})," column of the ",(0,r.jsx)(s.code,{children:"pg_authid"})," system table."]}),"\n",(0,r.jsxs)(s.p,{children:["To set ",(0,r.jsx)(s.code,{children:"password_encryption"})," globally, edit the ",(0,r.jsx)(s.code,{children:"postgresql.conf"})," file and set the ",(0,r.jsx)(s.code,{children:"password_encryption"})," parameter to ",(0,r.jsx)(s.code,{children:"md5"})," or ",(0,r.jsx)(s.code,{children:"scram-sha-256"}),"."]}),"\n",(0,r.jsxs)(s.p,{children:["To set ",(0,r.jsx)(s.code,{children:"password_encryption"})," in a session, use the SQL ",(0,r.jsx)(s.code,{children:"SET"})," command:"]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-sql",children:"SET password_encryption = 'md5';\n"})})]})}function l(e={}){const{wrapper:s}={...(0,n.a)(),...e.components};return s?(0,r.jsx)(s,{...e,children:(0,r.jsx)(h,{...e})}):h(e)}},11151:(e,s,t)=>{t.d(s,{Z:()=>d,a:()=>o});var r=t(67294);const n={},a=r.createContext(n);function o(e){const s=r.useContext(a);return r.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function d(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:o(e.components),r.createElement(a.Provider,{value:s},e.children)}}}]);