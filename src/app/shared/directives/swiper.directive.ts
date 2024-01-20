import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';
import {SwiperContainer} from 'swiper/element';
import {SwiperOptions} from 'swiper/types';

@Directive({
  selector: '[appSwiper]',
  standalone: true,
})
export class SwiperDirective implements AfterViewInit {
  @Input() config?: SwiperOptions;

  constructor(private element: ElementRef<SwiperContainer>) {}

  ngAfterViewInit(): void {
    Object.assign(this.element?.nativeElement, this.config);
    this.element.nativeElement.initialize();
  }
}
