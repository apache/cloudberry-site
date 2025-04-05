---
title: pg_controldata
---

# pg_controldata

The system utility `pg_controldata` displays the control information of an Apache Cloudberry cluster.

To run this utility, you need to initialize the cluster and have read access to the data directory. This access restriction ensures the integrity and security of the sensitive control information.

## Synopsis

```
pg_controldata [option] [[ -D | --pgdata ]datadir]
```

## Description

The `pg_controldata` utility serves a crucial role in Apache Cloudberry administration by revealing control information related to an Apache Cloudberry cluster. The information includes details initialized during the initdb process, such as the catalog version, write-ahead logging and checkpoint processing. It's important to note that the information is cluster-wide, and not specific to any individual database within the cluster.

## Options

The `pg_controldata` utility supports the following options. 
| Option       | Description          |
| ------------ | -------------------  |
| `-V` and `--version`    | Prints the `pg_controldata` version and exit.        |
| `-?` and `--help`       | Outputs a list of all supported arguments. It enables users to use the utility effectively.      |

## Environment variables

The `pg_controldata` utility supports the following environment variables. 

| Variable       | Description          |
| ------------ | -------------------  |
| `-PGDATA`    | The default location of data directory. You can specify the data directory on the command line, or use the environment variable `PGDATA`.        |
| `-PG_COLOR`  | Determines whether to use color in diagnostic messages. The available values are `always`, `auto`, and `never`. Setting the value to `always` ensures that diagnostic messages are always presented in color, which enhances readability and visual identification of important information. Setting the value to `auto` enables color-coding based on the capabilities of the output terminal. Setting the value to `never` disables the usage of color entirely.       |
