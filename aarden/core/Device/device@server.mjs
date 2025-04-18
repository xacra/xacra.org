


// import :: Device : driver
// ----------------------------------------------------------------------------------------------------------------------------
    import "./device.driver.mjs";
// ============================================================================================================================






// retain :: Device : memory
// ----------------------------------------------------------------------------------------------------------------------------
    Device.recent
    ({
        status: "free", // options: free / busy .. used by Device.invoke
    });


    Device.memory
    ({
        attend: {}, // secure stored memory aspect
        detect: { isSymbolicLink:"linked", isFile:"buffer", isDirectory:"folder" }, // the order here may be important
        supply:
        {
            disk:
            {
                cp: { recursive:true },
                rm: { recursive:true },
                mkdir: { recursive:true },
                readFile: { encoding:"utf8" },
            }
        },  // provide options for the disk-source methods listed
    });
// ============================================================================================================================






// extend :: Device : detect .. returns any of the following strings: invalid undefined linked buffer folder socket
// ----------------------------------------------------------------------------------------------------------------------------
    Device.extend
    ({
        detect ( target, affirm=9 )
        {
            target += ""; // toString or fail

            if ( !String.detect(target,"target") )
            { return "absurd" }; // invalid

            let output = "absent"; // undefined
            let detail = { exists:Device.exists(target) };
            let choice = this.memory( "detect" );
            let indice = Object.keys( choice );
            let result;


            if ( detail.exists )
            {
                detail = Device.lstat( target );
                output = "socket";


                for ( let aspect of indice )
                {
                    if ( (typeof detail[aspect]) === "function" )
                    {
                        result = detail[ aspect ]();

                        if ( result === true )
                        { output = choice[aspect];  break };
                    };
                };
            };


            if ( (typeof affirm) === "string" )
            { return affirm.includes(output) };

            return output.slice( 0, affirm );
        }
    });
// ============================================================================================================================






// extend :: Device : expect
// ----------------------------------------------------------------------------------------------------------------------------
    Device.extend
    ({
        expect ( target, affirm="" )
        {
            let detect = Device.detect( target );

            if ( affirm.includes(detect) )
            { return detect };

            moan( `expecting ${affirm}\n - given: ${detect}` );
            return;
        }
    });
// ============================================================================================================================






// extend :: Device : status .. usage e.g: Device.status( "~" ); <- { target:"/home/argon", detect:"folder", ... }
// ----------------------------------------------------------------------------------------------------------------------------
    Device.extend
    ({
        status ( target )
        {
            target = String.target( target );

            let detect = Device.detect( target );

            if ( detect === "absent" )
            { return detect };

            let output = { target, detect, device:"", origin:"", volume:{}, detail:{} };
            let status = Device.lstat( target );


            Object.filter( status, (aspect,detail)=>
            {
                if ( (typeof detail) === "function" )
                { return }; // only copy non-methods

                output.detail[aspect] = detail;
            });


            let result = ( Device.execSync("df") + "" ).split("\n");


            Object.filter( result, (aspect,detail)=>
            {
                let parted = detail.split("   ").join(" ").split("  ").join(" ").split(" ");
                let origin = parted.pop();

                if ( !target.startsWith(origin) || (origin === "/") )
                { return }; // ignored .. does not match, or is in root -which we will deal with later

                let device = parted.shift();  parted.shift(); // ignored 1K-blocks
                let holder = { device, origin, volume:{free:(parted[1] * 1), used:(parted[0] * 1), load:parted[2]} };

                Object.assign( output, holder );

                return FINISH; // break
            });


            return output;
        }
    });
// ============================================================================================================================




