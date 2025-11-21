# Use PL/Container

PL/Container allows you to run procedural language functions inside Docker containers, mitigating the security risks associated with running Python or R code directly on Apache Cloudberry segment hosts. This document introduces the architecture, configuration, usage, and advanced topics of PL/Container.

## About the PL/Container language extension

The PL/Container language extension allows you to securely create and run PL/Python or PL/R user-defined functions (UDFs) inside Docker containers. Docker provides the ability to package and run an application in a loosely isolated environment called a container.

Running UDFs inside a Docker container ensures that:

- The function execution occurs in an isolated environment, decoupling data processing.
- The user code cannot access the host's operating system or file system.
- The user code does not introduce any security risks.
- If the container is started with limited or no network access, the function cannot connect back to the database.

### PL/Container architecture

Example of the process flow:

1. When a query calls a PL/Container function, the Query Executor (QE) on a segment host starts a container and communicates with it to get results. The container might call back to the database to execute SQL queries via the Server Programming Interface (SPI) and then returns the final results to the QE.

2. A container in standby mode waits for a socket connection without consuming any CPU resources. When the Apache Cloudberry database session that started it is closed, the container connection is also closed, and the container shuts down.

## Configure and use PL/Container

You do not need to install an extension package to use PL/Container in Apache Cloudberry. You only need to configure the Docker environment and enable the extension in the database.

### Prerequisites

- Docker is installed on all Apache Cloudberry database hosts (coordinator and all segments).
- The minimum Linux kernel version is 3.10.
- The minimum Docker version is 19.03.

### Step 1: Install Docker

You need to install Docker on all Apache Cloudberry database hosts. The following is an installation example on CentOS 7:

1. Ensure the current user has `sudo` privileges or is the `root` user.

2. Install the dependencies required for Docker:

    ```bash
    sudo yum install -y yum-utils device-mapper-persistent-data lvm2
    ```

3. Add the Docker software repository:

    ```bash
    sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
    ```

4. Install Docker:

    ```bash
    sudo yum -y install docker-ce
    ```

5. Start the Docker service:

    ```bash
    sudo systemctl start docker
    ```

6. Add the Apache Cloudberry database administrator user (usually `gpadmin`) to the `docker` group so that it can manage Docker images and containers:

    ```bash
    sudo usermod -aG docker gpadmin
    ```

7. Log out of the current session and log back in for the permissions to take effect.

8. Configure Docker to start on boot:

    ```bash
    sudo systemctl enable docker.service
    ```

9. Test whether Docker is installed successfully. This command lists the currently running containers (which should be empty at this point):

    ```bash
    docker ps
    ```

10. After installing Docker on all hosts, restart the Apache Cloudberry database for the changes to take effect:

    ```bash
    gpstop -ra
    ```

### Step 2: Enable PL/Container

PL/Container is a built-in extension in Apache Cloudberry. You only need to run one command in the database where you want to use it to enable it.

1. Connect to the target database using `psql`:

    ```bash
    psql -d your_database_name
    ```

2. Run the `CREATE EXTENSION` command:

    ```sql
    CREATE EXTENSION plcontainer;
    ```

    After successful execution, PL/Container is activated in that database.

### Step 3: Install and configure Docker images

PL/Container requires specific Docker images to create containers for running UDFs.

1. Obtain the PL/Container Docker image file (for example, `plcontainer-python3-image-*.tar.gz`) from trusted sources.

2. Use the `plcontainer image-add` command to install the image on all Apache Cloudberry hosts. Use the `-f` option to specify the path to the image file.

    :::{note}
    Make sure that your system has the `rsync` dependency; otherwise, the following commands will fail.
    :::

    ```bash
    # Installs a Python 3 based Docker image.
    plcontainer image-add -f /path/to/your/plcontainer-python3-image.tar.gz
    
    # Installs an R based Docker image.
    plcontainer image-add -f /path/to/your/plcontainer-r-image.tar.gz
    ```

3. Use the `plcontainer image-list` command to view the installed images:

    ```bash
    plcontainer image-list
    ```

