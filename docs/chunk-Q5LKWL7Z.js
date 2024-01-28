import{c as D,e as h,f as V}from"./chunk-5XSUVUQD.js";import{a as I,b as z}from"./chunk-YWHKL5VD.js";import{d as E,e as B,h as F}from"./chunk-S5NHJLHY.js";import{$a as y,Ab as S,La as a,Ta as x,X as p,Xa as u,Za as b,ab as M,ba as g,bb as n,ca as w,cb as r,db as m,jb as v,kb as L,pb as d,rb as c,vb as f,wb as O,xb as T,yb as C}from"./chunk-ULJBGOCL.js";var A=(()=>{let e=class e{};e.\u0275fac=function(i){return new(i||e)},e.\u0275cmp=p({type:e,selectors:[["app-spinner"]],standalone:!0,features:[f],decls:3,vars:0,consts:[[1,"w-full","h-full","fixed","top-0","left-0","bg-black","opacity-60","z-50"],[1,"flex","justify-center","items-center","h-full"],[1,"loader"]],template:function(i,o){i&1&&(n(0,"section",0)(1,"div",1),m(2,"span",2),r()())},styles:['.loader[_ngcontent-%COMP%]{width:90px;height:90px;border:3px dotted var(--secondary-color);border-style:solid solid dotted dotted;border-radius:50%;display:inline-block;position:relative;box-sizing:border-box;animation:_ngcontent-%COMP%_rotation 2s linear infinite}.loader[_ngcontent-%COMP%]:after{content:"";box-sizing:border-box;position:absolute;inset:0;margin:auto;border:3px dotted var(--main-color);border-style:solid solid dotted;width:45px;height:45px;border-radius:50%;animation:_ngcontent-%COMP%_rotationBack 1s linear infinite;transform-origin:center center}@keyframes _ngcontent-%COMP%_rotation{0%{transform:rotate(0)}to{transform:rotate(360deg)}}@keyframes _ngcontent-%COMP%_rotationBack{0%{transform:rotate(0)}to{transform:rotate(-360deg)}}']});let t=e;return t})();function q(t,e){if(t&1&&(d(0),C(1,"date")),t&2){let l=v();c(" ",l.model.release_date?S(1,1,l.model.release_date,"shortDate"):""," ")}}function N(t,e){if(t&1&&(d(0),C(1,"date")),t&2){let l=v();c(" ",l.model.first_air_date?S(1,1,l.model.first_air_date,"shortDate"):""," ")}}var j=(t,e)=>[t,e],P=(()=>{let e=class e{};e.\u0275fac=function(i){return new(i||e)},e.\u0275cmp=p({type:e,selectors:[["app-movie-tv-card"]],inputs:{model:"model",isMovie:"isMovie"},standalone:!0,features:[f],decls:17,vars:18,consts:[[1,"max-w-sm","border","rounded-lg","shadow","bg-gray-800","border-gray-700"],[3,"routerLink"],["appMissingPicture","",1,"rounded-t-lg","w-full","object-cover","h-auto","select-none","transition","duration-300","ease-in-out","hover:opacity-40",3,"ngSrc","alt","height","width"],[1,"p-2","pb-0.5","min-w-0"],[1,"mt-2","flex","flex-wrap","items-center","gap-1","text-neutral-4"],["aria-label","Rating out of 5",1,"inline-flex","items-center","gap-0.5"],["fill","none","viewBox","0 0 24 24","stroke-width","1.5","stroke","currentColor","aria-hidden","true","xmlns","http://www.w3.org/2000/svg","width","100%","height","100%",1,"h-3","w-3"],["stroke-linecap","round","stroke-linejoin","round","d","M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"],[1,"p-2","pt-0.5","min-w-0"],[1,"mb-1","font-bold","tracking-tight","text-white","truncate"]],template:function(i,o){if(i&1&&(n(0,"article",0)(1,"a",1),m(2,"img",2),r(),n(3,"div",3)(4,"small",4),x(5,q,2,4)(6,N,2,4),d(7," \u2022 "),n(8,"span",5),g(),n(9,"svg",6),m(10,"path",7),r(),d(11),C(12,"number"),r()()(),w(),n(13,"div",8)(14,"a",1)(15,"h6",9),d(16),r()()()()),i&2){let _;a(),u("routerLink",T(12,j,o.isMovie?"/movies":"/tv-shows",o.model.id)),a(),u("ngSrc","https://image.tmdb.org/t/p/w220_and_h330_face/"+o.model.poster_path)("alt",(_=o.model.name)!==null&&_!==void 0?_:o.model.title)("height",330)("width",220),a(3),b(5,o.isMovie?5:6),a(6),c(" ",o.model.vote_average?S(12,9,o.model.vote_average,"1.1-1"):""," "),a(3),u("routerLink",T(15,j,o.isMovie?"/movies":"/tv-shows",o.model.id)),a(2),c(" ",o.model.title||o.model.name," ")}},dependencies:[F,h,z,B,E]});let t=e;return t})();var G=(t,e)=>e.id,R=()=>["/view"];function H(t,e){if(t&1&&(n(0,"div",2)(1,"h1",3),d(2),r(),n(3,"div")(4,"button",4),d(5," View All "),r()()()),t&2){let l=v();a(2),c(" ",l.title," "),a(2),u("routerLink",O(3,R))("queryParams",l.queryParams)}}function $(t,e){if(t&1&&(n(0,"swiper-slide",5),m(1,"app-movie-tv-card",6),r()),t&2){let l=e.$implicit,s=v();a(),u("model",l)("isMovie",s.isMovie)}}var Q=(()=>{let e=class e{constructor(){this.showTitle=!0,this.isSmallView=!1,this.queryParams={},this.config={watchSlidesProgress:!0,breakpoints:{1200:{slidesPerView:7.3,spaceBetween:25,slidesOffsetBefore:0,slidesOffsetAfter:0},992:{slidesPerView:6.3,spaceBetween:20,slidesOffsetBefore:0,slidesOffsetAfter:0},768:{slidesPerView:4.3,spaceBetween:15,slidesOffsetBefore:0,slidesOffsetAfter:0},576:{slidesPerView:3.3,spaceBetween:15,slidesOffsetBefore:0,slidesOffsetAfter:0},320:{slidesPerView:2.3,spaceBetween:10,slidesOffsetBefore:10,slidesOffsetAfter:10}}}}ngOnInit(){this.setSmallView(),this.createQueryParams()}createQueryParams(){this.queryParams.q=this.isMovie?"movie":"tv-show",this.withType&&(this.queryParams.type=this.withType),this.withGenre&&(this.queryParams.genre=this.withGenre)}setSmallView(){if(this.isSmallView&&this.config.breakpoints){let s={1200:6.3,992:5.3,768:4.3,576:3.3,320:2.3};Object.keys(s).forEach(i=>{this.config.breakpoints[i]&&(this.config.breakpoints[i].slidesPerView=s[i])})}}};e.\u0275fac=function(i){return new(i||e)},e.\u0275cmp=p({type:e,selectors:[["app-movie-tv-list"]],inputs:{title:"title",movies:"movies",isMovie:"isMovie",showTitle:"showTitle",isSmallView:"isSmallView",withGenre:"withGenre",withType:"withType"},standalone:!0,features:[f],decls:5,vars:2,consts:[["class","flex justify-between mb-4"],["appSwiper","",3,"config"],[1,"flex","justify-between","mb-4"],[1,"text-2xl","font-extrabold","leading-none","tracking-tight","text-white"],["type","button",1,"px-2.5","py-1.5","text-xs","font-medium","focus:outline-none","rounded-full","border","focus:z-10","bg-gray-800","text-gray-400","border-gray-600","hover:text-white","hover:bg-gray-700",3,"routerLink","queryParams"],[1,"pb-6"],[3,"model","isMovie"],["class","pb-6"]],template:function(i,o){i&1&&(n(0,"section"),x(1,H,6,4,"div",0),n(2,"swiper-container",1),y(3,$,2,2,"swiper-slide",7,G),r()()),i&2&&(a(),b(1,o.showTitle?1:-1),a(),u("config",o.config),a(),M(o.movies))},dependencies:[I,P,h]});let t=e;return t})();var U=(()=>{let e=class e{};e.\u0275fac=function(i){return new(i||e)},e.\u0275cmp=p({type:e,selectors:[["app-body"]],standalone:!0,features:[f],decls:2,vars:0,consts:[[1,"text-white","mt-16","z-10"]],template:function(i,o){i&1&&(n(0,"section",0),m(1,"router-outlet"),r())},dependencies:[D]});let t=e;return t})();var J=(t,e)=>e.path;function K(t,e){if(t&1&&(n(0,"li")(1,"a",11),d(2),r()()),t&2){let l=e.$implicit;a(),L("routerLink",l.path),a(),c(" ",l.label," ")}}var W=(()=>{let e=class e{constructor(){this.appTitle="Cinemaze",this.navbarLinks=[{path:"home",label:"Home"},{path:"search",label:"Search"},{path:"movies",label:"Movies"},{path:"tv-shows",label:"TV Shows"}]}};e.\u0275fac=function(i){return new(i||e)},e.\u0275cmp=p({type:e,selectors:[["app-navbar"]],standalone:!0,features:[f],decls:15,vars:1,consts:[[1,"bg-gray-800","border-b","border-gray-700","fixed","w-full","z-20","top-0","start-0"],[1,"flex","flex-wrap","items-center","justify-between","mx-auto","p-4"],["routerLink","/",1,"flex","items-center","space-x-3","rtl:space-x-reverse"],["src","./assets/images/logo.svg","alt","Cinemaze Logo",1,"h-8"],[1,"self-center","text-2xl","font-semibold","whitespace-nowrap","text-main-color"],["data-collapse-toggle","main-navbar","type","button","aria-controls","main-navbar","aria-expanded","false",1,"inline-flex","items-center","p-2","w-10","h-10","justify-center","text-sm","rounded-lg","md:hidden","focus:outline-none","focus:ring-2","text-gray-400","hover:bg-gray-700","focus:ring-gray-600"],[1,"sr-only"],["aria-hidden","true","xmlns","http://www.w3.org/2000/svg","fill","none","viewBox","0 0 17 14",1,"w-5","h-5"],["stroke","currentColor","stroke-linecap","round","stroke-linejoin","round","stroke-width","2","d","M1 1h15M1 7h15M1 13h15"],["id","main-navbar",1,"hidden","w-full","md:block","md:w-auto"],[1,"flex","flex-col","font-medium","mt-4","rounded-lg","bg-gray-800","md:space-x-8","rtl:space-x-reverse","md:flex-row","md:mt-0","md:border-0","md:bg-transparent","md:dark:bg-transparent","border-gray-700"],["routerLinkActive","!text-main-color",1,"block","py-2","px-3","md:p-0","text-white","rounded","bg-transparent","hover:text-main-color",3,"routerLink"]],template:function(i,o){i&1&&(n(0,"nav",0)(1,"div",1)(2,"a",2),m(3,"img",3),n(4,"span",4),d(5),r()(),n(6,"button",5)(7,"span",6),d(8,"Open Menu"),r(),g(),n(9,"svg",7),m(10,"path",8),r()(),w(),n(11,"div",9)(12,"ul",10),y(13,K,3,2,"li",null,J),r()()()()),i&2&&(a(5),c(" ",o.appTitle," "),a(8),M(o.navbarLinks))},dependencies:[h,V]});let t=e;return t})();export{U as a,W as b,A as c,P as d,Q as e};
