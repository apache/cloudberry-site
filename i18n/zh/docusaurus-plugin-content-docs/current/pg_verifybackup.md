---
title: pg_verifybackup
---

# pg_verifybackup

`pg_verifybackup` 用于验证 Apache Cloudberry 集群基本备份的完整性。

## 概要

```shell
pg_verifybackup [选项...] <备份目录>
```

## 描述

`pg_verifybackup` 用于校验数据库集群备份的完整性，它会将 `pg_basebackup` 生成的备份与服务器在备份时创建的 `backup_manifest`（备份清单）进行核对。备份必须以“plain”（普通）格式存储，“tar”格式的备份可以在解压缩后进行核对。

需要注意的是，由 `pg_verifybackup` 执行的验证不能也无法涵盖运行中的服务器在尝试使用该备份时会执行的所有检查。即使使用此工具，你仍然应该执行测试恢复，并验证恢复后的数据库是否按预期工作，以及它们是否包含正确的数据。然而，`pg_verifybackup` 可以检测到许多常见问题，比如由于存储问题或用户错误导致的备份损坏。

备份验证分四个阶段进行。首先，`pg_verifybackup` 会读取 `backup_manifest` 文件。如果该文件不存在、无法读取、格式不正确或无法根据其内部校验和进行验证，`pg_verifybackup` 将以致命错误终止。

其次，`pg_verifybackup` 将尝试验证当前存储在磁盘上的数据文件是否与服务器（执行备份时）计划发送的数据文件完全相同，下面将介绍一些例外情况。它会检测到额外的文件和丢失的文件，不过也有少数例外。此步骤将忽略 `postgresql.auto.conf`、`standby.signal` 和 `recovery.signal` 这三个文件的存在、缺失或对其的任何修改，因为预计这些文件可能已在备份的过程中被创建或修改。它也不会对目标目录中的 `backup_manifest` 文件或 `pg_wal` 目录内的任何内容提出警告，即使这些文件未被列在备份清单中。此步骤只检查文件，不验证目录的存在或缺失，除非像这样间接验证：如果某个目录缺失，那么它应该包含的任何文件也必然会丢失。

接下来，`pg_verifybackup` 将对所有文件进行校验和计算，将校验和与清单中的值进行比较，并对计算出的校验和与清单中存储的校验和不匹配的文件发出错误。对于在上一步中产生错误的任何文件，不执行此步骤，因为已经知道这些文件存在问题。在上一步中被忽略的文件在此步骤中也被忽略。

最后，`pg_verifybackup` 将使用清单来验证恢复备份所需的预写日志记录是否存在，并且可以被读取和解析。 `backup_manifest` 文件包含了（恢复备份）需要哪些预写日志记录的信息，并且 `pg_verifybackup` 将利用该信息调用 `pg_waldump` 来解析这些预写日志记录。调用 `pg_waldump` 时将使用 `--quiet` 标志，这样只会报告错误，而不产生任何其他输出。虽然这种级别的验证足以检测出例如文件缺失或内部校验和不匹配等明显的问题，但它们还不足以检测出所有可能在尝试恢复时出现的问题。例如，如果有一个服务器 bug，该 bug 可能生成了具有正确校验和的预写日志记录，但记录中指定了毫无意义的操作，那么这种问题就无法通过该方法检测出来。

请注意，如果存在恢复备份不需要的额外 WAL 文件，则此工具不会检查这些文件，不过可以单独调用 `pg_waldump` 来检查它们。另外需要注意，WAL 文件的验证是针对特定版本的：你必须使用与待检查备份的 Apache Cloudberry 版本对应的 `pg_verifybackup` 以及 `pg_waldump` 版本。相比之下，数据文件完整性检查适用于任何能够生成 `backup_manifest` 文件的服务器版本。

## 选项

`pg_verifybackup` 接受以下命令行参数：

**`-e`**<br>
**`--exit-on-error`**

检测到备份问题后立刻退出。如果未指定该选项，`pg_verifybackup` 即使在检测到问题后也会继续检查备份，并将所有检测到的问题报告为错误。

**`-i path`**<br>
**`--ignore=path`**

在比较备份中实际存在的数据文件列表与 `backup_manifest` 文件中列出的数据文件列表时，忽略指定的文件或目录，该文件或目录应用相对路径名表示。如果指定了目录，则此选项会影响以该目录位置为根的整个子树。如果存在相对路径名与指定的路径名匹配，则会抑制关于额外文件、丢失文件、文件大小差异或校验和不匹配的警告。此选项可以多次指定。

**`-m path`**<br>
**`--manifest-path=path`**

使用指定路径下的清单文件，而不是位于备份目录根目录下的清单文件。

**`-n`**<br>
**`--no-parse-wal`**

不尝试解析从当前备份恢复所需的预写日志数据。

**`-P`**<br>
**`--progress`**

显示进度信息。

**`-q`**<br>
**`--quiet`**

验证备份成功后不打印任何内容。

**`-s`**<br>
**`--skip-checksums`**

不验证数据文件校验和。但仍会检查是否存在文件以及这些文件的大小。由于不需要读取文件本身，这种方法要快得多。

**`-w path`**<br>
**`--wal-directory=path`**

尝试解析存储在特定目录的 WAL 文件，而不是 `pg_wal` 目录。如果备份与 WAL 存档存储在不同的位置，这可能很有用。

其他选项也可选：

**`-V`**<br>
**`--version`**

打印 `pg_verifybackup` 版本并退出。

**`-?`**<br>
**`--help`**

显示有关 `pg_verifybackup` 命令行参数的帮助，然后退出。

## 例子

要在 `mydbserver` 主机上创建服务器的基本备份并验证备份的完整性：

```shell
pg_basebackup -h mydbserver -D /usr/local/pgsql/data
pg_verifybackup /usr/local/pgsql/data
```

要在 `mydbserver` 主机上创建服务器的基本备份，将清单移动到备份目录之外的某个位置，并验证备份：

```shell
pg_basebackup -h mydbserver -D /usr/local/pgsql/backup1234
mv /usr/local/pgsql/backup1234/backup_manifest /my/secure/location/backup_manifest.1234
pg_verifybackup -m /my/secure/location/backup_manifest.1234 /usr/local/pgsql/backup1234
```

要在验证备份时忽略手动添加到备份目录的文件，并跳过校验和验证：

```shell
pg_basebackup -h mydbserver -D /usr/local/pgsql/data
edit /usr/local/pgsql/data/note.to.self
pg_verifybackup --ignore=note.to.self --skip-checksums /usr/local/pgsql/data
```

## 请参阅

[pg_basebackup](/docs/sys-utilities/pg_basebackup.md)
