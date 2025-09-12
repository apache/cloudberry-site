---
title: Load Data Using gpfdists (Secure)
---

# Load Data Securely Using `gpfdists`

The `gpfdists` protocol is a secure version of the `gpfdist` protocol that enables encrypted communication between Apache Cloudberry and the gpfdist file server. When you use `gpfdists`, all data transfer is encrypted using SSL, protecting against eavesdropping and man-in-the-middle attacks.

`gpfdists` provides the same high-performance parallel data loading capabilities as `gpfdist`, but with additional security features essential for production environments handling sensitive data.

## Security features

- All data transmitted between Apache Cloudberry segments and gpfdist servers is encrypted using SSL/TLS protocols, protecting against eavesdropping and data interception.
- Mutual authentication is enforced through client certificates, ensuring that both Apache Cloudberry and gpfdist servers verify each other's identities before establishing connections.
- The implementation uses TLSv1 protocol with AES_128_CBC_SHA encryption algorithm to provide strong cryptographic protection for data in transit.
- Secure server identification mechanisms prevent unauthorized systems from masquerading as legitimate gpfdist servers, protecting against man-in-the-middle attacks.

## Before you begin

To use `gpfdists`, make sure:

- SSL certificates configured on all segment hosts.
- gpfdist utility available on the file server host.
- Network connectivity between segment hosts and the gpfdist server.
- Appropriate SSL certificate files in the correct locations.

## Step 1. Set up SSL certificates

### Required certificate files

The following certificate files must be present in the `$PGDATA/gpfdists` directory on each Apache Cloudberry segment host:

#### For full SSL authentication (recommended):

- `client.key` - Client private key file
- `client.crt` - Client certificate file
- `root.crt` - Trusted certificate authorities file

#### Certificate requirements by configuration:

| verify_gpfdists_cert | --ssl_verify_peer | Required Certificate Files |
|---------------------|-------------------|---------------------------|
| on (default) | on (default) | `client.key`, `client.crt`, `root.crt` |
| on | off | `root.crt` |
| off | on | `client.key`, `client.crt` |
| off | off | None |

### Install certificates

1. Create the gpfdists directory on each segment host:

    ```shell
    mkdir -p $PGDATA/gpfdists
    ```

2. Copy the certificate files to each segment host:

    ```shell
    # Copy to all segment hosts
    scp client.key client.crt root.crt gpadmin@segment-host:$PGDATA/gpfdists/
    ```

3. Set appropriate permissions:

    ```shell
    chmod 600 $PGDATA/gpfdists/client.key
    chmod 644 $PGDATA/gpfdists/client.crt
    chmod 644 $PGDATA/gpfdists/root.crt
    ```

## Step 2. Start gpfdist with SSL

Start the gpfdist utility with the `--ssl` option to enable secure connections:

```shell
gpfdist -p 8081 -d /data/load_files --ssl /path/to/certificates &
```

### SSL options for gpfdist

- `--ssl <certificates_path>`: Enables SSL and specify certificate directory
- `--ssl_verify_peer on|off`: Controls peer verification (default: on)

### Example: Start multiple secure gpfdist instances

```shell
# Starts the first secure gpfdist instance.
gpfdist -d /var/load_files1 -p 8081 --ssl /home/gpadmin/certs \
        --ssl_verify_peer on -l /home/gpadmin/log1 &

# Starts the second secure gpfdist instance.
gpfdist -d /var/load_files2 -p 8082 --ssl /home/gpadmin/certs \
        --ssl_verify_peer on -l /home/gpadmin/log2 &
```

## Step 3. Create external tables with gpfdists

Use the `gpfdists://` protocol in the `LOCATION` clause to create secure external tables:

### Readable external table

```sql
CREATE EXTERNAL TABLE secure_sales_data (
    transaction_id int,
    product_name text,
    sale_date date,
    amount decimal(10,2)
)
LOCATION ('gpfdists://etl-server1:8081/sales/*.txt',
          'gpfdists://etl-server2:8082/sales/*.txt')
FORMAT 'TEXT' (DELIMITER '|' NULL ' ');
```

### Writable external table

```sql
CREATE WRITABLE EXTERNAL TABLE secure_export (
    transaction_id int,
    product_name text,
    sale_date date,
    amount decimal(10,2)
)
LOCATION ('gpfdists://etl-server1:8081/exports/sales_data.txt')
FORMAT 'TEXT' (DELIMITER '|')
DISTRIBUTED BY (transaction_id);
```

### With error handling

```sql
CREATE EXTERNAL TABLE secure_data_with_errors (
    id int,
    name text,
    value decimal(10,2)
)
LOCATION ('gpfdists://etl-server:8081/data/*.csv')
FORMAT 'CSV' (HEADER)
LOG ERRORS SEGMENT REJECT LIMIT 100;
```

