---
title: gp_settings
---

# gp_settings

The `gp_settings` view is a cluster-wide view that displays the `pg_settings` information from every primary segment.

|name|type|references|description|
|----|----|----------|-----------|
|`gp_segment_id`|integer| |Unique identifier of a segment (or coordinator) instance.|
|`name`|text| |Runtime configuration parameter name.
|`setting`|text| |Current value of the parameter.|
|`unit`|text| |Implicit unit of the parameter.|
|`category`|text| |Logical group of the parameter.|
|`short_desc`|text| |A brief description of the parameter.
|`extra_desc`|text| |Additional, more detailed, description of the parameter.|
|`context`|text| |Context required to set the parameter's value.|
|`vartype`|text| |Parameter type (bool, enum, integer, real, or string)v
|`source`|text| |Source of the current parameter value.v
|`min_val`|text| |Minimum allowed value of the parameter (null for non-numeric values).|
|`max_val`|text| |Maximum allowed value of the parameter (null for non-numeric values).|
|`enumvals`|text[]| |Permitted values of an enum parameter (null for non-enum values).|
|`boot_val`|text| |Parameter value assumed at server startup if the parameter is not otherwise set.|
|`reset_val`|text| |Value that RESET would reset the parameter to in the current session.|
|`sourcefile`|text| |Configuration file the current value was set in (null for values set from sources other than configuration files, or when examined by a user who is neither a superuser or a member of `pg_read_all_settings`); helpful when using include directives in configuration files.|
|`sourceline`|integer| |Line number within the configuration file the current value was set at (null for values set from sources other than configuration files, or when examined by a user who is neither a superuser or a member of pg_read_all_settings).|
|`pending_restart`|boolean| |`true` if the value has been changed in the configuration file but needs a restart; otherwise `false`.|
