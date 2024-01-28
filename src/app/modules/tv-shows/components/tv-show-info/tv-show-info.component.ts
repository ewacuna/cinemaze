import {Component, input, InputSignal} from '@angular/core';
import {DatePipe} from '@angular/common';

import {IResult, ITvShow} from '../../../../shared/models';
import {MovieTvListComponent} from '../../../../shared/components';

@Component({
  selector: 'app-tv-show-info',
  standalone: true,
  imports: [DatePipe, MovieTvListComponent],
  templateUrl: './tv-show-info.component.html',
  styleUrl: './tv-show-info.component.scss',
})
export class TvShowInfoComponent {
  // Inputs
  tvShow: InputSignal<ITvShow> = input.required<ITvShow>();
  recommendedTvShows: InputSignal<IResult[]> = input<IResult[]>([]);
}
