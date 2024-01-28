import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {Subject, take, takeUntil} from 'rxjs';

import {MoviesService, TvShowsService} from '../../core/services';
import {CustomError} from '../../shared/models/errors.model';
import {IMovieTv, IResult} from '../../shared/models';
import {MovieTvCardComponent, SpinnerComponent} from '../../shared/components';

@Component({
  selector: 'app-view-all',
  standalone: true,
  imports: [MovieTvCardComponent, SpinnerComponent],
  templateUrl: './view-all.component.html',
  styleUrl: './view-all.component.scss',
})
export class ViewAllComponent implements OnInit, OnDestroy {
  // Services
  private titleService: Title = inject(Title);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private moviesService: MoviesService = inject(MoviesService);
  private tvShowsService: TvShowsService = inject(TvShowsService);

  // Properties
  private destroy$: Subject<void> = new Subject<void>();
  public data: WritableSignal<IResult[]> = signal([]);
  public page = 0;
  public q: string;
  private type: string;
  private genreId: string;
  public totalPages: number;

  // State
  public isLoading: WritableSignal<boolean> = signal(true);

  ngOnInit(): void {
    this.titleService.setTitle('Cinemaze | View All');
    this.q = this.route.snapshot.queryParams['q'];
    this.type = this.route.snapshot.queryParams['type'];
    this.genreId = this.route.snapshot.queryParams['genre'];

    this.loadData();
  }

  private loadData(): void {
    switch (this.q) {
      case 'movie':
        if (this.genreId) {
          this.getMovieWithGenre();
        } else if (this.type) {
          this.getMovies();
        }
        break;
      case 'tv-show':
        if (this.type) {
          this.getTvShow();
        }
        break;
      default:
        this.isLoading.set(false);
        break;
    }
  }

  private setData(response: IMovieTv): void {
    this.data.update((data: IResult[]) => [
      ...data,
      ...(response?.results || []),
    ]);
    this.totalPages = response.total_pages;
    this.isLoading.set(false);
  }

  private getMovieWithGenre(): void {
    this.page = this.page + 1;
    this.moviesService
      .getMovieWithGenre(this.genreId, this.page)
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe({
        next: (res: IMovieTv): void => {
          this.setData(res);
        },
        error: (error: CustomError): void => {
          console.error(error.status_message);
          this.isLoading.set(false);
        },
      });
  }

  private getMovies(): void {
    this.page = this.page + 1;
    this.moviesService
      .getMovies(this.type, this.page)
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe({
        next: (res: IMovieTv): void => {
          this.setData(res);
        },
        error: (error: CustomError): void => {
          console.error(error.status_message);
          this.isLoading.set(false);
        },
      });
  }

  private getTvShow(): void {
    this.page = this.page + 1;
    this.tvShowsService
      .getTVShows(this.type, this.page)
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe({
        next: (res: IMovieTv): void => {
          this.setData(res);
        },
        error: (error: CustomError): void => {
          console.error(error.status_message);
          this.isLoading.set(false);
        },
      });
  }

  public loadMoreData(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
