


// import :: aarden
// ----------------------------------------------------------------------------------------------------------------------------
    import "../index.mjs";
// ============================================================================================================================






// listen :: Script : gather
// ----------------------------------------------------------------------------------------------------------------------------
    Script.listen
    ({
        gather ( signal )
        {
            let device = signal.detail;
            let output = [];
            let assets = Object.invert( Script.shared.assets );
            let aspect,  target,  script,  config,  append;


            Object.indice( assets ).map(( rooted )=>
            {
                aspect = rooted.toLowerCase();
                script = Script.exhume( `$/core/${rooted}/${aspect}@${device}.mjs` );
                config = Device.select( `$/user/${aspect}/config/${aspect}.config@${device}.jsn` );
                append = "";

                if ( rooted !== "Script" )
                { append = Global[rooted].signal("gather", signal) }; // prevent feedback loop

                output.push( (script + `\n\n\n` + `${rooted}.config\n(${config});\n` + append) );
            });


            return output.join("\n");
        }
    });
// ============================================================================================================================






// listen :: Server : gather
// ----------------------------------------------------------------------------------------------------------------------------
    Server.listen
    ({
        gather ( signal )
        {
            let device = signal.detail[0];
            let output = [];
            let detail;


            if ( device === "client" )
            {
                detail = Object.parsed( {miming:Server.config("miming")} );
                output.push( (`\n\n` + `Server.config\n(${detail});`) );
            };


            return output.join("\n");
        }
    });
// ============================================================================================================================






// listen :: Script : repack
// ----------------------------------------------------------------------------------------------------------------------------
    Script.listen
    ({
        repack ()
        {
            let kernel = Script.exhume( "$/core/Script/script.driver.mjs" ).split( "(function forked ( device )" )[0];
                // kernel = String.impose( kernel, "\n", [`\n    // console.lapsed(`,`);\n`] );
            let client = Script.signal( "gather", "client" );
            let ornate = Script.exhume( "$/user/client/layout/client.layout.window.css", [`\n    @import url( "`,`" );\n`] );


            // let inside = [`\n    src: url("glyphs.`,`") `];
            // let target,  impose;
            //
            //
            // String.expose( ornate, inside ).map(( search )=>
            // {
            //     target = ( "$/user/client/glyphs/glyphs." + search.split(".wof")[0] + ".wof" );
            //     search = ( inside[0] + search + inside[1] );
            //     impose = Device.select( target, {encoding:null, encode:"durl"} );
            //     ornate = ornate.split( search ).join( inside[0] + impose + inside[1] );
            // });


            Device.remake( "$/seed/source/aarden.kernel.script.mjs", kernel );
            Device.remake( "$/seed/source/aarden.client.script.mjs", (kernel + client) );
            Device.remake( "$/seed/source/aarden.client.styles.css", ornate );
        }
    })
    .signal( "repack" );
// ============================================================================================================================
