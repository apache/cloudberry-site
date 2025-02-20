"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[7519],{69932:(e,r,i)=>{i.r(r),i.d(r,{assets:()=>n,contentTitle:()=>l,default:()=>a,frontMatter:()=>s,metadata:()=>c,toc:()=>d});var h=i(85893),t=i(11151);const s={title:"1.5.2"},l="Cloudberry Database v1.5.2 Release Notes",c={id:"releases/release-1.5.2",title:"1.5.2",description:"This is not an Apache release!",source:"@site/docs/releases/release-1.5.2.md",sourceDirName:"releases",slug:"/releases/release-1.5.2",permalink:"/docs/releases/release-1.5.2",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/releases/release-1.5.2.md",tags:[],version:"current",lastUpdatedBy:"TomShawn",lastUpdatedAt:1740044194,formattedLastUpdatedAt:"Feb 20, 2025",frontMatter:{title:"1.5.2"},sidebar:"docsbars",previous:{title:"1.5.3",permalink:"/docs/releases/release-1.5.3"},next:{title:"1.5.1",permalink:"/docs/releases/release-1.5.1"}},n={},d=[{value:"Improvements",id:"improvements",level:2},{value:"Bug fixes",id:"bug-fixes",level:2},{value:"\ud83d\ude4c\ud83c\udffb\ufe0f New contributor",id:"\ufe0f-new-contributor",level:2},{value:"\ud83e\uddd1\ud83c\udffb\u200d\ud83d\udcbb Contributors",id:"-contributors",level:2}];function o(e){const r={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",ul:"ul",...(0,t.a)(),...e.components};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(r.admonition,{type:"caution",children:(0,h.jsx)(r.p,{children:"This is not an Apache release!"})}),"\n",(0,h.jsx)(r.h1,{id:"cloudberry-database-v152-release-notes",children:"Cloudberry Database v1.5.2 Release Notes"}),"\n",(0,h.jsx)(r.p,{children:"Version number: v1.5.2"}),"\n",(0,h.jsx)(r.p,{children:"Cloudberry Database v1.5.2 is a minor release that includes some improvements and bug fixes."}),"\n",(0,h.jsxs)(r.p,{children:["Quick try: ",(0,h.jsx)(r.a,{href:"https://github.com/cloudberrydb/cloudberrydb/releases/tag/1.5.2",children:"v1.5.2"})]}),"\n",(0,h.jsxs)(r.p,{children:["Full changelog: ",(0,h.jsx)(r.a,{href:"https://github.com/cloudberrydb/cloudberrydb/compare/1.5.1...1.5.2",children:"https://github.com/cloudberrydb/cloudberrydb/compare/1.5.1...1.5.2"})]}),"\n",(0,h.jsx)(r.h2,{id:"improvements",children:"Improvements"}),"\n",(0,h.jsxs)(r.ul,{children:["\n",(0,h.jsxs)(r.li,{children:["Support ",(0,h.jsx)(r.code,{children:"GROUP BY"}),", ",(0,h.jsx)(r.code,{children:"GROUPING SETS"}),", ",(0,h.jsx)(r.code,{children:"ROLLUP"}),", ",(0,h.jsx)(r.code,{children:"CUBE"})," in origin queries for materialized views by @",(0,h.jsx)(r.a,{href:"https://github.com/avamingli",children:"avamingli"})," in ",(0,h.jsx)(r.a,{href:"https://github.com/cloudberrydb/cloudberrydb/pull/342",children:"#342"})]}),"\n",(0,h.jsxs)(r.li,{children:["Use ",(0,h.jsx)(r.code,{children:"pg_class"})," instead of ",(0,h.jsx)(r.code,{children:"gp_segment_configuration"})," to test ",(0,h.jsx)(r.code,{children:"Entry"})," by @",(0,h.jsx)(r.a,{href:"https://github.com/avamingli",children:"avamingli"})," in ",(0,h.jsx)(r.a,{href:"https://github.com/cloudberrydb/cloudberrydb/pull/294",children:"#294"})]}),"\n",(0,h.jsxs)(r.li,{children:["The GPORCA optimizer now supports the PAX (Partition Attributes Across) storage table by @",(0,h.jsx)(r.a,{href:"https://github.com/gfphoenix78",children:"gfphoenix78"})," in ",(0,h.jsx)(r.a,{href:"https://github.com/cloudberrydb/cloudberrydb/pull/346",children:"#346"})]}),"\n",(0,h.jsxs)(r.li,{children:["Add the ",(0,h.jsx)(r.code,{children:"RelationIsNonblockRelation"})," macro to expand code path like ",(0,h.jsx)(r.code,{children:"AO"}),"/",(0,h.jsx)(r.code,{children:"CO"})," by @",(0,h.jsx)(r.a,{href:"https://github.com/gfphoenix78",children:"gfphoenix78"})," in ",(0,h.jsx)(r.a,{href:"https://github.com/cloudberrydb/cloudberrydb/pull/347",children:"#347"})]}),"\n",(0,h.jsxs)(r.li,{children:["Feature encoding options for the custom table access method by @",(0,h.jsx)(r.a,{href:"https://github.com/gfphoenix78",children:"gfphoenix78"})," in ",(0,h.jsx)(r.a,{href:"https://github.com/cloudberrydb/cloudberrydb/pull/343",children:"#343"})]}),"\n",(0,h.jsxs)(r.li,{children:["Enable ",(0,h.jsx)(r.code,{children:"enable_shared_postgres_backend"})," by default by @",(0,h.jsx)(r.a,{href:"https://github.com/gfphoenix78",children:"gfphoenix78"})," in ",(0,h.jsx)(r.a,{href:"https://github.com/cloudberrydb/cloudberrydb/pull/351",children:"#351"})]}),"\n",(0,h.jsxs)(r.li,{children:["Correct ",(0,h.jsx)(r.code,{children:"PlannerInfo"})," fields after rewritten for materialized views by @",(0,h.jsx)(r.a,{href:"https://github.com/avamingli",children:"avamingli"})," in ",(0,h.jsx)(r.a,{href:"https://github.com/cloudberrydb/cloudberrydb/pull/348",children:"#348"})]}),"\n",(0,h.jsxs)(r.li,{children:["Support the ",(0,h.jsx)(r.code,{children:"HAVING"})," clause in origin queries for materialized views by @",(0,h.jsx)(r.a,{href:"https://github.com/avamingli",children:"avamingli"})," in ",(0,h.jsx)(r.a,{href:"https://github.com/cloudberrydb/cloudberrydb/pull/354",children:"#354"})]}),"\n",(0,h.jsxs)(r.li,{children:["Avoid misbehaviors that are not supported currently by @",(0,h.jsx)(r.a,{href:"https://github.com/avamingli",children:"avamingli"})," in ",(0,h.jsx)(r.a,{href:"https://github.com/cloudberrydb/cloudberrydb/pull/357",children:"#357"})]}),"\n",(0,h.jsxs)(r.li,{children:["Support ",(0,h.jsx)(r.code,{children:"ORDER BY"})," in origin queries for materialized views by @",(0,h.jsx)(r.a,{href:"https://github.com/avamingli",children:"avamingli"})," in ",(0,h.jsx)(r.a,{href:"https://github.com/cloudberrydb/cloudberrydb/pull/358",children:"#358"})]}),"\n",(0,h.jsxs)(r.li,{children:["Make ",(0,h.jsx)(r.code,{children:"shareinput_Xslice_dsm_handle_ptr"})," and ",(0,h.jsx)(r.code,{children:"shareinput_Xslice_hash"})," non-static by @",(0,h.jsx)(r.a,{href:"https://github.com/shmiwy",children:"shmiwy"})," in ",(0,h.jsx)(r.a,{href:"https://github.com/cloudberrydb/cloudberrydb/pull/361",children:"#361"})]}),"\n",(0,h.jsxs)(r.li,{children:["Revert ",(0,h.jsx)(r.code,{children:"ci"})," in the ",(0,h.jsx)(r.code,{children:"upterm"})," stage to avoid failure by @",(0,h.jsx)(r.a,{href:"https://github.com/wenchaozhang-123",children:"wenchaozhang-123"})," in ",(0,h.jsx)(r.a,{href:"https://github.com/cloudberrydb/cloudberrydb/pull/371",children:"#371"})]}),"\n",(0,h.jsxs)(r.li,{children:["Remove ",(0,h.jsx)(r.code,{children:"b"})," and ",(0,h.jsx)(r.code,{children:"\\r"})," in the ",(0,h.jsx)(r.code,{children:"gpssh"})," command output by @",(0,h.jsx)(r.a,{href:"https://github.com/wenchaozhang-123",children:"wenchaozhang-123"})," in ",(0,h.jsx)(r.a,{href:"https://github.com/cloudberrydb/cloudberrydb/pull/355",children:"#355"})]}),"\n",(0,h.jsxs)(r.li,{children:["Do not inherit the parent's reloptions if the child partition's ",(0,h.jsx)(r.code,{children:"AM"})," differs by @",(0,h.jsx)(r.a,{href:"https://github.com/yjhjstz",children:"yjhjstz"})," in ",(0,h.jsx)(r.a,{href:"https://github.com/cloudberrydb/cloudberrydb/pull/375",children:"#375"})]}),"\n",(0,h.jsxs)(r.li,{children:["Extend a new table access method to do acquire sample rows by @",(0,h.jsx)(r.a,{href:"https://github.com/wenchaozhang-123",children:"wenchaozhang-123"})," in ",(0,h.jsx)(r.a,{href:"https://github.com/cloudberrydb/cloudberrydb/pull/374",children:"#374"})]}),"\n",(0,h.jsxs)(r.li,{children:["Use materialized views' ",(0,h.jsx)(r.code,{children:"TupleDesc"})," to construct final columns by @",(0,h.jsx)(r.a,{href:"https://github.com/avamingli",children:"avamingli"})," in ",(0,h.jsx)(r.a,{href:"https://github.com/cloudberrydb/cloudberrydb/pull/366",children:"#366"})]}),"\n",(0,h.jsxs)(r.li,{children:["Add tests and benchmark in the ",(0,h.jsx)(r.code,{children:"interconnect"})," module by @",(0,h.jsx)(r.a,{href:"https://github.com/jiaqizho",children:"jiaqizho"})," in ",(0,h.jsx)(r.a,{href:"https://github.com/cloudberrydb/cloudberrydb/pull/384",children:"#384"})]}),"\n",(0,h.jsxs)(r.li,{children:["Add a new callback ",(0,h.jsx)(r.code,{children:"'scan_flags'"})," for the table access method by @",(0,h.jsx)(r.a,{href:"https://github.com/HuSen8891",children:"HuSen8891"})," in ",(0,h.jsx)(r.a,{href:"https://github.com/cloudberrydb/cloudberrydb/pull/391",children:"#391"})]}),"\n",(0,h.jsxs)(r.li,{children:["Export numeric structure and interface to public by @",(0,h.jsx)(r.a,{href:"https://github.com/jiaqizho",children:"jiaqizho"})," in ",(0,h.jsx)(r.a,{href:"https://github.com/cloudberrydb/cloudberrydb/pull/392",children:"#392"})]}),"\n",(0,h.jsxs)(r.li,{children:["Move the preloaded ",(0,h.jsx)(r.code,{children:"interconnect"})," to the header file by @",(0,h.jsx)(r.a,{href:"https://github.com/gfphoenix78",children:"gfphoenix78"})," in ",(0,h.jsx)(r.a,{href:"https://github.com/cloudberrydb/cloudberrydb/pull/388",children:"#388"})]}),"\n",(0,h.jsxs)(r.li,{children:["Add an inline function ",(0,h.jsx)(r.code,{children:"'table_scan_flags'"})," for table access method to get the flags by @",(0,h.jsx)(r.a,{href:"https://github.com/HuSen8891",children:"HuSen8891"})," in ",(0,h.jsx)(r.a,{href:"https://github.com/cloudberrydb/cloudberrydb/pull/395",children:"#395"})]}),"\n",(0,h.jsxs)(r.li,{children:["Add ",(0,h.jsx)(r.code,{children:"gpshrink"})," to support elastic scaling by @",(0,h.jsx)(r.a,{href:"https://github.com/lss602726449",children:"lss602726449"})," in ",(0,h.jsx)(r.a,{href:"https://github.com/cloudberrydb/cloudberrydb/pull/393",children:"#393"})]}),"\n",(0,h.jsxs)(r.li,{children:["Revert ",(0,h.jsx)(r.a,{href:"https://github.com/cloudberrydb/cloudberrydb/pull/201",children:"#201"})," partially by @",(0,h.jsx)(r.a,{href:"https://github.com/Ray-Eldath",children:"Ray-Eldath"})," in ",(0,h.jsx)(r.a,{href:"https://github.com/cloudberrydb/cloudberrydb/pull/386",children:"#386"})]}),"\n",(0,h.jsxs)(r.li,{children:["Offload the entry root slice to ",(0,h.jsx)(r.code,{children:"QE"})," by @",(0,h.jsx)(r.a,{href:"https://github.com/Ray-Eldath",children:"Ray-Eldath"})," in ",(0,h.jsx)(r.a,{href:"https://github.com/cloudberrydb/cloudberrydb/pull/385",children:"#385"})]}),"\n"]}),"\n",(0,h.jsx)(r.h2,{id:"bug-fixes",children:"Bug fixes"}),"\n",(0,h.jsxs)(r.ul,{children:["\n",(0,h.jsxs)(r.li,{children:["Fix the ",(0,h.jsx)(r.code,{children:"AO"}),"/",(0,h.jsx)(r.code,{children:"AOCS"})," ",(0,h.jsx)(r.code,{children:"insertDesc"})," memory issue by @",(0,h.jsx)(r.a,{href:"https://github.com/avamingli",children:"avamingli"})," in ",(0,h.jsx)(r.a,{href:"https://github.com/cloudberrydb/cloudberrydb/pull/365",children:"#365"})]}),"\n",(0,h.jsxs)(r.li,{children:["Fix the issue that ",(0,h.jsx)(r.code,{children:"CopyCreateStmtFields"})," lost the ",(0,h.jsx)(r.code,{children:"intoPolicy"})," field by @",(0,h.jsx)(r.a,{href:"https://github.com/yjhjstz",children:"yjhjstz"})," in ",(0,h.jsx)(r.a,{href:"https://github.com/cloudberrydb/cloudberrydb/pull/372",children:"#372"})]}),"\n",(0,h.jsxs)(r.li,{children:["Fix the issue that ",(0,h.jsx)(r.code,{children:"configue"})," is not consistent with ",(0,h.jsx)(r.code,{children:"configure.ac"})," by @",(0,h.jsx)(r.a,{href:"https://github.com/lss602726449",children:"lss602726449"})," in ",(0,h.jsx)(r.a,{href:"https://github.com/cloudberrydb/cloudberrydb/pull/373",children:"#373"})]}),"\n",(0,h.jsxs)(r.li,{children:["Fix the unstable ",(0,h.jsx)(r.code,{children:"ao"}),", ",(0,h.jsx)(r.code,{children:"vacuum"})," and ",(0,h.jsx)(r.code,{children:"icw"})," tests by @",(0,h.jsx)(r.a,{href:"https://github.com/jiaqizho",children:"jiaqizho"})," in ",(0,h.jsx)(r.a,{href:"https://github.com/cloudberrydb/cloudberrydb/pull/376",children:"#376"})]}),"\n",(0,h.jsxs)(r.li,{children:["Fix the issue that the shell script involves demo cluster by @",(0,h.jsx)(r.a,{href:"https://github.com/gfphoenix78",children:"gfphoenix78"})," in ",(0,h.jsx)(r.a,{href:"https://github.com/cloudberrydb/cloudberrydb/pull/377",children:"#377"})]}),"\n",(0,h.jsxs)(r.li,{children:["Fix ",(0,h.jsx)(r.code,{children:"CREATE TYPE"})," in namespace ",(0,h.jsx)(r.code,{children:"pg_ext_aux"})," by @",(0,h.jsx)(r.a,{href:"https://github.com/gfphoenix78",children:"gfphoenix78"})," in ",(0,h.jsx)(r.a,{href:"https://github.com/cloudberrydb/cloudberrydb/pull/380",children:"#380"})]}),"\n",(0,h.jsxs)(r.li,{children:["Fix the issue that ",(0,h.jsx)(r.code,{children:"parallel_workers"})," is initialized as ",(0,h.jsx)(r.code,{children:"0"})," for ",(0,h.jsx)(r.code,{children:"CdbPathLocus_HashedOJ"})," by @",(0,h.jsx)(r.a,{href:"https://github.com/HuSen8891",children:"HuSen8891"})," in ",(0,h.jsx)(r.a,{href:"https://github.com/cloudberrydb/cloudberrydb/pull/387",children:"#387"})]}),"\n",(0,h.jsxs)(r.li,{children:["Fix the redefined ",(0,h.jsx)(r.code,{children:"sm4"})," in ",(0,h.jsx)(r.code,{children:"pgcrypto"})," and backend/crypto by @",(0,h.jsx)(r.a,{href:"https://github.com/jiaqizho",children:"jiaqizho"})," in ",(0,h.jsx)(r.a,{href:"https://github.com/cloudberrydb/cloudberrydb/pull/394",children:"#394"})]}),"\n"]}),"\n",(0,h.jsx)(r.h2,{id:"\ufe0f-new-contributor",children:"\ud83d\ude4c\ud83c\udffb\ufe0f New contributor"}),"\n",(0,h.jsxs)(r.p,{children:["@",(0,h.jsx)(r.a,{href:"https://github.com/shmiwy",children:"shmiwy"})," made his (or her) first contribution in ",(0,h.jsx)(r.a,{href:"https://github.com/cloudberrydb/cloudberrydb/pull/361",children:"#361"}),"."]}),"\n",(0,h.jsx)(r.h2,{id:"-contributors",children:"\ud83e\uddd1\ud83c\udffb\u200d\ud83d\udcbb Contributors"}),"\n",(0,h.jsxs)(r.p,{children:["Thanks to all the contributors to make this release happen: @",(0,h.jsx)(r.a,{href:"https://github.com/avamingli",children:"avamingli"}),", @",(0,h.jsx)(r.a,{href:"https://github.com/gfphoenix78",children:"gfphoenix78"}),", @",(0,h.jsx)(r.a,{href:"https://github.com/shmiwy",children:"shmiwy"}),", @",(0,h.jsx)(r.a,{href:"https://github.com/wenchaozhang-123",children:"wenchaozhang-123"}),", @",(0,h.jsx)(r.a,{href:"https://github.com/yjhjstz",children:"yjhjstz"}),", @",(0,h.jsx)(r.a,{href:"https://github.com/lss602726449",children:"lss602726449"}),", @",(0,h.jsx)(r.a,{href:"https://github.com/jiaqizho",children:"jiaqizho"}),", @",(0,h.jsx)(r.a,{href:"https://github.com/HuSen8891",children:"HuSen8891"}),", @",(0,h.jsx)(r.a,{href:"https://github.com/Ray-Eldath",children:"Ray-Eldath"})," \ud83d\udc4d"]})]})}function a(e={}){const{wrapper:r}={...(0,t.a)(),...e.components};return r?(0,h.jsx)(r,{...e,children:(0,h.jsx)(o,{...e})}):o(e)}},11151:(e,r,i)=>{i.d(r,{Z:()=>c,a:()=>l});var h=i(67294);const t={},s=h.createContext(t);function l(e){const r=h.useContext(s);return h.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function c(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:l(e.components),h.createElement(s.Provider,{value:r},e.children)}}}]);