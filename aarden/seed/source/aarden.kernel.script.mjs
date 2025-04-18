

/* PACKED :: $/core/Script/script.assets.dir/script.Object.mjs : starts */




// readme :: Object : system starts here
// ----------------------------------------------------------------------------------------------------------------------------
// ============================================================================================================================






// global :: <references> : keep this here as the first define block .. to be refined later, but useful here
// ----------------------------------------------------------------------------------------------------------------------------
    Symbol.global = String
    (
        `SELECT EXISTS MODIFY INSERT CREATE REMOVE UPDATE DETECT ` + // SEMI CRUD
        `MARKED ACTIVE SYSTEM STARTS FINISH GLOBAL MEDIUM FINITE ` +
        `HIDDEN LINKED PLEXUS ENTITY FAILED`
    );
// ----------------------------------------------------------------------------------------------------------------------------
    void Object.assign
    (
        globalThis,
        {
            dump: console.log.bind( console ),
            moan: console.error.bind( console ),
            Dump: console.log.bind( console ),


            Fail: function Fail ( reason )
            {
                if ( !(reason instanceof Error) )
                { reason = new Error(reason) };

                throw reason; // uncaught Error
            },


            FINITE: Symbol( "FINITE" ),
            FINISH: Symbol( "FINISH" ),
        }
    );
// ============================================================================================================================






// action :: aspect : info
// ----------------------------------------------------------------------------------------------------------------------------
    Object.detect = Object.assign
    (
        function detect ( object, affirm=9, option=true )
        {
            let family = ( typeof affirm );
            let output = ( (object === null) ? "null" : (Array.isArray(object) ? "array" : (typeof object)) );

            if ( !option )
            { output = (output[0].toUpperCase() + output.slice(1) ) }; // e.g: Array


            switch ( family )
            {
                case "string" : return affirm.includes( output );
                case "number" : return output.slice( 0, affirm );
                case "symbol" : return Object.detect[ affirm ]( object, output.toLowerCase().slice(0,4) );
            };


            return ""; // expected output type .. undefined for invalid intake
        },
        {
            [ FINITE ]: function detectFinite ( object, detect, holder )
            {
                let deeper = "obje func arra";
                let finite = ( object || "" )[ FINITE ];
                let detail,  output;

                if ( !detect )
                { detect = Object.detect(object,4) };

                if ( !deeper.includes(detect) )
                { return true }; // finite .. not circular

                if ( (finite === false) || (finite === FINITE) || !!object[LINKED] )
                { return false }; // infinite .. circular .. this here prevents stack-overflow on Plexus or derivatives

                if ( !holder )
                { holder = object };


                for ( let aspect of (Reflect.ownKeys(object)) )
                {
                    detail = object[ aspect ];

                    if ( (detail === object) || (detail === holder) )
                    { return false }; // not finite, but circular (infinite)

                    output = Object.detect[ FINITE ]( detail, "", holder );

                    if ( output === false )
                    { return output };
                };


                return true; // finite .. not circular
            },
        }
    );
// ============================================================================================================================






// extend :: Object : indice
// ----------------------------------------------------------------------------------------------------------------------------
    Object.indice = function indice ( object, select, hidden=true, ignore=[] )
    {
        let detect = Object.detect( object, 4 );

        if ( !("obje arra func").includes(detect) )
        { return [] }; // expected output


        if ( (typeof select) === "boolean" )
        {
            hidden = select;
            select = undefined;
        };


        if ( !Array.isArray(ignore) )
        { ignore = [] };


        if ( ignore.length < 1 )
        {
            // ignore.push( null );
            if ( ({}).toString.call(object).includes("Module") )
            { ignore.push(Symbol.toStringTag) };
        }; // key-names can't be these, if ignore is not given


        let indice = ( hidden ? Reflect.ownKeys(object) : Object.keys(object) );
        let output = [];


        if ( ignore.length < 1 )
        {
            switch ( detect )
            {
                case "func" : ignore = Reflect.ownKeys( function(){} );  break;
                case "arra" : ignore = Reflect.ownKeys( [] );  break;
            }
        };


        indice.map(( aspect )=>
        {
            if ( ignore.indexOf(aspect) < 0 )
            { output.push(aspect) };
        });


        if ( ((typeof select) !== "number") || isNaN(select) || !output.length )
        { return output };

        if ( select < 1 )
        { select += output.length };

        return output[ select ];
    };
// ============================================================================================================================






