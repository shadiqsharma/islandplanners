(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{212:function(t,e,o){"use strict";o.d(e,"a",(function(){return l}));var n=o(213),r=o.n(n);function l(){window.innerWidth>=991&&(setTimeout((function(){new r.a(".rellax",{center:!0})}),5e3),new r.a(".rellax-header"),new r.a(".rellax-text"))}},213:function(t,e,o){(function(o){var n,r,l;"undefined"!=typeof window&&window,r=[],void 0===(l="function"==typeof(n=function(){var t=function(e,o){"use strict";var n=Object.create(t.prototype),r=0,l=0,c=0,d=0,v=[],m=!0,h=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||window.oRequestAnimationFrame||function(t){return setTimeout(t,1e3/60)},f=null,w=!1;try{var _=Object.defineProperty({},"passive",{get:function(){w=!0}});window.addEventListener("testPassive",null,_),window.removeEventListener("testPassive",null,_)}catch(t){}var y=window.cancelAnimationFrame||window.mozCancelAnimationFrame||clearTimeout,C=window.transformProp||function(){var t=document.createElement("div");if(null===t.style.transform){var e=["Webkit","Moz","ms"];for(var o in e)if(void 0!==t.style[e[o]+"Transform"])return e[o]+"Transform"}return"transform"}();function x(){if(3===n.options.breakpoints.length&&Array.isArray(n.options.breakpoints)){var t,e=!0,o=!0;if(n.options.breakpoints.forEach((function(i){"number"!=typeof i&&(o=!1),null!==t&&i<t&&(e=!1),t=i})),e&&o)return}n.options.breakpoints=[576,768,1201],console.warn("Rellax: You must pass an array of 3 numbers in ascending order to the breakpoints option. Defaults reverted")}n.options={speed:-2,verticalSpeed:null,horizontalSpeed:null,breakpoints:[576,768,1201],center:!1,wrapper:null,relativeToWrapper:!1,round:!0,vertical:!0,horizontal:!1,verticalScrollAxis:"y",horizontalScrollAxis:"x",callback:function(){}},o&&Object.keys(o).forEach((function(t){n.options[t]=o[t]})),o&&o.breakpoints&&x(),e||(e=".rellax");var k="string"==typeof e?document.querySelectorAll(e):[e];if(k.length>0){if(n.elems=k,n.options.wrapper&&!n.options.wrapper.nodeType){var A=document.querySelector(n.options.wrapper);if(!A)return void console.warn("Rellax: The wrapper you're trying to use doesn't exist.");n.options.wrapper=A}var S,T=function(t){var e=n.options.breakpoints;return t<e[0]?"xs":t>=e[0]&&t<e[1]?"sm":t>=e[1]&&t<e[2]?"md":"lg"},E=function(){for(var i=0;i<n.elems.length;i++){var t=j(n.elems[i]);v.push(t)}},z=function(){for(var i=0;i<v.length;i++)n.elems[i].style.cssText=v[i].style;v=[],l=window.innerHeight,d=window.innerWidth,S=T(d),L(),E(),animate(),m&&(window.addEventListener("resize",z),m=!1,R())},j=function(t){var e,o=t.getAttribute("data-rellax-percentage"),r=t.getAttribute("data-rellax-speed"),c=t.getAttribute("data-rellax-xs-speed"),v=t.getAttribute("data-rellax-mobile-speed"),m=t.getAttribute("data-rellax-tablet-speed"),h=t.getAttribute("data-rellax-desktop-speed"),f=t.getAttribute("data-rellax-vertical-speed"),w=t.getAttribute("data-rellax-horizontal-speed"),_=t.getAttribute("data-rellax-vertical-scroll-axis"),y=t.getAttribute("data-rellax-horizontal-scroll-axis"),C=t.getAttribute("data-rellax-zindex")||0,x=t.getAttribute("data-rellax-min"),k=t.getAttribute("data-rellax-max"),A=t.getAttribute("data-rellax-min-x"),T=t.getAttribute("data-rellax-max-x"),E=t.getAttribute("data-rellax-min-y"),z=t.getAttribute("data-rellax-max-y"),j=!0;c||v||m||h?e={xs:c,sm:v,md:m,lg:h}:j=!1;var L=n.options.wrapper?n.options.wrapper.scrollTop:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;n.options.relativeToWrapper&&(L=(window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop)-n.options.wrapper.offsetTop);var B=n.options.vertical&&(o||n.options.center)?L:0,R=n.options.horizontal&&(o||n.options.center)?n.options.wrapper?n.options.wrapper.scrollLeft:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft:0,F=B+t.getBoundingClientRect().top,M=t.clientHeight||t.offsetHeight||t.scrollHeight,W=R+t.getBoundingClientRect().left,Y=t.clientWidth||t.offsetWidth||t.scrollWidth,N=o||(B-F+l)/(M+l),P=o||(R-W+d)/(Y+d);n.options.center&&(P=.5,N=.5);var X=j&&null!==e[S]?Number(e[S]):r||n.options.speed,H=f||n.options.verticalSpeed,$=w||n.options.horizontalSpeed,G=_||n.options.verticalScrollAxis,I=y||n.options.horizontalScrollAxis,D=O(P,N,X,H,$),style=t.style.cssText,U="",J=/transform\s*:/i.exec(style);if(J){var K=J.index,Q=style.slice(K),V=Q.indexOf(";");U=V?" "+Q.slice(11,V).replace(/\s/g,""):" "+Q.slice(11).replace(/\s/g,"")}return{baseX:D.x,baseY:D.y,top:F,left:W,height:M,width:Y,speed:X,verticalSpeed:H,horizontalSpeed:$,verticalScrollAxis:G,horizontalScrollAxis:I,style:style,transform:U,zindex:C,min:x,max:k,minX:A,maxX:T,minY:E,maxY:z}},L=function(){var t=r,e=c;if(r=n.options.wrapper?n.options.wrapper.scrollTop:(document.documentElement||document.body.parentNode||document.body).scrollTop||window.pageYOffset,c=n.options.wrapper?n.options.wrapper.scrollLeft:(document.documentElement||document.body.parentNode||document.body).scrollLeft||window.pageXOffset,n.options.relativeToWrapper){var o=(document.documentElement||document.body.parentNode||document.body).scrollTop||window.pageYOffset;r=o-n.options.wrapper.offsetTop}return!(t==r||!n.options.vertical)||!(e==c||!n.options.horizontal)},O=function(t,e,o,r,l){var c={},d=(l||o)*(100*(1-t)),v=(r||o)*(100*(1-e));return c.x=n.options.round?Math.round(d):Math.round(100*d)/100,c.y=n.options.round?Math.round(v):Math.round(100*v)/100,c},B=function(){window.removeEventListener("resize",B),window.removeEventListener("orientationchange",B),(n.options.wrapper?n.options.wrapper:window).removeEventListener("scroll",B),(n.options.wrapper?n.options.wrapper:document).removeEventListener("touchmove",B),f=h(R)},R=function(){L()&&!1===m?(animate(),f=h(R)):(f=null,window.addEventListener("resize",B),window.addEventListener("orientationchange",B),(n.options.wrapper?n.options.wrapper:window).addEventListener("scroll",B,!!w&&{passive:!0}),(n.options.wrapper?n.options.wrapper:document).addEventListener("touchmove",B,!!w&&{passive:!0}))},animate=function(){for(var t,i=0;i<n.elems.length;i++){var e=v[i].verticalScrollAxis.toLowerCase(),o=v[i].horizontalScrollAxis.toLowerCase(),m=-1!=e.indexOf("x")?r:0,h=-1!=e.indexOf("y")?r:0,f=-1!=o.indexOf("x")?c:0,w=(h+(-1!=o.indexOf("y")?c:0)-v[i].top+l)/(v[i].height+l),_=(m+f-v[i].left+d)/(v[i].width+d),y=(t=O(_,w,v[i].speed,v[i].verticalSpeed,v[i].horizontalSpeed)).y-v[i].baseY,x=t.x-v[i].baseX;null!==v[i].min&&(n.options.vertical&&!n.options.horizontal&&(y=y<=v[i].min?v[i].min:y),n.options.horizontal&&!n.options.vertical&&(x=x<=v[i].min?v[i].min:x)),null!=v[i].minY&&(y=y<=v[i].minY?v[i].minY:y),null!=v[i].minX&&(x=x<=v[i].minX?v[i].minX:x),null!==v[i].max&&(n.options.vertical&&!n.options.horizontal&&(y=y>=v[i].max?v[i].max:y),n.options.horizontal&&!n.options.vertical&&(x=x>=v[i].max?v[i].max:x)),null!=v[i].maxY&&(y=y>=v[i].maxY?v[i].maxY:y),null!=v[i].maxX&&(x=x>=v[i].maxX?v[i].maxX:x);var k=v[i].zindex,A="translate3d("+(n.options.horizontal?x:"0")+"px,"+(n.options.vertical?y:"0")+"px,"+k+"px) "+v[i].transform;n.elems[i].style[C]=A}n.options.callback(t)};return n.destroy=function(){for(var i=0;i<n.elems.length;i++)n.elems[i].style.cssText=v[i].style;m||(window.removeEventListener("resize",z),m=!0),y(f),f=null},z(),n.refresh=z,n}console.warn("Rellax: The elements you're trying to select don't exist.")};return t})?n.apply(e,r):n)||(t.exports=l)}).call(this,o(48))},316:function(t,e,o){"use strict";o.r(e);var n,r=o(6),l=(o(16),o(47)),c=o(212),d={name:"landing-page",layout:"gray-footer",components:(n={Card:l.c,Tabs:l.u,TabPane:l.t},Object(r.a)(n,l.b.name,l.b),Object(r.a)(n,l.i.name,l.i),n),data:function(){return{form:{firstName:"",email:"",message:""}}},mounted:function(){Object(c.a)()}},v=o(1),component=Object(v.a)(d,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"wrapper landing-page"},[t._m(0),t._v(" "),t._m(1),t._v(" "),o("div",{staticClass:"container-fluid"},[o("div",{staticClass:"row"},[o("div",{staticClass:"col-md-8 ml-auto mr-auto text-center"},[o("h2",{staticClass:"title"},[t._v("Our Services")]),t._v(" "),o("tabs",{attrs:{type:"danger",centered:"",pills:""}},[o("tab-pane",{attrs:{label:"Tour"}},[o("div",{staticClass:"row"},[o("div",{staticClass:"col-md-6 px-0 py-1"},[o("card",{staticClass:"card-background-product card-no-shadow",staticStyle:{"background-image":"url('img/project1.jpg')"},attrs:{type:"background"}},[o("h6",{staticClass:"category"},[t._v("Island Hopping")]),t._v(" "),o("h3",{staticClass:"card-title"},[t._v("\n                        Lorem Ipsum\n                      ")]),t._v(" "),o("p",{staticClass:"card-description"},[t._v("\n                        Best island hopping package\n                      ")])])],1),t._v(" "),o("div",{staticClass:"col-md-6 px-0 py-1"},[o("card",{staticClass:"card-background-product card-no-shadow",staticStyle:{"background-image":"url('img/project18.jpg')"},attrs:{type:"background",raised:""}},[o("h6",{staticClass:"category"},[t._v("Mangroove Tour")]),t._v(" "),o("h3",{staticClass:"card-title"},[t._v("Lorem Ipsum")]),t._v(" "),o("p",{staticClass:"card-description"},[t._v("\n                        Best Mangroove tour Package\n                      ")])])],1)])]),t._v(" "),o("tab-pane",{attrs:{label:"F&B"}},[o("div",{staticClass:"row"},[o("div",{staticClass:"col-md-6 px-0"},[o("card",{staticClass:"card-background-product card-no-shadow",staticStyle:{"background-image":"url('img/project20.jpg')"},attrs:{type:"background"}},[o("h6",{staticClass:"category"},[t._v("Fiction")]),t._v(" "),o("h3",{staticClass:"card-title"},[t._v("The Sun Also Rises")]),t._v(" "),o("p",{staticClass:"card-description"},[t._v("\n                        The most commonly read works are works of fiction. Fiction books are ones that have been\n                        made up...\n                      ")]),t._v(" "),o("n-button",{attrs:{type:"neutral",round:""}},[o("i",{staticClass:"now-ui-icons ui-1_send"}),t._v(" Learn more\n                      ")])],1)],1),t._v(" "),o("div",{staticClass:"col-md-6 px-0"},[o("card",{staticClass:"card-background-product card-no-shadow",staticStyle:{"background-image":"url('img/project19.jpg')"},attrs:{type:"background"}},[o("h6",{staticClass:"category"},[t._v("Basic Civitas")]),t._v(" "),o("h3",{staticClass:"card-title"},[t._v("The Right Mistake")]),t._v(" "),o("p",{staticClass:"card-description"},[t._v("\n                        Living in South Central L.A., Socrates Fortlow is a sixty-year-old ex-convict, still\n                        strong enough to kill men with...\n                      ")]),t._v(" "),o("n-button",{attrs:{type:"danger",round:""}},[o("i",{staticClass:"now-ui-icons ui-1_send"}),t._v(" Read Now\n                      ")])],1)],1)])]),t._v(" "),o("tab-pane",{attrs:{label:"Scooter Rental"}},[o("div",{staticClass:"col-md-6 px-0"},[o("card",{staticClass:"card-background-product card-no-shadow",staticStyle:{"background-image":"url('img/project19.jpg')"},attrs:{type:"background"}},[o("h6",{staticClass:"category"},[t._v("Basic Civitas")]),t._v(" "),o("h3",{staticClass:"card-title"},[t._v("The Right Mistake")]),t._v(" "),o("p",{staticClass:"card-description"},[t._v("\n                      Living in South Central L.A., Socrates Fortlow is a sixty-year-old ex-convict, still\n                      strong enough to kill men with...\n                    ")]),t._v(" "),o("n-button",{attrs:{type:"danger",round:""}},[o("i",{staticClass:"now-ui-icons ui-1_send"}),t._v(" Read Now\n                    ")])],1)],1)]),t._v(" "),o("tab-pane",{attrs:{label:"Others"}},[o("div",{staticClass:"row"},[o("div",{staticClass:"col-md-6 px-0"},[o("card",{staticClass:"card-background-product card-no-shadow",staticStyle:{"background-image":"url('img/project20.jpg')"},attrs:{type:"background"}},[o("h6",{staticClass:"category"},[t._v("Fiction")]),t._v(" "),o("h3",{staticClass:"card-title"},[t._v("The Sun Also Rises")]),t._v(" "),o("p",{staticClass:"card-description"},[t._v("\n                        The most commonly read works are works of fiction. Fiction books are ones that have been\n                        made up...\n                      ")])])],1)])])],1)],1)])]),t._v(" "),o("div",{staticClass:"testimonials-1 section-image",staticStyle:{"background-image":"url('img/bg19.jpg')"}},[o("div",{staticClass:"container"},[t._m(2),t._v(" "),o("div",{staticClass:"row"},[o("div",{staticClass:"col-md-4"},[o("card",{attrs:{type:"testimonial"}},[o("img",{staticClass:"img img-raised",attrs:{slot:"avatar",src:"img/michael.jpg"},slot:"avatar"}),t._v(" "),o("p",{staticClass:"card-description"},[t._v("\n                The networking at Web Summit is like no other European tech conference.\n              ")]),t._v(" "),o("template",{slot:"raw-content"},[o("div",{staticClass:"icon icon-success"},[o("i",{staticClass:"fas fa-quote-right"})]),t._v(" "),o("div",{staticClass:"card-footer"},[o("h4",{staticClass:"card-title"},[t._v("Michael Elijah")]),t._v(" "),o("p",{staticClass:"category"},[t._v("@michaelelijah")])])])],2)],1),t._v(" "),o("div",{staticClass:"col-md-4"},[o("card",{attrs:{type:"testimonial"}},[o("img",{staticClass:"img img-raised",attrs:{slot:"avatar",src:"img/olivia.jpg"},slot:"avatar"}),t._v(" "),o("p",{staticClass:"card-description"},[t._v("\n                The connections you make at Web Summit are unparalleled, we met users all over the\n                world.\n              ")]),t._v(" "),o("template",{slot:"raw-content"},[o("div",{staticClass:"icon icon-success"},[o("i",{staticClass:"fas fa-quote-right"})]),t._v(" "),o("div",{staticClass:"card-footer"},[o("h4",{staticClass:"card-title"},[t._v("Olivia Harper")]),t._v(" "),o("p",{staticClass:"category"},[t._v("@oliviaharper")])])])],2)],1),t._v(" "),o("div",{staticClass:"col-md-4"},[o("card",{attrs:{type:"testimonial"}},[o("img",{staticClass:"img img-raised",attrs:{slot:"avatar",src:"img/james.jpg"},slot:"avatar"}),t._v(" "),o("p",{staticClass:"card-description"},[t._v("\n                Web Summit will increase your appetite, your inspiration, and your network.\n              ")]),t._v(" "),o("template",{slot:"raw-content"},[o("div",{staticClass:"icon icon-success"},[o("i",{staticClass:"fas fa-quote-right"})]),t._v(" "),o("div",{staticClass:"card-footer"},[o("h4",{staticClass:"card-title"},[t._v("James Logan")]),t._v(" "),o("p",{staticClass:"category"},[t._v("@jameslogan")])])])],2)],1)])])]),t._v(" "),o("div",{staticClass:"pricing-2"},[o("div",{staticClass:"pricing-2",attrs:{id:"pricing-2"}},[o("div",{staticClass:"container"},[o("div",{staticClass:"row"},[o("div",{staticClass:"col-md-6 ml-auto mr-auto text-center"},[o("h2",{staticClass:"title"},[t._v("Pick the best plan for you")]),t._v(" "),o("tabs",{attrs:{pills:"",type:"success",centered:""}},[o("tab-pane",{attrs:{label:"Legal Entity"}}),t._v(" "),o("tab-pane",{attrs:{label:"Individual"}})],1)],1)]),t._v(" "),o("div",{staticClass:"row"},[o("div",{staticClass:"col-md-4"},[o("card",{attrs:{type:"pricing",plain:""}},[o("h6",{staticClass:"category"},[t._v("Enterprise")]),t._v(" "),o("h1",{staticClass:"card-title"},[o("small",[t._v("$")]),t._v("\n                  59\n                ")]),t._v(" "),o("ul",[o("li",[o("b",[t._v("10GB")]),t._v(" Disk Space\n                  ")]),t._v(" "),o("li",[o("b",[t._v("100GB")]),t._v(" Monthly Bandwidth\n                  ")]),t._v(" "),o("li",[o("b",[t._v("20")]),t._v(" Email Accounts\n                  ")]),t._v(" "),o("li",[o("b",[t._v("Unlimited")]),t._v(" subdomains\n                  ")])]),t._v(" "),o("n-button",{attrs:{type:"success",round:""}},[t._v("\n                  Sign Up\n                ")])],1)],1),t._v(" "),o("div",{staticClass:"col-md-4"},[o("card",{staticClass:"card-background",staticStyle:{"background-image":"url('img/pricing2.jpg')"},attrs:{type:"pricing",raised:""}},[o("h6",{staticClass:"category text-info"},[t._v("Professional")]),t._v(" "),o("h1",{staticClass:"card-title"},[o("small",[t._v("$")]),t._v("\n                  29\n                ")]),t._v(" "),o("ul",[o("li",[o("b",[t._v("5GB")]),t._v(" Disk Space\n                  ")]),t._v(" "),o("li",[o("b",[t._v("50GB")]),t._v(" Monthly Bandwidth\n                  ")]),t._v(" "),o("li",[o("b",[t._v("10")]),t._v(" Email Accounts\n                  ")]),t._v(" "),o("li",[o("b",[t._v("Unlimited")]),t._v(" subdomains\n                  ")])]),t._v(" "),o("n-button",{staticClass:"btn-neutral",attrs:{round:""}},[t._v("\n                  Sign Up\n                ")])],1)],1),t._v(" "),o("div",{staticClass:"col-md-4"},[o("card",{attrs:{type:"pricing",plain:""}},[o("h6",{staticClass:"category"},[t._v("Standard")]),t._v(" "),o("h1",{staticClass:"card-title"},[o("small",[t._v("$")]),t._v("\n                  17\n                ")]),t._v(" "),o("ul",[o("li",[o("b",[t._v("2GB")]),t._v(" Disk Space\n                  ")]),t._v(" "),o("li",[o("b",[t._v("25GB")]),t._v(" Monthly Bandwidth\n                  ")]),t._v(" "),o("li",[o("b",[t._v("5")]),t._v(" Email Accounts\n                  ")]),t._v(" "),o("li",[o("b",[t._v("Unlimited")]),t._v(" subdomains\n                  ")])]),t._v(" "),o("a",{staticClass:"btn btn-success btn-round",attrs:{href:"#pablo"}},[t._v("\n                  Get Started\n                ")])])],1)])])])]),t._v(" "),o("div",{staticClass:"section section-contact-us text-center"},[o("div",{staticClass:"container"},[o("h2",{staticClass:"title"},[t._v("Want to work with us?")]),t._v(" "),o("p",{staticClass:"description"},[t._v("Your project is very important to us.")]),t._v(" "),o("div",{staticClass:"row"},[o("div",{staticClass:"col-lg-6 text-center ml-auto mr-auto col-md-8"},[o("fg-input",{staticClass:"input-lg",attrs:{placeholder:"First Name...","addon-left-icon":"now-ui-icons users_circle-08"},model:{value:t.form.firstName,callback:function(e){t.$set(t.form,"firstName",e)},expression:"form.firstName"}}),t._v(" "),o("fg-input",{staticClass:"input-lg",attrs:{placeholder:"Email Here...","addon-left-icon":"now-ui-icons ui-1_email-85"},model:{value:t.form.email,callback:function(e){t.$set(t.form,"email",e)},expression:"form.email"}}),t._v(" "),o("div",{staticClass:"textarea-container"},[o("textarea",{directives:[{name:"model",rawName:"v-model",value:t.form.message,expression:"form.message"}],staticClass:"form-control",attrs:{name:"name",rows:"4",cols:"80",placeholder:"Type a message..."},domProps:{value:t.form.message},on:{input:function(e){e.target.composing||t.$set(t.form,"message",e.target.value)}}})]),t._v(" "),o("div",{staticClass:"send-button"},[o("n-button",{attrs:{type:"success",round:"",block:"",size:"lg"}},[t._v("Send Message")])],1)],1)])])])])}),[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"page-header page-header-small rellax-header"},[o("div",{staticClass:"page-header-image",staticStyle:{"background-image":"url('img/bghome.jpeg')"}}),t._v(" "),o("div",{staticClass:"content-center"},[o("h1",{staticClass:"title"},[t._v("Welcome to Langkawi Art Budget Rooms!")])])])},function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"section section-about-us"},[o("div",{staticClass:"container"},[o("div",{staticClass:"row"},[o("div",{staticClass:"col-md-8 ml-auto mr-auto text-center"},[o("h2",{staticClass:"title"},[t._v("Who we are?")]),t._v(" "),o("h5",{staticClass:"description"},[t._v("According to the National Oceanic and Atmospheric Administration, Ted,\n              Scambos, NSIDClead scentist, puts the potentially record low maximum sea ice extent tihs\n              year down to low ice extent in the Pacific and a late drop in ice extent in the Barents\n              Sea.")])])]),t._v(" "),o("div",{staticClass:"separator separator-success"}),t._v(" "),o("div",{staticClass:"section-story-overview"},[o("div",{staticClass:"row"},[o("div",{staticClass:"col-md-6"},[o("div",{staticClass:"image-container image-left",staticStyle:{"background-image":"url('img/bghome2.png')"}},[o("p",{staticClass:"blockquote blockquote-primary"},[t._v('"Over the span of the satellite record, Arctic\n                  sea ice has been declining significantly, while sea ice in the Antarctichas\n                  increased very slightly"\n                  '),o("br"),t._v(" "),o("br"),t._v(" "),o("small",[t._v("-NOAA")])])]),t._v(" "),o("div",{staticClass:"image-container image-left-bottom",staticStyle:{"background-image":"url('img/bghome3.png')"}})]),t._v(" "),o("div",{staticClass:"col-md-5"},[o("div",{staticClass:"image-container image-right",staticStyle:{"background-image":"url('img/home4.jpeg')"}}),t._v(" "),o("h3",[t._v("So what does the new record for the lowest level of winter ice actually mean")]),t._v(" "),o("p",[t._v("The Arctic Ocean freezes every winter and much of the sea-ice then thaws every summer,\n                and that process will continue whatever happens with climate change. Even if the Arctic\n                continues to be one of the fastest-warming regions of the world, it will always be\n                plunged into bitterly cold polar dark every winter. And year-by-year, for all kinds of\n                natural reasons, there’s huge variety of the state of the ice.\n              ")]),t._v(" "),o("p",[t._v("\n                For a start, it does not automatically follow that a record amount of ice will melt this\n                summer. More important for determining the size of the annual thaw is the state of the\n                weather as the midnight sun approaches and temperatures rise. But over the more than 30\n                years of satellite records, scientists have observed a clear pattern of decline,\n                decade-by-decade.\n              ")]),t._v(" "),o("p",[t._v("The Arctic Ocean freezes every winter and much of the sea-ice then thaws every summer,\n                and that process will continue whatever happens with climate change. Even if the Arctic\n                continues to be one of the fastest-warming regions of the world, it will always be\n                plunged into bitterly cold polar dark every winter. And year-by-year, for all kinds of\n                natural reasons, there’s huge variety of the state of the ice.\n              ")])])])])])])},function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"row"},[o("div",{staticClass:"col-md-6 ml-auto mr-auto text-center"},[o("h2",{staticClass:"title"},[t._v("What is ALPHA?")]),t._v(" "),o("h4",{staticClass:"description text-white"},[t._v("If you’re selected for ALPHA you’ll also get 3 tickets,\n              opportunity to access Investor Office Hours and Mentor Hours and much more all for\n              €850.")])])])}],!1,null,null,null);e.default=component.exports}}]);