// action :: aspect : info
// ----------------------------------------------------------------------------------------------------------------------------
    Device.extend
    ({
        output ( intake, target=null )
        {
            let config = Device.config( "output" );
            let limits = { line:(config.limitLogLine || 999), span:(config.limitLogSpan || 60)}; // .. or  rows and cols
            let joiner = ( config.sectionJoins || "\t" ).repeat( (config.joinerNumber || 2) );
            let timing = ( new Date() ).toISOString().slice(0,-1).split("T").join( " @ " );
                intake = Object.parsed( intake, "string" ).split("\n")[0].split("\r")[0].trim().slice( 0, limits.span );
                target = ( target || config.bufferTarget );
            let buffer = [];

            while ( intake.length < limits.span )
            { intake += " " }; // padded intake to match limits .. for cleaner logs

            if ( Device.exists(target) )
            { buffer = Device.readFile(target).trim().split("\n") };

            let traced = Script.caller("*");
            let called = ( traced[2] || traced[1] || traced[0] ); // most likely called from "Script.output"
            let origin = called.file.split( Script.origin ).join("$");
            let record = [ `[ ${timing} ]`, intake, called.from, origin, called.line ].join( joiner );

            while ( buffer.length >= limits.line )
            { buffer.pop() }; // throw out old records .. keeping most recent within limits

            buffer.unshift( record ); // new records at the top of the file
            Device.writeFile( target, buffer.join("\n").trim() );

            return true; // for siganls and promises
        }
    });
// ============================================================================================================================






// extend :: Device.attend : path .. e.g: Device.attend( "./foo/bar.txt", "listen", (signal)=>{} );
// ----------------------------------------------------------------------------------------------------------------------------
    Device.extend
    ({
        attend ( intake, method, callee, idling=100 )
        {
            let stored = Device.memory( "attend" ); // from secured memory
            let chosen;

            if ( intake instanceof Target )
            { intake += "" }; // convert target-object into target-string


            if ( (typeof method) === "function" )
            {
                callee = method;
                method = "";
            };


            if ( method === "derive" )
            {
                if ( String.detect(callee,"target") )
                {
                    callee = function derive ()
                    {
                        // let source = Device.exhume( this.origin );
                        // let exists = Device.exists( this.origin );  TODO
                    }
                    .bind({ target:intake, origin:callee });
                };

                return Device.attend( target, "listen", callee );
            };


            if ( Object.detect(intake,"string symbol") )
            {intake = {[intake]:callee} };


            Object.filter( intake, (target,invoke)=>
            {
                if ( !String.detect(target,"target") || !Object.detect(invoke,"function") )
                { return moan(`expecting e.g: {"/path/to/target":function(){}}`) };

                chosen = ( method || ((target in stored) ? "ignore" : "listen") );
                target = String.target( target );


                if ( chosen === "ignore" )
                {
                    clearInterval( stored[target].timing );
                    delete stored[ target ];
                    Device.ignore( target, "*" );
                    return;
                };


                if ( chosen === "listen" )
                {
                    stored[ target ] = Object
                    ({
                        target,

                        prober ()
                        {
                            let detail = { exists:Device.exists(this.target) };

                            if ( detail.exists )
                            { detail = Object.assign({exists:true}, Device.lstat(this.target)) };

                            if ( !this.memory )
                            { return this.memory = detail };

                            let memory = this.memory;
                            let differ = ( Object.parsed(detail,"string") !== Object.parsed(memory,"string") );
                            let action = "modify";

                            if ( !differ )
                            { return }; // no changes


                            switch ( true )
                            {
                                case ( !memory.exists && detail.exists ) : action = "create";  break;
                                case ( memory.exists && !detail.exists ) : action = "delete";  break;
                            };


                            delete this.memory; // destroy all internal memory references from this property
                            this.memory = detail; // create it fresh .. from here on, if any change happens, a new signal emits

                            Device.signal( this.target, {action,detail,minder:this} );
                        },
                    });


                    Device.listen( target, invoke );
                    stored[ target ].timing = setInterval( stored[target].prober.bind(stored[target]), idling );

                    return;
                };
            });


            return ( this[MEDIUM] || this );
        },
    });
// ============================================================================================================================






