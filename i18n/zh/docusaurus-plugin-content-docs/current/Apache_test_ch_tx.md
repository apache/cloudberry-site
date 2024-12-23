PostgreSQL 服务器应用程序-pg_controldata
=======
pg_controldata — 显示PostgreSQL数据库集群的控制信息

概要
-------------
`pg_controldata` [_`option`_] [[ `-D` | `--pgdata` ]_`datadir`_]

描述
-------------
`pg_controldata` 打印在 `initdb` 期间初始化的信息，例如目录版本。它还显示有关预写日志记录和检查点处理的信息。这些信息是集群范围的，而不是特定于任何单个数据库的。

此工具只能由初始化集群的用户运行，因为它需要对数据目录的读取访问权限。您可以在命令行上指定数据目录，或者使用环境变量 `PGDATA`。此工具支持选项 `-V` 和 `--version`，它们会打印 `pg_controldata` 的版本并退出。它还支持选项 `-?` 和 `--help`，它们会输出受支持的参数。

环境
-------------

`PGDATA`

默认数据目录位置

`PG_COLOR`

指定是否在诊断消息中使用颜色。可能的值为`always`、`auto`和`never`

提交更正
------------
如果您发现文档中存在任何不正确的内容、与您对特定功能的体验不符或需要进一步说明，请使用 [此表格](https://www.postgresql.org/account/comments/new/14/app-pgcontroldata.html/) 报告文档问题。