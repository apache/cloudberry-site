# Develop Database Extensions Using PGRX

This document explains how to develop database extensions using Rust and the PGRX framework. PGRX is a Rust framework for developing extensions for Apache Cloudberry, offering a safe and efficient development experience.

For the core features of PGRX, see [PGRX Core Features](#pgrx-core-features). For notes of PGRX, see [Considerations and Best Practices for PGRX](#considerations-and-best-practices-for-pgrx).

## Requirements for Development Environment

- Make sure that your OS is one of Debian/Ubuntu and RHEL/CentOS.
- Make sure that your Apache Cloudberry cluster is compiled from source code, not installed using RPM package.

### Basic Software Environment

Required software:

- Rust toolchain (`rustc`, `cargo`, and `rustfmt`) - install via https://rustup.rs
- Git
- libclang 11 or higher (for bindgen)
- GCC 7 or higher

### PostgreSQL Dependencies

Install required PostgreSQL dependencies for your OS:

For Debian/Ubuntu:

```bash
sudo apt-get install build-essential libreadline-dev zlib1g-dev flex bison \
    libxml2-dev libxslt-dev libssl-dev libxml2-utils xsltproc ccache pkg-config
```

For RHEL/CentOS:

```bash
sudo yum install -y bison-devel readline-devel zlib-devel openssl-devel wget ccache
sudo yum groupinstall -y 'Development Tools'
```

After installing the dependencies, you can start developing extensions.

## Quick Start for PGRX

This section introduces the process of quickly developing extensions using PGRX, including:

- Setting up and installing PGRX
- Creating extension
- Installing and using extension

### Set up and Install PGRX
:::note
PGRX is maintained by PgCentral Foundation, Inc., while we used here is one [forked PGRX version](https://github.com/cloudberry-contrib/pgrx) with better compatibility within Cloudberry. It's contributed by the community members and customized for Cloudberry, but please note that it is not maintained as one official Cloudberry project.
:::
1. Set the environment variable for Apache Cloudberry's `pg_config` path, where `<pg_config_path>` is the path in your Apache Cloudberry cluster (for example, `/usr/local/cloudberry-db/bin/pg_config`):

   ```bash
   export PGRX_PG_CONFIG_PATH=<pg_config_path>
   ```

2. Build the PGRX framework:

   1. Clone the Apache Cloudberry-compatible `pgrx` repository:

      ```bash
      git clone https://github.com/cloudberry-contrib/pgrx
      cd pgrx
      ```

   2. Build the code with `pg14` and `cbdb` features enabled:

      ```bash
      cargo build --features "pg14, cbdb"
      ```

3. Install the Apache Cloudberry-compatible `cargo-pgrx` tool:

   ```bash
   cargo install --path cargo-pgrx/
   ```

4. Initialize the environment with your database kernel version:

   ```bash
   cargo pgrx init --pg14=`which pg_config`
   ```

### Create an Extension

1. Generate an extension template. This example creates an extension named `my_extension`:

   ```bash
   cargo pgrx new my_extension
   cd my_extension
   ```

   The created directory structure is as follows:

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

2. Modify dependencies in `Cargo.toml` to use local PGRX:

   - Change `pgrx = "0.12.7"` under `[dependencies]` to point to the `pgrx` directory in your local PGRX repository. For example:

      ```toml
      [dependencies]
      pgrx = { path = "/home/gpadmin/pgrx/pgrx/", features = ["pg14", "cbdb"] }
      ```

   - Add `pgrx-pg-sys` under `[dependencies]` to point to the `pgrx-pg-sys` directory in your local PGRX repository. For example:

      ```toml
      [dependencies]
      pgrx-pg-sys = { path = "/home/gpadmin/pgrx/pgrx-pg-sys/", features = ["pg14", "cbdb"] }
      ```

   - Change `pgrx-tests = "0.12.7"` under `[dev-dependencies]` to point to the `pgrx-tests` directory in your local PGRX repository:

      ```toml
      [dev-dependencies]
      pgrx-tests = { path = "/home/gpadmin/pgrx/pgrx-tests/" }
      ```

3. Append the extension name `my_extension` to the `workspace.members` array of the `Cargo.toml` file in the root directory of your local PGRX repository. For example:

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

4. Grant the current system user the permissions to the Apache Cloudberry directory. For example, if the current user is `gpadmin` and Apache Cloudberry directory is `/usr/local/cloudberrydb`:

   ```bash
   sudo chown -R gpadmin:gpadmin /usr/local/cloudberrydb
   ```

### Install and Use the Extension

1. Install the extension:

   ```bash
   cargo pgrx install
   ```

2. To use the extension in the database, connect to the database and execute the following statements:

   ```sql
   CREATE EXTENSION my_extension;

   -- Tests example function
   SELECT hello_my_extension();
   ```

## PGRX Type Mapping

The table below lists the complete mapping of Apache Cloudberry (PostgreSQL) data types to Rust types:

| Database data type | Rust type (`Option<T>`) |
|-------------------|------------------------|
| `bytea` | `Vec<u8>` or `&[u8]` (zero-copy) |
| `text` | `String` or `&str` (zero-copy) |
| `varchar` | `String` or `&str` (zero-copy) or `char` |
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
| `numeric` | `pgrx::Numeric<P, S>` or `pgrx::AnyNumeric` |
| `void` | `()` |
| `ARRAY[]::<type>` | `Vec<Option<T>>` or `pgrx::Array<T>` (zero-copy) |
| `int4range` | `pgrx::Range<i32>` |
| `int8range` | `pgrx::Range<i64>` |
| `numrange` | `pgrx::Range<Numeric<P, S>>` or `pgrx::Range<AnyRange>` |
| `daterange` | `pgrx::Range<pgrx::Date>` |
| `tsrange` | `pgrx::Range<pgrx::Timestamp>` |
| `tstzrange` | `pgrx::Range<pgrx::TimestampWithTimeZone>` |
| `NULL` | `Option::None` |
| `internal` | `pgrx::PgBox<T>` (where `T` can be any Rust/Postgres struct) |
| `uuid` | `pgrx::Uuid([u8; 16])` |

### Custom Type Conversions

You can implement additional type conversions in the following ways:

- Implement `IntoDatum` and `FromDatum` traits.
- Use `#[derive(PostgresType)]` and `#[derive(PostgresEnum)]` for automatic type conversions.

### Type Mapping Details

PGRX converts `text` and `varchar` to `&str` or `String`, and verifies whether the encoding is UTF-8. If an encoding other than UTF-8 is detected, PGRX triggers a panic to alert the developer. Because UTF-8 validation might affect performance, it is not recommended to rely on UTF-8 validation.

The default encoding for PostgreSQL servers is `SQL_ASCII`, which guarantees neither ASCII nor UTF-8 (Apache Cloudberry will accept but ignore non-ASCII bytes). For best results, always use UTF-8 encoding with PGRX and explicitly set the database encoding when creating the database.

## PGRX Core Features

### Complete Management for Development Environment

cargo-pgrx provides a complete set of command-line tools:

- `cargo pgrx new`: Quickly creates a new extension.
- `cargo pgrx init`: Installs or registers an Apache Cloudberry (PostgreSQL) instance.
- `cargo pgrx run`: Interactively tests the extension in psql (or pgcli).
- `cargo pgrx test`: Performs unit tests across multiple Apache Cloudberry (PostgreSQL) versions.
- `cargo pgrx package`: Creates an extension installation package.

### Automatic Mode Generation

- Fully implements the extension using Rust.
- Automatically maps various Rust types to Apache Cloudberry (PostgreSQL) types.
- Automatically generates SQL schema (can also be manually generated using `cargo pgrx schema`).
- Uses `extension_sql!` and `extension_sql_file!` to include custom SQL.

### Security First

- Converts Rust's `panic!` to Apache Cloudberry/PostgreSQL's `ERROR` (abort the transaction, not the process).
- Memory management follows Rust's `DROP` semantics, including handling `panic!` and `elog(ERROR)` cases.
- Uses `#[pg_guard]` procedural macro to ensure safety.
- Apache Cloudberry's `Datum` is represented as `Option<T> where T: FromDatum`, with NULL values safely represented as `Option::<T>::None`.

### UDF Supports

- Uses `#[pg_extern]` annotation to expose functions to Apache Cloudberry.
- Returns `pgrx::iter::SetOfIterator<'a, T>` to implement `RETURNS SETOF`.
- Returns `pgrx::iter::TableIterator<'a, T>` to implement `RETURNS TABLE (...)`.
- Uses `#[pg_trigger]` to create trigger functions.

### Simple Custom Types

- Uses `#[derive(PostgresType)]` to treat Rust structs as Apache Cloudberry types.
  - By default, CBOR encoding is used for storage, and JSON is used as a human-readable format.
  - Supports custom memory/disk/readable formats.
- Uses `#[derive(PostgresEnum)]` to treat Rust enums as Apache Cloudberry (PostgreSQL) enums.
- Supports composite types via `pgrx::composite_type!("Sample")` macro.

### Server Programming Interface (SPI)

- Secure access to SPI.
- Transparently returns ownership of Datum from SPI context.

### Advanced Features

- Securely accesses Apache Cloudberry's memory context system via `pgrx::PgMemoryContexts`.
- Supports executor/planner/transaction/subtransaction hooks.
- Securely handles Apache Cloudberry pointers using `pgrx::PgBox<T>` (similar to `alloc::boxed::Box<T>`).
- Protects Rust functions passed to Apache Cloudberry's `extern "C"` using `#[pg_guard]` procedural macro.
- Accesses Apache Cloudberry's logging system via the `eprintln!` macro.
- Directly (unsafe) accesses Apache Cloudberry internals via the `pgrx::pg_sys` module.

## Considerations and Best Practices for PGRX

Thread supports:

- Apache Cloudberry strictly follows a single-threaded model.
- Custom threads cannot call internal database functions.
- The interaction method for asynchronous contexts is still under exploration.

Encoding requirements:

- It is recommended to use UTF-8 encoding.
- The default server encoding is SQL_ASCII.
- It is recommended to explicitly set the encoding when creating the database.

## Debugging and Development Tips

- Uses `cargo pgrx test` for unit testing.
- Uses `#[pg_guard]` to ensure memory safety.
- For custom types, uses appropriate serialization methods.

## Learning Resources for PGRX

The following resources can help you gain a deeper understanding of PGRX:

- Learn about all available `cargo-pgrx` subcommands and options: [cargo-pgrx command details](https://github.com/cloudberry-contrib/pgrx/blob/main/cargo-pgrx)
- Learn how to define and use custom data types: [custom type examples](https://github.com/cloudberry-contrib/pgrx/blob/main/pgrx-examples/custom_types)
- Explore how to implement custom operators: [operator functions and operator classes/families](https://github.com/cloudberry-contrib/pgrx/blob/main/pgrx-examples/operators)
- Learn how to use shared memory: [shared memory support](https://github.com/cloudberry-contrib/pgrx/blob/main/pgrx-examples/shmem)
- Browse example code implementations: [more example code](https://github.com/cloudberry-contrib/pgrx/blob/main/pgrx-examples)
