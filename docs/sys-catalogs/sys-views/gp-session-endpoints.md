---
title: gp_session_endpoints
---

# gp_session_endpoints

The `gp_session_endpoints` view lists the endpoints created for all active parallel retrieve cursors declared by the current session user in the current session.

Endpoints exist only for the duration of the transaction that defines the parallel retrieve cursor, or until the cursor is closed.

|column|type|references|description|
|----|----|----------|-----------|
|gp_segment_id|integer| |The QE's endpoint `gp_segment_id`.|
|auth_token|text| |The authentication token for a retrieve session.|
|cursorname|text| |The name of the parallel retrieve cursor.|
|sessionid|integer| |The identifier of the session in which the parallel retrieve cursor was created.|
|hostname|varchar(64)| |The name of the host from which to retrieve the data for the endpoint.|
|port|integer| |The port number from which to retrieve the data for the endpoint.|
|username|text| |The name of the session user (not the current user); *you need to initiate the retrieve session as this user*.|
|state|text| |The state of the endpoint; the valid states are:<br/><br/>READY: The endpoint is ready to be retrieved.<br/><br/>ATTACHED: The endpoint is attached to a retrieve connection.<br/><br/>RETRIEVING: A retrieve session is retrieving data from the endpoint at this moment.<br/><br/>FINISHED: The endpoint has been fully retrieved.<br/><br/>RELEASED: Due to an error, the endpoint has been released and the connection closed.|
|endpointname|text| |The endpoint identifier; you provide this identifier to the `RETRIEVE` command.|
