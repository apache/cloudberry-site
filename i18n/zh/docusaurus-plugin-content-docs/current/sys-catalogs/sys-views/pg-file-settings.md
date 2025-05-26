---
title: pg_file_settings
---

# pg_file_settings

`pg_file_settings` 视图提供了服务器配置文件的摘要，显示每个参数的名称、值、源文件、行号、是否成功应用以及任何相关的错误消息。此视图对于验证配置更改和诊断配置文件中的问题非常有用。

|名称|类型|引用|描述|
|----|----|----------|-----------|
|`sourcefile`|text| |配置文件的完整路径名。|
|`sourceline`|integer| |条目出现在配置文件中的行号。|
|`seqno`|integer| |条目处理的顺序 (1..n)。|
|`name`|text| |配置参数名称。|
|`setting`|text| |要分配给参数的值。|
|`applied`|boolean| |如果值可以成功应用，则为 True。|
|`error`|text| |如果非空，则为指示此条目无法应用的错误消息。|
