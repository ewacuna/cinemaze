import{b as R}from"./chunk-VAYPCUPX.js";import"./chunk-SICOUY3U.js";import{c as b,e as A}from"./chunk-ZOCI2KRV.js";import"./chunk-GZZDOCLL.js";import"./chunk-5RSMTTT3.js";import{g as C}from"./chunk-RSTN5FUJ.js";import"./chunk-L3YDZJ26.js";import{$a as u,A as c,D as d,Ib as x,M as m,Ma as S,Ra as s,W as h,Z as T,Za as w,_a as f,bb as n,hb as _,ib as g,j as v,jb as l,tb as y}from"./chunk-4IYO3GOY.js";var M=()=>[A];function $(t,o){if(t&1&&(_(0,"section",0),l(1,"app-movie-tv-list",1)(2,"app-movie-tv-list",1)(3,"app-movie-tv-list",1),g()),t&2){let r=y();s(),n("title","On The Air")("movies",r.onTheAirTvShows)("isMovie",!1)("withType","on_the_air"),s(),n("title","Popular")("movies",r.popularTvShows)("isMovie",!1)("withType","popular"),s(),n("title","Top Rated")("movies",r.topRatedTvShows)("isMovie",!1)("withType","top_rated")}}function k(t,o){t&1&&l(0,"app-spinner")}var E=(()=>{let o=class o{constructor(){this.titleService=h(C),this.tvShowsService=h(R),this.destroy$=new v,this.onTheAirTvShows=[],this.topRatedTvShows=[],this.popularTvShows=[],this.isLoading=S(!0)}ngOnInit(){this.titleService.setTitle("Cinemaze | TV Shows"),this.getAllTvShows()}getAllTvShows(){this.isLoading.set(!0);let i=this.getTvShows("on_the_air",1),e=this.getTvShows("popular",1),p=this.getTvShows("top_rated",1);i.pipe(c(e,p)).subscribe({next:([a,D,L])=>{this.handleTvShowsResponse("on_the_air",a.results),this.handleTvShowsResponse("popular",D.results),this.handleTvShowsResponse("top_rated",L.results),this.isLoading.set(!1)},error:a=>{this.isLoading.set(!1),console.error(a.status_message)}})}getTvShows(i,e){return this.tvShowsService.getTVShows(i,e).pipe(d(1),m(this.destroy$))}handleTvShowsResponse(i,e){switch(i){case"on_the_air":this.onTheAirTvShows=e||[];break;case"popular":this.popularTvShows=e||[];break;case"top_rated":this.topRatedTvShows=e||[];break}}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}};o.\u0275fac=function(e){return new(e||o)},o.\u0275cmp=T({type:o,selectors:[["app-tv-shows"]],standalone:!0,features:[x],decls:4,vars:1,consts:[[1,"px-4","pt-4","md:pt-2"],[3,"title","movies","isMovie","withType"]],template:function(e,p){e&1&&(w(0,$,4,12)(1,k,1,0),f(2,0,M,null,1)),e&2&&(s(2),u(!p.isLoading()))},dependencies:[b]});let t=o;return t})();export{E as TvShowsComponent};
