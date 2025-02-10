"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[1110],{56340:(e,i,r)=>{r.r(i),r.d(i,{assets:()=>c,contentTitle:()=>n,default:()=>d,frontMatter:()=>s,metadata:()=>l,toc:()=>a});var h=r(85893),t=r(11151);const s={title:"1.5.4"},n="Cloudberry Database v1.5.4 Release Notes",l={id:"releases/release-1.5.4",title:"1.5.4",description:"This is not an Apache release!",source:"@site/docs/releases/release-1.5.4.md",sourceDirName:"releases",slug:"/releases/release-1.5.4",permalink:"/docs/releases/release-1.5.4",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/releases/release-1.5.4.md",tags:[],version:"current",lastUpdatedBy:"TomShawn",lastUpdatedAt:1739157355,formattedLastUpdatedAt:"Feb 10, 2025",frontMatter:{title:"1.5.4"},sidebar:"docsbars",previous:{title:"1.6.0",permalink:"/docs/releases/release-1.6.0"},next:{title:"1.5.3",permalink:"/docs/releases/release-1.5.3"}},c={},a=[{value:"Improvements",id:"improvements",level:2},{value:"Bug fixes",id:"bug-fixes",level:2},{value:"Other changes",id:"other-changes",level:2},{value:"\ud83d\ude4c\ud83c\udffb\ufe0f New contributor",id:"\ufe0f-new-contributor",level:2},{value:"\ud83e\uddd1\ud83c\udffb\u200d\ud83d\udcbb Contributor list",id:"-contributor-list",level:2}];function o(e){const i={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",ul:"ul",...(0,t.a)(),...e.components};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(i.admonition,{type:"caution",children:(0,h.jsx)(i.p,{children:"This is not an Apache release!"})}),"\n",(0,h.jsx)(i.h1,{id:"cloudberry-database-v154-release-notes",children:"Cloudberry Database v1.5.4 Release Notes"}),"\n",(0,h.jsx)(i.p,{children:"Version number: v1.5.4"}),"\n",(0,h.jsx)(i.p,{children:"Cloudberry Database v1.5.4 is a minor release that includes some improvements, changes, and bug fixes."}),"\n",(0,h.jsxs)(i.p,{children:["Quick try: ",(0,h.jsx)(i.a,{href:"https://github.com/cloudberrydb/cloudberrydb/releases/tag/1.5.4",children:"v1.5.4"})]}),"\n",(0,h.jsxs)(i.p,{children:["Full Changelog: ",(0,h.jsx)(i.a,{href:"https://github.com/cloudberrydb/cloudberrydb/compare/1.5.3...1.5.4",children:"https://github.com/cloudberrydb/cloudberrydb/compare/1.5.3...1.5.4"})]}),"\n",(0,h.jsx)(i.h2,{id:"improvements",children:"Improvements"}),"\n",(0,h.jsxs)(i.ul,{children:["\n",(0,h.jsxs)(i.li,{children:["Add the ",(0,h.jsx)(i.code,{children:"cbdb_relation_size"})," function by ",(0,h.jsx)(i.a,{href:"https://github.com/fanfuxiaoran",children:"@fanfuxiaoran"})," in ",(0,h.jsx)(i.a,{href:"https://github.com/cloudberrydb/cloudberrydb/pull/428",children:"#428"})]}),"\n",(0,h.jsxs)(i.li,{children:["Cherry-pick the updates from Greenplum Database upstream (02/07/2022-02/28/2022) by ",(0,h.jsx)(i.a,{href:"https://github.com/avamingli",children:"@avamingli"})," in ",(0,h.jsx)(i.a,{href:"https://github.com/cloudberrydb/cloudberrydb/pull/432",children:"#432"})]}),"\n",(0,h.jsxs)(i.li,{children:["Support the ",(0,h.jsx)(i.code,{children:"DISTINCT"}),' clause in origin queries for "Answer Query Using Materialized Views" by ',(0,h.jsx)(i.a,{href:"https://github.com/avamingli",children:"@avamingli"})," in ",(0,h.jsx)(i.a,{href:"https://github.com/cloudberrydb/cloudberrydb/pull/439",children:"#439"})]}),"\n",(0,h.jsxs)(i.li,{children:["Support the Postgres-specific ",(0,h.jsx)(i.code,{children:"DISTINCT ON"}),' clause in origin queries for "Answer Query Using Materialized Views" by ',(0,h.jsx)(i.a,{href:"https://github.com/avamingli",children:"@avamingli"})," in ",(0,h.jsx)(i.a,{href:"https://github.com/cloudberrydb/cloudberrydb/pull/441",children:"#441"})]}),"\n",(0,h.jsxs)(i.li,{children:["Expand a new external variable tag by ",(0,h.jsx)(i.a,{href:"https://github.com/jiaqizho",children:"@jiaqizho"})," in ",(0,h.jsx)(i.a,{href:"https://github.com/cloudberrydb/cloudberrydb/pull/443",children:"#443"})]}),"\n",(0,h.jsxs)(i.li,{children:["Expand the pending deletes interface by ",(0,h.jsx)(i.a,{href:"https://github.com/jiaqizho",children:"@jiaqizho"})," in ",(0,h.jsx)(i.a,{href:"https://github.com/cloudberrydb/cloudberrydb/pull/442",children:"#442"})]}),"\n",(0,h.jsxs)(i.li,{children:["Support the ",(0,h.jsx)(i.code,{children:"LIMIT"}),"/",(0,h.jsx)(i.code,{children:"OFFSET"}),"/",(0,h.jsx)(i.code,{children:"FETCH"}),' clause in origin queries for "Answer Query Using Materialized Views" by ',(0,h.jsx)(i.a,{href:"https://github.com/avamingli",children:"@avamingli"})," in ",(0,h.jsx)(i.a,{href:"https://github.com/cloudberrydb/cloudberrydb/pull/446",children:"#446"})]}),"\n",(0,h.jsxs)(i.li,{children:["Clean up the build tools and guide directories by ",(0,h.jsx)(i.a,{href:"https://github.com/tuhaihe",children:"@tuhaihe"})," in ",(0,h.jsx)(i.a,{href:"https://github.com/cloudberrydb/cloudberrydb/pull/445",children:"#445"})]}),"\n",(0,h.jsxs)(i.li,{children:["Insert more data to make tuplestore spill in ",(0,h.jsx)(i.code,{children:"regress/misc_jiras.sql"})," by ",(0,h.jsx)(i.a,{href:"https://github.com/fanfuxiaoran",children:"@fanfuxiaoran"})," in ",(0,h.jsx)(i.a,{href:"https://github.com/cloudberrydb/cloudberrydb/pull/452",children:"#452"})]}),"\n"]}),"\n",(0,h.jsx)(i.h2,{id:"bug-fixes",children:"Bug fixes"}),"\n",(0,h.jsxs)(i.ul,{children:["\n",(0,h.jsxs)(i.li,{children:["Fix the motion toast error by ",(0,h.jsx)(i.a,{href:"https://github.com/gfphoenix78",children:"@gfphoenix78"})," in ",(0,h.jsx)(i.a,{href:"https://github.com/cloudberrydb/cloudberrydb/pull/436",children:"#436"})]}),"\n",(0,h.jsxs)(i.li,{children:["Fix the issue of checking password file permissions in ",(0,h.jsx)(i.code,{children:"dbconn.py"})," by ",(0,h.jsx)(i.a,{href:"https://github.com/fanfuxiaoran",children:"@fanfuxiaoran"})," in ",(0,h.jsx)(i.a,{href:"https://github.com/cloudberrydb/cloudberrydb/pull/438",children:"#438"})]}),"\n",(0,h.jsxs)(i.li,{children:["Fix the ORCA issue of the flaky ",(0,h.jsx)(i.code,{children:"Invalid key is inaccessible"})," fallback (#15147) by ",(0,h.jsx)(i.a,{href:"https://github.com/fanfuxiaoran",children:"@fanfuxiaoran"})," in ",(0,h.jsx)(i.a,{href:"https://github.com/cloudberrydb/cloudberrydb/pull/437",children:"#437"})]}),"\n",(0,h.jsxs)(i.li,{children:["Fix ",(0,h.jsx)(i.code,{children:"explain(locus)"})," issues by ",(0,h.jsx)(i.a,{href:"https://github.com/avamingli",children:"@avamingli"})," in ",(0,h.jsx)(i.a,{href:"https://github.com/cloudberrydb/cloudberrydb/pull/433",children:"#433"})]}),"\n",(0,h.jsxs)(i.li,{children:["Use the checkberry ",(0,h.jsx)(i.code,{children:"gpcheckperf"})," series updates to solve the problem that the ",(0,h.jsx)(i.code,{children:"gpcheckperf"})," in Cloudberry Database v1.5.2 does not display disk information by ",(0,h.jsx)(i.a,{href:"https://github.com/August-beaulo",children:"@August-beaulo"})," in ",(0,h.jsx)(i.a,{href:"https://github.com/cloudberrydb/cloudberrydb/pull/430",children:"#430"})]}),"\n"]}),"\n",(0,h.jsx)(i.h2,{id:"other-changes",children:"Other changes"}),"\n",(0,h.jsxs)(i.ul,{children:["\n",(0,h.jsxs)(i.li,{children:["Remove the ",(0,h.jsx)(i.code,{children:"cbload"}),"-related code by ",(0,h.jsx)(i.a,{href:"https://github.com/wenchaozhang-123",children:"@wenchaozhang-123"})," in ",(0,h.jsx)(i.a,{href:"https://github.com/cloudberrydb/cloudberrydb/pull/431",children:"#431"})]}),"\n",(0,h.jsxs)(i.li,{children:["Refactor ",(0,h.jsx)(i.code,{children:"cbload"})," to ",(0,h.jsx)(i.code,{children:"gpdirtableload"})," using Python by ",(0,h.jsx)(i.a,{href:"https://github.com/wenchaozhang-123",children:"@wenchaozhang-123"})," in ",(0,h.jsx)(i.a,{href:"https://github.com/cloudberrydb/cloudberrydb/pull/435",children:"#435"})]}),"\n",(0,h.jsxs)(i.li,{children:["Remove the CPP keywords that were used as function or parameter names by ",(0,h.jsx)(i.a,{href:"https://github.com/jiaqizho",children:"@jiaqizho"})," in ",(0,h.jsx)(i.a,{href:"https://github.com/cloudberrydb/cloudberrydb/pull/449",children:"#449"})]}),"\n"]}),"\n",(0,h.jsx)(i.h2,{id:"\ufe0f-new-contributor",children:"\ud83d\ude4c\ud83c\udffb\ufe0f New contributor"}),"\n",(0,h.jsxs)(i.p,{children:[(0,h.jsx)(i.a,{href:"https://github.com/fanfuxiaoran",children:"@fanfuxiaoran"})," made their first contribution in ",(0,h.jsx)(i.a,{href:"https://github.com/cloudberrydb/cloudberrydb/pull/428",children:"#428"})]}),"\n",(0,h.jsx)(i.h2,{id:"-contributor-list",children:"\ud83e\uddd1\ud83c\udffb\u200d\ud83d\udcbb Contributor list"}),"\n",(0,h.jsxs)(i.p,{children:["Thanks to all the contributors to make this release happen: ",(0,h.jsx)(i.a,{href:"https://github.com/higuoxing",children:"@higuoxing"}),", ",(0,h.jsx)(i.a,{href:"https://github.com/tuhaihe",children:"@tuhaihe"}),", ",(0,h.jsx)(i.a,{href:"https://github.com/August-beaulo",children:"@August-beaulo"}),", ",(0,h.jsx)(i.a,{href:"https://github.com/avamingli",children:"@avamingli"}),", ",(0,h.jsx)(i.a,{href:"https://github.com/piyushc01",children:"@piyushc01"}),", ",(0,h.jsx)(i.a,{href:"https://github.com/red1452",children:"@red1452"}),", ",(0,h.jsx)(i.a,{href:"https://github.com/edespino",children:"@edespino"}),", ",(0,h.jsx)(i.a,{href:"https://github.com/jnihal",children:"@jnihal"}),", ",(0,h.jsx)(i.a,{href:"https://github.com/Annu149",children:"@Annu149"}),", ",(0,h.jsx)(i.a,{href:"https://github.com/jiaqizho",children:"@jiaqizho"}),", ",(0,h.jsx)(i.a,{href:"https://github.com/wenchaozhang-123",children:"@wenchaozhang-123"}),", ",(0,h.jsx)(i.a,{href:"https://github.com/dgkimura",children:"@dgkimura"}),", ",(0,h.jsx)(i.a,{href:"https://github.com/fanfuxiaoran",children:"@fanfuxiaoran"}),", ",(0,h.jsx)(i.a,{href:"https://github.com/gfphoenix78",children:"@gfphoenix78"}),", ",(0,h.jsx)(i.a,{href:"https://github.com/HelloYJohn",children:"@HelloYJohn"}),", ",(0,h.jsx)(i.a,{href:"https://github.com/adam8157",children:"@adam8157"}),", ",(0,h.jsx)(i.a,{href:"https://github.com/xiaoxiaoHe-E",children:"@xiaoxiaoHe-E"}),", ",(0,h.jsx)(i.a,{href:"https://github.com/InnerLife0",children:"@InnerLife0"}),", ",(0,h.jsx)(i.a,{href:"https://github.com/wuyuhao28",children:"@wuyuhao28"}),", ",(0,h.jsx)(i.a,{href:"https://github.com/l-wang",children:"@l-wang"}),", ",(0,h.jsx)(i.a,{href:"https://github.com/lij55",children:"@lij55"}),", ",(0,h.jsx)(i.a,{href:"https://github.com/huansong",children:"@huansong"}),", ",(0,h.jsx)(i.a,{href:"https://github.com/chrishajas",children:"@chrishajas"}),", ",(0,h.jsx)(i.a,{href:"https://github.com/tglsfdc",children:"@tglsfdc"}),", ",(0,h.jsx)(i.a,{href:"https://github.com/fairyfar",children:"@fairyfar"}),", ",(0,h.jsx)(i.a,{href:"https://github.com/kainwen",children:"@kainwen"}),", ",(0,h.jsx)(i.a,{href:"https://github.com/nmisch",children:"@nmisch"}),", ",(0,h.jsx)(i.a,{href:"https://github.com/my-ship-it",children:"@my-ship-it"})]})]})}function d(e={}){const{wrapper:i}={...(0,t.a)(),...e.components};return i?(0,h.jsx)(i,{...e,children:(0,h.jsx)(o,{...e})}):o(e)}},11151:(e,i,r)=>{r.d(i,{Z:()=>l,a:()=>n});var h=r(67294);const t={},s=h.createContext(t);function n(e){const i=h.useContext(s);return h.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function l(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:n(e.components),h.createElement(s.Provider,{value:i},e.children)}}}]);