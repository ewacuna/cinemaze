import{a as S}from"./chunk-VAYPCUPX.js";import"./chunk-SICOUY3U.js";import{c as b,e as D}from"./chunk-ZOCI2KRV.js";import"./chunk-GZZDOCLL.js";import"./chunk-5RSMTTT3.js";import{g as C}from"./chunk-RSTN5FUJ.js";import"./chunk-L3YDZJ26.js";import{$a as y,A as m,D as h,Ib as x,M as u,Ma as d,Ra as s,W as l,Z as g,Za as M,_a as f,bb as n,hb as w,ib as _,j as c,jb as v,tb as T}from"./chunk-4IYO3GOY.js";var $=()=>[D];function k(i,t){if(i&1&&(w(0,"section",0),v(1,"app-movie-tv-list",1)(2,"app-movie-tv-list",1)(3,"app-movie-tv-list",1),_()),i&2){let p=T();s(),n("title","Now Playing")("movies",p.nowPlayingMovies)("isMovie",!0)("withType","now_playing"),s(),n("title","Popular")("movies",p.popularMovies)("isMovie",!0)("withType","popular"),s(),n("title","Upcoming")("movies",p.upcomingMovies)("isMovie",!0)("withType","upcoming")}}function R(i,t){i&1&&v(0,"app-spinner")}var E=(()=>{let t=class t{constructor(){this.titleService=l(C),this.moviesService=l(S),this.destroy$=new c,this.nowPlayingMovies=[],this.upcomingMovies=[],this.popularMovies=[],this.isLoading=d(!0)}ngOnInit(){this.titleService.setTitle("Cinemaze | Movies"),this.getAllMovies()}getAllMovies(){this.isLoading.set(!0);let o=this.getMovies("now_playing",1),e=this.getMovies("popular",1),r=this.getMovies("upcoming",1);o.pipe(m(e,r)).subscribe({next:([a,L,P])=>{this.handleMoviesResponse("now_playing",a.results),this.handleMoviesResponse("popular",L.results),this.handleMoviesResponse("upcoming",P.results),this.isLoading.set(!1)},error:a=>{this.isLoading.set(!1),console.error(a.status_message)}})}getMovies(o,e){return this.moviesService.getMovies(o,e).pipe(h(1),u(this.destroy$))}handleMoviesResponse(o,e){switch(o){case"now_playing":this.nowPlayingMovies=e||[];break;case"popular":this.popularMovies=e||[];break;case"upcoming":this.upcomingMovies=e||[];break}}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}};t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=g({type:t,selectors:[["app-movies"]],standalone:!0,features:[x],decls:4,vars:1,consts:[[1,"px-4","pt-4","md:pt-2"],[3,"title","movies","isMovie","withType"]],template:function(e,r){e&1&&(M(0,k,4,12)(1,R,1,0),f(2,0,$,null,1)),e&2&&(s(2),y(!r.isLoading()))},dependencies:[b]});let i=t;return i})();export{E as MoviesComponent};
