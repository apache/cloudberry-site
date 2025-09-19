---
title: Configure Proxies for the Interconnect
---

# Configure Proxies for the Interconnect

You can configure a Cloudberry system to use proxies for interconnect communication to reduce the use of connections and ports during query processing.

The Cloudberry *interconnect* (the networking layer) refers to the inter-process communication between segments and the network infrastructure on which this communication relies. For information about the Cloudberry architecture and interconnect, see [About the Cloudberry Architecture](../cbdb-architecture.md).

In general, when running a query, a QD (query dispatcher) on the Cloudberry coordinator creates connections to one or more QE (query executor) processes on segments, and a QE can create connections to other QEs. For a description of Cloudberry query processing and parallel query processing, see [About Cloudberry Query Processing](../performance/optimize-queries/parallel-query-execution.md).

By default, connections between the QD on the coordinator and QEs on segment instances and between QEs on different segment instances require a separate network port. You can configure a Cloudberry system to use proxies when Cloudberry communicates between the QD and QEs and between QEs on different segment instances. The interconnect proxies require only one network connection for Cloudberry internal communication between two segment instances, so it consumes fewer connections and ports than `TCP` mode, and has better performance than `UDPIFC` mode in a high-latency network.

To enable interconnect proxies for the Cloudberry system, set these system configuration parameters.

- List the proxy ports with the parameter `gp_interconnect_proxy_addresses`. You must specify a proxy port for the coordinator, standby coordinator, and all segment instances.
- Set the parameter `gp_interconnect_type` to `proxy`.

:::note
When expanding a Apache Cloudberry system, you must deactivate interconnect proxies before adding new hosts and segment instances to the system, and you must update the `gp_interconnect_proxy_addresses` parameter with the newly-added segment instances before you re-enable interconnect proxies.
:::

## Example

This example sets up a Cloudberry system to use proxies for the Cloudberry interconnect when running queries. The example sets the `gp_interconnect_proxy_addresses` parameter and tests the proxies before setting the `gp_interconnect_type` parameter for the Cloudberry system.

- [Setting the Interconnect Proxy Addresses](#set-the-interconnect-proxy-addresses)
- [Testing the Interconnect Proxies](#test-the-interconnect-proxies)
- [Setting Interconnect Proxies for the System](#set-interconnect-proxies-for-the-system)

### Set the interconnect proxy addresses

Set the `gp_interconnect_proxy_addresses` parameter to specify the proxy ports for the coordinator and segment instances. The syntax for the value has the following format and you must specify the parameter value as a single-quoted string.

```
<db_id>:<cont_id>:<seg_address>:<port>[, ... ]
```

For the coordinator, standby coordinator, and segment instance, the first three fields, db_id, cont_id, and seg_address can be found in the [`gp_segment_configuration`](../sys-catalogs/sys-tables/gp-segment-configuration.md) catalog table. The fourth field, port, is the proxy port for the Cloudberry coordinator or a segment instance.

- db_id is the `dbid` column in the catalog table.
- cont_id is the `content` column in the catalog table.
- seg_address is the IP address or hostname corresponding to the `address` column in the catalog table.
- port is the TCP/IP port for the segment instance proxy that you specify.

:::note
If a segment instance hostname is bound to a different IP address at runtime, you must run `gpstop -u` to re-load the `gp_interconnect_proxy_addresses` value.
:::

This is an example PL/Python function that displays or sets the segment instance proxy port values for the `gp_interconnect_proxy_addresses` parameter. To create and run the function, you must enable PL/Python in the database with the `CREATE EXTENSION plpython3u` command.

```sql
--
-- A PL/Python function to setup the interconnect proxy addresses.
-- Requires the Python modules os and socket.
--
-- Usage:
--   select my_setup_ic_proxy(-1000, '');              -- display IC proxy values for segments
--   select my_setup_ic_proxy(-1000, 'update proxy');  -- update the gp_interconnect_proxy_addresses parameter
--
-- The first argument, "delta", is used to calculate the proxy port with this formula:
--
--   proxy_port = postmaster_port + delta
--
-- The second argument, "action", is used to update the gp_interconnect_proxy_addresses parameter.
-- The parameter is not updated unless "action" is 'update proxy'.
-- Note that running  "gpstop -u" is required for the update to take effect. 
-- A Cloudberry system restart will also work.
--
create or replace function my_setup_ic_proxy(delta int, action text)
returns table(dbid smallint, content smallint, address text, port int) as $$
    import os
    import socket

    results = []
    value = ''

    segs = plpy.execute('''SELECT dbid, content, port, address
                              FROM gp_segment_configuration
                            ORDER BY 1''')
    for seg in segs:
        dbid = seg['dbid']
        content = seg['content']
        port = seg['port']
        address = seg['address']

        # decide the proxy port
        port = port + delta

        # append to the result list
        results.append((dbid, content, address, port))

        # build the value for the GUC
        if value:
            value += ','
        value += '{}:{}:{}:{}'.format(dbid, content, address, port)

    if action.lower() == 'update proxy':
        os.system('''gpconfig --skipvalidation -c gp_interconnect_proxy_addresses -v "'{}'"'''.format(value))
        plpy.notice('''the settings are applied, please reload with 'gpstop -u' to take effect.''')
    else:
        plpy.notice('''if the settings are correct, re-run with 'update proxy' to apply.''')
    return results
$$ language plpython3u execute on coordinator;
```

:::note
When you run the function, you should connect to the database using the Cloudberry interconnect type `UDPIFC` or `TCP`. This example uses `psql` to connect to the database `mytest` with the interconnect type `UDPIFC`.
:::

```shell
PGOPTIONS="-c gp_interconnect_type=udpifc" psql -d mytest
```

Running this command lists the segment instance values for the `gp_interconnect_proxy_addresses` parameter.

```sql
select my_setup_ic_proxy(-1000, '');
```

This command runs the function to set the parameter.

```sql
select my_setup_ic_proxy(-1000, 'update proxy');
```

As an alternative, you can run the [`gpconfig`](../sys-utilities/gpconfig.md) utility to set the `gp_interconnect_proxy_addresses` parameter. To set the value as a string, the value is a single-quoted string that is enclosed in double quotes. The example Cloudberry system consists of a coordinator and a single segment instance.

```shell
gpconfig --skipvalidation -c gp_interconnect_proxy_addresses -v "'1:-1:192.168.180.50:35432,2:0:192.168.180.54:35000'"
```

After setting the `gp_interconnect_proxy_addresses` parameter, reload the `postgresql.conf` file with the `gpstop -u` command. This command does not stop and restart the Cloudberry system.

### Test the interconnect proxies

To test the proxy ports configured for the system, you can set the `PGOPTIONS` environment variable when you start a `psql` session in a command shell. This command sets the environment variable to enable interconnect proxies, starts `psql`, and logs into the database `mytest`.

```shell
PGOPTIONS="-c gp_interconnect_type=proxy" psql -d mytest
```

You can run queries in the shell to test the system. For example, you can run a query that accesses all the primary segment instances. This query displays the segment IDs and number of rows on the segment instance from the table `sales`.

```sql
# Select gp_segment_id, COUNT(*) FROM sales GROUP BY gp_segment_id ;
```

### Set interconnect proxies for the system

After you have tested the interconnect proxies for the system, set the server configuration parameter for the system with the `gpconfig` utility.

```shell
gpconfig -c  gp_interconnect_type -v proxy
```

Reload the `postgresql.conf` file with the `gpstop -u` command. This command does not stop and restart the Cloudberry system.
