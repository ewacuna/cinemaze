import{h as n}from"./chunk-BDJMZKLO.js";import{P as s,U as a}from"./chunk-HAJA6DEO.js";var o={production:!0,theMovieDBURL:"https://api.themoviedb.org/3/",theMovieDBAPIKey:"faee9c0136cd798d012632fed70bb8dc"};var l=(()=>{let e=class e{constructor(){this.http=a(n),this.baseUrl=o.theMovieDBURL,this.apiKey=o.theMovieDBAPIKey,this.language="en-US",this.region="US"}getMovies(t,r){return this.http.get(`${this.baseUrl}movie/${t}?api_key=${this.apiKey}&page=${r}&language=${this.language}&region=${this.region}`)}getMovie(t){return this.http.get(`${this.baseUrl}movie/${t}?api_key=${this.apiKey}`)}getRecommendedMovies(t){return this.http.get(`${this.baseUrl}movie/${t}/recommendations?api_key=${this.apiKey}`)}getMovieVideos(t){return this.http.get(`${this.baseUrl}movie/${t}/videos?api_key=${this.apiKey}`)}getGenres(){return this.http.get(`${this.baseUrl}genre/movie/list?api_key=${this.apiKey}&language=${this.language}`)}getMoviesByGenre(t){return this.http.get(`${this.baseUrl}genre/${t}/movies?api_key=${this.apiKey}`)}};e.\u0275fac=function(r){return new(r||e)},e.\u0275prov=s({token:e,factory:e.\u0275fac,providedIn:"root"});let i=e;return i})();var b=(()=>{let e=class e{constructor(){this.http=a(n),this.baseUrl=o.theMovieDBURL,this.apiKey=o.theMovieDBAPIKey,this.language="en-US",this.region="US"}getTVShows(t,r){return this.http.get(`${this.baseUrl}tv/${t}?api_key=${this.apiKey}&page=${r}&language=${this.language}`)}getTVShow(t){return this.http.get(`${this.baseUrl}tv/${t}?api_key=${this.apiKey}&language=${this.language}`)}getRecommendTVShows(t){return this.http.get(`${this.baseUrl}tv/${t}/recommendations?api_key=${this.apiKey}`)}};e.\u0275fac=function(r){return new(r||e)},e.\u0275prov=s({token:e,factory:e.\u0275fac,providedIn:"root"});let i=e;return i})();export{l as a,b};
