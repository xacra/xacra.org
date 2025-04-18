


// import :: Script : Object
// ----------------------------------------------------------------------------------------------------------------------------
    import "./script.Object.mjs";
// ============================================================================================================================






// extend :: innate : globals
// ----------------------------------------------------------------------------------------------------------------------------
    void ([ Boolean, Number, String, Array, Function, Crypto ]).filter(( origin )=>
    {
        Object.extend( origin, function extend ()
        {
            return Object.extend( this, ...arguments );
        });
    });
// ============================================================================================================================






// define :: Plexus : custom event handling
// ----------------------------------------------------------------------------------------------------------------------------
    void Object.extend( globalThis, Object.extend
    (
        function Plexus ( )
        {
            let origin = globalThis.Plexus;
            let intake = [ ...arguments ];
            let entity = ( this || intake.shift() || (function plexus (){}) ); // entity must exist

            if ( ("string regexp").includes(entity.constructor.name.toLowerCase()) )
            { entity = Object.create(entity) };

            let entrap = intake.shift();
            let detect = ( typeof entrap );
            let impose = ( (detect !== "boolean") ? intake.shift() : entrap );
            let minder = new ( origin.minder );

            if ( !!entity[MEDIUM] )
            { return entity }; // already a sensor

            if ( !entrap || (detect !== "object") )
            { entrap = {} };

            Object.extend( minder, origin.cloned() );
            minder.source({entity,minder});
            minder.entrap( Object.enable(entrap,origin.entrap,3) );
            Object.extend( minder, MEDIUM, (new Proxy(minder.source.entity, minder.sensor)) );

            if ( [undefined,true].includes(impose) )
            { Object.extend(minder.source.entity, MEDIUM, minder[MEDIUM], 0) };

            let medium = minder[MEDIUM];

            return medium;
        },
        {
            minder: function minder (){}, // to use later e.g: ( foo instanceof Plexus.minder )


            cloned: function cloned ()
            {
                return Object.harden
                ({
                    sensor: {},
                    innate: [ "constructor", "prototype" ],


                    retain: Object.assign
                    (
                        function retain ( memory="config", target="" )
                        {
                            let device = console.device;
                            let aspect = ( this[ENTITY].name || this[ENTITY].constructor.name ).toLowerCase();
                            let sector = "user";

                            target = ( target || `$/${sector}/${aspect}/${memory}/${aspect}.${memory}@${device}.jsn` );
                            memory = Object.parsed( this.retain[memory] );

                            Device.remake( target, memory ); // client -or server-side storage-api

                            return ( this[MEDIUM] || this );
                        },
                        {
                            mutate: {},
                            recent: {},
                            routed: {},
                            stored: {},


                            config:
                            {
                                access:
                                {
                                    signal: "action_aspect action_source_detect action_detect action_source", // TODO !! "action" should be "intent"
                                    symbol: [ "entity", "minder" ], // access symbols from these sources
                                },


                                locate: { source:"minder" },


                                memory:
                                {
                                    secure:
                                    {
                                        stored: true, // secured memory block
                                        routed: true, // secured memory block
                                    }
                                }
                            },
                        }
                    ),


                    symbol:
                    {
                        [ MEDIUM ]( minder ){ return minder[MEDIUM] },
                        [ PLEXUS ]( minder ){ return minder },
                        [ ENTITY ]( minder ){ return minder.source.entity },
                        [ FINITE ]( minder ){ return false },
                        [ LINKED ]( minder ){ return true },


                        [ (Symbol.toStringTag) ] ( minder )
                        {
                            let indice = Object.indice( minder );
                            let ignore = Object.indice( Plexus.cloned() );
                            let aspect;


                            let output = Object
                            ({
                                sensor: Object.keys( minder.sensor ).join(" "),
                                innate: minder.innate,
                                retain: minder.retain,
                                source: { entity:minder.source.entity },
                            });


                            for ( aspect of indice )
                            {
                                if ( !ignore.includes(aspect) )
                                { output[aspect] = minder[aspect] };
                            };


                            indice = Object.indice( minder.source, "*", ["entity","minder"] );
                            aspect = undefined;

                            for ( aspect of indice )
                            { output.source[aspect] = minder.source[aspect] };

                            return "not implemented yet";
                            // TODO
                        },
                    },



                    memory ( intake, detail, holder="recent" )
                    {
                        let detect = ( typeof intake );
                        let method = ( !!this.retain.config.memory.secure[holder] ? "secure" : "assign" );

                        if ( !this.retain[holder] )
                        { Object.extend(this.retain, holder, {}) }; // NB !! undefined memory holder creates a new holder

                        if ( !intake || (intake === "*") )
                        { return this.retain[holder] };

                        if ( ("string symbol").includes(detect) && (detail === undefined) )
                        { return this.retain[holder][intake] };

                        if ( ("string symbol").includes(detect) )
                        { intake = {[intake]:detail} };

                        Object[ method ]( this.retain[holder], intake );

                        return ( this[MEDIUM] || this );
                    },



                    config ( intake, detail )
                    {
                        return this.memory( intake, detail, "config" );
                    },



                    routed ( intake, detail )
                    {
                        return this.memory( intake, detail, "routed" );
                    },



                    recent ( intake, detail )
                    {
                        return this.memory( intake, detail, "recent" );
                    },



                    stored ( intake, detail )
                    {
                        if ( intake !== UPDATE )
                        { return this.memory(intake, detail, "stored") };

                        moan( `TODO :: pls develop this` );
                    },



                    forget ( intake, holder="recent" )
                    {
                        delete this.retain[holder][ intake ];
                        return ( this[MEDIUM] || this );
                    },



                    assign ( )
                    {
                        return ( Object.assign((this[PLEXUS] || this), ...arguments)[MEDIUM] || this )
                    },



                    extend ( )
                    {
                        return ( Object.extend((this[PLEXUS] || this), ...arguments)[MEDIUM] || this )
                    },



                    secure ( )
                    {
                        return ( Object.secure((this[PLEXUS] || this), ...arguments)[MEDIUM] || this )
                    },



                    source ( )
                    {
                        if ( ((typeof arguments[0]) === "string") && (arguments[1] === undefined) )
                        { return this.source[ arguments[0] ] };

                        Object.filter( Object.intake(...arguments), (aspect,detail)=>
                        { this.source[ aspect ] = detail });

                        return ( this[MEDIUM] || this );
                    },



                    locate ( aspect, backup="entity" )
                    {
                        if ( this.innate.includes(aspect) )
                        { return "entity" }; // quick!

                        if ( aspect in this )
                        { return "minder" }; // quick!

                        let routed = this.retain.config.locate[ aspect ];

                        if ( !!routed )
                        { return routed }; // quick!

                        let listed = Object.indice( this.source );
                        let naming,  source,  detect,  indice;


                        for ( naming of listed )
                        {
                            source = this.source[naming];
                            detect = ( typeof source );


                            if ( ("string symbol").includes(detect) )
                            {
                                if ( !!Global[source] )
                                { source = Global[source] }
                                else if ( detect === "string" )
                                { source = Object.target(Global,source) };
                            }; // linkage by global symbol or global target e.g "naming.aspect.option"


                            if ( !("object array function").includes(Object.detect(source)) )
                            { continue };

                            if ( Object.indice(source).includes(aspect) )
                            { return naming }; // ownKeys only .. first pass .. ownKeys for all
                        };


                        for ( naming of listed )
                        {
                            if ( aspect in this.source[naming] )
                            { return naming }; // prototype keys also .. second pass .. only if 1st pass for all failed
                        };


                        return backup; // - which may also be empty string
                    },



                    entrap ( )
                    {
                        let intake = [ ...arguments ],  object;
                        let family = ( typeof intake[0] );
                        let mutate = false,  naming,  memory;

                        let handle = function ()
                        { return this.minder.access( this.action, ...arguments ) };


                        if ( family === "string" )
                        {
                            intake = intake.join(" ").split(" ");
                        }
                        else if ( family === "object" )
                        {
                            object = intake[0];  this.listen( object );  intake = Object.keys( object );
                        };


                        for ( let action of intake )
                        {
                            naming = Object.config( action );

                            if ( naming === "mutate" )
                            { mutate = object[naming] }
                            else
                            { this.sensor[naming] = handle.bind({action, minder:this}) };
                        };


                        if ( !!mutate )
                        {
                            memory = this.retain.mutate;


                            if ( (typeof mutate.scan) !== "function" )
                            {
                                mutate.scan = function scan ()
                                {
                                    let detail = Object.differ( this.source.entity, memory.backup );

                                    if ( !!detail )
                                    {
                                        memory.backup = Object.parsed( this.source.entity, "object" );
                                        this.signal( "mut", {detail} );
                                    };
                                }
                                .bind( this )
                            };


                            memory.backup = Object.parsed( this.source.entity, "object" );
                            memory.idling = setInterval( mutate.scan, (mutate.idle || 50) );
                        };


                        return ( this[MEDIUM] || this );
                    },



                    detrap ( )
                    {
                        let intake = [ ...arguments ].join(" ").split(" "),  action;

                        for ( action of intake )
                        { delete this.sensor[action] };

                        return this[MEDIUM];
                    },



                    access ( )
                    {
                        let intake = [ ...arguments ],  action = intake.shift(),  target = intake.shift(), // TODO !! "action" should be "intent"
                            aspect = ( intake.shift() || (target.name||"").split(" ").pop() );
                        let detect = ( typeof aspect );
                        let origin = this.source;
                        let detail = ( (action !== "get") ? intake.shift() : undefined ),
                            source = this.locate( aspect ),  exists = origin[ source ][ aspect ];
                        let subcon = Object.detect( (action==="set") ? detail.value : ((action==="run")?detail[0]:exists) );
                        let convey = { action, aspect, detect:Object.detect(exists), detail, exists, source };
                        let config = this.config( "access" );
                        let listed = [ action ];
                        let choice = ( config.signal + "" ).trim();
                        let naming,  output;


                        if ( (["",null,undefined]).includes(aspect) )
                        { return }; // invalid


                        if ( action === "run" )
                        {
                            convey.exists = ( exists || target );
                        }
                        else if ( action === "get" )
                        {
                            if ( this.innate.includes(aspect) )
                            { return exists }; // speed boost for innate selection

                            if ( source === "minder" )
                            { return this[aspect] }; // speed boost for medium selection
                        };


                        if ( detect === "symbol" )
                        {
                            if ( !!this.symbol[aspect] )
                            { return this.symbol[aspect](this) };

                            choice = [ ...(config.symbol) ]; // NB !! symbol properties can only reach these


                            for ( naming of choice )
                            {
                                output = origin[ naming ][ aspect ];

                                if ( output !== undefined )
                                { return output };
                            };


                            return origin.entity[ aspect ]; // default
                        };


                        if ( (detect === "string") && !!choice )
                        {
                            for ( let option of (Object.keys(convey)) )
                            {
                                if ( !("detail exists").includes(option) )
                                { choice = choice.split(option).join(convey[option]) };
                            };

                            listed = [ ...(choice.split(" ")), action ];
                        };


                        for ( naming of listed )
                        {
                            try  { output = this.signal(naming, convey) }
                            catch( thrown ){ return moan(thrown) };

                            if ( output !== undefined )
                            { return output };
                        };


                        // return undefined - important!
                    },



                    listen: Object.extend
                    (
                        function listen ( )
                        {
                            let events = this.listen.events;
                            let joiner = [ "_", " ", ":" ];
                            let entity,  forget,  expire,  sample,  parsed,  impart;


                            Object.filter( Object.intake(...arguments), (aspect,invoke)=>
                            {
                                if ( (typeof invoke) !== "function" )
                                { return }; // invalid .. we need a function as signal handler

                                aspect = aspect.toString(); // for symbols too
                                sample = aspect.toLowerCase();
                                forget = ( sample.startsWith("once") || sample.endsWith("once") ); // marked to forget
                                expire = ( joiner.includes(sample[5]) || joiner.includes(sample.slice(-5,1)) ); // if expire
                                parsed = Object.parsed( invoke );


                                if ( forget && expire )
                                {
                                    aspect = aspect.slice(5);
                                    invoke[ MARKED ] = FINITE;
                                };


                                if ( !events[aspect] )
                                { events[aspect] = [] };


                                for ( let exists of events[aspect] )
                                {
                                    if ( parsed === Object.parsed(exists) )
                                    { return }; // continue .. ignore duplicates
                                };


                                events[ aspect ].unshift( invoke ); // insert from the top


                                if ( aspect.startsWith("run_") )
                                {
                                    this.listen( "get_function", Object.extend
                                    (
                                        function handle ( signal )
                                        {
                                            signal.action = "run";

                                            let detect = signal.detect;
                                            let source = signal.source;
                                            let listed = [ ("run_"+signal.aspect), (source+"_"+detect), detect, source ];
                                                listed = listed.join(" run_").split(" ");

                                            if ( !listed.includes(this.aspect) )
                                            { return }; // not for this


                                            return { [(signal.aspect)] ()
                                            {
                                                let convey = Object.concat( this.signal, {intake:[...arguments]} );

                                                return this.minder.herald( this.listed, convey );
                                            }}
                                            [ (signal.aspect) ].bind({aspect:this.aspect,signal,minder:this.minder,listed});
                                        }
                                        .bind({ aspect, minder:this }),
                                        { aspect, invoke } // unique for parsed ignore control
                                    ));


                                    return; // continue
                                };


                                impart = `on${aspect}`;
                                entity = this.source[ this.locate(impart,"") ];

                                if ( !entity )
                                { return }; // continue .. ignored impart .. any source expected to have aspect e.g: `onload`

                                entity[ impart ] = invoke.bind(entity); // bound on internal relay (impart)
                            });


                            return ( this[MEDIUM] || this );
                        },
                        {
                            events:{},
                            recent:{},
                        }
                    ),



                    parley ( action, method )
                    {
                        if ( (typeof action) === "function" )
                        {
                            method = action;
                            action = "*";
                        };


                        if ( !action.startsWith("run_") )
                        { action = ("run_" + action) };

                        return this.listen( action, method );
                    },



                    signal ( action, convey )
                    {
                        let events = this.listen.events;
                            events = [ ...(events["*"]||[]), ...(events[action]||[]) ];
                        let detect = Object.detect( convey );
                        let invoke,  result,  entity,  impart;

                        if ( detect !== "object" )
                        { convey = {detail:((detect === "array") ? convey : [convey])} };

                        // convey = Object.assign( (new (function signal(){})), convey ); // TODO :: test + remove this line

                        for ( invoke of events )
                        {
                            try { result = ( invoke.bind(this) )( convey ) }
                            catch ( failed ){ return moan(failed, "Runtime context follows:", convey, this) }; // NB break

                            if ( invoke[MARKED] === FINITE )
                            { this.ignore( action, invoke ) }; // marked for 1 run only

                            if ( result !== undefined )
                            { return result };
                        };

                        // return undefined; // NB :: unhandled
                    },



                    herald ( intake, convey )
                    {
                        let detect = Object.detect( intake );
                        let output;

                        if ( Object.detect(intake, "string,symbol") )
                        { intake = (this.memory(intake) || [intake]) }; // from stored, or not


                        Object.filter( intake, (aspect,detail)=>
                        {
                            if ( detect === "array" )
                            {
                                aspect = detail;
                                detail = convey;
                            };


                            output = this.signal( aspect, detail );

                            if ( output !== undefined )
                            { return FINISH };
                        });


                        return output;
                    },



                    convey ( intake, action=undefined, plexus=undefined )
                    {
                        let detect = Object.detect( intake );


                        if ( ("string symbol").includes(detect) )
                        {
                            convey = [ intake ];
                            detect = "array";
                        };


                        if ( !("string symbol").includes(typeof action) && (detect !== "object") )
                        { return moan(`non-object given as intake, so action is expected as string, or symbol`) };

                        plexus = ( ((detect === "object") && (action !== undefined)) ? action : (plexus || this) );


                        Object.filter( intake, (aspect,detail)=>
                        {
                            if ( detect === "object" )
                            { action = detail }
                            else
                            { aspect = detail };


                            plexus.listen
                            ({
                                [ aspect ]: function router ( signal )
                                {
                                    this.plexus.signal( this.action, signal )
                                }
                                .bind( {action, plexus} )
                            });
                        });


                        return this[ MEDIUM ];
                    },



                    ignore ( action, detail, limits=1000, forced=false )
                    {
                        if ( (typeof action) === "function" )
                        { detail = action;  action = ( action.name || "*" ) };


                        let family = ( typeof detail );
                            detail = ( (family === "number") ? detail : Object.parsed(detail||"*") );
                        let events = this.listen.events,  recent = this.listen.recent,  number,  exists,  remove;


                        if ( action === "*" )
                        {
                            Object.keys( events ).map(( aspect )=>
                            { void this.ignore( aspect, detail, limits, (forced||(detail==="*")) ) });

                            return this;
                        };


                        switch ( true )
                        {
                            case ( !events[action] ) : return this;
                            case ( (family === "number") && (number < 0) ) : detail += events[action].length;  break;
                            case ( !recent[action] ) : recent[action] = [];  break;
                        };


                        for ( number in events[action] )
                        {
                            exists = Object.parsed( events[action][number] );
                            remove = ( ((family === "number") && (number === detail)) || (exists === detail) );
                            remove = ( remove || ((detail === "*") && ((number > 0) || forced)) );

                            if ( remove )
                            { recent[ action ].push( events[action].splice(number,1)[0] ) };
                        };


                        if ( ((typeof limits) === "number") && (limits > 0) )
                        {
                            while ( (recent[action].length > limits) )
                            { void recent[action].shift() }; // prevents possible memory leak if used wrong
                        };


                        events[ action ] = [ ...events[action] ];

                        return ( this[MEDIUM] || this );
                    },
                });
            },



            entrap:
            {
                get ( signal )
                {
                    if ( signal.exists !== undefined )
                    { return signal.exists };

                    if ( (signal.aspect) in (this.retain.routed) )
                    { return this.retain.routed[signal.aspect] };

                    return this.retain.stored[ signal.aspect ];
                },


                set ( signal )
                {
                    this.source[ signal.source ][ signal.aspect ] = signal.detail;
                    return true;
                },


                has ( signal )
                {
                    return ( (signal.aspect) in (this.source[signal.source]) );
                },


                run ( signal )
                {
                    let naming = signal.exists.name;
                    let invoke = ( naming.includes(" ") ? signal.exists : signal.exists.bind(signal.exists) );
                    let output = invoke( ...signal.detail );

                    if ( output !== undefined )
                    { return output };

                    output = Object.create( naming );

                    Object.enable( output, this );
                    Object.supply( output, {intake:signal.detail} );

                    return output;

                    // output = Object.create( naming, {intake:signal.detail}, 0 );
                    //
                    // return Object.enable( output, this );
                },


                def ( signal )
                {
                    let entity = this.source[ signal.source ];

                    Object.defineProperty( entity, signal.aspect, signal.detail );

                    return entity;
                },
            },
        },
    ));
