import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

import {IMovieTv} from '../../shared/models';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  // Services
  private http: HttpClient = inject(HttpClient);

  // Properties
  private apiKey: string = environment.theMovieDBAPIKey;

  public searchMovies(query: string): Observable<IMovieTv> {
    return this.http.get<IMovieTv>(
      `search/movie?api_key=${this.apiKey}&query=${query}&page=1&include_adult=false`
    );
  }

  public searchTvShows(query: string): Observable<IMovieTv> {
    return this.http.get<IMovieTv>(
      `search/tv?api_key=${this.apiKey}&query=${query}&page=1&include_adult=false`
    );
  }
}
