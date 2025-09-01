---
title: Apache Cloudberry (Incubating) Downloads
description: This page provides download links for the latest release of Apache Cloudberry (Incubating).
---

The Apache Cloudberry (Incubating) project is released in source form (`.tar.gz`) as its official releases. All the official releases are signed by the release manager for the release. PGP signatures and SHA512 checksums are available along with the distribution.

Convenience binaries (eg, `.deb`, `.rpm`) will be made in the future. 

## Releases

| Version | Date | Source archive | Signature & Checksum | Changelog |
|---------|------|----------------|-----------|---------------|
| 2.0.0-incubating (latest) | August 25, 2025 | [apache-cloudberry-2.0.0-incubating-src.tar.gz](https://downloads.apache.org/incubator/cloudberry/2.0.0-incubating/apache-cloudberry-2.0.0-incubating-src.tar.gz) | [.asc](https://downloads.apache.org/incubator/cloudberry/2.0.0-incubating/apache-cloudberry-2.0.0-incubating-src.tar.gz.asc), [.sha512](https://downloads.apache.org/incubator/cloudberry/2.0.0-incubating/apache-cloudberry-2.0.0-incubating-src.tar.gz.sha512) | [Changelog](../releases/2.0.0-incubating) |


## Verifying Releases

- Verify before use. Please check the SHA‑512 checksum (.sha512) and verify the OpenPGP signature (.asc); these should be fetched from the main Apache site.
- The [`KEYS`](https://downloads.apache.org/incubator/cloudberry/KEYS) file contains the public keys used for signing release. We recommend that you use a web of trust, if possible, to confirm the identity of these keys. For more information, please see the [Apache Release FAQ](https://www.apache.org/dev/release.html).

### Checking the signature

```
# Import Cloudberry release keys
curl https://downloads.apache.org/incubator/cloudberry/KEYS | gpg --import

# Download artifact, matching .asc file
curl -O https://downloads.apache.org/incubator/cloudberry/2.0.0-incubating/apache-cloudberry-2.0.0-incubating-src.tar.gz
curl -O https://downloads.apache.org/incubator/cloudberry/2.0.0-incubating/apache-cloudberry-2.0.0-incubating-src.tar.gz.asc

# Verify signature
gpg --verify apache-cloudberry-2.0.0-incubating-src.tar.gz.asc apache-cloudberry-2.0.0-incubating-src.tar.gz
```

Expected output:

```
gpg: Signature made Thu 05 Jun 2025 05:43:53 PM PDT
gpg:                using RSA key 21571B62BF59A2C896EEA49060C8D62C26775FC1
gpg:                issuer "espino@apache.org"
gpg: Good signature from "Ed Espino <espino@apache.org>" [unknown]
gpg: WARNING: The key's User ID is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: 3B90 B563 4E45 06F0 5BA5  1F2F C960 4135 C07C D12A
     Subkey fingerprint: 2157 1B62 BF59 A2C8 96EE  A490 60C8 D62C 2677 5FC1
```

### Checking the SHA512 checksum

The SHA512 checksum is used to check that a file has been downloaded correctly, and your download hasn't been modifed or is otherwise incomplete or faulty.

```
curl -O https://downloads.apache.org/incubator/cloudberry/2.0.0-incubating/apache-cloudberry-2.0.0-incubating-src.tar.gz
curl -O https://downloads.apache.org/incubator/cloudberry/2.0.0-incubating/apache-cloudberry-2.0.0-incubating-src.tar.gz.sha512

# For Linux users
sha512sum -c apache-cloudberry-2.0.0-incubating-src.tar.gz.sha512

# For macOS users
shasum -a 512 -c apache-cloudberry-2.0.0-incubating-src.tar.gz.sha512
```

Expected output should be:

```
apache-cloudberry-2.0.0-incubating-src.tar.gz: OK
```
