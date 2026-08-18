---
title: "Configuring Connectors to Azure and Google Cloud Storage Object Stores (Optional)"
description: "Configuring PXF connectors to Azure and Google Cloud Storage."
source: https://cloudberry.apache.org/pxf/administering/configuring/objstore_cfg
---

# Configuring Connectors to Azure and Google Cloud Storage Object Stores (Optional)

You can use PXF to access Azure Data Lake Storage Gen2, Azure Blob Storage, and Google Cloud Storage object stores. This topic describes how to configure the PXF connectors to these external data sources.

*If you do not plan to use these PXF object store connectors, then you do not need to perform this procedure.*

## About Object Store Configuration

To access data in an object store, you must provide a server location and client credentials. When you configure a PXF object store connector, you add at least one named PXF server configuration for the connector as described in [Configuring PXF Servers](./cfg_server.md).

PXF provides a template configuration file for each object store connector. These template files are located in the `<PXF_INSTALL_DIR>/templates/` directory.

### Azure Blob Storage Server Configuration

The template configuration file for Azure Blob Storage is `<PXF_INSTALL_DIR>/templates/wasbs-site.xml`. When you configure an Azure Blob Storage server, you must provide the following server configuration properties and replace the template value with your account name:

| Property       | Description                                | Value |
|----------------|--------------------------------------------|-------|
| fs.adl.oauth2.access.token.provider.type | The token type. | Must specify `ClientCredential`. |
| fs.azure.account.key.\<YOUR_AZURE_BLOB_STORAGE_ACCOUNT_NAME\>.blob.core.windows.net | The Azure account key. | Replace `<YOUR_AZURE_BLOB_STORAGE_ACCOUNT_NAME>` with your account key. |
| fs.AbstractFileSystem.wasbs.impl | The file system class name. | Must specify `org.apache.hadoop.fs.azure.Wasbs`. |

### Azure Data Lake Storage Gen2 Server Configuration

The template configuration file for Azure Data Lake Storage Gen2 is `<PXF_INSTALL_DIR>/templates/abfss-site.xml`. When you configure an Azure Data Lake Storage Gen2 server, you must provide the following server configuration properties and replace the template values with your credentials:

| Property       | Description                                | Value |
|----------------|--------------------------------------------|-------|
| fs.azure.account.auth.type | The type of account authorization. | Must specify `OAuth`. |
| fs.azure.account.oauth.provider.type | The type of token. | Must specify `org.apache.hadoop.fs.azurebfs.oauth2.ClientCredsTokenProvider`. |
| fs.azure.account.oauth2.client.endpoint | The Azure endpoint to which to connect. | Your refresh URL. |
| fs.azure.account.oauth2.client.id | The Azure account client ID. | Your client ID (UUID). |
| fs.azure.account.oauth2.client.secret | The password for the Azure account client ID. | Your password. |

### Google Cloud Storage Server Configuration

The template configuration file for Google Cloud Storage is `<PXF_INSTALL_DIR>/templates/gs-site.xml`. When you configure a Google Cloud Storage server, you must provide the following server configuration properties and replace the template values with your credentials:

| Property       | Description                                | Value |
|----------------|--------------------------------------------|-------|
| google.cloud.auth.service.account.enable | Enable service account authorization. | Must specify `true`. |
| google.cloud.auth.service.account.json.keyfile | The Google Storage key file. | Path to your key file. |
| fs.AbstractFileSystem.gs.impl | The file system class name. | Must specify `com.google.cloud.hadoop.fs.gcs.GoogleHadoopFS`. |

## Example Server Configuration Procedure

In this procedure, you name and add a PXF server configuration in the `$PXF_BASE/servers` directory on the Apache Cloudberry coordinator host for the Google Cloud Storate (GCS) connector. You then use the `pxf cluster sync` command to sync the server configuration(s) to the Apache Cloudberry cluster.

1. Log in to your Apache Cloudberry coordinator host:

    ``` shell
    $ ssh gpadmin@<coordinator>
    ```

2. Choose a name for the server. You will provide the name to end users that need to reference files in the object store.

3. Create the `$PXF_BASE/servers/<server_name>` directory. For example, use the following command to create a server configuration for a Google Cloud Storage server named `gs_public`:

    ``` shell
    gpadmin@coordinator$ mkdir $PXF_BASE/servers/gs_public
    ````

3. Copy the PXF template file for GCS to the server configuration directory. For example:

    ``` shell
    gpadmin@coordinator$ cp <PXF_INSTALL_DIR>/templates/gs-site.xml $PXF_BASE/servers/gs_public/
    ```
        
4. Open the template server configuration file in the editor of your choice, and provide appropriate property values for your environment. For example, if your Google Cloud Storage key file is located in `/home/gpadmin/keys/gcs-account.key.json`:

    ``` pre
    <?xml version="1.0" encoding="UTF-8"?>
    <configuration>
        <property>
            <name>google.cloud.auth.service.account.enable</name>
            <value>true</value>
        </property>
        <property>
            <name>google.cloud.auth.service.account.json.keyfile</name>
            <value>/home/gpadmin/keys/gcs-account.key.json</value>
        </property>
        <property>
            <name>fs.AbstractFileSystem.gs.impl</name>
            <value>com.google.cloud.hadoop.fs.gcs.GoogleHadoopFS</value>
        </property>
    </configuration>
    ```
5. Save your changes and exit the editor.

4. Use the `pxf cluster sync` command to copy the new server configurations to the Apache Cloudberry cluster:
    
    ``` shell
    gpadmin@coordinator$ pxf cluster sync
    ```
