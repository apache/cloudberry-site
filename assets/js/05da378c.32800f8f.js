"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[3591],{85105:(e,d,t)=>{t.r(d),t.d(d,{assets:()=>l,contentTitle:()=>r,default:()=>o,frontMatter:()=>i,metadata:()=>c,toc:()=>h});var s=t(85893),n=t(11151);const i={title:"Data Types"},r="Cloudberry Database Data Types",c={id:"data-types",title:"Data Types",description:"Cloudberry Database has a rich set of native data types available to users. This document shows some of the built-in data types. In addition to the types listed here, there are also some internally used data types, such as oid (object identifier), but those are not documented in this document.",source:"@site/docs/data-types.md",sourceDirName:".",slug:"/data-types",permalink:"/docs/data-types",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/data-types.md",tags:[],version:"current",lastUpdatedBy:"TomShawn",lastUpdatedAt:1734402925,formattedLastUpdatedAt:"Dec 17, 2024",frontMatter:{title:"Data Types"},sidebar:"docsbars",previous:{title:"VALUES",permalink:"/docs/sql-stmts/values"},next:{title:"Summary of Built-in Functions",permalink:"/docs/functions/"}},l={},h=[];function x(e){const d={code:"code",em:"em",h1:"h1",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,n.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(d.h1,{id:"cloudberry-database-data-types",children:"Cloudberry Database Data Types"}),"\n",(0,s.jsx)(d.p,{children:"Cloudberry Database has a rich set of native data types available to users. This document shows some of the built-in data types. In addition to the types listed here, there are also some internally used data types, such as oid (object identifier), but those are not documented in this document."}),"\n",(0,s.jsx)(d.p,{children:"The following data types are specified by SQL: bit, bit varying, boolean, character varying, varchar, character, char, date, double precision, integer, interval, numeric, decimal, real, smallint, time (with or without time zone), and timestamp (with or without time zone)."}),"\n",(0,s.jsx)(d.p,{children:"Each data type has an external representation determined by its input and output functions. Many of the built-in types have obvious external formats. However, several types are either unique to PostgreSQL (and Cloudberry Database), such as geometric paths, or have several possibilities for formats, such as the date and time types. Some of the input and output functions are not invertible. That is, the result of an output function may lose accuracy when compared to the original input."}),"\n",(0,s.jsxs)(d.table,{children:[(0,s.jsx)(d.thead,{children:(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.th,{children:"Name"}),(0,s.jsx)(d.th,{children:"Alias"}),(0,s.jsx)(d.th,{children:"Size"}),(0,s.jsx)(d.th,{children:"Range"}),(0,s.jsx)(d.th,{children:"Description"})]})}),(0,s.jsxs)(d.tbody,{children:[(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"bigint"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"int8"})}),(0,s.jsx)(d.td,{children:"8 bytes"}),(0,s.jsxs)(d.td,{children:[(0,s.jsx)(d.code,{children:"-9223372036854775808"})," to ",(0,s.jsx)(d.code,{children:"9223372036854775807"})]}),(0,s.jsx)(d.td,{children:"Large range integer"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"bigserial"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"serial8"})}),(0,s.jsx)(d.td,{children:"8 bytes"}),(0,s.jsxs)(d.td,{children:[(0,s.jsx)(d.code,{children:"1"})," to ",(0,s.jsx)(d.code,{children:"9223372036854775807"})]}),(0,s.jsx)(d.td,{children:"Large auto-incrementing integer"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"bit [ (n) ]"})}),(0,s.jsx)(d.td,{}),(0,s.jsxs)(d.td,{children:[(0,s.jsx)(d.em,{children:"n"})," bits"]}),(0,s.jsx)(d.td,{children:"Bit string constant"}),(0,s.jsx)(d.td,{children:"Fixed-length bit string"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"bit varying [ (n) ]"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"varbit"})}),(0,s.jsx)(d.td,{children:"Actual number of bits"}),(0,s.jsx)(d.td,{children:"Bit string constant"}),(0,s.jsx)(d.td,{children:"Variable-length bit string"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"boolean"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"bool"})}),(0,s.jsx)(d.td,{children:"1 byte"}),(0,s.jsxs)(d.td,{children:[(0,s.jsx)(d.code,{children:"true"}),"/",(0,s.jsx)(d.code,{children:"false"}),", ",(0,s.jsx)(d.code,{children:"t"}),"/",(0,s.jsx)(d.code,{children:"f"}),", ",(0,s.jsx)(d.code,{children:"yes"}),"/",(0,s.jsx)(d.code,{children:"no"}),", ",(0,s.jsx)(d.code,{children:"y"}),"/",(0,s.jsx)(d.code,{children:"n"}),", ",(0,s.jsx)(d.code,{children:"1"}),"/",(0,s.jsx)(d.code,{children:"0"})]}),(0,s.jsx)(d.td,{children:"Logical boolean (true/false)"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"box"})}),(0,s.jsx)(d.td,{}),(0,s.jsx)(d.td,{children:"32 bytes"}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"((x1,y1),(x2,y2))"})}),(0,s.jsx)(d.td,{children:"Rectangular box in the plane, not allowed in distribution key columns."})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"bytea1"})}),(0,s.jsx)(d.td,{}),(0,s.jsx)(d.td,{children:"1 byte + binary string"}),(0,s.jsx)(d.td,{children:"Sequence of octets"}),(0,s.jsx)(d.td,{children:"Variable-length binary string"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"character [ (n) ]"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"char [ (n) ]"})}),(0,s.jsx)(d.td,{children:"1 byte + n"}),(0,s.jsxs)(d.td,{children:["Strings up to ",(0,s.jsx)(d.code,{children:"n"})," characters in length"]}),(0,s.jsx)(d.td,{children:"Fixed-length, blank padded"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"character varying [ (n) ]"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"varchar [ (n) ]"})}),(0,s.jsx)(d.td,{children:"1 byte + string size"}),(0,s.jsxs)(d.td,{children:["Strings up to ",(0,s.jsx)(d.code,{children:"n"})," characters in length"]}),(0,s.jsx)(d.td,{children:"Variable-length with limit"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"cidr"})}),(0,s.jsx)(d.td,{}),(0,s.jsx)(d.td,{children:"12 or 24 bytes"}),(0,s.jsx)(d.td,{}),(0,s.jsx)(d.td,{children:"IPv4 and IPv6 networks"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"circle"})}),(0,s.jsx)(d.td,{}),(0,s.jsx)(d.td,{children:"24 bytes"}),(0,s.jsxs)(d.td,{children:[(0,s.jsx)(d.code,{children:"<(x,y),r>"})," (center and radius)"]}),(0,s.jsx)(d.td,{children:"Circle in the plane, not allowed in distribution key columns."})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"date"})}),(0,s.jsx)(d.td,{}),(0,s.jsx)(d.td,{children:"4 bytes"}),(0,s.jsxs)(d.td,{children:[(0,s.jsx)(d.code,{children:"'4714-11-24 BC'"})," - ",(0,s.jsx)(d.code,{children:"'999999-12-31 AD'"})]}),(0,s.jsx)(d.td,{children:"Calendar date (year, month, day)"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsxs)(d.td,{children:[(0,s.jsx)(d.code,{children:"decimal [ (p, s) ]"}),"1"]}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"numeric [ (p, s) ]"})}),(0,s.jsx)(d.td,{children:"variable"}),(0,s.jsx)(d.td,{children:"No limit"}),(0,s.jsx)(d.td,{children:"User-specified precision, exact"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"double precision"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"float8"})}),(0,s.jsx)(d.td,{children:"8 bytes"}),(0,s.jsx)(d.td,{children:"15 decimal digits precision"}),(0,s.jsx)(d.td,{children:"Variable-precision, inexact"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"inet"})}),(0,s.jsx)(d.td,{}),(0,s.jsx)(d.td,{children:"12 or 24 bytes"}),(0,s.jsx)(d.td,{}),(0,s.jsx)(d.td,{children:"IPv4 and IPv6 hosts and networks"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"integer"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"int4"})}),(0,s.jsx)(d.td,{children:"4 bytes"}),(0,s.jsxs)(d.td,{children:[(0,s.jsx)(d.code,{children:"-2147483648"})," to ",(0,s.jsx)(d.code,{children:"+2147483647"})]}),(0,s.jsx)(d.td,{children:"Usual choice for integer"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"interval [ fields ] [ (p) ]"})}),(0,s.jsx)(d.td,{}),(0,s.jsx)(d.td,{children:"16 bytes"}),(0,s.jsxs)(d.td,{children:[(0,s.jsx)(d.code,{children:"-178000000 years"})," to ",(0,s.jsx)(d.code,{children:"178000000 years"})]}),(0,s.jsx)(d.td,{children:"Time span"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"json"})}),(0,s.jsx)(d.td,{}),(0,s.jsx)(d.td,{children:"1 byte + json size"}),(0,s.jsx)(d.td,{children:"json of any length"}),(0,s.jsx)(d.td,{children:"Variable unlimited length"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"jsonb"})}),(0,s.jsx)(d.td,{}),(0,s.jsx)(d.td,{children:"1 byte + binary string"}),(0,s.jsx)(d.td,{children:"json of any length in a decomposed binary format"}),(0,s.jsx)(d.td,{children:"Variable unlimited length"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"lseg"})}),(0,s.jsx)(d.td,{}),(0,s.jsx)(d.td,{children:"32 bytes"}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"((x1,y1),(x2,y2))"})}),(0,s.jsx)(d.td,{children:"Line segment in the plane - not allowed in distribution key columns."})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"macaddr"})}),(0,s.jsx)(d.td,{}),(0,s.jsx)(d.td,{children:"6 bytes"}),(0,s.jsx)(d.td,{}),(0,s.jsx)(d.td,{children:"MAC addresses"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"macaddr8"})}),(0,s.jsx)(d.td,{}),(0,s.jsx)(d.td,{children:"8 bytes"}),(0,s.jsx)(d.td,{}),(0,s.jsx)(d.td,{children:"MAC addresses (EUI-64 format)"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"money"})}),(0,s.jsx)(d.td,{}),(0,s.jsx)(d.td,{children:"8 bytes"}),(0,s.jsxs)(d.td,{children:[(0,s.jsx)(d.code,{children:"-92233720368547758.08"})," to ",(0,s.jsx)(d.code,{children:"+92233720368547758.07"})]}),(0,s.jsx)(d.td,{children:"Currency amount"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"path"})}),(0,s.jsx)(d.td,{}),(0,s.jsx)(d.td,{children:"16+16n bytes"}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"[(x1,y1),...]"})}),(0,s.jsx)(d.td,{children:"Geometric path in the plane, not allowed in distribution key columns."})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"point"})}),(0,s.jsx)(d.td,{}),(0,s.jsx)(d.td,{children:"16 bytes"}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"(x,y)"})}),(0,s.jsx)(d.td,{children:"Geometric point in the plane, not allowed in distribution key columns."})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"polygon"})}),(0,s.jsx)(d.td,{}),(0,s.jsx)(d.td,{children:"40+16n bytes"}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"((x1,y1),...)"})}),(0,s.jsx)(d.td,{children:"Closed geometric path in the plane, not allowed in distribution key columns."})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"real"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"float4"})}),(0,s.jsx)(d.td,{children:"4 bytes"}),(0,s.jsx)(d.td,{children:"6 decimal digits precision"}),(0,s.jsx)(d.td,{children:"Variable-precision, inexact"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"serial"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"serial4"})}),(0,s.jsx)(d.td,{children:"4 bytes"}),(0,s.jsxs)(d.td,{children:[(0,s.jsx)(d.code,{children:"1"})," to ",(0,s.jsx)(d.code,{children:"2147483647"})]}),(0,s.jsx)(d.td,{children:"Auto-incrementing integer"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"smallint"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"int2"})}),(0,s.jsx)(d.td,{children:"2 bytes"}),(0,s.jsxs)(d.td,{children:[(0,s.jsx)(d.code,{children:"-32768"})," to ",(0,s.jsx)(d.code,{children:"+32767"})]}),(0,s.jsx)(d.td,{children:"Small range integer"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"text"})}),(0,s.jsx)(d.td,{}),(0,s.jsx)(d.td,{children:"1 byte + string size"}),(0,s.jsx)(d.td,{children:"Strings of any length"}),(0,s.jsx)(d.td,{children:"Variable unlimited length"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"time [ (p) ] [ without time zone ]"})}),(0,s.jsx)(d.td,{}),(0,s.jsx)(d.td,{children:"8 bytes"}),(0,s.jsxs)(d.td,{children:[(0,s.jsx)(d.code,{children:"00:00:00[.000000]"})," - ",(0,s.jsx)(d.code,{children:"24:00:00[.000000]"})]}),(0,s.jsx)(d.td,{children:"Time of day only"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"time [ (p) ] with time zone"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"timetz"})}),(0,s.jsx)(d.td,{children:"12 bytes"}),(0,s.jsxs)(d.td,{children:[(0,s.jsx)(d.code,{children:"00:00:00+1559"})," - ",(0,s.jsx)(d.code,{children:"24:00:00-1559"})]}),(0,s.jsx)(d.td,{children:"Time of day only, with time zone"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"timestamp [ (p) ] [ without time zone ]"})}),(0,s.jsx)(d.td,{}),(0,s.jsx)(d.td,{children:"8 bytes"}),(0,s.jsxs)(d.td,{children:[(0,s.jsx)(d.code,{children:"4713 BC"})," - ",(0,s.jsx)(d.code,{children:"294,276 AD"})]}),(0,s.jsx)(d.td,{children:"Both date and time"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"timestamp [ (p) ] with time zone"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"timestamptz"})}),(0,s.jsx)(d.td,{children:"8 bytes"}),(0,s.jsxs)(d.td,{children:[(0,s.jsx)(d.code,{children:"4713 BC"})," - ",(0,s.jsx)(d.code,{children:"294,276 AD"})]}),(0,s.jsx)(d.td,{children:"Both date and time, with time zone"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"uuid"})}),(0,s.jsx)(d.td,{}),(0,s.jsx)(d.td,{children:"16 bytes"}),(0,s.jsx)(d.td,{}),(0,s.jsx)(d.td,{children:"Universally Unique Identifiers according to RFC 4122, ISO/IEC 9834-8:2005"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"xml"})}),(0,s.jsx)(d.td,{}),(0,s.jsx)(d.td,{children:"1 byte + XML size"}),(0,s.jsx)(d.td,{children:"XML of any length"}),(0,s.jsx)(d.td,{children:"Variable unlimited length"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"txid_snapshot"})}),(0,s.jsx)(d.td,{}),(0,s.jsx)(d.td,{}),(0,s.jsx)(d.td,{}),(0,s.jsx)(d.td,{children:"User-level transaction ID snapshot"})]})]})]})]})}function o(e={}){const{wrapper:d}={...(0,n.a)(),...e.components};return d?(0,s.jsx)(d,{...e,children:(0,s.jsx)(x,{...e})}):x(e)}},11151:(e,d,t)=>{t.d(d,{Z:()=>c,a:()=>r});var s=t(67294);const n={},i=s.createContext(n);function r(e){const d=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(d):{...d,...e}}),[d,e])}function c(e){let d;return d=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:r(e.components),s.createElement(i.Provider,{value:d},e.children)}}}]);