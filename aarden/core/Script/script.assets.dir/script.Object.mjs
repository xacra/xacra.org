


// readme :: Object : system starts here
// ----------------------------------------------------------------------------------------------------------------------------
// ============================================================================================================================






// global :: <references> : keep this here as the first define block .. to be refined later, but useful here
// ----------------------------------------------------------------------------------------------------------------------------
    Symbol.global = String
    (
        `SELECT EXISTS MODIFY INSERT CREATE REMOVE UPDATE DETECT ` + // SEMI CRUD
        `MARKED ACTIVE SYSTEM STARTS FINISH GLOBAL MEDIUM FINITE ` +
        `HIDDEN LINKED PLEXUS ENTITY FAILED ORIGIN ROSTER`
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
                case "string" : return (affirm.includes(output) ? output : "" );
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



            create: function create( intake=null, extend={}, permit=0 )
            {
                let design = ( intake || 0 ).constructor.name.toLowerCase()
                let making = "new";

                if ( !("string regexp").includes(design) )
                { return this.native.apply(Object, [...arguments]) };


                if ( design === "string" )
                {
                    if ( intake.startsWith("async ") || intake.startsWith("bound ") )
                    { intake = intake.split(" ").pop() };
                }
                else
                {
                    intake = ( intake + "" ).slice(1,-1);
                    making = "";
                }


                if ( !(/^([a-zA-Z0-9_]){1,60}$/).test(intake) )
                { return moan("invalid method name: "+intake) }; // security + debug convenience

                let output = (Function(`return ${making} (function ${intake} (){})`))();

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

                moan( "expecting " + affirm + " .. given: " + output );
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
    // console.lapsed( "Object" );
// ============================================================================================================================



/*
*/
