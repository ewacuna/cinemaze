import {
  Component,
  OnInit,
  inject,
  OnDestroy,
  WritableSignal,
  signal,
} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {
  combineLatestWith,
  debounceTime,
  distinctUntilChanged,
  Observable,
  startWith,
  Subscription,
} from 'rxjs';

import {SearchService} from '../../core/services';
import {IMovieTv, IResult} from '../../shared/models';
import {CustomError} from '../../shared/models/errors.model';
import {MovieTvCardComponent} from '../../shared/components';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, MovieTvCardComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit, OnDestroy {
  // Services
  private titleService: Title = inject(Title);
  private searchService: SearchService = inject(SearchService);

  // Properties
  public searchForm: FormGroup;
  public subs: Subscription = new Subscription();
  public media: WritableSignal<IResult[]> = signal<IResult[]>([]);

  // State
  public isLoading: WritableSignal<boolean> = signal<boolean>(false);

  ngOnInit(): void {
    this.titleService.setTitle('Cinemaze | Search');

    this.searchForm = new FormGroup({
      search: new FormControl<string>('', {nonNullable: true}),
    });

    this.listeningSearch();
  }

  private listeningSearch(): void {
    this.subs.add(
      this.searchForm
        .get('search')
        ?.valueChanges.pipe(
          startWith(''),
          debounceTime(500),
          distinctUntilChanged()
        )
        .subscribe((value: string): void => {
          if (value && value?.length > 0) {
            this.onSearch(value);
          } else {
            this.media.set([]);
          }
        })
    );
  }

  public onSearch(query: string): void {
    this.isLoading.set(true);

    const movies$: Observable<IMovieTv> =
      this.searchService.searchMovies(query);
    const tvShows$: Observable<IMovieTv> =
      this.searchService.searchTvShows(query);

    movies$.pipe(combineLatestWith(tvShows$)).subscribe({
      next: ([movies, tvShows]): void => {
        this.isLoading.set(false);
        const moviesData: IResult[] = movies.results
          ? movies.results?.slice(0, 9).map((m) => ({...m, isMovie: true}))
          : [];
        const tvShowsData: IResult[] = tvShows.results
          ? tvShows.results?.slice(0, 9).map((m) => ({...m, isMovie: false}))
          : [];

        this.media.set([...moviesData, ...tvShowsData]);
      },
      error: (error: CustomError): void => {
        this.isLoading.set(false);
        console.error(error.status_message);
      },
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
