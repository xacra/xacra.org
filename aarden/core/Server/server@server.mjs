


// import :: Server : aspect
// ----------------------------------------------------------------------------------------------------------------------------
    import "./server.driver.mjs";
    import "./server.assets.dir/server.socket.mjs";


    // Server.config( "intake" ).clientSupply.map((supply)=> // permit client access to client supply once off -
    // { Server.config("permit").clientAccess.push(supply) }); // - so we don't need to check both every time
// ============================================================================================================================






// stored :: Server : origin defaults
// ----------------------------------------------------------------------------------------------------------------------------
    Server.stored
    ({
        folder: "$/user/server/exists",

        origin:
        {
            number: 1728, // default port
            domain: "localhost", // default host
            ported:
            {
                22: "ftp",
                80: "http",
                443: "https",
                1728: "http",
            },
        },
    })
// ============================================================================================================================






// recent :: Server : recent defaults
// ----------------------------------------------------------------------------------------------------------------------------
    Server.recent
    ({
        socket: {},
        active: {},
    })
// ============================================================================================================================






// action :: aspect : info
// ----------------------------------------------------------------------------------------------------------------------------
    // Script.listen( "settle", function settle ( signal )
    // {
    //     // Object.filter( Server.recent("socket"), ( sockID, socket )=>
    //     // {
    //     //     // if ( !socket.output.finished )
    //     //     // { socket.finish(503) };
    //     // });
    //
    //     if ( Device.exists(this.link) )
    //     { Device.unlink(this.link) };
    // }
    // .bind( {link:origin.proc} ));
// ============================================================================================================================






// listen :: Server : signal
// ----------------------------------------------------------------------------------------------------------------------------
    Server.listen
    ({
        [ "impose chosen" ] ( signal )
        {
            let socket = signal.expose();
            let target = signal.target;
            let domain = socket.origin.toString( "host port" );
            let chosen = Server.config( "intake" ).specialFiles;
            let shared = Object.concat( Script.shared, {domain} );
            let output = String.impose( Device.select(target,{silent:true}), shared );

            Script.output( target );
            socket.buffer( output );
            socket.output();

            return socket.finish();
        }
    });
// ============================================================================================================================






// listen :: Server : signal
// ----------------------------------------------------------------------------------------------------------------------------
    Server.listen
    ({
        [ "handle finish" ] ( signal )
        {
            let socket = signal.expose();
            let status = signal.status;
            let method = signal.method;
            let detail = signal.detail;

            if ( !!socket.settle || !!socket.stream.socket || !!socket.intake.bufferBusy )
            { return true }; // already handled, or still busy

            if ( (socket.miming === "inode/directory") && !socket.output.bufferSize  )
            { socket.miming = socket.accept }; // override


            if ( (typeof detail) !== "string" )
            {
                if ( ([undefined,true,false,null]).includes(detail) )
                { detail === "" }
                else
                { detail = Object.parsed(detail,"string") }; // clean up .. for output
            };


            if ( detail !== "" )
            {
                socket.status = 200;
                socket.buffer( detail, "output" );
            };


            return socket.finish(); // unhandled ends here  .. here to make sure
        },



        OPTIONS ( signal )
        {
            // TODO
        },

    });
// ============================================================================================================================






// extend :: Server : origin
// ----------------------------------------------------------------------------------------------------------------------------
    Server.extend
    ({
        origin ( intake, create=false )
        {
            let stored = Server.stored( "origin" ); // object .. for security .. retract that doubious brow
            let ported = stored.ported; // object
            let origin = ( intake || stored.number ); // default port-number if missing intake
            let linked = `${Server.folder}/${origin}`;
            let exists,  scheme;


            if ( (typeof origin) === "number" )
            {
                exists = `${stored.domain}:${origin}`;
                linked = `${Server.folder}/${exists}`;

                if ( Server.recent(exists) )
                {
                    origin = Server.recent( exists );
                }
                else if ( Device.exists(linked) )
                {
                    origin = Device.select( `${linked}/server.origin.lnk` );
                }
                else
                {
                    scheme = ( ported[origin] || "http" );
                    origin = `${scheme}://${exists}`;
                    exists = "";
                };
            };


            origin = Object.parsed( origin, "string" );


            if ( String.detect(origin,"target") )
            { origin = String.parsed(origin,"target") };  // target-object

            if ( !(origin instanceof Target) )
            { return }; // invalid intake .. returns undefined

            if ( origin.plan === "file" )
            { origin.host = stored.domain };

            if ( !origin.port )
            { origin.port = stored.number };

            origin.path = ( (!origin.path || (origin.path === "/")) ? Script.folder : origin.path );

            if ( !origin.path.endsWith("/") )
            { origin.path += "/" };

            origin.slug = ( origin.host + ":" + origin.port );
            origin.init = ( origin.path + ".mjs" );
            origin.user = ( origin.user || Script.person );
            origin.pass = ( origin.pass || Crypto.base64Encode(String.random(String.random(6)+"!$*-")) );
            origin.full = ( origin + "" );
            origin.peek = origin.toString( "plan host port" );
            origin.link = `${Server.folder}/${origin.slug}`;
            origin.proc = `${origin.link}/active.pid`; // - which may or may not exist as this is the attended linked proc ID

            if ( create && !Device.exists(origin.link) )
            { Server.create(origin,LINKED) }; // convey LINKED to prevent possible stack-overflow from this.create

            Server.recent( {[origin.slug]:origin.full} );

            return origin; // target-object
        },
    });
