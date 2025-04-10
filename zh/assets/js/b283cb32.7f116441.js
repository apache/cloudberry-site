"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[5672],{269:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>l,contentTitle:()=>i,default:()=>f,frontMatter:()=>s,metadata:()=>o,toc:()=>c});var t=a(85893),r=a(11151);const s={title:"\u4ece Kafka \u52a0\u8f7d\u6570\u636e"},i="\u4ece Kafka \u52a0\u8f7d\u6570\u636e",o={id:"data-loading/load-data-from-kafka-using-fdw",title:"\u4ece Kafka \u52a0\u8f7d\u6570\u636e",description:"Kafka Foreign Data Wrapper (FDW) \u63d0\u4f9b\u4e86 Apache Cloudberry \u4e0e Apache Kafka \u8fde\u63a5\u7684\u80fd\u529b\uff0c\u4f7f\u5f97\u6570\u636e\u5e93\u80fd\u591f\u76f4\u63a5\u4ece Kafka \u4e2d\u8bfb\u53d6\u6570\u636e\uff0c\u5e76\u5c06\u5176\u4f5c\u4e3a\u5916\u90e8\u8868\u6765\u5904\u7406\u3002Apache Cloudberry \u7528\u6237\u53ef\u4ee5\u66f4\u9ad8\u6548\u3001\u7075\u6d3b\u3001\u53ef\u9760\u5730\u5904\u7406 Kafka \u4e2d\u7684\u5b9e\u65f6\u6570\u636e\uff0c\u4ece\u800c\u63d0\u9ad8\u6570\u636e\u5904\u7406\u80fd\u529b\u548c\u4e1a\u52a1\u6548\u7387\u3002",source:"@site/i18n/zh/docusaurus-plugin-content-docs/current/data-loading/load-data-from-kafka-using-fdw.md",sourceDirName:"data-loading",slug:"/data-loading/load-data-from-kafka-using-fdw",permalink:"/zh/docs/data-loading/load-data-from-kafka-using-fdw",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/i18n/zh/docusaurus-plugin-content-docs/current/data-loading/load-data-from-kafka-using-fdw.md",tags:[],version:"current",lastUpdatedBy:"Dianjin Wang",lastUpdatedAt:1744271659,formattedLastUpdatedAt:"2025\u5e744\u670810\u65e5",frontMatter:{title:"\u4ece Kafka \u52a0\u8f7d\u6570\u636e"},sidebar:"docsbars",previous:{title:"\u4ece Web \u670d\u52a1\u52a0\u8f7d\u6570\u636e",permalink:"/zh/docs/data-loading/load-data-from-web-services"},next:{title:"\u521b\u5efa\u548c\u7ba1\u7406\u6570\u636e\u5e93",permalink:"/zh/docs/create-and-manage-database"}},l={},c=[{value:"\u57fa\u672c\u4f7f\u7528",id:"\u57fa\u672c\u4f7f\u7528",level:2},{value:"\u652f\u6301\u7684\u6570\u636e\u683c\u5f0f",id:"\u652f\u6301\u7684\u6570\u636e\u683c\u5f0f",level:2},{value:"\u67e5\u8be2",id:"\u67e5\u8be2",level:2},{value:"\u6d88\u606f\u751f\u4ea7\u8005",id:"\u6d88\u606f\u751f\u4ea7\u8005",level:2},{value:"\u6570\u636e\u5bfc\u5165\u529f\u80fd",id:"\u6570\u636e\u5bfc\u5165\u529f\u80fd",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"\u4ece-kafka-\u52a0\u8f7d\u6570\u636e",children:"\u4ece Kafka \u52a0\u8f7d\u6570\u636e"}),"\n",(0,t.jsx)(n.p,{children:"Kafka Foreign Data Wrapper (FDW) \u63d0\u4f9b\u4e86 Apache Cloudberry \u4e0e Apache Kafka \u8fde\u63a5\u7684\u80fd\u529b\uff0c\u4f7f\u5f97\u6570\u636e\u5e93\u80fd\u591f\u76f4\u63a5\u4ece Kafka \u4e2d\u8bfb\u53d6\u6570\u636e\uff0c\u5e76\u5c06\u5176\u4f5c\u4e3a\u5916\u90e8\u8868\u6765\u5904\u7406\u3002Apache Cloudberry \u7528\u6237\u53ef\u4ee5\u66f4\u9ad8\u6548\u3001\u7075\u6d3b\u3001\u53ef\u9760\u5730\u5904\u7406 Kafka \u4e2d\u7684\u5b9e\u65f6\u6570\u636e\uff0c\u4ece\u800c\u63d0\u9ad8\u6570\u636e\u5904\u7406\u80fd\u529b\u548c\u4e1a\u52a1\u6548\u7387\u3002"}),"\n",(0,t.jsx)(n.p,{children:"Apache Cloudberry \u652f\u6301\u4f7f\u7528 Kafka FDW \u6765\u521b\u5efa\u5916\u90e8\u8868\u4ee5\u53ca\u5bfc\u5165\u6570\u636e\u3002"}),"\n",(0,t.jsxs)(n.p,{children:["\u66f4\u591a\u4fe1\u606f\uff0c\u53c2\u8003 Kafka FDW \u4ed3\u5e93\uff1a",(0,t.jsx)(n.a,{href:"https://github.com/cloudberry-contrib/kafka_fdw",children:"https://github.com/cloudberry-contrib/kafka_fdw"}),"\u3002\u6ce8\u610f\uff0c\u8be5\u4ed3\u5e93\u7531\u793e\u533a\u6210\u5458\u8d21\u732e\uff0c\u4f46\u4e0d\u662f\u7531 PPMC \u7ef4\u62a4\u7684\u5b98\u65b9\u793e\u533a\u9879\u76ee\u3002"]}),"\n",(0,t.jsx)(n.h2,{id:"\u57fa\u672c\u4f7f\u7528",children:"\u57fa\u672c\u4f7f\u7528"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["\u521b\u5efa ",(0,t.jsx)(n.code,{children:"kafka_fdw"})," \u6269\u5c55\u3002"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sql",children:"CREATE EXTENSION kafka_fdw;\n"})}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["\u521b\u5efa\u5916\u90e8\u670d\u52a1\u5668\uff0c\u6307\u5b9a Kafka \u7684\u96c6\u7fa4\u5730\u5740\u3002\u4f60\u9700\u8981\u5c06 ",(0,t.jsx)(n.code,{children:"localhost:9092"})," \u66ff\u6362\u4e3a\u4f60\u7684 Kafka \u96c6\u7fa4\u5730\u5740\u3002"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sql",children:"CREATE SERVER kafka_server\nFOREIGN DATA WRAPPER kafka_fdw\nOPTIONS (mpp_execute 'all segments', brokers 'localhost:9092');\n"})}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"\u521b\u5efa user mapping\u3002"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sql",children:"CREATE USER MAPPING FOR PUBLIC SERVER kafka_server;\n"})}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"\u521b\u5efa\u5916\u90e8\u8868"}),"\n",(0,t.jsxs)(n.p,{children:["\u521b\u5efa\u5916\u90e8\u8868\u65f6\uff0c\u5fc5\u987b\u6307\u5b9a\u4e24\u4e2a\u5143\u6570\u636e\u4fe1\u606f\u5217 ",(0,t.jsx)(n.code,{children:"partition"})," \u548c ",(0,t.jsx)(n.code,{children:"offset"}),"\uff0c\u7528\u4e8e\u6807\u8bc6 Kafka \u4e2d\u7684\u4e00\u4e2a Topic \u7684\u6d88\u606f\u6240\u5c5e\u7684\u5206\u533a\u548c\u504f\u79fb\u3002\u4e0b\u9762\u662f\u4e00\u4e2a\u793a\u4f8b\uff1a"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sql",children:"CREATE FOREIGN TABLE kafka_test (\n    part int OPTIONS (partition 'true'),\n    offs bigint OPTIONS (offset 'true'),\n    some_int int,\n    some_text text,\n    some_date date,\n    some_time timestamp\n)\nSERVER kafka_server OPTIONS\n    (format 'csv', topic 'contrib_regress_csv', batch_size '1000', buffer_delay '1000');\n"})}),"\n",(0,t.jsx)(n.p,{children:"\u53c2\u6570\u8bf4\u660e\uff1a"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"batch_size"}),"\uff1a\u4ece Kafka \u8bfb\u53d6\u4e00\u6b21\u6570\u636e\u7684\u91cf\u3002"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"buffer_delay"}),"\uff1a\u4ece Kafka \u83b7\u53d6\u6570\u636e\u7684\u8d85\u65f6\u65f6\u95f4\u3002"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"\u652f\u6301\u7684\u6570\u636e\u683c\u5f0f",children:"\u652f\u6301\u7684\u6570\u636e\u683c\u5f0f"}),"\n",(0,t.jsxs)(n.p,{children:["\u76ee\u524d\u652f\u6301 ",(0,t.jsx)(n.code,{children:"CSV"})," \u548c ",(0,t.jsx)(n.code,{children:"JSON"})," \u4e24\u79cd\u6570\u636e\u683c\u5f0f\u3002"]}),"\n",(0,t.jsx)(n.h2,{id:"\u67e5\u8be2",children:"\u67e5\u8be2"}),"\n",(0,t.jsxs)(n.p,{children:["\u53ef\u4ee5\u5728\u67e5\u8be2\u7684\u65f6\u5019\u6307\u5b9a\u6d88\u606f\u7684\u5206\u533a\u548c\u504f\u79fb\uff0c\u6307\u5b9a ",(0,t.jsx)(n.code,{children:"partition"})," \u6216 ",(0,t.jsx)(n.code,{children:"offset"}),"\uff1a"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sql",children:"SELECT * FROM kafka_test WHERE part = 0 AND offs > 1000 LIMIT 60;\n"})}),"\n",(0,t.jsx)(n.p,{children:"\u4e5f\u53ef\u4ee5\u6307\u5b9a\u591a\u4e2a\u6761\u4ef6\uff1a"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sql",children:"SELECT * FROM kafka_test WHERE (part = 0 AND offs > 100) OR (part = 1 AND offs > 300) OR (part = 3 AND offs > 700);\n"})}),"\n",(0,t.jsx)(n.h2,{id:"\u6d88\u606f\u751f\u4ea7\u8005",children:"\u6d88\u606f\u751f\u4ea7\u8005"}),"\n",(0,t.jsx)(n.p,{children:"\u76ee\u524d Kafka FDW \u652f\u6301\u5411\u5916\u8868\u4e2d\u63d2\u5165\u6570\u636e\uff0c\u5373\u4f5c\u4e3a\u4e86 Kafka \u7684\u6d88\u606f\u751f\u4ea7\u8005\u3002\u53ea\u9700\u8981\u4f7f\u7528 INSERT \u8bed\u53e5\u5373\u53ef\u3002"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sql",children:"INSERT INTO kafka_test(part, some_int, some_text)\nVALUES\n    (0, 5464565, 'some text goes into partition 0'),\n    (1, 5464565, 'some text goes into partition 1'),\n    (0, 5464565, 'some text goes into partition 0'),\n    (3, 5464565, 'some text goes into partition 3'),\n    (NULL, 5464565, 'some text goes into partition selected by kafka');\n"})}),"\n",(0,t.jsxs)(n.p,{children:["\u63d2\u5165\u7684\u65f6\u5019\u53ef\u4ee5\u6307\u5b9a ",(0,t.jsx)(n.code,{children:"partition"})," \u8868\u793a\u63d2\u5165\u5230\u54ea\u4e2a\u5206\u533a\u3002"]}),"\n",(0,t.jsx)(n.h2,{id:"\u6570\u636e\u5bfc\u5165\u529f\u80fd",children:"\u6570\u636e\u5bfc\u5165\u529f\u80fd"}),"\n",(0,t.jsxs)(n.p,{children:["\u5982\u679c\u60f3\u8981\u901a\u8fc7 kafka FDW \u5b9e\u73b0\u7c7b\u4f3c\u6570\u636e\u5bfc\u5165\u7684\u529f\u80fd\uff0c\u60a8\u53ef\u4ee5\u901a\u8fc7\u81ea\u5b9a\u4e49\u51fd\u6570\u6765\u5b9e\u73b0\uff0c\u4f8b\u5982 ",(0,t.jsx)(n.code,{children:"insert into select"})," \u8bed\u53e5\uff0c\u57fa\u672c\u539f\u7406\u662f\u5c06\u5916\u8868\u4e2d\u7684\u6240\u6709\u6570\u636e\u4f9d\u6b21\u53d6\u51fa\u6765\u63d2\u5165\u5230\u76ee\u6807\u8868\u4e2d\u3002"]}),"\n",(0,t.jsx)(n.p,{children:"\u4e0b\u9762\u662f\u4e00\u4e2a\u7b80\u5355\u7684\u793a\u4f8b\uff0c\u60a8\u53ef\u4ee5\u6839\u636e\u5b9e\u9645\u60c5\u51b5\u5bf9\u6b64\u51fd\u6570\u8fdb\u884c\u4fee\u6539\uff1a"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sql",children:"CREATE OR REPLACE FUNCTION import_kafka_data(\n  src_table_name text,\n  dest_table_name text,\n  dest_table_columns text[]\n) RETURNS void AS $$\n\nDECLARE\n    current_row RECORD;\n    current_part integer;\n    current_offs bigint;\n    max_off bigint;\n    import_progress_table_name text;\n    max_off_result bigint;\nBEGIN\n\n    import_progress_table_name := src_table_name || '_import_progress';\n\n    -- \u521b\u5efa\u8fdb\u5ea6\u8bb0\u5f55\u8868\n    EXECUTE FORMAT('CREATE TABLE IF NOT EXISTS %I (part integer PRIMARY KEY, offs bigint NOT NULL)', import_progress_table_name);\n\n    -- \u8868\u7684 topic \u7684 partition \u6570\u91cf\u6709\u53ef\u80fd\u53d1\u751f\u53d8\u5316\uff0c\u6240\u4ee5\u6bcf\u6b21\u5bfc\u5165\u524d\u90fd\u8981\u91cd\u65b0\u521d\u59cb\u5316\n    EXECUTE FORMAT('INSERT INTO %I SELECT DISTINCT part, 0 FROM %I ON CONFLICT (part) DO NOTHING', import_progress_table_name, src_table_name);\n\n    -- \u9010\u4e2a\u5206\u533a\u5bfc\u5165\u6570\u636e\n    FOR current_row IN\n        EXECUTE FORMAT('SELECT part, offs FROM %I', import_progress_table_name)\n    LOOP\n        current_part := current_row.part;\n        current_offs := current_row.offs;\n\n        -- \u83b7\u53d6\u5f53\u524d\u5206\u533a\u7684\u6700\u5927 offset\n        EXECUTE FORMAT('SELECT MAX(offs) FROM %I WHERE part = %s', src_table_name, current_part) INTO max_off_result;\n        max_off := max_off_result;\n\n        -- \u6ca1\u6709\u65b0\u6570\u636e\u8df3\u8fc7\n        IF max_off+1 = current_offs THEN\n            CONTINUE;\n        END IF;\n\n        -- \u5bfc\u5165\u6570\u636e\n        EXECUTE FORMAT('\n            INSERT INTO %I (%s)\n            SELECT %s\n            FROM %I\n            WHERE part = %s AND offs >= %s AND offs <= %s',\n            dest_table_name,\n            array_to_string(dest_table_columns, ', '),\n            array_to_string(dest_table_columns, ', '),\n            src_table_name,\n            current_part,\n            current_offs,\n            max_off\n        );        \n\n        -- \u66f4\u65b0\u5bfc\u5165\u8fdb\u5ea6\n        EXECUTE FORMAT('UPDATE %I SET offs = %s WHERE part = %s', import_progress_table_name, max_off + 1, current_part);\n    END LOOP;\n\n    RETURN;\nEND;\n$$ LANGUAGE plpgsql;\n"})}),"\n",(0,t.jsx)(n.p,{children:"\u6267\u884c\u7684\u65f6\u5019\u53ea\u9700\u8981\u8c03\u7528\u8fd9\u4e2a\u51fd\u6570\uff0c\u4f20\u5165\u5916\u8868\u540d\u79f0\u3001\u76ee\u6807\u8868\u540d\u79f0\u3001\u9700\u8981\u5bfc\u5165\u7684\u5b57\u6bb5\u5373\u53ef\uff0c\u5982\u4e0b\uff1a"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sql",children:"SELECT import_kafka_data('kafka_test', 'dest_table_fdw', ARRAY['some_int', 'some_text', 'some_date', 'some_time']);\n"})})]})}function f(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},11151:(e,n,a)=>{a.d(n,{Z:()=>o,a:()=>i});var t=a(67294);const r={},s=t.createContext(r);function i(e){const n=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),t.createElement(s.Provider,{value:n},e.children)}}}]);