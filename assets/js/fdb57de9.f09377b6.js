"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[1982],{77024:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>d,contentTitle:()=>i,default:()=>f,frontMatter:()=>s,metadata:()=>o,toc:()=>c});var n=t(85893),r=t(11151);const s={title:"Load Data from Kafka Using Kafka FDW"},i="Load Data from Kafka Using Kafka FDW",o={id:"data-loading/load-data-from-kafka-using-fdw",title:"Load Data from Kafka Using Kafka FDW",description:"Kafka Foreign Data Wrapper (FDW) allows Apache Cloudberry to connect directly to Apache Kafka, enabling it to read and process Kafka data as external tables. This integration improves the efficiency, flexibility, and reliability of real-time Kafka data processing, enhancing data operations and business performance.",source:"@site/docs/data-loading/load-data-from-kafka-using-fdw.md",sourceDirName:"data-loading",slug:"/data-loading/load-data-from-kafka-using-fdw",permalink:"/docs/data-loading/load-data-from-kafka-using-fdw",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/data-loading/load-data-from-kafka-using-fdw.md",tags:[],version:"current",lastUpdatedBy:"dependabot[bot]",lastUpdatedAt:1744180221,formattedLastUpdatedAt:"Apr 9, 2025",frontMatter:{title:"Load Data from Kafka Using Kafka FDW"},sidebar:"docsbars",previous:{title:"Load Data from Web Services",permalink:"/docs/data-loading/load-data-from-web-services"},next:{title:"Create and Manage Database",permalink:"/docs/create-and-manage-database"}},d={},c=[{value:"Basic usage",id:"basic-usage",level:2},{value:"Supported data formats",id:"supported-data-formats",level:2},{value:"Query",id:"query",level:2},{value:"Message producer",id:"message-producer",level:2},{value:"Data import",id:"data-import",level:2}];function l(e){const a={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(a.h1,{id:"load-data-from-kafka-using-kafka-fdw",children:"Load Data from Kafka Using Kafka FDW"}),"\n",(0,n.jsx)(a.p,{children:"Kafka Foreign Data Wrapper (FDW) allows Apache Cloudberry to connect directly to Apache Kafka, enabling it to read and process Kafka data as external tables. This integration improves the efficiency, flexibility, and reliability of real-time Kafka data processing, enhancing data operations and business performance."}),"\n",(0,n.jsx)(a.p,{children:"Apache Cloudberry supports using Kafka FDW to create external tables and import data."}),"\n",(0,n.jsxs)(a.p,{children:["See the Kafka FDW repository for more information: ",(0,n.jsx)(a.a,{href:"https://github.com/cloudberry-contrib/kafka_fdw",children:"https://github.com/cloudberry-contrib/kafka_fdw"}),". Note that this repo is contributed by the community members, but it is not maintained by the PPMC as an official community project."]}),"\n",(0,n.jsx)(a.h2,{id:"basic-usage",children:"Basic usage"}),"\n",(0,n.jsxs)(a.ul,{children:["\n",(0,n.jsxs)(a.li,{children:["\n",(0,n.jsxs)(a.p,{children:["Create the ",(0,n.jsx)(a.code,{children:"kafka_fdw"})," extension:"]}),"\n",(0,n.jsx)(a.pre,{children:(0,n.jsx)(a.code,{className:"language-sql",children:"CREATE EXTENSION kafka_fdw;\n"})}),"\n"]}),"\n",(0,n.jsxs)(a.li,{children:["\n",(0,n.jsxs)(a.p,{children:["Create an external server and specify Kafka's cluster address. You need to replace ",(0,n.jsx)(a.code,{children:"localhost:9092"})," with your Kafka cluster address."]}),"\n",(0,n.jsx)(a.pre,{children:(0,n.jsx)(a.code,{className:"language-sql",children:"CREATE SERVER kafka_server\nFOREIGN DATA WRAPPER kafka_fdw\nOPTIONS (mpp_execute 'all segments', brokers 'localhost:9092');\n"})}),"\n"]}),"\n",(0,n.jsxs)(a.li,{children:["\n",(0,n.jsx)(a.p,{children:"Create user mapping:"}),"\n",(0,n.jsx)(a.pre,{children:(0,n.jsx)(a.code,{className:"language-sql",children:"CREATE USER MAPPING FOR PUBLIC SERVER kafka_server;\n"})}),"\n"]}),"\n",(0,n.jsxs)(a.li,{children:["\n",(0,n.jsx)(a.p,{children:"Create an external table:"}),"\n",(0,n.jsxs)(a.p,{children:["When creating an external table, you need to specify two metadata columns: ",(0,n.jsx)(a.code,{children:"partition"})," and ",(0,n.jsx)(a.code,{children:"offset"}),", which identify the partition and offset of messages in a Kafka topic. Here is an example:"]}),"\n",(0,n.jsx)(a.pre,{children:(0,n.jsx)(a.code,{className:"language-sql",children:"CREATE FOREIGN TABLE kafka_test (\n    part int OPTIONS (partition 'true'),\n    offs bigint OPTIONS (offset 'true'),\n    some_int int,\n    some_text text,\n    some_date date,\n    some_time timestamp\n)\nSERVER kafka_server OPTIONS\n    (format 'csv', topic 'contrib_regress_csv', batch_size '1000', buffer_delay '1000');\n"})}),"\n",(0,n.jsx)(a.p,{children:"Parameter description:"}),"\n",(0,n.jsxs)(a.ul,{children:["\n",(0,n.jsxs)(a.li,{children:[(0,n.jsx)(a.code,{children:"batch_size"}),": The size of data read from Kafka at once."]}),"\n",(0,n.jsxs)(a.li,{children:[(0,n.jsx)(a.code,{children:"buffer_delay"}),": The timeout for getting data from Kafka."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,n.jsx)(a.h2,{id:"supported-data-formats",children:"Supported data formats"}),"\n",(0,n.jsxs)(a.p,{children:["Currently, ",(0,n.jsx)(a.code,{children:"CSV"})," and ",(0,n.jsx)(a.code,{children:"JSON"})," data formats are supported."]}),"\n",(0,n.jsx)(a.h2,{id:"query",children:"Query"}),"\n",(0,n.jsxs)(a.p,{children:["You can specify the message partition and offset in your query by using the ",(0,n.jsx)(a.code,{children:"partition"})," or ",(0,n.jsx)(a.code,{children:"offset"})," column condition:"]}),"\n",(0,n.jsx)(a.pre,{children:(0,n.jsx)(a.code,{className:"language-sql",children:"SELECT * FROM kafka_test WHERE part = 0 AND offs > 1000 LIMIT 60;\n"})}),"\n",(0,n.jsx)(a.p,{children:"You can also specify multiple conditions:"}),"\n",(0,n.jsx)(a.pre,{children:(0,n.jsx)(a.code,{className:"language-sql",children:"SELECT * FROM kafka_test WHERE (part = 0 AND offs > 100) OR (part = 1 AND offs > 300) OR (part = 3 AND offs > 700);\n"})}),"\n",(0,n.jsx)(a.h2,{id:"message-producer",children:"Message producer"}),"\n",(0,n.jsxs)(a.p,{children:["Currently, Kafka FDW supports inserting data into external tables, which acts as a message producer for Kafka. You only need to use the ",(0,n.jsx)(a.code,{children:"INSERT"})," statement."]}),"\n",(0,n.jsx)(a.pre,{children:(0,n.jsx)(a.code,{className:"language-sql",children:"INSERT INTO kafka_test(part, some_int, some_text)\nVALUES\n    (0, 5464565, 'some text goes into partition 0'),\n    (1, 5464565, 'some text goes into partition 1'),\n    (0, 5464565, 'some text goes into partition 0'),\n    (3, 5464565, 'some text goes into partition 3'),\n    (NULL, 5464565, 'some text goes into partition selected by kafka');\n"})}),"\n",(0,n.jsxs)(a.p,{children:["When inserting data, you can specify ",(0,n.jsx)(a.code,{children:"partition"})," to specify which partition to insert into."]}),"\n",(0,n.jsx)(a.h2,{id:"data-import",children:"Data import"}),"\n",(0,n.jsxs)(a.p,{children:["To use Kafka FDW for data import, you can create custom functions, such as the ",(0,n.jsx)(a.code,{children:"INSERT INTO SELECT"})," statement. The basic principle is to fetch all data from the external table and insert it into the target table sequentially."]}),"\n",(0,n.jsx)(a.p,{children:"Here is a simple example, which you can modify according to your needs:"}),"\n",(0,n.jsx)(a.pre,{children:(0,n.jsx)(a.code,{className:"language-sql",children:"CREATE OR REPLACE FUNCTION import_kafka_data(\n  src_table_name text,\n  dest_table_name text,\n  dest_table_columns text[]\n) RETURNS void AS $$\n\nDECLARE\n    current_row RECORD;\n    current_part integer;\n    current_offs bigint;\n    max_off bigint;\n    import_progress_table_name text;\n    max_off_result bigint;\nBEGIN\n\n    import_progress_table_name := src_table_name || '_import_progress';\n\n    -- Creates progress record table.\n    EXECUTE FORMAT('CREATE TABLE IF NOT EXISTS %I (part integer PRIMARY KEY, offs bigint NOT NULL)', import_progress_table_name);\n\n    -- The number of partitions in the topic table might change, so reinitialize before each import.\n    EXECUTE FORMAT('INSERT INTO %I SELECT DISTINCT part, 0 FROM %I ON CONFLICT (part) DO NOTHING', import_progress_table_name, src_table_name);\n\n    -- Imports data partition by partition.\n    FOR current_row IN\n        EXECUTE FORMAT('SELECT part, offs FROM %I', import_progress_table_name)\n    LOOP\n        current_part := current_row.part;\n        current_offs := current_row.offs;\n\n        -- Gets the maximum offset for the current partition.\n        EXECUTE FORMAT('SELECT MAX(offs) FROM %I WHERE part = %s', src_table_name, current_part) INTO max_off_result;\n        max_off := max_off_result;\n\n        -- Skips if there is no new data.\n        IF max_off+1 = current_offs THEN\n            CONTINUE;\n        END IF;\n\n        -- Imports data.\n        EXECUTE FORMAT('\n            INSERT INTO %I (%s)\n            SELECT %s\n            FROM %I\n            WHERE part = %s AND offs >= %s AND offs <= %s',\n            dest_table_name,\n            array_to_string(dest_table_columns, ', '),\n            array_to_string(dest_table_columns, ', '),\n            src_table_name,\n            current_part,\n            current_offs,\n            max_off\n        );        \n\n        -- Updates import progress.\n        EXECUTE FORMAT('UPDATE %I SET offs = %s WHERE part = %s', import_progress_table_name, max_off + 1, current_part);\n    END LOOP;\n\n    RETURN;\nEND;\n$$ LANGUAGE plpgsql;\n"})}),"\n",(0,n.jsx)(a.p,{children:"When executing the query, call this function, passing in the external table name, target table name, and the fields to be imported. Here is an example:"}),"\n",(0,n.jsx)(a.pre,{children:(0,n.jsx)(a.code,{className:"language-sql",children:"SELECT import_kafka_data('kafka_test', 'dest_table_fdw', ARRAY['some_int', 'some_text', 'some_date', 'some_time']);\n"})})]})}function f(e={}){const{wrapper:a}={...(0,r.a)(),...e.components};return a?(0,n.jsx)(a,{...e,children:(0,n.jsx)(l,{...e})}):l(e)}},11151:(e,a,t)=>{t.d(a,{Z:()=>o,a:()=>i});var n=t(67294);const r={},s=n.createContext(r);function i(e){const a=n.useContext(s);return n.useMemo((function(){return"function"==typeof e?e(a):{...a,...e}}),[a,e])}function o(e){let a;return a=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),n.createElement(s.Provider,{value:a},e.children)}}}]);