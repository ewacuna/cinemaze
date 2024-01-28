import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment';
import {
  IMovieTv,
  IMovie,
  IMovieVideos,
  IMovieGenres,
} from '../../shared/models';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  // Services
  private http: HttpClient = inject(HttpClient);

  // Properties
  private apiKey: string = environment.theMovieDBAPIKey;
  private language: string = 'en-US';
  private region: string = 'US';

  public getMovies(type: string, page: number = 1): Observable<IMovieTv> {
    return this.http.get<IMovieTv>(
      `movie/${type}?api_key=${this.apiKey}&page=${page}&language=${this.language}&region=${this.region}`
    );
  }

  public getMovie(id: string): Observable<IMovie> {
    return this.http.get<IMovie>(`movie/${id}?api_key=${this.apiKey}`);
  }

  public getMovieWithGenre(
    genreId: string,
    page: number = 1
  ): Observable<IMovieTv> {
    return this.http.get<IMovieTv>(
      `discover/movie?with_genres=${genreId}&api_key=${this.apiKey}&page=${page}`
    );
  }

  public getRecommendedMovies(id: string): Observable<IMovieTv> {
    return this.http.get<IMovieTv>(
      `movie/${id}/recommendations?api_key=${this.apiKey}`
    );
  }

  public getMovieVideos(id: string): Observable<IMovieVideos> {
    return this.http.get<IMovieVideos>(
      `movie/${id}/videos?api_key=${this.apiKey}`
    );
  }

  public getGenres(): Observable<IMovieGenres> {
    return this.http.get<IMovieGenres>(
      `genre/movie/list?api_key=${this.apiKey}&language=${this.language}`
    );
  }

  public getMoviesByGenre(id: number): Observable<IMovieTv> {
    return this.http.get<IMovieTv>(`genre/${id}/movies?api_key=${this.apiKey}`);
  }
}
