(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{307:function(t,e,l){"use strict";l.r(e);var c,r=l(6),n=(l(140),l(94),l(73)),o=l.n(n),v=(l(216),l(217)),d=l.n(v),m=(l(218),l(219)),_=l.n(m),h=(l(16),l(47)),C={name:"ecommerce-page",components:(c={Card:h.c,InfoSection:h.j,Collapse:h.e,CollapseItem:h.f,Slider:h.r},Object(r.a)(c,h.b.name,h.b),Object(r.a)(c,h.d.name,h.d),Object(r.a)(c,h.i.name,h.i),Object(r.a)(c,_.a.name,_.a),Object(r.a)(c,d.a.name,d.a),Object(r.a)(c,o.a.name,o.a),c),data:function(){return{filters:{priceRange:[42,900],clothingTypes:[{label:"Blazers",value:!1},{label:"Casual Shirts",value:!1},{label:"Formal Shirts",value:!1},{label:"Jeans",value:!1},{label:"Polos",value:!1}],designerTypes:[{label:"All",value:!1},{label:"Polo Ralph Lauren",value:!1},{label:"Wooyoungmi",value:!1},{label:"Alexander McQueen",value:!1},{label:"Tom Ford",value:!1},{label:"AMI",value:!1},{label:"Berena",value:!1},{label:"Thom Sweeney",value:!1},{label:"Burberry Prorsum",value:!1},{label:"Calvin Klein",value:!1},{label:"Kingsman",value:!1},{label:"Club Monaco",value:!1},{label:"Dolce & Gabbana",value:!1},{label:"Gucci",value:!1},{label:"Biglioli",value:!1},{label:"Lanvin",value:!1},{label:"Loro Piana",value:!1},{label:"Massimo Alba",value:!1}],colourTypes:[{label:"All",value:!1},{label:"Black",value:!1},{label:"Blue",value:!1},{label:"Brown",value:!1},{label:"Gray",value:!1},{label:"Neutrals",value:!1},{label:"Purple",value:!1}]},products:[{image:"img/polo.jpg",title:"Polo Ralph Lauren",description:"Impeccably tailored in Italy from lightweight navy wool.",price:300},{image:"img/tom-ford.jpg",title:"Tom Ford",description:"Immaculate tailoring is TOM FORD's forte.",price:879},{image:"img/wooyoungmi.jpg",title:"Wooyoungmi",description:"Dark-grey slub wool, pintucked notch lapels.",price:555},{image:"img/sweeney.jpg",title:"Thom Sweeney",description:"It's made from lightweight grey wool woven.",price:680},{image:"img/kingsman.jpg",title:"Kingsman",description:"Crafted from khaki cotton and fully canvassed.",price:725},{image:"img/boglioli.jpg",title:"Boglioli",description:"Masterfully crafted in Northern Italy.",price:699}]}}},f=l(1),component=Object(f.a)(C,(function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"wrapper ecommerce-page"},[l("el-carousel",{attrs:{height:"100vh"}},[l("el-carousel-item",[l("div",{staticClass:"page-header header-filter"},[l("div",{staticClass:"page-header-image",staticStyle:{"background-image":"url('img/bg40.jpg')"}}),t._v(" "),l("div",{staticClass:"content-center text-center"},[l("div",{staticClass:"row"},[l("div",{staticClass:"col-md-8 ml-auto mr-auto"},[l("h1",{staticClass:"title"},[t._v("Finding the Perfect.")]),t._v(" "),l("h4",{staticClass:"description text-white"},[t._v("The haute couture crowds make stylish statements\n                                between shows during couture season in Paris...")])])])])])]),t._v(" "),l("el-carousel-item",[l("div",{staticClass:"page-header header-filter"},[l("div",{staticClass:"page-header-image",staticStyle:{"background-image":"url('img/bg41.jpg')"}}),t._v(" "),l("div",{staticClass:"content-center"},[l("div",{staticClass:"row"},[l("div",{staticClass:"col-md-8 ml-auto mr-auto text-center"},[l("h1",{staticClass:"title"},[t._v("Street Style: Couture.")]),t._v(" "),l("h4",{staticClass:"description text-white"},[t._v("See what Karlie Kloss, Tracee Ellis Ross and others\n                                wore between the shows...")])])])])])]),t._v(" "),l("el-carousel-item",[l("div",{staticClass:"page-header header-filter"},[l("div",{staticClass:"page-header-image",staticStyle:{"background-image":"url('img/bg29.jpg')"}}),t._v(" "),l("div",{staticClass:"content-center text-center"},[l("div",{staticClass:"row"},[l("div",{staticClass:"col-md-8 ml-auto mr-auto"},[l("h1",{staticClass:"title"},[t._v("For Men With Style.")]),t._v(" "),l("h4",{staticClass:"description text-white"},[t._v("Shirts that actually fit? Check. Linen shorts? Yup.\n                                Those wider pants suddenly in style? Got them, too....")])])])])])])],1),t._v(" "),l("div",{staticClass:"main"},[l("div",{staticClass:"section"},[l("div",{staticClass:"container"},[l("h2",{staticClass:"section-title"},[t._v("Find what you need")]),t._v(" "),l("div",{staticClass:"row"},[l("div",{staticClass:"col-md-3"},[l("div",{staticClass:"collapse-panel"},[l("div",{staticClass:"card-body"},[l("div",{staticClass:"card card-refine card-plain"},[t._m(0),t._v(" "),l("collapse",[l("collapse-item",{staticClass:"card-header",attrs:{"no-icon":""}},[l("h6",{staticClass:"mb-0 text-success",attrs:{slot:"title"},slot:"title"},[t._v("\n                                                Price Range\n                                                "),l("i",{staticClass:"now-ui-icons arrows-1_minimal-down"})]),t._v(" "),l("span",{staticClass:"price-left pull-left"},[t._v("€"+t._s(t.filters.priceRange[0]))]),t._v(" "),l("span",{staticClass:"price-right pull-right"},[t._v("€"+t._s(t.filters.priceRange[1]))]),t._v(" "),l("div",{staticClass:"clearfix"}),t._v(" "),l("slider",{staticClass:"slider-refine",attrs:{id:"slider-refine",range:{min:0,max:900},connect:!0},model:{value:t.filters.priceRange,callback:function(e){t.$set(t.filters,"priceRange",e)},expression:"filters.priceRange"}})],1),t._v(" "),l("collapse-item",{staticClass:"card-header",attrs:{"no-icon":""}},[l("h6",{staticClass:"mb-0 text-success",attrs:{slot:"title"},slot:"title"},[t._v("\n                                                Clothing\n                                                "),l("i",{staticClass:"now-ui-icons arrows-1_minimal-down"})]),t._v(" "),t._l(t.filters.clothingTypes,(function(e){return l("n-checkbox",{key:e.label,model:{value:e.value,callback:function(l){t.$set(e,"value",l)},expression:"clothing.value"}},[t._v("\n                                                "+t._s(e.label)+"\n                                            ")])}))],2),t._v(" "),l("collapse-item",{staticClass:"card-header",attrs:{"no-icon":""}},[l("h6",{staticClass:"mb-0 text-success",attrs:{slot:"title"},slot:"title"},[t._v("\n                                                Designer\n                                                "),l("i",{staticClass:"now-ui-icons arrows-1_minimal-down"})]),t._v(" "),t._l(t.filters.designerTypes,(function(e){return l("n-checkbox",{key:e.label,model:{value:e.value,callback:function(l){t.$set(e,"value",l)},expression:"desginer.value"}},[t._v("\n                                                "+t._s(e.label)+"\n                                            ")])}))],2),t._v(" "),l("collapse-item",{staticClass:"card-header",attrs:{"no-icon":""}},[l("h6",{staticClass:"mb-0 text-success",attrs:{slot:"title"},slot:"title"},[t._v("\n                                                Colour\n                                                "),l("i",{staticClass:"now-ui-icons arrows-1_minimal-down"})]),t._v(" "),t._l(t.filters.colourTypes,(function(e){return l("n-checkbox",{key:e.label,model:{value:e.value,callback:function(l){t.$set(e,"value",l)},expression:"color.value"}},[t._v("\n                                                "+t._s(e.label)+"\n                                            ")])}))],2)],1)],1)])])]),t._v(" "),l("div",{staticClass:"col-md-9"},[l("div",{staticClass:"row"},[t._l(t.products,(function(e){return l("div",{key:e.title,staticClass:"col-lg-4 col-md-6"},[l("card",{attrs:{type:"product",plain:""}},[l("img",{attrs:{slot:"image",src:e.image,alt:""},slot:"image"}),t._v(" "),l("a",{attrs:{href:"#"}},[l("h4",{staticClass:"card-title"},[t._v(t._s(e.title))])]),t._v(" "),l("p",{staticClass:"card-description"},[t._v("\n                                        "+t._s(e.description)+"\n                                    ")]),t._v(" "),l("div",{staticClass:"card-footer"},[l("div",{staticClass:"price-container"},[l("span",{staticClass:"price"},[t._v(" € 300")])]),t._v(" "),l("el-tooltip",{attrs:{effect:"light",content:"Remove from wishlist",placement:"top"}},[l("n-button",{staticClass:"pull-right btn-neutral",attrs:{type:"success",icon:"",round:""}},[l("i",{staticClass:"now-ui-icons ui-2_favourite-28"})])],1)],1)])],1)})),t._v(" "),l("div",{staticClass:"col-md-3 ml-auto mr-auto"},[l("n-button",{attrs:{type:"success",round:""}},[t._v("Load more...")])],1)],2)])])])]),t._v(" "),t._m(1),t._v(" "),l("div",{staticClass:"projects-4"},[l("div",{staticClass:"container-fluid"},[l("div",{staticClass:"row"},[l("div",{staticClass:"col-md-6 px-0"},[l("card",{staticClass:"card-fashion",staticStyle:{"background-image":"url('img/bg35.jpg')"},attrs:{type:"background"}},[l("div",{staticClass:"card-title text-left"},[l("h2",[l("a",{attrs:{href:"#pablo"}},[t._v("\n                                        The New York Times Todd Snyder and Raf Simons Party During Men’s Fashion\n                                        Week\n                                    ")])])]),t._v(" "),l("div",{staticClass:"card-footer text-left"},[l("div",{staticClass:"stats"},[l("span",[l("i",{staticClass:"now-ui-icons users_circle-08"}),t._v("Emy Grace\n                                        ")]),t._v(" "),l("span",[l("i",{staticClass:"now-ui-icons tech_watch-time"}),t._v(" June 6, 2017\n                                        ")])]),t._v(" "),l("div",{staticClass:"stats-link pull-right"},[l("a",{staticClass:"footer-link",attrs:{href:"#pablo"}},[t._v("Fashion Week")])])])])],1),t._v(" "),l("div",{staticClass:"col-md-6 px-0"},[l("div",{staticClass:"card-container"},[t._m(2),t._v(" "),l("card",{staticClass:"card-fashion",staticStyle:{"background-image":"url('img/bg40.jpg')"},attrs:{type:"background"}})],1)])])])]),t._v(" "),l("div",{staticClass:"section"},[l("div",{staticClass:"container"},[l("h2",{staticClass:"section-title"},[t._v("Latest Offers")]),t._v(" "),l("div",{staticClass:"row"},[l("div",{staticClass:"col-md-4"},[l("card",{attrs:{type:"product",plain:""}},[l("img",{attrs:{slot:"image",src:"img/saint-laurent1.jpg",alt:""},slot:"image"}),t._v(" "),l("h4",{staticClass:"card-title"},[l("a",{attrs:{href:"#pablo"}},[t._v("Saint Laurent")])]),t._v(" "),l("p",{staticClass:"card-description"},[t._v("The structured shoulders and sleek detailing ensure a\n                                sharp silhouette. Team it with a silk pocket square and leather loafers.")]),t._v(" "),l("div",{staticClass:"card-footer"},[l("div",{staticClass:"price-container"},[l("span",{staticClass:"price price-old"},[t._v(" €1,430")]),t._v(" "),l("span",{staticClass:"price price-new"},[t._v(" €743")])]),t._v(" "),l("div",{staticClass:"stats stats-right"},[l("el-tooltip",{attrs:{content:"Saved to Wishlist",effect:"light",placement:"top"}},[l("n-button",{attrs:{type:"neutral",icon:""}},[l("i",{staticClass:"now-ui-icons ui-2_favourite-28"})])],1)],1)])])],1),t._v(" "),l("div",{staticClass:"col-md-4"},[l("card",{attrs:{type:"product",plain:""}},[l("img",{attrs:{slot:"image",src:"img/saint-laurent1.jpg",alt:""},slot:"image"}),t._v(" "),l("h4",{staticClass:"card-title"},[l("a",{attrs:{href:"#pablo"}},[t._v("Saint Laurent")])]),t._v(" "),l("p",{staticClass:"card-description"},[t._v("The structured shoulders and sleek detailing ensure a\n                                sharp silhouette. Team it with a silk pocket square and leather loafers.")]),t._v(" "),l("div",{staticClass:"card-footer"},[l("div",{staticClass:"price-container"},[l("span",{staticClass:"price price-old"},[t._v(" €1,430")]),t._v(" "),l("span",{staticClass:"price price-new"},[t._v(" €743")])]),t._v(" "),l("div",{staticClass:"stats stats-right"},[l("el-tooltip",{attrs:{content:"Saved to Wishlist",effect:"light",placement:"top"}},[l("n-button",{attrs:{type:"neutral",icon:""}},[l("i",{staticClass:"now-ui-icons ui-2_favourite-28"})])],1)],1)])])],1),t._v(" "),l("div",{staticClass:"col-md-4"},[l("card",{attrs:{type:"product",plain:""}},[l("img",{attrs:{slot:"image",src:"img/gucci.jpg",alt:""},slot:"image"}),t._v(" "),l("h4",{staticClass:"card-title"},[l("a",{attrs:{href:"#pablo"}},[t._v("Gucci")])]),t._v(" "),l("p",{staticClass:"card-description"},[t._v("The smooth woven-wool is water resistant to ensure you\n                                stay pristine after a long-haul flight. Cut in a trim yet comfortable regular\n                                fit.")]),t._v(" "),l("div",{staticClass:"card-footer"},[l("div",{staticClass:"price-container"},[l("span",{staticClass:"price price-old"},[t._v(" €2,430")]),t._v(" "),l("span",{staticClass:"price price-new"},[t._v("€890")])]),t._v(" "),l("div",{staticClass:"stats stats-right"},[l("el-tooltip",{attrs:{content:"Saved to Wishlist",effect:"light",placement:"top"}},[l("n-button",{attrs:{type:"neutral",icon:""}},[l("i",{staticClass:"now-ui-icons ui-2_favourite-28"})])],1)],1)])])],1)])])]),t._v(" "),l("div",{staticClass:"subscribe-line subscribe-line-image",staticStyle:{"background-image":"url('img/bg43.jpg')"}},[l("div",{staticClass:"container"},[l("div",{staticClass:"row"},[l("div",{staticClass:"col-md-6 ml-auto mr-auto"},[t._m(3),t._v(" "),l("card",{staticClass:"card-form-horizontal",attrs:{type:"raised"}},[l("div",{staticClass:"row"},[l("div",{staticClass:"col-sm-8"},[l("fg-input",{attrs:{placeholder:"Your Email...","addon-left-icon":"now-ui-icons ui-1_email-85"}})],1),t._v(" "),l("div",{staticClass:"col-sm-4"},[l("n-button",{attrs:{type:"success",round:"",block:""}},[t._v("\n                                        Subscribe\n                                    ")])],1)])])],1)])])])])],1)}),[function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("h4",{staticClass:"card-title"},[t._v("\n                                        Refine\n                                        "),l("button",{staticClass:"btn btn-default btn-icon btn-neutral pull-right",attrs:{rel:"tooltip",title:"Reset Filter"}},[l("i",{staticClass:"arrows-1_refresh-69 now-ui-icons"})])])},function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"container"},[l("h2",{staticClass:"section-title"},[t._v("News in fashion")])])},function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"card card-fashion"},[l("div",{staticClass:"card-title"},[l("a",{attrs:{href:"#pablo"}}),t._v(" "),l("h4",[l("a",{attrs:{href:"#pablo"}}),t._v(" "),l("a",{attrs:{href:"#pablo"}},[t._v("\n                                            Valentina Garavani Holds a Summer Lunch in Honor of Sofia Coppola...\n                                        ")])])]),t._v(" "),l("div",{staticClass:"card-body"},[l("div",{staticClass:"card-footer text-left"},[l("div",{staticClass:"stats"},[l("span",[l("i",{staticClass:"now-ui-icons users_circle-08"}),t._v("Jerry McGregor\n                                            ")]),t._v(" "),l("span",[l("i",{staticClass:"now-ui-icons tech_watch-time"}),t._v(" June 10, 2017\n                                            ")])])])])])},function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"text-center"},[l("h4",{staticClass:"title"},[t._v("Subscribe to our Newsletter")]),t._v(" "),l("p",{staticClass:"description"},[t._v("\n                                Join our newsletter and get news in your inbox every week! We hate spam too, so no\n                                worries about this.\n                            ")])])}],!1,null,null,null);e.default=component.exports}}]);