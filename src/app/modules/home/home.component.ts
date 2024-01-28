import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {
  combineLatestWith,
  lastValueFrom,
  Observable,
  Subject,
  take,
  takeUntil,
} from 'rxjs';
import {NgOptimizedImage} from '@angular/common';

import {MoviesService, TvShowsService} from '../../core/services';
import {
  IGenre,
  IMovieGenres,
  IMovieTv,
  IResult,
  IResultsGenre,
} from '../../shared/models';
import {CustomError} from '../../shared/models/errors.model';
import {MovieTvListComponent, SpinnerComponent} from '../../shared/components';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgOptimizedImage, MovieTvListComponent, SpinnerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  // Services
  private titleService: Title = inject(Title);
  private moviesService: MoviesService = inject(MoviesService);
  private tvShowsService: TvShowsService = inject(TvShowsService);

  // Properties
  private destroy$: Subject<void> = new Subject<void>();
  public nowPlayingMovies: WritableSignal<IResult[]> = signal<IResult[]>([]);
  public popularMovies: WritableSignal<IResult[]> = signal<IResult[]>([]);
  public onTheAirTvShows: WritableSignal<IResult[]> = signal<IResult[]>([]);
  public topRatedTvShows: WritableSignal<IResult[]> = signal<IResult[]>([]);
  public popularTvShows: WritableSignal<IResult[]> = signal<IResult[]>([]);
  public movieGenreList: IResultsGenre[] = [];

  // State
  public isLoading: WritableSignal<boolean> = signal<boolean>(false);

  ngOnInit(): void {
    this.titleService.setTitle('Cinemaze | Home');
    this.getAllMovies();
    this.getAllTvShows();
    this.getAllMovieGenres();
  }

  private getAllMovies(): void {
    this.isLoading.set(true);
    const nowPlaying$: Observable<IMovieTv> = this.getMovies('now_playing', 1);
    const popular$: Observable<IMovieTv> = this.getMovies('popular', 1);

    nowPlaying$.pipe(combineLatestWith(popular$)).subscribe({
      next: ([nowPlaying, popular]): void => {
        this.nowPlayingMovies.set(nowPlaying.results || []);
        this.popularMovies.set(popular.results || []);
        this.isLoading.set(false);
      },
      error: (error: CustomError): void => {
        this.isLoading.set(false);
        console.error(error.status_message);
      },
    });
  }

  private getAllTvShows(): void {
    this.isLoading.set(true);
    const onTheAir$: Observable<IMovieTv> = this.getTvShows('on_the_air', 1);
    const popular$: Observable<IMovieTv> = this.getTvShows('popular', 1);
    const topRated$: Observable<IMovieTv> = this.getTvShows('top_rated', 1);

    onTheAir$.pipe(combineLatestWith(popular$, topRated$)).subscribe({
      next: ([onTheAir, popular, topRated]): void => {
        this.onTheAirTvShows.set(onTheAir.results || []);
        this.popularTvShows.set(popular.results || []);
        this.topRatedTvShows.set(topRated.results || []);
        this.isLoading.set(false);
      },
      error: (error: CustomError): void => {
        this.isLoading.set(false);
        console.error(error.status_message);
      },
    });
  }

  /**
   * Fetches movie genres and then retrieves movies for each genre.
   * The method uses asynchronous operations to ensure that the movies for each genre
   * are fetched sequentially.
   */
  private getAllMovieGenres(): void {
    this.getMovieGenres().subscribe({
      next: async (value: IMovieGenres): Promise<void> => {
        const movieGenreList: IGenre[] = value.genres || [];
        for (const movieGenre of movieGenreList) {
          await this.getMoviesByGenre(movieGenre).then();
        }
      },
      error: (error: CustomError): void => {
        this.isLoading.set(false);
        console.error(error.status_message);
      },
    });
  }

  private getMovies(type: string, page: number): Observable<IMovieTv> {
    return this.moviesService
      .getMovies(type, page)
      .pipe(take(1), takeUntil(this.destroy$));
  }

  private getTvShows(type: string, page: number): Observable<IMovieTv> {
    return this.tvShowsService
      .getTVShows(type, page)
      .pipe(take(1), takeUntil(this.destroy$));
  }

  private getMovieGenres(): Observable<IMovieGenres> {
    return this.moviesService
      .getGenres()
      .pipe(take(1), takeUntil(this.destroy$));
  }

  private async getMoviesByGenre(genre: IGenre): Promise<void> {
    const movie$: Observable<IMovieTv> = this.moviesService
      .getMoviesByGenre(genre.id)
      .pipe(take(1), takeUntil(this.destroy$));

    await lastValueFrom(movie$)
      .then((value: IMovieTv): void => {
        this.movieGenreList.push({
          id: genre.id,
          name: genre.name,
          results: value.results || [],
        });
      })
      .catch((): void => {
        this.movieGenreList.push({
          id: genre.id,
          name: genre.name,
          results: [],
        });
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
