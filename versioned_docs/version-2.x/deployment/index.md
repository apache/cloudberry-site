---
title: "Build Apache Cloudberry from Source: Complete Guide"
---

This document is intended for developers interested in exploring and potentially contributing to Apache Cloudberry. The build environment described here is optimized for development and testing purposes only.

## Target audience

- Developers interested in contributing to Apache Cloudberry.
- PostgreSQL developers wanting to explore Cloudberry's extensions.
- Database enthusiasts interested in learning about distributed query processing.
- Anyone considering joining the Apache Cloudberry community.

The build process described here enables development activities such as:

- Debugging and testing new features.
- Exploring the codebase with development tools.
- Running test suites and validation checks.
- Making and testing code modifications.

:::tip
If you are new to Apache Cloudberry or PostgreSQL development:

- Consider building PostgreSQL first to understand the basic workflow
- Join the project's [mailing lists](/community/mailing-lists) to connect with other developers
- Review the project's issue tracker to understand current development priorities
- Be prepared for longer build times and iterative testing as you explore the codebase
:::

## Process of building Apache Cloudberry

The build process for Apache Cloudberry (Incubating) closely resembles that of PostgreSQL. If you have previously set up development environments for PostgreSQL, you'll find the steps for Cloudberry very familiar. 

For those new to Cloudberry or PostgreSQL, we recommend starting with a PostgreSQL build first. The PostgreSQL development community has established excellent documentation and tooling to guide you through the process. Familiarizing yourself with PostgreSQL's build process will make transitioning to Cloudberry significantly easier.

## Prerequisites

### Provision a Rocky Linux 8+ / Ubuntu 20.04+ Environment

- Use any platform to create a virtual machine or container:

    - **Cloud providers**: You can use the Rocky Linux 8+ or Ubuntu 20.04+ images provided by the cloud providers, such as AWS, Google Cloud, Microsoft Azure, and more.
    - **VirtualBox**: Use the official [Rocky Linux 8+](https://rockylinux.org/download) / [Ubuntu 20.04+](https://ubuntu.com/download) ISO or Vagrant boxes.
    - **Docker**: These instructions were validated under Rocky Linux 8+ and Ubuntu 20.04 official base docker images, but should work with any of their based container. 
      - For example, you can run the following command to start a Rocky Linux 8 container:

        ```bash
        docker run -it --shm-size=2gb -h cdw rockylinux/rockylinux:8

        # Start a Ubuntu 20.04 container:
        # docker run -it --shm-size=2gb -h cdw ubuntu:20.04
        ```

        The hostname `cdw` (Coordinator Data Warehouse) is just an example of how we started the container for testing.

        To ensure test suites run successfully, you may need to increase the container's shared memory using `--shm-size=2gb`. Test failures can occur when the Cloudberry cluster lacks sufficient shared memory resources.

- Ensure the VM or container has:
    - Internet connectivity for package installation.
    - SSH or console access for user interaction.
    - Sufficient resources (CPU, memory, and storage) for a development environment.

:::note
Specific steps to provision the environment are not covered in this guide because they vary by platforms. This guide assumes you have successfully created a VM or container and can log in as the default user (for example, `rocky` for Rocky Linux on AWS).
:::

###  System requirements

Minimum requirements for development environment:

- CPU: 4 cores recommended (2 cores minimum)
  - CPU architecture: x86, x86_64, ARM, MIPS
- RAM: 8GB recommended (4GB minimum)
- Storage: 20GB free space recommended
- Network: Broadband internet connection for package downloads

## Build Apache Cloudberry from source code

The following steps guide you through building Apache Cloudberry from source code on Rocky Linux 8+ or Ubuntu 20.04+. The process is similar for both operating systems, with minor differences in package management, dependencies and software versions between these two distributions.

Just go ahead and follow the steps below to build Apache Cloudberry from source code:

```mdx-code-block
import DocCardList from '@theme/DocCardList';

<DocCardList />
```