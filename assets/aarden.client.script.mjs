

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
    

/* PACKED :: $/core/Server/server.driver.mjs : starts */




// readme :: scoped : info
// ----------------------------------------------------------------------------------------------------------------------------
// ============================================================================================================================






// define :: Server : aspect
// ----------------------------------------------------------------------------------------------------------------------------
    Global.Server = Plexus( function Server (){} );
// ============================================================================================================================






// extend :: Server : miming
// ----------------------------------------------------------------------------------------------------------------------------
    Server.extend
    ({
        miming ( string, detect="" )
        {
            string += ""; // force toString or fail

            if ( string.includes(".") )
            { string = string.split(".").pop() }; // file extension .. if any

            if ( detect === "folder" )
            { string = "/" }

            return this.config( "miming" )[ string ];
        },
    });
// ============================================================================================================================






/* PACKED :: $/core/Server/server.driver.mjs : finish */







/* PACKED :: $/core/Server/server@client.mjs : starts */




// readme :: scoped : info
// ----------------------------------------------------------------------------------------------------------------------------
// ============================================================================================================================






// import :: Server : driver
// ----------------------------------------------------------------------------------------------------------------------------
// ============================================================================================================================






// extend :: Server : handle
// ----------------------------------------------------------------------------------------------------------------------------
    Server.extend
    ({
        async handle ( method="POST", target="/", header={}, buffer=null )
        {
            return new Promise( function awaits(accept,reject)
            {
                let socket = new XMLHttpRequest();

                socket.addEventListener( "error", (detail)=>
                { reject(detail) });


                socket.addEventListener( "load", (detail)=>
                {
                    detail = socket.responseText;

                    if ( socket.status !== 200 )
                    { return reject(detail) };


                    if ( header.accept === "application/json" )
                    {
                        try { detail = JSON.parse(detail) }
                        catch ( thrown ){};
                    };


                    accept( detail );
                });


                socket.open( method, target );

                Object.filter( header, (aspect,detail)=>
                { socket.setRequestHeader(aspect,detail) });

                if ( !([null,undefined]).includes(buffer) )
                { buffer = JSON.stringify(buffer) };

                socket.send( buffer );
            });
        }
    });
// ============================================================================================================================






// extend :: Server : select
// ----------------------------------------------------------------------------------------------------------------------------
    Server.extend
    ({
        async select ( target, header={} )
        {
            Object.supply( header, {accept:"application/json"} );

            return await Server.handle( "GET", target, header );
        }
    });
// ============================================================================================================================






// signal :: Global : loadedServer
// ----------------------------------------------------------------------------------------------------------------------------
    Global.signal( "loadedServer" );
// ============================================================================================================================






/* PACKED :: $/core/Server/server@client.mjs : finish */







/* PACKED :: $/core/Server/server.driver.mjs : starts */




// readme :: scoped : info
// ----------------------------------------------------------------------------------------------------------------------------
// ============================================================================================================================






// define :: Server : aspect
// ----------------------------------------------------------------------------------------------------------------------------
    Global.Server = Plexus( function Server (){} );
// ============================================================================================================================






// extend :: Server : miming
// ----------------------------------------------------------------------------------------------------------------------------
    Server.extend
    ({
        miming ( string, detect="" )
        {
            string += ""; // force toString or fail

            if ( string.includes(".") )
            { string = string.split(".").pop() }; // file extension .. if any

            if ( detect === "folder" )
            { string = "/" }

            return this.config( "miming" )[ string ];
        },
    });
// ============================================================================================================================






/* PACKED :: $/core/Server/server.driver.mjs : finish */







/* PACKED :: $/core/Server/server@client.mjs : starts */




// readme :: scoped : info
// ----------------------------------------------------------------------------------------------------------------------------
// ============================================================================================================================






// import :: Server : driver
// ----------------------------------------------------------------------------------------------------------------------------
// ============================================================================================================================






// extend :: Server : handle
// ----------------------------------------------------------------------------------------------------------------------------
    Server.extend
    ({
        async handle ( method="POST", target="/", header={}, buffer=null )
        {
            return new Promise( function awaits(accept,reject)
            {
                let socket = new XMLHttpRequest();

                socket.addEventListener( "error", (detail)=>
                { reject(detail) });


                socket.addEventListener( "load", (detail)=>
                {
                    detail = socket.responseText;

                    if ( socket.status !== 200 )
                    { return reject(detail) };


                    if ( header.accept === "application/json" )
                    {
                        try { detail = JSON.parse(detail) }
                        catch ( thrown ){};
                    };


                    accept( detail );
                });


                socket.open( method, target );

                Object.filter( header, (aspect,detail)=>
                { socket.setRequestHeader(aspect,detail) });

                if ( !([null,undefined]).includes(buffer) )
                { buffer = JSON.stringify(buffer) };

                socket.send( buffer );
            });
        }
    });
// ============================================================================================================================






// extend :: Server : select
// ----------------------------------------------------------------------------------------------------------------------------
    Server.extend
    ({
        async select ( target, header={} )
        {
            Object.supply( header, {accept:"application/json"} );

            return await Server.handle( "GET", target, header );
        }
    });
// ============================================================================================================================






// signal :: Global : loadedServer
// ----------------------------------------------------------------------------------------------------------------------------
    Global.signal( "loadedServer" );
// ============================================================================================================================






/* PACKED :: $/core/Server/server@client.mjs : finish */







/* PACKED :: $/core/Device/device.driver.mjs : starts */



// readme :: scoped : info
// ----------------------------------------------------------------------------------------------------------------------------
// ============================================================================================================================






// define :: Device : reference
// ----------------------------------------------------------------------------------------------------------------------------
    Global.Device = Plexus( function Device (){} );
// ============================================================================================================================






/* PACKED :: $/core/Device/device.driver.mjs : finish */







/* PACKED :: $/core/Device/device@client.mjs : starts */




// readme :: scoped : info
// ----------------------------------------------------------------------------------------------------------------------------
// ============================================================================================================================






// import :: Device : driver
// ----------------------------------------------------------------------------------------------------------------------------
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






/* PACKED :: $/core/Device/device@client.mjs : finish */







/* PACKED :: $/core/Script/script@client.mjs : starts */




// readme :: Script : client .. requires `./script.driver.mjs` to function
// ----------------------------------------------------------------------------------------------------------------------------
// ============================================================================================================================






// import :: kernel : modules
// ----------------------------------------------------------------------------------------------------------------------------
// ============================================================================================================================






// extend :: Script : select ..
// ----------------------------------------------------------------------------------------------------------------------------
    Script.extend
    ({
        async select ()
        {
            let output = await Server.select( ...arguments );

            return output;
        }
    });
// ============================================================================================================================






// import :: core : modules
// ----------------------------------------------------------------------------------------------------------------------------
    Global.listen
    ({
        loadedDevice ()
        {
            if ( Script.shared.assets === "assets" )
            {
                Update();
                Global.signal( "loadedScript" );
                return;
            };


            Script.import( Script.shared.assets ).then(( result )=>
            {
                Update();
                // dump( Script.shared.config );
                Global.signal( "loadedScript" );
            });
        },
    });
// ============================================================================================================================






/* PACKED :: $/core/Script/script@client.mjs : finish */








Script.config
({}
);



/* PACKED :: $/core/Device/device.driver.mjs : starts */



// readme :: scoped : info
// ----------------------------------------------------------------------------------------------------------------------------
// ============================================================================================================================






// define :: Device : reference
// ----------------------------------------------------------------------------------------------------------------------------
    Global.Device = Plexus( function Device (){} );
// ============================================================================================================================






/* PACKED :: $/core/Device/device.driver.mjs : finish */







/* PACKED :: $/core/Device/device@client.mjs : starts */




// readme :: scoped : info
// ----------------------------------------------------------------------------------------------------------------------------
// ============================================================================================================================






// import :: Device : driver
// ----------------------------------------------------------------------------------------------------------------------------
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






/* PACKED :: $/core/Device/device@client.mjs : finish */








Device.config
({
    "intake":
    {
        "sensorConvey": [ "mousedown", "mouseup", "mousemove", "click", "keydown", "keyup" ],
        "sensorIdling": 360
    }
}
);
undefined


/* PACKED :: $/core/Server/server.driver.mjs : starts */




// readme :: scoped : info
// ----------------------------------------------------------------------------------------------------------------------------
// ============================================================================================================================






// define :: Server : aspect
// ----------------------------------------------------------------------------------------------------------------------------
    Global.Server = Plexus( function Server (){} );
// ============================================================================================================================






// extend :: Server : miming
// ----------------------------------------------------------------------------------------------------------------------------
    Server.extend
    ({
        miming ( string, detect="" )
        {
            string += ""; // force toString or fail

            if ( string.includes(".") )
            { string = string.split(".").pop() }; // file extension .. if any

            if ( detect === "folder" )
            { string = "/" }

            return this.config( "miming" )[ string ];
        },
    });
// ============================================================================================================================






/* PACKED :: $/core/Server/server.driver.mjs : finish */







/* PACKED :: $/core/Server/server@client.mjs : starts */




// readme :: scoped : info
// ----------------------------------------------------------------------------------------------------------------------------
// ============================================================================================================================






// import :: Server : driver
// ----------------------------------------------------------------------------------------------------------------------------
// ============================================================================================================================






// extend :: Server : handle
// ----------------------------------------------------------------------------------------------------------------------------
    Server.extend
    ({
        async handle ( method="POST", target="/", header={}, buffer=null )
        {
            return new Promise( function awaits(accept,reject)
            {
                let socket = new XMLHttpRequest();

                socket.addEventListener( "error", (detail)=>
                { reject(detail) });


                socket.addEventListener( "load", (detail)=>
                {
                    detail = socket.responseText;

                    if ( socket.status !== 200 )
                    { return reject(detail) };


                    if ( header.accept === "application/json" )
                    {
                        try { detail = JSON.parse(detail) }
                        catch ( thrown ){};
                    };


                    accept( detail );
                });


                socket.open( method, target );

                Object.filter( header, (aspect,detail)=>
                { socket.setRequestHeader(aspect,detail) });

                if ( !([null,undefined]).includes(buffer) )
                { buffer = JSON.stringify(buffer) };

                socket.send( buffer );
            });
        }
    });
// ============================================================================================================================






// extend :: Server : select
// ----------------------------------------------------------------------------------------------------------------------------
    Server.extend
    ({
        async select ( target, header={} )
        {
            Object.supply( header, {accept:"application/json"} );

            return await Server.handle( "GET", target, header );
        }
    });
// ============================================================================================================================






