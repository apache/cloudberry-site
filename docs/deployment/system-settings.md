---
title: Configure System settings
---

Database systems like Apache Cloudberry require specific system resource limits to operate efficiently. These limits should be configured for the `gpadmin` user who runs the database processes.

1. Create resource limits configuration

    Create user limits configuration file:

    ```bash
    sudo tee /etc/security/limits.d/90-db-limits.conf << 'EOF'
    # Core dump file size limits for gpadmin
    gpadmin soft core unlimited
    gpadmin hard core unlimited
    # Open file limits for gpadmin
    gpadmin soft nofile 524288
    gpadmin hard nofile 524288
    # Process limits for gpadmin
    gpadmin soft nproc 131072
    gpadmin hard nproc 131072
    EOF
    ```

2. Understand the limits.

    The configuration sets the following types of resource limits:

    - **Core Dumps** (`core`):

        - Set to `unlimited` to enable complete core dumps
        - Essential for debugging and troubleshooting
        - Both soft and hard limits are unrestricted

    - **Open Files** (`nofile`):

        - Set to `524288` (512K) files
        - Required for handling many concurrent database connections
        - Critical for distributed operations and large workloads

    - **Process Limits** (`nproc`):

        - Set to `131072` (128K) processes
        - Enables parallel query execution
        - Supports Cloudberry's distributed architecture

3. Verify resource limits.

    ```bash
    # Check current limits
    sudo -u gpadmin bash -c "ulimit -a"
    ```