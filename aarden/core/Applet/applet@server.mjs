


// readme :: scoped : info
// ----------------------------------------------------------------------------------------------------------------------------
// ============================================================================================================================






// import :: Applet : driver
// ----------------------------------------------------------------------------------------------------------------------------
    import "./applet.driver.mjs";

    // Applet.config( Script.import("$/user/applet/config/applet.config@server.jsn") );
// ============================================================================================================================






// retain :: Applet : memory
// ----------------------------------------------------------------------------------------------------------------------------
    Applet.memory
    ({
        origin: "$/apps",
    });
// ============================================================================================================================






// extend :: Applet : signals
// ----------------------------------------------------------------------------------------------------------------------------
    Applet.listen
    ({
        object ( signal )
        {
            let params = [ ...(signal.params) ];
            let matter = params.shift();

            Object.assign( signal, {matter,params} );

            return Applet.object.signal( matter, signal );
        },



        launch ( signal )
        {
            let origin = Applet.memory( "origin" );
            let socket = Object.assign( signal.expose(), {status:200, detect:"invoke"} );
            let output,  naming;


            if ( signal.params.length < 1 )
            {
                output = Object.invert( Device.readdir(origin) ); // no intake argument means: getAll


                Object.filter( output, (aspect)=>
                {
                    naming = aspect.toLowerCase();
                    output[aspect] = Device.select( `${origin}/${aspect}/applet.${naming}.config.jsn`, {decode:"json"} );
                });


                return Object.parsed( output, "string" );
            };


            let aspect = signal.params[0];
                naming = aspect.toLowerCase();
            let server = `${origin}/${aspect}/applet.${naming}@server.mjs`;
            let client = `${origin}/${aspect}/applet.${naming}@client.mjs`;
            let miming = Server.miming( client );

            Object.assign( socket, {miming, detect:"buffer", target:client} );

            Script.import( server );
            socket.finish();

            return true;
        },



        handle ( signal )
        {
            let origin = Applet.memory( "origin" );
            let aspect = signal.detail.shift();
            let action = signal.detail.shift();


            Server.listen
            ({
                ONCE_intakeStringFinish: ( intake )=>
                {
                        intake = intake.detail;
                    let convey = { params:signal.detail, detail:JSON.parse(intake) };
                    let output = Applet[ aspect ].signal( action, Object.assign(signal, convey) );

                    return output;
                }
            });


            return true;
        },
    });
// ============================================================================================================================






// signal :: Global : appletLoaded
// ----------------------------------------------------------------------------------------------------------------------------
    // Timing.awaits(()=>{ return !!Script.shared.config.applet }).then( function awaitsApplet ()
    // {
    //     Applet.signal( "appletAwaits" );
    // });
// ============================================================================================================================



/*
*/
