import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {combineLatestWith, Observable, Subject, take, takeUntil} from 'rxjs';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';

import {
  IMovie,
  IMovieTv,
  IMovieVideos,
  IResult,
  ITvShow,
  IVideoData,
} from '../../shared/models';
import {MoviesService, TvShowsService} from '../../core/services';
import {CustomError} from '../../shared/models/errors.model';
import {SpinnerComponent} from '../../shared/components';
import {ImgMissingDirective} from '../../shared/directives';
import {MovieInfoComponent} from '../movies/components';
import {TvShowInfoComponent} from '../tv-shows/components';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgForOf,
    NgIf,
    SpinnerComponent,
    ImgMissingDirective,
    MovieInfoComponent,
    TvShowInfoComponent,
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit, OnDestroy {
  // Services
  private titleService: Title = inject(Title);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private moviesService: MoviesService = inject(MoviesService);
  private tvShowsService: TvShowsService = inject(TvShowsService);

  // Properties
  private destroy$: Subject<void> = new Subject<void>();
  public contentType = '';
  public movie: IMovie;
  public recommendedMovies: IResult[] = [];
  public movieVideos: IVideoData[] = [];
  public tv: ITvShow;
  public recommendedTvShows: IResult[] = [];

  // State
  public isMovie: boolean;
  public isLoading = false;

  ngOnInit(): void {
    this.contentType = this.router.url.split('/')[1];

    this.route.params.subscribe((params: Params): void => {
      const id = params['id'];

      this.isMovie = this.contentType === 'movies';

      this.isLoading = true;
      if (this.isMovie) {
        this.getMovie(id);
      } else {
        this.getTvShow(id);
      }
    });
  }

  private getMovie(id: string): void {
    const movie$: Observable<IMovie> = this.moviesService
      .getMovie(id)
      .pipe(take(1), takeUntil(this.destroy$));
    const recommended$: Observable<IMovieTv> = this.getRecommendedMovies(id);
    const videos$: Observable<IMovieVideos> = this.getMovieVideo(id);

    movie$.pipe(combineLatestWith(recommended$, videos$)).subscribe({
      next: ([movie, recommended, videos]): void => {
        this.movie = movie;
        this.recommendedMovies = recommended.results ?? [];
        this.movieVideos = videos.results ?? [];
        this.titleService.setTitle('Cinemaze | ' + this.movie.title);
        this.isLoading = false;
      },
      error: (error: CustomError): void => {
        this.isLoading = false;
        console.error(error.status_message);
      },
    });
  }

  private getTvShow(id: string): void {
    const tvShow$: Observable<ITvShow> = this.tvShowsService
      .getTVShow(id)
      .pipe(take(1), takeUntil(this.destroy$));
    const recommended$: Observable<IMovieTv> = this.getRecommendTVShows(id);

    tvShow$.pipe(combineLatestWith(recommended$)).subscribe({
      next: ([tvShow, recommended]): void => {
        this.tv = tvShow;
        this.recommendedTvShows = recommended.results ?? [];
        this.titleService.setTitle('Cinemaze | ' + this.tv.name);
        this.isLoading = false;
      },
      error: (error: CustomError): void => {
        this.isLoading = false;
        console.error(error.status_message);
      },
    });
  }

  private getRecommendedMovies(id: string): Observable<IMovieTv> {
    return this.moviesService
      .getRecommendedMovies(id)
      .pipe(take(1), takeUntil(this.destroy$));
  }

  private getMovieVideo(id: string): Observable<IMovieVideos> {
    return this.moviesService
      .getMovieVideos(id)
      .pipe(take(1), takeUntil(this.destroy$));
  }

  private getRecommendTVShows(id: string): Observable<IMovieTv> {
    return this.tvShowsService
      .getRecommendTVShows(id)
      .pipe(take(1), takeUntil(this.destroy$));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
