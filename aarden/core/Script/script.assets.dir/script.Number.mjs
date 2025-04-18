


// import :: Script : Crypto
// ----------------------------------------------------------------------------------------------------------------------------
    import "./script.Crypto.mjs";
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
    // console.lapsed( "Number" );
// ============================================================================================================================
