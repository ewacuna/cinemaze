import {
  Component,
  effect,
  inject,
  input,
  InputSignal,
  signal,
  WritableSignal,
} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {CurrencyPipe} from '@angular/common';

import {IMovie, IResult, IVideoData} from '../../../../shared/models';
import {convertMinutesToHours} from '../../../../shared/helpers';
import {MovieTvListComponent} from '../../../../shared/components';

@Component({
  selector: 'app-movie-info',
  standalone: true,
  imports: [MovieTvListComponent, CurrencyPipe],
  templateUrl: './movie-info.component.html',
  styleUrl: './movie-info.component.scss',
})
export class MovieInfoComponent {
  // Services
  private sanitizer: DomSanitizer = inject(DomSanitizer);

  // Inputs
  movie: InputSignal<IMovie> = input.required<IMovie>();
  recommendedMovies: InputSignal<IResult[]> = input<IResult[]>([]);
  movieVideos: InputSignal<IVideoData[]> = input<IVideoData[]>([]);

  // Properties
  public trailerList: WritableSignal<IVideoData[]> = signal<IVideoData[]>([]);

  constructor() {
    effect(
      (): void => {
        this.transformData();
      },
      {allowSignalWrites: true}
    );
  }

  private transformData(): void {
    if (this.movie()) {
      const runtime = convertMinutesToHours(this.movie().runtime);
      this.movie().time = `${runtime.hours}h ${runtime.minutes}m`;
    }

    if (this.movieVideos().length > 0) {
      const trailerList: IVideoData[] = this.movieVideos().filter(
        (video: IVideoData): boolean => video.type === 'Trailer'
      );

      for (const video of trailerList) {
        video.url = this.sanitizer.bypassSecurityTrustResourceUrl(
          'https://www.youtube.com/embed/' + video['key']
        );
      }

      this.trailerList.update(() => trailerList || []);
    } else {
      this.trailerList.update(() => []);
    }
  }
}