// signal :: Global : loadedServer
// ----------------------------------------------------------------------------------------------------------------------------
    Global.signal( "loadedServer" );
// ============================================================================================================================






/* PACKED :: $/core/Server/server@client.mjs : finish */








Server.config
({}
);


Server.config
({"miming":{"123":"application/vnd.lotus-1-2-3","/":"inode/directory","1km":"application/vnd.1000minds.decision-model+xml","3dml":"text/vnd.in3d.3dml","3ds":"image/x-3ds","3g2":"video/3gpp2","3gp":"video/3gpp","3gpp":"video/3gpp","3mf":"model/3mf","7z":"application/x-7z-compressed","aab":"application/x-authorware-bin","aac":"audio/x-aac","aam":"application/x-authorware-map","aas":"application/x-authorware-seg","abw":"application/x-abiword","ac":"application/vnd.nokia.n-gage.ac+xml","acc":"application/vnd.americandynamics.acc","ace":"application/x-ace-compressed","acu":"application/vnd.acucobol","acutc":"application/vnd.acucorp","adp":"audio/adpcm","aep":"application/vnd.audiograph","afm":"application/x-font-type1","afp":"application/vnd.ibm.modcap","age":"application/vnd.age","ahead":"application/vnd.ahead.space","ai":"application/postscript","aif":"audio/x-aiff","aifc":"audio/x-aiff","aiff":"audio/x-aiff","air":"application/vnd.adobe.air-application-installer-package+zip","ait":"application/vnd.dvb.ait","ami":"application/vnd.amiga.ami","amr":"audio/amr","apk":"application/vnd.android.package-archive","apng":"image/apng","appcache":"text/cache-manifest","application":"application/x-ms-application","apr":"application/vnd.lotus-approach","arc":"application/x-freearc","arj":"application/x-arj","asc":"application/pgp-signature","asf":"video/x-ms-asf","asm":"text/x-asm","aso":"application/vnd.accpac.simply.aso","asx":"video/x-ms-asf","atc":"application/vnd.acucorp","atom":"application/atom+xml","atomcat":"application/atomcat+xml","atomdeleted":"application/atomdeleted+xml","atomsvc":"application/atomsvc+xml","atx":"application/vnd.antix.game-component","au":"audio/basic","avi":"video/x-msvideo","avif":"image/avif","aw":"application/applixware","azf":"application/vnd.airzip.filesecure.azf","azs":"application/vnd.airzip.filesecure.azs","azv":"image/vnd.airzip.accelerator.azv","azw":"application/vnd.amazon.ebook","b16":"image/vnd.pco.b16","bat":"application/x-msdownload","bcpio":"application/x-bcpio","bdf":"application/x-font-bdf","bdm":"application/vnd.syncml.dm+wbxml","bdoc":"application/x-bdoc","bed":"application/vnd.realvnc.bed","bh2":"application/vnd.fujitsu.oasysprs","bin":"application/octet-stream","blb":"application/x-blorb","blorb":"application/x-blorb","bmi":"application/vnd.bmi","bmml":"application/vnd.balsamiq.bmml+xml","bmp":"image/x-ms-bmp","book":"application/vnd.framemaker","box":"application/vnd.previewsystems.box","boz":"application/x-bzip2","bpk":"application/octet-stream","bsp":"model/vnd.valve.source.compiled-map","btif":"image/prs.btif","buffer":"application/octet-stream","bz":"application/x-bzip","bz2":"application/x-bzip2","c":"text/x-c","c11amc":"application/vnd.cluetrust.cartomobile-config","c11amz":"application/vnd.cluetrust.cartomobile-config-pkg","c4d":"application/vnd.clonk.c4group","c4f":"application/vnd.clonk.c4group","c4g":"application/vnd.clonk.c4group","c4p":"application/vnd.clonk.c4group","c4u":"application/vnd.clonk.c4group","cab":"application/vnd.ms-cab-compressed","caf":"audio/x-caf","cap":"application/vnd.tcpdump.pcap","car":"application/vnd.curl.car","cat":"application/vnd.ms-pki.seccat","cb7":"application/x-cbr","cba":"application/x-cbr","cbr":"application/x-cbr","cbt":"application/x-cbr","cbz":"application/x-cbr","cc":"text/x-c","cco":"application/x-cocoa","cct":"application/x-director","ccxml":"application/ccxml+xml","cdbcmsg":"application/vnd.contact.cmsg","cdf":"application/x-netcdf","cdfx":"application/cdfx+xml","cdkey":"application/vnd.mediastation.cdkey","cdmia":"application/cdmi-capability","cdmic":"application/cdmi-container","cdmid":"application/cdmi-domain","cdmio":"application/cdmi-object","cdmiq":"application/cdmi-queue","cdx":"chemical/x-cdx","cdxml":"application/vnd.chemdraw+xml","cdy":"application/vnd.cinderella","cer":"application/pkix-cert","cfs":"application/x-cfs-compressed","cgm":"image/cgm","chat":"application/x-chat","chm":"application/vnd.ms-htmlhelp","chrt":"application/vnd.kde.kchart","cif":"chemical/x-cif","cii":"application/vnd.anser-web-certificate-issue-initiation","cil":"application/vnd.ms-artgalry","cjs":"application/node","cla":"application/vnd.claymore","class":"application/java-vm","clkk":"application/vnd.crick.clicker.keyboard","clkp":"application/vnd.crick.clicker.palette","clkt":"application/vnd.crick.clicker.template","clkw":"application/vnd.crick.clicker.wordbank","clkx":"application/vnd.crick.clicker","clp":"application/x-msclip","cmc":"application/vnd.cosmocaller","cmdf":"chemical/x-cmdf","cml":"chemical/x-cml","cmp":"application/vnd.yellowriver-custom-menu","cmx":"image/x-cmx","cod":"application/vnd.rim.cod","coffee":"text/coffeescript","com":"application/x-msdownload","conf":"text/plain","cpio":"application/x-cpio","cpp":"text/x-c","cpt":"application/mac-compactpro","crd":"application/x-mscardfile","crl":"application/pkix-crl","crt":"application/x-x509-ca-cert","crx":"application/x-chrome-extension","cryptonote":"application/vnd.rig.cryptonote","csh":"application/x-csh","csl":"application/vnd.citationstyles.style+xml","csml":"chemical/x-csml","csp":"application/vnd.commonspace","css":"text/css","cst":"application/x-director","csv":"text/csv","cu":"application/cu-seeme","curl":"text/vnd.curl","cww":"application/prs.cww","cxt":"application/x-director","cxx":"text/x-c","dae":"model/vnd.collada+xml","daf":"application/vnd.mobius.daf","dart":"application/vnd.dart","dataless":"application/vnd.fdsn.seed","davmount":"application/davmount+xml","dbf":"application/vnd.dbf","dbk":"application/docbook+xml","dcr":"application/x-director","dcurl":"text/vnd.curl.dcurl","dd2":"application/vnd.oma.dd2+xml","ddd":"application/vnd.fujixerox.ddd","ddf":"application/vnd.syncml.dmddf+xml","dds":"image/vnd.ms-dds","deb":"application/x-debian-package","def":"text/plain","deploy":"application/octet-stream","der":"application/x-x509-ca-cert","dfac":"application/vnd.dreamfactory","dgc":"application/x-dgc-compressed","dic":"text/x-c","dir":"application/x-director","dis":"application/vnd.mobius.dis","disposition-notification":"message/disposition-notification","dist":"application/octet-stream","distz":"application/octet-stream","djv":"image/vnd.djvu","djvu":"image/vnd.djvu","dll":"application/x-msdownload","dmg":"application/x-apple-diskimage","dmp":"application/vnd.tcpdump.pcap","dms":"application/octet-stream","dna":"application/vnd.dna","doc":"application/msword","docm":"application/vnd.ms-word.document.macroenabled.12","docx":"application/vnd.openxmlformats-officedocument.wordprocessingml.document","dot":"application/msword","dotm":"application/vnd.ms-word.template.macroenabled.12","dotx":"application/vnd.openxmlformats-officedocument.wordprocessingml.template","dp":"application/vnd.osgi.dp","dpg":"application/vnd.dpgraph","dra":"audio/vnd.dra","drle":"image/dicom-rle","dsc":"text/prs.lines.tag","dssc":"application/dssc+der","dtb":"application/x-dtbook+xml","dtd":"application/xml-dtd","dts":"audio/vnd.dts","dtshd":"audio/vnd.dts.hd","dump":"application/octet-stream","dvb":"video/vnd.dvb.file","dvi":"application/x-dvi","dwd":"application/atsc-dwd+xml","dwf":"model/vnd.dwf","dwg":"image/vnd.dwg","dxf":"image/vnd.dxf","dxp":"application/vnd.spotfire.dxp","dxr":"application/x-director","ear":"application/java-archive","ecelp4800":"audio/vnd.nuera.ecelp4800","ecelp7470":"audio/vnd.nuera.ecelp7470","ecelp9600":"audio/vnd.nuera.ecelp9600","ecma":"application/ecmascript","edm":"application/vnd.novadigm.edm","edx":"application/vnd.novadigm.edx","efif":"application/vnd.picsel","ei6":"application/vnd.pg.osasli","elc":"application/octet-stream","emf":"image/emf","eml":"message/rfc822","emma":"application/emma+xml","emotionml":"application/emotionml+xml","emz":"application/x-msmetafile","eol":"audio/vnd.digital-winds","eot":"application/vnd.ms-fontobject","eps":"application/postscript","epub":"application/epub+zip","es":"application/ecmascript","es3":"application/vnd.eszigno3+xml","esa":"application/vnd.osgi.subsystem","esf":"application/vnd.epson.esf","et3":"application/vnd.eszigno3+xml","etx":"text/x-setext","eva":"application/x-eva","evy":"application/x-envoy","exe":"application/x-msdownload","exi":"application/exi","exp":"application/express","exr":"image/aces","ext":"application/vnd.novadigm.ext","ez":"application/andrew-inset","ez2":"application/vnd.ezpix-album","ez3":"application/vnd.ezpix-package","f":"text/x-fortran","f4v":"video/x-f4v","f77":"text/x-fortran","f90":"text/x-fortran","fbs":"image/vnd.fastbidsheet","fcdt":"application/vnd.adobe.formscentral.fcdt","fcs":"application/vnd.isac.fcs","fdf":"application/vnd.fdf","fdt":"application/fdt+xml","fe_launch":"application/vnd.denovo.fcselayout-link","fg5":"application/vnd.fujitsu.oasysgp","fgd":"application/x-director","fh":"image/x-freehand","fh4":"image/x-freehand","fh5":"image/x-freehand","fh7":"image/x-freehand","fhc":"image/x-freehand","fig":"application/x-xfig","fits":"image/fits","flac":"audio/x-flac","fli":"video/x-fli","flo":"application/vnd.micrografx.flo","flv":"video/x-flv","flw":"application/vnd.kde.kivio","flx":"text/vnd.fmi.flexstor","fly":"text/vnd.fly","fm":"application/vnd.framemaker","fnc":"application/vnd.frogans.fnc","fo":"application/vnd.software602.filler.form+xml","for":"text/x-fortran","fpx":"image/vnd.fpx","frame":"application/vnd.framemaker","fsc":"application/vnd.fsc.weblaunch","fst":"image/vnd.fst","ftc":"application/vnd.fluxtime.clip","fti":"application/vnd.anser-web-funds-transfer-initiation","fvt":"video/vnd.fvt","fxp":"application/vnd.adobe.fxp","fxpl":"application/vnd.adobe.fxp","fzs":"application/vnd.fuzzysheet","g2w":"application/vnd.geoplan","g3":"image/g3fax","g3w":"application/vnd.geospace","gac":"application/vnd.groove-account","gam":"application/x-tads","gbr":"application/rpki-ghostbusters","gca":"application/x-gca-compressed","gdl":"model/vnd.gdl","gdoc":"application/vnd.google-apps.document","ged":"text/vnd.familysearch.gedcom","geo":"application/vnd.dynageo","geojson":"application/geo+json","gex":"application/vnd.geometry-explorer","ggb":"application/vnd.geogebra.file","ggt":"application/vnd.geogebra.tool","ghf":"application/vnd.groove-help","gif":"image/gif","gim":"application/vnd.groove-identity-message","glb":"model/gltf-binary","gltf":"model/gltf+json","gml":"application/gml+xml","gmx":"application/vnd.gmx","gnumeric":"application/x-gnumeric","gph":"application/vnd.flographit","gpx":"application/gpx+xml","gqf":"application/vnd.grafeq","gqs":"application/vnd.grafeq","gram":"application/srgs","gramps":"application/x-gramps-xml","gre":"application/vnd.geometry-explorer","grv":"application/vnd.groove-injector","grxml":"application/srgs+xml","gsf":"application/x-font-ghostscript","gsheet":"application/vnd.google-apps.spreadsheet","gslides":"application/vnd.google-apps.presentation","gtar":"application/x-gtar","gtm":"application/vnd.groove-tool-message","gtw":"model/vnd.gtw","gv":"text/vnd.graphviz","gxf":"application/gxf","gxt":"application/vnd.geonext","gz":"application/gzip","h":"text/x-c","h261":"video/h261","h263":"video/h263","h264":"video/h264","hal":"application/vnd.hal+xml","hbci":"application/vnd.hbci","hbs":"text/x-handlebars-template","hdd":"application/x-virtualbox-hdd","hdf":"application/x-hdf","heic":"image/heic","heics":"image/heic-sequence","heif":"image/heif","heifs":"image/heif-sequence","hej2":"image/hej2k","held":"application/atsc-held+xml","hh":"text/x-c","hjson":"application/hjson","hlp":"application/winhlp","hpgl":"application/vnd.hp-hpgl","hpid":"application/vnd.hp-hpid","hps":"application/vnd.hp-hps","hqx":"application/mac-binhex40","hsj2":"image/hsj2","htc":"text/x-component","htke":"application/vnd.kenameaapp","htm":"text/html","html":"text/html","hvd":"application/vnd.yamaha.hv-dic","hvp":"application/vnd.yamaha.hv-voice","hvs":"application/vnd.yamaha.hv-script","i2g":"application/vnd.intergeo","icc":"application/vnd.iccprofile","ice":"x-conference/x-cooltalk","icm":"application/vnd.iccprofile","ico":"image/x-icon","ics":"text/calendar","ief":"image/ief","ifb":"text/calendar","ifm":"application/vnd.shana.informed.formdata","iges":"model/iges","igl":"application/vnd.igloader","igm":"application/vnd.insors.igm","igs":"model/iges","igx":"application/vnd.micrografx.igx","iif":"application/vnd.shana.informed.interchange","img":"application/octet-stream","imp":"application/vnd.accpac.simply.imp","ims":"application/vnd.ms-ims","in":"text/plain","ini":"text/plain","ink":"application/inkml+xml","inkml":"application/inkml+xml","install":"application/x-install-instructions","iota":"application/vnd.astraea-software.iota","ipfix":"application/ipfix","ipk":"application/vnd.shana.informed.package","irm":"application/vnd.ibm.rights-management","irp":"application/vnd.irepository.package+xml","iso":"application/x-iso9660-image","itp":"application/vnd.shana.informed.formtemplate","its":"application/its+xml","ivp":"application/vnd.immervision-ivp","ivu":"application/vnd.immervision-ivu","jad":"text/vnd.sun.j2me.app-descriptor","jade":"text/jade","jam":"application/vnd.jam","jar":"application/java-archive","jardiff":"application/x-java-archive-diff","java":"text/x-java-source","jhc":"image/jphc","jisp":"application/vnd.jisp","jls":"image/jls","jlt":"application/vnd.hp-jlyt","jng":"image/x-jng","jnlp":"application/x-java-jnlp-file","joda":"application/vnd.joost.joda-archive","jp2":"image/jp2","jpe":"image/jpeg","jpeg":"image/jpeg","jpf":"image/jpx","jpg":"image/jpeg","jpg2":"image/jp2","jpgm":"video/jpm","jpgv":"video/jpeg","jph":"image/jph","jpm":"video/jpm","jpx":"image/jpx","js":"application/javascript","jsn":"application/json","json":"application/json","json5":"application/json5","jsonld":"application/ld+json","jsonml":"application/jsonml+json","jsx":"text/jsx","jxr":"image/jxr","jxra":"image/jxra","jxrs":"image/jxrs","jxs":"image/jxs","jxsc":"image/jxsc","jxsi":"image/jxsi","jxss":"image/jxss","kar":"audio/midi","karbon":"application/vnd.kde.karbon","kdbx":"application/x-keepass2","key":"application/x-iwork-keynote-sffkey","kfo":"application/vnd.kde.kformula","kia":"application/vnd.kidspiration","kml":"application/vnd.google-earth.kml+xml","kmz":"application/vnd.google-earth.kmz","kne":"application/vnd.kinar","knp":"application/vnd.kinar","kon":"application/vnd.kde.kontour","kpr":"application/vnd.kde.kpresenter","kpt":"application/vnd.kde.kpresenter","kpxx":"application/vnd.ds-keypoint","ksp":"application/vnd.kde.kspread","ktr":"application/vnd.kahootz","ktx":"image/ktx","ktx2":"image/ktx2","ktz":"application/vnd.kahootz","kwd":"application/vnd.kde.kword","kwt":"application/vnd.kde.kword","lasxml":"application/vnd.las.las+xml","latex":"application/x-latex","lbd":"application/vnd.llamagraphics.life-balance.desktop","lbe":"application/vnd.llamagraphics.life-balance.exchange+xml","les":"application/vnd.hhe.lesson-player","less":"text/less","lgr":"application/lgr+xml","lha":"application/x-lzh-compressed","link66":"application/vnd.route66.link66+xml","list":"text/plain","list3820":"application/vnd.ibm.modcap","listafp":"application/vnd.ibm.modcap","litcoffee":"text/coffeescript","lnk":"application/x-ms-shortcut","log":"text/plain","lostxml":"application/lost+xml","lrf":"application/octet-stream","lrm":"application/vnd.ms-lrm","ltf":"application/vnd.frogans.ltf","lua":"text/x-lua","luac":"application/x-lua-bytecode","lvp":"audio/vnd.lucent.voice","lwp":"application/vnd.lotus-wordpro","lzh":"application/x-lzh-compressed","m13":"application/x-msmediaview","m14":"application/x-msmediaview","m1v":"video/mpeg","m21":"application/mp21","m2a":"audio/mpeg","m2v":"video/mpeg","m3a":"audio/mpeg","m3u":"audio/x-mpegurl","m3u8":"application/vnd.apple.mpegurl","m4a":"audio/x-m4a","m4p":"application/mp4","m4s":"video/iso.segment","m4u":"video/vnd.mpegurl","m4v":"video/x-m4v","ma":"application/mathematica","mads":"application/mads+xml","maei":"application/mmt-aei+xml","mag":"application/vnd.ecowin.chart","maker":"application/vnd.framemaker","man":"text/troff","manifest":"text/cache-manifest","map":"application/json","mar":"application/octet-stream","markdown":"text/markdown","mathml":"application/mathml+xml","mb":"application/mathematica","mbk":"application/vnd.mobius.mbk","mbox":"application/mbox","mc1":"application/vnd.medcalcdata","mcd":"application/vnd.mcd","mcurl":"text/vnd.curl.mcurl","md":"text/markdown","mdb":"application/x-msaccess","mdi":"image/vnd.ms-modi","mdx":"text/mdx","me":"text/troff","mesh":"model/mesh","meta4":"application/metalink4+xml","metalink":"application/metalink+xml","mets":"application/mets+xml","mfm":"application/vnd.mfmp","mft":"application/rpki-manifest","mgp":"application/vnd.osgeo.mapguide.package","mgz":"application/vnd.proteus.magazine","mid":"audio/midi","midi":"audio/midi","mie":"application/x-mie","mif":"application/vnd.mif","mime":"message/rfc822","mj2":"video/mj2","mjp2":"video/mj2","mjs":"application/javascript","mk3d":"video/x-matroska","mka":"audio/x-matroska","mkd":"text/x-markdown","mks":"video/x-matroska","mkv":"video/x-matroska","mlp":"application/vnd.dolby.mlp","mmd":"application/vnd.chipnuts.karaoke-mmd","mmf":"application/vnd.smaf","mml":"text/mathml","mmr":"image/vnd.fujixerox.edmics-mmr","mng":"video/x-mng","mny":"application/x-msmoney","mobi":"application/x-mobipocket-ebook","mods":"application/mods+xml","mov":"video/quicktime","movie":"video/x-sgi-movie","mp2":"audio/mpeg","mp21":"application/mp21","mp2a":"audio/mpeg","mp3":"audio/mpeg","mp4":"video/mp4","mp4a":"audio/mp4","mp4s":"application/mp4","mp4v":"video/mp4","mpc":"application/vnd.mophun.certificate","mpd":"application/dash+xml","mpe":"video/mpeg","mpeg":"video/mpeg","mpg":"video/mpeg","mpg4":"video/mp4","mpga":"audio/mpeg","mpkg":"application/vnd.apple.installer+xml","mpm":"application/vnd.blueice.multipass","mpn":"application/vnd.mophun.application","mpp":"application/vnd.ms-project","mpt":"application/vnd.ms-project","mpy":"application/vnd.ibm.minipay","mqy":"application/vnd.mobius.mqy","mrc":"application/marc","mrcx":"application/marcxml+xml","ms":"text/troff","mscml":"application/mediaservercontrol+xml","mseed":"application/vnd.fdsn.mseed","mseq":"application/vnd.mseq","msf":"application/vnd.epson.msf","msg":"application/vnd.ms-outlook","msh":"model/mesh","msi":"application/x-msdownload","msl":"application/vnd.mobius.msl","msm":"application/octet-stream","msp":"application/octet-stream","msty":"application/vnd.muvee.style","mtl":"model/mtl","mts":"model/vnd.mts","mus":"application/vnd.musician","musd":"application/mmt-usd+xml","musicxml":"application/vnd.recordare.musicxml+xml","mvb":"application/x-msmediaview","mvt":"application/vnd.mapbox-vector-tile","mwf":"application/vnd.mfer","mxf":"application/mxf","mxl":"application/vnd.recordare.musicxml","mxmf":"audio/mobile-xmf","mxml":"application/xv+xml","mxs":"application/vnd.triscape.mxs","mxu":"video/vnd.mpegurl","n-gage":"application/vnd.nokia.n-gage.symbian.install","n3":"text/n3","nb":"application/mathematica","nbp":"application/vnd.wolfram.player","nc":"application/x-netcdf","ncx":"application/x-dtbncx+xml","nfo":"text/x-nfo","ngdat":"application/vnd.nokia.n-gage.data","nitf":"application/vnd.nitf","nlu":"application/vnd.neurolanguage.nlu","nml":"application/vnd.enliven","nnd":"application/vnd.noblenet-directory","nns":"application/vnd.noblenet-sealer","nnw":"application/vnd.noblenet-web","npx":"image/vnd.net-fpx","nq":"application/n-quads","nsc":"application/x-conference","nsf":"application/vnd.lotus-notes","nt":"application/n-triples","ntf":"application/vnd.nitf","numbers":"application/x-iwork-numbers-sffnumbers","nzb":"application/x-nzb","oa2":"application/vnd.fujitsu.oasys2","oa3":"application/vnd.fujitsu.oasys3","oas":"application/vnd.fujitsu.oasys","obd":"application/x-msbinder","obgx":"application/vnd.openblox.game+xml","obj":"model/obj","oda":"application/oda","odb":"application/vnd.oasis.opendocument.database","odc":"application/vnd.oasis.opendocument.chart","odf":"application/vnd.oasis.opendocument.formula","odft":"application/vnd.oasis.opendocument.formula-template","odg":"application/vnd.oasis.opendocument.graphics","odi":"application/vnd.oasis.opendocument.image","odm":"application/vnd.oasis.opendocument.text-master","odp":"application/vnd.oasis.opendocument.presentation","ods":"application/vnd.oasis.opendocument.spreadsheet","odt":"application/vnd.oasis.opendocument.text","oga":"audio/ogg","ogex":"model/vnd.opengex","ogg":"audio/ogg","ogv":"video/ogg","ogx":"application/ogg","omdoc":"application/omdoc+xml","onepkg":"application/onenote","onetmp":"application/onenote","onetoc":"application/onenote","onetoc2":"application/onenote","opf":"application/oebps-package+xml","opml":"text/x-opml","oprc":"application/vnd.palm","opus":"audio/ogg","org":"text/x-org","osf":"application/vnd.yamaha.openscoreformat","osfpvg":"application/vnd.yamaha.openscoreformat.osfpvg+xml","osm":"application/vnd.openstreetmap.data+xml","otc":"application/vnd.oasis.opendocument.chart-template","otf":"font/otf","otg":"application/vnd.oasis.opendocument.graphics-template","oth":"application/vnd.oasis.opendocument.text-web","oti":"application/vnd.oasis.opendocument.image-template","otp":"application/vnd.oasis.opendocument.presentation-template","ots":"application/vnd.oasis.opendocument.spreadsheet-template","ott":"application/vnd.oasis.opendocument.text-template","ova":"application/x-virtualbox-ova","ovf":"application/x-virtualbox-ovf","owl":"application/rdf+xml","oxps":"application/oxps","oxt":"application/vnd.openofficeorg.extension","p":"text/x-pascal","p10":"application/pkcs10","p12":"application/x-pkcs12","p7b":"application/x-pkcs7-certificates","p7c":"application/pkcs7-mime","p7m":"application/pkcs7-mime","p7r":"application/x-pkcs7-certreqresp","p7s":"application/pkcs7-signature","p8":"application/pkcs8","pac":"application/x-ns-proxy-autoconfig","pages":"application/x-iwork-pages-sffpages","pas":"text/x-pascal","paw":"application/vnd.pawaafile","pbd":"application/vnd.powerbuilder6","pbm":"image/x-portable-bitmap","pcap":"application/vnd.tcpdump.pcap","pcf":"application/x-font-pcf","pcl":"application/vnd.hp-pcl","pclxl":"application/vnd.hp-pclxl","pct":"image/x-pict","pcurl":"application/vnd.curl.pcurl","pcx":"image/x-pcx","pdb":"application/x-pilot","pde":"text/x-processing","pdf":"application/pdf","pem":"application/x-x509-ca-cert","pfa":"application/x-font-type1","pfb":"application/x-font-type1","pfm":"application/x-font-type1","pfr":"application/font-tdpfr","pfx":"application/x-pkcs12","pgm":"image/x-portable-graymap","pgn":"application/x-chess-pgn","pgp":"application/pgp-encrypted","php":"application/x-httpd-php","pic":"image/x-pict","pkg":"application/octet-stream","pki":"application/pkixcmp","pkipath":"application/pkix-pkipath","pkpass":"application/vnd.apple.pkpass","pl":"application/x-perl","plb":"application/vnd.3gpp.pic-bw-large","plc":"application/vnd.mobius.plc","plf":"application/vnd.pocketlearn","pls":"application/pls+xml","pm":"application/x-perl","pml":"application/vnd.ctc-posml","png":"image/png","pnm":"image/x-portable-anymap","portpkg":"application/vnd.macports.portpkg","pot":"application/vnd.ms-powerpoint","potm":"application/vnd.ms-powerpoint.template.macroenabled.12","potx":"application/vnd.openxmlformats-officedocument.presentationml.template","ppam":"application/vnd.ms-powerpoint.addin.macroenabled.12","ppd":"application/vnd.cups-ppd","ppm":"image/x-portable-pixmap","pps":"application/vnd.ms-powerpoint","ppsm":"application/vnd.ms-powerpoint.slideshow.macroenabled.12","ppsx":"application/vnd.openxmlformats-officedocument.presentationml.slideshow","ppt":"application/vnd.ms-powerpoint","pptm":"application/vnd.ms-powerpoint.presentation.macroenabled.12","pptx":"application/vnd.openxmlformats-officedocument.presentationml.presentation","pqa":"application/vnd.palm","prc":"application/x-pilot","pre":"application/vnd.lotus-freelance","prf":"application/pics-rules","provx":"application/provenance+xml","ps":"application/postscript","psb":"application/vnd.3gpp.pic-bw-small","psd":"image/vnd.adobe.photoshop","psf":"application/x-font-linux-psf","pskcxml":"application/pskc+xml","pti":"image/prs.pti","ptid":"application/vnd.pvi.ptid1","pub":"application/x-mspublisher","pvb":"application/vnd.3gpp.pic-bw-var","pwn":"application/vnd.3m.post-it-notes","pya":"audio/vnd.ms-playready.media.pya","pyv":"video/vnd.ms-playready.media.pyv","qam":"application/vnd.epson.quickanime","qbo":"application/vnd.intu.qbo","qfx":"application/vnd.intu.qfx","qps":"application/vnd.publishare-delta-tree","qt":"video/quicktime","qwd":"application/vnd.quark.quarkxpress","qwt":"application/vnd.quark.quarkxpress","qxb":"application/vnd.quark.quarkxpress","qxd":"application/vnd.quark.quarkxpress","qxl":"application/vnd.quark.quarkxpress","qxt":"application/vnd.quark.quarkxpress","ra":"audio/x-realaudio","ram":"audio/x-pn-realaudio","raml":"application/raml+yaml","rapd":"application/route-apd+xml","rar":"application/x-rar-compressed","ras":"image/x-cmu-raster","rcprofile":"application/vnd.ipunplugged.rcprofile","rdf":"application/rdf+xml","rdz":"application/vnd.data-vision.rdz","relo":"application/p2p-overlay+xml","rep":"application/vnd.businessobjects","res":"application/x-dtbresource+xml","rgb":"image/x-rgb","rif":"application/reginfo+xml","rip":"audio/vnd.rip","ris":"application/x-research-info-systems","rl":"application/resource-lists+xml","rlc":"image/vnd.fujixerox.edmics-rlc","rld":"application/resource-lists-diff+xml","rm":"application/vnd.rn-realmedia","rmi":"audio/midi","rmp":"audio/x-pn-realaudio-plugin","rms":"application/vnd.jcp.javame.midlet-rms","rmvb":"application/vnd.rn-realmedia-vbr","rnc":"application/relax-ng-compact-syntax","rng":"application/xml","roa":"application/rpki-roa","roff":"text/troff","rp9":"application/vnd.cloanto.rp9","rpm":"application/x-redhat-package-manager","rpss":"application/vnd.nokia.radio-presets","rpst":"application/vnd.nokia.radio-preset","rq":"application/sparql-query","rs":"application/rls-services+xml","rsat":"application/atsc-rsat+xml","rsd":"application/rsd+xml","rsheet":"application/urc-ressheet+xml","rss":"application/rss+xml","rtf":"text/rtf","rtx":"text/richtext","run":"application/x-makeself","rusd":"application/route-usd+xml","s":"text/x-asm","s3m":"audio/s3m","saf":"application/vnd.yamaha.smaf-audio","sass":"text/x-sass","sbml":"application/sbml+xml","sc":"application/vnd.ibm.secure-container","scd":"application/x-msschedule","scm":"application/vnd.lotus-screencam","scq":"application/scvp-cv-request","scs":"application/scvp-cv-response","scss":"text/x-scss","scurl":"text/vnd.curl.scurl","sda":"application/vnd.stardivision.draw","sdc":"application/vnd.stardivision.calc","sdd":"application/vnd.stardivision.impress","sdkd":"application/vnd.solent.sdkm+xml","sdkm":"application/vnd.solent.sdkm+xml","sdp":"application/sdp","sdw":"application/vnd.stardivision.writer","sea":"application/x-sea","see":"application/vnd.seemail","seed":"application/vnd.fdsn.seed","sema":"application/vnd.sema","semd":"application/vnd.semd","semf":"application/vnd.semf","senmlx":"application/senml+xml","sensmlx":"application/sensml+xml","ser":"application/java-serialized-object","setpay":"application/set-payment-initiation","setreg":"application/set-registration-initiation","sfd-hdstx":"application/vnd.hydrostatix.sof-data","sfs":"application/vnd.spotfire.sfs","sfv":"text/x-sfv","sgi":"image/sgi","sgl":"application/vnd.stardivision.writer-global","sgm":"text/sgml","sgml":"text/sgml","sh":"application/x-sh","shar":"application/x-shar","shex":"text/shex","shf":"application/shf+xml","shtml":"text/html","sid":"image/x-mrsid-image","sieve":"application/sieve","sig":"application/pgp-signature","sil":"audio/silk","silo":"model/mesh","sis":"application/vnd.symbian.install","sisx":"application/vnd.symbian.install","sit":"application/x-stuffit","sitx":"application/x-stuffitx","siv":"application/sieve","skd":"application/vnd.koan","skm":"application/vnd.koan","skp":"application/vnd.koan","skt":"application/vnd.koan","sldm":"application/vnd.ms-powerpoint.slide.macroenabled.12","sldx":"application/vnd.openxmlformats-officedocument.presentationml.slide","slim":"text/slim","slm":"text/slim","sls":"application/route-s-tsid+xml","slt":"application/vnd.epson.salt","sm":"application/vnd.stepmania.stepchart","smf":"application/vnd.stardivision.math","smi":"application/smil+xml","smil":"application/smil+xml","smv":"video/x-smv","smzip":"application/vnd.stepmania.package","snd":"audio/basic","snf":"application/x-font-snf","so":"application/octet-stream","spc":"application/x-pkcs7-certificates","spdx":"text/spdx","spf":"application/vnd.yamaha.smaf-phrase","spl":"application/x-futuresplash","spot":"text/vnd.in3d.spot","spp":"application/scvp-vp-response","spq":"application/scvp-vp-request","spx":"audio/ogg","sql":"application/x-sql","src":"application/x-wais-source","srt":"application/x-subrip","sru":"application/sru+xml","srx":"application/sparql-results+xml","ssdl":"application/ssdl+xml","sse":"application/vnd.kodak-descriptor","ssf":"application/vnd.epson.ssf","ssml":"application/ssml+xml","st":"application/vnd.sailingtracker.track","stc":"application/vnd.sun.xml.calc.template","std":"application/vnd.sun.xml.draw.template","stf":"application/vnd.wt.stf","sti":"application/vnd.sun.xml.impress.template","stk":"application/hyperstudio","stl":"model/stl","stpx":"model/step+xml","stpxz":"model/step-xml+zip","stpz":"model/step+zip","str":"application/vnd.pg.format","stw":"application/vnd.sun.xml.writer.template","styl":"text/stylus","stylus":"text/stylus","sub":"text/vnd.dvb.subtitle","sus":"application/vnd.sus-calendar","susp":"application/vnd.sus-calendar","sv4cpio":"application/x-sv4cpio","sv4crc":"application/x-sv4crc","svc":"application/vnd.dvb.service","svd":"application/vnd.svd","svg":"image/svg+xml","svgz":"image/svg+xml","swa":"application/x-director","swf":"application/x-shockwave-flash","swi":"application/vnd.aristanetworks.swi","swidtag":"application/swid+xml","sxc":"application/vnd.sun.xml.calc","sxd":"application/vnd.sun.xml.draw","sxg":"application/vnd.sun.xml.writer.global","sxi":"application/vnd.sun.xml.impress","sxm":"application/vnd.sun.xml.math","sxw":"application/vnd.sun.xml.writer","t":"text/troff","t3":"application/x-t3vm-image","t38":"image/t38","taglet":"application/vnd.mynfc","tao":"application/vnd.tao.intent-module-archive","tap":"image/vnd.tencent.tap","tar":"application/x-tar","tcap":"application/vnd.3gpp2.tcap","tcl":"application/x-tcl","td":"application/urc-targetdesc+xml","teacher":"application/vnd.smart.teacher","tei":"application/tei+xml","teicorpus":"application/tei+xml","tex":"application/x-tex","texi":"application/x-texinfo","texinfo":"application/x-texinfo","text":"text/plain","tfi":"application/thraud+xml","tfm":"application/x-tex-tfm","tfx":"image/tiff-fx","tga":"image/x-tga","thmx":"application/vnd.ms-officetheme","tif":"image/tiff","tiff":"image/tiff","tk":"application/x-tcl","tmo":"application/vnd.tmobile-livetv","toml":"application/toml","torrent":"application/x-bittorrent","tpl":"application/vnd.groove-tool-template","tpt":"application/vnd.trid.tpt","tr":"text/troff","tra":"application/vnd.trueapp","trig":"application/trig","trm":"application/x-msterminal","ts":"video/mp2t","tsd":"application/timestamped-data","tsv":"text/tab-separated-values","ttc":"font/collection","ttf":"font/ttf","ttl":"text/turtle","ttml":"application/ttml+xml","twd":"application/vnd.simtech-mindmapper","twds":"application/vnd.simtech-mindmapper","txd":"application/vnd.genomatix.tuxedo","txf":"application/vnd.mobius.txf","txt":"text/plain","u32":"application/x-authorware-bin","u8dsn":"message/global-delivery-status","u8hdr":"message/global-headers","u8mdn":"message/global-disposition-notification","u8msg":"message/global","ubj":"application/ubjson","udeb":"application/x-debian-package","ufd":"application/vnd.ufdl","ufdl":"application/vnd.ufdl","ulx":"application/x-glulx","umj":"application/vnd.umajin","unityweb":"application/vnd.unity","uoml":"application/vnd.uoml+xml","uri":"text/uri-list","uris":"text/uri-list","urls":"text/uri-list","usdz":"model/vnd.usdz+zip","ustar":"application/x-ustar","utz":"application/vnd.uiq.theme","uu":"text/x-uuencode","uva":"audio/vnd.dece.audio","uvd":"application/vnd.dece.data","uvf":"application/vnd.dece.data","uvg":"image/vnd.dece.graphic","uvh":"video/vnd.dece.hd","uvi":"image/vnd.dece.graphic","uvm":"video/vnd.dece.mobile","uvp":"video/vnd.dece.pd","uvs":"video/vnd.dece.sd","uvt":"application/vnd.dece.ttml+xml","uvu":"video/vnd.uvvu.mp4","uvv":"video/vnd.dece.video","uvva":"audio/vnd.dece.audio","uvvd":"application/vnd.dece.data","uvvf":"application/vnd.dece.data","uvvg":"image/vnd.dece.graphic","uvvh":"video/vnd.dece.hd","uvvi":"image/vnd.dece.graphic","uvvm":"video/vnd.dece.mobile","uvvp":"video/vnd.dece.pd","uvvs":"video/vnd.dece.sd","uvvt":"application/vnd.dece.ttml+xml","uvvu":"video/vnd.uvvu.mp4","uvvv":"video/vnd.dece.video","uvvx":"application/vnd.dece.unspecified","uvvz":"application/vnd.dece.zip","uvx":"application/vnd.dece.unspecified","uvz":"application/vnd.dece.zip","vbox":"application/x-virtualbox-vbox","vbox-extpack":"application/x-virtualbox-vbox-extpack","vcard":"text/vcard","vcd":"application/x-cdlink","vcf":"text/x-vcard","vcg":"application/vnd.groove-vcard","vcs":"text/x-vcalendar","vcx":"application/vnd.vcx","vdi":"application/x-virtualbox-vdi","vds":"model/vnd.sap.vds","vhd":"application/x-virtualbox-vhd","vis":"application/vnd.visionary","viv":"video/vnd.vivo","vmdk":"application/x-virtualbox-vmdk","vob":"video/x-ms-vob","vor":"application/vnd.stardivision.writer","vox":"application/x-authorware-bin","vrml":"model/vrml","vsd":"application/vnd.visio","vsf":"application/vnd.vsf","vss":"application/vnd.visio","vst":"application/vnd.visio","vsw":"application/vnd.visio","vtf":"image/vnd.valve.source.texture","vtt":"text/vtt","vtu":"model/vnd.vtu","vxml":"application/voicexml+xml","w3d":"application/x-director","wad":"application/x-doom","wadl":"application/vnd.sun.wadl+xml","war":"application/java-archive","wasm":"application/wasm","wav":"audio/x-wav","wax":"audio/x-ms-wax","wbmp":"image/vnd.wap.wbmp","wbs":"application/vnd.criticaltools.wbs+xml","wbxml":"application/vnd.wap.wbxml","wcm":"application/vnd.ms-works","wdb":"application/vnd.ms-works","wdp":"image/vnd.ms-photo","weba":"audio/webm","webapp":"application/x-web-app-manifest+json","webm":"video/webm","webmanifest":"application/manifest+json","webp":"image/webp","wg":"application/vnd.pmi.widget","wgt":"application/widget","wks":"application/vnd.ms-works","wm":"video/x-ms-wm","wma":"audio/x-ms-wma","wmd":"application/x-ms-wmd","wmf":"image/wmf","wml":"text/vnd.wap.wml","wmlc":"application/vnd.wap.wmlc","wmls":"text/vnd.wap.wmlscript","wmlsc":"application/vnd.wap.wmlscriptc","wmv":"video/x-ms-wmv","wmx":"video/x-ms-wmx","wmz":"application/x-msmetafile","wof":"font/woff","woff":"font/woff","wof2":"font/woff2","woff2":"font/woff2","wpd":"application/vnd.wordperfect","wpl":"application/vnd.ms-wpl","wps":"application/vnd.ms-works","wqd":"application/vnd.wqd","wri":"application/x-mswrite","wrl":"model/vrml","wsc":"message/vnd.wfa.wsc","wsdl":"application/wsdl+xml","wspolicy":"application/wspolicy+xml","wtb":"application/vnd.webturbo","wvx":"video/x-ms-wvx","x32":"application/x-authorware-bin","x3d":"model/x3d+xml","x3db":"model/x3d+fastinfoset","x3dbz":"model/x3d+binary","x3dv":"model/x3d-vrml","x3dvz":"model/x3d+vrml","x3dz":"model/x3d+xml","x_b":"model/vnd.parasolid.transmit.binary","x_t":"model/vnd.parasolid.transmit.text","xaml":"application/xaml+xml","xap":"application/x-silverlight-app","xar":"application/vnd.xara","xav":"application/xcap-att+xml","xbap":"application/x-ms-xbap","xbd":"application/vnd.fujixerox.docuworks.binder","xbm":"image/x-xbitmap","xca":"application/xcap-caps+xml","xcs":"application/calendar+xml","xdf":"application/xcap-diff+xml","xdm":"application/vnd.syncml.dm+xml","xdp":"application/vnd.adobe.xdp+xml","xdssc":"application/dssc+xml","xdw":"application/vnd.fujixerox.docuworks","xel":"application/xcap-el+xml","xenc":"application/xenc+xml","xer":"application/patch-ops-error+xml","xfdf":"application/vnd.adobe.xfdf","xfdl":"application/vnd.xfdl","xht":"application/xhtml+xml","xhtml":"application/xhtml+xml","xhvml":"application/xv+xml","xif":"image/vnd.xiff","xla":"application/vnd.ms-excel","xlam":"application/vnd.ms-excel.addin.macroenabled.12","xlc":"application/vnd.ms-excel","xlf":"application/xliff+xml","xlm":"application/vnd.ms-excel","xls":"application/vnd.ms-excel","xlsb":"application/vnd.ms-excel.sheet.binary.macroenabled.12","xlsm":"application/vnd.ms-excel.sheet.macroenabled.12","xlsx":"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","xlt":"application/vnd.ms-excel","xltm":"application/vnd.ms-excel.template.macroenabled.12","xltx":"application/vnd.openxmlformats-officedocument.spreadsheetml.template","xlw":"application/vnd.ms-excel","xm":"audio/xm","xml":"text/xml","xns":"application/xcap-ns+xml","xo":"application/vnd.olpc-sugar","xop":"application/xop+xml","xpi":"application/x-xpinstall","xpl":"application/xproc+xml","xpm":"image/x-xpixmap","xpr":"application/vnd.is-xpr","xps":"application/vnd.ms-xpsdocument","xpw":"application/vnd.intercon.formnet","xpx":"application/vnd.intercon.formnet","xsd":"application/xml","xsl":"application/xslt+xml","xslt":"application/xslt+xml","xsm":"application/vnd.syncml+xml","xspf":"application/xspf+xml","xul":"application/vnd.mozilla.xul+xml","xvm":"application/xv+xml","xvml":"application/xv+xml","xwd":"image/x-xwindowdump","xyz":"chemical/x-xyz","xz":"application/x-xz","yaml":"text/yaml","yang":"application/yang","yin":"application/yin+xml","yml":"text/yaml","ymp":"text/x-suse-ymp","z1":"application/x-zmachine","z2":"application/x-zmachine","z3":"application/x-zmachine","z4":"application/x-zmachine","z5":"application/x-zmachine","z6":"application/x-zmachine","z7":"application/x-zmachine","z8":"application/x-zmachine","zaz":"application/vnd.zzazz.deck+xml","zip":"application/zip","zir":"application/vnd.zul","zirz":"application/vnd.zul","zmm":"application/vnd.handheld-entertainment+xml"}});


