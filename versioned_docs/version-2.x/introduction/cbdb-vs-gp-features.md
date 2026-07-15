---
title: What's New in Apache Cloudberry
---

# What's New in Apache Cloudberry

Apache Cloudberry is built on the open-source lineage of Greenplum Database and is **highly backward-compatible** with Greenplum. If you are coming from Greenplum, you will feel right at home — most SQL syntax, utilities, and operational workflows work the same way.

At the same time, Apache Cloudberry brings many new capabilities on top of that foundation. It integrates a newer PostgreSQL kernel and delivers features across storage, query optimization, security, and more. This page highlights what's new.

## Modern PostgreSQL kernel

Apache Cloudberry tracks PostgreSQL upstream closely across multiple branches:

| Branch | PostgreSQL kernel | Status |
| ------ | ----------------- | ------ |
| `main` | PostgreSQL 16.x | Active development |
| `REL_2_STABLE` | PostgreSQL 14.x | Latest stable release, with ongoing minor version upgrades; a newer kernel is planned for upcoming 2.x releases |

This kernel upgrade brings a broad range of upstream PostgreSQL capabilities that were unavailable in Greenplum — from multiranges, JSONB subscripting, LZ4 TOAST compression, and incremental sort, to `REINDEX CONCURRENTLY`, BRIN indexes, hash partitioning, `UPSERT` support, and much more. You get these out of the box, just as you would with upstream PostgreSQL, all while keeping the MPP architecture you rely on.

## Key features in Apache Cloudberry

These are new capabilities brought by the Apache Cloudberry community.

### Storage & data formats

| Feature | Description |
| ------- | ----------- |
| [Directory Table](../advanced-analytics/directory-tables.md) | A table type for unified management of unstructured data on local or object storage. Use simple SQL statements to manage and analyze unstructured data objects. |
| [PAX Storage Format](../operate-with-data/pax-table-format.md) | A hybrid row-column storage format that combines batch write performance of row-based storage with read performance of columnar storage, improving cache efficiency. Supports MVCC, z-ordering, bloom filters, sparse filtering, and multiple encoding and compression options. Adapts to both cloud object storage and traditional file systems. |

### Query performance & optimization

| Feature | Description |
| ------- | ----------- |
| [Incremental Materialized Views](../performance/optimize-queries/use-incremental-materialized-view.md) | A special form of materialized view that only refreshes changed data — not the entire view — when base tables are updated. Orders of magnitude faster than regular views for large datasets. |
| [Automatic Materialized View Rewrite](../performance/optimize-queries/use-auto-materialized-view-to-answer-queries.md) | During query planning, Apache Cloudberry can automatically use incremental materialized views to answer some or all of a query (AQUMV). Especially effective for aggregation queries on large tables and complex calculations, greatly reducing query processing time. |
| [Dynamic Tables](../performance/use-dynamic-tables.md) | Database objects similar to materialized views that refresh automatically on a schedule. Useful for accelerating queries in lakehouse setups and processing data pipelines without manual effort. |
| [Parallel Query Execution](../performance/optimize-queries/parallel-query-execution.md) | On a per-segment level, a single query can use multiple CPU cores to scan heap and AO/AOCO tables in parallel, boosting performance on deployments with a small number of segments per host. |
| [RuntimeFilter for Join](../performance/optimize-queries/use-runtimefilter-to-optimize-queries.md) | Uses Bloom filters to pre-filter large tables before HashJoin, greatly reducing memory access costs. In suitable scenarios, RuntimeFilter can double join performance. |
| [IndexScan on AO Tables](../performance/optimize-queries/use-index-scan-on-ao-tables.md) | Enables IndexScan on Append-Optimized tables, greatly reducing the amount of data scanned for queries with `ORDER BY` and `LIMIT` clauses. In the most suitable scenario, queries that originally required tens of minutes can be returned within 1 second. |
| [Unique Index on AO Tables](../performance/optimize-queries/use-unique-index-on-ao-tables.md) | Supports unique indexes and unique constraints on AO/AOCS tables, enforcing data uniqueness at the storage engine level. |

### Security

| Feature | Description |
| ------- | ----------- |
| [Transparent Data Encryption (TDE)](../security/transparent-data-encryption.md) | Data files are encrypted at rest transparently. Supports AES and SM4 algorithms with a two-tier key management architecture. No application changes needed. |
| [Row-Level Security Policy](../security/configure-row-level-security-policy.md) | Table owners can define fine-grained access policies that filter rows per user. |
| [Password Policy](../security/set-password-profile.md) | Enforce password complexity, expiration, lockout-after-failures, and reuse rules through named profiles that can be bound to one or more database users. |

### Deployment flexibility

| Feature | Description |
| ------- | ----------- |
| [Single Node Deployment](../deployment/single-node.md) | Deploy Apache Cloudberry without segment nodes for development, testing, or light production use. Leverage the full Cloudberry feature set in a compact, PostgreSQL-like footprint. |
| [ARM Architecture Support](../deployment/platform-requirements.md) | In addition to x86_64, Apache Cloudberry fully supports ARM/AARCH64 architectures, enabling deployment on a broader range of hardware including cloud instances and ARM-based servers. |

### Operations & utilities

| Feature | Description |
| ------- | ----------- |
| [gpshrink](../sys-utilities/gpshrink.md) | Scale in a running cluster by removing segments from underutilized hosts, saving resources when cluster capacity exceeds demand. |
| [gpdemo](../sys-utilities/gpdemo.md) | Deploy a fully functional multi-segment cluster with a single command — ideal for development, testing, and demos without the complexity of a full production deployment. |

## Open governance with The Apache Way

All of the above is made possible by the project's open, community-driven governance. Apache Cloudberry is developed under the Apache Software Foundation, following **The Apache Way** — a proven governance model that ensures the project is **vendor-neutral** and community-driven. The contributor base spans multiple organizations and independent developers, and decisions are made openly on public mailing lists, not behind closed doors.

The original Greenplum Database followed a single-vendor governance model and was eventually closed as a proprietary product. Apache Cloudberry belongs to the community — no single company can shut it down or take it private.

See our [community team page](/team) for the full list of contributors and committers.

## Summary

Apache Cloudberry is not a fork frozen in time — it is an actively developed, modernized MPP database that preserves Greenplum compatibility while pushing forward with a newer PostgreSQL kernel, new storage engines, smarter query optimization, stronger security, and flexible deployment options. Whether you are a Greenplum user evaluating a migration or a new user looking for a capable open-source MPP database, Apache Cloudberry offers a compelling path.
