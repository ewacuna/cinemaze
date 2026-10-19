import {
  ComponentFixture,
  fakeAsync,
  flushMicrotasks,
  TestBed,
} from '@angular/core/testing';
import {provideRouter} from '@angular/router';
import {register, SwiperContainer} from 'swiper/element';
import {Swiper} from 'swiper/types';

import {MovieTvListComponent} from './movie-tv-list.component';

describe('MovieTvListComponent', () => {
  let fixture: ComponentFixture<MovieTvListComponent>;
  let swiper: Swiper;

  beforeEach(async () => {
    register();
    swiper = {
      isBeginning: true,
      isEnd: false,
      isLocked: false,
      slidePrev: jasmine.createSpy('slidePrev'),
      slideNext: jasmine.createSpy('slideNext'),
    } as unknown as Swiper;
    const prototype = customElements.get('swiper-container')!
      .prototype as SwiperContainer;
    spyOn(prototype, 'initialize').and.callFake(function (
      this: SwiperContainer
    ) {
      this.swiper = swiper;
    });

    await TestBed.configureTestingModule({
      imports: [MovieTvListComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  function createFixture(): void {
    fixture = TestBed.createComponent(MovieTvListComponent);
    fixture.componentInstance.movies = [];
  }

  function buttons(): HTMLButtonElement[] {
    return Array.from(fixture.nativeElement.querySelectorAll('button'));
  }

  it('updates navigation after initialization without changing a checked binding', fakeAsync(() => {
    createFixture();
    // Check the render before NgZone can run a follow-up change detection pass.
    expect(() => {
      fixture.changeDetectorRef.detectChanges();
      fixture.checkNoChanges();
    }).not.toThrow();
    expect(buttons().map((button) => button.disabled)).toEqual([true, true]);

    TestBed.tick();
    flushMicrotasks();
    fixture.detectChanges();
    expect(buttons().map((button) => button.disabled)).toEqual([true, false]);

    buttons()[1].click();
    expect(swiper.slideNext).toHaveBeenCalled();
  }));

  it('keeps navigation in sync with slide changes and locked carousels', fakeAsync(() => {
    createFixture();
    fixture.detectChanges();
    flushMicrotasks();
    const container: SwiperContainer =
      fixture.nativeElement.querySelector('swiper-container');

    swiper.isBeginning = false;
    swiper.isEnd = true;
    container.dispatchEvent(
      new CustomEvent('swiperslidechange', {detail: [swiper]})
    );
    flushMicrotasks();
    fixture.detectChanges();
    expect(buttons().map((button) => button.disabled)).toEqual([false, true]);

    buttons()[0].click();
    expect(swiper.slidePrev).toHaveBeenCalled();

    swiper.isLocked = true;
    container.dispatchEvent(new CustomEvent('swiperlock', {detail: [swiper]}));
    flushMicrotasks();
    fixture.detectChanges();
    expect(buttons().map((button) => button.disabled)).toEqual([true, true]);
  }));
});