/* PACKED :: $/core/Client/client.driver.mjs : starts */




// readme :: scoped : info
// ----------------------------------------------------------------------------------------------------------------------------
// ============================================================================================================================






// define :: Client : aspect
// ----------------------------------------------------------------------------------------------------------------------------
    Global.Client = Plexus( function Client (){} );
// ============================================================================================================================






// extend :: Client : miming
// ----------------------------------------------------------------------------------------------------------------------------
    Client.extend
    ({
        miming ( string, detect="" )
        {
            let config = this.config( "miming" );
                string+= ""; // force toString or fail
            let output;


            Object.filter( config, (aspect,detail)=>
            {
                if ( (typeof aspect) !== "string" )
                { return }; // continue

                if ( !aspect.includes("*") )
                {
                    if ( aspect === string )
                    { output = detail;  return FINISH }; // break

                    return; // continue
                };


                if ( aspect.endsWith("*") && string.startsWith(aspect.slice(0,-1)) )
                { output = detail;  return FINISH }; // break

                if ( aspect.startsWith("*") && string.endsWith(aspect.slice(1)) )
                { output = detail;  return FINISH }; // break
            });


            return ( output || config["text/*"] );
        },
    });
// ============================================================================================================================






/* PACKED :: $/core/Client/client.driver.mjs : finish */







