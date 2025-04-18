


// readme :: Script : server .. requires `./script.driver.mjs` to function
// ----------------------------------------------------------------------------------------------------------------------------
// ============================================================================================================================






// refine :: dump + moan : for server-side
// ----------------------------------------------------------------------------------------------------------------------------
    void Object.secure
    (
        globalThis,
        {
            Dump ()
            {
                let detail = [ ...arguments ];
                let strace = Script.caller( "*", ((detail[0] instanceof Error) ? detail[0] : null) );
                let record = strace[2];
                let titled = `NOTICE :: dump :: ${record.from} : ${record.file} : ${record.line}`;
                let lining = ( "-" ).repeat( titled.length );
                let finish = ( "=" ).repeat( titled.length );
                let header = [ `\n${titled}\n${lining}` ];
                let footer = [ `${finish}\n\n` ];

                console.log( ...header );
                console.log( ...detail );
                console.log( ...footer );
            },


            moan ()
            {
                let detail = [ ...arguments ];
                let output = ( detail[0] instanceof Error );
                let strace = Script.caller( "*", (output ? detail[0] : null) );

                if ( !strace[0] )
                { strace = Script.caller("*") };

                if ( !!output )
                { output = detail[0] };

                let traced = false;
                let called = strace[ (!strace[1] ? 0 : ((strace[1].from === "Expect.detect") ? 3 : 0)) ];
                let titled = `FAILED :: moan :: ${called.from} : ${called.file} : ${called.line}`;
                let lining = ( "-" ).repeat( titled.length );
                let finish = ( "=" ).repeat( titled.length );
                let failed = { starts:'\x1b[31m', finish:'\x1b[0m' };
                let header = [ failed.starts, `\n${titled}`, failed.finish ];
                let footer = [ failed.starts + `${finish}\n\n` + failed.finish ];

                console.log( ...header );


                detail.map(( intake )=>
                {
                    console.log( failed.starts + lining + failed.finish );


                    if ( intake instanceof Error )
                    {
                        strace = Script.caller( "*", intake );
                        intake = ( intake.toString() );
                    };


                    console.log( intake );


                    if ( !traced )
                    {
                        console.log( failed.starts + lining + failed.finish );
                        console.log( strace );
                        traced = true;
                    };
                });


                if ( !traced )
                {
                    console.log( failed.starts + lining + failed.finish );
                    console.log( strace );
                };


                console.log( ...footer );

                return output;
            },
        }
    );
// ============================================================================================================================






// extend :: Script.intake
// ----------------------------------------------------------------------------------------------------------------------------
    Object.extend( Script.intake, Script.intake(...(process.argv.slice(2))) );
// ============================================================================================================================






// extend :: Script : anchor ..
// ----------------------------------------------------------------------------------------------------------------------------
    Script.extend
    ({
        async anchor ( )
        {
            let intake = [ ...arguments ];
            let origin = Script.config( "origin" ).basePathList;
            let exists = [ ...origin ];


            intake.map(( string )=>
            {
                string = String.target( string + "" );

                if ( exists.includes(string) || !Device.expect(string,"folder") )
                { return }; // invalid

                origin.push( string );
            });


            if ( exists.join() !== origin.join() )
            { Script.retain() }; // save changes

            return ( this[MEDIUM] || this );
        }
    });
// ============================================================================================================================






// extend :: script : target
// ----------------------------------------------------------------------------------------------------------------------------
    Script.extend
    ({
        target ( sprout, origin=[] )
        {
            sprout = ( sprout + "" );
            origin = origin.concat( Script.config("origin").basePathList );

            if ( !sprout.endsWith(".mjs") )
            { sprout += ".mjs" };


            for ( let target of origin )
            {
                target = Target.concat( target, sprout );

                if ( Device.exists(target) )
                { return target };
            };
        }
    });
// ============================================================================================================================






