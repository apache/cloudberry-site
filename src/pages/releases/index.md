---
title: Apache Cloudberry (Incubating) Downloads
description: This page provides download links for the latest release of Apache Cloudberry (Incubating).
---

The Apache Cloudberry (Incubating) project is released in source form (`.tar.gz`) as its official releases. All the official releases are signed by the release manager for the release. PGP signatures and SHA512 checksums are available along with the distribution.

Convenience binaries (`.deb`, `.rpm`, and binary packages) for version 2.1.0 are coming soon. 

## Releases

<table>
<thead>
<tr>
<th>Version</th>
<th>Date</th>
<th>Source archive</th>
<th>Signature & Checksum</th>
<th>Convenience Binaries</th>
<th>Changelog</th>
</tr>
</thead>
<tbody>
<tr>
<td rowSpan="3">2.1.0-incubating <strong>(Latest)</strong></td>
<td rowSpan="3">April 14, 2026</td>
<td><a href="https://www.apache.org/dyn/closer.lua/incubator/cloudberry/2.1.0-incubating/apache-cloudberry-2.1.0-incubating-src.tar.gz?action=download">apache-cloudberry-2.1.0-incubating-src.tar.gz</a></td>
<td><a href="https://downloads.apache.org/incubator/cloudberry/2.1.0-incubating/apache-cloudberry-2.1.0-incubating-src.tar.gz.asc">.asc</a>, <a href="https://downloads.apache.org/incubator/cloudberry/2.1.0-incubating/apache-cloudberry-2.1.0-incubating-src.tar.gz.sha512">.sha512</a></td>
<td>RPM, DEB<br/><em>(Coming soon)</em></td>
<td rowSpan="3"><a href="../releases/2.1.0-incubating">Changelog</a></td>
</tr>
<tr>
<td><a href="https://www.apache.org/dyn/closer.lua/incubator/cloudberry/2.1.0-incubating/apache-cloudberry-backup-2.1.0-incubating-src.tar.gz?action=download">apache-cloudberry-backup-2.1.0-incubating-src.tar.gz</a></td>
<td><a href="https://downloads.apache.org/incubator/cloudberry/2.1.0-incubating/apache-cloudberry-backup-2.1.0-incubating-src.tar.gz.asc">.asc</a>, <a href="https://downloads.apache.org/incubator/cloudberry/2.1.0-incubating/apache-cloudberry-backup-2.1.0-incubating-src.tar.gz.sha512">.sha512</a></td>
<td>Binary Package<br/><em>(Coming soon)</em></td>
</tr>
<tr>
<td><a href="https://www.apache.org/dyn/closer.lua/incubator/cloudberry/2.1.0-incubating/apache-cloudberry-pxf-2.1.0-incubating-src.tar.gz?action=download">apache-cloudberry-pxf-2.1.0-incubating-src.tar.gz</a></td>
<td><a href="https://downloads.apache.org/incubator/cloudberry/2.1.0-incubating/apache-cloudberry-pxf-2.1.0-incubating-src.tar.gz.asc">.asc</a>, <a href="https://downloads.apache.org/incubator/cloudberry/2.1.0-incubating/apache-cloudberry-pxf-2.1.0-incubating-src.tar.gz.sha512">.sha512</a></td>
<td>RPM, DEB<br/><em>(Coming soon)</em></td>
</tr>
<tr>
<td>2.0.0-incubating</td>
<td>August 25, 2025</td>
<td><a href="https://archive.apache.org/dist/incubator/cloudberry/2.0.0-incubating/apache-cloudberry-2.0.0-incubating-src.tar.gz">apache-cloudberry-2.0.0-incubating-src.tar.gz</a></td>
<td><a href="https://downloads.apache.org/incubator/cloudberry/2.0.0-incubating/apache-cloudberry-2.0.0-incubating-src.tar.gz.asc">.asc</a>, <a href="https://downloads.apache.org/incubator/cloudberry/2.0.0-incubating/apache-cloudberry-2.0.0-incubating-src.tar.gz.sha512">.sha512</a></td>
<td>-</td>
<td><a href="../releases/2.0.0-incubating">Changelog</a></td>
</tr>
</tbody>
</table>


## Verifying Releases

