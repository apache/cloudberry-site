---
title: "Lesson 0: Introduction to Database and Apache Cloudberry Architecture"
description: This page provides an introduction to the basic concepts of databases and explains the architecture of Apache Cloudberry.
---

## Background: Database Concepts

Before starting this tutorials, spend some time to get familiar with how (single instance) databases work. If you already have some knowledge and experience with Oracle, MySQL or especially Postgres - this is great.

Databases (relational databases) are pieces of software that are used to store and manage/process data. Usually these databases are built with the client/server concept - the database is implemented as a server and multiple clients can connect and read or update the data.

The clients usually use SQL language to access the data (or some dialect of the SQL language specification). The clients can be different implementations - proprietary client libraries or ODBC/JDBC compliant.

Database data is usually stored in objects called tables. Tables have predefined structure (columns) and have zero or multiple rows.

Tables can be grouped in logical entities called 'schemas' (or namespaces).

Tables/schemas are located in a 'database' entity. Some database software supports multiple databases per instance (MySQL, Postgres), others support one database per instance (Oracle).

Along with tables there are supporting objects such as indexes, sequences, views, etc.

The database system needs to maintain some metadata - called the database catalog. The database catalog contains information about the data objects and supporting objects as well as anything else that needs to be stored on system level (user authentication, etc.).

SQL (Structured Query Language) is a descriptive language, not imperative language. Therefore it describes what the user needs, not how to get it. When the user describes what he needs, the database need to decide how to get it. This process is called query optimization. The end result from this process is a query plan, which is a step by step instruction how to get the result.

## Introduction to the Apache Cloudberry Architecture

Apache Cloudberry is a massively parallel processing (MPP) database server with an architecture specially designed to manage large-scale analytic data warehouses and business intelligence workloads.

MPP (also known as a shared-nothing architecture) refers to systems with two or more processors that cooperate to carry out an operation, each processor with its own memory, operating system, and disks. Apache Cloudberry uses this high-performance system architecture to distribute the load of multi-terabyte data warehouses and all of a system's resources in parallel to process a query.

Apache Cloudberry is based on the open-source PostgreSQL. It is essentially several PostgreSQL database instances working together as one cohesive database management system (DBMS). It is based on PostgreSQL 14.4 kernel and in most cases it is very similar to PostgreSQL. Database users interact with Apache Cloudberry as a regular PostgreSQL DBMS.

In Apache Cloudberry, internals of PostgreSQL have been modified and optimized to support parallel structure of Apache Cloudberry. For instance, system catalog, optimizer, query executor and transaction manager components have been modified and enhanced to be able to execute queries simultaneously across the parallel PostgreSQL database instances. Apache Cloudberry interconnect (the networking layer) enables communication between distinct PostgreSQL instances and allows the system to behave as one logical database.

Apache Cloudberry also includes features designed to optimize PostgreSQL for business intelligence (BI) workloads. For example, Apache Cloudberry has added parallel data loading (external tables), resource management, query optimizations and storage enhancements,.

_Figure 1. High-Level Apache Cloudberry Architecture_

![High-Level Apache Cloudberry Architecture](/img/bootcamp/highlevel_arch.jpg) 

The following topics describe the components that make up a Apache Cloudberry system and how they work together.

### Apache Cloudberry Coordinator

The Apache Cloudberry coordinator is the entry to the Apache Cloudberry system. It accepts client connections, handles SQL queries, and then distributes workload to the segment instances.

Apache Cloudberry end-users only interact with Apache Cloudberry through coordinator node as a typical PostgreSQL database. They connect to database using client such as `psql` or drivers like `JDBC` or `ODBC`.

The coordinator stores global system catalog. Global system catalog is set of system tables that contain metadata for Apache Cloudberry itself. Coordinator node does not contain any user table data; user table data resides only on segments. Coordinator node would authenticate client connections, processe incoming SQL commands, distribute workloads among segments, collect the results returned by each segment and return the final results to the client.

### Apache Cloudberry Segments

Apache Cloudberry segment instances are independent PostgreSQL databases that each of them stores a portion of the data and performs the majority of query execution work.

When a user connects to the database via the Cloudberry coordinator and issues queries, accordingly execution plan would be distributed to each segment instance.

The server that has segments running on it is called segment host. A segment host usually has two to eight Cloudberry segments running on it, the number depending on serveral factors: CPU cores, memory, disk, network interfaces or workloads. To get better performance in Apache Cloudberry, it is suggested to distribute data and workloads evenly across segments so that execution plan can be finished across all segments and with no bottleneck.

### Apache Cloudberry Interconnect

The interconnect is the networking layer of the Apache Cloudberry architecture.

The interconnect refers to the inter-process communication mechanism in-between segments. By default, interconnect uses User Datagram Protocol (UDP) to send/receive messages over the network. Interconnect provide datagram verification and retransmission mechanism. Reliability is equivalent to Transmission Control Protocol (TCP), performance and scalability exceeds TCP. If a user chooses TCP in interconnect, Cloudberry would have limit around 1000 segment instances. With UDP and interconncet, the limit does not exit.
