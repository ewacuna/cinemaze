import{c as L,e as h,f as E}from"./chunk-KTGRGPNF.js";import{a as F,b as B}from"./chunk-YB7CJQYF.js";import{g as O}from"./chunk-BDJMZKLO.js";import{$ as C,$a as r,Ia as a,Qa as k,Ua as c,Wa as T,X as d,Ya as v,Za as g,_a as n,aa as S,ab as l,fb as b,gb as _,lb as p,nb as f,rb as m,sb as y}from"./chunk-HAJA6DEO.js";var V=(()=>{let e=class e{};e.\u0275fac=function(i){return new(i||e)},e.\u0275cmp=d({type:e,selectors:[["app-spinner"]],standalone:!0,features:[m],decls:3,vars:0,consts:[[1,"w-full","h-full","fixed","top-0","left-0","bg-black","opacity-60","z-50"],[1,"flex","justify-center","items-center","h-full"],[1,"loader"]],template:function(i,o){i&1&&(n(0,"section",0)(1,"div",1),l(2,"span",2),r()())},styles:['.loader[_ngcontent-%COMP%]{width:90px;height:90px;border:3px dotted var(--secondary-color);border-style:solid solid dotted dotted;border-radius:50%;display:inline-block;position:relative;box-sizing:border-box;animation:_ngcontent-%COMP%_rotation 2s linear infinite}.loader[_ngcontent-%COMP%]:after{content:"";box-sizing:border-box;position:absolute;inset:0;margin:auto;border:3px dotted var(--main-color);border-style:solid solid dotted;width:45px;height:45px;border-radius:50%;animation:_ngcontent-%COMP%_rotationBack 1s linear infinite;transform-origin:center center}@keyframes _ngcontent-%COMP%_rotation{0%{transform:rotate(0)}to{transform:rotate(360deg)}}@keyframes _ngcontent-%COMP%_rotationBack{0%{transform:rotate(0)}to{transform:rotate(-360deg)}}']});let t=e;return t})();var P=(t,e)=>[t,e],M=(()=>{let e=class e{};e.\u0275fac=function(i){return new(i||e)},e.\u0275cmp=d({type:e,selectors:[["app-movie-tv-card"]],inputs:{model:"model",isMovie:"isMovie"},standalone:!0,features:[m],decls:7,vars:13,consts:[[1,"max-w-sm","border","rounded-lg","shadow","bg-gray-800","border-gray-700"],[3,"routerLink"],["appMissingPicture","",1,"rounded-t-lg","w-full","object-cover","h-auto","select-none","transition","duration-300","ease-in-out","hover:opacity-40",3,"ngSrc","alt","height","width"],[1,"p-2","min-w-0"],[1,"mb-2","font-bold","tracking-tight","text-white","truncate"]],template:function(i,o){if(i&1&&(n(0,"article",0)(1,"a",1),l(2,"img",2),r(),n(3,"div",3)(4,"a",1)(5,"h6",4),p(6),r()()()()),i&2){let x;a(),c("routerLink",y(7,P,o.isMovie?"/movies":"/tv-shows",o.model.id)),a(),c("ngSrc","https://image.tmdb.org/t/p/w220_and_h330_face/"+o.model.poster_path)("alt",(x=o.model.name)!==null&&x!==void 0?x:o.model.title)("height",330)("width",220),a(2),c("routerLink",y(10,P,o.isMovie?"/movies":"/tv-shows",o.model.id)),a(2),f(" ",o.model.title||o.model.name," ")}},dependencies:[O,h,B]});let t=e;return t})();var D=(t,e)=>e.id;function I(t,e){if(t&1&&(n(0,"h1",2),p(1),r()),t&2){let u=b();a(),f(" ",u.title," ")}}function z(t,e){if(t&1&&(n(0,"swiper-slide",3),l(1,"app-movie-tv-card",4),r()),t&2){let u=e.$implicit,s=b();a(),c("model",u)("isMovie",s.isMovie)}}var A=(()=>{let e=class e{constructor(){this.showTitle=!0,this.isSmallView=!1,this.config={watchSlidesProgress:!0,breakpoints:{1200:{slidesPerView:7.3,spaceBetween:25,slidesOffsetBefore:0,slidesOffsetAfter:0},992:{slidesPerView:6.3,spaceBetween:20,slidesOffsetBefore:0,slidesOffsetAfter:0},768:{slidesPerView:4.3,spaceBetween:15,slidesOffsetBefore:0,slidesOffsetAfter:0},576:{slidesPerView:3.3,spaceBetween:15,slidesOffsetBefore:0,slidesOffsetAfter:0},320:{slidesPerView:2.3,spaceBetween:10,slidesOffsetBefore:10,slidesOffsetAfter:10}}}}ngOnInit(){this.setSmallView()}setSmallView(){if(this.isSmallView&&this.config.breakpoints){let s={1200:6.3,992:5.3,768:4.3,576:3.3,320:2.3};Object.keys(s).forEach(i=>{this.config.breakpoints[i]&&(this.config.breakpoints[i].slidesPerView=s[i])})}}};e.\u0275fac=function(i){return new(i||e)},e.\u0275cmp=d({type:e,selectors:[["app-movie-tv-list"]],inputs:{title:"title",movies:"movies",isMovie:"isMovie",showTitle:"showTitle",isSmallView:"isSmallView"},standalone:!0,features:[m],decls:5,vars:2,consts:[["class","mb-4 text-2xl font-extrabold leading-none tracking-tight text-white"],["appSwiper","",3,"config"],[1,"mb-4","text-2xl","font-extrabold","leading-none","tracking-tight","text-white"],[1,"pb-6"],[3,"model","isMovie"],["class","pb-6"]],template:function(i,o){i&1&&(n(0,"section"),k(1,I,2,1,"h1",0),n(2,"swiper-container",1),v(3,z,2,2,"swiper-slide",5,D),r()()),i&2&&(a(),T(1,o.showTitle?1:-1),a(),c("config",o.config),a(),g(o.movies))},dependencies:[F,M]});let t=e;return t})();var N=(()=>{let e=class e{};e.\u0275fac=function(i){return new(i||e)},e.\u0275cmp=d({type:e,selectors:[["app-body"]],standalone:!0,features:[m],decls:2,vars:0,consts:[[1,"text-white","mt-16","z-10"]],template:function(i,o){i&1&&(n(0,"section",0),l(1,"router-outlet"),r())},dependencies:[L]});let t=e;return t})();var j=(t,e)=>e.path;function R(t,e){if(t&1&&(n(0,"li")(1,"a",11),p(2),r()()),t&2){let u=e.$implicit;a(),_("routerLink",u.path),a(),f(" ",u.label," ")}}var $=(()=>{let e=class e{constructor(){this.appTitle="Cinemaze",this.navbarLinks=[{path:"home",label:"Home"},{path:"search",label:"Search"},{path:"movies",label:"Movies"},{path:"tv-shows",label:"TV Shows"}]}};e.\u0275fac=function(i){return new(i||e)},e.\u0275cmp=d({type:e,selectors:[["app-navbar"]],standalone:!0,features:[m],decls:15,vars:1,consts:[[1,"bg-gray-800","border-b","border-gray-700","fixed","w-full","z-20","top-0","start-0"],[1,"flex","flex-wrap","items-center","justify-between","mx-auto","p-4"],["routerLink","/",1,"flex","items-center","space-x-3","rtl:space-x-reverse"],["src","/assets/images/logo.svg","alt","Cinemaze Logo",1,"h-8"],[1,"self-center","text-2xl","font-semibold","whitespace-nowrap","text-main-color"],["data-collapse-toggle","main-navbar","type","button","aria-controls","main-navbar","aria-expanded","false",1,"inline-flex","items-center","p-2","w-10","h-10","justify-center","text-sm","rounded-lg","md:hidden","focus:outline-none","focus:ring-2","text-gray-400","hover:bg-gray-700","focus:ring-gray-600"],[1,"sr-only"],["aria-hidden","true","xmlns","http://www.w3.org/2000/svg","fill","none","viewBox","0 0 17 14",1,"w-5","h-5"],["stroke","currentColor","stroke-linecap","round","stroke-linejoin","round","stroke-width","2","d","M1 1h15M1 7h15M1 13h15"],["id","main-navbar",1,"hidden","w-full","md:block","md:w-auto"],[1,"flex","flex-col","font-medium","mt-4","rounded-lg","bg-gray-800","md:space-x-8","rtl:space-x-reverse","md:flex-row","md:mt-0","md:border-0","md:bg-transparent","md:dark:bg-transparent","border-gray-700"],["routerLinkActive","!text-main-color",1,"block","py-2","px-3","md:p-0","text-white","rounded","bg-transparent","hover:text-main-color",3,"routerLink"]],template:function(i,o){i&1&&(n(0,"nav",0)(1,"div",1)(2,"a",2),l(3,"img",3),n(4,"span",4),p(5),r()(),n(6,"button",5)(7,"span",6),p(8,"Open Menu"),r(),C(),n(9,"svg",7),l(10,"path",8),r()(),S(),n(11,"div",9)(12,"ul",10),v(13,R,3,2,"li",null,j),r()()()()),i&2&&(a(5),f(" ",o.appTitle," "),a(8),g(o.navbarLinks))},dependencies:[h,E]});let t=e;return t})();export{N as a,$ as b,V as c,A as d};
