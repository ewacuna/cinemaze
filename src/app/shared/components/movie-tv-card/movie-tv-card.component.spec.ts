import {provideRouter} from '@angular/router';
import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MovieTvCardComponent} from './movie-tv-card.component';

describe('MovieTvCardComponent', () => {
  let component: MovieTvCardComponent;
  let fixture: ComponentFixture<MovieTvCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieTvCardComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieTvCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('model', {
      id: 1,
      title: 'Movie',
      poster_path: null,
      vote_average: 0,
    });
    fixture.componentRef.setInput('isMovie', true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