// extend :: Object : permit .. propertyDescriptor
// ----------------------------------------------------------------------------------------------------------------------------
    Object.permit = function permit ( ruling=0, detail=undefined )
    {
        let output = { enumerable:false, writable:false, configurable:false }; // new object, not from template
        let family = ( typeof ruling );

        if ( !("number string").includes(family) )
        { return output };


        void Object.keys( output ).map(( aspect, number )=>
        {
            number += 1;


            if ( family === "number")
            {
                if ( number <= ruling )
                { output[aspect] = true };

                return;
            };


            let parted = ruling.split( (ruling.includes(" ") ? " " : "") );


            for ( let option of parted )
            {
                if ( aspect.startsWith(option) )
                { output[aspect] = true;  break; };
            };
        });


        if ( detail !== null )
        { Object.assign(output, {value:detail}) };


        return output;
    };
// ============================================================================================================================






// extend :: Object : remove
// ----------------------------------------------------------------------------------------------------------------------------
    Object.remove = function remove ( object, aspect )
    {
        let output = object[ aspect ];

        delete object[ aspect ];

        return output;
    };
// ============================================================================================================================






// extend :: Object : remove
// ----------------------------------------------------------------------------------------------------------------------------
    Object.filter = function filter ( object, hidden=true, callee )
    {
        if ( (typeof hidden) === "function" )
        {
            callee = hidden;
            hidden = true;
        };


        let listed = Array.isArray( object );
        let indice = Object.indice( object, hidden );
        let output = [],  number,  aspect,  detail,  result;


        for ( number in indice )
        {
            number *= 1; // may be a string if filtering object
            aspect = indice[ number ];
            detail = Object.remove( {[aspect]:object[aspect]}, aspect );
            aspect = ( (listed && !isNaN(aspect)) ? (aspect * 1) : aspect );
            result = callee( aspect, detail, number );

            if ( result === undefined )
            { continue };

            if ( result === globalThis["FINISH"] )
            { return output }; // symbol FINISH may not exist yet

            output.push( result );
        };


        return output;
    };
// ============================================================================================================================





// extend :: Object : modify .. Object.defineProperty short-hand
// ----------------------------------------------------------------------------------------------------------------------------
    Object.modify = function modify ( object, aspect, detail=undefined, permit="ce", levels=0 )
    {
        if ( aspect === undefined )
        { aspect = object };

        let family = ( (aspect === null) ? "null" : (typeof aspect) );
        let listed = Array.isArray( aspect );


        if ( ("object function").includes(family) )
        {
            if ( detail === undefined )
            { detail = aspect;  aspect = undefined }
            else
            { levels = permit;  permit = detail;  detail = aspect;  aspect = undefined }; // shifted args


            if ( family === "function" )
            { aspect = (detail.name || "<anon>").split(" ").pop();  family = "string" };
        };


        let config = Object.permit( permit );


        if ( ("string,symbol").includes(family) )
        {
            if ( detail === undefined )
            { detail = Object.remove({[aspect]:object[aspect]}, aspect) }; // detached aspect-value from copy of object

            try { Object.defineProperty(object, aspect, Object.assign(config,{value:detail})) }
            catch ( failed ){ return moan(failed) };

            let detect = ( (detail === null) ? "null" : (typeof detail) );

            if ( ("object function").includes(detect) && (levels > 0) )
            { Object.modify(object[aspect], object[aspect], undefined, permit, (levels - 1)) };

            return object;
        };


        if ( family !== "object" )
        { return moan("expecting arguments in this order: [obj/fun, str/fun/obj, und/any, und/str/num, und/num]") };


        Object.filter( detail, (naming, exists)=>
        {
            if ( listed )
            {
                naming = exists;
                exists = Object.remove( {[naming]:object[naming]}, naming );
            };


            if ( ((typeof naming) === "string") && ("constructor prototype").includes(naming) )
            { return }; // continue

            Object.modify( object, naming, exists, permit, (levels - 1) )
        });


        return object;
    };
// ----------------------------------------------------------------------------------------------------------------------------
    Object.modify( Object, ("detect indice remove permit filter modify").split(" ") ); // hardened
// ============================================================================================================================






// extend :: Object : harden/extend .. syntax sugar for Object.modify
// ----------------------------------------------------------------------------------------------------------------------------
    Object.modify
    (
        Object,
        {
            extend ()
            {
                return Object.modify( ...arguments );
            },


            harden ()
            {
                let intake = [ ...arguments ];

                while ( intake.length < 3 )
                { intake.push(undefined) };

                if ( intake.length < 4 )
                { intake.push("ce") };

                if ( intake.length < 5 )
                { intake.push(99) };

                return Object.modify( ...intake );
            }
        }
    );
// ============================================================================================================================