// ============================================================================================================================






// define :: Global : reference
// ----------------------------------------------------------------------------------------------------------------------------
    void Object.extend( globalThis, "Global", Plexus(function Global (){}) );


    Global.listen
    ({
        get ( signal )
        {
            if ( (signal.aspect === "Global") && !signal.exists )
            { return "" };


            if ( signal.exists !== undefined )
            { return signal.exists };

            return globalThis[ signal.aspect ];
        },



        set ( signal )
        {
            Object.extend( Global, signal.aspect, signal.detail );
            return true;
        },



        def ( signal )
        {
            let entity = this.source[ signal.source ];
            let aspect = signal.aspect;

            Object.defineProperty( entity, aspect, signal.detail ); // in order - 1st
            Object.extend( globalThis, aspect, entity[aspect] );  // in order - 2nd

            // if ( !!entity[aspect][LINKED] && !!entity[aspect].config && !!Global.package && !!Global.package.config[aspect] )
            // { entity[aspect].config(Global.package.config[aspect]) }; // auto-assign relative config from package.json

            return entity;
        },



        run ( signal )
        {
            let intake = signal.detail[0];
            let family = Object.detect( intake, 4 );

            if ( ("stri symb").includes(family) )
            { return Global[intake] };

            if ( family !== "obje" )
            { return moan("expecting intake as string, symbol, or object") };


            Object.filter( intake, (aspect,detail)=>
            {
                Object.extend( Global, aspect, detail );
            });
        },
    });
