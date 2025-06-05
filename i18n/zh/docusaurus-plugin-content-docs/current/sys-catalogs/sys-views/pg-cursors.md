---
title: pg_cursors
---

# pg_cursors

`pg_cursors` 视图列出了当前可用的游标。游标可以通过以下方式之一定义：

- 通过 `DECLARE` SQL 语句
- 通过前端/后端协议中的 `Bind` 消息
- 通过服务器编程接口 (SPI)

    请注意，Apache Cloudberry 不支持通过 SPI 定义或访问并行检索游标。

游标仅在定义它们的事务期间存在，除非它们被声明为 `WITH HOLD`。非可持有游标只在视图中存在，直到创建它们的事务结束。

:::info 信息
Apache Cloudberry 不支持可持有的并行检索游标。
:::

|名称|类型|引用|描述|
|----|----|----------|-----------|
|`name`|text| |游标的名称。|
|`statement`|text| |提交用于声明此游标的原文查询字符串。|
|`is_holdable`|boolean| |如果游标是可持有的（即，在声明游标的事务提交后可以访问它），则为 `true`；否则为 `false`。<br/><br/>> **注意** Apache Cloudberry 数据库不支持可持有的并行检索游标，对于此类游标，此值始终为 `false`。|
|`is_binary`|boolean| |如果游标被声明为 `BINARY`，则为 `true`；否则为 `false`。|
|`is_scrollable`|boolean| |如果游标是可滚动的（即，它允许以非顺序方式检索行），则为 `true`；否则为 `false`。<br/><br/>> **注意** Apache Cloudberry 数据库不支持可滚动游标，此值始终为 `false`。|
|`creation_time`|timestamptz| |声明游标的时间。|
|`is_parallel`|boolean| |如果游标被声明为 `PARALLEL RETRIEVE`，则为 `true`；否则为 `false`。|
