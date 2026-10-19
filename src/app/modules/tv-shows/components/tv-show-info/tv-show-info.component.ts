import {
  Component,
  computed,
  input,
  InputSignal,
  Signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import {DatePipe} from '@angular/common';

import {IResult, ITvShow} from '../../../../shared/models';
import {MovieTvListComponent} from '../../../../shared/components';

@Component({
  selector: 'app-tv-show-info',
  imports: [DatePipe, MovieTvListComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './tv-show-info.component.html',
})
export class TvShowInfoComponent {
  // Inputs
  tvShow: InputSignal<ITvShow> = input.required<ITvShow>();
  recommendedTvShows: InputSignal<IResult[]> = input<IResult[]>([]);

  // Properties
  public creators: Signal<string> = computed(() =>
    this.tvShow()
      .created_by.map((creator) => creator.name)
      .join(', ')
  );

  public networks: Signal<string> = computed(() =>
    this.tvShow()
      .networks.map((network) => network.name)
      .join(', ')
  );
}
