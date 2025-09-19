---
title: Expand a Cloudberry System
---

# Expand a Cloudberry System

To scale up performance and storage capacity, expand your Apache Cloudberry system by adding hosts to the system. In general, adding nodes to a Cloudberry cluster achieves a linear scaling of performance and storage capacity.

Data warehouses typically grow over time as additional data is gathered and the retention periods increase for existing data. At times, it is necessary to increase database capacity to consolidate different data warehouses into a single database. Additional computing capacity (CPU) may also be needed to accommodate newly added analytics projects. Although it is wise to provide capacity for growth when a system is initially specified, it is not generally possible to invest in resources long before they are required. Therefore, you should expect to run a database expansion project periodically.

Because of the Cloudberry MPP architecture, when you add resources to the system, the capacity and performance are the same as if the system had been originally implemented with the added resources. Unlike data warehouse systems that require substantial downtime in order to dump and restore the data, expanding a Apache Cloudberry system is a phased process with minimal downtime. Regular and ad hoc workloads can continue while data is redistributed and transactional consistency is maintained. The administrator can schedule the distribution activity to fit into ongoing operations and can pause and resume as needed. Tables can be ranked so that datasets are redistributed in a prioritized sequence, either to ensure that critical workloads benefit from the expanded capacity sooner, or to free disk space needed to redistribute very large tables.

The expansion process uses standard Apache Cloudberry operations so it is transparent and easy for administrators to troubleshoot. Segment mirroring and any replication mechanisms in place remain active, so fault-tolerance is uncompromised and disaster recovery measures remain effective.

- **[System Expansion Overview](./expand-a-db-system.md)**  
You can perform a Apache Cloudberry expansion to add segment instances and segment hosts with minimal downtime. In general, adding nodes to a Cloudberry cluster achieves a linear scaling of performance and storage capacity.
- **[Planning Cloudberry System Expansion](./plan-system-expansion.md)**  
Careful planning will help to ensure a successful Cloudberry expansion project.
- **[Preparing and Adding Hosts](./prepare-and-add-hosts.md)**  
Verify your new host systems are ready for integration into the existing Cloudberry system.
- **[Initializing New Segments](./initialize-new-segments.md)**  
Use the `gpexpand` utility to create and initialize the new segment instances and create the expansion schema.
- **[Redistributing Tables](./redistribute-tables.md)**  
Redistribute tables to balance existing data over the newly expanded cluster.
- **[Post Expansion Tasks](./post-expansion-tasks.md)**  
After the expansion is completed, you must perform different tasks depending on your environment.
