import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideHttpClient} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import {ActivatedRoute, convertToParamMap, provideRouter} from '@angular/router';
import {of} from 'rxjs';

import {DetailsComponent} from './details.component';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {data: {type: 'movie'}},
            paramMap: of(convertToParamMap({id: '1'})),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    http = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should start loading', () => {
    expect(component.state().status).toBe('loading');
  });

  it('should keep the page when secondary requests fail', () => {
    http.expectOne((req) => req.url.startsWith('movie/1?')).flush({
      title: 'Movie',
      genres: [],
      overview: '',
      vote_count: 0,
    });
    http
      .expectOne((req) => req.url.startsWith('movie/1/recommendations?'))
      .flush(null, {status: 500, statusText: 'Error'});
    http
      .expectOne((req) => req.url.startsWith('movie/1/videos?'))
      .flush(null, {status: 500, statusText: 'Error'});

    expect(component.state().status).toBe('success');
    expect(component.hero()?.title).toBe('Movie');
  });

  it('should show the error state when the main request fails', () => {
    http
      .expectOne((req) => req.url.startsWith('movie/1?'))
      .flush(null, {status: 404, statusText: 'Not Found'});
    http.match(() => true);

    expect(component.state().status).toBe('error');
    expect(component.isNotFound()).toBeTrue();
  });
});