// ============================================================================================================================






// extend :: Server : create
// ----------------------------------------------------------------------------------------------------------------------------
    Server.extend
    ({
        create ( origin, system=null )
        {
            if ( system !== LINKED )
            { origin = Server.origin(origin,true) }; // LINKED to prevent possible stack-overflow from Server.origin

            let detail = { name:origin.user, pass:Crypto.base64Decode(origin.pass), mail:`${origin.user}@${origin.host}` };

            Script.output( `target  ${origin.full}` );

            Person.supply( detail );
            Device.supply( origin.path );

            Device.impose( `${origin.link}/server.script.mjs`, `${Server.assets}/server.attend.mjs`, origin );
            Device.create( `${origin.link}/server.origin.lnk`, origin.full );

            return this[ MEDIUM ];
        },
    });
// ============================================================================================================================






// extend :: Server : attend
// ----------------------------------------------------------------------------------------------------------------------------
    Server.extend
    ({
        attend ( intake )
        {
            let origin = Server.origin( intake, true ); // origin-object .. `true` means: create if undefined

            if ( !origin )
            { return moan("invalid intake:",intake) };

            let authed = Person.verify( {name:origin.user, pass:Crypto.base64Decode(origin.pass)} );
            let output = Device.createServer( Server.handle.bind({origin}) );
            let secure = ( origin.toString("plan host port") + `?permit=${authed}` );

            Object.extend( output, {socket:{}} );
            Device.supply( origin.proc, (process.pid+"") ); // exists while this process is running


            // Device.attend( origin.proc, "listen", function attendPath (signal)
            // {
            //     if ( signal.action === "delete" )
            //     {
            //         Script.output( `\nserver :: settle : ${origin.slug}` );
            //         process.exit(0); // exits main process when relative origin.proc (active.pid) file is deleted
            //     };
            // });


            output.listen( origin.port );
            Server.active = output; // only 1 Server per node process NB !! - see above line: Device.attend( origin.proc, ...
            // Server.recent( "active" )[ origin.slug ] = output; //  NB - wrong !!

            Script.output( `\nhosted  public  access  ${origin.peek}` );
            Script.output( `hosted  member  access  ${secure}\n` );

            return true;
        },
    });
// ============================================================================================================================






// extend :: Server : launch
// ----------------------------------------------------------------------------------------------------------------------------
    Server.extend
    ({
        launch ( intake )
        {
            let origin = Server.origin( intake ); // target-object, or undefined

            if ( !origin )
            { return moan("invalid intake:",intake) };

            let linked = origin.link;
            let script = `${linked}/server.script.mjs`;
            let stdout = `${linked}/server.output.log`
            let config,  output;


            Script.switch( `${script} --script.output=${stdout}`, {cwd:origin.path, silent:true, timeout:60} ).then
            (
                ( output, hostID )=> // TODO !! make Device.invoke call accept/reject with hostID
                {
                    let failed = ( output instanceof Error );

                    Script.output( (output || `server :: launch : live .. ${origin.peek}`) )

                    process.exit( (failed ? 1 : 0) );
                },
            );
        },
    });
// ============================================================================================================================






// extend :: Server : switch
// ----------------------------------------------------------------------------------------------------------------------------
    Server.extend
    ({
        switch ( option="", detail="" )
        {
            let origin = Server.origin( detail );
            let linked = origin.proc;
            let active = Device.exists( linked );
            let launch = ( (option === "") ? (active ? false : true) : option );


            if ( launch )
            {
                if ( active )
                { return Script.output(`live  ${origin.slug}`) };

                return Server.launch( origin );
            };


            if ( active )
            { Device.unlink(linked) };

            Script.output( `down  ${origin.slug}` )
        },
    });
// ============================================================================================================================