// listen :: Script : ownTTY - get aspect value fresh from the source .. usage e.g: `Script.ownTTY` <-- boolean
// ----------------------------------------------------------------------------------------------------------------------------
    Script.listen
    ({
        get_ownTTY ( intake, target )
        {
            return process.stdin.isTTY;
        }
    });
// ----------------------------------------------------------------------------------------------------------------------------






// extend :: Script : exhume ..
// ----------------------------------------------------------------------------------------------------------------------------
    Script.extend
    ({
        exhume ( target, inside=null, buffer="" )
        {
            if ( !Device.expect(target,"buffer") )
            { return }; // expecting file

            inside = ( inside || [`\n    import "`,`";\n`] );

            let folder = target.split("/").slice(0,-1).join("/");
            let starts = `\n\n/* PACKED :: ${target} : starts */\n\n`;
            let finish = `\n\n/* PACKED :: ${target} : finish */\n\n\n\n\n\n`;
            let result,  routed,  linked,  search;

            result = Device.select( target ).split( "/*\n*/" ).join("");
            buffer = ( starts + result + finish + buffer );
            result = ""; // memory upkeep
            routed = String.expose( buffer, inside );


            while ( routed.length > 0 )
            {
                linked = routed.shift();
                buffer = buffer.split( inside[0] + linked + inside[1] ).join( "\n" );
                buffer = Script.exhume( String.target(linked, folder), inside, buffer );
            };


            return buffer;
        }
    });
// ============================================================================================================================






// extend :: Script : select ..
// ----------------------------------------------------------------------------------------------------------------------------
    Script.extend
    ({
        async select ( target )
        {
            let output = Device.select( ...arguments );

            if ( output === undefined )
            { output = new Error(`undefined target: ${target}`) };

            return output;
        }
    });
// ============================================================================================================================






// extend :: Script : switch .. the current (main) process exits and another aarden process is launched
// ----------------------------------------------------------------------------------------------------------------------------
    Script.extend
    ({
        switch ( string, object )
        {
            let naming = Global.package.config.name;

            return Device.invoke( `setsid ${naming} ${string} &`, object )
        }
    });
// ============================================================================================================================






// extend :: Script : supply
// ----------------------------------------------------------------------------------------------------------------------------
    Script.extend
    ({
        async supply ( string, option=true )
        {
            if ( String.detect(string,"target") )
            {
                if ( !Device.exists(string) )
                { return Script.output(`ignored  absent  ${string}`) }; // returns true

                string = Device.readFile( string );
            };


            let hashed = Crypto.encode( string, "sha256" );
            let target = `$/user/script/buffer/${hashed}.mjs`;
            let output;

            Device.writeFile( target, string );
            Script.output( target );
            // Script.recent( "intake" ).push( target );

            try { output = await import(String.target(target)) }
            catch ( thrown ){ failed = thrown };

            if ( (option === true) && Device.exists(target) )
            { Device.unlink(target) };

            if ( !failed )
            { return output };

            throw failed;
        }
    })
// ----------------------------------------------------------------------------------------------------------------------------






