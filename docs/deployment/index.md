---
title: "Apache Cloudberry Deployment"
---

This guide provides instructions for deploying Apache Cloudberry in production environments. It covers the full deployment lifecycle from hardware planning to cluster initialization and login.

The guide includes the following topics:

- **[Platform Requirements](./platform-requirements)** — Hardware and software requirements for Apache Cloudberry hosts.
- **[Estimating Storage Capacity](./capacity_planning)** — How to estimate disk space needed for your data.
- **[Configuring Your Systems](./prepare-to-deploy)** — OS-level configuration including kernel parameters, SELinux, firewall, NTP, and user setup.
- **[Deploy Using RPM/DEB Package](./install_cloudberry)** — Installing the Apache Cloudberry software on all hosts.
- **[Creating the Data Storage Areas](./create_data_dirs)** — Setting up data directories for coordinator and segment instances.
- **[Validating Hardware and Network](./validate)** — Verifying network, disk I/O, and memory bandwidth performance.
- **[Initialize Apache Cloudberry](./init_cloudberry)** — Initializing the database cluster using `gpinitsystem`.
- **[Logging into Apache Cloudberry](./login_cloudberry)** — Connecting to the database after deployment.
- **[Deploy with a Single Computing Node](./single-node)** — Deploying Apache Cloudberry without segment nodes for development or testing.