4. Use the `plcontainer runtime-add` command to register the installed image as a "runtime" so that it can be called in functions.

    - `-r`: Specify the name of the runtime (custom).
    - `-i`: Specify the associated Docker image.
    - `-l`: Specify the language supported by this runtime (`python`, `python3`, or `r`).

    ```bash
    # Adds a Python 3 runtime.
    plcontainer runtime-add -r plc_python3_shared -i pivotaldata/plcontainer_python3_shared:devel -l python3
    
    # Adds an R runtime.
    plcontainer runtime-add -r plc_r_shared -i pivotaldata/plcontainer_r_shared:devel -l r
    ```

### Step 4: Test the installation

1. Connect to the database where PL/Container is enabled using `psql`.

2. Create a simple function to test the Python runtime. Note the `# container:` comment, which specifies the runtime ID used by the function.

    ```sql
    CREATE FUNCTION dummy_python() RETURNS text AS $$
    # container: plc_python3_shared
    return 'Hello from Python in a container'
    $$ LANGUAGE plcontainer;
    ```

3. Call the function to test it:

    ```sql
    SELECT dummy_python();
    ```

4. Similarly, you can create a function to test the R runtime:

    ```sql
    CREATE FUNCTION dummy_r() RETURNS text AS $$
    # container: plc_r_shared
    return ('Hello from R in a container')
    $$ LANGUAGE plcontainer;
    ```

5. Call the function to perform a test:

    ```sql
    SELECT dummy_r();
    ```

## Write PL/Container functions

When you enable the PL/Container extension in a database, the `plcontainer` language is registered. You can write functions in PL/Container-supported languages, such as Python or R, by specifying `LANGUAGE plcontainer` in a user-defined function (UDF).

The PL/Container configuration file is read only when the first PL/Container function is called in each database session. If you modify the configuration externally, you can force a reload by running `SELECT * FROM plcontainer_refresh_config;` within the session.

### Function definition

To create a PL/Container function, the UDF you define must include the following elements:

- **Container declaration**: The first line of the function body must be `# container: ID`, where `ID` is the runtime ID you defined with `plcontainer runtime-add`.
- **Language declaration**: The `LANGUAGE` attribute of the function must be `plcontainer`.

If the `# container` line in a UDF specifies an ID that does not exist in the PL/Container configuration file, the database returns an error when trying to run the UDF.

### Function examples

Here are some basic function examples. Ensure that the `# container` ID in the examples matches the runtime ID you have configured.

**PL/Python example:**

```sql
CREATE OR REPLACE FUNCTION pylog100() RETURNS double precision AS $$
 # container: plc_python3_shared
 import math
 return math.log10(100)
$$ LANGUAGE plcontainer;

SELECT pylog100();
```

**PL/R example:**

```sql
CREATE OR REPLACE FUNCTION rlog100() RETURNS text AS $$
# container: plc_r_shared
return(log10(100))
$$ LANGUAGE plcontainer;

SELECT rlog100();
```

### About PL/Python functions

#### PL/Python 2 vs. PL/Python 3

- PL/Container supports Python 2.7 and Python 3.6+.
- If you want to use PL/Container to run functions for both Python 2 and Python 3, you need to create two different user-defined functions for them.
- Note that UDFs written for Python 2 might not run directly in Python 3.

#### Database interaction (`plpy` module)

The `plpy` module provides a set of methods for interacting with the database:

- `plpy.execute(stmt)`: Executes a SQL query string and returns the result as a list of dictionaries.
- `plpy.prepare(stmt[, argtypes])`: Prepares a query plan.
- `plpy.execute(plan[, argtypes])`: Executes a prepared query plan.
- `plpy.debug(msg)`, `plpy.log(msg)`, `plpy.info(msg)`, `plpy.notice(msg)`, `plpy.warning(msg)`, `plpy.error(msg)`, `plpy.fatal(msg)`: Sends log messages of different levels to the database logging system. An `ERROR` or `FATAL` level error aborts the transaction.
- `plpy.subtransaction()`: Manages explicit subtransactions.

#### String quoting

The `plpy` module supports several useful string quoting functions for building dynamic queries:

