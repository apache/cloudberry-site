---
title: Logging into Apache Cloudberry
---

Now you have successfully deployed Apache Cloudberry. To log into the database, refer to the following command:

```bash
psql -h <hostname> -p <port> -U <username> -d <database>
```

In the command above:

- `<hostname>` is the IP address of the coordinator node of the Apache Cloudberry server.
- `<port>` is the default port number of Apache Cloudberry, which is `5432` by default.
- `<username>` is the user name of the database.
- `<database>` is the name of the database to connect.

After you run the `psql` command, the system will prompt you to enter the database password. After you enter the correct password, you will successfully log into Apache Cloudberry and can perform SQL queries and operations. Make sure that you have the correct permissions to access the target database.

```sql
[gpadmin@cdw ~]$ psql warehouse
psql (14.4, server 14.4)
Type "help" for help.

warehouse=# SELECT * FROM gp_segment_configuration;
 dbid | content | role | preferred_role | mode | status | port | hostname | address |          datadir          | warehouseid
------+---------+------+----------------+------+--------+------+----------+---------+---------------------------+-------------
    1 |      -1 | p    | p              | n    | u      | 5432 | cdw      | cdw     | /data/coordinator/gpseg-1 |           0
    2 |       0 | p    | p              | s    | u      | 6000 | sdw1     | sdw1    | /data/primary/gpseg0      |           0
    8 |       0 | m    | m              | s    | u      | 7000 | sdw2     | sdw2    | /data/mirror/gpseg0       |           0
    3 |       1 | p    | p              | s    | u      | 6001 | sdw1     | sdw1    | /data/primary/gpseg1      |           0
    9 |       1 | m    | m              | s    | u      | 7001 | sdw3     | sdw3    | /data/mirror/gpseg1       |           0
    4 |       2 | p    | p              | s    | u      | 6000 | sdw2     | sdw2    | /data/primary/gpseg2      |           0
   10 |       2 | m    | m              | s    | u      | 7000 | sdw3     | sdw3    | /data/mirror/gpseg2       |           0
    5 |       3 | p    | p              | s    | u      | 6001 | sdw2     | sdw2    | /data/primary/gpseg3      |           0
   11 |       3 | m    | m              | s    | u      | 7001 | sdw1     | sdw1    | /data/mirror/gpseg3       |           0
    6 |       4 | p    | p              | s    | u      | 6000 | sdw3     | sdw3    | /data/primary/gpseg4      |           0
   12 |       4 | m    | m              | s    | u      | 7000 | sdw1     | sdw1    | /data/mirror/gpseg4       |           0
    7 |       5 | p    | p              | s    | u      | 6001 | sdw3     | sdw3    | /data/primary/gpseg5      |           0
   13 |       5 | m    | m              | s    | u      | 7001 | sdw2     | sdw2    | /data/mirror/gpseg5       |           0
(13 rows)
```