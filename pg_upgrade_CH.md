

---

# PostgreSQL 数据库升级工具

`pg_upgrade` 是 PostgreSQL 提供的一个用于升级数据库集群的工具。它允许用户将 PostgreSQL 数据库从一个主版本升级到另一个主版本，而无需进行其他耗时的数据转储和恢复操作。

---

## 目录
1. [简介](#简介)
2. [使用前提](#使用前提)
3. [升级步骤](#升级步骤)
4. [升级模式](#升级模式)
5. [注意事项](#注意事项)
6. [常见问题](#常见问题)
7. [参考文档](#参考文档)

---

## 简介
`pg_upgrade` 是一个用于升级 PostgreSQL 数据库集群的工具。它通过直接升级数据文件的方式，避免了传统的数据转储和恢复的过程，从而显著提升了升级效率。

### 主要特点
- 支持跨主要版本的升级（例如，从 PostgreSQL 13 升级到 PostgreSQL 14）。
- 支持原地升级（in-place upgrade）和链接模式升级（link mode）。
- 保留数据库集群的配置和数据完整性。

---

## 使用前提
在使用 `pg_upgrade` 之前，请确保升级环境已满足以下条件：
1. **版本兼容性**：源集群和目标集群的 PostgreSQL 版本必须是相邻的主要版本（例如，13.x 到 14.x）。
2. **数据目录**：源集群和目标集群的数据目录必须位于不同的位置。
3. **扩展兼容性**：确保所有已安装的扩展在新版本中可用且兼容。
4. **备份**：在升级前，务必对源集群进行完整备份。
5. **停止服务**：升级过程中，源集群和目标集群必须停止运行。

---

## 升级步骤
以下是使用 `pg_upgrade` 进行升级的基本步骤：

### 1. 安装新版本 PostgreSQL
安装目标版本的 PostgreSQL，并确保 `pg_upgrade` 工具可用。

```bash
# 示例：安装 PostgreSQL 14
sudo apt-get install postgresql-14
```

### 2. 初始化新集群
初始化一个新的 PostgreSQL 集群作为目标集群。

```bash
# 初始化新集群
/usr/lib/postgresql/14/bin/initdb -D /path/to/new/data
```

### 3. 停止源集群和目标集群
确保源集群和目标集群都已停止。

```bash
# 停止源集群
pg_ctl -D /path/to/old/data stop

# 停止目标集群
pg_ctl -D /path/to/new/data stop
```

### 4. 运行 `pg_upgrade`
使用 `pg_upgrade` 工具进行升级。

```bash
# 运行 pg_upgrade
/usr/lib/postgresql/14/bin/pg_upgrade \
  -b /usr/lib/postgresql/13/bin \  # 旧版本的二进制文件路径
  -B /usr/lib/postgresql/14/bin \  # 新版本的二进制文件路径
  -d /path/to/old/data \           # 旧集群的数据目录
  -D /path/to/new/data             # 新集群的数据目录
```

### 5. 检查升级结果
升级完成后，检查日志文件以确保没有错误。

```bash
less /path/to/new/data/pg_upgrade_server.log
```

### 6. 启动新集群
启动升级后的新集群。

```bash
pg_ctl -D /path/to/new/data start
```

---

## 升级模式
`pg_upgrade` 支持两种升级模式：

### 1. **拷贝模式（Copy Mode）**
- 默认模式。
- 将旧集群的数据文件复制到新集群中。
- 需要额外的磁盘空间来存储副本。

### 2. **链接模式（Link Mode）**
- 使用硬链接来共享数据文件，避免复制数据。
- 节省磁盘空间，但要求源集群和目标集群位于同一文件系统上。
- 启用方式：在 `pg_upgrade` 命令中添加 `--link` 参数。

```bash
pg_upgrade --link ...
```

---

## 注意事项
1. **扩展兼容性**：某些扩展可能不兼容新版本，需手动更新或重新安装。
2. **配置文件**：`pg_upgrade` 不会自动迁移配置文件（如 `postgresql.conf` 和 `pg_hba.conf`），需手动复制。
3. **权限**：确保运行 `pg_upgrade` 的用户具有足够的权限访问源集群和目标集群。
4. **测试**：在生产环境升级前，建议在测试环境中进行验证。

---

## 常见问题

### 1. 升级失败怎么办？
- 检查日志文件（`pg_upgrade_server.log` 和 `pg_upgrade_utility.log`）以获取错误信息。
- 恢复备份并重新尝试升级。

### 2. 如何回滚升级？
- 如果升级失败，可以恢复备份的旧集群数据目录，并重新启动旧版本的 PostgreSQL。

### 3. 是否支持跨多个主要版本升级？
- 不支持。`pg_upgrade` 仅支持相邻的主要版本升级（例如，13.x 到 14.x）。如果需要跨多个版本升级，需逐步进行。

---

## 参考文档
- [PostgreSQL 官方文档 - pg_upgrade](https://www.postgresql.org/docs/14/pgupgrade.html)
- [PostgreSQL 升级指南](https://www.postgresql.org/docs/current/upgrading.html)

---

通过以上步骤和注意事项，您可以顺利使用 `pg_upgrade` 工具升级 PostgreSQL 数据库集群。

---

## 详细说明

### 1. **升级前的准备工作**
在升级之前，请确保完成以下准备工作：
- 备份所有数据。
- 检查所有扩展的兼容性。
- 确保源集群和目标集群的数据目录位于不同的位置。

### 2. **升级后的清理工作**
升级完成后，您可以删除旧集群的数据目录以释放磁盘空间。但在此之前，请确保新集群运行正常。

```bash
# 删除旧集群数据目录
rm -rf /path/to/old/data
```

### 3. **日志文件**
`pg_upgrade` 会生成以下日志文件：
- `pg_upgrade_server.log`：服务器日志。
- `pg_upgrade_utility.log`：工具日志。

检查这些日志文件以确认升级是否成功。

---

## 示例

以下是一个完整的升级示例：

```bash
# 停止旧集群
pg_ctl -D /var/lib/postgresql/13/data stop

# 初始化新集群
/usr/lib/postgresql/14/bin/initdb -D /var/lib/postgresql/14/data

# 运行 pg_upgrade
/usr/lib/postgresql/14/bin/pg_upgrade \
  -b /usr/lib/postgresql/13/bin \
  -B /usr/lib/postgresql/14/bin \
  -d /var/lib/postgresql/13/data \
  -D /var/lib/postgresql/14/data

# 启动新集群
pg_ctl -D /var/lib/postgresql/14/data start
```

---

通过遵循本指南，您可以顺利完成 PostgreSQL 数据库的升级。如有疑问，请参考 [PostgreSQL 官方文档](https://www.postgresql.org/docs/14/pgupgrade.html)。

--- 
