(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{212:function(t,e,o){"use strict";o.d(e,"a",(function(){return l}));var n=o(213),r=o.n(n);function l(){window.innerWidth>=991&&(setTimeout((function(){new r.a(".rellax",{center:!0})}),5e3),new r.a(".rellax-header"),new r.a(".rellax-text"))}},213:function(t,e,o){(function(o){var n,r,l;"undefined"!=typeof window&&window,r=[],void 0===(l="function"==typeof(n=function(){var t=function(e,o){"use strict";var n=Object.create(t.prototype),r=0,l=0,c=0,d=0,v=[],m=!0,f=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||window.oRequestAnimationFrame||function(t){return setTimeout(t,1e3/60)},h=null,_=!1;try{var w=Object.defineProperty({},"passive",{get:function(){_=!0}});window.addEventListener("testPassive",null,w),window.removeEventListener("testPassive",null,w)}catch(t){}var C=window.cancelAnimationFrame||window.mozCancelAnimationFrame||clearTimeout,y=window.transformProp||function(){var t=document.createElement("div");if(null===t.style.transform){var e=["Webkit","Moz","ms"];for(var o in e)if(void 0!==t.style[e[o]+"Transform"])return e[o]+"Transform"}return"transform"}();function x(){if(3===n.options.breakpoints.length&&Array.isArray(n.options.breakpoints)){var t,e=!0,o=!0;if(n.options.breakpoints.forEach((function(i){"number"!=typeof i&&(o=!1),null!==t&&i<t&&(e=!1),t=i})),e&&o)return}n.options.breakpoints=[576,768,1201],console.warn("Rellax: You must pass an array of 3 numbers in ascending order to the breakpoints option. Defaults reverted")}n.options={speed:-2,verticalSpeed:null,horizontalSpeed:null,breakpoints:[576,768,1201],center:!1,wrapper:null,relativeToWrapper:!1,round:!0,vertical:!0,horizontal:!1,verticalScrollAxis:"y",horizontalScrollAxis:"x",callback:function(){}},o&&Object.keys(o).forEach((function(t){n.options[t]=o[t]})),o&&o.breakpoints&&x(),e||(e=".rellax");var k="string"==typeof e?document.querySelectorAll(e):[e];if(k.length>0){if(n.elems=k,n.options.wrapper&&!n.options.wrapper.nodeType){var A=document.querySelector(n.options.wrapper);if(!A)return void console.warn("Rellax: The wrapper you're trying to use doesn't exist.");n.options.wrapper=A}var z,S=function(t){var e=n.options.breakpoints;return t<e[0]?"xs":t>=e[0]&&t<e[1]?"sm":t>=e[1]&&t<e[2]?"md":"lg"},T=function(){for(var i=0;i<n.elems.length;i++){var t=E(n.elems[i]);v.push(t)}},j=function(){for(var i=0;i<v.length;i++)n.elems[i].style.cssText=v[i].style;v=[],l=window.innerHeight,d=window.innerWidth,z=S(d),O(),T(),animate(),m&&(window.addEventListener("resize",j),m=!1,F())},E=function(t){var e,o=t.getAttribute("data-rellax-percentage"),r=t.getAttribute("data-rellax-speed"),c=t.getAttribute("data-rellax-xs-speed"),v=t.getAttribute("data-rellax-mobile-speed"),m=t.getAttribute("data-rellax-tablet-speed"),f=t.getAttribute("data-rellax-desktop-speed"),h=t.getAttribute("data-rellax-vertical-speed"),_=t.getAttribute("data-rellax-horizontal-speed"),w=t.getAttribute("data-rellax-vertical-scroll-axis"),C=t.getAttribute("data-rellax-horizontal-scroll-axis"),y=t.getAttribute("data-rellax-zindex")||0,x=t.getAttribute("data-rellax-min"),k=t.getAttribute("data-rellax-max"),A=t.getAttribute("data-rellax-min-x"),S=t.getAttribute("data-rellax-max-x"),T=t.getAttribute("data-rellax-min-y"),j=t.getAttribute("data-rellax-max-y"),E=!0;c||v||m||f?e={xs:c,sm:v,md:m,lg:f}:E=!1;var O=n.options.wrapper?n.options.wrapper.scrollTop:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;n.options.relativeToWrapper&&(O=(window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop)-n.options.wrapper.offsetTop);var W=n.options.vertical&&(o||n.options.center)?O:0,F=n.options.horizontal&&(o||n.options.center)?n.options.wrapper?n.options.wrapper.scrollLeft:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft:0,Y=W+t.getBoundingClientRect().top,R=t.clientHeight||t.offsetHeight||t.scrollHeight,D=F+t.getBoundingClientRect().left,M=t.clientWidth||t.offsetWidth||t.scrollWidth,X=o||(W-Y+l)/(R+l),B=o||(F-D+d)/(M+d);n.options.center&&(B=.5,X=.5);var P=E&&null!==e[z]?Number(e[z]):r||n.options.speed,G=h||n.options.verticalSpeed,N=_||n.options.horizontalSpeed,$=w||n.options.verticalScrollAxis,H=C||n.options.horizontalScrollAxis,I=L(B,X,P,G,N),style=t.style.cssText,U="",J=/transform\s*:/i.exec(style);if(J){var K=J.index,Q=style.slice(K),V=Q.indexOf(";");U=V?" "+Q.slice(11,V).replace(/\s/g,""):" "+Q.slice(11).replace(/\s/g,"")}return{baseX:I.x,baseY:I.y,top:Y,left:D,height:R,width:M,speed:P,verticalSpeed:G,horizontalSpeed:N,verticalScrollAxis:$,horizontalScrollAxis:H,style:style,transform:U,zindex:y,min:x,max:k,minX:A,maxX:S,minY:T,maxY:j}},O=function(){var t=r,e=c;if(r=n.options.wrapper?n.options.wrapper.scrollTop:(document.documentElement||document.body.parentNode||document.body).scrollTop||window.pageYOffset,c=n.options.wrapper?n.options.wrapper.scrollLeft:(document.documentElement||document.body.parentNode||document.body).scrollLeft||window.pageXOffset,n.options.relativeToWrapper){var o=(document.documentElement||document.body.parentNode||document.body).scrollTop||window.pageYOffset;r=o-n.options.wrapper.offsetTop}return!(t==r||!n.options.vertical)||!(e==c||!n.options.horizontal)},L=function(t,e,o,r,l){var c={},d=(l||o)*(100*(1-t)),v=(r||o)*(100*(1-e));return c.x=n.options.round?Math.round(d):Math.round(100*d)/100,c.y=n.options.round?Math.round(v):Math.round(100*v)/100,c},W=function(){window.removeEventListener("resize",W),window.removeEventListener("orientationchange",W),(n.options.wrapper?n.options.wrapper:window).removeEventListener("scroll",W),(n.options.wrapper?n.options.wrapper:document).removeEventListener("touchmove",W),h=f(F)},F=function(){O()&&!1===m?(animate(),h=f(F)):(h=null,window.addEventListener("resize",W),window.addEventListener("orientationchange",W),(n.options.wrapper?n.options.wrapper:window).addEventListener("scroll",W,!!_&&{passive:!0}),(n.options.wrapper?n.options.wrapper:document).addEventListener("touchmove",W,!!_&&{passive:!0}))},animate=function(){for(var t,i=0;i<n.elems.length;i++){var e=v[i].verticalScrollAxis.toLowerCase(),o=v[i].horizontalScrollAxis.toLowerCase(),m=-1!=e.indexOf("x")?r:0,f=-1!=e.indexOf("y")?r:0,h=-1!=o.indexOf("x")?c:0,_=(f+(-1!=o.indexOf("y")?c:0)-v[i].top+l)/(v[i].height+l),w=(m+h-v[i].left+d)/(v[i].width+d),C=(t=L(w,_,v[i].speed,v[i].verticalSpeed,v[i].horizontalSpeed)).y-v[i].baseY,x=t.x-v[i].baseX;null!==v[i].min&&(n.options.vertical&&!n.options.horizontal&&(C=C<=v[i].min?v[i].min:C),n.options.horizontal&&!n.options.vertical&&(x=x<=v[i].min?v[i].min:x)),null!=v[i].minY&&(C=C<=v[i].minY?v[i].minY:C),null!=v[i].minX&&(x=x<=v[i].minX?v[i].minX:x),null!==v[i].max&&(n.options.vertical&&!n.options.horizontal&&(C=C>=v[i].max?v[i].max:C),n.options.horizontal&&!n.options.vertical&&(x=x>=v[i].max?v[i].max:x)),null!=v[i].maxY&&(C=C>=v[i].maxY?v[i].maxY:C),null!=v[i].maxX&&(x=x>=v[i].maxX?v[i].maxX:x);var k=v[i].zindex,A="translate3d("+(n.options.horizontal?x:"0")+"px,"+(n.options.vertical?C:"0")+"px,"+k+"px) "+v[i].transform;n.elems[i].style[y]=A}n.options.callback(t)};return n.destroy=function(){for(var i=0;i<n.elems.length;i++)n.elems[i].style.cssText=v[i].style;m||(window.removeEventListener("resize",j),m=!0),C(h),h=null},j(),n.refresh=j,n}console.warn("Rellax: The elements you're trying to select don't exist.")};return t})?n.apply(e,r):n)||(t.exports=l)}).call(this,o(48))},312:function(t,e,o){"use strict";o.r(e);var n,r=o(6),l=(o(140),o(94),o(73)),c=o.n(l),d=(o(225),o(226)),v=o.n(d),m=(o(227),o(228)),f=o.n(m),h=(o(216),o(217)),_=o.n(h),w=(o(218),o(219)),C=o.n(w),y=(o(16),o(47)),x=o(212),k={name:"product-page",layout:"default-no-footer",components:(n={Card:y.c,Collapse:y.e,CollapseItem:y.f},Object(r.a)(n,y.b.name,y.b),Object(r.a)(n,C.a.name,C.a),Object(r.a)(n,_.a.name,_.a),Object(r.a)(n,f.a.name,f.a),Object(r.a)(n,v.a.name,v.a),Object(r.a)(n,c.a.name,c.a),n),data:function(){return{filters:{color:"",size:""},year:(new Date).getFullYear()}},mounted:function(){Object(x.a)()}},A=o(1),component=Object(A.a)(k,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"wrapper product-page"},[t._m(0),t._v(" "),o("div",{staticClass:"section"},[o("div",{staticClass:"container"},[o("div",{staticClass:"row"},[o("div",{staticClass:"col-md-5"},[o("el-carousel",[o("el-carousel-item",[o("img",{staticClass:"d-block img-raised",attrs:{src:"img/pp-1.jpg",alt:"First slide"}})]),t._v(" "),o("el-carousel-item",[o("img",{staticClass:"d-block img-raised",attrs:{src:"img/pp-2.jpg",alt:"Second slide"}})]),t._v(" "),o("el-carousel-item",[o("img",{staticClass:"d-block img-raised",attrs:{src:"img/pp-3.jpg",alt:"Third slide"}})])],1),t._v(" "),t._m(1)],1),t._v(" "),o("div",{staticClass:"col-md-6 ml-auto mr-auto"},[o("h2",{staticClass:"title"},[t._v(" Saint Laurent ")]),t._v(" "),o("h5",{staticClass:"category"},[t._v("Slim-Fit Leather Biker Jacket")]),t._v(" "),o("h2",{staticClass:"main-price"},[t._v("$3,390")]),t._v(" "),o("collapse",[o("collapse-item",{attrs:{title:"Description"}},[o("p",[t._v("Eres' daring 'Grigri Fortune' swimsuit has the fit and coverage of a bikini\n                                in a one-piece silhouette. This fuchsia style is crafted from the label's\n                                sculpting peau douce fabric and has flattering cutouts through the torso and\n                                back. Wear yours with mirrored sunglasses on vacation.")])]),t._v(" "),o("collapse-item",{attrs:{title:"Designer Informationription"}},[o("p",[t._v("An infusion of West Coast cool and New York attitude, Rebecca Minkoff is\n                                synonymous with It girl style. Minkoff burst on the fashion scene with her\n                                best-selling 'Morning After Bag' and later expanded her offering with the\n                                Rebecca Minkoff Collection - a range of luxe city staples with a \"downtown\n                                romantic\" theme.")])]),t._v(" "),o("collapse-item",{attrs:{title:"Details and Care"}},[o("ul",[o("li",[t._v("Storm and midnight-blue stretch cotton-blend")]),t._v(" "),o("li",[t._v("Notch lapels, functioning buttoned cuffs, two front flap pockets, single\n                                    vent, internal pocket\n                                ")]),t._v(" "),o("li",[t._v("Two button fastening")]),t._v(" "),o("li",[t._v("84% cotton, 14% nylon, 2% elastane")]),t._v(" "),o("li",[t._v("Dry clean")])])])],1),t._v(" "),o("div",{staticClass:"row pick-size"},[o("div",{staticClass:"col-lg-6 col-md-8 col-sm-6"},[o("label",[t._v("Select color")]),t._v(" "),o("br"),t._v(" "),o("el-select",{staticClass:"select-default",model:{value:t.filters.color,callback:function(e){t.$set(t.filters,"color",e)},expression:"filters.color"}},[o("el-option",{staticClass:"select-default",attrs:{value:"1",label:"Black"}}),t._v(" "),o("el-option",{staticClass:"select-default",attrs:{value:"2",label:"Gray"}}),t._v(" "),o("el-option",{staticClass:"select-default",attrs:{value:"3",label:"White"}})],1)],1),t._v(" "),o("div",{staticClass:"col-lg-6 col-md-8 col-sm-6"},[o("label",[t._v("Select size")]),t._v(" "),o("br"),t._v(" "),o("el-select",{staticClass:"select-default",model:{value:t.filters.size,callback:function(e){t.$set(t.filters,"size",e)},expression:"filters.size"}},[o("el-option",{staticClass:"select-default",attrs:{value:"1",label:"Small"}}),t._v(" "),o("el-option",{staticClass:"select-default",attrs:{value:"2",label:"Medium"}}),t._v(" "),o("el-option",{staticClass:"select-default",attrs:{value:"3",label:"Large"}})],1)],1)]),t._v(" "),o("div",{staticClass:"row justify-content-end"},[o("n-button",{staticClass:"mr-3",attrs:{type:"success"}},[t._v("\n                            Add to Cart  \n                            "),o("i",{staticClass:"now-ui-icons shopping_cart-simple"})])],1)],1)]),t._v(" "),t._m(2),t._v(" "),t._m(3)])]),t._v(" "),o("div",{staticClass:"section related-products",attrs:{"data-background-color":"black"}},[o("div",{staticClass:"container"},[o("h3",{staticClass:"title text-center"},[t._v("You may also be interested in:")]),t._v(" "),o("div",{staticClass:"row"},[o("div",{staticClass:"col-sm-6 col-md-3"},[o("card",{attrs:{type:"product"}},[o("img",{staticClass:"img rounded",attrs:{slot:"image",src:"img/saint-laurent.jpg"},slot:"image"}),t._v(" "),o("h6",{staticClass:"category text-danger"},[t._v("Trending")]),t._v(" "),o("h4",{staticClass:"card-title"},[o("a",{staticClass:"card-link",attrs:{href:"#pablo"}},[t._v("Dolce & Gabbana")])]),t._v(" "),o("div",{staticClass:"card-description"},[t._v("\n                            Dolce & Gabbana's 'Greta' tote has been crafted in Italy from hard-wearing red\n                            textured-leather.\n                        ")]),t._v(" "),o("div",{staticClass:"card-footer"},[o("div",{staticClass:"price-container"},[o("span",{staticClass:"price"},[t._v("€1,459")])]),t._v(" "),o("el-tooltip",{attrs:{content:"Add to Wishlist",placement:"left"}},[o("n-button",{staticClass:"pull-right",attrs:{type:"neutral",icon:"",round:""}},[o("i",{staticClass:"now-ui-icons ui-2_favourite-28"})])],1)],1)])],1),t._v(" "),o("div",{staticClass:"col-sm-6 col-md-3"},[o("card",{attrs:{type:"product"}},[o("img",{staticClass:"img rounded",attrs:{slot:"image",src:"img/gucci.jpg"},slot:"image"}),t._v(" "),o("h6",{staticClass:"category text-danger"},[t._v("Popular")]),t._v(" "),o("h4",{staticClass:"card-title"},[o("a",{staticClass:"card-link",attrs:{href:"#pablo"}},[t._v("Balmain")])]),t._v(" "),o("div",{staticClass:"card-description"},[t._v("\n                            Balmain's mid-rise skinny jeans are cut with stretch to ensure they retain their\n                            second-skin fit but move comfortably.\n                        ")]),t._v(" "),o("div",{staticClass:"card-footer"},[o("div",{staticClass:"price-container"},[o("span",{staticClass:"price"},[t._v("€459")])]),t._v(" "),o("el-tooltip",{attrs:{content:"Add to Wishlist",placement:"left"}},[o("n-button",{staticClass:"pull-right",attrs:{type:"neutral",icon:"",round:""}},[o("i",{staticClass:"now-ui-icons ui-2_favourite-28"})])],1)],1)])],1),t._v(" "),o("div",{staticClass:"col-sm-6 col-md-3"},[o("card",{attrs:{type:"product"}},[o("img",{staticClass:"img rounded",attrs:{slot:"image",src:"img/wooyoungmi.jpg"},slot:"image"}),t._v(" "),o("h6",{staticClass:"category text-danger"},[t._v("Popular")]),t._v(" "),o("h4",{staticClass:"card-title"},[o("a",{staticClass:"card-link",attrs:{href:"#pablo"}},[t._v("Balenciaga")])]),t._v(" "),o("div",{staticClass:"card-description"},[t._v("\n                            Balenciaga's black textured-leather wallet is finished with the label's iconic\n                            'Giant' studs. This is where you can...\n                        ")]),t._v(" "),o("div",{staticClass:"card-footer"},[o("div",{staticClass:"price-container"},[o("span",{staticClass:"price"},[t._v("€559")])]),t._v(" "),o("el-tooltip",{attrs:{content:"Add to Wishlist",placement:"left"}},[o("n-button",{staticClass:"pull-right",attrs:{type:"neutral",icon:"",round:""}},[o("i",{staticClass:"now-ui-icons ui-2_favourite-28"})])],1)],1)])],1),t._v(" "),o("div",{staticClass:"col-sm-6 col-md-3"},[o("card",{attrs:{type:"product"}},[o("img",{staticClass:"img rounded",attrs:{slot:"image",src:"img/saint-laurent1.jpg"},slot:"image"}),t._v(" "),o("h6",{staticClass:"category text-danger"},[t._v("Trending")]),t._v(" "),o("h4",{staticClass:"card-title"},[o("a",{staticClass:"card-link",attrs:{href:"#pablo"}},[t._v("Dolce & Gabbana")])]),t._v(" "),o("div",{staticClass:"card-description"},[t._v("\n                            Dolce & Gabbana's 'Greta' tote has been crafted in Italy from hard-wearing red\n                            textured-leather.\n                        ")]),t._v(" "),o("div",{staticClass:"card-footer"},[o("div",{staticClass:"price-container"},[o("span",{staticClass:"price"},[t._v("€ 1,359")])]),t._v(" "),o("el-tooltip",{attrs:{content:"Add to Wishlist",placement:"left"}},[o("n-button",{staticClass:"pull-right",attrs:{type:"neutral",icon:"",round:""}},[o("i",{staticClass:"now-ui-icons ui-2_favourite-28"})])],1)],1)])],1)])])]),t._v(" "),o("footer",{staticClass:"footer footer-big footer-white"},[o("div",{staticClass:"container"},[t._m(4),t._v(" "),o("hr"),t._v(" "),o("div",{staticClass:"copyright"},[t._v("\n                Copyright ©\n                "+t._s(t.year)+" Creative Tim All Rights Reserved.\n            ")])])])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"page-header page-header-mini rellax-header"},[e("div",{staticClass:"page-header-image",staticStyle:{"background-image":"url('img/pp-cov.jpg')"}})])},function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("p",{staticClass:"blockquote blockquote-primary"},[t._v('\n                        "And thank you for turning my personal jean jacket into a couture piece. Wear yours with\n                        mirrored sunglasses on vacation."\n                        '),o("br"),t._v(" "),o("br"),t._v(" "),o("small",[t._v("Kanye West")])])},function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"section"},[o("div",{staticClass:"row"},[o("div",{staticClass:"col-md-8 ml-auto mr-auto text-center mr-5"},[o("h2",{staticClass:"title"},[t._v("How to wear it")]),t._v(" "),o("h4",{staticClass:"description"},[t._v("You need more information? Check what other persons are saying about\n                            our product. They are very happy with their purchase.")])])]),t._v(" "),o("div",{staticClass:"section-story-overview"},[o("div",{staticClass:"row"},[o("div",{staticClass:"col-md-4 ml-auto mr-auto"},[o("div",{staticClass:"image-container image-left",staticStyle:{"background-image":"url('img/pp-5.jpg')"}},[o("p",{staticClass:"blockquote blockquote-primary"},[t._v('"Over the span of the satellite record,\n                                    Arctic sea ice has been declining significantly, while sea ice in the\n                                    Antarctichas increased very slightly"\n                                    '),o("br"),t._v(" "),o("br"),t._v(" "),o("small",[t._v(" - NOAA")])])]),t._v(" "),o("div",{staticClass:"image-container",staticStyle:{"background-image":"url('img/bg29.jpg')"}})]),t._v(" "),o("div",{staticClass:"col-md-4 ml-auto mr-auto"},[o("div",{staticClass:"image-container image-right",staticStyle:{"background-image":"url('img/pp-4.jpg')"}}),t._v(" "),o("h3",[t._v("So what does the new record for the lowest level of winter ice actually mean")]),t._v(" "),o("p",[t._v("The Arctic Ocean freezes every winter and much of the sea-ice then thaws every\n                                summer, and that process will continue whatever happens with climate change. Even if\n                                the Arctic continues to be one of the fastest-warming regions of the world, it will\n                                always be plunged into bitterly cold polar dark every winter. And year-by-year, for\n                                all kinds of natural reasons, there’s huge variety of the state of the ice.\n                            ")]),t._v(" "),o("p",[t._v("For a start, it does not automatically follow that a record amount of ice will melt\n                                this summer. More important for determining the size of the annual thaw is the state\n                                of the weather as the midnight sun approaches and temperatures rise. But over the\n                                more than 30 years of satellite records, scientists have observed a clear pattern of\n                                decline, decade-by-decade.")])])])])])},function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"features-4"},[o("div",{staticClass:"container"},[o("div",{staticClass:"row"},[o("div",{staticClass:"col-md-8 ml-auto mr-auto text-center"},[o("h2",{staticClass:"title"},[t._v("Not convinced yet!")]),t._v(" "),o("h4",{staticClass:"description"},[t._v("Havenly is a convenient, personal and affordable way to\n                                redecorate your home room by room. Collaborate with our professional interior\n                                designers on our online platform. ")])])]),t._v(" "),o("div",{staticClass:"row"},[o("div",{staticClass:"col-md-4"},[o("div",{staticClass:"card card-background card-raised",staticStyle:{"background-image":"url('img/bg24.jpg')"},attrs:{"data-background-color":""}},[o("div",{staticClass:"info"},[o("div",{staticClass:"icon icon-white"},[o("i",{staticClass:"now-ui-icons shopping_delivery-fast"})]),t._v(" "),o("div",{staticClass:"description"},[o("h4",{staticClass:"info-title"},[t._v("1 Day Delivery ")]),t._v(" "),o("p",[t._v("Divide details about your product or agency work into parts. Write a few\n                                            lines about each one. A paragraph describing a feature will be\n                                            enough.")]),t._v(" "),o("a",{staticClass:"ml-3",attrs:{href:"#pablo"}},[t._v("Find more...")])])])])]),t._v(" "),o("div",{staticClass:"col-md-4"},[o("div",{staticClass:"card card-background card-raised",staticStyle:{"background-image":"url('img/bg28.jpg')"},attrs:{"data-background-color":""}},[o("div",{staticClass:"info"},[o("div",{staticClass:"icon icon-white"},[o("i",{staticClass:"now-ui-icons business_badge"})]),t._v(" "),o("div",{staticClass:"description"},[o("h4",{staticClass:"info-title"},[t._v("Refund Policy")]),t._v(" "),o("p",[t._v("Divide details about your product or agency work into parts. Write a few\n                                            lines about each one. Very good refund policy just for you.")]),t._v(" "),o("a",{attrs:{href:"#pablo"}},[t._v("Find more...")])])])])]),t._v(" "),o("div",{staticClass:"col-md-4"},[o("div",{staticClass:"card card-background card-raised",staticStyle:{"background-image":"url('img/bg25.jpg')"},attrs:{"data-background-color":""}},[o("div",{staticClass:"info"},[o("div",{staticClass:"icon"},[o("i",{staticClass:"now-ui-icons ui-2_favourite-28"})]),t._v(" "),o("div",{staticClass:"description"},[o("h4",{staticClass:"info-title"},[t._v("Popular Item")]),t._v(" "),o("p",[t._v("Share a floor plan, and we'll create a visualization of your room. A\n                                            paragraph describing a feature will be enough. This is a popular item\n                                            for you.")]),t._v(" "),o("a",{staticClass:"ml-3",attrs:{href:"#pablo"}},[t._v("Find more...")])])])])])])])])},function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"content"},[o("div",{staticClass:"row"},[o("div",{staticClass:"col-md-2"},[o("h5",[t._v("About Us")]),t._v(" "),o("ul",{staticClass:"links-vertical"},[o("li",[o("a",{staticClass:"text-muted",attrs:{href:"#pablo"}},[t._v("\n                                    Blog\n                                ")])]),t._v(" "),o("li",[o("a",{staticClass:"text-muted",attrs:{href:"#pablo"}},[t._v("\n                                    About Us\n                                ")])]),t._v(" "),o("li",[o("a",{staticClass:"text-muted",attrs:{href:"#pablo"}},[t._v("\n                                    Presentation\n                                ")])]),t._v(" "),o("li",[o("a",{staticClass:"text-muted",attrs:{href:"#pablo"}},[t._v("\n                                    Contact Us\n                                ")])])])]),t._v(" "),o("div",{staticClass:"col-md-2"},[o("h5",[t._v("Market")]),t._v(" "),o("ul",{staticClass:"links-vertical"},[o("li",[o("a",{staticClass:"text-muted",attrs:{href:"#pablo"}},[t._v("\n                                    Sales FAQ\n                                ")])]),t._v(" "),o("li",[o("a",{staticClass:"text-muted",attrs:{href:"#pablo"}},[t._v("\n                                    How to Register\n                                ")])]),t._v(" "),o("li",[o("a",{staticClass:"text-muted",attrs:{href:"#pablo"}},[t._v("\n                                    Sell Goods\n                                ")])]),t._v(" "),o("li",[o("a",{staticClass:"text-muted",attrs:{href:"#pablo"}},[t._v("\n                                    Receive Payment\n                                ")])]),t._v(" "),o("li",[o("a",{staticClass:"text-muted",attrs:{href:"#pablo"}},[t._v("\n                                    Transactions Issues\n                                ")])]),t._v(" "),o("li",[o("a",{staticClass:"text-muted",attrs:{href:"#pablo"}},[t._v("\n                                    Affiliates Program\n                                ")])])])]),t._v(" "),o("div",{staticClass:"col-md-4"},[o("h5",[t._v("Social Feed")]),t._v(" "),o("div",{staticClass:"social-feed"},[o("div",{staticClass:"feed-line"},[o("i",{staticClass:"fab fa-twitter"}),t._v(" "),o("p",[t._v("How to handle ethical disagreements with your clients.")])]),t._v(" "),o("div",{staticClass:"feed-line"},[o("i",{staticClass:"fab fa-twitter"}),t._v(" "),o("p",[t._v("The tangible benefits of designing at 1x pixel density.")])]),t._v(" "),o("div",{staticClass:"feed-line"},[o("i",{staticClass:"fab fa-facebook-square"}),t._v(" "),o("p",[t._v("A collection of 25 stunning sites that you can use for inspiration.")])])])]),t._v(" "),o("div",{staticClass:"col-md-4"},[o("h5",[t._v("Follow Us")]),t._v(" "),o("ul",{staticClass:"social-buttons"},[o("li",[o("a",{staticClass:"btn btn-icon btn-neutral btn-twitter btn-round",attrs:{href:"#pablo"}},[o("i",{staticClass:"fab fa-twitter"})])]),t._v(" "),o("li",[o("a",{staticClass:"btn btn-icon btn-neutral btn-facebook btn-round",attrs:{href:"#pablo"}},[o("i",{staticClass:"fab fa-facebook-square"})])]),t._v(" "),o("li",[o("a",{staticClass:"btn btn-icon btn-neutral btn-dribbble btn-round",attrs:{href:"#pablo"}},[o("i",{staticClass:"fab fa-dribbble"})])]),t._v(" "),o("li",[o("a",{staticClass:"btn btn-icon btn-neutral btn-google btn-round",attrs:{href:"#pablo"}},[o("i",{staticClass:"fab fa-google-plus"})])]),t._v(" "),o("li",[o("a",{staticClass:"btn btn-icon btn-neutral btn-instagram btn-round",attrs:{href:"#pablo"}},[o("i",{staticClass:"fab fa-instagram"})])])]),t._v(" "),o("h5",[o("small",[t._v("Numbers Don't Lie")])]),t._v(" "),o("h5",[t._v("14.521\n                            "),o("small",{staticClass:"text-muted"},[t._v("Freelancers")])]),t._v(" "),o("h5",[t._v("1.423.183\n                            "),o("small",{staticClass:"text-muted"},[t._v("Transactions")])])])])])}],!1,null,null,null);e.default=component.exports}}]);