/* PACKED :: $/core/Client/client@client.mjs : starts */




// readme :: scoped : info
// ----------------------------------------------------------------------------------------------------------------------------
// ============================================================================================================================






// import :: Server : aspect
// ----------------------------------------------------------------------------------------------------------------------------
    // import "./client.assets.dir/config/config.miming.mjs";
    // import "/$/user/client/config/client.config@client.mjs";
// ============================================================================================================================






// extend :: Client : import
// ----------------------------------------------------------------------------------------------------------------------------
    Client.extend
    ({
        async import ( target )
        {
            target += "";

            let object = String.parsed( target, "target" );
            let miming = Server.miming( target );
            let supply = { symbol:"icon-tools-report-bug", tagged:"iframe", target:"src" };
            let relate = Object.supply( (Client.miming(miming) || {}), supply );
            let output = Create( relate.tagged );

            Script.output( `${target}  ${relate.tagged}  ${relate.target}` );


            return new Promise( function awaits ( accept, reject )
            {
                if ( this.relate.aspect === "innerHTML" )
                {
                    Server.select( this.target ).then(( result )=>
                    {
                        this.output.innerHTML = result;
                        accept( this.output );
                    });
                }
                else
                {
                    this.output[this.relate.aspect] = this.target;
                    accept( this.output );
                };
            }
            .bind({ target, relate, output }));
        }
    });
