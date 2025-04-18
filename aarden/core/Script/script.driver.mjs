


// import :: Script : Handle
// ----------------------------------------------------------------------------------------------------------------------------
    import "./script.assets.dir/script.Handle.mjs";
// ============================================================================================================================






// define :: Script : aspect
// ----------------------------------------------------------------------------------------------------------------------------
    Global.Script = Plexus( function Script (){} );
// ============================================================================================================================






// extend :: Script : caller
// ----------------------------------------------------------------------------------------------------------------------------
    Script.extend
    ({
        caller: Object.extend
        (
            function caller ( select=0, thrown=null, before=null )
            {
                let detect = ( typeof select );
                let strace = ( thrown || (new Error(".")) ).stack.split("\n");
                let append = ( before || {stack:""} ).stack.split("\n");
                let output = [];

                strace.shift(); // ignored the first line (message) and this `Script.caller()` call
                append.shift(); // thrown before .. elsewhere ... most likely before a `globalThis.Function()` call

                strace = [ ...strace, ...append ];


                strace.map(( string )=>
                {
                    if ( !string.includes("at ") )
                    { return };

                    string = string.split("at ").pop();

                    output.push( this.caller[console.device](string, {}) );
                });


                if ( detect === "number" )
                {
                    if ( select < 0 )
                    { select = (output.length - 1) };

                    return output[ select ];
                };


                if ( (detect !== "string") || (select === "*") )
                { return output };


                for ( let record of output )
                {
                    if ( record.from.includes(select) || record.file.includes(select) )
                    { return record };
                };
            },
            {
                client ( atLine, record )
                {
                    if ( !atLine.includes(" (") )
                    { atLine = `global (${atLine})` };

                    let joiner = "://";
                    let parted = atLine.split( joiner );
                    let origin = Script.memory( "origin" );
                    let verify,  aspect,  limits,  sample;

                    parted[0] = parted[0].split(" ")[0].split( "<anonymous>" ).join( "<anon>" ); // for cleaner logs
                    parted[1] = ( parted[1] || parted[0] ).split("/").slice(1).join("/");

                    record.from = parted[0];
                    parted = ( parted[1] + "" ).slice( 0, -1 ).split(":");

                    record.file = ( !origin ? parted[0] : parted[0].split(origin).join("$") );
                    record.line = ( parted[1] * 1 );

                    verify = String.locate( record.from, ["Proxy.","Object.","Function."], STARTS );
                    parted = record.from.split(".");
                    aspect = parted.pop();

                    if ( !verify || !aspect )
                    { return record };

                    parted = atLine.split( joiner );
                    parted = [ parted[0].split(".").pop().split(" ")[0], parted[1].split("/").slice(1).join("/") ];
                    joiner = String.locate( parted[1], ["@","."], "string" );

                    record.from = ( parted[1].split(joiner)[0].toTitleCase() + "." + parted[0] ).split("/").pop();
                    record.file = `/${parted[1]}`;


                    // if ( record.file.startsWith("/script.assets.dir/") )
                    // {
                    //     record.from = ( record.file.split("script.assets.dir/").pop().slice(7, 13) + "." + aspect );
                    // };


                    return record;

                    // record.file = ( !origin ? parted[0] : parted[0].split(origin).join("$") );
                    // record.line = ( parted[1] * 1 );
                    //
                    // return record;
                },


                server ( atLine, record )
                {
                    if ( !atLine.includes(" (") )
                    { atLine = `global (${atLine})` };

                    let joiner = ( atLine.includes(" (file://") ? " (file://" : " (node:" );
                    let parted = atLine.split( joiner );
                    let origin = Script.memory( "origin" );
                    let assets = "/script.assets.dir/";
                    let verify,  aspect,  limits,  sample;

                    parted[0] = parted[0].split( "<anonymous>" ).join( "<anon>" ); // for cleaner logs
                    record.from = parted[0];

                    parted = ( parted[1] + "" ).slice( 0, -1 ).split(":");

                    record.file = ( !origin ? parted[0] : parted[0].split(origin).join("$") );
                    record.line = ( parted[1] * 1 );

                    verify = String.locate( record.from, ["Proxy.","Object.","Function."], STARTS );
                    parted = record.from.split(".");
                    aspect = parted.pop();
                    joiner = ( (record.file.startsWith("$/core/") && record.file.includes(assets)) ? assets : "/" );

                    if ( !!verify && !!aspect )
                    { record.from = (record.file.split(joiner).pop().slice(7, 13) + "." + aspect) };

                    return record;
                },
            }
        )
    });
// ============================================================================================================================






