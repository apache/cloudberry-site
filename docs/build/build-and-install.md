---
title: Build and Install Apache Cloudberry and contrib extensions
---

## Compile the code

```bash
# Uses the following command to compile the core components of Apache Cloudberry:
make -j$(nproc) --directory=~/cloudberry

# Compiles additional contrib modules, which provide optional features and extensions:
make -j$(nproc) --directory=~/cloudberry/contrib
```

## Install the compiled binaries

```bash
# Installs the core components to the specified installation directory:
make install --directory=~/cloudberry

# Installs the contrib modules to the specified installation directory:
make install --directory=~/cloudberry/contrib
```

## Verify installation

After installation, verify the setup with these steps:

### 1. Check Cloudberry version

```bash
/usr/local/cloudberry-db/bin/postgres --gp-version
/usr/local/cloudberry-db/bin/postgres --version
```

### 2. Verify library dependencies

```bash
ldd /usr/local/cloudberry-db/bin/postgres
```

### 3. Check library extensions

```bash
ls -al /usr/local/cloudberry-db/share/postgresql/extension
```

### 4. Check core utilities

```bash
ls -l /usr/local/cloudberry-db/bin/
```
Expected output should show critical binaries like postgres, initdb, etc.

## Common issues

- Configure fails with missing dependencies:

    1. Verify all required packages are installed.
    2. Check the configure log file for specific errors.
    3. Ensure CRB repository is properly enabled.

- Build fails with compilation errors:

    1. Check make logs for specific errors.
    2. Ensure sufficient system resources are available.
    3. Verify Xerces-C installation is correct.

- Library loading issues:

    1. Verify `LD_LIBRARY_PATH` includes required directories.
    2. Check library permissions.

For detailed error messages, review the timestamped log files created during the installation process.

You have successfully built and installed Apache Cloudberry on Rocky Linux 9. The installation directory is `/usr/local/cloudberry-db`.