// ============================================================================================================================






// define :: Pledge
// ----------------------------------------------------------------------------------------------------------------------------
    Global.Pledge = Object.extend
    (
        function Pledge ( callee )
        {
            return new (Pledge[(!this ? "invoke" : "create")])( callee );
        },
        {
            create: class Pledge extends Promise
            {
                constructor ( callee )
                {
                    super( callee );
                }
            },

            invoke: class Pledge
            {
                constructor ( callee )
                {
                    this.then = callee;
                }
            },
        }
    );
// ============================================================================================================================






// define :: Target : global
// ----------------------------------------------------------------------------------------------------------------------------
    Global.Target = class Target
    {
        constructor ( intake )
        {
            if ( !intake )
            { return this };

            if ( (typeof intake) === "string" )
            { intake = String.parsed(intake,"target") };

            return Object.assign( this, intake );
        }


        toString ( select="" )
        {
            let stored = String.memory.inLink;
            let indice = stored.indice;
            let length = indice.length;
            let output = "";  select += ""; // making sure select and output are strings

// if ( this.path.startsWith("adb:") )
// {
//     Dump( "test: ",this.path );
// };

            if ( (!select || (select === "path")) && (!this.plan || !this.host) )
            { return this.path }; // we need this quickly

            if ( !select || (select === "*") )
            { select = indice.join(" ") };


            for ( let number = 0;  number < length;  number++ )
            {
                let aspect = stored.indice[ number ];
                let detail = ( this[aspect] || "" );
                let joiner = ( stored.joiner[number] || "" );
                let follow = indice[ (number + 1) ];

                if ( !detail || !select.includes(aspect) )
                { continue }; // ignore empty -or not in selection

                if ( (aspect === "path") && detail.startsWith("/") && (this.plan !== "file") )
                { detail = detail.slice(1) }; // avoid double-slash

                if ( ((number > 1) && !!follow) && (!this[follow] || !select.includes(follow)) )
                { joiner = "" }; // cleaning up punctuation, plan must succeed ...


                if ( (aspect === "vars") && !!Object.detect(this.vars,"object") )
                {
                    Object.filter( this.vars, (key,val,num)=>
                    { output += (((num<1) ? "" : "&") + (key+"="+val)) });

                    continue;
                };


                detail = ( (number < 7) ? (detail + joiner) : ("#"+detail) );
                output += detail;
            };


            return encodeURI( output );
        }



        static concat ( parent, sprout )
        {
            while ( parent.endsWith("/") )
            { parent = parent.slice(0,-1) };

            while ( sprout.startsWith("/") )
            { sprout = sprout.slice(1) };

            return ( parent + "/" + sprout );
        }
    };