// extend :: Device : induce
// ----------------------------------------------------------------------------------------------------------------------------
    Device.extend
    ({
        induce ( intake, texted=true, config={} )
        {
            let output;  intake += ""; // toString or fail


            if ( Object.detect(texted,"object") )
            {
                texted = ( arguments[2] || texted.texted ); // 3rd
                config = arguments[1];
            };


            config.cwd = ( config.cwd || Script.folder );
            config.encoding = ( config.encoding || "utf8" );
            config.stdio = ["pipe","pipe","pipe"];
            // config.shell = ( config.shell || Script.ownTTY );

            try { output = Device.execSync(intake,config) }
            catch (thrown){ output = thrown.stderr };

            if ( texted && (output instanceof Error) )
            { output += "" };

            return output.trim();
        },
    });
// ============================================================================================================================






// extend :: Device.invoke : run host CLI command .. can only run 1 command at a time (safety first) .. returns a promise
// ----------------------------------------------------------------------------------------------------------------------------
    Device.extend
    ({
        invoke ( intake, config={} )
        {
            intake += ""; // toString or fail

            config.cwd = ( config.cwd || Script.folder );
            config.encoding = ( config.encoding || "utf8" );
            config.shell = ( config.shell || Script.ownTTY );


            return new Promise ( function awaits ( accept, reject )
            {
                if ( !Object.expect(accept,"function") )
                { return }; // invalid intake

                if ( !Object.detect(reject,"function") )
                { reject = function rejected ( failed ){ throw failed } };

                Function.awaits( (function InvokeString (){ return (Device.recent("status") === "free" ) }) )
                .then( ()=>{ this.commit(accept, reject) } );
            }
            .bind
            ({
                config,
                intake: intake.split(" || "),

                commit ( accept, reject )
                {
                    Device.recent({status:"busy"});

                    let script = this.intake.shift();
                    let length = this.intake.length;
                    let params = script.split(" ");
                    let action = params.shift();
                    let config = this.config;
                    let inform = ( !config.silent && Script.ownTTY );

                    if ( !config.silent )
                    { Script.output(`\ninvoke :: script : ${script}\n`) };

                    this.socket = Device.spawn( action, params, config );
                    this.output = [];
                    this.failed = false;

                    this.socket.stdout.setEncoding( config.encoding );
                    this.socket.stderr.setEncoding( config.encoding );

                    this.socket.stdout.on( "data", ( data )=>
                    {
                        this.output.push(data);

                        if ( inform )
                        { process.stdout.write(data) };
                    });


                    this.socket.stderr.on( "data", ( data )=>
                    {
                        this.output.push(data)
                        this.failed = true;

                        if ( inform )
                        { process.stdout.write(data) };
                    });


                    this.socket.stdout.on( "close", ( code )=>
                    {
                        this.output = (this.output.join("")).trim();
                        this.socket.stdin.unpipe();

                        if ( this.socket.exitCode === 0 )
                        { this.failed = false };

                        if ( length < 1 )
                        { Device.recent({status:"free"}) };

                        if ( !this.failed )
                        { return accept(this.output,this) }

                        if ( length < 1 )
                        { return reject(this.output,this) };

                        if ( !config.silent )
                        { Script.output(`invoke :: failed : trying alternative ...`) };

                        setTimeout( ()=>{ this.commit(accept,reject) }, 100 ); // system settle .. relax, status is still busy
                    });


                    if ( "timeout" in config )
                    {
                        this.timing = setTimeout
                        (
                            ()=>
                            {
                                this.socket.stdin.unpipe();
                                this.socket.stdout.end();
                                this.socket.stderr.end();
                                this.socket.unref();
                                this.output = this.output.join("").trim();

                                if ( !this.failed )
                                { return accept(this.output) }

                                return reject(this.output)
                            },

                            config.timeout
                        );
                    };


                    this.socket.stdin.pipe( process.stdin );
                }
            }));
        },
    });
// ============================================================================================================================