- `plpy.quote_literal(string)`: Quotes a string as a literal in a SQL statement, correctly handling single quotes and backslashes.
- `plpy.quote_nullable(string)`: Same as above, but returns `NULL` if the input is `null`.
- `plpy.quote_ident(string)`: Quotes a string as an identifier in a SQL statement, adding quotes only when necessary.

#### Global dictionaries

The `plpy` module provides two special global dictionaries for persisting data between function calls:

- **GD (Global Dictionary)**: This dictionary is shared among all function calls within the same container. The data persists as long as the container instance is alive.
- **SD (Static Dictionary)**: This dictionary shares data only between multiple calls to the same function.

:::note
Note that the lifecycle of a container is associated with a session. When an idle session is terminated by the database, the related containers are destroyed, and the data in GD and SD will be lost.
:::

### About PL/R functions

The `pg.spi` module in PL/Container provides methods for the R language to interact with the database:

- `pg.spi.exec(stmt)`: Executes a SQL query and returns an R `data.frame`.
- `pg.spi.prepare(stmt[, argtypes])`: Prepares a query plan.
- `pg.spi.execp(plan[, argtypes])`: Executes a prepared query plan.
- `pg.spi.debug(msg)`, `pg.spi.log(msg)`, `pg.spi.info(msg)`, `pg.spi.notice(msg)`, `pg.spi.warning(msg)`, `pg.spi.error(msg)`, `pg.spi.fatal(msg)`: Sends log messages of different levels to the database logging system.

### Function limitations

Note the following limitations when using PL/Container:

- Database domains are not supported.
- Multidimensional arrays are not supported.
- Call stack information for Python and R is not displayed when debugging UDFs.
- The `nrows()` and `status()` methods of `plpy.execute()` are not supported.
- The `plpy.SPIError()` method of PL/Python is not supported.
- Running the `SAVEPOINT` command in `plpy.execute()` is not supported.
- Container flow control is not supported.
- Triggers are not supported.
- `OUT` parameters are not supported.
- PL/Python functions cannot directly return a Python `dict` type, but it can be converted to a database user-defined type (UDT) before returning.

## Manage PL/Container

### Manage configurations and containers in a session

PL/Container provides some built-in views and functions to help you view and manage configurations within a database session.

- **Refresh configuration**: If you modify the `plcontainer_configuration.xml` file externally, you can run the following command in a session to force a configuration reload without restarting the database.

    ```sql
    SELECT * FROM plcontainer_refresh_config;
    ```

    This command returns the status of the configuration refresh on the coordinator and all segment instances.

- **View current configuration**:

    ```sql
    SELECT * FROM plcontainer_show_config;
    ```

    This command executes a PL/Container function to display configuration information from the coordinator and all segment instances.

- **View running containers**:

    ```sql
    SELECT * FROM plcontainer_containers_summary();
    ```

    If run by a regular user, this function only displays the containers created by that user. If run by a superuser, it displays containers created by all users. The output includes segment ID, container ID, runtime, owner, and memory usage.

## Advanced topics

### Resource management

Docker containers share CPU and memory resources with the Apache Cloudberry database service on the same host. By default, the database is unaware of the resources consumed by PL/Container instances. You can use the database's resource group feature to control the total CPU resource usage of PL/Container instances.

PL/Container manages resources at two levels: container level and runtime level. You can control container-level CPU and memory resources by configuring `memory_mb` and `cpu_share` settings for a runtime. `memory_mb` controls the memory resources available to each container instance, while `cpu_share` defines the CPU usage weight of a container relative to others.

:::{note}
If you do not explicitly configure a resource group for a PL/Container runtime, its container instances will only be limited by system resources. This can lead to containers consuming excessive resources, thus affecting the performance of the database server.
:::

#### Configuration process

To use resource groups to manage PL/Container's CPU resources, you need to explicitly configure both resource groups and PL/Container.

1. **Plan resource allocation**:

    - Analyze the resource usage of your deployment environment to determine the percentage of CPU resources to allocate to PL/Container Docker containers.
    - Decide how to distribute these resources among different PL/Container runtimes. Clarify the required number of resource groups, the CPU percentage for each group, and the mapping between resource groups and runtimes.

