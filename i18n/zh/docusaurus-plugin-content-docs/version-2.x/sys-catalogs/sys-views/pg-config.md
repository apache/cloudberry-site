---
title: pg_config
---

# pg_config

`pg_config` 视图显示 Cloudberry/PostgreSQL 安装的编译时配置参数。它包括安装目录、编译器标志和版本详细信息等信息。访问通常仅限于超级用户。

|列|类型|引用|描述|
|------|----|----------|-----------|
|`name`|text| |参数名称。|
|`setting`|text| |参数值。|
