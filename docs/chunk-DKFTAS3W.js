import{c as A,e as P}from"./chunk-JEA4XNYP.js";import"./chunk-55GHGXMF.js";import"./chunk-ZC43GOI5.js";import{a as I,b as H}from"./chunk-ZPRUZSLF.js";import"./chunk-SICOUY3U.js";import{g as F}from"./chunk-G7L6PCXA.js";import"./chunk-GHBTTLBA.js";import{$ as b,B as x,Bb as T,Cb as h,Db as v,F as f,Ib as g,P as S,Ra as m,Rb as D,Wa as s,ca as k,d as w,eb as y,fb as $,gb as E,ib as G,j as M,lb as L,nb as c,ob as d,pb as r,qb as a,r as C,rb as p}from"./chunk-LEEMBDAK.js";var R=()=>[import("./chunk-KRVGTVLZ.js").then(e=>e.NgOptimizedImage),P],u=(e,i)=>i.id;function z(e,i){if(e&1&&(r(0,"li",9),p(1,"img",10)(2,"span",11),a()),e&2){let t=i.$implicit;s(),v("ngSrc","https://image.tmdb.org/t/p/w300/",t.backdrop_path,""),h("alt",t.name)}}function B(e,i){if(e&1&&(r(0,"li",9),p(1,"img",10)(2,"span",11),a()),e&2){let t=i.$implicit;s(),v("ngSrc","https://image.tmdb.org/t/p/w300/",t.backdrop_path,""),h("alt",t.title)}}function V(e,i){if(e&1&&(r(0,"li",9),p(1,"img",10)(2,"span",11),a()),e&2){let t=i.$implicit;s(),v("ngSrc","https://image.tmdb.org/t/p/w300/",t.backdrop_path,""),h("alt",t.name)}}function W(e,i){if(e&1&&(r(0,"li",9),p(1,"img",10)(2,"span",11),a()),e&2){let t=i.$implicit;s(),v("ngSrc","https://image.tmdb.org/t/p/w300/",t.backdrop_path,""),h("alt",t.title)}}function q(e,i){if(e&1&&(r(0,"li",9),p(1,"img",10)(2,"span",11),a()),e&2){let t=i.$implicit;s(),v("ngSrc","https://image.tmdb.org/t/p/w300/",t.backdrop_path,""),h("alt",t.title)}}function N(e,i){if(e&1&&(r(0,"div",12),p(1,"app-movie-tv-list",13),a()),e&2){let t=i.$implicit;s(),G("title",t.name)("movies",t.results)("isMovie",!0)("withGenre",t.id)}}function U(e,i){if(e&1&&c(0,N,2,4,"div",14,u),e&2){let t=T(2);d(t.movieGenreList)}}function J(e,i){if(e&1&&(r(0,"header",0)(1,"ul",1)(2,"li",2)(3,"ul",3),c(4,z,3,2,"li",15,u),a()(),r(6,"li",2)(7,"ul",3),c(8,B,3,2,"li",15,u),a()(),r(10,"li",2)(11,"ul",3),c(12,V,3,2,"li",15,u),a()(),r(14,"li",2)(15,"ul",3),c(16,W,3,2,"li",15,u),a()(),r(18,"li",2)(19,"ul",3),c(20,q,3,2,"li",15,u),a()()(),r(22,"div",4)(23,"h1",5),g(24," Movies & TV "),p(25,"br"),g(26," For "),r(27,"span",6),g(28,"Everyone"),a(),p(29,"br"),g(30,"To Enjoy "),a(),r(31,"p",7),g(32," Find the perfect movie for any occasion \u2013 family nights, friend gatherings, or quality time with kids. Ensure everyone's happiness during your next movie night with our great recommendations! "),a()()(),r(33,"section",8),y(34,U,2,0),a()),e&2){let t=T();s(4),d(t.nowPlayingMovies()),s(4),d(t.onTheAirTvShows()),s(4),d(t.popularMovies()),s(4),d(t.popularTvShows()),s(4),d(t.topRatedTvShows()),s(14),L(34,t.movieGenreList&&t.movieGenreList.length>0?34:-1)}}function K(e,i){e&1&&p(0,"app-spinner")}var ne=(()=>{let i=class i{constructor(){this.titleService=b(F),this.moviesService=b(I),this.tvShowsService=b(H),this.destroy$=new M,this.nowPlayingMovies=m([]),this.popularMovies=m([]),this.onTheAirTvShows=m([]),this.topRatedTvShows=m([]),this.popularTvShows=m([]),this.movieGenreList=[],this.isLoading=m(!1)}ngOnInit(){this.titleService.setTitle("Cinemaze | Home"),this.getAllMovies(),this.getAllTvShows(),this.getAllMovieGenres()}getAllMovies(){this.isLoading.set(!0);let n=this.getMovies("now_playing",1),o=this.getMovies("popular",1);n.pipe(x(o)).subscribe({next:([l,_])=>{this.nowPlayingMovies.set(l.results||[]),this.popularMovies.set(_.results||[]),this.isLoading.set(!1)},error:l=>{this.isLoading.set(!1),console.error(l.status_message)}})}getAllTvShows(){this.isLoading.set(!0);let n=this.getTvShows("on_the_air",1),o=this.getTvShows("popular",1),l=this.getTvShows("top_rated",1);n.pipe(x(o,l)).subscribe({next:([_,O,j])=>{this.onTheAirTvShows.set(_.results||[]),this.popularTvShows.set(O.results||[]),this.topRatedTvShows.set(j.results||[]),this.isLoading.set(!1)},error:_=>{this.isLoading.set(!1),console.error(_.status_message)}})}getAllMovieGenres(){this.getMovieGenres().subscribe({next:n=>w(this,null,function*(){let o=n.genres||[];for(let l of o)yield this.getMoviesByGenre(l).then()}),error:n=>{this.isLoading.set(!1),console.error(n.status_message)}})}getMovies(n,o){return this.moviesService.getMovies(n,o).pipe(f(1),S(this.destroy$))}getTvShows(n,o){return this.tvShowsService.getTVShows(n,o).pipe(f(1),S(this.destroy$))}getMovieGenres(){return this.moviesService.getGenres().pipe(f(1),S(this.destroy$))}getMoviesByGenre(n){return w(this,null,function*(){let o=this.moviesService.getMoviesByGenre(n.id).pipe(f(1),S(this.destroy$));yield C(o).then(l=>{this.movieGenreList.push({id:n.id,name:n.name,results:l.results||[]})}).catch(()=>{this.movieGenreList.push({id:n.id,name:n.name,results:[]})})})}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}};i.\u0275fac=function(o){return new(o||i)},i.\u0275cmp=k({type:i,selectors:[["app-home"]],standalone:!0,features:[D],decls:4,vars:1,consts:[[1,"container","grid","place-items-center","mx-auto","pt-4","md:pt-2","px-2"],["aria-label","Trending movies",1,"fade-x-in-out","relative","isolate","-z-10","col-start-1","row-start-1","grid","max-w-full","gap-2","overflow-x-hidden"],[1,""],[1,"grid","grid-flow-col","gap-2"],[1,"col-start-1","row-start-1","text-center"],[1,"text-4xl","lg:text-6xl","font-extrabold","mb-6","leading-none"],[1,"text-main-color"],[1,"px-6","md:px-56","lg:px-64","text-white"],[1,"container","mx-auto","pt-24","md:pt-16","px-2"],[1,"relative","w-44","min-h-[99.14px]"],["width","176","height","98",1,"banner-image","select-none","object-cover","rounded-xl",3,"ngSrc","alt"],[1,"banner-image","banner-backdrop","select-none","object-cover","rounded-xl","absolute","inset-0"],[1,"mb-4","md:mb-5","lg:mb-6"],[3,"title","movies","isMovie","withGenre"],["class","mb-4 md:mb-5 lg:mb-6"],["class","relative w-44 min-h-[99.14px]"]],template:function(o,l){o&1&&(y(0,J,35,1)(1,K,1,0),$(2,0,R,null,1)),o&2&&(s(2),E(!l.isLoading()))},dependencies:[A],styles:[".fade-x-in-out[_ngcontent-%COMP%]{-webkit-mask-image:linear-gradient(90deg,transparent,black 2rem,black calc(100% - 2rem),transparent);mask-image:linear-gradient(90deg,transparent,black 2rem,black calc(100% - 2rem),transparent)}@media (min-width: 768px){.fade-x-in-out[_ngcontent-%COMP%]{-webkit-mask-image:linear-gradient(90deg,transparent,black 4rem,black calc(100% - 4rem),transparent);mask-image:linear-gradient(90deg,transparent,black 4rem,black calc(100% - 4rem),transparent)}}.banner-backdrop[_ngcontent-%COMP%]{background-color:#020617b3}"]});let e=i;return e})();export{ne as HomeComponent};
