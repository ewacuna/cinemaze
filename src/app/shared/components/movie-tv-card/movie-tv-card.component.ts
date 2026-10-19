import {
  Component,
  input,
  InputSignal,
  ChangeDetectionStrategy,
} from '@angular/core';
import {DatePipe, DecimalPipe, NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';

import {ImgMissingDirective} from '../../directives';
import {IResult} from '../../models';

@Component({
  selector: 'app-movie-tv-card',
  imports: [
    NgOptimizedImage,
    RouterLink,
    ImgMissingDirective,
    DecimalPipe,
    DatePipe,
  ],
  templateUrl: './movie-tv-card.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: ``,
})
export class MovieTvCardComponent {
  // Inputs
  model: InputSignal<IResult> = input.required<IResult>();
  isMovie: InputSignal<boolean> = input.required<boolean>();
}