// extend :: Server : unlink
// ----------------------------------------------------------------------------------------------------------------------------
    Server.extend
    ({
        unlink ( intake, target=false )
        {
            let origin = Server.origin( intake, false ); // target-object, or undefined

            if ( !origin )
            { return moan("invalid intake:",intake) };

            if ( Device.exists(origin.link) )
            { Device.rm(origin.link) };

            if ( (target === true) && Device.exists(origin.path) )
            { Device.rm(origin.path) };

            origin = !Device.exists( origin.link );
            target = ( !target ? true : !Device.exists(origin.path) );

            return ( origin && target );
        },
    });
// ============================================================================================================================






// extend :: Server : relink
// ----------------------------------------------------------------------------------------------------------------------------
    Server.extend
    ({
        relink ( intake, target=false )
        {
            let unmade = this.unlink( intake, target );

            if ( !unmade )
            { return moan("could not unlink") };

            let origin = this.origin( intake, true );

            if ( target )
            { this.create(origin) };

            origin = Device.exists( origin.link );
            target = ( !target ? true : Device.exists(origin.path) );

            return ( origin && target );
        },
    });
// ============================================================================================================================






// extend :: Server : htcode
// ----------------------------------------------------------------------------------------------------------------------------
    Server.extend
    ({
        htcode ( intake, affirm )
        {
            intake += "";

            let memory = Device.STATUS_CODES;
            let invert = !String.detect( intake, "number" );
            let output;

            if ( !intake )
            { return }; // undefined

            if ( !invert )
            { output = memory[intake] }
            else
            { output = Object.invert(memory)[intake] };

            if ( !affirm )
            { return output };

            if ( !output )
            { return false };

            return ( !invert ? (intake * 1) : intake );
        },
    });
// ============================================================================================================================






