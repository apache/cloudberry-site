**Cloudberry System Tool: pg_upgrade**

### Overview

`pg_upgrade` is a tool used to upgrade a PostgreSQL database from one version to another without interrupting service. It allows the database to continue running during the upgrade process and supports upgrades from PostgreSQL 9.3 and later to the latest version.

### Installation and Configuration

`pg_upgrade` is typically installed as part of PostgreSQL. 

1. **Install the New PostgreSQL Version**
   - Download the latest version of PostgreSQL from the official PostgreSQL website or repository.
   - Install the new version, ensuring that you have the necessary permissions and following the installation guide appropriate for your operating system.
   
1. **Install pg_upgrade**
   
   - `pg_upgrade` is included by default with the PostgreSQL installation. If you have installed PostgreSQL from source, make sure to include `pg_upgrade` in your installation.
   - For custom installation locations, use the `prefix` variable during the installation process to specify the location:
     ```
     make prefix=/path/to/new/pgsql install

### Usage

To use `pg_upgrade` to upgrade a database, follow these steps:

1. Stop the old version of the PostgreSQL server.

2. Use the `pg_upgrade` command to perform the upgrade. For example:

   ```
     pg_upgrade -d /path/to/old/data -D /path/to/new/data -U postgres
   ```

   This will upgrade the database from the old version located at `/path/to/old/data` to the new version located at `/path/to/new/data`, using the `postgres` user for the upgrade.

3. Start the new version of the PostgreSQL server.

### Options

Here are some common `pg_upgrade` options:

- `-d` or `--old-datadir`: Specify the path to the old version database data directory.
- `-D` or `--new-datadir`: Specify the path to the new version database data directory.
- `-U` or `--username`: Specify the database username to use for the upgrade.
- `-v` or `--verbose`: Increase the level of detail in the output.
- `-k` or `--keep-old`: Keep the old version data directory after the upgrade.
- `-l` or `--link`: Use hard links instead of copying files to speed up the upgrade process.
- `-o` or `--old-bindir`: Specify the binary file directory of the old version PostgreSQL.
- `-n` or `--new-bindir`: Specify the binary file directory of the new version PostgreSQL.

### Notes

- Before upgrading, ensure that all database connections are closed.
- During the upgrade process, you need to have enough disk space to store the new version database files.
- `pg_upgrade` does not support cross-architecture upgrades, such as from 32-bit to 64-bit or vice versa.
- If you use third-party plugins or extensions, you may need to reinstall or upgrade them.

### Result Interpretation

After the upgrade is complete, `pg_upgrade` will display a success message. If an error occurs during the upgrade process, the tool will report the corresponding error information.

### Reference

For more information about `pg_upgrade`, refer to the PostgreSQL official documentation: https://www.postgresql.org/docs/14/pgupgrade.html

### Conclusion

`pg_upgrade` is a powerful tool that allows users to upgrade their PostgreSQL database from one version to another without interrupting service. By following the correct steps and notes, users can successfully complete the upgrade process and ensure the safety and reliability of their database.