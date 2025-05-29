---
title: Set up a Cloudberry demo cluster
---

This step walks through setting up a Cloudberry demo cluster, and testing basic functionality. The demo cluster includes a coordinator, standby coordinator, and multiple primary/mirror segments all running on a single development host.

## Set up initial container (not required for all environments)

Container environments typically don't start the SSH daemon process by default. Since Cloudberry relies heavily on SSH for inter-process communication, we need to initialize and start the SSH server:

```bash
if ! pgrep sshd > /dev/null; then
    echo "SSH daemon not running. Starting it now..."
    sudo ssh-keygen -A
    echo "PasswordAuthentication yes" | sudo tee -a /etc/ssh/sshd_config
    sudo /usr/sbin/sshd
else
    echo "SSH daemon is already running"
fi
```

## Configure SSH for Cloudberry

Cloudberry uses SSH for coordinator-segment communication. The following commands ensure SSH is properly configured for the gpadmin user by adding the host to known_hosts and verifying SSH connectivity:

```bash
ssh-keyscan $(hostname) >> ~/.ssh/known_hosts
ssh $(hostname) date
```

## Set up Cloudberry environment variables

Load Cloudberry environment variables that set up paths for binaries, libraries, and other essential components:

```bash
source /usr/local/cloudberry-db/greenplum_path.sh
```

## Create development cluster

Create a demo cluster that simulates a full Cloudberry deployment on a single machine. This includes 1 coordinator, 1 standby coordinator, 3 primary segments, and 3 mirror segments:

```bash
make create-demo-cluster --directory=~/cloudberry
```

In the demo cluster, the cooradinator, standby coordinator and segments ports will be as follows:

```
    COORDINATOR PORT (PGPORT). : 7000
    STANDBY PORT ............. : 7001
    SEGMENT PORTS ............ : 7002 7003 7004 7005 7006 7007
```

## Configure cluster environment

After cluster creation, verify and load cluster-specific variables that point to the coordinator port and data directory:

```bash
source ~/cloudberry/gpAux/gpdemo/gpdemo-env.sh
```

## Validate cluster deployment

Verify the cluster is running correctly with these essential commands:

```bash
# Displays detailed cluster state including segment status
gpstate

# Tests cluster shutdown and startup
gpstop -a
gpstart -a

# Confirms Cloudberry version and build
psql template1 -c 'SELECT version()'

# Views segment configuration showing primary/mirror relationships
psql template1 -c 'SELECT * from gp_segment_configuration'

# Checks available PostgreSQL extensions
psql template1 -c 'SELECT * FROM pg_available_extensions'
```

## Connect to the default `postgres` database

To connect to the default `postgres` database, use the following command:

```bash
psql -p 7000 postgres
```

Or

```bash
psql postgres
```

The output will be like this:

```bash
[gpadmin@cdw cloudberry]$ psql -p 7000 postgres
psql (14.4, server 14.4)
Type "help" for help.

postgres=# select version();
                                                                                                             version
------------------------------------------------------------------------------------------------------------------------
 PostgreSQL 14.4 (Apache Cloudberry 2.0.0-devel+dev.1959.g94a81765e6 build dev) on x86_64-pc-linux-gnu, compiled by gcc (GCC
) 11.5.0 20240719 (Red Hat 11.5.0-5), 64-bit compiled on May 28 2025 19:57:16 (with assert checking)
(1 row)

postgres=# \q
```

## Extension Testing Example: pg_stat_statements

This example demonstrates how to enable and test the `pg_stat_statements` extension, which provides statistics about SQL query execution:

```bash
# Creates a database for testing
createdb gpadmin

# Enables the extension by adding it to shared libraries
echo "shared_preload_libraries='pg_stat_statements'" >> $COORDINATOR_DATA_DIRECTORY/postgresql.conf

# Restarts cluster to load the new library (-r flag means "restart")
gpstop -ar

# Creates the extension in the database
psql gpadmin -e -c 'CREATE EXTENSION pg_stat_statements'

# Runs test queries to generate statistics
psql gpadmin --echo-queries <<EOF
-- Create a sample table
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name TEXT,
    department TEXT,
    salary NUMERIC
);

-- Insert sample data
INSERT INTO employees (name, department, salary)
VALUES
('Alice', 'HR', 60000),
('Bob', 'Engineering', 80000),
('Charlie', 'Marketing', 70000);

-- Query the data to generate some statistics
SELECT * FROM employees WHERE department = 'Engineering';
SELECT AVG(salary) FROM employees;

-- View most frequently called queries
SELECT query, calls, total_exec_time AS total_time, rows
FROM pg_stat_statements
ORDER BY calls DESC
LIMIT 5;

-- View most time-consuming queries
SELECT query, calls, total_exec_time AS total_time, rows
FROM pg_stat_statements
ORDER BY total_exec_time DESC
LIMIT 5;
EOF
```

## Destroy development cluster

To clean up and start fresh, you can destroy the demo cluster:

```bash
make destroy-demo-cluster --directory=~/cloudberry
```

This command removes all cluster data and configuration, allowing you to create a new clean cluster if needed.

## Troubleshoot SSH connection issues

When running `create-demo-cluster`, the process may hang if SSH host verification hasn't been completed. This typically manifests as a stalled process waiting for user input to verify the host identity. 

This is why we run:

```bash
ssh-keyscan $(hostname) >> ~/.ssh/known_hosts
```
before creating the cluster. This command automatically adds the host's SSH keys to the known_hosts file, preventing interactive prompts during cluster creation.

If you still encounter SSH issues:

1. Verify that the SSH daemon is running
2. Check that the known_hosts file exists and has the correct permissions
3. Test SSH connectivity with `ssh $(hostname) date` before proceeding with cluster creation
