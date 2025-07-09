---
slug: "apache-cloudberry-at-community-over-code-asia-2025"
title: "Apache Cloudberry @ Community Over Code Asia 2025 - Explore Sessions and Visit Our Booth!"
description: "Community Over Code Asia 2025 is coming!"
authors: [asfcloudberry]
tags: [Event]
image: /img/blog/202507-coc-asia.png
---

![community over code asia 2025](/img/blog/coc-asia-logo-dark.png)

We’re thrilled to welcome you to [Community Over Code Asia 2025](https://asia.communityovercode.org) (previously known as ApacheCon Asia) - the premier open-source event in Asia, hosted by the Apache Software Foundation. Taking place in Beijing from July 25–27, 2025, this in-person gathering is your chance to dive into the latest innovations, learn from domain experts, and connect with the global open-source community.

Apache Cloudberry will be featured across six exciting sessions, covering everything from architecture deep dives and AI integration to real-world use cases and roadmap insights. Whether you’re a developer, data engineer, database specialist, or decision-maker, there’s something for you.

## Featured sessions

Let’s take a look at the featured Apache Cloudberry sessions, ranging from project introductions and deep technical dives to practical solutions and strategic insights.

#### SeaTunnel Architecture Analysis and Cloudberry Integration Practice

Hongyu Chen, SeaTunnel Contributor and Data Integration R&D Engineer at NetEase

    > In this session, we will explore Apache SeaTunnel, a high-performance distributed data integration platform designed for seamless synchronization of massive datasets across heterogeneous sources. Attendees will gain insights into SeaTunnel’s core architecture, including its modular plugin system, unified abstractions leveraging Spark and Flink, and its evolution from V1 to V2 with enhanced scalability and engine-agnostic design. We will delve into advanced features such as dynamic sharding strategies, data sampling techniques, and optimized handling of string-based partitioning for efficient data distribution.
    >
    > The session will also showcase a practical integration case with Cloudberry, demonstrating how SeaTunnel’s JDBC-based connector simplifies bidirectional data workflows while highlighting performance considerations. Finally, we’ll discuss future optimizations, including plans to leverage Cloudberry’s parallel processing via the gpfdist protocol for large-scale data migration. This talk is ideal for data engineers and architects seeking to streamline data integration workflows, break down silos, and harness the full potential of modern data ecosystems.

Ideal for data engineers interested in cross-platform data pipelines and performance tuning.

🫱 Session details: https://asia.communityovercode.org/sessions/dataops-915377.html

#### From Proposal to Progress: Lessons Learned from Incubating Apache Cloudberry

Dianjin Wang, PPMC Member of Apache Cloudberry, ALC Beijing Member, Track Chair of ApacheCon Asia 2021-2025, Head of Open Source at HashData

    > Apache Cloudberry, a massively parallel processing (MPP) database based on Greenplum, entered the Apache Incubator with the vision of bringing analytical power to the open-source community. As one of the initiators and ongoing contributors to the project, I’ve had the opportunity to closely experience every stage of the incubation journey — from drafting the proposal and forming the PPMC to announcing and marketing promotion, to cleaning up the source code, and building community momentum.
    >
    > In this talk, I will share firsthand insights into what it takes to navigate the Apache Incubator process effectively. I’ll highlight the challenges we faced, how we built a diverse and active community, ensured compliance with Apache’s governance and IP guidelines, and balanced open-source development with commercial interests. This session aims to offer practical guidance for new and prospective incubator projects, mentors, and contributors interested in sustaining healthy open-source ecosystems under the Apache Way.

A must-attend for new incubator projects, mentors, or anyone curious about open-source sustainability.

🫱 Session details: https://asia.communityovercode.org/sessions/incubator-906736.html

#### Dive into Vectorized Execution for Apache Cloudberry: Design, Challenges, and Performance Gains

Zhang Yue, Software Engineer at HashData

    > As analytical workloads grow in both scale and complexity, the demand for high-performance data processing engines continues to rise. While MPP architectures are effective at scaling out performance across hardware, databases built on PostgreSQL — such as Greenplum and Apache Cloudberry — face limitations due to PostgreSQL’s execution engine.
    >
    > To overcome these constraints, we introduce a vectorized execution engine for Apache Cloudberry, which is designed to unlock greater efficiency through batch processing and low-level instruction optimizations. In this session, we will take a deep dive into the design and implementation of Cloudberry’s vectorized engine solution, outline the key engineering efforts behind it, and share insights from real-world use cases—including performance benchmarks, bottlenecks we encountered, and future directions for further optimization.

Join this talk if you’re interested in performance engineering or modern MPP execution models.

🫱 Session details: https://asia.communityovercode.org/sessions/olap-914602.html

#### From Data to AI: Building a Unified Analytics Platform with Apache Cloudberry

Chuanxin Bian, Data & AI Engineer at HashData

    > Enterprises today struggle to harness AI’s full potential due to fragmented data systems, inefficient pipelines, and silos between analytics and machine learning. Apache Cloudberry, an open-source MPP data warehouse, redefines this paradigm by deeply integrating data processing with AI - eliminating barriers and accelerating innovation. In this session, we’ll demonstrate how Cloudberry enables:
    > 
    > - Unified Execution – Run native AI/ML models (e.g., PyTorch, Scikit-learn) directly on warehouse data.
    > - Multi-Modal Analytics – Process structured and unstructured data (PDFs, images, and other documents) in a unified framework.
    > - Smart Data Applications – Build RAG-enhanced QA, ChatBI, and multimodal search. 
    >
    > You can learn how to converge data and intelligence into one platform, reducing complexity while scaling AI workloads in this session.

If you’re building AI workflows on top of analytics infrastructure, don’t miss this session.

🫱 Session details: https://asia.communityovercode.org/sessions/ai-915004.html

#### Building a Unified Lakehouse Solution with Apache Cloudberry

Rose Duan, Apache Cloudberry contributor

    > Data warehouses excel at fast analytics, while data lakes focus on scalable storage and flexible data management. The lakehouse architecture aims to combine the best of both—seamlessly integrating data across lakes and warehouses for efficient analysis and unified governance.
    >
    > As a next-generation open-source MPP database, Apache Cloudberry extends its technical boundaries to build an open lakehouse solution. This talk introduces Cloudberry’s key capabilities in enabling a unified lakehouse architecture:
    > 
    > 1. Accelerated lake queries on Parquet/ORC without data movement
    > 2. Unified data gateway for querying and writing across heterogeneous sources
    > 3. Integrated data processing and sync pipeline, enabling end-to-end flow from ingestion to analytics
    > 4. Open metadata and storage formats for easier ecosystem integration and reduced migration cost

Perfect for architects and data platform teams building open, scalable analytics stacks.

🫱 Session details: https://asia.communityovercode.org/sessions/datalake-915987.html

#### Introduction to Apache Cloudberry: Evolution, Key Features, and Roadmap

Max Yang, Apache Cloudberry PPMC Member, Tech VP of HashData

    > Apache Cloudberry is an advanced and mature open-source MPP database, derived from the open-source version of the Pivotal Greenplum Database® but built on a more modern PostgreSQL kernel and with more advanced enterprise capabilities. Cloudberry can serve as a data warehouse and can also be used for large-scale analytics and AI/ML workloads. 
    >
    > In this session, we’ll explore the origin of the project, its journey into the Apache Incubator, and how it differentiates itself from other analytical databases. We will introduce Cloudberry’s core features, architectural highlights, and share its future roadmap. This session will also provide a brief comparison with other data warehouse systems, helping the audience understand where Apache Cloudberry stands in the ecosystem and what’s coming next.

A great entry point for understanding Cloudberry’s position in the data warehouse landscape.

🫱 Session details: https://asia.communityovercode.org/sessions/datalake-915155.html

## How to participate

Ready to join? [Register](https://asia.communityovercode.org/#register) now to attend Community Over Code Asia 2025 in person. We look forward to seeing you in Beijing!

## Visit the Cloudberry Booth!

The Apache Cloudberry community will be onsite with a dedicated booth. Drop by to meet the team, ask questions, check out live demos, and grab some awesome Cloudberry swag!

