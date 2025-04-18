


// readme :: scoped : info
// ----------------------------------------------------------------------------------------------------------------------------
// ============================================================================================================================






// listen :: Applet : object
// ----------------------------------------------------------------------------------------------------------------------------
    Applet.object.listen
    ({
        browse ( signal )
        {
            let socket = signal.expose();
            let intake = signal.buffer;
            let target = String.target( ("." + intake.origin), Script.folder );
            let access = Device.config( "permit" ).systemAccess;
            let permit = false;

            if ( !Device.exists(target) )
            { target = intake.origin }; // for if intake.origin is an absolute path

            if ( !Device.exists(target) )
            { return socket.finish(404) };

            if ( !!Device.detect(target,"linked") )
            { target = Device.readlink(target) };


            for ( let prefix of access )
            {
                if ( target.startsWith(prefix) )
                { permit = true;  break }
            };


            if ( !permit )
            { return socket.finish(403) };


            let output = Device.select( target, {output:"object", filter (object)
            {
                object.miming = Server.miming( object.target, object.detect );

                Object.assign( object, {target:object.target.split(Script.folder).join("")} );

                if ( !object.linked || object.linked.startsWith(Script.folder) )
                { return Object.assign(object, {linked:object.linked.split(Script.folder).join("")}) }; // continue

                object.locked = true;


                for ( let prefix of access )
                {
                    if ( (prefix === "*") || object.linked.startsWith(prefix) )
                    { object.locked = false;  break }
                };


                return object;
            }});


            return Object.parsed( output, "string" );
        },
    });
// ============================================================================================================================



/*
*/
