import {TestBed} from '@angular/core/testing';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {provideRouter} from '@angular/router';
import {register} from 'swiper/element';
import {HomeComponent} from './home.component';
import {httpInterceptor} from '../../core/interceptors/http.interceptor';
import {environment} from '../../../environments/environment';

describe('Home over real HTTP against the local Postman simulation', () => {
  const originalUrl = environment.theMovieDBURL;
  const originalKey = environment.theMovieDBAPIKey;

  beforeEach(async () => {
    register();
    environment.theMovieDBURL = 'http://127.0.0.1:4902/tmdb';
    environment.theMovieDBAPIKey = 'home-fixture';
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(withInterceptors([httpInterceptor])),
      ],
    }).compileComponents();
  });
  afterEach(() => {
    TestBed.resetTestingModule();
    environment.theMovieDBURL = originalUrl;
    environment.theMovieDBAPIKey = originalKey;
  });

  it('renders ordered shelves, hides empty rows and links all genres to their filtered catalog', async () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(
      component.shelves().every((shelf) => shelf.state === 'ready')
    ).toBeTrue();
    expect(component.genreShelves().map((shelf) => shelf.genre)).toEqual([
      28, 35, 16, 53,
    ]);
    const headings = Array.from(
      fixture.nativeElement.querySelectorAll('h2') as NodeListOf<HTMLElement>
    ).map((heading) => heading.textContent!.trim());
    expect(headings).toEqual([
      'Popular movies',
      'On TV now',
      'Find your kind of movie',
      'Top-rated series',
      'Action',
      'Comedy',
      'Thriller',
    ]);
    const genreLinks = () =>
      fixture.nativeElement.querySelectorAll(
        '#genre-links a'
      ) as NodeListOf<HTMLAnchorElement>;
    expect(genreLinks().length).toBe(6);
    fixture.nativeElement
      .querySelector('[aria-controls="genre-links"]')
      .click();
    fixture.detectChanges();
    expect(genreLinks().length).toBe(8);
    expect(genreLinks()[0].getAttribute('href')).toBe('/view?q=movie&genre=28');
  });

  it('keeps successful shelves visible through 503 failures and retries each failed row', async () => {
    environment.theMovieDBAPIKey = `home-retry-${Date.now()}`;
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(
      component.shelves().find((shelf) => shelf.key === 'popular')!.state
    ).toBe('ready');
    expect(
      component.shelves().find((shelf) => shelf.key === 'on-air')!.state
    ).toBe('error');
    expect(
      component.shelves().find((shelf) => shelf.key === 'genre-35')!.state
    ).toBe('error');
    expect(
      fixture.nativeElement.querySelector(
        'section[aria-label="Popular movies"] app-movie-tv-list'
      )
    ).toBeTruthy();
    fixture.ngZone!.run(() => {
      fixture.nativeElement
        .querySelector('[aria-label="Retry On TV now"]')
        .click();
      fixture.nativeElement
        .querySelector('[aria-label="Retry Comedy"]')
        .click();
    });
    await fixture.whenStable();
    fixture.detectChanges();
    expect(
      component.shelves().every((shelf) => shelf.state === 'ready')
    ).toBeTrue();
    expect(
      fixture.nativeElement.querySelector('[aria-label="Retry On TV now"]')
    ).toBeNull();
  });
});