// extend :: Device : create
// ----------------------------------------------------------------------------------------------------------------------------
    Device.extend
    ({
        create ( target, design="", change=null, config={} )
        {
            let regExp = ( design instanceof RegExp );
            let linked = ( (design instanceof Target) || regExp );
                target+= ""; // forced toString -or fail
            let folder = target.split("/").slice( 0, -1 ).join("/"); // parent directory of target
                design = ( linked ? (design + "").slice(...(regExp ? [2,-2] : [0])) : design ); // parsed implied link
                design = ( (target.endsWith("/") && (design === "")) ? {} : design );
            let direct = !( Object.detect(change,"object") && String.detect(design,"target") );
            let detect = Device.detect( target );
            let option = ( Object.detect(design,"object") ? "folder" : (linked ? "linked" : (direct ? "buffer" : "")) );
                option = ( option || "design" );
            let output = {},  naming;


            if ( !Device.expect(target,"target as absent-path") || !Object.expect(design,"design as string, or object") )
            { return }; // invalid .. `.expect()` already moaned

            Script.output( `${option}  ${target}` );

            if ( Device.detect(folder,"absent") )
            { Device.mkdir(folder) };


            if ( option === "folder" )
            {
                Device.mkdir( target );

                Object.filter( design, (aspect,detail)=>
                { output[aspect] = Device.create(`${target}/${aspect}`, detail, change) });

                return output; // folder - direct
            };


            if ( option === "linked" )
            {
                option = ( (option === "folder") ? "dir" : ((option === "buffer") ? "file" : null) );
                output = Device.symlinkSync( design, target, option );

                return output; // linked - direct
            };


            if ( option === "buffer" )
            {
                output = Device.writeFile( target, design );

                return output; // buffer - direct
            };


            option = Device.detect( design ); // from template (design format)
            design = Device.select( design, {openSymlinks:false,output:"object"} ); // for files: {output:"object"} is ignored
            detect = Object.detect( design ); // from template (result format)

            if ( !Object.expect(design,`design-target as buffer-string -or folder-object`) )
            { return }; // invalid design template


            if ( detect === "string" )
            { design = String.impose(design, change, config.inside) }; // ammend `design` changes for types: linked and buffer


            if ( option === "linked" )
            {
                option = ( (option === "folder") ? "dir" : ((option === "buffer") ? "file" : null) );
                output = Device.symlinkSync( design, target, option );

                return output; // linked - design
            };


            if ( detect === "string" )
            {
                output = Device.writeFile( target, design );

                return output; // buffer - design
            };


            target = String.shaved( target, "", "/" );
            Device.mkdir( target );


            Object.filter( design, (aspect,detail)=>
            {
                naming = String.impose( aspect, change, config.inside );

                Device.create( `${target}/${naming}`, `${detail.target}`, change, config );
            });
        },
    });
// ----------------------------------------------------------------------------------------------------------------------------
//
// praxis :: Device : create
//
// the following operate inside the $PWD of where aarden was started
// ----------------------------------------------------------------------------------------------------------------------------
//
// Device.create( "./foo.txt" );        // creates `foo.txt` as empty file
// Device.create( "./foo.txt", "" );    // creates `foo.txt` as empty file
// Device.create( "./foo.txt", "abc" ); // creates `foo.txt` as file, containing `abc`
//
// Device.create( "./bar.one/" );       // creates `bar.one` as empty folder .. note trailing slash
// Device.create( "./bar.one", {} );    // creates `bar.one` as empty folder
// Device.create( "./hold", {zii:""} ); // creates `hold` as folder -holding `zii` as empty file
//
// Device.create( "./tee", /[./foo.txt]/ ); // creates `./tee` as symlink to `./foo.txt`
// Device.create( "./tee", new Target("./foo.txt") ); // creates `./tee` as symlink to `./foo.txt`
//
// Device.create( "./yoyo", "./hold", {zii:"yo"} ); // creates `./yoyo` using `./hold` as design-template .. * see below *
// *
// ============================================================================================================================






// extend :: Device : impose
// ----------------------------------------------------------------------------------------------------------------------------
    Device.extend
    ({
        impose ( )
        {
            let intake = [ ...arguments ];

            if ( intake.length < 3 )
            { intake.push({}) }; // added missing object for possible changes

            return Device.create( ...intake );
        }
    });
// ============================================================================================================================






// extend :: Device : supply
// ----------------------------------------------------------------------------------------------------------------------------
    Device.extend
    ({
        supply ( target, design, change={}, config={} )
        {
            if ( Device.exists(target) )
            { return true };

            return Device.create( target, design, change, config );
        }
    });