// define :: "Null, Undefined" : parents for orphans
// ----------------------------------------------------------------------------------------------------------------------------
    void Object.extend( globalThis, { Null: class Null extends null {},  Undefined: class Undefined extends null {} } );
// ============================================================================================================================






// action :: aspect : info
// ----------------------------------------------------------------------------------------------------------------------------
    Object.extend( console, {device: (!((typeof Window) + (typeof Screen)).split("function").join("") ? "client" : "server")});


    Object.extend
    (
        console,
        {
            ownTTY: (()=>
            {
                if ( console.device === "client" )
                { return true };

                if ( process.stdin.isTTY )
                { return true };

                return false;
            })(),


            lapsed: function lapsed ( plexus="", prefix="global  timing  lapsed" )
            {
                let latest = performance.now();
                let recent = this.recent;
                let differ = ((latest - recent).toFixed(3) * 1 );

                this.recent = latest;

                if ( !console.ownTTY || !plexus )
                { return {latest, recent, differ} }; // convenience

                console.log( `${prefix}  ${plexus}  ${differ} ms` );
            }
            .bind
            ({
                recent: 0
            })
        }
    );
// ============================================================================================================================






// extend :: Symbol : create
// ----------------------------------------------------------------------------------------------------------------------------
    Object.extend( Symbol, function create ( string, option="return" )
    {
        let output = {};
        let symbol;


        string.trim().split(" ").map(( sample )=>
        {
            symbol = ( globalThis[sample] || Symbol(sample) );

            if ( option === "return" )
            { return output[sample] = symbol };

            if ( option === "global" )
            { return Object.modify(globalThis, sample, symbol, 0) };
        });


        if ( option === "return" )
        { return output };
    });
// ----------------------------------------------------------------------------------------------------------------------------
    Symbol.create( Symbol.global, "global" );
// ============================================================================================================================






