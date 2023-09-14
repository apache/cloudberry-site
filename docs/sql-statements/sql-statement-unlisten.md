# UNLISTEN

Stops listening for a notification.

## Synopsis

``` {#sql_command_synopsis}
UNLISTEN { <channel> | * }
```

## Description

`UNLISTEN` is used to remove an existing registration for `NOTIFY` events. `UNLISTEN` cancels any existing registration of the current Greenplum Database session as a listener on the notification channel named channel. The special wildcard `*` cancels all listener registrations for the current session.

[NOTIFY](/docs/sql-statements/sql-statement-notify.md) contains a more extensive discussion of the use of `LISTEN` and `NOTIFY`.

## Parameters

channel
:   The name of a notification channel (any identifier).

*
:   All current listen registrations for this session are cleared.

## Notes

You can unlisten something you were not listening for; no warning or error will appear.

At the end of each session, `UNLISTEN *` is automatically executed.

A transaction that has executed `UNLISTEN` cannot be prepared for two-phase commit.

## Examples

To make a registration:

```
LISTEN virtual;
NOTIFY virtual;
Asynchronous notification "virtual" received from server process with PID 8448.
```

Once `UNLISTEN` has been executed, further `NOTIFY` messages will be ignored:

```
UNLISTEN virtual;
NOTIFY virtual;
-- no NOTIFY event is received
```

## Compatibility

There is no `UNLISTEN` statement in the SQL standard.

## See Also

[LISTEN](/docs/sql-statements/sql-statement-listen.md), [NOTIFY](/docs/sql-statements/sql-statement-notify.md)