- Verify before use. Please check the SHA‑512 checksum (.sha512) and verify the OpenPGP signature (.asc); these should be fetched from the main Apache site.
- The [`KEYS`](https://downloads.apache.org/incubator/cloudberry/KEYS) file contains the public keys used for signing release. We recommend that you use a web of trust, if possible, to confirm the identity of these keys. For more information, please see the [Apache Release FAQ](https://www.apache.org/dev/release.html).

### Step 1: Import release keys

Import the Cloudberry release keys (only need to do this once):

```bash
curl https://downloads.apache.org/incubator/cloudberry/KEYS | gpg --import
```

### Step 2: Download artifacts and verification files

Download all components you need:

```bash
# apache-cloudberry (main)
curl -L -o apache-cloudberry-2.1.0-incubating-src.tar.gz "https://www.apache.org/dyn/closer.lua/incubator/cloudberry/2.1.0-incubating/apache-cloudberry-2.1.0-incubating-src.tar.gz?action=download"
curl -O https://downloads.apache.org/incubator/cloudberry/2.1.0-incubating/apache-cloudberry-2.1.0-incubating-src.tar.gz.asc
curl -O https://downloads.apache.org/incubator/cloudberry/2.1.0-incubating/apache-cloudberry-2.1.0-incubating-src.tar.gz.sha512

# apache-cloudberry-backup
curl -L -o apache-cloudberry-backup-2.1.0-incubating-src.tar.gz "https://www.apache.org/dyn/closer.lua/incubator/cloudberry/2.1.0-incubating/apache-cloudberry-backup-2.1.0-incubating-src.tar.gz?action=download"
curl -O https://downloads.apache.org/incubator/cloudberry/2.1.0-incubating/apache-cloudberry-backup-2.1.0-incubating-src.tar.gz.asc
curl -O https://downloads.apache.org/incubator/cloudberry/2.1.0-incubating/apache-cloudberry-backup-2.1.0-incubating-src.tar.gz.sha512

# apache-cloudberry-pxf
curl -L -o apache-cloudberry-pxf-2.1.0-incubating-src.tar.gz "https://www.apache.org/dyn/closer.lua/incubator/cloudberry/2.1.0-incubating/apache-cloudberry-pxf-2.1.0-incubating-src.tar.gz?action=download"
curl -O https://downloads.apache.org/incubator/cloudberry/2.1.0-incubating/apache-cloudberry-pxf-2.1.0-incubating-src.tar.gz.asc
curl -O https://downloads.apache.org/incubator/cloudberry/2.1.0-incubating/apache-cloudberry-pxf-2.1.0-incubating-src.tar.gz.sha512
```

### Step 3: Verify GPG signatures

Verify all downloaded artifacts:

```bash
# Verify all at once
for i in *.tar.gz; do echo "Verifying $i"; gpg --verify $i.asc $i; done
```

Or verify individually:

```bash
gpg --verify apache-cloudberry-2.1.0-incubating-src.tar.gz.asc apache-cloudberry-2.1.0-incubating-src.tar.gz
gpg --verify apache-cloudberry-backup-2.1.0-incubating-src.tar.gz.asc apache-cloudberry-backup-2.1.0-incubating-src.tar.gz
gpg --verify apache-cloudberry-pxf-2.1.0-incubating-src.tar.gz.asc apache-cloudberry-pxf-2.1.0-incubating-src.tar.gz
```

Expected output:

```
gpg: Signature made Wed 18 Mar 2026 11:27:33 PM PDT
gpg:                using RSA key 9A36AA272348A207E193A49C500708B75754FB7C
gpg: Good signature from "Dianjin Wang (for apache cloudberry release) <djwang@apache.org>" [unknown]
gpg: WARNING: This key is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: 9A36 AA27 2348 A207 E193  A49C 5007 08B7 5754 FB7C
```

### Step 4: Verify SHA512 checksums

Verify all checksums:

```bash
# For Linux - verify all at once
for i in *.tar.gz; do echo "Checking $i"; sha512sum -c $i.sha512; done

# For macOS - verify all at once
for i in *.tar.gz; do echo "Checking $i"; shasum -a 512 -c $i.sha512; done
```

Or verify individually:

```bash
# For Linux
sha512sum -c apache-cloudberry-2.1.0-incubating-src.tar.gz.sha512
sha512sum -c apache-cloudberry-backup-2.1.0-incubating-src.tar.gz.sha512
sha512sum -c apache-cloudberry-pxf-2.1.0-incubating-src.tar.gz.sha512

# For macOS
shasum -a 512 -c apache-cloudberry-2.1.0-incubating-src.tar.gz.sha512
shasum -a 512 -c apache-cloudberry-backup-2.1.0-incubating-src.tar.gz.sha512
shasum -a 512 -c apache-cloudberry-pxf-2.1.0-incubating-src.tar.gz.sha512
```

Expected output:

```
apache-cloudberry-2.1.0-incubating-src.tar.gz: OK
```