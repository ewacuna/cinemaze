import {
  afterNextRender,
  DestroyRef,
  Directive,
  ElementRef,
  HostListener,
  Input,
  signal,
} from '@angular/core';
import {SwiperContainer} from 'swiper/element';
import {Swiper, SwiperOptions} from 'swiper/types';

@Directive({
  selector: '[appSwiper]',
  standalone: true,
  exportAs: 'appSwiper',
})
export class SwiperDirective {
  @Input() config?: SwiperOptions;

  readonly isBeginning = signal(true);
  readonly isEnd = signal(true);
  private destroyed = false;

  constructor(
    private element: ElementRef<SwiperContainer>,
    destroyRef: DestroyRef
  ) {
    destroyRef.onDestroy(() => (this.destroyed = true));
    afterNextRender(() => {
      Object.assign(this.element.nativeElement, this.config);
      this.element.nativeElement.initialize();
      this.updateNavigation(this.element.nativeElement.swiper);
    });
  }

  previous(): void {
    this.element.nativeElement.swiper?.slidePrev();
  }

  next(): void {
    this.element.nativeElement.swiper?.slideNext();
  }

  @HostListener('swiperslidechange', ['$event'])
  @HostListener('swiperresize', ['$event'])
  @HostListener('swiperupdate', ['$event'])
  @HostListener('swiperlock', ['$event'])
  @HostListener('swiperunlock', ['$event'])
  onNavigationChange(event: CustomEvent<[Swiper]>): void {
    this.updateNavigation(event.detail[0]);
  }

  private updateNavigation(swiper: Swiper): void {
    // Swiper can emit while Angular is rendering. Publish after that check ends.
    queueMicrotask(() => {
      if (this.destroyed) return;

      this.isBeginning.set(swiper.isBeginning || swiper.isLocked);
      this.isEnd.set(swiper.isEnd || swiper.isLocked);
    });
  }
}
