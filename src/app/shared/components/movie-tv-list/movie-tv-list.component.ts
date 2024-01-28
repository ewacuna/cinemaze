import {Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit} from '@angular/core';
import {SwiperOptions} from 'swiper/types';
import {RouterLink} from '@angular/router';

import {IResult} from '../../models';
import {SwiperDirective} from '../../directives';
import {MovieTvCardComponent} from '../movie-tv-card/movie-tv-card.component';

@Component({
  selector: 'app-movie-tv-list',
  standalone: true,
  imports: [SwiperDirective, MovieTvCardComponent, RouterLink],
  templateUrl: './movie-tv-list.component.html',
  styles: ``,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MovieTvListComponent implements OnInit {
  // Inputs
  @Input() title: string;
  @Input() movies: IResult[];
  @Input() isMovie: boolean;
  @Input() showTitle = true;
  @Input() isSmallView = false;
  @Input() withGenre: number;
  @Input() withType: string;

  // Properties
  public queryParams: {q?: string; type?: string; genre?: number} = {};

  // Swiper Settings
  public config: SwiperOptions = {
    watchSlidesProgress: true,
    breakpoints: {
      1200: {
        slidesPerView: 7.3,
        spaceBetween: 25,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
      },
      992: {
        slidesPerView: 6.3,
        spaceBetween: 20,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
      },
      768: {
        slidesPerView: 4.3,
        spaceBetween: 15,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
      },
      576: {
        slidesPerView: 3.3,
        spaceBetween: 15,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
      },
      320: {
        slidesPerView: 2.3,
        spaceBetween: 10,
        slidesOffsetBefore: 10,
        slidesOffsetAfter: 10,
      },
    },
  };

  ngOnInit(): void {
    this.setSmallView();
    this.createQueryParams();
  }

  private createQueryParams(): void {
    this.queryParams.q = this.isMovie ? 'movie' : 'tv-show';
    this.withType && (this.queryParams.type = this.withType);
    this.withGenre && (this.queryParams.genre = this.withGenre);
  }

  private setSmallView(): void {
    if (this.isSmallView && this.config.breakpoints) {
      const breakpointsMapping: Record<string, number> = {
        '1200': 6.3,
        '992': 5.3,
        '768': 4.3,
        '576': 3.3,
        '320': 2.3,
      };

      Object.keys(breakpointsMapping).forEach((breakpoint: string): void => {
        if (this.config.breakpoints![breakpoint]) {
          this.config.breakpoints![breakpoint].slidesPerView =
            breakpointsMapping[breakpoint];
        }
      });
    }
  }
}
