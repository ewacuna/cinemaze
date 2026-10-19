import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

import {IMovieTv} from '../../shared/models';

@Injectable({providedIn: 'root'})
export class SearchService {
  private readonly http = inject(HttpClient);

  searchMovies(query: string, page = 1): Observable<IMovieTv> {
    return this.search('movie', query, page);
  }

  searchTvShows(query: string, page = 1): Observable<IMovieTv> {
    return this.search('tv', query, page);
  }

  private search(
    type: 'movie' | 'tv',
    query: string,
    page: number
  ): Observable<IMovieTv> {
    const params = new HttpParams()
      .set('api_key', environment.theMovieDBAPIKey)
      .set('query', query)
      .set('page', page)
      .set('include_adult', false);
    return this.http.get<IMovieTv>(`search/${type}`, {params});
  }
}
