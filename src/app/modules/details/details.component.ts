import {
  Component,
  computed,
  DestroyRef,
  HostListener,
  inject,
  Signal,
  signal,
  WritableSignal,
  ChangeDetectionStrategy,
} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {DomSanitizer, SafeResourceUrl, Title} from '@angular/platform-browser';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import {HttpErrorResponse} from '@angular/common/http';
import {
  catchError,
  combineLatest,
  forkJoin,
  map,
  Observable,
  of,
  startWith,
  Subject,
  switchMap,
  tap,
} from 'rxjs';

import {IMovieTv, IResult, IVideoData} from '../../shared/models';
import {MoviesService, TvShowsService} from '../../core/services';
import {ImgMissingDirective} from '../../shared/directives';
import {formatRuntime, tmdbImage} from '../../shared/helpers';
import {MovieInfoComponent} from '../movies/components';
import {TvShowInfoComponent} from '../tv-shows/components';
import {
  ContentType,
  DetailsData,
  DetailsHero,
  DetailsState,
} from './details.model';

const DEFAULT_TITLE = 'Cinemaze';
const OVERVIEW_CLAMP_LENGTH = 280;

@Component({
  selector: 'app-details',
  imports: [
    NgOptimizedImage,
    RouterLink,
    ImgMissingDirective,
    MovieInfoComponent,
    TvShowInfoComponent,
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './details.component.html',
})
export class DetailsComponent {
  // Services
  private titleService: Title = inject(Title);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private sanitizer: DomSanitizer = inject(DomSanitizer);
  private moviesService: MoviesService = inject(MoviesService);
  private tvShowsService: TvShowsService = inject(TvShowsService);

  // Properties
  private type: ContentType = this.route.snapshot.data['type'];
  private retry$: Subject<void> = new Subject<void>();

  // State
  // Declared before `state`: toSignal subscribes synchronously and load() resets them.
  public isOverviewExpanded: WritableSignal<boolean> = signal(false);
  public isTrailerOpen: WritableSignal<boolean> = signal(false);
  public isLinkCopied: WritableSignal<boolean> = signal(false);
  public isNotFound: WritableSignal<boolean> = signal(false);
  public state: Signal<DetailsState> = toSignal(
    combineLatest([
      this.route.paramMap.pipe(map((params) => params.get('id') ?? '')),
      this.retry$.pipe(startWith(undefined)),
    ]).pipe(
      tap((): void => window.scrollTo({top: 0})),
      // switchMap cancels in-flight requests when the id changes.
      switchMap(([id]) =>
        this.load(id).pipe(
          map((data): DetailsState => ({status: 'success', data})),
          catchError((): Observable<DetailsState> => of({status: 'error'})),
          startWith<DetailsState>({status: 'loading'})
        )
      )
    ),
    {initialValue: {status: 'loading'}}
  );

  public data: Signal<DetailsData | null> = computed(() => {
    const state = this.state();
    return state.status === 'success' ? state.data : null;
  });

  public hero: Signal<DetailsHero | null> = computed(() => {
    const data = this.data();
    if (!data) {
      return null;
    }

    if (data.type === 'movie') {
      const {movie} = data;
      return {
        title: movie.title,
        backdrop: tmdbImage(movie.backdrop_path, 'w1280'),
        poster: tmdbImage(movie.poster_path, 'w300_and_h450_bestv2'),
        genres: movie.genres ?? [],
        tagline: movie.tagline,
        overview: movie.overview,
        meta: [
          movie.release_date?.slice(0, 4),
          formatRuntime(movie.runtime),
          movie.status !== 'Released' ? movie.status : null,
        ].filter((item): item is string => !!item),
        rating: movie.vote_count ? movie.vote_average.toFixed(1) : null,
      };
    }

    const {tv} = data;
    const seasons = tv.number_of_seasons;
    return {
      title: tv.name,
      backdrop: tmdbImage(tv.backdrop_path, 'w1280'),
      poster: tmdbImage(tv.poster_path, 'w300_and_h450_bestv2'),
      genres: tv.genres ?? [],
      tagline: tv.tagline,
      overview: tv.overview,
      meta: [
        tv.first_air_date?.toString().slice(0, 4),
        seasons ? `${seasons} season${seasons > 1 ? 's' : ''}` : null,
        formatRuntime(tv.episode_run_time?.[0]),
      ].filter((item): item is string => !!item),
      rating: tv.vote_count ? tv.vote_average.toFixed(1) : null,
    };
  });

  public isMovie: Signal<boolean> = computed(() => this.type === 'movie');

  public isOverviewLong: Signal<boolean> = computed(
    () => (this.hero()?.overview.length ?? 0) > OVERVIEW_CLAMP_LENGTH
  );

  public trailerUrl: Signal<SafeResourceUrl | null> = computed(() => {
    const data = this.data();
    if (data?.type !== 'movie') {
      return null;
    }

    const trailer = data.videos.find(
      (video: IVideoData): boolean =>
        video.site === 'YouTube' && video.type === 'Trailer'
    );
    return trailer
      ? this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://www.youtube.com/embed/${trailer.key}?autoplay=1`
        )
      : null;
  });

  constructor() {
    inject(DestroyRef).onDestroy((): void =>
      this.titleService.setTitle(DEFAULT_TITLE)
    );
  }

  public retry(): void {
    this.retry$.next();
  }

  public openTrailer(): void {
    this.isTrailerOpen.set(true);
  }

  @HostListener('document:keydown.escape')
  public closeTrailer(): void {
    this.isTrailerOpen.set(false);
  }

  public async share(): Promise<void> {
    const url = window.location.href;
    const title = this.hero()?.title ?? DEFAULT_TITLE;

    try {
      if (navigator.share) {
        await navigator.share({title, url});
        return;
      }

      await navigator.clipboard.writeText(url);
      this.isLinkCopied.set(true);
      setTimeout(() => this.isLinkCopied.set(false), 2000);
    } catch {
      // The user dismissed the share sheet or clipboard access was denied.
    }
  }

  private load(id: string): Observable<DetailsData> {
    this.isOverviewExpanded.set(false);
    this.isTrailerOpen.set(false);
    this.isNotFound.set(false);

    const data$: Observable<DetailsData> =
      this.type === 'movie' ? this.loadMovie(id) : this.loadTvShow(id);

    return data$.pipe(
      tap({
        next: (data: DetailsData): void =>
          this.titleService.setTitle(
            `Cinemaze | ${data.type === 'movie' ? data.movie.title : data.tv.name}`
          ),
        error: (error: HttpErrorResponse): void =>
          this.isNotFound.set(error.status === 404),
      })
    );
  }

  private loadMovie(id: string): Observable<DetailsData> {
    return forkJoin({
      movie: this.moviesService.getMovie(id),
      // Secondary requests should never take the whole page down.
      recommended: this.toResults(this.moviesService.getRecommendedMovies(id)),
      videos: this.moviesService.getMovieVideos(id).pipe(
        map((videos): IVideoData[] => videos.results ?? []),
        catchError(() => of([]))
      ),
    }).pipe(map((data) => ({type: 'movie' as const, ...data})));
  }

  private loadTvShow(id: string): Observable<DetailsData> {
    return forkJoin({
      tv: this.tvShowsService.getTVShow(id),
      recommended: this.toResults(this.tvShowsService.getRecommendTVShows(id)),
    }).pipe(map((data) => ({type: 'tv' as const, ...data})));
  }

  private toResults(list$: Observable<IMovieTv>): Observable<IResult[]> {
    return list$.pipe(
      map((list: IMovieTv): IResult[] => list.results ?? []),
      catchError(() => of([]))
    );
  }
}
