


// readme :: scoped : info
// ----------------------------------------------------------------------------------------------------------------------------
// ============================================================================================================================






// import :: Applet : driver
// ----------------------------------------------------------------------------------------------------------------------------
    import "./applet.driver.mjs";
// ============================================================================================================================






// extend :: Applet : methods
// ----------------------------------------------------------------------------------------------------------------------------
    Applet.extend
    ({
        async handle ( string, buffer="", hosted="" )
        {
            string = string.split(".").join("/");

            if ( !Object.detect(buffer,"string") )
            { buffer = Object.parsed(buffer,"string") };

            buffer = Crypto.encode( buffer, "base64" );

            let coding = "base64/json"; // to be decoded in this order
            let target = `${hosted}/Applet/${string}`;
            let output = await Server.handle( "POST", target, {coding, buffer} );

            return Crypto.decode(output,"json");
        },



        async launch ( naming, applet="" )
        {
            if ( naming === undefined )
            {
                Object.filter( (await Applet.handle("launch")), (aspect,detail)=>
                {
                    detail = { id:aspect, class:`${detail.avatar} interact`, title:aspect };

                    $DOM( "#iconDeck" ).append
                    ( $DOM.button(detail)[ENTITY].listen({ click (){ Applet.toggle(this) } }) ); // menu buttons
                });


                Select( "#toglView" ).toggle
                ({
                    "browsing = icon-expand": function ()
                    {
                        dump("init fullscreen ");
                        Client.framed.requestFullscreen();
                    },

                    "viewing = icon-compress": function ()
                    {
                        dump("exit fullscreen ");
                        Screen.window.document.exitFullscreen();
                    },
                })
                .listen
                ({
                    click ()
                    { this.signal("toggle") }, // fullscreen

                    toggle ()
                    { this.toggle() },
                });


                if ( !!Person.recent("authed") )
                {
                    Select( "#iconDeck" ).declan( "secluded" );
                    Select( "#spaceFix" ).declan( "secluded" );
                };


                let target = String.parsed( (Screen.window.location.href+""), "target" );
                let launch = String.toCase( ((target.vars||{}).launch || Client.config("launch").folderApplet), "title" );

                Select( `#${launch}` ).signal( "click" );

                return true; // accept .. `Applet.launch( undefined )`  ... implied to launch the whole deck
            };


            if ( !Object.expect(naming,"string") )
            { return false }; // reject .. invalid


            if ( String.detect(naming,"target") && !!applet )
            {
                if ( !Applet.recent(applet) )
                { await Applet.launch(applet) };

                return Applet[applet].signal( "launch", {target:naming} );
            };


            if ( !!Applet.recent(naming) )
            { return true }; // accept .. already launched

            Applet.recent( {[naming]:true} );
            Script.output( naming );

            ([ "menu", "view", "tool" ]).filter(( holder )=>
            { Select(`#${holder}Deck`).append($DOM.div(`#${holder}Card${naming}.spanFull.flowAuto`)) });

            await Script.import( `/Applet/launch/${naming}`, "module" );

            let minder = ( Applet[naming] || {} )[ PLEXUS ];

            if ( minder instanceof Plexus.minder )
            { return minder.signal("launch") };


            return Applet[naming];
        },



        async toggle ( button )
        {
            let active = Select( "#iconDeck button.focussed" ); // currently active button .. before `button` was clicked


            if ( !!active )
            {
                if ( active.id === button.id )
                { return }; // target is active

                active.declan( "focussed" );
                active = active.id;


                ([ "menu", "view", "tool" ]).filter(( holder )=>
                { Select(`#${holder}Card${active}`).enclan("secluded") });
            };


            Select( "#menuDock" ).enclan( "minified" );
            Select( "#toolWrap" ).enclan( "minified" );

            button.enclan( "focussed" ); // highlight the applet button .. for visual satisfaction

            if ( !Applet.recent( button.id) )
            { await Applet.launch( button.id) };

            button.enclan( "focussed" ); // highlight the applet button .. for applet to respond
            Applet.recent( {active:button.id} );

            return button;
        },
    });
// ============================================================================================================================






// listen :: Applet : modify
// ----------------------------------------------------------------------------------------------------------------------------
    Applet.memory
    ({
        button:
        {
            handle:
            {
                get avatar ()
                { return Select("#"+Applet.recent("active")).className.split(" ")[0] },

                styled: { fontSize:"15px" },

                listen:
                {
                    click ()
                    {
                        let matter = this.matter;
                        let detail = matter.detail;
                        let chosen = ( Applet.recent("active") || detail.applet );

                        if ( !!Applet[chosen] )
                        { return Applet[chosen](detail) };


                        Applet.launch( chosen ).then
                        (
                            ( accept )=>
                            { Applet[chosen](detail) },

                            ( reject )=>
                            { alert(moan(reject)) }
                        );
                    }
                }
            },



            rename:
            {
                avatar: "icon-format-border-style",
                styled: { fontSize:"16px" },


                toggle:
                {
                    "rename = icon-format-border-style": function rename ()
                    {
                        this.matter.detail.status = "busy";
                        this.matter.select( "input" ).aspect( {readonly:null} ).listen
                        ({
                            keydown ( signal )
                            {
                                dump( signal );
                            }
                        })
                        .focus();
                    },


                    "retain = icon-save1": function retain ()
                    {
                        this.matter.detail.status = "free";
                        alert("todo - save to disk");
                    },
                },


                listen:
                {
                    click ()
                    {
                        this.signal( "toggle" );
                        this.toggle();
                    },
                }
            },



            delete:
            {
                avatar: "icon-trash-empty",
                styled: { fontSize:"16px" },


                listen:
                {
                    click ()
                    {
                        dump(this.detail)
                        let answer = confirm( `really delete:\n?` );
                    }
                }
            },
        }
    });
// ============================================================================================================================






// listen :: Device : click
// ----------------------------------------------------------------------------------------------------------------------------
    document.body.listen
    ({
        mouseup ()
        {
            if ( !Select(".dropMenu") )
            { return };


            Timing.awaits(10).then(()=>
            {
                Remove( ".dropMenu" );

                let button = Select("#menuFind button");

                if ( button.toggleStatus.startsWith("cancel") )
                { button.toggle() };

                // if ( button ){};
            })
        }
    });
// ============================================================================================================================






// signal :: Global : appletLoaded
// ----------------------------------------------------------------------------------------------------------------------------
    Timing.awaits(0).then( function appletLoaded ()
    {
        Global.signal( "appletLoaded" );
    });
// ============================================================================================================================



/*
*/
