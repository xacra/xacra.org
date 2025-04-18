


// readme :: scoped : info
// ----------------------------------------------------------------------------------------------------------------------------
// ============================================================================================================================






// import :: Server : aspect
// ----------------------------------------------------------------------------------------------------------------------------
    import "./client.driver.mjs";
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



/*
*/
