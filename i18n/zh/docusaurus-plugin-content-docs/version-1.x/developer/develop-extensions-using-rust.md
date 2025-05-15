# 使用 PGRX 框架开发数据库扩展

本文档介绍如何使用 Rust 和 PGRX 框架开发数据库扩展。PGRX 是一个高效、安全的 Rust 框架，适用于开发 Apache Cloudberry 的数据库扩展。

PGRX 的功能说明，参考 [PGRX 核心功能](#pgrx-核心功能)。PGRX 的注意事项，参考 [PGRX 注意事项](#pgrx-注意事项)。

## 开发环境要求

- 确保您的操作系统为 Debian/Ubuntu 或 RHEL/CentOS 系统。
- 确保您的 Apache Cloudberry 集群是通过源码编译的，非通过 RPM 包安装的。

### 基础软件环境

- 确保已安装以下软件：

  - Rust 工具链（`rustc`、`cargo` 和 `rustfmt`），建议通过 https://rustup.rs 安装
  - Git
  - libclang 11 或更高版本（用于 bindgen）
  - GCC 7 或更高版本

### PostgreSQL 依赖

确保已根据操作系统安装以下 PostgreSQL 依赖：

对于 Debian/Ubuntu 系统：

```bash
sudo apt-get install build-essential libreadline-dev zlib1g-dev flex bison \
    libxml2-dev libxslt-dev libssl-dev libxml2-utils xsltproc ccache pkg-config
```

对于 RHEL/CentOS 系统：

```bash
sudo yum install -y bison-devel readline-devel zlib-devel openssl-devel wget ccache
sudo yum groupinstall -y 'Development Tools'
```

完成上述依赖安装后，即可开始开发扩展。

## 快速上手

本节介绍如何使用 PGRX 快速开发数据库扩展，主要包括：

- 配置 PGRX 环境与安装
- 创建扩展
- 安装和使用扩展

### 配置 PGRX 环境与安装
:::note
PGRX 由 PgCentral Foundation, Inc. 维护，但此处我们使用的版本是一个 [PGRX 衍生版本](https://github.com/cloudberry-contrib/pgrx)，与 Cloudberry 保持了良好的兼容性。该版本是由社区成员贡献，而非 Cloudberry 官方项目。
:::
1. 为 Apache Cloudberry 的 `pg_config` 路径设置环境变量，其中 `<pg_config_path>` 是 Apache Cloudberry 集群中的 `pg_config` 路径，例如 `/usr/local/cloudberry-db/bin/pg_config`：

   ```bash
   export PGRX_PG_CONFIG_PATH=<pg_config_path>
   ```

2. 编译 PGRX 框架：

   1. 克隆适配 Apache Cloudberry 的 `pgrx` 代码仓库：

      ```bash
      git clone https://github.com/cloudberry-contrib/pgrx
      cd pgrx
      ```

   2. 编译框架时，启用 `pg14` 和 `cbdb`：

      ```bash
      cargo build --features "pg14, cbdb"
      ```

3. 安装已适配 Apache Cloudberry 的 `cargo-pgrx` 工具：

   ```bash
   cargo install --path cargo-pgrx/
   ```

4. 使用数据库对应的内核版本初始化环境：

   ```bash
   cargo pgrx init --pg14=`which pg_config`
   ```

### 创建扩展

1. 生成扩展模板。本示例创建一个名为 `my_extension` 的扩展：

   ```bash
   cargo pgrx new my_extension
   cd my_extension
   ```

   创建后的目录结构如下：

   ```bash
   .
   ├── Cargo.toml
   ├── my_extension.control
   ├── sql
   └── src
       ├── bin
       │   └── pgrx_embed.rs
       └── lib.rs
   ```

2. 修改 `Cargo.toml` 文件中的依赖配置，使用本地的 pgrx。

   - 将 `[dependencies]` 下 `pgrx = "0.12.7"` 的版本号修改为 PGRX 本地仓库中 `pgrx` 目录的路径，例如：

      ```toml
      [dependencies]
      pgrx = { path = "/home/gpadmin/pgrx/pgrx/", features = ["pg14", "cbdb"] }
      ```

   - 在 `[dependencies]` 下添加 `pgrx-pg-sys = { path = "<local_path>", features = ["pg14", "cbdb"] }`，其中 `<local_path>` 是 PGRX 本地仓库中 `pgrx-pg-sys` 目录的路径，例如 `/home/gpadmin/pgrx/pgrx-pg-sys/`。

   - 将 `[dev-dependencies]` 下 `pgrx-tests = "0.12.7"` 的版本号修改为 pgrx 本地仓库中 `pgrx-tests` 目录的路径，例如：

      ```toml
      [dev-dependencies]
      pgrx-tests = { path = "/home/gpadmin/pgrx/pgrx-tests/" }
      ```

   - 删掉 `pgrx-test = []` 一行。

3. 将扩展名 `my_extension` 添加至 PGRX 本地仓库中 `Cargo.toml` 文件中 `workspace.members` 数组中，例如：

   ```bash
   vi /home/gpadmin/pgrx/Cargo.toml
   ```

   ```toml
   [workspace]
   resolver = "2"
   members = [
      "cargo-pgrx",
      "pgrx",
      "pgrx-macros",
      "pgrx-pg-config",
      "pgrx-pg-sys",
      "pgrx-sql-entity-graph",
      "pgrx-tests",
      "pgrx-bindgen",
      "my_extension"
   ]
   ```

4. 为当前系统用户授予 Apache Cloudberry 目录的权限。例如当前系统用户为 `gpadmin`，Apache Cloudberry 目录为 `/usr/local/cloudberrydb`：

   ```bash
   sudo chown -R gpadmin:gpadmin /usr/local/cloudberrydb
   ```

### 安装和使用扩展

1. 安装扩展：

   ```bash
   cargo pgrx install
   ```

2. 在数据库中使用扩展，连接到数据库后执行以下语句：

   ```sql
   CREATE EXTENSION my_extension;

   -- 测试示例函数
   SELECT hello_my_extension();
   ```

## 类型映射

下表列出了 Apache Cloudberry (PostgreSQL) 数据类型到 Rust 类型的完整映射关系：

| 数据库数据类型 | Rust 类型 (`Option<T>`) |
|--------------|------------------------|
| `bytea` | `Vec<u8>` 或 `&[u8]`（零拷贝） |
| `text` | `String` 或 `&str`（零拷贝） |
| `varchar` | `String` 或 `&str`（零拷贝）或 `char` |
| `"char"` | `i8` |
| `smallint` | `i16` |
| `integer` | `i32` |
| `bigint` | `i64` |
| `oid` | `u32` |
| `real` | `f32` |
| `double precision` | `f64` |
| `bool` | `bool` |
| `json` | `pgrx::Json(serde_json::Value)` |
| `jsonb` | `pgrx::JsonB(serde_json::Value)` |
| `date` | `pgrx::Date` |
| `time` | `pgrx::Time` |
| `timestamp` | `pgrx::Timestamp` |
| `time with time zone` | `pgrx::TimeWithTimeZone` |
| `timestamp with time zone` | `pgrx::TimestampWithTimeZone` |
| `anyarray` | `pgrx::AnyArray` |
| `anyelement` | `pgrx::AnyElement` |
| `box` | `pgrx::pg_sys::BOX` |
| `point` | `pgrx::pg_sys::Point` |
| `tid` | `pgrx::pg_sys::ItemPointerData` |
| `cstring` | `&core::ffi::CStr` |
| `numeric` | `pgrx::Numeric<P, S>` 或 `pgrx::AnyNumeric` |
| `void` | `()` |
| `ARRAY[]::<type>` | `Vec<Option<T>>` 或 `pgrx::Array<T>`（零拷贝） |
| `int4range` | `pgrx::Range<i32>` |
| `int8range` | `pgrx::Range<i64>` |
| `numrange` | `pgrx::Range<Numeric<P, S>>` 或 `pgrx::Range<AnyRange>` |
| `daterange` | `pgrx::Range<pgrx::Date>` |
| `tsrange` | `pgrx::Range<pgrx::Timestamp>` |
| `tstzrange` | `pgrx::Range<pgrx::TimestampWithTimeZone>` |
| `NULL` | `Option::None` |
| `internal` | `pgrx::PgBox<T>`（其中 `T` 可以是任何 Rust/Postgres 结构体） |
| `uuid` | `pgrx::Uuid([u8; 16])` |

### 自定义类型转换

您可以通过以下方式实现额外的类型转换：

- 实现 `IntoDatum` 和 `FromDatum` traits
- 使用 `#[derive(PostgresType)]` 和 `#[derive(PostgresEnum)]` 进行自动类型转换

### 类型映射说明

PGRX 将 `text` 和 `varchar` 转换为 `&str` 或 `String`，并且会验证编码是否为 UTF-8。如果检测到非 UTF-8 编码，PGRX 将会触发 panic 以警告开发者。由于 UTF-8 验证可能影响性能，不建议依赖 UTF-8 验证。

PostgreSQL 服务器的默认编码是 `SQL_ASCII`，它既不保证 ASCII 也不保证 UTF-8（Apache Cloudberry 会接受但忽略非 ASCII 字节）。为获得最佳结果，请始终使用 UTF-8 编码的 PGRX，并在创建数据库时显式设置数据库编码。

## PGRX 核心功能

### 完整的开发环境管理

PGRX 提供了一套完整的命令行工具：

- `cargo pgrx new`：快速创建新扩展。
- `cargo pgrx init`：安装或注册 Apache Cloudberry (PostgreSQL) 实例。
- `cargo pgrx run`：在 psql（或 pgcli）中交互式测试扩展。
- `cargo pgrx test`：跨多个 Apache Cloudberry (PostgreSQL) 版本进行单元测试。
- `cargo pgrx package`：创建扩展安装包。

### 自动模式生成

- 完全使用 Rust 实现扩展。
- 自动映射多种 Rust 类型到 Apache Cloudberry (PostgreSQL) 类型。
- 自动生成 SQL 模式（也可通过 `cargo pgrx schema` 手动生成）。
- 使用 `extension_sql!` 和 `extension_sql_file!` 包含自定义 SQL。

### 安全优先

- 将 Rust 的 `panic!` 转换为 Apache Cloudberry/PostgreSQL 的 `ERROR`（中止事务而非进程）。
- 内存管理遵循 Rust 的 `DROP` 语义，包括处理 `panic!` 和 `elog(ERROR)` 的情况。
- 使用 `#[pg_guard]` 过程宏确保安全性。
- Apache Cloudberry `Datum` 表示为 `Option<T> where T: FromDatum`，NULL 值安全地表示为 `Option::<T>::None`。

### UDF 支持

- 使用 `#[pg_extern]` 注解将函数暴露给 Apache Cloudberry。
- 返回 `pgrx::iter::SetOfIterator<'a, T>` 实现 `RETURNS SETOF`。
- 返回 `pgrx::iter::TableIterator<'a, T>` 实现 `RETURNS TABLE (...)`。
- 使用 `#[pg_trigger]` 创建触发器函数。

### 简单的自定义类型

- 使用 `#[derive(PostgresType)]` 将 Rust 结构体作为 Apache Cloudberry 类型。
  - 默认使用 CBOR 编码存储，JSON 作为人类可读格式。
  - 支持自定义内存/磁盘/可读格式。
- 使用 `#[derive(PostgresEnum)]` 将 Rust 枚举作为 Apache Cloudberry 枚举。
- 通过 `pgrx::composite_type!("Sample")` 宏支持复合类型。

### 服务器编程接口 (SPI)

- 安全访问 SPI。
- 从 SPI 上下文透明地返回所有权 Datum。

### 高级功能

- 通过 `pgrx::PgMemoryContexts` 安全访问 Apache Cloudberry 内存上下文系统。
- 支持执行器/规划器/事务/子事务钩子。
- 使用 `pgrx::PgBox<T>` 安全处理 Apache Cloudberry（类似于 `alloc::boxed::Box<T>`）。
- 使用 `#[pg_guard]` 过程宏保护需要传递给 Apache Cloudberry 的 `extern "C"` Rust 函数。
- 通过类 `eprintln!` 宏访问 Apache Cloudberry 日志系统。
- 通过 `pgrx::pg_sys` 模块直接（unsafe）访问 Apache Cloudberry 内部功能。

## PGRX 注意事项

线程支持：

- Apache Cloudberry 严格遵循单线程模型。
- 自定义线程不能调用内部数据库函数。

编码要求：

- 建议使用 UTF-8 编码。
- 默认服务器编码为 SQL_ASCII。
- 建议在创建数据库时显式设置编码。

## 调试与开发建议

- 使用 `cargo pgrx test` 进行单元测试。
- 利用 `#[pg_guard]` 确保内存安全。
- 对于自定义类型，使用适当的序列化方式。

## 深入学习资源

以下资源可以帮助您更深入地了解 PGRX：

- 了解所有可用的 `cargo-pgrx` 子命令和选项：[cargo-pgrx 命令详解](https://github.com/cloudberry-contrib/pgrx/blob/main/cargo-pgrx)
- 学习如何定义和使用自定义数据类型：[自定义类型示例](https://github.com/cloudberry-contrib/pgrx/blob/main/pgrx-examples/custom_types)
- 探索如何实现自定义操作符：[操作符函数和操作符类/族](https://github.com/cloudberry-contrib/pgrx/blob/main/pgrx-examples/operators)
- 了解如何使用共享内存特性：[共享内存支持](https://github.com/cloudberry-contrib/pgrx/blob/main/pgrx-examples/shmem)
- 浏览各种实用的示例实现：[更多示例代码](https://github.com/cloudberry-contrib/pgrx/blob/main/pgrx-examples)
