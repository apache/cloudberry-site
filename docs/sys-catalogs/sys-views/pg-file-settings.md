---
title: pg_file_settings
---

# pg_file_settings

The `pg_file_settings` view provides a summary of the server's configuration files, showing each parameter's name, value, source file, line number, whether it was applied successfully, and any associated error messages. This view is useful for validating configuration changes and diagnosing issues in the configuration files.

|name|type|references|description|
|----|----|----------|-----------|
|`sourcefile`|text| |Full path name of the configuration file.|
|`sourceline`|integer| |Line number within the configuration file where the entry appears.|
|`seqno`|integer| |Order in which the entries are processed (1..n).|
|`name`|text| |Configuration parameter name.|
|`setting`|text| |Value to be assigned to the parameter.|
|`applied`|boolean| |True if the value can be applied successfully.|
|`error`|text| |If not null, an error message indicating why this entry could not be applied.|
