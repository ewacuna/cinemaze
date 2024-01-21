import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {DatePipe, NgForOf} from '@angular/common';

import {IResult, ITvShow} from '../../../../shared/models';
import {MovieTvListComponent} from '../../../../shared/components';

@Component({
  selector: 'app-tv-show-info',
  standalone: true,
  imports: [DatePipe, NgForOf, MovieTvListComponent],
  templateUrl: './tv-show-info.component.html',
  styleUrl: './tv-show-info.component.scss',
})
export class TvShowInfoComponent implements OnChanges {
  // Inputs
  @Input() tvShow: ITvShow;
  @Input() recommendedTvShows: IResult[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tvShow']) {
      this.tvShow = changes['tvShow'].currentValue;
    }
  }
}
