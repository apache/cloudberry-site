# Cloudberry 系统工具：pg_verifybackup

pg_verifybackup 能够验证 PostgreSQL 集群基础备份的完整性。本文档介绍 Cloudberry 系统工具：pg_verifybackup 的功能。

## 功能描述

pg_verifybackup 用于对照备份时服务器生成的 backup_manifest 文件，检查使用 pg_basebackup 工具所做的数据库集群备份的完整性。备份必须以 “普通” 格式存储；“tar” 格式的备份在解压后可以进行检查。

## 注意事项

pg_verifybackup 执行的验证工作并不会也不能涵盖运行中的服务器在尝试使用该备份时所执行的每一项检查。即便使用了此工具，仍应执行测试恢复操作，并验证恢复后得到的数据库能否按预期工作以及其中的数据是否正确。不过，pg_verifybackup 能够检测出许多因存储问题或用户操作失误而经常出现的问题。

- 如果存在恢复备份时不需要的额外的预写日志（WAL）文件，此工具不会对其进行检查，不过可以为此单独调用 'pg_waldump'。

- WAL 验证是特定于版本的：必须使用与被检查备份相对应版本的 'pg_verifybackup'（以及相应版本的 pg_waldump）。

相比之下，数据文件完整性检查应当适用于生成 'backup_manifest' 文件的服务器的任何版本。

## 语法格式

pg_verifybackup \[选项……\]

## 操作步骤

备份验证分四个阶段进行。具体的操作步骤如下：

### 步骤 1：读取 backup_manifest 文件

如果该文件不存在、无法读取、格式有误或者针对其自身内部校验和的验证失败，'pg_verifybackup' 将会以严重错误终止运行。

### 步骤 2：验证数据文件

'pg_verifybackup' 会尝试验证当前存储在磁盘上的数据文件与服务器原本打算发送的数据文件是否完全一致，但存在下文所述的一些例外情况。它能够检测出多余和缺失的文件（也有少数例外情况）。具体说明如下：

- 此步骤会忽略 'postgresql.auto.conf'、'standby.signal' 和 'recovery.signal' 文件的存在与否以及任何修改情况，因为预计这些文件可能在备份过程中被创建或修改。

- 同时不会对目标目录中的 'backup_manifest' 文件或者 'pg_wal' 目录内的任何内容提出异议，即便这些文件不会列在备份清单中。

- 只对文件进行检查，不会直接验证目录的存在与否，不过存在间接验证的情况。如果某个目录缺失，那么该目录原本应包含的任何文件必然也会缺失。

### 步骤 3：文件检查

'pg_verifybackup' 会对所有文件计算校验和，将校验和与清单中的值进行对比，并针对计算出的校验和与清单中存储的校验和不匹配的任何文件报错。

'''warning
对于在上一步骤中出现错误的文件，不会执行此步骤，因为已知这些文件存在问题。在上一步骤中被忽略的文件在本步骤中同样会被忽略。 
'''

### 步骤 4：预写日志记录验证

'pg_verifybackup' 会使用清单来验证恢复备份所需的预写日志记录是否存在，以及能否对其进行读取和解析。'backup_manifest' 文件包含了关于需要哪些预写日志记录的信息，'pg_verifybackup' 会利用这些信息调用 'pg_waldump' 来解析这些预写日志记录。会使用 '--quiet' 标志，这样 'pg_waldump' 就只会报告错误，而不会产生其他任何输出。尽管这种验证级别足以检测出例如文件缺失或者文件内部校验和不匹配之类的明显问题，但还不足以检测出在尝试恢复时可能出现的所有问题。例如，服务器存在漏洞导致生成的预写日志记录校验和正确但指定了无意义的操作，这种情况就无法通过这种方法检测出来。

## 命令参数

pg_verifybackup 接受以下命令行参数：

|  |  |  |
|:---|:---|:---|
| **命令** | **选项参数** | **功能描述** |
| -e | --exit-on-error | 一旦检测到备份存在问题就立即退出。如果未指定此选项，'pg_verifybackup' 在检测到问题后仍会继续检查备份，并将检测到的所有问题作为错误进行报告。 |
| -i ***path*** | --ignore=***path*** | 在将备份中实际存在的数据文件列表与 'backup_manifest' 文件中列出的文件进行对比时，忽略指定的文件或目录（应当以相对路径名表示）。如果指定的是目录，此选项会影响以该位置为根的整个子树。如果相对路径名与指定的路径名匹配，那么关于多余文件、缺失文件、文件大小差异或者校验和不匹配的相关报错将会被抑制。此选项可以多次指定。 |
| -m ***path*** | --manifest-path=***path*** | 使用指定路径下的清单文件，而非位于备份目录根目录下的清单文件。 |
| -n | --no-parse-wal | 不要尝试解析从该备份恢复时所需的预写日志数据。 |
| -q | --quiet | 在备份验证成功时不输出任何内容。 |
| -s | --skip-checksums | 不验证数据文件的校验和。但仍会检查文件的存在与否以及文件大小。这样速度会快很多，因为无需读取文件本身。 |
| -w ***path*** | --wal-directory=***path*** | 尝试解析存储在指定目录（而非 pg_wal 目录）中的预写日志（WAL）文件。如果备份存储的位置与 WAL 归档所在位置不同，此操作可能会很有用。 |
| 其他选项也可使用 |  |  |
| -V | --version | 打印 'pg_verifybackup' 的版本信息并退出。 |
| -? | --help | 显示有关 'pg_verifybackup' 命令行参数的帮助信息并退出。 |

## 示例

对 'mydbserver' 的服务器创建基础备份并验证备份的完整性：

'''
$ pg_basebackup -h mydbserver -D /usr/local/pgsql/data
$ pg_verifybackup /usr/local/pgsql/data
'''

对 'mydbserver' 的服务器创建基础备份，将清单文件移到备份目录之外的某个位置，然后验证备份：

```
$ pg_basebackup -h mydbserver -D /usr/local/pgsql/backup1234
$ mv /usr/local/pgsql/backup1234/backup_manifest /my/secure/location/backup_manifest.1234
$ pg_verifybackup -m /my/secure/location/backup_manifest.1234 /usr/local/pgsql/backup1234
```

要在验证备份时忽略手动添加到备份目录中的某个文件，并且跳过校验和验证：

```
$ pg_basebackup -h mydbserver -D /usr/local/pgsql/data
$ edit /usr/local/pgsql/data/note.to.self
$ pg_verifybackup --ignore=note.to.self --skip-checksums /usr/local/pgsql/data
```
