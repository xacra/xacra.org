


// import :: Script : Number
// ----------------------------------------------------------------------------------------------------------------------------
    import "./script.Number.mjs";
// ============================================================================================================================






// extend :: String : methods
// ----------------------------------------------------------------------------------------------------------------------------
    String.extend
    ({
        memory:
        {
            joiner: '⨝',
            unwrap: [ "${'", "'}" ],


            decide:
            {
                affirm: ( "Y true yes on" ).split(" "),
                negate: ( "N false no off" ).split(" "),
            },


            inLink:
            {
                joiner: ( ":// : @ : / ? = & #" ).split(" "),
                indice: ( "plan user pass host port path vars node" ).split(" "),
                sample: ( "http anon YW5vbg example.com 80 target/path key=val #nodeID" ).split(" "),
            },
        },



        locate ( string, search, option="number", affirm=null )
        {
            let choice = { boolean:false, number:0, string:"", array:[], object:{} }
            let output = choice[ option ];
                string+= ""; // toString or fail
            let number = 0;
            let locale;

            if ( !Array.isArray(search) )
            { search = [search] };


            Object.filter( search, (locale,sliver)=>
            {
                sliver+= "";
                locale = string.indexOf( sliver );


                if ( locale === affirm )
                {
                    output = true;
                    return FINISH;
                };


                switch ( option )
                {
                    case  STARTS   : output = ( string.startsWith(sliver) ? sliver : "" );  return ( output ? FINISH : "" );
                    case  FINISH   : output = ( string.endsWith(sliver) ? sliver : "" );  return ( output ? FINISH : "" );

                    case "string"  : output = ( (locale < 0) ? "" : sliver );  return ( output ? FINISH : "" );
                    case "boolean" : output = ( locale > -1 );  return ( output ? FINISH : "" );

                    case "number"  : number = ( number + ((locale < 0) ? 0 : 1) );  return; // instances found
                    case "array"   : return output.push( locale );
                    case "object"  : return output[ sliver ] = locale;
                };
            });


            return output;
        },



        awaits ( string, invoke=null, params=[] )
        {
            string += ""; // toString or fail

            let number = ( new Date() ).getTime();
            let parsed = Date.parsed( string ); // future date
            let differ = ( parsed - number ); // millisec to wait


            if ( differ < 0 )
            {
                params.unshift( new Error("this should've ran " + (differ / 1000) + " seconds ago") );
                differ = 0;
            };


            return Number.awaits( differ, invoke, params );
        },



        cloned ( string, number=1 )
        {
            return (string+"").repeat(number);
        },



        escape ( string, emblem="", action="insert", enwrap="", quotes=["'",'"',"`"] )
        {
            string += ""; // toString or fail


            if ( !emblem )
            {
                emblem = string[0];
                enwrap = ( enwrap || true );
            };


            if ( !quotes.includes(emblem) )
            { return moan("expecting 2nd arg (emblem) as any: "+quotes) };


            if ( action === "insert" )
            {
                string = string.split("\\").join("\\\\").split( emblem ).join( ("\\"+emblem) );
            }
            else if ( action === "remove" )
            {
                string = string.split(("\\"+emblem)).join( emblem ).split("\\\\").join("\\");
            };


            return ( enwrap ? (emblem+string+emblem) : string );
        },



        shaved ( string, starts="", finish="" )
        {
            if ( (starts + finish) === "" )
            { return string.trim() };

            while ( !!starts && string.startsWith(starts) )
            { string = string.slice(starts.length) };

            while ( !!finish && string.endsWith(finish) )
            { string = string.slice(0,(0-finish.length)) };

            return string;
        },



        expose ( string, inside=null )
        {
            let output = [];
                string+= "";
                inside = ( (Array.isArray(inside) && (inside.length === 2)) ? inside : String.memory.unwrap );
            let offset = 0,  starts,  finish;


            do
            {
                starts = string.indexOf( inside[0], offset );
                finish = ( (starts < 0) ? -1 : string.indexOf(inside[1], (starts + inside[0].length)) );
                offset = ( (finish < 0) ? -1 : (finish + inside[1].length) );

                if ( finish < 0 )
                { break };

                output.push( string.slice((starts + inside[0].length),finish) );
            }
            while ( offset > -1 )


            return output;
        },



        impose ( string, change="", inside=null )
        {
            let listed,  search,  detail,  detect;

            string+= "";
            detect = Object.detect( change );
            inside = ( (Array.isArray(inside) && (inside.length === 2)) ? inside : String.memory.unwrap );
            listed = String.expose( string, inside );

            if ( detect === "object" )
            { change = Object.exhume(change) }
            else
            { change+="" };


            listed.map(( aspect )=>
            {
                search = ( [inside[0], aspect, inside[1]] ).join("");
                detail = ( (detect === "object") ? Object.parsed(Object.target(change, aspect)) : change );
                string = string.split( search ).join( detail );
            });


            return string;
        },



        toCase: Object.extend
        (
            function toCase ( string, casing, joiner )
            {
                return String.toCase[ casing ]( string, joiner );
            },
            {
                upper ( string )
                { return string.toUpperCase() },


                lower ( string )
                { return string.toLowerCase() },


                camel ( string )
                {
                    let output = String.toCase(string,"title");
                    return ( output[0].toLowerCase() + output.slice(1) );
                },


                title ( string,  joiner=[" ","-"] )
                {
                    let source = (string+"").toLowerCase();
                    let slicer = String.memory.joiner;
                    let output = [];


                    while (  joiner.length > 0 )
                    {
                        let cutter = joiner.shift();
                        source = source.split(cutter).join(slicer);
                    };


                    source.split(slicer).map((string)=>
                    {
                        string = string.trim();

                        if ( !!string )
                        { output.push((string[0].toUpperCase() + string.slice(1))) };
                    });


                    return output.join("");
                },
            }
        ),



        target: Object.extend
        (
            function target( string, parent="" )
            {
                if ( !String.detect(string,"target") )
                { return "" }; // invalid intake, but expect return as string

                if ( string.includes("%") )
                { string = decodeURIComponent(string) };

                if ( string.startsWith("/") || string.includes(":/") )
                { return string };

                if ( (String.detect(parent) !== "target") || (parent.length < 2) )
                { parent = "" }; // safety


                if ( !!parent && string.startsWith("../") )
                {
                    if ( string.endsWith("/") )
                    { string = string.slice(0,-1) };

                    if ( parent.endsWith("/") )
                    { parent = string.slice(0,-1) };

                    while ( string.startsWith("../") )
                    {
                        string = string.split("/").slice(1).join("/");
                        parent = parent.split("/").slice(0,-1).join("/");
                    };


                    return ( parent + "/" + string );
                };


                let parted = [ string[0], string.slice(1) ];
                    parent = ( parent || ((Script.device === "client") ? Script.parent : Script.folder) );
                let output = String.target[ Script.device ]( ...([...parted, parent]) );

                output = ( output || string ).split("//").join("/");

                if ( (output.length > 1) && output.endsWith("/") )
                { output = output.slice(0,-1) };

                return output;
            },
            {
                client ( symbol, target, parent )
                {
                    switch ( symbol )
                    {
                        case "." : return ( parent + target ); // TODO test + update this pls
                        case "$" : return ( target ); // TODO test + update this pls
                        case "~" : return ( target ); // TODO test + update this pls
                    };
                },


                server ( symbol, target, parent )
                {
                    switch ( symbol )
                    {
                        case "." : return ( parent + target ); // aarden cli context path
                        case "$" : return ( Script.origin + target ); // aarden source path
                        case "~" : return ( parent.split("/").slice(0,3).join("/") + target ); // current user home path
                    };
                },
            }
        ),



        isCase ( string, casing )
        {
            return ( string === String.toCase(string,casing) );
        },



        random ( matter=32, joiner="" )
        {
            let output = "";
            let detect = ( typeof matter );


            if ( detect === "string" )
            {
                output = Array.random( matter.split(joiner) ).join( joiner );
                return output;
            };


            if ( detect === "number" )
            {
                while ( output.length < matter )
                { output += Array.random(Number.stored.Base62.split("")).join("") };

                return output.slice( 0, matter );
            };
        },



        unique ( length=12, prefix=null, joiner=null )
        {
            let output = Crypto.encode( Number.unique(), "base62" );

            if ( ((typeof length) !== "number") || !length )
            { return output }; // shortest unique string

            prefix = ( (prefix === null) ? "urid" : prefix );
            joiner = ( (joiner === null) ? "-" : joiner );
            output = ( prefix + joiner + output + joiner );

            while (output.length < length)
            { output += String.random() };

            output = output.slice( 0, length );


            if ( joiner !== "" )
            {
                if ( output.startsWith(joiner) )
                { output = output.slice(joiner.length) };

                if ( output.endsWith(joiner) )
                { output = output.slice(0, (0 - joiner.length)) };
            };


            return output;
        },



        detect: Object.extend
        (
            function detect ( string, affirm=9, padded="" )
            {
                if ( ((typeof string) === "string") && (string.length < 1) )
                { string = "undefined" };

                string = Object.parsed( string ).trim().toLowerCase(); // forced as string without errors
                padded = ( padded || (string[0] + string.slice(-1)) ); // first character + last character

                let detect = ( typeof affirm );
                let length = ( (detect === "string") ? affirm.length : affirm );
                let listed = Object.indice( String.detect );
                let output;


                if ( (detect === "string") && listed.includes(affirm) )
                {
                    output = String.detect[ affirm ]( string, affirm, padded );
                    return ( output === affirm );
                };


                for ( let aspect of listed )
                {
                    output = String.detect[ aspect ]( string, aspect, padded );

                    if ( !!output )
                    { break };
                };


                output = ( output || "string" );

                return ((detect === "string") ? affirm.includes(output) : output.slice(0,length));
            },
            {
                undefined ( string, aspect )
                { return ((string === aspect) ? aspect : false) },


                null ( string, aspect )
                { return ((string === aspect) ? aspect : false) },


                nan ( string, aspect )
                { return ((string === aspect) ? aspect : false) },


                boolean ( string, aspect )
                {
                    let stored = String.memory.decide;

                    if ( ([...stored.affirm, ...stored.negate]).includes(string) )
                    { return aspect };
                },


                number ( string, aspect )
                {
                    if ( !(/^([0-9-\.]){1,1600}$/).test(string) )
                    { return };

                    let output = ( string * 1 );

                    if ( !isNaN(output) )
                    { return aspect };
                },


                naming ( string, aspect )
                {
                    if ( (/^([a-zA-Z0-9_]){1,60}$/).test(string) )
                    { return aspect };
                },


                regexp ( string, aspect, padded )
                {
                    if ( padded === "//" )
                    { return aspect };
                },


                target ( string, aspect, padded )
                {
                    if ( (["/",".","$","~"]).includes(string) )
                    { return aspect };

                    if ( !string.includes("/") )
                    { return };


                    if ( string.includes("%") )
                    {
                        try { string = decodeURIComponent(string) }
                        catch ( thrown ){ return };
                    };


                    let pathXP = /^([a-zA-Z0-9-\/\.: _@~$'{}]){1,432}$/;

                    if ( pathXP.test(string) )
                    { return aspect }; // local disk path

                    let parted = string.split("://");

                    if ( parted.length < 2 )
                    { return };

                    if ( !(/^[a-z0-9]{1,9}$/).test(parted[0]) )
                    { return }; // not a protocol

                    parted = parted[1].split( (parted[1].includes("?") ? "?" : "/") );
                    parted[0] = parted[0].split("@").pop();

                    if ( !(/^[-a-z0-9_:]{2,256}$/).test(parted[0]) )
                    { return }; // not a valid hostname

                    if ( !parted[1] )
                    { return aspect }; // valid hostname

                    if ( (/^[-a-zA-Z0-9@:%._\+~#=]{1,256}$/).test(parted[1]) )
                    { return aspect }; // valid URL
                },


                array ( string, aspect, padded )
                {
                    if ( padded === "[]" )
                    { return aspect };
                },


                object ( string, aspect, padded )
                {
                    if ( padded === "{}" )
                    { return aspect };
                },


                script ( string, aspect, padded )
                {
                    if ( padded === "()" )
                    { return aspect };

                    if ( string.startsWith("class ") && string.endsWith("}") )
                    { return aspect };

                    if ( !string.includes("(") )
                    { return }; // not a script

                    let sliver = string.split("(")[0];

                    if ( sliver.startsWith("async func") || sliver.startsWith("bound func"))
                    { sliver = sliver.slice(6) };

                    if ( (/^([a-zA-Z0-9_\.]){6,}$/).test(sliver) && string.endsWith(")") )
                    { return aspect };
                },
            }
        ),



        expect ( object, affirm )
        {
            let output = String.detect( object, affirm );

            if ( !!output )
            { return output }

            moan( "expecting " + affirm );
        },



        parsed ( string, envars={}, method="" )
        {
            if ( (typeof envars) === "string" )
            {
                method = envars;
                envars = {};
            };


            string = Object.parsed( string ).trim(); // forced to string .. now a safer copy
            method = ( method || String.detect(string, 9) );

            if (string.endsWith(";") || string.endsWith(",")){ string = string.slice(0,-1).trim() }; // cleaned up a bit
            if ((string.length < 1) || (string === "undefined")){ return }; // .. `undefined` if as such, or empty

            let indice = Object.indice( envars );
            let values = Object.values( envars );
            // let script = ( method === "script" );

            if ( !String.parser[method] )
            { method = "string" }; // moan( "no parser defined for: " + method ); ?

            return String.parser[ method ]( string, indice, values );
        },



        parser:
        {
            undefined ( string )
            { return },


            null ( string )
            { return null },


            nan ( string )
            { return NaN },


            boolean ( string )
            {
                let stored = String.memory.decide;

                if ( stored.affirm.includes(string) )
                { return true };

                if ( stored.negate.includes(string) )
                { return false };
            },


            number ( string )
            { return (string * 1) },


            string ( string )
            { return string },


            target ( string )
            {
                let sample = ( string + "" );
                let output = new Target();
                let stored = String.memory.inLink;
                let joiner = stored.joiner;
                let indice = stored.indice;
                let parted,  linked,  locale,  aspect, toggle,  cutter,  search,  sliver;


                if ( (["/",".","$","~"]).includes(sample[0]) )
                { sample = String.target(sample) };

                if ( sample.startsWith("/") )
                { sample = ("file://host:0" + sample) }
                else if ( sample.includes(":/") )
                {
                    parted = sample.split(":/");

                    while ( parted[1].startsWith("/") )
                    { parted[1] = parted[1].slice(1) };

                    sliver = parted[1].split("/");

                    if ( !sliver[0].includes(":") )
                    {
                        sliver.unshift("host:0");
                        parted[1] = sliver.join("/");
                        sample = parted.join("://");
                    };
                };




                sliver = undefined;
                parted = sample.split("://");

                if ( parted[1].includes("?") && !parted[1].includes("=") )
                { sample += "=true" };

                parted = parted[1].split("/");
                linked = ( (parted.length > 1) || sample.endsWith("/") ); // boolean


                for ( let number = 0;  number < indice.length;  number++ )
                {
                    aspect = indice[ number ];
                    cutter = joiner[ number ];
                    locale = sample.indexOf( cutter );
                    toggle = false;


                    if
                    (
                        ("user pass").includes(aspect) && ( !parted[0].includes("@") )
                        // (!parted[0].includes("@") || (parted[0].indexOf("@") > parted[0].indexOf("/")))
                    )
                    { continue }; // prevent contamination


                    if ( (aspect === "port") && sample.includes("%") )
                    { sample = decodeURIComponent(sample); };


                    if ( (locale < 0) )
                    {
                        if ( !!sample || (aspect === "path") )
                        {
                            switch ( aspect )
                            {
                                case "host" : if ( !!output.plan  ){ output[aspect] = sample };
                                case "port" : if ( ((sample*1)>0) ){ output[aspect] = sample }; // .. port 0 is reserved
                                case "path" : if ( (linked==true) ){ output[aspect] = ("/"+sample) };
                            };
                        };

                        continue;
                    };


                    if ( aspect !== "vars" )
                    {
                        search = ( locale + cutter.length );
                        sliver = sample.slice( 0, locale );
                        sample = sample.slice( search );

                        output[aspect] = sliver;

                        continue;
                    };


                    output.vars = {};
                    sliver = sample.split("#")[0];


                    sliver.split("&").map(( holder )=>
                    {
                        holder = holder.split("=");
                        output.vars[ holder[0] ] = String.parsed( holder[1] || "true" );
                    });


                    if ( sample.includes("#") )
                    {
                        sliver = sample.split("#").pop();

                        if ( !!sliver )
                        { output.node = sliver };
                    };


                    break; // ignore the rest .. already handled
                };


                output.port *= 1;

                if ( output.plan === "file" )
                { delete output.host;   delete output.port };

                return output;
            },


            array ( string )
            {
                let output;

                if ( (string[0] + string.slice(-1)) !== "[]" )
                { return };

                try { output = JSON.parse(string) }
                catch ( failed ){ output = Function('return '+string) };

                return output;
            },


            object ( string )
            {
                let output = {},  failed,  parted,  aspect,  detail;

                try { output = JSON.parse(string) }
                catch ( thrown ){ failed = thrown };

                if ( !failed )
                { return output };

                string = string.trim();
                string = string.split("=").join(":");
                string = string.split("&").join("\n");
                string = string.split(";").join("\n");
                string = string.split(",").join("\n");

                if ( !string.includes(":") )
                { return {[string]:true} };


                string.split("\n").map(( sample )=>
                {
                    sample = sample.trim();

                    if ( !sample )
                    { return }; // ignore empties

                    if ( !sample.includes(":") )
                    { return output[sample] = true };

                    parted = sample.split(":");
                    aspect = parted[0].trim();

                    try { detail = JSON.parse(parted[1]) }
                    catch ( thrown ){ detail = parted[1] };

                    output[ aspect ] = detail;
                });


                return output;
            },


            script ( string, indice=[], values=[] )
            {
                let padded = ( string.slice(0,1) + string.slice(-1) ); // .. combined the first and last characters
                let tryout = ( "try { return " + string + " } catch ( failed ) { return failed }" );
                let output = Function( ...indice, tryout )( ...values );

                return output;
            },


            params ( string, quoted=["'",'"',"`"] )
            {
                let record = false;
                let output = [];
                let buffer = "";
                let sample;


                while ( string.length > 0 )
                {
                    sample = string[0];
                    string = string.slice(1);


                    if ( quoted.includes(sample) )
                    {
                        record = ((sample === record) ? false : (record || sample)); // toggle record on and off for quotes

                        if ( !record && (buffer !== "") )
                        { output.push(buffer);  buffer = "" }; // append buffer when done

                        continue;
                    };


                    if ( !record && ((sample === " ") || (string === "")) )
                    {
                        if ( sample !== " " )
                        { buffer += sample };

                        if ( buffer !== "" )
                        { output.push(buffer);  buffer = "" }; // append buffer

                        continue;
                    };


                    buffer += sample;
                };


                return output;
            },

        },
    });
// ============================================================================================================================






// notify :: Script : timing
// ----------------------------------------------------------------------------------------------------------------------------
    // console.lapsed( "String" );
// ============================================================================================================================



/*
*/