// extend :: Script : output
// ----------------------------------------------------------------------------------------------------------------------------
    Script.extend
    ({
        output ( intake, target )
        {
            let config = ( Script.config("output") || {} );

            if ( (console.device === "server") && (config.logVerbosity < 1) )
            { return };

            if ( (config.logVerbosity < 3) && (this.recent("status") === "boot") )
            { return };

            let prefix = "$";
                intake += "";
            let strace = Script.caller("*").slice(2)[0];
            let caller = strace.from.split(".");

            if ( !caller[1] )
            { caller.unshift("global") };

            intake = intake.split( Script.origin ).join( prefix );


            if ( !intake.includes("\n") && !intake.includes("\r") )
            {
                if ( caller[1].includes(" ") )
                {
                    caller[1] = caller[1].split(" ");
                    intake = `${caller[0]}  ${caller[1][0]}  ${caller[1][1]}  ${intake}`;
                }
                else
                { intake = `${caller[0]}  ${caller[1]}  ${intake}` };
            };


            if ( console.ownTTY )
            {
                console.log( intake );
                return true;
            };


            target = ( (target || Script.config("output").bufferTarget) + "" );

            return Device.output( intake, target );
        }
    });
// ============================================================================================================================






// extend :: Script : import
// ----------------------------------------------------------------------------------------------------------------------------
    Script.extend
    ({
        async import ( target, option, holder )
        {
            if ( Object.detect(target,"object") )
            { target = ((target instanceof Target) ? (target+"") : JSON.parse(JSON.stringfify(target))) };


            let detect = Object.detect( target );
            let loaded = ( (holder || {}).loaded || [1,1] );
            let indice,  listed;

            loaded[0] = ( !holder ? 1 : (loaded[1] - holder.listed.length) );


            if ( detect === "string" )
            {
                let assets = [ ...(Script.shared.assets) ];
                let rooted = ( assets.includes(target) ? target : "" );
                    option = ( option || ((target.endsWith(".mjs") || !!rooted) ? "module" : "buffer") );
                let casing = target.toLowerCase();
                let titled = String.toCase( option, "title" );
                let device = Script.device;
                let aspect,  result,  output;

                if ( String.detect(target,"target") )
                { target = String.target(target) };


                if ( rooted )
                {
                    if ( (option === "module") && !!Global[rooted] )
                    {
                        result = Global[ rooted ];
                        output = Script.signal( `finishImport${titled}`, {device,loaded,option,result,rooted,target} );

                        if ( output !== undefined )
                        { return output };

                        if ( !holder || !holder.output )
                        { return result };

                        holder.output[ rooted ] = result;

                        return result;
                    };


                    target = `/${casing}@${device}.mjs`;

                    if ( device === "server" )
                    { target = (`${Script.origin}/core/${rooted}` + target) };
                };


                result = Script.signal( `beforeImport${titled}`, {device,loaded,option,rooted,target} );

                if ( result !== undefined )
                { return result };

                Script.output( `${option}  ${target}` );


                if ( option === "module" )
                {
                    try { result = await import(target) }
                    catch ( failed ){ result = failed };
                }
                else
                {
                    try { result = await Script.select(target) }
                    catch ( failed ){ result = failed };
                };


                void Script.signal( `finishImport${titled}`, {device,loaded,option,result,rooted,target} );


                if ( !holder )
                { return result };

                aspect = holder.naming[ holder.active ];
                holder.output[ aspect ] = result;

                return holder.output[ aspect ];
            };


            if ( detect === "array" )
            {
                listed = target;
                target = {};
                detect = "object";


                Object.invert( listed, (aspect,detail)=>
                {
                    aspect = (detail+"").split("/").pop();

                    if ( aspect.includes(".") )
                    { aspect = aspect.split(".").slice(0,-1).pop() };

                    target[ aspect ] = detail;
                });

            };


            if ( detect !== "object" )
            { return new Error(`invalid intake target type "${detect}"; expecting any: string, array, object`) };


            holder = Object.supply( (holder || {}),
            {
                option,
                listed: Object.values( target ),
                naming: Object.invert( target ),
                output: {},

                awaits ( accept, reject )
                {
                    Object.supply( this, {accept,reject} );

                    if ( this.listed.length < 1 )
                    { return this.accept(this.output) }; // for if empty object/array was given

                    this.active = this.listed.shift();

                    Script.import( this.active, this.option, this ).then(( result )=>
                    {
                        if ( this.finish(result) )
                        { return true };

                        Script.import( this.listed, this.option, this ).then(( output )=>
                        {
                            this.finish( output );
                            return true;
                        })
                    });


                    return true;
                },


                finish ( result )
                {
                    if ( (result instanceof Error) )
                    {
                        return this.reject(result)
                        return true;
                    };


                    if ( this.listed.length < 1 )
                    {
                        this.accept( this.output );
                        return true;
                    };


                    return false; // not done yet
                }
            });


            if ( !holder.active )
            {
                holder.awaits = holder.awaits.bind( holder );
                holder.finish = holder.finish.bind( holder );
                holder.loaded = [ 0, holder.listed.length ];
            };


            return new Promise( holder.awaits ).then(( result )=>
            {
                holder.finish( result );
                return result;
            });
        }
    });
