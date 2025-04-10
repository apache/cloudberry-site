"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[7415],{29445:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>o,contentTitle:()=>a,default:()=>f,frontMatter:()=>t,metadata:()=>d,toc:()=>r});var s=i(85893),l=i(11151);const t={title:"pg_filedump"},a="pg_filedump",d={id:"sys-utilities/pg-filedump",title:"pg_filedump",description:"Filedump, also known as the command-line tool pg_filedump, is a system utility that formats Apache Cloudberry heap files, index files, and control files into human-readable forms. Using filedump, you can format and dump files in multiple ways, as described in the Command-line options section, and even dump binary data directly.",source:"@site/docs/sys-utilities/pg-filedump.md",sourceDirName:"sys-utilities",slug:"/sys-utilities/pg-filedump",permalink:"/docs/sys-utilities/pg-filedump",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sys-utilities/pg-filedump.md",tags:[],version:"current",lastUpdatedBy:"Dianjin Wang",lastUpdatedAt:1744271659,formattedLastUpdatedAt:"Apr 10, 2025",frontMatter:{title:"pg_filedump"},sidebar:"docsbars",previous:{title:"pg_dumpall",permalink:"/docs/sys-utilities/pg-dumpall"},next:{title:"psql",permalink:"/docs/sys-utilities/psql"}},o={},r=[{value:"User scenarios",id:"user-scenarios",level:2},{value:"Compile and install filedump",id:"compile-and-install-filedump",level:2},{value:"Configuration options",id:"configuration-options",level:3},{value:"Usage examples",id:"usage-examples",level:2},{value:"Format a heap file",id:"format-a-heap-file",level:3},{value:"View the content of a control file",id:"view-the-content-of-a-control-file",level:3},{value:"Format and display a specific block range",id:"format-and-display-a-specific-block-range",level:3},{value:"Get detailed information using the <code>-i</code> and <code>-f</code> options",id:"get-detailed-information-using-the--i-and--f-options",level:3},{value:"Command-line options",id:"command-line-options",level:3}];function c(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,l.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"pg_filedump",children:"pg_filedump"}),"\n",(0,s.jsxs)(n.p,{children:["Filedump, also known as the command-line tool ",(0,s.jsx)(n.code,{children:"pg_filedump"}),", is a system utility that formats Apache Cloudberry heap files, index files, and control files into human-readable forms. Using filedump, you can format and dump files in multiple ways, as described in the ",(0,s.jsx)(n.a,{href:"#command-line-options",children:"Command-line options"})," section, and even dump binary data directly."]}),"\n",(0,s.jsxs)(n.p,{children:["The repository for Apache Cloudberry's filedump can be found at: ",(0,s.jsx)(n.code,{children:"https://github.com/cloudberry-contrib/filedump"})]}),"\n",(0,s.jsx)(n.h2,{id:"user-scenarios",children:"User scenarios"}),"\n",(0,s.jsx)(n.p,{children:"The filedump tool is primarily used in the following scenarios:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"File analysis and debugging"}),": Converts heap, index, or control files from the database into a readable format, helping file content analysis and database issue debugging."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Data recovery"}),": Helps extract and recover data when database files are corrupted."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Database learning and research"}),": Provides developers and administrators a way to directly inspect database file contents, which is useful for studying database internals or learning about file formats."]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"compile-and-install-filedump",children:"Compile and install filedump"}),"\n",(0,s.jsx)(n.p,{children:"Before compiling filedump, you need to have a Apache Cloudberry cluster installed with version 1.0.0 or later. The following are the typical steps for compilation:"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Ensure the Cloudberry package can be found:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"su - gpadmin\nsource /usr/local/cloudberry/greenplum_path.sh\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Clone the GitHub repository ",(0,s.jsx)(n.code,{children:"cloudberry-contrib/filedump"})," to your local environment:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"git clone https://github.com/cloudberry-contrib/filedump.git\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Enter the repository directory and run the compilation command:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"cd filedump\nmake\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Install ",(0,s.jsx)(n.code,{children:"pg_filedump"}),":"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"make install\n"})}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"configuration-options",children:"Configuration options"}),"\n",(0,s.jsx)(n.p,{children:"The following configuration options are available during the compilation process:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"ENABLE_ZLIB"}),": Enables the use of ",(0,s.jsx)(n.code,{children:"pg_filedump"})," on zlib-compressed data files. If the ",(0,s.jsx)(n.code,{children:"zlib"})," headers and libraries are detected, zlib support will be automatically enabled. You can force zlib support to be enabled with the following command:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"make -f Makefile ENABLE_ZLIB=y\n"})}),"\n",(0,s.jsxs)(n.p,{children:["You can also force it to be disabled by setting this variable to ",(0,s.jsx)(n.code,{children:"n"}),"."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"ENABLE_ZSTD"}),": Similar settings are used for the ",(0,s.jsx)(n.code,{children:"zstd"})," compression method."]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"usage-examples",children:"Usage examples"}),"\n",(0,s.jsxs)(n.p,{children:["Assuming you have successfully installed ",(0,s.jsx)(n.code,{children:"filedump"}),", here are some common command examples:"]}),"\n",(0,s.jsx)(n.h3,{id:"format-a-heap-file",children:"Format a heap file"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"pg_filedump -f /path/to/heap/file\n"})}),"\n",(0,s.jsx)(n.p,{children:"Example:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"$ pg_filedump -f /home/gpadmin/datadirs/dbfast1/demoDataDir0/base/13347/16385\n\n*******************************************************************\n* PostgreSQL File/Block Formatted Dump Utility\n*\n* File: /home/gpadmin/datadirs/dbfast1/demoDataDir0/base/13347/16385\n* Options used: -f\n*******************************************************************\n\nBlock    0 ********************************************************\n<Header> -----\nBlock Offset: 0x00000000         Offsets: Lower      44 (0x002c)\nBlock: Size 32768  Version   14            Upper    32568 (0x7f38)\nLSN:  logid      0 recoff 0x0c084ef8      Special  32768 (0x8000)\nItems:    5                      Free Space: 32524\nChecksum: 0x27ac  Prune XID: 0x00000000  Flags: 0x0000 ()\nLength (including item array): 44\n\n0000: 00000000 f84e080c ac270000 2c00387f  .....N...'..,.8.\n0010: 00800e80 00000000 d8ff4800 b0ff5000  ..........H...P.\n0020: 88ff5000 60ff5000 38ff5000           ..P.`.P.8.P.    \n\n<Data> -----\nItem   1 -- Length:   36  Offset: 32728 (0x7fd8)  Flags: NORMAL\n7fd8: 1b030000 00000000 00000000 00000000  ................\n7fe8: 01000300 02081800 02000000 09426f62  .............Bob\n7ff8: 19000000                             ....            \n\nItem   2 -- Length:   40  Offset: 32688 (0x7fb0)  Flags: NORMAL\n7fb0: 1b030000 00000000 00000000 00000000  ................\n7fc0: 02000300 02081800 03000000 11436861  .............Cha\n7fd0: 726c6965 23000000                    rlie#...        \n\nItem   3 -- Length:   40  Offset: 32648 (0x7f88)  Flags: NORMAL\n7f88: 1c030000 00000000 00000000 00000000  ................\n7f98: 03000300 02081800 04000000 0d446176  .............Dav\n7fa8: 69640000 1c000000                    id......        \n\nItem   4 -- Length:   40  Offset: 32608 (0x7f60)  Flags: NORMAL\n7f60: 1d030000 00000000 00000000 00000000  ................\n7f70: 04000300 02081800 07000000 11436861  .............Cha\n7f80: 726c6965 23000000                    rlie#...        \n\nItem   5 -- Length:   40  Offset: 32568 (0x7f38)  Flags: NORMAL\n7f38: 1d030000 00000000 00000000 00000000  ................\n7f48: 05000300 02081800 08000000 0d446176  .............Dav\n7f58: 69640000 1c000000                    id......        \n\n*** End of File Encountered. Last Block Read: 0 ***\n"})}),"\n",(0,s.jsx)(n.h3,{id:"view-the-content-of-a-control-file",children:"View the content of a control file"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"pg_filedump -c /path/to/pg_control\n"})}),"\n",(0,s.jsx)(n.p,{children:"Example:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"$ pg_filedump -c /home/gpadmin/datadirs/qddir/demoDataDir-1/global/pg_control\n\n*******************************************************************\n* PostgreSQL File/Block Formatted Dump Utility\n*\n* File: /home/gpadmin/datadirs/qddir/demoDataDir-1/global/pg_control\n* Options used: -c\n*******************************************************************\n\n<pg_control Contents> *********************************************\n\n                        CRC: Correct\n        pg_control Version: 13000700\n            Catalog Version: 302406171\n            System Identifier: 7405502447288557259\n                        State: IN PRODUCTION\n                Last Mod Time: Wed Aug 21 16:20:06 2024\n    Last Checkpoint Record: Log File (0) Offset (0x0c088f80)\nLast Checkpoint Record Redo: Log File (0) Offset (0x0c088f48)\n        |-       TimeLineID: 1\n        |-         Next XID: 0/809\n        |-         Next OID: 24576\n        |- Next Relfilenode: 24576\n        |-       Next Multi: 1\n        |-    Next MultiOff: 0\n        |-             Time: Wed Aug 21 16:20:06 2024\n    Minimum Recovery Point: Log File (0) Offset (0x00000000)\n        Backup Start Record: Log File (0) Offset (0x00000000)\n            Backup End Record: Log File (0) Offset (0x00000000)\nEnd-of-Backup Record Required: no\n    Maximum Data Alignment: 8\n        Floating-Point Sample: 1234567\n        Database Block Size: 32768\n        Blocks Per Segment: 32768\n            XLOG Block Size: 32768\n            XLOG Segment Size: 67108864\n    Maximum Identifier Length: 64\n        Maximum Index Keys: 32\n            TOAST Chunk Size: 8140\n"})}),"\n",(0,s.jsx)(n.h3,{id:"format-and-display-a-specific-block-range",children:"Format and display a specific block range"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"pg_filedump -R 0 10 -f /path/to/heap/file\n"})}),"\n",(0,s.jsx)(n.p,{children:"Example:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"$ pg_filedump -R 0 10 -f /home/gpadmin/datadirs/dbfast1/demoDataDir0/base/13347/16385\n\n*******************************************************************\n* PostgreSQL File/Block Formatted Dump Utility\n*\n* File: /home/gpadmin/datadirs/dbfast1/demoDataDir0/base/13347/16385\n* Options used: -R 0 10 -f\n*******************************************************************\n\nBlock    0 ********************************************************\n<Header> -----\nBlock Offset: 0x00000000         Offsets: Lower      44 (0x002c)\nBlock: Size 32768  Version   14            Upper    32568 (0x7f38)\nLSN:  logid      0 recoff 0x0c084ef8      Special  32768 (0x8000)\nItems:    5                      Free Space: 32524\nChecksum: 0x27ac  Prune XID: 0x00000000  Flags: 0x0000 ()\nLength (including item array): 44\n\n0000: 00000000 f84e080c ac270000 2c00387f  .....N...'..,.8.\n0010: 00800e80 00000000 d8ff4800 b0ff5000  ..........H...P.\n0020: 88ff5000 60ff5000 38ff5000           ..P.`.P.8.P.    \n\n<Data> -----\nItem   1 -- Length:   36  Offset: 32728 (0x7fd8)  Flags: NORMAL\n7fd8: 1b030000 00000000 00000000 00000000  ................\n7fe8: 01000300 02081800 02000000 09426f62  .............Bob\n7ff8: 19000000                             ....            \n\nItem   2 -- Length:   40  Offset: 32688 (0x7fb0)  Flags: NORMAL\n7fb0: 1b030000 00000000 00000000 00000000  ................\n7fc0: 02000300 02081800 03000000 11436861  .............Cha\n7fd0: 726c6965 23000000                    rlie#...        \n\nItem   3 -- Length:   40  Offset: 32648 (0x7f88)  Flags: NORMAL\n7f88: 1c030000 00000000 00000000 00000000  ................\n7f98: 03000300 02081800 04000000 0d446176  .............Dav\n7fa8: 69640000 1c000000                    id......        \n\nItem   4 -- Length:   40  Offset: 32608 (0x7f60)  Flags: NORMAL\n7f60: 1d030000 00000000 00000000 00000000  ................\n7f70: 04000300 02081800 07000000 11436861  .............Cha\n7f80: 726c6965 23000000                    rlie#...        \n\nItem   5 -- Length:   40  Offset: 32568 (0x7f38)  Flags: NORMAL\n7f38: 1d030000 00000000 00000000 00000000  ................\n7f48: 05000300 02081800 08000000 0d446176  .............Dav\n7f58: 69640000 1c000000                    id......        \n\n\n\n*** End of File Encountered. Last Block Read: 0 ***\n"})}),"\n",(0,s.jsxs)(n.h3,{id:"get-detailed-information-using-the--i-and--f-options",children:["Get detailed information using the ",(0,s.jsx)(n.code,{children:"-i"})," and ",(0,s.jsx)(n.code,{children:"-f"})," options"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"pg_filedump -i -f /path/to/heap/file\n"})}),"\n",(0,s.jsx)(n.p,{children:"Example:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"$ pg_filedump -i -f /home/gpadmin/datadirs/dbfast1/demoDataDir0/base/13347/16385\n\n*******************************************************************\n* PostgreSQL File/Block Formatted Dump Utility\n*\n* File: /home/gpadmin/datadirs/dbfast1/demoDataDir0/base/13347/16385\n* Options used: -i -f\n*******************************************************************\n\nBlock    0 ********************************************************\n<Header> -----\n Block Offset: 0x00000000         Offsets: Lower      44 (0x002c)\n Block: Size 32768  Version   14            Upper    32568 (0x7f38)\n LSN:  logid      0 recoff 0x0c084ef8      Special  32768 (0x8000)\n Items:    5                      Free Space: 32524\n Checksum: 0x27ac  Prune XID: 0x00000000  Flags: 0x0000 ()\n Length (including item array): 44\n\n  0000: 00000000 f84e080c ac270000 2c00387f  .....N...'..,.8.\n  0010: 00800e80 00000000 d8ff4800 b0ff5000  ..........H...P.\n  0020: 88ff5000 60ff5000 38ff5000           ..P.`.P.8.P.    \n\n<Data> -----\n Item   1 -- Length:   36  Offset: 32728 (0x7fd8)  Flags: NORMAL\n  XMIN: 795  XMAX: 0  CID|XVAC: 0\n  Block Id: 0  linp Index: 1   Attributes: 3   Size: 24\n  infomask: 0x0802 (HASVARWIDTH|XMAX_INVALID) \n\n  7fd8: 1b030000 00000000 00000000 00000000  ................\n  7fe8: 01000300 02081800 02000000 09426f62  .............Bob\n  7ff8: 19000000                             ....            \n\n Item   2 -- Length:   40  Offset: 32688 (0x7fb0)  Flags: NORMAL\n  XMIN: 795  XMAX: 0  CID|XVAC: 0\n  Block Id: 0  linp Index: 2   Attributes: 3   Size: 24\n  infomask: 0x0802 (HASVARWIDTH|XMAX_INVALID) \n\n  7fb0: 1b030000 00000000 00000000 00000000  ................\n  7fc0: 02000300 02081800 03000000 11436861  .............Cha\n  7fd0: 726c6965 23000000                    rlie#...        \n\n Item   3 -- Length:   40  Offset: 32648 (0x7f88)  Flags: NORMAL\n  XMIN: 796  XMAX: 0  CID|XVAC: 0\n  Block Id: 0  linp Index: 3   Attributes: 3   Size: 24\n  infomask: 0x0802 (HASVARWIDTH|XMAX_INVALID) \n\n  7f88: 1c030000 00000000 00000000 00000000  ................\n  7f98: 03000300 02081800 04000000 0d446176  .............Dav\n  7fa8: 69640000 1c000000                    id......        \n\n Item   4 -- Length:   40  Offset: 32608 (0x7f60)  Flags: NORMAL\n  XMIN: 797  XMAX: 0  CID|XVAC: 0\n  Block Id: 0  linp Index: 4   Attributes: 3   Size: 24\n  infomask: 0x0802 (HASVARWIDTH|XMAX_INVALID) \n\n  7f60: 1d030000 00000000 00000000 00000000  ................\n  7f70: 04000300 02081800 07000000 11436861  .............Cha\n  7f80: 726c6965 23000000                    rlie#...        \n\n Item   5 -- Length:   40  Offset: 32568 (0x7f38)  Flags: NORMAL\n  XMIN: 797  XMAX: 0  CID|XVAC: 0\n  Block Id: 0  linp Index: 5   Attributes: 3   Size: 24\n  infomask: 0x0802 (HASVARWIDTH|XMAX_INVALID) \n\n  7f38: 1d030000 00000000 00000000 00000000  ................\n  7f48: 05000300 02081800 08000000 0d446176  .............Dav\n  7f58: 69640000 1c000000                    id......        \n\n\n\n*** End of File Encountered. Last Block Read: 0 ***\n"})}),"\n",(0,s.jsx)(n.h3,{id:"command-line-options",children:"Command-line options"}),"\n",(0,s.jsx)(n.p,{children:"When using the filedump tool, you can format and dump database files with the following command:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"pg_filedump [-abcdfhikxy] [-R startblock [endblock]] [-D attrlist] [-S blocksize] [-s segsize] [-n segnumber] file\n"})}),"\n",(0,s.jsx)(n.p,{children:"The default settings are: relative addressing, formatting the entire file, and using the block size listed in block 0 of the file."}),"\n",(0,s.jsx)(n.p,{children:"The following options are available for heap and index files:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"-a"}),": Displays absolute addresses when formatting. Block header information is always block-relative."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"-b"}),": Displays binary block images within a specified range. This option will disable all other formatting options."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"-d"}),": Displays a formatted block content dump. This option will disable all other formatting options."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"-D"}),": Decodes tuples using a given comma-separated list of types. Supported types include:","\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"bigint"}),"\n",(0,s.jsx)(n.li,{children:"bigserial"}),"\n",(0,s.jsx)(n.li,{children:"bool"}),"\n",(0,s.jsx)(n.li,{children:"char"}),"\n",(0,s.jsx)(n.li,{children:"charN -- char(n)"}),"\n",(0,s.jsx)(n.li,{children:"date"}),"\n",(0,s.jsx)(n.li,{children:"float"}),"\n",(0,s.jsx)(n.li,{children:"float4"}),"\n",(0,s.jsx)(n.li,{children:"float8"}),"\n",(0,s.jsx)(n.li,{children:"int"}),"\n",(0,s.jsx)(n.li,{children:"json"}),"\n",(0,s.jsx)(n.li,{children:"macaddr"}),"\n",(0,s.jsx)(n.li,{children:"name"}),"\n",(0,s.jsx)(n.li,{children:"oid"}),"\n",(0,s.jsx)(n.li,{children:"real"}),"\n",(0,s.jsx)(n.li,{children:"serial"}),"\n",(0,s.jsx)(n.li,{children:"smallint"}),"\n",(0,s.jsx)(n.li,{children:"smallserial"}),"\n",(0,s.jsx)(n.li,{children:"text"}),"\n",(0,s.jsx)(n.li,{children:"time"}),"\n",(0,s.jsx)(n.li,{children:"timestamp"}),"\n",(0,s.jsx)(n.li,{children:"timetz"}),"\n",(0,s.jsx)(n.li,{children:"uuid"}),"\n",(0,s.jsx)(n.li,{children:"varchar"}),"\n",(0,s.jsx)(n.li,{children:"varcharN -- varchar(n)"}),"\n",(0,s.jsx)(n.li,{children:"xid"}),"\n",(0,s.jsx)(n.li,{children:"xml"}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"~"}),": Ignores all remaining attributes in the tuple."]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"-f"}),": Displays a formatted block content dump along with interpretation."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"-h"}),": Displays help information."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"-i"}),": Displays interpreted item details."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"-k"}),": Verifies block checksums."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"-R"}),": Displays specific block ranges within the file (Blocks are indexed from 0).","\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"[startblock]"}),": The block to start at."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"[endblock]"}),": The block to end at (exclusive). If only ",(0,s.jsx)(n.code,{children:"startblock"})," is specified, only that single block will be formatted."]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"-s"}),": Forces the segment size to ",(0,s.jsx)(n.code,{children:"[segsize]"}),"."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"-n"}),": Forces the segment number to ",(0,s.jsx)(n.code,{children:"[segnumber]"}),"."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"-S"}),": Forces the block size to ",(0,s.jsx)(n.code,{children:"[blocksize]"}),"."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"-x"}),": Forces interpreted formatting of block items as index items."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"-y"}),": Forces interpreted formatting of block items as heap items."]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"The following options are available for control files:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"-c"}),": Interprets the specified file as a control file."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"-f"}),": Displays a formatted content dump along with interpretation."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"-S"}),": Forces the block size to ",(0,s.jsx)(n.code,{children:"[blocksize]"}),"."]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["It is recommended to use the ",(0,s.jsx)(n.code,{children:"-i"})," and ",(0,s.jsx)(n.code,{children:"-f"})," options to obtain the most useful dump output."]})]})}function f(e={}){const{wrapper:n}={...(0,l.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}},11151:(e,n,i)=>{i.d(n,{Z:()=>d,a:()=>a});var s=i(67294);const l={},t=s.createContext(l);function a(e){const n=s.useContext(t);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:a(e.components),s.createElement(t.Provider,{value:n},e.children)}}}]);