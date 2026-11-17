---
title: uuid-ossp
---

# uuid-ossp

The `uuid-ossp` module provides functions that generate universally unique identifiers (UUIDs) using one of several standard algorithms. The module also includes functions that produce certain special UUID constants.

The Apache Cloudberry `uuid-ossp` module is equivalent to the PostgreSQL `uuid-ossp` module. There are no MPP-specific considerations for the module.

## Install and register the module

`uuid-ossp` is built only when Apache Cloudberry is configured with a UUID library, using the `--with-uuid=LIB` option of `configure` (`LIB` is `e2fs`, `bsd`, or `ossp`). It is also not part of the default build targets (`make` and `make install`). If `CREATE EXTENSION` reports that the extension is not available, build and install the module from the Apache Cloudberry source tree that your installation was configured from:

```shell
make -C contrib/uuid-ossp install
```

The module files must be present on every host of the cluster (coordinator, standby coordinator, and all segment hosts). The module is also installed by `make install-world`.

Then register the extension in each database in which you want to use it. Because the extension name contains a hyphen, you must quote it:

```sql
CREATE EXTENSION "uuid-ossp";
```

## Functions

| Function | Description |
|----------|-------------|
| `uuid_generate_v1()` | Generates a version 1 UUID from the MAC address of the host and a timestamp. |
| `uuid_generate_v1mc()` | Generates a version 1 UUID using a random multicast MAC address. |
| `uuid_generate_v3(namespace uuid, name text)` | Generates a version 3 UUID (MD5 hash) in the given namespace. |
| `uuid_generate_v4()` | Generates a version 4 UUID from random numbers. |
| `uuid_generate_v5(namespace uuid, name text)` | Generates a version 5 UUID (SHA-1 hash) in the given namespace. |
| `uuid_nil()` | Returns the nil UUID constant. |
| `uuid_ns_dns()`, `uuid_ns_url()`, `uuid_ns_oid()`, `uuid_ns_x500()` | Return the constants that designate the DNS, URL, ISO object identifier, and X.500 distinguished name namespaces. |

:::note
If you only need randomly generated (version 4) UUIDs, you can use the `gen_random_uuid()` function of the [pgcrypto](./pgcrypto.md) module instead.
:::

## Module documentation

See [uuid-ossp](https://www.postgresql.org/docs/14/uuid-ossp.html) in the PostgreSQL documentation for details about this module.
