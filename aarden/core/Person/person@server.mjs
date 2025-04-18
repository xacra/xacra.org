


// readme :: scoped : info
// ----------------------------------------------------------------------------------------------------------------------------
// ============================================================================================================================






// import :: Person : driver
// ----------------------------------------------------------------------------------------------------------------------------
    import "./person.driver.mjs";
// ============================================================================================================================






// retain :: Person : folder
// ----------------------------------------------------------------------------------------------------------------------------
    Person.stored
    ({
        folder: "$/user/person/exists",
        permit:
        {
            length: 36,
            expire: 0, // expires when used
        }
    });
// ============================================================================================================================






// extend :: Person : exists
// ----------------------------------------------------------------------------------------------------------------------------
    Person.extend
    ({
        exists ( naming )
        {
            let output = Device.detect( `${Person.folder}/${naming}/config/${naming}.config@server.jsn`, "buffer" );

            return !!output;
        }
    });
// ============================================================================================================================






// extend :: Person : create
// ----------------------------------------------------------------------------------------------------------------------------
    Person.extend
    ({
        create ( object )
        {
            let naming = object.name;
            let holder = Person.folder;

            if ( Person.exists(naming) )
            { return moan(`person "${naming}" already exists`) };

            object.pass = Crypto.encode( object.pass, "sha256" );
            Device.impose( `${holder}/${naming}/`, `${Person.assets}/design/user`, object );

            return Person.exists( naming );
        }
    });
// ============================================================================================================================






// extend :: Person : supply
// ----------------------------------------------------------------------------------------------------------------------------
    Person.extend
    ({
        supply ( object )
        {
            if ( Person.exists(object.name) )
            { return true };

            return Person.create( object );
        }
    });
// ============================================================================================================================






// extend :: Person : verify
// ----------------------------------------------------------------------------------------------------------------------------
    Person.extend
    ({
        verify ( intake )
        {
            if ( !Object.expect(intake,"intake as string, or object") )
            { return }; // invalid

            let holder = `$/user/person/tokens`;
            let person = intake.name;
            let timing = Number.timing();
            let output,  exists,  authed,  expire;


            if ( (typeof intake) === "string" )
            {
                output = Device.select( `${holder}/${intake}`, {decode:"json"} );

                if ( !output )
                { return null }; // not found


                if ( !output.expire || ((output.expire - timing) < 1) )
                {
                    Device.remove( `${holder}/${intake}` );

                    if ( !!output.expire )
                    { return false };
                };


                return output; // authorized
            };


            exists = Device.select( `${Person.folder}/${person}/config/${person}.config@server.jsn`, {decode:"json"} );

            if ( !exists )
            { return null }; // not found

            authed = ( exists.authPassword === Crypto.encode(intake.pass, "sha256") );
            output = String.unique( (Person.permit.length + 1), "", "" ).slice(1); // shifted 1 char
            expire = ( intake.time ? (timing + intake.time) : Person.permit.expire );

            if ( !authed )
            { return false }; // unauthorized

            Device.create( `${holder}/${output}`, Crypto.encode({member:intake.name, expire},"json")  );

            return output;
        }
    });
// ============================================================================================================================






// extend :: Server : browse
// ----------------------------------------------------------------------------------------------------------------------------
    Server.listen( `fields permit`, function verify ( signal )
    {
        let socket = signal.expose();
        let permit = signal.params.permit;
        let authed;


        if ( Object.detect(permit,"string") )
        {
            authed = Person.verify( permit );


            if ( authed )
            {
                socket.cookie( {name:"permit", value:permit} );
                socket.authed = authed;

                return; // undefined .. socket is not handled yet
            };


            return false;
        };


        socket.finish(401); // unauthorised
    });
// ============================================================================================================================



/*
*/
