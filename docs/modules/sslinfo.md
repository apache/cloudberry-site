---
title: sslinfo
---

# sslinfo

The `sslinfo` module provides information about the SSL certificate that the current client provided when it connected to Apache Cloudberry. Most functions in this module return `NULL` if the current connection does not use SSL.

The Apache Cloudberry `sslinfo` module is equivalent to the PostgreSQL `sslinfo` module. The functions report on the client connection to the coordinator.

## Install and register the module

`sslinfo` is not part of the default build targets (`make` and `make install`) of Apache Cloudberry, and it can be built only when Apache Cloudberry is configured with OpenSSL support (`--with-ssl=openssl`, or the older spelling `--with-openssl`). If `CREATE EXTENSION` reports that the extension is not available, build and install the module from the Apache Cloudberry source tree that your installation was configured from:

```shell
make -C contrib/sslinfo install
```

The module files must be present on every host of the cluster (coordinator, standby coordinator, and all segment hosts). The module is also installed by `make install-world`.

Then register the extension in each database in which you want to use it:

```sql
CREATE EXTENSION sslinfo;
```

## Functions

| Function | Description |
|----------|-------------|
| `ssl_is_used() returns boolean` | Returns `true` if the current connection uses SSL. |
| `ssl_version() returns text` | Returns the name of the protocol used for the SSL connection. |
| `ssl_cipher() returns text` | Returns the name of the cipher used for the SSL connection. |
| `ssl_client_cert_present() returns boolean` | Returns `true` if the client presented a valid SSL certificate. |
| `ssl_client_serial() returns numeric` | Returns the serial number of the client certificate. |
| `ssl_client_dn() returns text` | Returns the full subject of the client certificate. |
| `ssl_issuer_dn() returns text` | Returns the full issuer name of the client certificate. |
| `ssl_client_dn_field(fieldname text) returns text` | Returns one field of the subject of the client certificate. |
| `ssl_issuer_field(fieldname text) returns text` | Returns one field of the issuer of the client certificate. |
| `ssl_extension_info() returns setof record` | Returns the name, value, and criticality of each extension of the client certificate. |

## Example

```sql
SELECT ssl_is_used(), ssl_version(), ssl_cipher();
SELECT ssl_client_dn_field('CN');
```

## Module documentation

See [sslinfo](https://www.postgresql.org/docs/14/sslinfo.html) in the PostgreSQL documentation for details about the individual functions in this module.