// extend :: Object : tool library
// ----------------------------------------------------------------------------------------------------------------------------
    void Object.extend
    (
        Object,
        {
            values: function values ( object, select="*" )
            {
                if ( arguments.length < 2 )
                { return this.native.apply(Object, [...arguments]) };

                let indice = Object.indice( object, select );
                let output = [];

                if ( !indice || (indice.length < 1) )
                { return output };

                indice.map(( aspect )=>
                { output.push(object[aspect]) });

                return output;
            }
            .bind
            ({
                native: Object.values
            }),



            create: function create( intake, extend={}, permit=0 )
            {
                if ( (typeof intake) !== "string" )
                { return this.native.apply(Object, [...arguments]) };

                if ( intake.startsWith("async ") || intake.startsWith("bound ") )
                { intake = intake.split(" ").pop() };

                let output = (Function(`return new (function ${intake} (){})`))();

                return Object.extend( output, extend, permit );
            }
            .bind
            ({
                native: Object.create
            }),



            select ( object, chosen="*" )
            {
                let output = {};


                Object.filter( object, (aspect,detail)=>
                {
                    if ( (chosen === "*") || (!!chosen.includes && chosen.includes(aspect)) )
                    { return output[aspect] = detail };

                });


                return output;
            },



            expect ( object, affirm )
            {
                let output = Object.detect( object, affirm );

                if ( !!output )
                { return output }

                moan( "expecting " + affirm );
            },



            sorted ( object, ranked )
            {
                if ( Array.isArray(object) && Array.isArray(ranked) )
                { return Object.keys(Object.invert([ ...object, ...ranked ])) };

                let buffer = [];
                let output = {};
                let listed = Object.keys( object );
                let indice = listed.map(( detail )=>{ return detail.toLowerCase() }).sort();
                let search,  locale,  exists,  number;

                listed.map(( aspect, number )=>
                {
                    search = aspect.toLowerCase();
                    locale = indice.indexOf( search );
                    exists = buffer.indexOf( aspect );
                    number = ( (exists > -1) ? (exists + 1) : locale );

                    buffer[ number ] = aspect;
                });


                buffer.map(( aspect )=>
                {
                    output[ aspect ] = object[ aspect ];
                });


                return output;
            },



            concat ( )
            {
                let intake = [ ...arguments ],  output = {},  permit = 3;

                if ( Object.detect(intake.slice(-1)[0], "string,number") )
                { permit = intake.pop() }; // for if last arg was permit


                intake.map(( object )=>
                {
                    if ( !Object.detect(object,"object function array") )
                    { return };

                    Object.filter( object, (aspect,detail)=>
                    { output[aspect] = detail });
                });


                return output;
            },



            differ ( object, holder )
            {
                let indice = Object.indice( holder ),  output = {},  deeper = "obje func arra",  detect;


                Object.filter( object, (aspect,detail)=>
                {
                    detect = Object.detect( detail, 4 );

                    if ( !indice.includes(aspect) || (!deeper.includes(detect) && (detail !== holder[aspect])) )
                    { return output[aspect] = detail };
                });


                indice = Object.indice( object );


                Object.filter( holder, (aspect,detail)=>
                {
                    detect = Object.detect( detail, 4 );

                    if ( !indice.includes(aspect) || (!deeper.includes(detect) && (detail !== object[aspect])) )
                    { return output[aspect] = detail };
                });


                return output;
            },



            intake ( )
            {
                let params = [ ...arguments ];

                while ( (params.length > 0) && (params.slice(-1)[0] === undefined) )
                { params.pop() }; // cleaned up from the end

                let length = params.length;
                let matter = params[0];
                let detail = params[1];
                let family = Object.detect( matter, 4 );

                if ( (length === 2) && ("stri symb").includes(family) )
                { return {[matter]:detail} };

                if ( length !== 1 )
                { return params };


                switch ( family )
                {
                    case "obje" : return matter;
                    case "arra" : return matter;
                    case "func" : return { [(matter.name || "anon")]:matter };
                };


                return params;
            },



            cloned ( object, number=1 )
            {
                let string = Object.parsed( object, "string" );
                let result = Function( `return (${string})` );
                let output = [];

                if ( number < 2 )
                { return result };


                while ( number > 0 )
                {
                    output.push( Object.cloned(object,1) );
                };


                return output;
            },



            config: Object.assign
            (
                function config ( intake, output )
                {
                    if ( (typeof intake) === "string" )
                    { return (Object.config.action[intake] || intake) };

                    output = ( output || (new (Object.config.minder)) );


                    Object.filter( intake, (aspect,detail)=>
                    {
                        if ( (typeof aspect) === "string" )
                        { aspect = Object.config(aspect) };

                        output[aspect] = detail;
                    });


                    return output;
                },
                {
                    action: { run:"apply", def:"defineProperty", del:"delete", mut:"mutate" },
                    minder: ( function minder (){} ),
                }
            ),



            entrap ( object, minder )
            {
                return new Proxy( object, Object.config(minder) )
            },



            expose ( object, aspect=null )
            {
                if ( aspect === null )
                { return (object.prototype || Object.getPrototypeOf(object)) };

                return Object.getOwnPropertyDescriptor( object, aspect );
            },



            invert ( object, filter )
            {
                let output = {};
                    filter = ( filter || ((aspect,detail)=>{output[detail] = aspect}) );

                Object.filter( object, filter );

                return output;
            },



            define ( object, detail, permit=1 )
            {
                return Object.extend( object, detail, permit )
            },



            secure ( object, detail, permit=0 )
            {
                return Object.extend( object, detail, permit )
            },



            enable ( object, detail, permit=0 )
            {
                Object.filter( detail, true, (aspect)=>
                {
                    if ( ((typeof detail[aspect]) !== "function") || ((typeof object[aspect]) === "function") )
                    { return };

                    let callee = Object.remove( {[aspect]:detail[aspect]}, aspect );

                    Object.extend( object, aspect, callee, permit );
                });


                return object;
            },



            supply ( object, toGive, permit=3, onlyIf=[undefined,null,NaN,""] )
            {
                let exists;
                    onlyIf = ( Array.isArray(onlyIf) ? onlyIf : [onlyIf] );
                let detect = Object.detect( object, 4 ); // reserved
                let deeper = "obje func"; // reserved


                if ( !deeper.includes(detect) )
                { return object };


                Object.filter( toGive, (aspect, detail)=>
                {
                    exists = object[ aspect ];
                    // detect = Object.detect( detail, 4 ); // reserved

                    if ( onlyIf.indexOf(exists) < 0 )
                    { return }; // ignored .. object.aspect value is not found inside onlyIf

                    Object.extend(object, aspect, detail, permit);
                });


                return object;
            },



            target ( output, target, detail=SELECT, joiner="." )
            {
                target = (target+"").split(joiner);


                while ( target.length > 0 )
                {
                    let aspect = target.shift();


                    if ( aspect in output )
                    {
                        if ( target.length > 0 )
                        {
                            output = output[ aspect ];
                            continue;
                        };


                        if ( detail === SELECT )
                        { return output[aspect] };


                        if ( detail === REMOVE )
                        {
                            detail = output[ aspect ];
                            delete output[ aspect ];

                            return detail;
                        };


                        output[ aspect ] = detail;

                        return output;
                    };


                    if ( !(aspect in output) )
                    {
                        if ( (detail === SELECT) || (detail === REMOVE) )
                        { return }; // aspect is undefined


                        if ( target.length > 0 )
                        {
                            output[ aspect ] = {};
                            continue;
                        };


                        output[ aspect ] = detail;

                        return output;
                    };
                };


                return output;
            },



            exhume ( object, parent="", levels=3, joiner=".", output={} )
            {
                let deeper = "object,function,array";
                let marked,  origin;

                levels -= 1;


                Object.filter( object, (aspect,detail)=>
                {
                    marked = false;
                    origin = ( parent ? `${parent}.${aspect}` : aspect );

                    if ( !Object.detect(detail,deeper) )
                    { return output[origin] = detail };


                    Object.filter( detail, (subkey,subval)=>
                    {
                        if ( Object.detect(subval,deeper) && !marked )
                        { marked = true;  return FINISH };
                    });

                    output[origin] = detail;

                    if ( !marked || (levels < 1) )
                    { return };

                    Object.exhume( detail, origin, levels, joiner, output );
                });


                return output;
            },



            parsed ( object, option=undefined )
            {
                if ( !!object && ((object[FINITE] === false) || !Object.detect(object,FINITE)) )
                { object = {circular:"<loop>"} };

                let detect = Object.detect( object, 3 );
                let quoted = false;
                let output = "";
                let buffer = [];
                let convey,  indice,  family;


                if ( (detect === "str") && (option === "object") )
                { return String.parsed(object,"object") };


                if ( ("und nul boo num str").includes(detect) )
                { output = ((detect === "und") ? "" : ((detect === "str") ? object : JSON.stringify(object))) }
                else if ( (detect === "sym") || (object instanceof RegExp) )
                { output = object.toString() };


                if ( !!output )
                { return output };


                if ( (detect === "fun") || ((detect === "obj") && Object.detect(option,"array object")) )
                {
                    convey = ( Array.isArray(option) ? option : [option] );
                    indice = Object.indice( object );
                    output = object.toString( ...convey );

                    if ( indice < 1 )
                    { return output };
                };


                Object.filter( object, (aspect,detail)=>
                {
                    aspect+= "";
                    aspect = ( ((aspect[0] + aspect.slice(-1)) === `""`) ? aspect : `"${aspect}"` );
                    family = ( typeof detail );
                    quoted = ( ("string symbol function").includes(family) || (detail instanceof RegExp) )
                    detail = Object.parsed( detail, option );

                    if ( detect === "function" )
                    { detail = ("data:text/javascript;base64," + btoa(detail)) }; // data-url

                    if ( quoted && (detail[0] + detail.slice(-1) !== `""`) )
                    { detail = `"${detail}"` };

                    buffer.push( (detect === "arr") ? detail : `${aspect}:${detail}` );
                });


                quoted = ( (detect === "arr") ? "[]" : "{}" );
                buffer = ( quoted[0] + buffer.join(",") + quoted[1] );

                if ( detect === "fun" )
                { return `Object.assign(${output},${buffer})` };

                return buffer;
            },
        }
    );
