import {
  Component,
  computed,
  inject,
  input,
  InputSignal,
  Signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {CurrencyPipe, DatePipe} from '@angular/common';

import {IMovie, IResult, IVideoData} from '../../../../shared/models';
import {MovieTvListComponent} from '../../../../shared/components';

interface ITrailer {
  id: string;
  name: string;
  url: SafeResourceUrl;
}

@Component({
  selector: 'app-movie-info',
  imports: [MovieTvListComponent, CurrencyPipe, DatePipe],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './movie-info.component.html',
})
export class MovieInfoComponent {
  // Services
  private sanitizer: DomSanitizer = inject(DomSanitizer);

  // Inputs
  movie: InputSignal<IMovie> = input.required<IMovie>();
  recommendedMovies: InputSignal<IResult[]> = input<IResult[]>([]);
  movieVideos: InputSignal<IVideoData[]> = input<IVideoData[]>([]);

  // Properties
  public languages: Signal<string> = computed(() =>
    this.movie()
      .spoken_languages.map((language) => language.english_name)
      .join(', ')
  );

  public companies: Signal<string> = computed(() =>
    this.movie()
      .production_companies.slice(0, 3)
      .map((company) => company.name)
      .join(', ')
  );

  public trailerList: Signal<ITrailer[]> = computed(() =>
    this.movieVideos()
      .filter(
        (video: IVideoData): boolean =>
          video.site === 'YouTube' && video.type === 'Trailer'
      )
      .map((video: IVideoData) => ({
        id: video.id,
        name: video.name,
        url: this.sanitizer.bypassSecurityTrustResourceUrl(
          'https://www.youtube.com/embed/' + video.key
        ),
      }))
  );
}
