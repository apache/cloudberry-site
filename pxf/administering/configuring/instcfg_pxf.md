---
title: "Configuring PXF"
description: "Configuring PXF after installation."
source: https://cloudberry.apache.org/pxf/administering/configuring/instcfg_pxf
---

# Configuring PXF

Your Apache Cloudberry deployment consists of a coordinator host, a standby coordinator host, and multiple segment hosts. After you configure the Apache Cloudberry Platform Extension Framework (PXF), you start a single PXF JVM process (PXF Service) on each Apache Cloudberry host.

PXF provides connectors to Hadoop, Hive, HBase, object stores, network file systems, and external SQL data stores. You must configure PXF to support the connectors that you plan to use.

To configure PXF, you must:

1. Install Java 8 or 11 on each Apache Cloudberry host as described in [Installing Java for PXF](./install_java.md). If your `JAVA_HOME` is different from `/usr/java/default`, you must inform PXF of the `$JAVA_HOME` setting by specifying its value in the `pxf-env.sh` [configuration file](./config_files.md). 
    - Edit the `$PXF_BASE/conf/pxf-env.sh` file on the Apache Cloudberry coordinator host.

        ``` shell        
        gpadmin@coordinator$ vi /usr/local/cloudberry-pxf/conf/pxf-env.sh
        ```
    - Locate the `JAVA_HOME` setting in the `pxf-env.sh` file, uncomment if necessary, and set it to your `$JAVA_HOME` value. For example:

        ```
        export JAVA_HOME=/usr/lib/jvm/jre
        ```

1. Register the PXF extension with Apache Cloudberry (see [pxf cluster register](../../ref/pxf-cluster.md)). Run this command after your first installation of a PXF version 2.1+, and/or after you upgrade your Apache Cloudberry installation:

    ``` shell
    gpadmin@coordinator$ pxf cluster register
    ```

1. If you plan to use the Hadoop, Hive, or HBase PXF connectors, you must perform the configuration procedure described in [Configuring PXF Hadoop Connectors](./hadoop-connectors/client_instcfg.md).

1. If you plan to use the PXF connectors to access the Azure, Google Cloud Storage, MinIO, or S3 object store(s), you must perform the configuration procedure described in [Configuring Connectors to Azure, Google Cloud Storage, MinIO, and S3 Object Stores](./objstore_cfg.md).

1. If you plan to use the PXF JDBC Connector to access an external SQL database, perform the configuration procedure described in [Configuring the JDBC Connector](./jdbc-connector/jdbc_cfg.md).

1. If you plan to use PXF to access a network file system, perform the configuration procedure described in [Configuring a PXF Network File System Server](../../access-nfs/nfs_pxf.md#configuring-a-pxf-network-file-system-server).

1. After making any configuration changes, synchronize the PXF configuration to all hosts in the cluster.

    ``` shell
    gpadmin@coordinator$ pxf cluster sync
    ```

1. After synchronizing PXF configuration changes, [Start PXF](../cfginitstart_pxf.md).

2. Enable the [PXF extension](../using_pxf.md#enabling-pxf-in-a-database) and [grant access to users](../using_pxf.md#granting-a-role-access-to-pxf).
