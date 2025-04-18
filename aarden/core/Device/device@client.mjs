


// readme :: scoped : info
// ----------------------------------------------------------------------------------------------------------------------------
// ============================================================================================================================






// import :: Device : driver
// ----------------------------------------------------------------------------------------------------------------------------
    import "./device.driver.mjs";
// ============================================================================================================================






// listen :: Global : events
// ----------------------------------------------------------------------------------------------------------------------------
    // Global.listen
    // ({
    //     mousemove ( signal )
    //     {
    //         dump( signal );
    //     },
    // });
// ============================================================================================================================






// listen :: Device : awaitsDriver
// ----------------------------------------------------------------------------------------------------------------------------
    Device.listen
    ({
        async awaitsDriver ()
        {
            try
            {
                Device.source
                ({
                    view: document,
                });
            }
            catch ( thrown )
            { return moan(thrown) }


            Object.extend( Screen,
            {
                window: window.top,
                framed: Select( "iframe", window.top.document ),
                canvas: document.body,
            });


            Device.memory
            ({
                intake:
                {
                    cursor: {},
                    keybrd: {},
                    window: {},
                },


                idling: function idling ()
                {
                    let holder = this.convey;
                    let aspect = holder.detect;
                    let memory = Device.memory( "intake" )[ holder.device ];

                    Device.signal( this.action, holder );

                    delete memory[ aspect ]; // free up memory when idling
                    delete holder.detail; // free up memory when idling
                },
            });


            window.addEventListener( "resize", function resize ( signal )
            { return Device.signal("sensor", signal) });


            Timing.awaits(0).then(()=>
            {
                if ( Script.shared.config !== "config" )
                { Device.convey(Script.shared.config.device.client.intake.sensorConvey, "sensor") };

                Global.signal( "loadedDevice" );
            });
        },
    });
// ============================================================================================================================






// listen :: Device : sensor .. refine signals from hardware
// ----------------------------------------------------------------------------------------------------------------------------
    Device.listen
    ({
        sensor ( signal )
        {
            if ( signal.defaultPrevented === true )
            { return }; // handled .. elsewhere

            let device = ( (signal.constructor.name + "").slice(0,-5) || "window" ).toLowerCase();
                device = ( ("mouse pointer").includes(device) ? "cursor" : ((device === "keyboard") ? "keybrd" : device) );
            let detect = signal.type;
            let memory = Device.memory( "intake" )[ device ];
            let invoke = Device.memory( "idling" );
            let action = `${device} ${detect}`;

            if ( !detect )
            { return };

            if ( (detect === "click") && !!memory.chosen )
            { return Signal.cancel(signal) }; // ignored .. mouseup after dragmove

            if ( !(detect in memory) )
            { memory[detect] = signal };

            let before = memory[detect].before;
            let convey = { device, detect, action, detail:signal };

            Device.signal( action, convey );


            if ( !detect.endsWith("down") )
            {
                clearTimeout( memory[detect].finish );
                memory[ detect ].finish = setTimeout( invoke.bind({action:`${action} idling`, convey}), 360 );
            };


            memory[detect].before = signal;
        },



        [ "window resize" ] ( signal )
        {
            let target = Screen.window;
            let detail = { w:target.innerWidth, h:target.innerHeight };
            let tilted = ( (detail.w > detail.h) ? "landscape" : "portrait" );

            detail.o = tilted;
            signal.detail = detail;
        },



        [ "cursor mousedown" ] ( signal )
        {
            Device.memory( "intake" )[ signal.device ].chosen = signal;
        },



        [ "cursor mouseup" ] ( signal )
        {
            let memory = Device.memory( "intake" )[ signal.device ];
            let chosen = memory.chosen;


            if ( !chosen )
            { return };

            Screen.canvas.declan( "unselect" );
            Timing.awaits(0).then(()=>{ delete memory.chosen });

            Screen.canvas.styled( {cursor:"initial"} );
        },



        [ "cursor mousemove" ] ( signal )
        {
            let detail = signal.detail;
            let memory = Device.memory( "intake" )[ signal.device ];
            let chosen = memory.chosen;
                memory = ( memory[signal.detect].before || detail );

            signal.differ = { x:(detail.x - memory.x), y:(detail.y - memory.y) };

            if ( !chosen )
            { return };

            Screen.canvas.enclan( "unselect" );

            let finish = Device.signal( "cursor dragmove", signal );

            if ( (finish !== undefined) )
            { return finish };

            return chosen.detail.target.signal( "dragmove", signal );
        },
    });
// ============================================================================================================================






// signal :: awaitsDriver : load drivers
// ----------------------------------------------------------------------------------------------------------------------------
    Device.signal( "awaitsDriver" );
// ============================================================================================================================



/*
*/