// ============================================================================================================================






// extend :: Device : remove
// ----------------------------------------------------------------------------------------------------------------------------
    Device.extend
    ({
        remove ( target, select=true )
        {
            if ( !Device.exists(target) )
            { return };

            let output = target;

            if ( select )
            { output = Device.select(target) };

            Device.rm( target );

            return output;
        }
    });
// ============================================================================================================================






// extend :: Device : remake
// ----------------------------------------------------------------------------------------------------------------------------
    Device.extend
    ({
        remake ( target, detail )
        {
            let output = Device.remove( target );

            Device.create( target, detail );

            return output;
        }
    });
// ============================================================================================================================





// extend :: Device : select
// ----------------------------------------------------------------------------------------------------------------------------
    Device.extend
    ({
        select ( target, option="object" )
        {
            target += ""; // toString or fail

            if ( target.endsWith("/") )
            { target = target.slice(0,-1) };

            let detect = Device.detect( target );
            let permit = Device.config( "permit" );
            let runlog = `${detect}  ${target}`;
            let direct;

            if ( !Object.detect(option,"object") )
            { option = (((typeof option) === "function") ? {filter:option} : {output:option}) };

            let change = option.change;


            if ( target.startsWith("/") )
            {
                if ( !permit || (permit.length < 1) )
                {
                    if ( !option.silent )
                    { Script.output(`denied  ${runlog}`)  };

                    return false;
                };
            };


            if ( !option.silent )
            { Script.output(runlog) };


            if ( detect === "buffer" )
            {
                Object.supply( option, Device.memory("supply").disk.readFile );

                let output = Device.readFile( target, option );
                let coding = { action:(!!option.decode ? "decode" : (!!option.encode ? "encode" : "")) };
                let miming;

                coding.detail = option[ coding.action ];
                coding.aspect = ( coding.detail + coding.action.toTitleCase() );

                if ( !!change )
                { output = String.impose(output, change) };


                if ( !!coding.action )
                {
                    if ( (typeof Server) !== "undefined" )
                    { miming = Server.miming(target) };

                    output = Crypto[ coding.aspect ]( output, miming );
                };


                return output;
            };


            if ( detect === "socket" )
            { return Device.createReadStream(String.target(target), option) };


            if ( detect === "linked" )
            {
                permit = ( (permit.openSymlinks === true) || (option.openSymlinks === true) );


                do
                {
                    target = Device.readlink( target ); // follow chained symlinks to their endpoint
                    detect = Device.detect( target );   // until the endpoint is no longer a symlink
                }
                while ( permit && (detect === "linked") );


                if ( !permit )
                {
                    if ( !!change )
                    { target = String.impose(target, change) };

                    return target
                };


                return Device.select( target, option );
            };


            if ( detect !== "folder" )
            { return }; // undefined type .. must not fail


            let output = { deep:{}, flat:{} };
            let joiner = String.memory.joiner;
            let listed = Device.readdir( target );
            let indice,  result,  holder,  linked;


            listed.map( (aspect)=>
            {
                if ( aspect.startsWith(".") && !permit.browseHidden && !option.hidden )
                { return }; // continue .. ignore hidden items .. NB :: all 3 conditions must be true

                direct = `${target}/${aspect}`;
                detect = Device.detect( direct );
                linked = direct;


                while ( (detect === "linked") && (permit.openSymlinks === true) )
                {
                    linked = Device.readlink( linked ); // follow chained links to their endpoint
                    detect = Device.detect( linked );   // until the endpoint is no longer a link
                };


                if ( direct.endsWith("/") )
                { direct = direct.slice(0,-1) };

                if ( linked.endsWith("/") )
                { linked = linked.slice(0,-1) };

                if ( linked === direct )
                { linked = "" }
                else
                { detect === "linked" };


                if ( !!change )
                {
                    aspect = String.impose( aspect, change );
                    direct = String.impose( direct, change );
                    linked = String.impose( linked, change );
                };


                holder = ( (detect === "folder") ? "deep" : "flat" );
                result = { naming:aspect, target:direct, ending:direct.split(".").pop(), detect, linked };

                if ( (typeof option.filter) === "function" )
                { result = option.filter(result) };

                output[ holder ][ aspect ] = result;
            });


            output = Object.concat( Object.sorted(output.deep), Object.sorted(output.flat) ); // NB :: re-assigned!!
            indice = Object.keys( output );

            if ( option.output === "object" )
            { return output };

            result = output;
            output = [];


            Object.filter( result, (aspect,detail)=>
            {
                if ( detail === undefined )
                { return }; // ignore

                output.push( ((!detail || !detail.target) ? detail : detail.target) )
            });


            return output;
        },
    });