2. **Create resource groups**: Create resource groups according to your plan. For example, assume you decide to allocate 25% of CPU resources to PL/Container and distribute it between two different resource groups in a 60/40 ratio:

    ```sql
    -- Creates a resource group for the R runtime, allocating 15% CPU.
    CREATE RESOURCE GROUP plr_run1_rg WITH (CONCURRENCY=0, CPU_MAX_PERCENT=15);
    
    -- Creates a resource group for the Python runtime, allocating 10% CPU.
    CREATE RESOURCE GROUP plpy_run1_rg WITH (CONCURRENCY=0, CPU_MAX_PERCENT=10);
    ```

3. **Get resource group IDs**: Query the `gp_toolkit.gp_resgroup_config` view to get the `groupid` of the resource groups you created.

    ```sql
    SELECT groupname, groupid FROM gp_toolkit.gp_resgroup_config
    WHERE groupname IN ('plpy_run1_rg', 'plr_run1_rg');
    
    -- Example output:
    --  groupname   |  groupid
    -- --------------+----------
    --  plpy_run1_rg |   16391
    --  plr_run1_rg  |   16393
    -- (2 rows)
    ```

4. **Assign resource groups to runtimes**: Use the `plcontainer runtime-add` (for a new runtime) or `plcontainer runtime-replace` (for an existing runtime) command to assign a resource group via the `-s resource_group_id=<groupid>` parameter.

    ```bash
    # Assigns a resource group to the new python_run1 runtime.
    plcontainer runtime-add -r python_run1 -i pivotaldata/plcontainer_python_shared:devel -l python -s resource_group_id=16391
    
    # Replaces and assigns a resource group to the existing r_run1 runtime.
    plcontainer runtime-replace -r r_run1 -i pivotaldata/plcontainer_r_shared:devel -l r -s resource_group_id=16393
    ```

    You can also use the `plcontainer runtime-edit` command to manually edit the configuration file to assign a resource group.

After assigning a resource group to a runtime, all container instances that share this runtime configuration will be subject to the CPU limits of that group's configuration. If you delete a PL/Container resource group that is in use, the database will terminate the running containers.

### Logging

When the logging feature of PL/Container is enabled, you can set the log level (default is `warning`) through the database's `log_min_messages` parameter. This parameter controls the log level for both the database and PL/Container.

-   **Enable logging**: PL/Container logging is enabled per runtime ID and controlled by the `use_container_logging` setting, which defaults to no logging.
-   **Log content and location**: PL/Container log messages originate from UDFs running in Docker containers. On Red Hat 8 systems, log messages are sent to the `journald` service by default. Database log messages are sent to the log files on the coordinator node.
-   **Dynamically adjust log level**: When testing or troubleshooting, you can use the `SET` command in a session to temporarily change the log level, for example, to `debug1`.

    ```sql
    SET log_min_messages='debug1';
    ```

:::note
The `log_min_messages` parameter affects logging for both the database and PL/Container. Increasing the log level might affect database performance, even if no PL/Container functions are running.
:::

### Use CUDA for GPU acceleration

PL/Container supports using NVIDIA GPUs for computational acceleration. This requires you to prepare a custom Docker image containing the CUDA Toolkit and corresponding Python libraries (such as PyCUDA) and configure it accordingly.

#### Prerequisites

- Docker engine version is not lower than v19.03.
- PL/Container version is not lower than 2.2.0.
- At least one NVIDIA GPU is on the host, and the corresponding GPU driver is installed.
- NVIDIA Container Toolkit is installed, and it is verified that the `nvidia-docker` image can successfully use the GPU.

#### Install and customize the PL/Container image

1. **Load the base image**: Obtain the PL/Container Python 3 image from official channels and load it into Docker.

    ```bash
    docker image load < plcontainer-python3-image-*.tar.gz
    ```

