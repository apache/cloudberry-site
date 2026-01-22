---
title: pg_verifybackup
---

`pg_verifybackup` 用于验证数据库集群备份的完整性。它会检查备份期间服务器生成的 `backup_manifest` 文件，并验证备份文件的完整性和一致性。

由于 Cloudberry Database 是分布式数据库系统，`pg_verifybackup` 特别适合验证包含 Coordinator 和多个 Datanode 的完整集群备份。

## 使用场景

- **备份验证**：在备份完成后立即验证备份的完整性，确保备份文件未被损坏。
- **恢复前检查**：在执行数据恢复前，验证备份数据的可用性。
- **定期验证**：定期检查长期存储的备份，确保其仍然可用。
- **分布式一致性**：验证分布式环境下多个节点的备份一致性。

## 语法概要

```bash
pg_verifybackup [选项...] 备份目录
```

## 命令选项说明

以下选项可用于控制验证过程：

### 基本选项

- **-e, --exit-on-error**
  - 检测到问题时立即退出
  - 默认情况下会继续检查并报告所有问题

- **-i path, --ignore=path**
  - 忽略指定的文件或目录（使用相对路径）
  - 如果指定目录，将影响该目录下的所有文件
  - 可多次使用此选项

- **-m path, --manifest-path=path**
  - 使用指定路径的清单文件
  - 默认在备份目录根目录中查找

- **-n, --no-parse-wal**
  - 不解析预写日志数据
  - 适用于只需验证数据文件的场景

- **-q, --quiet**
  - 验证成功时不输出信息
  - 适合集成到自动化脚本中

- **-s, --skip-checksums**
  - 跳过数据文件校验和验证
  - 仍会检查文件存在性和大小
  - 显著提高验证速度

- **-w path, --wal-directory=path**
  - 在指定目录中查找 WAL 文件
  - 适用于 WAL 归档与备份分开存储的情况

### 其他选项

- **-V, --version**
  - 显示版本信息并退出

- **-?, --help**
  - 显示帮助信息并退出

## 使用示例

### 基本验证

验证 Coordinator 节点备份：

```bash
pg_verifybackup /backup/cloudberry/coordinator
```

### 使用外部清单文件

```bash
# 创建备份
pg_basebackup -h mydbserver -D /backup/cloudberry/node1

# 移动清单文件到安全位置
mv /backup/cloudberry/node1/backup_manifest /secure/manifest.node1

# 验证备份
pg_verifybackup -m /secure/manifest.node1 /backup/cloudberry/node1
```

### 快速验证模式

```bash
# 跳过校验和验证，仅检查文件完整性
pg_verifybackup --skip-checksums /backup/cloudberry/node1
```

### 忽略特定文件

```bash
# 忽略自定义配置文件和临时文件
pg_verifybackup \
  --ignore=postgresql.auto.conf \
  --ignore=temp \
  /backup/cloudberry/node1
```

## 验证过程

工具执行验证的四个阶段：

### 1. 清单文件验证
- 读取并验证 backup_manifest 文件
- 检查文件格式和内部校验和
- 验证清单文件的完整性

### 2. 文件集验证
- 检查所有必需文件的存在性
- 验证文件大小
- 标识多余或缺失的文件
- 自动忽略以下文件的变化：
  - postgresql.auto.conf
  - standby.signal
  - recovery.signal
  - backup_manifest
  - pg_wal 目录内容

### 3. 数据完整性验证
- 计算所有数据文件的校验和
- 与清单中记录的校验和比对
- 验证文件未被修改

### 4. WAL 验证
- 检查恢复所需的 WAL 文件
- 验证 WAL 文件可以被解析
- 确保可以执行时间点恢复

## 常见问题

### 清单文件缺失如何处理？

- **现象**：找不到 backup_manifest 文件
- **原因**：备份过程未生成清单或清单被移动
- **解决**：
  1. 确保使用正确的备份目录
  2. 使用 -m 选项指定清单文件位置
  3. 重新执行带清单生成的备份

### 校验和不匹配如何解决？

- **现象**：文件校验和验证失败
- **原因**：文件在传输或存储过程中被修改
- **解决**：
  1. 检查存储系统完整性
  2. 验证传输过程是否可靠
  3. 考虑重新执行备份

### WAL 文件问题如何处理？

- **现象**：缺少必要的 WAL 文件
- **原因**：WAL 归档不完整或位置错误
- **解决**：
  1. 检查 WAL 归档设置
  2. 使用 -w 选项指定正确的 WAL 目录
  3. 确保 WAL 保留策略合适

## 相关命令

- pg_basebackup
- pg_waldump
- pg_controldata

通过 `pg_verifybackup`，Cloudberry Database 用户可以确保其备份的完整性和可用性。建议将此工具集成到常规备份流程中，确保数据安全。