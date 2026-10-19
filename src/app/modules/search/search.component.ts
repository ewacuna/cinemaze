import {
  Component,
  DestroyRef,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Title} from '@angular/platform-browser';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {
  catchError,
  defer,
  distinctUntilChanged,
  EMPTY,
  exhaustMap,
  finalize,
  forkJoin,
  map,
  of,
  startWith,
  Subject,
  switchMap,
  tap,
  timer,
} from 'rxjs';

import {SearchService} from '../../core/services';
import {IMovieTv, IResult} from '../../shared/models';
import {MovieTvCardComponent} from '../../shared/components';

type SearchType = 'all' | 'movie' | 'tv';
type SearchResult = IResult & {isMovie: boolean};

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, MovieTvCardComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  private readonly titleService = inject(Title);
  private readonly searchService = inject(SearchService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly nextPage$ = new Subject<void>();
  private page = 0;
  private moviePages = 0;
  private tvPages = 0;

  readonly searchControl = new FormControl('', {nonNullable: true});
  readonly query = signal('');
  readonly type = signal<SearchType>('all');
  readonly media = signal<SearchResult[]>([]);
  readonly isLoading = signal(false);
  readonly error = signal('');
  readonly totalResults = signal(0);
  readonly hasMore = signal(false);
  readonly isInitialLoading = computed(
    () => this.isLoading() && this.media().length === 0
  );
  readonly filters: {value: SearchType; label: string}[] = [
    {value: 'all', label: 'All'},
    {value: 'movie', label: 'Movies'},
    {value: 'tv', label: 'TV Shows'},
  ];
  readonly suggestions = ['Interstellar', 'The Bear', 'Spirited Away'];
  readonly skeletons = Array.from({length: 12}, (_, index) => index);

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        map((value) => value.trim()),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((query) => this.updateUrl(query, this.type()));

    let firstSearch = true;
    this.route.queryParamMap
      .pipe(
        map((params) => ({
          query: (params.get('q') || '').trim(),
          type: this.parseType(params.get('type')),
        })),
        distinctUntilChanged(
          (previous, current) =>
            previous.query === current.query && previous.type === current.type
        ),
        switchMap(({query, type}) => {
          const delay = firstSearch || query === this.query() ? 0 : 300;
          firstSearch = false;
          this.query.set(query);
          this.type.set(type);
          if (this.searchControl.value.trim() !== query) {
            this.searchControl.setValue(query, {emitEvent: false});
          }
          this.titleService.setTitle(
            query ? `Cinemaze | Search: ${query}` : 'Cinemaze | Search'
          );
          this.media.set([]);
          this.error.set('');
          this.totalResults.set(0);
          this.hasMore.set(false);
          this.page = 0;
          this.moviePages = 0;
          this.tvPages = 0;
          this.isLoading.set(!!query);
          if (!query) return EMPTY;

          // Switching queries cancels both the debounce and every pending page request.
          return timer(delay).pipe(
            switchMap(() =>
              this.nextPage$.pipe(
                startWith(undefined),
                exhaustMap(() => this.fetchPage(query, type))
              )
            )
          );
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  setType(type: SearchType): void {
    this.updateUrl(this.searchControl.value.trim(), type);
  }

  searchFor(query: string): void {
    this.searchControl.setValue(query);
  }

  clearSearch(input: HTMLInputElement): void {
    this.searchControl.setValue('');
    input.focus();
  }

  loadMore(): void {
    if (!this.isLoading() && (this.hasMore() || this.error()))
      this.nextPage$.next();
  }

  private parseType(type: string | null): SearchType {
    return type === 'movie' || type === 'tv' ? type : 'all';
  }

  private updateUrl(query: string, type: SearchType): void {
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {q: query || null, type: type === 'all' ? null : type},
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  private fetchPage(query: string, type: SearchType) {
    return defer(() => {
      this.isLoading.set(true);
      this.error.set('');
      const page = this.page + 1;
      const movies$ =
        type !== 'tv' && (page === 1 || page <= this.moviePages)
          ? this.searchService.searchMovies(query, page)
          : of(null);
      const tvShows$ =
        type !== 'movie' && (page === 1 || page <= this.tvPages)
          ? this.searchService.searchTvShows(query, page)
          : of(null);

      return forkJoin({movies: movies$, tvShows: tvShows$}).pipe(
        tap(({movies, tvShows}) => {
          if (movies) this.moviePages = movies.total_pages;
          if (tvShows) this.tvPages = tvShows.total_pages;
          if (page === 1) {
            this.totalResults.set(
              (movies?.total_results || 0) + (tvShows?.total_results || 0)
            );
          }
          const movieResults = this.tagResults(movies, true);
          const tvResults = this.tagResults(tvShows, false);
          // Interleave each provider's ranking so neither media type is buried.
          const results = movieResults.flatMap((movie, index) =>
            tvResults[index] ? [movie, tvResults[index]] : [movie]
          );
          results.push(...tvResults.slice(movieResults.length));
          this.media.update((current) => {
            const seen = new Set(
              current.map((item) => `${item.isMovie}:${item.id}`)
            );
            return [
              ...current,
              ...results.filter((item) => {
                const key = `${item.isMovie}:${item.id}`;
                if (seen.has(key)) return false;
                seen.add(key);
                return true;
              }),
            ];
          });
          this.page = page;
          this.hasMore.set(
            page < Math.min(500, Math.max(this.moviePages, this.tvPages))
          );
        }),
        catchError(() => {
          this.error.set(
            this.page === 0
              ? 'We couldn’t load your results. Please try again.'
              : 'We couldn’t load more results. Your current results are still here.'
          );
          return EMPTY;
        }),
        finalize(() => this.isLoading.set(false))
      );
    });
  }

  private tagResults(
    response: IMovieTv | null,
    isMovie: boolean
  ): SearchResult[] {
    return (response?.results || []).map((item) => ({...item, isMovie}));
  }
}