// ============================================================================================================================





// define :: CRUD
// ----------------------------------------------------------------------------------------------------------------------------
    Create.listen
    ({
        run ( signal )
        {
            let intake = signal.detail[0];
            let detail = (signal.detail[1] || {});
            let insert = signal.detail[2];
            let entity = document.createElement( intake );
            let detect = ( typeof insert );


            Object.keys( detail ).map(( aspect )=>
            {
                entity.setAttribute( aspect, detail[aspect] );
            });


            switch ( true )
            {
                case (detect === "string") : entity.innerHTML = insert;  break;
                case (insert instanceof HTMLElement) : entity.appendChild(insert); break;
            };


            return entity;
        },
    });
// ============================================================================================================================





// define :: CRUD
// ----------------------------------------------------------------------------------------------------------------------------
    Select.listen
    ({
        run ( signal )
        {
            let intake = signal.detail[0],  parent = signal.detail[1],  incAll = signal.detail[2];
            let relate = ( intake || 0 ).constructor.name; // string name
            let output = [],  detect,  result,  filter = [],  family,  ignore;


            if ( Object.detect(parent,"boolean array function") )
            {
                incAll = parent;
                parent = undefined;
            };


            parent = ( parent || document );
            detect = Object.detect( incAll );


            // if ( relate.startsWith("HTML") && ((typeof parent) === "string") && (detect === "number") )
            // {
            //     parent = ( parent.startsWith(".") ? parent.slice(1) : parent );
            //     output = intake;
            //     incAll = ( (incAll < 0) ? 0 : incAll );
            //
            //     while ( incAll > 0 )
            //     {
            //         incAll--;
            //         output = output[parent];
            //     };
            //
            //     return output; // selected parent
            // };


            if ( (typeof intake) === "function" )
            {
                ([ ...(parent.childNodes) ]).map(( object )=>
                {
                    if ( object.constructor.name === intake.name )
                    {
                        if ( (incAll === true) || ((detect === "function") && !!incAll(object)) )
                        { output.push(object) };

                        return;
                    };


                    if ( object.childNodes.length > 0 )
                    { Select(intake,object,incAll).map((entity)=>{output.push(entity)}) };
                });


                return output;
            };


            intake += "";


            if ( intake.startsWith("*") )
            {
                intake = (intake.slice(1) || "*");

                if ( intake === "*" )
                { return [...(parent.childNodes)] };

                if ( incAll === undefined )
                { incAll = true };
            };


            if ( (typeof incAll) === "string" )
            { incAll = incAll.split(",") };

            detect = Object.detect( incAll );


            try
            {
                intake.split(",").map(( select )=>
                {
                    [ ...(parent.querySelectorAll(select.trim())) ].map(( object )=>
                    { output.push(object) }); // NB :: result order as selected order
                });
            }
            catch( failed )
            { dump(failed) };


            if ( !incAll || (incAll === true) )
            {
                if ( !!incAll )
                { return output };

                return ( (output[0] !== undefined) ? output[0] : null );
            };


            filter = output;
            output = [];


            filter.map(( entity )=>
            {
                if ( detect === "function" )
                {
                    result = incAll( entity );

                    if ( result === true )
                    { return output.push(entity) };

                    if ( !([undefined,false,null]).includes(result) )
                    { return output.push(result) };

                    return; // function handling (filtering) ended .. though incAll as array proceeds below
                }
                else if ( detect !== "array" )
                { return output.push(entity) }; // .. the code below expects incAll as array


                for ( family of incAll )
                {
                    ignore = family.startsWith("!");
                    family = ( ignore ? family.slice(1) : family );
                    relate = entity.relate( family );

                    if ( !((ignore && relate) || (!ignore && !relate)) )
                    { output.push(entity);  break; };
                };
            });


            return ( (output[0] !== undefined) ? output[0] : null );
        },
    });