// ============================================================================================================================






// extend :: Array
// ----------------------------------------------------------------------------------------------------------------------------
    Array.extend
    ({
        awaits ( listed )
        {
            throw "TODO :: this has not been implemented .. yet"
        },



        detect ( listed, affirm=6 )
        {
            if ( !Object.detect(listed,"array") )
            { return }; // undefined .. invalid

            let length = listed.length;
            let matter = listed[0];
            let output = Object.detect( matter );
            let memory = { detect:output,  pledge:0 };


            if ( length < 1 )
            { return "empty" };


            Object.filter( listed, (aspect, detail, number)=>
            {
                let detect = Object.detect( detail );

                if ( detect !== memory.detect )
                { output = "mixed";  return FINISH };


                if ( detect === "object" )
                {
                    if ( detail instanceof Promise )
                    { return memory.pledge ++ };


                    if ( ("Object record").includes(detail.constructor.name) )
                    {
                        let indice = Object.keys( detail ).join(" ");

                        if ( number < 1 )
                        { return memory.indice = indice };

                        return output = ( (indice === memory.indice) ? "data" : "mixed" );
                    };
                };
            });


            if ( (output === "array") && (memory.detect === "function") )
            { output = "jobs" };


            if ( (typeof affirm) === "string" )
            { return affirm.includes(output) };

            return output.slice( 0, affirm );
        },



        random ( matter, cloned=true )
        {
            let output = ( cloned ? [...matter] : matter );

            for ( let i = output.length - 1;  i > 0;  i-- )
            {
                const j = Math.floor( Math.random() * (i + 1) );
                [ output[i], output[j] ] = [ output[j], output[i] ];
            };

            return output;
        },
    });
