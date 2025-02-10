"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[7434],{95037:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>r,default:()=>h,frontMatter:()=>i,metadata:()=>o,toc:()=>d});var a=n(85893),s=n(11151);const i={title:"CREATE AGGREGATE"},r="CREATE AGGREGATE",o={id:"sql-stmts/create-aggregate",title:"CREATE AGGREGATE",description:"Defines a new aggregate function.",source:"@site/docs/sql-stmts/create-aggregate.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/create-aggregate",permalink:"/docs/sql-stmts/create-aggregate",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/create-aggregate.md",tags:[],version:"current",lastUpdatedBy:"TomShawn",lastUpdatedAt:1739157355,formattedLastUpdatedAt:"Feb 10, 2025",frontMatter:{title:"CREATE AGGREGATE"},sidebar:"docsbars",previous:{title:"CREATE ACCESS METHOD",permalink:"/docs/sql-stmts/create-access-method"},next:{title:"CREATE CAST",permalink:"/docs/sql-stmts/create-cast"}},c={},d=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Notes",id:"notes",level:2},{value:"Example",id:"example",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function l(e){const t={a:"a",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,s.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h1,{id:"create-aggregate",children:"CREATE AGGREGATE"}),"\n",(0,a.jsx)(t.p,{children:"Defines a new aggregate function."}),"\n",(0,a.jsx)(t.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-sql",children:"CREATE [ OR REPLACE ] AGGREGATE <name> ( [ <argmode> ] [ <argname> ] <arg_data_type> [ , ... ] ) (\n    SFUNC = <sfunc>,\n    STYPE = <state_data_type>\n    [ , SSPACE = <state_data_size> ]\n    [ , FINALFUNC = <ffunc> ]\n    [ , FINALFUNC_EXTRA ]\n    [ , FINALFUNC_MODIFY = { READ_ONLY | SHAREABLE | READ_WRITE } ]\n    [ , COMBINEFUNC = <combinefunc> ]\n    [ , SERIALFUNC = <serialfunc> ]\n    [ , DESERIALFUNC = <deserialfunc> ]\n    [ , INITCOND = <initial_condition> ]\n    [ , MSFUNC = <msfunc> ]\n    [ , MINVFUNC = <minvfunc> ]\n    [ , MSTYPE = <mstate_data_type> ]\n    [ , MSSPACE = <mstate_data_size> ]\n    [ , MFINALFUNC = <mffunc> ]\n    [ , MFINALFUNC_EXTRA ]\n    [ , MFINALFUNC_MODIFY = { READ_ONLY | SHAREABLE | READ_WRITE } ]\n    [ , MINITCOND = <minitial_condition> ]\n    [ , SORTOP = <sort_operator> ]\n    [ , PARALLEL = { SAFE | RESTRICTED | UNSAFE } ]\n    [ , REPSAFE = <boolean> ]\n  )\n  \n  CREATE [ OR REPLACE ] AGGREGATE <name> ( [ [ <argmode> ] [ <argname> ] <arg_data_type> [ , ... ] ]\n      ORDER BY [ <argmode> ] [ <argname> ] <arg_data_type> [ , ... ] ) (\n    SFUNC = <sfunc>,\n    STYPE = <state_data_type>\n    [ , SSPACE = <state_data_size> ]\n    [ , FINALFUNC = <ffunc> ]\n    [ , FINALFUNC_EXTRA ]\n    [ , FINALFUNC_MODIFY = { READ_ONLY | SHAREABLE | READ_WRITE } ]\n    [ , COMBINEFUNC = <combinefunc> ]\n    [ , INITCOND = <initial_condition> ]\n    [ , PARALLEL = { SAFE | RESTRICTED | UNSAFE } ]\n    [ , REPSAFE = <boolean> ]\n    [ , HYPOTHETICAL ]\n  )\n  -- or the old syntax\n  \n  CREATE [ OR REPLACE ] AGGREGATE <name> (\n    BASETYPE = <base_type>,\n    SFUNC = <sfunc>,\n    STYPE = <state_data_type>\n    [ , SSPACE = <state_data_size> ]\n    [ , FINALFUNC = <ffunc> ]\n    [ , FINALFUNC_EXTRA ]\n    [ , FINALFUNC_MODIFY = { READ_ONLY | SHAREABLE | READ_WRITE } ]\n    [ , COMBINEFUNC = <combinefunc> ]\n    [ , SERIALFUNC = <serialfunc> ]\n    [ , DESERIALFUNC = <deserialfunc> ]\n    [ , INITCOND = <initial_condition> ]\n    [ , MSFUNC = <msfunc> ]\n    [ , MINVFUNC = <minvfunc> ]\n    [ , MSTYPE = <mstate_data_type> ]\n    [ , MSSPACE = <mstate_data_size> ]\n    [ , MFINALFUNC = <mffunc> ]\n    [ , MFINALFUNC_EXTRA ]\n    [ , MFINALFUNC_MODIFY = { READ_ONLY | SHAREABLE | READ_WRITE } ]\n    [ , MINITCOND = <minitial_condition> ]\n    [ , SORTOP = <sort_operator> ]\n    [ , REPSAFE = <boolean> ]\n  )\n"})}),"\n",(0,a.jsx)(t.h2,{id:"description",children:"Description"}),"\n",(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.code,{children:"CREATE AGGREGATE"})," defines a new aggregate function. ",(0,a.jsx)(t.code,{children:"CREATE OR REPLACE AGGREGATE"})," will either define a new aggregate function or replace an existing definition. Some basic and commonly-used aggregate functions such as ",(0,a.jsx)(t.code,{children:"count()"}),", ",(0,a.jsx)(t.code,{children:"min()"}),", ",(0,a.jsx)(t.code,{children:"max()"}),", ",(0,a.jsx)(t.code,{children:"sum()"}),", ",(0,a.jsx)(t.code,{children:"avg()"})," and so on are already provided in Cloudberry Database. If you define new types or need an aggregate function not already provided, you can use ",(0,a.jsx)(t.code,{children:"CREATE AGGREGATE"})," to provide the desired features."]}),"\n",(0,a.jsx)(t.p,{children:"When replacing an existing definition, the argument types, result type, and number of direct arguments may not be changed. Also, the new definition must be of the same kind (ordinary aggregate, ordered-set aggregate, or hypothetical-set aggregate) as the old one."}),"\n",(0,a.jsxs)(t.p,{children:["If a schema name is given (for example, ",(0,a.jsx)(t.code,{children:"CREATE AGGREGATE myschema.myagg ..."}),") then the aggregate function is created in the specified schema. Otherwise it is created in the current schema."]}),"\n",(0,a.jsxs)(t.p,{children:["An aggregate function is identified by its name and input data type(s). Two aggregate functions in the same schema can have the same name if they operate on different input types. The name and input data type(s) of an aggregate function must also be distinct from the name and input data type(s) of every ordinary function in the same schema. This behavior is identical to overloading of ordinary function names. See ",(0,a.jsx)(t.a,{href:"/docs/sql-stmts/create-function",children:"CREATE FUNCTION"}),"."]}),"\n",(0,a.jsx)(t.p,{children:"A simple aggregate function is made from one or two ordinary functions; a state transition function sfunc, and an optional final calculation function ffunc."}),"\n",(0,a.jsx)(t.p,{children:"These functions are used as follows:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-sql",children:"sfunc( internal-state, next-data-values ) ---\x3e next-internal-state\nffunc( internal-state ) ---\x3e aggregate-value\n"})}),"\n",(0,a.jsx)(t.p,{children:"Cloudberry Database creates a temporary variable of data type state_data_type to hold the current internal state of the aggregate function. At each input row, the aggregate argument value(s) are calculated and the state transition function is invoked with the current state value and the new argument value(s) to calculate a new internal state value. After all the rows have been processed, the final function is invoked once to calculate the aggregate's return value. If there is no final function then the ending state value is returned as-is."}),"\n",(0,a.jsxs)(t.p,{children:["An aggregate function can provide an initial condition, that is, an initial value for the internal state value. This is specified and stored in the database as a value of type ",(0,a.jsx)(t.code,{children:"text"}),", but it must be a valid external representation of a constant of the state value data type. If it is not supplied then the state value starts out null."]}),"\n",(0,a.jsxs)(t.p,{children:["If the state transition function is declared ",(0,a.jsx)(t.code,{children:"STRICT"}),", then it cannot be called with null inputs. With such a transition function, aggregate execution behaves as follows. Rows with any null input values are ignored (the function is not called and the previous state value is retained). If the initial state value is null, then at the first row with all non-null input values, the first argument value replaces the state value, and the transition function is invoked at subsequent rows with all non-null input values. This is useful for implementing aggregates like ",(0,a.jsx)(t.code,{children:"max()"}),". Note that this behavior is only available when state_data_type is the same as the first arg_data_type. When these types are different, you must supply a non-null initial condition or use a nonstrict transition function."]}),"\n",(0,a.jsxs)(t.p,{children:["If the state transition function is not declared ",(0,a.jsx)(t.code,{children:"STRICT"}),", then it will be called unconditionally at each input row, and must deal with null inputs and null state values for itself. This allows the aggregate author to have full control over the aggregate's handling of null values."]}),"\n",(0,a.jsxs)(t.p,{children:["If the final function is declared ",(0,a.jsx)(t.code,{children:"STRICT"}),", then it will not be called when the ending state value is null; instead a null result will be returned automatically. (This is the normal behavior of ",(0,a.jsx)(t.code,{children:"STRICT"})," functions.) In any case the final function has the option of returning a null value. For example, the final function for ",(0,a.jsx)(t.code,{children:"avg()"})," returns null when it sees there were zero input rows."]}),"\n",(0,a.jsxs)(t.p,{children:["Sometimes it is useful to declare the final function as taking not just the state value, but extra parameters corresponding to the aggregate's input values. The main reason for doing this is if the final function is polymorphic and the state value's data type would be inadequate to pin down the result type. These extra parameters are always passed as ",(0,a.jsx)(t.code,{children:"NULL"})," (and so the final function must not be strict when the ",(0,a.jsx)(t.code,{children:"FINALFUNC_EXTRA"})," option is used), but nonetheless they are valid parameters. The final function could for example make use of ",(0,a.jsx)(t.code,{children:"get_fn_expr_argtype"})," to identify the actual argument type in the current call."]}),"\n",(0,a.jsxs)(t.p,{children:["An aggregate can optionally support ",(0,a.jsx)(t.em,{children:"moving-aggregate mode"}),", as described in ",(0,a.jsx)(t.a,{href:"https://www.postgresql.org/docs/12/xaggr.html#XAGGR-MOVING-AGGREGATES",children:"Moving-Aggregate Mode"})," in the PostgreSQL documentation. This requires specifying the ",(0,a.jsx)(t.code,{children:"MSFUNC"}),", ",(0,a.jsx)(t.code,{children:"MINVFUNC"}),", and ",(0,a.jsx)(t.code,{children:"MSTYPE"})," functions, and optionally the ",(0,a.jsx)(t.code,{children:"MSSPACE"}),", ",(0,a.jsx)(t.code,{children:"MFINALFUNC"}),", ",(0,a.jsx)(t.code,{children:"MFINALFUNC_EXTRA"}),", ",(0,a.jsx)(t.code,{children:"MFINALFUNC_MODIFY"}),", and ",(0,a.jsx)(t.code,{children:"MINITCOND"})," functions. Except for ",(0,a.jsx)(t.code,{children:"MINVFUNC"}),", these functions work like the corresponding simple-aggregate functions without ",(0,a.jsx)(t.code,{children:"M"}),"; they define a separate implementation of the aggregate that includes an inverse transition function."]}),"\n",(0,a.jsxs)(t.p,{children:["The syntax with ",(0,a.jsx)(t.code,{children:"ORDER BY"})," in the parameter list creates a special type of aggregate called an ",(0,a.jsx)(t.em,{children:"ordered-set aggregate"}),"; or if ",(0,a.jsx)(t.code,{children:"HYPOTHETICAL"})," is specified, then a ",(0,a.jsx)(t.em,{children:"hypothetical-set aggregate"})," is created. These aggregates operate over groups of sorted values in order-dependent ways, so that specification of an input sort order is an essential part of a call. Also, they can have ",(0,a.jsx)(t.em,{children:"direct"}),' arguments, which are arguments that are evaluated only once per aggregation rather than once per input row. Hypothetical-set aggregates are a subclass of ordered-set aggregates in which some of the direct arguments are required to match, in number and data types, the aggregated argument columns. This allows the values of those direct arguments to be added to the collection of aggregate-input rows as an additional "hypothetical" row.']}),"\n",(0,a.jsxs)(t.p,{children:["An aggregate can optionally support partial aggregation. This requires specifying the ",(0,a.jsx)(t.code,{children:"COMBINEFUNC"})," parameter. If the state_data_type is internal, it's usually also appropriate to provide the ",(0,a.jsx)(t.code,{children:"SERIALFUNC"})," and ",(0,a.jsx)(t.code,{children:"DESERIALFUNC"})," parameters so that parallel aggregation is possible. Note that the aggregate must also be marked ",(0,a.jsx)(t.code,{children:"PARALLEL SAFE"})," to enable parallel aggregation."]}),"\n",(0,a.jsxs)(t.p,{children:["Aggregates that behave like ",(0,a.jsx)(t.code,{children:"min()"})," or ",(0,a.jsx)(t.code,{children:"max()"})," can sometimes be optimized by looking into an index instead of scanning every input row. If this aggregate can be so optimized, indicate it by specifying a ",(0,a.jsx)(t.em,{children:"sort operator"}),". The basic requirement is that the aggregate must yield the first element in the sort ordering induced by the operator; in other words:"]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-sql",children:"SELECT agg(col) FROM tab;\n"})}),"\n",(0,a.jsx)(t.p,{children:"must be equivalent to:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-sql",children:"SELECT col FROM tab ORDER BY col USING sortop LIMIT 1;\n"})}),"\n",(0,a.jsxs)(t.p,{children:["Further assumptions are that the aggregate function ignores null inputs, and that it delivers a null result if and only if there were no non-null inputs. Ordinarily, a data type's ",(0,a.jsx)(t.code,{children:"<"})," operator is the proper sort operator for ",(0,a.jsx)(t.code,{children:"min()"}),", and ",(0,a.jsx)(t.code,{children:">"})," is the proper sort operator for ",(0,a.jsx)(t.code,{children:"max()"}),'. Note that the optimization will never actually take effect unless the specified operator is the "less than" or "greater than" strategy member of a B-tree index operator class.']}),"\n",(0,a.jsxs)(t.p,{children:["To be able to create an aggregate function, you must have ",(0,a.jsx)(t.code,{children:"USAGE"})," privilege on the argument types, the state type(s), and the return type, as well as ",(0,a.jsx)(t.code,{children:"EXECUTE"})," privilege on the supporting functions."]}),"\n",(0,a.jsxs)(t.p,{children:["You can specify ",(0,a.jsx)(t.code,{children:"combinefunc"})," as a method for optimizing aggregate execution. By specifying ",(0,a.jsx)(t.code,{children:"combinefunc"}),", the aggregate can be run in parallel on segments first and then on the coordinator. When a two-level execution is performed, the ",(0,a.jsx)(t.code,{children:"sfunc"})," is run on the segments to generate partial aggregate results, and ",(0,a.jsx)(t.code,{children:"combinefunc"})," is run on the coordinator to aggregate the partial results from segments. If single-level aggregation is performed, all the rows are sent to the coordinator and the ",(0,a.jsx)(t.code,{children:"sfunc"})," is applied to the rows."]}),"\n",(0,a.jsxs)(t.p,{children:["Single-level aggregation and two-level aggregation are equivalent execution strategies. Either type of aggregation can be implemented in a query plan. When you implement the functions ",(0,a.jsx)(t.code,{children:"combinefunc"})," and ",(0,a.jsx)(t.code,{children:"sfunc"}),", you must ensure that the invocation of the ",(0,a.jsx)(t.code,{children:"sfunc"})," on the segment instances followed by ",(0,a.jsx)(t.code,{children:"combinefunc"})," on the coordinator produce the same result as single-level aggregation that sends all the rows to the coordinator and then applies only the ",(0,a.jsx)(t.code,{children:"sfunc"})," to the rows."]}),"\n",(0,a.jsx)(t.h2,{id:"parameters",children:"Parameters"}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.strong,{children:(0,a.jsx)(t.code,{children:"name"})})}),"\n",(0,a.jsx)(t.p,{children:"The name (optionally schema-qualified) of the aggregate function to create."}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.strong,{children:(0,a.jsx)(t.code,{children:"argmode"})})}),"\n",(0,a.jsxs)(t.p,{children:["The mode of an argument: ",(0,a.jsx)(t.code,{children:"IN"})," or ",(0,a.jsx)(t.code,{children:"VARIADIC"}),". (Aggregate functions do not support ",(0,a.jsx)(t.code,{children:"OUT"})," arguments.) If omitted, the default is ",(0,a.jsx)(t.code,{children:"IN"}),". Only the last argument can be marked ",(0,a.jsx)(t.code,{children:"VARIADIC"}),"."]}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.strong,{children:(0,a.jsx)(t.code,{children:"argname"})})}),"\n",(0,a.jsx)(t.p,{children:"The name of an argument. This is currently only useful for documentation purposes. If omitted, the argument has no name."}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.strong,{children:(0,a.jsx)(t.code,{children:"arg_data_type"})})}),"\n",(0,a.jsxs)(t.p,{children:["An input data type on which this aggregate function operates. To create a zero-argument aggregate function, write ",(0,a.jsx)(t.code,{children:"*"})," in place of the list of argument specifications. (An example of such an aggregate is ",(0,a.jsx)(t.code,{children:"count(*)"}),".)"]}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.strong,{children:(0,a.jsx)(t.code,{children:"base_type"})})}),"\n",(0,a.jsxs)(t.p,{children:["In the old syntax for ",(0,a.jsx)(t.code,{children:"CREATE AGGREGATE"}),", the input data type is specified by a ",(0,a.jsx)(t.code,{children:"basetype"})," parameter rather than being written next to the aggregate name. Note that this syntax allows only one input parameter. To define a zero-argument aggregate function with this syntax, specify the ",(0,a.jsx)(t.code,{children:"basetype"})," as ",(0,a.jsx)(t.code,{children:'"ANY"'})," (not ",(0,a.jsx)(t.code,{children:"*"}),"). Ordered-set aggregates cannot be defined with the old syntax."]}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.strong,{children:(0,a.jsx)(t.code,{children:"sfunc"})})}),"\n",(0,a.jsxs)(t.p,{children:["The name of the state transition function to be called for each input row. For a normal N-argument aggregate function, the state transition function ",(0,a.jsx)(t.code,{children:"sfunc"})," must take N+1 arguments, the first being of type state_data_type and the rest matching the declared input data type(s) of the aggregate. The function must return a value of type state_data_type. This function takes the current state value and the current input data value(s), and returns the next state value."]}),"\n",(0,a.jsx)(t.p,{children:"For ordered-set (including hypothetical-set) aggregates, the state transition function receives only the current state value and the aggregated arguments, not the direct arguments. Otherwise it is the same."}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.strong,{children:(0,a.jsx)(t.code,{children:"state_data_type"})})}),"\n",(0,a.jsx)(t.p,{children:"The data type for the aggregate's state value."}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.strong,{children:(0,a.jsx)(t.code,{children:"state_data_size"})})}),"\n",(0,a.jsxs)(t.p,{children:["The approximate average size (in bytes) of the aggregate's state value. If this parameter is omitted or is zero, a default estimate is used based on the state_data_type. The planner uses this value to estimate the memory required for a grouped aggregate query. The planner will consider using hash aggregation for such a query only if the hash table is estimated to fit in ",(0,a.jsx)(t.code,{children:"work_mem"}),"; therefore, large values of this parameter discourage use of hash aggregation."]}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.strong,{children:(0,a.jsx)(t.code,{children:"ffunc"})})}),"\n",(0,a.jsxs)(t.p,{children:["The name of the final function called to compute the aggregate result after all input rows have been traversed. The function must take a single argument of type state_data_type. The return data type of the aggregate is defined as the return type of this function. If ",(0,a.jsx)(t.code,{children:"ffunc"})," is not specified, then the ending state value is used as the aggregate result, and the return type is state_data_type."]}),"\n",(0,a.jsx)(t.p,{children:"For ordered-set (including hypothetical-set) aggregates, the final function receives not only the final state value, but also the values of all the direct arguments."}),"\n",(0,a.jsxs)(t.p,{children:["If ",(0,a.jsx)(t.code,{children:"FINALFUNC_EXTRA"})," is specified, then in addition to the final state value and any direct arguments, the final function receives extra NULL values corresponding to the aggregate's regular (aggregated) arguments. This is mainly useful to allow correct resolution of the aggregate result type when a polymorphic aggregate is being defined."]}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.strong,{children:(0,a.jsx)(t.code,{children:"FINALFUNC_MODIFY = { READ_ONLY | SHAREABLE | READ_WRITE }"})})}),"\n",(0,a.jsxs)(t.p,{children:["This option specifies whether the final function is a pure function that does not modify its arguments. ",(0,a.jsx)(t.code,{children:"READ_ONLY"})," indicates it does not; the other two values indicate that it may change the transition state value. See ",(0,a.jsx)(t.a,{href:"#notes",children:"Notes"})," below for more detail. The default is ",(0,a.jsx)(t.code,{children:"READ_ONLY"}),", except for ordered-set aggregates, for which the default is ",(0,a.jsx)(t.code,{children:"READ_WRITE"}),"."]}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.strong,{children:(0,a.jsx)(t.code,{children:"combinefunc"})})}),"\n",(0,a.jsx)(t.p,{children:"The combinefunc function may optionally be specified to allow the aggregate function to support partial aggregation. If provided, the combinefunc must combine two state_data_type values, each containing the result of aggregation over some subset of the input values, to produce a new state_data_type that represents the result of aggregating over both sets of inputs. This function can be thought of as an sfunc, where instead of acting upon an individual input row and adding it to the running aggregate state, it adds another aggregate state to the running state."}),"\n",(0,a.jsx)(t.p,{children:"The combinefunc must be declared as taking two arguments of the state_data_type and returning a value of the state_data_type. Optionally this function may be \u201cstrict\u201d. In this case the function will not be called when either of the input states are null; the other state will be taken as the correct result."}),"\n",(0,a.jsxs)(t.p,{children:["For aggregate functions whose state_data_type is ",(0,a.jsx)(t.code,{children:"internal"}),", the combinefunc must not be strict. In this case the combinefunc must ensure that null states are handled correctly and that the state being returned is properly stored in the aggregate memory context."]}),"\n",(0,a.jsx)(t.p,{children:"In Cloudberry Database, if the result of the aggregate function is computed in a segmented fashion, the combine function is invoked on the individual internal states in order to combine them into an ending internal state."}),"\n",(0,a.jsx)(t.p,{children:"Note that this function is also called in hash aggregate mode within a segment. Therefore, if you call this aggregate function without a combine function, hash aggregate is never chosen. Since hash aggregate is efficient, consider defining a combine function whenever possible."}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.strong,{children:(0,a.jsx)(t.code,{children:"serialfunc"})})}),"\n",(0,a.jsxs)(t.p,{children:["An aggregate function whose state_data_type is ",(0,a.jsx)(t.code,{children:"internal"})," can participate in parallel aggregation only if it has a serialfunc function, which must serialize the aggregate state into a ",(0,a.jsx)(t.code,{children:"bytea"})," value for transmission to another process. This function must take a single argument of type ",(0,a.jsx)(t.code,{children:"internal"})," and return type ",(0,a.jsx)(t.code,{children:"bytea"}),". A corresponding deserialfunc is also required."]}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.strong,{children:(0,a.jsx)(t.code,{children:"deserialfunc"})})}),"\n",(0,a.jsxs)(t.p,{children:["Deserialize a previously serialized aggregate state back into state_data_type. This function must take two arguments of types ",(0,a.jsx)(t.code,{children:"bytea"})," and ",(0,a.jsx)(t.code,{children:"internal"}),", and produce a result of type ",(0,a.jsx)(t.code,{children:"internal"}),". (Note: the second, ",(0,a.jsx)(t.code,{children:"internal"})," argument is unused, but is required for type safety reasons.)"]}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.strong,{children:(0,a.jsx)(t.code,{children:"initial_condition"})})}),"\n",(0,a.jsx)(t.p,{children:"The initial setting for the state value. This must be a string constant in the form accepted for the data type state_data_type. If not specified, the state value starts out null."}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.strong,{children:(0,a.jsx)(t.code,{children:"msfunc"})})}),"\n",(0,a.jsx)(t.p,{children:"The name of the forward state transition function to be called for each input row in moving-aggregate mode. This is exactly like the regular transition function, except that its first argument and result are of type mstate_data_type, which might be different from state_data_type."}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.strong,{children:(0,a.jsx)(t.code,{children:"minvfunc"})})}),"\n",(0,a.jsx)(t.p,{children:"The name of the inverse state transition function to be used in moving-aggregate mode. This function has the same argument and result types as msfunc, but it is used to remove a value from the current aggregate state, rather than add a value to it. The inverse transition function must have the same strictness attribute as the forward state transition function."}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.strong,{children:(0,a.jsx)(t.code,{children:"mstate_data_type"})})}),"\n",(0,a.jsx)(t.p,{children:"The data type for the aggregate's state value, when using moving-aggregate mode."}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.strong,{children:(0,a.jsx)(t.code,{children:"mstate_data_size"})})}),"\n",(0,a.jsx)(t.p,{children:"The approximate average size (in bytes) of the aggregate's state value, when using moving-aggregate mode. This works the same as state_data_size."}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.strong,{children:(0,a.jsx)(t.code,{children:"mffunc"})})}),"\n",(0,a.jsxs)(t.p,{children:["The name of the final function called to compute the aggregate's result after all input rows have been traversed, when using moving-aggregate mode. This works the same as ffunc, except that its first argument's type is mstate_data_type and extra dummy arguments are specified by writing ",(0,a.jsx)(t.code,{children:"MFINALFUNC_EXTRA"}),". The aggregate result type determined by mffunc or mstate_data_type must match that determined by the aggregate's regular implementation."]}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.strong,{children:(0,a.jsx)(t.code,{children:"MFINALFUNC_MODIFY = { READ_ONLY | SHAREABLE | READ_WRITE }"})})}),"\n",(0,a.jsxs)(t.p,{children:["This option is like ",(0,a.jsx)(t.code,{children:"FINALFUNC_MODIFY"}),", but it describes the behavior of the moving-aggregate final function."]}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.strong,{children:(0,a.jsx)(t.code,{children:"minitial_condition"})})}),"\n",(0,a.jsx)(t.p,{children:"The initial setting for the state value, when using moving-aggregate mode. This works the same as initial_condition."}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.strong,{children:(0,a.jsx)(t.code,{children:"sort_operator"})})}),"\n",(0,a.jsxs)(t.p,{children:["The associated sort operator for a ",(0,a.jsx)(t.code,{children:"min()"}),"- or ",(0,a.jsx)(t.code,{children:"max()"}),"-like aggregate. This is just an operator name (possibly schema-qualified). The operator is assumed to have the same input data types as the aggregate (which must be a single-argument normal aggregate)."]}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.strong,{children:(0,a.jsx)(t.code,{children:"PARALLEL = { SAFE | RESTRICTED | UNSAFE }"})})}),"\n",(0,a.jsxs)(t.p,{children:["The meanings of ",(0,a.jsx)(t.code,{children:"PARALLEL SAFE"}),", ",(0,a.jsx)(t.code,{children:"PARALLEL RESTRICTED"}),", and ",(0,a.jsx)(t.code,{children:"PARALLEL UNSAFE"})," are the same as in ",(0,a.jsx)(t.a,{href:"/docs/sql-stmts/create-function",children:"CREATE FUNCTION"}),". An aggregate will not be considered for parallelization if it is marked ",(0,a.jsx)(t.code,{children:"PARALLEL UNSAFE"})," (which is the default!) or ",(0,a.jsx)(t.code,{children:"PARALLEL RESTRICTED"}),". Note that the parallel-safety markings of the aggregate's support functions are not consulted by the planner, only the marking of the aggregate itself."]}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.strong,{children:(0,a.jsx)(t.code,{children:"REPSAFE = boolean"})})}),"\n",(0,a.jsxs)(t.p,{children:["Specifies whether or not the aggregate can be safely executed on replicated slices. An order-agnostic aggregate would be considered safe in this context. The default value is ",(0,a.jsx)(t.code,{children:"false"}),"."]}),"\n",(0,a.jsxs)(t.p,{children:["Setting ",(0,a.jsx)(t.code,{children:"REPSAFE = true"})," instructs the optimizer to perform additional optimizations that specifically suppress certain broadcast motions."]}),"\n",(0,a.jsxs)(t.blockquote,{children:["\n",(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.strong,{children:"Caution"})," Incorrectly setting ",(0,a.jsx)(t.code,{children:"REPSAFE = true"})," for an order-dependent aggregate may produce incorrect results."]}),"\n"]}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.strong,{children:(0,a.jsx)(t.code,{children:"HYPOTHETICAL"})})}),"\n",(0,a.jsxs)(t.p,{children:["For ordered-set aggregates only, this flag specifies that the aggregate arguments are to be processed according to the requirements for hypothetical-set aggregates: that is, the last few direct arguments must match the data types of the aggregated (",(0,a.jsx)(t.code,{children:"WITHIN GROUP"}),") arguments. The ",(0,a.jsx)(t.code,{children:"HYPOTHETICAL"})," flag has no effect on run-time behavior, only on parse-time resolution of the data types and collations of the aggregate's arguments."]}),"\n",(0,a.jsxs)(t.p,{children:["The parameters of ",(0,a.jsx)(t.code,{children:"CREATE AGGREGATE"})," can be written in any order, not just the order illustrated above."]}),"\n",(0,a.jsx)(t.h2,{id:"notes",children:"Notes"}),"\n",(0,a.jsx)(t.p,{children:"The ordinary functions used to define a new aggregate function must be defined first."}),"\n",(0,a.jsxs)(t.p,{children:["If the value of the Cloudberry Database server configuration parameter ",(0,a.jsx)(t.code,{children:"gp_enable_multiphase_agg"})," is ",(0,a.jsx)(t.code,{children:"off"}),", only single-level aggregation is performed by the Postgres Planner. There is no equivalent parameter for the Pivotal Query Optimizer."]}),"\n",(0,a.jsxs)(t.p,{children:["Any compiled code (shared library files) for custom functions must be placed in the same location on every host in your Cloudberry Database array (coordinator and all segments). This location must also be in the ",(0,a.jsx)(t.code,{children:"LD_LIBRARY_PATH"})," so that the server can locate the files."]}),"\n",(0,a.jsx)(t.p,{children:"In previous versions of Cloudberry Database, there was a concept of ordered aggregates. Since version 6, any aggregate can be called as an ordered aggregate, using the syntax:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-sql",children:"name ( arg [ , ... ] [ORDER BY sortspec [ , ...]] )\n"})}),"\n",(0,a.jsxs)(t.p,{children:["The ",(0,a.jsx)(t.code,{children:"ORDERED"})," keyword is accepted for backwards compatibility, but is ignored."]}),"\n",(0,a.jsxs)(t.p,{children:["In previous versions of Cloudberry Database, the ",(0,a.jsx)(t.code,{children:"COMBINEFUNC"})," option was called ",(0,a.jsx)(t.code,{children:"PREFUNC"}),". It is still accepted for backwards compatibility, as a synonym for ",(0,a.jsx)(t.code,{children:"COMBINEFUNC"}),"."]}),"\n",(0,a.jsx)(t.h2,{id:"example",children:"Example"}),"\n",(0,a.jsx)(t.p,{children:"The following simple example creates an aggregate function that computes the sum of two columns."}),"\n",(0,a.jsxs)(t.p,{children:["Before creating the aggregate function, create two functions that are used as the ",(0,a.jsx)(t.code,{children:"sfunc"})," and ",(0,a.jsx)(t.code,{children:"combinefunc"})," functions of the aggregate function."]}),"\n",(0,a.jsxs)(t.p,{children:["This function is specified as the ",(0,a.jsx)(t.code,{children:"sfunc"})," function in the aggregate function."]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-sql",children:"CREATE FUNCTION mysfunc_accum(numeric, numeric, numeric) \n\xa0\xa0RETURNS numeric\n\xa0\xa0\xa0AS 'select $1 + $2 + $3'\n\xa0\xa0\xa0LANGUAGE SQL\n\xa0\xa0\xa0RETURNS NULL ON NULL INPUT;\n"})}),"\n",(0,a.jsxs)(t.p,{children:["This function is specified as the ",(0,a.jsx)(t.code,{children:"combinefunc"})," function in the aggregate function."]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-sql",children:"CREATE FUNCTION mycombine_accum(numeric, numeric )\n\xa0\xa0RETURNS numeric\n\xa0\xa0\xa0AS 'select $1 + $2'\n\xa0\xa0\xa0LANGUAGE SQL\n\xa0\xa0\xa0RETURNS NULL ON NULL INPUT;\n"})}),"\n",(0,a.jsxs)(t.p,{children:["This ",(0,a.jsx)(t.code,{children:"CREATE AGGREGATE"})," command creates the aggregate function that adds two columns."]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-sql",children:"CREATE AGGREGATE agg_twocols(numeric, numeric) (\n\xa0\xa0\xa0SFUNC = mysfunc_accum,\n\xa0\xa0\xa0STYPE = numeric,\n\xa0\xa0\xa0COMBINEFUNC = mycombine_accum,\n\xa0\xa0\xa0INITCOND = 0 );\n"})}),"\n",(0,a.jsx)(t.p,{children:"The following commands create a table, adds some rows, and runs the aggregate function."}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-sql",children:"CREATE TABLE t1 (a int, b int) DISTRIBUTED BY (a);\nINSERT INTO t1 VALUES\n\xa0\xa0\xa0(10, 1),\n\xa0\xa0\xa0(20, 2),\n\xa0\xa0\xa0(30, 3);\nSELECT agg_twocols(a, b) FROM t1;\n"})}),"\n",(0,a.jsxs)(t.p,{children:["Refer to ",(0,a.jsx)(t.a,{href:"https://www.postgresql.org/docs/12/xaggr.html",children:"User-Defined Aggregates"})," in the PostgreSQL documentation for more examples of creating aggregates."]}),"\n",(0,a.jsx)(t.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.code,{children:"CREATE AGGREGATE"})," is a Cloudberry Database language extension. The SQL standard does not provide for user-defined aggregate functions."]}),"\n",(0,a.jsx)(t.h2,{id:"see-also",children:"See also"}),"\n",(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.a,{href:"/docs/sql-stmts/alter-aggregate",children:"ALTER AGGREGATE"}),", ",(0,a.jsx)(t.a,{href:"/docs/sql-stmts/drop-aggregate",children:"DROP AGGREGATE"}),", ",(0,a.jsx)(t.a,{href:"/docs/sql-stmts/create-function",children:"CREATE FUNCTION"})]})]})}function h(e={}){const{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(l,{...e})}):l(e)}},11151:(e,t,n)=>{n.d(t,{Z:()=>o,a:()=>r});var a=n(67294);const s={},i=a.createContext(s);function r(e){const t=a.useContext(i);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),a.createElement(i.Provider,{value:t},e.children)}}}]);