// ============================================================================================================================





// refine :: Update : call
// ----------------------------------------------------------------------------------------------------------------------------
    Update.listen
    ({
        run ( signal )
        {
            var stored = Device.memory( "intake" ).window;
            var backup = stored.o;

            if ( signal.detail.length > 0 )
            { return }; // not for this implementation

            stored.w = window.innerWidth;
            stored.h = window.innerHeight;
            stored.o = ( (stored.w >= stored.h) ? "landscape" : "portrait" );

            if ( stored.o !== backup )
            { Update.signal("screenLayoutChanged", stored) };


            Update.signal( "removeDudWhitespace" );
            Update.signal( "importContentTarget" );
            Update.signal( "enableResizeHandles" );
        },
    });
// ============================================================================================================================






// refine :: Update : call
// ----------------------------------------------------------------------------------------------------------------------------
    Update.listen
    ({
        removeDudWhitespace ( signal )
        {
            Remove( Text, document.body, (entity)=>{return (entity.data.trim() === "")} );
            return true; // handled
        }
    })
// ============================================================================================================================






// refine :: Update : importContentTarget
// ----------------------------------------------------------------------------------------------------------------------------
    Update.listen
    ({
        importContentTarget ( signal )
        {
            var loaded = [ 0, 0 ];
            var finish = true; // assume we are finished .. to be updated during loop below


            Select( '*[content]' ).map(( entity )=>
            {
                let target = entity.aspect( "content" );

                if ( !String.detect(target,"target") || (entity.contentAspectLoaded === true) )
                { return }; // not for us, or already done

                loaded[1]++;

                Client.import( target ).then( (function awaits( result )
                {
                    loaded[0]++;
                    entity.contentAspectLoaded = true;

                    if ( !result.innerHTML )
                    { return this.entity.append(result) };

                    this.entity.innerHTML = result.innerHTML;
                    finish = false;
                }
                .bind( {entity} )));
            });


            Function.awaits( ()=>{ return ( !!loaded[1] && (loaded[0] === loaded[1]) ) } ).then(()=>
            {
                if ( !finish )
                { Update.signal("importContentTarget") }; // html was impoerted -which may contain other content-targets
            });


            return true; // handled
        }
    })