// ============================================================================================================================






// extend :: Function : methods
// ----------------------------------------------------------------------------------------------------------------------------
    Function.extend
    ({
        absorb ( invoke, number=360, option="awaits" )
        {
            if ( !Object.expect(invoke,`1st arg as function`) )
            { return };


            return Plexus( invoke )
            .extend
            ({
                number, option,
                timing: null,
                buffer: { intake:[], output:[] },
            })
            .listen
            ({
                run ( signal )
                {
                    let medium = this[ MEDIUM ];
                    let chosen = medium.option;
                    let buffer = medium.buffer;
                    let intake = signal.detail,  output;
                    let invoke = signal.exists;

                    if ( intake.length < 2 )
                    { intake = intake[0] };


                    if ( buffer.intake.length <= medium.number )
                    {
                        buffer.intake.push( intake );


                        if ( chosen === "output" )
                        {
                            try{ output = invoke(...intake)  }
                            catch( failed ){ output = failed };

                            buffer.output.push( output );
                        };


                        if ( chosen !== "awaits" )
                        { return };
                    };


                    if ( chosen !== "awaits" )
                    {
                        buffer = { intake:[...buffer.intake],  output:[...buffer.output] };

                        this[MEDIUM].buffer.intake = [];
                        this[MEDIUM].buffer.output = [];

                        return this.signal( chosen, buffer );
                    };


                    clearTimeout( this.timing );


                    this.timing = setTimeout(()=>
                    {
                        try{ output = invoke(...buffer.intake)  }
                        catch( failed ){ output = failed };

                        this.signal( "awaits", {intake:[...buffer.intake],  output} );
                    },
                    this.number );
                },
            });
        },



        awaits ( )
        {
            let intake = [ ...arguments ];
            let invoke = intake.pop();
            let idling = ( intake[0] || 0 );
            let params = ( intake[1] || [] );
            let ignore = ( intake[2] || [undefined,null,false] );


            return new Promise( function awaits (accept,reject)
            {
                let output,  timing;


                timing = setInterval(()=>
                {
                    try { output = this.invoke(...(this.params)) }
                    catch ( failed )
                    {
                        clearTimeout( timing );
                        reject( failed );
                    };


                    if ( !this.ignore.includes(output) )
                    {
                        clearTimeout( timing );
                        accept( output );
                    };

                }, idling);
            }
            .bind({ invoke, params, ignore }));
        },



        detect ( intake, affirm=8 )
        {
            let output = "function";

            if ( (typeof intake) !== output )
            { return }; // undefined .. invalid .. must be function

            if ( !intake.prototype )
            { output = (!intake.name ? "callback" : "method") }
            else
            { output = ( intake.toString().startsWith("class") ? "class" : output ) };

            if ( (typeof affirm) === "string" )
            { return affirm.includes(output) };

            return output.slice( 0, affirm );
        },



        evolve ( origin, design )
        {
            let prefix = "Function.evolve expects";

            if ( !origin || !origin.name || !globalThis[origin.name] || !origin.prototype )
            { return moan(`${prefix} the 1st arg (origin) as a named global reference with an existing prototype`) };

            return Object.extend( origin.prototype, design );
        },
    });