// ============================================================================================================================






// notify :: Script : timing
// ----------------------------------------------------------------------------------------------------------------------------
// ============================================================================================================================






/* PACKED :: $/core/Script/script.assets.dir/script.Object.mjs : finish */







/* PACKED :: $/core/Script/script.assets.dir/script.Global.mjs : starts */




// import :: Script : Object
// ----------------------------------------------------------------------------------------------------------------------------
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
            let entity = ( this || intake.shift() ); // entity is either `this` when constructed, or 1st arg when called
            let entrap = intake.shift();
            let detect = ( typeof entrap );
            let impose = ( (detect !== "boolean") ? intake.shift() : entrap );
            let naming = ( entity.name || entity.constructor.name );
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


                    retain:
                    {
                        mutate: {},
                        recent: {},
                        routed: {},
                        stored: {},


                        config:
                        {
                            access:
                            {
                                signal: "action_aspect_subcon action_aspect action_source", // NB !! override later
                                symbol: [ "entity", "minder" ], // access symbols from these sources
                            },


                            memory:
                            {
                                secure:
                                {
                                    stored: true, // secured memory block
                                    routed: true, // secured memory block
                                }
                            }
                        },
                    },


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
                        { return "entity" };

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
                        let intake = [ ...arguments ],  action = intake.shift(),  target = intake.shift(),
                            aspect = ( intake.shift() || (target.name||"").split(" ").pop() );
                        let detect = ( typeof aspect );
                        let origin = this.source;
                        let detail = ( (action !== "get") ? intake.shift() : undefined ),
                            source = this.locate( aspect ),  exists = origin[ source ][ aspect ];
                        let subcon = Object.detect( (action==="set") ? detail.value : ((action==="run")?detail[0]:exists) );
                        let convey = { action, aspect, detail, exists, source };
                        let config = this.config("access");
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

                                impart = `on${aspect}`;
                                entity = this.source[ this.locate(impart,"") ];

                                if ( !entity )
                                { return }; // continue .. ignored impart .. any source expected to have aspect e.g: `onload`

                                entity[ impart ] = invoke.bind(entity); // internal relay (impart)
                            });


                            return ( this[MEDIUM] || this );
                        },
                        {
                            events:{},
                            recent:{},
                        }
                    ),



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

            if ( (!select || (select === "path")) && (this.plan === "file") )
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
// ============================================================================================================================






