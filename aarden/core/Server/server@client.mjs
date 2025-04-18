


// readme :: scoped : info
// ----------------------------------------------------------------------------------------------------------------------------
// ============================================================================================================================






// import :: Server : driver
// ----------------------------------------------------------------------------------------------------------------------------
    import "./server.driver.mjs";
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
                        catch ( thrown ){}; // probably not json
                    };


                    accept( detail );
                });


                socket.open( method, target );

                Object.filter( header, (aspect,detail)=>
                { socket.setRequestHeader(aspect,detail) });

                if ( !([null,undefined]).includes(buffer) )
                { buffer = JSON.stringify(buffer) };

                socket.send( buffer );
                return true;
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



/*
*/
