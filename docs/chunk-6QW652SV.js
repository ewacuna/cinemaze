import{a as F,b as I}from"./chunk-QZJP2QJD.js";import{d as A}from"./chunk-LD5ABUTV.js";import"./chunk-KTGRGPNF.js";import"./chunk-YB7CJQYF.js";import{g as L,m as G}from"./chunk-BDJMZKLO.js";import{$a as s,A as _,D as S,Ia as l,M as b,Qa as M,U as f,Ua as k,Wa as C,X as x,Ya as p,Za as c,_a as a,ab as m,d as w,fb as $,gb as d,hb as h,j as y,lb as v,r as T,rb as E}from"./chunk-HAJA6DEO.js";var g=(e,t)=>t.id;function P(e,t){if(e&1&&(a(0,"li",9),m(1,"img",10)(2,"span",11),s()),e&2){let i=t.$implicit;l(),h("ngSrc","https://image.tmdb.org/t/p/w300/",i.backdrop_path,""),d("alt",i.name)}}function j(e,t){if(e&1&&(a(0,"li",9),m(1,"img",10)(2,"span",11),s()),e&2){let i=t.$implicit;l(),h("ngSrc","https://image.tmdb.org/t/p/w300/",i.backdrop_path,""),d("alt",i.name)}}function R(e,t){if(e&1&&(a(0,"li",9),m(1,"img",10)(2,"span",11),s()),e&2){let i=t.$implicit;l(),h("ngSrc","https://image.tmdb.org/t/p/w300/",i.backdrop_path,""),d("alt",i.title)}}function z(e,t){if(e&1&&(a(0,"li",9),m(1,"img",10)(2,"span",11),s()),e&2){let i=t.$implicit;l(),h("ngSrc","https://image.tmdb.org/t/p/w300/",i.backdrop_path,""),d("alt",i.title)}}function B(e,t){if(e&1&&(a(0,"li",9),m(1,"img",10)(2,"span",11),s()),e&2){let i=t.$implicit;l(),h("ngSrc","https://image.tmdb.org/t/p/w300/",i.backdrop_path,""),d("alt",i.title)}}function D(e,t){if(e&1&&(a(0,"div",12),m(1,"app-movie-tv-list",13),s()),e&2){let i=t.$implicit;l(),k("title",i.name)("movies",i.results)("isMovie",!0)}}function V(e,t){if(e&1&&p(0,D,2,3,"div",14,g),e&2){let i=$();c(i.movieGenreList)}}var Z=(()=>{let t=class t{constructor(){this.titleService=f(G),this.moviesService=f(F),this.tvShowsService=f(I),this.destroy$=new y,this.nowPlayingMovies=[],this.popularMovies=[],this.onTheAirTvShows=[],this.topRatedTvShows=[],this.popularTvShows=[],this.movieGenreList=[],this.isLoading=!1}ngOnInit(){this.titleService.setTitle("Cinemaze | Home"),this.getAllMovies(),this.getAllTvShows(),this.getAllMovieGenres()}getAllMovies(){this.isLoading=!0;let n=this.getMovies("now_playing",1),r=this.getMovies("popular",1);n.pipe(_(r)).subscribe({next:([o,u])=>{this.nowPlayingMovies=o.results||[],this.popularMovies=u.results||[],this.isLoading=!1},error:o=>{this.isLoading=!1,console.error(o.status_message)}})}getAllTvShows(){this.isLoading=!0;let n=this.getTvShows("on_the_air",1),r=this.getTvShows("popular",1),o=this.getTvShows("top_rated",1);n.pipe(_(r,o)).subscribe({next:([u,H,O])=>{this.onTheAirTvShows=u.results||[],this.popularTvShows=H.results||[],this.topRatedTvShows=O.results||[],this.isLoading=!1},error:u=>{this.isLoading=!1,console.error(u.status_message)}})}getAllMovieGenres(){this.getMovieGenres().subscribe({next:n=>w(this,null,function*(){let r=n.genres||[];for(let o of r)yield this.getMoviesByGenre(o).then()}),error:n=>{this.isLoading=!1,console.error(n.status_message)}})}getMovies(n,r){return this.moviesService.getMovies(n,r).pipe(S(1),b(this.destroy$))}getTvShows(n,r){return this.tvShowsService.getTVShows(n,r).pipe(S(1),b(this.destroy$))}getMovieGenres(){return this.moviesService.getGenres().pipe(S(1),b(this.destroy$))}getMoviesByGenre(n){return w(this,null,function*(){let r=this.moviesService.getMoviesByGenre(n.id).pipe(S(1),b(this.destroy$));yield T(r).then(o=>{this.movieGenreList.push({id:n.id,name:n.name,results:o.results||[]})}).catch(()=>{this.movieGenreList.push({id:n.id,name:n.name,results:[]})})})}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}};t.\u0275fac=function(r){return new(r||t)},t.\u0275cmp=x({type:t,selectors:[["app-home"]],standalone:!0,features:[E],decls:35,vars:1,consts:[[1,"container","grid","place-items-center","mx-auto","pt-4","md:pt-2","px-2"],["aria-label","Trending movies",1,"fade-x-in-out","relative","isolate","-z-10","col-start-1","row-start-1","grid","max-w-full","gap-2","overflow-x-hidden"],[1,""],[1,"grid","grid-flow-col","gap-2"],[1,"col-start-1","row-start-1","text-center"],[1,"text-4xl","lg:text-6xl","font-extrabold","mb-6","leading-none"],[1,"text-main-color"],[1,"px-6","md:px-56","lg:px-64","text-white"],[1,"container","mx-auto","pt-24","md:pt-16","px-2"],[1,"relative","w-44"],["width","176","height","98",1,"banner-image","select-none","object-cover","rounded-xl",3,"ngSrc","alt"],[1,"banner-image","banner-backdrop","select-none","object-cover","rounded-xl","absolute","inset-0"],[1,"mb-4","md:mb-5","lg:mb-6"],[3,"title","movies","isMovie"],["class","mb-4 md:mb-5 lg:mb-6"],["class","relative w-44"]],template:function(r,o){r&1&&(a(0,"header",0)(1,"ul",1)(2,"li",2)(3,"ul",3),p(4,P,3,2,"li",15,g),s()(),a(6,"li",2)(7,"ul",3),p(8,j,3,2,"li",15,g),s()(),a(10,"li",2)(11,"ul",3),p(12,R,3,2,"li",15,g),s()(),a(14,"li",2)(15,"ul",3),p(16,z,3,2,"li",15,g),s()(),a(18,"li",2)(19,"ul",3),p(20,B,3,2,"li",15,g),s()()(),a(22,"div",4)(23,"h1",5),v(24," Movies & TV "),m(25,"br"),v(26," For "),a(27,"span",6),v(28,"Everyone"),s(),m(29,"br"),v(30,"To Enjoy "),s(),a(31,"p",7),v(32," Find the perfect movie for any occasion \u2013 family nights, friend gatherings, or quality time with kids. Ensure everyone's happiness during your next movie night with our great recommendations! "),s()()(),a(33,"section",8),M(34,V,2,0),s()),r&2&&(l(4),c(o.nowPlayingMovies),l(4),c(o.popularMovies),l(4),c(o.onTheAirTvShows),l(4),c(o.popularTvShows),l(4),c(o.topRatedTvShows),l(14),C(34,o.movieGenreList&&o.movieGenreList.length>0?34:-1))},dependencies:[L,A],styles:[".fade-x-in-out[_ngcontent-%COMP%]{-webkit-mask-image:linear-gradient(90deg,transparent,black 2rem,black calc(100% - 2rem),transparent);mask-image:linear-gradient(90deg,transparent,black 2rem,black calc(100% - 2rem),transparent)}@media (min-width: 768px){.fade-x-in-out[_ngcontent-%COMP%]{-webkit-mask-image:linear-gradient(90deg,transparent,black 4rem,black calc(100% - 4rem),transparent);mask-image:linear-gradient(90deg,transparent,black 4rem,black calc(100% - 4rem),transparent)}}.banner-backdrop[_ngcontent-%COMP%]{background-color:#020617b3}"]});let e=t;return e})();export{Z as HomeComponent};