// ============================================================================================================================






// refine :: Update : enableResizeHandles
// ----------------------------------------------------------------------------------------------------------------------------
    Update.listen
    ({
        enableResizeHandles ( signal )
        {
            Select( '*[resize]' ).map(( entity )=>
            {
                let target = Select( entity.aspect("resize") );

                if ( !!entity.resizeHandleActive )
                { return }; // already done

                if ( !target.parentNode.styled("display").includes("flex") )
                { return moan("expecting resize target's parentNode to be styled e.g: display:flex ") };


                entity.append
                ([
                    $DOM.div( {class:"icon-ellipsis-v wide cenmid inactive"} ),
                    $DOM.div( {class:"icon-ellipsis-h tall cenmid inactive"} ),
                ]);


                entity.resizeHandleActive = true;


                entity.listen
                ({
                    dragmove ( signal )
                    {
                        Screen.canvas.styled( {cursor:this.styled("cursor")} );

                        let target = Select( this.aspect("resize") );
                        let option = String.parsed( this.aspect("adjust"), "object" );
                        let invert = option.invert;
                            signal = signal.detail;
                        let differ = signal.differ;
                        let aspect = String.toCase( (option.locked || option[Device.memory("intake").window.o]), "title" );

                        let exists = target[ ("offset" + aspect) ];
                        let onAxis = ( (aspect === "Width") ? "x" : "y" );
                        let number = differ[ onAxis ];
                            number = ( invert ? (number * -1) : number );
                        let update = ( exists + number );

                        target.styled( {flex:`0 0 ${update}px`} );
                    },


                    click ( signal )
                    {
                        Timing.awaits(0).then(()=>
                        {
                            if ( signal.defaultPrevented === true )
                            { return }; // ignored .. probably from dragmove + mouseup

                            let target = Select( this.aspect("resize") );
                            let shrunk = target.relate( "minified" );
                            let method = ( shrunk ? "declan" : "enclan" );

                            target[ method ]( "minified" );
                        });
                    }
                });
            });
        }
    });
// ============================================================================================================================






// define :: CRUD
// ----------------------------------------------------------------------------------------------------------------------------
    Exists.listen
    ({
        run ( signal )
        {
            let exists = Select( ...(signal.detail) );

            if ( Array.isArray(exists) )
            { exists = exists[0] };

            return (!!(exists));
        },
    });
// ============================================================================================================================





// define :: CRUD
// ----------------------------------------------------------------------------------------------------------------------------
    Remove.listen
    ({
        run ( signal )
        {
            let intake = signal.detail[0],  parent = signal.detail[1],  incAll = signal.detail[2];


            if ( (typeof parent) === "boolean" )
            {
                incAll = parent;
                parent = undefined;
            };


            let detect = ( signal.detail.map(( detail )=>{ return (typeof detail).slice(0,3) }) ).join(",");
            let relate = ( intake || 0 ).constructor.name; // string name
            let select = ( (relate === "String") || (detect === "obj,str,num") || (detect === "fun,obj,fun") );
                incAll = ( (incAll !== undefined) ? incAll : ((relate === "String") && intake.startsWith("*")) );
            let output = [],  result;


            switch ( true )
            {
                case ( !intake ) : return; // invalid selection
                case ( select ) : intake = Select(intake,parent,incAll);  break;
                case ( relate === "NodeList" ) : intake = [...intake];  break;
            };


            if ( !Array.isArray(intake) )
            {
                // relate = ( intake || 0 ).constructor.name;  // may have changed above in switch case ( select )

                if ( !intake || !intake.parentNode )
                { return }; // nothing to do

                intake.parentNode.removeChild( intake );
                return intake;
            };


            intake.map(( detail )=>
            {
                result = Remove( detail, parent, incAll );

                if ( !Array.isArray( result) )
                { return output.push(result) };

                result.map(( object )=>{ output.push(object) });
            });


            return ( incAll ? output : output[0] );
        },
    });
// ============================================================================================================================






// listen :: Device : window resize idling
// ----------------------------------------------------------------------------------------------------------------------------
    Device.listen
    ({
        [ "window resize idling" ] ( signal )
        {
            Update()
        },
    });
// ============================================================================================================================





// evolve :: HTML+SVG -Element.prototype : relax .. this won't hurt .. much
// ----------------------------------------------------------------------------------------------------------------------------
    void ([ HTMLElement.prototype, SVGElement.prototype ]).map(( protos )=>
    {
        Object.extend( protos,
        {
            append ( listed )
            {
                let entity = ( this[LINKED] ? this[ENTITY] : this ); // prevents "illegal invocation" on Plexus

                try { listed = [...listed] } catch ( thrown ){ listed = [listed] }; // for NodeList, HTMLCollection, Array, etc.


                listed.map(( object )=>
                {
                    if ( !!object && !!object[ENTITY] )
                    { object = object[ENTITY] }

                    let naming = ( object || 0 ).constructor.name;

                    if ( !(naming.startsWith("HTML") && naming.endsWith("Element")) )
                    { object = Create("code", {}, (object+"")) };

                    entity.appendChild( object );
                });


                return this;
            },



            assign ( intake )
            {
                Object.keys( intake ).map(( aspect )=>
                {
                    this[ aspect ] = intake[ aspect ];
                });

                return this;
            },



            aspect ( intake )
            {
                let detect = ( typeof intake );
                let entity = ( this[LINKED] ? this[ENTITY] : this );
                let detail;


                if ( detect === "string" )
                {
                    detail = entity.getAttribute( intake );
                    return ( (detail==="") ? true : (detail||undefined) );
                };


                if ( !intake || (detect !== "object") )
                { return dump("invalid intake") };


                Object.keys( intake ).map(( naming )=>
                {
                    detail = intake[naming];

                    if ( ([null,undefined]).includes(detail) )
                    { entity.removeAttribute(naming) }
                    else
                    { entity.setAttribute(naming, detail) };
                });


                return this;
            },



            enclan ( )
            {
                let invite = ([ ...arguments ]).join(" ").trim().split(" ");
                let exists = (this.className+"").trim().split(" ");
                let result = Object.keys( Object.invert([ ...exists, ...invite ]) ).join(" ").trim();
                let affirm = this.signal( ("enclan "+invite.join(" ").trim()) );

                if ( affirm === false )
                { return this };

                this.className = result;
                return this;
            },



            declan ( )
            {
                let banish = ([ ...arguments ]).join(" ").trim().split(" ");
                let exists = Object.invert( (this.className+"").trim().split(" ") );

                banish.map(( family )=>
                { delete exists[family] });

                let result = Object.keys( exists ).join(" ").trim();
                let affirm = this.signal( ("declan "+banish.join(" ").trim()) );

                if ( affirm === false )
                { return this };

                this.className = result;
                return this;
            },



            reclan ( banish, invite )
            {
                let detect = ((typeof banish) + "," + (typeof invite)).slice(0,13);

                if ( detect === "string,string" )
                {
                    this.declan( banish );
                    this.enclan( invite );
                }
                else if ( !!banish && (detect === "object,undefi") )
                {
                    Object.keys( banish ).map(( relate )=>
                    { this.reclan( relate, banish[relate] ) });
                };

                return this;
            },



            relate ( )
            {
                let intake = ([ ...arguments ]).join(" ").trim().split(" ");
                let joined = intake.join("");
                let length = intake.length;
                let number = 0;
                let output = 0;

                // if ( joined.length < 1 )
                // { return (this.className+"").split(" ") };

                switch ( joined )
                {
                    case "" : return output;
                    case "*" : return (this.className+"");
                };

                intake.map(( family, number )=>
                {
                    if ( (this.className+"").includes(family+"") )
                    {
                        number ++;
                        output = ( number / length );
                    };
                });

                return output;
            },



            belong ( legacy, parent=undefined, levels=999 )
            {
                if ( (typeof legacy) === "string" )
                { legacy = Select(legacy,parent) };

                if ( Array.isArray(legacy) )
                { legacy = legacy[0] };

                if ( !((legacy||0).constructor.name).startsWith("HTML") )
                { return false };

                parent = ( parent || this.parentNode );
                legacy = legacy.outerHTML;

                do
                {
                    levels--;

                    if ( !parent || (parent.outerHTML === legacy) )
                    { return ( !parent ? false : true ) };

                    parent = parent.parentNode;
                }
                while ( levels > 0 );

                return false;
            },



            differ ( target, parent )
            {
                if ( (typeof target) === "string" )
                { target = Select(target,parent,false) };

                if ( !target )
                { return true }; // target is fals-ish, though `this` is true-ish

                return ( this.outerHTML !== target.outerHTML );
            },



            select ( )
            {
                let intake = [ ...arguments ];
                let origin = ( Object.getPrototypeOf(this) || {} );
                let native = ( !!origin.select && (origin.select.toString() !== HTMLElement.prototype.select.toString()) );

                if ( native )
                { return origin.select.apply(this,intake) };

                return Select( intake[0], this, intake[1] );
            },



            remove ( )
            {
                let intake = [ ...arguments ];

                return Remove( intake[0], this, intake[1] );
            },



            toggle ( intake )
            {
                let entity = ( this[ENTITY] || this );


                if ( !entity.toggleSchema )
                {
                    entity.toggleSchema = {},
                    entity.toggleStatus = "?";

                    entity.listen
                    ({
                        toggle ( signal )
                        {
                            let callee = this.toggleSchema[ this.toggleStatus ];

                            if ( !!callee )
                            { return this.toggleSchema[this.toggleStatus](signal) };
                        },
                    });
                };


                let detect = Detect( intake );
                let lastUp = entity.toggleStatus;
                let indice = Object.keys( entity.toggleSchema );
                let length = indice.length;
                let nextUp = ( indice.indexOf(lastUp) + 1 );
                let chosen = ( indice[nextUp] || indice[0] );
                let callee,  option,  picked,  parted,  titled,  family;


                if ( detect === "object" )
                {
                    intake = Object.assign( {}, intake );

                    Object.keys( intake ).map(( aspect )=>
                    {
                        callee = intake[ aspect ];
                        delete intake[ aspect ]; // detach method from object first, else bind is impossible
                        entity.toggleSchema[ aspect ] = callee.bind( entity );
                    });

                    return entity.toggle();
                };


                if ( !length )
                { return dump("unable to toggle between no options") };


                if ( !!intake && (detect === "string") && !entity.toggleSchema[intake] )
                {
                    for ( option of indice )
                    {
                        if ( option.startsWith(intake) )
                        {
                            chosen = option;
                            break;
                        }
                    };

                    if ( !entity.toggleSchema[chosen] )
                    { return dump(`toggle "${intake}" is invalid`) };
                };


                entity.toggleStatus = chosen;

                parted = ( chosen || "" ).split("=");
                titled = ( !!parted[1] ? parted[0] : "" ).trim();
                family = ( !!parted[1] ? parted[1] : parted[0] ).trim();
                lastUp = lastUp.split("=").pop().trim();

                entity.reclan( lastUp, family );

                if ( !!titled )
                { entity.aspect({title:titled}) };

                return this;
            },



            listen ( intake, invoke )
            {
                intake = Object.intake( ...arguments );


                Object.filter( intake, (aspect,detail)=>
                {
                    this[ `on${aspect}` ] = undefined; // convenience
                    this.addEventListener( aspect, detail );
                });


                return this;
            },



            signal ( action, convey )
            {
                this.dispatchEvent( new Signal(action,convey) );

                return this;
            },



            absorb ( action, convey )
            {
                return this.listen();
            },



            ignore ( action, method )
            {
                this.removeEventListener( action, method );

                return this;
            },



            styled ( intake, parsed="px" )
            {
                let detect = Object.detect( intake );
                let output = {};
                let length = ( 0 - parsed.length );
                let result,  buffer;


                if ( detect === "string" )
                {
                    intake.trim().split(" ").map(( aspect )=>
                    {
                        result = getComputedStyle( this ).getPropertyValue( aspect );

                        if ( result.endsWith(parsed) )
                        {
                            buffer = result.slice( 0, length );

                            if ( !isNaN(buffer) )
                            { result = (buffer * 1) };
                        };

                        output[ aspect ] = result;
                    });


                    return ( (Object.keys(output).length > 1) ? output : (output[intake] || "") );
                };


                Object.filter( intake, (aspect,detail)=>
                {
                    this.style[ aspect ] = detail;
                });


                return this;
            },
        });
    });



    // Object.keys( HTMLElement.prototype ).map(( aspect, detail )=>
    // {
    //     if ( !aspect || (aspect.length !== 6) )
    //     { return };
    //
    //     try { detail = HTMLElement.prototype[aspect] }
    //     catch ( thrown ){ return };
    //
    //     if ( (typeof detail) !== "function" )
    //     { return };
    //
    //     Object.extend( SVGElement.prototype, aspect, detail );
    // });
