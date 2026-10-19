import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MovieInfoComponent} from './movie-info.component';

describe('MovieInfoComponent', () => {
  let component: MovieInfoComponent;
  let fixture: ComponentFixture<MovieInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieInfoComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('movie', {
      spoken_languages: [],
      production_companies: [],
      status: 'Released',
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
