


// readme :: server : info
// ----------------------------------------------------------------------------------------------------------------------------
// ============================================================================================================================






// stored :: Server : socket
// ----------------------------------------------------------------------------------------------------------------------------
    Server.stored
    ({
        socket: class socket
        {
            constructor ( sockID, intake, output, origin )
            {
                this.settle = false;

                Object.assign( this.intake, {bufferInit:false, bufferData:"", nativeLink:null, bufferBusy:false} );
                Object.assign( this.output, {headerInit:false, bufferInit:false} );
                Object.assign( this.stream, {socket:null} );

                let config = Server.config("*");
                let medium = Object.secure( {}, {sockID, header:{}, buffer:[], intake, output} );

                Object.assign( medium, {length:0} );
                Object.assign( this, {authed:false, timing:null} );
                Object.extend( this, {config, origin, medium} );


                this.buffer.vacuum = function vacuum ( number )
                {
                    let buffer = this.medium.buffer;

                    let output = [];
                    let length = buffer.length;
                        number = ( ((typeof number) !== "number") ? length : number );

                    while ( (number > 0) && (buffer.length > 0) )
                    { output.push(buffer.shift()) };

                    return output; // vacuum bag
                }
                .bind(this);


                if ( (["POST","PUT"]).includes(this.method) )
                { this.intake() };

                return this;
            }



            toString ()
            {
                return ( "" + this.origin );
            }



            buffer ( intake, stream="output" )
            {
                if ( this.settle )
                { return false };

                let limits = this.config[ stream ].maxBufrBytes;
                let medium = this.medium;
                let sliver;  intake = ( Array.isArray(intake) ? intake : ((intake === undefined) ? [] : [ intake ]) ); // array


                while ( (intake.length > 0) && (medium.length <= limits) )
                {
                    sliver = intake.shift();

                    if ( (typeof sliver) !== "string" )
                    { sliver = Object.parsed(sliver, "string") };

                    if ( sliver.length < 1 )
                    { continue }; // ignore empty string

                    medium.length += sliver.length;
                    medium.buffer.push( sliver );
                };


                if ( intake.length < 1 )
                { return true }; // all of buffer saved .. no spillage

                while ( medium.buffer.length > 0 )
                { medium.buffer.pop() }; // vacuum incomlete buffer ..  and warn about it

                Script.output( `server :: socket : ${stream} bufferMaxOut at ${limits} bytes .. buffer cleared` );

                return false; // buffer ignored
            }



            cookie ()
            {
                if ( this.settle )
                { return false };

                let i = [ ...arguments ];
                let o = i[0],  v = i[1];


                if ( ((typeof o) === "string") && (v === undefined) )
                {
                    let n = i[0],  r = {};

                    (this.medium.intake.headers.cookie||"").split(';').map((p)=>
                    {
                        p = p.match( /(.*?)=(.*)$/ );
                        r[ (p[1].trim()) ] = ( p[2] || "" ).trim();
                    });

                    return ( (!n || (n === "*")) ? r : r[n] );
                };


                if (((typeof o) === "string") && (v !== undefined))
                { o={name:o, value:v} };

                if (!o.path)
                { o.path="/" };


                let t = ( `${o.name||""}=${o.value||""}` ) + (o.expires!=null ? `; Expires=${o.expires.toUTCString()}` : "" )
                      + ( o.maxAge!=null ? `; Max-Age=${o.maxAge}` : "" ) + (o.domain != null ? `; Domain=${o.domain}` : "" )
                      + ( o.path != null ? `; Path=${o.path}`:"") + (o.secure?'; Secure':"") + (o.httpOnly?'; HttpOnly': "" )
                      + ( o.sameSite!=null?`; SameSite=${o.sameSite}`:"" );


                this.header( "Set-Cookie", t );

                return this;
            }



            header ( status, detail )
            {
                if ( this.settle )
                { return false };

                let detect = ( Object.detect(status,3) + " " + Object.detect(detail,3) );

                if ( status === "*" )
                { return this.medium.intake.headers };


                switch ( detect )
                {
                    case "str und" : return ( this.medium.intake.headers[status] || "" );
                    case "obj und" : detail = status;  break;
                    case "str str" : detail = {[status]:detail};  break;
                };


                if ( !Object.expect(detail,"object as first or 2nd argument") )
                { return };

                if ( this.output.bufferInit )
                { return moan(`server :: socket : buffer output already started`) };

                status = ( detect.startsWith("num") ? status : (Server.htcode(detail.status,true) || this.status) );


                if ( !this.output.headerInit && (this.medium.output.statusCode !== status) )
                {
                    this.status = status;
                    this.medium.output.statusCode = status
                };


                this.output.headerInit = true; // indication that output headers started


                Object.filter( detail, ( aspect )=>
                {
                    let exists = this.medium.header[aspect];
                    let yields = detail[aspect];

                    if ( !!exists )
                    { return Script.output(`server :: socket : header ${aspect}:${yields} exists: ${exists}`) }; // done

                    this.medium.output.setHeader(aspect, detail[aspect]);
                    this.medium.header[ aspect ] = detail[ aspect ]; // for confirming existance of a sent header-name

                    if ( aspect.toLowerCase() === "content-type" )
                    { this.miming = detail[aspect] };
                });


                return this;
            }



            intake ()
            {
                let permit = Server.config( "permit" );
                let medium = this.medium;
                let sockID = medium.sockID;
                let intake = medium.intake;
                let header = intake.headers;
                let target = header[ "Content-Target" ]; // destination path/to/file .. if missing then this is an API payload
                let action = ( "intake" + (target ? "Target" : "String") );
                let starts = true;
                let number = 0;
                let ignore = false;
                let retain,  buffer,  convey;

                if ( !!this.intake.bufferBusy )
                { return this.intake.bufferData }; // may not be mature (yet) ... use e.g: Server.listen("intakeStringFinish")

                this.intake.bufferBusy = true; // NB!! prevent auto-Finish from taking over .. at the end of Server.handle


                if ( !!target )
                {
                    target = String.target( target );
                    this.intake.nativeLink = Device.createWriteStream( target );
                };


                intake.on( "error", (thrown)=>
                {
                    medium.failed = thrown;
                    this.intake.bufferBusy = false;
                    Script.output( `server :: socket : failed at intake .. ` + thrown );
                    this.buffer.vacuum();
                    this.finish( 406 );
                });


                intake.on( "data", (packet)=>
                {
                    number ++;
                    starts = ( number === 1 );
                    packet+= "";
                    convey = { action, target, detail:packet, sockID, expose ()
                    { return Server.recent("socket")[ this.sockID ] }};

                    this.intake.bufferInit = true;

                    if ( starts )
                    {
                        // detail = { detail:action, target, packet, sockID };
                        ignore = Server.signal( (action+"Starts"), convey );
                    };


                    if ( !!ignore )
                    { return }; // handled elsewhere

                    ignore = Server.signal( (action+"Packet"), convey );

                    if ( !!ignore )
                    { return }; // handled elsewhere


                    if ( !!target )
                    {
                        this.intake.nativeLink.write( packet );
                        return; // buffered to target
                    };


                    retain = this.buffer( packet, "intake" ); // retain is boolean .. true if buffered

                    if ( !!retain )
                    { return }; // buffered to memory

                    ignore = Server.signal( (action+"Spills"), convey );
                });


                intake.on( "close", ()=>
                {
                    this.intake.bufferBusy = false;

                    if ( !target )
                    { buffer = this.buffer.vacuum().join("") }
                    else
                    { buffer = target };

                    this.intake.bufferData = buffer; // assign buffer to memory
                    buffer = this.intake.bufferData; // re-assign buffer from memory .. force memory reference, not duplicate

                    convey = {detail:buffer, sockID:medium.sockID, expose ()
                    { return Server.recent("socket")[ this.sockID ] }};

                    if ( !ignore )
                    { buffer = (Server.signal((action+"Finish"), convey) || buffer || "") };

                    if ( !!buffer && (buffer !== convey.detail) )
                    { convey.detail = buffer }; // output from e.g: Server.signal("intakeStringFinish")

                    // this.intake.bufferBusy = false;
                    Server.signal( "intakeFinish", convey );
                });
            }



            stream ( status, target )
            {
                if ( this.settle )
                { return false };

                if ( this.output.bufferInit )
                { return this.header("must","fail") }; // fake header to moan and return the appropriate response

                let intake = [ ...arguments ];
                    status = ( status || this.status );
                    target = ( target || this.target );
                let medium = this.medium;
                let ranged = this.header("Range").split("-");
                let option = { start:((ranged[0] || 0) * 1) };
                let exists;

                let { detect,method,miming } = this;


                if ( !isNaN(ranged[1] * 1) )
                { option.end = ranged[1] * 1 };

                ranged[0] = ((ranged[0] || 0) * 1);


                if ( intake.length === 2 )
                {
                    if ( !Device.detect(target,"buffer socket") )
                    { return moan(`invalid target: "${target}" .. expecting file, or socket`) };

                    this.target = target;
                    this.miming = Server.miming( target );
                };


                exists = Device.exists( target );

                if ( !exists )
                { return moan(`undefined target: ${target}`) };

                exists = Device.lstat( this.target );
                Script.output(`${detect}  ${method}  ${status}  ${miming}  ${target}`)

                this.stream.socket = Device.createReadStream( String.target(target), option );
                this.header( status, {"Content-Type":miming, "Content-Length": exists.size} );

                this.output.bufferInit = true;
                this.stream.socket.pipe( medium.output );


                this.timing = Function.awaits( ()=>{ return (this.settle || medium.output.finished) } ).then(()=>
                {
                    this.finish();
                });



                return true; // handled *
            }



            output ( status, miming, buffer )
            {
                // if ( status === true )
                // { status = this.status }; // TODO :: fix this elsewhere

                let intake = [ ...arguments ];
                    status = ( status || this.status );
                    miming = ( miming || this.miming );
                let medium = this.medium;

                let { detect,method,target } = this;

                if ( this.settle )
                { return false };

                if ( (intake.length < 1) && !this.output.bufferInit && ("buffer socket").includes(this.detect) && !this.impose )
                { return this.stream() }; // output stream .. for implied convienience

                Script.output(`${detect}  ${method}  ${status}  ${miming}  ${target}`)

                if ( intake.length === 3 )
                { this.buffer(buffer) };

                this.header( status, {"Content-Type":miming} );

                this.output.bufferInit = true;

                while ( medium.buffer.length > 0 )
                {
                    let packet = medium.buffer.splice( 0, this.config.output.packetSizing );
                    medium.output.write( packet.join("") );
                    // medium.output.write( packet ); // NB :: TEST !! test this please
                };


                this.output.bufferSize = medium.buffer.length;

                if ( this.output.bufferSize > 0 )
                { this.output.bufferInit = true };

                return true;


                // NB :: below : for buffer-throttle .. but stream-throttle must also work first .. keep this code PLS !!
                //
                // this.timing = Function.repeat( config.packetsDelay, ()=>
                // {
                //     let packet = medium.buffer.splice( 0, this.config.output.packetSizing );
                //
                //     if ( packet.length > 0 )
                //     { medium.output.write(packet);  return }; // NB !! note the return
                //
                //     clearTimeout( this.timing ); // break the loop .. the pipe remains open for more .. use finish to end it
                // });
            }



            finish ( )
            {
                if ( this.settle || this.medium.output.finished )
                { return true }; // handled^ .. ignore duplicate finish .. or settled elsewhere

                let { method, status, miming, target } = this;

                let intake = [ ...arguments ];
                let detect = this.detect;


                if ( !this.output.bufferInit )
                {
                    this.output( ...intake );

                    if ( ("buffer socket").includes(this.detect) && !this.impose )
                    { return true }; // handled ^
                };


                clearInterval( this.timing );
                this.medium.output.end();
                this.settle = true;

                Script.output(`${detect}  ${method}  ${status}  ${miming}  ${target}`)

                return true; // ^ handled: for signals and promises `true` means handled/done/accepted
            }
        }
    });
// ============================================================================================================================



/*
*/
