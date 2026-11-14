---
title: pgcrypto
---

# pgcrypto

The `pgcrypto` module provides cryptographic functions: general hashing, password hashing, PGP encryption, raw encryption, and random data generation. With these functions, you can store certain columns of data in encrypted form. Data that is stored encrypted cannot be read by anyone who does not have the encryption key, and it cannot be read directly from the disks.

:::note
The `pgcrypto` functions run inside the database server, which means that all the data and passwords move between `pgcrypto` and the client application in clear text. For better security, also use SSL connections between the client and the Apache Cloudberry coordinator.
:::

## Install and register the module

`pgcrypto` is built and installed by a default Apache Cloudberry build. Register the extension in each database in which you want to use it:

```sql
CREATE EXTENSION pgcrypto;
```

## Functions

| Group | Functions |
|-------|-----------|
| General hashing | `digest()`, `hmac()` |
| Password hashing | `crypt()`, `gen_salt()` |
| PGP encryption | `pgp_sym_encrypt()`, `pgp_sym_encrypt_bytea()`, `pgp_sym_decrypt()`, `pgp_sym_decrypt_bytea()`, `pgp_pub_encrypt()`, `pgp_pub_encrypt_bytea()`, `pgp_pub_decrypt()`, `pgp_pub_decrypt_bytea()`, `pgp_key_id()`, `armor()`, `dearmor()`, `pgp_armor_headers()` |
| Raw encryption | `encrypt()`, `decrypt()`, `encrypt_iv()`, `decrypt_iv()` |
| Random data | `gen_random_bytes()`, `gen_random_uuid()` |

Example:

```sql
SELECT digest('santa claus', 'sha256');
SELECT pgp_sym_decrypt(pgp_sym_encrypt('santa clause', 'mypass', 'cipher-algo=aes256'), 'mypass');
```

In addition to the ciphers of the PostgreSQL module, the raw encryption functions accept the SM4 ciphers `sm4-ecb` and `sm4-cbc`, and `digest()` and `hmac()` accept the `sm3` digest. In a build that uses OpenSSL, the SM4 ciphers are available only if Apache Cloudberry was configured with `--enable-openssl-redirect`. Otherwise, they fail with `Cannot use "sm4-ecb": No such cipher algorithm`. The `sm3` digest is available if the OpenSSL library provides it.

## FIPS mode

The module defines the configuration parameter `pgcrypto.fips`, which restricts `pgcrypto` to a limited set of functionality that is suitable for FIPS 140-2 mode. The parameter is a Boolean, its default value is `off`, and only superusers can change it.

FIPS mode requires an OpenSSL library that provides the FIPS module, on all hosts of the cluster. If the OpenSSL version that Apache Cloudberry was compiled against has no FIPS support, turning the parameter on fails with the error `FIPS enabled OpenSSL is required for strict FIPS mode`. A build without OpenSSL does not support FIPS mode.

When `pgcrypto.fips` is `on`:

- FIPS mode is turned on in the OpenSSL library.
- `crypt()` and `gen_salt()` are not allowed.
- The raw encryption functions (`encrypt()`, `decrypt()`, `encrypt_iv()`, and `decrypt_iv()`) are not allowed.
- `digest()` and `hmac()` reject digests that are not FIPS-approved, such as `md5`, with an error that starts with `Cannot use "md5"`.
- The PGP functions are not usable either. They recognize only the `3des`, `aes128` (`aes`), `aes192`, and `aes256` cipher names and the `sha1`, `sha256`, `sha384`, and `sha512` digest names, and reject other names, such as `bf`, with the error `Unsupported cipher algorithm`. Encryption and decryption with the recognized ciphers then fail with `requested functionality not allowed in FIPS mode`, because `pgcrypto` reaches these ciphers through an OpenSSL interface that is not permitted in FIPS mode.

A call to `crypt()`, `gen_salt()`, or a raw encryption function fails with the error `requested functionality not allowed in FIPS mode`.

### Enable FIPS mode

1. Add the `pgcrypto` library to `shared_preload_libraries`, and restart the cluster. This makes the `pgcrypto.fips` parameter known to the server before any `pgcrypto` function is called.

    ```shell
    gpconfig -c shared_preload_libraries -v 'pgcrypto.so'
    gpstop -ar
    ```

    If `shared_preload_libraries` already lists other libraries, keep them in the value.

2. Set the parameter for each database that must use FIPS mode. For example, for the database `testdb`:

    ```sql
    ALTER DATABASE testdb SET pgcrypto.fips TO on;
    ```

3. Reconnect to the database, and check the setting:

    ```sql
    SHOW pgcrypto.fips;
    ```

To turn FIPS mode off, run `ALTER DATABASE testdb RESET pgcrypto.fips;`, and reconnect.

## Module documentation

See [pgcrypto](https://www.postgresql.org/docs/14/pgcrypto.html) in the PostgreSQL documentation for details about the individual functions in this module.
