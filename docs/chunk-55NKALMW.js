import{b as C}from"./chunk-745DX67G.js";import"./chunk-KSZ7TJ34.js";import{c as R,d as b}from"./chunk-TW7U22G6.js";import"./chunk-5AFJANDP.js";import"./chunk-YB7CJQYF.js";import{n as x}from"./chunk-T7DBZPUE.js";import{$a as _,A as c,D as m,Ia as s,M as d,Qa as S,Ra as w,Sa as f,U as h,Ua as n,X as T,_a as u,ab as l,fb as g,j as v,rb as y}from"./chunk-HAJA6DEO.js";var M=()=>[b];function $(t,o){if(t&1&&(u(0,"section",0),l(1,"app-movie-tv-list",1)(2,"app-movie-tv-list",1)(3,"app-movie-tv-list",1),_()),t&2){let r=g();s(),n("title","On The Air")("movies",r.onTheAirTvShows)("isMovie",!1),s(),n("title","Popular")("movies",r.popularTvShows)("isMovie",!1),s(),n("title","Top Rated")("movies",r.topRatedTvShows)("isMovie",!1)}}function L(t,o){t&1&&l(0,"app-spinner")}var z=(()=>{let o=class o{constructor(){this.titleService=h(x),this.tvShowsService=h(C),this.destroy$=new v,this.onTheAirTvShows=[],this.topRatedTvShows=[],this.popularTvShows=[]}ngOnInit(){this.titleService.setTitle("Cinemaze | TV Shows"),this.getAllTvShows()}getAllTvShows(){this.isLoading=!0;let i=this.getTvShows("on_the_air",1),e=this.getTvShows("popular",1),a=this.getTvShows("top_rated",1);i.pipe(c(e,a)).subscribe({next:([p,A,D])=>{this.handleTvShowsResponse("on_the_air",p.results),this.handleTvShowsResponse("popular",A.results),this.handleTvShowsResponse("top_rated",D.results),this.isLoading=!1},error:p=>{this.isLoading=!1,console.error(p.status_message)}})}getTvShows(i,e){return this.tvShowsService.getTVShows(i,e).pipe(m(1),d(this.destroy$))}handleTvShowsResponse(i,e){switch(i){case"on_the_air":this.onTheAirTvShows=e||[];break;case"popular":this.popularTvShows=e||[];break;case"top_rated":this.topRatedTvShows=e||[];break}}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}};o.\u0275fac=function(e){return new(e||o)},o.\u0275cmp=T({type:o,selectors:[["app-tv-shows"]],standalone:!0,features:[y],decls:4,vars:1,consts:[[1,"px-4","pt-4","md:pt-2"],[3,"title","movies","isMovie"]],template:function(e,a){e&1&&(S(0,$,4,9)(1,L,1,0),w(2,0,M,null,1)),e&2&&(s(2),f(!a.isLoading))},dependencies:[R]});let t=o;return t})();export{z as TvShowsComponent};
