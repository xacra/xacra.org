


// action :: aspect : info
// ----------------------------------------------------------------------------------------------------------------------------
    Applet.object.search = $DOM( "#menuFind" ).extend
    ({
        intake: Select( "#menuFind input" ),

        button: Select( "#menuFind button" ).toggle
        ({
            "choose = icon-chevron-down" : function ()
            {
                $DOM( "#menuDeck" )
                ([
                    $DOM.div( "#dropDown.dropMenu.formItem" )
                    (
                        Object.filter( Script.shared.hosted, (aspect,detail)=>
                        {
                            return $DOM.div( ".listItem" )
                            ([
                                $DOM.div( ".itemLine.flexWide.interact" )
                                ([
                                    $DOM.div( ".itemDent.inactive" ).styled( {flex:`0 0 2px`} ),
                                    $DOM.div( ".itemIcon.inactive" ).enclan( "icon-list-ul" ).styled({fontSize:"9px"}),
                                    $DOM.div( ".itemText.inactive" ).append( $DOM.input({value:aspect, readonly:true}) ),
                                ])
                                [ ENTITY ].assign( {detail} ).listen
                                ({
                                    click ()
                                    {
                                        Applet.object.browse( this.detail.target, Select("#menuCard"+Applet.recent("active")) )
                                    }
                                })
                            ])
                        })
                    )
                ]);
            },



            "cancel = icon-chevron-up" : function ()
            {
                Remove( "#dropDown" );
                dump("cancel");
            },
        })
        .listen
        ({
            click ()
            {
                this.signal("toggle");
                this.toggle();
            }
        }),
    });
// ============================================================================================================================






// extend :: Applet.object : browse
// ----------------------------------------------------------------------------------------------------------------------------
    Applet.object.extend
    ({
        async browse ( origin, holder, indent=0 )
        {
            let toggle = holder.parentNode;
                toggle = ( toggle.relate("listItem") ? toggle.select(".itemTogl") : Select("#menuFind button") );
            let result;

            toggle.enclan( "iconBusy" );
            holder.declan( "secluded" );

            result = await Applet.handle( "object/browse", {origin} );

            toggle.declan( "iconBusy" );


            if ( indent < 1 )
            { Applet.object.browse.attend(holder) };


            Object.filter( result, (aspect,detail)=>
            {
                Object.assign( detail, Client.miming(detail.miming) );


                holder.append
                ([
                    $DOM.div( ".listItem" )
                    ([
                        $DOM.div( ".itemLine.flexWide.interact" )[ ENTITY ].assign( {detail} ).append
                        ([
                            $DOM.div( ".itemDent.inactive" ).styled( {flex:`0 0 ${(indent*16)}px`} ),


                            (( entity )=>
                            {
                                if ( !detail.toggle )
                                { return entity.enclan("icon-circle shrouded") };


                                return entity.toggle
                                ({
                                    "shut = icon-chevron-right": function ()
                                    { Applet.object.browse(this.detail.target, this.detail.holder, (indent + 1)) },

                                    "open = icon-chevron-down": function ()
                                    { this.detail.holder.innerHTML = "" },
                                })
                                .listen
                                ({
                                    toggle ( signal )
                                    { this.toggle() }
                                });
                            })
                            ( $DOM.div(".itemTogl.inactive") ),


                            $DOM.div( ".itemIcon.inactive" )
                            .enclan( (detail.locked ? "icon-lock1" : detail.symbol) )
                            .styled( {opacity:(detail.locked ? 0.5 : 1)} ),

                            $DOM.div( ".itemText.inactive" ).append( $DOM.input({value:aspect, readonly:true}) ),
                        ]),


                        $DOM.div( ".itemKids.secluded" ),
                    ])
                ]);


            });


            return result;
        },
    });
// ============================================================================================================================