// ============================================================================================================================






// listen :: Script : finishImportModule
// ----------------------------------------------------------------------------------------------------------------------------
    Script.listen
    ({
        finishImportModule ( signal )
        {
            if ( !signal.rooted )
            { return }; // not for this implementation

            let rooted = signal.rooted;
            let aspect = rooted.toLowerCase();
            let update = Script.shared.config[ aspect ][ Script.device ];
            let depend = ( update.launch || {} ).dependencies;
            let finish = "loadedScript";
            let loaded = signal.loaded;
            let device = Script.device;
            let parted,  folder,  naming;

            Global[ rooted ].routed( {assets:`$/core/${rooted}/${aspect}.assets.dir`} );
            Global[ rooted ].config( update );

            if ( device === "server" )
            { delete Script.shared.config[aspect].server };


            if ( !depend )
            {
                if ( loaded[0] === loaded[1] )
                { Global.signal(finish) };

                return true;
            };


            depend = Object.filter( depend, (number,string)=>
            {
                parted = string.split("/");
                folder = parted[0];
                naming = parted[1];
                string = `/${aspect}.${naming}@${device}.mjs`;

                return ( (device === "client") ? string : String.target(`$/user/${aspect}/${folder}/${naming}${string}`) );
            });


            Script.import( depend ).then(()=>
            {
                if ( loaded[0] === loaded[1] )
                { Global.signal(finish) };
            });
        }
    });
// ============================================================================================================================






// extend :: Script : recent
// ----------------------------------------------------------------------------------------------------------------------------
    // Script.recent
    // ({
    //     intake: [],
    // });
// ============================================================================================================================






// listen :: Script : invoke .. parse intake as script
// ----------------------------------------------------------------------------------------------------------------------------
    Script.listen
    ({
        run ( signal )
        {
            let intake = signal.detail[0];
            let output;

            if ( String.detect(intake,"naming") )
            { output = Script.signal(intake) };

            if ( output !== undefined )
            { return output };

            output = String.parsed( intake, "script" );

            // if ( output === undefined )
            // { output = "" };

            return output;
        },
    })
    .listen
    ({
        exit ()
        {
            if ( console.device === "server" )
            { return process.exit() };

            throw "exit";
        }
    });
// ============================================================================================================================






// extend :: Script : aspects
// ----------------------------------------------------------------------------------------------------------------------------
    Script.extend
    ({
        design: {},
        device: console.device,


        shared:
        {
            assets: String.parsed( `${'assets'}` ),
            config: String.parsed( `${'config'}` ),
            hosted: String.parsed( `${'hosted'}` ),
        },





        intake ( )
        {
            let params = [ ...arguments ];
            let detect = Object.detect( params[0] );
            let output = {listed: [...(this.intake.listed || params)]};


            if ( params.length < 1 )
            {
                output.length = this.intake.length;
                return Object.assign( output,this.intake );
            };


            if ( (params.length === 1) && ("string array").includes(detect) )
            { params = ((detect === "string") ? String.parsed(params[0],"params") : params[0]) };


            params.map((string, number)=>
            {
                output[ number ] = string;
                output.length = ( number + 1 );
                output.string = ( (output.string || "") + " " + string ).trim();


                if ( string.startsWith("--") && string.includes("=") )
                {
                    let parted = string.slice(2).split("=");
                    let aspect = parted[0];
                    let detail = String.parsed( parted[1] );
                    let prober = aspect.split(".");

                    prober[0] = String.toCase( prober[0], "title" );

                    if ( !!Global[prober[0]] && ((typeof Global[prober[0]].config) === "function") )
                    { Global[prober[0]].config({[prober[1]]:detail}) };

                    return output[ aspect ] = detail;
                };


                if ( string.startsWith("-") && (string.length === 2) )
                { return output[ string.slice(1) ] = true };
            });


            return output;
        },
    });



    Script.stored
    ({
        folder: ((device)=>
        {
            if ( device === "server" )
            { return process.cwd() };

            return ( "/" + (location.href).split( "://" ).pop().split("/").slice(1).slice(0,-1).join("/") ); // TODO !!
        })
        ( Script.device ),


        origin: Script.caller().file.split( "/core/Script" )[0],
        parent: Script.caller().file.split( "/" ).slice(0,-1).join("/"),
    })
    .recent
    ({
        status:"boot"
    });
// ============================================================================================================================






// import :: device : driver ... server/client script source
// ----------------------------------------------------------------------------------------------------------------------------
    (function forked ( device )
    {
        let target = `./script@${device}.mjs`;
        let naming = target.slice(1); // clean up

        // console.lapsed( "Script" );
        // Script.output( `import  ${naming}` );


        import( target ).then
        (
            function accept ( output )
            { return true },

            function reject ( output )
            { return moan(output) }
        );
    })( Script.device );
// ============================================================================================================================



/*
*/
