import {
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {NgOptimizedImage, NgTemplateOutlet} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {Observable, Subject, take, takeUntil} from 'rxjs';

import {MoviesService, TvShowsService} from '../../core/services';
import {IGenre, IMovieTv, IResult} from '../../shared/models';
import {MovieTvListComponent} from '../../shared/components';

type LoadState = 'loading' | 'ready' | 'error';
interface HomeShelf {
  key: string;
  title: string;
  isMovie: boolean;
  type?: string;
  genre?: number;
  items: IResult[];
  state: LoadState;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgTemplateOutlet,
    MovieTvListComponent,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly titleService = inject(Title);
  private readonly moviesService = inject(MoviesService);
  private readonly tvShowsService = inject(TvShowsService);
  private readonly router = inject(Router);
  private readonly destroy$ = new Subject<void>();

  readonly nowPlayingMovies = signal<IResult[]>([]);
  readonly popularMovies = signal<IResult[]>([]);
  readonly onTheAirTvShows = signal<IResult[]>([]);
  readonly topRatedTvShows = signal<IResult[]>([]);
  readonly popularTvShows = signal<IResult[]>([]);
  readonly genres = signal<IGenre[]>([]);
  readonly genreState = signal<LoadState>('loading');
  readonly showAllGenres = signal(false);
  readonly visibleGenres = computed(() =>
    this.showAllGenres() ? this.genres() : this.genres().slice(0, 6)
  );
  readonly shelves = signal<HomeShelf[]>([
    {
      key: 'popular',
      title: 'Popular movies',
      isMovie: true,
      type: 'popular',
      items: [],
      state: 'loading',
    },
    {
      key: 'on-air',
      title: 'On TV now',
      isMovie: false,
      type: 'on_the_air',
      items: [],
      state: 'loading',
    },
    {
      key: 'top-rated',
      title: 'Top-rated series',
      isMovie: false,
      type: 'top_rated',
      items: [],
      state: 'loading',
    },
  ]);
  readonly genreShelves = computed(() =>
    this.shelves().filter((shelf) => shelf.genre)
  );
  readonly backdropPlaceholders = Array.from({length: 9}, (_, index) => index);
  readonly cardPlaceholders = Array.from({length: 6}, (_, index) => index);
  readonly backdropRows = computed(() =>
    [
      this.nowPlayingMovies(),
      this.onTheAirTvShows(),
      this.popularMovies(),
      this.popularTvShows(),
      this.topRatedTvShows(),
    ].map((items) => items.filter((item) => !!item.backdrop_path).slice(0, 9))
  );

  search(event: Event, value: string): void {
    event.preventDefault();
    const query = value.trim();
    if (query)
      void this.router.navigate(['/search'], {queryParams: {q: query}});
  }

  ngOnInit(): void {
    this.titleService.setTitle('Cinemaze | Home');
    this.shelves().forEach((shelf) => this.loadShelf(shelf.key));
    this.loadBackdrop(
      this.moviesService.getMovies('now_playing', 1),
      this.nowPlayingMovies
    );
    this.loadBackdrop(
      this.tvShowsService.getTVShows('popular', 1),
      this.popularTvShows
    );
    this.loadGenres();
  }

  loadShelf(key: string): void {
    const shelf = this.shelves().find((item) => item.key === key);
    if (!shelf) return;
    this.updateShelf(key, {state: 'loading'});
    const request = shelf.genre
      ? this.moviesService.getMoviesByGenre(shelf.genre)
      : shelf.isMovie
        ? this.moviesService.getMovies(shelf.type!, 1)
        : this.tvShowsService.getTVShows(shelf.type!, 1);
    request.pipe(take(1), takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        const items = response.results || [];
        this.updateShelf(key, {items, state: 'ready'});
        if (key === 'popular') this.popularMovies.set(items);
        if (key === 'on-air') this.onTheAirTvShows.set(items);
        if (key === 'top-rated') this.topRatedTvShows.set(items);
      },
      error: () => this.updateShelf(key, {state: 'error'}),
    });
  }

  loadGenres(): void {
    this.genreState.set('loading');
    this.moviesService
      .getGenres()
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          const genres = response.genres || [];
          this.genres.set(genres);
          this.genreState.set('ready');
          // A short, varied selection; retain the provider's genre names and IDs.
          const preferred = [28, 35, 16, 53];
          const selected = preferred
            .map((id) => genres.find((genre) => genre.id === id))
            .filter((genre): genre is IGenre => !!genre);
          const selection = [
            ...selected,
            ...genres.filter((genre) => !preferred.includes(genre.id)),
          ].slice(0, 4);
          const rows: HomeShelf[] = selection.map((genre) => ({
            key: `genre-${genre.id}`,
            title: genre.name,
            isMovie: true,
            genre: genre.id,
            items: [],
            state: 'loading',
          }));
          this.shelves.update((current) => [
            ...current.filter((shelf) => !shelf.genre),
            ...rows,
          ]);
          rows.forEach((shelf) => this.loadShelf(shelf.key));
        },
        error: () => this.genreState.set('error'),
      });
  }

  private updateShelf(key: string, changes: Partial<HomeShelf>): void {
    this.shelves.update((rows) =>
      rows.map((row) => (row.key === key ? {...row, ...changes} : row))
    );
  }

  private loadBackdrop(
    request: Observable<IMovieTv>,
    target: WritableSignal<IResult[]>
  ): void {
    request
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe({
        next: (response) => target.set(response.results || []),
        error: () => target.set([]),
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