// extend :: Server : handle
// ----------------------------------------------------------------------------------------------------------------------------
    Server.extend
    ({
        handle: function handle ( intake, output )
        {
            let sockID = String.unique( 36, "socket" );
            let socket = new (Server.socket)( sockID, intake, output, this.origin );
            let config = Server.config("*");
            let chosen = config.intake.specialFiles;
            let permit = config.permit;
            let supply = config.intake.clientSupply;
            let indice = config.intake.autoDirIndex;
            let origin = this.origin;
            let method = intake.method; // uppercase string like "GET", or "PUT", "POST", etc.
            let string = decodeURIComponent( intake.url );
            let access = string.split("?")[0];
                access = ( access.startsWith("/$/") ? access.slice(1) : access ); // NB :: for importing aarden in another way
                access = ( config.routes[access] || access );
                string = ( string.includes("?") ? string.split("?").pop() : "" );
            let joiner = ( string ? "?" : "" );
            let params = access.slice(1).split("/");
            let system = params.shift();
                system = ( (!!Global[system] && !!Global[system][LINKED]) ? system : "" );
            let naming = ( access.split("/").pop() || "" );
            let target = ( access.startsWith("$") ? access : (origin.path + access) ).split("//").join("/");
            let detect = Device.detect( target );
            let status = ( (detect === "absent") ? 404 : (((detect === "folder") && !permit.browseFolder) ? 403 : 200) );
            let accept = ( socket.header("accept").split(",")[0] || "text/plain" ); // mime of what was requested
            let miming = ( Server.miming(target,detect) || accept ); // unknown mime default is what was requested
            let parted = access.split("/").slice(1);
            let option = { ignore:[] };
            let coding = socket.header( "coding" );
            let buffer = socket.header( "buffer" );
            let hosted = {};
            let search,  tunnel,  result,  detail,  herald,  listed,  failed,  aspect,  source,  holder,  impose,  fields;




            if ( permit.exposeHosted )
            {
                holder = Server.folder;


                Device.readdir( holder ).map(( folder )=>
                {
                    if ( !Device.detect(`${holder}/${folder}/active.pid`,"buffer") )
                    { return };

                    if ( `${holder}/${folder}` === this.origin.link )
                    { hosted[folder] = {target:this.origin.full} }
                    else
                    { hosted[folder] = {target:Device.select(`${holder}/${folder}/server.origin.lnk`)} };

                    hosted[ folder ].target = String.parsed( hosted[folder].target, "target" ).toString( "plan host port" );
                });


                Script.shared.hosted = hosted; // live aarden hosts .. inlcluding this one
            };


            if ( intake.url.length > config.intake.maxPathBytes )
            { status = 414 };

            Script.output( `${detect}  ${method}  ${status}  ${miming}  ${access}` );


            if ( !system )
            {
                joiner = ( access.includes("@") ? "@" : "." );
                system = String.toCase( access.slice(1).split(joiner)[0], "title" );
                system = ( (!!Global[system] && !!Global[system][LINKED]) ? system : "" );


                if ( !!system )
                {
                    if ( Device.exists("$/core/" + system + access) )
                    {
                        status = 200;
                        target = ( "$/core/" + system + access );
                        system = "Server"; // security override
                        detect = Device.detect( target );
                    }
                    else
                    {
                        system = ""; // reset if none of the above worked out
                    };
                };
            };


            if ( !!coding && !!buffer )
            {
                coding.split("/").filter(( parser )=>
                {
                    if ( !!Crypto[`${parser}Decode`] )
                    { buffer = Crypto.decode(buffer,parser) }
                });
            };


            if ( (method === "GET") && (detect === "folder") && (status === 200) )
            {
                for ( aspect of indice )
                {
                    if ( Device.exists(target + aspect) )
                    {
                        target = ( target + aspect );
                        detect = Device.detect( target );
                        break; // output may be a symlink
                    };
                };
            };  // note :: NB : target may have changed if this is a folder and method is GET and an index-file exists inside


            if ( !system && ("absent folder").includes(detect) && permit.browseFolder )
            {
                for ( source of supply )
                {
                    if ( source.startsWith("!") )
                    { option.ignore.push(source.slice(1)) };
                }


                for ( source of supply )
                {
                    if ( source.startsWith("!") )
                    { continue };

                    tunnel = Device.exhume( source, "object", option );
                    search = ( (detect === "absent") ? naming : ".htm" );


                    if ( !!tunnel[search] )
                    {
                        target = ( tunnel[search] + "/" + search );
                        detect = Device.detect( target );
                        status = 200;
                        break; // output may be a symlink
                    };
                };
            };  // note :: NB : no `else if` below .. the above may have rendered `detect` as something else


            if ( (method === "GET") && (status === 200) && (detect === "buffer") && chosen.includes(target.split("/").pop()) )
            { impose = "chosen" }; // for signal: "impose chosen"


            if ( detect === "linked" )
            {
                target = Device.select( target ); // follow chained links to their endpoint
                detect = Device.detect( target ); // until the endpoint is no longer a link
            };


            if ( !string )
            { fields = "*" }
            else
            {
                fields = String.parsed( string, "object" );
                fields = ( !!fields ? Object.indice(fields).join(",") : "*" )

                if ( Object.detect(fields,"object") )
                { fields = Object.indice(fields).join(",") };
            };


            if ( (params.length < 1) && (fields !== "*") )
            { params = Object.parsed(string, "object") };


            system = ( system || "Server" );
            miming = ( Server.miming(target,detect) || accept ); // unknown mime default is what was requested
            aspect = ( Array.isArray(params) ? params.shift() : Object.keys(params)[0] );
            herald = { sockID, status, detect, miming, target, access, accept, aspect, method, impose, fields };
            detail = Object.concat( herald, {params, expose (){ return Server.recent("socket")[this.sockID] }} );
            listed = [ aspect, method ]; // NB : for one-word signal action like GET, or detect

            Object.assign( socket, detail );
            detail.buffer = buffer;
            Server.recent( "socket" )[ sockID ] = socket; // set socket in place

            socket = Server.recent( "socket" )[ sockID ]; // re-route (re-assign) internal memory


            Object.filter( herald, (prefix,suffix)=>
            {
                if ( (suffix === undefined) || (suffix === "") )
                { return }; // continue .. ignore signal if value is empty

                listed.unshift( `${method} ${suffix}` );
                listed.unshift( `${prefix} ${suffix}` );
            });


            for ( let action of listed )
            {
                failed = undefined;
                result = undefined; // making sure before we step ahead .. each step .. for in case something went wrong

                if ( !action )
                { continue }; // ignored

                try { result = Global[system].signal(action, detail) }
                catch ( thrown ){ failed = thrown };


                if ( !failed )
                {
                    if ( result === undefined )
                    { continue }; // ignored .. invoke next signal


                    if ( ((typeof result) === "number") && !!Server.htcode(result) )
                    {
                        socket.status = result;
                        socket.miming = socket.accept;

                        return socket.finish();
                    };


                    break; // result as detail for "handle dinish"
                };


                Script.output( `signal  ${action}  failed  ${failed}` );

                try { result = (Server.signal("status 500", Object.assign(detail,failed)) || failed);  break }
                catch ( thrown ){ return socket.finish(500, detail.accept, (result + "\n\n" + thrown + "")) };
            };


            Server.signal( "handle finish", Object.assign(detail,{detail:result}) )


            return true;
        },
    });
// ============================================================================================================================



/*
*/