/* PACKED :: $/core/Script/script.assets.dir/script.Global.mjs : finish */







/* PACKED :: $/core/Script/script.assets.dir/script.Crypto.mjs : starts */




// import :: Script : Global
// ----------------------------------------------------------------------------------------------------------------------------
// ============================================================================================================================






// extend :: Crypto : encode/decode .. for project/code -style uniformity
// ----------------------------------------------------------------------------------------------------------------------------
    Crypto.extend
    ({
        enable ( string, option, method )
        {
            if ( !(["Encode","Decode"]).includes(option) )
            { return moan(`invalid option "${option}" .. expecting: Encode, or Decode`) };


            Object.extend( Crypto, (string+option), method );
        },



        encode ( intake, method="base64" )
        {
            return Crypto[ (method+"Encode") ]( intake );
        },



        decode ( intake, method="base64" )
        {
            return Crypto[ (method+"Decode") ]( intake );
        },
    });
// ============================================================================================================================






// extend :: Crypto : base64Encode and -Decode for consistency .. encoding removes trailing "=" characters
// ----------------------------------------------------------------------------------------------------------------------------
    Crypto.extend
    ({
        base62Encode ( intake )
        {
            let source = Number.stored.Base62;
            let result = "";
                intake *= 1;

            if ( isNaN(intake) )
            { return moan(`expecting number, but given: ${intake}`) };

            if ( intake === 0 )
            { return source[0] };


            while ( intake > 0 )
            {
                result = ( source[intake % 62] + result );
                intake = Math.floor(intake / 62);
            };

            return result;
        },



        base62Decode ( intake )
        {
            let source = Number.memory.Base62;
            let output = 0;
            let length = ( intake.length - 1 ),
                result,  number,  string;


            for ( number = 0; number <= length; number++ )
            {
                string = intake[ number ];
                result = source.indexOf( string );
                output += ( result * Math.pow(62,(length-number)) );
            };


            return output;
        },
    });
// ============================================================================================================================






// extend :: Crypto : base64Encode and -Decode for consistency .. encoding removes trailing "=" characters
// ----------------------------------------------------------------------------------------------------------------------------
    Crypto.extend
    ({
        base64Encode ( intake )
        {
            let output = btoa( Object.parsed(intake,"string") );

            while ( output.endsWith("=") )
            { output = output.slice(0,-1) };

            return output;
        },



        base64Decode ( intake )
        {
            let output = atob( Object.parsed(intake,"string") );

            return output;
        },
    });
// ============================================================================================================================






// extend :: Crypto : jsonEncode and -Decode for consistency
// ----------------------------------------------------------------------------------------------------------------------------
    Crypto.extend
    ({
        jsonEncode ( intake )
        {
            let output = JSON.stringify( intake );

            return output;
        },



        jsonDecode ( intake )
        {
            let output = JSON.parse( intake );

            return output;
        },
    });
// ============================================================================================================================






// extend :: Crypto : durlEncode and -Decode for consistency .. durl is short for data-URL
// ----------------------------------------------------------------------------------------------------------------------------
    Crypto.extend
    ({
        durlEncode ( intake, miming )
        {
            if ( String.detect(intake,"target") )
            {
                if ( !miming )
                { miming = Server.miming(intake) };

                intake = Device.select(intake)
            };


            try { intake = btoa(intake) }
            catch ( thrown ){ intake = Buffer.from(intake).toString("base64") };

            miming = ( miming || "text/plain" );

            let output = ( `data:${miming};base64,` + intake );

            return output;
        },



        durlDecode ( intake )
        {
            let output = atob( intake.split(";base64,").pop() );

            return output;
        },
    });
// ============================================================================================================================






