import {TestBed} from '@angular/core/testing';
import {
  HttpClient,
  HttpHeaders,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import {httpInterceptor} from './http.interceptor';
import {environment} from '../../../environments/environment';

describe('httpInterceptor', () => {
  let client: HttpClient;
  let http: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([httpInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    client = TestBed.inject(HttpClient);
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => http.verify());

  it('normalizes relative and absolute TMDB URLs without changing parameters', () => {
    for (const path of [
      'search/movie',
      '/search/movie',
      `${environment.theMovieDBURL}/search/movie`,
    ]) {
      client.get(path, {params: {query: 'Tom & Jerry'}}).subscribe();
      const request = http.expectOne(
        (req) => req.url === `${environment.theMovieDBURL}/search/movie`
      );
      expect(request.request.params.get('query')).toBe('Tom & Jerry');
      request.flush({});
    }
  });

  it('keeps skipped URLs intact and removes the internal skip header', () => {
    client
      .get('https://example.test/asset', {
        headers: new HttpHeaders({skip: 'true'}),
      })
      .subscribe();
    const request = http.expectOne('https://example.test/asset');
    expect(request.request.headers.has('skip')).toBeFalse();
    request.flush({});
  });

  it('propagates unsubscription to the HTTP backend', () => {
    const subscription = client.get('search/movie').subscribe();
    const request = http.expectOne(`${environment.theMovieDBURL}/search/movie`);
    subscription.unsubscribe();
    expect(request.cancelled).toBeTrue();
  });
});
