import {TestBed} from '@angular/core/testing';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {
  ActivatedRoute,
  convertToParamMap,
  provideRouter,
} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {SearchComponent} from './search.component';
import {httpInterceptor} from '../../core/interceptors/http.interceptor';
import {environment} from '../../../environments/environment';

describe('Search over real HTTP against the local Postman simulation', () => {
  const originalUrl = environment.theMovieDBURL;
  const originalKey = environment.theMovieDBAPIKey;
  let params: BehaviorSubject<ReturnType<typeof convertToParamMap>>;

  beforeEach(async () => {
    environment.theMovieDBURL = 'http://127.0.0.1:4900/tmdb';
    environment.theMovieDBAPIKey = 'local-fixture';
    params = new BehaviorSubject(convertToParamMap({q: 'Tom & Jerry #1'}));
    await TestBed.configureTestingModule({
      imports: [SearchComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(withInterceptors([httpInterceptor])),
        {
          provide: ActivatedRoute,
          useValue: {queryParamMap: params.asObservable()},
        },
      ],
    }).compileComponents();
  });
  afterEach(() => {
    TestBed.resetTestingModule();
    environment.theMovieDBURL = originalUrl;
    environment.theMovieDBAPIKey = originalKey;
  });

  it('encodes the query, combines both types and appends the next page', async () => {
    const fixture = TestBed.createComponent(SearchComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const component = fixture.componentInstance;
    expect(component.error()).toBe('');
    expect(component.media().map((item) => item.isMovie)).toEqual([
      true,
      false,
    ]);
    expect(component.media()[0].title).toBe('Tom & Jerry #1 movie');
    fixture.ngZone!.run(() => component.loadMore());
    await fixture.whenStable();
    expect(component.media().length).toBe(4);
    expect(component.hasMore()).toBeFalse();
  });

  it('handles no matches and recovers after a real HTTP 503', async () => {
    params.next(convertToParamMap({q: 'unavailable', type: 'movie'}));
    const fixture = TestBed.createComponent(SearchComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const component = fixture.componentInstance;
    expect(component.error()).toContain('try again');
    fixture.ngZone!.run(() => params.next(convertToParamMap({q: 'missing'})));
    await fixture.whenStable();
    expect(component.error()).toBe('');
    expect(component.media()).toEqual([]);
    expect(component.totalResults()).toBe(0);
    expect(component.isLoading()).toBeFalse();
  });

  it('retains existing results when a later page returns HTTP 503', async () => {
    params.next(convertToParamMap({q: 'page-error', type: 'tv'}));
    const fixture = TestBed.createComponent(SearchComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const component = fixture.componentInstance;
    expect(component.media().length).toBe(1);
    fixture.ngZone!.run(() => component.loadMore());
    await fixture.whenStable();
    expect(component.media().length).toBe(1);
    expect(component.error()).toContain('current results are still here');
  });
});
