


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



/*
*/