// ============================================================================================================================






// global :: SEMI-CRUD : global sensors
// ----------------------------------------------------------------------------------------------------------------------------
    Global.Select = Plexus( function Select (){} );
    Global.Exists = Plexus( function Exists (){} );
    Global.Modify = Plexus( function Modify (){} );
    Global.Insert = Plexus( function Insert (){} );

    Global.Create = Plexus( function Create (){} );
    Global.Remove = Plexus( function Remove (){} );
    Global.Update = Plexus( function Update (){} );
    Global.Detect = Plexus( function Detect (){} );
// ============================================================================================================================






// define :: global : sensors
// ----------------------------------------------------------------------------------------------------------------------------
    Global.Import = Plexus( function Import (){} );
    Global.Filter = Plexus( function Filter (){} );
    Global.Timing = Plexus( function Timing (){} );
// ============================================================================================================================






// define :: Signal : global
// ----------------------------------------------------------------------------------------------------------------------------
    Global.Signal = class Signal extends CustomEvent
    {
        constructor ( action, detail=null, config=null )
        {
            return super( action, Object.supply((config || {}), {name:action, bubbles:false, cancelable:true, detail}) );
        }



        static cancel ( signal, degree=3 )
        {
            if ( !signal || !degree )
            { return };

            let listed = [ "stopImmediatePropagation", "stopPropagation", "preventDefault" ];


            while ( listed.length > 0 )
            {
                let length = listed.length;
                let method = listed.shift();

                if ( degree >= length )
                { signal[ method ]() };
            };


            return signal;
        }
    }
// ============================================================================================================================






// extend :: Array
// ----------------------------------------------------------------------------------------------------------------------------
    Global.Lister = Array;
    Global.Method = Function;
// ============================================================================================================================






// refine :: Detect : configurable shorthand for `Object.detect`
// ----------------------------------------------------------------------------------------------------------------------------
    Detect.listen
    ({
        run ( signal )
        {
            return Object.detect( ...(signal.detail) );
        }
    });
// ============================================================================================================================






// refine :: Timing : run
// ----------------------------------------------------------------------------------------------------------------------------
    Timing.extend
    ({
        awaits ( intake )
        {
            let aspect = Object.detect( intake, 9, false );

            return Global[ aspect ].awaits( ...arguments );
        },
    });
// ============================================================================================================================






// notify :: Script : timing
// ----------------------------------------------------------------------------------------------------------------------------
    // console.lapsed( "Global" );
// ============================================================================================================================



/*
*/