2. **Customize the image**: Create a Dockerfile to add the CUDA runtime and the `pycuda` library to the base image. The following is an example Dockerfile content for adding CUDA 11.7 and `pycuda` 2021.1:

    ```dockerfile
    FROM pivotaldata/plcontainer_python3_shared:devel
    
    ENV XKBLAYOUT=en
    ENV DEBIAN_FRONTEND=noninteractive
    
    # Install CUDA from https://developer.nvidia.com/cuda-downloads
    # By downloading and using the software, you agree to fully comply with the terms and conditions of the CUDA EULA.
    RUN true &&\
        wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu1804/x86_64/cuda-ubuntu1804.pin && \
        mv cuda-ubuntu1804.pin /etc/apt/preferences.d/cuda-repository-pin-600 && \
        wget https://developer.download.nvidia.com/compute/cuda/11.7.0/local_installers/cuda-repo-ubuntu1804-11-7-local_11.7.0-515.43.04-1_amd64.deb && \
        dpkg -i cuda-repo-ubuntu1804-11-7-local_11.7.0-515.43.04-1_amd64.deb && \
        cp /var/cuda-repo-ubuntu1804-11-7-local/cuda-*-keyring.gpg /usr/share/keyrings/ && \
        apt-get update && \
        apt-get -y install cuda && \
        rm cuda-repo-ubuntu1804-11-7-local_11.7.0-515.43.04-1_amd64.deb &&\
        rm -rf /var/lib/apt/lists/*
    
    ENV PATH="/usr/local/cuda-11.7/bin/:${PATH}"
    ENV LD_LIBRARY_PATH="/usr/local/cuda-11.7/lib64:${LD_LIBRARY_PATH:+:${LD_LIBRARY_PATH}}"
    ENV CUDA_HOME="/usr/local/cuda-11.7"
    
    RUN true && \
        python3.7 -m pip --no-cache-dir install typing-extensions==3.10.0.0 && \
        python3.7 -m pip --no-cache-dir install Mako==1.2.0 && \
        python3.7 -m pip --no-cache-dir install platformdirs==2.5.2 && \
        python3.7 -m pip --no-cache-dir install pytools==2022.1.2 && \
        python3.7 -m pip --no-cache-dir install pycuda==2021.1
    ```

3. **Build the custom image**:

    ```bash
    docker build . -t localhost/plcontainer_python3_cuda_shared:latest
    ```

4. **Add and configure the runtime**:

    -  Add a new runtime and associate it with the image you just built.

        ```bash
        plcontainer runtime-add -r plc_python_cuda_shared -I localhost/plcontainer_python3_cuda_shared:latest -l python3
        ```

    - Edit the runtime configuration to assign a GPU device to it.

        ```bash
        plcontainer runtime-edit
        ```

        In the XML configuration, add a `<device_request>` section for this runtime.

        ```xml
        <runtime>
            <id>plc_python_cuda_shared</id>
            <image>localhost/plcontainer_python3_cuda_shared:latest</image>
            ...
            <device_request type="gpu">
                <deviceid>0</deviceid> <!-- Specifies the ID of the GPU device. -->
            </device_request>
        </runtime>
        ```

#### Create and run a CUDA function example

1. Connect to the database and create a function that uses the CUDA runtime.

    ```sql
    CREATE FUNCTION hello_cuda() RETURNS float4[] AS $$
    # container: plc_python_cuda_shared
    
    import pycuda.driver as drv
    import pycuda.tools
    import pycuda.autoinit
    import numpy
    import numpy.linalg as la
    from pycuda.compiler import SourceModule
    
    mod = SourceModule("""
    __global__ void multiply_them(float *dest, float *a, float *b)
    {
      const int i = threadIdx.x;
      dest[i] = a[i] * b[i];
    }
    """)
    
    multiply_them = mod.get_function("multiply_them")
      
    a = numpy.random.randn(400).astype(numpy.float32)
    b = numpy.random.randn(400).astype(numpy.float32)
    
    dest = numpy.zeros_like(a)
    multiply_them(
            drv.Out(dest), drv.In(a), drv.In(b),
            block=(400,1,1))
      
    return [float(i) for i in (dest-a*b)]
    
    $$ LANGUAGE plcontainer;
    ```