// extend :: Crypto : hashEncode .. sha256
// ----------------------------------------------------------------------------------------------------------------------------
    Crypto.enable( "sha256", "Encode", function sha256 ( intake )
    {
        return this.sha256( Object.parsed(intake,"string") );
    }
    .bind({sha256:function a(b){function c(a,b){return a>>>b|a<<32-b}for(var d,e,f=Math.pow,g=f(2,32),h="length",i="",j=[],k=8*b[h],l=a.h=a.h||[],m=a.k=a.k||[],n=m[h],o={},p=2;64>n;p++)if(!o[p]){for(d=0;313>d;d+=p)o[d]=p;l[n]=f(p,.5)*g|0,m[n++]=f(p,1/3)*g|0}for(b+="\x80";b[h]%64-56;)b+="\x00";for(d=0;d<b[h];d++){if(e=b.charCodeAt(d),e>>8)return;j[d>>2]|=e<<(3-d)%4*8}for(j[j[h]]=k/g|0,j[j[h]]=k,e=0;e<j[h];){var q=j.slice(e,e+=16),r=l;for(l=l.slice(0,8),d=0;64>d;d++){var s=q[d-15],t=q[d-2],u=l[0],v=l[4],w=l[7]+(c(v,6)^c(v,11)^c(v,25))+(v&l[5]^~v&l[6])+m[d]+(q[d]=16>d?q[d]:q[d-16]+(c(s,7)^c(s,18)^s>>>3)+q[d-7]+(c(t,17)^c(t,19)^t>>>10)|0),x=(c(u,2)^c(u,13)^c(u,22))+(u&l[1]^u&l[2]^l[1]&l[2]);l=[w+x|0].concat(l),l[4]=l[4]+w|0}for(d=0;8>d;d++)l[d]=l[d]+r[d]|0}for(d=0;8>d;d++)for(e=3;e+1;e--){var y=l[d]>>8*e&255;i+=(16>y?0:"")+y.toString(16)}return i}}));
// ============================================================================================================================






// notify :: Script : timing
// ----------------------------------------------------------------------------------------------------------------------------
// ============================================================================================================================






/* PACKED :: $/core/Script/script.assets.dir/script.Crypto.mjs : finish */







/* PACKED :: $/core/Script/script.assets.dir/script.Number.mjs : starts */




// import :: Script : Crypto
// ----------------------------------------------------------------------------------------------------------------------------
// ============================================================================================================================






// extend :: Number : methods
// ----------------------------------------------------------------------------------------------------------------------------
    Number.extend
    ({
        detect ( number, affirm=7 )
        {
            let output = "integer";

            if ( (typeof number) !== "number" )
            { return }; // undefined .. invalid

            if ( (number+"").includes(".") )
            { output = "float" };

            if ( (typeof affirm) === "string" )
            { return affirm.includes(output) };

            return output.slice( 0, affirm );
        },



        ranged ()
        {
            let ranges = [...arguments];
            let result = [];

            if ((typeof ranges[0]) === "number")
            { ranges = [ranges] }; // ease of use


            ranges.map((ranger)=>
            {
                let starts = ranger[0];
                let finish = ranger[1];
                let grower = (ranger[2] || 1);
                let number = starts;

                while (number <= finish)
                {
                    result.push(number);
                    number += grower;
                };
            });


            return result;
        },
    });
// ============================================================================================================================





// extend :: Number : aspects
// ----------------------------------------------------------------------------------------------------------------------------
    Number.extend
    ({
        stored:
        {
            Base62: String.fromCharCode( ...(Number.ranged([48,57], [65,90], [97,122])) ),
        },



        random: function random ( finish=999, starts=0 )
        {
            let aspect = ( `${starts}-${finish}` );
            let output = this.picked( starts, finish );

            while ( this.memory[aspect] === output )
            { output = this.picked(starts, finish) };

            return output;
        }
        .bind
        ({
            memory: {},

            picked ( starts, finish )
            {
                return Math.floor( Math.random() * (starts - finish + 1) + finish );
            },
        }),



        timing ( )
        {
            let tmilli = (new Date()).getTime();
            let maxmil = (((60 * 60) * 24) * 1000); // 1 day of millisec
            let tmicro = (((performance.now() + "").split(".").shift() * 1) % maxmil); // client + server compliant

            return  ( tmilli + tmicro );
        },



        unique: function unique(  )
        {
            this.seed++;
            return ( Number.timing() + this.seed + Number.random() );
        }
        .bind( {seed:0} ),
    });
// ============================================================================================================================





// evolve :: Number.prototype.toBase : shim
// ----------------------------------------------------------------------------------------------------------------------------
    Object.enable( Number.prototype,
    {
        toBase ( number )
        {
            let naming = ( "base" + number + "Encode" );

            if ( !!Crypto[naming] )
            { return Crypto[naming](this + 0) };

            return number.toString( number );
        },
    });
