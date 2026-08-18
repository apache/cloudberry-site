---
title: "Transitioning to Apache Cloudberry (Incubating)"
description: "Notes on transitioning PXF usage from older Greenplum-based deployments to Apache Cloudberry."
source: https://cloudberry.apache.org/pxf/transition_to_cloudberry
---

# Transitioning to Apache Cloudberry (Incubating)

<!--
Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.
-->

The transition of the PXF project to **Apache Cloudberry (Incubating)** involves a significant rebranding effort. As part of this transition, the Java package namespace has been changed from `org.greenplum` to `org.apache.cloudberry`.

This is a user-facing breaking change. If you have customized PXF configuration files in your `$PXF_BASE/conf` directory, you must manually update these files to use the new package names.

## Required Configuration Updates

### Profile Configurations (`pxf-profiles-default.xml`)

PXF uses profiles to define how to access different data sources. These profiles specify Java classes for fragmenters, accessors, and resolvers.

**Action Required**: If you have created custom profiles or overridden default profiles in `pxf-profiles-default.xml` or other `.xml` files in the `conf` directory, you must replace all occurrences of `org.greenplum.pxf` with `org.apache.cloudberry.pxf`.

**Example**:
Old configuration:
```xml
<fragmenter>org.greenplum.pxf.plugins.hdfs.HdfsDataFragmenter</fragmenter>
```
New configuration:
```xml
<fragmenter>org.apache.cloudberry.pxf.plugins.hdfs.HdfsDataFragmenter</fragmenter>
```

### Logging Configuration (`pxf-log4j2.xml`)

The logging configuration uses the package names to define loggers and their levels.

**Action Required**: Update your `$PXF_BASE/conf/pxf-log4j2.xml` file to use the new logger names.

**Example**:
Old configuration:
```xml
<Logger name="org.greenplum.pxf" level="${env:PXF_LOG_LEVEL:-${spring:pxf.log.level}}"/>
```
New configuration:
```xml
<Logger name="org.apache.cloudberry.pxf" level="${env:PXF_LOG_LEVEL:-${spring:pxf.log.level}}"/>
```

### Existing External Tables

If you have created external tables that explicitly specify a class name in the `LOCATION` clause (using `&FRAGMENTER=...`, `&ACCESSOR=...`, or `&RESOLVER=...`), these tables will fail until they are updated to use the new package names.

**Action Required**: Drop and recreate any external tables that refer to classes in the `org.greenplum` namespace.

**Example**:
Old DDL:
```sql
CREATE EXTERNAL TABLE my_table (...)
LOCATION ('pxf://path/to/data?FRAGMENTER=org.greenplum.pxf.api.examples.DemoFragmenter&...')
FORMAT 'CUSTOM' (FORMATTER='pxfwritable_import');
```
New DDL:
```sql
CREATE EXTERNAL TABLE my_table (...)
LOCATION ('pxf://path/to/data?FRAGMENTER=org.apache.cloudberry.pxf.api.examples.DemoFragmenter&...')
FORMAT 'CUSTOM' (FORMATTER='pxfwritable_import');
```

:::note
Tables using built-in profiles (e.g., `?PROFILE=hdfs:text`) do not need DDL changes, provided that the underlying profile definition in `pxf-profiles-default.xml` has been updated.
:::

## Why This Change?

This change aligns the PXF project with the **Apache Software Foundation** standards and the **Apache Cloudberry** branding. Using the `org.apache.cloudberry` namespace ensures consistency with other Apache projects and reflects the project's new home.
