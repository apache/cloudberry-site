---
title: 配置客户端认证
---

# 配置客户端认证

本文介绍如何配置 Apache Cloudberry 的客户端连接与身份认证。

在初次初始化 Apache Cloudberry 系统时，系统会自动创建一个预定义的超级用户角色，该角色的名称与初始化系统的操作系统用户名相同，通常为 `gpadmin`。默认情况下，系统仅允许 `gpadmin` 本地连接数据库。如果你希望其他角色也能连接数据库，或希望允许远程主机连接，就需要手动配置 Apache Cloudberry 的连接与认证策略。本节将说明如何进行相关设置。

## 允许连接到 Apache Cloudberry

客户端访问和认证策略由名为 `pg_hba.conf` 的配置文件控制，这是 PostgreSQL 标准的基于主机的认证配置文件。关于此文件的详细信息，请参阅 PostgreSQL 官方文档：[The pg_hba.conf File](https://www.postgresql.org/docs/14/auth-pg-hba-conf.html)。

在 Apache Cloudberry 中，Coordinator 实例的 `pg_hba.conf` 文件用于控制整个系统的客户端访问与认证。虽然各个数据 Segment 也有自己的 `pg_hba.conf` 文件，但它们已经默认配置为仅允许来自 Coordinator 主机的连接。由于数据 Segment 不接受外部客户端连接，因此无需修改它们的配置文件。

`pg_hba.conf` 的格式是由多条记录组成的文本文件，每条记录占一行。空行会被忽略，以 `#` 开头的内容视为注释。每条记录由多个字段组成，字段之间以空格或制表符分隔。如果字段值被引号包裹，则可以包含空格。记录不能跨行书写。

每条记录的格式可以是以下七种之一：

```shell
local      <database>  <user>  <auth-method>  [<auth-options>]
host       <database>  <user>  <address>  <auth-method>  [<auth-options>]
hostssl    <database>  <user>  <address>  <auth-method>  [<auth-options>]
hostnossl  <database>  <user>  <address>  <auth-method>  [<auth-options>]
host       <database>  <user>  <IP-address>  <IP-mask>  <auth-method>  [<auth-options>]
hostssl    <database>  <user>  <IP-address>  <IP-mask>  <auth-method>  [<auth-options>]
hostnossl  <database>  <user>  <IP-address>  <IP-mask>  <auth-method>  [<auth-options>]
```

各字段含义如下：

**`local`**

用于匹配通过 UNIX 域套接字发起的连接请求。如果没有此类记录，系统将拒绝所有 UNIX 域套接字连接。

**`host`**

用于匹配通过 TCP/IP 发起的连接请求。如果没有正确设置服务器的 `listen_addresses` 参数，将无法接受远程连接。Apache Cloudberry 默认允许来自所有主机（`'*'`）的连接。

**`hostssl`**

用于匹配通过 TCP/IP 发起的连接请求，但只接受使用 SSL 加密的连接。必须在服务器启动时启用 `ssl` 参数才能使用。还需要在 `postgresql.conf` 中完成 SSL 相关认证配置。具体请参考：[配置 postgresql.conf 文件以启用 SSL 认证](#配置-postgresqlconf-启用-ssl-认证)。

**`hostnossl`**

匹配通过 TCP/IP 发起的非 SSL 加密连接。

**`database`**

指定该规则适用的数据库名称。`all` 表示匹配所有数据库。多个数据库名称之间用逗号分隔。如果要从文件中读取数据库名称，可以在文件名前加上 `@`。

**`user`**

指定该规则适用的数据库角色名。`all` 表示匹配所有角色。如果角色是一个组，并希望匹配该组的所有成员，可以在角色名前加上 `+`。多个角色名之间用逗号分隔。如果要从文件中读取角色名，也可以在文件名前加上 `@`。

**`address`**

指定匹配的客户端地址。可以是主机名、IP 地址范围，或下文提到的几个关键字之一。

IP 地址范围使用标准的 CIDR 表示法：即起始地址后跟一个斜杠（`/`）和掩码位数。掩码长度表示客户端 IP 地址中必须匹配的高位比特数。IP 地址中未被掩码覆盖的部分必须为零。地址、斜杠和掩码位数之间不能有空格。

例如：

- `172.20.143.89/32` 表示一个单独的主机
- `172.20.143.0/24` 表示一个小型网络
- `10.6.0.0/16` 表示一个较大的网络

IPv6 的例子包括：

- `::1/128` 表示单个主机（IPv6 回环地址）
- `fe80::7a31:c1ff:0000:0000/96` 表示一个小范围网络

`0.0.0.0/0` 表示所有 IPv4 地址，`::0/0` 表示所有 IPv6 地址。要指定单个主机，IPv4 应使用 `/32`，IPv6 应使用 `/128`。在网络地址中，不要省略结尾的零。

IPv4 格式的条目只匹配 IPv4 连接，IPv6 格式的条目只匹配 IPv6 连接，即使地址是 IPv4 映射的 IPv6 形式也不例外。

:::info
如果操作系统的 C 库不支持 IPv6，系统会拒绝使用 IPv6 格式的配置条目。
:::

你还可以使用以下关键字简化配置：

- `all`：匹配任意 IP 地址
- `samehost`：匹配服务器自身的所有 IP 地址
- `samenet`：匹配服务器直接连接的所有子网中的地址

如果指定的是主机名（即非 IP 地址、IP 段或关键字），系统会将其与客户端 IP 地址反向解析的结果进行比较（例如 DNS 反向查找）。比较时不区分大小写。如果匹配成功，系统还会执行一次正向解析，确认主机名解析出的地址中是否包含客户端 IP 地址。只有正反向解析都匹配时，该条目才会生效。

`pg_hba.conf` 中使用的主机名必须和客户端 IP 地址反查得到的主机名一致，否则无法匹配。有些主机名数据库允许将同一个 IP 地址关联多个主机名，但操作系统在解析时只返回其中一个。

如果主机名以点号（`.`）开头，会匹配主机名的后缀。例如 `.example.com` 会匹配 `foo.example.com`，但不会匹配 `example.com` 本身。

使用主机名时，应确保名称解析的速度足够快。建议部署本地名称缓存服务（如 `nscd`）以提高效率。另外，可以启用服务器参数 `log_hostname`，使日志中显示客户端主机名而非 IP 地址。

**`IP-address`**  
**`IP-mask`**

这两个字段是 CIDR 地址表示法的替代写法。与其使用斜杠后跟掩码位数的方式，不如直接在一个独立字段中写出子网掩码。例如，`255.0.0.0` 相当于 CIDR 掩码长度为 8，`255.255.255.255` 相当于长度为 32。

**`auth-method`**

指定当连接请求匹配该条目时所使用的身份认证方式。可用选项请参见[身份认证方式](#身份认证方式)。

**`auth-options`**

在 `auth-method` 字段之后，可以添加一个或多个 `name=value` 形式的字段，用于设置认证方式的附加参数。各认证方式支持的参数种类，请参见[身份认证方式](#身份认证方式)。

通过 `@` 引入的文件将被读取为一个名称列表，名称之间可以用空格或逗号分隔。注释以 `#` 开头，规则与 `pg_hba.conf` 文件一致。支持嵌套使用 `@` 引用。除非文件路径是绝对路径，否则默认路径是相对于引用它的文件所在目录。

系统在每次处理连接请求时，会按顺序检查 `pg_hba.conf` 中的记录，因此条目的顺序很重要。一般建议将匹配条件更严格但认证要求较低的条目放在前面，将匹配范围较宽但认证方式更强的条目放在后面。例如，如果你希望对本地 TCP/IP 连接使用 `trust` 认证，对远程连接则要求密码认证，那么你应该在文件前部添加一条针对 `127.0.0.1` 的 `trust` 规则，再在后面添加一条更广泛的 `password` 认证规则。

`pg_hba.conf` 文件会在系统启动时读取一次，并在主服务进程收到 SIGHUP 信号时重新加载。如果你在系统运行期间修改了该文件，需要执行以下命令使修改生效：

```shell
$ gpstop -u
```

:::caution 小心
为提高系统安全性，建议从 `pg_hba.conf` 中移除所有使用 `trust` 认证的远程连接规则。`trust` 认证允许任何能建立连接的用户以任意角色访问数据库，几乎没有限制。你可以将本地 UNIX 套接字连接的 `trust` 认证安全地替换为 `ident` 认证。`ident` 同样可以用于本地和远程的 TCP 客户端，但前提是客户端主机需运行 ident 服务，且你必须信任该主机的完整性。
:::

## 编辑 pg_hba.conf 文件

默认情况下，`pg_hba.conf` 文件为 gpadmin 用户配置了较宽松的访问权限，但未为其他 Apache Cloudberry 角色启用数据库访问。如果你希望其他用户也能访问数据库，或需要加强 gpadmin 的安全性，就需要手动修改这个配置文件。建议删除使用 `trust` 认证的条目，因为只要能访问服务器的人，就能以任意角色连接数据库。对于本地（UNIX 套接字）连接，推荐使用 `ident` 认证方式，它要求操作系统用户名与连接时指定的角色一致。对于本地和远程的 TCP 连接，`ident` 认证要求客户端主机上运行 ident 服务。你可以在 Coordinator 主机上安装 ident 服务，并为本地 TCP 连接（例如 `127.0.0.1/28`）启用 `ident` 认证。不过，对于远程 TCP 连接，`ident` 的安全性较低，因为你必须完全信任客户端主机上的 ident 服务。

:::info
Cloudberry Command Center 提供了图形界面来编辑 `pg_hba.conf` 文件。该界面会在保存前校验配置项，保留文件的历史版本，方便回滚，同时支持将配置重新加载到 Apache Cloudberry 中。
:::

下面是一个示例，展示了如何修改 Coordinator 主机上的 `pg_hba.conf` 文件，允许远程客户端以加密密码认证方式访问所有数据库。

编辑步骤如下：

1. 用文本编辑器打开文件 `$COORDINATOR_DATA_DIRECTORY/pg_hba.conf`。
2. 按照你希望允许的连接类型，逐条添加记录。系统会按顺序读取每条记录，因此顺序很重要。通常，前面的记录匹配条件更严格但认证方式更弱，而后面的记录匹配范围更广但认证方式更强。例如：

    ```
    # 允许 gpadmin 用户使用 ident 认证方式本地访问所有数据库
    local   all   gpadmin   ident         sameuser
    host    all   gpadmin   127.0.0.1/32  ident
    host    all   gpadmin   ::1/128       ident

    # 允许 dba 角色从 IP 为 192.168.x.x 的主机访问任意数据库，
    # 使用 md5 加密密码进行认证
    # 如果希望使用 SHA-256 加密，请将 md5 替换为 password
    host    all   dba       192.168.0.0/32  md5
    ```

## 身份认证方式

- [基本认证](#基本认证)
- [SSL 客户端认证](#ssl-客户端认证)

### 基本认证

**`trust`**  
允许用户无条件连接，不需要密码或任何身份验证。这一方式主要用于 `gpadmin` 角色以及部分 Cloudberry 工具（如 `gpinitsystem`、`gpstop`、`gpstart` 等），这些工具需要在不同节点之间建立连接时不弹出交互式提示。

:::tip 提示
为了系统安全，建议从 `pg_hba.conf` 中删除所有使用 `trust` 认证的远程连接记录。`trust` 认证允许任何能连接服务器的用户以任意角色访问数据库。你可以将本地 UNIX 套接字连接的 `trust` 安全地替换为 `ident`。`ident` 也可用于本地和远程的 TCP 客户端，但前提是客户端主机运行 ident 服务，并且你信任该主机的安全性。
:::

**`Reject`**

拒绝匹配条件的连接。通常用于限制来自特定主机或不安全连接的访问。

**`Ident`**

根据客户端的操作系统用户名进行认证。本地套接字连接使用 `ident` 是安全的。远程主机通过 TCP 使用 `ident` 时，要求客户端主机上运行 ident 服务。仅建议在可信的封闭网络中，对远程主机使用 `ident` 认证。

**`md5`**

要求客户端提供经过两次 MD5 加密的密码进行身份验证。

**`password`**

要求客户端提供明文密码进行身份验证。由于密码会以明文在网络上传输，不应在不受信任的网络中使用。

基于密码的认证方式包括 `md5` 和 `password`。这两种方式的主要区别在于密码的传输形式：`md5` 使用加密传输，`password` 为明文传输。

如果你担心密码被嗅探，推荐使用 `md5`。在任何情况下都应避免使用明文 `password`。如果连接启用了 SSL 加密，则 `password` 也可安全使用（但如果你已经启用 SSL，更推荐使用证书认证方式）。

下面是一些 `pg_hba.conf` 中基本认证方式的示例条目：

```shell
hostnossl    all    all        0.0.0.0     reject
hostssl      all    testuser   0.0.0.0/0   md5
local        all    gpuser                 ident
```

或：

```shell
local    all           gpadmin         ident 
host     all           gpadmin         localhost      trust 
host     all           gpadmin         cdw            trust 
local    replication   gpadmin         ident 
host     replication   gpadmin         samenet        trust 
host     all           all             0.0.0.0/0      md5
```

## SSL 客户端认证

SSL 认证方式会在握手阶段对客户端提供的证书进行验证，检查其 Common Name（CN）字段是否与所请求的数据库用户名一致。该用户必须已存在于数据库中。可以使用映射文件，将系统用户名映射为数据库用户名。

### SSL 认证参数

认证方式：

- **`cert`**

认证选项：

- **`hostssl`**：连接类型必须为 `hostssl`，即启用 SSL 的 TCP 连接。

- **`map=mapping`**：指定用户名映射名称。映射关系保存在 `pg_ident.conf` 文件中，或由服务器参数 `ident_file` 指定的文件中。

以下是一些启用 SSL 客户端认证的 `pg_hba.conf` 示例：

```shell
hostssl testdb certuser 192.168.0.0/16 cert
hostssl testdb all      192.168.0.0/16 cert map=gpuser
```

### OpenSSL 配置

你可以通过修改 OpenSSL 安装目录下的 `openssl.cnf` 文件（或 `$OPENSSL_CONF` 环境变量指定的配置文件）来调整 OpenSSL 设置。修改完成后，重启 Apache Cloudberry 服务使配置生效。

### 创建自签名证书

自签名证书适用于测试环境。生产环境中建议使用由证书颁发机构（CA）签发的证书，可以是全球认可的 CA，也可以是本地 CA，以便客户端能够验证服务器身份。如果所有客户端都在组织内部，建议使用本地 CA。

创建服务器自签名证书的步骤如下：

1. 运行以下 `openssl` 命令生成证书请求文件：

    ```shell
    openssl req -new -text -out server.req
    ```

2. 根据提示填写所需信息。

    注意，Common Name 字段应填写本地主机名。挑战密码（challenge password）可以留空。

3. 该命令会生成一个带密码保护的私钥，密码长度至少为 4 个字符。如果希望服务器能自动启动，则必须移除密码保护，执行以下命令：

    ```shell
    openssl rsa -in privkey.pem -out server.key
    rm privkey.pem
    ```

4. 输入旧密码以解锁现有密钥，然后执行以下命令生成自签名证书：

    ```shell
    openssl req -x509 -in server.req -text -key server.key -out server.crt
    ```

    这一步会将证书变为自签名证书，并将密钥和证书文件准备好，供服务器使用。

5. 最后，修改密钥文件权限，确保其不会被其他用户访问：

    ```shell
    chmod og-rwx server.key
    ```

关于如何创建服务器私钥和证书的更多细节，请参考 OpenSSL 官方文档。

### 配置 postgresql.conf 启用 SSL 认证

你需要在 `postgresql.conf` 配置文件中设置以下参数：

- `ssl` *boolean*：启用 SSL 连接。
- `ssl_renegotiation_limit` *integer*：设置在重新协商密钥之前传输的数据量上限。
- `ssl_ciphers` *string*：配置允许使用的 SSL 加密算法列表。该设置会覆盖 `/etc/openssl.cnf` 中的加密算法配置。默认值为 `ALL:!ADH:!LOW:!EXP:!MD5:@STRENGTH`，表示启用所有加密算法，但排除 ADH、LOW、EXP 和 MD5，并优先使用更强的算法。

  :::info 信息
  在 TLS 1.2 中，某些被标为 MEDIUM 或 HIGH 强度的加密算法其实是 NULL 加密，即不对传输内容加密，默认配置中的 `ssl_ciphers` 是允许这类算法的。为了绕过这些 NULL 加密算法，可以使用类似 `TLSv1.2:!eNULL:!aNULL` 的配置字符串。

  虽然使用 `NULL-SHA` 或 `NULL-MD5` 可实现无加密但有认证的连接，避免加密带来的性能开销，但这会让中间人攻击变得可能。况且，相较于认证开销，加密开销很小。因此不推荐使用 NULL 加密算法。
  :::

以下 SSL 服务端文件默认保存在 Apache Cloudberry Coordinator的数据目录（`$COORDINATOR_DATA_DIRECTORY`）中：

- `server.crt` - 服务器证书。
- `server.key` - 服务器私钥。
- `root.crt` - 受信任的 CA 证书。
- `root.crl` - CA 已撤销的证书。

如果启用了 Coordinator 主备镜像功能，并使用了 SSL 客户端认证，这些 SSL 文件**不应放在**默认目录 `$COORDINATOR_DATA_DIRECTORY` 中。因为执行 `gpinitstandby` 时，主 Coordinator 的数据目录会被整体复制到备 Coordinator 中。如果密钥和证书文件为主 Coordinator 所用，将导致备 Coordinator 启动失败。

你可以通过设置 `postgresql.conf` 中的 `sslcert`、`sslkey`、`sslrootcert` 和 `sslcrl` 参数，指定其他目录存放这些文件。

### 配置 SSL 客户端连接

SSL 客户端连接支持以下选项：

**`sslmode`**

指定连接所要求的安全等级。

**`require`**

必须使用 SSL 连接。如果存在根 CA 文件，将按 `verify-ca` 的方式验证证书。

**`verify-ca`**

仅允许使用 SSL 连接，并验证服务器证书是否由受信任的 CA 签发。

**`verify-full`**

仅允许使用 SSL 连接，并同时验证服务器证书是否由受信任的 CA 签发，以及服务器主机名是否与证书中的主机名一致。

**`sslcert`**

客户端 SSL 证书的文件名。默认路径为 `$COORDINATOR_DATA_DIRECTORY/postgresql.crt`。

**`sslkey`**

用于客户端证书的私钥文件。默认路径为 `$COORDINATOR_DATA_DIRECTORY/postgresql.key`。

**`sslrootcert`**

包含 CA 证书的文件名。默认路径为 `$COORDINATOR_DATA_DIRECTORY/root.crt`。

**`sslcrl`**

证书吊销列表文件名。默认路径为 `$COORDINATOR_DATA_DIRECTORY/root.crl`。

这些客户端连接参数可以通过以下环境变量设置：

- `sslmode` – `PGSSLMODE`
- `sslcert` – `PGSSLCERT`
- `sslkey` – `PGSSLKEY`
- `sslrootcert` – `PGSSLROOTCERT`
- `sslcrl` – `PGSSLCRL`

例如，下面的命令将以 `verify-ca` 模式从 `localhost` 连接到 `postgres` 数据库，并验证默认目录下的证书：

```shell
psql "sslmode=verify-ca host=localhost dbname=postgres"
```

## 限制并发连接数

Apache Cloudberry 会为每个连接分配部分资源，因此建议设定允许的最大连接数。

可以通过设置 `max_connections` 参数来限制系统同时活动的连接数。该参数是本地配置参数，必须分别设置在 Coordinator、备 Coordinator 和每个 Segment（主 Segment 和镜像 Segment）的 `postgresql.conf` 文件中。建议 Segment 实例的 `max_connections` 设置值为 Coordinator 的 5 到 10 倍。

设置 `max_connections` 时，还必须配置关联参数 `max_prepared_transactions`。这个值在 Coordinator 上必须不小于 `max_connections`，而在 Segment实例上应与 Coordinator 一致。

例如：

- Coordinator（包含备 Coordinator）中的 `$COORDINATOR_DATA_DIRECTORY/postgresql.conf`：

    ```shell
    max_connections=100
    max_prepared_transactions=100
    ```

- 所有 Segment 实例中的 `SEGMENT_DATA_DIRECTORY/postgresql.conf`：

    ```shell
    max_connections=500
    max_prepared_transactions=100
    ```

以下是使用 Apache Cloudberry 工具 `gpconfig` 配置这些参数的步骤。

### 修改最大连接数

1. 以 Cloudberry 管理员身份登录 Coordinator 主机，并执行以下命令加载环境变量：

    ```shell
    source $GPHOME/cloudberry-env.sh
    ```

2. 设置 `max_connections` 参数。下面这个命令将在 Segment 上设置为 1000，在 Coordinator 上设置为 200：

    ```shell
    $ gpconfig -c max_connections -v 1000 -m 200
    ```

    Segment 的连接数必须大于 Coordinator。建议设置为 Coordinator 的 5 到 10 倍。

3. 设置 `max_prepared_transactions` 参数。以下命令会在 Coordinator 和所有 Segment 上统一设置为 200：

    ```shell
    $ gpconfig -c max_prepared_transactions -v 200
    ```

    此参数的值必须大于或等于 Coordinator 的 `max_connections` 值。

4. 停止并重启 Apache Cloudberry 系统：

    ```shell
    $ gpstop -r
    ```

5. 使用 `gpconfig -s` 选项查看参数配置。例如，下面的命令将显示 `max_connections` 的设置值：

    ```shell
    $ gpconfig -s max_connections
    ```

:::info 信息
增加这些参数的值可能会导致 Apache Cloudberry 请求更多共享内存。为降低内存占用，可以适当调低其他内存相关参数，例如 `gp_cached_segworkers_threshold`。
:::

## 加密客户端与服务器之间的连接

启用 Apache Cloudberry 的 SSL 功能，可以加密客户端与数据库之间通过网络传输的数据。

Apache Cloudberry 原生支持客户端与 Coordinator 之间建立 SSL 加密连接。SSL 可以防止第三方监听网络数据包，也能避免中间人攻击。只要客户端连接路径不够安全，就应启用 SSL；而当使用客户端证书认证时，则必须启用 SSL。

要启用 Apache Cloudberry 的 SSL 模式，需要满足以下条件：

- 客户端主机与 Coordinator 主机（包括备 Coordinator）都必须安装 OpenSSL。
- Coordinator 与备 Coordinator 主机必须正确生成 SSL 文件，包括 `server.key`（服务器私钥）和 `server.crt`（服务器证书）。

    - 私钥文件不应设置口令保护。服务器在启动时不会提示输入私钥口令，如果文件设置了口令，将导致 Apache Cloudberry 启动失败。
    - 在生产环境中，Coordinator 和备 Coordinator 主机都应各自使用一对密钥和证书，并在证书的 CN（Common Name） 字段中准确填写各自主机名。

    测试环境可以使用自签名证书，但生产环境应使用由证书颁发机构（CA）签发的证书，以便客户端验证服务器身份。你可以选择全球 CA 或本地 CA。如果所有客户端都在组织内部，推荐使用本地 CA。

- Apache Cloudberry 必须能访问 `server.key` 和 `server.crt`，还要能访问用于认证的其他文件（如 `root.crt`，即受信任 CA 的证书）。在启用 SSL 模式时，Coordinator 会自动查找 `server.key` 和 `server.crt`。默认情况下，如果这些文件不在 Coordinator 数据目录（`$COORDINATOR_DATA_DIRECTORY`）中，系统将无法启动。如果你使用了如 `root.crt` 等额外的 SSL 文件，这些文件也必须位于 Coordinator 主机上。

    如果启用了 Coordinator 主备镜像，并启用了 SSL 客户端认证，SSL 认证相关文件必须同时存在于 Coordinator 与备 Coordinator 主机上，并且**不应保存在默认目录** `$COORDINATOR_DATA_DIRECTORY`。这是因为 `initstandby` 操作会将 Coordinator 的数据目录完整复制到备 Coordinator，若复制了错误的密钥和证书文件（即主 Coordinator 的文件而非备 Coordinator 自己的文件），将导致备 Coordinator 启动失败。

    你可以通过 `postgresql.conf` 中的 `sslcert`、`sslkey`、`sslrootcert` 和 `sslcrl` 参数，将这些文件配置在其他目录。

要启用 SSL，可在 Coordinator 和备 Coordinator 的 `postgresql.conf` 文件中设置参数 `ssl=on`。例如，使用以下 `gpconfig` 命令开启该参数：

```shell
gpconfig -c ssl -m on -v off
```

设置该参数后需要重启服务器。可使用以下命令重启整个系统：

```shell
gpstop -ra
```

### 创建仅用于测试的无口令自签名证书

如果只是为了测试，想快速为服务器创建一个自签名证书，可以使用以下 OpenSSL 命令：

```
# openssl req -new -text -out server.req
```

根据提示输入相关信息。注意，*Common Name*（通用名称）字段应填写本地主机名。挑战口令（challenge password）可以留空。

该命令会生成一个带口令保护的私钥，且不接受少于四个字符的口令。

要让 Apache Cloudberry 使用这个证书，需要移除私钥上的口令，执行以下命令：

```
# openssl rsa -in privkey.pem -out server.key
# rm privkey.pem
```

系统会提示输入旧口令以解锁已有私钥。

接着，使用以下命令将证书转为自签名证书，并将密钥和证书复制到服务器能够识别的位置：

```
# openssl req -x509 -in server.req -text -key server.key -out server.crt
```

最后，请通过以下命令修改私钥文件权限。如果权限过于宽松，服务器将拒绝加载该文件：

```
# chmod og-rwx server.key
```

如需了解如何创建服务器私钥和证书的更多细节，请参考 [OpenSSL 官方文档](https://www.openssl.org/docs/)。
