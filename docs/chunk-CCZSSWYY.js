import{a as S}from"./chunk-745DX67G.js";import"./chunk-KSZ7TJ34.js";import{c as b,d as D}from"./chunk-TW7U22G6.js";import"./chunk-5AFJANDP.js";import"./chunk-YB7CJQYF.js";import{n as C}from"./chunk-T7DBZPUE.js";import{$a as _,A as m,D as u,Ia as s,M as h,Qa as g,Ra as M,Sa as f,U as l,Ua as n,X as d,_a as y,ab as v,fb as w,j as c,rb as x}from"./chunk-HAJA6DEO.js";var L=()=>[D];function T(i,t){if(i&1&&(y(0,"section",0),v(1,"app-movie-tv-list",1)(2,"app-movie-tv-list",1)(3,"app-movie-tv-list",1),_()),i&2){let p=w();s(),n("title","Now Playing")("movies",p.nowPlayingMovies)("isMovie",!0),s(),n("title","Popular")("movies",p.popularMovies)("isMovie",!0),s(),n("title","Upcoming")("movies",p.upcomingMovies)("isMovie",!0)}}function k(i,t){i&1&&v(0,"app-spinner")}var z=(()=>{let t=class t{constructor(){this.titleService=l(C),this.moviesService=l(S),this.destroy$=new c,this.nowPlayingMovies=[],this.upcomingMovies=[],this.popularMovies=[]}ngOnInit(){this.titleService.setTitle("Cinemaze | Movies"),this.getAllMovies()}getAllMovies(){this.isLoading=!0;let o=this.getMovies("now_playing",1),e=this.getMovies("popular",1),r=this.getMovies("upcoming",1);o.pipe(m(e,r)).subscribe({next:([a,P,$])=>{this.handleMoviesResponse("now_playing",a.results),this.handleMoviesResponse("popular",P.results),this.handleMoviesResponse("upcoming",$.results),this.isLoading=!1},error:a=>{this.isLoading=!1,console.error(a.status_message)}})}getMovies(o,e){return this.moviesService.getMovies(o,e).pipe(u(1),h(this.destroy$))}handleMoviesResponse(o,e){switch(o){case"now_playing":this.nowPlayingMovies=e||[];break;case"popular":this.popularMovies=e||[];break;case"upcoming":this.upcomingMovies=e||[];break}}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}};t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=d({type:t,selectors:[["app-movies"]],standalone:!0,features:[x],decls:4,vars:1,consts:[[1,"px-4","pt-4","md:pt-2"],[3,"title","movies","isMovie"]],template:function(e,r){e&1&&(g(0,T,4,9)(1,k,1,0),M(2,0,L,null,1)),e&2&&(s(2),f(!r.isLoading))},dependencies:[b]});let i=t;return i})();export{z as MoviesComponent};
