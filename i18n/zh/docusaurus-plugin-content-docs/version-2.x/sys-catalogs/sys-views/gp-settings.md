---
title: gp_settings
---

# gp_settings

`gp_settings` 视图是一个集群范围的视图，显示来自每个主 Segment 的 `pg_settings` 信息。

|名称|类型|引用|描述|
|----|----|----------|-----------|
|`gp_segment_id`|integer| |Segment (或 Coordinator) 实例的唯一标识符。|
|`name`|text| |运行时配置参数的名称。|
|`setting`|text| |参数的当前值。|
|`unit`|text| |参数的隐式单位。|
|`category`|text| |参数的逻辑分组。|
|`short_desc`|text| |参数的简要描述。|
|`extra_desc`|text| |参数的附加、更详细的描述。|
|`context`|text| |设置参数值所需的上下文。|
|`vartype`|text| |参数类型（bool、enum、integer、real 或 string）。|
|`source`|text| |当前参数值的来源。|
|`min_val`|text| |参数允许的最小值（对于非数字值为空）。|
|`max_val`|text| |参数允许的最大值（对于非数字值为空）。|
|`enumvals`|text[]| |枚举参数的允许值（对于非枚举值为空）。|
|`boot_val`|text| |如果参数未另行设置，服务器启动时假定的参数值。|
|`reset_val`|text| |在当前会话中，`RESET` 会将参数重置到的值。|
|`sourcefile`|text| |设置当前值的配置文件（对于非配置文件来源设置的值，或者当非超级用户或非 `pg_read_all_settings` 成员的用户检查时为空）；在使用配置文件中的 include 指令时很有用。|
|`sourceline`|integer| |配置文件中设置当前值的行号（对于非配置文件来源设置的值，或者当非超级用户或非 `pg_read_all_settings` 成员的用户检查时为空）。|
|`pending_restart`|boolean| |如果值已在配置文件中更改但需要重启，则为 `true`；否则为 `false`。|
