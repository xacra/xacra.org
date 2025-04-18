





// desine :: Device : induct - file
// ----------------------------------------------------------------------------------------------------------------------------
    Device.induct
    ({
        adb: Plexus( /adbDriver/ )
        .config
        ({
            launch: { listenerPort:5037 },
            target: { linkedPrefix:"/sdcard" },
            innate: [ "sdcard", "mnt", "storage" ],
            anchor: "/sdcard",
        })
        .recent
        ({
            primed: false
        })
        .listen
        ({
            access ( signal )
            {
                if ( !this.recent("primed") )
                { return };

                let status = this.status();

                if ( status !== "online" )
                { status = this.revive() }

                if ( status !== "online" )
                { return moan("adb device status: " + status) }

                let number = this.config( "launch" ).listenerPort;
                let domain = this.expose( "domain" );
                let routed = this.routed( signal.aspect );
                let config = this.config("*");
                let target = signal.detail.path;
                let sliver = target.slice(1).split("/")[0];

                if ( !config.innate.includes(sliver) )
                { target = (config.anchor + target) };

                signal.aspect = ( routed || signal.aspect );
                Object.assign( signal.detail, {host:domain, port:number, path:target} );

                let aspect = signal.aspect;

                if ( !(aspect in this) )
                { return moan("adb - absent routed method: "+aspect) };

                // Script.output(`access  ${aspect}  ${target}`)

                return this[ aspect ]( signal );
            },



            primed ( signal )
            {
                let status = this.status();

                if ( status !== "online" )
                { status = this.revive() }

                // if ( status !== "online" )
                // { return moan("adb device status: " + status) };

                this.recent( {primed:true} );
            },
        })
        .extend
        ({
            exists ( signal )
            {
                let target = signal.detail.path;
                let output = String.parsed( this.induce(`[ -e "${target}" ] && echo Y || echo N`), "boolean" );

                return output;
            },



            lstat ( signal )
            {
                let target = signal.detail.path;
                let suffix = "&& echo Y || echo N";
                let option = "boolean";
                let linked = String.parsed( this.induce(`[ -L "${target}" ] ${suffix}`), option );
                let folder = String.parsed( this.induce(`[ -d "${target}" ] ${suffix}`), option );
                let buffer = String.parsed( this.induce(`[ -f "${target}" ] ${suffix}`), option );


                return Object
                ({
                    linked, folder, buffer,

                    isSymbolicLink (){ return this.linked },
                    isDirectory (){ return this.folder },
                    isFile (){ return this.buffer },
                });
            },



            readlink ( signal )
            {
                let target = signal.detail.path;
                let output = this.induce( `readlink -f "${target}"` );

                signal.detail.path = output;

                return output;
            },



            readdir ( signal )
            {
                let target = signal.detail.path;
                let output = this.induce( `cd "${target}" && ls -a` ).split("\n");

                return output;
            },



            status ()
            {
                let number = this.config( "launch" ).listenerPort;

                if ( !Device.induce("which adb").endsWith("/adb") )
                { return "absent" };

                if ( Device.induce( "lsof -i :" + number ).split("\n").pop().trim().split(" ")[0] !== "adb" )
                { return "asleep" };

                if ( !Device.induce("adb devices").split("\n").pop().endsWith("device") )
                { return "unplug" };

                if ( this.induce(`echo "online"`) !== "online" )
                { return "absurd" };

                return "online";
            },



            expose ( intake )
            {
                let output;


                if ( intake === "domain" )
                {
                    output = Device.induce("adb devices").split("\n").pop().split("0000")[0];

                    return output;
                };
            },



            induce ( intake, output="" )
            {
                intake = String.escape( intake, "'", "insert", true );
                output = ( output + Device.induce("adb shell " + intake) ); // geared for recursion

                return output;
            },



            revive ( reboot=false )
            {
                let status = this.status();
                let vivify = "adb kill-server && adb start-server";
                let number = this.config( "launch" ).listenerPort;


                if ( reboot && (status === "online") )
                {
                    Device.induce( vivify );
                    status = this.status();
                };


                if ( status === "online" )
                { return status };


                if ( status === "absent" )
                { return (status + " - command not found .. please install adb and verify its path is in your env var $PAT") };


                if ( status === "asleep" )
                {
                    Device.induce( "adb start-server" );

                    status = this.status();


                    if ( status === "asleep" )
                    {
                        Device.induce( vivify );

                        status = this.status();

                        if ( status === "asleep" )
                        { return (status + " - server absent on port: " + number) };
                    };
                };


                if ( status === "unplug" )
                { return (status + " - device absent") };


                if ( status === "absurd" )
                { return (status + " - shell command failed") };


                return status;
            },
        })
    });
// ============================================================================================================================
