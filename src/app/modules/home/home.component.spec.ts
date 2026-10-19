import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideRouter, Router} from '@angular/router';
import {of, Subject} from 'rxjs';
import {register} from 'swiper/element';

import {HomeComponent} from './home.component';
import {MoviesService, TvShowsService} from '../../core/services';
import {IMovieTv} from '../../shared/models';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let movies$: Subject<IMovieTv>;
  let tvShows$: Subject<IMovieTv>;

  beforeEach(async () => {
    register();
    movies$ = new Subject<IMovieTv>();
    tvShows$ = new Subject<IMovieTv>();
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        provideRouter([]),
        {
          provide: MoviesService,
          useValue: {
            getMovies: () => movies$,
            getGenres: () => of({genres: []}),
          },
        },
        {
          provide: TvShowsService,
          useValue: {getTVShows: () => tvShows$},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('shows the heading and search while backdrop requests are pending', () => {
    expect(fixture.nativeElement.querySelector('h1').textContent).toContain(
      'Your next favorite'
    );
    expect(
      fixture.nativeElement.querySelector('input[type="search"]')
    ).toBeTruthy();
    expect(
      component.backdropRows().every((row) => row.length === 0)
    ).toBeTrue();
    expect(
      fixture.nativeElement.querySelector('[aria-hidden="true"]')
    ).toBeTruthy();
  });

  it('submits a trimmed query to the existing search route', () => {
    const navigate = spyOn(TestBed.inject(Router), 'navigate').and.resolveTo(
      true
    );
    const input: HTMLInputElement =
      fixture.nativeElement.querySelector('input');
    input.value = '  Interstellar  ';
    fixture.nativeElement
      .querySelector('form')
      .dispatchEvent(new Event('submit', {cancelable: true}));
    expect(navigate).toHaveBeenCalledOnceWith(['/search'], {
      queryParams: {q: 'Interstellar'},
    });
  });

  it('prioritizes central backdrop tiles and keeps outer tiles lazy', () => {
    movies$.next({
      results: Array.from({length: 9}, (_, id) => ({
        id,
        backdrop_path: '/movie-' + id + '.jpg',
      })),
    } as IMovieTv);
    fixture.detectChanges();
    const images: NodeListOf<HTMLImageElement> =
      fixture.nativeElement.querySelectorAll('header img');
    expect(images[4].getAttribute('fetchpriority')).toBe('high');
    expect(images[4].loading).toBe('eager');
    expect(images[0].loading).toBe('lazy');
    expect(images[4].getAttribute('src')).toBe(
      'https://image.tmdb.org/t/p/w300/movie-4.jpg'
    );
  });

  it('links the exploration action to the movie catalog', () => {
    expect(fixture.nativeElement.querySelector('a').getAttribute('href')).toBe(
      '/movies'
    );
  });

  it('ignores whitespace-only searches', () => {
    const navigate = spyOn(TestBed.inject(Router), 'navigate');
    component.search(new Event('submit'), '   ');
    expect(navigate).not.toHaveBeenCalled();
  });

  it('updates movie backdrops while TV requests are still pending and skips missing images', () => {
    movies$.next({
      results: [
        {id: 1, backdrop_path: '/movie.jpg'},
        {id: 2, backdrop_path: null},
      ],
    } as IMovieTv);
    fixture.detectChanges();
    expect(component.backdropRows()[0].map((item) => item.id)).toEqual([1]);
    expect(component.backdropRows()[1]).toEqual([]);
    expect(fixture.nativeElement.querySelector('h1')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('img').alt).toBe('');
  });
});
