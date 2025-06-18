---
title: Migration and Upgrade
toc_max_heading_level: 5
---

# Migration and Upgrade

This guide provides detailed instructions for two scenarios:

1. Migrating from Greenplum Database 6.x/7.x to Apache Cloudberry
2. Upgrading from Apache Cloudberry 1.x (non-Apache release before joining the Apache Incubator) to Apache Cloudberry 2.x

Both scenarios utilize the `cbcopy` tool, a powerful data migration utility designed for efficient database migration and upgrade operations.

## Prerequisites

Before starting the migration or upgrade process, ensure you have:

1. Go Programming language version 1.19 or higher installed
2. Superuser privileges on both source and target databases
3. Network connectivity between source and target database clusters
4. Sufficient disk space on both source and target clusters
5. The `cbcopy` and `cbcopy_helper` binaries installed in the `$GPHOME/bin` directory on all nodes of both source and target databases

## Installing cbcopy

1. Clone the repository:
```bash
git clone https://github.com/cloudberry-contrib/cbcopy.git
```

2. Build the binaries:
```bash
cd cbcopy
make
```

3. Install the binaries:
```bash
make install
```

## Version Compatibility

### Cloudberry Upgrade (1.x to 2.x)
- Source: Cloudberry 1.6
- Target: Cloudberry 2.0

### Greenplum to Cloudberry Migration
- Source: Greenplum Database 6.x or 7.x
- Target: Cloudberry 1.x or 2.x

## Migration Process

The migration process consists of two main phases:
1. Metadata migration
2. Data migration

We recommend performing these phases separately for better control and reliability:
1. First migrate metadata using `--metadata-only`
2. Then migrate data using `--data-only`

### Basic Migration Command

```bash
cbcopy --source-host=<source_host> \
    --source-port=<source_port> \
    --source-user=<source_user> \
    --dest-host=<dest_host> \
    --dest-port=<dest_port> \
    --dest-user=<dest_user> \
    [additional_options]
```

### Migration Modes

cbcopy supports several migration modes:

1. **Full Migration** (`--full`)
   - Migrates all metadata and data from source to target

2. **Database Migration** (`--dbname`)
   - Migrates specific database(s)
   ```bash
   cbcopy --dbname="database1,database2" [other_options]
   ```

3. **Schema Migration** (`--schema`)
   - Migrates specific schema(s)
   ```bash
   cbcopy --schema="database.schema1,database.schema2" [other_options]
   ```

4. **Table Migration** (`--include-table`)
   - Migrates specific table(s)
   ```bash
   cbcopy --include-table="database.schema.table1,database.schema.table2" [other_options]
   ```

### Data Loading Options

1. **Append Mode** (`--append`)
   - Inserts migrated records into existing tables
   - Use when you want to preserve existing data

2. **Truncate Mode** (`--truncate`)
   - Clears existing records before inserting migrated data
   - Use when you want to replace existing data
   ```bash
   cbcopy --truncate [other_options]
   ```

### Handling Dependencies

#### Global Objects
For tables depending on global objects (e.g., tablespaces):

1. Use `--with-global-metadata` to automatically create these objects
2. Or manually create them before migration:
   ```sql
   CREATE TABLESPACE custom_tablespace LOCATION '/path/to/tablespace';
   ```

#### Role Management
To change table ownership during migration:

1. Create target roles in the target database
2. Use `--owner-mapping-file` to specify role mappings:
   ```
   source_role1,target_role1
   source_role2,target_role2
   ```

### Tablespace Management

Three options for handling tablespaces:

1. **Default Mode**
   - Objects created in same tablespace names as source
   - Use `--with-global-metadata` or manually create tablespaces

2. **Single Target Tablespace** (`--dest-tablespace`)
   ```bash
   cbcopy --dest-tablespace=new_space [other_options]
   ```

3. **Tablespace Mapping** (`--tablespace-mapping-file`)
   ```
   source_tablespace1,target_tablespace1
   source_tablespace2,target_tablespace2
   ```

### Performance Optimization

1. **Parallel Jobs**
   - Control concurrent table copies with `--copy-jobs`
   ```bash
   cbcopy --copy-jobs=8 [other_options]
   ```

2. **Copy Strategies**
   cbcopy automatically selects the optimal strategy based on table size:
   - Copy On Coordinator: For small tables
   - Copy On Segment: For large tables with matching cluster configurations
   - Copy on External Table: For other cases

### Migration Validation

cbcopy performs automatic validation by comparing row counts between source and target. Failed migrations are logged in:
- `$USER/gpAdminLogs/cbcopy_succeed_$timestamp`
- `$USER/gpAdminLogs/cbcopy_failed_$timestamp`

For retry attempts, use:
```bash
cbcopy --exclude-table-file=cbcopy_succeed_$timestamp [other_options]
```

## Example Scenarios

### Scenario 1: Cloudberry 1.6 to 2.0 Upgrade

```bash
# Step 1: Migrate metadata
cbcopy --source-host=127.0.0.1 \
    --source-port=15432 \
    --source-user=gpadmin \
    --dest-host=127.0.0.1 \
    --dest-port=25432 \
    --dest-user=gpadmin \
    --full \
    --metadata-only

# Step 2: Migrate data
cbcopy --source-host=127.0.0.1 \
    --source-port=15432 \
    --source-user=gpadmin \
    --dest-host=127.0.0.1 \
    --dest-port=25432 \
    --dest-user=gpadmin \
    --full \
    --data-only \
    --truncate
```

### Scenario 2: Greenplum 6.x/7.x to Cloudberry 2.0 Migration

```bash
# Step 1: Migrate metadata with global objects
cbcopy --source-host=127.0.0.1 \
    --source-port=15432 \
    --source-user=gpadmin \
    --dest-host=127.0.0.1 \
    --dest-port=25432 \
    --dest-user=gpadmin \
    --full \
    --metadata-only \
    --with-global-metadata

# Step 2: Migrate data
cbcopy --source-host=127.0.0.1 \
    --source-port=15432 \
    --source-user=gpadmin \
    --dest-host=127.0.0.1 \
    --dest-port=25432 \
    --dest-user=gpadmin \
    --full \
    --data-only \
    --truncate \
    --copy-jobs=8
```

## Troubleshooting

1. **Failed Migrations**
   - Check `$USER/gpAdminLogs/cbcopy_$timestamp.log` for detailed error messages
   - Use the success/failure files to retry failed migrations

2. **Common Issues**
   - Ensure all required tablespaces exist in target database
   - Verify network connectivity between source and target
   - Check user permissions on both databases
   - Ensure sufficient disk space on both clusters

## Additional Resources

- [cbcopy GitHub Repository](https://github.com/cloudberry-contrib/cbcopy)


:::note
cbcopy is contributed by community members; however, please note that it is not maintained as an official Cloudberry project yet.
:::