## Configuration parameters

### Apache Cloudberry parameters

Configure these parameters in `postgresql.conf`:

```ini
# Enables/disables SSL certificate verification (default: on)
verify_gpfdists_cert = on

# Control segment parallelism
gp_external_max_segs = 64
```

### gpfdist SSL parameters

The gpfdist utility supports these SSL-related options:

| Parameter | Description | Default |
|-----------|-------------|---------|
| `--ssl` | Enable SSL and specify certificate path | Disabled |
| `--ssl_verify_peer` | Verify client certificates | on |

## Security best practices

### Certificate management

- Generate all certificates from a trusted certificate authority to ensure proper validation and trust chain establishment.
- Implement a regular certificate rotation schedule to enhance security and prevent issues from certificate expiration.
- Store private keys in secure locations with restricted access permissions, ensuring only authorized personnel can access them.
- Maintain secure backup copies of all certificate files to enable quick recovery in case of system failures or corruption.

### Network security

- Configure firewall rules to restrict access to gpfdists ports, allowing only authorized Apache Cloudberry segment hosts to connect.
- Use secure network connections such as VPNs or private networks to prevent unauthorized access to data transmission channels.
- Implement continuous monitoring of SSL connections and certificate expiration dates to proactively address security issues.

### Access control

- Apply the principle of least privilege by granting only the minimum permissions necessary for users and applications to perform their required functions.
- Implement robust authentication mechanisms including multi-factor authentication where appropriate to verify user identities.
- Enable comprehensive audit logging to track all access attempts, successful connections, and security-related events for compliance and security monitoring.

## Troubleshooting

### SSL connection errors

Check certificate configuration:

```shell
# Verifies certificate files exist.
ls -la $PGDATA/gpfdists/

# Checks certificate validity.
openssl x509 -in $PGDATA/gpfdists/client.crt -text -noout
```

### Troubleshoot certificate verification issues

1. Verify that the `root.crt` file contains the correct certificate authority chain and that all intermediate certificates are properly included for validation.
2. Check certificate expiration dates using tools like `openssl x509 -dates` to ensure that certificates have not expired and plan for renewal well in advance.
3. Validate that the private key file `client.key` corresponds exactly to the public certificate in `client.crt` using certificate validation tools.

### Common error messages

| Error | Cause | Solution |
|-------|-------|----------|
| "SSL certificate verify failed" | Invalid or expired certificate | Check certificate validity and CA |
| "SSL handshake failed" | SSL configuration mismatch | Verify SSL settings on both sides |
| "Permission denied" | Incorrect file permissions | Set proper permissions on certificate files |

### Debug SSL connections

Enable verbose logging:

```shell
gpfdist -d /data -p 8081 --ssl /certs -V --ssl_verify_peer on
```

## Performance considerations

- SSL encryption introduces computational overhead during data transmission, which may reduce overall throughput compared to unencrypted connections, especially for large data transfers.
- Certificate caching mechanisms help reduce the performance impact of SSL handshakes by reusing established secure connections across multiple data transfer operations.
- Deploy multiple gpfdists instances across different hosts or network interfaces to distribute the load and achieve better aggregate throughput for concurrent data operations.
- Ensure that your network infrastructure provides adequate bandwidth and low latency between Apache Cloudberry segments and gpfdist servers to minimize performance bottlenecks.

## Migration from gpfdist to gpfdists

To migrate existing gpfdist usage to gpfdists:

- Install and configure the required SSL certificates on all Apache Cloudberry segment hosts, ensuring proper permissions and certificate chain validation.
- Update all external table definitions to change protocol specifications from `gpfdist://` to `gpfdists://` in their LOCATION clauses.
- Restart your gpfdist file servers with the `--ssl` option enabled, specifying the appropriate certificate directories and SSL verification settings.
- Thoroughly test secure connections from all Apache Cloudberry segments to verify that data loading operations work correctly with the new encrypted protocol.
- Update any automation scripts, monitoring tools, and operational procedures to account for the new secure protocol requirements and certificate management tasks.

### Example migration

Before (insecure):

```sql
LOCATION ('gpfdist://etl-server:8081/data.txt')
```

After (secure):

```sql
LOCATION ('gpfdists://etl-server:8081/data.txt')
```

## Limitations

- Cannot mix `gpfdist://` and `gpfdists://` protocols in the same external table definition.
- All Apache Cloudberry segment hosts must have properly configured SSL certificates and trust relationships.
- SSL encryption introduces computational overhead that may reduce data transfer throughput compared to unencrypted gpfdist.
- Ongoing certificate lifecycle management is required, including renewal, rotation, and revocation processes.

## Learn more

- [Load Data Using gpfdist](/docs/data-loading/load-data-using-gpfdist.md)
- [SSL Certificate Management](https://www.sslshopper.com/ssl-converter.html)