// ============================================================================================================================






// extend :: Device : exhume
// ----------------------------------------------------------------------------------------------------------------------------
    Device.extend
    ({
        exhume ( source, option="array", output={}, dejavu=null )
        {
            let ignore = ( output.ignore || [] );
                source+= "";
            let config,  aspect,  deeper;


            if ( !dejavu )
            {
                if ( !Object.detect(option,"object") )
                { option = {output:(option+"")} };

                Object.supply( option, {hidden:true, silent:true, levels:5, output:"array"} );

                if ( !Device.detect(source,"folder") )
                { return moan("expecting folder") };

                Script.output( `folder  ${source}` );

                if ( !Object.detect(output.array,"array") )
                { output.array = [] };

                if ( !Object.detect(output.object,"object") )
                { output.object = {} };
            };


            config = Object.supply( {output:"array"}, option );


            Device.select( source, config ).map(( target )=>
            {
                if ( ignore.includes(target) )
                { return };

                aspect = target.split("/").pop();
                deeper = Device.detect(target,"folder");

                if ( deeper )
                { option.levels -= 1 };


                if ( !deeper || (option.levels < 0) )
                {
                    output.object[ aspect ] = source;
                    output.array.push( target );

                    return; // continue
                };


                Device.exhume( target, option, output, true );
            });


            if ( !dejavu )
            { return output[option.output] };
        }
    });
// ============================================================================================================================






// extend :: Device : target
// ----------------------------------------------------------------------------------------------------------------------------
    Device.extend
    ({
        target ( intake, parent="", header=":/" )
        {
            let output = String.target( intake, parent );

            if ( !String.detect(output,"target") )
            { return }; // absurd

            if ( !output.includes(header) )
            { output = ("file" + (header+"/") + output ) };

            return output;
        }
    });
// ============================================================================================================================






// extend :: Device : induct
// ----------------------------------------------------------------------------------------------------------------------------
    Device.extend
    ({
        induct ( intake, option="object", header=":/" )
        {
            let detect = Object.expect( intake, "string, or object" );
            let parted,  output;

            if ( !detect )
            { return }; // already moaned


            if ( detect === "object" )
            {
                Object.extend( this.induct, intake );

                return ( this[MEDIUM] || this );
            };


            if ( (option === "object") && !!this.induct[intake] )
            { return this.induct[intake] };

            intake = Device.target( intake );
            parted = intake.split( header );

            if ( (parted[1]||"").startsWith("//") )
            { parted[1] = parted[1].slice(1) };

            if ( !String.expect(intake,"target") )
            { return };


            switch ( option )
            {
                case "scheme" : return parted[0];
                case "target" : return parted[1];
                case "parsed" : return String.parsed( intake, "target" );
            };


            return parted; // fallback is array
        }
    });
// ============================================================================================================================






// desine :: Device : driver - file
// ----------------------------------------------------------------------------------------------------------------------------
    Device.induct
    ({
        file: Plexus( /fileDriver/ ).listen
        ({
            access ( signal )
            {
                let aspect = signal.aspect;
                let intake = signal.intake;
                let origin = Device.source[ signal.source ];

                if ( aspect.endsWith("Sync") || !origin[(aspect+"Sync")] || !Object.expect(intake[0],"string, or object") )
                { return origin[aspect](...intake) }; // direct


                if ( (typeof intake.slice(-1)[0]) !== "function" )
                { aspect = (aspect+"Sync") }; // sync :: for missing call-back

                return origin[ aspect ]( ...intake );
            }
        })
    });