// ============================================================================================================================





// extend :: Number.awaits : for 1 second base-timing synergy with built-in client-side Media (Audio/Video) api standard
// ----------------------------------------------------------------------------------------------------------------------------
    Number.extend
    ({
        awaits ( number, invoke=null, params=[] )
        {
            if ( (number+"").includes(".") )
            { number = Math.trunc(number*1000) };


            if ( (typeof invoke) === "function" )
            {
                return setTimeout( function callee ()
                {
                    this.invoke( ...(this.params) )
                }
                .bind({ invoke, params }), number )
            };


            return new Promise( function awaits( accept, reject )
            {
                setTimeout
                (
                    function invoke ()
                    {
                        try { return this.accept() }
                        catch ( failed ){ return this.reject(failed) }
                    }
                    .bind( {accept, reject} ),

                    this.number
                );
            }
            .bind( {number} ));
        },
    });
// ----------------------------------------------------------------------------------------------------------------------------
// praxis :: Number.awaits( 10000 ).then(()=>{ dump(".") }) <- dumped `.` after 10 seconds
//        :: Number.awaits( 0.001 ).then(()=>{ dump(".") }) <- dumped `.` after 1 milli-second
// ============================================================================================================================






// notify :: Script : timing
// ----------------------------------------------------------------------------------------------------------------------------
// ============================================================================================================================


/* PACKED :: $/core/Script/script.assets.dir/script.Number.mjs : finish */







/* PACKED :: $/core/Script/script.assets.dir/script.String.mjs : starts */




// import :: Script : Number
// ----------------------------------------------------------------------------------------------------------------------------
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
                affirm: ( "true yes on" ).split(" "),
                negate: ( "false no off" ).split(" "),
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

                if ( string.startsWith("/") )
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

                // if ( sample.startsWith("/") || sample.startsWith(".") || sample.startsWith("$") || sample.startsWith("~") )
                if ( String.locate(sample, ["/",".","$","~"], 0) )
                { sample = String.target(sample) };

                if ( sample.startsWith("/") )
                { sample = ("file://localhost:0" + sample) };

                if ( sample.split(":").pop().includes("?") && !sample.split(":").pop().includes("=") )
                { sample += "=true" };

                let parted = sample.split("://").pop().split("/");
                let target = ( !!parted[1] || sample.endsWith("/") );
                let locale,  aspect, toggle,  cutter,  search,  sliver;


                for ( let number = 0;  number < indice.length;  number++ )
                {
                    aspect = indice[ number ];
                    cutter = joiner[ number ];
                    locale = sample.indexOf( cutter );
                    toggle = false;

                    if ( (aspect === "user") && !parted[0].includes("@") )
                    { continue };

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
                                case "path" : if ( (target==true) ){ output[aspect] = ("/"+sample) };
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
// ============================================================================================================================






/* PACKED :: $/core/Script/script.assets.dir/script.String.mjs : finish */







/* PACKED :: $/core/Script/script.assets.dir/script.Handle.mjs : starts */




// import :: Script : String
// ----------------------------------------------------------------------------------------------------------------------------
// ============================================================================================================================






// readme :: scoped : info
// ----------------------------------------------------------------------------------------------------------------------------
    Method.evolve( String, function toTitleCase ()
    {
        let output = String.toCase( (this + ""), "title" );

        return output;
    });
// ============================================================================================================================






// notify :: Script : timing
// ----------------------------------------------------------------------------------------------------------------------------
// ============================================================================================================================






/* PACKED :: $/core/Script/script.assets.dir/script.Handle.mjs : finish */







/* PACKED :: $/core/Script/script.driver.mjs : starts */




// import :: Script : Handle
// ----------------------------------------------------------------------------------------------------------------------------
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
            if ( (console.device === "server") && ((Script.config("output") || {}).logVerbosity < 1) )
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
    Script.recent
    ({
        intake: [],
    });
// ============================================================================================================================






// listen :: Script : invoke .. parse intake as script
// ----------------------------------------------------------------------------------------------------------------------------
    Script.listen
    ({
        run ( signal )
        {
            let output = String.parsed( signal.detail[0], "script" );

            if ( output === undefined )
            { output = "" };

            return output;
        },
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





        intake ()
        {
            let params = [ ...arguments ];
            let detect = Object.detect( params[0] );
            let output = {};

            if ( params.length < 1 )
            { return Object.assign(output,this.intake) };

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
    });
// ============================================================================================================================






// import :: device : driver ... server/client script source
// ----------------------------------------------------------------------------------------------------------------------------
    