"use strict";(self.webpackChunkApache_Cloudberry_Incubating_website=self.webpackChunkApache_Cloudberry_Incubating_website||[]).push([[5866],{54507:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>r,default:()=>h,frontMatter:()=>a,metadata:()=>o,toc:()=>l});var s=n(85893),i=n(11151);const a={title:"CREATE TYPE"},r="CREATE TYPE",o={id:"sql-stmts/create-type",title:"CREATE TYPE",description:"Defines a new data type.",source:"@site/docs/sql-stmts/create-type.md",sourceDirName:"sql-stmts",slug:"/sql-stmts/create-type",permalink:"/docs/sql-stmts/create-type",draft:!1,unlisted:!1,editUrl:"https://github.com/apache/cloudberry-site/edit/main/docs/sql-stmts/create-type.md",tags:[],version:"current",lastUpdatedBy:"TomShawn",lastUpdatedAt:1739157355,formattedLastUpdatedAt:"Feb 10, 2025",frontMatter:{title:"CREATE TYPE"},sidebar:"docsbars",previous:{title:"CREATE TRIGGER",permalink:"/docs/sql-stmts/create-trigger"},next:{title:"CREATE USER MAPPING",permalink:"/docs/sql-stmts/create-user-mapping"}},c={},l=[{value:"Synopsis",id:"synopsis",level:2},{value:"Description",id:"description",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Notes",id:"notes",level:2},{value:"Examples",id:"examples",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"See also",id:"see-also",level:2}];function d(e){const t={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,i.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h1,{id:"create-type",children:"CREATE TYPE"}),"\n",(0,s.jsx)(t.p,{children:"Defines a new data type."}),"\n",(0,s.jsx)(t.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-sql",children:"CREATE TYPE <name> AS \n    ( [ <attribute_name> <data_type> [ COLLATE <collation> ] [, ... ] ] )\n\nCREATE TYPE <name> AS ENUM \n    ( [ '<label>' [, ... ] ] )\n\nCREATE TYPE <name> AS RANGE (\n    SUBTYPE = <subtype>\n    [ , SUBTYPE_OPCLASS = <subtype_operator_class> ]\n    [ , COLLATION = <collation> ]\n    [ , CANONICAL = <canonical_function> ]\n    [ , SUBTYPE_DIFF = <subtype_diff_function> ]\n)\n\nCREATE TYPE <name> (\n    INPUT = <input_function>,\n    OUTPUT = <output_function>\n    [, RECEIVE = <receive_function>]\n    [, SEND = <send_function>]\n    [, TYPMOD_IN = <type_modifier_input_function> ]\n    [, TYPMOD_OUT = <type_modifier_output_function> ]\n    [, ANALYZE = <analyze_function>]\n    [, INTERNALLENGTH = {<internallength> | VARIABLE}]\n    [, PASSEDBYVALUE]\n    [, ALIGNMENT = <alignment>]\n    [, STORAGE = <storage>]\n    [, LIKE = <like_type>\n    [, CATEGORY = <category>]\n    [, PREFERRED = <preferred>]\n    [, DEFAULT = <default>]\n    [, ELEMENT = <element>]\n    [, DELIMITER = <delimiter>]\n    [, COLLATABLE = <collatable>]\n    [, COMPRESSTYPE = <compression_type>]\n    [, COMPRESSLEVEL = <compression_level>]\n    [, BLOCKSIZE = <blocksize>] )\n\nCREATE TYPE <name>\n"})}),"\n",(0,s.jsx)(t.h2,{id:"description",children:"Description"}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.code,{children:"CREATE TYPE"})," registers a new data type for use in the current database. The user who defines a type becomes its owner."]}),"\n",(0,s.jsx)(t.p,{children:"If a schema name is given then the type is created in the specified schema. Otherwise it is created in the current schema. The type name must be distinct from the name of any existing type or domain in the same schema. The type name must also be distinct from the name of any existing table in the same schema."}),"\n",(0,s.jsxs)(t.p,{children:["There are five forms of ",(0,s.jsx)(t.code,{children:"CREATE TYPE"}),", as shown in the syntax synopsis above. They respectively create a ",(0,s.jsx)(t.em,{children:"composite type"}),", an ",(0,s.jsx)(t.em,{children:"enum type"}),", a ",(0,s.jsx)(t.em,{children:"range type"}),", a ",(0,s.jsx)(t.em,{children:"base type"}),", or a ",(0,s.jsx)(t.em,{children:"shell type"}),". The first four of these are discussed in turn below. A shell type is simply a placeholder for a type to be defined later; it is created by issuing ",(0,s.jsx)(t.code,{children:"CREATE TYPE"})," with no parameters except for the type name. Shell types are needed as forward references when creating range types and base types, as discussed in those sections."]}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"Composite Types"})}),"\n",(0,s.jsxs)(t.p,{children:["The first form of ",(0,s.jsx)(t.code,{children:"CREATE TYPE"})," creates a composite type. The composite type is specified by a list of attribute names and data types. An attribute's collation can be specified too, if its data type is collatable. A composite type is essentially the same as the row type of a table, but using ",(0,s.jsx)(t.code,{children:"CREATE TYPE"})," avoids the need to create an actual table when all that is wanted is to define a type. A stand-alone composite type is useful, for example, as the argument or return type of a function."]}),"\n",(0,s.jsxs)(t.p,{children:["To create a composite type, you must have ",(0,s.jsx)(t.code,{children:"USAGE"})," privilege on all attribute types."]}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"Enumerated Types"})}),"\n",(0,s.jsxs)(t.p,{children:["The second form of ",(0,s.jsx)(t.code,{children:"CREATE TYPE"})," creates an enumerated (",(0,s.jsx)(t.code,{children:"ENUM"}),") type, as described in ",(0,s.jsx)(t.a,{href:"https://www.postgresql.org/docs/12/datatype-enum.html",children:"Enumerated Types"})," in the PostgreSQL documentation. ",(0,s.jsx)(t.code,{children:"ENUM"})," types take a list of quoted labels, each of which must be less than ",(0,s.jsx)(t.code,{children:"NAMEDATALEN"})," bytes long (64)."]}),"\n",(0,s.jsxs)(t.p,{children:["It is possible to create an enumerated type with zero labels, but such a type cannot be used to hold values before at least one label is added using ",(0,s.jsx)(t.a,{href:"/docs/sql-stmts/alter-type",children:"ALTER TYPE"}),"."]}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"Range Types"})}),"\n",(0,s.jsxs)(t.p,{children:["The third form of ",(0,s.jsx)(t.code,{children:"CREATE TYPE"})," creates a new range type, as described in Range Types."]}),"\n",(0,s.jsx)(t.p,{children:"The range type's subtype can be any type with an associated b-tree operator class (to determine the ordering of values for the range type). Normally the subtype's default b-tree operator class is used to determine ordering; to use a non-default operator class, specify its name with subtype_opclass. If the subtype is collatable, and you want to use a non-default collation in the range's ordering, specify the desired collation with the collation option."}),"\n",(0,s.jsxs)(t.p,{children:["The optional canonical function must take one argument of the range type being defined, and return a value of the same type. This is used to convert range values to a canonical form, when applicable. See Defining New Range Types for more information. Creating a canonical function is a bit tricky, since it must be defined before the range type can be declared. To do this, you must first create a shell type, which is a placeholder type that has no properties except a name and an owner. This is done by issuing the command ",(0,s.jsx)(t.code,{children:"CREATE TYPE name"}),", with no additional parameters. Then the function can be declared using the shell type as argument and result, and finally the range type can be declared using the same name. This automatically replaces the shell type entry with a valid range type."]}),"\n",(0,s.jsx)(t.p,{children:"The optional subtype_diff_function must take two values of the subtype type as argument, and return a double precision value representing the difference between the two given values. While this is optional, providing it allows much greater efficiency of GiST indexes on columns of the range type. See Defining New Range Types for more information."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"Base Types"})}),"\n",(0,s.jsxs)(t.p,{children:["The fourth form of ",(0,s.jsx)(t.code,{children:"CREATE TYPE"})," creates a new base type (scalar type). You must be a superuser to create a new base type. (This restriction is in place because an erroneous type definition could confuse or even crash the server.)"]}),"\n",(0,s.jsxs)(t.p,{children:["The parameters may appear in any order, not only that shown in the syntax, and most are optional. You must register two or more functions (using ",(0,s.jsx)(t.code,{children:"CREATE FUNCTION"}),") before defining the type. The support functions input_function and output_function are required, while the functions receive_function, send_function, type_modifier_input_function, type_modifier_output_function, and analyze_function are optional. Generally these functions have to be coded in C or another low-level language. In Cloudberry Database, any function used to implement a data type must be defined as ",(0,s.jsx)(t.code,{children:"IMMUTABLE"}),"."]}),"\n",(0,s.jsxs)(t.p,{children:["The input_function converts the type's external textual representation to the internal representation used by the operators and functions defined for the type. output_function performs the reverse transformation. The input function may be declared as taking one argument of type ",(0,s.jsx)(t.code,{children:"cstring"}),", or as taking three arguments of types ",(0,s.jsx)(t.code,{children:"cstring"}),", ",(0,s.jsx)(t.code,{children:"oid"}),", ",(0,s.jsx)(t.code,{children:"integer"}),". The first argument is the input text as a C string, the second argument is the type's own OID (except for array types, which instead receive their element type's OID), and the third is the ",(0,s.jsx)(t.code,{children:"typmod"})," of the destination column, if known (",(0,s.jsx)(t.code,{children:"-1"})," will be passed if not). The input function must return a value of the data type itself. Usually, an input function should be declared ",(0,s.jsx)(t.code,{children:"STRICT"}),"; if it is not, it will be called with a ",(0,s.jsx)(t.code,{children:"NULL"})," first parameter when reading a ",(0,s.jsx)(t.code,{children:"NULL"})," input value. The function must still return ",(0,s.jsx)(t.code,{children:"NULL"})," in this case, unless it raises an error. (This case is mainly meant to support domain input functions, which may need to reject ",(0,s.jsx)(t.code,{children:"NULL"})," inputs.) The output function must be declared as taking one argument of the new data type. The output function must return type ",(0,s.jsx)(t.code,{children:"cstring"}),". Output functions are not invoked for ",(0,s.jsx)(t.code,{children:"NULL"})," values."]}),"\n",(0,s.jsxs)(t.p,{children:["The optional receive_function converts the type's external binary representation to the internal representation. If this function is not supplied, the type cannot participate in binary input. The binary representation should be chosen to be cheap to convert to internal form, while being reasonably portable. (For example, the standard integer data types use network byte order as the external binary representation, while the internal representation is in the machine's native byte order.) The receive function should perform adequate checking to ensure that the value is valid. The receive function may be declared as taking one argument of type ",(0,s.jsx)(t.code,{children:"internal"}),", or as taking three arguments of types ",(0,s.jsx)(t.code,{children:"internal"}),", ",(0,s.jsx)(t.code,{children:"oid"}),", ",(0,s.jsx)(t.code,{children:"integer"}),". The first argument is a pointer to a ",(0,s.jsx)(t.code,{children:"StringInfo"})," buffer holding the received byte string; the optional arguments are the same as for the text input function. The receive function must return a value of the data type itself. Usually, a receive function should be declared ",(0,s.jsx)(t.code,{children:"STRICT"}),"; if it is not, it will be called with a ",(0,s.jsx)(t.code,{children:"NULL"})," first parameter when reading a NULL input value. The function must still return ",(0,s.jsx)(t.code,{children:"NULL"})," in this case, unless it raises an error. (This case is mainly meant to support domain receive functions, which may need to reject ",(0,s.jsx)(t.code,{children:"NULL"})," inputs.) Similarly, the optional send_function converts from the internal representation to the external binary representation. If this function is not supplied, the type cannot participate in binary output. The send function must be declared as taking one argument of the new data type. The send function must return type ",(0,s.jsx)(t.code,{children:"bytea"}),". Send functions are not invoked for ",(0,s.jsx)(t.code,{children:"NULL"})," values."]}),"\n",(0,s.jsxs)(t.p,{children:["How can the input and output functions be declared to have results or arguments of the new type, when they have to be created before the new type can be created? The type should first be defined as a shell type, which is a placeholder type that has no properties except a name and an owner. This is done by issuing the command ",(0,s.jsx)(t.code,{children:"CREATE TYPE name"}),", with no additional parameters. Then the I/O functions can be defined referencing the shell type. Finally, ",(0,s.jsx)(t.code,{children:"CREATE TYPE"})," with a full definition replaces the shell entry with a complete, valid type definition, after which the new type can be used normally."]}),"\n",(0,s.jsxs)(t.p,{children:["The optional type_modifier_input_function and type_modifier_output_function are required if the type supports modifiers. Modifiers are optional constraints attached to a type declaration, such as ",(0,s.jsx)(t.code,{children:"char(5)"})," or ",(0,s.jsx)(t.code,{children:"numeric(30,2)"}),". While Cloudberry Database allows user-defined types to take one or more simple constants or identifiers as modifiers, this information must fit into a single non-negative integer value for storage in the system catalogs. Cloudberry Database passes the declared modifier(s) to the type_modifier_input_function in the form of a ",(0,s.jsx)(t.code,{children:"cstring"})," array. The modifier input function must check the values for validity, throwing an error if they are incorrect. If the values are correct, the modifier input function returns a single non-negative integer value that Cloudberry Database stores as the column ",(0,s.jsx)(t.code,{children:"typmod"}),". Type modifiers are rejected if the type was not defined with a type_modifier_input_function. The type_modifier_output_function converts the internal integer ",(0,s.jsx)(t.code,{children:"typmod"})," value back to the correct form for user display. The modifier output function must return a ",(0,s.jsx)(t.code,{children:"cstring"})," value that is the exact string to append to the type name. For example, ",(0,s.jsx)(t.code,{children:"numeric"}),"'s function might return ",(0,s.jsx)(t.code,{children:"(30,2)"}),". The type_modifier_output_function is optional. When not specified, the default display format is the stored ",(0,s.jsx)(t.code,{children:"typmod"})," integer value enclosed in parentheses."]}),"\n",(0,s.jsxs)(t.p,{children:["The optional analyze_function performs type-specific statistics collection for columns of the data type. By default, ",(0,s.jsx)(t.code,{children:"ANALYZE"}),' attempts to gather statistics using the type\'s "equals" and "less-than" operators, if there is a default b-tree operator class for the type. For non-scalar types this behavior is likely to be unsuitable, so it can be overridden by specifying a custom analysis function. The analysis function must be declared to take a single argument of type ',(0,s.jsx)(t.code,{children:"internal"}),", and return a ",(0,s.jsx)(t.code,{children:"boolean"})," result."]}),"\n",(0,s.jsxs)(t.p,{children:["While the details of the new type's internal representation are only known to the I/O functions and other functions you create to work with the type, there are several properties of the internal representation that must be declared to Cloudberry Database. Foremost of these is internallength. Base data types can be fixed-length, in which case internallength is a positive integer, or variable length, indicated by setting internallength to ",(0,s.jsx)(t.code,{children:"VARIABLE"}),". (Internally, this is represented by setting ",(0,s.jsx)(t.code,{children:"typlen"})," to ",(0,s.jsx)(t.code,{children:"-1"}),".) The internal representation of all variable-length types must start with a 4-byte integer giving the total length of this value of the type."]}),"\n",(0,s.jsxs)(t.p,{children:["The optional flag ",(0,s.jsx)(t.code,{children:"PASSEDBYVALUE"})," indicates that values of this data type are passed by value, rather than by reference. You may not pass by value types whose internal representation is larger than the size of the ",(0,s.jsx)(t.code,{children:"Datum"})," type (4 bytes on most machines, 8 bytes on a few)."]}),"\n",(0,s.jsxs)(t.p,{children:["The alignment parameter specifies the storage alignment required for the data type. The allowed values equate to alignment on 1, 2, 4, or 8 byte boundaries. Note that variable-length types must have an alignment of at least 4, since they necessarily contain an ",(0,s.jsx)(t.code,{children:"int4"})," as their first component."]}),"\n",(0,s.jsxs)(t.p,{children:["The storage parameter allows selection of storage strategies for variable-length data types. (Only ",(0,s.jsx)(t.code,{children:"plain"})," is allowed for fixed-length types.) ",(0,s.jsx)(t.code,{children:"plain"})," specifies that data of the type will always be stored in-line and not compressed. ",(0,s.jsx)(t.code,{children:"extended"})," specifies that the system will first try to compress a long data value, and will move the value out of the main table row if it's still too long. ",(0,s.jsx)(t.code,{children:"external"})," allows the value to be moved out of the main table, but the system will not try to compress it. ",(0,s.jsx)(t.code,{children:"main"})," allows compression, but discourages moving the value out of the main table. (Data items with this storage strategy may still be moved out of the main table if there is no other way to make a row fit, but they will be kept in the main table preferentially over ",(0,s.jsx)(t.code,{children:"extended"})," and ",(0,s.jsx)(t.code,{children:"external"})," items.)"]}),"\n",(0,s.jsxs)(t.p,{children:["All storage values other than ",(0,s.jsx)(t.code,{children:"plain"})," imply that the functions of the data type can handle values that have been toasted as described in ",(0,s.jsx)(t.a,{href:"https://www.postgresql.org/docs/12/storage-toast.html",children:"TOAST"})," and ",(0,s.jsx)(t.a,{href:"https://www.postgresql.org/docs/12/xtypes.html#XTYPES-TOAST",children:"TOAST CONSIDERATIONS"})," in the PostgreSQL documentation. The specific other value given merely determines the default TOAST storage strategy for columns of a toastable data type; users can pick other strategies for individual columns using ",(0,s.jsx)(t.code,{children:"ALTER TABLE SET STORAGE"}),"."]}),"\n",(0,s.jsxs)(t.p,{children:["The like_type parameter provides an alternative method for specifying the basic representation properties of a data type: copy them from some existing type. The values ",(0,s.jsx)(t.code,{children:"internallength"}),", ",(0,s.jsx)(t.code,{children:"passedbyvalue"}),", ",(0,s.jsx)(t.code,{children:"alignment"}),", and ",(0,s.jsx)(t.code,{children:"storage"})," are copied from the named type. (It is possible, though usually undesirable, to override some of these values by specifying them along with the ",(0,s.jsx)(t.code,{children:"LIKE"}),' clause.) Specifying representation this way is especially useful when the low-level implementation of the new type "piggybacks" on an existing type in some fashion.']}),"\n",(0,s.jsxs)(t.p,{children:["The ",(0,s.jsx)(t.em,{children:"category"})," and ",(0,s.jsx)(t.em,{children:"preferred"}),' parameters can be used to help control which implicit cast Cloudberry Database applies in ambiguous situations. Each data type belongs to a category named by a single ASCII character, and each type is either "preferred" or not within its category. The parser will prefer casting to preferred types (but only from other types within the same category) when this rule helps resolve overloaded functions or operators. For types that have no implicit casts to or from any other types, it is sufficient to retain the default settings. However, for a group of related types that have implicit casts, it is often helpful to mark them all as belonging to a category and select one or two of the "most general" types as being preferred within the category. The ',(0,s.jsx)(t.em,{children:"category"})," parameter is especially useful when you add a user-defined type to an existing built-in category, such as the numeric or string types. It is also possible to create new entirely-user-defined type categories. Select any ASCII character other than an upper-case letter to name such a category."]}),"\n",(0,s.jsxs)(t.p,{children:["A default value may be specified, in case a user wants columns of the data type to default to something other than the null value. Specify the default with the ",(0,s.jsx)(t.code,{children:"DEFAULT"})," key word. (Such a default may be overridden by an explicit ",(0,s.jsx)(t.code,{children:"DEFAULT"})," clause attached to a particular column.)"]}),"\n",(0,s.jsxs)(t.p,{children:["To indicate that a type is an array, specify the type of the array elements using the ",(0,s.jsx)(t.code,{children:"ELEMENT"})," key word. For example, to define an array of 4-byte integers (int4), specify ",(0,s.jsx)(t.code,{children:"ELEMENT = int4"}),". More details about array types appear below."]}),"\n",(0,s.jsxs)(t.p,{children:["To indicate the delimiter to be used between values in the external representation of arrays of this type, ",(0,s.jsx)(t.code,{children:"delimiter"})," can be set to a specific character. The default delimiter is the comma (,). Note that the delimiter is associated with the array element type, not the array type itself."]}),"\n",(0,s.jsxs)(t.p,{children:["If the optional Boolean parameter collatable is true, column definitions and expressions of the type may carry collation information through use of the ",(0,s.jsx)(t.code,{children:"COLLATE"})," clause. It is up to the implementations of the functions operating on the type to actually make use of the collation information; this does not happen automatically merely by marking the type collatable."]}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"Array Types"})}),"\n",(0,s.jsxs)(t.p,{children:["Whenever a user-defined type is created, Cloudberry Database automatically creates an associated array type, whose name consists of the element type's name prepended with an underscore, and truncated if necessary to keep it less than ",(0,s.jsx)(t.code,{children:"NAMEDATALEN"})," bytes long. (If the name so generated collides with an existing type name, the process is repeated until a non-colliding name is found.) This implicitly-created array type is variable length and uses the built-in input and output functions ",(0,s.jsx)(t.code,{children:"array_in"})," and ",(0,s.jsx)(t.code,{children:"array_out"}),". The array type tracks any changes in its element type's owner or schema, and is dropped if the element type is."]}),"\n",(0,s.jsxs)(t.p,{children:["Why is there is an ",(0,s.jsx)(t.code,{children:"ELEMENT"})," option, when the system makes the correct array type automatically? The only case where it's useful to use ",(0,s.jsx)(t.code,{children:"ELEMENT"})," is when you are making a fixed-length type that happens to be internally an array of a number of identical things, and you want to allow these things to be accessed directly by subscripting, in addition to whatever operations you plan to provide for the type as a whole. For example, type ",(0,s.jsx)(t.code,{children:"point"})," is represented as just two floating-point numbers, each can be accessed using ",(0,s.jsx)(t.code,{children:"point[0]"})," and ",(0,s.jsx)(t.code,{children:"point[1]"}),". Note that this facility only works for fixed-length types whose internal form is exactly a sequence of identical fixed-length fields. A subscriptable variable-length type must have the generalized internal representation used by ",(0,s.jsx)(t.code,{children:"array_in"})," and ",(0,s.jsx)(t.code,{children:"array_out"}),". For historical reasons, subscripting of fixed-length array types starts from zero, rather than from one as for variable-length arrays."]}),"\n",(0,s.jsx)(t.h2,{id:"parameters",children:"Parameters"}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"name"})})}),"\n",(0,s.jsx)(t.p,{children:"The name (optionally schema-qualified) of a type to be created."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"attribute_name"})})}),"\n",(0,s.jsx)(t.p,{children:"The name of an attribute (column) for the composite type."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"data_type"})})}),"\n",(0,s.jsx)(t.p,{children:"The name of an existing data type to become a column of the composite type."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"collation"})})}),"\n",(0,s.jsx)(t.p,{children:"The name of an existing collation to be associated with a column of a composite type, or with a range type."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"label"})})}),"\n",(0,s.jsx)(t.p,{children:"A string literal representing the textual label associated with one value of an enum type."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"subtype"})})}),"\n",(0,s.jsx)(t.p,{children:"The name of the element type that the range type will represent ranges of."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"subtype_operator_class"})})}),"\n",(0,s.jsx)(t.p,{children:"The name of a b-tree operator class for the subtype."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"canonical_function"})})}),"\n",(0,s.jsx)(t.p,{children:"The name of the canonicalization function for the range type."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"subtype_diff_function"})})}),"\n",(0,s.jsx)(t.p,{children:"The name of a difference function for the subtype."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"input_function"})})}),"\n",(0,s.jsx)(t.p,{children:"The name of a function that converts data from the type's external textual form to its internal form."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"output_function"})})}),"\n",(0,s.jsx)(t.p,{children:"The name of a function that converts data from the type's internal form to its external textual form."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"receive_function"})})}),"\n",(0,s.jsx)(t.p,{children:"The name of a function that converts data from the type's external binary form to its internal form."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"send_function"})})}),"\n",(0,s.jsx)(t.p,{children:"The name of a function that converts data from the type's internal form to its external binary form."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"type_modifier_input_function"})})}),"\n",(0,s.jsx)(t.p,{children:"The name of a function that converts an array of modifier(s) for the type to internal form."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"type_modifier_output_function"})})}),"\n",(0,s.jsx)(t.p,{children:"The name of a function that converts the internal form of the type's modifier(s) to external textual form."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"analyze_function"})})}),"\n",(0,s.jsx)(t.p,{children:"The name of a function that performs statistical analysis for the data type."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"internallength"})})}),"\n",(0,s.jsx)(t.p,{children:"A numeric constant that specifies the length in bytes of the new type's internal representation. The default assumption is that it is variable-length."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"alignment"})})}),"\n",(0,s.jsxs)(t.p,{children:["The storage alignment requirement of the data type. Must be one of ",(0,s.jsx)(t.code,{children:"char"}),", ",(0,s.jsx)(t.code,{children:"int2"}),", ",(0,s.jsx)(t.code,{children:"int4"}),", or ",(0,s.jsx)(t.code,{children:"double"}),". The default is ",(0,s.jsx)(t.code,{children:"int4"}),"."]}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"storage"})})}),"\n",(0,s.jsxs)(t.p,{children:["The storage strategy for the data type. Must be one of ",(0,s.jsx)(t.code,{children:"plain"}),", ",(0,s.jsx)(t.code,{children:"external"}),", ",(0,s.jsx)(t.code,{children:"extended"}),", or ",(0,s.jsx)(t.code,{children:"main"}),". The default is ",(0,s.jsx)(t.code,{children:"plain"}),"."]}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"like_type"})})}),"\n",(0,s.jsxs)(t.p,{children:["The name of an existing data type that the new type will have the same representation as. The values internallength, passedbyvalue, alignment, and storage, are copied from that type, unless overridden by explicit specification elsewhere in this ",(0,s.jsx)(t.code,{children:"CREATE TYPE"})," command."]}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"category"})})}),"\n",(0,s.jsxs)(t.p,{children:["The category code (a single ASCII character) for this type. The default is '",(0,s.jsx)(t.code,{children:"U"}),"', signifying a user-defined type. You can find the other standard category codes in ",(0,s.jsx)(t.code,{children:"pg_type"})," Category Codes. You may also assign unused ASCII characters to custom categories that you create."]}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"preferred"})})}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.code,{children:"true"})," if this type is a preferred type within its type category, else ",(0,s.jsx)(t.code,{children:"false"}),". The default value is ",(0,s.jsx)(t.code,{children:"false"}),". Be careful when you create a new preferred type within an existing type category; this could cause surprising behaviour changes."]}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"default"})})}),"\n",(0,s.jsx)(t.p,{children:"The default value for the data type. If this is omitted, the default is null."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"element"})})}),"\n",(0,s.jsx)(t.p,{children:"The type being created is an array; this specifies the type of the array elements."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"delimiter"})})}),"\n",(0,s.jsx)(t.p,{children:"The delimiter character to be used between values in arrays made of this type."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"collatable"})})}),"\n",(0,s.jsx)(t.p,{children:"True if this type's operations can use collation information. The default is false."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"compression_type"})})}),"\n",(0,s.jsxs)(t.p,{children:["Set to ",(0,s.jsx)(t.code,{children:"ZLIB"})," (the default), ",(0,s.jsx)(t.code,{children:"ZSTD"}),", or ",(0,s.jsx)(t.code,{children:"RLE_TYPE"})," to specify the type of compression used in columns of this type."]}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"compression_level"})})}),"\n",(0,s.jsxs)(t.p,{children:["For Zstd compression, set to an integer value from 1 (fastest compression) to 19 (highest compression ratio). For zlib compression, the valid range is from 1 to 9. For ",(0,s.jsx)(t.code,{children:"RLE_TYPE"}),", the compression level can be set to an integer value from 1 (fastest compression) to 4 (highest compression ratio). The default compression level is 1."]}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"blocksize"})})}),"\n",(0,s.jsxs)(t.p,{children:["Set to the size, in bytes, for each block in the column. The ",(0,s.jsx)(t.code,{children:"BLOCKSIZE"})," must be between 8192 and 2097152 bytes, and be a multiple of 8192. The default block size is 32768."]}),"\n",(0,s.jsx)(t.h2,{id:"notes",children:"Notes"}),"\n",(0,s.jsxs)(t.p,{children:["User-defined type names cannot begin with the underscore character (_) and can only be 62 characters long (or in general ",(0,s.jsx)(t.code,{children:"NAMEDATALEN - 2"}),", rather than the ",(0,s.jsx)(t.code,{children:"NAMEDATALEN - 1"})," characters allowed for other names). Type names beginning with underscore are reserved for internally-created array type names."]}),"\n",(0,s.jsx)(t.p,{children:"Cloudberry Database does not support adding storage options for row or composite types."}),"\n",(0,s.jsx)(t.p,{children:"Storage options defined at the table- and column- level override the default storage options defined for a scalar type."}),"\n",(0,s.jsx)(t.p,{children:"Because there are no restrictions on use of a data type once it's been created, creating a base type or range type is tantamount to granting public execute permission on the functions mentioned in the type definition. (The creator of the type is therefore required to own these functions.) This is usually not an issue for the sorts of functions that are useful in a type definition. But you might want to think twice before designing a type in a way that would require 'secret' information to be used while converting it to or from external form."}),"\n",(0,s.jsxs)(t.p,{children:["Use ",(0,s.jsx)(t.code,{children:"pg_type.typarray"})," to locate the array type associated with a given type."]}),"\n",(0,s.jsx)(t.h2,{id:"examples",children:"Examples"}),"\n",(0,s.jsx)(t.p,{children:"This example creates a composite type and uses it in a function definition:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-sql",children:"CREATE TYPE compfoo AS (f1 int, f2 text);\n\nCREATE FUNCTION getfoo() RETURNS SETOF compfoo AS $$\n    SELECT fooid, fooname FROM foo\n$$ LANGUAGE SQL;\n"})}),"\n",(0,s.jsxs)(t.p,{children:["This example creates the enumerated type ",(0,s.jsx)(t.code,{children:"mood"})," and uses it in a table definition."]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-sql",children:"CREATE TYPE mood AS ENUM ('sad', 'ok', 'happy');\nCREATE TABLE person (\n    name text,\n    current_mood mood\n);\nINSERT INTO person VALUES ('Moe', 'happy');\nSELECT * FROM person WHERE current_mood = 'happy';\n name | current_mood \n------+--------------\n Moe  | happy\n(1 row)\n"})}),"\n",(0,s.jsx)(t.p,{children:"This example creates a range type:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-sql",children:"CREATE TYPE float8_range AS RANGE (subtype = float8, subtype_diff = float8mi);\n"})}),"\n",(0,s.jsxs)(t.p,{children:["This example creates the base data type ",(0,s.jsx)(t.code,{children:"box"})," and then uses the type in a table definition:"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-sql",children:"CREATE TYPE box;\n\nCREATE FUNCTION my_box_in_function(cstring) RETURNS box AS \n... ;\n\nCREATE FUNCTION my_box_out_function(box) RETURNS cstring AS \n... ;\n\nCREATE TYPE box (\n    INTERNALLENGTH = 16,\n    INPUT = my_box_in_function,\n    OUTPUT = my_box_out_function\n);\n\nCREATE TABLE myboxes (\n    id integer,\n    description box\n);\n"})}),"\n",(0,s.jsxs)(t.p,{children:["If the internal structure of ",(0,s.jsx)(t.code,{children:"box"})," were an array of four ",(0,s.jsx)(t.code,{children:"float4"})," elements, we might instead use:"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-sql",children:"CREATE TYPE box (\n    INTERNALLENGTH = 16,\n    INPUT = my_box_in_function,\n    OUTPUT = my_box_out_function,\n    ELEMENT = float4\n);\n"})}),"\n",(0,s.jsx)(t.p,{children:"which would allow a box value's component numbers to be accessed by subscripting. Otherwise the type behaves the same as before."}),"\n",(0,s.jsx)(t.p,{children:"This example creates a large object type and uses it in a table definition:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-sql",children:"CREATE TYPE bigobj (\n    INPUT = lo_filein, OUTPUT = lo_fileout,\n    INTERNALLENGTH = VARIABLE\n);\n\nCREATE TABLE big_objs (\n    id integer,\n    obj bigobj\n    );\n"})}),"\n",(0,s.jsx)(t.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,s.jsxs)(t.p,{children:["The first form of the ",(0,s.jsx)(t.code,{children:"CREATE TYPE"})," command, which creates a composite type, conforms to the SQL standard. The other forms are Cloudberry Database extensions. The ",(0,s.jsx)(t.code,{children:"CREATE TYPE"})," statement in the SQL standard also defines other forms that are not implemented in Cloudberry Database."]}),"\n",(0,s.jsxs)(t.p,{children:["The ability to create a composite type with zero attributes is a Cloudberry Database-specific deviation from the standard (analogous to the same case in ",(0,s.jsx)(t.code,{children:"CREATE TABLE"}),")."]}),"\n",(0,s.jsx)(t.h2,{id:"see-also",children:"See also"}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.a,{href:"/docs/sql-stmts/alter-type",children:"ALTER TYPE"}),", ",(0,s.jsx)(t.a,{href:"/docs/sql-stmts/create-domain",children:"CREATE DOMAIN"}),", ",(0,s.jsx)(t.a,{href:"/docs/sql-stmts/create-function",children:"CREATE FUNCTION"}),", ",(0,s.jsx)(t.a,{href:"/docs/sql-stmts/drop-type",children:"DROP TYPE"})]})]})}function h(e={}){const{wrapper:t}={...(0,i.a)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},11151:(e,t,n)=>{n.d(t,{Z:()=>o,a:()=>r});var s=n(67294);const i={},a=s.createContext(i);function r(e){const t=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),s.createElement(a.Provider,{value:t},e.children)}}}]);