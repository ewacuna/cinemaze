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
  styles: `
    .carousel-control {
      @apply inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gray-600 bg-gray-800 text-gray-100 transition-colors hover:border-red-400 hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 disabled:cursor-default disabled:opacity-35 disabled:hover:border-gray-600 disabled:hover:bg-gray-800 motion-reduce:transition-none;
    }
  `,
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
      this.config.breakpoints['320'].slidesOffsetBefore = 0;
      this.config.breakpoints['320'].slidesOffsetAfter = 0;
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