// listen :: Script : runCli
// ----------------------------------------------------------------------------------------------------------------------------
    Script.listen
    ({
        runCli ()
        {
            Device.reader = Device.createInterface
            ({
                input: process.stdin,
                output: process.stdout,
            });


            Device.emitKeypressEvents( process.stdin );
            Device.stdin.setRawMode( true );

            Script.listen( "settle", function settle ( signal )
            { console.log("\n") })


            Device.extend
            ({
                prompt ( string, prefix="confirm", suffix=">", choice={accept:["y"],reject:["n"]}, select=["accept",0] )
                {
                    if ( !string && !prefix )
                    {
                        return Device.prompt( "", "[ js ]" ).then
                        (
                            function accept ( output )
                            {
                                console.log( output );
                                Device.prompt( "", "" );
                            },


                            function reject ( output )
                            {
                                console.log( output );
                                Device.prompt( "", "" );
                            },
                        );
                    };


                    if ( ((typeof choice) === "string") && choice.includes("/") )
                    {
                        choice = choice.split("/");
                        choice = { accept:choice[0].split(","), reject:choice[1].split(","), };
                    };


                    if ( !choice || ((typeof choice)!=="object") )
                    { return moan("invalid prompt choice .. 4th arg") };


                    return new Promise( (function awaits ( accept, reject )
                    {
                        let choice, option=" ";


                        if ( !!this.string )
                        {
                            console.log( this.string );

                            choice = JSON.parse( JSON.stringify(this.choice) );
                            option = ( " ("+choice[select[0]][select[1]]+") " );
                            choice[ select[0] ][ select[1] ] = (option[0].toUpperCase() + option.slice(1) );
                            option = [ ...choice.accept, ...choice.reject ].join("/");
                        };


                        Device.reader.question( `${this.prefix}${option}${this.suffix} `, function awaits ( answer )
                        {
                            let result;  answer = answer.trim();


                            if ( !this.string )
                            {
                                result = Script( answer );

                                if ( !(result instanceof Error) )
                                { return this.accept(result) };

                                return this.reject( result );
                            };


                            answer = ( answer || this.choice[this.select[0]][this.select[1]] ).toLowerCase();
                            console.log("\n");

                            if ( this.choice.accept.includes(answer) )
                            { return this.accept(answer) };


                            if ( !this.choice.reject.includes(answer) )
                            {
                                option = ( `options: ` + [...this.choice.accept, ...this.choice.reject].join(", ") );
                                moan( `invalid option: ${answer}`, option );
                            };


                            this.reject( answer );
                        }
                        .bind( Object.assign({accept,reject},this) ));
                    }
                    .bind({ intake:[...arguments], string, prefix, choice, select, suffix })));
                },
            });



            console.log( Script.cliHeader );
            Device.prompt( "", "" );
        }
    });
// ============================================================================================================================






// listen :: Script : runCmd
// ----------------------------------------------------------------------------------------------------------------------------
    Script.listen
    ({
        runCmd ( signal )
        {
            let intake = ( signal.intake || Script.intake() );
            let depend = intake[0];
            let titled = Script.intake[GLOBAL];
            let aspect = intake[1];
            let detect = String.detect( depend );
            let params = [],  output;


            if ( ("target script").includes(detect) )
            {
                if ( (detect === "target") && !depend.endsWith(".mjs") )
                {
                    if ( !Device.detect(depend,"buffer") && !!Device.detect(`${depend}.mjs`,"buffer") )
                    { depend = `${depend}.mjs` }; // convenience
                };

                dump();


                return Script.import( depend ).then
                (
                    ( accept )=>
                    {
                        let indice = Object.indice( accept );
                        let output = ( (indice.length < 1) ? "OK" : ((indice.length === 1) ? accept[indice[0]] : accept) );

                        dump();
                        dump( output );
                    },

                    ( reject )=>{ Script.output(reject) }
                );
            };


            if ( !titled )
            { return Script.output("undefined reference: "+depend) }; // 1st arg is undefined in global scope and $/core

            if ( intake.length < 2 )
            { return Script.output(Global[titled]) }; // selected global reference

            if ( (typeof Global[titled][aspect]) !== "function" )
            { return Script.output(Global[titled][aspect]) }; // selected aspect from global reference


            intake.listed.slice(2).map((detail)=>
            {
                if ( !String.detect(detail,"target") )
                { detail = String.parsed(detail) }

                params.push( detail );
            });


            Script.output( `invoke  ${titled}.${aspect}` );
            output = Global[ titled ][ aspect ]( ...params );

            if ( ([true,undefined]).includes(output) )
            { output = "OK" };

            console.log( output );

            // return true;
        }
    });
// ============================================================================================================================