// ============================================================================================================================






// define :: $DOM : Document Object Model helper
// ----------------------------------------------------------------------------------------------------------------------------
    Global.$DOM = Plexus( function $DOM (){} );




    $DOM.listen
    ({
        run ( signal )
        {
            let intake = signal.detail;
            let entity = intake[0];
            let naming = ( entity || 0 ).constructor.name;

            if ( !(naming.startsWith("HTML") && naming.endsWith("Element")) )
            { entity = Select( ...intake ) };

            if ( Object.detect(entity,"array null") || !!entity[ENTITY] )
            { return entity }; // only individual unmanaged elements get managed


            return Plexus( function autoNode (){} ).source
            ({
                entity,
            })
            .listen
            ({
                run ( signal )
                {
                    let entity = this.source.entity;
                    let intake = signal.detail;
                    let matter = intake[0];
                    let detect = Object.detect( matter );
                    let tagged = ( entity.nodeName + "" ).toLowerCase();
                    let supply = this.memory( "supply" )[ tagged ];

                    if ( !!supply )
                    { entity.aspect(supply) };

                    return ( this.handle[detect] || this.handle.missed ).apply( this, [matter] );
                }
            })
            .memory
            ({
                cssRef:
                {
                    "#": "id",
                    ".": "class",
                },


                supply:
                {
                    input:
                    {
                        name: "intake",
                    }
                },
            })
            .extend
            ({
                handle:
                {
                    missed ( matter )
                    {
                        return this.source.entity;
                    },


                    array ( matter )
                    {
                        this.source.entity.append( matter );
                        return this[ MEDIUM ];
                    },


                    object ( matter, entity )
                    {
                        this.source.entity.aspect( matter );
                        return this[ MEDIUM ];
                    },


                    string ( matter )
                    {
                        matter.split(" ").join("").split(".").map(( detail, aspect )=>
                        {
                            if ( !detail.trim() )
                            { return }; // ignored whitespace

                            aspect = ( this.memory("cssRef")[detail[0]] || "class" );
                            detail = ( (aspect === "class") ? detail : detail.slice(1) ); // removed hash-tag if `id`

                            if ( !aspect || !detail )
                            { return }; // invalid

                            if ( aspect !== "class" )
                            { return this.source.entity.aspect({[aspect]:detail}) };

                            this.source.entity.enclan( detail );
                        });


                        return this[ MEDIUM ];
                    },
                }
            });
        },



        get ( signal )
        {
            if ( signal.exists !== undefined )
            { return signal.exists }; // we only want to handle undefined aspects here below

            let aspect = signal.aspect;
            let entity = Create( aspect );

            return $DOM( entity );
        }
    });
// ============================================================================================================================






/* PACKED :: $/core/Client/client@client.mjs : finish */








Client.config
({
    "launch":
    {
        "folderApplet": "Play"
    },


    "miming":
    {
        "application/*":
        {
            "symbol": "icon-file-code",
            "tagged": "script",
            "aspect": "src",
            "applet": "Edit"
        },


        "text/css":
        {
            "symbol": "icon-file-text2",
            "tagged": "style",
            "aspect": "innerHTML",
            "applet": "Edit"
        },


        "*ml":
        {
            "symbol": "icon-code",
            "tagged": "div",
            "aspect": "innerHTML",
            "applet": "Edit"
        },


        "inode/*":
        {
            "symbol": "icon-folder",
            "tagged": "div",
            "aspect": "innerHTML",
            "applet": "View",
            "toggle": true
        },


        "text/*":
        {
            "symbol": "icon-file-text2",
            "tagged": "code",
            "aspect": "innerHTML",
            "applet": "Edit"
        },


        "image/*":
        {
            "symbol": "icon-image",
            "tagged": "img",
            "aspect": "src",
            "applet": "View"
        },


        "audio/*":
        {
            "symbol": "icon-itunes-note",
            "tagged": "audio",
            "aspect": "src",
            "applet": "Play"
        },


        "video/*":
        {
            "symbol": "icon-video-camera",
            "tagged": "video",
            "aspect": "src",
            "applet": "Play"
        }
    }
}
);
undefined


/* PACKED :: $/core/Person/person.driver.mjs : starts */




// readme :: scoped : info
// ----------------------------------------------------------------------------------------------------------------------------
// ============================================================================================================================






// define :: Person : global
// ----------------------------------------------------------------------------------------------------------------------------
    Global.Person = Plexus( function Person (){} );
// ============================================================================================================================






// define :: Person : global
// ----------------------------------------------------------------------------------------------------------------------------
    Person.recent( {authed:null} );
// ============================================================================================================================






/* PACKED :: $/core/Person/person.driver.mjs : finish */







/* PACKED :: $/core/Person/person@client.mjs : starts */




// readme :: scoped : info
// ----------------------------------------------------------------------------------------------------------------------------
// ============================================================================================================================






// import :: Person : driver
// ----------------------------------------------------------------------------------------------------------------------------
// ============================================================================================================================






/* PACKED :: $/core/Person/person@client.mjs : finish */








Person.config
({
    "permit":
    {
        "autoAuthUser": "${'person@client'}",
        "autoAuthHash": "${'permit@client'}"
    }
}
);
undefined


/* PACKED :: $/core/Applet/applet.driver.mjs : starts */




// readme :: scoped : info
// ----------------------------------------------------------------------------------------------------------------------------
// ============================================================================================================================






// define :: Applet : global
// ----------------------------------------------------------------------------------------------------------------------------
    Global.Applet = Plexus( function Applet (){} );
// ============================================================================================================================






// extend :: Applet : object
// ----------------------------------------------------------------------------------------------------------------------------
    Applet.extend
    ({
        object: Plexus( function object (){} )
    });
// ============================================================================================================================






// listen :: Global : appletLoaded
// ----------------------------------------------------------------------------------------------------------------------------
    Applet.listen
    ({
        appletAwaits ()
        {
            let listed = Object.filter( Script.shared.config.applet.launch.dependencies, (aspect,detail)=>
            { return `$/user/applet/object/${detail}/applet.${detail}@${Script.device}.mjs` });

            return Script.import( listed ).then( ()=>{ Global.signal("loadedApplet") } );
        }
    });
// ============================================================================================================================






/* PACKED :: $/core/Applet/applet.driver.mjs : finish */







/* PACKED :: $/core/Applet/applet@client.mjs : starts */




// readme :: scoped : info
// ----------------------------------------------------------------------------------------------------------------------------
// ============================================================================================================================






// import :: Applet : driver
// ----------------------------------------------------------------------------------------------------------------------------
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
            // let button;

            return output;
        },



        async launch ( naming, applet="" )
        {
            if ( naming === undefined )
            {
                Object.filter( (await Applet.handle("launch")), (aspect,detail)=>
                {
                    detail = { id:aspect, class:`${detail.avatar} interact`, title:aspect };

                    $DOM( "#iconDeck" ).append
                    ( $DOM.button(detail).listen({ click (){ Applet.toggle(this) } }) ); // iconDeck applet-launch buttons
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






// signal :: Global : appletLoaded
// ----------------------------------------------------------------------------------------------------------------------------
    Timing.awaits(0).then( function appletLoaded ()
    {
        Global.signal( "appletLoaded" );
    });
// ============================================================================================================================






/* PACKED :: $/core/Applet/applet@client.mjs : finish */








Applet.config
({
    "launch":
    {
        "dependencies": [ "object/browse" ]
    }
}
);
undefined