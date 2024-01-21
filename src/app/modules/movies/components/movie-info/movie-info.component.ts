import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';

import {IMovie, IResult, IVideoData} from '../../../../shared/models';
import {convertMinutesToHours} from '../../../../shared/helpers';
import {MovieTvListComponent} from '../../../../shared/components';

@Component({
  selector: 'app-movie-info',
  standalone: true,
  imports: [NgForOf, NgIf, MovieTvListComponent, CurrencyPipe],
  templateUrl: './movie-info.component.html',
  styleUrl: './movie-info.component.scss',
})
export class MovieInfoComponent implements OnInit, OnChanges {
  // Services
  private sanitizer: DomSanitizer = inject(DomSanitizer);

  // Inputs
  @Input() movie: IMovie;
  @Input() recommendedMovies: IResult[] = [];
  @Input() movieVideos: IVideoData[] = [];

  // Properties
  public trailerList: IVideoData[] = [];

  ngOnInit(): void {
    this.transformData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['movie']) {
      this.movie = changes['movie'].currentValue;
      this.transformData();
    }
  }

  private transformData(): void {
    if (this.movie) {
      const runtime = convertMinutesToHours(this.movie.runtime);
      this.movie.time = `${runtime.hours}h ${runtime.minutes}m`;
    }

    if (this.movieVideos.length > 0) {
      const trailerList: IVideoData[] = this.movieVideos.filter(
        (video: IVideoData): boolean => video.type === 'Trailer'
      );

      for (const video of trailerList) {
        video.url = this.sanitizer.bypassSecurityTrustResourceUrl(
          'https://www.youtube.com/embed/' + video['key']
        );
      }

      this.trailerList = trailerList || [];
    } else {
      this.trailerList = [];
    }
  }
}