2. Execute the function and verify the result.

    ```sql
    -- Calculates the sum of the resulting array, which is expected to be 0.0.
    WITH a AS (SELECT unnest(hello) AS cuda FROM hello_cuda() AS hello) SELECT sum(cuda) FROM a;
    ```

### Configure remote PL/Container

You can configure one or more remote hosts outside the cluster to execute PL/Container workloads, thereby reducing the computational overhead on database hosts.

#### Prerequisites

- PL/Container version is not lower than 2.4.0.
- Docker engine (version not lower than v19.03) is installed on the remote host, and you have `root` or `sudo` permissions.

#### Step 1: Configure the remote host

1. **Install Docker**: Install Docker on the remote host.

2. **Enable remote API**: Edit Docker's service file to make it listen on a TCP port (for example, 2375).

    ```bash
    sudo systemctl edit docker.service
    
    # Adds the following content to the beginning of the file:
    [Service]
    ExecStart=
    ExecStart=/usr/bin/dockerd -H fd:// -H tcp://0.0.0.0:2375
    
    # Restarts the Docker service.
    sudo systemctl restart docker
    ```

3. **Prepare the remote environment**: Ensure that the `gpadmin` user, passwordless SSH access, `python3`, and `rsync` are installed on the remote host. Then, perform the remote setup from the coordinator node.

    ```bash
    # Creates a directory on the remote host.
    ssh gpadmin@<remoteip> "sudo mkdir $GPHOME && sudo chown gpadmin:gpadmin $GPHOME"
    
    # Copies the plcontainer client from the coordinator to the remote host (multiple hosts can be specified).
    plcontainer remote-setup --hosts <remoteip_1>,<remoteip_2>
    ```

#### Step 2: Load the Docker image to the remote host

From the coordinator node, load the required Docker image onto one or more remote hosts.

```bash
plcontainer image-add --hosts <remoteip_1>,<remoteip_2> -f <image_file>
```

#### Step 3: Configure the backend node

1. On the coordinator node, edit the PL/Container configuration file.

    ```bash
    plcontainer runtime-edit
    ```

2. In the XML file, add a new `<backend>` section to define the remote host cluster. Then, modify the existing `<runtime>` section to use this newly defined backend via `<backend name="..."/>`.

    ```xml
    <?xml version="1.0" ?>
    <configuration>
        <backend name="calculate_cluster" type="remote_docker">
            <address>REMOTE_HOST_IP</address>
            <port>2375</port>
        </backend>
        <runtime>
            <id>plc_python_remote</id>
            <image>your_image:tag</image>
            <command>/clientdir/py3client.sh</command>
            <shared_directory access="ro" container="/clientdir" host="/usr/local/greenplum-db/bin/plcontainer_clients"/>
            <backend name="calculate_cluster" />
            <setting enable_network="yes" roles="gpadmin" />
        </runtime>
    </configuration>
    ```

    If you have multiple remote hosts, you need to create different backend and runtime configurations for them.

#### Step 4: Verify the configuration

Create a function that uses the remote runtime and execute it. If it succeeds, it means the function has run on the remote host.

```sql
CREATE FUNCTION dummy_remote_python() RETURNS text AS $$
# container: plc_python_remote
return 'hello from a remote Python container'
$$ LANGUAGE plcontainer;

SELECT * from dummy_remote_python();
```

## Notes

- If a PL/Container Docker container exceeds the allowed maximum memory, it will be terminated with an out-of-memory warning.
- PL/Container does not limit the base device size of Docker containers. In some cases, the Docker daemon controls this size. For example, if the Docker storage driver is `devicemapper`, its base size defaults to 10GB. You can use the `docker info` command to view the storage driver and related configurations.
- When a PL/Container UDF is executed, the Query Executor (QE) process starts and reuses Docker containers as needed. After being idle for a period, the QE process exits and destroys its Docker containers. You can control this idle time through the `gp_vmem_idle_resource_timeout` parameter, thereby affecting the container reuse policy. However, note that modifying this parameter also affects the recycling of other database resources, which might impact performance.