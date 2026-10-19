import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import {
  ActivatedRoute,
  Router,
  convertToParamMap,
  provideRouter,
} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {SearchComponent} from './search.component';
import {httpInterceptor} from '../../core/interceptors/http.interceptor';
import {IMovieTv, IResult} from '../../shared/models';

function response(ids: number[] = [1], page = 1, pages = 1): IMovieTv {
  return {
    page,
    results: ids.map(
      (id) =>
        ({
          id,
          title: `Title ${id}`,
          name: `Series ${id}`,
          vote_average: 8,
          poster_path: '/poster.jpg',
        }) as IResult
    ),
    total_pages: pages,
    total_results: pages * ids.length,
  } as IMovieTv;
}

describe('SearchComponent', () => {
  let fixture: ComponentFixture<SearchComponent>;
  let component: SearchComponent;
  let http: HttpTestingController;
  let params: BehaviorSubject<ReturnType<typeof convertToParamMap>>;
  let router: Router;

  beforeEach(async () => {
    params = new BehaviorSubject(convertToParamMap({}));
    await TestBed.configureTestingModule({
      imports: [SearchComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(withInterceptors([httpInterceptor])),
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: {queryParamMap: params.asObservable()},
        },
      ],
    }).compileComponents();
    http = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.callFake((_commands, extras) => {
      params.next(convertToParamMap(extras?.queryParams || {}));
      return Promise.resolve(true);
    });
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    http.verify();
  });

  function requests(page = 1) {
    return http.match(
      (req) =>
        req.url.includes('/search/') && req.params.get('page') === String(page)
    );
  }

  it('shows an initial state without sending empty or whitespace searches', fakeAsync(() => {
    component.searchFor('   ');
    tick(300);
    expect(requests().length).toBe(0);
    expect(component.isLoading()).toBeFalse();
    expect(fixture.nativeElement.textContent).toContain('Where to start?');
  }));

  it('debounces, safely encodes queries and preserves both types with the same ID', fakeAsync(() => {
    component.searchFor('Batman');
    tick(150);
    component.searchFor('  Tom & Jerry #1  ');
    tick(299);
    expect(requests().length).toBe(0);
    tick(1);
    const pending = requests();
    expect(pending.length).toBe(2);
    pending.forEach((req) => {
      expect(req.request.params.get('query')).toBe('Tom & Jerry #1');
      expect(req.request.urlWithParams).toContain('Tom%20%26%20Jerry%20%231');
      req.flush(response());
    });
    fixture.detectChanges();
    expect(component.media().map((item) => item.isMovie)).toEqual([
      true,
      false,
    ]);
    expect(
      fixture.nativeElement.querySelectorAll('app-movie-tv-card').length
    ).toBe(2);
    expect(router.navigate).toHaveBeenCalledWith(
      [],
      jasmine.objectContaining({
        queryParams: {q: 'Tom & Jerry #1', type: null},
        replaceUrl: true,
      })
    );
  }));

  it('cancels old HTTP requests immediately on a new query and on clearing', fakeAsync(() => {
    component.searchFor('old');
    tick(300);
    const old = requests();
    component.searchFor('new');
    expect(old.every((req) => req.cancelled)).toBeTrue();
    tick(300);
    const current = requests();
    component.searchFor('');
    expect(current.every((req) => req.cancelled)).toBeTrue();
    expect(component.media()).toEqual([]);
    expect(component.isLoading()).toBeFalse();
    tick(400);
    expect(requests().length).toBe(0);
  }));

  it('restores query and filter from the URL and requests only the selected type', fakeAsync(() => {
    params.next(convertToParamMap({q: 'The Bear', type: 'tv'}));
    tick(300);
    expect(component.searchControl.value).toBe('The Bear');
    expect(component.type()).toBe('tv');
    const pending = requests();
    expect(pending.length).toBe(1);
    expect(pending[0].request.url).toContain('/search/tv');
    pending[0].flush(response());
    component.setType('movie');
    tick(0);
    const movies = requests();
    expect(movies.length).toBe(1);
    expect(movies[0].request.url).toContain('/search/movie');
    movies[0].flush(response());
  }));

  it('renders an empty state when a search returns no results', fakeAsync(() => {
    component.searchFor('missing');
    tick(300);
    requests().forEach((req) => req.flush(response([], 1, 0)));
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('No stories found');
    expect(component.hasMore()).toBeFalse();
  }));

  it('retains loaded results on a page error, retries the same page and skips exhausted types', fakeAsync(() => {
    component.searchFor('story');
    tick(300);
    requests().forEach((req) =>
      req.flush(response([1], 1, req.request.url.endsWith('/movie') ? 1 : 3))
    );
    expect(component.media().length).toBe(2);
    component.loadMore();
    component.loadMore();
    const second = requests(2);
    expect(second.length).toBe(1);
    expect(second[0].request.url).toContain('/search/tv');
    second[0].flush({}, {status: 503, statusText: 'Unavailable'});
    expect(component.media().length).toBe(2);
    expect(component.error()).toContain('current results are still here');
    component.loadMore();
    requests(2)[0].flush(response([1, 2], 2, 3));
    expect(component.error()).toBe('');
    expect(component.media().length).toBe(3);
    component.loadMore();
    requests(3)[0].flush(response([3], 3, 3));
    expect(component.hasMore()).toBeFalse();
    expect(component.media().length).toBe(4);
  }));

  it('recovers from a first-page error without ending the search stream', fakeAsync(() => {
    component.searchFor('retry');
    tick(300);
    const pending = requests();
    pending[0].flush({}, {status: 500, statusText: 'Error'});
    expect(pending[1].cancelled).toBeTrue();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="alert"]')).toBeTruthy();
    component.loadMore();
    requests().forEach((req) => req.flush(response()));
    expect(component.error()).toBe('');
    component.searchFor('another');
    tick(300);
    requests().forEach((req) => req.flush(response([2])));
    expect(component.media()[0].id).toBe(2);
  }));

  it('cancels pending requests when the view is destroyed', fakeAsync(() => {
    component.searchFor('pending');
    tick(300);
    const pending = requests();
    fixture.destroy();
    expect(pending.every((req) => req.cancelled)).toBeTrue();
  }));
});
