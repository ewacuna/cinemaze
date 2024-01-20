import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment';
import {IMovieTv, ITvShow} from '../../shared/models';

@Injectable({
  providedIn: 'root',
})
export class TvShowsService {
  // Services
  private http: HttpClient = inject(HttpClient);

  // Properties
  private baseUrl: string = environment.theMovieDBURL;
  private apiKey: string = environment.theMovieDBAPIKey;
  private language: string = 'en-US';
  private region: string = 'US';

  public getTVShows(type: string, page: number): Observable<IMovieTv> {
    return this.http.get<IMovieTv>(
      `${this.baseUrl}tv/${type}?api_key=${this.apiKey}&page=${page}&language=${this.language}`
    );
  }

  public getTVShow(id: string): Observable<ITvShow> {
    return this.http.get<ITvShow>(
      `${this.baseUrl}tv/${id}?api_key=${this.apiKey}&language=${this.language}`
    );
  }

  public getRecommendTVShows(id: string): Observable<IMovieTv> {
    return this.http.get<IMovieTv>(
      `${this.baseUrl}tv/${id}/recommendations?api_key=${this.apiKey}`
    );
  }
}