// extend :: Applet.object.browse : modify
// ----------------------------------------------------------------------------------------------------------------------------
    Object.extend( Applet.object.browse,
    {
        modify ( signal )
        {
            if ( !!signal.change )
            {
                return dump("TODO :: submit changes to server")
            };


            let matter = signal.matter;
            let holder = matter.parentNode;
            let exists = holder.parentNode.select(".overlaid");
            let detail = matter.detail;
            // let listed = [ $DOM.div(".inactive").styled({flex:"1"}), $DOM.div(".formLine") ];
            let choice = signal.choice.split(",");
            let number = 24;
            let spread = ( 1 + (choice.length * number) );
            let button,  relate,  styled,  toggle,  listen;


            matter.enclan( "interest" );


            holder.append
            ([
                $DOM.div( ".overlaid.flexWide" ).assign({matter,status:"free"}).append
                ([
                    $DOM.div(".inactive").styled({flex:"1"}),
                    $DOM.div(".formLine"),
                    $DOM.div( ".itemWrap.flexWide" ).styled({flex:`0 0 ${spread}px`})
                ])
            ]);


            Object.filter( choice, (aspect,detail)=>
            {
                aspect = detail;
                detail = Object.create( Applet.memory("button")[detail] );
                relate = `${detail.avatar} interact`;
                styled = Object.concat( {flex:`0 0 ${number}px`}, (detail.styled || {}) );
                toggle = detail.toggle;
                listen = detail.listen;
                button = $DOM.button( {class:relate, title:aspect} )[ ENTITY ].assign( {detail,matter} ).styled( styled );

                if ( !!toggle )
                { button.toggle(toggle) };

                if ( !!listen )
                { button.listen(listen) };

                holder.select( ".itemWrap" ).append( button );
            });


            holder.select( ".overlaid" ).matter = matter;
        }
    });
// ============================================================================================================================






// extend :: Applet.object.browse : attend
// ----------------------------------------------------------------------------------------------------------------------------
    Object.extend( Applet.object.browse,
    {
        attend ( holder )
        {
            Script.output( holder.id || holder.name || "<anon>" );


            holder.listen
            ({
                // mouseover ( signal )
                // {
                //     // if ( !!Device.memory("intake").cursor.chosen )
                //     // { return }; // dragging over
                //     return;
                //
                //
                //     let matter = signal.target;
                //     let parent = matter.parentNode;
                //     let render = true;
                //     let family = "overlaid";
                //     let active = Applet.recent( "active" );
                //
                //     if ( matter.relate(family) || parent.relate(family) || parent.parentNode.relate(family) )
                //     { return }; // ignored
                //
                //
                //     this.select( "*.overlaid" ).map(( object )=>
                //     {
                //         if ( !object.matter )
                //         { return }; // ignored
                //
                //         if ( object.matter.detail.status === "busy" )
                //         { return (render = false) };
                //
                //         object.matter.declan("interest");
                //         object.parentNode.remove( object );
                //     });
                //
                //
                //     if ( !render || !matter.relate("itemLine") )
                //     { return }; // ignored
                //
                //     Applet.object.browse.modify( {matter, choice:`handle,rename,delete`} );
                // },



                click ( signal )
                {
                    let matter = signal.target;
                    let parent = matter.parentNode;
                    let family = "overlaid";


                    if ( matter.relate(family) )
                    {
                        matter = matter.matter;
                    }
                    else if ( parent.relate(family) )
                    {
                        matter = parent.matter;
                    }
                    else if ( parent.parentNode.relate(family) )
                    {
                        matter = parent.parentNode.matter;
                    };


                    if ( !matter.relate("itemLine") || (signal.target.nodeName === "BUTTON") )
                    { return }; // ignored


                    if ( matter.detail.status === "busy" )
                    {
                        matter.parentNode.select("input").focus();
                        return true;
                    };




                    if ( !matter.detail )
                    {
                        return moan( "missing detail", matter)
                    };


                    if ( !matter.detail.toggle )
                    {
                        return Applet.launch( matter.detail.target, matter.detail.applet );
                    };


                    if ( matter.detail.toggle === true )
                    {
                        matter.detail.holder = matter.parentNode.select( ".itemKids" );
                        matter.detail.toggle = matter.select( ".itemTogl" ).assign( {detail:matter.detail} );
                    };


                    return matter.detail.toggle.signal( "toggle" );
                },
            });
        },
    });
// ============================================================================================================================






// listen :: #menuDeck : modify
// ----------------------------------------------------------------------------------------------------------------------------
    Select( "#menuDeck" );
// ============================================================================================================================



/*
*/