// listen :: Global : loadedScript
// ----------------------------------------------------------------------------------------------------------------------------
    Global.listen
    ({
        async loadedScript ( signal )
        {
            let intake = Script.intake();
            let matter = intake[0];
            let routed = Global.package.scripts[matter];


            if ( !!routed )
            {
                intake = Script.intake( routed ); // routed by package.json `scripts`

                if ( String.detect(matter,"target") && matter.startsWith("./") )
                { intake[0] = ("$" + matter.slice(1)) };
            }
            else if ( !Global[matter] )
            {
                routed = Script.target( matter );


                if ( !!routed )
                {
                    matter = routed;
                    intake[0] = matter;
                };
            };


            Script.stored( {person:process.env.USER} ).recent( {status:"live"} );


            if ( intake.length < 1 )
            {
                if ( !!process.stdin.isTTY )
                { return Script.signal("runCli") };

                return "OK"; // not running in a TTY, but no args given
            };


            if ( String.detect(matter,"target") || !!Script.intake[GLOBAL] )
            { return Script.signal("runCmd", {intake}) };

            return moan("invalid intake: " + matter)
        }
    });
// ============================================================================================================================






// listen :: Global : loadedDevice
// ----------------------------------------------------------------------------------------------------------------------------
    Global.listen
    ({
        async loadedDevice ()
        {
            let intake = ( Script.intake[0] || "" );
            let depend = intake.split("(")[0].split(".")[0].trim();
            let titled = String.toCase( depend, "title" );
            let device = String.device;
            let assets = Device.readdir( "$/core" );
            let string = `$/user/{naming}/config/{naming}.config@`;
            let option = { silent:true, decode:"json", change:{device:Object.select(process.env)} };
            let target,  naming,  result;

            Script.shared.assets = [];
            Script.shared.config = {};

            Object.secure( Script.intake, GLOBAL, (assets.includes(titled) ? titled : "") );
            // Script.output( `notice :: device : loaded` );


            Object.filter( assets, (number,rooted)=>
            {
                naming = rooted.toLowerCase();
                target = string.split( "{naming}" ).join( naming );

                result = Object
                ( {client:Device.select(`${target}client.jsn`, option), server:Device.select(`${target}server.jsn`, option)} );

                if ( !result.server.launch.retainTarget )
                { result.server.launch.retainTarget = `${target}server.jsn` };

                Script.shared.assets[ result.server.launch.loadingOrder ] = rooted;
                Script.shared.config[ naming ] = result;
            });


            await Script.import( Script.shared.assets );
        },
    });
// ============================================================================================================================






// listen :: Script : settle
// ----------------------------------------------------------------------------------------------------------------------------
    Script.listen
    ({
        settle ( signal )
        {
            let { action, status, notice } = signal;


            if ( !Script.recent("settle") )
            {
                Script.recent( {settle:true} );
                Script.output( `\n\nscript :: settle : ${action}  ${status}\n` );

                if ( (status > 0) && !!notice )
                { moan(notice) };
            };


            process.exit( status ); // forced exit .. some timing/socket may have held process stdio open
        },
    });
// ============================================================================================================================






// listen :: process : exit
// ----------------------------------------------------------------------------------------------------------------------------
    ( "exit SIGINT SIGTERM SIGUSR1 SIGUSR2 uncaughtException" ).split(" ").map(( action )=>
    {
        process.on( action, function settle ( notice )
        {
            let status = ( (action === "uncaughtException") ? 1 : 0 );

            Script.signal( "settle", {action:this.action, status, notice} );
        }
        .bind({ action }));
    });
// ============================================================================================================================






// action :: aspect : info
// ----------------------------------------------------------------------------------------------------------------------------
    import( "../Device/device@server.mjs" ).then
    (
        ( accept )=>{ return true },
        ( reject )=>{ return moan(reject) }
    );
// ============================================================================================================================



/*
*/
