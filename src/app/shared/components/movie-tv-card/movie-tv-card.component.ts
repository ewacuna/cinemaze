import {Component, Input} from '@angular/core';
import {DatePipe, DecimalPipe, NgIf, NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';

import {ImgMissingDirective} from '../../directives';
import {IResult} from '../../models';

@Component({
  selector: 'app-movie-tv-card',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgIf,
    RouterLink,
    ImgMissingDirective,
    DecimalPipe,
    DatePipe,
  ],
  templateUrl: './movie-tv-card.component.html',
  styles: ``,
})
export class MovieTvCardComponent {
  // Inputs
  @Input() model: IResult;
  @Input() isMovie: boolean;
}
