---
title: Post Expansion Tasks 
---

After the expansion is completed, you must perform different tasks depending on your environment.

- [Removing the Expansion Schema](#topic_xvp_5p2_hpb)
- [Setting Up PXF on the New Host](#topic_pxl_1q2_hpb)

## Remove the expansion schema

You must remove the existing expansion schema before you can perform another expansion operation on the Cloudberry system.

You can safely remove the expansion schema after the expansion operation is complete and verified. To run another expansion operation on a Cloudberry system, first remove the existing expansion schema.

1. Log in on the coordinator host as the user who will be running your Apache Cloudberry system (for example, `gpadmin`).
2. Run the `gpexpand` utility with the `-c` option. For example:

    ```shell
    $ gpexpand -c
    ```

    :::note
    Some systems require you to press Enter twice.
    :::


## Set up PXF on the new host

If you are using PXF in your Apache Cloudberry cluster, you must perform some configuration steps on the new hosts.

There are different steps to follow depending on your PXF version and the type of installation.

### Pxf 5

- You must [install](https://docs.vmware.com/en/VMware-Cloudberry-Platform-Extension-Framework/6.6/greenplum-platform-extension-framework/installing_pxf.html) the same version of the PXF `rpm` or `deb` on the new hosts.
- Log into the Cloudberry Coordinator and run the following commands:

    ```shell
    gpadmin@gpcoordinator$ pxf cluster reset
    gpadmin@gpcoordinator$ pxf cluster init
    ```


### PXF 6

- You must [install](https://docs.vmware.com/en/VMware-Cloudberry-Platform-Extension-Framework/6.6/greenplum-platform-extension-framework/installing_pxf.html) the same version of the PXF `rpm` or `deb` on the new hosts.
- Log into the Cloudberry Coordinator and run the following commands:

    ```shell
    gpadmin@gpcoordinator$ pxf cluster register
    gpadmin@gpcoordinator$ pxf cluster sync
    ```