// ============================================================================================================================






// listen :: Device : run_disk_function .. supply default options for `disk` methods
// ----------------------------------------------------------------------------------------------------------------------------
    Device.listen
    ({
        run_disk_function ( signal )
        {
            let aspect = signal.aspect;
            let supply = ( this.memory("supply")[signal.source] || {} );
            let intake = signal.intake;
            let option = ( supply[aspect] || {} ); // object
            let detect = Object.detect( intake[0] );
            let driver,  scheme,  detail;


            if ( (detect === "object") && Object.detect(intake[0].target,"string") )
            {
                intake.unshift( intake[0].target );
                option = Object.supply( matter, (option||{}) );
            };


            if ( !intake[0].startsWith("/") )
            { intake[0] = String.target(intake[0]) };

            if ( !option.target )
            { option.target = intake[0] };

            if ( (detect === "string") && (intake.length === 1) )
            { intake.push(option) }; // no options given for single argument .. injected options from related supply

            detail = Device.induct( intake[0], "parsed" );
            scheme = detail.plan; // now we're schemin' :D
            driver = ( scheme ? Device.induct[scheme] : "" );

            if ( !driver || !driver[LINKED] )
            { return moan("absent scheme driver: " + scheme) };

            Object.assign( signal, {intake,option,detail} )

            return driver.herald( ["access",aspect], signal );
        }
    });
// ============================================================================================================================






// listen :: awaitsDriver : info
// ----------------------------------------------------------------------------------------------------------------------------
    Device.listen
    ({
        async awaitsDriver ()
        {
            try
            {
                Device.source
                ({
                    disk: await import( "node:fs" ),
                    proc: await import( "node:process" ),
                    feed: await import( "node:readline" ),
                    path: await import( "node:path" ),
                    http: await import( "node:http" ),
                    host: await import( "node:os" ),
                    bash: await import( "node:child_process" ),
                });
            }
            catch ( thrown )
            { return moan(thrown) }


            Timing.awaits( 30 ).then(()=>
            {
                let device = Script.device;
                let permit = ( Device.select("$/LICENSE",{silent:true}) || "" ).split("\n");
                    permit = ( (permit[2] || "").trim() + " - " + permit[0].trim() );
                let change = { device:process.env };
                let prefix = "$/user/device";
                let suffix = ".scheme.driver.mjs";
                let string = ( prefix + "/config/device.config@server.jsn" );
                let config,  naming,  result,  author,  listed;


                try { config = JSON.parse( Device.select("$/package.json",{silent:true}) ) }
                catch( failed )
                {
                    failed = ( failed + "" ).split( "in JSON at position" );
                    failed = ( failed[0] + " .. " + failed[1].split("(")[1].slice(0,-1) );

                    return moan( "from: $/package.json - " + failed );
                };


                Device.config( Device.select(string, {decode:"json", change, silent:true}) );

                string = ( config.name + " CLI v" + config.version + " - " + permit );
                author = config.author.split(" ").join(" : ").split("<").join("").split(">").join(""); // for copy + paste
                listed = Device.config( "launch" ).schemeDriver.map(( driver )=>{ return (prefix+"/driver/"+driver+suffix) });

                Global.extend( {package:config}, 0 );
                Script.extend( {cliHeader:(`\n${string}\n~ contact :: ${author} ~\n`)}, 0 );


                Script.import( listed ).then
                (
                    ( accept )=>
                    {
                        listed.map(( scheme )=>
                        {
                            scheme = scheme.split("/").pop().split(".")[0];
                            Device.induct[ scheme ].signal( "primed" );
                        });


                        return Global.signal( "loadedDevice" );
                    },


                    ( reject )=>{ moan(reject) }
                );
            });
        }
    });
// ============================================================================================================================






// signal :: awaitsDriver : load drivers
// ----------------------------------------------------------------------------------------------------------------------------
    Device.signal( "awaitsDriver" );
// ============================================================================================================================



/*
*/
